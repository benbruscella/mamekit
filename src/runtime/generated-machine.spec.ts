import type { BoardIr } from '../ir/board.ts';
import { BOARD_IR_SCHEMA_VERSION } from '../ir/version.ts';
import {
  callbackTarget,
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
      ownerTag: 'mainlatch', signal: 'q_out_cb', slot: 7, operation: 'set',
      targetClass: 'fixture_state', targetMethod: 'bookkeeping_w',
    },
    {
      id: 'callback:3',
      ownerTag: 'mainlatch', signal: 'parallel_out_cb', operation: 'set',
      targetClass: 'fixture_state', targetMethod: 'parallel_w',
      transforms: ['mask(0x33)'],
    },
    // MAME .set_nop(): an output the board deliberately leaves unconnected.
    { id: 'callback:4', ownerTag: 'mainlatch', signal: 'nop_out_cb', operation: 'set_nop' },
  ],
};

clearGeneratedMachines();
registerGeneratedMachine(machine);
check('registry', generatedMachine('fixture'), machine);
check('target class', callbackTarget(machine.callbacks[0]!), 'fixture_state.irq_w');
check('target tag wins', callbackTarget(machine.callbacks[1]!), 'screen.flip_w');

const listeners = new Map<number, (...args: number[]) => void>();
const device = {
  on: (_signal: string, callback: (...args: number[]) => void, slot = 0) => {
    listeners.set(slot, callback);
  },
};

// callback:2 (bookkeeping_w) has no endpoint. Silently skipping it is what
// produced boards that boot and then behave wrongly, so it must throw.
throws(
  'an unbindable callback fails instead of being ignored',
  () => wireDeviceCallbacks(device, machine, 'mainlatch', 'q_out_cb', {
    'fixture_state.irq_w': () => {},
    'screen.flip_w': () => {},
  }),
  'unresolved callback endpoints',
);

const states: number[] = [];
const bound = wireDeviceCallbacks(device, machine, 'mainlatch', 'q_out_cb', {
  'fixture_state.irq_w': state => states.push(state),
  'screen.flip_w': state => states.push(state * 10),
  'fixture_state.bookkeeping_w': state => states.push(state * 100),
});
listeners.get(0)?.(0, 1);
listeners.get(1)?.(1);
check('generated callbacks execute with transforms', states, [1, 0]);
check('bound targets', bound, [
  'fixture_state.irq_w',
  'screen.flip_w',
  'fixture_state.bookkeeping_w',
]);

const parallel: number[] = [];
wireDeviceCallbacks(device, machine, 'mainlatch', 'parallel_out_cb', {
  'fixture_state.parallel_w': state => parallel.push(state),
});
listeners.get(0)?.(0, 0x33, 0x02);
check('parallel callbacks forward data instead of access mask', parallel, [0x33]);

check(
  'an explicitly unconnected output needs no endpoint',
  wireDeviceCallbacks(device, machine, 'mainlatch', 'nop_out_cb', {}),
  [],
);

console.log(`generated-machine.spec: ${passed} passed, 0 failed`);
