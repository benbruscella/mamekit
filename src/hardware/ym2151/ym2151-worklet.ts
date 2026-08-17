// YM2151 OPM register executor. Register layout, channel/operator mapping and
// key-on protocol follow ymfm_opm; the compact oscillator is browser-oriented.

export interface GeneratedYm2151Write {
  offset: number; data: number; frac?: number; method?: string;
}

interface AuxiliaryDevice {
  type: string; deviceTag: string; clock: number; gain: number; initialMode?: string;
}

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
  private command = -1; private phase = 0; private held = 0;
  private readonly rom: Uint8Array;
  private readonly clockHz: number;
  private readonly outputRate: number;
  private pin7: boolean;
  constructor(
    rom: Uint8Array,
    clockHz: number,
    outputRate: number,
    pin7: boolean,
  ) { this.rom = rom; this.clockHz = clockHz; this.outputRate = outputRate; this.pin7 = pin7; }
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

class OpmCore {
  private address = 0;
  private readonly registers = new Uint8Array(256);
  private readonly phase = new Float64Array(8);
  private readonly envelope = new Float64Array(8);
  private readonly keyMask = new Uint8Array(8);
  private readonly outputRate: number;
  constructor(_clock: number, outputRate: number) { this.outputRate = outputRate; }

  write(port: number, data: number): void {
    if ((port & 1) === 0) { this.address = data & 0xff; return; }
    const reg = this.address;
    this.registers[reg] = data & 0xff;
    if (reg === 0x08) {
      const channel = data & 7;
      this.keyMask[channel] = (data >>> 3) & 15;
      if (this.keyMask[channel]) this.envelope[channel] = 1;
    }
  }

  sample(): number {
    let mix = 0;
    for (let channel = 0; channel < 8; channel++) {
      const mask = this.keyMask[channel]!;
      if (!mask && this.envelope[channel]! < 1e-5) continue;
      const keyCode = this.registers[0x28 + channel]! & 0x7f;
      const octave = (keyCode >>> 4) & 7;
      const note = keyCode & 15;
      const fraction = this.registers[0x30 + channel]! >>> 2;
      const semitone = octave * 12 + Math.min(note, 11) + fraction / 64;
      const frequency = 27.5 * Math.pow(2, semitone / 12);
      this.phase[channel] = (this.phase[channel]! + frequency / this.outputRate) % 1;
      const algorithm = this.registers[0x20 + channel]! & 7;
      const feedback = (this.registers[0x20 + channel]! >>> 3) & 7;
      let level = 0;
      let activeOps = 0;
      for (let op = 0; op < 4; op++) {
        if (!(mask & (1 << op))) continue;
        const slot = op * 8 + channel;
        const mul = Math.max(0.5, this.registers[0x40 + slot]! & 15);
        const totalLevel = this.registers[0x60 + slot]! & 0x7f;
        const gain = Math.pow(10, -totalLevel * 0.75 / 20);
        const modulation = Math.sin(
          this.phase[channel]! * Math.PI * 2 * mul + level * (feedback + algorithm) * 0.3,
        );
        level = algorithm >= 4 ? level + modulation * gain : modulation * gain;
        activeOps++;
      }
      if (!mask) this.envelope[channel] *= 0.9994;
      const pan = this.registers[0x20 + channel]! >>> 6;
      if (pan || this.registers[0x20 + channel] === 0) {
        mix += level / Math.max(1, algorithm >= 4 ? activeOps : 1) * this.envelope[channel]!;
      }
    }
    return Math.max(-1, Math.min(1, mix * 0.18));
  }
}

export class GeneratedYm2151Mixer {
  private readonly cores: OpmCore[];
  private readonly oki?: { tag: string; gain: number; core: OkiCore };
  constructor(
    clock: number,
    chips: number,
    outputRate: number,
    sampleRom?: Uint8Array,
    auxiliaryDevices: readonly AuxiliaryDevice[] = [],
  ) {
    this.cores = Array.from({ length: chips }, () => new OpmCore(clock, outputRate));
    const oki = auxiliaryDevices.find(device => device.type === 'OKIM6295');
    if (oki) this.oki = {
      tag: oki.deviceTag,
      gain: oki.gain,
      core: new OkiCore(
        sampleRom ?? new Uint8Array(), oki.clock, outputRate, oki.initialMode !== 'PIN7_LOW',
      ),
    };
  }
  write(offset: number, data: number, method?: string): void {
    if (this.oki && method?.startsWith(`${this.oki.tag}.`)) {
      if (method.endsWith('.set_pin7')) this.oki.core.setPin7(data);
      else this.oki.core.write(data);
      return;
    }
    this.cores[Math.floor(offset / 2)]?.write(offset & 1, data);
  }
  sample(): number {
    const fm = this.cores.reduce((sum, core) => sum + core.sample(), 0) /
      Math.max(1, this.cores.length);
    return Math.max(-1, Math.min(1, fm + (this.oki?.core.sample() ?? 0) * (this.oki?.gain ?? 0)));
  }
}

export class GeneratedYm2151FrameRenderer {
  private carry = 0;
  private readonly mixer: GeneratedYm2151Mixer;
  private readonly outputRate: number;
  private readonly refresh: number;
  constructor(mixer: GeneratedYm2151Mixer, outputRate: number, refresh: number) {
    this.mixer = mixer; this.outputRate = outputRate; this.refresh = refresh;
  }
  render(writes: readonly GeneratedYm2151Write[]): Float32Array {
    this.carry += this.outputRate / this.refresh;
    const count = Math.floor(this.carry); this.carry -= count;
    const output = new Float32Array(count); let cursor = 0;
    for (const write of writes) {
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
      while (cursor < at) output[cursor++] = this.mixer.sample();
      this.mixer.write(write.offset, write.data, write.method);
    }
    while (cursor < count) output[cursor++] = this.mixer.sample();
    return output;
  }
}

declare const sampleRate: number;
declare class AudioWorkletProcessor { readonly port: MessagePort; constructor(); }
declare function registerProcessor(name: string, ctor: new () => AudioWorkletProcessor): void;
class GeneratedYm2151Processor extends AudioWorkletProcessor {
  private renderer?: GeneratedYm2151FrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array; private cursor = 0;
  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string; clock?: number; chips?: number; refresh?: number;
        sampleRom?: Uint8Array; auxiliaryDevices?: AuxiliaryDevice[];
        writes?: GeneratedYm2151Write[];
      };
      if (message.type === 'init') {
        this.renderer = new GeneratedYm2151FrameRenderer(
          new GeneratedYm2151Mixer(
            message.clock ?? 3_579_545,
            message.chips ?? 1,
            sampleRate,
            message.sampleRom,
            message.auxiliaryDevices,
          ),
          sampleRate, message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 1) this.frames.shift();
      }
    };
  }
  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0]; const output = channels?.[0]; if (!output) return true;
    for (let index = 0; index < output.length; index++) {
      while (!this.current || this.cursor >= this.current.length) {
        this.current = this.frames.shift(); this.cursor = 0; if (!this.current) break;
      }
      output[index] = this.current?.[this.cursor++] ?? 0;
    }
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) channels![channel]!.set(output);
    return true;
  }
}
registerProcessor('ym2151', GeneratedYm2151Processor);
