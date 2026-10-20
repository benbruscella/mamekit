// Host input policy applied to source-derived port fields.

/**
 * The label MAME gives one input.
 *
 * Most are literal — PORT_NAME("Smart Bomb") — but common words come from the
 * shared string table instead, and Defender's turn-around button is one:
 * PORT_NAME(DEF_STR( Reverse )). Unresolved, it falls back to the raw IPT_
 * constant and the on-screen legend reads "IPT_BUTTON5".
 */
export function portLabel(modifiers: string[]): string | undefined {
  for (const modifier of modifiers) {
    const literal = /PORT_NAME\("(?:%p )?((?:[^"\\]|\\.)+)"\)/.exec(modifier)?.[1];
    if (literal) return cString(literal);
    const shared = /PORT_NAME\(\s*DEF_STR\(\s*(\w+)\s*\)\s*\)/.exec(modifier)?.[1];
    if (shared) return shared.replace(/_/g, ' ');
  }
  return undefined;
}

/**
 * The text a C string literal's body denotes. MAME writes its key legends in
 * UTF-8 byte escapes -- the C64's cursor keys are
 * `PORT_NAME("CRSR \xE2\x86\x91 \xE2\x86\x93")` -- and taken literally the
 * legend read `CRSR \xE2\x86\x91` instead of `CRSR ↑ ↓`.
 */
export function cString(body: string): string {
  const bytes: number[] = [];
  const encoder = new TextEncoder();
  const simple: Record<string, number> = { n: 10, r: 13, t: 9, '0': 0, a: 7, b: 8, f: 12, v: 11 };
  for (let index = 0; index < body.length; index++) {
    const ch = body[index]!;
    if (ch !== '\\' || index + 1 >= body.length) {
      bytes.push(...encoder.encode(ch));
      continue;
    }
    const next = body[++index]!;
    const hex = next === 'x' ? /^[0-9a-fA-F]{1,2}/.exec(body.slice(index + 1))?.[0] : undefined;
    const octal = /^[0-7]{1,3}/.exec(body.slice(index))?.[0];
    if (hex) {
      bytes.push(parseInt(hex, 16));
      index += hex.length;
    } else if (octal && octal !== '0') {
      bytes.push(parseInt(octal, 8) & 0xff);
      index += octal.length - 1;
    } else {
      bytes.push(simple[next] ?? next.charCodeAt(0));
    }
  }
  return new TextDecoder().decode(new Uint8Array(bytes));
}

/**
 * What MAME's natural keyboard can type with a key: its `PORT_CHAR`s, one
 * list per shift state in declaration order (`PORT_CHAR('2') PORT_CHAR('"')`
 * is 2 unshifted and `"` with the first shift key), each holding the one or
 * two characters MAME lists for that state. A character is itself; a key with
 * no character is MAME's coded-string spelling of it (`{DOWN}`, `{F1}`), and
 * a shift key says which it is (`{SHIFT_1}`). Absent when MAME declares none.
 */
export function portChars(modifiers: readonly string[]): string[][] | undefined {
  const states: string[][] = [];
  for (const modifier of modifiers) {
    const body = /^PORT_CHAR\s*\(([\s\S]*)\)$/.exec(modifier.trim())?.[1];
    if (body === undefined) continue;
    states.push(charArguments(body).flatMap(argument => {
      const code = charCode(argument);
      return code === undefined ? [] : [code];
    }));
  }
  return states.length ? states : undefined;
}

/**
 * MAME's name for a keyboard key no PORT_NAME names: ioport_field::key_name,
 * the first character the key types, with MAME's own word for a key that
 * types none. A computer's keys sit on the PC's by position, so the key and
 * the PC key under it differ: the C64's `PORT_CODE(KEYCODE_F3)
 * PORT_CHAR(UCHAR_MAMEKEY(F5))` is its F5, typed on the PC's F3, and named
 * after the PC key it read "F3".
 */
export function keyName(chars: readonly (readonly string[])[] | undefined): string | undefined {
  const first = chars?.[0]?.[0];
  if (first === undefined) return undefined;
  const plain: Record<string, string> = { '\b': 'Backspace', '\t': 'Tab', '\f': 'Clear', '\r': 'Enter', '\x1b': 'Esc', ' ': 'Space' };
  if (plain[first]) return plain[first];
  const coded = /^\{(\w+)\}$/.exec(first)?.[1];
  if (!coded) return first;
  const named: Record<string, string> = {
    SHIFT_1: 'Shift', SHIFT_2: 'Ctrl', ESC: 'Esc', INSERT: 'Insert', DEL: 'Delete', HOME: 'Home', END: 'End',
    PGUP: 'Page Up', PGDN: 'Page Down', LEFT: 'Cursor Left', RIGHT: 'Cursor Right', UP: 'Cursor Up',
    DOWN: 'Cursor Down', SLASH_PAD: 'Keypad /', ASTERISK: 'Keypad *', MINUS_PAD: 'Keypad -',
    PLUS_PAD: 'Keypad +', DEL_PAD: 'Keypad .', ENTER_PAD: 'Keypad Enter', BS_PAD: 'Keypad Backspace',
    TAB_PAD: 'Keypad Tab', '00_PAD': 'Keypad 00', '000_PAD': 'Keypad 000', COMMA_PAD: 'Keypad ,',
    EQUALS_PAD: 'Keypad =', PRTSCR: 'Print Screen', PAUSE: 'Pause', LSHIFT: 'Left Shift',
    RSHIFT: 'Right Shift', LCONTROL: 'Left Ctrl', RCONTROL: 'Right Ctrl', LALT: 'Left Alt',
    RALT: 'Right Alt', SCRLOCK: 'Scroll Lock', NUMLOCK: 'Num Lock', CAPSLOCK: 'Caps Lock',
    LWIN: 'Left Win', RWIN: 'Right Win', MENU: 'Menu', CANCEL: 'Break',
  };
  if (named[coded]) return named[coded];
  if (/^F\d+$/.test(coded)) return coded;
  const pad = /^(\d)_PAD$/.exec(coded)?.[1];
  return pad ? `Keypad ${pad}` : coded;
}

/** A PORT_CHAR argument list split at its top-level commas, quotes respected. */
function charArguments(body: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < body.length; index++) {
    const ch = body[index];
    if (ch === "'" || ch === '"') {
      for (index++; index < body.length && body[index] !== ch; index++) if (body[index] === '\\') index++;
    } else if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) {
      parts.push(body.slice(start, index).trim());
      start = index + 1;
    }
  }
  parts.push(body.slice(start).trim());
  return parts.filter(Boolean);
}

function charCode(argument: string): string | undefined {
  const literal = /^'((?:[^'\\]|\\.)+)'$/.exec(argument)?.[1];
  if (literal !== undefined) return cString(literal);
  if (/^(?:0x[0-9a-fA-F]+|\d+)$/.test(argument)) return String.fromCodePoint(Number(argument));
  const key = /^UCHAR_MAMEKEY\s*\(\s*(\w+)\s*\)$/.exec(argument)?.[1];
  if (key) return `{${key}}`;
  const shift = /^UCHAR_SHIFT_(\d)$/.exec(argument)?.[1];
  if (shift) return `{SHIFT_${shift}}`;
  return undefined;
}

// keyboard bindings per MAME input type (player 1 / non-cocktail only)
const KEYMAP: Record<string, string[]> = {
  IPT_JOYSTICK_LEFT: ['ArrowLeft'],
  IPT_JOYSTICK_RIGHT: ['ArrowRight'],
  IPT_JOYSTICK_UP: ['ArrowUp'],
  IPT_JOYSTICK_DOWN: ['ArrowDown'],
  // MAME names the two physical sticks independently on twin-stick panels.
  // Keep those keys distinct from the shared arrow-key joystick so a title
  // that combines ordinary movement with a second firing stick (Tutankham)
  // can drive both controls at once.
  IPT_JOYSTICKLEFT_LEFT: ['KeyA'],
  IPT_JOYSTICKLEFT_RIGHT: ['KeyD'],
  IPT_JOYSTICKLEFT_UP: ['KeyW'],
  IPT_JOYSTICKLEFT_DOWN: ['KeyS'],
  IPT_JOYSTICKRIGHT_LEFT: ['KeyJ'],
  IPT_JOYSTICKRIGHT_RIGHT: ['KeyL'],
  IPT_JOYSTICKRIGHT_UP: ['KeyI'],
  IPT_JOYSTICKRIGHT_DOWN: ['KeyK'],
  // NOTE: never bind Ctrl — macOS eats Ctrl+Arrow (Mission Control), which
  // force-releases left/right movement while firing (user directive)
  IPT_BUTTON1: ['Space', 'KeyX'],
  IPT_BUTTON2: ['KeyZ'],
  IPT_BUTTON3: ['KeyC'],
  // A fourth to sixth button sits on the row above: A S D over Z X C. Without
  // these the generator dropped every such input, and Mortal Kombat's Low
  // Punch, Low Kick and second Block had no keys at all.
  IPT_BUTTON4: ['KeyA'],
  IPT_BUTTON5: ['KeyS'],
  IPT_BUTTON6: ['KeyD'],
  IPT_START1: ['Digit1'],
  IPT_START2: ['Digit2'],
  IPT_COIN1: ['Digit5'],
  IPT_COIN2: ['Digit6'],
  IPT_SERVICE1: ['Digit9'],
  IPT_SERVICE2: ['Digit8'],
  IPT_SERVICE3: ['Digit7'],
  IPT_SERVICE4: ['Digit0'],
  // Analog cabinet controls. Absolute pedals use their source PORT_MINMAX
  // range; relative dials are expanded into left/right pulse bindings below.
  IPT_PEDAL: ['ArrowUp'],
  IPT_PEDAL2: ['ArrowDown'],
  // Cabinet operator buttons used by first-boot audits (Defender's ADVANCE
  // and HIGH SCORE RESET are the common case).
  IPT_SERVICE: ['F2'],
  IPT_MEMORY_RESET: ['F3'],
  // console pads (nes joypad: A=IPT_BUTTON2 -> KeyZ, B=IPT_BUTTON1 -> KeyX/Space)
  IPT_START: ['Enter'],
  IPT_SELECT: ['ShiftRight'],
};

/**
 * Street Fighter II's panel: three punches on a top row (Jab, Strong, Fierce =
 * IPT_BUTTON1..3 on IN1) and three kicks on the row below (Short, Forward,
 * Roundhouse = IPT_BUTTON4..6, on the C-board's IN2). MAME names all six, so
 * the roles need no probing; what was missing is that the shared map stops at
 * BUTTON3 and the generator drops any input it cannot bind, so the entire kick
 * row was absent from the emitted bindings (issue #82).
 *
 * Two keyboard rows for two panel rows: punches on ASD, kicks on ZXC directly
 * below them, which keeps a quarter-circle's stick hand and button hand apart.
 * Jab also keeps the shared map's Space so the universal "fire" key does
 * something here, as it does on every other machine.
 */
const CPS1_SIX_BUTTON: Record<string, string[]> = {
  IPT_BUTTON1: ['KeyA', 'Space'],  // Jab Punch
  IPT_BUTTON2: ['KeyS'],           // Strong Punch
  IPT_BUTTON3: ['KeyD'],           // Fierce Punch
  IPT_BUTTON4: ['KeyZ'],           // Short Kick
  IPT_BUTTON5: ['KeyX'],           // Forward Kick
  IPT_BUTTON6: ['KeyC'],           // Roundhouse Kick
};

/** The six-button fighter layout, by MAME input type, for the home page's legend. */
export function sixButtonKeys(type: string): string[] | undefined {
  return CPS1_SIX_BUTTON[type];
}

// Games whose physical control order differs from the shared two-button
// convention. Keep these local: swapping the global X/Z mapping would silently
// change every established game and the NES pad.
const GAME_KEYMAP: Record<string, Record<string, string[]>> = {
  // Spy Hunter's wheel has five weapon switches and MAME names every one. The
  // shared map stops at BUTTON3, so the oil slick, the smoke screen and the
  // machine guns -- the primary weapon -- had no keys at all and were dropped
  // from the emitted bindings. Machine Guns takes Space, the universal fire
  // key on every other machine; the rest sit around it in panel order.
  spyhunt: {
    IPT_BUTTON6: ['Space'],  // Right Trigger / Machine Guns
    IPT_BUTTON3: ['KeyC'],   // Left Trigger / Missiles
    IPT_BUTTON4: ['KeyX'],   // Left Button / Oil Slick
    IPT_BUTTON5: ['KeyV'],   // Right Button / Smoke Screen
  },
  asteroid: {
    // Asteroids numbers its buttons by schematic input rather than by role.
    // Keep the cabinet controls intuitive while avoiding macOS-reserved
    // Ctrl+Arrow combinations: rotate on arrows, fire/thrust on X/Z, and
    // hyperspace on Space.
    IPT_BUTTON1: ['ArrowLeft'],
    IPT_BUTTON2: ['ArrowRight'],
    IPT_BUTTON3: ['KeyX'],
    IPT_BUTTON4: ['KeyZ'],
    IPT_BUTTON5: ['Space'],
  },
  bankp: {
    IPT_BUTTON1: ['KeyZ'],
    IPT_BUTTON2: ['KeyX'],
    IPT_BUTTON3: ['KeyC'],
  },
  defender: {
    // Defender's stick is PORT_2WAY vertical only — turning around is a
    // button, not a direction. MAME names all five (Fire, Thrust, Smart Bomb,
    // Hyperspace, Reverse), so the roles need no probing; what was missing is
    // that the shared map stops at BUTTON3, and the generator drops any input
    // it cannot bind. Hyperspace (mask 8) and Reverse (mask 64) were absent
    // from the emitted bindings entirely, so no key turned the ship around.
    // Five buttons is more than one hand spans in a row, and which row a
    // button sits on follows how often Defender needs it: thrust, fire and
    // reverse are constant, so they share the bottom row under the resting
    // fingers, while the two panic buttons sit above. Fire keeps the shared
    // map's BUTTON1 keys, so Space works here exactly as it does everywhere.
    IPT_BUTTON1: ['KeyX', 'Space'],   // Fire
    IPT_BUTTON2: ['KeyZ'],            // Thrust
    IPT_BUTTON3: ['KeyS'],            // Smart Bomb
    IPT_BUTTON4: ['KeyA'],            // Hyperspace
    IPT_BUTTON5: ['KeyC'],            // Reverse
  },
  gunsmoke: {
    // Gunsmoke's three buttons aim rather than repeat: BUTTON1 shoots left,
    // BUTTON2 straight ahead and BUTTON3 right. MAME declares them as bare
    // IPT_BUTTON1..3 with no names, so the direction is only observable by
    // running the machine — tracking the bullet sprite's screen X across
    // frames after each press gives 104->52 (left), a constant 113 (straight)
    // and 136->192 (right). The shared map puts BUTTON1 on X and BUTTON2 on Z,
    // which fires left from the middle key and straight from the left one.
    IPT_BUTTON1: ['KeyZ'],
    IPT_BUTTON2: ['KeyX', 'Space'],
    IPT_BUTTON3: ['KeyC'],
  },
  sf2: CPS1_SIX_BUTTON,
  sf2ce: CPS1_SIX_BUTTON,
};

// Shared cabinet input blocks sometimes expose spare switches that an
// individual game never fitted. R-Type inherits four M72 action bits but its
// panel has only Fire and Force; advertising BUTTON3 as C suggests a control
// the game cannot respond to.
const UNUSED_GAME_INPUTS: Record<string, ReadonlySet<string>> = {
  rtype: new Set(['IPT_BUTTON3', 'IPT_BUTTON4']),
};

const GAME_INPUT_LABELS: Record<string, Record<string, string>> = {
  rtype: { IPT_BUTTON2: 'Force' },
  // Asteroids names none of its buttons; asteroid.cpp's comments on each
  // PORT_BIT say what it is ("// Left", "// Fire", "// Hyperspace").
  asteroid: {
    IPT_BUTTON1: 'Rotate left',
    IPT_BUTTON2: 'Rotate right',
    IPT_BUTTON3: 'Fire',
    IPT_BUTTON4: 'Thrust',
    IPT_BUTTON5: 'Hyperspace',
  },
};

export function inputKeys(game: string, type: string): string[] | undefined {
  if (UNUSED_GAME_INPUTS[game]?.has(type)) return undefined;
  return GAME_KEYMAP[game]?.[type] ?? KEYMAP[type];
}

export function inputLabel(game: string, type: string): string | undefined {
  return GAME_INPUT_LABELS[game]?.[type];
}

/**
 * Which player a source input field belongs to: PORT_PLAYER(n) where MAME
 * says so, 2 for a cocktail cabinet's second control set, and 1 otherwise.
 */
export function inputPlayer(modifiers: readonly string[]): number {
  const player = modifiers
    .map(modifier => /PORT_PLAYER\s*\(\s*(\d+)\s*\)/.exec(modifier)?.[1])
    .find((value): value is string => value !== undefined);
  if (player !== undefined) return Number(player);
  return modifiers.includes('PORT_COCKTAIL') ? 2 : 1;
}

/** Whether a source input field belongs to the one keyboard-driven player. */
export function isKeyboardPlayerInput(modifiers: readonly string[]): boolean {
  return inputPlayer(modifiers) === 1;
}

/**
 * The gate a lever moves inside, from MAME's own PORT_nWAY on the field.
 *
 * MAME stores this per field (`ioport_field::m_way`) and reads it once per
 * frame to decide whether a direction switch is allowed to reach the port at
 * all: a `PORT_4WAY` machine has a square gate that cannot hold a diagonal,
 * so Donkey Kong's ladders and Pac-Man's maze are built on the assumption
 * that up and left never arrive together. Without the modifier MAME leaves
 * `m_way` at 0, which its restriction treats exactly like 8 -- opposites
 * locked out, diagonals allowed -- so an unmarked lever needs nothing
 * emitted. 16 is MAME's "do not restrict this at all".
 */
export function joystickWays(modifiers: readonly string[]): number | undefined {
  for (const modifier of modifiers) {
    const match = /^PORT_(2|4|8|16)WAY$/.exec(modifier.trim());
    if (match) return Number(match[1]);
  }
  return undefined;
}

/**
 * The browser key for one key of a MAME keypad, taken from the name the field
 * carries. A keypad has no fixed set of buttons -- the ColecoVision's twelve
 * are 0-9, * and # -- so the label is the only thing that says which key this
 * is, and MAME writes it for the player to read.
 */
export function keypadKeys(name: string | undefined): string[] | undefined {
  // "0", "1 (pad 1)", "* (SAC pad 2)": the key is the leading token.
  const label = /^\s*([0-9*#])(?![0-9A-Za-z])/.exec(name ?? '')?.[1];
  if (!label) return undefined;
  if (label >= '0' && label <= '9') return [`Digit${label}`, `Numpad${label}`];
  // MAME puts these on the numeric keypad's own symbols.
  return label === '*' ? ['NumpadMultiply', 'Minus'] : ['NumpadSubtract', 'Equal'];
}

/**
 * The browser key MAME itself names on a field, via `PORT_CODE(KEYCODE_x)`.
 *
 * Most controls are identified by their IPT type, which is why KEYMAP is keyed
 * that way. A console's front-panel switches are not: the Atari 2600's Select
 * and Reset are plain `IPT_OTHER`, and the only thing that says which key they
 * belong on is the PORT_CODE MAME writes beside them. Reading it binds those
 * controls from the source rather than from a guess about what IPT_OTHER means
 * on this particular machine.
 *
 * Used only as a fallback, so a curated KEYMAP choice always wins: this can add
 * a binding where there was none, never move one.
 */
export function portCodeKeys(modifiers: readonly string[]): string[] | undefined {
  const code = modifiers
    .map(modifier => /^PORT_CODE\s*\(\s*KEYCODE_(\w+)\s*\)$/.exec(modifier.trim())?.[1])
    .find((value): value is string => value !== undefined);
  if (!code) return undefined;
  if (/^[A-Z]$/.test(code)) return [`Key${code}`];
  if (/^[0-9]$/.test(code)) return [`Digit${code}`, `Numpad${code}`];
  if (/^F([1-9]|1[0-2])$/.test(code)) return [code];
  // Escape and Tab belong to the shell (menu, focus); a machine control must
  // not take them away from the page, so neither is listed here.
  const named: Record<string, string> = {
    SPACE: 'Space', ENTER: 'Enter', BACKSPACE: 'Backspace',
    LEFT: 'ArrowLeft', RIGHT: 'ArrowRight', UP: 'ArrowUp', DOWN: 'ArrowDown',
    LSHIFT: 'ShiftLeft', RSHIFT: 'ShiftRight', LALT: 'AltLeft', RALT: 'AltRight',
    MINUS: 'Minus', EQUALS: 'Equal', COMMA: 'Comma', STOP: 'Period',
    SLASH: 'Slash', BACKSLASH: 'Backslash', COLON: 'Semicolon', QUOTE: 'Quote',
    OPENBRACE: 'BracketLeft', CLOSEBRACE: 'BracketRight', TILDE: 'Backquote',
    HOME: 'Home', END: 'End', INSERT: 'Insert', DEL: 'Delete',
    PGUP: 'PageUp', PGDN: 'PageDown',
  };
  return named[code] ? [named[code]] : undefined;
}

/** Physical keyboard matrix bindings, including keys reserved by the browser. */
export function computerKeyboardKeys(modifiers: readonly string[]): string[] | undefined {
  const code = modifiers.map(modifier => /PORT_CODE\s*\(\s*KEYCODE_(\w+)\s*\)/.exec(modifier)?.[1]).find(Boolean);
  // Keep Escape/Tab available to the shell, and never consume browser Control
  // shortcuts. These keys remain reachable through the machine's key legend.
  const reserved: Record<string, string> = {
    ESC: 'F9', TAB: 'F10', LCONTROL: 'Pause', RCONTROL: 'Pause', CAPSLOCK: 'CapsLock',
  };
  return code && reserved[code] ? [reserved[code]!] : portCodeKeys(modifiers);
}

/**
 * Does a field's PORT_CONDITION hold for the machine as configured?
 *
 * MAME hangs alternate controllers off the same ports and marks each field
 * with the selector value it belongs to: the ColecoVision's Super Action
 * Controller, Driving Controller and Roller Controller all live beside the
 * standard pad. Ignoring the condition binds every one of them at once, which
 * gave coleco a control legend offering "purple action button" and "steer
 * left" on keys the standard pad already uses.
 */
export function fieldConditionHolds(
  modifiers: readonly string[],
  settings: ReadonlyMap<string, number>,
): boolean {
  for (const modifier of modifiers) {
    const match = /PORT_CONDITION\s*\(\s*"([^"]+)"\s*,\s*([^,]+),\s*(\w+)\s*,\s*([^)]+)\)/
      .exec(modifier);
    if (!match) continue;
    const current = settings.get(match[1]!.trim());
    // A selector the machine does not configure leaves the field as MAME
    // leaves it: available.
    if (current === undefined) continue;
    const masked = current & Number(match[2]!.trim());
    const value = Number(match[4]!.trim());
    if (!Number.isFinite(masked) || !Number.isFinite(value)) continue;
    const holds = match[3] === 'NOTEQUALS' ? masked !== value : masked === value;
    if (!holds) return false;
  }
  return true;
}

