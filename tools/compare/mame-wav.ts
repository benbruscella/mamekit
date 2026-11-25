/**
 * MAME's -wavwrite as a listener hears it, to set beside our capture.
 *
 * sound.cpp's `output_push` records each speaker's raw sum, one WAV channel
 * per speaker input, before the speaker's effect chain. A listener hears it
 * after that chain (its default is one 20 Hz highpass) and after the host
 * mapping, which plays a centred channel on both sides at full volume, a side
 * channel on its own side, and sums every speaker (`find_channel_mapping`).
 * Averaging the channels instead read a mono board with a silent second
 * speaker (the C64's 1541 floppy sound) 6 dB quiet, and leaving the highpass
 * out read a power-on step 3.01 dB loud on MAME's side.
 *
 * Pure but for the WAV read; the layout is the generated config's
 * `sound.speakers` and `sound.speakerFilter`.
 */

import type { GeneratedSpeakerFilterPlan, GeneratedSpeakerLayout } from '../../src/ir/audio-protocol.ts';
import { applySpeakerFilter } from '../../src/games/speaker-filter.ts';
import { readPcm16WavChannels } from './stereo-plan.ts';

export interface ListenerLayout {
  speakers?: readonly GeneratedSpeakerLayout[];
  speakerFilter?: GeneratedSpeakerFilterPlan;
}

/**
 * The side of each of MAME's WAV channels. The WAV holds the speakers of the
 * machine as it ran: a slot's or a medium's own speaker (a floppy drive's, a
 * cartridge's `addon`) can add channels the board's layout does not list.
 * Those are centred (every one in MAME's devices is `front_center()`), which
 * only places them when the board has no side channel either; otherwise which
 * channel is which cannot be told, and that is an error, not a guess.
 */
export function wavChannelSides(count: number, speakers: readonly GeneratedSpeakerLayout[] | undefined): number[] {
  const listed = (speakers ?? []).flatMap(speaker => speaker.sides);
  if (listed.length === count) return listed;
  if (listed.every(side => side === 0)) return Array.from({ length: count }, () => 0);
  throw new Error(`MAME's WAV has ${count} channels and the board's speakers ${listed.length}, ` +
    `some off centre (${(speakers ?? []).map(speaker => `${speaker.tag} [${speaker.sides.join(' ')}]`).join(', ')}): ` +
    'its channels cannot be placed');
}

export interface ListenerSound {
  rate: number;
  left: Float32Array;
  right: Float32Array;
  /** (left + right) / 2: each centred channel whole, half of each side one. */
  mono: Float32Array;
}

/** MAME's channels as a listener hears them, the speaker effect applied. */
export function foldForListener(
  wav: { rate: number; channels: Float32Array[] },
  layout: ListenerLayout,
): ListenerSound {
  const sides = wavChannelSides(wav.channels.length, layout.speakers);
  const length = wav.channels[0]?.length ?? 0;
  const left = new Float32Array(length);
  const right = new Float32Array(length);
  wav.channels.forEach((channel, index) => {
    const side = sides[index]!;
    for (let sample = 0; sample < length; sample++) {
      if (side <= 0) left[sample]! += channel[sample]!;
      if (side >= 0) right[sample]! += channel[sample]!;
    }
  });
  // The host mix adds each speaker channel into its host channel with a
  // clamp (sound.cpp's ADD mixing step), after the speaker's effect chain.
  const hostClamp = (samples: Float32Array) => samples.map(value => Math.max(-1, Math.min(1, value)));
  const filteredLeft = hostClamp(applySpeakerFilter(left, layout.speakerFilter, wav.rate));
  const filteredRight = hostClamp(applySpeakerFilter(right, layout.speakerFilter, wav.rate));
  const mono = filteredLeft.map((value, index) => (value + filteredRight[index]!) / 2);
  return { rate: wav.rate, left: filteredLeft, right: filteredRight, mono };
}

export function readMameWavForListener(path: string, layout: ListenerLayout): ListenerSound {
  return foldForListener(readPcm16WavChannels(path), layout);
}
