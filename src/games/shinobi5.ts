import { sourceTarget } from './source-contract.ts';

export const shinobi5 = sourceTarget({
  game: 'shinobi5',
  driver: 'src/mame/sega/segas16b.cpp',
  machine: { className: 'segas16b_state', name: 'system16b' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2151',
});
