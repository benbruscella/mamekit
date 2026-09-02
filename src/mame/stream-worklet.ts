// The worklet that plays what a stream-rendering generated device posts.
//
// A chip whose `sound_stream_update` runs beside the processor -- because
// something on the board reads it back within the frame -- renders its samples
// on the main thread and sends them here. Nothing chip-specific is left by
// then: this queues a frame of samples, resamples the chip's rate to whatever
// the audio context chose, and holds the last value when it runs dry.
//
// Shared, because the shape is the host's rather than the hardware's. The
// Atari 2600's TIA and the Game Boy's APU differ in everything except this.

/** What identifies the chip whose samples the worklet plays. */
export interface StreamWorkletSubject {
  /** The generated sound kind, which is also the processor's registered name. */
  kind: string;
  /** MAME sources the device was compiled from, for the provenance header. */
  sourceFiles: readonly string[];
  /** Methods the device runs, named in the header for the same reason. */
  methods: readonly string[];
}

export function generatedStreamWorkletSource(
  { kind, sourceFiles, methods }: StreamWorkletSubject,
): string {
  return `// GENERATED from ${sourceFiles.join(', ')}; do not edit.
// Carries no register model and no DSP: the chip runs as a generated device
// (${methods.join(', ')}) and posts its samples here.

export interface GeneratedStreamWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

/**
 * One video frame of output, resampled from the chip's stream.
 *
 * The chip renders at its own clock and the host runs at whatever the audio
 * context chose, so samples are held across the ratio between them -- the
 * zero-order hold MAME's stream applies to the same device.
 */
export class GeneratedStreamFrameRenderer {
  private readonly queue: number[] = [];
  private phase = 0;
  private held = 0;
  private carry = 0;
  private readonly rate: number;
  private readonly outputRate: number;
  private readonly refresh: number;

  constructor(rate: number, outputRate: number, refresh: number) {
    this.rate = rate;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  push(sample: number): void {
    // A stall must not turn into an unbounded backlog: a queued sample is
    // permanent latency, not a dropped one.
    if (this.queue.length < 8192) this.queue.push(sample);
  }

  render(): Float32Array {
    this.carry += this.outputRate / this.refresh;
    const count = Math.floor(this.carry);
    this.carry -= count;
    const output = new Float32Array(count);
    const step = this.rate / this.outputRate;
    for (let index = 0; index < count; index++) {
      this.phase += step;
      while (this.phase >= 1) {
        this.phase -= 1;
        if (this.queue.length) this.held = this.queue.shift()!;
      }
      output[index] = this.held;
    }
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

class GeneratedStreamProcessor extends AudioWorkletProcessor {
  private renderer?: GeneratedStreamFrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array;
  private currentIndex = 0;
  private lastSample = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        clock?: number;
        refresh?: number;
        writes?: GeneratedStreamWrite[];
      };
      if (message.type === 'init') {
        this.renderer = new GeneratedStreamFrameRenderer(
          message.clock ?? sampleRate,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        for (const write of message.writes ?? []) this.renderer.push(write.data);
        this.frames.push(this.renderer.render());
        while (this.frames.length > 3) this.frames.shift();
      }
    };
  }

  private nextSample(): number {
    while (!this.current || this.currentIndex >= this.current.length) {
      this.current = this.frames.shift();
      this.currentIndex = 0;
      // Starved: hold, rather than step to zero and pop.
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

registerProcessor('${kind}', GeneratedStreamProcessor);
`;
}