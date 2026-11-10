import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { extractStreamDevice } from '../speaker/extract.ts';
import { SOUND_DEVICE_MAME_TYPES } from './definition.ts';

/**
 * The sound chips nothing but their own MAME class plays (an SN76489), each
 * compiled whole and mixed as a stream on every machine that has one.
 */
export function extractSoundDevices(input: CapabilityInput): CapabilityExtraction | undefined {
  return extractStreamDevice(input, SOUND_DEVICE_MAME_TYPES);
}
