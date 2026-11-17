// One worker of the hardware closure's pool (closure-pool.ts): it lowers the
// capability jobs it is sent and writes their artifacts itself, answering only
// with what the closure's manifest needs. It lives with the compiler, not a
// capability package: the app build ships src/hardware's runtime files, and
// this is not one.

import { readFileSync } from 'node:fs';
import { HARDWARE_CAPABILITIES } from '../hardware/registry.ts';
import type { CapabilityEntry } from '../hardware/contract.ts';
import { writeCapabilityArtifacts, type ClosureJob, type ClosureWorkerMessage } from './closure-pool.ts';

let context: { mameSource: string; entries: CapabilityEntry[]; root: string } | undefined;

const send = (message: ClosureWorkerMessage): void => { process.send!(message); };

process.on('message', (message: ClosureJob | { init: { mameSource: string; entriesFile: string; root: string } } | { done: true }) => {
  if ('init' in message) {
    const { mameSource, entriesFile, root } = message.init;
    context = { mameSource, root, entries: JSON.parse(readFileSync(entriesFile, 'utf8')) as CapabilityEntry[] };
    return;
  }
  if ('done' in message) {
    process.disconnect?.();
    return;
  }
  void run(message);
});

async function run(job: ClosureJob): Promise<void> {
  try {
    if (!context) throw new Error('closure worker given a job before its context');
    const capability = HARDWARE_CAPABILITIES.find(candidate => candidate.id === job.capability);
    if (!capability) throw new Error(`no hardware capability ${job.capability}`);
    const entries = job.types
      ? context.entries.filter(entry => job.types!.includes(entry.type))
      : context.entries;
    const result = await capability.extract({ mameSource: context.mameSource, entries });
    if (!result) {
      send({ id: job.id });
      return;
    }
    const written = writeCapabilityArtifacts(context.root, result.artifacts);
    for (const group of result.artifactGroups ?? []) written.push(...writeCapabilityArtifacts(context.root, group()));
    for (const emit of result.artifactEmitters ?? []) await emit(context.root);
    send({
      id: job.id,
      result: {
        executableTypes: result.executableTypes,
        executable: result.executable,
        ...(result.entryMethods ? { entryMethods: result.entryMethods } : {}),
        ...(result.entrySourceFiles ? { entrySourceFiles: result.entrySourceFiles } : {}),
        ...(result.streamVariants ? { streamVariants: result.streamVariants } : {}),
        written,
      },
    });
  } catch (error) {
    send({ id: job.id, error: (error as Error).stack ?? String(error) });
  }
}
