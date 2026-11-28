import assert from 'node:assert/strict';
import type { ShellConfig } from '../../src/runtime/shell.ts';
import type { IoAccess } from './compare.ts';
import { compareByCpu, divergeRanges, earliest, pairAccesses, TIME_TOLERANCE_CYCLES } from './diverge-plan.ts';

const board = (cpus: { tag: string; ranges: object[] }[]) => ({ board: { cpus } }) as unknown as ShellConfig;

// --- ranges: what more than one processor touches, from the maps -----------

// Marble Madness's shape: two latches between a 68010 and a 6502, a bank
// register, a sound chip only the 6502 reaches, a driver register nobody shares.
const marble = board([
  {
    tag: 'maincpu', ranges: [
      { start: 0, end: 0x7ffff, kind: 'rom' },
      { start: 0x400000, end: 0x401fff, kind: 'ram' },
      { start: 0x800000, end: 0x800001, kind: 'handler', write: 'atarisy1_state.xscroll_w', share: 'xscroll' },
      { start: 0x860001, end: 0x860001, kind: 'handler', write: 'atarisy1_state.bankselect_w' },
      { start: 0xf80001, end: 0xf80001, kind: 'handler', write: 'soundlatch.write' },
      { start: 0xfc0001, end: 0xfc0001, kind: 'handler', read: 'mainlatch.read' },
      { start: 0x80000, end: 0x81fff, kind: 'handler', read: 'bank.slapstic_bank', bank: 'slapstic_bank' },
    ],
  },
  {
    tag: 'audiocpu', ranges: [
      { start: 0, end: 0xfff, kind: 'ram', mirror: 0x2000 },
      { start: 0x1800, end: 0x1801, kind: 'handler', read: 'ymsnd.read', write: 'ymsnd.write', mirror: 0x278e },
      { start: 0x1810, end: 0x1810, kind: 'handler', read: 'soundlatch.read', mirror: 0x278f },
      { start: 0x1810, end: 0x1810, kind: 'handler', write: 'mainlatch.write', mirror: 0x278f },
    ],
  },
]);
const taps = divergeRanges(marble);
const on = (tag: string) => taps.filter(tap => tap.tag === tag).map(tap => [tap.lo.toString(16), tap.hi.toString(16)]);
assert.deepEqual(on('maincpu'), [['860001', '860001'], ['f80001', 'f80001'], ['fc0001', 'fc0001']],
  'the latches both processors reach and the bank register; not RAM, ROM, a bank window or an unshared driver register');
assert.ok(taps.find(tap => tap.lo === 0xf80001)!.why.includes('soundlatch (shared)'));
assert.deepEqual(on('audiocpu'), [['1810', '3f9f']], 'a mirrored latch is tapped across its mirrors');
assert.ok(!taps.some(tap => tap.why.some(why => why.startsWith('ymsnd'))), 'a chip one processor reaches is not shared');

// The Spectrum's ULA: one port whose upper address lines are its offset
// (`map(0x00, 0x00).select(0xfffe)`), so it is read at $FEFE, $7FFE, ...
const spectrum = divergeRanges({ board: { cpus: [{ tag: 'maincpu', ranges: [], io: { ranges: [
  { start: 0, end: 0, kind: 'handler', select: 0xfffe, read: 'spectrum_state.spectrum_ula_r', write: 'spectrum_state.spectrum_ula_w' },
  { start: 1, end: 1, kind: 'handler', select: 0xfffe, read: 'spectrum_state.spectrum_port_r', write: 'spectrum_state.spectrum_port_w' },
] } }] } } as unknown as ShellConfig);
assert.deepEqual(spectrum.map(tap => [tap.space, tap.lo, tap.hi]), [['io', 0, 0xffff]], 'a selected port is tapped across its select bits');

// Shared RAM, as Galaga's three Z80s map it.
const galaga = divergeRanges(board(['maincpu', 'sub', 'sub2'].map(tag => ({
  tag, ranges: [{ start: 0x8000, end: 0x87ff, kind: 'ram', share: 'videoram' }, { start: 0x8800, end: 0x8bff, kind: 'ram', share: 'galaga_ram1' }],
}))));
assert.deepEqual(galaga.map(tap => [tap.tag, tap.lo.toString(16), tap.hi.toString(16)]),
  [['maincpu', '8000', '8bff'], ['sub', '8000', '8bff'], ['sub2', '8000', '8bff']], 'adjacent shares merge into one range');

// One processor: nothing is shared, so every device handler and control register.
const nes = divergeRanges(board([{
  tag: 'maincpu', ranges: [
    { start: 0, end: 0x7ff, kind: 'ram', mirror: 0x1800 },
    { start: 0x2000, end: 0x2007, kind: 'handler', read: 'ppu.read', write: 'ppu.write', mirror: 0x1ff8 },
    { start: 0x4016, end: 0x4016, kind: 'handler', read: 'nes_state.nes_in0_r' },
  ],
}]));
assert.deepEqual(nes.map(tap => [tap.lo.toString(16), tap.hi.toString(16)]), [['2000', '3fff']]);

// --- comparing the traces, per processor -------------------------------------

const access = (tap: number, kind: 'R' | 'W', address: string, data: string, us: number, frame = 10): IoAccess =>
  ({ frame, kind, tap, address, data, time: us / 1e6 });
const pair = [{ tag: 'maincpu' }, { tag: 'audiocpu' }];
const clocks = { maincpu: 7_159_090, audiocpu: 1_789_772 };
const mame = [
  access(0, 'W', 'f80001', '3a', 100), access(1, 'R', '1810', '3a', 101),
  access(0, 'W', 'f80001', '3b', 200), access(1, 'R', '1810', '3b', 210),
];
// A cycle out of phase from boot is identical; the second command read late is a time difference.
const ours = [
  access(0, 'W', 'f80001', '3a', 100 + 1e6 / clocks.maincpu), access(1, 'R', '1810', '3a', 101),
  access(0, 'W', 'f80001', '3b', 200), access(1, 'R', '1810', '3b', 260),
];
const result = compareByCpu(mame, ours, pair, clocks);
assert.equal(result[0]!.first, undefined, `within ${TIME_TOLERANCE_CYCLES} cycles is the same access`);
assert.equal(result[1]!.first?.reason, 'time');
assert.equal(result[1]!.first?.index, 1);
assert.ok(Math.abs(result[1]!.first!.cycles! - 50e-6 * clocks.audiocpu) < 1);
assert.deepEqual(result[1]!.first!.before.map(entry => entry.data), ['3a'], 'the agreed accesses before it');

// A value difference wins over time; a side that stops is missing.
const wrong = compareByCpu(mame, [ours[0]!, ours[1]!, access(0, 'W', 'f80001', '3c', 200)], pair, clocks);
assert.equal(wrong[0]!.first?.reason, 'value');
assert.equal(wrong[0]!.first?.ours?.data, '3c');
assert.equal(wrong[1]!.first?.reason, 'missing');
assert.equal(earliest(wrong)?.tag, 'maincpu', 'the processor that left MAME first, by emulated time');

// The listing pairs every access of one processor, marking where they part.
const listed = pairAccesses(mame, [ours[0]!, ours[1]!, access(0, 'W', 'f80001', '3c', 200)], pair, clocks, 'audiocpu');
assert.equal(listed.length, 2);
assert.equal(listed[0]!.differs, false);
assert.ok(listed[0]!.cycles !== undefined);
assert.equal(listed[1]!.ours, undefined);
assert.equal(listed[1]!.differs, true, 'a side with no access here differs');

console.log('diverge-plan.spec: ok');
