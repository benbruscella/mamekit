import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { panic } from './panic.game.ts';
import { assertPaletteCallback, gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(panic);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === panic.machine.className &&
  node.props.name === panic.machine.name);
assert.ok(machine);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assertPaletteCallback(video, { handler: 'cosmic_state.panic_palette', entries: 48, indirectEntries: 16 });
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
console.log('panic.spec: executed palette callback and bitmap/sprite video passed');
