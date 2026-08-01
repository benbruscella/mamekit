import assert from 'node:assert/strict';
import type { BoardIr } from '../../ir/board.ts';
import { BOARD_IR_SCHEMA_VERSION } from '../../ir/version.ts';
import type { SoundRuntimeContext } from '../sound-runtime.ts';
import { installAy8910Runtime } from './runtime.ts';

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

type Sound = NonNullable<BoardIr['sound']>;

function board(sound: Sound): BoardIr {
  return {
    schemaVersion: BOARD_IR_SCHEMA_VERSION,
    game: 'fixture',
    family: 'fixture',
    driverFile: 'src/mame/fixture.cpp',
    callbacks: [],
    connections: [],
    devices: [{ id: 'd', tag: sound.deviceTag, type: 'AY8910', member: 'm_ay' }],
    execution: {
      cpus: [{ tag: 'maincpu', clock: 1, region: 'maincpu' }],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
      frameEvents: [],
    },
    sound,
  };
}

function context(sound: Sound): SoundRuntimeContext & {
  writes: [number, number, string | undefined][];
} {
  const writes: [number, number, string | undefined][] = [];
  return {
    writes,
    board: board(sound),
    sound,
    registry: { read: {}, write: {} },
    calls: {},
    state: {},
    soundWrite: (offset, data, _frac, method) => writes.push([offset, data, method]),
    soundData: () => {},
    fraction: () => 0,
    callDevice: () => undefined,
    runCallbackHandler: () => undefined,
    dispatch: () => {},
    readProgram: () => 0xff,
    stallCpu: () => {},
    setCpuInputLine: () => {},
  };
}

const base: Sound = {
  kind: 'ay8910',
  deviceTag: 'ay',
  deviceType: 'AY8910',
  writeMethods: ['data_w'],
  enableMethods: [],
  controlOffset: -1,
};

check('a register write reaches the sink at the chip register offset', () => {
  const ctx = context(base);
  installAy8910Runtime(ctx);
  ctx.registry.write['ay.address_w']!(0, 0, 7);
  ctx.registry.write['ay.data_w']!(0, 0, 0x3f);
  assert.deepEqual(ctx.writes, [[7, 0x3f, undefined]]);
});

// One worklet hosts every chip on the board: chip N owns registers N*16..+15.
check('a second chip writes into its own register bank', () => {
  const sound: Sound = { ...base, deviceTags: ['ay1', 'ay2'] };
  const ctx = context(sound);
  installAy8910Runtime(ctx);
  ctx.registry.write['ay2.address_w']!(0, 0, 3);
  ctx.registry.write['ay2.data_w']!(0, 0, 0x11);
  assert.deepEqual(ctx.writes, [[16 + 3, 0x11, undefined]]);
});

check('an unread port returns the last value written to it', () => {
  const ctx = context(base);
  installAy8910Runtime(ctx);
  ctx.registry.write['ay.address_w']!(0, 0, 2);
  ctx.registry.write['ay.data_w']!(0, 0, 0x5a);
  assert.equal(ctx.registry.read['ay.data_r']!(0, 0), 0x5a);
});

check('generated handlers reach the chip by every device alias', () => {
  const ctx = context(base);
  installAy8910Runtime(ctx);
  for (const alias of ['ay', 'm_ay', 'm_ay']) {
    assert.equal(typeof ctx.calls[`${alias}.data_w`], 'function');
  }
});

check('data-address wiring selects data at offset 0 and address at offset 1', () => {
  const ctx = context(base);
  installAy8910Runtime(ctx);
  ctx.calls['m_ay.data_address_w']!(1, 6);
  ctx.calls['m_ay.data_address_w']!(0, 0x2a);
  assert.deepEqual(ctx.writes, [[6, 0x2a, undefined]]);
});

check('address-data wiring selects address at offset 0 and data at offset 1', () => {
  const ctx = context(base);
  installAy8910Runtime(ctx);
  ctx.registry.write['ay.address_data_w']!(0, 0, 4);
  ctx.registry.write['ay.address_data_w']!(0, 1, 0x19);
  assert.deepEqual(ctx.writes, [[4, 0x19, undefined]]);
});

// MAME reconfigures filter_rc_device stages at run time; the member the
// handlers write to has to exist with the layout the driver's IR expects.
check('a flat filter member is bound and forwards control writes', () => {
  const sound: Sound = {
    ...base,
    filterLayout: 'flat',
    routes: [0, 1, 2].map(channel => ({
      chip: 0, channel, gain: 1, target: `filter.0.${channel}`,
      filter: { index: channel, bank: 0, channel },
    })),
  };
  const ctx = context(sound);
  installAy8910Runtime(ctx);
  const filters = ctx.state.m_filter as { filter_rc_set_RC(...values: number[]): void }[];
  assert.equal(filters.length, 3);
  filters[2]!.filter_rc_set_RC(0, 1000, 2200, 200, 0.22e-6);
  assert.equal(ctx.writes.length, 5);
});

check('a matrix filter member is bound by bank and channel', () => {
  const sound: Sound = {
    ...base,
    deviceTag: 'ay1',
    deviceTags: ['ay1', 'ay2'],
    filterLayout: 'matrix',
    routes: [{
      chip: 1, channel: 2, gain: 1, target: 'filter.1.2',
      filter: { index: 0, bank: 1, channel: 2 },
    }],
  };
  const ctx = context(sound);
  installAy8910Runtime(ctx);
  const filters = ctx.state.m_filter as unknown[][];
  assert.equal(
    typeof (filters[1]![2] as Record<string, unknown>).filter_rc_set_RC,
    'function',
  );
});

// junofrst's R2R DAC is mixed by the worklet, not instantiated as a device.
check('an auxiliary stream device writes to the sink by name', () => {
  const sound: Sound = {
    ...base,
    auxiliaryDevices: [{
      type: 'DAC_8BIT_R2R', deviceTag: 'dac', clock: 0, gain: 1,
      target: 'speaker', writeMethods: ['data_w'],
    }],
  };
  const ctx = context(sound);
  installAy8910Runtime(ctx);
  ctx.registry.write['dac.data_w']!(0, 0, 0x80);
  assert.deepEqual(ctx.writes, [[0, 0x80, 'dac.data_w']]);
});

check('a four-bit R2R DAC uses the same routed auxiliary protocol', () => {
  const sound: Sound = {
    ...base,
    auxiliaryDevices: [{
      type: 'DAC_4BIT_R2R', deviceTag: 'dac', clock: 0, gain: 0.12,
      target: 'speaker', writeMethods: ['data_w', 'write'],
    }],
  };
  const ctx = context(sound);
  installAy8910Runtime(ctx);
  ctx.registry.write['dac.data_w']!(0, 0, 0x0f);
  assert.deepEqual(ctx.writes, [[0, 0x0f, 'dac.data_w']]);
  (ctx.calls['m_dac.write'] as (...args: number[]) => unknown)(0x07);
  assert.deepEqual(ctx.writes.at(-1), [0, 0x07, 'dac.write']);
});

check('a routed DAC reference ladder reaches the worklet', () => {
  const sound: Sound = {
    ...base,
    auxiliaryDevices: [{
      type: 'DAC_8BIT_R2R', deviceTag: 'dac', clock: 0, gain: 0.15,
      target: 'speaker', writeMethods: ['data_w'],
      referenceControl: { deviceTag: 'dacvol', member: 'm_dacvol' },
    }],
  };
  const ctx = context(sound);
  installAy8910Runtime(ctx);
  (ctx.state.m_dacvol as { write(node: number, value: number): void }).write(1, 0x7f);
  assert.deepEqual(ctx.writes.at(-1), [0, 0x7f, 'dac.reference_w']);
});

console.log(`ay8910.spec: ${passed} passed, 0 failed`);
