import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { buildGraph, gameSubgraph } from '../kg/build.ts';
import { compileMameVideo } from './video-compiler.ts';

const mameSrc = resolve('../mame');
const driver = resolve(mameSrc, 'src/mame/pacman/pacman.cpp');
const full = buildGraph(mameSrc, driver);
const graph = gameSubgraph(full, 'pacman');
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === 'pacman_state' &&
  node.props.name === 'pacman');

assert.equal(graph.meta.driverFile, 'src/mame/pacman/pacman.cpp');
assert.ok(graph.nodes.some(node => node.id === 'game:pacman'));
assert.ok(machine, 'Pac-Man machine config must be reachable from the game');
assert.ok(graph.nodes.some(node =>
  node.label === 'Device' && node.props.type === 'Z80' && node.props.tag === 'maincpu'));
assert.ok(graph.nodes.some(node =>
  node.label === 'Device' && node.props.type === 'NAMCO_WSG' && node.props.tag === 'namco'));
assert.ok(graph.nodes.some(node =>
  node.label === 'AddressRange' &&
  node.props.share === 'videoram' &&
  String(node.props.raw).includes('pacman_videoram_w')));
assert.ok(graph.nodes.some(node =>
  node.label === 'Callback' &&
  node.props.signal === 'set_screen_update' &&
  node.props.targetMethod === 'screen_update_pacman'));
assert.ok(graph.nodes.some(node =>
  node.label === 'SourceFile' &&
  node.props.path === 'src/mame/pacman/pacman_v.cpp'));

const reachable = new Set(['game:pacman']);
for (let changed = true; changed;) {
  changed = false;
  for (const edge of graph.edges) {
    if (!reachable.has(edge.from) || reachable.has(edge.to)) continue;
    reachable.add(edge.to);
    changed = true;
  }
}
assert.deepEqual(
  graph.nodes.filter(node => !reachable.has(node.id)).map(node => node.id),
  [],
  'the game subgraph must contain only source-reachable nodes',
);

const compiled = compileMameVideo(graph, mameSrc, machine!.id);
assert.ok(compiled, 'Pac-Man MAME video source must lower to executable video IR');
assert.equal(compiled.plan.gfx.length, 2);
assert.equal(compiled.plan.tilemaps.length, 1);
assert.deepEqual(
  {
    member: compiled.plan.tilemaps[0]?.member,
    tileWidth: compiled.plan.tilemaps[0]?.tileWidth,
    tileHeight: compiled.plan.tilemaps[0]?.tileHeight,
    columns: compiled.plan.tilemaps[0]?.columns,
    rows: compiled.plan.tilemaps[0]?.rows,
  },
  {
    member: 'm_bg_tilemap',
    tileWidth: 8,
    tileHeight: 8,
    columns: 36,
    rows: 28,
  },
);
assert.equal(compiled.plan.palette.region, 'proms');
assert.equal(compiled.plan.palette.colorCount, 32);
assert.equal(compiled.plan.palette.lookupCount, 256);
assert.equal(compiled.plan.source?.file, 'src/mame/pacman/pacman_v.cpp');
assert.ok(compiled.handlers.length >= 3);
assert.ok(compiled.handlers.every(handler =>
  handler.source?.file.startsWith('src/mame/pacman/') &&
  handler.source.line > 0 &&
  handler.program?.diagnostics.length === 0));

console.log('video-compiler.spec: 18 passed');
