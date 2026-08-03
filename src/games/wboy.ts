import { sourceTarget } from './source-contract.ts';

export const wboy = sourceTarget({
  game: 'wboy',
  driver: 'src/mame/sega/system1.cpp',
  machine: { className: 'system1_state', name: 'wboy' },
  screen: { width: 512, height: 224 },
  soundKind: 'sn76489',
});
