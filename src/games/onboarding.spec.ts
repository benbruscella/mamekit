import assert from 'node:assert/strict';
import { deriveCandidateContract, renderCandidateModule, renderCandidateSpec } from './onboarding.ts';
import type { KnowledgeGraph } from '../kg/types.ts';
import type { ShellConfig } from '../runtime/shell.ts';

const graph = {
  nodes: [
    { id: 'game:demo', label: 'Game', props: {
      name: 'demo', kind: 'computer', sourceFile: 'src/mame/demo/demo.cpp',
    } },
    { id: 'machine:demo_state.demo', label: 'MachineConfig', props: {
      cls: 'demo_state', name: 'demo',
    } },
  ],
  edges: [{ from: 'game:demo', to: 'machine:demo_state.demo', rel: 'USES_MACHINE' }],
  meta: { driverFile: 'src/mame/demo/demo.cpp' },
} as unknown as KnowledgeGraph;
const config = {
  game: 'demo',
  sound: { kind: 'none' },
  board: { screen: { width: 403, height: 284 } },
} as ShellConfig;
const contract = deriveCandidateContract(graph, config);
assert.equal(contract.target.category, 'computers');
assert.deepEqual(contract.target.screen, { width: 403, height: 284 });
assert.deepEqual(contract.scenarios[0]?.actions, []);
assert.ok(contract.target.media?.some(medium => medium.kind === 'floppy'));
assert.match(renderCandidateModule(contract), /satisfies MachineTargetContract/);
assert.match(renderCandidateSpec('demo'), /gameSourceGraph\(demo\.target\)/);
assert.match(renderCandidateModule({ ...contract, target: { ...contract.target, game: '1942' } }),
  /export \{ _1942 as '1942' \}/);

console.log('onboarding.spec: source-derived candidate scaffold passed');
