import assert from 'node:assert/strict';
import { compileMameM6801U4 } from '../mame/cpu-compiler.ts';
import { compileYm3526 } from '../mame/opl-compiler.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { bublbobl } from './bublbobl.ts';
import {
  assertGameContract,
  gameSourceGraph,
  mameSourceRoot,
} from './test-support.ts';

assertGameContract(bublbobl);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(bublbobl);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === bublbobl.machine.className &&
  node.props.name === bublbobl.machine.name);
assert.ok(machine);

const devices = graph.nodes
  .filter(node => node.label === 'Device')
  .map(node => String(node.props.type));
for (const type of [
  'Z80',
  'M6801U4',
  'GENERIC_LATCH_8',
  'INPUT_MERGER_ANY_HIGH',
  'INPUT_MERGER_ALL_HIGH',
  'YM2203',
  'YM3526',
]) {
  assert.ok(devices.includes(type), `Bubble Bobble must extract ${type}`);
}

const bank = graph.nodes.find(node =>
  node.label === 'MemoryBank' && node.props.tag === 'bank1');
assert.ok(bank);
assert.equal(bank.props.entries, 8);
assert.equal(bank.props.region, 'maincpu');
assert.equal(bank.props.offset, 0x10000);
assert.equal(bank.props.stride, 0x4000);

const video = compileMameVideo(graph, mameSrc, machine.id);
assert.ok(video, 'Bubble Bobble direct object renderer must lower to video IR');
assert.deepEqual(video.plan.tilemaps, []);
assert.equal(video.plan.ramPalette?.entries, 256);
assert.equal(video.plan.ramPalette?.bytesPerEntry, 2);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

const m6801 = compileMameM6801U4(mameSrc);
assert.equal(m6801.type, 'M6801U4');
assert.equal(m6801.summary.diagnostics, 0);
assert.deepEqual(m6801.internal?.ram, [{ start: 0x40, end: 0xff }]);
assert.deepEqual(
  m6801.internal?.ports.map(port => [port.directionAddress, port.dataAddress]),
  [[0x00, 0x02], [0x01, 0x03], [0x04, 0x06], [0x05, 0x07]],
);

const opl = compileYm3526(mameSrc, {
  type: 'YM3526',
  className: 'ym3526_device',
  sourceFile: 'src/devices/sound/ymopl.cpp',
  sourceLine: 12,
  sourceColumn: 1,
  macro: '',
});
assert.equal(opl.channels, 9);
assert.equal(opl.operators, 18);
assert.equal(opl.sampleRateDivider, 72);

for (const method of [
  'bublbobl_bankswitch_w',
  'bublbobl_mcu_port1_w',
  'bublbobl_mcu_port2_w',
  'bublbobl_mcu_port3_r',
  'bublbobl_mcu_port3_w',
  'bublbobl_mcu_port4_w',
  'common_sound_semaphores_r',
]) {
  const handler = graph.nodes.find(node =>
    node.label === 'Handler' &&
    node.props.ownerClass === 'bublbobl_state' &&
    node.props.method === method);
  assert.ok(handler?.props.sourceBody, `${method} must come from bublbobl_m.cpp`);
}

console.log('bublbobl source spec passed');
