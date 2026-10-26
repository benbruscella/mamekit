export const A2600_ID = 'a2600';
/**
 * Board-visible Atari 2600 devices.
 *
 * Cartridge PCBs and controller cards are compiled as source-declared children
 * of their slots by extract.ts, exactly as the NES and ColecoVision packages do
 * for their own cards. The TIA appears three times because MAME splits the
 * chip across three device types: the NTSC and PAL rasters over one
 * `tia_video_device`, and `TIA` itself for its sound half, which the video
 * device reaches through a finder and hands its audio register writes to.
 */
export const A2600_MAME_TYPES = [
    'TIA_NTSC_VIDEO',
    'TIA_PAL_VIDEO',
    'TIA',
    'VCS_CART_SLOT',
    'VCS_CONTROL_PORT',
];
/** The tag the a2600 driver gives the TIA's sound half. */
export const A2600_TIA_AUDIO_TAG = 'tia';
/** The worklet that plays what the generated sound device renders. */
export const A2600_AUDIO_WORKLET_ARTIFACT = 'audio/tia-worklet.ts';
/**
 * The tag the a2600 driver gives its cartridge slot.
 *
 * `device_vcs_cart_interface::rom_alloc` builds the cartridge's ROM region name
 * from the slot's own tag, so the two together name the region the mounted
 * cartridge's bytes arrive in.
 */
export const A2600_CART_SLOT_TAG = 'cartslot';
export const A2600_PORTS = [
    { name: 'slot', kind: 'bus', note: 'source-selected generated cartridge PCB' },
    { name: 'controllers', kind: 'bus', note: 'source-selected generated control-port cards' },
    { name: 'registers', kind: 'registers', note: 'TIA read/write through the 6507 program map' },
    { name: 'signals', kind: 'interrupt-out', note: 'TIA WSYNC CPU stall and vsync' },
    { name: 'clock', kind: 'clock', note: 'colour clock; the 6507 runs at one third of it' },
];
export function a2600DeviceIrArtifact(type) {
    return `devices/${type.toLowerCase()}.device.ir.json`;
}
export function a2600DeviceModuleArtifact(type) {
    return `devices/${type.toLowerCase()}.ts`;
}
