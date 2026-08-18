export interface GeneratedBerzerkWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

const EXIDY_CLOCK = 3_579_545 / 4;
const SH8253_CLOCK = 3_579_545 / 2;
const BASE_VOLUME = 32767 / 6;

interface ExidyTimer {
  cr: number;
  state: number;
  leftovers: number;
  timer: number;
  counter: number;
  clocks: number;
}

/** MAME's MC6840 + 128-bit noise generator from exidysound.cpp. */
class ExidySoundCore {
  private readonly timers: ExidyTimer[] = Array.from({ length: 3 }, () => ({
    cr: 0, state: 0, leftovers: 0, timer: 0, counter: 0, clocks: 0,
  }));
  private readonly volumes = new Float64Array(3);
  private msbLatch = 0;
  private sfxctrl = 0;
  private clockCarry = 0;
  private lfsrOldXor = 0;
  private lfsr0 = 0xffffffff;
  private lfsr1 = 0xffffffff;
  private lfsr2 = 0xffffffff;
  private lfsr3 = 0xffffffff;

  write6840(offset: number, data: number): void {
    offset &= 7;
    data &= 0xff;
    if (offset === 0) {
      this.timers[this.timers[1]!.cr & 1 ? 0 : 2]!.cr = data;
    } else if (offset === 1) {
      this.timers[1]!.cr = data;
    } else if ((offset & 1) === 0) {
      this.msbLatch = data;
    } else {
      const channel = (offset - 3) >> 1;
      const timer = this.timers[channel]!;
      timer.timer = (this.msbLatch << 8) | data;
      if (!(timer.cr & 0x10)) timer.counter = timer.timer;
    }
  }

  writeControl(offset: number, data: number): void {
    offset &= 3;
    data &= 0xff;
    if (offset === 0) this.sfxctrl = data;
    else this.volumes[offset - 1] = ((data & 7) * BASE_VOLUME) / 7;
  }

  sample(outputRate: number): number {
    this.clockCarry += EXIDY_CLOCK / outputRate;
    const clocksThisSample = Math.floor(this.clockCarry);
    this.clockCarry -= clocksThisSample;
    const [timer0, timer1, timer2] = this.timers as [ExidyTimer, ExidyTimer, ExidyTimer];
    let sample = 0;

    // CR0 bit 0 is the global reset input to the 6840.
    if ((timer0.cr & 1) === 0) {
      const noisy = (timer0.cr & timer1.cr & timer2.cr & 2) === 0;
      let noiseClocks = 0;
      if (noisy && !(this.sfxctrl & 1)) noiseClocks = this.updateNoise(clocksThisSample);

      const oldChannel0Clocks = timer0.clocks;
      this.applyClock(timer0, timer0.cr & 2 ? clocksThisSample : noiseClocks);
      if (timer0.state && !(this.sfxctrl & 2) && (timer0.cr & 0x80)) {
        sample += this.volumes[0]!;
      }

      if (noisy && (this.sfxctrl & 1)) {
        noiseClocks = this.updateNoise(timer0.clocks - oldChannel0Clocks);
      }
      this.applyClock(timer1, timer1.cr & 2 ? clocksThisSample : noiseClocks);
      if (timer1.state && (timer1.cr & 0x80)) sample += this.volumes[1]!;

      let channel2Clocks = timer2.cr & 2 ? clocksThisSample : noiseClocks;
      if (timer2.cr & 1) {
        channel2Clocks += timer2.leftovers;
        timer2.leftovers = channel2Clocks % 8;
        channel2Clocks = Math.floor(channel2Clocks / 8);
      }
      this.applyClock(timer2, channel2Clocks);
      if (timer2.state && (timer2.cr & 0x80)) sample += this.volumes[2]!;
    }
    return sample / 32768;
  }

  private applyClock(timer: ExidyTimer, initialClocks: number): void {
    let clocks = initialClocks;
    if (timer.cr & 4) {
      let low = timer.counter & 0xff;
      let high = (timer.counter >>> 8) & 0xff;
      while (clocks > low) {
        clocks -= low + 1;
        low = timer.timer & 0xff;
        const previousHigh = high;
        high = (high - 1) & 0xff;
        if (previousHigh === 0) {
          timer.state = 0;
          high = (timer.timer >>> 8) & 0xff;
          low = timer.timer & 0xff;
        } else if (high === 0) {
          timer.state = 1;
          timer.clocks++;
        }
      }
      low = (low - clocks) & 0xff;
      timer.counter = (high << 8) | low;
      return;
    }
    while (clocks > timer.counter) {
      clocks -= timer.counter + 1;
      timer.state ^= 1;
      timer.clocks += timer.state;
      timer.counter = timer.timer;
    }
    timer.counter = (timer.counter - clocks) & 0xffff;
  }

  private updateNoise(clocks: number): number {
    let noiseClocks = 0;
    for (let index = 0; index < clocks; index++) {
      const nextXor = ((this.lfsr3 ^ this.lfsr2) >>> 31) & 1;
      this.lfsr3 = ((this.lfsr3 << 1) | (this.lfsr2 >>> 31)) >>> 0;
      this.lfsr2 = ((this.lfsr2 << 1) | (this.lfsr1 >>> 31)) >>> 0;
      this.lfsr1 = ((this.lfsr1 << 1) | (this.lfsr0 >>> 31)) >>> 0;
      this.lfsr0 = ((this.lfsr0 << 1) | (nextXor ^ this.lfsrOldXor)) >>> 0;
      this.lfsrOldXor = nextXor;
      if ((this.lfsr2 & 3) === 1) noiseClocks++;
    }
    return noiseClocks;
  }
}

interface PitChannel {
  access: number;
  mode: number;
  lowLatch: number;
  waitingHigh: boolean;
  divisor: number;
  phase: number;
  enabled: boolean;
}

/** Intel 8253 tone path used by Venture's three music oscillators. */
class ExidyPit8253Core {
  private readonly channels: PitChannel[] = Array.from({ length: 3 }, () => ({
    access: 3,
    mode: 3,
    lowLatch: 0,
    waitingHigh: false,
    divisor: 0x10000,
    phase: 0,
    enabled: false,
  }));

  write(offset: number, data: number): void {
    offset &= 3;
    data &= 0xff;
    if (offset === 3) {
      const channelIndex = (data >>> 6) & 3;
      if (channelIndex === 3) return;
      const access = (data >>> 4) & 3;
      if (access === 0) return; // counter latch command; the sound CPU never reads it
      const channel = this.channels[channelIndex]!;
      channel.access = access;
      channel.mode = ((data >>> 1) & 7) % 6;
      channel.waitingHigh = false;
      // A mode/control write makes the current count null. OUT assumes the
      // mode's initial state, but no further oscillation occurs until the
      // selected byte sequence loads a new count. Venture uses this exact
      // sequence to stop its three-note power-on chord.
      channel.enabled = false;
      return;
    }
    const channel = this.channels[offset]!;
    if (channel.access === 1) {
      this.load(channel, data || 0x100);
    } else if (channel.access === 2) {
      this.load(channel, (data << 8) || 0x10000);
    } else if (!channel.waitingHigh) {
      channel.lowLatch = data;
      channel.waitingHigh = true;
    } else {
      this.load(channel, ((data << 8) | channel.lowLatch) || 0x10000);
      channel.waitingHigh = false;
    }
  }

  sample(outputRate: number): number {
    let sample = 0;
    const clocks = SH8253_CLOCK / outputRate;
    for (const channel of this.channels) {
      if (!channel.enabled) continue;
      channel.phase = (channel.phase + clocks) % channel.divisor;
      // Venture programs the music channels in square-wave modes 2/3. Mode 2
      // has a one-clock low pulse; mode 3 divides evenly (odd counts favour high).
      const high = channel.mode === 2
        ? channel.phase < channel.divisor - 1
        : channel.phase < Math.ceil(channel.divisor / 2);
      if (high) sample += BASE_VOLUME;
    }
    return sample / 32768;
  }

  private load(channel: PitChannel, divisor: number): void {
    channel.divisor = Math.max(1, divisor);
    channel.phase = 0;
    channel.enabled = true;
  }
}

const SpeechState = {
  Idle: 0,
  WordWait: 1,
  CwarMsb: 2,
  CwarLsb: 3,
  DarMsb: 4,
  ControlBits: 5,
  Play: 6,
  Delay: 7,
} as const;

/** Cycle-accurate SSi TSI S14001A state machine, ported from MAME. */
export class S14001aCore {
  private readonly rom: Uint8Array<ArrayBufferLike>;
  private phase1 = false;
  private state1: number = SpeechState.Idle;
  private state2: number = SpeechState.Idle;
  private darHigh1 = 0;
  private darHigh2 = 0;
  private darLow1 = 0;
  private darLow2 = 0;
  private cwar1 = 0;
  private cwar2 = 0;
  private stop1 = false;
  private stop2 = false;
  private voiced1 = false;
  private voiced2 = false;
  private silence1 = false;
  private silence2 = false;
  private length1 = 0;
  private length2 = 0;
  private repeat1 = 0;
  private repeat2 = 0;
  private oldDelta1 = 0;
  private oldDelta2 = 0;
  private darCarry2 = false;
  private quarterCarry2 = false;
  private repeatCarry2 = false;
  private lengthCarry2 = false;
  private romAddress1 = 0;
  private romAddress2 = 0;
  private busy1 = false;
  private startLine = false;
  private word = 0;
  private output1 = 7;
  private output2 = 7;
  private clockCarry = 0;
  private clockRate = 19_531.25;

  constructor(rom: Uint8Array<ArrayBufferLike>) { this.rom = rom; }

  start(word: number): void {
    this.word = word & 0x3f;
    if (!this.startLine) this.state1 = SpeechState.WordWait;
    this.startLine = true;
    this.startLine = false;
  }

  setClock(clock: number): void {
    this.clockRate = Math.max(1, clock);
  }

  busy(): boolean { return this.busy1 || this.state1 !== SpeechState.Idle; }

  /** Advance the chip without producing PCM, for the main-thread busy-line mirror. */
  advanceTime(seconds: number): void {
    if (!(seconds > 0)) return;
    this.clockCarry += this.clockRate * seconds;
    const clocks = Math.floor(this.clockCarry);
    this.clockCarry -= clocks;
    for (let index = 0; index < clocks; index++) this.clock();
  }

  sample(outputRate: number): number {
    this.clockCarry += this.clockRate / outputRate;
    const clocks = Math.floor(this.clockCarry);
    this.clockCarry -= clocks;
    for (let index = 0; index < clocks; index++) this.clock();
    return (this.output2 - 7) / 8;
  }

  private read(address: number): number { return this.rom[address & 0xfff] ?? 0; }

  private clock(): void {
    if (this.phase1) {
      this.phase1 = false;
      this.state2 = this.state1;
      this.darHigh2 = this.darHigh1;
      this.darLow2 = this.darLow1;
      this.cwar2 = this.cwar1;
      this.stop2 = this.stop1;
      this.voiced2 = this.voiced1;
      this.silence2 = this.silence1;
      this.length2 = this.length1;
      this.repeat2 = this.repeat1;
      this.oldDelta2 = this.oldDelta1;
      this.output2 = this.output1;
      this.romAddress2 = this.romAddress1;
      this.darCarry2 = this.darLow2 === 0x1f;
      this.quarterCarry2 = this.darCarry2 && (this.length2 & 3) === 3;
      this.repeatCarry2 = this.quarterCarry2 && (this.length2 & 0x0c) === 0x0c;
      this.lengthCarry2 = this.repeatCarry2 && this.length2 === 0x7f;
      return;
    }
    this.phase1 = true;
    switch (this.state1) {
      case SpeechState.Idle:
        this.output1 = 7;
        if (this.startLine) this.state1 = SpeechState.WordWait;
        this.busy1 = false;
        break;
      case SpeechState.WordWait:
        this.darHigh1 = (this.word & 0x3c) >>> 2;
        this.darLow1 = (this.word & 3) << 3;
        this.romAddress1 = (this.darHigh1 << 3) | (this.darLow1 >>> 2);
        this.output1 = 7;
        this.state1 = this.startLine ? SpeechState.WordWait : SpeechState.CwarMsb;
        this.busy1 = true;
        break;
      case SpeechState.CwarMsb:
        this.cwar1 = this.read(this.romAddress2) << 4;
        this.darLow1 = (this.darLow1 + 4) & 0x1f;
        this.romAddress1 = (this.darHigh1 << 3) | (this.darLow1 >>> 2);
        this.output1 = 7;
        this.state1 = this.startLine ? SpeechState.WordWait : SpeechState.CwarLsb;
        break;
      case SpeechState.CwarLsb:
        this.cwar1 = this.cwar2 | (this.read(this.romAddress2) >>> 4);
        this.romAddress1 = this.cwar1;
        this.output1 = 7;
        this.state1 = this.startLine ? SpeechState.WordWait : SpeechState.DarMsb;
        break;
      case SpeechState.DarMsb:
        this.darHigh1 = (this.read(this.romAddress2) << 1) & 0x1ff;
        this.darLow1 = 0;
        this.cwar1 = (this.cwar1 + 1) & 0xfff;
        this.romAddress1 = this.cwar1;
        this.output1 = 7;
        this.state1 = this.startLine ? SpeechState.WordWait : SpeechState.ControlBits;
        break;
      case SpeechState.ControlBits: {
        const data = this.read(this.romAddress2);
        this.stop1 = Boolean(data & 0x80);
        this.voiced1 = Boolean(data & 0x40);
        this.silence1 = Boolean(data & 0x20);
        this.repeat1 = data & 3;
        this.length1 = (data & 0x1f) << 2;
        this.darLow1 = 0;
        this.cwar1 = (this.cwar1 + 1) & 0xfff;
        this.romAddress1 = this.darHigh1 << 3;
        this.output1 = 7;
        this.state1 = this.startLine ? SpeechState.WordWait : SpeechState.Play;
        break;
      }
      case SpeechState.Play:
        this.play();
        break;
      case SpeechState.Delay:
        this.output1 = 7;
        this.state1 = this.startLine ? SpeechState.WordWait : SpeechState.Idle;
        break;
    }
  }

  private play(): void {
    let deltaAddress = this.darLow2 & 3;
    if (this.voiced2 && (this.length2 & 1)) deltaAddress ^= 3;
    const delta = (this.read(this.romAddress2) >>> ((~deltaAddress << 1) & 6)) & 3;
    let oldDelta = this.oldDelta2;
    const quarter = this.length2 & 3;
    const quarterStart = this.darLow2 === 0;
    if (quarter === 0 && quarterStart) oldDelta = 2;
    const increments = [[3, 3, 1, 1], [1, 1, 0, 0], [0, 0, 1, 1], [1, 1, 3, 3]];
    let increment: number;
    let add: boolean;
    if (!this.voiced2 || !(quarter & 1)) {
      increment = increments[delta]![oldDelta]!;
      add = delta >= 2;
    } else {
      increment = increments[oldDelta]![delta]!;
      add = oldDelta < 2;
    }
    this.oldDelta1 = delta;
    if (this.voiced2 && quarterStart && (quarter & 1)) increment = 0;

    if (this.silence2 || (this.voiced2 && (quarter & 2))) {
      this.output1 = 7;
    } else {
      let output = quarter === 0 && quarterStart ? 7 : this.output2;
      if (!add) output ^= 0x0f;
      output = Math.min(15, output + increment);
      if (!add) output ^= 0x0f;
      this.output1 = output;
    }

    this.darLow1++;
    if (this.darCarry2) {
      this.darLow1 = 0;
      this.length1 = (this.length1 + 1) & 0x7f;
    }
    if (this.voiced2 && this.repeatCarry2) {
      this.length1 = (this.length1 & 0x70) | (this.repeat1 << 2);
      this.darHigh1 = (this.darHigh1 + 1) & 0x1ff;
    }
    if (!this.voiced2 && this.darCarry2) this.darHigh1 = (this.darHigh1 + 1) & 0x1ff;
    this.romAddress1 = this.darLow1;
    if (this.voiced2 && (this.length1 & 1)) this.romAddress1 ^= 0x1f;
    this.romAddress1 = (this.darHigh1 << 3) | (this.romAddress1 >>> 2);

    if (this.startLine) this.state1 = SpeechState.WordWait;
    else if (this.stop2 && this.lengthCarry2) this.state1 = SpeechState.Delay;
    else if (this.lengthCarry2) {
      this.state1 = SpeechState.DarMsb;
      this.romAddress1 = this.cwar1;
    } else this.state1 = SpeechState.Play;
  }
}

export class GeneratedBerzerkSoundCore {
  private readonly exidy = new ExidySoundCore();
  private readonly pit = new ExidyPit8253Core();
  private readonly speech: S14001aCore;
  private readonly outputRate: number;
  private readonly venture: boolean;
  private speechGain = 0;

  constructor(
    outputRate: number,
    speechRom: Uint8Array<ArrayBufferLike> = new Uint8Array(0x1000),
    venture = false,
  ) {
    this.outputRate = outputRate;
    this.speech = new S14001aCore(speechRom);
    this.venture = venture;
  }

  write(offset: number, data: number, method = 'sh6840_w'): void {
    if (method === 'sh6840_w') this.exidy.write6840(offset, data);
    else if (method === 'sfxctrl_w') this.exidy.writeControl(offset, data);
    else if (method === 'sh8253_w') this.pit.write(offset, data);
    else if (method === 'speech_start') this.speech.start(data);
    else if (method === 'speech_clock') this.speech.setClock(data);
    else if (method === 'speech_gain') this.speechGain = (data & 0xff) / 255;
  }

  sample(): number {
    if (this.venture) {
      const mix = (this.exidy.sample(this.outputRate) + this.pit.sample(this.outputRate)) * 0.5;
      return Math.max(-1, Math.min(1, mix));
    }
    // Driver routes: EXIDY -> mono 0.33; S14001A -> volume 0.5 -> mono 1.0.
    const mix = this.exidy.sample(this.outputRate) * 0.33 +
      this.speech.sample(this.outputRate) * this.speechGain * 0.5;
    return Math.max(-1, Math.min(1, mix));
  }
}

export class GeneratedBerzerkSoundFrameRenderer {
  private carry = 0;
  private readonly core: GeneratedBerzerkSoundCore;
  private readonly rate: number;
  private readonly refresh: number;
  constructor(
    core: GeneratedBerzerkSoundCore,
    rate: number,
    refresh: number,
  ) {
    this.core = core;
    this.rate = rate;
    this.refresh = refresh;
  }
  render(writes: readonly GeneratedBerzerkWrite[]): Float32Array {
    this.carry += this.rate / this.refresh;
    const count = Math.floor(this.carry);
    this.carry -= count;
    const output = new Float32Array(count);
    let cursor = 0;
    for (const write of writes) {
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
      while (cursor < at) output[cursor++] = this.core.sample();
      this.core.write(write.offset, write.data, write.method);
    }
    while (cursor < count) output[cursor++] = this.core.sample();
    return output;
  }
}

declare const sampleRate: number;
declare class AudioWorkletProcessor { readonly port: MessagePort; constructor(); }
declare function registerProcessor(name: string, ctor: new () => AudioWorkletProcessor): void;

// Keeping the processor declaration behind the worklet-global check also lets
// the browser runtime import S14001aCore as its source-identical busy mirror.
if (typeof AudioWorkletProcessor !== 'undefined') {
  class BerzerkProcessor extends AudioWorkletProcessor {
    private renderer?: GeneratedBerzerkSoundFrameRenderer;
    private readonly frames: Float32Array[] = [];
    private current?: Float32Array;
    private cursor = 0;
    constructor() {
      super();
      this.port.onmessage = (event: MessageEvent) => {
        const message = event.data as {
          type: string;
          refresh?: number;
          sampleRom?: Uint8Array;
          deviceType?: string;
          writes?: GeneratedBerzerkWrite[];
        };
        if (message.type === 'init') {
          this.renderer = new GeneratedBerzerkSoundFrameRenderer(
            new GeneratedBerzerkSoundCore(
              sampleRate,
              message.sampleRom,
              message.deviceType === 'EXIDY_VENTURE',
            ),
            sampleRate,
            message.refresh ?? 60,
          );
        } else if (message.type === 'batch' && this.renderer) {
          this.frames.push(this.renderer.render(message.writes ?? []));
          while (this.frames.length > 3) this.frames.shift();
        }
      };
    }
    private lastSample = 0;

    process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
      const output = outputs[0]?.[0];
      if (!output) return true;
      for (let index = 0; index < output.length; index++) {
        while (!this.current || this.cursor >= this.current.length) {
          this.current = this.frames.shift();
          this.cursor = 0;
          if (!this.current) break;
        }
        // Hold the last sample when starved: a 0-fill pops on DC-offset mixes.
        output[index] = this.lastSample = this.current?.[this.cursor++] ?? this.lastSample;
      }
      return true;
    }
  }

  registerProcessor('berzerk', BerzerkProcessor);
  registerProcessor('exidy', class extends BerzerkProcessor {});
}
