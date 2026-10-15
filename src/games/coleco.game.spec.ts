import assert from 'node:assert/strict';
import { coleco } from './coleco.game.ts';
import { gameSourceGraph } from './test-support.ts';

const graph = gameSourceGraph(coleco.target);
const types = new Set(graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type));
for (const type of ['Z80', 'TMS9928A', 'SN76489A', 'COLECOVISION_CARTRIDGE_SLOT']) {
  assert.ok(types.has(type), `the ColecoVision composes ${type}`);
}
console.log('coleco.game.spec: MAME ColecoVision machine, VDP and cartridge slot passed');
