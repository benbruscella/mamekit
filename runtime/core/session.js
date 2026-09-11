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
import { bindingPlayer } from "./input.js";
/**
 * MAME's start and coin carry their player in the type (`IPT_START2`), every
 * other control in PORT_PLAYER, so a control's family is the type with that
 * trailing digit removed.
 */
function typeFamily(type) {
    return (type ?? '').replace(/^(IPT_(?:START|COIN))\d$/, '$1');
}
export class Session {
    players;
    player;
    delay;
    /** The frame the machine is about to run. */
    frame = 0;
    /** Every frame of input this session has seen, for replay and export. */
    log = [];
    input;
    send;
    checkEvery;
    onDesync;
    /**
     * The binding each local control actually drives, by index.
     *
     * Only player one has keys, so a joiner presses player-one controls and the
     * machine has to see player two's. The match is by MAME input type — the
     * same rule a second gamepad already uses — so no game needs its own table,
     * and a control this player does not own maps to nothing and is dropped.
     */
    remap;
    /** Local events since the last publish. */
    collected = [];
    /** frame -> player -> that player's events, until the frame runs. */
    inbox = new Map();
    /** Our own machine's fingerprint per frame, until a peer's check arrives. */
    hashes = new Map();
    /** The last frame this browser has already told everybody about. */
    published = -1;
    desynced = false;
    constructor(options) {
        this.input = options.input;
        this.player = options.player ?? 1;
        this.players = [...(options.players ?? [this.player])].sort((a, b) => a - b);
        this.delay = Math.max(0, Math.trunc(options.delay ?? 0));
        this.send = options.send ?? (() => { });
        this.checkEvery = options.checkEvery ?? 60;
        this.onDesync = options.onDesync;
        this.remap = this.buildRemap(options.bindings);
        // The first `delay` frames have no published input to wait for: nobody
        // had pressed anything that long ago, and this browser's own first
        // publish lands at `delay` too. Seed them so the room can start.
        for (const player of this.players) {
            for (let frame = 0; frame < this.delay; frame++)
                this.deliver(player, frame, []);
        }
        this.input.sink = event => this.collect(event);
    }
    /** True while more than this browser is playing. */
    get room() {
        return this.players.length > 1;
    }
    buildRemap(bindings) {
        /** The control of the same kind that belongs to this browser's player. */
        const mine = (binding) => {
            const family = typeFamily(binding.type);
            if (!family)
                return undefined;
            const found = bindings.findIndex(candidate => typeFamily(candidate.type) === family && bindingPlayer(candidate) === this.player);
            return found < 0 ? undefined : found;
        };
        return bindings.map((binding, index) => {
            // Alone, every control this browser can reach is this browser's.
            if (!this.room)
                return index;
            const family = typeFamily(binding.type);
            if (family === 'IPT_START' || family === 'IPT_COIN') {
                // Coin and start are buttons on the cabinet, not one player's
                // controls. Whoever is at the cabinet works both of them, and a
                // joiner's own start and coin operate their own slot whichever of
                // the two they press — the labels on their keyboard still say 1 and
                // 2, and neither should do nothing.
                //
                // Not every cabinet has two of each. Space Invaders takes both
                // players' money through one slot, and a joiner whose own slot does
                // not exist was left unable to coin up at all — so where there is
                // only the one, they reach for the same one the host does, which is
                // what standing at that cabinet together would have them do.
                return this.player === 1 ? index : mine(binding) ?? index;
            }
            // A player's own controls belong to whoever is playing that player,
            // second local gamepad or not: two sources driving one would fight.
            if (bindingPlayer(binding) !== 1)
                return undefined;
            return this.player === 1 ? index : mine(binding);
        });
    }
    /**
     * Every input event this browser produces, taken from the input model
     * before it reaches a port. It is stamped with the player who caused it —
     * so two people holding the same key never share a hold — and moved onto
     * the binding that player actually drives.
     */
    collect(event) {
        if (event.kind === 'release') {
            this.collected.push(event);
            return;
        }
        const binding = this.remap[event.binding];
        if (binding === undefined)
            return;
        this.collected.push(event.kind === 'edge'
            ? { ...event, binding, source: `p${this.player}:${event.source}` }
            : { ...event, binding });
    }
    /**
     * Hand this browser's collected events to the frame they land on, and tell
     * everyone else. Called once per frame attempt, before the gate.
     */
    publish() {
        const frame = this.frame + this.delay;
        // Say each frame once. The run loop asks whether it may run on every
        // animation frame, so while a peer's input is outstanding this is called
        // many times over for the same frame — and publishing one twice would
        // throw away everything pressed in between, because the second delivery
        // is dropped as a resend and takes its events with it. A coin is two
        // edges a few frames apart, which is exactly what went missing.
        if (frame <= this.published)
            return;
        this.published = frame;
        const events = this.collected;
        this.collected = [];
        // A frame with nothing in it still has to be published: lockstep is
        // waiting to hear that this player did nothing, not guessing at it.
        this.deliver(this.player, frame, events);
        if (this.room)
            this.send({ kind: 'input', player: this.player, frame, events });
    }
    /** A message from a peer. */
    receive(message) {
        if (message.kind === 'input') {
            this.deliver(message.player, message.frame, message.events);
            return;
        }
        const ours = this.hashes.get(message.frame);
        if (ours === undefined || this.desynced)
            return;
        this.hashes.delete(message.frame);
        if (ours === message.hash)
            return;
        this.desynced = true;
        this.onDesync?.(message.frame, message.player);
    }
    deliver(player, frame, events) {
        let byPlayer = this.inbox.get(frame);
        if (!byPlayer) {
            byPlayer = new Map();
            this.inbox.set(frame, byPlayer);
        }
        if (byPlayer.has(player))
            return; // a resend of a frame already in hand
        byPlayer.set(player, events);
        if (events.length)
            this.log.push({ player, frame, events });
    }
    /** Whether every player's input for one frame is in hand. */
    complete(frame) {
        const byPlayer = this.inbox.get(frame);
        return byPlayer !== undefined && this.players.every(player => byPlayer.has(player));
    }
    /** Whether the current frame can run. */
    ready() {
        return this.complete(this.frame);
    }
    /**
     * This frame's input from every player, in one deterministic order.
     *
     * Ordered by player, then by the order each player pressed things: both
     * browsers therefore apply exactly the same events in exactly the same
     * sequence, which is the whole of what keeps two machines identical.
     */
    take() {
        const byPlayer = this.inbox.get(this.frame);
        this.inbox.delete(this.frame);
        if (!byPlayer)
            return [];
        const events = [];
        for (const player of this.players)
            events.push(...byPlayer.get(player) ?? []);
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
    completed(fingerprint) {
        const frame = this.frame;
        this.frame = frame + 1;
        if (!this.room || !this.checkEvery || frame % this.checkEvery)
            return;
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
    get buffered() {
        let count = 0;
        while (this.complete(this.frame + count))
            count++;
        return count;
    }
    /** Give up the input model; the session stops seeing events. */
    detach() {
        if (this.input.sink)
            this.input.sink = null;
    }
}
