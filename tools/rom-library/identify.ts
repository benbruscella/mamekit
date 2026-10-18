// Which software-list chips one file is, by content alone.
//
// A file's title, folder and extension play no part: every match is a size,
// CRC32 and SHA1 hit against a chip MAME lists, so a dump cannot be filed under
// the wrong name the way a download page's label can. What varies by format is
// only where the chips sit inside the file:
//
//   flat image   the file IS the chip, or the chips laid end to end at their
//                load offsets (a tape, a disk, a 2600 or Game Boy cartridge)
//   iNES         a 16-byte header, then the PRG chips, then the CHR chips
//   CRT          a C64 cartridge container: one CHIP packet per ROM bank
//   D64          a disk image, optionally followed by one error byte a sector
//
// The result is a set of chip PIECES. Whether they add up to a complete set is
// decided later, over everything one archive holds (see shelf.ts).

import { createHash } from 'node:crypto';
import { crc32 } from 'node:zlib';
import type { SoftCatalog } from '../../src/kg/softlist.ts';
import { identifyCartImage } from '../../src/runtime/cart-identify.ts';
import { identify as identifyINes, parseINes } from '../../src/runtime/nes-ines.ts';
import type { Blob } from './archives.ts';
import { refRom, type ListEntry, type ListIndex, type ListRom, type RomRef, type SoftwareList } from './softlists.ts';

export interface Piece {
  ref: RomRef;
  bytes: Uint8Array;
  source: string;
}

/**
 * A flat cartridge image whose leading chips match an entry but whose last do
 * not: a different dump of a catalogued title, common between TOSEC and MAME
 * for the ColecoVision. Its real chip boundaries are unknown, so it is filed
 * whole and never claims the verified tier.
 */
export interface Variant {
  list: SoftwareList;
  entry: ListEntry;
  image: Uint8Array;
  matched: number;
  total: number;
  source: string;
}

/** A console list whose cartridges dump flat, with the extensions its slot accepts. */
export interface FlatList {
  list: SoftwareList;
  catalog: SoftCatalog;
  extensions: string[];
}

export interface Identifier {
  index: ListIndex;
  /** the NES's list, read through its own iNES reader */
  nes?: { list: SoftwareList; catalog: SoftCatalog };
  flat: FlatList[];
}

const hex8 = (value: number): string => (value >>> 0).toString(16).padStart(8, '0');

/** A D64 with its error table appended, and the image MAME lists without it. */
const D64_WITH_ERRORS: Record<number, number> = { 175531: 174848, 197376: 196608 };

export function identifyBlob(blob: Blob, identifier: Identifier): { pieces: Piece[]; variants: Variant[] } {
  const pieces: Piece[] = [];
  const claimed = new Set<string>();
  const add = (ref: RomRef, bytes: Uint8Array, via: string) => {
    const key = `${ref.list.name}:${ref.entry.name}:${ref.part}:${ref.area}:${ref.rom}`;
    if (claimed.has(key)) return;
    claimed.add(key);
    pieces.push({ ref, bytes, source: via ? `${blob.path} [${via}]` : blob.path });
  };
  const look = (bytes: Uint8Array, via = '') => {
    // A blank bank is in a hundred lists; matching one proves nothing.
    if (!bytes.length || isBlank(bytes)) return;
    const refs = identifier.index.lookup(bytes.length, hex8(crc32(bytes)));
    if (!refs.length) return;
    let digest: string | undefined;
    for (const ref of refs) {
      const rom = refRom(ref);
      // CRC32 narrows, SHA1 decides: the lists carry both.
      if (rom.sha1 && rom.sha1 !== (digest ??= sha1(bytes))) continue;
      add(ref, bytes, via);
    }
  };

  look(blob.bytes);

  const ines = isINes(blob.bytes) ? parseINes(blob.bytes) : null;
  if (ines) {
    look(ines.prg, 'PRG');
    if (ines.chr) look(ines.chr, 'CHR');
    // A cartridge built from several PRG or CHR chips: the NES reader names
    // the entry, and each chip is then cut at the offset the list gives it.
    const nes = identifier.nes;
    const meta = nes ? identifyINes(ines, nes.catalog, { slots: [], games: [] }).meta : undefined;
    const entry = meta ? nes!.list.byName.get(meta.name) : undefined;
    if (entry) {
      entry.parts.forEach((part, partIndex) => part.areas.forEach((area, areaIndex) => {
        const source = area.name === 'chr' ? ines.chr : area.name === 'prg' ? ines.prg : null;
        if (!source) return;
        area.roms.forEach((rom, romIndex) => {
          const chip = source.subarray(rom.offset, rom.offset + rom.size);
          if (chip.length !== rom.size || isBlank(chip) || hex8(crc32(chip)) !== rom.crc) return;
          if (rom.sha1 && sha1(chip) !== rom.sha1) return;
          add({ list: nes!.list, entry, part: partIndex, area: areaIndex, rom: romIndex }, chip, area.name.toUpperCase());
        });
      }));
    }
  }

  const crt = parseCrt(blob.bytes);
  if (crt) {
    for (const chip of crt) {
      look(chip.data, `CHIP ${chip.bank} @ $${chip.address.toString(16)}`);
      // MAME splits a 16K bank at $8000 into its ROML and ROMH halves.
      if (chip.data.length === 0x4000) {
        look(chip.data.subarray(0, 0x2000), `CHIP ${chip.bank} ROML half`);
        look(chip.data.subarray(0x2000), `CHIP ${chip.bank} ROMH half`);
      }
    }
    // A list may store a banked cartridge as one chip per window, or as one.
    const low = crt.filter(chip => chip.address === 0x8000);
    const high = crt.filter(chip => chip.address === 0xa000 || chip.address === 0xe000);
    if (low.length > 1) look(concat(low.map(chip => chip.data)), 'ROML banks');
    if (high.length > 1) look(concat(high.map(chip => chip.data)), 'ROMH banks');
    if (crt.length > 1) look(concat(crt.map(chip => chip.data)), 'all banks');
  }

  const trimmed = D64_WITH_ERRORS[blob.bytes.length];
  if (trimmed && /\.d64$/i.test(blob.name)) look(blob.bytes.subarray(0, trimmed), 'without error table');

  const variants: Variant[] = [];
  if (!pieces.length && !ines && !crt) {
    const extension = /\.[^.]+$/.exec(blob.name)?.[0].toLowerCase() ?? '';
    for (const flat of identifier.flat) {
      if (!flat.extensions.includes(extension)) continue;
      const match = identifyCartImage(blob.bytes, flat.catalog);
      if (!match) continue;
      const entry = flat.list.byName.get(match.entry.name);
      if (!entry) continue;
      // Every chip the image reproduces at its load offset is a piece. When
      // the rest are blank banks the set still completes (shelf.ts supplies
      // them); when they are not, the image is a different dump of the title.
      const before = pieces.length;
      entry.parts.forEach((part, partIndex) => part.areas.forEach((area, areaIndex) => area.roms.forEach((rom, romIndex) => {
        const chip = blob.bytes.subarray(rom.offset, rom.offset + rom.size);
        if (chip.length !== rom.size || isBlank(chip) || hex8(crc32(chip)) !== rom.crc) return;
        if (rom.sha1 && sha1(chip) !== rom.sha1) return;
        add({ list: flat.list, entry, part: partIndex, area: areaIndex, rom: romIndex }, chip, 'chip at its load offset');
      })));
      if (!match.verified && pieces.length > before) {
        variants.push({ list: flat.list, entry, image: blob.bytes, matched: match.matched, total: match.total, source: blob.path });
      }
    }
  }
  return { pieces, variants };
}

/** Every byte the same: an erased or unprogrammed bank, not a dump of anything. */
export function isBlank(bytes: Uint8Array): boolean {
  if (bytes.length < 16) return false;
  const first = bytes[0];
  for (let i = 1; i < bytes.length; i++) if (bytes[i] !== first) return false;
  return true;
}

/**
 * The bytes of a chip MAME lists as a blank bank (all $00 or all $FF), or
 * null when it is not one. The list's CRC and SHA1 confirm it, so a set whose
 * only missing chip is blank completes from the real dump of the others.
 */
export function blankChip(rom: ListRom): Uint8Array | null {
  for (const fill of [0xff, 0x00]) {
    const bytes = new Uint8Array(rom.size).fill(fill);
    if (hex8(crc32(bytes)) === rom.crc && (!rom.sha1 || sha1(bytes) === rom.sha1)) return bytes;
  }
  return null;
}

function isINes(bytes: Uint8Array): boolean {
  return bytes.length > 16 && bytes[0] === 0x4e && bytes[1] === 0x45 && bytes[2] === 0x53 && bytes[3] === 0x1a;
}

interface CrtChip {
  bank: number;
  address: number;
  data: Uint8Array;
}

const CRT_SIGNATURE = 'C64 CARTRIDGE   ';

/** The CHIP packets of a C64 .crt, or null when the file is not one. */
export function parseCrt(bytes: Uint8Array): CrtChip[] | null {
  if (bytes.length < 0x40) return null;
  for (let i = 0; i < CRT_SIGNATURE.length; i++) {
    if (bytes[i] !== CRT_SIGNATURE.charCodeAt(i)) return null;
  }
  const be32 = (at: number) => ((bytes[at]! << 24) | (bytes[at + 1]! << 16) | (bytes[at + 2]! << 8) | bytes[at + 3]!) >>> 0;
  const be16 = (at: number) => (bytes[at]! << 8) | bytes[at + 1]!;
  const chips: CrtChip[] = [];
  let at = be32(0x10) || 0x40;
  while (at + 16 <= bytes.length) {
    if (bytes[at] !== 0x43 || bytes[at + 1] !== 0x48 || bytes[at + 2] !== 0x49 || bytes[at + 3] !== 0x50) break;
    const packet = be32(at + 4);
    const size = be16(at + 14);
    chips.push({ bank: be16(at + 10), address: be16(at + 12), data: bytes.subarray(at + 16, at + 16 + size) });
    if (packet < 16) break;
    at += packet;
  }
  return chips.length ? chips : null;
}

function concat(parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let at = 0;
  for (const part of parts) { out.set(part, at); at += part.length; }
  return out;
}

export function sha1(bytes: Uint8Array): string {
  return createHash('sha1').update(bytes).digest('hex');
}
