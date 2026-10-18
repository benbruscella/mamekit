// Keep the shelves holding only what a supported machine can use.
//
// Nothing is deleted. A file no supported list or machine claims is moved to
// .data/roms/_quarantine/, at the same relative path, and the move is logged
// with its reason and any manifest row it carried; dropping it back into
// roms/_new/ re-identifies it. Besides quarantine, tidying puts misfiled
// things where the app looks for them:
//
//   * a console's BIOS set loose in consoles/ moves into consoles/<system>/bios/
//   * a computer list folder named other than its list (c64_carts, holding
//     c64_cart) is renamed, and its manifest's archive keys follow
//
// What counts as claimed is decided by content and by the generated machines,
// never by a list of names: a BIOS zip belongs to whichever machine accepts its
// chips' CRCs, an arcade zip to whichever supported board loads its chips.

import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { crc32 } from 'node:zlib';
import { readZipBytes } from './archives.ts';
import { hex8, type Library } from './library.ts';
import { acceptedCrcs, biosKey, machineSets, type System } from './systems.ts';

export type MoveKind = 'rename' | 'bios' | 'quarantine';

export interface Move {
  kind: MoveKind;
  /** absolute */
  from: string;
  /** absolute */
  to: string;
  reason: string;
  /** the shelf folder whose manifest carries rows for this file */
  shelf?: string;
  field?: 'carts' | 'entries';
  /** list a renamed folder becomes */
  list?: string;
}

const IGNORED = new Set(['.DS_Store', '_manifest.json']);

function children(dir: string): { name: string; path: string; directory: boolean }[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter(entry => !entry.name.startsWith('.'))
    .map(entry => ({ name: entry.name, path: join(dir, entry.name), directory: entry.isDirectory() }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function zipCrcs(path: string): string[] {
  try {
    return [...readZipBytes(readFileSync(path)).values()].map(bytes => hex8(crc32(bytes)));
  } catch {
    return [];
  }
}

/** The machines of `systems` that accept any chip of this zip, and how. */
function claimants(crcs: string[], systems: System[]): { system: System; game: string; how: 'load' | 'alternate' }[] {
  const out: { system: System; game: string; how: 'load' | 'alternate' }[] = [];
  for (const system of systems) {
    for (const machine of system.machines) {
      if (!machine.config) continue;
      const accepted = acceptedCrcs(machine.config.roms);
      const hits = crcs.map(crc => accepted.get(crc)).filter(Boolean);
      if (hits.length) out.push({ system, game: machine.game, how: hits.includes('load') ? 'load' : 'alternate' });
    }
  }
  return out;
}

export interface TidyPlan {
  moves: Move[];
  /** what tidying leaves alone but a reader should know */
  notes: string[];
}

export function planTidy(library: Library): TidyPlan {
  const roms = library.options.romsDir;
  const { systems, parked } = library.systems;
  const moves: Move[] = [];
  const notes: string[] = [];
  const quarantine = (path: string, reason: string, shelf?: string, field?: Move['field']) =>
    moves.push({ kind: 'quarantine', from: path, to: join(roms, '_quarantine', relative(roms, path)), reason, ...(shelf ? { shelf, field } : {}) });

  // 1. Category roots: only system folders belong there -- and, for arcade, sets.
  for (const category of ['consoles', 'computers'] as const) {
    const inCategory = systems.filter(system => system.category === category);
    const systemFolders = new Set(inCategory.map(system => system.key.split('/')[1]));
    for (const child of children(join(roms, category))) {
      if (child.name.startsWith('_')) continue;
      if (child.directory) {
        if (!systemFolders.has(child.name)) quarantine(child.path, `no supported ${category} machine files dumps in ${category}/${child.name}/`);
        continue;
      }
      if (!child.name.toLowerCase().endsWith('.zip')) { quarantine(child.path, `not a ROM set`); continue; }
      const claims = claimants(zipCrcs(child.path), inCategory);
      const owners = [...new Set(claims.map(claim => claim.system))];
      if (owners.length !== 1) {
        quarantine(child.path, owners.length ? `claimed by ${owners.map(owner => owner.key).join(' and ')}` : 'no supported machine uses its chips');
        continue;
      }
      const to = join(roms, biosKey(owners[0]!), child.name);
      if (existsSync(to)) { quarantine(child.path, `${relative(roms, to)} already exists`); continue; }
      const alternate = claims.every(claim => claim.how === 'alternate');
      moves.push({
        kind: 'bios', from: child.path, to,
        reason: alternate
          ? `alternate BIOS for ${owners[0]!.key}: a clone revision's chips the machine also accepts`
          : `BIOS set for ${owners[0]!.key}`,
      });
    }
  }

  for (const system of systems) {
    const systemDir = join(roms, system.key);
    if (system.category === 'arcade') {
      // An arcade folder keeps every set a supported board loads -- its own,
      // its parent's, its devices' -- and the sets of parked contracts.
      const needed = new Set([...system.machines.flatMap(machineSets), ...parked]);
      for (const child of children(systemDir)) {
        if (child.name.startsWith('_')) continue;
        if (child.directory) { quarantine(child.path, 'arcade sets are zips at the folder root'); continue; }
        if (!child.name.toLowerCase().endsWith('.zip')) { quarantine(child.path, 'not a ROM set'); continue; }
        if (needed.has(basename(child.name, '.zip'))) continue;
        if (claimants(zipCrcs(child.path), [system]).length) continue;
        quarantine(child.path, 'no supported arcade machine loads its chips');
      }
      continue;
    }

    // 2. The BIOS folder: sets some machine of this system accepts.
    const biosDir = join(roms, biosKey(system));
    for (const child of children(biosDir)) {
      if (child.directory || !child.name.toLowerCase().endsWith('.zip')) { quarantine(child.path, 'not a ROM set'); continue; }
      if (!claimants(zipCrcs(child.path), [system]).length) quarantine(child.path, `no ${system.key} machine uses its chips`);
    }

    // 3. Computer list folders are named for their list.
    const listDirs = new Map<string, string>();
    if (system.category === 'computers') {
      for (const child of children(systemDir)) {
        if (child.name === 'bios' || child.name.startsWith('_')) continue;
        if (!child.directory) { if (!IGNORED.has(child.name)) quarantine(child.path, `software belongs in a list folder of ${system.key}/`); continue; }
        if (system.lists.includes(child.name)) { listDirs.set(child.name, child.path); continue; }
        const manifestPath = join(child.path, '_manifest.json');
        const declared = existsSync(manifestPath) ? (JSON.parse(readFileSync(manifestPath, 'utf8')) as { list?: string }).list : undefined;
        if (declared && system.lists.includes(declared) && !existsSync(join(systemDir, declared)) && !listDirs.has(declared)) {
          moves.push({ kind: 'rename', from: child.path, to: join(systemDir, declared), list: declared, reason: `its manifest is the ${declared} list` });
          listDirs.set(declared, child.path);
          continue;
        }
        quarantine(child.path, `${child.name} is no software list ${system.key} mounts`);
      }
    } else {
      for (const list of system.lists) listDirs.set(list, systemDir);
    }

    // 4. Each shelf holds the list's supported entries, named by short name.
    for (const [listName, dir] of listDirs) {
      const list = library.lists.get(listName);
      if (!list) continue;
      const field = system.category === 'computers' ? 'entries' as const : 'carts' as const;
      for (const child of children(dir)) {
        if (IGNORED.has(child.name) || child.name.startsWith('_')) continue;
        if (child.directory) {
          if (system.category !== 'computers' && child.name === 'bios') continue;
          quarantine(child.path, `a ${listName} shelf holds sets, not folders`, dir, field);
          continue;
        }
        const entry = child.name.toLowerCase().endsWith('.zip') ? list.byName.get(child.name.slice(0, -4)) : undefined;
        if (!entry) quarantine(child.path, `not a ${listName} software-list entry`, dir, field);
        else if (entry.supported === 'no') quarantine(child.path, `MAME marks ${listName}:${entry.name} unsupported`, dir, field);
      }
      // A row whose file is not on the local shelf may still be served by the
      // bucket (the NES's unverified new/ dumps are), so it is reported, not moved.
      const files = new Set(children(dir).map(child => child.name));
      const stale = library.rows(dir, field).filter(row => {
        const file = rowFile(row, field);
        return file && !files.has(file);
      });
      if (stale.length) notes.push(`${relative(roms, dir)}/_manifest.json: ${stale.length} row(s) name a file this shelf does not hold (left as they are)`);
    }
  }
  return { moves, notes };
}

/** The file a manifest row describes, relative to its shelf folder. */
function rowFile(row: Record<string, unknown>, field: 'carts' | 'entries'): string | undefined {
  const value = field === 'carts' ? row.target ?? row.file : row.archive;
  return typeof value === 'string' ? value.split('/').pop() : undefined;
}

/** Carry out a plan. Renames go first so later paths land in the renamed folders. */
export function applyTidy(library: Library, moves: Move[]): void {
  const roms = library.options.romsDir;
  const log = join(roms, '_quarantine', 'quarantine.jsonl');
  const renamed: [string, string][] = [];
  const follow = (path: string) => {
    for (const [from, to] of renamed) if (path === from || path.startsWith(`${from}/`)) return to + path.slice(from.length);
    return path;
  };
  const order: MoveKind[] = ['rename', 'bios', 'quarantine'];
  for (const move of [...moves].sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind))) {
    if (move.kind === 'rename') {
      renameSync(move.from, move.to);
      renamed.push([move.from, move.to]);
      // The manifest moved with its folder; its archive keys name the folder.
      library.forgetManifest(move.from);
      const oldPrefix = `${basename(move.from)}/`;
      for (const row of library.rows(move.to, 'entries')) {
        if (typeof row.archive === 'string' && row.archive.startsWith(oldPrefix)) row.archive = `${move.list}/${row.archive.slice(oldPrefix.length)}`;
      }
      library.markDirty(move.to);
      continue;
    }
    const shelf = move.shelf ? follow(move.shelf) : undefined;
    const from = follow(move.from);
    const planned = move.kind === 'quarantine' ? join(roms, '_quarantine', relative(roms, from)) : move.to;
    let to = planned;
    for (let n = 2; existsSync(to); n++) to = `${planned}.${n}`;
    mkdirSync(dirname(to), { recursive: true });
    renameSync(from, to);
    if (move.kind !== 'quarantine') continue;
    const rows = shelf && move.field
      ? library.takeRows(shelf, move.field, row => rowFile(row, move.field!) === basename(from))
      : [];
    appendFileSync(ensureLog(log), `${JSON.stringify({
      at: new Date().toISOString(), from: relative(roms, from), to: relative(roms, to),
      reason: move.reason, ...(rows.length ? { rows } : {}),
    })}\n`);
  }
  library.flush();
}

function ensureLog(path: string): string {
  mkdirSync(dirname(path), { recursive: true });
  return path;
}

/**
 * Let reads find a list folder at the name tidying will give it, so a dry run
 * and the status report count c64_carts/ as the c64_cart shelf it becomes.
 */
export function aliasRenames(library: Library, plan: TidyPlan): void {
  for (const move of plan.moves) if (move.kind === 'rename') library.alias(move.to, move.from);
}
