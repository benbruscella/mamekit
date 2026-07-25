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

// A required_shared_ptr member binds a board memory share (DEVICE_SELF is the
// device's own tag), a std::vector member is device-owned, and C++ default
// arguments apply when a caller omits them.
registerGeneratedDevice({
  type: 'MEMORY_TEST',
  constants: {},
  members: [
    {
      name: 'm_live',
      valueType: 'required_shared_ptr<uint8_t>',
      memory: { kind: 'shared', elementBytes: 1, share: 'self' },
    },
    {
      name: 'm_buffered',
      valueType: 'std::vector<uint8_t>',
      memory: { kind: 'owned', elementBytes: 1 },
    },
  ],
  callbacks: [],
  methods: [
    method('bytes', '', 'return m_live.bytes();'),
    method('device_start', '', 'm_buffered.resize(bytes());'),
    method('buffer', '', 'return &m_buffered[0];'),
    method(
      'copy',
      'uint32_t srcoffset = 0, uint32_t srclength = 0x7fffffff',
      'memcpy(&m_buffered[0], m_live + srcoffset,' +
      ' (std::min<size_t>)(srclength, bytes() - srcoffset) * sizeof(uint8_t));',
    ),
  ],
  start: 'device_start',
  summary: { diagnostics: 0 },
});
const share = Uint8Array.from([9, 8, 7, 6]);
const memoryDevice = createDevice('MEMORY_TEST', { tag: 'spriteram', shares: { spriteram: share } });
assert.equal(memoryDevice.call('bytes'), 4);
memoryDevice.invoke('copy');
const buffered = memoryDevice.invoke('buffer') as { source?: Uint8Array };
assert.deepEqual([...(buffered.source ?? new Uint8Array(0))], [9, 8, 7, 6],
  'the default srclength argument must copy the whole buffer');
assert.throws(
  () => createDevice('MEMORY_TEST', { tag: 'missing', shares: {} }),
  /memory share "missing" is not available/,
);

clearGeneratedDevices();
console.log('generated-device.spec: registration, IR, callbacks, timers, memory shares and compiled methods passed');
