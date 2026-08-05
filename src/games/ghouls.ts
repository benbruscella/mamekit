import { sourceTarget } from './source-contract.ts';

export const ghouls = sourceTarget({
  game: 'ghouls',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_10MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'ym2151',
});
