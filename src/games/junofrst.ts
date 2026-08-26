import type { GameTestContract } from './types.ts';

export const junofrst: GameTestContract = {
  game: 'junofrst',
  category: 'arcade',
  driver: 'src/mame/konami/junofrst.cpp',
  machine: { className: 'junofrst_state', name: 'junofrst' },
  romEnvironment: 'MAMEKIT_JUNOFIRST_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 300, 480, 720, 1200],
  actions: [
    { atFrame: 480, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 510, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 720, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 840, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  audioRequirements: [{
    method: 'dac.data_w',
    fromFrame: 120,
    minimumNonzeroWrites: 100,
  }],
  golden: {
    regions: {
      audiocpu: '235a2893',
      blitrom: '7fc240e9',
      maincpu: '47842aab',
      mcu: 'd0fa5d5f',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: 'c9e2d9ae' },
      60: { video: 'f8a0d088', state: 'f0e772a8' },
      300: { video: 'ddad08c3', state: 'e35766c6' },
      480: { video: 'e5b26a75', state: '84da7540' },
      720: { video: '90ec6eb7', state: '0ce5716e' },
      1200: { video: '29686572', state: '3df13a83' },
    },
    audio: {
      writes: 46837,
      nonzeroWrites: 25796,
      writeHash: 'aec766f9',
      pcmHash: '3cf27fb8',
      rms: 0.19477,
    },
  },
};
