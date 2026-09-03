import assert from 'node:assert/strict';
import { simpsons } from './simpsons.ts';
import { gameSourceGraph } from './test-support.ts';

const graph = gameSourceGraph(simpsons);
const playerOneTypes = graph.edges
  .filter(edge => edge.rel === 'HAS_FIELD' && edge.from.startsWith('inputs:simpsons/P1'))
  .map(edge => graph.nodes.find(node => node.id === edge.to)?.props.type)
  .filter((type): type is string => typeof type === 'string');
assert.deepEqual(playerOneTypes, [
  'IPT_JOYSTICK_LEFT',
  'IPT_JOYSTICK_RIGHT',
  'IPT_JOYSTICK_UP',
  'IPT_JOYSTICK_DOWN',
  'IPT_BUTTON1',
  'IPT_BUTTON2',
  'IPT_UNKNOWN',
  'IPT_START1',
]);

console.log('simpsons.spec: source machine graph and Konami player controls passed');
