import assert from 'node:assert/strict';
import type { BoardIr } from '../ir/board.ts';
import { BOARD_IR_SCHEMA_VERSION } from '../ir/version.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';
import {
  applyGeneratedCpuInputLine,
  pulseGeneratedCpuInputLine,
  bindGeneratedDriverState,
  bindGeneratedInputState,
  bindGeneratedRegionState,
  bindGeneratedShareState,
  createGeneratedBoard,
  generatedCompositeCallbackBindings,
  generatedDeviceCallbackArguments,
  generatedCpuMemberBindings,
  generatedPromGateOpen,
  generatedSignalHandlerArguments,
  generatedStateSetters,
  withEmptySlots,
} from './generated-board.ts';
import type { BoundEffect } from './generated-effects.ts';
import { registerGeneratedCpu } from './generated-cpu.ts';
import {
  registerGeneratedDevice,
  createDevice,
  type Device,
} from './generated-device.ts';

const state: Record<string, unknown> = {};
const first = new Uint8Array(0x100);
const second = new Uint8Array(0x100);

bindGeneratedShareState(state, 'spriteram[0]', first);
bindGeneratedShareState(state, 'spriteram[1]', second);
bindGeneratedShareState(state, 'spyhunt_alpha', first, ['m_spyhunt_alpharam']);

assert.equal(state['m_spriteram[0]'], first);
assert.equal(state['m_spriteram[1]'], second);
assert.deepEqual(state.m_spriteram, [first, second]);
assert.equal((first as Uint8Array & { bytes(): number }).bytes(), 0x100);
assert.equal(state.m_spyhunt_alpharam, first);

const wordState: Record<string, unknown> = {};
const wordBytes = Uint8Array.of(0x34, 0x12, 0xcd, 0xab);
bindGeneratedShareState(wordState, 'videoram[1]', wordBytes, ['m_videoram'], 16);
assert.deepEqual(
  [...(wordState.m_videoram as Uint16Array[])[1]!],
  [0x1234, 0xabcd],
  'indexed 16-bit share finders must expose words rather than their backing bytes',
);

const declaredArrayState: Record<string, unknown> = {};
generatedStateSetters(declaredArrayState, [{
  name: 'm_scrollx', bits: 32, signed: true, arrayLength: 2,
}, { name: 'm_raster_irq_position', bits: 32, signed: true }]);
assert.deepEqual(
  [...(declaredArrayState.m_scrollx as Int32Array)],
  [0, 0],
  'fixed driver arrays must exist zero-initialized before their first write',
);
assert.equal(declaredArrayState.m_raster_irq_position, 0);

const inputState: Record<string, unknown> = {};
bindGeneratedInputState(inputState, [{
  member: 'm_ports',
  tags: ['ssio:IP0', 'ssio:IP1'],
}], {
  read: tag => tag === 'ssio:IP0' ? 0xfe : 0xfb,
});
const inputFinders = inputState.m_ports as {
  read(): number;
  read_safe(fallback?: number): number;
}[];
assert.equal(inputFinders[0]!.read_safe(), 0xfe);
assert.equal(inputFinders[1]!.read(), 0xfb);

let scopedCpuLine = '';
const scopedBindings = generatedCpuMemberBindings({
  calls: {
    'm_maincpu.set_input_line': () => { scopedCpuLine = 'maincpu'; },
    'm_ssio:cpu.set_input_line': () => { scopedCpuLine = 'ssio:cpu'; },
  },
}, 'ssio:cpu');
scopedBindings.calls?.['m_cpu.set_input_line']?.(0, 1);
assert.equal(scopedCpuLine, 'ssio:cpu');

const regionState: Record<string, unknown> = {};
const irqProm = Uint8Array.of(2, 6, 1, 5);
bindGeneratedRegionState(regionState, 'irqprom', irqProm);
assert.equal(regionState.m_irqprom, irqProm);
const heightProm = Uint8Array.of(0, 1, 2);
bindGeneratedRegionState(
  regionState,
  'spr_height_prom',
  heightProm,
  { m_sprite_height_prom: 'spr_height_prom' },
);
assert.equal(regionState.m_spr_height_prom, heightProm);
assert.equal(regionState.m_sprite_height_prom, heightProm);

let resets = 0;
let nmis = 0;
let irqs = 0;
let held = false;
const lineCpu = {
  reset() { resets++; },
  step() { return 1; },
  run(cycles: number) { return cycles; },
  setIrqLine() { irqs++; },
  setInputLine() {},
  nmi() { nmis++; },
  get() { return 0; },
  stateInt() { return 0; },
  set() {},
  invoke() { return 0; },
  hasMethod() { return false; },
};
applyGeneratedCpuInputLine(lineCpu, -2, 1, state => { held = state; });
assert.equal(resets, 1, 'INPUT_LINE_RESET must reset, not trigger NMI');
assert.equal(nmis, 0);
assert.equal(held, true);
applyGeneratedCpuInputLine(lineCpu, -2, 0, state => { held = state; });
assert.equal(held, false);
applyGeneratedCpuInputLine(lineCpu, -3, 1, state => { held = state; });
assert.equal(held, true, 'INPUT_LINE_HALT must suspend the CPU');
applyGeneratedCpuInputLine(lineCpu, -3, 0, state => { held = state; });
assert.equal(held, false, 'clearing INPUT_LINE_HALT must resume the CPU');
applyGeneratedCpuInputLine(lineCpu, -1, 1, state => { held = state; });
assert.equal(nmis, 1);
applyGeneratedCpuInputLine(lineCpu, 0, 2, state => { held = state; });
assert.equal(irqs, 1);
pulseGeneratedCpuInputLine(lineCpu, -1);
assert.equal(nmis, 2, 'device.execute().pulse_input_line must deliver an NMI pulse');

assert.deepEqual(
  generatedSignalHandlerArguments(
    'offs_t offset, uint8_t data, uint8_t mem_mask',
    4,
  ),
  { state: 4, data: 4, offset: 0, mem_mask: 0xff },
  'device write callbacks must receive MAME default offset and active mem_mask arguments',
);
assert.equal(
  generatedPromGateOpen(
    { member: 'm_irqprom', mask: 0x03 },
    5,
    { m_irqprom: Uint8Array.of(0, 4, 0, 0) },
  ),
  true,
);
assert.equal(
  generatedPromGateOpen(
    { member: 'm_irqprom', mask: 0x03 },
    6,
    { m_irqprom: Uint8Array.of(0, 4, 0, 0) },
  ),
  false,
);
assert.deepEqual(
  generatedSignalHandlerArguments(
    'offs_t offset, uint8_t data, uint8_t mem_mask',
    0x7f,
    undefined,
    [0x6900, 0x7f, 0xff],
  ),
  { state: 0x7f, data: 0x7f, offset: 0x6900, mem_mask: 0xff },
  'parallel callbacks must preserve offset while binding data to the emitted value',
);
assert.equal(
  generatedSignalHandlerArguments('uint8_t data', 0x7f, undefined, [0x6900, 0x7f]).data,
  0x7f,
  'single-data handlers must not reinterpret a parallel callback offset as data',
);
const callbackDevice = {};
assert.equal(
  generatedSignalHandlerArguments('device_t &device', 1, callbackDevice).device,
  callbackDevice,
);
assert.deepEqual(
  generatedDeviceCallbackArguments(['offs_t offset', 'uint8_t data'], 0x7f),
  [0, 0x7f],
  'device callbacks must supply offset zero before latch write data',
);
assert.deepEqual(
  generatedDeviceCallbackArguments(['offs_t offset'], 0x7f),
  [0],
  'device read callbacks must not reinterpret their signal value as an offset',
);
assert.deepEqual(
  generatedDeviceCallbackArguments(['uint8_t data'], 0x7f),
  [0x7f],
);
assert.deepEqual(
  generatedDeviceCallbackArguments(
    ['offs_t offset', 'uint8_t data', 'uint8_t mem_mask'],
    0x7f,
  ),
  [0, 0x7f, 0xff],
  'parallel callback adapters must retain an all-bits mask for AOT device methods',
);

const driverState: Record<string, unknown> = {};
const driverCalls: Record<string, (...args: number[]) => number | void> = {};
bindGeneratedDriverState(driverState, driverCalls);
assert.equal(driverCalls.flip_screen!(), 0);

let compositeCallbackValue = -1;
const compositeMachine = {
  schemaVersion: BOARD_IR_SCHEMA_VERSION,
  game: 'composite-callback-fixture',
  family: 'fixture',
  driverFile: 'fixture.cpp',
  callbacks: [{
    id: 'callback:into-composite',
    ownerTag: 'pia',
    signal: 'writepa_handler',
    operation: 'set',
    targetTag: 'soundbd',
    targetClass: 'venture_sound_device',
    targetMethod: 'pb_w',
  }, {
    id: 'callback:out-of-composite',
    ownerTag: 'soundbd',
    signal: 'pa_callback',
    operation: 'set',
    targetTag: 'pia',
    targetClass: 'pia6821_device',
    targetMethod: 'portb_w',
  }, {
    id: 'callback:child-read',
    ownerTag: 'mcu:mcu',
    signal: 'portb_r',
    operation: 'set',
    targetClass: 'arkanoid_68705p5_device',
    targetMethod: 'mcu_pb_r',
  }, {
    id: 'callback:parent-read',
    ownerTag: 'mcu',
    signal: 'portb_r_cb',
    operation: 'set',
    targetClass: 'fixture_state',
    targetMethod: 'input_mux_r',
  }],
  devices: [{ id: 'device:parent', tag: 'mcu', type: 'MCU_INTERFACE' }, {
    id: 'device:child', tag: 'mcu:mcu', hostTag: 'mcu', type: 'M68705P5',
  }],
  connections: [],
  execution: {
    cpus: [],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 1, rotate: 0 },
    frameEvents: [],
  },
} as BoardIr;
const compositeEffects = new Map<string, BoundEffect>([[
  'callback:out-of-composite',
  {
    run: value => { compositeCallbackValue = value; },
    transforms: [],
    reads: false,
  },
], [
  'callback:parent-read',
  {
    run: () => 0xa5,
    transforms: [],
    reads: false,
  },
]]);
const compositeBindings = generatedCompositeCallbackBindings(
  compositeMachine,
  'venture_sound_device',
  () => false,
  () => compositeEffects,
  {},
);
compositeBindings.calls?.m_pa_callback?.(0x5a);
assert.equal(
  compositeCallbackValue,
  0x5a,
  'source-compiled composite devcb members must emit their board callbacks',
);
const compositeReadBindings = generatedCompositeCallbackBindings(
  compositeMachine,
  'arkanoid_68705p5_device',
  tag => tag === 'mcu:mcu',
  () => compositeEffects,
  {},
);
assert.equal(
  compositeReadBindings.calls?.m_portb_r_cb?.(),
  0xa5,
  'nested composite read devcbs must return the parent board callback value',
);
driverCalls.flip_screen_set!(1);
assert.equal(driverCalls.flip_screen!(), 1);
assert.equal(driverCalls.flip_screen_x!(), 1);
assert.equal(driverCalls.flip_screen_y!(), 1);
driverCalls.flip_screen_x_set!(0);
assert.equal(driverCalls.flip_screen!(), 1);
driverCalls.flip_screen_y_set!(0);
assert.equal(driverCalls.flip_screen!(), 0);

let programRead = -1;
let opcodeRead = -1;
registerGeneratedCpu({
  type: 'OPCODE_BUS_FIXTURE',
  summary: { diagnostics: 0 },
  create(bus) {
    return {
      reset() {},
      step() { return 1; },
      run(cycles) {
        programRead = bus.read(0);
        opcodeRead = bus.readOpcode?.(0) ?? -1;
        return cycles;
      },
      setIrqLine() {},
      setInputLine() {},
      nmi() {},
      get() { return 0; },
      stateInt() { return 0; },
      set() {},
      invoke() { return 0; },
      hasMethod() { return false; },
    };
  },
});
const opcodeMachine: BoardIr = {
  schemaVersion: BOARD_IR_SCHEMA_VERSION,
  game: 'opcode-bus-fixture',
  family: 'fixture',
  driverFile: 'fixture.cpp',
  callbacks: [],
  connections: [],
  execution: {
    cpus: [{
      tag: 'maincpu',
      type: 'OPCODE_BUS_FIXTURE',
      clock: 60,
      region: 'maincpu',
      ranges: [{ start: 0, end: 0, kind: 'rom' }],
      opcode: {
        region: 'decrypted_opcodes',
        ranges: [{ start: 0, end: 0, kind: 'rom', share: 'decrypted_opcodes' }],
      },
    }],
    screen: {
      width: 1,
      height: 1,
      refresh: 60,
      vtotal: 1,
      vbstart: 1,
      rotate: 0,
    },
    frameEvents: [],
  },
  maps: [{
    id: 'map:base',
    className: 'fixture_state',
    name: 'overridden_base_map',
    ranges: [{
      id: 'range:base',
      start: 0,
      end: 0,
      raw: 'map(0, 0).w("removed", FUNC(device::write))',
      write: 'removed.write',
      props: {},
    }],
  }],
};
const opcodeBoard = createGeneratedBoard(
  opcodeMachine,
  {
    game: opcodeMachine.game,
    family: 'fixture',
    cpus: [],
    ranges: [],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 1, rotate: 0 },
    clocks: { namco06: 0, wsg: 0 },
  },
  {
    maincpu: Uint8Array.of(0x11),
    decrypted_opcodes: Uint8Array.of(0x22),
  },
  { read: () => 0xff },
  { soundWrite: () => {} },
);
opcodeBoard.frame(new Uint32Array(1));
assert.equal(programRead, 0x11);
assert.equal(opcodeRead, 0x22, 'the generated board must preserve the AS_OPCODES bus');
assert.ok(opcodeBoard, 'handlers in archival maps overridden by the CPU plan must not block startup');

// A save that does not fit leaves the running machine as it was. The mismatch
// here, a region this machine lacks, is only found after the rest of the save
// has been written in, which once left the board half replaced by a save it
// had refused.
const earlierSave = opcodeBoard.save();
opcodeBoard.frame(new Uint32Array(1));
const runningSave = opcodeBoard.save();
assert.notEqual(runningSave.frame, earlierSave.frame);
assert.throws(
  () => opcodeBoard.load({ ...earlierSave, regions: { ...earlierSave.regions, missing: new Uint8Array(1) } }),
  /region missing: saved, but this machine has none/,
);
assert.deepEqual(opcodeBoard.save(), runningSave, 'a refused save must not change the running machine');
opcodeBoard.load(earlierSave);
assert.equal(opcodeBoard.save().frame, earlierSave.frame, 'a save that fits still loads');

registerGeneratedDevice({
  type: 'SCREEN_HOST_FIXTURE',
  constants: {},
  members: [
    { name: 'm_height', valueType: 'int', bits: 32, initial: 0 },
    { name: 'm_frame', valueType: 'int', bits: 32, initial: 0 },
    { name: 'm_seconds', valueType: 'double', initial: 0 },
  ],
  callbacks: [],
  methods: [{
    name: 'capture_screen',
    parameters: '',
    program: compileMameHandler(
      'm_height = screen().height(); m_frame = screen().frame_number(); m_seconds = machine().time().as_double();',
    ),
  }],
  start: 'capture_screen',
  summary: { diagnostics: 0 },
});
const screenHostMachine: BoardIr = {
  ...opcodeMachine,
  game: 'screen-host-fixture',
  devices: [{
    id: 'device:screen-host-fixture',
    tag: 'timing',
    type: 'SCREEN_HOST_FIXTURE',
    member: 'm_timing',
  }],
  execution: {
    ...opcodeMachine.execution,
    cpus: [{
      tag: 'maincpu',
      type: 'OPCODE_BUS_FIXTURE',
      clock: 60,
      region: 'maincpu',
      ranges: [{ start: 0, end: 0, kind: 'rom' }],
    }],
    screen: {
      ...opcodeMachine.execution.screen,
      height: 224,
      vtotal: 264,
    },
  },
};
const screenHostBoard = createGeneratedBoard(
  screenHostMachine,
  {
    game: screenHostMachine.game,
    family: 'fixture',
    cpus: [],
    ranges: [],
    screen: { width: 1, height: 224, refresh: 60, vtotal: 264, vbstart: 240, rotate: 0 },
    clocks: { namco06: 0, wsg: 0 },
  },
  { maincpu: Uint8Array.of(0) },
  { read: () => 0xff },
  { soundWrite: () => {} },
);
const timingDevice = (screenHostBoard as unknown as {
  devices: Map<string, Device>;
}).devices.get('timing')!;
assert.equal(timingDevice.get('m_height'), 264, 'screen().height() must expose total scanlines');
assert.equal(timingDevice.get('m_frame'), 0);
screenHostBoard.frame(new Uint32Array(screenHostBoard.fbWidth * screenHostBoard.fbHeight));
timingDevice.invoke('capture_screen');
assert.equal(timingDevice.get('m_frame'), 1, 'screen().frame_number() must follow board frames');
const finder = (screenHostBoard as unknown as { state: Record<string, { capture_screen(): void }> }).state.m_timing;
assert.equal(typeof finder.capture_screen, 'function', 'source device finders must survive copying into a local pointer');
finder.capture_screen();
assert.equal(timingDevice.get('m_frame'), 1);
screenHostBoard.frame(new Uint32Array(screenHostBoard.fbWidth * screenHostBoard.fbHeight));
finder.capture_screen();
assert.ok(timingDevice.get('m_seconds') > 0, 'source as_double() must observe advancing machine time');
const clockHost = screenHostBoard as unknown as {
  cpuSliceCycles: Map<string, number>;
};
clockHost.cpuSliceCycles.set('maincpu', 10);
finder.capture_screen();
const busWriteTime = timingDevice.get('m_seconds');
clockHost.cpuSliceCycles.set('maincpu', 8);
finder.capture_screen();
// A plain device reads the scheduler, which stands at a timer's own expiry
// even when the lump that carried the clock past it already exposed a later
// bus-write time: scanline interrupts re-arm from that expiry (Space
// Invaders drifted a cycle when every device was clamped instead). Only an
// image transport -- a device carrying a cassette -- is given a reading that
// never rewinds, because it differences two readings to move its tape.
assert.ok(timingDevice.get('m_seconds') < busWriteTime,
  'a plain device observes the scheduler at the expiry, not a clamped later reading');
clockHost.cpuSliceCycles.set('maincpu', 11);
finder.capture_screen();
assert.ok(timingDevice.get('m_seconds') > busWriteTime);
screenHostBoard.reset();
finder.capture_screen();
assert.equal(timingDevice.get('m_seconds'), 0, 'reset starts a fresh scheduler clock');

let clockedPeripheral: Device | undefined;
const instructionObservations: number[][] = [];
registerGeneratedCpu({
  type: 'CLOCK_OBSERVER_FIXTURE', summary: { diagnostics: 0 },
  create(bus) {
    return {
      reset() {}, step() { return 1; },
      run(cycles) {
        const samples: number[] = [];
        for (let elapsed = 0; elapsed < cycles; elapsed++) {
          bus.timing?.(elapsed, cycles);
          samples.push(clockedPeripheral?.get('m_counter') ?? 0);
        }
        bus.timing?.(cycles, cycles);
        instructionObservations.push(samples);
        return cycles;
      },
      setIrqLine() {}, setInputLine() {}, nmi() {}, get() { return 0; },
      stateInt() { return 0; }, set() {}, invoke() { return 0; }, hasMethod() { return false; },
    };
  },
});
registerGeneratedDevice({
  type: 'CLOCKED_COUNTER_FIXTURE', constants: {}, callbacks: [],
  members: ['m_counter', 'm_icount'].map(name => ({ name, valueType: 'int', bits: 32, initial: 0 })),
  methods: [{ name: 'execute_run', parameters: '',
    program: compileMameHandler('m_counter += m_icount; m_icount = 0;') }],
  summary: { diagnostics: 0 },
});
// Under a perfect quantum MAME's round is one cycle, so an executing
// peripheral with no host advances between the CPU's instructions (the C64's
// VIC-II and CIAs).
const clockedMachine: BoardIr = {
  ...screenHostMachine, game: 'clocked-counter-fixture',
  devices: [{ id: 'clocked-counter', tag: 'counter', type: 'CLOCKED_COUNTER_FIXTURE', clock: 6000 }],
  execution: { ...screenHostMachine.execution,
    perfectQuantum: true,
    cpus: [{ ...screenHostMachine.execution.cpus[0]!, type: 'CLOCK_OBSERVER_FIXTURE', clock: 6000 }],
    screen: { ...screenHostMachine.execution.screen, vtotal: 1, height: 1 } },
};
const clockedBoard = createGeneratedBoard(clockedMachine,
  { game: clockedMachine.game, family: 'fixture', cpus: [], ranges: [],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 1, rotate: 0 }, clocks: { namco06: 0, wsg: 0 } },
  { maincpu: Uint8Array.of(0) }, { read: () => 0xff }, { soundWrite() {} });
clockedPeripheral = (clockedBoard as unknown as { devices: Map<string, Device> }).devices.get('counter');
clockedBoard.frame(new Uint32Array(1));
clockedBoard.frame(new Uint32Array(1));
assert.ok(instructionObservations.some(samples => new Set(samples).size > 1),
  'clocked peripheral counters must advance between CPU instructions within one scanline');

// Otherwise it runs in MAME's round, after the CPU: inside the CPU's slice it
// stands where the last round left it, and the round brings it level.
{
  instructionObservations.length = 0;
  const roundMachine: BoardIr = {
    ...clockedMachine, game: 'round-counter-fixture',
    execution: { ...clockedMachine.execution, perfectQuantum: undefined },
  };
  const roundBoard = createGeneratedBoard(roundMachine,
    { game: roundMachine.game, family: 'fixture', cpus: [], ranges: [],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 1, rotate: 0 }, clocks: { namco06: 0, wsg: 0 } },
    { maincpu: Uint8Array.of(0) }, { read: () => 0xff }, { soundWrite() {} });
  clockedPeripheral = (roundBoard as unknown as { devices: Map<string, Device> }).devices.get('counter');
  roundBoard.frame(new Uint32Array(1));
  roundBoard.frame(new Uint32Array(1));
  assert.ok(instructionObservations.length > 1 &&
    instructionObservations.every(samples => new Set(samples).size === 1),
  'a peripheral the round runs stands still inside the CPU slice');
  assert.equal(clockedPeripheral?.get('m_counter'), 200, 'and the rounds give it every cycle of two frames');
  clockedPeripheral = (clockedBoard as unknown as { devices: Map<string, Device> }).devices.get('counter');
}

// A clocked peripheral's fractional cycles are part of a save state. They are
// delivered after every instruction, so they run in a plain array, written into
// the saved record (`hostedCarry`) when a save is taken and read back from it
// when one is restored: a save loaded and saved again is the same save.
{
  const carryMachine: BoardIr = {
    ...clockedMachine, game: 'clocked-carry-fixture',
    devices: [{ ...clockedMachine.devices![0]!, clock: 4000 }],
  };
  const carryBoard = createGeneratedBoard(carryMachine,
    { game: carryMachine.game, family: 'fixture', cpus: [], ranges: [],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 1, rotate: 0 }, clocks: { namco06: 0, wsg: 0 } },
    { maincpu: Uint8Array.of(0) }, { read: () => 0xff }, { soundWrite() {} });
  const fb = new Uint32Array(1);
  carryBoard.frame(fb);
  const saved = carryBoard.save();
  const carry = (state: typeof saved) =>
    [...((state.roots as { hostState: { hostedCarry: Map<string, number> } }).hostState.hostedCarry)];
  assert.ok(carry(saved).every(([, value]) => value > 0 && value < 1), 'the fixture leaves a fractional carry');
  carryBoard.frame(fb);
  carryBoard.frame(fb);
  assert.notDeepEqual(carry(carryBoard.save()), carry(saved), 'the carry moved on');
  carryBoard.load(saved);
  assert.deepEqual(carry(carryBoard.save()), carry(saved));
}

registerGeneratedDevice({
  type: 'HOSTED_MEMORY_FIXTURE', constants: {}, callbacks: [],
  members: ['m_cache', 'm_data'].map(name => ({ name, valueType: 'address_space', initial: 0 })),
  methods: [{ name: 'probe', parameters: '', program: compileMameHandler(
    'm_data.write_byte(3, 29); return m_cache.read_byte(1) * 16 + m_data.read_byte(3);') }],
  summary: { diagnostics: 0 },
});
const hostedMemory = createDevice('HOSTED_MEMORY_FIXTURE');
const hostedOwner = createDevice('HOSTED_MEMORY_FIXTURE');
(clockedBoard as unknown as {
  configureHostedProcessor(tag: string, device: Device, host: Device, firmware: Uint8Array,
    sinks: { soundWrite(): void }): unknown;
}).configureHostedProcessor('firmware-fixture', hostedMemory, hostedOwner, Uint8Array.of(2, 3), { soundWrite() {} });
assert.equal(hostedMemory.call('probe'), 61, 'expanded cache/data calls must reach hosted firmware and RAM');
assert.equal(hostedMemory.call('READOP', 1), 3);
assert.equal(hostedMemory.call('RDMEM', 3), 13, 'named memory macros and expanded calls share storage');

let cpuSignalRead = -1;
let cpuHandlerSignalRead = -1;
registerGeneratedCpu({
  type: 'CPU_SIGNAL_FIXTURE',
  summary: { diagnostics: 0 },
  create(bus) {
    return {
      reset() {},
      step() { return 1; },
      run(cycles) {
        cpuSignalRead = bus.signal?.('in_p1_cb', 0) ?? -1;
        cpuHandlerSignalRead = bus.signal?.('in_p3_cb', 0) ?? -1;
        return cycles;
      },
      setIrqLine() {},
      setInputLine() {},
      nmi() {},
      get() { return 0; },
      stateInt() { return 0; },
      set() {},
      invoke() { return 0; },
      hasMethod() { return false; },
    };
  },
});
const signalMachine: BoardIr = {
  ...opcodeMachine,
  game: 'cpu-signal-fixture',
  callbacks: [{
    id: 'cpu-input',
    ownerTag: 'mcu',
    signal: 'in_p1_cb',
    operation: 'set_ioport',
    targetTag: 'IN0',
    targetPort: 'IN0',
  }, {
    id: 'cpu-handler-input',
    ownerTag: 'mcu',
    signal: 'in_p3_cb',
    operation: 'set',
    targetClass: 'fixture_state',
    targetMethod: 'port3_r',
  }],
  connections: [{
    callbackId: 'cpu-input',
    effect: { kind: 'port-read', port: 'IN0' },
    transforms: [],
  }, {
    callbackId: 'cpu-handler-input',
    effect: { kind: 'handler', handler: 'fixture_state.port3_r' },
    transforms: [],
  }],
  handlers: [{
    id: 'handler:fixture_state.port3_r',
    ownerClass: 'fixture_state',
    method: 'port3_r',
    program: {
      operations: [{
        op: 'return',
        value: { kind: 'number', value: 0x5a },
      }],
      diagnostics: [],
    },
  }, {
    id: 'handler:fixture_state.custom_r',
    ownerClass: 'fixture_state',
    method: 'custom_r',
    program: {
      operations: [{
        op: 'return',
        value: { kind: 'number', value: 1 },
      }],
      diagnostics: [],
    },
  }],
  execution: {
    ...opcodeMachine.execution,
    cpus: [{
      tag: 'mcu',
      type: 'CPU_SIGNAL_FIXTURE',
      clock: 60,
      region: 'mcu',
      ranges: [{ start: 0, end: 0, kind: 'rom' }],
    }],
  },
};
const signalBoard = createGeneratedBoard(
  signalMachine,
  {
    game: signalMachine.game,
    family: 'fixture',
    cpus: [],
    ranges: [],
    customs: [{
      port: 'IN0', mask: 0x80, member: 'custom_r', handler: 'fixture_state.custom_r',
      activeLow: true,
    }],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 1, rotate: 0 },
    clocks: { namco06: 0, wsg: 0 },
  },
  { mcu: Uint8Array.of(0) },
  { read: port => port === 'IN0' ? 0x25 : 0xff },
  { soundWrite: () => {} },
);
signalBoard.frame(new Uint32Array(1));
assert.equal(
  cpuSignalRead,
  0x25,
  'active-low custom input callbacks must be inverted like MAME digital fields',
);
assert.equal(
  cpuHandlerSignalRead,
  0x5a,
  'CPU input callbacks must return the generated handler value',
);

let slotBackedRan = false;
registerGeneratedCpu({
  type: 'SLOT_BACKED_FIXTURE',
  summary: { diagnostics: 0 },
  create() {
    return {
      reset() {},
      step() { return 1; },
      run(cycles) { slotBackedRan = true; return cycles; },
      setIrqLine() {},
      setInputLine() {},
      nmi() {},
      get() { return 0; },
      stateInt() { return 0; },
      set() {},
      invoke() { return 0; },
      hasMethod() { return false; },
    };
  },
});
const slotBackedMachine: BoardIr = {
  ...opcodeMachine,
  game: 'slot-backed-fixture',
  execution: {
    ...opcodeMachine.execution,
    cpus: [{
      tag: 'maincpu',
      type: 'SLOT_BACKED_FIXTURE',
      clock: 60,
      region: 'maincpu',
      ranges: [{ start: 0, end: 0xff, kind: 'ram' }],
    }],
  },
};
const slotBackedBoard = createGeneratedBoard(
  slotBackedMachine,
  {
    game: slotBackedMachine.game,
    family: 'fixture',
    cpus: [],
    ranges: [],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 1, rotate: 0 },
    clocks: { namco06: 0, wsg: 0 },
  },
  {},
  { read: () => 0xff },
  { soundWrite: () => {} },
);
slotBackedBoard.frame(new Uint32Array(1));
assert.equal(slotBackedRan, true, 'slot-backed CPUs must not require a fake fixed ROM region');

// #155: a device that re-arms its own timer for "the next line" against the
// beam, as the NES 2C02 does, on a board whose rounds span several lines (no
// declared cadence: 3 lines at 60 Hz x 262). The device clock once ran a round
// ahead of the processors, a re-arm from a line boundary found its next line
// already behind the beam, and the device lost a whole frame each round: about
// three ticks a frame, and the PPU never reached VBLANK.
registerGeneratedCpu({
  type: 'BEAM_TIMER_CPU_FIXTURE', summary: { diagnostics: 0 },
  create(bus) {
    return {
      reset() {}, step() { return 1; },
      run(cycles) {
        for (let elapsed = 0; elapsed < cycles; elapsed++) bus.timing?.(elapsed, cycles);
        bus.timing?.(cycles, cycles);
        return cycles;
      },
      setIrqLine() {}, setInputLine() {}, nmi() {}, get() { return 0; },
      stateInt() { return 0; }, set() {}, invoke() { return 0; }, hasMethod() { return false; },
    };
  },
});
registerGeneratedDevice({
  type: 'BEAM_TIMER_FIXTURE', constants: {}, callbacks: [],
  members: [
    { name: 'm_scanline', valueType: 'int', bits: 32, initial: 0 },
    { name: 'm_ticks', valueType: 'int', bits: 32, initial: 0 },
    { name: 'm_scanline_timer', valueType: 'emu_timer *', initial: 0 },
  ],
  timers: [{ member: 'm_scanline_timer', callback: 'scanline_tick' }],
  methods: [
    { name: 'device_start', parameters: '', program: compileMameHandler(
      'm_scanline_timer->adjust(screen().time_until_pos(1));') },
    { name: 'scanline_tick', parameters: '', program: compileMameHandler(
      'm_ticks++; m_scanline++; if (m_scanline >= 262) m_scanline = 0; ' +
      'm_scanline_timer->adjust(screen().time_until_pos(m_scanline + 1));') },
  ],
  start: 'device_start',
  summary: { diagnostics: 0 },
});
const beamTimerMachine: BoardIr = {
  ...screenHostMachine,
  game: 'beam-timer-fixture',
  devices: [{ id: 'device:beam-timer', tag: 'ppu', type: 'BEAM_TIMER_FIXTURE', member: 'm_ppu' }],
  execution: {
    ...screenHostMachine.execution,
    // Ten cycles a line.
    cpus: [{ ...screenHostMachine.execution.cpus[0]!, type: 'BEAM_TIMER_CPU_FIXTURE', clock: 60 * 262 * 10 }],
    screen: { ...screenHostMachine.execution.screen, height: 240, vtotal: 262, vbstart: 241 },
  },
};
const beamTimerBoard = createGeneratedBoard(beamTimerMachine,
  { game: beamTimerMachine.game, family: 'fixture', cpus: [], ranges: [],
    screen: { width: 1, height: 240, refresh: 60, vtotal: 262, vbstart: 241, rotate: 0 },
    clocks: { namco06: 0, wsg: 0 } },
  { maincpu: Uint8Array.of(0) }, { read: () => 0xff }, { soundWrite() {} });
const beamTimer = (beamTimerBoard as unknown as { devices: Map<string, Device> }).devices.get('ppu')!;
const beamFrame = new Uint32Array(beamTimerBoard.fbWidth * beamTimerBoard.fbHeight);
for (let frame = 0; frame < 3; frame++) beamTimerBoard.frame(beamFrame);
const ticksBefore = beamTimer.get('m_ticks');
for (let frame = 0; frame < 3; frame++) beamTimerBoard.frame(beamFrame);
assert.equal(beamTimer.get('m_ticks') - ticksBefore, 3 * 262,
  'a timer re-armed against the beam every line must fire once a line under multi-line rounds');

// The same device beside a processor whose slice sometimes runs past its
// target, as the NES 6502 does when an OAM DMA steals 513 cycles inside one
// instruction. Instruction deltas stop at the target, so the device clock has
// to be settled to where the processor actually stands: settled only to the
// round's unrun lines it fell four lines behind a CPU-side beam, and the
// device lost a frame every few (Super Mario Bros. ran at 75% speed).
let overrunSlices = 0;
registerGeneratedCpu({
  type: 'BEAM_TIMER_DMA_CPU_FIXTURE', summary: { diagnostics: 0 },
  create(bus) {
    return {
      reset() {}, step() { return 1; },
      run(cycles) {
        for (let elapsed = 0; elapsed < cycles; elapsed++) bus.timing?.(elapsed, cycles);
        bus.timing?.(cycles, cycles);
        // Every seventh slice ends four and a half lines past its target.
        return ++overrunSlices % 7 === 0 ? cycles + 45 : cycles;
      },
      setIrqLine() {}, setInputLine() {}, nmi() {}, get() { return 0; },
      stateInt() { return 0; }, set() {}, invoke() { return 0; }, hasMethod() { return false; },
    };
  },
});
const overrunMachine: BoardIr = {
  ...beamTimerMachine,
  game: 'beam-timer-overrun-fixture',
  execution: {
    ...beamTimerMachine.execution,
    cpus: [{ ...beamTimerMachine.execution.cpus[0]!, type: 'BEAM_TIMER_DMA_CPU_FIXTURE' }],
  },
};
const overrunBoard = createGeneratedBoard(overrunMachine,
  { game: overrunMachine.game, family: 'fixture', cpus: [], ranges: [],
    screen: { width: 1, height: 240, refresh: 60, vtotal: 262, vbstart: 241, rotate: 0 },
    clocks: { namco06: 0, wsg: 0 } },
  { maincpu: Uint8Array.of(0) }, { read: () => 0xff }, { soundWrite() {} });
const overrunTimer = (overrunBoard as unknown as { devices: Map<string, Device> }).devices.get('ppu')!;
for (let frame = 0; frame < 3; frame++) overrunBoard.frame(beamFrame);
const overrunBefore = overrunTimer.get('m_ticks');
for (let frame = 0; frame < 30; frame++) overrunBoard.frame(beamFrame);
// The overruns are real CPU time, so over thirty frames the device runs that
// much further than thirty frames' worth of lines -- but never a frame short.
const overrunTicks = overrunTimer.get('m_ticks') - overrunBefore;
assert.ok(overrunTicks >= 30 * 262 && overrunTicks < 31 * 262,
  `a slice overrun must not cost a beam-armed timer its frame (${overrunTicks} ticks in 30 frames)`);

// MAME's 6502 stops between an instruction's cycles, so a timer due partway
// through one fires before that instruction's later accesses: machine().time()
// never runs backwards. The C64 datassette stopped itself whenever its 44.1 kHz
// read timer fell due inside the instruction that started the motor. Here a
// 1/997 s timer lands inside 10-cycle instructions whose seventh cycle writes
// the same device; both read the time. A core that finishes its instruction
// first -- MAME's Z80 as much as ours -- sees the timer late.
for (const suspends of [true, false]) {
  registerGeneratedCpu({
    type: `ORDER_CPU_FIXTURE_${suspends}`, summary: { diagnostics: 0 },
    ...(suspends ? { suspendsMidInstruction: true } : {}),
    create(bus) {
      let cycles = 0;
      return {
        reset() {}, step() { return 10; },
        run(target) {
          let total = 0;
          while (total < target) {
            cycles = 0;
            bus.timing?.(total, target);
            cycles = 7;
            bus.write(0x10, 0);
            total += 10;
          }
          cycles = 0;
          bus.timing?.(Math.min(total, target), Math.min(total, target));
          return total;
        },
        elapsedCycles: () => cycles,
        setIrqLine() {}, setInputLine() {}, nmi() {}, get() { return 0; },
        stateInt() { return 0; }, set() {}, invoke() { return 0; }, hasMethod() { return false; },
      };
    },
  });
}
registerGeneratedDevice({
  type: 'ORDER_FIXTURE', constants: {}, callbacks: [],
  members: [
    { name: 'm_last', valueType: 'double', initial: 0 },
    { name: 'm_backwards', valueType: 'int', bits: 32, initial: 0 },
    { name: 'm_fired', valueType: 'int', bits: 32, initial: 0 },
    { name: 'm_timer', valueType: 'emu_timer *', initial: 0 },
  ],
  timers: [{ member: 'm_timer', callback: 'tick' }],
  methods: [
    { name: 'device_start', parameters: '', program: compileMameHandler(
      'm_timer->adjust(attotime::from_hz(997), 0, attotime::from_hz(997));') },
    { name: 'observe', parameters: '', program: compileMameHandler(
      'double now = machine().time().as_double(); if (now < m_last) m_backwards++; m_last = now;') },
    { name: 'tick', parameters: '', program: compileMameHandler('m_fired++; observe();') },
    { name: 'write', parameters: 'offs_t offset, u8 data', program: compileMameHandler('observe();') },
  ],
  start: 'device_start',
  summary: { diagnostics: 0 },
});
for (const suspends of [true, false]) {
  const orderMachine: BoardIr = {
    ...beamTimerMachine,
    game: `order-fixture-${suspends}`,
    devices: [{ id: 'device:order', tag: 'probe', type: 'ORDER_FIXTURE', member: 'm_probe' }],
    execution: {
      ...beamTimerMachine.execution,
      // Scheduled line by line, as the C64's set_perfect_quantum has it. In
      // rounds spanning lines the device clock runs ahead of the processor
      // by design, which is a different order from the one tested here.
      perfectQuantum: true,
      cpus: [{
        ...beamTimerMachine.execution.cpus[0]!,
        type: `ORDER_CPU_FIXTURE_${suspends}`,
        // Forty whole cycles a line, as the PAL C64 has 63: a fractional line
        // leaves the beam a part-cycle past the processor at each settle.
        clock: 60 * 262 * 40,
        ranges: [{ start: 0x10, end: 0x10, kind: 'handler', write: 'probe.write' }],
      }],
    },
  };
  const orderBoard = createGeneratedBoard(orderMachine,
    { game: orderMachine.game, family: 'fixture', cpus: [], ranges: [],
      screen: { width: 1, height: 240, refresh: 60, vtotal: 262, vbstart: 241, rotate: 0 },
      clocks: { namco06: 0, wsg: 0 } },
    { maincpu: Uint8Array.of(0) }, { read: () => 0xff }, { soundWrite() {} });
  for (let frame = 0; frame < 10; frame++) orderBoard.frame(beamFrame);
  const probe = (orderBoard as unknown as { devices: Map<string, Device> }).devices.get('probe')!;
  assert.ok(probe.get('m_fired') > 150, `the order fixture's timer must run (${probe.get('m_fired')} firings)`);
  if (suspends) {
    assert.equal(probe.get('m_backwards'), 0, 'a timer due inside an instruction fires before its later accesses');
  } else {
    assert.ok(probe.get('m_backwards') > 0, 'a whole-instruction core services its timers after the instruction');
  }
}

// MAME's `-iec8 ""`: the slot stays and selects nothing, and its card goes
// with everything it composed. A slot that is not a slot device is ignored.
const cardCpu = { tag: 'iec8:c1541:ucd5', type: 'm6502', clock: 1e6, region: 'ucd5', ranges: [] };
const cardCallback = { id: 'cb:via', ownerTag: 'iec8:c1541:uab1', signal: 'irq_handler', operation: 'set', targetClass: 'c1541_device_base', targetMethod: 'via0_irq_w' };
const hostCallback = { id: 'cb:tape', ownerTag: 'tape', signal: 'read_handler', operation: 'set', targetClass: 'c64_state', targetMethod: 'cass_rd_w' };
const slotted = {
  ...opcodeMachine,
  devices: [
    { id: 'd:tape', tag: 'tape', type: 'PET_DATASSETTE_PORT', slotDefault: 'c1530' },
    { id: 'd:iec8', tag: 'iec8', type: 'CBM_IEC_SLOT', slotDefault: 'c1541' },
    { id: 'd:card', tag: 'iec8:c1541', type: 'C1541' },
    { id: 'd:via', tag: 'iec8:c1541:uab1', type: 'MOS6522' },
    { id: 'd:iec80', tag: 'iec80', type: 'NOT_UNDER_IEC8' },
  ],
  callbacks: [cardCallback, hostCallback],
  connections: [
    { callbackId: 'cb:via', effect: { kind: 'handler', handler: 'c1541_device_base.via0_irq_w', deviceTag: 'iec8:c1541:uab1' }, transforms: [] },
    { callbackId: 'cb:tape', effect: { kind: 'handler', handler: 'c64_state.cass_rd_w' }, transforms: [] },
  ],
  execution: {
    ...opcodeMachine.execution,
    cpus: [...opcodeMachine.execution.cpus, cardCpu],
    participants: [{ tag: 'iec8:c1541:ucd5', kind: 'cpu', clock: 1e6 }],
  },
} as unknown as BoardIr;
assert.equal(withEmptySlots(slotted, undefined), slotted);
assert.equal(withEmptySlots(slotted, ['nothing']), slotted, 'a tag that is no slot changes nothing');
const noDrive = withEmptySlots(slotted, ['iec8']);
assert.deepEqual(noDrive.devices!.map(device => [device.tag, device.slotDefault]),
  [['tape', 'c1530'], ['iec8', ''], ['iec80', undefined]], 'the slot stays empty; its card goes, a lookalike tag stays');
assert.deepEqual(noDrive.callbacks.map(callback => callback.id), ['cb:tape']);
assert.deepEqual(noDrive.connections.map(connection => connection.callbackId), ['cb:tape']);
assert.deepEqual(noDrive.execution.cpus.map(cpu => cpu.tag), opcodeMachine.execution.cpus.map(cpu => cpu.tag),
  'the card processor leaves the schedule');
assert.deepEqual(noDrive.execution.participants, []);
assert.equal(slotted.devices!.length, 5, 'the shared IR is not edited in place');
const noTape = withEmptySlots(slotted, ['tape']);
assert.equal(noTape.devices!.find(device => device.tag === 'tape')!.slotDefault, '');
assert.equal(noTape.execution.cpus.length, slotted.execution.cpus.length);

console.log('generated-board.spec: shares, CPU lines, flip-screen state and CPU buses passed');
