import assert from 'node:assert/strict';
import type { BoardIr } from '../../ir/board.ts';
import { BOARD_IR_SCHEMA_VERSION } from '../../ir/version.ts';
import type { SoundRuntimeContext } from '../sound-runtime.ts';
import { installYm2151Runtime } from './runtime.ts';

const sound: NonNullable<BoardIr['sound']> = {
  kind: 'ym2151',
  deviceTag: '2151',
  deviceTags: ['2151'],
  deviceType: 'YM2151',
  writeMethods: ['write'],
  enableMethods: [],
  controlOffset: -1,
};
const writes: [number, number, string | undefined][] = [];
const interrupts: number[] = [];
const context: SoundRuntimeContext = {
  board: {
    schemaVersion: BOARD_IR_SCHEMA_VERSION,
    game: 'cps1', family: 'cps1', driverFile: 'cps1.cpp',
    callbacks: [], connections: [],
    devices: [{ id: 'ym', tag: '2151', type: 'YM2151', clock: 1 }],
    execution: {
      cpus: [{
        tag: 'audiocpu', clock: 1, cycleClock: 1, region: 'audiocpu',
        ranges: [{ start: 0, end: 1, kind: 'handler', read: '2151.read', write: '2151.write' }],
      }],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
      frameEvents: [],
    },
    sound,
  },
  sound,
  registry: { read: {}, write: {} },
  calls: {}, state: {},
  soundWrite: (offset, data, _frac, method) => writes.push([offset, data, method]),
  soundData: () => {}, fraction: () => 0,
  callDevice: () => undefined, runCallbackHandler: () => undefined,
  dispatch: (_tag, signal, value) => {
    if (signal === 'irq_handler') interrupts.push(value);
  },
  readSignal: () => undefined, readProgram: () => 0xff,
  stallCpu: () => {}, setCpuInputLine: () => {},
};

const runtime = installYm2151Runtime(context);
const write = (register: number, value: number): void => {
  context.registry.write['2151.write']!(0, 0, register);
  context.registry.write['2151.write']!(0, 1, value);
};
write(0x10, 0xff);
write(0x11, 0x03);
write(0x14, 0x05); // load timer A and enable its interrupt
runtime.tickCpu?.('audiocpu', 63);
assert.equal(context.registry.read['2151.read']!(0, 0), 0);
runtime.tickCpu?.('audiocpu', 1);
assert.equal(context.registry.read['2151.read']!(0, 0), 1);
assert.deepEqual(interrupts, [1]);
write(0x14, 0x10); // reset timer A status and stop it
assert.equal(context.registry.read['2151.read']!(0, 0), 0);
assert.deepEqual(interrupts, [1, 0]);
assert.ok(writes.length > 0);

console.log('ym2151.spec: OPM ports, timers and IRQ callback passed');
