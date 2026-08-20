// DISABLED: this target is not discovered, generated or shipped.
//
// Play-test finding, issue #53: Runs at about 10 fps.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const wboy = sourceTarget({
  game: 'wboy',
  driver: 'src/mame/sega/system1.cpp',
  machine: { className: 'system1_state', name: 'wboy' },
  screen: { width: 512, height: 224 },
  soundKind: 'sn76489',
  golden: {
    regions: {
      decrypted_opcodes: 'c4509bc9',
      lookup_proms: '648350b8',
      maincpu: 'b83d8d10',
      soundcpu: 'cb7f6cfe',
      sprites: '03c30d1c',
      tiles: '8f981a09',
    },
    checkpoints: {
      '1': { video: '82cad202', state: '21fc0acc' },
      '60': { video: 'efb83347', state: '8ba56dd5' },
      '180': { video: '6f5e1d35', state: 'b4166c81' },
      '300': { video: 'ff686385', state: 'da6be6a6' },
      '600': { video: 'dd2e6b45', state: 'c4bc998f' },
      '900': { video: '5df5eb7f', state: '7a01e37d' },
      '1200': { video: '252daab4', state: '1ef7e849' },
    },
    audio: {
      writes: 52786,
      nonzeroWrites: 48493,
      writeHash: '8e0c2458',
      pcmHash: '8b20e745',
      rms: 0.046511,
    },
  },
});
