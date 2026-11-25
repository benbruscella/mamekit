// Audio facts shared by the compiler and the stream runtime.

/** MAME's default post-mix speaker effect, extracted during generation. */
export interface GeneratedSpeakerFilterPlan {
  type: 'highpass';
  frequency: number;
  q: number;
  source: {
    file: string;
    line: number;
  };
}

/**
 * One MAME speaker's channels and where each sits, left to right: -1 left of
 * centre, 1 right, 0 centred (speaker.h's positions; an unplaced channel is
 * the centre). MAME's host mapping (sound.cpp `find_channel_mapping`) puts a
 * centred channel on both host channels at full volume and a side channel on
 * its own, and the host sums every speaker: what a listener hears in mono is
 * each centred channel whole plus half of each side channel.
 */
export interface GeneratedSpeakerLayout {
  tag: string;
  sides: number[];
}

/** A speaker channel's share of the mono a listener hears (see GeneratedSpeakerLayout). */
export function speakerChannelWeight(side: number): number {
  return side === 0 ? 1 : 0.5;
}

/**
 * One window of a sound chip's own address space 0 over its ROM region (the
 * Williams ADPCM OKI's banked low half and fixed upper half): a fixed slice of
 * the region, or a memory bank whose entries are region offsets.
 */
export interface GeneratedSampleWindow {
  start: number;
  end: number;
  /** Fixed `rom().region(...)` offset into the sample region. */
  regionOffset?: number;
  /** `bankr("tag")`: the entry offsets and which one is selected at start. */
  bank?: { tag: string; entryOffsets: (number | null)[]; initialEntry: number };
}

