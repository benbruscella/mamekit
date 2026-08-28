// Identify dropped dumps against the softlist and file them by short name.
//
// Drop anything into .data/roms/consoles/_new/ and run this. Each input is
// CRC-matched against the generated softlist catalog; a match is repacked into
// the set as <short-name>.zip. Nothing is ever deleted -- every input ends up
// in exactly one of three places, so a run is auditable and re-runnable:
//
//   <LIST>/<name>.zip       identified, and the set did not already hold it
//   _new/duplicate/         identified, but that dump is already filed
//   _new/unidentified/      no CRC match in the catalog
//
// Identification is by CRC over the PRG/CHR chip slices, which is exact: the
// title, region and revision printed on a download page play no part, so this
// cannot mislabel a dump the way name matching does. Header bytes are excluded
// from the comparison, so header-only variations still match.
//
// Inputs may be raw .nes images or zips (the usual download shape) -- a zip is
// unwrapped and its first parseable image used, and a zip that is already a
// MAME chip set is recognised as one.
//
// Imports are recorded in the set's _manifest.json, which the console room
// reads to decide which cartridges it can offer to fetch (runtime/rom-source.ts
// consumes `target`, `status` and the `match` block).

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { identify, inesFromSoftlistSet, parseINes } from '../src/runtime/nes-ines.ts';
import { identifyCartImage } from '../src/runtime/cart-identify.ts';
import { crc32, readZip } from '../src/runtime/zip.ts';
import { DATA_DIR } from '../src/paths.ts';

const root = resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const list = flagValue('--list') ?? 'nes';
const dryRun = argv.includes('--dry-run');
// A set the visitor already owns is more useful on the shelf under its own
// name than parked out of sight, so importing one in place can keep the dumps
// no catalog entry claims.
const keepUnmatched = argv.includes('--keep-unmatched');

if (!/^[a-z0-9_-]+$/i.test(list)) fail(`implausible list "${list}"`);

const newDir = join(root, DATA_DIR, 'roms/consoles/_new');
const destDir = join(root, DATA_DIR, `roms/consoles/${list}`);
const manifestPath = join(destDir, '_manifest.json');
const catalogPath = join(root, `dist/games/consoles/${list}/softlist.json`);
// Chip labels are not derivable from a dump. They are optional for this project
// (inesFromSoftlistSet matches chips by CRC) but required for `mame <list>
// <name>` to load the zip, so use the real names whenever the source is around.
const mameXml = flagValue('--mame-xml') ?? resolve(root, `../mame/hash/${list}.xml`);

if (!existsSync(newDir)) fail(`${newDir} does not exist -- create it and drop dumps in`);
if (!existsSync(catalogPath)) {
  fail(`no catalog at ${catalogPath} -- generate the ${list} target first (npm run gen)`);
}

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
// The NES is the one list whose dumps are a header plus two areas; every other
// console dumps a cartridge flat. The catalog's own interface says which.
const inesList = catalog.interface === 'nes_cart';
// identify() resolves `meta` purely by CRC; the support lists only colour the
// tier, which filing does not care about, so empty lists are correct here.
const support = { slots: [], games: [], mapperSlots: {} };
const xml = existsSync(mameXml) ? readFileSync(mameXml, 'utf8') : null;
if (!xml) console.warn(`note: ${mameXml} not found -- packing with positional chip names (mamekit loads these; MAME will not)\n`);

const inputs = readdirSync(newDir)
  .filter(name => !name.startsWith('.'))
  .filter(name => statSync(join(newDir, name)).isFile())
  .sort();

if (!inputs.length) {
  console.log(`nothing to import: ${newDir} holds no files`);
  process.exit(0);
}

const manifestRows: Record<string, unknown>[] = [];
let importedCount = 0, duplicateCount = 0, unidentifiedCount = 0;

for (const file of inputs) {
  const src = join(newDir, file);
  const raw = new Uint8Array(readFileSync(src));
  // Which reader applies is the LIST's property, not a guess about the bytes:
  // the catalog says what its cartridges are (`nes_cart`, `coleco_cart`, ...).
  // Sniffing instead lets parseINes accept a ColecoVision dump whose first
  // bytes happen to pass, and the NES matcher then "identifies" it against a
  // catalog that is not the NES's at all.
  const loaded = inesList ? await loadImage(raw) : null;

  if (!loaded) {
    if (await importFlatImage(file, src, raw)) continue;
    report(file, 'unidentified', 'no cartridge image inside');
    park(src, file, 'unidentified');
    unidentifiedCount++;
    continue;
  }

  const { ines, inner, innerCount } = loaded;
  const meta = identify(ines, catalog, support).meta;
  if (!meta) {
    report(file, 'unidentified', `mapper ${ines.mapper}, prg ${ines.prg.length}B -- no catalog match`);
    park(src, file, 'unidentified');
    unidentifiedCount++;
    continue;
  }

  const dest = join(destDir, `${meta.name}.zip`);
  if (existsSync(dest)) {
    report(file, 'duplicate', `${meta.name} -- ${meta.description}`);
    park(src, file, 'duplicate');
    duplicateCount++;
    continue;
  }

  const chips = splitChips(ines, meta);
  if (!chips) {
    report(file, 'unidentified', 'chip sizes disagree with the catalog entry');
    park(src, file, 'unidentified');
    unidentifiedCount++;
    continue;
  }

  report(file, 'import', `${meta.name} -- ${meta.description}`);
  const zipBytes = storedZip(chips);
  manifestRows.push(manifestRow(file, meta, ines, chips, zipBytes.length, inner, innerCount));
  if (!dryRun) {
    mkdirSync(destDir, { recursive: true });
    writeFileSync(dest, zipBytes);
    park(src, file, 'imported');
  }
  importedCount++;
}

if (manifestRows.length && !dryRun) updateManifest(manifestRows);

console.log(`\n${dryRun ? '[dry run] ' : ''}imported ${importedCount}, duplicate ${duplicateCount}, unidentified ${unidentifiedCount}`);
if (manifestRows.length) {
  console.log(dryRun ? `[dry run] would add ${manifestRows.length} row(s) to _manifest.json`
    : `_manifest.json: +${manifestRows.length} row(s)`);
}

/**
 * Import a flat cartridge image: identify it, repack it as the MAME chip set
 * its catalog entry describes, and file it under the software-list short name.
 *
 * Returns false when the input is not a usable image at all, so the caller can
 * park it. An image that IS usable but matches nothing is filed under its own
 * name when --keep-unmatched is given, because a set the visitor already owns
 * is more useful on the shelf than parked out of sight.
 */
async function importFlatImage(file: string, src: string, raw: Uint8Array): Promise<boolean> {
  const { image, inner, innerCount } = await flatImage(raw);
  if (!image?.length) return false;

  const match = identifyCartImage(image, catalog);
  if (!match) {
    // Only file something that plausibly IS a dump: --keep-unmatched must not
    // sweep a stray .dat or readme sitting beside the set into it.
    if (!keepUnmatched || !looksLikeDump(file, raw)) return false;
    report(file, 'unidentified', `${image.length}B -- no catalog match, filed as-is`);
    manifestRows.push(flatRow(file, file, image, null, raw.length, inner, innerCount));
    // Filed under the name it arrived with: there is no short name to give it,
    // and the shelf keys on the file it can actually fetch.
    if (!dryRun) {
      mkdirSync(destDir, { recursive: true });
      renameSync(src, join(destDir, file));
    }
    unidentifiedCount++;
    return true;
  }

  const meta = match.entry;
  const dest = join(destDir, `${meta.name}.zip`);
  if (existsSync(dest)) {
    report(file, 'duplicate', `${meta.name} -- ${meta.description}`);
    park(src, file, 'duplicate');
    duplicateCount++;
    return true;
  }

  // Splitting into the entry's chips is only meaningful when those chips are
  // what the dump actually holds. A variant's real chip boundaries are not
  // known -- and its layout need not even fit -- so it is stored whole.
  const chips = match.verified ? flatChips(image, meta) : null;
  const packaged = chips ?? [{ name: `${meta.name}.bin`, bytes: image }];
  const detail = match.verified
    ? `${meta.name} -- ${meta.description}`
    : `${meta.name} -- ${meta.description} (${match.matched}/${match.total} chips)`;
  report(file, match.verified ? 'import' : 'variant', detail);
  const zipBytes = storedZip(packaged);
  manifestRows.push(flatRow(
    file, `${meta.name}.zip`, image, match, zipBytes.length, inner, innerCount,
    chips ? 'mame-softlist-chips' : 'flat-image',
  ));
  if (!dryRun) {
    mkdirSync(destDir, { recursive: true });
    writeFileSync(dest, zipBytes);
    park(src, file, 'imported');
  }
  importedCount++;
  return true;
}

/** The chip names a verified entry is packed under, for the manifest row. */
function chipsOf(match: ReturnType<typeof identifyCartImage>): string[] | null {
  if (!match?.verified || !xml) return null;
  const labels = chipNames(xml, match.entry.name)?.prg;
  return labels?.length ? labels : null;
}

/**
 * Is this input plausibly a cartridge dump rather than something filed beside
 * one? A zip counts, as does any of MAME's own cartridge file extensions.
 */
function looksLikeDump(file: string, raw: Uint8Array): boolean {
  if (raw[0] === 0x50 && raw[1] === 0x4b) return true;
  return /\.(rom|col|bin|a26|sg|sms|gg|nes)$/i.test(file);
}

/** The cartridge image inside an input: the file itself, or a zip's largest member. */
async function flatImage(
  raw: Uint8Array,
): Promise<{ image: Uint8Array | null; inner: string; innerCount: number }> {
  const isZip = raw[0] === 0x50 && raw[1] === 0x4b;
  if (!isZip) return { image: raw, inner: '', innerCount: 1 };
  let files: Map<string, Uint8Array>;
  try {
    files = await readZip(raw);
  } catch {
    return { image: null, inner: '', innerCount: 0 };
  }
  // A cartridge zip holds one image; the largest member is it either way.
  const [inner, image] = [...files.entries()]
    .sort((left, right) => right[1].length - left[1].length)[0] ?? ['', null];
  return { image, inner, innerCount: files.size };
}

/** Cut a flat image into the chips the entry declares, at their own offsets. */
function flatChips(
  image: Uint8Array,
  meta: { name: string; prg: { roms: Array<{ size: number; offset: number }> } },
): Array<{ name: string; bytes: Uint8Array }> | null {
  const labels = xml ? chipNames(xml, meta.name) : null;
  const chips: Array<{ name: string; bytes: Uint8Array }> = [];
  for (const [index, rom] of meta.prg.roms.entries()) {
    const end = rom.offset + rom.size;
    if (end > image.length) return null;
    const fallback = `${meta.name}${meta.prg.roms.length > 1 ? `.${index + 1}` : ''}.bin`;
    chips.push({ name: labels?.prg?.[index] ?? fallback, bytes: image.subarray(rom.offset, end) });
  }
  return chips.length ? chips : null;
}

/** A manifest row for a flat-image cartridge, in the same shape the NES rows use. */
function flatRow(
  file: string,
  target: string,
  image: Uint8Array,
  match: ReturnType<typeof identifyCartImage>,
  zipBytes: number,
  inner: string,
  innerCount: number,
  packaging = 'as-supplied',
): Record<string, unknown> {
  return {
    file,
    zip_bytes: zipBytes,
    inner: inner || basename(file),
    inner_count: innerCount,
    image_sha1: sha1(image),
    image_crc32: hex8(crc32(image)),
    image: { format: 'raw cartridge', size: image.length },
    status: match?.verified ? 'verified' : match ? 'variant' : 'unidentified',
    ...(match ? { chips_matched: match.matched, chips_total: match.total } : {}),
    match: match ? {
      name: match.entry.name,
      description: match.entry.description ?? null,
      cloneof: match.entry.cloneof ?? null,
      year: match.entry.year ?? null,
      publisher: match.entry.publisher ?? null,
      slot: match.entry.slot ?? null,
    } : null,
    target,
    packaging,
    ...(chipsOf(match) ? { members: chipsOf(match) } : {}),
    imported_by: 'import-new-roms',
  };
}

/**
 * Get a parsed iNES image out of an input, which may be a raw dump or a zip.
 * A zip already packed as a MAME chip set is rebuilt rather than searched, so
 * re-importing an exported set round-trips instead of failing.
 */
async function loadImage(
  raw: Uint8Array,
): Promise<{ ines: NonNullable<ReturnType<typeof parseINes>>; inner: string; innerCount: number } | null> {
  const direct = parseINes(raw);
  if (direct) return { ines: direct, inner: '', innerCount: 1 };

  const isZip = raw[0] === 0x50 && raw[1] === 0x4b;
  if (!isZip) return null;

  let files: Map<string, Uint8Array>;
  try {
    files = await readZip(raw);
  } catch {
    return null;
  }

  const set = inesFromSoftlistSet(files, catalog, {});
  if (set) {
    const ines = parseINes(set.bytes);
    if (ines) return { ines, inner: [...files.keys()].join(', '), innerCount: files.size };
  }

  for (const [name, bytes] of files) {
    const ines = parseINes(bytes);
    if (ines) return { ines, inner: name, innerCount: files.size };
  }
  return null;
}

/**
 * Cut the parsed image into the chips the catalog entry declares, labelling
 * each from nes.xml when that source is available.
 */
function splitChips(
  ines: NonNullable<ReturnType<typeof parseINes>>,
  meta: { name: string; prg?: { roms: Array<{ size: number }> }; chr?: { roms: Array<{ size: number }> } },
): Array<{ name: string; bytes: Uint8Array }> | null {
  const labels = xml ? chipNames(xml, meta.name) : null;
  const chips: Array<{ name: string; bytes: Uint8Array }> = [];
  const cut = (area: { roms: Array<{ size: number }> } | undefined, data: Uint8Array | null, kind: 'prg' | 'chr') => {
    if (!area?.roms.length) return data === null || data.length === 0;
    if (!data) return false;
    let off = 0;
    for (const [i, rom] of area.roms.entries()) {
      if (off + rom.size > data.length) return false;
      const fallback = `${meta.name} ${kind}${area.roms.length > 1 ? ` ${i}` : ''}.bin`;
      chips.push({ name: labels?.[kind]?.[i] ?? fallback, bytes: data.subarray(off, off + rom.size) });
      off += rom.size;
    }
    return off === data.length;
  };
  if (!cut(meta.prg, ines.prg, 'prg')) return null;
  if (!cut(meta.chr, ines.chr, 'chr')) return null;
  return chips.length ? chips : null;
}

/** Pull a software entry's per-dataarea rom labels straight out of hash/<list>.xml. */
function chipNames(source: string, entry: string): { prg: string[]; chr: string[] } | null {
  const open = source.indexOf(`<software name="${entry}"`);
  if (open < 0) return null;
  const close = source.indexOf('</software>', open);
  const block = source.slice(open, close < 0 ? undefined : close);
  const area = (kind: string): string[] => {
    const start = block.indexOf(`<dataarea name="${kind}"`);
    if (start < 0) return [];
    const end = block.indexOf('</dataarea>', start);
    const slice = block.slice(start, end < 0 ? undefined : end);
    return [...slice.matchAll(/<rom name="([^"]+)"/g)].map(match => match[1]);
  };
  // A single-area list calls its program area "rom"; the catalog folds both
  // spellings into `prg`, so the labels have to follow.
  const program = area('prg');
  return { prg: program.length ? program : area('rom'), chr: area('chr') };
}

/** A row in the shape the existing audit writes, so both readers stay happy. */
function manifestRow(
  file: string,
  meta: {
    name: string;
    description?: string;
    cloneof?: string;
    year?: string;
    publisher?: string;
    slot?: string;
    pcb?: string;
  },
  ines: NonNullable<ReturnType<typeof parseINes>>,
  chips: Array<{ name: string; bytes: Uint8Array }>,
  zipBytes: number,
  inner: string,
  innerCount: number,
): Record<string, unknown> {
  const image = new Uint8Array(16 + ines.prg.length + (ines.chr?.length ?? 0));
  image.set(ines.prg, 16);
  if (ines.chr) image.set(ines.chr, 16 + ines.prg.length);
  return {
    file,
    zip_bytes: zipBytes,
    goodnes_class: 'unclassified',
    inner: inner || basename(file),
    inner_count: innerCount,
    image_sha1: sha1(image),
    image_crc32: hex8(crc32(image)),
    image: {
      format: ines.nes2 ? 'NES 2.0' : 'iNES',
      mapper: ines.mapper,
      prg_size: ines.prg.length,
      chr_size: ines.chr?.length ?? 0,
      trainer: ines.trainer,
      trailing_bytes: 0,
      truncated: false,
    },
    prg_sha1: sha1(ines.prg),
    prg_crc32: hex8(crc32(ines.prg)),
    chr_sha1: ines.chr ? sha1(ines.chr) : null,
    chr_crc32: ines.chr ? hex8(crc32(ines.chr)) : null,
    status: 'verified',
    match: {
      name: meta.name,
      description: meta.description ?? null,
      cloneof: meta.cloneof ?? null,
      year: meta.year ?? null,
      publisher: meta.publisher ?? null,
      slot: meta.slot ?? null,
      pcb: meta.pcb ?? null,
    },
    target: `${meta.name}.zip`,
    packaging: 'mame-softlist-chips',
    members: chips.map(chip => chip.name),
    imported_by: 'import-new-roms',
  };
}

/** Merge rows into the set manifest, replacing any row already filed at the same target. */
function updateManifest(rows: Record<string, unknown>[]): void {
  const manifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8')) as { carts?: Record<string, unknown>[] }
    : { carts: [] };
  const carts = Array.isArray(manifest.carts) ? manifest.carts : [];
  const added = new Set(rows.map(row => row.target as string));
  manifest.carts = [...carts.filter(cart => !added.has(cart.target as string)), ...rows];
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

/** Minimal store-only (method 0) zip. No compression: these are already dumps. */
function storedZip(entries: Array<{ name: string; bytes: Uint8Array }>): Buffer {
  const locals: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.name, 'utf8');
    const crc = crc32(entry.bytes) >>> 0;
    const size = entry.bytes.length;

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);   // version needed
    local.writeUInt16LE(0, 6);    // flags
    local.writeUInt16LE(0, 8);    // method: stored
    local.writeUInt32LE(0, 10);   // dos time+date, fixed so output is reproducible
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(size, 18);
    local.writeUInt32LE(size, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, name, Buffer.from(entry.bytes));

    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4);     // version made by
    dir.writeUInt16LE(20, 6);     // version needed
    dir.writeUInt16LE(0, 8);
    dir.writeUInt16LE(0, 10);
    dir.writeUInt32LE(0, 12);
    dir.writeUInt32LE(crc, 16);
    dir.writeUInt32LE(size, 20);
    dir.writeUInt32LE(size, 24);
    dir.writeUInt16LE(name.length, 28);
    dir.writeUInt32LE(0, 30);     // extra + comment lengths
    dir.writeUInt16LE(0, 34);     // disk number
    dir.writeUInt32LE(0, 36);     // internal + external attrs
    dir.writeUInt32LE(offset, 42);
    central.push(dir, name);

    offset += 30 + name.length + size;
  }

  const dirBytes = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(dirBytes.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, dirBytes, end]);
}

/** Move an input out of the drop zone, never overwriting an earlier run's file. */
function park(src: string, file: string, bucket: string): void {
  if (dryRun) return;
  const dir = join(newDir, bucket);
  mkdirSync(dir, { recursive: true });
  let dest = join(dir, file);
  for (let n = 2; existsSync(dest); n++) dest = join(dir, `${file}.${n}`);
  renameSync(src, dest);
}

// Declarations, not const arrows: these are called from manifestRow() above,
// which runs during the import loop, before a const at this point would init.
function sha1(bytes: Uint8Array): string {
  return createHash('sha1').update(bytes).digest('hex');
}

function hex8(n: number): string {
  return (n >>> 0).toString(16).padStart(8, '0');
}

function report(file: string, verdict: string, detail: string): void {
  console.log(`  ${verdict.padEnd(13)} ${file}\n${' '.repeat(16)}${detail}`);
}

function flagValue(flag: string): string | undefined {
  const at = argv.indexOf(flag);
  return at >= 0 ? argv[at + 1] : undefined;
}

function fail(message: string): never {
  console.error(`import-new-roms: ${message}`);
  process.exit(1);
}
