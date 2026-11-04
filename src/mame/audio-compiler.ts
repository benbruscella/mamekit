import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';
import type { GeneratedHandlerProgram } from '../ir/board.ts';
import { parseMameAst, splitMameArgs, type MameFunction } from './ast.ts';
import { evalExpr } from '../kg/parse.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import { compileMameHandler } from './handler-ir.ts';
import type { MameHardwareDefinition } from './hardware.ts';
import { AY_FILTER_CONTROL_BASE, AY_FILTER_CONTROL_STRIDE } from '../ir/audio-protocol.ts';
import { DEFAULT_CONSTANTS } from '../ir/execute.ts';
import type {
  GeneratedSpeakerFilterPlan,
} from '../ir/audio-protocol.ts';

export function compileMameSpeakerFilter(
  mameSrc: string,
): GeneratedSpeakerFilterPlan {
  const cppFile = 'src/emu/audio_effects/filter.cpp';
  const headerFile = 'src/emu/audio_effects/filter.h';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const frequencyMatch =
    /m_fh\s*=\s*d\s*\?\s*d->fh\(\)\s*:\s*([0-9.]+)\s*;/.exec(cpp);
  const qMatch =
    /DEFAULT_Q\s*=\s*([0-9.]+)f?\s*;/.exec(header);
  const enabledByDefault =
    /m_highpass_active\s*=\s*d\s*\?\s*d->highpass_active\(\)\s*:\s*true\s*;/.test(cpp);
  if (!frequencyMatch || !qMatch || !enabledByDefault) {
    throw new Error('unsupported MAME default speaker filter');
  }
  return {
    type: 'highpass',
    frequency: Number(frequencyMatch[1]),
    q: Number(qMatch[1]),
    source: {
      file: cppFile,
      line: cpp.slice(0, frequencyMatch.index).split('\n').length,
    },
  };
}

export interface GeneratedNamcoWsgPlan {
  schemaVersion: 1;
  type: 'NAMCO_WSG';
  className: string;
  deviceType: string;
  voices: number;
  packed: boolean;
  registerCount: number;
  internalRate: number;
  mixResolution: number;
  writeMethod: string;
  readMethod?: string;
  writeProgram: GeneratedHandlerProgram;
  engine?: {
    region: string;
    clock: number;
    outputRate: number;
    routeGain: number;
    volumeTable: number[];
    filters: {
      type: 'bandpass' | 'highpass';
      frequency: number;
      damping: number;
      gain: number;
      outputResistance: number;
    }[];
    outputResistance: number;
  };
  sourceFiles: string[];
  source: { file: string; line: number };
}


export interface GeneratedAy8910Plan {
  schemaVersion: 1;
  type: 'AY8910';
  className: string;
  channels: number;
  registerCount: number;
  clockDivider: number;
  envelopeMask: number;
  envelopeStep: number;
  noiseTaps: [number, number];
  readMasks: number[];
  /** ay8910_mosfet_param, for AY8910_RESISTOR_OUTPUT. */
  mosfet: { vg: number; vth: number; kn: number[] };
  /** The flag bits ay8910.h defines. */
  outputFlags: Record<string, number>;
  /** The resistor network of ay8910_param that build_single_table and build_3D_table read. */
  singleOutput: {
    rDown: number;
    rUp: number;
    resistances: number[];
    zeroIsOff: boolean;
  };
  filterTypes: {
    lowpass3r: number;
    lowpass: number;
    highpass: number;
    ac: number;
  };
  sourceFiles: string[];
  source: { file: string; line: number };
}

export interface GeneratedMsm5205Plan {
  schemaVersion: 1;
  type: 'MSM5205';
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

export interface GeneratedUpd7759Plan {
  schemaVersion: 1;
  type: 'UPD7759';
  className: string;
  stepTable: number[][];
  stateTable: number[];
  sampleScale: number;
  sourceFiles: string[];
  source: { file: string; line: number };
}

/** Compile the uPD7759 ADPCM converter tables from MAME's device source. */
export function compileUpd7759(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedUpd7759Plan {
  const cppFile = definition.sourceFile;
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const step = /upd775x_step\s*\[\s*16\s*\]\s*\[\s*16\s*\]\s*=\s*\{([\s\S]*?)\n\};/.exec(cpp);
  const state = /upd775x_state_table\s*\[\s*16\s*\]\s*=\s*\{([^}]+)\}/.exec(cpp);
  const scale = /sample_scale\s*=\s*([\d.]+)\s*\/\s*([\d.]+)/.exec(cpp);
  if (!step || !state || !scale) {
    throw new Error('UPD7759: MAME source shape is not executable by the audio compiler');
  }
  const stepTable = [...step[1]!.matchAll(/\{([^}]+)\}/g)]
    .map(row => splitMameArgs(row[1]!).map(Number));
  const stateTable = splitMameArgs(state[1]!).map(Number);
  if (stepTable.length !== 16 || stepTable.some(row => row.length !== 16) ||
      stateTable.length !== 16) {
    throw new Error('UPD7759: invalid ADPCM table dimensions in MAME source');
  }
  return {
    schemaVersion: 1,
    type: 'UPD7759',
    className: definition.className,
    stepTable,
    stateTable,
    sampleScale: Number(scale[1]) / Number(scale[2]),
    sourceFiles: [cppFile],
    source: {
      file: cppFile,
      line: cpp.slice(0, step.index).split('\n').length,
    },
  };
}

/**
 * Compile the MSM5205 ADPCM tables and limits from MAME. The emitted worklet
 * consumes this data; no separately maintained decoder table lives in src.
 */
export function compileMsm5205(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedMsm5205Plan {
  const cppFile = definition.sourceFile;
  const headerFile = relative(
    mameSrc,
    join(dirname(join(mameSrc, cppFile)), `${basename(cppFile, extname(cppFile))}.h`),
  );
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const shifts = /index_shift\s*\[\s*8\s*\]\s*=\s*\{([^}]+)\}/.exec(cpp);
  const stepLoop = /for\s*\(\s*int step\s*=\s*0\s*;\s*step\s*<=\s*(\d+)/.exec(cpp);
  const stepFormula =
    /floor\s*\(\s*16\.0\s*\*\s*pow\s*\(\s*11\.0\s*\/\s*10\.0/.test(cpp);
  const signalLimits =
    /if\s*\(\s*new_signal\s*>\s*(\d+)\s*\)[\s\S]*?new_signal\s*=\s*\1[\s\S]*?new_signal\s*<\s*-(\d+)/.exec(cpp);
  const sampleScale =
    /sample_scale\s*=\s*1\.0\s*\/\s*double\s*\(\s*1\s*<<\s*(\d+)\s*\)/.exec(cpp);
  const dacBits = /MSM5205,\s*tag,\s*owner,\s*clock,\s*(\d+)\s*\)/.exec(cpp);
  if (!shifts || !stepLoop || !stepFormula || !signalLimits || !sampleScale || !dacBits) {
    throw new Error('MSM5205: MAME source shape is not executable by the audio compiler');
  }
  const indexShift = splitMameArgs(shifts[1]!).map(Number);
  const maximumStep = Number(stepLoop[1]);
  const modes = Object.fromEntries(
    [...header.matchAll(/static constexpr int\s+(\w+)\s*=\s*([^;]+);/g)]
      .map(match => [match[1]!, evalExpr(match[2]!)])
      .filter((entry): entry is [string, number] => entry[1] !== null),
  );
  const diffLookup = Array.from({ length: (maximumStep + 1) * 16 }, (_, index) => {
    const step = Math.floor(index / 16);
    const nibble = index & 15;
    const stepValue = Math.floor(16 * Math.pow(11 / 10, step));
    const magnitude =
      stepValue / 8 +
      ((nibble & 4) ? stepValue : 0) +
      ((nibble & 2) ? stepValue / 2 : 0) +
      ((nibble & 1) ? stepValue / 4 : 0);
    return Math.trunc((nibble & 8 ? -1 : 1) * magnitude);
  });
  return {
    schemaVersion: 1,
    type: 'MSM5205',
    className: definition.className,
    indexShift,
    diffLookup,
    modes,
    maximumStep,
    minimumSignal: -Number(signalLimits[2]),
    maximumSignal: Number(signalLimits[1]),
    sampleScale: 1 / (1 << Number(sampleScale[1])),
    dacBits: Number(dacBits[1]),
    sourceFiles: [cppFile, headerFile],
    source: {
      file: cppFile,
      line: cpp.slice(0, cpp.indexOf('void msm5205_device::update_adpcm')).split('\n').length,
    },
  };
}








/**
 * Evaluate a MAME analogue component expression: RES_K(150), CAP_P(470) and
 * the rest of rescap.h, in ohms and farads.
 */
export function analogValue(expression: string): number {
  let normalized = expression.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').trim()
    // C's `5.` is 5.0; evalExpr only reads a fraction with its digits.
    .replace(/(\d)\.(?![\d\w])/g, '$1');
  const units: [RegExp, number][] = [
    [/RES_K\(([^()]+)\)/g, 1e3],
    [/RES_M\(([^()]+)\)/g, 1e6],
    [/CAP_U\(([^()]+)\)/g, 1e-6],
    [/CAP_N\(([^()]+)\)/g, 1e-9],
    [/CAP_P\(([^()]+)\)/g, 1e-12],
  ];
  for (const [pattern, scale] of units) {
    // evalExpr reads C-style literals and has no exponent form, so a scale
    // that only spells out in exponent notation (nano- and picofarads) has to
    // become an exact integer divisor instead. Left as `1e-12` it stopped the
    // number parser dead and every picofarad in the source evaluated to NaN.
    const factor = String(scale).includes('e')
      ? `/${Math.round(1 / scale)}`
      : `*${scale}`;
    normalized = normalized.replace(pattern, `(($1)${factor})`);
  }
  return evalExpr(normalized) ?? Number.NaN;
}






/** The AY8910_*_OUTPUT flag bits, as ay8910.h defines them. */
function ayOutputFlagValues(header: string): Record<string, number> {
  return Object.fromEntries([...header.matchAll(/#define\s+(AY8910_\w+_OUTPUT|YM2149_PIN26_\w+)\s+\((0x[\da-f]+)\)/gi)]
    .map(match => [match[1]!, Number(match[2])]));
}

/**
 * What `set_flags` and `set_resistors_load` configure on one AY: the chip's own
 * m_flags default to AY8910_LEGACY_OUTPUT and every pin's load to 1k.
 */
export function ayChipOutput(mameSrc: string, config: readonly string[]): { flags: number; loads: number[] } {
  const values = ayOutputFlagValues(readFileSync(join(mameSrc, 'src/devices/sound/ay8910.h'), 'utf8'));
  const argumentsOf = (method: string): string | undefined => {
    const line = config.filter(candidate => new RegExp(`\\b${method}\\s*\\(`).test(candidate)).at(-1);
    return line?.slice(line.indexOf('(', line.indexOf(method)) + 1, line.lastIndexOf(')'));
  };
  const flags = argumentsOf('set_flags');
  const loads = splitMameArgs(argumentsOf('set_resistors_load') ?? '').map(arg => analogValue(arg));
  return {
    flags: flags === undefined ? values.AY8910_LEGACY_OUTPUT! : evalExpr(flags, values) ?? values.AY8910_LEGACY_OUTPUT!,
    loads: loads.length === 3 && loads.every(Number.isFinite) ? loads : [1000, 1000, 1000],
  };
}

export function compileAy8910(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedAy8910Plan {
  const cppFile = definition.sourceFile;
  const headerFile = relative(
    mameSrc,
    join(dirname(join(mameSrc, cppFile)), `${basename(cppFile, extname(cppFile))}.h`),
  );
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const filterCppFile = 'src/devices/sound/flt_rc.cpp';
  const filterHeaderFile = 'src/devices/sound/flt_rc.h';
  const filterCpp = readFileSync(join(mameSrc, filterCppFile), 'utf8');
  const filterHeader = readFileSync(join(mameSrc, filterHeaderFile), 'utf8');
  const clockDivider = Number(/stream_alloc\([^;]+master_clock\s*\/\s*(\d+)\)/.exec(cpp)?.[1]);
  const ayType =
    /if\s*\(\s*psg_type\s*==\s*PSG_TYPE_AY\s*\)\s*\{([\s\S]*?)\n\s*\}/.exec(cpp)?.[1] ?? '';
  const envelopeMask = Number(/m_env_step_mask\s*=\s*(0x[\da-f]+|\d+)/i.exec(ayType)?.[1]);
  const envelopeStep = Number(/m_step\s*=\s*(0x[\da-f]+|\d+)/i.exec(ayType)?.[1]);
  const noise = [...header.matchAll(
    /m_rng\s*=\s*\(m_rng\s*>>\s*1\)\s*\|\s*\(\(BIT\(m_rng,\s*(\d+)\)\s*\^\s*BIT\(m_rng,\s*(\d+)\)\)/g,
  )].at(-1);
  const masks = [...cpp.matchAll(
    /if\s*\(\s*chip_type\s*==\s*AY8910\s*\)[\s\S]*?mask\[0x10\]\s*=\s*\{([^}]+)\}/g,
  )][0];
  const params = [...cpp.matchAll(
    /static\s+const\s+ay8910_device::ay_ym_param\s+ay8910_param\s*=\s*\{\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*\{([^}]+)\}/g,
  )].at(-1);
  const filterType = (name: string): number =>
    Number(new RegExp(`${name}\\s*=\\s*(\\d+)`).exec(filterHeader)?.[1]);
  const filterTypes = {
    lowpass3r: filterType('LOWPASS_3R'),
    lowpass: filterType('LOWPASS'),
    highpass: filterType('HIGHPASS'),
    ac: filterType('AC'),
  };
  const filterShape =
    filterCpp.includes('memory += (stream.get(0, sampindex) - memory) * m_k') &&
    filterCpp.includes('Req = (m_R1 * (m_R2 + m_R3)) / (m_R1 + m_R2 + m_R3)') &&
    filterCpp.includes('m_k = 1.0 - exp(-1 / (Req * m_C) / m_stream->sample_rate())');
  if (
    !clockDivider || !envelopeMask || !envelopeStep || !noise || !masks || !params ||
    Object.values(filterTypes).some(value => !Number.isFinite(value)) || !filterShape
  ) {
    throw new Error('AY8910: MAME source shape is not executable by the audio compiler');
  }
  const resistances = splitMameArgs(params[4]!).map(Number);
  const rDown = Number(params[1]);
  const rUp = Number(params[2]);
  const levels = Number(params[3]);
  const mosfet = /ay8910_device::mosfet_param\s+ay8910_mosfet_param\s*=\s*\{\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*(\d+)\s*,\s*\{([^}]+)\}/.exec(cpp);
  if (!mosfet) throw new Error('AY8910: ay8910_mosfet_param is not in the shape the audio compiler reads');
  return {
    schemaVersion: 1,
    type: 'AY8910',
    className: definition.className,
    channels: 3,
    registerCount: 16,
    clockDivider,
    envelopeMask,
    envelopeStep,
    noiseTaps: [Number(noise[1]), Number(noise[2])],
    readMasks: splitMameArgs(masks[1]!).map(value => Number(value)),
    mosfet: {
      vth: Number(mosfet[1]),
      vg: Number(mosfet[2]),
      kn: splitMameArgs(mosfet[4]!).map(Number).filter(Number.isFinite).slice(0, Number(mosfet[3])),
    },
    outputFlags: ayOutputFlagValues(header),
    singleOutput: {
      rDown,
      rUp,
      resistances: resistances.slice(0, levels),
      zeroIsOff: true,
    },
    filterTypes,
    sourceFiles: [cppFile, headerFile, filterCppFile, filterHeaderFile],
    source: {
      file: cppFile,
      line: cpp.slice(0, cpp.indexOf('void ay8910_device::sound_stream_update')).split('\n').length,
    },
  };
}

export function compileNamcoWsg(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedNamcoWsgPlan {
  const cppFile = definition.sourceFile;
  const headerFile = relative(
    mameSrc,
    join(dirname(join(mameSrc, cppFile)), `${basename(cppFile, extname(cppFile))}.h`),
  );
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const ast = parseMameAst([
    { file: cppFile, source: cpp },
    { file: headerFile, source: header },
  ]);
  const inheritance = new RegExp(
    `class\\s+${definition.className}\\s*:\\s*public\\s+namco_audio_device\\s*<\\s*(\\d+)\\s*,\\s*(true|false)\\s*>`,
  ).exec(header);
  const write = ast.units
    .flatMap(unit => unit.functions)
    .find(fn => fn.className === definition.className &&
      ['pacman_sound_w', 'polepos_sound_w'].includes(fn.name));
  const read = ast.units
    .flatMap(unit => unit.functions)
    .find(fn => fn.className === definition.className && fn.name === 'polepos_sound_r');
  const start = ast.units
    .flatMap(unit => unit.functions)
    .find(fn => fn.className === definition.className && fn.name === 'device_start');
  const internalRate = Number(
    /static\s+constexpr\s+uint32_t\s+INTERNAL_RATE\s*=\s*(\d+)/.exec(cpp)?.[1],
  );
  const registerCount = Number(
    /make_unique_clear<uint8_t\[\]>\(\s*(0x[\da-f]+|\d+)\s*\)/i.exec(start?.body ?? '')?.[1],
  );
  if (!inheritance || !write || !internalRate || !registerCount) {
    throw new Error('NAMCO_WSG: MAME source shape is not executable by the audio compiler');
  }
  const voices = Number(inheritance[1]);
  const writeProgram = compileMameHandler(normalizeMameExecutionSource(write.body));
  if (writeProgram.diagnostics.length) {
    throw new Error(`NAMCO_WSG write lowering failed: ${writeProgram.diagnostics.join('; ')}`);
  }
  const engine = definition.type === 'POLEPOS_WSG'
    ? compilePoleposEngine(mameSrc)
    : undefined;
  return {
    schemaVersion: 1,
    type: 'NAMCO_WSG',
    className: definition.className,
    deviceType: definition.type,
    voices,
    packed: inheritance[2] === 'true',
    registerCount,
    internalRate,
    mixResolution: 128 * voices,
    writeMethod: write.name,
    ...(read ? { readMethod: read.name } : {}),
    writeProgram,
    ...(engine ? { engine } : {}),
    sourceFiles: [
      cppFile,
      headerFile,
      ...(engine ? ['src/mame/namco/polepos_a.cpp', 'src/mame/namco/polepos.cpp'] : []),
    ],
    source: { file: write.span.file, line: write.span.line },
  };
}

function compilePoleposEngine(
  mameSrc: string,
): NonNullable<GeneratedNamcoWsgPlan['engine']> {
  const file = 'src/mame/namco/polepos_a.cpp';
  const driverFile = 'src/mame/namco/polepos.cpp';
  const source = readFileSync(join(mameSrc, file), 'utf8');
  const driver = readFileSync(join(mameSrc, driverFile), 'utf8');
  const value = (raw: string): number => {
    const normalized = raw
      .replace(/RES_K\s*\(\s*([0-9.]+)\s*\)/g, (_, number) => String(Number(number) * 1_000))
      .replace(/CAP_U\s*\(\s*([0-9.]+)\s*\)/g, (_, number) => String(Number(number) * 1e-6))
      .replace(/Q_TO_DAMP\s*\(\s*([0-9.]+)\s*\)/g, (_, number) => String(1 / Number(number)));
    const direct = Number(normalized);
    const result = Number.isFinite(direct) ? direct : evalExpr(normalized);
    if (result === null) throw new Error(`POLEPOS_SOUND expression did not evaluate: ${raw}`);
    return result;
  };
  const constants: Record<string, number> = {};
  const definitions = [...source.matchAll(/^#define\s+(POLEPOS_R\w+)\s+(.+)$/gm)];
  for (let pass = 0; pass < definitions.length + 1; pass++) {
    for (const definition of definitions) {
      if (constants[definition[1]!] !== undefined) continue;
      let expression = definition[2]!.replace(/\/\*.*$/, '').trim();
      for (const [name, number] of Object.entries(constants)) {
        expression = expression.replace(new RegExp(`\\b${name}\\b`, 'g'), String(number));
      }
      try { constants[definition[1]!] = value(expression); } catch { /* next pass */ }
    }
  }
  const volumeBody = /static\s+const\s+double\s+volume_table\s*\[8\]\s*=\s*\{([\s\S]*?)\}/
    .exec(source)?.[1];
  if (!volumeBody) throw new Error('POLEPOS_SOUND volume table is missing');
  const volumeTable = splitMameArgs(volumeBody).map(raw => {
    let expression = raw;
    for (const [name, number] of Object.entries(constants)) {
      expression = expression.replace(new RegExp(`\\b${name}\\b`, 'g'), String(number));
    }
    return value(expression);
  });
  const outputResistances = /r_filt_out\s*\[3\]\s*=\s*\{([^}]+)\}/.exec(source)?.[1];
  if (!outputResistances) throw new Error('POLEPOS_SOUND filter output network is missing');
  const outputs = splitMameArgs(outputResistances).map(value);
  const outputResistance = 1 / outputs.reduce((sum, resistance) => sum + 1 / resistance, 0);
  const filters: NonNullable<GeneratedNamcoWsgPlan['engine']>['filters'] = [];
  for (const match of source.matchAll(
    /opamp_m_bandpass_setup\s*\(\s*this\s*,\s*([^,\n]+),\s*([^,\n]+),\s*([^,\n]+),\s*([^,\n]+),\s*([^\n]+)\);/g,
  )) {
    const [r1, r2, r3, c1, c2] = match.slice(1).map(value);
    const inputResistance = 1 / (1 / r1! + 1 / r2!);
    filters.push({
      type: 'bandpass',
      frequency: 1 / (2 * Math.PI * Math.sqrt(inputResistance * r3! * c1! * c2!)),
      damping: (c1! + c2!) / Math.sqrt(r3! / inputResistance * c1! * c2!),
      gain: r2! / (r1! + r2!) * -r3! / inputResistance * c2! / (c1! + c2!),
      outputResistance: outputs[filters.length]!,
    });
  }
  const highpass = /m_filter_engine\[2\]\.setup\s*\(\s*this\s*,\s*FILTER_HIGHPASS\s*,\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/
    .exec(source);
  if (!highpass) throw new Error('POLEPOS_SOUND high-pass filter is missing');
  filters.push({
    type: 'highpass',
    frequency: value(highpass[1]!),
    damping: value(highpass[2]!),
    gain: value(highpass[3]!),
    outputResistance: outputs[2]!,
  });
  const outputRate = Number(/#define\s+OUTPUT_RATE\s+(\d+)/.exec(source)?.[1]);
  const masterClock = evalExpr(/MASTER_CLOCK\s*=\s*([^;]+)/.exec(driver)?.[1] ?? '');
  const route = /polepos\.add_route\([^,]+,[^,]+,\s*([^,)]+)/.exec(driver)?.[1];
  if (!outputRate || !masterClock || !route || filters.length !== 3 || volumeTable.length !== 8) {
    throw new Error('POLEPOS_SOUND source topology is incomplete');
  }
  return {
    region: 'engine',
    clock: masterClock / 8,
    outputRate,
    routeGain: value(route),
    volumeTable,
    filters,
    outputResistance,
  };
}

export function generatedNamcoWsgWorkletSource(plan: GeneratedNamcoWsgPlan): string {
  return `// GENERATED from ${plan.source.file}:${plan.source.line} and ${plan.sourceFiles[1]}; do not edit.
// Register behavior is executable MAME handler IR. Mixer constants and waveform
// addressing are lowered from namco_audio_device<${plan.voices}, ${plan.packed}>.
import { executeGeneratedProgram } from '../../core/generated-handler.js';
import type { GeneratedHandlerProgram } from '../../ir/board.js';

const plan = ${JSON.stringify(plan, null, 2)} as unknown as {
  voices: number;
  packed: boolean;
  registerCount: number;
  internalRate: number;
  mixResolution: number;
  writeProgram: GeneratedHandlerProgram;
  engine?: {
    clock: number;
    outputRate: number;
    routeGain: number;
    volumeTable: number[];
    filters: {
      type: 'bandpass' | 'highpass';
      frequency: number;
      damping: number;
      gain: number;
      outputResistance: number;
    }[];
    outputResistance: number;
  };
};

interface Voice {
  frequency: number;
  counter: number;
  volume: number[];
  waveform_select: number;
}

` + generatedNamcoWsgSuffix(plan);
}

const NETLIST_SOLVER_SOURCE = readFileSync(new URL('./netlist-solver.ts', import.meta.url), 'utf8');

export function generatedAy8910WorkletSource(
  plan: GeneratedAy8910Plan,
  msm5205?: GeneratedMsm5205Plan,
): string {
  return `// GENERATED from ${plan.source.file}:${plan.source.line} and ${plan.sourceFiles[1]}; do not edit.
// Register masks, resistor DAC curve, clock divider, envelope parameters and
// LFSR taps are extracted from MAME's AY implementation. RC behavior is
// sourced from flt_rc and route/filter controls arrive from generated machine IR.
const plan = ${JSON.stringify(plan, null, 2)};
const msmPlan: GeneratedMsm5205PlanData | null = ${JSON.stringify(msm5205 ?? null, null, 2)};
const FILTER_CONTROL_BASE = ${AY_FILTER_CONTROL_BASE};
const FILTER_CONTROL_STRIDE = ${AY_FILTER_CONTROL_STRIDE};
const ALL_OUTPUTS = ${DEFAULT_CONSTANTS.ALL_OUTPUTS};

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

export interface GeneratedAyChipOutput {
  flags: number;
  loads: number[];
}

${NETLIST_SOLVER_SOURCE}

export interface GeneratedAyRoute {
  chip: number;
  channel: number;
  gain: number;
  target: string;
  targetInput?: number;
  filter?: { index: number; bank: number; channel: number };
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
  /** Each pin's table, as ay8910_device::build_mixer_table builds it for this chip's flags. */
  private readonly volumeTables: number[][];
  private readonly tiedLoad: number;
  private readonly tiedMinimum: number;
  private readonly tiedScale: number;

  constructor(clock: number, output: GeneratedAyChipOutput = { flags: plan.outputFlags.AY8910_LEGACY_OUTPUT!, loads: [1000, 1000, 1000] }) {
    this.nativeRate = clock / plan.clockDivider;
    const legacy = (output.flags & plan.outputFlags.AY8910_LEGACY_OUTPUT!) !== 0;
    const resistor = (output.flags & plan.outputFlags.AY8910_RESISTOR_OUTPUT!) !== 0;
    // build_single_table
    const single = (load: number): number[] => {
      const raw = plan.singleOutput.resistances.map((resistance, index) => {
        let total = 1 / plan.singleOutput.rDown + 1 / load + 1 / resistance;
        let high = 1 / resistance;
        if (index !== 0) {
          total += 1 / plan.singleOutput.rUp;
          high += 1 / plan.singleOutput.rUp;
        }
        return high / total;
      });
      if (!legacy) return raw;
      const minimum = Math.min(...raw);
      const maximum = Math.max(...raw);
      return raw.map(value => ((value - minimum) / (maximum - minimum) - 0.25) * 0.5);
    };
    // build_mosfet_resistor_table: the stream carries a resistance for a netlist.
    const mosfet = (rd: number): number[] => plan.mosfet.kn.map(k => {
      const vg = plan.mosfet.vg - plan.mosfet.vth;
      const kn = k / 1e6;
      const p2 = 1 / (2 * kn * rd) + vg;
      const vs = p2 - Math.sqrt(p2 * p2 - vg * vg);
      return rd * (5 / vs - 1);
    });
    this.volumeTables = Array.from({ length: plan.channels }, (_, channel) => {
      const load = output.loads[channel] ?? 1000;
      return resistor ? mosfet(load) : single(load);
    });
    // build_3D_table: a legacy tied chip spans 0 to 3 between its lowest and highest mix.
    this.tiedLoad = output.loads[0] ?? 1000;
    const low = this.tied(0, 3 / plan.singleOutput.resistances[0]!);
    const high = this.tied(3, 3 / plan.singleOutput.resistances.at(-1)!);
    this.tiedMinimum = legacy ? low : 0;
    this.tiedScale = legacy ? 3 / (high - low) : 1;
  }

  private tied(pullups: number, conductance: number): number {
    const pullup = pullups / plan.singleOutput.rUp;
    return (conductance + pullup) / (
      conductance + pullup +
      plan.channels / plan.singleOutput.rDown + 1 / this.tiedLoad
    );
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

  sampleChannels(output: number[]): void {
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
    for (let channel = 0; channel < plan.channels; channel++) {
      const toneGate = this.toneOutput[channel] | ((enable >> channel) & 1);
      const noiseGate = (this.rng & 1) | ((enable >> (channel + 3)) & 1);
      const volume = this.regs[8 + channel];
      const envelopeEnabled = (volume & 0x10) !== 0;
      const level = envelopeEnabled ? envelope : volume & 0x0f;
      const gate = toneGate & noiseGate;
      output[channel] = this.volumeTables[channel]![gate ? level : 0]!;

      // MAME's AY8910_SINGLE_OUTPUT does not average three independent
      // streams: the physical pins share one resistor load. Reproduce its
      // build_3D_table conductance equation from the source-derived values.
      const tiedLevel = gate ? level : 0;
      if (!plan.singleOutput.zeroIsOff || tiedLevel !== 0 || envelopeEnabled) pullups++;
      conductance += 1 / plan.singleOutput.resistances[tiedLevel];
    }
    this.singleOutput = (this.tied(pullups, conductance) - this.tiedMinimum) * this.tiedScale;
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
  private sampleCursor = 0;
  private sampleIntegral = 0;
  private integrating = false;

  constructor(bits = 8) {
    this.mask = (1 << bits) - 1;
    this.midpoint = 1 << (bits - 1);
    this.value = this.midpoint;
  }

  write(method: string, data: number): void {
    if (method === 'data_w' || method === 'write') this.value = data & this.mask;
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
    return (this.value - this.midpoint) / this.midpoint;
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
  private readonly auxiliary: {
    deviceTag: string;
    gain: number;
    outputGain: number;
    targetInput?: number;
    core: GeneratedMsm5205Core | GeneratedDac8Core;
  }[];
  private readonly auxiliaryWrites = new Map<string, {
    core: GeneratedMsm5205Core | GeneratedDac8Core;
    method: string;
  }>();
  private readonly timedWrites = new Set<string>();
  private readonly outputRate: number;
  private readonly deviceTags: string[];
  private muted = false;
  private netlist?: GeneratedNetlistSolver;
  /** Seconds of netlist time at the start of the next output sample. */
  private netlistTime = 0;
  /** Each chip's next native sample, in output samples from the current one's start. */
  private netlistTicks: number[] = [];
  /**
   * Streams the main thread renders beside the chips (a beeper, a cassette)
   * arrive as stream.pcm at their own rate, already weighted by their routes.
   */
  private readonly streamQueue: number[] = [];
  private streamRate = 0;
  private streamPhase = 0;
  private streamHeld = 0;

  constructor(
    clock: number,
    chips: number,
    outputRate: number,
    routes: GeneratedAyRoute[] = [],
    auxiliaryDevices: GeneratedAuxiliaryAudioDevice[] = [],
    deviceTags: string[] = [],
    chipOutputs: readonly GeneratedAyChipOutput[] = [],
    netlist?: GeneratedNetlistPlanData,
  ) {
    this.outputRate = outputRate;
    this.deviceTags = deviceTags;
    if (netlist) {
      this.netlist = new GeneratedNetlistSolver(netlist, outputRate);
    }
    const count = Math.max(1, chips);
    this.cores = Array.from({ length: count }, (_, chip) =>
      new GeneratedAy8910Core(clock, chipOutputs[chip]));
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
    this.auxiliary = auxiliaryDevices.flatMap<{
      deviceTag: string;
      gain: number;
      outputGain: number;
      targetInput?: number;
      core: GeneratedMsm5205Core | GeneratedDac8Core;
    }>(device =>
      device.type === 'MSM5205' && msmPlan
        ? [{
            deviceTag: device.deviceTag,
            gain: device.gain,
            outputGain: 1,
            ...(device.targetInput !== undefined && netlist ? { targetInput: device.targetInput } : {}),
            core: new GeneratedMsm5205Core(device.initialMode),
          }]
        : device.type === 'DAC_4BIT_R2R' || device.type === 'DAC_8BIT_R2R'
          ? [{
              deviceTag: device.deviceTag,
              gain: device.gain,
              outputGain: 1,
              core: new GeneratedDac8Core(device.type === 'DAC_4BIT_R2R' ? 4 : 8),
            }]
          : []);
    for (const device of this.auxiliary) {
      const definition = auxiliaryDevices.find(candidate =>
        candidate.deviceTag === device.deviceTag);
      const methods = new Set([
        ...(definition?.writeMethods ?? []),
        ...(device.core instanceof GeneratedMsm5205Core ? ['vck', 'vclk_w'] : []),
      ]);
      for (const method of methods) {
        const key = \`\${device.deviceTag}.\${method}\`;
        this.auxiliaryWrites.set(key, { core: device.core, method });
        if (device.core instanceof GeneratedDac8Core) this.timedWrites.add(key);
      }
    }
  }

  write(offset: number, data: number, method?: string): void {
    if (method === 'netlist.logic') {
      this.netlist?.writeLogic(offset, data, this.netlistTime);
      return;
    }
    // A main-thread stream's sample, its rate in the offset. A stalled
    // consumer must not grow the queue without bound.
    if (method === 'stream.pcm') {
      this.streamRate = offset;
      if (this.streamQueue.length < 8192) this.streamQueue.push(data);
      return;
    }
    const auxiliaryWrite = this.auxiliaryWrites.get(method ?? '');
    if (auxiliaryWrite) {
      auxiliaryWrite.core.write(auxiliaryWrite.method, data);
      return;
    }
    const gainWrite = /^(.+)\.set_output_gain$/.exec(method ?? '');
    if (gainWrite) {
      const gain = Math.max(0, Math.min(1, data / 0xff));
      const auxiliary = this.auxiliary.find(device => device.deviceTag === gainWrite[1]);
      if (auxiliary) {
        auxiliary.outputGain = gain;
        return;
      }
      const chip = this.deviceTags.indexOf(gainWrite[1]!);
      const outputs = this.outputGains[chip];
      if (outputs) {
        // MAME's ALL_OUTPUTS sets the gain of every output the chip has.
        if (offset === ALL_OUTPUTS) outputs.fill(gain);
        else outputs[Math.max(0, Math.min(2, offset))] = gain;
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
    if (this.netlist) return this.sampleNetlist();
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
        core.sampleChannels(native);
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
    if (this.streamRate > 0) {
      this.streamPhase += this.streamRate / this.outputRate;
      while (this.streamPhase >= 1) {
        this.streamPhase -= 1;
        if (this.streamQueue.length) this.streamHeld = this.streamQueue.shift()!;
      }
      mixed += this.streamHeld;
    }
    return Math.max(-1, Math.min(1, mixed));
  }

  // The netlist takes each chip's stream at the chip's own sample times, as
  // NETLIST_STREAM_INPUT's SAMPLE_RATE_INPUT_ADAPTIVE stream does: MAME never
  // resamples a resistance, so neither does this. Each native sample lands at
  // its time and the netlist is read at the output sample's.
  private sampleNetlist(): number {
    const solver = this.netlist!;
    const period = 1 / this.outputRate;
    const start = this.netlistTime;
    const ticks = this.netlistTicks;
    const cores = this.cores;
    if (ticks.length !== cores.length) {
      for (let chip = 0; chip < cores.length; chip++) ticks[chip] = this.outputRate / cores[chip]!.nativeRate;
    }
    for (const device of this.auxiliary) {
      if (device.targetInput !== undefined) solver.set(device.targetInput, device.core.sample() * device.gain * device.outputGain, start);
    }
    const native = this.nativeSamples;
    for (;;) {
      let chip = -1;
      for (let index = 0; index < cores.length; index++) {
        if (ticks[index]! <= 1 && (chip < 0 || ticks[index]! < ticks[chip]!)) chip = index;
      }
      if (chip < 0) break;
      const core = cores[chip]!;
      const at = start + ticks[chip]! * period;
      core.sampleChannels(native[chip]!);
      for (const route of this.routes) {
        if (route.chip !== chip || route.targetInput === undefined) continue;
        const value = route.channel === -1 ? core.sampleTiedOutput() : native[chip]![route.channel]!;
        solver.set(route.targetInput, value * route.gain, at);
      }
      ticks[chip]! += this.outputRate / core.nativeRate;
    }
    for (let chip = 0; chip < cores.length; chip++) ticks[chip]! -= 1;
    this.netlistTime = start + period;
    return Math.max(-1, Math.min(1, solver.read(this.netlistTime)));
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
        chipOutputs?: GeneratedAyChipOutput[];
        netlist?: GeneratedNetlistPlanData;
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
          message.deviceTags,
          message.chipOutputs,
          message.netlist,
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
`;
}

function generatedNamcoWsgSuffix(plan: GeneratedNamcoWsgPlan): string {
  return `
export interface GeneratedNamcoWsgWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}


interface PoleposBiquadState {
  b0: number;
  b1: number;
  b2: number;
  a1: number;
  a2: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  resistance: number;
}

class GeneratedPoleposEngineCore {
  private readonly rom: Uint8Array;
  private readonly sampleRate: number;
  private readonly filters: PoleposBiquadState[];
  private position = 0;
  private msb = 0;
  private lsb = 0;
  private enabled = false;

  constructor(rom: Uint8Array, sampleRate: number) {
    this.rom = rom;
    this.sampleRate = sampleRate;
    this.filters = (plan.engine?.filters ?? []).map(filter => {
      const twoOverT = 2 * sampleRate;
      const warped = sampleRate * 2 * Math.tan(Math.PI * filter.frequency / sampleRate);
      const denominator = twoOverT ** 2 + filter.damping * warped * twoOverT + warped ** 2;
      const highpass = filter.type === 'highpass';
      const b0 = (highpass ? twoOverT ** 2 : filter.damping * warped * twoOverT) /
        denominator * filter.gain;
      return {
        b0,
        b1: highpass ? -2 * b0 : 0,
        b2: highpass ? b0 : -b0,
        a1: 2 * (-(twoOverT ** 2) + warped ** 2) / denominator,
        a2: (twoOverT ** 2 - filter.damping * warped * twoOverT + warped ** 2) /
          denominator,
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0,
        resistance: filter.outputResistance,
      };
    });
  }

  write(method: string, data: number): void {
    if (method === 'polepos_engine_sound_lsb_w') {
      this.lsb = data & 62;
      this.enabled = Boolean(data & 1);
    } else if (method === 'polepos_engine_sound_msb_w') {
      this.msb = data & 63;
    } else if (method === 'clson_w' && !data) {
      this.lsb = 0;
      this.msb = 0;
      this.enabled = false;
    }
  }

  sample(): number {
    const engine = plan.engine;
    if (!engine || !this.enabled || !this.rom.length) return 0;
    const slot = (this.msb >>> 3) & 7;
    const volume = engine.volumeTable[slot] ?? 0;
    const byte = this.rom[slot * 0x800 + (Math.floor(this.position) & 0x7ff)] ?? 0;
    const input = (3.4 / 255 * byte - 2) * volume;
    const clock = engine.clock / 16 * ((this.msb + 1) * 64 + this.lsb + 1) / (64 * 64);
    this.position += clock / this.sampleRate;
    let current = 0;
    for (const filter of this.filters) {
      let output = filter.b0 * input + filter.b1 * filter.x1 + filter.b2 * filter.x2 -
        filter.a1 * filter.y1 - filter.a2 * filter.y2;
      filter.x2 = filter.x1;
      filter.x1 = input;
      filter.y2 = filter.y1;
      filter.y1 = output;
      output = Math.max(-2, Math.min(1.5, output));
      current += output / filter.resistance;
    }
    return current * engine.outputResistance / 2 * engine.routeGain;
  }
}

export class GeneratedNamcoWsgCore {
  readonly sampleRate: number;
  private readonly waveRom: Uint8Array;
  private readonly voices: Voice[];
  private readonly soundregs = new Uint8Array(plan.registerCount);
  private enabled = true;
  private readonly fracBits: number;
  private readonly engine?: GeneratedPoleposEngineCore;
  // Samples of the streams mixed beside the voices, at the rate each write
  // names: one frame's worth arrives with the frame's register writes.
  private readonly stream = { rate: 0, phase: 0, held: 0, queue: [] as number[] };

  constructor(
    waveRom: Uint8Array,
    clock: number,
    engineRom?: Uint8Array,
  ) {
    this.waveRom = waveRom;
    let nativeClock = clock;
    let clockMultiple = 0;
    while (nativeClock < plan.internalRate) {
      nativeClock *= 2;
      clockMultiple++;
    }
    this.sampleRate = nativeClock;
    this.fracBits = clockMultiple + 15;
    this.voices = Array.from({ length: plan.voices }, () => ({
      frequency: 0,
      counter: 0,
      volume: [0, 0, 0, 0],
      waveform_select: 0,
    }));
    if (plan.engine && engineRom) {
      this.engine = new GeneratedPoleposEngineCore(engineRom, this.sampleRate);
    }
  }

  soundEnable(state: number): void {
    this.enabled = state !== 0;
  }

  write(offset: number, data: number): void {
    executeGeneratedProgram(
      plan.writeProgram,
      {
        members: {
          m_soundregs: this.soundregs,
          m_channel_list: this.voices,
          m_stream: { update: () => 0 },
        },
        constants: { MAX_VOICES: plan.voices },
      },
      { offset, data },
    );
  }

  writeStream(rate: number, data: number): void {
    this.stream.rate = rate;
    // A stalled consumer must not grow the queue without bound.
    if (this.stream.queue.length < 8192) this.stream.queue.push(data);
  }

  writeEngine(method: string, data: number): void {
    this.engine?.write(method, data);
  }

  render(out: Float32Array): void {
    out.fill(0);
    if (this.enabled) for (let voiceIndex = 0; voiceIndex < this.voices.length; voiceIndex++) {
      const voice = this.voices[voiceIndex]!;
      let volume = plan.engine
        ? voice.volume.reduce((sum, value) => sum + value, 0) / 4
        : voice.volume[0] ?? 0;
      if (!volume) continue;
      const frequency = voice.frequency;
      const waveBase = voice.waveform_select << 5;
      let counter = voice.counter >>> 0;
      for (let index = 0; index < out.length; index++) {
        const position = waveBase | ((counter >>> this.fracBits) & 0x1f);
        const byte = this.waveRom[(position >>> ${plan.packed ? 1 : 0}) & 0xff] ?? 0;
        const sample = ${plan.packed
          ? '((byte >> (((~position) & 1) << 2)) & 0x0f) - 8'
          : '(byte & 0x0f) - 8'};
        out[index] += sample * volume / plan.mixResolution;
        counter = (counter + frequency) >>> 0;
      }
      voice.counter = counter;
    }
    if (this.engine) {
      for (let index = 0; index < out.length; index++) out[index] += this.engine.sample();
    }
    if (this.stream.rate) {
      const step = this.stream.rate / this.sampleRate;
      for (let index = 0; index < out.length; index++) {
        this.stream.phase += step;
        while (this.stream.phase >= 1) {
          this.stream.phase -= 1;
          if (this.stream.queue.length) this.stream.held = this.stream.queue.shift()!;
        }
        out[index] += this.stream.held;
      }
    }
  }

  renderFrame(out: Float32Array, writes: readonly GeneratedNamcoWsgWrite[]): void {
    // The stream samples are already one frame of audio, not register events.
    for (const write of writes) if (write.method === 'stream.pcm') this.writeStream(write.offset, write.data);
    let rendered = 0;
    let index = 0;
    while (index < writes.length) {
      const frac = Math.max(0, Math.min(1, writes[index]!.frac ?? 0));
      const position = Math.max(rendered, Math.min(out.length, Math.ceil(frac * out.length)));
      if (position > rendered) this.render(out.subarray(rendered, position));
      while (index < writes.length) {
        const write = writes[index]!;
        const writeFrac = Math.max(0, Math.min(1, write.frac ?? 0));
        const writePosition = Math.max(rendered, Math.min(out.length, Math.ceil(writeFrac * out.length)));
        if (writePosition !== position) break;
        if (write.method === 'stream.pcm') { /* queued above */ }
        else if (write.method?.startsWith('polepos_engine_') || write.method === 'clson_w') {
          this.writeEngine(write.method, write.data);
        }
        else if (write.offset < 0) this.soundEnable(write.data);
        else this.write(write.offset, write.data);
        index++;
      }
      rendered = position;
    }
    if (rendered < out.length) this.render(out.subarray(rendered));
  }
}

export class GeneratedNamcoWsgFrameRenderer {
  private carry = 0;
  private readonly core: GeneratedNamcoWsgCore;
  private readonly refresh: number;

  constructor(core: GeneratedNamcoWsgCore, refresh: number) {
    this.core = core;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedNamcoWsgWrite[]): Float32Array {
    this.carry += this.core.sampleRate / this.refresh;
    const count = Math.floor(this.carry);
    this.carry -= count;
    const output = new Float32Array(count);
    this.core.renderFrame(output, writes);
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

class GeneratedNamcoWsgProcessor extends AudioWorkletProcessor {
  private core: GeneratedNamcoWsgCore | null = null;
  private renderer: GeneratedNamcoWsgFrameRenderer | null = null;
  private step = 1;
  private fraction = 0;
  private sample0 = 0;
  private sample1 = 0;
  private readonly frames: Float32Array[] = [];
  private current: Float32Array | null = null;
  private nativePosition = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        waveRom?: Uint8Array;
        sampleRom?: Uint8Array;
        clock?: number;
        refresh?: number;
        offset?: number;
        data?: number;
        method?: string;
        writes?: GeneratedNamcoWsgWrite[];
      };
      if (message.type === 'init') {
        const clock = message.clock ?? 96_000;
        this.core = new GeneratedNamcoWsgCore(
          message.waveRom ?? new Uint8Array(0x100),
          clock,
          message.sampleRom,
        );
        this.renderer = new GeneratedNamcoWsgFrameRenderer(
          this.core,
          message.refresh ?? 60,
        );
        this.step = this.core.sampleRate / sampleRate;
        this.current = null;
        this.nativePosition = 0;
      } else if (message.type === 'write') {
        this.apply(message.offset ?? 0, message.data ?? 0, message.method);
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 3) this.frames.shift();
      }
    };
  }

  private apply(offset: number, data: number, method?: string): void {
    if (method === 'stream.pcm') this.core?.writeStream(offset, data);
    else if (method?.startsWith('polepos_engine_') || method === 'clson_w') {
      this.core?.writeEngine(method, data);
    }
    else if (offset < 0) this.core?.soundEnable(data);
    else this.core?.write(offset, data);
  }

  private lastSample = 0;

  private nextNative(): number {
    while (!this.current || this.nativePosition >= this.current.length) {
      this.current = this.frames.shift() ?? null;
      this.nativePosition = 0;
      // Starved: hold the last sample. A 0-fill is a hard step on any
      // mix with a DC offset (e.g. tied-pin AY outputs) and pops loudly.
      if (!this.current) return this.lastSample;
    }
    return (this.lastSample = this.current[this.nativePosition++]!);
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    if (!this.core) {
      output.fill(0);
    } else {
      for (let index = 0; index < output.length; index++) {
        this.fraction += this.step;
        while (this.fraction >= 1) {
          this.fraction -= 1;
          this.sample0 = this.sample1;
          this.sample1 = this.nextNative();
        }
        output[index] = this.sample0 + (this.sample1 - this.sample0) * this.fraction;
      }
    }
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('wsg', GeneratedNamcoWsgProcessor);
`;
}
