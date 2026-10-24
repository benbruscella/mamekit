import { sourceTarget } from './source-contract.ts';

export const galaga = sourceTarget({
  game: 'galaga',
  driver: 'src/mame/namco/galaga.cpp',
  machine: { className: 'galaga_state', name: 'galaga' },
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
  // The 54xx boot boom at the end of the self-test starts at frame 715, the
  // frame MAME 0.289's own -wavwrite starts it on (#184). It comes before any
  // input, so it is the same on both sides; the explosion this guarded at
  // frame 2456 belonged to how the scripted play happened to run.
  audioRequirements: [
    {
      method: 'discrete',
      fromFrame: 660,
      toFrame: 714,
      minimumNonzeroWrites: 0,
      maximumNonzeroWrites: 0,
    },
    {
      method: 'discrete',
      fromFrame: 715,
      toFrame: 730,
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
      1: { video: '967206d7', state: 'a74b01ec' },
      300: { video: '8fa90953', state: 'abac4fb5' },
      720: { video: '972b5194', state: '08438e1b' },
      760: { video: '21864713', state: 'f41f53b1' },
      900: { video: 'd4ed5a0c', state: 'ea063e9a' },
      1050: { video: 'a73831d1', state: '94f24db3' },
      1300: { video: '58820032', state: '830e672f' },
      1600: { video: '7b1bb8d0', state: '41da5ac9' },
      2456: { video: '1873c3d7', state: '0230e769' },
      2600: { video: '8fdfca32', state: '0e474cc4' },
    },
    audio: {
      writes: 554857,
      nonzeroWrites: 26744,
      writeHash: '67059637',
      pcmHash: '2e4e74be',
      rms: 0.076715,
    },
  },
});
