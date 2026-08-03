import { sourceTarget } from './source-contract.ts';

export const venture = sourceTarget({
  game: 'venture',
  driver: 'src/mame/exidy/exidy.cpp',
  machine: { className: 'exidy_state', name: 'venture' },
  screen: { width: 256, height: 256 },
  soundKind: 'none',
});
