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
      1: { video: '43757903', state: 'aa9d1673' },
      60: { video: '3eae292a', state: 'bcae12dd' },
      180: { video: '3eae292a', state: '31325acb' },
      300: { video: '3eae292a', state: '370dfbed' },
      600: { video: 'acf5ec19', state: 'de2c5070' },
      900: { video: 'cf93537a', state: '0a8e44ca' },
      1200: { video: '43757903', state: 'f8c7de92' },
    },
    audio: {
      writes: 12124,
      nonzeroWrites: 12075,
      writeHash: 'c294bd08',
      pcmHash: '22ad9072',
      rms: 0.055724,
    },
  },
});
