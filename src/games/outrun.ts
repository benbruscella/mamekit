import { sourceTarget } from './source-contract.ts';

export const outrun = sourceTarget({
  game: 'outrun',
  driver: 'src/mame/sega/segaorun.cpp',
  machine: { className: 'segaorun_state', name: 'outrun' },
  screen: { width: 320, height: 224 },
  soundKind: 'none',
});
