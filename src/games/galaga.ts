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
  frames: 1600,
  // Interpreter-bound today: the 05xx advances its LFSR 65536x per frame
  // through handler IR. Device codegen (the CPU-style emit path) lifts this.
  minimumFps: 10,
  checkpoints: [1, 300, 720, 900, 1050, 1300, 1600],
  actions: [
    { atFrame: 950, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1000, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1100, code: 'ArrowLeft', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 1200, code: 'ArrowRight', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 1250, code: 'Space', heldFrames: 10, releasedFrames: 10 },
    { atFrame: 1350, code: 'Space', heldFrames: 10, releasedFrames: 10 },
  ],
  golden: {
    regions: {
      gfx1: '58b2f47c',
      gfx2: 'd11e0edf',
      maincpu: 'd249eb7d',
      namco: '55c1401a',
      proms: '33c81fa8',
      sub: 'e9ea3639',
      sub2: '6d220ddd',
    },
    checkpoints: {
      '1': {
        video: '967206d7',
        state: 'c438dc60',
      },
      '300': {
        video: '8fa90953',
        state: '5cb09b0b',
      },
      '720': {
        video: 'aa0d2526',
        state: '1b5c8f9e',
      },
      '900': {
        video: 'd4ed5a0c',
        state: 'b6e409f7',
      },
      '1050': {
        video: '82288bf1',
        state: '23ad8fd4',
      },
      '1300': {
        video: '10199844',
        state: 'bd4ab9de',
      },
      '1600': {
        video: 'e075f134',
        state: '67a6d00d',
      },
    },
    audio: {
      writes: 33725,
      nonzeroWrites: 3928,
      writeHash: '4920015d',
      pcmHash: '8a901625',
      rms: 0.035264,
    },
  },
};
