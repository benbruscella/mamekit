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

