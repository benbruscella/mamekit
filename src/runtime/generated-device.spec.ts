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
  constants: { MASK: 3 },
  members: [
    { name: 'm_byte', valueType: 'uint8_t', bits: 8, initial: 0 },
    { name: 'm_signed', valueType: 'int8_t', bits: 8, signed: true, initial: 0 },
    { name: 'm_count', valueType: 'int', bits: 32, initial: 0 },
    { name: 'm_reschedule_count', valueType: 'int', bits: 32, initial: 0 },
  ],
  callbacks: [{ signal: 'q_out_cb', member: 'm_q', slots: 2, initial: 9 }],
  timers: [
    { member: 'm_timer', callback: 'timer_tick' },
    { member: 'm_reschedule_timer', callback: 'reschedule_tick' },
  ],
  methods: [
    method(
      'device_start',
      '',
      'm_timer = timer_alloc(); m_timer.adjust(0.1, 3, 0.1);' +
      'm_reschedule_timer = timer_alloc(); m_reschedule_timer.adjust(0.05);',
    ),
    method('device_reset', '', 'm_byte = 7;'),
    method('write', 'uint8_t data', 'm_byte = data; m_q[1](data); return external(data);'),
    method('slot0_unset', '', 'return m_q[0].isunset();'),
    method('slot1_unset', '', 'return m_q[1].isunset();'),
    method('timer_tick', 'int param', 'm_count += param;'),
    method(
      'reschedule_tick',
      'int param',
      'm_reschedule_count += 1;' +
      'if (m_reschedule_count < 3) m_reschedule_timer.adjust(0.05);',
    ),
    method('fast', 'uint8_t data', 'return 0;'),
    method('timer_remaining', '', 'return 0;'),
    method('timer_ticks', '', 'return 0;'),
    method('seconds_from_hz', 'double frequency', 'return attotime::from_hz(frequency);'),
    method(
      'seconds_from_ticks',
      'uint64_t ticks, uint32_t frequency',
      'return attotime::from_ticks(ticks, frequency);',
    ),
  ],
  compiledMethods: {
    fast: (runtime, data) => {
      runtime.members.m_byte = Number(data);
      return runtime.invoke('external', Number(data) + 1);
    },
    timer_remaining: runtime =>
      Number((runtime.members.m_timer as { remaining(): number }).remaining()),
    timer_ticks: runtime =>
      (runtime.members.m_timer as { remaining(): { as_ticks(clock: number): number } })
        .remaining().as_ticks(2_000),
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
assert.equal(device.call('seconds_from_hz', 2_000), 0.0005);
assert.equal(device.call('seconds_from_ticks', 3, 12_000), 0.00025);
assert.equal(device.constant('fixture::MASK'), device.constant('MASK'));
assert.equal(device.arity('write'), 1);
assert.deepEqual(device.signalNames(), ['q_out_cb']);

const signals: number[] = [];
assert.equal(device.call('slot0_unset'), 1);
assert.equal(device.call('slot1_unset'), 1);
device.on('q_out_cb', value => signals.push(value), 1);
assert.equal(device.call('slot0_unset'), 1);
assert.equal(device.call('slot1_unset'), 0);
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
assert.equal(device.get('m_reschedule_count'), 1);
assert.ok(
  device.call('timer_remaining') > 0 &&
  device.call('timer_remaining') < 0.011,
  'generated timer remaining() must expose the live source-compatible delay',
);
assert.ok(device.call('timer_ticks') >= 19 && device.call('timer_ticks') <= 20,
  'generated timer remaining() must retain attotime::as_ticks');
device.tick(0.02);
assert.equal(device.get('m_count'), 3);
assert.equal(device.get('m_reschedule_count'), 2);
device.tick(0.041);
assert.equal(device.get('m_reschedule_count'), 3,
  'a one-shot timer re-armed by its callback must keep its new schedule');
device.tick(0.2);
assert.equal(device.get('m_count'), 9);

assert.throws(() => device.call('missing'), /no generated method/);
assert.throws(() => device.on('missing', () => {}), /no callback signal/);
assert.throws(() => device.on('q_out_cb', () => {}, 2), /has no slot 2/);

// A MAME devcb is one .set() plus any number of .append()s and the whole chain
// contributes: reads OR together. Overwriting per listener kept only the last,
// which collapsed the Namco 53xx K port — three shifted LS259 bits appended to
// one callback — from (q7<<3)|(q6<<2)|(q5<<1) = 14 down to a single bit, so the
// MCU selected the wrong mode and answered DIP reads with garbage.
{
  const chained = createDevice('FIXTURE', { clock: 1 });
  chained.on('q_out_cb', () => 8, 0);
  chained.on('q_out_cb', () => 4, 0);
  chained.on('q_out_cb', () => 2, 0);
  assert.equal(
    (chained as unknown as { members: Record<string, (() => number)[]> }).members.m_q![0]!(),
    14,
    'an appended devcb read chain must OR, not overwrite',
  );
  // An unbound chain still reports the source's initial value, which is how
  // MAME's devcb::isunset() paths keep reading high.
  const unbound = createDevice('FIXTURE', { clock: 1 });
  assert.equal(
    (unbound as unknown as { members: Record<string, (() => number)[]> }).members.m_q![0]!(),
    9,
    'an unbound devcb must return its declared initial',
  );
}

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
    method('peek', '', 'return *m_live;'),
    method('poke', 'uint8_t value', '*m_live = value;'),
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
assert.equal(memoryDevice.call('peek'), 9);
memoryDevice.call('poke', 0x5a);
assert.equal(share[0], 0x5a, 'shared-pointer dereference assignment must write its first byte');
memoryDevice.invoke('copy');
const buffered = memoryDevice.invoke('buffer') as { source?: Uint8Array };
assert.deepEqual([...(buffered.source ?? new Uint8Array(0))], [0x5a, 8, 7, 6],
  'the default srclength argument must copy the whole buffer');
assert.throws(
  () => createDevice('MEMORY_TEST', { tag: 'missing', shares: {} }),
  /memory share "missing" is not available/,
);

// Generated slots instantiate a source-selected child definition and expose it
// through the card member used by the parent's compiled MAME methods.
registerGeneratedDevice({
  type: 'SLOT_TEST',
  constants: {},
  members: [],
  callbacks: [],
  methods: [
    method('device_start', '', 'm_card = get_card_device();'),
    method('read', '', 'return m_card.read();'),
  ],
  slot: {
    member: 'm_card',
    selector: 'fixture.option',
    options: {
      card: {
        type: 'CARD_TEST',
        constants: {},
        members: [{
          name: 'm_input',
          valueType: 'required_ioport',
          finder: { kind: 'input', tag: 'BUTTONS' },
        }],
        callbacks: [],
        methods: [method('read', '', 'return m_input.read();')],
        summary: { diagnostics: 0 },
      },
    },
  },
  start: 'device_start',
  summary: { diagnostics: 0 },
});
const slotDevice = createDevice('SLOT_TEST', {
  tag: 'port1',
  selectors: { 'fixture.option': 'card' },
  inputs: { read: tag => tag === 'port1:BUTTONS' ? 0x5a : 0 },
});
assert.equal(slotDevice.call('read'), 0x5a);

registerGeneratedDevice({
  type: 'OVERLOAD_TEST',
  constants: {},
  members: [{ name: 'm_ready', valueType: 'uint8_t', bits: 8, initial: 1 }],
  callbacks: [],
  methods: [
    method('select', 'int left, int right', 'return left + right;'),
    method('select', '', 'return 7;'),
    method('override_me', 'int value', 'return value + 1;'),
    method('override_me', 'int value', 'return value + 2;'),
    method('resync', 'int param', 'm_ready = 1;'),
    method(
      'write',
      '',
      'm_ready = 0; ' +
      'machine().scheduler().synchronize(timer_expired_delegate(FUNC(fixture::resync), this));',
    ),
  ],
  summary: { diagnostics: 0 },
});
const overloaded = createDevice('OVERLOAD_TEST');
assert.equal(overloaded.call('select'), 7);
assert.equal(overloaded.call('select', 3, 4), 7);
assert.equal(overloaded.call('override_me', 3), 5, 'the most-derived exact signature wins');
overloaded.call('write');
assert.equal(overloaded.get('m_ready'), 1, 'scheduler synchronization invokes its generated delegate');

clearGeneratedDevices();
console.log('generated-device.spec: registration, IR, slots, overloads, callbacks, timers, memory shares and compiled methods passed');
