import { sourceTarget } from './source-contract.ts';

export const junofrst = sourceTarget({
  game: 'junofrst',
  driver: 'src/mame/konami/junofrst.cpp',
  machine: { className: 'junofrst_state', name: 'junofrst' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 300, 480, 720, 1200],
  actions: [
    { atFrame: 480, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 510, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 720, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 840, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  audioRequirements: [{
    // The DAC's own stream, before the mix: the sound CPU's writes are what
    // move it, so the gate is how many different levels it reached, not
    // whether it is non-zero (an idle DAC holds one constant level).
    method: 'dac.stream',
    fromFrame: 120,
    minimumNonzeroWrites: 100,
    minimumDistinctValues: 16,
  }],
  golden: {
    regions: {
      audiocpu: '235a2893',
      blitrom: '7fc240e9',
      maincpu: '47842aab',
      mcu: 'd0fa5d5f',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '779cf6f1' },
      60: { video: 'f8a0d088', state: 'f82da139' },
      300: { video: 'ddad08c3', state: '13f06f78' },
      480: { video: 'e5b26a75', state: '217104bc' },
      720: { video: '90ec6eb7', state: '58735285' },
      1200: { video: '29686572', state: '8f37deb4' },
    },
    audio: {
      writes: 1900798,
      nonzeroWrites: 1900796,
      writeHash: 'ebd7bb01',
      pcmHash: '5eca6dd1',
      rms: 0.324492,
    },
  },
});
