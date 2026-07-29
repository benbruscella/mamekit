import assert from 'node:assert/strict';
import { gameSubgraph } from './build.ts';
import type { KnowledgeGraph, KGNode } from './types.ts';

const callback = (
  id: string,
  ownerTag: string,
  signal: string,
  operation: string,
  slot?: number,
): KGNode => ({
  id,
  label: 'Callback',
  props: {
    ownerTag,
    signal,
    operation,
    ...(slot === undefined ? {} : { slot }),
  },
});

const graph: KnowledgeGraph = {
  meta: {
    tool: 'mamekit',
    version: 'test',
    mameSrc: '',
    driverFile: '',
    generatedAt: '',
  },
  nodes: [
    { id: 'game:test', label: 'Game', props: {} },
    { id: 'machine:derived', label: 'MachineConfig', props: {} },
    { id: 'machine:base', label: 'MachineConfig', props: {} },
    callback('derived-slot-0', 'latch', 'q_out_cb', 'set', 0),
    callback('derived-slot-1', 'latch', 'q_out_cb', 'set', 1),
    callback('derived-append-2', 'latch', 'q_out_cb', 'append', 2),
    callback('base-slot-0', 'latch', 'q_out_cb', 'set', 0),
    callback('base-slot-2', 'latch', 'q_out_cb', 'set', 2),
  ],
  edges: [
    { from: 'game:test', to: 'machine:derived', rel: 'USES_MACHINE' },
    { from: 'machine:derived', to: 'machine:base', rel: 'CALLS' },
    { from: 'machine:derived', to: 'derived-slot-0', rel: 'HAS_CALLBACK' },
    { from: 'machine:derived', to: 'derived-slot-1', rel: 'HAS_CALLBACK' },
    { from: 'machine:derived', to: 'derived-append-2', rel: 'HAS_CALLBACK' },
    { from: 'machine:base', to: 'base-slot-0', rel: 'HAS_CALLBACK' },
    { from: 'machine:base', to: 'base-slot-2', rel: 'HAS_CALLBACK' },
  ],
};

const callbacks = gameSubgraph(graph, 'test').nodes
  .filter(node => node.label === 'Callback')
  .map(node => node.id)
  .sort();

assert.deepEqual(callbacks, [
  'base-slot-2',
  'derived-append-2',
  'derived-slot-0',
  'derived-slot-1',
]);

console.log('build.spec: derived callback shadowing preserves slots and append chains');
