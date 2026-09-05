import assert from 'node:assert/strict';
import type { BoardIr } from '../../ir/board.ts';
import { BOARD_IR_SCHEMA_VERSION } from '../../ir/version.ts';
import type { SoundRuntimeContext } from '../sound-runtime.ts';
import { installSn76489Runtime } from './runtime.ts';

type Sound = NonNullable<BoardIr['sound']>;

const sound: Sound = {
  kind: 'sn76489',
  deviceTag: 'sn1',
  deviceTags: ['sn1', 'sn2'],
  deviceType: 'SN76489A',
  writeMethods: ['write'],
  enableMethods: [],
  controlOffset: -1,
  auxiliaryDevices: [{
    type: 'SAMPLES',
    deviceTag: 'samples',
    member: 'm_samples',
    clock: 0,
    gain: 0.25,
    target: 'speaker',
    writeMethods: ['start', 'stop', 'set_volume'],
  }],
};

const board: BoardIr = {
  schemaVersion: BOARD_IR_SCHEMA_VERSION,
  game: 'fixture',
  family: 'fixture',
  driverFile: 'src/mame/fixture.cpp',
  callbacks: [],
  connections: [],
  devices: [
    { id: 'sn1', tag: 'sn1', type: 'SN76489A', member: 'm_sn1' },
    { id: 'samples', tag: 'samples', type: 'SAMPLES', member: 'm_samples' },
  ],
  execution: {
    cpus: [{ tag: 'maincpu', clock: 1, region: 'maincpu' }],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
    frameEvents: [],
  },
  sound,
};

const writes: [number, number, string | undefined][] = [];
const context: SoundRuntimeContext = {
  board,
  sound,
  registry: { read: {}, write: {} },
  calls: {},
  state: {},
  soundWrite: (offset, data, _frac, method) => writes.push([offset, data, method]),
  soundData: () => {},
  fraction: () => 0,
  callDevice: () => undefined,
  deviceStream: () => [],
  runCallbackHandler: () => undefined,
  dispatch: () => {},
  readSignal: () => undefined,
  readProgram: () => 0xff,
  stallCpu: () => {},
  setCpuInputLine: () => {},
  perfectQuantum: () => {},
};

installSn76489Runtime(context);
context.calls['m_samples.start']!(3, 5, 1);
context.calls['samples.set_volume']!(3, 0.5);
context.calls['m_samples.stop']!(3);

assert.deepEqual(writes, [
  [3, 0x85, 'samples.start'],
  [3, 128, 'samples.set_volume'],
  [3, 0, 'samples.stop'],
]);

console.log('sn76489.spec: PSG and routed samples keep independent protocols');
