export interface AudioFidelitySurface {
  kind: string;
  auxiliaryDevices?: readonly { type: string }[];
}

export const SYNTHESIZED_SAMPLES = 'synthesized-samples';
export const SYNTHESIZED_SAMPLES_NOTE =
  'Sample effects are synthesized approximations; original recorded samples are not played.';

/** Actual renderer limitations, separate from machine playability. */
export function audioLimitations(sound?: AudioFidelitySurface): string[] {
  return sound?.kind === 'samples' || sound?.kind === 'sn76489' &&
    sound.auxiliaryDevices?.some(device => device.type === 'SAMPLES')
    ? [SYNTHESIZED_SAMPLES]
    : [];
}
