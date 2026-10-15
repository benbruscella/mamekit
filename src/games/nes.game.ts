import type { MachineTargetContract } from './types.ts';

/**
 * The NES, accepted against Super Mario Bros.
 *
 * A console has no romset of its own, so it is accepted against a cartridge
 * mounted the way the console room mounts one. Without a contract the 2C02
 * drifted out of step with multi-line rounds and every cartridge drew one flat
 * colour for months (#155).
 */
export const nes = {
  target: {
    game: 'nes',
    category: 'consoles',
    driver: 'src/mame/nintendo/nes.cpp',
    machine: { className: 'nes_state', name: 'nes' },
    screen: { width: 256, height: 240 },
    soundKind: 'nes',
    media: [{ kind: 'cartridge', status: 'accepted', softwareLists: ['nes'] }],
  },
  scenarios: [{
    id: 'smb1',
    kind: 'gameplay',
    cartridge: 'smb1',
    romEnvironment: 'MAMEKIT_NES_ROM',
    frames: 1200,
    minimumFps: 30,
    checkpoints: [1, 60, 180, 300, 600, 900, 1200],
    actions: [
      { atFrame: 300, code: 'Enter', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 480, code: 'ArrowRight', heldFrames: 180, releasedFrames: 20 },
      { atFrame: 700, codes: ['ArrowRight', 'KeyZ'], heldFrames: 30, releasedFrames: 20 },
    ],
    golden: {
      regions: {
        chr: '867b51ad',
        maincpu: 'd7978eeb',
        prg: '5cf548d3',
      },
      checkpoints: {
        1: { video: 'f0e232c6', state: 'b89b95a5' },
        60: { video: '256433ef', state: '71459f18' },
        180: { video: '3761e544', state: '23d46f3c' },
        300: { video: '2dae77c5', state: '22507fd3' },
        600: { video: '505b14cf', state: '533301f0' },
        900: { video: 'a37bbe2b', state: '87da52be' },
        1200: { video: 'bf4550e3', state: '56f01a7b' },
      },
      audio: {
        writes: 3710,
        nonzeroWrites: 3095,
        writeHash: '51670199',
        pcmHash: '818e31df',
        rms: 0.076373,
      },
    },
  }],
} satisfies MachineTargetContract;
