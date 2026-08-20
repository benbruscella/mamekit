// DISABLED: this target is not discovered, generated or shipped.
//
// Play-test finding, issue #53: Doesn't boot.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const rtype = sourceTarget({
  game: 'rtype',
  driver: 'src/mame/irem/m72.cpp',
  machine: { className: 'm72_state', name: 'rtype' },
  screen: { width: 384, height: 256 },
  soundKind: 'ym2151',
});
