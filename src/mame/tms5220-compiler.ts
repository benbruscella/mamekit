// TMS5220 LPC speech synthesiser, lowered from MAME's
// `src/devices/sound/tms5220.cpp` and its coefficient tables in
// `src/devices/sound/tms5110r.hxx`.
//
// Everything that makes one TI speech variant sound different from another is
// a table: the energy, pitch and reflection-coefficient quantisation ladders,
// the chirp used to excite voiced frames and the per-interpolation-period
// shift schedule. Those tables are read out of MAME here, and the engine the
// compiler emits is MAME's own per-sample algorithm running against them.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  braceBody,
  initializerItems,
  initializerNumbers,
  objectMacros,
  stripCppComments,
} from './initializer.ts';
import type { MameHardwareDefinition } from './hardware.ts';

export interface GeneratedTms5220Plan {
  schemaVersion: 1;
  type: string;
  className: string;
  /** Coefficient set this variant selects in `device_start`. */
  coefficients: string;
  numK: number;
  energyBits: number;
  pitchBits: number;
  kBits: number[];
  energyTable: number[];
  pitchTable: number[];
  kTable: number[][];
  chirpTable: number[];
  /** Right-shift applied per interpolation period. */
  interpCoeff: number[];
  /** Interpolation-period reload, indexed by the 5220C rate nibble. */
  reloadTable: number[];
  fifoSize: number;
  /** Output sample rate is the device clock divided by this. */
  clockDivider: number;
  /** 5220C and CD2501ECD take a rate command and per-frame rate bits. */
  hasRateControl: boolean;
  /** Device clocks /READY stays inactive after /WS falls. */
  readyClocks: number;
  subcycleReload: number;
  /** MAME's `FAST_START_HACK`: TALK is raised as soon as SPEN is. */
  fastStart: boolean;
  /** MAME's `FORCE_DIGITAL`: 0 selects the clipped 8-bit analog SPK pin. */
  forceDigital: boolean;
  sourceFiles: string[];
  source: { file: string; line: number };
}

/** `static const struct tms5100_coeffs NAME = { ... }`, with macros expanded. */
function coefficientBody(header: string, name: string, macros: Map<string, string>): string {
  const at = header.indexOf(`tms5100_coeffs ${name}`);
  if (at < 0) throw new Error(`TMS5220: coefficient set ${name} not found`);
  const body = braceBody(header, header.indexOf('{', at), `${name} coefficients`);
  // The struct is written as a handful of table macros; expanding them is what
  // turns it back into the initializer the fields below are read from.
  let expanded = body;
  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    for (const [macro, value] of macros) {
      if (!new RegExp(`\\b${macro}\\b`).test(expanded)) continue;
      expanded = expanded.replace(new RegExp(`\\b${macro}\\b`, 'g'), value);
      changed = true;
    }
    if (!changed) break;
  }
  return expanded;
}

function numberList(text: string, subject: string): number[] {
  return initializerNumbers(text, subject);
}

export function compileTms5220(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedTms5220Plan {
  const source = readFileSync(join(mameSrc, definition.sourceFile), 'utf8');
  const headerPath = 'src/devices/sound/tms5110r.hxx';
  const rawHeader = readFileSync(join(mameSrc, headerPath), 'utf8');
  const macros = objectMacros(rawHeader);
  const header = stripCppComments(rawHeader);
  // Which coefficient set the variant picks is a fact of device_start, not a
  // choice: reading the wrong ladder detunes every phoneme the chip speaks.
  const coefficients = 'tms5220_coeff';
  const body = coefficientBody(header, coefficients, macros);
  const items = initializerItems(body);
  // subtype, num_k, energy_bits, pitch_bits, kbits[], energytable[],
  // pitchtable[], ktable[][], chirptable[], interp_coeff[]
  if (items.length < 10) {
    throw new Error(`TMS5220: ${coefficients} has ${items.length} fields, expected 10`);
  }
  const numK = Number(items[1]);
  const energyBits = Number(items[2]);
  const pitchBits = Number(items[3]);
  const kBits = numberList(items[4]!, 'kbits');
  const energyTable = numberList(items[5]!, 'energytable');
  const pitchTable = numberList(items[6]!, 'pitchtable');
  const kTable = initializerItems(items[7]!.replace(/^\s*\{|\}\s*$/g, ''))
    .map((row, index) => numberList(row, `ktable[${index}]`));
  const chirpTable = numberList(items[8]!, 'chirptable');
  const interpCoeff = numberList(items[9]!, 'interp_coeff');
  if (kTable.length !== numK) {
    throw new Error(`TMS5220: ktable has ${kTable.length} rows, expected ${numK}`);
  }

  const stripped = stripCppComments(source);
  const reload = /reload_table\[4\]\s*=\s*\{([^}]*)\}/.exec(stripped);
  if (!reload) throw new Error('TMS5220: reload_table not found');
  const divider = /set_sample_rate\(clock\(\)\s*\/\s*(\d+)\)/.exec(stripped);
  if (!divider) throw new Error('TMS5220: stream sample rate divider not found');
  const ready = /m_timer_io_ready->adjust\(clocks_to_attotime\((\d+)\),\s*1\)/.exec(stripped);
  if (!ready) throw new Error('TMS5220: /READY hold time not found');
  const subcycle = /#define FORCE_SUBC_RELOAD\s+(\d+)/.exec(source);
  if (!subcycle) throw new Error('TMS5220: FORCE_SUBC_RELOAD not found');
  const fifo = /FIFO_SIZE\s*=\s*(\d+)/.exec(
    readFileSync(join(mameSrc, 'src/devices/sound/tms5220.h'), 'utf8'),
  );
  if (!fifo) throw new Error('TMS5220: FIFO_SIZE not found');

  return {
    schemaVersion: 1,
    type: definition.type,
    className: definition.className,
    coefficients,
    numK,
    energyBits,
    pitchBits,
    kBits,
    energyTable,
    pitchTable,
    kTable,
    chirpTable,
    interpCoeff,
    reloadTable: numberList(reload[1]!, 'reload_table'),
    fifoSize: Number(fifo[1]),
    clockDivider: Number(divider[1]),
    // TMS5220_HAS_RATE_CONTROL in MAME; the C variant is the rate-capable one.
    hasRateControl: /5220C|CD2501ECD/i.test(definition.type),
    readyClocks: Number(ready[1]),
    subcycleReload: Number(subcycle[1]),
    fastStart: /#define FAST_START_HACK\s+1/.test(source),
    forceDigital: !/#define FORCE_DIGITAL\s+0/.test(source),
    sourceFiles: [definition.sourceFile, headerPath, 'src/devices/sound/tms5220.h'],
    source: {
      file: definition.sourceFile,
      line: stripped.slice(0, stripped.indexOf('void tms5220_device::process')).split('\n').length,
    },
  };
}

/**
 * Emit the TMS5220 speech engine.
 *
 * Unlike the other chips on a sound board this one runs on the main thread
 * rather than inside the audio worklet, because its /READY pin is wired back
 * into a port the sound CPU polls before every byte it writes. Ready depends
 * on the FIFO level, the FIFO level depends on how fast the frame parser
 * consumes bits, and the parser is the synthesiser — so either the whole chip
 * lives beside the CPU that talks to it, or its state has to exist twice. It
 * lives here; only the PCM it produces crosses to the worklet.
 *
 * Scope: `data_w`, `/WS`, `/RS`, `/READY` and status reads, which is what a
 * FIFO-driven ('speak external') board uses. The VSM serial ROM interface —
 * `m0`/`m1`/`addr` and the read-byte, read-and-branch and load-address
 * commands that drive it — is not implemented, and any board that binds it
 * would need it added; MAME's own `read_bits` returns all-ones there, which
 * is what this engine does too.
 */
export function generatedTms5220CoreSource(plan: GeneratedTms5220Plan): string {
  return `// GENERATED from ${plan.source.file}:${plan.source.line}; do not edit.
// Energy, pitch, reflection-coefficient, chirp and interpolation tables come
// from MAME's ${plan.coefficients} in src/devices/sound/tms5110r.hxx.
const plan = ${JSON.stringify(plan, null, 2)};

const ENERGY = Int32Array.from(plan.energyTable);
const PITCH = Int32Array.from(plan.pitchTable);
const KTABLE = plan.kTable.map(row => Int32Array.from(row));
const CHIRP = Int8Array.from(plan.chirpTable.map(value => (value << 24) >> 24));
const INTERP = Int32Array.from(plan.interpCoeff);
const RELOAD = Int32Array.from(plan.reloadTable);
const NO_COMMAND = 2;

export class GeneratedTms5220Core {
  private readonly fifo = new Uint8Array(plan.fifoSize);
  private fifoHead = 0;
  private fifoTail = 0;
  private fifoCount = 0;
  private fifoBitsTaken = 0;
  private spen = false;
  private talk = false;
  private talkd = false;
  private ddis = false;
  private previousTalkStatus = false;
  private bufferLow = true;
  private bufferEmpty = true;
  private zpar = false;
  private uvZpar = false;
  private olde = true;
  private oldp = true;
  private inhibit = true;
  private newFrameEnergyIdx = 0;
  private newFramePitchIdx = 0;
  private readonly newFrameKIdx = new Int32Array(plan.numK);
  private currentEnergy = 0;
  private currentPitch = 0;
  private previousEnergy = 0;
  private readonly currentK = new Int32Array(plan.numK);
  private readonly u = new Int32Array(plan.numK + 1);
  private readonly x = new Int32Array(plan.numK);
  private rng = 0x1fff;
  private excitation = 0;
  private ip = RELOAD[0]!;
  private pc = 0;
  private subcycle = 0;
  private pitchCount = 0;
  private pitchZero = false;
  private commandRegister = NO_COMMAND;
  private cVariantRate = 0;
  private rsWs = 0x03;
  private trueTiming = false;
  private ioReady = true;
  private dataLatched = false;
  private writeLatch = 0;
  private readLatch = 0xff;
  private rdbFlag = false;
  /** Device clocks remaining before /READY returns, or 0 when idle. */
  private readyCountdown = 0;
  private clockCarry = 0;

  /** Native output rate, clock / 80. */
  sampleRate: number;

  constructor(clock: number) {
    this.sampleRate = clock / plan.clockDivider;
    this.reset();
  }

  /** MAME set_unscaled_clock; gauntlet's speech-squeak line retunes the chip. */
  setClock(clock: number): void {
    if (clock > 0) this.sampleRate = clock / plan.clockDivider;
  }

  reset(): void {
    this.fifo.fill(0);
    this.fifoHead = this.fifoTail = this.fifoCount = this.fifoBitsTaken = 0;
    this.spen = this.ddis = this.talk = this.talkd = this.previousTalkStatus = false;
    this.bufferEmpty = this.bufferLow = true;
    this.commandRegister = NO_COMMAND;
    this.dataLatched = false;
    this.rdbFlag = false;
    this.newFrameEnergyIdx = this.currentEnergy = this.previousEnergy = 0;
    this.newFramePitchIdx = this.currentPitch = 0;
    this.zpar = this.uvZpar = false;
    this.newFrameKIdx.fill(0);
    this.currentK.fill(0);
    this.inhibit = true;
    this.subcycle = this.cVariantRate = this.pitchCount = this.pc = 0;
    this.olde = this.oldp = true;
    this.ip = RELOAD[this.cVariantRate & 3]!;
    this.rng = 0x1fff;
    this.u.fill(0);
    this.x.fill(0);
    this.ioReady = true;
    this.readyCountdown = 0;
  }

  private talkStatus(): boolean {
    return this.spen || this.talkd;
  }

  private newFrameStop(): boolean {
    return this.newFrameEnergyIdx === 0x0f;
  }

  private newFrameSilence(): boolean {
    return this.newFrameEnergyIdx === 0;
  }

  private newFrameUnvoiced(): boolean {
    return this.newFramePitchIdx === 0;
  }

  /** MAME's semi-hack idle frame: the state a fresh SPEN starts from. */
  private loadIdleFrame(): void {
    this.newFrameEnergyIdx = 0;
    this.newFramePitchIdx = 0;
    for (let index = 0; index < 4; index++) this.newFrameKIdx[index] = 0;
    for (let index = 4; index < 7; index++) this.newFrameKIdx[index] = 0xf;
    for (let index = 7; index < plan.numK; index++) this.newFrameKIdx[index] = 0x7;
  }

  private updateFifoStatus(): void {
    if (this.fifoCount <= 8) this.bufferLow = true;
    else this.bufferLow = false;
    if (this.fifoCount === 0) {
      this.bufferEmpty = true;
      // /BE clears TALK through TCON, but only while speaking from the FIFO.
      if (this.ddis) this.talk = this.spen = false;
    } else {
      this.bufferEmpty = false;
    }
    if (this.previousTalkStatus && !this.talkStatus()) {
      this.ddis = false;
      this.previousTalkStatus = false;
      if (this.commandRegister !== NO_COMMAND) {
        this.processCommand(this.commandRegister);
        if (!this.dataLatched) this.ioReady = true;
      }
    }
    this.previousTalkStatus = this.talkStatus();
  }

  private readBits(count: number): number {
    let value = 0;
    if (this.ddis) {
      while (count-- > 0) {
        value = (value << 1) | ((this.fifo[this.fifoHead]! >> this.fifoBitsTaken) & 1);
        this.fifoBitsTaken++;
        if (this.fifoBitsTaken >= 8) {
          this.fifoCount--;
          this.fifo[this.fifoHead] = 0;
          this.fifoHead = (this.fifoHead + 1) % plan.fifoSize;
          this.fifoBitsTaken = 0;
          this.updateFifoStatus();
        }
      }
      return value;
    }
    // No VSM ROM attached: MAME floats the bus high, which eventually decodes
    // as a stop frame and halts speech rather than speaking noise.
    return (1 << count) - 1;
  }

  private parseFrame(): void {
    this.uvZpar = this.zpar = false;
    if (plan.hasRateControl && (this.cVariantRate & 0x04)) {
      this.ip = RELOAD[this.readBits(2)]!;
    } else {
      this.ip = RELOAD[this.cVariantRate & 3]!;
    }
    this.updateFifoStatus();
    if (this.ddis && this.bufferEmpty) return;

    this.newFrameEnergyIdx = this.readBits(plan.energyBits);
    this.updateFifoStatus();
    if (this.ddis && this.bufferEmpty) return;
    if (this.newFrameEnergyIdx === 0 || this.newFrameEnergyIdx === 15) return;

    const repeat = this.readBits(1);
    this.newFramePitchIdx = this.readBits(plan.pitchBits);
    this.uvZpar = this.newFrameUnvoiced();
    this.updateFifoStatus();
    if (this.ddis && this.bufferEmpty) return;
    if (repeat) return;

    for (let index = 0; index < 4; index++) {
      this.newFrameKIdx[index] = this.readBits(plan.kBits[index]!);
      this.updateFifoStatus();
      if (this.ddis && this.bufferEmpty) return;
    }
    // A zero pitch index is an unvoiced frame: only K1-K4 are transmitted.
    if (this.newFramePitchIdx === 0) return;
    for (let index = 4; index < plan.numK; index++) {
      this.newFrameKIdx[index] = this.readBits(plan.kBits[index]!);
      this.updateFifoStatus();
      if (this.ddis && this.bufferEmpty) return;
    }
  }

  private matrixMultiply(a: number, b: number): number {
    while (a > 511) a -= 1024;
    while (a < -512) a += 1024;
    while (b > 16383) b -= 32768;
    while (b < -16384) b += 32768;
    return (a * b) >> 9;
  }

  private latticeFilter(): number {
    const k = this.currentK;
    const u = this.u;
    const x = this.x;
    u[plan.numK] = this.matrixMultiply(this.previousEnergy, this.excitation << 6);
    for (let index = plan.numK - 1; index >= 0; index--) {
      u[index] = u[index + 1]! - this.matrixMultiply(k[index]!, x[index]!);
    }
    for (let index = plan.numK - 1; index >= 1; index--) {
      x[index] = x[index - 1]! + this.matrixMultiply(k[index - 1]!, u[index - 1]!);
    }
    x[0] = u[0]!;
    this.previousEnergy = this.currentEnergy;
    return u[0]!;
  }

  /** MAME clip_analog: 14 bits down to the 10-bit SPK pin, range extended. */
  private clipAnalog(sample: number): number {
    let clipped = sample;
    if (clipped > 2047) clipped = 2047;
    else if (clipped < -2048) clipped = -2048;
    clipped &= ~0xf;
    return (clipped << 4) | ((clipped & 0x7f0) >> 3) | ((clipped & 0x400) >> 10);
  }

  /** One native sample, MAME's process(), for a single buffer entry. */
  step(): number {
    if (!this.talkd) {
      this.advanceCounters(false);
      // The idle chip drives -1 on every sample, per the data sheet.
      return -1;
    }
    if (this.ip === 0 && this.pc === 12 && this.subcycle === 1) {
      this.ip = RELOAD[this.cVariantRate & 3]!;
      this.parseFrame();
      if (this.newFrameStop()) {
        this.talk = this.spen = false;
        this.updateFifoStatus();
      }
      // Interpolation is inhibited across a voicing or silence transition.
      this.inhibit = (!this.oldp && this.newFrameUnvoiced()) ||
        (this.oldp && !this.newFrameUnvoiced()) ||
        (this.olde && !this.newFrameSilence()) ||
        (this.oldp && this.newFrameSilence());
    } else {
      const inhibited = this.inhibit && this.ip !== 0 ? 1 : 0;
      if (this.subcycle === 2) {
        const shift = INTERP[this.ip]!;
        if (this.pc === 0) {
          if (this.ip === 0) this.pitchZero = false;
          const target = ENERGY[this.newFrameEnergyIdx]!;
          this.currentEnergy = (this.currentEnergy +
            (((target - this.currentEnergy) * (1 - inhibited)) >> shift)) *
            (this.zpar ? 0 : 1);
        } else if (this.pc === 1) {
          const target = PITCH[this.newFramePitchIdx]!;
          this.currentPitch = (this.currentPitch +
            (((target - this.currentPitch) * (1 - inhibited)) >> shift)) *
            (this.zpar ? 0 : 1);
        } else if (this.pc >= 2 && this.pc <= 11) {
          const index = this.pc - 2;
          const target = KTABLE[index]![this.newFrameKIdx[index]!]!;
          const zero = index < 4 ? this.zpar : this.uvZpar;
          this.currentK[index] = (this.currentK[index]! +
            (((target - this.currentK[index]!) * (1 - inhibited)) >> shift)) *
            (zero ? 0 : 1);
        }
      }
    }

    if (this.oldp) {
      // Unvoiced: plus or minus half the chirp table's peak, chosen by the LFSR.
      this.excitation = (this.rng & 1) ? ~0x3f : 0x40;
    } else {
      this.excitation = this.pitchCount >= 51 ? CHIRP[51]! : CHIRP[this.pitchCount]!;
    }
    // The LFSR advances once per T cycle, twenty times a sample.
    for (let tick = 0; tick < 20; tick++) {
      const bitout = ((this.rng >> 12) & 1) ^ ((this.rng >> 3) & 1) ^
        ((this.rng >> 2) & 1) ^ ((this.rng >> 0) & 1);
      this.rng = ((this.rng << 1) | bitout) & 0xffff;
    }
    let sample = this.latticeFilter();
    while (sample > 16383) sample -= 32768;
    while (sample < -16384) sample += 32768;
    const output = plan.forceDigital
      ? ((sample & ~0xf) << 1) | ((sample & 0x3e00) >> 9)
      : this.clipAnalog(sample);
    this.advanceCounters(true);
    return output;
  }

  private advanceCounters(speaking: boolean): void {
    this.subcycle++;
    if (this.subcycle === 2 && this.pc === 12) {
      if (speaking && this.ip === 7 && this.inhibit) this.pitchZero = true;
      if (this.ip === 7) {
        if (speaking) {
          this.olde = this.newFrameSilence();
          this.oldp = this.newFrameUnvoiced();
        }
        this.talkd = this.talk;
        this.updateFifoStatus();
        if (!this.talk && this.spen) this.talk = true;
      }
      this.subcycle = plan.subcycleReload;
      this.pc = 0;
      this.ip = (this.ip + 1) & 0x7;
    } else if (this.subcycle === 3) {
      this.subcycle = plan.subcycleReload;
      this.pc++;
    }
    if (speaking) {
      this.pitchCount++;
      if (this.pitchCount >= this.currentPitch || this.pitchZero) this.pitchCount = 0;
      this.pitchCount &= 0x1ff;
    }
  }

  private dataWrite(data: number): void {
    const wasBufferLow = this.bufferLow;
    if (this.ddis) {
      if (this.fifoCount < plan.fifoSize) {
        this.fifo[this.fifoTail] = data & 0xff;
        this.fifoTail = (this.fifoTail + 1) % plan.fifoSize;
        this.fifoCount++;
        this.updateFifoStatus();
        // SPEN rises on the falling edge of /BL, once the FIFO passes half full.
        if (!this.spen && wasBufferLow && !this.bufferLow) {
          this.zpar = true;
          this.uvZpar = true;
          this.olde = true;
          this.oldp = true;
          this.spen = true;
          if (plan.fastStart) this.talk = true;
          this.loadIdleFrame();
        }
      }
      this.dataLatched = false;
    } else {
      this.processCommand(data & 0xff);
    }
    if (!this.dataLatched) this.ioReady = true;
  }

  private processCommand(command: number): void {
    this.commandRegister = command;
    switch (command & 0x70) {
      case 0x00:
      case 0x20:
        if (plan.hasRateControl) this.cVariantRate = command & 0x0f;
        this.commandRegister = NO_COMMAND;
        break;
      case 0x50: // speak from VSM, which this engine has no ROM for
      case 0x60: // speak external
        if ((command & 0x70) === 0x60) {
          this.fifo.fill(0);
          this.fifoHead = this.fifoTail = this.fifoCount = this.fifoBitsTaken = 0;
          this.ddis = true;
          this.rdbFlag = false;
        } else {
          this.spen = true;
          if (plan.fastStart) this.talk = true;
          this.ddis = false;
        }
        this.zpar = true;
        this.uvZpar = true;
        this.olde = true;
        this.oldp = true;
        this.loadIdleFrame();
        this.commandRegister = NO_COMMAND;
        break;
      case 0x70:
        this.reset();
        this.commandRegister = NO_COMMAND;
        break;
      default:
        // Read byte, read and branch and load address all address the VSM.
        this.commandRegister = NO_COMMAND;
        break;
    }
    this.updateFifoStatus();
  }

  /** Data bus write; latched until /WS is strobed when the board drives it. */
  dataW(data: number): void {
    this.writeLatch = data & 0xff;
    this.dataLatched = true;
    if (!this.trueTiming) this.dataWrite(this.writeLatch);
  }

  /** /WS pin. A high-to-low edge schedules the /READY cycle. */
  wsqW(state: number): void {
    this.trueTiming = true;
    const next = (this.rsWs & 0x02) | (state & 1);
    if (next === this.rsWs) return;
    this.rsWs = next;
    if (next === 0) {
      if (plan.hasRateControl) this.reset();
      return;
    }
    if (next === 3) {
      this.readLatch = 0xff;
      return;
    }
    if (!(state & 1)) {
      this.ioReady = false;
      this.readyCountdown = plan.readyClocks;
    }
  }

  /** /RS pin. */
  rsqW(state: number): void {
    this.trueTiming = true;
    const next = ((state & 1) << 1) | (this.rsWs & 0x01);
    if (next === this.rsWs) return;
    this.rsWs = next;
    if (next === 0) {
      if (plan.hasRateControl) this.reset();
      return;
    }
    if (next === 3) {
      this.readLatch = 0xff;
      return;
    }
    if (!(state & 1)) {
      this.ioReady = false;
      this.readyCountdown = plan.readyClocks;
    }
  }

  private readyRead(): boolean {
    if (!this.trueTiming) {
      return (this.fifoCount < plan.fifoSize || !this.ddis) && this.ioReady;
    }
    return this.ioReady;
  }

  /** The /READY pin, active low, as the port bit reads it. */
  readyqR(): number {
    return this.readyRead() ? 0 : 1;
  }

  statusR(): number {
    return (this.talkStatus() ? 0x80 : 0) |
      (this.bufferLow ? 0x40 : 0) |
      (this.bufferEmpty ? 0x20 : 0);
  }

  /**
   * Advance the /READY countdown. Called with the device clocks that elapsed
   * while the CPU ran, which is what MAME's io_ready timer measures.
   */
  advanceClocks(clocks: number): void {
    if (this.readyCountdown <= 0) return;
    this.readyCountdown -= clocks;
    if (this.readyCountdown > 0) return;
    this.readyCountdown = 0;
    if (this.rsWs === 0x02) {
      // A full FIFO cannot take the byte yet; retry a cycle later, as MAME does.
      if (this.fifoCount >= plan.fifoSize && this.ddis) {
        this.readyCountdown = plan.readyClocks;
        return;
      }
      if (this.commandRegister === NO_COMMAND) {
        this.dataLatched = false;
        this.dataWrite(this.writeLatch);
      }
    } else {
      this.ioReady = true;
    }
  }

  /**
   * Generate the samples covering the given seconds of emulated time, advancing the
   * /READY countdown in step so a write lands at the right point in the frame.
   */
  render(seconds: number, into: (sample: number) => void): void {
    this.clockCarry += seconds * this.sampleRate;
    let count = Math.floor(this.clockCarry);
    this.clockCarry -= count;
    if (count > 4096) count = 4096;
    for (let index = 0; index < count; index++) {
      this.advanceClocks(plan.clockDivider);
      into(this.step() / 32768);
    }
  }
}
`;
}
