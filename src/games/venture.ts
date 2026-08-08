import { sourceTarget } from './source-contract.ts';

export const venture = sourceTarget({
  game: 'venture',
  driver: 'src/mame/exidy/exidy.cpp',
  machine: { className: 'exidy_state', name: 'venture' },
  screen: { width: 256, height: 256 },
  soundKind: 'exidy',
  frames: 6200,
  checkpoints: [1, 60, 180, 300, 1200, 2400, 3000, 3600, 4200, 4800, 5400, 6000, 6200],
  actions: [
    // Venture ignores cabinet inputs while its unusually long board self-test
    // is running. Exercise coin/start only after the attract maze is live.
    { atFrame: 3100, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 3150, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 5200, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 5400, code: 'ArrowUp', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 5600, code: 'ArrowLeft', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 5800, code: 'ArrowDown', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 6000, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  audioRequirements: [
    { method: 'sh8253_w', fromFrame: 3100, minimumNonzeroWrites: 100 },
    { method: 'sh6840_w', fromFrame: 3100, minimumNonzeroWrites: 100 },
    { method: 'sfxctrl_w', fromFrame: 3100, minimumNonzeroWrites: 100 },
  ],
  minimumFps: 45,
  minimumAudioRms: 0.02,
  golden: {
    regions: {
      gfx1: 'ea6fd981',
      maincpu: '0b646ce6',
      proms: '599fa32d',
      'soundbd:audiocpu': '48a9057b',
    },
    checkpoints: {
      1: { video: '21f25028', state: 'f32b0312' },
      60: { video: '21f25028', state: '848e9345' },
      180: { video: 'd2fa9021', state: '323f68e4' },
      300: { video: '65144fc9', state: '23458ed2' },
      1200: { video: '81872b36', state: '9f833257' },
      2400: { video: '1c482054', state: '5b243cda' },
      3000: { video: '0ed3fb63', state: '95255432' },
      3600: { video: '3a6446cb', state: '7f3b9660' },
      4200: { video: 'ad4a5a7c', state: 'e4dea50a' },
      4800: { video: 'ceb30300', state: '6b55cdd0' },
      5400: { video: 'db19234e', state: '0b563622' },
      6000: { video: '096988ef', state: 'c31ccde8' },
      6200: { video: '1c482054', state: 'c370e7d3' },
    },
    audio: {
      writes: 9501,
      nonzeroWrites: 6812,
      writeHash: '6e16be53',
      pcmHash: '8da65cb1',
      rms: 0.068698,
    },
  },
});
