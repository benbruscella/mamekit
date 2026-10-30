import { sourceTarget } from './source-contract.ts';

export const gyruss = sourceTarget({
  game: 'gyruss',
  driver: 'src/mame/konami/gyruss.cpp',
  machine: { className: 'gyruss_state', name: 'gyruss' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 300, 480, 720, 1200, 1800],
  actions: [
    { atFrame: 480, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 510, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 720, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 840, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audio2: '3f9b5dea',
      audiocpu: 'a1cb4e34',
      maincpu: '487c787d',
      proms: '617d77e3',
      sprites: '21881251',
      sub: '8d48e501',
      tiles: '27d8329b',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: 'ee93fd47' },
      60: { video: '8f81534a', state: 'a5b0ea5a' },
      300: { video: 'dcb5f4e5', state: 'bc790fd7' },
      480: { video: '0a084be4', state: '73612a6c' },
      720: { video: '95737fab', state: 'e2796740' },
      1200: { video: '9a4e450b', state: 'e87e30a6' },
      1800: { video: 'd323c100', state: 'c73e1ff3' },
    },
    audio: {
      writes: 192376,
      nonzeroWrites: 149826,
      writeHash: 'c3671124',
      pcmHash: '682414c4',
      rms: 0.172137,
    },
  },
});
