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
// The wanted set is DERIVED, never listed here. Two scopes derive it:
//
//   supported  the machine's own `cart.games` support list, resolved through
//              the softlist catalog to the exact dump the shelf offers for each
//              title, which is the name the shelf keys art off. Add a title to
//              CART_SLOT/CART_GAME support in src/gen/generate.ts, regenerate,
//              and the next run fetches its scan.
//   shelf      every verified dump in the set, supported or not. The library
//              lists all 945 of them and draws a cartridge for each, so a shelf
//              where only the playable 50 have a box reads as broken art rather
//              than as a support boundary.
//
//   node tools/nes-cart-art.ts                    fetch what the support list is missing
//   node tools/nes-cart-art.ts --check            report gaps, download nothing
//   node tools/nes-cart-art.ts --scope shelf      ... for every cart on the shelf
//   node tools/nes-cart-art.ts --list nes --force
//
// What lands is the reduced `<name>.sticker.webp` and nothing else: the label
// is drawn about 113 CSS px wide, so 200px is already generous, and these ship
// inside dist (WEB_ARTWORK_TREES in src/gen/generate.ts) where every megabyte
// is the deployed site's. 854 of them cost 10.6 MB. The 500 KB sources stay in
// the collection above rather than being mirrored into .data and the bucket.
//
// Matching is by title, which is inexact by nature: libretro names its files
// after the No-Intro/TOSEC release ("Kung Fu (1985-06-04)(Nintendo)(JP-US).png")
// while MAME names the software-list entry ("Kung Fu (Japan, USA)"). Both parts
// are normalised to a comparable key, region tags are scored against the MAME
// description's own region words, and anything carrying a dump flag ([b], [h],
// [o]) loses to a clean release. Where an exact key fails, two looser tiers run
// under guards tight enough that a wrong box stays worse than a drawn label:
//
//   direct   normalised titles are equal ("Metroid (USA)")
//   subset   one title's words are contained in the other's -- MAME prints the
//            on-screen title where the box printed something shorter
//            ("Disney's Darkwing Duck" / "Darkwing Duck", "The 3-D Battles of
//            Worldrunner" / "3-D WorldRunner")
//   sibling  no title match, but a regional twin in the same cloneof group
//            matched, and a twin's box beats a blank label
//   none     reported, never guessed at
//
// Every decision is written to `_art-sources.json` beside the images, tier
// included, so a questionable box can be traced back to the title that chose it.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
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

const SUPERSCRIPT: Record<string, string> = { '¹': '1', '²': '2', '³': '3' };
/**
 * Sequel markers, arabic and roman alike, mapped onto one form so "Challenge
 * II" and "Challenge 2" are the same sequel. Two titles may only be joined
 * loosely when these agree exactly, so "Aladdin" can never stand in for
 * "Aladdin III" nor "Super Contra" for "Super Contra II". Bare "i" is left out:
 * far more often a word than a numeral.
 */
const ROMAN: Record<string, string> = {
  ii: '2', iii: '3', iv: '4', v: '5', vi: '6', vii: '7', viii: '8', ix: '9',
  x: '10', xi: '11', xii: '12',
};

/** Blob host for the scans themselves; the API tree is only used to enumerate. */
const CDN = 'https://thumbnails.libretro.com/Nintendo - Nintendo Entertainment System';

const root = resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const list = flagValue('--list') ?? 'nes';
const checkOnly = argv.includes('--check');
const force = argv.includes('--force');
const scope = flagValue('--scope') ?? 'supported';
const limit = Number(flagValue('--limit') ?? 0) || Infinity;
const width = Number(flagValue('--width') ?? 200);
const quality = Number(flagValue('--quality') ?? 75);
const jobs = Number(flagValue('--jobs') ?? 8);

if (!/^[a-z0-9_-]+$/i.test(list)) fail(`implausible list "${list}"`);
if (scope !== 'supported' && scope !== 'shelf') fail(`--scope must be supported or shelf, got "${scope}"`);

const machineDir = join(root, 'dist/games/consoles', list);
const artDir = join(root, DATA_DIR, `artwork/carts/${list}`);
const cacheFile = join(root, '.cache/libretro-thumbnails', `${list}-boxarts.json`);
const mappingFile = join(artDir, '_art-sources.json');

interface SoftEntry {
  name: string;
  description: string;
  year?: string;
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
 * The dump a wanted title actually plays as.
 *
 * A support entry names the softlist PARENT, and a parent is frequently a
 * region the collection does not hold — `smb` is the European Super Mario Bros.
 * and the dump on hand is `smb1`. The shelf keys both art and the fetch button
 * off the dump, so that is what has to be resolved here. Shelf scope needs no
 * resolving: every entry there IS a dump.
 */
interface Wanted { title: string; dump?: SoftEntry; file?: string }
const wanted: Wanted[] = scope === 'shelf'
  ? [...availableDumps].flatMap(([name, file]) => {
      const dump = byName.get(name);
      return dump ? [{ title: name, dump, file }] : [];
    })
  : supported.map(title => {
      const candidates = (family.get(title) ?? []).filter(entry => availableDumps.has(entry.name));
      const dump = candidates.find(entry => entry.name === title) ?? candidates[0];
      return { title, dump, file: dump && availableDumps.get(dump.name) };
    });

const missingDump = wanted.filter(item => !item.dump);

// --- what art is already here ---------------------------------------------------------

const onDisk = existsSync(artDir)
  ? readdirSync(artDir).filter(file => /\.(png|jpe?g|webp)$/i.test(file))
  : [];
const stemOf = (file: string): string =>
  file.replace(/\.(png|jpe?g|webp)$/i, '').replace(/\.sticker$/i, '');
const haveArt = new Set(onDisk.map(stemOf));
/**
 * Art with an archival scan beside it was fetched by hand (`make cart-art`),
 * and its `.webp` is that scan's sibling rather than anything this tool wrote.
 * --force replaces what this tool owns; it never overwrites a hand-picked scan,
 * which would leave a vault PNG and a libretro WebP claiming to be one image.
 */
const handFetched = new Set(onDisk.filter(file => !/\.webp$/i.test(file)).map(stemOf));

const missingArt = wanted.filter(item =>
  item.dump && (force ? !handFetched.has(item.dump.name) : !haveArt.has(item.dump.name)));

console.log(`${list} (${scope}): ${wanted.length} title(s), ` +
  `${wanted.length - missingDump.length} with a dump the web search can fetch, ` +
  `${wanted.filter(item => item.dump && haveArt.has(item.dump.name)).length} with cartridge art`);

for (const item of missingDump) {
  const entry = byName.get(item.title);
  console.log(`  ! ${item.title.padEnd(12)} ${entry?.description ?? '(not in the software list)'}` +
    ' — NO VERIFIED DUMP, the shelf cannot offer it');
}

if (!missingArt.length) {
  console.log(missingDump.length ? '' : `every ${scope === 'shelf' ? 'cart on the shelf' : 'supported title'} already has cartridge art`);
  process.exit(missingDump.length ? 1 : 0);
}

// --- match ----------------------------------------------------------------------------

const boxarts = await boxartIndex();
console.log(`libretro thumbnails: ${boxarts.length} box scans indexed`);

const picks = new Map<string, Pick>();
for (const entry of catalog.entries) {
  const match = bestBoxart(entry, boxarts, 'direct');
  if (match) picks.set(entry.name, match);
}
for (const entry of catalog.entries) {
  if (picks.has(entry.name)) continue;
  const match = bestBoxart(entry, boxarts, 'subset');
  if (match) picks.set(entry.name, match);
}
// Regional twins share a box more often than not, and a twin's scan beats a
// blank label — tiered `sibling` so the guess stays visible in the mapping.
for (const members of family.values()) {
  const donor = members
    .filter(member => picks.get(member.name) && picks.get(member.name)!.via !== 'sibling')
    .sort((left, right) => picks.get(left.name)!.score - picks.get(right.name)!.score)[0];
  if (!donor) continue;
  for (const member of members) {
    if (picks.has(member.name)) continue;
    picks.set(member.name, { ...picks.get(donor.name)!, via: 'sibling', donor: donor.name });
  }
}

writeMapping();

const queue = missingArt
  .filter(item => picks.has(item.dump!.name))
  .slice(0, limit === Infinity ? undefined : limit);
const unmatched = missingArt.filter(item => !picks.has(item.dump!.name));

if (checkOnly) {
  for (const item of queue) {
    const pick = picks.get(item.dump!.name)!;
    console.log(`  ? ${item.dump!.name.padEnd(12)} ${item.dump!.description} — ${pick.via}: ${pick.file}`);
  }
  for (const item of unmatched) {
    console.log(`  ? ${item.dump!.name.padEnd(12)} ${item.dump!.description} — no confident box scan`);
  }
  console.log(`\n${queue.length} fetchable, ${unmatched.length} with no confident match; mapping: ${rel(mappingFile)}`);
  process.exit(1);
}

// --- fetch ----------------------------------------------------------------------------

requireCwebp();
mkdirSync(artDir, { recursive: true });
const tmpDir = join(root, '.cache', 'cart-art-tmp');
mkdirSync(tmpDir, { recursive: true });

let fetched = 0, bytes = 0;
const failures: Wanted[] = [];
const pending = [...queue];
await Promise.all(Array.from({ length: Math.min(jobs, pending.length) }, worker));
rmSync(tmpDir, { recursive: true, force: true });

for (const item of [...unmatched, ...failures]) {
  console.log(`  ? ${item.dump!.name.padEnd(12)} ${item.dump!.description} — no cartridge art`);
}
console.log(`\n${fetched} fetched into ${rel(artDir)}` +
  (fetched ? `, ${(bytes / 1048576).toFixed(1)} MB, ${Math.round(bytes / fetched / 1024)} KB average` : '') +
  (unmatched.length + failures.length ? `, ${unmatched.length + failures.length} still without art` : ''));
console.log(`mapping: ${rel(mappingFile)}`);
if (fetched) {
  console.log('the shelf reads its art index from config.json — regenerate the target to pick these up.');
}
process.exit(unmatched.length + failures.length + missingDump.length ? 1 : 0);

async function worker(): Promise<void> {
  for (;;) {
    const item = pending.shift();
    if (!item) return;
    const dump = item.dump!;
    const pick = picks.get(dump.name)!;
    const tmp = join(tmpDir, `${dump.name}.png`);
    const dest = join(artDir, `${dump.name}.sticker.webp`);
    try {
      const png = await download(`${CDN}/${BOXART_DIR}/${pick.file}`);
      if (!png || !isPng(png)) throw new Error('did not come back as a PNG');
      writeFileSync(tmp, png);
      // Never upscale: a scan already narrower than the label gains nothing but
      // blur and bytes from being enlarged.
      const natural = pngWidth(png);
      const resize = natural > width ? ['-resize', String(width), '0'] : [];
      execFileSync('cwebp', ['-q', String(quality), ...resize, '-quiet', tmp, '-o', dest], { stdio: 'pipe' });
      rmSync(tmp, { force: true });
      bytes += readFileSync(dest).length;
      fetched++;
      if (queue.length > 40) {
        if (fetched % 50 === 0) console.log(`  ${fetched}/${queue.length} ...`);
      } else {
        console.log(`  + ${dump.name.padEnd(12)} ${(readFileSync(dest).length / 1024).toFixed(0).padStart(4)} KB  ${pick.file}`);
      }
    } catch (error) {
      console.error(`  ! ${dump.name}: ${(error as Error).message.split('\n')[0]}`);
      failures.push(item);
      rmSync(tmp, { force: true });
    }
  }
}

// --- matching -------------------------------------------------------------------------

interface Boxart {
  file: string; title: string; key: string; words: string[]; numbers: string;
  regions: Set<string>; year: string; tags: number; flagged: boolean;
}
interface Pick { file: string; via: 'direct' | 'subset' | 'sibling'; score: number; matched: string; donor?: string }


/**
 * A title as comparable words.
 *
 * libretro inherits the cataloguing convention that moves a leading article to
 * the end ("Legend of Zelda, The"); MAME writes "The Legend of Zelda". It also
 * sanitises punctuation in filenames — "&" and ":" both become "_" — so an
 * ampersand is a word on one side and nothing on the other. None of that is a
 * different game, so articles, ampersands and apostrophes all drop out. An
 * INTERIOR "the" is kept, and so is the "A" of "A B C": only the article in
 * article position carries no signal.
 */
function words(raw: string): string[] {
  return raw
    .replace(/[¹²³]/g, char => SUPERSCRIPT[char])
    .replace(/^(l|d)['’]\s*/i, '')                 // "L'Empereur" == "Empereur, L'"
    .replace(/['’]/g, '')                          // Kitchen's -> Kitchens, one word not two
    .replace(/,\s*(the|a|an|l|le|la|les|el|il)\b/gi, '')
    .replace(/^(the|a|an)\s+/i, '')
    .replace(/\brev(?:ision)?\.?\s+[\w.]+/gi, '')  // MAME keeps the revision out of the title
    .normalize('NFKD').replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim().split(' ')
    .filter(word => word && word !== 'and');
}

function numbersOf(parts: string[]): string {
  return parts.filter(part => /^\d+$/.test(part) || ROMAN[part])
    .map(part => ROMAN[part] ?? part).sort().join(',');
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

/**
 * Everything before the FIRST parenthetical, not the last.
 *
 * MAME writes the release set as a suffix — "Kung Fu (Japan, USA)" — but a
 * cartridge with two regional titles carries both: "Gyromite (Europe, USA) ~
 * Gyro (Japan)". Cutting the last parenthetical off that leaves "Gyromite
 * (Europe, USA) ~ Gyro" as the title and matches nothing.
 */
function stripSet(description: string): string {
  return description.replace(/\s*[([].*$/s, '').trim();
}

function describe(file: string): Boxart {
  const stem = file.replace(/\.png$/i, '');
  const title = stem.replace(/\s*[([].*$/, '');
  const parts = words(title);
  return {
    file,
    title,
    key: parts.join(''),
    words: parts,
    numbers: numbersOf(parts),
    // (JP-US), (US), (EU) ... every parenthesised group, joined
    regions: regionsOf(stem),
    year: (/\((19|20)\d{2}/.exec(stem) ?? [])[0]?.slice(1) ?? '',
    tags: [...stem.matchAll(/[([]/g)].length,
    flagged: /\[[^\]]+\]/.test(stem),
  };
}

/**
 * The best scan for one softlist entry, or nothing.
 *
 * `direct` demands an equal key. `subset` accepts a candidate whose words are
 * all present in ours (or ours in its) — but only when the sequel numbers
 * agree, when a one-word title is either a number or long enough to be a
 * coinage ("Pesterminator", never "Virus" for "The Mutant Virus"), and when the
 * two lengths are close: a dropped subtitle is the common shape, so a strict
 * prefix may run further ahead than a title that merely shares words.
 */
function bestBoxart(entry: SoftEntry, index: Boxart[], tier: 'direct' | 'subset'): Pick | undefined {
  const parts = words(stripSet(entry.description));
  if (!parts.length) return undefined;
  const want = {
    key: parts.join(''), words: parts, numbers: numbersOf(parts),
    // Every parenthetical, for the same reason: the regions of a two-title
    // cartridge are spread across both halves.
    regions: regionsOf([...entry.description.matchAll(/\(([^)]*)\)/g)].map(m => m[1]).join(' ')),
    year: entry.year ?? '',
    proto: UNRELEASED.test(entry.description),
  };
  const candidates = tier === 'direct'
    ? index.filter(candidate => candidate.key === want.key)
    : index.filter(candidate => {
        if (candidate.numbers !== want.numbers) return false;
        const [short, long] = candidate.words.length <= want.words.length
          ? [candidate.words, want.words] : [want.words, candidate.words];
        if (short.length < 2 && !/^\d+$/.test(short[0]) && short[0].length < 10) return false;
        if (!short.every(word => long.includes(word))) return false;
        const prefix = long.slice(0, short.length).join(' ') === short.join(' ');
        return long.length - short.length <= (prefix ? 6 : 2);
      });
  if (!candidates.length) return undefined;

  // MAME names the publisher in the release parenthetical exactly when it is
  // what tells two releases apart — "Pac-Man (USA, Namco)" against the Tengen
  // printing — which is also when two boxes share a title and a region.
  const parenthetical = /\(([^)]*)\)\s*$/.exec(entry.description)?.[1] ?? '';
  const publisher = /,\s*([A-Za-z][\w' .-]*)\s*$/.exec(parenthetical)?.[1]?.trim();
  // Penalties, lowest wins: a plain regional release beats a hack beats nothing.
  const score = (candidate: Boxart): number =>
    (candidate.flagged ? 40 : 0) +                          // [b] bad, [h] hack, [p] pirate, [tr] translation
    (UNRELEASED.test(candidate.file) === want.proto ? 0 : 8) +
    (/virtual console|playchoice|classic series|e-reader|gamecube|animal crossing/i.test(candidate.file) ? 12 : 0) +
    ([...candidate.regions].some(region => want.regions.has(region)) ? 0
      : want.regions.size && candidate.regions.size ? 20 : 6) +
    (publisher && new RegExp(`\\(${escapeRegExp(publisher)}\\)`, 'i').test(candidate.file) ? -3 : 0) +
    // Dated TOSEC-style names settle what a title alone cannot: "G.I. Joe" is
    // the 1991 game, not its 1992 sequel.
    (want.year && candidate.year ? (want.year === candidate.year ? -4 : 7) : 0) +
    // A shorter name is the plain release; the long ones carry alternate
    // printings and translation credits, which are the same box anyway.
    candidate.tags + candidate.file.length / 500 +
    (tier === 'subset' ? Math.abs(candidate.words.length - want.words.length) * 2 : 0);

  const best = [...candidates].sort((left, right) => score(left) - score(right))[0];
  return { file: best.file, via: tier, score: Math.round(score(best) * 100) / 100, matched: best.title };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** The join, written out: which scan each cart got, by which tier, and what missed. */
function writeMapping(): void {
  const rows = wanted.filter(item => item.dump).map(item => {
    const pick = picks.get(item.dump!.name);
    return {
      name: item.dump!.name,
      description: item.dump!.description,
      ...(pick
        ? { via: pick.via, source: pick.file, matched: pick.matched, ...(pick.donor ? { donor: pick.donor } : {}) }
        : { via: 'none' as const }),
    };
  });
  const counts = { direct: 0, subset: 0, sibling: 0, none: 0 };
  for (const row of rows) counts[row.via as keyof typeof counts]++;
  mkdirSync(artDir, { recursive: true });
  writeFileSync(mappingFile, JSON.stringify({
    what_is_here: `Box art for the ${list} ${scope}, fetched from the libretro thumbnail collection and reduced to ${width}px .sticker.webp. One row per cart in scope, including the ones nothing matched.`,
    source: { collection: REPO, cdn: CDN, scans: boxarts.length },
    join: 'MAME softlist description vs libretro release title; see tools/nes-cart-art.ts for the tiers',
    scope, width, quality, counts, carts: rows,
  }, null, 1));
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

// --- plumbing -------------------------------------------------------------------------

async function fetchJson<T>(url: string): Promise<T | undefined> {
  const response = await fetch(url, { headers: githubHeaders() }).catch(() => null);
  if (!response?.ok) {
    console.error(`  ! ${url} -> ${response?.status ?? 'network error'}`);
    return undefined;
  }
  return await response.json() as T;
}

/** One scan, retried: a thousand requests will not all land first time. */
async function download(url: string, attempt = 1): Promise<Uint8Array | undefined> {
  const encoded = url.split('/').map(part => part.includes(':') ? part : encodeURIComponent(part)).join('/');
  const response = await fetch(encoded).catch(() => null);
  if (!response?.ok) {
    if (attempt < 3) {
      await new Promise(resolve => setTimeout(resolve, 400 * attempt));
      return download(url, attempt + 1);
    }
    console.error(`  ! ${encoded} -> ${response?.status ?? 'network error'}`);
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

/** IHDR width, so a scan is never enlarged into its own label. */
function pngWidth(png: Uint8Array): number {
  return png.length > 24 ? new DataView(png.buffer, png.byteOffset).getUint32(16) : 0;
}

function requireCwebp(): void {
  try {
    execFileSync('cwebp', ['-version'], { stdio: 'pipe' });
  } catch {
    fail('cwebp is missing (brew install webp)');
  }
}

function readJson<T>(path: string, why: string): T {
  if (!existsSync(path)) fail(`${path} is missing — ${why}`);
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function rel(path: string): string {
  return path.startsWith(root) ? path.slice(root.length + 1) : path;
}

function flagValue(flag: string): string | undefined {
  const index = argv.indexOf(flag);
  return index >= 0 ? argv[index + 1] : undefined;
}

function fail(message: string): never {
  console.error(`nes-cart-art: ${message}`);
  process.exit(1);
}
