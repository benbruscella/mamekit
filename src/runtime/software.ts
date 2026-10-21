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

import {
  betaBadge, requiredRomRegions, runShell, storedRomFiles, type MountedImage, type ShellConfig, type SoftwareShelf,
} from './shell.ts';
import { openRomStore } from './romstore.ts';
import { firmwareSets as firmwareStatus, holdsFirmware, type FirmwareSet } from './firmware-status.ts';
import { openCartStore, type CartRecord } from './cartstore.ts';
import { readZip, crc32 } from './zip.ts';
import { cartAvailability, fetchRomBytes, machineSetDir, machineSetKeys, type CartAvailability } from './rom-source.ts';
import { wrapCartTitle } from './console.ts';
import { artworkSources } from './artwork-source.ts';
import { emptyMediaSlots, softwarePart, withoutSlotFirmware } from './title-start.ts';
import { chooseVersion, onlyVersion, versionFilters, versionLabel, type MachineVersion } from './machine-versions.ts';

const GOLD = '#f2c200';
const MAX_SET = 16 * 1024 * 1024; // a disk image set; no tape or cart is near it

/** the generated catalogue, as the room reads it (src/kg/softlist.ts writes it) */
export interface SoftRom {
  size: number; crc: string; offset: number; file?: string;
  /** a cartridge chip's dataarea */
  area?: string;
  /** where MAME reads the chip again from its start (`loadflag="reload"`) */
  reloads?: { offset: number; size: number }[];
}
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
  /** MAME's note on starting the set: `Commodore: Load "JINGLE",8,1` */
  usage?: string;
  /** the video standard the list says the set was made for (`<info name="video">`) */
  video?: string;
  /** the title's own start command, from its usage note, over its shelf's */
  start?: string;
  /** each cartridge dataarea's declared size ("roml": 8192) */
  areas?: Record<string, number>;
  /** the part's other features: a C64 cartridge's `exrom` and `game` */
  features?: Record<string, string>;
  /** configuration switches the title's note asks for (software-shelves usageSwitches) */
  switches?: { port: string; mask: number; value: number }[];
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
  kind?: string;
  dataPath?: string;
  /** MAME's parent machine, for a regional version */
  cloneof?: string;
  fullname: string;
  year: string;
  manufacturer: string;
  supported?: boolean;
  /** a compiled but unfinished machine the development build exposes */
  preview?: boolean;
  driverFile?: string;
  /** the artwork tree holds a photograph of the machine (media/computers) */
  hasPhoto?: boolean;
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
  // A merged set (MAME's own layout) holds the parent's images at its root
  // and each clone's under a folder of the clone's name: mminer.zip carries
  // `mminers/manic miner (software projects) - side 1.tzx` beside its own
  // tape. The root is the set the zip is named for, so it is identified by
  // that alone when its root holds anything a list names.
  const catalogList = [...catalogs];
  const root = new Map([...members].filter(([name]) => !name.includes('/')));
  if (root.size && root.size < members.size) {
    const parent = identifyMembers(root, catalogList);
    if (parent) return parent;
  }
  return identifyMembers(members, catalogList);
}

function identifyMembers(
  members: Map<string, Uint8Array>,
  catalogs: readonly SoftCatalog[],
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
/**
 * Whether a catalogued set holds an image the shelf's transport reads. A
 * shelf lists the image formats its drive reads (software-shelves), and a
 * list can still carry sets in another one: the C64's misc disks include a
 * `.img` its 1541 cannot read, which used to boot with the drive empty.
 */
export function entryPlayable(entry: Pick<SoftEntry, 'prg'>, shelf: Pick<SoftwareShelf, 'extensions' | 'imageDevice'>): boolean {
  // A cartridge is read area by area into its slot, not as an image file.
  if (shelf.imageDevice) return entry.prg.roms.some(rom => rom.area);
  return entry.prg.roms.some(rom => {
    const extension = rom.file?.includes('.') ? rom.file.split('.').pop()!.toLowerCase() : '';
    return Boolean(extension) && shelf.extensions.includes(extension);
  });
}

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
  // A list marks a disk write protected as a feature its drive's call_load reads.
  const features = entry.features;
  // The entry's own images, when the zip holds them: a merged set also
  // carries every clone's, which are other sets and not this one's sides.
  const own = new Set(entry.prg.roms.map(rom => rom.crc));
  const mine = images.filter(image => own.has(hex8(crc32(image.bytes))));
  return (mine.length ? mine : images).map(image => features ? { ...image, features } : image).sort((a, b) =>
    (order.get(a.name.toLowerCase()) ?? 1e9) - (order.get(b.name.toLowerCase()) ?? 1e9));
}

// --- the room ---------------------------------------------------------------------------

export async function runSoftwareRoom(cfg: ShellConfig): Promise<void> {
  addEventListener('popstate', () => location.reload());
  const [store, manifest] = await Promise.all([openCartStore(), fetchManifest()]);
  // A machine's regional versions -- MAME's clones of one parent, the PAL C64
  // of the NTSC one -- share one room (machine-versions.ts). Each keeps its own
  // config and the catalogues its own software-list filter let through, and
  // Play picks the version per title.
  const entry = manifest.find(item => item.game === cfg.game) ?? null;
  const familyName = entry?.cloneof ?? cfg.game;
  const versions = await loadVersions(cfg, entry, manifest, familyName);
  const head = versions.find(version => version.game === familyName) ?? versions[0]!;
  const familyTitle = (head.entry?.fullname ?? head.cfg.title).replace(/\s*\(.*\)$/, '');
  document.title = versions.length > 1 ? familyTitle : cfg.title;
  // Every version's shelves, one tab per list: the same lists, filtered per
  // machine, so a tab holds what any version can play.
  const shelves: SoftwareShelf[] = [];
  const shelfOf = new Map<string, Map<string, SoftwareShelf>>();
  for (const version of versions) {
    for (const shelf of version.cfg.software?.shelves ?? []) {
      let byVersion = shelfOf.get(shelf.list);
      if (!byVersion) {
        byVersion = new Map();
        shelfOf.set(shelf.list, byVersion);
        shelves.push(shelf);
      }
      byVersion.set(version.game, shelf);
    }
  }
  const dumpsKey = head.cfg.software?.dumpsKey ?? head.cfg.dataPath.replace(/^games\//, '');
  const firmware = head.cfg.roms.some(spec => spec.loads.length > 0);
  // The sets the machine asks for, as the drop screen names them: a C64 with
  // its 1541 wants c64.zip and the drive's c1541.zip.
  const firmwareSets = [...new Set(head.cfg.roms.filter(spec => spec.loads.length > 0)
    .flatMap(spec => spec.loads.map(load => load.romSet ?? spec.romSet ?? head.game)))]
    .map(set => `${set}.zip`);
  const firmwareNames = firmwareSets.length > 1
    ? `${firmwareSets.slice(0, -1).join(', ')} and ${firmwareSets.at(-1)}`
    : firmwareSets[0] ?? `${head.game}.zip`;

  // A candidate machine is exposed by the development build as a preview:
  // the menu opens it, so the room plays it. Only a build whose closure lacks
  // the board is barred.
  const coreSupported = versions.some(version => version.entry?.supported !== false || version.entry?.preview === true);
  /** Each list's titles across every version, the first version's entry kept. */
  const catalogs = new Map<string, SoftCatalog>();
  /** Every version's own catalogues, as generated: what a dropped set is identified against. */
  const sources: SoftCatalog[] = [];
  /** For each list, the versions whose catalogues hold each title. */
  const listedBy = new Map<string, Map<string, string[]>>();
  const availability = new Map<string, Map<string, CartAvailability>>();
  const loading = new Map<string, Promise<void>>();
  let inRoom = true;
  let modalDepth = 0;

  const shelfFor = (list: string | undefined): SoftwareShelf | undefined =>
    shelves.find(shelf => shelf.list === list);

  /** Fetch a shelf's catalogues and availability once; the room is usable before either lands. */
  function loadShelf(shelf: SoftwareShelf): Promise<void> {
    let pending = loading.get(shelf.list);
    if (pending) return pending;
    pending = (async () => {
      const merged: SoftEntry[] = [];
      const names = new Map<string, string[]>();
      let first: SoftCatalog | undefined;
      for (const [game, own] of shelfOf.get(shelf.list) ?? []) {
        const version = versions.find(candidate => candidate.game === game)!;
        try {
          const r = await fetch(`../${version.cfg.dataPath}/${own.catalogUrl}`);
          if (!r.ok) continue;
          const catalog = await r.json() as SoftCatalog;
          sources.push(catalog);
          first ??= catalog;
          for (const item of catalog.entries) {
            const holders = names.get(item.name);
            if (holders) holders.push(game);
            else { names.set(item.name, [game]); merged.push(item); }
          }
        } catch { /* that version's shelf stays out; the room says so if all do */ }
      }
      if (first) catalogs.set(shelf.list, { ...first, entries: merged });
      listedBy.set(shelf.list, names);
      const listing = [...shelfOf.get(shelf.list) ?? []].find(([, own]) => own.availableUrl);
      if (listing) {
        const version = versions.find(candidate => candidate.game === listing[0])!;
        try {
          const r = await fetch(`../${version.cfg.dataPath}/${listing[1].availableUrl}`);
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

  const header = el('div', `padding:26px 36px 18px;display:flex;flex-wrap:wrap;gap:18px 28px;align-items:center;
    justify-content:space-between;background:linear-gradient(180deg,#0f1330,#05060f)`);
  const heading = el('div', '');
  const h1 = el('div', `font-size:30px;font-weight:900;color:${GOLD};line-height:1.1`);
  h1.textContent = familyTitle;
  // A preview machine says so where it is named: it plays, but its emulation
  // has no gameplay acceptance yet, so a failed tape is a known possibility.
  // With versions, the version says so on its own button instead.
  if (versions.every(version => version.preview)) h1.appendChild(betaBadge());
  const sub = el('div', 'color:#8f99d2;font-size:13px;margin-top:4px');
  sub.textContent = [head.entry?.manufacturer, head.entry?.year,
    versions.length > 1 ? '' : cfg.title.replace(/^.*\((\w+)\)\s*\(.*$/, '$1')]
    .filter(Boolean).join(' · ');
  heading.append(h1, sub);
  // The region, chosen here rather than on the boot menu: Auto plays each
  // title on the version its software list lets it through to, and of two the
  // one the list says it was made for; a version picked by hand wins wherever
  // the title runs on it. Remembered per machine.
  const regionKey = `mamekit:region:${familyName}`;
  let preference = 'auto';
  try {
    const stored = localStorage.getItem(regionKey);
    if (stored && versions.some(version => version.game === stored)) preference = stored;
  } catch { /* no storage: Auto */ }
  const regionButtons = new Map<string, HTMLButtonElement>();
  if (versions.length > 1) {
    const region = el('div', 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px');
    region.setAttribute('data-region-control', '');
    region.setAttribute('role', 'group');
    region.setAttribute('aria-label', 'Region');
    const caption = el('span', 'color:#7f8ac9;font:700 11px ui-monospace,monospace;letter-spacing:2px');
    caption.textContent = 'REGION';
    region.appendChild(caption);
    for (const [value, text, title] of [
      ['auto', 'AUTO', 'Each title on the version its software list allows, and of two the one the list says it was made for'],
      ...versions.map(version => [version.game, version.label,
        `${version.entry?.fullname ?? version.game}${version.preview ? ' — in beta: no gameplay acceptance yet' : ''}`]),
    ] as [string, string, string][]) {
      const choice = document.createElement('button');
      choice.setAttribute('data-region', value);
      choice.title = title;
      choice.textContent = text;
      if (versions.find(version => version.game === value)?.preview) {
        const beta = el('span', 'margin-left:6px;font-size:9px;letter-spacing:1px;opacity:.75');
        beta.textContent = 'BETA';
        choice.appendChild(beta);
      }
      choice.addEventListener('click', () => {
        preference = value;
        try { localStorage.setItem(regionKey, value); } catch { /* not kept */ }
        paintRegion();
        choice.blur();
      });
      regionButtons.set(value, choice);
      region.appendChild(choice);
    }
    heading.appendChild(region);
  }
  function paintRegion(): void {
    for (const [value, choice] of regionButtons) {
      const on = value === preference;
      choice.setAttribute('aria-pressed', String(on));
      choice.style.cssText = `padding:5px 12px;border-radius:999px;font:800 11px ui-monospace,monospace;letter-spacing:1px;cursor:pointer;
        ${on ? `background:${GOLD};color:#1b1b1b;border:2px solid ${GOLD}` : 'background:#111633;color:#cbd1ff;border:2px solid #303a78'}`;
    }
    const power = versionForPowerOn();
    powerBtn.title = `${firmware
      ? `Boot the machine with nothing loaded — it asks for its own ${firmwareNames} firmware first`
      : 'Boot the machine with nothing loaded'}${versions.length > 1 ? ` (${power.entry?.fullname ?? power.game})` : ''}`;
  }
  function versionForPowerOn(): Version {
    return chooseVersion(versions, undefined, preference);
  }
  // The machine itself, as the console room shows its console: a photograph
  // on genuine transparency, so it sits in the banner rather than pasted on.
  // Asked for only when the build shipped one, and dropped if it will not
  // decode, so a build without the artwork tree shows the heading alone.
  const masthead = el('div', 'display:flex;align-items:center;gap:22px;min-width:0');
  if (head.entry?.hasPhoto) {
    const hero = el('div', `width:200px;height:104px;flex:0 0 auto;display:none;align-items:center;justify-content:center`);
    hero.setAttribute('data-computer-hero', '');
    const [web, archival] = artworkSources(`media/computers/${head.game}.png`);
    const photo = document.createElement('img');
    photo.decoding = 'async';
    photo.alt = '';
    photo.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(0,0,0,.55))';
    photo.addEventListener('error', () => {
      if (!photo.src.endsWith(archival)) photo.src = archival;
      else hero.remove();
    });
    photo.addEventListener('load', () => { hero.style.display = 'flex'; });
    photo.src = web;
    hero.append(photo);
    masthead.append(hero);
  }
  masthead.append(heading);
  const actions = el('div', 'display:flex;gap:10px;flex-wrap:wrap;align-items:center');
  const powerBtn = button('⏻ Power on', true, coreSupported);
  powerBtn.setAttribute('data-power-on', '');
  powerBtn.title = firmware
    ? `Boot the machine with nothing loaded — it asks for its own ${firmwareNames} firmware first`
    : 'Boot the machine with nothing loaded';
  powerBtn.addEventListener('click', () => boot(null));
  const insertBtn = button('◍ Insert your own…', false, true);
  insertBtn.title = `Drop a set zip or a bare image (${shelves.flatMap(s => s.extensions).map(e => `.${e}`).join(' ')}) anywhere on this page`;
  insertBtn.addEventListener('click', () => picker.click());
  const dossier = document.createElement('a');
  dossier.href = `g/${encodeURIComponent(head.game)}/dossier/`;
  dossier.textContent = 'Dossier';
  dossier.style.cssText = 'padding:8px 16px;border-radius:8px;font-weight:700;text-decoration:none;border:2px solid #2a3160;color:#9fb0ff';
  const back = document.createElement('a');
  back.href = './?tab=computers';
  back.textContent = '← All computers';
  back.style.cssText = dossier.style.cssText;
  actions.append(powerBtn, insertBtn, dossier, back);
  header.append(masthead, actions);
  root.appendChild(header);

  const notes = el('div', 'padding:0 36px;color:#7f8ac9;font-size:12.5px;line-height:1.6;max-width:1280px;margin:0 auto;box-sizing:border-box');
  notes.textContent = firmware
    ? `Software is never distributed with mamekit. A title you fetch or drop is kept only in this browser; playing it boots the machine, which first asks for its own ${firmwareNames} firmware (dropped, or found by the web search).`
    : 'Software is never distributed with mamekit. A title you fetch or drop is kept only in this browser.';
  root.appendChild(notes);

  // --- firmware ---------------------------------------------------------------------------
  // What the machine's firmware is and which of it this browser keeps, said
  // here, before Play, rather than on the drop screen after it: a missing
  // drive ROM costs only the disks, and a dropped or fetched set boots every
  // version (firmware-status.ts). Play itself never waits on a decision.
  const romStore = await openRomStore();
  const critical = requiredRomRegions(head.cfg.roms, head.cfg.board.cpus.map(cpu => cpu.region));
  const mediaSlots = [...new Set(shelves.flatMap(shelf => shelf.slots ?? []))];
  const siblings = versions.filter(version => version !== head).map(version => version.game);
  let keptFiles = new Map<string, Uint8Array>();
  let sets: FirmwareSet[] = [];
  const firmwareBar = el('div', `max-width:1280px;margin:12px auto 0;padding:10px 36px 0;box-sizing:border-box;
    display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12.5px`);
  firmwareBar.setAttribute('data-firmware-status', '');
  if (firmware) root.appendChild(firmwareBar);
  const firmwarePicker = document.createElement('input');
  firmwarePicker.type = 'file';
  firmwarePicker.accept = '.zip';
  firmwarePicker.multiple = true;
  firmwarePicker.tabIndex = -1;
  firmwarePicker.setAttribute('aria-hidden', 'true');
  firmwarePicker.style.cssText = 'position:fixed;left:-9999px;width:1px;height:1px;opacity:0';
  root.appendChild(firmwarePicker);
  firmwarePicker.addEventListener('change', () => {
    const files = [...(firmwarePicker.files ?? [])];
    firmwarePicker.value = '';
    void (async () => {
      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        if (!await keepFirmware(file.name, bytes)) toast(`${file.name}: no chip this machine loads`);
      }
    })();
  });
  /** What a medium needs, as the bar says it: "disks need it". */
  const slotNoun = (slot: string): string => {
    const kinds = [...new Set(shelves.filter(shelf => shelf.slots?.includes(slot)).map(shelf => mediumNoun(shelf.kind)))];
    return kinds.length ? kinds.join(' and ') : `the ${slot} slot`;
  };
  function paintFirmware(): void {
    firmwareBar.textContent = '';
    const caption = el('span', 'color:#7f8ac9;font:700 11px ui-monospace,monospace;letter-spacing:2px');
    caption.textContent = 'FIRMWARE';
    firmwareBar.appendChild(caption);
    for (const set of sets) {
      const chip = el('span', `padding:3px 10px;border-radius:999px;font:700 11px ui-monospace,monospace;
        ${set.kept ? 'color:#5ecf7a;border:1px solid #2b6b3d' : 'color:#f0a35e;border:1px solid #7a4b20'}`);
      chip.setAttribute('data-firmware', set.name);
      chip.dataset.kept = String(set.kept);
      chip.textContent = `${set.kept ? '✓' : '✗'} ${set.name}.zip${set.kept ? '' : set.slot ? ` — ${slotNoun(set.slot)} need it` : ' — every title needs it'}`;
      chip.title = set.kept ? `${set.name}.zip is kept in this browser` : `${set.name}.zip is not in this browser yet`;
      firmwareBar.appendChild(chip);
    }
    const missing = sets.filter(set => !set.kept);
    const add = button('◍ Add firmware…', false, true);
    add.setAttribute('data-firmware-add', '');
    add.style.cssText += ';padding:4px 12px;font-size:12px';
    add.title = `Choose ${firmwareNames} (kept only in this browser)`;
    add.addEventListener('click', () => firmwarePicker.click());
    firmwareBar.appendChild(add);
    if (missing.length) {
      const search = button('⌕ Search the web', false, true);
      search.setAttribute('data-firmware-search', '');
      search.style.cssText += ';padding:4px 12px;font-size:12px';
      search.addEventListener('click', () => { void searchFirmware(missing); });
      firmwareBar.appendChild(search);
    } else {
      const ok = el('span', 'color:#5f6aa8');
      ok.textContent = 'kept in this browser — titles boot straight in';
      firmwareBar.appendChild(ok);
    }
    paintNeeds();
  }
  async function refreshFirmware(): Promise<void> {
    const kept = await storedRomFiles(romStore, head.game, head.cfg.roms, critical, siblings);
    keptFiles = kept?.files ?? new Map();
    sets = firmwareStatus(head.cfg.roms, head.game, keptFiles, mediaSlots);
    paintFirmware();
  }
  /** Keep a zip that holds this machine's chips with the rest of its firmware; false if it holds none. */
  async function keepFirmware(name: string, bytes: Uint8Array): Promise<boolean> {
    let members: Map<string, Uint8Array>;
    try { members = await readZip(bytes); } catch { return false; }
    if (!holdsFirmware(members, head.cfg.roms)) return false;
    const record = await romStore.get(head.game).catch(() => null);
    const zips = [...(record?.zips ?? []).filter(zip => zip.name.toLowerCase() !== name.toLowerCase()),
      { name, bytes: bytes.slice().buffer }];
    try { await romStore.put({ game: head.game, zips, addedAt: Date.now() }); }
    catch { toast(`${name}: this browser could not keep it`); return true; }
    toast(romStore.persistent ? `${name} kept in this browser` : `${name} kept for this visit only`);
    await refreshFirmware();
    return true;
  }
  /** The web search the drop screen offers, from here: each missing set under the keys the app tries. */
  async function searchFirmware(missing: FirmwareSet[]): Promise<void> {
    const category = head.cfg.dataPath.replace(/^games\//, '').split('/')[0] ?? 'computers';
    for (const set of missing) {
      const dir = machineSetDir(category, dumpsKey);
      const keys = set.name === head.game
        ? machineSetKeys(set.name, category, dumpsKey)
        : [...new Set([`${dir}/${set.name}.zip`, `${category}/${set.name}.zip`])];
      let found = false;
      for (const key of keys) {
        const bytes = await fetchRomBytes(key);
        if (bytes && await keepFirmware(`${set.name}.zip`, bytes)) { found = true; break; }
      }
      if (!found) toast(`${set.name}.zip: no web source had it — add your own`);
    }
  }
  /** The sets a title cannot boot without, for the version that would play it. */
  function missingFor(rec: CartRecord | null): string[] {
    const version = rec
      ? chooseVersion(versions, rec.list && rec.set ? listedBy.get(rec.list)?.get(rec.set) : undefined, preference, ownedEntry(rec)?.video)
      : versionForPowerOn();
    const empty = emptyMediaSlots(version.cfg.software, rec?.list, []);
    const roms = withoutSlotFirmware(version.cfg.roms, empty);
    const regions = new Set(roms.map(spec => spec.region));
    return sets.filter(set => !set.kept && (!set.slot || !empty.includes(set.slot)))
      .filter(set => head.cfg.roms.some(spec => regions.has(spec.region) && spec.loads.length > 0 &&
        spec.loads.some(load => (load.romSet ?? spec.romSet ?? head.game) === set.name)))
      .map(set => `${set.name}.zip`);
  }

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
    tab.textContent = tabText(shelf, Math.max(...[...shelfOf.get(shelf.list)!.values()].map(own => own.entries)));
    tab.title = `${shelf.description} (hash/${shelf.list}.xml)${shelf.mountable ? '' : ' — display only until the medium mounts'}`;
    tab.addEventListener('click', () => { void showShelf(shelf); });
    tabs.appendChild(tab);
    tabButtons.set(shelf.list, tab);
  }
  function tabText(shelf: SoftwareShelf, count: number): string {
    // Two lists of one medium -- the C64's own cartridges and the VIC-10's,
    // its original and miscellaneous disks -- are told apart by list name.
    const shared = shelves.filter(other => other.kind === shelf.kind).length > 1;
    return `${mediumNoun(shelf.kind).toUpperCase()}${shared ? ` · ${shelf.list}` : ''} · ${count.toLocaleString()}`;
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
    /** the versions whose catalogues hold the title */
    versions?: string[];
  }
  let rows: LibraryRow[] = [];
  let limit = 48;
  let filterTouched = false;
  let renderedSignature = ' ';
  const tiles: HTMLElement[] = [];

  function buildRows(shelf: SoftwareShelf): LibraryRow[] {
    const catalog = catalogs.get(shelf.list);
    const avail = availability.get(shelf.list);
    const names = listedBy.get(shelf.list);
    return (catalog?.entries ?? []).map(entry => ({
      shelf,
      entry,
      avail: avail?.get(entry.name),
      haystack: `${entry.description} ${entry.publisher} ${entry.year} ${entry.name}`.toLocaleLowerCase(),
      versions: names?.get(entry.name),
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
    tabButtons.get(shelf.list)!.textContent = tabText(shelf, rows.length);
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
  /**
   * A title's cover in place of its drawn medium, where its shelf has one
   * (`shelf.art`, the .webp the site ships under artwork/carts/<list>/). The
   * drawing stays underneath: a cover that does not load leaves it showing.
   */
  function withCover(cover: HTMLElement, shelf: SoftwareShelf | undefined, name: string | undefined): void {
    const file = shelf && name ? shelf.art?.[name] : undefined;
    if (!file) return;
    const [web] = artworkSources(`carts/${shelf!.list}/${file}`);
    const img = document.createElement('img');
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.setAttribute('data-cover', '');
    img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:12px';
    img.onerror = () => img.remove();
    img.src = web;
    cover.appendChild(img);
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
  /** A title only one version lists says which: MAME's filter keeps it off the other's shelf. */
  function regionChip(only: Version): HTMLElement {
    const chip = el('div', `padding:1px 8px;border-radius:999px;border:1px solid #3d4689;color:#aeb8ff;
      font:800 9px ui-monospace,monospace;letter-spacing:1px`);
    chip.setAttribute('data-region-only', only.game);
    chip.textContent = `${only.label} ONLY`;
    chip.title = `Only the ${only.entry?.fullname ?? only.label} lists this title; Play starts that version`;
    return chip;
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
    const playable = shelf.mountable && entryPlayable(soft, shelf);
    const state: MediaState = !playable ? 'display' : avail ? 'available' : 'catalog';
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
    withCover(cover, shelf, soft.name);
    const label = el('div', `max-width:164px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
      font:700 10px ui-monospace,monospace;letter-spacing:.5px;text-align:center;
      color:${state === 'available' ? '#5ecf7a' : state === 'display' ? '#737ba7' : '#e8b64c'}`);
    label.textContent = state === 'available' ? '' : state === 'display' ? 'DISPLAY ONLY' : 'INSERT YOUR OWN';
    if (!label.textContent) label.style.display = 'none';
    item.append(cover, titleLine(stripSet(soft.description)), label);
    const only = onlyVersion(versions, row.versions);
    if (only) item.insertBefore(regionChip(only), label);
    item.title = `${soft.description} — ${zipName}${state === 'display'
      ? shelf.mountable
        ? ` · not a format this ${mediumNoun(shelf.kind, 1)} drive reads (${shelf.extensions.map(extension => `.${extension}`).join(' ')})`
        : ` · ${mediumNoun(shelf.kind, 1)} images do not mount yet`
      : ''}`;

    const act = (): void => {
      if (!playable) { openInfo(row); return; }
      if (!avail) { picker.click(); return; }
      void fetchSet(row, cover, label);
    };
    const fetchBtn = smallBtn(avail ? '⌕ Search' : '◍ Insert', 'data-fetch', true, coreSupported && playable && (avail !== undefined));
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
    cover.onclick = avail && playable ? act : () => openInfo(row);
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
  interface Owned { rec: CartRecord; item: HTMLElement; needs?: HTMLElement }
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
    const identified = identifySet(members, sources);
    // The shelf on screen is only a hint: a disk image dropped while the
    // tapes are showing belongs on a disk shelf, not refused by the tape one.
    // A cartridge shelf takes a set its list identifies whole: the slot reads
    // its chips by area, so there is no image file to look for.
    const takes = (candidate: SoftwareShelf | undefined): boolean => Boolean(candidate && (candidate.imageDevice
      ? (identified?.list === candidate.list && softwarePart(members, identified.entry)) ||
        (!identified && mountableImages(members, candidate.extensions).length)
      : mountableImages(members, candidate.extensions).length));
    const shelf = shelfFor(identified?.list) ?? (takes(hint) ? hint : shelves.find(takes) ?? hint);
    if (!shelf) { toast(`${name}: no image inside that any shelf here accepts`); return false; }
    if (!takes(shelf)) {
      toast(shelf.imageDevice ? `${name}: not every chip of a ${shelf.list} set is inside`
        : `${name}: no ${shelf.extensions.map(e => `.${e}`).join(' / ')} image inside`);
      return false;
    }
    // Kept under the machine's parent, and known by its crc whichever version
    // a set was first kept under, so one title is on one shelf.
    const crc = hex8(crc32(bytes));
    const id = `${familyName}:${crc}`;
    const existing = owned.find(o => o.rec.id.split(':').pop() === crc);
    if (existing) { flash(existing.item); return true; }
    const rec: CartRecord = {
      id,
      console: familyName,
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
    paintNeeds();
    flash(tile.item);
    return true;
  }

  function paintNeeds(): void {
    for (const own of owned) {
      if (!own.needs) continue;
      const missing = missingFor(own.rec);
      own.needs.textContent = missing.length ? `NEEDS ${missing.join(' + ')}` : '';
      own.needs.title = missing.length ? 'Play asks for it first; add it above to boot straight in' : '';
    }
    if (firmware) {
      const missing = missingFor(null);
      powerBtn.dataset.needs = missing.join(' ');
      powerBtn.title = `${powerBtn.title.replace(/ — needs .*$/, '')}${missing.length ? ` — needs ${missing.join(' + ')}` : ''}`;
    }
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
    withCover(cover, shelf, rec.set);
    cover.style.width = `${TILE_W}px`;
    cover.style.height = `${TILE_H}px`;
    const status = el('div', 'font-size:10px;font-weight:700;letter-spacing:.8px;text-align:center;min-height:13px;color:#5ecf7a');
    status.setAttribute('data-status', '');
    status.textContent = soft ? `✓ VERIFIED · ${shelf?.list ?? ''}` : 'UNIDENTIFIED — PLAYABLE AS IS';
    if (!soft) status.style.color = '#e8b64c';
    const buttons = el('div', 'display:flex;gap:8px;align-items:center;justify-content:center;min-height:30px');
    const canPlay = coreSupported && Boolean(shelf?.mountable) && (!soft || entryPlayable(soft, shelf!));
    const play = smallBtn('▶ Play', 'data-play', true, canPlay);
    play.title = canPlay ? 'Boot the machine with this set loaded'
      : shelf?.mountable && soft ? `Not a format this drive reads (${shelf.extensions.map(extension => `.${extension}`).join(' ')})`
        : 'This medium does not mount yet';
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
    const only = rec.list && rec.set ? onlyVersion(versions, listedBy.get(rec.list)?.get(rec.set)) : undefined;
    if (only) item.insertBefore(regionChip(only), status);
    item.title = `${title} — ${rec.name}`;
    // What this title still needs before it boots straight in, kept current
    // with the firmware bar.
    const needs = el('div', 'font:700 10px ui-monospace,monospace;letter-spacing:.5px;color:#f0a35e;text-align:center;min-height:0');
    needs.setAttribute('data-needs', '');
    item.insertBefore(needs, buttons);
    // MAME's own note on the title, where you play it: which joystick port,
    // when to turn the tape. (One naming a start command is typed by Play.)
    if (soft?.usage) {
      const note = el('div', `max-width:${TILE_W}px;color:#9aa4dc;font-size:10.5px;line-height:1.35;text-align:center;
        display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden`);
      note.setAttribute('data-usage', '');
      note.textContent = `ⓘ ${soft.usage}`;
      note.title = `MAME's note: ${soft.usage}`;
      item.insertBefore(note, needs);
    }
    return { rec, item, needs };
  }

  // --- boot -----------------------------------------------------------------------------
  // A medium's transport is attached only for the titles that use it: a tape
  // title boots with the disk drive's slot empty, as MAME's `-iec8 ""` does,
  // rather than running the 1541's processor in lockstep with the machine's
  // own for nothing. Power on attaches every one (title-start.ts).
  // A title restarted from inside the machine to connect a transport comes
  // back through a reload; this carries what to boot across it.
  const restartKey = `mamekit:restart:${familyName}`;

  async function boot(rec: CartRecord | null, attached: string[] = [], restarted = false, pinned?: string): Promise<void> {
    // The version that plays it: the one its software list lets it through to,
    // else the region chosen here (machine-versions.ts). A restart to connect
    // a transport comes back to the same one.
    const listed = rec?.list && rec.set ? listedBy.get(rec.list)?.get(rec.set) : undefined;
    const version = versions.find(candidate => candidate.game === pinned) ??
      (rec ? chooseVersion(versions, listed, preference, ownedEntry(rec)?.video) : versionForPowerOn());
    const machine = version.cfg;
    let images: MountedImage[] = [];
    // A cartridge goes into its slot before the machine starts (BoardConfig.images).
    let powerOnImages: NonNullable<ShellConfig['board']['images']> | undefined;
    // And when the list is a card's, that card goes into the slot first.
    let slotCards: Record<string, string> | undefined;
    let title = machine.title;
    if (rec) {
      const shelf = shelfOf.get(rec.list ?? '')?.get(version.game) ?? shelfFor(rec.list);
      if (!shelf?.mountable) { toast(`${rec.name}: this medium does not mount yet`); return; }
      const bytes = new Uint8Array(rec.bytes);
      const isZip = bytes[0] === 0x50 && bytes[1] === 0x4b;
      let members: Map<string, Uint8Array>;
      try { members = isZip ? await readZip(bytes) : new Map([[rec.name, bytes]]); }
      catch { toast(`${rec.name}: could not read the set`); return; }
      const owned = ownedEntry(rec);
      const part = shelf.imageDevice && owned ? softwarePart(members, owned) : undefined;
      if (shelf.imageDevice) {
        // A list title is its part; a bare file (a .crt) is the file, whose
        // own header the port's chooser reads.
        const file = part ? undefined : mountableImages(members, shelf.extensions)[0];
        if (!part && !file) { toast(`${rec.name}: not every chip of the set is inside`); return; }
        powerOnImages = { [shelf.imageDevice]: part ? { name: rec.name, software: part } : { name: file!.name, bytes: file!.bytes } };
        if (shelf.card) slotCards = { [shelf.imageDevice]: shelf.card };
      } else {
        images = mountableImages(members, shelf.extensions, owned);
        if (!images.length) { toast(`${rec.name}: no image inside to mount`); return; }
      }
      title = `${stripSet(ownedEntry(rec)?.description ?? rec.name.replace(/\.[a-z0-9]+$/i, ''))} — ${machine.title}`;
    }
    inRoom = false;
    document.body.textContent = '';
    document.body.style.cssText = '';
    const emptySlots = emptyMediaSlots(machine.software, rec?.list, attached);
    const shelfStart = rec ? (shelfOf.get(rec.list ?? '')?.get(version.game) ?? shelfFor(rec.list))?.boot : undefined;
    // A title whose usage note names its own command starts with that one.
    const ownStart = rec ? ownedEntry(rec)?.start : undefined;
    const shelfBoot = shelfStart && ownStart ? { ...shelfStart, command: ownStart } : shelfStart;
    if (versions.length > 1) console.info(`[room] ${rec ? rec.name : 'power on'}: the ${version.entry?.fullname ?? version.game}`);
    const cfg2: ShellConfig = {
      ...machine,
      title,
      menuUrl: `g/${encodeURIComponent(cfg.game)}/`, // Esc: back to this room
      ...(emptySlots.length || powerOnImages ? {
        board: {
          ...machine.board,
          ...(emptySlots.length ? { emptySlots } : {}),
          ...(slotCards ? { slotCards } : {}),
          ...(powerOnImages ? { images: powerOnImages } : {}),
        },
      } : {}),
      ...(rec && ownedEntry(rec)?.usage ? { usage: ownedEntry(rec)!.usage } : {}),
      ...(rec ? { titleKey: rec.id } : {}),
      ...(rec && ownedEntry(rec)?.switches?.length ? { switches: ownedEntry(rec)!.switches } : {}),
      // A title starts itself: its shelf's command is typed once the machine
      // is up (Power on, with no title, leaves the keyboard to the visitor).
      ...(shelfBoot ? { boot: shelfBoot } : {}),
      ...(version.preview ? { preview: true } : {}),
      // The other versions' kept firmware is this one's too: the PAL C64 loads
      // the NTSC machine's chips, and a set kept for one boots the other.
      ...(versions.length > 1 ? { firmwareFrom: versions.filter(other => other !== version).map(other => other.game) } : {}),
    };
    // The restart reloads the entry this pushed, so it must not push another.
    if (restarted) history.replaceState({ set: rec?.id ?? null }, '', location.href);
    else history.pushState({ set: rec?.id ?? null }, '', location.href);
    await runShell(cfg2, undefined, images, {
      attach: slot => {
        try {
          sessionStorage.setItem(restartKey, JSON.stringify({ set: rec?.id ?? null, attached: [...attached, slot], version: version.game }));
        } catch { /* no session storage: the reload lands in the room */ }
        location.reload();
      },
    });
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
    if (soft.usage) fact('How to start', soft.usage);
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
      // The machine's own firmware dropped on the room is kept as firmware.
      if (firmware && /\.zip$/i.test(f.name) && await keepFirmware(f.name, bytes)) continue;
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
  paintRegion();
  if (active) void showShelf(active);
  else {
    const empty = el('div', 'grid-column:1/-1;padding:38px;color:#7982b8;text-align:center');
    empty.textContent = 'This machine declares no software list this build could read. Drop your own image to play it.';
    grid.appendChild(empty);
  }
  // The visitor's own sets need their catalogues to show a title; load those
  // shelves too, without holding the library.
  // Every version's kept sets, one shelf of them: a title kept by crc once.
  const recs: CartRecord[] = [];
  for (const rec of (await Promise.all(versions.map(version => store.list(version.game)))).flat()) {
    const crc = rec.id.split(':').pop();
    if (!recs.some(other => other.id.split(':').pop() === crc)) recs.push(rec);
  }
  await Promise.all([...new Set(recs.map(rec => rec.list).filter(Boolean))]
    .map(list => shelfFor(list)).filter((shelf): shelf is SoftwareShelf => Boolean(shelf)).map(loadShelf));
  for (const rec of recs) {
    const tile = buildOwned(rec);
    owned.push(tile);
    ownRow.appendChild(tile.item);
  }
  ownHead.style.display = owned.length ? '' : 'none';
  if (firmware) await refreshFirmware();

  // Back from a restart that connected a transport: boot the same title again.
  let restart: { set: string | null; attached: string[]; version?: string } | undefined;
  try {
    const raw = sessionStorage.getItem(restartKey);
    sessionStorage.removeItem(restartKey);
    if (raw) restart = JSON.parse(raw) as typeof restart;
  } catch { /* storage unavailable or unreadable: stay in the room */ }
  if (restart) {
    const rec = restart.set === null ? null : recs.find(candidate => candidate.id === restart.set);
    if (rec !== undefined) void boot(rec, Array.isArray(restart.attached) ? restart.attached.map(String) : [], true, restart.version);
  }
}

async function fetchManifest(): Promise<MenuEntry[]> {
  try { return await fetch('../games.json').then(r => r.json()) as MenuEntry[]; }
  catch { return []; }
}

/** One regional version, with the config it boots with and its manifest entry. */
interface Version extends MachineVersion {
  cfg: ShellConfig;
  entry: MenuEntry | null;
  /** exposed before gameplay acceptance (or unbuildable): says BETA */
  preview: boolean;
}

function versionOf(cfg: ShellConfig, entry: MenuEntry | null): Version {
  return {
    game: cfg.game,
    cfg,
    entry,
    label: versionLabel(entry?.fullname ?? cfg.title, cfg.game),
    filters: versionFilters(cfg.software?.shelves ?? []),
    accepted: entry ? entry.supported !== false && !entry.preview : true,
    titles: (cfg.software?.shelves ?? []).reduce((sum, shelf) => sum + shelf.entries, 0),
    preview: entry?.preview === true || entry?.supported === false,
  };
}

/**
 * The room's versions: this machine and every other clone of its parent the
 * manifest lists, parent first. One whose config does not load is left out
 * rather than offered and failing.
 */
async function loadVersions(cfg: ShellConfig, entry: MenuEntry | null, manifest: readonly MenuEntry[], family: string): Promise<Version[]> {
  const listed = manifest.filter(other => other.kind === entry?.kind && (other.cloneof ?? other.game) === family);
  const versions = (await Promise.all(listed.map(async other => {
    if (other.game === cfg.game) return versionOf(cfg, other);
    try {
      const r = await fetch(`../${other.dataPath}/config.json`);
      return r.ok ? versionOf(await r.json() as ShellConfig, other) : undefined;
    } catch { return undefined; }
  }))).filter((version): version is Version => Boolean(version));
  if (!versions.some(version => version.game === cfg.game)) versions.unshift(versionOf(cfg, entry));
  return versions.sort((a, b) => Number(b.game === family) - Number(a.game === family));
}
