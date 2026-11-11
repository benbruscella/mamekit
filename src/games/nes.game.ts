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
    soundKind: 'stream',
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
        1: { video: 'c76eba57', state: 'a92aa7df' },
        60: { video: '046c207d', state: '5f113b18' },
        300: { video: '6f4fdfdd', state: '981ae0af' },
        600: { video: 'd287437c', state: 'b9e8c532' },
        900: { video: 'fc92ab8b', state: 'b8c9104f' },
        1200: { video: 'd8ebd0ad', state: 'd97f48f0' },
        1500: { video: '4f3f6ed1', state: '33bce437' },
      },
      audio: {
        writes: 1198027,
        nonzeroWrites: 833042,
        writeHash: '25074fdd',
        pcmHash: 'c85cb8be',
        rms: 0.294563,
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
        1: { video: 'c76eba57', state: 'b89b95a5' },
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
        writeHash: '7e9f1550',
        pcmHash: '83510605',
        rms: 0.039451,
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
        1: { video: 'c76eba57', state: '490ca96e' },
        300: { video: '2802be17', state: 'dc54a6a2' },
        620: { video: 'c68ca7a6', state: '6b10b539' },
        629: { video: '1a4e8407', state: '5d706338' },
        661: { video: '339d1f73', state: '0544732b' },
        701: { video: '3896ba58', state: '672a30db' },
        761: { video: '11eeac7a', state: 'ded8e607' },
      },
      audio: {
        writes: 607799,
        nonzeroWrites: 578392,
        writeHash: '79f36382',
        pcmHash: '2e585c7c',
        rms: 0.203237,
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
        1: { video: 'c76eba57', state: '91fefc7c' },
        300: { video: 'f600b5c6', state: '69d9daef' },
        600: { video: '14afe57f', state: 'f4796bb4' },
        900: { video: '27003867', state: 'ee0d1bad' },
        950: { video: 'bbc32254', state: 'cb825d86' },
        1000: { video: '4cf70a01', state: '6b2f7cdd' },
        1060: { video: '897e3274', state: 'ae2219f7' },
      },
      audio: {
        writes: 846605,
        nonzeroWrites: 843946,
        writeHash: '4fa8bc06',
        pcmHash: 'a7fc8c4f',
        rms: 0.140956,
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
    // The VRC IRQ timer fires on every CPU cycle (konami.cpp arms it with a
    // period of clocks_to_attotime(1)), and MAME ends a timeslice at each
    // one, so this cart runs about 30,000 rounds a frame where other carts
    // run a few hundred. On a CI runner that is about 25 fps, though it plays
    // at 60 in a browser on an M3 Pro. Running the empty rounds as one saves
    // nothing, because firing the timer is the cost (#226).
    minimumFps: 20,
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
        1: { video: 'c76eba57', state: '7d7adc6b' },
        300: { video: 'a91fc776', state: 'aefe2b37' },
        600: { video: '99b499d3', state: '400bf35f' },
        900: { video: '508d89c4', state: 'f8f6eaaf' },
        1200: { video: 'd44d279d', state: '625ae1be' },
        1500: { video: '87527392', state: 'de1d6daa' },
        1800: { video: 'ecb6dc90', state: '4df9abd0' },
      },
      audio: {
        writes: 1437632,
        nonzeroWrites: 477931,
        writeHash: 'b33213d8',
        pcmHash: '0214f953',
        rms: 0.014471,
      },
    },
  }],
} satisfies MachineTargetContract;
