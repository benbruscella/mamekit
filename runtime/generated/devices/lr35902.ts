// GENERATED from MAME CPU source and opcode DSL; do not edit.
// Sources:
// - src/devices/cpu/lr35902/lr35902.cpp
// - src/devices/cpu/lr35902/lr35902.h
// - src/devices/cpu/lr35902/opc_main.hxx
// - src/devices/cpu/lr35902/opc_cb.hxx
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
const GENERATED_METHOD_NAMES = new Set<string>(["cycles_passed","mem_read_byte","mem_write_byte","mem_read_word","mem_write_word","check_interrupts","execute_set_input","get_speed","set_speed","set_halt_bug","get_ie","set_ie","get_if","set_if","dma_cycles_to_burn"]);

class GeneratedLR35902 implements Cpu {
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
  private m_A = ((0) & 0xff);
  private m_B = ((0) & 0xff);
  private m_C = ((0) & 0xff);
  private m_D = ((0) & 0xff);
  private m_dma_cycles_to_burn = ((0) >>> 0);
  private m_E = ((0) & 0xff);
  private m_enable = ((0) >>> 0);
  private m_entering_halt = ((0) ? 1 : 0);
  private m_execution_state = ((0) >>> 0);
  private m_F = ((0) & 0xff);
  private m_gb_speed = ((0) >>> 0);
  private m_gb_speed_change_pending = ((0) >>> 0);
  private m_H = ((0) & 0xff);
  private m_handle_ei_delay = ((0) ? 1 : 0);
  private m_has_halt_bug = ((0) ? 1 : 0);
  private m_icount = 0;
  private m_IE = ((0) & 0xff);
  private m_IF = ((0) & 0xff);
  private m_irq_state = ((0) >>> 0);
  private m_L = ((0) & 0xff);
  private m_op = ((0) & 0xff);
  private m_PC = ((0) & 0xffff);
  private m_SP = ((0) & 0xffff);
  private get PC(): number { return this.m_PC; }
  private set PC(value: number) { this.m_PC = ((value) & 0xffff); }
  private get SP(): number { return this.m_SP; }
  private set SP(value: number) { this.m_SP = ((value) & 0xffff); }
  private get A(): number { return this.m_A; }
  private set A(value: number) { this.m_A = ((value) & 0xff); }
  private get F(): number { return this.m_F; }
  private set F(value: number) { this.m_F = ((value) & 0xff); }
  private get B(): number { return this.m_B; }
  private set B(value: number) { this.m_B = ((value) & 0xff); }
  private get C(): number { return this.m_C; }
  private set C(value: number) { this.m_C = ((value) & 0xff); }
  private get D(): number { return this.m_D; }
  private set D(value: number) { this.m_D = ((value) & 0xff); }
  private get E(): number { return this.m_E; }
  private set E(value: number) { this.m_E = ((value) & 0xff); }
  private get H(): number { return this.m_H; }
  private set H(value: number) { this.m_H = ((value) & 0xff); }
  private get L(): number { return this.m_L; }
  private set L(value: number) { this.m_L = ((value) & 0xff); }
  private get IRQ(): number { return this.m_enable; }
  private set IRQ(value: number) { this.m_enable = ((value) >>> 0); }
  private get IE(): number { return this.m_IE; }
  private set IE(value: number) { this.m_IE = ((value) & 0xff); }
  private get IF(): number { return this.m_IF; }
  private set IF(value: number) { this.m_IF = ((value) & 0xff); }
  private get GENPC(): number { return this.m_PC; }
  private set GENPC(value: number) { this.m_PC = ((value) & 0xffff); }
  private get CURPC(): number { return this.m_PC; }
  private set CURPC(value: number) { this.m_PC = ((value) & 0xffff); }
  private get GENFLAGS(): number { return this.m_F; }
  private set GENFLAGS(value: number) { this.m_F = ((value) & 0xff); }

  constructor(bus: CpuBus) {
    this.bus = bus;
    this.generatedStart();
    this.reset();
  }

  reset(): void {
    this.resetInternal();
    this.m_A = ((0) & 0xff);
    this.m_F = ((0) & 0xff);
    this.m_B = ((0) & 0xff);
    this.m_C = ((0) & 0xff);
    this.m_D = ((0) & 0xff);
    this.m_E = ((0) & 0xff);
    this.m_H = ((0) & 0xff);
    this.m_L = ((0) & 0xff);
    this.m_SP = ((0) & 0xffff);
    this.m_PC = ((0) & 0xffff);
    this.m_enable = ((0) >>> 0);
    this.m_IE = ((0) & 0xff);
    this.m_IF = ((0) & 0xff);
    this.m_execution_state = ((0) >>> 0);
    this.m_handle_ei_delay = ((0) ? 1 : 0);
    this.m_gb_speed_change_pending = ((0) >>> 0);
    this.m_gb_speed = ((1) >>> 0);
    this.m_entering_halt = ((0) ? 1 : 0);
  }

  step(): number {
    this.m_icount = 0;
    if (((Number(this.m_dma_cycles_to_burn) > Number(0)) ? 1 : 0)) {
      if (((Number(this.m_dma_cycles_to_burn) < Number(4)) ? 1 : 0)) {
        this.method_cycles_passed(this.m_dma_cycles_to_burn);
        this.m_dma_cycles_to_burn = ((0) >>> 0);
      } else {
        this.method_cycles_passed(4);
        this.m_dma_cycles_to_burn = ((((this.m_dma_cycles_to_burn) - (4))) >>> 0);
      }
    } else {
      if (this.m_execution_state) {
        let x = 0;
        switch (this.m_op) {
          case 0:
            {
              break;
            }
          case 1:
            {
              this.m_C = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.m_B = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 2:
            {
              this.method_mem_write_byte(((((this.m_B) << (8))) | (this.m_C)), this.m_A);
              break;
            }
          case 3:
            {
              let r = ((((((this.m_B) << (8))) | (this.m_C))) & 0xffff);
              if (((Number((this.m_C = ((((this.m_C) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_B = ((((this.m_B) + (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_B) << (8))))) | (this.m_C))) ?? 0);
              this.method_cycles_passed(4);
              break;
            }
          case 4:
            {
              let r = 0;
              let f = 0;
              this.m_B = ((((this.m_B) + (1))) & 0xff);
              r = ((this.m_B) & 0xff);
              f = ((((((this.m_F) & (16))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 5:
            {
              let r = 0;
              let f = 0;
              this.m_B = ((((this.m_B) - (1))) & 0xff);
              r = ((this.m_B) & 0xff);
              f = ((((((((this.m_F) & (16))) | (64))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 6:
            {
              this.m_B = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 7:
            {
              this.m_A = ((((((((this.m_A) << (1))) | (((this.m_A) >>> (7))))) & 0xff)) & 0xff);
              if (((this.m_A) & (1))) {
                this.m_F = ((16) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 8:
            {
              this.method_mem_write_word(this.method_mem_read_word(this.m_PC), this.m_SP);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              break;
            }
          case 9:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_H) << (8))) | (this.m_L))) + (((((this.m_B) << (8))) | (this.m_C))))) & 0xffff);
              r2 = ((((((((((this.m_H) << (8))) | (this.m_L))) & (4095))) + (((((((this.m_B) << (8))) | (this.m_C))) & (4095))))) & 0xffff);
              f = ((((((this.m_F) & (128))) & 0xff)) & 0xff);
              if (((Number(r1) > Number(65535)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r2) > Number(4095)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_L = ((r1) & 0xff);
              this.m_H = ((((r1) >>> (8))) & 0xff);
              this.m_F = ((f) & 0xff);
              this.method_cycles_passed(4);
              break;
            }
          case 10:
            {
              this.m_A = ((this.method_mem_read_byte(((((this.m_B) << (8))) | (this.m_C)))) & 0xff);
              break;
            }
          case 11:
            {
              let r = ((((((this.m_B) << (8))) | (this.m_C))) & 0xffff);
              if (((Number((this.m_C = ((((this.m_C) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                this.m_B = ((((this.m_B) - (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_B) << (8))))) | (this.m_C))) ?? 0);
              this.method_cycles_passed(4);
              break;
            }
          case 12:
            {
              let r = 0;
              let f = 0;
              this.m_C = ((((this.m_C) + (1))) & 0xff);
              r = ((this.m_C) & 0xff);
              f = ((((((this.m_F) & (16))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 13:
            {
              let r = 0;
              let f = 0;
              this.m_C = ((((this.m_C) - (1))) & 0xff);
              r = ((this.m_C) & 0xff);
              f = ((((((((this.m_F) & (16))) | (64))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 14:
            {
              this.m_C = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 15:
            {
              this.m_A = ((((((((this.m_A) >>> (1))) | (((this.m_A) << (7))))) & 0xff)) & 0xff);
              this.m_F = ((0) & 0xff);
              if (((this.m_A) & (128))) {
                this.m_F = ((((this.m_F) | (16))) & 0xff);
              }
              break;
            }
          case 16:
            {
              this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()));
              if (this.m_gb_speed_change_pending) {
                if (((Number(this.m_gb_speed) === Number(1)) ? 1 : 0)) {
                  let cycles = ((((((((((2) * (45))) + (1))) * (65536))) + (8))) >>> 0);
                  do {
                    this.method_cycles_passed(128);
                    cycles = ((((cycles) - (128))) >>> 0);
                  } while (((Number(cycles) > Number(128)) ? 1 : 0));
                  this.method_cycles_passed(cycles);
                }
                this.m_gb_speed = ((((((Number(this.m_gb_speed) === Number(1)) ? 1 : 0)) ? (2) : (1))) >>> 0);
              }
              this.m_gb_speed_change_pending = ((0) >>> 0);
              break;
            }
          case 17:
            {
              this.m_E = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.m_D = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 18:
            {
              this.method_mem_write_byte(((((this.m_D) << (8))) | (this.m_E)), this.m_A);
              break;
            }
          case 19:
            {
              let r = ((((((this.m_D) << (8))) | (this.m_E))) & 0xffff);
              if (((Number((this.m_E = ((((this.m_E) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_D = ((((this.m_D) + (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_D) << (8))))) | (this.m_E))) ?? 0);
              this.method_cycles_passed(4);
              break;
            }
          case 20:
            {
              let r = 0;
              let f = 0;
              this.m_D = ((((this.m_D) + (1))) & 0xff);
              r = ((this.m_D) & 0xff);
              f = ((((((this.m_F) & (16))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 21:
            {
              let r = 0;
              let f = 0;
              this.m_D = ((((this.m_D) - (1))) & 0xff);
              r = ((this.m_D) & 0xff);
              f = ((((((((this.m_F) & (16))) | (64))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 22:
            {
              this.m_D = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 23:
            {
              x = ((((((this.m_A) & (128))) ? (16) : (0))) & 0xff);
              this.m_A = ((((((((this.m_A) << (1))) | (((((this.m_F) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
              this.m_F = ((x) & 0xff);
              break;
            }
          case 24:
            {
              let offset = 0;
              offset = (((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) << 24) >> 24);
              this.m_PC = ((((this.m_PC) + (offset))) & 0xffff);
              this.method_cycles_passed(4);
              break;
            }
          case 25:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_H) << (8))) | (this.m_L))) + (((((this.m_D) << (8))) | (this.m_E))))) & 0xffff);
              r2 = ((((((((((this.m_H) << (8))) | (this.m_L))) & (4095))) + (((((((this.m_D) << (8))) | (this.m_E))) & (4095))))) & 0xffff);
              f = ((((((this.m_F) & (128))) & 0xff)) & 0xff);
              if (((Number(r1) > Number(65535)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r2) > Number(4095)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_L = ((r1) & 0xff);
              this.m_H = ((((r1) >>> (8))) & 0xff);
              this.m_F = ((f) & 0xff);
              this.method_cycles_passed(4);
              break;
            }
          case 26:
            {
              this.m_A = ((this.method_mem_read_byte(((((this.m_D) << (8))) | (this.m_E)))) & 0xff);
              break;
            }
          case 27:
            {
              let r = ((((((this.m_D) << (8))) | (this.m_E))) & 0xffff);
              if (((Number((this.m_E = ((((this.m_E) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                this.m_D = ((((this.m_D) - (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_D) << (8))))) | (this.m_E))) ?? 0);
              this.method_cycles_passed(4);
              break;
            }
          case 28:
            {
              let r = 0;
              let f = 0;
              this.m_E = ((((this.m_E) + (1))) & 0xff);
              r = ((this.m_E) & 0xff);
              f = ((((((this.m_F) & (16))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 29:
            {
              let r = 0;
              let f = 0;
              this.m_E = ((((this.m_E) - (1))) & 0xff);
              r = ((this.m_E) & 0xff);
              f = ((((((((this.m_F) & (16))) | (64))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 30:
            {
              this.m_E = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 31:
            {
              x = ((((((this.m_A) & (1))) ? (16) : (0))) & 0xff);
              this.m_A = ((((((((this.m_A) >>> (1))) | (((((this.m_F) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
              this.m_F = ((x) & 0xff);
              break;
            }
          case 32:
            {
              let offset = (((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) << 24) >> 24);
              if (((((this.m_F) & (128))) ? 0 : 1)) {
                this.m_PC = ((((this.m_PC) + (offset))) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 33:
            {
              this.m_L = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.m_H = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 34:
            {
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), this.m_A);
              let r = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              if (((Number((this.m_L = ((((this.m_L) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_H = ((((this.m_H) + (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_H) << (8))))) | (this.m_L))) ?? 0);
              break;
            }
          case 35:
            {
              let r = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              if (((Number((this.m_L = ((((this.m_L) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_H = ((((this.m_H) + (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_H) << (8))))) | (this.m_L))) ?? 0);
              this.method_cycles_passed(4);
              break;
            }
          case 36:
            {
              let r = 0;
              let f = 0;
              this.m_H = ((((this.m_H) + (1))) & 0xff);
              r = ((this.m_H) & 0xff);
              f = ((((((this.m_F) & (16))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 37:
            {
              let r = 0;
              let f = 0;
              this.m_H = ((((this.m_H) - (1))) & 0xff);
              r = ((this.m_H) & 0xff);
              f = ((((((((this.m_F) & (16))) | (64))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 38:
            {
              this.m_H = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 39:
            {
              let tmp = ((this.m_A) | 0);
              if (((((this.m_F) & (64))) ? 0 : 1)) {
                if ((((((this.m_F) & (32))) || (((Number(((tmp) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
                  tmp = ((((tmp) + (6))) | 0);
                }
                if ((((((this.m_F) & (16))) || (((Number(tmp) > Number(159)) ? 1 : 0))) ? 1 : 0)) {
                  tmp = ((((tmp) + (96))) | 0);
                }
              } else {
                if (((this.m_F) & (32))) {
                  tmp = ((((tmp) - (6))) | 0);
                  if (((((this.m_F) & (16))) ? 0 : 1)) {
                    tmp = ((((tmp) & (255))) | 0);
                  }
                }
                if (((this.m_F) & (16))) {
                  tmp = ((((tmp) - (96))) | 0);
                }
              }
              this.m_F = ((((this.m_F) & ((~((32) | (128)))))) & 0xff);
              if (((tmp) & (256))) {
                this.m_F = ((((this.m_F) | (16))) & 0xff);
              }
              this.m_A = ((((tmp) & (255))) & 0xff);
              if (((this.m_A) ? 0 : 1)) {
                this.m_F = ((((this.m_F) | (128))) & 0xff);
              }
              break;
            }
          case 40:
            {
              let offset = (((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) << 24) >> 24);
              if (((this.m_F) & (128))) {
                this.m_PC = ((((this.m_PC) + (offset))) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 41:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_H) << (8))) | (this.m_L))) + (((((this.m_H) << (8))) | (this.m_L))))) & 0xffff);
              r2 = ((((((((((this.m_H) << (8))) | (this.m_L))) & (4095))) + (((((((this.m_H) << (8))) | (this.m_L))) & (4095))))) & 0xffff);
              f = ((((((this.m_F) & (128))) & 0xff)) & 0xff);
              if (((Number(r1) > Number(65535)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r2) > Number(4095)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_L = ((r1) & 0xff);
              this.m_H = ((((r1) >>> (8))) & 0xff);
              this.m_F = ((f) & 0xff);
              this.method_cycles_passed(4);
              break;
            }
          case 42:
            {
              this.m_A = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              let r = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              if (((Number((this.m_L = ((((this.m_L) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_H = ((((this.m_H) + (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_H) << (8))))) | (this.m_L))) ?? 0);
              break;
            }
          case 43:
            {
              let r = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              if (((Number((this.m_L = ((((this.m_L) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                this.m_H = ((((this.m_H) - (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_H) << (8))))) | (this.m_L))) ?? 0);
              this.method_cycles_passed(4);
              break;
            }
          case 44:
            {
              let r = 0;
              let f = 0;
              this.m_L = ((((this.m_L) + (1))) & 0xff);
              r = ((this.m_L) & 0xff);
              f = ((((((this.m_F) & (16))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 45:
            {
              let r = 0;
              let f = 0;
              this.m_L = ((((this.m_L) - (1))) & 0xff);
              r = ((this.m_L) & 0xff);
              f = ((((((((this.m_F) & (16))) | (64))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 46:
            {
              this.m_L = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 47:
            {
              this.m_A = (((~this.m_A)) & 0xff);
              this.m_F = ((((this.m_F) | (((64) | (32))))) & 0xff);
              break;
            }
          case 48:
            {
              let offset = (((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) << 24) >> 24);
              if (((((this.m_F) & (16))) ? 0 : 1)) {
                this.m_PC = ((((this.m_PC) + (offset))) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 49:
            {
              this.m_SP = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              break;
            }
          case 50:
            {
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), this.m_A);
              let r = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              if (((Number((this.m_L = ((((this.m_L) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                this.m_H = ((((this.m_H) - (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_H) << (8))))) | (this.m_L))) ?? 0);
              break;
            }
          case 51:
            {
              this.m_SP = ((((this.m_SP) + (1))) & 0xffff);
              this.method_cycles_passed(4);
              break;
            }
          case 52:
            {
              let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              let r = 0;
              let f = 0;
              f = ((((((this.m_F) & (16))) & 0xff)) & 0xff);
              r = ((this.method_mem_read_byte(addr)) & 0xff);
              r = ((((r) + (1))) & 0xff);
              this.method_mem_write_byte(addr, r);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 53:
            {
              let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              let r = 0;
              let f = 0;
              f = ((((((((this.m_F) & (16))) | (64))) & 0xff)) & 0xff);
              r = ((this.method_mem_read_byte(addr)) & 0xff);
              r = ((((r) - (1))) & 0xff);
              this.method_mem_write_byte(addr, r);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 54:
            {
              let v = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), v);
              break;
            }
          case 55:
            {
              this.m_F = ((((((((this.m_F) & (128))) | (16))) & 0xff)) & 0xff);
              break;
            }
          case 56:
            {
              let offset = (((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) << 24) >> 24);
              if (((this.m_F) & (16))) {
                this.m_PC = ((((this.m_PC) + (offset))) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 57:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_H) << (8))) | (this.m_L))) + (this.m_SP))) & 0xffff);
              r2 = ((((((((((this.m_H) << (8))) | (this.m_L))) & (4095))) + (((this.m_SP) & (4095))))) & 0xffff);
              f = ((((((this.m_F) & (128))) & 0xff)) & 0xff);
              if (((Number(r1) > Number(65535)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r2) > Number(4095)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_L = ((r1) & 0xff);
              this.m_H = ((((r1) >>> (8))) & 0xff);
              this.m_F = ((f) & 0xff);
              this.method_cycles_passed(4);
              break;
            }
          case 58:
            {
              this.m_A = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              let r = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              if (((Number((this.m_L = ((((this.m_L) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                this.m_H = ((((this.m_H) - (1))) & 0xff);
              }
              (this.bus.signal?.("incdec16_cb", ((((((r) << (16))) | (((this.m_H) << (8))))) | (this.m_L))) ?? 0);
              break;
            }
          case 59:
            {
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_cycles_passed(4);
              break;
            }
          case 60:
            {
              let r = 0;
              let f = 0;
              this.m_A = ((((this.m_A) + (1))) & 0xff);
              r = ((this.m_A) & 0xff);
              f = ((((((this.m_F) & (16))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 61:
            {
              let r = 0;
              let f = 0;
              this.m_A = ((((this.m_A) - (1))) & 0xff);
              r = ((this.m_A) & 0xff);
              f = ((((((((this.m_F) & (16))) | (64))) & 0xff)) & 0xff);
              if (((Number(r) === Number(0)) ? 1 : 0)) {
                f = ((((f) | (128))) & 0xff);
              }
              if (((Number(((r) & (15))) === Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 62:
            {
              this.m_A = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 63:
            {
              this.m_F = ((((((((this.m_F) & (128))) | (((((this.m_F) & (16))) ? (0) : (16))))) & 0xff)) & 0xff);
              break;
            }
          case 64:
            {
              break;
            }
          case 65:
            {
              this.m_B = ((this.m_C) & 0xff);
              break;
            }
          case 66:
            {
              this.m_B = ((this.m_D) & 0xff);
              break;
            }
          case 67:
            {
              this.m_B = ((this.m_E) & 0xff);
              break;
            }
          case 68:
            {
              this.m_B = ((this.m_H) & 0xff);
              break;
            }
          case 69:
            {
              this.m_B = ((this.m_L) & 0xff);
              break;
            }
          case 70:
            {
              this.m_B = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              break;
            }
          case 71:
            {
              this.m_B = ((this.m_A) & 0xff);
              break;
            }
          case 72:
            {
              this.m_C = ((this.m_B) & 0xff);
              break;
            }
          case 73:
            {
              break;
            }
          case 74:
            {
              this.m_C = ((this.m_D) & 0xff);
              break;
            }
          case 75:
            {
              this.m_C = ((this.m_E) & 0xff);
              break;
            }
          case 76:
            {
              this.m_C = ((this.m_H) & 0xff);
              break;
            }
          case 77:
            {
              this.m_C = ((this.m_L) & 0xff);
              break;
            }
          case 78:
            {
              this.m_C = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              break;
            }
          case 79:
            {
              this.m_C = ((this.m_A) & 0xff);
              break;
            }
          case 80:
            {
              this.m_D = ((this.m_B) & 0xff);
              break;
            }
          case 81:
            {
              this.m_D = ((this.m_C) & 0xff);
              break;
            }
          case 82:
            {
              break;
            }
          case 83:
            {
              this.m_D = ((this.m_E) & 0xff);
              break;
            }
          case 84:
            {
              this.m_D = ((this.m_H) & 0xff);
              break;
            }
          case 85:
            {
              this.m_D = ((this.m_L) & 0xff);
              break;
            }
          case 86:
            {
              this.m_D = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              break;
            }
          case 87:
            {
              this.m_D = ((this.m_A) & 0xff);
              break;
            }
          case 88:
            {
              this.m_E = ((this.m_B) & 0xff);
              break;
            }
          case 89:
            {
              this.m_E = ((this.m_C) & 0xff);
              break;
            }
          case 90:
            {
              this.m_E = ((this.m_D) & 0xff);
              break;
            }
          case 91:
            {
              break;
            }
          case 92:
            {
              this.m_E = ((this.m_H) & 0xff);
              break;
            }
          case 93:
            {
              this.m_E = ((this.m_L) & 0xff);
              break;
            }
          case 94:
            {
              this.m_E = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              break;
            }
          case 95:
            {
              this.m_E = ((this.m_A) & 0xff);
              break;
            }
          case 96:
            {
              this.m_H = ((this.m_B) & 0xff);
              break;
            }
          case 97:
            {
              this.m_H = ((this.m_C) & 0xff);
              break;
            }
          case 98:
            {
              this.m_H = ((this.m_D) & 0xff);
              break;
            }
          case 99:
            {
              this.m_H = ((this.m_E) & 0xff);
              break;
            }
          case 100:
            {
              break;
            }
          case 101:
            {
              this.m_H = ((this.m_L) & 0xff);
              break;
            }
          case 102:
            {
              this.m_H = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              break;
            }
          case 103:
            {
              this.m_H = ((this.m_A) & 0xff);
              break;
            }
          case 104:
            {
              this.m_L = ((this.m_B) & 0xff);
              break;
            }
          case 105:
            {
              this.m_L = ((this.m_C) & 0xff);
              break;
            }
          case 106:
            {
              this.m_L = ((this.m_D) & 0xff);
              break;
            }
          case 107:
            {
              this.m_L = ((this.m_E) & 0xff);
              break;
            }
          case 108:
            {
              this.m_L = ((this.m_H) & 0xff);
              break;
            }
          case 109:
            {
              break;
            }
          case 110:
            {
              this.m_L = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              break;
            }
          case 111:
            {
              this.m_L = ((this.m_A) & 0xff);
              break;
            }
          case 112:
            {
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), this.m_B);
              break;
            }
          case 113:
            {
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), this.m_C);
              break;
            }
          case 114:
            {
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), this.m_D);
              break;
            }
          case 115:
            {
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), this.m_E);
              break;
            }
          case 116:
            {
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), this.m_H);
              break;
            }
          case 117:
            {
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), this.m_L);
              break;
            }
          case 118:
            {
              this.m_enable = ((((this.m_enable) | (2))) >>> 0);
              this.m_entering_halt = ((1) ? 1 : 0);
              this.m_op = ((this.method_mem_read_byte(this.m_PC)) & 0xff);
              this.m_PC = ((((this.m_PC) - (1))) & 0xffff);
              break;
            }
          case 119:
            {
              this.method_mem_write_byte(((((this.m_H) << (8))) | (this.m_L)), this.m_A);
              break;
            }
          case 120:
            {
              this.m_A = ((this.m_B) & 0xff);
              break;
            }
          case 121:
            {
              this.m_A = ((this.m_C) & 0xff);
              break;
            }
          case 122:
            {
              this.m_A = ((this.m_D) & 0xff);
              break;
            }
          case 123:
            {
              this.m_A = ((this.m_E) & 0xff);
              break;
            }
          case 124:
            {
              this.m_A = ((this.m_H) & 0xff);
              break;
            }
          case 125:
            {
              this.m_A = ((this.m_L) & 0xff);
              break;
            }
          case 126:
            {
              this.m_A = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              break;
            }
          case 127:
            {
              break;
            }
          case 128:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) + (((this.m_B) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) + (this.m_B))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 129:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) + (((this.m_C) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) + (this.m_C))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 130:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) + (((this.m_D) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) + (this.m_D))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 131:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) + (((this.m_E) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) + (this.m_E))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 132:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) + (((this.m_H) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) + (this.m_H))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 133:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) + (((this.m_L) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) + (this.m_L))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 134:
            {
              x = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) + (((x) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) + (x))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 135:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) + (((this.m_A) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) + (this.m_A))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 136:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) + (((this.m_B) & (15))))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) + (this.m_B))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              if (((Number((this.m_A = ((((r2) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 137:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) + (((this.m_C) & (15))))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) + (this.m_C))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              if (((Number((this.m_A = ((((r2) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 138:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) + (((this.m_D) & (15))))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) + (this.m_D))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              if (((Number((this.m_A = ((((r2) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 139:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) + (((this.m_E) & (15))))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) + (this.m_E))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              if (((Number((this.m_A = ((((r2) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 140:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) + (((this.m_H) & (15))))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) + (this.m_H))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              if (((Number((this.m_A = ((((r2) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 141:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) + (((this.m_L) & (15))))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) + (this.m_L))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              if (((Number((this.m_A = ((((r2) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 142:
            {
              x = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) + (((x) & (15))))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) + (x))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              if (((Number((this.m_A = ((((r2) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 143:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) + (((this.m_A) & (15))))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) + (this.m_A))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              if (((Number((this.m_A = ((((r2) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 144:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_B) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_B))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 145:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_C) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_C))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 146:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_D) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_D))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 147:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_E) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_E))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 148:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_H) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_H))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 149:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_L) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_L))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 150:
            {
              x = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((x) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (x))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 151:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_A) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_A))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 152:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) - (((this.m_B) & (15))))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) - (this.m_B))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 153:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) - (((this.m_C) & (15))))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) - (this.m_C))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 154:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) - (((this.m_D) & (15))))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) - (this.m_D))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 155:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) - (((this.m_E) & (15))))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) - (this.m_E))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 156:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) - (((this.m_H) & (15))))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) - (this.m_H))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 157:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) - (((this.m_L) & (15))))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) - (this.m_L))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 158:
            {
              x = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) - (((x) & (15))))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) - (x))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 159:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) - (((this.m_A) & (15))))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) - (this.m_A))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 160:
            {
              if (((Number((this.m_A = ((((this.m_A) & (this.m_B))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((((32) | (128))) & 0xff);
              } else {
                this.m_F = ((32) & 0xff);
              }
              break;
            }
          case 161:
            {
              if (((Number((this.m_A = ((((this.m_A) & (this.m_C))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((((32) | (128))) & 0xff);
              } else {
                this.m_F = ((32) & 0xff);
              }
              break;
            }
          case 162:
            {
              if (((Number((this.m_A = ((((this.m_A) & (this.m_D))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((((32) | (128))) & 0xff);
              } else {
                this.m_F = ((32) & 0xff);
              }
              break;
            }
          case 163:
            {
              if (((Number((this.m_A = ((((this.m_A) & (this.m_E))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((((32) | (128))) & 0xff);
              } else {
                this.m_F = ((32) & 0xff);
              }
              break;
            }
          case 164:
            {
              if (((Number((this.m_A = ((((this.m_A) & (this.m_H))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((((32) | (128))) & 0xff);
              } else {
                this.m_F = ((32) & 0xff);
              }
              break;
            }
          case 165:
            {
              if (((Number((this.m_A = ((((this.m_A) & (this.m_L))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((((32) | (128))) & 0xff);
              } else {
                this.m_F = ((32) & 0xff);
              }
              break;
            }
          case 166:
            {
              x = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              if (((Number((this.m_A = ((((this.m_A) & (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((((32) | (128))) & 0xff);
              } else {
                this.m_F = ((32) & 0xff);
              }
              break;
            }
          case 167:
            {
              this.m_F = ((((((Number(this.m_A) === Number(0)) ? 1 : 0)) ? (((32) | (128))) : (32))) & 0xff);
              break;
            }
          case 168:
            {
              if (((Number((this.m_A = ((((this.m_A) ^ (this.m_B))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 169:
            {
              if (((Number((this.m_A = ((((this.m_A) ^ (this.m_C))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 170:
            {
              if (((Number((this.m_A = ((((this.m_A) ^ (this.m_D))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 171:
            {
              if (((Number((this.m_A = ((((this.m_A) ^ (this.m_E))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 172:
            {
              if (((Number((this.m_A = ((((this.m_A) ^ (this.m_H))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 173:
            {
              if (((Number((this.m_A = ((((this.m_A) ^ (this.m_L))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 174:
            {
              x = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              if (((Number((this.m_A = ((((this.m_A) ^ (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 175:
            {
              if (((Number((this.m_A = ((((this.m_A) ^ (this.m_A))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 176:
            {
              if (((Number((this.m_A = ((((this.m_A) | (this.m_B))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 177:
            {
              if (((Number((this.m_A = ((((this.m_A) | (this.m_C))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 178:
            {
              if (((Number((this.m_A = ((((this.m_A) | (this.m_D))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 179:
            {
              if (((Number((this.m_A = ((((this.m_A) | (this.m_E))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 180:
            {
              if (((Number((this.m_A = ((((this.m_A) | (this.m_H))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 181:
            {
              if (((Number((this.m_A = ((((this.m_A) | (this.m_L))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 182:
            {
              x = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              if (((Number((this.m_A = ((((this.m_A) | (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 183:
            {
              if (((Number((this.m_A = ((((this.m_A) | (this.m_A))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 184:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_B) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_B))) & 0xffff)) & 0xffff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 185:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_C) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_C))) & 0xffff)) & 0xffff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 186:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_D) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_D))) & 0xffff)) & 0xffff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 187:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_E) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_E))) & 0xffff)) & 0xffff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 188:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_H) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_H))) & 0xffff)) & 0xffff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 189:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_L) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_L))) & 0xffff)) & 0xffff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 190:
            {
              x = ((this.method_mem_read_byte(((((this.m_H) << (8))) | (this.m_L)))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((x) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (x))) & 0xffff)) & 0xffff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 191:
            {
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((this.m_A) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (this.m_A))) & 0xffff)) & 0xffff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 192:
            {
              this.method_cycles_passed(4);
              if (((((this.m_F) & (128))) ? 0 : 1)) {
                this.m_PC = ((this.method_mem_read_word(this.m_SP)) & 0xffff);
                this.m_SP = ((((this.m_SP) + (2))) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 193:
            {
              this.m_C = ((this.method_mem_read_byte(((() => { const previous = this.m_SP; this.m_SP = ((((this.m_SP) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.m_B = ((this.method_mem_read_byte(((() => { const previous = this.m_SP; this.m_SP = ((((this.m_SP) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 194:
            {
              let addr = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              if (((((this.m_F) & (128))) ? 0 : 1)) {
                this.m_PC = ((addr) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 195:
            {
              this.m_PC = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.method_cycles_passed(4);
              break;
            }
          case 196:
            {
              let addr = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              if (((((this.m_F) & (128))) ? 0 : 1)) {
                this.method_cycles_passed(4);
                this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
                this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
                this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
                this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
                this.m_PC = ((addr) & 0xffff);
              }
              break;
            }
          case 197:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, this.m_B);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, this.m_C);
              break;
            }
          case 198:
            {
              x = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) + (((x) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) + (x))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 199:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
              this.m_PC = ((0) & 0xffff);
              break;
            }
          case 200:
            {
              this.method_cycles_passed(4);
              if (((this.m_F) & (128))) {
                this.m_PC = ((this.method_mem_read_word(this.m_SP)) & 0xffff);
                this.m_SP = ((((this.m_SP) + (2))) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 201:
            {
              this.m_PC = ((this.method_mem_read_word(this.m_SP)) & 0xffff);
              this.m_SP = ((((this.m_SP) + (2))) & 0xffff);
              this.method_cycles_passed(4);
              break;
            }
          case 202:
            {
              let addr = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              if (((this.m_F) & (128))) {
                this.m_PC = ((addr) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 203:
            {
              x = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              switch (x) {
                case 0:
                  {
                    let f = 0;
                    this.m_B = ((((((((this.m_B) << (1))) | (((this.m_B) >>> (7))))) & 0xff)) & 0xff);
                    if (((this.m_B) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_B) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 1:
                  {
                    let f = 0;
                    this.m_C = ((((((((this.m_C) << (1))) | (((this.m_C) >>> (7))))) & 0xff)) & 0xff);
                    if (((this.m_C) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_C) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 2:
                  {
                    let f = 0;
                    this.m_D = ((((((((this.m_D) << (1))) | (((this.m_D) >>> (7))))) & 0xff)) & 0xff);
                    if (((this.m_D) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_D) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 3:
                  {
                    let f = 0;
                    this.m_E = ((((((((this.m_E) << (1))) | (((this.m_E) >>> (7))))) & 0xff)) & 0xff);
                    if (((this.m_E) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_E) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 4:
                  {
                    let f = 0;
                    this.m_H = ((((((((this.m_H) << (1))) | (((this.m_H) >>> (7))))) & 0xff)) & 0xff);
                    if (((this.m_H) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_H) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 5:
                  {
                    let f = 0;
                    this.m_L = ((((((((this.m_L) << (1))) | (((this.m_L) >>> (7))))) & 0xff)) & 0xff);
                    if (((this.m_L) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_L) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 6:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    let f = 0;
                    x = ((((((((x) << (1))) | (((x) >>> (7))))) & 0xff)) & 0xff);
                    if (((x) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 7:
                  {
                    let f = 0;
                    this.m_A = ((((((((this.m_A) << (1))) | (((this.m_A) >>> (7))))) & 0xff)) & 0xff);
                    if (((this.m_A) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_A) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 8:
                  {
                    let f = 0;
                    this.m_B = ((((((((this.m_B) >>> (1))) | (((this.m_B) << (7))))) & 0xff)) & 0xff);
                    if (((this.m_B) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_B) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 9:
                  {
                    let f = 0;
                    this.m_C = ((((((((this.m_C) >>> (1))) | (((this.m_C) << (7))))) & 0xff)) & 0xff);
                    if (((this.m_C) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_C) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 10:
                  {
                    let f = 0;
                    this.m_D = ((((((((this.m_D) >>> (1))) | (((this.m_D) << (7))))) & 0xff)) & 0xff);
                    if (((this.m_D) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_D) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 11:
                  {
                    let f = 0;
                    this.m_E = ((((((((this.m_E) >>> (1))) | (((this.m_E) << (7))))) & 0xff)) & 0xff);
                    if (((this.m_E) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_E) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 12:
                  {
                    let f = 0;
                    this.m_H = ((((((((this.m_H) >>> (1))) | (((this.m_H) << (7))))) & 0xff)) & 0xff);
                    if (((this.m_H) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_H) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 13:
                  {
                    let f = 0;
                    this.m_L = ((((((((this.m_L) >>> (1))) | (((this.m_L) << (7))))) & 0xff)) & 0xff);
                    if (((this.m_L) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_L) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 14:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    let f = 0;
                    x = ((((((((x) >>> (1))) | (((x) << (7))))) & 0xff)) & 0xff);
                    if (((x) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 15:
                  {
                    let f = 0;
                    this.m_A = ((((((((this.m_A) >>> (1))) | (((this.m_A) << (7))))) & 0xff)) & 0xff);
                    if (((this.m_A) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    if (((Number(this.m_A) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 16:
                  {
                    let r = 0;
                    r = ((((((this.m_B) & (128))) ? (16) : (0))) & 0xff);
                    this.m_B = ((((((((this.m_B) << (1))) | (((((this.m_F) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_B) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 17:
                  {
                    let r = 0;
                    r = ((((((this.m_C) & (128))) ? (16) : (0))) & 0xff);
                    this.m_C = ((((((((this.m_C) << (1))) | (((((this.m_F) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_C) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 18:
                  {
                    let r = 0;
                    r = ((((((this.m_D) & (128))) ? (16) : (0))) & 0xff);
                    this.m_D = ((((((((this.m_D) << (1))) | (((((this.m_F) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_D) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 19:
                  {
                    let r = 0;
                    r = ((((((this.m_E) & (128))) ? (16) : (0))) & 0xff);
                    this.m_E = ((((((((this.m_E) << (1))) | (((((this.m_F) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_E) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 20:
                  {
                    let r = 0;
                    r = ((((((this.m_H) & (128))) ? (16) : (0))) & 0xff);
                    this.m_H = ((((((((this.m_H) << (1))) | (((((this.m_F) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_H) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 21:
                  {
                    let r = 0;
                    r = ((((((this.m_L) & (128))) ? (16) : (0))) & 0xff);
                    this.m_L = ((((((((this.m_L) << (1))) | (((((this.m_F) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_L) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 22:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    let r = 0;
                    r = ((((((x) & (128))) ? (16) : (0))) & 0xff);
                    x = ((((((((x) << (1))) | (((((this.m_F) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 23:
                  {
                    let r = 0;
                    r = ((((((this.m_A) & (128))) ? (16) : (0))) & 0xff);
                    this.m_A = ((((((((this.m_A) << (1))) | (((((this.m_F) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_A) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 24:
                  {
                    let r = 0;
                    r = ((((((this.m_B) & (1))) ? (16) : (0))) & 0xff);
                    this.m_B = ((((((((this.m_B) >>> (1))) | (((((this.m_F) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_B) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 25:
                  {
                    let r = 0;
                    r = ((((((this.m_C) & (1))) ? (16) : (0))) & 0xff);
                    this.m_C = ((((((((this.m_C) >>> (1))) | (((((this.m_F) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_C) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 26:
                  {
                    let r = 0;
                    r = ((((((this.m_D) & (1))) ? (16) : (0))) & 0xff);
                    this.m_D = ((((((((this.m_D) >>> (1))) | (((((this.m_F) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_D) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 27:
                  {
                    let r = 0;
                    r = ((((((this.m_E) & (1))) ? (16) : (0))) & 0xff);
                    this.m_E = ((((((((this.m_E) >>> (1))) | (((((this.m_F) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_E) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 28:
                  {
                    let r = 0;
                    r = ((((((this.m_H) & (1))) ? (16) : (0))) & 0xff);
                    this.m_H = ((((((((this.m_H) >>> (1))) | (((((this.m_F) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_H) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 29:
                  {
                    let r = 0;
                    r = ((((((this.m_L) & (1))) ? (16) : (0))) & 0xff);
                    this.m_L = ((((((((this.m_L) >>> (1))) | (((((this.m_F) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_L) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 30:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    let r = 0;
                    r = ((((((x) & (1))) ? (16) : (0))) & 0xff);
                    x = ((((((((x) >>> (1))) | (((((this.m_F) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 31:
                  {
                    let r = 0;
                    r = ((((((this.m_A) & (1))) ? (16) : (0))) & 0xff);
                    this.m_A = ((((((((this.m_A) >>> (1))) | (((((this.m_F) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                    if (((Number(this.m_A) === Number(0)) ? 1 : 0)) {
                      r = ((((r) | (128))) & 0xff);
                    }
                    this.m_F = ((r) & 0xff);
                    break;
                  }
                case 32:
                  {
                    let f = 0;
                    if (((this.m_B) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_B = ((((this.m_B) << (1))) & 0xff);
                    if (((Number(this.m_B) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 33:
                  {
                    let f = 0;
                    if (((this.m_C) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_C = ((((this.m_C) << (1))) & 0xff);
                    if (((Number(this.m_C) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 34:
                  {
                    let f = 0;
                    if (((this.m_D) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_D = ((((this.m_D) << (1))) & 0xff);
                    if (((Number(this.m_D) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 35:
                  {
                    let f = 0;
                    if (((this.m_E) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_E = ((((this.m_E) << (1))) & 0xff);
                    if (((Number(this.m_E) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 36:
                  {
                    let f = 0;
                    if (((this.m_H) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_H = ((((this.m_H) << (1))) & 0xff);
                    if (((Number(this.m_H) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 37:
                  {
                    let f = 0;
                    if (((this.m_L) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_L = ((((this.m_L) << (1))) & 0xff);
                    if (((Number(this.m_L) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 38:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    let f = 0;
                    if (((x) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    x = ((((x) << (1))) & 0xff);
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 39:
                  {
                    let f = 0;
                    if (((this.m_A) & (128))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_A = ((((this.m_A) << (1))) & 0xff);
                    if (((Number(this.m_A) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 40:
                  {
                    let f = 0;
                    if (((this.m_B) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_B = (((((((((this.m_B) << 24) >> 24)) >>> (1))) & 0xff)) & 0xff);
                    if (((Number(this.m_B) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 41:
                  {
                    let f = 0;
                    if (((this.m_C) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_C = (((((((((this.m_C) << 24) >> 24)) >>> (1))) & 0xff)) & 0xff);
                    if (((Number(this.m_C) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 42:
                  {
                    let f = 0;
                    if (((this.m_D) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_D = (((((((((this.m_D) << 24) >> 24)) >>> (1))) & 0xff)) & 0xff);
                    if (((Number(this.m_D) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 43:
                  {
                    let f = 0;
                    if (((this.m_E) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_E = (((((((((this.m_E) << 24) >> 24)) >>> (1))) & 0xff)) & 0xff);
                    if (((Number(this.m_E) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 44:
                  {
                    let f = 0;
                    if (((this.m_H) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_H = (((((((((this.m_H) << 24) >> 24)) >>> (1))) & 0xff)) & 0xff);
                    if (((Number(this.m_H) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 45:
                  {
                    let f = 0;
                    if (((this.m_L) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_L = (((((((((this.m_L) << 24) >> 24)) >>> (1))) & 0xff)) & 0xff);
                    if (((Number(this.m_L) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 46:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    let f = 0;
                    if (((x) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    x = (((((((((x) << 24) >> 24)) >>> (1))) & 0xff)) & 0xff);
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 47:
                  {
                    let f = 0;
                    if (((this.m_A) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_A = (((((((((this.m_A) << 24) >> 24)) >>> (1))) & 0xff)) & 0xff);
                    if (((Number(this.m_A) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 48:
                  {
                    this.m_B = ((((((((this.m_B) >>> (4))) | (((this.m_B) << (4))))) & 0xff)) & 0xff);
                    if (((Number(this.m_B) === Number(0)) ? 1 : 0)) {
                      this.m_F = ((128) & 0xff);
                    } else {
                      this.m_F = ((0) & 0xff);
                    }
                    break;
                  }
                case 49:
                  {
                    this.m_C = ((((((((this.m_C) >>> (4))) | (((this.m_C) << (4))))) & 0xff)) & 0xff);
                    if (((Number(this.m_C) === Number(0)) ? 1 : 0)) {
                      this.m_F = ((128) & 0xff);
                    } else {
                      this.m_F = ((0) & 0xff);
                    }
                    break;
                  }
                case 50:
                  {
                    this.m_D = ((((((((this.m_D) >>> (4))) | (((this.m_D) << (4))))) & 0xff)) & 0xff);
                    if (((Number(this.m_D) === Number(0)) ? 1 : 0)) {
                      this.m_F = ((128) & 0xff);
                    } else {
                      this.m_F = ((0) & 0xff);
                    }
                    break;
                  }
                case 51:
                  {
                    this.m_E = ((((((((this.m_E) >>> (4))) | (((this.m_E) << (4))))) & 0xff)) & 0xff);
                    if (((Number(this.m_E) === Number(0)) ? 1 : 0)) {
                      this.m_F = ((128) & 0xff);
                    } else {
                      this.m_F = ((0) & 0xff);
                    }
                    break;
                  }
                case 52:
                  {
                    this.m_H = ((((((((this.m_H) >>> (4))) | (((this.m_H) << (4))))) & 0xff)) & 0xff);
                    if (((Number(this.m_H) === Number(0)) ? 1 : 0)) {
                      this.m_F = ((128) & 0xff);
                    } else {
                      this.m_F = ((0) & 0xff);
                    }
                    break;
                  }
                case 53:
                  {
                    this.m_L = ((((((((this.m_L) >>> (4))) | (((this.m_L) << (4))))) & 0xff)) & 0xff);
                    if (((Number(this.m_L) === Number(0)) ? 1 : 0)) {
                      this.m_F = ((128) & 0xff);
                    } else {
                      this.m_F = ((0) & 0xff);
                    }
                    break;
                  }
                case 54:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((((((x) >>> (4))) | (((x) << (4))))) & 0xff)) & 0xff);
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                      this.m_F = ((128) & 0xff);
                    } else {
                      this.m_F = ((0) & 0xff);
                    }
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 55:
                  {
                    this.m_A = ((((((((this.m_A) >>> (4))) | (((this.m_A) << (4))))) & 0xff)) & 0xff);
                    if (((Number(this.m_A) === Number(0)) ? 1 : 0)) {
                      this.m_F = ((128) & 0xff);
                    } else {
                      this.m_F = ((0) & 0xff);
                    }
                    break;
                  }
                case 56:
                  {
                    let f = 0;
                    if (((this.m_B) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_B = ((((this.m_B) >>> (1))) & 0xff);
                    if (((Number(this.m_B) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 57:
                  {
                    let f = 0;
                    if (((this.m_C) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_C = ((((this.m_C) >>> (1))) & 0xff);
                    if (((Number(this.m_C) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 58:
                  {
                    let f = 0;
                    if (((this.m_D) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_D = ((((this.m_D) >>> (1))) & 0xff);
                    if (((Number(this.m_D) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 59:
                  {
                    let f = 0;
                    if (((this.m_E) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_E = ((((this.m_E) >>> (1))) & 0xff);
                    if (((Number(this.m_E) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 60:
                  {
                    let f = 0;
                    if (((this.m_H) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_H = ((((this.m_H) >>> (1))) & 0xff);
                    if (((Number(this.m_H) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 61:
                  {
                    let f = 0;
                    if (((this.m_L) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_L = ((((this.m_L) >>> (1))) & 0xff);
                    if (((Number(this.m_L) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 62:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    let f = 0;
                    if (((x) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    x = ((((x) >>> (1))) & 0xff);
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 63:
                  {
                    let f = 0;
                    if (((this.m_A) & (1))) {
                      f = ((16) & 0xff);
                    } else {
                      f = ((0) & 0xff);
                    }
                    this.m_A = ((((this.m_A) >>> (1))) & 0xff);
                    if (((Number(this.m_A) === Number(0)) ? 1 : 0)) {
                      f = ((((f) | (128))) & 0xff);
                    }
                    this.m_F = ((f) & 0xff);
                    break;
                  }
                case 64:
                  {
                    if (((this.m_B) & (((1) << (0))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 65:
                  {
                    if (((this.m_C) & (((1) << (0))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 66:
                  {
                    if (((this.m_D) & (((1) << (0))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 67:
                  {
                    if (((this.m_E) & (((1) << (0))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 68:
                  {
                    if (((this.m_H) & (((1) << (0))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 69:
                  {
                    if (((this.m_L) & (((1) << (0))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 70:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    if (((x) & (((1) << (0))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 71:
                  {
                    if (((this.m_A) & (((1) << (0))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 72:
                  {
                    if (((this.m_B) & (((1) << (1))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 73:
                  {
                    if (((this.m_C) & (((1) << (1))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 74:
                  {
                    if (((this.m_D) & (((1) << (1))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 75:
                  {
                    if (((this.m_E) & (((1) << (1))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 76:
                  {
                    if (((this.m_H) & (((1) << (1))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 77:
                  {
                    if (((this.m_L) & (((1) << (1))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 78:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    if (((x) & (((1) << (1))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 79:
                  {
                    if (((this.m_A) & (((1) << (1))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 80:
                  {
                    if (((this.m_B) & (((1) << (2))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 81:
                  {
                    if (((this.m_C) & (((1) << (2))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 82:
                  {
                    if (((this.m_D) & (((1) << (2))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 83:
                  {
                    if (((this.m_E) & (((1) << (2))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 84:
                  {
                    if (((this.m_H) & (((1) << (2))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 85:
                  {
                    if (((this.m_L) & (((1) << (2))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 86:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    if (((x) & (((1) << (2))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 87:
                  {
                    if (((this.m_A) & (((1) << (2))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 88:
                  {
                    if (((this.m_B) & (((1) << (3))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 89:
                  {
                    if (((this.m_C) & (((1) << (3))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 90:
                  {
                    if (((this.m_D) & (((1) << (3))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 91:
                  {
                    if (((this.m_E) & (((1) << (3))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 92:
                  {
                    if (((this.m_H) & (((1) << (3))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 93:
                  {
                    if (((this.m_L) & (((1) << (3))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 94:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    if (((x) & (((1) << (3))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 95:
                  {
                    if (((this.m_A) & (((1) << (3))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 96:
                  {
                    if (((this.m_B) & (((1) << (4))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 97:
                  {
                    if (((this.m_C) & (((1) << (4))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 98:
                  {
                    if (((this.m_D) & (((1) << (4))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 99:
                  {
                    if (((this.m_E) & (((1) << (4))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 100:
                  {
                    if (((this.m_H) & (((1) << (4))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 101:
                  {
                    if (((this.m_L) & (((1) << (4))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 102:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    if (((x) & (((1) << (4))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 103:
                  {
                    if (((this.m_A) & (((1) << (4))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 104:
                  {
                    if (((this.m_B) & (((1) << (5))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 105:
                  {
                    if (((this.m_C) & (((1) << (5))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 106:
                  {
                    if (((this.m_D) & (((1) << (5))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 107:
                  {
                    if (((this.m_E) & (((1) << (5))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 108:
                  {
                    if (((this.m_H) & (((1) << (5))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 109:
                  {
                    if (((this.m_L) & (((1) << (5))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 110:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    if (((x) & (((1) << (5))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 111:
                  {
                    if (((this.m_A) & (((1) << (5))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 112:
                  {
                    if (((this.m_B) & (((1) << (6))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 113:
                  {
                    if (((this.m_C) & (((1) << (6))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 114:
                  {
                    if (((this.m_D) & (((1) << (6))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 115:
                  {
                    if (((this.m_E) & (((1) << (6))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 116:
                  {
                    if (((this.m_H) & (((1) << (6))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 117:
                  {
                    if (((this.m_L) & (((1) << (6))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 118:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    if (((x) & (((1) << (6))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 119:
                  {
                    if (((this.m_A) & (((1) << (6))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 120:
                  {
                    if (((this.m_B) & (((1) << (7))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 121:
                  {
                    if (((this.m_C) & (((1) << (7))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 122:
                  {
                    if (((this.m_D) & (((1) << (7))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 123:
                  {
                    if (((this.m_E) & (((1) << (7))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 124:
                  {
                    if (((this.m_H) & (((1) << (7))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 125:
                  {
                    if (((this.m_L) & (((1) << (7))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 126:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    if (((x) & (((1) << (7))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 127:
                  {
                    if (((this.m_A) & (((1) << (7))))) {
                      this.m_F = ((((((32) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    } else {
                      this.m_F = ((((((((128) | (32))) | (((this.m_F) & (16))))) & 0xff)) & 0xff);
                    }
                    break;
                  }
                case 128:
                  {
                    this.m_B = ((((this.m_B) & ((~((1) << (0)))))) & 0xff);
                    break;
                  }
                case 129:
                  {
                    this.m_C = ((((this.m_C) & ((~((1) << (0)))))) & 0xff);
                    break;
                  }
                case 130:
                  {
                    this.m_D = ((((this.m_D) & ((~((1) << (0)))))) & 0xff);
                    break;
                  }
                case 131:
                  {
                    this.m_E = ((((this.m_E) & ((~((1) << (0)))))) & 0xff);
                    break;
                  }
                case 132:
                  {
                    this.m_H = ((((this.m_H) & ((~((1) << (0)))))) & 0xff);
                    break;
                  }
                case 133:
                  {
                    this.m_L = ((((this.m_L) & ((~((1) << (0)))))) & 0xff);
                    break;
                  }
                case 134:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) & ((~((1) << (0)))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 135:
                  {
                    this.m_A = ((((this.m_A) & ((~((1) << (0)))))) & 0xff);
                    break;
                  }
                case 136:
                  {
                    this.m_B = ((((this.m_B) & ((~((1) << (1)))))) & 0xff);
                    break;
                  }
                case 137:
                  {
                    this.m_C = ((((this.m_C) & ((~((1) << (1)))))) & 0xff);
                    break;
                  }
                case 138:
                  {
                    this.m_D = ((((this.m_D) & ((~((1) << (1)))))) & 0xff);
                    break;
                  }
                case 139:
                  {
                    this.m_E = ((((this.m_E) & ((~((1) << (1)))))) & 0xff);
                    break;
                  }
                case 140:
                  {
                    this.m_H = ((((this.m_H) & ((~((1) << (1)))))) & 0xff);
                    break;
                  }
                case 141:
                  {
                    this.m_L = ((((this.m_L) & ((~((1) << (1)))))) & 0xff);
                    break;
                  }
                case 142:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) & ((~((1) << (1)))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 143:
                  {
                    this.m_A = ((((this.m_A) & ((~((1) << (1)))))) & 0xff);
                    break;
                  }
                case 144:
                  {
                    this.m_B = ((((this.m_B) & ((~((1) << (2)))))) & 0xff);
                    break;
                  }
                case 145:
                  {
                    this.m_C = ((((this.m_C) & ((~((1) << (2)))))) & 0xff);
                    break;
                  }
                case 146:
                  {
                    this.m_D = ((((this.m_D) & ((~((1) << (2)))))) & 0xff);
                    break;
                  }
                case 147:
                  {
                    this.m_E = ((((this.m_E) & ((~((1) << (2)))))) & 0xff);
                    break;
                  }
                case 148:
                  {
                    this.m_H = ((((this.m_H) & ((~((1) << (2)))))) & 0xff);
                    break;
                  }
                case 149:
                  {
                    this.m_L = ((((this.m_L) & ((~((1) << (2)))))) & 0xff);
                    break;
                  }
                case 150:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) & ((~((1) << (2)))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 151:
                  {
                    this.m_A = ((((this.m_A) & ((~((1) << (2)))))) & 0xff);
                    break;
                  }
                case 152:
                  {
                    this.m_B = ((((this.m_B) & ((~((1) << (3)))))) & 0xff);
                    break;
                  }
                case 153:
                  {
                    this.m_C = ((((this.m_C) & ((~((1) << (3)))))) & 0xff);
                    break;
                  }
                case 154:
                  {
                    this.m_D = ((((this.m_D) & ((~((1) << (3)))))) & 0xff);
                    break;
                  }
                case 155:
                  {
                    this.m_E = ((((this.m_E) & ((~((1) << (3)))))) & 0xff);
                    break;
                  }
                case 156:
                  {
                    this.m_H = ((((this.m_H) & ((~((1) << (3)))))) & 0xff);
                    break;
                  }
                case 157:
                  {
                    this.m_L = ((((this.m_L) & ((~((1) << (3)))))) & 0xff);
                    break;
                  }
                case 158:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) & ((~((1) << (3)))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 159:
                  {
                    this.m_A = ((((this.m_A) & ((~((1) << (3)))))) & 0xff);
                    break;
                  }
                case 160:
                  {
                    this.m_B = ((((this.m_B) & ((~((1) << (4)))))) & 0xff);
                    break;
                  }
                case 161:
                  {
                    this.m_C = ((((this.m_C) & ((~((1) << (4)))))) & 0xff);
                    break;
                  }
                case 162:
                  {
                    this.m_D = ((((this.m_D) & ((~((1) << (4)))))) & 0xff);
                    break;
                  }
                case 163:
                  {
                    this.m_E = ((((this.m_E) & ((~((1) << (4)))))) & 0xff);
                    break;
                  }
                case 164:
                  {
                    this.m_H = ((((this.m_H) & ((~((1) << (4)))))) & 0xff);
                    break;
                  }
                case 165:
                  {
                    this.m_L = ((((this.m_L) & ((~((1) << (4)))))) & 0xff);
                    break;
                  }
                case 166:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) & ((~((1) << (4)))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 167:
                  {
                    this.m_A = ((((this.m_A) & ((~((1) << (4)))))) & 0xff);
                    break;
                  }
                case 168:
                  {
                    this.m_B = ((((this.m_B) & ((~((1) << (5)))))) & 0xff);
                    break;
                  }
                case 169:
                  {
                    this.m_C = ((((this.m_C) & ((~((1) << (5)))))) & 0xff);
                    break;
                  }
                case 170:
                  {
                    this.m_D = ((((this.m_D) & ((~((1) << (5)))))) & 0xff);
                    break;
                  }
                case 171:
                  {
                    this.m_E = ((((this.m_E) & ((~((1) << (5)))))) & 0xff);
                    break;
                  }
                case 172:
                  {
                    this.m_H = ((((this.m_H) & ((~((1) << (5)))))) & 0xff);
                    break;
                  }
                case 173:
                  {
                    this.m_L = ((((this.m_L) & ((~((1) << (5)))))) & 0xff);
                    break;
                  }
                case 174:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) & ((~((1) << (5)))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 175:
                  {
                    this.m_A = ((((this.m_A) & ((~((1) << (5)))))) & 0xff);
                    break;
                  }
                case 176:
                  {
                    this.m_B = ((((this.m_B) & ((~((1) << (6)))))) & 0xff);
                    break;
                  }
                case 177:
                  {
                    this.m_C = ((((this.m_C) & ((~((1) << (6)))))) & 0xff);
                    break;
                  }
                case 178:
                  {
                    this.m_D = ((((this.m_D) & ((~((1) << (6)))))) & 0xff);
                    break;
                  }
                case 179:
                  {
                    this.m_E = ((((this.m_E) & ((~((1) << (6)))))) & 0xff);
                    break;
                  }
                case 180:
                  {
                    this.m_H = ((((this.m_H) & ((~((1) << (6)))))) & 0xff);
                    break;
                  }
                case 181:
                  {
                    this.m_L = ((((this.m_L) & ((~((1) << (6)))))) & 0xff);
                    break;
                  }
                case 182:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) & ((~((1) << (6)))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 183:
                  {
                    this.m_A = ((((this.m_A) & ((~((1) << (6)))))) & 0xff);
                    break;
                  }
                case 184:
                  {
                    this.m_B = ((((this.m_B) & ((~((1) << (7)))))) & 0xff);
                    break;
                  }
                case 185:
                  {
                    this.m_C = ((((this.m_C) & ((~((1) << (7)))))) & 0xff);
                    break;
                  }
                case 186:
                  {
                    this.m_D = ((((this.m_D) & ((~((1) << (7)))))) & 0xff);
                    break;
                  }
                case 187:
                  {
                    this.m_E = ((((this.m_E) & ((~((1) << (7)))))) & 0xff);
                    break;
                  }
                case 188:
                  {
                    this.m_H = ((((this.m_H) & ((~((1) << (7)))))) & 0xff);
                    break;
                  }
                case 189:
                  {
                    this.m_L = ((((this.m_L) & ((~((1) << (7)))))) & 0xff);
                    break;
                  }
                case 190:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) & ((~((1) << (7)))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 191:
                  {
                    this.m_A = ((((this.m_A) & ((~((1) << (7)))))) & 0xff);
                    break;
                  }
                case 192:
                  {
                    this.m_B = ((((this.m_B) | (((1) << (0))))) & 0xff);
                    break;
                  }
                case 193:
                  {
                    this.m_C = ((((this.m_C) | (((1) << (0))))) & 0xff);
                    break;
                  }
                case 194:
                  {
                    this.m_D = ((((this.m_D) | (((1) << (0))))) & 0xff);
                    break;
                  }
                case 195:
                  {
                    this.m_E = ((((this.m_E) | (((1) << (0))))) & 0xff);
                    break;
                  }
                case 196:
                  {
                    this.m_H = ((((this.m_H) | (((1) << (0))))) & 0xff);
                    break;
                  }
                case 197:
                  {
                    this.m_L = ((((this.m_L) | (((1) << (0))))) & 0xff);
                    break;
                  }
                case 198:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) | (((1) << (0))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 199:
                  {
                    this.m_A = ((((this.m_A) | (((1) << (0))))) & 0xff);
                    break;
                  }
                case 200:
                  {
                    this.m_B = ((((this.m_B) | (((1) << (1))))) & 0xff);
                    break;
                  }
                case 201:
                  {
                    this.m_C = ((((this.m_C) | (((1) << (1))))) & 0xff);
                    break;
                  }
                case 202:
                  {
                    this.m_D = ((((this.m_D) | (((1) << (1))))) & 0xff);
                    break;
                  }
                case 203:
                  {
                    this.m_E = ((((this.m_E) | (((1) << (1))))) & 0xff);
                    break;
                  }
                case 204:
                  {
                    this.m_H = ((((this.m_H) | (((1) << (1))))) & 0xff);
                    break;
                  }
                case 205:
                  {
                    this.m_L = ((((this.m_L) | (((1) << (1))))) & 0xff);
                    break;
                  }
                case 206:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) | (((1) << (1))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 207:
                  {
                    this.m_A = ((((this.m_A) | (((1) << (1))))) & 0xff);
                    break;
                  }
                case 208:
                  {
                    this.m_B = ((((this.m_B) | (((1) << (2))))) & 0xff);
                    break;
                  }
                case 209:
                  {
                    this.m_C = ((((this.m_C) | (((1) << (2))))) & 0xff);
                    break;
                  }
                case 210:
                  {
                    this.m_D = ((((this.m_D) | (((1) << (2))))) & 0xff);
                    break;
                  }
                case 211:
                  {
                    this.m_E = ((((this.m_E) | (((1) << (2))))) & 0xff);
                    break;
                  }
                case 212:
                  {
                    this.m_H = ((((this.m_H) | (((1) << (2))))) & 0xff);
                    break;
                  }
                case 213:
                  {
                    this.m_L = ((((this.m_L) | (((1) << (2))))) & 0xff);
                    break;
                  }
                case 214:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) | (((1) << (2))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 215:
                  {
                    this.m_A = ((((this.m_A) | (((1) << (2))))) & 0xff);
                    break;
                  }
                case 216:
                  {
                    this.m_B = ((((this.m_B) | (((1) << (3))))) & 0xff);
                    break;
                  }
                case 217:
                  {
                    this.m_C = ((((this.m_C) | (((1) << (3))))) & 0xff);
                    break;
                  }
                case 218:
                  {
                    this.m_D = ((((this.m_D) | (((1) << (3))))) & 0xff);
                    break;
                  }
                case 219:
                  {
                    this.m_E = ((((this.m_E) | (((1) << (3))))) & 0xff);
                    break;
                  }
                case 220:
                  {
                    this.m_H = ((((this.m_H) | (((1) << (3))))) & 0xff);
                    break;
                  }
                case 221:
                  {
                    this.m_L = ((((this.m_L) | (((1) << (3))))) & 0xff);
                    break;
                  }
                case 222:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) | (((1) << (3))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 223:
                  {
                    this.m_A = ((((this.m_A) | (((1) << (3))))) & 0xff);
                    break;
                  }
                case 224:
                  {
                    this.m_B = ((((this.m_B) | (((1) << (4))))) & 0xff);
                    break;
                  }
                case 225:
                  {
                    this.m_C = ((((this.m_C) | (((1) << (4))))) & 0xff);
                    break;
                  }
                case 226:
                  {
                    this.m_D = ((((this.m_D) | (((1) << (4))))) & 0xff);
                    break;
                  }
                case 227:
                  {
                    this.m_E = ((((this.m_E) | (((1) << (4))))) & 0xff);
                    break;
                  }
                case 228:
                  {
                    this.m_H = ((((this.m_H) | (((1) << (4))))) & 0xff);
                    break;
                  }
                case 229:
                  {
                    this.m_L = ((((this.m_L) | (((1) << (4))))) & 0xff);
                    break;
                  }
                case 230:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) | (((1) << (4))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 231:
                  {
                    this.m_A = ((((this.m_A) | (((1) << (4))))) & 0xff);
                    break;
                  }
                case 232:
                  {
                    this.m_B = ((((this.m_B) | (((1) << (5))))) & 0xff);
                    break;
                  }
                case 233:
                  {
                    this.m_C = ((((this.m_C) | (((1) << (5))))) & 0xff);
                    break;
                  }
                case 234:
                  {
                    this.m_D = ((((this.m_D) | (((1) << (5))))) & 0xff);
                    break;
                  }
                case 235:
                  {
                    this.m_E = ((((this.m_E) | (((1) << (5))))) & 0xff);
                    break;
                  }
                case 236:
                  {
                    this.m_H = ((((this.m_H) | (((1) << (5))))) & 0xff);
                    break;
                  }
                case 237:
                  {
                    this.m_L = ((((this.m_L) | (((1) << (5))))) & 0xff);
                    break;
                  }
                case 238:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) | (((1) << (5))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 239:
                  {
                    this.m_A = ((((this.m_A) | (((1) << (5))))) & 0xff);
                    break;
                  }
                case 240:
                  {
                    this.m_B = ((((this.m_B) | (((1) << (6))))) & 0xff);
                    break;
                  }
                case 241:
                  {
                    this.m_C = ((((this.m_C) | (((1) << (6))))) & 0xff);
                    break;
                  }
                case 242:
                  {
                    this.m_D = ((((this.m_D) | (((1) << (6))))) & 0xff);
                    break;
                  }
                case 243:
                  {
                    this.m_E = ((((this.m_E) | (((1) << (6))))) & 0xff);
                    break;
                  }
                case 244:
                  {
                    this.m_H = ((((this.m_H) | (((1) << (6))))) & 0xff);
                    break;
                  }
                case 245:
                  {
                    this.m_L = ((((this.m_L) | (((1) << (6))))) & 0xff);
                    break;
                  }
                case 246:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) | (((1) << (6))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 247:
                  {
                    this.m_A = ((((this.m_A) | (((1) << (6))))) & 0xff);
                    break;
                  }
                case 248:
                  {
                    this.m_B = ((((this.m_B) | (((1) << (7))))) & 0xff);
                    break;
                  }
                case 249:
                  {
                    this.m_C = ((((this.m_C) | (((1) << (7))))) & 0xff);
                    break;
                  }
                case 250:
                  {
                    this.m_D = ((((this.m_D) | (((1) << (7))))) & 0xff);
                    break;
                  }
                case 251:
                  {
                    this.m_E = ((((this.m_E) | (((1) << (7))))) & 0xff);
                    break;
                  }
                case 252:
                  {
                    this.m_H = ((((this.m_H) | (((1) << (7))))) & 0xff);
                    break;
                  }
                case 253:
                  {
                    this.m_L = ((((this.m_L) | (((1) << (7))))) & 0xff);
                    break;
                  }
                case 254:
                  {
                    let addr = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
                    x = ((this.method_mem_read_byte(addr)) & 0xff);
                    x = ((((x) | (((1) << (7))))) & 0xff);
                    this.method_mem_write_byte(addr, x);
                    break;
                  }
                case 255:
                  {
                    this.m_A = ((((this.m_A) | (((1) << (7))))) & 0xff);
                    break;
                  }
              }
              break;
            }
          case 204:
            {
              let addr = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              if (((this.m_F) & (128))) {
                this.method_cycles_passed(4);
                this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
                this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
                this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
                this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
                this.m_PC = ((addr) & 0xffff);
              }
              break;
            }
          case 205:
            {
              let addr = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
              this.m_PC = ((addr) & 0xffff);
              break;
            }
          case 206:
            {
              x = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) + (((x) & (15))))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) + (x))) + (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              if (((Number((this.m_A = ((((r2) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                f = ((128) & 0xff);
              } else {
                f = ((0) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 207:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
              this.m_PC = ((8) & 0xffff);
              break;
            }
          case 208:
            {
              this.method_cycles_passed(4);
              if (((((this.m_F) & (16))) ? 0 : 1)) {
                this.m_PC = ((this.method_mem_read_word(this.m_SP)) & 0xffff);
                this.m_SP = ((((this.m_SP) + (2))) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 209:
            {
              this.m_E = ((this.method_mem_read_byte(((() => { const previous = this.m_SP; this.m_SP = ((((this.m_SP) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.m_D = ((this.method_mem_read_byte(((() => { const previous = this.m_SP; this.m_SP = ((((this.m_SP) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 210:
            {
              let addr = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              if (((((this.m_F) & (16))) ? 0 : 1)) {
                this.m_PC = ((addr) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 212:
            {
              let addr = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              if (((((this.m_F) & (16))) ? 0 : 1)) {
                this.method_cycles_passed(4);
                this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
                this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
                this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
                this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
                this.m_PC = ((addr) & 0xffff);
              }
              break;
            }
          case 213:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, this.m_D);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, this.m_E);
              break;
            }
          case 214:
            {
              x = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((x) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (x))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 215:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
              this.m_PC = ((16) & 0xffff);
              break;
            }
          case 216:
            {
              this.method_cycles_passed(4);
              if (((this.m_F) & (16))) {
                this.m_PC = ((this.method_mem_read_word(this.m_SP)) & 0xffff);
                this.m_SP = ((((this.m_SP) + (2))) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 217:
            {
              this.m_PC = ((this.method_mem_read_word(this.m_SP)) & 0xffff);
              this.m_SP = ((((this.m_SP) + (2))) & 0xffff);
              this.m_enable = ((((this.m_enable) | (1))) >>> 0);
              this.method_cycles_passed(4);
              break;
            }
          case 218:
            {
              let addr = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              if (((this.m_F) & (16))) {
                this.m_PC = ((addr) & 0xffff);
                this.method_cycles_passed(4);
              }
              break;
            }
          case 220:
            {
              let addr = ((this.method_mem_read_word(this.m_PC)) & 0xffff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              if (((this.m_F) & (16))) {
                this.method_cycles_passed(4);
                this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
                this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
                this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
                this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
                this.m_PC = ((addr) & 0xffff);
              }
              break;
            }
          case 222:
            {
              x = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((((this.m_A) & (15))) - (((x) & (15))))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              r2 = ((((((((this.m_A) - (x))) - (((((this.m_F) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
              this.m_A = ((((r2) & 0xff)) & 0xff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 223:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
              this.m_PC = ((24) & 0xffff);
              break;
            }
          case 224:
            {
              let v = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.method_mem_write_byte(((65280) + (v)), this.m_A);
              break;
            }
          case 225:
            {
              this.m_L = ((this.method_mem_read_byte(((() => { const previous = this.m_SP; this.m_SP = ((((this.m_SP) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.m_H = ((this.method_mem_read_byte(((() => { const previous = this.m_SP; this.m_SP = ((((this.m_SP) + (1))) & 0xffff); return previous; })()))) & 0xff);
              break;
            }
          case 226:
            {
              this.method_mem_write_byte(((65280) + (this.m_C)), this.m_A);
              break;
            }
          case 229:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, this.m_H);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, this.m_L);
              break;
            }
          case 230:
            {
              x = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              if (((Number((this.m_A = ((((this.m_A) & (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((((32) | (128))) & 0xff);
              } else {
                this.m_F = ((32) & 0xff);
              }
              break;
            }
          case 231:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
              this.m_PC = ((32) & 0xffff);
              break;
            }
          case 232:
            {
              let n = 0;
              n = (((((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) << 24) >> 24)) | 0);
              if (((Number(((((this.m_SP) & (255))) + (((((n) & (255))) & 0xff)))) > Number(255)) ? 1 : 0)) {
                this.m_F = ((16) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              if (((Number(((((this.m_SP) & (15))) + (((n) & (15))))) > Number(15)) ? 1 : 0)) {
                this.m_F = ((((this.m_F) | (32))) & 0xff);
              }
              this.m_SP = ((((((this.m_SP) + (n))) & 0xffff)) & 0xffff);
              this.method_cycles_passed(8);
              break;
            }
          case 233:
            {
              this.m_PC = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              break;
            }
          case 234:
            {
              this.method_mem_write_byte(this.method_mem_read_word(this.m_PC), this.m_A);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              break;
            }
          case 238:
            {
              x = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              if (((Number((this.m_A = ((((this.m_A) ^ (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 239:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
              this.m_PC = ((40) & 0xffff);
              break;
            }
          case 240:
            {
              let v = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.m_A = ((this.method_mem_read_byte(((65280) + (v)))) & 0xff);
              break;
            }
          case 241:
            {
              this.m_F = ((this.method_mem_read_byte(((() => { const previous = this.m_SP; this.m_SP = ((((this.m_SP) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.m_A = ((this.method_mem_read_byte(((() => { const previous = this.m_SP; this.m_SP = ((((this.m_SP) + (1))) & 0xffff); return previous; })()))) & 0xff);
              this.m_F = ((((this.m_F) & (240))) & 0xff);
              break;
            }
          case 242:
            {
              this.m_A = ((this.method_mem_read_byte(((65280) + (this.m_C)))) & 0xff);
              break;
            }
          case 243:
            {
              this.m_handle_ei_delay = ((0) ? 1 : 0);
              this.m_enable = ((((this.m_enable) & ((~1)))) >>> 0);
              break;
            }
          case 245:
            {
              this.method_cycles_passed(4);
              this.m_F = ((((this.m_F) & (240))) & 0xff);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, this.m_A);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, this.m_F);
              break;
            }
          case 246:
            {
              x = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              if (((Number((this.m_A = ((((this.m_A) | (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                this.m_F = ((128) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              break;
            }
          case 247:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
              this.m_PC = ((48) & 0xffff);
              break;
            }
          case 248:
            {
              let n = 0;
              n = (((((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) << 24) >> 24)) | 0);
              if (((Number(((((this.m_SP) & (255))) + (((((n) & (255))) & 0xff)))) > Number(255)) ? 1 : 0)) {
                this.m_F = ((16) & 0xff);
              } else {
                this.m_F = ((0) & 0xff);
              }
              if (((Number(((((this.m_SP) & (15))) + (((n) & (15))))) > Number(15)) ? 1 : 0)) {
                this.m_F = ((((this.m_F) | (32))) & 0xff);
              }
              let res = ((((this.m_SP) + (n))) & 0xffff);
              this.m_L = ((((res) & (255))) & 0xff);
              this.m_H = ((((res) >>> (8))) & 0xff);
              this.method_cycles_passed(4);
              break;
            }
          case 249:
            {
              this.m_SP = ((((((this.m_H) << (8))) | (this.m_L))) & 0xffff);
              this.method_cycles_passed(4);
              break;
            }
          case 250:
            {
              this.m_A = ((this.method_mem_read_byte(this.method_mem_read_word(this.m_PC))) & 0xff);
              this.m_PC = ((((this.m_PC) + (2))) & 0xffff);
              break;
            }
          case 251:
            {
              this.m_enable = ((((this.m_enable) | (1))) >>> 0);
              this.m_handle_ei_delay = ((1) ? 1 : 0);
              break;
            }
          case 254:
            {
              x = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
              let r1 = 0;
              let r2 = 0;
              let f = 0;
              r1 = ((((((((this.m_A) & (15))) - (((x) & (15))))) & 0xffff)) & 0xffff);
              r2 = ((((((this.m_A) - (x))) & 0xffff)) & 0xffff);
              if (((Number(((r2) & 0xff)) === Number(0)) ? 1 : 0)) {
                f = ((((64) | (128))) & 0xff);
              } else {
                f = ((64) & 0xff);
              }
              if (((Number(r2) > Number(255)) ? 1 : 0)) {
                f = ((((f) | (16))) & 0xff);
              }
              if (((Number(r1) > Number(15)) ? 1 : 0)) {
                f = ((((f) | (32))) & 0xff);
              }
              this.m_F = ((f) & 0xff);
              break;
            }
          case 255:
            {
              this.method_cycles_passed(4);
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) >>> (8)));
              this.m_SP = ((((this.m_SP) - (1))) & 0xffff);
              this.method_mem_write_byte(this.m_SP, ((this.m_PC) & (255)));
              this.m_PC = ((56) & 0xffff);
              break;
            }
          default:
            {
              0;
              break;
            }
        }
      } else {
        let was_halted = ((((this.m_enable) & (2))) ? 1 : 0);
        this.method_check_interrupts();
        if (((this.m_enable) & (2))) {
          0;
          this.method_cycles_passed(((this.m_has_halt_bug) ? (2) : (4)));
          this.m_execution_state = ((1) >>> 0);
          this.m_entering_halt = ((0) ? 1 : 0);
        } else {
          0;
          if (was_halted) {
            this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
          } else {
            this.m_op = ((this.method_mem_read_byte(((() => { const previous = this.m_PC; this.m_PC = ((((this.m_PC) + (1))) & 0xffff); return previous; })()))) & 0xff);
          }
        }
      }
      this.m_execution_state = ((((this.m_execution_state) ^ (1))) >>> 0);
    }
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
      case "SP": return this.SP;
      case "A": return this.A;
      case "F": return this.F;
      case "B": return this.B;
      case "C": return this.C;
      case "D": return this.D;
      case "E": return this.E;
      case "H": return this.H;
      case "L": return this.L;
      case "IRQ": return this.IRQ;
      case "IE": return this.IE;
      case "IF": return this.IF;
      case "GENPC": return this.GENPC;
      case "CURPC": return this.CURPC;
      case "GENFLAGS": return this.GENFLAGS;
      case "m_A": return this.m_A;
      case "m_B": return this.m_B;
      case "m_C": return this.m_C;
      case "m_D": return this.m_D;
      case "m_dma_cycles_to_burn": return this.m_dma_cycles_to_burn;
      case "m_E": return this.m_E;
      case "m_enable": return this.m_enable;
      case "m_entering_halt": return this.m_entering_halt;
      case "m_execution_state": return this.m_execution_state;
      case "m_F": return this.m_F;
      case "m_gb_speed": return this.m_gb_speed;
      case "m_gb_speed_change_pending": return this.m_gb_speed_change_pending;
      case "m_H": return this.m_H;
      case "m_handle_ei_delay": return this.m_handle_ei_delay;
      case "m_has_halt_bug": return this.m_has_halt_bug;
      case "m_icount": return this.m_icount;
      case "m_IE": return this.m_IE;
      case "m_IF": return this.m_IF;
      case "m_irq_state": return this.m_irq_state;
      case "m_L": return this.m_L;
      case "m_op": return this.m_op;
      case "m_PC": return this.m_PC;
      case "m_SP": return this.m_SP;
      default: return 0;
    }
  }

  /** MAME device_state_interface::state_int, by the CPU's own state index. */
  stateInt(index: number): number {
    switch (index) {
      case 16: return this.C; // FLAG_C
      case 32: return this.H; // FLAG_H
      case 1: return this.PC; // LR35902_PC
      case 2: return this.SP; // LR35902_SP
      case 3: return this.A; // LR35902_A
      case 4: return this.F; // LR35902_F
      case 5: return this.B; // LR35902_B
      case 6: return this.C; // LR35902_C
      case 7: return this.D; // LR35902_D
      case 8: return this.E; // LR35902_E
      case 9: return this.H; // LR35902_H
      case 10: return this.L; // LR35902_L
      case 12: return this.IE; // LR35902_IE
      case 13: return this.IF; // LR35902_IF
      default: return 0;
    }
  }

  set(name: string, value: number): void {
    switch (name) {
      case "PC": this.PC = ((value) & 0xffff); return;
      case "SP": this.SP = ((value) & 0xffff); return;
      case "A": this.A = ((value) & 0xff); return;
      case "F": this.F = ((value) & 0xff); return;
      case "B": this.B = ((value) & 0xff); return;
      case "C": this.C = ((value) & 0xff); return;
      case "D": this.D = ((value) & 0xff); return;
      case "E": this.E = ((value) & 0xff); return;
      case "H": this.H = ((value) & 0xff); return;
      case "L": this.L = ((value) & 0xff); return;
      case "IRQ": this.IRQ = ((value) >>> 0); return;
      case "IE": this.IE = ((value) & 0xff); return;
      case "IF": this.IF = ((value) & 0xff); return;
      case "GENPC": this.GENPC = ((value) & 0xffff); return;
      case "CURPC": this.CURPC = ((value) & 0xffff); return;
      case "GENFLAGS": this.GENFLAGS = ((value) & 0xff); return;
      case "m_A": this.m_A = ((value) & 0xff); return;
      case "m_B": this.m_B = ((value) & 0xff); return;
      case "m_C": this.m_C = ((value) & 0xff); return;
      case "m_D": this.m_D = ((value) & 0xff); return;
      case "m_dma_cycles_to_burn": this.m_dma_cycles_to_burn = ((value) >>> 0); return;
      case "m_E": this.m_E = ((value) & 0xff); return;
      case "m_enable": this.m_enable = ((value) >>> 0); return;
      case "m_entering_halt": this.m_entering_halt = ((value) ? 1 : 0); return;
      case "m_execution_state": this.m_execution_state = ((value) >>> 0); return;
      case "m_F": this.m_F = ((value) & 0xff); return;
      case "m_gb_speed": this.m_gb_speed = ((value) >>> 0); return;
      case "m_gb_speed_change_pending": this.m_gb_speed_change_pending = ((value) >>> 0); return;
      case "m_H": this.m_H = ((value) & 0xff); return;
      case "m_handle_ei_delay": this.m_handle_ei_delay = ((value) ? 1 : 0); return;
      case "m_has_halt_bug": this.m_has_halt_bug = ((value) ? 1 : 0); return;
      case "m_icount": this.m_icount = value; return;
      case "m_IE": this.m_IE = ((value) & 0xff); return;
      case "m_IF": this.m_IF = ((value) & 0xff); return;
      case "m_irq_state": this.m_irq_state = ((value) >>> 0); return;
      case "m_L": this.m_L = ((value) & 0xff); return;
      case "m_op": this.m_op = ((value) & 0xff); return;
      case "m_PC": this.m_PC = ((value) & 0xffff); return;
      case "m_SP": this.m_SP = ((value) & 0xffff); return;
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
      case "cycles_passed": return this.method_cycles_passed(args[0] ?? 0);
      case "mem_read_byte": return this.method_mem_read_byte(args[0] ?? 0);
      case "mem_write_byte": return this.method_mem_write_byte(args[0] ?? 0, args[1] ?? 0);
      case "mem_read_word": return this.method_mem_read_word(args[0] ?? 0);
      case "mem_write_word": return this.method_mem_write_word(args[0] ?? 0, args[1] ?? 0);
      case "check_interrupts": return this.method_check_interrupts();
      case "execute_set_input": return this.method_execute_set_input(args[0] ?? 0, args[1] ?? 0);
      case "get_speed": return this.method_get_speed();
      case "set_speed": return this.method_set_speed(args[0] ?? 0);
      case "set_halt_bug": return this.method_set_halt_bug(args[0] ?? 0);
      case "get_ie": return this.method_get_ie();
      case "set_ie": return this.method_set_ie(args[0] ?? 0);
      case "get_if": return this.method_get_if();
      case "set_if": return this.method_set_if(args[0] ?? 0);
      case "dma_cycles_to_burn": return this.method_dma_cycles_to_burn(args[0] ?? 0);
      default: throw new Error('LR35902 has no generated method "' + name + '"');
    }
  }

  private generatedStart(): void {

  }

  private generatedInput(inputnum: number, state: number): void {
    this.m_irq_state = ((state) >>> 0);
    if (((Number(state) === Number(1)) ? 1 : 0)) {
      this.m_IF = ((((this.m_IF) | (((1) << (inputnum))))) & 0xff);
    } else {
      this.m_IF = ((((this.m_IF) & ((~((1) << (inputnum)))))) & 0xff);
    }
  }

  private generatedService(): void {

  }

  private generatedFetch(): void {

  }

  private method_cycles_passed(cycles: number = 0): number {
    this.m_icount = ((this.m_icount) - (Math.trunc((cycles) / (this.m_gb_speed))));
    (this.bus.signal?.("timer_cb", cycles) ?? 0);
    return 0;
  }

  private method_mem_read_byte(addr: number = 0): number {
    let data = (((this.readMemory((addr) & 0xffff) & 0xff)) & 0xff);
    this.method_cycles_passed(4);
    return data;
    return 0;
  }

  private method_mem_write_byte(addr: number = 0, data: number = 0): number {
    (this.writeMemory((addr) & 0xffff, (data) & 0xff), 0);
    this.method_cycles_passed(4);
    return 0;
  }

  private method_mem_read_word(addr: number = 0): number {
    let data = ((this.method_mem_read_byte(addr)) & 0xffff);
    data = ((((data) | (((this.method_mem_read_byte(((addr) + (1)))) << (8))))) & 0xffff);
    return data;
    return 0;
  }

  private method_mem_write_word(addr: number = 0, data: number = 0): number {
    this.method_mem_write_byte(addr, ((data) & (255)));
    this.method_mem_write_byte(((addr) + (1)), ((data) >>> (8)));
    return 0;
  }

  private method_check_interrupts(): number {
    let irq = ((((this.m_IE) & (this.m_IF))) & 0xff);
    if (this.m_handle_ei_delay) {
      this.m_handle_ei_delay = ((0) ? 1 : 0);
      return 0;
    }
    if (irq) {
      let irqline = ((0) | 0);
      let was_halted = ((((this.m_enable) & (2))) ? 1 : 0);
      for (; ((Number(irqline) < Number(5)) ? 1 : 0); irqline = ((((irqline) + (1))) | 0)) {
        if (((irq) & (((1) << (irqline))))) {
          if (((this.m_enable) & (2))) {
            this.m_enable = ((((this.m_enable) & ((~2)))) >>> 0);
            this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
            if (this.m_has_halt_bug) {
              if (((((this.m_enable) & (1))) ? 0 : 1)) {
                this.m_PC = ((((this.m_PC) - (1))) & 0xffff);
              }
              if (((((((((Number(irqline) === Number(1)) ? 1 : 0)) && (((((this.m_IF) & (1))) ? 0 : 1))) ? 1 : 0)) || (((Number(irqline) === Number(2)) ? 1 : 0))) ? 1 : 0)) {
                this.method_cycles_passed(4);
                if (((Number(irqline) === Number(2)) ? 1 : 0)) {
                  this.method_cycles_passed(2);
                }
              }
            } else {
              this.method_cycles_passed(4);
              if ((((((((this.m_enable) & (1))) ? 0 : 1)) && (((this.m_entering_halt) ? 0 : 1))) ? 1 : 0)) {
                this.method_cycles_passed(4);
              }
            }
          }
          if (((this.m_enable) & (1))) {
            this.m_enable = ((((this.m_enable) & ((~1)))) >>> 0);
            this.m_IF = ((((this.m_IF) & ((~((1) << (irqline)))))) & 0xff);
            this.method_cycles_passed(12);
            this.m_SP = ((((this.m_SP) - (2))) & 0xffff);
            this.method_mem_write_word(this.m_SP, this.m_PC);
            this.m_PC = ((((64) + (((irqline) * (8))))) & 0xffff);
            if (was_halted) {
              this.m_op = ((this.method_mem_read_byte(this.m_PC)) & 0xff);
            }
            return 0;
          }
        }
      }
    }
    return 0;
  }

  private method_execute_set_input(inptnum: number = 0, state: number = 0): number {
    this.m_irq_state = ((state) >>> 0);
    if (((Number(state) === Number(1)) ? 1 : 0)) {
      this.m_IF = ((((this.m_IF) | (((1) << (inptnum))))) & 0xff);
    } else {
      this.m_IF = ((((this.m_IF) & ((~((1) << (inptnum)))))) & 0xff);
    }
    return 0;
  }

  private method_get_speed(): number {
    return ((((126) | (((((this.m_gb_speed) - (1))) << (7))))) | (this.m_gb_speed_change_pending));
    return 0;
  }

  private method_set_speed(speed_request: number = 0): number {
    this.m_gb_speed_change_pending = ((((speed_request) & (1))) >>> 0);
    return 0;
  }

  private method_set_halt_bug(has_halt_bug: number = 0): number {
    this.m_has_halt_bug = ((has_halt_bug) ? 1 : 0);
    return 0;
  }

  private method_get_ie(): number {
    return this.m_IE;
    return 0;
  }

  private method_set_ie(data: number = 0): number {
    this.m_IE = ((data) & 0xff);
    return 0;
  }

  private method_get_if(): number {
    return this.m_IF;
    return 0;
  }

  private method_set_if(data: number = 0): number {
    this.m_IF = ((data) & 0xff);
    return 0;
  }

  private method_dma_cycles_to_burn(cycles_to_burn: number = 0): number {
    this.m_dma_cycles_to_burn = ((((this.m_dma_cycles_to_burn) + (cycles_to_burn))) >>> 0);
    return 0;
  }
}

export const cpu: GeneratedCpuExecutable = {
  type: "LR35902",
  summary: {"opcodes":256,"compiledOpcodes":256,"methods":15,"compiledMethods":15,"diagnostics":0},
  create: (bus: CpuBus): Cpu => new GeneratedLR35902(bus),
};

export default cpu;
