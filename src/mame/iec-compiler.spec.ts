import assert from 'node:assert/strict';
import ts from 'typescript';
import { extractC64 } from '../hardware/c64/extract.ts';
import { indexMameHardware } from './hardware.ts';
import { generatedDeviceExecutableSource } from './device-codegen.ts';
import { createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';
import { parseMameConstructors, parseMameSource } from './ast.ts';

const parsed = parseMameSource('nested.h', `class bus : public device_t {
  class entry { public: entry *next() const { return m_next; } entry *m_next; };
  int m_line[5];
};`);
assert.deepEqual(parsed.classes.map(value => value.name), ['bus', 'bus::entry']);
assert.equal(parsed.functions.find(value => value.name === 'next')?.className, 'bus::entry');
const constructors = parseMameConstructors('nested.cpp', `bus::entry::entry(device_t *target) : m_next(nullptr), m_device{target} { m_ready = 1; }`);
assert.equal(constructors[0].className, 'bus::entry');
assert.deepEqual(constructors[0].initializers, [
  { name: 'm_next', args: ['nullptr'] }, { name: 'm_device', args: ['target'] },
]);

const source = process.env.MAME_SRC ?? '../mame';
const extraction = extractC64({ mameSource: source, entries: [
  { type: 'CBM_IEC', definition: indexMameHardware(source).get('CBM_IEC'), methods: [] },
] })!;
assert.ok(extraction);
const definition = JSON.parse(extraction.artifacts.find(value => value.path.endsWith('.json'))!.contents);
assert.equal(definition.summary.diagnostics, 0);
assert.ok(!definition.members.some((value: { name: string }) => value.name === 'm_next'), 'nested entry fields do not belong to the bus');
assert.equal(definition.allocations.daisy_entry.summary.diagnostics, 0);
const js = ts.transpileModule(generatedDeviceExecutableSource(definition, 'iec.json')
  .replace("import deviceData from './iec.json' with { type: 'json' };", `const deviceData = ${JSON.stringify(definition)};`), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const emitted = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
for (const implementation of [definition, emitted.default]) {
  registerGeneratedDevice(implementation);
  const bus = createDevice('CBM_IEC', { tag: 'iec_bus' });
  for (const signal of ['srq', 'atn', 'clk', 'data', 'reset']) {
    assert.equal(bus.call(`${signal}_r`), 1, `${signal} initializes high from the source constructor`);
    bus.call(`host_${signal}_w`, 0);
    assert.equal(bus.call(`${signal}_r`), 0);
    bus.call(`host_${signal}_w`, 1);
    assert.equal(bus.call(`${signal}_r`), 1);
  }
  const transitions: number[] = [];
  const drive: Record<string, unknown> = { tag: () => 'drive8', cbm_iec_atn: (state: number) => transitions.push(state) };
  drive.interface = (type: string) => type === 'device_cbm_iec_interface' ? drive : 0;
  const other: Record<string, unknown> = { tag: () => 'drive9' };
  other.interface = (type: string) => type === 'device_cbm_iec_interface' ? other : 0;
  bus.invoke('add_device', { address: 8 }, drive);
  bus.invoke('add_device', { address: 9 }, other);
  assert.ok(drive.m_bus);
  assert.deepEqual(drive.m_slot, { address: 8 });
  bus.call('host_atn_w', 0);
  bus.call('host_atn_w', 0);
  bus.call('host_atn_w', 1);
  assert.deepEqual(transitions, [0, 1], 'source notifies peripherals only on transitions');
  bus.invoke('data_w', drive, 0);
  assert.equal(bus.call('data_r'), 0);
  bus.invoke('data_w', other, 0);
  bus.invoke('data_w', drive, 1);
  assert.equal(bus.call('data_r'), 0, 'a second attached device can hold the bus low');
  bus.invoke('data_w', other, 1);
  assert.equal(bus.call('data_r'), 1);
}
console.log('iec-compiler.spec: source constructors, attachment, line transitions and wired bus reads passed in IR and generated code');
