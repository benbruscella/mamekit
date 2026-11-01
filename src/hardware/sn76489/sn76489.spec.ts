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
    type: 'DAC_1BIT',
    deviceTag: 'dac',
    member: 'm_dac',
    clock: 0,
    gain: 0.25,
    target: 'speaker',
    writeMethods: ['write'],
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
    { id: 'dac', tag: 'dac', type: 'DAC_1BIT', member: 'm_dac' },
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
  perfectQuantum: () => {}, synchronize: run => run(),
};

installSn76489Runtime(context);
context.calls['m_dac.write']!(1);
context.calls['m_sn1.write']!(0x9f);

assert.deepEqual(writes, [
  [0, 1, 'dac.write'],
  [0, 0x9f, undefined],
]);

console.log('sn76489.spec: the PSG and a routed device keep independent protocols');
