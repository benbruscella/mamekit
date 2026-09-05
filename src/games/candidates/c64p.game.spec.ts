import assert from 'node:assert/strict';
import { c64p } from './c64p.game.ts';
import { gameSourceGraph } from '../test-support.ts';

const graph = gameSourceGraph(c64p.target);
assert.equal(graph.edges.find(edge => edge.from === 'game:c64p' && edge.rel === 'USES_MACHINE')?.to,
  'machine:c64_state.pal');
assert.equal(graph.nodes.find(node => node.label === 'Device' && node.props.tag === 'u19')?.props.type,
  'MOS6569');
console.log('c64p.game.spec: MAME PAL machine and VIC variant passed');
