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
  /** Relative masked delta applied each emulated frame while held. */
  relativeDelta?: number;
  /**
   * MAME's PORT_SENSITIVITY for a relative control, percent: one pixel of
   * mouse, spinner or trackball travel moves the port this/100 units.
   */
  sensitivity?: number;
}

export interface DipDefault { port: string; mask: number; value: number; name: string }

export interface PortSpec { tag: string; init: number }

interface Field {
  port: string;
  mask: number;
  activeLow: boolean;
  label: string;
  player: number;
  toggle: boolean;
  activeValue?: number;
  relativeDelta?: number;
}

const OPPOSITE_SUFFIX: Record<string, string> = { _LEFT: '_RIGHT', _RIGHT: '_LEFT', _UP: '_DOWN', _DOWN: '_UP' };

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
  private releaseListeners: (() => void)[] = [];
  /** when true, every key event + resulting port bytes go to the console */
  debug = false;

  constructor(bindings: FieldBinding[], _dipDefaults: DipDefault[], ports: PortSpec[]) {
    // dip defaults are already folded into each port's init byte by the generator
    for (const p of ports) { this.init[p.tag] = p.init; this.state[p.tag] = p.init; }
    const fields: Field[] = [];
    for (const b of bindings) {
      const f: Field = {
        port: b.port,
        mask: b.mask,
        activeLow: b.activeLow !== false,
        label: b.label,
        player: b.player ?? 1,
        toggle: b.toggle === true,
        activeValue: b.activeValue,
        relativeDelta: b.relativeDelta,
      };
      fields.push(f);
      this.byBinding.set(b, f);
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
   * Advance relative cabinet controls once per emulated frame. MAME's
   * PORT_KEYDELTA describes a frame-rate input ramp; browser key-repeat is an
   * OS preference and may be delayed, disabled, or absent in automation.
   */
  advance(): void {
    for (const field of this.fields) {
      if (field.relativeDelta === undefined || !this.isHeld(field)) continue;
      const current = this.state[field.port] & field.mask;
      this.state[field.port] = (this.state[field.port] & ~field.mask) |
        ((current + field.relativeDelta) & field.mask);
    }
  }

  /** drive a field active (pressed) or back to its resting bits */
  private apply(f: Field, active: boolean): void {
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
    const current = this.state[field.port] & field.mask;
    this.state[field.port] = (this.state[field.port] & ~field.mask) | ((current + units) & field.mask);
  }

  private drive(h: Field, down: boolean, repeat: boolean, source: string): void {
    if (h.relativeDelta !== undefined) {
      if (repeat) return;
      this.hold(h, source, down);
      if (down) {
        // Make a tap observable immediately; advance() supplies subsequent
        // MAME-style per-frame deltas for as long as the key remains held.
        const current = this.state[h.port] & h.mask;
        this.state[h.port] = (this.state[h.port] & ~h.mask) |
          ((current + h.relativeDelta) & h.mask);
      }
      return;
    }
    if (repeat) return; // digital auto-repeat carries no new information
    if (h.toggle) {
      if (!down) return;
      const active = !(this.toggled.get(this.fid(h)) ?? false);
      this.toggled.set(this.fid(h), active);
      this.apply(h, active);
      return;
    }
    const held = this.hold(h, source, down);
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
    for (const tag of Object.keys(this.state)) this.state[tag] = this.init[tag];
    this.holds.clear();
    for (const field of this.fields) {
      if (field.toggle && this.toggled.get(this.fid(field))) this.apply(field, true);
    }
    for (const listener of this.releaseListeners) listener();
  }

  read(tag: string): number {
    return this.state[tag] ?? 0xff;
  }

  setDip(port: string, mask: number, value: number): void {
    this.init[port] = (this.init[port] & ~mask) | (value & mask);
    this.state[port] = (this.state[port] & ~mask) | (value & mask);
  }
}
