import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { generatedStreamWorkletSource } from '../../mame/stream-worklet.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { SPEAKER_MAME_TYPES, STREAM_AUDIO_WORKLET_ARTIFACT } from './definition.ts';

export function extractSpeaker(input: CapabilityInput): CapabilityExtraction | undefined {
  return extractStreamDevice(input, SPEAKER_MAME_TYPES);
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
  const entry = input.entries.find(candidate => types.includes(candidate.type));
  const source = entry?.definition as MameHardwareDefinition | undefined;
  if (!entry || !source) return undefined;
  const device = compileMameDevice(input.mameSource, source, entry.type, new Set(), {
    configuration: entry.uses?.flatMap(use => use.configuration ?? []),
    references: entry.uses?.flatMap(use => use.references ?? []),
  });
  if (device.summary.diagnostics) return undefined;
  // The speaker's level_w runs on every port write that moves the beeper, a
  // POKEY steps once a clock, and the stream update either forces renders
  // every sample.
  device.hotMethods = device.methods.map(method => method.name);
  const stem = `devices/${entry.type.toLowerCase()}`;
  return {
    executableTypes: [entry.type],
    executable: { [entry.type]: { kind: 'device', artifact: `${stem}.device.ir.json` } },
    artifacts: [
      { path: `${stem}.device.ir.json`, contents: JSON.stringify(device, null, 2) },
      { path: `${stem}.ts`, contents: generatedDeviceExecutableSource(device, `${entry.type.toLowerCase()}.device.ir.json`) },
      // One worklet for every stream device, so its text names none of them.
      { path: STREAM_AUDIO_WORKLET_ARTIFACT, contents: generatedStreamWorkletSource({
        kind: 'stream', sourceFiles: ['src/emu/sound.cpp'], methods: ['sound_stream_update'],
      }) },
    ],
    entrySourceFiles: { [entry.type]: device.sourceFiles },
    entryMethods: { [entry.type]: device.methods.map(method => ({
      name: method.name, parameters: method.parameters, sourceFile: method.source.file,
      sourceLine: method.source.line, body: '', program: method.program,
    })) },
  };
}
