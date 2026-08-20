// DISABLED: this target is not discovered, generated or shipped.
//
// Play-test finding, issue #53: Player sprite is missing, so it isn't
// playable.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const mslug = sourceTarget({
  game: 'mslug',
  driver: 'src/mame/snk/neogeo.cpp',
  machine: { className: 'mvs_led_state', name: 'neobase' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2203',
  // The MVS BIOS performs its RTC, sound-board and cartridge checks before it
  // starts polling the game controls. Exercise credit/start only after that
  // unmodified handoff, then hold movement and fire during live gameplay.
  actions: [
    { atFrame: 920, code: 'Digit5', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 1000, code: 'Digit1', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 1050, code: 'ArrowRight', heldFrames: 70, releasedFrames: 20 },
    { atFrame: 1150, code: 'Space', heldFrames: 20, releasedFrames: 10 },
  ],
  golden: {
    regions: {
      audiobios: '94416d67',
      audiocpu: 'a7c77991',
      'cslot1:audiocpu': 'e28ae61b',
      'cslot1:fixed': '2f55958d',
      'cslot1:maincpu': '3aba33bc',
      'cslot1:sprites': 'e20d5589',
      'cslot1:ymsnd:adpcma': '14cf8459',
      fixedbios: 'c2ea0cfd',
      mainbios: '60d1d776',
      'spritegen:zoomy': '5a86cff2',
    },
    checkpoints: {
      1: { video: '2aa9b3cc', state: '73b20561' },
      60: { video: '2aa9b3cc', state: 'fb5dc84c' },
      180: { video: 'ad7d4c9e', state: '4e4bc2de' },
      300: { video: '672666cc', state: '51685f76' },
      600: { video: '29058117', state: '6f56bbfb' },
      900: { video: 'dfc63b1d', state: '65f82d65' },
      1200: { video: '774677be', state: 'f2e020c8' },
    },
    audio: {
      writes: 26781,
      nonzeroWrites: 24005,
      writeHash: 'ff576f26',
      pcmHash: '7a7eecac',
      rms: 0.043727,
    },
  },
});
