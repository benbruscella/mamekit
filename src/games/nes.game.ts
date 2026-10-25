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
        1: { video: 'c76eba57', state: '7e64d27e' },
        60: { video: '046c207d', state: 'e95b94f9' },
        300: { video: '6f4fdfdd', state: 'c6c924e9' },
        600: { video: 'd287437c', state: '3db8c72c' },
        900: { video: 'fc92ab8b', state: 'ae1ee076' },
        1200: { video: 'd8ebd0ad', state: 'fc3c77b4' },
        1500: { video: '4f3f6ed1', state: '3a6fa73d' },
      },
      audio: {
        writes: 9466,
        nonzeroWrites: 8471,
        writeHash: '528f6f12',
        pcmHash: '62e275d5',
        rms: 0.096985,
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
        1: { video: 'eaa6bd97', state: 'b89b95a5' },
        60: { video: '256433ef', state: 'bda5141c' },
        180: { video: '3761e544', state: '59b3788c' },
        300: { video: '256433ef', state: '9237a40c' },
        600: { video: 'e56254bc', state: '31f3f2aa' },
        900: { video: 'bf4550e3', state: '8bd6b5a8' },
        1200: { video: 'e72984f5', state: 'f0774232' },
      },
      audio: {
        writes: 5003,
        nonzeroWrites: 4201,
        writeHash: '2cbd0485',
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
        1: { video: 'c76eba57', state: 'f8ba696b' },
        300: { video: '2802be17', state: '149f827d' },
        620: { video: '6b748cda', state: '1228a6cc' },
        629: { video: '0b044a98', state: '3ca20ea7' },
        661: { video: '7852da5c', state: '5e6a00ca' },
        701: { video: 'fdb94dbb', state: '16f4b194' },
        761: { video: '8fc03062', state: '97936994' },
      },
      audio: {
        writes: 1579,
        nonzeroWrites: 1517,
        writeHash: '9102f8e6',
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
        1: { video: 'eaa6bd97', state: 'aeacb327' },
        300: { video: 'f600b5c6', state: '68ef8bf4' },
        600: { video: '14afe57f', state: '9db01961' },
        900: { video: '27003867', state: '588dfa08' },
        950: { video: 'bbc32254', state: '50d71b6b' },
        1000: { video: '4cf70a01', state: '69e49f33' },
        1060: { video: '897e3274', state: '5f2fff4c' },
      },
      audio: {
        writes: 3664,
        nonzeroWrites: 3663,
        writeHash: 'dcb2acfc',
        pcmHash: '9f28573e',
        rms: 0.094951,
      },
    },
  }, {
    // The VRC7: Konami's mapper with a Yamaha DS1001 inside, an OPLL whose FM
    // is ymfm's, compiled from 3rdparty/ymfm, with its instrument patches
    // from ds1001.zip (#188). Lagrange Point plays no FM until its intro is
    // started and stepped through; the music begins near frame 1350, at the
    // moment MAME's does.
    id: 'lagrange',
    kind: 'gameplay',
    cartridge: 'lagrange',
    romEnvironment: 'MAMEKIT_NES_ROM',
    frames: 1800,
    minimumFps: 30,
    checkpoints: [1, 300, 600, 900, 1200, 1500, 1800],
    actions: [
      { atFrame: 299, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
      { atFrame: 450, code: 'KeyZ', heldFrames: 6, releasedFrames: 0 },
      { atFrame: 600, code: 'KeyZ', heldFrames: 6, releasedFrames: 0 },
      { atFrame: 750, code: 'KeyZ', heldFrames: 6, releasedFrames: 0 },
      { atFrame: 900, code: 'KeyZ', heldFrames: 6, releasedFrames: 0 },
      { atFrame: 1050, code: 'KeyZ', heldFrames: 6, releasedFrames: 0 },
      { atFrame: 1200, code: 'KeyZ', heldFrames: 6, releasedFrames: 0 },
      { atFrame: 1350, code: 'KeyZ', heldFrames: 6, releasedFrames: 0 },
      { atFrame: 1500, code: 'KeyZ', heldFrames: 6, releasedFrames: 0 },
      { atFrame: 1650, code: 'KeyZ', heldFrames: 6, releasedFrames: 0 },
    ],
    golden: {
      regions: {
        maincpu: 'd7978eeb',
        'nes_slot:cart:prg_rom': '743387ff',
        'nes_slot:vrc7:vrc7snd:internal': '9d699efc',
      },
      checkpoints: {
        1: { video: 'c76eba57', state: '72ffb43f' },
        300: { video: 'a91fc776', state: '818c283b' },
        600: { video: '99b499d3', state: 'f0229a0b' },
        900: { video: '508d89c4', state: 'c8037050' },
        1200: { video: 'd44d279d', state: '0f093cfc' },
        1500: { video: '87527392', state: '2481941e' },
        1800: { video: 'ecb6dc90', state: 'ac58d182' },
      },
      audio: {
        writes: 1438273,
        nonzeroWrites: 355246,
        writeHash: 'c7bd8abb',
        pcmHash: '5cb15f8f',
        rms: 0.023801,
      },
    },
  }],
} satisfies MachineTargetContract;
