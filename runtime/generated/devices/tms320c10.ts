// GENERATED from MAME CPU source and opcode DSL; do not edit.
// Sources:
// - src/devices/cpu/tms320c1x/tms320c1x.cpp
// - src/devices/cpu/tms320c1x/tms320c1x.h
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

/**
 * The word halves of a Pair32: MAME's PAIR union viewed as `w.l` / `w.h`.
 *
 * Split into its own class for the same reason as Pair16Bytes -- one hidden
 * class and one pair of prototype accessors shared by every 32-bit register
 * on every core, instead of a closure per instance.
 */
class Pair32Words {
  private readonly pair: Pair32;

  constructor(pair: Pair32) { this.pair = pair; }

  get h(): number { return (this.pair.value >>> 16) & 0xffff; }
  set h(next: number) {
    this.pair.value = (((this.pair.value & 0x0000ffff) | ((next & 0xffff) << 16))) >>> 0;
  }

  get l(): number { return this.pair.value & 0xffff; }
  set l(next: number) {
    this.pair.value = ((this.pair.value & 0xffff0000) | (next & 0xffff)) >>> 0;
  }
}

/**
 * The byte halves of a Pair32. MAME's PAIR aliases `b.l`/`b.h` onto the
 * low word only (bits 0-7 and 8-15), which is what the TMS320C1x opcode
 * register relies on: `m_opcode.b.h` is the instruction's major byte.
 */
class Pair32Bytes {
  private readonly pair: Pair32;

  constructor(pair: Pair32) { this.pair = pair; }

  get h(): number { return (this.pair.value >>> 8) & 0xff; }
  set h(next: number) {
    this.pair.value = ((this.pair.value & 0xffff00ff) | ((next & 0xff) << 8)) >>> 0;
  }

  get l(): number { return this.pair.value & 0xff; }
  set l(next: number) {
    this.pair.value = ((this.pair.value & 0xffffff00) | (next & 0xff)) >>> 0;
  }
}

/**
 * MAME's 32-bit PAIR union. `.d` is the whole doubleword, `.w.h`/`.w.l`
 * its 16-bit halves and `.b.h`/`.b.l` the bytes of the low word, matching
 * the LSB_FIRST layout in MAME's own osdcomm.h.
 */
class Pair32 {
  /** Read by Pair32Words and Pair32Bytes; not the emitted core's vocabulary. */
  value = 0;
  readonly w: Pair32Words;
  readonly b: Pair32Bytes;

  constructor(value = 0) {
    this.value = value >>> 0;
    this.w = new Pair32Words(this);
    this.b = new Pair32Bytes(this);
  }

  get d(): number { return this.value; }
  set d(value: number) { this.value = value >>> 0; }
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
const GENERATED_METHOD_NAMES = new Set<string>(["CLR","SET_FLAG","CALCULATE_ADD_OVERFLOW","CALCULATE_SUB_OVERFLOW","POP_STACK","PUSH_STACK","UPDATE_AR","UPDATE_ARP","getdata","putdata","putdata_sar","putdata_sst","add_branch_cycle","Ext_IRQ","add_sh","sub_sh","lac_sh","sar_ar0","sar_ar1","illegal","lar_ar0","lar_ar1","in_p","out_p","sacl","sach_sh","addh","adds","subh","subs","subc","zalh","zals","tblr","larp_mar","dmov","lt","ltd","lta","mpy","ldpk","ldp","lark_ar0","lark_ar1","xor_","and_","or_","lst","sst","tblw","lack","mpyk","banz","bv","bioz","call","br","blz","blez","bgz","bgez","bnz","bz","nop","dint","eint","abst","zac","rovm","sovm","cala","ret","pac","apac","spac","push","pop"]);

class GeneratedTMS320C10 implements Cpu {
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
  private cycles = ((0) >>> 0);
  private m_ACC = new Pair32(0);
  private m_addr_mask = ((4095) >>> 0);
  private m_ALU = new Pair32(0);
  private m_AR = [0, 0];
  private m_icount = ((0) | 0);
  private m_INTF = ((0) >>> 0);
  private m_memaccess = ((0) & 0xffff);
  private m_oldacc = new Pair32(0);
  private m_opcode = new Pair32(0);
  private m_PC = ((0) & 0xffff);
  private m_Preg = new Pair32(0);
  private m_PREVPC = ((0) & 0xffff);
  private m_ram = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private m_ref = ((0) >>> 0);
  private m_STACK = [0, 0, 0, 0];
  private m_STR = ((0) & 0xffff);
  private m_Treg = ((0) & 0xffff);
  private s_opcode_7f_cycles = Uint8Array.from([1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0]);
  private s_opcode_main_cycles = Uint8Array.from([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 2, 2, 1, 1, 1, 1, 1, 1]);


  constructor(bus: CpuBus) {
    this.bus = bus;
    this.generatedStart();
    this.reset();
  }

  reset(): void {
    this.resetInternal();
    this.m_PC = ((0) & 0xffff);
    this.m_ACC.d = ((0) >>> 0);
    this.m_INTF = ((0) >>> 0);
    this.method_CLR(((((32768) | (256))) | (1)));
    this.method_SET_FLAG(((16384) | (8192)));
  }

  step(): number {
    this.cycles = 0;
    this.m_icount = 1;
    this.generatedService();
    if (this.cycles > 0) return this.cycles;
    this.generatedFetch();
    let dispatches = 0;
    while (true) {
      if (++dispatches > 8) throw new Error('TMS320C10 dispatch loop exceeded 8');
      switch ((this.m_ref >>> 8) & 0xffff) {
      case 0x0000: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0100: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0200: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0300: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0400: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0500: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0600: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0700: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0800: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0900: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0a00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0b00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0c00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0d00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0e00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x0f00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_add_sh();
        return this.cycles;
      }
      case 0x1000: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1100: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1200: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1300: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1400: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1500: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1600: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1700: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1800: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1900: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1a00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1b00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1c00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1d00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1e00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x1f00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sub_sh();
        return this.cycles;
      }
      case 0x2000: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2100: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2200: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2300: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2400: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2500: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2600: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2700: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2800: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2900: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2a00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2b00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2c00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2d00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2e00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x2f00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lac_sh();
        return this.cycles;
      }
      case 0x3000: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sar_ar0();
        return this.cycles;
      }
      case 0x3100: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sar_ar1();
        return this.cycles;
      }
      case 0x3200: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3300: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3400: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3500: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3600: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3700: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3800: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lar_ar0();
        return this.cycles;
      }
      case 0x3900: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lar_ar1();
        return this.cycles;
      }
      case 0x3a00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3b00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3c00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3d00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3e00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x3f00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x4000: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_in_p();
        return this.cycles;
      }
      case 0x4100: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_in_p();
        return this.cycles;
      }
      case 0x4200: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_in_p();
        return this.cycles;
      }
      case 0x4300: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_in_p();
        return this.cycles;
      }
      case 0x4400: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_in_p();
        return this.cycles;
      }
      case 0x4500: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_in_p();
        return this.cycles;
      }
      case 0x4600: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_in_p();
        return this.cycles;
      }
      case 0x4700: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_in_p();
        return this.cycles;
      }
      case 0x4800: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_out_p();
        return this.cycles;
      }
      case 0x4900: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_out_p();
        return this.cycles;
      }
      case 0x4a00: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_out_p();
        return this.cycles;
      }
      case 0x4b00: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_out_p();
        return this.cycles;
      }
      case 0x4c00: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_out_p();
        return this.cycles;
      }
      case 0x4d00: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_out_p();
        return this.cycles;
      }
      case 0x4e00: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_out_p();
        return this.cycles;
      }
      case 0x4f00: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_out_p();
        return this.cycles;
      }
      case 0x5000: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sacl();
        return this.cycles;
      }
      case 0x5100: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x5200: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x5300: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x5400: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x5500: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x5600: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x5700: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x5800: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sach_sh();
        return this.cycles;
      }
      case 0x5900: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sach_sh();
        return this.cycles;
      }
      case 0x5a00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sach_sh();
        return this.cycles;
      }
      case 0x5b00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sach_sh();
        return this.cycles;
      }
      case 0x5c00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sach_sh();
        return this.cycles;
      }
      case 0x5d00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sach_sh();
        return this.cycles;
      }
      case 0x5e00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sach_sh();
        return this.cycles;
      }
      case 0x5f00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sach_sh();
        return this.cycles;
      }
      case 0x6000: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_addh();
        return this.cycles;
      }
      case 0x6100: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_adds();
        return this.cycles;
      }
      case 0x6200: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_subh();
        return this.cycles;
      }
      case 0x6300: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_subs();
        return this.cycles;
      }
      case 0x6400: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_subc();
        return this.cycles;
      }
      case 0x6500: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_zalh();
        return this.cycles;
      }
      case 0x6600: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_zals();
        return this.cycles;
      }
      case 0x6700: {
        this.cycles = ((((this.cycles) + (3))) >>> 0);
        this.method_tblr();
        return this.cycles;
      }
      case 0x6800: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_larp_mar();
        return this.cycles;
      }
      case 0x6900: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_dmov();
        return this.cycles;
      }
      case 0x6a00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lt();
        return this.cycles;
      }
      case 0x6b00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_ltd();
        return this.cycles;
      }
      case 0x6c00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lta();
        return this.cycles;
      }
      case 0x6d00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpy();
        return this.cycles;
      }
      case 0x6e00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_ldpk();
        return this.cycles;
      }
      case 0x6f00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_ldp();
        return this.cycles;
      }
      case 0x7000: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lark_ar0();
        return this.cycles;
      }
      case 0x7100: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lark_ar1();
        return this.cycles;
      }
      case 0x7200: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7300: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7400: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7500: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7600: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7700: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7800: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_xor_();
        return this.cycles;
      }
      case 0x7900: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_and_();
        return this.cycles;
      }
      case 0x7a00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_or_();
        return this.cycles;
      }
      case 0x7b00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lst();
        return this.cycles;
      }
      case 0x7c00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sst();
        return this.cycles;
      }
      case 0x7d00: {
        this.cycles = ((((this.cycles) + (3))) >>> 0);
        this.method_tblw();
        return this.cycles;
      }
      case 0x7e00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_lack();
        return this.cycles;
      }
      case 0x8000: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8100: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8200: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8300: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8400: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8500: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8600: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8700: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8800: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8900: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8a00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8b00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8c00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8d00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8e00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x8f00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9000: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9100: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9200: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9300: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9400: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9500: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9600: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9700: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9800: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9900: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9a00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9b00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9c00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9d00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9e00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0x9f00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_mpyk();
        return this.cycles;
      }
      case 0xa000: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xa100: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xa200: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xa300: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xa400: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xa500: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xa600: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xa700: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xa800: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xa900: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xaa00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xab00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xac00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xad00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xae00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xaf00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb000: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb100: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb200: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb300: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb400: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb500: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb600: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb700: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb800: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xb900: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xba00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xbb00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xbc00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xbd00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xbe00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xbf00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc000: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc100: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc200: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc300: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc400: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc500: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc600: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc700: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc800: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xc900: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xca00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xcb00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xcc00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xcd00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xce00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xcf00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd000: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd100: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd200: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd300: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd400: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd500: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd600: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd700: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd800: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xd900: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xda00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xdb00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xdc00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xdd00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xde00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xdf00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe000: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe100: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe200: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe300: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe400: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe500: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe600: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe700: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe800: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xe900: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xea00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xeb00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xec00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xed00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xee00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xef00: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xf000: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xf100: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xf200: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xf300: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xf400: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_banz();
        return this.cycles;
      }
      case 0xf500: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_bv();
        return this.cycles;
      }
      case 0xf600: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_bioz();
        return this.cycles;
      }
      case 0xf700: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0xf800: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_call();
        return this.cycles;
      }
      case 0xf900: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_br();
        return this.cycles;
      }
      case 0xfa00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_blz();
        return this.cycles;
      }
      case 0xfb00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_blez();
        return this.cycles;
      }
      case 0xfc00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_bgz();
        return this.cycles;
      }
      case 0xfd00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_bgez();
        return this.cycles;
      }
      case 0xfe00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_bnz();
        return this.cycles;
      }
      case 0xff00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_bz();
        return this.cycles;
      }
      case 0x7f00: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_nop();
        return this.cycles;
      }
      case 0x7f01: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_dint();
        return this.cycles;
      }
      case 0x7f02: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_eint();
        return this.cycles;
      }
      case 0x7f03: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f04: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f05: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f06: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f07: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f08: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_abst();
        return this.cycles;
      }
      case 0x7f09: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_zac();
        return this.cycles;
      }
      case 0x7f0a: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_rovm();
        return this.cycles;
      }
      case 0x7f0b: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_sovm();
        return this.cycles;
      }
      case 0x7f0c: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_cala();
        return this.cycles;
      }
      case 0x7f0d: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_ret();
        return this.cycles;
      }
      case 0x7f0e: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_pac();
        return this.cycles;
      }
      case 0x7f0f: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_apac();
        return this.cycles;
      }
      case 0x7f10: {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        this.method_spac();
        return this.cycles;
      }
      case 0x7f11: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f12: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f13: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f14: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f15: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f16: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f17: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f18: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f19: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f1a: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f1b: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f1c: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_push();
        return this.cycles;
      }
      case 0x7f1d: {
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.method_pop();
        return this.cycles;
      }
      case 0x7f1e: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
      case 0x7f1f: {
        this.cycles = ((((this.cycles) + (0))) >>> 0);
        this.method_illegal();
        return this.cycles;
      }
        default:
          throw new Error('TMS320C10 has no generated opcode ' +
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

  /**
   * MAME device_execute_interface::abort_timeslice: finish the instruction in
   * progress and hand the rest of the slice back to the scheduler, so the
   * processors behind this one catch up to it before a synchronized callback
   * changes what they can see.
   */
  timesliceAborted = false;

  abortTimeslice(): void {
    this.timesliceAborted = true;
  }

  run(target: number): number {
    let executed = 0;
    let stalled = 0;
    let total = 0;
    this.stallCycles = 0;
    this.timesliceAborted = false;
    while (total < target) {
      this.bus.timing?.(total, target);
      executed += this.step();
      if (this.stallCycles !== 0) {
        stalled += this.stallCycles;
        this.stallCycles = 0;
      }
      total = executed + stalled;
      if (this.timesliceAborted) break;
    }
    // An aborted slice ends where the processor stopped, not at its target.
    const settled = Math.min(total, target);
    this.bus.timing?.(settled, settled);
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
    const location = address & 8191;
    if (false) return this.internalRam[location];
    return this.bus.read(location) & 0xff;
  }

  private writeMemory(address: number, value: number): void {
    const location = address & 8191;
    const data = value & 0xff;
    if (false) {
      this.internalRam[location] = data;
      return;
    }
    this.bus.write(location, data);
  }

  private readOpcode(address: number): number {
    const location = address & 8191;
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
      case "cycles": return this.cycles;
      case "m_ACC":
      case "m_ACC.d": return this.m_ACC.d;
      case "m_addr_mask": return this.m_addr_mask;
      case "m_ALU":
      case "m_ALU.d": return this.m_ALU.d;
      case "m_icount": return this.m_icount;
      case "m_INTF": return this.m_INTF;
      case "m_memaccess": return this.m_memaccess;
      case "m_oldacc":
      case "m_oldacc.d": return this.m_oldacc.d;
      case "m_opcode":
      case "m_opcode.d": return this.m_opcode.d;
      case "m_PC": return this.m_PC;
      case "m_Preg":
      case "m_Preg.d": return this.m_Preg.d;
      case "m_PREVPC": return this.m_PREVPC;
      case "m_ref": return this.m_ref;
      case "m_STR": return this.m_STR;
      case "m_Treg": return this.m_Treg;
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
      case "cycles": this.cycles = ((value) >>> 0); return;
      case "m_ACC":
      case "m_ACC.d": this.m_ACC.d = value; return;
      case "m_addr_mask": this.m_addr_mask = ((value) >>> 0); return;
      case "m_ALU":
      case "m_ALU.d": this.m_ALU.d = value; return;
      case "m_icount": this.m_icount = ((value) | 0); return;
      case "m_INTF": this.m_INTF = ((value) >>> 0); return;
      case "m_memaccess": this.m_memaccess = ((value) & 0xffff); return;
      case "m_oldacc":
      case "m_oldacc.d": this.m_oldacc.d = value; return;
      case "m_opcode":
      case "m_opcode.d": this.m_opcode.d = value; return;
      case "m_PC": this.m_PC = ((value) & 0xffff); return;
      case "m_Preg":
      case "m_Preg.d": this.m_Preg.d = value; return;
      case "m_PREVPC": this.m_PREVPC = ((value) & 0xffff); return;
      case "m_ref": this.m_ref = ((value) >>> 0); return;
      case "m_STR": this.m_STR = ((value) & 0xffff); return;
      case "m_Treg": this.m_Treg = ((value) & 0xffff); return;
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
      case "CLR": return this.method_CLR(args[0] ?? 0);
      case "SET_FLAG": return this.method_SET_FLAG(args[0] ?? 0);
      case "CALCULATE_ADD_OVERFLOW": return this.method_CALCULATE_ADD_OVERFLOW(args[0] ?? 0);
      case "CALCULATE_SUB_OVERFLOW": return this.method_CALCULATE_SUB_OVERFLOW(args[0] ?? 0);
      case "POP_STACK": return this.method_POP_STACK();
      case "PUSH_STACK": return this.method_PUSH_STACK(args[0] ?? 0);
      case "UPDATE_AR": return this.method_UPDATE_AR();
      case "UPDATE_ARP": return this.method_UPDATE_ARP();
      case "getdata": return this.method_getdata(args[0] ?? 0, args[1] ?? 0);
      case "putdata": return this.method_putdata(args[0] ?? 0);
      case "putdata_sar": return this.method_putdata_sar(args[0] ?? 0);
      case "putdata_sst": return this.method_putdata_sst(args[0] ?? 0);
      case "add_branch_cycle": return this.method_add_branch_cycle();
      case "Ext_IRQ": return this.method_Ext_IRQ();
      case "add_sh": return this.method_add_sh();
      case "sub_sh": return this.method_sub_sh();
      case "lac_sh": return this.method_lac_sh();
      case "sar_ar0": return this.method_sar_ar0();
      case "sar_ar1": return this.method_sar_ar1();
      case "illegal": return this.method_illegal();
      case "lar_ar0": return this.method_lar_ar0();
      case "lar_ar1": return this.method_lar_ar1();
      case "in_p": return this.method_in_p();
      case "out_p": return this.method_out_p();
      case "sacl": return this.method_sacl();
      case "sach_sh": return this.method_sach_sh();
      case "addh": return this.method_addh();
      case "adds": return this.method_adds();
      case "subh": return this.method_subh();
      case "subs": return this.method_subs();
      case "subc": return this.method_subc();
      case "zalh": return this.method_zalh();
      case "zals": return this.method_zals();
      case "tblr": return this.method_tblr();
      case "larp_mar": return this.method_larp_mar();
      case "dmov": return this.method_dmov();
      case "lt": return this.method_lt();
      case "ltd": return this.method_ltd();
      case "lta": return this.method_lta();
      case "mpy": return this.method_mpy();
      case "ldpk": return this.method_ldpk();
      case "ldp": return this.method_ldp();
      case "lark_ar0": return this.method_lark_ar0();
      case "lark_ar1": return this.method_lark_ar1();
      case "xor_": return this.method_xor_();
      case "and_": return this.method_and_();
      case "or_": return this.method_or_();
      case "lst": return this.method_lst();
      case "sst": return this.method_sst();
      case "tblw": return this.method_tblw();
      case "lack": return this.method_lack();
      case "mpyk": return this.method_mpyk();
      case "banz": return this.method_banz();
      case "bv": return this.method_bv();
      case "bioz": return this.method_bioz();
      case "call": return this.method_call();
      case "br": return this.method_br();
      case "blz": return this.method_blz();
      case "blez": return this.method_blez();
      case "bgz": return this.method_bgz();
      case "bgez": return this.method_bgez();
      case "bnz": return this.method_bnz();
      case "bz": return this.method_bz();
      case "nop": return this.method_nop();
      case "dint": return this.method_dint();
      case "eint": return this.method_eint();
      case "abst": return this.method_abst();
      case "zac": return this.method_zac();
      case "rovm": return this.method_rovm();
      case "sovm": return this.method_sovm();
      case "cala": return this.method_cala();
      case "ret": return this.method_ret();
      case "pac": return this.method_pac();
      case "apac": return this.method_apac();
      case "spac": return this.method_spac();
      case "push": return this.method_push();
      case "pop": return this.method_pop();
      default: throw new Error('TMS320C10 has no generated method "' + name + '"');
    }
  }

  private generatedStart(): void {
    this.m_PREVPC = ((0) & 0xffff);
    this.m_ALU.d = ((0) >>> 0);
    this.m_Preg.d = ((0) >>> 0);
    this.m_Treg = ((0) & 0xffff);
    this.m_AR[0] = (((this.m_AR[1] = ((0) & 0xffff))) & 0xffff);
    this.m_STACK[0] = (((this.m_STACK[1] = (((this.m_STACK[2] = (((this.m_STACK[3] = ((0) & 0xffff))) & 0xffff))) & 0xffff))) & 0xffff);
    this.m_opcode.d = ((0) >>> 0);
    this.m_oldacc.d = ((0) >>> 0);
    this.m_memaccess = ((0) & 0xffff);
    this.m_PC = ((0) & 0xffff);
    this.m_STR = ((0) & 0xffff);
    this.m_ACC.d = ((0) >>> 0);
  }

  private generatedInput(inputnum: number, state: number): void {
    if (((Number(state) === Number(1)) ? 1 : 0)) {
      this.m_INTF = ((((this.m_INTF) | (2147483648))) >>> 0);
    }
  }

  private generatedService(): void {
    if (this.m_INTF) {
      if (((((((((Number(this.m_opcode.b.h) !== Number(109)) ? 1 : 0)) && (((Number(((this.m_opcode.b.h) & (224))) !== Number(128)) ? 1 : 0))) ? 1 : 0)) && (((Number(this.m_opcode.w.l) !== Number(32642)) ? 1 : 0))) ? 1 : 0)) {
        this.cycles = ((((this.cycles) + (this.method_Ext_IRQ()))) >>> 0);
      }
    }
    this.m_PREVPC = ((this.m_PC) & 0xffff);
  }

  private generatedFetch(): void {
    this.m_opcode.d = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) >>> 0);
    this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    if (((Number(this.m_opcode.b.h) !== Number(127)) ? 1 : 0)) {
      this.m_ref = ((((this.m_opcode.b.h) << (16))) >>> 0);
    } else {
      this.m_ref = ((((((32512) | (((this.m_opcode.b.l) & (31))))) << (8))) >>> 0);
    }
  }

  private method_CLR(flag: number = 0): number {
    this.m_STR = ((((this.m_STR) & ((~flag)))) & 0xffff);
    this.m_STR = ((((this.m_STR) | (7934))) & 0xffff);
    return 0;
  }

  private method_SET_FLAG(flag: number = 0): number {
    this.m_STR = ((((this.m_STR) | (flag))) & 0xffff);
    this.m_STR = ((((this.m_STR) | (7934))) & 0xffff);
    return 0;
  }

  private method_CALCULATE_ADD_OVERFLOW(addval: number = 0): number {
    if (((Number((((((~((this.m_oldacc.d) ^ (addval)))) & (((this.m_oldacc.d) ^ (this.m_ACC.d))))) | 0)) < Number(0)) ? 1 : 0)) {
      this.method_SET_FLAG(32768);
      if (((this.m_STR) & (16384))) {
        this.m_ACC.d = ((((((Number(((this.m_oldacc.d) | 0)) < Number(0)) ? 1 : 0)) ? (2147483648) : (2147483647))) >>> 0);
      }
    }
    return 0;
  }

  private method_CALCULATE_SUB_OVERFLOW(subval: number = 0): number {
    if (((Number(((((((this.m_oldacc.d) ^ (subval))) & (((this.m_oldacc.d) ^ (this.m_ACC.d))))) | 0)) < Number(0)) ? 1 : 0)) {
      this.method_SET_FLAG(32768);
      if (((this.m_STR) & (16384))) {
        this.m_ACC.d = ((((((Number(((this.m_oldacc.d) | 0)) < Number(0)) ? 1 : 0)) ? (2147483648) : (2147483647))) >>> 0);
      }
    }
    return 0;
  }

  private method_POP_STACK(): number {
    let data = ((this.m_STACK[3]) & 0xffff);
    this.m_STACK[3] = ((this.m_STACK[2]) & 0xffff);
    this.m_STACK[2] = ((this.m_STACK[1]) & 0xffff);
    this.m_STACK[1] = ((this.m_STACK[0]) & 0xffff);
    return ((data) & (this.m_addr_mask));
    return 0;
  }

  private method_PUSH_STACK(data: number = 0): number {
    this.m_STACK[0] = ((this.m_STACK[1]) & 0xffff);
    this.m_STACK[1] = ((this.m_STACK[2]) & 0xffff);
    this.m_STACK[2] = ((this.m_STACK[3]) & 0xffff);
    this.m_STACK[3] = ((((data) & (this.m_addr_mask))) & 0xffff);
    return 0;
  }

  private method_UPDATE_AR(): number {
    if (((this.m_opcode.b.l) & (48))) {
      let tmpAR = ((this.m_AR[((((this.m_STR) & (256))) >>> (8))]) & 0xffff);
      if (((this.m_opcode.b.l) & (32))) {
        tmpAR = ((((tmpAR) + (1))) & 0xffff);
      }
      if (((this.m_opcode.b.l) & (16))) {
        tmpAR = ((((tmpAR) - (1))) & 0xffff);
      }
      this.m_AR[((((this.m_STR) & (256))) >>> (8))] = ((((((this.m_AR[((((this.m_STR) & (256))) >>> (8))]) & (65024))) | (((tmpAR) & (511))))) & 0xffff);
    }
    return 0;
  }

  private method_UPDATE_ARP(): number {
    if ((((~this.m_opcode.b.l)) & (8))) {
      if (((this.m_opcode.b.l) & (1))) {
        this.method_SET_FLAG(256);
      } else {
        this.method_CLR(256);
      }
    }
    return 0;
  }

  private method_getdata(shift: number = 0, signext: number = 0): number {
    if (((this.m_opcode.b.l) & (128))) {
      this.m_memaccess = ((((this.m_AR[((((this.m_STR) & (256))) >>> (8))]) & (255))) & 0xffff);
    } else {
      this.m_memaccess = ((((((((this.m_STR) & (1))) << (7))) | (((this.m_opcode.b.l) & (127))))) & 0xffff);
    }
    this.m_ALU.d = ((((this.m_ram[((this.m_memaccess) & (255))]) & 0xffff)) >>> 0);
    if (signext) {
      this.m_ALU.d = (((((this.m_ALU.d) << 16) >> 16)) >>> 0);
    }
    this.m_ALU.d = ((((this.m_ALU.d) << (shift))) >>> 0);
    if (((this.m_opcode.b.l) & (128))) {
      this.method_UPDATE_AR();
      this.method_UPDATE_ARP();
    }
    return 0;
  }

  private method_putdata(data: number = 0): number {
    if (((this.m_opcode.b.l) & (128))) {
      this.m_memaccess = ((((this.m_AR[((((this.m_STR) & (256))) >>> (8))]) & (255))) & 0xffff);
    } else {
      this.m_memaccess = ((((((((this.m_STR) & (1))) << (7))) | (((this.m_opcode.b.l) & (127))))) & 0xffff);
    }
    if (((this.m_opcode.b.l) & (128))) {
      this.method_UPDATE_AR();
      this.method_UPDATE_ARP();
    }
    this.m_ram[((this.m_memaccess) & (255))] = ((data) & 0xffff);
    return 0;
  }

  private method_putdata_sar(data: number = 0): number {
    if (((this.m_opcode.b.l) & (128))) {
      this.m_memaccess = ((((this.m_AR[((((this.m_STR) & (256))) >>> (8))]) & (255))) & 0xffff);
    } else {
      this.m_memaccess = ((((((((this.m_STR) & (1))) << (7))) | (((this.m_opcode.b.l) & (127))))) & 0xffff);
    }
    if (((this.m_opcode.b.l) & (128))) {
      this.method_UPDATE_AR();
      this.method_UPDATE_ARP();
    }
    this.m_ram[((this.m_memaccess) & (255))] = ((this.m_AR[data]) & 0xffff);
    return 0;
  }

  private method_putdata_sst(data: number = 0): number {
    if (((this.m_opcode.b.l) & (128))) {
      this.m_memaccess = ((((this.m_AR[((((this.m_STR) & (256))) >>> (8))]) & (255))) & 0xffff);
    } else {
      this.m_memaccess = ((((128) | (this.m_opcode.b.l))) & 0xffff);
    }
    if (((this.m_opcode.b.l) & (128))) {
      this.method_UPDATE_AR();
    }
    this.m_ram[((this.m_memaccess) & (255))] = ((data) & 0xffff);
    return 0;
  }

  private method_add_branch_cycle(): number {
    return this.s_opcode_main_cycles[this.m_opcode.b.h];
    return 0;
  }

  private method_Ext_IRQ(): number {
    if (((Number(((this.m_STR) & (8192))) === Number(0)) ? 1 : 0)) {
      this.m_INTF = ((0) >>> 0);
      this.method_SET_FLAG(8192);
      this.method_PUSH_STACK(this.m_PC);
      this.m_PC = ((2) & 0xffff);
      return ((this.s_opcode_7f_cycles[28]) + (this.s_opcode_7f_cycles[1]));
    }
    return 0;
    return 0;
  }

  private method_add_sh(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.method_getdata(((this.m_opcode.b.h) & (15)), 1);
    this.m_ACC.d = ((((this.m_ACC.d) + (this.m_ALU.d))) >>> 0);
    this.method_CALCULATE_ADD_OVERFLOW(this.m_ALU.d);
    return 0;
  }

  private method_sub_sh(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.method_getdata(((this.m_opcode.b.h) & (15)), 1);
    this.m_ACC.d = ((((this.m_ACC.d) - (this.m_ALU.d))) >>> 0);
    this.method_CALCULATE_SUB_OVERFLOW(this.m_ALU.d);
    return 0;
  }

  private method_lac_sh(): number {
    this.method_getdata(((this.m_opcode.b.h) & (15)), 1);
    this.m_ACC.d = ((this.m_ALU.d) >>> 0);
    return 0;
  }

  private method_sar_ar0(): number {
    this.method_putdata_sar(0);
    return 0;
  }

  private method_sar_ar1(): number {
    this.method_putdata_sar(1);
    return 0;
  }

  private method_illegal(): number {
    0;
    return 0;
  }

  private method_lar_ar0(): number {
    this.method_getdata(0, 0);
    this.m_AR[0] = ((this.m_ALU.w.l) & 0xffff);
    return 0;
  }

  private method_lar_ar1(): number {
    this.method_getdata(0, 0);
    this.m_AR[1] = ((this.m_ALU.w.l) & 0xffff);
    return 0;
  }

  private method_in_p(): number {
    this.m_ALU.w.l = (((this.bus.in16be?.((((((this.m_opcode.b.h) & (7))) * (2))) & 0xffff) ?? (((this.bus.in((((((this.m_opcode.b.h) & (7))) * (2))) & 0xffff) & 0xff) << 8) | (this.bus.in(((((((this.m_opcode.b.h) & (7))) * (2))) + 1) & 0xffff) & 0xff)))) & 0xffff);
    this.method_putdata(this.m_ALU.w.l);
    return 0;
  }

  private method_out_p(): number {
    this.method_getdata(0, 0);
    (this.bus.out16be ? (this.bus.out16be((((((this.m_opcode.b.h) & (7))) * (2))) & 0xffff, (this.m_ALU.w.l) & 0xffff), 0) : (this.bus.out((((((this.m_opcode.b.h) & (7))) * (2))) & 0xffff, ((this.m_ALU.w.l) >>> 8) & 0xff), this.bus.out(((((((this.m_opcode.b.h) & (7))) * (2))) + 1) & 0xffff, (this.m_ALU.w.l) & 0xff), 0));
    return 0;
  }

  private method_sacl(): number {
    this.method_putdata(this.m_ACC.w.l);
    return 0;
  }

  private method_sach_sh(): number {
    this.m_ALU.d = ((((this.m_ACC.d) << (((this.m_opcode.b.h) & (7))))) >>> 0);
    this.method_putdata(this.m_ALU.w.h);
    return 0;
  }

  private method_addh(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.method_getdata(0, 0);
    this.m_ACC.w.h = ((((this.m_ACC.w.h) + (this.m_ALU.w.l))) & 0xffff);
    if (((Number(((((((~((this.m_oldacc.w.h) ^ (this.m_ALU.w.h)))) & (((this.m_oldacc.w.h) ^ (this.m_ACC.w.h))))) << 16) >> 16)) < Number(0)) ? 1 : 0)) {
      this.method_SET_FLAG(32768);
      if (((this.m_STR) & (16384))) {
        this.m_ACC.w.h = ((((((Number((((this.m_oldacc.w.h) << 16) >> 16)) < Number(0)) ? 1 : 0)) ? (32768) : (32767))) & 0xffff);
      }
    }
    return 0;
  }

  private method_adds(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.method_getdata(0, 0);
    this.m_ACC.d = ((((this.m_ACC.d) + (this.m_ALU.d))) >>> 0);
    this.method_CALCULATE_ADD_OVERFLOW(this.m_ALU.d);
    return 0;
  }

  private method_subh(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.method_getdata(16, 0);
    this.m_ACC.d = ((((this.m_ACC.d) - (this.m_ALU.d))) >>> 0);
    this.method_CALCULATE_SUB_OVERFLOW(this.m_ALU.d);
    return 0;
  }

  private method_subs(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.method_getdata(0, 0);
    this.m_ACC.d = ((((this.m_ACC.d) - (this.m_ALU.d))) >>> 0);
    this.method_CALCULATE_SUB_OVERFLOW(this.m_ALU.d);
    return 0;
  }

  private method_subc(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.method_getdata(15, 0);
    this.m_ALU.d = ((((((this.m_ACC.d) | 0)) - (this.m_ALU.d))) >>> 0);
    if (((Number(((((((this.m_oldacc.d) ^ (this.m_ALU.d))) & (((this.m_oldacc.d) ^ (this.m_ACC.d))))) | 0)) < Number(0)) ? 1 : 0)) {
      this.method_SET_FLAG(32768);
    }
    if (((Number(((this.m_ALU.d) | 0)) >= Number(0)) ? 1 : 0)) {
      this.m_ACC.d = ((((((this.m_ALU.d) << (1))) + (1))) >>> 0);
    } else {
      this.m_ACC.d = ((((this.m_ACC.d) << (1))) >>> 0);
    }
    return 0;
  }

  private method_zalh(): number {
    this.method_getdata(0, 0);
    this.m_ACC.w.h = ((this.m_ALU.w.l) & 0xffff);
    this.m_ACC.w.l = ((0) & 0xffff);
    return 0;
  }

  private method_zals(): number {
    this.method_getdata(0, 0);
    this.m_ACC.w.l = ((this.m_ALU.w.l) & 0xffff);
    this.m_ACC.w.h = ((0) & 0xffff);
    return 0;
  }

  private method_tblr(): number {
    this.m_ALU.d = (((this.bus.read16be?.((((((this.m_ACC.w.l) & (this.m_addr_mask))) * (2))) & 8191) ?? (((this.readMemory((((((this.m_ACC.w.l) & (this.m_addr_mask))) * (2)))) & 0xff) << 8) | (this.readMemory((((((this.m_ACC.w.l) & (this.m_addr_mask))) * (2))) + 1) & 0xff)))) >>> 0);
    this.method_putdata(this.m_ALU.w.l);
    this.m_STACK[0] = ((this.m_STACK[1]) & 0xffff);
    return 0;
  }

  private method_larp_mar(): number {
    if (((this.m_opcode.b.l) & (128))) {
      this.method_UPDATE_AR();
      this.method_UPDATE_ARP();
    }
    return 0;
  }

  private method_dmov(): number {
    this.method_getdata(0, 0);
    this.m_ram[((((this.m_memaccess) + (1))) & (255))] = ((this.m_ALU.w.l) & 0xffff);
    return 0;
  }

  private method_lt(): number {
    this.method_getdata(0, 0);
    this.m_Treg = ((this.m_ALU.w.l) & 0xffff);
    return 0;
  }

  private method_ltd(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.method_getdata(0, 0);
    this.m_Treg = ((this.m_ALU.w.l) & 0xffff);
    this.m_ram[((((this.m_memaccess) + (1))) & (255))] = ((this.m_ALU.w.l) & 0xffff);
    this.m_ACC.d = ((((this.m_ACC.d) + (this.m_Preg.d))) >>> 0);
    this.method_CALCULATE_ADD_OVERFLOW(this.m_Preg.d);
    return 0;
  }

  private method_lta(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.method_getdata(0, 0);
    this.m_Treg = ((this.m_ALU.w.l) & 0xffff);
    this.m_ACC.d = ((((this.m_ACC.d) + (this.m_Preg.d))) >>> 0);
    this.method_CALCULATE_ADD_OVERFLOW(this.m_Preg.d);
    return 0;
  }

  private method_mpy(): number {
    this.method_getdata(0, 0);
    this.m_Preg.d = (((((((this.m_ALU.w.l) << 16) >> 16)) * ((((this.m_Treg) << 16) >> 16)))) >>> 0);
    if (((Number(this.m_Preg.d) === Number(1073741824)) ? 1 : 0)) {
      this.m_Preg.d = ((3221225472) >>> 0);
    }
    return 0;
  }

  private method_ldpk(): number {
    if (((this.m_opcode.b.l) & (1))) {
      this.method_SET_FLAG(1);
    } else {
      this.method_CLR(1);
    }
    return 0;
  }

  private method_ldp(): number {
    this.method_getdata(0, 0);
    if (((this.m_ALU.d) & (1))) {
      this.method_SET_FLAG(1);
    } else {
      this.method_CLR(1);
    }
    return 0;
  }

  private method_lark_ar0(): number {
    this.m_AR[0] = ((this.m_opcode.b.l) & 0xffff);
    return 0;
  }

  private method_lark_ar1(): number {
    this.m_AR[1] = ((this.m_opcode.b.l) & 0xffff);
    return 0;
  }

  private method_xor_(): number {
    this.method_getdata(0, 0);
    this.m_ACC.w.l = ((((this.m_ACC.w.l) ^ (this.m_ALU.w.l))) & 0xffff);
    return 0;
  }

  private method_and_(): number {
    this.method_getdata(0, 0);
    this.m_ACC.d = ((((this.m_ACC.d) & (this.m_ALU.d))) >>> 0);
    return 0;
  }

  private method_or_(): number {
    this.method_getdata(0, 0);
    this.m_ACC.w.l = ((((this.m_ACC.w.l) | (this.m_ALU.w.l))) & 0xffff);
    return 0;
  }

  private method_lst(): number {
    if (((this.m_opcode.b.l) & (128))) {
      this.m_opcode.b.l = ((((this.m_opcode.b.l) | (8))) & 0xff);
    }
    this.method_getdata(0, 0);
    this.m_ALU.w.l = ((((this.m_ALU.w.l) & ((~8192)))) & 0xffff);
    this.m_STR = ((((this.m_STR) & (8192))) & 0xffff);
    this.m_STR = ((((this.m_STR) | (this.m_ALU.w.l))) & 0xffff);
    this.m_STR = ((((this.m_STR) | (7934))) & 0xffff);
    return 0;
  }

  private method_sst(): number {
    this.method_putdata_sst(this.m_STR);
    return 0;
  }

  private method_tblw(): number {
    this.method_getdata(0, 0);
    (this.bus.write16be ? (this.bus.write16be((((((this.m_ACC.w.l) & (this.m_addr_mask))) * (2))) & 8191, (this.m_ALU.w.l) & 0xffff), 0) : (this.writeMemory((((((this.m_ACC.w.l) & (this.m_addr_mask))) * (2))), (this.m_ALU.w.l) >>> 8), this.writeMemory((((((this.m_ACC.w.l) & (this.m_addr_mask))) * (2))) + 1, (this.m_ALU.w.l)), 0));
    this.m_STACK[0] = ((this.m_STACK[1]) & 0xffff);
    return 0;
  }

  private method_lack(): number {
    this.m_ACC.d = ((this.m_opcode.b.l) >>> 0);
    return 0;
  }

  private method_mpyk(): number {
    this.m_Preg.d = (((((((this.m_Treg) << 16) >> 16)) * ((((((((this.m_opcode.w.l) << (3))) << 16) >> 16)) >>> (3))))) >>> 0);
    return 0;
  }

  private method_banz(): number {
    if (((this.m_AR[((((this.m_STR) & (256))) >>> (8))]) & (511))) {
      this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
      this.cycles = ((((this.cycles) + (this.method_add_branch_cycle()))) >>> 0);
    } else {
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    this.m_ALU.w.l = ((this.m_AR[((((this.m_STR) & (256))) >>> (8))]) & 0xffff);
    this.m_ALU.w.l = ((((this.m_ALU.w.l) - (1))) & 0xffff);
    this.m_AR[((((this.m_STR) & (256))) >>> (8))] = ((((((this.m_AR[((((this.m_STR) & (256))) >>> (8))]) & (65024))) | (((this.m_ALU.w.l) & (511))))) & 0xffff);
    return 0;
  }

  private method_bv(): number {
    if (((this.m_STR) & (32768))) {
      this.method_CLR(32768);
      this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
      this.cycles = ((((this.cycles) + (this.method_add_branch_cycle()))) >>> 0);
    } else {
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    return 0;
  }

  private method_bioz(): number {
    if (((Number((this.bus.signal?.("bio", 0) ?? 0)) !== Number(0)) ? 1 : 0)) {
      this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
      this.cycles = ((((this.cycles) + (this.method_add_branch_cycle()))) >>> 0);
    } else {
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    return 0;
  }

  private method_call(): number {
    this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    this.method_PUSH_STACK(this.m_PC);
    this.m_PC = (((this.bus.read16be?.((((((this.m_PC) - (1))) * (2))) & 8191) ?? (((this.readMemory((((((this.m_PC) - (1))) * (2)))) & 0xff) << 8) | (this.readMemory((((((this.m_PC) - (1))) * (2))) + 1) & 0xff)))) & 0xffff);
    return 0;
  }

  private method_br(): number {
    this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
    return 0;
  }

  private method_blz(): number {
    if (((Number(((this.m_ACC.d) | 0)) < Number(0)) ? 1 : 0)) {
      this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
      this.cycles = ((((this.cycles) + (this.method_add_branch_cycle()))) >>> 0);
    } else {
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    return 0;
  }

  private method_blez(): number {
    if (((Number(((this.m_ACC.d) | 0)) <= Number(0)) ? 1 : 0)) {
      this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
      this.cycles = ((((this.cycles) + (this.method_add_branch_cycle()))) >>> 0);
    } else {
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    return 0;
  }

  private method_bgz(): number {
    if (((Number(((this.m_ACC.d) | 0)) > Number(0)) ? 1 : 0)) {
      this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
      this.cycles = ((((this.cycles) + (this.method_add_branch_cycle()))) >>> 0);
    } else {
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    return 0;
  }

  private method_bgez(): number {
    if (((Number(((this.m_ACC.d) | 0)) >= Number(0)) ? 1 : 0)) {
      this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
      this.cycles = ((((this.cycles) + (this.method_add_branch_cycle()))) >>> 0);
    } else {
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    return 0;
  }

  private method_bnz(): number {
    if (((Number(this.m_ACC.d) !== Number(0)) ? 1 : 0)) {
      this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
      this.cycles = ((((this.cycles) + (this.method_add_branch_cycle()))) >>> 0);
    } else {
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    return 0;
  }

  private method_bz(): number {
    if (((Number(this.m_ACC.d) === Number(0)) ? 1 : 0)) {
      this.m_PC = (((this.bus.read16be?.((((this.m_PC) * (2))) & 8191) ?? (((this.readMemory((((this.m_PC) * (2)))) & 0xff) << 8) | (this.readMemory((((this.m_PC) * (2))) + 1) & 0xff)))) & 0xffff);
      this.cycles = ((((this.cycles) + (this.method_add_branch_cycle()))) >>> 0);
    } else {
      this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
    }
    return 0;
  }

  private method_nop(): number {

    return 0;
  }

  private method_dint(): number {
    this.method_SET_FLAG(8192);
    return 0;
  }

  private method_eint(): number {
    this.method_CLR(8192);
    return 0;
  }

  private method_abst(): number {
    if (((Number(((this.m_ACC.d) | 0)) < Number(0)) ? 1 : 0)) {
      this.m_ACC.d = (((-this.m_ACC.d)) >>> 0);
      if ((((((this.m_STR) & (16384))) && (((Number(this.m_ACC.d) === Number(2147483648)) ? 1 : 0))) ? 1 : 0)) {
        this.m_ACC.d = ((((this.m_ACC.d) - (1))) >>> 0);
      }
    }
    return 0;
  }

  private method_zac(): number {
    this.m_ACC.d = ((0) >>> 0);
    return 0;
  }

  private method_rovm(): number {
    this.method_CLR(16384);
    return 0;
  }

  private method_sovm(): number {
    this.method_SET_FLAG(16384);
    return 0;
  }

  private method_cala(): number {
    this.method_PUSH_STACK(this.m_PC);
    this.m_PC = ((((this.m_ACC.w.l) & (this.m_addr_mask))) & 0xffff);
    return 0;
  }

  private method_ret(): number {
    this.m_PC = ((this.method_POP_STACK()) & 0xffff);
    return 0;
  }

  private method_pac(): number {
    this.m_ACC.d = ((this.m_Preg.d) >>> 0);
    return 0;
  }

  private method_apac(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.m_ACC.d = ((((this.m_ACC.d) + (this.m_Preg.d))) >>> 0);
    this.method_CALCULATE_ADD_OVERFLOW(this.m_Preg.d);
    return 0;
  }

  private method_spac(): number {
    this.m_oldacc.d = ((this.m_ACC.d) >>> 0);
    this.m_ACC.d = ((((this.m_ACC.d) - (this.m_Preg.d))) >>> 0);
    this.method_CALCULATE_SUB_OVERFLOW(this.m_Preg.d);
    return 0;
  }

  private method_push(): number {
    this.method_PUSH_STACK(this.m_ACC.w.l);
    return 0;
  }

  private method_pop(): number {
    this.m_ACC.w.l = ((this.method_POP_STACK()) & 0xffff);
    this.m_ACC.w.h = ((0) & 0xffff);
    return 0;
  }
}

export const cpu: GeneratedCpuExecutable = {
  type: "TMS320C10",
  summary: {"opcodes":287,"compiledOpcodes":287,"methods":77,"compiledMethods":77,"diagnostics":0},
  create: (bus: CpuBus): Cpu => new GeneratedTMS320C10(bus),
};

export default cpu;
