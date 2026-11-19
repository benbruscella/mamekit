import type { PortDeclaration } from '../ports.ts';

export const SNES_ID = 'snes';

/**
 * Board-visible Super Nintendo devices.
 *
 * The 5A22 and S-SMP are ordinary compiled CPU cores (device/definition.ts).
 * The PPU and the S-DSP lower through the generic device compiler; the
 * control ports and the cartridge slot carry the cards MAME declares for
 * them, compiled as source-declared children by extract.ts, as the NES and
 * Game Boy packages do for theirs.
 */
export const SNES_MAME_TYPES = [
  'SNES_PPU',
  'S_DSP',
  'SNES_CONTROL_PORT',
  'SNS_CART_SLOT',
] as const;

export const SNES_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: 'PPU, S-DSP and control-port methods the driver reaches' },
  { name: 'aram', kind: 'bus', note: 'the S-SMP data space the S-DSP shares (spc_map)' },
  { name: 'slot', kind: 'bus', note: 'source-selected generated cartridge board' },
  { name: 'signals', kind: 'interrupt-out', note: 'cartridge IRQ into the S-CPU interrupt merger' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out', note: 'S-DSP left and right outputs' },
];

export function snesDeviceIrArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.device.ir.json`;
}

export function snesDeviceModuleArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.ts`;
}
