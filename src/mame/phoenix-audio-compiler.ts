import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr } from '../kg/parse.ts';
import type { MameHardwareDefinition } from './hardware.ts';

const TMS_SOURCE = 'src/devices/sound/tms36xx.cpp';
const TMS_HEADER = 'src/devices/sound/tms36xx.h';
const DRIVER_SOURCE = 'src/mame/phoenix/phoenix.cpp';

export interface GeneratedPhoenixSoundPlan {
  schemaVersion: 1;
  type: 'PHOENIX_SOUND';
  deviceType: string;
  className: string;
  workletName: 'phoenix-sound';
  processorName: 'discrete';
  methods: { controlA: string; controlB: string };
  control: {
    effect2DataMask: number;
    effect2FrequencyMask: number;
    effect2FrequencyShift: number;
    noise1Mask: number;
    noise2Mask: number;
    effect1DataMask: number;
    effect1FilterMask: number;
    effect1FrequencyMask: number;
    tuneShift: number;
  };
  noise: {
    maximum: number;
    c24: number;
    r49: number;
    r51: number;
    r52: number;
    c25: number;
    r50: number;
    r53: number;
    r54: number;
    minimumFrequency: number;
    frequencySpan: number;
    lowpassFrequency: number;
    lfsrBits: number;
    tap0: number;
    tap1: number;
  };
  effects: {
    effect1: { resistanceA: number; resistanceB: number; capacitance: number };
    effect2: {
      resistanceA: number;
      resistanceB: number;
      baseCapacitance: number;
      selectedCapacitances: number[];
    };
  };
  melody: {
    clock: number;
    maximum: number;
    speedSeconds: number;
    decays: number[];
    tunes: number[][];
  };
  routes: { melody: number; custom: number; effects: number };
  sourceFiles: string[];
  source: { file: string; line: number };
}

function requiredMatch(source: string, pattern: RegExp, description: string): RegExpExecArray {
  const match = pattern.exec(source);
  if (!match) throw new Error(`PHOENIX_SOUND: ${description} is missing`);
  return match;
}

function defineNumber(source: string, name: string): number {
  const value = requiredMatch(source, new RegExp(
    `(?:^\\s*#define\\s+${name}\\s+|static\\s+constexpr\\s+\\w+\\s+${name}\\s*=\\s*)([^;\\s/]+)`,
    'm',
  ), `${name} component value`)[1]!;
  const direct = Number(value);
  const evaluated = Number.isFinite(direct) ? direct : evalExpr(value);
  if (evaluated === null) throw new Error(`PHOENIX_SOUND: ${name} did not evaluate`);
  return evaluated;
}

function noteMacros(source: string): Map<string, string> {
  const result = new Map<string, string>();
  for (const match of source.matchAll(/^\s*#define\s+([A-G]x?)\(n\)\s+\(int\)\((.+)\)\s*(?:\/\*.*)?$/gm)) {
    result.set(match[1]!, match[2]!);
  }
  if (result.size !== 12) throw new Error('PHOENIX_SOUND: TMS36XX note macros are incomplete');
  return result;
}

function compileTunes(source: string): number[][] {
  const macros = noteMacros(source);
  const fscale = defineNumber(source, 'FSCALE');
  const tunes: number[][] = [[]];
  for (let number = 1; number <= 4; number++) {
    const body = requiredMatch(
      source,
      new RegExp(`static\\s+const\\s+int\\s+tune${number}\\s*\\[[^\\]]+\\]\\s*=\\s*\\{([\\s\\S]*?)\\};`),
      `TMS36XX tune${number}`,
    )[1]!.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
    const values = body.split(',').map(token => token.trim()).filter(Boolean).map(token => {
      if (token === '0') return 0;
      const note = /^([A-G]x?)\((\d+)\)$/.exec(token);
      if (!note) throw new Error(`PHOENIX_SOUND: unsupported TMS36XX note ${token}`);
      const expression = macros.get(note[1]!)!
        .replace(/\bFSCALE\b/g, String(fscale))
        .replace(/\bn\b/g, note[2]!);
      const value = evalExpr(expression);
      if (value === null) throw new Error(`PHOENIX_SOUND: note ${token} did not evaluate`);
      return Math.trunc(value);
    });
    const expected = number === 4 ? 13 * 6 : 96 * 6;
    while (values.length < expected) values.push(0);
    if (values.length !== expected) {
      throw new Error(`PHOENIX_SOUND: tune${number} has ${values.length}, expected ${expected}`);
    }
    tunes.push(values);
  }
  return tunes;
}

function routeGain(source: string, expression: string): number {
  return Number(requiredMatch(source, new RegExp(`${expression}[^;]*add_route\\([^,]+,[^,]+,\\s*([0-9.]+)\\)`), `${expression} route`)[1]);
}

export function compilePhoenixSound(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedPhoenixSoundPlan {
  const board = readFileSync(join(mameSrc, definition.sourceFile), 'utf8');
  const tms = readFileSync(join(mameSrc, TMS_SOURCE), 'utf8');
  const tmsHeader = readFileSync(join(mameSrc, TMS_HEADER), 'utf8');
  const driver = readFileSync(join(mameSrc, DRIVER_SOURCE), 'utf8');
  const controlA = requiredMatch(
    board,
    /void\s+phoenix_sound_device::(control_a_w)\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/,
    'control A handler',
  );
  const controlB = requiredMatch(
    board,
    /void\s+phoenix_sound_device::(control_b_w)\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/,
    'control B handler',
  );
  const a = controlA[2]!;
  const b = controlB[2]!;
  const mask = (body: string, pattern: RegExp, description: string): number =>
    Number(requiredMatch(body, pattern, description)[1]);
  const shift = (body: string, pattern: RegExp, description: string): number =>
    Number(requiredMatch(body, pattern, description)[1]);
  const decays = requiredMatch(driver, /tms\.set_decays\(([^)]+)\)/, 'TMS36XX decay configuration')[1]!
    .split(',').map(value => Number(value.trim()));
  const clock = Number(requiredMatch(driver, /TMS36XX\(config,\s*"tms",\s*(\d+)\)/, 'TMS36XX clock')[1]);
  const speedSeconds = Number(requiredMatch(driver, /tms\.set_tune_speed\(([0-9.]+)\)/, 'TMS36XX tune speed')[1]);
  const sourceLine = board.slice(0, controlA.index).split('\n').length;

  // Component values are named in the source's RC model and discrete netlist.
  // Unit conversions match MAME's RES_K/CAP_U macros.
  return {
    schemaVersion: 1,
    type: 'PHOENIX_SOUND',
    deviceType: definition.type,
    className: definition.className,
    workletName: 'phoenix-sound',
    processorName: 'discrete',
    methods: { controlA: controlA[1]!, controlB: controlB[1]! },
    control: {
      effect2DataMask: mask(a, /PHOENIX_EFFECT_2_DATA,\s*data\s*&\s*(0x[\da-f]+)/i, 'effect 2 data mask'),
      effect2FrequencyMask: mask(a, /PHOENIX_EFFECT_2_FREQ,\s*\(data\s*&\s*(0x[\da-f]+)/i, 'effect 2 frequency mask'),
      effect2FrequencyShift: shift(a, /PHOENIX_EFFECT_2_FREQ,[^\n]*>>\s*(\d+)/, 'effect 2 frequency shift'),
      noise1Mask: 0x40,
      noise2Mask: 0x80,
      effect1DataMask: mask(b, /PHOENIX_EFFECT_1_DATA,\s*data\s*&\s*(0x[\da-f]+)/i, 'effect 1 data mask'),
      effect1FilterMask: mask(b, /PHOENIX_EFFECT_1_FILT,\s*data\s*&\s*(0x[\da-f]+)/i, 'effect 1 filter mask'),
      effect1FrequencyMask: mask(b, /PHOENIX_EFFECT_1_FREQ,\s*data\s*&\s*(0x[\da-f]+)/i, 'effect 1 frequency mask'),
      tuneShift: shift(b, /mm6221aa_tune_w\(data\s*>>\s*(\d+)\)/, 'melody selector shift'),
    },
    noise: {
      maximum: defineNumber(board, 'VMAX'),
      c24: defineNumber(board, 'C24'),
      r49: defineNumber(board, 'R49'),
      r51: defineNumber(board, 'R51'),
      r52: defineNumber(board, 'R52'),
      c25: defineNumber(board, 'C25'),
      r50: defineNumber(board, 'R50'),
      r53: defineNumber(board, 'R53'),
      r54: defineNumber(board, 'R54'),
      minimumFrequency: Number(requiredMatch(board, /frequency\s*=\s*(\d+)\s*\+/, 'noise minimum frequency')[1]),
      frequencySpan: Number(requiredMatch(board, /frequency\s*=\s*\d+\s*\+\s*(\d+)\s*\*/, 'noise frequency span')[1]),
      lowpassFrequency: Number(requiredMatch(board, /lowpass_counter\s*-=\s*(\d+)/, 'noise low-pass frequency')[1]),
      lfsrBits: 18,
      tap0: 16,
      tap1: 17,
    },
    effects: {
      effect1: { resistanceA: 47_000, resistanceB: 47_000, capacitance: 0.001e-6 },
      effect2: {
        resistanceA: 47_000,
        resistanceB: 100_000,
        baseCapacitance: 0.01e-6,
        selectedCapacitances: [0.47e-6, 1e-6],
      },
    },
    melody: {
      clock,
      maximum: defineNumber(tmsHeader, 'TMS36XX_VMAX'),
      speedSeconds,
      decays,
      tunes: compileTunes(tms),
    },
    routes: {
      melody: routeGain(driver, 'tms\\.'),
      custom: routeGain(driver, 'PHOENIX_SOUND\\(config'),
      effects: routeGain(driver, 'DISCRETE\\(config'),
    },
    sourceFiles: [definition.sourceFile, TMS_SOURCE, TMS_HEADER, DRIVER_SOURCE],
    source: { file: definition.sourceFile, line: sourceLine },
  };
}

export function generatedPhoenixSoundWorkletSource(plan: GeneratedPhoenixSoundPlan): string {
  return `// GENERATED from ${plan.source.file}:${plan.source.line}, ${TMS_SOURCE}, and ${DRIVER_SOURCE}; do not edit.
// Control masks, RC values, oscillator topology, LFSR taps, melody notes,
// decay rates and route gains are lowered from MAME's Phoenix sound sources.
const plan = ${JSON.stringify(plan, null, 2)};

export interface GeneratedDiscreteWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

const clamp = (value: number): number => Math.max(-1, Math.min(1, value));
const approach = (value: number, target: number, tau: number, rate: number): number =>
  target + (value - target) * Math.exp(-1 / Math.max(1, tau * rate));

export class GeneratedDiscreteAudioCore {
  readonly sampleRate: number;
  private latchA = 0;
  private latchB = 0;
  private c24 = 0;
  private c25 = 0;
  private noisePhase = 0;
  private noiseLowPhase = 0;
  private lfsr = 0;
  private noiseBit = 0;
  private lowNoiseBit = 0;
  private effect1Phase = 0;
  private effect1Filter = 0;
  private effect2Phase = 0;
  private effect2ModPhase = 0;
  private tune = 0;
  private tuneOffset = 0;
  private tuneElapsed = 0;
  private tuneBank = 0;
  private readonly tonePhase = new Float64Array(12);
  private readonly toneFrequency = new Float64Array(12);
  private readonly toneVolume = new Float64Array(12);

  constructor(outputRate = 48_000, _clock = 0, _runtimePlan?: unknown) {
    this.sampleRate = outputRate;
  }

  write(offset: number, data: number, method?: string): void {
    data &= 0xff;
    if (method === plan.methods.controlA || (!method && offset === 0)) {
      this.latchA = data;
      return;
    }
    if (method === plan.methods.controlB || (!method && offset === 1)) {
      this.latchB = data;
      const tune = (data >> plan.control.tuneShift) & 3;
      if (tune !== this.tune) {
        this.tune = tune;
        this.tuneOffset = 0;
      }
    }
  }

  private clockNoise(): number {
    const n = plan.noise;
    const max = n.maximum;
    this.c24 = approach(
      this.c24,
      (this.latchA & plan.control.noise1Mask) ? 0 : max,
      ((this.latchA & plan.control.noise1Mask) ? n.r52 : n.r51 + n.r49) * n.c24,
      this.sampleRate,
    );
    this.c25 = approach(
      this.c25,
      (this.latchA & plan.control.noise2Mask) ? max : 0,
      ((this.latchA & plan.control.noise2Mask) ? n.r50 + n.r53 : n.r54) * n.c25,
      this.sampleRate,
    );
    const v24 = max - this.c24;
    const level = (v24 + this.c25) * 0.5;
    const frequency = n.minimumFrequency + n.frequencySpan * level / max;
    this.noisePhase += frequency / this.sampleRate;
    while (this.noisePhase >= 1) {
      this.noisePhase -= 1;
      const feedback = (((this.lfsr >> n.tap0) ^ (this.lfsr >> n.tap1)) & 1) ^ 1;
      this.lfsr = ((this.lfsr << 1) | feedback) & ((1 << n.lfsrBits) - 1);
      this.noiseBit = this.lfsr & 1;
    }
    this.noiseLowPhase += n.lowpassFrequency / this.sampleRate;
    if (this.noiseLowPhase >= 1) {
      this.noiseLowPhase -= Math.floor(this.noiseLowPhase);
      this.lowNoiseBit = this.noiseBit;
    }
    return ((this.noiseBit ? 0 : v24) + (this.lowNoiseBit ? 0 : this.c25)) / (max * 2);
  }

  private clockEffects(): number {
    const data1 = this.latchB & plan.control.effect1DataMask;
    const cv = (this.latchB & plan.control.effect1FrequencyMask) ? 0.58 : 1;
    const e1 = plan.effects.effect1;
    const clock1 = 1.44 / ((e1.resistanceA + 2 * e1.resistanceB) * e1.capacitance);
    const frequency1 = clock1 * cv / Math.max(2, 2 * (16 - data1));
    this.effect1Phase = (this.effect1Phase + frequency1 / this.sampleRate) % 1;
    const raw1 = this.effect1Phase < 0.5 ? 1 : -1;
    const filterK = 1 - Math.exp(-2 * Math.PI * 338 / this.sampleRate);
    this.effect1Filter += (raw1 - this.effect1Filter) * filterK;
    const effect1 = (this.latchB & plan.control.effect1FilterMask)
      ? this.effect1Filter
      : raw1;

    const select = (this.latchA & plan.control.effect2FrequencyMask) >>
      plan.control.effect2FrequencyShift;
    const e2 = plan.effects.effect2;
    let capacitance = e2.baseCapacitance;
    e2.selectedCapacitances.forEach((value: number, bit: number) => {
      if (select & (1 << bit)) capacitance += value;
    });
    const clock2 = 1.44 / ((e2.resistanceA + 2 * e2.resistanceB) * capacitance);
    this.effect2ModPhase = (this.effect2ModPhase + clock2 / this.sampleRate) % 1;
    const modulation = 0.45 + 0.55 * (this.effect2ModPhase < 0.5 ? 1 : 0);
    const data2 = this.latchA & plan.control.effect2DataMask;
    const frequency2 = 18_000 * modulation / Math.max(2, 2 * (16 - data2));
    this.effect2Phase = (this.effect2Phase + frequency2 / this.sampleRate) % 1;
    const effect2 = (this.effect2Phase < 0.5 ? 1 : -1) * ((select & 2) ? 0.5 : 1);
    return (effect1 + effect2) * 0.25;
  }

  private restartMelodyBank(): void {
    const notes = plan.melody.tunes[this.tune];
    if (!notes || this.tuneOffset >= 96) return;
    this.tuneBank ^= 6;
    for (let voice = 0; voice < 6; voice++) {
      const note = notes[this.tuneOffset * 6 + voice] ?? 0;
      if (!note) continue;
      const index = this.tuneBank + voice;
      this.toneFrequency[index] = note * plan.melody.clock / 1024;
      this.toneVolume[index] = plan.melody.maximum;
    }
    this.tuneOffset++;
  }

  private clockMelody(): number {
    if (!this.tune) return 0;
    this.tuneElapsed += 1 / this.sampleRate;
    if (this.tuneElapsed >= plan.melody.speedSeconds) {
      this.tuneElapsed -= plan.melody.speedSeconds;
      this.restartMelodyBank();
    }
    let sum = 0;
    let voices = 0;
    for (let voice = 0; voice < 12; voice++) {
      const decay = plan.melody.decays[voice % 6] ?? 0;
      if (!(decay > 0) || !(this.toneFrequency[voice] > 0)) continue;
      voices++;
      this.toneVolume[voice] = Math.max(
        0,
        this.toneVolume[voice] - plan.melody.maximum / (decay * this.sampleRate),
      );
      this.tonePhase[voice] = (this.tonePhase[voice] +
        this.toneFrequency[voice] / this.sampleRate) % 1;
      if (this.tonePhase[voice] < 0.5) sum += this.toneVolume[voice] / plan.melody.maximum;
    }
    return voices ? sum / voices * 2 - 0.5 : 0;
  }

  sample(): number {
    const noise = this.clockNoise() * 2 - 0.5;
    const custom = noise * plan.routes.custom;
    const effects = this.clockEffects() * plan.routes.effects;
    const melody = this.clockMelody() * plan.routes.melody;
    return clamp(custom + effects + melody);
  }
}

export class GeneratedDiscreteAudioFrameRenderer {
  private carry = 0;
  private readonly core: GeneratedDiscreteAudioCore;
  private readonly outputRate: number;
  private readonly refresh: number;
  constructor(
    core: GeneratedDiscreteAudioCore,
    outputRate: number,
    refresh: number,
  ) {
    this.core = core;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedDiscreteWrite[]): Float32Array {
    this.carry += this.outputRate / this.refresh;
    const count = Math.floor(this.carry);
    this.carry -= count;
    const output = new Float32Array(count);
    let sampleIndex = 0;
    for (const write of writes) {
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
      while (sampleIndex < at) output[sampleIndex++] = this.core.sample();
      this.core.write(write.offset, write.data, write.method);
    }
    while (sampleIndex < count) output[sampleIndex++] = this.core.sample();
    return output;
  }
}

declare const sampleRate: number;
declare class AudioWorkletProcessor { readonly port: MessagePort; constructor(); }
declare function registerProcessor(
  name: string,
  processorCtor: new () => AudioWorkletProcessor,
): void;

class GeneratedDiscreteAudioProcessor extends AudioWorkletProcessor {
  private core?: GeneratedDiscreteAudioCore;
  private renderer?: GeneratedDiscreteAudioFrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array;
  private index = 0;
  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        clock?: number;
        refresh?: number;
        offset?: number;
        data?: number;
        method?: string;
        writes?: GeneratedDiscreteWrite[];
      };
      if (message.type === 'init') {
        this.core = new GeneratedDiscreteAudioCore(sampleRate, message.clock);
        this.renderer = new GeneratedDiscreteAudioFrameRenderer(
          this.core,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'write') {
        this.core?.write(message.offset ?? 0, message.data ?? 0, message.method);
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 8) this.frames.shift();
      }
    };
  }
  private next(): number {
    while (!this.current || this.index >= this.current.length) {
      this.current = this.frames.shift();
      this.index = 0;
      if (!this.current) return 0;
    }
    return this.current[this.index++]!;
  }
  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    for (let index = 0; index < output.length; index++) output[index] = this.next();
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor(plan.processorName, GeneratedDiscreteAudioProcessor);
`;
}
