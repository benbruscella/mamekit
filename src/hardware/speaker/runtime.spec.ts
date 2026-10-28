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
    advance(by: number) {
      seconds += by;
      hooks.tickCpu!('cpu', 1);
    },
  };
};

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
// rate, and each output sample is the mean of the native samples it spans.
{
  const rendered: { count: number; rate: number }[] = [];
  let level = 0;
  const chip = mixer({ chip: STREAM_AUDIO_RATE * 4 }, (_tag, surface) => {
    rendered.push({ count: surface.samples(), rate: surface.sample_rate() });
    for (let index = 0; index < surface.samples(); index++) surface.put(0, index, level++ % 4 < 2 ? 1 : 0);
  });
  chip.advance(3 / STREAM_AUDIO_RATE);
  assert.deepEqual(rendered, [{ count: 12, rate: STREAM_AUDIO_RATE * 4 }], 'four native samples per output sample');
  assert.deepEqual(chip.emitted, [0.25, 0.25, 0.25], 'the mean of each four, at the route gain');
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
