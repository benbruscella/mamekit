import assert from 'node:assert/strict';
import { simpsons } from './simpsons.ts';
import { gameSourceGraph } from './test-support.ts';
import { lowerAuxiliaryAudioDevices } from '../gen/emit-machine.ts';

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

const devices = graph.nodes
  .filter(node => node.label === 'Device')
  .map(node => ({
    id: node.id,
    tag: String(node.props.tag),
    type: String(node.props.type),
    ...(typeof node.props.clock === 'number' ? { clock: node.props.clock } : {}),
  }));
const auxiliary = lowerAuxiliaryAudioDevices(graph, devices);
assert.ok(
  auxiliary.some(device =>
    device.type === 'K053260' && device.sampleRegion === 'k053260'),
  'Simpsons must route its K053260 fight-sample ROM into the YM2151 mixer',
);

console.log('simpsons.spec: source machine graph and Konami player controls passed');
