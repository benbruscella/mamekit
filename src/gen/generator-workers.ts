import { availableParallelism, totalmem } from 'node:os';

/**
 * A target generator parses a large MAME translation unit in its own V8
 * isolate. CPU count is therefore not a safe concurrency default: twelve
 * simultaneous isolates can put macOS under severe VM pressure and has caused
 * native V8 SIGBUS crashes. The 4GB-per-worker memory bound models that; the
 * hard cap of 8 keeps headroom on high-core machines now that workers no
 * longer sit on a long-lived `git log` subprocess each (driver history is
 * cached in .cache/driver-history). Explicit --jobs/MAMEKIT_JOBS values
 * remain an opt-in override.
 */
export function defaultGeneratorJobs(
  targetCount = Infinity,
  cpuCount = availableParallelism(),
  memoryBytes = totalmem(),
): number {
  const memoryBound = Math.max(1, Math.floor(memoryBytes / (4 * 1024 ** 3)));
  return Math.max(1, Math.min(targetCount, cpuCount, memoryBound, 8));
}

/** Signals produced by a crashed runtime, rather than a generator exception. */
export function retryableGeneratorSignal(signal: NodeJS.Signals | null): boolean {
  return signal === 'SIGBUS' || signal === 'SIGSEGV' || signal === 'SIGABRT';
}
