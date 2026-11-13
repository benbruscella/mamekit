import { sourceTarget } from './source-contract.ts';

export const galaga = sourceTarget({
  game: 'galaga',
  driver: 'src/mame/namco/galaga.cpp',
  machine: { className: 'galaga_state', name: 'galaga' },
  screen: { width: 288, height: 224 },
  soundKind: 'stream',
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
  // The 54xx's noise is heard through galaga_discrete, compiled from MAME
  // source and mixed beside the WSG (#236); the boot boom at the end of the
  // self-test starts on frame 715, as MAME 0.289's own -wavwrite does.
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
      1: { video: '967206d7', state: '60d495ab' },
      300: { video: '8fa90953', state: 'ef32b600' },
      720: { video: '972b5194', state: '19a0b025' },
      760: { video: '21864713', state: '9a313c6a' },
      900: { video: 'd4ed5a0c', state: 'ea228878' },
      1050: { video: 'a73831d1', state: '229ea782' },
      1300: { video: '58820032', state: 'd1ae4b18' },
      1600: { video: '561a18f2', state: '6edc0339' },
      2456: { video: '1d4c9f1b', state: 'a4a7f888' },
      2600: { video: '2baad20f', state: '3fe0d888' },
    },
    audio: {
      writes: 2059199,
      nonzeroWrites: 2059199,
      writeHash: 'ebd4809d',
      pcmHash: 'a0733dc2',
      rms: 0.050764,
    },
  },
});
