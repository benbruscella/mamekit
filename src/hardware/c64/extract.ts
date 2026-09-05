import { addSourceConstructor, compileMameDevice } from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { C64_MAME_TYPES } from './definition.ts';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseMameConstructors, parseMameSource } from '../../mame/ast.ts';
import { normalizeMameExecutionSource } from '../../mame/cpu-compiler.ts';
import { compileMameHandler } from '../../mame/handler-ir.ts';
import { compilePla } from '../../mame/pla-compiler.ts';
import { compileDatassetteOptions } from '../../mame/cassette-compiler.ts';

export function extractC64(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    C64_MAME_TYPES.includes(entry.type as typeof C64_MAME_TYPES[number]));
  if (!present.length) return undefined;
  const result: CapabilityExtraction = { executableTypes: [], executable: {}, artifacts: [], entryMethods: {}, entrySourceFiles: {} };
  for (const entry of present) {
    const source = entry.definition as MameHardwareDefinition | undefined;
    if (!source) continue;
    const device = entry.type === 'PLS100' ? compilePla(input.mameSource, source)
      : compileMameDevice(input.mameSource, source, entry.type);
    if (entry.type === 'CBM_IEC') {
      const file = source.sourceFile;
      const constructor = parseMameConstructors(file, readFileSync(join(input.mameSource, file), 'utf8'))
        .find(candidate => candidate.className === source.className);
      if (!constructor) throw new Error('MAME IEC bus constructor missing');
      addSourceConstructor(device, constructor);
    }
    if (entry.type === 'PET_DATASSETTE_PORT') {
      device.slot = { member: 'm_cart', options: compileDatassetteOptions(input.mameSource) };
    }
    if (entry.type === 'C64_EXPANSION_SLOT') {
      // The browser image loader owns file access; source slot methods own
      // every live cartridge bus read and write.
      const imageMethods = new Set(['call_load', 'call_unload', 'get_default_card_software', 'file_extensions', 'image_interface']);
      device.methods = device.methods.filter(method => !imageMethods.has(method.name));
      device.summary = {
        methods: device.methods.length,
        compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
        diagnostics: device.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0),
      };
    }
    if (entry.type === 'RAM') {
      // Allocation and default-size option parsing lower to BoardIR storage.
      // Live accessors retain the source methods over that allocated pointer.
      const live = new Set(['pointer', 'pointer_u8', 'size', 'mask', 'read', 'write']);
      device.methods = device.methods.filter(method => live.has(method.name));
      delete device.start;
      delete device.reset;
      const header = 'src/devices/machine/ram.h';
      const pointer = parseMameSource(header, readFileSync(join(input.mameSource, header), 'utf8'))
        .functions.find(method => method.name === 'pointer' && method.templateParameters?.includes('T'));
      const accessor = device.methods.find(method => method.name === 'pointer');
      if (!pointer || !accessor) throw new Error('MAME RAM pointer template is missing');
      accessor.program = compileMameHandler(normalizeMameExecutionSource(pointer.body).replace(/\bT\b/g, 'uint8_t'));
      device.summary = {
        methods: device.methods.length,
        compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
        diagnostics: device.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0),
      };
    }
    if (device.summary.diagnostics) continue;
    // These connector and memory accessors participate in every CPU/VIC bus
    // cycle. Include their small source methods as compilation entry points;
    // loop-shape detection alone misses e.g. RAM::pointer and GAME/EXROM.
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
