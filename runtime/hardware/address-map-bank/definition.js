export const ADDRESS_MAP_BANK_ID = 'address-map-bank';
export const ADDRESS_MAP_BANK_MAME_TYPES = ['ADDRESS_MAP_BANK'];
export const ADDRESS_MAP_BANK_PORTS = [
    { name: 'space', kind: 'bus', note: 'the device-owned AS_PROGRAM space its set_map names' },
    { name: 'window', kind: 'registers', note: 'set_bank: bank * stride offsets every access' },
];
