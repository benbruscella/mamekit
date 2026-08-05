import { sourceTarget } from './source-contract.ts';

export const gauntlet = sourceTarget({
  game: 'gauntlet',
  driver: 'src/mame/atari/gauntlet.cpp',
  machine: { className: 'gauntlet_state', name: 'gauntlet' },
  screen: { width: 336, height: 240 },
  soundKind: 'ym2151',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
});
