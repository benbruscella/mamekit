import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import {
  compileSn76489,
  generatedSn76489WorkletSource,
} from '../../mame/sn76489-compiler.ts';
import type {
  CapabilityExtraction,
  CapabilityInput,
} from '../contract.ts';
import {
  SN76489_IR_ARTIFACT,
  SN76489_MAME_TYPES,
  SN76489_WORKLET_ARTIFACT,
} from './definition.ts';

/**
 * Every SN76496-family type the closure resolved is lowered, not just the first
 * one found. The family shares one MAME implementation, so it shares one
 * worklet, but its constructor arguments differ per variant (LFSR width, noise
 * taps, output polarity). Claiming a single entry left every other variant
 * non-executable, which reads downstream as a blocked board: adding Mr. Do!'s
 * SN76489 is what made Bank Panic's and Congo Bongo's SN76489A "blocked".
 */
export function extractSn76489(input: CapabilityInput): CapabilityExtraction | undefined {
  const entries = input.entries.filter(candidate =>
    SN76489_MAME_TYPES.includes(candidate.type as typeof SN76489_MAME_TYPES[number]) &&
    candidate.definition);
  if (!entries.length) return undefined;
  const plans = entries.map(entry => compileSn76489(
    input.mameSource,
    entry.definition as MameHardwareDefinition,
  ));
  return {
    executableTypes: entries.map(entry => entry.type),
    executable: Object.fromEntries(entries.map(entry =>
      [entry.type, { kind: 'audio', artifact: SN76489_WORKLET_ARTIFACT }] as const)),
    artifacts: [
      { path: SN76489_IR_ARTIFACT, contents: JSON.stringify(plans, null, 2) },
      {
        path: SN76489_WORKLET_ARTIFACT,
        contents: generatedSn76489WorkletSource(plans),
      },
    ],
    entrySourceFiles: Object.fromEntries(
      plans.map(plan => [plan.type, plan.sourceFiles] as const),
    ),
  };
}
