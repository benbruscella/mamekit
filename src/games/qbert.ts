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
});
