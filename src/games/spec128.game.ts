import type { MachineTargetContract } from "./types.ts";

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
    soundKind: 'stream',
    media: [
      { kind: 'bios', status: 'accepted' },
      { kind: 'cartridge', status: 'candidate', softwareLists: ['spectrum_cart'] },
      { kind: 'quickload', status: 'planned' },
      { kind: 'cassette', status: 'accepted', softwareLists: ['spectrum_cass'] },
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
        1: { video: 'bbcdf0e0', state: 'a3526d96' },
        60: { video: '654b2a59', state: '48e06e4a' },
        150: { video: '087fceb1', state: '3c0b42da' },
        300: { video: '087fceb1', state: 'a4d203f8' },
        400: { video: '087fceb1', state: 'f2aaa5fa' },
      },
      audio: {
        writes: 383837,
        nonzeroWrites: 383835,
        writeHash: 'fc62c534',
        pcmHash: 'd5eb51e3',
        rms: 0.187693,
      },
    },
  }, {
    // ENTER on the Tape Loader, PLAY, the loading screen (by frame 3000), and
    // the main block still loading at 9000. The load ends at the title near
    // frame 15500 (the tape stops at 298.6 s, as MAME stops it), but a run that
    // long passes the acceptance matrix's eight minutes on a CI runner, which
    // runs this board at half a development machine's speed. The 48K's tape
    // scenario carries a whole load through the same cassette.
    id: 'tape',
    kind: 'media',
    software: { list: 'spectrum_cass', name: 'elite' },
    romEnvironment: 'MAMEKIT_SPECTRUM_ROM',
    frames: 9000,
    minimumFps: 10,
    checkpoints: [1, 300, 3000, 8500, 9000],
    actions: [],
    golden: {
      regions: {
        maincpu: 'b6939fc8',
      },
      checkpoints: {
        1: { video: 'bbcdf0e0', state: 'a3526d96' },
        300: { video: 'd9ebcf40', state: 'a64998f9' },
        3000: { video: '8438bfb5', state: '18bc5121' },
        8500: { video: '63dd3d82', state: '546812f1' },
        9000: { video: '7e352ec3', state: '58acb418' },
      },
      audio: {
        writes: 8636346,
        nonzeroWrites: 8636344,
        writeHash: '941d1d56',
        pcmHash: 'b040c999',
        rms: 0.137817,
      },
    },
  }],
} satisfies MachineTargetContract;
