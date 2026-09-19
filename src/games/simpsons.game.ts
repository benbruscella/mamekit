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
      180: { video: '0f473070', state: '29ef0d6a' },
      300: { video: 'ec175a73', state: '2c7d3615' },
      600: { video: 'e535761f', state: '704b0abe' },
      900: { video: '4e93fa90', state: '4b75299a' },
      1200: { video: '4884073c', state: '20f65892' },
    },
    audio: {
      writes: 56867,
      nonzeroWrites: 55155,
      writeHash: '1bc0392a',
      pcmHash: '411e4054',
      rms: 0.03381,
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
