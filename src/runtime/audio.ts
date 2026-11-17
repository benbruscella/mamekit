// Browser-only Web Audio glue for the shared stream worklet (no libraries).
//
// The generated devices render on the main thread and the stream worklet
// (src/mame/stream-worklet.ts) plays what they rendered, so main-thread jank
// never glitches audio. AudioOutput only owns the AudioContext / GainNode
// wiring and forwards each frame's writes to the worklet over its MessagePort.

import type { GeneratedAudioRoute } from '../ir/board.ts';
import type { GeneratedSpeakerFilterPlan } from '../ir/audio-protocol.ts';

/** What the worklet needs to boot. */
export interface WorkletCoreConfig {
  readonly sampleRate: number;
  readonly clock?: number;
  readonly speakerFilter?: GeneratedSpeakerFilterPlan;
  /** video refresh rate (Hz) — paces the worklet's write scheduler */
  readonly refresh?: number;
  /** log worklet scheduler stats to the console once per second */
  readonly debug?: boolean;
}

interface PendingWrite {
  offset: number;
  data: number;
  frac?: number;
  /** Target device write method; worklets route by name, never by offset math. */
  method?: string;
}

export class AudioOutput {
  private ctx: AudioContext | null = null;
  private node: AudioWorkletNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gain: GainNode | null = null;
  private volume: number = 1;
  private systemMuted = false;
  /** writes, kept in issue order, flushed once per frame */
  private pending: PendingWrite[] = [];
  /** Complete frames produced while the async AudioWorklet is starting. */
  private pendingFrames: PendingWrite[][] = [];

  constructor() {}

  /**
   * Call from a user gesture (browsers block AudioContext otherwise).
   * Loads the compiled worklet module (the stream worklet, relative to dist), wires node -> gain -> destination and sends the
   * init message.
   */
  async start(core: WorkletCoreConfig, workletUrl: string, processorName = 'stream'): Promise<void> {
    if (this.ctx) return; // already started

    const ctx = new AudioContext();
    await ctx.audioWorklet.addModule(workletUrl);

    const node = new AudioWorkletNode(ctx, processorName, {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [1],
    });
    const gain = ctx.createGain();
    gain.gain.value = this.systemMuted ? 0 : this.volume;
    const filter = core.speakerFilter
      ? ctx.createBiquadFilter()
      : null;
    if (filter && core.speakerFilter) {
      filter.type = core.speakerFilter.type;
      filter.frequency.value = core.speakerFilter.frequency;
      filter.Q.value = core.speakerFilter.q;
      node.connect(filter);
      filter.connect(gain);
    } else {
      node.connect(gain);
    }
    gain.connect(ctx.destination);

    node.port.postMessage({
      type: 'init',
      clock: core.clock ?? core.sampleRate,
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
    this.filter = filter;
    this.gain = gain;

    // Frames that ran while addModule() was awaiting are pre-audio history:
    // collapse them into ONE batch so the register state lands correctly
    // without queueing N rendered frames of permanent backlog latency
    // (worklets drain exactly one queued frame per video frame).
    const backlog = this.pendingFrames.splice(0).flat();
    if (backlog.length) this.postFrame(node, backlog);

    if (ctx.state !== 'running') await ctx.resume();
  }

  /**
   * Queue a register write for the worklet. Writes accumulate and go out as
   * ONE batch message per video frame via flush() — junofrst's i8039 DAC
   * alone is ~4k writes/s, and per-write postMessage overhead starves the
   * scheduler under main-thread jank. Complete frames produced before
   * start() finishes remain separate in `pendingFrames`.
   */
  write(offset: number, data: number, frac?: number, method?: string): void {
    const write: PendingWrite = { offset, data, frac };
    if (method !== undefined) write.method = method;
    this.pending.push(write);
  }

  /** Post all queued writes in order. Call once per frame. */
  flush(): void {
    const frame = this.pending.splice(0);
    if (this.node) this.postFrame(this.node, frame);
    else this.pendingFrames.push(frame);
  }

  /**
   * Keep a fast-forward frame's register state in sync while its output is
   * muted by the shell.
   *
   * The worklet collapses excess queued frames by applying their writes
   * without rendering them. Sending this batch is therefore essential: a
   * one-time mode write discarded during boot leaves chips such as Simpsons'
   * K053260 permanently silent after fast-forwarding to gameplay.
   */
  discard(): void {
    const frame = this.pending.splice(0);
    if (this.node) this.postFrame(this.node, frame);
    else this.pendingFrames.push(frame);
  }

  /** Drain one frame to the worklet as one 'batch' message. */
  private postFrame(node: AudioWorkletNode, writes: PendingWrite[]): void {
    // An empty batch still represents one emulated frame: the worklet needs
    // it to advance sound even when nothing was written.
    node.port.postMessage({ type: 'batch', writes });
  }

  /**
   * QA tap on the post-gain mix. Browser tests need to prove a machine is
   * actually audible through the shipped AudioWorklet path — the Node
   * acceptance probe renders the DSP offline and never touches this graph.
   * Returns null before start(), and never changes what reaches the speakers.
   */
  monitor(): AnalyserNode | null {
    if (!this.ctx || !this.gain) return null;
    const analyser = this.ctx.createAnalyser();
    analyser.fftSize = 2048;
    this.gain.connect(analyser);
    return analyser;
  }

  /** Master volume 0..1 via the GainNode. */
  setVolume(v: number): void {
    this.volume = Math.min(1, Math.max(0, v));
    if (this.gain) this.gain.gain.value = this.systemMuted ? 0 : this.volume;
  }

  /**
   * The machine's own system mute (MAME `sound_manager::system_mute`), apart
   * from the visitor's volume so neither undoes the other.
   */
  setSystemMute(muted: boolean): void {
    this.systemMuted = muted;
    if (this.gain) this.gain.gain.value = muted ? 0 : this.volume;
  }

  suspend(): void {
    void this.ctx?.suspend();
  }

  resume(): void {
    void this.ctx?.resume();
  }
}
