import type { BoardIr } from '../ir/board.ts';
import { BOARD_IR_SCHEMA_VERSION } from '../ir/version.ts';
import { applyBoardTransforms, bindBoardEffects, type EffectBindings } from './generated-effects.ts';
import {
  clearGeneratedMachines,
  generatedMachine,
  registerGeneratedMachine,
  wireDeviceCallbacks,
} from './generated-machine.ts';

let passed = 0;
function check(name: string, actual: unknown, expected: unknown): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
  passed++;
}

function throws(name: string, run: () => void, includes: string): void {
  try {
    run();
  } catch (error) {
    if (!String((error as Error).message).includes(includes)) {
      throw new Error(`${name}: expected message containing "${includes}", got ${(error as Error).message}`);
    }
    passed++;
    return;
  }
  throw new Error(`${name}: expected a throw`);
}

const machine: BoardIr = {
  schemaVersion: BOARD_IR_SCHEMA_VERSION,
  game: 'fixture',
  family: 'fixture',
  driverFile: 'src/mame/fixture.cpp',
  execution: {
    cpus: [],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
    frameEvents: [],
  },
  callbacks: [
    {
      id: 'callback:0',
      ownerTag: 'mainlatch', signal: 'q_out_cb', slot: 0, operation: 'set',
      targetClass: 'fixture_state', targetMethod: 'irq_w',
    },
    {
      id: 'callback:1',
      ownerTag: 'mainlatch', signal: 'q_out_cb', slot: 1, operation: 'set',
      targetTag: 'screen', targetClass: 'screen_device', targetMethod: 'flip_w',
      transforms: ['invert'],
    },
    {
      id: 'callback:2',
      ownerTag: 'mainlatch', signal: 'parallel_out_cb', operation: 'set',
      targetClass: 'fixture_state', targetMethod: 'parallel_w',
      transforms: ['mask(0x33)'],
    },
    // MAME .set_nop(): an output the board deliberately leaves unconnected.
    { id: 'callback:3', ownerTag: 'mainlatch', signal: 'nop_out_cb', operation: 'set_nop' },
  ],
  connections: [
    {
      callbackId: 'callback:0',
      effect: { kind: 'handler', handler: 'fixture_state.irq_w' },
      transforms: [],
    },
    {
      callbackId: 'callback:1',
      effect: { kind: 'device-method', tag: 'screen', method: 'flip_w' },
      transforms: [{ kind: 'invert' }],
    },
    {
      callbackId: 'callback:2',
      effect: { kind: 'handler', handler: 'fixture_state.parallel_w' },
      transforms: [{ kind: 'mask', value: 0x33 }],
    },
    { callbackId: 'callback:3', effect: { kind: 'unconnected' }, transforms: [] },
  ],
};

clearGeneratedMachines();
registerGeneratedMachine(machine);
check('registry', generatedMachine('fixture'), machine);

check('transforms compose in order', applyBoardTransforms(0xff, [
  { kind: 'mask', value: 0xf0 },
  { kind: 'rshift', bits: 4 },
]), 0x0f);
// digdug/galaga shift LS259 bits into the 53xx K-port MOD field.
check('lshift is applied', applyBoardTransforms(1, [{ kind: 'lshift', bits: 3 }]), 8);

const states: number[] = [];
const bindings: EffectBindings = {
  cpuLine: () => undefined,
  deviceMethod: (tag, method) =>
    tag === 'screen' && method === 'flip_w' ? state => states.push(state * 10) : undefined,
  handler: key => key === 'fixture_state.irq_w'
    ? state => states.push(state)
    : key === 'fixture_state.parallel_w'
      ? state => parallel.push(state)
      : undefined,
  portRead: () => undefined,
  videoControl: () => undefined,
  audioControl: () => undefined,
  audioWrite: () => undefined,
};
const parallel: number[] = [];

// A connection the runtime cannot execute aborts construction. Silently
// skipping one produced machines that booted and then behaved wrongly.
throws(
  'an unbindable effect fails board construction',
  () => bindBoardEffects(
    {
      ...machine,
      connections: [{
        callbackId: 'callback:0',
        effect: { kind: 'device-method', tag: 'absent', method: 'w' },
        transforms: [],
        source: { file: 'src/mame/fixture.cpp', line: 7 },
      }],
    },
    bindings,
  ),
  'cannot execute these connections',
);

const effects = bindBoardEffects(machine, bindings);

const listeners = new Map<number, (...args: number[]) => void>();
const device = {
  on: (_signal: string, callback: (...args: number[]) => void, slot = 0) => {
    listeners.set(slot, callback);
  },
};

const bound = wireDeviceCallbacks(device, machine, 'mainlatch', 'q_out_cb', effects);
listeners.get(0)?.(0, 1);
listeners.get(1)?.(1);
check('bound effects execute with their transforms', states, [1, 0]);
check('wiring reports the callbacks it bound', bound, ['callback:0', 'callback:1']);

wireDeviceCallbacks(device, machine, 'mainlatch', 'parallel_out_cb', effects);
listeners.get(0)?.(0, 0x33, 0x02);
check('parallel callbacks forward data instead of access mask', parallel, [0x33]);

check(
  'an explicitly unconnected output binds to a no-op',
  wireDeviceCallbacks(device, machine, 'mainlatch', 'nop_out_cb', effects),
  ['callback:3'],
);

console.log(`generated-machine.spec: ${passed} passed, 0 failed`);
