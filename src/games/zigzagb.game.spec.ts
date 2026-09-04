import assert from 'node:assert/strict';
import { compileMameHandler } from '../mame/handler-ir.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { zigzagb } from './zigzagb.game.ts';
import {
  assertGameContract,
  gameSourceGraph,
  mameSourceRoot,
} from './test-support.ts';

assertGameContract(zigzagb);
const graph = gameSourceGraph(zigzagb);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === zigzagb.machine.className &&
  node.props.name === zigzagb.machine.name);
assert.ok(machine);

const devices = graph.nodes.filter(node => node.label === 'Device');
assert.ok(devices.some(node => node.props.type === 'Z80' && node.props.tag === 'maincpu'));
assert.ok(devices.some(node => node.props.type === 'AY8910' && node.props.tag === '8910.0'));

assert.deepEqual(
  graph.nodes
    .filter(node => node.label === 'MemoryBank')
    .map(node => ({
      tag: node.props.tag,
      member: node.props.member,
      entries: node.props.entries,
      region: node.props.region,
      offset: node.props.offset,
      stride: node.props.stride,
    })),
  [
    {
      tag: 'bank1',
      member: 'm_rombanks[0]',
      entries: 2,
      region: 'maincpu',
      offset: 0x2000,
      stride: 0x1000,
    },
    {
      tag: 'bank2',
      member: 'm_rombanks[1]',
      entries: 2,
      region: 'maincpu',
      offset: 0x2000,
      stride: 0x1000,
    },
  ],
);

const zigzagMap = graph.nodes.find(node =>
  node.label === 'AddressMap' &&
  node.props.cls === 'zigzagb_state' &&
  node.props.name === 'zigzag_map');
assert.ok(zigzagMap);
assert.deepEqual(
  graph.edges
    .filter(edge => edge.from === zigzagMap.id && edge.rel === 'HAS_RANGE')
    .map(edge => graph.nodes.find(node => node.id === edge.to)?.props.bankRead)
    .filter(Boolean),
  ['bank1', 'bank2'],
);

for (const method of ['bankswap_w', 'ay8910_w']) {
  const handler = graph.nodes.find(node =>
    node.label === 'Handler' &&
    node.props.ownerClass === 'zigzagb_state' &&
    node.props.method === method);
  assert.ok(handler, `${method} must be reachable`);
  const program = compileMameHandler(String(handler.props.sourceBody));
  assert.deepEqual(program.diagnostics, [], `${method} must lower without diagnostics`);
}

const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Zig Zag MAME video source must lower to executable video IR');
assert.equal(video.plan.initialState.m_numspritegens, 2);
assert.deepEqual(
  video.plan.gfx.map(entry => entry.region),
  ['gfx1', 'gfx2'],
  'zigzag set_info must replace the base Galaxian sprite decode with gfx_pacmanbl',
);
assert.deepEqual(video.plan.delegates, {
  m_draw_bullet_ptr: null,
  m_draw_background_ptr: 'galaxian_state.galaxian_draw_background',
  m_extend_tile_info_ptr: 'galaxian_state.empty_extend_tile_info',
  m_extend_sprite_info_ptr: 'galaxian_state.empty_extend_sprite_info',
}, 'init_zigzag must retain its explicit empty bullet delegate');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('zigzagb.spec: indexed ROM banks, AY latch and Galaxian video passed');
