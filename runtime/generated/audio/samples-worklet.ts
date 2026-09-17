// GENERATED capability source for MAME samples_device. The trigger protocol
// comes from samples.cpp; the signal models preserve Zaxxon's documented
// discrete-circuit roles without requiring a separately copyrighted WAV pack.

export interface GeneratedSamplesWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

interface Voice {
  active: boolean;
  loop: boolean;
  sample: number;
  phase: number;
  age: number;
  volume: number;
  noise: number;
}

const DURATIONS = [1.4, 0.75, 1.2, 2.0, 0.42, 0.95, 0.18, 0.16, 0.55, 0.8, 9, 9];

export class GeneratedSamplesCore {
  private readonly outputRate: number;
  private readonly voices: Voice[] = Array.from({ length: 16 }, () => ({
    active: false, loop: false, sample: 0, phase: 0, age: 0, volume: 1, noise: 1,
  }));
  private random = 0x5a17c9e3;

  constructor(outputRate: number) {
    this.outputRate = outputRate;
  }

  write(offset: number, data: number, method = 'start'): void {
    const voice = this.voices[offset & 15]!;
    if (method === 'stop') {
      voice.active = false;
      return;
    }
    if (method === 'set_volume') {
      voice.volume = (data & 0xff) / 255;
      return;
    }
    if (method !== 'start') return;
    voice.sample = data & 0x7f;
    voice.loop = Boolean(data & 0x80);
    voice.active = true;
    voice.phase = 0;
    voice.age = 0;
  }

  sample(): number {
    let mixed = 0;
    for (const voice of this.voices) {
      if (!voice.active) continue;
      const duration = DURATIONS[voice.sample] ?? 0.35;
      const t = voice.age / this.outputRate;
      if (!voice.loop && t >= duration) {
        voice.active = false;
        continue;
      }
      const envelope = voice.loop ? 1 : Math.max(0, 1 - t / duration);
      mixed += this.signal(voice, t) * envelope * voice.volume * 0.22;
      voice.age++;
    }
    return Math.max(-1, Math.min(1, mixed));
  }

  private signal(voice: Voice, t: number): number {
    const id = voice.sample;
    let frequency = 90;
    let noiseMix = 0;
    if (id === 0) frequency = 720 - Math.min(500, t * 360);
    else if (id === 1) { frequency = 180 + t * 460; noiseMix = 0.35; }
    else if (id === 2) frequency = 1050 + Math.sin(t * 31) * 190;
    else if (id === 3) frequency = 58 + Math.sin(t * 7) * 8;
    else if (id === 4 || id === 5) { frequency = id === 4 ? 72 : 48; noiseMix = 0.9; }
    else if (id === 6) { frequency = 135; noiseMix = 0.75; }
    else if (id === 7) frequency = 620 - t * 900;
    else if (id === 8) frequency = 880;
    else if (id === 9) frequency = Math.floor(t * 7) & 1 ? 430 : 650;
    else if (id === 10) { frequency = 46 + Math.sin(t * 2.3) * 5; noiseMix = 0.18; }
    else if (id === 11) { frequency = 32; noiseMix = 0.72; }
    else frequency = 110 + id * 37;
    const step = Math.max(1, frequency) / this.outputRate;
    voice.phase = (voice.phase + step) % 1;
    let tone = id === 2 || id === 8 || id === 9
      ? (voice.phase < 0.5 ? 1 : -1)
      : Math.sin(voice.phase * Math.PI * 2);
    if (noiseMix) {
      this.random ^= this.random << 13;
      this.random ^= this.random >>> 17;
      this.random ^= this.random << 5;
      voice.noise += (((this.random & 1) ? 1 : -1) - voice.noise) * 0.16;
      tone = tone * (1 - noiseMix) + voice.noise * noiseMix;
    }
    return tone;
  }
}

export class GeneratedSamplesFrameRenderer {
  private carry = 0;
  private readonly core: GeneratedSamplesCore;
  private readonly outputRate: number;
  private readonly refresh: number;
  constructor(
    core: GeneratedSamplesCore,
    outputRate: number,
    refresh: number,
  ) {
    this.core = core;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedSamplesWrite[]): Float32Array {
    this.carry += this.outputRate / this.refresh;
    const count = Math.floor(this.carry);
    this.carry -= count;
    const output = new Float32Array(count);
    let cursor = 0;
    for (const write of writes) {
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
      while (cursor < at) output[cursor++] = this.core.sample();
      this.core.write(write.offset, write.data, write.method);
    }
    while (cursor < count) output[cursor++] = this.core.sample();
    return output;
  }
}

declare const sampleRate: number;
declare class AudioWorkletProcessor { readonly port: MessagePort; constructor(); }
declare function registerProcessor(name: string, ctor: new () => AudioWorkletProcessor): void;

class GeneratedSamplesProcessor extends AudioWorkletProcessor {
  private renderer?: GeneratedSamplesFrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array;
  private cursor = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string; refresh?: number; writes?: GeneratedSamplesWrite[];
      };
      if (message.type === 'init') {
        this.renderer = new GeneratedSamplesFrameRenderer(
          new GeneratedSamplesCore(sampleRate), sampleRate, message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 3) this.frames.shift();
      }
    };
  }

  private lastSample = 0;

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    for (let index = 0; index < output.length; index++) {
      while (!this.current || this.cursor >= this.current.length) {
        this.current = this.frames.shift();
        this.cursor = 0;
        if (!this.current) break;
      }
      // Hold the last sample when starved: a 0-fill pops on DC-offset mixes.
      output[index] = this.lastSample = this.current?.[this.cursor++] ?? this.lastSample;
    }
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('samples', GeneratedSamplesProcessor);
