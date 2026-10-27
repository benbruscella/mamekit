// The local ROM library: what each supported system has, what it is missing,
// and filing whatever is dropped into .data/roms/_new/.
//
//   node tools/rom-library.ts status             per system: every list, BIOS and arcade sets
//   node tools/rom-library.ts missing            name the gaps (--list nes --region western --limit 40 --csv)
//   node tools/rom-library.ts import [--dry-run] tidy, then identify and file everything in _new/
//   node tools/rom-library.ts tidy [--dry-run]   quarantine what nothing supported claims
//   node tools/rom-library.ts samples [import [--dry-run]]
//                                                sample sets: which are filed, or file samples/_new/
//
// Supported means generated: the systems, their software lists and their BIOS
// sets come from the game contracts and each target's config.json (see
// tools/rom-library/systems.ts), and the lists themselves from MAME's hash/.
// `.data/Makefile` wraps these as `make roms-status`, `roms-missing`,
// `roms-import` and `roms-tidy`.
//
// Identification is by content: every chip is a size, CRC32 and SHA1 match
// against the list, so a file's name, folder and download page play no part.
// Nothing is ever deleted. An input ends up in exactly one place under _new/:
//
//   _imported/      it supplied at least one set the shelf did not have
//   _duplicate/     everything it matched is already filed
//   _unsupported/   it matched only sets MAME marks unsupported
//   _incomplete/    it matched chips, but no complete part of any set
//   _unidentified/  it matched nothing a supported list names
//
// and every run writes _new/_reports/<command>-<time>.json naming each match.
//
// Sample sets (.data/samples/<set>.zip) have no CRCs in MAME, so `samples
// import` files a zip by the .wav names it covers (rom-library/samples.ts),
// into the same outcome folders under samples/_new/. Tidying asks MAME's own
// -listxml (MAME_BIN, or its warm cache) which device sets MAME's run of a
// supported machine needs, so the oracle's Votrax for Q*bert stays filed.

import { appendFileSync, copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { crc32 } from 'node:zlib';
import { checkRomSet, missingRomSets } from '../src/runtime/shell.ts';
import { romsDir as romsRoot, samplesDir as samplesRoot } from '../src/paths.ts';
import { walkFile, readZipBytes, type Blob } from './rom-library/archives.ts';
import { identifyBlob, type Piece, type Variant } from './rom-library/identify.ts';
import { hex8, Library, writeZip, type Outcome, type SetChip, type Verdict } from './rom-library/library.ts';
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
const inbox = resolve(flag('--inbox') ?? join(romsDir, '_new'));
const mameSrc = resolve(flag('--mame') ?? process.env.MAME_SRC ?? join(projectRoot, '../mame'));
const distDir = resolve(flag('--dist') ?? join(projectRoot, 'dist'));
const samplesDir = resolve(flag('--samples') ?? samplesRoot(projectRoot));
const samplesInbox = join(samplesDir, '_new');

if (!existsSync(join(mameSrc, 'hash'))) fail(`no MAME software lists at ${join(mameSrc, 'hash')} -- pass --mame <checkout>`);
const library = await Library.open({ romsDir, mameSrc, distDir, dryRun });
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

  const waiting = waitingIn(inbox);
  const waitingSamples = waitingIn(samplesInbox);
  const quarantine = plan.moves.filter(move => move.kind === 'quarantine');
  console.log('');
  console.log(`inbox       ${shown(inbox)}/: ${waiting.length ? `${waiting.length} item(s) waiting -- make roms-import` : 'empty'}`);
  if (waitingSamples.length) console.log(`            ${shown(samplesInbox)}/: ${waitingSamples.length} item(s) waiting -- make samples-import`);
  console.log(`tidy        ${plan.moves.length ? `${quarantine.length} to quarantine, ${plan.moves.length - quarantine.length} to refile -- make roms-tidy DRY=1 lists them` : 'nothing to do'}`);
  if (regions) console.log(`region      only entries tagged ${flag('--region')}`);
}

function waitingIn(dir: string): string[] {
  return existsSync(dir) ? readdirSync(dir).filter(name => !name.startsWith('_') && !name.startsWith('.')) : [];
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
  imported: '_imported', duplicate: '_duplicate', unsupported: '_unsupported', incomplete: '_incomplete', unidentified: '_unidentified',
};

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
  console.log('== tidy');
  tidy();
  if (!existsSync(inbox)) fail(`${inbox} does not exist -- create it and drop dumps in`);
  const inputs = inboxFiles(inbox);
  console.log(`\n== import ${shown(inbox)}/: ${inputs.length} input(s)`);
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
  console.log(`\n${dryRun ? '[dry run] ' : ''}import: ${totals.imported} set(s) imported, ${totals.duplicate} already filed, ` +
    `${totals.unsupported} MAME-unsupported, ${totals.incomplete} incomplete, ${totals.unidentified} file(s) matched nothing`);
  const path = writeReport('import', { inputs: report });
  console.log(`report: ${relative(process.cwd(), path)}`);
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
  return parkIn(inbox, input, rel, bucket);
}

function parkIn(box: string, input: string, rel: string, bucket: string): string {
  let dest = join(box, bucket, rel);
  for (let n = 2; existsSync(dest); n++) dest = join(box, bucket, `${rel}.${n}`);
  if (dryRun) return dest;
  mkdirSync(dirname(dest), { recursive: true });
  renameSync(input, dest);
  // An emptied subfolder of the inbox is left as it was: removing it is not this tool's call.
  return dest;
}

function writeReport(kind: string, body: Record<string, unknown>): string {
  return writeReportIn(inbox, kind, body);
}

function writeReportIn(box: string, kind: string, body: Record<string, unknown>): string {
  const dir = join(box, '_reports');
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
  const waiting = waitingIn(samplesInbox);
  console.log(`\ninbox       ${shown(samplesInbox)}/: ${waiting.length ? `${waiting.length} item(s) waiting -- make samples-import` : 'empty'}`);
}

const SAMPLE_BUCKETS = { imported: '_imported', duplicate: '_duplicate', incomplete: '_incomplete', unidentified: '_unidentified' } as const;

/**
 * `samples import`: file every zip in samples/_new/ as the <set>.zip it
 * covers. The input parks in an outcome folder beside the inbox; the filed
 * copy is the input itself when MAME can read it as it is, or a rebuild with
 * the samples moved to the zip's root when they sat in a folder. A filed set
 * that lacked names is replaced, and moves to samples/_quarantine/.
 */
function importSamples(): void {
  const needs = sampleNeeds(library.systems);
  if (!existsSync(samplesInbox)) fail(`${samplesInbox} does not exist -- create it and drop sample zips in`);
  const inputs = readdirSync(samplesInbox, { withFileTypes: true })
    .filter(entry => entry.isFile() && !entry.name.startsWith('.') && !entry.name.startsWith('_'))
    .map(entry => entry.name).sort();
  console.log(`== samples import ${shown(samplesInbox)}/: ${inputs.length} input(s), ${needs.length} set(s) needed`);
  const report: Record<string, unknown>[] = [];
  const totals = { imported: 0, duplicate: 0, incomplete: 0, unidentified: 0 };
  for (const name of inputs) {
    const input = join(samplesInbox, name);
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
          replaced = join(samplesDir, '_quarantine', `${verdict.need.set}.zip`);
          detail += ` (replaces a set that ${current.problem ? 'could not be read' : `lacked ${current.missing.join(' ')}`})`;
        }
        if (!dryRun) {
          if (current.path) replaced = quarantineSample(current.path, `replaced by ${name} from samples/_new/: ${current.problem ?? `lacked ${current.missing.join(' ')}`}`);
          fileSampleSet(input, held!, filed);
        }
      }
    }
    totals[outcome]++;
    const parked = parkIn(samplesInbox, input, name, SAMPLE_BUCKETS[outcome]);
    console.log(`  ${outcome.padEnd(12)} ${name.padEnd(20)} ${detail}`);
    report.push({
      input: name, outcome, detail, parked: relative(samplesDir, parked),
      ...(filed ? { filed: relative(samplesDir, filed) } : {}),
      ...(replaced ? { replaced: relative(samplesDir, replaced) } : {}),
      ...(verdict.kind === 'incomplete' ? { set: verdict.need.set, missing: verdict.missing } : {}),
      ...(verdict.kind === 'complete' ? { set: verdict.need.set } : {}),
      ...(held ? { samples: [...held.keys()] } : {}),
    });
  }
  console.log(`\n${dryRun ? '[dry run] ' : ''}samples import: ${totals.imported} imported, ${totals.duplicate} already filed, ` +
    `${totals.incomplete} incomplete, ${totals.unidentified} unidentified`);
  const path = writeReportIn(samplesInbox, 'samples-import', { inputs: report });
  console.log(`report: ${relative(process.cwd(), path)}`);
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
  const planned = join(samplesDir, '_quarantine', basename(path));
  let to = planned;
  for (let n = 2; existsSync(to); n++) to = `${planned}.${n}`;
  mkdirSync(dirname(to), { recursive: true });
  renameSync(path, to);
  appendFileSync(join(samplesDir, '_quarantine', 'quarantine.jsonl'), `${JSON.stringify({
    at: new Date().toISOString(), from: relative(samplesDir, path), to: relative(samplesDir, to), reason,
  })}\n`);
  return to;
}

// --- helpers ----------------------------------------------------------------

/** A path as the reader knows it: below .data/roms, else below .data, else absolute. */
function shown(path: string): string {
  for (const root of [romsDir, dirname(romsDir)]) {
    const inside = relative(root, path);
    if (!inside.startsWith('..')) return inside;
  }
  return path;
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
else if (command === 'samples' && argv[1] === 'import') importSamples();
else fail(`unknown command "${argv.slice(0, command === 'samples' ? 2 : 1).join(' ')}" -- status, missing, import, tidy, samples or samples import`);
