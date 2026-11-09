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
      1: { video: '2aa9b3cc', state: '887003b6' },
      60: { video: '2aa9b3cc', state: '37bea418' },
      180: { video: '0f473070', state: '37a12ccc' },
      300: { video: 'ec175a73', state: 'f3ce67fe' },
      600: { video: 'e535761f', state: '689f4339' },
      900: { video: '4e93fa90', state: 'e4a01f05' },
      1200: { video: '4884073c', state: '3be8f5ba' },
    },
    audio: {
      writes: 57268,
      nonzeroWrites: 55544,
      writeHash: 'dd9414c0',
      pcmHash: 'ff3e30ea',
      rms: 0.016739,
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
