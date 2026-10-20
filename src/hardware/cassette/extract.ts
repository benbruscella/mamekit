import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseMameSource } from '../../mame/ast.ts';
import { compileCassetteDevice, compileCassetteFormatList } from '../../mame/cassette-compiler.ts';
import { normalizeMameExecutionSource } from '../../mame/cpu-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameHandler } from '../../mame/handler-ir.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { CASSETTE_MAME_TYPES } from './definition.ts';

const CASSETTE_FILE = 'src/devices/imagedev/cassette.cpp';

export function extractCassette(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate =>
    CASSETTE_MAME_TYPES.includes(candidate.type as typeof CASSETTE_MAME_TYPES[number]));
  if (!entry) return undefined;
  const device = compileCassetteDevice(input.mameSource);
  // A root cassette may be routed to the speakers (the Spectrum's is, at
  // 0.05, so a load is heard): its stream renders the tape it is playing.
  const stream = parseMameSource(CASSETTE_FILE, readFileSync(join(input.mameSource, CASSETTE_FILE), 'utf8'))
    .functions.find(method => method.name === 'sound_stream_update');
  if (!stream) throw new Error('MAME cassette sound stream changed');
  device.methods.push({ name: 'sound_stream_update', parameters: stream.parameters,
    program: compileMameHandler(normalizeMameExecutionSource(stream.body)),
    source: { file: CASSETTE_FILE, line: stream.span.line } });
  // The formats every machine using it hands the cassette with
  // `set_formats(...)`, each tagged with its list: the device answers only
  // its own machine's (`m_formats`), as MAME's open_choices does.
  const lists = [...new Set((entry.uses ?? []).flatMap(use => (use.configuration ?? [])
    .flatMap(line => [...line.matchAll(/\bset_formats\s*\(\s*(\w+)\s*\)/g)].map(match => match[1]!))))].sort();
  device.imageFormats = lists.flatMap(list => compileCassetteFormatList(input.mameSource, list));
  device.summary = { methods: device.methods.length,
    compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: device.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0) };
  if (device.summary.diagnostics) return undefined;
  device.hotMethods = device.methods.map(method => method.name);
  const stem = `devices/${entry.type.toLowerCase()}`;
  return {
    executableTypes: [entry.type],
    executable: { [entry.type]: { kind: 'device', artifact: `${stem}.device.ir.json` } },
    artifacts: [
      { path: `${stem}.device.ir.json`, contents: JSON.stringify(device, null, 2) },
      { path: `${stem}.ts`, contents: generatedDeviceExecutableSource(device, `${entry.type.toLowerCase()}.device.ir.json`) },
    ],
    entrySourceFiles: { [entry.type]: device.sourceFiles },
    entryMethods: { [entry.type]: device.methods.map(method => ({
      name: method.name, parameters: method.parameters, sourceFile: method.source.file,
      sourceLine: method.source.line, body: '', program: method.program,
    })) },
  };
}
