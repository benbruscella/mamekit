// MAME's input mergers compiled as any other device (#203): the four types
// differ only in the constants each passes to input_merger_device's
// constructor, and the pins a game uses are the in_w/in_set/in_clear
// template instances it names. Run with: node src/mame/input-merger.spec.ts
import assert from 'node:assert/strict';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
} from '../runtime/generated-device.ts';
import { compileMameDevice } from './device-compiler.ts';
import { indexMameHardware } from './hardware.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const definitions = indexMameHardware(mameSrc);
// As the closure collects them: a driver handler's `m_soundnmi->in_w<0>(1)`,
// a map's `FUNC(input_merger_device::in_set<1>)`, and another class's
// instance, which is not the merger's.
const references = [
  'in_w<0>',
  'input_merger_device::in_set<0>', 'input_merger_device::in_clear<0>',
  'input_merger_device::in_set<1>', 'input_merger_device::in_clear<1>',
  'williams_state::in_w<7>',
];
const compile = (type: string) =>
  compileMameDevice(mameSrc, definitions.get(type)!, type, new Set(), { references });

clearGeneratedDevices();
const anyHigh = compile('INPUT_MERGER_ANY_HIGH');
const allHigh = compile('INPUT_MERGER_ALL_HIGH');
const initial = (device: typeof anyHigh) => Object.fromEntries(device.members
  .filter(member => ['m_initval', 'm_xorval', 'm_active'].includes(member.name))
  .map(member => [member.name, member.initial]));
assert.deepEqual(initial(anyHigh), { m_initval: 0, m_xorval: 0, m_active: 1 });
// `input_merger_device(..., ~u32(0), ~u32(0), 0)`
assert.deepEqual(initial(allHigh), { m_initval: 0xffffffff, m_xorval: 0xffffffff, m_active: 0 });
assert.equal(anyHigh.summary.diagnostics, 0);
assert.equal(allHigh.summary.diagnostics, 0);
assert.ok(anyHigh.methods.some(method => method.name === 'in_w_0'), 'a handler names in_w<0>');
assert.ok(!anyHigh.methods.some(method => method.name === 'in_w_7'), 'another class names in_w<7>');
registerGeneratedDevice(anyHigh);
registerGeneratedDevice(allHigh);

const anyOutput: number[] = [];
const any = createDevice('INPUT_MERGER_ANY_HIGH');
any.on('output_handler', state => anyOutput.push(state));
any.call('in_set_0');
any.call('in_set_1');
any.call('in_clear_0');
any.call('in_clear_1');
assert.deepEqual(anyOutput, [1, 1, 1, 0]);

const allOutput: number[] = [];
const all = createDevice('INPUT_MERGER_ALL_HIGH');
all.on('output_handler', state => allOutput.push(state));
all.call('in_clear_0');
all.call('in_set_0');
assert.deepEqual(allOutput, [0, 1]);

console.log('input-merger.spec: generated mergers combine their pins as MAME does');
