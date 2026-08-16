// Contract for acceptance audio probes.
//
// The harness used to switch on sound kind and construct each family's mixer
// and frame renderer inline, which meant a new sound family had to be added
// there as well as everywhere else. A capability package now supplies its own
// renderer; the harness keeps what is generic — collecting frames, hashing
// them, and comparing against the golden.

/** One register write captured from the board, in emitted order. */
export interface ProbeSoundWrite {
  offset: number;
  data: number;
  /** Position within the current video frame (0..1). */
  frac?: number;
  /** Source method name, for backends that route by name. */
  method?: string;
}

/** Renders one video frame's worth of samples from the writes it received. */
export interface AudioFrameRenderer {
  render(writes: readonly ProbeSoundWrite[]): Float32Array;
}

/**
 * Resample a device-native frame stream to the probe/browser output rate.
 * Some MAME sound devices synthesize above 48 kHz (Namco WSG uses 192 kHz);
 * concatenating those native frames into a 48 kHz WAV stretches time and
 * invalidates every onset/frequency comparison.
 */
export class StreamingFrameResampler implements AudioFrameRenderer {
  private readonly source: AudioFrameRenderer;
  private readonly step: number;
  private readonly samplesPerFrame: number;
  private readonly chunks: Float32Array[] = [];
  private outputCarry = 0;
  private sourcePosition = 0;
  private fraction = 0;
  private sample0 = 0;
  private sample1 = 0;

  constructor(
    source: AudioFrameRenderer,
    sourceRate: number,
    outputRate: number,
    refresh: number,
  ) {
    this.source = source;
    this.step = sourceRate / outputRate;
    this.samplesPerFrame = outputRate / refresh;
  }

  render(writes: readonly ProbeSoundWrite[]): Float32Array {
    this.chunks.push(this.source.render(writes));
    this.outputCarry += this.samplesPerFrame;
    const count = Math.floor(this.outputCarry);
    this.outputCarry -= count;
    const output = new Float32Array(count);
    for (let index = 0; index < output.length; index++) {
      this.fraction += this.step;
      while (this.fraction >= 1) {
        this.fraction -= 1;
        this.sample0 = this.sample1;
        this.sample1 = this.nextSourceSample();
      }
      output[index] = this.sample0 + (this.sample1 - this.sample0) * this.fraction;
    }
    return output;
  }

  private nextSourceSample(): number {
    while (this.chunks.length && this.sourcePosition >= this.chunks[0]!.length) {
      this.chunks.shift();
      this.sourcePosition = 0;
    }
    if (!this.chunks.length) return 0;
    return this.chunks[0]![this.sourcePosition++]!;
  }
}

export interface AudioProbeContext {
  /** Generated sound configuration for the target. */
  sound: {
    kind: string;
    deviceType?: string;
    worklet?: string;
    clock?: number;
    chips?: number;
    deviceTags?: string[];
    waveRegion?: string;
    sampleRegion?: string;
    routes?: unknown;
    auxiliary?: unknown;
    auxiliaryDevices?: unknown;
    discreteMixer?: unknown;
    discreteDac?: unknown;
    discreteEffects?: unknown;
  };
  /** Assembled ROM regions, for cores that read a wavetable. */
  regions: Record<string, Uint8Array>;
  /** Screen refresh, which sets how many samples one frame is worth. */
  refresh: number;
  /** Absolute path to the distribution root holding the emitted worklets. */
  outRoot: string;
  /** Output sample rate the probe renders at. */
  outputRate: number;
}

export type AudioProbeFactory = (
  context: AudioProbeContext,
) => Promise<AudioFrameRenderer>;
