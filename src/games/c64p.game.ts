import type { MachineTargetContract } from './types.ts';

/**
 * The PAL Commodore 64, accepted at BASIC and against a tape and a disk
 * started the way the software room's Play starts them (title-start.ts).
 *
 * Crazy Comets is the tape because it found a bug: with PLAY pressed on one
 * frame in eight the KERNAL misframed its program block (`?LOAD ERROR`) where
 * MAME 0.289 loads it at every phase. Device timers fired before the CIAs were
 * clocked through the instruction, so the datassette's FLAG interrupt asserted
 * a few cycles early (issue #161). Bounty Bob Strikes Back is an original
 * `.g64` with its own fast loader, so the disk scenario runs the 1541's GCR
 * path and a loader the KERNAL never sees.
 */
export const c64p = {
  target: {
    game: 'c64p',
    category: 'computers',
    driver: 'src/mame/commodore/c64.cpp',
    machine: { className: 'c64_state', name: 'pal' },
    screen: { width: 403, height: 284 },
    soundKind: 'sid',
    // MAME's quickload image device is not generated yet, so the c64_quik
    // shelf is display only and no scenario mounts one; nothing these
    // scenarios run goes near it.
    runtimeCoverage: {
      generationGaps: ['quickload:QUICKLOAD'],
      handlerGaps: [],
    },
    media: [
      { kind: 'bios', status: 'accepted' },
      { kind: 'cartridge', status: 'planned', softwareLists: ['c64_cart'] },
      { kind: 'quickload', status: 'planned', softwareLists: ['c64_quik'] },
      { kind: 'cassette', status: 'accepted', softwareLists: ['c64_cass'] },
      { kind: 'floppy', status: 'accepted', softwareLists: ['c64_flop_orig', 'c64_flop_misc'] },
    ],
  },
  scenarios: [{
    // BASIC through the natural keyboard: a held SID note, then the 10 PRINT
    // maze, whose RND is seeded the same at every power-on.
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
        1: { video: '7c30493e', state: 'fa814e84' },
        60: { video: '19a076a7', state: '81cd9bee' },
        180: { video: '25be4308', state: '2f1a4d62' },
        300: { video: '4588160f', state: 'debebd64' },
        600: { video: '1414eabc', state: '1378db82' },
        900: { video: 'b2303773', state: '0c73ddb0' },
        1200: { video: 'ade44655', state: '1d0bf908' },
      },
      audio: {
        writes: 1149137,
        nonzeroWrites: 1149137,
        writeHash: 'ec28eeea',
        pcmHash: 'fa695f8c',
        rms: 0.46087,
      },
    },
  }, {
    // LOAD and RUN typed at PRESS PLAY ON TAPE, PLAY, the KERNAL load (the
    // tape stops at 52.56 s, as in MAME), then the title and its music.
    id: 'tape',
    kind: 'media',
    software: { list: 'c64_cass', name: 'crazycom' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 4500,
    minimumFps: 10,
    checkpoints: [1, 300, 1200, 2400, 3600, 4200, 4500],
    actions: [],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: 'e7dd780f', state: '8568dd18' },
        300: { video: '18afdc8d', state: 'c4f6dda2' },
        1200: { video: '18afdc8d', state: '9c3dfe1d' },
        2400: { video: '703063f2', state: '8ec64383' },
        3600: { video: '39ca5134', state: 'd3543f84' },
        4200: { video: '5ca645f1', state: '297da706' },
        4500: { video: '3374a670', state: '4ce61d3a' },
      },
      audio: {
        writes: 4309264,
        nonzeroWrites: 4309264,
        writeHash: '5cd2512e',
        pcmHash: '900a4a32',
        rms: 0.455406,
      },
    },
  }, {
    // LOAD"*",8,1 and RUN; the title's own loader counts its code segments
    // down (frame 2250), then the title screen (by frame 2500). The 1541
    // runs in lockstep the whole way, which makes this the slowest contract.
    id: 'disk',
    kind: 'media',
    software: { list: 'c64_flop_orig', name: 'bbsb' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 2600,
    minimumFps: 10,
    checkpoints: [1, 300, 1200, 2250, 2500, 2600],
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
        1: { video: '7c30493e', state: 'fa814e84' },
        300: { video: '803d484b', state: 'c11ad5fc' },
        1200: { video: 'a3e6b335', state: '8520f9ef' },
        2250: { video: 'ca7ed7b0', state: '9176972e' },
        2500: { video: 'caedcb9c', state: '2505e173' },
        2600: { video: 'f2bfec23', state: '880eb737' },
      },
      audio: {
        writes: 2489797,
        nonzeroWrites: 2489797,
        writeHash: 'a85847a6',
        pcmHash: '862def62',
        rms: 0.495094,
      },
    },
  }],
} satisfies MachineTargetContract;
