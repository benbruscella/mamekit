import assert from 'node:assert/strict';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice, type GeneratedDeviceDefinition } from './device-compiler.ts';
import { generatedDeviceMethodsSource } from './device-codegen.ts';
import { slotCardDeviceRoms } from '../gen/lower-roms.ts';
import { clearGeneratedDevices, createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';
import { captureState, restoreState } from '../runtime/machine-state.ts';

// The Konami VRC7's DS1001 is a MAME wrapper over ymfm's OPLL, which lives in
// 3rdparty/ymfm: the device holds a `ymfm::ds1001` (opll_base), which holds an
// `fm_engine_base<opll_registers>`, which builds nine `fm_channel`s and
// eighteen `fm_operator`s of the same instance with std::make_unique (#188).
const mameSrc = process.env.MAME_SRC ?? '../mame';
const hardware = indexMameHardware(mameSrc);
const ds1001 = compileMameDevice(mameSrc, hardware.get('DS1001')!);
assert.equal(ds1001.summary.diagnostics, 0, 'the DS1001 and every ymfm class it holds lower');
assert.ok(ds1001.sourceFiles.includes('3rdparty/ymfm/src/ymfm_opl.cpp'), 'ymfm is reached through the 3rdparty include root');
const chip = ds1001.allocations?.ds1001;
assert.deepEqual(chip?.hierarchy, ['opll_base', 'ds1001']);
assert.equal(ds1001.members.find(member => member.name === 'm_chip')?.object, 'ds1001');
const engine = chip?.allocations?.fm_engine_base__opll_registers;
assert.deepEqual(engine?.hierarchy, ['ymfm_engine_callbacks', 'fm_engine_base']);
assert.deepEqual(Object.keys(engine?.allocations ?? {}).sort(),
  ['fm_channel__opll_registers', 'fm_operator__opll_registers', 'opll_registers']);
// A class's own constants shadow the flat table, and a template's are its
// argument's: OPLL's register file is 0x40 bytes (an OPL3 header says 0x100),
// and its `bool` constants are true.
const registers = engine!.allocations!.opll_registers!;
assert.equal(registers.constants.REGISTERS, 0x40);
assert.equal(registers.constants.MODULATOR_DELAY, 1);
assert.equal(engine!.constants['opll_registers::OPERATORS'], 18);
// ymfm's four OPLL variants each define an `s_default_instruments` table; the
// DS1001's is its own.
assert.deepEqual(chip!.members.find(member => member.name === 's_default_instruments')?.values?.slice(0, 8),
  [0x03, 0x21, 0x05, 0x06, 0xc8, 0x81, 0x42, 0x27]);

// Rendered through the device's own classes, it is ymfm: these are the
// samples native ymfm gives for the same writes (3rdparty/ymfm built with
// clang, `ds1001 chip(intf); chip.reset();` then generate() one at a time).
const NATIVE_SAMPLES_1000_TO_1015 = [
  -1678, -1820, -1777, -1806, -1834, -1664, -1507, -1464, -1237, -1024, -867, -668, -426, -312, -142, 71,
];
const NATIVE_WEIGHTED_SUM = -2111907;
const render = (definition: GeneratedDeviceDefinition): { samples: number[]; weighted: number } => {
  clearGeneratedDevices();
  registerGeneratedDevice(definition);
  const device = createDevice('DS1001', { clock: 3_579_545 });
  const members = (device as unknown as { members: Record<string, Record<string, (...args: unknown[]) => unknown>> }).members;
  const opll = members.m_chip!;
  // device_start loads the patches from the DS1001's ROM, which a spec does
  // not have; ymfm's own default set stands in.
  opll.set_instrument_data!(opll.s_default_instruments);
  opll.reset!();
  const write = (address: number, data: number) => { opll.write!(0, address); opll.write!(1, data); };
  // Instrument 1 on channel 0, then a custom instrument on channel 1.
  for (const [address, data] of [[0x30, 0x13], [0x10, 0xab], [0x20, 0x18], [0x00, 0x21], [0x01, 0x21], [0x02, 0x1a],
    [0x03, 0x07], [0x04, 0xf0], [0x05, 0xf0], [0x06, 0x13], [0x07, 0x23], [0x31, 0x00], [0x11, 0x55], [0x21, 0x1a]]) {
    write(address!, data!);
  }
  const calls = (device as unknown as { bindings: { calls: Record<string, (...args: unknown[]) => unknown> } }).bindings.calls;
  const output = calls.STRUCT_ARRAY_OF!(1, 'ymfm_output__2') as { data: number[] }[];
  const samples: number[] = [];
  let weighted = 0;
  for (let index = 0; index < 2048; index++) {
    opll.generate!(output, 1);
    weighted += output[0]!.data[0]! * ((index % 7) + 1);
    if (index >= 1000 && index < 1016) samples.push(output[0]!.data[0]!);
  }
  clearGeneratedDevices();
  return { samples, weighted };
};
const interpreted = render(ds1001);
assert.deepEqual(interpreted.samples, NATIVE_SAMPLES_1000_TO_1015, 'interpreted OPLL output is native ymfm\'s');
assert.equal(interpreted.weighted, NATIVE_WEIGHTED_SUM);

// Emitted code renders the same samples: every class the device holds is
// compiled, as the generated module compiles it.
const emit = (definition: GeneratedDeviceDefinition, every = false): GeneratedDeviceDefinition => {
  const emitted = generatedDeviceMethodsSource(every
    ? { ...definition, hotMethods: definition.methods.map(method => method.name) }
    : definition);
  return {
    ...definition,
    compiledMethods: new Function(`return ${emitted.source}`)(),
    ...(emitted.links.length ? { compiledMethodLinks: emitted.links } : {}),
    ...(definition.allocations
      ? { allocations: Object.fromEntries(Object.entries(definition.allocations).map(([name, allocated]) => [name, emit(allocated, true)])) }
      : {}),
  } as GeneratedDeviceDefinition;
};
const compiled = render(emit(ds1001));
assert.deepEqual(compiled, interpreted, 'emitted OPLL code matches the interpreter');

// A save state restored into a DS1001 that has just started -- the shell
// resumes a machine before its first frame -- renders as the saved one does.
// The local output buffer `update_internal` renders into is storage built with
// the device and kept out of the save; restored as a plain copy, it lost the
// struct methods `output->clear()` needs.
{
  const emitted = emit(ds1001);
  const buffer = emitted.members.find(member => member.name === '__local_update_internal_output');
  assert.equal(buffer?.scratch, true, 'the local output buffer is scratch storage');
  assert.equal(buffer?.arrayLength, 256, 'its constexpr length is folded');
  clearGeneratedDevices();
  registerGeneratedDevice(emitted);
  const patches = chip!.members.find(member => member.name === 's_default_instruments')!.values as number[];
  const regions = { internal: Uint8Array.from(patches) };
  type Streaming = { invoke(name: string, ...args: unknown[]): unknown };
  const render = (device: Streaming, samples: number): number[] => {
    const out = new Array<number>(samples).fill(0);
    device.invoke('sound_stream_update', {
      samples: () => samples, output_count: () => 1,
      put_int: (_channel: number, index: number, value: number, max: number) => { out[index] = value / max; return 0; },
    });
    return out;
  };
  const live = createDevice('DS1001', { clock: 3_579_545, regions }) as unknown as Streaming;
  for (const [address, data] of [[0x30, 0x13], [0x10, 0xab], [0x20, 0x18]]) {
    live.invoke('address_w', address);
    live.invoke('data_w', data);
  }
  const saved = captureState(live);
  assert.ok(!JSON.stringify(saved).includes('__local_'), 'the scratch buffer is not in the save');
  const expected = render(live, 600);
  assert.ok(expected.some(sample => sample !== 0), 'the live chip is audible after its key-on');
  const fresh = createDevice('DS1001', { clock: 3_579_545, regions }) as unknown as Streaming;
  assert.deepEqual(restoreState(fresh, saved), []);
  assert.deepEqual(render(fresh, 600), expected, 'a fresh DS1001 restored before it ever rendered renders the same samples');
  clearGeneratedDevices();
}

// The VRC7 card builds the DS1001 as a child at MAME's clock and route, and
// the card's ROM is the machine's only when a VRC7 is in the slot.
const vrc7 = compileMameDevice(mameSrc, hardware.get('NES_VRC7')!);
assert.equal(vrc7.summary.diagnostics, 0);
assert.deepEqual(vrc7.children?.map(child => [child.member, child.type, child.routes?.[0]]),
  [['m_vrc7snd', 'DS1001', { output: 0, target: 'addon', gain: 1 }]]);
assert.deepEqual(slotCardDeviceRoms(mameSrc, 'nes_slot', [['vrc7', 'NES_VRC7'], ['nrom', 'NES_NROM']]), [{
  region: 'nes_slot:vrc7:vrc7snd:internal',
  size: 0x90,
  romSet: 'ds1001',
  cards: ['vrc7'],
  loads: [{ file: 'ds1001_instruments.bin', offset: 0, size: 0x90, crc: '9d699efc' }],
}]);

console.log('ymfm-opll.spec: the DS1001 compiles from ymfm and renders native ymfm samples, interpreted and emitted');
