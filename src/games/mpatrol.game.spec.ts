import assert from 'node:assert/strict';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { indexMameHardware } from '../mame/hardware.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { mpatrol } from './mpatrol.game.ts';
import {
  assertGameContract,
  gameSourceGraph,
  mameSourceRoot,
} from './test-support.ts';

assertGameContract(mpatrol);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(mpatrol);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === mpatrol.machine.className &&
  node.props.name === mpatrol.machine.name);
assert.ok(machine);

const types = new Set(
  graph.nodes
    .filter(node => node.label === 'Device')
    .map(node => String(node.props.type)),
);
for (const type of ['Z80', 'M6803', 'AY8910', 'MSM5205', 'DISCRETE']) {
  assert.ok(types.has(type), `Moon Patrol graph must extract ${type}`);
}
const video = compileMameVideo(graph, mameSrc, machine.id);
assert.ok(video, 'Moon Patrol MAME video source must lower to executable video IR');
assert.deepEqual(video.plan.gfx.map(entry => entry.region), [
  'sp', 'tx', 'bg0', 'bg1', 'bg2',
]);
// None of the three palettes has an init callback: m52_state::init_palette,
// called from video_start, colours them through their finders, and the host
// allocates each with the counts its configuration sets.
assert.deepEqual(video.paletteCallbacks, [
  { member: 'm_sp_palette', entries: 256, indirectEntries: 32 },
  { member: 'm_tx_palette', entries: 512 },
  { member: 'm_bg_palette', entries: 12, indirectEntries: 32 },
]);
assert.deepEqual(video.plan.tilemaps[0]?.scrollDx, [127, 127]);
assert.deepEqual(video.plan.tilemaps[0]?.scrollDy, [16, 16]);
assert.deepEqual(video.plan.initialState.m_bgxpos, [0, 0]);
assert.deepEqual(video.plan.initialState.m_bgypos, [0, 0]);
assert.equal(video.plan.initialState.m_spritelimit, 0xfc);
assert.equal(video.plan.initialState.m_do_bg_fills, 1);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
const flipHandler = graph.nodes.find(node =>
  node.label === 'Handler' &&
  node.props.ownerClass === 'm52_state' &&
  node.props.method === 'flipscreen_w');
assert.deepEqual(flipHandler?.props.inputMembers, ['m_dsw2=DSW2']);

// The sound CPU is MAME's m6803_cpu_device compiled whole: its opcode table
// from m6801.cpp, and its on-chip RAM a share its own internal map creates.
const m6803 = compileMameDevice(mameSrc, indexMameHardware(mameSrc).get('M6803')!, 'M6803');
assert.equal(m6803.summary.diagnostics, 0);
assert.equal(m6803.members.find(member => member.name === 'm_insn')?.values?.length, 256);
assert.ok(m6803.spaces?.some(space => space.index === 0 && space.map === 'm6803_mem'));

console.log('mpatrol.spec: game token and MAME-source machine contract passed');
