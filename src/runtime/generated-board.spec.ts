import assert from 'node:assert/strict';
import type { BoardIr } from '../ir/board.ts';
import {
  applyGeneratedCpuInputLine,
  bindGeneratedDriverState,
  bindGeneratedRegionState,
  bindGeneratedShareState,
  createGeneratedBoard,
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

let resets = 0;
let nmis = 0;
let irqs = 0;
let held = false;
const lineCpu = {
  reset() { resets++; },
  step() { return 1; },
  run(cycles: number) { return cycles; },
  setIrqLine() { irqs++; },
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
applyGeneratedCpuInputLine(lineCpu, -1, 1, state => { held = state; });
assert.equal(nmis, 1);
applyGeneratedCpuInputLine(lineCpu, 0, 2, state => { held = state; });
assert.equal(irqs, 1);

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

console.log('generated-board.spec: shares, CPU lines, flip-screen state and opcode bus passed');
