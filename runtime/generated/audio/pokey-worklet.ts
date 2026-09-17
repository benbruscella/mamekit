
// GENERATED from src/devices/sound/pokey.cpp:840; do not edit.
// Register map, prescaler divisors, polynomial taps and output gain are all
// read out of MAME's pokey.cpp by src/mame/pokey-compiler.ts.
const pokeyPlan = {
  "schemaVersion": 1,
  "type": "POKEY",
  "className": "pokey_device",
  "registers": {
    "AUDF1_C": 0,
    "AUDC1_C": 1,
    "AUDF2_C": 2,
    "AUDC2_C": 3,
    "AUDF3_C": 4,
    "AUDC3_C": 5,
    "AUDF4_C": 6,
    "AUDC4_C": 7,
    "AUDCTL_C": 8,
    "STIMER_C": 9,
    "SKREST_C": 10,
    "POTGO_C": 11,
    "SEROUT_C": 13,
    "IRQEN_C": 14,
    "SKCTL_C": 15
  },
  "audc": {
    "NOTPOLY5": 128,
    "POLY4": 64,
    "PURE": 32,
    "VOLUME_ONLY": 16,
    "VOLUME_MASK": 15
  },
  "audctl": {
    "POLY9": 128,
    "CH1_HICLK": 64,
    "CH3_HICLK": 32,
    "CH12_JOINED": 16,
    "CH34_JOINED": 8,
    "CH1_FILTER": 4,
    "CH2_FILTER": 2,
    "CLK_15KHZ": 1
  },
  "skReset": 3,
  "div64": 28,
  "div15": 114,
  "defaultGain": 744,
  "poly4": {
    "size": 4,
    "taps": [
      2,
      3
    ]
  },
  "poly5": {
    "size": 5,
    "taps": [
      2,
      4
    ]
  },
  "poly9": {
    "size": 9,
    "taps": [
      0,
      5
    ]
  },
  "poly17": {
    "size": 17,
    "taps": [
      8,
      13
    ]
  },
  "sourceFiles": [
    "src/devices/sound/pokey.cpp",
    "src/devices/sound/pokey.h"
  ],
  "source": {
    "file": "src/devices/sound/pokey.cpp",
    "line": 840
  }
};

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


export interface GeneratedPokeyWrite {
  offset: number;
  data: number;
  frac?: number;
}

export class GeneratedPokeyFrameRenderer {
  private sampleCarry = 0;
  private readonly core: GeneratedPokeyCore;
  private readonly outputRate: number;
  private readonly refresh: number;

  constructor(core: GeneratedPokeyCore, outputRate: number, refresh: number) {
    this.core = core;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedPokeyWrite[]): Float32Array {
    this.sampleCarry += this.outputRate / this.refresh;
    const count = Math.floor(this.sampleCarry);
    this.sampleCarry -= count;
    const output = new Float32Array(count);
    let sampleIndex = 0;
    for (const write of writes) {
      const writeSample = Math.ceil(
        Math.max(0, Math.min(1, write.frac ?? 0)) * count,
      );
      while (sampleIndex < writeSample) output[sampleIndex++] = this.core.sample();
      this.core.write(write.offset, write.data);
    }
    while (sampleIndex < count) output[sampleIndex++] = this.core.sample();
    return output;
  }
}

declare const sampleRate: number;
declare class AudioWorkletProcessor {
  readonly port: MessagePort;
  constructor();
}
declare function registerProcessor(
  name: string,
  processorCtor: new () => AudioWorkletProcessor,
): void;

class GeneratedPokeyProcessor extends AudioWorkletProcessor {
  private renderer?: GeneratedPokeyFrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array;
  private currentIndex = 0;
  private lastSample = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        clock?: number;
        refresh?: number;
        writes?: GeneratedPokeyWrite[];
      };
      if (message.type === 'init') {
        const core = new GeneratedPokeyCore(message.clock ?? 1_500_000, sampleRate);
        this.renderer = new GeneratedPokeyFrameRenderer(
          core,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 3) this.frames.shift();
      }
    };
  }

  private nextSample(): number {
    while (!this.current || this.currentIndex >= this.current.length) {
      this.current = this.frames.shift();
      this.currentIndex = 0;
      if (!this.current) return this.lastSample;
    }
    return (this.lastSample = this.current[this.currentIndex++]!);
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    for (let index = 0; index < output.length; index++) output[index] = this.nextSample();
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('pokey', GeneratedPokeyProcessor);
