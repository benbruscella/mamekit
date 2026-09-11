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

const TONES: Record<Tone, { body: string; border: string; color: string }> = {
  normal: { body: 'linear-gradient(180deg,#1b2350,#121734)', border: '#39437f', color: '#d5dbff' },
  quiet: { body: 'linear-gradient(180deg,#161b3a,#0f1329)', border: '#2a3162', color: '#9aa3d6' },
  danger: { body: 'linear-gradient(180deg,#2a1830,#170e1f)', border: '#52304a', color: '#d79aac' },
};

/**
 * The control panel's glyphs.
 *
 * Drawn rather than typed: an emoji is a different picture on every platform
 * and at this size several of them are unreadable, so these are one stroke
 * weight on one 24-unit grid, inheriting the button's own colour. A glyph
 * never carries meaning on its own — every button keeps its word beside it
 * and its accessible name regardless.
 */
export type Glyph = 'twoPlayer' | 'save' | 'load' | 'shelf' | 'eject' | 'broom' | 'keys';

const GLYPHS: Record<Glyph, string> = {
  // two arrows passing: one machine, two players
  twoPlayer: '<path d="M4 8h15l-3-3M20 16H5l3 3"/>',
  // a floppy: the shape a save has had for forty years
  save: '<path d="M4 4h12l4 4v12H4z"/><path d="M8 4v5h7"/><path d="M7 20v-6h10v6"/>',
  // an arrow coming back round: the machine put back how it was
  load: '<path d="M4 5v6h6"/><path d="M4.6 13a8 8 0 1 0 1.3-6"/>',
  // a stack of them
  shelf: '<rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="12" width="18" height="5" rx="1"/><path d="M6 20h12"/>',
  // eject: give the thing back
  eject: '<path d="M5 14h14L12 5z"/><path d="M5 19h14"/>',
  // sweep it out
  broom: '<path d="M14 3 8.5 8.5"/><path d="M17 6 6.5 16.5"/><path d="M4 20l3-8 9 3-3 8z"/>',
  // a keyboard, for the legend of what every key does
  keys: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>',
};

/** One glyph, sized for a pill button and coloured by whatever holds it. */
export function glyph(name: Glyph): HTMLElement {
  const holder = document.createElement('span');
  holder.setAttribute('aria-hidden', 'true');
  holder.style.cssText = 'display:inline-flex;align-items:center;flex:0 0 auto';
  holder.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${GLYPHS[name]}</svg>`;
  return holder;
}

/**
 * A small pill button for the control panel.
 *
 * The word lives in its own element so a caller can change it later without
 * taking the glyph with it — see `setTitleButtonText`.
 */
export function titleButton(
  text: string, label: string, title: string, tone: Tone = 'normal', mark?: Glyph,
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.title = title;
  const word = document.createElement('span');
  word.dataset.word = '';
  word.textContent = text;
  if (mark) button.append(glyph(mark));
  button.append(word);
  // Kept on the element so a repaint after `disabled` changes does not have
  // to be told the tone again by every caller.
  button.dataset.tone = tone;
  paintTitleButton(button, false);
  return button;
}

/** Change a title button's word, leaving its glyph where it is. */
export function setTitleButtonText(button: HTMLButtonElement, text: string): void {
  const word = button.querySelector<HTMLElement>('[data-word]');
  if (word) word.textContent = text;
  else button.textContent = text;
}

export function paintTitleButton(button: HTMLButtonElement, active: boolean): void {
  const enabled = !button.disabled;
  const tone = TONES[(button.dataset.tone as Tone) || 'normal'] ?? TONES.normal;
  // A button on a panel, not a link in a page: a lit top edge, a body that
  // falls away below it, and a seated shadow underneath.
  button.style.cssText = `display:inline-flex;align-items:center;gap:5px;
    padding:5px 12px;border-radius:999px;white-space:nowrap;
    font:700 11px ui-sans-serif,system-ui,sans-serif;line-height:1.45;letter-spacing:.2px;
    cursor:${enabled ? 'pointer' : 'default'};
    transition:background .12s ease,color .12s ease,border-color .12s ease,transform .06s ease;
    ${active
      ? `background:linear-gradient(180deg,#ffd83f,${DECK_GOLD});color:#231b00;border:1px solid #b9930a;
         box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 0 14px ${DECK_GOLD}66`
      : enabled
        ? `background:${tone.body};border:1px solid ${tone.border};color:${tone.color};
           box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 1px 2px rgba(0,0,0,.45)`
        : `background:#0b0e22;border:1px solid #1c2249;color:#4d5480;box-shadow:inset 0 1px 2px rgba(0,0,0,.5)`}`;
}

/**
 * The vent and bolt at each end of the panel's nameplate.
 *
 * A cabinet's control panel is not a rectangle of buttons: it has a face,
 * with grilles and fixings on it. These flank the machine's name and are
 * mirrored for the right-hand end, so the nameplate reads as a plate that
 * was fitted to something rather than a line of text.
 */
export function deckVent(side: 'left' | 'right'): HTMLElement {
  const holder = document.createElement('span');
  holder.setAttribute('aria-hidden', 'true');
  holder.dataset.vent = side;
  holder.style.cssText = `display:inline-flex;align-items:center;flex:0 0 auto;    ${side === 'right' ? 'transform:scaleX(-1);' : ''}`;
  holder.innerHTML = `<svg width="58" height="20" viewBox="0 0 58 20" fill="none">
    <g fill="#39437f" opacity=".75">
      <rect x="12" y="3.4" width="44" height="2.3" rx="1.15"/>
      <rect x="12" y="8.85" width="44" height="2.3" rx="1.15"/>
      <rect x="12" y="14.3" width="44" height="2.3" rx="1.15"/>
    </g>
    <circle cx="4.6" cy="10" r="3.4" fill="#0c1026" stroke="#39437f"/>
    <path d="M2.9 10h3.4" stroke="${DECK_GOLD}" stroke-opacity=".8" stroke-width="1.1" stroke-linecap="round"/>
  </svg>`;
  return holder;
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
  panel.append(label);
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
