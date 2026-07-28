// The compile-time hardware capability registry.
//
// Explicit static imports rather than dynamic discovery: the set of supported
// families is a compile-time fact, it type-checks, and nothing loads modules by
// string at run time. registry.spec.ts reads the directory and fails if a
// package is missing from this list, so adding a package is still the only
// step — forgetting to register it is caught, not silently tolerated.
//
// This module reaches into each package's extract.ts, so it is compile-time and
// must never be imported by the browser runtime.

import type { HardwareCapability } from './contract.ts';
import { extractYm2203 } from './ym2203/extract.ts';
import {
  YM2203_ID,
  YM2203_MAME_TYPES,
  YM2203_MASTER_GAIN,
  YM2203_PORTS,
} from './ym2203/definition.ts';

export const HARDWARE_CAPABILITIES: readonly HardwareCapability[] = [
  {
    id: YM2203_ID,
    mameTypes: YM2203_MAME_TYPES,
    ports: YM2203_PORTS,
    extract: extractYm2203,
    masterGain: YM2203_MASTER_GAIN,
  },
];

export { capabilityForType } from './contract.ts';
export type { HardwareCapability } from './contract.ts';
