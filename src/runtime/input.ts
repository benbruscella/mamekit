// Input port state. Each port has a generated resting ("init") byte computed
// from field polarities in the knowledge graph: classic active-low ports rest
// at 0xff-ish (bit set = released), but e.g. galaxian's inputs are active-HIGH
// (bit set = pressed) — polarity is per binding.
//
// The keyboard is one source of edges; `gamepad.ts` is the other and drives
// the same fields through `press()`. Polarity, SOCD, maintained switches and
// analog ramps live here once, so both sources agree on what a port reads.

import type { InputPorts } from './types.ts';
import type { RangeSpec, ReadHandler } from './bus.ts';

/**
 * Build read handlers for the generated "port.<TAG>" keys (from .portr()
 * entries in the address map): each returns the live port byte.
 */
export function portHandlers(ranges: RangeSpec[], inputs: InputPorts): Record<string, ReadHandler> {
  const out: Record<string, ReadHandler> = {};
  for (const r of ranges) {
    if (r.read?.startsWith('port.')) {
      const tag = r.read.slice('port.'.length);
      out[r.read] = () => inputs.read(tag);
    }
  }
  return out;
}

export interface FieldBinding {
  port: string;   // "IN0", "IN1", ...
  mask: number;
  /** DOM KeyboardEvent.code values that activate this field; empty for a player the keyboard does not serve */
  keys: string[];
  label: string;
  /**
   * The MAME input type (IPT_BUTTON1, IPT_JOYSTICK_LEFT, IPT_COIN1). A
   * relative control's two halves carry a _LEFT/_RIGHT/_UP/_DOWN suffix. A
   * gamepad binds by this, never by key, so a game's bespoke key table does
   * not move its pad buttons.
   */
  type?: string;
  /** which player's control this is; 1 when absent, and only player 1 has keys */
  player?: number;
  /** true (default) = pressed clears bits; false = pressed sets bits */
  activeLow?: boolean;
  /** Maintained cabinet switch: each keydown flips it and keyup leaves it set. */
  toggle?: boolean;
  /** Absolute value driven while an analog control key is held. */
  activeValue?: number;
  /**
   * MAME's PORT_KEYDELTA for an absolute analog control: how far the port
   * travels toward `activeValue` per emulated frame while the key is held,
   * and back toward its own rest value when released. A steering wheel that
   * snapped straight to full lock and back was unusable.
   */
  keyDelta?: number;
  /** Relative masked delta applied each emulated frame while held. */
  relativeDelta?: number;
  /**
   * MAME's PORT_SENSITIVITY for a relative control, percent: one pixel of
   * mouse, spinner or trackball travel moves the port this/100 units.
   */
  sensitivity?: number;
  /**
   * MAME's PORT_nWAY on a digital joystick direction: the gate the physical
   * lever moves inside. 4 is the square gate that cannot hold a diagonal,
   * which is what Donkey Kong's ladders and Pac-Man's maze were built for;
   * 16 asks for no restriction at all. Absent means MAME declared none,
   * which its own restriction treats as 8.
   */
  ways?: number;
}

export interface DipDefault { port: string; mask: number; value: number; name: string }

export interface PortSpec { tag: string; init: number }

/**
 * One thing a control did, in the only form a session can log, send to a peer
 * and replay: the generated binding's index -- both peers hold the same
 * generated table -- and what happened to it. Nothing here names a key, a pad
 * or a port, so a remote player's events replay through exactly the path a
 * local one's take.
 */
export type InputEvent =
  | { kind: 'edge'; binding: number; down: boolean; source: string }
  | { kind: 'travel'; binding: number; units: number }
  | { kind: 'release' };

/**
 * Which player a binding serves. Start and coin carry their player in the
 * type rather than in PORT_PLAYER -- IPT_START2 is a player-one keyboard
 * binding -- so the type wins when it names one.
 */
export function bindingPlayer(binding: FieldBinding): number {
  const numbered = /^IPT_(?:START|COIN)(\d)$/.exec(binding.type ?? '');
  return numbered ? Number(numbered[1]) : binding.player ?? 1;
}

interface Field {
  /** this field's index in the generated bindings table; an event's identity */
  index: number;
  port: string;
  mask: number;
  activeLow: boolean;
  label: string;
  player: number;
  toggle: boolean;
  activeValue?: number;
  keyDelta?: number;
  relativeDelta?: number;
  /** MAME's PORT_nWAY for this switch, when the source declared one. */
  ways?: number;
  /** `player:number` of the digital joystick this switch belongs to. */
  stick?: string;
  /** which of MAME's four direction bits this switch is: UP, DOWN, LEFT, RIGHT. */
  dir?: number;
}

/**
 * What MAME's `digital_joystick::frame_update` carries between frames for one
 * lever (`src/emu/ioport.cpp`). State only: which switches the lever has is
 * wiring and lives in `stickFields`, so a save captures the two numbers and
 * never walks into the field table.
 */
interface Stick {
  /** m_current as the previous frame left it */
  previous: number;
  /** m_current4way: what a PORT_4WAY switch is allowed to assert */
  four: number;
}

/**
 * When a queued event takes effect within one frame.
 *
 * `hold` runs before the frame's interpolation baseline is taken, so what a
 * press changes is already in place when the frame begins -- which is where
 * an immediately-applied press used to land. `travel` runs after the baseline
 * and after MAME's per-frame ramp, so a spinner's distance is handed out
 * across the frame instead of appearing whole at its start.
 */
type Phase = 'hold' | 'travel';

const OPPOSITE_SUFFIX: Record<string, string> = { _LEFT: '_RIGHT', _RIGHT: '_LEFT', _UP: '_DOWN', _DOWN: '_UP' };

// MAME's JOYDIR_UP/DOWN/LEFT/RIGHT, in the order its IPT_DIGITAL_JOYSTICK
// block declares them: direction = (type - (FIRST + 1)) % 4.
const JOY_UP = 1 << 0;
const JOY_DOWN = 1 << 1;
const JOY_LEFT = 1 << 2;
const JOY_RIGHT = 1 << 3;
const JOY_VERTICAL = JOY_UP | JOY_DOWN;
const JOY_HORIZONTAL = JOY_LEFT | JOY_RIGHT;
const JOY_DIRECTIONS = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

/**
 * Which lever a MAME input type is a switch of, and which switch.
 *
 * MAME derives both arithmetically from the type's position in its own
 * enum -- stick number `(type - (FIRST + 1)) / 4`, direction the remainder --
 * so a panel with two levers gates each one separately. The three names here
 * are that block in order: JOYSTICK, JOYSTICKRIGHT, JOYSTICKLEFT.
 */
function joystickAxis(type: string | undefined): { stick: number; dir: number } | undefined {
  const match = /^IPT_JOYSTICK(LEFT|RIGHT)?_(UP|DOWN|LEFT|RIGHT)$/.exec(type ?? '');
  if (!match) return undefined;
  const stick = match[1] === undefined ? 0 : match[1] === 'RIGHT' ? 1 : 2;
  return { stick, dir: JOY_DIRECTIONS.indexOf(match[2]!) };
}

export class KeyboardInput implements InputPorts {
  private state: Record<string, number> = {};
  private init: Record<string, number> = {};
  private byKey = new Map<string, Field[]>();
  private byBinding = new Map<FieldBinding, Field>();
  /**
   * The sources physically holding each field, for SOCD restore and analog
   * ramps. A field is held while any source holds it: Space and X both fire
   * button one, and a pad's A echoes its X on a two-button machine, so one
   * release must not drop a control the other hand is still pressing.
   */
  private holds = new Map<string, Set<string>>();
  private toggled = new Map<string, boolean>();
  private fields: Field[] = [];
  /** opposite joystick direction per field id (LEFT<->RIGHT, UP<->DOWN) */
  private opposite = new Map<string, Field>();
  /** what each lever's last frame decided, by `player:number`; saved state */
  private sticks = new Map<string, Stick>();
  /** the four switches of each lever, by the same key; wiring, never saved */
  private stickFields = new Map<string, Field[]>();
  /**
   * When each field was last pressed, as a running count of edges. Two
   * opposite directions physically held at once are resolved by this: a
   * keyboard makes that routine and the newest press is the one the player
   * means.
   */
  private pressOrder = new Map<string, number>();
  private sequence = 0;
  /**
   * Bindings pressed and released inside one frame's batch of events, held
   * asserted for that one frame.
   *
   * A source posts what it saw, and a press and a release that both land
   * between two frames would otherwise cancel inside `advance()` and never
   * reach the machine at all. That window is one frame while the page keeps
   * up and the whole of a stall when it does not, which is why a tap
   * sometimes did nothing.
   */
  private carried = new Set<number>();
  private releaseListeners: (() => void)[] = [];
  /** ports holding a relative control, and their bytes as the frame began */
  private relativePorts = new Set<string>();
  /**
   * Absolute analog controls sharing one port field, by `port:mask`. A wheel
   * is two bindings over the same byte -- one per direction -- so the ramp has
   * to decide the target for the pair, not for each half independently.
   */
  private analogGroups = new Map<string, Field[]>();
  private frameStart: Record<string, number> = {};
  /** signed units each relative control (port:mask) has moved this frame */
  private frameDelta = new Map<string, number>();
  /**
   * Progress through the frame being emulated, 0..1, when the host knows it.
   * With it, a relative control's frame of travel is handed out gradually
   * -- MAME's `frame_interpolate` -- so a game that reads its trackball
   * counter several times a frame sees steps its 4-bit counter can carry.
   */
  frameFraction: (() => number) | null = null;
  /** when true, every key event + resulting port bytes go to the console */
  debug = false;
  /**
   * Where an input event goes instead of this frame's queue.
   *
   * A machine only ever sees input at a frame boundary, so every source --
   * keyboard, pad, pointer, or a peer across the network -- posts an event
   * and `advance()` applies it. A session installs itself here to stamp each
   * event with the frame it lands on, log it and send it on; with nothing
   * installed the events simply wait for the next frame.
   */
  sink: ((event: InputEvent) => void) | null = null;
  /** Events posted since the last frame, when no sink has taken them. */
  private pending: InputEvent[] = [];
  private readonly bindings: readonly FieldBinding[];

  constructor(bindings: FieldBinding[], _dipDefaults: DipDefault[], ports: PortSpec[]) {
    // dip defaults are already folded into each port's init byte by the generator
    for (const p of ports) { this.init[p.tag] = p.init; this.state[p.tag] = p.init; }
    this.bindings = bindings;
    const fields: Field[] = [];
    for (const [index, b] of bindings.entries()) {
      const f: Field = {
        index,
        port: b.port,
        mask: b.mask,
        activeLow: b.activeLow !== false,
        label: b.label,
        player: b.player ?? 1,
        toggle: b.toggle === true,
        activeValue: b.activeValue,
        keyDelta: b.keyDelta,
        relativeDelta: b.relativeDelta,
        ways: b.ways,
      };
      const axis = joystickAxis(b.type);
      if (axis) {
        f.stick = `${f.player}:${axis.stick}`;
        f.dir = axis.dir;
        if (!this.sticks.has(f.stick)) this.sticks.set(f.stick, { previous: 0, four: 0 });
        const switches = this.stickFields.get(f.stick) ?? [];
        switches.push(f);
        this.stickFields.set(f.stick, switches);
      }
      fields.push(f);
      this.byBinding.set(b, f);
      if (f.relativeDelta !== undefined) this.relativePorts.add(f.port);
      if (f.keyDelta !== undefined && f.activeValue !== undefined) {
        const key = `${f.port}:${f.mask}`;
        const group = this.analogGroups.get(key) ?? [];
        group.push(f);
        this.analogGroups.set(key, group);
      }
      for (const key of b.keys) {
        let list = this.byKey.get(key);
        if (!list) { list = []; this.byKey.set(key, list); }
        list.push(f);
      }
    }
    this.fields = fields;
    // SOCD pairs: opposite joystick directions on the same port. Arcade sticks
    // can never assert both, so game code ignores one — with a keyboard,
    // overlapping opposite arrows is routine and the newest press must win.
    // Two players' sticks often share one port under the same labels, so the
    // pair is also matched by player.
    for (const f of fields) {
      for (const [suffix, oppSuffix] of Object.entries(OPPOSITE_SUFFIX)) {
        if (!f.label.endsWith(suffix)) continue;
        const prefix = f.label.slice(0, -suffix.length);
        const opp = fields.find(o => o.port === f.port && o.player === f.player && o.label === prefix + oppSuffix);
        if (opp) this.opposite.set(this.fid(f), opp);
      }
    }
  }

  private fid(f: Field): string { return `${f.port}:${f.mask}:${f.player}:${f.label}`; }

  private isHeld(f: Field): boolean { return (this.holds.get(this.fid(f))?.size ?? 0) > 0; }

  /** record one source's hold on a field and answer whether anything still holds it */
  private hold(f: Field, source: string, down: boolean): boolean {
    let sources = this.holds.get(this.fid(f));
    if (!sources) { sources = new Set(); this.holds.set(this.fid(f), sources); }
    if (down) sources.add(source); else sources.delete(source);
    return sources.size > 0;
  }

  /**
   * Settle every port byte for the frame about to run.
   *
   * This is the machine's only input boundary: what is queued is applied
   * here, and nothing touches a port again until the frame is over. That is
   * what lets a session say which frame an event belongs to -- and replay a
   * peer's events into exactly that frame -- instead of depending on when a
   * browser happened to deliver a key.
   *
   * `events` is the session's list for this frame; without one the queue this
   * input model filled itself is used.
   */
  advance(events?: readonly InputEvent[]): void {
    const list = events ?? this.takePending();
    // 1. What the controls did since the last frame, in the order it happened,
    // then MAME's own once-a-frame resolution of every lever on the panel.
    this.settle(list);
    // 2. Where each relative port stood as the frame begins; every delta landed
    // from here to the board's frame() is what this frame interpolates.
    for (const tag of this.relativePorts) this.frameStart[tag] = this.state[tag];
    this.frameDelta.clear();
    // 3. MAME's PORT_KEYDELTA ramp: browser key-repeat is an OS preference and
    // may be delayed, disabled, or absent in automation, so a held relative
    // control moves once per emulated frame regardless.
    for (const field of this.fields) {
      if (field.relativeDelta === undefined || !this.isHeld(field)) continue;
      this.travel(field, field.relativeDelta);
    }
    // 3b. The same ramp for an absolute control. MAME moves an analog field
    // toward full deflection by PORT_KEYDELTA while a key is held and springs
    // it back toward its own rest value when released; it never jumps. A
    // steering wheel that snapped between hard left and hard right could not
    // be driven.
    this.rampAnalog();
    // 4. Distance a spinner, trackball or mouse covered, handed out across the
    // frame rather than appearing whole at its start.
    for (const event of list) this.applyEvent(event, 'travel');
  }

  /**
   * Apply what is queued without running a frame's ramp -- for a preflight
   * probe that presses a control and reads the port back without emulating
   * anything. The run loop uses `advance()`.
   */
  latch(): void {
    const list = this.takePending();
    this.settle(list);
    for (const event of list) this.applyEvent(event, 'travel');
    // A probe reads the port back immediately, so an absolute control settles
    // at its destination here rather than over the frames a ramp would take.
    this.rampAnalog(true);
  }

  /**
   * Apply one batch of events and settle every switch they touched.
   *
   * MAME does its digital work once a frame in this order too: every port's
   * switches are read, `digital_joystick::frame_update` resolves each lever,
   * and only then does a field decide whether its bit reaches the port.
   */
  private settle(list: readonly InputEvent[]): void {
    // Last frame's one-frame holds go back to whatever is physically held.
    for (const index of this.carried) {
      const field = this.fields[index];
      if (field && field.stick === undefined) this.apply(field, this.isHeld(field));
    }
    this.carried.clear();
    const tapped = new Set<number>();
    for (const event of list) {
      this.applyEvent(event, 'hold');
      // A wholesale release means nothing is held any more, so a press it
      // swept away is not a tap: re-asserting one there is how a control
      // gets stuck on after the page loses focus. A press after it is.
      if (event.kind === 'release') tapped.clear();
      else if (event.kind === 'edge' && event.down) tapped.add(event.binding);
    }
    // A press the same batch also released is held for this one frame, so a
    // tap between two frames still reaches the machine.
    for (const index of tapped) {
      const field = this.fields[index];
      if (!field || field.toggle || field.relativeDelta !== undefined) continue;
      if (this.isHeld(field)) continue;
      this.carried.add(index);
      if (field.stick === undefined) this.apply(field, true);
    }
    this.settleSticks();
  }

  /** Physically held, or held for this one frame because it was tapped. */
  private pressed(f: Field): boolean {
    return this.isHeld(f) || this.carried.has(f.index);
  }

  /**
   * MAME's `digital_joystick::frame_update`, once per lever per frame.
   *
   * A real cabinet's lever moves inside a gate, and a `PORT_4WAY` gate is
   * square: the machine was built knowing up and left can never arrive
   * together. An arcade stick with a square or octagonal restrictor produces
   * those diagonals freely, and a 4-way game reads the pair as horizontal --
   * which is a player walking past the ladder they are trying to climb. A
   * keyboard almost never makes a diagonal, so nothing showed this before.
   *
   * MAME resolves it by favouring the direction that just changed, so a lever
   * travelling from left to up passes through up-left and lands on up at
   * once; a diagonal it cannot attribute to a change falls to horizontal.
   */
  private settleSticks(): void {
    for (const [name, switches] of this.stickFields) {
      const stick = this.sticks.get(name)!;
      let current = 0;
      for (const f of switches) if (this.pressed(f)) current |= 1 << f.dir!;
      current = this.resolveOpposites(switches, current);
      if (current !== stick.previous) {
        let four = current;
        // Zero the switches that did not change, which leaves the new one.
        if ((four & JOY_VERTICAL) && (four & JOY_HORIZONTAL)) four ^= four & stick.previous;
        // Still diagonal: the lever went from rest or from one diagonal
        // straight to another, and MAME picks the horizontal axis.
        if ((four & JOY_VERTICAL) && (four & JOY_HORIZONTAL)) four &= ~JOY_VERTICAL;
        stick.four = four;
      } else {
        stick.four &= current;
      }
      stick.previous = current;
      for (const f of switches) {
        // MAME reads m_way per switch, not per lever, and 16 asks for no
        // restriction at all.
        const allowed = f.ways === 16 ? current : f.ways === 4 ? stick.four : current;
        this.apply(f, (allowed & (1 << f.dir!)) !== 0);
      }
      if (!this.debug) continue;
      // ?debug=1: a direction the player is physically holding that the gate
      // refused. This is the line that separates "the press was lost" from
      // "the machine was told and ignored it".
      const held = switches.filter(f => this.pressed(f));
      const gated = held.filter(f => {
        const allowed = f.ways === 16 ? current : f.ways === 4 ? stick.four : current;
        return (allowed & (1 << f.dir!)) === 0;
      });
      if (gated.length) {
        console.log(`[input] lever ${name} holding ${held.map(f => f.label).join('+')} -> gate dropped ` +
          `${gated.map(f => f.label).join('+')} | ${this.dump()}`);
      }
    }
  }

  /**
   * Opposite directions on one lever, which a real gate cannot assert at once.
   *
   * MAME zeroes both, because on a cabinet the pair can only mean a broken
   * switch. Here the pair is routine -- a keyboard rolls one arrow onto the
   * other, and a thumbstick crosses centre -- so the newest press wins and
   * releasing it hands the lever back to the one still held. Either way the
   * port never sees both, which is all the machine was built to assume.
   */
  private resolveOpposites(switches: readonly Field[], current: number): number {
    for (const [a, b] of [[JOY_UP, JOY_DOWN], [JOY_LEFT, JOY_RIGHT]] as const) {
      if ((current & a) === 0 || (current & b) === 0) continue;
      current &= ~(this.stamp(switches, a) >= this.stamp(switches, b) ? b : a);
    }
    return current;
  }

  /** How recently one direction of a lever was pressed; 0 if never. */
  private stamp(switches: readonly Field[], bit: number): number {
    let newest = 0;
    for (const f of switches) {
      if ((1 << f.dir!) !== bit || !this.pressed(f)) continue;
      newest = Math.max(newest, this.pressOrder.get(this.fid(f)) ?? 0);
    }
    return newest;
  }

  /**
   * Move every absolute analog control one frame's PORT_KEYDELTA toward where
   * its keys say it should be -- full deflection while held, its own rest
   * value when not. `snap` jumps straight there instead, for `latch()`.
   */
  private rampAnalog(snap = false): void {
    for (const group of this.analogGroups.values()) {
      const first = group[0]!;
      const shift = Math.log2(first.mask & -first.mask);
      const held = group.find(field => this.pressed(field));
      const target = held?.activeValue !== undefined
        ? (held.activeValue & first.mask) >>> shift
        : (this.init[first.port] & first.mask) >>> shift;
      const current = (this.state[first.port] & first.mask) >>> shift;
      if (current === target) continue;
      const step = Math.max(1, Math.abs(held?.keyDelta ?? first.keyDelta ?? 1));
      const next = snap
        ? target
        : current < target
          ? Math.min(target, current + step)
          : Math.max(target, current - step);
      this.state[first.port] =
        (this.state[first.port] & ~first.mask) | ((next << shift) & first.mask);
    }
  }

  /** The generated binding an event names. */
  binding(index: number): FieldBinding | undefined {
    return this.bindings[index];
  }

  private takePending(): InputEvent[] {
    const list = this.pending;
    this.pending = [];
    return list;
  }

  /** Queue one event for the next frame, or hand it to the session that took over. */
  private post(event: InputEvent): void {
    if (this.sink) this.sink(event);
    else this.pending.push(event);
  }

  /** Apply one queued event in the phase of the frame that owns it. */
  private applyEvent(event: InputEvent, phase: Phase): void {
    if (event.kind === 'release') {
      if (phase === 'hold') this.applyRelease();
      return;
    }
    const field = this.fields[event.binding];
    if (!field) return;
    if (event.kind === 'travel') {
      if (phase === 'travel' && field.relativeDelta !== undefined && event.units) {
        this.travel(field, event.units);
      }
      return;
    }
    if (phase === 'hold') this.applyEdge(field, event.down, event.source);
  }

  /** move a relative control by signed units, wrapped in its mask, and log the frame's travel */
  private travel(field: Field, units: number): void {
    const shift = Math.log2(field.mask & -field.mask);
    const current = (this.state[field.port] & field.mask) >>> shift;
    const width = field.mask >>> shift;
    this.state[field.port] = (this.state[field.port] & ~field.mask) | (((current + units) & width) << shift);
    const key = `${field.port}:${field.mask}`;
    this.frameDelta.set(key, (this.frameDelta.get(key) ?? 0) + units);
  }

  /** drive a field active (pressed) or back to its resting bits */
  private apply(f: Field, active: boolean): void {
    // A ramped analog control is owned by rampAnalog(); the edge only changes
    // which way it is travelling, never the value.
    if (f.keyDelta !== undefined && f.activeValue !== undefined) return;
    if (active) {
      this.state[f.port] = f.activeValue !== undefined
        ? (this.state[f.port] & ~f.mask) | (f.activeValue & f.mask)
        : f.activeLow ? this.state[f.port] & ~f.mask : this.state[f.port] | f.mask;
    } else {
      this.state[f.port] = (this.state[f.port] & ~f.mask) | (this.init[f.port] & f.mask);
    }
  }

  attach(target: EventTarget): void {
    target.addEventListener('keydown', ev => this.onKey(ev as KeyboardEvent, true));
    target.addEventListener('keyup', ev => this.onKey(ev as KeyboardEvent, false));
    // keyup events are lost when focus leaves (OS shortcuts — notably
    // Ctrl+Arrow on macOS — tab switches, screenshots): release everything
    // or keys stay latched ("sticky" input)
    target.addEventListener('blur', () => this.releaseAll());
    target.addEventListener('visibilitychange', () => { if (document.hidden) this.releaseAll(); });
  }

  /**
   * One edge on one generated field, from any source. A gamepad's polled
   * buttons arrive here; the keyboard's key events arrive through `onKey`
   * and reach the same place. `binding` is the generated object the field
   * was constructed from, so a source that holds the config's bindings needs
   * no lookup of its own. `source` names what is holding the field — a pad's
   * control, say — so two controls on one field release it only together.
   */
  press(binding: FieldBinding, down: boolean, source = 'press'): void {
    const field = this.byBinding.get(binding);
    if (field) this.drive(field, down, false, source);
  }

  /**
   * Move a relative control by a whole number of port units, as a spinner,
   * trackball or mouse does: no hold, no per-frame ramp, just the distance
   * travelled this frame, wrapped within the field's mask like `advance()`.
   */
  nudge(binding: FieldBinding, units: number): void {
    const field = this.byBinding.get(binding);
    if (!field || field.relativeDelta === undefined || !units) return;
    this.post({ kind: 'travel', binding: field.index, units });
  }

  private drive(h: Field, down: boolean, repeat: boolean, source: string): void {
    if (repeat) return; // auto-repeat carries no new information
    this.post({ kind: 'edge', binding: h.index, down, source });
  }

  private applyEdge(h: Field, down: boolean, source: string): void {
    if (h.relativeDelta !== undefined) {
      this.hold(h, source, down);
      // Make a tap observable in the frame it happened, before the frame's
      // interpolation baseline is taken; the ramp that follows supplies
      // MAME's per-frame delta for as long as the control stays held.
      if (down) this.travel(h, h.relativeDelta);
      return;
    }
    if (h.toggle) {
      if (!down) return;
      const active = !(this.toggled.get(this.fid(h)) ?? false);
      this.toggled.set(this.fid(h), active);
      this.apply(h, active);
      return;
    }
    const held = this.hold(h, source, down);
    if (down) this.pressOrder.set(this.fid(h), ++this.sequence);
    // A switch of a digital joystick belongs to the lever, not to this edge:
    // `settleSticks()` decides what all four of them assert, once, after every
    // event in the frame has landed.
    if (h.stick !== undefined) return;
    const opp = this.opposite.get(this.fid(h));
    this.apply(h, held);
    if (opp && this.isHeld(opp)) {
      // SOCD: newest direction wins while both are physically held;
      // releasing it hands control back to the still-held opposite
      this.apply(opp, !held);
    }
  }

  private onKey(ev: KeyboardEvent, down: boolean): void {
    const hits = this.byKey.get(ev.code);
    if (!hits) {
      if (this.debug && down && !ev.repeat) console.log(`[input] ${ev.code} unbound`);
      return;
    }
    ev.preventDefault();
    for (const h of hits) {
      this.drive(h, down, ev.repeat, ev.code);
      if (this.debug && !ev.repeat && h.relativeDelta === undefined && !h.toggle) {
        console.log(`[input] ${ev.code} ${down ? 'DOWN' : 'UP'} -> ${h.port} mask=0x${h.mask.toString(16)} ` +
          `${h.activeLow ? 'activeLow' : 'activeHigh'} | ${this.dump()}`);
      }
    }
  }

  /** Save-state roots (machine-state.ts): port bytes, holds, toggles and this frame's travel. */
  stateKeys(): readonly string[] {
    return ['state', 'init', 'holds', 'toggled', 'frameStart', 'frameDelta', 'pending',
      'sticks', 'pressOrder', 'sequence', 'carried'];
  }

  /** all port bytes as hex, for logging/overlay */
  dump(): string {
    return Object.entries(this.state).map(([t, v]) => `${t}=${v.toString(16).padStart(2, '0')}`).join(' ');
  }

  /**
   * Called after every `releaseAll`, so a polled source can forget what it
   * believed was held and re-press whatever still is on its next poll.
   */
  onReleaseAll(listener: () => void): void {
    this.releaseListeners.push(listener);
  }

  /** release every input back to its resting byte (dips keep their value) */
  releaseAll(): void {
    this.post({ kind: 'release' });
    // The sources forget at once, so a polled pad re-presses whatever is
    // still physically held on its next poll rather than waiting for the
    // port bytes to catch up at the frame boundary.
    for (const listener of this.releaseListeners) listener();
  }

  /**
   * Every control back to rest at once: nothing held, no maintained switch
   * set, nothing queued.
   *
   * `releaseAll` is what a lost keyup deserves — it leaves toggles alone,
   * because a service switch a player flipped is still flipped. This is for
   * starting again from a known place, which is what two browsers have to do
   * before they can share a machine.
   */
  reset(): void {
    this.pending = [];
    this.holds.clear();
    this.toggled.clear();
    this.pressOrder.clear();
    this.carried.clear();
    this.sequence = 0;
    for (const stick of this.sticks.values()) { stick.previous = 0; stick.four = 0; }
    for (const tag of Object.keys(this.state)) this.state[tag] = this.init[tag];
    for (const tag of this.relativePorts) this.frameStart[tag] = this.state[tag];
    this.frameDelta.clear();
    for (const listener of this.releaseListeners) listener();
  }

  /** The port half of `releaseAll`, at the frame boundary. */
  private applyRelease(): void {
    for (const tag of Object.keys(this.state)) this.state[tag] = this.init[tag];
    for (const tag of this.relativePorts) this.frameStart[tag] = this.state[tag];
    this.holds.clear();
    this.carried.clear();
    for (const stick of this.sticks.values()) { stick.previous = 0; stick.four = 0; }
    for (const field of this.fields) {
      if (field.toggle && this.toggled.get(this.fid(field))) this.apply(field, true);
    }
  }

  read(tag: string): number {
    const value = this.state[tag] ?? 0xff;
    if (!this.frameFraction || !this.relativePorts.has(tag)) return value;
    const fraction = this.frameFraction();
    if (fraction >= 1) return value;
    const start = this.frameStart[tag] ?? value;
    let blended = value;
    const done = new Set<string>();
    for (const field of this.fields) {
      if (field.relativeDelta === undefined || field.port !== tag) continue;
      const key = `${field.port}:${field.mask}`;
      if (done.has(key)) continue;
      done.add(key);
      const delta = this.frameDelta.get(key) ?? 0;
      if (!delta) continue;
      const shift = Math.log2(field.mask & -field.mask);
      const width = field.mask >>> shift;
      const from = (start & field.mask) >>> shift;
      const now = (from + Math.trunc(delta * fraction)) & width;
      blended = (blended & ~field.mask) | (now << shift);
    }
    return blended;
  }

  setDip(port: string, mask: number, value: number): void {
    this.init[port] = (this.init[port] & ~mask) | (value & mask);
    this.state[port] = (this.state[port] & ~mask) | (value & mask);
  }
}
