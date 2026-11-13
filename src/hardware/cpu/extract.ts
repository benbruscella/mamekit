import {
  compileMameM68000,
} from '../../mame/cpu-compiler.ts';
import { generatedCpuExecutableSource } from '../../mame/cpu-codegen.ts';
import type {
  CapabilityArtifact,
  CapabilityExtraction,
  CapabilityInput,
} from '../contract.ts';
import { CPU_MAME_TYPES, cpuIrArtifact, cpuModuleArtifact } from './definition.ts';

/** Which MAME compiler produces each core. */
const COMPILERS: Record<string, (mameSource: string) => unknown> = {
  // Its own decode column and initializer, not a relabelled 68000: see
  // M68000_VARIANTS in cpu-compiler.ts.
  M68010: source => compileMameM68000(source, 'M68010'),
};

export function compileCpuType(type: string, mameSource: string): unknown {
  const compile = COMPILERS[type];
  if (!compile) throw new Error(`no generated CPU compiler for ${type}`);
  return withSuspensionFact(compile(mameSource), mameSource);
}

/**
 * Whether MAME's core can stop between the cycles of one instruction. Such a
 * core keeps where it stopped in `m_inst_substate` (the 6502 family checks
 * its icount before every cycle), so a timeslice ends exactly at a timer's
 * expiry and the timer fires before the rest of the instruction. A core
 * without it finishes the instruction first, in MAME as here.
 */
function withSuspensionFact(definition: unknown, mameSource: string): unknown {
  const files = (definition as { sourceFiles?: unknown }).sourceFiles;
  if (!Array.isArray(files)) return definition;
  const suspends = files.some(file => {
    const path = join(mameSource, String(file));
    return /\.h$/.test(String(file)) && existsSync(path) &&
      /^\s*(?:int|u\d+|uint\d+_t)\s+(?:\w+\s*,\s*)*m_inst_substate\b/m.test(readFileSync(path, 'utf8'));
  });
  return suspends ? { ...definition as object, suspendsMidInstruction: true } : definition;
}

export function extractCpus(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = CPU_MAME_TYPES.filter(type =>
    input.entries.some(entry => entry.type === type));
  if (!present.length) return undefined;

  const executable: CapabilityExtraction['executable'] = {};
  for (const type of present) {
    executable[type] = { kind: 'cpu', artifact: cpuIrArtifact(type) };
  }
  return {
    executableTypes: [...present],
    executable,
    artifacts: [],
    artifactEmitters: present.map(type => root => new Promise<void>(
      (resolveWorker, rejectWorker) => {
        const worker = spawn(process.execPath, [
          join(import.meta.dirname, '../../../tools/emit-cpu-worker.ts'),
          type,
          input.mameSource,
          root,
        ], { stdio: 'inherit' });
        worker.once('error', rejectWorker);
        worker.once('exit', (code, signal) => {
          if (code === 0) resolveWorker();
          else rejectWorker(new Error(`${type}: CPU artifact worker exited ${code ?? signal}`));
        });
      },
    )),
  };
}
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
