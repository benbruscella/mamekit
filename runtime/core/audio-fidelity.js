export const SYNTHESIZED_SAMPLES = 'synthesized-samples';
export const SYNTHESIZED_SAMPLES_NOTE = 'Sample effects are synthesized approximations; original recorded samples are not played.';
/** Actual renderer limitations, separate from machine playability. */
export function audioLimitations(sound) {
    return sound?.kind === 'samples' || sound?.kind === 'sn76489' &&
        sound.auxiliaryDevices?.some(device => device.type === 'SAMPLES')
        ? [SYNTHESIZED_SAMPLES]
        : [];
}
