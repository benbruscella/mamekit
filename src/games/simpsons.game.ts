import { sourceTarget } from './source-contract.ts';

export const simpsons = sourceTarget({
  game: 'simpsons',
  driver: 'src/mame/konami/simpsons.cpp',
  machine: { className: 'simpsons_state', name: 'simpsons' },
  screen: { width: 320, height: 224 },
  soundKind: 'stream',
  golden: {
    regions: {
      audiocpu: '7e18466f',
      eeprom: 'ec3f0449',
      k052109: 'dae55fbd',
      k053246: 'e736ac41',
      k053260: 'd5d319e9',
      maincpu: 'f858d832',
    },
    checkpoints: {
      1: { video: '2aa9b3cc', state: '5b67e890' },
      60: { video: '2aa9b3cc', state: '6949cd12' },
      180: { video: '0f473070', state: 'fe6e4df4' },
      300: { video: '141882af', state: '6fac88ce' },
      600: { video: 'e9c6312a', state: '07a023cd' },
      900: { video: '1c2bee9e', state: 'bf6da05d' },
      1200: { video: 'a26eb98d', state: '63ce95e5' },
    },
    audio: {
      writes: 1946418,
      nonzeroWrites: 935992,
      writeHash: '5d3bde71',
      pcmHash: '3fc142a9',
      rms: 0.028132,
    },
  },
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 850, code: 'KeyZ', heldFrames: 30, releasedFrames: 20 },
  ],
  audioRequirements: [{
    // The K053260's own stream, before the mix: its PCM channels keyed on
    // (register 0x28 under the old gate) are what make it vary at all.
    method: 'k053260.stream',
    fromFrame: 120,
    minimumNonzeroWrites: 20,
    minimumDistinctValues: 32,
  }],
});
