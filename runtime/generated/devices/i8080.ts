// GENERATED from MAME CPU source and opcode DSL; do not edit.
// Sources:
// - src/devices/cpu/i8085/i8085.cpp
// - src/devices/cpu/i8085/i8085.h
import type {
  Cpu,
  CpuBus,
  GeneratedCpuExecutable,
} from '../../core/generated-cpu.js';

function popcount32(value: number): number {
  value -= (value >>> 1) & 0x55555555;
  value = (value & 0x33333333) + ((value >>> 2) & 0x33333333);
  return (((value + (value >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
}

/**
 * The byte halves of a Pair16, as a class rather than a per-instance object.
 *
 * These accessors are the hottest path in the whole emulator: the Z80's TDAT
 * aliases resolve to m_shared_data.b.l, and on Bubble Bobble the four of them
 * were 23% of total run time. Building the byte view with
 * Object.defineProperties and a closure per instance gave every pair its own
 * hidden class and its own accessor functions, so each site went megamorphic
 * and V8 could not inline through it. One class means one hidden class and one
 * pair of prototype accessors for every register on every core.
 */
class Pair16Bytes {
  private readonly pair: Pair16;

  constructor(pair: Pair16) { this.pair = pair; }

  get h(): number { return (this.pair.value >>> 8) & 0xff; }
  set h(next: number) {
    this.pair.value = ((this.pair.value & 0x00ff) | ((next & 0xff) << 8)) & 0xffff;
  }

  get l(): number { return this.pair.value & 0xff; }
  set l(next: number) {
    this.pair.value = ((this.pair.value & 0xff00) | (next & 0xff)) & 0xffff;
  }
}

class Pair16 {
  /** Read by Pair16Bytes; not part of the emitted core's own vocabulary. */
  value = 0;
  readonly b: Pair16Bytes;

  constructor(value = 0) {
    this.value = value & 0xffff;
    this.b = new Pair16Bytes(this);
  }

  get w(): number { return this.value; }
  set w(value: number) { this.value = value & 0xffff; }
}

class WordByteRegisterFile {
  readonly w: Uint16Array;
  readonly b: Uint8Array;

  constructor(words: number) {
    const buffer = new ArrayBuffer(words * 2);
    this.w = new Uint16Array(buffer);
    this.b = new Uint8Array(buffer);
  }
}

class Z8000RegisterFile {
  readonly W = new Uint16Array(16);
  readonly B: Record<number, number>;
  readonly L: Record<number, number>;
  readonly Q: Record<number, number>;

  constructor() {
    this.B = new Proxy({}, {
      get: (_target, key) => {
        const index = Number(key); const word = this.W[index >>> 1] ?? 0;
        return index & 1 ? word & 0xff : (word >>> 8) & 0xff;
      },
      set: (_target, key, value) => {
        const index = Number(key); const wordIndex = index >>> 1;
        const old = this.W[wordIndex] ?? 0;
        this.W[wordIndex] = index & 1
          ? (old & 0xff00) | (Number(value) & 0xff)
          : (old & 0x00ff) | ((Number(value) & 0xff) << 8);
        return true;
      },
    }) as Record<number, number>;
    this.L = new Proxy({}, {
      get: (_target, key) => {
        const index = Number(key) * 2;
        return ((((this.W[index] ?? 0) << 16) | (this.W[index + 1] ?? 0)) >>> 0);
      },
      set: (_target, key, value) => {
        const index = Number(key) * 2; const data = Number(value) >>> 0;
        this.W[index] = data >>> 16; this.W[index + 1] = data; return true;
      },
    }) as Record<number, number>;
    this.Q = new Proxy({}, {
      get: (_target, key) => {
        const index = Number(key) * 4;
        return (this.W[index] ?? 0) * 0x1000000000000 +
          (this.W[index + 1] ?? 0) * 0x100000000 +
          (this.W[index + 2] ?? 0) * 0x10000 + (this.W[index + 3] ?? 0);
      },
      set: (_target, key, value) => {
        const index = Number(key) * 4; let data = Number(value);
        this.W[index + 3] = data; data = Math.floor(data / 0x10000);
        this.W[index + 2] = data; data = Math.floor(data / 0x10000);
        this.W[index + 1] = data; data = Math.floor(data / 0x10000);
        this.W[index] = data; return true;
      },
    }) as Record<number, number>;
  }
}

/** Every method this core lowered from its MAME source. */
const GENERATED_METHOD_NAMES = new Set<string>(["init_tables","execute_set_input","break_halt_for_interrupt","check_for_interrupts","set_sod","set_inte","set_status","get_rim_value","read_arg","read_arg16","read_op","read_inta","read_mem","write_mem","op_push","op_pop","op_ora","op_xra","op_ana","op_inr","op_dcr","op_add","op_adc","op_sub","op_sbb","op_cmp","op_dad","op_jmp","op_call","op_ret","op_rst","execute_one","ret_taken","jmp_taken","call_taken","is_8085"]);

class GeneratedI8080 implements Cpu {
  private readonly bus: CpuBus;
  private irqData: number | (() => number) = 0xff;
  private irqHold = false;
  private readonly internalRam = new Uint8Array(0x10000);
  private readonly portData = new Uint8Array(0);
  private readonly portDirection = new Uint8Array(0);
  private portHandshakeControl = 0;
  private portHandshakeInputState = 0;
  private portHandshakeLatched = false;
  private portHandshakePendingClear = false;
  private m_PC = new Pair16(0);
  private m_SP = new Pair16(0);
  private m_AF = new Pair16(0);
  private m_BC = new Pair16(0);
  private m_DE = new Pair16(0);
  private m_HL = new Pair16(0);
  private m_WZ = new Pair16(0);
  private m_halt = ((0) & 0xff);
  private m_im = ((0) & 0xff);
  private m_status = ((0) & 0xff);
  private m_after_ei = ((0) & 0xff);
  private m_nmi_state = ((0) & 0xff);
  private m_trap_im_copy = ((0) & 0xff);
  private m_sod_state = ((0) & 0xff);
  private m_ietemp = ((0) & 0xff);
  private m_trap_pending = ((0) ? 1 : 0);
  private m_in_acknowledge = ((0) ? 1 : 0);
  private m_icount = 0;
  private m_irq_state = Uint8Array.from([0, 0, 0, 0]);
  private lut_cycles_8080 = Uint8Array.from([4, 10, 7, 5, 5, 5, 7, 4, 4, 10, 7, 5, 5, 5, 7, 4, 4, 10, 7, 5, 5, 5, 7, 4, 4, 10, 7, 5, 5, 5, 7, 4, 4, 10, 16, 5, 5, 5, 7, 4, 4, 10, 16, 5, 5, 5, 7, 4, 4, 10, 13, 5, 10, 10, 10, 4, 4, 10, 13, 5, 5, 5, 7, 4, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 5, 5, 5, 5, 7, 5, 7, 7, 7, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5, 5, 7, 5, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 5, 10, 10, 10, 11, 11, 7, 11, 5, 10, 10, 10, 11, 11, 7, 11, 5, 10, 10, 10, 11, 11, 7, 11, 5, 10, 10, 10, 11, 11, 7, 11, 5, 10, 10, 18, 11, 11, 7, 11, 5, 5, 10, 4, 11, 11, 7, 11, 5, 10, 10, 4, 11, 11, 7, 11, 5, 5, 10, 4, 11, 11, 7, 11]);
  private lut_cycles_8085 = Uint8Array.from([4, 10, 7, 6, 4, 4, 7, 4, 10, 10, 7, 6, 4, 4, 7, 4, 7, 10, 7, 6, 4, 4, 7, 4, 10, 10, 7, 6, 4, 4, 7, 4, 4, 10, 16, 6, 4, 4, 7, 4, 10, 10, 16, 6, 4, 4, 7, 4, 4, 10, 13, 6, 10, 10, 10, 4, 10, 10, 13, 6, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 7, 7, 7, 7, 7, 7, 5, 7, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 7, 4, 6, 10, 7, 7, 9, 12, 7, 12, 6, 10, 7, 6, 9, 9, 7, 12, 6, 10, 7, 10, 9, 12, 7, 12, 6, 10, 7, 10, 9, 7, 7, 12, 6, 10, 7, 16, 9, 12, 7, 12, 6, 6, 7, 4, 9, 10, 7, 12, 6, 10, 7, 4, 9, 12, 7, 12, 6, 6, 7, 4, 9, 7, 7, 12]);
  private lut_cycles = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  private lut_zs = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  private lut_zsp = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  private get PC(): number { return this.m_PC.w; }
  private set PC(value: number) { this.m_PC.w = ((value) & 0xffff); }
  private get GENPC(): number { return this.m_PC.w; }
  private set GENPC(value: number) { this.m_PC.w = ((value) & 0xffff); }
  private get CURPC(): number { return this.m_PC.w; }
  private set CURPC(value: number) { this.m_PC.w = ((value) & 0xffff); }
  private get SP(): number { return this.m_SP.w; }
  private set SP(value: number) { this.m_SP.w = ((value) & 0xffff); }
  private get GENFLAGS(): number { return this.m_AF.b.l; }
  private set GENFLAGS(value: number) { this.m_AF.b.l = ((value) & 0xff); }
  private get A(): number { return this.m_AF.b.h; }
  private set A(value: number) { this.m_AF.b.h = ((value) & 0xff); }
  private get B(): number { return this.m_BC.b.h; }
  private set B(value: number) { this.m_BC.b.h = ((value) & 0xff); }
  private get C(): number { return this.m_BC.b.l; }
  private set C(value: number) { this.m_BC.b.l = ((value) & 0xff); }
  private get D(): number { return this.m_DE.b.h; }
  private set D(value: number) { this.m_DE.b.h = ((value) & 0xff); }
  private get E(): number { return this.m_DE.b.l; }
  private set E(value: number) { this.m_DE.b.l = ((value) & 0xff); }
  private get F(): number { return this.m_AF.b.l; }
  private set F(value: number) { this.m_AF.b.l = ((value) & 0xff); }
  private get H(): number { return this.m_HL.b.h; }
  private set H(value: number) { this.m_HL.b.h = ((value) & 0xff); }
  private get L(): number { return this.m_HL.b.l; }
  private set L(value: number) { this.m_HL.b.l = ((value) & 0xff); }
  private get AF(): number { return this.m_AF.w; }
  private set AF(value: number) { this.m_AF.w = ((value) & 0xffff); }
  private get BC(): number { return this.m_BC.w; }
  private set BC(value: number) { this.m_BC.w = ((value) & 0xffff); }
  private get DE(): number { return this.m_DE.w; }
  private set DE(value: number) { this.m_DE.w = ((value) & 0xffff); }
  private get HL(): number { return this.m_HL.w; }
  private set HL(value: number) { this.m_HL.w = ((value) & 0xffff); }
  private get IM(): number { return this.m_im; }
  private set IM(value: number) { this.m_im = ((value) & 0xff); }
  private get SOD(): number { return this.m_sod_state; }
  private set SOD(value: number) { this.m_sod_state = ((value) & 0xff); }
  private get SID(): number { return this.m_ietemp; }
  private set SID(value: number) { this.m_ietemp = ((value) & 0xff); }
  private get STATUS(): number { return this.m_status; }
  private set STATUS(value: number) { this.m_status = ((value) & 0xff); }
  private get INTE(): number { return this.m_ietemp; }
  private set INTE(value: number) { this.m_ietemp = ((value) & 0xff); }

  constructor(bus: CpuBus) {
    this.bus = bus;
    this.generatedStart();
    this.reset();
  }

  reset(): void {
    this.resetInternal();
    this.m_PC.w = ((0) & 0xffff);
    this.m_halt = ((0) & 0xff);
    this.m_im = ((((this.m_im) & ((~64)))) & 0xff);
    this.m_im = ((((this.m_im) | (((((1) | (2))) | (4))))) & 0xff);
    this.m_after_ei = ((0) & 0xff);
    this.m_trap_pending = ((0) ? 1 : 0);
    this.m_trap_im_copy = ((0) & 0xff);
    this.method_set_inte(0);
    this.method_set_sod(0);
  }

  step(): number {
    this.m_icount = 0;
    if ((((this.m_trap_pending) || (((Number(this.m_after_ei) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
      this.method_check_for_interrupts();
    }
    if ((((((Number(this.m_after_ei) !== Number(0)) ? 1 : 0)) && (((Number((this.m_after_ei = ((((this.m_after_ei) - (1))) & 0xff))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
      this.method_check_for_interrupts();
    }
    this.m_in_acknowledge = ((0) ? 1 : 0);
    0;
    this.method_execute_one(this.method_read_op());
    return (-this.m_icount);
  }

  /**
   * Cycles hardware has taken from this processor, charged against the slice it
   * is inside.
   *
   * MAME device_execute_interface::adjust_icount reduces the remaining
   * instruction budget; the time still elapses. It is NOT a request to park --
   * System 1 charges one cycle per slow access and Zaxxon five per sprite entry
   * copied, and stopping the slice on either starves the processor. The Atari
   * 2600's WSYNC uses the same call with a whole line's remainder, which parks
   * the 6507 only because the charge happens to consume what is left.
   *
   * Charging the slice the processor is inside, rather than the one after it,
   * is what matters: deferred, the 2600 lost cycles off every scanline and ran
   * 244 lines to the frame instead of 262.
   */
  stallCycles = 0;

  run(target: number): number {
    let executed = 0;
    let stalled = 0;
    let total = 0;
    this.stallCycles = 0;
    while (total < target) {
      this.bus.timing?.(total, target);
      executed += this.step();
      if (this.stallCycles !== 0) {
        stalled += this.stallCycles;
        this.stallCycles = 0;
      }
      total = executed + stalled;
    }
    this.bus.timing?.(target, target);
    return total;
  }


  setIrqLine(active: boolean, dataBus: number | (() => number) = 0xff, hold = false): void {
    if (active) this.irqData = dataBus;
    this.irqHold = active && hold;
    this.generatedInput(0, active ? 1 : 0);
  }

  setInputLine(inputnum: number, state: number): void {
    this.updateInternalInput(inputnum, state);
    this.generatedInput(inputnum, state);
  }

  nmi(): void {
    this.generatedInput(-1, 1);
    this.generatedInput(-1, 0);
  }

  private acknowledgeIrq(level = 0): number {
    const source = this.irqData;
    const data = this.bus.acknowledge?.(level) ??
      (typeof source === 'function' ? source() : source);
    if (this.irqHold) {
      this.irqHold = false;
      this.setIrqLine(false);
    }
    return data;
  }

  private readMemory(address: number): number {
    const location = address & 65535;
    if (false) return this.internalRam[location];
    return this.bus.read(location) & 0xff;
  }

  private writeMemory(address: number, value: number): void {
    const location = address & 65535;
    const data = value & 0xff;
    if (false) {
      this.internalRam[location] = data;
      return;
    }
    this.bus.write(location, data);
  }

  private readOpcode(address: number): number {
    const location = address & 65535;
    const value = this.readMemory(location);
    return value;
  }

  private emitPort(index: number, signal: string, outputMask: number): void {
    const direction = this.portDirection[index];
    const data = (this.portData[index] & direction) | (direction ^ 0xff);
    this.bus.signal?.(signal, data & outputMask);
  }

  private resetInternal(): void {
    this.portDirection.fill(0);
    this.portHandshakeControl = 0;
    this.portHandshakeInputState = 0;
    this.portHandshakeLatched = false;
    this.portHandshakePendingClear = false;
  }

  private updateInternalInput(inputnum: number, state: number): void {
    void inputnum;
    void state;
  }

  get(name: string): number {
    switch (name) {
      case "PC": return this.PC;
      case "GENPC": return this.GENPC;
      case "CURPC": return this.CURPC;
      case "SP": return this.SP;
      case "GENFLAGS": return this.GENFLAGS;
      case "A": return this.A;
      case "B": return this.B;
      case "C": return this.C;
      case "D": return this.D;
      case "E": return this.E;
      case "F": return this.F;
      case "H": return this.H;
      case "L": return this.L;
      case "AF": return this.AF;
      case "BC": return this.BC;
      case "DE": return this.DE;
      case "HL": return this.HL;
      case "IM": return this.IM;
      case "SOD": return this.SOD;
      case "SID": return this.SID;
      case "STATUS": return this.STATUS;
      case "INTE": return this.INTE;
      case "m_PC":
      case "m_PC.w": return this.m_PC.w;
      case "m_PC.b.h": return this.m_PC.b.h;
      case "m_PC.b.l": return this.m_PC.b.l;
      case "m_SP":
      case "m_SP.w": return this.m_SP.w;
      case "m_SP.b.h": return this.m_SP.b.h;
      case "m_SP.b.l": return this.m_SP.b.l;
      case "m_AF":
      case "m_AF.w": return this.m_AF.w;
      case "m_AF.b.h": return this.m_AF.b.h;
      case "m_AF.b.l": return this.m_AF.b.l;
      case "m_BC":
      case "m_BC.w": return this.m_BC.w;
      case "m_BC.b.h": return this.m_BC.b.h;
      case "m_BC.b.l": return this.m_BC.b.l;
      case "m_DE":
      case "m_DE.w": return this.m_DE.w;
      case "m_DE.b.h": return this.m_DE.b.h;
      case "m_DE.b.l": return this.m_DE.b.l;
      case "m_HL":
      case "m_HL.w": return this.m_HL.w;
      case "m_HL.b.h": return this.m_HL.b.h;
      case "m_HL.b.l": return this.m_HL.b.l;
      case "m_WZ":
      case "m_WZ.w": return this.m_WZ.w;
      case "m_WZ.b.h": return this.m_WZ.b.h;
      case "m_WZ.b.l": return this.m_WZ.b.l;
      case "m_halt": return this.m_halt;
      case "m_im": return this.m_im;
      case "m_status": return this.m_status;
      case "m_after_ei": return this.m_after_ei;
      case "m_nmi_state": return this.m_nmi_state;
      case "m_trap_im_copy": return this.m_trap_im_copy;
      case "m_sod_state": return this.m_sod_state;
      case "m_ietemp": return this.m_ietemp;
      case "m_trap_pending": return this.m_trap_pending;
      case "m_in_acknowledge": return this.m_in_acknowledge;
      case "m_icount": return this.m_icount;
      default: return 0;
    }
  }

  /** MAME device_state_interface::state_int, by the CPU's own state index. */
  stateInt(index: number): number {
    switch (index) {
      case 128: return this.SID; // IM_SID
      case 0: return this.PC; // I8085_PC
      case 1: return this.SP; // I8085_SP
      case 2: return this.AF; // I8085_AF
      case 3: return this.BC; // I8085_BC
      case 4: return this.DE; // I8085_DE
      case 5: return this.HL; // I8085_HL
      case 6: return this.A; // I8085_A
      case 7: return this.B; // I8085_B
      case 8: return this.C; // I8085_C
      case 9: return this.D; // I8085_D
      case 10: return this.E; // I8085_E
      case 11: return this.F; // I8085_F
      case 12: return this.H; // I8085_H
      case 13: return this.L; // I8085_L
      case 14: return this.STATUS; // I8085_STATUS
      case 15: return this.SOD; // I8085_SOD
      case 16: return this.SID; // I8085_SID
      case 17: return this.INTE; // I8085_INTE
      case 19: return this.IM; // I8085_IM
      default: return 0;
    }
  }

  set(name: string, value: number): void {
    switch (name) {
      case "PC": this.PC = ((value) & 0xffff); return;
      case "GENPC": this.GENPC = ((value) & 0xffff); return;
      case "CURPC": this.CURPC = ((value) & 0xffff); return;
      case "SP": this.SP = ((value) & 0xffff); return;
      case "GENFLAGS": this.GENFLAGS = ((value) & 0xff); return;
      case "A": this.A = ((value) & 0xff); return;
      case "B": this.B = ((value) & 0xff); return;
      case "C": this.C = ((value) & 0xff); return;
      case "D": this.D = ((value) & 0xff); return;
      case "E": this.E = ((value) & 0xff); return;
      case "F": this.F = ((value) & 0xff); return;
      case "H": this.H = ((value) & 0xff); return;
      case "L": this.L = ((value) & 0xff); return;
      case "AF": this.AF = ((value) & 0xffff); return;
      case "BC": this.BC = ((value) & 0xffff); return;
      case "DE": this.DE = ((value) & 0xffff); return;
      case "HL": this.HL = ((value) & 0xffff); return;
      case "IM": this.IM = ((value) & 0xff); return;
      case "SOD": this.SOD = ((value) & 0xff); return;
      case "SID": this.SID = ((value) & 0xff); return;
      case "STATUS": this.STATUS = ((value) & 0xff); return;
      case "INTE": this.INTE = ((value) & 0xff); return;
      case "m_PC":
      case "m_PC.w": this.m_PC.w = value; return;
      case "m_PC.b.h": this.m_PC.b.h = value; return;
      case "m_PC.b.l": this.m_PC.b.l = value; return;
      case "m_SP":
      case "m_SP.w": this.m_SP.w = value; return;
      case "m_SP.b.h": this.m_SP.b.h = value; return;
      case "m_SP.b.l": this.m_SP.b.l = value; return;
      case "m_AF":
      case "m_AF.w": this.m_AF.w = value; return;
      case "m_AF.b.h": this.m_AF.b.h = value; return;
      case "m_AF.b.l": this.m_AF.b.l = value; return;
      case "m_BC":
      case "m_BC.w": this.m_BC.w = value; return;
      case "m_BC.b.h": this.m_BC.b.h = value; return;
      case "m_BC.b.l": this.m_BC.b.l = value; return;
      case "m_DE":
      case "m_DE.w": this.m_DE.w = value; return;
      case "m_DE.b.h": this.m_DE.b.h = value; return;
      case "m_DE.b.l": this.m_DE.b.l = value; return;
      case "m_HL":
      case "m_HL.w": this.m_HL.w = value; return;
      case "m_HL.b.h": this.m_HL.b.h = value; return;
      case "m_HL.b.l": this.m_HL.b.l = value; return;
      case "m_WZ":
      case "m_WZ.w": this.m_WZ.w = value; return;
      case "m_WZ.b.h": this.m_WZ.b.h = value; return;
      case "m_WZ.b.l": this.m_WZ.b.l = value; return;
      case "m_halt": this.m_halt = ((value) & 0xff); return;
      case "m_im": this.m_im = ((value) & 0xff); return;
      case "m_status": this.m_status = ((value) & 0xff); return;
      case "m_after_ei": this.m_after_ei = ((value) & 0xff); return;
      case "m_nmi_state": this.m_nmi_state = ((value) & 0xff); return;
      case "m_trap_im_copy": this.m_trap_im_copy = ((value) & 0xff); return;
      case "m_sod_state": this.m_sod_state = ((value) & 0xff); return;
      case "m_ietemp": this.m_ietemp = ((value) & 0xff); return;
      case "m_trap_pending": this.m_trap_pending = ((value) ? 1 : 0); return;
      case "m_in_acknowledge": this.m_in_acknowledge = ((value) ? 1 : 0); return;
      case "m_icount": this.m_icount = value; return;
      default: return;
    }
  }

  hasMethod(name: string): boolean {
    return GENERATED_METHOD_NAMES.has(name);
  }

  methodNames(): string[] {
    return [...GENERATED_METHOD_NAMES];
  }

  invoke(name: string, ...args: number[]): number {
    switch (name) {
      case "init_tables": return this.method_init_tables();
      case "execute_set_input": return this.method_execute_set_input(args[0] ?? 0, args[1] ?? 0);
      case "break_halt_for_interrupt": return this.method_break_halt_for_interrupt();
      case "check_for_interrupts": return this.method_check_for_interrupts();
      case "set_sod": return this.method_set_sod(args[0] ?? 0);
      case "set_inte": return this.method_set_inte(args[0] ?? 0);
      case "set_status": return this.method_set_status(args[0] ?? 0);
      case "get_rim_value": return this.method_get_rim_value();
      case "read_arg": return this.method_read_arg();
      case "read_arg16": return this.method_read_arg16();
      case "read_op": return this.method_read_op();
      case "read_inta": return this.method_read_inta();
      case "read_mem": return this.method_read_mem(args[0] ?? 0);
      case "write_mem": return this.method_write_mem(args[0] ?? 0, args[1] ?? 0);
      case "op_push": return this.method_op_push(args[0] ?? 0);
      case "op_pop": return this.method_op_pop();
      case "op_ora": return this.method_op_ora(args[0] ?? 0);
      case "op_xra": return this.method_op_xra(args[0] ?? 0);
      case "op_ana": return this.method_op_ana(args[0] ?? 0);
      case "op_inr": return this.method_op_inr(args[0] ?? 0);
      case "op_dcr": return this.method_op_dcr(args[0] ?? 0);
      case "op_add": return this.method_op_add(args[0] ?? 0);
      case "op_adc": return this.method_op_adc(args[0] ?? 0);
      case "op_sub": return this.method_op_sub(args[0] ?? 0);
      case "op_sbb": return this.method_op_sbb(args[0] ?? 0);
      case "op_cmp": return this.method_op_cmp(args[0] ?? 0);
      case "op_dad": return this.method_op_dad(args[0] ?? 0);
      case "op_jmp": return this.method_op_jmp(args[0] ?? 0);
      case "op_call": return this.method_op_call(args[0] ?? 0);
      case "op_ret": return this.method_op_ret(args[0] ?? 0);
      case "op_rst": return this.method_op_rst(args[0] ?? 0);
      case "execute_one": return this.method_execute_one(args[0] ?? 0);
      case "ret_taken": return this.method_ret_taken();
      case "jmp_taken": return this.method_jmp_taken();
      case "call_taken": return this.method_call_taken();
      case "is_8085": return this.method_is_8085();
      default: throw new Error('I8080 has no generated method "' + name + '"');
    }
  }

  private generatedStart(): void {
    this.m_PC.w = ((0) & 0xffff);
    this.m_SP.w = ((0) & 0xffff);
    this.m_AF.w = ((0) & 0xffff);
    this.m_BC.w = ((0) & 0xffff);
    this.m_DE.w = ((0) & 0xffff);
    this.m_HL.w = ((0) & 0xffff);
    this.m_WZ.w = ((0) & 0xffff);
    this.m_halt = ((0) & 0xff);
    this.m_im = ((0) & 0xff);
    this.m_status = ((0) & 0xff);
    this.m_after_ei = ((0) & 0xff);
    this.m_nmi_state = ((0) & 0xff);
    this.m_irq_state[3] = (((this.m_irq_state[2] = (((this.m_irq_state[1] = (((this.m_irq_state[0] = ((0) & 0xff))) & 0xff))) & 0xff))) & 0xff);
    this.m_trap_pending = ((0) ? 1 : 0);
    this.m_trap_im_copy = ((0) & 0xff);
    this.m_sod_state = ((1) & 0xff);
    this.m_in_acknowledge = ((0) ? 1 : 0);
    this.m_ietemp = ((0) & 0xff);
    this.method_init_tables();
  }

  private generatedInput(inputnum: number, state: number): void {
    let newstate = ((((Number(state) !== Number(0)) ? 1 : 0)) | 0);
    if (((Number(inputnum) === Number(-1)) ? 1 : 0)) {
      if ((((((this.m_nmi_state) ? 0 : 1)) && (newstate)) ? 1 : 0)) {
        this.m_trap_pending = ((1) ? 1 : 0);
      } else {
        if (((newstate) ? 0 : 1)) {
          this.m_trap_pending = ((0) ? 1 : 0);
        }
      }
      this.m_nmi_state = ((newstate) & 0xff);
    } else {
      if (((Number(inputnum) === Number(3)) ? 1 : 0)) {
        if ((((((this.m_irq_state[3]) ? 0 : 1)) && (newstate)) ? 1 : 0)) {
          this.m_im = ((((this.m_im) | (64))) & 0xff);
        }
        this.m_irq_state[3] = ((newstate) & 0xff);
      } else {
        if (((Number(inputnum) < Number((this.m_irq_state).length)) ? 1 : 0)) {
          this.m_irq_state[inputnum] = ((state) & 0xff);
        }
      }
    }
  }

  private generatedService(): void {

  }

  private generatedFetch(): void {

  }

  private method_init_tables(): number {
    for (let i = 0; ((Number(i) < Number(256)) ? 1 : 0); i = ((i) + (1))) {
      this.lut_cycles[i] = ((((this.method_is_8085()) ? (this.lut_cycles_8085[i]) : (this.lut_cycles_8080[i]))) & 0xff);
      let zs = ((0) & 0xff);
      if (((Number(i) === Number(0)) ? 1 : 0)) {
        zs = ((((zs) | (64))) & 0xff);
      }
      if (((i) & (128))) {
        zs = ((((zs) | (128))) & 0xff);
      }
      let p = ((((((popcount32((i) >>> 0)) & (1))) ? (0) : (4))) & 0xff);
      this.lut_zs[i] = ((zs) & 0xff);
      this.lut_zsp[i] = ((((zs) | (p))) & 0xff);
    }
    return 0;
  }

  private method_execute_set_input(irqline: number = 0, state: number = 0): number {
    let newstate = ((((Number(state) !== Number(0)) ? 1 : 0)) | 0);
    if (((Number(irqline) === Number(-1)) ? 1 : 0)) {
      if ((((((this.m_nmi_state) ? 0 : 1)) && (newstate)) ? 1 : 0)) {
        this.m_trap_pending = ((1) ? 1 : 0);
      } else {
        if (((newstate) ? 0 : 1)) {
          this.m_trap_pending = ((0) ? 1 : 0);
        }
      }
      this.m_nmi_state = ((newstate) & 0xff);
    } else {
      if (((Number(irqline) === Number(3)) ? 1 : 0)) {
        if ((((((this.m_irq_state[3]) ? 0 : 1)) && (newstate)) ? 1 : 0)) {
          this.m_im = ((((this.m_im) | (64))) & 0xff);
        }
        this.m_irq_state[3] = ((newstate) & 0xff);
      } else {
        if (((Number(irqline) < Number((this.m_irq_state).length)) ? 1 : 0)) {
          this.m_irq_state[irqline] = ((state) & 0xff);
        }
      }
    }
    return 0;
  }

  private method_break_halt_for_interrupt(): number {
    if (this.m_halt) {
      this.m_PC.w = (((this.m_PC.w) + (1)) & 0xffff);
      this.m_halt = ((0) & 0xff);
      this.method_set_status(38);
    } else {
      this.method_set_status(35);
    }
    this.m_in_acknowledge = ((1) ? 1 : 0);
    return 0;
  }

  private method_check_for_interrupts(): number {
    if (this.m_trap_pending) {
      this.m_trap_im_copy = ((((this.m_im) | (128))) & 0xff);
      this.m_trap_pending = ((0) ? 1 : 0);
      this.method_break_halt_for_interrupt();
      this.acknowledgeIrq(-1);
      this.method_op_push(this.m_PC.w);
      this.method_set_inte(0);
      this.m_PC.w = ((36) & 0xffff);
      this.m_icount = ((this.m_icount) - (11));
    } else {
      if (((((((((this.m_im) & (64))) && (((((this.m_im) & (4))) ? 0 : 1))) ? 1 : 0)) && (((this.m_im) & (8)))) ? 1 : 0)) {
        this.m_im = ((((this.m_im) & ((~64)))) & 0xff);
        this.method_break_halt_for_interrupt();
        this.acknowledgeIrq(3);
        this.method_op_push(this.m_PC.w);
        this.method_set_inte(0);
        this.m_PC.w = ((60) & 0xffff);
        this.m_icount = ((this.m_icount) - (11));
      } else {
        if (((((((this.m_irq_state[2]) && (((((this.m_im) & (2))) ? 0 : 1))) ? 1 : 0)) && (((this.m_im) & (8)))) ? 1 : 0)) {
          this.method_break_halt_for_interrupt();
          this.acknowledgeIrq(2);
          this.method_op_push(this.m_PC.w);
          this.method_set_inte(0);
          this.m_PC.w = ((52) & 0xffff);
          this.m_icount = ((this.m_icount) - (11));
        } else {
          if (((((((this.m_irq_state[1]) && (((((this.m_im) & (1))) ? 0 : 1))) ? 1 : 0)) && (((this.m_im) & (8)))) ? 1 : 0)) {
            this.method_break_halt_for_interrupt();
            this.acknowledgeIrq(1);
            this.method_op_push(this.m_PC.w);
            this.method_set_inte(0);
            this.m_PC.w = ((44) & 0xffff);
            this.m_icount = ((this.m_icount) - (11));
          } else {
            if ((((this.m_irq_state[0]) && (((this.m_im) & (8)))) ? 1 : 0)) {
              if (((1) ? 0 : 1)) {
                this.acknowledgeIrq(0);
              }
              this.method_break_halt_for_interrupt();
              let vector = ((this.method_read_inta()) & 0xff);
              this.method_set_inte(0);
              0;
              this.method_execute_one(vector);
            }
          }
        }
      }
    }
    return 0;
  }

  private method_set_sod(state: number = 0): number {
    if ((((((Number(state) !== Number(0)) ? 1 : 0)) && (((Number(this.m_sod_state) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
      this.m_sod_state = ((1) & 0xff);
      (this.bus.signal?.("out_sod_func", this.m_sod_state) ?? 0);
    } else {
      if ((((((Number(state) === Number(0)) ? 1 : 0)) && (((Number(this.m_sod_state) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
        this.m_sod_state = ((0) & 0xff);
        (this.bus.signal?.("out_sod_func", this.m_sod_state) ?? 0);
      }
    }
    return 0;
  }

  private method_set_inte(state: number = 0): number {
    if ((((((Number(state) !== Number(0)) ? 1 : 0)) && (((Number(((this.m_im) & (8))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
      this.m_im = ((((this.m_im) | (8))) & 0xff);
      (this.bus.signal?.("out_inte_func", 1) ?? 0);
    } else {
      if ((((((Number(state) === Number(0)) ? 1 : 0)) && (((Number(((this.m_im) & (8))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
        this.m_im = ((((this.m_im) & ((~8)))) & 0xff);
        (this.bus.signal?.("out_inte_func", 0) ?? 0);
      }
    }
    return 0;
  }

  private method_set_status(status: number = 0): number {
    if ((((((1) ? 0 : 1)) && (((Number(status) !== Number(this.m_status)) ? 1 : 0))) ? 1 : 0)) {
      (this.bus.signal?.("out_status_func", status) ?? 0);
    }
    this.m_status = ((status) & 0xff);
    return 0;
  }

  private method_get_rim_value(): number {
    let result = ((this.m_im) & 0xff);
    let sid = ((0) | 0);
    result = ((((result) & ((~((32) | (16)))))) & 0xff);
    if (this.m_irq_state[2]) {
      result = ((((result) | (32))) & 0xff);
    }
    if (this.m_irq_state[1]) {
      result = ((((result) | (16))) & 0xff);
    }
    result = ((((((result) & ((~128)))) | (((sid) ? (128) : (0))))) & 0xff);
    return result;
    return 0;
  }

  private method_read_arg(): number {
    this.method_set_status(130);
    if (this.m_in_acknowledge) {
      return this.method_read_inta();
    } else {
      return (this.readMemory(((() => { const previous = this.m_PC.w; this.m_PC.w = (((this.m_PC.w) + (1)) & 0xffff); return previous; })()) & 0xffff) & 0xff);
    }
    return 0;
  }

  private method_read_arg16(): number {
    let p = ((0) >>> 0);
    this.method_set_status(130);
    if (this.m_in_acknowledge) {
      p = ((((((p) & (65280))) | (((this.method_read_inta()) & 0xff)))) >>> 0);
      p = ((((((p) & (255))) | (((((this.method_read_inta()) & 0xffff)) << (8))))) >>> 0);
    } else {
      p = ((((((p) & (65280))) | ((((this.readMemory(((() => { const previous = this.m_PC.w; this.m_PC.w = (((this.m_PC.w) + (1)) & 0xffff); return previous; })()) & 0xffff) & 0xff)) & 0xff)))) >>> 0);
      p = ((((((p) & (255))) | ((((((this.readMemory(((() => { const previous = this.m_PC.w; this.m_PC.w = (((this.m_PC.w) + (1)) & 0xffff); return previous; })()) & 0xffff) & 0xff)) & 0xffff)) << (8))))) >>> 0);
    }
    return p;
    return 0;
  }

  private method_read_op(): number {
    this.method_set_status(162);
    return (this.readMemory(((() => { const previous = this.m_PC.w; this.m_PC.w = (((this.m_PC.w) + (1)) & 0xffff); return previous; })()) & 0xffff) & 0xff);
    return 0;
  }

  private method_read_inta(): number {
    if (1) {
      return this.acknowledgeIrq(0);
    } else {
      return 0;
    }
    return 0;
  }

  private method_read_mem(a: number = 0): number {
    this.method_set_status(130);
    return (this.readMemory((a) & 0xffff) & 0xff);
    return 0;
  }

  private method_write_mem(a: number = 0, v: number = 0): number {
    this.method_set_status(0);
    (this.writeMemory((a) & 0xffff, (v) & 0xff), 0);
    return 0;
  }

  private method_op_push(p: number = 0): number {
    this.method_set_status(4);
    (this.writeMemory(((this.m_SP.w = ((((this.m_SP.w) - (1))) & 0xffff))) & 0xffff, (((p >>> 8) & 0xff)) & 0xff), 0);
    (this.writeMemory(((this.m_SP.w = ((((this.m_SP.w) - (1))) & 0xffff))) & 0xffff, (((p) & 0xff)) & 0xff), 0);
    return 0;
  }

  private method_op_pop(): number {
    let p = ((0) >>> 0);
    this.method_set_status(134);
    p = ((((((p) & (65280))) | ((((this.readMemory(((() => { const previous = this.m_SP.w; this.m_SP.w = (((this.m_SP.w) + (1)) & 0xffff); return previous; })()) & 0xffff) & 0xff)) & 0xff)))) >>> 0);
    p = ((((((p) & (255))) | ((((((this.readMemory(((() => { const previous = this.m_SP.w; this.m_SP.w = (((this.m_SP.w) + (1)) & 0xffff); return previous; })()) & 0xffff) & 0xff)) & 0xffff)) << (8))))) >>> 0);
    return p;
    return 0;
  }

  private method_op_ora(v: number = 0): number {
    this.m_AF.b.h = ((((this.m_AF.b.h) | (v))) & 0xff);
    this.m_AF.b.l = ((this.lut_zsp[this.m_AF.b.h]) & 0xff);
    return 0;
  }

  private method_op_xra(v: number = 0): number {
    this.m_AF.b.h = ((((this.m_AF.b.h) ^ (v))) & 0xff);
    this.m_AF.b.l = ((this.lut_zsp[this.m_AF.b.h]) & 0xff);
    return 0;
  }

  private method_op_ana(v: number = 0): number {
    let hc = ((((((((this.m_AF.b.h) | (v))) << (1))) & (16))) & 0xff);
    this.m_AF.b.h = ((((this.m_AF.b.h) & (v))) & 0xff);
    this.m_AF.b.l = ((this.lut_zsp[this.m_AF.b.h]) & 0xff);
    if (this.method_is_8085()) {
      this.m_AF.b.l = ((((this.m_AF.b.l) | (16))) & 0xff);
    } else {
      this.m_AF.b.l = ((((this.m_AF.b.l) | (hc))) & 0xff);
    }
    return 0;
  }

  private method_op_inr(v: number = 0): number {
    let hc = ((((((Number(((v) & (15))) === Number(15)) ? 1 : 0)) ? (16) : (0))) & 0xff);
    this.m_AF.b.l = ((((((((this.m_AF.b.l) & (1))) | (this.lut_zsp[(v = ((((v) + (1))) & 0xff))]))) | (hc))) & 0xff);
    return v;
    return 0;
  }

  private method_op_dcr(v: number = 0): number {
    let hc = ((((((Number(((v) & (15))) !== Number(0)) ? 1 : 0)) ? (16) : (0))) & 0xff);
    this.m_AF.b.l = ((((((((((this.m_AF.b.l) & (1))) | (this.lut_zsp[(v = ((((v) - (1))) & 0xff))]))) | (hc))) | (2))) & 0xff);
    return v;
    return 0;
  }

  private method_op_add(v: number = 0): number {
    let q = ((((this.m_AF.b.h) + (v))) | 0);
    this.m_AF.b.l = ((((((this.lut_zsp[((q) & (255))]) | (((((q) >>> (8))) & (1))))) | (((((((this.m_AF.b.h) ^ (q))) ^ (v))) & (16))))) & 0xff);
    this.m_AF.b.h = ((q) & 0xff);
    return 0;
  }

  private method_op_adc(v: number = 0): number {
    let q = ((((((this.m_AF.b.h) + (v))) + (((this.m_AF.b.l) & (1))))) | 0);
    this.m_AF.b.l = ((((((this.lut_zsp[((q) & (255))]) | (((((q) >>> (8))) & (1))))) | (((((((this.m_AF.b.h) ^ (q))) ^ (v))) & (16))))) & 0xff);
    this.m_AF.b.h = ((q) & 0xff);
    return 0;
  }

  private method_op_sub(v: number = 0): number {
    let q = ((((this.m_AF.b.h) - (v))) | 0);
    this.m_AF.b.l = ((((((((this.lut_zsp[((q) & (255))]) | (((((q) >>> (8))) & (1))))) | ((((~((((this.m_AF.b.h) ^ (q))) ^ (v)))) & (16))))) | (2))) & 0xff);
    this.m_AF.b.h = ((q) & 0xff);
    return 0;
  }

  private method_op_sbb(v: number = 0): number {
    let q = ((((((this.m_AF.b.h) - (v))) - (((this.m_AF.b.l) & (1))))) | 0);
    this.m_AF.b.l = ((((((((this.lut_zsp[((q) & (255))]) | (((((q) >>> (8))) & (1))))) | ((((~((((this.m_AF.b.h) ^ (q))) ^ (v)))) & (16))))) | (2))) & 0xff);
    this.m_AF.b.h = ((q) & 0xff);
    return 0;
  }

  private method_op_cmp(v: number = 0): number {
    let q = ((((this.m_AF.b.h) - (v))) | 0);
    this.m_AF.b.l = ((((((((this.lut_zsp[((q) & (255))]) | (((((q) >>> (8))) & (1))))) | ((((~((((this.m_AF.b.h) ^ (q))) ^ (v)))) & (16))))) | (2))) & 0xff);
    return 0;
  }

  private method_op_dad(v: number = 0): number {
    let q = ((((this.m_HL.w) + (v))) | 0);
    this.m_AF.b.l = ((((((this.m_AF.b.l) & ((~1)))) | (((((q) >>> (16))) & (1))))) & 0xff);
    this.m_HL.w = ((q) & 0xffff);
    return 0;
  }

  private method_op_jmp(cond: number = 0): number {
    if (cond) {
      this.m_PC.w = ((this.method_read_arg16()) & 0xffff);
      this.m_icount = ((this.m_icount) - (this.method_jmp_taken()));
    } else {
      this.m_PC.w = ((((this.m_PC.w) + (2))) & 0xffff);
    }
    return 0;
  }

  private method_op_call(cond: number = 0): number {
    if (cond) {
      let p = this.method_read_arg16();
      this.m_icount = ((this.m_icount) - (this.method_call_taken()));
      this.method_op_push(this.m_PC.w);
      this.m_PC.w = ((p) & 0xffff);
    } else {
      this.m_PC.w = ((((this.m_PC.w) + (2))) & 0xffff);
    }
    return 0;
  }

  private method_op_ret(cond: number = 0): number {
    if (cond) {
      this.m_icount = ((this.m_icount) - (this.method_ret_taken()));
      this.m_PC.w = ((this.method_op_pop()) & 0xffff);
    }
    return 0;
  }

  private method_op_rst(v: number = 0): number {
    this.method_op_push(this.m_PC.w);
    this.m_PC.w = ((((8) * (v))) & 0xffff);
    return 0;
  }

  private method_execute_one(opcode: number = 0): number {
    this.m_icount = ((this.m_icount) - (this.lut_cycles[opcode]));
    switch (opcode) {
      case 0:
        {
          break;
        }
      case 1:
        {
          this.m_BC.w = ((this.method_read_arg16()) & 0xffff);
          break;
        }
      case 2:
        {
          this.method_write_mem(this.m_BC.w, this.m_AF.b.h);
          break;
        }
      case 3:
        {
          this.m_BC.w = (((this.m_BC.w) + (1)) & 0xffff);
          if (this.method_is_8085()) {
            if (((Number(this.m_BC.w) === Number(0)) ? 1 : 0)) {
              this.m_AF.b.l = ((((this.m_AF.b.l) | (32))) & 0xff);
            } else {
              this.m_AF.b.l = ((((this.m_AF.b.l) & ((~32)))) & 0xff);
            }
          }
          break;
        }
      case 4:
        {
          this.m_BC.b.h = ((this.method_op_inr(this.m_BC.b.h)) & 0xff);
          break;
        }
      case 5:
        {
          this.m_BC.b.h = ((this.method_op_dcr(this.m_BC.b.h)) & 0xff);
          break;
        }
      case 6:
        {
          this.m_BC.b.h = ((this.method_read_arg()) & 0xff);
          break;
        }
      case 7:
        {
          this.m_AF.b.h = ((((((this.m_AF.b.h) << (1))) | (((this.m_AF.b.h) >>> (7))))) & 0xff);
          this.m_AF.b.l = ((((((this.m_AF.b.l) & (254))) | (((this.m_AF.b.h) & (1))))) & 0xff);
          break;
        }
      case 8:
        {
          if (this.method_is_8085()) {
            let q_low = ((((this.m_HL.b.l) - (this.m_BC.b.l))) | 0);
            let res_low = ((((q_low) & (255))) & 0xff);
            this.m_AF.b.l = ((((((((this.lut_zs[res_low]) | (((((q_low) >>> (8))) & (1))))) | (((((((this.m_HL.b.l) ^ (res_low))) ^ (this.m_BC.b.l))) & (16))))) | (((((((((this.m_BC.b.l) ^ (this.m_HL.b.l))) & (((this.m_HL.b.l) ^ (res_low))))) & (128))) >>> (5))))) & 0xff);
            this.m_HL.b.l = ((res_low) & 0xff);
            let q_high = ((((((this.m_HL.b.h) - (this.m_BC.b.h))) - (((this.m_AF.b.l) & (1))))) | 0);
            let res_high = ((((q_high) & (255))) & 0xff);
            this.m_AF.b.l = ((((((((this.lut_zs[res_high]) | (((((q_high) >>> (8))) & (1))))) | (((((((this.m_HL.b.h) ^ (res_high))) ^ (this.m_BC.b.h))) & (16))))) | (((((((((this.m_BC.b.h) ^ (this.m_HL.b.h))) & (((this.m_HL.b.h) ^ (res_high))))) & (128))) >>> (5))))) & 0xff);
            this.m_HL.b.h = ((res_high) & 0xff);
            this.m_AF.b.l = ((((((this.m_AF.b.l) & ((~64)))) | (((((Number(((this.m_HL.b.l) | (this.m_HL.b.h))) === Number(0)) ? 1 : 0)) ? (64) : (0))))) & 0xff);
          }
          break;
        }
      case 9:
        {
          this.method_op_dad(this.m_BC.w);
          break;
        }
      case 10:
        {
          this.m_AF.b.h = ((this.method_read_mem(this.m_BC.w)) & 0xff);
          break;
        }
      case 11:
        {
          this.m_BC.w = (((this.m_BC.w) + (-1)) & 0xffff);
          if (this.method_is_8085()) {
            if (((Number(this.m_BC.w) === Number(65535)) ? 1 : 0)) {
              this.m_AF.b.l = ((((this.m_AF.b.l) | (32))) & 0xff);
            } else {
              this.m_AF.b.l = ((((this.m_AF.b.l) & ((~32)))) & 0xff);
            }
          }
          break;
        }
      case 12:
        {
          this.m_BC.b.l = ((this.method_op_inr(this.m_BC.b.l)) & 0xff);
          break;
        }
      case 13:
        {
          this.m_BC.b.l = ((this.method_op_dcr(this.m_BC.b.l)) & 0xff);
          break;
        }
      case 14:
        {
          this.m_BC.b.l = ((this.method_read_arg()) & 0xff);
          break;
        }
      case 15:
        {
          this.m_AF.b.l = ((((((this.m_AF.b.l) & (254))) | (((this.m_AF.b.h) & (1))))) & 0xff);
          this.m_AF.b.h = ((((((this.m_AF.b.h) >>> (1))) | (((this.m_AF.b.h) << (7))))) & 0xff);
          break;
        }
      case 16:
        {
          if (this.method_is_8085()) {
            this.m_AF.b.l = ((((((this.m_AF.b.l) & ((~1)))) | (((this.m_HL.b.l) & (1))))) & 0xff);
            this.m_HL.w = ((((((this.m_HL.w) & (32768))) | (((this.m_HL.w) >>> (1))))) & 0xffff);
          }
          break;
        }
      case 17:
        {
          this.m_DE.w = ((this.method_read_arg16()) & 0xffff);
          break;
        }
      case 18:
        {
          this.method_write_mem(this.m_DE.w, this.m_AF.b.h);
          break;
        }
      case 19:
        {
          this.m_DE.w = (((this.m_DE.w) + (1)) & 0xffff);
          if (this.method_is_8085()) {
            if (((Number(this.m_DE.w) === Number(0)) ? 1 : 0)) {
              this.m_AF.b.l = ((((this.m_AF.b.l) | (32))) & 0xff);
            } else {
              this.m_AF.b.l = ((((this.m_AF.b.l) & ((~32)))) & 0xff);
            }
          }
          break;
        }
      case 20:
        {
          this.m_DE.b.h = ((this.method_op_inr(this.m_DE.b.h)) & 0xff);
          break;
        }
      case 21:
        {
          this.m_DE.b.h = ((this.method_op_dcr(this.m_DE.b.h)) & 0xff);
          break;
        }
      case 22:
        {
          this.m_DE.b.h = ((this.method_read_arg()) & 0xff);
          break;
        }
      case 23:
        {
          let c = ((((this.m_AF.b.l) & (1))) | 0);
          this.m_AF.b.l = ((((((this.m_AF.b.l) & (254))) | (((this.m_AF.b.h) >>> (7))))) & 0xff);
          this.m_AF.b.h = ((((((this.m_AF.b.h) << (1))) | (c))) & 0xff);
          break;
        }
      case 24:
        {
          if (this.method_is_8085()) {
            let c = ((((this.m_AF.b.l) & (1))) | 0);
            this.m_AF.b.l = ((((((this.m_AF.b.l) & ((~((1) | (2)))))) | (((this.m_DE.b.h) >>> (7))))) & 0xff);
            this.m_DE.w = ((((((this.m_DE.w) << (1))) | (c))) & 0xffff);
            if (((Number(((((((this.m_DE.w) >>> (15))) ^ (this.m_AF.b.l))) & (1))) !== Number(0)) ? 1 : 0)) {
              this.m_AF.b.l = ((((this.m_AF.b.l) | (2))) & 0xff);
            }
          }
          break;
        }
      case 25:
        {
          this.method_op_dad(this.m_DE.w);
          break;
        }
      case 26:
        {
          this.m_AF.b.h = ((this.method_read_mem(this.m_DE.w)) & 0xff);
          break;
        }
      case 27:
        {
          this.m_DE.w = (((this.m_DE.w) + (-1)) & 0xffff);
          if (this.method_is_8085()) {
            if (((Number(this.m_DE.w) === Number(65535)) ? 1 : 0)) {
              this.m_AF.b.l = ((((this.m_AF.b.l) | (32))) & 0xff);
            } else {
              this.m_AF.b.l = ((((this.m_AF.b.l) & ((~32)))) & 0xff);
            }
          }
          break;
        }
      case 28:
        {
          this.m_DE.b.l = ((this.method_op_inr(this.m_DE.b.l)) & 0xff);
          break;
        }
      case 29:
        {
          this.m_DE.b.l = ((this.method_op_dcr(this.m_DE.b.l)) & 0xff);
          break;
        }
      case 30:
        {
          this.m_DE.b.l = ((this.method_read_arg()) & 0xff);
          break;
        }
      case 31:
        {
          let c = ((((((this.m_AF.b.l) & (1))) << (7))) | 0);
          this.m_AF.b.l = ((((((this.m_AF.b.l) & (254))) | (((this.m_AF.b.h) & (1))))) & 0xff);
          this.m_AF.b.h = ((((((this.m_AF.b.h) >>> (1))) | (c))) & 0xff);
          break;
        }
      case 32:
        {
          if (this.method_is_8085()) {
            this.m_AF.b.h = ((this.method_get_rim_value()) & 0xff);
            if (((this.m_trap_im_copy) & (128))) {
              this.m_AF.b.h = ((((((this.m_AF.b.h) & ((~8)))) | (((this.m_trap_im_copy) & (8))))) & 0xff);
            }
            this.m_trap_im_copy = ((0) & 0xff);
          }
          break;
        }
      case 33:
        {
          this.m_HL.w = ((this.method_read_arg16()) & 0xffff);
          break;
        }
      case 34:
        {
          this.m_WZ.w = ((this.method_read_arg16()) & 0xffff);
          this.method_write_mem(this.m_WZ.w, this.m_HL.b.l);
          this.m_WZ.w = (((this.m_WZ.w) + (1)) & 0xffff);
          this.method_write_mem(this.m_WZ.w, this.m_HL.b.h);
          break;
        }
      case 35:
        {
          this.m_HL.w = (((this.m_HL.w) + (1)) & 0xffff);
          if (this.method_is_8085()) {
            if (((Number(this.m_HL.w) === Number(0)) ? 1 : 0)) {
              this.m_AF.b.l = ((((this.m_AF.b.l) | (32))) & 0xff);
            } else {
              this.m_AF.b.l = ((((this.m_AF.b.l) & ((~32)))) & 0xff);
            }
          }
          break;
        }
      case 36:
        {
          this.m_HL.b.h = ((this.method_op_inr(this.m_HL.b.h)) & 0xff);
          break;
        }
      case 37:
        {
          this.m_HL.b.h = ((this.method_op_dcr(this.m_HL.b.h)) & 0xff);
          break;
        }
      case 38:
        {
          this.m_HL.b.h = ((this.method_read_arg()) & 0xff);
          break;
        }
      case 39:
        {
          this.m_WZ.b.h = ((this.m_AF.b.h) & 0xff);
          if ((((((this.m_AF.b.l) & (16))) || (((Number(((this.m_AF.b.h) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
            this.m_WZ.b.h = ((((this.m_WZ.b.h) + (6))) & 0xff);
          }
          if ((((((this.m_AF.b.l) & (1))) || (((Number(this.m_AF.b.h) > Number(153)) ? 1 : 0))) ? 1 : 0)) {
            this.m_WZ.b.h = ((((this.m_WZ.b.h) + (96))) & 0xff);
          }
          this.m_AF.b.l = ((((((((((this.m_AF.b.l) & (35))) | (((((Number(this.m_AF.b.h) > Number(153)) ? 1 : 0)) ? (1) : (0))))) | (((((this.m_AF.b.h) ^ (this.m_WZ.b.h))) & (16))))) | (this.lut_zsp[this.m_WZ.b.h]))) & 0xff);
          this.m_AF.b.h = ((this.m_WZ.b.h) & 0xff);
          break;
        }
      case 40:
        {
          if (this.method_is_8085()) {
            this.m_WZ.w = ((this.method_read_arg()) & 0xffff);
            this.m_DE.w = ((((((this.m_HL.w) + (this.m_WZ.w))) & (65535))) & 0xffff);
          }
          break;
        }
      case 41:
        {
          this.method_op_dad(this.m_HL.w);
          break;
        }
      case 42:
        {
          this.m_WZ.w = ((this.method_read_arg16()) & 0xffff);
          this.m_HL.b.l = ((this.method_read_mem(this.m_WZ.w)) & 0xff);
          this.m_WZ.w = (((this.m_WZ.w) + (1)) & 0xffff);
          this.m_HL.b.h = ((this.method_read_mem(this.m_WZ.w)) & 0xff);
          break;
        }
      case 43:
        {
          this.m_HL.w = (((this.m_HL.w) + (-1)) & 0xffff);
          if (this.method_is_8085()) {
            if (((Number(this.m_HL.w) === Number(65535)) ? 1 : 0)) {
              this.m_AF.b.l = ((((this.m_AF.b.l) | (32))) & 0xff);
            } else {
              this.m_AF.b.l = ((((this.m_AF.b.l) & ((~32)))) & 0xff);
            }
          }
          break;
        }
      case 44:
        {
          this.m_HL.b.l = ((this.method_op_inr(this.m_HL.b.l)) & 0xff);
          break;
        }
      case 45:
        {
          this.m_HL.b.l = ((this.method_op_dcr(this.m_HL.b.l)) & 0xff);
          break;
        }
      case 46:
        {
          this.m_HL.b.l = ((this.method_read_arg()) & 0xff);
          break;
        }
      case 47:
        {
          this.m_AF.b.h = ((((this.m_AF.b.h) ^ (255))) & 0xff);
          if (this.method_is_8085()) {
            this.m_AF.b.l = ((((this.m_AF.b.l) | (2))) & 0xff);
          }
          break;
        }
      case 48:
        {
          if (this.method_is_8085()) {
            if (((this.m_AF.b.h) & (8))) {
              this.m_im = ((((this.m_im) & ((~((((((((1) | (2))) | (4))) | (16))) | (32)))))) & 0xff);
              this.m_im = ((((this.m_im) | (((this.m_AF.b.h) & (((((1) | (2))) | (4))))))) & 0xff);
              if ((((((Number(((this.m_im) & (1))) === Number(0)) ? 1 : 0)) && (this.m_irq_state[1])) ? 1 : 0)) {
                this.m_im = ((((this.m_im) | (16))) & 0xff);
              }
              if ((((((Number(((this.m_im) & (2))) === Number(0)) ? 1 : 0)) && (this.m_irq_state[2])) ? 1 : 0)) {
                this.m_im = ((((this.m_im) | (32))) & 0xff);
              }
            }
            if (((this.m_AF.b.h) & (16))) {
              this.m_im = ((((this.m_im) & ((~64)))) & 0xff);
            }
            if (((this.m_AF.b.h) & (64))) {
              this.method_set_sod(((this.m_AF.b.h) >>> (7)));
            }
            this.method_check_for_interrupts();
          }
          break;
        }
      case 49:
        {
          this.m_SP.w = ((this.method_read_arg16()) & 0xffff);
          break;
        }
      case 50:
        {
          this.m_WZ.w = ((this.method_read_arg16()) & 0xffff);
          this.method_write_mem(this.m_WZ.w, this.m_AF.b.h);
          break;
        }
      case 51:
        {
          this.m_SP.w = (((this.m_SP.w) + (1)) & 0xffff);
          if (this.method_is_8085()) {
            if (((Number(this.m_SP.w) === Number(0)) ? 1 : 0)) {
              this.m_AF.b.l = ((((this.m_AF.b.l) | (32))) & 0xff);
            } else {
              this.m_AF.b.l = ((((this.m_AF.b.l) & ((~32)))) & 0xff);
            }
          }
          break;
        }
      case 52:
        {
          this.m_WZ.b.l = ((this.method_op_inr(this.method_read_mem(this.m_HL.w))) & 0xff);
          this.method_write_mem(this.m_HL.w, this.m_WZ.b.l);
          break;
        }
      case 53:
        {
          this.m_WZ.b.l = ((this.method_op_dcr(this.method_read_mem(this.m_HL.w))) & 0xff);
          this.method_write_mem(this.m_HL.w, this.m_WZ.b.l);
          break;
        }
      case 54:
        {
          this.m_WZ.b.l = ((this.method_read_arg()) & 0xff);
          this.method_write_mem(this.m_HL.w, this.m_WZ.b.l);
          break;
        }
      case 55:
        {
          this.m_AF.b.l = ((((((this.m_AF.b.l) & (254))) | (1))) & 0xff);
          break;
        }
      case 56:
        {
          if (this.method_is_8085()) {
            this.m_WZ.w = ((this.method_read_arg()) & 0xffff);
            this.m_DE.w = ((((((this.m_SP.w) + (this.m_WZ.w))) & (65535))) & 0xffff);
          }
          break;
        }
      case 57:
        {
          this.method_op_dad(this.m_SP.w);
          break;
        }
      case 58:
        {
          this.m_WZ.w = ((this.method_read_arg16()) & 0xffff);
          this.m_AF.b.h = ((this.method_read_mem(this.m_WZ.w)) & 0xff);
          break;
        }
      case 59:
        {
          this.m_SP.w = (((this.m_SP.w) + (-1)) & 0xffff);
          if (this.method_is_8085()) {
            if (((Number(this.m_SP.w) === Number(65535)) ? 1 : 0)) {
              this.m_AF.b.l = ((((this.m_AF.b.l) | (32))) & 0xff);
            } else {
              this.m_AF.b.l = ((((this.m_AF.b.l) & ((~32)))) & 0xff);
            }
          }
          break;
        }
      case 60:
        {
          this.m_AF.b.h = ((this.method_op_inr(this.m_AF.b.h)) & 0xff);
          break;
        }
      case 61:
        {
          this.m_AF.b.h = ((this.method_op_dcr(this.m_AF.b.h)) & 0xff);
          break;
        }
      case 62:
        {
          this.m_AF.b.h = ((this.method_read_arg()) & 0xff);
          break;
        }
      case 63:
        {
          this.m_AF.b.l = ((((((this.m_AF.b.l) & (254))) | ((((~this.m_AF.b.l)) & (1))))) & 0xff);
          break;
        }
      case 64:
        {
          break;
        }
      case 65:
        {
          this.m_BC.b.h = ((this.m_BC.b.l) & 0xff);
          break;
        }
      case 66:
        {
          this.m_BC.b.h = ((this.m_DE.b.h) & 0xff);
          break;
        }
      case 67:
        {
          this.m_BC.b.h = ((this.m_DE.b.l) & 0xff);
          break;
        }
      case 68:
        {
          this.m_BC.b.h = ((this.m_HL.b.h) & 0xff);
          break;
        }
      case 69:
        {
          this.m_BC.b.h = ((this.m_HL.b.l) & 0xff);
          break;
        }
      case 70:
        {
          this.m_BC.b.h = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          break;
        }
      case 71:
        {
          this.m_BC.b.h = ((this.m_AF.b.h) & 0xff);
          break;
        }
      case 72:
        {
          this.m_BC.b.l = ((this.m_BC.b.h) & 0xff);
          break;
        }
      case 73:
        {
          break;
        }
      case 74:
        {
          this.m_BC.b.l = ((this.m_DE.b.h) & 0xff);
          break;
        }
      case 75:
        {
          this.m_BC.b.l = ((this.m_DE.b.l) & 0xff);
          break;
        }
      case 76:
        {
          this.m_BC.b.l = ((this.m_HL.b.h) & 0xff);
          break;
        }
      case 77:
        {
          this.m_BC.b.l = ((this.m_HL.b.l) & 0xff);
          break;
        }
      case 78:
        {
          this.m_BC.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          break;
        }
      case 79:
        {
          this.m_BC.b.l = ((this.m_AF.b.h) & 0xff);
          break;
        }
      case 80:
        {
          this.m_DE.b.h = ((this.m_BC.b.h) & 0xff);
          break;
        }
      case 81:
        {
          this.m_DE.b.h = ((this.m_BC.b.l) & 0xff);
          break;
        }
      case 82:
        {
          break;
        }
      case 83:
        {
          this.m_DE.b.h = ((this.m_DE.b.l) & 0xff);
          break;
        }
      case 84:
        {
          this.m_DE.b.h = ((this.m_HL.b.h) & 0xff);
          break;
        }
      case 85:
        {
          this.m_DE.b.h = ((this.m_HL.b.l) & 0xff);
          break;
        }
      case 86:
        {
          this.m_DE.b.h = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          break;
        }
      case 87:
        {
          this.m_DE.b.h = ((this.m_AF.b.h) & 0xff);
          break;
        }
      case 88:
        {
          this.m_DE.b.l = ((this.m_BC.b.h) & 0xff);
          break;
        }
      case 89:
        {
          this.m_DE.b.l = ((this.m_BC.b.l) & 0xff);
          break;
        }
      case 90:
        {
          this.m_DE.b.l = ((this.m_DE.b.h) & 0xff);
          break;
        }
      case 91:
        {
          break;
        }
      case 92:
        {
          this.m_DE.b.l = ((this.m_HL.b.h) & 0xff);
          break;
        }
      case 93:
        {
          this.m_DE.b.l = ((this.m_HL.b.l) & 0xff);
          break;
        }
      case 94:
        {
          this.m_DE.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          break;
        }
      case 95:
        {
          this.m_DE.b.l = ((this.m_AF.b.h) & 0xff);
          break;
        }
      case 96:
        {
          this.m_HL.b.h = ((this.m_BC.b.h) & 0xff);
          break;
        }
      case 97:
        {
          this.m_HL.b.h = ((this.m_BC.b.l) & 0xff);
          break;
        }
      case 98:
        {
          this.m_HL.b.h = ((this.m_DE.b.h) & 0xff);
          break;
        }
      case 99:
        {
          this.m_HL.b.h = ((this.m_DE.b.l) & 0xff);
          break;
        }
      case 100:
        {
          break;
        }
      case 101:
        {
          this.m_HL.b.h = ((this.m_HL.b.l) & 0xff);
          break;
        }
      case 102:
        {
          this.m_HL.b.h = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          break;
        }
      case 103:
        {
          this.m_HL.b.h = ((this.m_AF.b.h) & 0xff);
          break;
        }
      case 104:
        {
          this.m_HL.b.l = ((this.m_BC.b.h) & 0xff);
          break;
        }
      case 105:
        {
          this.m_HL.b.l = ((this.m_BC.b.l) & 0xff);
          break;
        }
      case 106:
        {
          this.m_HL.b.l = ((this.m_DE.b.h) & 0xff);
          break;
        }
      case 107:
        {
          this.m_HL.b.l = ((this.m_DE.b.l) & 0xff);
          break;
        }
      case 108:
        {
          this.m_HL.b.l = ((this.m_HL.b.h) & 0xff);
          break;
        }
      case 109:
        {
          break;
        }
      case 110:
        {
          this.m_HL.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          break;
        }
      case 111:
        {
          this.m_HL.b.l = ((this.m_AF.b.h) & 0xff);
          break;
        }
      case 112:
        {
          this.method_write_mem(this.m_HL.w, this.m_BC.b.h);
          break;
        }
      case 113:
        {
          this.method_write_mem(this.m_HL.w, this.m_BC.b.l);
          break;
        }
      case 114:
        {
          this.method_write_mem(this.m_HL.w, this.m_DE.b.h);
          break;
        }
      case 115:
        {
          this.method_write_mem(this.m_HL.w, this.m_DE.b.l);
          break;
        }
      case 116:
        {
          this.method_write_mem(this.m_HL.w, this.m_HL.b.h);
          break;
        }
      case 117:
        {
          this.method_write_mem(this.m_HL.w, this.m_HL.b.l);
          break;
        }
      case 118:
        {
          this.m_PC.w = (((this.m_PC.w) + (-1)) & 0xffff);
          this.m_halt = ((1) & 0xff);
          this.method_set_status(138);
          break;
        }
      case 119:
        {
          this.method_write_mem(this.m_HL.w, this.m_AF.b.h);
          break;
        }
      case 120:
        {
          this.m_AF.b.h = ((this.m_BC.b.h) & 0xff);
          break;
        }
      case 121:
        {
          this.m_AF.b.h = ((this.m_BC.b.l) & 0xff);
          break;
        }
      case 122:
        {
          this.m_AF.b.h = ((this.m_DE.b.h) & 0xff);
          break;
        }
      case 123:
        {
          this.m_AF.b.h = ((this.m_DE.b.l) & 0xff);
          break;
        }
      case 124:
        {
          this.m_AF.b.h = ((this.m_HL.b.h) & 0xff);
          break;
        }
      case 125:
        {
          this.m_AF.b.h = ((this.m_HL.b.l) & 0xff);
          break;
        }
      case 126:
        {
          this.m_AF.b.h = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          break;
        }
      case 127:
        {
          break;
        }
      case 128:
        {
          this.method_op_add(this.m_BC.b.h);
          break;
        }
      case 129:
        {
          this.method_op_add(this.m_BC.b.l);
          break;
        }
      case 130:
        {
          this.method_op_add(this.m_DE.b.h);
          break;
        }
      case 131:
        {
          this.method_op_add(this.m_DE.b.l);
          break;
        }
      case 132:
        {
          this.method_op_add(this.m_HL.b.h);
          break;
        }
      case 133:
        {
          this.method_op_add(this.m_HL.b.l);
          break;
        }
      case 134:
        {
          this.m_WZ.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          this.method_op_add(this.m_WZ.b.l);
          break;
        }
      case 135:
        {
          this.method_op_add(this.m_AF.b.h);
          break;
        }
      case 136:
        {
          this.method_op_adc(this.m_BC.b.h);
          break;
        }
      case 137:
        {
          this.method_op_adc(this.m_BC.b.l);
          break;
        }
      case 138:
        {
          this.method_op_adc(this.m_DE.b.h);
          break;
        }
      case 139:
        {
          this.method_op_adc(this.m_DE.b.l);
          break;
        }
      case 140:
        {
          this.method_op_adc(this.m_HL.b.h);
          break;
        }
      case 141:
        {
          this.method_op_adc(this.m_HL.b.l);
          break;
        }
      case 142:
        {
          this.m_WZ.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          this.method_op_adc(this.m_WZ.b.l);
          break;
        }
      case 143:
        {
          this.method_op_adc(this.m_AF.b.h);
          break;
        }
      case 144:
        {
          this.method_op_sub(this.m_BC.b.h);
          break;
        }
      case 145:
        {
          this.method_op_sub(this.m_BC.b.l);
          break;
        }
      case 146:
        {
          this.method_op_sub(this.m_DE.b.h);
          break;
        }
      case 147:
        {
          this.method_op_sub(this.m_DE.b.l);
          break;
        }
      case 148:
        {
          this.method_op_sub(this.m_HL.b.h);
          break;
        }
      case 149:
        {
          this.method_op_sub(this.m_HL.b.l);
          break;
        }
      case 150:
        {
          this.m_WZ.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          this.method_op_sub(this.m_WZ.b.l);
          break;
        }
      case 151:
        {
          this.method_op_sub(this.m_AF.b.h);
          break;
        }
      case 152:
        {
          this.method_op_sbb(this.m_BC.b.h);
          break;
        }
      case 153:
        {
          this.method_op_sbb(this.m_BC.b.l);
          break;
        }
      case 154:
        {
          this.method_op_sbb(this.m_DE.b.h);
          break;
        }
      case 155:
        {
          this.method_op_sbb(this.m_DE.b.l);
          break;
        }
      case 156:
        {
          this.method_op_sbb(this.m_HL.b.h);
          break;
        }
      case 157:
        {
          this.method_op_sbb(this.m_HL.b.l);
          break;
        }
      case 158:
        {
          this.m_WZ.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          this.method_op_sbb(this.m_WZ.b.l);
          break;
        }
      case 159:
        {
          this.method_op_sbb(this.m_AF.b.h);
          break;
        }
      case 160:
        {
          this.method_op_ana(this.m_BC.b.h);
          break;
        }
      case 161:
        {
          this.method_op_ana(this.m_BC.b.l);
          break;
        }
      case 162:
        {
          this.method_op_ana(this.m_DE.b.h);
          break;
        }
      case 163:
        {
          this.method_op_ana(this.m_DE.b.l);
          break;
        }
      case 164:
        {
          this.method_op_ana(this.m_HL.b.h);
          break;
        }
      case 165:
        {
          this.method_op_ana(this.m_HL.b.l);
          break;
        }
      case 166:
        {
          this.m_WZ.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          this.method_op_ana(this.m_WZ.b.l);
          break;
        }
      case 167:
        {
          this.method_op_ana(this.m_AF.b.h);
          break;
        }
      case 168:
        {
          this.method_op_xra(this.m_BC.b.h);
          break;
        }
      case 169:
        {
          this.method_op_xra(this.m_BC.b.l);
          break;
        }
      case 170:
        {
          this.method_op_xra(this.m_DE.b.h);
          break;
        }
      case 171:
        {
          this.method_op_xra(this.m_DE.b.l);
          break;
        }
      case 172:
        {
          this.method_op_xra(this.m_HL.b.h);
          break;
        }
      case 173:
        {
          this.method_op_xra(this.m_HL.b.l);
          break;
        }
      case 174:
        {
          this.m_WZ.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          this.method_op_xra(this.m_WZ.b.l);
          break;
        }
      case 175:
        {
          this.method_op_xra(this.m_AF.b.h);
          break;
        }
      case 176:
        {
          this.method_op_ora(this.m_BC.b.h);
          break;
        }
      case 177:
        {
          this.method_op_ora(this.m_BC.b.l);
          break;
        }
      case 178:
        {
          this.method_op_ora(this.m_DE.b.h);
          break;
        }
      case 179:
        {
          this.method_op_ora(this.m_DE.b.l);
          break;
        }
      case 180:
        {
          this.method_op_ora(this.m_HL.b.h);
          break;
        }
      case 181:
        {
          this.method_op_ora(this.m_HL.b.l);
          break;
        }
      case 182:
        {
          this.m_WZ.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          this.method_op_ora(this.m_WZ.b.l);
          break;
        }
      case 183:
        {
          this.method_op_ora(this.m_AF.b.h);
          break;
        }
      case 184:
        {
          this.method_op_cmp(this.m_BC.b.h);
          break;
        }
      case 185:
        {
          this.method_op_cmp(this.m_BC.b.l);
          break;
        }
      case 186:
        {
          this.method_op_cmp(this.m_DE.b.h);
          break;
        }
      case 187:
        {
          this.method_op_cmp(this.m_DE.b.l);
          break;
        }
      case 188:
        {
          this.method_op_cmp(this.m_HL.b.h);
          break;
        }
      case 189:
        {
          this.method_op_cmp(this.m_HL.b.l);
          break;
        }
      case 190:
        {
          this.m_WZ.b.l = ((this.method_read_mem(this.m_HL.w)) & 0xff);
          this.method_op_cmp(this.m_WZ.b.l);
          break;
        }
      case 191:
        {
          this.method_op_cmp(this.m_AF.b.h);
          break;
        }
      case 192:
        {
          this.method_op_ret(((((this.m_AF.b.l) & (64))) ? 0 : 1));
          break;
        }
      case 193:
        {
          this.m_BC.w = ((this.method_op_pop()) & 0xffff);
          break;
        }
      case 194:
        {
          this.method_op_jmp(((((this.m_AF.b.l) & (64))) ? 0 : 1));
          break;
        }
      case 195:
        {
          this.method_op_jmp(1);
          break;
        }
      case 196:
        {
          this.method_op_call(((((this.m_AF.b.l) & (64))) ? 0 : 1));
          break;
        }
      case 197:
        {
          this.method_op_push(this.m_BC.w);
          break;
        }
      case 198:
        {
          this.m_WZ.b.l = ((this.method_read_arg()) & 0xff);
          this.method_op_add(this.m_WZ.b.l);
          break;
        }
      case 199:
        {
          this.method_op_rst(0);
          break;
        }
      case 200:
        {
          this.method_op_ret(((this.m_AF.b.l) & (64)));
          break;
        }
      case 201:
        {
          this.m_PC.w = ((this.method_op_pop()) & 0xffff);
          break;
        }
      case 202:
        {
          this.method_op_jmp(((this.m_AF.b.l) & (64)));
          break;
        }
      case 203:
        {
          if (this.method_is_8085()) {
            if (((this.m_AF.b.l) & (2))) {
              this.m_icount = ((this.m_icount) - (this.method_ret_taken()));
              this.method_op_rst(8);
            }
          } else {
            this.method_op_jmp(1);
          }
          break;
        }
      case 204:
        {
          this.method_op_call(((this.m_AF.b.l) & (64)));
          break;
        }
      case 205:
        {
          this.method_op_call(1);
          break;
        }
      case 206:
        {
          this.m_WZ.b.l = ((this.method_read_arg()) & 0xff);
          this.method_op_adc(this.m_WZ.b.l);
          break;
        }
      case 207:
        {
          this.method_op_rst(1);
          break;
        }
      case 208:
        {
          this.method_op_ret(((((this.m_AF.b.l) & (1))) ? 0 : 1));
          break;
        }
      case 209:
        {
          this.m_DE.w = ((this.method_op_pop()) & 0xffff);
          break;
        }
      case 210:
        {
          this.method_op_jmp(((((this.m_AF.b.l) & (1))) ? 0 : 1));
          break;
        }
      case 211:
        {
          this.method_set_status(16);
          this.m_WZ.w = ((this.method_read_arg()) & 0xffff);
          (this.bus.out((this.m_WZ.w) & 0xff, (this.m_AF.b.h) & 0xff), 0);
          break;
        }
      case 212:
        {
          this.method_op_call(((((this.m_AF.b.l) & (1))) ? 0 : 1));
          break;
        }
      case 213:
        {
          this.method_op_push(this.m_DE.w);
          break;
        }
      case 214:
        {
          this.m_WZ.b.l = ((this.method_read_arg()) & 0xff);
          this.method_op_sub(this.m_WZ.b.l);
          break;
        }
      case 215:
        {
          this.method_op_rst(2);
          break;
        }
      case 216:
        {
          this.method_op_ret(((this.m_AF.b.l) & (1)));
          break;
        }
      case 217:
        {
          if (this.method_is_8085()) {
            this.m_WZ.w = ((this.m_DE.w) & 0xffff);
            this.method_write_mem(this.m_WZ.w, this.m_HL.b.l);
            this.m_WZ.w = (((this.m_WZ.w) + (1)) & 0xffff);
            this.method_write_mem(this.m_WZ.w, this.m_HL.b.h);
          } else {
            this.m_PC.w = ((this.method_op_pop()) & 0xffff);
          }
          break;
        }
      case 218:
        {
          this.method_op_jmp(((this.m_AF.b.l) & (1)));
          break;
        }
      case 219:
        {
          this.method_set_status(66);
          this.m_WZ.w = ((this.method_read_arg()) & 0xffff);
          this.m_AF.b.h = (((this.bus.in((this.m_WZ.w) & 0xff) & 0xff)) & 0xff);
          break;
        }
      case 220:
        {
          this.method_op_call(((this.m_AF.b.l) & (1)));
          break;
        }
      case 221:
        {
          if (this.method_is_8085()) {
            this.method_op_jmp(((((this.m_AF.b.l) & (32))) ? 0 : 1));
          } else {
            this.method_op_call(1);
          }
          break;
        }
      case 222:
        {
          this.m_WZ.b.l = ((this.method_read_arg()) & 0xff);
          this.method_op_sbb(this.m_WZ.b.l);
          break;
        }
      case 223:
        {
          this.method_op_rst(3);
          break;
        }
      case 224:
        {
          this.method_op_ret(((((this.m_AF.b.l) & (4))) ? 0 : 1));
          break;
        }
      case 225:
        {
          this.m_HL.w = ((this.method_op_pop()) & 0xffff);
          break;
        }
      case 226:
        {
          this.method_op_jmp(((((this.m_AF.b.l) & (4))) ? 0 : 1));
          break;
        }
      case 227:
        {
          this.m_WZ.w = ((this.method_op_pop()) & 0xffff);
          this.method_op_push(this.m_HL.w);
          this.m_HL.w = ((this.m_WZ.w) & 0xffff);
          break;
        }
      case 228:
        {
          this.method_op_call(((((this.m_AF.b.l) & (4))) ? 0 : 1));
          break;
        }
      case 229:
        {
          this.method_op_push(this.m_HL.w);
          break;
        }
      case 230:
        {
          this.m_WZ.b.l = ((this.method_read_arg()) & 0xff);
          this.method_op_ana(this.m_WZ.b.l);
          break;
        }
      case 231:
        {
          this.method_op_rst(4);
          break;
        }
      case 232:
        {
          this.method_op_ret(((this.m_AF.b.l) & (4)));
          break;
        }
      case 233:
        {
          this.m_PC.w = ((this.m_HL.w) & 0xffff);
          break;
        }
      case 234:
        {
          this.method_op_jmp(((this.m_AF.b.l) & (4)));
          break;
        }
      case 235:
        {
          this.m_WZ.w = ((this.m_DE.w) & 0xffff);
          this.m_DE.w = ((this.m_HL.w) & 0xffff);
          this.m_HL.w = ((this.m_WZ.w) & 0xffff);
          break;
        }
      case 236:
        {
          this.method_op_call(((this.m_AF.b.l) & (4)));
          break;
        }
      case 237:
        {
          if (this.method_is_8085()) {
            this.m_WZ.w = ((this.m_DE.w) & 0xffff);
            this.m_HL.b.l = ((this.method_read_mem(this.m_WZ.w)) & 0xff);
            this.m_WZ.w = (((this.m_WZ.w) + (1)) & 0xffff);
            this.m_HL.b.h = ((this.method_read_mem(this.m_WZ.w)) & 0xff);
          } else {
            this.method_op_call(1);
          }
          break;
        }
      case 238:
        {
          this.m_WZ.b.l = ((this.method_read_arg()) & 0xff);
          this.method_op_xra(this.m_WZ.b.l);
          break;
        }
      case 239:
        {
          this.method_op_rst(5);
          break;
        }
      case 240:
        {
          this.method_op_ret(((((this.m_AF.b.l) & (128))) ? 0 : 1));
          break;
        }
      case 241:
        {
          this.m_AF.w = ((this.method_op_pop()) & 0xffff);
          break;
        }
      case 242:
        {
          this.method_op_jmp(((((this.m_AF.b.l) & (128))) ? 0 : 1));
          break;
        }
      case 243:
        {
          this.method_set_inte(0);
          break;
        }
      case 244:
        {
          this.method_op_call(((((this.m_AF.b.l) & (128))) ? 0 : 1));
          break;
        }
      case 245:
        {
          this.m_AF.b.l = ((((this.m_AF.b.l) & ((~8)))) & 0xff);
          if (((this.method_is_8085()) ? 0 : 1)) {
            this.m_AF.b.l = ((((((this.m_AF.b.l) & ((~32)))) | (2))) & 0xff);
          }
          this.method_op_push(this.m_AF.w);
          break;
        }
      case 246:
        {
          this.m_WZ.b.l = ((this.method_read_arg()) & 0xff);
          this.method_op_ora(this.m_WZ.b.l);
          break;
        }
      case 247:
        {
          this.method_op_rst(6);
          break;
        }
      case 248:
        {
          this.method_op_ret(((this.m_AF.b.l) & (128)));
          break;
        }
      case 249:
        {
          this.m_SP.w = ((this.m_HL.w) & 0xffff);
          break;
        }
      case 250:
        {
          this.method_op_jmp(((this.m_AF.b.l) & (128)));
          break;
        }
      case 251:
        {
          this.method_set_inte(1);
          this.m_after_ei = ((2) & 0xff);
          break;
        }
      case 252:
        {
          this.method_op_call(((this.m_AF.b.l) & (128)));
          break;
        }
      case 253:
        {
          if (this.method_is_8085()) {
            this.method_op_jmp(((this.m_AF.b.l) & (32)));
          } else {
            this.method_op_call(1);
          }
          break;
        }
      case 254:
        {
          this.m_WZ.b.l = ((this.method_read_arg()) & 0xff);
          this.method_op_cmp(this.m_WZ.b.l);
          break;
        }
      case 255:
        {
          this.method_op_rst(7);
          break;
        }
    }
    return 0;
  }

  private method_ret_taken(): number {
    return 6;
    return 0;
  }

  private method_jmp_taken(): number {
    return 0;
    return 0;
  }

  private method_call_taken(): number {
    return 6;
    return 0;
  }

  private method_is_8085(): number {
    return 0;
    return 0;
  }
}

export const cpu: GeneratedCpuExecutable = {
  type: "I8080",
  summary: {"opcodes":256,"compiledOpcodes":256,"methods":36,"compiledMethods":36,"diagnostics":0},
  create: (bus: CpuBus): Cpu => new GeneratedI8080(bus),
};

export default cpu;
