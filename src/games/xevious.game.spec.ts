import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { xevious } from './xevious.game.ts';
import { assertPaletteCallback, gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(xevious);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === xevious.machine.className &&
  node.props.name === xevious.machine.name);
assert.ok(machine);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
// xevious_palette sets 128 colours and indirect colour 0x80, the transparent
// one, then points every pen bank at them itself; the board runs it as written.
assertPaletteCallback(video, { handler: 'xevious_state.xevious_palette', entries: 1152, indirectEntries: 129 });

console.log('xevious.spec: source machine graph and executed palette callback passed');
