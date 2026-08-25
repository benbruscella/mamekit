// The front-loader deck, drawn once.
//
// Two places show the machine itself — the boot menu's console tile and the
// console room's hero — and they used to carry separate copies of the same
// geometry, which drifted. This is the single drawing; callers pass a box and
// their own caption.
//
// It is built from the industrial features that make a front-loader readable at
// thumbnail size, and from nothing else: the wide low body, the two recessed
// stripes across the front, the power LED with POWER and RESET beside it, the
// cartridge door in the middle and the controller-port door on the right. No
// trademarked wordmark or logo — the plate reads CONTROL DECK, which is what
// the shelf calls it everywhere else.
//
// Proportions matter more than detail here: the earlier drawing was 0.62 as
// tall as it was wide and read as a generic grey box, where the real machine is
// nearer 0.38 and reads as itself even at 120px.

/** Fixed decimals: SVG path noise compresses badly and diffs worse. */
const n = (x: number): string => x.toFixed(1);

export interface DeckOptions {
  /** line under the deck, e.g. "▸ ENTER TO INSERT CARTS" */
  caption?: string;
  /** gradient ids are document-global; two decks on one page need two prefixes */
  idPrefix?: string;
  /** top of the deck within the box; defaults to vertically centred */
  top?: number;
}

/** A grey front-loader console, drawn to fill the given box. */
export function consoleDeckSvg(W: number, H: number, opts: DeckOptions = {}): string {
  const id = opts.idPrefix ?? 'deck';
  const cw = W * 0.86;
  const cx = (W - cw) / 2;
  // The front face is wide and low; the top surface adds the shallow angle the
  // machine is always photographed at.
  const ch = cw * 0.38;
  const topH = ch * 0.13;
  const cy = opts.top ?? (H - ch) / 2;

  // Everything below is a fraction of the front face, so the deck scales whole.
  // That includes the hairlines: a highlight fixed at "1.5 units" is a different
  // weight in a 230-wide box than in a 300-wide one, and the two callers use
  // both, so the same drawing would come out differently lit.
  const fx = (f: number): number => cx + cw * f;
  const fy = (f: number): number => cy + ch * f;
  const line = ch * 0.02;

  const ledX = fx(0.085), ledY = fy(0.6), ledR = cw * 0.009;
  const btnY = fy(0.5), btnW = cw * 0.08, btnH = ch * 0.22;
  // The door is the machine's one big feature; anything smaller and the front
  // reads as a hi-fi component rather than as a console.
  const doorX = fx(0.33), doorY = fy(0.36), doorW = cw * 0.4, doorH = ch * 0.54;
  const portX = fx(0.78), portY = fy(0.44), portW = cw * 0.16, portH = ch * 0.4;

  const stripe = (y: number): string =>
    `<rect x="${n(fx(0.045))}" y="${n(fy(y))}" width="${n(cw * 0.91)}" height="${n(ch * 0.038)}" fill="#1b1a16"/>`;
  const button = (x: number): string =>
    `<rect x="${n(fx(x))}" y="${n(btnY)}" width="${n(btnW)}" height="${n(btnH)}" rx="1.5" fill="#3c3a34"/>`
    + `<rect x="${n(fx(x))}" y="${n(btnY)}" width="${n(btnW)}" height="${n(btnH * 0.22)}" rx="1.5" fill="rgba(255,255,255,.22)"/>`;
  // Slots, not squares: shaped unlike the buttons opposite them so the two
  // clusters do not read as a matched pair.
  const port = (x: number): string =>
    `<rect x="${n(fx(x))}" y="${n(portY + portH * 0.24)}" width="${n(cw * 0.038)}" height="${n(portH * 0.52)}" rx="1" fill="#24221d"/>`;

  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="console">
    <defs>
      <linearGradient id="${id}-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#dbd8cf"/><stop offset="0.6" stop-color="#cbc8bf"/><stop offset="1" stop-color="#b2afa6"/>
      </linearGradient>
      <linearGradient id="${id}-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ecebe3"/><stop offset="1" stop-color="#d7d4cb"/>
      </linearGradient>
      <radialGradient id="${id}-led" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ff6068"/><stop offset="0.55" stop-color="#e60012"/><stop offset="1" stop-color="rgba(230,0,18,0)"/>
      </radialGradient>
    </defs>
    <ellipse cx="${n(cx + cw / 2)}" cy="${n(cy + ch + ch * 0.1)}" rx="${n(cw * 0.54)}" ry="${n(ch * 0.1)}" fill="rgba(0,0,0,.5)"/>
    <!-- the top surface, inset either side: the machine is seen from just above -->
    <rect x="${n(cx + cw * 0.045)}" y="${n(cy - topH)}" width="${n(cw * 0.91)}" height="${n(topH + line * 2.6)}" rx="2" fill="url(#${id}-top)"/>
    <rect x="${n(cx + cw * 0.045)}" y="${n(cy - line * 0.6)}" width="${n(cw * 0.91)}" height="${n(line * 0.6)}" fill="rgba(0,0,0,.18)"/>
    <rect x="${n(cx)}" y="${n(cy)}" width="${n(cw)}" height="${n(ch)}" rx="${n(cw * 0.025)}" fill="url(#${id}-body)"/>
    <rect x="${n(cx)}" y="${n(cy)}" width="${n(cw)}" height="${n(line)}" fill="rgba(255,255,255,.55)"/>
    <!-- the lower front lip the machine sits on -->
    <rect x="${n(cx)}" y="${n(cy + ch * 0.88)}" width="${n(cw)}" height="${n(ch * 0.12)}" rx="${n(cw * 0.02)}" fill="rgba(0,0,0,.07)"/>
    <rect x="${n(cx)}" y="${n(cy + ch * 0.88)}" width="${n(cw)}" height="${n(line * 0.6)}" fill="rgba(0,0,0,.16)"/>
    <!-- the two recessed stripes that run the width of the front -->
    ${stripe(0.1)}${stripe(0.18)}
    <!-- power lamp, then POWER and RESET -->
    <circle cx="${n(ledX)}" cy="${n(ledY)}" r="${n(ledR * 3)}" fill="url(#${id}-led)"/>
    <circle cx="${n(ledX)}" cy="${n(ledY)}" r="${n(ledR)}" fill="#e60012"/>
    ${button(0.135)}${button(0.235)}
    <!-- the cartridge door: pushed in at the top, hinged along the bottom -->
    <rect x="${n(doorX - line * 0.6)}" y="${n(doorY - line * 0.6)}" width="${n(doorW + line * 1.2)}" height="${n(doorH + line * 1.2)}" rx="3" fill="rgba(0,0,0,.16)"/>
    <rect x="${n(doorX)}" y="${n(doorY)}" width="${n(doorW)}" height="${n(doorH)}" rx="2" fill="#aeaa9f"/>
    <rect x="${n(doorX)}" y="${n(doorY)}" width="${n(doorW)}" height="${n(line)}" fill="rgba(0,0,0,.28)"/>
    <rect x="${n(doorX)}" y="${n(doorY + doorH - line)}" width="${n(doorW)}" height="${n(line)}" fill="rgba(255,255,255,.35)"/>
    <rect x="${n(doorX + doorW * 0.06)}" y="${n(doorY + doorH * 0.52)}" width="${n(doorW * 0.88)}" height="${n(line * 0.8)}" fill="rgba(0,0,0,.22)"/>
    <rect x="${n(doorX + doorW * 0.42)}" y="${n(doorY + doorH - line * 1.3)}" width="${n(doorW * 0.16)}" height="${n(ch * 0.05)}" rx="1.5" fill="#98948b"/>
    <!-- the controller ports behind their own flap -->
    <rect x="${n(portX)}" y="${n(portY)}" width="${n(portW)}" height="${n(portH)}" rx="2" fill="#c3bfb5"/>
    <rect x="${n(portX)}" y="${n(portY)}" width="${n(portW)}" height="${n(line * 0.8)}" fill="rgba(0,0,0,.25)"/>
    ${port(0.805)}${port(0.885)}
    <!-- printed above the door, where the machine carries its name -->
    <text x="${n(doorX)}" y="${n(fy(0.31))}" font-family="ui-monospace,monospace" font-size="${n(ch * 0.085)}"
      font-weight="700" letter-spacing="${n(ch * 0.025)}" fill="#79746a">CONTROL DECK</text>
    ${opts.caption ? `<text x="${n(W / 2)}" y="${n(cy + ch + ch * 0.62)}" text-anchor="middle"
      font-family="ui-monospace,monospace" font-size="13" font-weight="700" letter-spacing="3"
      fill="#5b6486">${opts.caption}</text>` : ''}
  </svg>`;
}
