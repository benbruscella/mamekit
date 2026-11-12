// Generated MAME devices.
//
// One capability, not one per part: each of these lowers through MAME's own
// device inheritance with the same compiler, and each emits the same pair of
// artifacts. What differs is only which classes are supported.

import type { PortDeclaration } from '../ports.ts';

export const DEVICE_ID = 'device';

/**
 * MAME device classes whose methods lower cleanly through the device compiler.
 * A type is listed here once its methods compile without diagnostics; the
 * extractor drops any that stop doing so rather than emitting a broken core.
 */
export const DEVICE_MAME_TYPES = [
  'ADC0804',
  // Sound boards that are plain devices holding a DISCRETE (and an SN76477)
  // their latches write: the chips render as streams beside them.
  'GALAXIAN_SOUND',
  'INVADERS_AUDIO',
  // MAME's 6805 core and the 68705's ports, timer and EPROM, read after the C
  // preprocessor (compileMameDevice).
  'M68705P5',
  // The 6800 family, each its MAME class compiled whole: m6800_cpu_device's
  // execute_run, and m6801's timer, serial port and on-chip ports in its own
  // internal map. A board runs them as processors (runtime/device-cpu.ts).
  'M6802', 'M6808', 'M6803', 'M6801U4', 'HD63701Y0', 'NSC8105',
  // i8085.cpp's i8085a_cpu_device and its i8080 subclass, execute_run and all.
  'I8080', 'I8085A',
  // mcs48.cpp's mcs48_cpu_device: its internal ROM a view its EA pin selects.
  'I8035', 'I8039', 'MB8884', 'M58715', 'UPD7751',
  // m6809.cpp's m6809_base_device, its execute_run the generated m6809.hxx
  // state machine; hd6309.cpp, konami.cpp and konami1.cpp beside it.
  'MC6809', 'MC6809E', 'HD6309E', 'KONAMI', 'KONAMI1',
  // z80.cpp's z80_device, its execute_run the state machine z80make.py
  // generates; Sega's encrypted Z80s are its subclasses.
  'Z80', 'SEGA_315_5098', 'SEGA_315_5177',
  // lr35902.cpp's Sharp core, opc_main.hxx and opc_cb.hxx in its execute_run.
  'LR35902',
  // m6502.cpp and its subclasses, their operation lists through m6502make.py:
  // the 6507's 13-bit space, the 6510's port, and Data East's encrypted parts
  // behind their own memory interfaces.
  'M6502', 'M6507', 'M6510', 'DECO_CPU7', 'DECO_C10707',
  // The NES's RP2A03: the 6502 without decimal mode, its APU a child it builds
  // and mixes, reached through the internal map its constructor installs.
  'RP2A03', 'RP2A03G',
  // z8000.cpp's Z8002, its register file a union over one buffer and its
  // opcodes a table of member-function pointers; Pole Position's sub-CPUs.
  'Z8002',
  // tms320c1x.cpp's TMS320C10, the class template tms320c1x_device_base<12>
  // flattened to that specialisation; Wardner's DSP.
  'TMS320C10',
  // i86.cpp's 8088 (its inline bodies in i86inline.h) and nec.cpp's V30,
  // whose opcode handlers are OP() heads read after the preprocessor.
  'I8088', 'V30',
  // tms34010.cpp's TMS34010: a bit-addressed 16-bit space (addrshift +3),
  // its PIXBLT/FILL variants read after the preprocessor, the scanline timer
  // and the screen it drives its own (Midway T-Unit).
  'TMS34010',
  'AVG_BZONE',
  // Atari's motion-object engine, atarimo.cpp over sprite.h's sprite_device.
  'ATARI_MOTION_OBJECTS',
  // Asteroids' Digital Vector Generator, avgdvg.cpp's dvg_device beside the AVG.
  'DVG',
  'BUFFERED_SPRITERAM8',
  'BUFFERED_SPRITERAM16',
  'CD4099',
  'GENERIC_LATCH_8',
  'HC259',
  'HD6845S',
  'I8257',
  'I8243',
  'I8255',
  'I8255A',
  'INPUT_MERGER_ALL_HIGH',
  'INPUT_MERGER_ANY_HIGH',
  'INPUT_MERGER_ANY_LOW',
  'K005849',
  'K007232',
  'K051960',
  'K052109',
  'K053246',
  'K053260',
  'LADYBUG_VIDEO',
  'ER2055',
  'LS259',
  'LS157',
  'LATCH8',
  'MATHBOX',
  'MB14241',
  'MB8843',
  'MB8844',
  'MB8842',
  'C64H156',
  'MOS6522',
  'MOS6532',
  'OUTPUT_LATCH',
  'PIC8259',
  'RST_NEG_BUFFER',
  'SEGA_315_5195_MEM_MAPPER',
  // Elevator Action's security interface: its own device_start/reset and
  // set_int_mode configuration, around the 68705 it holds.
  'TAITO_SJ_SECURITY_MCU',
  'SEGA_SYS16A_SPRITES',
  'SEGA_SYS16B_SPRITES',
  'SEGAIC16VID',
  'SLAPSTIC',
  'TECMO_SPRITE',
  'TMS9928A',
  'TMS9929A',
  'TRACKFLD_AUDIO',
  'UPD7759',
  'VLM5030',
  'WILLIAMS_BLITTER_SC1',
  'WILLIAMS_BLITTER_SC2',
  'TTL153',
  'TTL74181',
  'Z80CTC',
  'Z80DMA',
  'Z80PIO',
  'IREM_M72_AUDIO',
  'K053251',
  'TOAPLAN_SCU',
  'NAMCO_06XX',
  'NAMCO_52XX',
  'NAMCO_54XX',
  'NAMCO_50XX',
  'NEOGEO_SPRITE_OPTIMZIED',
  'PIA6821',
  'PIT8253',
  // The image device whose load the driver's own callback performs
  // (snapquik.cpp): the C64's .prg/.p00/.t64 quickload, and its sibling the
  // snapshot, which the Spectrum's .sna/.z80 callback loads straight into
  // memory and registers.
  'QUICKLOAD',
  'SNAPSHOT',
  'STARFIELD_05XX',
  'MC6845',
  'MIDTUNIT_VIDEO',
  // Protocol devices used when a dumped firmware core is not executable.
  'NAMCO_51XX',
  'NAMCO_53XX',
  // Vblank-counted or timed; firing is machine().schedule_soft_reset().
  'WATCHDOG_TIMER',
  // Neo Geo's calendar clock, with the device_rtc_interface it counts in.
  'UPD4990A',
] as const;

export const DEVICE_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: 'methods reached through a bus mapping' },
  { name: 'signals', kind: 'interrupt-out', note: 'device output lines' },
  { name: 'clock', kind: 'clock' },
];

export function deviceIrArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.device.ir.json`;
}

export function deviceModuleArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.ts`;
}
