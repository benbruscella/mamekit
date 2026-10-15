import assert from 'node:assert/strict';
import { a2600 } from './a2600.game.ts';
import { gameSourceGraph } from './test-support.ts';

const graph = gameSourceGraph(a2600.target);
const types = new Set(graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type));
for (const type of ['M6507', 'TIA_NTSC_VIDEO', 'TIA', 'MOS6532', 'VCS_CART_SLOT']) {
  assert.ok(types.has(type), `the Atari 2600 composes ${type}`);
}
console.log('a2600.game.spec: MAME VCS machine, TIA and cartridge slot passed');
