import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { mrdo } from './mrdo.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(mrdo);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === mrdo.machine.className &&
  node.props.name === mrdo.machine.name);
assert.ok(machine);

// Both sound chips are the plain SN76489, whose 15-bit LFSR and inverted output
// differ from the SN76489A the rest of the catalog uses.
assert.deepEqual(
  graph.nodes
    .filter(node => node.label === 'Device' && String(node.props.type).startsWith('SN7648'))
    .map(node => node.props.type),
  ['SN76489', 'SN76489'],
);

const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Mr. Do! MAME video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
assert.equal(video.plan.tilemaps.length, 2);

// palette_init builds its own weight table from parallel resistances, a
// pull-down and a diode drop, so there is no resistor-network call to read the
// palette out of declaratively. It is preserved as an executed program instead.
assert.ok(!video.plan.palette, 'no declarative palette shape describes this callback');
const palette = video.plan.paletteProgram;
assert.ok(palette, 'Mr. Do! palette callback must lower to an executable program');
assert.deepEqual(palette.program.diagnostics, []);
assert.deepEqual(
  { entries: palette.entries, indirectEntries: palette.indirectEntries },
  { entries: 64 * 4 + 16 * 4, indirectEntries: 256 },
);
assert.equal(palette.source?.file, 'src/mame/universal/mrdo_v.cpp');

console.log('mrdo.spec: dual SN76489 and executed palette callback passed');
