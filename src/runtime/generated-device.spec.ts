import assert from 'node:assert/strict';
import { compileMameHandler } from '../mame/handler-ir.ts';
import {
  clearGeneratedDevices,
  createDevice,
  hasGeneratedDevice,
  registerGeneratedDevice,
  type GeneratedDeviceDefinition,
} from './generated-device.ts';

const method = (name: string, parameters: string, source: string) => ({
  name,
  parameters,
  program: compileMameHandler(source),
});
const definition: GeneratedDeviceDefinition = {
  type: 'fixture',
  constants: {},
  members: [
    { name: 'm_byte', valueType: 'uint8_t', bits: 8, initial: 0 },
    { name: 'm_signed', valueType: 'int8_t', bits: 8, signed: true, initial: 0 },
    { name: 'm_count', valueType: 'int', bits: 32, initial: 0 },
  ],
  callbacks: [{ signal: 'q_out_cb', member: 'm_q', slots: 2, initial: 9 }],
  timers: [{ member: 'm_timer', callback: 'timer_tick' }],
  methods: [
    method('device_start', '', 'm_timer = timer_alloc(); m_timer.adjust(0.1, 3, 0.1);'),
    method('device_reset', '', 'm_byte = 7;'),
    method('write', 'uint8_t data', 'm_byte = data; m_q[1](data); return external(data);'),
    method('timer_tick', 'int param', 'm_count += param;'),
    method('fast', 'uint8_t data', 'return 0;'),
  ],
  compiledMethods: {
    fast: (runtime, data) => {
      runtime.members.m_byte = Number(data);
      return runtime.invoke('external', Number(data) + 1);
    },
  },
  start: 'device_start',
  reset: 'device_reset',
  clockDivider: 4,
  dataAddressBits: 8,
  summary: { diagnostics: 0 },
};

clearGeneratedDevices();
assert.equal(hasGeneratedDevice('fixture'), false);
assert.throws(() => createDevice('missing'), /was not registered/);
assert.throws(
  () => registerGeneratedDevice({ ...definition, type: 'broken', summary: { diagnostics: 1 } }),
  /compiler diagnostics/,
);

registerGeneratedDevice(definition);
assert.equal(hasGeneratedDevice('FIXTURE'), true);
const device = createDevice('FiXtUrE', { clock: 2_000 });
assert.equal(device.get('m_byte'), 7);
assert.equal(device.cycleClock(), 500);
assert.equal(device.dataAddressBits(), 8);
assert.equal(device.arity('write'), 1);
assert.deepEqual(device.signalNames(), ['q_out_cb']);

const signals: number[] = [];
device.on('q_out_cb', value => signals.push(value), 1);
device.bindCall('external', value => value + 2);
assert.equal(device.call('write', 0xff), 0x101);
assert.equal(device.get('m_byte'), 0xff);
assert.deepEqual(signals, [0xff]);

device.set('m_signed', 0xff);
assert.equal(device.get('m_signed'), -1);
assert.equal(device.call('fast', 4), 7);
assert.equal(device.get('m_byte'), 4);

device.tick(0.09);
assert.equal(device.get('m_count'), 0);
device.tick(0.02);
assert.equal(device.get('m_count'), 3);
device.tick(0.2);
assert.equal(device.get('m_count'), 9);

assert.throws(() => device.call('missing'), /no generated method/);
assert.throws(() => device.on('missing', () => {}), /no callback signal/);
assert.throws(() => device.on('q_out_cb', () => {}, 2), /has no slot 2/);

clearGeneratedDevices();
console.log('generated-device.spec: registration, IR, callbacks, timers and compiled methods passed');
