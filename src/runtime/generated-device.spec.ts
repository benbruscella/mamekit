import assert from 'node:assert/strict';
import { compileMameHandler } from '../mame/handler-ir.ts';
import {
  clearGeneratedDevices,
  createDevice,
  generatedInstanceFactories,
  hasGeneratedDevice,
  registerGeneratedDevice,
  setGeneratedTimerPreFire,
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
  delegates: { set_callback: 'm_callback' },
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
    method('delegate_test', '', 'int value = 7; m_callback(value); return value;'),
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

device.bindCall('m_callback', value => {
  (value as { set(next: number): void }).set(11);
}, 'int &value');
assert.equal(
  device.call('delegate_test'),
  11,
  'configured device delegates must preserve generated reference arguments',
);

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

// The board clocks its hosted processors up to a timer's expiry before the
// callback runs, as MAME's scheduler does; the hook hears how far past the
// expiry the delivered lump reaches, before the callback changes anything.
const timed = createDevice('fixture', { clock: 2_000 });
const preFired: [number, number, number][] = [];
const outerPreFire = setGeneratedTimerPreFire(overshoot => {
  preFired.push([Math.round(overshoot * 1000), timed.get('m_count'), timed.get('m_reschedule_count')]);
});
timed.tick(0.12);
setGeneratedTimerPreFire(outerPreFire);
assert.deepEqual(preFired, [[20, 0, 0], [70, 3, 0], [20, 3, 1]],
  'every firing is announced with its overshoot before its callback runs');
assert.equal(timed.get('m_reschedule_count'), 2);

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

// BUFFERED_SPRITERAM16 has the same source template as the byte device, but
// both its required share and owned vector are indexed as uint16_t. bytes()
// remains a byte count and memcpy copies that many bytes between word views.
registerGeneratedDevice({
  type: 'MEMORY16_TEST',
  constants: {},
  members: [
    {
      name: 'm_live',
      valueType: 'required_shared_ptr<uint16_t>',
      memory: { kind: 'shared', elementBytes: 2, share: 'self' },
    },
    {
      name: 'm_buffered',
      valueType: 'std::vector<uint16_t>',
      memory: { kind: 'owned', elementBytes: 2 },
    },
  ],
  callbacks: [],
  methods: [
    method('bytes', '', 'return m_live.bytes();'),
    method('length', '', 'return bytes() / sizeof(uint16_t);'),
    method('device_start', '', 'm_buffered.resize(length());'),
    method('buffer', '', 'return &m_buffered[0];'),
    method('peek', '', 'return *m_live;'),
    method('poke', 'uint16_t value', '*m_live = value;'),
    method('copy', '', 'memcpy(&m_buffered[0], m_live, bytes());'),
  ],
  start: 'device_start',
  summary: { diagnostics: 0 },
});
const share16 = Uint8Array.of(0x34, 0x12, 0xcd, 0xab);
const memory16 = createDevice('MEMORY16_TEST', {
  tag: 'spriteram16',
  shares: { spriteram16: share16 },
});
assert.equal(memory16.call('bytes'), 4);
assert.equal(memory16.call('length'), 2);
assert.equal(memory16.call('peek'), 0x1234);
memory16.call('poke', 0x5678);
assert.deepEqual([...share16.slice(0, 2)], [0x78, 0x56]);
memory16.call('copy');
const buffered16 = memory16.invoke('buffer') as { source?: Uint16Array };
assert.deepEqual([...(buffered16.source ?? new Uint16Array(0))], [0x5678, 0xabcd]);

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

registerGeneratedDevice({
  type: 'BITMAP_BOX_TEST', constants: {}, callbacks: [],
  members: [{ name: 'm_bitmap', valueType: 'bitmap_rgb32' }],
  methods: [method('draw', '',
    'm_bitmap.allocate(4, 3); m_bitmap.plot_box(-1, 1, 3, 4, 7); return m_bitmap;')],
  summary: { diagnostics: 0 },
});
const bitmap = createDevice('BITMAP_BOX_TEST').invoke('draw') as { pixels: Uint32Array };
assert.deepEqual([...bitmap.pixels], [0, 0, 0, 0, 7, 7, 0, 0, 7, 7, 0, 0],
  'plot_box must clip on all edges without spilling into adjacent rows');

// copybitmap onto the screen's own pixels, unscaled, is a row copy -- with the
// same clipping to the source, the clip rectangle and the visible window as
// the per-pixel path a scaled screen takes.
registerGeneratedDevice({
  type: 'BITMAP_COPY_TEST', constants: {}, callbacks: [],
  members: [{ name: 'm_bitmap', valueType: 'bitmap_rgb32' }],
  methods: [method('copy', 'bitmap_rgb32 &bitmap, const rectangle &cliprect', `
    m_bitmap.allocate(6, 4);
    for (int y = 0; y < 4; y++)
      for (int x = 0; x < 6; x++)
        m_bitmap.pix(y, x) = y * 16 + x;
    copybitmap(bitmap, m_bitmap, 0, 0, 0, 0, cliprect);
    return 0;`)],
  summary: { diagnostics: 0 },
});
{
  const screen = { pixels: new Uint32Array(4 * 3), width: 4, height: 3, xScale: 1, yScale: 1, scaledXOffset: 1, scaledYOffset: 1 };
  createDevice('BITMAP_COPY_TEST').invoke('copy', { direct: screen }, { min_x: 0, max_x: 4, min_y: 0, max_y: 3 });
  const expected = new Uint32Array(4 * 3);
  for (let y = 1; y <= 3; y++) {
    for (let x = 1; x <= 4; x++) expected[(y - 1) * 4 + (x - 1)] = y * 16 + x;
  }
  assert.deepEqual([...screen.pixels], [...expected],
    'an unscaled copy lands each source row at the visible window\'s offset, clipped');
}

registerGeneratedDevice({
  type: 'REFINED_MEMBER_TEST', constants: {}, callbacks: [],
  members: [
    { name: 'm_channel', valueType: 'channel', fields: [{ name: 'value', bits: 16 }] },
    { name: 'm_channel', valueType: 'channel[]', values: [{ value: 7 }, { value: 9 }] },
  ],
  methods: [method('read', '', 'return this->m_channel[1].value;')], summary: { diagnostics: 0 },
});
assert.equal(createDevice('REFINED_MEMBER_TEST').call('read'), 9,
  'source this pointer must expose the final struct-array declaration');

registerGeneratedDevice({
  type: 'PREPARED_CALL_TEST', constants: {}, callbacks: [], members: [],
  methods: [method('scalar', 'int value', 'return value;'), method('read', 'int value = 7', 'return value;'),
    method('identity', 'object &value', 'return value;')],
  compiledMethods: { scalar: (_runtime, value) => value, read: (_runtime, value) => value,
    identity: (_runtime, value) => value },
  summary: { diagnostics: 0 },
});
const preparedDevice = createDevice('PREPARED_CALL_TEST');
const preparedRead = preparedDevice.prepareCall!('read');
assert.equal(preparedRead(), 7, 'prepared calls retain source default arguments');
assert.equal(preparedRead(0), 0, 'zero is an explicit argument');
const referent = { value: 19 };
assert.equal(preparedDevice.prepareCall!('identity')({
  generatedLValue: true, get: () => referent, set: () => {},
}), referent, 'prepared calls preserve reference identity');
preparedDevice.bindCall('read', value => Number(value) + 3);
assert.equal(preparedRead(9), 12, 'late host overrides remain visible');
let connected: (...args: any[]) => unknown = () => undefined;
preparedDevice.connectCall!('scalar', call => { connected = call; });
assert.equal(connected(19), 19);
const firstConnection = connected;
preparedDevice.bindCall('scalar', value => Number(value) + 1);
assert.notEqual(connected, firstConnection, 'a direct connection is republished on override');
assert.equal(connected(19), 20);

registerGeneratedDevice({
  type: 'EXECUTION_CLOCK_TEST', constants: {}, callbacks: [],
  members: [{ name: 'm_icount', valueType: 'int', bits: 32, signed: true },
    { name: 'm_last_cycle', valueType: 'int', bits: 32 }],
  methods: [method('execute_run', '',
    'do { m_last_cycle = total_cycles(); m_icount -= 2; } while (m_icount > 0);'),
    method('cycles', '', 'return total_cycles();')],
  summary: { diagnostics: 0 },
});
const executionClock = createDevice('EXECUTION_CLOCK_TEST');
assert.equal(executionClock.runCycles!(3), 4, 'a time slice carries instruction overshoot');
assert.equal(executionClock.get('m_last_cycle'), 2, 'total_cycles advances inside the slice');
assert.equal(executionClock.call('cycles'), 4);
assert.equal(executionClock.runCycles!(2), 2);
assert.equal(executionClock.get('m_last_cycle'), 4, 'successive slices share one cycle clock');
executionClock.reset();
assert.equal(executionClock.call('cycles'), 0);

// A device another one holds as an object -- a floppy drive's mounted image --
// keeps only its data in a save. Loading after the disk was ejected rebuilds an
// executable image from that data instead of a plain object without get_buffer.
const heldImage: GeneratedDeviceDefinition = {
  type: 'HELD_IMAGE_FIXTURE',
  constants: {},
  members: [{ name: 'm_value', valueType: 'int', bits: 32, signed: true, initial: 0 }],
  callbacks: [],
  timers: [],
  methods: [method('get_value', '', 'return m_value;')],
  summary: { diagnostics: 0 },
};
registerGeneratedDevice({ ...definition, type: 'HELD_IMAGE_HOLDER_FIXTURE', floppyImage: heldImage });
createDevice('HELD_IMAGE_HOLDER_FIXTURE', {});
const rebuildImage = generatedInstanceFactories().get('device-instance:HELD_IMAGE_FIXTURE');
assert.ok(rebuildImage, 'a drive registers the image it holds when it is built, before any mount');
const rebuilt = rebuildImage!({ m_value: 42 }) as { get_value(): number; $factory: string };
assert.equal(rebuilt.get_value(), 42, 'the rebuilt image runs its methods against the saved data');
assert.equal(rebuilt.$factory, 'device-instance:HELD_IMAGE_FIXTURE', 'and saves the same way again');

// An image device whose own call_load reads the file: snapquik.cpp's
// quickload arms a timer there, and its callback reads the file through the
// device_image_interface calls the host answers.
registerGeneratedDevice({
  type: 'QUICKLOAD_FIXTURE',
  imageInterface: true,
  constants: { SEEK_SET: 0, SEEK_CUR: 1, SEEK_END: 2 },
  members: [
    { name: 'm_file_extensions', valueType: 'const char*', initial: 0 },
    { name: 'm_size', valueType: 'int', bits: 32, initial: 0 },
    { name: 'm_last', valueType: 'int', bits: 32, initial: 0 },
  ],
  callbacks: [],
  timers: [{ member: 'm_timer', callback: 'process' }],
  methods: [
    method('device_start', '', 'm_timer = timer_alloc();'),
    method('set_extensions', 'const char *ext', 'm_file_extensions = ext;'),
    method('file_extensions', '', 'return m_file_extensions;'),
    method('image_type_name', '', 'return "quickload";'),
    method('call_load', '', 'm_timer.adjust(1, 0);'),
    method('process', 'int param',
      'check_for_file(); m_size = length();' +
      'uint8_t last[1]; fseek(-1, SEEK_END); fread(last, 1); m_last = last[0];'),
  ],
  summary: { diagnostics: 0 },
});
{
  const quickload = createDevice('QUICKLOAD_FIXTURE');
  quickload.invoke('set_extensions', 'p00,PRG,t64');
  assert.equal(quickload.imageTypeName!(), 'quickload');
  assert.deepEqual(quickload.imageExtensions!(), ['p00', 'prg', 't64'], 'file_extensions(), as the device answers it');
  assert.equal(quickload.timerPending!(), false);
  quickload.mountImage!('prg', new Uint8Array([1, 8, 0x2a]), 'game.prg');
  assert.equal(quickload.timerPending!(), true, 'call_load armed the timer; nothing is read yet');
  assert.equal(quickload.get('m_size'), 0);
  quickload.tick(1.5);
  assert.equal(quickload.timerPending!(), false);
  assert.equal(quickload.get('m_size'), 3, 'length() is the mounted file');
  // The surface a driver's load callback reads the file through, handed the
  // device as `image` (the C64's `image.is_filetype("prg")`).
  const image = quickload.instance!() as Record<string, (...args: unknown[]) => unknown>;
  assert.equal(image.is_filetype!('PRG'), 1, 'is_filetype ignores case');
  assert.equal(image.is_filetype!('t64'), 0);
  assert.equal(image.basename!(), 'game.prg');
  assert.equal(quickload.get('m_last'), 0x2a, 'fseek from the end, then fread');
  assert.equal(quickload.imageError!(), undefined);
  // A device whose medium MAME calls something else is no quickload, and a
  // device that is not an image device has no medium at all.
  assert.equal(createDevice('fixture').imageTypeName?.(), undefined);
}

// A cartridge port, as the C64's: the image arrives before power-on, the
// part's `slot` feature picks the card (else the port's software default),
// and the port's own call_load reads the part's areas into that card through
// the members MAME's slot reaches into.
{
  const card = (type: string, offset: number): GeneratedDeviceDefinition => ({
    type, constants: {}, callbacks: [], timers: [],
    members: [
      { name: 'm_roml', valueType: 'std::unique_ptr<uint8_t[]>', initial: 0 },
      { name: 'm_roml_size', valueType: 'int', bits: 32, initial: 0 },
      { name: 'm_exrom', valueType: 'int', bits: 32, initial: 1 },
      { name: 'm_bank', valueType: 'int', bits: 32, initial: 0 },
    ],
    methods: [method('read_rom', 'int offs', `return m_roml[offs + ${offset}];`), method('device_reset', '', 'm_bank = 0;')],
    reset: 'device_reset',
    summary: { diagnostics: 0 },
  });
  registerGeneratedDevice({
    type: 'CART_PORT_FIXTURE',
    imageInterface: true,
    constants: {},
    members: [{ name: 'm_card', valueType: 'device_card_interface*', initial: 0 }],
    callbacks: [],
    timers: [],
    slot: { member: 'm_card', options: { standard: card('STD_CARD', 0), other: card('OTHER_CARD', 1) } },
    methods: [
      // MAME's own chooser: a file's type, else the part's `slot` feature.
      method('get_default_card_software', 'get_default_card_software_hook &hook',
        'if (hook.image_file() && hook.is_filetype("crt")) return "other";' +
        'return software_get_default_slot("standard");'),
      method('call_load', '',
        'if (loaded_through_softlist()) {' +
        '  load_software_region("roml", m_card->m_roml);' +
        '  m_card->m_roml_size = get_software_region_length("roml");' +
        '  if (get_feature("exrom") != nullptr) m_card->m_exrom = atol(get_feature("exrom"));' +
        '}' +
        'return std::make_pair(std::error_condition(), std::string());'),
      method('read', 'int offs', 'return m_card->read_rom(offs);'),
      method('exrom', '', 'return m_card->m_exrom;'),
      method('bank_w', 'int data', 'm_card->m_bank = data;'),
      method('bank', '', 'return m_card->m_bank;'),
    ],
    summary: { diagnostics: 0 },
  });
  const software = (features: Record<string, string>) => ({
    image: { name: 'title.zip', software: { areas: { roml: Uint8Array.from([5, 6, 7]) }, features } },
  });
  const named = createDevice('CART_PORT_FIXTURE', software({ exrom: '0', slot: 'other' }));
  assert.equal(named.call('read', 0), 6, 'the part names its card');
  assert.equal(named.call('exrom'), 0, 'the feature "0" is not nullptr, and atol reads it');
  const plain = createDevice('CART_PORT_FIXTURE', software({}));
  assert.equal(plain.call('read', 0), 5, 'a part that names none takes the default card');
  assert.equal(plain.call('exrom'), 1, 'a feature the part lacks leaves the card as it was');
  const card0 = (plain.instance!() as Record<string, unknown>).m_card as Record<string, unknown>;
  assert.equal(card0.m_roml_size, 3, 'the slot reaches into its card');
  assert.ok(!Object.keys(card0).includes('m_roml'), 'members stay out of the card proxy\'s own keys');
  assert.equal(createDevice('CART_PORT_FIXTURE').call('read', 0), 0, 'no image, no card');
  // device_t::reset resets the card in the slot after the slot itself.
  plain.call('bank_w', 1);
  assert.equal(plain.call('bank'), 1);
  plain.reset();
  assert.equal(plain.call('bank'), 0, 'a reset slot resets its card');
  // A bare file picks its card from what it is, through the same chooser.
  const file = createDevice('CART_PORT_FIXTURE', { image: { name: 'game.CRT', bytes: Uint8Array.from([1, 2]) } });
  assert.equal(((file.instance!() as Record<string, unknown>).m_card as { m_roml_size: number }).m_roml_size, 0,
    'the file chose the other card (whose call_load read no software part)');
  assert.ok(((file.instance!() as Record<string, unknown>).m_card as Record<string, unknown>).read_rom, 'and a card is there');
}

clearGeneratedDevices();
console.log('generated-device.spec: registration, IR, slots, overloads, callbacks, timers, memory shares and compiled methods passed');
