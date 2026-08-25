// Cartridge artwork for the console shelf, from libretro-thumbnails.
//
// The console room draws every cartridge itself (an SVG NES shell with a
// generated label), and composites a real box scan into the label when one
// exists under .data/artwork/carts/<list>/<name>.sticker.<ext>. Issue #85 asks
// for that scan to exist for every title the machine claims support for, and
// names the source:
//
//   https://github.com/libretro-thumbnails/Nintendo_-_Nintendo_Entertainment_System
//
// The wanted set is DERIVED, never listed here: it is the machine's own
// `cart.games` support list, resolved through the softlist catalog to the exact
// dump the shelf offers for each title, which is the name the shelf keys art
// off. Add a title to CART_SLOT/CART_GAME support in src/gen/generate.ts,
// regenerate, and the next run fetches its scan.
//
//   node tools/nes-cart-art.ts            fetch what is missing
//   node tools/nes-cart-art.ts --check    report gaps, download nothing
//   node tools/nes-cart-art.ts --list nes --force
//
// Matching is by title, which is inexact by nature: libretro names its files
// after the No-Intro/TOSEC release ("Kung Fu (1985-06-04)(Nintendo)(JP-US).png")
// while MAME names the software-list entry ("Kung Fu (Japan, USA)"). Both parts
// are normalised to a comparable key, region tags are scored against the MAME
// description's own region words, and anything carrying a dump flag ([b], [h],
// [o]) loses to a clean release. A title with no confident match is REPORTED,
// never guessed at: a wrong box on a cartridge is worse than a drawn label.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { DATA_DIR } from '../src/paths.ts';

const REPO = 'libretro-thumbnails/Nintendo_-_Nintendo_Entertainment_System';
const BOXART_DIR = 'Named_Boxarts';
/**
 * Parenthetical qualifiers marking a release nobody shipped. They are not
 * bracket flags, so the flag test misses them, and they win on name length:
 * `Double Dragon II - The Revenge (1990-01)(Acclaim)(US)(proto)` beat the plain
 * `(USA)` box until this scored it down.
 */
const UNRELEASED = /\((?:proto(?:type)?|beta|sample|demo|alt|pirate)[^)]*\)/i;

/** Raw blob host; the API tree is only used to enumerate. */
const RAW = `https://raw.githubusercontent.com/${REPO}/master/${BOXART_DIR}`;

const root = resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const list = flagValue('--list') ?? 'nes';
const checkOnly = argv.includes('--check');
const force = argv.includes('--force');

if (!/^[a-z0-9_-]+$/i.test(list)) fail(`implausible list "${list}"`);

const machineDir = join(root, 'dist/games/consoles', list);
const artDir = join(root, DATA_DIR, `artwork/carts/${list}`);
const cacheFile = join(root, '.cache/libretro-thumbnails', `${list}-boxarts.json`);

interface SoftEntry {
  name: string;
  description: string;
  cloneof?: string;
  slot: string;
}
interface Catalog { entries: SoftEntry[] }
interface Availability { carts: { file: string; name?: string; tier: string }[] }
interface MachineConfig { cart?: { list?: string; games?: string[] } }

const config = readJson<MachineConfig>(join(machineDir, 'config.json'),
  'generate the console first: `node bin/mamekit.js nes`');
const catalog = readJson<Catalog>(join(machineDir, 'softlist.json'),
  'the machine has no extracted software list');
const availability = readJson<Availability>(join(machineDir, 'carts.json'),
  'no cart shelf index — .data/roms/consoles/<list>/_manifest.json is missing');

const supported = config.cart?.games ?? [];
if (!supported.length) fail(`${list}: the machine claims no supported cartridges`);

/** softlist short name -> the bucket file the shelf's "⌕ Search" would fetch. */
const availableDumps = new Map<string, string>();
for (const cart of availability.carts) {
  if (cart.tier === 'verified' && cart.name) availableDumps.set(cart.name, cart.file);
}

const byName = new Map(catalog.entries.map(entry => [entry.name, entry]));
const family = new Map<string, SoftEntry[]>();
for (const entry of catalog.entries) {
  const parent = entry.cloneof ?? entry.name;
  family.set(parent, [...(family.get(parent) ?? []), entry]);
}

/**
 * The dump a supported title actually plays as.
 *
 * A support entry names the softlist PARENT, and a parent is frequently a
 * region the collection does not hold — `smb` is the European Super Mario Bros.
 * and the dump on hand is `smb1`. The shelf keys both art and the fetch button
 * off the dump, so that is what has to be resolved here.
 */
interface Wanted { title: string; dump?: SoftEntry; file?: string }
const wanted: Wanted[] = supported.map(title => {
  const candidates = (family.get(title) ?? []).filter(entry => availableDumps.has(entry.name));
  const dump = candidates.find(entry => entry.name === title) ?? candidates[0];
  return { title, dump, file: dump && availableDumps.get(dump.name) };
});

const missingDump = wanted.filter(item => !item.dump);
const haveArt = cartArtNames();
const missingArt = wanted.filter(item =>
  item.dump && (force || !haveArt.has(item.dump.name)));

console.log(`${list}: ${supported.length} supported titles, ` +
  `${wanted.length - missingDump.length} with a dump the web search can fetch, ` +
  `${wanted.filter(item => item.dump && haveArt.has(item.dump.name)).length} with cartridge art`);

for (const item of missingDump) {
  const entry = byName.get(item.title);
  console.log(`  ! ${item.title.padEnd(12)} ${entry?.description ?? '(not in the software list)'}` +
    ' — NO VERIFIED DUMP, the shelf cannot offer it');
}

if (!missingArt.length) {
  console.log(missingDump.length ? '' : 'every supported title already has cartridge art');
  process.exit(missingDump.length ? 1 : 0);
}

if (checkOnly) {
  for (const item of missingArt) {
    console.log(`  ? ${item.dump!.name.padEnd(12)} ${item.dump!.description} — no cartridge art`);
  }
  process.exit(1);
}

const boxarts = await boxartIndex();
console.log(`libretro thumbnails: ${boxarts.length} box scans indexed`);

let fetched = 0;
const unmatched: Wanted[] = [];
for (const item of missingArt) {
  const dump = item.dump!;
  const match = bestBoxart(dump.description, boxarts);
  if (!match) { unmatched.push(item); continue; }
  const bytes = await download(`${RAW}/${encodeURIComponent(match.file)}`);
  if (!bytes) { unmatched.push(item); continue; }
  if (!isPng(bytes)) {
    console.log(`  ! ${dump.name}: ${match.file} did not come back as a PNG`);
    unmatched.push(item);
    continue;
  }
  mkdirSync(artDir, { recursive: true });
  writeFileSync(join(artDir, `${dump.name}.sticker.png`), bytes);
  fetched++;
  console.log(`  + ${dump.name.padEnd(12)} ${(bytes.length / 1024).toFixed(0).padStart(5)} KB  ${match.file}`);
}

for (const item of unmatched) {
  console.log(`  ? ${item.dump!.name.padEnd(12)} ${item.dump!.description} — no confident box scan`);
}
console.log(`\n${fetched} fetched into ${artDir}` +
  (unmatched.length ? `, ${unmatched.length} still without art` : ''));
if (fetched) {
  console.log('run `make sync-artwork` in .data/ to publish them — the site loads scans from the bucket');
}
process.exit(unmatched.length || missingDump.length ? 1 : 0);

// --- matching -----------------------------------------------------------------------

interface Boxart { file: string; key: string; regions: Set<string>; flagged: boolean }

/**
 * A comparable form of a title: case, punctuation, articles and revision
 * qualifiers removed.
 *
 * libretro inherits the cataloguing convention that moves a leading article to
 * the end and spells the revision inside the title ("Legend of Zelda Rev PRG0,
 * The"); MAME writes "The Legend of Zelda" and keeps the revision in its region
 * parenthetical. The two also disagree about "&"/"and", apostrophes and the
 * dash before a subtitle. None of that is a different game, so the article is
 * dropped rather than moved — its position is what made Zelda unmatchable.
 */
function titleKey(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/,\s*(the|a|an)\s*$/, '')
    .replace(/^(the|a|an)\b/, '')
    .replace(/\brev(?:ision)?\.?\s+[\w.]+/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '')
    .trim();
}

/** The regions a release names, as a set both naming conventions map onto. */
function regionsOf(text: string): Set<string> {
  const regions = new Set<string>();
  const add = (...values: string[]): void => { for (const value of values) regions.add(value); };
  // No-Intro spells them out, TOSEC uses two-letter tags — this tree holds both.
  if (/\bworld\b/i.test(text)) add('US', 'EU', 'JP');
  if (/\busa\b/i.test(text) || /\bUS\b/.test(text)) add('US');
  if (/\beurope\b/i.test(text) || /\bEU\b/.test(text)) add('EU');
  if (/\bjapan\b/i.test(text) || /\bJP\b/.test(text)) add('JP');
  return regions;
}

function bestBoxart(description: string, index: Boxart[]): Boxart | undefined {
  const key = titleKey(stripSet(description));
  const candidates = index.filter(entry => entry.key === key);
  if (!candidates.length) return undefined;
  const parenthetical = /\(([^)]*)\)\s*$/.exec(description)?.[1] ?? '';
  const regions = regionsOf(parenthetical);
  // MAME names the publisher in that same parenthetical exactly when it is what
  // tells two releases apart — "Pac-Man (USA, Namco)" against the Tengen
  // printing — which is also when two boxes share a title and a region.
  const publisher = /,\s*([A-Za-z][\w' .-]*)\s*$/.exec(parenthetical)?.[1]?.trim();
  const score = (entry: Boxart): number =>
    (entry.flagged ? 0 : 8) +
    (UNRELEASED.test(entry.file) ? 0 : 6) +
    ([...regions].some(region => entry.regions.has(region)) ? 4 : 0) +
    (publisher && new RegExp(`\\(${escapeRegExp(publisher)}\\)`, 'i').test(entry.file) ? 3 : 0) +
    // A shorter name is the plain release; the long ones carry alternate
    // printings and translation credits, which are the same box anyway.
    Math.max(0, 4 - entry.file.length / 40);
  return [...candidates].sort((left, right) => score(right) - score(left))[0];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Everything before the release parenthetical — MAME's "(USA, rev. A)" suffix. */
function stripSet(description: string): string {
  return description.replace(/\s*\([^)]*\)\s*$/, '').trim();
}


// --- the libretro index ---------------------------------------------------------------

/**
 * Every box scan the thumbnail repo holds, cached under .cache.
 *
 * One git-tree request enumerates all 13,000-odd of them; without the cache a
 * re-run costs that request again for no new information. The cache is keyed by
 * the tree sha it was read from, so a repo update is picked up by deleting it —
 * the same rule the generation cache follows.
 */
async function boxartIndex(): Promise<Boxart[]> {
  if (existsSync(cacheFile)) {
    return (JSON.parse(readFileSync(cacheFile, 'utf8')) as { files: string[] }).files.map(describe);
  }
  const treeUrl = `https://api.github.com/repos/${REPO}/git/trees/master`;
  const rootTree = await fetchJson<{ tree: { path: string; type: string; sha: string }[] }>(treeUrl);
  const boxes = rootTree?.tree.find(node => node.path === BOXART_DIR && node.type === 'tree');
  if (!boxes) fail(`${REPO} has no ${BOXART_DIR} directory`);
  const listing = await fetchJson<{ tree: { path: string; type: string }[]; truncated: boolean }>(
    `https://api.github.com/repos/${REPO}/git/trees/${boxes.sha}`);
  if (!listing) fail('could not read the box art listing');
  if (listing.truncated) fail('the box art listing came back truncated');
  const files = listing.tree
    .filter(node => node.type === 'blob' && node.path.toLowerCase().endsWith('.png'))
    .map(node => node.path);
  mkdirSync(join(cacheFile, '..'), { recursive: true });
  writeFileSync(cacheFile, JSON.stringify({ repo: REPO, sha: boxes.sha, files }));
  return files.map(describe);
}

function describe(file: string): Boxart {
  const stem = file.replace(/\.png$/i, '');
  return {
    file,
    key: titleKey(stem.replace(/\s*[([].*$/, '')),
    // (JP-US), (US), (EU) ... every parenthesised group, joined
    regions: regionsOf(stem),
    flagged: /\[[^\]]+\]/.test(stem),
  };
}

// --- plumbing -------------------------------------------------------------------------

function cartArtNames(): Set<string> {
  if (!existsSync(artDir)) return new Set();
  const names = new Set<string>();
  for (const file of readdirSync(artDir)) {
    const match = /^(.+?)(\.sticker)?\.(png|jpe?g|webp)$/i.exec(file);
    if (match) names.add(match[1]);
  }
  return names;
}

async function fetchJson<T>(url: string): Promise<T | undefined> {
  const response = await fetch(url, { headers: githubHeaders() }).catch(() => null);
  if (!response?.ok) {
    console.error(`  ! ${url} -> ${response?.status ?? 'network error'}`);
    return undefined;
  }
  return await response.json() as T;
}

async function download(url: string): Promise<Uint8Array | undefined> {
  const response = await fetch(url).catch(() => null);
  if (!response?.ok) {
    console.error(`  ! ${url} -> ${response?.status ?? 'network error'}`);
    return undefined;
  }
  return new Uint8Array(await response.arrayBuffer());
}

/**
 * GitHub allows 60 anonymous API requests an hour per address. This tool needs
 * two, and only on a cold cache, so a token is optional — but a shared address
 * can be out of them, and the failure is otherwise a bare 403.
 */
function githubHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  return {
    accept: 'application/vnd.github+json',
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
}

function isPng(bytes: Uint8Array): boolean {
  return bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 &&
    bytes[2] === 0x4e && bytes[3] === 0x47;
}

function readJson<T>(path: string, why: string): T {
  if (!existsSync(path)) fail(`${path} is missing — ${why}`);
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function flagValue(flag: string): string | undefined {
  const index = argv.indexOf(flag);
  return index >= 0 ? argv[index + 1] : undefined;
}

function fail(message: string): never {
  console.error(`nes-cart-art: ${message}`);
  process.exit(1);
}
