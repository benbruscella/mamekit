// GENERATED from src/devices/sound/ay8910.cpp:1058 and src/devices/sound/ay8910.h; do not edit.
// Register masks, resistor DAC curve, clock divider, envelope parameters and
// LFSR taps are extracted from MAME's AY implementation. RC behavior is
// sourced from flt_rc and route/filter controls arrive from generated machine IR.
const plan = {
  "schemaVersion": 1,
  "type": "AY8910",
  "className": "ay8910_device",
  "channels": 3,
  "registerCount": 16,
  "clockDivider": 8,
  "envelopeMask": 15,
  "envelopeStep": 2,
  "noiseTaps": [
    0,
    3
  ],
  "readMasks": [
    255,
    15,
    255,
    15,
    255,
    15,
    31,
    255,
    31,
    31,
    31,
    255,
    255,
    15,
    255,
    255
  ],
  "volumeTable": [
    0.058927736180525124,
    0.06120043048404258,
    0.0621874417847898,
    0.06348708943654095,
    0.06549909986778446,
    0.06842824965489658,
    0.07201834520188828,
    0.08085345249289323,
    0.08621279728272452,
    0.1042588449132449,
    0.12206251641600518,
    0.1431024311282511,
    0.17172927220763642,
    0.2021024965157659,
    0.2487789635467008,
    0.29875331309001657
  ],
  "legacyVolumeTable": [
    -0.125,
    -0.12026177663616097,
    -0.11820400758277991,
    -0.11549443909450804,
    -0.11129970211696952,
    -0.10519286850718829,
    -0.09770806310558056,
    -0.07928820271191775,
    -0.06811478063806223,
    -0.030491504874337425,
    0.006626453377211516,
    0.05049148850685958,
    0.11017411587355805,
    0.1734976877367712,
    0.27081105112451004,
    0.375
  ],
  "singleOutput": {
    "rDown": 800000,
    "rUp": 8000000,
    "load": 1000,
    "resistances": [
      15950,
      15350,
      15090,
      14760,
      14275,
      13620,
      12890,
      11370,
      10600,
      8590,
      7190,
      5985,
      4820,
      3945,
      3017,
      2345
    ],
    "zeroIsOff": true
  },
  "filterTypes": {
    "lowpass3r": 0,
    "lowpass": 2,
    "highpass": 3,
    "ac": 4
  },
  "sourceFiles": [
    "src/devices/sound/ay8910.cpp",
    "src/devices/sound/ay8910.h",
    "src/devices/sound/flt_rc.cpp",
    "src/devices/sound/flt_rc.h"
  ],
  "source": {
    "file": "src/devices/sound/ay8910.cpp",
    "line": 1058
  }
};
const msmPlan: GeneratedMsm5205PlanData | null = {
  "schemaVersion": 1,
  "type": "MSM5205",
  "className": "msm5205_device",
  "indexShift": [
    -1,
    -1,
    -1,
    -1,
    2,
    4,
    6,
    8
  ],
  "diffLookup": [
    2,
    6,
    10,
    14,
    18,
    22,
    26,
    30,
    -2,
    -6,
    -10,
    -14,
    -18,
    -22,
    -26,
    -30,
    2,
    6,
    10,
    14,
    19,
    23,
    27,
    31,
    -2,
    -6,
    -10,
    -14,
    -19,
    -23,
    -27,
    -31,
    2,
    7,
    11,
    16,
    21,
    26,
    30,
    35,
    -2,
    -7,
    -11,
    -16,
    -21,
    -26,
    -30,
    -35,
    2,
    7,
    13,
    18,
    23,
    28,
    34,
    39,
    -2,
    -7,
    -13,
    -18,
    -23,
    -28,
    -34,
    -39,
    2,
    8,
    14,
    20,
    25,
    31,
    37,
    43,
    -2,
    -8,
    -14,
    -20,
    -25,
    -31,
    -37,
    -43,
    3,
    9,
    15,
    21,
    28,
    34,
    40,
    46,
    -3,
    -9,
    -15,
    -21,
    -28,
    -34,
    -40,
    -46,
    3,
    10,
    17,
    24,
    31,
    38,
    45,
    52,
    -3,
    -10,
    -17,
    -24,
    -31,
    -38,
    -45,
    -52,
    3,
    11,
    19,
    27,
    34,
    42,
    50,
    58,
    -3,
    -11,
    -19,
    -27,
    -34,
    -42,
    -50,
    -58,
    4,
    12,
    21,
    29,
    38,
    46,
    55,
    63,
    -4,
    -12,
    -21,
    -29,
    -38,
    -46,
    -55,
    -63,
    4,
    13,
    23,
    32,
    41,
    50,
    60,
    69,
    -4,
    -13,
    -23,
    -32,
    -41,
    -50,
    -60,
    -69,
    5,
    15,
    25,
    35,
    46,
    56,
    66,
    76,
    -5,
    -15,
    -25,
    -35,
    -46,
    -56,
    -66,
    -76,
    5,
    16,
    28,
    39,
    50,
    61,
    73,
    84,
    -5,
    -16,
    -28,
    -39,
    -50,
    -61,
    -73,
    -84,
    6,
    18,
    31,
    43,
    56,
    68,
    81,
    93,
    -6,
    -18,
    -31,
    -43,
    -56,
    -68,
    -81,
    -93,
    6,
    20,
    34,
    48,
    61,
    75,
    89,
    103,
    -6,
    -20,
    -34,
    -48,
    -61,
    -75,
    -89,
    -103,
    7,
    22,
    37,
    52,
    67,
    82,
    97,
    112,
    -7,
    -22,
    -37,
    -52,
    -67,
    -82,
    -97,
    -112,
    8,
    24,
    41,
    57,
    74,
    90,
    107,
    123,
    -8,
    -24,
    -41,
    -57,
    -74,
    -90,
    -107,
    -123,
    9,
    27,
    45,
    63,
    82,
    100,
    118,
    136,
    -9,
    -27,
    -45,
    -63,
    -82,
    -100,
    -118,
    -136,
    10,
    30,
    50,
    70,
    90,
    110,
    130,
    150,
    -10,
    -30,
    -50,
    -70,
    -90,
    -110,
    -130,
    -150,
    11,
    33,
    55,
    77,
    99,
    121,
    143,
    165,
    -11,
    -33,
    -55,
    -77,
    -99,
    -121,
    -143,
    -165,
    12,
    36,
    60,
    84,
    109,
    133,
    157,
    181,
    -12,
    -36,
    -60,
    -84,
    -109,
    -133,
    -157,
    -181,
    13,
    40,
    66,
    93,
    120,
    147,
    173,
    200,
    -13,
    -40,
    -66,
    -93,
    -120,
    -147,
    -173,
    -200,
    14,
    44,
    73,
    103,
    132,
    162,
    191,
    221,
    -14,
    -44,
    -73,
    -103,
    -132,
    -162,
    -191,
    -221,
    16,
    48,
    81,
    113,
    146,
    178,
    211,
    243,
    -16,
    -48,
    -81,
    -113,
    -146,
    -178,
    -211,
    -243,
    17,
    53,
    89,
    125,
    160,
    196,
    232,
    268,
    -17,
    -53,
    -89,
    -125,
    -160,
    -196,
    -232,
    -268,
    19,
    58,
    98,
    137,
    176,
    215,
    255,
    294,
    -19,
    -58,
    -98,
    -137,
    -176,
    -215,
    -255,
    -294,
    21,
    64,
    108,
    151,
    194,
    237,
    281,
    324,
    -21,
    -64,
    -108,
    -151,
    -194,
    -237,
    -281,
    -324,
    23,
    71,
    118,
    166,
    213,
    261,
    308,
    356,
    -23,
    -71,
    -118,
    -166,
    -213,
    -261,
    -308,
    -356,
    26,
    78,
    130,
    182,
    235,
    287,
    339,
    391,
    -26,
    -78,
    -130,
    -182,
    -235,
    -287,
    -339,
    -391,
    28,
    86,
    143,
    201,
    258,
    316,
    373,
    431,
    -28,
    -86,
    -143,
    -201,
    -258,
    -316,
    -373,
    -431,
    31,
    94,
    158,
    221,
    284,
    347,
    411,
    474,
    -31,
    -94,
    -158,
    -221,
    -284,
    -347,
    -411,
    -474,
    34,
    104,
    174,
    244,
    313,
    383,
    453,
    523,
    -34,
    -104,
    -174,
    -244,
    -313,
    -383,
    -453,
    -523,
    38,
    115,
    191,
    268,
    345,
    422,
    498,
    575,
    -38,
    -115,
    -191,
    -268,
    -345,
    -422,
    -498,
    -575,
    42,
    126,
    210,
    294,
    379,
    463,
    547,
    631,
    -42,
    -126,
    -210,
    -294,
    -379,
    -463,
    -547,
    -631,
    46,
    139,
    231,
    324,
    417,
    510,
    602,
    695,
    -46,
    -139,
    -231,
    -324,
    -417,
    -510,
    -602,
    -695,
    51,
    153,
    255,
    357,
    459,
    561,
    663,
    765,
    -51,
    -153,
    -255,
    -357,
    -459,
    -561,
    -663,
    -765,
    56,
    168,
    280,
    392,
    505,
    617,
    729,
    841,
    -56,
    -168,
    -280,
    -392,
    -505,
    -617,
    -729,
    -841,
    61,
    185,
    308,
    432,
    555,
    679,
    802,
    926,
    -61,
    -185,
    -308,
    -432,
    -555,
    -679,
    -802,
    -926,
    68,
    204,
    340,
    476,
    612,
    748,
    884,
    1020,
    -68,
    -204,
    -340,
    -476,
    -612,
    -748,
    -884,
    -1020,
    74,
    224,
    373,
    523,
    672,
    822,
    971,
    1121,
    -74,
    -224,
    -373,
    -523,
    -672,
    -822,
    -971,
    -1121,
    82,
    246,
    411,
    575,
    740,
    904,
    1069,
    1233,
    -82,
    -246,
    -411,
    -575,
    -740,
    -904,
    -1069,
    -1233,
    90,
    271,
    452,
    633,
    814,
    995,
    1176,
    1357,
    -90,
    -271,
    -452,
    -633,
    -814,
    -995,
    -1176,
    -1357,
    99,
    298,
    497,
    696,
    895,
    1094,
    1293,
    1492,
    -99,
    -298,
    -497,
    -696,
    -895,
    -1094,
    -1293,
    -1492,
    109,
    328,
    547,
    766,
    985,
    1204,
    1423,
    1642,
    -109,
    -328,
    -547,
    -766,
    -985,
    -1204,
    -1423,
    -1642,
    120,
    361,
    601,
    842,
    1083,
    1324,
    1564,
    1805,
    -120,
    -361,
    -601,
    -842,
    -1083,
    -1324,
    -1564,
    -1805,
    132,
    397,
    662,
    927,
    1192,
    1457,
    1722,
    1987,
    -132,
    -397,
    -662,
    -927,
    -1192,
    -1457,
    -1722,
    -1987,
    145,
    437,
    728,
    1020,
    1311,
    1603,
    1894,
    2186,
    -145,
    -437,
    -728,
    -1020,
    -1311,
    -1603,
    -1894,
    -2186,
    160,
    480,
    801,
    1121,
    1442,
    1762,
    2083,
    2403,
    -160,
    -480,
    -801,
    -1121,
    -1442,
    -1762,
    -2083,
    -2403,
    176,
    529,
    881,
    1234,
    1587,
    1940,
    2292,
    2645,
    -176,
    -529,
    -881,
    -1234,
    -1587,
    -1940,
    -2292,
    -2645,
    194,
    582,
    970,
    1358,
    1746,
    2134,
    2522,
    2910,
    -194,
    -582,
    -970,
    -1358,
    -1746,
    -2134,
    -2522,
    -2910
  ],
  "modes": {
    "S96_3B": 0,
    "S48_3B": 1,
    "S64_3B": 2,
    "SEX_3B": 3,
    "S96_4B": 4,
    "S48_4B": 5,
    "S64_4B": 6,
    "SEX_4B": 7,
    "S160": 12,
    "S80": 13,
    "S40": 14,
    "S20": 15
  },
  "maximumStep": 48,
  "minimumSignal": -2048,
  "maximumSignal": 2047,
  "sampleScale": 0.000244140625,
  "dacBits": 10,
  "sourceFiles": [
    "src/devices/sound/msm5205.cpp",
    "src/devices/sound/msm5205.h"
  ],
  "source": {
    "file": "src/devices/sound/msm5205.cpp",
    "line": 370
  }
};
const FILTER_CONTROL_BASE = 256;
const FILTER_CONTROL_STRIDE = 5;

interface GeneratedMsm5205PlanData {
  schemaVersion: number;
  type: string;
  className: string;
  indexShift: number[];
  diffLookup: number[];
  modes: Record<string, number>;
  maximumStep: number;
  minimumSignal: number;
  maximumSignal: number;
  sampleScale: number;
  dacBits: number;
  sourceFiles: string[];
  source: { file: string; line: number };
}

export interface GeneratedAyRoute {
  chip: number;
  channel: number;
  gain: number;
  target: string;
  targetInput?: number;
  filter?: { index: number; bank: number; channel: number };
}

export interface GeneratedDiscreteMixerPlanData {
  schemaVersion: number;
  type: string;
  streamInputs: { node: number; input: number; gain: number; offset: number }[];
  dataInputs: { node: number; gain: number; offset: number }[];
  controlInputs: number[];
  filters: {
    node: number;
    input: number;
    control: number;
    resistance: number;
    capacitors: number[];
  }[];
  adders: { node: number; inputs: number[] }[];
  mixers: {
    node: number;
    inputs: number[];
    resistances: number[];
    /** discrete_mixer_desc cF: low-pass across the summing node. */
    filterCapacitance: number;
    /** discrete_mixer_desc cAmp: AC coupling, fixed at 100k in MAME. */
    couplingCapacitance: number;
    referenceVoltage: number;
    gain: number;
  }[];
  outputs: { node: number; gain: number }[];
  graph?: GeneratedDiscreteGraphNodeData[];
  source: { file: string; line: number; netlist: string };
}

type GeneratedDiscreteOperandData = { node: number } | { value: number };

interface GeneratedDiscreteGraphNodeData {
  op: 'stream' | 'adder' | 'multiply' | 'crFilter' | 'opAmpFilter' | 'mixer' | 'output';
  node: number;
  input?: number | GeneratedDiscreteOperandData;
  inputs?: GeneratedDiscreteOperandData[];
  enable?: GeneratedDiscreteOperandData;
  gain?: number;
  offset?: number;
  resistance?: number;
  capacitance?: number;
  filterType?: 'lowPass1' | 'highPass1' | 'bandPass1' | 'bandPass1M';
  mixerType?: 'resistor' | 'opAmp' | 'opAmpWithRi';
  r1?: number;
  r2?: number;
  r3?: number;
  rI?: number;
  rF?: number;
  c1?: number;
  c2?: number;
  cF?: number;
  cAmp?: number;
  resistances?: number[];
  capacitors?: number[];
  vRef?: number;
  vMax?: number;
  vMin?: number;
}

/** One graph node with its MAME reset-time constants and step state. */
interface GeneratedDiscreteGraphStep {
  spec: GeneratedDiscreteGraphNodeData;
  route?: GeneratedAyRoute;
  /** RC_CHARGE_EXP per capacitor (filter C1/C2, mixer inputs, cF, cAmp). */
  exponents: number[];
  /** Capacitor voltages, and the biquad's x1/x2/y1/y2 for BAND_PASS_1M. */
  state: number[];
  rTotal: number;
  filterGain: number;
  a1: number;
  a2: number;
  b0: number;
  b1: number;
  b2: number;
}

export interface GeneratedAuxiliaryAudioDevice {
  type: string;
  deviceTag: string;
  clock: number;
  sampleRegion?: string;
  sampleRom?: Uint8Array;
  sampleRate?: number;
  initialMode?: string;
  gain: number;
  target: string;
  targetInput?: number;
  writeMethods: string[];
  referenceControl?: { deviceTag: string; member?: string };
  /** Normalized levels of a DISCRETE_DAC_R1 reference-voltage ladder. */
  referenceLevels?: number[];
}

interface GeneratedFilterState {
  type: number;
  r1: number;
  r2: number;
  r3: number;
  c: number;
  k: number;
  memory: number;
}

export class GeneratedAy8910Core {
  readonly nativeRate: number;
  private readonly regs = new Uint8Array(plan.registerCount);
  private readonly tonePeriod = [1, 1, 1];
  private readonly toneCount = [0, 0, 0];
  private readonly toneOutput = [0, 0, 0];
  private noiseCount = 0;
  private noisePrescale = 0;
  private rng = 1;
  private envelopePeriod = 0;
  private envelopeCount = 0;
  private envelopePosition = plan.envelopeMask;
  private envelopeAttack = 0;
  private envelopeHold = 0;
  private envelopeAlternate = 0;
  private envelopeHolding = false;
  private readonly mixedSamples = [0, 0, 0];
  private singleOutput = 0;
  /** Each pin's volume curve: MAME's build_single_table for its own load. */
  private readonly volumeTables: number[][];

  constructor(clock: number, resistorLoads?: readonly number[]) {
    this.nativeRate = clock / plan.clockDivider;
    const table = (load: number): number[] => plan.singleOutput.resistances.map((resistance, index) => {
      let total = 1 / plan.singleOutput.rDown + 1 / load + 1 / resistance;
      let high = 1 / resistance;
      if (index !== 0) {
        total += 1 / plan.singleOutput.rUp;
        high += 1 / plan.singleOutput.rUp;
      }
      return high / total;
    });
    this.volumeTables = Array.from({ length: plan.channels }, (_, channel) =>
      resistorLoads?.[channel] ? table(resistorLoads[channel]!) : plan.volumeTable);
  }

  write(reg: number, data: number): void {
    reg &= plan.registerCount - 1;
    this.regs[reg] = data & 0xff;
    if (reg <= 5) {
      const channel = reg >> 1;
      this.tonePeriod[channel] = Math.max(
        1,
        this.regs[channel * 2] | ((this.regs[channel * 2 + 1] & 0x0f) << 8),
      );
    } else if (reg === 11 || reg === 12) {
      this.envelopePeriod = this.regs[11] | (this.regs[12] << 8);
    } else if (reg === 13) {
      const shape = data & plan.envelopeMask;
      this.envelopeAttack = shape & 0x04 ? plan.envelopeMask : 0;
      if (!(shape & 0x08)) {
        this.envelopeHold = 1;
        this.envelopeAlternate = this.envelopeAttack;
      } else {
        this.envelopeHold = shape & 1;
        this.envelopeAlternate = shape & 2;
      }
      this.envelopePosition = plan.envelopeMask;
      this.envelopeHolding = false;
      this.envelopeCount = 0;
    }
  }

  read(reg: number): number {
    reg &= plan.registerCount - 1;
    return this.regs[reg] & plan.readMasks[reg];
  }

  sampleChannels(output: number[], analogOutputs = true): void {
    for (let channel = 0; channel < plan.channels; channel++) {
      if (++this.toneCount[channel] >= this.tonePeriod[channel]) {
        this.toneCount[channel] = 0;
        this.toneOutput[channel] ^= 1;
      }
    }
    const noisePeriod = Math.max(1, this.regs[6] & 0x1f);
    if (++this.noiseCount >= noisePeriod) {
      this.noiseCount = 0;
      this.noisePrescale ^= 1;
      if (!this.noisePrescale) {
        const input =
          ((this.rng >> plan.noiseTaps[0]) ^ (this.rng >> plan.noiseTaps[1])) & 1;
        this.rng = (this.rng >>> 1) | (input << 16);
      }
    }
    if (!this.envelopeHolding) {
      const period = Math.max(1, this.envelopePeriod * plan.envelopeStep);
      if (++this.envelopeCount >= period) {
        this.envelopeCount = 0;
        if (--this.envelopePosition < 0) {
          if (this.envelopeHold) {
            if (this.envelopeAlternate) this.envelopeAttack ^= plan.envelopeMask;
            this.envelopeHolding = true;
            this.envelopePosition = 0;
          } else {
            if (this.envelopeAlternate) this.envelopeAttack ^= plan.envelopeMask;
            this.envelopePosition &= plan.envelopeMask;
          }
        }
      }
    }
    const envelope = this.envelopePosition ^ this.envelopeAttack;
    const enable = this.regs[7];
    let pullups = 0;
    let conductance = 0;
    let drivenConductance = 0;
    for (let channel = 0; channel < plan.channels; channel++) {
      const toneGate = this.toneOutput[channel] | ((enable >> channel) & 1);
      const noiseGate = (this.rng & 1) | ((enable >> (channel + 3)) & 1);
      const volume = this.regs[8 + channel];
      const envelopeEnabled = (volume & 0x10) !== 0;
      const level = envelopeEnabled ? envelope : volume & 0x0f;
      const gate = toneGate & noiseGate;
      if (analogOutputs) {
        output[channel] = this.volumeTables[channel]![gate ? level : 0]!;
      } else {
        const amplitude = plan.legacyVolumeTable[level] - plan.legacyVolumeTable[0];
        output[channel] = gate ? amplitude : -amplitude;
      }

      // MAME's AY8910_SINGLE_OUTPUT does not average three independent
      // streams: the physical pins share one resistor load. Reproduce its
      // build_3D_table conductance equation from the source-derived values.
      const tiedLevel = gate ? level : 0;
      if (!plan.singleOutput.zeroIsOff || tiedLevel !== 0 || envelopeEnabled) pullups++;
      const levelConductance = 1 / plan.singleOutput.resistances[tiedLevel];
      conductance += levelConductance;
      drivenConductance += levelConductance;
    }
    const pullupConductance = pullups / plan.singleOutput.rUp;
    this.singleOutput = (drivenConductance + pullupConductance) / (
      conductance + pullupConductance +
      plan.channels / plan.singleOutput.rDown + 1 / plan.singleOutput.load
    );
  }

  sampleTiedOutput(): number {
    return this.singleOutput;
  }

  sample(): number {
    this.sampleChannels(this.mixedSamples);
    return this.mixedSamples.reduce((sum, value) => sum + value, 0) / plan.channels;
  }
}

export class GeneratedMsm5205Core {
  private data = 0;
  private reset = false;
  private bitwidth = 4;
  private modeValue = 4;
  private signal = 0;
  private step = 0;

  constructor(initialMode?: string) {
    if (!msmPlan) throw new Error('MSM5205 plan is not present in this generated worklet');
    const mode = initialMode
      ? (msmPlan.modes as Record<string, number>)[initialMode]
      : undefined;
    if (mode !== undefined) this.playmode(mode);
  }

  write(method: string, data: number): void {
    if (method === 'data_w') {
      this.data = this.bitwidth === 4 ? data & 0x0f : (data & 0x07) << 1;
    } else if (method === 'reset_w') {
      this.reset = data !== 0;
    } else if (method === 'playmode_w') {
      this.playmode(data);
    } else if (method === 's1_w') {
      this.playmode((this.mode() & ~1) | (data ? 1 : 0));
    } else if (method === 's2_w') {
      this.playmode((this.mode() & ~2) | (data ? 2 : 0));
    // vck is the generated master-clock event. MAME wires a slave MSM5205
    // through msm5205_device::vclk_w; in the generated frame schedule that
    // callback arrives once per active clock edge, so both method names clock
    // the same ADPCM decoder state.
    } else if ((method === 'vck' || method === 'vclk_w') && data) {
      this.clock();
    }
  }

  sample(): number {
    if (!msmPlan) return 0;
    const mask = msmPlan.dacBits >= 12 ? 0 : (1 << (12 - msmPlan.dacBits)) - 1;
    return (this.signal & ~mask) * msmPlan.sampleScale;
  }

  private mode(): number {
    return this.modeValue;
  }

  private playmode(data: number): void {
    this.modeValue = data & 7;
    this.bitwidth = data & 4 ? 4 : 3;
  }

  private clock(): void {
    if (!msmPlan) return;
    if (this.reset) {
      this.signal = 0;
      this.step = 0;
      return;
    }
    const value = this.data & 15;
    this.signal = Math.max(
      msmPlan.minimumSignal,
      Math.min(
        msmPlan.maximumSignal,
        this.signal + msmPlan.diffLookup[this.step * 16 + value],
      ),
    );
    this.step = Math.max(
      0,
      Math.min(msmPlan.maximumStep, this.step + msmPlan.indexShift[value & 7]),
    );
  }
}

export class GeneratedDac8Core {
  private readonly mask: number;
  private readonly midpoint: number;
  private value: number;
  private reference = 1;
  private sampleCursor = 0;
  private sampleIntegral = 0;
  private integrating = false;
  private readonly referenceLevels?: number[];

  constructor(bits = 8, referenceLevels?: number[]) {
    this.mask = (1 << bits) - 1;
    this.midpoint = 1 << (bits - 1);
    this.value = this.midpoint;
    this.referenceLevels = referenceLevels;
  }

  write(method: string, data: number): void {
    if (method === 'data_w' || method === 'write') this.value = data & this.mask;
    else if (method === 'reference_w') {
      this.reference = this.referenceLevels?.[data & 0xff] ?? (data & 0xff) / 0xff;
    }
  }

  beginSample(): void {
    this.sampleCursor = 0;
    this.sampleIntegral = 0;
    this.integrating = true;
  }

  writeAt(method: string, data: number, position: number): void {
    const clamped = Math.max(this.sampleCursor, Math.min(1, position));
    this.sampleIntegral += this.currentSample() * (clamped - this.sampleCursor);
    this.sampleCursor = clamped;
    this.write(method, data);
  }

  sample(): number {
    if (!this.integrating) return this.currentSample();
    const result = this.sampleIntegral + this.currentSample() * (1 - this.sampleCursor);
    this.integrating = false;
    return result;
  }

  private currentSample(): number {
    return (this.value - this.midpoint) / this.midpoint * this.reference;
  }
}

export class GeneratedAy8910Mixer {
  private readonly cores: GeneratedAy8910Core[];
  private readonly phases: number[];
  private readonly channelSamples: number[][];
  private readonly nativeSamples: number[][];
  private readonly sampleSums: number[][];
  private readonly antialias1: number[][];
  private readonly antialias2: number[][];
  private readonly antialiasK: number[];
  private readonly singleSamples: number[];
  private readonly singleSums: number[];
  private readonly singleAntialias1: number[];
  private readonly singleAntialias2: number[];
  private readonly routes: GeneratedAyRoute[];
  private readonly filters: GeneratedFilterState[];
  private readonly outputGains: number[][];
  private readonly sourceAnalogMix: boolean;
  private readonly gainTotal: number;
  private readonly auxiliary: {
    deviceTag: string;
    gain: number;
    outputGain: number;
    core: GeneratedMsm5205Core | GeneratedDac8Core;
  }[];
  private readonly auxiliaryWrites = new Map<string, {
    core: GeneratedMsm5205Core | GeneratedDac8Core;
    method: string;
  }>();
  private readonly timedWrites = new Set<string>();
  private readonly auxiliaryGainTotal: number;
  private readonly discreteMixer?: GeneratedDiscreteMixerPlanData;
  private readonly discreteValues = new Map<number, number>();
  private readonly discreteFilterMemory = new Map<number, number>();
  private discreteGraph?: GeneratedDiscreteGraphStep[];
  private readonly discreteGraphValues = new Map<number, number>();
  private discreteGraphOutputs = 1;
  private readonly outputRate: number;
  private readonly deviceTags: string[];
  private muted = false;

  constructor(
    clock: number,
    chips: number,
    outputRate: number,
    routes: GeneratedAyRoute[] = [],
    auxiliaryDevices: GeneratedAuxiliaryAudioDevice[] = [],
    discreteMixer?: GeneratedDiscreteMixerPlanData,
    deviceTags: string[] = [],
    resistorLoads: readonly (readonly number[])[] = [],
  ) {
    this.outputRate = outputRate;
    this.deviceTags = deviceTags;
    const count = Math.max(1, chips);
    this.cores = Array.from({ length: count }, (_, chip) =>
      new GeneratedAy8910Core(clock, resistorLoads[chip]));
    this.phases = this.cores.map(() => 0);
    this.channelSamples = this.cores.map(() => [0, 0, 0]);
    this.nativeSamples = this.cores.map(() => [0, 0, 0]);
    this.sampleSums = this.cores.map(() => [0, 0, 0]);
    this.antialias1 = this.cores.map(() => [0, 0, 0]);
    this.antialias2 = this.cores.map(() => [0, 0, 0]);
    this.singleSamples = this.cores.map(() => 0);
    this.singleSums = this.cores.map(() => 0);
    this.singleAntialias1 = this.cores.map(() => 0);
    this.singleAntialias2 = this.cores.map(() => 0);
    this.antialiasK = this.cores.map(core =>
      core.nativeRate > outputRate
        ? 1 - Math.exp(-2 * Math.PI * outputRate * 0.4 / core.nativeRate)
        : 1);
    this.routes = routes.length
      ? routes
      : this.cores.flatMap((_, chip) =>
          Array.from({ length: plan.channels }, (_unused, channel) => ({
            chip,
            channel,
            gain: 1,
            target: 'mono',
          })));
    this.outputGains = this.cores.map(() => [1, 1, 1]);
    // Taito SJ's AY bank and moving-reference DAC are one explicit analog
    // mixer. Preserve source voltages for that topology; other generated AY
    // packages retain their established normalized stream protocol until
    // their downstream netlists are compiled to the same level of fidelity.
    //
    // A lowered DISCRETE_SOUND network is exactly that fidelity: its
    // DISCRETE_INPUTX_STREAM nodes expect the resistor ladder's own unipolar
    // voltages, which is what MAME feeds them (build_mixer_table only
    // normalizes for AY8910_LEGACY_OUTPUT). Handing such a netlist the
    // normalized bipolar curve instead makes every AY channel about four
    // times too loud, which is inaudible on its own but silently buries
    // anything else mixed alongside them — Gyruss's i8039 percussion sat
    // ~4.4x under its true weight against the AYs for exactly this reason.
    this.sourceAnalogMix = auxiliaryDevices.some(device =>
      (device.referenceLevels?.length ?? 0) > 0) ||
      (discreteMixer?.streamInputs?.length ?? 0) > 0;
    const filterCount = this.routes.reduce(
      (maximum, route) => Math.max(maximum, (route.filter?.index ?? -1) + 1),
      0,
    );
    this.filters = Array.from({ length: filterCount }, () => ({
      type: plan.filterTypes.lowpass3r,
      r1: 1,
      r2: 1,
      r3: 1,
      c: 0,
      k: 1,
      memory: 0,
    }));
    this.gainTotal = this.routes.reduce((sum, route) => sum + route.gain, 0) || 1;
    this.auxiliary = auxiliaryDevices.flatMap<{
      deviceTag: string;
      gain: number;
      outputGain: number;
      core: GeneratedMsm5205Core | GeneratedDac8Core;
    }>(device =>
      device.type === 'MSM5205' && msmPlan
        ? [{
            deviceTag: device.deviceTag,
            gain: device.gain,
            outputGain: 1,
            core: new GeneratedMsm5205Core(device.initialMode),
          }]
        : device.type === 'DAC_4BIT_R2R' || device.type === 'DAC_8BIT_R2R'
          ? [{
              deviceTag: device.deviceTag,
              gain: device.gain,
              outputGain: 1,
              core: new GeneratedDac8Core(
                device.type === 'DAC_4BIT_R2R' ? 4 : 8,
                device.referenceLevels,
              ),
            }]
          : []);
    for (const device of this.auxiliary) {
      const definition = auxiliaryDevices.find(candidate =>
        candidate.deviceTag === device.deviceTag);
      const methods = new Set([
        ...(definition?.writeMethods ?? []),
        ...(device.core instanceof GeneratedMsm5205Core ? ['vck', 'vclk_w'] : []),
        ...(device.core instanceof GeneratedDac8Core ? ['reference_w'] : []),
      ]);
      for (const method of methods) {
        const key = `${device.deviceTag}.${method}`;
        this.auxiliaryWrites.set(key, { core: device.core, method });
        if (device.core instanceof GeneratedDac8Core) this.timedWrites.add(key);
      }
    }
    this.auxiliaryGainTotal = this.auxiliary.reduce(
      (sum, device) => sum + device.gain,
      0,
    );
    this.discreteMixer = discreteMixer;
    if (discreteMixer?.graph) this.resetDiscreteGraph(discreteMixer.graph);
    for (const input of discreteMixer?.dataInputs ?? []) {
      this.discreteValues.set(input.node, 0);
    }
    for (const node of discreteMixer?.controlInputs ?? []) {
      this.discreteValues.set(node, 0);
    }
  }

  write(offset: number, data: number, method?: string): void {
    if (method === 'discrete') {
      this.discreteValues.set(offset, data);
      return;
    }
    const auxiliaryWrite = this.auxiliaryWrites.get(method ?? '');
    if (auxiliaryWrite) {
      auxiliaryWrite.core.write(auxiliaryWrite.method, data);
      return;
    }
    const gainWrite = /^(.+).set_output_gain$/.exec(method ?? '');
    if (gainWrite) {
      const gain = Math.max(0, Math.min(1, data / 0xff));
      const auxiliary = this.auxiliary.find(device => device.deviceTag === gainWrite[1]);
      if (auxiliary) {
        auxiliary.outputGain = gain;
        return;
      }
      const chip = this.deviceTags.indexOf(gainWrite[1]!);
      if (chip >= 0 && this.outputGains[chip]) {
        this.outputGains[chip]![Math.max(0, Math.min(2, offset))] = gain;
      }
      return;
    }
    if (offset < 0) {
      this.muted = data !== 0;
      return;
    }
    if (offset >= FILTER_CONTROL_BASE) {
      const control = offset - FILTER_CONTROL_BASE;
      const filter = this.filters[Math.floor(control / FILTER_CONTROL_STRIDE)];
      if (!filter) return;
      const parameter = control % FILTER_CONTROL_STRIDE;
      if (parameter === 0) filter.type = data;
      else if (parameter === 1) filter.r1 = data;
      else if (parameter === 2) filter.r2 = data;
      else if (parameter === 3) filter.r3 = data;
      else filter.c = data;
      this.recalculate(filter);
      return;
    }
    this.cores[offset >> 4]?.write(offset & 0x0f, data);
  }

  beginSample(): void {
    for (const device of this.auxiliary) {
      if (device.core instanceof GeneratedDac8Core) device.core.beginSample();
    }
  }

  isTimedWrite(method?: string): boolean {
    return this.timedWrites.has(method ?? '');
  }

  writeAt(offset: number, data: number, method: string | undefined, position: number): void {
    const auxiliaryWrite = this.auxiliaryWrites.get(method ?? '');
    if (auxiliaryWrite?.core instanceof GeneratedDac8Core) {
      auxiliaryWrite.core.writeAt(auxiliaryWrite.method, data, position);
      return;
    }
    this.write(offset, data, method);
  }

  sample(): number {
    if (this.muted) return 0;
    for (let chip = 0; chip < this.cores.length; chip++) {
      const core = this.cores[chip]!;
      const native = this.nativeSamples[chip]!;
      const sums = this.sampleSums[chip]!;
      const lowpass1 = this.antialias1[chip]!;
      const lowpass2 = this.antialias2[chip]!;
      const k = this.antialiasK[chip]!;
      sums.fill(0);
      this.singleSums[chip] = 0;
      let nativeSamples = 0;
      this.phases[chip]! += core.nativeRate / this.outputRate;
      while (this.phases[chip]! >= 1) {
        this.phases[chip]! -= 1;
        core.sampleChannels(native, this.sourceAnalogMix);
        for (let channel = 0; channel < plan.channels; channel++) {
          lowpass1[channel]! += (native[channel]! - lowpass1[channel]!) * k;
          lowpass2[channel]! += (lowpass1[channel]! - lowpass2[channel]!) * k;
          sums[channel]! += lowpass2[channel]!;
        }
        this.singleAntialias1[chip]! +=
          (core.sampleTiedOutput() - this.singleAntialias1[chip]!) * k;
        this.singleAntialias2[chip]! +=
          (this.singleAntialias1[chip]! - this.singleAntialias2[chip]!) * k;
        this.singleSums[chip]! += this.singleAntialias2[chip]!;
        nativeSamples++;
      }
      if (nativeSamples) {
        for (let channel = 0; channel < plan.channels; channel++) {
          this.channelSamples[chip]![channel] = sums[channel]! / nativeSamples;
        }
        this.singleSamples[chip] = this.singleSums[chip]! / nativeSamples;
      }
    }
    if (this.discreteGraph) return this.sampleDiscreteGraph();
    if (this.discreteMixer) return this.sampleDiscreteMixer();
    let mixed = 0;
    for (const route of this.routes) {
      const samples = this.channelSamples[route.chip];
      let value = route.channel === -1
        ? this.singleSamples[route.chip] ?? 0
        : samples?.[route.channel] ?? 0;
      if (route.filter) value = this.filter(value, this.filters[route.filter.index]);
      const output = route.channel === -1 ? 0 : route.channel;
      mixed += value * route.gain * (this.outputGains[route.chip]?.[output] ?? 1);
    }
    for (const device of this.auxiliary) {
      mixed += device.core.sample() * device.gain * device.outputGain;
    }
    // A fully source-compiled analog mixer uses MAME's physical add_route
    // gains. Legacy stream packages retain their established weighted mix.
    const output = this.sourceAnalogMix
      ? mixed
      : mixed / (this.gainTotal + this.auxiliaryGainTotal);
    return Math.max(-1, Math.min(1, output));
  }

  // DISCRETE_RESET for each node class in the graph (disc_flt.hxx,
  // disc_mth.hxx): the charge exponents and filter coefficients MAME derives
  // once from the components and the stream's sample rate.
  private resetDiscreteGraph(graph: GeneratedDiscreteGraphNodeData[]): void {
    const rate = this.outputRate;
    const charge = (rc: number): number => rc > 0 ? 1 - Math.exp(-1 / rate / rc) : 0;
    this.discreteGraph = graph.map(spec => {
      const step: GeneratedDiscreteGraphStep = {
        spec, exponents: [], state: [0, 0, 0, 0], rTotal: 0, filterGain: 0,
        a1: 0, a2: 0, b0: 0, b1: 0, b2: 0,
      };
      if (spec.op === 'stream') {
        step.route = this.routes.find(candidate => candidate.targetInput === spec.input);
      } else if (spec.op === 'crFilter') {
        step.exponents = [charge(spec.resistance! * spec.capacitance!)];
      } else if (spec.op === 'opAmpFilter') {
        let conductance = 1 / spec.r1!;
        if (spec.r2) conductance += 1 / spec.r2;
        if (spec.r3) conductance += 1 / spec.r3;
        const rTotal = 1 / conductance;
        step.rTotal = rTotal;
        step.filterGain = -spec.rF! / rTotal;
        if (spec.filterType === 'lowPass1') {
          step.exponents = [charge(spec.rF! * spec.c1!), 0];
        } else if (spec.filterType === 'highPass1') {
          step.exponents = [charge(rTotal * spec.c1!), 0];
        } else if (spec.filterType === 'bandPass1') {
          step.exponents = [charge(spec.rF! * spec.c1!), charge(rTotal * spec.c2!)];
        } else {
          const c1 = spec.c1!;
          const c2 = spec.c2!;
          const fc = 1 / (2 * Math.PI * Math.sqrt(rTotal * spec.rF! * c1 * c2));
          const d = (c1 + c2) / Math.sqrt(spec.rF! / rTotal * c1 * c2);
          const gain = -spec.rF! / rTotal * c2 / (c1 + c2);
          // calculate_filter2_coefficients, DISC_FILTER_BANDPASS, pre-warped.
          const twoOverT = 2 * rate;
          const twoOverTSquared = twoOverT * twoOverT;
          const wc = rate * 2 * Math.tan(Math.PI * fc / rate);
          const wcSquared = wc * wc;
          const den = twoOverTSquared + d * wc * twoOverT + wcSquared;
          step.a1 = 2 * (-twoOverTSquared + wcSquared) / den;
          step.a2 = (twoOverTSquared - d * wc * twoOverT + wcSquared) / den;
          step.b0 = d * wc * twoOverT / den * gain;
          step.b1 = 0;
          step.b2 = -d * wc * twoOverT / den * gain;
        }
      } else if (spec.op === 'mixer') {
        const type = spec.mixerType;
        let conductance = 0;
        for (const resistance of spec.resistances!) conductance += 1 / resistance;
        if (spec.rF && type === 'resistor') conductance += 1 / spec.rF;
        if (type === 'opAmpWithRi') conductance += 1 / spec.rI!;
        step.rTotal = 1 / conductance;
        step.exponents = spec.capacitors!.map((capacitance, index) => {
          if (!capacitance) return 0;
          const resistance = spec.resistances![index]!;
          const r = type === 'resistor' && spec.rF
            ? 1 / (1 / resistance + 1 / spec.rF)
            : type === 'opAmpWithRi' ? resistance + spec.rI! : resistance;
          return charge(r * capacitance);
        });
        // cF charges through rF on an op-amp (info->type, so with or without
        // rI) and through the source network's resistance otherwise.
        step.exponents.push(
          spec.cF ? charge((type === 'resistor' ? step.rTotal : spec.rF!) * spec.cF) : 0,
          // "We will use 100k ohms as an average final stage impedance."
          spec.cAmp ? charge(100_000 * spec.cAmp) : 0,
        );
        step.filterGain = type === 'opAmpWithRi' ? spec.rF! / spec.rI! : 0;
        step.state = new Array(spec.capacitors!.length + 2).fill(0);
      }
      return step;
    });
    this.discreteGraphOutputs = Math.max(1, graph.filter(spec => spec.op === 'output').length);
  }

  // DISCRETE_STEP for each node, in netlist order, in volts.
  private sampleDiscreteGraph(): number {
    const values = this.discreteGraphValues;
    const read = (operand: GeneratedDiscreteOperandData | undefined): number =>
      operand === undefined ? 0 : 'node' in operand ? values.get(operand.node) ?? 0 : operand.value;
    let output = 0;
    for (const step of this.discreteGraph!) {
      const spec = step.spec;
      const state = step.state;
      switch (spec.op) {
        case 'stream': {
          const route = step.route;
          const sample = !route
            ? 0
            : route.channel === -1
              ? this.singleSamples[route.chip] ?? 0
              : this.channelSamples[route.chip]?.[route.channel] ?? 0;
          // dss_input_stream: the stream sample * 32768 * gain + offset.
          values.set(spec.node, sample * (route?.gain ?? 1) * 32768 * spec.gain! + spec.offset!);
          break;
        }
        case 'adder': {
          let sum = 0;
          if (read(spec.enable)) for (const input of spec.inputs!) sum += read(input);
          values.set(spec.node, sum);
          break;
        }
        case 'multiply':
          values.set(spec.node, read(spec.inputs![0]) * read(spec.inputs![1]));
          break;
        case 'crFilter': {
          const vOut = read(spec.input as GeneratedDiscreteOperandData) - state[0]!;
          values.set(spec.node, vOut);
          state[0] = state[0]! + (vOut - spec.vRef!) * step.exponents[0]!;
          break;
        }
        case 'opAmpFilter': {
          if (!read(spec.enable)) {
            values.set(spec.node, 0);
            break;
          }
          const vRef = spec.vRef!;
          let current = (read(spec.inputs![0]) - vRef) / spec.r1!;
          if (spec.r2) current += (read(spec.inputs![1]) - vRef) / spec.r2;
          const v = current * step.rTotal;
          let vOut = 0;
          if (spec.filterType === 'lowPass1') {
            state[0] = state[0]! + (v - state[0]!) * step.exponents[0]!;
            vOut = state[0]! * step.filterGain + vRef;
          } else if (spec.filterType === 'highPass1') {
            vOut = (v - state[0]!) * step.filterGain + vRef;
            state[0] = state[0]! + (v - state[0]!) * step.exponents[0]!;
          } else if (spec.filterType === 'bandPass1') {
            vOut = v - state[1]!;
            state[1] = state[1]! + (v - state[1]!) * step.exponents[1]!;
            state[0] = state[0]! + (vOut - state[0]!) * step.exponents[0]!;
            vOut = state[0]! * step.filterGain + vRef;
          } else {
            // state = x1, x2, y1, y2
            vOut = -step.a1 * state[2]! - step.a2 * state[3]! +
              step.b0 * v + step.b1 * state[0]! + step.b2 * state[1]! + vRef;
            state[1] = state[0]!;
            state[0] = v;
            state[3] = state[2]!;
          }
          // Clip to the rails: the circuit's own distortion.
          if (vOut > spec.vMax!) vOut = spec.vMax!;
          if (vOut < spec.vMin!) vOut = spec.vMin!;
          if (spec.filterType === 'bandPass1M') state[2] = vOut - vRef;
          values.set(spec.node, vOut);
          break;
        }
        case 'mixer': {
          if (!read(spec.enable)) {
            values.set(spec.node, 0);
            break;
          }
          const vRef = spec.vRef!;
          const inputs = spec.inputs!;
          const opAmp = spec.mixerType === 'opAmp';
          let current = 0;
          for (let index = 0; index < inputs.length; index++) {
            let v = read(inputs[index]);
            if (spec.capacitors![index]) {
              state[index] = state[index]! + (v - vRef - state[index]!) * step.exponents[index]!;
              v -= state[index]!;
            }
            current += (opAmp ? vRef - v : v) / spec.resistances![index]!;
          }
          if (spec.mixerType === 'opAmpWithRi') current += vRef / spec.rI!;
          let v = current * (opAmp ? spec.rF! : step.rTotal);
          if (spec.mixerType === 'opAmpWithRi') v = vRef + step.filterGain * (vRef - v);
          const filterIndex = inputs.length;
          if (spec.cF) {
            state[filterIndex] = state[filterIndex]! + (v - vRef - state[filterIndex]!) * step.exponents[filterIndex]!;
            v = state[filterIndex]!;
          }
          if (spec.cAmp) {
            state[filterIndex + 1] = state[filterIndex + 1]! + (v - state[filterIndex + 1]!) * step.exponents[filterIndex + 1]!;
            v -= state[filterIndex + 1]!;
          }
          values.set(spec.node, v * spec.gain!);
          break;
        }
        case 'output':
          // dso_output hands the stream value * gain / 32768.
          output += read(spec.input as GeneratedDiscreteOperandData) * spec.gain! / 32768;
          break;
      }
    }
    return Math.max(-1, Math.min(1, output / this.discreteGraphOutputs));
  }

  private sampleDiscreteMixer(): number {
    const mixer = this.discreteMixer!;
    const values = new Map(this.discreteValues);
    for (const input of mixer.streamInputs) {
      const route = this.routes.find(candidate => candidate.targetInput === input.input);
      const samples = route ? this.channelSamples[route.chip] : undefined;
      const value = route?.channel === -1
        ? this.singleSamples[route.chip] ?? 0
        : samples?.[route?.channel ?? -1] ?? 0;
      values.set(input.node, value * (route?.gain ?? 1) * input.gain + input.offset);
    }
    for (const input of mixer.dataInputs) {
      const raw = this.discreteValues.get(input.node) ?? 0;
      const maximum = Math.abs(input.gain) * 255 || 1;
      values.set(input.node, (raw * input.gain + input.offset) / maximum);
    }
    for (const filter of mixer.filters) {
      const control = values.get(filter.control) ?? 0;
      const capacitance = filter.capacitors.reduce(
        (sum, value, index) => sum + ((control >> index) & 1 ? value : 0),
        0,
      );
      const input = values.get(filter.input) ?? 0;
      if (capacitance === 0) {
        values.set(filter.node, input);
        this.discreteFilterMemory.set(filter.node, input);
        continue;
      }
      const k = 1 - Math.exp(-1 / (filter.resistance * capacitance) / this.outputRate);
      const memory = this.discreteFilterMemory.get(filter.node) ?? input;
      const output = memory + (input - memory) * k;
      this.discreteFilterMemory.set(filter.node, output);
      values.set(filter.node, output);
    }
    for (const adder of mixer.adders) {
      values.set(adder.node, adder.inputs.reduce(
        (sum, input) => sum + (values.get(input) ?? 0),
        0,
      ));
    }
    for (const stage of mixer.mixers) {
      const conductance = stage.resistances.reduce(
        (sum, resistance) => sum + 1 / resistance,
        0,
      );
      // Millman's theorem, exactly as MAME's DISC_MIXER_IS_RESISTOR sums.
      let value = stage.inputs.reduce(
        (sum, input, index) =>
          sum + (values.get(input) ?? 0) / stage.resistances[index]!,
        0,
      ) / conductance;
      const memory = this.discreteFilterMemory;
      const step = 1 / this.outputRate;
      if (stage.filterCapacitance > 0) {
        const key = stage.node * 2;
        const exponent = 1 - Math.exp(-step / ((1 / conductance) * stage.filterCapacitance));
        const held = (memory.get(key) ?? 0) +
          (value - stage.referenceVoltage - (memory.get(key) ?? 0)) * exponent;
        memory.set(key, held);
        value = held;
      }
      if (stage.couplingCapacitance > 0) {
        // MAME fixes this stage's resistance at 100k (disc_mth.hxx).
        const key = stage.node * 2 + 1;
        const exponent = 1 - Math.exp(-step / (100_000 * stage.couplingCapacitance));
        const held = (memory.get(key) ?? 0) + (value - (memory.get(key) ?? 0)) * exponent;
        memory.set(key, held);
        value -= held;
      }
      values.set(stage.node, value * stage.gain);
    }
    // Each DISCRETE_OUTPUT is one speaker channel carrying its own source gain
    // (Gyruss routes NODE_50 right and NODE_51 left). Folding them to this
    // mono sink averages the CHANNELS, so divide by how many there are — not,
    // as before, by the sum of their gains, which cancelled the very gain that
    // lifts a discrete network into the stream's range and left the whole mix
    // an output-gain quieter than the hardware.
    const output = mixer.outputs.reduce(
      (sum, candidate) => sum + (values.get(candidate.node) ?? 0) * candidate.gain,
      0,
    ) / Math.max(1, mixer.outputs.length);
    return Math.max(-1, Math.min(1, output));
  }

  private recalculate(filter: GeneratedFilterState): void {
    if (filter.c === 0) {
      filter.k = filter.type === plan.filterTypes.highpass || filter.type === plan.filterTypes.ac
        ? 0
        : 1;
      filter.memory = 0;
      return;
    }
    const resistance = filter.type === plan.filterTypes.lowpass3r
      ? filter.r1 * (filter.r2 + filter.r3) / (filter.r1 + filter.r2 + filter.r3)
      : filter.r1;
    filter.k = 1 - Math.exp(-1 / (resistance * filter.c) / this.outputRate);
  }

  private filter(input: number, filter: GeneratedFilterState | undefined): number {
    if (!filter) return input;
    if (filter.type === plan.filterTypes.highpass || filter.type === plan.filterTypes.ac) {
      const output = input - filter.memory;
      filter.memory += (input - filter.memory) * filter.k;
      return output;
    }
    filter.memory += (input - filter.memory) * filter.k;
    return filter.memory;
  }
}

export interface GeneratedAyWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

/**
 * Renders one emulated video frame while applying AY writes at their MAME
 * raster position. Both the AudioWorklet and game acceptance tests use this
 * class, so browser scheduling is covered by the deterministic PCM golden.
 */
export class GeneratedAy8910FrameRenderer {
  private sampleCarry = 0;
  private readonly mixer: GeneratedAy8910Mixer;
  private readonly outputRate: number;
  private readonly refresh: number;

  constructor(
    mixer: GeneratedAy8910Mixer,
    outputRate: number,
    refresh: number,
  ) {
    this.mixer = mixer;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedAyWrite[]): Float32Array {
    this.sampleCarry += this.outputRate / this.refresh;
    const count = Math.floor(this.sampleCarry);
    this.sampleCarry -= count;
    const output = new Float32Array(count);
    let writeIndex = 0;
    for (let sampleIndex = 0; sampleIndex < count; sampleIndex++) {
      this.mixer.beginSample();
      const deferred: GeneratedAyWrite[] = [];
      while (writeIndex < writes.length) {
        const write = writes[writeIndex]!;
        const exactSample = Math.max(
          0,
          Math.min(count, (write.frac ?? 0) * count),
        );
        if (exactSample > sampleIndex + 1) break;
        if (this.mixer.isTimedWrite(write.method)) {
          this.mixer.writeAt(
            write.offset,
            write.data,
            write.method,
            exactSample - sampleIndex,
          );
        } else if (exactSample <= sampleIndex) {
          this.mixer.write(write.offset, write.data, write.method);
        } else {
          deferred.push(write);
        }
        writeIndex++;
      }
      output[sampleIndex] = this.mixer.sample();
      for (const write of deferred) {
        this.mixer.write(write.offset, write.data, write.method);
      }
    }
    while (writeIndex < writes.length) {
      const write = writes[writeIndex++]!;
      this.mixer.write(write.offset, write.data, write.method);
    }
    return output;
  }
}

declare const sampleRate: number;
declare class AudioWorkletProcessor {
  readonly port: MessagePort;
  constructor();
}
declare function registerProcessor(
  name: string,
  processorCtor: new () => AudioWorkletProcessor,
): void;

class GeneratedAy8910Processor extends AudioWorkletProcessor {
  private mixer?: GeneratedAy8910Mixer;
  private renderer?: GeneratedAy8910FrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array;
  private currentIndex = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        clock?: number;
        chips?: number;
        deviceTags?: string[];
        routes?: GeneratedAyRoute[];
        auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[];
        discreteMixer?: GeneratedDiscreteMixerPlanData;
        resistorLoads?: number[][];
        refresh?: number;
        offset?: number;
        data?: number;
        method?: string;
        writes?: GeneratedAyWrite[];
      };
      if (message.type === 'init') {
        this.mixer = new GeneratedAy8910Mixer(
          message.clock ?? 1_789_772,
          message.chips ?? 1,
          sampleRate,
          message.routes,
          message.auxiliaryDevices,
          message.discreteMixer,
          message.deviceTags,
          message.resistorLoads,
        );
        this.renderer = new GeneratedAy8910FrameRenderer(
          this.mixer,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'write') {
        this.mixer?.write(message.offset ?? 0, message.data ?? 0, message.method);
      } else if (message.type === 'batch') {
        if (this.renderer) {
          this.frames.push(this.renderer.render(message.writes ?? []));
          // Elastic queue: frame delivery jitters (a rAF tick can carry 0 or
          // 2 batches, and non-60Hz boards beat against the display rate), so
          // a few frames of slack must absorb it — dropping to one frame made
          // every burst an audible discontinuity. The cap still bounds A/V
          // latency after a main-thread catch-up burst.
          while (this.frames.length > 3) this.frames.shift();
        }
      }
    };
  }

  private lastSample = 0;

  private nextSample(): number {
    while (!this.current || this.currentIndex >= this.current.length) {
      this.current = this.frames.shift();
      this.currentIndex = 0;
      // Starved: hold the last sample. A 0-fill is a hard step on any
      // mix with a DC offset (e.g. tied-pin AY outputs) and pops loudly.
      if (!this.current) return this.lastSample;
    }
    return (this.lastSample = this.current[this.currentIndex++]!);
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    for (let index = 0; index < output.length; index++) {
      output[index] = this.nextSample();
    }
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('ay8910', GeneratedAy8910Processor);
