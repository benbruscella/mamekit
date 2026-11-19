// The hardware closure's capabilities, lowered across a pool of worker
// processes (closure-worker.ts).
//
// Every capability lowers from the same input and none reads another's
// result, but each did its work synchronously on the main thread, so they ran
// one after another: about 550 of the closure's 560 seconds on an M3 Pro, and
// 15 of the 17 minutes CI spent assembling the distribution (#265). A family
// whose types lower on their own (`extractsPerType`) is one job a type, so
// the 110 generated devices spread across the pool as well.
//
// Workers write their own artifacts, so the generated sources never cross a
// process boundary, and answer with what the manifest needs. The results are
// put back together in registry order, and a family's types in the order its
// definition lists them, which is the order one process produced them in.

import { fork } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import type { CapabilityArtifact, CapabilityEntry, CapabilityExtraction, HardwareCapability } from '../hardware/contract.ts';
import { HARDWARE_INDEX_ENV, writeHardwareIndex } from './hardware.ts';
import { retryableGeneratorSignal } from './worker-crash.ts';

/** What a worker answers for one job: the extraction, less its artifacts. */
export type ClosureExtraction = Omit<CapabilityExtraction, 'artifacts' | 'artifactGroups' | 'artifactEmitters'> & {
  /** Each artifact the job wrote, as [path, sha1 of its contents]. */
  written: [string, string][];
};

export interface ClosureJob {
  id: number;
  capability: string;
  /** The entry types this job lowers; every entry when absent. */
  types?: string[];
}

export type ClosureWorkerMessage = { id: number; result?: ClosureExtraction; error?: string };

/**
 * Write artifacts under the generated root. Through a rename, so two workers
 * writing the one file both emit (the shared stream worklet) never interleave.
 */
export function writeCapabilityArtifacts(root: string, artifacts: readonly CapabilityArtifact[]): [string, string][] {
  return artifacts.map(artifact => {
    const target = join(root, artifact.path);
    mkdirSync(dirname(target), { recursive: true });
    const temporary = `${target}.${process.pid}.tmp`;
    writeFileSync(temporary, artifact.contents);
    renameSync(temporary, target);
    return [artifact.path, createHash('sha1').update(artifact.contents).digest('hex')];
  });
}

/** The jobs for a closure: a capability whole, or one job per type it claims. */
export function closureJobs(
  capabilities: readonly HardwareCapability[],
  entries: readonly CapabilityEntry[],
): ClosureJob[] {
  const present = new Set(entries.map(entry => entry.type));
  const whole: ClosureJob[] = [];
  const perType: ClosureJob[] = [];
  for (const capability of capabilities) {
    if (!capability.extractsPerType) {
      whole.push({ id: 0, capability: capability.id });
      continue;
    }
    for (const type of capability.mameTypes) {
      if (present.has(type)) perType.push({ id: 0, capability: capability.id, types: [type] });
    }
  }
  // Whole families first: DISCRETE is one long compile, and started last it
  // would be the tail the rest of the pool waits on.
  return [...whole, ...perType].map((job, id) => ({ ...job, id }));
}

/**
 * Lower every capability across `jobs` workers, writing artifacts under
 * `root`. Answers each capability that lowered something, in registry order.
 */
export async function extractCapabilitiesInPool(
  capabilities: readonly HardwareCapability[],
  mameSource: string,
  entries: readonly CapabilityEntry[],
  root: string,
  jobs: number,
): Promise<{ capability: HardwareCapability; result: ClosureExtraction }[]> {
  const queue = closureJobs(capabilities, entries);
  const results = new Map<number, ClosureExtraction | undefined>();
  const seconds = new Map<number, number>();
  const started = performance.now();
  const scratch = mkdtempSync(join(tmpdir(), 'mamekit-closure-'));
  const workers: ReturnType<typeof fork>[] = [];
  try {
    const entriesFile = join(scratch, 'entries.json');
    // Only what the capability contract hands an extraction.
    writeFileSync(entriesFile, JSON.stringify(entries.map(entry => ({
      type: entry.type,
      ...(entry.definition !== undefined ? { definition: entry.definition } : {}),
      methods: entry.methods.map(method => ({ name: method.name })),
      ...(entry.uses ? { uses: entry.uses } : {}),
    }))));
    const env = { ...process.env };
    if (!env[HARDWARE_INDEX_ENV]) {
      env[HARDWARE_INDEX_ENV] = join(scratch, 'hardware-index.json');
      writeHardwareIndex(mameSource, env[HARDWARE_INDEX_ENV]);
    }
    let next = 0;
    let failure: Error | undefined;
    // A job whose worker crashed in the runtime (the intermittent SIGILL/SIGBUS
    // of JIT code on macOS arm64) goes back on the queue for a fresh worker;
    // an extraction error does not. Its artifacts are rewritten whole.
    const retries: ClosureJob[] = [];
    const attempts = new Map<number, number>();
    const runWorker = (index: number): Promise<void> => new Promise((resolveWorker, rejectWorker) => {
      const child = fork(join(import.meta.dirname, 'closure-worker.ts'), [], {
        env,
        serialization: 'advanced',
        stdio: ['ignore', 'inherit', 'inherit', 'ipc'],
      });
      workers.push(child);
      let current: ClosureJob | undefined;
      let sent = 0;
      const dispatch = (): void => {
        current = failure ? undefined : retries.shift() ?? queue[next++];
        sent = performance.now();
        if (current) child.send(current);
        else child.send({ done: true });
      };
      child.on('message', (message: ClosureWorkerMessage) => {
        if (message.error !== undefined) {
          failure ??= new Error(`closure worker ${index + 1}: ${current?.capability}` +
            `${current?.types ? ` ${current.types.join(', ')}` : ''}: ${message.error}`);
        } else {
          results.set(message.id, message.result);
          seconds.set(message.id, (performance.now() - sent) / 1000);
        }
        dispatch();
      });
      child.once('error', rejectWorker);
      child.once('exit', (code, signal) => {
        if (failure) rejectWorker(failure);
        else if (current && retryableGeneratorSignal(signal) && (attempts.get(current.id) ?? 1) < 3) {
          const attempt = (attempts.get(current.id) ?? 1) + 1;
          attempts.set(current.id, attempt);
          console.warn(`closure worker ${index + 1} exited ${signal} during ${current.capability}` +
            `${current.types ? ` ${current.types.join(', ')}` : ''}; retrying (attempt ${attempt}/3)`);
          retries.push(current);
          runWorker(index).then(resolveWorker, rejectWorker);
        } else if (current) {
          rejectWorker(new Error(`closure worker ${index + 1} exited ${code ?? signal} during ` +
            `${current.capability}${current.types ? ` ${current.types.join(', ')}` : ''}`));
        } else resolveWorker();
      });
      child.send({ init: { mameSource, entriesFile, root } });
      dispatch();
    });
    const count = Math.max(1, Math.min(jobs, queue.length));
    await Promise.all(Array.from({ length: count }, (_, index) => runWorker(index)));
    // What bounds the closure, for whoever balances it next.
    const slowest = [...queue].sort((left, right) => seconds.get(right.id)! - seconds.get(left.id)!).slice(0, 5)
      .map(job => `${job.types?.join(', ') ?? job.capability} ${seconds.get(job.id)!.toFixed(0)}s`);
    const busy = [...seconds.values()].reduce((sum, value) => sum + value, 0);
    console.log(`mamekit: lowered ${queue.length} closure jobs on ${count} workers in ` +
      `${((performance.now() - started) / 1000).toFixed(0)}s (${busy.toFixed(0)} worker-seconds); ` +
      `slowest: ${slowest.join('; ')}`);
  } finally {
    for (const worker of workers) if (worker.exitCode === null && worker.signalCode === null) worker.kill();
    rmSync(scratch, { recursive: true, force: true });
  }

  // Two jobs may write one path only with the same contents.
  const owners = new Map<string, { hash: string; job: ClosureJob }>();
  for (const job of queue) {
    for (const [path, hash] of results.get(job.id)?.written ?? []) {
      const owner = owners.get(path);
      if (owner && owner.hash !== hash) {
        throw new Error(`hardware closure: ${owner.job.capability} and ${job.capability} ` +
          `${job.types ? `(${job.types.join(', ')}) ` : ''}both emit ${path}, differently`);
      }
      owners.set(path, { hash, job });
    }
  }

  return capabilities.flatMap(capability => {
    const shares = queue
      .filter(job => job.capability === capability.id)
      .flatMap(job => results.get(job.id) ?? []);
    if (!shares.length) return [];
    const merged: ClosureExtraction = { executableTypes: [], executable: {}, written: [] };
    for (const share of shares) {
      merged.executableTypes.push(...share.executableTypes);
      Object.assign(merged.executable, share.executable);
      merged.written.push(...share.written);
      if (share.entryMethods) merged.entryMethods = { ...merged.entryMethods, ...share.entryMethods };
      if (share.entrySourceFiles) merged.entrySourceFiles = { ...merged.entrySourceFiles, ...share.entrySourceFiles };
      if (share.streamVariants) merged.streamVariants = { ...merged.streamVariants, ...share.streamVariants };
    }
    return [{ capability, result: merged }];
  });
}
