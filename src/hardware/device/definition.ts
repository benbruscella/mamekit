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
  'BUFFERED_SPRITERAM8',
  'BUFFERED_SPRITERAM16',
  'CD4099',
  'GENERIC_LATCH_8',
  'HC259',
  'HD6845S',
  'I8257',
  'I8255A',
  'INPUT_MERGER_ALL_HIGH',
  'INPUT_MERGER_ANY_HIGH',
  'INPUT_MERGER_ANY_LOW',
  'K005849',
  'ER2055',
  'LS259',
  'LATCH8',
  'MB14241',
  'MB8844',
  'OUTPUT_LATCH',
  'PIC8259',
  'RST_NEG_BUFFER',
  'TECMO_SPRITE',
  'TRACKFLD_AUDIO',
  'TTL153',
  'TTL74181',
  'Z80CTC',
  'Z80PIO',
  'IREM_M72_AUDIO',
  'K053251',
  'TOAPLAN_SCU',
  'NAMCO_06XX',
  'NAMCO_54XX',
  'PIA6821',
  'STARFIELD_05XX',
  'MC6845',
  // Protocol devices: MAME models these as an MCU running firmware, and
  // MAMEKIT lowers the protocol its methods implement instead.
  'NAMCO_51XX',
  'NAMCO_53XX',
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
