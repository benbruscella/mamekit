import { compileMameDevice, type GeneratedDeviceDefinition } from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import {
  compileFloppyDrive, compileFloppyFormat, compileFloppyImage, connectorFloppyFormats, isFloppyDrive,
} from '../../mame/floppy-compiler.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { FLOPPY_MAME_TYPES } from './definition.ts';

export function extractFloppy(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    FLOPPY_MAME_TYPES.includes(entry.type as typeof FLOPPY_MAME_TYPES[number]) ||
    isFloppyDrive(input.mameSource, entry.definition as MameHardwareDefinition | undefined));
  if (!present.length) return undefined;
  const result: CapabilityExtraction = { executableTypes: [], executable: {}, artifacts: [], entryMethods: {}, entrySourceFiles: {} };
  // The image formats the machine's connectors register (the 1541's
  // set_formats names D64 and G64), read from the sources of every device in
  // the closure that configures a connector, and the track store they fill.
  const sources = input.entries.flatMap(entry => {
    const file = (entry.definition as MameHardwareDefinition | undefined)?.sourceFile;
    return file ? [file] : [];
  });
  const formats = connectorFloppyFormats(input.mameSource, sources).map(name => compileFloppyFormat(input.mameSource, name));
  const usable = formats.filter(format => !format.definition.summary.diagnostics);
  for (const entry of present) {
    const source = entry.definition as MameHardwareDefinition | undefined;
    if (!source) continue;
    const device: GeneratedDeviceDefinition = entry.type === 'FLOPPY_CONNECTOR'
      ? compileMameDevice(input.mameSource, source, entry.type)
      : compileFloppyDrive(input.mameSource, source, entry.type);
    if (device.summary.diagnostics) continue;
    if (entry.type !== 'FLOPPY_CONNECTOR' && usable.length) {
      device.floppyFormats = usable;
      device.floppyImage = compileFloppyImage(input.mameSource);
    }
    // The drive answers the gate array's next-transition question on every
    // bit cell while the motor runs: all of it is a codegen root.
    device.hotMethods = device.methods.map(method => method.name);
    const stem = `devices/${entry.type.toLowerCase()}`;
    result.executableTypes.push(entry.type);
    result.executable[entry.type] = { kind: 'device', artifact: `${stem}.device.ir.json` };
    result.artifacts.push(
      { path: `${stem}.device.ir.json`, contents: JSON.stringify(device, null, 2) },
      { path: `${stem}.ts`, contents: generatedDeviceExecutableSource(device, `${entry.type.toLowerCase()}.device.ir.json`) },
    );
    result.entrySourceFiles![entry.type] = device.sourceFiles;
    result.entryMethods![entry.type] = device.methods.map(method => ({
      name: method.name, parameters: method.parameters, sourceFile: method.source.file,
      sourceLine: method.source.line, body: '', program: method.program,
    }));
  }
  return result.executableTypes.length ? result : undefined;
}
