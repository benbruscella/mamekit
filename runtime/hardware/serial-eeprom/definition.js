export const SERIAL_EEPROM_ID = 'serial-eeprom';
export const SERIAL_EEPROM_MAME_TYPES = ['EEPROM_ER5911_8BIT'];
export const SERIAL_EEPROM_PORTS = [
    { name: 'select', kind: 'input' },
    { name: 'clock', kind: 'clock' },
    { name: 'data', kind: 'registers' },
];
