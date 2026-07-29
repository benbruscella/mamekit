import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { commando } from './commando.ts';
import {
  assertGameContract,
  gameSourceGraph,
  mameSourceRoot,
} from './test-support.ts';

assertGameContract(commando);
const graph = gameSourceGraph(commando);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === commando.machine.className &&
  node.props.name === commando.machine.name);
assert.ok(machine);

const devices = graph.nodes.filter(node => node.label === 'Device');
for (const type of [
  'Z80',
  'TIMER',
  'GFXDECODE',
  'PALETTE',
  'BUFFERED_SPRITERAM8',
  'GENERIC_LATCH_8',
  'YM2203',
]) {
  assert.ok(devices.some(node => node.props.type === type), `Commando must extract ${type}`);
}
assert.deepEqual(
  devices
    .filter(node => node.props.type === 'YM2203')
    .map(node => ({ tag: node.props.tag, clock: node.props.clock })),
  [
    { tag: 'ym1', clock: 1_500_000 },
    { tag: 'ym2', clock: 1_500_000 },
  ],
);

// The original program bytes are data, while instruction fetches use a
// separately decrypted AS_OPCODES share.
const opcodeMap = graph.nodes.find(node =>
  node.label === 'AddressMap' &&
  node.props.cls === 'commando_state' &&
  node.props.name === 'decrypted_opcodes_map');
assert.ok(opcodeMap);
assert.equal(
  graph.edges.find(edge =>
    edge.to === opcodeMap.id && edge.rel === 'HAS_MAP')?.props?.space,
  'AS_OPCODES',
);
const game = graph.nodes.find(node =>
  node.label === 'Game' && node.props.name === commando.game);
const transforms = (game?.props.romTransforms as string[]).map(value => JSON.parse(value));
assert.equal(transforms.length, 1);
assert.deepEqual(
  {
    kind: transforms[0]?.kind,
    sourceRegion: transforms[0]?.sourceRegion,
    targetRegion: transforms[0]?.targetRegion,
    start: transforms[0]?.start,
    end: transforms[0]?.end,
    tableLength: transforms[0]?.table?.length,
  },
  {
    kind: 'byte-substitution',
    sourceRegion: 'maincpu',
    targetRegion: 'decrypted_opcodes',
    start: 1,
    end: 0xc000,
    tableLength: 256,
  },
);
assert.deepEqual(
  graph.nodes
    .filter(node =>
      node.label === 'Handler' &&
      ['videoram_w_1', 'videoram_w_0'].includes(String(node.props.method)))
    .map(node => node.props.sourceConstants),
  [['Which=1'], ['Which=0']],
);

// Interrupt timing is driven once per scanline by the IRQ PROM.
const scanline = graph.nodes.find(node =>
  node.label === 'Callback' && node.props.signal === 'configure_scanline');
assert.equal(scanline?.props.targetMethod, 'scanline');
assert.equal(scanline?.props.scanlineStart, 0);
assert.equal(scanline?.props.scanlineIncrement, 1);

const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Commando MAME video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
assert.deepEqual(
  video.plan.tilemaps.map(tilemap => ({
    mapper: tilemap.mapper,
    tile: [tilemap.tileWidth, tilemap.tileHeight],
    transparentPen: tilemap.transparentPen,
  })),
  [
    { mapper: 'TILEMAP_SCAN_COLS', tile: [16, 16], transparentPen: undefined },
    { mapper: 'TILEMAP_SCAN_ROWS', tile: [8, 8], transparentPen: 3 },
  ],
);
assert.equal(video.plan.palette?.region, 'proms');
assert.equal(video.plan.palette?.colorCount, 256);
assert.deepEqual(
  video.plan.palette?.channels.map(channel => ({
    channel: channel.channel,
    offsets: channel.offsets,
    weights: channel.weights,
  })),
  [
    { channel: 'r', offsets: [0, 0, 0, 0], weights: [0x0e, 0x1f, 0x43, 0x8f] },
    { channel: 'g', offsets: [256, 256, 256, 256], weights: [0x0e, 0x1f, 0x43, 0x8f] },
    { channel: 'b', offsets: [512, 512, 512, 512], weights: [0x0e, 0x1f, 0x43, 0x8f] },
  ],
);
assert.equal(video.plan.palette?.source?.file, 'src/emu/emupal.cpp');

console.log('commando.spec: encrypted opcodes, scanline IRQs, video and dual YM2203 passed');
