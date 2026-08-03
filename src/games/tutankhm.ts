import type { GameTestContract } from './types.ts';

export const tutankhm: GameTestContract = {
  game: 'tutankhm',
  category: 'arcade',
  driver: 'src/mame/konami/tutankhm.cpp',
  machine: { className: 'tutankhm_state', name: 'tutankhm' },
  romEnvironment: 'MAMEKIT_TUTANKHM_ROM',
  screen: { width: 768, height: 224 },
  soundKind: 'ay8910',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyL', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: '1aa48a17',
      'timeplt_audio:tpsound': 'c196904d',
    },
    checkpoints: {
      1: { video: '9dbaf643', state: '937cf7f1' },
      60: { video: '9dbaf643', state: 'e753e92d' },
      180: { video: 'ff63499c', state: '09266f6a' },
      300: { video: 'a28f5969', state: '6b6cf8bc' },
      600: { video: '7430a61c', state: '538346b0' },
      900: { video: 'd8fc910a', state: '2e780606' },
      1200: { video: '9762700b', state: 'd1e49c7a' },
    },
    audio: {
      writes: 17384,
      nonzeroWrites: 11334,
      writeHash: 'cd2aed6e',
      pcmHash: '4e502694',
      rms: 0.009979,
    },
  },
};
