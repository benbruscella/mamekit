// Self-test for iNES header parsing + softlist-catalog identification.
// Run with: node src/runtime/nes-ines.spec.ts

import {
  parseINes,
  identify,
  inesFromSoftlistSet,
  inesSoftwarePart,
  mountedINesPrg,
  type SoftCatalog,
  type SoftEntry,
} from './nes-ines.ts';
import { crc32 } from './zip.ts';

let totalPass = 0;
let totalFail = 0;

function eq(label: string, actual: unknown, expected: unknown): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    totalPass++;
  } else {
    totalFail++;
    console.log(`  FAIL ${label}: got ${a}, want ${e}`);
  }
}

const hex8 = (n: number) => n.toString(16).padStart(8, '0');

/** build a synthetic .nes file */
function makeINes(opts: {
  prgBanks: number; chrBanks: number; flags6?: number; flags7?: number;
  byte8?: number; dirtyTail?: boolean; trainer?: boolean;
  prgFill?: (i: number) => number; chrFill?: (i: number) => number;
}): Uint8Array {
  const prgSize = opts.prgBanks * 0x4000;
  const chrSize = opts.chrBanks * 0x2000;
  const trainerSize = opts.trainer ? 512 : 0;
  const out = new Uint8Array(16 + trainerSize + prgSize + chrSize);
  out.set([0x4e, 0x45, 0x53, 0x1a]);
  out[4] = opts.prgBanks;
  out[5] = opts.chrBanks;
  out[6] = (opts.flags6 ?? 0) | (opts.trainer ? 0x04 : 0);
  out[7] = opts.flags7 ?? 0;
  out[8] = opts.byte8 ?? 0;
  if (opts.dirtyTail) out.set([0x44, 0x75, 0x64, 0x65], 12); // "Dude"
  for (let i = 0; i < prgSize; i++) out[16 + trainerSize + i] = opts.prgFill ? opts.prgFill(i) : (i * 7) & 0xff;
  for (let i = 0; i < chrSize; i++) out[16 + trainerSize + prgSize + i] = opts.chrFill ? opts.chrFill(i) : (i * 13) & 0xff;
  return out;
}

// --- header parsing ---------------------------------------------------------
{
  const f = makeINes({ prgBanks: 2, chrBanks: 1, flags6: 0x01 });
  const p = parseINes(f)!;
  eq('nrom parse ok', p !== null, true);
  eq('prg size', p.prgSize, 0x8000);
  eq('chr size', p.chrSize, 0x2000);
  eq('mapper 0', p.mapper, 0);
  eq('vertical mirroring', p.mirroring, 'vertical');
  eq('no battery', p.battery, false);
  eq('prg slice', [p.prg.length, p.prg[0], p.prg[1]], [0x8000, 0, 7]);
  eq('chr slice', [p.chr!.length, p.chr![0], p.chr![1]], [0x2000, 0, 13]);
}
{
  const p = parseINes(makeINes({ prgBanks: 1, chrBanks: 0, flags6: 0x42 | (4 << 4), flags7: 0x40 }))!;
  eq('mapper high nibble from byte 7', p.mapper, 68);
  eq('battery flag', p.battery, true);
  eq('chr-ram cart has null chr', p.chr, null);
  eq('horizontal mirroring', p.mirroring, 'horizontal');
}
{
  const p = parseINes(makeINes({ prgBanks: 1, chrBanks: 0, flags6: 4 << 4, flags7: 0x40, dirtyTail: true }))!;
  eq('dirty header: byte 7 ignored', p.mapper, 4);
}
{
  const p = parseINes(makeINes({ prgBanks: 1, chrBanks: 0, flags6: 0, flags7: 0x08 | 0x10, byte8: 0x02 }))!;
  eq('nes2 detected', p.nes2, true);
  eq('nes2 12-bit mapper', p.mapper, 0x210); // byte7 hi nibble 0x10 | byte8 low nibble 2 << 8
}
{
  const p = parseINes(makeINes({ prgBanks: 1, chrBanks: 1, flags6: 0x08 }))!;
  eq('four-screen flag wins', p.mirroring, 'four');
}
{
  // NES 2.0's exponent form: PRG nibble 0xf, size 2^E * (2M + 1). 2^15 is two
  // 16 KB banks; the 64 MB dpcmcart set is 2^26.
  const bytes = new Uint8Array(16 + 0x8000);
  bytes.set([0x4e, 0x45, 0x53, 0x1a, 15 << 2, 0, 0, 0x08, 0, 0x0f]);
  const p = parseINes(bytes)!;
  eq('nes2 exponent prg size', p.prgSize, 0x8000);
}
{
  const withTrainer = makeINes({ prgBanks: 1, chrBanks: 0, trainer: true, prgFill: () => 0xab });
  const p = parseINes(withTrainer)!;
  eq('trainer skipped', p.prg[0], 0xab);
  eq('trainer flag', p.trainer, true);
}
{
  const p = parseINes(makeINes({
    prgBanks: 1,
    chrBanks: 0,
    prgFill: index => index === 0x3fff ? 0x34 : index === 0 ? 0x12 : 0,
  }))!;
  const mounted = mountedINesPrg(p);
  eq('16K PRG is mounted twice like MAME call_load_ines', [
    mounted.length,
    mounted[0],
    mounted[0x3fff],
    mounted[0x4000],
    mounted[0x7fff],
  ], [0x8000, 0x12, 0x34, 0x12, 0x34]);
}
{
  eq('wrong magic -> null', parseINes(new Uint8Array(32).fill(0x4e)), null);
  eq('truncated -> null', parseINes(makeINes({ prgBanks: 2, chrBanks: 1 }).subarray(0, 100)), null);
  const trailing = makeINes({ prgBanks: 1, chrBanks: 1 });
  const padded = new Uint8Array(trailing.length + 128);
  padded.set(trailing);
  eq('trailing bytes tolerated', parseINes(padded) !== null, true);
}

// --- identification -----------------------------------------------------------
{
  const smbFile = makeINes({ prgBanks: 2, chrBanks: 1, flags6: 0x01 });
  const smbParsed = parseINes(smbFile)!;
  const smbPrgCrc = hex8(crc32(smbParsed.prg));
  const smbChrCrc = hex8(crc32(smbParsed.chr!));

  // multi-chip entry: two 16K prg chips whose concatenation = our prg slice
  const half0 = hex8(crc32(smbParsed.prg.subarray(0, 0x4000)));
  const half1 = hex8(crc32(smbParsed.prg.subarray(0x4000)));

  const entries: SoftEntry[] = [
    { name: 'smb', description: 'Super Mario Bros.', year: '1985', publisher: 'Nintendo', slot: 'nrom',
      prg: { size: 0x8000, roms: [{ size: 0x8000, crc: smbPrgCrc, offset: 0 }] },
      chr: { size: 0x2000, roms: [{ size: 0x2000, crc: smbChrCrc, offset: 0 }] } },
    { name: 'smbc', cloneof: 'smb', description: 'SMB (multichip rev)', year: '1985', publisher: 'Nintendo', slot: 'nrom',
      prg: { size: 0x8000, roms: [{ size: 0x4000, crc: half0, offset: 0 }, { size: 0x4000, crc: half1, offset: 0x4000 }] },
      chr: { size: 0x2000, roms: [{ size: 0x2000, crc: smbChrCrc, offset: 0 }] } },
    { name: 'mmc3game', description: 'Some MMC3 Game', year: '1990', publisher: 'X', slot: 'txrom',
      prg: { size: 0x4000, roms: [{ size: 0x4000, crc: half0, offset: 0 }] } },
  ];
  const crcIndex: Record<string, number[]> = {};
  entries.forEach((e, i) => { (crcIndex[e.prg.roms[0].crc] ??= []).push(i); });
  const catalog: SoftCatalog = { list: 'nes', description: 'test', interface: 'nes_cart', entries, crcIndex };
  const support = {
    slots: ['nrom', 'uxrom', 'cnrom', 'sxrom', 'txrom'],
    games: ['smb'],
    // Stands in for the slot's own get_default_card_ines.
    slotForImage: (_name: string, bytes: Uint8Array) =>
      (['nrom', 'sxrom', 'uxrom', 'cnrom', 'txrom'] as const)[parseINes(bytes)!.mapper],
  };

  const r = identify(smbParsed, catalog, support);
  eq('exact match found', r.meta?.name, 'smb');
  eq('exact not approx', r.approx, false);
  eq('slot from catalog', r.slot, 'nrom');
  eq('allowlisted title tested', r.tier, 'tested');
  eq('allowlisted title supported', r.supported, true);
  eq('tested is playable', r.playable, true);
  eq('prg crc exposed', r.prgCrc, smbPrgCrc);

  // clone matching via the multi-chip entry: remove the single-chip entry's
  // index so the multichip one is the only candidate
  const cat2: SoftCatalog = { ...catalog, entries: entries.slice(1), crcIndex: (() => {
    const ix: Record<string, number[]> = {};
    entries.slice(1).forEach((e, i) => { (ix[e.prg.roms[0].crc] ??= []).push(i); });
    return ix;
  })() };
  const r2 = identify(smbParsed, cat2, support);
  eq('multi-chip sub-slice match', r2.meta?.name, 'smbc');
  eq('clone of allowlisted parent supported', r2.supported, true);

  // chr mismatch -> approx prg-only match
  const otherChr = makeINes({ prgBanks: 2, chrBanks: 1, flags6: 0x01, chrFill: i => (i * 31) & 0xff });
  const r3 = identify(parseINes(otherChr)!, catalog, support);
  eq('prg-only match approx', [r3.meta?.name, r3.approx], ['smb', true]);

  // unknown dump on a SUPPORTED mapper (0=nrom): experimental, playable
  const unknown = makeINes({ prgBanks: 1, chrBanks: 0, prgFill: i => (i * 3 + 1) & 0xff });
  const r4 = identify(parseINes(unknown)!, catalog, support);
  eq('unknown dump unmatched', r4.identified, false);
  eq('unknown-but-supported-mapper -> experimental', r4.tier, 'experimental');
  eq('experimental is playable', r4.playable, true);
  eq('experimental not "supported" badge', r4.supported, false);

  // known (catalog) but not allowlisted, supported mapper -> experimental
  const mmc3File = makeINes({ prgBanks: 1, chrBanks: 0, flags6: 4 << 4, prgFill: i => (i * 7) & 0xff });
  const r5 = identify(parseINes(mmc3File)!, catalog, support);
  eq('known title matched', r5.meta?.name, 'mmc3game');
  eq('identified + supported mapper -> experimental', r5.tier, 'experimental');
  eq('experimental reason', r5.reason, 'runs on a supported board — not yet verified');

  // a header the slot's code picks no board for
  const m66 = parseINes(makeINes({ prgBanks: 1, chrBanks: 0, flags6: 2 << 4, flags7: 0x40 }))!;
  const r6 = identify(m66, null, support);
  eq('mapper 66 number', r6.mapper, 66);
  eq('no catalog: unknown mapper -> null slot', r6.slot, null);
  eq('mapper 66 unsupported', r6.tier, 'unsupported');
  eq('unsupported not playable', r6.playable, false);
  eq('mapper reason', r6.reason, 'iNES mapper 66 is not a board MAME knows');
}

console.log(`\nnes-ines.spec: ${totalPass} passed, ${totalFail} failed`);
if (totalFail > 0) process.exitCode = 1;

// --- MAME software-list chip sets ---------------------------------------------------
// A softlist zip has no iNES header: the chips are separate members named as
// nes.xml names them. Rebuilding must be by CRC (labels are not reproducible)
// and must produce an image the normal parse/identify path accepts.
{
  const prgChip = new Uint8Array(0x4000).fill(0xa5);
  const chrChip = new Uint8Array(0x2000).fill(0x5a);
  const prgCrc = hex8(crc32(prgChip));
  const chrCrc = hex8(crc32(chrChip));
  const entry: SoftEntry = {
    name: 'mario1',
    description: 'Mario Bros. (World)',
    year: '1983',
    publisher: 'Nintendo',
    slot: 'nrom',
    mirroring: 'horizontal',
    prg: { size: 0x8000, roms: [{ size: 0x4000, crc: prgCrc, offset: 0 }] },
    chr: { size: 0x2000, roms: [{ size: 0x2000, crc: chrCrc, offset: 0 }] },
  };
  const catalog: SoftCatalog = {
    list: 'nes',
    description: 'test',
    interface: 'nes_cart',
    entries: [entry],
    crcIndex: { [prgCrc]: [0], [chrCrc]: [0] },
  };

  // chip labels as MAME spells them, deliberately not in offset order
  const files = new Map<string, Uint8Array>([
    ['hvc-ma-0 chr', chrChip],
    ['hvc-ma-0 prg', prgChip],
  ]);
  const set = inesFromSoftlistSet(files, catalog);
  eq('chip set recognised', set !== null, true);
  eq('chip set entry', set?.entry.name, 'mario1');

  const rebuilt = set ? parseINes(set.bytes) : null;
  eq('rebuilt parses as iNES', rebuilt !== null, true);
  eq('rebuilt prg size', rebuilt?.prgSize, 0x4000);
  eq('rebuilt chr size', rebuilt?.chrSize, 0x2000);
  eq('mapper from slot', rebuilt?.mapper, 0);
  eq('rebuilt mirroring', rebuilt?.mirroring, 'horizontal');
  eq('rebuilt battery', rebuilt?.battery, false);

  // ...and identifies back to the same entry, exactly
  const resolved = rebuilt
    ? identify(rebuilt, catalog, { slots: ['nrom'], games: ['mario1'] })
    : null;
  eq('round trip identifies', resolved?.meta?.name, 'mario1');
  eq('round trip is exact', resolved?.approx, false);
  eq('round trip tier', resolved?.tier, 'tested');

  eq('incomplete set rejected',
    inesFromSoftlistSet(new Map([['hvc-ma-0 prg', prgChip]]), catalog), null);
  eq('unknown chips rejected',
    inesFromSoftlistSet(new Map([['x', new Uint8Array(0x4000).fill(3)]]), catalog), null);
  eq('no catalog rejected', inesFromSoftlistSet(files, null), null);

  // vertical mirroring and a battery survive the round trip
  const batteryCatalog: SoftCatalog = {
    ...catalog,
    entries: [{ ...entry, mirroring: 'vertical', bwram: 0x2000 }],
  };
  const bset = inesFromSoftlistSet(files, batteryCatalog);
  const bines = bset ? parseINes(bset.bytes) : null;
  eq('battery cart mirroring', bines?.mirroring, 'vertical');
  eq('battery cart battery flag', bines?.battery, true);

  // A board other than NROM carries the mapper MAME's tables give its slot,
  // and is named by its slot rather than as "mapper 0" (#167: smw is jyc_a,
  // mapper 90). A board this build cannot run says why.
  const jycCatalog: SoftCatalog = {
    ...catalog,
    entries: [{ ...entry, name: 'smw', slot: 'jyc_a', mapper: 90 }],
  };
  const jset = inesFromSoftlistSet(files, jycCatalog);
  const jines = jset ? parseINes(jset.bytes) : null;
  eq('rebuilt mapper from the slot', jines?.mapper, 90);
  const jyc = jines
    ? identify(jines, jycCatalog, { slots: ['nrom'], games: [], unsupported: { jyc_a: 'read_m does not lower' } })
    : null;
  eq('board named by its slot', jyc?.slot, 'jyc_a');
  eq('unsupported board says why', jyc?.reason, 'board jyc_a does not build: read_m does not lower');
  const jycPlays = jines ? identify(jines, jycCatalog, { slots: ['nrom', 'jyc_a'], games: [] }) : null;
  eq('a board that builds plays', jycPlays?.tier, 'experimental');
}

// --- sets with holes, odd sizes and reloads -----------------------------------------
// A software part is each area as MAME loads it. Super Mario Bros. 2's FDS
// conversions leave a hole between their chips, which concatenated is no
// whole number of banks; a 16 KB NROM-128 chip is reloaded to fill a 32 KB
// area, and MAME's call_load_pcb stops on a PRG area under 32 KB.
{
  const chip = (size: number, fill: number) => new Uint8Array(size).fill(fill);
  const [p0, p1, p2] = [chip(0x8000, 1), chip(0x800, 2), chip(0x2000, 3)];
  const c0 = chip(0x2000, 4);
  const crc = (bytes: Uint8Array) => hex8(crc32(bytes));
  const holed: SoftEntry = {
    name: 'smb2fdsc', description: 'hole', year: '1986', publisher: 'pirate', slot: 'smb2j', mapper: 40,
    prg: { size: 0xc000, roms: [
      { size: 0x8000, crc: crc(p0), offset: 0 },
      { size: 0x800, crc: crc(p1), offset: 0x8000 },
      { size: 0x2000, crc: crc(p2), offset: 0xa000 },
    ], fills: [{ offset: 0x8800, size: 0x1800, value: 0xff }] },
    chr: { size: 0x2000, roms: [{ size: 0x2000, crc: crc(c0), offset: 0 }] },
  };
  const nrom128: SoftEntry = {
    name: 'mario', description: 'reload', year: '1983', publisher: 'Nintendo', slot: 'nrom',
    prg: { size: 0x8000, roms: [{ size: 0x4000, crc: crc(chip(0x4000, 7)), offset: 0, reloads: [{ offset: 0x4000, size: 0x4000 }] }] },
    chr: { size: 0x2000, roms: [{ size: 0x2000, crc: crc(c0), offset: 0 }] },
  };
  const catalog: SoftCatalog = {
    list: 'nes', description: 'test', interface: 'nes_cart', entries: [holed, nrom128],
    crcIndex: { [crc(p0)]: [0], [crc(chip(0x4000, 7))]: [1] },
  };
  const set = inesFromSoftlistSet(new Map([['a', p0], ['b', p1], ['c', p2], ['d', c0]]), catalog);
  eq('a holed set rebuilds', set?.entry.name, 'smb2fdsc');
  const ines = set ? parseINes(set.bytes) : null;
  eq('laid out in whole banks', ines?.prgSize, 0xc000);
  eq('carrying its mapper', ines?.mapper, 40);
  const resolved = ines ? identify(ines, catalog, { slots: ['smb2j'], games: [] }) : null;
  eq('and identifies exactly', [resolved?.meta?.name, resolved?.approx], ['smb2fdsc', false]);
  const part = ines ? inesSoftwarePart(ines, holed) : null;
  eq('its part puts each chip at its offset', [part?.areas.prg?.[0x8000], part?.areas.prg?.[0x8800], part?.areas.prg?.[0xa000]], [2, 0xff, 3]);

  const marioSet = inesFromSoftlistSet(new Map([['p', chip(0x4000, 7)], ['c', c0]]), catalog);
  const mario = marioSet ? parseINes(marioSet.bytes) : null;
  eq('a 16 KB chip stays a 16 KB iNES PRG', mario?.prgSize, 0x4000);
  const marioPart = mario ? inesSoftwarePart(mario, nrom128) : null;
  eq('but its part is the 32 KB area, reloaded', [marioPart?.areas.prg?.length, marioPart?.areas.prg?.[0x4000]], [0x8000, 7]);
}

console.log(`nes-ines.spec: chip-set reassembly checked (${totalPass} passed, ${totalFail} failed)`);
if (totalFail) process.exitCode = 1;
