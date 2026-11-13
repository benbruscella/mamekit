import { sourceTarget } from './source-contract.ts';

export const defender = sourceTarget({
  game: 'defender',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'defender_state', name: 'defender' },
  screen: { width: 292, height: 240 },
  soundKind: 'stream',
  minimumAudioRms: 0.05,
  audioRequirements: [{
    // The DAC's own stream, before the mix: the sound CPU's writes are what
    // move it, so the gate is how many different levels it reached, not
    // whether it is non-zero (an idle DAC holds one constant level).
    method: 'dac.stream',
    fromFrame: 500,
    minimumNonzeroWrites: 100,
    minimumDistinctValues: 16,
  }],
  actions: [
    // A fresh Defender CMOS image pauses in its source-defined operator flow.
    // Exercise the cabinet's real Auto Up and Advance lines before coin/start,
    // then leave enough time for the sound command strobe to reach PIA 2.
    { atFrame: 280, code: 'Digit9', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 320, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 380, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 440, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 500, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 620, code: 'Digit5', heldFrames: 8, releasedFrames: 20 },
    // Defender does not start on one press. A coin only lights CREDITS: 1 and
    // the machine stays in attract — verified by screenshotting frame 1216,
    // which still showed the SCANNER banner and a demo ship. Six spaced Start
    // presses are what actually put a ship in play, and until they did, every
    // gameplay action below was driving the attract loop: the video hash was
    // byte-identical with and without them.
    { atFrame: 780, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 900, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1020, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1140, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1260, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1380, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    // In play from here. Reverse and Hyperspace exist only because MAME names
    // BUTTON5 and BUTTON4 (issue #61); the shared keymap stopped at BUTTON3
    // and the generator drops what it cannot bind, so neither reached the
    // machine and no key turned the ship around. The stick is PORT_2WAY
    // vertical, so Reverse is the only way the ship changes facing.
    { atFrame: 1650, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1750, code: 'KeyC', heldFrames: 60, releasedFrames: 40 },
    { atFrame: 1900, code: 'KeyA', heldFrames: 6, releasedFrames: 34 },
  ],
  frames: 2100,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200, 1600, 1700, 1880, 1980, 2100],
  golden: {
    regions: {
      banked: 'e92faf5c',
      maincpu: '0c13db38',
      proms: 'cb532938',
      soundcpu: 'd8826f3d',
    },
    checkpoints: {
      1: { video: 'a2855ce8', state: '1dae7d6a' },
      60: { video: '377ae87d', state: '3faa1315' },
      180: { video: '825bf1d1', state: 'a7c2b7c2' },
      300: { video: '5081c24c', state: '283ab66a' },
      600: { video: '8e05fe98', state: '327eb711' },
      900: { video: 'ce76514c', state: 'b157d550' },
      1200: { video: '5c284c35', state: '01a87bbc' },
      1600: { video: 'd0648dd2', state: '52c4774b' },
      1700: { video: 'a9b5d1ae', state: 'c3a4a0a1' },
      1880: { video: 'fd1f3890', state: 'd4d3da8c' },
      1980: { video: '60f28380', state: '1866f7d0' },
      2100: { video: '33f18b7a', state: 'bdbe6165' },
    },
    audio: {
      writes: 3354624,
      nonzeroWrites: 3350876,
      writeHash: '37e26acc',
      pcmHash: '91f3e5d4',
      rms: 0.190793,
    },
  },
});
