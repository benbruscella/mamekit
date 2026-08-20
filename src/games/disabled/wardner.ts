// DISABLED: this target is not discovered, generated or shipped.
//
// Play-test finding, issue #53: Doesn't boot.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

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
