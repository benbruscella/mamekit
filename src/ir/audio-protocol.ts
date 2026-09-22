/** Register-space extension used between generated boards and AY worklets. */
export const AY_FILTER_CONTROL_BASE = 0x100;
export const AY_FILTER_CONTROL_STRIDE = 5;

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

/** Source-derived DAC/filter network mixed alongside a primary sound core. */
export interface GeneratedDacFilterPlan {
  type: 'DAC_FILTER';
  levels: number[];
  channels: {
    input: number;
    frequency: number;
    q: number;
    gain: number;
    /** A channel may use a different resistor ladder than the shared DAC. */
    levels?: number[];
    /** Additional source-ordered filter stages after the primary band-pass. */
    stages?: {
      type: 'lowpass' | 'highpass' | 'bandpass';
      frequency: number;
      q: number;
      gain: number;
    }[];
    /** Source clamp applied after all stages (DISCRETE_CLAMP). */
    clamp?: { minimum: number; maximum: number };
  }[];
  outputGain: number;
  source: { file: string; line: number; netlist: string };
}

/** Executable subset of a MAME DISCRETE_SOUND_START signal graph. */
export interface GeneratedDiscreteMixerPlan {
  schemaVersion: 1;
  type: 'DISCRETE_MIXER';
  streamInputs: {
    node: number;
    input: number;
    gain: number;
    offset: number;
  }[];
  dataInputs: {
    node: number;
    gain: number;
    offset: number;
  }[];
  controlInputs: number[];
  filters: {
    node: number;
    input: number;
    control: number;
    resistance: number;
    capacitors: number[];
  }[];
  adders: {
    node: number;
    inputs: number[];
  }[];
  mixers: {
    node: number;
    inputs: number[];
    resistances: number[];
  }[];
  outputs: {
    node: number;
    gain: number;
  }[];
  /**
   * The netlist in MAME's own step order with MAME's node equations, present
   * when it carries a stage the linear sections above cannot express (an
   * op-amp filter or mixer, a CR filter, a multiply). Node values are real
   * volts: a stream input is scaled by 32768 and DISCRETE_OUTPUT divides it
   * back out, so op-amp rail clipping sees the voltage the circuit does.
   */
  graph?: GeneratedDiscreteGraphNode[];
  source: { file: string; line: number; netlist: string };
}

/** A discrete node input: another node's output, or a constant. */
export type GeneratedDiscreteOperand = { node: number } | { value: number };

export type GeneratedDiscreteGraphNode =
  | { op: 'stream'; node: number; input: number; gain: number; offset: number }
  | { op: 'adder'; node: number; enable: GeneratedDiscreteOperand; inputs: GeneratedDiscreteOperand[] }
  | { op: 'multiply'; node: number; inputs: GeneratedDiscreteOperand[] }
  | {
    op: 'crFilter';
    node: number;
    input: GeneratedDiscreteOperand;
    resistance: number;
    capacitance: number;
    vRef: number;
  }
  | {
    /** DST_OP_AMP_FILT, non-Norton. vMax already carries the rail offset. */
    op: 'opAmpFilter';
    node: number;
    enable: GeneratedDiscreteOperand;
    inputs: [GeneratedDiscreteOperand, GeneratedDiscreteOperand];
    filterType: 'lowPass1' | 'highPass1' | 'bandPass1' | 'bandPass1M';
    r1: number;
    r2: number;
    r3: number;
    rF: number;
    c1: number;
    c2: number;
    vRef: number;
    vMax: number;
    vMin: number;
  }
  | {
    op: 'mixer';
    node: number;
    enable: GeneratedDiscreteOperand;
    mixerType: 'resistor' | 'opAmp' | 'opAmpWithRi';
    inputs: GeneratedDiscreteOperand[];
    resistances: number[];
    capacitors: number[];
    rI: number;
    rF: number;
    cF: number;
    cAmp: number;
    vRef: number;
    gain: number;
  }
  | { op: 'output'; node: number; input: GeneratedDiscreteOperand; gain: number };

/** Source-derived DAC, resistor attenuator and CR-filter discrete topology. */
export interface GeneratedDiscreteDacPlan {
  schemaVersion: 1;
  type: 'DISCRETE_DAC_ATTENUATOR';
  dac: { node: number; gain: number; offset: number; initial: number };
  volumeNode: number;
  /** Driver symbols used when handlers write the two normalized input nodes. */
  inputNodes?: Record<string, number>;
  channels: {
    shift: number;
    mask: number;
    resistances: number[];
    dividerResistance: number;
    filterResistance: number;
    filterCapacitance: number;
    outputGain: number;
  }[];
  source: { file: string; line: number; netlist: string };
}

/** Source-derived triggered effects and CPU-driven DAC discrete topology. */
export interface GeneratedDiscreteEffectsPlan {
  schemaVersion: 1;
  type: 'DISCRETE_EFFECTS';
  /** Driver symbols accepted by discrete_device::write/write_line callbacks. */
  inputNodes: Record<string, number>;
  dac: {
    node: number;
    gain: number;
    filterFrequency: number;
    q: number;
  };
  voices: {
    node: number;
    mode: 'noise' | 'tone';
    frequency: number;
    /** Source-derived inverter oscillator and 555 control-voltage network. */
    vco?: {
      modulationFrequency: number;
      modulationResistance: number;
      modulationParallelResistance: number;
      modulationCapacitance: number;
      modulationType: 1 | 2;
      controlResistance1: number;
      controlResistance2: number;
      oscillatorResistance: number;
      outputResistance: number;
      controlCapacitance: number;
      timerResistance1: number;
      timerResistance2: number;
      timerCapacitance: number;
      supplyVoltage: number;
    };
    release: number;
    gain: number;
    activeLow: boolean;
    /** The source oscillator remains audible while its logic gate is held. */
    sustain?: boolean;
    /** RCDISC_MODULATED networks respond to both latch transitions. */
    triggerEdge?: 'active' | 'both';
    /**
     * Exact source topology used after the oscillator. These circuits cannot
     * be represented by a generic ADSR without changing their pitch/timbre.
     */
    network?: 'dkong-stomp' | 'dkong-jump' | 'dkong-walk' |
      'dkongjr-walk' | 'dkongjr-jump' | 'dkongjr-climb' |
      'dkongjr-fall' | 'dkongjr-control';
  }[];
  /** Run a board-specific source circuit that cannot be reduced to generic voices. */
  outputNetwork?: 'dkong2b' | 'dkongjr' | 'asteroid';
  dischargeNode?: number;
  /** RC decay applied to the DAC when the active-low discharge gate closes. */
  dischargeRelease?: number;
  outputGain: number;
  source: { file: string; line: number; netlist: string };
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
  /** samples_device::start_raw rate lowered from its driver call. */
  sampleRate?: number;
  initialMode?: string;
  gain: number;
  target: string;
  targetInput?: number;
  writeMethods: string[];
  /** Discrete stream that drives this DAC's positive/negative references. */
  referenceControl?: {
    deviceTag: string;
    member?: string;
  };
  /** Normalized voltage levels of the source DISCRETE_DAC_R1 ladder. */
  referenceLevels?: number[];
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
