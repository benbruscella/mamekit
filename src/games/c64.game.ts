import type { MachineTargetContract } from './types.ts';

/**
 * The NTSC Commodore 64, accepted the way the PAL one is (c64p.game.ts): at
 * BASIC, and against the same tape and disk started the way the software
 * room's Play starts them. Both titles were made for PAL and both run on
 * MAME 0.289's NTSC machine -- Crazy Comets' title by frame 5000, Bounty
 * Bob's by 3200 -- so the scenarios check the NTSC machine's own clocks
 * (a 6567 VIC-II, 1.023 MHz, 263 lines of 65 cycles) through the same loads.
 */
export const c64 = {
  target: {
    game: 'c64',
    category: 'computers',
    driver: 'src/mame/commodore/c64.cpp',
    machine: { className: 'c64_state', name: 'ntsc' },
    screen: { width: 418, height: 235 },
    soundKind: 'stream',
    media: [
      { kind: 'bios', status: 'accepted' },
      { kind: 'cartridge', status: 'accepted', softwareLists: ['c64_cart', 'vic10'] },
      // The quickload is the PAL machine's (c64p.game.ts): the one title in
      // MAME's list is PAL only, so this machine has no shelf to accept it
      // against, though it quickloads a dropped .prg the same way.
      { kind: 'quickload', status: 'candidate', softwareLists: ['c64_quik'] },
      { kind: 'cassette', status: 'accepted', softwareLists: ['c64_cass'] },
      { kind: 'floppy', status: 'accepted', softwareLists: ['c64_flop_orig', 'c64_flop_misc'] },
    ],
  },
  scenarios: [{
    // BASIC through the natural keyboard: a held SID note, then the 10 PRINT maze.
    id: 'basic',
    kind: 'keyboard',
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 1200,
    minimumFps: 10,
    checkpoints: [1, 60, 180, 300, 600, 900, 1200],
    actions: [{
      atFrame: 150,
      text: 'POKE54296,15:POKE54278,240:POKE54273,30:POKE54276,17{ENTER}' +
        '10 PRINTCHR$(205.5+RND(1));:GOTO10{ENTER}RUN{ENTER}',
    }],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        'iec8:c1541:ucd5': '2abdc483',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '8ca0e53c', state: '80fb623e' },
        60: { video: 'f53f93ca', state: 'faba29ce' },
        180: { video: 'd02f0c00', state: 'bb633aaa' },
        300: { video: '73f81365', state: 'e2941c57' },
        600: { video: '9d74a0ef', state: '07bfd0c6' },
        900: { video: '7e0b8b66', state: '3edd0e01' },
        1200: { video: 'd7a5d4d0', state: 'b4330fa5' },
      },
      audio: {
        writes: 962790,
        nonzeroWrites: 962790,
        writeHash: '86f8f53b',
        pcmHash: 'aad35cb7',
        rms: 0.463693,
      },
    },
  }, {
    // LOAD and RUN typed at PRESS PLAY ON TAPE, PLAY, the KERNAL load, then
    // the title and its music, as on MAME's NTSC machine.
    id: 'tape',
    kind: 'media',
    software: { list: 'c64_cass', name: 'crazycom' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 5000,
    minimumFps: 10,
    checkpoints: [1, 300, 1200, 2400, 3600, 4700, 5000],
    actions: [],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '8ca0e53c', state: 'ff487201' },
        300: { video: '38480c9e', state: '1cad32f9' },
        1200: { video: '7f43a144', state: '6ca928b1' },
        2400: { video: 'c4bdcb20', state: '115aa493' },
        3600: { video: 'a7cb1e0d', state: '3cd21fbb' },
        4700: { video: '7d06eea9', state: '27ad9f75' },
        5000: { video: 'b31f4003', state: '04549cde' },
      },
      audio: {
        writes: 4011626,
        nonzeroWrites: 4011626,
        writeHash: 'e309fe84',
        pcmHash: '8e9af50e',
        rms: 0.458016,
      },
    },
  }, {
    // LOAD"*",8,1 and RUN; the title's own fast loader, then the title screen.
    id: 'disk',
    kind: 'media',
    software: { list: 'c64_flop_orig', name: 'bbsb' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 3200,
    minimumFps: 10,
    checkpoints: [1, 300, 1200, 2400, 3000, 3200],
    actions: [],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        'iec8:c1541:ucd5': '2abdc483',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '8ca0e53c', state: '80fb623e' },
        300: { video: 'cddb3f5f', state: '93103774' },
        1200: { video: '606b00d9', state: '0756fbe3' },
        2400: { video: 'a6b267c4', state: 'f7ae7a82' },
        3000: { video: 'b5febdde', state: 'f151fd8c' },
        3200: { video: '1f90114f', state: '66c0b22e' },
      },
      audio: {
        writes: 2567441,
        nonzeroWrites: 2567441,
        writeHash: '94b76439',
        pcmHash: 'ebbfa1b9',
        rms: 0.49341,
      },
    },
  }, {
    // Atarisoft's Pac-Man, a standard 8K cartridge: its title, then F1 into a
    // game. The menu is MAME 0.289's pixel for pixel on the NTSC machine.
    id: 'cartridge',
    kind: 'media',
    software: { list: 'c64_cart', name: 'pacman' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 1800,
    minimumFps: 10,
    checkpoints: [1, 300, 900, 1200, 1800],
    actions: [{ atFrame: 900, text: '{F1}' }],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '8ca0e53c', state: 'd2e9eb37' },
        300: { video: '2887b870', state: 'aae5fc1c' },
        900: { video: '5d4c18b8', state: 'aab219e8' },
        1200: { video: '35409cdc', state: '32e44565' },
        1800: { video: 'eed8b6a1', state: 'c1e5b891' },
      },
      audio: {
        writes: 1444185,
        nonzeroWrites: 1444185,
        writeHash: 'f57406e4',
        pcmHash: '32758214',
        rms: 0.469305,
      },
    },
  }],
} satisfies MachineTargetContract;
