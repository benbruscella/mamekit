// Software room (issue #101): the shelf behind a computer tile on the boot
// menu. A console has one cartridge list; a computer's software arrives on
// several media -- the C64 driver declares cartridge, cassette, two floppy and
// a quickload list -- so this room is one shelf per generated software list,
// browsed by medium.
//
// Same video-store aesthetic as console.ts (palette copied, not imported).
// Nothing here is machine-specific: which shelves exist, what each holds, the
// image extensions it accepts and whether the generated board can mount the
// medium all come from config.json's `software` block, which the generator
// derived from the driver's SOFTWARE_LIST declarations, the hash/*.xml lists
// and the board's own device composition.
//
// A set the visitor fetches or drops is kept in their own browser exactly as
// a console cartridge is (cartstore.ts), as the zip it arrived in, so a
// two-sided tape stays one thing. Playing it hands runShell() the images the
// set holds; the shell's own transport controls mount them at power-on and
// the machine's firmware is asked for the way any romset is.

import { runShell, type MountedImage, type ShellConfig, type SoftwareShelf } from './shell.ts';
import { openCartStore, type CartRecord } from './cartstore.ts';
import { readZip, crc32 } from './zip.ts';
import { cartAvailability, fetchRomBytes, type CartAvailability } from './rom-source.ts';
import { wrapCartTitle } from './console.ts';

const GOLD = '#f2c200';
const MAX_SET = 16 * 1024 * 1024; // a disk image set; no tape or cart is near it

/** the generated catalogue, as the room reads it (src/kg/softlist.ts writes it) */
export interface SoftRom { size: number; crc: string; offset: number; file?: string }
export interface SoftEntry {
  name: string;
  description: string;
  year: string;
  publisher: string;
  cloneof?: string;
  slot: string;
  prg: { size: number; roms: SoftRom[] };
  supported?: 'no' | 'partial';
  parts?: number;
}
export interface SoftCatalog {
  list: string;
  description: string;
  interface: string;
  entries: SoftEntry[];
  crcIndex: Record<string, number[]>;
}

/** games.json manifest entry (the fields the room shows in the header) */
interface MenuEntry {
  game: string;
  fullname: string;
  year: string;
  manufacturer: string;
  supported?: boolean;
  /** a compiled but unfinished machine the development build exposes */
  preview?: boolean;
  driverFile?: string;
}

const hex8 = (n: number) => n.toString(16).padStart(8, '0');
const esc = (s: string) => s.replace(/[&<>]/g, c => (c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'));
const stripSet = (s: string) => s.replace(/\s*\(.*\)$/, '');

function el(tag: string, css: string): HTMLElement {
  const e = document.createElement(tag);
  e.style.cssText = css;
  return e;
}

function artHash(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
  return hash >>> 0;
}

/** The medium's noun, for labels: "cassettes", "cartridges", "disks". */
export function mediumNoun(kind: SoftwareShelf['kind'], count = 2): string {
  const noun = kind === 'cassette' ? 'cassette'
    : kind === 'floppy' ? 'disk'
      : kind === 'quickload' ? 'program'
        : 'cartridge';
  return count === 1 ? noun : `${noun}s`;
}

// --- inline-SVG media artwork ---------------------------------------------------
// One 200x250 tile for every medium so a mixed shelf lines up; the drawing
// inside is the medium's own silhouette. None carries a wordmark, logo or
// likeness of any product -- they are the industrial features that make a
// tape, a disk and a cartridge readable at 200px.

export type MediaState = 'catalog' | 'available' | 'owned' | 'display';

const TILE_W = 200;
const TILE_H = 250;

interface MediaArt {
  title: string;
  sub: string;
  state: MediaState;
  /** deterministic label art key: the set's short name */
  artKey: string;
  /** the zip this set is, or would be */
  code?: string;
  /** MAME's own verdict, when the list marks the set */
  supported?: 'no' | 'partial';
  /** number of sides / disks, when more than one */
  parts?: number;
}

function labelText(o: MediaArt, x: number, y: number, wrap: number, size: number, dim: boolean): string {
  const lines = wrapCartTitle(o.title, wrap);
  const titleColor = dim ? '#8b8b86' : '#181818';
  const subColor = dim ? '#7a7a75' : '#5f5744';
  const title = lines.map((line, index) =>
    `<text x="${x}" y="${y + index * (size + 3)}" font-family="ui-sans-serif,system-ui,sans-serif" font-size="${size}" font-weight="800" fill="${titleColor}">${esc(line)}</text>`).join('');
  const sub = `<text x="${x}" y="${y + lines.length * (size + 3) + 1}" font-family="ui-sans-serif,system-ui,sans-serif" font-size="9" font-weight="600" fill="${subColor}">${esc(o.sub.length > 26 ? `${o.sub.slice(0, 25).trimEnd()}…` : o.sub)}</text>`;
  return title + sub;
}

function stripeFor(o: MediaArt, hue: number): string {
  return o.state === 'owned' ? '#2f6bd8'
    : o.state === 'display' ? '#8f8f8f'
      : `hsl(${hue} 62% 46%)`;
}

/** A compact cassette: shell, window with two reels, label across the top. */
function cassetteSvg(o: MediaArt, hue: number, dim: boolean): string {
  const stripe = stripeFor(o, hue);
  const body = dim ? '#3a3a3f' : '#2b2b30';
  return `
    <rect x="8" y="60" width="184" height="128" rx="8" fill="${body}" stroke="#101014" stroke-width="2"/>
    <rect x="12" y="64" width="176" height="120" rx="6" fill="none" stroke="rgba(255,255,255,.08)"/>
    <!-- label, printed on the shell's upper half -->
    <rect data-label-bg x="20" y="70" width="160" height="56" rx="3" fill="#f4f1e7"/>
    <rect x="20" y="70" width="160" height="8" fill="${stripe}"/>
    ${labelText(o, 26, 96, 22, 11, dim)}
    <!-- window and reels -->
    <rect x="42" y="134" width="116" height="34" rx="6" fill="#111318" stroke="#0a0b0e"/>
    <circle cx="72" cy="151" r="12" fill="#e9e6dd"/><circle cx="72" cy="151" r="5" fill="#2b2b30"/>
    <circle cx="128" cy="151" r="12" fill="#e9e6dd"/><circle cx="128" cy="151" r="5" fill="#2b2b30"/>
    <rect x="86" y="147" width="28" height="8" rx="2" fill="#6d5f3a"/>
    <!-- screw holes and the capstan cut-outs on the base edge -->
    <circle cx="20" cy="178" r="2.2" fill="#0d0d10"/><circle cx="180" cy="178" r="2.2" fill="#0d0d10"/>
    <rect x="60" y="180" width="8" height="8" fill="#0d0d10"/><rect x="132" y="180" width="8" height="8" fill="#0d0d10"/>
    ${o.parts && o.parts > 1 ? `<text x="176" y="180" text-anchor="end" font-family="ui-monospace,monospace" font-size="8" font-weight="800" fill="#c9c9d1">×${o.parts}</text>` : ''}`;
}

/** A 5.25" floppy: black sleeve, hub ring, read window, label at the top. */
function floppySvg(o: MediaArt, hue: number, dim: boolean): string {
  const stripe = stripeFor(o, hue);
  const body = dim ? '#2c2c31' : '#1c1c21';
  return `
    <rect x="12" y="32" width="176" height="176" rx="4" fill="${body}" stroke="#0a0a0d" stroke-width="2"/>
    <!-- label -->
    <rect data-label-bg x="24" y="42" width="152" height="62" rx="2" fill="#f4f1e7"/>
    <rect x="24" y="42" width="152" height="8" fill="${stripe}"/>
    ${labelText(o, 30, 68, 21, 11, dim)}
    <!-- hub -->
    <circle cx="100" cy="150" r="28" fill="#0c0c0f"/>
    <circle cx="100" cy="150" r="16" fill="#3a3a41"/>
    <circle cx="100" cy="150" r="5" fill="#0c0c0f"/>
    <!-- head window and the write-protect notch -->
    <rect x="90" y="182" width="20" height="24" rx="3" fill="#3a3a41"/>
    <rect x="182" y="120" width="8" height="14" fill="#0b0b0e"/>
    <line x1="100" y1="150" x2="100" y2="150" stroke="none"/>
    ${o.parts && o.parts > 1 ? `<text x="172" y="200" text-anchor="end" font-family="ui-monospace,monospace" font-size="8" font-weight="800" fill="#c9c9d1">×${o.parts}</text>` : ''}`;
}

/** A computer cartridge: wide flat shell with a full-face label. */
function cartridgeSvg(o: MediaArt, hue: number, dim: boolean): string {
  const stripe = stripeFor(o, hue);
  const body = dim ? '#3b3a38' : '#2a2927';
  return `
    <path d="M22 44 h156 a6 6 0 0 1 6 6 v112 a6 6 0 0 1 -6 6 h-18 l-6 14 h-108 l-6 -14 h-18 a6 6 0 0 1 -6 -6 v-112 a6 6 0 0 1 6 -6 z" fill="${body}" stroke="#0e0d0c" stroke-width="2"/>
    <rect data-label-bg x="34" y="56" width="132" height="98" rx="3" fill="#f4f1e7"/>
    <rect x="34" y="56" width="132" height="10" fill="${stripe}"/>
    ${labelText(o, 40, 86, 18, 12, dim)}
    <!-- edge connector -->
    <rect x="52" y="180" width="96" height="6" fill="#b89a3c"/>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="${54 + i * 8}" y="180" width="1.2" height="6" fill="#6a5720"/>`).join('')}`;
}

/** A quickload: the program listing itself, a sheet with a fanfold edge. */
function listingSvg(o: MediaArt, hue: number, dim: boolean): string {
  const stripe = stripeFor(o, hue);
  return `
    <rect x="30" y="34" width="140" height="180" rx="3" fill="${dim ? '#d9d7cf' : '#f4f1e7'}" stroke="#a9a390"/>
    ${Array.from({ length: 9 }, (_, i) => `<circle cx="38" cy="${46 + i * 20}" r="2.2" fill="#b8b3a2"/><circle cx="162" cy="${46 + i * 20}" r="2.2" fill="#b8b3a2"/>`).join('')}
    <rect data-label-bg x="48" y="44" width="104" height="40" fill="none"/>
    <rect x="48" y="44" width="104" height="6" fill="${stripe}"/>
    ${labelText(o, 50, 66, 16, 10, dim)}
    ${Array.from({ length: 8 }, (_, i) => `<rect x="50" y="${100 + i * 13}" width="${60 + ((artHash(o.artKey + i) >>> 4) % 40)}" height="4" rx="1" fill="#9a9483"/>`).join('')}`;
}

/** The drawn tile for one set, by the medium its shelf holds. */
export function mediaSvg(kind: SoftwareShelf['kind'], o: MediaArt): string {
  const hash = artHash(o.artKey || o.title);
  const hue = hash % 360;
  const dim = o.state === 'display';
  const inner = kind === 'cassette' ? cassetteSvg(o, hue, dim)
    : kind === 'floppy' ? floppySvg(o, hue, dim)
      : kind === 'quickload' ? listingSvg(o, hue, dim)
        : cartridgeSvg(o, hue, dim);
  const seal = o.state === 'available' || o.state === 'owned'
    ? `<circle cx="178" cy="34" r="12" fill="${o.state === 'owned' ? '#2f6bd8' : '#37a24b'}" stroke="#fff" stroke-width="2"/>
       <text x="178" y="39" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-size="14" font-weight="900" fill="#fff">✓</text>`
    : '';
  const verdict = o.supported
    ? `<rect x="14" y="222" width="${o.supported === 'no' ? 96 : 84}" height="16" rx="3" fill="${o.supported === 'no' ? '#7a2a2a' : '#6b5520'}"/>
       <text x="${o.supported === 'no' ? 62 : 56}" y="234" text-anchor="middle" font-family="ui-monospace,monospace" font-size="9" font-weight="800" fill="#f4e6e6" letter-spacing=".6">${o.supported === 'no' ? 'MAME: NOT WORKING' : 'MAME: PARTIAL'}</text>`
    : '';
  const code = o.code
    ? `<text x="186" y="240" text-anchor="end" font-family="ui-monospace,monospace" font-size="8.5" font-weight="700" fill="#8a8fb0">${esc(o.code.length > 26 ? `…${o.code.slice(-25)}` : o.code)}</text>`
    : '';
  return `<svg viewBox="0 0 ${TILE_W} ${TILE_H}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" data-medium="${kind}">
    ${inner}${seal}${verdict}${code}
  </svg>`;
}

// --- identification ----------------------------------------------------------------

export interface IdentifiedSet {
  list: string;
  entry: SoftEntry;
  /** how many of the set's images the zip actually held */
  matched: number;
}

/**
 * Which catalogued set a zip's members are, by crc. A set is the software
 * list's own unit: every side of a tape or disk of a game is a member of one
 * zip, matched chip for chip the way a console cartridge set is. The catalog
 * whose entry matches the most members wins; a member matching nothing is
 * fine -- sets carry notes and manuals too.
 */
export function identifySet(
  members: Map<string, Uint8Array>,
  catalogs: Iterable<SoftCatalog>,
): IdentifiedSet | null {
  const crcs = new Set([...members.values()].map(bytes => hex8(crc32(bytes))));
  let best: IdentifiedSet | null = null;
  for (const catalog of catalogs) {
    const hits = new Map<number, number>();
    for (const crc of crcs) {
      for (const index of catalog.crcIndex[crc] ?? []) hits.set(index, (hits.get(index) ?? 0) + 1);
    }
    // crcIndex only names the first image; count the rest by walking the entry
    for (const [index] of hits) {
      const entry = catalog.entries[index]!;
      const matched = entry.prg.roms.filter(rom => crcs.has(rom.crc)).length;
      if (!best || matched > best.matched) best = { list: catalog.list, entry, matched };
    }
  }
  return best;
}

/**
 * The images inside a set the shell can mount, by the shelf's extensions. The
 * list's own order is kept where the catalog names the files, so side 1 is
 * offered before side 2.
 */
export function mountableImages(
  members: Map<string, Uint8Array>,
  extensions: readonly string[],
  entry?: SoftEntry,
): MountedImage[] {
  const accepted = new Set(extensions.map(extension => extension.toLowerCase()));
  const images = [...members.entries()]
    .filter(([name, bytes]) => bytes.length > 0 && accepted.has(name.split('.').pop()!.toLowerCase()))
    .map(([name, bytes]) => ({ name: name.split('/').pop() ?? name, bytes }));
  if (!entry) return images;
  const order = new Map(entry.prg.roms.map((rom, index) => [rom.file?.toLowerCase(), index]));
  return images.sort((a, b) =>
    (order.get(a.name.toLowerCase()) ?? 1e9) - (order.get(b.name.toLowerCase()) ?? 1e9));
}

// --- the room ---------------------------------------------------------------------------

export async function runSoftwareRoom(cfg: ShellConfig): Promise<void> {
  document.title = cfg.title;
  addEventListener('popstate', () => location.reload());
  const shelves = cfg.software?.shelves ?? [];
  const dumpsKey = cfg.software?.dumpsKey ?? cfg.dataPath.replace(/^games\//, '');
  const firmware = cfg.roms.some(spec => spec.loads.length > 0);

  const [store, entry] = await Promise.all([openCartStore(), fetchOwnEntry(cfg)]);
  // A candidate machine is exposed by the development build as a preview:
  // the menu opens it, so the room plays it. Only a build whose closure lacks
  // the board is barred.
  const coreSupported = entry?.supported !== false || entry?.preview === true;
  const catalogs = new Map<string, SoftCatalog>();
  const availability = new Map<string, Map<string, CartAvailability>>();
  const loading = new Map<string, Promise<void>>();
  let inRoom = true;
  let modalDepth = 0;

  const shelfFor = (list: string | undefined): SoftwareShelf | undefined =>
    shelves.find(shelf => shelf.list === list);

  /** Fetch a shelf's catalogue and availability once; the room is usable before either lands. */
  function loadShelf(shelf: SoftwareShelf): Promise<void> {
    let pending = loading.get(shelf.list);
    if (pending) return pending;
    pending = (async () => {
      try {
        const r = await fetch(`../${cfg.dataPath}/${shelf.catalogUrl}`);
        if (r.ok) catalogs.set(shelf.list, await r.json() as SoftCatalog);
      } catch { /* the shelf stays empty and says so */ }
      if (shelf.availableUrl) {
        try {
          const r = await fetch(`../${cfg.dataPath}/${shelf.availableUrl}`);
          const byName = new Map<string, CartAvailability>();
          for (const cart of cartAvailability(r.ok ? await r.json() : null)) {
            if (cart.tier === 'verified' && cart.name) byName.set(cart.name, cart);
          }
          availability.set(shelf.list, byName);
        } catch { /* no availability: every tile asks for a drop */ }
      }
    })();
    loading.set(shelf.list, pending);
    return pending;
  }

  // --- DOM ------------------------------------------------------------------------------
  document.body.textContent = '';
  document.body.style.cssText = 'margin:0;background:#05060f;color:#e8eaf6;font:14px/1.5 ui-sans-serif,system-ui,sans-serif;min-height:100vh';
  const root = el('div', 'padding:0 0 60px');
  root.setAttribute('data-software-room', '');
  document.body.appendChild(root);

  const header = el('div', `padding:26px 36px 18px;display:flex;flex-wrap:wrap;gap:18px 28px;align-items:flex-end;
    justify-content:space-between;background:linear-gradient(180deg,#0f1330,#05060f)`);
  const heading = el('div', '');
  const h1 = el('div', `font-size:30px;font-weight:900;color:${GOLD};line-height:1.1`);
  h1.textContent = (entry?.fullname ?? cfg.title).replace(/\s*\(.*\)$/, '');
  const sub = el('div', 'color:#8f99d2;font-size:13px;margin-top:4px');
  sub.textContent = [entry?.manufacturer, entry?.year, cfg.title.replace(/^.*\((\w+)\)\s*\(.*$/, '$1')]
    .filter(Boolean).join(' · ');
  heading.append(h1, sub);
  const actions = el('div', 'display:flex;gap:10px;flex-wrap:wrap;align-items:center');
  const powerBtn = button('⏻ Power on', true, coreSupported);
  powerBtn.setAttribute('data-power-on', '');
  powerBtn.title = firmware
    ? `Boot the machine with nothing loaded — it asks for its own ${cfg.game}.zip firmware first`
    : 'Boot the machine with nothing loaded';
  powerBtn.addEventListener('click', () => boot(null));
  const insertBtn = button('◍ Insert your own…', false, true);
  insertBtn.title = `Drop a set zip or a bare image (${shelves.flatMap(s => s.extensions).map(e => `.${e}`).join(' ')}) anywhere on this page`;
  insertBtn.addEventListener('click', () => picker.click());
  const dossier = document.createElement('a');
  dossier.href = `g/${encodeURIComponent(cfg.game)}/dossier/`;
  dossier.textContent = 'Dossier';
  dossier.style.cssText = 'padding:8px 16px;border-radius:8px;font-weight:700;text-decoration:none;border:2px solid #2a3160;color:#9fb0ff';
  const back = document.createElement('a');
  back.href = './?tab=computers';
  back.textContent = '← All computers';
  back.style.cssText = dossier.style.cssText;
  actions.append(powerBtn, insertBtn, dossier, back);
  header.append(heading, actions);
  root.appendChild(header);

  const notes = el('div', 'padding:0 36px;color:#7f8ac9;font-size:12.5px;line-height:1.6;max-width:1280px;margin:0 auto;box-sizing:border-box');
  notes.textContent = firmware
    ? `Software is never distributed with mamekit. A title you fetch or drop is kept only in this browser; playing it boots the machine, which first asks for its own ${cfg.game}.zip firmware (dropped, or found by the web search).`
    : 'Software is never distributed with mamekit. A title you fetch or drop is kept only in this browser.';
  root.appendChild(notes);

  const board = el('div', 'max-width:1280px;margin:0 auto;padding:0 36px;box-sizing:border-box');
  root.appendChild(board);

  const rowHead = (text: string): HTMLElement => {
    const h = el('div', `display:flex;align-items:center;gap:14px;color:#7f8ac9;font-size:11px;
      font-weight:700;letter-spacing:2px;margin:34px 0 4px`);
    const lab = el('span', 'flex:0 0 auto');
    lab.textContent = text;
    const rule = el('span', 'flex:1;height:1px;background:linear-gradient(90deg,#2a3160,transparent)');
    h.append(lab, rule);
    return h;
  };

  // the visitor's own sets, above the library, hidden until the first arrives
  const ownHead = rowHead('YOUR SHELF');
  ownHead.style.display = 'none';
  const ownRow = el('div', 'display:flex;flex-wrap:wrap;gap:26px 22px;justify-content:center;padding:8px 0 0');
  ownRow.setAttribute('data-own-shelf', '');
  board.append(ownHead, ownRow);

  board.appendChild(rowHead('THE SOFTWARE LIBRARY'));
  const tabs = el('div', 'display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 12px');
  tabs.setAttribute('role', 'tablist');
  board.appendChild(tabs);
  const filters = el('div', `display:flex;align-items:center;gap:12px;flex-wrap:wrap;
    padding:14px 16px;margin:0 0 18px;border:1px solid #252d62;border-radius:12px;
    background:linear-gradient(135deg,rgba(24,30,67,.96),rgba(9,12,29,.96))`);
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'Search titles, publishers, years…';
  search.setAttribute('data-software-search', '');
  search.style.cssText = `flex:1 1 300px;min-width:190px;padding:11px 14px;border-radius:8px;
    border:2px solid #303a78;background:#080b1d;color:#f4f5ff;font:inherit;outline:none`;
  const scope = document.createElement('select');
  scope.setAttribute('data-software-filter', '');
  scope.style.cssText = `padding:11px 14px;border-radius:8px;border:2px solid #303a78;
    background:#111633;color:#d8dcff;font:inherit;cursor:pointer`;
  const count = el('div', 'color:#8f99d2;font:12px ui-monospace,monospace;white-space:nowrap');
  count.setAttribute('data-library-count', '');
  filters.append(search, scope, count);
  board.appendChild(filters);
  const stage = el('div', `position:relative;padding:22px 18px 32px;border-radius:14px;
    background:linear-gradient(90deg,#080913,#101329 50%,#080913);
    border:1px solid #202650;box-shadow:inset 0 12px 30px rgba(0,0,0,.65)`);
  const grid = el('div', `display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));
    align-items:start;justify-items:center;gap:26px 18px;position:relative;z-index:1`);
  grid.setAttribute('data-library-shelf', '');
  const lip = el('div', `position:absolute;left:8px;right:8px;bottom:10px;height:18px;border-radius:4px;
    background:linear-gradient(#575268,#211f2c 42%,#090a10 45%);box-shadow:0 8px 18px rgba(0,0,0,.8)`);
  stage.append(grid, lip);
  board.appendChild(stage);
  const more = button('SHOW MORE', false, true);
  more.setAttribute('data-library-more', '');
  more.style.cssText += ';display:block;margin:18px auto 0;font:700 12px ui-monospace,monospace;letter-spacing:1px';
  board.appendChild(more);

  const hint = el('div', 'text-align:center;color:#4b5384;padding:30px 28px 8px;font-size:12px');
  hint.textContent = 'Click a title to fetch it · i: details · Esc: all computers · in the machine: Esc returns here';
  root.appendChild(hint);

  const toastHost = el('div', 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:80;display:flex;flex-direction:column;gap:6px;align-items:center');
  document.body.appendChild(toastHost);
  function toast(text: string): void {
    const t = el('div', `padding:9px 16px;border-radius:8px;background:#1a1f45;border:1px solid ${GOLD};color:#f4f5ff;font-size:13px;box-shadow:0 10px 30px rgba(0,0,0,.6)`);
    t.setAttribute('role', 'status');
    t.textContent = text;
    toastHost.appendChild(t);
    setTimeout(() => t.remove(), 4200);
  }

  function button(text: string, solid: boolean, enabled: boolean): HTMLButtonElement {
    const b = document.createElement('button');
    b.textContent = text;
    b.disabled = !enabled;
    b.style.cssText = `padding:8px 16px;border-radius:8px;font:inherit;font-size:13px;font-weight:700;
      cursor:${enabled ? 'pointer' : 'default'};
      ${solid && enabled ? `background:${GOLD};color:#1b1b1b;border:2px solid ${GOLD}`
        : `background:transparent;border:2px solid #2a3160;color:${enabled ? '#9fb0ff' : '#555c86'}`}
      ${enabled ? '' : ';opacity:.55'}`;
    return b;
  }

  // --- tabs: one per shelf ------------------------------------------------------------
  let active: SoftwareShelf | undefined = shelves.find(shelf => shelf.mountable) ?? shelves[0];
  const tabButtons = new Map<string, HTMLButtonElement>();
  for (const shelf of shelves) {
    const tab = document.createElement('button');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('data-media-tab', shelf.list);
    // Two lists of one medium -- the C64's own cartridges and the VIC-10's,
    // its original and miscellaneous disks -- are told apart by list name.
    const shared = shelves.filter(other => other.kind === shelf.kind).length > 1;
    tab.textContent = `${mediumNoun(shelf.kind).toUpperCase()}${shared ? ` · ${shelf.list}` : ''} · ${shelf.entries.toLocaleString()}`;
    tab.title = `${shelf.description} (hash/${shelf.list}.xml)${shelf.mountable ? '' : ' — display only until the medium mounts'}`;
    tab.addEventListener('click', () => { void showShelf(shelf); });
    tabs.appendChild(tab);
    tabButtons.set(shelf.list, tab);
  }
  function paintTabs(): void {
    for (const [list, tab] of tabButtons) {
      const on = list === active?.list;
      tab.setAttribute('aria-selected', String(on));
      tab.style.cssText = `padding:8px 14px;border-radius:9px;font:700 11px ui-monospace,monospace;letter-spacing:1px;cursor:pointer;
        ${on ? `background:${GOLD};color:#1b1b1b;border:2px solid ${GOLD}` : 'background:#111633;color:#cbd1ff;border:2px solid #303a78'}`;
    }
  }

  // --- library rows ----------------------------------------------------------------------
  interface LibraryRow {
    shelf: SoftwareShelf;
    entry: SoftEntry;
    avail?: CartAvailability;
    haystack: string;
  }
  let rows: LibraryRow[] = [];
  let limit = 48;
  let filterTouched = false;
  let renderedSignature = ' ';
  const tiles: HTMLElement[] = [];

  function buildRows(shelf: SoftwareShelf): LibraryRow[] {
    const catalog = catalogs.get(shelf.list);
    const avail = availability.get(shelf.list);
    return (catalog?.entries ?? []).map(entry => ({
      shelf,
      entry,
      avail: avail?.get(entry.name),
      haystack: `${entry.description} ${entry.publisher} ${entry.year} ${entry.name}`.toLocaleLowerCase(),
    }));
  }

  async function showShelf(shelf: SoftwareShelf): Promise<void> {
    active = shelf;
    paintTabs();
    grid.textContent = '';
    const wait = el('div', 'grid-column:1/-1;padding:38px;color:#7982b8;text-align:center');
    wait.textContent = `Loading ${shelf.description}…`;
    grid.appendChild(wait);
    await loadShelf(shelf);
    if (active !== shelf) return;
    rows = buildRows(shelf);
    const verified = availability.get(shelf.list)?.size ?? 0;
    scope.textContent = '';
    for (const [value, label] of [
      ...(verified ? [['verified', `Verified dumps (${verified.toLocaleString()})`]] : []),
      ['all', `All ${mediumNoun(shelf.kind)} (${shelf.list}.xml)`],
      ['working', 'MAME: working'],
    ]) {
      const option = document.createElement('option');
      option.value = value!;
      option.textContent = label!;
      scope.appendChild(option);
    }
    scope.value = filterTouched && [...scope.options].some(o => o.value === scope.value) ? scope.value
      : verified ? 'verified' : 'all';
    render(true);
  }

  function render(reset = false): void {
    if (reset) limit = 48;
    const term = search.value.trim().toLocaleLowerCase();
    const filter = scope.value;
    const matches = rows.filter(row => {
      if (filter === 'verified' && !row.avail) return false;
      if (filter === 'working' && row.entry.supported === 'no') return false;
      return !term || row.haystack.includes(term);
    });
    const signature = `${active?.list} ${filter} ${term}`;
    const extend = signature === renderedSignature && tiles.length > 0 && tiles.length <= limit;
    const from = extend ? tiles.length : 0;
    if (!extend) { grid.textContent = ''; tiles.splice(0); }
    renderedSignature = signature;
    for (const row of matches.slice(from, limit)) {
      const tile = buildTile(row);
      tiles.push(tile);
      grid.appendChild(tile);
    }
    count.textContent = `${Math.min(limit, matches.length).toLocaleString()} / ${matches.length.toLocaleString()}`;
    more.style.display = matches.length > limit ? 'block' : 'none';
    if (!matches.length) {
      const empty = el('div', 'grid-column:1/-1;padding:38px;color:#7982b8;text-align:center');
      empty.textContent = catalogs.has(active?.list ?? '')
        ? 'Nothing on this shelf matches.'
        : 'This shelf has no generated catalogue yet.';
      grid.appendChild(empty);
    }
  }
  search.addEventListener('input', () => render(true));
  scope.addEventListener('change', () => { filterTouched = true; render(true); });
  more.addEventListener('click', () => { limit += 48; render(); });

  function coverEl(svg: string, dim: boolean): HTMLElement {
    const c = el('div', `position:relative;width:160px;height:200px;border-radius:12px;cursor:pointer;
      transition:transform .15s ease, box-shadow .2s ease;box-shadow:0 12px 22px rgba(0,0,0,.45);
      transform:perspective(700px) rotateY(-2deg);${dim ? 'opacity:.85' : ''}`);
    c.innerHTML = svg;
    c.addEventListener('mouseenter', () => { c.style.transform = 'perspective(700px) translateY(-8px) rotateY(0)'; });
    c.addEventListener('mouseleave', () => { c.style.transform = 'perspective(700px) rotateY(-2deg)'; });
    return c;
  }
  function titleLine(text: string): HTMLElement {
    const box = el('div', 'max-width:164px;height:26px;display:flex;align-items:center;justify-content:center');
    const line = el('div', `display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
      color:#cbd1ff;font:600 11px ui-sans-serif,system-ui,sans-serif;line-height:13px;text-align:center;word-break:break-word`);
    line.textContent = text;
    box.title = text;
    box.appendChild(line);
    return box;
  }
  function smallBtn(text: string, attr: string, solid: boolean, enabled: boolean): HTMLButtonElement {
    const b = button(text, solid, enabled);
    b.setAttribute(attr, '');
    b.style.cssText += ';padding:4px 12px;font-size:10px;letter-spacing:.6px;white-space:nowrap';
    return b;
  }

  function buildTile(row: LibraryRow): HTMLElement {
    const { shelf, entry: soft, avail } = row;
    const zipName = avail ? (avail.file.split('/').pop() ?? avail.file) : `${soft.name}.zip`;
    const state: MediaState = !shelf.mountable ? 'display' : avail ? 'available' : 'catalog';
    const item = el('div', 'display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0');
    item.setAttribute('data-catalog-set', soft.name);
    item.dataset.list = shelf.list;
    if (avail) item.dataset.bucket = 'verified';
    const cover = coverEl(mediaSvg(shelf.kind, {
      title: stripSet(soft.description),
      sub: [soft.publisher, soft.year].filter(Boolean).join(' · '),
      state,
      artKey: soft.name,
      code: zipName,
      ...(soft.supported ? { supported: soft.supported } : {}),
      ...(soft.parts ? { parts: soft.parts } : {}),
    }), state === 'display');
    const label = el('div', `max-width:164px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
      font:700 10px ui-monospace,monospace;letter-spacing:.5px;text-align:center;
      color:${state === 'available' ? '#5ecf7a' : state === 'display' ? '#737ba7' : '#e8b64c'}`);
    label.textContent = state === 'available' ? '' : state === 'display' ? 'DISPLAY ONLY' : 'INSERT YOUR OWN';
    if (!label.textContent) label.style.display = 'none';
    item.append(cover, titleLine(stripSet(soft.description)), label);
    item.title = `${soft.description} — ${zipName}${state === 'display' ? ` · ${mediumNoun(shelf.kind, 1)} images do not mount yet` : ''}`;

    const act = (): void => {
      if (!shelf.mountable) { openInfo(row); return; }
      if (!avail) { picker.click(); return; }
      void fetchSet(row, cover, label);
    };
    const fetchBtn = smallBtn(avail ? '⌕ Search' : '◍ Insert', 'data-fetch', true, coreSupported && shelf.mountable && (avail !== undefined));
    fetchBtn.style.cssText += `;position:absolute;left:50%;transform:translateX(-50%);bottom:11px;opacity:0;
      transition:opacity .15s ease;box-shadow:0 6px 14px rgba(0,0,0,.55)`;
    fetchBtn.addEventListener('click', ev => { ev.stopPropagation(); act(); });
    const infoBtn = smallBtn('i', 'data-info', false, true);
    infoBtn.style.cssText += ';position:absolute;top:8px;left:7px;padding:0;width:20px;height:20px;border-radius:10px;line-height:1;font-size:11px;background:rgba(8,10,24,.88);opacity:0;transition:opacity .15s ease';
    infoBtn.title = 'Details';
    infoBtn.addEventListener('click', ev => { ev.stopPropagation(); openInfo(row); });
    cover.append(fetchBtn, infoBtn);
    const reveal = (shown: boolean): void => { fetchBtn.style.opacity = shown ? '1' : '0'; infoBtn.style.opacity = shown ? '1' : '0'; };
    cover.addEventListener('mouseenter', () => reveal(true));
    cover.addEventListener('mouseleave', () => reveal(false));
    cover.addEventListener('focusin', () => reveal(true));
    cover.addEventListener('focusout', () => reveal(false));
    cover.onclick = avail && shelf.mountable ? act : () => openInfo(row);
    return item;
  }

  // --- fetching --------------------------------------------------------------------------
  const fetching = new Set<string>();
  async function fetchSet(row: LibraryRow, cover: HTMLElement, label: HTMLElement): Promise<void> {
    const avail = row.avail!;
    if (fetching.has(avail.file)) return;
    fetching.add(avail.file);
    const restore = { text: label.textContent, color: label.style.color, display: label.style.display, shadow: cover.style.boxShadow };
    label.style.display = '';
    label.textContent = '⌕ SEARCHING THE WEB…';
    label.style.color = GOLD;
    cover.style.boxShadow = `0 0 34px ${GOLD}66, 0 22px 30px rgba(0,0,0,.75)`;
    try {
      const bytes = await fetchRomBytes(`${dumpsKey}/${avail.file}`);
      if (!bytes) { toast(`${row.entry.description}: no web source had it — drop your own dump instead`); return; }
      await ingest(avail.file.split('/').pop() ?? avail.file, bytes, row.shelf);
    } finally {
      fetching.delete(avail.file);
      label.textContent = restore.text;
      label.style.color = restore.color;
      label.style.display = restore.display;
      cover.style.boxShadow = restore.shadow;
    }
  }

  // --- ingestion -------------------------------------------------------------------------
  interface Owned { rec: CartRecord; item: HTMLElement }
  const owned: Owned[] = [];

  /**
   * Shelve one set, whoever produced it: a fetch, the drop zone or the picker.
   * Kept as the zip it arrived in; a bare image is wrapped as a one-member set
   * so the play path is one path.
   */
  async function ingest(name: string, bytes: Uint8Array, hint?: SoftwareShelf): Promise<boolean> {
    if (bytes.length > MAX_SET) { toast(`${name}: bigger than 16 MiB — not a software set`); return false; }
    const isZip = name.toLowerCase().endsWith('.zip') || (bytes[0] === 0x50 && bytes[1] === 0x4b);
    let members: Map<string, Uint8Array>;
    if (isZip) {
      try { members = await readZip(bytes); }
      catch { toast(`${name} isn't a readable zip`); return false; }
    } else {
      members = new Map([[name, bytes]]);
    }
    // Identify against every shelf, not only the one on screen: a dropped
    // file names no shelf, and a fetched one is checked the same way.
    await Promise.all(shelves.map(loadShelf));
    const identified = identifySet(members, catalogs.values());
    const shelf = shelfFor(identified?.list) ?? hint ?? shelves.find(candidate =>
      mountableImages(members, candidate.extensions).length > 0);
    if (!shelf) { toast(`${name}: no image inside that any shelf here accepts`); return false; }
    if (!mountableImages(members, shelf.extensions).length) {
      toast(`${name}: no ${shelf.extensions.map(e => `.${e}`).join(' / ')} image inside`);
      return false;
    }
    const id = `${cfg.game}:${hex8(crc32(bytes))}`;
    const existing = owned.find(o => o.rec.id === id);
    if (existing) { flash(existing.item); return true; }
    const rec: CartRecord = {
      id,
      console: cfg.game,
      name: identified ? `${identified.entry.name}.zip` : name,
      bytes: bytes.slice().buffer,
      size: bytes.length,
      addedAt: Date.now(),
      list: shelf.list,
      ...(identified ? { set: identified.entry.name } : {}),
    };
    try { await store.add(rec); }
    catch { toast(`${name}: not saved — playable this session`); }
    const tile = buildOwned(rec);
    owned.push(tile);
    ownRow.appendChild(tile.item);
    ownHead.style.display = '';
    flash(tile.item);
    return true;
  }

  function flash(item: HTMLElement): void {
    item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    item.style.outline = `3px solid ${GOLD}`;
    item.style.outlineOffset = '3px';
    setTimeout(() => { item.style.outline = 'none'; }, 1400);
  }

  function ownedEntry(rec: CartRecord): SoftEntry | undefined {
    if (!rec.list || !rec.set) return undefined;
    return catalogs.get(rec.list)?.entries.find(entry => entry.name === rec.set);
  }

  function buildOwned(rec: CartRecord): Owned {
    const shelf = shelfFor(rec.list);
    const soft = ownedEntry(rec);
    const title = stripSet(soft?.description ?? rec.name.replace(/\.[a-z0-9]+$/i, ''));
    const item = el('div', `display:flex;flex-direction:column;align-items:center;gap:7px;width:${TILE_W}px`);
    item.setAttribute('data-owned-set', rec.id);
    item.dataset.tier = soft ? 'verified' : 'unverified';
    const cover = coverEl(mediaSvg(shelf?.kind ?? 'cartridge', {
      title,
      sub: soft ? [soft.publisher, soft.year].filter(Boolean).join(' · ') : `${(rec.size / 1024).toFixed(0)} KB`,
      state: 'owned',
      artKey: rec.set ?? rec.name,
      code: rec.name,
      ...(soft?.supported ? { supported: soft.supported } : {}),
      ...(soft?.parts ? { parts: soft.parts } : {}),
    }), false);
    cover.style.width = `${TILE_W}px`;
    cover.style.height = `${TILE_H}px`;
    const status = el('div', 'font-size:10px;font-weight:700;letter-spacing:.8px;text-align:center;min-height:13px;color:#5ecf7a');
    status.setAttribute('data-status', '');
    status.textContent = soft ? `✓ VERIFIED · ${shelf?.list ?? ''}` : 'UNIDENTIFIED — PLAYABLE AS IS';
    if (!soft) status.style.color = '#e8b64c';
    const buttons = el('div', 'display:flex;gap:8px;align-items:center;justify-content:center;min-height:30px');
    const canPlay = coreSupported && (shelf?.mountable ?? false);
    const play = smallBtn('▶ Play', 'data-play', true, canPlay);
    play.title = canPlay ? 'Boot the machine with this set loaded' : 'This medium does not mount yet';
    play.addEventListener('click', ev => { ev.stopPropagation(); void boot(rec); });
    const eject = smallBtn('⏏', 'data-eject', false, true);
    eject.title = 'Remove from this browser';
    eject.addEventListener('click', async ev => {
      ev.stopPropagation();
      try { await store.remove(rec.id); } catch { /* in-memory */ }
      const i = owned.findIndex(o => o.rec.id === rec.id);
      if (i >= 0) owned.splice(i, 1);
      item.remove();
      ownHead.style.display = owned.length ? '' : 'none';
    });
    buttons.append(play, eject);
    cover.onclick = () => { if (canPlay) void boot(rec); };
    item.append(cover, titleLine(title), status, buttons);
    item.title = `${title} — ${rec.name}`;
    return { rec, item };
  }

  // --- boot -----------------------------------------------------------------------------
  async function boot(rec: CartRecord | null): Promise<void> {
    let images: MountedImage[] = [];
    let title = cfg.title;
    if (rec) {
      const shelf = shelfFor(rec.list);
      if (!shelf?.mountable) { toast(`${rec.name}: this medium does not mount yet`); return; }
      const bytes = new Uint8Array(rec.bytes);
      const isZip = bytes[0] === 0x50 && bytes[1] === 0x4b;
      let members: Map<string, Uint8Array>;
      try { members = isZip ? await readZip(bytes) : new Map([[rec.name, bytes]]); }
      catch { toast(`${rec.name}: could not read the set`); return; }
      images = mountableImages(members, shelf.extensions, ownedEntry(rec));
      if (!images.length) { toast(`${rec.name}: no image inside to mount`); return; }
      title = `${stripSet(ownedEntry(rec)?.description ?? rec.name.replace(/\.[a-z0-9]+$/i, ''))} — ${cfg.title}`;
    }
    inRoom = false;
    document.body.textContent = '';
    document.body.style.cssText = '';
    const cfg2: ShellConfig = {
      ...cfg,
      title,
      menuUrl: `g/${encodeURIComponent(cfg.game)}/`, // Esc: back to this room
    };
    history.pushState({ set: rec?.id ?? null }, '', location.href);
    await runShell(cfg2, undefined, images);
  }

  // --- details modal -------------------------------------------------------------------
  function openInfo(row: LibraryRow): void {
    modalDepth++;
    const { shelf, entry: soft, avail } = row;
    const backdrop = el('div', 'position:fixed;inset:0;z-index:50;background:rgba(3,4,10,.86);display:flex;align-items:center;justify-content:center;padding:24px');
    backdrop.setAttribute('data-modal', '');
    const card = el('div', `max-width:640px;width:100%;max-height:92vh;overflow:auto;border-radius:12px;padding:22px 30px 20px;
      background:linear-gradient(#141838,#0c0f24);border:2px solid ${GOLD};box-shadow:0 24px 80px rgba(0,0,0,.8);font:14px/1.55 ui-sans-serif,system-ui`);
    const h = el('div', `font-size:24px;font-weight:800;color:${GOLD};line-height:1.2;margin-bottom:2px`);
    h.textContent = soft.description;
    const subh = el('div', 'font-size:12px;font-weight:700;letter-spacing:.8px;color:#8b93c4;margin-bottom:14px');
    subh.textContent = !shelf.mountable ? `◍ ${mediumNoun(shelf.kind, 1).toUpperCase()} — DISPLAY ONLY, THE MEDIUM DOES NOT MOUNT YET`
      : avail ? '✓ VERIFIED DUMP — A WEB SEARCH CAN FETCH THIS' : '◍ BRING YOUR OWN DUMP';
    card.append(h, subh);
    const facts = el('div', 'display:grid;grid-template-columns:130px 1fr;gap:3px 10px;color:#e8eaf6');
    const fact = (name: string, value: string): void => {
      const k = el('span', 'color:#6b76b8'); k.textContent = name;
      const v = el('span', ''); v.textContent = value;
      facts.append(k, v);
    };
    fact('Software list', `${shelf.list} (${shelf.description})`);
    fact('Medium', `${mediumNoun(shelf.kind, 1)} · ${shelf.interface}`);
    if (soft.year) fact('Year', soft.year);
    if (soft.publisher) fact('Publisher', soft.publisher);
    fact('Set', soft.name + (soft.cloneof ? ` (clone of ${soft.cloneof})` : ''));
    if (soft.parts) fact('Parts', String(soft.parts));
    if (soft.supported) fact('MAME status', soft.supported === 'no' ? 'not working' : 'partially working');
    for (const rom of soft.prg.roms) fact(rom.file ?? 'image', `${(rom.size / 1024).toFixed(0)} KB · crc ${rom.crc}`);
    fact('Zip', avail ? (avail.file.split('/').pop() ?? avail.file) : `${soft.name}.zip`);
    card.appendChild(facts);
    const footer = el('div', 'display:flex;gap:12px;margin-top:18px');
    const close = (): void => { backdrop.remove(); removeEventListener('keydown', onKey, true); modalDepth--; };
    const onKey = (ev: KeyboardEvent): void => { if (ev.key === 'Escape') { ev.stopPropagation(); ev.preventDefault(); close(); } };
    if (shelf.mountable) {
      const go = button(avail ? '⌕ Search the web' : '◍ Insert your own…', true, coreSupported);
      go.addEventListener('click', () => {
        close();
        if (avail) {
          const tile = grid.querySelector<HTMLElement>(`[data-catalog-set="${CSS.escape(soft.name)}"]`);
          const cover = tile?.firstElementChild as HTMLElement | null;
          const label = tile?.lastElementChild as HTMLElement | null;
          if (cover && label) void fetchSet(row, cover, label);
        } else picker.click();
      });
      footer.appendChild(go);
    }
    const c = button('Close', false, true);
    c.addEventListener('click', close);
    footer.appendChild(c);
    card.appendChild(footer);
    backdrop.appendChild(card);
    backdrop.addEventListener('click', ev => { if (ev.target === backdrop) close(); });
    addEventListener('keydown', onKey, true);
    document.body.appendChild(backdrop);
    c.focus();
  }

  // --- drop zone + picker -----------------------------------------------------------------
  const picker = document.createElement('input');
  picker.type = 'file';
  picker.accept = ['.zip', ...new Set(shelves.flatMap(shelf => shelf.extensions.map(e => `.${e}`)))].join(',');
  picker.multiple = true;
  picker.tabIndex = -1;
  picker.setAttribute('aria-hidden', 'true');
  picker.style.cssText = 'position:fixed;left:-9999px;width:1px;height:1px;opacity:0';
  root.appendChild(picker);
  async function handleFiles(files: File[]): Promise<void> {
    for (const f of files) {
      if (f.size > MAX_SET) { toast(`${f.name}: bigger than 16 MiB — not a software set`); continue; }
      let bytes: Uint8Array;
      try { bytes = new Uint8Array(await f.arrayBuffer()); }
      catch { toast(`${f.name}: could not read the file`); continue; }
      await ingest(f.name, bytes, active);
    }
  }
  picker.addEventListener('change', () => {
    const fs = [...(picker.files ?? [])];
    picker.value = '';
    if (fs.length) void handleFiles(fs);
  });
  addEventListener('dragover', ev => { if (inRoom) ev.preventDefault(); });
  addEventListener('drop', ev => {
    if (!inRoom) return;
    ev.preventDefault();
    const fs = [...(ev.dataTransfer?.files ?? [])];
    if (fs.length) void handleFiles(fs);
  });
  addEventListener('keydown', ev => {
    if (!inRoom || modalDepth > 0 || ev.target === search) return;
    if (ev.key === 'Escape') location.href = './?tab=computers';
  });

  // --- go ----------------------------------------------------------------------------------
  paintTabs();
  if (active) void showShelf(active);
  else {
    const empty = el('div', 'grid-column:1/-1;padding:38px;color:#7982b8;text-align:center');
    empty.textContent = 'This machine declares no software list this build could read. Drop your own image to play it.';
    grid.appendChild(empty);
  }
  // The visitor's own sets need their catalogues to show a title; load those
  // shelves too, without holding the library.
  const recs = await store.list(cfg.game);
  await Promise.all([...new Set(recs.map(rec => rec.list).filter(Boolean))]
    .map(list => shelfFor(list)).filter((shelf): shelf is SoftwareShelf => Boolean(shelf)).map(loadShelf));
  for (const rec of recs) {
    const tile = buildOwned(rec);
    owned.push(tile);
    ownRow.appendChild(tile.item);
  }
  ownHead.style.display = owned.length ? '' : 'none';
}

async function fetchOwnEntry(cfg: ShellConfig): Promise<MenuEntry | null> {
  try {
    const games = await fetch('../games.json').then(r => r.json()) as MenuEntry[];
    return games.find(g => g.game === cfg.game) ?? null;
  } catch { return null; }
}
