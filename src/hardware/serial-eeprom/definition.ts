import type { PortDeclaration } from '../ports.ts';

export const SERIAL_EEPROM_ID = 'serial-eeprom';
export const SERIAL_EEPROM_MAME_TYPES = ['EEPROM_ER5911_8BIT'] as const;
export const SERIAL_EEPROM_PORTS: readonly PortDeclaration[] = [
  { name: 'select', kind: 'input' },
  { name: 'clock', kind: 'clock' },
  { name: 'data', kind: 'registers' },
];
