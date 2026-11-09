import assert from 'node:assert/strict';
import { simpsons } from './simpsons.game.ts';
import { gameSourceGraph } from './test-support.ts';
import { STREAM_SOUND_TYPES } from '../hardware/speaker/definition.ts';

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

// The K053260 plays its fight samples as its own class, reading the ROM region
// named after it through device_rom_interface.
assert.ok(STREAM_SOUND_TYPES.includes('K053260'));
assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === 'K053260' && node.props.tag === 'k053260'));
assert.ok(graph.nodes.some(node => node.label === 'RomRegion' && node.props.tag === 'k053260'),
  'Simpsons must carry its K053260 fight-sample ROM');

console.log('simpsons.spec: source machine graph and Konami player controls passed');
