import assert from 'node:assert/strict';
import type { BoardIr } from '../ir/board.ts';
import { installSoundRuntime } from './sound-runtime-registry.ts';

// Every board plays through the stream mix; a kind nothing plays is a
// composition error, not a silent board.
assert.throws(() => installSoundRuntime({
  board: { game: 'fixture' } as BoardIr,
  sound: { kind: 'ay8910', deviceTag: 'ay', deviceType: 'AY8910', writeMethods: [], enableMethods: [], controlOffset: -1 },
} as never), /no runtime plays sound kind "ay8910"/);

console.log('sound-runtime-registry.spec: one sound kind, the stream mix');
