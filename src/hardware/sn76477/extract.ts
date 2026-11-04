import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { extractStreamDevice } from '../speaker/extract.ts';
import { SN76477_MAME_TYPES } from './definition.ts';

/**
 * sn76477_device compiled whole from sn76477.cpp. Its pins are configured by
 * the driver and its sound board, and it renders its own stream beside the
 * processor.
 */
export function extractSn76477(input: CapabilityInput): CapabilityExtraction | undefined {
  return extractStreamDevice(input, SN76477_MAME_TYPES);
}
