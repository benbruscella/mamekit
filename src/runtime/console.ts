// Console room (issue #17): the living-room shelf behind a console tile on
// the boot menu. Same video-store aesthetic as menu.ts (palette copied, NOT
// imported — game pages must not pull the whole menu in), plus the console's
// own accent color for the marquee (NES front-loader red).
//
// The room owns cartridge UX end-to-end: drop/pick .nes or .zip files,
// identify them against the generated softlist catalog (nes-ines.ts), shelve
// them as inline-SVG cartridge tiles persisted in the visitor's own browser
// (cartstore.ts, by explicit user approval 2026-07-07), and boot a cart by
// handing runShell() preloaded {prg, chr?} regions with the cart facts injected
// into a CLONE of cfg.board. Nothing here is game-specific: titles, mappers,
// capability lists all come from config.json + softlist.json + games.json.
//
// Shelf model (redesigned): every verified title (cfg.cart.games) is shown as a
// DARK PLACEHOLDER SLOT that LIGHTS UP when the visitor drops its matching ROM
// dump. Any other cart on a supported board is playable as EXPERIMENTAL; carts
// on unimplemented mappers show why they can't run. See docs for the tiers.

import { runShell, type ShellConfig } from './shell.ts';
import { openCartStore, type CartRecord } from './cartstore.ts';
import {
  parseINes,
  identify,
  inesFromSoftlistSet,
  mountedINesPrg,
  type ResolvedCart,
  type SoftCatalog,
  type SoftEntry,
} from './nes-ines.ts';
import { readZip, crc32 } from './zip.ts';
import { artworkSources } from './artwork-source.ts';
import {
  cartAvailability,
  fetchRomBytes,
  fetchRomJson,
  type CartAvailability,
} from './rom-source.ts';
import type { Regions } from './types.ts';

const GOLD = '#f2c200';
const ACCENT = '#e60012'; // NES front-loader stripe red
const MAX_CART = 8 * 1024 * 1024; // no real cartridge is bigger than 8 MiB

// --- artwork tunables (named so the orchestrator can screenshot-iterate) -------
const CART_W = 200;
const CART_H = 250;
const CART_BODY_TOP = '#9a9a94';   // NES grey plastic, lit from above
const CART_BODY_BOT = '#77776f';   // same plastic in shadow at the base
const CART_LABEL_BG = '#f4f1e7';   // classic off-white label
const CART_LABEL_FRAME = '#141414'; // black-bordered NES label frame

// The drawn label, as one set of numbers so the SVG and the photo overlay in
// applyCartArt cannot drift apart.
//
// A cartridge showing real box photography gets a taller label: box scans are
// about 0.70 wide-to-tall while the moulded label is 0.88, so the standard rect
// crops roughly a fifth of the image away. The shell has room down to the base
// step at y=195, which is what LABEL_H_ART spends.
const LABEL_X = 53.5;
const LABEL_Y = 15.5;
const LABEL_W = 133;
const LABEL_H = 151;
const LABEL_H_ART = 168;
/** the drawn label's centre line, which the photo label keeps as it narrows */
const LABEL_CX = LABEL_X + LABEL_W / 2;
/** the black frame sits this far outside the label on every side */
const LABEL_FRAME_PAD = 3.5;

/** viewBox units as a percentage, for overlaying HTML on the drawn cartridge */
const pct = (v: number, total: number) => `${(v / total * 100).toFixed(3)}%`;
const STRIPE_TESTED = '#2f6bd8';       // blue label stripe — verified
const STRIPE_EXPERIMENTAL = '#e6a02a'; // amber label stripe — experimental
const STRIPE_UNSUPPORTED = '#8f8f8f';  // grey label stripe — can't run
const STRIPE_PLACEHOLDER = '#5b6079';  // muted stripe — empty slot
const SEAL_GREEN = '#37a24b';
// friendly PCB names for the compatibility strip (slot family -> mapper board)
const SLOT_PCB: Record<string, string> = {
  nrom: 'NROM', uxrom: 'UxROM', cnrom: 'CNROM', sxrom: 'MMC1', txrom: 'MMC3',
  pxrom: 'MMC2', fxrom: 'MMC4', gxrom: 'GxROM', axrom: 'AxROM', bnrom: 'BNROM',
};
const MAPPER_SLOTS: Record<number, string> = {
  0: 'nrom', 1: 'sxrom', 2: 'uxrom', 3: 'cnrom', 4: 'txrom',
};

type CartState = 'placeholder' | 'lit' | 'experimental' | 'unsupported';

/** games.json manifest entry (the fields the room shows in About) */
interface MenuEntry {
  game: string;
  title: string;
  fullname: string;
  year: string;
  manufacturer: string;
  supported?: boolean;
  hasHistory?: boolean;
  historyCredit?: string;
  driverFile?: string;
  license?: string;
  copyrightHolders?: string;
  gitHistory?: { firstCommit: string; lastCommit: string; commits: number; contributors: number; topAuthors: string[] };
}

const hex8 = (n: number) => n.toString(16).padStart(8, '0');
const esc = (s: string) => s.replace(/[&<>]/g, c => (c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'));
const stripSet = (s: string) => s.replace(/\s*\(.*\)$/, ''); // drop the "(Europe, rev. A)" region suffix
const browseSlug = (value: string): string => value.normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .replace(/-{2,}/g, '-') || 'unknown';
const browseUrl = (facet: string, value: string): string =>
  `browse/${facet}/${browseSlug(value)}/`;

function el(tag: string, css: string): HTMLElement {
  const e = document.createElement(tag);
  e.style.cssText = css;
  return e;
}

/** greedy word-wrap into at most 2 lines, ellipsizing overflow */
export function wrapCartTitle(s: string, max = 17): string[] {
  const words = s.split(/\s+/).filter(Boolean);
  const lines = ['', ''];
  let li = 0;
  for (const w of words) {
    if (!lines[li] && w.length > max) {
      lines[li] = w.slice(0, max - 1) + '…';
      continue;
    }
    const t = lines[li] ? `${lines[li]} ${w}` : w;
    if (t.length <= max) { lines[li] = t; continue; }
    if (li === 0 && !lines[1]) { li = 1; lines[1] = w; continue; }
    lines[1] = lines[1].slice(0, max - 1).replace(/\s+$/, '') + '…';
    break;
  }
  return (lines[1] ? lines : [lines[0]]).map(l => (l.length > max ? l.slice(0, max - 1) + '…' : l));
}

// --- inline-SVG cartridge artwork ----------------------------------------------
// The iconic NES grey cart: plastic body + grip ridges + black-framed label with
// a colored top-stripe. State drives palette/marks; text is crisp <text>.
function artHash(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
  return hash >>> 0;
}

/** The label is 133px wide: past ~21 characters the sub line reaches its edge. */
function clampSub(sub: string, max = 21): string {
  return sub.length <= max ? sub : `${sub.slice(0, max - 1).trimEnd()}…`;
}


// Deterministic label art. Four distinct compositions rather than one, because
// 4,500 tiles of the same sun-over-mountain read as a placeholder rather than a
// shelf. Motif, palette and geometry all derive from the softlist id, so a cart
// always looks like itself. No copyrighted box scans are involved; a real label
// photo, when the visitor has one, is drawn on top of this (applyCartArt).
const ART_X = 53.5;
const ART_Y = 25.5;
const ART_W = 133;
const ART_H = 64;

function labelArtFor(hash: number, hue: number): string {
  const pick = (shift: number, mod: number) => (hash >>> shift) % mod;
  const back = `<rect x="${ART_X}" y="${ART_Y}" width="${ART_W}" height="${ART_H}" fill="hsl(${hue} 38% 17%)"/>`;
  const ink = (deg: number, s: number, l: number) => `hsl(${(hue + deg) % 360} ${s}% ${l}%)`;
  const right = ART_X + ART_W;
  const bottom = ART_Y + ART_H;

  switch (hash % 4) {
    case 0: { // sun over ridges
      const cx = ART_X + 22 + pick(8, ART_W - 44);
      return back
        + `<circle cx="${cx}" cy="${ART_Y + 16 + pick(16, 14)}" r="${10 + pick(20, 10)}" fill="${ink(42, 78, 58)}" opacity=".9"/>`
        + `<path d="M${ART_X} ${bottom - 9} L${ART_X + 30 + pick(4, 30)} ${ART_Y + 22} L${ART_X + 78 + pick(12, 36)} ${bottom - 9} Z" fill="${ink(185, 48, 27)}"/>`
        + `<path d="M${ART_X} ${bottom} L${ART_X + 50 + pick(10, 26)} ${ART_Y + 36} L${right} ${bottom} Z" fill="${ink(215, 42, 36)}"/>`;
    }
    case 1: { // stacked bands with a horizon strip
      let bands = back;
      const n = 4 + pick(6, 3);
      for (let i = 0; i < n; i++) {
        const h = ART_H / n;
        bands += `<rect x="${ART_X}" y="${ART_Y + i * h}" width="${ART_W}" height="${h}"
          fill="${ink(24 * i, 60 - i * 4, 26 + i * 7)}" opacity=".95"/>`;
      }
      return bands
        + `<circle cx="${right - 24 - pick(14, 40)}" cy="${ART_Y + 18}" r="${8 + pick(9, 7)}" fill="${ink(60, 85, 66)}"/>`;
    }
    case 2: { // radiating rays from a low corner
      const ox = pick(6, 2) ? ART_X + 8 : right - 8;
      let rays = back;
      for (let i = 0; i < 6; i++) {
        rays += `<path d="M${ox} ${bottom} L${ART_X + (i * ART_W) / 6} ${ART_Y} L${ART_X + ((i + 1) * ART_W) / 6} ${ART_Y} Z"
          fill="${ink(i * 14, 62, 24 + i * 5)}" opacity=".9"/>`;
      }
      return rays
        + `<circle cx="${ox}" cy="${bottom}" r="${12 + pick(18, 8)}" fill="${ink(48, 88, 62)}" opacity=".95"/>`;
    }
    default: { // sprite grid, the "arcade screenshot" look
      let cells = back;
      const cols = 6 + pick(8, 3);
      const rows = 3 + pick(12, 2);
      const cw = ART_W / cols;
      const ch = ART_H / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (((hash >>> ((r * cols + c) % 24)) & 3) === 0) continue;
          cells += `<rect x="${ART_X + c * cw + 1}" y="${ART_Y + r * ch + 1}" width="${cw - 2}" height="${ch - 2}" rx="1"
            fill="${ink((r * cols + c) * 11, 66, 30 + ((r + c) % 4) * 9)}"/>`;
        }
      }
      return cells;
    }
  }
}

/** Real labels print their part code bottom-right; the set name goes there. */
function clampCode(code: string, max = 26): string {
  return code.length <= max ? code : `…${code.slice(-(max - 1))}`;
}

function cartSvg(o: {
  title: string; sub: string; state: CartState; artKey?: string;
  /** the zip this cartridge is, or would be: "mario1.zip" */
  code?: string;
  /**
   * A real label photo is about to be composited over this drawing. The label
   * grows to fit it, and the drawn stand-ins for a label — generated art, title,
   * publisher, zip name — are left out rather than peeking around the photo.
   */
  sticker?: boolean;
}): string {
  const hash = artHash(o.artKey ?? o.title);
  const hue = hash % 360;
  const catalogStripe = `hsl(${hue} 62% 46%)`;
  const stripe = o.state === 'lit' ? STRIPE_TESTED
    : o.state === 'experimental' ? STRIPE_EXPERIMENTAL
      : o.state === 'unsupported' ? STRIPE_UNSUPPORTED
        : o.artKey ? catalogStripe : STRIPE_PLACEHOLDER;
  const dim = (o.state === 'placeholder' && !o.artKey) || o.state === 'unsupported';
  const dashed = o.state === 'placeholder' && !o.artKey;
  const titleColor = dim ? '#8b8b86' : '#181818';
  const subColor = dim ? '#7a7a75' : '#6b6045';
  // The label is narrower than the cart, so titles wrap sooner than the
  // exported default: a real NES label is ~70% of the shell width.
  const lines = wrapCartTitle(o.title, 15);
  const labelH = o.sticker ? LABEL_H_ART : LABEL_H;

  // Left fifth of the shell is the ribbed grip: ~20 fine horizontal grooves.
  let ridges = '';
  for (let i = 0; i < 20; i++) {
    const y = 32 + i * 6.6;
    ridges += `<rect x="16" y="${y}" width="30" height="3" fill="rgba(0,0,0,.24)"/>`
      + `<rect x="16" y="${y + 3}" width="30" height="1.6" fill="rgba(255,255,255,.28)"/>`;
  }

  const titleSvg = lines.map((l, i) =>
    `<text x="60" y="${112 + i * 19}" font-family="ui-sans-serif,system-ui,sans-serif" font-size="14" font-weight="800" fill="${titleColor}">${esc(l)}</text>`).join('');

  // state marks (drawn on top of the label)
  let mark = '';
  if (o.state === 'lit') {
    mark = `<circle cx="167" cy="42" r="14" fill="${SEAL_GREEN}" stroke="#fff" stroke-width="2"/>`
      + `<text x="167" y="47.5" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-size="16" font-weight="900" fill="#fff">✓</text>`;
  } else if (o.state === 'experimental') {
    mark = `<rect x="142" y="31" width="42" height="17" rx="3" fill="${STRIPE_EXPERIMENTAL}"/>`
      + `<text x="163" y="43.5" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" font-weight="800" fill="#221a05" letter-spacing="1">EXP</text>`;
  } else if (o.state === 'unsupported') {
    mark = `<text x="120" y="70" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-size="30" font-weight="900" fill="#e0504d" opacity=".9">✕</text>`;
  }
  const chip = o.state === 'placeholder' && !o.artKey
    ? `<rect x="62" y="136" width="116" height="24" rx="12" fill="rgba(6,8,20,.55)" stroke="${STRIPE_PLACEHOLDER}" stroke-width="1.5" stroke-dasharray="4 3"/>`
      + `<text x="120" y="152" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" font-weight="800" fill="#c6cdec" letter-spacing=".5">◍ INSERT DUMP</text>`
    : '';
  // Every catalog entry gets deterministic label art from its metadata. This
  // keeps all 4,000+ carts visually distinct without bundling copyrighted box
  // scans: color, sun position and horizon bars are stable for the softlist id.
  const labelArt = o.artKey ? labelArtFor(hash, hue) : '';

  return `<svg viewBox="0 0 ${CART_W} ${CART_H}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <defs>
      <linearGradient id="cb" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${CART_BODY_TOP}"/><stop offset="1" stop-color="${CART_BODY_BOT}"/>
      </linearGradient>
      <clipPath id="clabel">
        <rect x="${ART_X}" y="${ART_Y}" width="${ART_W}" height="${ART_H}"/>
      </clipPath>
    </defs>
    <!-- shell: rounded top, stepped-in base, notched top shoulders -->
    <rect x="6" y="4" width="188" height="242" rx="9" fill="url(#cb)"/>
    <rect x="6" y="4" width="26" height="13" rx="4" fill="rgba(0,0,0,.16)"/>
    <rect x="168" y="4" width="26" height="13" rx="4" fill="rgba(0,0,0,.16)"/>
    <rect x="10" y="6" width="180" height="2.5" rx="1.2" fill="rgba(255,255,255,.42)"/>
    <rect x="6" y="196" width="188" height="50" fill="rgba(0,0,0,.07)"/>
    <rect x="6" y="195" width="188" height="1.6" fill="rgba(0,0,0,.22)"/>
    <rect x="6" y="197" width="188" height="1.2" fill="rgba(255,255,255,.18)"/>
    ${ridges}
    <!-- the label: right ~70% of the shell, black-framed, top-aligned -->
    <rect data-label-frame x="${LABEL_X - LABEL_FRAME_PAD}" y="${LABEL_Y - LABEL_FRAME_PAD}" width="${LABEL_W + LABEL_FRAME_PAD * 2}" height="${labelH + LABEL_FRAME_PAD * 2}" rx="3" fill="none" stroke="${CART_LABEL_FRAME}" stroke-width="3"${dashed ? ' stroke-dasharray="7 5"' : ''}/>
    <rect data-label-bg x="${LABEL_X}" y="${LABEL_Y}" width="${LABEL_W}" height="${labelH}" rx="2" fill="${CART_LABEL_BG}"/>
    ${o.sticker ? '' : `<rect x="${LABEL_X}" y="${LABEL_Y}" width="${LABEL_W}" height="10" fill="${stripe}"/>
    <g clip-path="url(#clabel)">${labelArt}</g>
    ${titleSvg}
    <text x="60" y="${112 + lines.length * 19 + 4}" font-family="ui-sans-serif,system-ui,sans-serif" font-size="10" font-weight="600" fill="${subColor}">${esc(clampSub(o.sub))}</text>
    ${o.code ? `<text x="180" y="161.5" text-anchor="end" font-family="ui-monospace,monospace"
      font-size="8.5" font-weight="700" letter-spacing=".2" fill="${dim ? '#8b8b86' : '#8a8172'}"
      >${esc(clampCode(o.code))}</text>` : ''}`}
    <!-- moulded insertion arrow and the base recess -->
    <path d="M92 208 H108 L100 222 Z" fill="rgba(0,0,0,.26)"/>
    <rect x="68" y="228" width="64" height="9" rx="3" fill="rgba(0,0,0,.13)"/>
    ${dim ? `<rect x="6" y="4" width="188" height="242" rx="9" fill="rgba(6,7,15,.5)"/>` : ''}
    ${chip}${mark}
  </svg>`;
}

function consoleArt(W: number, H: number): string {
  const cw = W * 0.82, cx = (W - cw) / 2, ch = cw * 0.6, cy = (H - ch) / 2 - H * 0.03;
  const n = (x: number) => x.toFixed(1);
  const stripeX = cx + cw * 0.08, stripeW = cw * 0.84;
  const ledX = cx + cw * 0.13, ledY = cy + ch * 0.33, ledR = cw * 0.017;
  const wmX = cx + cw * 0.3, wmY = cy + ch * 0.4, wmW = cw * 0.4, wmH = ch * 0.17;
  const flapX = cx + cw * 0.06, flapY = cy + ch * 0.63, flapW = cw * 0.88, flapH = ch * 0.3;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <defs>
      <linearGradient id="cd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e0dcd2"/><stop offset="1" stop-color="#c6c2b7"/>
      </linearGradient>
      <radialGradient id="led" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ff5a63"/><stop offset="0.55" stop-color="${ACCENT}"/><stop offset="1" stop-color="rgba(230,0,18,0)"/>
      </radialGradient>
    </defs>
    <ellipse cx="${n(cx + cw / 2)}" cy="${n(cy + ch + 8)}" rx="${n(cw * 0.52)}" ry="${n(ch * 0.09)}" fill="rgba(0,0,0,.45)"/>
    <rect x="${n(cx)}" y="${n(cy)}" width="${n(cw)}" height="${n(ch)}" rx="${n(cw * 0.05)}" fill="url(#cd)"/>
    <rect x="${n(cx)}" y="${n(cy)}" width="${n(cw)}" height="3" rx="1.5" fill="rgba(255,255,255,.6)"/>
    <rect x="${n(stripeX)}" y="${n(cy + ch * 0.14)}" width="${n(stripeW)}" height="${n(ch * 0.03)}" fill="#17150f"/>
    <rect x="${n(stripeX)}" y="${n(cy + ch * 0.2)}" width="${n(stripeW)}" height="${n(ch * 0.03)}" fill="#17150f"/>
    <circle cx="${n(ledX)}" cy="${n(ledY)}" r="${n(ledR * 2.6)}" fill="url(#led)"/>
    <circle cx="${n(ledX)}" cy="${n(ledY)}" r="${n(ledR)}" fill="${ACCENT}"/>
    <rect x="${n(cx + cw * 0.78)}" y="${n(cy + ch * 0.29)}" width="${n(cw * 0.05)}" height="${n(ch * 0.06)}" rx="1" fill="#2c2a27"/>
    <rect x="${n(cx + cw * 0.86)}" y="${n(cy + ch * 0.29)}" width="${n(cw * 0.05)}" height="${n(ch * 0.06)}" rx="1" fill="#2c2a27"/>
    <rect x="${n(wmX)}" y="${n(wmY)}" width="${n(wmW)}" height="${n(wmH)}" rx="2" fill="#cbc7bc" stroke="rgba(0,0,0,.25)"/>
    <text x="${n(wmX + wmW / 2)}" y="${n(wmY + wmH * 0.68)}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="${n(wmH * 0.55)}" font-weight="700" letter-spacing="1.5" fill="#6a655b">CONTROL DECK</text>
    <rect x="${n(cx + cw * 0.45)}" y="${n(flapY - ch * 0.04)}" width="${n(cw * 0.1)}" height="${n(ch * 0.05)}" rx="2" fill="#8f8b82"/>
    <rect x="${n(flapX)}" y="${n(flapY)}" width="${n(flapW)}" height="${n(flapH)}" rx="4" fill="#a7a39a"/>
    <rect x="${n(flapX)}" y="${n(flapY)}" width="${n(flapW)}" height="2" fill="rgba(255,255,255,.25)"/>
    <rect x="${n(flapX + flapW * 0.04)}" y="${n(flapY + flapH * 0.5)}" width="${n(flapW * 0.92)}" height="1.5" fill="rgba(0,0,0,.3)"/>
  </svg>`;
}

async function fetchCatalog(cfg: ShellConfig): Promise<SoftCatalog | null> {
  // catalogUrl is relative to the canonical generated machine directory.
  try {
    const r = await fetch(`../${cfg.dataPath}/${cfg.cart?.catalogUrl ?? 'softlist.json'}`);
    return r.ok ? await r.json() as SoftCatalog : null;
  } catch { return null; }
}

async function fetchOwnEntry(cfg: ShellConfig): Promise<MenuEntry | null> {
  try {
    const games = await fetch('../games.json').then(r => r.json()) as MenuEntry[];
    return games.find(g => g.game === cfg.game) ?? null;
  } catch { return null; }
}

/** parse + identify a stored record against this visit's catalog */
function resolveRec(
  rec: CartRecord,
  catalog: SoftCatalog | null,
  support: { slots: string[]; games: string[]; mapperSlots?: Record<number, string> },
): ResolvedCart | null {
  const ines = parseINes(new Uint8Array(rec.bytes));
  return ines ? identify(ines, catalog, support) : null;
}

/** unified navigable shelf entry (placeholder slot OR a dropped "other" cart) */
interface Card {
  item: HTMLElement;
  canPlay: () => boolean;
  play: () => void;
  info: () => void;
  eject: () => void;
}

export async function runConsole(cfg: ShellConfig): Promise<void> {
  document.title = cfg.title;
  // a deep-linked cart boot replaces the room DOM entirely — Back must
  // rebuild it, so a reload is the honest implementation
  addEventListener('popstate', () => location.reload());

  const support = {
    slots: cfg.cart?.slots ?? [],
    games: cfg.cart?.games ?? [],
    mapperSlots: MAPPER_SLOTS,
  };
  // The bucket key for this console's set mirrors .data/roms: games/consoles/nes
  // -> consoles/nes. Availability is best-effort: with no manifest reachable the
  // room behaves exactly as before and asks for a drop.
  const setKey = cfg.dataPath.replace(/^games\//, '');
  // Availability comes from the generated index beside this machine when
  // generation found a local dump audit — same origin, already reduced, so it
  // lands almost immediately. Failing that we ask the mirror for the raw audit
  // manifest. Either way the fetch does NOT block the room: the shelf is fully
  // usable without it and merges it in when it lands (mergeAvailability).
  const cartsUrl = cfg.cart?.cartsUrl;
  const availabilityPromise = cartsUrl
    ? fetch(`../${cfg.dataPath}/${cartsUrl}`)
      .then(r => r.ok ? r.json() as unknown : null)
      .catch(() => null)
      .then(index => index ?? fetchRomJson<unknown>(`${setKey}/_manifest.json`))
    : fetchRomJson<unknown>(`${setKey}/_manifest.json`);
  const [store, catalog, entry] = await Promise.all([
    openCartStore(),
    fetchCatalog(cfg),
    fetchOwnEntry(cfg),
  ]);
  /** verified dumps, keyed by the softlist short name their tile already uses */
  const availByName = new Map<string, CartAvailability>();
  /** dumps with no softlist identity of their own (hacks, pirates, VS boards) */
  const bucketExtras: CartAvailability[] = [];
  // stale-bundle guard: generated before the board compiled -> shelve-only
  const coreSupported = entry?.supported !== false;
  let inRoom = true; // gates every window-level listener once a cart boots
  let modalDepth = 0;

  // play-enable now keys off .playable (tested OR experimental), gated by the core
  const playable = (r: ResolvedCart | null): r is ResolvedCart => r !== null && r.playable && coreSupported;

  const boot = (rec: CartRecord, resolved: ResolvedCart): void => {
    inRoom = false;
    document.body.textContent = '';
    const regions: Regions = { prg: mountedINesPrg(resolved.ines) };
    if (resolved.ines.chr) regions.chr = resolved.ines.chr; // omitted => CHR-RAM cart
    const cfg2: ShellConfig = {
      ...cfg,
      title: resolved.meta?.description ?? rec.name.replace(/\.[a-z0-9]+$/i, ''),
      menuUrl: `g/${encodeURIComponent(cfg.game)}/`, // Esc: back to this room
      board: {
        ...cfg.board, // CLONE — never mutate the fetched config
        cart: { mapper: resolved.mapper, mirroring: resolved.ines.mirroring, battery: resolved.ines.battery },
      },
    };
    void runShell(cfg2, regions);
  };

  const bootCart = (rec: CartRecord, resolved: ResolvedCart | null): void => {
    if (!playable(resolved)) return;
    history.pushState(null, '', '?cart=' + encodeURIComponent(rec.id));
    boot(rec, resolved);
  };

  // --- deep link: ?cart=<id> boots straight into the game ---------------------
  const cartParam = new URLSearchParams(location.search).get('cart');
  if (cartParam) {
    const rec = await store.get(cartParam);
    const resolved = rec ? resolveRec(rec, catalog, support) : null;
    if (rec && playable(resolved)) { boot(rec, resolved); return; }
    history.replaceState(null, '', location.pathname); // unknown/unplayable id — show the room
  }

  // --- room chrome -------------------------------------------------------------
  const root = el('div', `min-height:100vh;box-sizing:border-box;margin:0;padding:0 0 60px;
    background:linear-gradient(#06070f, #0b0d1d 30%, #10142a);color:#eee;
    font:14px ui-sans-serif,system-ui`);
  root.setAttribute('data-console-room', cfg.game);
  document.body.style.margin = '0';
  document.body.style.background = '#06070f';
  document.body.appendChild(root);

  const header = el('div', `display:flex;align-items:center;gap:24px;flex-wrap:wrap;
    padding:22px 36px 18px;border-bottom:4px solid ${ACCENT};
    background:linear-gradient(#141838,#0c0f24);box-shadow:0 6px 30px rgba(230,0,18,.18)`);
  const back = document.createElement('a');
  back.href = './?tab=consoles'; // <base href="../../"> -> app/?tab=consoles
  back.textContent = '‹ ALL SYSTEMS';
  back.setAttribute('data-back', '');
  back.style.cssText = `color:#9fb0ff;text-decoration:none;font-weight:700;letter-spacing:1.5px;
    font-size:12px;padding:8px 14px;border:2px solid #2a3160;border-radius:8px;flex-shrink:0`;
  const marquee = el('div', 'display:flex;flex-direction:column;gap:2px');
  const title = el('div', `font-size:30px;font-weight:800;letter-spacing:2px;
    color:${GOLD};text-shadow:0 0 18px rgba(242,194,0,.55), 0 2px 0 #7a5c00;font-family:ui-monospace,monospace`);
  title.textContent = (entry?.fullname ?? cfg.title).replace(/\s*\(.*\)$/, '');
  const sub = el('div', 'color:#7f8ac9;letter-spacing:6px;font-size:11px;font-weight:600');
  sub.textContent = ['CONSOLE', entry?.manufacturer, entry?.year].filter(Boolean).join(' · ');
  marquee.append(title, sub);
  // the front-loader hero (inline SVG, crisp at any DPR)
  const hero = el('div', 'width:230px;height:132px;flex:0 0 auto;filter:drop-shadow(0 8px 18px rgba(0,0,0,.5))');
  hero.setAttribute('data-console-hero', '');
  hero.innerHTML = consoleArt(230, 132);
  const aboutBtn = document.createElement('button');
  aboutBtn.textContent = 'About this console';
  aboutBtn.setAttribute('data-about', '');
  aboutBtn.style.cssText = `margin-left:auto;padding:9px 18px;border-radius:8px;font-weight:700;cursor:pointer;
    border:2px solid #2a3160;color:#9fb0ff;background:transparent;font:inherit;font-weight:700`;
  aboutBtn.addEventListener('click', openAboutModal);
  header.append(back, marquee, hero, aboutBtn);
  root.appendChild(header);

  const banner = (text: string, attr: string, color: string): void => {
    const b = el('div', `box-sizing:border-box;padding:10px 18px;border:1px solid ${color};border-radius:10px;color:${color};
      background:rgba(0,0,0,.35);font-size:13px;text-align:center;margin-top:18px`);
    b.setAttribute(attr, '');
    b.textContent = text;
    b.style.marginLeft = 'max(36px, calc(50% - 604px))';
    b.style.marginRight = 'max(36px, calc(50% - 604px))';
    root.appendChild(b);
  };
  if (!store.persistent) banner('Private browsing — carts last only this session', 'data-banner-private', '#e8b64c');
  if (!coreSupported) banner('Console core still compiling — carts can be shelved but not played', 'data-banner-core', '#8b93c4');

  // --- the cart slot (drop zone) -------------------------------------------------
  const slotWrap = el('div', 'max-width:1280px;margin:26px auto 0;padding:0 36px;box-sizing:border-box');
  const slot = el('div', `border:3px dashed rgba(242,194,0,.65);border-radius:14px;cursor:pointer;
    background:linear-gradient(#10142a,#0a0c1c);padding:24px 30px 20px;
    display:flex;flex-direction:column;align-items:center;gap:8px;
    transition:transform .15s ease,border-color .15s ease,box-shadow .15s ease,background .15s ease`);
  slot.setAttribute('data-drop-slot', '');
  // the front-loader mouth: dark slot with the thin red stripe under it
  const mouth = el('div', `width:min(420px,84%);height:16px;border-radius:3px;
    background:linear-gradient(#05060a,#1a1c26);box-shadow:inset 0 4px 8px #000;
    border-bottom:3px solid ${ACCENT}`);
  const slotBig = el('div', `font-size:19px;font-weight:800;color:${GOLD};letter-spacing:2px;margin-top:4px`);
  const slotSmall = el('div', 'color:#9fb0ff;font-size:13px');
  const slotNote = el('div', 'color:#5a6188;font-size:11px;margin-top:2px');
  slotNote.textContent = 'Carts are stored only in this browser · Eject deletes';
  const toastEl = el('div', `display:none;color:#e0504d;font-size:12px;font-weight:700;margin-top:4px`);
  toastEl.setAttribute('data-toast', '');
  slot.append(mouth, slotBig, slotSmall, slotNote, toastEl);
  slotWrap.appendChild(slot);
  root.appendChild(slotWrap);

  // --- compatibility clarity strip (always visible) ------------------------------
  const testedTitles = support.games.map(name => stripSet(catalog?.entries.find(e => e.name === name)?.description ?? name));
  const boardNames = support.slots.map(s => SLOT_PCB[s] ?? s.toUpperCase());
  const stripText = `Any cart on ${boardNames.join(', ') || 'no'} boards.`;
  const compat = el('div', `max-width:1280px;box-sizing:border-box;margin:12px auto 0;padding:0 36px;
    color:#8b95cf;font-size:12px;text-align:center;line-height:1.6`);
  compat.setAttribute('data-compat-strip', '');
  const cLabel = el('span', `color:${GOLD};font-weight:700`);
  cLabel.textContent = 'Compatibility · ';
  const cText = el('span', '');
  cText.textContent = stripText;
  compat.append(cLabel, cText);
  root.appendChild(compat);

  const slotIdle = (): void => {
    slot.style.transform = '';
    slot.style.borderColor = 'rgba(242,194,0,.65)';
    slot.style.boxShadow = 'none';
    slot.style.background = 'linear-gradient(#10142a,#0a0c1c)';
    slotBig.textContent = 'INSERT CARTRIDGE';
    slotSmall.textContent = 'drop .nes or .zip files, or click to choose';
  };
  const slotArmed = (): void => {
    slot.style.transform = 'scale(1.01)';
    slot.style.borderColor = '#fff';
    slot.style.boxShadow = '0 0 44px rgba(242,194,0,.45)';
    slot.style.background = 'linear-gradient(#181d42,#0c0f24)';
    slotBig.textContent = 'RELEASE TO INSERT';
  };
  const slotBusy = (name: string): void => {
    slotBig.textContent = `READING ${name.toUpperCase()}…`;
    slotSmall.textContent = '';
  };
  slotIdle();

  let toastTimer: ReturnType<typeof setTimeout> | undefined;
  const toast = (msg: string): void => {
    toastEl.textContent = msg;
    toastEl.style.display = 'block';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.style.display = 'none'; }, 4500);
  };

  // --- the shelf: verified placeholder row + a divider + "your other cartridges" -
  const board = el('div', 'max-width:1280px;margin:0 auto;padding:0 36px;box-sizing:border-box');
  root.appendChild(board);

  const rowHead = (text: string): HTMLElement => {
    const h = el('div', `display:flex;align-items:center;gap:14px;color:#7f8ac9;font-size:11px;
      font-weight:700;letter-spacing:2px;margin:38px 0 4px`);
    const lab = el('span', 'flex:0 0 auto');
    lab.textContent = text;
    const rule = el('span', 'flex:1;height:1px;background:linear-gradient(90deg,#2a3160,transparent)');
    h.append(lab, rule);
    return h;
  };

  const libraryHead = rowHead('THE CARTRIDGE LIBRARY');
  board.appendChild(libraryHead);
  const libraryIntro = el('div', `display:flex;align-items:center;gap:12px;flex-wrap:wrap;
    padding:14px 16px;margin:8px 0 18px;border:1px solid #252d62;border-radius:12px;
    background:linear-gradient(135deg,rgba(24,30,67,.96),rgba(9,12,29,.96));
    box-shadow:inset 0 1px rgba(255,255,255,.05),0 12px 28px rgba(0,0,0,.28)`);
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'Search titles, publishers, years…';
  search.setAttribute('data-cart-search', '');
  search.style.cssText = `flex:1 1 300px;min-width:190px;padding:11px 14px;border-radius:8px;
    border:2px solid #303a78;background:#080b1d;color:#f4f5ff;font:inherit;outline:none`;
  const boardFilter = document.createElement('select');
  boardFilter.setAttribute('data-cart-filter', '');
  boardFilter.style.cssText = `padding:11px 14px;border-radius:8px;border:2px solid #303a78;
    background:#111633;color:#d8dcff;font:inherit;cursor:pointer`;
  for (const [value, label] of [
    ['all', 'All cartridges (nes.xml)'],
    ['playable', 'Playable boards'],
    ...support.slots.map(slot => [slot, SLOT_PCB[slot] ?? slot.toUpperCase()]),
  ]) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    boardFilter.appendChild(option);
  }
  const libraryCount = el('div', 'color:#8f99d2;font:12px ui-monospace,monospace;white-space:nowrap');
  libraryCount.setAttribute('data-library-count', '');
  libraryIntro.append(search, boardFilter, libraryCount);
  board.appendChild(libraryIntro);

  const libraryStage = el('div', `position:relative;padding:22px 18px 32px;border-radius:14px;
    background:linear-gradient(90deg,#080913,#101329 50%,#080913);
    border:1px solid #202650;box-shadow:inset 0 12px 30px rgba(0,0,0,.65)`);
  const libraryRow = el('div', `display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));
    align-items:start;justify-items:center;gap:26px 18px;position:relative;z-index:1`);
  libraryRow.setAttribute('data-library-shelf', '');
  const shelfLip = el('div', `position:absolute;left:8px;right:8px;bottom:10px;height:18px;border-radius:4px;
    background:linear-gradient(#575268,#211f2c 42%,#090a10 45%);
    box-shadow:0 8px 18px rgba(0,0,0,.8)`);
  libraryStage.append(libraryRow, shelfLip);
  board.appendChild(libraryStage);
  const moreLibrary = document.createElement('button');
  moreLibrary.textContent = 'SHOW MORE CARTRIDGES';
  moreLibrary.setAttribute('data-library-more', '');
  moreLibrary.style.cssText = `display:block;margin:18px auto 0;padding:10px 22px;border-radius:9px;
    border:2px solid #303a78;background:#111633;color:#cbd1ff;font:700 12px ui-monospace,monospace;
    letter-spacing:1px;cursor:pointer`;
  board.appendChild(moreLibrary);

  // The visitor's own cartridges sit ABOVE the library: once they have carts,
  // those are what they came back for. Hidden entirely until the first one
  // arrives, so a first visit still opens on the library.
  const otherHead = rowHead('YOUR CARTRIDGES');
  otherHead.style.display = 'none';
  const otherRow = el('div', 'display:flex;flex-wrap:wrap;gap:30px 26px;justify-content:center;padding:8px 0 0');
  otherRow.setAttribute('data-cart-shelf', '');
  board.insertBefore(otherHead, libraryHead);
  board.insertBefore(otherRow, libraryHead);

  const hint = el('div', 'text-align:center;color:#4b5384;padding:34px 28px 8px;font-size:12px');
  hint.textContent = '↑↓←→ browse · Enter: play · i: info · E: eject · Esc: all systems · in-game: Esc returns here';
  root.appendChild(hint);

  // --- shared button + inline-eject helpers --------------------------------------
  const mkBtn = (text: string, attr: string, solid: boolean, enabled: boolean): HTMLButtonElement => {
    const b = document.createElement('button');
    b.textContent = text;
    b.setAttribute(attr, '');
    b.disabled = !enabled;
    b.style.cssText = `padding:5px 12px;border-radius:7px;font:inherit;font-size:12px;font-weight:700;
      cursor:${enabled ? 'pointer' : 'default'};
      ${solid && enabled ? `background:${GOLD};color:#1b1b1b;border:2px solid ${GOLD}`
        : `background:transparent;border:2px solid #2a3160;color:${enabled ? '#9fb0ff' : '#555c86'}`}
      ${enabled ? '' : ';opacity:.55'}`;
    return b;
  };

  // two-step inline eject confirm — no window.confirm, ever
  const armEject = (buttons: HTMLElement, rebuild: () => void, onConfirm: () => void): void => {
    if (buttons.dataset.confirm) return;
    buttons.dataset.confirm = '1';
    buttons.textContent = '';
    const q = el('span', 'font-size:12px;color:#e8b64c;font-weight:700;letter-spacing:.5px');
    q.textContent = 'Eject?';
    const yes = mkBtn('✔', 'data-eject-confirm', false, true);
    yes.style.borderColor = '#e0504d';
    yes.style.color = '#e0504d';
    const no = mkBtn('✕', 'data-eject-cancel', false, true);
    let t: ReturnType<typeof setTimeout>;
    const done = (): void => { clearTimeout(t); delete buttons.dataset.confirm; };
    yes.addEventListener('click', ev => { ev.stopPropagation(); done(); onConfirm(); });
    no.addEventListener('click', ev => { ev.stopPropagation(); done(); rebuild(); });
    buttons.append(q, yes, no);
    t = setTimeout(() => { done(); rebuild(); }, 4000);
  };

  const coverEl = (svg: string, glow: boolean, dim: boolean): HTMLElement => {
    const c = el('div', `position:relative;width:${CART_W}px;height:${CART_H}px;border-radius:12px;cursor:pointer;
      transition:transform .15s ease, box-shadow .2s ease;
      box-shadow:${glow ? `0 0 34px rgba(90,150,255,.5), 0 12px 24px rgba(0,0,0,.5)` : '0 12px 22px rgba(0,0,0,.45)'};
      ${dim ? 'opacity:.9' : ''}`);
    c.innerHTML = svg;
    return c;
  };

  /**
   * Use real cartridge photography when the visitor has it locally, under
   * .data/artwork/carts/<list>/ keyed by softlist short name (see CONTRIBUTING):
   *
   *   <name>.<ext>          the whole cartridge  -> replaces the drawn shell
   *   <name>.sticker.<ext>  the label only       -> sits inside the drawn label
   *
   * png / jpg / jpeg / webp. The available files are resolved at generation time
   * into config.json, so the shelf never probes for art it does not have — with
   * thousands of cartridges on screen, guessing would mean thousands of 404s.
   * A file that fails to decode leaves the drawn cartridge showing.
   *
   * The sticker rect matches the label drawn by cartSvg: x 53.5..186.5,
   * y 15.5..166.5 of a 200x250 viewBox.
   */
  // config.json carries the art index resolved at generation time. That one
  // snapshot is what every visitor sees, so it is what a developer sees too: a
  // dev-only /cart-art route used to re-read .data per request, which quietly
  // gave localhost a different shelf from the deployed site.
  let cartArt: Record<string, { cart?: string; sticker?: string }> = cfg.cart?.cartArt ?? {};
  /** does this cart have a label photo about to be composited over the drawing? */
  function hasSticker(name: string): boolean {
    return Boolean(name && cartArt[name]?.sticker);
  }

  /**
   * Narrow the drawn label to the loaded scan's aspect, keeping its centre line
   * and its top edge. Height is fixed at LABEL_H_ART, so a row of cartridges
   * still lines up; only the width moves, and never wider than the moulded
   * label. A scan that is squarer than the label leaves the label as drawn.
   */
  function fitLabelToArt(cover: HTMLElement, img: HTMLImageElement): void {
    const { naturalWidth: w, naturalHeight: h } = img;
    if (!w || !h) return;
    const width = Math.min(LABEL_W, LABEL_H_ART * (w / h));
    const x = LABEL_CX - width / 2;
    const bg = cover.querySelector('[data-label-bg]');
    const frame = cover.querySelector('[data-label-frame]');
    bg?.setAttribute('x', String(x));
    bg?.setAttribute('width', String(width));
    frame?.setAttribute('x', String(x - LABEL_FRAME_PAD));
    frame?.setAttribute('width', String(width + LABEL_FRAME_PAD * 2));
    img.style.left = pct(x, CART_W);
    img.style.width = pct(width, CART_W);
    // the label now matches the scan, so filling it crops nothing
    img.style.objectFit = 'cover';
  }
  function applyCartArt(cover: HTMLElement, name: string): void {
    const list = cfg.cart?.list;
    const art = name ? cartArt[name] : undefined;
    if (!list || !art) return;
    // Sticker first: it composites into the drawn shell, so a shelf of mixed
    // art still reads as one set of cartridges. A whole-cartridge photo stands
    // in for the drawing when that is all there is.
    const sticker = art.sticker !== undefined;
    const file = art.sticker ?? art.cart;
    if (!file) return;
    const img = document.createElement('img');
    img.alt = '';
    // contain, not cover: the label is already sized for box-scan proportions,
    // so fitting shows the whole scan. Any leftover is label bg at the sides,
    // which reads as the printed border rather than as a crop.
    img.style.cssText = sticker
      ? `position:absolute;left:${pct(LABEL_X, CART_W)};top:${pct(LABEL_Y, CART_H)};
         width:${pct(LABEL_W, CART_W)};height:${pct(LABEL_H_ART, CART_H)};
         object-fit:contain;opacity:0;transition:opacity .2s ease;pointer-events:none;border-radius:2px`
      // a photo of the whole cartridge stands in for the drawing entirely
      : `position:absolute;inset:0;width:100%;height:100%;object-fit:contain;
         opacity:0;transition:opacity .2s ease;pointer-events:none`;
    img.addEventListener('load', () => {
      // Fit the drawn label to the scan rather than the scan to the label:
      // box scans vary (313x506, 350x499, ...), so a fixed rect either crops or
      // leaves gutters. Narrowing the label to the image's own aspect keeps the
      // photo edge-to-edge inside its frame, at the label's centre line.
      if (sticker) fitLabelToArt(cover, img);
      img.style.opacity = '1';
    });
    // The site's own `.webp` sibling first, the archival scan on the bucket as
    // the fallback — the rule every other artwork tree follows. A supported
    // cartridge's scan ships inside dist (WEB_ARTWORK_TREES in src/gen), so its
    // box arrives same-origin at ~30 KB instead of half a megabyte from an
    // object store six connections deep; one added without a sibling still
    // renders, just slowly.
    const [web, archival] = artworkSources(`carts/${list}/${file}`);
    img.addEventListener('error', () => {
      if (img.src.endsWith(web)) { img.src = archival; return; }
      img.remove();
    });
    img.src = web;
    cover.appendChild(img);
  }

  // --- "other" tiles (experimental / unsupported / unreadable dumps) --------------
  interface Other extends Card {
    rec: CartRecord;
    resolved: ResolvedCart | null;
    /** re-apply local cartridge art, e.g. after the live index lands */
    refreshArt: () => void;
  }
  const others: Other[] = [];

  const catalogTiles: Card[] = [];
  let catalogLimit = 48;

  /**
   * One row of the library grid: a catalogued softlist title, or a dump the
   * bucket holds that has no softlist identity of its own (hacks, pirates, VS
   * boards). `avail` is set when the bucket can supply the dump on demand.
   */
  interface LibraryRow {
    key: string;
    title: string;
    sub: string;
    /** mapper slot family, '' when the dump was never identified */
    slot: string;
    entry?: SoftEntry;
    avail?: CartAvailability;
    tier: 'catalog' | 'verified' | 'experimental';
    haystack: string;
  }

  function libraryRows(): LibraryRow[] {
    const rows: LibraryRow[] = [];
    for (const catEntry of catalog?.entries ?? []) {
      const avail = availByName.get(catEntry.name);
      rows.push({
        key: catEntry.name,
        title: stripSet(catEntry.description),
        sub: [catEntry.publisher, catEntry.year].filter(Boolean).join(' · '),
        slot: catEntry.slot,
        entry: catEntry,
        avail,
        tier: avail ? 'verified' : 'catalog',
        haystack: `${catEntry.description} ${catEntry.publisher} ${catEntry.year} ${catEntry.name}`
          .toLocaleLowerCase(),
      });
    }
    for (const avail of bucketExtras) {
      const base = (avail.file.split('/').pop() ?? avail.file).replace(/\.zip$/i, '');
      rows.push({
        key: avail.file,
        title: stripSet(base),
        sub: 'unverified dump',
        slot: '',
        avail,
        tier: 'experimental',
        haystack: base.toLocaleLowerCase(),
      });
    }
    return rows;
  }

  function buildCatalogTile(row: LibraryRow): Card {
    const zipName = row.avail
      ? (row.avail.file.split('/').pop() ?? row.avail.file)
      : `${row.key}.zip`;
    // A dump the bucket can supply is offered for fetch; whether it then PLAYS
    // still depends on the mapper, which only the fetched header can settle for
    // an unidentified dump.
    const playableBoard = row.slot !== '' && support.slots.includes(row.slot);
    const item = el('div', 'display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0');
    item.setAttribute('data-catalog-cart', row.key);
    item.dataset.slot = row.slot;
    if (row.avail) item.dataset.bucket = row.tier;
    const artName = row.entry?.name ?? row.avail?.name ?? '';
    const cover = coverEl(cartSvg({
      title: row.title,
      sub: row.sub,
      state: row.tier === 'experimental' ? 'experimental' : 'placeholder',
      artKey: row.key,
      code: zipName,
      sticker: hasSticker(artName),
    }), false, !row.avail);
    cover.style.width = '160px';
    cover.style.height = '200px';
    cover.style.transform = 'perspective(700px) rotateY(-2deg)';
    applyCartArt(cover, artName);
    cover.addEventListener('mouseenter', () => {
      cover.style.transform = 'perspective(700px) translateY(-8px) rotateY(0)';
      cover.style.boxShadow = `0 0 28px hsla(${artHash(row.key) % 360},80%,60%,.34),0 18px 28px rgba(0,0,0,.7)`;
    });
    cover.addEventListener('mouseleave', () => {
      cover.style.transform = 'perspective(700px) rotateY(-2deg)';
      cover.style.boxShadow = '0 12px 22px rgba(0,0,0,.45)';
    });
    const pcb = row.slot === '' ? 'UNKNOWN BOARD' : (SLOT_PCB[row.slot] ?? row.slot.toUpperCase());
    const label = el('div', `max-width:164px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
      font:700 10px ui-monospace,monospace;letter-spacing:.5px;text-align:center;
      color:${row.tier === 'verified' ? '#5ecf7a' : row.avail ? '#e6a02a' : playableBoard ? '#e8b64c' : '#737ba7'}`);
    label.textContent = row.tier === 'verified' ? `${pcb} · VERIFIED DUMP`
      : row.tier === 'experimental' ? `${pcb} · EXPERIMENTAL`
        : playableBoard ? `${pcb} · READY FOR DUMP`
          : `${pcb} · DISPLAY ONLY`;
    label.title = row.avail
      ? `${row.title} — ${row.tier === 'verified'
        ? 'verified against nes.xml' : 'unverified dump'}; search the web for this dump`
      : `${row.title} — ${label.textContent}`;
    // The set name is what you type at MAME or look for on disk, so it gets a
    // line of its own rather than only the 8px print on the label.
    const file = el('div', `max-width:164px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
      color:#6f78ab;font:600 10px ui-monospace,monospace;text-align:center`);
    file.textContent = zipName;
    file.title = zipName;
    item.append(cover, label, file);

    const startFetch = (): void => {
      if (!row.avail) { picker.click(); return; }
      void fetchCart(row.avail, row.title, beginCartFetch(cover, label));
    };
    const card: Card = {
      item,
      canPlay: () => row.avail !== undefined && coreSupported,
      play: startFetch,
      info: () => openTargetModal(row.entry, row.key),
      eject: () => {},
    };
    // Every tile carries a button row, present or not, so tiles in a row share
    // one height and the cartridges line up on the shelf lip.
    const buttons = el('div', 'display:flex;gap:8px;align-items:center;justify-content:center;min-height:30px');
    if (row.avail) {
      const f = mkBtn('⌕ Search', 'data-fetch', true, coreSupported);
      f.addEventListener('click', ev => { ev.stopPropagation(); card.play(); });
      buttons.appendChild(f);
    }
    const i = mkBtn('i', 'data-info', false, true);
    i.addEventListener('click', ev => { ev.stopPropagation(); card.info(); });
    buttons.appendChild(i);
    item.appendChild(buttons);
    cover.onclick = row.avail ? card.play : card.info;
    return card;
  }

  let rows = libraryRows();
  let filterTouched = false;

  function renderCatalog(reset = false): void {
    if (reset) catalogLimit = 48;
    const term = search.value.trim().toLocaleLowerCase();
    const filter = boardFilter.value;
    const matches = rows.filter(row => {
      if (filter === 'verified' && row.tier !== 'verified') return false;
      if (filter === 'playable' && !(row.slot !== '' && support.slots.includes(row.slot))) return false;
      if (!['all', 'playable', 'verified'].includes(filter) && row.slot !== filter) return false;
      return !term || row.haystack.includes(term);
    });
    libraryRow.textContent = '';
    catalogTiles.splice(0);
    for (const row of matches.slice(0, catalogLimit)) {
      const tile = buildCatalogTile(row);
      catalogTiles.push(tile);
      libraryRow.appendChild(tile.item);
    }
    libraryCount.textContent = `${Math.min(catalogLimit, matches.length).toLocaleString()} / ${matches.length.toLocaleString()}`;
    moreLibrary.style.display = matches.length > catalogLimit ? 'block' : 'none';
    if (!matches.length) {
      const empty = el('div', 'grid-column:1/-1;padding:38px;color:#7982b8;text-align:center');
      empty.textContent = 'No cartridges match this shelf filter.';
      libraryRow.appendChild(empty);
    }
    fixSelection();
  }
  search.addEventListener('input', () => renderCatalog(true));
  boardFilter.addEventListener('change', () => { filterTouched = true; renderCatalog(true); });

  /**
   * Fold the mirror's availability index into the library once it arrives.
   * Bucket-backed filters only exist from this point on, and the default snaps
   * to them unless the visitor has already chosen a filter themselves.
   */
  function mergeAvailability(manifest: unknown): void {
    for (const cart of cartAvailability(manifest)) {
      if (cart.tier === 'verified' && cart.name) availByName.set(cart.name, cart);
      else bucketExtras.push(cart);
    }
    if (!availByName.size && !bucketExtras.length) return;
    // ONE availability choice, worded so it cannot read as "we host these":
    // a verified dump is one a web search is known to be able to find.
    const option = document.createElement('option');
    option.value = 'verified';
    option.textContent = `Verified dumps (${availByName.size.toLocaleString()})`;
    boardFilter.insertBefore(option, boardFilter.firstChild);
    boardFilter.value = filterTouched ? boardFilter.value : 'verified';
    rows = libraryRows();
    renderCatalog(true);
  }
  moreLibrary.addEventListener('click', () => {
    catalogLimit += 48;
    renderCatalog();
  });

  function buildOther(rec: CartRecord, resolved: ResolvedCart | null): Other {
    // Identified carts name their softlist set; an unrecognised dump can only
    // name the file the visitor handed us.
    const ownZipName = resolved?.meta ? `${resolved.meta.name}.zip` : rec.name;
    const state: CartState = resolved?.tier === 'tested' ? 'lit'
      : resolved?.tier === 'experimental' ? 'experimental'
        : 'unsupported';
    const title = stripSet(resolved?.meta?.description ?? rec.name.replace(/\.[a-z0-9]+$/i, ''));
    const dumpSub = resolved?.meta ? [resolved.meta.publisher, resolved.meta.year].filter(Boolean).join(' · ') : `${(rec.size / 1024).toFixed(0)} KB`;
    const canPlay = playable(resolved);

    const item = el('div', `display:flex;flex-direction:column;align-items:center;gap:7px;width:${CART_W}px`);
    item.setAttribute('data-cart-tile', rec.id);
    item.dataset.tier = resolved ? resolved.tier : 'unreadable';

    const artName = resolved?.meta?.name ?? '';
    const cover = coverEl(cartSvg({
      title, sub: dumpSub, state,
      code: ownZipName,
      sticker: hasSticker(artName),
    }), state === 'lit', state === 'unsupported');
    applyCartArt(cover, artName);
    cover.onclick = () => other.info();

    const status = el('div', `font-size:10px;font-weight:700;letter-spacing:.8px;text-align:center;min-height:13px;
      max-width:${CART_W}px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`);
    status.setAttribute('data-status', '');
    if (!resolved) { status.style.color = '#e0504d'; status.textContent = 'CANNOT READ — EJECT'; }
    else if (resolved.tier === 'tested') { status.style.color = '#5ecf7a'; status.textContent = '✓ VERIFIED'; }
    else if (resolved.tier === 'experimental') { status.style.color = '#e8b64c'; status.textContent = 'EXPERIMENTAL — UNTESTED'; }
    else { status.style.color = '#8b93c4'; status.textContent = (resolved.reason ?? 'MAPPER NOT SUPPORTED').toUpperCase(); }
    status.title = status.textContent;

    const fileLine = el('div', `max-width:${CART_W}px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
      color:#6f78ab;font:600 10px ui-monospace,monospace;text-align:center`);
    fileLine.textContent = ownZipName;
    fileLine.title = ownZipName;

    const buttons = el('div', 'display:flex;gap:8px;align-items:center;justify-content:center;min-height:30px');
    const other: Other = {
      rec, resolved, item,
      refreshArt: () => {
        // Redraw rather than only swapping the image: the label is drawn taller
        // for a cart that has a photo, so art appearing after first paint (the
        // dev server's live /cart-art route) has to re-run the drawing too.
        cover.innerHTML = cartSvg({
          title, sub: dumpSub, state,
          code: ownZipName,
          sticker: hasSticker(artName),
        });
        applyCartArt(cover, artName);
      },
      canPlay: () => canPlay,
      play: () => bootCart(rec, resolved),
      info: () => openInfoModal(rec, resolved, () => void removeOther(other)),
      eject: () => armEject(buttons, rebuild, () => void removeOther(other)),
    };
    function rebuild(): void {
      buttons.textContent = '';
      delete buttons.dataset.confirm;
      const p = mkBtn('▶ Play', 'data-play', true, canPlay);
      p.addEventListener('click', ev => { ev.stopPropagation(); other.play(); });
      const i = mkBtn('i', 'data-info', false, true);
      i.addEventListener('click', ev => { ev.stopPropagation(); other.info(); });
      const e = mkBtn('⏏', 'data-eject', false, true);
      e.addEventListener('click', ev => { ev.stopPropagation(); other.eject(); });
      buttons.append(p, i, e);
    }
    rebuild();
    item.append(cover, status, fileLine, buttons);
    return other;
  }

  async function removeOther(o: Other): Promise<void> {
    try { await store.remove(o.rec.id); } catch { /* in-memory / gone */ }
    const i = others.indexOf(o);
    if (i >= 0) others.splice(i, 1);
    o.item.remove();
    otherHead.style.display = others.length ? '' : 'none';
    fixSelection();
  }

  // --- navigation ----------------------------------------------------------------
  // selection order mirrors the DOM: your own cartridges, then the library
  const cards = (): Card[] => [...others, ...catalogTiles];
  let selected = -1;

  const select = (i: number): void => {
    const list = cards();
    if (!list.length) { selected = -1; return; }
    selected = ((i % list.length) + list.length) % list.length;
    list.forEach(c => { c.item.style.outline = 'none'; });
    const c = list[selected];
    c.item.style.outline = `3px solid ${GOLD}`;
    c.item.style.outlineOffset = '3px';
    c.item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  const fixSelection = (): void => {
    const list = cards();
    if (!list.length) { selected = -1; return; }
    if (selected >= list.length) selected = list.length - 1;
    if (selected >= 0) select(selected);
  };
  const flash = (item: HTMLElement): void => {
    item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    item.style.outline = `3px solid ${GOLD}`;
    item.style.outlineOffset = '3px';
    const list = cards();
    setTimeout(() => { if (list[selected]?.item !== item) item.style.outline = 'none'; }, 1400);
  };

  // --- routing a resolved cart to the right shelf --------------------------------
  // Every dump the visitor holds — fetched or dropped, verified or not — lands
  // on their own shelf. The library above is the browse surface; there is no
  // separate placeholder row to light up.
  function route(rec: CartRecord, resolved: ResolvedCart | null, announce: boolean): void {
    const o = buildOther(rec, resolved);
    others.push(o);
    otherRow.appendChild(o.item);
    otherHead.style.display = '';
    if (announce) flash(o.item);
  }

  // --- modals -----------------------------------------------------------------------
  function openModal(build: (scroller: HTMLElement, footer: HTMLElement, close: () => void) => void): void {
    modalDepth++;
    const backdrop = el('div', `position:fixed;inset:0;z-index:50;background:rgba(3,4,10,.86);
      display:flex;align-items:center;justify-content:center;padding:24px`);
    backdrop.setAttribute('data-modal', '');
    const card = el('div', `max-width:720px;width:100%;max-height:92vh;border-radius:12px;
      background:linear-gradient(#141838,#0c0f24);border:2px solid ${GOLD};
      box-shadow:0 24px 80px rgba(0,0,0,.8);font-size:14px;line-height:1.55;
      display:flex;flex-direction:column;overflow:hidden`);
    const scroller = el('div', 'overflow:auto;flex:1;min-height:0');
    const footer = el('div', `display:flex;gap:12px;flex-wrap:wrap;align-items:center;flex-shrink:0;
      padding:14px 30px;border-top:1px solid #232a58;background:rgba(10,12,30,.92);
      border-radius:0 0 10px 10px;box-shadow:0 -8px 24px rgba(0,0,0,.35)`);
    card.append(scroller, footer);
    backdrop.appendChild(card);
    const close = (): void => { backdrop.remove(); removeEventListener('keydown', onKey, true); modalDepth--; };
    const onKey = (ev: KeyboardEvent): void => { if (ev.key === 'Escape') { ev.stopPropagation(); ev.preventDefault(); close(); } };
    backdrop.addEventListener('click', ev => { if (ev.target === backdrop) close(); });
    addEventListener('keydown', onKey, true);
    build(scroller, footer, close);
    document.body.appendChild(backdrop);
  }

  const section = (host: HTMLElement, name: string): HTMLElement => {
    const s = el('div', 'margin-bottom:14px');
    const t = el('div', `font-weight:700;color:#9fb0ff;letter-spacing:1.5px;font-size:11px;
      margin-bottom:6px;border-bottom:1px solid #232a58;padding-bottom:4px`);
    t.textContent = name.toUpperCase();
    s.appendChild(t);
    host.appendChild(s);
    return s;
  };
  const row = (parent: HTMLElement, name: string, value: string, href?: string): void => {
    const r = el('div', 'display:flex;gap:10px;margin:2px 0');
    const l = el('span', 'color:#6b76b8;min-width:120px;flex-shrink:0');
    l.textContent = name;
    const v = href ? document.createElement('a') : el('span', 'color:#e8eaf6');
    v.style.cssText = href ? 'color:#b8c4ff;text-decoration:none' : 'color:#e8eaf6';
    if (href && v instanceof HTMLAnchorElement) v.href = href;
    v.textContent = value;
    r.append(l, v);
    parent.appendChild(r);
  };
  const linkedValues = (
    parent: HTMLElement,
    name: string,
    values: string[],
    facet: string,
  ): void => {
    const r = el('div', 'display:flex;gap:10px;margin:2px 0');
    const l = el('span', 'color:#6b76b8;min-width:120px;flex-shrink:0');
    l.textContent = name;
    const v = el('span', 'color:#e8eaf6');
    values.forEach((value, index) => {
      if (index) v.appendChild(document.createTextNode(', '));
      const a = document.createElement('a');
      a.href = browseUrl(facet, value);
      a.textContent = value;
      a.style.cssText = 'color:#b8c4ff;text-decoration:none';
      v.appendChild(a);
    });
    r.append(l, v);
    parent.appendChild(r);
  };
  const footerBtn = (text: string, solid: boolean, enabled = true): HTMLButtonElement => {
    const b = document.createElement('button');
    b.textContent = text;
    b.disabled = !enabled;
    b.style.cssText = `padding:9px 18px;border-radius:8px;font:inherit;font-weight:700;cursor:${enabled ? 'pointer' : 'default'};
      ${solid && enabled ? `background:${GOLD};color:#1b1b1b;border:2px solid ${GOLD}`
        : `background:transparent;border:2px solid #2a3160;color:${enabled ? '#9fb0ff' : '#555c86'}`}`;
    return b;
  };

  // status descriptor for the info-modal subheader
  const badge = (resolved: ResolvedCart | null): { text: string; color: string } => {
    if (!resolved) return { text: 'CANNOT READ — EJECT', color: '#e0504d' };
    if (resolved.tier === 'tested') return { text: `✓ VERIFIED · ${stripSet(resolved.meta?.description ?? '').toUpperCase()}`, color: '#5ecf7a' };
    if (resolved.tier === 'experimental') return { text: 'EXPERIMENTAL — UNTESTED', color: '#e8b64c' };
    return { text: (resolved.reason ?? 'MAPPER NOT SUPPORTED').toUpperCase(), color: '#8b93c4' };
  };

  // info for a physical cart (lit slot OR an "other" tile)
  function openInfoModal(rec: CartRecord, resolved: ResolvedCart | null, onEject: () => void): void {
    const meta = resolved?.meta;
    const b = badge(resolved);
    openModal((scroller, footer, close) => {
      const inner = el('div', 'padding:22px 30px 20px');
      scroller.appendChild(inner);
      const h = el('div', `font-size:24px;font-weight:800;color:${GOLD};line-height:1.2;margin-bottom:2px`);
      h.textContent = meta?.description ?? rec.name;
      const subh = el('div', `font-size:12px;font-weight:700;letter-spacing:.8px;color:${b.color};margin-bottom:14px`);
      subh.textContent = b.text + (resolved?.approx ? ' · PRG match, CHR differs' : '');
      inner.append(h, subh);

      if (meta) {
        const cat = section(inner, 'From the software list (MAME hash/nes.xml)');
        row(cat, 'Title', meta.description);
        if (meta.year) row(cat, 'Year', meta.year);
        if (meta.publisher) row(cat, 'Publisher', meta.publisher);
        if (meta.pcb) row(cat, 'PCB', meta.pcb);
        if (meta.mirroring) row(cat, 'Mirroring', meta.mirroring);
        row(cat, 'Softlist name', meta.name + (meta.cloneof ? ` (clone of ${meta.cloneof})` : ''));
      }

      const tech = section(inner, 'The cartridge');
      row(tech, 'File', `${rec.name} · ${(rec.size / 1024).toFixed(0)} KB`);
      row(tech, 'PRG ROM', `${(rec.ines.prgSize / 1024).toFixed(0)} KB · crc ${rec.prgCrc}`);
      row(tech, 'CHR', rec.ines.chrSize ? `${(rec.ines.chrSize / 1024).toFixed(0)} KB ROM · crc ${rec.chrCrc}` : 'CHR RAM');
      row(tech, 'Mapper', `${rec.ines.mapper}${resolved?.slot ? ` (${resolved.slot})` : ''}`);
      row(tech, 'Mirroring (header)', rec.ines.mirroring);
      row(tech, 'Battery', rec.ines.battery ? 'yes' : 'no');
      if (resolved?.reason) row(tech, 'Status', resolved.reason);

      const p = footerBtn('▶ Play', true, playable(resolved));
      p.setAttribute('data-play', '');
      p.addEventListener('click', () => { close(); bootCart(rec, resolved); });
      const e = footerBtn('⏏ Eject', false);
      e.setAttribute('data-eject', '');
      e.addEventListener('click', () => { close(); onEject(); });
      const c = footerBtn('Close', false);
      c.addEventListener('click', close);
      footer.append(p, e, c);
      p.focus();
    });
  }

  // info for an EMPTY verified slot — describes the target dump to hunt for
  function openTargetModal(catEntry: SoftEntry | undefined, name: string): void {
    const verified = support.games.includes(name) ||
      (catEntry?.cloneof !== undefined && support.games.includes(catEntry.cloneof));
    const playableBoard = catEntry !== undefined && support.slots.includes(catEntry.slot);
    openModal((scroller, footer, close) => {
      const inner = el('div', 'padding:22px 30px 20px');
      scroller.appendChild(inner);
      const h = el('div', `font-size:24px;font-weight:800;color:${GOLD};line-height:1.2;margin-bottom:2px`);
      h.textContent = stripSet(catEntry?.description ?? name.toUpperCase());
      const subh = el('div', 'font-size:12px;font-weight:700;letter-spacing:.8px;color:#8b93c4;margin-bottom:14px');
      subh.textContent = verified
        ? '◍ VERIFIED SLOT — DROP THIS DUMP TO PLAY'
        : playableBoard
          ? `◍ ${SLOT_PCB[catEntry.slot] ?? catEntry.slot.toUpperCase()} — PLAYABLE, NOT YET VERIFIED`
          : `◍ ${catEntry ? SLOT_PCB[catEntry.slot] ?? catEntry.slot.toUpperCase() : 'UNKNOWN BOARD'} — DISPLAY ONLY`;
      inner.append(h, subh);

      if (catEntry) {
        const cat = section(inner, verified ? 'The verified dump to drop in' : 'MAME software-list cartridge');
        row(cat, 'Title', catEntry.description);
        if (catEntry.year) row(cat, 'Year', catEntry.year);
        if (catEntry.publisher) row(cat, 'Publisher', catEntry.publisher);
        if (catEntry.pcb) row(cat, 'PCB', catEntry.pcb);
        if (catEntry.prg?.roms[0]) row(cat, 'PRG CRC', catEntry.prg.roms[0].crc);
        if (catEntry.chr?.roms[0]) row(cat, 'CHR CRC', catEntry.chr.roms[0].crc);
        row(cat, 'Softlist name', catEntry.name);
      }
      const note = el('div', 'color:#7f8ac9;font-size:13px;line-height:1.6');
      note.textContent = verified
        ? 'Bring your own legally obtained ROM dump. Drop the .nes (or a .zip containing it) into the slot above and this cartridge lights up — verified and ready to play.'
        : playableBoard
          ? 'Bring your own legally obtained ROM dump. This board is implemented, so a matching .nes file can be inserted and played as experimental until it is fully verified.'
          : 'This cartridge is part of the complete MAME software-list shelf. Its board is not implemented yet, so it remains a display piece for now.';
      inner.appendChild(note);

      const pick = footerBtn('◍ Insert a dump…', true);
      pick.addEventListener('click', () => { close(); picker.click(); });
      const c = footerBtn('Close', false);
      c.addEventListener('click', close);
      footer.append(pick, c);
      pick.focus();
    });
  }

  function openAboutModal(): void {
    openModal((scroller, footer, close) => {
      const inner = el('div', 'padding:22px 30px 20px');
      scroller.appendChild(inner);
      const h = el('div', `font-size:26px;font-weight:800;color:${GOLD};line-height:1.2;margin-bottom:2px`);
      h.textContent = (entry?.fullname ?? cfg.title).replace(/\s*\(.*\)$/, '');
      const subh = el('div', 'color:#7f8ac9;font-size:14px;margin-bottom:14px');
      if (entry?.manufacturer) {
        const manufacturer = document.createElement('a');
        manufacturer.href = browseUrl('manufacturer', entry.manufacturer);
        manufacturer.textContent = entry.manufacturer;
        manufacturer.style.cssText = 'color:inherit;text-decoration:none';
        subh.appendChild(manufacturer);
      }
      if (entry?.manufacturer && entry?.year) subh.appendChild(document.createTextNode(' · '));
      if (entry?.year) {
        const year = document.createElement('a');
        year.href = browseUrl('year', entry.year);
        year.textContent = entry.year;
        year.style.cssText = 'color:inherit;text-decoration:none';
        subh.appendChild(year);
      }
      inner.append(h, subh);

      // machine facts straight from the generated config (the knowledge graph)
      const hw = section(inner, 'The machine (extracted from the MAME driver)');
      for (const cpu of cfg.board.cpus) {
        const family = (cpu.type ?? 'z80').toUpperCase();
        row(hw, cpu === cfg.board.cpus[0] ? 'Processors' : '',
          `${family} "${cpu.tag}" @ ${(cpu.clock / 1e6).toFixed(3)} MHz`,
          browseUrl('cpu', family));
      }
      if (cfg.sound && cfg.sound.kind !== 'none') {
        const sound = `${cfg.sound.kind.toUpperCase()}${cfg.sound.chips ? ` × ${cfg.sound.chips}` : ''}`;
        row(hw, 'Sound', sound + (cfg.sound.clock ? ` @ ${(cfg.sound.clock / 1e6).toFixed(3)} MHz` : ''),
          browseUrl('sound', sound));
      }
      const sc = cfg.board.screen;
      const screen = `${sc.width}×${sc.height} @ ${sc.refresh.toFixed(2)} Hz${sc.rotate ? ` · rotated ${sc.rotate}°` : ''}`;
      row(hw, 'Screen', screen, browseUrl('screen', screen));
      if (cfg.cart) {
        row(hw, 'Cartridge slot', `${cfg.cart.interface} · mappers: ${cfg.cart.slots.join(', ') || 'none yet'}`);
        row(hw, 'Verified titles', cfg.cart.games.join(', ') || 'none yet');
      }

      const ppl = section(inner, 'The MAME driver — the people who reverse-engineered it');
      if (entry?.driverFile) row(ppl, 'Driver source', entry.driverFile,
        browseUrl('driver', entry.driverFile));
      if (entry?.copyrightHolders) row(ppl, 'Written by', entry.copyrightHolders,
        browseUrl('written-by', entry.copyrightHolders));
      if (entry?.license) row(ppl, 'License', entry.license,
        browseUrl('license', entry.license));
      if (entry?.gitHistory) {
        const gh = entry.gitHistory;
        row(ppl, 'History', `${gh.commits} commits by ${gh.contributors} contributors, ${gh.firstCommit.slice(0, 4)}–${gh.lastCommit.slice(0, 4)}`);
        linkedValues(ppl, 'Top contributors', gh.topAuthors, 'author');
      }

      // the console's story — same "- CHAPTER -" split as the menu's modal
      if (entry?.hasHistory) {
        const story = section(inner, 'The story');
        void fetch(`../${encodeURIComponent(cfg.game)}/history.txt`).then(r => r.ok ? r.text() : '').then(t => {
          if (!t) { story.remove(); return; }
          const parts = t.split(/^- ([A-Z][A-Z0-9 .&''/-]{2,}) -\s*$/m);
          const intro = el('div', 'white-space:pre-wrap;color:#c9cde8;font-size:14.5px');
          intro.textContent = parts[0].trim();
          story.appendChild(intro);
          for (let i = 1; i < parts.length; i += 2) {
            const name = parts[i].trim();
            const text = (parts[i + 1] ?? '').trim();
            if (!text) continue;
            const chap = el('details', 'margin-top:10px;border:1px solid #232a58;border-radius:8px;overflow:hidden');
            const sum2 = document.createElement('summary');
            sum2.style.cssText = `cursor:pointer;padding:8px 14px;font-weight:700;letter-spacing:1.5px;
              font-size:11px;color:${GOLD};background:#171c40;list-style:none;user-select:none`;
            sum2.textContent = `◆ ${name}`;
            const bd = el('div', 'white-space:pre-wrap;color:#c9cde8;padding:10px 14px');
            bd.textContent = text;
            chap.append(sum2, bd);
            story.appendChild(chap);
          }
          const attr = el('div', 'color:#4b5384;font-size:11px;margin-top:8px');
          attr.textContent = entry.historyCredit ??
            'Story courtesy of Gaming History (arcade-history.com)';
          story.appendChild(attr);
        });
      }

      const dossier = document.createElement('a');
      dossier.href = `g/${encodeURIComponent(cfg.game)}/dossier/`;
      dossier.textContent = 'Full dossier';
      dossier.style.cssText = `padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;
        border:2px solid #2a3160;color:#9fb0ff`;
      const browse = document.createElement('a');
      browse.href = 'browse/';
      browse.textContent = 'Browse the archive';
      browse.style.cssText = dossier.style.cssText;
      const c = footerBtn('Close', true);
      c.addEventListener('click', close);
      footer.append(dossier, browse, c);
      c.focus();
    });
  }

  // --- cart ingestion ------------------------------------------------------------------
  async function shelve(name: string, bytes: Uint8Array): Promise<void> {
    const ines = parseINes(bytes);
    if (!ines) return; // callers pre-check; belt and braces
    const resolved = identify(ines, catalog, support);
    const id = `${cfg.game}:${hex8(crc32(bytes))}`;
    // dedupe against a cartridge already on the shelf
    const existing = others.find(o => o.rec.id === id);
    if (existing) { flash(existing.item); return; }
    const rec: CartRecord = {
      id,
      console: cfg.game,
      name,
      bytes: bytes.slice().buffer,
      size: bytes.length,
      addedAt: Date.now(),
      ines: { mapper: ines.mapper, prgSize: ines.prgSize, chrSize: ines.chrSize, mirroring: ines.mirroring, battery: ines.battery },
      prgCrc: resolved.prgCrc,
      chrCrc: resolved.chrCrc,
    };
    try {
      await store.add(rec);
    } catch {
      // quota / IDB write failure: keep it on the shelf in memory only
      toast(`${name}: not saved — playable this session`);
    }
    route(rec, resolved, true);
    if (selected < 0) select(0);
  }

  /**
   * Shelve one .nes or .zip payload, whoever produced it: the drop zone, the
   * file picker or a cartridge fetched from the mirror bucket. Returns false
   * when nothing on the shelf changed, so callers can explain why.
   */
  async function ingest(name: string, bytes: Uint8Array): Promise<boolean> {
    if (bytes.length > MAX_CART) { toast(`${name}: bigger than 8 MiB — not a cartridge`); return false; }
    if (name.toLowerCase().endsWith('.zip') || (bytes[0] === 0x50 && bytes[1] === 0x4b)) {
      let zentries: Map<string, Uint8Array>;
      try { zentries = await readZip(bytes); }
      catch { toast(`${name} isn't a readable zip`); return false; }
      let shelved = 0;
      for (const [zname, data] of zentries) {
        if (data.length > MAX_CART) continue;
        if (parseINes(data)) { await shelve(zname.split('/').pop() ?? zname, data); shelved++; }
      }
      if (shelved) return true;
      // No whole .nes inside: this may be a MAME software-list set, whose
      // entries are the cart's individual chips. Rebuild the image from them.
      const set = inesFromSoftlistSet(zentries, catalog, MAPPER_SLOTS);
      if (set) {
        await shelve(`${set.entry.name}.nes`, set.bytes);
        return true;
      }
      toast(`${name}: no iNES cartridge or known chip set inside`);
      return false;
    }
    if (parseINes(bytes)) { await shelve(name, bytes); return true; }
    toast(`${name} isn't an iNES cartridge (.nes)`);
    return false;
  }

  async function handleFiles(files: File[]): Promise<void> {
    for (const f of files) {
      if (f.size > MAX_CART) { toast(`${f.name}: bigger than 8 MiB — not a cartridge`); continue; }
      slotBusy(f.name);
      let bytes: Uint8Array;
      try { bytes = new Uint8Array(await f.arrayBuffer()); }
      catch { toast(`${f.name}: could not read the file`); continue; }
      await ingest(f.name, bytes);
    }
    slotIdle();
  }


  // --- fetch feedback ---------------------------------------------------------------
  // A fetch is a network round trip against a mirror, so the tile has to say so
  // for itself: the cartridge lifts out of the shelf and a scan line sweeps it.
  // On success a ghost of the cart flies up to YOUR CARTRIDGES, which is where
  // it actually landed. All of it is skipped for prefers-reduced-motion.
  const stillMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  interface CartFetchAnim { done: (target: HTMLElement | null) => void; fail: () => void }

  function beginCartFetch(cover: HTMLElement, label: HTMLElement): CartFetchAnim {
    const restoreLabel = label.textContent;
    const restoreColor = label.style.color;
    const restoreShadow = cover.style.boxShadow;
    label.textContent = '⌕ SEARCHING THE WEB…';
    label.style.color = GOLD;
    cover.style.transition = 'transform .28s ease, box-shadow .28s ease';
    if (!stillMotion) {
      cover.style.transform = 'perspective(700px) translateY(-16px) rotateY(0)';
      cover.style.boxShadow = `0 0 34px ${GOLD}66, 0 22px 30px rgba(0,0,0,.75)`;
    }
    // sweeping scan line over the cartridge art
    const scan = el('div', `position:absolute;left:0;right:0;top:0;height:34%;pointer-events:none;
      border-radius:12px;background:linear-gradient(180deg,transparent,${GOLD}2e,transparent)`);
    if (!stillMotion) {
      cover.style.position = cover.style.position || 'relative';
      cover.appendChild(scan);
      scan.animate(
        [{ transform: 'translateY(-40%)' }, { transform: 'translateY(300%)' }],
        { duration: 900, iterations: Infinity, easing: 'ease-in-out' },
      );
    }

    const settle = (): void => {
      scan.remove();
      label.textContent = restoreLabel;
      label.style.color = restoreColor;
      cover.style.transform = 'perspective(700px) rotateY(-2deg)';
      cover.style.boxShadow = restoreShadow;
    };

    return {
      done: target => {
        scan.remove();
        if (target && !stillMotion) flyToShelf(cover, target);
        settle();
      },
      fail: () => {
        settle();
        cover.style.boxShadow = '0 0 26px rgba(255,90,90,.5)';
        setTimeout(() => { cover.style.boxShadow = restoreShadow; }, 900);
      },
    };
  }

  /** FLIP-style ghost: the cartridge visibly travels to where it landed. */
  function flyToShelf(from: HTMLElement, to: HTMLElement): void {
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    if (!a.width || !b.width) return;
    const ghost = from.cloneNode(true) as HTMLElement;
    ghost.style.cssText += `;position:fixed;left:${a.left}px;top:${a.top}px;width:${a.width}px;
      height:${a.height}px;margin:0;z-index:90;pointer-events:none;opacity:.95;
      transition:transform .6s cubic-bezier(.2,.75,.2,1),opacity .6s ease`;
    document.body.appendChild(ghost);
    requestAnimationFrame(() => {
      ghost.style.transform =
        `translate(${b.left - a.left}px,${b.top - a.top}px) scale(${Math.min(1, b.width / a.width)})`;
      ghost.style.opacity = '.15';
    });
    setTimeout(() => ghost.remove(), 700);
  }

  /**
   * Pull a cartridge the bucket already holds instead of asking for a drop.
   * The dump lands in the visitor's own store exactly as a dropped file would,
   * so the fetch happens once per cartridge rather than once per visit.
   */
  const fetching = new Set<string>();
  async function fetchCart(
    cart: CartAvailability,
    title: string,
    anim?: CartFetchAnim,
  ): Promise<void> {
    if (fetching.has(cart.file)) { anim?.fail(); return; }
    fetching.add(cart.file);
    slotBusy(title);
    try {
      const bytes = await fetchRomBytes(`${setKey}/${cart.file}`);
      if (!bytes) {
        anim?.fail();
        toast(`${title}: no web source had it — drop your own dump instead`);
        return;
      }
      const before = others.length;
      const shelved = await ingest(cart.file.split('/').pop() ?? cart.file, bytes);
      if (!shelved) { anim?.fail(); return; }
      // the cart flies to the tile it actually became
      anim?.done(others[before]?.item ?? others.at(-1)?.item ?? null);
    } finally {
      fetching.delete(cart.file);
      slotIdle();
    }
  }

  const picker = document.createElement('input');
  picker.type = 'file';
  picker.accept = '.nes,.zip';
  picker.multiple = true;
  picker.addEventListener('change', () => {
    const fs = [...(picker.files ?? [])];
    picker.value = '';
    if (fs.length) void handleFiles(fs);
  });
  slot.addEventListener('click', () => picker.click());

  // dragenter/leave fire on every child crossed — depth-count (shell.ts pattern)
  let depth = 0;
  addEventListener('dragover', ev => { if (inRoom) ev.preventDefault(); });
  addEventListener('dragenter', ev => { if (!inRoom) return; ev.preventDefault(); if (++depth === 1) slotArmed(); });
  addEventListener('dragleave', () => { if (!inRoom) return; if (--depth <= 0) { depth = 0; slotIdle(); } });
  addEventListener('drop', ev => {
    if (!inRoom) return;
    ev.preventDefault();
    depth = 0;
    slotIdle();
    const fs = [...(ev.dataTransfer?.files ?? [])];
    if (fs.length) void handleFiles(fs);
  });

  // --- keyboard -----------------------------------------------------------------------
  addEventListener('keydown', ev => {
    if (!inRoom || modalDepth > 0) return;
    const perRow = Math.max(1, Math.floor((board.clientWidth) / (CART_W + 26)));
    const list = cards();
    switch (ev.key) {
      case 'ArrowRight': select(selected + 1); ev.preventDefault(); break;
      case 'ArrowLeft': select(selected - 1); ev.preventDefault(); break;
      case 'ArrowDown': select(selected < 0 ? 0 : selected + perRow); ev.preventDefault(); break;
      case 'ArrowUp': select(selected < 0 ? 0 : selected - perRow); ev.preventDefault(); break;
      case 'Enter': if (list[selected]) list[selected].play(); break;
      case 'i': case 'I': if (list[selected]) list[selected].info(); break;
      case 'e': case 'E': if (list[selected]) list[selected].eject(); break;
      case 'Escape': location.href = './?tab=consoles'; break;
    }
  });

  // --- render the library, then load the visitor's own cartridges ---------------------
  renderCatalog(true);
  const recs = await store.list(cfg.game);
  for (const rec of recs) route(rec, resolveRec(rec, catalog, support), false);
  select(0);
  // The room is interactive at this point; the mirror index lands whenever it
  // lands, and a failed fetch simply leaves the library as the catalogue.
  void availabilityPromise.then(mergeAvailability, () => {});
}
