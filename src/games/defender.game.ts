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
      1: { video: 'a2855ce8', state: '5a1c0297' },
      60: { video: '7257c7b4', state: 'bf2d0931' },
      180: { video: '825bf1d1', state: 'fdc2d8b4' },
      300: { video: '5081c24c', state: 'cd73b666' },
      600: { video: '8e05fe98', state: '7e87da61' },
      900: { video: 'ce76514c', state: '249c39ed' },
      1200: { video: '5c284c35', state: '13acede6' },
      1600: { video: 'd0648dd2', state: '835eb7e7' },
      1700: { video: 'a9b5d1ae', state: '8767ff0f' },
      1880: { video: 'fd1f3890', state: '20eb5c28' },
      1980: { video: '60f28380', state: '947be697' },
      2100: { video: '33f18b7a', state: '66ba1cc8' },
    },
    audio: {
      writes: 3354624,
      nonzeroWrites: 3350868,
      writeHash: 'f094cc9f',
      pcmHash: 'c1bc25b9',
      rms: 0.190796,
    },
  },
});
