import { sourceTarget } from './source-contract.ts';

export const qix = sourceTarget({
  game: 'qix',
  driver: 'src/mame/taito/qix.cpp',
  machine: { className: 'qix_state', name: 'qix' },
  screen: { width: 256, height: 256 },
  soundKind: 'discrete',
  frames: 900,
  minimumFps: 40,
  checkpoints: [1, 10, 30, 60, 180, 300, 480, 600, 900],
  actions: [
    // Blank NVRAM asks for a language. Accept the highlighted default, then
    // reset as the original operator flow specifies; the NVRAM survives.
    { atFrame: 100, code: 'Digit9', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 150, reset: true },
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 480, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  audioRequirements: [{
    method: 'write',
    offset: 1,
    fromFrame: 180,
    minimumNonzeroWrites: 1_000,
  }],
  golden: {
    regions: {
      audiocpu: 'd5071fa5',
      maincpu: 'e80d2bb9',
      videocpu: '081eb1c6',
    },
    checkpoints: {
      1: { video: '21f25028', state: 'cd482843' },
      10: { video: '21f25028', state: '783ffcfa' },
      30: { video: '21f25028', state: '251e3f99' },
      60: { video: '52eb2598', state: '83419324' },
      180: { video: 'ce536518', state: 'e8e160a0' },
      300: { video: '7b0b7216', state: '16b24ead' },
      480: { video: '1ef40868', state: '15ebcc79' },
      600: { video: '100e1eff', state: 'b52adba5' },
      900: { video: 'd26d092e', state: '2eb13167' },
    },
    audio: {
      writes: 13584,
      nonzeroWrites: 13543,
      writeHash: '273c6a72',
      pcmHash: '6b6b4841',
      rms: 0.090804,
    },
  },
});
