/** Register-space extension used between generated boards and AY worklets. */
export const AY_FILTER_CONTROL_BASE = 0x100;
export const AY_FILTER_CONTROL_STRIDE = 5;

/** What `set_flags` and `set_resistors_load` configure on one AY chip. */
export interface GeneratedAyChipOutput {
  flags: number;
  loads: number[];
}

/** MAME's default post-mix speaker effect, extracted during generation. */
export interface GeneratedSpeakerFilterPlan {
  type: 'highpass';
  frequency: number;
  q: number;
  source: {
    file: string;
    line: number;
  };
}

/**
 * One MAME filter_biquad_device stage, lowered from the op-amp component
 * values its machine configuration passes to a `*_setup` helper. MAME derives
 * cutoff, Q and gain from resistors and capacitors, so those three numbers are
 * the transferable fact; the digital coefficients depend on the sample rate
 * the stage ends up running at and are computed where it runs.
 */
export interface GeneratedBiquadStage {
  deviceTag: string;
  /** filter_biquad_device::biquad_type, lowercased. */
  type: 'lowpass' | 'lowpass1p';
  frequency: number;
  q: number;
  gain: number;
  source: { file: string; line: number };
}

/**
 * One DAC as MAME declares it: the chip's resolution and coding, or, for a
 * netlist integer input, the mask its machine configuration passes.
 */
export interface GeneratedDacChip {
  deviceTag: string;
  bits: number;
  /** dac_mapper_* without its prefix: unsigned, signed, ones_complement. */
  mapper: string;
  gain: number;
}

/** A non-primary sound stream routed into the generated browser mixer. */
export interface GeneratedAuxiliaryAudioDevice {
  type: string;
  deviceTag: string;
  member?: string;
  clock: number;
  /** ROM region owned by this sound device, when its stream reads samples. */
  sampleRegion?: string;
  /** Materialized by the shell/probe before the configuration reaches DSP. */
  sampleRom?: Uint8Array;
  initialMode?: string;
  gain: number;
  target: string;
  targetInput?: number;
  writeMethods: string[];
  /** A DAC chip's resolution, coding and ladder gain, from dac.h. */
  dac?: { bits: number; mapper: string; gain: number };
  /**
   * The device's own address space (`set_addrmap(0, ...)`) over its sample
   * region: each window is either a fixed slice of the region or a memory
   * bank, whose entries are region offsets selected by `bank.<tag>` writes.
   */
  sampleMap?: GeneratedSampleWindow[];
}

export interface GeneratedSampleWindow {
  start: number;
  end: number;
  /** Fixed `rom().region(...)` offset into the sample region. */
  regionOffset?: number;
  /** `bankr("tag")`: the entry offsets and which one is selected at start. */
  bank?: { tag: string; entryOffsets: (number | null)[]; initialEntry: number };
}
/** Source-derived RP2A03 APU configuration carried by generated board IR. */
export interface GeneratedNesApuPlan {
  schemaVersion: 1;
  type: 'NES_APU';
  className: 'nesapu_device';
  internalMap: {
    ranges: {
      start: number;
      end: number;
      read?: string;
      write?: string;
      source: { file: string; line: number };
    }[];
  };
  lengthTable: number[];
  noisePeriods: { ntsc: number[]; pal: number[] };
  dmcPeriods: { ntsc: number[]; pal: number[] };
  dutyPatterns: number[];
  clocks: { ntsc: number; pal: number; streamDivider: number };
  frameClocks: { ntsc: number; pal: number };
  mixer: {
    pulse: { numerator: number; divisor: number; bias: number };
    tnd: {
      numerator: number;
      triangleDivisor: number;
      noiseDivisor: number;
      dmcDivisor: number;
      bias: number;
    };
  };
  writeMethod: string;
  statusMethod: string;
  sourceFiles: string[];
  source: { file: string; line: number };
}
