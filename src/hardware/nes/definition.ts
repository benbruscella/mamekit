import type { PortDeclaration } from '../ports.ts';

export const NES_ID = 'nes';

/**
 * Board-visible NES devices. Controller cards and cartridge PCBs are compiled
 * as source-declared children of these slots by extract.ts.
 */
export const NES_MAME_TYPES = [
  'PPU_2C02',
  'NES_CONTROL_PORT',
  'NES_CART_SLOT',
] as const;

/** RP2A03 variants whose source-declared child APU belongs to this package. */
export const NES_CPU_TYPES = ['RP2A03', 'RP2A03G'] as const;

export const NES_APU_IR_ARTIFACT = 'audio/nes-apu.audio.ir.json';
export const NES_APU_WORKLET_ARTIFACT = 'audio/nes-worklet.ts';


export const NES_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: 'CPU-visible generated device methods' },
  { name: 'ppu-space', kind: 'bus', note: 'generated PPU address space' },
  { name: 'slot', kind: 'bus', note: 'source-selected generated card device' },
  { name: 'signals', kind: 'interrupt-out', note: 'PPU NMI and mapper IRQ lines' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out', note: 'RP2A03 pulse, triangle, noise and DMC mix' },
];

export function nesDeviceIrArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.device.ir.json`;
}

export function nesDeviceModuleArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.ts`;
}
