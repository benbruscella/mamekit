import { deviceAliases, soundTags, type SoundRuntimeContext, type SoundRuntimeHooks, type SoundStreamSurface } from '../sound-runtime.ts';
import { STREAM_AUDIO_RATE, streamRouteGains } from './definition.ts';
import { LOFI_INTERPOLATION } from './lofi-interpolation.ts';

/** A stall must not become an unbounded catch-up burst. */
const MAX_SAMPLES_PER_UPDATE = 4096;

/** A device whose `sound_stream_update` renders beside the processor, and its routed gain. */
export interface StreamSource {
  tag: string;
  gain: number;
  /**
   * A device with several outputs routed apart (a DISCRETE table's
   * DISCRETE_OUTPUT nodes): each output's gain, by output. The outputs are
   * summed into the mix, each at its own route's gain.
   */
  outputGains?: readonly number[];
  /**
   * Streams routed into this device's inputs (Battlezone's POKEY into its
   * DISCRETE's DISCRETE_INPUTX_STREAM), each at its route's gain. The device
   * reads them with `stream.get(input, sample)` over the window it renders.
   */
  inputs?: readonly StreamInput[];
}

/** One route into a stream device's input: which feeder output (-1, all of them), at what gain. */
export interface StreamInput {
  tag: string;
  output: number;
  input: number;
  gain: number;
}

/**
 * The streams a worklet's runtime mixes beside its chip, as the sound plan
 * lists them, each at its route's gain over `over`: the gain the shell already
 * applies after the worklet (a WSG's own route).
 */
export function streamDeviceSources(
  devices: readonly { deviceTag: string; gain: number; outputGains?: readonly number[]; inputs?: readonly StreamInput[] }[],
  over = 1,
): StreamSource[] {
  return devices.map(device => ({
    tag: device.deviceTag,
    gain: device.gain / over,
    ...(device.outputGains ? { outputGains: device.outputGains } : {}),
    ...(device.inputs ? { inputs: device.inputs } : {}),
  }));
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
    // What a stream routed into another renders before its speaker gain, from
    // absolute sample `rawBase`, kept until every reader has passed it.
    feeds: sources.some(other => other.inputs?.some(input => input.tag === source.tag)), raw: [] as number[][], rawBase: 0,
    // Set once the device takes a stream below the speaker's rate.
    resampled: false, channels: [] as StreamChannel[],
  }));
  const state = { emitted: 0, streams };
  // MAME's `sound_stream` surface, one output, over `due` samples at `rate`.
  const byTag = new Map(streams.map(stream => [stream.tag, stream]));
  const update = (
    tag: string, due: number, rate: number, outputGains?: readonly number[],
    inputs?: StreamSource['inputs'], start = 0,
  ): { mixed: Float64Array; lanes: Float64Array[] } => {
    // One lane per output: put() sets a sample of its own output, and the
    // speaker sums the outputs routed to it, each at its route's gain.
    const lanes: Float64Array[] = [];
    const lane = (channel: number): Float64Array => lanes[Number(channel) || 0] ??= new Float64Array(due);
    const put = (channel: number, index: number, value: number): number => {
      const at = Number(index);
      if (at >= 0 && at < due) lane(channel)[at] = Number(value);
      return 0;
    };
    context.callDevice(tag, 'sound_stream_update', {
      samples: () => due,
      sample_rate: () => rate,
      output_count: () => outputGains?.length ?? 1,
      input_count: () => inputs?.length ?? 0,
      get: (input: number, index: number) => {
        let sum = 0;
        for (const source of inputs ?? []) {
          if (source.input !== Number(input)) continue;
          const feeder = byTag.get(source.tag);
          if (!feeder) continue;
          // The feeders' samples are kept at the speaker's rate, by output.
          const at = Math.floor((start + Number(index)) * STREAM_AUDIO_RATE / rate) - feeder.rawBase;
          if (source.output >= 0) sum += (feeder.raw[source.output]?.[at] ?? 0) * source.gain;
          else for (const lane of feeder.raw) sum += (lane?.[at] ?? 0) * source.gain;
        }
        return sum;
      },
      put,
      put_int: (channel: number, index: number, value: number, max: number) =>
        put(channel, index, Number(max) ? Number(value) / Number(max) : 0),
      put_int_clamp: (channel: number, index: number, value: number, max: number) =>
        put(channel, index, Number(max) ? Math.max(-Number(max), Math.min(Number(max) - 1, Number(value))) / Number(max) : 0),
      fill: (channel: number, value: number, start = 0, count = due - Number(start)) =>
        void lane(channel).fill(Number(value), Number(start), Number(start) + Number(count)),
    });
    if (!outputGains && lanes.length <= 1) return { mixed: lanes[0] ?? new Float64Array(due), lanes };
    const samples = new Float64Array(due);
    lanes.forEach((values, channel) => {
      const gain = outputGains ? outputGains[channel] ?? 0 : 1;
      if (gain) for (let index = 0; index < due; index++) samples[index]! += values[index]! * gain;
    });
    return { mixed: samples, lanes };
  };
  // What a feeder rendered, kept by output for the devices reading it.
  // An output the device left unwritten this time is silence there.
  const keep = (stream: typeof streams[number], lanes: readonly Float64Array[], count: number, read: (values: Float64Array) => Iterable<number>) => {
    const length = stream.rendered - stream.rawBase;
    for (let output = 0; output < Math.max(lanes.length, stream.raw.length); output++) {
      const kept = stream.raw[output] ??= [];
      while (kept.length < length) kept.push(0);
      const values = lanes[output];
      if (values) for (const value of read(values)) kept.push(value * stream.outputGain);
      else for (let index = 0; index < count; index++) kept.push(0);
    }
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
    // What a device reads from its inputs must exist before it renders.
    for (const input of stream.inputs ?? []) {
      const feeder = byTag.get(input.tag);
      if (feeder && feeder !== stream) render(feeder, target);
    }
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
        const { mixed, lanes } = update(stream.tag, due, STREAM_AUDIO_RATE, stream.outputGains, stream.inputs, stream.rendered);
        for (const sample of mixed) stream.pending.push(sample * gain);
        if (stream.feeds) keep(stream, lanes, due, values => values);
        stream.rendered += due;
        continue;
      }
      const end = Math.floor((stream.rendered + due) * native / STREAM_AUDIO_RATE);
      const { mixed, lanes } = update(stream.tag, Math.max(0, end - stream.native), native, stream.outputGains, stream.inputs, stream.native);
      // Each output sample is the mean of the native ones it spans.
      const spans: [number, number][] = [];
      for (let index = stream.rendered, at = 0; index < stream.rendered + due; index++) {
        const stop = Math.min(mixed.length, Math.floor((index + 1) * native / STREAM_AUDIO_RATE) - stream.native);
        spans.push([at, Math.max(at, stop)]);
        at = Math.max(at, stop);
      }
      const mean = function* (values: Float64Array) {
        for (const [from, to] of spans) {
          let sum = 0;
          for (let at = from; at < to; at++) sum += values[at]!;
          yield to > from ? sum / (to - from) : 0;
        }
      };
      for (const sample of mean(mixed)) stream.pending.push(sample * stream.outputGain * stream.gain);
      if (stream.feeds) keep(stream, lanes, due, mean);
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
    const muted = context.systemMuted?.() ?? false;
    for (let index = 0; index < target - state.emitted; index++) {
      let sum = 0;
      for (const stream of streams) sum += stream.pending[index] ?? 0;
      emit(muted ? 0 : sum, frac);
    }
    for (const stream of streams) stream.pending.splice(0, target - state.emitted);
    state.emitted = target;
    // A feeder's samples are read again only by readers that have not passed them.
    for (const stream of streams) {
      if (!stream.feeds) continue;
      const read = streams.reduce((least, reader) =>
        reader.inputs?.some(input => input.tag === stream.tag) ? Math.min(least, reader.rendered) : least, stream.rendered);
      if (read <= stream.rawBase) continue;
      for (const lane of stream.raw) lane?.splice(0, read - stream.rawBase);
      stream.rawBase = read;
    }
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
        stream.raw.length = 0;
        stream.rawBase = 0;
        stream.resampled = false;
        stream.channels.length = 0;
      }
    },
    tickCpu: cpu => { if (cpu === driver) mix(); },
  };
}

/** Sound kind `stream`: the streams are the whole mix, played by the shared stream worklet. */
export function installStreamAudioRuntime(context: SoundRuntimeContext): SoundRuntimeHooks {
  const tags = soundTags(context.sound);
  const sources = tags.map((tag, chip): StreamSource => {
    // A route into another of the streams (POKEY into Battlezone's DISCRETE)
    // is that device's input, not the speaker's.
    const routes = (context.sound.routes ?? []).filter(route => route.chip === chip && !tags.includes(route.target));
    const inputs = (context.sound.routes ?? []).filter(route => route.target === tag && tags[route.chip] !== undefined)
      .map(route => ({ tag: tags[route.chip]!, output: route.channel, input: route.targetInput ?? 0, gain: route.gain }));
    const source = routes.length
      ? { tag, ...streamRouteGains(routes) }
      : { tag, gain: context.sound.routes?.some(route => route.chip === chip) ? 0 : 1 };
    return inputs.length ? { ...source, inputs } : source;
  });
  return createStreamMixer(context, sources, (sample, frac) => context.soundWrite(0, sample, frac, 'stream.pcm'));
}
