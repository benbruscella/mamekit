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
assert.equal(timingDevice.get('m_seconds'), busWriteTime,
  'a delayed timer must not observe time earlier than an already delivered bus write');
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
const clockedMachine: BoardIr = {
  ...screenHostMachine, game: 'clocked-counter-fixture',
  devices: [{ id: 'clocked-counter', tag: 'counter', type: 'CLOCKED_COUNTER_FIXTURE', clock: 6000 }],
  execution: { ...screenHostMachine.execution,
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

let system16bRomWord = -1;
let system16bRamWord = -1;
registerGeneratedCpu({
  // Use a generated 16-bit CPU family name so the fixture exercises the
  // mapper through the same native word path as System 16B's 68000.
  type: 'm68010',
  summary: { diagnostics: 0 },
  create(bus) {
    return {
      reset() {},
      step() { return 1; },
      run(cycles) {
        system16bRomWord = bus.read16be?.(0) ?? -1;
        // Region 3 is work RAM. Relocate it to $500000 through the mapper's
        // repeating low-byte register aperture, then prove its installed
        // window still carries complete 68000 words.
        bus.write16be?.(0xff002e, 0x0050);
        bus.write16be?.(0x500000, 0xabcd);
        system16bRamWord = bus.read16be?.(0x500000) ?? -1;
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
const system16bMachine: BoardIr = {
  ...opcodeMachine,
  game: 'system16b-mapper-fixture',
  family: 'segas16b',
  devices: [
    { id: 'device:maincpu', tag: 'maincpu', type: 'M68010' },
    { id: 'device:sprites', tag: 'sprites', type: 'SEGA_SYS16B_SPRITES' },
  ],
  execution: {
    ...opcodeMachine.execution,
    cpus: [{
      tag: 'maincpu',
      type: 'm68010',
      clock: 60,
      region: 'maincpu',
      mask: 0xffffff,
      ranges: [
        {
          start: 0,
          end: 0xffffff,
          kind: 'handler',
          umask: 0x00ff,
          read: 'mapper.read',
          write: 'mapper.write',
        },
        { start: 0x500000, end: 0x503fff, kind: 'ram', share: 'workram' },
      ],
    }],
  },
};
const system16bBoard = createGeneratedBoard(
  system16bMachine,
  {
    game: system16bMachine.game,
    family: 'segas16b',
    cpus: [],
    ranges: [],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 1, rotate: 0 },
    clocks: { namco06: 0, wsg: 0 },
  },
  { maincpu: Uint8Array.of(0x12, 0x34) },
  { read: () => 0xff },
  { soundWrite: () => {} },
);
system16bBoard.frame(new Uint32Array(1));
assert.equal(system16bRomWord, 0x1234, '315-5195 ROM windows must cover both data lanes');
assert.equal(system16bRamWord, 0xabcd, '315-5195 RAM windows must preserve 68000 words');

console.log('generated-board.spec: shares, CPU lines, flip-screen state and CPU buses passed');
