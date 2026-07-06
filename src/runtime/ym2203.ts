// YM2203 (OPN) — 3-channel 4-operator FM synthesis + SSG (AY-3-8910
// compatible) PSG, mono per section. Hand-ported from MAME's ymfm library:
//   3rdparty/ymfm/src/ymfm_opn.cpp/.h  (opn_registers_base<false>, ym2203)
//   3rdparty/ymfm/src/ymfm_fm.ipp/.h   (fm_operator/fm_channel/fm_engine_base)
//   3rdparty/ymfm/src/ymfm.h           (roundtrip_fp DAC quantization)
// with the SSG half reusing this repo's AY8910 core (ay8910.ts) instead of
// ymfm_ssg.cpp — ymfm's SSG clocks tones/noise with the exact semantics
// ay8910.ts already implements (samples at effective-clock/8, tone toggles
// every TP samples, noise LFSR at half rate).
//
// Ghosts 'n Goblins drives two of these at 12 MHz / 8 = 1.5 MHz, write-only
// (Z80 map: 0xe000/0xe001 = ym1 address/data, 0xe002/0xe003 = ym2). The
// worklet (ym2203-worklet.ts) hosts the pair; the board forwards writes as
// offset = chip*2 + (0 = address, 1 = data).
//
// Output streams and MAME routing (verified against the MAME source):
// - ymfm's ym2203 chip emits output 0 = FM, outputs 1-3 = SSG A/B/C
//   (ymfm_opn.h: ssg_resampler<output_data, 1, false>).
// - The MAME device wrapper ROTATES chip outputs by SSG_OUTPUTS = 3 so the
//   *stream* order is the traditional SSG-first (ymfm_mame.h
//   ymfm_ssg_device_base::sound_stream_update: "ymfm outputs FM first, then
//   SSG, while MAME traditionally wants SSG streams first").
//   => device stream outputs 0,1,2 = SSG A,B,C and stream output 3 = FM.
// - gng.cpp routes stream outputs 0,1,2 (SSG) at gain 0.40 each and stream
//   output 3 (FM) at gain 0.20; the worklet applies the equivalent mix (see
//   YM2203_FM_GAIN / YM2203_SSG_GAIN below for the exact scaling math).
//
// Native sample rates (prescaler-dependent; ymfm_opn.h rate table):
//   prescale 6 (default): FM = clock/72, SSG behaves as an AY at clock/2
//                         (native AY rate clock/16)
//   prescale 3:           FM = clock/36, AY at clock   (rate clock/8)
//   prescale 2:           FM = clock/24, AY at clock*2 (rate clock/4)
// The prescaler is set by *address* writes 0x2d/0x2e/0x2f (ymfm_opn.cpp
// ym2203::write_address): 0x2d -> 6, 0x2e -> 3 (only honored while the
// prescale is 6), 0x2f -> 2. renderFm/renderSsg each emit one sample per
// native tick of their section; the host resamples both (fmSampleRate /
// ssgSampleRate) to the output rate.
//
// Deliberate deviations from MAME (all inaudible for gng, which never reads
// the chip):
// - Timers A/B are register stubs: reg 0x24-0x27 writes are accepted and
//   stored (0x27's CSM/multi-frequency mode bits ARE honored for frequency
//   selection), but no timer counts, no status flags, no IRQ callback, and
//   no CSM key-on triggering. readStatus() always returns 0 (never busy).
// - The SSG half is the repo's AY-3-8910 core: AY 16-step envelope and
//   16-level DAC rather than the YM2149's 32 (the SSG in a real YM2203 is
//   YM2149-flavored). Tone/noise behavior is identical.
// - No FM-sample smearing: ymfm repeats each FM sample N times inside a
//   combined output stream; here the FM stream is emitted at its own native
//   rate and the worklet's box-filter resampler does the equivalent hold.

import { AY8910 } from './ay8910.ts';

// ---------------------------------------------------------------------------
// Global table lookups (ymfm_fm.ipp, extracted from the OPN die)

/**
 * Log-sin table: given a phase 0-1023 mapped over 2*PI, returns
 * |sin| as a 4.8 logarithmic attenuation for the first half; callers OR in
 * the sign. Values verbatim from ymfm_fm.ipp abs_sin_attenuation (1/4 phase,
 * mirrored/inverted for the other quadrants).
 */
const SIN_TABLE: readonly number[] = [
  0x859, 0x6c3, 0x607, 0x58b, 0x52e, 0x4e4, 0x4a6, 0x471, 0x443, 0x41a, 0x3f5, 0x3d3, 0x3b5, 0x398, 0x37e, 0x365,
  0x34e, 0x339, 0x324, 0x311, 0x2ff, 0x2ed, 0x2dc, 0x2cd, 0x2bd, 0x2af, 0x2a0, 0x293, 0x286, 0x279, 0x26d, 0x261,
  0x256, 0x24b, 0x240, 0x236, 0x22c, 0x222, 0x218, 0x20f, 0x206, 0x1fd, 0x1f5, 0x1ec, 0x1e4, 0x1dc, 0x1d4, 0x1cd,
  0x1c5, 0x1be, 0x1b7, 0x1b0, 0x1a9, 0x1a2, 0x19b, 0x195, 0x18f, 0x188, 0x182, 0x17c, 0x177, 0x171, 0x16b, 0x166,
  0x160, 0x15b, 0x155, 0x150, 0x14b, 0x146, 0x141, 0x13c, 0x137, 0x133, 0x12e, 0x129, 0x125, 0x121, 0x11c, 0x118,
  0x114, 0x10f, 0x10b, 0x107, 0x103, 0x0ff, 0x0fb, 0x0f8, 0x0f4, 0x0f0, 0x0ec, 0x0e9, 0x0e5, 0x0e2, 0x0de, 0x0db,
  0x0d7, 0x0d4, 0x0d1, 0x0cd, 0x0ca, 0x0c7, 0x0c4, 0x0c1, 0x0be, 0x0bb, 0x0b8, 0x0b5, 0x0b2, 0x0af, 0x0ac, 0x0a9,
  0x0a7, 0x0a4, 0x0a1, 0x09f, 0x09c, 0x099, 0x097, 0x094, 0x092, 0x08f, 0x08d, 0x08a, 0x088, 0x086, 0x083, 0x081,
  0x07f, 0x07d, 0x07a, 0x078, 0x076, 0x074, 0x072, 0x070, 0x06e, 0x06c, 0x06a, 0x068, 0x066, 0x064, 0x062, 0x060,
  0x05e, 0x05c, 0x05b, 0x059, 0x057, 0x055, 0x053, 0x052, 0x050, 0x04e, 0x04d, 0x04b, 0x04a, 0x048, 0x046, 0x045,
  0x043, 0x042, 0x040, 0x03f, 0x03e, 0x03c, 0x03b, 0x039, 0x038, 0x037, 0x035, 0x034, 0x033, 0x031, 0x030, 0x02f,
  0x02e, 0x02d, 0x02b, 0x02a, 0x029, 0x028, 0x027, 0x026, 0x025, 0x024, 0x023, 0x022, 0x021, 0x020, 0x01f, 0x01e,
  0x01d, 0x01c, 0x01b, 0x01a, 0x019, 0x018, 0x017, 0x017, 0x016, 0x015, 0x014, 0x014, 0x013, 0x012, 0x011, 0x011,
  0x010, 0x00f, 0x00f, 0x00e, 0x00d, 0x00d, 0x00c, 0x00c, 0x00b, 0x00a, 0x00a, 0x009, 0x009, 0x008, 0x008, 0x007,
  0x007, 0x007, 0x006, 0x006, 0x005, 0x005, 0x005, 0x004, 0x004, 0x004, 0x003, 0x003, 0x003, 0x002, 0x002, 0x002,
  0x002, 0x001, 0x001, 0x001, 0x001, 0x001, 0x001, 0x001, 0x000, 0x000, 0x000, 0x000, 0x000, 0x000, 0x000, 0x000,
];

/** abs_sin_attenuation (ymfm_fm.ipp): 10-bit phase -> 4.8 log attenuation. */
export function absSinAttenuation(input: number): number {
  // if the top bit is set we're in the mirrored second half of the curve
  if (input & 0x100) input = ~input;
  return SIN_TABLE[input & 0xff];
}

/**
 * Power table mantissas (10-bit with implied leading bit), verbatim from
 * ymfm_fm.ipp attenuation_to_volume; stored pre-transformed as
 * ((a | 0x400) << 2) exactly like the C++ (X macro).
 */
const POWER_TABLE: Uint16Array = (() => {
  const mantissas = [
    0x3fa, 0x3f5, 0x3ef, 0x3ea, 0x3e4, 0x3df, 0x3da, 0x3d4, 0x3cf, 0x3c9, 0x3c4, 0x3bf, 0x3b9, 0x3b4, 0x3ae, 0x3a9,
    0x3a4, 0x39f, 0x399, 0x394, 0x38f, 0x38a, 0x384, 0x37f, 0x37a, 0x375, 0x370, 0x36a, 0x365, 0x360, 0x35b, 0x356,
    0x351, 0x34c, 0x347, 0x342, 0x33d, 0x338, 0x333, 0x32e, 0x329, 0x324, 0x31f, 0x31a, 0x315, 0x310, 0x30b, 0x306,
    0x302, 0x2fd, 0x2f8, 0x2f3, 0x2ee, 0x2e9, 0x2e5, 0x2e0, 0x2db, 0x2d6, 0x2d2, 0x2cd, 0x2c8, 0x2c4, 0x2bf, 0x2ba,
    0x2b5, 0x2b1, 0x2ac, 0x2a8, 0x2a3, 0x29e, 0x29a, 0x295, 0x291, 0x28c, 0x288, 0x283, 0x27f, 0x27a, 0x276, 0x271,
    0x26d, 0x268, 0x264, 0x25f, 0x25b, 0x257, 0x252, 0x24e, 0x249, 0x245, 0x241, 0x23c, 0x238, 0x234, 0x230, 0x22b,
    0x227, 0x223, 0x21e, 0x21a, 0x216, 0x212, 0x20e, 0x209, 0x205, 0x201, 0x1fd, 0x1f9, 0x1f5, 0x1f0, 0x1ec, 0x1e8,
    0x1e4, 0x1e0, 0x1dc, 0x1d8, 0x1d4, 0x1d0, 0x1cc, 0x1c8, 0x1c4, 0x1c0, 0x1bc, 0x1b8, 0x1b4, 0x1b0, 0x1ac, 0x1a8,
    0x1a4, 0x1a0, 0x19c, 0x199, 0x195, 0x191, 0x18d, 0x189, 0x185, 0x181, 0x17e, 0x17a, 0x176, 0x172, 0x16f, 0x16b,
    0x167, 0x163, 0x160, 0x15c, 0x158, 0x154, 0x151, 0x14d, 0x149, 0x146, 0x142, 0x13e, 0x13b, 0x137, 0x134, 0x130,
    0x12c, 0x129, 0x125, 0x122, 0x11e, 0x11b, 0x117, 0x114, 0x110, 0x10c, 0x109, 0x106, 0x102, 0x0ff, 0x0fb, 0x0f8,
    0x0f4, 0x0f1, 0x0ed, 0x0ea, 0x0e7, 0x0e3, 0x0e0, 0x0dc, 0x0d9, 0x0d6, 0x0d2, 0x0cf, 0x0cc, 0x0c8, 0x0c5, 0x0c2,
    0x0be, 0x0bb, 0x0b8, 0x0b5, 0x0b1, 0x0ae, 0x0ab, 0x0a8, 0x0a4, 0x0a1, 0x09e, 0x09b, 0x098, 0x094, 0x091, 0x08e,
    0x08b, 0x088, 0x085, 0x082, 0x07e, 0x07b, 0x078, 0x075, 0x072, 0x06f, 0x06c, 0x069, 0x066, 0x063, 0x060, 0x05d,
    0x05a, 0x057, 0x054, 0x051, 0x04e, 0x04b, 0x048, 0x045, 0x042, 0x03f, 0x03c, 0x039, 0x036, 0x033, 0x030, 0x02d,
    0x02a, 0x028, 0x025, 0x022, 0x01f, 0x01c, 0x019, 0x016, 0x014, 0x011, 0x00e, 0x00b, 0x008, 0x006, 0x003, 0x000,
  ];
  const t = new Uint16Array(256);
  for (let i = 0; i < 256; i++) t[i] = (mantissas[i] | 0x400) << 2;
  return t;
})();

/**
 * attenuation_to_volume (ymfm_fm.ipp): 5.8 fixed-point log attenuation ->
 * 13-bit linear volume.
 */
export function attenuationToVolume(input: number): number {
  return POWER_TABLE[input & 0xff] >> (input >> 8);
}

/**
 * attenuation_increment (ymfm_fm.ipp): 6-bit ADSR rate + 3-bit step index ->
 * 4-bit attenuation increment.
 */
const INCREMENT_TABLE: readonly number[] = [
  0x00000000, 0x00000000, 0x10101010, 0x10101010, // 0-3    (0x00-0x03)
  0x10101010, 0x10101010, 0x11101110, 0x11101110, // 4-7    (0x04-0x07)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 8-11   (0x08-0x0B)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 12-15  (0x0C-0x0F)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 16-19  (0x10-0x13)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 20-23  (0x14-0x17)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 24-27  (0x18-0x1B)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 28-31  (0x1C-0x1F)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 32-35  (0x20-0x23)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 36-39  (0x24-0x27)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 40-43  (0x28-0x2B)
  0x10101010, 0x10111010, 0x11101110, 0x11111110, // 44-47  (0x2C-0x2F)
  0x11111111, 0x21112111, 0x21212121, 0x22212221, // 48-51  (0x30-0x33)
  0x22222222, 0x42224222, 0x42424242, 0x44424442, // 52-55  (0x34-0x37)
  0x44444444, 0x84448444, 0x84848484, 0x88848884, // 56-59  (0x38-0x3B)
  0x88888888, 0x88888888, 0x88888888, 0x88888888, // 60-63  (0x3C-0x3F)
];

export function attenuationIncrement(rate: number, index: number): number {
  return (INCREMENT_TABLE[rate] >>> (4 * index)) & 0x0f;
}

/**
 * detune_adjustment (ymfm_fm.ipp): 5-bit keycode + 3-bit detune -> signed
 * 6-bit phase displacement (bit 2 of detune selects the sign).
 */
const DETUNE_TABLE: readonly (readonly number[])[] = [
  [0, 0, 1, 2], [0, 0, 1, 2], [0, 0, 1, 2], [0, 0, 1, 2],
  [0, 1, 2, 2], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3],
  [0, 1, 2, 4], [0, 1, 3, 4], [0, 1, 3, 4], [0, 1, 3, 5],
  [0, 2, 4, 5], [0, 2, 4, 6], [0, 2, 4, 6], [0, 2, 5, 7],
  [0, 2, 5, 8], [0, 3, 6, 8], [0, 3, 6, 9], [0, 3, 7, 10],
  [0, 4, 8, 11], [0, 4, 8, 12], [0, 4, 9, 13], [0, 5, 10, 14],
  [0, 5, 11, 16], [0, 6, 12, 17], [0, 6, 13, 19], [0, 7, 14, 20],
  [0, 8, 16, 22], [0, 8, 16, 22], [0, 8, 16, 22], [0, 8, 16, 22],
];

export function detuneAdjustment(detune: number, keycode: number): number {
  const result = DETUNE_TABLE[keycode][detune & 3];
  return (detune & 4) ? -result : result;
}

/**
 * OPN keycode (opn_registers_base::cache_operator_data): 14-bit
 * block(3)+fnum(11) -> 5-bit keycode. Top 4 bits of block_freq, plus a low
 * bit derived from the YM2608-manual formula
 * (F11 & (F10|F9|F8)) | (!F11 & F10 & F9 & F8), looked up as bits of 0xfe80.
 */
export function opnKeycode(blockFreq: number): number {
  return (((blockFreq >> 10) & 0x0f) << 1) | ((0xfe80 >> ((blockFreq >> 7) & 0x0f)) & 1);
}

/**
 * OPN phase step (opn_registers_base::compute_phase_step, no LFO on
 * YM2203): 14-bit block+fnum, signed detune, and the x.1 multiple value
 * (multiple 0 caches as 1, otherwise multiple*2) -> 10.10 phase increment.
 */
export function opnPhaseStep(blockFreq: number, detune: number, multipleX1: number): number {
  const fnum = (blockFreq & 0x7ff) << 1;
  const block = (blockFreq >> 11) & 7;
  let step = (fnum << block) >> 2;
  step += detune;
  step &= 0x1ffff; // clamp to 17 bits in case detune underflows/overflows
  return (step * multipleX1) >> 1;
}

/**
 * roundtrip_fp (ymfm.h): the YM2203 DAC is a 3.10 floating-point converter;
 * this zeroes the mantissa bits a 16-bit value loses through it.
 */
export function roundtripFp(value: number): number {
  if (value < -32768) return -32768;
  if (value > 32767) return 32767;
  // count the leading sign bits after the sign to find the exponent
  const scanvalue = value ^ (value >> 31);
  let exponent = 7 - Math.clz32((scanvalue << 17) >>> 0);
  exponent = Math.max(exponent, 1) - 1;
  const mask = (1 << exponent) - 1;
  return value & ~mask;
}

// ---------------------------------------------------------------------------
// FM engine constants (opn_registers_base<false> in ymfm_opn.h)

const CHANNELS = 3;
// envelope states (ymfm.h envelope_state; erasableSyntaxOnly forbids enums)
const EG_ATTACK = 1;
const EG_DECAY = 2;
const EG_SUSTAIN = 3;
const EG_RELEASE = 4;
/** attenuation above this is "effectively off" (ymfm_fm.h EG_QUIET) */
const EG_QUIET = 0x380;

/**
 * Algorithm connection table (ymfm_fm.ipp s_algorithm_ops, OPN entries 0-7).
 * Bit fields: [0] op2 input, [1-3] op3 input, [4-6] op4 input (indices into
 * the opout array), [7] add op1 to sum, [8] add op2, [9] add op3; op4 is
 * always summed.
 */
const ALGORITHM_OPS: readonly number[] = (() => {
  const alg = (op2in: number, op3in: number, op4in: number, op1out: number, op2out: number, op3out: number) =>
    op2in | (op3in << 1) | (op4in << 4) | (op1out << 7) | (op2out << 8) | (op3out << 9);
  return [
    alg(1, 2, 3, 0, 0, 0), // 0: O1 -> O2 -> O3 -> O4 -> out (O4)
    alg(0, 5, 3, 0, 0, 0), // 1: (O1 + O2) -> O3 -> O4 -> out (O4)
    alg(0, 2, 6, 0, 0, 0), // 2: (O1 + (O2 -> O3)) -> O4 -> out (O4)
    alg(1, 0, 7, 0, 0, 0), // 3: ((O1 -> O2) + O3) -> O4 -> out (O4)
    alg(1, 0, 3, 0, 1, 0), // 4: ((O1 -> O2) + (O3 -> O4)) -> out (O2+O4)
    alg(1, 1, 1, 0, 1, 1), // 5: ((O1 -> O2) + (O1 -> O3) + (O1 -> O4)) -> out
    alg(1, 0, 0, 0, 1, 1), // 6: ((O1 -> O2) + O3 + O4) -> out (O2+O3+O4)
    alg(0, 0, 0, 1, 1, 1), // 7: (O1 + O2 + O3 + O4) -> out (all)
  ];
})();

/** 10-bit phase -> 4.8 log-sin attenuation with sign in bit 15 (waveform 0). */
const WAVEFORM: Uint16Array = (() => {
  const t = new Uint16Array(1024);
  for (let i = 0; i < 1024; i++) t[i] = absSinAttenuation(i) | (((i >> 9) & 1) << 15);
  return t;
})();

/** effective_rate (ymfm_fm.h): apply KSR to a raw ADSR rate. */
function effectiveRate(rawrate: number, ksr: number): number {
  return rawrate === 0 ? 0 : Math.min(rawrate + ksr, 63);
}

interface FmOperator {
  /** register offset (channel + 4*slot: 0-2, 4-6, 8-10, 12-14) */
  opoffs: number;
  /** channel register offset (0-2) */
  choffs: number;
  /** 10.10 phase accumulator (uint32 wraparound) */
  phase: number;
  /** 10-bit envelope attenuation (4.6 fixed point) */
  envAttenuation: number;
  envState: number;
  ssgInverted: boolean;
  keyState: number;
  keyonLive: number;
  // opdata_cache
  cachePhaseStep: number;
  cacheTotalLevel: number;
  cacheBlockFreq: number;
  cacheDetune: number;
  cacheMultiple: number;
  cacheEgSustain: number;
  cacheEgRate: number[]; // indexed by envelope state
}

interface FmChannel {
  choffs: number;
  feedback0: number;
  feedback1: number;
  feedbackIn: number;
  /** operators in ymfm m_op order: [op1, op2, op3, op4] of the ALGORITHM
   * diagrams; register offsets choffs + [0, 8, 4, 12] respectively
   * (opn operator_map: register slot order is op1, op3, op2, op4). */
  ops: FmOperator[];
}

// ---------------------------------------------------------------------------
// Worklet mix gains (gng's MAME routes, converted to this core's scales)
//
// MAME (gng.cpp): SSG streams A/B/C at 0.40 each, FM stream at 0.20, where
// stream samples are chip values / 32768:
// - FM: renderFm() already emits (3-channel sum, clamped +/-32767) / 32768,
//   so the FM route gain applies directly.
export const YM2203_FM_GAIN = 0.20;
// - SSG: ymfm's per-channel full-scale amplitude is 16382 (ymfm_ssg.cpp
//   s_amplitudes), i.e. 16382/32768 unipolar per channel = an AC amplitude
//   of 16382/65536 ~= 0.25 * level. Our AY8910 emits DC-centered
//   +/- level/3 per channel (amplitude level/3). Matching AC content:
//   gain = 0.40 * (16382/65536) * 3 ~= 0.40 * 0.74997 = 0.29999 -> 0.30.
export const YM2203_SSG_GAIN = 0.30;

// ---------------------------------------------------------------------------

export class YM2203 {
  /** master clock in Hz (gng: 12 MHz / 8 = 1.5 MHz) */
  readonly clock: number;
  /** the SSG half (AY-3-8910 core); exposed for specs/port callbacks */
  readonly ssg: AY8910;

  private address = 0;
  /** clock prescaler: 6 (default), 3, or 2 (address writes 0x2d/0x2e/0x2f) */
  private prescaleValue = 6;

  private readonly regs = new Uint8Array(0x100);
  private readonly channels: FmChannel[] = [];
  private readonly operators: FmOperator[] = [];
  private envCounter = 0;
  private modified = true;
  private prepareCount = 0;

  constructor(clock: number) {
    this.clock = clock;
    // AY8910's constructor clock is informational (its render semantics are
    // per-sample); the effective SSG rate is exposed via ssgSampleRate.
    this.ssg = new AY8910(clock / 2);

    // build channels/operators per opn_registers_base<false>::operator_map:
    // channel c hosts operators (by register offset) c+0, c+8, c+4, c+12
    // in m_op order [op1, op2, op3, op4] (register slot order 1,3,2,4)
    for (let c = 0; c < CHANNELS; c++) {
      const ops: FmOperator[] = [];
      for (const slotOffset of [0, 8, 4, 12]) {
        const op: FmOperator = {
          opoffs: c + slotOffset,
          choffs: c,
          phase: 0,
          envAttenuation: 0x3ff,
          envState: EG_RELEASE,
          ssgInverted: false,
          keyState: 0,
          keyonLive: 0,
          cachePhaseStep: 0,
          cacheTotalLevel: 0,
          cacheBlockFreq: 0,
          cacheDetune: 0,
          cacheMultiple: 1,
          cacheEgSustain: 0,
          cacheEgRate: [0, 0, 0, 0, 0, 0],
        };
        ops.push(op);
        this.operators.push(op);
      }
      this.channels.push({ choffs: c, feedback0: 0, feedback1: 0, feedbackIn: 0, ops });
    }
  }

  /** FM native sample rate: clock / (12 * prescale); clock/72 by default. */
  get fmSampleRate(): number {
    return this.clock / (12 * this.prescaleValue);
  }

  /**
   * SSG native sample rate (the AY core's clock/8 rule applied to the
   * prescaled SSG clock; ymfm ssg_effective_clock): clock/16 by default.
   */
  get ssgSampleRate(): number {
    const scale = Math.floor((this.prescaleValue * 2) / 3); // 4, 2, or 1
    return (this.clock * 2) / scale / 8;
  }

  /** current prescale value (6, 3, or 2) — exposed for specs */
  get prescale(): number {
    return this.prescaleValue;
  }

  // --- register interface ---------------------------------------------------

  /**
   * Address-port write (offset 0). Addresses 0x2d/0x2e/0x2f change the
   * prescaler as a side effect of the ADDRESS write (ymfm_opn.cpp
   * ym2203::write_address).
   */
  writeAddress(data: number): void {
    this.address = data & 0xff;
    if (this.address === 0x2d) this.updatePrescale(6);
    else if (this.address === 0x2e && this.prescaleValue === 6) this.updatePrescale(3);
    else if (this.address === 0x2f) this.updatePrescale(2);
  }

  /** Data-port write (offset 1): 0x00-0x0f -> SSG, 0x10-0xff -> FM. */
  writeData(data: number): void {
    data &= 0xff;
    if (this.address < 0x10) {
      this.ssg.writeReg(this.address, data);
    } else {
      this.writeFmReg(this.address, data);
    }
  }

  /** Bus write: offset bit 0 selects address (0) or data (1) port. */
  write(offset: number, data: number): void {
    if (offset & 1) this.writeData(data);
    else this.writeAddress(data);
  }

  /**
   * Status read — timers are stubs here, so this always reads 0 (gng never
   * reads the chip; see header).
   */
  readStatus(): number {
    return 0;
  }

  /** Data read: SSG registers only, as on the real chip (ym2203::read_data). */
  readData(): number {
    return this.address < 0x10 ? this.ssg.readReg(this.address) : 0;
  }

  read(offset: number): number {
    return (offset & 1) ? this.readData() : this.readStatus();
  }

  /**
   * FM register write (opn_registers_base<false>::write +
   * fm_engine_base::write). Handles the 0xa0-0xaf latched pairs and the
   * key-on register.
   */
  private writeFmReg(index: number, data: number): void {
    // writes to 0xa0-0xaf are handled as latched pairs; ymfm borrows the
    // unused 0xb8/0xb9 slots as the latches
    if ((index & 0xf0) === 0xa0) {
      if ((index & 3) === 3) return;
      const latchIndex = 0xb8 | ((index >> 3) & 1);
      if (index & 4) {
        // upper half only latches (6 significant bits)
        this.regs[latchIndex] = data & 0x3f;
      } else {
        // lower half applies the write plus the latched upper half
        this.regs[index] = data;
        this.regs[index | 4] = this.regs[latchIndex];
      }
      this.modified = true;
      return;
    }
    if ((index & 0xf8) === 0xb8) return; // internal latch slots

    this.regs[index] = data;
    this.modified = true;

    // key on/off register
    if (index === 0x28) {
      const channel = data & 3;
      if (channel === 3) return;
      const opmask = (data >> 4) & 0x0f;
      const ops = this.channels[channel].ops;
      for (let i = 0; i < 4; i++) {
        ops[i].keyonLive = (opmask >> i) & 1;
      }
    }
  }

  // --- rendering -------------------------------------------------------------

  /**
   * Fill `out` with FM samples at fmSampleRate, normalized to [-1, 1]
   * (raw 3-channel sum clamped to +/-32767, through the 3.10 DAC roundtrip,
   * divided by 32768).
   */
  renderFm(out: Float32Array): void {
    for (let i = 0; i < out.length; i++) {
      this.clockFm();
      out[i] = this.outputFm() * (1 / 32768);
    }
  }

  /**
   * Fill `out` with SSG samples at ssgSampleRate (AY8910 semantics:
   * DC-centered 3-channel sum in [-1, 1]).
   */
  renderSsg(out: Float32Array): void {
    this.ssg.render(out);
  }

  // --- FM engine internals (ymfm_fm.ipp) -------------------------------------

  private updatePrescale(prescale: number): void {
    this.prescaleValue = prescale;
  }

  /** fm_engine_base::clock, minus LFO (none on OPN) and timers (stubbed). */
  private clockFm(): void {
    // prepare when dirty, and periodically to catch ending notes
    if (this.modified || this.prepareCount++ >= 4096) {
      for (const op of this.operators) this.prepareOperator(op);
      this.modified = false;
      this.prepareCount = 0;
    }

    // envelope counter with EG_CLOCK_DIVIDER = 3: low 2 bits count 0,1,2
    this.envCounter = (this.envCounter + 1) >>> 0;
    if ((this.envCounter & 3) === 3) this.envCounter = (this.envCounter + 1) >>> 0;

    for (const ch of this.channels) {
      // clock the feedback through
      ch.feedback0 = ch.feedback1;
      ch.feedback1 = ch.feedbackIn;
      for (const op of ch.ops) this.clockOperator(op);
    }
  }

  /** fm_operator::prepare: refresh the cache and clock the key state. */
  private prepareOperator(op: FmOperator): void {
    this.cacheOperatorData(op);
    const keystate = op.keyonLive !== 0 ? 1 : 0;
    if ((keystate ^ op.keyState) !== 0) {
      op.keyState = keystate;
      if (keystate !== 0) this.startAttack(op);
      else this.startRelease(op);
    }
  }

  /** opn_registers_base::cache_operator_data */
  private cacheOperatorData(op: FmOperator): void {
    const regs = this.regs;
    const opoffs = op.opoffs;

    let blockFreq = ((regs[0xa4 + op.choffs] & 0x3f) << 8) | regs[0xa0 + op.choffs];

    // multi-frequency mode: channel 2's op1/op3/op2 get the special
    // frequencies from 0xa8-0xaf (op4 keeps the channel frequency)
    const multiFreq = ((regs[0x27] >> 6) & 3) !== 0;
    if (multiFreq && op.choffs === 2) {
      if (opoffs === 2) blockFreq = ((regs[0xad] & 0x3f) << 8) | regs[0xa9];
      else if (opoffs === 10) blockFreq = ((regs[0xae] & 0x3f) << 8) | regs[0xaa];
      else if (opoffs === 6) blockFreq = ((regs[0xac] & 0x3f) << 8) | regs[0xa8];
    }
    op.cacheBlockFreq = blockFreq;

    const keycode = opnKeycode(blockFreq);
    op.cacheDetune = detuneAdjustment((regs[0x30 + opoffs] >> 4) & 7, keycode);

    // multiple as an x.1 value (0 means 0.5)
    let multiple = (regs[0x30 + opoffs] & 0x0f) * 2;
    if (multiple === 0) multiple = 1;
    op.cacheMultiple = multiple;

    // no LFO on OPN -> the phase step is always static
    op.cachePhaseStep = opnPhaseStep(blockFreq, op.cacheDetune, multiple);

    // total level, scaled by 8
    op.cacheTotalLevel = (regs[0x40 + opoffs] & 0x7f) << 3;

    // 4-bit sustain level, but 15 means 31 (effectively 5 bits), shifted up
    let sustain = (regs[0x80 + opoffs] >> 4) & 0x0f;
    sustain |= (sustain + 1) & 0x10;
    op.cacheEgSustain = sustain << 5;

    // KSR-adjusted envelope rates
    const ksrval = keycode >> (((regs[0x50 + opoffs] >> 6) & 3) ^ 3);
    op.cacheEgRate[EG_ATTACK] = effectiveRate((regs[0x50 + opoffs] & 0x1f) * 2, ksrval);
    op.cacheEgRate[EG_DECAY] = effectiveRate((regs[0x60 + opoffs] & 0x1f) * 2, ksrval);
    op.cacheEgRate[EG_SUSTAIN] = effectiveRate((regs[0x70 + opoffs] & 0x1f) * 2, ksrval);
    op.cacheEgRate[EG_RELEASE] = effectiveRate((regs[0x80 + opoffs] & 0x0f) * 4 + 2, ksrval);
  }

  /** fm_operator::start_attack */
  private startAttack(op: FmOperator, isRestart = false): void {
    if (op.envState === EG_ATTACK) return;
    op.envState = EG_ATTACK;
    if (!isRestart) {
      // SSG-EG inverted modes start inverted
      op.ssgInverted =
        ((this.regs[0x90 + op.opoffs] >> 3) & 1) !== 0 && ((this.regs[0x90 + op.opoffs] >> 2) & 1) !== 0;
      // reset the phase on a key-on attack
      op.phase = 0;
    }
    // attack rate >= 62 goes to minimum attenuation immediately
    if (op.cacheEgRate[EG_ATTACK] >= 62) op.envAttenuation = 0;
  }

  /** fm_operator::start_release */
  private startRelease(op: FmOperator): void {
    if (op.envState >= EG_RELEASE) return;
    op.envState = EG_RELEASE;
    if (op.ssgInverted) {
      op.envAttenuation = (0x200 - op.envAttenuation) & 0x3ff;
      op.ssgInverted = false;
    }
  }

  /** fm_operator::clock */
  private clockOperator(op: FmOperator): void {
    if ((this.regs[0x90 + op.opoffs] >> 3) & 1) this.clockSsgEgState(op);
    else op.ssgInverted = false;

    // envelope clocks when the low 2 bits of the counter are 0
    if ((this.envCounter & 3) === 0) this.clockEnvelope(op, this.envCounter >>> 2);

    // phase step is always cached on OPN (no PM LFO)
    op.phase = (op.phase + op.cachePhaseStep) >>> 0;
  }

  /** fm_operator::clock_ssg_eg_state */
  private clockSsgEgState(op: FmOperator): void {
    // work only happens once the attenuation crosses above 0x200
    if ((op.envAttenuation & 0x200) === 0) return;

    const mode = this.regs[0x90 + op.opoffs] & 7;
    if (mode & 1) {
      // hold modes (1/3/5/7)
      op.ssgInverted = (((mode >> 2) ^ (mode >> 1)) & 1) !== 0;
      if (op.envState !== EG_ATTACK) op.envAttenuation = op.ssgInverted ? 0x200 : 0x3ff;
    } else {
      // continuous modes (0/2/4/6)
      if ((mode >> 1) & 1) op.ssgInverted = !op.ssgInverted;
      if (op.envState === EG_DECAY || op.envState === EG_SUSTAIN) this.startAttack(op, true);
      if (((mode >> 1) & 1) === 0) op.phase = 0;
    }
    if (op.envState === EG_RELEASE) op.envAttenuation = 0x3ff;
  }

  /** fm_operator::clock_envelope */
  private clockEnvelope(op: FmOperator, envCounter: number): void {
    if (op.envState === EG_ATTACK && op.envAttenuation === 0) op.envState = EG_DECAY;
    if (op.envState === EG_DECAY && op.envAttenuation >= op.cacheEgSustain) op.envState = EG_SUSTAIN;

    const rate = op.cacheEgRate[op.envState];
    const rateShift = rate >> 2;
    const counter = (envCounter << rateShift) >>> 0; // uint32 like the C++
    if ((counter & 0x7ff) !== 0) return;

    const relevantBits = (counter >>> (rateShift <= 11 ? 11 : rateShift)) & 7;
    const increment = attenuationIncrement(rate, relevantBits);

    if (op.envState === EG_ATTACK) {
      // rates 62/63 don't increment when changed after the initial key on
      if (rate < 62) op.envAttenuation += (~op.envAttenuation * increment) >> 4;
    } else {
      const ssgEg = ((this.regs[0x90 + op.opoffs] >> 3) & 1) !== 0;
      if (!ssgEg) op.envAttenuation += increment;
      else if (op.envAttenuation < 0x200) op.envAttenuation += 4 * increment;
      if (op.envAttenuation >= 0x400) op.envAttenuation = 0x3ff;
    }
  }

  /** fm_operator::envelope_attenuation (no KSL shift or LFO AM on OPN). */
  private envelopeAttenuation(op: FmOperator): number {
    let result = op.envAttenuation;
    if (op.ssgInverted) result = (0x200 - result) & 0x3ff;
    result += op.cacheTotalLevel;
    return result > 0x3ff ? 0x3ff : result;
  }

  /** fm_operator::compute_volume: 14-bit signed operator output. */
  private computeVolume(op: FmOperator, phase: number): number {
    if (op.envAttenuation > EG_QUIET) return 0;
    const sinAttenuation = WAVEFORM[phase & 0x3ff];
    const envAttenuation = this.envelopeAttenuation(op) << 2;
    const result = attenuationToVolume((sinAttenuation & 0x7fff) + envAttenuation);
    return (sinAttenuation & 0x8000) ? -result : result;
  }

  /**
   * fm_channel::output_4op + fm_engine_base::output for the OPN case
   * (rshift 0, clipmax 32767, mono), followed by the 3.10 DAC roundtrip
   * (ym2203::clock_fm).
   */
  private outputFm(): number {
    let sum = 0;
    for (const ch of this.channels) {
      const regB0 = this.regs[0xb0 + ch.choffs];

      // operator 1 with optional self-feedback
      const feedback = (regB0 >> 3) & 7;
      let opmod = 0;
      if (feedback !== 0) opmod = (ch.feedback0 + ch.feedback1) >> (10 - feedback);
      const op1value = (ch.feedbackIn =
        this.computeVolume(ch.ops[0], (ch.ops[0].phase >>> 10) + opmod));

      const algorithmOps = ALGORITHM_OPS[regB0 & 7];
      const opout = [0, op1value, 0, 0, 0, 0, 0, 0];

      // operator 2
      opmod = opout[algorithmOps & 1] >> 1;
      opout[2] = this.computeVolume(ch.ops[1], (ch.ops[1].phase >>> 10) + opmod);
      opout[5] = opout[1] + opout[2];

      // operator 3
      opmod = opout[(algorithmOps >> 1) & 7] >> 1;
      opout[3] = this.computeVolume(ch.ops[2], (ch.ops[2].phase >>> 10) + opmod);
      opout[6] = opout[1] + opout[3];
      opout[7] = opout[2] + opout[3];

      // operator 4 (always contributes)
      opmod = opout[(algorithmOps >> 4) & 7] >> 1;
      let result = this.computeVolume(ch.ops[3], (ch.ops[3].phase >>> 10) + opmod);

      // optionally add OP1/OP2/OP3, clamping as we go
      if (algorithmOps & 0x080) result = clamp(result + opout[1], -32768, 32767);
      if (algorithmOps & 0x100) result = clamp(result + opout[2], -32768, 32767);
      if (algorithmOps & 0x200) result = clamp(result + opout[3], -32768, 32767);

      sum += result;
    }
    return roundtripFp(sum);
  }
}

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}
