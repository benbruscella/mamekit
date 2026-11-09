import { sourceTarget } from './source-contract.ts';

export const rygar = sourceTarget({
  game: 'rygar',
  driver: 'src/mame/tecmo/tecmo.cpp',
  machine: { className: 'tecmo_state', name: 'rygar' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: 'f7e6ac81', state: '3d5a448f' },
      60: { video: '85b1b113', state: '563ecac8' },
      180: { video: '74f6cf8c', state: '893ad5fc' },
      300: { video: '3b29d407', state: 'ae721133' },
      600: { video: '40b8eb29', state: '3f221a94' },
      900: { video: 'eee2f88f', state: 'dcd54b8c' },
      1200: { video: 'eed2db24', state: 'dff32a58' },
      1500: { video: 'eee48af4', state: '779e27ea' },
      1800: { video: '8b0305e4', state: '45e64072' },
      2000: { video: 'fce9e1ca', state: '1bcae185' },
    },
    audio: {
      writes: 334220,
      nonzeroWrites: 327535,
      writeHash: '0c83eef4',
      pcmHash: '1fde3c31',
      rms: 0.070909,
    },
  },
});
