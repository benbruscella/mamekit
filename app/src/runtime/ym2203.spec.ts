// Self-test for the YM2203 (OPN) core. Run with: node src/runtime/ym2203.spec.ts
// (plain Node, no DOM). Exit code 0 = all PASS.
//
// References: MAME 3rdparty/ymfm (ymfm_opn.cpp/.h, ymfm_fm.ipp/.h, ymfm.h)
// and gng.cpp routing — see ym2203.ts header. Table spot values are the
// die-extracted constants from ymfm_fm.ipp.

import {
  YM2203,
  YM2203_FM_GAIN,
  YM2203_SSG_GAIN,
  absSinAttenuation,
  attenuationToVolume,
  attenuationIncrement,
  detuneAdjustment,
  opnKeycode,
  opnPhaseStep,
  roundtripFp,
} from './ym2203.ts';

// Ghosts 'n Goblins: XTAL(12'000'000) / 8 = 1.5 MHz per chip (two chips).
const CLOCK = 1500000;

let failures = 0;
let checks = 0;
function check(name: string, cond: boolean, detail: string = ''): void {
  checks++;
  if (cond) {
    console.log(`PASS  ${name}${detail ? `  (${detail})` : ''}`);
  } else {
    console.error(`FAIL  ${name}${detail ? `  (${detail})` : ''}`);
    failures++;
  }
}

// --- helpers ---------------------------------------------------------------

/** register write through the address/data ports */
function fm(chip: YM2203, reg: number, value: number): void {
  chip.write(0, reg);
  chip.write(1, value);
}

/** per-channel register offsets of ops 1-4 (opn operator order 1,3,2,4) */
const OP_SLOT = [0, 8, 4, 12] as const;

interface OpParams {
  dt?: number;
  mul?: number;
  tl?: number;
  ks?: number;
  ar?: number;
  dr?: number;
  sr?: number;
  sl?: number;
  rr?: number;
  ssg?: number;
}

function programOp(chip: YM2203, ch: number, opIdx: number, p: OpParams): void {
  const off = ch + OP_SLOT[opIdx];
  fm(chip, 0x30 + off, ((p.dt ?? 0) << 4) | (p.mul ?? 1));
  fm(chip, 0x40 + off, p.tl ?? 127);
  fm(chip, 0x50 + off, ((p.ks ?? 0) << 6) | (p.ar ?? 31));
  fm(chip, 0x60 + off, p.dr ?? 0);
  fm(chip, 0x70 + off, p.sr ?? 0);
  fm(chip, 0x80 + off, ((p.sl ?? 0) << 4) | (p.rr ?? 15));
  fm(chip, 0x90 + off, p.ssg ?? 0);
}

function setFreq(chip: YM2203, ch: number, block: number, fnum: number): void {
  fm(chip, 0xa4 + ch, (block << 3) | (fnum >> 8));
  fm(chip, 0xa0 + ch, fnum & 0xff);
}

function setAlg(chip: YM2203, ch: number, alg: number, feedback = 0): void {
  fm(chip, 0xb0 + ch, (feedback << 3) | alg);
}

function keyOn(chip: YM2203, ch: number, mask = 0x0f): void {
  fm(chip, 0x28, (mask << 4) | ch);
}

/** chip with a single audible operator (TL 0) on channel `ch`, alg 7 */
function soloOpChip(
  opIdx: number,
  opts: { ch?: number; alg?: number; fb?: number; block?: number; fnum?: number;
          mul?: number; dt?: number; op?: OpParams; keyMask?: number } = {},
): YM2203 {
  const ch = opts.ch ?? 0;
  const chip = new YM2203(CLOCK);
  for (let i = 0; i < 4; i++) {
    programOp(chip, ch, i, {
      ...(i === opIdx ? { tl: 0, mul: opts.mul ?? 1, dt: opts.dt ?? 0, ...(opts.op ?? {}) } : { tl: 127 }),
    });
  }
  setAlg(chip, ch, opts.alg ?? 7, opts.fb ?? 0);
  setFreq(chip, ch, opts.block ?? 4, opts.fnum ?? 1024);
  keyOn(chip, ch, opts.keyMask ?? 0x0f);
  return chip;
}

function renderFm(chip: YM2203, n: number): Float32Array {
  const out = new Float32Array(n);
  chip.renderFm(out);
  return out;
}

function maxAbs(out: Float32Array): number {
  let m = 0;
  for (const s of out) m = Math.max(m, Math.abs(s));
  return m;
}

/** Rising-edge period in samples (ay8910.spec-style zero-crossing average). */
function measurePeriod(out: Float32Array): number {
  let crossings = 0;
  let first = -1;
  let last = -1;
  for (let i = 1; i < out.length; i++) {
    if (out[i - 1] <= 0 && out[i] > 0) {
      crossings++;
      if (first < 0) first = i;
      last = i;
    }
  }
  return crossings > 1 ? (last - first) / (crossings - 1) : NaN;
}

function risingCrossings(out: Float32Array): number {
  let n = 0;
  for (let i = 1; i < out.length; i++) if (out[i - 1] <= 0 && out[i] > 0) n++;
  return n;
}

/** max |sample| for each non-overlapping window of `win` samples */
function windowPeaks(out: Float32Array, win: number): number[] {
  const res: number[] = [];
  for (let s = 0; s + win <= out.length; s += win) {
    let m = 0;
    for (let i = s; i < s + win; i++) m = Math.max(m, Math.abs(out[i]));
    res.push(m);
  }
  return res;
}

function sameArrays(a: Float32Array, b: Float32Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

// ---------------------------------------------------------------------------
// (a) basics: native rates and post-reset silence
{
  const chip = new YM2203(CLOCK);
  check('fmSampleRate = clock / 72 at default prescale', chip.fmSampleRate === CLOCK / 72,
    `${chip.fmSampleRate.toFixed(2)}`);
  check('ssgSampleRate = clock / 16 at default prescale', chip.ssgSampleRate === CLOCK / 16,
    `${chip.ssgSampleRate}`);
  check('default prescale is 6', chip.prescale === 6);
  check('gng clock: FM native rate ~20833 Hz', Math.abs(chip.fmSampleRate - 20833.33) < 0.01);

  const fmOut = new Float32Array(4096).fill(0.5);
  chip.renderFm(fmOut);
  check('FM silent after reset', maxAbs(fmOut) === 0, `maxAbs=${maxAbs(fmOut)}`);
  const ssgOut = new Float32Array(4096).fill(0.5);
  chip.renderSsg(ssgOut);
  check('SSG silent after reset', maxAbs(ssgOut) === 0, `maxAbs=${maxAbs(ssgOut)}`);
  check('status reads 0 (timer stub)', chip.read(0) === 0 && chip.readStatus() === 0);
}

// ---------------------------------------------------------------------------
// (b) log-sin table (die-extracted 4.8 attenuation values)
{
  check('absSin(0) = 0x859 (deepest attenuation)', absSinAttenuation(0) === 0x859);
  check('absSin(1) = 0x6c3', absSinAttenuation(1) === 0x6c3);
  check('absSin(128) = 0x07f (quarter point)', absSinAttenuation(128) === 0x07f);
  check('absSin(255) = 0 (sine peak)', absSinAttenuation(255) === 0);
  check('absSin(256) = 0 (mirror of 255)', absSinAttenuation(256) === 0);
  check('absSin(511) = 0x859 (mirror of 0)', absSinAttenuation(511) === 0x859);
  let monotone = true;
  for (let i = 1; i < 256; i++) if (absSinAttenuation(i) > absSinAttenuation(i - 1)) monotone = false;
  check('absSin non-increasing over first quadrant', monotone);
  let mirror = true;
  for (let i = 0; i < 256; i++) if (absSinAttenuation(256 + i) !== absSinAttenuation(255 - i)) mirror = false;
  check('absSin second quadrant mirrors the first', mirror);
  check('absSin masks to the 9-bit half-period', absSinAttenuation(512) === 0x859,
    'phase 512 = start of the (sign-handled-elsewhere) negative half');
}

// (c) power table (4.8 log attenuation -> 13-bit linear)
{
  check('atv(0) = 8168 (full scale)', attenuationToVolume(0) === 8168);
  check('atv(0xff) = 4096', attenuationToVolume(0xff) === 4096);
  check('atv(0x100) = atv(0)>>1 = 4084', attenuationToVolume(0x100) === 4084);
  check('atv(0x800) = 8168>>8 = 31', attenuationToVolume(0x800) === 31);
  let halving = true;
  for (let x = 0; x < 512; x += 7) {
    if (attenuationToVolume(x + 256) !== attenuationToVolume(x) >> 1) halving = false;
  }
  check('atv halves every 256 attenuation units (6 dB)', halving);
  let monotone = true;
  for (let x = 1; x < 2048; x++) if (attenuationToVolume(x) > attenuationToVolume(x - 1)) monotone = false;
  check('atv non-increasing', monotone);
  check('atv(huge) = 0', attenuationToVolume(0x1855) === 0);
  check('atv 13-bit range', attenuationToVolume(0) < 8192);
}

// (d) envelope increment table
{
  check('increment rate 0 is always 0', attenuationIncrement(0, 3) === 0);
  check('increment rate 1 is always 0', attenuationIncrement(1, 5) === 0);
  // rates 2-7 (fixed rows)
  const lowSums = [0, 0, 4, 4, 4, 4, 6, 6];
  for (let rate = 2; rate < 8; rate++) {
    let sum = 0;
    for (let i = 0; i < 8; i++) sum += attenuationIncrement(rate, i);
    check(`increment rate ${rate} sums ${lowSums[rate]} per 8 steps`, sum === lowSums[rate], `sum=${sum}`);
  }
  // rates 8-47 repeat the [4,5,6,7]-sum pattern by rate&3
  let patternOk = true;
  for (let rate = 8; rate < 48; rate++) {
    let sum = 0;
    for (let i = 0; i < 8; i++) sum += attenuationIncrement(rate, i);
    if (sum !== 4 + (rate & 3)) patternOk = false;
  }
  check('increment rates 8-47 sum 4+(rate&3) per 8 steps', patternOk);
  // rates 48-63 (unique rows)
  const highSums = [8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 64, 64, 64];
  for (let rate = 48; rate < 64; rate++) {
    let sum = 0;
    for (let i = 0; i < 8; i++) sum += attenuationIncrement(rate, i);
    check(`increment rate ${rate} sums ${highSums[rate - 48]} per 8 steps`, sum === highSums[rate - 48],
      `sum=${sum}`);
  }
  // per-step nibble order (LSB-first) for rate 49: 0x21112111
  const rate49 = [1, 1, 1, 2, 1, 1, 1, 2];
  for (let i = 0; i < 8; i++) {
    check(`increment rate 49 step ${i} = ${rate49[i]}`, attenuationIncrement(49, i) === rate49[i]);
  }
  let all8 = true;
  for (let i = 0; i < 8; i++) if (attenuationIncrement(63, i) !== 8) all8 = false;
  check('increment rate 63 is 8 at every step', all8);
}

// (e) detune table
{
  let zeroDt = true;
  for (let kc = 0; kc < 32; kc++) {
    if (detuneAdjustment(0, kc) !== 0 || detuneAdjustment(4, kc) !== 0) zeroDt = false;
  }
  check('detune 0/4 is 0 at every keycode', zeroDt);
  let negated = true;
  for (let kc = 0; kc < 32; kc++) {
    for (let dt = 0; dt < 4; dt++) {
      if (detuneAdjustment(dt + 4, kc) !== -detuneAdjustment(dt, kc)) negated = false;
    }
  }
  check('detune bit 2 negates the adjustment', negated);
  const row31 = [0, 8, 16, 22];
  for (let dt = 0; dt < 4; dt++) {
    check(`detune ${dt} at keycode 31 = ${row31[dt]}`, detuneAdjustment(dt, 31) === row31[dt]);
    check(`detune ${dt + 4} at keycode 31 = ${-row31[dt]}`, detuneAdjustment(dt + 4, 31) === -row31[dt]);
  }
  check('detune 2 at keycode 0 = 1', detuneAdjustment(2, 0) === 1);
  check('detune 3 at keycode 4 = 2', detuneAdjustment(3, 4) === 2);
}

// (f) OPN keycode
{
  check('keycode(0) = 0', opnKeycode(0) === 0);
  check('keycode(block 7, fnum 0x7ff) = 31', opnKeycode((7 << 11) | 0x7ff) === 31);
  check('keycode(block 0, fnum 1024) = 2', opnKeycode(0x400) === 2);
  check('keycode(block 4, fnum 1024) = 18', opnKeycode((4 << 11) | 1024) === 18);
  check('keycode(block 7, fnum 1024) = 30', opnKeycode((7 << 11) | 1024) === 30);
  // exhaustive check against the YM2608-manual low-bit formula
  let formulaOk = true;
  for (let bf = 0; bf < 0x4000; bf++) {
    const f11 = (bf >> 10) & 1;
    const f10 = (bf >> 9) & 1;
    const f9 = (bf >> 8) & 1;
    const f8 = (bf >> 7) & 1;
    const lsb = (f11 & (f10 | f9 | f8)) | ((f11 ^ 1) & f10 & f9 & f8);
    if (opnKeycode(bf) !== ((((bf >> 10) & 0x0f) << 1) | lsb)) formulaOk = false;
  }
  check('keycode matches (F11&(F10|F9|F8))|(!F11&F10&F9&F8) for all 14-bit inputs', formulaOk);
}

// (g) phase step math (fnum/block/detune/multiple -> 10.10 increment)
{
  // datasheet formula: step = ((fnum*2) << block) >> 2, then detune, then
  // multiple as an x.1 factor
  for (let block = 0; block < 8; block++) {
    const expected = 512 << block;
    check(`phaseStep fnum=1024 block=${block} mul=1 -> ${expected}`,
      opnPhaseStep((block << 11) | 1024, 0, 2) === expected);
  }
  for (let mul = 0; mul < 16; mul++) {
    const x1 = mul === 0 ? 1 : mul * 2;
    const expected = (8192 * x1) >> 1;
    check(`phaseStep multiple ${mul} scales x${mul === 0 ? 0.5 : mul}`,
      opnPhaseStep((4 << 11) | 1024, 0, x1) === expected, `${expected}`);
  }
  check('phaseStep adds detune before the multiple', opnPhaseStep((4 << 11) | 1024, 22, 4) === (8214 * 4) >> 1);
  check('phaseStep negative detune subtracts', opnPhaseStep((4 << 11) | 1024, -22, 2) === 8170);
  check('phaseStep detune underflow wraps at 17 bits', opnPhaseStep(0, -1, 2) === 0x1ffff);
  check('phaseStep fnum is 11 bits of block_freq', opnPhaseStep((4 << 11) | 0x7ff, 0, 2) === ((0x7ff << 1) << 4) >> 2);
}

// (h) DAC 3.10 float roundtrip (ymfm.h roundtrip_fp)
{
  check('roundtrip clamps at +32767', roundtripFp(40000) === 32767);
  check('roundtrip clamps at -32768', roundtripFp(-40000) === -32768);
  let exact = true;
  for (let v = -255; v <= 255; v++) if (roundtripFp(v) !== v) exact = false;
  check('roundtrip exact for |v| < 256', exact);
  check('roundtrip(512) = 512', roundtripFp(512) === 512);
  check('roundtrip(513) = 512 (exponent 2 loses 1 bit)', roundtripFp(513) === 512);
  check('roundtrip(4097) = 4096', roundtripFp(4097) === 4096);
  check('roundtrip(-4097) = -4112 (truncation toward -inf grows magnitude)',
    roundtripFp(-4097) === -4112);
  check('roundtrip(8168) = 8160', roundtripFp(8168) === 8160);
  check('roundtrip(-8168) = -8176', roundtripFp(-8168) === -8176);
  // ymfm quirk: the overflow shortcut returns 32767 verbatim, but 32767
  // itself quantizes to 32704 (roundtrip_fp is not idempotent at the clamp)
  check('roundtrip(32767) = 32704 (ymfm clamp-edge quirk)', roundtripFp(32767) === 32704);
  let idempotent = true;
  for (let v = -32768; v <= 32766; v += 97) {
    const r = roundtripFp(v);
    if (roundtripFp(r) !== r) idempotent = false;
  }
  check('roundtrip is idempotent below the clamp', idempotent);
}

// ---------------------------------------------------------------------------
// (i) register address latching: SSG registers 0x00-0x0f route through the
// address/data ports to the AY core (read back through the data port with
// the AY hardware read-back masks)
{
  const chip = new YM2203(CLOCK);
  const READ_MASK = [
    0xff, 0x0f, 0xff, 0x0f, 0xff, 0x0f, 0x1f, 0xff,
    0x1f, 0x1f, 0x1f, 0xff, 0xff, 0x0f, 0xff, 0xff,
  ];
  for (let r = 0; r < 16; r++) fm(chip, r, 0xff);
  for (let r = 0; r < 16; r++) {
    chip.write(0, r);
    const got = chip.read(1);
    check(`SSG reg ${r} via ports: wrote 0xff, reads 0x${READ_MASK[r].toString(16)}`,
      got === READ_MASK[r], `got 0x${got.toString(16)}`);
  }
  check('data-port read of an FM address returns 0', (chip.write(0, 0x30), chip.read(1) === 0));
  check('address latch persists across data reads', (chip.write(0, 7), chip.read(1) === chip.read(1)));
}

// (j) SSG section through the YM2203 interface (frequency semantics are the
// AY core's: tone toggles every TP samples at ssgSampleRate)
{
  for (const ch of [0, 1, 2]) {
    const chip = new YM2203(CLOCK);
    fm(chip, 7, 0x3f & ~(1 << ch)); // only this channel's tone
    fm(chip, ch * 2, 100);
    fm(chip, ch * 2 + 1, 0);
    fm(chip, 8 + ch, 0x0f);
    const out = new Float32Array(60000);
    chip.renderSsg(out);
    const measured = measurePeriod(out);
    check(`SSG channel ${'ABC'[ch]} tone TP=100 -> period 200 samples`,
      Number.isFinite(measured) && Math.abs(measured - 200) < 0.5, `measured=${measured.toFixed(2)}`);
  }
  {
    const chip = new YM2203(CLOCK);
    fm(chip, 7, 0x07); // noise only
    fm(chip, 6, 1);
    fm(chip, 8, 0x0f);
    const out = new Float32Array(40000);
    chip.renderSsg(out);
    let transitions = 0;
    for (let i = 1; i < out.length; i++) if ((out[i] > 0) !== (out[i - 1] > 0)) transitions++;
    check('SSG noise via YM ports is broadband', transitions > 6000 && transitions < 14000,
      `transitions=${transitions}`);
  }
  {
    const chip = new YM2203(CLOCK);
    fm(chip, 7, 0x3f);
    fm(chip, 8, 0x10); // envelope mode
    fm(chip, 11, 4);
    fm(chip, 13, 0); // decay ramp
    const out = new Float32Array(256);
    chip.renderSsg(out);
    check('SSG envelope via YM ports decays', out[0] > out[100] && out[100] > 0, `${out[0].toFixed(3)} -> ${out[100].toFixed(3)}`);
  }
}

// ---------------------------------------------------------------------------
// (k) prescaler register writes (ADDRESS writes 0x2d/0x2e/0x2f, ymfm
// ym2203::write_address semantics)
{
  const chip = new YM2203(CLOCK);
  chip.write(0, 0x2e); // only honored while prescale is 6
  check('0x2e from prescale 6 -> 3', chip.prescale === 3);
  check('prescale 3: FM rate clock/36', chip.fmSampleRate === CLOCK / 36);
  check('prescale 3: SSG rate clock/8', chip.ssgSampleRate === CLOCK / 8);
  chip.write(0, 0x2e);
  check('0x2e from prescale 3 is ignored', chip.prescale === 3);
  chip.write(0, 0x2f);
  check('0x2f -> prescale 2', chip.prescale === 2);
  check('prescale 2: FM rate clock/24', chip.fmSampleRate === CLOCK / 24);
  check('prescale 2: SSG rate clock/4', chip.ssgSampleRate === CLOCK / 4);
  chip.write(0, 0x2e);
  check('0x2e from prescale 2 is ignored', chip.prescale === 2);
  chip.write(0, 0x2d);
  check('0x2d -> prescale 6', chip.prescale === 6);
  check('prescale 6 restored: FM rate clock/72', chip.fmSampleRate === CLOCK / 72);
  check('prescale 6 restored: SSG rate clock/16', chip.ssgSampleRate === CLOCK / 16);
  // a data write after the address write lands in the (unused) FM register
  chip.write(1, 0x55);
  check('data write after prescale address is harmless', chip.prescale === 6);
}

// ---------------------------------------------------------------------------
// (l) FM frequency: fnum/block/multiple/detune vs the phase-step formula
// (single sine carrier; period = 2^20 / phaseStep samples at the FM rate)
{
  for (const block of [2, 3, 4, 5]) {
    const expected = (1 << 20) / (512 << block);
    const chip = soloOpChip(0, { block, fnum: 1024 });
    const out = renderFm(chip, Math.ceil(expected * 40));
    const measured = measurePeriod(out);
    check(`FM period block=${block} fnum=1024 -> ${expected} samples`,
      Number.isFinite(measured) && Math.abs(measured - expected) / expected < 1e-3,
      `measured=${measured.toFixed(3)}`);
  }
  for (const [fnum, expected] of [[512, 256], [2047, (1 << 20) / 16376]] as const) {
    const chip = soloOpChip(0, { block: 4, fnum });
    const out = renderFm(chip, Math.ceil(expected * 40));
    const measured = measurePeriod(out);
    check(`FM period fnum=${fnum} block=4 -> ${expected.toFixed(2)} samples`,
      Number.isFinite(measured) && Math.abs(measured - expected) / expected < 5e-3,
      `measured=${measured.toFixed(3)}`);
  }
  for (const [mul, expected] of [[0, 256], [1, 128], [2, 64], [4, 32]] as const) {
    const chip = soloOpChip(0, { block: 4, fnum: 1024, mul });
    const out = renderFm(chip, expected * 40);
    const measured = measurePeriod(out);
    check(`FM multiple=${mul} -> period ${expected} samples`,
      Number.isFinite(measured) && Math.abs(measured - expected) / expected < 5e-3,
      `measured=${measured.toFixed(3)}`);
  }
  {
    // detune: keycode(block 7, fnum 1024) = 30, detune 3 -> +22 phase units
    // (65558 vs 65536); count rising crossings over 2^18 samples
    const N = 1 << 18;
    const c0 = risingCrossings(renderFm(soloOpChip(0, { block: 7, fnum: 1024, dt: 0 }), N));
    const c3 = risingCrossings(renderFm(soloOpChip(0, { block: 7, fnum: 1024, dt: 3 }), N));
    const c7 = risingCrossings(renderFm(soloOpChip(0, { block: 7, fnum: 1024, dt: 7 }), N));
    check('detune 3 raises the frequency (+22/65536 at keycode 30)', c3 > c0 + 2,
      `crossings ${c0} -> ${c3}`);
    check('detune 7 lowers the frequency (-22/65536)', c7 < c0 - 2, `crossings ${c0} -> ${c7}`);
  }
}

// ---------------------------------------------------------------------------
// (m) total level: peak amplitude of a full-attack carrier equals the DAC
// roundtrip of attenuation_to_volume(TL<<5) exactly, for ALL 128 TL values
// (envelope contributes 0 after an instant AR=31 attack; the sine table hits
// attenuation 0 at the sampled peak with this fnum/block choice). The DAC
// truncates toward -inf, so the NEGATIVE half-wave peak has the larger
// magnitude: |peak| = -roundtripFp(-atv).
{
  for (let tl = 0; tl < 128; tl++) {
    const chip = new YM2203(CLOCK);
    programOp(chip, 0, 0, { tl });
    for (let i = 1; i < 4; i++) programOp(chip, 0, i, { tl: 127 });
    setAlg(chip, 0, 7, 0);
    setFreq(chip, 0, 4, 1024);
    keyOn(chip, 0);
    const out = renderFm(chip, 160);
    const expected = -roundtripFp(-attenuationToVolume(tl << 5));
    const got = Math.round(maxAbs(out) * 32768);
    check(`TL=${tl} peak = ${expected}`, got === expected, `got ${got}`);
  }
}

// ---------------------------------------------------------------------------
// (n) algorithms 0-7: carrier/modulator matrix. A solo audible op produces
// output iff it is a carrier of the algorithm (modulators feed muted ops).
{
  const carriers: readonly (readonly number[])[] = [
    [3], [3], [3], [3],           // algs 0-3: op4 only
    [1, 3],                        // alg 4: op2 + op4
    [1, 2, 3], [1, 2, 3],          // algs 5-6: op2 + op3 + op4
    [0, 1, 2, 3],                  // alg 7: all
  ];
  for (let alg = 0; alg < 8; alg++) {
    for (let opIdx = 0; opIdx < 4; opIdx++) {
      const chip = soloOpChip(opIdx, { alg });
      const out = renderFm(chip, 1024);
      const audible = maxAbs(out) > 0.1;
      const isCarrier = carriers[alg].includes(opIdx);
      check(`alg ${alg}: op${opIdx + 1} is a ${isCarrier ? 'carrier (audible)' : 'modulator (silent)'}`,
        audible === isCarrier, `maxAbs=${maxAbs(out).toFixed(4)}`);
    }
  }

  // modulation connections: in alg 0 (O1->O2->O3->O4) muting any modulator
  // changes the output, and the fully-modulated chain is not a pure sine
  const fullChain = (): YM2203 => {
    const chip = new YM2203(CLOCK);
    for (let i = 0; i < 4; i++) programOp(chip, 0, i, { tl: 0 });
    setAlg(chip, 0, 0, 0);
    setFreq(chip, 0, 4, 1024);
    keyOn(chip, 0);
    return chip;
  };
  const base = renderFm(fullChain(), 2048);
  const sine = renderFm(soloOpChip(3, { alg: 0 }), 2048);
  check('alg 0 chain output is modulated (differs from the pure carrier sine)',
    !sameArrays(base, sine));
  for (const opIdx of [0, 1, 2]) {
    const chip = fullChain();
    fm(chip, 0x40 + OP_SLOT[opIdx], 127); // mute one modulator
    keyOn(chip, 0, 0); // re-key for a clean phase comparison
    keyOn(chip, 0);
    const out = renderFm(chip, 2048);
    check(`alg 0: muting modulator op${opIdx + 1} changes the output`, !sameArrays(base, out));
  }
}

// ---------------------------------------------------------------------------
// (o) operator 1 self-feedback
{
  const render = (fb: number) => renderFm(soloOpChip(0, { alg: 7, fb }), 2048);
  const fb0 = render(0);
  // with feedback 0, op1's sine is identical to op4's (same step, same
  // phase-reset at key-on)
  const op4 = renderFm(soloOpChip(3, { alg: 7 }), 2048);
  check('feedback 0: op1 output is the identical pure sine as op4', sameArrays(fb0, op4));
  for (let fb = 1; fb <= 7; fb++) {
    check(`feedback ${fb} changes the op1 waveform`, !sameArrays(fb0, render(fb)));
  }
}

// ---------------------------------------------------------------------------
// (p) key on/off routing (register 0x28)
{
  // each op sounds only when its own keyon bit (bits 4-7) is set
  for (let opIdx = 0; opIdx < 4; opIdx++) {
    const on = soloOpChip(opIdx, { alg: 7, keyMask: 1 << opIdx });
    check(`keyon bit ${opIdx + 4} keys op${opIdx + 1}`, maxAbs(renderFm(on, 512)) > 0.1);
    const off = soloOpChip(opIdx, { alg: 7, keyMask: 1 << ((opIdx + 1) & 3) });
    check(`keyon bit ${((opIdx + 1) & 3) + 4} does NOT key op${opIdx + 1}`,
      maxAbs(renderFm(off, 512)) === 0);
  }
  {
    // no key-on at all -> silence even with TL 0
    const chip = new YM2203(CLOCK);
    for (let i = 0; i < 4; i++) programOp(chip, 0, i, { tl: 0 });
    setAlg(chip, 0, 7, 0);
    setFreq(chip, 0, 4, 1024);
    const out = renderFm(chip, 2048);
    check('no key-on -> silence', maxAbs(out) === 0);
  }
  {
    // channel select 3 is invalid and ignored (opn_registers write)
    const chip = new YM2203(CLOCK);
    for (let i = 0; i < 4; i++) programOp(chip, 0, i, { tl: 0 });
    setAlg(chip, 0, 7, 0);
    setFreq(chip, 0, 4, 1024);
    fm(chip, 0x28, 0xf3);
    check('keyon channel 3 is ignored', maxAbs(renderFm(chip, 1024)) === 0);
  }
  {
    // key off then key on again retriggers the attack (phase + envelope)
    const chip = soloOpChip(0, { alg: 7 });
    renderFm(chip, 512);
    keyOn(chip, 0, 0);
    renderFm(chip, 4096); // fast RR=15 release drains the envelope
    check('key-off releases to silence', maxAbs(renderFm(chip, 512)) === 0);
    keyOn(chip, 0);
    check('re-key-on retriggers the note', maxAbs(renderFm(chip, 512)) > 0.2);
  }
}

// ---------------------------------------------------------------------------
// (q) envelope generator
{
  // instant attack: AR=31 (rate >= 62) hits attenuation 0 at key-on
  const chip = soloOpChip(0, { alg: 7 });
  const out = renderFm(chip, 160);
  check('AR=31 attack is instant (first period at full scale)',
    Math.round(maxAbs(out) * 32768) === -roundtripFp(-attenuationToVolume(0)),
    `${maxAbs(out).toFixed(5)}`);
}
{
  // gradual attack: peaks rise monotonically to full scale
  const chip = soloOpChip(0, { alg: 7, op: { ar: 10 } });
  const out = renderFm(chip, 40000);
  const peaks = windowPeaks(out, 2000);
  let rising = true;
  for (let i = 1; i < peaks.length; i++) if (peaks[i] < peaks[i - 1] - 1e-7) rising = false;
  check('AR=10 attack envelope is monotonically rising', rising,
    peaks.map((p) => p.toFixed(3)).join(','));
  check('AR=10 attack reaches full scale', Math.abs(peaks[peaks.length - 1] - 8176 / 32768) < 1e-6,
    `${peaks[peaks.length - 1].toFixed(5)}`);
  check('AR=10 attack starts quiet', peaks[0] < peaks[peaks.length - 1] / 2, `${peaks[0].toFixed(4)}`);
}
{
  // decay to the sustain level, then hold (D2R=0): SL=8 -> attenuation 256
  // -> peak exactly atv(1024) = 510
  const chip = soloOpChip(0, { alg: 7, op: { ar: 31, dr: 15, sl: 8, sr: 0 } });
  const out = renderFm(chip, 32768);
  const early = windowPeaks(out.subarray(0, 256), 256)[0];
  check('decay config: initial peak near full scale (decay already running)',
    early > 8000 / 32768, `${Math.round(early * 32768)}`);
  const peaks = windowPeaks(out, 2048);
  let falling = true;
  for (let i = 1; i < peaks.length; i++) if (peaks[i] > peaks[i - 1] + 1e-7) falling = false;
  check('decay envelope is monotonically falling', falling);
  const late = windowPeaks(out.subarray(24576), 4096)[0];
  check('sustain holds at SL=8 exactly (atv(1024) = 510)', Math.round(late * 32768) === 510,
    `${Math.round(late * 32768)}`);
  const later = windowPeaks(out.subarray(28672), 4096)[0];
  check('sustain level is stable with D2R=0', late === later);
}
{
  // D2R > 0 keeps decaying below the sustain level
  const chip = soloOpChip(0, { alg: 7, op: { ar: 31, dr: 15, sl: 8, sr: 20 } });
  const out = renderFm(chip, 60000);
  const late = windowPeaks(out.subarray(55000), 4096)[0];
  check('D2R=20 decays below the sustain level', late < 100 / 32768, `${(late * 32768).toFixed(0)}`);
}
{
  // release rates: RR=15 silences quickly, RR=0 barely moves
  const mk = (rr: number) => {
    const chip = soloOpChip(0, { alg: 7, op: { rr } });
    renderFm(chip, 256);
    keyOn(chip, 0, 0); // key off
    return renderFm(chip, 2000);
  };
  const fast = mk(15);
  const slow = mk(0);
  check('RR=15 release silences within ~2000 samples',
    maxAbs(fast.subarray(1500)) === 0, `${maxAbs(fast.subarray(1500))}`);
  check('RR=0 release still audible after 2000 samples', maxAbs(slow.subarray(1500)) > 0.2,
    `${maxAbs(slow.subarray(1500)).toFixed(3)}`);
}
{
  // key scaling: KS=3 at keycode 30 boosts the decay rate vs KS=0
  const quietAt = (ks: number): number => {
    const chip = soloOpChip(0, { alg: 7, block: 7, fnum: 1024, op: { ks, ar: 31, dr: 20, sl: 15 } });
    const out = renderFm(chip, 16384);
    const peaks = windowPeaks(out, 512);
    for (let i = 0; i < peaks.length; i++) if (peaks[i] < 0.005) return i;
    return peaks.length;
  };
  const q3 = quietAt(3);
  const q0 = quietAt(0);
  check('KS=3 decays faster than KS=0 at high keycode', q3 < q0, `windows: ks3=${q3}, ks0=${q0}`);
  check('KS=3 decay is near-instant at rate 63', q3 <= 2, `${q3}`);
}

// ---------------------------------------------------------------------------
// (r) SSG-EG envelope modes (register 0x90)
{
  const mk = (ssg: number) => {
    // fast full decay so the SSG-EG state machine engages quickly
    const chip = soloOpChip(0, { alg: 7, op: { ar: 31, dr: 31, sl: 15, ssg } });
    return renderFm(chip, 24000);
  };
  const plain = mk(0x00);
  check('without SSG-EG the decayed note stays silent',
    maxAbs(plain.subarray(20000)) === 0, `${maxAbs(plain.subarray(20000))}`);
  const repeat = mk(0x08);
  check('SSG-EG mode 0 (repeat) keeps retriggering the envelope',
    maxAbs(repeat.subarray(20000)) > 0.02, `${maxAbs(repeat.subarray(20000)).toFixed(3)}`);
  const holdLow = mk(0x09);
  check('SSG-EG mode 1 (once, hold low) ends silent',
    maxAbs(holdLow.subarray(20000)) === 0, `${maxAbs(holdLow.subarray(20000))}`);
  const holdHigh = mk(0x0b);
  check('SSG-EG mode 3 (once, hold high/inverted) sustains at full level',
    maxAbs(holdHigh.subarray(20000)) > 0.2, `${maxAbs(holdHigh.subarray(20000)).toFixed(3)}`);
}

// ---------------------------------------------------------------------------
// (s) channel 2 multi-frequency mode (register 0x27 bits 6-7)
{
  const chip = soloOpChip(0, { ch: 2, alg: 7, block: 4, fnum: 512 });
  let measured = measurePeriod(renderFm(chip, 256 * 40));
  check('ch2 normal mode uses the channel frequency (period 256)',
    Math.abs(measured - 256) < 1, `measured=${measured.toFixed(2)}`);

  // enable multi-frequency and point op1 (opoffs 2 -> regs 0xa9/0xad) at
  // block 4 / fnum 1024
  fm(chip, 0x27, 0x40);
  fm(chip, 0xad, (4 << 3) | (1024 >> 8));
  fm(chip, 0xa9, 1024 & 0xff);
  measured = measurePeriod(renderFm(chip, 128 * 40));
  check('multi-freq mode: ch2 op1 uses regs 0xa9/0xad (period 128)',
    Math.abs(measured - 128) < 1, `measured=${measured.toFixed(2)}`);

  fm(chip, 0x27, 0x00);
  measured = measurePeriod(renderFm(chip, 256 * 40));
  check('disabling multi-freq restores the channel frequency',
    Math.abs(measured - 256) < 1, `measured=${measured.toFixed(2)}`);
}

// ---------------------------------------------------------------------------
// (t) fnum write latching: 0xa4-0xa7 only LATCH; the value applies when the
// matching 0xa0-0xa3 low byte is written (opn_registers_base::write)
{
  const chip = soloOpChip(0, { alg: 7, block: 4, fnum: 1024 });
  let measured = measurePeriod(renderFm(chip, 128 * 40));
  check('latch test: initial period 128', Math.abs(measured - 128) < 1, `${measured.toFixed(2)}`);

  fm(chip, 0xa4, (5 << 3) | (1024 >> 8)); // upper write only latches
  measured = measurePeriod(renderFm(chip, 128 * 40));
  check('0xa4 write alone does not change the pitch', Math.abs(measured - 128) < 1,
    `${measured.toFixed(2)}`);

  fm(chip, 0xa0, 1024 & 0xff); // lower write applies the latched block 5
  measured = measurePeriod(renderFm(chip, 64 * 40));
  check('0xa0 write applies the latched block (period 64)', Math.abs(measured - 64) < 1,
    `${measured.toFixed(2)}`);

  fm(chip, 0xa3, 0x55); // (index & 3) == 3 registers do not exist
  fm(chip, 0xa7, 0x55);
  measured = measurePeriod(renderFm(chip, 64 * 40));
  check('writes to 0xa3/0xa7 are ignored', Math.abs(measured - 64) < 1, `${measured.toFixed(2)}`);
}

// ---------------------------------------------------------------------------
// (u) timer register stubs: writes accepted, status stays 0, sound unaffected
{
  const chip = soloOpChip(0, { alg: 7 });
  const before = renderFm(chip, 1024);
  fm(chip, 0x24, 0xff); // timer A upper
  fm(chip, 0x25, 0x03); // timer A lower
  fm(chip, 0x26, 0x80); // timer B
  fm(chip, 0x27, 0x3f); // load/enable/reset both (no CSM bits)
  check('timer writes leave status at 0', chip.readStatus() === 0 && chip.read(0) === 0);
  const after = renderFm(chip, 1024);
  check('timer writes do not disturb the FM output',
    Math.abs(measurePeriod(after) - measurePeriod(before)) < 1,
    `${measurePeriod(before).toFixed(2)} vs ${measurePeriod(after).toFixed(2)}`);
  fm(chip, 0x21, 0xaa); // test register: stored, ignored
  check('test register write is harmless', maxAbs(renderFm(chip, 256)) > 0.1);
  check('status still 0 after everything', chip.readStatus() === 0);
}

// ---------------------------------------------------------------------------
// (v) worklet contract: offset = chip*2 + (0=address | 1=data), and the
// verified gng mix gains
{
  check('FM route gain 0.20 (gng stream output 3)', YM2203_FM_GAIN === 0.20);
  check('SSG route gain 0.40*0.75 = 0.30 (gng stream outputs 0-2)', YM2203_SSG_GAIN === 0.30);
  check('two full-blast chips fit [-1, 1] at these gains',
    2 * (YM2203_FM_GAIN + YM2203_SSG_GAIN) === 1);

  const chips = [new YM2203(CLOCK), new YM2203(CLOCK)];
  const w = (offset: number, data: number) => {
    const chip = chips[offset >> 1]; // worklet routing (ym2203-worklet.ts)
    if (chip) chip.write(offset & 1, data);
  };
  // program chip 1's SSG through offsets 2/3
  w(2, 7); w(3, 0x38);
  w(2, 0); w(3, 100);
  w(2, 1); w(3, 0);
  w(2, 8); w(3, 0x0f);
  const out0 = new Float32Array(4096);
  const out1 = new Float32Array(4096);
  chips[0].renderSsg(out0);
  chips[1].renderSsg(out1);
  check('offsets 2/3 reach chip 1 only', maxAbs(out1) > 0.1 && maxAbs(out0) === 0,
    `chip1=${maxAbs(out1).toFixed(3)}, chip0=${maxAbs(out0)}`);
  const p = measurePeriod(out1);
  check('chip 1 tone period correct through the offset protocol', Math.abs(p - 200) < 0.5,
    `${p.toFixed(2)}`);
  // offsets beyond the last chip are ignored (0xff reset is worklet-level)
  w(4, 8); w(5, 0x0f);
  chips[0].renderSsg(out0);
  check('offsets beyond the last chip are ignored', maxAbs(out0) === 0);
}

// ---------------------------------------------------------------------------
// (w) determinism, chunked-render invariance, and output bounds
{
  const program = (chip: YM2203) => {
    for (let ch = 0; ch < 3; ch++) {
      for (let i = 0; i < 4; i++) {
        programOp(chip, ch, i, { tl: ch * 9 + i * 4, ar: 20 + ch, dr: 8, sl: 4, mul: 1 + i });
      }
      setAlg(chip, ch, ch * 2 + 1, ch);
      setFreq(chip, ch, 3 + ch, 700 + 200 * ch);
      keyOn(chip, ch);
    }
  };
  const c1 = new YM2203(CLOCK);
  const c2 = new YM2203(CLOCK);
  program(c1);
  program(c2);
  const o1 = renderFm(c1, 8192);
  const o2 = renderFm(c2, 8192);
  check('deterministic: identical programs render identically', sameArrays(o1, o2));

  const c3 = new YM2203(CLOCK);
  program(c3);
  const o3 = new Float32Array(8192);
  const seg = new Float32Array(256);
  for (let k = 0; k < 32; k++) {
    c3.renderFm(seg);
    o3.set(seg, k * 256);
  }
  check('streaming: chunked FM renders match one large render', sameArrays(o1, o3));

  // 3 channels of 4 in-phase carriers clip at exactly full scale
  const loud = new YM2203(CLOCK);
  for (let ch = 0; ch < 3; ch++) {
    for (let i = 0; i < 4; i++) programOp(loud, ch, i, { tl: 0 });
    setAlg(loud, ch, 7, 0);
    setFreq(loud, ch, 4, 1024);
    keyOn(loud, ch);
  }
  const loudOut = renderFm(loud, 512);
  check('full-blast FM clamps to exactly full scale', maxAbs(loudOut) === 1,
    `maxAbs=${maxAbs(loudOut)}`);
  check('full-blast FM never exceeds [-1, 1]', maxAbs(loudOut) <= 1);

  // single carrier peak is ~0.25 (8176/32768, the negative half-wave after
  // DAC truncation) — headroom sanity
  const solo = renderFm(soloOpChip(0, { alg: 7 }), 256);
  check('single carrier peaks at 8176/32768', Math.round(maxAbs(solo) * 32768) === 8176,
    `${maxAbs(solo).toFixed(5)}`);
}

// ---------------------------------------------------------------------------
console.log(
  failures === 0
    ? `\nAll ${checks} YM2203 checks passed.`
    : `\n${failures} of ${checks} YM2203 check(s) FAILED.`,
);
process.exitCode = failures === 0 ? 0 : 1;
