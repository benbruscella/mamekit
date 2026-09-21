import { sourceTarget } from './source-contract.ts';

export const defender = sourceTarget({
  game: 'defender',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'defender_state', name: 'defender' },
  screen: { width: 292, height: 240 },
  soundKind: 'dac',
  minimumAudioRms: 0.05,
  audioRequirements: [{
    method: 'dac.data_w',
    fromFrame: 500,
    minimumNonzeroWrites: 100,
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
      1: { video: 'a2855ce8', state: '88adfb0b' },
      60: { video: '2b5b6a38', state: '57d066f2' },
      180: { video: '0982dbaf', state: '74e44278' },
      300: { video: '5081c24c', state: '57b6984f' },
      600: { video: '8e05fe98', state: 'a2445e72' },
      900: { video: 'ce76514c', state: 'dea7761c' },
      1200: { video: 'c552c4f9', state: '11dad5b4' },
      1600: { video: '8573e6ff', state: 'f682835f' },
      1700: { video: 'a9b5d1ae', state: '87978d6e' },
      1880: { video: 'e7fa5d9d', state: '288dd516' },
      1980: { video: '60f28380', state: '5299d347' },
      2100: { video: '04830da7', state: '648402d5' },
    },
    audio: {
      writes: 69622,
      nonzeroWrites: 63646,
      writeHash: '8b5a97b6',
      pcmHash: '131d5e11',
      rms: 0.769578,
    },
  },
});
