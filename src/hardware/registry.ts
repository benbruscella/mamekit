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
import { CPU_ID, CPU_MAME_TYPES, CPU_PORTS } from './cpu/definition.ts';
import { DEVICE_ID, DEVICE_MAME_TYPES, DEVICE_PORTS } from './device/definition.ts';
import { extractDevices } from './device/extract.ts';
import { extractCpus } from './cpu/extract.ts';
import {
  AY8910_ID,
  AY8910_MAME_TYPES,
  AY8910_MASTER_GAIN,
  AY8910_PORTS,
} from './ay8910/definition.ts';
import { extractAy8910 } from './ay8910/extract.ts';
import {
  DISCRETE_COUNTER_LFSR_ID,
  DISCRETE_COUNTER_LFSR_PORTS,
} from './discrete-counter-lfsr/definition.ts';
import { extractDiscreteCounterLfsr } from './discrete-counter-lfsr/extract.ts';
import {
  DISCRETE_SN76477_ID,
  DISCRETE_SN76477_PORTS,
} from './discrete-sn76477/definition.ts';
import { extractDiscreteSn76477 } from './discrete-sn76477/extract.ts';
import {
  NAMCO_WSG_ID,
  NAMCO_WSG_MAME_TYPES,
  NAMCO_WSG_MASTER_GAIN,
  NAMCO_WSG_PORTS,
} from './namco-wsg/definition.ts';
import { extractNamcoWsg } from './namco-wsg/extract.ts';
import {
  YM2203_ID,
  YM2203_MAME_TYPES,
  YM2203_MASTER_GAIN,
  YM2203_PORTS,
} from './ym2203/definition.ts';
import { extractYm2203 } from './ym2203/extract.ts';

export const HARDWARE_CAPABILITIES: readonly HardwareCapability[] = [
  // CPUs — one capability over every generated core.
  {
    id: CPU_ID,
    mameTypes: CPU_MAME_TYPES,
    ports: CPU_PORTS,
    extract: extractCpus,
  },
  // Devices — one capability over every generated MAME device.
  {
    id: DEVICE_ID,
    mameTypes: DEVICE_MAME_TYPES,
    ports: DEVICE_PORTS,
    extract: extractDevices,
  },
  // Audio
  {
    id: NAMCO_WSG_ID,
    mameTypes: NAMCO_WSG_MAME_TYPES,
    ports: NAMCO_WSG_PORTS,
    extract: extractNamcoWsg,
    masterGain: NAMCO_WSG_MASTER_GAIN,
  },
  {
    id: AY8910_ID,
    mameTypes: AY8910_MAME_TYPES,
    ports: AY8910_PORTS,
    extract: extractAy8910,
    masterGain: AY8910_MASTER_GAIN,
  },
  {
    id: YM2203_ID,
    mameTypes: YM2203_MAME_TYPES,
    ports: YM2203_PORTS,
    extract: extractYm2203,
    masterGain: YM2203_MASTER_GAIN,
  },
  // Recognised by shape: their MAME classes are named per driver.
  {
    id: DISCRETE_SN76477_ID,
    mameTypes: [],
    ports: DISCRETE_SN76477_PORTS,
    extract: extractDiscreteSn76477,
  },
  {
    id: DISCRETE_COUNTER_LFSR_ID,
    mameTypes: [],
    ports: DISCRETE_COUNTER_LFSR_PORTS,
    extract: extractDiscreteCounterLfsr,
  },
];

export { capabilityForType } from './contract.ts';
export type { HardwareCapability } from './contract.ts';
