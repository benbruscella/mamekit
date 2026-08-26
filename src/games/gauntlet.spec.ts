import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { gauntlet } from './gauntlet.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(gauntlet);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === gauntlet.machine.className &&
  node.props.name === gauntlet.machine.name);
assert.ok(machine);

const devices = graph.nodes.filter(node => node.label === 'Device');

// The Atari slapstic is the board's ROM security chip, and the chip number is
// the value the machine config passes as its clock. Reading it as anything
// else picks another chip's tables and every bank select stops matching.
const slapstic = devices.find(node => node.props.type === 'SLAPSTIC');
assert.ok(slapstic, 'gauntlet is a slapstic board');
assert.equal(Number(slapstic.props.clock), 104);
// set_range names the address space it watches and set_bank the ROM window it
// switches; neither leaves any trace in an address map, so the graph has to
// carry the machine-config calls themselves.
const slapsticConfig = (slapstic.props.config as string[]).join('\n');
assert.match(slapsticConfig, /set_range\(m_maincpu, AS_PROGRAM, 0x38000, 0x3ffff, 0x280000\)/);
assert.match(slapsticConfig, /set_bank\(m_slapstic_bank\)/);

// Two tilemap devices and one motion-object device make the picture; the
// playfield scans in columns and the alpha in rows, which is the difference
// between a maze and a scrambled one.
assert.deepEqual(
  devices.filter(node => node.props.type === 'TILEMAP').map(node => node.props.tag),
  ['playfield', 'alpha'],
);
assert.ok(devices.some(node => node.props.type === 'ATARI_MOTION_OBJECTS'));

// A 68010 main board and a 6502 sound board, with the YM2151/POKEY/TMS5220C
// trio the sound board drives.
assert.deepEqual(
  devices
    .filter(node => ['M68010', 'M6502'].includes(String(node.props.type)))
    .map(node => [node.props.tag, node.props.type]),
  [['maincpu', 'M68010'], ['audiocpu', 'M6502']],
);
for (const type of ['YM2151', 'POKEY', 'TMS5220C']) {
  assert.ok(devices.some(node => node.props.type === type), `${type} is configured`);
}

// The playfield ROM window is a memory bank, not a plain ROM range: the
// slapstic switches it under the 68010 while it executes from there.
const bank = graph.nodes.find(node => node.label === 'MemoryBank');
assert.ok(bank);
assert.equal(bank.props.tag, 'slapstic_bank');

const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'gauntlet MAME video source must lower to executable video IR');
const motionObjects = video.plan.motionObjects;
assert.ok(motionObjects, 'the sprite engine is configured by the driver aggregate');
assert.equal(motionObjects.paletteBase, 0x100);
assert.equal(motionObjects.codeXor, 0x800);
assert.equal(motionObjects.spriteShare, 'mob');
assert.equal(motionObjects.slipShare, 'mob:slip');

console.log('gauntlet.spec: slapstic, tilemap/motion-object video and sound board passed');
