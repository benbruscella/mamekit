import type { GameTestContract } from './types.ts';

export const frogger: GameTestContract = {
  game: 'frogger',
  category: 'arcade',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'frogger' },
  romEnvironment: 'MAMEKIT_FROGGER_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowUp', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 450, code: 'ArrowRight', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '2d4299f9',
      gfx1: '29b93069',
      maincpu: '0bd0d96c',
      proms: '413703bf',
    },
    checkpoints: {
      '1': { video: 'e1e3eb19', state: '77b7b219' },
      '60': { video: '35cce89d', state: 'b596d596' },
      '180': { video: '8e5e1f40', state: 'eab65890' },
      '300': { video: '0ac9b660', state: '21518801' },
      '480': { video: '44391a78', state: 'a313c0aa' },
      '600': { video: '92657d75', state: '414dbaa0' },
      '900': { video: '28ff6929', state: 'de2c2386' },
    },
    audio: {
      writes: 1809,
      nonzeroWrites: 1724,
      writeHash: 'b1c8a515',
      pcmHash: '5c2c4055',
      rms: 0.013759,
    },
  },
};
