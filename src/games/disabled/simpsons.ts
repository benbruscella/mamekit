// DISABLED: this target is not discovered, generated or shipped.
//
// Parked by issue #53 on play-test evidence; re-examined for issue #108,
// which is where the measurements below come from.
//
// Black for all 1200 frames; the picture never changes after frame 1.
// The Konami video chips it needs are runtime bridges rather than
// generated devices -- K052109 (tilemaps), K053246 (sprites) and K053260
// (sound) are all still generation gaps -- so there is nothing to draw.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const simpsons = sourceTarget({
  game: 'simpsons',
  driver: 'src/mame/konami/simpsons.cpp',
  machine: { className: 'simpsons_state', name: 'simpsons' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2151',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
  ],
});
