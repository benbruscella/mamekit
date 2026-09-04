import assert from 'node:assert/strict';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { compileYm2203 } from '../mame/opn-compiler.ts';
import { gng } from './gng.game.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(gng);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(gng);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === gng.machine.className &&
  node.props.name === gng.machine.name);
assert.ok(machine);

const deviceTypes = graph.nodes
  .filter(node => node.label === 'Device')
  .map(node => String(node.props.type));
for (const type of ['MC6809', 'Z80', 'LS259', 'BUFFERED_SPRITERAM8', 'YM2203']) {
  assert.ok(deviceTypes.includes(type), `Ghosts'n Goblins must extract ${type}`);
}

// The YM2203s are declared through a device array finder, so their MAME tags
// come from the "ym%u" format and the starting index rather than the member
// name; the address map refers to them by those tags.
assert.deepEqual(
  graph.nodes
    .filter(node => node.label === 'Device' && node.props.type === 'YM2203')
    .map(node => ({
      tag: String(node.props.tag),
      config: (node.props.config as string[])[0],
    })),
  [
    { tag: 'ym1', config: "YM2203(config, m_ym[0], XTAL(12'000'000) / 8)" },
    { tag: 'ym2', config: "YM2203(config, m_ym[1], XTAL(12'000'000) / 8)" },
  ],
);

// add_route on an array element must still lower its gains: MAME rotates the
// ymfm outputs so the stream is [SSG0, SSG1, SSG2, FM].
const routes = graph.nodes
  .filter(node => node.label === 'AudioRoute')
  .map(node => Number(node.props.gain));
assert.deepEqual(routes, [0.4, 0.4, 0.4, 0.2, 0.4, 0.4, 0.4, 0.2]);

const video = compileMameVideo(graph, mameSrc, machine.id);
assert.ok(video, "Ghosts'n Goblins video source must lower to executable video IR");
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

// The palette has no color PROM: palette_device::set_format colors CPU-written
// palette RAM, split across a base share and a high-byte "_ext" share.
assert.equal(video.plan.palette, undefined);
const ramPalette = video.plan.ramPalette;
assert.ok(ramPalette);
assert.equal(ramPalette.tag, 'palette');
assert.equal(ramPalette.extShare, 'palette_ext');
assert.equal(ramPalette.entries, 256);
assert.equal(ramPalette.bytesPerEntry, 2);
assert.deepEqual(ramPalette.channels, [
  { channel: 'r', bits: 4, shift: 12 },
  { channel: 'g', bits: 4, shift: 8 },
  { channel: 'b', bits: 4, shift: 4 },
]);

// MAME fills the otherwise-random palette RAM during machine_reset so the
// ROM's early checkerboard/stripe RAM tests remain visible.
assert.equal(ramPalette.resetWrites?.length, 512);
assert.deepEqual(ramPalette.resetWrites?.slice(0, 8), [
  { offset: 0, data: 0x00 },
  { offset: 0, data: 0x00, ext: true },
  { offset: 1, data: 0x55 },
  { offset: 1, data: 0x55, ext: true },
  { offset: 2, data: 0xaa },
  { offset: 2, data: 0xaa, ext: true },
  { offset: 3, data: 0xff },
  { offset: 3, data: 0xff, ext: true },
]);
assert.equal(ramPalette.resetSource?.file, 'src/mame/capcom/gng.cpp');
assert.equal(ramPalette.resetSource?.line, 550);

// The background tilemap splits into front and back halves by tile group.
assert.deepEqual(
  video.plan.tilemaps.map(tilemap => tilemap.transmasks ?? tilemap.transparentPen),
  [
    3,
    [
      { group: 0, foreground: 0xff, background: 0x00 },
      { group: 1, foreground: 0x41, background: 0xbe },
    ],
  ],
);

// buffered_spriteram8_device is a template instantiation; the compiler must
// resolve the base class through its template argument and lower copy(),
// which needs memcpy, std::min, sizeof and default arguments.
const spriteram = compileMameDevice(mameSrc, {
  type: 'BUFFERED_SPRITERAM8',
  className: 'buffered_spriteram8_device',
  sourceFile: 'src/devices/video/bufsprite.cpp',
  sourceLine: 20,
  sourceColumn: 1,
  macro: '',
});
assert.equal(spriteram.summary.diagnostics, 0);
for (const name of ['copy', 'buffer', 'bytes', 'length', 'write', 'device_start']) {
  assert.ok(
    spriteram.methods.some(method => method.name === name),
    `buffered spriteram must lower ${name}()`,
  );
}
assert.deepEqual(
  spriteram.members.find(member => member.name === 'm_spriteram')?.memory,
  { kind: 'shared', elementBytes: 1, share: 'self' },
);
assert.deepEqual(
  spriteram.members.find(member => member.name === 'm_buffered')?.memory,
  { kind: 'owned', elementBytes: 1 },
);

// The OPN plan carries the die-extracted ymfm tables and the fidelity and
// prescale ratios MAME's device wrapper selects.
const opn = compileYm2203(mameSrc, {
  type: 'YM2203',
  className: 'ym2203_device',
  sourceFile: 'src/devices/sound/ymopn.cpp',
  sourceLine: 12,
  sourceColumn: 1,
  macro: '',
});
assert.equal(opn.sampleRateDivider, 12);
assert.equal(opn.fmSamplesPerOutput, 6);
assert.deepEqual(opn.ssgResample, [4, 3]);
assert.deepEqual(opn.prescale.selectors, [
  { address: 0x2d, prescale: 6 },
  { address: 0x2e, prescale: 3, requiresPrescale: 6 },
  { address: 0x2f, prescale: 2 },
]);
assert.deepEqual(opn.prescale.ratios, {
  2: { fmSamplesPerOutput: 2, ssgResample: [1, 3] },
  3: { fmSamplesPerOutput: 3, ssgResample: [2, 3] },
  6: { fmSamplesPerOutput: 6, ssgResample: [4, 3] },
});
assert.equal(opn.fm.channels, 3);
assert.equal(opn.fm.operators, 12);
assert.equal(opn.fm.egClockDivider, 3);
assert.equal(opn.fm.waveformLength, 0x400);
assert.deepEqual(opn.fm.operatorMap, [[0, 6, 3, 9], [1, 7, 4, 10], [2, 8, 5, 11]]);
assert.equal(opn.fm.sinTable.length, 256);
assert.equal(opn.fm.sinTable[0], 0x859);
assert.equal(opn.fm.powerTable.length, 256);
// X(a) folds in the implied leading bit and the two-bit DAC shift.
assert.equal(opn.fm.powerTable[0], (0x3fa | 0x400) << 2);
assert.equal(opn.fm.incrementTable.length, 64);
assert.deepEqual(opn.fm.detuneTable[16], [0, 2, 5, 8]);
assert.deepEqual(opn.ssg.noiseTaps, [0, 3]);
assert.equal(opn.ssg.amplitudes.length, 32);
assert.equal(opn.ssg.amplitudes.at(-1), 16382);

// Register bitfields come from opn_registers_base/ssg_registers accessors.
assert.deepEqual(opn.fm.fields.ch_algorithm, {
  parts: [{ offset: 0xb0, offsetStride: 1, shift: 0, shiftStride: 0, width: 3 }],
});
assert.deepEqual(opn.ssg.fields.ch_tone_period, {
  parts: [
    { offset: 0x01, offsetStride: 2, shift: 0, shiftStride: 0, width: 4 },
    { offset: 0x00, offsetStride: 2, shift: 0, shiftStride: 0, width: 8 },
  ],
});
assert.deepEqual(opn.ssg.fields.ch_noise_enable_n, {
  parts: [{ offset: 0x07, offsetStride: 0, shift: 3, shiftStride: 1, width: 1 }],
});

console.log('gng source spec passed');
