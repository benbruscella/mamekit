import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { extractStreamDevice } from '../speaker/extract.ts';
import { POKEY_MAME_TYPES } from './definition.ts';

/**
 * POKEY compiled whole from pokey.cpp. The CPU reads it back (RANDOM, the
 * pots, IRQST), so it runs beside the processor as a generated device: its
 * `execute_run` steps the chip once a clock, and only its stream's samples
 * cross to the sink.
 */
export function extractPokey(input: CapabilityInput): CapabilityExtraction | undefined {
  return extractStreamDevice(input, POKEY_MAME_TYPES);
}
