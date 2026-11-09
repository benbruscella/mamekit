import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { polepos } from './polepos.game.ts';
import { sourceNvramInitializers } from '../gen/generate.ts';
import { assertPaletteCallback, gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(polepos);
assert.deepEqual(sourceNvramInitializers(graph.nodes, mameSourceRoot()), [
  { share: 'nvram', fill: 0xff },
]);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === polepos.machine.className &&
  node.props.name === polepos.machine.name);
assert.ok(machine);

const compiled = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(compiled, 'Pole Position MAME video source must lower to executable video IR');
assert.equal(compiled.plan.tilemaps.length, 2);
assertPaletteCallback(compiled, { handler: 'polepos_state.polepos_palette', entries: 3840, indirectEntries: 128 });
assert.ok(compiled.handlers.some(handler =>
  handler.method === 'draw_sprites' && handler.program?.diagnostics.length === 0));
assert.ok(compiled.handlers.some(handler =>
  handler.method === 'draw_road' && handler.program?.diagnostics.length === 0));

console.log('polepos.spec: game token and MAME-source video contract passed');
