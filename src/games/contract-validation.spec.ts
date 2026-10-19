import assert from 'node:assert/strict';
import { validateGameContract } from './contract-validation.ts';
import { normalizeGameContractExport } from './contracts.ts';
import type { GameTestContract, MachineTargetContract } from './types.ts';

const candidate: GameTestContract = {
  game: 'demo',
  category: 'arcade',
  driver: 'src/mame/demo/demo.cpp',
  machine: { className: 'demo_state', name: 'demo' },
  romEnvironment: 'MAMEKIT_DEMO_ROM',
  screen: { width: 320, height: 240 },
  soundKind: 'none',
  frames: 60,
  minimumFps: 10,
  checkpoints: [1, 60],
  actions: [],
};

assert.equal(validateGameContract(candidate, 'candidate'), candidate);
assert.throws(() => validateGameContract(candidate, 'accepted'), /no recorded golden/);
assert.throws(() => validateGameContract({ ...candidate, category: 'computers' }, 'accepted'),
  /no recorded golden/);
assert.throws(() => validateGameContract({ ...candidate, checkpoints: [60, 1] }, 'candidate'),
  /strictly increasing/);
assert.throws(() => validateGameContract({
  ...candidate,
  actions: [
    { atFrame: 10, code: 'Space', heldFrames: 10, releasedFrames: 5 },
    { atFrame: 20, code: 'Digit1', heldFrames: 1, releasedFrames: 1 },
  ],
}, 'candidate'), /overlap/);
assert.throws(() => validateGameContract({
  ...candidate,
  audioRequirements: [{
    method: 'write',
    fromFrame: 50,
    toFrame: 40,
    minimumNonzeroWrites: 0,
  }],
}, 'candidate'), /reversed/);

const nested: MachineTargetContract = {
  target: {
    game: 'c64',
    category: 'computers',
    driver: 'src/mame/commodore/c64.cpp',
    machine: { className: 'c64_state', name: 'c64' },
    screen: { width: 403, height: 284 },
    soundKind: 'none',
    media: [
      { kind: 'bios', status: 'candidate' },
      { kind: 'quickload', interface: 'prg', status: 'planned' },
      { kind: 'floppy', interface: 'iec', peripheral: 'c1541', status: 'planned' },
    ],
  },
  scenarios: [
    {
      id: 'basic',
      kind: 'keyboard',
      romEnvironment: 'MAMEKIT_C64_ROM',
      frames: 60,
      minimumFps: 10,
      checkpoints: [1, 60],
      actions: [],
    },
    {
      id: 'prg',
      kind: 'media',
      romEnvironment: 'MAMEKIT_C64_ROM',
      frames: 60,
      minimumFps: 10,
      checkpoints: [1, 60],
      actions: [],
    },
  ],
};
const normalized = normalizeGameContractExport(nested, {
  game: 'c64',
  lifecycle: 'candidate',
  modulePath: '/tmp/c64.game.ts',
  specPath: '/tmp/c64.game.spec.ts',
});
assert.equal(normalized.target.game, 'c64');
assert.deepEqual(normalized.scenarios.map(scenario => scenario.id), ['basic', 'prg']);

// A computer title is played from a shelf whose medium is accepted, and typed
// text is an action like any other: it may not be empty or overlap.
const computer: GameTestContract = {
  ...candidate,
  game: 'c64p',
  category: 'computers',
  media: [{ kind: 'cassette', status: 'accepted', softwareLists: ['c64_cass'] },
    { kind: 'floppy', status: 'planned', softwareLists: ['c64_flop_orig'] }],
};
assert.equal(validateGameContract({ ...computer, software: { list: 'c64_cass', name: 'hero' } }, 'candidate').game, 'c64p');
assert.throws(() => validateGameContract({ ...computer, software: { list: 'c64_flop_orig', name: 'bbsb' } }, 'accepted'),
  /c64_flop_orig scenario needs that list's medium accepted/);
assert.throws(() => validateGameContract({ ...computer, software: { list: 'c64_cass', name: 'H.E.R.O.' } }, 'candidate'),
  /invalid software-list title/);
assert.throws(() => validateGameContract({ ...computer, actions: [{ atFrame: 5, text: '' }] }, 'candidate'),
  /types nothing/);
assert.throws(() => validateGameContract({
  ...computer,
  actions: [{ atFrame: 5, code: 'KeyA', heldFrames: 10, releasedFrames: 5 }, { atFrame: 12, text: 'RUN{ENTER}' }],
}, 'candidate'), /overlap/);

console.log('contract-validation.spec: candidate and accepted validation passed');
