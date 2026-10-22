export const COLECO_ID = 'coleco';
/**
 * Board-visible ColecoVision bus devices. Cartridge PCBs are compiled as
 * source-declared children of the cartridge slot by extract.ts, exactly as the
 * NES package does for its own cards.
 */
export const COLECO_MAME_TYPES = [
    'COLECOVISION_CARTRIDGE_SLOT',
    'COLECO_EXPANSION',
];
/** MAME's own name for the region a cartridge PCB allocates for its ROM. */
export const COLECO_CART_ROM_REGION = 'coleco_cart:rom';
export const COLECO_PORTS = [
    { name: 'slot', kind: 'bus', note: 'source-selected generated cartridge card' },
    { name: 'registers', kind: 'registers', note: 'cart_r/cart_w through the Z80 program map' },
    { name: 'signals', kind: 'interrupt-out', note: 'expansion IRQ and NMI lines' },
];
export function colecoDeviceIrArtifact(type) {
    return `devices/${type.toLowerCase()}.device.ir.json`;
}
export function colecoDeviceModuleArtifact(type) {
    return `devices/${type.toLowerCase()}.ts`;
}
