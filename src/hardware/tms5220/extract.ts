// The TMS5220 is emitted as a main-thread device rather than a worklet core.
//
// Its /READY pin is wired into a port the sound CPU polls before every byte it
// writes, and ready depends on the FIFO level, which depends on how fast the
// frame parser consumes bits — so the chip has to sit beside the CPU that
// talks to it. The generated module therefore takes the shape the board
// already knows how to load: a device IR definition whose methods are backed
// by compiled JavaScript. Only the PCM it produces crosses to the audio sink.

import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import {
  compileTms5220,
  generatedTms5220CoreSource,
  type GeneratedTms5220Plan,
} from '../../mame/tms5220-compiler.ts';
import type { CapabilityArtifact, CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { TMS5220_MAME_TYPES, tms5220IrArtifact, tms5220ModuleArtifact } from './definition.ts';

/** Methods the board binds: bus writes, control pins and the sample source. */
const METHODS: { name: string; parameters: string }[] = [
  { name: 'data_w', parameters: 'uint8_t data' },
  { name: 'wsq_w', parameters: 'int state' },
  { name: 'rsq_w', parameters: 'int state' },
  { name: 'readyq_r', parameters: '' },
  { name: 'intq_r', parameters: '' },
  { name: 'status_r', parameters: '' },
  { name: 'set_unscaled_clock', parameters: 'uint32_t clock' },
  { name: 'sound_stream_update', parameters: '' },
  { name: 'sample_rate', parameters: '' },
];

function deviceIr(plan: GeneratedTms5220Plan): unknown {
  return {
    schemaVersion: 1,
    type: plan.type,
    className: plan.className,
    hierarchy: [plan.className, 'device_t'],
    sourceFiles: plan.sourceFiles,
    constants: {
      FIFO_SIZE: plan.fifoSize,
      CLOCK_DIVIDER: plan.clockDivider,
      READY_CLOCKS: plan.readyClocks,
    },
    members: [],
    callbacks: [
      { signal: 'irq_handler', member: 'm_irq_handler', slots: 1, initial: 0 },
      { signal: 'readyq_handler', member: 'm_readyq_handler', slots: 1, initial: 0 },
    ],
    timers: [],
    methods: METHODS.map(method => ({
      name: method.name,
      parameters: method.parameters,
      // The behaviour is the compiled method below; the program is the empty
      // one so nothing ever falls through to the interpreter.
      program: { operations: [], diagnostics: [] },
      source: { file: plan.source.file, line: plan.source.line },
    })),
    summary: { methods: METHODS.length, diagnostics: 0 },
  };
}

function moduleSource(plan: GeneratedTms5220Plan): string {
  const slug = plan.type.toLowerCase();
  return `// GENERATED from ${plan.source.file}; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './${slug}.device.ir.json' with { type: 'json' };
${generatedTms5220CoreSource(plan)}

// One engine per device instance, keyed by the instance's own member table.
const cores = new WeakMap<object, GeneratedTms5220Core>();
// Samples the engine has produced but the audio sink has not collected.
const pending = new WeakMap<object, number[]>();

function coreFor(context: { members: object }): GeneratedTms5220Core {
  let core = cores.get(context.members);
  if (!core) {
    core = new GeneratedTms5220Core(${plan.clockDivider * 8000});
    cores.set(context.members, core);
    pending.set(context.members, []);
  }
  return core;
}

const definition = deviceData as unknown as GeneratedDeviceDefinition;
type Ctx = { members: object };
const methods: Record<string, (context: Ctx, ...args: unknown[]) => number> = {
  data_w: (context, data) => {
    coreFor(context).dataW(Number(data) & 0xff);
    return 0;
  },
  wsq_w: (context, state) => {
    coreFor(context).wsqW(Number(state) & 1);
    return 0;
  },
  rsq_w: (context, state) => {
    coreFor(context).rsqW(Number(state) & 1);
    return 0;
  },
  readyq_r: context => coreFor(context).readyqR(),
  intq_r: () => 0,
  status_r: context => coreFor(context).statusR(),
  set_unscaled_clock: (context, clock) => {
    coreFor(context).setClock(Number(clock));
    return 0;
  },
  // The chip's current output rate. gauntlet's speech-squeak line retunes the
  // clock while it talks, so the pump has to ask rather than cache it.
  sample_rate: context => Math.round(coreFor(context).sampleRate),
  // One native sample, scaled to the signed 16-bit range the sink mixes in.
  sound_stream_update: context => {
    const core = coreFor(context);
    core.advanceClocks(${plan.clockDivider});
    return core.step();
  },
};
definition.compiledMethods = methods as unknown as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
`;
}

export function extractTms5220(input: CapabilityInput): CapabilityExtraction | undefined {
  const artifacts: CapabilityArtifact[] = [];
  const executable: CapabilityExtraction['executable'] = {};
  const executableTypes: string[] = [];
  const entrySourceFiles: Record<string, readonly string[]> = {};
  for (const type of TMS5220_MAME_TYPES) {
    const entry = input.entries.find(candidate => candidate.type === type);
    if (!entry?.definition) continue;
    const plan = compileTms5220(
      input.mameSource,
      entry.definition as MameHardwareDefinition,
    );
    artifacts.push(
      { path: tms5220IrArtifact(type), contents: JSON.stringify(deviceIr(plan), null, 2) },
      { path: tms5220ModuleArtifact(type), contents: moduleSource(plan) },
    );
    executable[type] = { kind: 'device', artifact: tms5220IrArtifact(type) };
    executableTypes.push(type);
    entrySourceFiles[type] = plan.sourceFiles;
  }
  if (!executableTypes.length) return undefined;
  return { executableTypes, executable, artifacts, entrySourceFiles };
}
