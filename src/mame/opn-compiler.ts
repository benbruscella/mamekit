import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { splitMameArgs } from './ast.ts';
import type { MameHardwareDefinition } from './hardware.ts';
import type { GeneratedYm3526Plan } from './opl-compiler.ts';

/**
 * Lower MAME's YM2203 (OPN) sound device.
 *
 * MAME implements the OPN family through the bundled ymfm library, so the
 * chip's behavior lives in `3rdparty/ymfm`. Everything the generated worklet
 * needs is read from that source: the die-extracted sine/power/envelope tables,
 * the algorithm routing table, the register bitfield map declared by
 * `opn_registers_base`, the SSG amplitude table, and the fidelity/prescale
 * ratios MAME's device wrapper selects. Nothing here is transcribed by hand.
 */

const YMFM_ROOT = '3rdparty/ymfm/src';
const FM_HEADER = `${YMFM_ROOT}/ymfm_fm.h`;
const FM_SOURCE = `${YMFM_ROOT}/ymfm_fm.ipp`;
const OPN_HEADER = `${YMFM_ROOT}/ymfm_opn.h`;
const OPN_SOURCE = `${YMFM_ROOT}/ymfm_opn.cpp`;
const YMFM_HEADER = `${YMFM_ROOT}/ymfm.h`;
const SSG_HEADER = `${YMFM_ROOT}/ymfm_ssg.h`;
const SSG_SOURCE = `${YMFM_ROOT}/ymfm_ssg.cpp`;
const MAME_WRAPPER = 'src/devices/sound/ymfm_mame.h';

/**
 * A register accessor declared by opn_registers_base or ssg_registers. Each
 * part reads `width` bits from register `offset + index * offsetStride`,
 * starting at bit `shift + index * shiftStride`, where `index` is the channel
 * or operator offset the accessor takes. Parts are most significant first.
 */
export interface GeneratedOpnField {
  parts: {
    offset: number;
    offsetStride: number;
    shift: number;
    shiftStride: number;
    width: number;
  }[];
}

export interface GeneratedYm2203Plan {
  schemaVersion: 1;
  type: 'YM2203';
  className: string;
  /** ymfm sample rate is the device clock divided by this. */
  sampleRateDivider: number;
  /** FM engine clocks once per this many chip samples. */
  fmSamplesPerOutput: number;
  /** SSG resampler ratio as MAME configures it: [output samples, SSG samples]. */
  ssgResample: [number, number];
  /** Runtime address-port selectors and rate ratios from ym2203::update_prescale. */
  prescale: {
    selectors: {
      address: number;
      prescale: number;
      requiresPrescale?: number;
    }[];
    ratios: Record<string, {
      fmSamplesPerOutput: number;
      ssgResample: [number, number];
    }>;
  };
  fm: {
    channels: number;
    operators: number;
    registers: number;
    modeRegister: number;
    defaultPrescale: number;
    waveformLength: number;
    egClockDivider: number;
    egQuiet: number;
    egAttack: number;
    egDecay: number;
    egSustain: number;
    egRelease: number;
    /** Bit-per-keycode lookup for the YM2608 manual's lowest keycode bit. */
    keycodeMagic: number;
    /** Operator index per channel, in ymfm's carrier/modulator order. */
    operatorMap: number[][];
    /** channel_offset()/operator_offset() results for OPN's fixed layout. */
    channelOffsets: number[];
    operatorOffsets: number[];
    algorithmOps: number[];
    sinTable: number[];
    powerTable: number[];
    incrementTable: number[];
    detuneTable: number[][];
    fields: Record<string, GeneratedOpnField>;
  };
  ssg: {
    channels: number;
    registers: number;
    amplitudes: number[];
    /** LFSR feedback taps from ssg_engine::clock. */
    noiseTaps: [number, number];
    noiseFeedbackShift: number;
    envelopeShapeRegister: number;
    fields: Record<string, GeneratedOpnField>;
  };
  sourceFiles: string[];
  source: { file: string; line: number };
}

/** OPN register accessors the generated engine consumes. */
const FM_FIELDS = [
  'multi_freq',
  'multi_block_freq',
  'ch_block_freq',
  'ch_feedback',
  'ch_algorithm',
  'op_detune',
  'op_multiple',
  'op_total_level',
  'op_ksr',
  'op_attack_rate',
  'op_decay_rate',
  'op_sustain_rate',
  'op_sustain_level',
  'op_release_rate',
  'op_ssg_eg_enable',
  'op_ssg_eg_mode',
] as const;

const SSG_FIELDS = [
  'noise_period',
  'envelope_period',
  'envelope_continue',
  'envelope_attack',
  'envelope_alternate',
  'envelope_hold',
  'ch_noise_enable_n',
  'ch_tone_enable_n',
  'ch_tone_period',
  'ch_envelope_enable',
  'ch_amplitude',
] as const;

export function compileYm2203(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedYm2203Plan {
  const read = (file: string): string => readFileSync(join(mameSrc, file), 'utf8');
  const fmHeader = read(FM_HEADER);
  const fmSource = read(FM_SOURCE);
  const opnHeader = read(OPN_HEADER);
  const opnSource = read(OPN_SOURCE);
  const ssgHeader = read(SSG_HEADER);
  const ssgSource = read(SSG_SOURCE);
  const wrapper = read(MAME_WRAPPER);
  const ymfmHeader = read(YMFM_HEADER);

  const fidelity = /#define\s+SSG_FIDELITY\s*\(\s*ymfm::(\w+)\s*\)/.exec(wrapper)?.[1];
  if (!fidelity) throw new Error('YM2203: MAME does not declare SSG_FIDELITY');
  const sampleRateDivider = fidelitySampleRateDivider(opnHeader, fidelity);
  const defaultPrescale = constant(opnHeader, 'DEFAULT_PRESCALE');
  const { fmSamplesPerOutput, ssgResample } =
    prescaleRatios(opnSource, fidelity, defaultPrescale);
  const selectors = prescaleSelectors(opnSource);
  const prescaleValues = [...new Set([
    defaultPrescale,
    ...selectors.map(selector => selector.prescale),
  ])];
  const ratios = Object.fromEntries(
    prescaleValues.map(prescale => [
      String(prescale),
      prescaleRatios(opnSource, fidelity, prescale),
    ]),
  );

  const fields = Object.fromEntries(
    FM_FIELDS.map(name => [name, registerField(opnHeader, name)]),
  );
  const ssgFields = Object.fromEntries(
    SSG_FIELDS.map(name => [name, registerField(ssgHeader, name)]),
  );

  const egStates = enumeratorValues(ymfmHeader, 'envelope_state');
  const channels = 3;
  const operators = channels * 4;
  const plan: GeneratedYm2203Plan = {
    schemaVersion: 1,
    type: 'YM2203',
    className: definition.className,
    sampleRateDivider,
    fmSamplesPerOutput,
    ssgResample,
    prescale: { selectors, ratios },
    fm: {
      channels,
      operators,
      registers: 0x100,
      modeRegister: constant(opnHeader, 'REG_MODE'),
      defaultPrescale,
      waveformLength: constant(fmHeader, 'WAVEFORM_LENGTH'),
      egClockDivider: constant(opnHeader, 'EG_CLOCK_DIVIDER'),
      egQuiet: constant(fmHeader, 'EG_QUIET'),
      egAttack: requireState(egStates, 'EG_ATTACK'),
      egDecay: requireState(egStates, 'EG_DECAY'),
      egSustain: requireState(egStates, 'EG_SUSTAIN'),
      egRelease: requireState(egStates, 'EG_RELEASE'),
      keycodeMagic: keycodeMagic(opnSource),
      operatorMap: operatorMap(opnSource, channels),
      // OPN's channel/operator register offsets are constexpr formulas rather
      // than tables; evaluate the IsOpnA == false branch MAME's typedef selects.
      channelOffsets: Array.from({ length: channels }, (_unused, chnum) => chnum),
      operatorOffsets: Array.from(
        { length: operators },
        (_unused, opnum) => opnum + Math.floor(opnum / 3),
      ),
      algorithmOps: algorithmOps(fmSource),
      sinTable: numericTable(fmSource, 's_sin_table'),
      powerTable: powerTable(fmSource),
      incrementTable: numericTable(fmSource, 's_increment_table'),
      detuneTable: nestedNumericTable(fmSource, 's_detune_adjustment'),
      fields,
    },
    ssg: {
      channels: constant(ssgHeader, 'OUTPUTS'),
      registers: constant(ssgHeader, 'REGISTERS'),
      amplitudes: numericTable(ssgSource, 's_amplitudes'),
      ...noiseShift(ssgSource),
      envelopeShapeRegister: envelopeShapeRegister(ssgSource),
      fields: ssgFields,
    },
    sourceFiles: [
      definition.sourceFile,
      MAME_WRAPPER,
      YMFM_HEADER,
      FM_HEADER,
      FM_SOURCE,
      OPN_HEADER,
      OPN_SOURCE,
      SSG_HEADER,
      SSG_SOURCE,
    ],
    source: {
      file: OPN_SOURCE,
      line: lineOf(opnSource, opnSource.indexOf('void ym2203::generate')),
    },
  };
  validate(plan);
  return plan;
}

function validate(plan: GeneratedYm2203Plan): void {
  const problems: string[] = [];
  if (plan.fm.sinTable.length !== 256) problems.push('sine table');
  if (plan.fm.powerTable.length !== 256) problems.push('power table');
  if (plan.fm.incrementTable.length !== 64) problems.push('envelope increment table');
  if (plan.fm.detuneTable.length !== 32) problems.push('detune table');
  if (plan.fm.algorithmOps.length < 8) problems.push('algorithm table');
  if (plan.fm.operatorMap.length !== plan.fm.channels) problems.push('operator map');
  if (plan.ssg.amplitudes.length !== 32) problems.push('SSG amplitude table');
  if (!plan.fm.waveformLength || !plan.fm.egQuiet) problems.push('FM constants');
  if (problems.length) {
    throw new Error(
      `YM2203: ymfm source shape is not executable by the audio compiler (${problems.join(', ')})`,
    );
  }
}

/** `ym2203::sample_rate` maps each fidelity level to an input-clock divider. */
function fidelitySampleRateDivider(header: string, fidelity: string): number {
  const body = /uint32_t\s+sample_rate\s*\(\s*uint32_t\s+input_clock\s*\)\s*const\s*\{([\s\S]*?)\n\t\}/
    .exec(header)?.[1];
  if (!body) throw new Error('YM2203: ymfm sample_rate switch is missing');
  const cases = [...body.matchAll(
    /case\s+(\w+)\s*:\s*return\s+input_clock\s*\/\s*(\d+)/g,
  )];
  const match = cases.find(entry => entry[1] === fidelity);
  if (!match) throw new Error(`YM2203: ymfm sample_rate has no case for ${fidelity}`);
  return Number(match[2]);
}

/**
 * `ym2203::update_prescale` selects the FM/SSG rate ratios per fidelity level
 * and prescale value.
 */
function prescaleRatios(
  source: string,
  fidelity: string,
  prescale: number,
): { fmSamplesPerOutput: number; ssgResample: [number, number] } {
  const body = /void\s+ym2203::update_prescale\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/.exec(source)?.[1];
  if (!body) throw new Error('YM2203: ymfm update_prescale is missing');
  // The three fidelity branches appear in MIN, MED, MAX order; the final
  // `else` carries MAX.
  const branches = body.split(/if\s*\(\s*m_fidelity\s*==\s*(\w+)\s*\)|\belse\b\s*\{/)
    .filter(Boolean);
  const levels = [...body.matchAll(/m_fidelity\s*==\s*(\w+)/g)].map(match => match[1]!);
  const blocks = body.split(/m_fidelity\s*==\s*\w+\s*\)/).slice(1);
  const order = [...levels, 'OPN_FIDELITY_MAX'];
  const index = order.indexOf(fidelity);
  if (index < 0 || !branches.length) {
    throw new Error(`YM2203: ymfm update_prescale has no branch for ${fidelity}`);
  }
  const block = blocks[index] ?? blocks.at(-1)!;
  const pattern = new RegExp(
    `case\\s+${prescale}\\s*:[^;]*m_fm_samples_per_output\\s*=\\s*(\\d+)\\s*;` +
    `[^;]*m_ssg_resampler\\.configure\\s*\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*\\)`,
  );
  const match = pattern.exec(block) ??
    new RegExp(
      `default:[^;]*case\\s+${prescale}\\s*:[^;]*m_fm_samples_per_output\\s*=\\s*(\\d+)\\s*;` +
      `[^;]*m_ssg_resampler\\.configure\\s*\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*\\)`,
    ).exec(block);
  if (!match) {
    throw new Error(`YM2203: ymfm update_prescale has no prescale ${prescale} case`);
  }
  return {
    fmSamplesPerOutput: Number(match[1]),
    ssgResample: [Number(match[2]), Number(match[3])],
  };
}

/** Address-port writes that select the YM2203's runtime clock prescaler. */
function prescaleSelectors(source: string): GeneratedYm2203Plan['prescale']['selectors'] {
  const body = /void\s+ym2203::write_address\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/.exec(source)?.[1];
  if (!body) throw new Error('YM2203: ymfm write_address is missing');
  const selectors = [...body.matchAll(
    /(?:if|else\s+if)\s*\(\s*m_address\s*==\s*(0x[\da-f]+|\d+)(?:\s*&&\s*m_fm\.clock_prescale\(\)\s*==\s*(\d+))?\s*\)\s*update_prescale\s*\(\s*(\d+)\s*\)/gi,
  )].map(match => ({
    address: Number(match[1]),
    prescale: Number(match[3]),
    ...(match[2] ? { requiresPrescale: Number(match[2]) } : {}),
  }));
  if (!selectors.length) throw new Error('YM2203: ymfm prescale selectors are missing');
  return selectors;
}

/**
 * Parse a register accessor. OPN accessors go through the `byte()`/`word()`
 * helpers, which add the caller's channel/operator offset to the register
 * index. SSG accessors index `m_regdata` directly with expressions such as
 * `0x00 + 2 * choffs` or shift by `3 + choffs`. OPN-only accessors are written
 * as `IsOpnA ? <opna> : <opn>`; the YM2203 typedef instantiates IsOpnA == false.
 */
function registerField(source: string, name: string): GeneratedOpnField {
  const declaration = new RegExp(
    `\\b${name}\\s*\\([^)]*\\)\\s*const\\s*\\{\\s*return\\s+([^;]+);`,
  ).exec(source)?.[1];
  if (!declaration) throw new Error(`YM2203: ymfm register accessor ${name} is missing`);
  const opn = /IsOpnA\s*\?[^:]*:\s*([\s\S]+)$/.exec(declaration)?.[1] ?? declaration;
  const call = /\b(byte|word)\s*\(([^)]*)\)/.exec(opn);
  if (call) {
    const args = splitMameArgs(call[2]!).map(argument => Number(argument.trim()));
    const groups = call[1] === 'word' ? [args.slice(0, 3), args.slice(3, 6)] : [args.slice(0, 3)];
    if (groups.some(group => group.length !== 3 || group.some(value => !Number.isFinite(value)))) {
      throw new Error(`YM2203: ymfm register accessor ${name} has an unexpected shape`);
    }
    // byte()/word() add extra_offset to the register index, so the caller's
    // channel or operator offset always strides the register by one.
    const strided = /\(\s*[^)]*\b(?:choffs|opoffs|num)\s*\)/.test(opn) ? 1 : 0;
    return {
      parts: groups.map(([offset, shift, width]) => ({
        offset: offset!,
        offsetStride: strided,
        shift: shift!,
        shiftStride: 0,
        width: width!,
      })),
    };
  }
  // The SSG registers address m_regdata directly rather than through helpers.
  const direct = [...opn.matchAll(
    /bitfield\s*\(\s*m_regdata\s*\[\s*([^\]]+?)\s*\]\s*,\s*([^,)]+?)\s*(?:,\s*(\d+)\s*)?\)|m_regdata\s*\[\s*([^\]]+?)\s*\]/g,
  )];
  if (!direct.length) {
    throw new Error(`YM2203: ymfm register accessor ${name} has an unexpected shape`);
  }
  const parts = direct.map(match => {
    const index = match[4] ?? match[1]!;
    const offset = indexExpression(index);
    const shift = match[4] !== undefined
      ? { base: 0, stride: 0 }
      : indexExpression(match[2]!);
    return {
      offset: offset.base,
      offsetStride: offset.stride,
      shift: shift.base,
      shiftStride: shift.stride,
      width: match[4] !== undefined ? 8 : match[3] ? Number(match[3]) : 1,
    };
  });
  // Multi-byte SSG values list the low byte first and shift the high byte up;
  // normalise to most-significant-first so every field reads the same way.
  return { parts: /<<\s*\d+/.test(opn) ? [...parts].reverse() : parts };
}

/**
 * Split a register index or bit-shift expression such as `0x08 + choffs` or
 * `0x00 + 2 * choffs` into its constant base and its per-channel stride.
 */
function indexExpression(text: string): { base: number; stride: number } {
  let base = 0;
  let stride = 0;
  for (const term of text.split('+')) {
    const trimmed = term.trim();
    if (!trimmed) continue;
    // Mask numeric literals first so a hex prefix is not read as a variable.
    if (/[A-Za-z_]/.test(trimmed.replace(/0x[\da-f]+|\d+/gi, ' '))) {
      const scale = /^(0x[\da-f]+|\d+)\s*\*/i.exec(trimmed)?.[1];
      stride += scale ? Number(scale) : 1;
      continue;
    }
    base += Number(trimmed);
  }
  return { base, stride };
}

function constant(source: string, name: string): number {
  const declaration = new RegExp(
    `static\\s+constexpr\\s+\\w+\\s+${name}\\s*=\\s*([^;]+);`,
  ).exec(source)?.[1];
  if (declaration === undefined) throw new Error(`YM2203: ymfm constant ${name} is missing`);
  const opn = /IsOpnA\s*\?[^:]*:\s*([\s\S]+)$/.exec(declaration)?.[1] ?? declaration;
  const value = Number(evaluateConstant(opn.trim()));
  if (!Number.isFinite(value)) {
    throw new Error(`YM2203: ymfm constant ${name} did not evaluate: ${declaration}`);
  }
  return value;
}

function evaluateConstant(text: string): number {
  const shift = /^\(?\s*(\w+)\s*<<\s*(\d+)/.exec(text);
  if (shift) return Number(shift[1]) << Number(shift[2]);
  return Number(text);
}

function enumeratorValues(source: string, name: string): Record<string, number> {
  const body = new RegExp(`enum\\s+${name}\\s*(?::\\s*\\w+\\s*)?\\{([^}]*)\\}`).exec(source)?.[1];
  if (!body) throw new Error(`YM2203: ymfm enum ${name} is missing`);
  const values: Record<string, number> = {};
  let next = 0;
  for (const entry of splitMameArgs(body)) {
    const match = /^\s*(\w+)\s*(?:=\s*(\S+))?/.exec(entry.replace(/\/\/[^\n]*/g, ''));
    if (!match?.[1]) continue;
    next = match[2] !== undefined ? Number(match[2]) : next;
    values[match[1]] = next;
    next++;
  }
  return values;
}

function requireState(states: Record<string, number>, name: string): number {
  const value = states[name];
  if (value === undefined) throw new Error(`YM2203: ymfm envelope state ${name} is missing`);
  return value;
}

/** `cache_operator_data` looks the low keycode bit up in a 16-bit constant. */
function keycodeMagic(source: string): number {
  const value = /keycode\s*\|=\s*bitfield\s*\(\s*(0x[\da-f]+)/i.exec(source)?.[1];
  if (!value) throw new Error('YM2203: ymfm keycode lookup constant is missing');
  return Number(value);
}

function operatorMap(source: string, channels: number): number[][] {
  const fixed = /operator_map\(operator_mapping &dest\) const\s*\{([\s\S]*?)\n\}/.exec(source)?.[1];
  const lists = [...(fixed ?? '').matchAll(/operator_list\s*\(([^)]*)\)/g)]
    .map(match => splitMameArgs(match[1]!).map(value => Number(value.trim())));
  if (lists.length < channels) {
    throw new Error('YM2203: ymfm OPN operator map is missing');
  }
  return lists.slice(0, channels);
}

/** Expand the ALGORITHM(...) macro entries of s_algorithm_ops. */
function algorithmOps(source: string): number[] {
  const macro =
    /#define\s+ALGORITHM\(op2in, op3in, op4in, op1out, op2out, op3out\)\s*\\\s*\n\s*([^\n]+)/
      .exec(source)?.[1];
  const table = /static\s+uint16_t\s+const\s+s_algorithm_ops\[[^\]]*\]\s*=\s*\{([\s\S]*?)\n\t\};/
    .exec(source)?.[1];
  if (!macro || !table) throw new Error('YM2203: ymfm algorithm table is missing');
  const shifts = [...macro.matchAll(/\((\w+)\)(?:\s*<<\s*(\d+))?/g)]
    .map(match => ({ name: match[1]!, shift: Number(match[2] ?? 0) }));
  if (shifts.length !== 6) throw new Error('YM2203: ymfm ALGORITHM macro shape changed');
  return [...table.matchAll(/ALGORITHM\s*\(([^)]*)\)/g)].map(entry => {
    const args = splitMameArgs(entry[1]!).map(value => Number(value.trim()));
    return shifts.reduce((value, { shift }, index) => value | (args[index]! << shift), 0);
  });
}

function numericTable(source: string, name: string): number[] {
  const body = new RegExp(
    `\\b${name}\\s*\\[[^\\]]*\\]\\s*=\\s*\\{([\\s\\S]*?)\\n\\s*\\};`,
  ).exec(source)?.[1];
  if (!body) throw new Error(`YM2203: ymfm table ${name} is missing`);
  return [...body.replace(/\/\/[^\n]*/g, '').matchAll(/-?(?:0x[\da-f]+|\d+)/gi)]
    .map(match => Number(match[0]));
}

function nestedNumericTable(source: string, name: string): number[][] {
  const body = new RegExp(
    `\\b${name}\\s*\\[[^;]*?\\]\\s*=\\s*\\{([\\s\\S]*?)\\n\\s*\\};`,
  ).exec(source)?.[1];
  if (!body) throw new Error(`YM2203: ymfm table ${name} is missing`);
  return [...body.replace(/\/\/[^\n]*/g, '').matchAll(/\{([^}]*)\}/g)]
    .map(row => splitMameArgs(row[1]!).map(value => Number(value.trim())));
}

/**
 * The power table is stored through an `X(a)` macro that pre-applies the
 * implied leading bit and the DAC shift; lower the macro, not its output.
 */
function powerTable(source: string): number[] {
  const macro = /#define\s+X\(a\)\s*\(\(\(a\)\s*\|\s*(0x[\da-f]+)\)\s*<<\s*(\d+)\)/i.exec(source);
  if (!macro) throw new Error('YM2203: ymfm power table macro shape changed');
  const implied = Number(macro[1]);
  const shift = Number(macro[2]);
  const body = /s_power_table\[[^\]]*\]\s*=\s*\{([\s\S]*?)\n\s*\};/.exec(source)?.[1];
  if (!body) throw new Error('YM2203: ymfm power table is missing');
  return [...body.matchAll(/X\(\s*(0x[\da-f]+)\s*\)/gi)]
    .map(match => (Number(match[1]) | implied) << shift);
}

/** `ssg_engine::clock` advances the noise LFSR from two feedback taps. */
function noiseShift(source: string): { noiseTaps: [number, number]; noiseFeedbackShift: number } {
  const match =
    /m_noise_state\s*\^=\s*\(\s*bitfield\s*\(\s*m_noise_state\s*,\s*(\d+)\s*\)\s*\^\s*bitfield\s*\(\s*m_noise_state\s*,\s*(\d+)\s*\)\s*\)\s*<<\s*(\d+)/
      .exec(source);
  if (!match) throw new Error('YM2203: ymfm SSG noise generator shape changed');
  return {
    noiseTaps: [Number(match[1]), Number(match[2])],
    noiseFeedbackShift: Number(match[3]),
  };
}

function envelopeShapeRegister(source: string): number {
  const value = /if\s*\(\s*regnum\s*==\s*(0x[\da-f]+)\s*\)\s*\n?\s*m_envelope_state\s*=\s*0/i
    .exec(source)?.[1];
  if (!value) throw new Error('YM2203: ymfm SSG envelope shape register is missing');
  return Number(value);
}

function lineOf(source: string, offset: number): number {
  return source.slice(0, Math.max(0, offset)).split('\n').length;
}

/** Route entry lowered from the driver's add_route calls. */
export interface GeneratedYmRoute {
  chip: number;
  channel: number;
  gain: number;
  target: string;
}

/**
 * Emit the generated YM2203 worklet. The engine below is a direct execution of
 * ymfm's OPN algorithm; every table, bitfield offset, ratio and constant it
 * consumes comes from `plan`, which is read out of MAME's ymfm sources.
 */
export function generatedYm2203WorkletSource(
  plan: GeneratedYm2203Plan,
  ym3526Plan?: GeneratedYm3526Plan,
): string {
  return `// GENERATED from ${plan.source.file}:${plan.source.line}; do not edit.
// The OPN FM engine, SSG engine, register bitfield map, die-extracted sine,
// power, envelope-increment and detune tables, and the fidelity/prescale
// resampling ratios are all lowered from MAME's bundled ymfm implementation.
const plan = ${JSON.stringify(plan, null, 2)};
const ym3526Plan = ${JSON.stringify(ym3526Plan ?? null, null, 2)};

export interface GeneratedYmRoute {
  chip: number;
  channel: number;
  gain: number;
  target: string;
}

export interface GeneratedYmWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

export interface GeneratedAuxiliaryAudioDevice {
  type: string;
  deviceTag: string;
  clock: number;
  gain: number;
  target: string;
}

interface Field {
  parts: {
    offset: number;
    offsetStride: number;
    shift: number;
    shiftStride: number;
    width: number;
  }[];
}

const FM_FIELDS = plan.fm.fields as unknown as Record<string, Field>;
const SSG_FIELDS = plan.ssg.fields as unknown as Record<string, Field>;

function bitfield(value: number, start: number, length = 1): number {
  return (value >>> start) & ((1 << length) - 1);
}

function clamp(value: number, minimum: number, maximum: number): number {
  return value < minimum ? minimum : value > maximum ? maximum : value;
}

function countLeadingZeros(value: number): number {
  return Math.clz32(value >>> 0);
}

/** ymfm stores intermediate operator outputs in an int16_t array. */
function int16(value: number): number {
  return (value << 16) >> 16;
}

/** ymfm::roundtrip_fp - the 10.3 floating point DAC round trip. */
function roundtripFp(value: number): number {
  if (value < -32768) return -32768;
  if (value > 32767) return 32767;
  const scan = value ^ (value >> 31);
  let exponent = 7 - countLeadingZeros((scan << 17) >>> 0);
  if (exponent < 1) exponent = 1;
  exponent -= 1;
  return value & ~((1 << exponent) - 1);
}

const FM = plan.fm;
const SSG = plan.ssg;
const EG_STATES = 4;

/** ymfm's OPN chip: an FM engine and an SSG engine behind one register port. */
export class GeneratedYm2203Chip {
  private readonly regs = new Uint8Array(FM.registers);
  private readonly ssgRegs = new Uint8Array(SSG.registers);
  private readonly waveform = new Uint16Array(FM.waveformLength);

  private address = 0;

  // FM operator state
  private readonly phase = new Uint32Array(FM.operators);
  private readonly envAttenuation = new Uint16Array(FM.operators);
  private readonly envState = new Uint8Array(FM.operators);
  private readonly ssgInverted = new Uint8Array(FM.operators);
  private readonly keyState = new Uint8Array(FM.operators);
  private readonly keyonLive = new Uint8Array(FM.operators);

  // per-operator cache filled by prepare()
  private readonly cacheBlockFreq = new Uint32Array(FM.operators);
  private readonly cacheDetune = new Int32Array(FM.operators);
  private readonly cacheMultiple = new Uint32Array(FM.operators);
  private readonly cachePhaseStep = new Uint32Array(FM.operators);
  private readonly cacheTotalLevel = new Uint32Array(FM.operators);
  private readonly cacheEgSustain = new Uint32Array(FM.operators);
  private readonly cacheEgRate = new Uint8Array(FM.operators * EG_STATES);

  // FM channel state
  private readonly feedback0 = new Int32Array(FM.channels);
  private readonly feedback1 = new Int32Array(FM.channels);
  private readonly feedbackIn = new Int32Array(FM.channels);

  private envCounter = 0;
  private prepareCount = 0;
  private modifiedChannels = (1 << FM.channels) - 1;
  private activeChannels = 0;
  private lastFm = 0;

  // SSG engine state
  private readonly toneCount = new Uint32Array(SSG.channels);
  private readonly toneState = new Uint8Array(SSG.channels);
  private envelopeCount = 0;
  private envelopeState = 0;
  private noiseCount = 0;
  private noiseState = 1;
  private readonly ssgLast = new Int32Array(SSG.channels);

  private sampleIndex = 0;
  private prescale = FM.defaultPrescale;
  private fmSamplesPerOutput = plan.fmSamplesPerOutput;
  private ssgResample = plan.ssgResample;

  /** Reverse of operator_map: ymfm interleaves operators across channels. */
  private readonly operatorChannel = new Uint8Array(FM.operators);

  constructor() {
    for (let chnum = 0; chnum < FM.channels; chnum++) {
      for (const opnum of FM.operatorMap[chnum]!) this.operatorChannel[opnum] = chnum;
    }
    // opn_registers_base builds the waveform from the die-extracted sine table.
    for (let index = 0; index < FM.waveformLength; index++) {
      this.waveform[index] = this.absSinAttenuation(index) | (bitfield(index, 9) << 15);
    }
    this.reset();
  }

  reset(): void {
    this.regs.fill(0);
    this.ssgRegs.fill(0);
    this.address = 0;
    this.phase.fill(0);
    this.envAttenuation.fill(0x3ff);
    this.envState.fill(FM.egRelease);
    this.ssgInverted.fill(0);
    this.keyState.fill(0);
    this.keyonLive.fill(0);
    this.feedback0.fill(0);
    this.feedback1.fill(0);
    this.feedbackIn.fill(0);
    this.envCounter = 0;
    this.prepareCount = 0;
    this.modifiedChannels = (1 << FM.channels) - 1;
    this.activeChannels = 0;
    this.lastFm = 0;
    this.toneCount.fill(0);
    this.toneState.fill(0);
    this.envelopeCount = 0;
    this.envelopeState = 0;
    this.noiseCount = 0;
    this.noiseState = 1;
    this.ssgLast.fill(0);
  }

  /** ym2203::write - offset 0 selects a register, offset 1 writes it. */
  write(offset: number, data: number): void {
    if ((offset & 1) === 0) {
      this.address = data & 0xff;
      const selector = plan.prescale.selectors.find(
        candidate => candidate.address === this.address &&
          (candidate.requiresPrescale === undefined ||
            candidate.requiresPrescale === this.prescale),
      );
      if (selector) this.updatePrescale(selector.prescale);
    } else {
      this.writeData(data & 0xff);
    }
  }

  /** ym2203::update_prescale: switch both FM and SSG engine clock ratios. */
  private updatePrescale(prescale: number): void {
    const ratios = (plan.prescale.ratios as unknown as Record<string, {
      fmSamplesPerOutput: number;
      ssgResample: [number, number];
    }>)[String(prescale)];
    if (!ratios) return;
    this.prescale = prescale;
    this.fmSamplesPerOutput = ratios.fmSamplesPerOutput;
    this.ssgResample = ratios.ssgResample;
  }

  private writeData(data: number): void {
    if (this.address < 0x10) {
      // 00-0F: SSG
      const regnum = this.address & 0x0f;
      this.ssgRegs[regnum] = data;
      if (regnum === SSG.envelopeShapeRegister) this.envelopeState = 0;
      return;
    }
    // 10-FF: FM
    this.writeFm(this.address, data);
  }

  /** opn_registers_base::write plus fm_engine_base::write key-on handling. */
  private writeFm(index: number, data: number): void {
    // fm_engine_base::write marks every channel modified before the register
    // store; the mode register takes the same path through engine_mode_write.
    this.modifiedChannels = (1 << FM.channels) - 1;
    if ((index & 0xf0) === 0xa0) {
      if (bitfield(index, 0, 2) === 3) return;
      const latchIndex = 0xb8 | bitfield(index, 3);
      if (bitfield(index, 2)) {
        this.regs[latchIndex] = data & 0x3f;
      } else {
        this.regs[index] = data;
        this.regs[index | 4] = this.regs[latchIndex]!;
      }
      return;
    }
    if ((index & 0xf8) === 0xb8) return;
    this.regs[index] = data;
    if (index === 0x28) {
      const channel = bitfield(data, 0, 2);
      if (channel === 3) return;
      const opmask = bitfield(data, 4, 4);
      for (let opnum = 0; opnum < 4; opnum++) {
        const op = FM.operatorMap[channel]![opnum]!;
        this.keyonLive[op] = bitfield(opmask, opnum);
      }
    }
  }

  /** Read a lowered register field for the given channel/operator offset. */
  private field(field: Field, index: number, registers: Uint8Array): number {
    let value = 0;
    for (const part of field.parts) {
      const register = registers[part.offset + part.offsetStride * index] ?? 0;
      value = (value << part.width) |
        bitfield(register, part.shift + part.shiftStride * index, part.width);
    }
    return value >>> 0;
  }

  private fm(name: string, index: number): number {
    return this.field(FM_FIELDS[name]!, index, this.regs);
  }

  private ssg(name: string, index = 0): number {
    return this.field(SSG_FIELDS[name]!, index, this.ssgRegs);
  }

  private absSinAttenuation(input: number): number {
    const index = bitfield(input, 8) ? ~input : input;
    return FM.sinTable[index & 0xff]!;
  }

  private attenuationToVolume(input: number): number {
    return FM.powerTable[input & 0xff]! >>> (input >>> 8);
  }

  private attenuationIncrement(rate: number, index: number): number {
    return bitfield(FM.incrementTable[rate]!, 4 * index, 4);
  }

  private detuneAdjustment(detune: number, keycode: number): number {
    const result = FM.detuneTable[keycode]![detune & 3]!;
    return bitfield(detune, 2) ? -result : result;
  }

  /** fm_registers_base::effective_rate */
  private effectiveRate(rawRate: number, ksr: number): number {
    return rawRate === 0 ? 0 : Math.min(rawRate + ksr, 63);
  }

  /** opn_registers_base::cache_operator_data */
  private cacheOperatorData(chnum: number, opnum: number): void {
    const choffs = FM.channelOffsets[chnum]!;
    const opoffs = FM.operatorOffsets[opnum]!;
    let blockFreq = this.fm('ch_block_freq', choffs);
    // Channel 2 uses the per-operator frequencies in multi-frequency mode.
    if (this.fm('multi_freq', 0) !== 0 && choffs === 2) {
      if (opoffs === 2) blockFreq = this.fm('multi_block_freq', 1);
      else if (opoffs === 10) blockFreq = this.fm('multi_block_freq', 2);
      else if (opoffs === 6) blockFreq = this.fm('multi_block_freq', 0);
    }
    this.cacheBlockFreq[opnum] = blockFreq;

    let keycode = bitfield(blockFreq, 10, 4) << 1;
    keycode |= bitfield(FM.keycodeMagic, bitfield(blockFreq, 7, 4));

    this.cacheDetune[opnum] = this.detuneAdjustment(this.fm('op_detune', opoffs), keycode);
    const multiple = this.fm('op_multiple', opoffs) * 2;
    this.cacheMultiple[opnum] = multiple === 0 ? 1 : multiple;
    this.cachePhaseStep[opnum] = this.computePhaseStep(opnum);
    this.cacheTotalLevel[opnum] = this.fm('op_total_level', opoffs) << 3;

    let sustain = this.fm('op_sustain_level', opoffs);
    sustain |= (sustain + 1) & 0x10;
    this.cacheEgSustain[opnum] = sustain << 5;

    const ksrval = keycode >>> (this.fm('op_ksr', opoffs) ^ 3);
    const base = opnum * EG_STATES;
    this.cacheEgRate[base + FM.egAttack - 1] =
      this.effectiveRate(this.fm('op_attack_rate', opoffs) * 2, ksrval);
    this.cacheEgRate[base + FM.egDecay - 1] =
      this.effectiveRate(this.fm('op_decay_rate', opoffs) * 2, ksrval);
    this.cacheEgRate[base + FM.egSustain - 1] =
      this.effectiveRate(this.fm('op_sustain_rate', opoffs) * 2, ksrval);
    this.cacheEgRate[base + FM.egRelease - 1] =
      this.effectiveRate(this.fm('op_release_rate', opoffs) * 4 + 2, ksrval);
  }

  private egRate(opnum: number, state: number): number {
    return this.cacheEgRate[opnum * EG_STATES + state - 1] ?? 0;
  }

  /** opn_registers_base::compute_phase_step (OPN has no LFO). */
  private computePhaseStep(opnum: number): number {
    const blockFreq = this.cacheBlockFreq[opnum]!;
    const fnum = bitfield(blockFreq, 0, 11) << 1;
    const block = bitfield(blockFreq, 11, 3);
    let phaseStep = (fnum << block) >>> 2;
    phaseStep += this.cacheDetune[opnum]!;
    phaseStep &= 0x1ffff;
    return (phaseStep * this.cacheMultiple[opnum]!) >>> 1;
  }

  /** fm_operator::prepare */
  private prepareOperator(opnum: number): boolean {
    this.cacheOperatorData(this.operatorChannel[opnum]!, opnum);
    this.clockKeystate(opnum, this.keyonLive[opnum] !== 0 ? 1 : 0);
    return this.envState[opnum] !== FM.egRelease ||
      this.envAttenuation[opnum]! < FM.egQuiet;
  }

  private clockKeystate(opnum: number, keystate: number): void {
    if ((keystate ^ this.keyState[opnum]!) === 0) return;
    this.keyState[opnum] = keystate;
    if (keystate !== 0) this.startAttack(opnum, false);
    else this.startRelease(opnum);
  }

  private startAttack(opnum: number, isRestart: boolean): void {
    if (this.envState[opnum] === FM.egAttack) return;
    this.envState[opnum] = FM.egAttack;
    if (!isRestart) {
      const opoffs = FM.operatorOffsets[opnum]!;
      this.ssgInverted[opnum] =
        this.fm('op_ssg_eg_enable', opoffs) & bitfield(this.fm('op_ssg_eg_mode', opoffs), 2);
      this.phase[opnum] = 0;
    }
    if (this.egRate(opnum, FM.egAttack) >= 62) this.envAttenuation[opnum] = 0;
  }

  private startRelease(opnum: number): void {
    if (this.envState[opnum]! >= FM.egRelease) return;
    this.envState[opnum] = FM.egRelease;
    if (this.ssgInverted[opnum]) {
      this.envAttenuation[opnum] = (0x200 - this.envAttenuation[opnum]!) & 0x3ff;
      this.ssgInverted[opnum] = 0;
    }
  }

  /** fm_operator::clock_ssg_eg_state */
  private clockSsgEgState(opnum: number): void {
    if (!bitfield(this.envAttenuation[opnum]!, 9)) return;
    const mode = this.fm('op_ssg_eg_mode', FM.operatorOffsets[opnum]!);
    if (bitfield(mode, 0)) {
      this.ssgInverted[opnum] = bitfield(mode, 2) ^ bitfield(mode, 1);
      if (this.envState[opnum] !== FM.egAttack) {
        this.envAttenuation[opnum] = this.ssgInverted[opnum] ? 0x200 : 0x3ff;
      }
    } else {
      this.ssgInverted[opnum] ^= bitfield(mode, 1);
      if (this.envState[opnum] === FM.egDecay || this.envState[opnum] === FM.egSustain) {
        this.startAttack(opnum, true);
      }
      if (bitfield(mode, 1) === 0) this.phase[opnum] = 0;
    }
    if (this.envState[opnum] === FM.egRelease) this.envAttenuation[opnum] = 0x3ff;
  }

  /** fm_operator::clock_envelope */
  private clockEnvelope(opnum: number, counter: number): void {
    if (this.envState[opnum] === FM.egAttack && this.envAttenuation[opnum] === 0) {
      this.envState[opnum] = FM.egDecay;
    }
    if (
      this.envState[opnum] === FM.egDecay &&
      this.envAttenuation[opnum]! >= this.cacheEgSustain[opnum]!
    ) {
      this.envState[opnum] = FM.egSustain;
    }
    const rate = this.egRate(opnum, this.envState[opnum]!);
    const rateShift = rate >>> 2;
    const envCounter = counter << rateShift;
    if (bitfield(envCounter, 0, 11) !== 0) return;
    const relevantBits = bitfield(envCounter, rateShift <= 11 ? 11 : rateShift, 3);
    const increment = this.attenuationIncrement(rate, relevantBits);
    if (this.envState[opnum] === FM.egAttack) {
      if (rate < 62) {
        this.envAttenuation[opnum] =
          this.envAttenuation[opnum]! + ((~this.envAttenuation[opnum]! * increment) >> 4);
      }
      return;
    }
    if (!this.fm('op_ssg_eg_enable', FM.operatorOffsets[opnum]!)) {
      this.envAttenuation[opnum] = this.envAttenuation[opnum]! + increment;
    } else if (this.envAttenuation[opnum]! < 0x200) {
      this.envAttenuation[opnum] = this.envAttenuation[opnum]! + 4 * increment;
    }
    if (this.envAttenuation[opnum]! >= 0x400) this.envAttenuation[opnum] = 0x3ff;
  }

  /** fm_operator::clock */
  private clockOperator(opnum: number): void {
    if (this.fm('op_ssg_eg_enable', FM.operatorOffsets[opnum]!)) this.clockSsgEgState(opnum);
    else this.ssgInverted[opnum] = 0;
    if (bitfield(this.envCounter, 0, 2) === 0) this.clockEnvelope(opnum, this.envCounter >>> 2);
    this.phase[opnum] = (this.phase[opnum]! + this.cachePhaseStep[opnum]!) >>> 0;
  }

  /** fm_operator::envelope_attenuation (OPN leaves eg_shift at zero). */
  private envelopeAttenuation(opnum: number): number {
    let result = this.envAttenuation[opnum]!;
    if (this.ssgInverted[opnum]) result = (0x200 - result) & 0x3ff;
    result += this.cacheTotalLevel[opnum]!;
    return Math.min(result, 0x3ff);
  }

  /** fm_operator::compute_volume */
  private computeVolume(opnum: number, phase: number): number {
    if (this.envAttenuation[opnum]! > FM.egQuiet) return 0;
    const sinAttenuation = this.waveform[phase & (FM.waveformLength - 1)]!;
    const envAttenuation = this.envelopeAttenuation(opnum) << 2;
    const result = this.attenuationToVolume((sinAttenuation & 0x7fff) + envAttenuation);
    return bitfield(sinAttenuation, 15) ? -result : result;
  }

  /**
   * fm_channel::output_4op - every OPN channel is four-operator, so all eight
   * algorithms route through the lowered s_algorithm_ops table.
   */
  private outputChannel(chnum: number, rshift: number, clipmax: number): number {
    const choffs = FM.channelOffsets[chnum]!;
    const ops = FM.operatorMap[chnum]!;
    let opmod = 0;
    const feedback = this.fm('ch_feedback', choffs);
    if (feedback !== 0) {
      opmod = (this.feedback0[chnum]! + this.feedback1[chnum]!) >> (10 - feedback);
    }
    const op1value = this.computeVolume(ops[0]!, (this.phase[ops[0]!]! >>> 10) + opmod);
    this.feedbackIn[chnum] = op1value;

    const algorithmOps = FM.algorithmOps[this.fm('ch_algorithm', choffs)]!;
    const opout = [0, op1value, 0, 0, 0, 0, 0, 0];

    opmod = opout[bitfield(algorithmOps, 0, 1)]! >> 1;
    opout[2] = this.computeVolume(ops[1]!, (this.phase[ops[1]!]! >>> 10) + opmod);
    opout[5] = int16(opout[1]! + opout[2]!);

    opmod = opout[bitfield(algorithmOps, 1, 3)]! >> 1;
    opout[3] = this.computeVolume(ops[2]!, (this.phase[ops[2]!]! >>> 10) + opmod);
    opout[6] = int16(opout[1]! + opout[3]!);
    opout[7] = int16(opout[2]! + opout[3]!);

    opmod = opout[bitfield(algorithmOps, 4, 3)]! >> 1;
    let result = this.computeVolume(ops[3]!, (this.phase[ops[3]!]! >>> 10) + opmod);
    result >>= rshift;

    const clipmin = -clipmax - 1;
    for (let index = 1; index <= 3; index++) {
      if (bitfield(algorithmOps, 6 + index, 1)) {
        result = clamp(result + (opout[index]! >> rshift), clipmin, clipmax);
      }
    }
    return clamp(result, clipmin, clipmax);
  }

  /** ym2203::clock_fm */
  private clockFm(): void {
    if (this.modifiedChannels !== 0 || this.prepareCount++ >= 4096) {
      this.activeChannels = 0;
      for (let chnum = 0; chnum < FM.channels; chnum++) {
        let active = 0;
        for (const opnum of FM.operatorMap[chnum]!) {
          if (this.prepareOperator(opnum)) active = 1;
        }
        if (active) this.activeChannels |= 1 << chnum;
      }
      this.modifiedChannels = 0;
      this.prepareCount = 0;
    }
    // OPN's envelope clock divider wraps the low two bits of the counter.
    if (FM.egClockDivider === 1) this.envCounter += 4;
    else if (bitfield(++this.envCounter, 0, 2) === FM.egClockDivider) {
      this.envCounter += 4 - FM.egClockDivider;
    }
    for (let chnum = 0; chnum < FM.channels; chnum++) {
      this.feedback0[chnum] = this.feedback1[chnum]!;
      this.feedback1[chnum] = this.feedbackIn[chnum]!;
      for (const opnum of FM.operatorMap[chnum]!) this.clockOperator(opnum);
    }
    let sum = 0;
    for (let chnum = 0; chnum < FM.channels; chnum++) {
      if (bitfield(this.activeChannels, chnum)) sum += this.outputChannel(chnum, 0, 32767);
    }
    // OPN is full 14-bit with no intermediate clipping, then a DAC round trip.
    this.lastFm = roundtripFp(clamp(sum, -32768, 32767));
  }

  /** ssg_engine::clock */
  private clockSsg(): void {
    for (let chan = 0; chan < SSG.channels; chan++) {
      this.toneCount[chan] = this.toneCount[chan]! + 1;
      if (this.toneCount[chan]! >= this.ssg('ch_tone_period', chan)) {
        this.toneState[chan] ^= 1;
        this.toneCount[chan] = 0;
      }
    }
    this.noiseCount++;
    if ((this.noiseCount >>> 1) >= this.ssg('noise_period') && this.noiseCount !== 1) {
      const feedback = bitfield(this.noiseState, SSG.noiseTaps[0]) ^
        bitfield(this.noiseState, SSG.noiseTaps[1]);
      this.noiseState = (this.noiseState ^ (feedback << SSG.noiseFeedbackShift)) >>> 1;
      this.noiseCount = 0;
    }
    this.envelopeCount++;
    if (this.envelopeCount >= this.ssg('envelope_period')) {
      this.envelopeState++;
      this.envelopeCount = 0;
    }
  }

  /** ssg_engine::output */
  private outputSsg(): void {
    let envelopeVolume: number;
    const hold = this.ssg('envelope_hold');
    const alternate = this.ssg('envelope_alternate');
    const attackBit = this.ssg('envelope_attack');
    const cont = this.ssg('envelope_continue');
    if ((hold | (cont ^ 1)) && this.envelopeState >= 32) {
      this.envelopeState = 32;
      envelopeVolume = ((attackBit ^ alternate) & cont) ? 31 : 0;
    } else {
      let attack = attackBit;
      if (alternate) attack ^= bitfield(this.envelopeState, 5);
      envelopeVolume = (this.envelopeState & 31) ^ (attack ? 0 : 31);
    }
    for (let chan = 0; chan < SSG.channels; chan++) {
      const noiseOn = this.ssg('ch_noise_enable_n', chan) | (this.noiseState & 1);
      const toneOn = this.ssg('ch_tone_enable_n', chan) | this.toneState[chan]!;
      let volume: number;
      if ((noiseOn & toneOn) === 0) volume = 0;
      else if (this.ssg('ch_envelope_enable', chan)) volume = envelopeVolume;
      else {
        volume = this.ssg('ch_amplitude', chan) * 2;
        if (volume !== 0) volume |= 1;
      }
      this.ssgLast[chan] = SSG.amplitudes[volume]!;
    }
  }

  /**
   * ym2203::generate for one chip sample. Returns the four MAME stream
   * outputs, which ymfm_ssg_device_base rotates to [SSG0, SSG1, SSG2, FM].
   */
  generate(output: Int32Array): void {
    if (this.sampleIndex % this.fmSamplesPerOutput === 0) this.clockFm();
    const fm = this.lastFm;

    const [outSamples, srcSamples] = this.ssgResample;
    const sums = [0, 0, 0];
    if (outSamples === 4 && srcSamples === 3) {
      const step = bitfield(this.sampleIndex, 0, 2);
      for (let chan = 0; chan < SSG.channels; chan++) sums[chan] += this.ssgLast[chan]! * step;
      if (step !== 3) {
        this.clockSsg();
        this.outputSsg();
        for (let chan = 0; chan < SSG.channels; chan++) {
          sums[chan] += this.ssgLast[chan]! * (3 - step);
        }
      }
      for (let chan = 0; chan < SSG.channels; chan++) sums[chan] = (sums[chan]! / 3) | 0;
    } else if (srcSamples === 1) {
      if (this.sampleIndex % outSamples === 0) {
        this.clockSsg();
        this.outputSsg();
      }
      for (let chan = 0; chan < SSG.channels; chan++) sums[chan] = this.ssgLast[chan]!;
    } else {
      for (let rep = 0; rep < srcSamples; rep++) {
        this.clockSsg();
        this.outputSsg();
        for (let chan = 0; chan < SSG.channels; chan++) sums[chan] += this.ssgLast[chan]!;
      }
      for (let chan = 0; chan < SSG.channels; chan++) {
        sums[chan] = (sums[chan]! / srcSamples) | 0;
      }
    }
    this.sampleIndex++;

    output[0] = sums[0]!;
    output[1] = sums[1]!;
    output[2] = sums[2]!;
    output[3] = fm;
  }
}

/**
 * YM3526 execution core hosted beside the OPN chips. Its topology, register
 * size, operator offsets, multiplier table and native rate are emitted from
 * ymfm. The envelope and phase accumulators run at the browser output rate,
 * while preserving the chip's register-visible two-operator algorithms.
 */
export class GeneratedYm3526Chip {
  private readonly regs: Uint8Array;
  private readonly waveform = new Uint16Array(FM.waveformLength);
  private readonly phase: Uint32Array;
  private readonly envAttenuation: Uint16Array;
  private readonly envelopeState: Uint8Array;
  private readonly keyState: Uint8Array;
  private readonly feedback1: Float64Array;
  private readonly feedback2: Float64Array;
  private readonly feedbackIn: Float64Array;
  private readonly clock: number;
  private readonly outputRate: number;
  private address = 0;
  private envCounter = 0;
  private samplePhase = 0;
  private lastSample = 0;

  constructor(clock: number, outputRate: number) {
    const opl = ym3526Plan;
    if (!opl) throw new Error('YM3526 plan was not emitted');
    this.regs = new Uint8Array(opl.registers);
    this.phase = new Uint32Array(opl.operators);
    this.envAttenuation = new Uint16Array(opl.operators);
    this.envelopeState = new Uint8Array(opl.operators);
    this.keyState = new Uint8Array(opl.operators);
    this.feedback1 = new Float64Array(opl.channels);
    this.feedback2 = new Float64Array(opl.channels);
    this.feedbackIn = new Float64Array(opl.channels);
    this.clock = clock;
    this.outputRate = outputRate;
    // Revision 1 has one waveform. Build it from the same die-extracted table
    // and logarithmic DAC representation used by ymfm's OPN implementation.
    for (let index = 0; index < FM.waveformLength; index++) {
      this.waveform[index] =
        FM.sinTable[(bitfield(index, 8) ? ~index : index) & 0xff]! |
        (bitfield(index, 9) << 15);
    }
    this.reset();
  }

  reset(): void {
    this.regs.fill(0);
    this.phase.fill(0);
    this.envAttenuation.fill(0x3ff);
    this.envelopeState.fill(0);
    this.envelopeState.fill(FM.egRelease);
    this.keyState.fill(0);
    this.feedback1.fill(0);
    this.feedback2.fill(0);
    this.feedbackIn.fill(0);
    this.address = 0;
    this.envCounter = 0;
    this.samplePhase = 0;
    this.lastSample = 0;
  }

  write(port: number, data: number): void {
    if ((port & 1) === 0) this.address = data & 0xff;
    else this.regs[this.address] = data & 0xff;
  }

  sample(): number {
    const opl = ym3526Plan!;
    // YM3526 emits one native sample per prescale*operators input clocks.
    // Clock at that rate and hold between native samples; driving its envelope
    // directly at AudioContext rate changes every decay/release time.
    this.samplePhase += this.clock / opl.sampleRateDivider / this.outputRate;
    while (this.samplePhase >= 1) {
      this.lastSample = this.clockChip();
      this.samplePhase--;
    }
    return this.lastSample;
  }

  private clockChip(): number {
    const opl = ym3526Plan!;
    let total = 0;
    this.envCounter = (this.envCounter + 4) >>> 0;
    for (let channel = 0; channel < opl.channels; channel++) {
      const [modulator, carrier] = opl.operatorMap[channel]!;
      const keyRegister = this.regs[0xb0 + channel]!;
      const keyOn = (keyRegister & 0x20) !== 0;
      this.updateKey(modulator, keyOn);
      this.updateKey(carrier, keyOn);

      const blockFreq = ((keyRegister & 0x1f) << 8) | this.regs[0xa0 + channel]!;
      this.clockEnvelope(modulator, blockFreq);
      this.clockEnvelope(carrier, blockFreq);
      this.clockPhase(modulator, blockFreq);
      this.clockPhase(carrier, blockFreq);

      // ymfm clocks the two feedback samples before producing this sample.
      this.feedback2[channel] = this.feedback1[channel]!;
      this.feedback1[channel] = this.feedbackIn[channel]!;
      const algorithm = this.regs[0xc0 + channel]!;
      const feedback = (algorithm >>> 1) & 7;
      const feedbackInput = feedback === 0
        ? 0
        : (this.feedback1[channel]! + this.feedback2[channel]!) /
          Math.pow(2, 10 - feedback);
      const mod = this.operatorSample(modulator, feedbackInput);
      this.feedbackIn[channel] = mod;

      // Revision 1 uses the previous modulator sample for carrier modulation
      // and shifts each channel by one before summing to its external DAC.
      const carrierInput = (algorithm & 1) !== 0 ? 0 : this.feedback1[channel]! / 2;
      let voice = this.operatorSample(carrier, carrierInput) / 2;
      if ((algorithm & 1) !== 0) {
        voice = clamp(voice + this.feedback1[channel]! / 2, -32768, 32767);
      }
      total += voice;
    }
    // YM3014 mantissa/exponent truncation, matching ym3526::generate.
    return roundtripFp(total) / 32768;
  }

  private updateKey(operator: number, on: boolean): void {
    if (on && this.keyState[operator] === 0) {
      this.keyState[operator] = 1;
      this.envelopeState[operator] = FM.egAttack;
      this.phase[operator] = 0;
      if (this.envelopeRate(operator, FM.egAttack) >= 62) {
        this.envAttenuation[operator] = 0;
      }
    } else if (!on && this.keyState[operator] !== 0) {
      this.keyState[operator] = 0;
      this.envelopeState[operator] = FM.egRelease;
    }
  }

  private envelopeRate(operator: number, state: number, blockFreq = 0): number {
    const opl = ym3526Plan!;
    const offset = opl.operatorOffsets[operator]!;
    const characteristics = this.regs[0x20 + offset]!;
    const rates = this.regs[0x60 + offset]!;
    const sustainRelease = this.regs[0x80 + offset]!;
    const block = bitfield(blockFreq, 10, 3);
    const keycode = (block << 1) |
      bitfield(blockFreq, 9 - bitfield(this.regs[0x08]!, 6), 1);
    const ksr = keycode >>> (2 * (bitfield(characteristics, 4) ^ 1));
    const raw = state === FM.egAttack
      ? bitfield(rates, 4, 4) * 4
      : state === FM.egDecay
        ? bitfield(rates, 0, 4) * 4
        : state === FM.egSustain && bitfield(characteristics, 5)
          ? 0
          : bitfield(sustainRelease, 0, 4) * 4;
    return raw === 0 ? 0 : Math.min(raw + ksr, 63);
  }

  private clockEnvelope(operator: number, blockFreq: number): void {
    const opl = ym3526Plan!;
    const offset = opl.operatorOffsets[operator]!;
    const state = this.envelopeState[operator]!;
    if (state === FM.egAttack && this.envAttenuation[operator] === 0) {
      this.envelopeState[operator] = FM.egDecay;
    }
    const sustainRelease = this.regs[0x80 + offset]!;
    let sustain = bitfield(sustainRelease, 4, 4);
    sustain |= (sustain + 1) & 0x10;
    if (
      this.envelopeState[operator] === FM.egDecay &&
      this.envAttenuation[operator]! >= sustain << 5
    ) {
      this.envelopeState[operator] = FM.egSustain;
    }

    const current = this.envelopeState[operator]!;
    const rate = this.envelopeRate(operator, current, blockFreq);
    const rateShift = rate >>> 2;
    const shiftedCounter = (this.envCounter >>> 2) * Math.pow(2, rateShift);
    if ((shiftedCounter & 0x7ff) !== 0) return;
    const relevantShift = rateShift <= 11 ? 11 : rateShift;
    const relevantBits = Math.floor(shiftedCounter / Math.pow(2, relevantShift)) & 7;
    const packed = FM.incrementTable[rate]!;
    const increment = (packed >>> (4 * relevantBits)) & 0x0f;
    if (current === FM.egAttack) {
      if (rate < 62) {
        this.envAttenuation[operator] +=
          (~this.envAttenuation[operator]! * increment) >> 4;
      }
    } else {
      this.envAttenuation[operator] += increment;
      if (this.envAttenuation[operator]! >= 0x400) {
        this.envAttenuation[operator] = 0x3ff;
      }
    }
  }

  private clockPhase(operator: number, blockFreq: number): void {
    const opl = ym3526Plan!;
    const offset = opl.operatorOffsets[operator]!;
    const multiple = opl.multiples[this.regs[0x20 + offset]! & 0x0f]! * 2;
    const fnum = (blockFreq & 0x3ff) << 2;
    const block = bitfield(blockFreq, 10, 3);
    const step = (((fnum << block) >>> 2) * multiple) >>> 1;
    this.phase[operator] = (this.phase[operator]! + step) >>> 0;
  }

  private operatorSample(operator: number, modulation: number): number {
    const opl = ym3526Plan!;
    const offset = opl.operatorOffsets[operator]!;
    if (this.envAttenuation[operator]! > FM.egQuiet) return 0;
    const waveformIndex = ((this.phase[operator]! >>> 10) + Math.trunc(modulation)) &
      (opl.waveformLength - 1);
    const sinAttenuation = this.waveform[waveformIndex]!;
    const level = this.regs[0x40 + offset]!;
    let totalLevel = (level & 0x3f) << 3;
    const kslBits = level >>> 6;
    const ksl = ((kslBits >>> 1) | ((kslBits & 1) << 1));
    if (ksl !== 0) {
      const channel = opl.operatorMap.findIndex(pair => pair.includes(operator));
      const keyRegister = this.regs[0xb0 + channel]!;
      const blockFreq = ((keyRegister & 0x1f) << 8) | this.regs[0xa0 + channel]!;
      const table = [0, 24, 32, 37, 40, 43, 45, 47, 48, 50, 51, 52, 53, 54, 55, 56];
      const attenuation = Math.max(
        0,
        table[bitfield(blockFreq, 6, 4)]! - 8 * (bitfield(blockFreq, 10, 3) ^ 7),
      );
      totalLevel += attenuation << ksl;
    }
    const env = Math.min(this.envAttenuation[operator]! + totalLevel, 0x3ff) << 2;
    const attenuation = (sinAttenuation & 0x7fff) + env;
    const linear = FM.powerTable[attenuation & 0xff]! >>> (attenuation >>> 8);
    return bitfield(sinAttenuation, 15) ? -linear : linear;
  }
}

/**
 * Hosts the machine's YM2203 bank, resampling each chip's native ymfm rate to
 * the host output rate and mixing the driver's add_route gains.
 */
export class GeneratedYm2203Mixer {
  private readonly chips: GeneratedYm2203Chip[];
  private readonly oplChips: GeneratedYm3526Chip[];
  private readonly oplGains: number[];
  private readonly routes: GeneratedYmRoute[];
  private readonly chipRate: number;
  private readonly outputRate: number;
  private readonly scratch = new Int32Array(4);
  private readonly held: Int32Array[];
  private phase = 0;
  private lastSample = 0;

  constructor(
    clock: number,
    chips: number,
    outputRate: number,
    routes?: GeneratedYmRoute[],
    auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[],
  ) {
    this.chips = Array.from({ length: Math.max(1, chips) }, () => new GeneratedYm2203Chip());
    const oplDevices = (auxiliaryDevices ?? []).filter(device => device.type === 'YM3526');
    this.oplChips = oplDevices.map(device =>
      new GeneratedYm3526Chip(device.clock, outputRate));
    this.oplGains = oplDevices.map(device => device.gain);
    this.chipRate = clock / plan.sampleRateDivider;
    this.outputRate = outputRate;
    this.held = this.chips.map(() => new Int32Array(4));
    this.routes = routes?.length
      ? routes
      : this.chips.flatMap((_chip, chip) =>
          [0, 1, 2, 3].map(channel => ({ chip, channel, gain: 1, target: 'mono' })));
  }

  /** Register writes arrive as chip * 2 + port, matching the generated board. */
  write(offset: number, data: number, method?: string): void {
    const primaryPorts = this.chips.length * 2;
    if (offset >= primaryPorts) {
      const opl = Math.floor((offset - primaryPorts) / 2);
      if (method === 'reset') this.oplChips[opl]?.reset();
      else this.oplChips[opl]?.write((offset - primaryPorts) & 1, data);
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
   * One host sample. The chip runs far above the browser output rate, so every
   * chip sample generated for this output sample is averaged rather than point
   * sampled; decimating by picking one sample would alias the SSG, which clocks
   * at nearly twice the output rate.
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
    for (let chip = 0; chip < this.oplChips.length; chip++) {
      output += this.oplChips[chip]!.sample() * this.oplGains[chip]!;
    }
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

export class GeneratedYm2203FrameRenderer {
  private sampleCarry = 0;
  private readonly mixer: GeneratedYm2203Mixer;
  private readonly outputRate: number;
  private readonly refresh: number;

  constructor(mixer: GeneratedYm2203Mixer, outputRate: number, refresh: number) {
    this.mixer = mixer;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedYmWrite[]): Float32Array {
    this.sampleCarry += this.outputRate / this.refresh;
    const count = Math.floor(this.sampleCarry);
    this.sampleCarry -= count;
    const output = new Float32Array(count);
    let sampleIndex = 0;
    for (const write of writes) {
      const writeSample = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
      while (sampleIndex < writeSample) output[sampleIndex++] = this.mixer.sample();
      this.mixer.write(write.offset, write.data, write.method);
    }
    while (sampleIndex < count) output[sampleIndex++] = this.mixer.sample();
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

class GeneratedYm2203Processor extends AudioWorkletProcessor {
  private mixer?: GeneratedYm2203Mixer;
  private renderer?: GeneratedYm2203FrameRenderer;
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
        routes?: GeneratedYmRoute[];
        auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[];
        refresh?: number;
        offset?: number;
        data?: number;
        method?: string;
        writes?: GeneratedYmWrite[];
      };
      if (message.type === 'init') {
        this.mixer = new GeneratedYm2203Mixer(
          message.clock ?? 1_500_000,
          message.chips ?? 1,
          sampleRate,
          message.routes,
          message.auxiliaryDevices,
        );
        this.renderer = new GeneratedYm2203FrameRenderer(
          this.mixer,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'write') {
        this.mixer?.write(message.offset ?? 0, message.data ?? 0, message.method);
      } else if (message.type === 'batch') {
        if (this.renderer) {
          this.frames.push(this.renderer.render(message.writes ?? []));
          while (this.frames.length > 8) this.frames.shift();
        }
      }
    };
  }

  private nextSample(): number {
    while (!this.current || this.currentIndex >= this.current.length) {
      this.current = this.frames.shift();
      this.currentIndex = 0;
      if (!this.current) return 0;
    }
    return this.current[this.currentIndex++]!;
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

registerProcessor('ym2203', GeneratedYm2203Processor);
`;
}
