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
  audioRequirements: [
    {
      method: 'discrete',
      fromFrame: 2401,
      toFrame: 2456,
      minimumNonzeroWrites: 0,
      maximumNonzeroWrites: 0,
    },
    {
      method: 'discrete',
      fromFrame: 2457,
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
      1: { video: '967206d7', state: '564a0362' },
      300: { video: '8fa90953', state: 'e4d52427' },
      720: { video: '972b5194', state: '8766b4c5' },
      760: { video: '21864713', state: 'c2b08b5c' },
      900: { video: 'd4ed5a0c', state: '89ec91f1' },
      1050: { video: 'f0cb037c', state: '32f3e31d' },
      1300: { video: '9505b9bf', state: '26e66a55' },
      1600: { video: '83a2539e', state: '6db93f95' },
      2456: { video: '492457b6', state: '36ba2aaf' },
      2600: { video: 'fd5bcec5', state: '6c74795c' },
    },
    audio: {
      writes: 311904,
      nonzeroWrites: 30687,
      writeHash: '1157f939',
      pcmHash: 'fc6b5b22',
      rms: 0.075614,
    },
  },
};
