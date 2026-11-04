import assert from 'node:assert/strict';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { indexMameHardware } from '../mame/hardware.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { phoenix } from './phoenix.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(phoenix);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === phoenix.machine.className &&
  node.props.name === phoenix.machine.name);
assert.ok(machine);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.equal(video?.plan.palette?.colorCount, 256);
assert.equal(video?.plan.tilemaps?.length, 2);

// The effects board and the MM6221AA are their MAME classes compiled whole.
// The melodies are tms36xx.cpp's `tunes`, a table of pointers to note tables
// that the compiler reads row by row.
const index = indexMameHardware(mameSourceRoot());
for (const type of ['PHOENIX_SOUND', 'TMS36XX']) {
  assert.equal(compileMameDevice(mameSourceRoot(), index.get(type)!, type).summary.diagnostics, 0, type);
}
console.log('phoenix.spec: PROM palette, two-page video and compiled sound passed');
