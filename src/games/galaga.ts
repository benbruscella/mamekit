import type { GameTestContract } from './types.ts';

export const galaga: GameTestContract = {
  game: 'galaga',
  category: 'arcade',
  driver: 'src/mame/namco/galaga.cpp',
  machine: { className: 'galaga_state', name: 'galaga' },
  romEnvironment: 'MAMEKIT_GALAGA_ROM',
  screen: { width: 288, height: 224 },
  soundKind: 'wsg',
  // Galaga's three-CPU self-test runs ~12 s before the game will take a coin,
  // and the WSG is silent until then (matches real hardware: the boot boom is
  // the 54xx discrete circuit, not the WSG) — so all actions land post-boot.
  frames: 2600,
  // The generated 05xx hot loop is AOT-compiled from device IR.
  minimumFps: 45,
  checkpoints: [1, 300, 720, 760, 900, 1050, 1300, 1600, 2456, 2600],
  actions: [
    { atFrame: 950, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1000, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1100, code: 'ArrowLeft', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 1200, code: 'ArrowRight', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 1250, code: 'Space', heldFrames: 10, releasedFrames: 10 },
    { atFrame: 1350, code: 'Space', heldFrames: 10, releasedFrames: 10 },
  ],
  // The 54xx boot boom starts at frame 2456: one frame earlier than first
  // recorded, from the same maincpu cycle shifts noted on the checkpoint
  // hashes below.
  audioRequirements: [
    {
      method: 'discrete',
      fromFrame: 2401,
      toFrame: 2455,
      minimumNonzeroWrites: 0,
      maximumNonzeroWrites: 0,
    },
    {
      method: 'discrete',
      fromFrame: 2456,
      toFrame: 2471,
      minimumNonzeroWrites: 100,
    },
  ],
  // The checkpoint state hashes from frame 900 on record a maincpu cycle/PC
  // shift of a few cycles, from fixing NMI delivery: releasing the Namco 06xx
  // NMI used to fall through and clear maincpu's IRQ0 as well. Every video and
  // audio hash is unchanged, so no frame or sample moved.
  golden: {
    regions: {
      '51xx:mcu': 'c2f57ef8',
      '54xx:mcu': 'ee7357e0',
      gfx1: '7cb09eec',
      gfx2: 'd11e0edf',
      maincpu: 'd249eb7d',
      namco: '55c1401a',
      proms: '33c81fa8',
      sub: 'e9ea3639',
      sub2: '6d220ddd',
    },
    checkpoints: {
      1: { video: '2fd768d3', state: 'a74b01ec' },
      300: { video: '8fa90953', state: 'abac4fb5' },
      720: { video: '972b5194', state: '9214eadb' },
      760: { video: '21864713', state: '4c859c84' },
      900: { video: 'd4ed5a0c', state: '0bccffcd' },
      1050: { video: 'b12321a8', state: '2d80a055' },
      1300: { video: '7796e201', state: 'bdda9e21' },
      1600: { video: 'c29772a9', state: 'de671752' },
      2456: { video: '7f49a527', state: 'c932df02' },
      2600: { video: '920de88e', state: 'd9a12d49' },
    },
    audio: {
      writes: 552025,
      nonzeroWrites: 32373,
      writeHash: 'fbb6d6ff',
      pcmHash: '35b2ee7a',
      rms: 0.078376,
    },
  },
};
