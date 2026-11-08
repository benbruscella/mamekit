import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { pacman } from './pacman.game.ts';
import { assertGameContract, assertPaletteCallback, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(pacman);
const graph = gameSourceGraph(pacman);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === pacman.machine.className &&
  node.props.name === pacman.machine.name);
assert.ok(machine);
const compiled = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(compiled, 'Pac-Man MAME video source must lower to executable video IR');
assertPaletteCallback(compiled, { handler: 'pacman_state.pacman_palette', entries: 512, indirectEntries: 32 });
assert.equal(compiled.plan.tilemaps[0]?.mapper, 'pacman_state.pacman_scan_rows');
assert.ok(compiled.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('pacman.spec: game token and MAME-source video contract passed');
