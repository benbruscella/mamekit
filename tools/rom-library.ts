// The local data library: what each supported system has, what it is missing,
// and filing whatever is dropped into .data/_input/ -- the one inbox for every
// kind of thing .data holds.
//
//   node tools/rom-library.ts status             per system: every list, BIOS, arcade sets, samples, covers
//   node tools/rom-library.ts missing            name the gaps (--list nes --region western --limit 40 --csv)
//   node tools/rom-library.ts import [--dry-run] [--only roms|samples|artwork|covers] [--replace]
//                                                tidy, then file everything in _input/
//                                                (--replace rewrites covers already filed)
//   node tools/rom-library.ts tidy [--dry-run]   quarantine what nothing supported claims
//   node tools/rom-library.ts samples            sample sets: which are filed and what each lacks
//
// Supported means generated: the systems, their software lists and their BIOS
// sets come from the game contracts and each target's config.json (see
// tools/rom-library/systems.ts), and the lists themselves from MAME's hash/.
// `.data/Makefile` wraps these as `make import`, `make status` and the
// per-kind `roms-*` / `samples-*` targets.
//
// Each input in _input/ is routed by what it holds, never by its name:
//
//   a zip of .wav files         a sample set, filed by the names it covers (rom-library/samples.ts)
//   a zip with a .lay           MAME artwork for an arcade machine: artwork/<game>.zip
//   a zip of images in          a cover archive for that system's software shelves
//     _input/<system>/            (rom-library/covers.ts): artwork/carts/<list>/<name>.webp
//   anything else               dumps, identified chip by chip: size, CRC32 and SHA1
//
// Nothing is ever deleted. An input ends up in exactly one place under _input/:
//
//   _done/          it supplied something the library did not have
//   _duplicate/     everything it matched is already filed
//   _unsupported/   it matched only sets MAME marks unsupported, or no supported machine
//   _incomplete/    it matched chips, but no complete part of any set
//   _unidentified/  it matched nothing
//
// beside _review/ (covers held for a person to accept), _quarantine/ (what
// tidying took off a shelf, logged in quarantine.jsonl) and _reports/ (every
// run's report, <command>-<time>.json). Tidying asks MAME's own -listxml
// (MAME_BIN, or its warm cache) which device sets MAME's run of a supported
// machine needs, so the oracle's Votrax for Q*bert stays filed.

import { appendFileSync, copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { crc32 } from 'node:zlib';
import { checkRomSet, missingRomSets } from '../src/runtime/shell.ts';
import { mameSourceDir, romsDir as romsRoot, samplesDir as samplesRoot } from '../src/paths.ts';
import { walkFile, readZipBytes, type Blob } from './rom-library/archives.ts';
import { identifyBlob, type Piece, type Variant } from './rom-library/identify.ts';
import { hex8, Library, writeZip, type Outcome, type SetChip, type Verdict } from './rom-library/library.ts';
import { coverWants, extractScans, planCovers, shelfCovers, writeCover, zipMembers } from './rom-library/covers.ts';
import { mameRunSets } from './rom-library/mame-run.ts';
import {
  checkSampleSet, identifySampleZip, rootOnly, sampleNeeds, zipSamples,
} from './rom-library/samples.ts';
import { parseRegions, regionsOf, type ListEntry } from './rom-library/softlists.ts';
import { acceptedCrcs, biosKey, criticalRegions, machineSets, type Machine, type System } from './rom-library/systems.ts';
import { aliasRenames, applyTidy, planTidy, type Move, type TidyPlan } from './rom-library/tidy.ts';

const projectRoot = resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const command = argv[0] ?? 'status';
const dryRun = argv.includes('--dry-run');
const csv = argv.includes('--csv');
const limit = Number(flag('--limit') ?? 0) || Infinity;
const regions = flag('--region') ? parseRegions(flag('--region')!) : null;
const listFilter = flag('--list');
const datOut = argv.includes('--dat');

const romsDir = resolve(flag('--roms') ?? romsRoot(projectRoot));
const inbox = resolve(flag('--inbox') ?? join(dirname(romsDir), '_input'));
const quarantineRoot = join(inbox, '_quarantine');
const reviewRoot = join(inbox, '_review');
const mameSrc = flag('--mame') ? resolve(flag('--mame')!) : mameSourceDir(projectRoot);
const distDir = resolve(flag('--dist') ?? join(projectRoot, 'dist'));
const samplesDir = resolve(flag('--samples') ?? samplesRoot(projectRoot));
const artworkDir = resolve(flag('--artwork') ?? join(dirname(romsDir), 'artwork'));
const coverRoot = join(artworkDir, 'carts');
const only = flag('--only');
if (only && !['roms', 'samples', 'artwork', 'covers'].includes(only)) fail(`--only takes roms, samples, artwork or covers, not "${only}"`);

if (!existsSync(join(mameSrc, 'hash'))) fail(`no MAME software lists at ${join(mameSrc, 'hash')} -- pass --mame <checkout>`);
const library = await Library.open({ romsDir, quarantineDir: quarantineRoot, mameSrc, distDir, dryRun });
for (const list of library.missingLists) console.warn(`note: ${list}.xml is not in ${mameSrc}/hash -- that list is skipped`);
if (library.systems.ungenerated.length) {
  console.warn(`note: ${library.systems.ungenerated.join(', ')} not generated -- their BIOS and arcade sets cannot be checked (npm run gen:all)`);
}

// Reads see each list folder under the name tidying gives it, so the counts
// and a dry run agree with what a real run produces.
const plan = planTidy(library, mameRunSets(library.systems, mameSrc, flag('--mame-bin')));
aliasRenames(library, plan);


// --- status -----------------------------------------------------------------

interface Coverage {
  games: { have: number; total: number };
  entries: { have: number; total: number };
  unsupported: number;
  partial: number;
  missing: { name: string; entries: ListEntry[] }[];
  /** every in-scope entry with no set on the shelf: what 100% of entries needs */
  missingEntries: ListEntry[];
  /** filed sets that lack a part (one side of a tape), with the parts they lack */
  partialEntries: { entry: ListEntry; parts: string[] }[];
}

function coverage(listName: string): Coverage {
  const list = library.lists.get(listName)!;
  const dir = library.shelfDir(listName);
  const readable = library.readable(dir);
  const filed = new Set(existsSync(readable) ? readdirSync(readable).filter(file => file.toLowerCase().endsWith('.zip')).map(file => file.slice(0, -4)) : []);
  const scoped = list.entries.filter(entry => entry.supported !== 'no' && (!regions || regionsOf(entry).some(region => regions.has(region))));
  // A game is a parent and its clones: any one dump of it covers it.
  const games = new Map<string, ListEntry[]>();
  for (const entry of scoped) {
    const key = entry.cloneof ?? entry.name;
    games.set(key, [...(games.get(key) ?? []), entry]);
  }
  const shelf = library.shelf(listName)!;
  const inScope = new Set(scoped.map(entry => entry.name));
  const partialEntries = shelf.system.category === 'computers'
    ? library.rows(dir, 'entries').flatMap(row => {
        const entry = list.byName.get(String(row.name));
        const parts = Array.isArray(row.parts) ? row.parts as { name?: string; available?: boolean; features?: Record<string, string> }[] : [];
        const lacking = parts.filter(part => !part.available).map(part => part.features?.part_id ?? part.name ?? '?');
        return entry && inScope.has(entry.name) && lacking.length ? [{ entry, parts: lacking }] : [];
      })
    : [];
  const missingGames = [...games].filter(([, entries]) => !entries.some(entry => filed.has(entry.name)));
  return {
    games: { have: games.size - missingGames.length, total: games.size },
    entries: { have: scoped.filter(entry => filed.has(entry.name)).length, total: scoped.length },
    unsupported: list.entries.filter(entry => entry.supported === 'no').length,
    partial: partialEntries.length,
    missing: missingGames.map(([name, entries]) => ({ name, entries })),
    missingEntries: scoped.filter(entry => !filed.has(entry.name)),
    partialEntries,
  };
}

interface MachineCheck {
  machine: Machine;
  sets: string[];
  missing: string[];
  /** files the check read, relative to .data/roms */
  read: string[];
}

/** Does the shelf hold everything the machine needs, looked up the way the shell fetches it? */
function checkMachine(system: System, machine: Machine): MachineCheck | null {
  const sets = machineSets(machine);
  if (!sets.length || !machine.config) return null;
  const dir = biosKey(system);
  const family = system.category === 'arcade' ? undefined : system.key.split('/').pop();
  const files = new Map<string, Uint8Array>();
  const read: string[] = [];
  const candidates = [
    [machine.game, ...(family && family !== machine.game ? [family] : [])],
    ...sets.slice(1).map(set => [set]),
  ];
  for (const names of candidates) {
    for (const name of names) {
      const path = join(romsDir, dir, `${name}.zip`);
      if (!existsSync(path)) continue;
      try {
        for (const [member, bytes] of readZipBytes(readFileSync(path))) if (!files.has(member)) files.set(member, bytes);
        read.push(relative(romsDir, path));
        break;
      } catch { /* unreadable: reported missing */ }
    }
  }
  const critical = criticalRegions(machine.config);
  const check = checkRomSet(machine.config.roms, files, critical);
  const missingSets = check.missingCritical.length ? missingRomSets(machine.config.roms, files, critical, machine.game) : [];
  return { machine, sets, missing: missingSets, read };
}

/** BIOS zips beside the required ones that a machine accepts as clone revisions. */
function alternates(system: System, required: Set<string>): string[] {
  const dir = join(romsDir, biosKey(system));
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(file => file.toLowerCase().endsWith('.zip') && !required.has(file.slice(0, -4))).filter(file => {
    try {
      const crcs = [...readZipBytes(readFileSync(join(dir, file))).values()].map(bytes => hex8(crc32(bytes)));
      return system.machines.some(machine => machine.config && crcs.some(crc => acceptedCrcs(machine.config!.roms).has(crc)));
    } catch { return false; }
  }).map(file => file.slice(0, -4));
}

function status(): void {
  const pending = (system: System) => plan.moves.filter(move => move.kind === 'bios' && move.to.startsWith(join(romsDir, system.key) + '/'));
  console.log(`ROM library  ${relative(projectRoot, romsDir) || '.'}   lists from ${relative(projectRoot, join(mameSrc, 'hash'))}\n`);
  const rows: string[][] = [];
  for (const system of library.systems.systems) {
    if (system.category === 'arcade') {
      const checks = system.machines.map(machine => checkMachine(system, machine)).filter(Boolean) as MachineCheck[];
      const missing = checks.filter(check => check.missing.length);
      rows.push(['arcade', 'sets', `${checks.length - missing.length}/${checks.length} machines`, pct(checks.length - missing.length, checks.length),
        missing.length
          ? `missing: ${missing.slice(0, 12).map(check => check.machine.game).join(' ')}${missing.length > 12 ? ` ... +${missing.length - 12} (make roms-missing LIST=arcade)` : ''}`
          : 'every supported board has its sets']);
      continue;
    }
    for (const listName of system.lists) {
      if (!library.lists.has(listName)) continue;
      const cover = coverage(listName);
      rows.push([
        system.key, listName,
        `games ${cover.games.have}/${cover.games.total}`, pct(cover.games.have, cover.games.total),
        `entries ${cover.entries.have}/${cover.entries.total}` +
          (cover.partial ? `, ${cover.partial} partial` : '') +
          (cover.unsupported ? `  (${cover.unsupported} MAME-unsupported not counted)` : ''),
      ]);
    }
    if (system.category === 'computers') rows.push(coverRow(system));
    const checks = system.machines.map(machine => checkMachine(system, machine)).filter(Boolean) as MachineCheck[];
    if (!checks.length) { rows.push([system.key, 'bios', 'none needed', '', '']); continue; }
    const required = new Set(checks.flatMap(check => check.read.map(path => path.split('/').pop()!.slice(0, -4))));
    const extra = alternates(system, required);
    const loose = pending(system);
    rows.push([system.key, 'bios',
      checks.map(check => `${check.machine.game} ${check.missing.length ? `MISSING ${check.missing.map(set => `${set}.zip`).join(' ')}` : 'ok'}`).join(', '), '',
      [extra.length ? `alternates: ${extra.join(' ')}` : '', loose.length ? `${loose.length} set${loose.length === 1 ? '' : 's'} loose in ${system.category}/ (roms-tidy files ${loose.length === 1 ? 'it' : 'them'})` : ''].filter(Boolean).join('; '),
    ]);
  }
  rows.push(sampleRow());
  printTable(rows);

  const waiting = inboxFiles(inbox);
  const held = existsSync(reviewRoot) ? inboxFiles(reviewRoot, false).length : 0;
  const quarantine = plan.moves.filter(move => move.kind === 'quarantine');
  console.log('');
  console.log(`inbox       ${shown(inbox)}/: ${waiting.length ? `${waiting.length} file(s) waiting -- make import DRY=1, then make import` : 'empty'}`);
  if (held) console.log(`review      ${shown(reviewRoot)}/: ${held} cover(s) held -- move one into ${shown(coverRoot)}/<list>/ to accept it`);
  console.log(`tidy        ${plan.moves.length ? `${quarantine.length} to quarantine, ${plan.moves.length - quarantine.length} to refile -- make roms-tidy DRY=1 lists them` : 'nothing to do'}`);
  if (regions) console.log(`region      only entries tagged ${flag('--region')}`);
}

/** The status table's covers row: how many of a computer's shelved titles have a cover. */
function coverRow(system: System): string[] {
  const wants = coverWants(system, distDir);
  const lists = [...new Set(wants.map(want => want.list))];
  const have = new Map(lists.map(list => [list, shelfCovers(coverRoot, list)]));
  const covered = wants.filter(want => have.get(want.list)!.has(want.name));
  return [system.key, 'covers', `titles ${covered.length}/${wants.length}`, pct(covered.length, wants.length),
    wants.length
      ? lists.map(list => `${list} ${covered.filter(want => want.list === list).length}/${wants.filter(want => want.list === list).length}`).join(', ')
      : 'no generated shelves'];
}

/** The status table's samples row: every set a supported machine needs, and how its zip answers. */
function sampleRow(): string[] {
  const checks = sampleNeeds(library.systems).map(need => checkSampleSet(samplesDir, need));
  const complete = checks.filter(check => check.path && !check.missing.length);
  const short = checks.filter(check => !check.path || check.missing.length);
  return ['samples', 'sets', `${complete.length}/${checks.length} sets`, pct(complete.length, checks.length),
    !checks.length ? 'no supported machine plays samples'
      : short.length ? short.map(check => `${check.need.set} ${describeShort(check)}`).join(', ')
      : `${checks.map(check => check.need.set).join(' ')} complete (${shown(samplesDir)}/)`];
}

function describeShort(check: ReturnType<typeof checkSampleSet>): string {
  if (!check.path) return `MISSING ${check.need.set}.zip (for ${check.need.machines.join(' ')})`;
  if (check.problem) return `UNREADABLE (${check.problem})`;
  return `lacks ${check.missing.join(' ')}`;
}

// --- missing ----------------------------------------------------------------

function missing(): void {
  const lists = library.systems.systems.flatMap(system => system.category === 'arcade' ? [] : system.lists)
    .filter(list => library.lists.has(list) && (!listFilter || listFilter === list));
  const csvRows: string[][] = [];
  if (!listFilter || listFilter === 'arcade' || listFilter === 'bios') {
    for (const system of library.systems.systems) {
      if (listFilter === 'arcade' && system.category !== 'arcade') continue;
      if (listFilter === 'bios' && system.category === 'arcade') continue;
      for (const check of system.machines.map(machine => checkMachine(system, machine)).filter(Boolean) as MachineCheck[]) {
        if (!check.missing.length) continue;
        if (csv) csvRows.push(['set', system.key, check.machine.game, check.missing.join(' '), '', '']);
        else console.log(`${system.key.padEnd(18)} ${check.machine.game.padEnd(12)} needs ${check.missing.map(set => {
          const want = join(romsDir, biosKey(system), `${set}.zip`);
          const loose = plan.moves.find(move => move.kind === 'bios' && move.to === want);
          return `${biosKey(system)}/${set}.zip${loose ? ` (loose at ${relative(romsDir, loose.from)} -- make roms-tidy files it)` : ''}`;
        }).join(', ')}`);
      }
    }
  }
  for (const listName of lists) {
    const cover = coverage(listName);
    const sorted = cover.missing.map(game => ({ game, title: title(game) }))
      .sort((a, b) => sortYear(a.title).localeCompare(sortYear(b.title)) || a.game.name.localeCompare(b.game.name));
    if (csv) {
      for (const { game, title: entry } of sorted.slice(0, limit)) {
        csvRows.push(['software', listName, game.name, entry.description, entry.year, entry.publisher]);
      }
      continue;
    }
    console.log(`\n${listName}: ${sorted.length} of ${cover.games.total} games missing, ` +
      `${cover.missingEntries.length} of ${cover.entries.total} entries${regions ? ` (${flag('--region')})` : ''}, oldest first`);
    for (const { game, title: entry } of sorted.slice(0, limit)) {
      const dumps = game.entries.length > 1 ? `  [${game.entries.length} entries]` : '';
      console.log(`  ${(entry.year || '????').padEnd(4)}  ${game.name.padEnd(12)} ${entry.description}${dumps}`);
    }
    if (sorted.length > limit) console.log(`  ... and ${sorted.length - limit} more (LIMIT=${sorted.length} for all)`);
    for (const { entry, parts } of cover.partialEntries.slice(0, limit)) {
      console.log(`  partial  ${entry.name.padEnd(12)} ${entry.description}  -- lacks ${parts.join(', ')}`);
    }
    if (datOut) {
      const wanted = [...cover.missingEntries, ...cover.partialEntries.map(partial => partial.entry)];
      const path = writeWantDat(listName, wanted);
      console.log(`  want list: ${relative(process.cwd(), path)} (${wanted.length} sets, every chip's size, CRC32 and SHA1)`);
    }
  }
  if (csv) {
    console.log('kind,system,name,description,year,publisher');
    for (const row of csvRows) console.log(row.map(csvCell).join(','));
  }
}

/**
 * A Logiqx DAT of the sets a list still lacks: the want list every ROM manager
 * (clrmamepro, RomVault, igir) reads, so collections and cartridge dumps the
 * user already has can be checked against it chip for chip.
 */
function writeWantDat(listName: string, entries: ListEntry[]): string {
  const list = library.lists.get(listName)!;
  const attr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const text = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const scope = regions ? ` (${flag('--region')})` : '';
  const lines = [
    '<?xml version="1.0"?>',
    '<!DOCTYPE datafile PUBLIC "-//Logiqx//DTD ROM Management Datafile//EN" "http://www.logiqx.com/Dats/datafile.dtd">',
    '<datafile>',
    '  <header>',
    `    <name>${text(`${listName} -- missing from the mamekit library${scope}`)}</name>`,
    `    <description>${text(`${list.description}: ${entries.length} sets not yet on the shelf${scope}`)}</description>`,
    `    <version>${text(list.sha1.slice(0, 12))}</version>`,
    `    <comment>${text(`generated from ${relative(projectRoot, list.path)} by tools/rom-library.ts`)}</comment>`,
    '  </header>',
  ];
  for (const entry of entries) {
    lines.push(`  <game name="${attr(entry.name)}"${entry.cloneof ? ` cloneof="${attr(entry.cloneof)}"` : ''}>`);
    lines.push(`    <description>${text(entry.description)}</description>`);
    if (entry.year) lines.push(`    <year>${text(entry.year)}</year>`);
    if (entry.publisher) lines.push(`    <manufacturer>${text(entry.publisher)}</manufacturer>`);
    for (const part of entry.parts) {
      for (const area of part.areas) {
        for (const rom of area.roms) {
          lines.push(`    <rom name="${attr(rom.name)}" size="${rom.size}" crc="${rom.crc}"${rom.sha1 ? ` sha1="${rom.sha1}"` : ''}/>`);
        }
      }
    }
    lines.push('  </game>');
  }
  lines.push('</datafile>', '');
  const dir = join(inbox, '_reports');
  mkdirSync(dir, { recursive: true });
  const regionTag = regions ? `-${flag('--region')!.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}` : '';
  const path = join(dir, `missing-${listName}${regionTag}.dat`);
  writeFileSync(path, lines.join('\n'));
  return path;
}

/** A game's title: its parent's, unless a region view wants a clone's own. */
function title(game: { name: string; entries: ListEntry[] }): ListEntry {
  const parent = game.entries.find(entry => entry.name === game.name) ?? game.entries[0]!;
  if (!regions || regionsOf(parent).some(region => regions.has(region))) return parent;
  return game.entries.find(entry => regionsOf(entry).some(region => regions.has(region))) ?? parent;
}

// Undated entries ("19??") sort last: they are pirates and homebrew, not the earliest releases.
function sortYear(entry: ListEntry): string {
  return /^\d{4}$/.test(entry.year) ? entry.year : '9999';
}

// --- tidy -------------------------------------------------------------------

function tidy(): TidyPlan {
  for (const note of plan.notes) console.log(`  note       ${note}`);
  if (!plan.moves.length) { console.log('tidy: every shelf holds only what a supported machine uses'); return plan; }
  const label: Record<Move['kind'], string> = { rename: 'rename', bios: 'to bios', quarantine: 'quarantine' };
  for (const move of plan.moves) {
    console.log(`  ${label[move.kind].padEnd(10)} ${relative(romsDir, move.from)}  ->  ${relative(romsDir, move.to)}\n${' '.repeat(13)}${move.reason}`);
  }
  const counts = countBy(plan.moves.map(move => label[move.kind]));
  console.log(`\n${dryRun ? '[dry run] ' : ''}tidy: ${Object.entries(counts).map(([kind, n]) => `${n} ${kind}`).join(', ')}`);
  if (!dryRun) applyTidy(library, plan.moves);
  writeReport('tidy', {
    notes: plan.notes,
    moves: plan.moves.map(move => ({ ...move, from: relative(romsDir, move.from), to: relative(romsDir, move.to), ...(move.shelf ? { shelf: relative(romsDir, move.shelf) } : {}) })),
  });
  return plan;
}

// --- import -----------------------------------------------------------------

const BUCKETS: Record<Verdict | 'unidentified', string> = {
  imported: '_done', duplicate: '_duplicate', unsupported: '_unsupported', incomplete: '_incomplete', unidentified: '_unidentified',
};

type Route = 'roms' | 'samples' | 'artwork' | 'covers';
const IMAGE_MEMBER = /\.(jpe?g|png|gif|webp|bmp)$/i;
/** What a scan archive carries beside its images: a scanner's index, a readme. */
const IMAGE_SIDECAR = /(^|\/)(thumbs\.db|\.ds_store|[^/]*\.(txt|nfo|diz|htm|html|url))$/i;

/** The system an input's top folder names (`c64/Cover.zip` -> computers/c64), for scoping covers. */
function systemFolder(rel: string): System | undefined {
  const top = rel.split(sep)[0]!;
  if (top === rel) return undefined;
  return library.systems.systems.find(system => system.category !== 'arcade' && system.key.split('/').pop() === top);
}

/** Route an input by what it holds; reading a zip's directory, never the whole archive. */
function routeOf(input: string): Route {
  if (!/\.zip$/i.test(input)) return 'roms';
  const members = zipMembers(input)?.filter(member => !member.endsWith('/'));
  if (!members?.length) return 'roms';
  if (members.every(member => /\.wav$/i.test(member))) return 'samples';
  if (members.some(member => /\.lay$/i.test(member))) return 'artwork';
  const content = members.filter(member => !IMAGE_SIDECAR.test(member));
  if (content.length && content.every(member => IMAGE_MEMBER.test(member))) return 'covers';
  return 'roms';
}

async function importInbox(): Promise<void> {
  // An audit of a mixed C64 inbox, made outside this tool, files through its
  // own checker (tools/process-rom-audit.ts) into the same manifest shape.
  if (flag('--audit')) {
    const { processRomAudit } = await import('./process-rom-audit.ts');
    await processRomAudit({
      auditPath: resolve(flag('--audit')!),
      ...(flag('--input') ? { inputDir: resolve(flag('--input')!) } : {}),
      ...(flag('--output') ? { outputDir: resolve(flag('--output')!) } : {}),
      dryRun,
    });
    return;
  }
  if (!only || only === 'roms') {
    console.log('== tidy');
    tidy();
  }
  if (!existsSync(inbox)) fail(`${inbox} does not exist -- create it and drop things in`);
  const routed = new Map<Route, string[]>();
  for (const input of inboxFiles(inbox)) {
    const route = routeOf(input);
    routed.set(route, [...(routed.get(route) ?? []), input]);
  }
  const take = (route: Route) => !only || only === route ? routed.get(route) ?? [] : [];
  const counts = [...routed].map(([route, inputs]) => `${inputs.length} ${route}`).join(', ');
  console.log(`\n== import ${shown(inbox)}/: ${counts || 'nothing waiting'}${only ? ` (only ${only})` : ''}`);
  const report: Record<string, unknown> = {};
  if (take('samples').length) report.samples = importSamples(take('samples'));
  if (take('artwork').length) report.artwork = importArtwork(take('artwork'));
  if (take('covers').length) report.covers = importCovers(take('covers'));
  if (take('roms').length) report.roms = await importRoms(take('roms'));
  const path = writeReport('import', report);
  console.log(`\nreport: ${relative(process.cwd(), path)}`);
}

async function importRoms(inputs: string[]): Promise<Record<string, unknown>[]> {
  console.log(`\n== roms: ${inputs.length} input(s)`);
  const report: Record<string, unknown>[] = [];
  const totals = { imported: 0, duplicate: 0, unsupported: 0, incomplete: 0, unidentified: 0 };
  for (const input of inputs) {
    const rel = relative(inbox, input);
    const pools = new Map<string, { pieces: Piece[]; variants: Variant[]; chips: SetChip[] }>();
    const outcomes: Outcome[] = [];
    const unmatched: string[] = [];
    const problems: { path: string; message: string }[] = [];
    let files = 0;
    const started = Date.now();
    await walkFile(input, rel, {
      blob(blob: Blob, pool: string) {
        files++;
        const found = identifyBlob(blob, library.identifier);
        // A chip of an arcade board, a BIOS or a device: filed as a machine set.
        const setChip = library.isSetChip(hex8(crc32(blob.bytes)));
        if (!found.pieces.length && !found.variants.length && !setChip) { unmatched.push(blob.path); return; }
        const acc = pools.get(pool) ?? { pieces: [], variants: [], chips: [] };
        acc.pieces.push(...found.pieces);
        acc.variants.push(...found.variants);
        if (setChip) acc.chips.push({ name: blob.name, path: blob.path, bytes: blob.bytes });
        pools.set(pool, acc);
      },
      endPool(pool: string) {
        const acc = pools.get(pool);
        pools.delete(pool);
        if (!acc) return;
        const found = [...library.filePool(acc.pieces, acc.variants), ...(acc.chips.length ? library.fileMachineSets(acc.chips, pool) : [])];
        // A set this archive merely shares a chip with -- Dig Dug's sound PROM in
        // galaga.zip -- is not a partial dump of it; only report what nothing
        // complete in the archive already explains.
        const explained = new Set(found.filter(outcome => outcome.verdict !== 'incomplete').flatMap(outcome => outcome.chips ?? []));
        for (const outcome of found) {
          if (outcome.verdict === 'incomplete' && (outcome.chips ?? []).every(chip => explained.has(chip))) continue;
          const { chips: _chips, ...reported } = outcome;
          outcomes.push(reported);
        }
      },
      problem(path: string, message: string) { problems.push({ path, message }); },
    });
    library.flush();
    const counts = countBy(outcomes.map(outcome => outcome.verdict));
    const verdict: Verdict | 'unidentified' = (['imported', 'duplicate', 'unsupported', 'incomplete'] as const).find(kind => counts[kind]) ?? 'unidentified';
    const parked = park(input, rel, BUCKETS[verdict]);
    for (const kind of Object.keys(totals) as (keyof typeof totals)[]) totals[kind] += kind === 'unidentified' ? unmatched.length : counts[kind] ?? 0;

    console.log(`\n${rel}  (${files} file${files === 1 ? '' : 's'}, ${((Date.now() - started) / 1000).toFixed(1)}s)  ->  ${shown(parked)}`);
    const imported = outcomes.filter(outcome => outcome.verdict === 'imported');
    for (const outcome of imported.slice(0, 40)) {
      console.log(`  + ${`${outcome.list}:${outcome.name}`.padEnd(26)} ${outcome.description}  (${outcome.detail})`);
    }
    if (imported.length > 40) console.log(`  + ... and ${imported.length - 40} more (see the report)`);
    const summary = [
      `${counts.imported ?? 0} imported`, `${counts.duplicate ?? 0} already filed`,
      ...(counts.unsupported ? [`${counts.unsupported} MAME-unsupported`] : []),
      ...(counts.incomplete ? [`${counts.incomplete} incomplete`] : []),
      `${unmatched.length} file(s) matched nothing`,
      ...(problems.length ? [`${problems.length} unreadable`] : []),
    ];
    console.log(`  ${summary.join(', ')}`);
    report.push({ input: rel, parked: shown(parked), files, outcomes, unmatched, problems });
  }
  console.log(`\n${dryRun ? '[dry run] ' : ''}roms: ${totals.imported} set(s) imported, ${totals.duplicate} already filed, ` +
    `${totals.unsupported} MAME-unsupported, ${totals.incomplete} incomplete, ${totals.unidentified} file(s) matched nothing`);
  return report;
}

/**
 * MAME artwork: a zip holding a layout, named for the machine it dresses. It
 * is filed as it is -- artwork/<game>.zip, moved rather than copied, since the
 * filed zip is the input -- and the build resolves its bezel (src/gen/bezel-artwork.ts).
 */
function importArtwork(inputs: string[]): Record<string, unknown>[] {
  console.log(`\n== artwork: ${inputs.length} input(s)`);
  const games = new Set([
    ...library.systems.systems.filter(system => system.category === 'arcade').flatMap(system => system.machines.map(machine => machine.game)),
    ...library.systems.parked,
  ]);
  const report: Record<string, unknown>[] = [];
  for (const input of inputs) {
    const rel = relative(inbox, input);
    const game = basename(input).replace(/\.zip$/i, '').toLowerCase();
    const filed = join(artworkDir, `${game}.zip`);
    let outcome: 'filed' | 'duplicate' | 'unsupported';
    let detail: string;
    let parked: string | undefined;
    if (!games.has(game)) {
      outcome = 'unsupported';
      detail = `no supported arcade machine is named ${game}; rename it to the machine it dresses`;
      parked = park(input, rel, '_unsupported');
    } else if (existsSync(filed)) {
      outcome = 'duplicate';
      const same = readFileSync(filed).equals(readFileSync(input));
      detail = same ? `${shown(filed)} is already filed` : `${shown(filed)} is filed and differs; the filed one is kept (replace it by hand)`;
      parked = park(input, rel, '_duplicate');
    } else {
      outcome = 'filed';
      detail = `artwork for ${game}`;
      if (!dryRun) { mkdirSync(artworkDir, { recursive: true }); renameSync(input, filed); }
    }
    console.log(`  ${outcome.padEnd(12)} ${rel.padEnd(28)} ${detail}${parked ? `  ->  ${shown(parked)}` : `  ->  ${shown(filed)}`}`);
    report.push({ input: rel, outcome, detail, ...(parked ? { parked: shown(parked) } : { filed: shown(filed) }) });
  }
  return report;
}

/**
 * Cover archives: a zip of scans in _input/<system>/, matched by title to the
 * system's software shelves (rom-library/covers.ts). One that sits in no
 * system's folder is parked unidentified -- its scans name titles, not machines.
 */
function importCovers(inputs: string[]): Record<string, unknown>[] {
  const report: Record<string, unknown>[] = [];
  const unscoped = inputs.filter(input => !systemFolder(relative(inbox, input)));
  for (const input of unscoped) {
    const rel = relative(inbox, input);
    const parked = park(input, rel, '_unidentified');
    const systems = library.systems.systems.filter(system => system.category === 'computers').map(system => system.key.split('/').pop());
    console.log(`\n== covers ${rel}: a zip of images in no system's folder  ->  ${shown(parked)}\n` +
      `   move it into ${shown(inbox)}/<system>/ (${systems.join(', ')}) and import again`);
    report.push({ input: rel, outcome: 'unidentified', parked: shown(parked), detail: 'images in no system folder' });
  }
  for (const input of inputs.filter(input => systemFolder(relative(inbox, input)))) {
    const rel = relative(inbox, input);
    const system = systemFolder(rel)!;
    const wanted = coverWants(system, distDir);
    console.log(`\n== covers ${rel}: for ${system.key}`);
    if (!wanted.length) {
      const parked = park(input, rel, '_unsupported');
      console.log(`   ${system.key} has no generated software shelves (npm run gen:all)  ->  ${shown(parked)}`);
      report.push({ input: rel, outcome: 'unsupported', parked: shown(parked), detail: `${system.key} has no generated shelves` });
      continue;
    }
    const replace = argv.includes('--replace');
    const plan = planCovers(zipMembers(input) ?? [], wanted, coverRoot, reviewRoot, replace);
    const held = replace ? [] : plan.review.filter(item => existsSync(item.dest));
    const review = replace ? plan.review : plan.review.filter(item => !existsSync(item.dest));
    for (const list of [...new Set(wanted.map(want => want.list))]) {
      const of = (items: { list: string }[]) => items.filter(item => item.list === list).length;
      console.log(`   ${list.padEnd(14)} ${String(of(plan.present.concat(plan.write.map(item => item.want)))).padStart(4)} of ${String(of(wanted)).padStart(4)} titles covered` +
        `  (${of(plan.write.map(item => item.want))} new, ${of(plan.review.map(item => item.want))} to review, ${of(plan.unmatched)} without a scan)`);
    }
    for (const item of plan.write.slice(0, 6)) console.log(`   + ${item.want.list}/${item.want.name}  <-  ${item.scan}`);
    for (const item of review.slice(0, 6)) console.log(`   ? ${item.want.list}/${item.want.name} (${item.want.publisher})  ~  ${item.scan}`);
    const problems: { scan: string; message: string }[] = [];
    let written = 0;
    let cropped = 0;
    let bytes = 0;
    if (!dryRun && (plan.write.length || review.length)) {
      const scans = extractScans(input, [...plan.write, ...review].map(item => item.scan));
      for (const item of [...plan.write, ...review]) {
        try {
          const out = writeCover(input, item.scan, item.dest, scans.path(item.scan));
          written++;
          bytes += out.bytes;
          if (out.cropped) cropped++;
        } catch (error) {
          problems.push({ scan: item.scan, message: error instanceof Error ? error.message.split('\n')[0]! : String(error) });
        }
      }
      scans.done();
    }
    const useful = plan.write.length || plan.review.length || plan.present.length;
    const parked = park(input, rel, useful ? '_done' : '_unidentified');
    const covers = plan.write.length;
    console.log(`   ${dryRun ? '[dry run] ' : ''}${covers} cover(s) to ${shown(coverRoot)}/, ${review.length} to ${shown(reviewRoot)}/` +
      `${held.length ? ` (${held.length} already there)` : ''}, ${plan.present.length} already filed, ${plan.unmatched.length} without a scan` +
      (dryRun ? '' : `; wrote ${written} (${(bytes / 1e6).toFixed(1)} MB, ${cropped} cropped from an inlay)`) +
      (problems.length ? `, ${problems.length} unreadable` : '') + `  ->  ${shown(parked)}`);
    if (!dryRun && covers) recordSource(basename(input), system, plan.write.length);
    report.push({
      input: rel, system: system.key, parked: shown(parked),
      written: plan.write.map(item => ({ list: item.want.list, name: item.want.name, scan: item.scan })),
      review: plan.review.map(item => ({ list: item.want.list, name: item.want.name, publisher: item.want.publisher, scan: item.scan, file: shown(item.dest) })),
      unmatched: plan.unmatched.map(want => ({ list: want.list, name: want.name, description: want.description })),
      problems,
    });
  }
  return report;
}

/** artwork/SOURCES.md is where every scan's provenance is written down. */
function recordSource(archive: string, system: System, count: number): void {
  const path = join(artworkDir, 'SOURCES.md');
  const day = new Date().toISOString().slice(0, 10);
  const heading = '## Software shelf covers';
  let text = existsSync(path) ? readFileSync(path, 'utf8') : '# Local artwork sources\n';
  if (!text.includes(heading)) {
    text += `\n${heading}\n\nFiled by \`make import\` from cover archives dropped in \`.data/_input/<system>/\` (tools/rom-library/covers.ts).\n\n| Date | Archive | System | Covers |\n|---|---|---|---:|\n`;
  }
  writeFileSync(path, `${text.trimEnd()}\n| ${day} | \`${archive}\` | ${system.key} | ${count} |\n`);
}

/** Inputs below the inbox, skipping the folders this command parks into. */
function inboxFiles(dir: string, top = true): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter(entry => !entry.name.startsWith('.') && !(top && entry.name.startsWith('_')))
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(entry => entry.isDirectory() ? inboxFiles(join(dir, entry.name), false) : entry.isFile() ? [join(dir, entry.name)] : []);
}

/** Move an input out of the inbox into its bucket, never over an earlier run's file. */
function park(input: string, rel: string, bucket: string): string {
  let dest = join(inbox, bucket, rel);
  for (let n = 2; existsSync(dest); n++) dest = join(inbox, bucket, `${rel}.${n}`);
  if (dryRun) return dest;
  mkdirSync(dirname(dest), { recursive: true });
  renameSync(input, dest);
  // An emptied subfolder of the inbox is left as it was: removing it is not this tool's call.
  return dest;
}

function writeReport(kind: string, body: Record<string, unknown>): string {
  const dir = join(inbox, '_reports');
  mkdirSync(dir, { recursive: true });
  const path = join(dir, `${kind}${dryRun ? '-dry-run' : ''}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  writeFileSync(path, `${JSON.stringify({ command: kind, dryRun, at: new Date().toISOString(), ...body }, null, 2)}\n`);
  return path;
}

// --- samples ----------------------------------------------------------------

/** `samples`: each needed set, its machines and what its zip lacks. */
function samples(): void {
  const needs = sampleNeeds(library.systems);
  console.log(`sample sets  ${shown(samplesDir)}/\n`);
  if (!needs.length) { console.log('no supported machine plays samples'); return; }
  for (const check of needs.map(need => checkSampleSet(samplesDir, need))) {
    const state = !check.path || check.missing.length || check.problem ? describeShort(check) : 'ok';
    console.log(`  ${`${check.need.set}.zip`.padEnd(16)} ${String(check.need.names.length).padStart(3)} names  for ${check.need.machines.join(' ').padEnd(16)} ${state}`);
  }
}

const SAMPLE_BUCKETS = { imported: '_done', duplicate: '_duplicate', incomplete: '_incomplete', unidentified: '_unidentified' } as const;

/**
 * Sample sets: file each zip of .wav files as the <set>.zip it covers. The
 * input parks in an outcome folder of the inbox; the filed copy is the input
 * itself when MAME can read it as it is, or a rebuild with the samples moved
 * to the zip's root when they sat in a folder. A filed set that lacked names
 * is replaced, and moves to _input/_quarantine/samples/.
 */
function importSamples(inputs: string[]): Record<string, unknown>[] {
  const needs = sampleNeeds(library.systems);
  console.log(`\n== samples: ${inputs.length} input(s), ${needs.length} set(s) needed`);
  const report: Record<string, unknown>[] = [];
  const totals = { imported: 0, duplicate: 0, incomplete: 0, unidentified: 0 };
  for (const input of inputs) {
    const name = basename(input);
    const rel = relative(inbox, input);
    const stem = name.replace(/\.zip$/i, '');
    let held: ReturnType<typeof zipSamples> | undefined;
    let problem: string | undefined;
    try {
      held = name.toLowerCase().endsWith('.zip') ? zipSamples(readFileSync(input)) : undefined;
      if (!held) problem = 'not a zip';
    } catch (error) {
      problem = error instanceof Error ? error.message : String(error);
    }
    const verdict = held ? identifySampleZip(held, stem, needs) : { kind: 'unidentified' as const };
    let outcome: keyof typeof SAMPLE_BUCKETS = 'unidentified';
    let detail = problem ?? 'its samples are no supported machine\'s';
    let filed: string | undefined;
    let replaced: string | undefined;
    if (verdict.kind === 'ambiguous') {
      detail = `covers ${verdict.needs.map(need => need.set).join(' and ')}; rename it to the set it is`;
    } else if (verdict.kind === 'incomplete') {
      outcome = 'incomplete';
      detail = `${verdict.need.set} lacks ${verdict.missing.join(' ')}`;
    } else if (verdict.kind === 'complete') {
      const current = checkSampleSet(samplesDir, verdict.need);
      if (current.path && !current.missing.length) {
        outcome = 'duplicate';
        detail = `${verdict.need.set}.zip is already filed and complete`;
      } else {
        outcome = 'imported';
        filed = join(samplesDir, `${verdict.need.set}.zip`);
        detail = `${verdict.need.set}: all ${verdict.need.names.length} sample(s) for ${verdict.need.machines.join(' ')}`;
        if (current.path) {
          replaced = join(quarantineRoot, 'samples', `${verdict.need.set}.zip`);
          detail += ` (replaces a set that ${current.problem ? 'could not be read' : `lacked ${current.missing.join(' ')}`})`;
        }
        if (!dryRun) {
          if (current.path) replaced = quarantineSample(current.path, `replaced by ${rel} from _input/: ${current.problem ?? `lacked ${current.missing.join(' ')}`}`);
          fileSampleSet(input, held!, filed);
        }
      }
    }
    totals[outcome]++;
    const parked = park(input, rel, SAMPLE_BUCKETS[outcome]);
    console.log(`  ${outcome.padEnd(12)} ${rel.padEnd(20)} ${detail}`);
    report.push({
      input: rel, outcome, detail, parked: shown(parked),
      ...(filed ? { filed: relative(samplesDir, filed) } : {}),
      ...(replaced ? { replaced: relative(samplesDir, replaced) } : {}),
      ...(verdict.kind === 'incomplete' ? { set: verdict.need.set, missing: verdict.missing } : {}),
      ...(verdict.kind === 'complete' ? { set: verdict.need.set } : {}),
      ...(held ? { samples: [...held.keys()] } : {}),
    });
  }
  console.log(`\n${dryRun ? '[dry run] ' : ''}samples: ${totals.imported} imported, ${totals.duplicate} already filed, ` +
    `${totals.incomplete} incomplete, ${totals.unidentified} unidentified`);
  return report;
}

/** Copy a set into place as MAME reads it: samples at the zip's root. */
function fileSampleSet(input: string, held: ReturnType<typeof zipSamples>, to: string): void {
  mkdirSync(dirname(to), { recursive: true });
  if (rootOnly(held).size === held.size) { copyFileSync(input, to); return; }
  const members = readZipBytes(readFileSync(input));
  const flat = new Map<string, Uint8Array>();
  for (const [member, bytes] of members) {
    const name = basename(member);
    if (name && !flat.has(name)) flat.set(name, bytes);
  }
  writeFileSync(to, writeZip(flat));
}

function quarantineSample(path: string, reason: string): string {
  const planned = join(quarantineRoot, 'samples', basename(path));
  let to = planned;
  for (let n = 2; existsSync(to); n++) to = `${planned}.${n}`;
  mkdirSync(dirname(to), { recursive: true });
  renameSync(path, to);
  appendFileSync(join(quarantineRoot, 'quarantine.jsonl'), `${JSON.stringify({
    at: new Date().toISOString(), from: join('samples', relative(samplesDir, path)), to: join(basename(quarantineRoot), relative(quarantineRoot, to)), reason,
  })}\n`);
  return to;
}

// --- helpers ----------------------------------------------------------------

/** A path as the reader knows it: below .data, else absolute. */
function shown(path: string): string {
  const inside = relative(dirname(romsDir), path);
  return inside.startsWith('..') ? path : inside;
}

function printTable(rows: string[][]): void {
  const widths = rows[0]?.map((_, column) => Math.max(...rows.map(row => (row[column] ?? '').length))) ?? [];
  let previous = '';
  for (const row of rows) {
    const cells = row.map((cell, column) => column === row.length - 1 ? cell : cell.padEnd(widths[column]!));
    if (row[0] === previous) cells[0] = ' '.repeat(widths[0]!);
    previous = row[0]!;
    console.log(cells.join('  ').trimEnd());
  }
}

function pct(have: number, total: number): string {
  return total ? `${((have / total) * 100).toFixed(1)}%` : '';
}

function countBy(values: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const value of values) out[value] = (out[value] ?? 0) + 1;
  return out;
}

function csvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function flag(name: string): string | undefined {
  const at = argv.indexOf(name);
  return at >= 0 ? argv[at + 1] : undefined;
}

function fail(message: string): never {
  console.error(`rom-library: ${message}`);
  process.exit(1);
}

if (command === 'status') status();
else if (command === 'missing') missing();
else if (command === 'tidy') tidy();
else if (command === 'import') await importInbox();
else if (command === 'samples' && (argv[1] === undefined || argv[1].startsWith('--'))) samples();
else fail(`unknown command "${command}" -- status, missing, import, tidy or samples`);
