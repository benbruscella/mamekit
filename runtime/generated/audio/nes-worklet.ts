// GENERATED from src/devices/cpu/m6502/rp2a03.cpp, src/devices/sound/nes_apu.cpp, src/devices/sound/nes_apu.h, src/devices/sound/nes_defs.h; do not edit.
// The register map and DSP tables are audited in nes-apu.audio.ir.json.
import { NesApu } from '../../hardware/nes/apu.js';

declare const sampleRate: number;
declare class AudioWorkletProcessor {
  readonly port: MessagePort;
  constructor();
}
declare function registerProcessor(
  name: string,
  processorCtor: new () => AudioWorkletProcessor,
): void;

type Write = { offset: number; data: number; method?: string };
type Message =
  | { type: 'init'; clock: number }
  | ({ type: 'write' } & Write)
  | { type: 'batch'; writes: Write[] }
  | { type: 'data'; id: number; bytes: Uint8Array }
  | { type: 'reset' };

const CHUNK = 1024;
export class Resampler {
  private readonly step: number;
  private fraction = 0;
  private last = 0;
  private readonly source = new Float32Array(CHUNK);
  private position = CHUNK;
  private readonly render: (out: Float32Array) => void;

  constructor(nativeRate: number, render: (out: Float32Array) => void) {
    this.step = nativeRate / sampleRate;
    this.render = render;
  }

  next(): number {
    this.fraction += this.step;
    let sum = 0;
    let count = 0;
    while (this.fraction >= 1) {
      this.fraction--;
      if (this.position >= this.source.length) {
        this.render(this.source);
        this.position = 0;
      }
      sum += this.source[this.position++]!;
      count++;
    }
    if (count) this.last = sum / count;
    return this.last;
  }
}

class NesProcessor extends AudioWorkletProcessor {
  private clock = 0;
  private apu?: NesApu;
  private resampler?: Resampler;
  // A cartridge's own sound chip, rendered on the main thread and already
  // weighted by its route: stream.pcm samples at their rate, in the offset.
  private readonly streamQueue: number[] = [];
  private streamRate = 0;
  private streamPhase = 0;
  private streamHeld = 0;

  private write(write: Write): void {
    if (write.method === 'stream.pcm') {
      this.streamRate = write.offset;
      if (this.streamQueue.length < 8192) this.streamQueue.push(write.data);
      return;
    }
    this.apu?.write(write.offset, write.data);
  }

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent<Message>) => {
      const message = event.data;
      if (message.type === 'init') {
        this.clock = message.clock;
        this.build();
      } else if (message.type === 'write') {
        this.write(message);
      } else if (message.type === 'batch') {
        for (const write of message.writes) this.write(write);
      } else if (message.type === 'data') {
        this.apu?.data(message.id, message.bytes);
      } else {
        this.build();
      }
    };
  }

  private stream(): number {
    if (this.streamRate <= 0) return 0;
    this.streamPhase += this.streamRate / sampleRate;
    while (this.streamPhase >= 1) {
      this.streamPhase -= 1;
      if (this.streamQueue.length) this.streamHeld = this.streamQueue.shift()!;
    }
    return this.streamHeld;
  }

  private build(): void {
    this.streamQueue.length = 0;
    this.streamHeld = 0;
    this.apu = new NesApu(this.clock);
    this.resampler = new Resampler(this.apu.sampleRate, out => this.apu!.render(out));
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    if (!channels?.[0]) return true;
    const output = channels[0];
    if (!this.resampler) output.fill(0);
    else for (let index = 0; index < output.length; index++) output[index] = this.resampler.next() + this.stream();
    for (let channel = 1; channel < channels.length; channel++) channels[channel]!.set(output);
    return true;
  }
}

registerProcessor('nes', NesProcessor);
