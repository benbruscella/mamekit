import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MameAstIndex, parseMameAst } from '../../mame/ast.ts';
import { generatedDeviceExecutableSource, generatedDeviceMethodsSource, runtimeDeviceDefinition } from '../../mame/device-codegen.ts';
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
import { STREAM_SOUND_TYPES } from '../speaker/definition.ts';
import { streamWorkletArtifact } from '../speaker/extract.ts';

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
    // Emitted once: the module's methods and the runtime definition beside it,
    // which leaves out the programs only the emitted code runs.
    const emitted = generatedDeviceMethodsSource(device, true);
    const runtime = runtimeDeviceDefinition(device, emitted);
    artifacts.push(
      { path: ir, contents: JSON.stringify(runtime) },
      {
        path: deviceModuleArtifact(type),
        contents: generatedDeviceExecutableSource(device, ir.replace('devices/', ''), undefined, emitted),
      },
    );
    executable[type] = { kind: 'device', artifact: ir };
    entrySourceFiles[type] = device.sourceFiles;
    // Audited as the runtime holds them: a method only its emitted code runs
    // is audited by that code, its entry keeping its name, signature, source
    // line and diagnostics. With every program, the 68000's audit IR was
    // 300 MB, past what the deploy can push.
    entryMethods[type] = runtime.methods.map(method => ({
      name: method.name,
      parameters: method.parameters,
      sourceFile: method.source.file,
      sourceLine: method.source.line,
      body: '',
      program: method.program,
    }));
  }
  // A device that builds a stream chip and mixes it (the RP2A03's APU, routed
  // `add_route(ALL_OUTPUTS, *this, ...)`) plays through the shared stream
  // worklet, as any board with a stream chip of its own does.
  if ([...compiled.values()].some(device => device.children?.some(child =>
    child.routes?.some(route => route.target === '*this') && STREAM_SOUND_TYPES.includes(child.type)))) {
    artifacts.push(streamWorkletArtifact());
  }
  return {
    executableTypes: [...compiled.keys()],
    executable,
    artifacts,
    entryMethods,
    entrySourceFiles,
  };
}
