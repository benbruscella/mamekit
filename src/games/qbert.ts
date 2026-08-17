import { sourceTarget } from './source-contract.ts';

export const qbert = sourceTarget({
  game: 'qbert',
  driver: 'src/mame/gottlieb/gottlieb.cpp',
  machine: { className: 'gottlieb_state', name: 'qbert' },
  screen: { width: 256, height: 240 },
  soundKind: 'dac',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      bgtiles: '365a875e',
      maincpu: 'be0a0530',
      'r1sound:audiocpu': 'a20d1420',
      sprites: 'd8a2b040',
    },
    checkpoints: {
      1: { video: '07673647', state: 'b9dcb33a' },
      60: { video: '0a71ec05', state: 'e3a6a9b3' },
      180: { video: 'abff0230', state: '89dd7372' },
      300: { video: '6aed9f1e', state: 'd8185c96' },
      600: { video: '84843a5e', state: 'e9c85c59' },
      900: { video: '23bb479e', state: 'fb3eaa0d' },
      1200: { video: '23bb479e', state: 'a5621254' },
    },
    audio: {
      writes: 6,
      nonzeroWrites: 3,
      writeHash: 'adf9e363',
      pcmHash: '6ae1ca16',
      rms: 0.865539,
    },
  },
});
