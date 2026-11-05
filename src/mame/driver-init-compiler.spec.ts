import assert from 'node:assert/strict';
import { compileDeviceRomProgram, compileDriverInitProgram } from './driver-init-compiler.ts';
import { indexMameHardware } from './hardware.ts';
import { applyRomTransforms } from '../runtime/shell.ts';
import type { Regions } from '../runtime/types.ts';

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

// An encrypted Sega Z80 decrypts its own ROM when MAME resets it (segacrpt)
// or starts it (segacrp2), into the opcode share its config names. The values
// are what the hand decode loops this replaced produced, which every part our
// targets use matched byte for byte.
const hardware = indexMameHardware(mameSrc);
const decrypted = (type: string, ...setters: string[]): Regions => {
  const program = compileDeviceRomProgram(mameSrc, hardware.get(type)!, [
    `auto &z80(${type}(config.replace(), m_maincpu, 0))`,
    'z80.set_decrypted_tag(":decrypted_opcodes")',
    ...setters,
  ], { tag: 'maincpu', opcodeRegion: 'decrypted_opcodes', opcodeSize: 0x8000 });
  assert.ok(program, `${type} must lower to a device ROM program`);
  const regions: Regions = { maincpu: Uint8Array.from({ length: 0x8000 }, (_, index) => index & 0xff) };
  applyRomTransforms(regions, [program as never]);
  return regions;
};
const old = decrypted('SEGA_315_5098');
assert.deepEqual([...old.decrypted_opcodes!.slice(0, 4)], [8, 169, 10, 171]);
assert.notDeepEqual([...old.maincpu.slice(0, 32)], [...old.decrypted_opcodes!.slice(0, 32)]);
// `set_size(0x6000)` (Zaxxon's parts) stops the decode where MAME does; the
// hand loop decoded all 0x8000 bytes (0x7000 became 136).
const sized = decrypted('SEGA_315_5013', 'z80.set_size(0x6000)');
assert.equal(sized.maincpu[0x7000], 0x00);
assert.equal(sized.decrypted_opcodes![0x7000], 0);
const system2 = decrypted('SEGA_315_5177');
assert.deepEqual([...system2.maincpu.slice(0, 8)], [84, 20, 86, 22, 80, 16, 82, 18]);
assert.deepEqual([...system2.decrypted_opcodes!.slice(0, 8)], [4, 80, 6, 82, 0, 84, 2, 86]);

console.log('driver-init-compiler.spec: Ms. Pac-Man init and Sega Z80 decryption programs passed');
