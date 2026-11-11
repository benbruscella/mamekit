import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { deviceDefinitionsFromSource, indexMameHardware } from '../mame/hardware.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { invaders } from './invaders.game.ts';
import {
  assertGameContract,
  gameSourceGraph,
  mameSourceRoot,
} from './test-support.ts';

assertGameContract(invaders);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(invaders);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === invaders.machine.className &&
  node.props.name === invaders.machine.name);
assert.ok(machine);

const customHandlers = graph.nodes.filter(node =>
  node.label === 'Handler' &&
  String(node.props.ownerClass) === 'invaders_state' &&
  /^(?:invaders_in[012]_control_r|invaders_sw5_r|invaders_sw6_sw7_r)$/.test(
    String(node.props.method),
  ));
assert.equal(customHandlers.length, 5);
assert.ok(graph.edges.some(edge =>
  edge.from === 'inputs:invaders/IN1/f4' &&
  edge.rel === 'CALLS_HANDLER' &&
  edge.to === 'handler:invaders_state.invaders_in1_control_r'));
assert.deepEqual(
  customHandlers.find(node => node.props.method === 'invaders_in1_control_r')
    ?.props.inputMembers,
  ['m_player_controls=CONTP1,CONTP2'],
);
assert.match(
  String(customHandlers.find(node => node.props.method === 'invaders_sw6_sw7_r')
    ?.props.sourceBody),
  /ioport\("SW6SW7"\)/,
);

const video = compileMameVideo(graph, mameSrc, machine.id);
assert.ok(video, 'Invaders MAME bitmap source must lower to executable video IR');
assert.deepEqual(video.plan.bitmap, {
  member: 'm_main_ram',
  rowStart: 32,
  rows: 224,
  bytesPerRow: 32,
  xOffset: 4,
  lsbFirst: true,
  flipXMember: 'm_flip_screen',
  flipYMember: 'm_flip_screen',
  black: 0xff000000,
  white: 0xffffffff,
  source: {
    file: 'src/mame/midw8080/mw8080bw_v.cpp',
    line: 356,
    column: 1,
  },
});

// The CPU is MAME's i8080_cpu_device compiled whole: i8085.cpp's execute_run
// and execute_one, with the 8080's own cycle table chosen by its init_tables.
const cpu = compileMameDevice(mameSrc, indexMameHardware(mameSrc).get('I8080')!, 'I8080');
assert.equal(cpu.summary.diagnostics, 0);
assert.ok(cpu.methods.some(method => method.name === 'execute_run'));
assert.ok(cpu.methods.some(method => method.name === 'execute_one'));
// i8085.h's lines: INTR right after the bare include guard, and TRAP as
// diexec.h's NMI in the board's numbering.
assert.equal(cpu.constants.I8085_INTR_LINE, 0);
assert.equal(cpu.constants.I8085_TRAP_LINE, -1);

const machineSource = 'src/devices/machine/mb14241.cpp';
const machineText = readFileSync(join(mameSrc, machineSource), 'utf8');
const shifterDefinition = deviceDefinitionsFromSource(machineSource, machineText)
  .find(definition => definition.type === 'MB14241');
assert.ok(shifterDefinition);
const shifter = compileMameDevice(mameSrc, shifterDefinition);
assert.equal(shifter.summary.methods, shifter.summary.compiledMethods);
assert.equal(shifter.summary.diagnostics, 0);

const audioSource = 'src/mame/midw8080/mw8080bw_a.cpp';
const audioText = readFileSync(join(mameSrc, audioSource), 'utf8');
const audioDefinition = deviceDefinitionsFromSource(audioSource, audioText)
  .find(definition => definition.type === 'INVADERS_AUDIO');
assert.ok(audioDefinition);
// The sound board is its MAME class compiled whole, holding the SN76477
// and DISCRETE its latches write.
const audio = compileMameDevice(mameSrc, audioDefinition);
assert.equal(audio.summary.diagnostics, 0);
assert.deepEqual(audio.children?.map(child => child.type), ['SN76477', 'DISCRETE']);

console.log('invaders.spec: CPU, bitmap, shifter and compiled sound board passed');
