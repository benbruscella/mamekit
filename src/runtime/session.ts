// Who is playing, which frame the machine is on, and every input event that
// got it there.
//
// A session is always present: playing alone is a session of one with no
// input delay, so the run loop has exactly one path and a room only adds a
// second player, a few frames of delay and a peer to wait for. That matters
// more than it sounds — a netplay-only code path is a path the acceptance
// runs never take, and this one is exercised by every frame anybody plays.
//
// This is a MAMEKIT host feature (ARCHITECTURE.md §8): it knows nothing about
// any machine. It moves `InputEvent`s, which name a generated binding by
// index, so a peer's press replays through exactly the path a local one takes
// and no game needs a table of its own.

import { bindingPlayer, type FieldBinding, type InputEvent, type KeyboardInput } from './input.ts';

/** What one player published for one frame. */
export interface FrameInput {
  player: number;
  frame: number;
  events: InputEvent[];
}

/**
 * What crosses the wire. Input is the whole protocol during play; a check is
 * the periodic "are we still the same machine" comparison.
 */
export type SessionMessage =
  | { kind: 'input'; player: number; frame: number; events: InputEvent[] }
  | { kind: 'check'; player: number; frame: number; hash: string };

export interface SessionOptions {
  input: KeyboardInput;
  /** The generated bindings, in the order both peers hold them. */
  bindings: readonly FieldBinding[];
  /** Which player this browser drives; 1 alone or hosting, 2 when joining. */
  player?: number;
  /** Everyone in the room, ascending. `[1]` alone. */
  players?: readonly number[];
  /**
   * Frames between a local press and the frame it reaches the machine.
   *
   * Lockstep cannot run a frame until every player's input for it is in, so
   * without a delay each frame would wait a full round trip. Publishing a few
   * frames ahead buys that time; the cost is the same few frames of lag on
   * your own controls, which is why it is zero when playing alone.
   */
  delay?: number;
  /** Where a published frame or a state check goes. */
  send?: (message: SessionMessage) => void;
  /** Frames between state comparisons with the peers; 0 disables them. */
  checkEvery?: number;
  /** A peer's machine no longer matches ours at this frame. */
  onDesync?: (frame: number, player: number) => void;
}

/**
 * MAME's start and coin carry their player in the type (`IPT_START2`), every
 * other control in PORT_PLAYER, so a control's family is the type with that
 * trailing digit removed.
 */
function typeFamily(type: string | undefined): string {
  return (type ?? '').replace(/^(IPT_(?:START|COIN))\d$/, '$1');
}

export class Session {
  readonly players: readonly number[];
  readonly player: number;
  readonly delay: number;
  /** The frame the machine is about to run. */
  frame = 0;
  /** Every frame of input this session has seen, for replay and export. */
  readonly log: FrameInput[] = [];

  private readonly input: KeyboardInput;
  private readonly send: (message: SessionMessage) => void;
  private readonly checkEvery: number;
  private readonly onDesync?: (frame: number, player: number) => void;
  /**
   * The binding each local control actually drives, by index.
   *
   * Only player one has keys, so a joiner presses player-one controls and the
   * machine has to see player two's. The match is by MAME input type — the
   * same rule a second gamepad already uses — so no game needs its own table,
   * and a control this player does not own maps to nothing and is dropped.
   */
  private readonly remap: readonly (number | undefined)[];
  /** Local events since the last publish. */
  private collected: InputEvent[] = [];
  /** frame -> player -> that player's events, until the frame runs. */
  private readonly inbox = new Map<number, Map<number, InputEvent[]>>();
  /** Our own machine's fingerprint per frame, until a peer's check arrives. */
  private readonly hashes = new Map<number, string>();
  /** The last frame this browser has already told everybody about. */
  private published = -1;
  private desynced = false;

  constructor(options: SessionOptions) {
    this.input = options.input;
    this.player = options.player ?? 1;
    this.players = [...(options.players ?? [this.player])].sort((a, b) => a - b);
    this.delay = Math.max(0, Math.trunc(options.delay ?? 0));
    this.send = options.send ?? (() => {});
    this.checkEvery = options.checkEvery ?? 60;
    this.onDesync = options.onDesync;
    this.remap = this.buildRemap(options.bindings);
    // The first `delay` frames have no published input to wait for: nobody
    // had pressed anything that long ago, and this browser's own first
    // publish lands at `delay` too. Seed them so the room can start.
    for (const player of this.players) {
      for (let frame = 0; frame < this.delay; frame++) this.deliver(player, frame, []);
    }
    this.input.sink = event => this.collect(event);
  }

  /** True while more than this browser is playing. */
  get room(): boolean {
    return this.players.length > 1;
  }

  private buildRemap(bindings: readonly FieldBinding[]): (number | undefined)[] {
    return bindings.map((binding, index) => {
      const owner = bindingPlayer(binding);
      // Alone, every control this browser can reach is this browser's.
      if (!this.room) return index;
      // In a room the other player's controls belong to the other browser,
      // second gamepad or not: two sources driving player two would fight.
      if (owner !== 1) return undefined;
      if (this.player === 1) return index;
      const family = typeFamily(binding.type);
      if (!family) return undefined;
      const mine = bindings.findIndex(candidate =>
        typeFamily(candidate.type) === family && bindingPlayer(candidate) === this.player);
      return mine < 0 ? undefined : mine;
    });
  }

  /**
   * Every input event this browser produces, taken from the input model
   * before it reaches a port. It is stamped with the player who caused it —
   * so two people holding the same key never share a hold — and moved onto
   * the binding that player actually drives.
   */
  private collect(event: InputEvent): void {
    if (event.kind === 'release') {
      this.collected.push(event);
      return;
    }
    const binding = this.remap[event.binding];
    if (binding === undefined) return;
    this.collected.push(event.kind === 'edge'
      ? { ...event, binding, source: `p${this.player}:${event.source}` }
      : { ...event, binding });
  }

  /**
   * Hand this browser's collected events to the frame they land on, and tell
   * everyone else. Called once per frame attempt, before the gate.
   */
  publish(): void {
    const frame = this.frame + this.delay;
    // Say each frame once. The run loop asks whether it may run on every
    // animation frame, so while a peer's input is outstanding this is called
    // many times over for the same frame — and publishing one twice would
    // throw away everything pressed in between, because the second delivery
    // is dropped as a resend and takes its events with it. A coin is two
    // edges a few frames apart, which is exactly what went missing.
    if (frame <= this.published) return;
    this.published = frame;
    const events = this.collected;
    this.collected = [];
    // A frame with nothing in it still has to be published: lockstep is
    // waiting to hear that this player did nothing, not guessing at it.
    this.deliver(this.player, frame, events);
    if (this.room) this.send({ kind: 'input', player: this.player, frame, events });
  }

  /** A message from a peer. */
  receive(message: SessionMessage): void {
    if (message.kind === 'input') {
      this.deliver(message.player, message.frame, message.events);
      return;
    }
    const ours = this.hashes.get(message.frame);
    if (ours === undefined || this.desynced) return;
    this.hashes.delete(message.frame);
    if (ours === message.hash) return;
    this.desynced = true;
    this.onDesync?.(message.frame, message.player);
  }

  private deliver(player: number, frame: number, events: InputEvent[]): void {
    let byPlayer = this.inbox.get(frame);
    if (!byPlayer) { byPlayer = new Map(); this.inbox.set(frame, byPlayer); }
    if (byPlayer.has(player)) return; // a resend of a frame already in hand
    byPlayer.set(player, events);
    if (events.length) this.log.push({ player, frame, events });
  }

  /** Whether every player's input for one frame is in hand. */
  private complete(frame: number): boolean {
    const byPlayer = this.inbox.get(frame);
    return byPlayer !== undefined && this.players.every(player => byPlayer.has(player));
  }

  /** Whether the current frame can run. */
  ready(): boolean {
    return this.complete(this.frame);
  }

  /**
   * This frame's input from every player, in one deterministic order.
   *
   * Ordered by player, then by the order each player pressed things: both
   * browsers therefore apply exactly the same events in exactly the same
   * sequence, which is the whole of what keeps two machines identical.
   */
  take(): InputEvent[] {
    const byPlayer = this.inbox.get(this.frame);
    this.inbox.delete(this.frame);
    if (!byPlayer) return [];
    const events: InputEvent[] = [];
    for (const player of this.players) events.push(...byPlayer.get(player) ?? []);
    return events;
  }

  /**
   * The frame is over.
   *
   * `fingerprint` describes the machine as it now stands; peers compare
   * theirs every `checkEvery` frames so a divergence is seen and said out
   * loud rather than played out as two different games. It is a function
   * because most frames never ask for it.
   */
  completed(fingerprint: () => string): void {
    const frame = this.frame;
    this.frame = frame + 1;
    if (!this.room || !this.checkEvery || frame % this.checkEvery) return;
    const hash = fingerprint();
    this.hashes.set(frame, hash);
    this.send({ kind: 'check', player: this.player, frame, hash });
  }

  /**
   * Runnable frames not yet run: how far ahead the peer is.
   *
   * A frame this browser has published but the peer has not is not counted —
   * it cannot run, so it is not slack.
   */
  get buffered(): number {
    let count = 0;
    while (this.complete(this.frame + count)) count++;
    return count;
  }

  /** Give up the input model; the session stops seeing events. */
  detach(): void {
    if (this.input.sink) this.input.sink = null;
  }
}
