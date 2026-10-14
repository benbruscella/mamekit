import { CPreprocessor } from '../../mame/c-preprocessor.ts';
import { compileMameDevice, constructorInitialValues } from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { normalizeMameExecutionSource } from '../../mame/cpu-compiler.ts';
import { compileMameHandler } from '../../mame/handler-ir.ts';
import { executeGeneratedProgram } from '../../ir/execute.ts';
import { splitMameArgs, parseMameConstructors } from '../../mame/ast.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import type { CapabilityInput, CapabilityExtraction } from '../contract.ts';
import { SERIAL_EEPROM_MAME_TYPES } from './definition.ts';

/** Compile the serial protocol itself; only memory allocation is provided by the host. */
export function compileSerialEeprom(mameSource: string, definition: MameHardwareDefinition) {
  const sourceUnits = new Map<string, string>();
  const device = compileMameDevice(mameSource, definition, definition.type, new Set(), {
    transformSource: (file, source) => {
      const expanded = new CPreprocessor({ read: () => undefined }).run(file, source);
      sourceUnits.set(file, expanded);
      return expanded;
    },
  });
  const source = [...sourceUnits.values()].join('\n');
  const match = /DEFINE_SERIAL_EEPROM_DEVICE\s*\(([^)]*)\)/.exec(definition.macro);
  if (!match) throw new Error(`${definition.type}: missing serial EEPROM declaration`);
  const [, , , bitsText, cellsText, addressText] = splitMameArgs(match[1]!);
  const bits = Number(bitsText), cells = Number(cellsText), commandBits = Number(addressText);
  if (bits !== 8 || !Number.isSafeInteger(cells) || cells <= 0 || (cells & (cells - 1)) || !Number.isSafeInteger(commandBits)) {
    throw new Error(`${definition.type}: unsupported serial EEPROM geometry`);
  }
  const initial: Record<string, unknown> = Object.assign({}, ...device.hierarchy.map(name =>
    constructorInitialValues(name, source, device.constants)));
  const size = device.methods.find(method => method.name === 'size');
  const address = device.methods.find(method => method.name === 'set_address_bits');
  if (!size || !address) throw new Error(`${definition.type}: missing source configuration methods`);
  executeGeneratedProgram(size.program, { members: initial, constants: device.constants }, { cells, cellbits: bits });
  executeGeneratedProgram(address.program, { members: initial, constants: device.constants }, { addrbits: commandBits });
  const baseConstructor = [...sourceUnits].flatMap(([file, source]) => parseMameConstructors(file, source))
    .find(ctor => ctor.className === 'eeprom_base_device');
  if (!baseConstructor) throw new Error(`${definition.type}: missing EEPROM base constructor`);
  initial.m_operation_time = Array(device.constants.TIMING_COUNT).fill(0);
  const constructor = compileMameHandler(normalizeMameExecutionSource(baseConstructor.body));
  if (constructor.diagnostics.length) throw new Error(constructor.diagnostics.join('; '));
  executeGeneratedProgram(constructor, {
    members: initial, constants: device.constants,
    calls: { 'attotime::from_usec': value => value / 1_000_000 },
  });
  for (const member of device.members) {
    const value = initial[member.name];
    if (typeof value === 'number') member.initial = value;
    else if (Array.isArray(value)) member.values = value;
  }
  // MAME allocates this storage in its base device_start. Resources allocate
  // it before start and alias the supplied NVRAM region, so the protocol sees
  // the same bytes that persistence and save states already own.
  const baseStart = device.methods.find(method => method.name === 'eeprom_base_device::device_start');
  if (!baseStart) throw new Error(`${definition.type}: missing EEPROM base startup`);
  baseStart.program.operations = baseStart.program.operations.filter(operation =>
    !(operation.op === 'assign' && operation.target.kind === 'identifier' && operation.target.name === 'm_data'));
  device.resources = { members: {
    m_data: { kind: 'memory', name: 'nvram', bytes: cells, region: 'self', fill: 0xff },
  } };
  device.role = 'passive-storage';
  device.hotMethods = ['cs_write', 'clk_write', 'di_write', 'do_read', 'ready_read'];
  if (device.summary.diagnostics) throw new Error(`${definition.type}: EEPROM methods did not lower`);
  return device;
}

export function extractSerialEeprom(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(entry => SERIAL_EEPROM_MAME_TYPES.includes(entry.type as typeof SERIAL_EEPROM_MAME_TYPES[number]));
  if (!entry?.definition) return undefined;
  const device = compileSerialEeprom(input.mameSource, entry.definition as MameHardwareDefinition);
  const slug = device.type.toLowerCase();
  const ir = `devices/${slug}.device.ir.json`;
  return {
    executableTypes: [device.type],
    executable: { [device.type]: { kind: 'device', artifact: ir } },
    artifacts: [
      { path: ir, contents: JSON.stringify(device, null, 2) },
      { path: `devices/${slug}.ts`, contents: generatedDeviceExecutableSource(device, `${slug}.device.ir.json`) },
    ],
    entrySourceFiles: { [device.type]: device.sourceFiles },
    entryMethods: { [device.type]: device.methods.map(method => ({
      name: method.name, parameters: method.parameters, sourceFile: method.source.file,
      sourceLine: method.source.line, body: '', program: method.program,
    })) },
  };
}
