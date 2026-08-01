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

/** Source-derived DAC/filter network mixed alongside a primary sound core. */
export interface GeneratedDacFilterPlan {
  type: 'DAC_FILTER';
  levels: number[];
  channels: {
    input: number;
    frequency: number;
    q: number;
    gain: number;
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
  source: { file: string; line: number; netlist: string };
}

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
    /** RCDISC_MODULATED networks respond to both latch transitions. */
    triggerEdge?: 'active' | 'both';
    /**
     * Exact source topology used after the oscillator. These circuits cannot
     * be represented by a generic ADSR without changing their pitch/timbre.
     */
    network?: 'dkong-stomp' | 'dkong-jump' | 'dkong-walk';
  }[];
  /** Run the source circuit's final resistor mixer and amplifier stages. */
  outputNetwork?: 'dkong2b';
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
