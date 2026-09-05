import assert from 'node:assert/strict';
import { deriveCandidateContract, renderCandidateModule, renderCandidateSpec, promoteCandidate, writeCandidateScaffold } from './onboarding.ts';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadRegisteredGameContracts } from './contracts.ts';
import { invaders } from './invaders.game.ts';
import { machineTargetContract } from './types.ts';
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
    { id: 'soft:demo_cart', label: 'SoftwareList', props: {
      name: 'demo_cart', tag: 'cart_list',
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
assert.deepEqual(
  contract.target.media?.find(medium => medium.kind === 'cartridge')?.softwareLists,
  ['demo_cart'],
);
assert.match(renderCandidateModule(contract), /satisfies MachineTargetContract/);
assert.match(renderCandidateSpec('demo'), /gameSourceGraph\(demo\.target\)/);
assert.match(renderCandidateModule({ ...contract, target: { ...contract.target, game: '1942' } }),
  /export \{ _1942 as '1942' \}/);

const root = mkdtempSync(join(tmpdir(), 'mamekit-promotion-'));
try {
  const games = join(root, 'src/games');
  mkdirSync(games, { recursive: true });
  writeFileSync(join(games, 'types.ts'), 'export type MachineTargetContract = unknown;');
  writeFileSync(join(games, 'test-support.ts'),
    'export function gameSourceGraph(target) { if (target.game !== "invaders") throw new Error("wrong target"); }');
  const nested = machineTargetContract(invaders);
  const multi = { ...nested, scenarios: [
    { ...nested.scenarios[0], id: 'default' },
    { ...nested.scenarios[0], id: 'gameplay' },
  ] };
  writeCandidateScaffold(root, multi);
  assert.equal((await loadRegisteredGameContracts(['candidate'], games)).length, 2);
  promoteCandidate(root, 'invaders');
  const loaded = await loadRegisteredGameContracts(['accepted'], games);
  assert.deepEqual(loaded.map(entry => entry.contract.scenarioId), ['default', 'gameplay']);
  assert.equal(new Set(loaded.map(entry => entry.target.game)).size, 1);
  assert.match(readFileSync(join(games, 'invaders.game.ts'), 'utf8'), /from "\.\/types.ts"/);
  await import(pathToFileURL(join(games, 'invaders.game.spec.ts')).href);
} finally {
  rmSync(root, { recursive: true, force: true });
}
console.log('onboarding.spec: scaffold, multi-scenario load and executable promoted spec passed');
