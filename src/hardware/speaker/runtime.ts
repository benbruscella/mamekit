import { deviceAliases, soundTags, type SoundRuntimeContext, type SoundRuntimeHooks, type SoundStreamSurface } from '../sound-runtime.ts';
import { STREAM_AUDIO_RATE } from './definition.ts';
import { LOFI_INTERPOLATION } from './lofi-interpolation.ts';

/** A stall must not become an unbounded catch-up burst. */
const MAX_SAMPLES_PER_UPDATE = 4096;

/** A device whose `sound_stream_update` renders beside the processor, and its routed gain. */
export interface StreamSource {
  tag: string;
  gain: number;
}

/** MAME's ALL_OUTPUTS, as `set_output_gain` takes it. */
const ALL_OUTPUTS = 65535;

/** How much of a stream's past is kept to interpolate through a rate change. */
const RATE_CHANGE_HISTORY = 64;

/**
 * One output of a device whose streams do not run at the speaker's rate: a
 * samples_device channel, at the rate of the recording it is playing. What it
 * renders is kept at that rate, with its absolute index, and MAME's resampler
 * reads the speaker's samples out of it. Plain data, so a save takes it.
 */
interface StreamChannel {
  rate: number;
  outputGain: number;
  /** The absolute source index of the next sample to render, and of `history[0]`. */
  written: number;
  base: number;
  history: number[];
  /** How far this channel has reached the speaker, and what it gave it. */
  rendered: number;
  pending: number[];
}

/**
 * `audio_resampler_lofi::apply`, for `count` speaker samples from `start`: MAME
 * derives the source position from the absolute output index, two source
 * samples behind, and steps a 24-bit phase from there.
 */
function resampleChannel(channel: StreamChannel, start: number, count: number, gain: number, output: number[]): void {
  const { f0, f1 } = LOFI_INTERPOLATION;
  const fs = Math.max(1, channel.rate);
  const ft = STREAM_AUDIO_RATE;
  const divide = fs <= ft ? 1 : 1 + Math.floor(fs / ft);
  const step = Math.floor(Math.floor(fs * 0x1000000 / ft) / divide);
  const seconds = Math.floor(start / ft);
  const position = Math.floor((start % ft) * fs * 0x1000 / ft);
  let source = Math.floor(position / 0x1000) + fs * seconds;
  let phase = position % 0x1000;
  if (divide > 1) {
    const delta = source % divide;
    phase = Math.floor((phase + delta * 0x1000) / divide);
    source -= delta;
  }
  source -= 4 * divide;
  phase *= 0x1000;
  const read = (): number => {
    let sum = 0;
    for (let index = 0; index < divide; index++, source++) sum += channel.history[source - channel.base] ?? 0;
    return sum / divide;
  };
  let s0 = read();
  let s1 = read();
  let s2 = read();
  let s3 = read();
  for (let index = 0; index < count; index++) {
    const cphase = phase >>> 12;
    output.push(gain * (-s0 * f0[0x1000 - cphase]! + s1 * f1[0x1000 - cphase]! + s2 * f1[cphase]! - s3 * f0[cphase]!));
    phase += step;
    if (phase >= 0x1000000) {
      phase -= 0x1000000;
      s0 = s1;
      s1 = s2;
      s2 = s3;
      s3 = read();
    }
  }
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
  // `outputGain` is the device's set_output_gain, over its routed gain.
  const streams = sources.map(source => ({
    ...source, outputGain: 1, rendered: 0, native: 0, pending: [] as number[],
    // Set once the device takes a stream below the speaker's rate.
    resampled: false, channels: [] as StreamChannel[],
  }));
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
      fill: (_channel: number, value: number, start = 0, count = due - Number(start)) =>
        void samples.fill(Number(value), Number(start), Number(start) + Number(count)),
    });
    return samples;
  };
  const surfaces = (tag: string): readonly SoundStreamSurface[] => context.deviceStreams?.(tag) ?? [];
  // A device with several streams, or one that moved its stream below the
  // speaker's rate, renders each at its own rate through the resampler. Every
  // other stream keeps the plain path below.
  const channelsOf = (stream: typeof streams[number]): StreamChannel[] | undefined => {
    const allocated = surfaces(stream.tag);
    if (allocated.length < 2 && !stream.resampled) return undefined;
    while (stream.channels.length < allocated.length) {
      const rate = allocated[stream.channels.length]!.rate;
      // Updated through the current sample, as a stream that starts here has
      // been. One sample short, a sample started in this same instant ran it at
      // the old rate and held a fractional position for the rest of its length.
      const written = Math.floor(time() * rate) + 1;
      stream.channels.push({ rate, outputGain: 1, written, base: written, history: [], rendered: stream.rendered, pending: [] });
    }
    return stream.channels;
  };
  // sound_stream::update: every source sample up to and including the current one.
  const updateChannel = (stream: typeof streams[number], index: number, last: number) => {
    const channel = stream.channels[index]!;
    const due = Math.min(MAX_SAMPLES_PER_UPDATE, last - channel.written + 1);
    if (due <= 0) return;
    if (last - channel.written + 1 > due) {
      // A stall: what it skipped is silence, not a burst to catch up on.
      channel.history.length = 0;
      channel.written = last - due + 1;
      channel.base = channel.written;
    }
    const surface = surfaces(stream.tag)[index]!;
    const from = channel.history.length;
    channel.history.length = from + due;
    channel.history.fill(0, from);
    surface.samples = () => due;
    surface.put = (_output, at, value) => {
      if (at >= 0 && at < due) channel.history[from + Number(at)] = Number(value) * channel.outputGain;
      return 0;
    };
    context.callDevice(stream.tag, 'sound_stream_update', surface);
    channel.written += due;
  };
  const renderChannels = (stream: typeof streams[number], channels: StreamChannel[], target: number) => {
    for (const [index, channel] of channels.entries()) {
      updateChannel(stream, index, Math.floor((target - 1) * channel.rate / STREAM_AUDIO_RATE));
      const count = target - channel.rendered;
      if (count <= 0) continue;
      resampleChannel(channel, channel.rendered, count, stream.gain, channel.pending);
      channel.rendered = target;
      // Nothing behind the resampler's window is read again.
      const keep = Math.floor(target * channel.rate / STREAM_AUDIO_RATE) - 8 - channel.base;
      if (keep > RATE_CHANGE_HISTORY) {
        channel.history.splice(0, keep - RATE_CHANGE_HISTORY);
        channel.base += keep - RATE_CHANGE_HISTORY;
      }
    }
    for (let index = stream.rendered; index < target; index++) {
      let sum = 0;
      for (const channel of channels) sum += channel.pending[index - stream.rendered] ?? 0;
      stream.pending.push(sum);
    }
    for (const channel of channels) channel.pending.splice(0, target - stream.rendered);
    stream.rendered = Math.max(stream.rendered, target);
  };
  const render = (stream: typeof streams[number], target: number) => {
    if (!Number.isFinite(target)) return;
    const channels = channelsOf(stream);
    if (channels) {
      if (target > stream.rendered) renderChannels(stream, channels, target);
      return;
    }
    // A chip that allocated its stream at its own rate -- an NES cartridge's
    // VRC6 at its 1.79 MHz clock, stepping the chip once a sample -- renders
    // at that rate, and each output sample is the mean of the native ones it
    // spans. A device at machine().sample_rate() (the speaker) renders as is.
    const rate = context.deviceStreamRate?.(stream.tag) ?? 0;
    const native = rate > STREAM_AUDIO_RATE ? rate : 0;
    while (stream.rendered < target) {
      const due = Math.min(MAX_SAMPLES_PER_UPDATE, target - stream.rendered);
      if (!native) {
        const gain = stream.gain * stream.outputGain;
        for (const sample of update(stream.tag, due, STREAM_AUDIO_RATE)) stream.pending.push(sample * gain);
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
        stream.pending.push(at > from ? sum / (at - from) * stream.gain * stream.outputGain : 0);
      }
      stream.native = end;
      stream.rendered += due;
    }
  };
  const now = () => Math.floor(time() * STREAM_AUDIO_RATE);
  for (const stream of streams) {
    const streamIndex = (surface: unknown) => surfaces(stream.tag).indexOf(surface as SoundStreamSurface);
    context.bindDeviceCall(stream.tag, 'stream.update', (surface?: unknown) => {
      const channels = channelsOf(stream);
      const index = streamIndex(surface);
      if (!channels || index < 0) {
        render(stream, now());
        return 0;
      }
      updateChannel(stream, index, Math.floor(time() * channels[index]!.rate));
      return 0;
    });
    context.bindDeviceCall(stream.tag, 'stream.end_time', () => stream.rendered / STREAM_AUDIO_RATE);
    context.bindDeviceCall(stream.tag, 'stream.sample_rate', (surface?: unknown) => {
      const channels = channelsOf(stream);
      const index = streamIndex(surface);
      return channels && index >= 0 ? channels[index]!.rate : STREAM_AUDIO_RATE;
    });
    // output_buffer_flat::resample: what the stream has rendered is kept,
    // interpolated to the new rate, with the same absolute time behind it.
    context.bindDeviceCall(stream.tag, 'stream.rate_changing', (surface: unknown, next: number) => {
      if (next < STREAM_AUDIO_RATE) stream.resampled = true;
      const channels = channelsOf(stream);
      const index = streamIndex(surface);
      if (!channels || index < 0) return 0;
      const channel = channels[index]!;
      updateChannel(stream, index, Math.floor(time() * channel.rate));
      const written = Math.floor(time() * next);
      const history = Array.from({ length: Math.min(written, RATE_CHANGE_HISTORY) }, (_unused, at) => {
        const position = (written - Math.min(written, RATE_CHANGE_HISTORY) + at) * channel.rate / next - channel.base;
        const whole = Math.floor(position);
        const near = channel.history[whole] ?? 0;
        return near + (position - whole) * ((channel.history[whole + 1] ?? 0) - near);
      });
      channel.rate = next;
      channel.history = history;
      channel.written = written;
      channel.base = written - history.length;
      return 0;
    });
    // device_sound_interface::set_output_gain, which samples_device's own
    // set_volume calls with its channel number.
    const setOutputGain = (output: unknown = 0, gain: unknown = 1): number => {
      const channels = channelsOf(stream);
      if (!channels) {
        render(stream, now());
        stream.outputGain = Number(gain);
        return 0;
      }
      channels.forEach((channel, index) => {
        if (Number(output) !== ALL_OUTPUTS && Number(output) !== index) return;
        updateChannel(stream, index, Math.floor(time() * channel.rate));
        channel.outputGain = Number(gain);
      });
      return 0;
    };
    context.bindDeviceCall(stream.tag, 'set_output_gain', setOutputGain);
    // device_sound_interface::set_output_gain. A board's mixer sets it
    // (Gauntlet's mixer_w on its POKEY); what is already rendered keeps the
    // gain it had, as MAME updates the stream first.
    for (const alias of deviceAliases(context.board, stream.tag)) {
      context.calls[`${alias}.set_output_gain`] = setOutputGain;
    }
  }
  // A device the round runs after the CPUs has not reached their time yet;
  // what it renders past where it stands would miss the writes still to come.
  const reached = () => streams.reduce((target, stream) => {
    const seconds = context.deviceTime?.(stream.tag);
    return seconds === undefined ? target : Math.min(target, Math.floor(seconds * STREAM_AUDIO_RATE));
  }, now());
  const mix = () => {
    const target = reached();
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
        stream.outputGain = 1;
        stream.rendered = 0;
        stream.native = 0;
        stream.pending.length = 0;
        stream.resampled = false;
        stream.channels.length = 0;
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
