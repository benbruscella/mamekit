import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MameAstIndex, parseMameAst } from '../../mame/ast.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';
import { compileMameHandler } from '../../mame/handler-ir.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import type {
  CapabilityArtifact,
  CapabilityExtraction,
  CapabilityInput,
  LoweredMethod,
} from '../contract.ts';
import {
  DEVICE_MAME_TYPES,
  deviceIrArtifact,
  deviceModuleArtifact,
} from './definition.ts';

type Compiled = ReturnType<typeof compileMameDevice>;

const SPECIALIZED: Record<
string,
(mameSource: string, definition: MameHardwareDefinition) => Compiled
> = {
  UPD7759: compileUpd7759,
};

/**
 * The browser audio worklet renders the uPD7759 stream, while the generated
 * device owns its source-declared control surface and state. The one method
 * that cannot lower is MAME's sound_stream reference wrapper; keeping it as
 * an executable no-op leaves PCM generation with the worklet and permits the
 * complete inherited device hierarchy to be emitted without diagnostics.
 */
export function compileUpd7759(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'UPD7759');
  replaceMethod(device, 'sound_stream_update', '');
  return refreshSummary(device);
}

function replaceMethod(device: Compiled, name: string, body: string): void {
  const methods = device.methods.filter(candidate => candidate.name === name);
  if (!methods.length) throw new Error(`${device.type}: source method ${name} is missing`);
  for (const method of methods) method.program = compileMameHandler(body);
}

function refreshSummary(device: Compiled): Compiled {
  device.summary = {
    methods: device.methods.length,
    compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: device.methods.reduce(
      (count, method) => count + method.program.diagnostics.length,
      0,
    ),
  };
  return device;
}

export function extractDevices(input: CapabilityInput): CapabilityExtraction | undefined {
  const compiled = new Map<string, Compiled>();
  for (const type of DEVICE_MAME_TYPES) {
    const entry = input.entries.find(candidate => candidate.type === type);
    if (!entry) continue;
    if (!entry.definition) continue;
    const definition = entry.definition as MameHardwareDefinition;
    const device = SPECIALIZED[type]
      ? SPECIALIZED[type](input.mameSource, definition)
      : compileMameDevice(input.mameSource, definition, type, new Set(), {
        configuration: entry.uses?.flatMap(use => use.configuration ?? []),
        references: entry.uses?.flatMap(use => use.references ?? []),
      });
    // A device whose methods did not lower cleanly is not executable. Emitting
    // it anyway would claim hardware the runtime cannot actually run.
    if (device.summary.diagnostics) continue;
    compiled.set(type, device);
  }
  if (!compiled.size) return undefined;

  const artifacts: CapabilityArtifact[] = [];
  const executable: CapabilityExtraction['executable'] = {};
  const entryMethods: Record<string, readonly LoweredMethod[]> = {};
  const entrySourceFiles: Record<string, readonly string[]> = {};
  for (const [type, device] of compiled) {
    const ir = deviceIrArtifact(type);
    artifacts.push(
      { path: ir, contents: JSON.stringify(device, null, 2) },
      {
        path: deviceModuleArtifact(type),
        contents: generatedDeviceExecutableSource(device, ir.replace('devices/', '')),
      },
    );
    executable[type] = { kind: 'device', artifact: ir };
    entrySourceFiles[type] = device.sourceFiles;
    entryMethods[type] = device.methods.map(method => ({
      name: method.name,
      parameters: method.parameters,
      sourceFile: method.source.file,
      sourceLine: method.source.line,
      body: '',
      program: method.program,
    }));
  }
  return {
    executableTypes: [...compiled.keys()],
    executable,
    artifacts,
    entryMethods,
    entrySourceFiles,
  };
}
