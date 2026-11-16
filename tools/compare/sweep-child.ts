/**
 * One contract of a `mamekit sweep`, in a process of its own (a native crash
 * costs that contract a retry, not the sweep): run it through the harness in
 * recording mode, so a golden mismatch is a result rather than an exception,
 * and write what it measured beside its golden.
 *
 *   node tools/compare/sweep-child.ts <game>[:<scenario>] <out.json>
 */

import { writeFileSync } from 'node:fs';
import { runGameAcceptance } from '../../src/games/acceptance-harness.ts';
import { loadGenerationGameContracts } from '../../src/games/contracts.ts';
import type { SweepRun } from './sweep-plan.ts';

const [key, out] = process.argv.slice(2);
if (!key || !out) {
  console.error('usage: node tools/compare/sweep-child.ts <game>[:<scenario>] <out.json>');
  process.exit(2);
}
const started = Date.now();
const contract = (await loadGenerationGameContracts())
  .find(candidate => (candidate.scenarioId ? `${candidate.game}:${candidate.scenarioId}` : candidate.game) === key);
const run: SweepRun = { key, durationMs: 0 };
if (!contract) {
  run.error = `no contract ${key}`;
} else {
  if (contract.golden) run.golden = contract.golden;
  try {
    run.result = await runGameAcceptance(contract, undefined, {
      recording: true,
      throughput: ({ emulatedFps, minimumFps }) => { run.emulatedFps = emulatedFps; run.minimumFps = minimumFps; },
    });
  } catch (error) {
    run.error = String((error as Error)?.message ?? error).split('\n').slice(0, 3).join(' ');
  }
}
run.durationMs = Date.now() - started;
writeFileSync(out, `${JSON.stringify(run)}\n`);
