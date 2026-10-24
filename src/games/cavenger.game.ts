import { sourceTarget } from './source-contract.ts';

export const cavenger = sourceTarget({
  game: 'cavenger',
  driver: 'src/mame/universal/ladybug.cpp',
  machine: { className: 'ladybug_state', name: 'ladybug' },
  screen: { width: 240, height: 192 },
  soundKind: 'sn76489',
  golden: {
    regions: {
      gfx1: '6126a698',
      gfx2: '5f302046',
      maincpu: 'c697a39b',
      proms: '91a8ae0c',
    },
    checkpoints: {
      1: { video: '4d5cf6af', state: 'aa9d1673' },
      60: { video: 'f3b56a02', state: '37d776ce' },
      180: { video: 'f3b56a02', state: '24223906' },
      300: { video: 'f3b56a02', state: 'a8d28122' },
      600: { video: '7ce7b68e', state: '88c894b5' },
      900: { video: 'fcb76ebf', state: '2c21e6f1' },
      1200: { video: '79f2af5c', state: '0e235a83' },
    },
    audio: {
      writes: 12120,
      nonzeroWrites: 12071,
      writeHash: '8c725712',
      pcmHash: '0e9d45a6',
      rms: 0.055606,
    },
  },
});
