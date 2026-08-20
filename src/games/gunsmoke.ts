import type { GameTestContract } from './types.ts';

export const gunsmoke: GameTestContract = {
  game: 'gunsmoke',
  category: 'arcade',
  driver: 'src/mame/capcom/gunsmoke.cpp',
  machine: { className: 'gunsmoke_state', name: 'gunsmoke' },
  romEnvironment: 'MAMEKIT_GUNSMOKE_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200, 1800],
  actions: [
    { atFrame: 600, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 630, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 900, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 1080, code: 'Space', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 1200, code: 'KeyZ', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '42165920',
      bgtiles: '0af4f7eb',
      chars: 'b61ece9b',
      maincpu: 'e9558550',
      proms: 'c1196f40',
      sprites: '37089da6',
      tiles: 'a2091ec3',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '1abfc93c' },
      60: { video: 'fd2f269d', state: '20cc5a6f' },
      180: { video: 'fc37c1b8', state: '740db3a1' },
      300: { video: 'e2af8d1e', state: 'c33589c5' },
      600: { video: 'eca2166a', state: 'c8af2211' },
      900: { video: '6f34d8ff', state: '93eba40c' },
      1200: { video: 'c7401a28', state: '2a0f3b2b' },
      1800: { video: '05077f3c', state: '0c698607' },
    },
    audio: {
      writes: 319350,
      nonzeroWrites: 171984,
      writeHash: 'f69184da',
      pcmHash: 'e053ca7b',
      rms: 0.085634,
    },
  },
};
