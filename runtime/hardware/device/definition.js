// Generated MAME devices.
//
// One capability, not one per part: each of these lowers through MAME's own
// device inheritance with the same compiler, and each emits the same pair of
// artifacts. What differs is only which classes are supported.
export const DEVICE_ID = 'device';
/**
 * MAME device classes whose methods lower cleanly through the device compiler.
 * A type is listed here once its methods compile without diagnostics; the
 * extractor drops any that stop doing so rather than emitting a broken core.
 */
export const DEVICE_MAME_TYPES = [
    'ADC0804',
    'BUFFERED_SPRITERAM8',
    'BUFFERED_SPRITERAM16',
    'CD4099',
    'GENERIC_LATCH_8',
    'HC259',
    'HD6845S',
    'I8257',
    'I8255A',
    'INPUT_MERGER_ALL_HIGH',
    'INPUT_MERGER_ANY_HIGH',
    'INPUT_MERGER_ANY_LOW',
    'K005849',
    'K007232',
    'K051960',
    'K052109',
    'K053246',
    'K053260',
    'LADYBUG_VIDEO',
    'ER2055',
    'LS259',
    'LS157',
    'LATCH8',
    'MB14241',
    'MB8843',
    'MB8844',
    'MB8842',
    'MOS6532',
    'OUTPUT_LATCH',
    'PIC8259',
    'RST_NEG_BUFFER',
    'SEGA_315_5195_MEM_MAPPER',
    'SEGA_SYS16B_SPRITES',
    'SEGAIC16VID',
    'SLAPSTIC',
    'TECMO_SPRITE',
    'TMS9928A',
    'TMS9929A',
    'TRACKFLD_AUDIO',
    'UPD7759',
    'WILLIAMS_BLITTER_SC1',
    'WILLIAMS_BLITTER_SC2',
    'TTL153',
    'TTL74181',
    'Z80CTC',
    'Z80PIO',
    'IREM_M72_AUDIO',
    'K053251',
    'TOAPLAN_SCU',
    'NAMCO_06XX',
    'NAMCO_52XX',
    'NAMCO_54XX',
    'NAMCO_50XX',
    'NEOGEO_SPRITE_OPTIMZIED',
    'PIA6821',
    'PIT8253',
    'STARFIELD_05XX',
    'MC6845',
    // Protocol devices used when a dumped firmware core is not executable.
    'NAMCO_51XX',
    'NAMCO_53XX',
];
export const DEVICE_PORTS = [
    { name: 'registers', kind: 'registers', note: 'methods reached through a bus mapping' },
    { name: 'signals', kind: 'interrupt-out', note: 'device output lines' },
    { name: 'clock', kind: 'clock' },
];
export function deviceIrArtifact(type) {
    return `devices/${type.toLowerCase()}.device.ir.json`;
}
export function deviceModuleArtifact(type) {
    return `devices/${type.toLowerCase()}.ts`;
}
