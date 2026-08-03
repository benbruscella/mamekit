import assert from 'node:assert/strict';
import { popeye } from './popeye.ts';
import { gameSourceGraph } from './test-support.ts';

const graph = gameSourceGraph(popeye);
assert.ok(
  graph.edges.some(edge =>
    edge.from === 'machine:tpp2_state.config' &&
    edge.to === 'map:tpp2_state.maincpu_program_map' &&
    edge.rel === 'PATCHES_MAP' &&
    edge.props?.deviceTag === 'maincpu' &&
    edge.props.space === 'AS_PROGRAM'),
  'the selected tpp2 driver must virtually override the base CPU program map',
);
console.log('popeye.spec: source machine graph passed');
