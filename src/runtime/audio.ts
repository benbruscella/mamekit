// Browser-only Web Audio glue for a worklet-hosted sound core (no libraries).
//
// The DSP runs inside an AudioWorkletProcessor (see wsg-worklet.ts) so
// main-thread jank never glitches audio. AudioOutput only owns the
// AudioContext / GainNode wiring and forwards register writes to the
// worklet over its MessagePort.

/**
 * What the worklet needs to boot its own DSP instance. `{ sampleRate }`
 * alone is enough for the wiring; for the Namco WSG pass `waveRom` (the
 * first 0x100 bytes of the "namco" PROM region are the wavetable) and
 * `clock` (defaults to sampleRate — for the WSG they are the same, 96000).
 */
export interface WorkletCoreConfig {
  readonly sampleRate: number;
  readonly waveRom?: Uint8Array;
  readonly clock?: number;
  readonly voices?: number;
  /** number of chip instances the worklet should host (ay8910 bank) */
  readonly chips?: number;
  /** per-chip mix weights (board analog net); defaults to all-equal */
  readonly chipGains?: number[];
  /** DAC route gain override */
  readonly dacGain?: number;
  /** video refresh rate (Hz) — paces the worklet's write scheduler */
  readonly refresh?: number;
  /** log worklet scheduler stats to the console once per second */
  readonly debug?: boolean;
}

interface PendingWrite {
  offset: number;
  data: number;
  frac?: number;
}

export class AudioOutput {
  private ctx: AudioContext | null = null;
  private node: AudioWorkletNode | null = null;
  private gain: GainNode | null = null;
  private volume: number = 1;
  /** register writes issued before start() resolves, replayed in order */
  private pending: PendingWrite[] = [];

  constructor() {}

  /**
   * Call from a user gesture (browsers block AudioContext otherwise).
   * Loads the compiled worklet module (e.g. "runtime/wsg-worklet.js"
   * relative to dist), wires node -> gain -> destination and sends the
   * init message.
   */
  async start(core: WorkletCoreConfig, workletUrl: string, processorName = 'wsg'): Promise<void> {
    if (this.ctx) return; // already started

    const ctx = new AudioContext();
    await ctx.audioWorklet.addModule(workletUrl);

    const node = new AudioWorkletNode(ctx, processorName, {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [1],
    });
    const gain = ctx.createGain();
    gain.gain.value = this.volume;
    node.connect(gain);
    gain.connect(ctx.destination);

    node.port.postMessage({
      type: 'init',
      waveRom: core.waveRom ?? new Uint8Array(0x100),
      clock: core.clock ?? core.sampleRate,
      voices: core.voices,
      chips: core.chips,
      chipGains: core.chipGains,
      dacGain: core.dacGain,
      refresh: core.refresh,
      debug: core.debug,
    });

    // worklet scheduler telemetry (posted once per second when debug)
    if (core.debug) {
      node.port.onmessage = (ev: MessageEvent) => {
        const m = ev.data as { type?: string } & Record<string, unknown>;
        if (m.type === 'stats') {
          const { type: _t, ...rest } = m;
          console.log('[audio]', JSON.stringify(rest));
        }
      };
      console.log(`[audio] context rate=${ctx.sampleRate} state=${ctx.state} baseLatency=${ctx.baseLatency}`);
      ctx.addEventListener('statechange', () => console.log(`[audio] state -> ${ctx.state}`));
    }

    this.ctx = ctx;
    this.node = node;
    this.gain = gain;

    // replay writes that happened before the context existed
    if (this.pending.length) {
      node.port.postMessage({ type: 'batch', writes: this.pending.splice(0) });
    }

    if (ctx.state !== 'running') await ctx.resume();
  }

  /**
   * Queue a register write for the worklet. Writes accumulate and go out as
   * ONE batch message per video frame via flush() — junofrst's i8039 DAC
   * alone is ~4k writes/s, and per-write postMessage overhead starves the
   * scheduler under main-thread jank. Before start() they buffer in
   * `pending` and replay as the first batch.
   */
  write(offset: number, data: number, frac?: number): void {
    this.pending.push({ offset, data, frac });
  }

  /** Post all queued writes as one batch. Call once per emulated frame. */
  flush(): void {
    if (this.node && this.pending.length) {
      this.node.port.postMessage({ type: 'batch', writes: this.pending.splice(0) });
    }
  }

  /** Master volume 0..1 via the GainNode. */
  setVolume(v: number): void {
    this.volume = Math.min(1, Math.max(0, v));
    if (this.gain) this.gain.gain.value = this.volume;
  }

  suspend(): void {
    void this.ctx?.suspend();
  }

  resume(): void {
    void this.ctx?.resume();
  }
}
