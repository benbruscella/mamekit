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
import {
  NES_ID,
  NES_MAME_TYPES,
  NES_MASTER_GAIN,
  NES_PORTS,
} from './nes/definition.ts';
import { extractNes } from './nes/extract.ts';
import {
  COLECO_ID,
  COLECO_MAME_TYPES,
  COLECO_PORTS,
} from './coleco/definition.ts';
import { extractColeco } from './coleco/extract.ts';
import {
  A2600_ID,
  A2600_MAME_TYPES,
  A2600_PORTS,
} from './a2600/definition.ts';
import { extractA2600 } from './a2600/extract.ts';
import {
  GAMEBOY_ID,
  GAMEBOY_MAME_TYPES,
  GAMEBOY_PORTS,
} from './gameboy/definition.ts';
import { extractGameboy } from './gameboy/extract.ts';
import {
  SN76489_ID,
  SN76489_MAME_TYPES,
  SN76489_MASTER_GAIN,
  SN76489_PORTS,
} from './sn76489/definition.ts';
import { extractSn76489 } from './sn76489/extract.ts';
import {
  POKEY_ID,
  POKEY_MAME_TYPES,
  POKEY_MASTER_GAIN,
  POKEY_PORTS,
} from './pokey/definition.ts';
import { extractPokey } from './pokey/extract.ts';
import {
  DAC_ID,
  DAC_MAME_TYPES,
  DAC_MASTER_GAIN,
  DAC_PORTS,
} from './dac/definition.ts';
import { extractDac } from './dac/extract.ts';
import {
  PHOENIX_SOUND_ID,
  PHOENIX_SOUND_MAME_TYPES,
  PHOENIX_SOUND_PORTS,
} from './phoenix-sound/definition.ts';
import { extractPhoenixSound } from './phoenix-sound/extract.ts';
import {
  SAMPLES_ID,
  SAMPLES_MAME_TYPES,
  SAMPLES_MASTER_GAIN,
  SAMPLES_PORTS,
} from './samples/definition.ts';
import { extractSamples } from './samples/extract.ts';
import {
  YM2151_ID,
  YM2151_MAME_TYPES,
  YM2151_MASTER_GAIN,
  YM2151_PORTS,
} from './ym2151/definition.ts';
import { extractYm2151 } from './ym2151/extract.ts';
import {
  TMS5220_ID,
  TMS5220_MAME_TYPES,
  TMS5220_MASTER_GAIN,
  TMS5220_PORTS,
} from './tms5220/definition.ts';
import { extractTms5220 } from './tms5220/extract.ts';
import {
  OKIM6295_ID,
  OKIM6295_MAME_TYPES,
  OKIM6295_MASTER_GAIN,
  OKIM6295_PORTS,
} from './okim6295/definition.ts';
import { extractOkim6295 } from './okim6295/extract.ts';
import {
  BERZERK_SOUND_ID,
  BERZERK_SOUND_MAME_TYPES,
  BERZERK_SOUND_PORTS,
} from './berzerk-sound/definition.ts';
import { extractBerzerkSound } from './berzerk-sound/extract.ts';
import { VECTOR_ID, VECTOR_MAME_TYPES, VECTOR_PORTS } from './vector/definition.ts';
import { extractVector } from './vector/extract.ts';
import {
  M68705_ID,
  M68705_MAME_TYPES,
  M68705_PORTS,
} from './m68705/definition.ts';
import { extractM68705 } from './m68705/extract.ts';

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
  {
    id: M68705_ID,
    mameTypes: M68705_MAME_TYPES,
    ports: M68705_PORTS,
    extract: extractM68705,
  },
  {
    id: VECTOR_ID,
    mameTypes: VECTOR_MAME_TYPES,
    ports: VECTOR_PORTS,
    extract: extractVector,
  },
  {
    id: NES_ID,
    mameTypes: NES_MAME_TYPES,
    ports: NES_PORTS,
    extract: extractNes,
    masterGain: NES_MASTER_GAIN,
  },
  {
    id: COLECO_ID,
    mameTypes: COLECO_MAME_TYPES,
    ports: COLECO_PORTS,
    extract: extractColeco,
  },
  {
    id: A2600_ID,
    mameTypes: A2600_MAME_TYPES,
    ports: A2600_PORTS,
    extract: extractA2600,
  },
  {
    id: GAMEBOY_ID,
    mameTypes: GAMEBOY_MAME_TYPES,
    ports: GAMEBOY_PORTS,
    extract: extractGameboy,
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
  {
    id: SN76489_ID,
    mameTypes: SN76489_MAME_TYPES,
    ports: SN76489_PORTS,
    extract: extractSn76489,
    masterGain: SN76489_MASTER_GAIN,
  },
  {
    id: POKEY_ID,
    mameTypes: POKEY_MAME_TYPES,
    ports: POKEY_PORTS,
    extract: extractPokey,
    masterGain: POKEY_MASTER_GAIN,
  },
  {
    id: DAC_ID,
    mameTypes: DAC_MAME_TYPES,
    ports: DAC_PORTS,
    extract: extractDac,
    masterGain: DAC_MASTER_GAIN,
  },
  {
    id: PHOENIX_SOUND_ID,
    mameTypes: PHOENIX_SOUND_MAME_TYPES,
    ports: PHOENIX_SOUND_PORTS,
    extract: extractPhoenixSound,
  },
  {
    id: SAMPLES_ID,
    mameTypes: SAMPLES_MAME_TYPES,
    ports: SAMPLES_PORTS,
    extract: extractSamples,
    masterGain: SAMPLES_MASTER_GAIN,
  },
  {
    id: YM2151_ID,
    mameTypes: YM2151_MAME_TYPES,
    ports: YM2151_PORTS,
    extract: extractYm2151,
    masterGain: YM2151_MASTER_GAIN,
  },
  {
    id: TMS5220_ID,
    mameTypes: TMS5220_MAME_TYPES,
    ports: TMS5220_PORTS,
    extract: extractTms5220,
    masterGain: TMS5220_MASTER_GAIN,
  },
  {
    id: OKIM6295_ID,
    mameTypes: OKIM6295_MAME_TYPES,
    ports: OKIM6295_PORTS,
    extract: extractOkim6295,
    masterGain: OKIM6295_MASTER_GAIN,
  },
  {
    id: BERZERK_SOUND_ID,
    mameTypes: BERZERK_SOUND_MAME_TYPES,
    ports: BERZERK_SOUND_PORTS,
    extract: extractBerzerkSound,
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
