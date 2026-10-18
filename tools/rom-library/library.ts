// The local ROM library: which software lists it shelves, and filing onto it.
//
// Every supported list has one shelf folder under .data/roms (see systems.ts).
// A dump is filed there as the zip `mame <machine> <name>` loads: named by the
// entry's short name, holding the entry's chips under the names the list gives
// them. Each folder's _manifest.json records what was filed and from where, in
// the shape its reader expects -- the console room's `carts`, or the computer
// software room's `entries` (src/gen/cartridge-catalog.ts and
// src/gen/software-shelves.ts) -- so filing a dump is all the app needs to
// offer it.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, posix } from 'node:path';
import { crc32, deflateRawSync } from 'node:zlib';
import { buildCatalog, parseSoftwareList } from '../../src/kg/softlist.ts';
import type { RomLoad } from '../../src/runtime/shell.ts';
import { readZipBytes } from './archives.ts';
import { blankChip, isBlank, type FlatList, type Identifier, type Piece, type Variant } from './identify.ts';
import {
  entryRoms, ListIndex, readList, romKey, type ListEntry, type ListRom, type SoftwareList,
} from './softlists.ts';
import {
  biosKey, loadSystems, machineSets, setLoads, shelfKey, type Machine, type System, type Systems,
} from './systems.ts';

export interface LibraryOptions {
  romsDir: string;
  mameSrc: string;
  distDir: string;
  dryRun: boolean;
}

export type Verdict = 'imported' | 'duplicate' | 'unsupported' | 'incomplete';

export interface Outcome {
  verdict: Verdict;
  list: string;
  name: string;
  description: string;
  detail: string;
  sources: string[];
  /** the non-blank chips this verdict rests on, as size:crc */
  chips?: string[];
}

interface Shelf {
  system: System;
  /** folder below .data/roms */
  key: string;
}

type Row = Record<string, unknown>;
interface ManifestDocument {
  carts?: Row[];
  entries?: Row[];
  [field: string]: unknown;
}

/** A chip one of a supported machine's sets supplies: arcade, BIOS or device. */
export interface SetRef {
  system: System;
  machine: Machine;
  set: string;
}

/** One file an archive held whose CRC some machine set names. */
export interface SetChip {
  name: string;
  path: string;
  bytes: Uint8Array;
}

export const hex8 = (value: number): string => (value >>> 0).toString(16).padStart(8, '0');
const chipKey = (bytes: Uint8Array): string => `${bytes.length}:${hex8(crc32(bytes))}`;

export class Library {
  readonly lists = new Map<string, SoftwareList>();
  readonly identifier: Identifier;
  readonly missingLists: string[] = [];
  private readonly shelves = new Map<string, Shelf>();
  private readonly zips = new Map<string, Map<string, Uint8Array>>();
  private readonly manifests = new Map<string, { document: ManifestDocument; dirty: boolean }>();
  /** folder -> the folder holding its contents until a planned rename runs */
  private readonly aliases = new Map<string, string>();
  /** chip CRC -> the machine sets that load it, as the chip or a clone revision of it */
  private readonly setChips = new Map<string, SetRef[]>();
  readonly options: LibraryOptions;
  readonly systems: Systems;

  private constructor(options: LibraryOptions, systems: Systems) {
    this.options = options;
    this.systems = systems;
    const index = new ListIndex();
    const flat: FlatList[] = [];
    let nes: Identifier['nes'];
    for (const system of systems.systems) {
      for (const name of system.lists) {
        if (this.shelves.has(name)) continue;
        const path = join(options.mameSrc, 'hash', `${name}.xml`);
        if (!existsSync(path)) { this.missingLists.push(name); continue; }
        const list = readList(path);
        this.lists.set(name, list);
        this.shelves.set(name, { system, key: shelfKey(system, name) });
        index.add(list);
        if (system.category !== 'consoles') continue;
        // The console's cartridge slot says how its dumps are laid out and
        // which extensions it takes; the list itself says neither.
        const cart = system.machines.find(machine => machine.config?.cart?.list === name)?.config?.cart;
        const catalog = buildCatalog(parseSoftwareList(readFileSync(path, 'utf8')));
        if (catalog.interface === 'nes_cart') nes = { list, catalog };
        else if (cart?.extensions?.length) flat.push({ list, catalog, extensions: cart.extensions });
      }
    }
    this.identifier = { index, flat, ...(nes ? { nes } : {}) };
    for (const system of systems.systems) {
      for (const machine of system.machines) {
        for (const set of machineSets(machine)) {
          for (const load of setLoads(machine, set)) {
            for (const crc of [load.crc, ...(load.alt ?? []).map(alt => alt.crc)]) {
              const refs = this.setChips.get(crc.toLowerCase()) ?? [];
              refs.push({ system, machine, set });
              this.setChips.set(crc.toLowerCase(), refs);
            }
          }
        }
      }
    }
  }

  /** Whether some supported machine's set names a chip with this CRC. */
  isSetChip(crc: string): boolean {
    return this.setChips.has(crc);
  }

  static async open(options: LibraryOptions): Promise<Library> {
    return new Library(options, await loadSystems(options.distDir));
  }

  /** A library over systems the caller describes, rather than the checkout's. */
  static forSystems(options: LibraryOptions, systems: Systems): Library {
    return new Library(options, systems);
  }

  /**
   * File the machine sets one archive completes. A board the archive covers
   * whole is filed as `<game>.zip` with every chip it loads -- what the
   * harness and the shell's first fetch open -- and each parent or device set
   * it completes is filed too, split as the shell fetches them (namco51.zip
   * serves Galaga and Xevious alike). A console's BIOS is the same thing with
   * one set. A set matched only through a clone revision's chips -- the Game
   * Boy Pocket's boot ROM where the DMG's is listed -- keeps its own name.
   */
  fileMachineSets(chips: SetChip[], pool: string): Outcome[] {
    const byCrc = new Map(chips.map(chip => [hex8(crc32(chip.bytes)), chip]));
    const machines = new Map<string, SetRef>();
    const sets = new Map<string, SetRef>();
    for (const crc of byCrc.keys()) {
      for (const ref of this.setChips.get(crc) ?? []) {
        machines.set(`${biosKey(ref.system)}/${ref.machine.game}`, ref);
        if (ref.set !== ref.machine.game) sets.set(`${biosKey(ref.system)}/${ref.set}`, ref);
      }
    }
    const outcomes: Outcome[] = [];
    for (const ref of machines.values()) {
      const game = ref.machine.game;
      const whole = machineSets(ref.machine).flatMap(set => setLoads(ref.machine, set));
      const outcome = this.fileSet(ref, game, whole, byCrc, chips, pool, `every chip ${game} loads`);
      // Short of the whole board, its own chips alone are still its split set.
      const own = setLoads(ref.machine, game);
      const split = outcome?.verdict === 'incomplete' && own.length
        ? this.fileSet(ref, game, own, byCrc, chips, pool, `${game}'s own chips; its parent and devices come from their sets`)
        : null;
      const chosen = split && split.verdict !== 'incomplete' ? split : outcome;
      if (chosen) outcomes.push(chosen);
    }
    for (const [key, ref] of sets) {
      if (machines.has(key)) continue;
      const outcome = this.fileSet(ref, ref.set, setLoads(ref.machine, ref.set), byCrc, chips, pool, `loaded by ${ref.machine.game}`);
      if (outcome) outcomes.push(outcome);
    }
    return outcomes;
  }

  private fileSet(
    ref: SetRef, set: string, loads: RomLoad[], byCrc: Map<string, SetChip>, chips: SetChip[], pool: string, description: string,
  ): Outcome | null {
    const members = new Map<string, Uint8Array>();
    let alternate = false;
    let evidence = false;
    let missing = 0;
    for (const load of loads) {
      const own = byCrc.get(load.crc.toLowerCase());
      const alt = own ? undefined : (load.alt ?? []).find(candidate => byCrc.has(candidate.crc.toLowerCase()));
      const chip = own ?? (alt ? byCrc.get(alt.crc.toLowerCase()) : undefined);
      if (chip) {
        members.set(alt?.file ?? load.file, chip.bytes);
        if (alt) alternate = true;
        if (!isBlank(chip.bytes)) evidence = true;
        continue;
      }
      const blank = blankChip({ name: load.file, size: load.size, crc: load.crc.toLowerCase(), offset: 0 });
      if (blank) members.set(load.file, blank);
      else missing++;
    }
    if (!evidence) return null;
    const held = [...members.values()];
    const sources = [...new Set(chips.filter(chip => held.includes(chip.bytes)).map(chip => chip.path))];
    const base = {
      list: ref.system.category === 'arcade' ? 'arcade' : biosKey(ref.system), name: set, description, sources,
      chips: held.filter(bytes => !isBlank(bytes)).map(chipKey),
    };
    if (missing) return { ...base, verdict: 'incomplete', detail: `${loads.length - missing} of ${loads.length} chips` };
    // A clone revision's chips stand in for the machine's own, under their own name.
    const name = alternate ? basename(pool.split('::').pop()!).replace(/\.[^.]+$/, '') : set;
    const dest = join(this.options.romsDir, biosKey(ref.system), `${name}.zip`);
    const existing = this.members(dest);
    const filed = new Set([...existing.values()].map(chipKey));
    if (held.every(bytes => filed.has(chipKey(bytes)))) {
      return { ...base, name, verdict: 'duplicate', detail: `${name}.zip already holds these chips` };
    }
    const merged = new Map(existing);
    for (const [member, bytes] of members) {
      if (filed.has(chipKey(bytes))) continue;
      const prior = merged.get(member);
      if (prior) merged.set(`${member}.replaced`, prior);
      merged.set(member, bytes);
    }
    if (!this.options.dryRun) {
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, writeZip(merged));
    }
    this.zips.set(dest, merged);
    return {
      ...base, name, verdict: 'imported',
      detail: [`${loads.length} chip${loads.length === 1 ? '' : 's'}`, ...(alternate ? [`a clone revision of ${set}`] : []),
        ...(existing.size ? ['completes the filed set'] : [])].join(', '),
    };
  }

  shelf(list: string): Shelf | undefined {
    return this.shelves.get(list);
  }

  shelfDir(list: string): string {
    return join(this.options.romsDir, this.shelves.get(list)!.key);
  }

  alias(dir: string, holder: string): void {
    this.aliases.set(dir, holder);
  }

  /** Where a folder's contents are read from: itself, or the folder a planned rename will move. */
  readable(dir: string): string {
    return !existsSync(dir) && this.aliases.has(dir) ? this.aliases.get(dir)! : dir;
  }

  /** The members of a zip on the shelf, including what this run has filed into it. */
  members(path: string): Map<string, Uint8Array> {
    let members = this.zips.get(path);
    if (!members) {
      members = new Map();
      const source = join(this.readable(dirname(path)), basename(path));
      if (existsSync(source)) {
        try { members = readZipBytes(readFileSync(source)); } catch { /* unreadable: treated as empty, then rewritten */ }
      }
      this.zips.set(path, members);
    }
    return members;
  }

  /**
   * File everything one archive's members amount to. Pieces from different
   * members pool, so a MAME set dropped as a zip of loose chips -- or a tape
   * whose two sides arrive as two files -- completes as one entry.
   */
  filePool(pieces: Piece[], variants: Variant[]): Outcome[] {
    const groups = new Map<string, { list: SoftwareList; entry: ListEntry; pieces: Map<string, Piece> }>();
    for (const piece of pieces) {
      const id = `${piece.ref.list.name}\0${piece.ref.entry.name}`;
      const group = groups.get(id) ?? { list: piece.ref.list, entry: piece.ref.entry, pieces: new Map() };
      const key = romKey(piece.ref.part, piece.ref.area, piece.ref.rom);
      if (!group.pieces.has(key)) group.pieces.set(key, piece);
      groups.set(id, group);
    }
    const outcomes: Outcome[] = [];
    const settled = new Set<string>();
    for (const [id, group] of groups) {
      const outcome = this.fileEntry(group.list, group.entry, group.pieces);
      outcomes.push(outcome);
      if (outcome.verdict !== 'incomplete') settled.add(id);
    }
    for (const variant of variants) {
      const id = `${variant.list.name}\0${variant.entry.name}`;
      if (settled.has(id)) continue;
      settled.add(id);
      outcomes.push(this.fileVariant(variant));
    }
    return outcomes;
  }

  private fileEntry(list: SoftwareList, entry: ListEntry, pieces: Map<string, Piece>): Outcome {
    const sources = [...new Set([...pieces.values()].map(piece => piece.source))];
    const base = {
      list: list.name, name: entry.name, description: entry.description, sources,
      chips: [...pieces.values()].map(piece => chipKey(piece.bytes)),
    };
    if (entry.supported === 'no') return { ...base, verdict: 'unsupported', detail: 'MAME marks this set unsupported' };

    const dest = join(this.shelfDir(list.name), `${entry.name}.zip`);
    const existing = this.members(dest);
    const byChip = new Map([...existing.values()].map(bytes => [chipKey(bytes), bytes]));
    const roms = entryRoms(entry);
    // A chip is filed when the zip holds it under the name the list gives it;
    // that is what `mame <machine> <name>` opens.
    const filed = (rom: ListRom) => {
      const member = existing.get(rom.name);
      return member !== undefined && chipKey(member) === `${rom.size}:${rom.crc}`;
    };
    const additions: { rom: ListRom; bytes: Uint8Array }[] = [];
    for (const { key, rom } of roms) {
      if (filed(rom)) continue;
      // From this archive; else the same chip already in the zip under another
      // name (a whole-image variant being completed); else, for a blank bank
      // the list names, its known bytes. Blanks are never evidence -- identify.ts
      // ignores them -- but once real chips name the set they are certain.
      const bytes = pieces.get(key)?.bytes ?? byChip.get(`${rom.size}:${rom.crc}`) ?? blankChip(rom);
      if (bytes) additions.push({ rom, bytes });
    }
    const has = (rom: ListRom) => filed(rom) || additions.some(addition => addition.rom === rom);
    const parts = entry.parts.map((_, index) => roms.filter(item => item.part === index).every(item => has(item.rom)));
    const matched = roms.filter(item => has(item.rom)).length;
    // A part is the unit MAME mounts: one side of a tape, one disk, the
    // cartridge. A set with no complete part has nothing anything could load.
    if (!parts.some(Boolean)) {
      return { ...base, verdict: 'incomplete', detail: `${matched} of ${roms.length} chips, no complete part` };
    }
    if (!additions.length) return { ...base, verdict: 'duplicate', detail: `${entry.name}.zip already holds these chips` };

    const members = new Map(existing);
    for (const { rom, bytes } of additions) {
      const prior = members.get(rom.name);
      // A member squatting on the chip's name with other bytes is kept beside it.
      if (prior) members.set(`${rom.name}.replaced`, prior);
      members.set(rom.name, bytes);
    }
    const zip = writeZip(members);
    if (!this.options.dryRun) {
      mkdirSync(this.shelfDir(list.name), { recursive: true });
      writeFileSync(dest, zip);
    }
    this.zips.set(dest, members);
    this.record(list, entry, members, sources, zip.length, 'verified');
    const complete = parts.filter(Boolean).length;
    const blanks = additions.filter(addition => !pieces.has(roms.find(item => item.rom === addition.rom)!.key) &&
      !byChip.has(`${addition.rom.size}:${addition.rom.crc}`)).length;
    const detail = [
      entry.parts.length > 1 ? `${complete} of ${entry.parts.length} parts` : `${roms.length} chip${roms.length === 1 ? '' : 's'}`,
      ...(blanks ? [`${blanks} blank bank${blanks === 1 ? '' : 's'} supplied`] : []),
      ...(existing.size ? ['completes the filed set'] : []),
    ].join(', ');
    return { ...base, verdict: 'imported', detail };
  }

  private fileVariant(variant: Variant): Outcome {
    const { list, entry } = variant;
    const base = {
      list: list.name, name: entry.name, description: entry.description, sources: [variant.source], chips: [chipKey(variant.image)],
    };
    if (entry.supported === 'no') return { ...base, verdict: 'unsupported', detail: 'MAME marks this set unsupported' };
    const dest = join(this.shelfDir(list.name), `${entry.name}.zip`);
    if (this.members(dest).size) return { ...base, verdict: 'duplicate', detail: `${entry.name}.zip is already filed` };
    // Its chip boundaries are unknown, so it is stored whole and never verified.
    const members = new Map([[`${entry.name}.bin`, variant.image]]);
    const zip = writeZip(members);
    if (!this.options.dryRun) {
      mkdirSync(this.shelfDir(list.name), { recursive: true });
      writeFileSync(dest, zip);
    }
    this.zips.set(dest, members);
    this.record(list, entry, members, base.sources, zip.length, 'variant', variant);
    return { ...base, verdict: 'imported', detail: `a different dump: ${variant.matched} of ${variant.total} chips match, filed whole` };
  }

  /** The manifest row for a filed set, in the shape its room reads. */
  private record(
    list: SoftwareList, entry: ListEntry, members: Map<string, Uint8Array>, sources: string[], zipBytes: number,
    status: 'verified' | 'variant', variant?: Variant,
  ): void {
    const shelf = this.shelves.get(list.name)!;
    const dir = this.shelfDir(list.name);
    const present = new Set([...members.values()].map(chipKey));
    const roms = entryRoms(entry);
    if (shelf.system.category === 'computers') {
      const previous = this.rows(dir, 'entries').find(row => row.name === entry.name);
      this.upsert(dir, 'entries', 'name', {
        list: list.name,
        name: entry.name,
        description: entry.description,
        year: entry.year,
        publisher: entry.publisher,
        ...(entry.cloneof ? { cloneof: entry.cloneof } : {}),
        parts: entry.parts.map((part, index) => {
          const own = roms.filter(item => item.part === index);
          const matched = own.filter(item => present.has(`${item.rom.size}:${item.rom.crc}`)).length;
          return {
            name: part.name, interface: part.interface, features: part.features,
            requiredRoms: own.length, matchedRoms: matched, available: matched === own.length,
          };
        }),
        // relative to the system folder, which is what the shelf fetches under
        archive: posix.join(posix.relative(shelf.system.key, shelf.key), `${entry.name}.zip`),
        verification: 'MAME size, CRC32 and SHA1',
        sources: mergeSources(previous?.sources, sources),
        mameSupported: entry.supported,
      }, { list, header: true });
      return;
    }
    const part = entry.parts[0];
    const previous = this.rows(dir, 'carts').find(row => (row.target ?? row.file) === `${entry.name}.zip`);
    this.upsert(dir, 'carts', 'target', {
      file: (sources[0] ?? '').split('::').pop()!.split('/').pop()!.replace(/ \[.*\]$/, ''),
      target: `${entry.name}.zip`,
      status,
      packaging: variant ? 'flat-image' : 'mame-softlist-chips',
      match: {
        name: entry.name,
        description: entry.description,
        cloneof: entry.cloneof ?? null,
        year: entry.year,
        publisher: entry.publisher,
        slot: part?.features.slot ?? null,
        pcb: part?.features.pcb ?? null,
      },
      members: [...members.keys()],
      chips_matched: variant?.matched ?? roms.filter(item => present.has(`${item.rom.size}:${item.rom.crc}`)).length,
      chips_total: variant?.total ?? roms.length,
      zip_bytes: zipBytes,
      sources: mergeSources(previous?.sources, sources),
      imported_by: 'rom-library',
    });
  }

  // --- manifests ----------------------------------------------------------------

  manifest(dir: string): ManifestDocument {
    const path = join(dir, '_manifest.json');
    let cached = this.manifests.get(path);
    if (!cached) {
      const source = join(this.readable(dir), '_manifest.json');
      const document = existsSync(source) ? JSON.parse(readFileSync(source, 'utf8')) as ManifestDocument : {};
      cached = { document, dirty: false };
      this.manifests.set(path, cached);
    }
    return cached.document;
  }

  rows(dir: string, field: 'carts' | 'entries'): Row[] {
    const document = this.manifest(dir);
    return Array.isArray(document[field]) ? document[field]! : [];
  }

  upsert(dir: string, field: 'carts' | 'entries', keyField: 'target' | 'name', row: Row, init?: { list: SoftwareList; header: boolean }): void {
    const document = this.manifest(dir);
    if (init?.header) {
      // The computer manifest names the list revision it was verified against.
      document.list = init.list.name;
      document.source = init.list.path;
      document.sourceSha1 = init.list.sha1;
      document.verification ??= 'ROM contents only; not an emulation acceptance result';
    }
    const key = row[keyField];
    const rows = this.rows(dir, field).filter(existing => (existing[keyField] ?? existing.file) !== key);
    document[field] = [...rows, row];
    this.markDirty(dir);
  }

  /** Take rows out of a manifest; they are returned so the caller can keep them. */
  takeRows(dir: string, field: 'carts' | 'entries', matches: (row: Row) => boolean): Row[] {
    const rows = this.rows(dir, field);
    const taken = rows.filter(matches);
    if (!taken.length) return [];
    this.manifest(dir)[field] = rows.filter(row => !matches(row));
    this.markDirty(dir);
    return taken;
  }

  markDirty(dir: string): void {
    this.manifests.get(join(dir, '_manifest.json'))!.dirty = true;
  }

  /** Forget a cached manifest, after its folder moved. */
  forgetManifest(dir: string): void {
    this.manifests.delete(join(dir, '_manifest.json'));
  }

  flush(): void {
    for (const [path, cached] of this.manifests) {
      if (!cached.dirty) continue;
      cached.dirty = false;
      if (this.options.dryRun) continue;
      mkdirSync(join(path, '..'), { recursive: true });
      writeFileSync(path, `${JSON.stringify(cached.document, null, 2)}\n`);
    }
  }
}

function mergeSources(previous: unknown, sources: string[]): string[] {
  return [...new Set([...(Array.isArray(previous) ? previous.map(String) : []), ...sources])];
}

/**
 * A zip of the given members, each deflated when that saves space. Times are
 * fixed (1980-01-01) so the same chips always produce the same bytes.
 */
export function writeZip(members: Map<string, Uint8Array>): Buffer {
  const locals: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  for (const [memberName, bytes] of members) {
    const name = Buffer.from(memberName, 'utf8');
    const utf8 = /[^\x20-\x7e]/.test(memberName) ? 0x0800 : 0;
    const deflated = deflateRawSync(bytes, { level: 9 });
    const stored = deflated.length >= bytes.length;
    const data = stored ? Buffer.from(bytes) : deflated;
    const crc = crc32(bytes) >>> 0;

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(utf8, 6);
    local.writeUInt16LE(stored ? 0 : 8, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0x21, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(bytes.length, 22);
    local.writeUInt16LE(name.length, 26);
    locals.push(local, name, data);

    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(0x02014b50, 0);
    entry.writeUInt16LE(20, 4);
    entry.writeUInt16LE(20, 6);
    entry.writeUInt16LE(utf8, 8);
    entry.writeUInt16LE(stored ? 0 : 8, 10);
    entry.writeUInt16LE(0, 12);
    entry.writeUInt16LE(0x21, 14);
    entry.writeUInt32LE(crc, 16);
    entry.writeUInt32LE(data.length, 20);
    entry.writeUInt32LE(bytes.length, 24);
    entry.writeUInt16LE(name.length, 28);
    entry.writeUInt32LE(offset, 42);
    central.push(entry, name);
    offset += 30 + name.length + data.length;
  }
  const directory = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(members.size, 8);
  end.writeUInt16LE(members.size, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, directory, end]);
}
