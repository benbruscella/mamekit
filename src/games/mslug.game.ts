import { sourceTarget } from './source-contract.ts';

export const mslug = sourceTarget({
  game: 'mslug',
  // Bounded closure gaps covered by this target's real-ROM acceptance.
  runtimeCoverage: {
    generationGaps: [
      'cslot1:NEOGEO_CART_SLOT',
      'ctrl1:NEOGEO_CONTROL_PORT',
      'ctrl2:NEOGEO_CONTROL_PORT',
      'edge:NEOGEO_CTRL_EDGE_CONNECTOR',
      'memcard:NG_MEMCARD',
      'upd4990a:UPD4990A',
    ],
    handlerGaps: [],
  },
  driver: 'src/mame/snk/neogeo.cpp',
  machine: { className: 'mvs_led_state', name: 'neobase' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2203',
  // The MVS BIOS runs its RAM, calendar and cartridge checks for roughly the
  // first 780 frames, then hands over to the game's own attract loop. Coin and
  // start are exercised after that unmodified handoff, and each needs a press
  // long enough for the BIOS to sample the edge -- a ten-frame tap is dropped.
  // Starting a credit opens Metal Slug's own HOW TO PLAY tutorial; a joystick
  // press dismisses it, so the first movement doubles as the skip and Mission 1
  // begins around frame 2700. The later movement and fire land in live play,
  // which is what keeps the player sprite of issue #91 under a checkpoint.
  frames: 3000,
  checkpoints: [1, 300, 900, 1200, 1800, 2400, 2800, 3000],
  actions: [
    { atFrame: 950, code: 'Digit5', heldFrames: 30, releasedFrames: 30 },
    { atFrame: 1120, code: 'Digit1', heldFrames: 30, releasedFrames: 30 },
    { atFrame: 2300, code: 'ArrowRight', heldFrames: 90, releasedFrames: 20 },
    { atFrame: 2420, code: 'Space', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 2800, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 2940, code: 'Space', heldFrames: 30, releasedFrames: 20 },
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
      1: { video: '2aa9b3cc', state: '67981449' },
      300: { video: 'b3458424', state: '3e901a97' },
      900: { video: '53fabdcd', state: '938b3d96' },
      1200: { video: '372e9006', state: '353ac9f4' },
      1800: { video: '87988568', state: 'c346e50e' },
      2400: { video: '845b8d2e', state: 'd3f8b2b5' },
      2800: { video: '5a332ea9', state: '40f38bc2' },
      3000: { video: '94b7ad3b', state: 'dfa8afc5' },
    },
    audio: {
      writes: 87130,
      nonzeroWrites: 79488,
      writeHash: '4ee06878',
      pcmHash: 'cc0fcc29',
      rms: 0.084551,
    },
  },
});
