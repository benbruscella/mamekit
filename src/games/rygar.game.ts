import type { GameTestContract } from './types.ts';

export const rygar: GameTestContract = {
  game: 'rygar',
  category: 'arcade',
  driver: 'src/mame/tecmo/tecmo.cpp',
  machine: { className: 'tecmo_state', name: 'rygar' },
  romEnvironment: 'MAMEKIT_RYGAR_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
  // Rygar's attract cycle reaches "PUSH ONLY 1PLAYER BUTTON" around frame 600,
  // and a start pressed before that is simply not sampled. The credit then
  // opens a ~700-frame story crawl, so Round 1 does not begin until ~1400;
  // moving and attacking are only meaningful after it.
  frames: 2000,
  minimumFps: 30,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200, 1500, 1800, 2000],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 650, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1500, code: 'ArrowRight', heldFrames: 200, releasedFrames: 20 },
    { atFrame: 1750, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      adpcm: '3cc98c5a',
      bgtiles: '038e03e4',
      fgtiles: '629a5982',
      maincpu: 'f98e2867',
      soundcpu: '57ccf14e',
      sprites: 'e13b4a57',
      txtiles: '4d482fb6',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '16f2fa1e' },
      60: { video: 'ad4cd5b4', state: 'fb9ef5cb' },
      180: { video: '0362d0d0', state: 'd6e1bd3e' },
      300: { video: '3b29d407', state: '486a45c6' },
      600: { video: '40b8eb29', state: '9e26e490' },
      900: { video: '89d8fbf0', state: '7bbdd5b0' },
      1200: { video: 'ff96e9ef', state: '3979b1f9' },
      1500: { video: '514b0fbd', state: '04c77e47' },
      1800: { video: '77c69151', state: '0339b4b6' },
      2000: { video: '8daaeafb', state: 'f40b9e24' },
    },
    audio: {
      writes: 334289,
      nonzeroWrites: 327597,
      writeHash: 'e0d58165',
      pcmHash: '12a96aa7',
      rms: 0.070909,
    },
  },
};
