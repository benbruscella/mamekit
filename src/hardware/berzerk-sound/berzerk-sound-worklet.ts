export interface GeneratedBerzerkWrite { offset: number; data: number; frac?: number; method?: string }
export class GeneratedBerzerkSoundCore {
  private readonly registers = new Uint8Array(8);
  private readonly phase = new Float64Array(3);
  private readonly periods = new Uint16Array([256, 384, 512]);
  private sfx = 0;
  private speechWord = 0;
  private speechAge = 1e9;
  private speechClock = 24_000;
  private speechGain = 0;
  private noise = 0x13579bdf;
  private readonly outputRate: number;
  constructor(outputRate: number) { this.outputRate = outputRate; }
  write(offset: number, data: number, method = 'sh6840_w'): void {
    if (method === 'sh6840_w') {
      this.registers[offset & 7] = data & 0xff;
      const channel = Math.min(2, (offset >>> 1));
      const high = this.registers[channel * 2]!;
      const low = this.registers[channel * 2 + 1]!;
      this.periods[channel] = Math.max(1, (high << 8) | low);
    } else if (method === 'sfxctrl_w') this.sfx = data & 0xff;
    else if (method === 'speech_start') { this.speechWord = data & 0x3f; this.speechAge = 0; }
    else if (method === 'speech_clock') this.speechClock = Math.max(1, data);
    else if (method === 'speech_gain') this.speechGain = (data & 0xff) / 255;
  }
  sample(): number {
    let mix = 0;
    for (let channel = 0; channel < 3; channel++) {
      const frequency = 894_886 / Math.max(2, this.periods[channel]! * 2);
      this.phase[channel] = (this.phase[channel]! + frequency / this.outputRate) % 1;
      const enabled = ((this.registers[0]! >>> channel) & 1) || this.registers[channel * 2 + 1];
      if (enabled) mix += (this.phase[channel]! < 0.5 ? 1 : -1) * (0.08 + channel * 0.025);
    }
    this.noise ^= this.noise << 13; this.noise ^= this.noise >>> 17; this.noise ^= this.noise << 5;
    if (this.sfx & 0xc0) mix += ((this.noise & 1) ? 1 : -1) * 0.08;
    if (this.speechAge < this.outputRate * 0.9) {
      const t = this.speechAge++ / this.outputRate;
      const bit = (this.speechWord >>> (Math.floor(t * this.speechClock / 96) % 6)) & 1;
      const fundamental = 85 + this.speechWord * 2.8;
      const voiced = Math.sin(t * Math.PI * 2 * fundamental) * (bit ? 1 : 0.35);
      const envelope = Math.max(0, 1 - t / 0.9);
      mix += voiced * envelope * this.speechGain * 0.45;
    }
    return Math.max(-1, Math.min(1, mix));
  }
}
export class GeneratedBerzerkSoundFrameRenderer {
  private carry = 0;
  private readonly core: GeneratedBerzerkSoundCore;
  private readonly rate: number;
  private readonly refresh: number;
  constructor(core: GeneratedBerzerkSoundCore, rate: number, refresh: number) {
    this.core = core; this.rate = rate; this.refresh = refresh;
  }
  render(writes: readonly GeneratedBerzerkWrite[]): Float32Array {
    this.carry += this.rate / this.refresh; const count = Math.floor(this.carry); this.carry -= count;
    const out = new Float32Array(count); let cursor = 0;
    for (const write of writes) {
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
      while (cursor < at) out[cursor++] = this.core.sample();
      this.core.write(write.offset, write.data, write.method);
    }
    while (cursor < count) out[cursor++] = this.core.sample(); return out;
  }
}
declare const sampleRate: number;
declare class AudioWorkletProcessor { readonly port: MessagePort; constructor(); }
declare function registerProcessor(name: string, ctor: new () => AudioWorkletProcessor): void;
class BerzerkProcessor extends AudioWorkletProcessor {
  private renderer?: GeneratedBerzerkSoundFrameRenderer; private readonly frames: Float32Array[] = [];
  private current?: Float32Array; private cursor = 0;
  constructor() { super(); this.port.onmessage = (event: MessageEvent) => {
    const m = event.data as { type: string; refresh?: number; writes?: GeneratedBerzerkWrite[] };
    if (m.type === 'init') this.renderer = new GeneratedBerzerkSoundFrameRenderer(
      new GeneratedBerzerkSoundCore(sampleRate), sampleRate, m.refresh ?? 60,
    );
    else if (m.type === 'batch' && this.renderer) { this.frames.push(this.renderer.render(m.writes ?? [])); while (this.frames.length > 8) this.frames.shift(); }
  }; }
  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const out = outputs[0]?.[0]; if (!out) return true;
    for (let i = 0; i < out.length; i++) { while (!this.current || this.cursor >= this.current.length) { this.current = this.frames.shift(); this.cursor = 0; if (!this.current) break; } out[i] = this.current?.[this.cursor++] ?? 0; }
    return true;
  }
}
registerProcessor('berzerk', BerzerkProcessor);
