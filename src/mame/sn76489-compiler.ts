import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr } from '../kg/parse.ts';
import { splitMameArgs } from './ast.ts';
import type { MameHardwareDefinition } from './hardware.ts';

export interface GeneratedSn76489Plan {
  schemaVersion: 1;
  type: string;
  className: string;
  feedbackMask: number;
  whiteNoiseTap1: number;
  whiteNoiseTap2: number;
  negate: boolean;
  stereo: boolean;
  clockDivider: number;
  ncrStyle: boolean;
  segaStyle: boolean;
  writeMethod: 'write';
  sourceFiles: string[];
  source: { file: string; line: number };
}

export function compileSn76489(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedSn76489Plan {
  const source = readFileSync(join(mameSrc, definition.sourceFile), 'utf8');
  const constructor = new RegExp(
    `${definition.className}::${definition.className}\\s*\\([^)]*\\)\\s*` +
      `:\\s*sn76496_base_device\\s*\\(`,
  ).exec(source);
  if (!constructor) {
    throw new Error(`${definition.type}: SN76489-family base constructor not found`);
  }
  const open = source.indexOf('(', constructor.index + constructor[0].lastIndexOf('('));
  let depth = 0;
  let close = -1;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '(') depth++;
    else if (source[index] === ')' && --depth === 0) {
      close = index;
      break;
    }
  }
  if (close < 0) throw new Error(`${definition.type}: unterminated base constructor`);
  const args = splitMameArgs(source.slice(open + 1, close));
  const numberAt = (index: number): number => {
    const value = evalExpr(args[index] ?? '');
    if (value === null) {
      throw new Error(`${definition.type}: unsupported constructor value "${args[index]}"`);
    }
    return value;
  };
  const booleanAt = (index: number): boolean => {
    const value = args[index]?.trim();
    if (value === 'true') return true;
    if (value === 'false') return false;
    return numberAt(index) !== 0;
  };
  return {
    schemaVersion: 1,
    type: definition.type,
    className: definition.className,
    feedbackMask: numberAt(3),
    whiteNoiseTap1: numberAt(4),
    whiteNoiseTap2: numberAt(5),
    negate: booleanAt(6),
    stereo: booleanAt(7),
    clockDivider: numberAt(8),
    ncrStyle: booleanAt(9),
    segaStyle: booleanAt(10),
    writeMethod: 'write',
    sourceFiles: [definition.sourceFile, 'src/devices/sound/sn76496.h'],
    source: {
      file: definition.sourceFile,
      line: source.slice(0, constructor.index).split('\n').length,
    },
  };
}

export function generatedSn76489WorkletSource(plan: GeneratedSn76489Plan): string {
  return `// GENERATED from ${plan.source.file}:${plan.source.line}; do not edit.
// Register protocol, divider, polarity and LFSR taps come from MAME.
const plan = ${JSON.stringify(plan, null, 2)};

export interface GeneratedSn76489Write {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

export interface GeneratedSn76489Route {
  chip: number;
  gain: number;
}

class GeneratedSn76489Core {
  private readonly registers = new Int32Array(8);
  private readonly volumes = new Float64Array(4);
  private readonly periods = new Int32Array(4);
  private readonly counts = new Int32Array(4);
  private readonly outputs = new Int32Array(4);
  private readonly volumeTable = new Float64Array(16);
  private lastRegister = plan.segaStyle ? 3 : 0;
  private rng = plan.feedbackMask;

  constructor() {
    let level = 0.25;
    for (let index = 0; index < 15; index++) {
      this.volumeTable[index] = level;
      level /= 1.258925412;
    }
    for (let channel = 0; channel < 4; channel++) {
      this.registers[channel * 2 + 1] = plan.segaStyle ? 15 : 0;
      this.volumes[channel] = this.volumeTable[this.registers[channel * 2 + 1]!]!;
      this.periods[channel] = plan.segaStyle || channel === 3 ? 0 : 0x400;
    }
    this.outputs[3] = this.rng & 1;
  }

  write(data: number): void {
    data &= 0xff;
    let register: number;
    if (data & 0x80) {
      register = (data & 0x70) >> 4;
      this.lastRegister = register;
      if (
        plan.ncrStyle && register === 6 &&
        ((data & 4) !== (this.registers[6]! & 4))
      ) this.rng = plan.feedbackMask;
      this.registers[register] =
        (this.registers[register]! & 0x3f0) | (data & 0x0f);
    } else {
      register = this.lastRegister;
    }
    const channel = register >> 1;
    if (register === 0 || register === 2 || register === 4) {
      if (!(data & 0x80)) {
        this.registers[register] =
          (this.registers[register]! & 0x0f) | ((data & 0x3f) << 4);
      }
      this.periods[channel] = this.registers[register] || plan.segaStyle
        ? this.registers[register]!
        : 0x400;
      if (register === 4 && (this.registers[6]! & 3) === 3) {
        this.periods[3] = this.periods[2]! << 1;
      }
    } else if (register === 1 || register === 3 || register === 5 || register === 7) {
      this.volumes[channel] = this.volumeTable[data & 0x0f]!;
      if (!(data & 0x80)) {
        this.registers[register] =
          (this.registers[register]! & 0x3f0) | (data & 0x0f);
      }
    } else if (register === 6) {
      if (!(data & 0x80)) {
        this.registers[register] =
          (this.registers[register]! & 0x3f0) | (data & 0x0f);
      }
      const noise = this.registers[6]!;
      this.periods[3] = (noise & 3) === 3
        ? this.periods[2]! << 1
        : 1 << (5 + (noise & 3));
      if (!plan.ncrStyle) this.rng = plan.feedbackMask;
    }
  }

  step(): void {
    for (let channel = 0; channel < 3; channel++) {
      if (--this.counts[channel]! <= 0) {
        this.outputs[channel] ^= 1;
        this.counts[channel] = this.periods[channel]!;
      }
    }
    if (--this.counts[3]! <= 0) {
      const tap1 = (this.rng & plan.whiteNoiseTap1) !== 0;
      const tap2 = (this.rng & plan.whiteNoiseTap2) !==
        (plan.ncrStyle ? plan.whiteNoiseTap2 : 0);
      const feedback = tap1 !== (tap2 && Boolean(this.registers[6]! & 4));
      this.rng >>>= 1;
      if (feedback) this.rng |= plan.feedbackMask;
      this.outputs[3] = this.rng & 1;
      this.counts[3] = this.periods[3]!;
    }
  }

  sample(): number {
    let output = 0;
    for (let channel = 0; channel < 4; channel++) {
      if (this.outputs[channel]) output += this.volumes[channel]!;
    }
    return plan.negate ? -output : output;
  }
}

export class GeneratedSn76489Mixer {
  private readonly cores: GeneratedSn76489Core[];
  private readonly phases: Float64Array;
  private readonly stepsPerSample: number;
  private readonly gains: Float64Array;

  constructor(
    clock: number,
    chips: number,
    outputRate: number,
    routes: readonly GeneratedSn76489Route[] = [],
  ) {
    this.cores = Array.from({ length: chips }, () => new GeneratedSn76489Core());
    this.phases = new Float64Array(chips);
    this.stepsPerSample = clock / (2 * plan.clockDivider * outputRate);
    this.gains = Float64Array.from(
      { length: chips },
      (_unused, chip) => Math.max(
        0,
        ...routes.filter(route => route.chip === chip).map(route => route.gain),
      ) || 1,
    );
  }

  write(chip: number, data: number): void {
    this.cores[chip]?.write(data);
  }

  sample(): number {
    let mixed = 0;
    for (let chip = 0; chip < this.cores.length; chip++) {
      this.phases[chip] += this.stepsPerSample;
      while (this.phases[chip] >= 1) {
        this.cores[chip]!.step();
        this.phases[chip]--;
      }
      mixed += this.cores[chip]!.sample() * this.gains[chip]!;
    }
    return mixed / Math.max(1, this.cores.length);
  }
}

export class GeneratedSn76489FrameRenderer {
  private sampleCarry = 0;
  private readonly mixer: GeneratedSn76489Mixer;
  private readonly outputRate: number;
  private readonly refresh: number;

  constructor(
    mixer: GeneratedSn76489Mixer,
    outputRate: number,
    refresh: number,
  ) {
    this.mixer = mixer;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedSn76489Write[]): Float32Array {
    this.sampleCarry += this.outputRate / this.refresh;
    const count = Math.floor(this.sampleCarry);
    this.sampleCarry -= count;
    const output = new Float32Array(count);
    let sampleIndex = 0;
    for (const write of writes) {
      const writeSample = Math.ceil(
        Math.max(0, Math.min(1, write.frac ?? 0)) * count,
      );
      while (sampleIndex < writeSample) output[sampleIndex++] = this.mixer.sample();
      this.mixer.write(write.offset, write.data);
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

class GeneratedSn76489Processor extends AudioWorkletProcessor {
  private renderer?: GeneratedSn76489FrameRenderer;
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
        routes?: GeneratedSn76489Route[];
        refresh?: number;
        writes?: GeneratedSn76489Write[];
      };
      if (message.type === 'init') {
        const mixer = new GeneratedSn76489Mixer(
          message.clock ?? 2_000_000,
          message.chips ?? 1,
          sampleRate,
          message.routes,
        );
        this.renderer = new GeneratedSn76489FrameRenderer(
          mixer,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 3) this.frames.shift();
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
    for (let index = 0; index < output.length; index++) output[index] = this.nextSample();
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('sn76489', GeneratedSn76489Processor);
`;
}
