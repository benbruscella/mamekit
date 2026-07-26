import assert from 'node:assert/strict';
import { BoardIrError, decodeBoardIr } from './decode.ts';
import { BOARD_IR_SCHEMA_VERSION } from './version.ts';

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

function board(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    schemaVersion: BOARD_IR_SCHEMA_VERSION,
    game: 'fixture',
    family: 'fixture',
    driverFile: 'src/mame/fixture.cpp',
    callbacks: [],
    connections: [],
    execution: {
      cpus: [{ tag: 'maincpu', clock: 1_000_000, region: 'maincpu' }],
      screen: { width: 256, height: 224, refresh: 60, vtotal: 256, vbstart: 240, rotate: 0 },
      frameEvents: [],
    },
    ...overrides,
  };
}

function diagnostics(value: unknown): { path: string; message: string }[] {
  try {
    decodeBoardIr(value, 'fixture');
  } catch (error) {
    assert.ok(error instanceof BoardIrError);
    return error.diagnostics;
  }
  throw new Error('expected decoding to fail');
}

check('a well-formed board decodes', () => {
  const value = board();
  assert.equal(decodeBoardIr(value, 'fixture'), value);
});

// A stale artifact used to reach execution as `data as unknown as BoardIr` and
// fail later as an undefined-property crash somewhere unrelated.
check('a version mismatch is reported alone, not as downstream damage', () => {
  const found = diagnostics({ ...board(), schemaVersion: 2, execution: undefined });
  assert.equal(found.length, 1);
  assert.equal(found[0]!.path, 'schemaVersion');
  assert.match(found[0]!.message, /regenerate the target/);
});

check('every problem is reported, not just the first', () => {
  const found = diagnostics(board({ game: 42, family: null, driverFile: '' }));
  assert.deepEqual(found.map(d => d.path).sort(), ['driverFile', 'family', 'game']);
});

check('diagnostics carry the JSON field path', () => {
  const found = diagnostics(board({
    execution: {
      cpus: [{ tag: 'maincpu', clock: 'fast', region: 'maincpu' }],
      screen: { width: 256, height: 224, refresh: 60, vtotal: 256, vbstart: 240, rotate: 0 },
      frameEvents: [],
    },
  }));
  assert.equal(found[0]!.path, 'execution.cpus[0].clock');
  assert.match(found[0]!.message, /expected a finite number/);
});

check('diagnostics carry the MAME source span the compiler recorded', () => {
  const found = diagnostics(board({
    callbacks: [{
      id: '', ownerTag: 'latch', signal: 'q_out_cb', operation: 'set',
      source: { file: 'src/mame/fixture.cpp', line: 99 },
    }],
  }));
  assert.equal(found[0]!.path, 'callbacks[0].id');
  assert.deepEqual(found[0]!.source, { file: 'src/mame/fixture.cpp', line: 99 });
});

check('a board must declare a CPU', () => {
  const found = diagnostics(board({
    execution: {
      cpus: [],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
      frameEvents: [],
    },
  }));
  assert.equal(found[0]!.path, 'execution.cpus');
});

check('an inverted address range is rejected', () => {
  const found = diagnostics(board({
    execution: {
      cpus: [{
        tag: 'maincpu', clock: 1, region: 'maincpu',
        ranges: [{ start: 0x8000, end: 0x4000, kind: 'rom' }],
      }],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
      frameEvents: [],
    },
  }));
  assert.match(found[0]!.message, /ends \(0x4000\) before it starts \(0x8000\)/);
});

check('an unknown range kind is rejected', () => {
  const found = diagnostics(board({
    execution: {
      cpus: [{
        tag: 'maincpu', clock: 1, region: 'maincpu',
        ranges: [{ start: 0, end: 1, kind: 'magic' }],
      }],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
      frameEvents: [],
    },
  }));
  assert.equal(found[0]!.path, 'execution.cpus[0].ranges[0].kind');
});

// MAME configures bank entries individually; a bank with none is unselectable.
check('a bank with no configured entry is rejected', () => {
  const found = diagnostics(board({
    execution: {
      cpus: [{ tag: 'maincpu', clock: 1, region: 'maincpu' }],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 1, vbstart: 0, rotate: 0 },
      frameEvents: [],
      banks: [{ tag: 'bank1', member: 'm_bank1', region: 'maincpu', entryOffsets: [null, null] }],
    },
  }));
  assert.match(found[0]!.message, /no bank entry is configured/);
});

console.log(`decode.spec: ${passed} passed, 0 failed`);
