import { deviceAliases, soundTags, type SoundRuntimeContext, type SoundRuntimeHooks, type SoundStreamSurface } from '../sound-runtime.ts';
import { STREAM_AUDIO_RATE, streamRouteGains } from './definition.ts';
import { LOFI_INTERPOLATION } from './lofi-interpolation.ts';
import { GeneratedNetlistSolver } from './netlist-solver.ts';

/**
 * How many samples the mix waits for between the board's frame ends. A
 * device renders whenever it updates itself (a write updates its stream
 * first), so a later mix renders the same samples; rendering them a few at a
 * time each CPU slice paid DISCRETE's per-update task setup fifteen thousand
 * times a second.
 */
const MIX_BATCH = 256;

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
  /**
   * On a stereo board, this device's gains into the host's left and right
   * outputs: one gain for every output, or one per output. Absolute, unlike
   * `gain`/`outputGains`, which stay the mono mix they always were.
   */
  stereo?: readonly [SideGains, SideGains];
}

/** One side's gains: the same for every output, or by output. */
export type SideGains = number | readonly number[];

const sideWeight = (gains: SideGains, output: number): number =>
  typeof gains === 'number' ? gains : gains[output] ?? 0;

/**
 * A device's routes into one side, as `streamRouteGains` sums them for the
 * mono mix: by output when any route names one, else one gain for all.
 */
export function stereoSideGains(routes: readonly { channel: number; stereo?: readonly [number, number] }[], side: 0 | 1): SideGains {
  if (!routes.some(route => route.channel >= 0)) return routes.reduce((sum, route) => sum + (route.stereo?.[side] ?? 0), 0);
  const gains: number[] = [];
  for (const route of routes) if (route.channel >= 0) gains[route.channel] = (gains[route.channel] ?? 0) + (route.stereo?.[side] ?? 0);
  return Array.from(gains, gain => gain ?? 0);
}

/**
 * Each side as a multiple of the device's own mono contribution, when its
 * gains are: a chip routed wholly to one side, or to the centre, or every
 * output panned alike -- most stereo boards. Its sides are then its mono
 * samples scaled, with no second resampling. Undefined when outputs pan
 * apart (a DISCRETE table with one output per side).
 */
export function proportionalSides(source: StreamSource): [number, number] | undefined {
  if (!source.stereo) return undefined;
  const lengths = [source.outputGains?.length ?? 0, ...source.stereo.map(gains => typeof gains === 'number' ? 0 : gains.length)];
  // One past the longest table: where a by-output table has stopped and a
  // gain for every output has not.
  const outputs = Math.max(1, ...lengths) + 1;
  const ratios: number[] = [];
  for (const side of [0, 1] as const) {
    let ratio: number | undefined;
    for (let output = 0; output < outputs; output++) {
      const mono = source.gain * (source.outputGains ? source.outputGains[output] ?? 0 : 1);
      const weight = sideWeight(source.stereo[side], output);
      if (mono === 0) {
        if (weight !== 0) return undefined;
        continue;
      }
      const next = weight / mono;
      if (ratio === undefined) ratio = next;
      else if (Math.abs(ratio - next) > 1e-12 * Math.max(1, Math.abs(ratio))) return undefined;
    }
    ratios.push(ratio ?? 0);
  }
  return [ratios[0]!, ratios[1]!];
}

/** One side of what a device rendered: its outputs summed at that side's gains. */
function sideMix(lanes: readonly (ArrayLike<number> | undefined)[], gains: SideGains, count: number, scale: number): Float64Array {
  const out = new Float64Array(count);
  lanes.forEach((values, output) => {
    const weight = sideWeight(gains, output) * scale;
    if (weight && values) for (let index = 0; index < count; index++) out[index]! += values[index]! * weight;
  });
  return out;
}

/** One route into a stream device's input: which feeder output (-1, all of them), at what gain. */
export interface StreamInput {
  tag: string;
  output: number;
  input: number;
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
  /**
   * Each output apart, beside `history`, for a stream another device reads:
   * that reader takes its input before any speaker gain, by output.
   */
  lanes?: number[][];
  /** How far this channel has reached the speaker, and what it gave it. */
  rendered: number;
  pending: number[];
  /** On a stereo board, `history` and `pending` for the left and the right. */
  sides?: { history: number[]; pending: number[] }[];
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
/**
 * A compiled NETLIST_SOUND in the mix: the streams routed into its
 * NETLIST_STREAM_INPUTs feed it, sample by sample at their own rates, and it
 * is read at the speaker's.
 */
export interface StreamNetlist {
  solver: GeneratedNetlistSolver;
  /** One route into the netlist: which feeder output (-1, all), which input, at what gain. */
  feeds: readonly StreamInput[];
}

export function createStreamMixer(
  context: SoundRuntimeContext,
  allSources: readonly StreamSource[],
  emit: (sample: number, frac: number, left?: number, right?: number) => void,
  netlist?: StreamNetlist,
): SoundRuntimeHooks & { renderTo?: (seconds: number) => void } {
  if (!context.time || !context.bindDeviceCall) throw new Error('stream sound requires scheduler and stream services');
  const time = context.time;
  // A device that feeds the netlist is rendered by the netlist alone, at its
  // native rate: MAME never resamples what a NETLIST_STREAM_INPUT takes, and
  // rendering it twice would run the chip twice.
  const netlistFeeders = new Set(netlist?.feeds.map(feed => feed.tag) ?? []);
  const sources = allSources.filter(source => !netlistFeeders.has(source.tag));
  const driver = context.board.execution.cpus[0]?.tag;
  const last = context.board.execution.cpus[context.board.execution.cpus.length - 1]?.tag;
  // Per ticking processor: the cycles it must still run before a batch can
  // be due, and the mix position that count was taken against (a reset or a
  // loaded state moves it, and the count is then void).
  const tickState = (tag: string | undefined) => {
    const cpu = context.board.execution.cpus.find(candidate => candidate.tag === tag);
    return { clock: Math.max(1, cpu?.cycleClock ?? cpu?.clock ?? 1), cycles: 0, emitted: -1 };
  };
  const driverTick = tickState(driver);
  const lastTick = last === driver ? driverTick : tickState(last);
  // `outputGain` is the device's set_output_gain, over its routed gain.
  const streams = sources.map(source => {
    const ratio = proportionalSides(source);
    // Sides kept apart only when they are not the mono samples scaled.
    const apart = Boolean(source.stereo) && !ratio;
    return {
    ...source, ratio, outputGain: 1, rendered: 0, native: 0, pending: [] as number[],
    // What a stream routed into another renders before its speaker gain, from
    // absolute sample `rawBase`, kept until every reader has passed it.
    feeds: sources.some(other => other.inputs?.some(input => input.tag === source.tag)), raw: [] as number[][], rawBase: 0,
    // Set once the device takes a stream below the speaker's rate.
    resampled: false, channels: [] as StreamChannel[],
    // A chip rendering above the speaker's rate, kept at its own rate for
    // MAME's resampler (see render): its absolute index and recent samples.
    lofi: { base: 0, rate: 0, history: [] as number[], sides: apart ? [[], []] as number[][] : undefined },
    // Native samples a write rendered past the last speaker sample (see
    // renderAhead), mixed and by output, the next speaker samples' first.
    lead: { mixed: [] as number[], lanes: [] as number[][] },
    // On a stereo board, what it gave the left and the right.
    sides: apart ? [[], []] as number[][] : undefined,
  };
  });
  const stereo = sources.some(source => source.stereo);
  const state = { emitted: 0, streams };
  // The devices an acceptance gate watches, each reported as it renders.
  const observed = streams.filter(stream => context.observeStreams?.includes(stream.tag));
  // MAME's `sound_stream` surface, one output, over `due` samples at `rate`.
  const byTag = new Map(streams.map(stream => [stream.tag, stream]));
  const update = (
    tag: string, due: number, rate: number, outputGains?: readonly number[],
    inputs?: StreamSource['inputs'], start = 0,
  ): { mixed: Float64Array; lanes: Float64Array[] } => {
    // One lane per output: put() sets a sample of its own output, and the
    // speaker sums the outputs routed to it, each at its route's gain.
    // Each input's routes, found once an update rather than on every sample.
    const byInput: StreamInput[][] = [];
    for (const source of inputs ?? []) (byInput[source.input] ??= []).push(source);
    const lanes: Float64Array[] = [];
    const lane = (channel: number): Float64Array => lanes[Number(channel) || 0] ??= new Float64Array(due);
    const put = (channel: number, index: number, value: number): number => {
      const at = Number(index);
      if (at >= 0 && at < due) lane(channel)[at] = Number(value);
      return 0;
    };
    // sound_stream::add: the Namco WSG sums its voices into one output.
    const add = (channel: number, index: number, value: number): number => {
      const at = Number(index);
      if (at >= 0 && at < due) lane(channel)[at]! += Number(value);
      return 0;
    };
    context.callDevice(tag, 'sound_stream_update', {
      samples: () => due,
      sample_rate: () => rate,
      // As many as the device allocated (a YM2203's four: ymfm renders only
      // `output_count()` of them, so an ALL_OUTPUTS route that answered one
      // heard the FM and none of the SSG), or as many as its routes name.
      output_count: () => surfaces(tag)[0]?.outputs ?? Math.max(1, outputGains?.length ?? 1),
      input_count: () => inputs?.length ?? 0,
      get: (input: number, index: number) => {
        let sum = 0;
        for (const source of byInput[Number(input)] ?? []) {
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
      put_clamp: (channel: number, index: number, value: number, clamp = 1) =>
        put(channel, index, Math.max(-Number(clamp), Math.min(Number(clamp), Number(value)))),
      add,
      add_int: (channel: number, index: number, value: number, max: number) =>
        add(channel, index, Number(max) ? Number(value) / Number(max) : 0),
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
    // A stream below the speaker's rate from the start (an OKIM6295 at
    // clock/132, the TIA at its clock) is resampled to it as MAME's mixer
    // does, not rendered a sample per speaker sample: that played the OKI
    // six times too fast.
    const slow = allocated.length === 1 && allocated[0]!.rate > 0 && allocated[0]!.rate < STREAM_AUDIO_RATE;
    if (allocated.length < 2 && !stream.resampled && !slow) return undefined;
    while (stream.channels.length < allocated.length) {
      const rate = allocated[stream.channels.length]!.rate;
      // Updated through the current sample, as a stream that starts here has
      // been. One sample short, a sample started in this same instant ran it at
      // the old rate and held a fractional position for the rest of its length.
      const written = Math.floor(time() * rate) + 1;
      stream.channels.push({
        rate, outputGain: 1, written, base: written, history: [], rendered: stream.rendered, pending: [],
        ...(stream.sides ? { sides: [{ history: [], pending: [] }, { history: [], pending: [] }] } : {}),
      });
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
      for (const side of channel.sides ?? []) side.history.length = 0;
      channel.written = last - due + 1;
      channel.base = channel.written;
    }
    const surface = surfaces(stream.tag)[index]!;
    const from = channel.history.length;
    channel.history.length = from + due;
    channel.history.fill(0, from);
    // One lane per output, then summed at each output's route gain, as the
    // speaker-rate path does: a YM2203 at 20.8 kHz writes three SSG outputs
    // and its FM, routed at 0.4 and 0.2. Written into one slot, each output
    // overwrote the last and none had its own gain.
    const lanes: Float64Array[] = [];
    const lane = (output: number): Float64Array => lanes[Number(output) || 0] ??= new Float64Array(due);
    surface.samples = () => due;
    surface.put = (output, at, value) => {
      if (at >= 0 && at < due) lane(output)[Number(at)] = Number(value);
      return 0;
    };
    surface.add = (output, at, value) => {
      if (at >= 0 && at < due) lane(output)[Number(at)]! += Number(value);
      return 0;
    };
    context.callDevice(stream.tag, 'sound_stream_update', surface);
    lanes.forEach((values, output) => {
      const weight = (stream.outputGains ? stream.outputGains[output] ?? 0 : 1) * channel.outputGain;
      if (weight) for (let at = 0; at < due; at++) channel.history[from + at]! += values[at]! * weight;
    });
    channel.sides?.forEach((side, index) => {
      side.history.length = from;
      for (const value of sideMix(lanes, stream.stereo![index]!, due, channel.outputGain)) side.history.push(value);
    });
    if (stream.feeds) {
      channel.lanes ??= [];
      for (let output = 0; output < Math.max(lanes.length, channel.lanes.length); output++) {
        const kept = channel.lanes[output] ??= [];
        kept.length = Math.min(kept.length, from);
        while (kept.length < from) kept.push(0);
        const values = lanes[output];
        for (let at = 0; at < due; at++) kept.push((values?.[at] ?? 0) * channel.outputGain);
      }
    }
    channel.written += due;
  };
  const renderChannels = (stream: typeof streams[number], channels: StreamChannel[], target: number) => {
    // A stream routed into another device is read by output at the speaker's
    // rate, before its speaker gain, as the other two paths keep it. Never
    // kept here, Berzerk's S14001A (at 20-35 kHz) fed its FILTER_VOLUME
    // nothing, and the speech was silent.
    const fed: Float64Array[] = [];
    let firstOutput = 0;
    for (const [index, channel] of channels.entries()) {
      updateChannel(stream, index, Math.floor((target - 1) * channel.rate / STREAM_AUDIO_RATE));
      const outputs = surfaces(stream.tag)[index]?.outputs ?? 1;
      const count = target - channel.rendered;
      if (count <= 0) { firstOutput += outputs; continue; }
      resampleChannel(channel, channel.rendered, count, stream.gain, channel.pending);
      for (const side of channel.sides ?? []) resampleChannel({ ...channel, history: side.history }, channel.rendered, count, 1, side.pending);
      if (stream.feeds && target > stream.rendered) {
        const shift = channel.rendered - stream.rendered;
        channel.lanes?.forEach((history, output) => {
          const out: number[] = [];
          resampleChannel({ ...channel, history, pending: out }, channel.rendered, count, 1, out);
          const lane = fed[firstOutput + output] ??= new Float64Array(target - stream.rendered);
          out.forEach((value, at) => { if (shift + at >= 0 && shift + at < lane.length) lane[shift + at]! += value; });
        });
      }
      firstOutput += outputs;
      channel.rendered = target;
      // Nothing behind the resampler's window is read again.
      const keep = Math.floor(target * channel.rate / STREAM_AUDIO_RATE) - 8 - channel.base;
      if (keep > RATE_CHANGE_HISTORY) {
        channel.history.splice(0, keep - RATE_CHANGE_HISTORY);
        for (const lane of channel.lanes ?? []) lane.splice(0, keep - RATE_CHANGE_HISTORY);
        for (const side of channel.sides ?? []) side.history.splice(0, keep - RATE_CHANGE_HISTORY);
        channel.base += keep - RATE_CHANGE_HISTORY;
      }
    }
    if (stream.feeds && target > stream.rendered) keep(stream, fed, target - stream.rendered, values => values);
    for (let index = stream.rendered; index < target; index++) {
      let sum = 0;
      for (const channel of channels) sum += channel.pending[index - stream.rendered] ?? 0;
      stream.pending.push(sum);
    }
    stream.sides?.forEach((pending, index) => {
      for (let at = stream.rendered; at < target; at++) {
        let sum = 0;
        for (const channel of channels) sum += channel.sides?.[index]?.pending[at - stream.rendered] ?? 0;
        pending.push(sum);
      }
      for (const channel of channels) channel.sides?.[index]?.pending.splice(0, target - stream.rendered);
    });
    for (const channel of channels) channel.pending.splice(0, target - stream.rendered);
    stream.rendered = Math.max(stream.rendered, target);
  };
  /** Renders a native-rate chip on to native sample `end`, kept as lead. */
  const renderNative = (stream: typeof streams[number], end: number, native: number) => {
    if (end <= stream.native) return;
    const { mixed, lanes } = update(stream.tag, end - stream.native, native, stream.outputGains, stream.inputs, stream.native);
    const lead = stream.lead;
    const behind = lead.mixed.length;
    for (const sample of mixed) lead.mixed.push(sample);
    lanes.forEach((values, output) => {
      const kept = lead.lanes[output] ??= [];
      while (kept.length < behind) kept.push(0);
      for (const sample of values) kept.push(sample);
    });
    for (const kept of lead.lanes) while (kept && kept.length < lead.mixed.length) kept.push(0);
    stream.native = end;
  };
  /**
   * A native-rate chip's samples from where the speaker last took them up to
   * `end`: those a write rendered ahead first (renderAhead), then new ones.
   */
  const takeNative = (stream: typeof streams[number], end: number, native: number): { mixed: Float64Array; lanes: Float64Array[] } => {
    const lead = stream.lead;
    if (!lead.mixed.length) {
      const fresh = update(stream.tag, Math.max(0, end - stream.native), native, stream.outputGains, stream.inputs, stream.native);
      stream.native = Math.max(stream.native, end);
      return fresh;
    }
    renderNative(stream, end, native);
    const count = Math.max(0, end - (stream.native - lead.mixed.length));
    const mixed = Float64Array.from(lead.mixed.splice(0, count));
    const lanes = lead.lanes.map(kept => Float64Array.from(kept ? kept.splice(0, count) : new Array<number>(count).fill(0)));
    return { mixed, lanes };
  };
  /**
   * `sound_stream::update()` before a register write: the chip renders
   * through the write's own sample, `floor(now * rate)` inclusive, as MAME's
   * does. The speaker-rate catch-up alone stopped at the last speaker sample,
   * up to 1/48000 s short. ymfm reads how far its stream has rendered when a
   * timer is loaded (timer B's `m_total_clocks & 15`), so one FM sample short
   * Bubble Bobble's YM2203 armed its timer 72 clocks long and the sound CPU
   * took its IRQ 24 us after MAME's (#278). A chip reading its feeders, which
   * are kept at the speaker's rate, still stops at the speaker sample.
   * At time zero MAME updates nothing (`machine().time().is_zero()`): a
   * write during power-on would render a DISCRETE device before its tasks
   * are set up, and Asteroids' never finished.
   */
  const renderAhead = (stream: typeof streams[number]) => {
    if (!(time() > 0)) return;
    const rate = context.deviceStreamRate?.(stream.tag) ?? 0;
    if (rate <= STREAM_AUDIO_RATE) {
      render(stream, now() + 1);
      return;
    }
    render(stream, now());
    if (stream.inputs?.length || stream.lofi.rate !== rate) return;
    renderNative(stream, Math.floor(time() * rate) + 1, rate);
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
    // The resampler reads absolute source indices, which hold at one rate: a
    // chip that changed its own (set_sample_rate) starts its history again.
    if (native && stream.lofi.rate !== native) {
      if (stream.lofi.rate) stream.native = Math.floor(stream.rendered * native / STREAM_AUDIO_RATE);
      stream.lead.mixed.length = 0;
      stream.lead.lanes.length = 0;
      stream.lofi.rate = native;
      stream.lofi.history.length = 0;
      for (const side of stream.lofi.sides ?? []) side.length = 0;
    }
    while (stream.rendered < target) {
      const due = Math.min(MAX_SAMPLES_PER_UPDATE, target - stream.rendered);
      if (!native) {
        const gain = stream.gain * stream.outputGain;
        const { mixed, lanes } = update(stream.tag, due, STREAM_AUDIO_RATE, stream.outputGains, stream.inputs, stream.rendered);
        for (const sample of mixed) stream.pending.push(sample * gain);
        stream.sides?.forEach((pending, side) => {
          for (const sample of sideMix(lanes, stream.stereo![side]!, due, stream.outputGain)) pending.push(sample);
        });
        if (stream.feeds) keep(stream, lanes, due, values => values);
        stream.rendered += due;
        continue;
      }
      const end = Math.floor((stream.rendered + due) * native / STREAM_AUDIO_RATE);
      const start = stream.native - stream.lead.mixed.length;
      const { mixed, lanes } = takeNative(stream, end, native);
      // Each output sample is the mean of the native ones it spans.
      const spans: [number, number][] = [];
      for (let index = stream.rendered, at = 0; index < stream.rendered + due; index++) {
        const stop = Math.min(mixed.length, Math.floor((index + 1) * native / STREAM_AUDIO_RATE) - start);
        spans.push([at, Math.max(at, stop)]);
        at = Math.max(at, stop);
      }
      const mean = (values: Float64Array): number[] => spans.map(([from, to]) => {
        let sum = 0;
        for (let at = from; at < to; at++) sum += values[at]!;
        return to > from ? sum / (to - from) : 0;
      });
      // To the speaker through MAME's own resampler (audio_resampler_lofi,
      // its default): blocks of 1 + fs/ft native samples averaged, then cubic
      // interpolation, which rolls the top octave off. A plain mean of each
      // output's span left an AY at 187.5 kHz up to 6.7 dB brighter than
      // MAME above 12 kHz (Mat Mania).
      const lofi = stream.lofi;
      if (!lofi.history.length) lofi.base = start;
      for (const sample of mixed) lofi.history.push(sample * stream.outputGain);
      const out: number[] = [];
      resampleChannel({ rate: native, outputGain: 1, written: end, base: lofi.base, history: lofi.history, rendered: stream.rendered, pending: out },
        stream.rendered, due, stream.gain, out);
      for (const sample of out) stream.pending.push(sample);
      lofi.sides?.forEach((history, side) => {
        for (const sample of sideMix(lanes, stream.stereo![side]!, mixed.length, stream.outputGain)) history.push(sample);
        resampleChannel({ rate: native, outputGain: 1, written: end, base: lofi.base, history, rendered: stream.rendered, pending: stream.sides![side]! },
          stream.rendered, due, 1, stream.sides![side]!);
      });
      // Nothing behind the resampler's window is read again.
      const behind = end - 8 * (2 + Math.floor(native / STREAM_AUDIO_RATE)) - lofi.base;
      if (behind > RATE_CHANGE_HISTORY) {
        lofi.history.splice(0, behind - RATE_CHANGE_HISTORY);
        for (const side of lofi.sides ?? []) side.splice(0, behind - RATE_CHANGE_HISTORY);
        lofi.base += behind - RATE_CHANGE_HISTORY;
      }
      if (stream.feeds) keep(stream, lanes, due, mean);
      stream.rendered += due;
    }
  };
  const now = () => Math.floor(time() * STREAM_AUDIO_RATE);
  // The netlist: each feeder renders at its own rate through the same stream
  // surface, every sample lands in the solver at its own time, earliest
  // first across the feeders, and the netlist is read once a speaker sample.
  const netlistNode = netlist ? {
    pending: [] as number[],
    rendered: 0,
    feeders: [...netlistFeeders].map(tag => ({
      tag,
      routes: netlist.feeds.filter(feed => feed.tag === tag),
      native: 0,
      lanes: [] as Float64Array[],
      start: 0,
      next: 0,
      observed: context.observeStreams?.includes(tag) ?? false,
      level: 0,
    })),
  } : undefined;
  const renderNetlist = (target: number): void => {
    if (!netlistNode || !netlist) return;
    while (netlistNode.rendered < target) {
      const count = Math.min(MAX_SAMPLES_PER_UPDATE, target - netlistNode.rendered);
      const end = (netlistNode.rendered + count) / STREAM_AUDIO_RATE;
      for (const feeder of netlistNode.feeders) {
        const rate = context.deviceStreamRate?.(feeder.tag) || STREAM_AUDIO_RATE;
        const last = Math.floor(end * rate);
        const due = Math.max(0, last - feeder.native);
        const { lanes } = update(feeder.tag, due, rate, undefined, undefined, feeder.native);
        feeder.lanes = lanes;

        feeder.start = feeder.native;
        feeder.next = feeder.native;
        feeder.native = last;
      }
      for (let index = 0; index < count; index++) {
        const at = (netlistNode.rendered + index + 1) / STREAM_AUDIO_RATE;
        for (;;) {
          let earliest: typeof netlistNode.feeders[number] | undefined;
          let earliestTime = Infinity;
          for (const feeder of netlistNode.feeders) {
            if (feeder.next >= feeder.native) continue;
            const rate = context.deviceStreamRate?.(feeder.tag) || STREAM_AUDIO_RATE;
            const when = (feeder.next + 1) / rate;
            if (when <= at && when < earliestTime) { earliest = feeder; earliestTime = when; }
          }
          if (!earliest) break;
          const offset = earliest.next - earliest.start;
          for (const route of earliest.routes) {
            let value = 0;
            if (route.output >= 0) value = earliest.lanes[route.output]?.[offset] ?? 0;
            else for (const lane of earliest.lanes) value += lane?.[offset] ?? 0;
            netlist.solver.set(route.input, value * route.gain, earliestTime);
          }
          if (earliest.observed) {
            let value = 0;
            for (const lane of earliest.lanes) value += lane?.[offset] ?? 0;
            earliest.level = value;
          }
          earliest.next++;
        }
        netlistNode.pending.push(netlist.solver.read(at));
        // A gate on a feeder (kungfum's MSM5205s into its netlist) watches
        // what it holds at each speaker sample, as a stream's is watched:
        // every native sample of a 384 kHz chip was millions of writes.
        for (const feeder of netlistNode.feeders) {
          if (feeder.observed) context.soundWrite(0, feeder.level, context.fraction(), `${feeder.tag}.stream`);
        }
      }
      // Every sample the feeders rendered is in the solver now; what is left
      // is scratch, and a save must not carry a buffer whose length is only
      // how far this chunk happened to reach.
      for (const feeder of netlistNode.feeders) feeder.lanes = [];
      netlistNode.rendered += count;
    }
  };
  // A save takes the netlist's node voltages and its feeders' positions too.
  if (netlistNode && netlist) Object.assign(state, { netlist: netlistNode, solver: netlist.solver });
  for (const feeder of netlistNode?.feeders ?? []) {
    // A feeder updates its stream before every write (an AY's register), as
    // MAME's does: the netlist catches up to now first.
    context.bindDeviceCall(feeder.tag, 'stream.update', () => { renderNetlist(now()); return 0; });
    context.bindDeviceCall(feeder.tag, 'stream.end_time', () => (netlistNode?.rendered ?? 0) / STREAM_AUDIO_RATE);
    context.bindDeviceCall(feeder.tag, 'stream.sample_rate', () => context.deviceStreamRate?.(feeder.tag) || STREAM_AUDIO_RATE);
  }
  for (const stream of streams) {
    const streamIndex = (surface: unknown) => surfaces(stream.tag).indexOf(surface as SoundStreamSurface);
    context.bindDeviceCall(stream.tag, 'stream.update', (surface?: unknown) => {
      const channels = channelsOf(stream);
      const index = streamIndex(surface);
      if (!channels || index < 0) {
        renderAhead(stream);
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
      const interpolated = (past: readonly number[]) => Array.from({ length: Math.min(written, RATE_CHANGE_HISTORY) }, (_unused, at) => {
        const position = (written - Math.min(written, RATE_CHANGE_HISTORY) + at) * channel.rate / next - channel.base;
        const whole = Math.floor(position);
        const near = past[whole] ?? 0;
        return near + (position - whole) * ((past[whole + 1] ?? 0) - near);
      });
      const history = interpolated(channel.history);
      for (const side of channel.sides ?? []) side.history = interpolated(side.history);
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
  // Nor has a processor that runs after the first: the mix reaches only as
  // far as every one of them has run. The first runs its whole slice of the
  // round before the next starts, so a mix up to its time rendered Juno
  // First's DAC before the i8039 had written the samples for that stretch.
  const reached = () => streams.reduce((target, stream) => {
    const seconds = context.deviceTime?.(stream.tag);
    return seconds === undefined ? target : Math.min(target, Math.floor(seconds * STREAM_AUDIO_RATE));
  }, Math.min(now(), Math.floor((context.settledTime?.() ?? Infinity) * STREAM_AUDIO_RATE)));
  const mix = () => {
    const target = reached();
    if (target <= state.emitted) return;
    for (const stream of streams) render(stream, target);
    if (netlistNode) renderNetlist(target);
    const frac = context.fraction();
    const muted = context.systemMuted?.() ?? false;
    for (const stream of observed) {
      for (let index = 0; index < target - state.emitted; index++) {
        context.soundWrite(0, stream.pending[index] ?? 0, frac, `${stream.tag}.stream`);
      }
    }
    for (let index = 0; index < target - state.emitted; index++) {
      let sum = 0;
      for (const stream of streams) sum += stream.pending[index] ?? 0;
      const centre = netlistNode ? netlistNode.pending[index] ?? 0 : 0;
      sum += centre;
      // MAME's speaker stage clamps the summed mix to 16 bits (sound.cpp), on
      // the raw sum, DC and all: boards that sum past full scale clip as
      // MAME's do (bankp's three SN76489As).
      if (!stereo) {
        emit(muted ? 0 : Math.max(-1, Math.min(1, sum)), frac);
        continue;
      }
      // A netlist's one output, and a device on no side, are in the centre.
      let left = centre;
      let right = centre;
      for (const stream of streams) {
        if (stream.ratio) {
          const mono = stream.pending[index] ?? 0;
          left += mono * stream.ratio[0];
          right += mono * stream.ratio[1];
        } else if (stream.sides) {
          left += stream.sides[0]![index] ?? 0;
          right += stream.sides[1]![index] ?? 0;
        } else {
          left += stream.pending[index] ?? 0;
          right += stream.pending[index] ?? 0;
        }
      }
      if (muted) emit(0, frac, 0, 0);
      else emit(Math.max(-1, Math.min(1, sum)), frac, Math.max(-1, Math.min(1, left)), Math.max(-1, Math.min(1, right)));
    }
    for (const stream of streams) {
      stream.pending.splice(0, target - state.emitted);
      for (const side of stream.sides ?? []) side.splice(0, target - state.emitted);
    }
    netlistNode?.pending.splice(0, target - state.emitted);
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
      driverTick.emitted = lastTick.emitted = -1;
      if (netlistNode) {
        netlistNode.pending.length = 0;
        netlistNode.rendered = 0;
        for (const feeder of netlistNode.feeders) {
          feeder.native = feeder.start = feeder.next = 0;
          feeder.lanes = [];
        }
      }
      for (const stream of streams) {
        stream.outputGain = 1;
        stream.rendered = 0;
        stream.native = 0;
        stream.pending.length = 0;
        stream.raw.length = 0;
        stream.rawBase = 0;
        stream.resampled = false;
        stream.channels.length = 0;
        stream.lofi.base = 0;
        stream.lofi.rate = 0;
        stream.lofi.history.length = 0;
        for (const side of stream.lofi.sides ?? []) side.length = 0;
        for (const side of stream.sides ?? []) side.length = 0;
      }
    },
    // After the first processor's slice, and after the last one's, which is
    // where a round of several processors has all of them at its end.
    tickCpu: (cpu, cycles) => {
      const tick = cpu === driver ? driverTick : cpu === last ? lastTick : undefined;
      if (!tick) return;
      // A perfect-quantum board ticks here once an instruction. The mix
      // reaches no further than this processor has run, so until it has run
      // the cycles a batch takes there is nothing to ask: asking anyway, the
      // question (every processor's time, every stream's) was a tenth of
      // Qix's frame and a fifth of the NES's.
      if (tick.emitted === state.emitted && (tick.cycles -= cycles) > 0) return;
      if (reached() - state.emitted >= MIX_BATCH) mix();
      tick.emitted = state.emitted;
      // `now` counts this slice only as far as its core reported (a
      // perfect-quantum slice reports its one-cycle target, whatever the
      // instruction took), so the slice's own cycles come off the count:
      // the next ask is never later than the tick the batch falls due on.
      // At the rate its cycles run now: Missile Command stretches its 6502's
      // clock line by line, and counted at the configured rate the slower
      // cycles ran past the batch.
      const clock = Math.max(1, context.cpuCycleClock?.(cpu) ?? tick.clock);
      tick.cycles = Math.floor(((state.emitted + MIX_BATCH) / STREAM_AUDIO_RATE - time()) * clock) - cycles - 1;
    },
    cpuTimeMoved: cpu => {
      if (cpu === driver) driverTick.emitted = -1;
      if (cpu === last) lastTick.emitted = -1;
    },
    endFrame: mix,
    renderTo: seconds => renderNetlist(Math.floor(seconds * STREAM_AUDIO_RATE)),
  };
}

/** Sound kind `stream`: the streams are the whole mix, played by the shared stream worklet. */
export function installStreamAudioRuntime(context: SoundRuntimeContext): SoundRuntimeHooks {
  const { sound } = context;
  const tags = soundTags(sound);
  const netlistTag = sound.netlist ? sound.netlistTag : undefined;
  const stereo = (sound.routes ?? []).some(route => route.stereo);
  const sources = tags.map((tag, chip): StreamSource => {
    // A route into another of the streams (POKEY into Battlezone's DISCRETE)
    // is that device's input, not the speaker's; one into the netlist is the
    // netlist's.
    const routes = (sound.routes ?? []).filter(route => route.chip === chip && !tags.includes(route.target) && route.target !== netlistTag);
    const inputs = (sound.routes ?? []).filter(route => route.target === tag && tags[route.chip] !== undefined)
      .map(route => ({ tag: tags[route.chip]!, output: route.channel, input: route.targetInput ?? 0, gain: route.gain }));
    const source: StreamSource = routes.length
      ? { tag, ...streamRouteGains(routes) }
      : { tag, gain: sound.routes?.some(route => route.chip === chip) ? 0 : 1 };
    // On a stereo board every device has its sides; one routed to no
    // speaker is silent on both, as it is in the mono mix.
    if (stereo) source.stereo = routes.length
      ? [stereoSideGains(routes, 0), stereoSideGains(routes, 1)]
      : [source.gain, source.gain];
    return inputs.length ? { ...source, inputs } : source;
  });
  // A slot card's own chips (an NES cartridge's VRC6), at their routes' gains.
  for (const descendant of context.streamDescendants?.() ?? []) {
    if (!sources.some(source => source.tag === descendant.tag)) {
      sources.push({ tag: descendant.tag, gain: descendant.gain, ...(stereo ? { stereo: [descendant.gain, descendant.gain] as const } : {}) });
    }
  }
  const netlist = sound.netlist && netlistTag ? {
    solver: new GeneratedNetlistSolver(sound.netlist, STREAM_AUDIO_RATE),
    feeds: (sound.routes ?? []).filter(route => route.target === netlistTag && tags[route.chip] !== undefined)
      .map(route => ({ tag: tags[route.chip]!, output: route.channel, input: route.targetInput ?? 0, gain: route.gain })),
  } : undefined;
  const mixer = createStreamMixer(context, sources, (sample, frac, left, right) => (left === undefined
    ? context.soundWrite(0, sample, frac, 'stream.pcm')
    : context.soundWrite(0, sample, frac, 'stream.pcm', left, right)), netlist);
  // The lines a driver writes into the netlist (`NETLIST_LOGIC_INPUT`), each
  // landing once the netlist has caught up to the write's time. A finder is
  // live once it is bound, which is what `if (m_audio_BD)` asks.
  (sound.netlistLogicInputs ?? []).forEach((input, index) => {
    const send = (value: number): number => {
      const seconds = context.time?.() ?? 0;
      mixer.renderTo?.(seconds);
      netlist?.solver.writeLogic(index, value, seconds);
      return 0;
    };
    const device = {
      write: (data: number) => send((data >> input.shift) & 1),
      write_line: (data: number) => send(data ? 1 : 0),
    };
    for (const alias of [input.deviceTag, ...input.members]) {
      context.calls[`${alias}.write`] = device.write;
      context.calls[`${alias}.write_line`] = device.write_line;
      const element = /^(\w+)\[(\d+)\]$/.exec(alias);
      if (element) ((context.state[element[1]!] ??= []) as unknown[])[Number(element[2])] = device;
      else context.state[alias] = device;
    }
  });
  // The numbers a driver writes into the netlist (`NETLIST_INT_INPUT`, Mario's
  // `m_audio_dac->write(data)`), landing as the logic lines do.
  (sound.netlistParamInputs ?? []).forEach((input, index) => {
    const device = {
      write: (data: number): number => {
        const seconds = context.time?.() ?? 0;
        mixer.renderTo?.(seconds);
        netlist?.solver.writeParam(index, ((data >>> input.shift) & input.mask) >>> 0, seconds);
        return 0;
      },
    };
    for (const alias of [input.deviceTag, ...input.members]) {
      context.calls[`${alias}.write`] = device.write;
      const element = /^(\w+)\[(\d+)\]$/.exec(alias);
      if (element) ((context.state[element[1]!] ??= []) as unknown[])[Number(element[2])] = device;
      else context.state[alias] = device;
    }
  });
  for (const finder of sound.netlistFinders ?? []) {
    const element = /^(\w+)\[(\d+)\]$/.exec(finder);
    if (element) ((context.state[element[1]!] ??= []) as unknown[])[Number(element[2])] ??= 1;
    else context.state[finder] ??= 1;
  }
  return mixer;
}
