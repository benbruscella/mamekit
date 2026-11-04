import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { extractStreamDevice } from '../speaker/extract.ts';
import { PHOENIX_SOUND_MAME_TYPES } from './definition.ts';

/**
 * phoenix_sound_device compiled whole from phoenix_a.cpp: its C24/C25
 * capacitor models and noise run in its own sound_stream_update, and its
 * latches drive the DISCRETE and the MM6221AA beside it.
 */
export function extractPhoenixSound(input: CapabilityInput): CapabilityExtraction | undefined {
  return extractStreamDevice(input, PHOENIX_SOUND_MAME_TYPES);
}
