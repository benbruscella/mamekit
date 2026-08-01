import assert from 'node:assert/strict';
import { qix } from './qix.ts';
import { gameSourceGraph } from './test-support.ts';

const graph = gameSourceGraph(qix);
for (const type of ['MC6809E', 'M6802', 'PIA6821', 'MC6845', 'DISCRETE']) {
  assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === type));
}
assert.equal(
  graph.nodes.filter(node => node.label === 'Device' && node.props.type === 'PIA6821').length,
  6,
);
const pia0 = graph.nodes.find(node =>
  node.label === 'Device' && node.props.tag === 'pia0');
assert.deepEqual(
  pia0?.props.configCalls,
  ['set_port_a_input_overrides_output_mask(255)'],
  'constant setters on array-backed device finders must be retained',
);

console.log('qix.spec: dual 6809E, 6802 audio, PIA and CRTC hardware passed');
