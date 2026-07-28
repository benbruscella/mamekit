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
import {
  Z80_ID,
  Z80_MAME_TYPES,
  Z80_PORTS,
} from './z80/definition.ts';
import { extractZ80 } from './z80/extract.ts';
import {
  I8080_ID,
  I8080_MAME_TYPES,
  I8080_PORTS,
} from './i8080/definition.ts';
import { extractI8080 } from './i8080/extract.ts';
import {
  I8039_ID,
  I8039_MAME_TYPES,
  I8039_PORTS,
} from './i8039/definition.ts';
import { extractI8039 } from './i8039/extract.ts';
import {
  M6803_ID,
  M6803_MAME_TYPES,
  M6803_PORTS,
} from './m6803/definition.ts';
import { extractM6803 } from './m6803/extract.ts';
import {
  KONAMI1_ID,
  KONAMI1_MAME_TYPES,
  KONAMI1_PORTS,
} from './konami1/definition.ts';
import { extractKonami1 } from './konami1/extract.ts';
import {
  MC6809_ID,
  MC6809_MAME_TYPES,
  MC6809_PORTS,
} from './mc6809/definition.ts';
import { extractMc6809 } from './mc6809/extract.ts';
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
  // CPUs
  {
    id: Z80_ID,
    mameTypes: Z80_MAME_TYPES,
    ports: Z80_PORTS,
    extract: extractZ80,
  },
  {
    id: I8080_ID,
    mameTypes: I8080_MAME_TYPES,
    ports: I8080_PORTS,
    extract: extractI8080,
  },
  {
    id: I8039_ID,
    mameTypes: I8039_MAME_TYPES,
    ports: I8039_PORTS,
    extract: extractI8039,
  },
  {
    id: M6803_ID,
    mameTypes: M6803_MAME_TYPES,
    ports: M6803_PORTS,
    extract: extractM6803,
  },
  {
    id: KONAMI1_ID,
    mameTypes: KONAMI1_MAME_TYPES,
    ports: KONAMI1_PORTS,
    extract: extractKonami1,
  },
  {
    id: MC6809_ID,
    mameTypes: MC6809_MAME_TYPES,
    ports: MC6809_PORTS,
    extract: extractMc6809,
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
