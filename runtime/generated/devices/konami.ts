// GENERATED from MAME CPU source and opcode DSL; do not edit.
// Sources:
// - src/devices/cpu/m6809/m6809.cpp
// - src/devices/cpu/m6809/m6809.h
// - src/devices/cpu/m6809/m6809inl.h
// - src/devices/cpu/m6809/konami.lst
// - src/devices/cpu/m6809/base6x09.lst
// - src/devices/cpu/m6809/konami.cpp
// - src/devices/cpu/m6809/konami.h
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
const GENERATED_METHOD_NAMES = new Set<string>(["read_tfr_exg_816_register","read_exg_168_register","write_exgtfr_register","read_operand0","read_operand1","write_operand0","write_operand1","daa","mul","reset_state","write_ea","set_ea","set_ea_h","set_ea_l","nop","set_a","set_b","set_d","set_imm","add8_sets_h","hd6309_native_mode","cond_hi","cond_cc","cond_ne","cond_vc","cond_pl","cond_ge","cond_gt","set_cond","branch_taken","firq_saves_entire_state","partial_state_registers","entire_state_registers","is_ea_addressing_mode","eat_remaining","is_register_addressing_mode","get_pending_interrupt","set_flags8","set_flags8r","set_flags16","set_flags16r","rotate_right8","rotate_right16","rotate_left8","rotate_left16","ireg","set_ireg","read_exgtfr_register","lmul","divx","set_lines"]);

class GeneratedKONAMI implements Cpu {
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
  private m_pc = new Pair16(0);
  private m_ppc = new Pair16(0);
  private m_d = new Pair16(0);
  private m_x = new Pair16(0);
  private m_y = new Pair16(0);
  private m_u = new Pair16(0);
  private m_s = new Pair16(0);
  private m_temp = new Pair16(0);
  private m_ea = new Pair16(0);
  private m_dp = ((0) & 0xff);
  private m_cc = ((0) & 0xff);
  private m_opcode = ((0) & 0xff);
  private m_addressing_mode = ((0) & 0xff);
  private m_reg8 = ((0) & 0xff);
  private m_reg16 = ((0) & 0xff);
  private m_cond = ((0) & 0xff);
  private m_nmi_line = ((0) & 0xff);
  private m_nmi_asserted = ((0) & 0xff);
  private m_firq_line = ((0) & 0xff);
  private m_irq_line = ((0) & 0xff);
  private m_lds_encountered = ((0) & 0xff);
  private m_free_run = ((0) & 0xff);
  private m_bcount = ((0) & 0xff);
  private m_sync_wait = ((0) & 0xff);
  private m_cwai_wait = ((0) & 0xff);
  private m_halt = ((0) & 0xff);
  private m_ref = ((0) >>> 0);
  private m_state = ((0) >>> 0);
  private cycles = 0;
  private m_icount = 0;
  private m_temp_im = ((0) & 0xff);


  constructor(bus: CpuBus) {
    this.bus = bus;
    this.generatedStart();
    this.reset();
  }

  reset(): void {
    this.resetInternal();
    this.m_nmi_asserted = ((0) & 0xff);
    this.m_lds_encountered = ((0) & 0xff);
    this.m_free_run = ((0) & 0xff);
    this.m_dp = ((0) & 0xff);
    this.m_cc = ((((this.m_cc) | (16))) & 0xff);
    this.m_cc = ((((this.m_cc) | (64))) & 0xff);
    this.method_set_ea(65534);
    this.method_reset_state();
    this.m_pc.b.h = (((++this.cycles, this.readMemory((65534) & 65535) & 0xff)) & 0xff);
    this.m_pc.b.l = (((++this.cycles, this.readMemory((((65534) + (1))) & 65535) & 0xff)) & 0xff);
    this.cycles = 0;
  }

  step(): number {
    this.cycles = 0;
    this.m_icount = 1;
    this.generatedService();
    if (this.cycles > 0) return this.cycles;
    this.generatedFetch();
    let dispatches = 0;
    while (true) {
      if (++dispatches > 8) throw new Error('KONAMI dispatch loop exceeded 8');
      switch ((this.m_ref >>> 8) & 0xffff) {
      case 0x0000: {
        0;
        return this.cycles;
      }
      case 0x0100: {
        0;
        return this.cycles;
      }
      case 0x0200: {
        0;
        return this.cycles;
      }
      case 0x0300: {
        0;
        return this.cycles;
      }
      case 0x0400: {
        0;
        return this.cycles;
      }
      case 0x0500: {
        0;
        return this.cycles;
      }
      case 0x0600: {
        0;
        return this.cycles;
      }
      case 0x0700: {
        0;
        return this.cycles;
      }
      case 0x0800: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_x.w = ((this.method_set_flags16r(4, this.m_ea.w)) & 0xffff);
        this.cycles = ((this.cycles) + (1));
        return this.cycles;
      }
      case 0x0900: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_y.w = ((this.method_set_flags16r(4, this.m_ea.w)) & 0xffff);
        this.cycles = ((this.cycles) + (1));
        return this.cycles;
      }
      case 0x0a00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        if (0) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        this.m_u.w = ((this.m_ea.w) & 0xffff);
        this.cycles = ((this.cycles) + (1));
        return this.cycles;
      }
      case 0x0b00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        if (1) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        this.m_s.w = ((this.m_ea.w) & 0xffff);
        this.cycles = ((this.cycles) + (1));
        return this.cycles;
      }
      case 0x0c00: {
        this.m_temp.w = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xffff);
        this.cycles = ((this.cycles) + (2));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          (++this.cycles, this.readMemory((this.m_s.w) & 65535) & 0xff);
        }
        if (((this.m_temp.w) & (128))) {
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.l) & 0xff), 0);
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (64))) {
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_u.b.l) & 0xff), 0);
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_u.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (32))) {
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.l) & 0xff), 0);
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (16))) {
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.l) & 0xff), 0);
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (8))) {
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_dp) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (4))) {
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.l) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (2))) {
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (1))) {
          (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_cc) & 0xff), 0);
          this.method_nop();
        }
        return this.cycles;
      }
      case 0x0d00: {
        this.m_temp.w = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xffff);
        this.cycles = ((this.cycles) + (2));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          (++this.cycles, this.readMemory((this.m_u.w) & 65535) & 0xff);
        }
        if (((this.m_temp.w) & (128))) {
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.l) & 0xff), 0);
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (64))) {
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_s.b.l) & 0xff), 0);
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_s.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (32))) {
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.l) & 0xff), 0);
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (16))) {
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.l) & 0xff), 0);
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (8))) {
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_dp) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (4))) {
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.l) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (2))) {
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.h) & 0xff), 0);
          this.method_nop();
        }
        if (((this.m_temp.w) & (1))) {
          (++this.cycles, this.writeMemory(((this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff))) & 65535, (this.m_cc) & 0xff), 0);
          this.method_nop();
        }
        return this.cycles;
      }
      case 0x0e00: {
        this.m_temp.w = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xffff);
        this.cycles = ((this.cycles) + (((this.method_hd6309_native_mode()) ? (1) : (2))));
        if (((this.m_temp.w) & (1))) {
          this.m_cc = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (2))) {
          this.m_d.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (4))) {
          this.m_d.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (8))) {
          this.m_dp = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (16))) {
          this.m_x.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_x.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (32))) {
          this.m_y.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_y.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (64))) {
          this.m_u.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_u.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (128))) {
          this.m_pc.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_pc.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        this.cycles = ((this.cycles) + (1));
        return this.cycles;
      }
      case 0x0f00: {
        this.m_temp.w = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xffff);
        this.cycles = ((this.cycles) + (((this.method_hd6309_native_mode()) ? (1) : (2))));
        if (((this.m_temp.w) & (1))) {
          this.m_cc = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (2))) {
          this.m_d.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (4))) {
          this.m_d.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (8))) {
          this.m_dp = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (16))) {
          this.m_x.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_x.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (32))) {
          this.m_y.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_y.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (64))) {
          this.m_s.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_s.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (128))) {
          this.m_pc.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_pc.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_u.w; this.m_u.w = ((((this.m_u.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        this.cycles = ((this.cycles) + (1));
        return this.cycles;
      }
      case 0x1000: {
        this.method_set_imm();
        this.m_d.b.h = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8r(14, this.m_d.b.h);
        return this.cycles;
      }
      case 0x1100: {
        this.method_set_imm();
        this.m_d.b.l = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8r(14, this.m_d.b.l);
        return this.cycles;
      }
      case 0x1200: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_d.b.h = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8r(14, this.m_d.b.h);
        return this.cycles;
      }
      case 0x1300: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_d.b.l = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8r(14, this.m_d.b.l);
        return this.cycles;
      }
      case 0x1400: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(((this.method_add8_sets_h()) ? (47) : (15)), this.m_d.b.h, this.m_temp.b.l, ((this.m_d.b.h) + (this.m_temp.b.l)))) & 0xff);
        return this.cycles;
      }
      case 0x1500: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(((this.method_add8_sets_h()) ? (47) : (15)), this.m_d.b.l, this.m_temp.b.l, ((this.m_d.b.l) + (this.m_temp.b.l)))) & 0xff);
        return this.cycles;
      }
      case 0x1600: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(((this.method_add8_sets_h()) ? (47) : (15)), this.m_d.b.h, this.m_temp.b.l, ((this.m_d.b.h) + (this.m_temp.b.l)))) & 0xff);
        return this.cycles;
      }
      case 0x1700: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(((this.method_add8_sets_h()) ? (47) : (15)), this.m_d.b.l, this.m_temp.b.l, ((this.m_d.b.l) + (this.m_temp.b.l)))) & 0xff);
        return this.cycles;
      }
      case 0x1800: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(((this.method_add8_sets_h()) ? (47) : (15)), this.m_d.b.h, this.m_temp.b.l, ((((this.m_d.b.h) + (this.m_temp.b.l))) + (((((this.m_cc) & (1))) ? (1) : (0)))))) & 0xff);
        return this.cycles;
      }
      case 0x1900: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(((this.method_add8_sets_h()) ? (47) : (15)), this.m_d.b.l, this.m_temp.b.l, ((((this.m_d.b.l) + (this.m_temp.b.l))) + (((((this.m_cc) & (1))) ? (1) : (0)))))) & 0xff);
        return this.cycles;
      }
      case 0x1a00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(((this.method_add8_sets_h()) ? (47) : (15)), this.m_d.b.h, this.m_temp.b.l, ((((this.m_d.b.h) + (this.m_temp.b.l))) + (((((this.m_cc) & (1))) ? (1) : (0)))))) & 0xff);
        return this.cycles;
      }
      case 0x1b00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(((this.method_add8_sets_h()) ? (47) : (15)), this.m_d.b.l, this.m_temp.b.l, ((((this.m_d.b.l) + (this.m_temp.b.l))) + (((((this.m_cc) & (1))) ? (1) : (0)))))) & 0xff);
        return this.cycles;
      }
      case 0x1c00: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(15, this.m_d.b.h, this.m_temp.b.l, ((this.m_d.b.h) - (this.m_temp.b.l)))) & 0xff);
        return this.cycles;
      }
      case 0x1d00: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(15, this.m_d.b.l, this.m_temp.b.l, ((this.m_d.b.l) - (this.m_temp.b.l)))) & 0xff);
        return this.cycles;
      }
      case 0x1e00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(15, this.m_d.b.h, this.m_temp.b.l, ((this.m_d.b.h) - (this.m_temp.b.l)))) & 0xff);
        return this.cycles;
      }
      case 0x1f00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(15, this.m_d.b.l, this.m_temp.b.l, ((this.m_d.b.l) - (this.m_temp.b.l)))) & 0xff);
        return this.cycles;
      }
      case 0x2000: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(15, this.m_d.b.h, this.m_temp.b.l, ((((this.m_d.b.h) - (this.m_temp.b.l))) - (((((this.m_cc) & (1))) ? (1) : (0)))))) & 0xff);
        return this.cycles;
      }
      case 0x2100: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(15, this.m_d.b.l, this.m_temp.b.l, ((((this.m_d.b.l) - (this.m_temp.b.l))) - (((((this.m_cc) & (1))) ? (1) : (0)))))) & 0xff);
        return this.cycles;
      }
      case 0x2200: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(15, this.m_d.b.h, this.m_temp.b.l, ((((this.m_d.b.h) - (this.m_temp.b.l))) - (((((this.m_cc) & (1))) ? (1) : (0)))))) & 0xff);
        return this.cycles;
      }
      case 0x2300: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(15, this.m_d.b.l, this.m_temp.b.l, ((((this.m_d.b.l) - (this.m_temp.b.l))) - (((((this.m_cc) & (1))) ? (1) : (0)))))) & 0xff);
        return this.cycles;
      }
      case 0x2400: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.h, ((this.m_d.b.h) & (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x2500: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.l, ((this.m_d.b.l) & (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x2600: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.h, ((this.m_d.b.h) & (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x2700: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.l, ((this.m_d.b.l) & (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x2800: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.h, ((this.m_d.b.h) & (this.method_read_operand0())));
        return this.cycles;
      }
      case 0x2900: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.l, ((this.m_d.b.l) & (this.method_read_operand0())));
        return this.cycles;
      }
      case 0x2a00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.h, ((this.m_d.b.h) & (this.method_read_operand0())));
        return this.cycles;
      }
      case 0x2b00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.l, ((this.m_d.b.l) & (this.method_read_operand0())));
        return this.cycles;
      }
      case 0x2c00: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.h, ((this.m_d.b.h) ^ (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x2d00: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.l, ((this.m_d.b.l) ^ (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x2e00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.h, ((this.m_d.b.h) ^ (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x2f00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.l, ((this.m_d.b.l) ^ (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x3000: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.h, ((this.m_d.b.h) | (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x3100: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.l, ((this.m_d.b.l) | (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x3200: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.h = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.h, ((this.m_d.b.h) | (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x3300: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_d.b.l = ((this.method_set_flags8(12, ((0) & 0xff), this.m_d.b.l, ((this.m_d.b.l) | (this.method_read_operand0())))) & 0xff);
        return this.cycles;
      }
      case 0x3400: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8(15, this.m_d.b.h, this.m_temp.b.l, ((this.m_d.b.h) - (this.m_temp.b.l)));
        return this.cycles;
      }
      case 0x3500: {
        this.method_set_imm();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8(15, this.m_d.b.l, this.m_temp.b.l, ((this.m_d.b.l) - (this.m_temp.b.l)));
        return this.cycles;
      }
      case 0x3600: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8(15, this.m_d.b.h, this.m_temp.b.l, ((this.m_d.b.h) - (this.m_temp.b.l)));
        return this.cycles;
      }
      case 0x3700: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8(15, this.m_d.b.l, this.m_temp.b.l, ((this.m_d.b.l) - (this.m_temp.b.l)));
        return this.cycles;
      }
      case 0x3800: {
        this.method_set_imm();
        this.method_set_lines(this.method_read_operand0());
        return this.cycles;
      }
      case 0x3900: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.method_set_lines(this.method_read_operand0());
        return this.cycles;
      }
      case 0x3a00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.method_write_ea(this.method_set_flags8r(14, this.m_d.b.h));
        return this.cycles;
      }
      case 0x3b00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.method_write_ea(this.method_set_flags8r(14, this.m_d.b.l));
        return this.cycles;
      }
      case 0x3c00: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) & (this.method_read_operand0()))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x3d00: {
        this.method_set_imm();
        this.m_cc = ((((this.m_cc) | (this.method_read_operand0()))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x3e00: {
        let param = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        let reg = ((this.method_read_exgtfr_register(((param) >>> (0)))) & 0xffff);
        if ((((((param) >>> (7)) & 1)) ? 0 : 1)) {
          let reg2 = ((this.method_read_exgtfr_register(((param) >>> (4)))) & 0xffff);
          this.method_write_exgtfr_register(((param) >>> (0)), reg2);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_exgtfr_register(((param) >>> (4)), reg);
        this.cycles = ((this.cycles) + (2));
        return this.cycles;
      }
      case 0x3f00: {
        let param = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        let reg = ((this.method_read_exgtfr_register(((param) >>> (0)))) & 0xffff);
        if ((((((param) >>> (7)) & 1)) ? 0 : 1)) {
          let reg2 = ((this.method_read_exgtfr_register(((param) >>> (4)))) & 0xffff);
          this.method_write_exgtfr_register(((param) >>> (0)), reg2);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_exgtfr_register(((param) >>> (4)), reg);
        this.cycles = ((this.cycles) + (2));
        return this.cycles;
      }
      case 0x4000: {
        this.method_set_imm();
        this.m_d.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_d.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_d.w);
        if (0) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4100: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_d.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_d.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_d.w);
        if (0) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4200: {
        this.method_set_imm();
        this.m_x.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_x.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_x.w);
        if (0) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4300: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_x.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_x.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_x.w);
        if (0) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4400: {
        this.method_set_imm();
        this.m_y.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_y.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_y.w);
        if (0) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4500: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_y.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_y.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_y.w);
        if (0) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4600: {
        this.method_set_imm();
        this.m_u.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_u.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_u.w);
        if (0) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4700: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_u.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_u.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_u.w);
        if (0) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4800: {
        this.method_set_imm();
        this.m_s.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_s.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_s.w);
        if (1) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4900: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_s.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_s.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_s.w);
        if (1) {
          this.m_lds_encountered = ((1) & 0xff);
        }
        return this.cycles;
      }
      case 0x4a00: {
        this.method_set_imm();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_d.w, this.m_temp.w, ((this.m_d.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x4b00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_d.w, this.m_temp.w, ((this.m_d.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x4c00: {
        this.method_set_imm();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_x.w, this.m_temp.w, ((this.m_x.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x4d00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_x.w, this.m_temp.w, ((this.m_x.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x4e00: {
        this.method_set_imm();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_y.w, this.m_temp.w, ((this.m_y.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x4f00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_y.w, this.m_temp.w, ((this.m_y.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x5000: {
        this.method_set_imm();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_u.w, this.m_temp.w, ((this.m_u.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x5100: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_u.w, this.m_temp.w, ((this.m_u.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x5200: {
        this.method_set_imm();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_s.w, this.m_temp.w, ((this.m_s.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x5300: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16(15, this.m_s.w, this.m_temp.w, ((this.m_s.w) - (this.m_temp.w)));
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x5400: {
        this.method_set_imm();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_d.w = ((this.method_set_flags16(15, this.m_d.w, this.m_temp.w, ((this.m_d.w) + (this.m_temp.w)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x5500: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_d.w = ((this.method_set_flags16(15, this.m_d.w, this.m_temp.w, ((this.m_d.w) + (this.m_temp.w)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x5600: {
        this.method_set_imm();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_d.w = ((this.method_set_flags16(15, this.m_d.w, this.m_temp.w, ((this.m_d.w) - (this.m_temp.w)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x5700: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_d.w = ((this.method_set_flags16(15, this.m_d.w, this.m_temp.w, ((this.m_d.w) - (this.m_temp.w)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x5800: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.method_write_operand1(0, this.m_d.b.h);
        this.method_write_operand1(1, this.m_d.b.l);
        this.method_set_flags16r(14, this.m_d.w);
        return this.cycles;
      }
      case 0x5900: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.method_write_operand1(0, this.m_x.b.h);
        this.method_write_operand1(1, this.m_x.b.l);
        this.method_set_flags16r(14, this.m_x.w);
        return this.cycles;
      }
      case 0x5a00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.method_write_operand1(0, this.m_y.b.h);
        this.method_write_operand1(1, this.m_y.b.l);
        this.method_set_flags16r(14, this.m_y.w);
        return this.cycles;
      }
      case 0x5b00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.method_write_operand1(0, this.m_u.b.h);
        this.method_write_operand1(1, this.m_u.b.l);
        this.method_set_flags16r(14, this.m_u.w);
        return this.cycles;
      }
      case 0x5c00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.method_write_operand1(0, this.m_s.b.h);
        this.method_write_operand1(1, this.m_s.b.l);
        this.method_set_flags16r(14, this.m_s.w);
        return this.cycles;
      }
      case 0x5d00: {
        0;
        return this.cycles;
      }
      case 0x5e00: {
        0;
        return this.cycles;
      }
      case 0x5f00: {
        0;
        return this.cycles;
      }
      case 0x6000: {
        this.method_set_cond(1);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x6100: {
        this.method_set_cond(this.method_cond_hi());
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x6200: {
        this.method_set_cond(this.method_cond_cc());
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x6300: {
        this.method_set_cond(this.method_cond_ne());
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x6400: {
        this.method_set_cond(this.method_cond_vc());
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x6500: {
        this.method_set_cond(this.method_cond_pl());
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x6600: {
        this.method_set_cond(this.method_cond_ge());
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x6700: {
        this.method_set_cond(this.method_cond_gt());
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x6800: {
        this.method_set_cond(1);
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x6900: {
        this.method_set_cond(this.method_cond_hi());
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x6a00: {
        this.method_set_cond(this.method_cond_cc());
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x6b00: {
        this.method_set_cond(this.method_cond_ne());
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x6c00: {
        this.method_set_cond(this.method_cond_vc());
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x6d00: {
        this.method_set_cond(this.method_cond_pl());
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x6e00: {
        this.method_set_cond(this.method_cond_ge());
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x6f00: {
        this.method_set_cond(this.method_cond_gt());
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x7000: {
        this.method_set_cond(0);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x7100: {
        this.method_set_cond(((this.method_cond_hi()) ? 0 : 1));
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x7200: {
        this.method_set_cond(((this.method_cond_cc()) ? 0 : 1));
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x7300: {
        this.method_set_cond(((this.method_cond_ne()) ? 0 : 1));
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x7400: {
        this.method_set_cond(((this.method_cond_vc()) ? 0 : 1));
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x7500: {
        this.method_set_cond(((this.method_cond_pl()) ? 0 : 1));
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x7600: {
        this.method_set_cond(((this.method_cond_ge()) ? 0 : 1));
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x7700: {
        this.method_set_cond(((this.method_cond_gt()) ? 0 : 1));
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0x7800: {
        this.method_set_cond(0);
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x7900: {
        this.method_set_cond(((this.method_cond_hi()) ? 0 : 1));
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x7a00: {
        this.method_set_cond(((this.method_cond_cc()) ? 0 : 1));
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x7b00: {
        this.method_set_cond(((this.method_cond_ne()) ? 0 : 1));
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x7c00: {
        this.method_set_cond(((this.method_cond_vc()) ? 0 : 1));
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x7d00: {
        this.method_set_cond(((this.method_cond_pl()) ? 0 : 1));
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x7e00: {
        this.method_set_cond(((this.method_cond_ge()) ? 0 : 1));
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x7f00: {
        this.method_set_cond(((this.method_cond_gt()) ? 0 : 1));
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + (this.m_temp.w))) & 0xffff);
          if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
            this.cycles = ((this.cycles) + (1));
          }
        }
        return this.cycles;
      }
      case 0x8000: {
        this.method_set_a();
        this.method_read_operand0();
        this.m_cc = ((((this.m_cc) & ((~15)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        if ((((((this.method_hd6309_native_mode()) ? 0 : 1)) || (((this.method_is_register_addressing_mode()) ? 0 : 1))) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(0);
        return this.cycles;
      }
      case 0x8100: {
        this.method_set_b();
        this.method_read_operand0();
        this.m_cc = ((((this.m_cc) & ((~15)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        if ((((((this.method_hd6309_native_mode()) ? 0 : 1)) || (((this.method_is_register_addressing_mode()) ? 0 : 1))) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(0);
        return this.cycles;
      }
      case 0x8200: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.method_read_operand0();
        this.m_cc = ((((this.m_cc) & ((~15)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        if ((((((this.method_hd6309_native_mode()) ? 0 : 1)) || (((this.method_is_register_addressing_mode()) ? 0 : 1))) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(0);
        return this.cycles;
      }
      case 0x8300: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (1))) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, (((~this.m_temp.b.l)) & 0xff))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8400: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (1))) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, (((~this.m_temp.b.l)) & 0xff))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8500: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (1))) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, (((~this.m_temp.b.l)) & 0xff))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8600: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(15, ((0) & 0xff), this.m_temp.b.l, (-this.m_temp.b.l))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8700: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(15, ((0) & 0xff), this.m_temp.b.l, (-this.m_temp.b.l))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8800: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(15, ((0) & 0xff), this.m_temp.b.l, (-this.m_temp.b.l))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8900: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(14, this.m_temp.b.l, 1, ((this.m_temp.b.l) + (1)))) & 0xff);
        if ((((((this.method_hd6309_native_mode()) ? 0 : 1)) || (((this.method_is_register_addressing_mode()) ? 0 : 1))) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8a00: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(14, this.m_temp.b.l, 1, ((this.m_temp.b.l) + (1)))) & 0xff);
        if ((((((this.method_hd6309_native_mode()) ? 0 : 1)) || (((this.method_is_register_addressing_mode()) ? 0 : 1))) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8b00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(14, this.m_temp.b.l, 1, ((this.m_temp.b.l) + (1)))) & 0xff);
        if ((((((this.method_hd6309_native_mode()) ? 0 : 1)) || (((this.method_is_register_addressing_mode()) ? 0 : 1))) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8c00: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(14, this.m_temp.b.l, 1, ((this.m_temp.b.l) - (1)))) & 0xff);
        if ((((((this.method_hd6309_native_mode()) ? 0 : 1)) || (((this.method_is_register_addressing_mode()) ? 0 : 1))) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8d00: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(14, this.m_temp.b.l, 1, ((this.m_temp.b.l) - (1)))) & 0xff);
        if ((((((this.method_hd6309_native_mode()) ? 0 : 1)) || (((this.method_is_register_addressing_mode()) ? 0 : 1))) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8e00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(14, this.m_temp.b.l, 1, ((this.m_temp.b.l) - (1)))) & 0xff);
        if ((((((this.method_hd6309_native_mode()) ? 0 : 1)) || (((this.method_is_register_addressing_mode()) ? 0 : 1))) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x8f00: {
        this.m_temp.w = ((128) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        if (((this.m_temp.w) & (1))) {
          this.m_cc = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (2))) {
          this.m_d.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (4))) {
          this.m_d.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (8))) {
          this.m_dp = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (16))) {
          this.m_x.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_x.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (32))) {
          this.m_y.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_y.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (64))) {
          this.m_u.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_u.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (128))) {
          this.m_pc.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_pc.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        this.cycles = ((this.cycles) + (1));
        return this.cycles;
      }
      case 0x9000: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8r(14, this.m_temp.b.l);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        if (((this.method_is_register_addressing_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x9100: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8r(14, this.m_temp.b.l);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        if (((this.method_is_register_addressing_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x9200: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.method_set_flags8r(14, this.m_temp.b.l);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        if (((this.method_is_register_addressing_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0x9300: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, ((this.m_temp.b.l) >>> (1)))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9400: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, ((this.m_temp.b.l) >>> (1)))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9500: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, ((this.m_temp.b.l) >>> (1)))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9600: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, this.method_rotate_right8(this.m_temp.b.l))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9700: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, this.method_rotate_right8(this.m_temp.b.l))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9800: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, this.method_rotate_right8(this.m_temp.b.l))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9900: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, (((((this.m_temp.b.l) << 24) >> 24)) >>> (1)))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9a00: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, (((((this.m_temp.b.l) << 24) >> 24)) >>> (1)))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9b00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8r(12, (((((this.m_temp.b.l) << 24) >> 24)) >>> (1)))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9c00: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(15, this.m_temp.b.l, this.m_temp.b.l, ((this.m_temp.b.l) << (1)))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9d00: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(15, this.m_temp.b.l, this.m_temp.b.l, ((this.m_temp.b.l) << (1)))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9e00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(15, this.m_temp.b.l, this.m_temp.b.l, ((this.m_temp.b.l) << (1)))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0x9f00: {
        this.cycles = ((this.cycles) + (1));
        this.m_cc = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
        this.m_temp.w = ((((((((this.m_cc) & (128))) ? (this.method_entire_state_registers()) : (this.method_partial_state_registers()))) & ((~1)))) & 0xffff);
        if (((this.m_temp.w) & (1))) {
          this.m_cc = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (2))) {
          this.m_d.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (4))) {
          this.m_d.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (8))) {
          this.m_dp = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (16))) {
          this.m_x.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_x.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (32))) {
          this.m_y.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_y.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (64))) {
          this.m_u.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_u.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        if (((this.m_temp.w) & (128))) {
          this.m_pc.b.h = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.m_pc.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_s.w; this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          this.method_nop();
        }
        this.cycles = ((this.cycles) + (1));
        return this.cycles;
      }
      case 0xa000: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(14, this.m_temp.b.l, this.m_temp.b.l, this.method_rotate_left8(this.m_temp.b.l))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0xa100: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(14, this.m_temp.b.l, this.m_temp.b.l, this.method_rotate_left8(this.m_temp.b.l))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0xa200: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(14, this.m_temp.b.l, this.m_temp.b.l, this.method_rotate_left8(this.m_temp.b.l))) & 0xff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0xa300: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
        this.m_temp.w = ((this.method_set_flags16r(12, ((this.m_temp.w) >>> (1)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xa400: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16r(12, this.method_rotate_right16(this.m_temp.w))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xa500: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
        this.m_temp.w = ((this.method_set_flags16r(12, (((((this.m_temp.w) << 16) >> 16)) >>> (1)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xa600: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16(15, this.m_temp.w, this.m_temp.w, ((this.m_temp.w) << (1)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xa700: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16r(14, this.method_rotate_left16(this.m_temp.w))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xa800: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_pc.w = ((this.m_ea.w) & 0xffff);
        return this.cycles;
      }
      case 0xa900: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.cycles = ((this.cycles) + (1));
        this.cycles = ((this.cycles) + (1));
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.h) & 0xff), 0);
        this.m_pc.w = ((this.m_ea.w) & 0xffff);
        return this.cycles;
      }
      case 0xaa00: {
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_ea.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        this.cycles = ((this.cycles) + (((this.method_hd6309_native_mode()) ? (2) : (3))));
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.h) & 0xff), 0);
        this.m_pc.w = ((this.m_ea.w) & 0xffff);
        return this.cycles;
      }
      case 0xab00: {
        this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.m_ea.w = ((((this.m_pc.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
        this.cycles = ((this.cycles) + (((this.method_hd6309_native_mode()) ? (2) : (4))));
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.h) & 0xff), 0);
        this.m_pc.w = ((this.m_ea.w) & 0xffff);
        return this.cycles;
      }
      case 0xac00: {
        this.m_d.b.l = ((this.method_set_flags8(14, this.m_d.b.l, 1, ((this.m_d.b.l) - (1)))) & 0xff);
        this.cycles = ((this.cycles) + (1));
        this.method_set_cond(this.method_cond_ne());
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0xad00: {
        this.m_x.w = ((this.method_set_flags16(14, this.m_x.w, 1, ((this.m_x.w) - (1)))) & 0xffff);
        this.cycles = ((this.cycles) + (1));
        this.method_set_cond(this.method_cond_ne());
        this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.cycles = ((this.cycles) + (1));
        if (this.method_branch_taken()) {
          this.m_pc.w = ((((this.m_pc.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
        }
        return this.cycles;
      }
      case 0xae00: {
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0xaf00: {
        0;
        return this.cycles;
      }
      case 0xb000: {
        this.m_x.w = ((((this.m_x.w) + (this.m_d.b.l))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0xb100: {
        this.method_daa();
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0xb200: {
        this.m_d.w = ((this.method_set_flags16r(12, (((this.m_d.b.l) << 24) >> 24))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0xb300: {
        this.method_mul();
        this.cycles = ((this.cycles) + (1));
        this.cycles = ((this.cycles) + (((this.method_hd6309_native_mode()) ? (8) : (9))));
        return this.cycles;
      }
      case 0xb400: {
        this.method_lmul();
        this.cycles = ((this.cycles) + (21));
        return this.cycles;
      }
      case 0xb500: {
        this.method_divx();
        this.cycles = ((this.cycles) + (10));
        return this.cycles;
      }
      case 0xb600: {
        while (((Number(this.m_u.w) !== Number(0)) ? 1 : 0)) {
          this.m_temp.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_y.w; this.m_y.w = ((((this.m_y.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
          (++this.cycles, this.writeMemory((((() => { const previous = this.m_x.w; this.m_x.w = ((((this.m_x.w) + (1))) & 0xffff); return previous; })())) & 65535, (this.m_temp.b.l) & 0xff), 0);
          this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff);
        }
        return this.cycles;
      }
      case 0xb700: {
        this.m_temp.b.l = (((++this.cycles, this.readMemory((((() => { const previous = this.m_y.w; this.m_y.w = ((((this.m_y.w) + (1))) & 0xffff); return previous; })())) & 65535) & 0xff)) & 0xff);
        (++this.cycles, this.writeMemory((((() => { const previous = this.m_x.w; this.m_x.w = ((((this.m_x.w) + (1))) & 0xffff); return previous; })())) & 65535, (this.m_temp.b.l) & 0xff), 0);
        this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff);
        return this.cycles;
      }
      case 0xb800: {
        this.m_temp_im = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.method_set_d();
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
          this.m_cc = ((((this.m_cc) | (((((this.m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
          this.m_temp.w = ((this.method_set_flags16r(12, ((this.m_temp.w) >>> (1)))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xb900: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
          this.m_cc = ((((this.m_cc) | (((((this.m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
          this.m_temp.w = ((this.method_set_flags16r(12, ((this.m_temp.w) >>> (1)))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xba00: {
        this.m_temp_im = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.method_set_d();
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_temp.w = ((this.method_set_flags16r(12, this.method_rotate_right16(this.m_temp.w))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xbb00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_temp.w = ((this.method_set_flags16r(12, this.method_rotate_right16(this.m_temp.w))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xbc00: {
        this.m_temp_im = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.method_set_d();
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
          this.m_cc = ((((this.m_cc) | (((((this.m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
          this.m_temp.w = ((this.method_set_flags16r(12, (((((this.m_temp.w) << 16) >> 16)) >>> (1)))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xbd00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
          this.m_cc = ((((this.m_cc) | (((((this.m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
          this.m_temp.w = ((this.method_set_flags16r(12, (((((this.m_temp.w) << 16) >> 16)) >>> (1)))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xbe00: {
        this.m_temp_im = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.method_set_d();
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_temp.w = ((this.method_set_flags16(15, this.m_temp.w, this.m_temp.w, ((this.m_temp.w) << (1)))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xbf00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_temp.w = ((this.method_set_flags16(15, this.m_temp.w, this.m_temp.w, ((this.m_temp.w) << (1)))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xc000: {
        this.m_temp_im = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        this.method_set_d();
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_temp.w = ((this.method_set_flags16r(14, this.method_rotate_left16(this.m_temp.w))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xc100: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_bcount = ((((this.method_is_register_addressing_mode()) ? (this.m_temp_im) : (this.m_d.b.h))) & 0xff);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        while (((((() => { const previous = this.m_bcount; this.m_bcount = ((((this.m_bcount) - (1))) & 0xff); return previous; })())) & (15))) {
          this.cycles = ((this.cycles) + (1));
          this.m_temp.w = ((this.method_set_flags16r(14, this.method_rotate_left16(this.m_temp.w))) & 0xffff);
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xc200: {
        this.method_set_d();
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.m_cc = ((((this.m_cc) & ((~15)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        this.method_write_operand1(0, 0);
        this.method_write_operand1(1, 0);
        return this.cycles;
      }
      case 0xc300: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.m_cc = ((((this.m_cc) & ((~15)))) & 0xff);
        this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        this.method_write_operand1(0, 0);
        this.method_write_operand1(1, 0);
        return this.cycles;
      }
      case 0xc400: {
        this.method_set_d();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16(15, ((0) & 0xffff), this.m_temp.w, (-this.m_temp.w))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xc500: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16(15, ((0) & 0xffff), this.m_temp.w, (-this.m_temp.w))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xc600: {
        this.method_set_d();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16(15, this.m_temp.w, 1, ((this.m_temp.w) + (1)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xc700: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16(15, this.m_temp.w, 1, ((this.m_temp.w) + (1)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xc800: {
        this.method_set_d();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16(15, this.m_temp.w, 1, ((this.m_temp.w) - (1)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xc900: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16(15, this.m_temp.w, 1, ((this.m_temp.w) - (1)))) & 0xffff);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xca00: {
        this.method_set_d();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_temp.w);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        if (((this.method_is_register_addressing_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0xcb00: {
        this.m_opcode = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
        switch (((this.m_opcode) & (247))) {
          case 7:
            {
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 32:
          case 48:
          case 80:
          case 96:
          case 112:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (1)));
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 33:
          case 49:
          case 81:
          case 97:
          case 113:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.method_set_ireg(((this.method_ireg()) + (2)));
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 34:
          case 50:
          case 82:
          case 98:
          case 114:
            {
              this.method_set_ireg(((this.method_ireg()) - (1)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 35:
          case 51:
          case 83:
          case 99:
          case 115:
            {
              this.method_set_ireg(((this.method_ireg()) - (2)));
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (3));
              break;
            }
          case 36:
          case 52:
          case 84:
          case 100:
          case 116:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 37:
          case 53:
          case 85:
          case 101:
          case 117:
            {
              this.m_ea.w = ((this.method_ireg()) & 0xffff);
              this.m_temp.b.h = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.m_temp.w = ((((this.m_ea.w) + ((((this.m_temp.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 38:
          case 54:
          case 86:
          case 102:
          case 118:
            {
              this.m_temp.w = ((this.method_ireg()) & 0xffff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 196:
            {
              this.m_temp.b.h = ((this.m_dp) & 0xff);
              this.m_temp.b.l = (((++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff)) & 0xff);
              this.cycles = ((this.cycles) + (1));
              break;
            }
          case 160:
          case 176:
          case 208:
          case 224:
          case 240:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.h) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 161:
          case 177:
          case 209:
          case 225:
          case 241:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.b.l) << 24) >> 24)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          case 167:
          case 183:
          case 215:
          case 231:
          case 247:
            {
              this.m_temp.w = ((((this.method_ireg()) + ((((this.m_d.w) << 16) >> 16)))) & 0xffff);
              this.cycles = ((this.cycles) + (2));
              break;
            }
          default:
            {
              0;
              this.m_temp.w = ((0) & 0xffff);
              break;
            }
        }
        if (((this.m_opcode) & (8))) {
          this.method_set_ea(this.m_temp.w);
          this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
          this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
          this.cycles = ((this.cycles) + (1));
        }
        this.method_set_ea(this.m_temp.w);
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.method_set_flags16r(14, this.m_temp.w);
        if (((this.method_hd6309_native_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        if (((this.method_is_register_addressing_mode()) ? 0 : 1)) {
          this.cycles = ((this.cycles) + (1));
        }
        return this.cycles;
      }
      case 0xcc00: {
        this.method_set_a();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(15, 0, this.m_temp.b.l, ((((Number((((this.m_temp.b.l) << 24) >> 24)) >= Number(0)) ? 1 : 0)) ? (this.m_temp.b.l) : ((-this.m_temp.b.l))))) & 0xff);
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0xcd00: {
        this.method_set_b();
        this.m_temp.b.l = ((this.method_read_operand0()) & 0xff);
        this.m_temp.b.l = ((this.method_set_flags8(15, 0, this.m_temp.b.l, ((((Number((((this.m_temp.b.l) << 24) >> 24)) >= Number(0)) ? 1 : 0)) ? (this.m_temp.b.l) : ((-this.m_temp.b.l))))) & 0xff);
        this.method_write_operand0(this.m_temp.b.l);
        return this.cycles;
      }
      case 0xce00: {
        this.method_set_d();
        this.m_temp.b.h = ((this.method_read_operand1(0)) & 0xff);
        this.m_temp.b.l = ((this.method_read_operand1(1)) & 0xff);
        this.m_temp.w = ((this.method_set_flags16(15, 0, this.m_temp.w, ((((Number((((this.m_temp.w) << 16) >> 16)) >= Number(0)) ? 1 : 0)) ? (this.m_temp.w) : ((-this.m_temp.w))))) & 0xffff);
        this.method_write_operand1(0, this.m_temp.b.h);
        this.method_write_operand1(1, this.m_temp.b.l);
        return this.cycles;
      }
      case 0xcf00: {
        while (((Number(this.m_u.w) !== Number(0)) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
          (++this.cycles, this.writeMemory((((() => { const previous = this.m_x.w; this.m_x.w = ((((this.m_x.w) + (1))) & 0xffff); return previous; })())) & 65535, (this.m_d.b.h) & 0xff), 0);
          this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff);
        }
        return this.cycles;
      }
      case 0xd000: {
        while (((Number(this.m_u.w) !== Number(0)) ? 1 : 0)) {
          this.cycles = ((this.cycles) + (1));
          (++this.cycles, this.writeMemory((((() => { const previous = this.m_x.w; this.m_x.w = ((((this.m_x.w) + (1))) & 0xffff); return previous; })())) & 65535, (this.m_d.b.h) & 0xff), 0);
          (++this.cycles, this.writeMemory((((() => { const previous = this.m_x.w; this.m_x.w = ((((this.m_x.w) + (1))) & 0xffff); return previous; })())) & 65535, (this.m_d.b.l) & 0xff), 0);
          this.m_u.w = ((((this.m_u.w) - (1))) & 0xffff);
        }
        return this.cycles;
      }
      case 0xd100: {
        0;
        return this.cycles;
      }
      case 0xd200: {
        0;
        return this.cycles;
      }
      case 0xd300: {
        0;
        return this.cycles;
      }
      case 0xd400: {
        0;
        return this.cycles;
      }
      case 0xd500: {
        0;
        return this.cycles;
      }
      case 0xd600: {
        0;
        return this.cycles;
      }
      case 0xd700: {
        0;
        return this.cycles;
      }
      case 0xd800: {
        0;
        return this.cycles;
      }
      case 0xd900: {
        0;
        return this.cycles;
      }
      case 0xda00: {
        0;
        return this.cycles;
      }
      case 0xdb00: {
        0;
        return this.cycles;
      }
      case 0xdc00: {
        0;
        return this.cycles;
      }
      case 0xdd00: {
        0;
        return this.cycles;
      }
      case 0xde00: {
        0;
        return this.cycles;
      }
      case 0xdf00: {
        0;
        return this.cycles;
      }
      case 0xe000: {
        0;
        return this.cycles;
      }
      case 0xe100: {
        0;
        return this.cycles;
      }
      case 0xe200: {
        0;
        return this.cycles;
      }
      case 0xe300: {
        0;
        return this.cycles;
      }
      case 0xe400: {
        0;
        return this.cycles;
      }
      case 0xe500: {
        0;
        return this.cycles;
      }
      case 0xe600: {
        0;
        return this.cycles;
      }
      case 0xe700: {
        0;
        return this.cycles;
      }
      case 0xe800: {
        0;
        return this.cycles;
      }
      case 0xe900: {
        0;
        return this.cycles;
      }
      case 0xea00: {
        0;
        return this.cycles;
      }
      case 0xeb00: {
        0;
        return this.cycles;
      }
      case 0xec00: {
        0;
        return this.cycles;
      }
      case 0xed00: {
        0;
        return this.cycles;
      }
      case 0xee00: {
        0;
        return this.cycles;
      }
      case 0xef00: {
        0;
        return this.cycles;
      }
      case 0xf000: {
        0;
        return this.cycles;
      }
      case 0xf100: {
        0;
        return this.cycles;
      }
      case 0xf200: {
        0;
        return this.cycles;
      }
      case 0xf300: {
        0;
        return this.cycles;
      }
      case 0xf400: {
        0;
        return this.cycles;
      }
      case 0xf500: {
        0;
        return this.cycles;
      }
      case 0xf600: {
        0;
        return this.cycles;
      }
      case 0xf700: {
        0;
        return this.cycles;
      }
      case 0xf800: {
        0;
        return this.cycles;
      }
      case 0xf900: {
        0;
        return this.cycles;
      }
      case 0xfa00: {
        0;
        return this.cycles;
      }
      case 0xfb00: {
        0;
        return this.cycles;
      }
      case 0xfc00: {
        0;
        return this.cycles;
      }
      case 0xfd00: {
        0;
        return this.cycles;
      }
      case 0xfe00: {
        0;
        return this.cycles;
      }
      case 0xff00: {
        0;
        return this.cycles;
      }
        default:
          throw new Error('KONAMI has no generated opcode ' +
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
      case "m_pc":
      case "m_pc.w": return this.m_pc.w;
      case "m_pc.b.h": return this.m_pc.b.h;
      case "m_pc.b.l": return this.m_pc.b.l;
      case "m_ppc":
      case "m_ppc.w": return this.m_ppc.w;
      case "m_ppc.b.h": return this.m_ppc.b.h;
      case "m_ppc.b.l": return this.m_ppc.b.l;
      case "m_d":
      case "m_d.w": return this.m_d.w;
      case "m_d.b.h": return this.m_d.b.h;
      case "m_d.b.l": return this.m_d.b.l;
      case "m_x":
      case "m_x.w": return this.m_x.w;
      case "m_x.b.h": return this.m_x.b.h;
      case "m_x.b.l": return this.m_x.b.l;
      case "m_y":
      case "m_y.w": return this.m_y.w;
      case "m_y.b.h": return this.m_y.b.h;
      case "m_y.b.l": return this.m_y.b.l;
      case "m_u":
      case "m_u.w": return this.m_u.w;
      case "m_u.b.h": return this.m_u.b.h;
      case "m_u.b.l": return this.m_u.b.l;
      case "m_s":
      case "m_s.w": return this.m_s.w;
      case "m_s.b.h": return this.m_s.b.h;
      case "m_s.b.l": return this.m_s.b.l;
      case "m_temp":
      case "m_temp.w": return this.m_temp.w;
      case "m_temp.b.h": return this.m_temp.b.h;
      case "m_temp.b.l": return this.m_temp.b.l;
      case "m_ea":
      case "m_ea.w": return this.m_ea.w;
      case "m_ea.b.h": return this.m_ea.b.h;
      case "m_ea.b.l": return this.m_ea.b.l;
      case "m_dp": return this.m_dp;
      case "m_cc": return this.m_cc;
      case "m_opcode": return this.m_opcode;
      case "m_addressing_mode": return this.m_addressing_mode;
      case "m_reg8": return this.m_reg8;
      case "m_reg16": return this.m_reg16;
      case "m_cond": return this.m_cond;
      case "m_nmi_line": return this.m_nmi_line;
      case "m_nmi_asserted": return this.m_nmi_asserted;
      case "m_firq_line": return this.m_firq_line;
      case "m_irq_line": return this.m_irq_line;
      case "m_lds_encountered": return this.m_lds_encountered;
      case "m_free_run": return this.m_free_run;
      case "m_bcount": return this.m_bcount;
      case "m_sync_wait": return this.m_sync_wait;
      case "m_cwai_wait": return this.m_cwai_wait;
      case "m_halt": return this.m_halt;
      case "m_ref": return this.m_ref;
      case "m_state": return this.m_state;
      case "cycles": return this.cycles;
      case "m_icount": return this.m_icount;
      case "m_temp_im": return this.m_temp_im;
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
      case "m_pc":
      case "m_pc.w": this.m_pc.w = value; return;
      case "m_pc.b.h": this.m_pc.b.h = value; return;
      case "m_pc.b.l": this.m_pc.b.l = value; return;
      case "m_ppc":
      case "m_ppc.w": this.m_ppc.w = value; return;
      case "m_ppc.b.h": this.m_ppc.b.h = value; return;
      case "m_ppc.b.l": this.m_ppc.b.l = value; return;
      case "m_d":
      case "m_d.w": this.m_d.w = value; return;
      case "m_d.b.h": this.m_d.b.h = value; return;
      case "m_d.b.l": this.m_d.b.l = value; return;
      case "m_x":
      case "m_x.w": this.m_x.w = value; return;
      case "m_x.b.h": this.m_x.b.h = value; return;
      case "m_x.b.l": this.m_x.b.l = value; return;
      case "m_y":
      case "m_y.w": this.m_y.w = value; return;
      case "m_y.b.h": this.m_y.b.h = value; return;
      case "m_y.b.l": this.m_y.b.l = value; return;
      case "m_u":
      case "m_u.w": this.m_u.w = value; return;
      case "m_u.b.h": this.m_u.b.h = value; return;
      case "m_u.b.l": this.m_u.b.l = value; return;
      case "m_s":
      case "m_s.w": this.m_s.w = value; return;
      case "m_s.b.h": this.m_s.b.h = value; return;
      case "m_s.b.l": this.m_s.b.l = value; return;
      case "m_temp":
      case "m_temp.w": this.m_temp.w = value; return;
      case "m_temp.b.h": this.m_temp.b.h = value; return;
      case "m_temp.b.l": this.m_temp.b.l = value; return;
      case "m_ea":
      case "m_ea.w": this.m_ea.w = value; return;
      case "m_ea.b.h": this.m_ea.b.h = value; return;
      case "m_ea.b.l": this.m_ea.b.l = value; return;
      case "m_dp": this.m_dp = ((value) & 0xff); return;
      case "m_cc": this.m_cc = ((value) & 0xff); return;
      case "m_opcode": this.m_opcode = ((value) & 0xff); return;
      case "m_addressing_mode": this.m_addressing_mode = ((value) & 0xff); return;
      case "m_reg8": this.m_reg8 = ((value) & 0xff); return;
      case "m_reg16": this.m_reg16 = ((value) & 0xff); return;
      case "m_cond": this.m_cond = ((value) & 0xff); return;
      case "m_nmi_line": this.m_nmi_line = ((value) & 0xff); return;
      case "m_nmi_asserted": this.m_nmi_asserted = ((value) & 0xff); return;
      case "m_firq_line": this.m_firq_line = ((value) & 0xff); return;
      case "m_irq_line": this.m_irq_line = ((value) & 0xff); return;
      case "m_lds_encountered": this.m_lds_encountered = ((value) & 0xff); return;
      case "m_free_run": this.m_free_run = ((value) & 0xff); return;
      case "m_bcount": this.m_bcount = ((value) & 0xff); return;
      case "m_sync_wait": this.m_sync_wait = ((value) & 0xff); return;
      case "m_cwai_wait": this.m_cwai_wait = ((value) & 0xff); return;
      case "m_halt": this.m_halt = ((value) & 0xff); return;
      case "m_ref": this.m_ref = ((value) >>> 0); return;
      case "m_state": this.m_state = ((value) >>> 0); return;
      case "cycles": this.cycles = value; return;
      case "m_icount": this.m_icount = value; return;
      case "m_temp_im": this.m_temp_im = ((value) & 0xff); return;
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
      case "read_tfr_exg_816_register": return this.method_read_tfr_exg_816_register(args[0] ?? 0);
      case "read_exg_168_register": return this.method_read_exg_168_register(args[0] ?? 0);
      case "write_exgtfr_register": return this.method_write_exgtfr_register(args[0] ?? 0, args[1] ?? 0);
      case "read_operand0": return this.method_read_operand0();
      case "read_operand1": return this.method_read_operand1(args[0] ?? 0);
      case "write_operand0": return this.method_write_operand0(args[0] ?? 0);
      case "write_operand1": return this.method_write_operand1(args[0] ?? 0, args[1] ?? 0);
      case "daa": return this.method_daa();
      case "mul": return this.method_mul();
      case "reset_state": return this.method_reset_state();
      case "write_ea": return this.method_write_ea(args[0] ?? 0);
      case "set_ea": return this.method_set_ea(args[0] ?? 0);
      case "set_ea_h": return this.method_set_ea_h(args[0] ?? 0);
      case "set_ea_l": return this.method_set_ea_l(args[0] ?? 0);
      case "nop": return this.method_nop();
      case "set_a": return this.method_set_a();
      case "set_b": return this.method_set_b();
      case "set_d": return this.method_set_d();
      case "set_imm": return this.method_set_imm();
      case "add8_sets_h": return this.method_add8_sets_h();
      case "hd6309_native_mode": return this.method_hd6309_native_mode();
      case "cond_hi": return this.method_cond_hi();
      case "cond_cc": return this.method_cond_cc();
      case "cond_ne": return this.method_cond_ne();
      case "cond_vc": return this.method_cond_vc();
      case "cond_pl": return this.method_cond_pl();
      case "cond_ge": return this.method_cond_ge();
      case "cond_gt": return this.method_cond_gt();
      case "set_cond": return this.method_set_cond(args[0] ?? 0);
      case "branch_taken": return this.method_branch_taken();
      case "firq_saves_entire_state": return this.method_firq_saves_entire_state();
      case "partial_state_registers": return this.method_partial_state_registers();
      case "entire_state_registers": return this.method_entire_state_registers();
      case "is_ea_addressing_mode": return this.method_is_ea_addressing_mode();
      case "eat_remaining": return this.method_eat_remaining();
      case "is_register_addressing_mode": return this.method_is_register_addressing_mode();
      case "get_pending_interrupt": return this.method_get_pending_interrupt();
      case "set_flags8": return this.method_set_flags8(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0, args[3] ?? 0);
      case "set_flags8r": return this.method_set_flags8r(args[0] ?? 0, args[1] ?? 0);
      case "set_flags16": return this.method_set_flags16(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0, args[3] ?? 0);
      case "set_flags16r": return this.method_set_flags16r(args[0] ?? 0, args[1] ?? 0);
      case "rotate_right8": return this.method_rotate_right8(args[0] ?? 0);
      case "rotate_right16": return this.method_rotate_right16(args[0] ?? 0);
      case "rotate_left8": return this.method_rotate_left8(args[0] ?? 0);
      case "rotate_left16": return this.method_rotate_left16(args[0] ?? 0);
      case "ireg": return this.method_ireg();
      case "set_ireg": return this.method_set_ireg(args[0] ?? 0);
      case "read_exgtfr_register": return this.method_read_exgtfr_register(args[0] ?? 0);
      case "lmul": return this.method_lmul();
      case "divx": return this.method_divx();
      case "set_lines": return this.method_set_lines(args[0] ?? 0);
      default: throw new Error('KONAMI has no generated method "' + name + '"');
    }
  }

  private generatedStart(): void {

  }

  private generatedInput(inputnum: number, state: number): void {
    0;
    switch (inputnum) {
      case -1:
        {
          this.m_nmi_asserted = (((((this.m_nmi_asserted) || (((((((((Number(state) !== Number(0)) ? 1 : 0)) && (((this.m_nmi_line) ? 0 : 1))) ? 1 : 0)) && (this.m_lds_encountered)) ? 1 : 0))) ? 1 : 0)) & 0xff);
          this.m_nmi_line = ((((Number(state) !== Number(0)) ? 1 : 0)) & 0xff);
          break;
        }
      case 1:
        {
          this.m_firq_line = ((((Number(state) !== Number(0)) ? 1 : 0)) & 0xff);
          break;
        }
      case 0:
        {
          this.m_irq_line = ((((Number(state) !== Number(0)) ? 1 : 0)) & 0xff);
          break;
        }
    }
  }

  private generatedService(): void {
    if (this.m_sync_wait) {
      if (((((((((this.m_nmi_asserted) ? 0 : 1)) && (((this.m_firq_line) ? 0 : 1))) ? 1 : 0)) && (((this.m_irq_line) ? 0 : 1))) ? 1 : 0)) {
        this.cycles = ((this.cycles) + (1));
        return;
      }
      this.m_sync_wait = ((0) & 0xff);
      this.m_halt = ((0) & 0xff);
      this.cycles = ((this.cycles) + (1));
      return;
      return;
    }
    if (this.m_cwai_wait) {
      if (((Number((this.m_ea.w = ((this.method_get_pending_interrupt()) & 0xffff))) === Number(0)) ? 1 : 0)) {
        this.cycles = ((this.cycles) + (1));
        return;
      }
      this.m_cwai_wait = ((0) & 0xff);
      this.m_halt = ((0) & 0xff);
      if (this.m_nmi_asserted) {
        this.m_nmi_asserted = ((0) & 0xff);
      }
      this.method_set_ea(this.m_ea.w);
      this.m_cc = ((((this.m_cc) | (((16) | (((((Number(this.m_ea.w) !== Number(65528)) ? 1 : 0)) ? (64) : (0))))))) & 0xff);
      switch (this.m_ea.w) {
        case 65532:
          {
            this.acknowledgeIrq(-1);
            break;
          }
        case 65526:
          {
            this.acknowledgeIrq(1);
            break;
          }
        case 65528:
          {
            this.acknowledgeIrq(0);
            break;
          }
        default:
          {
            break;
          }
      }
      this.cycles = ((this.cycles) + (1));
      this.m_pc.b.h = (((++this.cycles, this.readMemory((this.m_ea.w + (0)) & 0xffff) & 0xff)) & 0xff);
      this.m_pc.b.l = (((++this.cycles, this.readMemory((this.m_ea.w + (1)) & 0xffff) & 0xff)) & 0xff);
      this.cycles = ((this.cycles) + (1));
      return;
    }
    if (this.m_nmi_asserted) {
      this.m_nmi_asserted = ((0) & 0xff);
      this.cycles = ((this.cycles) + (1));
      this.cycles = ((this.cycles) + (1));
      this.cycles = ((this.cycles) + (1));
      this.m_cc = ((((this.m_cc) | (128))) & 0xff);
      this.m_temp.w = ((this.method_entire_state_registers()) & 0xffff);
      if (((this.m_temp.w) & (128))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (64))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_u.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_u.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (32))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (16))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (8))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_dp) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (4))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.l) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (2))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (1))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_cc) & 0xff), 0);
        this.method_nop();
      }
      this.m_cc = ((((this.m_cc) | (((16) | (64))))) & 0xff);
      this.method_set_ea(65532);
      this.acknowledgeIrq(-1);
      this.cycles = ((this.cycles) + (1));
      this.m_pc.b.h = (((++this.cycles, this.readMemory((this.m_ea.w + (0)) & 0xffff) & 0xff)) & 0xff);
      this.m_pc.b.l = (((++this.cycles, this.readMemory((this.m_ea.w + (1)) & 0xffff) & 0xff)) & 0xff);
      this.cycles = ((this.cycles) + (1));
      return;
    }
    if ((((((((this.m_cc) & (64))) ? 0 : 1)) && (this.m_firq_line)) ? 1 : 0)) {
      this.cycles = ((this.cycles) + (1));
      this.cycles = ((this.cycles) + (1));
      this.cycles = ((this.cycles) + (1));
      if (this.method_firq_saves_entire_state()) {
        this.m_cc = ((((this.m_cc) | (128))) & 0xff);
        this.m_temp.w = ((this.method_entire_state_registers()) & 0xffff);
      } else {
        this.m_cc = ((((this.m_cc) & ((~128)))) & 0xff);
        this.m_temp.w = ((this.method_partial_state_registers()) & 0xffff);
      }
      if (((this.m_temp.w) & (128))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (64))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_u.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_u.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (32))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (16))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (8))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_dp) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (4))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.l) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (2))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (1))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_cc) & 0xff), 0);
        this.method_nop();
      }
      this.m_cc = ((((this.m_cc) | (((16) | (64))))) & 0xff);
      this.method_set_ea(65526);
      this.acknowledgeIrq(1);
      this.cycles = ((this.cycles) + (1));
      this.m_pc.b.h = (((++this.cycles, this.readMemory((this.m_ea.w + (0)) & 0xffff) & 0xff)) & 0xff);
      this.m_pc.b.l = (((++this.cycles, this.readMemory((this.m_ea.w + (1)) & 0xffff) & 0xff)) & 0xff);
      this.cycles = ((this.cycles) + (1));
      return;
    }
    if ((((((((this.m_cc) & (16))) ? 0 : 1)) && (this.m_irq_line)) ? 1 : 0)) {
      this.cycles = ((this.cycles) + (1));
      this.cycles = ((this.cycles) + (1));
      this.cycles = ((this.cycles) + (1));
      this.m_cc = ((((this.m_cc) | (128))) & 0xff);
      this.m_temp.w = ((this.method_entire_state_registers()) & 0xffff);
      if (((this.m_temp.w) & (128))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_pc.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (64))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_u.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_u.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (32))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_y.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (16))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.l) & 0xff), 0);
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_x.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (8))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_dp) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (4))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.l) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (2))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_d.b.h) & 0xff), 0);
        this.method_nop();
      }
      if (((this.m_temp.w) & (1))) {
        (++this.cycles, this.writeMemory(((this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff))) & 65535, (this.m_cc) & 0xff), 0);
        this.method_nop();
      }
      this.m_cc = ((((this.m_cc) | (16))) & 0xff);
      this.method_set_ea(65528);
      this.acknowledgeIrq(0);
      this.cycles = ((this.cycles) + (1));
      this.m_pc.b.h = (((++this.cycles, this.readMemory((this.m_ea.w + (0)) & 0xffff) & 0xff)) & 0xff);
      this.m_pc.b.l = (((++this.cycles, this.readMemory((this.m_ea.w + (1)) & 0xffff) & 0xff)) & 0xff);
      this.cycles = ((this.cycles) + (1));
      return;
    }
  }

  private generatedFetch(): void {
    this.m_opcode = (((++this.cycles, this.readOpcode((((() => { const previous = this.m_pc.w; this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff); return previous; })())) & 0xffff) & 0xff)) & 0xff);
    this.m_ref = ((((this.m_opcode) << (16))) >>> 0);
  }

  private method_read_tfr_exg_816_register(reg: number = 0): number {
    let result = 0;
    switch (((reg) & (15))) {
      case 0:
        {
          result = ((this.m_d.w) & 0xffff);
          break;
        }
      case 1:
        {
          result = ((this.m_x.w) & 0xffff);
          break;
        }
      case 2:
        {
          result = ((this.m_y.w) & 0xffff);
          break;
        }
      case 3:
        {
          result = ((this.m_u.w) & 0xffff);
          break;
        }
      case 4:
        {
          result = ((this.m_s.w) & 0xffff);
          break;
        }
      case 5:
        {
          result = ((this.m_pc.w) & 0xffff);
          break;
        }
      case 8:
        {
          result = ((((((65280) & 0xffff)) | (this.m_d.b.h))) & 0xffff);
          break;
        }
      case 9:
        {
          result = ((((((65280) & 0xffff)) | (this.m_d.b.l))) & 0xffff);
          break;
        }
      case 10:
        {
          result = ((((((((this.m_cc) & 0xffff)) << (8))) | (this.m_cc))) & 0xffff);
          break;
        }
      case 11:
        {
          result = ((((((((this.m_dp) & 0xffff)) << (8))) | (this.m_dp))) & 0xffff);
          break;
        }
      default:
        {
          result = ((65535) & 0xffff);
          break;
        }
    }
    return result;
    return 0;
  }

  private method_read_exg_168_register(reg: number = 0): number {
    let result = 0;
    switch (((reg) & (15))) {
      case 0:
        {
          result = ((this.m_d.w) & 0xffff);
          break;
        }
      case 1:
        {
          result = ((this.m_x.w) & 0xffff);
          break;
        }
      case 2:
        {
          result = ((this.m_y.w) & 0xffff);
          break;
        }
      case 3:
        {
          result = ((this.m_u.w) & 0xffff);
          break;
        }
      case 4:
        {
          result = ((this.m_s.w) & 0xffff);
          break;
        }
      case 5:
        {
          result = ((this.m_pc.w) & 0xffff);
          break;
        }
      case 8:
        {
          result = ((((((65280) & 0xffff)) | (this.m_d.b.h))) & 0xffff);
          break;
        }
      case 9:
        {
          result = ((((((65280) & 0xffff)) | (this.m_d.b.l))) & 0xffff);
          break;
        }
      case 10:
        {
          result = ((((((65280) & 0xffff)) | (this.m_cc))) & 0xffff);
          break;
        }
      case 11:
        {
          result = ((((((65280) & 0xffff)) | (this.m_dp))) & 0xffff);
          break;
        }
      default:
        {
          result = ((65535) & 0xffff);
          break;
        }
    }
    return result;
    return 0;
  }

  private method_write_exgtfr_register(reg: number = 0, value: number = 0): number {
    switch (((reg) & (7))) {
      case 0:
        {
          this.m_d.b.h = ((value) & 0xff);
          break;
        }
      case 1:
        {
          this.m_d.b.l = ((value) & 0xff);
          break;
        }
      case 2:
        {
          this.m_x.w = ((value) & 0xffff);
          break;
        }
      case 3:
        {
          this.m_y.w = ((value) & 0xffff);
          break;
        }
      case 4:
        {
          0;
          break;
        }
      case 5:
        {
          this.m_u.w = ((value) & 0xffff);
          break;
        }
      case 6:
        {
          this.m_s.w = ((value) & 0xffff);
          break;
        }
      case 7:
        {
          this.m_pc.w = ((value) & 0xffff);
          break;
        }
    }
    return 0;
  }

  private method_read_operand0(): number {
    switch (this.m_addressing_mode) {
      case 1:
        {
          return (++this.cycles, this.readMemory((this.m_ea.w) & 65535) & 0xff);
        }
      case 0:
        {
          return (++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff);
        }
      case 2:
        {
          return this.m_d.b.h;
        }
      case 3:
        {
          return this.m_d.b.l;
        }
      default:
        {
          return 0;
        }
    }
    return 0;
  }

  private method_read_operand1(ordinal: number = 0): number {
    switch (this.m_addressing_mode) {
      case 1:
        {
          return (++this.cycles, this.readMemory((((this.m_ea.w) + (ordinal))) & 65535) & 0xff);
        }
      case 0:
        {
          return (++this.cycles, this.readMemory(((() => { const previous = this.m_pc.w; this.m_pc.w = (((this.m_pc.w) + (1)) & 0xffff); return previous; })()) & 65535) & 0xff);
        }
      case 4:
        {
          return ((((ordinal) & (1))) ? (this.m_d.b.l) : (this.m_d.b.h));
        }
      default:
        {
        }
    }
    return 0;
  }

  private method_write_operand0(data: number = 0): number {
    switch (this.m_addressing_mode) {
      case 0:
        {
          break;
        }
      case 1:
        {
          (++this.cycles, this.writeMemory((this.m_ea.w) & 65535, (data) & 0xff), 0);
          break;
        }
      case 2:
        {
          this.m_d.b.h = ((data) & 0xff);
          break;
        }
      case 3:
        {
          this.m_d.b.l = ((data) & 0xff);
          break;
        }
      default:
        {
          break;
        }
    }
    return 0;
  }

  private method_write_operand1(ordinal: number = 0, data: number = 0): number {
    switch (this.m_addressing_mode) {
      case 0:
        {
          break;
        }
      case 1:
        {
          (++this.cycles, this.writeMemory((((this.m_ea.w) + (ordinal))) & 65535, (data) & 0xff), 0);
          break;
        }
      case 4:
        {
          (((ordinal) & (1)) ? (this.m_d.b.l = ((data) & 0xff)) : (this.m_d.b.h = ((data) & 0xff)));
          break;
        }
      default:
        {
        }
    }
    return 0;
  }

  private method_daa(): number {
    let t = 0;
    let cf = ((0) & 0xffff);
    let msn = ((((this.m_d.b.h) & (240))) & 0xff);
    let lsn = ((((this.m_d.b.h) & (15))) & 0xff);
    if ((((((Number(lsn) > Number(9)) ? 1 : 0)) || (((this.m_cc) & (32)))) ? 1 : 0)) {
      cf = ((((cf) | (6))) & 0xffff);
    }
    if ((((((Number(msn) > Number(128)) ? 1 : 0)) && (((Number(lsn) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
      cf = ((((cf) | (96))) & 0xffff);
    }
    if ((((((Number(msn) > Number(144)) ? 1 : 0)) || (((this.m_cc) & (1)))) ? 1 : 0)) {
      cf = ((((cf) | (96))) & 0xffff);
    }
    t = ((((this.m_d.b.h) + (cf))) & 0xffff);
    this.m_cc = ((((this.m_cc) & ((~2)))) & 0xff);
    if (((t) & (256))) {
      this.m_cc = ((((this.m_cc) | (1))) & 0xff);
    }
    this.m_d.b.h = ((this.method_set_flags16r(12, ((t) & 0xff))) & 0xff);
    return 0;
  }

  private method_mul(): number {
    let result = ((((((this.m_d.b.h) & 0xffff)) * (((this.m_d.b.l) & 0xffff)))) & 0xffff);
    this.m_d.w = ((this.method_set_flags16r(4, result)) & 0xffff);
    if (((this.m_d.w) & (128))) {
      this.m_cc = ((((this.m_cc) | (1))) & 0xff);
    } else {
      this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
    }
    return 0;
  }

  private method_reset_state(): number {
    this.m_state = ((1) >>> 0);
    return 0;
  }

  private method_write_ea(data: number = 0): number {
    (++this.cycles, this.writeMemory((this.m_ea.w) & 65535, (data) & 0xff), 0);
    return 0;
  }

  private method_set_ea(ea: number = 0): number {
    this.m_ea.w = ((ea) & 0xffff);
    this.m_addressing_mode = ((1) & 0xff);
    return 0;
  }

  private method_set_ea_h(ea_h: number = 0): number {
    this.m_ea.b.h = ((ea_h) & 0xff);
    return 0;
  }

  private method_set_ea_l(ea_l: number = 0): number {
    this.m_ea.b.l = ((ea_l) & 0xff);
    this.m_addressing_mode = ((1) & 0xff);
    return 0;
  }

  private method_nop(): number {

    return 0;
  }

  private method_set_a(): number {
    this.m_addressing_mode = ((2) & 0xff);
    return 0;
  }

  private method_set_b(): number {
    this.m_addressing_mode = ((3) & 0xff);
    return 0;
  }

  private method_set_d(): number {
    this.m_addressing_mode = ((4) & 0xff);
    return 0;
  }

  private method_set_imm(): number {
    this.m_addressing_mode = ((0) & 0xff);
    return 0;
  }

  private method_add8_sets_h(): number {
    return 1;
    return 0;
  }

  private method_hd6309_native_mode(): number {
    return 0;
    return 0;
  }

  private method_cond_hi(): number {
    return ((((this.m_cc) & (5))) ? 0 : 1);
    return 0;
  }

  private method_cond_cc(): number {
    return ((((this.m_cc) & (1))) ? 0 : 1);
    return 0;
  }

  private method_cond_ne(): number {
    return ((((this.m_cc) & (4))) ? 0 : 1);
    return 0;
  }

  private method_cond_vc(): number {
    return ((((this.m_cc) & (2))) ? 0 : 1);
    return 0;
  }

  private method_cond_pl(): number {
    return ((((this.m_cc) & (8))) ? 0 : 1);
    return 0;
  }

  private method_cond_ge(): number {
    return ((Number(((((this.m_cc) & (8))) ? (1) : (0))) === Number(((((this.m_cc) & (2))) ? (1) : (0)))) ? 1 : 0);
    return 0;
  }

  private method_cond_gt(): number {
    return (((this.method_cond_ge()) && (((((this.m_cc) & (4))) ? 0 : 1))) ? 1 : 0);
    return 0;
  }

  private method_set_cond(cond: number = 0): number {
    this.m_cond = ((cond) & 0xff);
    return 0;
  }

  private method_branch_taken(): number {
    return this.m_cond;
    return 0;
  }

  private method_firq_saves_entire_state(): number {
    return 0;
    return 0;
  }

  private method_partial_state_registers(): number {
    return 129;
    return 0;
  }

  private method_entire_state_registers(): number {
    return 255;
    return 0;
  }

  private method_is_ea_addressing_mode(): number {
    return ((Number(this.m_addressing_mode) === Number(1)) ? 1 : 0);
    return 0;
  }

  private method_eat_remaining(): number {
    this.cycles = ((this.cycles) + (this.m_icount));
    return 0;
  }

  private method_is_register_addressing_mode(): number {
    return (((((Number(this.m_addressing_mode) !== Number(0)) ? 1 : 0)) && (((Number(this.m_addressing_mode) !== Number(1)) ? 1 : 0))) ? 1 : 0);
    return 0;
  }

  private method_get_pending_interrupt(): number {
    if (this.m_nmi_asserted) {
      return 65532;
    } else {
      if ((((((((this.m_cc) & (64))) ? 0 : 1)) && (this.m_firq_line)) ? 1 : 0)) {
        return 65526;
      } else {
        if ((((((((this.m_cc) & (16))) ? 0 : 1)) && (this.m_irq_line)) ? 1 : 0)) {
          return 65528;
        } else {
          return 0;
        }
      }
    }
    return 0;
  }

  private method_set_flags8(mask: number = 0, a: number = 0, b: number = 0, r: number = 0): number {
    let hi_bit = ((((((1) << (((((1) * (8))) - (1))))) & 0xff)) & 0xff);
    this.m_cc = ((((this.m_cc) & ((~mask)))) & 0xff);
    if (((mask) & (32))) {
      this.m_cc = ((((this.m_cc) | (((((((((a) ^ (b))) ^ (r))) & (16))) ? (32) : (0))))) & 0xff);
    }
    if (((mask) & (8))) {
      this.m_cc = ((((this.m_cc) | (((((r) & (hi_bit))) ? (8) : (0))))) & 0xff);
    }
    if (((mask) & (4))) {
      this.m_cc = ((((this.m_cc) | (((((Number(((r) & 0xff)) === Number(0)) ? 1 : 0)) ? (4) : (0))))) & 0xff);
    }
    if (((mask) & (2))) {
      this.m_cc = ((((this.m_cc) | (((((((((((a) ^ (b))) ^ (r))) ^ (((r) >>> (1))))) & (hi_bit))) ? (2) : (0))))) & 0xff);
    }
    if (((mask) & (1))) {
      this.m_cc = ((((this.m_cc) | (((((r) & (((hi_bit) << (1))))) ? (1) : (0))))) & 0xff);
    }
    return ((r) & 0xff);
    return 0;
  }

  private method_set_flags8r(mask: number = 0, r: number = 0): number {
    return this.method_set_flags8(mask, ((0) & 0xff), r, r);
    return 0;
  }

  private method_set_flags16(mask: number = 0, a: number = 0, b: number = 0, r: number = 0): number {
    let hi_bit = ((((((1) << (((((2) * (8))) - (1))))) & 0xffff)) & 0xffff);
    this.m_cc = ((((this.m_cc) & ((~mask)))) & 0xff);
    if (((mask) & (32))) {
      this.m_cc = ((((this.m_cc) | (((((((((a) ^ (b))) ^ (r))) & (16))) ? (32) : (0))))) & 0xff);
    }
    if (((mask) & (8))) {
      this.m_cc = ((((this.m_cc) | (((((r) & (hi_bit))) ? (8) : (0))))) & 0xff);
    }
    if (((mask) & (4))) {
      this.m_cc = ((((this.m_cc) | (((((Number(((r) & 0xffff)) === Number(0)) ? 1 : 0)) ? (4) : (0))))) & 0xff);
    }
    if (((mask) & (2))) {
      this.m_cc = ((((this.m_cc) | (((((((((((a) ^ (b))) ^ (r))) ^ (((r) >>> (1))))) & (hi_bit))) ? (2) : (0))))) & 0xff);
    }
    if (((mask) & (1))) {
      this.m_cc = ((((this.m_cc) | (((((r) & (((hi_bit) << (1))))) ? (1) : (0))))) & 0xff);
    }
    return ((r) & 0xffff);
    return 0;
  }

  private method_set_flags16r(mask: number = 0, r: number = 0): number {
    return this.method_set_flags16(mask, ((0) & 0xffff), r, r);
    return 0;
  }

  private method_rotate_right8(value: number = 0): number {
    let new_carry = ((((((value) & (1))) ? (1) : (0))) ? 1 : 0);
    value = ((((value) >>> (1))) & 0xff);
    let high_bit = ((((((1) & 0xff)) << (((((1) * (8))) - (1))))) & 0xff);
    if (((this.m_cc) & (1))) {
      value = ((((value) | (high_bit))) & 0xff);
    } else {
      value = ((((value) & ((~high_bit)))) & 0xff);
    }
    if (new_carry) {
      this.m_cc = ((((this.m_cc) | (1))) & 0xff);
    } else {
      this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
    }
    return value;
    return 0;
  }

  private method_rotate_right16(value: number = 0): number {
    let new_carry = ((((((value) & (1))) ? (1) : (0))) ? 1 : 0);
    value = ((((value) >>> (1))) & 0xffff);
    let high_bit = ((((((1) & 0xffff)) << (((((2) * (8))) - (1))))) & 0xffff);
    if (((this.m_cc) & (1))) {
      value = ((((value) | (high_bit))) & 0xffff);
    } else {
      value = ((((value) & ((~high_bit)))) & 0xffff);
    }
    if (new_carry) {
      this.m_cc = ((((this.m_cc) | (1))) & 0xff);
    } else {
      this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
    }
    return value;
    return 0;
  }

  private method_rotate_left8(value: number = 0): number {
    let high_bit = ((((((1) & 0xff)) << (((((1) * (8))) - (1))))) & 0xff);
    let new_carry = ((((((value) & (high_bit))) ? (1) : (0))) ? 1 : 0);
    let new_value = ((value) >>> 0);
    new_value = ((((new_value) << (1))) >>> 0);
    if (((this.m_cc) & (1))) {
      new_value = ((((new_value) | (1))) >>> 0);
    } else {
      new_value = ((((new_value) & ((~1)))) >>> 0);
    }
    if (new_carry) {
      this.m_cc = ((((this.m_cc) | (1))) & 0xff);
    } else {
      this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
    }
    return new_value;
    return 0;
  }

  private method_rotate_left16(value: number = 0): number {
    let high_bit = ((((((1) & 0xffff)) << (((((2) * (8))) - (1))))) & 0xffff);
    let new_carry = ((((((value) & (high_bit))) ? (1) : (0))) ? 1 : 0);
    let new_value = ((value) >>> 0);
    new_value = ((((new_value) << (1))) >>> 0);
    if (((this.m_cc) & (1))) {
      new_value = ((((new_value) | (1))) >>> 0);
    } else {
      new_value = ((((new_value) & ((~1)))) >>> 0);
    }
    if (new_carry) {
      this.m_cc = ((((this.m_cc) | (1))) & 0xff);
    } else {
      this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
    }
    return new_value;
    return 0;
  }

  private method_ireg(): number {
    switch (((this.m_opcode) & (112))) {
      case 32:
        {
          return this.m_x.w;
        }
      case 48:
        {
          return this.m_y.w;
        }
      case 80:
        {
          return this.m_u.w;
        }
      case 96:
        {
          return this.m_s.w;
        }
      case 112:
        {
          return this.m_pc.w;
        }
    }
    return 0;
    return 0;
  }

  private method_set_ireg(value: number = 0): number {
    switch (((this.m_opcode) & (112))) {
      case 32:
        {
          this.m_x.w = ((value) & 0xffff);
          break;
        }
      case 48:
        {
          this.m_y.w = ((value) & 0xffff);
          break;
        }
      case 80:
        {
          this.m_u.w = ((value) & 0xffff);
          break;
        }
      case 96:
        {
          this.m_s.w = ((value) & 0xffff);
          break;
        }
      case 112:
        {
          this.m_pc.w = ((value) & 0xffff);
          break;
        }
    }
    return 0;
  }

  private method_read_exgtfr_register(reg: number = 0): number {
    let result = ((0) & 0xffff);
    switch (((reg) & (7))) {
      case 0:
        {
          result = ((((this.m_d.b.h) | (4096))) & 0xffff);
          break;
        }
      case 1:
        {
          result = ((this.m_d.w) & 0xffff);
          break;
        }
      case 2:
        {
          result = ((this.m_x.w) & 0xffff);
          break;
        }
      case 3:
        {
          result = ((this.m_y.w) & 0xffff);
          break;
        }
      case 4:
        {
          0;
          break;
        }
      case 5:
        {
          result = ((this.m_u.w) & 0xffff);
          break;
        }
      case 6:
        {
          result = ((this.m_s.w) & 0xffff);
          break;
        }
      case 7:
        {
          result = ((this.m_pc.w) & 0xffff);
          break;
        }
    }
    return result;
    return 0;
  }

  private method_lmul(): number {
    let result = ((((this.m_x.w) * (this.m_y.w))) >>> 0);
    this.m_x.w = ((((result) >>> (16))) & 0xffff);
    this.m_y.w = ((result) & 0xffff);
    this.m_cc = ((((this.m_cc) & ((~((4) | (1)))))) & 0xff);
    if (((Number(result) === Number(0)) ? 1 : 0)) {
      this.m_cc = ((((this.m_cc) | (4))) & 0xff);
    }
    if (((result) & (32768))) {
      this.m_cc = ((((this.m_cc) | (1))) & 0xff);
    }
    return 0;
  }

  private method_divx(): number {
    let result = 0;
    let remainder = 0;
    if (((Number(this.m_d.b.l) !== Number(0)) ? 1 : 0)) {
      result = ((Math.trunc((this.m_x.w) / (this.m_d.b.l))) & 0xffff);
      remainder = ((((this.m_x.w) % (this.m_d.b.l))) & 0xff);
    } else {
      result = ((0) & 0xffff);
      remainder = ((0) & 0xff);
    }
    this.m_x.w = ((this.method_set_flags16r(4, result)) & 0xffff);
    this.m_d.b.l = ((remainder) & 0xff);
    if (((result) & (128))) {
      this.m_cc = ((((this.m_cc) | (1))) & 0xff);
    } else {
      this.m_cc = ((((this.m_cc) & ((~1)))) & 0xff);
    }
    return 0;
  }

  private method_set_lines(data: number = 0): number {
    (this.bus.signal?.('line', (data) & 0xff) ?? 0);
    return 0;
  }
}

export const cpu: GeneratedCpuExecutable = {
  type: "KONAMI",
  summary: {"opcodes":256,"compiledOpcodes":256,"methods":51,"compiledMethods":51,"diagnostics":0},
  create: (bus: CpuBus): Cpu => new GeneratedKONAMI(bus),
};

export default cpu;
