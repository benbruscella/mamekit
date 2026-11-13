import type { MachineTargetContract } from './types.ts';

/**
 * The Game Boy, accepted against Tetris on its own boot ROM.
 *
 * Its palette callback indexes a file-scope colour table; when that callback
 * began lowering, the table did not, and every pen read black with no
 * diagnostic -- unnoticed because no contract booted a cartridge (#155).
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
        600: { video: 'd366adb1', state: 'bc5ac7c4' },
        1000: { video: '4440fd5c', state: 'abeb2bc5' },
        1400: { video: '4caf877e', state: '8de13c5a' },
        1800: { video: '3547e1c7', state: '293385cf' },
      },
      audio: {
        writes: 1446569,
        nonzeroWrites: 1244809,
        writeHash: '5475ec7d',
        pcmHash: '2ea9a0d3',
        rms: 0.259653,
      },
    },
  }],
} satisfies MachineTargetContract;
