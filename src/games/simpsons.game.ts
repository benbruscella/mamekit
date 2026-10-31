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
      1: { video: '2aa9b3cc', state: '05ad389f' },
      60: { video: '2aa9b3cc', state: '1c3f6d8c' },
      180: { video: '0f473070', state: '4edbe81d' },
      300: { video: 'ec175a73', state: '5fd6e418' },
      600: { video: 'e535761f', state: '6393a783' },
      900: { video: '4e93fa90', state: '3e5f76a0' },
      1200: { video: '4884073c', state: 'fcd2e836' },
    },
    audio: {
      writes: 57268,
      nonzeroWrites: 55544,
      writeHash: '725fdd8f',
      pcmHash: 'e61b0974',
      rms: 0.033478,
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
