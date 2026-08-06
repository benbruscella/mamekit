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
      1: { video: '07673647', state: 'f70f46dd' },
      60: { video: '1c8750a0', state: '27f4af48' },
      180: { video: '1c8750a0', state: 'fb598a3b' },
      300: { video: '1c8750a0', state: '6d022aaa' },
      600: { video: '1c8750a0', state: '371707ee' },
      900: { video: 'a8a16255', state: '4ef57606' },
      1200: { video: 'a8a16255', state: 'b1bc0da7' },
    },
    audio: {
      writes: 6,
      nonzeroWrites: 3,
      writeHash: '52b0d5bb',
      pcmHash: '94bbed65',
      rms: 0.701047,
    },
  },
});
