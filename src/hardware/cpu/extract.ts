import {
  compileMameI8080,
  compileMameI8085A,
  compileMameI8088,
  compileMameHd6309E,
  compileMameHd63701Y0,
  compileMameKonami,
  compileMameLr35902,
  compileMameKonami1,
  compileMameM6801U4,
  compileMameM6802,
  compileMameM6803,
  compileMameM6808,
  compileMameM68000,
  compileMameM6502,
  compileMameM6507,
  compileMameMc6809,
  compileMameMc6809E,
  compileMameMcs48,
  compileMameNsc8105,
  compileMameRp2a03,
  compileMameZ80,
  compileMameZ8002,
  compileMameV30,
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
  Z80: compileMameZ80,
  Z8002: compileMameZ8002,
  SEGA_315_5098: source => ({ ...compileMameZ80(source), type: 'SEGA_315_5098' }),
  SEGA_315_5177: source => ({ ...compileMameZ80(source), type: 'SEGA_315_5177' }),
  I8080: compileMameI8080,
  I8085A: compileMameI8085A,
  I8088: compileMameI8088,
  V30: compileMameV30,
  I8035: source => compileMameMcs48(source, 'I8035'),
  I8039: source => compileMameMcs48(source, 'I8039'),
  MB8884: source => compileMameMcs48(source, 'MB8884'),
  M58715: source => compileMameMcs48(source, 'M58715'),
  M6502: compileMameM6502,
  M6507: compileMameM6507,
  M6801U4: compileMameM6801U4,
  M6802: compileMameM6802,
  M6803: compileMameM6803,
  M6808: compileMameM6808,
  M68000: compileMameM68000,
  M68010: source => ({ ...compileMameM68000(source), type: 'M68010' }),
  NSC8105: compileMameNsc8105,
  KONAMI1: compileMameKonami1,
  KONAMI: compileMameKonami,
  MC6809: compileMameMc6809,
  MC6809E: compileMameMc6809E,
  HD6309E: compileMameHd6309E,
  HD63701Y0: compileMameHd63701Y0,
  RP2A03: compileMameRp2a03,
  RP2A03G: compileMameRp2a03,
  LR35902: compileMameLr35902,
};

export function compileCpuType(type: string, mameSource: string): unknown {
  const compile = COMPILERS[type];
  if (!compile) throw new Error(`no generated CPU compiler for ${type}`);
  return compile(mameSource);
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
import { join } from 'node:path';
