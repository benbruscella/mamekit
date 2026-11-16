/**
 * `mamekit sweep`: what moved in each acceptance contract, not just PASS or
 * FAIL. Pure: a contract's run set against its golden and given one class.
 * Tested without ROMs by sweep-plan.spec.ts; sweep.ts runs the contracts.
 */

import type { GameAcceptanceGolden } from '../../src/games/types.ts';

/**
 * In the order a sweep lists them, worst first:
 *
 *   failed    the contract did not run to its end (an exception, a crash, a timeout)
 *   video     a checkpoint's picture changed
 *   state     a checkpoint's machine state changed, its picture did not
 *   audio     the sound's write count changed, or its level moved
 *   stamps    only where the sound's writes landed in time changed: the same
 *             number of writes, the same level, other hashes (a scheduler change)
 *   regions   a ROM region's hash changed (the ROMs or their loading)
 *   unchanged every fingerprint is the golden's
 */
export const SWEEP_CLASSES = ['failed', 'video', 'state', 'audio', 'stamps', 'regions', 'unchanged'] as const;
export type SweepClass = typeof SWEEP_CLASSES[number];

export interface SweepRun {
  key: string;
  /** The run's fingerprints, or why there are none. */
  result?: GameAcceptanceGolden;
  error?: string;
  golden?: GameAcceptanceGolden;
  emulatedFps?: number;
  minimumFps?: number;
  durationMs: number;
  /** The process died on a signal or was stopped for time: worth one more run. */
  crashed?: boolean;
}

export interface SweepVerdict {
  key: string;
  class: SweepClass;
  /** Checkpoints whose picture or state changed. */
  checkpoints?: string[];
  /** Sound writes, ours minus the golden's. */
  writes?: number;
  /** Ours over the golden's level, in dB (0 when both are silent). */
  rmsDb?: number;
  /** Below its fps floor, which a sweep does not fail on (it runs several at once). */
  slow?: boolean;
  detail?: string;
}

/** Below this the sound counts as silent, as the baseline's audio does (-80 dBFS). */
const SILENT = 1e-4;

/** A level within this of the golden's has not moved (the golden is rounded). */
export const RMS_TOLERANCE_DB = 0.05;

export function classify(run: SweepRun): SweepVerdict {
  const slow = run.emulatedFps !== undefined && run.minimumFps !== undefined && run.emulatedFps < run.minimumFps;
  const base = { key: run.key, ...(slow ? { slow } : {}) };
  if (!run.result) return { ...base, class: 'failed', detail: run.error ?? 'no result' };
  if (!run.golden) return { ...base, class: 'failed', detail: 'no golden recorded' };
  const now = run.result;
  const was = run.golden;
  const writes = now.audio.writes - was.audio.writes;
  const rmsDb = 20 * Math.log10(Math.max(now.audio.rms, SILENT) / Math.max(was.audio.rms, SILENT));
  const sound = {
    ...(writes ? { writes } : {}),
    ...(Math.abs(rmsDb) > RMS_TOLERANCE_DB ? { rmsDb: Math.round(rmsDb * 100) / 100 } : {}),
  };
  const names = [...new Set([...Object.keys(was.checkpoints), ...Object.keys(now.checkpoints)])];
  const videos = names.filter(name => now.checkpoints[name]?.video !== was.checkpoints[name]?.video);
  if (videos.length) return { ...base, class: 'video', checkpoints: videos, ...sound };
  const states = names.filter(name => now.checkpoints[name]?.state !== was.checkpoints[name]?.state);
  if (states.length) return { ...base, class: 'state', checkpoints: states, ...sound };
  const audioMoved = writes !== 0 || now.audio.nonzeroWrites !== was.audio.nonzeroWrites || Math.abs(rmsDb) > RMS_TOLERANCE_DB;
  if (audioMoved) return { ...base, class: 'audio', ...sound };
  if (now.audio.writeHash !== was.audio.writeHash || now.audio.pcmHash !== was.audio.pcmHash) return { ...base, class: 'stamps' };
  const regions = Object.keys({ ...was.regions, ...now.regions }).filter(name => now.regions[name] !== was.regions[name]);
  if (regions.length) return { ...base, class: 'regions', detail: regions.join(', ') };
  return { ...base, class: 'unchanged' };
}

/** One line of the progress file and the summary. */
export function describe(verdict: SweepVerdict): string {
  const parts = [verdict.class.toUpperCase().padEnd(9), verdict.key];
  if (verdict.checkpoints?.length) parts.push(`checkpoints ${verdict.checkpoints.join(', ')}`);
  if (verdict.writes) parts.push(`writes ${verdict.writes > 0 ? '+' : ''}${verdict.writes}`);
  if (verdict.rmsDb !== undefined) parts.push(`rms ${verdict.rmsDb > 0 ? '+' : ''}${verdict.rmsDb} dB`);
  if (verdict.slow) parts.push('(below its fps floor)');
  if (verdict.detail) parts.push(`: ${verdict.detail.split('\n')[0]!.slice(0, 200)}`);
  return parts.join('  ');
}
