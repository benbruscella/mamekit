// The shell's own control look, in one place.
//
// Everything the exhibit puts around the machine — the toolbar under the
// title, the save shelf, the cassette deck, the two-player lobby — is the
// same handful of shapes: a pill button that reads as pressed when the thing
// it controls is on, a larger button inside a panel, and the panel itself.
// They lived as private helpers in `shell.ts` while `netplay.ts` kept its own
// copy, which is how the two-player pills ended up green among gold ones.
//
// A MAMEKIT host feature (ARCHITECTURE.md §8): presentation only, and it
// knows nothing about any machine.

/** The room's accent: an arcade cabinet's marquee gold. */
export const DECK_GOLD = '#f2c200';

/**
 * How loud a control is.
 *
 * `normal` is the everyday action. `quiet` steps back for the ones that are
 * rarely wanted — and `danger` for the ones that throw something away, which
 * should never look like the button beside them.
 */
export type Tone = 'normal' | 'quiet' | 'danger';

const TONES: Record<Tone, { background: string; border: string; color: string }> = {
  normal: { background: '#111633', border: '#303a78', color: '#cbd1ff' },
  quiet: { background: 'transparent', border: '#272e5c', color: '#8b93c9' },
  danger: { background: 'transparent', border: '#4a2a3a', color: '#c98b9b' },
};

/** A small pill button for the toolbar under the title. */
export function titleButton(text: string, label: string, title: string, tone: Tone = 'normal'): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  button.setAttribute('aria-label', label);
  button.title = title;
  // Kept on the element so a repaint after `disabled` changes does not have
  // to be told the tone again by every caller.
  button.dataset.tone = tone;
  paintTitleButton(button, false);
  return button;
}

export function paintTitleButton(button: HTMLButtonElement, active: boolean): void {
  const enabled = !button.disabled;
  const tone = TONES[(button.dataset.tone as Tone) || 'normal'] ?? TONES.normal;
  button.style.cssText = `padding:4px 11px;border-radius:999px;white-space:nowrap;
    font:700 11px ui-sans-serif,system-ui,sans-serif;line-height:1.45;
    cursor:${enabled ? 'pointer' : 'default'};transition:background .12s ease,color .12s ease,border-color .12s ease;
    ${active
      ? `background:${DECK_GOLD};color:#1b1b1b;border:1px solid ${DECK_GOLD}`
      : enabled
        ? `background:${tone.background};border:1px solid ${tone.border};color:${tone.color}`
        : 'background:#0c0f26;border:1px solid #1e2450;color:#555c86'}`;
}

/** A hairline between two groups of toolbar buttons. */
export function toolbarDivider(): HTMLElement {
  const line = document.createElement('span');
  line.setAttribute('aria-hidden', 'true');
  line.style.cssText = 'width:1px;height:16px;background:#2a3160;flex:0 0 auto';
  return line;
}

/** A dark panel with the room's accent, holding a titled group of controls. */
export function deckPanel(title: string): HTMLElement {
  const panel = document.createElement('div');
  panel.style.cssText = `display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 10px;
    padding:10px 14px;margin:6px 0;border-radius:10px;max-width:880px;
    background:linear-gradient(135deg,rgba(24,30,67,.96),rgba(9,12,29,.96));border:1px solid #252d62;
    box-shadow:inset 0 1px rgba(255,255,255,.05),0 10px 24px rgba(0,0,0,.3);font:13px ui-sans-serif,system-ui,sans-serif`;
  const label = document.createElement('span');
  label.textContent = title;
  label.style.cssText = 'color:#7f8ac9;font:700 10px ui-monospace,monospace;letter-spacing:2px;margin-right:4px';
  panel.appendChild(label);
  return panel;
}

export function deckButton(text: string, options: { solid?: boolean } = {}): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  button.dataset.solid = options.solid ? '1' : '';
  setDeckButtonState(button, false);
  return button;
}

/** Paint a deck button as idle, active (the thing it controls is on) or disabled. */
export function setDeckButtonState(button: HTMLButtonElement, active: boolean): void {
  const enabled = !button.disabled;
  button.style.cssText = `padding:6px 14px;border-radius:8px;font:700 12px ui-sans-serif,system-ui,sans-serif;
    letter-spacing:.3px;cursor:${enabled ? 'pointer' : 'default'};transition:background .12s ease,color .12s ease;
    ${active
      ? `background:${DECK_GOLD};color:#1b1b1b;border:2px solid ${DECK_GOLD};box-shadow:0 0 14px ${DECK_GOLD}55`
      : `background:${enabled ? '#111633' : '#0c0f26'};border:2px solid ${enabled ? '#303a78' : '#1e2450'};color:${enabled ? '#cbd1ff' : '#555c86'}`}
    ${enabled ? '' : ';opacity:.6'}`;
}
