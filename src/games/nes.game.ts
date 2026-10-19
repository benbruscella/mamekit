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
    // MMC3: the world map's status bar is split off by the cartridge's
    // scanline IRQ. Its counter compared against a PPU constant that never
    // lowered, so the IRQ never fired and the bar drew from the map's tiles.
    id: 'smb3u',
    kind: 'gameplay',
    cartridge: 'smb3u',
    romEnvironment: 'MAMEKIT_NES_ROM',
    frames: 1500,
    minimumFps: 30,
    checkpoints: [1, 60, 300, 600, 900, 1200, 1500],
    actions: [
      { atFrame: 300, code: 'Enter', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 420, code: 'Enter', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 700, code: 'KeyZ', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 900, code: 'KeyZ', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 1300, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    ],
    golden: {
      regions: {
        chr: 'c2928c49',
        maincpu: 'd7978eeb',
        prg: 'a0ed7d20',
      },
      checkpoints: {
        1: { video: 'f0e232c6', state: '7e64d27e' },
        60: { video: '046c207d', state: 'f38039da' },
        300: { video: 'ae941fc6', state: 'dc1289ca' },
        600: { video: '9b52f360', state: '0a5a07da' },
        900: { video: '0cf0db7b', state: '89224f64' },
        1200: { video: '66f63601', state: '995aacb9' },
        1500: { video: '4f3f6ed1', state: 'cae120a1' },
      },
      audio: {
        writes: 9459,
        nonzeroWrites: 8464,
        writeHash: '3ce51dcc',
        pcmHash: '709eb934',
        rms: 0.097529,
      },
    },
  }, {
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
        60: { video: '256433ef', state: '1a9c8b5f' },
        180: { video: '3761e544', state: 'fe8ae7cf' },
        300: { video: '256433ef', state: '350e3b4f' },
        600: { video: 'ea875eff', state: '42d7790a' },
        900: { video: 'bf4550e3', state: '5fe99624' },
        1200: { video: 'e72984f5', state: '4697653f' },
      },
      audio: {
        writes: 5003,
        nonzeroWrites: 4201,
        writeHash: 'c18f7974',
        pcmHash: 'a5088f65',
        rms: 0.078903,
      },
    },
  }],
} satisfies MachineTargetContract;
