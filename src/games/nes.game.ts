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
        // MAME's own region names: the card's prg_alloc/vrom_alloc in call_load.
        'nes_slot:cart:chr_rom': 'c2928c49',
        'nes_slot:cart:prg_rom': 'a0ed7d20',
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
        maincpu: 'd7978eeb',
        'nes_slot:cart:chr_rom': '867b51ad',
        'nes_slot:cart:prg_rom': '5cf548d3',
      },
      checkpoints: {
        1: { video: 'f0e232c6', state: 'b89b95a5' },
        60: { video: '256433ef', state: '3c2b8762' },
        180: { video: '3761e544', state: '480d7b7b' },
        300: { video: '256433ef', state: '13b93772' },
        600: { video: 'ea875eff', state: '5d1b3a10' },
        900: { video: 'bf4550e3', state: '795e9a19' },
        1200: { video: 'e72984f5', state: 'aee93699' },
      },
      audio: {
        writes: 5003,
        nonzeroWrites: 4201,
        writeHash: 'd9f3ea94',
        pcmHash: 'a5088f65',
        rms: 0.078903,
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
        1: { video: 'f0e232c6', state: 'f8ba696b' },
        300: { video: '2802be17', state: '1404ab31' },
        620: { video: 'b45aaef8', state: '2c358dc7' },
        629: { video: '07673647', state: 'd8214c72' },
        661: { video: 'da960a92', state: 'f62997c8' },
        701: { video: 'fdb94dbb', state: '469a706b' },
        761: { video: '899c4ed9', state: '89576222' },
      },
      audio: {
        writes: 1579,
        nonzeroWrites: 1517,
        writeHash: '912fbaaa',
        pcmHash: '243748b1',
        rms: 0.129845,
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
        1: { video: 'f0e232c6', state: '971fdfe9' },
        300: { video: 'f600b5c6', state: 'd2a6c74b' },
        600: { video: '14afe57f', state: 'afc6a570' },
        900: { video: '27003867', state: 'd56ad5ff' },
        950: { video: '23a5344e', state: 'a32b0855' },
        1000: { video: '31dbae3e', state: '7d165f27' },
        1060: { video: '897e3274', state: '4450cd80' },
      },
      audio: {
        writes: 3660,
        nonzeroWrites: 3659,
        writeHash: '9d47e96b',
        pcmHash: '71e63b95',
        rms: 0.093778,
      },
    },
  }],
} satisfies MachineTargetContract;
