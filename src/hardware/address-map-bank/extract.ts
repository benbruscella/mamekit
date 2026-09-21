import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { ADDRESS_MAP_BANK_MAME_TYPES } from './definition.ts';

/**
 * `address_map_bank_device` has no behaviour beyond decoding its own map, and
 * that map is lowered with the machine (execution.bankDevices), so the type
 * is executable exactly when a board composes it.
 */
export function extractAddressMapBank(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  const present = ADDRESS_MAP_BANK_MAME_TYPES.filter(type =>
    input.entries.some(entry => entry.type === type));
  if (!present.length) return undefined;
  return {
    executableTypes: [...present],
    executable: Object.fromEntries(present.map(type => [
      type,
      { kind: 'composition' as const, artifact: 'generated board bank devices' },
    ])),
    artifacts: [],
  };
}
