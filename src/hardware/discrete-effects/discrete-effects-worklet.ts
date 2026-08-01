// Generic executor for a source-derived triggered-effects + DAC discrete plan.
// The generated config supplies every input node and analog component value.

import type { GeneratedDiscreteEffectsPlan } from '../../ir/audio-protocol.ts';

export interface GeneratedDiscreteWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

export class GeneratedDiscreteAudioCore {
  private readonly outputRate: number;
  private readonly plan?: GeneratedDiscreteEffectsPlan;
  private readonly active: boolean[];
  private readonly envelope: number[];
  private readonly phase: number[];
  private readonly noiseOutput: number[];
  private random = 0x6d2b79f5;
  private dac = 0;
  private dacGate = 0;
  private dacLowpass = 0;
  private previousLowpass = 0;
  private dacHighpass = 0;

  constructor(
    outputRate: number,
    _clock?: number,
    plan?: GeneratedDiscreteEffectsPlan,
  ) {
    this.outputRate = outputRate;
    this.plan = plan;
    this.active = plan?.voices.map(() => false) ?? [];
    this.envelope = plan?.voices.map(() => 0) ?? [];
    this.phase = plan?.voices.map(() => 0) ?? [];
    this.noiseOutput = plan?.voices.map(() => 1) ?? [];
  }

  write(offset: number, data: number): void {
    const plan = this.plan;
    if (!plan) return;
    if (offset === plan.dac.node) {
      this.dac = data & 0xff;
      return;
    }
    if (offset === plan.dischargeNode) {
      // The source node is DISCRETE_INPUT_NOT: a high latch output releases
      // Q7 and passes the DAC immediately; a low output lets its RC envelope
      // decay instead of replaying the CPU's idle sample loop forever.
      if (data & 1) this.dacGate = 1;
      return;
    }
    for (let index = 0; index < plan.voices.length; index++) {
      const voice = plan.voices[index]!;
      if (offset !== voice.node) continue;
      const active = voice.activeLow ? (data & 1) === 0 : (data & 1) !== 0;
      if (active && !this.active[index]) this.envelope[index] = 1;
      this.active[index] = active;
    }
  }

  sample(): number {
    const plan = this.plan;
    if (!plan) return 0;
    let mixed = 0;
    for (let index = 0; index < plan.voices.length; index++) {
      const voice = plan.voices[index]!;
      const releaseSamples = Math.max(1, voice.release * this.outputRate);
      // These gates feed RCDISC/RCDISC_MODULATED one-shots in the source
      // netlist.  A held latch starts the transient once; it does not sustain
      // the oscillator at full volume indefinitely.
      this.envelope[index] *= Math.exp(-1 / releaseSamples);
      if (this.envelope[index] < 1e-5) this.envelope[index] = 0;
      let signal: number;
      if (voice.mode === 'noise') {
        this.phase[index] += voice.frequency / this.outputRate;
        while (this.phase[index] >= 1) {
          this.phase[index]--;
          this.random ^= this.random << 13;
          this.random ^= this.random >>> 17;
          this.random ^= this.random << 5;
          this.noiseOutput[index] = (this.random & 1) ? 1 : -1;
        }
        signal = this.noiseOutput[index]!;
      } else {
        this.phase[index] = (
          this.phase[index] + voice.frequency / this.outputRate
        ) % 1;
        signal = this.phase[index] < 0.5 ? 1 : -1;
      }
      mixed += signal * this.envelope[index] * voice.gain;
    }

    // MAME's DAC input is unipolar. Its following Sallen-Key and coupling
    // capacitors are represented by a source-derived low-pass then high-pass.
    const input = this.dac / 255;
    const lowAlpha = 1 - Math.exp(
      -2 * Math.PI * plan.dac.filterFrequency / this.outputRate,
    );
    this.dacLowpass += (input - this.dacLowpass) * lowAlpha;
    const highFrequency = Math.max(5, plan.dac.filterFrequency / 100);
    const rc = 1 / (2 * Math.PI * highFrequency);
    const highAlpha = rc / (rc + 1 / this.outputRate);
    this.dacHighpass = highAlpha * (
      this.dacHighpass + this.dacLowpass - this.previousLowpass
    );
    this.previousLowpass = this.dacLowpass;
    if (plan.dischargeNode === undefined) {
      this.dacGate = 1;
    } else {
      const releaseSamples = Math.max(
        1,
        (plan.dischargeRelease ?? 0.1) * this.outputRate,
      );
      this.dacGate *= Math.exp(-1 / releaseSamples);
      if (this.dacGate < 1e-5) this.dacGate = 0;
    }
    mixed += this.dacHighpass * plan.dac.gain * this.dacGate;
    return Math.max(-1, Math.min(1, mixed * plan.outputGain));
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
    let cursor = 0;
    for (const write of writes) {
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
      while (cursor < at) output[cursor++] = this.core.sample();
      this.core.write(write.offset, write.data);
    }
    while (cursor < count) output[cursor++] = this.core.sample();
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

class GeneratedDiscreteEffectsProcessor extends AudioWorkletProcessor {
  private renderer?: GeneratedDiscreteAudioFrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array;
  private cursor = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        clock?: number;
        refresh?: number;
        discreteEffects?: GeneratedDiscreteEffectsPlan;
        writes?: GeneratedDiscreteWrite[];
      };
      if (message.type === 'init') {
        const core = new GeneratedDiscreteAudioCore(
          sampleRate,
          message.clock,
          message.discreteEffects,
        );
        this.renderer = new GeneratedDiscreteAudioFrameRenderer(
          core,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 8) this.frames.shift();
      }
    };
  }

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
      output[index] = this.current?.[this.cursor++] ?? 0;
    }
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('discrete', GeneratedDiscreteEffectsProcessor);
