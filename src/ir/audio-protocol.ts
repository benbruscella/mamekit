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
/**
 * The RP2A03's internal APU as rp2a03.cpp composes it: the sound device its
 * device_add_mconfig builds, the internal map that reaches it, and the CPU
 * line and space its callbacks drive. The APU itself is nes_apu.cpp compiled
 * whole; this is only how the CPU holds it.
 */
export interface GeneratedNesApuPlan {
  schemaVersion: 2;
  /** The APU's device type (`NES_APU`), built at the CPU's own clock. */
  type: string;
  /** Its tag under the CPU and the CPU's finder for it (`m_apu`). */
  tag: string;
  member: string;
  /** The CPU class whose map and callbacks these are. */
  cpuClass: string;
  /** The core's input line its irq() drives (`APU_IRQ_LINE`). */
  irqLine: string;
  /** The CPU space its mem_read() reads (the DMC's samples). */
  memReadSpace: 'program';
  /** rp2a03_map, each range's handler as MAME writes it. */
  internalMap: {
    ranges: {
      start: number;
      end: number;
      read?: { method: string; parameters: string; body: string };
      write?: { method: string; parameters: string; body: string };
      source: { file: string; line: number };
    }[];
  };
  sourceFiles: string[];
}
