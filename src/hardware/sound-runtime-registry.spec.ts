import assert from 'node:assert/strict';
import type { BoardIr } from '../ir/board.ts';
import { installSoundRuntime } from './sound-runtime-registry.ts';
import type { SoundRuntimeContext } from './sound-runtime.ts';

const writes: unknown[][] = [];
const calls: SoundRuntimeContext['calls'] = {};
const board = {
  devices: [{ tag: 'discrete', type: 'DISCRETE', member: 'm_discrete' }],
} as unknown as BoardIr;
const sound = {
  kind: 'discrete',
  deviceTag: 'discrete',
  deviceType: 'DISCRETE',
  writeMethods: ['write'],
  enableMethods: [],
  controlOffset: -1,
  writeOffsets: { DAC_DATA: 1 },
} as NonNullable<BoardIr['sound']>;

installSoundRuntime({
  board,
  regions: {},
  sound,
  registry: { read: {}, write: {} },
  calls,
  state: {},
  soundWrite: (...args) => writes.push(args),
  soundData: () => {},
  fraction: () => 0.25,
  callDevice: () => undefined,
  runCallbackHandler: () => undefined,
  dispatch: () => {},
  readSignal: () => undefined,
  readProgram: () => 0xff,
  stallCpu: () => {},
  setCpuInputLine: () => {},
});

assert.equal(typeof calls['m_discrete.write'], 'function');
calls['m_discrete.write']!(2, 0x91);
calls['m_discrete.write']!({ reference: 'DAC_DATA' } as unknown as number, 0x42);
assert.deepEqual(writes, [
  [2, 0x91, 0.25, 'write'],
  [1, 0x42, 0.25, 'write'],
]);

console.log('sound-runtime-registry.spec: callback-reached sound writes passed');

const williamsCalls: SoundRuntimeContext['calls'] = {};
const williamsDeviceCalls: unknown[][] = [];
installSoundRuntime({
  board: {
    callbacks: [{
      id: 'pia-command',
      ownerTag: 'pia_1',
      signal: 'writepb_handler',
      operation: 'set',
      targetClass: 'williams_state',
      targetMethod: 'snd_cmd_w',
    }],
    devices: [
      { id: 'pia-2', tag: 'pia_2', type: 'PIA6821' },
      { id: 'dac', tag: 'dac', type: 'MC1408' },
    ],
  } as BoardIr,
  regions: {},
  sound: {
    kind: 'dac',
    deviceTag: 'dac',
    deviceType: 'MC1408',
    writeMethods: ['data_w'],
    enableMethods: [],
    controlOffset: -1,
  },
  registry: { read: {}, write: {} },
  calls: williamsCalls,
  state: {},
  soundWrite: () => {},
  soundData: () => {},
  fraction: () => 0,
  callDevice: (...args) => {
    williamsDeviceCalls.push(args);
    return 0;
  },
  runCallbackHandler: () => undefined,
  dispatch: () => {},
  readSignal: () => undefined,
  readProgram: () => 0xff,
  stallCpu: () => {},
  setCpuInputLine: () => {},
});

assert.equal(typeof williamsCalls['williams_state.snd_cmd_w'], 'function');
williamsCalls['williams_state.snd_cmd_w']!(0x15);
williamsCalls['williams_state.snd_cmd_w']!(0x3f);
assert.deepEqual(williamsDeviceCalls, [
  ['pia_2', 'portb_w', 0xd5],
  ['pia_2', 'cb1_w', 1],
  ['pia_2', 'portb_w', 0xff],
  ['pia_2', 'cb1_w', 0],
]);

console.log('sound-runtime-registry.spec: Williams PIA sound-command bridge passed');
