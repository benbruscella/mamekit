import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { extractStreamDevice } from '../speaker/extract.ts';
import { DISCRETE_MAME_TYPES } from './definition.ts';

/**
 * discrete_sound_device compiled whole from discrete.cpp and its node classes
 * (disc_*.hxx). A board's table reaches it as configuration, lowered from the
 * driver (src/mame/static-aggregate.ts), and each node the table names is the
 * class `discrete_node_factory<C>::create` builds. A driver reads its nodes
 * back (`m_discrete->read`), so it renders beside the processor.
 */
export function extractDiscrete(input: CapabilityInput): CapabilityExtraction | undefined {
  return extractStreamDevice(input, DISCRETE_MAME_TYPES);
}
