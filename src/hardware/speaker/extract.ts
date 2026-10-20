import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { generatedStreamWorkletSource } from '../../mame/stream-worklet.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { SPEAKER_MAME_TYPES, STREAM_AUDIO_WORKLET_ARTIFACT } from './definition.ts';

export function extractSpeaker(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate =>
    SPEAKER_MAME_TYPES.includes(candidate.type as typeof SPEAKER_MAME_TYPES[number]));
  const source = entry?.definition as MameHardwareDefinition | undefined;
  if (!entry || !source) return undefined;
  const device = compileMameDevice(input.mameSource, source, entry.type);
  if (device.summary.diagnostics) return undefined;
  // level_w runs on every port write that moves the beeper, and the stream
  // update it forces renders every sample.
  device.hotMethods = device.methods.map(method => method.name);
  const stem = `devices/${entry.type.toLowerCase()}`;
  return {
    executableTypes: [entry.type],
    executable: { [entry.type]: { kind: 'device', artifact: `${stem}.device.ir.json` } },
    artifacts: [
      { path: `${stem}.device.ir.json`, contents: JSON.stringify(device, null, 2) },
      { path: `${stem}.ts`, contents: generatedDeviceExecutableSource(device, `${entry.type.toLowerCase()}.device.ir.json`) },
      { path: STREAM_AUDIO_WORKLET_ARTIFACT, contents: generatedStreamWorkletSource({
        kind: 'stream', sourceFiles: device.sourceFiles, methods: ['sound_stream_update'],
      }) },
    ],
    entrySourceFiles: { [entry.type]: device.sourceFiles },
    entryMethods: { [entry.type]: device.methods.map(method => ({
      name: method.name, parameters: method.parameters, sourceFile: method.source.file,
      sourceLine: method.source.line, body: '', program: method.program,
    })) },
  };
}
