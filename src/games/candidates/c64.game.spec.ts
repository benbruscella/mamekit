import { c64 } from './c64.game.ts';
import { gameSourceGraph } from '../test-support.ts';
import assert from 'node:assert/strict';

const graph = gameSourceGraph(c64.target);
const machine = graph.nodes.find(node => node.id === 'machine:c64_state.ntsc');
const members = (machine?.props.stateMembers as string[] ?? []).map(value => JSON.parse(value));
assert.equal(members.find(member => member.name === 'm_cass_rd')?.initial, 1,
  'the cassette input must begin at the source constructor idle level');
assert.equal(graph.nodes.find(node => node.label === 'Device' && node.props.tag === 'u19')?.props.member, 'm_vic',
  'a device installed by literal tag must retain the driver finder that reads it');
assert.match(String(graph.nodes.find(node => node.id === 'handler:c64_state.read_pla')?.props.sourceBody), /BIT\(offset, 15\)/,
  'PLA address decoding must retain live address bits');
console.log('c64.game.spec: source machine graph passed');
