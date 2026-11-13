import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';
import { isDeclarativeHostHardwareType, type MameHardwareDefinition } from '../../mame/hardware.ts';
import { generatedStreamWorkletSource } from '../../mame/stream-worklet.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  SPEAKER_MAME_TYPES, STREAM_AUDIO_WORKLET_ARTIFACT, STREAM_SOUND_TYPES,
} from './definition.ts';

export function extractSpeaker(input: CapabilityInput): CapabilityExtraction | undefined {
  const speaker = extractStreamDevice(input, SPEAKER_MAME_TYPES);
  const variants = extractStreamVariants(input);
  if (!variants) return speaker;
  return speaker
    ? { ...speaker, artifacts: [...speaker.artifacts, ...variants.artifacts], streamVariants: variants.streamVariants }
    : variants;
}

/**
 * Every device type some machine renders as a stream (HardwareUse.stream),
 * compiled whole from its MAME class beside the capability that plays the
 * type in a worklet on every other machine: Burger Time's AY-3-8910s, whose
 * channels its DISCRETE filters, are ay8910.cpp's own sound_stream_update.
 */
export function extractStreamVariants(input: CapabilityInput): CapabilityExtraction | undefined {
  const artifacts: CapabilityExtraction['artifacts'] = [];
  const streamVariants: Record<string, string> = {};
  for (const entry of input.entries) {
    const uses = entry.uses?.filter(use => use.stream) ?? [];
    if (!uses.length || !entry.definition || STREAM_SOUND_TYPES.includes(entry.type)) continue;
    // A declarative host type is played from its own plan, never compiled as
    // a stream: the NETLIST_SOUND is the board's compiled netlist
    // (lower-netlist.ts). It once stayed out only because its class did not
    // compile; once C++ try/catch did, frogger built a netlist_mame_device
    // whose device_start reached for the netlist library itself.
    if (isDeclarativeHostHardwareType(entry.type)) continue;
    const device = compileMameDevice(input.mameSource, entry.definition as MameHardwareDefinition, entry.type, new Set(), {
      configuration: uses.flatMap(use => use.configuration ?? []),
      references: uses.flatMap(use => use.references ?? []),
      classSources: [...new Set(uses.flatMap(use => use.sources ?? []))],
    });
    if (device.summary.diagnostics) continue;
    device.hotMethods = device.methods.map(method => method.name);
    const stem = `devices/${entry.type.toLowerCase()}.stream`;
    artifacts.push(
      { path: `${stem}.device.ir.json`, contents: JSON.stringify(device, null, 2) },
      { path: `${stem}.ts`, contents: generatedDeviceExecutableSource(device, `${entry.type.toLowerCase()}.stream.device.ir.json`) },
    );
    streamVariants[entry.type] = `${stem}.ts`;
  }
  return artifacts.length ? { executableTypes: [], executable: {}, artifacts, streamVariants } : undefined;
}

/**
 * The one worklet every board plays through, whichever capability compiled
 * its sound devices: its text names none of them, so every emitter writes the
 * same file.
 */
export function streamWorkletArtifact(): CapabilityExtraction['artifacts'][number] {
  return {
    path: STREAM_AUDIO_WORKLET_ARTIFACT,
    contents: generatedStreamWorkletSource({ kind: 'stream', sourceFiles: ['src/emu/sound.cpp'], methods: ['sound_stream_update'] }),
  };
}

/**
 * A device that renders its own `sound_stream_update` beside the processor
 * (sound kind `stream`), compiled whole from its MAME class, with the shared
 * stream worklet that plays what the mix posts.
 */
export function extractStreamDevice(
  input: CapabilityInput,
  types: readonly string[],
): CapabilityExtraction | undefined {
  const compiled = input.entries.filter(candidate => types.includes(candidate.type) && candidate.definition).flatMap(entry => {
    const device = compileMameDevice(input.mameSource, entry.definition as MameHardwareDefinition, entry.type, new Set(), {
      configuration: entry.uses?.flatMap(use => use.configuration ?? []),
      references: entry.uses?.flatMap(use => use.references ?? []),
      classSources: [...new Set(entry.uses?.flatMap(use => use.sources ?? []))],
    });
    // The speaker's level_w runs on every port write that moves the beeper, a
    // POKEY steps once a clock, and the stream update either forces renders
    // every sample.
    device.hotMethods = device.methods.map(method => method.name);
    return device.summary.diagnostics ? [] : [{ type: entry.type, device, stem: `devices/${entry.type.toLowerCase()}` }];
  });
  if (!compiled.length) return undefined;
  return {
    executableTypes: compiled.map(({ type }) => type),
    executable: Object.fromEntries(compiled.map(({ type, stem }) => [type, { kind: 'device' as const, artifact: `${stem}.device.ir.json` }])),
    artifacts: [
      ...compiled.flatMap(({ type, device, stem }) => [
        { path: `${stem}.device.ir.json`, contents: JSON.stringify(device, null, 2) },
        { path: `${stem}.ts`, contents: generatedDeviceExecutableSource(device, `${type.toLowerCase()}.device.ir.json`) },
      ]),
      streamWorkletArtifact(),
    ],
    entrySourceFiles: Object.fromEntries(compiled.map(({ type, device }) => [type, device.sourceFiles])),
    entryMethods: Object.fromEntries(compiled.map(({ type, device }) => [type, device.methods.map(method => ({
      name: method.name, parameters: method.parameters, sourceFile: method.source.file,
      sourceLine: method.source.line, body: '', program: method.program,
    }))])),
  };
}
