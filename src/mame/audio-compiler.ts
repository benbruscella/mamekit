import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';
import type { GeneratedHandlerProgram } from '../ir/board.ts';
import { parseMameAst, splitMameArgs, type MameFunction } from './ast.ts';
import { evalExpr } from '../kg/parse.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import { compileMameHandler } from './handler-ir.ts';
import type { MameHardwareDefinition } from './hardware.ts';
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
