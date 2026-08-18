import { readFileSync } from 'node:fs';
import type { MameHardwareDefinition } from './hardware.ts';
import type { GeneratedMsm5205Plan } from './audio-compiler.ts';
import {
  algorithmOps,
  constant,
  enumeratorValues,
  lineOf,
  nestedNumericTable,
  numericTable,
  operatorMap,
  powerTable,
  registerField,
  requireState,
  type GeneratedOpnField,
} from './opn-compiler.ts';

/**
 * Lower MAME's YM2151 (OPM) sound device.
 *
 * MAME implements the OPM through the bundled ymfm library, so the chip's
 * behavior lives in `3rdparty/ymfm`. Everything the generated worklet needs is
 * read from that source: the die-extracted sine/power/envelope tables shared
 * with the OPN family, the OPM key-code phase-step table, the coarse-detune
 * deltas, the register bitfield map declared by `opm_registers`, and the
 * fixed operator interleave. Nothing here is transcribed by hand.
 */

const YMFM_ROOT = '3rdparty/ymfm/src';
const FM_HEADER = `${YMFM_ROOT}/ymfm_fm.h`;
const FM_SOURCE = `${YMFM_ROOT}/ymfm_fm.ipp`;
const OPM_HEADER = `${YMFM_ROOT}/ymfm_opm.h`;
const OPM_SOURCE = `${YMFM_ROOT}/ymfm_opm.cpp`;
const YMFM_HEADER = `${YMFM_ROOT}/ymfm.h`;

/** OPM register field with the accessor's literal XOR mask, when present. */
export interface GeneratedOpmField extends GeneratedOpnField {
  xor?: number;
}

export interface GeneratedYm2151Plan {
  schemaVersion: 1;
  type: 'YM2151';
  className: string;
  channels: number;
  operators: number;
  registers: number;
  /** ymfm chip sample rate is the input clock divided by prescale*operators. */
  sampleRateDivider: number;
  egClockDivider: number;
  egQuiet: number;
  egAttack: number;
  egDecay: number;
  egSustain: number;
  egRelease: number;
  waveformLength: number;
  lfoWaveformLength: number;
  operatorMap: number[][];
  algorithmOps: number[];
  sinTable: number[];
  powerTable: number[];
  incrementTable: number[];
  detuneTable: number[][];
  /** opm_key_code_to_phase_step's verified 12*64-entry fnum table. */
  phaseStepTable: number[];
  /** compute_phase_step's coarse DT2 deltas in 1/64ths of a key code. */
  detune2Delta: number[];
  fields: Record<string, GeneratedOpmField>;
  sourceFiles: string[];
  source: { file: string; line: number };
}

/** OPM register accessors the generated engine consumes. */
const OPM_FIELDS = [
  'lfo_reset',
  'noise_frequency',
  'noise_enable',
  'lfo_rate',
  'lfo_am_depth',
  'lfo_pm_depth',
  'lfo_waveform',
  'ch_output_0',
  'ch_output_1',
  'ch_feedback',
  'ch_algorithm',
  'ch_block_freq',
  'ch_lfo_pm_sens',
  'ch_lfo_am_sens',
  'op_detune',
  'op_multiple',
  'op_total_level',
  'op_ksr',
  'op_attack_rate',
  'op_lfo_am_enable',
  'op_decay_rate',
  'op_detune2',
  'op_sustain_rate',
  'op_sustain_level',
  'op_release_rate',
] as const;

/** Field plus the accessor's trailing `^ mask`, as on noise_frequency. */
function opmField(header: string, name: string): GeneratedOpmField {
  const field: GeneratedOpmField = registerField(header, name);
  const declaration = new RegExp(
    `\\b${name}\\s*\\([^)]*\\)\\s*const\\s*\\{\\s*return\\s+([^;]+);`,
  ).exec(header)?.[1] ?? '';
  const mask = /\^\s*(0x[\da-f]+|\d+)\s*$/i.exec(declaration.trim())?.[1];
  if (mask !== undefined) field.xor = Number(mask);
  return field;
}

/**
 * Evaluate a constant C integer expression of the shape ymfm uses for its
 * detune tables: literals combined with +, *, / and parentheses. C integer
 * division truncates.
 */
function integerExpression(text: string): number {
  let cursor = 0;
  const source = text.trim();
  const parseExpression = (): number => {
    let value = parseTerm();
    while (source[cursor] === '+' || source[cursor] === '-') {
      const operator = source[cursor++];
      const right = parseTerm();
      value = operator === '+' ? value + right : value - right;
    }
    return value;
  };
  const parseTerm = (): number => {
    let value = parseFactor();
    while (source[cursor] === '*' || source[cursor] === '/') {
      const operator = source[cursor++];
      const right = parseFactor();
      value = operator === '*' ? value * right : Math.trunc(value / right);
    }
    return value;
  };
  const parseFactor = (): number => {
    while (source[cursor] === ' ') cursor++;
    if (source[cursor] === '(') {
      cursor++;
      const value = parseExpression();
      while (source[cursor] === ' ') cursor++;
      if (source[cursor] === ')') cursor++;
      return value;
    }
    const match = /^\s*(0x[\da-f]+|\d+)/i.exec(source.slice(cursor));
    if (!match) throw new Error(`YM2151: unparseable constant expression: ${text}`);
    cursor += match[0].length;
    return Number(match[1]);
  };
  const value = parseExpression();
  if (!Number.isFinite(value)) {
    throw new Error(`YM2151: constant expression did not evaluate: ${text}`);
  }
  return value;
}

/** s_detune2_delta entries are arithmetic expressions over the manual's cents. */
function detune2Delta(source: string): number[] {
  const body = /s_detune2_delta\s*\[\s*4\s*\]\s*=\s*\{([^}]*)\}/.exec(source)?.[1];
  if (!body) throw new Error('YM2151: ymfm detune2 table is missing');
  const entries: string[] = [];
  let depth = 0;
  let current = '';
  for (const character of body) {
    if (character === '(') depth++;
    if (character === ')') depth--;
    if (character === ',' && depth === 0) {
      entries.push(current);
      current = '';
    } else current += character;
  }
  if (current.trim()) entries.push(current);
  return entries.map(integerExpression);
}

export function compileYm2151(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedYm2151Plan {
  const read = (file: string): string => readFileSync(join2(mameSrc, file), 'utf8');
  const fmHeader = read(FM_HEADER);
  const fmSource = read(FM_SOURCE);
  const opmHeader = read(OPM_HEADER);
  const opmSource = read(OPM_SOURCE);
  const ymfmHeader = read(YMFM_HEADER);

  const egStates = enumeratorValues(ymfmHeader, 'envelope_state');
  const channels = constant(opmHeader, 'CHANNELS');
  const operators = channels * 4;
  const defaultPrescale = constant(opmHeader, 'DEFAULT_PRESCALE');

  const plan: GeneratedYm2151Plan = {
    schemaVersion: 1,
    type: 'YM2151',
    className: definition.className,
    channels,
    operators,
    registers: constant(opmHeader, 'REGISTERS'),
    // fm_engine_base::sample_rate: baseclock / (m_clock_prescale * OPERATORS).
    sampleRateDivider: defaultPrescale * operators,
    egClockDivider: constant(opmHeader, 'EG_CLOCK_DIVIDER'),
    egQuiet: constant(fmHeader, 'EG_QUIET'),
    egAttack: requireState(egStates, 'EG_ATTACK'),
    egDecay: requireState(egStates, 'EG_DECAY'),
    egSustain: requireState(egStates, 'EG_SUSTAIN'),
    egRelease: requireState(egStates, 'EG_RELEASE'),
    waveformLength: constant(fmHeader, 'WAVEFORM_LENGTH'),
    lfoWaveformLength: constant(opmHeader, 'LFO_WAVEFORM_LENGTH'),
    operatorMap: operatorMap(opmSource, channels),
    algorithmOps: algorithmOps(fmSource),
    sinTable: numericTable(fmSource, 's_sin_table'),
    powerTable: powerTable(fmSource),
    incrementTable: numericTable(fmSource, 's_increment_table'),
    detuneTable: nestedNumericTable(fmSource, 's_detune_adjustment'),
    phaseStepTable: numericTable(fmSource, 's_phase_step'),
    detune2Delta: detune2Delta(opmSource),
    fields: Object.fromEntries(
      OPM_FIELDS.map(name => [name, opmField(opmHeader, name)]),
    ),
    sourceFiles: [
      definition.sourceFile,
      YMFM_HEADER,
      FM_HEADER,
      FM_SOURCE,
      OPM_HEADER,
      OPM_SOURCE,
    ],
    source: {
      file: OPM_SOURCE,
      line: lineOf(opmSource, opmSource.indexOf('void ym2151::generate')),
    },
  };
  validate(plan);
  return plan;
}

function join2(base: string, file: string): string {
  return `${base}/${file}`;
}

function validate(plan: GeneratedYm2151Plan): void {
  const problems: string[] = [];
  if (plan.sinTable.length !== 256) problems.push('sine table');
  if (plan.powerTable.length !== 256) problems.push('power table');
  if (plan.incrementTable.length !== 64) problems.push('envelope increment table');
  if (plan.detuneTable.length !== 32) problems.push('detune table');
  if (plan.phaseStepTable.length !== 12 * 64) problems.push('phase step table');
  if (plan.detune2Delta.length !== 4) problems.push('detune2 table');
  if (plan.algorithmOps.length < 8) problems.push('algorithm table');
  if (plan.operatorMap.length !== plan.channels) problems.push('operator map');
  if (!plan.waveformLength || !plan.egQuiet) problems.push('FM constants');
  if (problems.length) {
    throw new Error(
      `YM2151: ymfm source shape is not executable by the audio compiler (${problems.join(', ')})`,
    );
  }
}

/**
 * Emit the generated YM2151 worklet. The engine below is a direct execution of
 * ymfm's OPM algorithm; every table, bitfield offset and constant it consumes
 * comes from `plan`, which is read out of MAME's ymfm sources. An OKIM6295 or
 * MSM5205 bank routed into the same speaker is hosted beside the FM chips.
 */
export function generatedYm2151WorkletSource(
  plan: GeneratedYm2151Plan,
  msm5205Plan?: GeneratedMsm5205Plan,
): string {
  return `// GENERATED from ${plan.source.file}:${plan.source.line}; do not edit.
// The OPM FM engine, register bitfield map, die-extracted sine, power,
// envelope-increment, detune and key-code phase-step tables are all lowered
// from MAME's bundled ymfm implementation.
const plan = ${JSON.stringify(plan, null, 2)};
const msmPlan = (${JSON.stringify(msm5205Plan ?? null, null, 2)}) as GeneratedMsm5205PlanData | null;

interface GeneratedMsm5205PlanData {
  indexShift: number[];
  diffLookup: number[];
  modes: Record<string, number>;
  maximumStep: number;
  minimumSignal: number;
  maximumSignal: number;
  sampleScale: number;
  dacBits: number;
}

export interface GeneratedYmRoute {
  chip: number;
  channel: number;
  gain: number;
  target: string;
}

export interface GeneratedYm2151Write {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

export interface GeneratedAuxiliaryAudioDevice {
  type: string;
  deviceTag: string;
  clock: number;
  initialMode?: string;
  gain: number;
  target: string;
  writeMethods?: string[];
}

interface Field {
  parts: {
    offset: number;
    offsetStride: number;
    shift: number;
    shiftStride: number;
    width: number;
  }[];
  xor?: number;
}

const FIELDS = plan.fields as unknown as Record<string, Field>;
const EG_STATES = 4;
const PHASE_STEP_DYNAMIC = 1;

function bitfield(value: number, start: number, length = 1): number {
  return (value >>> start) & ((1 << length) - 1);
}

function clamp(value: number, minimum: number, maximum: number): number {
  return value < minimum ? minimum : value > maximum ? maximum : value;
}

/** ymfm stores intermediate operator outputs in an int16_t array. */
function int16(value: number): number {
  return (value << 16) >> 16;
}

/** ymfm::roundtrip_fp - the YM3012 DAC's 10.3 floating point round trip. */
function roundtripFp(value: number): number {
  if (value < -32768) return -32768;
  if (value > 32767) return 32767;
  const scan = value ^ (value >> 31);
  let exponent = 7 - Math.clz32((scan << 17) >>> 0);
  if (exponent < 1) exponent = 1;
  exponent -= 1;
  return value & ~((1 << exponent) - 1);
}

/** ymfm's OPM chip: eight four-operator FM channels plus noise and LFO. */
export class GeneratedYm2151Chip {
  private readonly regs = new Uint8Array(plan.registers);
  private readonly waveform = new Uint16Array(plan.waveformLength);
  private readonly lfoWaveform = [
    new Int16Array(plan.lfoWaveformLength),
    new Int16Array(plan.lfoWaveformLength),
    new Int16Array(plan.lfoWaveformLength),
    new Int16Array(plan.lfoWaveformLength),
  ];
  private address = 0;

  // opm_registers LFO and noise state
  private lfoCounter = 0;
  private lfoAm = 0;
  private lfoRawPm = 0;
  private noiseLfsr = 1;
  private noiseCounter = 0;
  private noiseState = 0;

  // FM operator state
  private readonly phase = new Uint32Array(plan.operators);
  private readonly envAttenuation = new Uint16Array(plan.operators);
  private readonly envState = new Uint8Array(plan.operators);
  private readonly keyState = new Uint8Array(plan.operators);
  private readonly keyonLive = new Uint8Array(plan.operators);

  // per-operator cache filled by prepare()
  private readonly cacheBlockFreq = new Uint32Array(plan.operators);
  private readonly cacheDetune = new Int32Array(plan.operators);
  private readonly cacheMultiple = new Uint32Array(plan.operators);
  private readonly cachePhaseStep = new Uint32Array(plan.operators);
  private readonly cachePhaseDynamic = new Uint8Array(plan.operators);
  private readonly cacheTotalLevel = new Uint32Array(plan.operators);
  private readonly cacheEgSustain = new Uint32Array(plan.operators);
  private readonly cacheEgRate = new Uint8Array(plan.operators * EG_STATES);

  // FM channel state
  private readonly feedback0 = new Int32Array(plan.channels);
  private readonly feedback1 = new Int32Array(plan.channels);
  private readonly feedbackIn = new Int32Array(plan.channels);

  private envCounter = 0;
  private prepareCount = 0;
  private modifiedChannels = (1 << plan.channels) - 1;
  private activeChannels = 0;

  /** Reverse of operator_map: ymfm interleaves operators across channels. */
  private readonly operatorChannel = new Uint8Array(plan.operators);

  constructor() {
    for (let chnum = 0; chnum < plan.channels; chnum++) {
      for (const opnum of plan.operatorMap[chnum]!) this.operatorChannel[opnum] = chnum;
    }
    // opm_registers builds the waveform from the die-extracted sine table.
    for (let index = 0; index < plan.waveformLength; index++) {
      this.waveform[index] = this.absSinAttenuation(index) | (bitfield(index, 9) << 15);
    }
    // opm_registers builds the LFO waveforms to match the application manual:
    // AM in the low 8 bits, PM in the upper 8. Waveform 3 (noise) fills in
    // dynamically as the LFO advances.
    for (let index = 0; index < plan.lfoWaveformLength; index++) {
      let am = index ^ 0xff;                      // 0: sawtooth
      let pm = index;
      this.lfoWaveform[0]![index] = int16(am | (pm << 8));
      am = bitfield(index, 7) ? 0 : 0xff;         // 1: square
      pm = am ^ 0x80;
      this.lfoWaveform[1]![index] = int16(am | (pm << 8));
      am = (bitfield(index, 7) ? (index << 1) : ((index ^ 0xff) << 1)) & 0xff; // 2: triangle
      pm = (bitfield(index, 6) ? am : ~am) & 0xff;
      this.lfoWaveform[2]![index] = int16(am | (pm << 8));
    }
    this.reset();
  }

  reset(): void {
    this.regs.fill(0);
    // opm_registers::reset enables output on both channels by default.
    for (let chnum = 0; chnum < plan.channels; chnum++) this.regs[0x20 + chnum] = 0xc0;
    this.address = 0;
    this.lfoCounter = 0;
    this.lfoAm = 0;
    this.lfoRawPm = 0;
    this.noiseLfsr = 1;
    this.noiseCounter = 0;
    this.noiseState = 0;
    this.phase.fill(0);
    this.envAttenuation.fill(0x3ff);
    this.envState.fill(plan.egRelease);
    this.keyState.fill(0);
    this.keyonLive.fill(0);
    this.feedback0.fill(0);
    this.feedback1.fill(0);
    this.feedbackIn.fill(0);
    this.envCounter = 0;
    this.prepareCount = 0;
    this.modifiedChannels = (1 << plan.channels) - 1;
    this.activeChannels = 0;
  }

  /** ym2151::write - address/data port pair. */
  write(offset: number, data: number): void {
    if ((offset & 1) === 0) {
      this.address = data & 0xff;
      return;
    }
    // fm_engine_base::write marks every channel modified before the store.
    this.modifiedChannels = (1 << plan.channels) - 1;
    const index = this.address;
    // opm_registers::write: LFO AM/PM depth share register 0x19; the PM
    // depth (bit 7 set) redirects to the unused neighbor 0x1a.
    if (index === 0x19) this.regs[0x19 + bitfield(data, 7)] = data & 0xff;
    else if (index !== 0x1a) this.regs[index] = data & 0xff;
    if (index === 0x08) {
      const channel = bitfield(data, 0, 3);
      const opmask = bitfield(data, 3, 4);
      for (let opnum = 0; opnum < 4; opnum++) {
        const op = plan.operatorMap[channel]![opnum]!;
        this.keyonLive[op] = bitfield(opmask, opnum);
      }
    }
  }

  /** Read a lowered register field for the given channel/operator offset. */
  private field(name: string, index = 0): number {
    const field = FIELDS[name]!;
    let value = 0;
    for (const part of field.parts) {
      const register = this.regs[part.offset + part.offsetStride * index] ?? 0;
      value = (value << part.width) |
        bitfield(register, part.shift + part.shiftStride * index, part.width);
    }
    if (field.xor !== undefined) value ^= field.xor;
    return value >>> 0;
  }

  private absSinAttenuation(input: number): number {
    const index = bitfield(input, 8) ? ~input : input;
    return plan.sinTable[index & 0xff]!;
  }

  private attenuationToVolume(input: number): number {
    return plan.powerTable[input & 0xff]! >>> (input >>> 8);
  }

  private attenuationIncrement(rate: number, index: number): number {
    return bitfield(plan.incrementTable[rate]!, 4 * index, 4);
  }

  private detuneAdjustment(detune: number, keycode: number): number {
    const result = plan.detuneTable[keycode]![detune & 3]!;
    return bitfield(detune, 2) ? -result : result;
  }

  /** fm_registers_base::effective_rate */
  private effectiveRate(rawRate: number, ksr: number): number {
    return rawRate === 0 ? 0 : Math.min(rawRate + ksr, 63);
  }

  /** opm_registers::cache_operator_data */
  private cacheOperatorData(chnum: number, opnum: number): void {
    const blockFreq = this.field('ch_block_freq', chnum);
    this.cacheBlockFreq[opnum] = blockFreq;

    // the 5-bit keycode is the block plus the top 2 bits of the key code
    const keycode = bitfield(blockFreq, 8, 5);

    this.cacheDetune[opnum] = this.detuneAdjustment(this.field('op_detune', opnum), keycode);
    const multiple = this.field('op_multiple', opnum) * 2;
    this.cacheMultiple[opnum] = multiple === 0 ? 1 : multiple;

    // phase step is dynamic while PM is active for this channel
    if (this.field('lfo_pm_depth') === 0 || this.field('ch_lfo_pm_sens', chnum) === 0) {
      this.cachePhaseDynamic[opnum] = 0;
      this.cachePhaseStep[opnum] = this.computePhaseStep(chnum, opnum, 0);
    } else {
      this.cachePhaseDynamic[opnum] = PHASE_STEP_DYNAMIC;
    }

    this.cacheTotalLevel[opnum] = this.field('op_total_level', opnum) << 3;

    let sustain = this.field('op_sustain_level', opnum);
    sustain |= (sustain + 1) & 0x10;
    this.cacheEgSustain[opnum] = sustain << 5;

    const ksrval = keycode >>> (this.field('op_ksr', opnum) ^ 3);
    const base = opnum * EG_STATES;
    this.cacheEgRate[base + plan.egAttack - 1] =
      this.effectiveRate(this.field('op_attack_rate', opnum) * 2, ksrval);
    this.cacheEgRate[base + plan.egDecay - 1] =
      this.effectiveRate(this.field('op_decay_rate', opnum) * 2, ksrval);
    this.cacheEgRate[base + plan.egSustain - 1] =
      this.effectiveRate(this.field('op_sustain_rate', opnum) * 2, ksrval);
    this.cacheEgRate[base + plan.egRelease - 1] =
      this.effectiveRate(this.field('op_release_rate', opnum) * 4 + 2, ksrval);
  }

  private egRate(opnum: number, state: number): number {
    return this.cacheEgRate[opnum * EG_STATES + state - 1] ?? 0;
  }

  /** opm_registers::compute_phase_step */
  private computePhaseStep(chnum: number, opnum: number, lfoRawPm: number): number {
    // coarse detune delta plus the PM delta scaled by channel sensitivity
    let delta = plan.detune2Delta[this.field('op_detune2', opnum)]!;
    const pmSensitivity = this.field('ch_lfo_pm_sens', chnum);
    if (pmSensitivity !== 0) {
      if (pmSensitivity < 6) delta += lfoRawPm >> (6 - pmSensitivity);
      else delta += lfoRawPm << (pmSensitivity - 5);
    }
    let phaseStep = this.opmKeyCodeToPhaseStep(this.cacheBlockFreq[opnum]!, delta);
    phaseStep += this.cacheDetune[opnum]!;
    return (phaseStep * this.cacheMultiple[opnum]!) >>> 1;
  }

  /** ymfm::opm_key_code_to_phase_step */
  private opmKeyCodeToPhaseStep(blockFreq: number, delta: number): number {
    let block = bitfield(blockFreq, 10, 3);
    // the keycode maps 12 values over 16 per octave; remove the gaps
    const adjustedCode = bitfield(blockFreq, 6, 4) - bitfield(blockFreq, 8, 2);
    let effFreq = ((adjustedCode << 6) | bitfield(blockFreq, 0, 6)) + delta;
    if (effFreq >= 768 || effFreq < 0) {
      if (effFreq < 0) {
        effFreq += 768;
        if (block-- === 0) return plan.phaseStepTable[0]! >> 7;
      } else {
        effFreq -= 768;
        if (effFreq >= 768) {
          block++;
          effFreq -= 768;
        }
        if (block++ >= 7) return plan.phaseStepTable[767]!;
      }
    }
    return plan.phaseStepTable[effFreq]! >> (block ^ 7);
  }

  /** opm_registers::clock_noise_and_lfo */
  private clockNoiseAndLfo(): number {
    const freq = this.field('noise_frequency');
    for (let rep = 0; rep < 2; rep++) {
      // the LFSR clocks continually and is sampled at the noise frequency
      this.noiseLfsr = ((this.noiseLfsr << 1) |
        (bitfield(this.noiseLfsr, 17) ^ bitfield(this.noiseLfsr, 14) ^ 1)) >>> 0;
      if (this.noiseCounter++ >= freq) {
        this.noiseCounter = 0;
        this.noiseState = bitfield(this.noiseLfsr, 17);
      }
    }
    // the rate is a 4.4 floating-point step value with implied leading 1
    const rate = this.field('lfo_rate');
    this.lfoCounter = (this.lfoCounter +
      ((0x10 | bitfield(rate, 0, 4)) << bitfield(rate, 4, 4))) >>> 0;
    if (this.field('lfo_reset')) this.lfoCounter = 0;
    const lfo = bitfield(this.lfoCounter, 22, 8);

    // fill the noise waveform entry one ahead of the current position
    const lfoNoise = bitfield(this.noiseLfsr, 17, 8);
    this.lfoWaveform[3]![(lfo + 1) & 0xff] = int16(lfoNoise | (lfoNoise << 8));

    const ampm = this.lfoWaveform[this.field('lfo_waveform')]![lfo]!;
    this.lfoAm = ((ampm & 0xff) * this.field('lfo_am_depth')) >> 7;
    return ((ampm >> 8) * this.field('lfo_pm_depth')) >> 7;
  }

  /** opm_registers::lfo_am_offset */
  private lfoAmOffset(chnum: number): number {
    const sensitivity = this.field('ch_lfo_am_sens', chnum);
    if (sensitivity === 0) return 0;
    return this.lfoAm << (sensitivity - 1);
  }

  /** fm_operator::prepare */
  private prepareOperator(opnum: number): boolean {
    this.cacheOperatorData(this.operatorChannel[opnum]!, opnum);
    this.clockKeystate(opnum, this.keyonLive[opnum] !== 0 ? 1 : 0);
    return this.envState[opnum] !== plan.egRelease ||
      this.envAttenuation[opnum]! < plan.egQuiet;
  }

  private clockKeystate(opnum: number, keystate: number): void {
    if ((keystate ^ this.keyState[opnum]!) === 0) return;
    this.keyState[opnum] = keystate;
    if (keystate !== 0) {
      if (this.envState[opnum] !== plan.egAttack) {
        this.envState[opnum] = plan.egAttack;
        this.phase[opnum] = 0;
        if (this.egRate(opnum, plan.egAttack) >= 62) this.envAttenuation[opnum] = 0;
      }
    } else if (this.envState[opnum]! < plan.egRelease) {
      this.envState[opnum] = plan.egRelease;
    }
  }

  /** fm_operator::clock_envelope */
  private clockEnvelope(opnum: number, counter: number): void {
    if (this.envState[opnum] === plan.egAttack && this.envAttenuation[opnum] === 0) {
      this.envState[opnum] = plan.egDecay;
    }
    if (
      this.envState[opnum] === plan.egDecay &&
      this.envAttenuation[opnum]! >= this.cacheEgSustain[opnum]!
    ) {
      this.envState[opnum] = plan.egSustain;
    }
    const rate = this.egRate(opnum, this.envState[opnum]!);
    const rateShift = rate >>> 2;
    const envCounter = (counter << rateShift) >>> 0;
    if (bitfield(envCounter, 0, 11) !== 0) return;
    const relevantBits = bitfield(envCounter, rateShift <= 11 ? 11 : rateShift, 3);
    const increment = this.attenuationIncrement(rate, relevantBits);
    if (this.envState[opnum] === plan.egAttack) {
      if (rate < 62) {
        this.envAttenuation[opnum] =
          this.envAttenuation[opnum]! + ((~this.envAttenuation[opnum]! * increment) >> 4);
      }
      return;
    }
    this.envAttenuation[opnum] = this.envAttenuation[opnum]! + increment;
    if (this.envAttenuation[opnum]! >= 0x400) this.envAttenuation[opnum] = 0x3ff;
  }

  /** fm_operator::clock (OPM has no SSG-EG) */
  private clockOperator(opnum: number, lfoRawPm: number): void {
    if (bitfield(this.envCounter, 0, 2) === 0) {
      this.clockEnvelope(opnum, this.envCounter >>> 2);
    }
    const step = this.cachePhaseDynamic[opnum] === PHASE_STEP_DYNAMIC
      ? this.computePhaseStep(this.operatorChannel[opnum]!, opnum, lfoRawPm)
      : this.cachePhaseStep[opnum]!;
    this.phase[opnum] = (this.phase[opnum]! + step) >>> 0;
  }

  /** fm_operator::envelope_attenuation (OPM has no eg_shift) */
  private envelopeAttenuation(opnum: number, amOffset: number): number {
    let result = this.envAttenuation[opnum]!;
    if (this.field('op_lfo_am_enable', opnum)) result += amOffset;
    result += this.cacheTotalLevel[opnum]!;
    return Math.min(result, 0x3ff);
  }

  /** fm_operator::compute_volume */
  private computeVolume(opnum: number, phase: number, amOffset: number): number {
    if (this.envAttenuation[opnum]! > plan.egQuiet) return 0;
    const sinAttenuation = this.waveform[phase & (plan.waveformLength - 1)]!;
    const envAttenuation = this.envelopeAttenuation(opnum, amOffset) << 2;
    const result = this.attenuationToVolume((sinAttenuation & 0x7fff) + envAttenuation);
    return bitfield(sinAttenuation, 15) ? -result : result;
  }

  /** fm_operator::compute_noise_volume */
  private computeNoiseVolume(opnum: number, amOffset: number): number {
    const result = (this.envelopeAttenuation(opnum, amOffset) ^ 0x3ff) << 1;
    return bitfield(this.noiseState, 0) ? -result : result;
  }

  /** fm_channel::output_4op with OPM noise on channel 7's carrier. */
  private outputChannel(chnum: number, output: Int32Array, rshift: number, clipmax: number): void {
    const ops = plan.operatorMap[chnum]!;
    const amOffset = this.lfoAmOffset(chnum);

    let opmod = 0;
    const feedback = this.field('ch_feedback', chnum);
    if (feedback !== 0) {
      opmod = (this.feedback0[chnum]! + this.feedback1[chnum]!) >> (10 - feedback);
    }
    const op1value = this.computeVolume(ops[0]!, (this.phase[ops[0]!]! >>> 10) + opmod, amOffset);
    this.feedbackIn[chnum] = op1value;

    if (this.field('ch_output_0', chnum) === 0 && this.field('ch_output_1', chnum) === 0) return;

    const algorithmOps = plan.algorithmOps[this.field('ch_algorithm', chnum)]!;
    const opout = [0, op1value, 0, 0, 0, 0, 0, 0];

    opmod = opout[bitfield(algorithmOps, 0, 1)]! >> 1;
    opout[2] = this.computeVolume(ops[1]!, (this.phase[ops[1]!]! >>> 10) + opmod, amOffset);
    opout[5] = int16(opout[1]! + opout[2]!);

    opmod = opout[bitfield(algorithmOps, 1, 3)]! >> 1;
    opout[3] = this.computeVolume(ops[2]!, (this.phase[ops[2]!]! >>> 10) + opmod, amOffset);
    opout[6] = int16(opout[1]! + opout[3]!);
    opout[7] = int16(opout[2]! + opout[3]!);

    let result: number;
    if (this.field('noise_enable') && chnum === 7) {
      result = this.computeNoiseVolume(ops[3]!, amOffset);
    } else {
      opmod = opout[bitfield(algorithmOps, 4, 3)]! >> 1;
      result = this.computeVolume(ops[3]!, (this.phase[ops[3]!]! >>> 10) + opmod, amOffset);
    }
    result >>= rshift;

    const clipmin = -clipmax - 1;
    for (let index = 1; index <= 3; index++) {
      if (bitfield(algorithmOps, 6 + index, 1)) {
        result = clamp(result + (opout[index]! >> rshift), clipmin, clipmax);
      }
    }
    result = clamp(result, clipmin, clipmax);

    // fm_channel::add_to_output through the ch_output panning bits
    if (this.field('ch_output_0', chnum)) output[0] = output[0]! + result;
    if (this.field('ch_output_1', chnum)) output[1] = output[1]! + result;
  }

  /** ym2151::generate for one chip sample: [left, right]. */
  generate(output: Int32Array): void {
    if (this.modifiedChannels !== 0 || this.prepareCount++ >= 4096) {
      this.activeChannels = 0;
      for (let chnum = 0; chnum < plan.channels; chnum++) {
        let active = 0;
        for (const opnum of plan.operatorMap[chnum]!) {
          if (this.prepareOperator(opnum)) active = 1;
        }
        if (active) this.activeChannels |= 1 << chnum;
      }
      this.modifiedChannels = 0;
      this.prepareCount = 0;
    }
    // fm_engine_base::clock: the envelope clock divider wraps the low bits.
    if (plan.egClockDivider === 1) this.envCounter += 4;
    else if (bitfield(++this.envCounter, 0, 2) === plan.egClockDivider) {
      this.envCounter += 4 - plan.egClockDivider;
    }
    const lfoRawPm = this.clockNoiseAndLfo();
    this.lfoRawPm = lfoRawPm;
    for (let chnum = 0; chnum < plan.channels; chnum++) {
      this.feedback0[chnum] = this.feedback1[chnum]!;
      this.feedback1[chnum] = this.feedbackIn[chnum]!;
      for (const opnum of plan.operatorMap[chnum]!) this.clockOperator(opnum, lfoRawPm);
    }
    output[0] = 0;
    output[1] = 0;
    for (let chnum = 0; chnum < plan.channels; chnum++) {
      if (bitfield(this.activeChannels, chnum)) {
        // OPM is full 14-bit with no intermediate clipping
        this.outputChannel(chnum, output, 0, 32767);
      }
    }
    // YM2151 uses an external YM3012 DAC: round trip through 10.3 float
    output[0] = roundtripFp(clamp(output[0]!, -32768, 32767));
    output[1] = roundtripFp(clamp(output[1]!, -32768, 32767));
  }
}

/** MAME's okim6295: 4-voice Dialogic ADPCM fed from the sample ROM. */
const OKI_INDEX_SHIFT = [-1, -1, -1, -1, 2, 4, 6, 8] as const;
const OKI_VOLUME = [0x20, 0x16, 0x10, 0x0b, 8, 6, 4, 3, 2, 0, 0, 0, 0, 0, 0, 0]
  .map(value => value / 0x20);

class OkiVoice {
  playing = false; base = 0; nibble = 0; count = 0; signal = 0; step = 0; volume = 0;
  start(base: number, count: number, volume: number): void {
    this.playing = true; this.base = base; this.nibble = 0; this.count = count;
    this.signal = 0; this.step = 0; this.volume = volume;
  }
  clock(rom: Uint8Array): number {
    if (!this.playing) return 0;
    const raw = rom[(this.base + (this.nibble >>> 1)) & 0x3ffff] ?? 0;
    const code = (raw >>> ((this.nibble & 1) ? 0 : 4)) & 15;
    const stepValue = Math.floor(16 * Math.pow(1.1, this.step));
    const magnitude = stepValue / 8 + ((code & 1) ? stepValue / 4 : 0) +
      ((code & 2) ? stepValue / 2 : 0) + ((code & 4) ? stepValue : 0);
    this.signal = Math.max(-2048, Math.min(2047,
      this.signal + ((code & 8) ? -Math.floor(magnitude) : Math.floor(magnitude))));
    this.step = Math.max(0, Math.min(48, this.step + OKI_INDEX_SHIFT[code & 7]!));
    if (++this.nibble >= this.count) this.playing = false;
    return this.signal / 2048 * this.volume;
  }
}

class OkiCore {
  private readonly voices = Array.from({ length: 4 }, () => new OkiVoice());
  private command = -1;
  private phase = 0;
  private held = 0;
  private readonly rom: Uint8Array;
  private readonly clockHz: number;
  private readonly outputRate: number;
  private pin7: boolean;
  constructor(rom: Uint8Array, clockHz: number, outputRate: number, pin7: boolean) {
    this.rom = rom; this.clockHz = clockHz; this.outputRate = outputRate; this.pin7 = pin7;
  }
  write(data: number): void {
    data &= 0xff;
    if (this.command >= 0) {
      let mask = data >>> 4;
      for (let voice = 0; voice < 4; voice++, mask >>>= 1) {
        if (!(mask & 1) || this.voices[voice]!.playing) continue;
        const table = this.command * 8;
        const start = (((this.rom[table] ?? 0) << 16) |
          ((this.rom[table + 1] ?? 0) << 8) | (this.rom[table + 2] ?? 0)) & 0x3ffff;
        const stop = (((this.rom[table + 3] ?? 0) << 16) |
          ((this.rom[table + 4] ?? 0) << 8) | (this.rom[table + 5] ?? 0)) & 0x3ffff;
        if (start < stop) this.voices[voice]!.start(
          start, 2 * (stop - start + 1), OKI_VOLUME[data & 15] ?? 0,
        );
      }
      this.command = -1;
    } else if (data & 0x80) this.command = data & 0x7f;
    else {
      let mask = data >>> 3;
      for (let voice = 0; voice < 4; voice++, mask >>>= 1) {
        if (mask & 1) this.voices[voice]!.playing = false;
      }
    }
  }
  setPin7(value: number): void { this.pin7 = Boolean(value); }
  sample(): number {
    this.phase += this.clockHz / (this.pin7 ? 132 : 165) / this.outputRate;
    while (this.phase >= 1) {
      this.phase--;
      this.held = this.voices.reduce((sum, voice) => sum + voice.clock(this.rom), 0) / 4;
    }
    return this.held;
  }
}

export class GeneratedMsm5205Core {
  private data = 0;
  private resetLine = false;
  private bitwidth = 4;
  private modeValue = 4;
  private signal = 0;
  private step = 0;

  constructor(initialMode?: string) {
    if (!msmPlan) throw new Error('MSM5205 plan was not emitted');
    const mode = initialMode ? msmPlan.modes[initialMode] : undefined;
    if (mode !== undefined) this.playmode(mode);
  }

  write(method: string, data: number): void {
    if (method === 'data_w') {
      this.data = this.bitwidth === 4 ? data & 0x0f : (data & 0x07) << 1;
    } else if (method === 'reset_w') {
      this.resetLine = data !== 0;
    } else if (method === 'playmode_w') {
      this.playmode(data);
    } else if (method === 's1_w') {
      this.playmode((this.modeValue & ~1) | (data ? 1 : 0));
    } else if (method === 's2_w') {
      this.playmode((this.modeValue & ~2) | (data ? 2 : 0));
    } else if ((method === 'vck' || method === 'vclk_w') && data) {
      this.clock();
    }
  }

  sample(): number {
    if (!msmPlan) return 0;
    const mask = msmPlan.dacBits >= 12 ? 0 : (1 << (12 - msmPlan.dacBits)) - 1;
    return (this.signal & ~mask) * msmPlan.sampleScale;
  }

  private playmode(data: number): void {
    this.modeValue = data & 7;
    this.bitwidth = data & 4 ? 4 : 3;
  }

  private clock(): void {
    if (!msmPlan) return;
    if (this.resetLine) {
      this.signal = 0;
      this.step = 0;
      return;
    }
    const value = this.data & 15;
    this.signal = Math.max(
      msmPlan.minimumSignal,
      Math.min(
        msmPlan.maximumSignal,
        this.signal + msmPlan.diffLookup[this.step * 16 + value]!,
      ),
    );
    this.step = Math.max(
      0,
      Math.min(msmPlan.maximumStep, this.step + msmPlan.indexShift[value & 7]!),
    );
  }
}

/**
 * Hosts the machine's YM2151 bank, resampling each chip's native ymfm rate to
 * the host output rate and mixing the driver's add_route gains.
 */
export class GeneratedYm2151Mixer {
  private readonly chips: GeneratedYm2151Chip[];
  private readonly oki?: { tag: string; gain: number; core: OkiCore };
  private readonly msmChips: {
    deviceTag: string;
    gain: number;
    core: GeneratedMsm5205Core;
  }[];
  private readonly msmWrites = new Map<string, {
    core: GeneratedMsm5205Core;
    method: string;
  }>();
  private readonly routes: GeneratedYmRoute[];
  private readonly chipRate: number;
  private readonly outputRate: number;
  private readonly scratch = new Int32Array(2);
  private readonly held: Int32Array[];
  private phase = 0;
  private lastSample = 0;

  constructor(
    clock: number,
    chips: number,
    outputRate: number,
    sampleRom?: Uint8Array,
    auxiliaryDevices: readonly GeneratedAuxiliaryAudioDevice[] = [],
    routes?: GeneratedYmRoute[],
  ) {
    this.chips = Array.from(
      { length: Math.max(1, chips) },
      () => new GeneratedYm2151Chip(),
    );
    const oki = auxiliaryDevices.find(device => device.type === 'OKIM6295');
    if (oki) this.oki = {
      tag: oki.deviceTag,
      gain: oki.gain,
      core: new OkiCore(
        sampleRom ?? new Uint8Array(), oki.clock, outputRate, oki.initialMode !== 'PIN7_LOW',
      ),
    };
    const msmDevices = auxiliaryDevices.filter(device => device.type === 'MSM5205');
    this.msmChips = msmPlan ? msmDevices.map(device => ({
      deviceTag: device.deviceTag,
      gain: device.gain,
      core: new GeneratedMsm5205Core(device.initialMode),
    })) : [];
    for (const device of this.msmChips) {
      const definition = msmDevices.find(candidate => candidate.deviceTag === device.deviceTag);
      for (const method of new Set([...(definition?.writeMethods ?? []), 'vck', 'vclk_w'])) {
        this.msmWrites.set(device.deviceTag + '.' + method, { core: device.core, method });
      }
    }
    this.chipRate = clock / plan.sampleRateDivider;
    this.outputRate = outputRate;
    this.held = this.chips.map(() => new Int32Array(2));
    this.routes = routes?.length
      ? routes
      : this.chips.flatMap((_chip, chip) =>
          [0, 1].map(channel => ({ chip, channel, gain: 1, target: 'mono' })));
  }

  /** Register writes arrive as chip * 2 + port; auxiliaries route by method. */
  write(offset: number, data: number, method?: string): void {
    const msm = this.msmWrites.get(method ?? '');
    if (msm) {
      msm.core.write(msm.method, data);
      return;
    }
    if (this.oki && method?.startsWith(this.oki.tag + '.')) {
      if (method.endsWith('.set_pin7')) this.oki.core.setPin7(data);
      else this.oki.core.write(data);
      return;
    }
    const chip = Math.floor(offset / 2);
    if (method === 'reset') {
      this.chips[chip]?.reset();
      return;
    }
    this.chips[chip]?.write(offset & 1, data);
  }

  /**
   * One host sample. The chip runs above the browser output rate (55.9 kHz at
   * the stock 3.579545 MHz clock); every chip sample generated for this output
   * sample is averaged rather than point sampled to avoid aliasing.
   */
  sample(): number {
    this.phase += this.chipRate / this.outputRate;
    let steps = Math.floor(this.phase);
    this.phase -= steps;
    // Never let a long pause collapse into an unbounded catch-up burst.
    if (steps > 64) steps = 64;
    let accumulated = 0;
    for (let step = 0; step < steps; step++) {
      for (let chip = 0; chip < this.chips.length; chip++) {
        this.chips[chip]!.generate(this.scratch);
        this.held[chip]!.set(this.scratch);
      }
      accumulated += this.routedTotal();
    }
    this.lastSample = steps > 0 ? accumulated / steps : this.lastSample;
    let output = this.lastSample / 32768;
    output += (this.oki?.core.sample() ?? 0) * (this.oki?.gain ?? 0);
    for (const device of this.msmChips) output += device.core.sample() * device.gain;
    return Math.max(-1, Math.min(1, output));
  }

  private routedTotal(): number {
    let total = 0;
    for (const route of this.routes) {
      const chip = this.held[route.chip];
      if (!chip) continue;
      total += (chip[route.channel] ?? 0) * route.gain;
    }
    return total;
  }
}

export class GeneratedYm2151FrameRenderer {
  private sampleCarry = 0;
  private readonly mixer: GeneratedYm2151Mixer;
  private readonly outputRate: number;
  private readonly refresh: number;
  private writes: readonly GeneratedYm2151Write[] = [];
  private writeIndex = 0;
  private count = 0;
  private cursor = 0;
  private active = false;

  constructor(mixer: GeneratedYm2151Mixer, outputRate: number, refresh: number) {
    this.mixer = mixer;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  begin(writes: readonly GeneratedYm2151Write[]): number {
    this.finish();
    this.sampleCarry += this.outputRate / this.refresh;
    this.count = Math.floor(this.sampleCarry);
    this.sampleCarry -= this.count;
    this.writes = writes;
    this.writeIndex = 0;
    this.cursor = 0;
    this.active = true;
    return this.count;
  }

  nextSample(): number | undefined {
    if (!this.active) return undefined;
    if (this.cursor >= this.count) {
      this.finish();
      return undefined;
    }
    while (this.writeIndex < this.writes.length) {
      const write = this.writes[this.writeIndex]!;
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * this.count);
      if (at > this.cursor) break;
      this.mixer.write(write.offset, write.data, write.method);
      this.writeIndex++;
    }
    this.cursor++;
    return this.mixer.sample();
  }

  render(writes: readonly GeneratedYm2151Write[]): Float32Array {
    const output = new Float32Array(this.begin(writes));
    for (let index = 0; index < output.length; index++) {
      output[index] = this.nextSample() ?? 0;
    }
    // Writes exactly at the end of the frame still affect the next frame.
    this.nextSample();
    return output;
  }

  private finish(): void {
    if (!this.active) return;
    while (this.writeIndex < this.writes.length) {
      const write = this.writes[this.writeIndex++]!;
      this.mixer.write(write.offset, write.data, write.method);
    }
    this.active = false;
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

class GeneratedYm2151Processor extends AudioWorkletProcessor {
  private mixer?: GeneratedYm2151Mixer;
  private renderer?: GeneratedYm2151FrameRenderer;
  private readonly frames: GeneratedYm2151Write[][] = [];
  private lastSample = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        clock?: number;
        chips?: number;
        routes?: GeneratedYmRoute[];
        auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[];
        sampleRom?: Uint8Array;
        refresh?: number;
        offset?: number;
        data?: number;
        method?: string;
        writes?: GeneratedYm2151Write[];
      };
      if (message.type === 'init') {
        this.mixer = new GeneratedYm2151Mixer(
          message.clock ?? 3_579_545,
          message.chips ?? 1,
          sampleRate,
          message.sampleRom,
          message.auxiliaryDevices,
          message.routes,
        );
        this.renderer = new GeneratedYm2151FrameRenderer(
          this.mixer,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'write') {
        this.mixer?.write(message.offset ?? 0, message.data ?? 0, message.method);
      } else if (message.type === 'batch') {
        this.frames.push(message.writes ?? []);
      }
    };
  }

  private nextSample(): number {
    while (this.renderer) {
      const sample = this.renderer.nextSample();
      if (sample !== undefined) return (this.lastSample = sample);
      const writes = this.frames.shift();
      // Starved: hold the last sample. A 0-fill is a hard step on any mix
      // with a DC offset and pops loudly.
      if (!writes) return this.lastSample;
      this.renderer.begin(writes);
    }
    return this.lastSample;
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

registerProcessor('ym2151', GeneratedYm2151Processor);
`;
}
