// POKEY (Atari CO12294) lowered from MAME's `src/devices/sound/pokey.cpp`.
//
// The chip is a four-channel divider bank whose tone shaping comes entirely
// from polynomial counters, so almost none of its behaviour is expressible as
// a table of samples: what varies between boards is the register bitfield map,
// the two prescaler divisors and the polynomial taps. Those are the facts this
// compiler reads out of MAME; the worklet below runs MAME's own per-clock
// algorithm against them.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MameHardwareDefinition } from './hardware.ts';

export interface GeneratedPokeyLfsr {
  /** Register width in bits. */
  size: number;
  /** Bit positions XORed to form the incoming bit. */
  taps: number[];
}

export interface GeneratedPokeyPlan {
  schemaVersion: 1;
  type: string;
  className: string;
  /** Write-register offsets, from the `POKEY WRITE LOGICALS` enum. */
  registers: Record<string, number>;
  /** AUDCx bitfields. */
  audc: Record<string, number>;
  /** AUDCTL bitfields. */
  audctl: Record<string, number>;
  /** SKCTL reset mask — the chip only counts when it is out of reset. */
  skReset: number;
  /** Prescaler divisors for the 64 kHz and 15 kHz clocks. */
  div64: number;
  div15: number;
  /** LEGACY_LINEAR output gain per volume step. */
  defaultGain: number;
  poly4: GeneratedPokeyLfsr;
  poly5: GeneratedPokeyLfsr;
  poly9: GeneratedPokeyLfsr;
  poly17: GeneratedPokeyLfsr;
  sourceFiles: string[];
  source: { file: string; line: number };
}

/** `#define NAME value` with the C integer arithmetic MAME's constants use. */
function defineValue(source: string, name: string): number {
  const match = new RegExp(`^#define\\s+${name}\\s+(.+)$`, 'm').exec(source);
  if (!match) throw new Error(`POKEY: #define ${name} not found`);
  const expression = match[1]!.replace(/\/\*.*?\*\//g, '').trim();
  const value = integerExpression(expression);
  if (value === undefined) {
    throw new Error(`POKEY: unsupported #define ${name} "${expression}"`);
  }
  return value;
}

/**
 * C integer semantics, which is the whole point: POKEY_DEFAULT_GAIN is
 * `(32767/11/4)`, and evaluating that in floating point yields 744.7 rather
 * than the 744 the chip is actually scaled by.
 */
function integerExpression(expression: string): number | undefined {
  const trimmed = expression.replace(/^\(|\)$/g, '').trim();
  if (/^0x[0-9a-f]+$/i.test(trimmed)) return Number.parseInt(trimmed, 16);
  if (/^\d+$/.test(trimmed)) return Number.parseInt(trimmed, 10);
  const division = /^(.+)\/([^/]+)$/.exec(trimmed);
  if (division) {
    const left = integerExpression(division[1]!);
    const right = integerExpression(division[2]!);
    if (left === undefined || right === undefined || right === 0) return undefined;
    return Math.trunc(left / right);
  }
  return undefined;
}

/** Members of a C enum body, as `NAME = value` pairs. */
function enumValues(source: string, marker: string): Record<string, number> {
  const at = source.indexOf(marker);
  if (at < 0) throw new Error(`POKEY: enum marked "${marker}" not found`);
  const open = source.indexOf('{', source.lastIndexOf('enum', at));
  const close = source.indexOf('}', at);
  if (open < 0 || close < 0) throw new Error(`POKEY: enum "${marker}" is unterminated`);
  const values: Record<string, number> = {};
  for (const item of source.slice(open + 1, close).split(',')) {
    const match = /(\w+)\s*=\s*(0x[0-9a-fA-F]+|\d+)/.exec(item);
    if (match) values[match[1]!] = Number(match[2]);
  }
  return values;
}

/**
 * The 4/5-bit polynomials are one recurrence and the 9/17-bit ones another, so
 * each is matched against the shape MAME writes it in. A tap that moved would
 * change every noise timbre the chip produces, so a shape that no longer
 * matches is an error rather than a default.
 */
function polyTaps(source: string): Pick<GeneratedPokeyPlan, 'poly4' | 'poly5' | 'poly9' | 'poly17'> {
  const shortForm = /lfsr\s*=\s*\(lfsr\s*<<\s*1\)\s*\|\s*\(~\(\(lfsr\s*>>\s*(\d+)\)\s*\^\s*\(lfsr\s*>>\s*(\w+)\)\)\s*&\s*1\)/
    .exec(source);
  if (!shortForm) throw new Error('POKEY: poly_init_4_5 recurrence not recognised');
  if (shortForm[2] !== 'xorbit') {
    throw new Error(`POKEY: poly_init_4_5 second tap is "${shortForm[2]}", expected xorbit`);
  }
  const xorbit = /int const xorbit\s*=\s*size\s*-\s*(\d+);/.exec(source);
  if (!xorbit) throw new Error('POKEY: poly_init_4_5 xorbit definition not found');
  const low = Number(shortForm[1]);
  const back = Number(xorbit[1]);
  const shortTaps = (size: number): GeneratedPokeyLfsr => ({ size, taps: [low, size - back] });

  const in8 = /const uint32_t in8\s*=\s*BIT\(lfsr,\s*(\d+)\)\s*\^\s*BIT\(lfsr,\s*(\d+)\);/.exec(source);
  if (!in8) throw new Error('POKEY: poly_init_9_17 17-bit recurrence not recognised');
  const nine = /const uint32_t in\s*=\s*BIT\(lfsr,\s*(\d+)\)\s*\^\s*BIT\(lfsr,\s*(\d+)\);/.exec(source);
  if (!nine) throw new Error('POKEY: poly_init_9_17 9-bit recurrence not recognised');
  return {
    poly4: shortTaps(4),
    poly5: shortTaps(5),
    poly9: { size: 9, taps: [Number(nine[1]), Number(nine[2])] },
    poly17: { size: 17, taps: [Number(in8[1]), Number(in8[2])] },
  };
}

export function compilePokey(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedPokeyPlan {
  const source = readFileSync(join(mameSrc, definition.sourceFile), 'utf8');
  const header = readFileSync(join(mameSrc, 'src/devices/sound/pokey.h'), 'utf8');
  const audc = Object.fromEntries(
    ['NOTPOLY5', 'POLY4', 'PURE', 'VOLUME_ONLY', 'VOLUME_MASK']
      .map(name => [name, defineValue(source, name)]),
  );
  const audctl = Object.fromEntries(
    ['POLY9', 'CH1_HICLK', 'CH3_HICLK', 'CH12_JOINED', 'CH34_JOINED', 'CH1_FILTER',
      'CH2_FILTER', 'CLK_15KHZ'].map(name => [name, defineValue(source, name)]),
  );
  const update = source.indexOf('void pokey_device::sound_stream_update');
  return {
    schemaVersion: 1,
    type: definition.type,
    className: definition.className,
    registers: enumValues(header, 'AUDF1_C'),
    audc,
    audctl,
    skReset: defineValue(source, 'SK_RESET'),
    div64: defineValue(source, 'DIV_64'),
    div15: defineValue(source, 'DIV_15'),
    defaultGain: defineValue(source, 'POKEY_DEFAULT_GAIN'),
    ...polyTaps(source),
    sourceFiles: [definition.sourceFile, 'src/devices/sound/pokey.h'],
    source: {
      file: definition.sourceFile,
      line: source.slice(0, Math.max(0, update)).split('\n').length,
    },
  };
}

/**
 * Emit the POKEY engine hosted inside a board's primary audio worklet.
 *
 * This runs MAME's `step_one_clock` once per chip clock, which is what the
 * hardware does and what the polynomial counters require: the tone a channel
 * produces is the polynomial bit standing at the moment its divider borrows,
 * so sampling the chip any more coarsely than its own clock changes the sound.
 *
 * Scope: the audio path. POKEY's serial port, keyboard scanner, potentiometer
 * counters and IRQ line are not driven — no board that reaches this worklet
 * binds them to a speaker, and `pokey_device::irq_w` is unbound on every one.
 * Two-tone serial modulation of channel 2 is likewise absent, since it needs
 * the serial shift register this engine does not keep.
 */
export function generatedPokeyCoreSource(plan: GeneratedPokeyPlan): string {
  return `
// GENERATED from ${plan.source.file}:${plan.source.line}; do not edit.
// Register map, prescaler divisors, polynomial taps and output gain are all
// read out of MAME's pokey.cpp by src/mame/pokey-compiler.ts.
const pokeyPlan = ${JSON.stringify(plan, null, 2)};

/** MAME poly_init_4_5: a left-shifting LFSR with an inverted feedback bit. */
function pokeyPoly45(size: number, taps: readonly number[]): Uint8Array {
  const mask = (1 << size) - 1;
  const table = new Uint8Array(mask);
  let lfsr = 0;
  for (let index = 0; index < mask; index++) {
    lfsr = (lfsr << 1) | (~((lfsr >>> taps[0]!) ^ (lfsr >>> taps[1]!)) & 1);
    table[index] = lfsr & 1;
  }
  return table;
}

/** MAME poly_init_9_17: a right-shifting LFSR seeded all-ones. */
function pokeyPoly917(size: number, taps: readonly number[]): Uint8Array {
  const mask = size === 17 ? 0x1ffff : 0x1ff;
  const table = new Uint8Array(mask);
  let lfsr = mask;
  for (let index = 0; index < mask; index++) {
    if (size === 17) {
      const in8 = ((lfsr >>> taps[0]!) & 1) ^ ((lfsr >>> taps[1]!) & 1);
      const carry = lfsr & 1;
      lfsr = lfsr >>> 1;
      lfsr = (lfsr & 0xff7f) | (in8 << 7);
      lfsr = (carry << 16) | lfsr;
    } else {
      const carry = ((lfsr >>> taps[0]!) & 1) ^ ((lfsr >>> taps[1]!) & 1);
      lfsr = lfsr >>> 1;
      lfsr = (carry << 8) | lfsr;
    }
    table[index] = lfsr & 1;
  }
  return table;
}

const POKEY_POLY4 = pokeyPoly45(pokeyPlan.poly4.size, pokeyPlan.poly4.taps);
const POKEY_POLY5 = pokeyPoly45(pokeyPlan.poly5.size, pokeyPlan.poly5.taps);
const POKEY_POLY9 = pokeyPoly917(pokeyPlan.poly9.size, pokeyPlan.poly9.taps);
const POKEY_POLY17 = pokeyPoly917(pokeyPlan.poly17.size, pokeyPlan.poly17.taps);

export class GeneratedPokeyCore {
  private readonly audf = new Uint8Array(4);
  private readonly audc = new Uint8Array(4);
  private readonly counter = new Int32Array(4);
  private readonly borrow = new Int32Array(4);
  private readonly output = new Uint8Array(4);
  private readonly filterSample = new Uint8Array(4);
  private audctl = 0;
  private skctl = 0;
  private p4 = 0;
  private p5 = 0;
  private p9 = 0;
  private p17 = 0;
  private clock28 = 0;
  private clock114 = 0;
  private outRaw = 0;
  private rawInvalid = false;
  private phase = 0;
  private readonly clock: number;
  private readonly outputRate: number;

  constructor(clock: number, outputRate: number) {
    this.clock = clock;
    this.outputRate = outputRate;
    for (let channel = 0; channel < 4; channel++) this.resetChannel(channel);
  }

  private resetChannel(channel: number): void {
    this.counter[channel] = this.audf[channel]! ^ 0xff;
    this.borrow[channel] = 0;
  }

  private incChannel(channel: number, cycles: number): void {
    this.counter[channel] = (this.counter[channel]! + 1) & 0xff;
    if (this.counter[channel] === 0 && this.borrow[channel] === 0) {
      this.borrow[channel] = cycles;
    }
  }

  private checkBorrow(channel: number): boolean {
    if (this.borrow[channel]! > 0) {
      this.borrow[channel]!--;
      return this.borrow[channel] === 0;
    }
    return false;
  }

  private processChannel(channel: number): void {
    if ((this.audc[channel]! & pokeyPlan.audc.NOTPOLY5) || POKEY_POLY5[this.p5]) {
      if (this.audc[channel]! & pokeyPlan.audc.PURE) {
        this.output[channel] ^= 1;
      } else if (this.audc[channel]! & pokeyPlan.audc.POLY4) {
        this.output[channel] = POKEY_POLY4[this.p4]!;
      } else if (this.audctl & pokeyPlan.audctl.POLY9) {
        this.output[channel] = POKEY_POLY9[this.p9]!;
      } else {
        this.output[channel] = POKEY_POLY17[this.p17]!;
      }
      this.rawInvalid = true;
    }
  }

  write(offset: number, data: number): void {
    const value = data & 0xff;
    switch (offset & 15) {
      case pokeyPlan.registers.AUDF1_C: this.audf[0] = value; return;
      case pokeyPlan.registers.AUDF2_C: this.audf[1] = value; return;
      case pokeyPlan.registers.AUDF3_C: this.audf[2] = value; return;
      case pokeyPlan.registers.AUDF4_C: this.audf[3] = value; return;
      case pokeyPlan.registers.AUDC1_C: this.audc[0] = value; this.rawInvalid = true; return;
      case pokeyPlan.registers.AUDC2_C: this.audc[1] = value; this.rawInvalid = true; return;
      case pokeyPlan.registers.AUDC3_C: this.audc[2] = value; this.rawInvalid = true; return;
      case pokeyPlan.registers.AUDC4_C: this.audc[3] = value; this.rawInvalid = true; return;
      case pokeyPlan.registers.AUDCTL_C:
        if (value === this.audctl) return;
        this.audctl = value;
        this.rawInvalid = true;
        return;
      case pokeyPlan.registers.STIMER_C:
        // Documented side effect: every counter returns to zero.
        for (let channel = 0; channel < 4; channel++) {
          this.resetChannel(channel);
          this.output[channel] = 0;
          this.filterSample[channel] = channel < 2 ? 1 : 0;
        }
        this.rawInvalid = true;
        return;
      case pokeyPlan.registers.SKCTL_C:
        if (value === this.skctl) return;
        this.skctl = value;
        if (!(value & pokeyPlan.skReset)) {
          // Out of SK_RESET every polynomial counter is held at zero.
          this.p4 = 0;
          this.p5 = 0;
          this.p9 = 0;
          this.p17 = 0;
          this.clock28 = 0;
          this.clock114 = 0;
        }
        return;
      default:
        return;
    }
  }

  private stepOneClock(): void {
    let trigger28 = false;
    let trigger114 = false;
    if (this.skctl & pokeyPlan.skReset) {
      if (++this.p4 === 0x0000f) this.p4 = 0;
      if (++this.p5 === 0x0001f) this.p5 = 0;
      if (++this.p9 === 0x001ff) this.p9 = 0;
      if (++this.p17 === 0x1ffff) this.p17 = 0;
      if (++this.clock28 >= pokeyPlan.div64) { this.clock28 = 0; trigger28 = true; }
      if (++this.clock114 >= pokeyPlan.div15) { this.clock114 = 0; trigger114 = true; }
      const baseTriggered = (this.audctl & pokeyPlan.audctl.CLK_15KHZ) ? trigger114 : trigger28;

      if (this.audctl & pokeyPlan.audctl.CH1_HICLK) {
        this.incChannel(0, (this.audctl & pokeyPlan.audctl.CH12_JOINED) ? 7 : 4);
      } else if (baseTriggered) {
        this.incChannel(0, 1);
      }
      if (this.audctl & pokeyPlan.audctl.CH3_HICLK) {
        this.incChannel(2, (this.audctl & pokeyPlan.audctl.CH34_JOINED) ? 7 : 4);
      } else if (baseTriggered) {
        this.incChannel(2, 1);
      }
      if (baseTriggered) {
        if (!(this.audctl & pokeyPlan.audctl.CH12_JOINED)) this.incChannel(1, 1);
        if (!(this.audctl & pokeyPlan.audctl.CH34_JOINED)) this.incChannel(3, 1);
      }
    }

    if (this.checkBorrow(2)) {
      if (this.audctl & pokeyPlan.audctl.CH34_JOINED) this.incChannel(3, 1);
      else this.resetChannel(2);
      this.processChannel(2);
      this.filterSample[0] = (this.audctl & pokeyPlan.audctl.CH1_FILTER)
        ? this.output[0]!
        : 1;
      this.rawInvalid = true;
    }
    if (this.checkBorrow(3)) {
      if (this.audctl & pokeyPlan.audctl.CH34_JOINED) this.resetChannel(2);
      this.resetChannel(3);
      this.processChannel(3);
      this.filterSample[1] = (this.audctl & pokeyPlan.audctl.CH2_FILTER)
        ? this.output[1]!
        : 1;
      this.rawInvalid = true;
    }
    if (this.checkBorrow(0)) {
      if (this.audctl & pokeyPlan.audctl.CH12_JOINED) this.incChannel(1, 1);
      else this.resetChannel(0);
      this.processChannel(0);
    }
    if (this.checkBorrow(1)) {
      if (this.audctl & pokeyPlan.audctl.CH12_JOINED) this.resetChannel(0);
      this.resetChannel(1);
      this.processChannel(1);
    }

    if (this.rawInvalid) {
      let sum = 0;
      for (let channel = 0; channel < 4; channel++) {
        const audible = (this.output[channel]! ^ this.filterSample[channel]!) ||
          (this.audc[channel]! & pokeyPlan.audc.VOLUME_ONLY);
        if (audible) {
          sum |= (this.audc[channel]! & pokeyPlan.audc.VOLUME_MASK) << (channel * 4);
        }
      }
      this.rawInvalid = false;
      this.outRaw = sum;
    }
  }

  /** One host sample, LEGACY_LINEAR: the four volume nibbles, summed. */
  sample(): number {
    this.phase += this.clock / this.outputRate;
    let steps = Math.floor(this.phase);
    this.phase -= steps;
    // A stalled worklet must never turn into an unbounded catch-up burst.
    if (steps > 4096) steps = 4096;
    for (let step = 0; step < steps; step++) this.stepOneClock();
    let out = 0;
    for (let channel = 0; channel < 4; channel++) out += (this.outRaw >> (4 * channel)) & 0x0f;
    out *= pokeyPlan.defaultGain;
    if (out > 0x7fff) out = 0x7fff;
    return out / 32768;
  }
}
`;
}
