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
      1: { video: '2aa9b3cc', state: '9a371c23' },
      60: { video: '2aa9b3cc', state: 'cf49f496' },
      180: { video: '0f473070', state: '2621c0a8' },
      300: { video: '141882af', state: '931b3ad3' },
      600: { video: 'e9c6312a', state: '345f1e25' },
      900: { video: '04f03720', state: '8d457a87' },
      1200: { video: '25fbcdc1', state: '3e0a0991' },
    },
    audio: {
      writes: 1946664,
      nonzeroWrites: 936238,
      writeHash: 'a158813c',
      pcmHash: '6d8ef289',
      rms: 0.028133,
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
