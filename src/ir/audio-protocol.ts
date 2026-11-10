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

/**
 * The RP2A03's internal APU as rp2a03.cpp composes it: the sound device its
 * device_add_mconfig builds, the internal map that reaches it, and the CPU
 * line and space its callbacks drive. The APU itself is nes_apu.cpp compiled
 * whole; this is only how the CPU holds it.
 */
export interface GeneratedNesApuPlan {
  schemaVersion: 2;
  /** The APU's device type (`NES_APU`), built at the CPU's own clock. */
  type: string;
  /** Its tag under the CPU and the CPU's finder for it (`m_apu`). */
  tag: string;
  member: string;
  /** The CPU class whose map and callbacks these are. */
  cpuClass: string;
  /** The core's input line its irq() drives (`APU_IRQ_LINE`). */
  irqLine: string;
  /** The CPU space its mem_read() reads (the DMC's samples). */
  memReadSpace: 'program';
  /** rp2a03_map, each range's handler as MAME writes it. */
  internalMap: {
    ranges: {
      start: number;
      end: number;
      read?: { method: string; parameters: string; body: string };
      write?: { method: string; parameters: string; body: string };
      source: { file: string; line: number };
    }[];
  };
  sourceFiles: string[];
}
