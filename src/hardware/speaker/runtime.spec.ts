import assert from 'node:assert/strict';
import { createStreamMixer } from './runtime.ts';
import { STREAM_AUDIO_RATE } from './definition.ts';
import type { SoundRuntimeContext } from '../sound-runtime.ts';

// The stream mixer asks each device for the samples elapsed time is worth,
// through MAME's own `sound_stream` surface, and emits their routed sum.
type Surface = {
  samples(): number; sample_rate(): number; put(channel: number, index: number, value: number): number;
  fill(channel: number, value: number): void;
};
const mixer = (
  rates: Record<string, number>,
  render: (tag: string, surface: Surface) => void,
  deviceTime?: (tag: string) => number | undefined,
) => {
  let seconds = 0;
  const emitted: number[] = [];
  const calls: Record<string, (...args: number[]) => unknown> = {};
  const hooks = createStreamMixer({
    board: { execution: { cpus: [{ tag: 'cpu' }] } },
    calls,
    deviceTime,
    time: () => seconds,
    fraction: () => 0,
    bindDeviceCall: () => undefined,
    deviceStreamRate: (tag: string) => rates[tag],
    callDevice: (tag: string, _method: string, surface: Surface) => { render(tag, surface); return 0; },
  } as unknown as SoundRuntimeContext, Object.keys(rates).map(tag => ({ tag, gain: 0.5 })), sample => emitted.push(sample));
  return {
    emitted,
    calls,
    // A CPU slice that ends the frame, which mixes whatever it brought.
    advance(by: number) {
      seconds += by;
      hooks.tickCpu!('cpu', 1);
      hooks.endFrame!();
    },
    // A slice within a frame, which mixes once a batch is due.
    slice(by: number) {
      seconds += by;
      hooks.tickCpu!('cpu', 1);
    },
  };
};

// Within a frame the mix waits for a batch; the frame's end takes the rest.
// A device updating itself renders either way, so the samples are the same.
{
  const speaker = mixer({ speaker: STREAM_AUDIO_RATE }, (_tag, surface) => {
    for (let index = 0; index < surface.samples(); index++) surface.put(0, index, 1);
  });
  speaker.slice(10 / STREAM_AUDIO_RATE);
  assert.deepEqual(speaker.emitted, [], 'ten samples are not a batch');
  speaker.slice(300 / STREAM_AUDIO_RATE);
  assert.equal(speaker.emitted.length, 310, 'a batch mixes everything due');
  speaker.advance(5 / STREAM_AUDIO_RATE);
  assert.equal(speaker.emitted.length, 315, 'the frame end mixes the rest');
}

// A device at the speaker's rate renders one sample per output sample.
{
  const calls: number[] = [];
  const speaker = mixer({ speaker: STREAM_AUDIO_RATE }, (_tag, surface) => {
    calls.push(surface.samples());
    for (let index = 0; index < surface.samples(); index++) surface.put(0, index, 1);
  });
  speaker.advance(10 / STREAM_AUDIO_RATE);
  assert.deepEqual(calls, [10]);
  assert.deepEqual(speaker.emitted, Array(10).fill(0.5), 'each sample at its route gain');
}

// A chip that allocated its stream at its own clock steps once a native
// sample -- an NES cartridge's VRC6 runs at 1.79 MHz -- so it renders at that
// rate, and reaches the speaker through MAME's own resampler
// (audio_resampler_lofi): blocks of 1 + fs/ft native samples averaged, cubic
// interpolation between them, two source samples behind.
{
  const rendered: { count: number; rate: number }[] = [];
  const chip = mixer({ chip: STREAM_AUDIO_RATE * 4 }, (_tag, surface) => {
    rendered.push({ count: surface.samples(), rate: surface.sample_rate() });
    for (let index = 0; index < surface.samples(); index++) surface.put(0, index, 1);
  });
  chip.advance(3 / STREAM_AUDIO_RATE);
  assert.deepEqual(rendered, [{ count: 12, rate: STREAM_AUDIO_RATE * 4 }], 'four native samples per output sample');
  chip.advance(61 / STREAM_AUDIO_RATE);
  assert.deepEqual(chip.emitted.slice(0, 2), [0, 0], 'the resampler starts two source samples behind');
  for (const sample of chip.emitted.slice(8)) assert.ok(Math.abs(sample - 0.5) < 1e-6, `a held level settles at the route gain (MAME's tables are float32) (${sample})`);
}

// MAME's `stream.fill`, which a POKEY's sound_stream_update uses, and the
// device's set_output_gain over its route gain (Gauntlet's mixer_w).
{
  const pokey = mixer({ pokey: STREAM_AUDIO_RATE }, (_tag, surface) => surface.fill(0, 1));
  pokey.advance(2 / STREAM_AUDIO_RATE);
  pokey.calls['m_pokey.set_output_gain']!(-1, 0.5);
  pokey.advance(2 / STREAM_AUDIO_RATE);
  assert.deepEqual(pokey.emitted, [0.5, 0.5, 0.25, 0.25]);
}

// A device the round runs after the CPUs is mixed only as far as it has run:
// what it has not reached yet may still change.
{
  let reached = 0;
  const pokey = mixer({ pokey: STREAM_AUDIO_RATE }, (_tag, surface) => surface.fill(0, 1), () => reached);
  pokey.advance(4 / STREAM_AUDIO_RATE);
  assert.deepEqual(pokey.emitted, [], 'nothing past where the device stands');
  reached = 3 / STREAM_AUDIO_RATE;
  pokey.advance(0);
  assert.equal(pokey.emitted.length, 3);
}

console.log('speaker/runtime.spec: speaker-rate and native-rate streams mix at their route gains');

// A chip below the speaker's rate that only feeds another stream device --
// Berzerk's S14001A at 20-35 kHz into its FILTER_VOLUME -- is read by that
// device, resampled, at the speaker's rate. Never kept for its reader, the
// filter heard silence.
{
  let seconds = 0;
  const emitted: number[] = [];
  const chipSurface = { rate: 24000, outputs: 1, inputs: 0, samples: () => 0, put: (..._: number[]) => 0, add: (..._: number[]) => 0 };
  const hooks = createStreamMixer({
    board: { execution: { cpus: [{ tag: 'cpu' }] } },
    calls: {},
    time: () => seconds,
    fraction: () => 0,
    bindDeviceCall: () => undefined,
    deviceStreamRate: (tag: string) => (tag === 'chip' ? 24000 : STREAM_AUDIO_RATE),
    deviceStreams: (tag: string) => (tag === 'chip' ? [chipSurface] : []),
    callDevice: (tag: string, _method: string, surface: Surface & { get(input: number, index: number): number }) => {
      for (let index = 0; index < surface.samples(); index++) surface.put(0, index, tag === 'chip' ? 1 : surface.get(0, index));
      return 0;
    },
  } as unknown as SoundRuntimeContext, [
    { tag: 'chip', gain: 0 },
    { tag: 'filter', gain: 0.5, inputs: [{ tag: 'chip', output: -1, input: 0, gain: 1 }] },
  ], sample => emitted.push(sample));
  // The chip's stream starts with the first frame, as a board's does.
  seconds = 1 / STREAM_AUDIO_RATE;
  hooks.tickCpu!('cpu', 1);
  hooks.endFrame!();
  seconds = 0.05;
  hooks.tickCpu!('cpu', 1);
  hooks.endFrame!();
  assert.ok(emitted.length >= 2000, 'the frame mixed');
  assert.ok(Math.abs(emitted.at(-1)! - 0.5) < 1e-6, `the filter passes its slow feeder (${emitted.at(-1)})`);
}
