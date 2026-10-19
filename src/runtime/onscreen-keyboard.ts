// An on-screen keyboard for a computer (issue #161).
//
// A host feature (ARCHITECTURE.md section 8): every key the machine's driver
// declares, built from its generated bindings, for a visitor whose keyboard
// lacks the machine's own keys -- RUN/STOP, RESTORE, C=, CLR/HOME, the C64's
// F1 to F8, £, ↑ and ← -- or who has no keyboard at all. Nothing here names a
// machine: a key's legend comes from MAME's own PORT_CHAR or PORT_NAME, and
// its place from the characters it types, laid on a generic QWERTY grid; a
// key that types none of those goes on a row of the machine's own keys.

import type { FieldBinding } from './input.ts';

/** One key as the keyboard draws it. */
export interface OnscreenKey {
  binding: FieldBinding;
  /** what its cap says: "A", "RETURN", "RUN STOP", "F5" */
  legend: string;
  /** what it types shifted, drawn small above the legend: "!" on 1 */
  shifted?: string;
  /** a modifier latches for the next key; a lock stays down until pressed again */
  kind: 'key' | 'modifier' | 'lock';
}

/** The rows the keys sit on, top to bottom, the machine's own keys first. */
export type OnscreenLayout = OnscreenKey[][];

// The US QWERTY rows, unshifted then shifted, which place a key by what it types.
const QWERTY_ROWS: readonly string[] = [
  '`1234567890-=~!@#$%^&*()_+',
  'qwertyuiop[]\\{}|',
  "asdfghjkl;':\"",
  'zxcvbnm,./<>?',
];

/** MAME's coded names for keys that type no character, as a cap would print them. */
const CODED_LEGENDS: Readonly<Record<string, string>> = {
  ENTER: 'RETURN', HOME: 'HOME', INSERT: 'INST', DEL: 'DEL', BACKSPACE: 'DEL',
  UP: 'CRSR ↑', DOWN: 'CRSR ↓', LEFT: 'CRSR ←', RIGHT: 'CRSR →', ESC: 'ESC', TAB: 'TAB',
};

const MODIFIER_CODES = /^\{(?:SHIFT_\d|LSHIFT|RSHIFT|LCONTROL|RCONTROL|LALT|RALT|LWIN|RWIN)\}$/;

function firstChars(binding: FieldBinding): string[] {
  return (binding.chars ?? []).map(entry => entry[0] ?? '').filter(Boolean);
}

/** A key's cap, from what it types where it types a character, else MAME's name for it. */
export function keyLegend(binding: FieldBinding): { legend: string; shifted?: string } {
  const [plain, shift] = firstChars(binding);
  const named = binding.label.trim();
  if (!plain) return { legend: named.toUpperCase() };
  if (plain === '\r') return { legend: 'RETURN' };
  if (plain === ' ') return { legend: 'SPACE' };
  const coded = /^\{(\w+)\}$/.exec(plain)?.[1];
  // A named key keeps MAME's two-word name ("INST DEL", "CRSR ↑ ↓", "CLR HOME").
  if (coded || plain < ' ') {
    if (/\s/.test(named)) return { legend: named.toUpperCase() };
    return { legend: coded ? (CODED_LEGENDS[coded] ?? coded.replace(/_/g, ' ')) : named.toUpperCase() };
  }
  const legend = plain.toUpperCase();
  const other = shift && !/^\{/.test(shift) && shift.toUpperCase() !== legend ? shift : undefined;
  return other ? { legend, shifted: other } : { legend };
}

function keyKind(binding: FieldBinding): OnscreenKey['kind'] {
  const [plain] = firstChars(binding);
  if (plain === '{CAPSLOCK}' || /\block\b/i.test(binding.label)) return 'lock';
  if (plain && MODIFIER_CODES.test(plain)) return 'modifier';
  // A key MAME gives no character but names as a modifier: the C64's C=.
  if (!plain && /\b(?:shift|ctrl|control|cbm|commodore|alt|meta)\b/i.test(binding.label)) return 'modifier';
  return 'key';
}

/** Where a key goes on the QWERTY grid, by what it types: [row, column], or none. */
function gridPlace(binding: FieldBinding): [number, number] | undefined {
  for (const typed of firstChars(binding)) {
    if (typed.length !== 1) continue;
    const char = typed.toLowerCase();
    for (let row = 0; row < QWERTY_ROWS.length; row++) {
      const column = QWERTY_ROWS[row]!.indexOf(char);
      // Shifted symbols sit after the row's own keys, so 1 stays before !.
      if (column >= 0) return [row, column];
    }
  }
  return undefined;
}

/**
 * The machine's keys as rows: its own keys (named, function, cursor, the
 * characters a PC keyboard has no key for), then the four QWERTY rows, then
 * the modifiers with the space bar. Order within a row follows the grid,
 * then the driver's own declaration order.
 */
export function onscreenLayout(bindings: readonly FieldBinding[]): OnscreenLayout {
  const keys = bindings.filter(binding => binding.type === 'IPT_KEYBOARD');
  const own: OnscreenKey[] = [];
  const grid: { key: OnscreenKey; column: number }[][] = QWERTY_ROWS.map(() => []);
  const bottom: OnscreenKey[] = [];
  for (const binding of keys) {
    const key: OnscreenKey = { binding, kind: keyKind(binding), ...keyLegend(binding) };
    if (key.kind !== 'key' || key.legend === 'SPACE') { bottom.push(key); continue; }
    const place = key.legend === 'RETURN' ? undefined : gridPlace(binding);
    if (place) grid[place[0]]!.push({ key, column: place[1] });
    else own.push(key);
  }
  const rows: OnscreenLayout = [];
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
