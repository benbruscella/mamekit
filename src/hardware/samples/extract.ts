import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { extractStreamDevice } from '../speaker/extract.ts';
import { SAMPLES_MAME_TYPES } from './definition.ts';

/**
 * samples_device compiled whole from samples.cpp. A driver reads it back
 * (`playing`), so it runs beside the processor as a generated device: it loads
 * its recordings from the machine's sample path as MAME does, and renders one
 * stream a channel at the rate of what that channel is playing.
 */
export function extractSamples(input: CapabilityInput): CapabilityExtraction | undefined {
  return extractStreamDevice(input, SAMPLES_MAME_TYPES);
}
