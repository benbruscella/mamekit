import { sourceTarget } from './source-contract.ts';

export const simpsons = sourceTarget({
  game: 'simpsons',
  driver: 'src/mame/konami/simpsons.cpp',
  machine: { className: 'simpsons_state', name: 'simpsons' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2151',
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
      1: { video: '2aa9b3cc', state: 'eec41d05' },
      60: { video: '2aa9b3cc', state: '7051615e' },
      180: { video: '0f473070', state: '648b778a' },
      300: { video: 'ec175a73', state: 'f6abe6c8' },
      600: { video: 'e535761f', state: '0d4cd99b' },
      900: { video: '4e93fa90', state: '65125986' },
      1200: { video: '4884073c', state: 'c2fe3648' },
    },
    audio: {
      writes: 57046,
      nonzeroWrites: 55331,
      writeHash: '59d413f6',
      pcmHash: '9cb310e0',
      rms: 0.034053,
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
    method: 'k053260.write',
    offset: 0x28,
    fromFrame: 120,
    minimumNonzeroWrites: 20,
  }],
});
