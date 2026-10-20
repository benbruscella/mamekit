import type { MachineTargetContract } from '../types.ts';

/**
 * The ZX Spectrum 128, through its menu's Tape Loader (the start presses
 * ENTER on the first item) with a 128K title: Elite, whose MAME entry is the
 * 128K version, loads at the ROM's speed to its rotating Cobra and AY music.
 * The +2 is a clone on the same tile.
 */
export const spec128 = {
  target: {
    game: 'spec128',
    category: 'computers',
    driver: 'src/mame/sinclair/spec128.cpp',
    machine: { className: 'spectrum_128_state', name: 'spectrum_128' },
    screen: { width: 352, height: 296 },
    soundKind: 'ay8910',
    media: [
      { kind: 'bios', status: 'candidate' },
      { kind: 'cartridge', status: 'candidate', softwareLists: ['spectrum_cart'] },
      { kind: 'quickload', status: 'planned' },
      { kind: 'cassette', status: 'candidate', softwareLists: ['spectrum_cass'] },
    ],
  },
  scenarios: [{
    // The menu, pixel for pixel as MAME 0.289 draws it at frame 300, then
    // DOWN to the next item: the menu's own beep on the speaker.
    id: 'menu',
    kind: 'gameplay',
    romEnvironment: 'MAMEKIT_SPECTRUM_ROM',
    frames: 400,
    minimumFps: 10,
    checkpoints: [1, 60, 150, 300, 400],
    actions: [{ atFrame: 301, text: '{DOWN}' }],
    golden: {
      regions: {
        maincpu: 'b6939fc8',
      },
      checkpoints: {
        1: { video: 'bbcdf0e0', state: '1f52250f' },
        60: { video: '80f42a7f', state: '135ff089' },
        150: { video: '087fceb1', state: 'd12e4d5a' },
        300: { video: '087fceb1', state: 'd82b743c' },
        400: { video: '087fceb1', state: '5bd86d37' },
      },
      audio: {
        writes: 383837,
        nonzeroWrites: 90158,
        writeHash: 'f7f67b73',
        pcmHash: '0da6e75c',
        rms: 0.002782,
      },
    },
  }, {
    // ENTER on the Tape Loader, PLAY, the loading screen (by frame 3000), the
    // main block (the tape stops at 298.6 s, as MAME stops it), the title.
    id: 'tape',
    kind: 'media',
    software: { list: 'spectrum_cass', name: 'elite' },
    romEnvironment: 'MAMEKIT_SPECTRUM_ROM',
    frames: 16500,
    minimumFps: 10,
    checkpoints: [1, 300, 3000, 9000, 15500, 16500],
    actions: [],
    golden: {
      regions: {
        maincpu: 'b6939fc8',
      },
      checkpoints: {
        1: { video: 'bbcdf0e0', state: '1f52250f' },
        300: { video: '1dc2b829', state: 'dd4333f7' },
        3000: { video: '2f9d30b2', state: 'b3d60445' },
        9000: { video: 'da92a9e2', state: 'dadfaab0' },
        15500: { video: '6d040ad2', state: 'a94d0802' },
        16500: { video: '455c8554', state: '4c7636bd' },
      },
      audio: {
        writes: 15833301,
        nonzeroWrites: 15833301,
        writeHash: '2c6e4dba',
        pcmHash: '27530235',
        rms: 0.014082,
      },
    },
  }],
} satisfies MachineTargetContract;
