// An on-screen keyboard for a computer (issue #161).
//
// A host feature (ARCHITECTURE.md section 8): every key the machine's driver
// declares, built from its generated bindings, for a visitor whose keyboard
// lacks the machine's own keys -- RUN/STOP, RESTORE, C=, CLR/HOME, the C64's
// F1 to F8, £, ↑ and ← -- or who has no keyboard at all. Nothing here names a
// machine. A key's legend is MAME's: the character it types, else its
// PORT_NAME or the name MAME's own input menu gives it. Its place is the PC
// key MAME's PORT_CODE puts it on: MAME lays a computer's keyboard over the
// PC's by position (the C64's + and - on the two keys after 0, its @ and *
// after P), so the PC's rows give back the machine's own. A key on no PC
// typing key goes on a row of the machine's own keys.

import type { FieldBinding } from './input.ts';

/** One key as the keyboard draws it. */
export interface OnscreenKey {
  binding: FieldBinding;
  /** what its cap says: "A", "RETURN", "RUN STOP", "F5" */
  legend: string;
  /** what it types shifted, drawn small above the legend: "!" on 1 */
  shifted?: string;
  /**
   * The rest of what MAME's name for the key prints on it, drawn small below
   * the legend: the Spectrum's PORT_NAME lists every mode's legend
   * (`"j    J    -      VAL      VAL$     LOAD"`), and 48K BASIC is entered
   * by those keywords.
   */
  modes?: string;
  /** a modifier latches for the next key; a lock stays down until pressed again */
  kind: 'key' | 'modifier' | 'lock';
}

/** MAME's whole name for a key, as its tooltip. */
function binding(key: OnscreenKey): string {
  return key.binding.label.trim().replace(/\s{2,}/g, ' · ');
}

/** The rows the keys sit on, top to bottom, the machine's own keys first. */
export type OnscreenLayout = OnscreenKey[][];

// The PC's typing rows, by KeyboardEvent.code, which place a key by the PC
// key MAME binds it to.
const PC_ROWS: readonly (readonly string[])[] = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
];

const MODIFIER_CODES = /^\{(?:SHIFT_\d|LSHIFT|RSHIFT|LCONTROL|RCONTROL|LALT|RALT|LWIN|RWIN)\}$/;

function firstChars(binding: FieldBinding): string[] {
  return (binding.chars ?? []).map(entry => entry[0] ?? '');
}

/** A character a cap can print: one that is not a MAME key code or a control character. */
function printable(typed: string | undefined): typed is string {
  return Boolean(typed) && !/^\{\w+\}$/.test(typed!) && typed! > ' ';
}

/**
 * A key's cap: what it types where it types a character, else MAME's name for
 * it (its PORT_NAME, or what MAME's input menu calls an unnamed key). A
 * function key reads as the key it is ("F5"), whichever PC key types it.
 */
export function keyLegend(binding: FieldBinding): { legend: string; shifted?: string; modes?: string } {
  const [plain, shift] = firstChars(binding);
  if (plain === ' ') return { legend: 'SPACE' };
  if (printable(plain)) {
    const legend = plain.toUpperCase();
    const cap = printable(shift) && shift.toUpperCase() !== legend ? { legend, shifted: shift } : { legend };
    // A name laid out in columns, a run of spaces between each mode's legend.
    const fields = binding.label.trim().split(/\s{2,}/);
    const modes = fields.length > 2
      ? fields.slice(1).filter(field => field.toUpperCase() !== legend && field !== cap.shifted).join(' ')
      : '';
    return modes ? { ...cap, modes } : cap;
  }
  const functionKey = /^\{(F\d+)\}$/.exec(plain ?? '')?.[1];
  return { legend: functionKey ?? binding.label.trim().toUpperCase() };
}

function keyKind(binding: FieldBinding): OnscreenKey['kind'] {
  const [plain] = firstChars(binding);
  if (plain === '{CAPSLOCK}' || /\block\b/i.test(binding.label)) return 'lock';
  if (plain && MODIFIER_CODES.test(plain)) return 'modifier';
  // A key MAME gives no character but names as a modifier: the C64's C=.
  if (!plain && /\b(?:shift|ctrl|control|cbm|commodore|alt|meta)\b/i.test(binding.label)) return 'modifier';
  return 'key';
}

/** Where a key goes on the PC's rows, by the PC key it is bound to: [row, column], or none. */
function gridPlace(binding: FieldBinding): [number, number] | undefined {
  for (const code of binding.keys) {
    for (let row = 0; row < PC_ROWS.length; row++) {
      const column = PC_ROWS[row]!.indexOf(code);
      if (column >= 0) return [row, column];
    }
  }
  return undefined;
}

/** A function key's number, which orders the machine's own row: F1 before F3. */
function functionNumber(key: OnscreenKey): number {
  const number = /^F(\d+)$/.exec(key.legend)?.[1];
  return number === undefined ? Infinity : Number(number);
}

/**
 * The machine's keys as rows: its own keys (function, cursor and editing keys
 * on no PC typing key), then the PC's four typing rows as the machine's keys
 * fill them, then the space bar with any modifier left over. Function keys
 * come first and in order; everything else keeps the driver's own order.
 */
export function onscreenLayout(bindings: readonly FieldBinding[]): OnscreenLayout {
  const keys = bindings.filter(binding => binding.type === 'IPT_KEYBOARD');
  const own: OnscreenKey[] = [];
  const grid: { key: OnscreenKey; column: number }[][] = PC_ROWS.map(() => []);
  const bottom: OnscreenKey[] = [];
  for (const binding of keys) {
    const key: OnscreenKey = { binding, kind: keyKind(binding), ...keyLegend(binding) };
    const place = key.legend === 'SPACE' ? undefined : gridPlace(binding);
    if (place) grid[place[0]]!.push({ key, column: place[1] });
    else if (key.kind !== 'key' || key.legend === 'SPACE') bottom.push(key);
    else own.push(key);
  }
  const rows: OnscreenLayout = [];
  // A stable sort: function keys by number, the rest as declared.
  own.sort((a, b) => Math.min(functionNumber(a), 1e9) - Math.min(functionNumber(b), 1e9));
  if (own.length) rows.push(own);
  for (const row of grid) if (row.length) rows.push(row.sort((a, b) => a.column - b.column).map(entry => entry.key));
  if (bottom.length) rows.push(bottom);
  return rows;
}

/**
 * The keyboard itself: a panel of buttons that press the machine's keys
 * through `press`, the same path the natural keyboard types through. A
 * modifier latches until the next key is let go, so Shift then 1 is "!" on a
 * touch screen; a lock key stays down until it is pressed again.
 */
export function createOnscreenKeyboard(
  bindings: readonly FieldBinding[],
  press: (binding: FieldBinding, down: boolean) => void,
): HTMLElement {
  const panel = document.createElement('div');
  panel.setAttribute('data-onscreen-keyboard', '');
  panel.setAttribute('role', 'group');
  panel.setAttribute('aria-label', 'On-screen keyboard');
  panel.style.cssText = `display:flex;flex-direction:column;gap:5px;padding:10px;border-radius:10px;
    background:#0c0f24;border:1px solid #2a3162;user-select:none;-webkit-user-select:none;touch-action:manipulation`;
  const latched = new Set<OnscreenKey>();
  const locked = new Set<OnscreenKey>();
  const caps = new Map<OnscreenKey, HTMLButtonElement>();
  const paint = (key: OnscreenKey, down: boolean): void => {
    const cap = caps.get(key);
    if (!cap) return;
    cap.style.background = down ? '#f2c200' : '#1a1f45';
    cap.style.color = down ? '#0c0f24' : '#e8eaf6';
    cap.setAttribute('aria-pressed', String(down));
  };
  const release = (key: OnscreenKey): void => { press(key.binding, false); paint(key, false); };
  for (const row of onscreenLayout(bindings)) {
    const line = document.createElement('div');
    line.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;justify-content:center';
    for (const key of row) {
      const cap = document.createElement('button');
      cap.type = 'button';
      cap.tabIndex = -1;
      cap.setAttribute('data-key', key.legend);
      cap.setAttribute('aria-label', key.legend);
      const wide = key.legend === 'SPACE' ? 240 : key.legend.length > 3 ? 64 : 36;
      cap.style.cssText = `min-width:${wide}px;height:38px;padding:2px 6px;border-radius:6px;border:1px solid #303a78;
        background:#1a1f45;color:#e8eaf6;font:700 12px ui-sans-serif,system-ui,sans-serif;cursor:pointer;
        display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.1`;
      if (key.shifted) {
        const small = document.createElement('span');
        small.style.cssText = 'font-size:9px;opacity:.7';
        small.textContent = key.shifted;
        cap.append(small);
      }
      cap.append(document.createTextNode(key.legend === 'SPACE' ? '' : key.legend));
      if (key.modes) {
        const modes = document.createElement('span');
        modes.style.cssText = 'font-size:8px;opacity:.65;font-weight:600;white-space:nowrap';
        modes.textContent = key.modes;
        cap.title = binding(key);
        cap.style.height = '46px';
        cap.append(modes);
      }
      caps.set(key, cap);
      cap.addEventListener('pointerdown', event => {
        event.preventDefault();
        if (key.kind === 'lock') {
          const down = !locked.has(key);
          if (down) locked.add(key); else locked.delete(key);
          press(key.binding, down);
          paint(key, down);
          return;
        }
        if (key.kind === 'modifier') {
          // A second tap lets a latched modifier go without a key.
          if (latched.has(key)) { latched.delete(key); release(key); return; }
          latched.add(key);
          press(key.binding, true);
          paint(key, true);
          return;
        }
        press(key.binding, true);
        paint(key, true);
        cap.setPointerCapture?.(event.pointerId);
      });
      const up = (): void => {
        if (key.kind !== 'key' || cap.getAttribute('aria-pressed') !== 'true') return;
        release(key);
        for (const modifier of latched) release(modifier);
        latched.clear();
      };
      cap.addEventListener('pointerup', up);
      cap.addEventListener('pointercancel', up);
      line.append(cap);
    }
    panel.append(line);
  }
  return panel;
}
