export const NES_ID = 'nes';
/**
 * Board-visible NES devices. Controller cards and cartridge PCBs are compiled
 * as source-declared children of these slots by extract.ts.
 */
export const NES_MAME_TYPES = [
    'PPU_2C02',
    'NES_CONTROL_PORT',
    'NES_CART_SLOT',
];
export const NES_PORTS = [
    { name: 'registers', kind: 'registers', note: 'CPU-visible generated device methods' },
    { name: 'ppu-space', kind: 'bus', note: 'generated PPU address space' },
    { name: 'slot', kind: 'bus', note: 'source-selected generated card device' },
    { name: 'signals', kind: 'interrupt-out', note: 'PPU NMI and mapper IRQ lines' },
    { name: 'clock', kind: 'clock' },
    { name: 'audio', kind: 'audio-out', note: 'RP2A03 pulse, triangle, noise and DMC mix' },
];
export function nesDeviceIrArtifact(type) {
    return `devices/${type.toLowerCase()}.device.ir.json`;
}
export function nesDeviceModuleArtifact(type) {
    return `devices/${type.toLowerCase()}.ts`;
}
