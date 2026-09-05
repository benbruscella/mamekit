// GENERATED from MAME CPU source and opcode DSL; do not edit.
// Sources:
// - src/devices/cpu/i86/i86.cpp
// - src/devices/cpu/i86/i86.h
// - src/devices/cpu/i86/i86inline.h
// - src/devices/cpu/nec/nec.cpp
// - src/devices/cpu/nec/nec.h
// - src/devices/cpu/nec/necinstr.hxx
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
const GENERATED_METHOD_NAMES = new Set<string>(["interrupt","calc_addr","common_op","fetch_word","repx_op","CLK","CLKM","get_ea","PutbackRMByte","PutbackRMWord","PutImmRMWord","PutRMWord","PutRMByte","PutImmRMByte","DEF_br8","DEF_wr16","DEF_r8b","DEF_r16w","DEF_ald8","DEF_axd16","RegByte","RegWord","GetRMWord","GetnextRMWord","GetRMByte","PutMemB","PutMemW","GetMemB","GetMemW","set_CFB","set_CFW","set_AF","set_SF","set_ZF","set_PF","set_SZPF_Byte","set_SZPF_Word","set_OFW_Add","set_OFB_Add","set_OFW_Sub","set_OFB_Sub","CompressFlags","ExpandFlags","i_insb","i_insw","i_outsb","i_outsw","i_movsb","i_movsw","i_cmpsb","i_cmpsw","i_stosb","i_stosw","i_lodsb","i_lodsw","i_scasb","i_scasw","i_popf","ADDB","ADDX","SUBB","SUBX","ORB","ORW","ANDB","ANDX","XORB","XORW","ROL_BYTE","ROL_WORD","ROR_BYTE","ROR_WORD","ROLC_BYTE","ROLC_WORD","RORC_BYTE","RORC_WORD","SHL_BYTE","SHL_WORD","SHR_BYTE","SHR_WORD","SHRA_BYTE","SHRA_WORD","XchgAXReg","IncWordReg","DecWordReg","PUSH","POP","JMP","ADJ4","ADJB","read_byte","read_word","write_byte","write_word","read_port_byte","read_port_word","write_port_byte","write_port_byte_al","write_port_word","update_pc","fetch","fetch_op","rotshft_bcl","rotshft_wcl","v30_pusha","v30_popa","v30_rotshft_bd8","v30_rotshft_wd8","v30_add4s"]);

class GeneratedV30 implements Cpu {
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
  private m_regs = new WordByteRegisterFile(8);
  private m_sregs = [0, 0, 0, 0];
  private m_parity_table = Uint8Array.from([1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1]);
  private m_modrm_reg_b = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 7]);
  private m_modrm_reg_w = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7]);
  private m_modrm_rm_b = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7]);
  private m_modrm_rm_w = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]);
  private m_timing = Uint8Array.from([51, 32, 2, 0, 4, 2, 2, 2, 4, 4, 4, 4, 83, 60, 4, 4, 2, 5, 2, 24, 2, 2, 3, 11, 15, 15, 15, 11, 18, 24, 19, 28, 16, 21, 37, 20, 32, 24, 31, 4, 16, 6, 18, 5, 17, 6, 18, 10, 14, 8, 12, 10, 14, 8, 12, 2, 8, 9, 4, 10, 2, 8, 9, 4, 10, 10, 10, 10, 10, 2, 8, 2, 9, 4, 17, 4, 17, 3, 15, 24, 14, 14, 12, 25, 12, 12, 3, 9, 16, 4, 17, 10, 3, 9, 16, 4, 17, 10, 4, 17, 10, 70, 118, 76, 128, 80, 128, 86, 138, 80, 144, 86, 154, 101, 165, 107, 175, 3, 2, 15, 15, 3, 3, 16, 16, 2, 8, 4, 15, 20, 4, 15, 20, 4, 22, 9, 21, 22, 9, 21, 15, 9, 14, 15, 9, 14, 12, 9, 11, 12, 9, 11, 11, 9, 10, 11, 9, 10, 18, 9, 17, 18, 9, 17, 0]);
  private m_ea_timing = Uint8Array.from([7, 8, 8, 7, 5, 5, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 12, 11, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 11, 11, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  private m_ip = ((0) & 0xffff);
  private m_prev_ip = ((0) & 0xffff);
  private m_eo = ((0) & 0xffff);
  private m_TF = ((0) & 0xff);
  private m_IF = ((0) & 0xff);
  private m_DF = ((0) & 0xff);
  private m_IOPL = ((0) & 0xff);
  private m_NT = ((0) & 0xff);
  private m_MF = ((0) & 0xff);
  private m_no_interrupt = ((0) & 0xff);
  private m_fire_trap = ((0) & 0xff);
  private m_test_state = ((0) & 0xff);
  private m_io_stall = ((0) & 0xff);
  private m_seg_prefix = ((0) & 0xff);
  private m_seg_prefix_next = ((0) & 0xff);
  private m_modrm = ((0) & 0xff);
  private m_halt = ((0) & 0xff);
  private m_lock = ((0) & 0xff);
  private m_SignVal = ((0) | 0);
  private m_icount = ((0) | 0);
  private m_AuxVal = ((0) >>> 0);
  private m_OverVal = ((0) >>> 0);
  private m_ZeroVal = ((0) >>> 0);
  private m_CarryVal = ((0) >>> 0);
  private m_ParityVal = ((0) >>> 0);
  private m_int_vector = ((0) >>> 0);
  private m_pending_irq = ((0) >>> 0);
  private m_nmi_state = ((0) >>> 0);
  private m_prefix_seg = ((0) >>> 0);
  private m_ea = ((0) >>> 0);
  private m_easeg = ((0) >>> 0);
  private m_dst = ((0) >>> 0);
  private m_src = ((0) >>> 0);
  private m_pc = ((0) >>> 0);
  private cycles = ((0) >>> 0);


  constructor(bus: CpuBus) {
    this.bus = bus;
    this.generatedStart();
    this.reset();
  }

  reset(): void {
    this.resetInternal();
    this.m_ZeroVal = ((1) >>> 0);
    this.m_ParityVal = ((1) >>> 0);
    this.m_sregs[0] = ((0) & 0xffff);
    this.m_sregs[1] = ((65535) & 0xffff);
    this.m_sregs[2] = ((0) & 0xffff);
    this.m_sregs[3] = ((0) & 0xffff);
    this.m_ip = ((0) & 0xffff);
    this.m_prev_ip = ((0) & 0xffff);
    this.m_SignVal = ((0) | 0);
    this.m_AuxVal = ((0) >>> 0);
    this.m_OverVal = ((0) >>> 0);
    this.m_CarryVal = ((0) >>> 0);
    this.m_TF = ((0) & 0xff);
    this.m_IF = ((0) & 0xff);
    this.m_DF = ((0) & 0xff);
    this.m_IOPL = ((3) & 0xff);
    this.m_NT = ((1) & 0xff);
    this.m_MF = ((1) & 0xff);
    this.m_int_vector = ((0) >>> 0);
    this.m_pending_irq = ((((this.m_pending_irq) & (1))) >>> 0);
    this.m_no_interrupt = ((0) & 0xff);
    this.m_fire_trap = ((0) & 0xff);
    this.m_prefix_seg = ((0) >>> 0);
    this.m_seg_prefix = ((0) & 0xff);
    this.m_seg_prefix_next = ((0) & 0xff);
    this.m_ea = ((0) >>> 0);
    this.m_eo = ((0) & 0xffff);
    this.m_modrm = ((0) & 0xff);
    this.m_dst = ((0) >>> 0);
    this.m_src = ((0) >>> 0);
    this.m_halt = ((0) & 0xff);
    this.m_lock = ((0) & 0xff);
    this.m_easeg = ((3) >>> 0);
    this.cycles = ((0) >>> 0);
  }

  step(): number {
    this.cycles = ((0) >>> 0);
    this.m_icount = ((1) | 0);
    if (this.m_seg_prefix_next) {
      this.m_seg_prefix = ((1) & 0xff);
      this.m_seg_prefix_next = ((0) & 0xff);
    } else {
      this.m_prev_ip = ((this.m_ip) & 0xffff);
      this.m_seg_prefix = ((0) & 0xff);
      if ((((this.m_pending_irq) && (((Number(this.m_no_interrupt) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
        if (((this.m_pending_irq) & (2))) {
          this.method_interrupt(2);
          this.m_pending_irq = ((((this.m_pending_irq) & ((~2)))) >>> 0);
          this.m_halt = ((0) & 0xff);
        } else {
          if (this.m_IF) {
            this.method_interrupt((-1));
            this.m_halt = ((0) & 0xff);
          }
        }
      }
      if (this.m_halt) {
        this.cycles = ((((this.cycles) + (1))) >>> 0);
        return this.cycles;
      }
      if (this.m_fire_trap) {
        if ((((((Number(this.m_fire_trap) >= Number(2)) ? 1 : 0)) && (((Number(this.m_no_interrupt) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
          this.m_fire_trap = ((0) & 0xff);
          this.method_interrupt(1);
        } else {
          this.m_fire_trap = ((((this.m_fire_trap) + (1))) & 0xff);
        }
      }
      if (this.m_no_interrupt) {
        this.m_no_interrupt = ((((this.m_no_interrupt) - (1))) & 0xff);
      }
    }
    let op = ((this.method_fetch_op()) & 0xff);
    if (((Number(op) === Number(15)) ? 1 : 0)) {
      let nec_op = ((this.method_fetch()) & 0xff);
      if (((Number(nec_op) === Number(32)) ? 1 : 0)) {
        this.method_v30_add4s();
      }
    } else {
      if (((Number(op) === Number(15)) ? 1 : 0)) {
        this.m_sregs[1] = ((this.method_POP()) & 0xffff);
        this.method_CLK(84);
      } else {
        if (((Number(op) === Number(96)) ? 1 : 0)) {
          this.method_v30_pusha();
        } else {
          if (((Number(op) === Number(97)) ? 1 : 0)) {
            this.method_v30_popa();
          } else {
            if (((Number(op) === Number(192)) ? 1 : 0)) {
              this.method_v30_rotshft_bd8();
            } else {
              if (((Number(op) === Number(193)) ? 1 : 0)) {
                this.method_v30_rotshft_wd8();
              } else {
                if (((Number(op) === Number(210)) ? 1 : 0)) {
                  this.method_rotshft_bcl();
                } else {
                  if (((Number(op) === Number(211)) ? 1 : 0)) {
                    this.method_rotshft_wcl();
                  } else {
                    if ((((((Number(op) >= Number(216)) ? 1 : 0)) && (((Number(op) <= Number(223)) ? 1 : 0))) ? 1 : 0)) {
                      this.m_modrm = ((this.method_fetch()) & 0xff);
                      if (((Number(this.m_modrm) < Number(192)) ? 1 : 0)) {
                        this.method_get_ea(1, 0);
                      }
                      this.method_CLK(21);
                    } else {
                      this.method_common_op(op);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return ((((Number(this.cycles) > Number(0)) ? 1 : 0)) ? (this.cycles) : (1));
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
    const location = address & 1048575;
    if (false) return this.internalRam[location];
    return this.bus.read(location) & 0xff;
  }

  private writeMemory(address: number, value: number): void {
    const location = address & 1048575;
    const data = value & 0xff;
    if (false) {
      this.internalRam[location] = data;
      return;
    }
    this.bus.write(location, data);
  }

  private readOpcode(address: number): number {
    const location = address & 1048575;
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
      case "m_ip": return this.m_ip;
      case "m_prev_ip": return this.m_prev_ip;
      case "m_eo": return this.m_eo;
      case "m_TF": return this.m_TF;
      case "m_IF": return this.m_IF;
      case "m_DF": return this.m_DF;
      case "m_IOPL": return this.m_IOPL;
      case "m_NT": return this.m_NT;
      case "m_MF": return this.m_MF;
      case "m_no_interrupt": return this.m_no_interrupt;
      case "m_fire_trap": return this.m_fire_trap;
      case "m_test_state": return this.m_test_state;
      case "m_io_stall": return this.m_io_stall;
      case "m_seg_prefix": return this.m_seg_prefix;
      case "m_seg_prefix_next": return this.m_seg_prefix_next;
      case "m_modrm": return this.m_modrm;
      case "m_halt": return this.m_halt;
      case "m_lock": return this.m_lock;
      case "m_SignVal": return this.m_SignVal;
      case "m_icount": return this.m_icount;
      case "m_AuxVal": return this.m_AuxVal;
      case "m_OverVal": return this.m_OverVal;
      case "m_ZeroVal": return this.m_ZeroVal;
      case "m_CarryVal": return this.m_CarryVal;
      case "m_ParityVal": return this.m_ParityVal;
      case "m_int_vector": return this.m_int_vector;
      case "m_pending_irq": return this.m_pending_irq;
      case "m_nmi_state": return this.m_nmi_state;
      case "m_prefix_seg": return this.m_prefix_seg;
      case "m_ea": return this.m_ea;
      case "m_easeg": return this.m_easeg;
      case "m_dst": return this.m_dst;
      case "m_src": return this.m_src;
      case "m_pc": return this.m_pc;
      case "cycles": return this.cycles;
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
      case "m_ip": this.m_ip = ((value) & 0xffff); return;
      case "m_prev_ip": this.m_prev_ip = ((value) & 0xffff); return;
      case "m_eo": this.m_eo = ((value) & 0xffff); return;
      case "m_TF": this.m_TF = ((value) & 0xff); return;
      case "m_IF": this.m_IF = ((value) & 0xff); return;
      case "m_DF": this.m_DF = ((value) & 0xff); return;
      case "m_IOPL": this.m_IOPL = ((value) & 0xff); return;
      case "m_NT": this.m_NT = ((value) & 0xff); return;
      case "m_MF": this.m_MF = ((value) & 0xff); return;
      case "m_no_interrupt": this.m_no_interrupt = ((value) & 0xff); return;
      case "m_fire_trap": this.m_fire_trap = ((value) & 0xff); return;
      case "m_test_state": this.m_test_state = ((value) & 0xff); return;
      case "m_io_stall": this.m_io_stall = ((value) & 0xff); return;
      case "m_seg_prefix": this.m_seg_prefix = ((value) & 0xff); return;
      case "m_seg_prefix_next": this.m_seg_prefix_next = ((value) & 0xff); return;
      case "m_modrm": this.m_modrm = ((value) & 0xff); return;
      case "m_halt": this.m_halt = ((value) & 0xff); return;
      case "m_lock": this.m_lock = ((value) & 0xff); return;
      case "m_SignVal": this.m_SignVal = ((value) | 0); return;
      case "m_icount": this.m_icount = ((value) | 0); return;
      case "m_AuxVal": this.m_AuxVal = ((value) >>> 0); return;
      case "m_OverVal": this.m_OverVal = ((value) >>> 0); return;
      case "m_ZeroVal": this.m_ZeroVal = ((value) >>> 0); return;
      case "m_CarryVal": this.m_CarryVal = ((value) >>> 0); return;
      case "m_ParityVal": this.m_ParityVal = ((value) >>> 0); return;
      case "m_int_vector": this.m_int_vector = ((value) >>> 0); return;
      case "m_pending_irq": this.m_pending_irq = ((value) >>> 0); return;
      case "m_nmi_state": this.m_nmi_state = ((value) >>> 0); return;
      case "m_prefix_seg": this.m_prefix_seg = ((value) >>> 0); return;
      case "m_ea": this.m_ea = ((value) >>> 0); return;
      case "m_easeg": this.m_easeg = ((value) >>> 0); return;
      case "m_dst": this.m_dst = ((value) >>> 0); return;
      case "m_src": this.m_src = ((value) >>> 0); return;
      case "m_pc": this.m_pc = ((value) >>> 0); return;
      case "cycles": this.cycles = ((value) >>> 0); return;
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
      case "interrupt": return this.method_interrupt(args[0] ?? 0, args[1] ?? 0);
      case "calc_addr": return this.method_calc_addr(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0, args[3] ?? 0, args[4] ?? 0);
      case "common_op": return this.method_common_op(args[0] ?? 0);
      case "fetch_word": return this.method_fetch_word();
      case "repx_op": return this.method_repx_op();
      case "CLK": return this.method_CLK(args[0] ?? 0);
      case "CLKM": return this.method_CLKM(args[0] ?? 0, args[1] ?? 0);
      case "get_ea": return this.method_get_ea(args[0] ?? 0, args[1] ?? 0);
      case "PutbackRMByte": return this.method_PutbackRMByte(args[0] ?? 0);
      case "PutbackRMWord": return this.method_PutbackRMWord(args[0] ?? 0);
      case "PutImmRMWord": return this.method_PutImmRMWord();
      case "PutRMWord": return this.method_PutRMWord(args[0] ?? 0);
      case "PutRMByte": return this.method_PutRMByte(args[0] ?? 0);
      case "PutImmRMByte": return this.method_PutImmRMByte();
      case "DEF_br8": return this.method_DEF_br8();
      case "DEF_wr16": return this.method_DEF_wr16();
      case "DEF_r8b": return this.method_DEF_r8b();
      case "DEF_r16w": return this.method_DEF_r16w();
      case "DEF_ald8": return this.method_DEF_ald8();
      case "DEF_axd16": return this.method_DEF_axd16();
      case "RegByte":
        if (args.length === 1) return this.method_RegByte_1(args[0] ?? 0);
        if (args.length === 0) return this.method_RegByte_0();
        return this.method_RegByte_1(args[0] ?? 0);
      case "RegWord":
        if (args.length === 1) return this.method_RegWord_1(args[0] ?? 0);
        if (args.length === 0) return this.method_RegWord_0();
        return this.method_RegWord_1(args[0] ?? 0);
      case "GetRMWord": return this.method_GetRMWord();
      case "GetnextRMWord": return this.method_GetnextRMWord();
      case "GetRMByte": return this.method_GetRMByte();
      case "PutMemB": return this.method_PutMemB(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0);
      case "PutMemW": return this.method_PutMemW(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0);
      case "GetMemB": return this.method_GetMemB(args[0] ?? 0, args[1] ?? 0);
      case "GetMemW": return this.method_GetMemW(args[0] ?? 0, args[1] ?? 0);
      case "set_CFB": return this.method_set_CFB(args[0] ?? 0);
      case "set_CFW": return this.method_set_CFW(args[0] ?? 0);
      case "set_AF": return this.method_set_AF(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0);
      case "set_SF": return this.method_set_SF(args[0] ?? 0);
      case "set_ZF": return this.method_set_ZF(args[0] ?? 0);
      case "set_PF": return this.method_set_PF(args[0] ?? 0);
      case "set_SZPF_Byte": return this.method_set_SZPF_Byte(args[0] ?? 0);
      case "set_SZPF_Word": return this.method_set_SZPF_Word(args[0] ?? 0);
      case "set_OFW_Add": return this.method_set_OFW_Add(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0);
      case "set_OFB_Add": return this.method_set_OFB_Add(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0);
      case "set_OFW_Sub": return this.method_set_OFW_Sub(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0);
      case "set_OFB_Sub": return this.method_set_OFB_Sub(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0);
      case "CompressFlags": return this.method_CompressFlags();
      case "ExpandFlags": return this.method_ExpandFlags(args[0] ?? 0);
      case "i_insb": return this.method_i_insb();
      case "i_insw": return this.method_i_insw();
      case "i_outsb": return this.method_i_outsb();
      case "i_outsw": return this.method_i_outsw();
      case "i_movsb": return this.method_i_movsb();
      case "i_movsw": return this.method_i_movsw();
      case "i_cmpsb": return this.method_i_cmpsb();
      case "i_cmpsw": return this.method_i_cmpsw();
      case "i_stosb": return this.method_i_stosb();
      case "i_stosw": return this.method_i_stosw();
      case "i_lodsb": return this.method_i_lodsb();
      case "i_lodsw": return this.method_i_lodsw();
      case "i_scasb": return this.method_i_scasb();
      case "i_scasw": return this.method_i_scasw();
      case "i_popf": return this.method_i_popf();
      case "ADDB": return this.method_ADDB(args[0] ?? 0);
      case "ADDX": return this.method_ADDX(args[0] ?? 0);
      case "SUBB": return this.method_SUBB(args[0] ?? 0);
      case "SUBX": return this.method_SUBX(args[0] ?? 0);
      case "ORB": return this.method_ORB();
      case "ORW": return this.method_ORW();
      case "ANDB": return this.method_ANDB();
      case "ANDX": return this.method_ANDX();
      case "XORB": return this.method_XORB();
      case "XORW": return this.method_XORW();
      case "ROL_BYTE": return this.method_ROL_BYTE();
      case "ROL_WORD": return this.method_ROL_WORD();
      case "ROR_BYTE": return this.method_ROR_BYTE();
      case "ROR_WORD": return this.method_ROR_WORD();
      case "ROLC_BYTE": return this.method_ROLC_BYTE();
      case "ROLC_WORD": return this.method_ROLC_WORD();
      case "RORC_BYTE": return this.method_RORC_BYTE();
      case "RORC_WORD": return this.method_RORC_WORD();
      case "SHL_BYTE": return this.method_SHL_BYTE(args[0] ?? 0);
      case "SHL_WORD": return this.method_SHL_WORD(args[0] ?? 0);
      case "SHR_BYTE": return this.method_SHR_BYTE(args[0] ?? 0);
      case "SHR_WORD": return this.method_SHR_WORD(args[0] ?? 0);
      case "SHRA_BYTE": return this.method_SHRA_BYTE(args[0] ?? 0);
      case "SHRA_WORD": return this.method_SHRA_WORD(args[0] ?? 0);
      case "XchgAXReg": return this.method_XchgAXReg(args[0] ?? 0);
      case "IncWordReg": return this.method_IncWordReg(args[0] ?? 0);
      case "DecWordReg": return this.method_DecWordReg(args[0] ?? 0);
      case "PUSH": return this.method_PUSH(args[0] ?? 0);
      case "POP": return this.method_POP();
      case "JMP": return this.method_JMP(args[0] ?? 0);
      case "ADJ4": return this.method_ADJ4(args[0] ?? 0, args[1] ?? 0);
      case "ADJB": return this.method_ADJB(args[0] ?? 0, args[1] ?? 0);
      case "read_byte": return this.method_read_byte(args[0] ?? 0);
      case "read_word": return this.method_read_word(args[0] ?? 0);
      case "write_byte": return this.method_write_byte(args[0] ?? 0, args[1] ?? 0);
      case "write_word": return this.method_write_word(args[0] ?? 0, args[1] ?? 0);
      case "read_port_byte": return this.method_read_port_byte(args[0] ?? 0);
      case "read_port_word": return this.method_read_port_word(args[0] ?? 0);
      case "write_port_byte": return this.method_write_port_byte(args[0] ?? 0, args[1] ?? 0);
      case "write_port_byte_al": return this.method_write_port_byte_al(args[0] ?? 0);
      case "write_port_word": return this.method_write_port_word(args[0] ?? 0, args[1] ?? 0);
      case "update_pc": return this.method_update_pc();
      case "fetch": return this.method_fetch();
      case "fetch_op": return this.method_fetch_op();
      case "rotshft_bcl": return this.method_rotshft_bcl();
      case "rotshft_wcl": return this.method_rotshft_wcl();
      case "v30_pusha": return this.method_v30_pusha();
      case "v30_popa": return this.method_v30_popa();
      case "v30_rotshft_bd8": return this.method_v30_rotshft_bd8();
      case "v30_rotshft_wd8": return this.method_v30_rotshft_wd8();
      case "v30_add4s": return this.method_v30_add4s();
      default: throw new Error('V30 has no generated method "' + name + '"');
    }
  }

  private generatedStart(): void {

  }

  private generatedInput(inputnum: number, state: number): void {
    if (((Number(inputnum) === Number(-1)) ? 1 : 0)) {
      if (((((((((this.m_nmi_state) ? 0 : 1)) && (state)) ? 1 : 0)) && (1)) ? 1 : 0)) {
        this.m_pending_irq = ((((this.m_pending_irq) | (2))) >>> 0);
      }
      this.m_nmi_state = ((state) >>> 0);
    } else {
      if (((Number(inputnum) === Number(20)) ? 1 : 0)) {
        this.m_test_state = ((state) & 0xff);
      } else {
        if (((Number(state) === Number(0)) ? 1 : 0)) {
          this.m_pending_irq = ((((this.m_pending_irq) & ((~1)))) >>> 0);
        } else {
          this.m_pending_irq = ((((this.m_pending_irq) | (1))) >>> 0);
        }
      }
    }
  }

  private generatedService(): void {

  }

  private generatedFetch(): void {

  }

  private method_interrupt(int_num: number = 0, trap: number = 0): number {
    this.method_PUSH(this.method_CompressFlags());
    this.m_TF = ((0) & 0xff);
    this.m_IF = ((0) & 0xff);
    if (((Number(int_num) === Number((-1))) ? 1 : 0)) {
      int_num = ((this.acknowledgeIrq(0)) | 0);
    }
    this.m_easeg = ((1) >>> 0);
    let dest_off = ((this.method_read_word(((((int_num) * (4))) + (0)))) & 0xffff);
    let dest_seg = ((this.method_read_word(((((int_num) * (4))) + (2)))) & 0xffff);
    this.method_PUSH(this.m_sregs[1]);
    this.method_PUSH(this.m_ip);
    this.m_ip = ((dest_off) & 0xffff);
    this.m_prev_ip = ((this.m_ip) & 0xffff);
    this.m_sregs[1] = ((dest_seg) & 0xffff);
    return 0;
  }

  private method_calc_addr(seg: number = 0, offset: number = 0, size: number = 0, op: number = 0, override: number = 0): number {
    if (((((((this.m_seg_prefix) && ((((((Number(seg) === Number(3)) ? 1 : 0)) || (((Number(seg) === Number(2)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (override)) ? 1 : 0)) {
      this.m_easeg = ((this.m_seg_prefix) >>> 0);
      return ((((this.m_sregs[this.m_prefix_seg]) << (4))) + (offset));
    } else {
      this.m_easeg = ((seg) >>> 0);
      return ((((this.m_sregs[seg]) << (4))) + (offset));
    }
    return 0;
  }

  private method_common_op(op: number = 0): number {
    switch (op) {
      case 0:
        {
          this.method_DEF_br8();
          this.method_set_CFB(this.method_ADDB());
          this.method_PutbackRMByte(this.m_dst);
          this.method_CLKM(86, 88);
          break;
        }
      case 1:
        {
          this.method_DEF_wr16();
          this.method_set_CFW(this.method_ADDX());
          this.method_PutbackRMWord(this.m_dst);
          this.method_CLKM(92, 94);
          break;
        }
      case 2:
        {
          this.method_DEF_r8b();
          this.method_set_CFB(this.method_ADDB());
          this.method_RegByte_1(this.m_dst);
          this.method_CLKM(86, 87);
          break;
        }
      case 3:
        {
          this.method_DEF_r16w();
          this.method_set_CFW(this.method_ADDX());
          this.method_RegWord_1(this.m_dst);
          this.method_CLKM(92, 93);
          break;
        }
      case 4:
        {
          this.method_DEF_ald8();
          this.method_set_CFB(this.method_ADDB());
          this.m_regs.b[0] = this.m_dst;
          this.method_CLK(89);
          break;
        }
      case 5:
        {
          this.method_DEF_axd16();
          this.method_set_CFW(this.method_ADDX());
          this.m_regs.w[0] = this.m_dst;
          this.method_CLK(95);
          break;
        }
      case 6:
        {
          this.method_PUSH(this.m_sregs[0]);
          this.method_CLK(80);
          break;
        }
      case 7:
        {
          this.m_sregs[0] = ((this.method_POP()) & 0xffff);
          this.method_CLK(84);
          break;
        }
      case 8:
        {
          this.method_DEF_br8();
          this.method_ORB();
          this.method_PutbackRMByte(this.m_dst);
          this.method_CLKM(86, 88);
          break;
        }
      case 9:
        {
          this.method_DEF_wr16();
          this.method_ORW();
          this.method_PutbackRMWord(this.m_dst);
          this.method_CLKM(92, 94);
          break;
        }
      case 10:
        {
          this.method_DEF_r8b();
          this.method_ORB();
          this.method_RegByte_1(this.m_dst);
          this.method_CLKM(86, 87);
          break;
        }
      case 11:
        {
          this.method_DEF_r16w();
          this.method_ORW();
          this.method_RegWord_1(this.m_dst);
          this.method_CLKM(92, 93);
          break;
        }
      case 12:
        {
          this.method_DEF_ald8();
          this.method_ORB();
          this.m_regs.b[0] = this.m_dst;
          this.method_CLK(89);
          break;
        }
      case 13:
        {
          this.method_DEF_axd16();
          this.method_ORW();
          this.m_regs.w[0] = this.m_dst;
          this.method_CLK(95);
          break;
        }
      case 14:
        {
          this.method_PUSH(this.m_sregs[1]);
          this.method_CLK(80);
          break;
        }
      case 16:
        {
          this.method_DEF_br8();
          let tmpcf = ((this.method_ADDB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
          this.method_PutbackRMByte(this.m_dst);
          this.method_set_CFB(tmpcf);
          this.method_CLKM(86, 88);
          break;
        }
      case 17:
        {
          this.method_DEF_wr16();
          let tmpcf = ((this.method_ADDX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
          this.method_PutbackRMWord(this.m_dst);
          this.method_set_CFW(tmpcf);
          this.method_CLKM(92, 94);
          break;
        }
      case 18:
        {
          this.method_DEF_r8b();
          this.method_set_CFB(this.method_ADDB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
          this.method_RegByte_1(this.m_dst);
          this.method_CLKM(86, 87);
          break;
        }
      case 19:
        {
          this.method_DEF_r16w();
          this.method_set_CFW(this.method_ADDX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
          this.method_RegWord_1(this.m_dst);
          this.method_CLKM(92, 93);
          break;
        }
      case 20:
        {
          this.method_DEF_ald8();
          this.method_set_CFB(this.method_ADDB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
          this.m_regs.b[0] = this.m_dst;
          this.method_CLK(89);
          break;
        }
      case 21:
        {
          this.method_DEF_axd16();
          this.method_set_CFW(this.method_ADDX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
          this.m_regs.w[0] = this.m_dst;
          this.method_CLK(95);
          break;
        }
      case 22:
        {
          this.method_PUSH(this.m_sregs[2]);
          this.method_CLK(80);
          break;
        }
      case 23:
        {
          this.m_sregs[2] = ((this.method_POP()) & 0xffff);
          this.method_CLK(84);
          this.m_no_interrupt = ((1) & 0xff);
          break;
        }
      case 24:
        {
          this.method_DEF_br8();
          let tmpcf = ((this.method_SUBB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
          this.method_PutbackRMByte(this.m_dst);
          this.method_set_CFB(tmpcf);
          this.method_CLKM(86, 88);
          break;
        }
      case 25:
        {
          this.method_DEF_wr16();
          let tmpcf = ((this.method_SUBX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
          this.method_PutbackRMWord(this.m_dst);
          this.method_set_CFW(tmpcf);
          this.method_CLKM(92, 94);
          break;
        }
      case 26:
        {
          this.method_DEF_r8b();
          this.method_set_CFB(this.method_SUBB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
          this.method_RegByte_1(this.m_dst);
          this.method_CLKM(86, 87);
          break;
        }
      case 27:
        {
          this.method_DEF_r16w();
          this.method_set_CFW(this.method_SUBX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
          this.method_RegWord_1(this.m_dst);
          this.method_CLKM(92, 93);
          break;
        }
      case 28:
        {
          this.method_DEF_ald8();
          this.method_set_CFB(this.method_SUBB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
          this.m_regs.b[0] = this.m_dst;
          this.method_CLK(89);
          break;
        }
      case 29:
        {
          this.method_DEF_axd16();
          this.method_set_CFW(this.method_SUBX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
          this.m_regs.w[0] = this.m_dst;
          this.method_CLK(95);
          break;
        }
      case 30:
        {
          this.method_PUSH(this.m_sregs[3]);
          this.method_CLK(80);
          break;
        }
      case 31:
        {
          this.m_sregs[3] = ((this.method_POP()) & 0xffff);
          this.method_CLK(84);
          break;
        }
      case 32:
        {
          this.method_DEF_br8();
          this.method_ANDB();
          this.method_PutbackRMByte(this.m_dst);
          this.method_CLKM(86, 88);
          break;
        }
      case 33:
        {
          this.method_DEF_wr16();
          this.method_ANDX();
          this.method_PutbackRMWord(this.m_dst);
          this.method_CLKM(92, 94);
          break;
        }
      case 34:
        {
          this.method_DEF_r8b();
          this.method_ANDB();
          this.method_RegByte_1(this.m_dst);
          this.method_CLKM(86, 87);
          break;
        }
      case 35:
        {
          this.method_DEF_r16w();
          this.method_ANDX();
          this.method_RegWord_1(this.m_dst);
          this.method_CLKM(92, 93);
          break;
        }
      case 36:
        {
          this.method_DEF_ald8();
          this.method_ANDB();
          this.m_regs.b[0] = this.m_dst;
          this.method_CLK(89);
          break;
        }
      case 37:
        {
          this.method_DEF_axd16();
          this.method_ANDX();
          this.m_regs.w[0] = this.m_dst;
          this.method_CLK(95);
          break;
        }
      case 38:
        {
          this.m_seg_prefix_next = ((1) & 0xff);
          this.m_prefix_seg = ((0) >>> 0);
          this.method_CLK(6);
          break;
        }
      case 39:
        {
          this.method_ADJ4(6, 96);
          this.method_CLK(14);
          break;
        }
      case 40:
        {
          this.method_DEF_br8();
          this.method_set_CFB(this.method_SUBB());
          this.method_PutbackRMByte(this.m_dst);
          this.method_CLKM(86, 88);
          break;
        }
      case 41:
        {
          this.method_DEF_wr16();
          this.method_set_CFW(this.method_SUBX());
          this.method_PutbackRMWord(this.m_dst);
          this.method_CLKM(92, 94);
          break;
        }
      case 42:
        {
          this.method_DEF_r8b();
          this.method_set_CFB(this.method_SUBB());
          this.method_RegByte_1(this.m_dst);
          this.method_CLKM(86, 87);
          break;
        }
      case 43:
        {
          this.method_DEF_r16w();
          this.method_set_CFW(this.method_SUBX());
          this.method_RegWord_1(this.m_dst);
          this.method_CLKM(92, 93);
          break;
        }
      case 44:
        {
          this.method_DEF_ald8();
          this.method_set_CFB(this.method_SUBB());
          this.m_regs.b[0] = this.m_dst;
          this.method_CLK(89);
          break;
        }
      case 45:
        {
          this.method_DEF_axd16();
          this.method_set_CFW(this.method_SUBX());
          this.m_regs.w[0] = this.m_dst;
          this.method_CLK(95);
          break;
        }
      case 46:
        {
          this.m_seg_prefix_next = ((1) & 0xff);
          this.m_prefix_seg = ((1) >>> 0);
          this.method_CLK(6);
          break;
        }
      case 47:
        {
          this.method_ADJ4((-6), (-96));
          this.method_CLK(15);
          break;
        }
      case 48:
        {
          this.method_DEF_br8();
          this.method_XORB();
          this.method_PutbackRMByte(this.m_dst);
          this.method_CLKM(86, 88);
          break;
        }
      case 49:
        {
          this.method_DEF_wr16();
          this.method_XORW();
          this.method_PutbackRMWord(this.m_dst);
          this.method_CLKM(92, 93);
          break;
        }
      case 50:
        {
          this.method_DEF_r8b();
          this.method_XORB();
          this.method_RegByte_1(this.m_dst);
          this.method_CLKM(86, 87);
          break;
        }
      case 51:
        {
          this.method_DEF_r16w();
          this.method_XORW();
          this.method_RegWord_1(this.m_dst);
          this.method_CLKM(92, 93);
          break;
        }
      case 52:
        {
          this.method_DEF_ald8();
          this.method_XORB();
          this.m_regs.b[0] = this.m_dst;
          this.method_CLK(89);
          break;
        }
      case 53:
        {
          this.method_DEF_axd16();
          this.method_XORW();
          this.m_regs.w[0] = this.m_dst;
          this.method_CLK(95);
          break;
        }
      case 54:
        {
          this.m_seg_prefix_next = ((1) & 0xff);
          this.m_prefix_seg = ((2) >>> 0);
          this.method_CLK(6);
          break;
        }
      case 55:
        {
          this.method_ADJB(6, ((((Number(this.m_regs.b[0]) > Number(249)) ? 1 : 0)) ? (2) : (1)));
          this.method_CLK(10);
          break;
        }
      case 56:
        {
          this.method_DEF_br8();
          this.method_set_CFB(this.method_SUBB());
          this.method_CLKM(86, 87);
          break;
        }
      case 57:
        {
          this.method_DEF_wr16();
          this.method_set_CFW(this.method_SUBX());
          this.method_CLKM(92, 93);
          break;
        }
      case 58:
        {
          this.method_DEF_r8b();
          this.method_set_CFB(this.method_SUBB());
          this.method_CLKM(86, 87);
          break;
        }
      case 59:
        {
          this.method_DEF_r16w();
          this.method_set_CFW(this.method_SUBX());
          this.method_CLKM(92, 93);
          break;
        }
      case 60:
        {
          this.method_DEF_ald8();
          this.method_set_CFB(this.method_SUBB());
          this.method_CLK(89);
          break;
        }
      case 61:
        {
          this.method_DEF_axd16();
          this.method_set_CFW(this.method_SUBX());
          this.method_CLK(95);
          break;
        }
      case 62:
        {
          this.m_seg_prefix_next = ((1) & 0xff);
          this.m_prefix_seg = ((3) >>> 0);
          this.method_CLK(6);
          break;
        }
      case 63:
        {
          this.method_ADJB((-6), ((((Number(this.m_regs.b[0]) < Number(6)) ? 1 : 0)) ? ((-2)) : ((-1))));
          this.method_CLK(11);
          break;
        }
      case 64:
        {
          this.method_IncWordReg(0);
          this.method_CLK(118);
          break;
        }
      case 65:
        {
          this.method_IncWordReg(1);
          this.method_CLK(118);
          break;
        }
      case 66:
        {
          this.method_IncWordReg(2);
          this.method_CLK(118);
          break;
        }
      case 67:
        {
          this.method_IncWordReg(3);
          this.method_CLK(118);
          break;
        }
      case 68:
        {
          this.method_IncWordReg(4);
          this.method_CLK(118);
          break;
        }
      case 69:
        {
          this.method_IncWordReg(5);
          this.method_CLK(118);
          break;
        }
      case 70:
        {
          this.method_IncWordReg(6);
          this.method_CLK(118);
          break;
        }
      case 71:
        {
          this.method_IncWordReg(7);
          this.method_CLK(118);
          break;
        }
      case 72:
        {
          this.method_DecWordReg(0);
          this.method_CLK(118);
          break;
        }
      case 73:
        {
          this.method_DecWordReg(1);
          this.method_CLK(118);
          break;
        }
      case 74:
        {
          this.method_DecWordReg(2);
          this.method_CLK(118);
          break;
        }
      case 75:
        {
          this.method_DecWordReg(3);
          this.method_CLK(118);
          break;
        }
      case 76:
        {
          this.method_DecWordReg(4);
          this.method_CLK(118);
          break;
        }
      case 77:
        {
          this.method_DecWordReg(5);
          this.method_CLK(118);
          break;
        }
      case 78:
        {
          this.method_DecWordReg(6);
          this.method_CLK(118);
          break;
        }
      case 79:
        {
          this.method_DecWordReg(7);
          this.method_CLK(118);
          break;
        }
      case 80:
        {
          this.method_PUSH(this.m_regs.w[0]);
          this.method_CLK(78);
          break;
        }
      case 81:
        {
          this.method_PUSH(this.m_regs.w[1]);
          this.method_CLK(78);
          break;
        }
      case 82:
        {
          this.method_PUSH(this.m_regs.w[2]);
          this.method_CLK(78);
          break;
        }
      case 83:
        {
          this.method_PUSH(this.m_regs.w[3]);
          this.method_CLK(78);
          break;
        }
      case 84:
        {
          this.method_PUSH(((this.m_regs.w[4]) - (2)));
          this.method_CLK(78);
          break;
        }
      case 85:
        {
          this.method_PUSH(this.m_regs.w[5]);
          this.method_CLK(78);
          break;
        }
      case 86:
        {
          this.method_PUSH(this.m_regs.w[6]);
          this.method_CLK(78);
          break;
        }
      case 87:
        {
          this.method_PUSH(this.m_regs.w[7]);
          this.method_CLK(78);
          break;
        }
      case 88:
        {
          this.m_regs.w[0] = this.method_POP();
          this.method_CLK(82);
          break;
        }
      case 89:
        {
          this.m_regs.w[1] = this.method_POP();
          this.method_CLK(82);
          break;
        }
      case 90:
        {
          this.m_regs.w[2] = this.method_POP();
          this.method_CLK(82);
          break;
        }
      case 91:
        {
          this.m_regs.w[3] = this.method_POP();
          this.method_CLK(82);
          break;
        }
      case 92:
        {
          this.m_regs.w[4] = this.method_POP();
          this.method_CLK(82);
          break;
        }
      case 93:
        {
          this.m_regs.w[5] = this.method_POP();
          this.method_CLK(82);
          break;
        }
      case 94:
        {
          this.m_regs.w[6] = this.method_POP();
          this.method_CLK(82);
          break;
        }
      case 95:
        {
          this.m_regs.w[7] = this.method_POP();
          this.method_CLK(82);
          break;
        }
      case 96:
      case 112:
        {
          this.method_JMP(((Number(this.m_OverVal) !== Number(0)) ? 1 : 0));
          break;
        }
      case 97:
      case 113:
        {
          this.method_JMP(((((Number(this.m_OverVal) !== Number(0)) ? 1 : 0)) ? 0 : 1));
          break;
        }
      case 98:
      case 114:
        {
          this.method_JMP(((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0));
          break;
        }
      case 99:
      case 115:
        {
          this.method_JMP(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? 0 : 1));
          break;
        }
      case 100:
      case 116:
        {
          this.method_JMP(((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0));
          break;
        }
      case 101:
      case 117:
        {
          this.method_JMP(((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? 0 : 1));
          break;
        }
      case 102:
      case 118:
        {
          this.method_JMP((((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) || (((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0))) ? 1 : 0));
          break;
        }
      case 103:
      case 119:
        {
          this.method_JMP((((((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) || (((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1));
          break;
        }
      case 104:
      case 120:
        {
          this.method_JMP(((Number(this.m_SignVal) < Number(0)) ? 1 : 0));
          break;
        }
      case 105:
      case 121:
        {
          this.method_JMP(((((Number(this.m_SignVal) < Number(0)) ? 1 : 0)) ? 0 : 1));
          break;
        }
      case 106:
      case 122:
        {
          this.method_JMP(((Number(this.m_parity_table[((this.m_ParityVal) & 0xff)]) !== Number(0)) ? 1 : 0));
          break;
        }
      case 107:
      case 123:
        {
          this.method_JMP(((((Number(this.m_parity_table[((this.m_ParityVal) & 0xff)]) !== Number(0)) ? 1 : 0)) ? 0 : 1));
          break;
        }
      case 108:
      case 124:
        {
          this.method_JMP((((((Number(((Number(this.m_SignVal) < Number(0)) ? 1 : 0)) !== Number(((Number(this.m_OverVal) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0));
          break;
        }
      case 109:
      case 125:
        {
          this.method_JMP(((Number(((Number(this.m_SignVal) < Number(0)) ? 1 : 0)) === Number(((Number(this.m_OverVal) !== Number(0)) ? 1 : 0))) ? 1 : 0));
          break;
        }
      case 110:
      case 126:
        {
          this.method_JMP((((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) || (((Number(((Number(this.m_SignVal) < Number(0)) ? 1 : 0)) !== Number(((Number(this.m_OverVal) !== Number(0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0));
          break;
        }
      case 111:
      case 127:
        {
          this.method_JMP((((((Number(((Number(this.m_SignVal) < Number(0)) ? 1 : 0)) === Number(((Number(this.m_OverVal) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0));
          break;
        }
      case 128:
        {
          let tmpcf = 0;
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_dst = ((this.method_GetRMByte()) >>> 0);
          this.m_src = ((this.method_fetch()) >>> 0);
          if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
            this.method_CLK(89);
          } else {
            if (((Number(((this.m_modrm) & (56))) === Number(56)) ? 1 : 0)) {
              this.method_CLK(91);
            } else {
              this.method_CLK(90);
            }
          }
          switch (((this.m_modrm) & (56))) {
            case 0:
              {
                this.method_set_CFB(this.method_ADDB());
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 8:
              {
                this.method_ORB();
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 16:
              {
                tmpcf = ((this.method_ADDB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                this.method_PutbackRMByte(this.m_dst);
                this.method_set_CFB(tmpcf);
                break;
              }
            case 24:
              {
                tmpcf = ((this.method_SUBB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                this.method_PutbackRMByte(this.m_dst);
                this.method_set_CFB(tmpcf);
                break;
              }
            case 32:
              {
                this.method_ANDB();
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 40:
              {
                this.method_set_CFB(this.method_SUBB());
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 48:
              {
                this.method_XORB();
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 56:
              {
                this.method_set_CFB(this.method_SUBB());
                break;
              }
          }
          break;
        }
      case 129:
        {
          let tmpcf = 0;
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_dst = ((this.method_GetRMWord()) >>> 0);
          this.m_src = ((this.method_fetch_word()) >>> 0);
          if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
            this.method_CLK(95);
          } else {
            if (((Number(((this.m_modrm) & (56))) === Number(56)) ? 1 : 0)) {
              this.method_CLK(97);
            } else {
              this.method_CLK(96);
            }
          }
          switch (((this.m_modrm) & (56))) {
            case 0:
              {
                this.method_set_CFW(this.method_ADDX());
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 8:
              {
                this.method_ORW();
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 16:
              {
                tmpcf = ((this.method_ADDX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                this.method_PutbackRMWord(this.m_dst);
                this.method_set_CFW(tmpcf);
                break;
              }
            case 24:
              {
                tmpcf = ((this.method_SUBX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                this.method_PutbackRMWord(this.m_dst);
                this.method_set_CFW(tmpcf);
                break;
              }
            case 32:
              {
                this.method_ANDX();
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 40:
              {
                this.method_set_CFW(this.method_SUBX());
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 48:
              {
                this.method_XORW();
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 56:
              {
                this.method_set_CFW(this.method_SUBX());
                break;
              }
          }
          break;
        }
      case 130:
        {
          let tmpcf = 0;
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_dst = ((this.method_GetRMByte()) >>> 0);
          this.m_src = (((((this.method_fetch()) << 24) >> 24)) >>> 0);
          if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
            this.method_CLK(89);
          } else {
            if (((Number(((this.m_modrm) & (56))) === Number(56)) ? 1 : 0)) {
              this.method_CLK(91);
            } else {
              this.method_CLK(90);
            }
          }
          switch (((this.m_modrm) & (56))) {
            case 0:
              {
                this.method_set_CFB(this.method_ADDB());
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 8:
              {
                this.method_ORB();
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 16:
              {
                tmpcf = ((this.method_ADDB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                this.method_PutbackRMByte(this.m_dst);
                this.method_set_CFB(tmpcf);
                break;
              }
            case 24:
              {
                tmpcf = ((this.method_SUBB(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                this.method_PutbackRMByte(this.m_dst);
                this.method_set_CFB(tmpcf);
                break;
              }
            case 32:
              {
                this.method_ANDB();
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 40:
              {
                this.method_set_CFB(this.method_SUBB());
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 48:
              {
                this.method_XORB();
                this.method_PutbackRMByte(this.m_dst);
                break;
              }
            case 56:
              {
                this.method_set_CFB(this.method_SUBB());
                break;
              }
          }
          break;
        }
      case 131:
        {
          let tmpcf = 0;
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_dst = ((this.method_GetRMWord()) >>> 0);
          this.m_src = ((((((((((this.method_fetch()) << 24) >> 24)) << 16) >> 16)) & 0xffff)) >>> 0);
          if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
            this.method_CLK(98);
          } else {
            if (((Number(((this.m_modrm) & (56))) === Number(56)) ? 1 : 0)) {
              this.method_CLK(100);
            } else {
              this.method_CLK(99);
            }
          }
          switch (((this.m_modrm) & (56))) {
            case 0:
              {
                this.method_set_CFW(this.method_ADDX());
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 8:
              {
                this.method_ORW();
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 16:
              {
                tmpcf = ((this.method_ADDX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                this.method_PutbackRMWord(this.m_dst);
                this.method_set_CFW(tmpcf);
                break;
              }
            case 24:
              {
                tmpcf = ((this.method_SUBX(((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                this.method_PutbackRMWord(this.m_dst);
                this.method_set_CFW(tmpcf);
                break;
              }
            case 32:
              {
                this.method_ANDX();
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 40:
              {
                this.method_set_CFW(this.method_SUBX());
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 48:
              {
                this.method_XORW();
                this.method_PutbackRMWord(this.m_dst);
                break;
              }
            case 56:
              {
                this.method_set_CFW(this.method_SUBX());
                break;
              }
          }
          break;
        }
      case 132:
        {
          this.method_DEF_br8();
          this.method_ANDB();
          this.method_CLKM(86, 87);
          break;
        }
      case 133:
        {
          this.method_DEF_wr16();
          this.method_ANDX();
          this.method_CLKM(92, 93);
          break;
        }
      case 134:
        {
          this.method_DEF_br8();
          this.method_RegByte_1(this.m_dst);
          this.method_PutbackRMByte(this.m_src);
          this.method_CLKM(73, 74);
          break;
        }
      case 135:
        {
          this.method_DEF_wr16();
          this.method_RegWord_1(this.m_dst);
          this.method_PutbackRMWord(this.m_src);
          this.method_CLKM(75, 76);
          break;
        }
      case 136:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_src = ((this.method_RegByte_0()) >>> 0);
          this.method_PutRMByte(this.m_src);
          this.method_CLKM(55, 57);
          break;
        }
      case 137:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_src = ((this.method_RegWord_0()) >>> 0);
          this.method_PutRMWord(this.m_src);
          this.method_CLKM(60, 62);
          break;
        }
      case 138:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_src = ((this.method_GetRMByte()) >>> 0);
          this.method_RegByte_1(this.m_src);
          this.method_CLKM(55, 56);
          break;
        }
      case 139:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_src = ((this.method_GetRMWord()) >>> 0);
          this.method_RegWord_1(this.m_src);
          this.method_CLKM(60, 61);
          break;
        }
      case 140:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.method_PutRMWord(this.m_sregs[((((this.m_modrm) & (24))) >>> (3))]);
          this.method_CLKM(71, 72);
          break;
        }
      case 141:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.method_get_ea(0, 3);
          this.method_RegWord_1(this.m_eo);
          this.method_CLK(20);
          break;
        }
      case 142:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_src = ((this.method_GetRMWord()) >>> 0);
          this.m_sregs[((((this.m_modrm) & (24))) >>> (3))] = ((this.m_src) & 0xffff);
          this.method_CLKM(69, 70);
          this.m_no_interrupt = ((1) & 0xff);
          break;
        }
      case 143:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.method_PutRMWord(this.method_POP());
          this.method_CLKM(82, 83);
          break;
        }
      case 144:
        {
          this.method_CLK(21);
          break;
        }
      case 145:
        {
          this.method_XchgAXReg(1);
          this.method_CLK(77);
          break;
        }
      case 146:
        {
          this.method_XchgAXReg(2);
          this.method_CLK(77);
          break;
        }
      case 147:
        {
          this.method_XchgAXReg(3);
          this.method_CLK(77);
          break;
        }
      case 148:
        {
          this.method_XchgAXReg(4);
          this.method_CLK(77);
          break;
        }
      case 149:
        {
          this.method_XchgAXReg(5);
          this.method_CLK(77);
          break;
        }
      case 150:
        {
          this.method_XchgAXReg(6);
          this.method_CLK(77);
          break;
        }
      case 151:
        {
          this.method_XchgAXReg(7);
          this.method_CLK(77);
          break;
        }
      case 152:
        {
          this.m_regs.b[1] = ((((this.m_regs.b[0]) & (128))) ? (255) : (0));
          this.method_CLK(16);
          break;
        }
      case 153:
        {
          this.m_regs.w[2] = ((((this.m_regs.b[1]) & (128))) ? (65535) : (0));
          this.method_CLK(17);
          break;
        }
      case 154:
        {
          let tmp = ((this.method_fetch_word()) & 0xffff);
          let tmp2 = ((this.method_fetch_word()) & 0xffff);
          this.method_PUSH(this.m_sregs[1]);
          this.method_PUSH(this.m_ip);
          this.m_ip = ((tmp) & 0xffff);
          this.m_sregs[1] = ((tmp2) & 0xffff);
          this.method_CLK(31);
          break;
        }
      case 155:
        {
          if (((Number(this.m_test_state) === Number(0)) ? 1 : 0)) {
            this.m_icount = ((0) | 0);
            this.m_ip = ((((this.m_ip) - (1))) & 0xffff);
          } else {
            this.method_CLK(22);
          }
          break;
        }
      case 156:
        {
          this.method_PUSH(this.method_CompressFlags());
          this.method_CLK(81);
          break;
        }
      case 157:
        {
          this.method_i_popf();
          break;
        }
      case 158:
        {
          let tmp = ((((((this.method_CompressFlags()) & (65280))) | (((this.m_regs.b[1]) & (213))))) >>> 0);
          this.method_ExpandFlags(tmp);
          this.method_CLK(9);
          break;
        }
      case 159:
        {
          this.m_regs.b[1] = this.method_CompressFlags();
          this.method_CLK(8);
          break;
        }
      case 160:
        {
          let addr = ((this.method_fetch_word()) >>> 0);
          this.m_regs.b[0] = this.method_GetMemB(3, addr);
          this.method_CLK(65);
          break;
        }
      case 161:
        {
          let addr = ((this.method_fetch_word()) >>> 0);
          this.m_regs.w[0] = this.method_GetMemW(3, addr);
          this.method_CLK(66);
          break;
        }
      case 162:
        {
          let addr = ((this.method_fetch_word()) >>> 0);
          this.method_PutMemB(3, addr, this.m_regs.b[0]);
          this.method_CLK(67);
          break;
        }
      case 163:
        {
          let addr = ((this.method_fetch_word()) >>> 0);
          this.method_PutMemW(3, addr, this.m_regs.w[0]);
          this.method_CLK(68);
          break;
        }
      case 164:
        {
          this.method_i_movsb();
          break;
        }
      case 165:
        {
          this.method_i_movsw();
          break;
        }
      case 166:
        {
          this.method_i_cmpsb();
          break;
        }
      case 167:
        {
          this.method_i_cmpsw();
          break;
        }
      case 168:
        {
          this.method_DEF_ald8();
          this.method_ANDB();
          this.method_CLK(89);
          break;
        }
      case 169:
        {
          this.method_DEF_axd16();
          this.method_ANDX();
          this.method_CLK(95);
          break;
        }
      case 170:
        {
          this.method_i_stosb();
          break;
        }
      case 171:
        {
          this.method_i_stosw();
          break;
        }
      case 172:
        {
          this.method_i_lodsb();
          break;
        }
      case 173:
        {
          this.method_i_lodsw();
          break;
        }
      case 174:
        {
          this.method_i_scasb();
          break;
        }
      case 175:
        {
          this.method_i_scasw();
          break;
        }
      case 176:
        {
          this.m_regs.b[0] = this.method_fetch();
          this.method_CLK(58);
          break;
        }
      case 177:
        {
          this.m_regs.b[2] = this.method_fetch();
          this.method_CLK(58);
          break;
        }
      case 178:
        {
          this.m_regs.b[4] = this.method_fetch();
          this.method_CLK(58);
          break;
        }
      case 179:
        {
          this.m_regs.b[6] = this.method_fetch();
          this.method_CLK(58);
          break;
        }
      case 180:
        {
          this.m_regs.b[1] = this.method_fetch();
          this.method_CLK(58);
          break;
        }
      case 181:
        {
          this.m_regs.b[3] = this.method_fetch();
          this.method_CLK(58);
          break;
        }
      case 182:
        {
          this.m_regs.b[5] = this.method_fetch();
          this.method_CLK(58);
          break;
        }
      case 183:
        {
          this.m_regs.b[7] = this.method_fetch();
          this.method_CLK(58);
          break;
        }
      case 184:
        {
          this.m_regs.b[0] = this.method_fetch();
          this.m_regs.b[1] = this.method_fetch();
          this.method_CLK(63);
          break;
        }
      case 185:
        {
          this.m_regs.b[2] = this.method_fetch();
          this.m_regs.b[3] = this.method_fetch();
          this.method_CLK(63);
          break;
        }
      case 186:
        {
          this.m_regs.b[4] = this.method_fetch();
          this.m_regs.b[5] = this.method_fetch();
          this.method_CLK(63);
          break;
        }
      case 187:
        {
          this.m_regs.b[6] = this.method_fetch();
          this.m_regs.b[7] = this.method_fetch();
          this.method_CLK(63);
          break;
        }
      case 188:
        {
          this.m_regs.b[8] = this.method_fetch();
          this.m_regs.b[9] = this.method_fetch();
          this.method_CLK(63);
          break;
        }
      case 189:
        {
          this.m_regs.b[10] = this.method_fetch();
          this.m_regs.b[11] = this.method_fetch();
          this.method_CLK(63);
          break;
        }
      case 190:
        {
          this.m_regs.b[12] = this.method_fetch();
          this.m_regs.b[13] = this.method_fetch();
          this.method_CLK(63);
          break;
        }
      case 191:
        {
          this.m_regs.b[14] = this.method_fetch();
          this.m_regs.b[15] = this.method_fetch();
          this.method_CLK(63);
          break;
        }
      case 192:
      case 194:
        {
          let count = ((this.method_fetch_word()) >>> 0);
          this.m_ip = ((this.method_POP()) & 0xffff);
          this.m_regs.w[4] = ((this.m_regs.w[4]) + (count));
          this.method_CLK(37);
          break;
        }
      case 193:
      case 195:
        {
          this.m_ip = ((this.method_POP()) & 0xffff);
          this.method_CLK(35);
          break;
        }
      case 196:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.method_RegWord_1(this.method_GetRMWord());
          this.m_sregs[0] = ((this.method_GetnextRMWord()) & 0xffff);
          this.method_CLK(19);
          break;
        }
      case 197:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.method_RegWord_1(this.method_GetRMWord());
          this.m_sregs[3] = ((this.method_GetnextRMWord()) & 0xffff);
          this.method_CLK(19);
          break;
        }
      case 198:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.method_PutImmRMByte();
          this.method_CLKM(58, 59);
          break;
        }
      case 199:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.method_PutImmRMWord();
          this.method_CLKM(63, 64);
          break;
        }
      case 200:
      case 202:
        {
          let count = ((this.method_fetch_word()) >>> 0);
          this.m_ip = ((this.method_POP()) & 0xffff);
          this.m_sregs[1] = ((this.method_POP()) & 0xffff);
          this.m_regs.w[4] = ((this.m_regs.w[4]) + (count));
          this.method_CLK(38);
          break;
        }
      case 201:
      case 203:
        {
          this.m_ip = ((this.method_POP()) & 0xffff);
          this.m_sregs[1] = ((this.method_POP()) & 0xffff);
          this.method_CLK(36);
          break;
        }
      case 204:
        {
          this.method_interrupt(3, 0);
          this.method_CLK(2);
          break;
        }
      case 205:
        {
          this.method_interrupt(this.method_fetch(), 0);
          this.method_CLK(3);
          break;
        }
      case 206:
        {
          if (((Number(this.m_OverVal) !== Number(0)) ? 1 : 0)) {
            this.method_interrupt(4, 0);
            this.method_CLK(5);
          } else {
            this.method_CLK(4);
          }
          break;
        }
      case 207:
        {
          this.m_ip = ((this.method_POP()) & 0xffff);
          this.m_sregs[1] = ((this.method_POP()) & 0xffff);
          this.method_i_popf();
          this.method_CLK(1);
          break;
        }
      case 208:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_src = ((this.method_GetRMByte()) >>> 0);
          this.m_dst = ((this.m_src) >>> 0);
          this.method_CLKM(125, 128);
          switch (((this.m_modrm) & (56))) {
            case 0:
              {
                this.method_ROL_BYTE();
                this.method_PutbackRMByte(this.m_dst);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (128))) >>> 0);
                break;
              }
            case 8:
              {
                this.method_ROR_BYTE();
                this.method_PutbackRMByte(this.m_dst);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (128))) >>> 0);
                break;
              }
            case 16:
              {
                this.method_ROLC_BYTE();
                this.method_PutbackRMByte(this.m_dst);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (128))) >>> 0);
                break;
              }
            case 24:
              {
                this.method_RORC_BYTE();
                this.method_PutbackRMByte(this.m_dst);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (128))) >>> 0);
                break;
              }
            case 48:
            case 32:
              {
                this.method_SHL_BYTE(1);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (128))) >>> 0);
                break;
              }
            case 40:
              {
                this.method_SHR_BYTE(1);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (128))) >>> 0);
                break;
              }
            case 56:
              {
                this.method_SHRA_BYTE(1);
                this.m_OverVal = ((0) >>> 0);
                break;
              }
          }
          break;
        }
      case 209:
        {
          this.m_modrm = ((this.method_fetch()) & 0xff);
          this.m_src = ((this.method_GetRMWord()) >>> 0);
          this.m_dst = ((this.m_src) >>> 0);
          this.method_CLKM(125, 128);
          switch (((this.m_modrm) & (56))) {
            case 0:
              {
                this.method_ROL_WORD();
                this.method_PutbackRMWord(this.m_dst);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (32768))) >>> 0);
                break;
              }
            case 8:
              {
                this.method_ROR_WORD();
                this.method_PutbackRMWord(this.m_dst);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (32768))) >>> 0);
                break;
              }
            case 16:
              {
                this.method_ROLC_WORD();
                this.method_PutbackRMWord(this.m_dst);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (32768))) >>> 0);
                break;
              }
            case 24:
              {
                this.method_RORC_WORD();
                this.method_PutbackRMWord(this.m_dst);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (32768))) >>> 0);
                break;
              }
            case 48:
            case 32:
              {
                this.method_SHL_WORD(1);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (32768))) >>> 0);
                break;
              }
            case 40:
              {
                this.method_SHR_WORD(1);
                this.m_OverVal = ((((((this.m_src) ^ (this.m_dst))) & (32768))) >>> 0);
                break;
              }
            case 56:
              {
                this.method_SHRA_WORD(1);
                this.m_OverVal = ((0) >>> 0);
                break;
              }
          }
          break;
        }
      case 212:
        {
          let base = ((this.method_fetch()) & 0xff);
          if (((base) ? 0 : 1)) {
            this.method_interrupt(0);
            break;
          }
          this.m_regs.b[1] = Math.trunc((this.m_regs.b[0]) / (base));
          this.m_regs.b[0] = ((this.m_regs.b[0]) % (base));
          this.method_set_SZPF_Word(this.m_regs.w[0]);
          this.method_CLK(12);
          break;
        }
      case 213:
        {
          let base = ((this.method_fetch()) & 0xff);
          this.m_regs.b[0] = ((((this.m_regs.b[1]) * (base))) + (this.m_regs.b[0]));
          this.m_regs.b[1] = 0;
          this.method_set_SZPF_Byte(this.m_regs.b[0]);
          this.method_CLK(13);
          break;
        }
      case 214:
        {
          this.m_regs.b[0] = ((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (255) : (0));
          this.method_CLK(86);
          break;
        }
      case 215:
        {
          this.m_regs.b[0] = this.method_GetMemB(3, ((this.m_regs.w[3]) + (this.m_regs.b[0])));
          this.method_CLK(23);
          break;
        }
      case 224:
        {
          let disp = ((((((this.method_fetch()) << 24) >> 24)) << 24) >> 24);
          this.m_regs.w[1] = ((this.m_regs.w[1]) - (1));
          if ((((((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? 0 : 1)) && (this.m_regs.w[1])) ? 1 : 0)) {
            this.m_ip = ((((this.m_ip) + (disp))) & 0xffff);
            this.method_CLK(44);
          } else {
            this.method_CLK(43);
          }
          break;
        }
      case 225:
        {
          let disp = ((((((this.method_fetch()) << 24) >> 24)) << 24) >> 24);
          this.m_regs.w[1] = ((this.m_regs.w[1]) - (1));
          if ((((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) && (this.m_regs.w[1])) ? 1 : 0)) {
            this.m_ip = ((((this.m_ip) + (disp))) & 0xffff);
            this.method_CLK(46);
          } else {
            this.method_CLK(45);
          }
          break;
        }
      case 226:
        {
          let disp = ((((((this.method_fetch()) << 24) >> 24)) << 24) >> 24);
          this.m_regs.w[1] = ((this.m_regs.w[1]) - (1));
          if (this.m_regs.w[1]) {
            this.m_ip = ((((this.m_ip) + (disp))) & 0xffff);
            this.method_CLK(44);
          } else {
            this.method_CLK(43);
          }
          break;
        }
      case 227:
        {
          let disp = ((((((this.method_fetch()) << 24) >> 24)) << 24) >> 24);
          if (((Number(this.m_regs.w[1]) === Number(0)) ? 1 : 0)) {
            this.m_ip = ((((this.m_ip) + (disp))) & 0xffff);
            this.method_CLK(42);
          } else {
            this.method_CLK(41);
          }
          break;
        }
      case 228:
        {
          let v = ((this.method_read_port_byte(this.method_fetch())) & 0xff);
          if (this.m_lock) {
            this.m_lock = ((0) & 0xff);
          }
          if (0) {
            this.m_ip = ((this.m_prev_ip) & 0xffff);
            this.cycles = ((((this.cycles) + (4))) >>> 0);
            break;
          }
          this.m_regs.b[0] = v;
          this.method_CLK(47);
          break;
        }
      case 229:
        {
          let port = ((this.method_fetch()) & 0xff);
          let v = ((this.method_read_port_word(port)) & 0xffff);
          if (0) {
            this.m_ip = ((this.m_prev_ip) & 0xffff);
            this.cycles = ((((this.cycles) + (4))) >>> 0);
            break;
          }
          this.m_regs.w[0] = v;
          this.method_CLK(48);
          break;
        }
      case 230:
        {
          this.method_write_port_byte_al(this.method_fetch());
          if (0) {
            this.m_ip = ((this.m_prev_ip) & 0xffff);
            this.cycles = ((((this.cycles) + (4))) >>> 0);
            break;
          }
          this.method_CLK(51);
          break;
        }
      case 231:
        {
          let port = ((this.method_fetch()) & 0xff);
          this.method_write_port_word(port, this.m_regs.w[0]);
          if (0) {
            this.m_ip = ((this.m_prev_ip) & 0xffff);
            this.cycles = ((((this.cycles) + (4))) >>> 0);
            break;
          }
          this.method_CLK(52);
          break;
        }
      case 232:
        {
          let tmp = ((((((this.method_fetch_word()) << 16) >> 16)) << 16) >> 16);
          this.method_PUSH(this.m_ip);
          this.m_ip = ((((this.m_ip) + (tmp))) & 0xffff);
          this.method_CLK(30);
          break;
        }
      case 233:
        {
          let offset = ((((((this.method_fetch_word()) << 16) >> 16)) << 16) >> 16);
          this.m_ip = ((((this.m_ip) + (offset))) & 0xffff);
          this.method_CLK(25);
          break;
        }
      case 234:
        {
          let tmp = ((this.method_fetch_word()) & 0xffff);
          let tmp1 = ((this.method_fetch_word()) & 0xffff);
          this.m_sregs[1] = ((tmp1) & 0xffff);
          this.m_ip = ((tmp) & 0xffff);
          this.method_CLK(26);
          break;
        }
      case 235:
        {
          let tmp = (((((((this.method_fetch()) << 24) >> 24)) | 0)) | 0);
          this.method_CLK(24);
          if ((((((((((((Number(tmp) === Number((-2))) ? 1 : 0)) && (((Number(this.m_no_interrupt) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(this.m_pending_irq) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0)) {
            this.m_icount = ((((this.m_icount) % (12))) | 0);
          }
          this.m_ip = ((((((this.m_ip) + (tmp))) & 0xffff)) & 0xffff);
          break;
        }
      case 236:
        {
          let v = ((this.method_read_port_byte(this.m_regs.w[2])) & 0xff);
          if (0) {
            this.m_ip = ((this.m_prev_ip) & 0xffff);
            this.cycles = ((((this.cycles) + (4))) >>> 0);
            break;
          }
          this.m_regs.b[0] = v;
          this.method_CLK(49);
          break;
        }
      case 237:
        {
          let port = ((this.m_regs.w[2]) >>> 0);
          let v = ((this.method_read_port_word(port)) & 0xffff);
          if (0) {
            this.m_ip = ((this.m_prev_ip) & 0xffff);
            this.cycles = ((((this.cycles) + (4))) >>> 0);
            break;
          }
          this.m_regs.w[0] = v;
          this.method_CLK(50);
          break;
        }
      case 238:
        {
          this.method_write_port_byte_al(this.m_regs.w[2]);
          if (0) {
            this.m_ip = ((this.m_prev_ip) & 0xffff);
            this.cycles = ((((this.cycles) + (4))) >>> 0);
            break;
          }
          this.method_CLK(53);
          break;
        }
      case 239:
        {
          let port = ((this.m_regs.w[2]) >>> 0);
          this.method_write_port_word(port, this.m_regs.w[0]);
          if (0) {
            this.m_ip = ((this.m_prev_ip) & 0xffff);
            this.cycles = ((((this.cycles) + (4))) >>> 0);
            break;
          }
          this.method_CLK(54);
          break;
        }
      case 240:
      case 241:
        {
          this.m_lock = ((1) & 0xff);
          this.m_no_interrupt = ((1) & 0xff);
          this.method_CLK(21);
          break;
        }
      case 242:
        {
          let invalid = ((0) ? 1 : 0);
          let next = ((this.method_repx_op()) & 0xff);
          let c = ((this.m_regs.w[1]) & 0xffff);
          switch (next) {
            case 164:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_movsb();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 165:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_movsw();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 166:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_cmpsb();
                    c = ((((c) - (1))) & 0xffff);
                  } while (((((((((Number(c) > Number(0)) ? 1 : 0)) && (((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 167:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_cmpsw();
                    c = ((((c) - (1))) & 0xffff);
                  } while (((((((((Number(c) > Number(0)) ? 1 : 0)) && (((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 170:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_stosb();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 171:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_stosw();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 172:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_lodsb();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 173:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_lodsw();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 174:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_scasb();
                    c = ((((c) - (1))) & 0xffff);
                  } while (((((((((Number(c) > Number(0)) ? 1 : 0)) && (((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 175:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_scasw();
                    c = ((((c) - (1))) & 0xffff);
                  } while (((((((((Number(c) > Number(0)) ? 1 : 0)) && (((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            default:
              {
                this.m_ip = ((((this.m_ip) - (1))) & 0xffff);
                invalid = ((1) ? 1 : 0);
                break;
              }
          }
          if ((((c) && (((invalid) ? 0 : 1))) ? 1 : 0)) {
            if ((((((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) && (((Number(((next) & (6))) === Number(6)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
              this.m_ip = ((this.m_prev_ip) & 0xffff);
            }
          }
          break;
        }
      case 243:
        {
          let invalid = ((0) ? 1 : 0);
          let next = ((this.method_repx_op()) & 0xff);
          let c = ((this.m_regs.w[1]) & 0xffff);
          switch (next) {
            case 164:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_movsb();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 165:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_movsw();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 166:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_cmpsb();
                    c = ((((c) - (1))) & 0xffff);
                  } while (((((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 167:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_cmpsw();
                    c = ((((c) - (1))) & 0xffff);
                  } while (((((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 170:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_stosb();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 171:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_stosw();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 172:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_lodsb();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 173:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_lodsw();
                    c = ((((c) - (1))) & 0xffff);
                  } while ((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 174:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_scasb();
                    c = ((((c) - (1))) & 0xffff);
                  } while (((((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            case 175:
              {
                this.method_CLK(6);
                if (c) {
                  do {
                    this.method_i_scasw();
                    c = ((((c) - (1))) & 0xffff);
                  } while (((((((((Number(c) > Number(0)) ? 1 : 0)) && (((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(this.m_icount) > Number(0)) ? 1 : 0))) ? 1 : 0));
                }
                this.m_regs.w[1] = c;
                this.m_seg_prefix = ((0) & 0xff);
                this.m_seg_prefix_next = ((0) & 0xff);
                break;
              }
            default:
              {
                this.m_ip = ((((this.m_ip) - (1))) & 0xffff);
                invalid = ((1) ? 1 : 0);
                break;
              }
          }
          if ((((c) && (((invalid) ? 0 : 1))) ? 1 : 0)) {
            if ((((((((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? 0 : 1)) && (((Number(((next) & (6))) === Number(6)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
              this.m_ip = ((this.m_prev_ip) & 0xffff);
            }
          }
          break;
        }
      case 244:
        {
          this.m_icount = ((0) | 0);
          this.m_halt = ((1) & 0xff);
          break;
        }
      case 245:
        {
          this.m_CarryVal = ((((this.m_CarryVal) ? 0 : 1)) >>> 0);
          this.method_CLK(7);
          break;
        }
      case 246:
        {
          let tmp = 0;
          let uresult = 0;
          let uresult2 = 0;
          let result = 0;
          let result2 = 0;
          this.m_modrm = ((this.method_fetch()) & 0xff);
          tmp = ((this.method_GetRMByte()) >>> 0);
          switch (((this.m_modrm) & (56))) {
            case 0:
            case 8:
              {
                tmp = ((((tmp) & (this.method_fetch()))) >>> 0);
                this.m_OverVal = ((0) >>> 0);
                this.m_CarryVal = ((this.m_OverVal) >>> 0);
                this.method_set_SZPF_Byte(tmp);
                this.method_CLKM(89, 91);
                break;
              }
            case 16:
              {
                this.method_PutbackRMByte((~tmp));
                this.method_CLKM(121, 123);
                break;
              }
            case 24:
              {
                this.m_dst = ((0) >>> 0);
                this.m_src = ((tmp) >>> 0);
                this.method_set_CFB(this.method_SUBB());
                this.method_PutbackRMByte(this.m_dst);
                this.method_CLKM(121, 123);
                break;
              }
            case 32:
              {
                uresult = ((((this.m_regs.b[0]) * (tmp))) >>> 0);
                this.m_regs.w[0] = ((uresult) & 0xffff);
                this.m_OverVal = ((((((Number(this.m_regs.b[1]) !== Number(0)) ? 1 : 0)) ? (1) : (0))) >>> 0);
                this.m_CarryVal = ((this.m_OverVal) >>> 0);
                this.method_set_ZF(this.m_regs.w[0]);
                this.method_CLKM(101, 103);
                break;
              }
            case 40:
              {
                result = ((((((((((this.m_regs.b[0]) << 24) >> 24)) << 16) >> 16)) * (((((((tmp) << 24) >> 24)) << 16) >> 16)))) | 0);
                this.m_regs.w[0] = ((result) & 0xffff);
                this.m_OverVal = ((((((Number(this.m_regs.b[1]) !== Number(0)) ? 1 : 0)) ? (1) : (0))) >>> 0);
                this.m_CarryVal = ((this.m_OverVal) >>> 0);
                this.method_set_ZF(this.m_regs.w[0]);
                this.method_CLKM(105, 107);
                break;
              }
            case 48:
              {
                if (tmp) {
                  uresult = ((this.m_regs.w[0]) >>> 0);
                  uresult2 = ((((uresult) % (tmp))) >>> 0);
                  uresult = ((((uresult) / (tmp))) >>> 0);
                  if (((Number(uresult) > Number(255)) ? 1 : 0)) {
                    this.method_interrupt(0);
                  } else {
                    this.m_regs.b[0] = uresult;
                    this.m_regs.b[1] = uresult2;
                    this.method_set_ZF(this.m_regs.b[0]);
                  }
                } else {
                  this.method_interrupt(0);
                }
                this.method_CLKM(109, 111);
                break;
              }
            case 56:
              {
                if (tmp) {
                  result = (((((this.m_regs.w[0]) << 16) >> 16)) | 0);
                  result2 = ((((result) % (((((((tmp) << 24) >> 24)) << 16) >> 16)))) | 0);
                  result = ((((result) / (((((((tmp) << 24) >> 24)) << 16) >> 16)))) | 0);
                  let lower_bound = ((((this.m_MF) ? ((-127)) : ((-128)))) | 0);
                  if ((((((Number(result) > Number(127)) ? 1 : 0)) || (((Number(result) < Number(lower_bound)) ? 1 : 0))) ? 1 : 0)) {
                    this.method_interrupt(0);
                  } else {
                    this.m_regs.b[0] = result;
                    this.m_regs.b[1] = result2;
                    this.method_set_ZF(this.m_regs.b[0]);
                  }
                } else {
                  this.method_interrupt(0);
                }
                this.method_CLKM(113, 115);
                break;
              }
          }
          break;
        }
      case 247:
        {
          let tmp = 0;
          let tmp2 = 0;
          let uresult = 0;
          let uresult2 = 0;
          let result = 0;
          let result2 = 0;
          this.m_modrm = ((this.method_fetch()) & 0xff);
          tmp = ((this.method_GetRMWord()) >>> 0);
          switch (((this.m_modrm) & (56))) {
            case 0:
            case 8:
              {
                tmp2 = ((this.method_fetch_word()) >>> 0);
                tmp = ((((tmp) & (tmp2))) >>> 0);
                this.m_OverVal = ((0) >>> 0);
                this.m_CarryVal = ((this.m_OverVal) >>> 0);
                this.method_set_SZPF_Word(tmp);
                this.method_CLKM(95, 97);
                break;
              }
            case 16:
              {
                this.method_PutbackRMWord((~tmp));
                this.method_CLKM(122, 124);
                break;
              }
            case 24:
              {
                this.m_dst = ((0) >>> 0);
                this.m_src = ((tmp) >>> 0);
                this.method_set_CFW(this.method_SUBX());
                this.method_PutbackRMWord(this.m_dst);
                this.method_CLKM(122, 124);
                break;
              }
            case 32:
              {
                uresult = ((((this.m_regs.w[0]) * (tmp))) >>> 0);
                this.m_regs.w[0] = ((uresult) & (65535));
                this.m_regs.w[2] = ((((uresult) >>> 0)) >>> (16));
                this.m_OverVal = ((((((Number(this.m_regs.w[2]) !== Number(0)) ? 1 : 0)) ? (1) : (0))) >>> 0);
                this.m_CarryVal = ((this.m_OverVal) >>> 0);
                this.method_set_ZF(((this.m_regs.w[0]) | (this.m_regs.w[2])));
                this.method_CLKM(102, 104);
                break;
              }
            case 40:
              {
                result = (((((((((this.m_regs.w[0]) << 16) >> 16)) | 0)) * ((((((tmp) << 16) >> 16)) | 0)))) | 0);
                this.m_regs.w[0] = ((result) & (65535));
                this.m_regs.w[2] = ((result) >>> (16));
                this.m_OverVal = ((((((Number(this.m_regs.w[2]) !== Number(0)) ? 1 : 0)) ? (1) : (0))) >>> 0);
                this.m_CarryVal = ((this.m_OverVal) >>> 0);
                this.method_set_ZF(((this.m_regs.w[0]) | (this.m_regs.w[2])));
                this.method_CLKM(106, 108);
                break;
              }
            case 48:
              {
                if (tmp) {
                  uresult = ((((((((this.m_regs.w[2]) >>> 0)) << (16))) | (this.m_regs.w[0]))) >>> 0);
                  uresult2 = ((((uresult) % (tmp))) >>> 0);
                  uresult = ((((uresult) / (tmp))) >>> 0);
                  if (((Number(uresult) > Number(65535)) ? 1 : 0)) {
                    this.method_interrupt(0);
                  } else {
                    this.m_regs.w[0] = uresult;
                    this.m_regs.w[2] = uresult2;
                    this.method_set_ZF(this.m_regs.w[0]);
                  }
                } else {
                  this.method_interrupt(0);
                }
                this.method_CLKM(110, 112);
                break;
              }
            case 56:
              {
                if (tmp) {
                  result = ((((((((this.m_regs.w[2]) >>> 0)) << (16))) + (this.m_regs.w[0]))) | 0);
                  result2 = ((((result) % ((((((tmp) << 16) >> 16)) | 0)))) | 0);
                  result = ((((result) / ((((((tmp) << 16) >> 16)) | 0)))) | 0);
                  let lower_bound = ((((this.m_MF) ? ((-32767)) : ((-32768)))) | 0);
                  if ((((((Number(result) > Number(32767)) ? 1 : 0)) || (((Number(result) < Number(lower_bound)) ? 1 : 0))) ? 1 : 0)) {
                    this.method_interrupt(0);
                  } else {
                    this.m_regs.w[0] = result;
                    this.m_regs.w[2] = result2;
                    this.method_set_ZF(this.m_regs.w[0]);
                  }
                } else {
                  this.method_interrupt(0);
                }
                this.method_CLKM(114, 116);
                break;
              }
          }
          break;
        }
      case 248:
        {
          this.m_CarryVal = ((0) >>> 0);
          this.method_CLK(7);
          break;
        }
      case 249:
        {
          this.m_CarryVal = ((1) >>> 0);
          this.method_CLK(7);
          break;
        }
      case 250:
        {
          this.m_IF = ((0) & 0xff);
          this.method_CLK(7);
          break;
        }
      case 251:
        {
          this.m_IF = ((1) & 0xff);
          this.m_no_interrupt = ((1) & 0xff);
          this.method_CLK(7);
          break;
        }
      case 252:
        {
          this.m_DF = ((0) & 0xff);
          this.method_CLK(7);
          break;
        }
      case 253:
        {
          this.m_DF = ((1) & 0xff);
          this.method_CLK(7);
          break;
        }
      case 254:
        {
          let tmp = 0;
          let tmp1 = 0;
          this.m_modrm = ((this.method_fetch()) & 0xff);
          tmp = ((this.method_GetRMByte()) >>> 0);
          switch (((this.m_modrm) & (56))) {
            case 0:
              {
                tmp1 = ((((tmp) + (1))) >>> 0);
                this.m_OverVal = ((((Number(tmp) === Number(127)) ? 1 : 0)) >>> 0);
                this.method_set_AF(tmp1, tmp, 1);
                this.method_set_SZPF_Byte(tmp1);
                this.method_PutbackRMByte(tmp1);
                this.method_CLKM(117, 119);
                break;
              }
            case 8:
              {
                tmp1 = ((((tmp) - (1))) >>> 0);
                this.m_OverVal = ((((Number(tmp) === Number(128)) ? 1 : 0)) >>> 0);
                this.method_set_AF(tmp1, tmp, 1);
                this.method_set_SZPF_Byte(tmp1);
                this.method_PutbackRMByte(tmp1);
                this.method_CLKM(117, 119);
                break;
              }
            default:
              {
                break;
              }
          }
          break;
        }
      case 255:
        {
          let tmp = 0;
          let tmp1 = 0;
          this.m_modrm = ((this.method_fetch()) & 0xff);
          tmp = ((this.method_GetRMWord()) >>> 0);
          switch (((this.m_modrm) & (56))) {
            case 0:
              {
                tmp1 = ((((tmp) + (1))) >>> 0);
                this.m_OverVal = ((((Number(tmp) === Number(32767)) ? 1 : 0)) >>> 0);
                this.method_set_AF(tmp1, tmp, 1);
                this.method_set_SZPF_Word(tmp1);
                this.method_PutbackRMWord(tmp1);
                this.method_CLKM(118, 120);
                break;
              }
            case 8:
              {
                tmp1 = ((((tmp) - (1))) >>> 0);
                this.m_OverVal = ((((Number(tmp) === Number(32768)) ? 1 : 0)) >>> 0);
                this.method_set_AF(tmp1, tmp, 1);
                this.method_set_SZPF_Word(tmp1);
                this.method_PutbackRMWord(tmp1);
                this.method_CLKM(118, 120);
                break;
              }
            case 16:
              {
                this.method_PUSH(this.m_ip);
                this.m_ip = ((tmp) & 0xffff);
                this.method_CLKM(32, 33);
                break;
              }
            case 24:
              {
                tmp1 = ((this.m_sregs[1]) >>> 0);
                this.m_sregs[1] = ((this.method_GetnextRMWord()) & 0xffff);
                this.method_PUSH(tmp1);
                this.method_PUSH(this.m_ip);
                this.m_ip = ((tmp) & 0xffff);
                this.method_CLK(34);
                break;
              }
            case 32:
              {
                this.m_ip = ((tmp) & 0xffff);
                this.method_CLKM(27, 28);
                break;
              }
            case 40:
              {
                this.m_ip = ((tmp) & 0xffff);
                this.m_sregs[1] = ((this.method_GetnextRMWord()) & 0xffff);
                this.method_CLK(29);
                break;
              }
            case 48:
              {
                this.method_PUSH(tmp);
                this.method_CLKM(78, 79);
                break;
              }
            default:
              {
                this.cycles = ((((this.cycles) + (10))) >>> 0);
                break;
              }
          }
          break;
        }
      default:
        {
          return 0;
        }
    }
    return 1;
    return 0;
  }

  private method_fetch_word(): number {
    let data = ((this.method_fetch()) & 0xffff);
    data = ((((data) | (((this.method_fetch()) << (8))))) & 0xffff);
    return data;
    return 0;
  }

  private method_repx_op(): number {
    let next = ((this.method_fetch_op()) & 0xff);
    let seg_prefix = ((0) ? 1 : 0);
    let seg = ((0) | 0);
    switch (next) {
      case 38:
        {
          seg_prefix = ((1) ? 1 : 0);
          seg = ((0) | 0);
          break;
        }
      case 46:
        {
          seg_prefix = ((1) ? 1 : 0);
          seg = ((1) | 0);
          break;
        }
      case 54:
        {
          seg_prefix = ((1) ? 1 : 0);
          seg = ((2) | 0);
          break;
        }
      case 62:
        {
          seg_prefix = ((1) ? 1 : 0);
          seg = ((3) | 0);
          break;
        }
    }
    if (seg_prefix) {
      this.m_seg_prefix = ((1) & 0xff);
      this.m_seg_prefix_next = ((1) & 0xff);
      this.m_prefix_seg = ((seg) >>> 0);
      next = ((this.method_fetch_op()) & 0xff);
      this.method_CLK(6);
    }
    return next;
    return 0;
  }

  private method_CLK(op: number = 0): number {
    this.cycles = ((((this.cycles) + (this.m_timing[op]))) >>> 0);
    return 0;
  }

  private method_CLKM(op_reg: number = 0, op_mem: number = 0): number {
    this.cycles = ((((this.cycles) + (((((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) ? (this.m_timing[op_reg]) : (this.m_timing[op_mem]))))) >>> 0);
    return 0;
  }

  private method_get_ea(size: number = 0, op: number = 0): number {
    let e16 = 0;
    let modrm = ((((this.m_modrm) & (199))) & 0xff);
    switch (modrm) {
      case 0:
        {
          this.m_eo = ((((this.m_regs.w[3]) + (this.m_regs.w[6]))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 1:
        {
          this.m_eo = ((((this.m_regs.w[3]) + (this.m_regs.w[7]))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 2:
        {
          this.m_eo = ((((this.m_regs.w[5]) + (this.m_regs.w[6]))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(2, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 3:
        {
          this.m_eo = ((((this.m_regs.w[5]) + (this.m_regs.w[7]))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(2, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 4:
        {
          this.m_eo = ((this.m_regs.w[6]) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 5:
        {
          this.m_eo = ((this.m_regs.w[7]) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 6:
        {
          this.m_eo = ((this.method_fetch_word()) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 7:
        {
          this.m_eo = ((this.m_regs.w[3]) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 64:
        {
          this.m_eo = ((((((this.m_regs.w[3]) + (this.m_regs.w[6]))) + ((((this.method_fetch()) << 24) >> 24)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 65:
        {
          this.m_eo = ((((((this.m_regs.w[3]) + (this.m_regs.w[7]))) + ((((this.method_fetch()) << 24) >> 24)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 66:
        {
          this.m_eo = ((((((this.m_regs.w[5]) + (this.m_regs.w[6]))) + ((((this.method_fetch()) << 24) >> 24)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(2, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 67:
        {
          this.m_eo = ((((((this.m_regs.w[5]) + (this.m_regs.w[7]))) + ((((this.method_fetch()) << 24) >> 24)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(2, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 68:
        {
          this.m_eo = ((((this.m_regs.w[6]) + ((((this.method_fetch()) << 24) >> 24)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 69:
        {
          this.m_eo = ((((this.m_regs.w[7]) + ((((this.method_fetch()) << 24) >> 24)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 70:
        {
          this.m_eo = ((((this.m_regs.w[5]) + ((((this.method_fetch()) << 24) >> 24)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(2, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 71:
        {
          this.m_eo = ((((this.m_regs.w[3]) + ((((this.method_fetch()) << 24) >> 24)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 128:
        {
          e16 = ((this.method_fetch_word()) & 0xffff);
          this.m_eo = ((((((this.m_regs.w[3]) + (this.m_regs.w[6]))) + ((((e16) << 16) >> 16)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 129:
        {
          e16 = ((this.method_fetch_word()) & 0xffff);
          this.m_eo = ((((((this.m_regs.w[3]) + (this.m_regs.w[7]))) + ((((e16) << 16) >> 16)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 130:
        {
          e16 = ((this.method_fetch_word()) & 0xffff);
          this.m_eo = ((((((this.m_regs.w[5]) + (this.m_regs.w[6]))) + ((((e16) << 16) >> 16)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(2, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 131:
        {
          e16 = ((this.method_fetch_word()) & 0xffff);
          this.m_eo = ((((((this.m_regs.w[5]) + (this.m_regs.w[7]))) + ((((e16) << 16) >> 16)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(2, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 132:
        {
          e16 = ((this.method_fetch_word()) & 0xffff);
          this.m_eo = ((((this.m_regs.w[6]) + ((((e16) << 16) >> 16)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 133:
        {
          e16 = ((this.method_fetch_word()) & 0xffff);
          this.m_eo = ((((this.m_regs.w[7]) + ((((e16) << 16) >> 16)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 134:
        {
          e16 = ((this.method_fetch_word()) & 0xffff);
          this.m_eo = ((((this.m_regs.w[5]) + ((((e16) << 16) >> 16)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(2, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
      case 135:
        {
          e16 = ((this.method_fetch_word()) & 0xffff);
          this.m_eo = ((((this.m_regs.w[3]) + ((((e16) << 16) >> 16)))) & 0xffff);
          this.m_ea = ((this.method_calc_addr(3, this.m_eo, size, op, 1)) >>> 0);
          break;
        }
    }
    this.cycles = ((((this.cycles) + (this.m_ea_timing[modrm]))) >>> 0);
    return this.m_ea;
    return 0;
  }

  private method_PutbackRMByte(data: number = 0): number {
    if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
      this.m_regs.b[this.m_modrm_rm_b[this.m_modrm]] = data;
    } else {
      this.method_write_byte(this.m_ea, data);
    }
    return 0;
  }

  private method_PutbackRMWord(data: number = 0): number {
    if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
      this.m_regs.w[this.m_modrm_rm_w[this.m_modrm]] = data;
    } else {
      this.method_write_word(this.m_ea, data);
    }
    return 0;
  }

  private method_PutImmRMWord(): number {
    if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
      this.m_regs.w[this.m_modrm_rm_w[this.m_modrm]] = this.method_fetch_word();
    } else {
      let addr = ((this.method_get_ea(2, 1)) >>> 0);
      this.method_write_word(addr, this.method_fetch_word());
    }
    return 0;
  }

  private method_PutRMWord(val: number = 0): number {
    if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
      this.m_regs.w[this.m_modrm_rm_w[this.m_modrm]] = val;
    } else {
      this.method_write_word(this.method_get_ea(2, 1), val);
    }
    return 0;
  }

  private method_PutRMByte(val: number = 0): number {
    if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
      this.m_regs.b[this.m_modrm_rm_b[this.m_modrm]] = val;
    } else {
      this.method_write_byte(this.method_get_ea(1, 1), val);
    }
    return 0;
  }

  private method_PutImmRMByte(): number {
    if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
      this.m_regs.b[this.m_modrm_rm_b[this.m_modrm]] = this.method_fetch();
    } else {
      let addr = ((this.method_get_ea(1, 1)) >>> 0);
      this.method_write_byte(addr, this.method_fetch());
    }
    return 0;
  }

  private method_DEF_br8(): number {
    this.m_modrm = ((this.method_fetch()) & 0xff);
    this.m_src = ((this.method_RegByte_0()) >>> 0);
    this.m_dst = ((this.method_GetRMByte()) >>> 0);
    return 0;
  }

  private method_DEF_wr16(): number {
    this.m_modrm = ((this.method_fetch()) & 0xff);
    this.m_src = ((this.method_RegWord_0()) >>> 0);
    this.m_dst = ((this.method_GetRMWord()) >>> 0);
    return 0;
  }

  private method_DEF_r8b(): number {
    this.m_modrm = ((this.method_fetch()) & 0xff);
    this.m_dst = ((this.method_RegByte_0()) >>> 0);
    this.m_src = ((this.method_GetRMByte()) >>> 0);
    return 0;
  }

  private method_DEF_r16w(): number {
    this.m_modrm = ((this.method_fetch()) & 0xff);
    this.m_dst = ((this.method_RegWord_0()) >>> 0);
    this.m_src = ((this.method_GetRMWord()) >>> 0);
    return 0;
  }

  private method_DEF_ald8(): number {
    this.m_src = ((this.method_fetch()) >>> 0);
    this.m_dst = ((this.m_regs.b[0]) >>> 0);
    return 0;
  }

  private method_DEF_axd16(): number {
    this.m_src = ((this.method_fetch_word()) >>> 0);
    this.m_dst = ((this.m_regs.w[0]) >>> 0);
    return 0;
  }

  private method_RegByte_1(data: number = 0): number {
    this.m_regs.b[this.m_modrm_reg_b[this.m_modrm]] = data;
    return 0;
  }

  private method_RegWord_1(data: number = 0): number {
    this.m_regs.w[this.m_modrm_reg_w[this.m_modrm]] = data;
    return 0;
  }

  private method_RegByte_0(): number {
    return this.m_regs.b[this.m_modrm_reg_b[this.m_modrm]];
    return 0;
  }

  private method_RegWord_0(): number {
    return this.m_regs.w[this.m_modrm_reg_w[this.m_modrm]];
    return 0;
  }

  private method_GetRMWord(): number {
    if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
      return this.m_regs.w[this.m_modrm_rm_w[this.m_modrm]];
    } else {
      return this.method_read_word(this.method_get_ea(2, 0));
    }
    return 0;
  }

  private method_GetnextRMWord(): number {
    return this.method_read_word(((((this.m_ea) - (this.m_eo))) + (((((this.m_eo) + (2))) & (65535)))));
    return 0;
  }

  private method_GetRMByte(): number {
    if (((Number(this.m_modrm) >= Number(192)) ? 1 : 0)) {
      return this.m_regs.b[this.m_modrm_rm_b[this.m_modrm]];
    } else {
      return this.method_read_byte(this.method_get_ea(1, 0));
    }
    return 0;
  }

  private method_PutMemB(seg: number = 0, offset: number = 0, data: number = 0): number {
    this.method_write_byte(this.method_calc_addr(seg, offset, 1, 1, 1), data);
    return 0;
  }

  private method_PutMemW(seg: number = 0, offset: number = 0, data: number = 0): number {
    this.method_write_word(this.method_calc_addr(seg, offset, 2, 1, 1), data);
    return 0;
  }

  private method_GetMemB(seg: number = 0, offset: number = 0): number {
    return this.method_read_byte(this.method_calc_addr(seg, offset, 1, 0, 1));
    return 0;
  }

  private method_GetMemW(seg: number = 0, offset: number = 0): number {
    return this.method_read_word(this.method_calc_addr(seg, offset, 2, 0, 1));
    return 0;
  }

  private method_set_CFB(x: number = 0): number {
    this.m_CarryVal = ((((x) & (256))) >>> 0);
    return 0;
  }

  private method_set_CFW(x: number = 0): number {
    this.m_CarryVal = ((((x) & (65536))) >>> 0);
    return 0;
  }

  private method_set_AF(x: number = 0, y: number = 0, z: number = 0): number {
    this.m_AuxVal = ((((((x) ^ (((y) ^ (z))))) & (16))) >>> 0);
    return 0;
  }

  private method_set_SF(x: number = 0): number {
    this.m_SignVal = ((x) | 0);
    return 0;
  }

  private method_set_ZF(x: number = 0): number {
    this.m_ZeroVal = ((x) >>> 0);
    return 0;
  }

  private method_set_PF(x: number = 0): number {
    this.m_ParityVal = ((x) >>> 0);
    return 0;
  }

  private method_set_SZPF_Byte(x: number = 0): number {
    this.m_ZeroVal = (((this.m_ParityVal = (((((x) << 24) >> 24)) >>> 0))) >>> 0);
    this.m_SignVal = ((this.m_ZeroVal) | 0);
    return 0;
  }

  private method_set_SZPF_Word(x: number = 0): number {
    this.m_ZeroVal = (((this.m_ParityVal = (((((x) << 16) >> 16)) >>> 0))) >>> 0);
    this.m_SignVal = ((this.m_ZeroVal) | 0);
    return 0;
  }

  private method_set_OFW_Add(x: number = 0, y: number = 0, z: number = 0): number {
    this.m_OverVal = ((((((((x) ^ (y))) & (((x) ^ (z))))) & (32768))) >>> 0);
    return 0;
  }

  private method_set_OFB_Add(x: number = 0, y: number = 0, z: number = 0): number {
    this.m_OverVal = ((((((((x) ^ (y))) & (((x) ^ (z))))) & (128))) >>> 0);
    return 0;
  }

  private method_set_OFW_Sub(x: number = 0, y: number = 0, z: number = 0): number {
    this.m_OverVal = ((((((((z) ^ (y))) & (((z) ^ (x))))) & (32768))) >>> 0);
    return 0;
  }

  private method_set_OFB_Sub(x: number = 0, y: number = 0, z: number = 0): number {
    this.m_OverVal = ((((((((z) ^ (y))) & (((z) ^ (x))))) & (128))) >>> 0);
    return 0;
  }

  private method_CompressFlags(): number {
    return ((((((((((((((((((((((((((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))) | (((1) << (1))))) | (((((Number(this.m_parity_table[((this.m_ParityVal) & 0xff)]) !== Number(0)) ? 1 : 0)) ? (4) : (0))))) | (((((Number(this.m_AuxVal) !== Number(0)) ? 1 : 0)) ? (16) : (0))))) | (((((Number(this.m_ZeroVal) === Number(0)) ? 1 : 0)) ? (64) : (0))))) | (((((Number(this.m_SignVal) < Number(0)) ? 1 : 0)) ? (128) : (0))))) | (((this.m_TF) << (8))))) | (((this.m_IF) << (9))))) | (((this.m_DF) << (10))))) | (((((Number(this.m_OverVal) !== Number(0)) ? 1 : 0)) << (11))))) | (((this.m_IOPL) << (12))))) | (((this.m_NT) << (14))))) | (((this.m_MF) << (15))));
    return 0;
  }

  private method_ExpandFlags(f: number = 0): number {
    this.m_CarryVal = ((((f) & (1))) >>> 0);
    this.m_ParityVal = ((((((f) & (4))) ? 0 : 1)) >>> 0);
    this.m_AuxVal = ((((f) & (16))) >>> 0);
    this.m_ZeroVal = ((((((f) & (64))) ? 0 : 1)) >>> 0);
    this.m_SignVal = ((((((f) & (128))) ? ((-1)) : (0))) | 0);
    this.m_TF = ((((Number(((f) & (256))) === Number(256)) ? 1 : 0)) & 0xff);
    this.m_IF = ((((Number(((f) & (512))) === Number(512)) ? 1 : 0)) & 0xff);
    this.m_DF = ((((Number(((f) & (1024))) === Number(1024)) ? 1 : 0)) & 0xff);
    this.m_OverVal = ((((f) & (2048))) >>> 0);
    this.m_IOPL = ((((((f) >>> (12))) & (3))) & 0xff);
    this.m_NT = ((((Number(((f) & (16384))) === Number(16384)) ? 1 : 0)) & 0xff);
    this.m_MF = ((((Number(((f) & (32768))) === Number(32768)) ? 1 : 0)) & 0xff);
    return 0;
  }

  private method_i_insb(): number {
    let ea = ((this.method_calc_addr(0, this.m_regs.w[7], 1, 1, 1)) >>> 0);
    let data = ((this.method_read_port_byte(this.m_regs.w[2])) & 0xff);
    if (0) {
      this.m_io_stall = ((1) & 0xff);
      this.m_ip = ((this.m_prev_ip) & 0xffff);
      this.cycles = ((((this.cycles) + (4))) >>> 0);
      return 0;
    }
    this.method_write_byte(ea, data);
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-2)) * (this.m_DF))) + (1))));
    this.method_CLK(47);
    return 0;
  }

  private method_i_insw(): number {
    let ea = ((this.method_calc_addr(0, this.m_regs.w[7], 2, 1, 1)) >>> 0);
    let data = ((this.method_read_port_word(this.m_regs.w[2])) & 0xffff);
    if (0) {
      this.m_io_stall = ((1) & 0xff);
      this.m_ip = ((this.m_prev_ip) & 0xffff);
      this.cycles = ((((this.cycles) + (4))) >>> 0);
      return 0;
    }
    this.method_write_word(ea, data);
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-4)) * (this.m_DF))) + (2))));
    this.method_CLK(48);
    return 0;
  }

  private method_i_outsb(): number {
    this.method_write_port_byte(this.m_regs.w[2], this.method_GetMemB(3, this.m_regs.w[6]));
    if (0) {
      this.m_io_stall = ((1) & 0xff);
      this.m_ip = ((this.m_prev_ip) & 0xffff);
      this.cycles = ((((this.cycles) + (4))) >>> 0);
      return 0;
    }
    this.m_regs.w[6] = ((this.m_regs.w[6]) + ((((((-2)) * (this.m_DF))) + (1))));
    this.method_CLK(51);
    return 0;
  }

  private method_i_outsw(): number {
    this.method_write_port_word(this.m_regs.w[2], this.method_GetMemW(3, this.m_regs.w[6]));
    if (0) {
      this.m_io_stall = ((1) & 0xff);
      this.m_ip = ((this.m_prev_ip) & 0xffff);
      this.cycles = ((((this.cycles) + (4))) >>> 0);
      return 0;
    }
    this.m_regs.w[6] = ((this.m_regs.w[6]) + ((((((-4)) * (this.m_DF))) + (2))));
    this.method_CLK(52);
    return 0;
  }

  private method_i_movsb(): number {
    let tmp = ((this.method_GetMemB(3, this.m_regs.w[6])) & 0xff);
    this.method_PutMemB(0, this.m_regs.w[7], tmp);
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-2)) * (this.m_DF))) + (1))));
    this.m_regs.w[6] = ((this.m_regs.w[6]) + ((((((-2)) * (this.m_DF))) + (1))));
    this.method_CLK(158);
    return 0;
  }

  private method_i_movsw(): number {
    let tmp = ((this.method_GetMemW(3, this.m_regs.w[6])) & 0xffff);
    this.method_PutMemW(0, this.m_regs.w[7], tmp);
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-4)) * (this.m_DF))) + (2))));
    this.m_regs.w[6] = ((this.m_regs.w[6]) + ((((((-4)) * (this.m_DF))) + (2))));
    this.method_CLK(161);
    return 0;
  }

  private method_i_cmpsb(): number {
    this.m_src = ((this.method_GetMemB(0, this.m_regs.w[7])) >>> 0);
    this.m_dst = ((this.method_GetMemB(3, this.m_regs.w[6])) >>> 0);
    this.method_set_CFB(this.method_SUBB());
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-2)) * (this.m_DF))) + (1))));
    this.m_regs.w[6] = ((this.m_regs.w[6]) + ((((((-2)) * (this.m_DF))) + (1))));
    this.method_CLK(134);
    return 0;
  }

  private method_i_cmpsw(): number {
    this.m_src = ((this.method_GetMemW(0, this.m_regs.w[7])) >>> 0);
    this.m_dst = ((this.method_GetMemW(3, this.m_regs.w[6])) >>> 0);
    this.method_set_CFW(this.method_SUBX());
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-4)) * (this.m_DF))) + (2))));
    this.m_regs.w[6] = ((this.m_regs.w[6]) + ((((((-4)) * (this.m_DF))) + (2))));
    this.method_CLK(137);
    return 0;
  }

  private method_i_stosb(): number {
    this.method_PutMemB(0, this.m_regs.w[7], this.m_regs.b[0]);
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-2)) * (this.m_DF))) + (1))));
    this.method_CLK(152);
    return 0;
  }

  private method_i_stosw(): number {
    this.method_PutMemW(0, this.m_regs.w[7], this.m_regs.w[0]);
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-4)) * (this.m_DF))) + (2))));
    this.method_CLK(155);
    return 0;
  }

  private method_i_lodsb(): number {
    this.m_regs.b[0] = this.method_GetMemB(3, this.m_regs.w[6]);
    this.m_regs.w[6] = ((this.m_regs.w[6]) + ((((((-2)) * (this.m_DF))) + (1))));
    this.method_CLK(146);
    return 0;
  }

  private method_i_lodsw(): number {
    this.m_regs.w[0] = this.method_GetMemW(3, this.m_regs.w[6]);
    this.m_regs.w[6] = ((this.m_regs.w[6]) + ((((((-4)) * (this.m_DF))) + (2))));
    this.method_CLK(149);
    return 0;
  }

  private method_i_scasb(): number {
    this.m_src = ((this.method_GetMemB(0, this.m_regs.w[7])) >>> 0);
    this.m_dst = ((this.m_regs.b[0]) >>> 0);
    this.method_set_CFB(this.method_SUBB());
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-2)) * (this.m_DF))) + (1))));
    this.method_CLK(140);
    return 0;
  }

  private method_i_scasw(): number {
    this.m_src = ((this.method_GetMemW(0, this.m_regs.w[7])) >>> 0);
    this.m_dst = ((this.m_regs.w[0]) >>> 0);
    this.method_set_CFW(this.method_SUBX());
    this.m_regs.w[7] = ((this.m_regs.w[7]) + ((((((-4)) * (this.m_DF))) + (2))));
    this.method_CLK(143);
    return 0;
  }

  private method_i_popf(): number {
    let tmp = ((this.method_POP()) >>> 0);
    this.method_ExpandFlags(((tmp) | (61440)));
    this.method_CLK(85);
    if (this.m_TF) {
      this.m_fire_trap = ((1) & 0xff);
    }
    return 0;
  }

  private method_ADDB(c: number = 0): number {
    let res = ((((((this.m_dst) + (this.m_src))) + (c))) >>> 0);
    this.method_set_OFB_Add(res, this.m_src, this.m_dst);
    this.method_set_AF(res, this.m_src, this.m_dst);
    this.method_set_SZPF_Byte(res);
    this.m_dst = ((((res) & (255))) >>> 0);
    return res;
    return 0;
  }

  private method_ADDX(c: number = 0): number {
    let res = ((((((this.m_dst) + (this.m_src))) + (c))) >>> 0);
    this.method_set_OFW_Add(res, this.m_src, this.m_dst);
    this.method_set_AF(res, this.m_src, this.m_dst);
    this.method_set_SZPF_Word(res);
    this.m_dst = ((((res) & (65535))) >>> 0);
    return res;
    return 0;
  }

  private method_SUBB(b: number = 0): number {
    let res = ((((((this.m_dst) - (this.m_src))) - (b))) >>> 0);
    this.method_set_OFB_Sub(res, this.m_src, this.m_dst);
    this.method_set_AF(res, this.m_src, this.m_dst);
    this.method_set_SZPF_Byte(res);
    this.m_dst = ((((res) & (255))) >>> 0);
    return res;
    return 0;
  }

  private method_SUBX(b: number = 0): number {
    let res = ((((((this.m_dst) - (this.m_src))) - (b))) >>> 0);
    this.method_set_OFW_Sub(res, this.m_src, this.m_dst);
    this.method_set_AF(res, this.m_src, this.m_dst);
    this.method_set_SZPF_Word(res);
    this.m_dst = ((((res) & (65535))) >>> 0);
    return res;
    return 0;
  }

  private method_ORB(): number {
    this.m_dst = ((((this.m_dst) | (this.m_src))) >>> 0);
    this.m_OverVal = (((this.m_AuxVal = ((0) >>> 0))) >>> 0);
    this.m_CarryVal = ((this.m_OverVal) >>> 0);
    this.method_set_SZPF_Byte(this.m_dst);
    return 0;
  }

  private method_ORW(): number {
    this.m_dst = ((((this.m_dst) | (this.m_src))) >>> 0);
    this.m_OverVal = (((this.m_AuxVal = ((0) >>> 0))) >>> 0);
    this.m_CarryVal = ((this.m_OverVal) >>> 0);
    this.method_set_SZPF_Word(this.m_dst);
    return 0;
  }

  private method_ANDB(): number {
    this.m_dst = ((((this.m_dst) & (this.m_src))) >>> 0);
    this.m_OverVal = (((this.m_AuxVal = ((0) >>> 0))) >>> 0);
    this.m_CarryVal = ((this.m_OverVal) >>> 0);
    this.method_set_SZPF_Byte(this.m_dst);
    return 0;
  }

  private method_ANDX(): number {
    this.m_dst = ((((this.m_dst) & (this.m_src))) >>> 0);
    this.m_OverVal = (((this.m_AuxVal = ((0) >>> 0))) >>> 0);
    this.m_CarryVal = ((this.m_OverVal) >>> 0);
    this.method_set_SZPF_Word(this.m_dst);
    return 0;
  }

  private method_XORB(): number {
    this.m_dst = ((((this.m_dst) ^ (this.m_src))) >>> 0);
    this.m_OverVal = (((this.m_AuxVal = ((0) >>> 0))) >>> 0);
    this.m_CarryVal = ((this.m_OverVal) >>> 0);
    this.method_set_SZPF_Byte(this.m_dst);
    return 0;
  }

  private method_XORW(): number {
    this.m_dst = ((((this.m_dst) ^ (this.m_src))) >>> 0);
    this.m_OverVal = (((this.m_AuxVal = ((0) >>> 0))) >>> 0);
    this.m_CarryVal = ((this.m_OverVal) >>> 0);
    this.method_set_SZPF_Word(this.m_dst);
    return 0;
  }

  private method_ROL_BYTE(): number {
    this.m_CarryVal = ((((this.m_dst) & (128))) >>> 0);
    this.m_dst = ((((((this.m_dst) << (1))) | (((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))))) >>> 0);
    return 0;
  }

  private method_ROL_WORD(): number {
    this.m_CarryVal = ((((this.m_dst) & (32768))) >>> 0);
    this.m_dst = ((((((this.m_dst) << (1))) | (((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))))) >>> 0);
    return 0;
  }

  private method_ROR_BYTE(): number {
    this.m_CarryVal = ((((this.m_dst) & (1))) >>> 0);
    this.m_dst = ((((((this.m_dst) >>> (1))) | (((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (128) : (0))))) >>> 0);
    return 0;
  }

  private method_ROR_WORD(): number {
    this.m_CarryVal = ((((this.m_dst) & (1))) >>> 0);
    this.m_dst = ((((((this.m_dst) >>> (1))) + (((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (32768) : (0))))) >>> 0);
    return 0;
  }

  private method_ROLC_BYTE(): number {
    this.m_dst = ((((((this.m_dst) << (1))) | (((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))))) >>> 0);
    this.method_set_CFB(this.m_dst);
    return 0;
  }

  private method_ROLC_WORD(): number {
    this.m_dst = ((((((this.m_dst) << (1))) | (((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (1) : (0))))) >>> 0);
    this.method_set_CFW(this.m_dst);
    return 0;
  }

  private method_RORC_BYTE(): number {
    this.m_dst = ((((this.m_dst) | (((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (256) : (0))))) >>> 0);
    this.m_CarryVal = ((((this.m_dst) & (1))) >>> 0);
    this.m_dst = ((((this.m_dst) >>> (1))) >>> 0);
    return 0;
  }

  private method_RORC_WORD(): number {
    this.m_dst = ((((this.m_dst) | (((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) ? (65536) : (0))))) >>> 0);
    this.m_CarryVal = ((((this.m_dst) & (1))) >>> 0);
    this.m_dst = ((((this.m_dst) >>> (1))) >>> 0);
    return 0;
  }

  private method_SHL_BYTE(c: number = 0): number {
    while (((() => { const previous = c; c = ((((c) - (1))) & 0xff); return previous; })())) {
      this.m_dst = ((((this.m_dst) << (1))) >>> 0);
    }
    this.method_set_CFB(this.m_dst);
    this.method_set_SZPF_Byte(this.m_dst);
    this.method_PutbackRMByte(this.m_dst);
    return 0;
  }

  private method_SHL_WORD(c: number = 0): number {
    while (((() => { const previous = c; c = ((((c) - (1))) & 0xff); return previous; })())) {
      this.m_dst = ((((this.m_dst) << (1))) >>> 0);
    }
    this.method_set_CFW(this.m_dst);
    this.method_set_SZPF_Word(this.m_dst);
    this.method_PutbackRMWord(this.m_dst);
    return 0;
  }

  private method_SHR_BYTE(c: number = 0): number {
    while (((() => { const previous = c; c = ((((c) - (1))) & 0xff); return previous; })())) {
      this.m_CarryVal = ((((this.m_dst) & (1))) >>> 0);
      this.m_dst = ((((this.m_dst) >>> (1))) >>> 0);
    }
    this.method_set_SZPF_Byte(this.m_dst);
    this.method_PutbackRMByte(this.m_dst);
    return 0;
  }

  private method_SHR_WORD(c: number = 0): number {
    while (((() => { const previous = c; c = ((((c) - (1))) & 0xff); return previous; })())) {
      this.m_CarryVal = ((((this.m_dst) & (1))) >>> 0);
      this.m_dst = ((((this.m_dst) >>> (1))) >>> 0);
    }
    this.method_set_SZPF_Word(this.m_dst);
    this.method_PutbackRMWord(this.m_dst);
    return 0;
  }

  private method_SHRA_BYTE(c: number = 0): number {
    while (((() => { const previous = c; c = ((((c) - (1))) & 0xff); return previous; })())) {
      this.m_CarryVal = ((((this.m_dst) & (1))) >>> 0);
      this.m_dst = (((((((this.m_dst) << 24) >> 24)) >>> (1))) >>> 0);
    }
    this.method_set_SZPF_Byte(this.m_dst);
    this.method_PutbackRMByte(this.m_dst);
    return 0;
  }

  private method_SHRA_WORD(c: number = 0): number {
    while (((() => { const previous = c; c = ((((c) - (1))) & 0xff); return previous; })())) {
      this.m_CarryVal = ((((this.m_dst) & (1))) >>> 0);
      this.m_dst = (((((((this.m_dst) << 16) >> 16)) >>> (1))) >>> 0);
    }
    this.method_set_SZPF_Word(this.m_dst);
    this.method_PutbackRMWord(this.m_dst);
    return 0;
  }

  private method_XchgAXReg(reg: number = 0): number {
    let tmp = ((this.m_regs.w[reg]) & 0xffff);
    this.m_regs.w[reg] = this.m_regs.w[0];
    this.m_regs.w[0] = tmp;
    return 0;
  }

  private method_IncWordReg(reg: number = 0): number {
    let tmp = ((this.m_regs.w[reg]) >>> 0);
    let tmp1 = ((((tmp) + (1))) >>> 0);
    this.m_OverVal = ((((Number(tmp) === Number(32767)) ? 1 : 0)) >>> 0);
    this.method_set_AF(tmp1, tmp, 1);
    this.method_set_SZPF_Word(tmp1);
    this.m_regs.w[reg] = tmp1;
    return 0;
  }

  private method_DecWordReg(reg: number = 0): number {
    let tmp = ((this.m_regs.w[reg]) >>> 0);
    let tmp1 = ((((tmp) - (1))) >>> 0);
    this.m_OverVal = ((((Number(tmp) === Number(32768)) ? 1 : 0)) >>> 0);
    this.method_set_AF(tmp1, tmp, 1);
    this.method_set_SZPF_Word(tmp1);
    this.m_regs.w[reg] = tmp1;
    return 0;
  }

  private method_PUSH(data: number = 0): number {
    this.method_write_word(this.method_calc_addr(2, ((this.m_regs.w[4]) - (2)), 2, 1, 0), data);
    this.m_regs.w[4] = ((this.m_regs.w[4]) - (2));
    return 0;
  }

  private method_POP(): number {
    let data = ((this.method_read_word(this.method_calc_addr(2, this.m_regs.w[4], 2, 0, 0))) & 0xffff);
    this.m_regs.w[4] = ((this.m_regs.w[4]) + (2));
    return data;
    return 0;
  }

  private method_JMP(cond: number = 0): number {
    let rel = (((((((this.method_fetch()) << 24) >> 24)) | 0)) | 0);
    if (cond) {
      this.m_ip = ((((this.m_ip) + (rel))) & 0xffff);
      this.method_CLK(40);
    } else {
      this.method_CLK(39);
    }
    return 0;
  }

  private method_ADJ4(param1: number = 0, param2: number = 0): number {
    if ((((((Number(this.m_AuxVal) !== Number(0)) ? 1 : 0)) || (((Number(((this.m_regs.b[0]) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
      let tmp = 0;
      tmp = ((((this.m_regs.b[0]) + (param1))) & 0xffff);
      this.m_regs.b[0] = tmp;
      this.m_AuxVal = ((1) >>> 0);
      this.m_CarryVal = ((((this.m_CarryVal) | (((tmp) & (256))))) >>> 0);
    }
    if ((((((Number(this.m_CarryVal) !== Number(0)) ? 1 : 0)) || (((Number(this.m_regs.b[0]) > Number(159)) ? 1 : 0))) ? 1 : 0)) {
      this.m_regs.b[0] = ((this.m_regs.b[0]) + (param2));
      this.m_CarryVal = ((1) >>> 0);
    }
    this.method_set_SZPF_Byte(this.m_regs.b[0]);
    return 0;
  }

  private method_ADJB(param1: number = 0, param2: number = 0): number {
    if ((((((Number(this.m_AuxVal) !== Number(0)) ? 1 : 0)) || (((Number(((this.m_regs.b[0]) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
      this.m_regs.b[0] = ((this.m_regs.b[0]) + (param1));
      this.m_regs.b[1] = ((this.m_regs.b[1]) + (param2));
      this.m_AuxVal = ((1) >>> 0);
      this.m_CarryVal = ((1) >>> 0);
    } else {
      this.m_AuxVal = ((0) >>> 0);
      this.m_CarryVal = ((0) >>> 0);
    }
    this.m_regs.b[0] = ((this.m_regs.b[0]) & (15));
    return 0;
  }

  private method_read_byte(addr: number = 0): number {
    return (++this.cycles, this.readMemory((addr) & 1048575) & 0xff);
    return 0;
  }

  private method_read_word(addr: number = 0): number {
    return ((this.readMemory((addr)) & 0xff) | ((this.readMemory((addr) + 1) & 0xff) << 8));
    return 0;
  }

  private method_write_byte(addr: number = 0, data: number = 0): number {
    (++this.cycles, this.writeMemory((addr) & 1048575, (data) & 0xff), 0);
    return 0;
  }

  private method_write_word(addr: number = 0, data: number = 0): number {
    (this.writeMemory((addr), (data)), this.writeMemory((addr) + 1, (data) >>> 8), 0);
    return 0;
  }

  private method_read_port_byte(port: number = 0): number {
    return (this.bus.in((port) & 0xffff) & 0xff);
    return 0;
  }

  private method_read_port_word(port: number = 0): number {
    return ((this.bus.in((port) & 0xffff) & 0xff) | ((this.bus.in(((port) + 1) & 0xffff) & 0xff) << 8));
    return 0;
  }

  private method_write_port_byte(port: number = 0, data: number = 0): number {
    (this.bus.out((port) & 0xffff, (data) & 0xff), 0);
    return 0;
  }

  private method_write_port_byte_al(port: number = 0): number {
    (this.bus.out((port) & 0xffff, (this.m_regs.b[0]) & 0xff), 0);
    return 0;
  }

  private method_write_port_word(port: number = 0, data: number = 0): number {
    (this.bus.out((port) & 0xffff, (data) & 0xff), this.bus.out(((port) + 1) & 0xffff, ((data) >>> 8) & 0xff), 0);
    return 0;
  }

  private method_update_pc(): number {
    this.m_pc = ((((((this.m_sregs[1]) << (4))) + (this.m_ip))) >>> 0);
    return this.m_pc;
    return 0;
  }

  private method_fetch(): number {
    let data = (((++this.cycles, this.readMemory((this.method_update_pc()) & 1048575) & 0xff)) & 0xff);
    this.m_ip = ((((this.m_ip) + (1))) & 0xffff);
    return data;
    return 0;
  }

  private method_fetch_op(): number {
    return this.method_fetch();
    return 0;
  }

  private method_rotshft_bcl(): number {
    let c = 0;
    this.m_modrm = ((this.method_fetch()) & 0xff);
    this.m_src = ((this.method_GetRMByte()) >>> 0);
    this.m_dst = ((this.m_src) >>> 0);
    c = ((this.m_regs.b[2]) & 0xff);
    this.method_CLKM(126, 129);
    this.cycles = ((((this.cycles) + (((this.m_timing[127]) * (c))))) >>> 0);
    if (c) {
      switch (((this.m_modrm) & (56))) {
        case 0:
          {
            do {
              this.method_ROL_BYTE();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMByte(this.m_dst);
            break;
          }
        case 8:
          {
            do {
              this.method_ROR_BYTE();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMByte(this.m_dst);
            break;
          }
        case 16:
          {
            do {
              this.method_ROLC_BYTE();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMByte(this.m_dst);
            break;
          }
        case 24:
          {
            do {
              this.method_RORC_BYTE();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMByte(this.m_dst);
            break;
          }
        case 48:
        case 32:
          {
            this.method_SHL_BYTE(c);
            break;
          }
        case 40:
          {
            this.method_SHR_BYTE(c);
            break;
          }
        case 56:
          {
            this.method_SHRA_BYTE(c);
            break;
          }
      }
    }
    return 0;
  }

  private method_rotshft_wcl(): number {
    let c = 0;
    this.m_modrm = ((this.method_fetch()) & 0xff);
    this.m_src = ((this.method_GetRMWord()) >>> 0);
    this.m_dst = ((this.m_src) >>> 0);
    c = ((this.m_regs.b[2]) & 0xff);
    this.method_CLKM(126, 132);
    this.cycles = ((((this.cycles) + (((this.m_timing[127]) * (c))))) >>> 0);
    if (c) {
      switch (((this.m_modrm) & (56))) {
        case 0:
          {
            do {
              this.method_ROL_WORD();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMWord(this.m_dst);
            break;
          }
        case 8:
          {
            do {
              this.method_ROR_WORD();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMWord(this.m_dst);
            break;
          }
        case 16:
          {
            do {
              this.method_ROLC_WORD();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMWord(this.m_dst);
            break;
          }
        case 24:
          {
            do {
              this.method_RORC_WORD();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMWord(this.m_dst);
            break;
          }
        case 48:
        case 32:
          {
            this.method_SHL_WORD(c);
            break;
          }
        case 40:
          {
            this.method_SHR_WORD(c);
            break;
          }
        case 56:
          {
            this.method_SHRA_WORD(c);
            break;
          }
      }
    }
    return 0;
  }

  private method_v30_pusha(): number {
    let tmp = ((this.m_regs.w[4]) >>> 0);
    this.method_PUSH(this.m_regs.w[0]);
    this.method_PUSH(this.m_regs.w[1]);
    this.method_PUSH(this.m_regs.w[2]);
    this.method_PUSH(this.m_regs.w[3]);
    this.method_PUSH(tmp);
    this.method_PUSH(this.m_regs.w[5]);
    this.method_PUSH(this.m_regs.w[6]);
    this.method_PUSH(this.m_regs.w[7]);
    this.method_CLK(21);
    return 0;
  }

  private method_v30_popa(): number {
    let discarded_sp = 0;
    this.m_regs.w[7] = this.method_POP();
    this.m_regs.w[6] = this.method_POP();
    this.m_regs.w[5] = this.method_POP();
    discarded_sp = ((this.method_POP()) >>> 0);
    this.m_regs.w[3] = this.method_POP();
    this.m_regs.w[2] = this.method_POP();
    this.m_regs.w[1] = this.method_POP();
    this.m_regs.w[0] = this.method_POP();
    this.method_CLK(21);
    return 0;
  }

  private method_v30_rotshft_bd8(): number {
    let c = 0;
    this.m_modrm = ((this.method_fetch()) & 0xff);
    this.m_src = ((this.method_GetRMByte()) >>> 0);
    this.m_dst = ((this.m_src) >>> 0);
    c = ((this.method_fetch()) & 0xff);
    this.method_CLKM(126, 129);
    this.cycles = ((((this.cycles) + (((this.m_timing[127]) * (c))))) >>> 0);
    if (c) {
      switch (((this.m_modrm) & (56))) {
        case 0:
          {
            do {
              this.method_ROL_BYTE();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMByte(this.m_dst);
            break;
          }
        case 8:
          {
            do {
              this.method_ROR_BYTE();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMByte(this.m_dst);
            break;
          }
        case 16:
          {
            do {
              this.method_ROLC_BYTE();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMByte(this.m_dst);
            break;
          }
        case 24:
          {
            do {
              this.method_RORC_BYTE();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMByte(this.m_dst);
            break;
          }
        case 48:
        case 32:
          {
            this.method_SHL_BYTE(c);
            break;
          }
        case 40:
          {
            this.method_SHR_BYTE(c);
            break;
          }
        case 56:
          {
            this.method_SHRA_BYTE(c);
            break;
          }
      }
    }
    return 0;
  }

  private method_v30_rotshft_wd8(): number {
    let c = 0;
    this.m_modrm = ((this.method_fetch()) & 0xff);
    this.m_src = ((this.method_GetRMWord()) >>> 0);
    this.m_dst = ((this.m_src) >>> 0);
    c = ((this.method_fetch()) & 0xff);
    this.method_CLKM(126, 132);
    this.cycles = ((((this.cycles) + (((this.m_timing[127]) * (c))))) >>> 0);
    if (c) {
      switch (((this.m_modrm) & (56))) {
        case 0:
          {
            do {
              this.method_ROL_WORD();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMWord(this.m_dst);
            break;
          }
        case 8:
          {
            do {
              this.method_ROR_WORD();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMWord(this.m_dst);
            break;
          }
        case 16:
          {
            do {
              this.method_ROLC_WORD();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMWord(this.m_dst);
            break;
          }
        case 24:
          {
            do {
              this.method_RORC_WORD();
              c = ((((c) - (1))) & 0xff);
            } while (((Number(c) > Number(0)) ? 1 : 0));
            this.method_PutbackRMWord(this.m_dst);
            break;
          }
        case 48:
        case 32:
          {
            this.method_SHL_WORD(c);
            break;
          }
        case 40:
          {
            this.method_SHR_WORD(c);
            break;
          }
        case 56:
          {
            this.method_SHRA_WORD(c);
            break;
          }
      }
    }
    return 0;
  }

  private method_v30_add4s(): number {
    let count = ((Math.trunc((((this.m_regs.b[2]) + (1))) / (2))) >>> 0);
    let destination = ((this.m_regs.w[7]) >>> 0);
    let source = ((this.m_regs.w[6]) >>> 0);
    this.m_ZeroVal = ((0) >>> 0);
    this.m_CarryVal = ((0) >>> 0);
    while (((Number(count) > Number(0)) ? 1 : 0)) {
      let source_bcd = ((this.method_read_byte(((((this.m_sregs[3]) << (4))) + (source)))) >>> 0);
      let destination_bcd = ((this.method_read_byte(((((this.m_sregs[0]) << (4))) + (destination)))) >>> 0);
      let source_value = ((((((((source_bcd) >>> (4))) * (10))) + (((source_bcd) & (15))))) >>> 0);
      let destination_value = ((((((((destination_bcd) >>> (4))) * (10))) + (((destination_bcd) & (15))))) >>> 0);
      let result = ((((((source_value) + (destination_value))) + (this.m_CarryVal))) >>> 0);
      this.m_CarryVal = ((((Number(result) > Number(99)) ? 1 : 0)) >>> 0);
      result = ((((result) % (100))) >>> 0);
      let packed = ((((((Math.trunc((result) / (10))) << (4))) | (((result) % (10))))) >>> 0);
      this.method_write_byte(((((this.m_sregs[0]) << (4))) + (destination)), packed);
      if (packed) {
        this.m_ZeroVal = ((1) >>> 0);
      }
      source = ((((source) + (1))) >>> 0);
      destination = ((((destination) + (1))) >>> 0);
      count = ((((count) - (1))) >>> 0);
      this.cycles = ((((this.cycles) + (19))) >>> 0);
    }
    this.cycles = ((((this.cycles) + (7))) >>> 0);
    return 0;
  }
}

export const cpu: GeneratedCpuExecutable = {
  type: "V30",
  summary: {"opcodes":256,"compiledOpcodes":256,"methods":111,"compiledMethods":111,"diagnostics":0},
  create: (bus: CpuBus): Cpu => new GeneratedV30(bus),
};

export default cpu;
