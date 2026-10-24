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
    soundKind: 'sid',
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
        1: { video: '8ca0e53c', state: '8bf6d029' },
        60: { video: 'f53f93ca', state: '679e7cf9' },
        180: { video: 'd02f0c00', state: 'b6c71a73' },
        300: { video: '73f81365', state: '1fd88e7a' },
        600: { video: '9d74a0ef', state: '5b7c0e6f' },
        900: { video: '7e0b8b66', state: '55eb716b' },
        1200: { video: 'd7a5d4d0', state: '3a8fed1c' },
      },
      audio: {
        writes: 962875,
        nonzeroWrites: 962875,
        writeHash: '01405e3e',
        pcmHash: '51cf4b40',
        rms: 0.463688,
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
        1: { video: '8ca0e53c', state: 'ad2118cd' },
        300: { video: '38480c9e', state: 'fc5af0ff' },
        1200: { video: '7f43a144', state: '5d74ee10' },
        2400: { video: '09d8843a', state: '90d70c53' },
        3600: { video: 'fb17afaa', state: '989890ea' },
        4700: { video: '628d1db4', state: 'ace09aa1' },
        5000: { video: '281829b7', state: '06f9f8fc' },
      },
      audio: {
        writes: 4011712,
        nonzeroWrites: 4011712,
        writeHash: '7475e1dc',
        pcmHash: 'a129b62f',
        rms: 0.457976,
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
        1: { video: '8ca0e53c', state: '8bf6d029' },
        300: { video: 'cddb3f5f', state: 'a42395dc' },
        1200: { video: '606b00d9', state: '2553120b' },
        2400: { video: 'a6b267c4', state: '3f9f3ddc' },
        3000: { video: 'b5febdde', state: 'dab05e10' },
        3200: { video: '1f90114f', state: '234b9840' },
      },
      audio: {
        writes: 2567526,
        nonzeroWrites: 2567526,
        writeHash: 'e55c1c24',
        pcmHash: 'b965cd88',
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
        1: { video: '4861246c', state: '4670308c' },
        300: { video: '2887b870', state: 'adf155c4' },
        900: { video: '5d4c18b8', state: '0b8ec1dd' },
        1200: { video: '35409cdc', state: '9f9ad98c' },
        1800: { video: '00de6694', state: '11dea729' },
      },
      audio: {
        writes: 1444271,
        nonzeroWrites: 1444271,
        writeHash: 'eb737cd9',
        pcmHash: 'aedf8ce2',
        rms: 0.469303,
      },
    },
  }],
} satisfies MachineTargetContract;
