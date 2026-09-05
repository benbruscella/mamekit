// GENERATED from MAME CPU source and opcode DSL; do not edit.
// Sources:
// - src/devices/cpu/mcs48/mcs48.cpp
// - src/devices/cpu/mcs48/mcs48.h
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
const GENERATED_METHOD_NAMES = new Set<string>(["opcode_fetch","argument_fetch","push_pc_psw","pull_pc_psw","pull_pc","execute_add","execute_addc","execute_jmp","execute_call","execute_jcc","p2_mask","expander_operation","check_irqs","burn_cycles","nop","illegal","outl_bus_a","add_a_n","jmp_0","en_i","dec_a","ins_a_bus","in_a_p1","in_a_p2","movd_a_p4","movd_a_p5","movd_a_p6","movd_a_p7","inc_xr0","inc_xr1","jb_0","adc_a_n","call_0","dis_i","jtf","inc_a","inc_r0","inc_r1","inc_r2","inc_r3","inc_r4","inc_r5","inc_r6","inc_r7","xch_a_xr0","xch_a_xr1","mov_a_n","jmp_1","en_tcnti","jnt_0","clr_a","xch_a_r0","xch_a_r1","xch_a_r2","xch_a_r3","xch_a_r4","xch_a_r5","xch_a_r6","xch_a_r7","xchd_a_xr0","xchd_a_xr1","jb_1","call_1","dis_tcnti","jt_0","cpl_a","outl_p1_a","outl_p2_a","movd_p4_a","movd_p5_a","movd_p6_a","movd_p7_a","orl_a_xr0","orl_a_xr1","mov_a_t","orl_a_n","jmp_2","strt_cnt","jnt_1","swap_a","orl_a_r0","orl_a_r1","orl_a_r2","orl_a_r3","orl_a_r4","orl_a_r5","orl_a_r6","orl_a_r7","anl_a_xr0","anl_a_xr1","jb_2","anl_a_n","call_2","strt_t","jt_1","da_a","anl_a_r0","anl_a_r1","anl_a_r2","anl_a_r3","anl_a_r4","anl_a_r5","anl_a_r6","anl_a_r7","add_a_xr0","add_a_xr1","mov_t_a","jmp_3","stop_tcnt","rrc_a","add_a_r0","add_a_r1","add_a_r2","add_a_r3","add_a_r4","add_a_r5","add_a_r6","add_a_r7","adc_a_xr0","adc_a_xr1","jb_3","call_3","ent0_clk","jf1","rr_a","adc_a_r0","adc_a_r1","adc_a_r2","adc_a_r3","adc_a_r4","adc_a_r5","adc_a_r6","adc_a_r7","movx_a_xr0","movx_a_xr1","ret","jmp_4","clr_f0","jni","orl_bus_n","orl_p1_n","orl_p2_n","orld_p4_a","orld_p5_a","orld_p6_a","orld_p7_a","movx_xr0_a","movx_xr1_a","jb_4","retr","call_4","cpl_f0","jnz","clr_c","anl_bus_n","anl_p1_n","anl_p2_n","anld_p4_a","anld_p5_a","anld_p6_a","anld_p7_a","mov_xr0_a","mov_xr1_a","movp_a_xa","jmp_5","clr_f1","cpl_c","mov_r0_a","mov_r1_a","mov_r2_a","mov_r3_a","mov_r4_a","mov_r5_a","mov_r6_a","mov_r7_a","mov_xr0_n","mov_xr1_n","jb_5","jmpp_xa","call_5","cpl_f1","jf0","mov_r0_n","mov_r1_n","mov_r2_n","mov_r3_n","mov_r4_n","mov_r5_n","mov_r6_n","mov_r7_n","jmp_6","sel_rb0","jz","mov_a_psw","dec_r0","dec_r1","dec_r2","dec_r3","dec_r4","dec_r5","dec_r6","dec_r7","xrl_a_xr0","xrl_a_xr1","jb_6","xrl_a_n","call_6","sel_rb1","mov_psw_a","xrl_a_r0","xrl_a_r1","xrl_a_r2","xrl_a_r3","xrl_a_r4","xrl_a_r5","xrl_a_r6","xrl_a_r7","movp3_a_xa","jmp_7","sel_mb0","jnc","rl_a","djnz_r0","djnz_r1","djnz_r2","djnz_r3","djnz_r4","djnz_r5","djnz_r6","djnz_r7","mov_a_xr0","mov_a_xr1","jb_7","call_7","sel_mb1","jc","rlc_a","mov_a_r0","mov_a_r1","mov_a_r2","mov_a_r3","mov_a_r4","mov_a_r5","mov_a_r6","mov_a_r7"]);

class GeneratedI8035 implements Cpu {
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
  private m_a = ((0) & 0xff);
  private m_a11 = ((0) & 0xffff);
  private m_dataptr = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  private m_dbbi = ((0) & 0xff);
  private m_dbbo = ((0) & 0xff);
  private m_dma_enabled = ((0) ? 1 : 0);
  private m_ea = ((0) & 0xff);
  private m_f = {  };
  private m_f1 = ((0) ? 1 : 0);
  private m_feature_mask = ((3) & 0xff);
  private m_flags_enabled = ((0) ? 1 : 0);
  private m_icount = ((0) >>> 0);
  private m_irq_in_progress = ((0) ? 1 : 0);
  private m_irq_polled = ((0) ? 1 : 0);
  private m_irq_state = ((0) ? 1 : 0);
  private m_p1 = ((0) & 0xff);
  private m_p2 = ((0) & 0xff);
  private m_pc = ((0) & 0xffff);
  private m_prescaler = ((0) & 0xff);
  private m_prevpc = ((0) & 0xffff);
  private m_psw = ((0) & 0xff);
  private m_ram_size = ((64) & 0xffff);
  private m_ref = ((0) >>> 0);
  private m_rom_size = ((0) & 0xffff);
  private m_sts = ((0) & 0xff);
  private m_t1_history = ((0) & 0xff);
  private m_timecount_enabled = ((0) & 0xff);
  private m_timer = ((0) & 0xff);
  private m_timer_flag = ((0) ? 1 : 0);
  private m_timer_overflow = ((0) ? 1 : 0);
  private m_tirq_enabled = ((0) ? 1 : 0);
  private m_xirq_enabled = ((0) ? 1 : 0);


  constructor(bus: CpuBus) {
    this.bus = bus;
    this.generatedStart();
    this.reset();
  }

  reset(): void {
    this.resetInternal();
    this.m_pc = ((0) & 0xffff);
    this.m_psw = ((((this.m_psw) & (((128) | (64))))) & 0xff);
    this.m_f1 = ((0) ? 1 : 0);
    this.m_a11 = ((0) & 0xffff);
    this.m_tirq_enabled = ((0) ? 1 : 0);
    this.m_xirq_enabled = ((0) ? 1 : 0);
    this.m_timecount_enabled = ((0) & 0xff);
    this.m_timer_flag = ((0) ? 1 : 0);
    this.m_sts = ((0) & 0xff);
    this.m_flags_enabled = ((0) ? 1 : 0);
    this.m_dma_enabled = ((0) ? 1 : 0);
    this.m_irq_in_progress = ((0) ? 1 : 0);
    this.m_timer_overflow = ((0) ? 1 : 0);
    this.m_irq_polled = ((0) ? 1 : 0);
    this.m_dbbo = ((255) & 0xff);
    (this.bus.signal?.('bus_out_cb', (255) & 0xff) ?? 0);
    this.m_p1 = ((255) & 0xff);
    this.m_p2 = ((255) & 0xff);
    (this.bus.signal?.('p' + (1) + '_out_cb', (this.m_p1) & 0xff) ?? 0);
    (this.bus.signal?.('p' + (2) + '_out_cb', (this.m_p2) & 0xff) ?? 0);
  }

  step(): number {
    this.cycles = 0;
    this.m_icount = 1;
    this.generatedService();
    if (this.cycles > 0) return this.cycles;
    this.generatedFetch();
    let dispatches = 0;
    while (true) {
      if (++dispatches > 8) throw new Error('I8035 dispatch loop exceeded 8');
      switch ((this.m_ref >>> 8) & 0xffff) {
      case 0x0000: {
        this.method_nop();
        return this.cycles;
      }
      case 0x0100: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x0200: {
        this.method_outl_bus_a();
        return this.cycles;
      }
      case 0x0300: {
        this.method_add_a_n();
        return this.cycles;
      }
      case 0x0400: {
        this.method_jmp_0();
        return this.cycles;
      }
      case 0x0500: {
        this.method_en_i();
        return this.cycles;
      }
      case 0x0600: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x0700: {
        this.method_dec_a();
        return this.cycles;
      }
      case 0x0800: {
        this.method_ins_a_bus();
        return this.cycles;
      }
      case 0x0900: {
        this.method_in_a_p1();
        return this.cycles;
      }
      case 0x0a00: {
        this.method_in_a_p2();
        return this.cycles;
      }
      case 0x0b00: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x0c00: {
        this.method_movd_a_p4();
        return this.cycles;
      }
      case 0x0d00: {
        this.method_movd_a_p5();
        return this.cycles;
      }
      case 0x0e00: {
        this.method_movd_a_p6();
        return this.cycles;
      }
      case 0x0f00: {
        this.method_movd_a_p7();
        return this.cycles;
      }
      case 0x1000: {
        this.method_inc_xr0();
        return this.cycles;
      }
      case 0x1100: {
        this.method_inc_xr1();
        return this.cycles;
      }
      case 0x1200: {
        this.method_jb_0();
        return this.cycles;
      }
      case 0x1300: {
        this.method_adc_a_n();
        return this.cycles;
      }
      case 0x1400: {
        this.method_call_0();
        return this.cycles;
      }
      case 0x1500: {
        this.method_dis_i();
        return this.cycles;
      }
      case 0x1600: {
        this.method_jtf();
        return this.cycles;
      }
      case 0x1700: {
        this.method_inc_a();
        return this.cycles;
      }
      case 0x1800: {
        this.method_inc_r0();
        return this.cycles;
      }
      case 0x1900: {
        this.method_inc_r1();
        return this.cycles;
      }
      case 0x1a00: {
        this.method_inc_r2();
        return this.cycles;
      }
      case 0x1b00: {
        this.method_inc_r3();
        return this.cycles;
      }
      case 0x1c00: {
        this.method_inc_r4();
        return this.cycles;
      }
      case 0x1d00: {
        this.method_inc_r5();
        return this.cycles;
      }
      case 0x1e00: {
        this.method_inc_r6();
        return this.cycles;
      }
      case 0x1f00: {
        this.method_inc_r7();
        return this.cycles;
      }
      case 0x2000: {
        this.method_xch_a_xr0();
        return this.cycles;
      }
      case 0x2100: {
        this.method_xch_a_xr1();
        return this.cycles;
      }
      case 0x2200: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x2300: {
        this.method_mov_a_n();
        return this.cycles;
      }
      case 0x2400: {
        this.method_jmp_1();
        return this.cycles;
      }
      case 0x2500: {
        this.method_en_tcnti();
        return this.cycles;
      }
      case 0x2600: {
        this.method_jnt_0();
        return this.cycles;
      }
      case 0x2700: {
        this.method_clr_a();
        return this.cycles;
      }
      case 0x2800: {
        this.method_xch_a_r0();
        return this.cycles;
      }
      case 0x2900: {
        this.method_xch_a_r1();
        return this.cycles;
      }
      case 0x2a00: {
        this.method_xch_a_r2();
        return this.cycles;
      }
      case 0x2b00: {
        this.method_xch_a_r3();
        return this.cycles;
      }
      case 0x2c00: {
        this.method_xch_a_r4();
        return this.cycles;
      }
      case 0x2d00: {
        this.method_xch_a_r5();
        return this.cycles;
      }
      case 0x2e00: {
        this.method_xch_a_r6();
        return this.cycles;
      }
      case 0x2f00: {
        this.method_xch_a_r7();
        return this.cycles;
      }
      case 0x3000: {
        this.method_xchd_a_xr0();
        return this.cycles;
      }
      case 0x3100: {
        this.method_xchd_a_xr1();
        return this.cycles;
      }
      case 0x3200: {
        this.method_jb_1();
        return this.cycles;
      }
      case 0x3300: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x3400: {
        this.method_call_1();
        return this.cycles;
      }
      case 0x3500: {
        this.method_dis_tcnti();
        return this.cycles;
      }
      case 0x3600: {
        this.method_jt_0();
        return this.cycles;
      }
      case 0x3700: {
        this.method_cpl_a();
        return this.cycles;
      }
      case 0x3800: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x3900: {
        this.method_outl_p1_a();
        return this.cycles;
      }
      case 0x3a00: {
        this.method_outl_p2_a();
        return this.cycles;
      }
      case 0x3b00: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x3c00: {
        this.method_movd_p4_a();
        return this.cycles;
      }
      case 0x3d00: {
        this.method_movd_p5_a();
        return this.cycles;
      }
      case 0x3e00: {
        this.method_movd_p6_a();
        return this.cycles;
      }
      case 0x3f00: {
        this.method_movd_p7_a();
        return this.cycles;
      }
      case 0x4000: {
        this.method_orl_a_xr0();
        return this.cycles;
      }
      case 0x4100: {
        this.method_orl_a_xr1();
        return this.cycles;
      }
      case 0x4200: {
        this.method_mov_a_t();
        return this.cycles;
      }
      case 0x4300: {
        this.method_orl_a_n();
        return this.cycles;
      }
      case 0x4400: {
        this.method_jmp_2();
        return this.cycles;
      }
      case 0x4500: {
        this.method_strt_cnt();
        return this.cycles;
      }
      case 0x4600: {
        this.method_jnt_1();
        return this.cycles;
      }
      case 0x4700: {
        this.method_swap_a();
        return this.cycles;
      }
      case 0x4800: {
        this.method_orl_a_r0();
        return this.cycles;
      }
      case 0x4900: {
        this.method_orl_a_r1();
        return this.cycles;
      }
      case 0x4a00: {
        this.method_orl_a_r2();
        return this.cycles;
      }
      case 0x4b00: {
        this.method_orl_a_r3();
        return this.cycles;
      }
      case 0x4c00: {
        this.method_orl_a_r4();
        return this.cycles;
      }
      case 0x4d00: {
        this.method_orl_a_r5();
        return this.cycles;
      }
      case 0x4e00: {
        this.method_orl_a_r6();
        return this.cycles;
      }
      case 0x4f00: {
        this.method_orl_a_r7();
        return this.cycles;
      }
      case 0x5000: {
        this.method_anl_a_xr0();
        return this.cycles;
      }
      case 0x5100: {
        this.method_anl_a_xr1();
        return this.cycles;
      }
      case 0x5200: {
        this.method_jb_2();
        return this.cycles;
      }
      case 0x5300: {
        this.method_anl_a_n();
        return this.cycles;
      }
      case 0x5400: {
        this.method_call_2();
        return this.cycles;
      }
      case 0x5500: {
        this.method_strt_t();
        return this.cycles;
      }
      case 0x5600: {
        this.method_jt_1();
        return this.cycles;
      }
      case 0x5700: {
        this.method_da_a();
        return this.cycles;
      }
      case 0x5800: {
        this.method_anl_a_r0();
        return this.cycles;
      }
      case 0x5900: {
        this.method_anl_a_r1();
        return this.cycles;
      }
      case 0x5a00: {
        this.method_anl_a_r2();
        return this.cycles;
      }
      case 0x5b00: {
        this.method_anl_a_r3();
        return this.cycles;
      }
      case 0x5c00: {
        this.method_anl_a_r4();
        return this.cycles;
      }
      case 0x5d00: {
        this.method_anl_a_r5();
        return this.cycles;
      }
      case 0x5e00: {
        this.method_anl_a_r6();
        return this.cycles;
      }
      case 0x5f00: {
        this.method_anl_a_r7();
        return this.cycles;
      }
      case 0x6000: {
        this.method_add_a_xr0();
        return this.cycles;
      }
      case 0x6100: {
        this.method_add_a_xr1();
        return this.cycles;
      }
      case 0x6200: {
        this.method_mov_t_a();
        return this.cycles;
      }
      case 0x6300: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x6400: {
        this.method_jmp_3();
        return this.cycles;
      }
      case 0x6500: {
        this.method_stop_tcnt();
        return this.cycles;
      }
      case 0x6600: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x6700: {
        this.method_rrc_a();
        return this.cycles;
      }
      case 0x6800: {
        this.method_add_a_r0();
        return this.cycles;
      }
      case 0x6900: {
        this.method_add_a_r1();
        return this.cycles;
      }
      case 0x6a00: {
        this.method_add_a_r2();
        return this.cycles;
      }
      case 0x6b00: {
        this.method_add_a_r3();
        return this.cycles;
      }
      case 0x6c00: {
        this.method_add_a_r4();
        return this.cycles;
      }
      case 0x6d00: {
        this.method_add_a_r5();
        return this.cycles;
      }
      case 0x6e00: {
        this.method_add_a_r6();
        return this.cycles;
      }
      case 0x6f00: {
        this.method_add_a_r7();
        return this.cycles;
      }
      case 0x7000: {
        this.method_adc_a_xr0();
        return this.cycles;
      }
      case 0x7100: {
        this.method_adc_a_xr1();
        return this.cycles;
      }
      case 0x7200: {
        this.method_jb_3();
        return this.cycles;
      }
      case 0x7300: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x7400: {
        this.method_call_3();
        return this.cycles;
      }
      case 0x7500: {
        this.method_ent0_clk();
        return this.cycles;
      }
      case 0x7600: {
        this.method_jf1();
        return this.cycles;
      }
      case 0x7700: {
        this.method_rr_a();
        return this.cycles;
      }
      case 0x7800: {
        this.method_adc_a_r0();
        return this.cycles;
      }
      case 0x7900: {
        this.method_adc_a_r1();
        return this.cycles;
      }
      case 0x7a00: {
        this.method_adc_a_r2();
        return this.cycles;
      }
      case 0x7b00: {
        this.method_adc_a_r3();
        return this.cycles;
      }
      case 0x7c00: {
        this.method_adc_a_r4();
        return this.cycles;
      }
      case 0x7d00: {
        this.method_adc_a_r5();
        return this.cycles;
      }
      case 0x7e00: {
        this.method_adc_a_r6();
        return this.cycles;
      }
      case 0x7f00: {
        this.method_adc_a_r7();
        return this.cycles;
      }
      case 0x8000: {
        this.method_movx_a_xr0();
        return this.cycles;
      }
      case 0x8100: {
        this.method_movx_a_xr1();
        return this.cycles;
      }
      case 0x8200: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x8300: {
        this.method_ret();
        return this.cycles;
      }
      case 0x8400: {
        this.method_jmp_4();
        return this.cycles;
      }
      case 0x8500: {
        this.method_clr_f0();
        return this.cycles;
      }
      case 0x8600: {
        this.method_jni();
        return this.cycles;
      }
      case 0x8700: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x8800: {
        this.method_orl_bus_n();
        return this.cycles;
      }
      case 0x8900: {
        this.method_orl_p1_n();
        return this.cycles;
      }
      case 0x8a00: {
        this.method_orl_p2_n();
        return this.cycles;
      }
      case 0x8b00: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x8c00: {
        this.method_orld_p4_a();
        return this.cycles;
      }
      case 0x8d00: {
        this.method_orld_p5_a();
        return this.cycles;
      }
      case 0x8e00: {
        this.method_orld_p6_a();
        return this.cycles;
      }
      case 0x8f00: {
        this.method_orld_p7_a();
        return this.cycles;
      }
      case 0x9000: {
        this.method_movx_xr0_a();
        return this.cycles;
      }
      case 0x9100: {
        this.method_movx_xr1_a();
        return this.cycles;
      }
      case 0x9200: {
        this.method_jb_4();
        return this.cycles;
      }
      case 0x9300: {
        this.method_retr();
        return this.cycles;
      }
      case 0x9400: {
        this.method_call_4();
        return this.cycles;
      }
      case 0x9500: {
        this.method_cpl_f0();
        return this.cycles;
      }
      case 0x9600: {
        this.method_jnz();
        return this.cycles;
      }
      case 0x9700: {
        this.method_clr_c();
        return this.cycles;
      }
      case 0x9800: {
        this.method_anl_bus_n();
        return this.cycles;
      }
      case 0x9900: {
        this.method_anl_p1_n();
        return this.cycles;
      }
      case 0x9a00: {
        this.method_anl_p2_n();
        return this.cycles;
      }
      case 0x9b00: {
        this.method_illegal();
        return this.cycles;
      }
      case 0x9c00: {
        this.method_anld_p4_a();
        return this.cycles;
      }
      case 0x9d00: {
        this.method_anld_p5_a();
        return this.cycles;
      }
      case 0x9e00: {
        this.method_anld_p6_a();
        return this.cycles;
      }
      case 0x9f00: {
        this.method_anld_p7_a();
        return this.cycles;
      }
      case 0xa000: {
        this.method_mov_xr0_a();
        return this.cycles;
      }
      case 0xa100: {
        this.method_mov_xr1_a();
        return this.cycles;
      }
      case 0xa200: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xa300: {
        this.method_movp_a_xa();
        return this.cycles;
      }
      case 0xa400: {
        this.method_jmp_5();
        return this.cycles;
      }
      case 0xa500: {
        this.method_clr_f1();
        return this.cycles;
      }
      case 0xa600: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xa700: {
        this.method_cpl_c();
        return this.cycles;
      }
      case 0xa800: {
        this.method_mov_r0_a();
        return this.cycles;
      }
      case 0xa900: {
        this.method_mov_r1_a();
        return this.cycles;
      }
      case 0xaa00: {
        this.method_mov_r2_a();
        return this.cycles;
      }
      case 0xab00: {
        this.method_mov_r3_a();
        return this.cycles;
      }
      case 0xac00: {
        this.method_mov_r4_a();
        return this.cycles;
      }
      case 0xad00: {
        this.method_mov_r5_a();
        return this.cycles;
      }
      case 0xae00: {
        this.method_mov_r6_a();
        return this.cycles;
      }
      case 0xaf00: {
        this.method_mov_r7_a();
        return this.cycles;
      }
      case 0xb000: {
        this.method_mov_xr0_n();
        return this.cycles;
      }
      case 0xb100: {
        this.method_mov_xr1_n();
        return this.cycles;
      }
      case 0xb200: {
        this.method_jb_5();
        return this.cycles;
      }
      case 0xb300: {
        this.method_jmpp_xa();
        return this.cycles;
      }
      case 0xb400: {
        this.method_call_5();
        return this.cycles;
      }
      case 0xb500: {
        this.method_cpl_f1();
        return this.cycles;
      }
      case 0xb600: {
        this.method_jf0();
        return this.cycles;
      }
      case 0xb700: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xb800: {
        this.method_mov_r0_n();
        return this.cycles;
      }
      case 0xb900: {
        this.method_mov_r1_n();
        return this.cycles;
      }
      case 0xba00: {
        this.method_mov_r2_n();
        return this.cycles;
      }
      case 0xbb00: {
        this.method_mov_r3_n();
        return this.cycles;
      }
      case 0xbc00: {
        this.method_mov_r4_n();
        return this.cycles;
      }
      case 0xbd00: {
        this.method_mov_r5_n();
        return this.cycles;
      }
      case 0xbe00: {
        this.method_mov_r6_n();
        return this.cycles;
      }
      case 0xbf00: {
        this.method_mov_r7_n();
        return this.cycles;
      }
      case 0xc000: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xc100: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xc200: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xc300: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xc400: {
        this.method_jmp_6();
        return this.cycles;
      }
      case 0xc500: {
        this.method_sel_rb0();
        return this.cycles;
      }
      case 0xc600: {
        this.method_jz();
        return this.cycles;
      }
      case 0xc700: {
        this.method_mov_a_psw();
        return this.cycles;
      }
      case 0xc800: {
        this.method_dec_r0();
        return this.cycles;
      }
      case 0xc900: {
        this.method_dec_r1();
        return this.cycles;
      }
      case 0xca00: {
        this.method_dec_r2();
        return this.cycles;
      }
      case 0xcb00: {
        this.method_dec_r3();
        return this.cycles;
      }
      case 0xcc00: {
        this.method_dec_r4();
        return this.cycles;
      }
      case 0xcd00: {
        this.method_dec_r5();
        return this.cycles;
      }
      case 0xce00: {
        this.method_dec_r6();
        return this.cycles;
      }
      case 0xcf00: {
        this.method_dec_r7();
        return this.cycles;
      }
      case 0xd000: {
        this.method_xrl_a_xr0();
        return this.cycles;
      }
      case 0xd100: {
        this.method_xrl_a_xr1();
        return this.cycles;
      }
      case 0xd200: {
        this.method_jb_6();
        return this.cycles;
      }
      case 0xd300: {
        this.method_xrl_a_n();
        return this.cycles;
      }
      case 0xd400: {
        this.method_call_6();
        return this.cycles;
      }
      case 0xd500: {
        this.method_sel_rb1();
        return this.cycles;
      }
      case 0xd600: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xd700: {
        this.method_mov_psw_a();
        return this.cycles;
      }
      case 0xd800: {
        this.method_xrl_a_r0();
        return this.cycles;
      }
      case 0xd900: {
        this.method_xrl_a_r1();
        return this.cycles;
      }
      case 0xda00: {
        this.method_xrl_a_r2();
        return this.cycles;
      }
      case 0xdb00: {
        this.method_xrl_a_r3();
        return this.cycles;
      }
      case 0xdc00: {
        this.method_xrl_a_r4();
        return this.cycles;
      }
      case 0xdd00: {
        this.method_xrl_a_r5();
        return this.cycles;
      }
      case 0xde00: {
        this.method_xrl_a_r6();
        return this.cycles;
      }
      case 0xdf00: {
        this.method_xrl_a_r7();
        return this.cycles;
      }
      case 0xe000: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xe100: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xe200: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xe300: {
        this.method_movp3_a_xa();
        return this.cycles;
      }
      case 0xe400: {
        this.method_jmp_7();
        return this.cycles;
      }
      case 0xe500: {
        this.method_sel_mb0();
        return this.cycles;
      }
      case 0xe600: {
        this.method_jnc();
        return this.cycles;
      }
      case 0xe700: {
        this.method_rl_a();
        return this.cycles;
      }
      case 0xe800: {
        this.method_djnz_r0();
        return this.cycles;
      }
      case 0xe900: {
        this.method_djnz_r1();
        return this.cycles;
      }
      case 0xea00: {
        this.method_djnz_r2();
        return this.cycles;
      }
      case 0xeb00: {
        this.method_djnz_r3();
        return this.cycles;
      }
      case 0xec00: {
        this.method_djnz_r4();
        return this.cycles;
      }
      case 0xed00: {
        this.method_djnz_r5();
        return this.cycles;
      }
      case 0xee00: {
        this.method_djnz_r6();
        return this.cycles;
      }
      case 0xef00: {
        this.method_djnz_r7();
        return this.cycles;
      }
      case 0xf000: {
        this.method_mov_a_xr0();
        return this.cycles;
      }
      case 0xf100: {
        this.method_mov_a_xr1();
        return this.cycles;
      }
      case 0xf200: {
        this.method_jb_7();
        return this.cycles;
      }
      case 0xf300: {
        this.method_illegal();
        return this.cycles;
      }
      case 0xf400: {
        this.method_call_7();
        return this.cycles;
      }
      case 0xf500: {
        this.method_sel_mb1();
        return this.cycles;
      }
      case 0xf600: {
        this.method_jc();
        return this.cycles;
      }
      case 0xf700: {
        this.method_rlc_a();
        return this.cycles;
      }
      case 0xf800: {
        this.method_mov_a_r0();
        return this.cycles;
      }
      case 0xf900: {
        this.method_mov_a_r1();
        return this.cycles;
      }
      case 0xfa00: {
        this.method_mov_a_r2();
        return this.cycles;
      }
      case 0xfb00: {
        this.method_mov_a_r3();
        return this.cycles;
      }
      case 0xfc00: {
        this.method_mov_a_r4();
        return this.cycles;
      }
      case 0xfd00: {
        this.method_mov_a_r5();
        return this.cycles;
      }
      case 0xfe00: {
        this.method_mov_a_r6();
        return this.cycles;
      }
      case 0xff00: {
        this.method_mov_a_r7();
        return this.cycles;
      }
        default:
          throw new Error('I8035 has no generated opcode ' +
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
      case "cycles": return this.cycles;
      case "m_a": return this.m_a;
      case "m_a11": return this.m_a11;
      case "m_dbbi": return this.m_dbbi;
      case "m_dbbo": return this.m_dbbo;
      case "m_dma_enabled": return this.m_dma_enabled;
      case "m_ea": return this.m_ea;
      case "m_f1": return this.m_f1;
      case "m_feature_mask": return this.m_feature_mask;
      case "m_flags_enabled": return this.m_flags_enabled;
      case "m_icount": return this.m_icount;
      case "m_irq_in_progress": return this.m_irq_in_progress;
      case "m_irq_polled": return this.m_irq_polled;
      case "m_irq_state": return this.m_irq_state;
      case "m_p1": return this.m_p1;
      case "m_p2": return this.m_p2;
      case "m_pc": return this.m_pc;
      case "m_prescaler": return this.m_prescaler;
      case "m_prevpc": return this.m_prevpc;
      case "m_psw": return this.m_psw;
      case "m_ram_size": return this.m_ram_size;
      case "m_ref": return this.m_ref;
      case "m_rom_size": return this.m_rom_size;
      case "m_sts": return this.m_sts;
      case "m_t1_history": return this.m_t1_history;
      case "m_timecount_enabled": return this.m_timecount_enabled;
      case "m_timer": return this.m_timer;
      case "m_timer_flag": return this.m_timer_flag;
      case "m_timer_overflow": return this.m_timer_overflow;
      case "m_tirq_enabled": return this.m_tirq_enabled;
      case "m_xirq_enabled": return this.m_xirq_enabled;
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
      case "m_a": this.m_a = ((value) & 0xff); return;
      case "m_a11": this.m_a11 = ((value) & 0xffff); return;
      case "m_dbbi": this.m_dbbi = ((value) & 0xff); return;
      case "m_dbbo": this.m_dbbo = ((value) & 0xff); return;
      case "m_dma_enabled": this.m_dma_enabled = ((value) ? 1 : 0); return;
      case "m_ea": this.m_ea = ((value) & 0xff); return;
      case "m_f1": this.m_f1 = ((value) ? 1 : 0); return;
      case "m_feature_mask": this.m_feature_mask = ((value) & 0xff); return;
      case "m_flags_enabled": this.m_flags_enabled = ((value) ? 1 : 0); return;
      case "m_icount": this.m_icount = ((value) >>> 0); return;
      case "m_irq_in_progress": this.m_irq_in_progress = ((value) ? 1 : 0); return;
      case "m_irq_polled": this.m_irq_polled = ((value) ? 1 : 0); return;
      case "m_irq_state": this.m_irq_state = ((value) ? 1 : 0); return;
      case "m_p1": this.m_p1 = ((value) & 0xff); return;
      case "m_p2": this.m_p2 = ((value) & 0xff); return;
      case "m_pc": this.m_pc = ((value) & 0xffff); return;
      case "m_prescaler": this.m_prescaler = ((value) & 0xff); return;
      case "m_prevpc": this.m_prevpc = ((value) & 0xffff); return;
      case "m_psw": this.m_psw = ((value) & 0xff); return;
      case "m_ram_size": this.m_ram_size = ((value) & 0xffff); return;
      case "m_ref": this.m_ref = ((value) >>> 0); return;
      case "m_rom_size": this.m_rom_size = ((value) & 0xffff); return;
      case "m_sts": this.m_sts = ((value) & 0xff); return;
      case "m_t1_history": this.m_t1_history = ((value) & 0xff); return;
      case "m_timecount_enabled": this.m_timecount_enabled = ((value) & 0xff); return;
      case "m_timer": this.m_timer = ((value) & 0xff); return;
      case "m_timer_flag": this.m_timer_flag = ((value) ? 1 : 0); return;
      case "m_timer_overflow": this.m_timer_overflow = ((value) ? 1 : 0); return;
      case "m_tirq_enabled": this.m_tirq_enabled = ((value) ? 1 : 0); return;
      case "m_xirq_enabled": this.m_xirq_enabled = ((value) ? 1 : 0); return;
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
      case "opcode_fetch": return this.method_opcode_fetch();
      case "argument_fetch": return this.method_argument_fetch();
      case "push_pc_psw": return this.method_push_pc_psw();
      case "pull_pc_psw": return this.method_pull_pc_psw();
      case "pull_pc": return this.method_pull_pc();
      case "execute_add": return this.method_execute_add(args[0] ?? 0);
      case "execute_addc": return this.method_execute_addc(args[0] ?? 0);
      case "execute_jmp": return this.method_execute_jmp(args[0] ?? 0);
      case "execute_call": return this.method_execute_call(args[0] ?? 0);
      case "execute_jcc": return this.method_execute_jcc(args[0] ?? 0);
      case "p2_mask": return this.method_p2_mask();
      case "expander_operation": return this.method_expander_operation(args[0] ?? 0, args[1] ?? 0);
      case "check_irqs": return this.method_check_irqs();
      case "burn_cycles": return this.method_burn_cycles(args[0] ?? 0);
      case "nop": return this.method_nop();
      case "illegal": return this.method_illegal();
      case "outl_bus_a": return this.method_outl_bus_a();
      case "add_a_n": return this.method_add_a_n();
      case "jmp_0": return this.method_jmp_0();
      case "en_i": return this.method_en_i();
      case "dec_a": return this.method_dec_a();
      case "ins_a_bus": return this.method_ins_a_bus();
      case "in_a_p1": return this.method_in_a_p1();
      case "in_a_p2": return this.method_in_a_p2();
      case "movd_a_p4": return this.method_movd_a_p4();
      case "movd_a_p5": return this.method_movd_a_p5();
      case "movd_a_p6": return this.method_movd_a_p6();
      case "movd_a_p7": return this.method_movd_a_p7();
      case "inc_xr0": return this.method_inc_xr0();
      case "inc_xr1": return this.method_inc_xr1();
      case "jb_0": return this.method_jb_0();
      case "adc_a_n": return this.method_adc_a_n();
      case "call_0": return this.method_call_0();
      case "dis_i": return this.method_dis_i();
      case "jtf": return this.method_jtf();
      case "inc_a": return this.method_inc_a();
      case "inc_r0": return this.method_inc_r0();
      case "inc_r1": return this.method_inc_r1();
      case "inc_r2": return this.method_inc_r2();
      case "inc_r3": return this.method_inc_r3();
      case "inc_r4": return this.method_inc_r4();
      case "inc_r5": return this.method_inc_r5();
      case "inc_r6": return this.method_inc_r6();
      case "inc_r7": return this.method_inc_r7();
      case "xch_a_xr0": return this.method_xch_a_xr0();
      case "xch_a_xr1": return this.method_xch_a_xr1();
      case "mov_a_n": return this.method_mov_a_n();
      case "jmp_1": return this.method_jmp_1();
      case "en_tcnti": return this.method_en_tcnti();
      case "jnt_0": return this.method_jnt_0();
      case "clr_a": return this.method_clr_a();
      case "xch_a_r0": return this.method_xch_a_r0();
      case "xch_a_r1": return this.method_xch_a_r1();
      case "xch_a_r2": return this.method_xch_a_r2();
      case "xch_a_r3": return this.method_xch_a_r3();
      case "xch_a_r4": return this.method_xch_a_r4();
      case "xch_a_r5": return this.method_xch_a_r5();
      case "xch_a_r6": return this.method_xch_a_r6();
      case "xch_a_r7": return this.method_xch_a_r7();
      case "xchd_a_xr0": return this.method_xchd_a_xr0();
      case "xchd_a_xr1": return this.method_xchd_a_xr1();
      case "jb_1": return this.method_jb_1();
      case "call_1": return this.method_call_1();
      case "dis_tcnti": return this.method_dis_tcnti();
      case "jt_0": return this.method_jt_0();
      case "cpl_a": return this.method_cpl_a();
      case "outl_p1_a": return this.method_outl_p1_a();
      case "outl_p2_a": return this.method_outl_p2_a();
      case "movd_p4_a": return this.method_movd_p4_a();
      case "movd_p5_a": return this.method_movd_p5_a();
      case "movd_p6_a": return this.method_movd_p6_a();
      case "movd_p7_a": return this.method_movd_p7_a();
      case "orl_a_xr0": return this.method_orl_a_xr0();
      case "orl_a_xr1": return this.method_orl_a_xr1();
      case "mov_a_t": return this.method_mov_a_t();
      case "orl_a_n": return this.method_orl_a_n();
      case "jmp_2": return this.method_jmp_2();
      case "strt_cnt": return this.method_strt_cnt();
      case "jnt_1": return this.method_jnt_1();
      case "swap_a": return this.method_swap_a();
      case "orl_a_r0": return this.method_orl_a_r0();
      case "orl_a_r1": return this.method_orl_a_r1();
      case "orl_a_r2": return this.method_orl_a_r2();
      case "orl_a_r3": return this.method_orl_a_r3();
      case "orl_a_r4": return this.method_orl_a_r4();
      case "orl_a_r5": return this.method_orl_a_r5();
      case "orl_a_r6": return this.method_orl_a_r6();
      case "orl_a_r7": return this.method_orl_a_r7();
      case "anl_a_xr0": return this.method_anl_a_xr0();
      case "anl_a_xr1": return this.method_anl_a_xr1();
      case "jb_2": return this.method_jb_2();
      case "anl_a_n": return this.method_anl_a_n();
      case "call_2": return this.method_call_2();
      case "strt_t": return this.method_strt_t();
      case "jt_1": return this.method_jt_1();
      case "da_a": return this.method_da_a();
      case "anl_a_r0": return this.method_anl_a_r0();
      case "anl_a_r1": return this.method_anl_a_r1();
      case "anl_a_r2": return this.method_anl_a_r2();
      case "anl_a_r3": return this.method_anl_a_r3();
      case "anl_a_r4": return this.method_anl_a_r4();
      case "anl_a_r5": return this.method_anl_a_r5();
      case "anl_a_r6": return this.method_anl_a_r6();
      case "anl_a_r7": return this.method_anl_a_r7();
      case "add_a_xr0": return this.method_add_a_xr0();
      case "add_a_xr1": return this.method_add_a_xr1();
      case "mov_t_a": return this.method_mov_t_a();
      case "jmp_3": return this.method_jmp_3();
      case "stop_tcnt": return this.method_stop_tcnt();
      case "rrc_a": return this.method_rrc_a();
      case "add_a_r0": return this.method_add_a_r0();
      case "add_a_r1": return this.method_add_a_r1();
      case "add_a_r2": return this.method_add_a_r2();
      case "add_a_r3": return this.method_add_a_r3();
      case "add_a_r4": return this.method_add_a_r4();
      case "add_a_r5": return this.method_add_a_r5();
      case "add_a_r6": return this.method_add_a_r6();
      case "add_a_r7": return this.method_add_a_r7();
      case "adc_a_xr0": return this.method_adc_a_xr0();
      case "adc_a_xr1": return this.method_adc_a_xr1();
      case "jb_3": return this.method_jb_3();
      case "call_3": return this.method_call_3();
      case "ent0_clk": return this.method_ent0_clk();
      case "jf1": return this.method_jf1();
      case "rr_a": return this.method_rr_a();
      case "adc_a_r0": return this.method_adc_a_r0();
      case "adc_a_r1": return this.method_adc_a_r1();
      case "adc_a_r2": return this.method_adc_a_r2();
      case "adc_a_r3": return this.method_adc_a_r3();
      case "adc_a_r4": return this.method_adc_a_r4();
      case "adc_a_r5": return this.method_adc_a_r5();
      case "adc_a_r6": return this.method_adc_a_r6();
      case "adc_a_r7": return this.method_adc_a_r7();
      case "movx_a_xr0": return this.method_movx_a_xr0();
      case "movx_a_xr1": return this.method_movx_a_xr1();
      case "ret": return this.method_ret();
      case "jmp_4": return this.method_jmp_4();
      case "clr_f0": return this.method_clr_f0();
      case "jni": return this.method_jni();
      case "orl_bus_n": return this.method_orl_bus_n();
      case "orl_p1_n": return this.method_orl_p1_n();
      case "orl_p2_n": return this.method_orl_p2_n();
      case "orld_p4_a": return this.method_orld_p4_a();
      case "orld_p5_a": return this.method_orld_p5_a();
      case "orld_p6_a": return this.method_orld_p6_a();
      case "orld_p7_a": return this.method_orld_p7_a();
      case "movx_xr0_a": return this.method_movx_xr0_a();
      case "movx_xr1_a": return this.method_movx_xr1_a();
      case "jb_4": return this.method_jb_4();
      case "retr": return this.method_retr();
      case "call_4": return this.method_call_4();
      case "cpl_f0": return this.method_cpl_f0();
      case "jnz": return this.method_jnz();
      case "clr_c": return this.method_clr_c();
      case "anl_bus_n": return this.method_anl_bus_n();
      case "anl_p1_n": return this.method_anl_p1_n();
      case "anl_p2_n": return this.method_anl_p2_n();
      case "anld_p4_a": return this.method_anld_p4_a();
      case "anld_p5_a": return this.method_anld_p5_a();
      case "anld_p6_a": return this.method_anld_p6_a();
      case "anld_p7_a": return this.method_anld_p7_a();
      case "mov_xr0_a": return this.method_mov_xr0_a();
      case "mov_xr1_a": return this.method_mov_xr1_a();
      case "movp_a_xa": return this.method_movp_a_xa();
      case "jmp_5": return this.method_jmp_5();
      case "clr_f1": return this.method_clr_f1();
      case "cpl_c": return this.method_cpl_c();
      case "mov_r0_a": return this.method_mov_r0_a();
      case "mov_r1_a": return this.method_mov_r1_a();
      case "mov_r2_a": return this.method_mov_r2_a();
      case "mov_r3_a": return this.method_mov_r3_a();
      case "mov_r4_a": return this.method_mov_r4_a();
      case "mov_r5_a": return this.method_mov_r5_a();
      case "mov_r6_a": return this.method_mov_r6_a();
      case "mov_r7_a": return this.method_mov_r7_a();
      case "mov_xr0_n": return this.method_mov_xr0_n();
      case "mov_xr1_n": return this.method_mov_xr1_n();
      case "jb_5": return this.method_jb_5();
      case "jmpp_xa": return this.method_jmpp_xa();
      case "call_5": return this.method_call_5();
      case "cpl_f1": return this.method_cpl_f1();
      case "jf0": return this.method_jf0();
      case "mov_r0_n": return this.method_mov_r0_n();
      case "mov_r1_n": return this.method_mov_r1_n();
      case "mov_r2_n": return this.method_mov_r2_n();
      case "mov_r3_n": return this.method_mov_r3_n();
      case "mov_r4_n": return this.method_mov_r4_n();
      case "mov_r5_n": return this.method_mov_r5_n();
      case "mov_r6_n": return this.method_mov_r6_n();
      case "mov_r7_n": return this.method_mov_r7_n();
      case "jmp_6": return this.method_jmp_6();
      case "sel_rb0": return this.method_sel_rb0();
      case "jz": return this.method_jz();
      case "mov_a_psw": return this.method_mov_a_psw();
      case "dec_r0": return this.method_dec_r0();
      case "dec_r1": return this.method_dec_r1();
      case "dec_r2": return this.method_dec_r2();
      case "dec_r3": return this.method_dec_r3();
      case "dec_r4": return this.method_dec_r4();
      case "dec_r5": return this.method_dec_r5();
      case "dec_r6": return this.method_dec_r6();
      case "dec_r7": return this.method_dec_r7();
      case "xrl_a_xr0": return this.method_xrl_a_xr0();
      case "xrl_a_xr1": return this.method_xrl_a_xr1();
      case "jb_6": return this.method_jb_6();
      case "xrl_a_n": return this.method_xrl_a_n();
      case "call_6": return this.method_call_6();
      case "sel_rb1": return this.method_sel_rb1();
      case "mov_psw_a": return this.method_mov_psw_a();
      case "xrl_a_r0": return this.method_xrl_a_r0();
      case "xrl_a_r1": return this.method_xrl_a_r1();
      case "xrl_a_r2": return this.method_xrl_a_r2();
      case "xrl_a_r3": return this.method_xrl_a_r3();
      case "xrl_a_r4": return this.method_xrl_a_r4();
      case "xrl_a_r5": return this.method_xrl_a_r5();
      case "xrl_a_r6": return this.method_xrl_a_r6();
      case "xrl_a_r7": return this.method_xrl_a_r7();
      case "movp3_a_xa": return this.method_movp3_a_xa();
      case "jmp_7": return this.method_jmp_7();
      case "sel_mb0": return this.method_sel_mb0();
      case "jnc": return this.method_jnc();
      case "rl_a": return this.method_rl_a();
      case "djnz_r0": return this.method_djnz_r0();
      case "djnz_r1": return this.method_djnz_r1();
      case "djnz_r2": return this.method_djnz_r2();
      case "djnz_r3": return this.method_djnz_r3();
      case "djnz_r4": return this.method_djnz_r4();
      case "djnz_r5": return this.method_djnz_r5();
      case "djnz_r6": return this.method_djnz_r6();
      case "djnz_r7": return this.method_djnz_r7();
      case "mov_a_xr0": return this.method_mov_a_xr0();
      case "mov_a_xr1": return this.method_mov_a_xr1();
      case "jb_7": return this.method_jb_7();
      case "call_7": return this.method_call_7();
      case "sel_mb1": return this.method_sel_mb1();
      case "jc": return this.method_jc();
      case "rlc_a": return this.method_rlc_a();
      case "mov_a_r0": return this.method_mov_a_r0();
      case "mov_a_r1": return this.method_mov_a_r1();
      case "mov_a_r2": return this.method_mov_a_r2();
      case "mov_a_r3": return this.method_mov_a_r3();
      case "mov_a_r4": return this.method_mov_a_r4();
      case "mov_a_r5": return this.method_mov_a_r5();
      case "mov_a_r6": return this.method_mov_a_r6();
      case "mov_a_r7": return this.method_mov_a_r7();
      default: throw new Error('I8035 has no generated method "' + name + '"');
    }
  }

  private generatedStart(): void {
    this.m_prevpc = ((0) & 0xffff);
    this.m_pc = ((0) & 0xffff);
    this.m_a = ((0) & 0xff);
    this.m_psw = ((0) & 0xff);
    this.m_f1 = ((0) ? 1 : 0);
    this.m_a11 = ((0) & 0xffff);
    this.m_p1 = ((0) & 0xff);
    this.m_p2 = ((0) & 0xff);
    this.m_timer = ((0) & 0xff);
    this.m_prescaler = ((0) & 0xff);
    this.m_t1_history = ((0) & 0xff);
    this.m_dbbi = ((0) & 0xff);
    this.m_dbbo = ((0) & 0xff);
    this.m_irq_state = ((0) ? 1 : 0);
    this.m_irq_polled = ((0) ? 1 : 0);
    this.m_irq_in_progress = ((0) ? 1 : 0);
    this.m_timer_overflow = ((0) ? 1 : 0);
    this.m_timer_flag = ((0) ? 1 : 0);
    this.m_tirq_enabled = ((0) ? 1 : 0);
    this.m_xirq_enabled = ((0) ? 1 : 0);
    this.m_timecount_enabled = ((0) & 0xff);
    this.m_flags_enabled = ((0) ? 1 : 0);
    this.m_dma_enabled = ((0) ? 1 : 0);
  }

  private generatedInput(inputnum: number, state: number): void {
    switch (inputnum) {
      case 0:
        {
          this.m_irq_state = ((((Number(state) !== Number(0)) ? 1 : 0)) ? 1 : 0);
          break;
        }
      case 1:
        {
          this.m_ea = ((((Number(state) !== Number(0)) ? 1 : 0)) & 0xff);
          break;
        }
    }
  }

  private generatedService(): void {
    this.method_check_irqs();
    this.m_irq_polled = ((0) ? 1 : 0);
    this.m_prevpc = ((this.m_pc) & 0xffff);
  }

  private generatedFetch(): void {
    this.m_ref = ((((this.method_opcode_fetch()) << (16))) >>> 0);
  }

  private method_opcode_fetch(): number {
    let address = ((this.m_pc) & 0xffff);
    this.m_pc = ((((((((this.m_pc) + (1))) & (2047))) | (((this.m_pc) & (2048))))) & 0xffff);
    return (this.readMemory((address) & 0xffff) & 0xff);
    return 0;
  }

  private method_argument_fetch(): number {
    let address = ((this.m_pc) & 0xffff);
    this.m_pc = ((((((((this.m_pc) + (1))) & (2047))) | (((this.m_pc) & (2048))))) & 0xffff);
    return (this.readMemory((address) & 0xffff) & 0xff);
    return 0;
  }

  private method_push_pc_psw(): number {
    let sp = ((((this.m_psw) & (7))) & 0xff);
    (this.m_dataptr[(((8) + (((2) * (sp))))) & 0x7f] = (this.m_pc) & 0xff, 0);
    (this.m_dataptr[(((9) + (((2) * (sp))))) & 0x7f] = (((((((this.m_pc) >>> (8))) & (15))) | (((this.m_psw) & (240))))) & 0xff, 0);
    this.m_psw = ((((((this.m_psw) & (240))) | (((((sp) + (1))) & (7))))) & 0xff);
    return 0;
  }

  private method_pull_pc_psw(): number {
    let sp = ((((((this.m_psw) - (1))) & (7))) & 0xff);
    this.m_pc = (((this.m_dataptr[(((8) + (((2) * (sp))))) & 0x7f] & 0xff)) & 0xffff);
    this.m_pc = ((((this.m_pc) | ((((this.m_dataptr[(((9) + (((2) * (sp))))) & 0x7f] & 0xff)) << (8))))) & 0xffff);
    this.m_psw = ((((((((this.m_pc) >>> (8))) & (240))) | (sp))) & 0xff);
    this.m_pc = ((((this.m_pc) & (((this.m_irq_in_progress) ? (2047) : (4095))))) & 0xffff);
    return 0;
  }

  private method_pull_pc(): number {
    let sp = ((((((this.m_psw) - (1))) & (7))) & 0xff);
    this.m_pc = (((this.m_dataptr[(((8) + (((2) * (sp))))) & 0x7f] & 0xff)) & 0xffff);
    this.m_pc = ((((this.m_pc) | ((((this.m_dataptr[(((9) + (((2) * (sp))))) & 0x7f] & 0xff)) << (8))))) & 0xffff);
    this.m_pc = ((((this.m_pc) & (((this.m_irq_in_progress) ? (2047) : (4095))))) & 0xffff);
    this.m_psw = ((((((this.m_psw) & (240))) | (sp))) & 0xff);
    return 0;
  }

  private method_execute_add(dat: number = 0): number {
    let temp = ((((this.m_a) + (dat))) & 0xffff);
    let temp4 = ((((((this.m_a) & (15))) + (((dat) & (15))))) & 0xffff);
    this.m_psw = ((((this.m_psw) & ((~((128) | (64)))))) & 0xff);
    this.m_psw = ((((this.m_psw) | (((((temp4) << (2))) & (64))))) & 0xff);
    this.m_psw = ((((this.m_psw) | (((((temp) >>> (1))) & (128))))) & 0xff);
    this.m_a = ((temp) & 0xff);
    return 0;
  }

  private method_execute_addc(dat: number = 0): number {
    let carryin = ((((((this.m_psw) & (128))) >>> (7))) & 0xff);
    let temp = ((((((this.m_a) + (dat))) + (carryin))) & 0xffff);
    let temp4 = ((((((((this.m_a) & (15))) + (((dat) & (15))))) + (carryin))) & 0xffff);
    this.m_psw = ((((this.m_psw) & ((~((128) | (64)))))) & 0xff);
    this.m_psw = ((((this.m_psw) | (((((temp4) << (2))) & (64))))) & 0xff);
    this.m_psw = ((((this.m_psw) | (((((temp) >>> (1))) & (128))))) & 0xff);
    this.m_a = ((temp) & 0xff);
    return 0;
  }

  private method_execute_jmp(address: number = 0): number {
    let a11 = ((((this.m_irq_in_progress) ? (0) : (this.m_a11))) & 0xffff);
    this.m_pc = ((((address) | (a11))) & 0xffff);
    return 0;
  }

  private method_execute_call(address: number = 0): number {
    this.method_push_pc_psw();
    this.method_execute_jmp(address);
    return 0;
  }

  private method_execute_jcc(result: number = 0): number {
    let pch = ((((this.m_pc) & (3840))) & 0xffff);
    let offset = ((this.method_argument_fetch()) & 0xff);
    if (result) {
      this.m_pc = ((((pch) | (offset))) & 0xffff);
    }
    return 0;
  }

  private method_p2_mask(): number {
    let result = ((255) & 0xff);
    if (((Number(((this.m_feature_mask) & (4))) === Number(0)) ? 1 : 0)) {
      return result;
    }
    if (this.m_flags_enabled) {
      result = ((((result) & ((~((16) | (32)))))) & 0xff);
    }
    if (this.m_dma_enabled) {
      result = ((((result) & ((~((64) | (128)))))) & 0xff);
    }
    return result;
    return 0;
  }

  private method_expander_operation(operation: number = 0, port: number = 0): number {
    (this.bus.signal?.('p' + (2) + '_out_cb', ((this.m_p2 = ((((((((this.m_p2) & (240))) | (((((operation) & 0xff)) << (2))))) | (((port) & (3))))) & 0xff))) & 0xff) ?? 0);
    (this.bus.signal?.('prog_out_cb', (0) & 1) ?? 0);
    if (((Number(operation) !== Number(0)) ? 1 : 0)) {
      (this.bus.signal?.('p' + (2) + '_out_cb', ((this.m_p2 = ((((((this.m_p2) & (240))) | (((this.m_a) & (15))))) & 0xff))) & 0xff) ?? 0);
    } else {
      (this.bus.signal?.('p' + (2) + '_out_cb', ((this.m_p2 = ((((this.m_p2) | (15))) & 0xff))) & 0xff) ?? 0);
      this.m_a = (((((this.bus.signal?.('p' + (2) + '_in_cb', 0) ?? 0xff)) & (15))) & 0xff);
    }
    (this.bus.signal?.('prog_out_cb', (1) & 1) ?? 0);
    return 0;
  }

  private method_check_irqs(): number {
    if (this.m_irq_in_progress) {
      return 0;
    } else {
      if (((((((this.m_irq_state) || (((Number(((this.m_sts) & (2))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (this.m_xirq_enabled)) ? 1 : 0)) {
        this.acknowledgeIrq(0);
        this.method_burn_cycles(2);
        this.m_irq_in_progress = ((1) ? 1 : 0);
        if (this.m_irq_polled) {
          this.m_pc = ((((((((this.m_prevpc) + (1))) & (2047))) | (((this.m_prevpc) & (2048))))) & 0xffff);
          this.method_execute_jcc(1);
        }
        this.method_execute_call(3);
      } else {
        if ((((this.m_timer_overflow) && (this.m_tirq_enabled)) ? 1 : 0)) {
          this.acknowledgeIrq(1);
          this.method_burn_cycles(2);
          this.m_irq_in_progress = ((1) ? 1 : 0);
          this.method_execute_call(7);
          this.m_timer_overflow = ((0) ? 1 : 0);
        }
      }
    }
    return 0;
  }

  private method_burn_cycles(count: number = 0): number {
    let requested_cycles = ((count) | 0);
    if (this.m_timecount_enabled) {
      let timerover = ((0) ? 1 : 0);
      if (((this.m_timecount_enabled) & (1))) {
        let oldtimer = ((this.m_timer) & 0xff);
        this.m_prescaler = ((((this.m_prescaler) + (count))) & 0xff);
        this.m_timer = ((((this.m_timer) + (((this.m_prescaler) >>> (5))))) & 0xff);
        this.m_prescaler = ((((this.m_prescaler) & (31))) & 0xff);
        timerover = ((((Number(this.m_timer) < Number(oldtimer)) ? 1 : 0)) ? 1 : 0);
      } else {
        if (((this.m_timecount_enabled) & (2))) {
          for (; ((Number(count) > Number(0)) ? 1 : 0); count = ((((count) - (1))) | 0)) {
            this.m_t1_history = ((((((this.m_t1_history) << (1))) | ((((this.bus.signal?.('t' + (1) + '_in_cb', 0) ?? 0)) & (1))))) & 0xff);
            if (((Number(((this.m_t1_history) & (3))) === Number(2)) ? 1 : 0)) {
              if (((Number((this.m_timer = ((((this.m_timer) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                timerover = ((1) ? 1 : 0);
              }
            }
          }
        }
      }
      if (timerover) {
        this.m_timer_flag = ((1) ? 1 : 0);
        if (this.m_tirq_enabled) {
          this.m_timer_overflow = ((1) ? 1 : 0);
        }
      }
    }
    this.cycles = ((((this.cycles) + (requested_cycles))) >>> 0);
    return 0;
  }

  private method_nop(): number {
    this.method_burn_cycles(1);
    return 0;
  }

  private method_illegal(): number {
    this.method_burn_cycles(1);
    0;
    return 0;
  }

  private method_outl_bus_a(): number {
    this.method_burn_cycles(2);
    (this.bus.signal?.('bus_out_cb', (this.m_a) & 0xff) ?? 0);
    return 0;
  }

  private method_add_a_n(): number {
    this.method_burn_cycles(2);
    this.method_execute_add(this.method_argument_fetch());
    return 0;
  }

  private method_jmp_0(): number {
    this.method_burn_cycles(2);
    this.method_execute_jmp(((this.method_argument_fetch()) | (0)));
    return 0;
  }

  private method_en_i(): number {
    this.method_burn_cycles(1);
    this.m_xirq_enabled = ((1) ? 1 : 0);
    return 0;
  }

  private method_dec_a(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) - (1))) & 0xff);
    return 0;
  }

  private method_ins_a_bus(): number {
    this.method_burn_cycles(2);
    this.m_a = (((this.bus.signal?.('bus_in_cb', 0) ?? 0xff)) & 0xff);
    return 0;
  }

  private method_in_a_p1(): number {
    this.method_burn_cycles(2);
    this.m_a = (((((this.bus.signal?.('p' + (1) + '_in_cb', 0) ?? 0xff)) & (this.m_p1))) & 0xff);
    return 0;
  }

  private method_in_a_p2(): number {
    this.method_burn_cycles(2);
    this.m_a = (((((this.bus.signal?.('p' + (2) + '_in_cb', 0) ?? 0xff)) & (this.m_p2))) & 0xff);
    return 0;
  }

  private method_movd_a_p4(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(0, 4);
    return 0;
  }

  private method_movd_a_p5(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(0, 5);
    return 0;
  }

  private method_movd_a_p6(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(0, 6);
    return 0;
  }

  private method_movd_a_p7(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(0, 7);
    return 0;
  }

  private method_inc_xr0(): number {
    this.method_burn_cycles(1);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] = ((((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] & 0xff)) + (1))) & 0xff, 0);
    return 0;
  }

  private method_inc_xr1(): number {
    this.method_burn_cycles(1);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] = ((((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] & 0xff)) + (1))) & 0xff, 0);
    return 0;
  }

  private method_jb_0(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_a) & (1))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_adc_a_n(): number {
    this.method_burn_cycles(2);
    this.method_execute_addc(this.method_argument_fetch());
    return 0;
  }

  private method_call_0(): number {
    this.method_burn_cycles(2);
    this.method_execute_call(((this.method_argument_fetch()) | (0)));
    return 0;
  }

  private method_dis_i(): number {
    this.method_burn_cycles(1);
    this.m_xirq_enabled = ((0) ? 1 : 0);
    return 0;
  }

  private method_jtf(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(this.m_timer_flag);
    this.m_timer_flag = ((0) ? 1 : 0);
    return 0;
  }

  private method_inc_a(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) + (1))) & 0xff);
    return 0;
  }

  private method_inc_r0(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) + (1))) & 0xff);
    return 0;
  }

  private method_inc_r1(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) + (1))) & 0xff);
    return 0;
  }

  private method_inc_r2(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]) + (1))) & 0xff);
    return 0;
  }

  private method_inc_r3(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]) + (1))) & 0xff);
    return 0;
  }

  private method_inc_r4(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]) + (1))) & 0xff);
    return 0;
  }

  private method_inc_r5(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]) + (1))) & 0xff);
    return 0;
  }

  private method_inc_r6(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]) + (1))) & 0xff);
    return 0;
  }

  private method_inc_r7(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]) + (1))) & 0xff);
    return 0;
  }

  private method_xch_a_xr0(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = (((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] & 0xff)) & 0xff);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] = (tmp) & 0xff, 0);
    return 0;
  }

  private method_xch_a_xr1(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = (((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] & 0xff)) & 0xff);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] = (tmp) & 0xff, 0);
    return 0;
  }

  private method_mov_a_n(): number {
    this.method_burn_cycles(2);
    this.m_a = ((this.method_argument_fetch()) & 0xff);
    return 0;
  }

  private method_jmp_1(): number {
    this.method_burn_cycles(2);
    this.method_execute_jmp(((this.method_argument_fetch()) | (256)));
    return 0;
  }

  private method_en_tcnti(): number {
    this.method_burn_cycles(1);
    this.m_tirq_enabled = ((1) ? 1 : 0);
    return 0;
  }

  private method_jnt_0(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.bus.signal?.('t' + (0) + '_in_cb', 0) ?? 0)) === Number(0)) ? 1 : 0));
    return 0;
  }

  private method_clr_a(): number {
    this.method_burn_cycles(1);
    this.m_a = ((0) & 0xff);
    return 0;
  }

  private method_xch_a_r0(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0xff);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))] = ((tmp) & 0xff);
    return 0;
  }

  private method_xch_a_r1(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0xff);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))] = ((tmp) & 0xff);
    return 0;
  }

  private method_xch_a_r2(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]) & 0xff);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))] = ((tmp) & 0xff);
    return 0;
  }

  private method_xch_a_r3(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]) & 0xff);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))] = ((tmp) & 0xff);
    return 0;
  }

  private method_xch_a_r4(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]) & 0xff);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))] = ((tmp) & 0xff);
    return 0;
  }

  private method_xch_a_r5(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]) & 0xff);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))] = ((tmp) & 0xff);
    return 0;
  }

  private method_xch_a_r6(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]) & 0xff);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))] = ((tmp) & 0xff);
    return 0;
  }

  private method_xch_a_r7(): number {
    this.method_burn_cycles(1);
    let tmp = ((this.m_a) & 0xff);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]) & 0xff);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))] = ((tmp) & 0xff);
    return 0;
  }

  private method_xchd_a_xr0(): number {
    this.method_burn_cycles(1);
    let oldram = (((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] & 0xff)) & 0xff);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] = (((((oldram) & (240))) | (((this.m_a) & (15))))) & 0xff, 0);
    this.m_a = ((((((this.m_a) & (240))) | (((oldram) & (15))))) & 0xff);
    return 0;
  }

  private method_xchd_a_xr1(): number {
    this.method_burn_cycles(1);
    let oldram = (((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] & 0xff)) & 0xff);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] = (((((oldram) & (240))) | (((this.m_a) & (15))))) & 0xff, 0);
    this.m_a = ((((((this.m_a) & (240))) | (((oldram) & (15))))) & 0xff);
    return 0;
  }

  private method_jb_1(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_a) & (2))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_call_1(): number {
    this.method_burn_cycles(2);
    this.method_execute_call(((this.method_argument_fetch()) | (256)));
    return 0;
  }

  private method_dis_tcnti(): number {
    this.method_burn_cycles(1);
    this.m_tirq_enabled = ((0) ? 1 : 0);
    this.m_timer_overflow = ((0) ? 1 : 0);
    return 0;
  }

  private method_jt_0(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.bus.signal?.('t' + (0) + '_in_cb', 0) ?? 0)) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_cpl_a(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ (255))) & 0xff);
    return 0;
  }

  private method_outl_p1_a(): number {
    this.method_burn_cycles(2);
    (this.bus.signal?.('p' + (1) + '_out_cb', ((this.m_p1 = ((this.m_a) & 0xff))) & 0xff) ?? 0);
    return 0;
  }

  private method_outl_p2_a(): number {
    this.method_burn_cycles(2);
    let mask = ((this.method_p2_mask()) & 0xff);
    (this.bus.signal?.('p' + (2) + '_out_cb', ((this.m_p2 = ((((((this.m_p2) & ((~mask)))) | (((this.m_a) & (mask))))) & 0xff))) & 0xff) ?? 0);
    return 0;
  }

  private method_movd_p4_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(1, 4);
    return 0;
  }

  private method_movd_p5_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(1, 5);
    return 0;
  }

  private method_movd_p6_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(1, 6);
    return 0;
  }

  private method_movd_p7_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(1, 7);
    return 0;
  }

  private method_orl_a_xr0(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | ((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] & 0xff)))) & 0xff);
    return 0;
  }

  private method_orl_a_xr1(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | ((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] & 0xff)))) & 0xff);
    return 0;
  }

  private method_mov_a_t(): number {
    this.method_burn_cycles(1);
    this.m_a = ((this.m_timer) & 0xff);
    return 0;
  }

  private method_orl_a_n(): number {
    this.method_burn_cycles(2);
    this.m_a = ((((this.m_a) | (this.method_argument_fetch()))) & 0xff);
    return 0;
  }

  private method_jmp_2(): number {
    this.method_burn_cycles(2);
    this.method_execute_jmp(((this.method_argument_fetch()) | (512)));
    return 0;
  }

  private method_strt_cnt(): number {
    this.method_burn_cycles(1);
    if (((((this.m_timecount_enabled) & (2))) ? 0 : 1)) {
      this.m_t1_history = (((this.bus.signal?.('t' + (1) + '_in_cb', 0) ?? 0)) & 0xff);
    }
    this.m_timecount_enabled = ((2) & 0xff);
    return 0;
  }

  private method_jnt_1(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.bus.signal?.('t' + (1) + '_in_cb', 0) ?? 0)) === Number(0)) ? 1 : 0));
    return 0;
  }

  private method_swap_a(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((((this.m_a) << (4))) | (((this.m_a) >>> (4))))) & 0xff);
    return 0;
  }

  private method_orl_a_r0(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]))) & 0xff);
    return 0;
  }

  private method_orl_a_r1(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]))) & 0xff);
    return 0;
  }

  private method_orl_a_r2(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]))) & 0xff);
    return 0;
  }

  private method_orl_a_r3(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]))) & 0xff);
    return 0;
  }

  private method_orl_a_r4(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]))) & 0xff);
    return 0;
  }

  private method_orl_a_r5(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]))) & 0xff);
    return 0;
  }

  private method_orl_a_r6(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]))) & 0xff);
    return 0;
  }

  private method_orl_a_r7(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) | (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]))) & 0xff);
    return 0;
  }

  private method_anl_a_xr0(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & ((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] & 0xff)))) & 0xff);
    return 0;
  }

  private method_anl_a_xr1(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & ((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] & 0xff)))) & 0xff);
    return 0;
  }

  private method_jb_2(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_a) & (4))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_anl_a_n(): number {
    this.method_burn_cycles(2);
    this.m_a = ((((this.m_a) & (this.method_argument_fetch()))) & 0xff);
    return 0;
  }

  private method_call_2(): number {
    this.method_burn_cycles(2);
    this.method_execute_call(((this.method_argument_fetch()) | (512)));
    return 0;
  }

  private method_strt_t(): number {
    this.method_burn_cycles(1);
    this.m_timecount_enabled = ((1) & 0xff);
    this.m_prescaler = ((0) & 0xff);
    return 0;
  }

  private method_jt_1(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.bus.signal?.('t' + (1) + '_in_cb', 0) ?? 0)) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_da_a(): number {
    this.method_burn_cycles(1);
    if ((((((Number(((this.m_a) & (15))) > Number(9)) ? 1 : 0)) || (((this.m_psw) & (64)))) ? 1 : 0)) {
      if (((Number(this.m_a) > Number(249)) ? 1 : 0)) {
        this.m_psw = ((((this.m_psw) | (128))) & 0xff);
      }
      this.m_a = ((((this.m_a) + (6))) & 0xff);
    }
    if ((((((Number(((this.m_a) & (240))) > Number(144)) ? 1 : 0)) || (((this.m_psw) & (128)))) ? 1 : 0)) {
      this.m_a = ((((this.m_a) + (96))) & 0xff);
      this.m_psw = ((((this.m_psw) | (128))) & 0xff);
    }
    return 0;
  }

  private method_anl_a_r0(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]))) & 0xff);
    return 0;
  }

  private method_anl_a_r1(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]))) & 0xff);
    return 0;
  }

  private method_anl_a_r2(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]))) & 0xff);
    return 0;
  }

  private method_anl_a_r3(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]))) & 0xff);
    return 0;
  }

  private method_anl_a_r4(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]))) & 0xff);
    return 0;
  }

  private method_anl_a_r5(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]))) & 0xff);
    return 0;
  }

  private method_anl_a_r6(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]))) & 0xff);
    return 0;
  }

  private method_anl_a_r7(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) & (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]))) & 0xff);
    return 0;
  }

  private method_add_a_xr0(): number {
    this.method_burn_cycles(1);
    this.method_execute_add((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] & 0xff));
    return 0;
  }

  private method_add_a_xr1(): number {
    this.method_burn_cycles(1);
    this.method_execute_add((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] & 0xff));
    return 0;
  }

  private method_mov_t_a(): number {
    this.method_burn_cycles(1);
    this.m_timer = ((this.m_a) & 0xff);
    return 0;
  }

  private method_jmp_3(): number {
    this.method_burn_cycles(2);
    this.method_execute_jmp(((this.method_argument_fetch()) | (768)));
    return 0;
  }

  private method_stop_tcnt(): number {
    this.method_burn_cycles(1);
    this.m_timecount_enabled = ((0) & 0xff);
    return 0;
  }

  private method_rrc_a(): number {
    this.method_burn_cycles(1);
    let newc = ((((((this.m_a) << (7))) & (128))) & 0xff);
    this.m_a = ((((((this.m_a) >>> (1))) | (((this.m_psw) & (128))))) & 0xff);
    this.m_psw = ((((((this.m_psw) & ((~128)))) | (newc))) & 0xff);
    return 0;
  }

  private method_add_a_r0(): number {
    this.method_burn_cycles(1);
    this.method_execute_add(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]);
    return 0;
  }

  private method_add_a_r1(): number {
    this.method_burn_cycles(1);
    this.method_execute_add(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]);
    return 0;
  }

  private method_add_a_r2(): number {
    this.method_burn_cycles(1);
    this.method_execute_add(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]);
    return 0;
  }

  private method_add_a_r3(): number {
    this.method_burn_cycles(1);
    this.method_execute_add(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]);
    return 0;
  }

  private method_add_a_r4(): number {
    this.method_burn_cycles(1);
    this.method_execute_add(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]);
    return 0;
  }

  private method_add_a_r5(): number {
    this.method_burn_cycles(1);
    this.method_execute_add(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]);
    return 0;
  }

  private method_add_a_r6(): number {
    this.method_burn_cycles(1);
    this.method_execute_add(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]);
    return 0;
  }

  private method_add_a_r7(): number {
    this.method_burn_cycles(1);
    this.method_execute_add(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]);
    return 0;
  }

  private method_adc_a_xr0(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] & 0xff));
    return 0;
  }

  private method_adc_a_xr1(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] & 0xff));
    return 0;
  }

  private method_jb_3(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_a) & (8))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_call_3(): number {
    this.method_burn_cycles(2);
    this.method_execute_call(((this.method_argument_fetch()) | (768)));
    return 0;
  }

  private method_ent0_clk(): number {
    this.method_burn_cycles(1);
    let TRACE_NOOP = 0;
    return 0;
  }

  private method_jf1(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(this.m_f1);
    return 0;
  }

  private method_rr_a(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((((this.m_a) >>> (1))) | (((this.m_a) << (7))))) & 0xff);
    return 0;
  }

  private method_adc_a_r0(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]);
    return 0;
  }

  private method_adc_a_r1(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]);
    return 0;
  }

  private method_adc_a_r2(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]);
    return 0;
  }

  private method_adc_a_r3(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]);
    return 0;
  }

  private method_adc_a_r4(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]);
    return 0;
  }

  private method_adc_a_r5(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]);
    return 0;
  }

  private method_adc_a_r6(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]);
    return 0;
  }

  private method_adc_a_r7(): number {
    this.method_burn_cycles(1);
    this.method_execute_addc(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]);
    return 0;
  }

  private method_movx_a_xr0(): number {
    this.method_burn_cycles(2);
    this.m_a = (((this.bus.in((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0xff) & 0xff)) & 0xff);
    return 0;
  }

  private method_movx_a_xr1(): number {
    this.method_burn_cycles(2);
    this.m_a = (((this.bus.in((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0xff) & 0xff)) & 0xff);
    return 0;
  }

  private method_ret(): number {
    this.method_burn_cycles(2);
    this.method_pull_pc();
    return 0;
  }

  private method_jmp_4(): number {
    this.method_burn_cycles(2);
    this.method_execute_jmp(((this.method_argument_fetch()) | (1024)));
    return 0;
  }

  private method_clr_f0(): number {
    this.method_burn_cycles(1);
    this.m_psw = ((((this.m_psw) & ((~32)))) & 0xff);
    return 0;
  }

  private method_jni(): number {
    this.method_burn_cycles(2);
    this.m_irq_polled = ((((Number(this.m_irq_state) === Number(0)) ? 1 : 0)) ? 1 : 0);
    this.method_execute_jcc(((Number(this.m_irq_state) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_orl_bus_n(): number {
    this.method_burn_cycles(2);
    (this.bus.signal?.('bus_out_cb', ((((this.bus.signal?.('bus_in_cb', 0) ?? 0xff)) | (this.method_argument_fetch()))) & 0xff) ?? 0);
    return 0;
  }

  private method_orl_p1_n(): number {
    this.method_burn_cycles(2);
    (this.bus.signal?.('p' + (1) + '_out_cb', ((this.m_p1 = ((((this.m_p1) | (this.method_argument_fetch()))) & 0xff))) & 0xff) ?? 0);
    return 0;
  }

  private method_orl_p2_n(): number {
    this.method_burn_cycles(2);
    (this.bus.signal?.('p' + (2) + '_out_cb', ((this.m_p2 = ((((this.m_p2) | (((this.method_argument_fetch()) & (this.method_p2_mask()))))) & 0xff))) & 0xff) ?? 0);
    return 0;
  }

  private method_orld_p4_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(2, 4);
    return 0;
  }

  private method_orld_p5_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(2, 5);
    return 0;
  }

  private method_orld_p6_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(2, 6);
    return 0;
  }

  private method_orld_p7_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(2, 7);
    return 0;
  }

  private method_movx_xr0_a(): number {
    this.method_burn_cycles(2);
    (this.bus.out((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0xff, (this.m_a) & 0xff), 0);
    return 0;
  }

  private method_movx_xr1_a(): number {
    this.method_burn_cycles(2);
    (this.bus.out((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0xff, (this.m_a) & 0xff), 0);
    return 0;
  }

  private method_jb_4(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_a) & (16))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_retr(): number {
    this.method_burn_cycles(2);
    this.m_irq_in_progress = ((0) ? 1 : 0);
    this.method_pull_pc_psw();
    return 0;
  }

  private method_call_4(): number {
    this.method_burn_cycles(2);
    this.method_execute_call(((this.method_argument_fetch()) | (1024)));
    return 0;
  }

  private method_cpl_f0(): number {
    this.method_burn_cycles(1);
    this.m_psw = ((((this.m_psw) ^ (32))) & 0xff);
    return 0;
  }

  private method_jnz(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(this.m_a) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_clr_c(): number {
    this.method_burn_cycles(1);
    this.m_psw = ((((this.m_psw) & ((~128)))) & 0xff);
    return 0;
  }

  private method_anl_bus_n(): number {
    this.method_burn_cycles(2);
    (this.bus.signal?.('bus_out_cb', ((((this.bus.signal?.('bus_in_cb', 0) ?? 0xff)) & (this.method_argument_fetch()))) & 0xff) ?? 0);
    return 0;
  }

  private method_anl_p1_n(): number {
    this.method_burn_cycles(2);
    (this.bus.signal?.('p' + (1) + '_out_cb', ((this.m_p1 = ((((this.m_p1) & (this.method_argument_fetch()))) & 0xff))) & 0xff) ?? 0);
    return 0;
  }

  private method_anl_p2_n(): number {
    this.method_burn_cycles(2);
    (this.bus.signal?.('p' + (2) + '_out_cb', ((this.m_p2 = ((((this.m_p2) & (((this.method_argument_fetch()) | ((~this.method_p2_mask())))))) & 0xff))) & 0xff) ?? 0);
    return 0;
  }

  private method_anld_p4_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(3, 4);
    return 0;
  }

  private method_anld_p5_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(3, 5);
    return 0;
  }

  private method_anld_p6_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(3, 6);
    return 0;
  }

  private method_anld_p7_a(): number {
    this.method_burn_cycles(2);
    this.method_expander_operation(3, 7);
    return 0;
  }

  private method_mov_xr0_a(): number {
    this.method_burn_cycles(1);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] = (this.m_a) & 0xff, 0);
    return 0;
  }

  private method_mov_xr1_a(): number {
    this.method_burn_cycles(1);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] = (this.m_a) & 0xff, 0);
    return 0;
  }

  private method_movp_a_xa(): number {
    this.method_burn_cycles(2);
    this.m_a = (((this.readMemory((((((this.m_pc) & (3840))) | (this.m_a))) & 0x0fff) & 0xff)) & 0xff);
    return 0;
  }

  private method_jmp_5(): number {
    this.method_burn_cycles(2);
    this.method_execute_jmp(((this.method_argument_fetch()) | (1280)));
    return 0;
  }

  private method_clr_f1(): number {
    this.method_burn_cycles(1);
    this.m_f1 = ((0) ? 1 : 0);
    return 0;
  }

  private method_cpl_c(): number {
    this.method_burn_cycles(1);
    this.m_psw = ((((this.m_psw) ^ (128))) & 0xff);
    return 0;
  }

  private method_mov_r0_a(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))] = ((this.m_a) & 0xff);
    return 0;
  }

  private method_mov_r1_a(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))] = ((this.m_a) & 0xff);
    return 0;
  }

  private method_mov_r2_a(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))] = ((this.m_a) & 0xff);
    return 0;
  }

  private method_mov_r3_a(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))] = ((this.m_a) & 0xff);
    return 0;
  }

  private method_mov_r4_a(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))] = ((this.m_a) & 0xff);
    return 0;
  }

  private method_mov_r5_a(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))] = ((this.m_a) & 0xff);
    return 0;
  }

  private method_mov_r6_a(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))] = ((this.m_a) & 0xff);
    return 0;
  }

  private method_mov_r7_a(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))] = ((this.m_a) & 0xff);
    return 0;
  }

  private method_mov_xr0_n(): number {
    this.method_burn_cycles(2);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] = (this.method_argument_fetch()) & 0xff, 0);
    return 0;
  }

  private method_mov_xr1_n(): number {
    this.method_burn_cycles(2);
    (this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] = (this.method_argument_fetch()) & 0xff, 0);
    return 0;
  }

  private method_jb_5(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_a) & (32))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_jmpp_xa(): number {
    this.method_burn_cycles(2);
    this.m_pc = ((((this.m_pc) & (3840))) & 0xffff);
    this.m_pc = ((((this.m_pc) | ((this.readMemory((((this.m_pc) | (this.m_a))) & 0x0fff) & 0xff)))) & 0xffff);
    return 0;
  }

  private method_call_5(): number {
    this.method_burn_cycles(2);
    this.method_execute_call(((this.method_argument_fetch()) | (1280)));
    return 0;
  }

  private method_cpl_f1(): number {
    this.method_burn_cycles(1);
    this.m_f1 = ((((this.m_f1) ? 0 : 1)) ? 1 : 0);
    return 0;
  }

  private method_jf0(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_psw) & (32))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_mov_r0_n(): number {
    this.method_burn_cycles(2);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))] = ((this.method_argument_fetch()) & 0xff);
    return 0;
  }

  private method_mov_r1_n(): number {
    this.method_burn_cycles(2);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))] = ((this.method_argument_fetch()) & 0xff);
    return 0;
  }

  private method_mov_r2_n(): number {
    this.method_burn_cycles(2);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))] = ((this.method_argument_fetch()) & 0xff);
    return 0;
  }

  private method_mov_r3_n(): number {
    this.method_burn_cycles(2);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))] = ((this.method_argument_fetch()) & 0xff);
    return 0;
  }

  private method_mov_r4_n(): number {
    this.method_burn_cycles(2);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))] = ((this.method_argument_fetch()) & 0xff);
    return 0;
  }

  private method_mov_r5_n(): number {
    this.method_burn_cycles(2);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))] = ((this.method_argument_fetch()) & 0xff);
    return 0;
  }

  private method_mov_r6_n(): number {
    this.method_burn_cycles(2);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))] = ((this.method_argument_fetch()) & 0xff);
    return 0;
  }

  private method_mov_r7_n(): number {
    this.method_burn_cycles(2);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))] = ((this.method_argument_fetch()) & 0xff);
    return 0;
  }

  private method_jmp_6(): number {
    this.method_burn_cycles(2);
    this.method_execute_jmp(((this.method_argument_fetch()) | (1536)));
    return 0;
  }

  private method_sel_rb0(): number {
    this.method_burn_cycles(1);
    this.m_psw = ((((this.m_psw) & ((~16)))) & 0xff);
    return 0;
  }

  private method_jz(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(this.m_a) === Number(0)) ? 1 : 0));
    return 0;
  }

  private method_mov_a_psw(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_psw) | (8))) & 0xff);
    return 0;
  }

  private method_dec_r0(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) - (1))) & 0xff);
    return 0;
  }

  private method_dec_r1(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) - (1))) & 0xff);
    return 0;
  }

  private method_dec_r2(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]) - (1))) & 0xff);
    return 0;
  }

  private method_dec_r3(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]) - (1))) & 0xff);
    return 0;
  }

  private method_dec_r4(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]) - (1))) & 0xff);
    return 0;
  }

  private method_dec_r5(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]) - (1))) & 0xff);
    return 0;
  }

  private method_dec_r6(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]) - (1))) & 0xff);
    return 0;
  }

  private method_dec_r7(): number {
    this.method_burn_cycles(1);
    this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]) - (1))) & 0xff);
    return 0;
  }

  private method_xrl_a_xr0(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ ((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] & 0xff)))) & 0xff);
    return 0;
  }

  private method_xrl_a_xr1(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ ((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] & 0xff)))) & 0xff);
    return 0;
  }

  private method_jb_6(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_a) & (64))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_xrl_a_n(): number {
    this.method_burn_cycles(2);
    this.m_a = ((((this.m_a) ^ (this.method_argument_fetch()))) & 0xff);
    return 0;
  }

  private method_call_6(): number {
    this.method_burn_cycles(2);
    this.method_execute_call(((this.method_argument_fetch()) | (1536)));
    return 0;
  }

  private method_sel_rb1(): number {
    this.method_burn_cycles(1);
    this.m_psw = ((((this.m_psw) | (16))) & 0xff);
    return 0;
  }

  private method_mov_psw_a(): number {
    this.method_burn_cycles(1);
    this.m_psw = ((((this.m_a) & ((~8)))) & 0xff);
    return 0;
  }

  private method_xrl_a_r0(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]))) & 0xff);
    return 0;
  }

  private method_xrl_a_r1(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]))) & 0xff);
    return 0;
  }

  private method_xrl_a_r2(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]))) & 0xff);
    return 0;
  }

  private method_xrl_a_r3(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]))) & 0xff);
    return 0;
  }

  private method_xrl_a_r4(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]))) & 0xff);
    return 0;
  }

  private method_xrl_a_r5(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]))) & 0xff);
    return 0;
  }

  private method_xrl_a_r6(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]))) & 0xff);
    return 0;
  }

  private method_xrl_a_r7(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((this.m_a) ^ (this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]))) & 0xff);
    return 0;
  }

  private method_movp3_a_xa(): number {
    this.method_burn_cycles(2);
    this.m_a = (((this.readMemory((((768) | (this.m_a))) & 0x0fff) & 0xff)) & 0xff);
    return 0;
  }

  private method_jmp_7(): number {
    this.method_burn_cycles(2);
    this.method_execute_jmp(((this.method_argument_fetch()) | (1792)));
    return 0;
  }

  private method_sel_mb0(): number {
    this.method_burn_cycles(1);
    this.m_a11 = ((0) & 0xffff);
    return 0;
  }

  private method_jnc(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_psw) & (128))) === Number(0)) ? 1 : 0));
    return 0;
  }

  private method_rl_a(): number {
    this.method_burn_cycles(1);
    this.m_a = ((((((this.m_a) << (1))) | (((this.m_a) >>> (7))))) & 0xff);
    return 0;
  }

  private method_djnz_r0(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) - (1))) & 0xff))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_djnz_r1(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) - (1))) & 0xff))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_djnz_r2(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]) - (1))) & 0xff))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_djnz_r3(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]) - (1))) & 0xff))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_djnz_r4(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]) - (1))) & 0xff))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_djnz_r5(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]) - (1))) & 0xff))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_djnz_r6(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]) - (1))) & 0xff))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_djnz_r7(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))] = ((((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]) - (1))) & 0xff))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_mov_a_xr0(): number {
    this.method_burn_cycles(1);
    this.m_a = (((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0x7f] & 0xff)) & 0xff);
    return 0;
  }

  private method_mov_a_xr1(): number {
    this.method_burn_cycles(1);
    this.m_a = (((this.m_dataptr[(this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0x7f] & 0xff)) & 0xff);
    return 0;
  }

  private method_jb_7(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_a) & (128))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_call_7(): number {
    this.method_burn_cycles(2);
    this.method_execute_call(((this.method_argument_fetch()) | (1792)));
    return 0;
  }

  private method_sel_mb1(): number {
    this.method_burn_cycles(1);
    this.m_a11 = ((2048) & 0xffff);
    return 0;
  }

  private method_jc(): number {
    this.method_burn_cycles(2);
    this.method_execute_jcc(((Number(((this.m_psw) & (128))) !== Number(0)) ? 1 : 0));
    return 0;
  }

  private method_rlc_a(): number {
    this.method_burn_cycles(1);
    let newc = ((((this.m_a) & (128))) & 0xff);
    this.m_a = ((((((this.m_a) << (1))) | (((this.m_psw) >>> (7))))) & 0xff);
    this.m_psw = ((((((this.m_psw) & ((~128)))) | (newc))) & 0xff);
    return 0;
  }

  private method_mov_a_r0(): number {
    this.method_burn_cycles(1);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (0))]) & 0xff);
    return 0;
  }

  private method_mov_a_r1(): number {
    this.method_burn_cycles(1);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (1))]) & 0xff);
    return 0;
  }

  private method_mov_a_r2(): number {
    this.method_burn_cycles(1);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (2))]) & 0xff);
    return 0;
  }

  private method_mov_a_r3(): number {
    this.method_burn_cycles(1);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (3))]) & 0xff);
    return 0;
  }

  private method_mov_a_r4(): number {
    this.method_burn_cycles(1);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (4))]) & 0xff);
    return 0;
  }

  private method_mov_a_r5(): number {
    this.method_burn_cycles(1);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (5))]) & 0xff);
    return 0;
  }

  private method_mov_a_r6(): number {
    this.method_burn_cycles(1);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (6))]) & 0xff);
    return 0;
  }

  private method_mov_a_r7(): number {
    this.method_burn_cycles(1);
    this.m_a = ((this.m_dataptr[((((((this.m_psw) & (16))) ? (24) : (0))) + (7))]) & 0xff);
    return 0;
  }
}

export const cpu: GeneratedCpuExecutable = {
  type: "I8035",
  summary: {"opcodes":256,"compiledOpcodes":256,"methods":245,"compiledMethods":245,"diagnostics":0},
  create: (bus: CpuBus): Cpu => new GeneratedI8035(bus),
};

export default cpu;
