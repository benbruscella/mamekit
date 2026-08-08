export function generatedDacWorkletSource(): string {
  return `// GENERATED — generic source-routed parallel DAC bank.
export interface GeneratedDacWrite { offset: number; data: number; frac?: number; method?: string }

class GeneratedHc55516Core {
  private digit = false;
  private clock = false;
  private shift = 0;
  private syllabic = 0x3f;
  private integrator = 0;
  private output = 0;

  private signed10(value: number): number {
    const masked = value & 0x3ff;
    return masked & 0x200 ? masked - 0x400 : masked;
  }

  write(method: string, data: number): void {
    if (method.endsWith('.digit_w')) {
      this.digit = Boolean(data);
      return;
    }
    if (!method.endsWith('.clock_w')) return;
    const clock = Boolean(data);
    if (clock === this.clock) return;
    const bit = this.digit;
    const frozen = (this.integrator >= 0x180 && !bit) ||
      (this.integrator <= -0x180 && bit);
    let sum: number;
    if (clock) {
      this.shift = (this.shift << 1) | Number(bit);
      const coincident = (this.shift & 7) === 0 || (this.shift & 7) === 7;
      if (!frozen) {
        this.syllabic += ((~this.syllabic & 0xfc0) >>> 6) + (coincident ? 0 : 0xfc1);
        this.syllabic &= 0xfff;
      }
      sum = this.signed10(((~this.integrator) >> 4) + 1);
    } else {
      const step = Math.max(2, this.syllabic >>> 6);
      sum = this.shift & 1 ? this.signed10((~step) + 1) : this.signed10(step);
    }
    if (!frozen) this.integrator = this.signed10(this.integrator + sum);
    this.output = ((this.integrator << 6) |
      (((this.integrator & 0x3ff) ^ 0x200) >>> 4)) / 32768;
    this.clock = clock;
  }

  sample(): number { return this.output; }
}

export class GeneratedDacMixer {
  private readonly values: Float64Array;
  private readonly seen: Uint8Array;
  private readonly wide: Uint8Array;
  private readonly gains: Float64Array;
  private readonly cvsd = new GeneratedHc55516Core();
  private readonly cvsdGain: number;

  constructor(
    chips = 1,
    routes: readonly { chip: number; gain: number }[] = [],
    auxiliary: readonly { type: string; gain: number }[] = [],
  ) {
    this.values = new Float64Array(chips);
    this.seen = new Uint8Array(chips);
    this.wide = new Uint8Array(chips);
    this.gains = Float64Array.from({ length: chips }, (_unused, chip) =>
      Math.max(0, ...routes.filter(route => route.chip === chip).map(route => route.gain)) || 1);
    this.cvsdGain = Math.max(0, ...auxiliary
      .filter(device => device.type === 'HC55516')
      .map(device => device.gain));
  }

  write(chip: number, data: number, method?: string): void {
    if (method?.includes('cvsd.')) {
      this.cvsd.write(method, data);
      return;
    }
    if (chip < 0 || chip >= this.values.length) return;
    const byte = data & 0xff;
    if (byte > 1) this.wide[chip] = 1;
    this.seen[chip] = 1;
    this.values[chip] = this.wide[chip]
      ? (byte - 128) / 128
      : byte ? 1 : -1;
  }

  sample(): number {
    let mixed = 0;
    let gain = 0;
    for (let chip = 0; chip < this.values.length; chip++) {
      if (!this.seen[chip]) continue;
      mixed += this.values[chip]! * this.gains[chip]!;
      gain += this.gains[chip]!;
    }
    if (this.cvsdGain) {
      mixed += this.cvsd.sample() * this.cvsdGain;
      gain += this.cvsdGain;
    }
    return gain ? mixed / gain : 0;
  }
}

export class GeneratedDacFrameRenderer {
  private sampleCarry = 0;
  private readonly mixer: GeneratedDacMixer;
  private readonly outputRate: number;
  private readonly refresh: number;
  constructor(
    mixer: GeneratedDacMixer,
    outputRate: number,
    refresh: number,
  ) {
    this.mixer = mixer;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedDacWrite[]): Float32Array {
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
declare class AudioWorkletProcessor { readonly port: MessagePort; constructor() }
declare function registerProcessor(name: string, ctor: new () => AudioWorkletProcessor): void;

class GeneratedDacProcessor extends AudioWorkletProcessor {
  private renderer?: GeneratedDacFrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array;
  private currentIndex = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string; chips?: number; routes?: { chip: number; gain: number }[];
        auxiliaryDevices?: { type: string; gain: number }[];
        refresh?: number; writes?: GeneratedDacWrite[];
      };
      if (message.type === 'init') {
        this.renderer = new GeneratedDacFrameRenderer(
          new GeneratedDacMixer(message.chips ?? 1, message.routes, message.auxiliaryDevices),
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 8) this.frames.shift();
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
    for (let index = 0; index < output.length; index++) output[index] = this.nextSample();
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) channels![channel]!.set(output);
    return true;
  }
}

registerProcessor('dac', GeneratedDacProcessor);
`;
}
