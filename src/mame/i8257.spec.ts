// The Intel 8257 compiled from MAME's i8257.cpp as it stands: its four
// channels, and the scheduler calls its execute_run is built on. It waits in
// suspend_until_trigger, a trigger releases it from the next round, and
// set_hreq's abort_timeslice ends its slice where it stopped.
// Run with: node src/mame/i8257.spec.ts

import assert from 'node:assert/strict';
import ts from 'typescript';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice } from './device-compiler.ts';
import { generatedDeviceExecutableSource } from './device-codegen.ts';
import { createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

const source = process.env.MAME_SRC ?? '../mame';

const definition = JSON.parse(JSON.stringify(
  compileMameDevice(source, indexMameHardware(source).get('I8257')!, 'I8257'),
));
assert.equal(definition.summary.diagnostics, 0, 'i8257.cpp lowers whole');
// `struct { ... } m_channel[4];` is four structs, and its fields are theirs.
const channel = definition.members.find((member: { name: string }) => member.name === 'm_channel');
assert.equal(channel.arrayLength, 4, 'm_channel is an array of four');
assert.deepEqual(channel.fields.map((field: { name: string }) => field.name), ['m_address', 'm_count', 'm_mode']);
assert.ok(!definition.members.some((member: { name: string }) => member.name === 'm_address'),
  'a channel field is not a member of the device');

async function emittedModule<T>(text: string): Promise<T> {
  const js = ts.transpileModule(text, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
  return (await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)).default as T;
}
const emitted = await emittedModule<typeof definition>(generatedDeviceExecutableSource(definition, 'i8257.json')
  .replace("import deviceData from './i8257.json' with { type: 'json' };", `const deviceData = ${JSON.stringify(definition)};`));

for (const [label, implementation] of [['IR', definition], ['emitted', emitted]] as const) {
  registerGeneratedDevice(implementation);
  const dma = createDevice('I8257', { tag: 'dma8257', clock: 3_072_000 });
  const memory = new Uint8Array(0x10000);
  for (let index = 0; index < 4; index++) memory[0x6900 + index] = 0x10 + index;
  const hrq: number[] = [];
  const written: number[] = [];
  dma.on('out_hrq_cb', state => { hrq.push(state); });
  dma.on('in_memr_cb', address => memory[address & 0xffff]!);
  dma.on('out_iow_cb', (_address, data) => { written.push(data & 0xff); }, 0);
  // One scheduler round: suspensions asked for in the last one apply, what
  // the CPU does happens, then the 8257 runs its slice.
  const round = (cycles: number, cpu?: () => void): number => {
    dma.applySuspendChanges!();
    cpu?.();
    return dma.runCycles!(cycles);
  };

  dma.reset();
  assert.deepEqual(hrq, [0], `${label}: reset drops HRQ`);
  // Channel 0 reads four bytes from 0x6900 (count 3, mode 2) to its I/O port,
  // and stops at terminal count.
  for (const [offset, data] of [[0, 0x00], [0, 0x69], [1, 0x03], [1, 0x80], [8, 0x41]]) {
    dma.call('write', offset!, data!);
  }
  round(10);
  assert.equal(round(10), 10, `${label}: with no request it waits, charged its slice`);
  assert.equal(round(10, () => dma.call('dreq0_w', 1)), 10, `${label}: a request in a round releases it only from the next`);
  assert.deepEqual(hrq, [0], `${label}: so HRQ is still low`);
  assert.equal(round(10), 2, `${label}: SI then S0, where raising HRQ ends the slice`);
  assert.deepEqual(hrq, [0, 1], `${label}: it asks for the bus`);
  assert.equal(round(10), 10, `${label}: and waits for HLDA`);
  assert.equal(round(10, () => dma.call('hlda_w', 1)), 10, `${label}: HLDA in a round starts the transfer in the next`);
  assert.deepEqual(written, [], `${label}: nothing moved yet`);
  assert.equal(round(10), 10, `${label}: S0, then S1-S4 per byte`);
  assert.deepEqual(written, [0x10, 0x11], `${label}: two bytes in ten cycles`);
  round(20);
  assert.deepEqual(written, [0x10, 0x11, 0x12, 0x13], `${label}: the block`);
  assert.deepEqual(hrq, [0, 1, 0], `${label}: terminal count gives the bus back`);
  assert.equal(dma.call('read', 8) & 0x01, 0x01, `${label}: and channel 0 reports TC`);
}

console.log('i8257: compiled device waits for its trigger and transfers a block');
