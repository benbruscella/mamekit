// MAME's DISCRETE sound device compiled whole from discrete.cpp and its node
// classes (disc_*.hxx), running a driver's own table: Qix's, lowered from
// qix_a.cpp as data (static-aggregate.ts). Run with: node src/mame/discrete.spec.ts

import assert from 'node:assert/strict';
import ts from 'typescript';
import { compileMameDevice } from './device-compiler.ts';
import { generatedDeviceExecutableSource } from './device-codegen.ts';
import { indexMameHardware } from './hardware.ts';
import { aggregateFunctionReferences, deviceTable } from './static-aggregate.ts';
import { clearGeneratedDevices, createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const hardware = indexMameHardware(mameSrc).get('DISCRETE')!;

// The table, as the machine config hands it over: one block per node, each
// naming its class through `&discrete_node_factory<C>::create`.
const table = deviceTable(mameSrc, 'src/mame/taito/qix_a.cpp', 'qix_discrete', hardware.sourceFile);
assert.deepEqual(table.diagnostics, []);
const blocks = table.value as { node: number; factory: string; custom: unknown }[];
assert.equal(blocks.length, 15, '14 nodes and DISCRETE_SOUND_END');
assert.equal(blocks[0]!.factory, 'discrete_node_factory<discrete_dss_input_data_node>::create');
assert.equal(blocks[2]!.custom, '01/2&', "a transform's expression is its custom data");
assert.deepEqual(blocks[4]!.custom, { type: 1, cDefault: 0, length: 4, c: [22250, 10250, 5850, 3550, 0, 0, 0, 0] },
  'qix_attn_table, RES_K(22)+250 and the rest, by its struct\'s fields');

const references = aggregateFunctionReferences(table.value);
const definition = JSON.parse(JSON.stringify(compileMameDevice(mameSrc, hardware, 'DISCRETE', new Set(), { references })));
assert.equal(definition.summary.diagnostics, 0, 'discrete.cpp and every node class the table names lower whole');
for (const reference of references) {
  const node = /<(\w+)>/.exec(reference)![1]!;
  assert.ok(definition.allocations?.[node], `${node} is compiled`);
  assert.ok(definition.allocations[node].methods.length > 0, `${node} has methods`);
}
// Each node's own step and reset, not its base's: the node methods are
// `void discrete_X_node::step(void)` once DISCRETE_STEP has expanded.
const crfilter = definition.allocations.discrete_dst_crfilter_node;
assert.ok(crfilter.methods.some((method: { name: string }) => method.name === 'step'));
assert.ok(crfilter.members.some((member: { name: string }) => member.name === 'm_vCap'), 'the first member after `private:`');

async function emittedModule<T>(text: string): Promise<T> {
  const js = ts.transpileModule(text, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
  return (await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)).default as T;
}
const emitted = await emittedModule<typeof definition>(generatedDeviceExecutableSource(
  { ...definition, hotMethods: definition.methods.map((method: { name: string }) => method.name) }, 'discrete.json')
  .replace("import deviceData from './discrete.json' with { type: 'json' };", `const deviceData = ${JSON.stringify(definition)};`));

const NODE = (index: number) => 0x40000000 + index * 8;
for (const [label, implementation] of [['IR', definition], ['emitted', emitted]] as const) {
  clearGeneratedDevices();
  registerGeneratedDevice(implementation);
  const device = createDevice('DISCRETE', {
    clock: 0, configure: (configured: { invoke(method: string, ...args: unknown[]): unknown }) => configured.invoke('set_intf', table.value),
  } as never) as unknown as {
    call(method: string, ...args: number[]): number;
    invoke(method: string, ...args: unknown[]): unknown;
    streams(): { samples: () => number; put: (channel: number, index: number, value: number) => number }[];
  };
  const render = (count: number) => {
    const stream = device.streams()[0]!;
    const outputs: number[][] = [[], []];
    stream.samples = () => count;
    stream.put = (channel, index, value) => { outputs[channel]![index] = value; return 0; };
    device.invoke('sound_stream_update', stream);
    return outputs;
  };
  // Full volume both sides (no attenuation resistor selected), then the DAC
  // to 0xff: DISCRETE_INPUTX_DATA(QIX_DAC_DATA, 128, -128*128, 128) holds
  // 255 * 128 - 16384.
  device.call('write', NODE(2), 0x00);
  device.call('write', NODE(1), 0xff);
  const [left, right] = render(16);
  assert.equal(left![0], 16256 / 32768, `${label}: the step reaches the output through the CR filter`);
  assert.deepEqual(left, right, `${label}: both channels at full volume`);
  // DISCRETE_CRFILTER(..., RES_K(1.5), CAP_U(1)) at 48 kHz: each sample keeps
  // exp(-1/(48000 * 1.5e3 * 1e-6)) of the last.
  const decay = Math.exp(-1 / (48000 * 1.5e3 * 1e-6));
  for (let index = 1; index < 16; index++) {
    assert.ok(Math.abs(left![index]! / left![index - 1]! - decay) < 1e-12, `${label}: sample ${index} decays as RC = 1.5 ms`);
  }
  // Attenuation on the left only: QIX_VOL_DATA's high nibble selects the
  // 22k resistor, and the left now carries less than the right.
  device.call('write', NODE(2), 0x10);
  device.call('write', NODE(1), 0x00);
  device.call('write', NODE(1), 0xff);
  const [attenuatedLeft, fullRight] = render(4);
  assert.ok(Math.abs(attenuatedLeft![3]!) < Math.abs(fullRight![3]!), `${label}: the volume nibbles are the two channels`);
}
console.log('discrete.spec: qix_discrete runs compiled from MAME in both executors');
