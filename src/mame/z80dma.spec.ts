// The Z80 DMA compiled from MAME's z80dma.cpp as it stands: its register
// protocol, its bus request, and a block transfer clocked out by its own
// timer, one byte per read/write pair. Run with: node src/mame/z80dma.spec.ts

import assert from 'node:assert/strict';
import ts from 'typescript';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice } from './device-compiler.ts';
import { generatedDeviceExecutableSource } from './device-codegen.ts';
import { createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

const source = process.env.MAME_SRC ?? '../mame';
const CLOCK = 4_000_000;

const definition = JSON.parse(JSON.stringify(
  compileMameDevice(source, indexMameHardware(source).get('Z80DMA')!, 'Z80DMA'),
));
assert.equal(definition.summary.diagnostics, 0, 'z80dma.cpp lowers whole');
// `#define WR3 REG(3, 0)`, and REG returns `u16 &`: the register is the
// member, not a call answering 0.
const reset = JSON.stringify(definition.methods.find((method: { name: string }) => method.name === 'device_reset').program);
assert.ok(!reset.includes('"name":"WR3"'), 'WR3 is m_regs[REGNUM(3, 0)]');
assert.ok(reset.includes('"name":"m_regs"'));

async function emittedModule<T>(text: string): Promise<T> {
  const js = ts.transpileModule(text, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
  return (await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)).default as T;
}
const emitted = await emittedModule<typeof definition>(generatedDeviceExecutableSource(definition, 'z80dma.json')
  .replace("import deviceData from './z80dma.json' with { type: 'json' };", `const deviceData = ${JSON.stringify(definition)};`));

for (const [label, implementation] of [['IR', definition], ['emitted', emitted]] as const) {
  registerGeneratedDevice(implementation);
  let now = 0;
  const posted: (() => void)[] = [];
  const dma = createDevice('Z80DMA', {
    tag: 'z80dma',
    clock: CLOCK,
    calls: { 'machine().time': () => now },
    schedule: run => { posted.push(run); },
  });
  const memory = new Uint8Array(0x10000);
  const busreq: number[] = [];
  // The Z80 grants the bus at its next instruction; here, at once.
  dma.on('out_busreq_callback', state => {
    busreq.push(state);
    dma.call('bai_w', state);
  });
  dma.on('in_mreq_callback', address => memory[address & 0xffff]!);
  dma.on('out_mreq_callback', (address, data) => { memory[address & 0xffff] = data & 0xff; });
  const clocks = (count: number) => {
    for (let index = 0; index < count; index++) {
      now += 1 / CLOCK;
      dma.tick(1 / CLOCK);
    }
  };
  for (let index = 0; index < 4; index++) memory[0x6900 + index] = 0x10 + index;

  // WR0: port A is the source, transfer; A address and block length follow.
  for (const byte of [0x7d, 0x00, 0x69, 0x03, 0x00]) dma.call('write', byte);
  dma.call('write', 0x14); // WR1: port A memory, incrementing
  dma.call('write', 0x10); // WR2: port B memory, incrementing
  // WR4: continuous mode; port B address follows.
  for (const byte of [0xad, 0x00, 0x70]) dma.call('write', byte);
  dma.call('write', 0x82); // WR5: RDY active low
  dma.call('write', 0xcf); // LOAD
  assert.equal(dma.get('m_addressA'), 0x6900, `${label}: LOAD takes port A's address`);
  assert.equal(dma.get('m_addressB'), 0x7000, `${label}: and port B's`);
  assert.equal(dma.get('m_count'), 3, `${label}: and the block length`);
  // rdy_w goes through synchronize(rdy_write_callback, state).
  dma.call('rdy_w', 1);
  posted.splice(0).forEach(run => run());
  assert.equal(dma.get('m_rdy'), 1, `${label}: RDY reaches the device`);
  assert.equal(dma.get('m_status') & 0x02, 0x02, `${label}: high, with WR5 active low, is not ready`);
  dma.call('rdy_w', 0);
  posted.splice(0).forEach(run => run());

  dma.call('write', 0x87); // ENABLE DMA
  assert.deepEqual(busreq, [], `${label}: nothing happens before the first DMA clock`);
  clocks(2);
  assert.deepEqual(busreq, [1], `${label}: ready, so the DMA asks for the bus`);
  clocks(2);
  assert.equal(memory[0x7000], 0, `${label}: three clocks to read`);
  clocks(8);
  assert.equal(memory[0x7000], 0x10, `${label}: the first byte lands`);
  assert.equal(memory[0x7001], 0, `${label}: one byte per read/write pair`);
  clocks(8 * 3);
  // The block is length + 1 bytes: MAME stops once the counter reaches it.
  assert.deepEqual([...memory.subarray(0x7000, 0x7005)], [0x10, 0x11, 0x12, 0x13, 0], `${label}: the block`);
  clocks(2);
  assert.equal(busreq.at(-1), 0, `${label}: end of block gives the bus back`);
  assert.equal(dma.get('m_status') & 0x20, 0, `${label}: and reports it`);
  const settled = [...memory];
  clocks(64);
  assert.deepEqual([...memory], settled, `${label}: then the DMA is idle`);

  // RR: the status, then the byte counter, through a read mask.
  dma.call('write', 0xbb);
  dma.call('write', 0x03);
  assert.equal(dma.call('read'), dma.get('m_status'), `${label}: RR0 is the status`);
  assert.equal(dma.call('read'), 4, `${label}: RR1 the bytes transferred`);
}

console.log('z80dma: compiled device transfers a block on its own clock');
