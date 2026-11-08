import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { cavenger } from './cavenger.game.ts';
import { assertPaletteCallback, gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(cavenger);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === cavenger.machine.className &&
  node.props.name === cavenger.machine.name);
assert.ok(machine);

const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
// ladybug_palette inverts each PROM bit and bit-reverses the sprite nibbles
// itself; the board runs it as written.
assertPaletteCallback(video, { handler: 'ladybug_state.ladybug_palette', entries: 96, indirectEntries: 32 });
assert.ok(video);
assert.ok(video.plan.gfx.length > 0, 'Cosmic Avenger decoded graphics must lower');
assert.ok(
  video.plan.gfx.every(entry => entry.decodeMember === 'm_gfxdecode'),
  'string-tagged GFXDECODE must bind character graphics to m_gfxdecode',
);

console.log('cavenger.spec: source machine graph and executed palette callback passed');
