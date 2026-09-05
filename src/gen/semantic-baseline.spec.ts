import assert from 'node:assert/strict';
import {
  compareSemanticBaselines,
  semanticFingerprint,
  type SemanticBaseline,
} from './semantic-baseline.ts';

const board = {
  game: 'fixture',
  callbacks: [{ id: 'timer', source: { file: 'driver.cpp', line: 10 } }],
  devices: [{ tag: 'cpu', type: 'Z80' }],
  handlers: [{ method: 'interrupt', program: { operations: ['pulse'] } }],
  maps: [{ name: 'main' }],
  execution: { frameEvents: [{ callbackId: 'timer', line: 64 }] },
  video: {
    source: { file: 'driver.cpp', line: 20 },
    ramPalette: {
      tag: 'palette', extShare: 'palette_ext', endianness: 'big',
      entries: 256, bytesPerEntry: 2,
    },
  },
};
const original = semanticFingerprint(board);
assert.equal(original.callbacks, 1);
assert.equal(original.frameEvents, 1);
assert.equal(original.palette, 'ram:palette:palette_ext:big:256:2');
assert.equal(
  semanticFingerprint({ ...board, video: { ...board.video, source: { line: 999 } } }).sha256,
  original.sha256,
  'source-only movement must not change generated semantics',
);
assert.notEqual(
  semanticFingerprint({ ...board, callbacks: [] }).sha256,
  original.sha256,
  'removing a callback must change generated semantics',
);
assert.notEqual(
  semanticFingerprint({
    ...board,
    video: { ...board.video, ramPalette: { ...board.video.ramPalette, endianness: 'little' } },
  }).sha256,
  original.sha256,
  'changing palette byte order must change generated semantics',
);

const expected: SemanticBaseline = { schemaVersion: 1, targets: { fixture: original } };
const changed = semanticFingerprint({ ...board, callbacks: [] });
assert.match(
  compareSemanticBaselines(expected, {
    schemaVersion: 1,
    targets: { fixture: changed },
  })[0] ?? '',
  /callbacks 1 -> 0/,
);

console.log('semantic-baseline.spec: generated behavior drift is review-gated');
