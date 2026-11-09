import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MameAstIndex, parseMameAst } from '../../mame/ast.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';
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

export function extractDevices(input: CapabilityInput): CapabilityExtraction | undefined {
  const compiled = new Map<string, Compiled>();
  for (const type of DEVICE_MAME_TYPES) {
    const entry = input.entries.find(candidate => candidate.type === type);
    if (!entry) continue;
    if (!entry.definition) continue;
    const definition = entry.definition as MameHardwareDefinition;
    const device = compileMameDevice(input.mameSource, definition, type, new Set(), {
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
