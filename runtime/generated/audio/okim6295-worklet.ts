// OKIM6295 command, voice and ADPCM execution derived from okim6295.cpp and
// okiadpcm.cpp. The browser core keeps MAME's four voices and ROM table format.

export interface GeneratedOkim6295Write {
  offset: number; data: number; frac?: number; method?: string;
}

const INDEX_SHIFT = [-1, -1, -1, -1, 2, 4, 6, 8] as const;
const VOLUME = [0x20, 0x16, 0x10, 0x0b, 0x08, 0x06, 0x04, 0x03, 0x02, 0, 0, 0, 0, 0, 0, 0]
  .map(value => value / 0x20);

class OkiVoice {
  playing = false;
  base = 0;
  nibble = 0;
  count = 0;
  signal = 0;
  step = 0;
  volume = 0;

  start(base: number, count: number, volume: number): void {
    this.playing = true; this.base = base; this.nibble = 0; this.count = count;
    this.signal = 0; this.step = 0; this.volume = volume;
  }

  clock(rom: Uint8Array): number {
    if (!this.playing) return 0;
    const raw = rom[(this.base + (this.nibble >>> 1)) & 0x3ffff] ?? 0;
    const code = (raw >>> ((this.nibble & 1) ? 0 : 4)) & 15;
    const stepValue = Math.floor(16 * Math.pow(1.1, this.step));
    const magnitude = stepValue / 8 +
      ((code & 1) ? stepValue / 4 : 0) +
      ((code & 2) ? stepValue / 2 : 0) +
      ((code & 4) ? stepValue : 0);
    this.signal += (code & 8) ? -Math.floor(magnitude) : Math.floor(magnitude);
    this.signal = Math.max(-2048, Math.min(2047, this.signal));
    this.step = Math.max(0, Math.min(48, this.step + INDEX_SHIFT[code & 7]!));
    if (++this.nibble >= this.count) this.playing = false;
    return this.signal / 2048 * this.volume;
  }
}

export class GeneratedOkim6295Core {
  private readonly voices = Array.from({ length: 4 }, () => new OkiVoice());
  private readonly rom: Uint8Array;
  private readonly clockHz: number;
  private readonly outputRate: number;
  private command = -1;
  private pin7 = true;
  private phase = 0;
  private held = 0;

  constructor(rom: Uint8Array, clock: number, outputRate: number, pin7 = true) {
    this.rom = rom; this.clockHz = clock; this.outputRate = outputRate; this.pin7 = pin7;
  }

  status(): number {
    return 0xf0 | this.voices.reduce((bits, voice, index) =>
      bits | (voice.playing ? 1 << index : 0), 0);
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
          start, 2 * (stop - start + 1), VOLUME[data & 15] ?? 0,
        );
      }
      this.command = -1;
    } else if (data & 0x80) {
      this.command = data & 0x7f;
    } else {
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
      this.phase -= 1;
      this.held = this.voices.reduce((sum, voice) => sum + voice.clock(this.rom), 0) / 4;
    }
    return this.held;
  }
}

export class GeneratedOkim6295FrameRenderer {
  private carry = 0;
  private readonly core: GeneratedOkim6295Core;
  private readonly outputRate: number;
  private readonly refresh: number;
  constructor(
    core: GeneratedOkim6295Core,
    outputRate: number,
    refresh: number,
  ) { this.core = core; this.outputRate = outputRate; this.refresh = refresh; }
  render(writes: readonly GeneratedOkim6295Write[]): Float32Array {
    this.carry += this.outputRate / this.refresh;
    const count = Math.floor(this.carry); this.carry -= count;
    const output = new Float32Array(count); let cursor = 0;
    for (const write of writes) {
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
      while (cursor < at) output[cursor++] = this.core.sample();
      if (write.method?.endsWith('set_pin7')) this.core.setPin7(write.data);
      else this.core.write(write.data);
    }
    while (cursor < count) output[cursor++] = this.core.sample();
    return output;
  }
}

declare const sampleRate: number;
declare class AudioWorkletProcessor { readonly port: MessagePort; constructor(); }
declare function registerProcessor(name: string, ctor: new () => AudioWorkletProcessor): void;
class GeneratedOkim6295Processor extends AudioWorkletProcessor {
  private renderer?: GeneratedOkim6295FrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array; private cursor = 0;
  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string; sampleRom?: Uint8Array; clock?: number; refresh?: number;
        writes?: GeneratedOkim6295Write[];
      };
      if (message.type === 'init') this.renderer = new GeneratedOkim6295FrameRenderer(
        new GeneratedOkim6295Core(message.sampleRom ?? new Uint8Array(), message.clock ?? 1_000_000, sampleRate),
        sampleRate, message.refresh ?? 60,
      );
      else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 3) this.frames.shift();
      }
    };
  }
  private lastSample = 0;

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0]; const output = channels?.[0]; if (!output) return true;
    for (let index = 0; index < output.length; index++) {
      while (!this.current || this.cursor >= this.current.length) {
        this.current = this.frames.shift(); this.cursor = 0; if (!this.current) break;
      }
      // Hold the last sample when starved: a 0-fill pops on DC-offset mixes.
      output[index] = this.lastSample = this.current?.[this.cursor++] ?? this.lastSample;
    }
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) channels![channel]!.set(output);
    return true;
  }
}
registerProcessor('okim6295', GeneratedOkim6295Processor);
