import type { PortDeclaration } from '../ports.ts';

export const A2600_ID = 'a2600';

/**
 * Board-visible Atari 2600 devices.
 *
 * Cartridge PCBs and controller cards are compiled as source-declared children
 * of their slots by extract.ts, exactly as the NES and ColecoVision packages do
 * for their own cards. The TIA appears twice because MAME gives the NTSC and
 * PAL rasters their own device types over one `tia_video_device`.
 */
export const A2600_MAME_TYPES = [
  'TIA_NTSC_VIDEO',
  'TIA_PAL_VIDEO',
  'VCS_CART_SLOT',
  'VCS_CONTROL_PORT',
] as const;

/**
 * MAME's own name for the region a cartridge PCB allocates for its ROM.
 *
 * `device_vcs_cart_interface::rom_alloc` appends this to the slot's tag, so the
 * mounted cartridge's bytes arrive under it.
 */
export const A2600_CART_ROM_SUFFIX = ':cart:rom';

export const A2600_PORTS: readonly PortDeclaration[] = [
  { name: 'slot', kind: 'bus', note: 'source-selected generated cartridge PCB' },
  { name: 'controllers', kind: 'bus', note: 'source-selected generated control-port cards' },
  { name: 'registers', kind: 'registers', note: 'TIA read/write through the 6507 program map' },
  { name: 'signals', kind: 'interrupt-out', note: 'TIA WSYNC CPU stall and vsync' },
  { name: 'clock', kind: 'clock', note: 'colour clock; the 6507 runs at one third of it' },
];

export function a2600DeviceIrArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.device.ir.json`;
}

export function a2600DeviceModuleArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.ts`;
}
