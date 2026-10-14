import assert from 'node:assert/strict';
import type { KnowledgeGraph } from './types.ts';
import { Graph } from './query.ts';
const source: KnowledgeGraph = {
  meta: { tool: 'mamekit', version: 'test', mameSrc: '', driverFile: '', generatedAt: '' },
  nodes: [
    { id: 'root', label: 'MachineConfig', props: {} },
    { id: 'first', label: 'Device', props: { tag: 'first' } },
    { id: 'second', label: 'Device', props: { tag: 'second' } },
  ],
  edges: [
    { from: 'root', to: 'second', rel: 'HAS_DEVICE' },
    { from: 'root', to: 'first', rel: 'CALLS' },
    { from: 'root', to: 'missing', rel: 'HAS_DEVICE' },
  ],
};
const graph = new Graph(source);
assert.deepEqual(graph.out('root').map(entry => entry.node.id), ['second', 'first']);
assert.deepEqual(graph.out('root', 'HAS_DEVICE').map(entry => entry.node.id), ['second']);
assert.deepEqual(graph.out('missing'), []);
assert.equal(graph.node('first'), source.nodes[1]);
const devices = graph.byLabel('Device');
devices.reverse();
assert.deepEqual(graph.byLabel('Device').map(node => node.id), ['first', 'second']);
console.log('query.spec: indexed queries preserve source order, identity and missing-edge behavior');
