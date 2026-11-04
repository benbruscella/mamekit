import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { extractStreamDevice } from '../speaker/extract.ts';
import { TMS36XX_MAME_TYPES } from './definition.ts';

/** tms36xx_device compiled whole from tms36xx.cpp, rendering its own stream. */
export function extractTms36xx(input: CapabilityInput): CapabilityExtraction | undefined {
  return extractStreamDevice(input, TMS36XX_MAME_TYPES);
}
