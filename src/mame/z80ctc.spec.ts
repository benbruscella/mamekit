// The Z80 CTC compiled from MAME's z80ctc.cpp as it stands, and a generated
// Z80 taking its IM2 vectors from it through the compiled daisy chain
// (z80daisy.cpp). Run with: node src/mame/z80ctc.spec.ts

import assert from 'node:assert/strict';
import ts from 'typescript';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice } from './device-compiler.ts';
import { generatedDeviceExecutableSource } from './device-codegen.ts';
import { compileMameZ80 } from './cpu-compiler.ts';
import { generatedCpuExecutableSource } from './cpu-codegen.ts';
import { createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';
import { clearGeneratedCpus, createCpu, registerGeneratedCpu, type CpuBus } from '../runtime/generated-cpu.ts';

const source = process.env.MAME_SRC ?? '../mame';
const CLOCK = 5_000_000;

const definition = JSON.parse(JSON.stringify(
  compileMameDevice(source, indexMameHardware(source).get('Z80CTC')!, 'Z80CTC'),
));
assert.equal(definition.summary.diagnostics, 0, 'z80ctc.cpp lowers whole');
const [channels] = definition.children;
assert.equal(channels.definition.summary.diagnostics, 0, 'the channel device lowers whole');
// required_device_array<z80ctc_channel_device, 4> m_channel(*this, "ch%u", 0U)
assert.deepEqual(channels.tags, ['ch0', 'ch1', 'ch2', 'ch3']);
// device_add_mconfig: `m_channel[ch]->m_index = ch`
assert.deepEqual(channels.configured, [{ m_index: 0 }, { m_index: 1 }, { m_index: 2 }, { m_index: 3 }]);
// Z80CTC_CHANNEL(config, m_channel[ch]) gives no clock: the channel's is 0,
// so counter mode has no period of its own.
assert.equal(channels.clock, 0);
assert.equal(channels.definition.members.find((member: { name: string }) => member.name === 'm_device').finder.tag, '^');
assert.equal(definition.constants.Z80_DAISY_INT, 1);
assert.equal(definition.constants.Z80_DAISY_IEO, 2);

async function emittedModule<T>(text: string): Promise<T> {
  const js = ts.transpileModule(text, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
  return (await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)).default as T;
}
const emitted = await emittedModule<typeof definition>(generatedDeviceExecutableSource(definition, 'z80ctc.json')
  .replace("import deviceData from './z80ctc.json' with { type: 'json' };", `const deviceData = ${JSON.stringify(definition)};`));

for (const [label, implementation] of [['IR', definition], ['emitted', emitted]] as const) {
  registerGeneratedDevice(implementation);
  let now = 0;
  const ctc = createDevice('Z80CTC', { tag: 'ctc', clock: CLOCK, calls: { 'machine().time': () => now } });
  const self = ctc.instance!() as Record<string, any>;
  const line: number[] = [];
  const zc: number[] = [];
  ctc.on('intr_callback', state => { line.push(state); });
  ctc.on('zc_callback', state => { zc.push(state); }, 0);
  const advance = (seconds: number) => { now += seconds; ctc.tick!(seconds); };

  assert.deepEqual(self.m_channel.map((channel: any) => channel.m_index), [0, 1, 2, 3], `${label}: channels numbered`);
  assert.deepEqual(self.m_channel.map((channel: any) => channel.m_mode), [2, 2, 2, 2], `${label}: reset leaves RESET_ACTIVE`);

  ctc.call('write', 0, 0x10); // vector (channel 0, bit 0 clear)
  assert.equal(self.m_vector, 0x10, `${label}: channel 0 writes the CTC's vector`);
  ctc.call('write', 0, 0x85); // interrupt, timer, prescaler 16, constant follows
  ctc.call('write', 0, 16);
  const period = 16 * 16 / CLOCK;
  assert.equal(ctc.call('read', 0), 17, `${label}: a running timer reads remaining/prescale + 1`);
  advance(period * 0.5);
  assert.equal(ctc.call('read', 0), 9, `${label}: half way down`);
  assert.equal(ctc.call('z80daisy_irq_state'), 0);
  advance(period * 0.5);
  assert.equal(ctc.call('z80daisy_irq_state'), 1, `${label}: zero count requests an interrupt`);
  assert.equal(line.at(-1), 1, `${label}: and asserts INT`);
  assert.deepEqual(zc.slice(0, 1), [1], `${label}: ZC/TO0 pulses high`);
  advance(1 / CLOCK);
  assert.deepEqual(zc.slice(0, 2), [1, 0], `${label}: and drops a clock later`);

  assert.equal(ctc.call('z80daisy_irq_ack'), 0x10, `${label}: channel 0's vector`);
  assert.equal(ctc.call('z80daisy_irq_state'), 2, `${label}: acknowledged, IEO blocks lower priorities`);
  assert.equal(line.at(-1), 0, `${label}: INT released at acknowledge`);
  ctc.call('z80daisy_decode', 0xed);
  ctc.call('z80daisy_decode', 0x4d);
  assert.equal(ctc.call('z80daisy_irq_state'), 0, `${label}: RETI clears IEO`);

  // Counter mode on channel 2: interrupt, counter, rising edge, constant 3.
  ctc.call('write', 2, 0xd5);
  ctc.call('write', 2, 3);
  for (let pulse = 0; pulse < 2; pulse++) { ctc.call('trg2', 1); ctc.call('trg2', 0); }
  assert.equal(self.m_channel[2].m_down, 1, `${label}: each rising edge counts down`);
  ctc.call('write', 0, 0x03); // channel 0: software reset, no interrupt
  ctc.call('trg2', 1);
  assert.equal(self.m_channel[2].m_down, 3, `${label}: zero reloads the constant`);
  assert.equal(ctc.call('z80daisy_irq_ack'), 0x14, `${label}: channel 2's vector is vector + 4`);
}

// A generated Z80 in IM 2 with the CTC on its daisy chain: the vector comes
// from the CTC's z80daisy_irq_ack, and RETI reaches its z80daisy_decode.
clearGeneratedCpus();
registerGeneratedCpu(await emittedModule(generatedCpuExecutableSource(compileMameZ80(source))));
registerGeneratedDevice(emitted);
const memory = new Uint8Array(0x10000);
memory.set([
  0x31, 0x00, 0xff, // LD SP,$FF00
  0x3e, 0x12, 0xed, 0x47, // LD A,$12 ; LD I,A
  0xed, 0x5e, // IM 2
  0xfb, // EI
  0x18, 0xfe, // JR $
]);
memory.set([0x21, 0x00, 0x80, 0x34, 0xfb, 0xed, 0x4d], 0x0100); // LD HL,$8000 ; INC (HL) ; EI ; RETI
memory[0x1214] = 0x00; // channel 2's entry: vector $10 + 2*2
memory[0x1215] = 0x01;
// A vector read off the idle bus ($FF) would land here instead.
memory[0x12ff] = 0x00;
memory[0x1300] = 0x02;
memory.set([0x21, 0x01, 0x80, 0x34, 0xfb, 0xed, 0x4d], 0x0200); // LD HL,$8001 ; INC (HL) ; EI ; RETI
const bus: CpuBus = {
  read: address => memory[address & 0xffff]!,
  write: (address, data) => { memory[address & 0xffff] = data & 0xff; },
  in: () => 0xff,
  out: () => {},
};
const cpu = createCpu('Z80', bus);
let now = 0;
const ctc = createDevice('Z80CTC', { tag: 'ctc', clock: CLOCK, calls: { 'machine().time': () => now } });
ctc.on('intr_callback', state => cpu.setIrqLine(state !== 0));
cpu.set('m_chain', ctc.instance!() as unknown as number);
ctc.call('write', 0, 0x10);
ctc.call('write', 2, 0x85);
ctc.call('write', 2, 10); // every 160 cycles
let cycles = 0;
while (cycles < 160 * 20) {
  const taken = cpu.step();
  cycles += taken;
  now += taken / CLOCK;
  ctc.tick!(taken / CLOCK);
}
assert.ok(memory[0x8000]! >= 18 && memory[0x8000]! <= 20, `every channel 2 interrupt ran its IM 2 handler (${memory[0x8000]})`);
assert.equal(memory[0x8001], 0, 'no vector came off the idle bus');

console.log('z80ctc.spec: the CTC as MAME compiles it (IR and emitted), and IM 2 vectors through the daisy chain, passed');
