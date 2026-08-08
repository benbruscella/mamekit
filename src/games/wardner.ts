import { sourceTarget } from './source-contract.ts';

export const wardner = sourceTarget({
  game: 'wardner',
  driver: 'src/mame/toaplan/wardner.cpp',
  machine: { className: 'wardner_state', name: 'wardner' },
  screen: { width: 320, height: 240 },
  soundKind: 'none',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
  ],
});
