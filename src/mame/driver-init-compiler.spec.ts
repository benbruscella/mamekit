import assert from 'node:assert/strict';
import { compileDriverInitProgram } from './driver-init-compiler.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';

// init_mspacman is the shape that motivated an executable init: it builds a
// second 64K bank from address-scrambled, bit-permuted copies of the Pac-Man
// ROMs, then calls a helper that stitches forty eight-byte patches into it.
const mspacman = compileDriverInitProgram(
  mameSrc,
  'src/mame/pacman/pacman.cpp',
  'pacman_state',
  'init_mspacman',
);
assert.ok(mspacman, 'init_mspacman must lower to an executable init program');
assert.equal(mspacman.kind, 'init-program');
assert.equal(mspacman.source?.file, 'src/mame/pacman/pacman.cpp');
assert.deepEqual(
  mspacman.helpers.map(helper => helper.method),
  ['mspacman_install_patches'],
  'a helper the init calls must be lowered with it',
);
assert.deepEqual(mspacman.program.diagnostics, []);
assert.ok(mspacman.helpers.every(helper => !helper.program.diagnostics.length));

// An init that only configures banks is not ROM assembly work. Banks are
// lowered declaratively from the same function, so replaying the init here
// would configure them twice.
assert.equal(
  compileDriverInitProgram(mameSrc, 'src/mame/capcom/1942.cpp', '_1942_state', 'driver_init'),
  undefined,
);

// A machine with no init has nothing to preserve.
assert.equal(
  compileDriverInitProgram(mameSrc, 'src/mame/pacman/pacman.cpp', 'pacman_state', 'empty_init'),
  undefined,
);

console.log('driver-init-compiler.spec: source-derived Ms. Pac-Man init program passed');
