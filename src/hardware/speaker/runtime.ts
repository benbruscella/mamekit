import { soundTags, type SoundRuntimeContext, type SoundRuntimeHooks } from '../sound-runtime.ts';
import { STREAM_AUDIO_RATE } from './definition.ts';

/** A stall must not become an unbounded catch-up burst. */
const MAX_SAMPLES_PER_UPDATE = 4096;

/** A device whose `sound_stream_update` renders beside the processor, and its routed gain. */
export interface StreamSource {
  tag: string;
  gain: number;
}

/**
 * MAME's sound streams for devices rendering at `machine().sample_rate()`.
 *
 * Each device's stream renders when the device updates it -- the speaker
 * forces an update from `level_w` before every edge -- and the mix is taken
 * once all of them have reached the same time, as MAME's sound manager does,
 * so a write is placed where it happened rather than where the frame ended.
 * No device is modelled here: every sample comes from the device's own
 * `sound_stream_update`, and `emit` receives the routed sum one sample at a
 * time.
 */
export function createStreamMixer(
  context: SoundRuntimeContext,
  sources: readonly StreamSource[],
  emit: (sample: number, frac: number) => void,
): SoundRuntimeHooks {
  if (!context.time || !context.bindDeviceCall) throw new Error('stream sound requires scheduler and stream services');
  const time = context.time;
  const driver = context.board.execution.cpus[0]?.tag;
  const streams = sources.map(source => ({ ...source, rendered: 0, native: 0, pending: [] as number[] }));
  const state = { emitted: 0, streams };
  // MAME's `sound_stream` surface, one output, over `due` samples at `rate`.
  const update = (tag: string, due: number, rate: number): Float64Array => {
    const samples = new Float64Array(due);
    const put = (index: number, value: number): number => {
      if (index >= 0 && index < due) samples[index] = value;
      return 0;
    };
    context.callDevice(tag, 'sound_stream_update', {
      samples: () => due,
      sample_rate: () => rate,
      output_count: () => 1,
      put: (_channel: number, index: number, value: number) => put(Number(index), Number(value)),
      put_int: (_channel: number, index: number, value: number, max: number) =>
        put(Number(index), Number(max) ? Number(value) / Number(max) : 0),
      put_int_clamp: (_channel: number, index: number, value: number, max: number) =>
        put(Number(index), Number(max) ? Math.max(-Number(max), Math.min(Number(max) - 1, Number(value))) / Number(max) : 0),
    });
    return samples;
  };
  const render = (stream: typeof streams[number], target: number) => {
    if (!Number.isFinite(target)) return;
    // A chip that allocated its stream at its own rate -- an NES cartridge's
    // VRC6 at its 1.79 MHz clock, stepping the chip once a sample -- renders
    // at that rate, and each output sample is the mean of the native ones it
    // spans. A device at machine().sample_rate() (the speaker) renders as is.
    const rate = context.deviceStreamRate?.(stream.tag) ?? 0;
    const native = rate > STREAM_AUDIO_RATE ? rate : 0;
    while (stream.rendered < target) {
      const due = Math.min(MAX_SAMPLES_PER_UPDATE, target - stream.rendered);
      if (!native) {
        for (const sample of update(stream.tag, due, STREAM_AUDIO_RATE)) stream.pending.push(sample * stream.gain);
        stream.rendered += due;
        continue;
      }
      const end = Math.floor((stream.rendered + due) * native / STREAM_AUDIO_RATE);
      const samples = update(stream.tag, Math.max(0, end - stream.native), native);
      let at = 0;
      for (let index = stream.rendered; index < stream.rendered + due; index++) {
        const stop = Math.floor((index + 1) * native / STREAM_AUDIO_RATE) - stream.native;
        let sum = 0;
        const from = at;
        for (; at < stop && at < samples.length; at++) sum += samples[at]!;
        stream.pending.push(at > from ? sum / (at - from) * stream.gain : 0);
      }
      stream.native = end;
      stream.rendered += due;
    }
  };
  const now = () => Math.floor(time() * STREAM_AUDIO_RATE);
  for (const stream of streams) {
    context.bindDeviceCall(stream.tag, 'stream.update', () => {
      render(stream, now());
      return 0;
    });
    context.bindDeviceCall(stream.tag, 'stream.end_time', () => stream.rendered / STREAM_AUDIO_RATE);
    context.bindDeviceCall(stream.tag, 'stream.sample_rate', () => STREAM_AUDIO_RATE);
  }
  const mix = () => {
    const target = now();
    if (target <= state.emitted) return;
    for (const stream of streams) render(stream, target);
    const frac = context.fraction();
    for (let index = 0; index < target - state.emitted; index++) {
      let sum = 0;
      for (const stream of streams) sum += stream.pending[index] ?? 0;
      emit(sum, frac);
    }
    for (const stream of streams) stream.pending.splice(0, target - state.emitted);
    state.emitted = target;
  };
  return {
    state,
    reset: () => {
      state.emitted = 0;
      for (const stream of streams) {
        stream.rendered = 0;
        stream.native = 0;
        stream.pending.length = 0;
      }
    },
    tickCpu: cpu => { if (cpu === driver) mix(); },
  };
}

/** Sound kind `stream`: the streams are the whole mix, played by the shared stream worklet. */
export function installStreamAudioRuntime(context: SoundRuntimeContext): SoundRuntimeHooks {
  const sources = soundTags(context.sound).map((tag, chip) => ({
    tag,
    gain: context.sound.routes?.find(route => route.chip === chip)?.gain ?? 1,
  }));
  return createStreamMixer(context, sources, (sample, frac) => context.soundWrite(0, sample, frac, 'stream.pcm'));
}
