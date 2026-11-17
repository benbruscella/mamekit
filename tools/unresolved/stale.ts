/**
 * Which allowlist entries are no longer reached?
 *
 * `KNOWN_UNRESOLVED_CALLS` only shrinks: an entry no contract reaches on a
 * complete census has been fixed and must go. A run that ended early, with no
 * result at all or by throwing part way (an fps-floor assertion on a busy
 * machine, a crash), reported only the calls it made before it stopped, so a
 * live entry can look unreached. Any such run makes the stale list unsafe:
 * none is reported, and the runs that ended early are named so they can be run
 * again alone.
 */

export interface CensusRun {
  contract: string;
  calls: Record<string, number>;
  error?: string;
}

export type StaleVerdict =
  | { kind: 'partial'; reason: 'filtered' }
  | { kind: 'partial'; reason: 'ended-early'; ended: { contract: string; error: string }[] }
  | { kind: 'complete'; stale: string[] };

/**
 * `complete` is a census over every contract at full length (no game filter,
 * no `--frames`); anything else cannot show that an entry is unreached.
 */
export function staleEntries(
  runs: readonly CensusRun[],
  known: Iterable<string>,
  complete: boolean,
): StaleVerdict {
  if (!complete) return { kind: 'partial', reason: 'filtered' };
  const ended = runs.flatMap(run => run.error ? [{ contract: run.contract, error: run.error }] : []);
  if (ended.length) return { kind: 'partial', reason: 'ended-early', ended };
  const reached = new Set(runs.flatMap(run => Object.keys(run.calls)));
  return { kind: 'complete', stale: [...known].filter(call => !reached.has(call)) };
}
