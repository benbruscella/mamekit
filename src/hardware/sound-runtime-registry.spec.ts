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
