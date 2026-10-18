// MAME's natural keyboard (emu/natkeyboard.cpp) as one more input source: text
// in, key presses out. This is a host feature (ARCHITECTURE.md section 8): what
// it types with comes entirely from the generated bindings -- each key's
// `PORT_CHAR`s, which say which characters it produces under which shift keys
// -- so it reaches any machine with a keyboard through the same `press()` the
// physical keyboard and a gamepad use, and knows nothing about a C64.
//
// The pacing is MAME's: a step every 50 ms of emulated time (200 ms while the
// character is a carriage return), a shifted character pressing its shift key
// one step before the key itself, and every key of a character released
// together. Steps land on frame boundaries, where the input model settles
// ports, and at most one a frame, so no press is ever shorter than a frame.

import type { FieldBinding } from './input.ts';

/** The one method of KeyboardInput this source drives. */
export interface PressTarget {
  press(binding: FieldBinding, down: boolean, source?: string): void;
}

interface KeyCombination {
  /** The shift state (a bit per shift key) the character needs. */
  shift: number;
  /** The shift keys for that state, in order, then the key itself. */
  fields: FieldBinding[];
}

const SOURCE = 'natural-keyboard';
/** MAME's SHIFT_COUNT + 1: the most fields one character presses. */
const FIELDS_PER_CODE = 3;

/** MAME's `post_coded` escapes, which name a key by what it does. */
const CODED: Record<string, string> = {
  BACKSPACE: '\b', BS: '\b', BKSP: '\b', CAPSLOCK: '{CAPSLOCK}', CR: '\r',
  DEL: '{DEL}', DELETE: '{DEL}', END: '{END}', ENTER: '\r', ESC: '\x1b',
  HOME: '{HOME}', INS: '{INSERT}', INSERT: '{INSERT}', LF: '\n',
  PGDN: '{PGDN}', PGUP: '{PGUP}', SPACE: ' ', TAB: '\t',
  F1: '{F1}', F2: '{F2}', F3: '{F3}', F4: '{F4}', F5: '{F5}', F6: '{F6}',
  F7: '{F7}', F8: '{F8}', F9: '{F9}', F10: '{F10}', F11: '{F11}', F12: '{F12}',
  QUOTE: '"',
};

export class NaturalKeyboard {
  private readonly codes = new Map<string, KeyCombination[]>();
  private readonly target: PressTarget;
  private readonly alternates: Readonly<Record<string, string>>;
  private queue: string[] = [];
  private current: KeyCombination | undefined;
  private fieldIndex = 0;
  private keyDown = false;
  private remaining = 0;
  /** A fixed step from `postCoded`; 0 for MAME's per-character default. */
  private rate = 0;
  private lastCr = false;

  /**
   * `alternates` is MAME's own table of characters typed another way
   * (`charinfo` in natkeyboard.cpp): lowercase as uppercase on a machine
   * without lowercase keys, an accented letter as its plain one.
   */
  constructor(target: PressTarget, bindings: readonly FieldBinding[], alternates: Readonly<Record<string, string>> = {}) {
    this.target = target;
    this.alternates = alternates;
    // build_codes: the shift keys first, then every key's characters in every
    // shift state the machine's shift keys can make.
    const keys = bindings.filter(binding => binding.type === 'IPT_KEYBOARD' && binding.chars?.length);
    const shifts: (FieldBinding | undefined)[] = [];
    let mask = 0;
    for (const binding of keys) {
      for (const code of binding.chars![0] ?? []) {
        const shift = /^\{SHIFT_(\d)\}$/.exec(code)?.[1];
        if (shift === undefined) continue;
        const bit = Number(shift) - 1;
        mask |= 1 << bit;
        shifts[bit] = binding;
      }
    }
    for (const binding of keys) {
      binding.chars!.forEach((codes, state) => {
        if (state & ~mask) return;
        for (const code of codes) {
          if (/^\{SHIFT_\d\}$/.test(code)) continue;
          const fields: FieldBinding[] = [];
          for (let bit = 0; bit < shifts.length; bit++) {
            if ((state >> bit) & 1) fields.push(shifts[bit]!);
          }
          fields.push(binding);
          const entries = this.codes.get(code) ?? [];
          entries.push({ shift: state, fields });
          this.codes.set(code, entries);
        }
      });
    }
    for (const entries of this.codes.values()) entries.sort((left, right) => left.shift - right.shift);
  }

  /** Whether the machine has any key this can type with. */
  hasKeys(): boolean {
    return this.codes.size > 0;
  }

  /** Whether characters are still being typed. */
  busy(): boolean {
    return this.queue.length > 0;
  }

  /** MAME `post`: plain text, line ends as carriage returns, at the default pace. */
  post(text: string): void {
    this.rate = 0;
    for (const ch of text) this.postChar(ch, true);
  }

  /**
   * MAME `post_coded`: text in which `{ENTER}`, `{F1}` and the rest name keys,
   * the form a software list's usage note and `-autoboot_command` use. A
   * nonzero `rate` (seconds) fixes the step instead of MAME's default.
   */
  postCoded(text: string, rate = 0): void {
    this.rate = rate;
    for (let index = 0; index < text.length;) {
      let ch = String.fromCodePoint(text.codePointAt(index)!);
      let increment = ch.length;
      if (ch === '{') {
        for (const [name, code] of Object.entries(CODED)) {
          if (text.slice(index + 1, index + 1 + name.length).toUpperCase() === name && text[index + 1 + name.length] === '}') {
            ch = code;
            increment = name.length + 2;
            break;
          }
        }
      }
      this.postChar(ch, false);
      index += increment;
    }
  }

  /** Abandon whatever is still to be typed, releasing anything it holds. */
  cancel(): void {
    for (const field of this.current?.fields ?? []) this.target.press(field, false, SOURCE);
    this.queue = [];
    this.current = undefined;
    this.fieldIndex = 0;
    this.keyDown = false;
  }

  /**
   * One emulated frame of `seconds`, run before the input model settles the
   * frame's ports. At most one step is taken, so every press spans a frame.
   */
  tick(seconds: number): void {
    if (!this.queue.length) return;
    this.remaining -= seconds;
    if (this.remaining > 0) return;
    this.step();
    if (this.queue.length) this.remaining += this.delay(this.queue[0]!);
  }

  private postChar(ch: string, normalize: boolean): void {
    if (normalize) {
      // A line end is one carriage return, however the text spelled it.
      if (this.lastCr && ch === '\n') {
        this.lastCr = false;
        return;
      }
      if (ch === '\n') ch = '\r';
      else this.lastCr = ch === '\r';
    }
    if (this.codes.has(ch)) {
      this.enqueue(ch);
      return;
    }
    const alternate = this.alternates[ch];
    if (alternate !== undefined && [...alternate].every(part => this.codes.has(part))) {
      for (const part of alternate) this.enqueue(part);
    }
  }

  private enqueue(ch: string): void {
    if (!this.queue.length) {
      this.remaining = this.delay(ch);
      this.fieldIndex = 0;
      this.keyDown = false;
    }
    this.queue.push(ch);
  }

  /** MAME `natural_keyboard::timer`: press the next key of the character, or release them all. */
  private step(): void {
    if (this.fieldIndex === 0) this.current = this.codes.get(this.queue[0]!)?.[0];
    let advance: boolean;
    const code = this.current;
    if (code) {
      do {
        const field = code.fields[this.fieldIndex];
        if (field) this.target.press(field, !this.keyDown, SOURCE);
      } while (code.fields[this.fieldIndex] && ++this.fieldIndex < FIELDS_PER_CODE && this.keyDown);
      advance = this.fieldIndex >= FIELDS_PER_CODE || !code.fields[this.fieldIndex];
    } else {
      advance = true;
    }
    if (advance) {
      this.fieldIndex = 0;
      this.keyDown = !this.keyDown;
      if (!this.keyDown) this.queue.shift();
    }
  }

  /** MAME `choose_delay`. */
  private delay(ch: string): number {
    if (this.rate) return this.rate;
    return ch === '\r' ? 0.2 : 0.05;
  }
}
