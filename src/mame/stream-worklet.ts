// The worklet that plays what a stream-rendering generated device posts.
//
// A chip whose `sound_stream_update` runs beside the processor -- because
// something on the board reads it back within the frame -- renders its samples
// on the main thread and sends them here. Nothing chip-specific is left by
// then: this queues a frame of samples, resamples the chip's rate to whatever
// the audio context chose, and holds the last value when it runs dry.
//
// One worklet for every board, because the shape is the host's rather than
// the hardware's: every chip plays through it.

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
  /** A stereo board's sample: its left and right, \`data\` their mono mix. */
  left?: number;
  right?: number;
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
  /** Each queued sample's left and right (the mono sample on a mono board). */
  private readonly leftQueue: number[] = [];
  private readonly rightQueue: number[] = [];
  private phase = 0;
  private held = 0;
  private heldLeft = 0;
  private heldRight = 0;
  /** The left and right of the frame render() returned last. */
  sides: [Float32Array, Float32Array] = [new Float32Array(0), new Float32Array(0)];
  private carry = 0;
  private readonly rate: number;
  private readonly outputRate: number;
  private readonly refresh: number;

  constructor(rate: number, outputRate: number, refresh: number) {
    this.rate = rate;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  push(sample: number, left = sample, right = left): void {
    // A stall must not turn into an unbounded backlog: a queued sample is
    // permanent latency, not a dropped one.
    if (this.queue.length >= 8192) return;
    this.queue.push(sample);
    this.leftQueue.push(left);
    this.rightQueue.push(right);
  }

  /**
   * A board write: only a stream's samples (\`stream.pcm\`, \`<tag>.pcm\`)
   * are sound. The sink carries the board's other writes too -- Battlezone's
   * \`m_discrete->write\` to a netlist not lowered yet -- and pushed as
   * samples they were full-scale clicks.
   */
  write(write: GeneratedStreamWrite): void {
    if (write.method === undefined || write.method.endsWith('.pcm')) this.push(write.data, write.left ?? write.data, write.right ?? write.left ?? write.data);
  }

  render(): Float32Array {
    this.carry += this.outputRate / this.refresh;
    const count = Math.floor(this.carry);
    this.carry -= count;
    const output = new Float32Array(count);
    const left = new Float32Array(count);
    const right = new Float32Array(count);
    const step = this.rate / this.outputRate;
    for (let index = 0; index < count; index++) {
      this.phase += step;
      while (this.phase >= 1) {
        this.phase -= 1;
        if (this.queue.length) {
          this.held = this.queue.shift()!;
          this.heldLeft = this.leftQueue.shift()!;
          this.heldRight = this.rightQueue.shift()!;
        }
      }
      output[index] = this.held;
      left[index] = this.heldLeft;
      right[index] = this.heldRight;
    }
    this.sides = [left, right];
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
  /** Rendered frames, each its mono mix and its left and right. */
  private readonly frames: [Float32Array, Float32Array, Float32Array][] = [];
  private current?: [Float32Array, Float32Array, Float32Array];
  private currentIndex = 0;
  private lastSample = 0;
  private lastLeft = 0;
  private lastRight = 0;

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
        for (const write of message.writes ?? []) this.renderer.write(write);
        const mono = this.renderer.render();
        this.frames.push([mono, ...this.renderer.sides]);
        while (this.frames.length > 3) this.frames.shift();
      }
    };
  }

  /** Steps one sample on; false when starved, which holds the last one rather than popping to zero. */
  private nextSample(): boolean {
    while (!this.current || this.currentIndex >= this.current[0].length) {
      this.current = this.frames.shift();
      this.currentIndex = 0;
      if (!this.current) return false;
    }
    const at = this.currentIndex++;
    this.lastSample = this.current[0][at]!;
    this.lastLeft = this.current[1][at]!;
    this.lastRight = this.current[2][at]!;
    return true;
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    // Two channels play the left and the right; one, the mono mix.
    const right = channels[1];
    for (let index = 0; index < output.length; index++) {
      this.nextSample();
      if (right) {
        output[index] = this.lastLeft;
        right[index] = this.lastRight;
      } else {
        output[index] = this.lastSample;
      }
    }
    for (let channel = 2; channel < channels.length; channel++) channels[channel]!.set(output);
    return true;
  }
}

registerProcessor('${kind}', GeneratedStreamProcessor);
`;
}