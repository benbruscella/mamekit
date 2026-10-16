import assert from 'node:assert/strict';
import { nes } from './nes.game.ts';
import { gameSourceGraph } from './test-support.ts';

const graph = gameSourceGraph(nes.target);
const types = new Set(graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type));
for (const type of ['RP2A03G', 'PPU_2C02', 'NES_CART_SLOT', 'NES_CONTROL_PORT']) {
  assert.ok(types.has(type), `the NES composes ${type}`);
}
console.log('nes.game.spec: MAME NES machine, 2C02 and cartridge slot passed');
