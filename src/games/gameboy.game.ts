import type { MachineTargetContract } from './types.ts';

/**
 * The Game Boy, accepted against Tetris on its own boot ROM and against
 * Super Mario Land 2 on an MBC1 with battery-backed RAM.
 *
 * Its palette callback indexes a file-scope colour table; when that callback
 * began lowering, the table did not, and every pen read black with no
 * diagnostic -- unnoticed because no contract booted a cartridge (#155).
 *
 * Tetris is a plain ROM board, and for as long as it was the only cartridge
 * booted, no mapper board could load at all: 1,469 of the software list's
 * 1,743 titles are MBC1 (#294). Super Mario Land 2 checks its save RAM before
 * its title screen, so it boots only with the board's RAM view decoded and
 * its RAM-enable register reaching it, and its file select reads that RAM.
 */
export const gameboy = {
  target: {
    game: 'gameboy',
    category: 'consoles',
    driver: 'src/mame/nintendo/gb.cpp',
    machine: { className: 'gb_state', name: 'gameboy' },
    screen: { width: 160, height: 144 },
    soundKind: 'stream',
    media: [
      { kind: 'bios', status: 'accepted' },
      { kind: 'cartridge', status: 'accepted', softwareLists: ['gameboy'] },
    ],
  },
  scenarios: [{
    id: 'tetris',
    kind: 'gameplay',
    cartridge: 'tetris',
    romEnvironment: 'MAMEKIT_GAMEBOY_ROM',
    frames: 1800,
    minimumFps: 30,
    checkpoints: [1, 60, 300, 600, 1000, 1400, 1800],
    actions: [
      { atFrame: 1050, code: 'Enter', heldFrames: 10, releasedFrames: 30 },
      { atFrame: 1110, code: 'KeyZ', heldFrames: 10, releasedFrames: 30 },
      { atFrame: 1170, code: 'KeyZ', heldFrames: 10, releasedFrames: 30 },
      { atFrame: 1230, code: 'KeyZ', heldFrames: 10, releasedFrames: 30 },
      { atFrame: 1350, code: 'ArrowLeft', heldFrames: 30, releasedFrames: 20 },
      { atFrame: 1450, code: 'KeyZ', heldFrames: 10, releasedFrames: 20 },
    ],
    golden: {
      regions: {
        'cartslot:rom': '46df91ad',
        maincpu: '59c8598e',
      },
      checkpoints: {
        1: { video: '316e0fab', state: '380a4f29' },
        60: { video: '56738fc4', state: '7871ff4d' },
        300: { video: 'a98b199f', state: '1b0437d1' },
        600: { video: 'd366adb1', state: 'fdc5ac3f' },
        1000: { video: '4440fd5c', state: '8b26788c' },
        1400: { video: '0f75c814', state: 'c8114535' },
        1800: { video: '769daead', state: '9fd031fe' },
      },
      audio: {
        writes: 1446569,
        nonzeroWrites: 1244600,
        writeHash: 'f3fe396d',
        pcmHash: 'dfacdcb2',
        rms: 0.259725,
      },
    },
  }, {
    id: 'sml2',
    kind: 'gameplay',
    cartridge: 'sml2',
    romEnvironment: 'MAMEKIT_GAMEBOY_ROM',
    frames: 1800,
    minimumFps: 30,
    checkpoints: [1, 60, 300, 600, 1000, 1400, 1800],
    actions: [
      { atFrame: 700, code: 'Enter', heldFrames: 10, releasedFrames: 30 },
      { atFrame: 900, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
      { atFrame: 1000, code: 'KeyZ', heldFrames: 20, releasedFrames: 30 },
      { atFrame: 1300, code: 'Enter', heldFrames: 10, releasedFrames: 30 },
      { atFrame: 1500, code: 'KeyZ', heldFrames: 10, releasedFrames: 30 },
    ],
    golden: {
      regions: {
        'cartslot:nvram': 'cdf06530',
        'cartslot:rom': '635a9112',
        maincpu: '59c8598e',
      },
      checkpoints: {
        1: { video: '316e0fab', state: '380a4f29' },
        60: { video: '56738fc4', state: '7871ff4d' },
        300: { video: 'a98b199f', state: '1b0437d1' },
        600: { video: '68e5918f', state: '75ee33ee' },
        1000: { video: 'b47ca8fd', state: '133c91ed' },
        1400: { video: '3f99e90b', state: 'e8e15281' },
        1800: { video: '29e13665', state: '631cc700' },
      },
      audio: {
        writes: 1446569,
        nonzeroWrites: 1246091,
        writeHash: '0108782c',
        pcmHash: 'fe2d6b1a',
        rms: 0.319633,
      },
    },
  }],
} satisfies MachineTargetContract;
