import assert from 'node:assert/strict';
import { inputKeys } from '../gen/generate.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { generatedTileGroupIndirectMask } from '../runtime/generated-video.ts';
import { bankp } from './bankp.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(bankp);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === bankp.machine.className &&
  node.props.name === bankp.machine.name);
assert.ok(machine);
assert.equal(
  graph.nodes.filter(node => node.label === 'Device' && node.props.type === 'SN76489A').length,
  3,
);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.equal(video.plan.tilemaps.length, 2);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
assert.deepEqual(
  video.plan.palette?.banks.map(bank => ({
    penOffset: bank.penOffset,
    lookupOffset: bank.lookupOffset,
    lookupCount: bank.lookupCount,
    colorOr: bank.colorOr,
  })),
  [
    { penOffset: 0, lookupOffset: 32, lookupCount: 128, colorOr: 0 },
    { penOffset: 128, lookupOffset: 32, lookupCount: 128, colorOr: 16 },
    { penOffset: 256, lookupOffset: 288, lookupCount: 128, colorOr: 0 },
    { penOffset: 384, lookupOffset: 288, lookupCount: 128, colorOr: 16 },
  ],
);
assert.ok(
  video.plan.palette?.banks.every(bank => !bank.lookupTerms?.length),
  'Bank Panic lookup banks must use their post-palette PROM offsets',
);
assert.deepEqual(
  [1, 2, 3].map(button => inputKeys('bankp', `IPT_BUTTON${button}`)),
  [['KeyZ'], ['KeyX'], ['KeyC']],
);
for (const tilemap of video.plan.tilemaps) {
  assert.equal(tilemap.transparentIndirect, 0);
}
assert.match(
  video.handlers.find(handler => handler.method === 'get_fg_tile_info')?.body ?? '',
  /tileinfo\.group\s*=\s*color\s*&\s*0x1f/,
);
assert.match(
  video.handlers.find(handler => handler.method === 'get_bg_tile_info')?.body ?? '',
  /tileinfo\.group\s*=\s*color\s*&\s*0xf/,
);
// Later rounds raise m_color_hi. Their indirect palette page intentionally
// contains no color zero, but configure_groups must keep using the low color
// group to identify transparent door/sprite-shaped pixels.
const bankedTransparency = {
  indirectMask: (color: number) => color < 0x10 ? 0x81 : 0,
};
assert.equal(generatedTileGroupIndirectMask(bankedTransparency, 0x0f, 0), 0x81);

console.log('bankp.spec: triple SN76489, Z/X/C controls and dual-tilemap video passed');
