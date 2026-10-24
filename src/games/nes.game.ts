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
        maincpu: 'd7978eeb',
        'nes_slot:cart:chr_rom': 'c2928c49',
        'nes_slot:cart:prg_rom': 'a0ed7d20',
      },
      checkpoints: {
        1: { video: 'eaa6bd97', state: '3757b645' },
        60: { video: '046c207d', state: '4507a56e' },
        300: { video: '6f4fdfdd', state: '4c221943' },
        600: { video: '9b52f360', state: '159644c0' },
        900: { video: '91958828', state: '89224f64' },
        1200: { video: '188fb6f1', state: '685f880a' },
        1500: { video: '9d206dfe', state: '77d15e61' },
      },
      audio: {
        writes: 9462,
        nonzeroWrites: 8465,
        writeHash: 'fe86ed9f',
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
        maincpu: 'd7978eeb',
        'nes_slot:cart:chr_rom': '867b51ad',
        'nes_slot:cart:prg_rom': '5cf548d3',
      },
      checkpoints: {
        1: { video: 'eaa6bd97', state: '4c03b595' },
        60: { video: '256433ef', state: 'f62b4b0d' },
        180: { video: '3761e544', state: 'fe8ae7cf' },
        300: { video: '256433ef', state: 'b260ef5a' },
        600: { video: 'ea875eff', state: '42d7790a' },
        900: { video: 'bf4550e3', state: '5fe99624' },
        1200: { video: 'e72984f5', state: 'bfb58236' },
      },
      audio: {
        writes: 5012,
        nonzeroWrites: 4211,
        writeHash: '4a628665',
        pcmHash: 'abfd15d2',
        rms: 0.07946,
      },
    },
  }, {
    // The Zapper, fitted because nes.xml asks for it (`peripheral`): aimed
    // at the first duck of Game A and fired. The game blacks the screen, then
    // draws a white box where the duck is and reads the gun's light sensor
    // as the beam crosses it -- MAME's sensor reading the picture drawn so
    // far (`screen().update_now()`, `pixel()`). A hit drops the duck and
    // scores 500, as MAME 0.289 does with the same shot.
    id: 'duckhunt',
    kind: 'gameplay',
    cartridge: 'duckhunt',
    romEnvironment: 'MAMEKIT_NES_ROM',
    frames: 761,
    minimumFps: 30,
    checkpoints: [1, 300, 620, 629, 661, 701, 761],
    actions: [
      { atFrame: 101, code: 'Enter', heldFrames: 6, releasedFrames: 10 },
      { atFrame: 621, aim: [95, 106] },
      { atFrame: 622, code: 'Space', heldFrames: 6, releasedFrames: 10 },
    ],
    golden: {
      regions: {
        maincpu: 'd7978eeb',
        'nes_slot:cart:chr_rom': '4e049e03',
        'nes_slot:cart:prg_rom': 'f4286d0f',
      },
      checkpoints: {
        1: { video: 'eaa6bd97', state: '66f0722b' },
        300: { video: '2802be17', state: 'b64287a9' },
        620: { video: 'c86d207e', state: '001c132c' },
        629: { video: '07673647', state: 'e5639c06' },
        661: { video: '1811e040', state: '0796a239' },
        701: { video: '53c8f4ab', state: '0031b8ce' },
        761: { video: '67840d44', state: '72fb2e77' },
      },
      audio: {
        writes: 1611,
        nonzeroWrites: 1529,
        writeHash: '89109053',
        pcmHash: 'e052dbf4',
        rms: 0.127164,
      },
    },
  }, {
    // The Vaus, fitted because nes.xml asks for it: its button serves the
    // game, and its paddle (MAME's PORT_MINMAX 0x78-0x1f8, PORT_CENTERDELTA 0)
    // is driven to each end and stays where it is put.
    id: 'arkanoid',
    kind: 'gameplay',
    cartridge: 'arkanoid',
    romEnvironment: 'MAMEKIT_NES_ROM',
    frames: 1060,
    minimumFps: 30,
    checkpoints: [1, 300, 600, 900, 950, 1000, 1060],
    actions: [
      { atFrame: 200, code: 'Space', heldFrames: 5, releasedFrames: 60 },
      { atFrame: 270, code: 'Space', heldFrames: 5, releasedFrames: 60 },
      { atFrame: 340, code: 'Space', heldFrames: 5, releasedFrames: 60 },
      { atFrame: 410, code: 'Space', heldFrames: 5, releasedFrames: 60 },
      { atFrame: 900, code: 'ArrowLeft', heldFrames: 40, releasedFrames: 10 },
      { atFrame: 960, code: 'ArrowRight', heldFrames: 60, releasedFrames: 10 },
    ],
    golden: {
      regions: {
        maincpu: 'd7978eeb',
        'nes_slot:cart:chr_rom': 'c5789b20',
        'nes_slot:cart:prg_rom': 'b8bb48d3',
      },
      checkpoints: {
        1: { video: 'eaa6bd97', state: '7eace4c0' },
        300: { video: 'f600b5c6', state: '831e27ff' },
        600: { video: '14afe57f', state: 'dfea6d7e' },
        900: { video: '27003867', state: 'd56ad5ff' },
        950: { video: '23a5344e', state: 'a32b0855' },
        1000: { video: '31dbae3e', state: '8310edc1' },
        1060: { video: '897e3274', state: '5b9c8e9a' },
      },
      audio: {
        writes: 3664,
        nonzeroWrites: 3663,
        writeHash: 'ed8bef1c',
        pcmHash: 'a80ac042',
        rms: 0.09377,
      },
    },
  }],
} satisfies MachineTargetContract;
