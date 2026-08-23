import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { DAC_MAME_TYPES, DAC_WORKLET_ARTIFACT } from './definition.ts';
import { generatedDacWorkletSource, type DacGeneratorTable } from './worklet-source.ts';

/** MAME's DAC device library: one DAC_GENERATOR line per chip. */
const DAC_HEADER = 'src/devices/sound/dac.h';

/**
 * Recover every DAC's electrical definition from `dac.h`.
 *
 * MAME states each chip's resolution, coding and ladder gain in the
 * DAC_GENERATOR macro call that declares it, so a ten-bit AD7533 and an
 * eight-bit MC1408 are distinguishable facts rather than a runtime guess.
 * Without them the mixer has to infer a width from the values it happens to
 * see, which masks a ten-bit code to eight bits and wraps the waveform.
 */
export function parseDacGenerators(source: string): DacGeneratorTable {
  const gains = new Map<string, number>();
  for (const match of source.matchAll(
    /constexpr\s+sound_stream::sample_t\s+(\w+)\s*=\s*([-\d.]+)\s*;/g,
  )) {
    gains.set(match[1]!, Number(match[2]));
  }
  const table: DacGeneratorTable = {};
  for (const match of source.matchAll(/^DAC_GENERATOR\(([^)]*)\)/gm)) {
    const args = match[1]!.split(',').map(argument => argument.trim());
    if (args.length < 6) continue;
    const [type, , , mapper, bits, gain] = args as [string, string, string, string, string, string];
    const width = Number(bits);
    const scale = gains.get(gain) ?? Number(gain);
    const coding = /^dac_mapper_(\w+)$/.exec(mapper)?.[1];
    if (!Number.isInteger(width) || width < 1 || width > 16) continue;
    if (!Number.isFinite(scale) || !coding) continue;
    table[type] = { bits: width, mapper: coding, gain: scale };
  }
  return table;
}

export function extractDac(input: CapabilityInput): CapabilityExtraction | undefined {
  const types = [...new Set(input.entries
    .map(entry => entry.type)
    .filter(type => DAC_MAME_TYPES.includes(type as typeof DAC_MAME_TYPES[number])))];
  if (!types.length) return undefined;
  let table: DacGeneratorTable;
  try {
    table = parseDacGenerators(readFileSync(join(input.mameSource, DAC_HEADER), 'utf8'));
  } catch {
    return undefined;
  }
  // A DAC whose resolution and coding could not be recovered is not lowered:
  // leaving it unresolved in the manifest is honest, guessing its width is not.
  if (types.some(type => !table[type])) return undefined;
  return {
    executableTypes: types,
    executable: Object.fromEntries(types.map(type => [
      type,
      { kind: 'audio' as const, artifact: DAC_WORKLET_ARTIFACT },
    ])),
    artifacts: [{ path: DAC_WORKLET_ARTIFACT, contents: generatedDacWorkletSource(table) }],
  };
}
