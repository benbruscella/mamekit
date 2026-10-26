/**
 * How CI splits the real-ROM contracts across runners, and how it checks the
 * split afterwards.
 *
 * Contracts take from seven seconds to three and a half minutes, so a split by
 * count is badly lopsided: interleaving them over eight runners gave one
 * runner the C64's disk load and Metal Slug (583 seconds of contracts) and
 * another 283. With each contract's measured duration from the last run,
 * they are placed longest first, each on the runner with the least work so
 * far, which leaves every runner within one contract of the others.
 *
 * Every shard of a run must compute the same split, so the durations are one
 * file handed to all of them, never something each shard looks up itself; and
 * the gate checks afterwards that every contract ran exactly once.
 *
 *   node src/games/acceptance-shards.ts <report.json>... --durations <out.json>
 *
 * checks the shards' reports against the accepted contracts and writes the
 * durations the next run will balance with.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

/** Seconds each contract took, by contract key (`c64:disk`). */
export type ContractDurations = Record<string, number>;

interface ShardReport {
  results: { target: string; status: string; durationMs: number }[];
}

/** Parse `i/n`. */
export function parseShard(spec: string): { index: number; count: number } {
  const [index, count] = spec.split('/').map(Number);
  if (!Number.isInteger(index) || !Number.isInteger(count) || count! < 1 || index! < 1 || index! > count!) {
    throw new Error(`--shard expects i/n with 1 <= i <= n, got "${spec}"`);
  }
  return { index: index!, count: count! };
}

/**
 * The contracts shard `i/n` runs. With durations, longest first onto the
 * least-loaded shard (a contract without a measurement counts as the median
 * one); without, every n-th contract from the i-th, interleaved so the heavy
 * boards that sit together by name (sf2, sf2ce) do not share a runner. Either
 * way the shards partition the list, and each runs its own in list order.
 */
export function shardContracts(
  targets: readonly string[],
  spec: string,
  durations?: ContractDurations,
): string[] {
  const { index, count } = parseShard(spec);
  if (!durations || !Object.keys(durations).length) {
    return targets.filter((_, position) => position % count === index - 1);
  }
  const known = targets.map(target => durations[target]).filter((value): value is number => Number.isFinite(value));
  const sorted = [...known].sort((left, right) => left - right);
  const median = sorted.length ? sorted[Math.floor(sorted.length / 2)]! : 1;
  const weight = (target: string) => Number.isFinite(durations[target]) ? durations[target]! : median;
  const loads = new Array<number>(count).fill(0);
  const owner = new Map<string, number>();
  const byWeight = [...targets].sort((left, right) => weight(right) - weight(left) || left.localeCompare(right));
  for (const target of byWeight) {
    const least = loads.indexOf(Math.min(...loads));
    owner.set(target, least);
    loads[least]! += weight(target);
  }
  return targets.filter(target => owner.get(target) === index - 1);
}

/**
 * Check the shards' reports cover the accepted contracts exactly once, and
 * return each contract's duration in seconds. A contract no shard ran, or
 * that two shards ran, means the shards disagreed about the split.
 */
export function mergeShardReports(
  contracts: readonly string[],
  reports: readonly ShardReport[],
): { durations: ContractDurations; problems: string[] } {
  const seen = new Map<string, number>();
  const durations: ContractDurations = {};
  for (const report of reports) {
    for (const result of report.results) {
      seen.set(result.target, (seen.get(result.target) ?? 0) + 1);
      durations[result.target] = Math.round(result.durationMs / 100) / 10;
    }
  }
  const problems = [
    ...contracts.filter(contract => !seen.has(contract)).map(contract => `${contract}: no shard ran it`),
    ...[...seen].filter(([, runs]) => runs > 1).map(([contract, runs]) => `${contract}: ran on ${runs} shards`),
    ...[...seen.keys()].filter(target => !contracts.includes(target)).map(target => `${target}: not an accepted contract`),
  ];
  return {
    durations: Object.fromEntries(Object.entries(durations).sort(([left], [right]) => left.localeCompare(right))),
    problems,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const at = args.indexOf('--durations');
  const out = at >= 0 ? args[at + 1] : undefined;
  const files = args.filter((arg, position) => arg !== '--durations' && position !== at + 1);
  if (!out || !files.length) {
    console.error('usage: node src/games/acceptance-shards.ts <report.json>... --durations <out.json>');
    process.exit(2);
  }
  const { loadGameContracts } = await import('./contracts.ts');
  const contracts = (await loadGameContracts())
    .map(contract => contract.scenarioId ? `${contract.game}:${contract.scenarioId}` : contract.game);
  const { durations, problems } = mergeShardReports(
    contracts,
    files.map(file => JSON.parse(readFileSync(file, 'utf8')) as ShardReport),
  );
  writeFileSync(out, `${JSON.stringify(durations, null, 2)}\n`);
  const total = Object.values(durations).reduce((sum, seconds) => sum + seconds, 0);
  console.log(`${Object.keys(durations).length} contracts from ${files.length} shards, ${total.toFixed(0)}s in all -> ${out}`);
  if (problems.length) {
    console.error(problems.join('\n'));
    process.exitCode = 1;
  }
}
