// Gamepad -> the same generated port fields the keyboard drives.
//
// The Gamepad API has no events for buttons, only for connection, so the pad
// is polled once per emulated frame from the run loop and every change is
// handed to `KeyboardInput.press()` as an edge. Nothing here knows a port, a
// polarity or a game: the W3C Standard Gamepad layout is mapped onto MAME
// input types, and which fields those types name on this machine comes from
// the generated bindings.

import type { FieldBinding, KeyboardInput } from './input.ts';

/**
 * The part of the W3C `Gamepad` interface this reads. Specs feed synthetic
 * objects of the same shape; the browser feeds `navigator.getGamepads()`.
 */
export interface PadState {
  index: number;
  id: string;
  /** "standard" when the browser recognised the layout; "" when it did not */
  mapping: string;
  connected: boolean;
  buttons: readonly { pressed: boolean; value: number }[];
  axes: readonly number[];
}

export interface ConnectedPad { player: number; index: number; id: string; mapping: string }

/** A digital control of a standard pad: a direction, or button `n` of the layout. */
type Control = 'up' | 'down' | 'left' | 'right' | 'rup' | 'rdown' | 'rleft' | 'rright' | `b${number}`;

/** A stick past this much of its travel reads as a held direction. */
const DEADZONE = 0.5;

/**
 * Standard Gamepad layout onto MAME input types.
 *
 * Buttons follow the six-button Street Fighter panel because that is what a
 * fight stick or leverless box physically is: the three punches on the top
 * row read X, Y, RB and the three kicks below them read A, B, RT (the left
 * shoulder pair is the spare column). The keyboard tables in the generator
 * make the same choice for the CPS boards. The two small buttons follow a
 * cabinet's panel rather than the pad's names: the first (Select) is start
 * and the second (Start) is the coin slot, which is how a fight stick's side
 * buttons read left to right.
 */
const STANDARD: Record<string, Control> = {
  IPT_JOYSTICK_LEFT: 'left', IPT_JOYSTICK_RIGHT: 'right',
  IPT_JOYSTICK_UP: 'up', IPT_JOYSTICK_DOWN: 'down',
  IPT_JOYSTICKLEFT_LEFT: 'left', IPT_JOYSTICKLEFT_RIGHT: 'right',
  IPT_JOYSTICKLEFT_UP: 'up', IPT_JOYSTICKLEFT_DOWN: 'down',
  IPT_JOYSTICKRIGHT_LEFT: 'rleft', IPT_JOYSTICKRIGHT_RIGHT: 'rright',
  IPT_JOYSTICKRIGHT_UP: 'rup', IPT_JOYSTICKRIGHT_DOWN: 'rdown',
  // relative controls are generated as two pulse halves; the stick ramps them
  IPT_DIAL_LEFT: 'left', IPT_DIAL_RIGHT: 'right',
  IPT_TRACKBALL_X_LEFT: 'left', IPT_TRACKBALL_X_RIGHT: 'right',
  IPT_TRACKBALL_Y_UP: 'up', IPT_TRACKBALL_Y_DOWN: 'down',
  IPT_BUTTON1: 'b2', IPT_BUTTON2: 'b3', IPT_BUTTON3: 'b5',
  IPT_BUTTON4: 'b0', IPT_BUTTON5: 'b1', IPT_BUTTON6: 'b7',
  IPT_BUTTON7: 'b4', IPT_BUTTON8: 'b6',
  IPT_START: 'b8', IPT_START1: 'b8', IPT_START2: 'b8',
  IPT_SELECT: 'b9', IPT_COIN1: 'b9', IPT_COIN2: 'b9',
  IPT_PEDAL: 'b7', IPT_PEDAL2: 'b6',
};

/**
 * On a machine with no kick row the bottom row echoes the top one, so a plain
 * pad fires Galaga from A as readily as from X. Each alias is taken only when
 * the machine has nothing of its own on that button.
 */
const FOLD: [Control, string][] = [['b0', 'IPT_BUTTON1'], ['b1', 'IPT_BUTTON2'], ['b7', 'IPT_BUTTON3']];

/** Legend names for the standard layout, in the Xbox spelling browsers use. */
const STANDARD_NAMES: Record<string, string> = {
  b0: 'A', b1: 'B', b2: 'X', b3: 'Y', b4: 'LB', b5: 'RB', b6: 'LT', b7: 'RT',
  b8: 'Select', b9: 'Start', b10: 'L3', b11: 'R3',
  up: 'D-pad', down: 'D-pad', left: 'D-pad', right: 'D-pad',
  rup: 'right stick', rdown: 'right stick', rleft: 'right stick', rright: 'right stick',
};

/**
 * The standard-layout button that drives one MAME input type, in the Xbox
 * spelling browsers use, or undefined when the layout has no button for it.
 * The generator's home page reads its controller legend from here so the
 * page and the poll can never disagree.
 */
export function standardPadButton(type: string): string | undefined {
  const control = STANDARD[type];
  return control ? STANDARD_NAMES[control] ?? control : undefined;
}

/**
 * Which pad serves a binding. Start and coin carry their player in the type
 * rather than in PORT_PLAYER — IPT_START2 is a player-one keyboard binding —
 * and MAME's defaults put them on the second pad's Start and Select.
 */
function padPlayer(binding: FieldBinding): number {
  const numbered = /^IPT_(?:START|COIN)(\d)$/.exec(binding.type ?? '');
  return numbered ? Number(numbered[1]) : binding.player ?? 1;
}

/** The pad's own name without the vendor/product decoration browsers append. */
export function padName(id: string): string {
  return id
    .replace(/\s*\(.*?Vendor:.*\)\s*$/i, '')
    .replace(/^[0-9a-f]{4}-[0-9a-f]{4}-/i, '')
    .trim() || 'gamepad';
}

/** The digital controls a pad currently asserts. */
function activeControls(pad: PadState): Set<Control> {
  const active = new Set<Control>();
  pad.buttons.forEach((button, index) => {
    if (button.pressed || button.value > DEADZONE) active.add(`b${index}`);
  });
  // The standard layout's d-pad is buttons 12-15; an unmapped pad usually
  // has only its stick, which is what the fallback reads.
  if (pad.mapping === 'standard') {
    if (active.delete('b12')) active.add('up');
    if (active.delete('b13')) active.add('down');
    if (active.delete('b14')) active.add('left');
    if (active.delete('b15')) active.add('right');
  }
  const [x = 0, y = 0, rx = 0, ry = 0] = pad.axes;
  if (x < -DEADZONE) active.add('left');
  if (x > DEADZONE) active.add('right');
  if (y < -DEADZONE) active.add('up');
  if (y > DEADZONE) active.add('down');
  if (pad.mapping === 'standard') {
    if (rx < -DEADZONE) active.add('rleft');
    if (rx > DEADZONE) active.add('rright');
    if (ry < -DEADZONE) active.add('rup');
    if (ry > DEADZONE) active.add('rdown');
  }
  return active;
}

interface Slot extends ConnectedPad { active: Set<Control> }

export class GamepadInput {
  /** `${player}:${control}` -> the fields that control drives */
  private targets = new Map<string, FieldBinding[]>();
  /** every control that reaches a binding, for the legend */
  private controls = new Map<FieldBinding, Control[]>();
  private slots: Slot[] = [];
  private players: number;
  private listeners: ((pads: ConnectedPad[]) => void)[] = [];
  private input: KeyboardInput;
  private read: () => readonly (PadState | null)[];
  debug = false;

  constructor(
    input: KeyboardInput,
    bindings: FieldBinding[],
    read: () => readonly (PadState | null)[],
  ) {
    this.input = input;
    this.read = read;
    let players = 1;
    const claim = (player: number, control: Control, binding: FieldBinding): void => {
      const key = `${player}:${control}`;
      let list = this.targets.get(key);
      if (!list) { list = []; this.targets.set(key, list); }
      list.push(binding);
      let names = this.controls.get(binding);
      if (!names) { names = []; this.controls.set(binding, names); }
      names.push(control);
    };
    for (const binding of bindings) {
      const control = binding.type ? STANDARD[binding.type] : undefined;
      if (!control) continue;
      const player = padPlayer(binding);
      players = Math.max(players, player);
      claim(player, control, binding);
    }
    for (let player = 1; player <= players; player++) {
      for (const [control, type] of FOLD) {
        if (this.targets.has(`${player}:${control}`)) continue;
        for (const binding of bindings) {
          if (binding.type === type && padPlayer(binding) === player) claim(player, control, binding);
        }
      }
    }
    this.players = players;
    // A blur or a reset released every field under us; forget what we held
    // so the next poll re-presses anything the player still holds.
    input.onReleaseAll(() => { for (const slot of this.slots) slot.active.clear(); });
  }

  /** Connection events only prompt a poll; the run loop polls every frame anyway. */
  attach(target: EventTarget): void {
    target.addEventListener('gamepadconnected', () => this.poll());
    target.addEventListener('gamepaddisconnected', () => this.poll());
  }

  /** Called whenever the set of connected pads changes. */
  onChange(listener: (pads: ConnectedPad[]) => void): void {
    this.listeners.push(listener);
  }

  connected(): ConnectedPad[] {
    return this.slots.map(({ player, index, id, mapping }) => ({ player, index, id, mapping }));
  }

  /** Legend names of the pad controls that drive one binding; empty while its player has no pad. */
  controlNames(binding: FieldBinding): string[] {
    const slot = this.slots.find(candidate => candidate.player === padPlayer(binding));
    if (!slot) return [];
    const names = (this.controls.get(binding) ?? []).map(control =>
      slot.mapping === 'standard' || !/^b\d+$/.test(control)
        ? STANDARD_NAMES[control] ?? control
        : `button ${Number(control.slice(1)) + 1}`);
    return [...new Set(names)];
  }

  /**
   * Read every pad once and deliver each changed control as an edge. Pads
   * take player slots in the order they arrive; a pad that goes away releases
   * whatever it held and frees its slot for the next one.
   */
  poll(): void {
    const pads = this.read();
    const seen = new Set<number>();
    let changed = false;
    for (const pad of pads) {
      if (!pad || !pad.connected) continue;
      seen.add(pad.index);
      let slot = this.slots.find(candidate => candidate.index === pad.index);
      if (!slot) {
        const taken = new Set(this.slots.map(candidate => candidate.player));
        let player = 1;
        while (taken.has(player)) player++;
        if (player > this.players) continue; // more pads than the machine has players
        slot = { player, index: pad.index, id: pad.id, mapping: pad.mapping, active: new Set() };
        this.slots.push(slot);
        changed = true;
        if (this.debug) console.log(`[gamepad] player ${player}: ${pad.id} (mapping "${pad.mapping}")`);
      }
      this.update(slot, activeControls(pad));
    }
    for (const slot of [...this.slots]) {
      if (seen.has(slot.index)) continue;
      this.update(slot, new Set());
      this.slots.splice(this.slots.indexOf(slot), 1);
      changed = true;
      if (this.debug) console.log(`[gamepad] player ${slot.player} disconnected: ${slot.id}`);
    }
    if (changed) for (const listener of this.listeners) listener(this.connected());
  }

  private update(slot: Slot, next: Set<Control>): void {
    for (const control of next) if (!slot.active.has(control)) this.edge(slot, control, true);
    for (const control of slot.active) if (!next.has(control)) this.edge(slot, control, false);
    slot.active = next;
  }

  private edge(slot: Slot, control: Control, down: boolean): void {
    const bindings = this.targets.get(`${slot.player}:${control}`);
    if (!bindings) {
      if (this.debug && down) console.log(`[gamepad] player ${slot.player} ${control} unbound`);
      return;
    }
    for (const binding of bindings) this.input.press(binding, down, `pad${slot.player}:${control}`);
    if (this.debug) {
      console.log(`[gamepad] player ${slot.player} ${control} ${down ? 'DOWN' : 'UP'} -> ` +
        `${bindings.map(binding => binding.label).join(', ')} | ${this.input.dump()}`);
    }
  }
}
