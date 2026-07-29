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

function context(): SoundRuntimeContext & { writes: [number, number, string | undefined][] } {
  const writes: [number, number, string | undefined][] = [];
  return {
    writes,
    board: {
      schemaVersion: BOARD_IR_SCHEMA_VERSION,
      game: 'gng', family: 'gng', driverFile: 'src/mame/capcom/gng.cpp',
      callbacks: [], connections: [],
      devices: [
        { id: 'a', tag: 'ym1', type: 'YM2203', member: 'm_ym1' },
        { id: 'b', tag: 'ym2', type: 'YM2203', member: 'm_ym2' },
      ],
      execution: {
        cpus: [{ tag: 'audiocpu', clock: 1, region: 'audiocpu' }],
        screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
        frameEvents: [],
      },
      sound,
    },
    sound,
    registry: { read: {}, write: {} },
    calls: {},
    state: {},
    soundWrite: (offset, data, _frac, method) => writes.push([offset, data, method]),
    fraction: () => 0,
    callDevice: () => undefined,
    runCallbackHandler: () => undefined,
    dispatch: () => {},
  };
}

// Each chip exposes an address/data port pair, addressed as chip * 2 + port,
// so one worklet hosts every chip on the board.
check('port writes land in the chip\'s port pair', () => {
  const ctx = context();
  installYm2203Runtime(ctx);
  ctx.registry.write['ym1.write']!(0, 0, 0x28);
  ctx.registry.write['ym1.write']!(0, 1, 0x0f);
  ctx.registry.write['ym2.write']!(0, 1, 0x33);
  assert.deepEqual(ctx.writes, [
    [0, 0x28, 'write'],
    [1, 0x0f, 'write'],
    [3, 0x33, 'write'],
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

console.log(`ym2203.spec: ${passed} passed, 0 failed`);
