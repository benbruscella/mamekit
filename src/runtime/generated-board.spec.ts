import assert from 'node:assert/strict';
import type { BoardIr } from '../ir/board.ts';
import {
  applyGeneratedCpuInputLine,
  pulseGeneratedCpuInputLine,
  bindGeneratedDriverState,
  bindGeneratedRegionState,
  bindGeneratedShareState,
  createGeneratedBoard,
  generatedDeviceCallbackArguments,
  generatedSignalHandlerArguments,
} from './generated-board.ts';
import { registerGeneratedCpu } from './generated-cpu.ts';

const state: Record<string, unknown> = {};
const first = new Uint8Array(0x100);
const second = new Uint8Array(0x100);

bindGeneratedShareState(state, 'spriteram[0]', first);
bindGeneratedShareState(state, 'spriteram[1]', second);

assert.equal(state['m_spriteram[0]'], first);
assert.equal(state['m_spriteram[1]'], second);
assert.deepEqual(state.m_spriteram, [first, second]);
assert.equal((first as Uint8Array & { bytes(): number }).bytes(), 0x100);

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
  set() {},
  invoke() { return 0; },
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

const driverState: Record<string, unknown> = {};
const driverCalls: Record<string, (...args: number[]) => number | void> = {};
bindGeneratedDriverState(driverState, driverCalls);
assert.equal(driverCalls.flip_screen!(), 0);
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
      set() {},
      invoke() { return 0; },
    };
  },
});
const opcodeMachine: BoardIr = {
  schemaVersion: 3,
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
      set() {},
      invoke() { return 0; },
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
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 1, rotate: 0 },
    clocks: { namco06: 0, wsg: 0 },
  },
  { mcu: Uint8Array.of(0) },
  { read: port => port === 'IN0' ? 0xa5 : 0xff },
  { soundWrite: () => {} },
);
signalBoard.frame(new Uint32Array(1));
assert.equal(cpuSignalRead, 0xa5, 'CPU input callbacks must return the bound port value');
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
      set() {},
      invoke() { return 0; },
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

console.log('generated-board.spec: shares, CPU lines, flip-screen state and CPU buses passed');
