// GENERATED from MAME CPU source and opcode DSL; do not edit.
// Sources:
// - src/devices/cpu/m6502/m6502.cpp
// - src/devices/cpu/m6502/m6502.h
// - src/devices/cpu/m6502/rp2a03.cpp
// - src/devices/cpu/m6502/rp2a03.h
// - src/devices/cpu/m6502/om6502.lst
// - src/devices/cpu/m6502/orp2a03.lst
// - src/devices/cpu/m6502/drp2a03.lst
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
const GENERATED_METHOD_NAMES = new Set<string>(["do_adc_nd","do_arr_nd","do_sbc_nd","do_cmp","do_bit","do_asl","do_lsr","do_ror","do_rol","do_asr","set_nz","set_l","set_h","page_changing","dec_SP","inc_SP"]);

class GeneratedRP2A03 implements Cpu {
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
  private m_PPC = ((0) & 0xffff);
  private m_NPC = ((0) & 0xffff);
  private m_PC = ((0) & 0xffff);
  private m_SP = ((0) & 0xffff);
  private m_TMP = ((0) & 0xffff);
  private m_TMP2 = ((0) & 0xff);
  private m_A = ((0) & 0xff);
  private m_X = ((0) & 0xff);
  private m_Y = ((0) & 0xff);
  private m_P = ((0) & 0xff);
  private m_IR = ((0) & 0xff);
  private m_inst_state_base = 0;
  private m_nmi_state = ((0) ? 1 : 0);
  private m_irq_state = ((0) ? 1 : 0);
  private m_apu_irq_state = ((0) ? 1 : 0);
  private m_v_state = ((0) ? 1 : 0);
  private m_nmi_pending = ((0) ? 1 : 0);
  private m_irq_taken = ((0) ? 1 : 0);
  private m_inhibit_interrupts = ((0) ? 1 : 0);
  private m_ref = ((0) >>> 0);
  private cycles = 0;
  private m_icount = 0;


  constructor(bus: CpuBus) {
    this.bus = bus;
    this.generatedStart();
    this.reset();
  }

  reset(): void {
    this.resetInternal();
    (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
    (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
    (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff);
    this.method_dec_SP();
    (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff);
    this.method_dec_SP();
    (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff);
    this.method_dec_SP();
    this.m_P = ((((this.m_P) | (4))) & 0xff);
    this.m_PC = (((++this.cycles, this.readMemory((65532) & 65535) & 0xff)) & 0xffff);
    this.m_PC = ((this.method_set_h(this.m_PC, (++this.cycles, this.readMemory((65533) & 65535) & 0xff))) & 0xffff);
  }

  step(): number {
    this.cycles = 0;
    this.m_icount = 1;
    this.generatedService();
    if (this.cycles > 0) return this.cycles;
    this.generatedFetch();
    let dispatches = 0;
    while (true) {
      if (++dispatches > 8) throw new Error('RP2A03 dispatch loop exceeded 8');
      switch ((this.m_ref >>> 8) & 0xffff) {
      case 0x0000: {
        if (this.m_irq_taken) {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        } else {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
          this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        }
        (++this.cycles, this.writeMemory((this.m_SP) & 65535, (((this.m_PC) >>> (8))) & 0xff), 0);
        this.method_dec_SP();
        (++this.cycles, this.writeMemory((this.m_SP) & 65535, (this.m_PC) & 0xff), 0);
        this.method_dec_SP();
        (++this.cycles, this.writeMemory((this.m_SP) & 65535, (((this.m_irq_taken) ? (((this.m_P) & ((~16)))) : (this.m_P))) & 0xff), 0);
        this.method_dec_SP();
        if (this.m_nmi_pending) {
          this.acknowledgeIrq(-1);
          this.m_PC = (((++this.cycles, this.readMemory((65530) & 65535) & 0xff)) & 0xffff);
          this.m_PC = ((this.method_set_h(this.m_PC, (++this.cycles, this.readMemory((65531) & 65535) & 0xff))) & 0xffff);
          this.m_nmi_pending = ((0) ? 1 : 0);
        } else {
          if (this.m_irq_taken) {
            this.acknowledgeIrq(0);
          }
          this.m_PC = (((++this.cycles, this.readMemory((65534) & 65535) & 0xff)) & 0xffff);
          this.m_PC = ((this.method_set_h(this.m_PC, (++this.cycles, this.readMemory((65535) & 65535) & 0xff))) & 0xffff);
        }
        this.m_irq_taken = ((0) ? 1 : 0);
        this.m_P = ((((this.m_P) | (4))) & 0xff);
        return this.cycles;
      }
      case 0x0100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x0200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0x0300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x0400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x0500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x0600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x0700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x0800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        (++this.cycles, this.writeMemory((this.m_SP) & 65535, (this.m_P) & 0xff), 0);
        this.method_dec_SP();
        return this.cycles;
      }
      case 0x0900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = ((((this.m_A) | (this.m_TMP))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x0a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_A = ((this.method_do_asl(this.m_A)) & 0xff);
        return this.cycles;
      }
      case 0x0b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = ((((this.m_A) & (this.m_TMP))) & 0xff);
        this.method_set_nz(this.m_A);
        if (((this.m_A) & (128))) {
          this.m_P = ((((this.m_P) | (1))) & 0xff);
        } else {
          this.m_P = ((((this.m_P) & ((~1)))) & 0xff);
        }
        return this.cycles;
      }
      case 0x0c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x0d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x0e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x0f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x1000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (((((this.m_P) & (128))) ? 0 : 1)) {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
          if (this.method_page_changing(this.m_PC, (((this.m_TMP) << 24) >> 24))) {
            (++this.cycles, this.readMemory((this.method_set_l(this.m_PC, ((this.m_PC) + ((((this.m_TMP) << 24) >> 24))))) & 65535) & 0xff);
          }
          this.m_PC = ((((this.m_PC) + ((((this.m_TMP) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x1100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP2 = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x1200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0x1300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x1400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        (++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x1500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x1600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x1700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x1800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_P = ((((this.m_P) & ((~1)))) & 0xff);
        return this.cycles;
      }
      case 0x1900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x1a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x1b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x1c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        (++this.cycles, this.readMemory((((this.m_TMP) + (this.m_X))) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x1d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x1e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x1f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_asl(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) | (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x2000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff);
        (++this.cycles, this.writeMemory((this.m_SP) & 65535, (((this.m_PC) >>> (8))) & 0xff), 0);
        this.method_dec_SP();
        (++this.cycles, this.writeMemory((this.m_SP) & 65535, (this.m_PC) & 0xff), 0);
        this.method_dec_SP();
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((this.m_TMP) & 0xffff);
        return this.cycles;
      }
      case 0x2100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x2200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0x2300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x2400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_bit(this.m_TMP2);
        return this.cycles;
      }
      case 0x2500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x2600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x2700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x2800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff);
        this.method_inc_SP();
        this.m_TMP = (((((++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff)) | (((16) | (32))))) & 0xffff);
        this.m_P = ((this.m_TMP) & 0xff);
        return this.cycles;
      }
      case 0x2900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = ((((this.m_A) & (this.m_TMP))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x2a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_A = ((this.method_do_rol(this.m_A)) & 0xff);
        return this.cycles;
      }
      case 0x2b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = ((((this.m_A) & (this.m_TMP))) & 0xff);
        this.method_set_nz(this.m_A);
        if (((this.m_A) & (128))) {
          this.m_P = ((((this.m_P) | (1))) & 0xff);
        } else {
          this.m_P = ((((this.m_P) & ((~1)))) & 0xff);
        }
        return this.cycles;
      }
      case 0x2c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_bit(this.m_TMP2);
        return this.cycles;
      }
      case 0x2d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x2e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x2f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x3000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (((this.m_P) & (128))) {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
          if (this.method_page_changing(this.m_PC, (((this.m_TMP) << 24) >> 24))) {
            (++this.cycles, this.readMemory((this.method_set_l(this.m_PC, ((this.m_PC) + ((((this.m_TMP) << 24) >> 24))))) & 65535) & 0xff);
          }
          this.m_PC = ((((this.m_PC) + ((((this.m_TMP) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x3100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP2 = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x3200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0x3300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x3400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        (++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x3500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x3600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x3700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x3800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_P = ((((this.m_P) | (1))) & 0xff);
        return this.cycles;
      }
      case 0x3900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x3a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x3b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x3c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        (++this.cycles, this.readMemory((((this.m_TMP) + (this.m_X))) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x3d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x3e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x3f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_rol(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) & (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x4000: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff);
        this.method_inc_SP();
        this.m_P = (((((++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff)) | (((16) | (32))))) & 0xff);
        this.method_inc_SP();
        this.m_PC = (((++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff)) & 0xffff);
        this.method_inc_SP();
        this.m_PC = ((this.method_set_h(this.m_PC, (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff))) & 0xffff);
        return this.cycles;
      }
      case 0x4100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x4200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0x4300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x4400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x4500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x4600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x4700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x4800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        (++this.cycles, this.writeMemory((this.m_SP) & 65535, (this.m_A) & 0xff), 0);
        this.method_dec_SP();
        return this.cycles;
      }
      case 0x4900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = ((((this.m_A) ^ (this.m_TMP))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x4a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_A = ((this.method_do_lsr(this.m_A)) & 0xff);
        return this.cycles;
      }
      case 0x4b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = ((this.method_do_lsr(((this.m_A) & (this.m_TMP)))) & 0xff);
        return this.cycles;
      }
      case 0x4c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((this.m_TMP) & 0xffff);
        return this.cycles;
      }
      case 0x4d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x4e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x4f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x5000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (((((this.m_P) & (64))) ? 0 : 1)) {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
          if (this.method_page_changing(this.m_PC, (((this.m_TMP) << 24) >> 24))) {
            (++this.cycles, this.readMemory((this.method_set_l(this.m_PC, ((this.m_PC) + ((((this.m_TMP) << 24) >> 24))))) & 65535) & 0xff);
          }
          this.m_PC = ((((this.m_PC) + ((((this.m_TMP) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x5100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP2 = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x5200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0x5300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x5400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        (++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x5500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x5600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x5700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x5800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_P = ((((this.m_P) & ((~4)))) & 0xff);
        return this.cycles;
      }
      case 0x5900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x5a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x5b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x5c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        (++this.cycles, this.readMemory((((this.m_TMP) + (this.m_X))) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x5d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x5e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x5f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_lsr(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_A = ((((this.m_A) ^ (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x6000: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff);
        this.method_inc_SP();
        this.m_PC = (((++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff)) & 0xffff);
        this.method_inc_SP();
        this.m_PC = ((this.method_set_h(this.m_PC, (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        return this.cycles;
      }
      case 0x6100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x6200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0x6300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x6400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x6500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x6600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x6700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x6800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        (++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff);
        this.method_inc_SP();
        this.m_A = (((++this.cycles, this.readMemory((this.m_SP) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x6900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_do_adc_nd(this.m_TMP);
        return this.cycles;
      }
      case 0x6a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_A = ((this.method_do_ror(this.m_A)) & 0xff);
        return this.cycles;
      }
      case 0x6b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_A = ((((this.m_A) & (this.m_TMP))) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_do_arr_nd();
        return this.cycles;
      }
      case 0x6c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_PC = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((this.method_set_h(this.m_PC, (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (1)))) & 65535) & 0xff))) & 0xffff);
        return this.cycles;
      }
      case 0x6d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x6e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x6f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x7000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (((this.m_P) & (64))) {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
          if (this.method_page_changing(this.m_PC, (((this.m_TMP) << 24) >> 24))) {
            (++this.cycles, this.readMemory((this.method_set_l(this.m_PC, ((this.m_PC) + ((((this.m_TMP) << 24) >> 24))))) & 65535) & 0xff);
          }
          this.m_PC = ((((this.m_PC) + ((((this.m_TMP) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x7100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP2 = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x7200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0x7300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x7400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        (++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x7500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff)) & 0xff);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x7600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x7700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x7800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_P = ((((this.m_P) | (4))) & 0xff);
        return this.cycles;
      }
      case 0x7900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x7a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x7b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x7c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        (++this.cycles, this.readMemory((((this.m_TMP) + (this.m_X))) & 65535) & 0xff);
        return this.cycles;
      }
      case 0x7d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x7e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x7f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((this.method_do_ror(this.m_TMP2)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_adc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0x8000: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        return this.cycles;
      }
      case 0x8100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_A) & 0xff), 0);
        return this.cycles;
      }
      case 0x8200: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        return this.cycles;
      }
      case 0x8300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = ((((this.m_A) & (this.m_X))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x8400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_Y) & 0xff), 0);
        return this.cycles;
      }
      case 0x8500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_A) & 0xff), 0);
        return this.cycles;
      }
      case 0x8600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_X) & 0xff), 0);
        return this.cycles;
      }
      case 0x8700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = ((((this.m_A) & (this.m_X))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x8800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_Y = ((((this.m_Y) - (1))) & 0xff);
        this.method_set_nz(this.m_Y);
        return this.cycles;
      }
      case 0x8900: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        return this.cycles;
      }
      case 0x8a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_A = ((this.m_X) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x8b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = ((((this.m_A) & (((this.m_TMP) & (this.m_X))))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x8c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_Y) & 0xff), 0);
        return this.cycles;
      }
      case 0x8d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_A) & 0xff), 0);
        return this.cycles;
      }
      case 0x8e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_X) & 0xff), 0);
        return this.cycles;
      }
      case 0x8f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = ((((this.m_A) & (this.m_X))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x9000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (((((this.m_P) & (1))) ? 0 : 1)) {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
          if (this.method_page_changing(this.m_PC, (((this.m_TMP) << 24) >> 24))) {
            (++this.cycles, this.readMemory((this.method_set_l(this.m_PC, ((this.m_PC) + ((((this.m_TMP) << 24) >> 24))))) & 65535) & 0xff);
          }
          this.m_PC = ((((this.m_PC) + ((((this.m_TMP) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x9100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        (++this.cycles, this.writeMemory((((this.m_TMP) + (this.m_Y))) & 65535, (this.m_A) & 0xff), 0);
        return this.cycles;
      }
      case 0x9200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0x9300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP2 = ((((((this.m_A) & (this.m_X))) & (((((this.m_TMP) >>> (8))) + (1))))) & 0xff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_Y)), this.m_TMP2)) & 0xffff);
        } else {
          this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        }
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x9400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        (++this.cycles, this.writeMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535, (this.m_Y) & 0xff), 0);
        return this.cycles;
      }
      case 0x9500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        (++this.cycles, this.writeMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535, (this.m_A) & 0xff), 0);
        return this.cycles;
      }
      case 0x9600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        (++this.cycles, this.writeMemory((((((this.m_TMP) + (this.m_Y))) & 0xff)) & 65535, (this.m_X) & 0xff), 0);
        return this.cycles;
      }
      case 0x9700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_Y))) & 0xff)) & 0xffff);
        this.m_TMP2 = ((((this.m_A) & (this.m_X))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x9800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_A = ((this.m_Y) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0x9900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        (++this.cycles, this.writeMemory((((this.m_TMP) + (this.m_Y))) & 65535, (this.m_A) & 0xff), 0);
        return this.cycles;
      }
      case 0x9a00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_SP = ((this.method_set_l(this.m_SP, this.m_X)) & 0xffff);
        return this.cycles;
      }
      case 0x9b00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_SP = ((this.method_set_l(this.m_SP, ((this.m_A) & (this.m_X)))) & 0xffff);
        this.m_TMP2 = ((((((this.m_A) & (this.m_X))) & (((((this.m_TMP) >>> (8))) + (1))))) & 0xff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_Y)), this.m_TMP2)) & 0xffff);
        } else {
          this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        }
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x9c00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_Y) & (((((this.m_TMP) >>> (8))) + (1))))) & 0xff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_X)), this.m_TMP2)) & 0xffff);
        } else {
          this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        }
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x9d00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        (++this.cycles, this.writeMemory((((this.m_TMP) + (this.m_X))) & 65535, (this.m_A) & 0xff), 0);
        return this.cycles;
      }
      case 0x9e00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_X) & (((((this.m_TMP) >>> (8))) + (1))))) & 0xff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_Y)), this.m_TMP2)) & 0xffff);
        } else {
          this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        }
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0x9f00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP2 = ((((((this.m_A) & (this.m_X))) & (((((this.m_TMP) >>> (8))) + (1))))) & 0xff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_Y)), this.m_TMP2)) & 0xffff);
        } else {
          this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        }
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0xa000: {
        this.m_Y = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_set_nz(this.m_Y);
        return this.cycles;
      }
      case 0xa100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_A = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xa200: {
        this.m_X = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xa300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_A = (((this.m_X = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xa400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_Y = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_Y);
        return this.cycles;
      }
      case 0xa500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xa600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_X = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xa700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = (((this.m_X = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xa800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_Y = ((this.m_A) & 0xff);
        this.method_set_nz(this.m_Y);
        return this.cycles;
      }
      case 0xa900: {
        this.m_A = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xaa00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_X = ((this.m_A) & 0xff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xab00: {
        this.m_A = (((this.m_X = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff))) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xac00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_Y = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_Y);
        return this.cycles;
      }
      case 0xad00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xae00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_X = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xaf00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_A = (((this.m_X = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xb000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (((this.m_P) & (1))) {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
          if (this.method_page_changing(this.m_PC, (((this.m_TMP) << 24) >> 24))) {
            (++this.cycles, this.readMemory((this.method_set_l(this.m_PC, ((this.m_PC) + ((((this.m_TMP) << 24) >> 24))))) & 65535) & 0xff);
          }
          this.m_PC = ((((this.m_PC) + ((((this.m_TMP) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0xb100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_A = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xb200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0xb300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_A = (((this.m_X = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xb400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_Y = (((++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_Y);
        return this.cycles;
      }
      case 0xb500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_A = (((++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xb600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_X = (((++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_Y))) & 0xff)) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xb700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_Y))) & 0xff)) & 0xffff);
        this.m_A = (((this.m_X = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xb800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_P = ((((this.m_P) & ((~64)))) & 0xff);
        return this.cycles;
      }
      case 0xb900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_A = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xba00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_X = ((this.m_SP) & 0xff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xbb00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP2 = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.m_A = ((((this.m_TMP2) | (81))) & 0xff);
        this.m_X = ((255) & 0xff);
        this.method_set_nz(this.m_TMP2);
        return this.cycles;
      }
      case 0xbc00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_Y = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_Y);
        return this.cycles;
      }
      case 0xbd00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        this.m_A = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_X))) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xbe00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_X = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xbf00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_A = (((this.m_X = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff))) & 0xff);
        this.method_set_nz(this.m_A);
        return this.cycles;
      }
      case 0xc000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_do_cmp(this.m_Y, this.m_TMP);
        return this.cycles;
      }
      case 0xc100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xc200: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        return this.cycles;
      }
      case 0xc300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xc400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_Y, this.m_TMP2);
        return this.cycles;
      }
      case 0xc500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xc600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        this.method_set_nz(this.m_TMP2);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0xc700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xc800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_Y = ((((this.m_Y) + (1))) & 0xff);
        this.method_set_nz(this.m_Y);
        return this.cycles;
      }
      case 0xc900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_do_cmp(this.m_A, this.m_TMP);
        return this.cycles;
      }
      case 0xca00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_X = ((((this.m_X) - (1))) & 0xff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xcb00: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_X = ((((this.m_X) & (this.m_A))) & 0xff);
        if (((Number(this.m_X) < Number(this.m_TMP2)) ? 1 : 0)) {
          this.m_P = ((((this.m_P) & ((~1)))) & 0xff);
        } else {
          this.m_P = ((((this.m_P) | (1))) & 0xff);
        }
        this.m_X = ((((this.m_X) - (this.m_TMP2))) & 0xff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xcc00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_Y, this.m_TMP2);
        return this.cycles;
      }
      case 0xcd00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xce00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        this.method_set_nz(this.m_TMP2);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0xcf00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xd000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (((((this.m_P) & (2))) ? 0 : 1)) {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
          if (this.method_page_changing(this.m_PC, (((this.m_TMP) << 24) >> 24))) {
            (++this.cycles, this.readMemory((this.method_set_l(this.m_PC, ((this.m_PC) + ((((this.m_TMP) << 24) >> 24))))) & 65535) & 0xff);
          }
          this.m_PC = ((((this.m_PC) + ((((this.m_TMP) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0xd100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP2 = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xd200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0xd300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xd400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        (++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff);
        return this.cycles;
      }
      case 0xd500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xd600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        this.method_set_nz(this.m_TMP2);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0xd700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xd800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_P = ((((this.m_P) & ((~8)))) & 0xff);
        return this.cycles;
      }
      case 0xd900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xda00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        return this.cycles;
      }
      case 0xdb00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xdc00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        (++this.cycles, this.readMemory((((this.m_TMP) + (this.m_X))) & 65535) & 0xff);
        return this.cycles;
      }
      case 0xdd00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xde00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        this.method_set_nz(this.m_TMP2);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0xdf00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) - (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_cmp(this.m_A, this.m_TMP2);
        return this.cycles;
      }
      case 0xe000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_do_cmp(this.m_X, this.m_TMP);
        return this.cycles;
      }
      case 0xe100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xe200: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        return this.cycles;
      }
      case 0xe300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff);
        this.m_TMP2 = ((((this.m_TMP2) + (this.m_X))) & 0xff);
        this.m_TMP = (((++this.cycles, this.readMemory((((this.m_TMP2) & (255))) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xe400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_X, this.m_TMP2);
        return this.cycles;
      }
      case 0xe500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xe600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        this.method_set_nz(this.m_TMP2);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0xe700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xe800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_X = ((((this.m_X) + (1))) & 0xff);
        this.method_set_nz(this.m_X);
        return this.cycles;
      }
      case 0xe900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_do_sbc_nd(this.m_TMP);
        return this.cycles;
      }
      case 0xea00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        return this.cycles;
      }
      case 0xeb00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.method_do_sbc_nd(this.m_TMP);
        return this.cycles;
      }
      case 0xec00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_cmp(this.m_X, this.m_TMP2);
        return this.cycles;
      }
      case 0xed00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xee00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        this.method_set_nz(this.m_TMP2);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0xef00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xf000: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (((this.m_P) & (2))) {
          (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
          if (this.method_page_changing(this.m_PC, (((this.m_TMP) << 24) >> 24))) {
            (++this.cycles, this.readMemory((this.method_set_l(this.m_PC, ((this.m_PC) + ((((this.m_TMP) << 24) >> 24))))) & 65535) & 0xff);
          }
          this.m_PC = ((((this.m_PC) + ((((this.m_TMP) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0xf100: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP2 = (((++this.cycles, this.readMemory((((this.m_TMP) + (this.m_Y))) & 65535) & 0xff)) & 0xff);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xf200: {
        (++this.cycles, this.readMemory((65535) & 65535) & 0xff);
        this.m_PC = ((this.m_PC) & 0xffff);
        return this.cycles;
      }
      case 0xf300: {
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_TMP2) & 65535) & 0xff)) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((((((this.m_TMP2) + (1))) & (255))) & 65535) & 0xff))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xf400: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        (++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff);
        return this.cycles;
      }
      case 0xf500: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((((((this.m_TMP) + (this.m_X))) & 0xff)) & 65535) & 0xff)) & 0xff);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xf600: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        this.method_set_nz(this.m_TMP2);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0xf700: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff);
        this.m_TMP = ((((((this.m_TMP) + (this.m_X))) & 0xff)) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xf800: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        this.m_P = ((((this.m_P) | (8))) & 0xff);
        return this.cycles;
      }
      case 0xf900: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_Y)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xfa00: {
        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
        return this.cycles;
      }
      case 0xfb00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_Y)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_Y))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xfc00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        (++this.cycles, this.readMemory((((this.m_TMP) + (this.m_X))) & 65535) & 0xff);
        return this.cycles;
      }
      case 0xfd00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        if (this.method_page_changing(this.m_TMP, this.m_X)) {
          (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        }
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
      case 0xfe00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        this.method_set_nz(this.m_TMP2);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        return this.cycles;
      }
      case 0xff00: {
        this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        this.m_TMP = ((this.method_set_h(this.m_TMP, (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff))) & 0xffff);
        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        (++this.cycles, this.readMemory((this.method_set_l(this.m_TMP, ((this.m_TMP) + (this.m_X)))) & 65535) & 0xff);
        this.m_TMP = ((((this.m_TMP) + (this.m_X))) & 0xffff);
        this.m_TMP2 = (((++this.cycles, this.readMemory((this.m_TMP) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.m_TMP2 = ((((this.m_TMP2) + (1))) & 0xff);
        (++this.cycles, this.writeMemory((this.m_TMP) & 65535, (this.m_TMP2) & 0xff), 0);
        this.method_do_sbc_nd(this.m_TMP2);
        return this.cycles;
      }
        default:
          throw new Error('RP2A03 has no generated opcode ' +
            (((this.m_ref >>> 8) & 0xffff).toString(16).padStart(4, '0')));
      }
    }
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
      // Cleared before the callback, not after: timing() is where device
      // timers run, and they read total_cycles(). Leaving the finished
      // instruction's count here while the slice total already includes it
      // would report those cycles twice.
      this.cycles = 0;
      this.bus.timing?.(total, target);
      executed += this.step();
      if (this.stallCycles !== 0) {
        stalled += this.stallCycles;
        this.stallCycles = 0;
      }
      total = executed + stalled;
    }
    this.cycles = 0;
    this.bus.timing?.(target, target);
    return total;
  }

  /**
   * Cycles consumed so far by the instruction being executed.
   *
   * This core charges each cycle before the bus access it pays for, exactly as
   * MAME's does, so during a read or write this is what MAME's total_cycles()
   * already includes. Without it the count only moves between instructions,
   * and hardware that positions itself by *when* the CPU wrote -- the Atari
   * 2600 puts every sprite on screen this way -- lands whole cycles out.
   */
  elapsedCycles(): number {
    return this.cycles;
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
      case "m_PPC": return this.m_PPC;
      case "m_NPC": return this.m_NPC;
      case "m_PC": return this.m_PC;
      case "m_SP": return this.m_SP;
      case "m_TMP": return this.m_TMP;
      case "m_TMP2": return this.m_TMP2;
      case "m_A": return this.m_A;
      case "m_X": return this.m_X;
      case "m_Y": return this.m_Y;
      case "m_P": return this.m_P;
      case "m_IR": return this.m_IR;
      case "m_inst_state_base": return this.m_inst_state_base;
      case "m_nmi_state": return this.m_nmi_state;
      case "m_irq_state": return this.m_irq_state;
      case "m_apu_irq_state": return this.m_apu_irq_state;
      case "m_v_state": return this.m_v_state;
      case "m_nmi_pending": return this.m_nmi_pending;
      case "m_irq_taken": return this.m_irq_taken;
      case "m_inhibit_interrupts": return this.m_inhibit_interrupts;
      case "m_ref": return this.m_ref;
      case "cycles": return this.cycles;
      case "m_icount": return this.m_icount;
      default: return 0;
    }
  }

  /** MAME device_state_interface::state_int, by the CPU's own state index. */
  stateInt(index: number): number {
    switch (index) {

      default: return 0;
    }
  }

  set(name: string, value: number): void {
    switch (name) {
      case "m_PPC": this.m_PPC = ((value) & 0xffff); return;
      case "m_NPC": this.m_NPC = ((value) & 0xffff); return;
      case "m_PC": this.m_PC = ((value) & 0xffff); return;
      case "m_SP": this.m_SP = ((value) & 0xffff); return;
      case "m_TMP": this.m_TMP = ((value) & 0xffff); return;
      case "m_TMP2": this.m_TMP2 = ((value) & 0xff); return;
      case "m_A": this.m_A = ((value) & 0xff); return;
      case "m_X": this.m_X = ((value) & 0xff); return;
      case "m_Y": this.m_Y = ((value) & 0xff); return;
      case "m_P": this.m_P = ((value) & 0xff); return;
      case "m_IR": this.m_IR = ((value) & 0xff); return;
      case "m_inst_state_base": this.m_inst_state_base = value; return;
      case "m_nmi_state": this.m_nmi_state = ((value) ? 1 : 0); return;
      case "m_irq_state": this.m_irq_state = ((value) ? 1 : 0); return;
      case "m_apu_irq_state": this.m_apu_irq_state = ((value) ? 1 : 0); return;
      case "m_v_state": this.m_v_state = ((value) ? 1 : 0); return;
      case "m_nmi_pending": this.m_nmi_pending = ((value) ? 1 : 0); return;
      case "m_irq_taken": this.m_irq_taken = ((value) ? 1 : 0); return;
      case "m_inhibit_interrupts": this.m_inhibit_interrupts = ((value) ? 1 : 0); return;
      case "m_ref": this.m_ref = ((value) >>> 0); return;
      case "cycles": this.cycles = value; return;
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
      case "do_adc_nd": return this.method_do_adc_nd(args[0] ?? 0);
      case "do_arr_nd": return this.method_do_arr_nd();
      case "do_sbc_nd": return this.method_do_sbc_nd(args[0] ?? 0);
      case "do_cmp": return this.method_do_cmp(args[0] ?? 0, args[1] ?? 0);
      case "do_bit": return this.method_do_bit(args[0] ?? 0);
      case "do_asl": return this.method_do_asl(args[0] ?? 0);
      case "do_lsr": return this.method_do_lsr(args[0] ?? 0);
      case "do_ror": return this.method_do_ror(args[0] ?? 0);
      case "do_rol": return this.method_do_rol(args[0] ?? 0);
      case "do_asr": return this.method_do_asr(args[0] ?? 0);
      case "set_nz": return this.method_set_nz(args[0] ?? 0);
      case "set_l": return this.method_set_l(args[0] ?? 0, args[1] ?? 0);
      case "set_h": return this.method_set_h(args[0] ?? 0, args[1] ?? 0);
      case "page_changing": return this.method_page_changing(args[0] ?? 0, args[1] ?? 0);
      case "dec_SP": return this.method_dec_SP();
      case "inc_SP": return this.method_inc_SP();
      default: throw new Error('RP2A03 has no generated method "' + name + '"');
    }
  }

  private generatedStart(): void {
    this.m_PPC = ((0) & 0xffff);
    this.m_NPC = ((0) & 0xffff);
    this.m_PC = ((0) & 0xffff);
    this.m_SP = ((256) & 0xffff);
    this.m_A = ((0) & 0xff);
    this.m_X = ((128) & 0xff);
    this.m_Y = ((0) & 0xff);
    this.m_P = ((54) & 0xff);
    this.m_TMP = ((0) & 0xffff);
    this.m_TMP2 = ((0) & 0xff);
    this.m_IR = ((0) & 0xff);
    this.m_nmi_state = ((0) ? 1 : 0);
    this.m_irq_state = ((0) ? 1 : 0);
    this.m_apu_irq_state = ((0) ? 1 : 0);
    this.m_v_state = ((0) ? 1 : 0);
    this.m_nmi_pending = ((0) ? 1 : 0);
    this.m_irq_taken = ((0) ? 1 : 0);
    this.m_inhibit_interrupts = ((0) ? 1 : 0);
  }

  private generatedInput(inputnum: number, state: number): void {
    if (((Number(inputnum) === Number(0)) ? 1 : 0)) {
      this.m_irq_state = ((((Number(state) === Number(1)) ? 1 : 0)) ? 1 : 0);
    } else {
      if (((Number(inputnum) === Number(1)) ? 1 : 0)) {
        this.m_apu_irq_state = ((((Number(state) === Number(1)) ? 1 : 0)) ? 1 : 0);
      } else {
        if (((Number(inputnum) === Number(-1)) ? 1 : 0)) {
          if ((((((this.m_nmi_state) ? 0 : 1)) && (((Number(state) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
            this.m_nmi_pending = ((1) ? 1 : 0);
          }
          this.m_nmi_state = ((((Number(state) === Number(1)) ? 1 : 0)) ? 1 : 0);
        } else {
          if (((Number(inputnum) === Number(16)) ? 1 : 0)) {
            if ((((((this.m_v_state) ? 0 : 1)) && (((Number(state) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
              this.m_P = ((((this.m_P) | (64))) & 0xff);
            }
            this.m_v_state = ((((Number(state) === Number(1)) ? 1 : 0)) ? 1 : 0);
          }
        }
      }
    }
  }

  private generatedService(): void {

  }

  private generatedFetch(): void {
    this.m_NPC = ((this.m_PC) & 0xffff);
    if ((((this.m_nmi_pending) || (((((((this.m_irq_state) || (this.m_apu_irq_state)) ? 1 : 0)) && (((((this.m_P) & (4))) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
      this.m_irq_taken = ((1) ? 1 : 0);
      this.m_IR = ((0) & 0xff);
    } else {
      this.m_irq_taken = ((0) ? 1 : 0);
      this.m_IR = (((++this.cycles, this.readOpcode((this.m_PC) & 0xffff) & 0xff)) & 0xff);
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    this.m_ref = ((((this.m_IR) << (16))) >>> 0);
  }

  private method_do_adc_nd(val: number = 0): number {
    let sum = 0;
    sum = ((((((this.m_A) + (val))) + (((((this.m_P) & (1))) ? (1) : (0))))) & 0xffff);
    this.m_P = ((((this.m_P) & ((~((((((128) | (64))) | (2))) | (1)))))) & 0xff);
    if (((((sum) & 0xff)) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    } else {
      if (((Number((((sum) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
        this.m_P = ((((this.m_P) | (128))) & 0xff);
      }
    }
    if ((((((~((this.m_A) ^ (val)))) & (((this.m_A) ^ (sum))))) & (128))) {
      this.m_P = ((((this.m_P) | (64))) & 0xff);
    }
    if (((sum) & (65280))) {
      this.m_P = ((((this.m_P) | (1))) & 0xff);
    }
    this.m_A = ((sum) & 0xff);
    return 0;
  }

  private method_do_arr_nd(): number {
    let c = ((((this.m_P) & (1))) ? 1 : 0);
    this.m_P = ((((this.m_P) & ((~((((((128) | (2))) | (1))) | (64)))))) & 0xff);
    this.m_A = ((((this.m_A) >>> (1))) & 0xff);
    if (c) {
      this.m_A = ((((this.m_A) | (128))) & 0xff);
    }
    if (((this.m_A) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    } else {
      if (((Number((((this.m_A) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
        this.m_P = ((((this.m_P) | (128))) & 0xff);
      }
    }
    if (((this.m_A) & (64))) {
      this.m_P = ((((this.m_P) | (((64) | (1))))) & 0xff);
    }
    if (((this.m_A) & (32))) {
      this.m_P = ((((this.m_P) ^ (64))) & 0xff);
    }
    return 0;
  }

  private method_do_sbc_nd(val: number = 0): number {
    let diff = ((((((this.m_A) - (val))) - (((((this.m_P) & (1))) ? (0) : (1))))) & 0xffff);
    this.m_P = ((((this.m_P) & ((~((((((128) | (64))) | (2))) | (1)))))) & 0xff);
    if (((((diff) & 0xff)) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    } else {
      if (((Number((((diff) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
        this.m_P = ((((this.m_P) | (128))) & 0xff);
      }
    }
    if (((((((this.m_A) ^ (val))) & (((this.m_A) ^ (diff))))) & (128))) {
      this.m_P = ((((this.m_P) | (64))) & 0xff);
    }
    if (((((diff) & (65280))) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (1))) & 0xff);
    }
    this.m_A = ((diff) & 0xff);
    return 0;
  }

  private method_do_cmp(val1: number = 0, val2: number = 0): number {
    this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
    let r = ((((val1) - (val2))) & 0xffff);
    if (((r) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    } else {
      if (((Number((((r) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
        this.m_P = ((((this.m_P) | (128))) & 0xff);
      }
    }
    if (((((r) & (65280))) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (1))) & 0xff);
    }
    return 0;
  }

  private method_do_bit(val: number = 0): number {
    this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (64)))))) & 0xff);
    let r = ((((this.m_A) & (val))) & 0xff);
    if (((r) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    }
    if (((val) & (128))) {
      this.m_P = ((((this.m_P) | (128))) & 0xff);
    }
    if (((val) & (64))) {
      this.m_P = ((((this.m_P) | (64))) & 0xff);
    }
    return 0;
  }

  private method_do_asl(v: number = 0): number {
    this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
    let r = ((((v) << (1))) & 0xff);
    if (((r) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    } else {
      if (((Number((((r) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
        this.m_P = ((((this.m_P) | (128))) & 0xff);
      }
    }
    if (((v) & (128))) {
      this.m_P = ((((this.m_P) | (1))) & 0xff);
    }
    return r;
    return 0;
  }

  private method_do_lsr(v: number = 0): number {
    this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
    if (((v) & (1))) {
      this.m_P = ((((this.m_P) | (1))) & 0xff);
    }
    v = ((((v) >>> (1))) & 0xff);
    if (((v) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    }
    return v;
    return 0;
  }

  private method_do_ror(v: number = 0): number {
    let c = ((((this.m_P) & (1))) ? 1 : 0);
    this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
    if (((v) & (1))) {
      this.m_P = ((((this.m_P) | (1))) & 0xff);
    }
    v = ((((v) >>> (1))) & 0xff);
    if (c) {
      v = ((((v) | (128))) & 0xff);
    }
    if (((v) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    } else {
      if (((Number((((v) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
        this.m_P = ((((this.m_P) | (128))) & 0xff);
      }
    }
    return v;
    return 0;
  }

  private method_do_rol(v: number = 0): number {
    let c = ((((this.m_P) & (1))) ? 1 : 0);
    this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
    if (((v) & (128))) {
      this.m_P = ((((this.m_P) | (1))) & 0xff);
    }
    v = ((((v) << (1))) & 0xff);
    if (c) {
      v = ((((v) | (1))) & 0xff);
    }
    if (((v) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    } else {
      if (((Number((((v) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
        this.m_P = ((((this.m_P) | (128))) & 0xff);
      }
    }
    return v;
    return 0;
  }

  private method_do_asr(v: number = 0): number {
    this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
    if (((v) & (1))) {
      this.m_P = ((((this.m_P) | (1))) & 0xff);
    }
    v = ((((v) >>> (1))) & 0xff);
    if (((v) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    } else {
      if (((v) & (64))) {
        this.m_P = ((((this.m_P) | (128))) & 0xff);
        v = ((((v) | (128))) & 0xff);
      }
    }
    return v;
    return 0;
  }

  private method_set_nz(v: number = 0): number {
    this.m_P = ((((this.m_P) & ((~((2) | (128)))))) & 0xff);
    if (((v) & (128))) {
      this.m_P = ((((this.m_P) | (128))) & 0xff);
    }
    if (((v) ? 0 : 1)) {
      this.m_P = ((((this.m_P) | (2))) & 0xff);
    }
    return 0;
  }

  private method_set_l(base: number = 0, val: number = 0): number {
    return ((((base) & (65280))) | (val));
    return 0;
  }

  private method_set_h(base: number = 0, val: number = 0): number {
    return ((((base) & (255))) | (((val) << (8))));
    return 0;
  }

  private method_page_changing(base: number = 0, delta: number = 0): number {
    return ((((((base) + (delta))) ^ (base))) & (65280));
    return 0;
  }

  private method_dec_SP(): number {
    this.m_SP = ((this.method_set_l(this.m_SP, ((this.m_SP) - (1)))) & 0xffff);
    return 0;
  }

  private method_inc_SP(): number {
    this.m_SP = ((this.method_set_l(this.m_SP, ((this.m_SP) + (1)))) & 0xffff);
    return 0;
  }
}

export const cpu: GeneratedCpuExecutable = {
  type: "RP2A03",
  summary: {"opcodes":256,"compiledOpcodes":256,"methods":16,"compiledMethods":16,"diagnostics":0},
  create: (bus: CpuBus): Cpu => new GeneratedRP2A03(bus),
};

export default cpu;
