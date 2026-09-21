import type { PortDeclaration } from '../ports.ts';

export const ADDRESS_MAP_BANK_ID = 'address-map-bank';
export const ADDRESS_MAP_BANK_MAME_TYPES = ['ADDRESS_MAP_BANK'] as const;

export const ADDRESS_MAP_BANK_PORTS: readonly PortDeclaration[] = [
  { name: 'space', kind: 'bus', note: 'the device-owned AS_PROGRAM space its set_map names' },
  { name: 'window', kind: 'registers', note: 'set_bank: bank * stride offsets every access' },
];
