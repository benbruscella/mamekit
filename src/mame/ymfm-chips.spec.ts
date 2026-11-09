import assert from 'node:assert/strict';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice, type GeneratedDeviceDefinition } from './device-compiler.ts';
import { generatedDeviceMethodsSource, generatedStructMethodsSources } from './device-codegen.ts';
import { clearGeneratedDevices, createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

// MAME 0.289's YM2151, YM2203, YM3526 and YM3812 are thin wrappers over
// 3rdparty/ymfm (ymopm.cpp, ymopn.cpp, ymopl.cpp), and each compiles whole:
// the wrapper, the chip class it holds and the engine, channel and operator
// classes that one builds (#242). Rendered through the device's own classes
// it is ymfm: the samples and weighted sums below are what native ymfm gives
// for the same writes, built with clang from 3rdparty/ymfm:
//
//   ymfm::ymfm_interface intf; Chip chip(intf); chip.reset();
//   (the YM2203 and YM2610 at OPN_FIDELITY_MED first, as MAME's device_start sets it)
//   for each (address, data): chip.write(0, address); chip.write(1, data);
//   then chip.generate(&out, 1) 4096 times, summing out.data[o] * (index % 7 + 1)
//   and keeping samples 2000..2007.
const mameSrc = process.env.MAME_SRC ?? '../mame';
const hardware = indexMameHardware(mameSrc);

type Script = [number, number][];
interface Case {
  type: string;
  outputs: number;
  script: Script;
  samples: number[];
  weighted: number[];
}

const opm: Script = [[0x20, 0xc7], [0x28, 0x4a], [0x30, 0x00]];
const opn: Script = [[0xb0, 0x05], [0xa4, 0x22], [0xa0, 0x69]];
for (let op = 0; op < 4; op++) {
  const s = op * 8;
  opm.push([0x40 + s, 0x01], [0x60 + s, op === 3 ? 0x08 : 0x20], [0x80 + s, 0x1f], [0xa0 + s, 0x05], [0xc0 + s, 0x02], [0xe0 + s, 0x2f]);
  const n = op * 4;
  opn.push([0x30 + n, 0x01], [0x40 + n, op === 3 ? 0x08 : 0x20], [0x50 + n, 0x1f], [0x60 + n, 0x05], [0x70 + n, 0x02], [0x80 + n, 0x2f]);
}
opm.push([0x08, 0x78]);
opn.push([0x28, 0xf0], [0x00, 0x80], [0x01, 0x01], [0x07, 0x3e], [0x08, 0x0f]);
// The YM2610 has no FM channel 0: the same voice on channel 1, panned centre.
const opnb: Script = [[0xb1, 0x05], [0xa5, 0x22], [0xa1, 0x69]];
for (let op = 0; op < 4; op++) {
  const s = op * 4 + 1;
  opnb.push([0x30 + s, 0x01], [0x40 + s, op === 3 ? 0x08 : 0x20], [0x50 + s, 0x1f], [0x60 + s, 0x05], [0x70 + s, 0x02], [0x80 + s, 0x2f]);
}
opnb.push([0xb5, 0xc0], [0x28, 0xf1], [0x00, 0x80], [0x01, 0x01], [0x07, 0x3e], [0x08, 0x0f]);
const opl: Script = [[0x20, 0x01], [0x23, 0x01], [0x40, 0x10], [0x43, 0x00], [0x60, 0xf3], [0x63, 0xf3],
  [0x80, 0x2f], [0x83, 0x2f], [0xc0, 0x0e], [0xa0, 0x98], [0xb0, 0x31]];
const opl2: Script = [[0x01, 0x20], [0xe0, 0x01], [0xe3, 0x02], ...opl];

const CASES: Case[] = [
  {
    type: 'YM2151', outputs: 2, script: opm,
    samples: [-5552, -5552, -5568, -5568, -5568, -5568, -5552, -5552, -5520, -5520, -5472, -5472, -5408, -5408, -5344, -5344],
    weighted: [297680, 297680],
  },
  {
    type: 'YM2203', outputs: 4, script: opn,
    // At SSG_FIDELITY (OPN_FIDELITY_MED), as ym2203_device::device_start sets it.
    samples: [...Array.from({ length: 4 }, () => [1160, 16382, 0, 0]), ...Array.from({ length: 4 }, () => [1224, 16382, 0, 0])].flat(),
    weighted: [3836662, 134217708, 0, 0],
  },
  {
    // FM left, FM right, then the SSG, at OPN_FIDELITY_MED as the device sets it.
    type: 'YM2610', outputs: 3, script: opnb,
    samples: [-607, -607, 10921, -577, -577, 10921, -547, -547, 10921, -531, -531, 10921,
      -487, -487, 10921, -456, -456, 10921, -423, -423, 10921, -393, -393, 10921],
    weighted: [349703, 349703, 89446535],
  },
  { type: 'YM3526', outputs: 1, script: opl, samples: [826, -986, 2712, 293, -1348, 2432, -434, -1732], weighted: [6784364] },
  { type: 'YM3812', outputs: 1, script: opl2, samples: [964, 3664, 666, 526, 2544, 223, 82, 642], weighted: [39103178] },
];

// Emitted code, as the generated module compiles it: every class the device
// holds is compiled too.
const emit = (definition: GeneratedDeviceDefinition): GeneratedDeviceDefinition => {
  const emitted = generatedDeviceMethodsSource({ ...definition, hotMethods: definition.methods.map(method => method.name) });
  return {
    ...definition,
    compiledMethods: new Function(`return ${emitted.source}`)(),
    ...(emitted.links.length ? { compiledMethodLinks: emitted.links } : {}),
    // And the structs' own methods (`output->clear()`), as the module emits them.
    compiledStructMethods: Object.fromEntries(Object.entries(generatedStructMethodsSources(definition, false))
      .map(([type, source]) => [type, new Function(`return ${source}`)()])),
    ...(definition.allocations
      ? { allocations: Object.fromEntries(Object.entries(definition.allocations).map(([name, allocated]) => [name, emit(allocated)])) }
      : {}),
  } as GeneratedDeviceDefinition;
};

const render = (definition: GeneratedDeviceDefinition, chipCase: Case): { samples: number[]; weighted: number[] } => {
  clearGeneratedDevices();
  registerGeneratedDevice(definition);
  const device = createDevice(chipCase.type, { clock: 3_579_545 });
  const members = (device as unknown as { members: Record<string, Record<string, (...args: unknown[]) => unknown>> }).members;
  const chip = members.m_chip!;
  chip.reset!();
  for (const [address, data] of chipCase.script) {
    chip.write!(0, address);
    chip.write!(1, data);
  }
  const calls = (device as unknown as { bindings: { calls: Record<string, (...args: unknown[]) => unknown> } }).bindings.calls;
  const output = calls.STRUCT_ARRAY_OF!(1, `ymfm_output__${chipCase.outputs}`) as { data: number[] }[];
  const samples: number[] = [];
  const weighted = new Array<number>(chipCase.outputs).fill(0);
  for (let index = 0; index < 4096; index++) {
    chip.generate!(output, 1);
    for (let channel = 0; channel < chipCase.outputs; channel++) {
      weighted[channel]! += output[0]!.data[channel]! * ((index % 7) + 1);
      if (index >= 2000 && index < 2008) samples.push(output[0]!.data[channel]!);
    }
  }
  clearGeneratedDevices();
  return { samples, weighted };
};

for (const chipCase of CASES) {
  const definition = compileMameDevice(mameSrc, hardware.get(chipCase.type)!);
  assert.equal(definition.summary.diagnostics, 0, `${chipCase.type} and every ymfm class it holds lower`);
  assert.ok(definition.methods.some(method => method.name === 'sound_stream_update'), `${chipCase.type} renders its own stream`);
  const interpreted = render(definition, chipCase);
  assert.deepEqual(interpreted, { samples: chipCase.samples, weighted: chipCase.weighted }, `interpreted ${chipCase.type} is native ymfm`);
  assert.deepEqual(render(emit(definition), chipCase), interpreted, `emitted ${chipCase.type} code matches the interpreter`);
}

console.log(`ymfm-chips.spec: ${CASES.map(chipCase => chipCase.type).join(', ')} render native ymfm's samples`);
