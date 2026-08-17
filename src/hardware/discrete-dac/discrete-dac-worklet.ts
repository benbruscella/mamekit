// Generic executor for a source-derived DAC/attenuator discrete audio plan.
// Component values and node wiring are supplied by the generated game config.

import type { GeneratedDiscreteDacPlan } from '../../ir/audio-protocol.ts';

export interface GeneratedDiscreteWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

export class GeneratedDiscreteAudioCore {
  private readonly outputRate: number;
  private readonly plan?: GeneratedDiscreteDacPlan;
  private readonly previousInput: number[];
  private readonly previousOutput: number[];
  private dac = 0;
  private volume = 0;

  constructor(
    outputRate: number,
    _clock?: number,
    plan?: GeneratedDiscreteDacPlan,
  ) {
    this.outputRate = outputRate;
    this.plan = plan;
    this.dac = plan?.dac.initial ?? 0;
    this.previousInput = plan?.channels.map(() => 0) ?? [];
    this.previousOutput = plan?.channels.map(() => 0) ?? [];
  }

  write(offset: number, data: number): void {
    if (offset === this.plan?.dac.node) this.dac = data & 0xff;
    else if (offset === this.plan?.volumeNode) this.volume = data & 0xff;
  }

  sample(): number {
    const plan = this.plan;
    if (!plan) return 0;
    const raw = this.dac * plan.dac.gain + plan.dac.offset;
    const fullScale = Math.max(
      1,
      Math.abs(plan.dac.offset),
      Math.abs(255 * plan.dac.gain + plan.dac.offset),
    );
    const input = raw / fullScale;
    let mixed = 0;
    for (let index = 0; index < plan.channels.length; index++) {
      const channel = plan.channels[index]!;
      const selection = (this.volume >>> channel.shift) & channel.mask;
      let conductance = 0;
      for (let bit = 0; bit < channel.resistances.length; bit++) {
        if (selection & (1 << bit)) {
          conductance += 1 / channel.resistances[bit]!;
        }
      }
      const resistance = conductance ? 1 / conductance : Infinity;
      const attenuation = Number.isFinite(resistance)
        ? resistance / (resistance + channel.dividerResistance)
        : 1;
      const filteredInput = input * attenuation;
      const rc = channel.filterResistance * channel.filterCapacitance;
      const alpha = rc / (rc + 1 / this.outputRate);
      const filtered = alpha * (
        (this.previousOutput[index] ?? 0) +
        filteredInput -
        (this.previousInput[index] ?? 0)
      );
      this.previousInput[index] = filteredInput;
      this.previousOutput[index] = filtered;
      mixed += filtered * channel.outputGain;
    }
    return Math.max(-1, Math.min(1, mixed / Math.max(1, plan.channels.length)));
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

class GeneratedDiscreteDacProcessor extends AudioWorkletProcessor {
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
        discreteDac?: GeneratedDiscreteDacPlan;
        writes?: GeneratedDiscreteWrite[];
      };
      if (message.type === 'init') {
        const core = new GeneratedDiscreteAudioCore(
          sampleRate,
          message.clock,
          message.discreteDac,
        );
        this.renderer = new GeneratedDiscreteAudioFrameRenderer(
          core,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 1) this.frames.shift();
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

registerProcessor('discrete', GeneratedDiscreteDacProcessor);
