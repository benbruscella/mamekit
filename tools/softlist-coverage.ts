// What of a MAME software list the local shelf actually holds.
//
// The shelf under .data/roms/consoles/<list>/ is named by softlist short name
// (import-new-roms files it that way, by CRC), so coverage is a set difference
// between that directory and hash/<list>.xml -- no hashing, no ROM reads, and
// it runs against the MAME tree rather than a generated catalog so it answers
// for the whole list, including entries the catalog's set_filter drops.
//
// Two numbers, because "missing" means two different things:
//
//   entries  every <software> in the list. 4563 for nes, most of which are
//            regional siblings and revisions of a game already on the shelf.
//   games    entries collapsed onto cloneof, so a parent and its clones count
//            once and any one dump covers the game. This is the number worth
//            reading; entry coverage will never approach 100% and shouldn't.
//
// Verification is deliberately not repeated here: a zip on the shelf carries
// its softlist name because import-new-roms matched every PRG/CHR chip by CRC.
// This tool trusts that and only asks which names are present, which is why it
// is instant over a thousand carts. A zip whose name is in no entry is
// reported as an orphan rather than silently counted.
//
//   node tools/softlist-coverage.ts                    summary for nes
//   node tools/softlist-coverage.ts --missing          + every uncovered game
//   node tools/softlist-coverage.ts --region western   only western releases
//   node tools/softlist-coverage.ts --list snes --missing --csv > gaps.csv
//
// --region filters by the region tags MAME writes into a description's
// parentheses ("... (USA)", "... (Japan, Europe)"). A game passes if ANY of
// its entries carries one of the named regions, so a Japan-only title drops
// out of a western view while a game released both sides stays in.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { parseSoftwareList, type SoftEntry } from '../src/kg/softlist.ts';
import { DATA_DIR } from '../src/paths.ts';

const root = resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const list = flagValue('--list') ?? 'nes';
const showMissing = argv.includes('--missing');
const showHave = argv.includes('--have');
const csv = argv.includes('--csv');
const limit = Number(flagValue('--limit') ?? 0) || Infinity;

if (!/^[a-z0-9_-]+$/i.test(list)) fail(`implausible list "${list}"`);

const mameXml = flagValue('--mame-xml') ?? resolve(root, `../mame/hash/${list}.xml`);
const shelfDir = flagValue('--roms') ?? join(root, DATA_DIR, `roms/consoles/${list}`);

if (!existsSync(mameXml)) {
  fail(`no software list at ${mameXml} -- point --mame-xml at a MAME checkout's hash/${list}.xml`);
}
if (!existsSync(shelfDir)) fail(`no shelf at ${shelfDir} -- pass --roms if it lives elsewhere`);

// Region tags MAME uses, so a stray parenthetical ("rev. A", "prototype") can
// never be mistaken for one. `western` is the shorthand the shelf was built
// around: everything that saw a release outside Japan and Asia.
const WESTERN = [
  'USA', 'Europe', 'World', 'UK', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands',
  'Sweden', 'Norway', 'Denmark', 'Finland', 'Scandinavia', 'Greece', 'Poland', 'Russia',
  'Australia', 'Canada', 'Brazil', 'Mexico', 'Argentina', 'Israel',
];
const EASTERN = ['Japan', 'Asia', 'China', 'Taiwan', 'Korea', 'Hong Kong', 'India'];
const KNOWN_REGIONS = new Set([...WESTERN, ...EASTERN]);

const regionArg = flagValue('--region');
const wantRegions = regionArg
  ? new Set(regionArg.split(',').flatMap(r => {
      const token = r.trim();
      if (/^western$/i.test(token)) return WESTERN;
      if (/^eastern$/i.test(token)) return EASTERN;
      const hit = [...KNOWN_REGIONS].find(k => k.toLowerCase() === token.toLowerCase());
      if (!hit) fail(`unknown region "${token}" -- known: western, eastern, ${[...KNOWN_REGIONS].join(', ')}`);
      return [hit];
    }))
  : null;

const parsed = parseSoftwareList(readFileSync(mameXml, 'utf8'));
if (!parsed.entries.length) fail(`${mameXml} parsed to zero entries -- is it a software list?`);

const owned = new Set(
  readdirSync(shelfDir)
    .filter(f => f.toLowerCase().endsWith('.zip'))
    .map(f => basename(f, '.zip')),
);

// Collapse onto cloneof: a game is whatever a parent name gathers. Clones can
// precede their parent in the file, so grouping is a second pass over a map
// keyed by parent name rather than an in-order fold.
interface Game {
  name: string;
  entries: SoftEntry[];
  regions: Set<string>;
  have: string[];
}
const games = new Map<string, Game>();
for (const entry of parsed.entries) {
  const key = entry.cloneof ?? entry.name;
  const game = games.get(key) ?? { name: key, entries: [], regions: new Set<string>(), have: [] };
  game.entries.push(entry);
  for (const region of regionsOf(entry)) game.regions.add(region);
  if (owned.has(entry.name)) game.have.push(entry.name);
  games.set(key, game);
}

// A parent named by a cloneof that the list itself does not define would give a
// game with no title to print; MAME lists are consistent, so treat it as a bug
// in the input rather than papering over it.
for (const game of games.values()) {
  if (!game.entries.some(e => e.name === game.name)) {
    console.warn(`softlist-coverage: warning: "${game.name}" is a cloneof target with no entry of its own`);
  }
}

const inScope = [...games.values()].filter(g => !wantRegions || [...g.regions].some(r => wantRegions.has(r)));
const covered = inScope.filter(g => g.have.length);
const missing = inScope.filter(g => !g.have.length);

const scopedEntries = inScope.flatMap(g => g.entries);
const ownedEntries = scopedEntries.filter(e => owned.has(e.name));

// Shelf zips matching no entry in the list at all. Region filtering must not
// colour this: a Japan-only dump is still identified, just out of view.
const allNames = new Set(parsed.entries.map(e => e.name));
const orphans = [...owned].filter(n => !allNames.has(n)).sort();

if (csv) {
  const rows = showHave ? covered : missing;
  console.log('status,name,description,year,publisher,regions,entries,owned');
  for (const g of rows.slice(0, limit === Infinity ? rows.length : limit)) {
    const t = title(g);
    console.log([
      g.have.length ? 'have' : 'missing',
      g.name, t.description, t.year, t.publisher,
      [...g.regions].join(' '), String(g.entries.length), g.have.join(' '),
    ].map(csvCell).join(','));
  }
} else {
  const scope = wantRegions ? ` (${regionArg})` : '';
  console.log(`${parsed.name || list}: ${parsed.description}`);
  console.log(`  list   ${mameXml}`);
  console.log(`  shelf  ${shelfDir}  (${owned.size} zip${owned.size === 1 ? '' : 's'})\n`);
  console.log(`games${scope}    ${pct(covered.length, inScope.length)}  -- ${missing.length} uncovered`);
  console.log(`entries${scope}  ${pct(ownedEntries.length, scopedEntries.length)}  -- individual dumps, siblings and revisions included`);
  if (orphans.length) {
    console.log(`\n${orphans.length} shelf zip(s) named by nothing in this list:`);
    for (const n of orphans.slice(0, 20)) console.log(`  ${n}.zip`);
    if (orphans.length > 20) console.log(`  ... and ${orphans.length - 20} more`);
  }

  const rows = showHave ? covered : showMissing ? missing : [];
  if (rows.length) {
    console.log(`\n${showHave ? 'covered' : 'uncovered'} games (${rows.length}), oldest first:`);
    const sorted = rows.sort((a, b) => sortYear(a).localeCompare(sortYear(b)) || a.name.localeCompare(b.name));
    for (const g of sorted.slice(0, limit === Infinity ? sorted.length : limit)) {
      const t = title(g);
      const dumps = g.entries.length > 1 ? ` [${g.entries.length} dumps]` : '';
      console.log(`  ${t.year || '????'}  ${g.name.padEnd(12)} ${t.description}${dumps}`);
    }
    if (sorted.length > limit) console.log(`  ... and ${sorted.length - limit} more (--limit ${sorted.length} for all)`);
  } else if (!showMissing && !showHave) {
    console.log('\n--missing lists the uncovered games, --have the covered ones; --csv for either as a table.');
  }
}

// Undated entries ("19??") sort last rather than first: they are the pirates
// and educational carts, not the earliest releases.
function sortYear(g: Game): string {
  const year = title(g).year;
  return /^\d{4}$/.test(year) ? year : '9999';
}

// The game's name is its parent's, but the parent is often the Japanese
// original -- printing "Atlantis no Nazo (Japan)" in a USA view reads as a
// mistake. Under a region filter the title comes from an entry that actually
// carries a wanted region; the short name stays the parent's either way.
function title(g: Game): SoftEntry {
  const parent = g.entries.find(e => e.name === g.name) ?? g.entries[0];
  if (!wantRegions) return parent;
  const parentRegions = regionsOf(parent);
  if (parentRegions.some(r => wantRegions.has(r))) return parent;
  return g.entries.find(e => regionsOf(e).some(r => wantRegions.has(r))) ?? parent;
}

function regionsOf(entry: SoftEntry): string[] {
  const out: string[] = [];
  for (const tag of entry.description.matchAll(/\(([^()]*)\)/g)) {
    for (const part of tag[1].split(',')) {
      const token = part.trim();
      if (KNOWN_REGIONS.has(token)) out.push(token);
    }
  }
  return out;
}

function pct(n: number, total: number): string {
  const share = total ? (n / total) * 100 : 0;
  return `${n}/${total} (${share.toFixed(1)}%)`;
}

function csvCell(v: string): string {
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

function flagValue(flag: string): string | undefined {
  const at = argv.indexOf(flag);
  return at >= 0 ? argv[at + 1] : undefined;
}

function fail(message: string): never {
  console.error(`softlist-coverage: ${message}`);
  process.exit(1);
}
