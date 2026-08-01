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

export interface AudioProbeContext {
  /** Generated sound configuration for the target. */
  sound: {
    kind: string;
    worklet?: string;
    clock?: number;
    chips?: number;
    waveRegion?: string;
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
