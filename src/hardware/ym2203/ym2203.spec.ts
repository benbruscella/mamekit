import assert from 'node:assert/strict';
import type { BoardIr } from '../../ir/board.ts';
import { BOARD_IR_SCHEMA_VERSION } from '../../ir/version.ts';
import type { SoundRuntimeContext } from '../sound-runtime.ts';
import { installYm2203Runtime } from './runtime.ts';

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

type Sound = NonNullable<BoardIr['sound']>;

const sound: Sound = {
  kind: 'ym2203',
  deviceTag: 'ym1',
  deviceTags: ['ym1', 'ym2'],
  deviceType: 'YM2203',
  writeMethods: ['write'],
  enableMethods: [],
  controlOffset: -1,
};

function context(auxiliary = false):
SoundRuntimeContext & { writes: [number, number, string | undefined][] } {
  const writes: [number, number, string | undefined][] = [];
  const contextSound: Sound = auxiliary
    ? {
        ...sound,
        auxiliaryDevices: [{
          type: 'YM3526',
          deviceTag: 'ym2',
          member: 'm_ym2',
          clock: 3_000_000,
          gain: 0.5,
          target: 'mono',
          writeMethods: ['write'],
        }],
      }
    : sound;
  return {
    writes,
    board: {
      schemaVersion: BOARD_IR_SCHEMA_VERSION,
      game: 'gng', family: 'gng', driverFile: 'src/mame/capcom/gng.cpp',
      callbacks: [], connections: [],
      devices: [
        { id: 'a', tag: 'ym1', type: 'YM2203', member: 'm_ym1', clock: 1 },
        { id: 'b', tag: 'ym2', type: 'YM2203', member: 'm_ym2', clock: 1 },
      ],
      execution: {
        cpus: [{ tag: 'audiocpu', clock: 1, region: 'audiocpu' }],
        screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
        frameEvents: [],
      },
      sound: contextSound,
    },
    sound: contextSound,
    registry: { read: {}, write: {} },
    calls: {},
    state: {},
    soundWrite: (offset, data, _frac, method) => writes.push([offset, data, method]),
    soundData: () => {},
    fraction: () => 0,
    callDevice: () => undefined,
    runCallbackHandler: () => undefined,
    dispatch: () => {},
    readSignal: () => undefined,
    readProgram: () => 0xff,
    stallCpu: () => {},
    setCpuInputLine: () => {},
  };
}

// Each chip exposes an address/data port pair, addressed as chip * 2 + port,
// so one worklet hosts every chip on the board.
check('port writes land in the chip\'s port pair', () => {
  const ctx = context();
  installYm2203Runtime(ctx);
  ctx.registry.write['ym1.write']!(0, 0, 0x07);
  ctx.registry.write['ym1.write']!(0, 1, 0x0f);
  ctx.registry.write['ym2.write']!(0, 1, 0x33);
  assert.deepEqual(ctx.writes, [
    [0, 0x07, 'write'],
    [1, 0x0f, 'write'],
    [3, 0x33, 'write'],
  ]);
  assert.equal(ctx.registry.read['ym1.read']!(0, 0), 0);
  assert.equal(ctx.registry.read['ym1.read']!(0, 1), 0x0f);
});

check('YM2610 preserves both address/data banks', () => {
  const ctx = context();
  ctx.sound = { ...sound, deviceTags: ['ym1'], deviceType: 'YM2610' };
  ctx.board.sound = ctx.sound;
  ctx.board.devices = [
    { id: 'a', tag: 'ym1', type: 'YM2610', member: 'm_ym1', clock: 1 },
  ];
  installYm2203Runtime(ctx);
  for (let offset = 0; offset < 4; offset++) {
    ctx.registry.write['ym1.write']!(0, offset, 0x20 + offset);
  }
  assert.deepEqual(ctx.writes, [
    [0, 0x20, 'write'],
    [1, 0x21, 'write'],
    [2, 0x22, 'write'],
    [3, 0x23, 'write'],
  ]);
});

check('a reset reaches the chip through its generated device port', () => {
  const ctx = context();
  installYm2203Runtime(ctx);
  ctx.calls['m_ym2.reset']!();
  assert.deepEqual(ctx.writes, [[2, 0, 'reset']]);
});

check('generated handlers reach each chip by alias', () => {
  const ctx = context();
  installYm2203Runtime(ctx);
  for (const alias of ['ym1', 'm_ym1', 'm_ym2', 'ym2']) {
    assert.equal(typeof ctx.calls[`${alias}.write`], 'function');
  }
});

check('auxiliary YM3526 writes follow the primary YM2203 port pair', () => {
  const ctx = context(true);
  installYm2203Runtime(ctx);
  ctx.registry.write['ym2.write']!(0, 0, 0x20);
  ctx.calls['m_ym2.write']!(1, 0x01);
  assert.deepEqual(ctx.writes, [
    [4, 0x20, 'ym2.write'],
    [5, 0x01, 'ym2.write'],
  ]);
  assert.equal(ctx.registry.read['ym2.read']!(0, 0), 0x06);
  assert.equal(ctx.registry.read['ym2.read']!(0, 1), 0xff);
});

check('standalone OPL and MSM5205 boards expose both auxiliary write surfaces', () => {
  const ctx = context();
  const standalone: Sound = {
    ...sound,
    deviceTag: 'ymsnd',
    deviceTags: [],
    deviceType: 'YM3526',
    writeMethods: [],
    auxiliaryDevices: [{
      type: 'YM3526',
      deviceTag: 'ymsnd',
      clock: 4_000_000,
      gain: 1,
      target: 'mono',
      writeMethods: ['write'],
    }, {
      type: 'MSM5205',
      deviceTag: 'msm',
      clock: 400_000,
      gain: 0.5,
      target: 'mono',
      writeMethods: ['data_w', 'reset_w'],
    }],
  };
  ctx.sound = standalone;
  ctx.board.sound = standalone;
  ctx.board.devices = [
    { id: 'opl', tag: 'ymsnd', type: 'YM3526', clock: 4_000_000 },
    { id: 'msm', tag: 'msm', type: 'MSM5205', member: 'm_msm', clock: 400_000 },
  ];
  installYm2203Runtime(ctx);
  ctx.calls['ymsnd.write']!(0, 0x20);
  ctx.calls['m_msm.data_w']!(0x0f);
  assert.deepEqual(ctx.writes, [
    [0, 0x20, 'ymsnd.write'],
    [2, 0x0f, 'msm.data_w'],
  ]);
});

check('YM2203 timers assert and clear the generated IRQ callback', () => {
  const ctx = context();
  const irq: number[] = [];
  ctx.dispatch = (tag, signal, value) => {
    assert.equal(tag, 'ym1');
    assert.equal(signal, 'irq_handler');
    irq.push(value);
  };
  const hooks = installYm2203Runtime(ctx);
  // Timer B period: 16 * (256 - 0xff) * 12 operators * /6 prescale.
  ctx.registry.write['ym1.write']!(0, 0, 0x26);
  ctx.registry.write['ym1.write']!(0, 1, 0xff);
  ctx.registry.write['ym1.write']!(0, 0, 0x27);
  ctx.registry.write['ym1.write']!(0, 1, 0x0a);
  hooks.tickCpu?.('audiocpu', 1_151);
  assert.deepEqual(irq, []);
  hooks.tickCpu?.('audiocpu', 1);
  assert.deepEqual(irq, [1]);
  assert.equal(ctx.registry.read['ym1.read']!(0, 0) & 0x02, 0x02);
  ctx.registry.write['ym1.write']!(0, 0, 0x27);
  ctx.registry.write['ym1.write']!(0, 1, 0x2a);
  assert.deepEqual(irq, [1, 0]);
});

console.log(`ym2203.spec: ${passed} passed, 0 failed`);
