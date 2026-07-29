import type { PortDeclaration } from '../ports.ts';

export const NES_ID = 'nes';
export const NES_MAME_TYPES = ['PPU_2C02', 'NES_CART_SLOT', 'NES_CONTROL_PORT'] as const;
export const NES_COMPOSITION_ARTIFACT = 'nes/board.ts';
export const NES_PLAN_ARTIFACT = 'nes/nes.hardware.ir.json';
export const NES_WORKLET_ARTIFACT = 'audio/nes-worklet.ts';

export const NES_PORTS: readonly PortDeclaration[] = [
  { name: 'cpu-bus', kind: 'registers', note: 'CPU-visible PPU, APU, input and cartridge ranges' },
  { name: 'ppu-bus', kind: 'bus', note: 'CHR and mirrored nametable address spaces' },
  { name: 'controllers', kind: 'input', note: 'two serial joypad ports' },
  { name: 'interrupts', kind: 'interrupt-out', note: 'PPU NMI and mapper/APU IRQ' },
  { name: 'video', kind: 'video', note: '256×240 2C02 raster' },
  { name: 'audio', kind: 'audio-out', note: 'RP2A03 APU stream' },
];
