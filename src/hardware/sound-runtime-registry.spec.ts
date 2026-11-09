import assert from 'node:assert/strict';
import type { BoardIr } from '../ir/board.ts';
import { installSoundRuntime } from './sound-runtime-registry.ts';
import type { SoundRuntimeContext } from './sound-runtime.ts';

const writes: unknown[][] = [];
const calls: SoundRuntimeContext['calls'] = {};
// A sound kind with no installer of its own routes by method name: a driver
// callback reaching the board through its finder is forwarded like a bus write.
const board = {
  devices: [{ tag: 'soundboard', type: 'TEST_AUDIO', member: 'm_soundboard' }],
} as unknown as BoardIr;
const sound = {
  kind: 'test',
  deviceTag: 'soundboard',
  deviceType: 'TEST_AUDIO',
  writeMethods: ['write'],
  enableMethods: [],
  controlOffset: -1,
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
  deviceStream: () => [],
  runCallbackHandler: () => undefined,
  dispatch: () => {},
  readSignal: () => undefined,
  readProgram: () => 0xff,
  stallCpu: () => {},
  setCpuInputLine: () => {}, perfectQuantum: () => {}, synchronize: run => run(),
});

assert.equal(typeof calls['m_soundboard.write'], 'function');
calls['m_soundboard.write']!(2, 0x91);
calls['m_soundboard.write']!(0x42);
assert.deepEqual(writes, [
  [2, 0x91, 0.25, 'write'],
  [0, 0x42, 0.25, 'write'],
]);

console.log('sound-runtime-registry.spec: callback-reached sound writes passed');



