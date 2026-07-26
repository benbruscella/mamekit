import assert from 'node:assert/strict';
import type { BoardIr } from '../ir/board.ts';
import { BOARD_IR_SCHEMA_VERSION } from '../ir/version.ts';
import {
  applyBoardTransforms,
  bindBoardEffects,
  type EffectBindings,
} from './generated-effects.ts';

let passed = 0;
const check = (name: string, run: () => void): void => {
  run();
  passed++;
  void name;
};

// --- transforms -------------------------------------------------------------

check('mask then shift compose in order', () => {
  assert.equal(
    applyBoardTransforms(0xff, [{ kind: 'mask', value: 0xf0 }, { kind: 'rshift', bits: 4 }]),
    0x0f,
  );
});

check('invert complements the line bit', () => {
  assert.equal(applyBoardTransforms(1, [{ kind: 'invert' }]), 0);
  assert.equal(applyBoardTransforms(0, [{ kind: 'invert' }]), 1);
});

// digdug and galaga assemble the Namco 53xx K-port MOD value from three LS259
// bits, each shifted into place with .lshift() (galaga.cpp:1906-1908). This
// transform had no implementation, so all three collapsed onto bit 0.
check('lshift places a latch bit in its MOD position', () => {
  assert.equal(applyBoardTransforms(1, [{ kind: 'lshift', bits: 3 }]), 8);
  assert.equal(applyBoardTransforms(1, [{ kind: 'lshift', bits: 2 }]), 4);
  assert.equal(applyBoardTransforms(1, [{ kind: 'lshift', bits: 1 }]), 2);
});

check('an unlisted transform leaves the value alone', () => {
  assert.equal(applyBoardTransforms(0x5a, []), 0x5a);
});

// --- binding ----------------------------------------------------------------

function machineWith(connections: BoardIr['connections']): BoardIr {
  return {
    schemaVersion: BOARD_IR_SCHEMA_VERSION,
    game: 'fixture',
    family: 'fixture',
    driverFile: 'src/mame/fixture.cpp',
    callbacks: [],
    connections,
    execution: {
      cpus: [],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
      frameEvents: [],
    },
  };
}

const calls: string[] = [];
const bindings: EffectBindings = {
  cpuLine: (tag, line, delivery) => state => { calls.push(`cpu ${tag}.${line}/${delivery}=${state}`); },
  deviceMethod: (tag, method) =>
    tag === 'absent' ? undefined : state => { calls.push(`device ${tag}.${method}=${state}`); },
  handler: key => state => { calls.push(`handler ${key}=${state}`); },
  portRead: port => () => { calls.push(`port ${port}`); return 0x5a; },
  videoControl: control => state => { calls.push(`video ${control}=${state}`); },
  audioControl: (tag, control, offset) => state => {
    calls.push(`audio ${tag} ${control}@${offset ?? '-'}=${state}`);
  },
  audioWrite: (tag, method) => state => { calls.push(`audiowrite ${tag}.${method}=${state}`); },
};

check('every effect kind binds to an executor', () => {
  const effects = bindBoardEffects(machineWith([
    { callbackId: 'c0', effect: { kind: 'cpu-line', tag: 'maincpu', line: 'irq', delivery: 'hold' }, transforms: [] },
    { callbackId: 'c1', effect: { kind: 'device-method', tag: 'latch', method: 'write' }, transforms: [] },
    { callbackId: 'c2', effect: { kind: 'handler', handler: 'state.irq_w' }, transforms: [] },
    { callbackId: 'c3', effect: { kind: 'port-read', port: 'IN0' }, transforms: [] },
    { callbackId: 'c4', effect: { kind: 'video-control', control: 'flip-screen' }, transforms: [] },
    { callbackId: 'c5', effect: { kind: 'audio-control', tag: 'audio', control: 'mute' }, transforms: [] },
    { callbackId: 'c6', effect: { kind: 'audio-write', tag: 'dac', method: 'data_w' }, transforms: [] },
    { callbackId: 'c7', effect: { kind: 'unconnected' }, transforms: [] },
  ]), bindings);
  assert.equal(effects.size, 8);
  for (const [, effect] of effects) effect.run(1);
  assert.deepEqual(calls, [
    'cpu maincpu.irq/hold=1',
    'device latch.write=1',
    'handler state.irq_w=1',
    'port IN0',
    'video flip-screen=1',
    'audio audio mute@-=1',
    'audiowrite dac.data_w=1',
  ]);
});

// MAME .set_nop() declares the output unconnected, so doing nothing is the
// board's behaviour rather than a hole in generation.
check('an unconnected effect binds to a no-op', () => {
  const effects = bindBoardEffects(
    machineWith([{ callbackId: 'nop', effect: { kind: 'unconnected' }, transforms: [] }]),
    bindings,
  );
  assert.equal(effects.get('nop')!.run(1), undefined);
});

check('port-read effects are marked as reads', () => {
  const effects = bindBoardEffects(
    machineWith([{ callbackId: 'p', effect: { kind: 'port-read', port: 'IN1' }, transforms: [] }]),
    bindings,
  );
  assert.equal(effects.get('p')!.reads, true);
});

// A connection the runtime cannot execute must abort construction. Skipping one
// produced boards that started and then behaved wrongly with no diagnostic.
check('an unbindable effect aborts construction with its source line', () => {
  assert.throws(
    () => bindBoardEffects(machineWith([{
      callbackId: 'broken',
      effect: { kind: 'device-method', tag: 'absent', method: 'write' },
      transforms: [],
      source: { file: 'src/mame/fixture.cpp', line: 42 },
    }]), bindings),
    /cannot execute these connections.*broken.*fixture\.cpp:42/s,
  );
});

console.log(`generated-effects.spec: ${passed} passed, 0 failed`);
