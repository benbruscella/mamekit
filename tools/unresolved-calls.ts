#!/usr/bin/env node
/**
 * Which calls does a machine make that resolve to nothing?
 *
 * The interpreter and emitted code answer a call they cannot resolve with a
 * silent zero (or an unresolved reference). That is a guess, not MAME's
 * behaviour, and it hides real gaps: a missing binding reads as "the chip did
 * nothing". This runs each contract, in recording mode so no golden is
 * compared, with a census installed (`mamekitMissingCall`, which the
 * interpreter and emitted code both report to) and
 * reports every call that fell through, how often, and which machines made it.
 *
 *   node tools/unresolved-calls.ts                 # every contract
 *   node tools/unresolved-calls.ts arkanoid c64p   # these games' contracts
 *   node tools/unresolved-calls.ts --frames 600    # shorter runs
 *
 * Writes .cache/unresolved-calls/report.json and prints the census, the calls
 * reached by the most machines first. Runs against dist/, so build first.
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runGameAcceptance } from '../src/games/acceptance-harness.ts';
import { loadGameContracts } from '../src/games/contracts.ts';
import { KNOWN_UNRESOLVED_CALLS } from '../src/games/unresolved-calls.ts';
import { isDeclaredFrameworkNoOp } from '../src/ir/framework-calls.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const framesIndex = args.indexOf('--frames');
const frames = framesIndex < 0 ? undefined : Number(args[framesIndex + 1]);
if (frames !== undefined && !(frames > 0)) throw new Error('--frames must be positive');
const valueIndexes = new Set(['--frames', '--child'].map(flag => args.indexOf(flag) + 1).filter(index => index > 0));
const games = new Set(args.filter((arg, index) => !arg.startsWith('--') && !valueIndexes.has(index)));

const contracts = (await loadGameContracts())
  .filter(contract => !games.size || games.has(contract.game));
if (!contracts.length) throw new Error(`no contracts match: ${[...games].join(', ')}`);

// Every call that fell through, interpreted or emitted, with how often.
type Run = { contract: string; calls: Record<string, number>; error?: string };

const childIndex = args.indexOf('--child');
if (childIndex >= 0) {
  // One contract per process: a long run of boards in one heap grows until
  // Node gives up, and a native crash takes only that contract with it.
  const contract = contracts[Number(args[childIndex + 1])]!;
  const census = new Map<string, number>();
  // Interpreted and emitted code report every miss here; the declared
  // framework no-ops are answered on purpose, so they are not counted.
  const mamekitMissingCall = (name: string): undefined => {
    if (!isDeclaredFrameworkNoOp(name)) census.set(name, (census.get(name) ?? 0) + 1);
    return undefined;
  };
  Object.assign(globalThis, { mamekitMissingCall });
  let error: string | undefined;
  try {
    await runGameAcceptance(contract, projectRoot, { recording: true, ...(frames ? { frames } : {}) });
  } catch (cause) {
    error = String(cause).split('\n')[0]!.slice(0, 200);
  }
  process.stdout.write(`${JSON.stringify({ calls: Object.fromEntries(census), ...(error ? { error } : {}) })}\n`);
  process.exit(0);
}

const runs: Run[] = [];
for (const [index, contract] of contracts.entries()) {
  const label = [contract.game, (contract as { scenarioId?: string }).scenarioId].filter(Boolean).join(':');
  const child = spawnSync(process.execPath, [
    fileURLToPath(import.meta.url), ...args.filter(arg => arg !== '--child'), '--child', String(index),
  ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const line = child.stdout.trim().split('\n').filter(text => text.startsWith('{')).at(-1);
  const result = line
    ? JSON.parse(line) as Omit<Run, 'contract'>
    : { calls: {}, error: `no result (exit ${child.status ?? child.signal})` };
  runs.push({ contract: label, ...result });
  console.error(`${label}: ${Object.keys(result.calls).length} unresolved calls` +
    `${result.error ? ` (run ended: ${result.error})` : ''}`);
}

const byCall = new Map<string, { total: number; machines: string[] }>();
for (const run of runs) {
  for (const [call, count] of Object.entries(run.calls)) {
    const entry = byCall.get(call) ?? { total: 0, machines: [] };
    entry.total += count;
    entry.machines.push(run.contract);
    byCall.set(call, entry);
  }
}
const ranked = [...byCall].sort((a, b) =>
  b[1].machines.length - a[1].machines.length || b[1].total - a[1].total);

const outDir = join(projectRoot, '.cache/unresolved-calls');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'report.json'), `${JSON.stringify({
  runs,
  calls: Object.fromEntries(ranked),
}, null, 2)}\n`);

for (const [call, { total, machines }] of ranked) {
  const shown = machines.length > 6 ? `${machines.slice(0, 6).join(', ')}, +${machines.length - 6}` : machines.join(', ');
  console.log(`${String(machines.length).padStart(3)} machines ${String(total).padStart(10)} calls  ${call}  [${shown}]`);
}
console.log(`\n${ranked.length} unresolved call names across ${runs.length} contracts; report: .cache/unresolved-calls/report.json`);

// The allowlist only shrinks: a known gap no contract reaches any more, on a
// run over every contract, has been fixed (or left behind) and must go.
const unknown = ranked.filter(([call]) => !KNOWN_UNRESOLVED_CALLS.has(call));
if (unknown.length) {
  console.log(`\nnot in src/games/unresolved-calls.ts (the harness fails on these):`);
  for (const [call] of unknown) console.log(`  ${call}`);
}
if (!games.size && !frames && runs.every(run => !run.error?.startsWith('no result'))) {
  const stale = [...KNOWN_UNRESOLVED_CALLS.keys()].filter(call => !byCall.has(call));
  if (stale.length) {
    console.log(`\nno longer reached; delete from src/games/unresolved-calls.ts:`);
    for (const call of stale) console.log(`  ${call}`);
  }
}
