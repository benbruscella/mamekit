import assert from 'node:assert/strict';
import { compileMameVideo } from "../mame/video-compiler.ts";
import { compileMameDevice } from "../mame/device-compiler.ts";
import { hyperspt } from "./hyperspt.game.ts";
import { assertGameContract, gameSourceGraph, mameSourceRoot } from "./test-support.ts";

assertGameContract(hyperspt);
const graph = gameSourceGraph(hyperspt);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === hyperspt.machine.className &&
  node.props.name === hyperspt.machine.name);
assert.ok(machine);
const devices = graph.nodes.filter(node => node.label === 'Device').map(node => String(node.props.type));
for (const type of ['KONAMI1', 'Z80', 'SN76489A', 'DAC_8BIT_R2R', 'VLM5030', 'TRACKFLD_AUDIO']) {
  assert.ok(devices.includes(type), `${type} is part of the board`);
}
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Hyper Sports video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

// The speech chip lowers from vlm5030.cpp with nothing left over: the forward
// `goto phase_stop`, the tms5110r.hxx coefficient set it points at, its
// dividing IP_SIZE_* macros and its own ROM region are all source facts.
const vlm = compileMameDevice(mameSourceRoot(), {
  type: 'VLM5030',
  className: 'vlm5030_device',
  sourceFile: 'src/devices/sound/vlm5030.cpp',
} as Parameters<typeof compileMameDevice>[1]);
assert.equal(vlm.summary.diagnostics, 0);
assert.deepEqual(vlm.romInterface, { addressBits: 16 });
assert.equal(vlm.constants.IP_SIZE_NORMAL, 40);
const coefficients = vlm.members.find(member => member.name === 'vlm5030_coeff')?.initialValue as
  { energy_bits: number; kbits: number[]; ktable: number[][] } | undefined;
assert.equal(coefficients?.energy_bits, 5);
assert.deepEqual(coefficients?.kbits, [6, 5, 4, 4, 3, 3, 3, 3, 3, 3]);
assert.equal(coefficients?.ktable[0]?.[0], 390);
for (const name of ['m_current_energy', 'm_current_pitch', 'm_coeff']) {
  assert.ok(vlm.members.some(member => member.name === name), `${name} is a member`);
}

console.log('hyperspt.game.spec: board, video and VLM5030 source lowering passed');
