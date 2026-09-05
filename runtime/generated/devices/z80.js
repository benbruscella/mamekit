function popcount32(value) {
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
    pair;
    constructor(pair) { this.pair = pair; }
    get h() { return (this.pair.value >>> 8) & 0xff; }
    set h(next) {
        this.pair.value = ((this.pair.value & 0x00ff) | ((next & 0xff) << 8)) & 0xffff;
    }
    get l() { return this.pair.value & 0xff; }
    set l(next) {
        this.pair.value = ((this.pair.value & 0xff00) | (next & 0xff)) & 0xffff;
    }
}
class Pair16 {
    /** Read by Pair16Bytes; not part of the emitted core's own vocabulary. */
    value = 0;
    b;
    constructor(value = 0) {
        this.value = value & 0xffff;
        this.b = new Pair16Bytes(this);
    }
    get w() { return this.value; }
    set w(value) { this.value = value & 0xffff; }
}
class WordByteRegisterFile {
    w;
    b;
    constructor(words) {
        const buffer = new ArrayBuffer(words * 2);
        this.w = new Uint16Array(buffer);
        this.b = new Uint8Array(buffer);
    }
}
class Z8000RegisterFile {
    W = new Uint16Array(16);
    B;
    L;
    Q;
    constructor() {
        this.B = new Proxy({}, {
            get: (_target, key) => {
                const index = Number(key);
                const word = this.W[index >>> 1] ?? 0;
                return index & 1 ? word & 0xff : (word >>> 8) & 0xff;
            },
            set: (_target, key, value) => {
                const index = Number(key);
                const wordIndex = index >>> 1;
                const old = this.W[wordIndex] ?? 0;
                this.W[wordIndex] = index & 1
                    ? (old & 0xff00) | (Number(value) & 0xff)
                    : (old & 0x00ff) | ((Number(value) & 0xff) << 8);
                return true;
            },
        });
        this.L = new Proxy({}, {
            get: (_target, key) => {
                const index = Number(key) * 2;
                return ((((this.W[index] ?? 0) << 16) | (this.W[index + 1] ?? 0)) >>> 0);
            },
            set: (_target, key, value) => {
                const index = Number(key) * 2;
                const data = Number(value) >>> 0;
                this.W[index] = data >>> 16;
                this.W[index + 1] = data;
                return true;
            },
        });
        this.Q = new Proxy({}, {
            get: (_target, key) => {
                const index = Number(key) * 4;
                return (this.W[index] ?? 0) * 0x1000000000000 +
                    (this.W[index + 1] ?? 0) * 0x100000000 +
                    (this.W[index + 2] ?? 0) * 0x10000 + (this.W[index + 3] ?? 0);
            },
            set: (_target, key, value) => {
                const index = Number(key) * 4;
                let data = Number(value);
                this.W[index + 3] = data;
                data = Math.floor(data / 0x10000);
                this.W[index + 2] = data;
                data = Math.floor(data / 0x10000);
                this.W[index + 1] = data;
                data = Math.floor(data / 0x10000);
                this.W[index] = data;
                return true;
            },
        });
    }
}
/** Every method this core lowered from its MAME source. */
const GENERATED_METHOD_NAMES = new Set(["get_f", "set_f", "halt", "leave_halt", "data_read", "data_write", "opcode_read", "arg_read", "inc", "dec", "rlca", "rrca", "rla", "rra", "add_a", "adc_a", "sub_a", "sbc_a", "neg", "daa", "and_a", "or_a", "xor_a", "cp", "exx", "rlc", "rrc", "rl", "rr", "sla", "sra", "sll", "srl", "bit", "bit_hl", "bit_xy", "res", "set", "block_io_interrupted_flags", "ei", "illegal_1", "illegal_2", "m_f.s", "m_f.z", "m_f.yx", "m_f.h", "m_f.pv", "z80_set_m1_cycles", "z80_set_mreq_cycles", "z80_set_iorq_cycles", "irqack_cb", "refresh_cb", "nomreq_cb", "halt_cb", "busack_cb", "halt_r", "busack_r", "device_pre_save", "device_post_load", "cpu_is_interruptible", "execute_min_cycles", "execute_max_cycles", "execute_default_irq_vector", "execute_input_edge_triggered", "set_service_attention", "get_service_attention", "stack_read", "stack_write"]);
class GeneratedZ80 {
    bus;
    irqData = 0xff;
    irqHold = false;
    internalRam = new Uint8Array(0x10000);
    portData = new Uint8Array(0);
    portDirection = new Uint8Array(0);
    portHandshakeControl = 0;
    portHandshakeInputState = 0;
    portHandshakeLatched = false;
    portHandshakePendingClear = false;
    cycles = ((0) >>> 0);
    m_af = new Pair16(0);
    m_af2 = new Pair16(0);
    m_bc = new Pair16(0);
    m_bc2 = new Pair16(0);
    m_busack_state = ((0) & 0xff);
    m_busreq_state = ((0) >>> 0);
    m_de = new Pair16(0);
    m_de2 = new Pair16(0);
    m_ea = ((0) & 0xffff);
    m_f = { s_val: 0, z_val: 0, yx_val: 0, h_val: 0, pv_val: 0, n: 0, c: 0, q: 0, qtemp: 0 };
    m_halt = ((0) & 0xff);
    m_hl = new Pair16(0);
    m_hl2 = new Pair16(0);
    m_i = ((0) & 0xff);
    m_icount = ((0) >>> 0);
    m_iff1 = ((0) ? 1 : 0);
    m_iff2 = ((0) ? 1 : 0);
    m_im = ((0) & 0xff);
    m_iorq_cycles = ((4) & 0xff);
    m_irq_state = ((0) & 0xff);
    m_ix = new Pair16(0);
    m_iy = new Pair16(0);
    m_m1_cycles = ((4) & 0xff);
    m_mreq_cycles = ((3) & 0xff);
    m_nmi_state = ((0) & 0xff);
    m_pc = new Pair16(0);
    m_prvpc = new Pair16(0);
    m_r = ((0) & 0xff);
    m_r2 = ((0) & 0xff);
    m_ref = ((0) >>> 0);
    m_rtemp = ((0) & 0xff);
    m_service_attention = ((0) & 0xff);
    m_shared_data = new Pair16(0);
    m_shared_data2 = new Pair16(0);
    m_sp = new Pair16(0);
    m_tmp_irq_vector = ((0) >>> 0);
    m_wait_state = ((0) >>> 0);
    m_wz = new Pair16(0);
    get PRVPC() { return this.m_prvpc.w; }
    set PRVPC(value) { this.m_prvpc.w = ((value) & 0xffff); }
    get PC() { return this.m_pc.w; }
    set PC(value) { this.m_pc.w = ((value) & 0xffff); }
    get SP() { return this.m_sp.w; }
    set SP(value) { this.m_sp.w = ((value) & 0xffff); }
    get Q() { return this.m_f.q; }
    set Q(value) { this.m_f.q = ((value) & 0xff); }
    get QT() { return this.m_f.qtemp; }
    set QT(value) { this.m_f.qtemp = ((value) & 0xff); }
    get I() { return this.m_i; }
    set I(value) { this.m_i = ((value) & 0xff); }
    get R() { return this.m_r; }
    set R(value) { this.m_r = ((value) & 0xff); }
    get R2() { return this.m_r2; }
    set R2(value) { this.m_r2 = ((value) & 0xff); }
    get AF() { return this.m_af.w; }
    set AF(value) { this.m_af.w = ((value) & 0xffff); }
    get A() { return this.m_af.b.h; }
    set A(value) { this.m_af.b.h = ((value) & 0xff); }
    get F() { return this.m_af.b.l; }
    set F(value) { this.m_af.b.l = ((value) & 0xff); }
    get BC() { return this.m_bc.w; }
    set BC(value) { this.m_bc.w = ((value) & 0xffff); }
    get B() { return this.m_bc.b.h; }
    set B(value) { this.m_bc.b.h = ((value) & 0xff); }
    get C() { return this.m_bc.b.l; }
    set C(value) { this.m_bc.b.l = ((value) & 0xff); }
    get DE() { return this.m_de.w; }
    set DE(value) { this.m_de.w = ((value) & 0xffff); }
    get D() { return this.m_de.b.h; }
    set D(value) { this.m_de.b.h = ((value) & 0xff); }
    get E() { return this.m_de.b.l; }
    set E(value) { this.m_de.b.l = ((value) & 0xff); }
    get HL() { return this.m_hl.w; }
    set HL(value) { this.m_hl.w = ((value) & 0xffff); }
    get H() { return this.m_hl.b.h; }
    set H(value) { this.m_hl.b.h = ((value) & 0xff); }
    get L() { return this.m_hl.b.l; }
    set L(value) { this.m_hl.b.l = ((value) & 0xff); }
    get IX() { return this.m_ix.w; }
    set IX(value) { this.m_ix.w = ((value) & 0xffff); }
    get HX() { return this.m_ix.b.h; }
    set HX(value) { this.m_ix.b.h = ((value) & 0xff); }
    get LX() { return this.m_ix.b.l; }
    set LX(value) { this.m_ix.b.l = ((value) & 0xff); }
    get IY() { return this.m_iy.w; }
    set IY(value) { this.m_iy.w = ((value) & 0xffff); }
    get HY() { return this.m_iy.b.h; }
    set HY(value) { this.m_iy.b.h = ((value) & 0xff); }
    get LY() { return this.m_iy.b.l; }
    set LY(value) { this.m_iy.b.l = ((value) & 0xff); }
    get WZ() { return this.m_wz.w; }
    set WZ(value) { this.m_wz.w = ((value) & 0xffff); }
    get WZ_H() { return this.m_wz.b.h; }
    set WZ_H(value) { this.m_wz.b.h = ((value) & 0xff); }
    get WZ_L() { return this.m_wz.b.l; }
    set WZ_L(value) { this.m_wz.b.l = ((value) & 0xff); }
    get TDAT() { return this.m_shared_data.w; }
    set TDAT(value) { this.m_shared_data.w = ((value) & 0xffff); }
    get TDAT2() { return this.m_shared_data2.w; }
    set TDAT2(value) { this.m_shared_data2.w = ((value) & 0xffff); }
    get TDAT_H() { return this.m_shared_data.b.h; }
    set TDAT_H(value) { this.m_shared_data.b.h = ((value) & 0xff); }
    get TDAT_L() { return this.m_shared_data.b.l; }
    set TDAT_L(value) { this.m_shared_data.b.l = ((value) & 0xff); }
    get TDAT8() { return this.m_shared_data.b.l; }
    set TDAT8(value) { this.m_shared_data.b.l = ((value) & 0xff); }
    constructor(bus) {
        this.bus = bus;
        this.generatedStart();
        this.reset();
    }
    reset() {
        this.resetInternal();
        this.method_leave_halt();
        this.m_ref = ((16776960) >>> 0);
        this.PC = ((0) & 0xffff);
        this.WZ = ((this.PC) & 0xffff);
        this.m_i = ((0) & 0xff);
        this.m_r = ((0) & 0xff);
        this.m_r2 = ((0) & 0xff);
        this.m_iff1 = ((0) ? 1 : 0);
        this.m_iff2 = ((0) ? 1 : 0);
        this.method_set_service_attention(1, 0);
        this.method_set_service_attention(4, 0);
        this.method_set_service_attention(5, 0);
    }
    step() {
        this.cycles = 0;
        this.m_icount = 1;
        this.generatedService();
        if (this.cycles > 0)
            return this.cycles;
        this.generatedFetch();
        let dispatches = 0;
        while (true) {
            if (++dispatches > 8)
                throw new Error('Z80 dispatch loop exceeded 8');
            switch ((this.m_ref >>> 8) & 0xffff) {
                case 0x0000: {
                    return this.cycles;
                }
                case 0x0001: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.BC = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0x0002: {
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.BC, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ_L = ((((((this.BC) + (1))) & (255))) & 0xff);
                    this.WZ_H = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x0003: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.BC = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x0004: {
                    this.B = ((this.method_inc(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0x0005: {
                    this.B = ((this.method_dec(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0x0006: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.B = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x0007: {
                    this.method_rlca();
                    return this.cycles;
                }
                case 0x0008: {
                    this.F = ((this.method_get_f()) & 0xff);
                    {
                        const swapValue = this.m_af.w;
                        this.m_af.w = ((this.m_af2.w) & 0xffff);
                        this.m_af2.w = ((swapValue) & 0xffff);
                    }
                    this.method_set_f(this.F);
                    return this.cycles;
                }
                case 0x0009: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.HL) + (this.BC))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.BC))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0x000a: {
                    this.TDAT8 = ((this.method_data_read(this.BC)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.A = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x000b: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.BC = ((((this.BC) - (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x000c: {
                    this.C = ((this.method_inc(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0x000d: {
                    this.C = ((this.method_dec(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0x000e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.C = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x000f: {
                    this.method_rrca();
                    return this.cycles;
                }
                case 0x0010: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if ((this.B = ((((this.B) - (1))) & 0xff))) {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x0011: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.DE = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0x0012: {
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.DE, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ_L = ((((((this.DE) + (1))) & (255))) & 0xff);
                    this.WZ_H = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x0013: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.DE = ((((this.DE) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x0014: {
                    this.D = ((this.method_inc(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0x0015: {
                    this.D = ((this.method_dec(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0x0016: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.D = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x0017: {
                    this.method_rla();
                    return this.cycles;
                }
                case 0x0018: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.PC = ((((this.PC) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x0019: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.HL) + (this.DE))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.DE))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0x001a: {
                    this.TDAT8 = ((this.method_data_read(this.DE)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.A = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.DE) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x001b: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.DE = ((((this.DE) - (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x001c: {
                    this.E = ((this.method_inc(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0x001d: {
                    this.E = ((this.method_dec(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0x001e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.E = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x001f: {
                    this.method_rra();
                    return this.cycles;
                }
                case 0x0020: {
                    if (((this.method_m_f_z()) ? 0 : 1)) {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x0021: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.HL = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0x0022: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT = ((this.HL) & 0xffff);
                    this.method_data_write(this.m_ea, this.TDAT_L);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(((this.m_ea) + (1)), this.TDAT_H);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x0023: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.HL = ((((this.HL) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x0024: {
                    this.H = ((this.method_inc(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0x0025: {
                    this.H = ((this.method_dec(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0x0026: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.H = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x0027: {
                    this.method_daa();
                    return this.cycles;
                }
                case 0x0028: {
                    if (this.method_m_f_z()) {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x0029: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.HL) + (this.HL))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.HL))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0x002a: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT_L = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.TDAT_H = ((this.method_data_read(((this.m_ea) + (1)))) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.HL = ((this.TDAT) & 0xffff);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x002b: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.HL = ((((this.HL) - (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x002c: {
                    this.L = ((this.method_inc(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0x002d: {
                    this.L = ((this.method_dec(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0x002e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.L = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x002f: {
                    this.A = ((((this.A) ^ (255))) & 0xff);
                    this.m_f.yx_val = ((this.A) & 0xff);
                    this.m_f.h_val = ((16) & 0xff);
                    this.m_f.n = ((1) ? 1 : 0);
                    return this.cycles;
                }
                case 0x0030: {
                    if (((this.m_f.c) ? 0 : 1)) {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x0031: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.SP = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0x0032: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ_L = ((((((this.m_ea) + (1))) & (255))) & 0xff);
                    this.WZ_H = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x0033: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x0034: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_inc(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0035: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_dec(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0036: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0037: {
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((((this.m_f.yx_val) & (this.Q))) | (this.A))) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.m_f.c = ((1) ? 1 : 0);
                    return this.cycles;
                }
                case 0x0038: {
                    if (this.m_f.c) {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT8 = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x0039: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.HL) + (this.SP))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.SP))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0x003a: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.A = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x003b: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x003c: {
                    this.A = ((this.method_inc(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0x003d: {
                    this.A = ((this.method_dec(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0x003e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.A = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x003f: {
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((((this.m_f.yx_val) & (this.Q))) | (this.A))) & 0xff);
                    this.m_f.h_val = ((((this.m_f.c) << (4))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((this.m_f.c) ? 0 : 1)) ? 1 : 0);
                    return this.cycles;
                }
                case 0x0040: {
                    return this.cycles;
                }
                case 0x0041: {
                    this.B = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0x0042: {
                    this.B = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0x0043: {
                    this.B = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0x0044: {
                    this.B = ((this.H) & 0xff);
                    return this.cycles;
                }
                case 0x0045: {
                    this.B = ((this.L) & 0xff);
                    return this.cycles;
                }
                case 0x0046: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.B = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x0047: {
                    this.B = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x0048: {
                    this.C = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0x0049: {
                    return this.cycles;
                }
                case 0x004a: {
                    this.C = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0x004b: {
                    this.C = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0x004c: {
                    this.C = ((this.H) & 0xff);
                    return this.cycles;
                }
                case 0x004d: {
                    this.C = ((this.L) & 0xff);
                    return this.cycles;
                }
                case 0x004e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.C = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x004f: {
                    this.C = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x0050: {
                    this.D = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0x0051: {
                    this.D = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0x0052: {
                    return this.cycles;
                }
                case 0x0053: {
                    this.D = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0x0054: {
                    this.D = ((this.H) & 0xff);
                    return this.cycles;
                }
                case 0x0055: {
                    this.D = ((this.L) & 0xff);
                    return this.cycles;
                }
                case 0x0056: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.D = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x0057: {
                    this.D = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x0058: {
                    this.E = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0x0059: {
                    this.E = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0x005a: {
                    this.E = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0x005b: {
                    return this.cycles;
                }
                case 0x005c: {
                    this.E = ((this.H) & 0xff);
                    return this.cycles;
                }
                case 0x005d: {
                    this.E = ((this.L) & 0xff);
                    return this.cycles;
                }
                case 0x005e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.E = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x005f: {
                    this.E = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x0060: {
                    this.H = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0x0061: {
                    this.H = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0x0062: {
                    this.H = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0x0063: {
                    this.H = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0x0064: {
                    return this.cycles;
                }
                case 0x0065: {
                    this.H = ((this.L) & 0xff);
                    return this.cycles;
                }
                case 0x0066: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.H = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x0067: {
                    this.H = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x0068: {
                    this.L = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0x0069: {
                    this.L = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0x006a: {
                    this.L = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0x006b: {
                    this.L = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0x006c: {
                    this.L = ((this.H) & 0xff);
                    return this.cycles;
                }
                case 0x006d: {
                    return this.cycles;
                }
                case 0x006e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.L = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x006f: {
                    this.L = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x0070: {
                    this.TDAT = ((this.B) & 0xffff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0071: {
                    this.TDAT = ((this.C) & 0xffff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0072: {
                    this.TDAT = ((this.D) & 0xffff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0073: {
                    this.TDAT = ((this.E) & 0xffff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0074: {
                    this.TDAT = ((this.H) & 0xffff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0075: {
                    this.TDAT = ((this.L) & 0xffff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0076: {
                    this.method_halt();
                    return this.cycles;
                }
                case 0x0077: {
                    this.TDAT = ((this.A) & 0xffff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x0078: {
                    this.A = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0x0079: {
                    this.A = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0x007a: {
                    this.A = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0x007b: {
                    this.A = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0x007c: {
                    this.A = ((this.H) & 0xff);
                    return this.cycles;
                }
                case 0x007d: {
                    this.A = ((this.L) & 0xff);
                    return this.cycles;
                }
                case 0x007e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.A = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0x007f: {
                    return this.cycles;
                }
                case 0x0080: {
                    this.method_add_a(this.B);
                    return this.cycles;
                }
                case 0x0081: {
                    this.method_add_a(this.C);
                    return this.cycles;
                }
                case 0x0082: {
                    this.method_add_a(this.D);
                    return this.cycles;
                }
                case 0x0083: {
                    this.method_add_a(this.E);
                    return this.cycles;
                }
                case 0x0084: {
                    this.method_add_a(this.H);
                    return this.cycles;
                }
                case 0x0085: {
                    this.method_add_a(this.L);
                    return this.cycles;
                }
                case 0x0086: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_add_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x0087: {
                    this.method_add_a(this.A);
                    return this.cycles;
                }
                case 0x0088: {
                    this.method_adc_a(this.B);
                    return this.cycles;
                }
                case 0x0089: {
                    this.method_adc_a(this.C);
                    return this.cycles;
                }
                case 0x008a: {
                    this.method_adc_a(this.D);
                    return this.cycles;
                }
                case 0x008b: {
                    this.method_adc_a(this.E);
                    return this.cycles;
                }
                case 0x008c: {
                    this.method_adc_a(this.H);
                    return this.cycles;
                }
                case 0x008d: {
                    this.method_adc_a(this.L);
                    return this.cycles;
                }
                case 0x008e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_adc_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x008f: {
                    this.method_adc_a(this.A);
                    return this.cycles;
                }
                case 0x0090: {
                    this.method_sub_a(this.B);
                    return this.cycles;
                }
                case 0x0091: {
                    this.method_sub_a(this.C);
                    return this.cycles;
                }
                case 0x0092: {
                    this.method_sub_a(this.D);
                    return this.cycles;
                }
                case 0x0093: {
                    this.method_sub_a(this.E);
                    return this.cycles;
                }
                case 0x0094: {
                    this.method_sub_a(this.H);
                    return this.cycles;
                }
                case 0x0095: {
                    this.method_sub_a(this.L);
                    return this.cycles;
                }
                case 0x0096: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_sub_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x0097: {
                    this.method_sub_a(this.A);
                    return this.cycles;
                }
                case 0x0098: {
                    this.method_sbc_a(this.B);
                    return this.cycles;
                }
                case 0x0099: {
                    this.method_sbc_a(this.C);
                    return this.cycles;
                }
                case 0x009a: {
                    this.method_sbc_a(this.D);
                    return this.cycles;
                }
                case 0x009b: {
                    this.method_sbc_a(this.E);
                    return this.cycles;
                }
                case 0x009c: {
                    this.method_sbc_a(this.H);
                    return this.cycles;
                }
                case 0x009d: {
                    this.method_sbc_a(this.L);
                    return this.cycles;
                }
                case 0x009e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_sbc_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x009f: {
                    this.method_sbc_a(this.A);
                    return this.cycles;
                }
                case 0x00a0: {
                    this.method_and_a(this.B);
                    return this.cycles;
                }
                case 0x00a1: {
                    this.method_and_a(this.C);
                    return this.cycles;
                }
                case 0x00a2: {
                    this.method_and_a(this.D);
                    return this.cycles;
                }
                case 0x00a3: {
                    this.method_and_a(this.E);
                    return this.cycles;
                }
                case 0x00a4: {
                    this.method_and_a(this.H);
                    return this.cycles;
                }
                case 0x00a5: {
                    this.method_and_a(this.L);
                    return this.cycles;
                }
                case 0x00a6: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_and_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00a7: {
                    this.method_and_a(this.A);
                    return this.cycles;
                }
                case 0x00a8: {
                    this.method_xor_a(this.B);
                    return this.cycles;
                }
                case 0x00a9: {
                    this.method_xor_a(this.C);
                    return this.cycles;
                }
                case 0x00aa: {
                    this.method_xor_a(this.D);
                    return this.cycles;
                }
                case 0x00ab: {
                    this.method_xor_a(this.E);
                    return this.cycles;
                }
                case 0x00ac: {
                    this.method_xor_a(this.H);
                    return this.cycles;
                }
                case 0x00ad: {
                    this.method_xor_a(this.L);
                    return this.cycles;
                }
                case 0x00ae: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_xor_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00af: {
                    this.method_xor_a(this.A);
                    return this.cycles;
                }
                case 0x00b0: {
                    this.method_or_a(this.B);
                    return this.cycles;
                }
                case 0x00b1: {
                    this.method_or_a(this.C);
                    return this.cycles;
                }
                case 0x00b2: {
                    this.method_or_a(this.D);
                    return this.cycles;
                }
                case 0x00b3: {
                    this.method_or_a(this.E);
                    return this.cycles;
                }
                case 0x00b4: {
                    this.method_or_a(this.H);
                    return this.cycles;
                }
                case 0x00b5: {
                    this.method_or_a(this.L);
                    return this.cycles;
                }
                case 0x00b6: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_or_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00b7: {
                    this.method_or_a(this.A);
                    return this.cycles;
                }
                case 0x00b8: {
                    this.method_cp(this.B);
                    return this.cycles;
                }
                case 0x00b9: {
                    this.method_cp(this.C);
                    return this.cycles;
                }
                case 0x00ba: {
                    this.method_cp(this.D);
                    return this.cycles;
                }
                case 0x00bb: {
                    this.method_cp(this.E);
                    return this.cycles;
                }
                case 0x00bc: {
                    this.method_cp(this.H);
                    return this.cycles;
                }
                case 0x00bd: {
                    this.method_cp(this.L);
                    return this.cycles;
                }
                case 0x00be: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_cp(this.TDAT8);
                    return this.cycles;
                }
                case 0x00bf: {
                    this.method_cp(this.A);
                    return this.cycles;
                }
                case 0x00c0: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (((this.method_m_f_z()) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00c1: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.BC = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0x00c2: {
                    if (((this.method_m_f_z()) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00c3: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x00c4: {
                    if (((this.method_m_f_z()) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.m_ea = ((this.TDAT) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.WZ = ((this.m_ea) & 0xffff);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, this.PC);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((this.m_ea) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00c5: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.BC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.BC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x00c6: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.method_add_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00c7: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.PC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((0) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x00c8: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (this.method_m_f_z()) {
                        this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00c9: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x00ca: {
                    if (this.method_m_f_z()) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00cb: {
                    this.TDAT8 = ((this.method_opcode_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (((this.m_m1_cycles) - (2))))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("refresh_cb", ((((((this.I) << (8))) | (((this.R2) & (128))))) | (((this.R) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (2))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.R = ((((this.R) + (1))) & 0xff);
                    this.Q = ((this.QT) & 0xff);
                    this.QT = ((40) & 0xff);
                    this.m_ref = ((((((203) << (16))) | (((this.TDAT8) << (8))))) >>> 0);
                    continue;
                }
                case 0x00cc: {
                    if (this.method_m_f_z()) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.m_ea = ((this.TDAT) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.WZ = ((this.m_ea) & 0xffff);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, this.PC);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((this.m_ea) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00cd: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.WZ = ((this.m_ea) & 0xffff);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.PC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((this.m_ea) & 0xffff);
                    return this.cycles;
                }
                case 0x00ce: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.method_adc_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00cf: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.PC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((8) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x00d0: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (((this.m_f.c) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00d1: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.DE = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0x00d2: {
                    if (((this.m_f.c) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00d3: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT2 = ((((this.TDAT8) | (((this.A) << (8))))) & 0xffff);
                    this.TDAT = ((this.A) & 0xffff);
                    (this.bus.out((this.TDAT2) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ_L = ((((((((this.TDAT2) & (255))) + (1))) & (255))) & 0xff);
                    this.WZ_H = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0x00d4: {
                    if (((this.m_f.c) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.m_ea = ((this.TDAT) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.WZ = ((this.m_ea) & 0xffff);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, this.PC);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((this.m_ea) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00d5: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.DE) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.DE);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x00d6: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.method_sub_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00d7: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.PC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((16) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x00d8: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (this.m_f.c) {
                        this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00d9: {
                    this.method_exx();
                    return this.cycles;
                }
                case 0x00da: {
                    if (this.m_f.c) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00db: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT2 = ((((this.TDAT8) | (((this.A) << (8))))) & 0xffff);
                    this.TDAT8 = (((this.bus.in((this.TDAT2) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.A = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.TDAT2) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0x00dc: {
                    if (this.m_f.c) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.m_ea = ((this.TDAT) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.WZ = ((this.m_ea) & 0xffff);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, this.PC);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((this.m_ea) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00dd: {
                    this.TDAT8 = ((this.method_opcode_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (((this.m_m1_cycles) - (2))))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("refresh_cb", ((((((this.I) << (8))) | (((this.R2) & (128))))) | (((this.R) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (2))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.R = ((((this.R) + (1))) & 0xff);
                    this.Q = ((this.QT) & 0xff);
                    this.QT = ((40) & 0xff);
                    this.m_ref = ((((((221) << (16))) | (((this.TDAT8) << (8))))) >>> 0);
                    continue;
                }
                case 0x00de: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.method_sbc_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00df: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.PC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((24) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x00e0: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (((this.method_m_f_pv()) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00e1: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.HL = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0x00e2: {
                    if (((this.method_m_f_pv()) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00e3: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.SP) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.HL) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.HL);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.HL = ((this.TDAT) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.SP) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.SP) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.WZ = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0x00e4: {
                    if (((this.method_m_f_pv()) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.m_ea = ((this.TDAT) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.WZ = ((this.m_ea) & 0xffff);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, this.PC);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((this.m_ea) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00e5: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.HL) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.HL);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x00e6: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.method_and_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00e7: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.PC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((32) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x00e8: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (this.method_m_f_pv()) {
                        this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00e9: {
                    this.PC = ((this.HL) & 0xffff);
                    return this.cycles;
                }
                case 0x00ea: {
                    if (this.method_m_f_pv()) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00eb: {
                    {
                        const swapValue = this.DE;
                        this.DE = ((this.HL) & 0xffff);
                        this.HL = ((swapValue) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00ec: {
                    if (this.method_m_f_pv()) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.m_ea = ((this.TDAT) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.WZ = ((this.m_ea) & 0xffff);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, this.PC);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((this.m_ea) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00ed: {
                    this.TDAT8 = ((this.method_opcode_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (((this.m_m1_cycles) - (2))))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("refresh_cb", ((((((this.I) << (8))) | (((this.R2) & (128))))) | (((this.R) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (2))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.R = ((((this.R) + (1))) & 0xff);
                    this.Q = ((this.QT) & 0xff);
                    this.QT = ((40) & 0xff);
                    this.m_ref = ((((((237) << (16))) | (((this.TDAT8) << (8))))) >>> 0);
                    continue;
                }
                case 0x00ee: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.method_xor_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00ef: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.PC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((40) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x00f0: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (((this.method_m_f_s()) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00f1: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.A = ((this.TDAT_H) & 0xff);
                    this.method_set_f(this.TDAT_L);
                    return this.cycles;
                }
                case 0x00f2: {
                    if (((this.method_m_f_s()) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00f3: {
                    this.m_iff1 = (((this.m_iff2 = ((0) ? 1 : 0))) ? 1 : 0);
                    return this.cycles;
                }
                case 0x00f4: {
                    if (((this.method_m_f_s()) ? 0 : 1)) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.m_ea = ((this.TDAT) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.WZ = ((this.m_ea) & 0xffff);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, this.PC);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((this.m_ea) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00f5: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.A);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.method_get_f());
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0x00f6: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.method_or_a(this.TDAT8);
                    return this.cycles;
                }
                case 0x00f7: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.PC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((48) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0x00f8: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (this.method_m_f_s()) {
                        this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00f9: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((this.HL) & 0xffff);
                    return this.cycles;
                }
                case 0x00fa: {
                    if (this.method_m_f_s()) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.PC = ((this.TDAT) & 0xffff);
                        this.WZ = ((this.PC) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00fb: {
                    this.method_ei();
                    return this.cycles;
                }
                case 0x00fc: {
                    if (this.method_m_f_s()) {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.m_ea = ((this.TDAT) & 0xffff);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.WZ = ((this.m_ea) & 0xffff);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, this.PC);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((this.m_ea) & 0xffff);
                    }
                    else {
                        this.TDAT_L = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.TDAT_H = ((this.method_arg_read()) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((((this.PC) + (1))) & 0xffff);
                        this.WZ = ((this.TDAT) & 0xffff);
                    }
                    return this.cycles;
                }
                case 0x00fd: {
                    this.TDAT8 = ((this.method_opcode_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (((this.m_m1_cycles) - (2))))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("refresh_cb", ((((((this.I) << (8))) | (((this.R2) & (128))))) | (((this.R) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (2))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.R = ((((this.R) + (1))) & 0xff);
                    this.Q = ((this.QT) & 0xff);
                    this.QT = ((40) & 0xff);
                    this.m_ref = ((((((253) << (16))) | (((this.TDAT8) << (8))))) >>> 0);
                    continue;
                }
                case 0x00fe: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.method_cp(this.TDAT8);
                    return this.cycles;
                }
                case 0x00ff: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.PC);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((56) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    return this.cycles;
                }
                case 0xcb00: {
                    this.B = ((this.method_rlc(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb01: {
                    this.C = ((this.method_rlc(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb02: {
                    this.D = ((this.method_rlc(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb03: {
                    this.E = ((this.method_rlc(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb04: {
                    this.H = ((this.method_rlc(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb05: {
                    this.L = ((this.method_rlc(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb06: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_rlc(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb07: {
                    this.A = ((this.method_rlc(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb08: {
                    this.B = ((this.method_rrc(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb09: {
                    this.C = ((this.method_rrc(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb0a: {
                    this.D = ((this.method_rrc(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb0b: {
                    this.E = ((this.method_rrc(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb0c: {
                    this.H = ((this.method_rrc(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb0d: {
                    this.L = ((this.method_rrc(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb0e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_rrc(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb0f: {
                    this.A = ((this.method_rrc(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb10: {
                    this.B = ((this.method_rl(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb11: {
                    this.C = ((this.method_rl(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb12: {
                    this.D = ((this.method_rl(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb13: {
                    this.E = ((this.method_rl(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb14: {
                    this.H = ((this.method_rl(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb15: {
                    this.L = ((this.method_rl(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb16: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_rl(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb17: {
                    this.A = ((this.method_rl(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb18: {
                    this.B = ((this.method_rr(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb19: {
                    this.C = ((this.method_rr(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb1a: {
                    this.D = ((this.method_rr(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb1b: {
                    this.E = ((this.method_rr(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb1c: {
                    this.H = ((this.method_rr(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb1d: {
                    this.L = ((this.method_rr(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb1e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_rr(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb1f: {
                    this.A = ((this.method_rr(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb20: {
                    this.B = ((this.method_sla(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb21: {
                    this.C = ((this.method_sla(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb22: {
                    this.D = ((this.method_sla(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb23: {
                    this.E = ((this.method_sla(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb24: {
                    this.H = ((this.method_sla(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb25: {
                    this.L = ((this.method_sla(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb26: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_sla(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb27: {
                    this.A = ((this.method_sla(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb28: {
                    this.B = ((this.method_sra(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb29: {
                    this.C = ((this.method_sra(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb2a: {
                    this.D = ((this.method_sra(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb2b: {
                    this.E = ((this.method_sra(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb2c: {
                    this.H = ((this.method_sra(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb2d: {
                    this.L = ((this.method_sra(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb2e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_sra(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb2f: {
                    this.A = ((this.method_sra(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb30: {
                    this.B = ((this.method_sll(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb31: {
                    this.C = ((this.method_sll(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb32: {
                    this.D = ((this.method_sll(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb33: {
                    this.E = ((this.method_sll(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb34: {
                    this.H = ((this.method_sll(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb35: {
                    this.L = ((this.method_sll(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb36: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_sll(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb37: {
                    this.A = ((this.method_sll(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb38: {
                    this.B = ((this.method_srl(this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb39: {
                    this.C = ((this.method_srl(this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb3a: {
                    this.D = ((this.method_srl(this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb3b: {
                    this.E = ((this.method_srl(this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb3c: {
                    this.H = ((this.method_srl(this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb3d: {
                    this.L = ((this.method_srl(this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb3e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_srl(this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb3f: {
                    this.A = ((this.method_srl(this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb40: {
                    this.method_bit(0, this.B);
                    return this.cycles;
                }
                case 0xcb41: {
                    this.method_bit(0, this.C);
                    return this.cycles;
                }
                case 0xcb42: {
                    this.method_bit(0, this.D);
                    return this.cycles;
                }
                case 0xcb43: {
                    this.method_bit(0, this.E);
                    return this.cycles;
                }
                case 0xcb44: {
                    this.method_bit(0, this.H);
                    return this.cycles;
                }
                case 0xcb45: {
                    this.method_bit(0, this.L);
                    return this.cycles;
                }
                case 0xcb46: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_hl(0, this.TDAT8);
                    return this.cycles;
                }
                case 0xcb47: {
                    this.method_bit(0, this.A);
                    return this.cycles;
                }
                case 0xcb48: {
                    this.method_bit(1, this.B);
                    return this.cycles;
                }
                case 0xcb49: {
                    this.method_bit(1, this.C);
                    return this.cycles;
                }
                case 0xcb4a: {
                    this.method_bit(1, this.D);
                    return this.cycles;
                }
                case 0xcb4b: {
                    this.method_bit(1, this.E);
                    return this.cycles;
                }
                case 0xcb4c: {
                    this.method_bit(1, this.H);
                    return this.cycles;
                }
                case 0xcb4d: {
                    this.method_bit(1, this.L);
                    return this.cycles;
                }
                case 0xcb4e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_hl(1, this.TDAT8);
                    return this.cycles;
                }
                case 0xcb4f: {
                    this.method_bit(1, this.A);
                    return this.cycles;
                }
                case 0xcb50: {
                    this.method_bit(2, this.B);
                    return this.cycles;
                }
                case 0xcb51: {
                    this.method_bit(2, this.C);
                    return this.cycles;
                }
                case 0xcb52: {
                    this.method_bit(2, this.D);
                    return this.cycles;
                }
                case 0xcb53: {
                    this.method_bit(2, this.E);
                    return this.cycles;
                }
                case 0xcb54: {
                    this.method_bit(2, this.H);
                    return this.cycles;
                }
                case 0xcb55: {
                    this.method_bit(2, this.L);
                    return this.cycles;
                }
                case 0xcb56: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_hl(2, this.TDAT8);
                    return this.cycles;
                }
                case 0xcb57: {
                    this.method_bit(2, this.A);
                    return this.cycles;
                }
                case 0xcb58: {
                    this.method_bit(3, this.B);
                    return this.cycles;
                }
                case 0xcb59: {
                    this.method_bit(3, this.C);
                    return this.cycles;
                }
                case 0xcb5a: {
                    this.method_bit(3, this.D);
                    return this.cycles;
                }
                case 0xcb5b: {
                    this.method_bit(3, this.E);
                    return this.cycles;
                }
                case 0xcb5c: {
                    this.method_bit(3, this.H);
                    return this.cycles;
                }
                case 0xcb5d: {
                    this.method_bit(3, this.L);
                    return this.cycles;
                }
                case 0xcb5e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_hl(3, this.TDAT8);
                    return this.cycles;
                }
                case 0xcb5f: {
                    this.method_bit(3, this.A);
                    return this.cycles;
                }
                case 0xcb60: {
                    this.method_bit(4, this.B);
                    return this.cycles;
                }
                case 0xcb61: {
                    this.method_bit(4, this.C);
                    return this.cycles;
                }
                case 0xcb62: {
                    this.method_bit(4, this.D);
                    return this.cycles;
                }
                case 0xcb63: {
                    this.method_bit(4, this.E);
                    return this.cycles;
                }
                case 0xcb64: {
                    this.method_bit(4, this.H);
                    return this.cycles;
                }
                case 0xcb65: {
                    this.method_bit(4, this.L);
                    return this.cycles;
                }
                case 0xcb66: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_hl(4, this.TDAT8);
                    return this.cycles;
                }
                case 0xcb67: {
                    this.method_bit(4, this.A);
                    return this.cycles;
                }
                case 0xcb68: {
                    this.method_bit(5, this.B);
                    return this.cycles;
                }
                case 0xcb69: {
                    this.method_bit(5, this.C);
                    return this.cycles;
                }
                case 0xcb6a: {
                    this.method_bit(5, this.D);
                    return this.cycles;
                }
                case 0xcb6b: {
                    this.method_bit(5, this.E);
                    return this.cycles;
                }
                case 0xcb6c: {
                    this.method_bit(5, this.H);
                    return this.cycles;
                }
                case 0xcb6d: {
                    this.method_bit(5, this.L);
                    return this.cycles;
                }
                case 0xcb6e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_hl(5, this.TDAT8);
                    return this.cycles;
                }
                case 0xcb6f: {
                    this.method_bit(5, this.A);
                    return this.cycles;
                }
                case 0xcb70: {
                    this.method_bit(6, this.B);
                    return this.cycles;
                }
                case 0xcb71: {
                    this.method_bit(6, this.C);
                    return this.cycles;
                }
                case 0xcb72: {
                    this.method_bit(6, this.D);
                    return this.cycles;
                }
                case 0xcb73: {
                    this.method_bit(6, this.E);
                    return this.cycles;
                }
                case 0xcb74: {
                    this.method_bit(6, this.H);
                    return this.cycles;
                }
                case 0xcb75: {
                    this.method_bit(6, this.L);
                    return this.cycles;
                }
                case 0xcb76: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_hl(6, this.TDAT8);
                    return this.cycles;
                }
                case 0xcb77: {
                    this.method_bit(6, this.A);
                    return this.cycles;
                }
                case 0xcb78: {
                    this.method_bit(7, this.B);
                    return this.cycles;
                }
                case 0xcb79: {
                    this.method_bit(7, this.C);
                    return this.cycles;
                }
                case 0xcb7a: {
                    this.method_bit(7, this.D);
                    return this.cycles;
                }
                case 0xcb7b: {
                    this.method_bit(7, this.E);
                    return this.cycles;
                }
                case 0xcb7c: {
                    this.method_bit(7, this.H);
                    return this.cycles;
                }
                case 0xcb7d: {
                    this.method_bit(7, this.L);
                    return this.cycles;
                }
                case 0xcb7e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_hl(7, this.TDAT8);
                    return this.cycles;
                }
                case 0xcb7f: {
                    this.method_bit(7, this.A);
                    return this.cycles;
                }
                case 0xcb80: {
                    this.B = ((this.method_res(0, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb81: {
                    this.C = ((this.method_res(0, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb82: {
                    this.D = ((this.method_res(0, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb83: {
                    this.E = ((this.method_res(0, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb84: {
                    this.H = ((this.method_res(0, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb85: {
                    this.L = ((this.method_res(0, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb86: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(0, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb87: {
                    this.A = ((this.method_res(0, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb88: {
                    this.B = ((this.method_res(1, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb89: {
                    this.C = ((this.method_res(1, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb8a: {
                    this.D = ((this.method_res(1, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb8b: {
                    this.E = ((this.method_res(1, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb8c: {
                    this.H = ((this.method_res(1, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb8d: {
                    this.L = ((this.method_res(1, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb8e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(1, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb8f: {
                    this.A = ((this.method_res(1, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb90: {
                    this.B = ((this.method_res(2, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb91: {
                    this.C = ((this.method_res(2, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb92: {
                    this.D = ((this.method_res(2, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb93: {
                    this.E = ((this.method_res(2, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb94: {
                    this.H = ((this.method_res(2, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb95: {
                    this.L = ((this.method_res(2, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb96: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(2, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb97: {
                    this.A = ((this.method_res(2, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcb98: {
                    this.B = ((this.method_res(3, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcb99: {
                    this.C = ((this.method_res(3, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcb9a: {
                    this.D = ((this.method_res(3, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcb9b: {
                    this.E = ((this.method_res(3, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcb9c: {
                    this.H = ((this.method_res(3, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcb9d: {
                    this.L = ((this.method_res(3, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcb9e: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(3, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcb9f: {
                    this.A = ((this.method_res(3, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcba0: {
                    this.B = ((this.method_res(4, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcba1: {
                    this.C = ((this.method_res(4, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcba2: {
                    this.D = ((this.method_res(4, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcba3: {
                    this.E = ((this.method_res(4, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcba4: {
                    this.H = ((this.method_res(4, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcba5: {
                    this.L = ((this.method_res(4, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcba6: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(4, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcba7: {
                    this.A = ((this.method_res(4, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcba8: {
                    this.B = ((this.method_res(5, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcba9: {
                    this.C = ((this.method_res(5, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbaa: {
                    this.D = ((this.method_res(5, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbab: {
                    this.E = ((this.method_res(5, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbac: {
                    this.H = ((this.method_res(5, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbad: {
                    this.L = ((this.method_res(5, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbae: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(5, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbaf: {
                    this.A = ((this.method_res(5, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbb0: {
                    this.B = ((this.method_res(6, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbb1: {
                    this.C = ((this.method_res(6, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbb2: {
                    this.D = ((this.method_res(6, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbb3: {
                    this.E = ((this.method_res(6, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbb4: {
                    this.H = ((this.method_res(6, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbb5: {
                    this.L = ((this.method_res(6, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbb6: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(6, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbb7: {
                    this.A = ((this.method_res(6, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbb8: {
                    this.B = ((this.method_res(7, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbb9: {
                    this.C = ((this.method_res(7, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbba: {
                    this.D = ((this.method_res(7, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbbb: {
                    this.E = ((this.method_res(7, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbbc: {
                    this.H = ((this.method_res(7, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbbd: {
                    this.L = ((this.method_res(7, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbbe: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(7, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbbf: {
                    this.A = ((this.method_res(7, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbc0: {
                    this.B = ((this.method_set(0, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbc1: {
                    this.C = ((this.method_set(0, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbc2: {
                    this.D = ((this.method_set(0, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbc3: {
                    this.E = ((this.method_set(0, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbc4: {
                    this.H = ((this.method_set(0, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbc5: {
                    this.L = ((this.method_set(0, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbc6: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(0, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbc7: {
                    this.A = ((this.method_set(0, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbc8: {
                    this.B = ((this.method_set(1, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbc9: {
                    this.C = ((this.method_set(1, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbca: {
                    this.D = ((this.method_set(1, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbcb: {
                    this.E = ((this.method_set(1, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbcc: {
                    this.H = ((this.method_set(1, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbcd: {
                    this.L = ((this.method_set(1, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbce: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(1, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbcf: {
                    this.A = ((this.method_set(1, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbd0: {
                    this.B = ((this.method_set(2, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbd1: {
                    this.C = ((this.method_set(2, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbd2: {
                    this.D = ((this.method_set(2, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbd3: {
                    this.E = ((this.method_set(2, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbd4: {
                    this.H = ((this.method_set(2, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbd5: {
                    this.L = ((this.method_set(2, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbd6: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(2, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbd7: {
                    this.A = ((this.method_set(2, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbd8: {
                    this.B = ((this.method_set(3, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbd9: {
                    this.C = ((this.method_set(3, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbda: {
                    this.D = ((this.method_set(3, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbdb: {
                    this.E = ((this.method_set(3, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbdc: {
                    this.H = ((this.method_set(3, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbdd: {
                    this.L = ((this.method_set(3, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbde: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(3, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbdf: {
                    this.A = ((this.method_set(3, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbe0: {
                    this.B = ((this.method_set(4, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbe1: {
                    this.C = ((this.method_set(4, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbe2: {
                    this.D = ((this.method_set(4, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbe3: {
                    this.E = ((this.method_set(4, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbe4: {
                    this.H = ((this.method_set(4, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbe5: {
                    this.L = ((this.method_set(4, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbe6: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(4, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbe7: {
                    this.A = ((this.method_set(4, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbe8: {
                    this.B = ((this.method_set(5, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbe9: {
                    this.C = ((this.method_set(5, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbea: {
                    this.D = ((this.method_set(5, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbeb: {
                    this.E = ((this.method_set(5, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbec: {
                    this.H = ((this.method_set(5, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbed: {
                    this.L = ((this.method_set(5, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbee: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(5, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbef: {
                    this.A = ((this.method_set(5, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbf0: {
                    this.B = ((this.method_set(6, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbf1: {
                    this.C = ((this.method_set(6, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbf2: {
                    this.D = ((this.method_set(6, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbf3: {
                    this.E = ((this.method_set(6, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbf4: {
                    this.H = ((this.method_set(6, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbf5: {
                    this.L = ((this.method_set(6, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbf6: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(6, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbf7: {
                    this.A = ((this.method_set(6, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xcbf8: {
                    this.B = ((this.method_set(7, this.B)) & 0xff);
                    return this.cycles;
                }
                case 0xcbf9: {
                    this.C = ((this.method_set(7, this.C)) & 0xff);
                    return this.cycles;
                }
                case 0xcbfa: {
                    this.D = ((this.method_set(7, this.D)) & 0xff);
                    return this.cycles;
                }
                case 0xcbfb: {
                    this.E = ((this.method_set(7, this.E)) & 0xff);
                    return this.cycles;
                }
                case 0xcbfc: {
                    this.H = ((this.method_set(7, this.H)) & 0xff);
                    return this.cycles;
                }
                case 0xcbfd: {
                    this.L = ((this.method_set(7, this.L)) & 0xff);
                    return this.cycles;
                }
                case 0xcbfe: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(7, this.TDAT8)) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xcbff: {
                    this.A = ((this.method_set(7, this.A)) & 0xff);
                    return this.cycles;
                }
                case 0xdd00: {
                    this.method_illegal_1();
                    this.m_ref = ((0) >>> 0);
                    continue;
                }
                case 0xdd01: {
                    this.method_illegal_1();
                    this.m_ref = ((256) >>> 0);
                    continue;
                }
                case 0xdd02: {
                    this.method_illegal_1();
                    this.m_ref = ((512) >>> 0);
                    continue;
                }
                case 0xdd03: {
                    this.method_illegal_1();
                    this.m_ref = ((768) >>> 0);
                    continue;
                }
                case 0xdd04: {
                    this.method_illegal_1();
                    this.m_ref = ((1024) >>> 0);
                    continue;
                }
                case 0xdd05: {
                    this.method_illegal_1();
                    this.m_ref = ((1280) >>> 0);
                    continue;
                }
                case 0xdd06: {
                    this.method_illegal_1();
                    this.m_ref = ((1536) >>> 0);
                    continue;
                }
                case 0xdd07: {
                    this.method_illegal_1();
                    this.m_ref = ((1792) >>> 0);
                    continue;
                }
                case 0xdd08: {
                    this.method_illegal_1();
                    this.m_ref = ((2048) >>> 0);
                    continue;
                }
                case 0xdd09: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.IX) + (this.BC))) >>> 0);
                    this.WZ = ((((this.IX) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.IX) ^ (res))) ^ (this.BC))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.IX = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xdd0a: {
                    this.method_illegal_1();
                    this.m_ref = ((2560) >>> 0);
                    continue;
                }
                case 0xdd0b: {
                    this.method_illegal_1();
                    this.m_ref = ((2816) >>> 0);
                    continue;
                }
                case 0xdd0c: {
                    this.method_illegal_1();
                    this.m_ref = ((3072) >>> 0);
                    continue;
                }
                case 0xdd0d: {
                    this.method_illegal_1();
                    this.m_ref = ((3328) >>> 0);
                    continue;
                }
                case 0xdd0e: {
                    this.method_illegal_1();
                    this.m_ref = ((3584) >>> 0);
                    continue;
                }
                case 0xdd0f: {
                    this.method_illegal_1();
                    this.m_ref = ((3840) >>> 0);
                    continue;
                }
                case 0xdd10: {
                    this.method_illegal_1();
                    this.m_ref = ((4096) >>> 0);
                    continue;
                }
                case 0xdd11: {
                    this.method_illegal_1();
                    this.m_ref = ((4352) >>> 0);
                    continue;
                }
                case 0xdd12: {
                    this.method_illegal_1();
                    this.m_ref = ((4608) >>> 0);
                    continue;
                }
                case 0xdd13: {
                    this.method_illegal_1();
                    this.m_ref = ((4864) >>> 0);
                    continue;
                }
                case 0xdd14: {
                    this.method_illegal_1();
                    this.m_ref = ((5120) >>> 0);
                    continue;
                }
                case 0xdd15: {
                    this.method_illegal_1();
                    this.m_ref = ((5376) >>> 0);
                    continue;
                }
                case 0xdd16: {
                    this.method_illegal_1();
                    this.m_ref = ((5632) >>> 0);
                    continue;
                }
                case 0xdd17: {
                    this.method_illegal_1();
                    this.m_ref = ((5888) >>> 0);
                    continue;
                }
                case 0xdd18: {
                    this.method_illegal_1();
                    this.m_ref = ((6144) >>> 0);
                    continue;
                }
                case 0xdd19: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.IX) + (this.DE))) >>> 0);
                    this.WZ = ((((this.IX) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.IX) ^ (res))) ^ (this.DE))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.IX = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xdd1a: {
                    this.method_illegal_1();
                    this.m_ref = ((6656) >>> 0);
                    continue;
                }
                case 0xdd1b: {
                    this.method_illegal_1();
                    this.m_ref = ((6912) >>> 0);
                    continue;
                }
                case 0xdd1c: {
                    this.method_illegal_1();
                    this.m_ref = ((7168) >>> 0);
                    continue;
                }
                case 0xdd1d: {
                    this.method_illegal_1();
                    this.m_ref = ((7424) >>> 0);
                    continue;
                }
                case 0xdd1e: {
                    this.method_illegal_1();
                    this.m_ref = ((7680) >>> 0);
                    continue;
                }
                case 0xdd1f: {
                    this.method_illegal_1();
                    this.m_ref = ((7936) >>> 0);
                    continue;
                }
                case 0xdd20: {
                    this.method_illegal_1();
                    this.m_ref = ((8192) >>> 0);
                    continue;
                }
                case 0xdd21: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.IX = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0xdd22: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT = ((this.IX) & 0xffff);
                    this.method_data_write(this.m_ea, this.TDAT_L);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(((this.m_ea) + (1)), this.TDAT_H);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xdd23: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.IX = ((((this.IX) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xdd24: {
                    this.HX = ((this.method_inc(this.HX)) & 0xff);
                    return this.cycles;
                }
                case 0xdd25: {
                    this.HX = ((this.method_dec(this.HX)) & 0xff);
                    return this.cycles;
                }
                case 0xdd26: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.HX = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xdd27: {
                    this.method_illegal_1();
                    this.m_ref = ((9984) >>> 0);
                    continue;
                }
                case 0xdd28: {
                    this.method_illegal_1();
                    this.m_ref = ((10240) >>> 0);
                    continue;
                }
                case 0xdd29: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.IX) + (this.IX))) >>> 0);
                    this.WZ = ((((this.IX) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.IX) ^ (res))) ^ (this.IX))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.IX = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xdd2a: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT_L = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.TDAT_H = ((this.method_data_read(((this.m_ea) + (1)))) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.IX = ((this.TDAT) & 0xffff);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xdd2b: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.IX = ((((this.IX) - (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xdd2c: {
                    this.LX = ((this.method_inc(this.LX)) & 0xff);
                    return this.cycles;
                }
                case 0xdd2d: {
                    this.LX = ((this.method_dec(this.LX)) & 0xff);
                    return this.cycles;
                }
                case 0xdd2e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.LX = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xdd2f: {
                    this.method_illegal_1();
                    this.m_ref = ((12032) >>> 0);
                    continue;
                }
                case 0xdd30: {
                    this.method_illegal_1();
                    this.m_ref = ((12288) >>> 0);
                    continue;
                }
                case 0xdd31: {
                    this.method_illegal_1();
                    this.m_ref = ((12544) >>> 0);
                    continue;
                }
                case 0xdd32: {
                    this.method_illegal_1();
                    this.m_ref = ((12800) >>> 0);
                    continue;
                }
                case 0xdd33: {
                    this.method_illegal_1();
                    this.m_ref = ((13056) >>> 0);
                    continue;
                }
                case 0xdd34: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_inc(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd35: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_dec(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd36: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd37: {
                    this.method_illegal_1();
                    this.m_ref = ((14080) >>> 0);
                    continue;
                }
                case 0xdd38: {
                    this.method_illegal_1();
                    this.m_ref = ((14336) >>> 0);
                    continue;
                }
                case 0xdd39: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.IX) + (this.SP))) >>> 0);
                    this.WZ = ((((this.IX) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.IX) ^ (res))) ^ (this.SP))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.IX = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xdd3a: {
                    this.method_illegal_1();
                    this.m_ref = ((14848) >>> 0);
                    continue;
                }
                case 0xdd3b: {
                    this.method_illegal_1();
                    this.m_ref = ((15104) >>> 0);
                    continue;
                }
                case 0xdd3c: {
                    this.method_illegal_1();
                    this.m_ref = ((15360) >>> 0);
                    continue;
                }
                case 0xdd3d: {
                    this.method_illegal_1();
                    this.m_ref = ((15616) >>> 0);
                    continue;
                }
                case 0xdd3e: {
                    this.method_illegal_1();
                    this.m_ref = ((15872) >>> 0);
                    continue;
                }
                case 0xdd3f: {
                    this.method_illegal_1();
                    this.m_ref = ((16128) >>> 0);
                    continue;
                }
                case 0xdd40: {
                    this.method_illegal_1();
                    this.m_ref = ((16384) >>> 0);
                    continue;
                }
                case 0xdd41: {
                    this.method_illegal_1();
                    this.m_ref = ((16640) >>> 0);
                    continue;
                }
                case 0xdd42: {
                    this.method_illegal_1();
                    this.m_ref = ((16896) >>> 0);
                    continue;
                }
                case 0xdd43: {
                    this.method_illegal_1();
                    this.m_ref = ((17152) >>> 0);
                    continue;
                }
                case 0xdd44: {
                    this.B = ((this.HX) & 0xff);
                    return this.cycles;
                }
                case 0xdd45: {
                    this.B = ((this.LX) & 0xff);
                    return this.cycles;
                }
                case 0xdd46: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.B = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xdd47: {
                    this.method_illegal_1();
                    this.m_ref = ((18176) >>> 0);
                    continue;
                }
                case 0xdd48: {
                    this.method_illegal_1();
                    this.m_ref = ((18432) >>> 0);
                    continue;
                }
                case 0xdd49: {
                    this.method_illegal_1();
                    this.m_ref = ((18688) >>> 0);
                    continue;
                }
                case 0xdd4a: {
                    this.method_illegal_1();
                    this.m_ref = ((18944) >>> 0);
                    continue;
                }
                case 0xdd4b: {
                    this.method_illegal_1();
                    this.m_ref = ((19200) >>> 0);
                    continue;
                }
                case 0xdd4c: {
                    this.C = ((this.HX) & 0xff);
                    return this.cycles;
                }
                case 0xdd4d: {
                    this.C = ((this.LX) & 0xff);
                    return this.cycles;
                }
                case 0xdd4e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.C = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xdd4f: {
                    this.method_illegal_1();
                    this.m_ref = ((20224) >>> 0);
                    continue;
                }
                case 0xdd50: {
                    this.method_illegal_1();
                    this.m_ref = ((20480) >>> 0);
                    continue;
                }
                case 0xdd51: {
                    this.method_illegal_1();
                    this.m_ref = ((20736) >>> 0);
                    continue;
                }
                case 0xdd52: {
                    this.method_illegal_1();
                    this.m_ref = ((20992) >>> 0);
                    continue;
                }
                case 0xdd53: {
                    this.method_illegal_1();
                    this.m_ref = ((21248) >>> 0);
                    continue;
                }
                case 0xdd54: {
                    this.D = ((this.HX) & 0xff);
                    return this.cycles;
                }
                case 0xdd55: {
                    this.D = ((this.LX) & 0xff);
                    return this.cycles;
                }
                case 0xdd56: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.D = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xdd57: {
                    this.method_illegal_1();
                    this.m_ref = ((22272) >>> 0);
                    continue;
                }
                case 0xdd58: {
                    this.method_illegal_1();
                    this.m_ref = ((22528) >>> 0);
                    continue;
                }
                case 0xdd59: {
                    this.method_illegal_1();
                    this.m_ref = ((22784) >>> 0);
                    continue;
                }
                case 0xdd5a: {
                    this.method_illegal_1();
                    this.m_ref = ((23040) >>> 0);
                    continue;
                }
                case 0xdd5b: {
                    this.method_illegal_1();
                    this.m_ref = ((23296) >>> 0);
                    continue;
                }
                case 0xdd5c: {
                    this.E = ((this.HX) & 0xff);
                    return this.cycles;
                }
                case 0xdd5d: {
                    this.E = ((this.LX) & 0xff);
                    return this.cycles;
                }
                case 0xdd5e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.E = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xdd5f: {
                    this.method_illegal_1();
                    this.m_ref = ((24320) >>> 0);
                    continue;
                }
                case 0xdd60: {
                    this.HX = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0xdd61: {
                    this.HX = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0xdd62: {
                    this.HX = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0xdd63: {
                    this.HX = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0xdd64: {
                    return this.cycles;
                }
                case 0xdd65: {
                    this.HX = ((this.LX) & 0xff);
                    return this.cycles;
                }
                case 0xdd66: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.H = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xdd67: {
                    this.HX = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0xdd68: {
                    this.LX = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0xdd69: {
                    this.LX = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0xdd6a: {
                    this.LX = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0xdd6b: {
                    this.LX = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0xdd6c: {
                    this.LX = ((this.HX) & 0xff);
                    return this.cycles;
                }
                case 0xdd6d: {
                    return this.cycles;
                }
                case 0xdd6e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.L = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xdd6f: {
                    this.LX = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0xdd70: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd71: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd72: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd73: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd74: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd75: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd76: {
                    this.method_illegal_1();
                    this.m_ref = ((30208) >>> 0);
                    continue;
                }
                case 0xdd77: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdd78: {
                    this.method_illegal_1();
                    this.m_ref = ((30720) >>> 0);
                    continue;
                }
                case 0xdd79: {
                    this.method_illegal_1();
                    this.m_ref = ((30976) >>> 0);
                    continue;
                }
                case 0xdd7a: {
                    this.method_illegal_1();
                    this.m_ref = ((31232) >>> 0);
                    continue;
                }
                case 0xdd7b: {
                    this.method_illegal_1();
                    this.m_ref = ((31488) >>> 0);
                    continue;
                }
                case 0xdd7c: {
                    this.A = ((this.HX) & 0xff);
                    return this.cycles;
                }
                case 0xdd7d: {
                    this.A = ((this.LX) & 0xff);
                    return this.cycles;
                }
                case 0xdd7e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.A = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xdd7f: {
                    this.method_illegal_1();
                    this.m_ref = ((32512) >>> 0);
                    continue;
                }
                case 0xdd80: {
                    this.method_illegal_1();
                    this.m_ref = ((32768) >>> 0);
                    continue;
                }
                case 0xdd81: {
                    this.method_illegal_1();
                    this.m_ref = ((33024) >>> 0);
                    continue;
                }
                case 0xdd82: {
                    this.method_illegal_1();
                    this.m_ref = ((33280) >>> 0);
                    continue;
                }
                case 0xdd83: {
                    this.method_illegal_1();
                    this.m_ref = ((33536) >>> 0);
                    continue;
                }
                case 0xdd84: {
                    this.method_add_a(this.HX);
                    return this.cycles;
                }
                case 0xdd85: {
                    this.method_add_a(this.LX);
                    return this.cycles;
                }
                case 0xdd86: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_add_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xdd87: {
                    this.method_illegal_1();
                    this.m_ref = ((34560) >>> 0);
                    continue;
                }
                case 0xdd88: {
                    this.method_illegal_1();
                    this.m_ref = ((34816) >>> 0);
                    continue;
                }
                case 0xdd89: {
                    this.method_illegal_1();
                    this.m_ref = ((35072) >>> 0);
                    continue;
                }
                case 0xdd8a: {
                    this.method_illegal_1();
                    this.m_ref = ((35328) >>> 0);
                    continue;
                }
                case 0xdd8b: {
                    this.method_illegal_1();
                    this.m_ref = ((35584) >>> 0);
                    continue;
                }
                case 0xdd8c: {
                    this.method_adc_a(this.HX);
                    return this.cycles;
                }
                case 0xdd8d: {
                    this.method_adc_a(this.LX);
                    return this.cycles;
                }
                case 0xdd8e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_adc_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xdd8f: {
                    this.method_illegal_1();
                    this.m_ref = ((36608) >>> 0);
                    continue;
                }
                case 0xdd90: {
                    this.method_illegal_1();
                    this.m_ref = ((36864) >>> 0);
                    continue;
                }
                case 0xdd91: {
                    this.method_illegal_1();
                    this.m_ref = ((37120) >>> 0);
                    continue;
                }
                case 0xdd92: {
                    this.method_illegal_1();
                    this.m_ref = ((37376) >>> 0);
                    continue;
                }
                case 0xdd93: {
                    this.method_illegal_1();
                    this.m_ref = ((37632) >>> 0);
                    continue;
                }
                case 0xdd94: {
                    this.method_sub_a(this.HX);
                    return this.cycles;
                }
                case 0xdd95: {
                    this.method_sub_a(this.LX);
                    return this.cycles;
                }
                case 0xdd96: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_sub_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xdd97: {
                    this.method_illegal_1();
                    this.m_ref = ((38656) >>> 0);
                    continue;
                }
                case 0xdd98: {
                    this.method_illegal_1();
                    this.m_ref = ((38912) >>> 0);
                    continue;
                }
                case 0xdd99: {
                    this.method_illegal_1();
                    this.m_ref = ((39168) >>> 0);
                    continue;
                }
                case 0xdd9a: {
                    this.method_illegal_1();
                    this.m_ref = ((39424) >>> 0);
                    continue;
                }
                case 0xdd9b: {
                    this.method_illegal_1();
                    this.m_ref = ((39680) >>> 0);
                    continue;
                }
                case 0xdd9c: {
                    this.method_sbc_a(this.HX);
                    return this.cycles;
                }
                case 0xdd9d: {
                    this.method_sbc_a(this.LX);
                    return this.cycles;
                }
                case 0xdd9e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_sbc_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xdd9f: {
                    this.method_illegal_1();
                    this.m_ref = ((40704) >>> 0);
                    continue;
                }
                case 0xdda0: {
                    this.method_illegal_1();
                    this.m_ref = ((40960) >>> 0);
                    continue;
                }
                case 0xdda1: {
                    this.method_illegal_1();
                    this.m_ref = ((41216) >>> 0);
                    continue;
                }
                case 0xdda2: {
                    this.method_illegal_1();
                    this.m_ref = ((41472) >>> 0);
                    continue;
                }
                case 0xdda3: {
                    this.method_illegal_1();
                    this.m_ref = ((41728) >>> 0);
                    continue;
                }
                case 0xdda4: {
                    this.method_and_a(this.HX);
                    return this.cycles;
                }
                case 0xdda5: {
                    this.method_and_a(this.LX);
                    return this.cycles;
                }
                case 0xdda6: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_and_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xdda7: {
                    this.method_illegal_1();
                    this.m_ref = ((42752) >>> 0);
                    continue;
                }
                case 0xdda8: {
                    this.method_illegal_1();
                    this.m_ref = ((43008) >>> 0);
                    continue;
                }
                case 0xdda9: {
                    this.method_illegal_1();
                    this.m_ref = ((43264) >>> 0);
                    continue;
                }
                case 0xddaa: {
                    this.method_illegal_1();
                    this.m_ref = ((43520) >>> 0);
                    continue;
                }
                case 0xddab: {
                    this.method_illegal_1();
                    this.m_ref = ((43776) >>> 0);
                    continue;
                }
                case 0xddac: {
                    this.method_xor_a(this.HX);
                    return this.cycles;
                }
                case 0xddad: {
                    this.method_xor_a(this.LX);
                    return this.cycles;
                }
                case 0xddae: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_xor_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xddaf: {
                    this.method_illegal_1();
                    this.m_ref = ((44800) >>> 0);
                    continue;
                }
                case 0xddb0: {
                    this.method_illegal_1();
                    this.m_ref = ((45056) >>> 0);
                    continue;
                }
                case 0xddb1: {
                    this.method_illegal_1();
                    this.m_ref = ((45312) >>> 0);
                    continue;
                }
                case 0xddb2: {
                    this.method_illegal_1();
                    this.m_ref = ((45568) >>> 0);
                    continue;
                }
                case 0xddb3: {
                    this.method_illegal_1();
                    this.m_ref = ((45824) >>> 0);
                    continue;
                }
                case 0xddb4: {
                    this.method_or_a(this.HX);
                    return this.cycles;
                }
                case 0xddb5: {
                    this.method_or_a(this.LX);
                    return this.cycles;
                }
                case 0xddb6: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_or_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xddb7: {
                    this.method_illegal_1();
                    this.m_ref = ((46848) >>> 0);
                    continue;
                }
                case 0xddb8: {
                    this.method_illegal_1();
                    this.m_ref = ((47104) >>> 0);
                    continue;
                }
                case 0xddb9: {
                    this.method_illegal_1();
                    this.m_ref = ((47360) >>> 0);
                    continue;
                }
                case 0xddba: {
                    this.method_illegal_1();
                    this.m_ref = ((47616) >>> 0);
                    continue;
                }
                case 0xddbb: {
                    this.method_illegal_1();
                    this.m_ref = ((47872) >>> 0);
                    continue;
                }
                case 0xddbc: {
                    this.method_cp(this.HX);
                    return this.cycles;
                }
                case 0xddbd: {
                    this.method_cp(this.LX);
                    return this.cycles;
                }
                case 0xddbe: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_cp(this.TDAT8);
                    return this.cycles;
                }
                case 0xddbf: {
                    this.method_illegal_1();
                    this.m_ref = ((48896) >>> 0);
                    continue;
                }
                case 0xddc0: {
                    this.method_illegal_1();
                    this.m_ref = ((49152) >>> 0);
                    continue;
                }
                case 0xddc1: {
                    this.method_illegal_1();
                    this.m_ref = ((49408) >>> 0);
                    continue;
                }
                case 0xddc2: {
                    this.method_illegal_1();
                    this.m_ref = ((49664) >>> 0);
                    continue;
                }
                case 0xddc3: {
                    this.method_illegal_1();
                    this.m_ref = ((49920) >>> 0);
                    continue;
                }
                case 0xddc4: {
                    this.method_illegal_1();
                    this.m_ref = ((50176) >>> 0);
                    continue;
                }
                case 0xddc5: {
                    this.method_illegal_1();
                    this.m_ref = ((50432) >>> 0);
                    continue;
                }
                case 0xddc6: {
                    this.method_illegal_1();
                    this.m_ref = ((50688) >>> 0);
                    continue;
                }
                case 0xddc7: {
                    this.method_illegal_1();
                    this.m_ref = ((50944) >>> 0);
                    continue;
                }
                case 0xddc8: {
                    this.method_illegal_1();
                    this.m_ref = ((51200) >>> 0);
                    continue;
                }
                case 0xddc9: {
                    this.method_illegal_1();
                    this.m_ref = ((51456) >>> 0);
                    continue;
                }
                case 0xddca: {
                    this.method_illegal_1();
                    this.m_ref = ((51712) >>> 0);
                    continue;
                }
                case 0xddcb: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IX) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.m_ref = ((((((254) << (16))) | (((this.TDAT8) << (8))))) >>> 0);
                    continue;
                }
                case 0xddcc: {
                    this.method_illegal_1();
                    this.m_ref = ((52224) >>> 0);
                    continue;
                }
                case 0xddcd: {
                    this.method_illegal_1();
                    this.m_ref = ((52480) >>> 0);
                    continue;
                }
                case 0xddce: {
                    this.method_illegal_1();
                    this.m_ref = ((52736) >>> 0);
                    continue;
                }
                case 0xddcf: {
                    this.method_illegal_1();
                    this.m_ref = ((52992) >>> 0);
                    continue;
                }
                case 0xddd0: {
                    this.method_illegal_1();
                    this.m_ref = ((53248) >>> 0);
                    continue;
                }
                case 0xddd1: {
                    this.method_illegal_1();
                    this.m_ref = ((53504) >>> 0);
                    continue;
                }
                case 0xddd2: {
                    this.method_illegal_1();
                    this.m_ref = ((53760) >>> 0);
                    continue;
                }
                case 0xddd3: {
                    this.method_illegal_1();
                    this.m_ref = ((54016) >>> 0);
                    continue;
                }
                case 0xddd4: {
                    this.method_illegal_1();
                    this.m_ref = ((54272) >>> 0);
                    continue;
                }
                case 0xddd5: {
                    this.method_illegal_1();
                    this.m_ref = ((54528) >>> 0);
                    continue;
                }
                case 0xddd6: {
                    this.method_illegal_1();
                    this.m_ref = ((54784) >>> 0);
                    continue;
                }
                case 0xddd7: {
                    this.method_illegal_1();
                    this.m_ref = ((55040) >>> 0);
                    continue;
                }
                case 0xddd8: {
                    this.method_illegal_1();
                    this.m_ref = ((55296) >>> 0);
                    continue;
                }
                case 0xddd9: {
                    this.method_illegal_1();
                    this.m_ref = ((55552) >>> 0);
                    continue;
                }
                case 0xddda: {
                    this.method_illegal_1();
                    this.m_ref = ((55808) >>> 0);
                    continue;
                }
                case 0xdddb: {
                    this.method_illegal_1();
                    this.m_ref = ((56064) >>> 0);
                    continue;
                }
                case 0xdddc: {
                    this.method_illegal_1();
                    this.m_ref = ((56320) >>> 0);
                    continue;
                }
                case 0xdddd: {
                    this.method_illegal_1();
                    this.m_ref = ((56576) >>> 0);
                    continue;
                }
                case 0xddde: {
                    this.method_illegal_1();
                    this.m_ref = ((56832) >>> 0);
                    continue;
                }
                case 0xdddf: {
                    this.method_illegal_1();
                    this.m_ref = ((57088) >>> 0);
                    continue;
                }
                case 0xdde0: {
                    this.method_illegal_1();
                    this.m_ref = ((57344) >>> 0);
                    continue;
                }
                case 0xdde1: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.IX = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0xdde2: {
                    this.method_illegal_1();
                    this.m_ref = ((57856) >>> 0);
                    continue;
                }
                case 0xdde3: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.SP) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.IX) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.IX);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.IX = ((this.TDAT) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.SP) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.SP) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.WZ = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0xdde4: {
                    this.method_illegal_1();
                    this.m_ref = ((58368) >>> 0);
                    continue;
                }
                case 0xdde5: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.IX) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.IX);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xdde6: {
                    this.method_illegal_1();
                    this.m_ref = ((58880) >>> 0);
                    continue;
                }
                case 0xdde7: {
                    this.method_illegal_1();
                    this.m_ref = ((59136) >>> 0);
                    continue;
                }
                case 0xdde8: {
                    this.method_illegal_1();
                    this.m_ref = ((59392) >>> 0);
                    continue;
                }
                case 0xdde9: {
                    this.PC = ((this.IX) & 0xffff);
                    return this.cycles;
                }
                case 0xddea: {
                    this.method_illegal_1();
                    this.m_ref = ((59904) >>> 0);
                    continue;
                }
                case 0xddeb: {
                    this.method_illegal_1();
                    this.m_ref = ((60160) >>> 0);
                    continue;
                }
                case 0xddec: {
                    this.method_illegal_1();
                    this.m_ref = ((60416) >>> 0);
                    continue;
                }
                case 0xdded: {
                    this.method_illegal_1();
                    this.m_ref = ((60672) >>> 0);
                    continue;
                }
                case 0xddee: {
                    this.method_illegal_1();
                    this.m_ref = ((60928) >>> 0);
                    continue;
                }
                case 0xddef: {
                    this.method_illegal_1();
                    this.m_ref = ((61184) >>> 0);
                    continue;
                }
                case 0xddf0: {
                    this.method_illegal_1();
                    this.m_ref = ((61440) >>> 0);
                    continue;
                }
                case 0xddf1: {
                    this.method_illegal_1();
                    this.m_ref = ((61696) >>> 0);
                    continue;
                }
                case 0xddf2: {
                    this.method_illegal_1();
                    this.m_ref = ((61952) >>> 0);
                    continue;
                }
                case 0xddf3: {
                    this.method_illegal_1();
                    this.m_ref = ((62208) >>> 0);
                    continue;
                }
                case 0xddf4: {
                    this.method_illegal_1();
                    this.m_ref = ((62464) >>> 0);
                    continue;
                }
                case 0xddf5: {
                    this.method_illegal_1();
                    this.m_ref = ((62720) >>> 0);
                    continue;
                }
                case 0xddf6: {
                    this.method_illegal_1();
                    this.m_ref = ((62976) >>> 0);
                    continue;
                }
                case 0xddf7: {
                    this.method_illegal_1();
                    this.m_ref = ((63232) >>> 0);
                    continue;
                }
                case 0xddf8: {
                    this.method_illegal_1();
                    this.m_ref = ((63488) >>> 0);
                    continue;
                }
                case 0xddf9: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((this.IX) & 0xffff);
                    return this.cycles;
                }
                case 0xddfa: {
                    this.method_illegal_1();
                    this.m_ref = ((64000) >>> 0);
                    continue;
                }
                case 0xddfb: {
                    this.method_illegal_1();
                    this.m_ref = ((64256) >>> 0);
                    continue;
                }
                case 0xddfc: {
                    this.method_illegal_1();
                    this.m_ref = ((64512) >>> 0);
                    continue;
                }
                case 0xddfd: {
                    this.method_illegal_1();
                    this.m_ref = ((64768) >>> 0);
                    continue;
                }
                case 0xddfe: {
                    this.method_illegal_1();
                    this.m_ref = ((65024) >>> 0);
                    continue;
                }
                case 0xddff: {
                    this.method_illegal_1();
                    this.m_ref = ((65280) >>> 0);
                    continue;
                }
                case 0xed00: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed01: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed02: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed03: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed04: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed05: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed06: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed07: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed08: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed09: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed0a: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed0b: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed0c: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed0d: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed0e: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed0f: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed10: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed11: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed12: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed13: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed14: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed15: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed16: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed17: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed18: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed19: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed1a: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed1b: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed1c: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed1d: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed1e: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed1f: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed20: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed21: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed22: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed23: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed24: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed25: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed26: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed27: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed28: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed29: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed2a: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed2b: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed2c: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed2d: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed2e: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed2f: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed30: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed31: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed32: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed33: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed34: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed35: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed36: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed37: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed38: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed39: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed3a: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed3b: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed3c: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed3d: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed3e: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed3f: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed40: {
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.TDAT8) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.TDAT8) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.B = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed41: {
                    this.TDAT8 = ((this.B) & 0xff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed42: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((((this.HL) - (this.BC))) - (this.m_f.c))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((((((((res) & (32768))) >>> (8))) | (((Number(((res) & 0xffff)) !== Number(0)) ? 1 : 0)))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.BC))) >>> (8))) & 0xff);
                    this.m_f.pv_val = ((((((((((this.BC) ^ (this.HL))) & (((this.HL) ^ (res))))) & (32768))) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((1) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xed43: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT = ((this.BC) & 0xffff);
                    this.method_data_write(this.m_ea, this.TDAT_L);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(((this.m_ea) + (1)), this.TDAT_H);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed44: {
                    this.method_neg();
                    return this.cycles;
                }
                case 0xed45: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    0;
                    this.WZ = ((this.PC) & 0xffff);
                    this.m_iff1 = ((this.m_iff2) ? 1 : 0);
                    return this.cycles;
                }
                case 0xed46: {
                    this.m_im = ((0) & 0xff);
                    return this.cycles;
                }
                case 0xed47: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.m_i = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0xed48: {
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.TDAT8) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.TDAT8) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.C = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed49: {
                    this.TDAT8 = ((this.C) & 0xff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed4a: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((((this.HL) + (this.BC))) + (this.m_f.c))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((((((((res) & (32768))) >>> (8))) | (((Number(((res) & 0xffff)) !== Number(0)) ? 1 : 0)))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.BC))) >>> (8))) & 0xff);
                    this.m_f.pv_val = ((((((((((((this.BC) ^ (this.HL))) ^ (32768))) & (((this.BC) ^ (res))))) & (32768))) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xed4b: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT_L = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.TDAT_H = ((this.method_data_read(((this.m_ea) + (1)))) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.BC = ((this.TDAT) & 0xffff);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed4c: {
                    this.method_neg();
                    return this.cycles;
                }
                case 0xed4d: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    this.m_iff1 = ((this.m_iff2) ? 1 : 0);
                    0;
                    return this.cycles;
                }
                case 0xed4e: {
                    this.m_im = ((0) & 0xff);
                    return this.cycles;
                }
                case 0xed4f: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.m_r = ((this.A) & 0xff);
                    this.m_r2 = ((((this.A) & (128))) & 0xff);
                    return this.cycles;
                }
                case 0xed50: {
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.TDAT8) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.TDAT8) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.D = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed51: {
                    this.TDAT8 = ((this.D) & 0xff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed52: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((((this.HL) - (this.DE))) - (this.m_f.c))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((((((((res) & (32768))) >>> (8))) | (((Number(((res) & 0xffff)) !== Number(0)) ? 1 : 0)))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.DE))) >>> (8))) & 0xff);
                    this.m_f.pv_val = ((((((((((this.DE) ^ (this.HL))) & (((this.HL) ^ (res))))) & (32768))) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((1) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xed53: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT = ((this.DE) & 0xffff);
                    this.method_data_write(this.m_ea, this.TDAT_L);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(((this.m_ea) + (1)), this.TDAT_H);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed54: {
                    this.method_neg();
                    return this.cycles;
                }
                case 0xed55: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    0;
                    this.WZ = ((this.PC) & 0xffff);
                    this.m_iff1 = ((this.m_iff2) ? 1 : 0);
                    return this.cycles;
                }
                case 0xed56: {
                    this.m_im = ((1) & 0xff);
                    return this.cycles;
                }
                case 0xed57: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.m_i) & 0xff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.A) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.A) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.m_f.pv_val = ((((this.m_iff2) ? 0 : 1)) & 0xff);
                    if (0) {
                        this.method_set_service_attention(5, 1);
                    }
                    return this.cycles;
                }
                case 0xed58: {
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.TDAT8) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.TDAT8) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.E = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed59: {
                    this.TDAT8 = ((this.E) & 0xff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed5a: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((((this.HL) + (this.DE))) + (this.m_f.c))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((((((((res) & (32768))) >>> (8))) | (((Number(((res) & 0xffff)) !== Number(0)) ? 1 : 0)))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.DE))) >>> (8))) & 0xff);
                    this.m_f.pv_val = ((((((((((((this.DE) ^ (this.HL))) ^ (32768))) & (((this.DE) ^ (res))))) & (32768))) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xed5b: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT_L = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.TDAT_H = ((this.method_data_read(((this.m_ea) + (1)))) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.DE = ((this.TDAT) & 0xffff);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed5c: {
                    this.method_neg();
                    return this.cycles;
                }
                case 0xed5d: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    this.m_iff1 = ((this.m_iff2) ? 1 : 0);
                    0;
                    return this.cycles;
                }
                case 0xed5e: {
                    this.m_im = ((2) & 0xff);
                    return this.cycles;
                }
                case 0xed5f: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((((((this.m_r) & (127))) | (this.m_r2))) & 0xff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.A) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.A) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.m_f.pv_val = ((((this.m_iff2) ? 0 : 1)) & 0xff);
                    if (0) {
                        this.method_set_service_attention(5, 1);
                    }
                    return this.cycles;
                }
                case 0xed60: {
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.TDAT8) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.TDAT8) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.H = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed61: {
                    this.TDAT8 = ((this.H) & 0xff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed62: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((((this.HL) - (this.HL))) - (this.m_f.c))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((((((((res) & (32768))) >>> (8))) | (((Number(((res) & 0xffff)) !== Number(0)) ? 1 : 0)))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.HL))) >>> (8))) & 0xff);
                    this.m_f.pv_val = ((((((((((this.HL) ^ (this.HL))) & (((this.HL) ^ (res))))) & (32768))) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((1) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xed63: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT = ((this.HL) & 0xffff);
                    this.method_data_write(this.m_ea, this.TDAT_L);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(((this.m_ea) + (1)), this.TDAT_H);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed64: {
                    this.method_neg();
                    return this.cycles;
                }
                case 0xed65: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    0;
                    this.WZ = ((this.PC) & 0xffff);
                    this.m_iff1 = ((this.m_iff2) ? 1 : 0);
                    return this.cycles;
                }
                case 0xed66: {
                    this.m_im = ((0) & 0xff);
                    return this.cycles;
                }
                case 0xed67: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT_H = ((this.TDAT8) & 0xff);
                    this.TDAT8 = ((((((this.TDAT8) >>> (4))) | (((this.A) << (4))))) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.A = ((((((this.A) & (240))) | (((this.TDAT_H) & (15))))) & 0xff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.A) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.A) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    return this.cycles;
                }
                case 0xed68: {
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.TDAT8) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.TDAT8) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.L = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed69: {
                    this.TDAT8 = ((this.L) & 0xff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed6a: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((((this.HL) + (this.HL))) + (this.m_f.c))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((((((((res) & (32768))) >>> (8))) | (((Number(((res) & 0xffff)) !== Number(0)) ? 1 : 0)))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.HL))) >>> (8))) & 0xff);
                    this.m_f.pv_val = ((((((((((((this.HL) ^ (this.HL))) ^ (32768))) & (((this.HL) ^ (res))))) & (32768))) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xed6b: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT_L = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.TDAT_H = ((this.method_data_read(((this.m_ea) + (1)))) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.HL = ((this.TDAT) & 0xffff);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed6c: {
                    this.method_neg();
                    return this.cycles;
                }
                case 0xed6d: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    this.m_iff1 = ((this.m_iff2) ? 1 : 0);
                    0;
                    return this.cycles;
                }
                case 0xed6e: {
                    this.m_im = ((0) & 0xff);
                    return this.cycles;
                }
                case 0xed6f: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT_H = ((this.TDAT8) & 0xff);
                    this.TDAT8 = ((((((this.TDAT8) << (4))) | (((this.A) & (15))))) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.A = ((((((this.A) & (240))) | (((this.TDAT_H) >>> (4))))) & 0xff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.A) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.A) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    return this.cycles;
                }
                case 0xed70: {
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.TDAT8) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.TDAT8) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed71: {
                    this.TDAT8 = ((0) & 0xff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed72: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((((this.HL) - (this.SP))) - (this.m_f.c))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((((((((res) & (32768))) >>> (8))) | (((Number(((res) & 0xffff)) !== Number(0)) ? 1 : 0)))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.SP))) >>> (8))) & 0xff);
                    this.m_f.pv_val = ((((((((((this.SP) ^ (this.HL))) & (((this.HL) ^ (res))))) & (32768))) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((1) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xed73: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT = ((this.SP) & 0xffff);
                    this.method_data_write(this.m_ea, this.TDAT_L);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(((this.m_ea) + (1)), this.TDAT_H);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed74: {
                    this.method_neg();
                    return this.cycles;
                }
                case 0xed75: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    0;
                    this.WZ = ((this.PC) & 0xffff);
                    this.m_iff1 = ((this.m_iff2) ? 1 : 0);
                    return this.cycles;
                }
                case 0xed76: {
                    this.m_im = ((1) & 0xff);
                    return this.cycles;
                }
                case 0xed77: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed78: {
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((this.TDAT8) & 0xff))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.TDAT8) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.A = ((this.TDAT8) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed79: {
                    this.TDAT8 = ((this.A) & 0xff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed7a: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((((this.HL) + (this.SP))) + (this.m_f.c))) >>> 0);
                    this.WZ = ((((this.HL) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((((((((res) & (32768))) >>> (8))) | (((Number(((res) & 0xffff)) !== Number(0)) ? 1 : 0)))) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.HL) ^ (res))) ^ (this.SP))) >>> (8))) & 0xff);
                    this.m_f.pv_val = ((((((((((((this.SP) ^ (this.HL))) ^ (32768))) & (((this.SP) ^ (res))))) & (32768))) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.HL = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xed7b: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT_L = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.TDAT_H = ((this.method_data_read(((this.m_ea) + (1)))) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((this.TDAT) & 0xffff);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xed7c: {
                    this.method_neg();
                    return this.cycles;
                }
                case 0xed7d: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.PC = ((this.TDAT) & 0xffff);
                    this.WZ = ((this.PC) & 0xffff);
                    this.m_iff1 = ((this.m_iff2) ? 1 : 0);
                    0;
                    return this.cycles;
                }
                case 0xed7e: {
                    this.m_im = ((2) & 0xff);
                    return this.cycles;
                }
                case 0xed7f: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed80: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed81: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed82: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed83: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed84: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed85: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed86: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed87: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed88: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed89: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed8a: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed8b: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed8c: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed8d: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed8e: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed8f: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed90: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed91: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed92: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed93: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed94: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed95: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed96: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed97: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed98: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed99: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed9a: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed9b: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed9c: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed9d: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed9e: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xed9f: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeda0: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(this.DE, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.HL = ((((this.HL) + (1))) & 0xffff);
                    this.DE = ((((this.DE) + (1))) & 0xffff);
                    this.BC = ((((this.BC) - (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((((((this.A) + (this.TDAT8))) << (4))) | (((((this.A) + (this.TDAT8))) & (15))))) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.m_f.pv_val = ((((this.BC) ? 0 : 1)) & 0xff);
                    return this.cycles;
                }
                case 0xeda1: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.WZ = ((((this.WZ) + (1))) & 0xffff);
                    this.HL = ((((this.HL) + (1))) & 0xffff);
                    this.BC = ((((this.BC) - (1))) & 0xffff);
                    let res = ((((this.A) - (this.TDAT8))) & 0xff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((res) & 0xff))) & 0xff);
                    this.m_f.h_val = ((((((this.A) ^ (this.TDAT8))) ^ (res))) & 0xff);
                    if (this.method_m_f_h()) {
                        res = ((((res) - (1))) & 0xff);
                    }
                    this.m_f.yx_val = ((((((res) << (4))) | (((res) & (15))))) & 0xff);
                    this.m_f.pv_val = ((((this.BC) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((1) ? 1 : 0);
                    return this.cycles;
                }
                case 0xeda2: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    this.B = ((((this.B) - (1))) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.HL = ((((this.HL) + (1))) & 0xffff);
                    let t = ((((((((this.C) + (1))) & (255))) + (this.TDAT8))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.B) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.B) & 0xff);
                    this.m_f.h_val = ((((t) >>> (4))) & 0xff);
                    this.m_f.pv_val = ((((((t) & (7))) ^ (this.B))) & 0xff);
                    this.m_f.n = ((((this.TDAT8) & (128))) ? 1 : 0);
                    this.m_f.c = ((((t) & (256))) ? 1 : 0);
                    return this.cycles;
                }
                case 0xeda3: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.B = ((((this.B) - (1))) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.HL = ((((this.HL) + (1))) & 0xffff);
                    let t = ((((this.L) + (this.TDAT8))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.B) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.B) & 0xff);
                    this.m_f.h_val = ((((t) >>> (4))) & 0xff);
                    this.m_f.pv_val = ((((((t) & (7))) ^ (this.B))) & 0xff);
                    this.m_f.n = ((((this.TDAT8) & (128))) ? 1 : 0);
                    this.m_f.c = ((((t) & (256))) ? 1 : 0);
                    return this.cycles;
                }
                case 0xeda4: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeda5: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeda6: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeda7: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeda8: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(this.DE, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.HL = ((((this.HL) - (1))) & 0xffff);
                    this.DE = ((((this.DE) - (1))) & 0xffff);
                    this.BC = ((((this.BC) - (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((((((this.A) + (this.TDAT8))) << (4))) | (((((this.A) + (this.TDAT8))) & (15))))) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.m_f.pv_val = ((((this.BC) ? 0 : 1)) & 0xff);
                    return this.cycles;
                }
                case 0xeda9: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.WZ = ((((this.WZ) - (1))) & 0xffff);
                    this.HL = ((((this.HL) - (1))) & 0xffff);
                    this.BC = ((((this.BC) - (1))) & 0xffff);
                    let res = ((((this.A) - (this.TDAT8))) & 0xff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((res) & 0xff))) & 0xff);
                    this.m_f.h_val = ((((((this.A) ^ (this.TDAT8))) ^ (res))) & 0xff);
                    if (this.method_m_f_h()) {
                        res = ((((res) - (1))) & 0xff);
                    }
                    this.m_f.yx_val = ((((((res) << (4))) | (((res) & (15))))) & 0xff);
                    this.m_f.pv_val = ((((this.BC) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((1) ? 1 : 0);
                    return this.cycles;
                }
                case 0xedaa: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) - (1))) & 0xffff);
                    this.B = ((((this.B) - (1))) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.HL = ((((this.HL) - (1))) & 0xffff);
                    let t = ((((((((this.C) - (1))) & (255))) + (this.TDAT8))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.B) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.B) & 0xff);
                    this.m_f.h_val = ((((t) >>> (4))) & 0xff);
                    this.m_f.pv_val = ((((((t) & (7))) ^ (this.B))) & 0xff);
                    this.m_f.n = ((((this.TDAT8) & (128))) ? 1 : 0);
                    this.m_f.c = ((((t) & (256))) ? 1 : 0);
                    return this.cycles;
                }
                case 0xedab: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.B = ((((this.B) - (1))) & 0xff);
                    this.WZ = ((((this.BC) - (1))) & 0xffff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.HL = ((((this.HL) - (1))) & 0xffff);
                    let t = ((((this.L) + (this.TDAT8))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.B) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.B) & 0xff);
                    this.m_f.h_val = ((((t) >>> (4))) & 0xff);
                    this.m_f.pv_val = ((((((t) & (7))) ^ (this.B))) & 0xff);
                    this.m_f.n = ((((this.TDAT8) & (128))) ? 1 : 0);
                    this.m_f.c = ((((t) & (256))) ? 1 : 0);
                    return this.cycles;
                }
                case 0xedac: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedad: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedae: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedaf: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedb0: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(this.DE, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.HL = ((((this.HL) + (1))) & 0xffff);
                    this.DE = ((((this.DE) + (1))) & 0xffff);
                    this.BC = ((((this.BC) - (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((((((this.A) + (this.TDAT8))) << (4))) | (((((this.A) + (this.TDAT8))) & (15))))) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.m_f.pv_val = ((((this.BC) ? 0 : 1)) & 0xff);
                    if (((Number(this.BC) !== Number(0)) ? 1 : 0)) {
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) - (2))) & 0xffff);
                        this.WZ = ((((this.PC) + (1))) & 0xffff);
                        this.m_f.yx_val = ((((this.PC) >>> (8))) & 0xff);
                    }
                    return this.cycles;
                }
                case 0xedb1: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.WZ = ((((this.WZ) + (1))) & 0xffff);
                    this.HL = ((((this.HL) + (1))) & 0xffff);
                    this.BC = ((((this.BC) - (1))) & 0xffff);
                    let res = ((((this.A) - (this.TDAT8))) & 0xff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((res) & 0xff))) & 0xff);
                    this.m_f.h_val = ((((((this.A) ^ (this.TDAT8))) ^ (res))) & 0xff);
                    if (this.method_m_f_h()) {
                        res = ((((res) - (1))) & 0xff);
                    }
                    this.m_f.yx_val = ((((((res) << (4))) | (((res) & (15))))) & 0xff);
                    this.m_f.pv_val = ((((this.BC) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((1) ? 1 : 0);
                    if ((((((Number(this.BC) !== Number(0)) ? 1 : 0)) && (((this.method_m_f_z()) ? 0 : 1))) ? 1 : 0)) {
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) - (2))) & 0xffff);
                        this.WZ = ((((this.PC) + (1))) & 0xffff);
                        this.m_f.yx_val = ((((this.PC) >>> (8))) & 0xff);
                    }
                    return this.cycles;
                }
                case 0xedb2: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    this.B = ((((this.B) - (1))) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.HL = ((((this.HL) + (1))) & 0xffff);
                    let t = ((((((((this.C) + (1))) & (255))) + (this.TDAT8))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.B) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.B) & 0xff);
                    this.m_f.h_val = ((((t) >>> (4))) & 0xff);
                    this.m_f.pv_val = ((((((t) & (7))) ^ (this.B))) & 0xff);
                    this.m_f.n = ((((this.TDAT8) & (128))) ? 1 : 0);
                    this.m_f.c = ((((t) & (256))) ? 1 : 0);
                    if (((Number(this.B) !== Number(0)) ? 1 : 0)) {
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) - (2))) & 0xffff);
                        this.method_block_io_interrupted_flags();
                    }
                    return this.cycles;
                }
                case 0xedb3: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.B = ((((this.B) - (1))) & 0xff);
                    this.WZ = ((((this.BC) + (1))) & 0xffff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.HL = ((((this.HL) + (1))) & 0xffff);
                    let t = ((((this.L) + (this.TDAT8))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.B) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.B) & 0xff);
                    this.m_f.h_val = ((((t) >>> (4))) & 0xff);
                    this.m_f.pv_val = ((((((t) & (7))) ^ (this.B))) & 0xff);
                    this.m_f.n = ((((this.TDAT8) & (128))) ? 1 : 0);
                    this.m_f.c = ((((t) & (256))) ? 1 : 0);
                    if (((Number(this.B) !== Number(0)) ? 1 : 0)) {
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) - (2))) & 0xffff);
                        this.method_block_io_interrupted_flags();
                    }
                    return this.cycles;
                }
                case 0xedb4: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedb5: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedb6: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedb7: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedb8: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(this.DE, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.HL = ((((this.HL) - (1))) & 0xffff);
                    this.DE = ((((this.DE) - (1))) & 0xffff);
                    this.BC = ((((this.BC) - (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((((((this.A) + (this.TDAT8))) << (4))) | (((((this.A) + (this.TDAT8))) & (15))))) & 0xff);
                    this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
                    this.m_f.pv_val = ((((this.BC) ? 0 : 1)) & 0xff);
                    if (((Number(this.BC) !== Number(0)) ? 1 : 0)) {
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.DE) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) - (2))) & 0xffff);
                        this.WZ = ((((this.PC) + (1))) & 0xffff);
                        this.m_f.yx_val = ((((this.PC) >>> (8))) & 0xff);
                    }
                    return this.cycles;
                }
                case 0xedb9: {
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.WZ = ((((this.WZ) - (1))) & 0xffff);
                    this.HL = ((((this.HL) - (1))) & 0xffff);
                    this.BC = ((((this.BC) - (1))) & 0xffff);
                    let res = ((((this.A) - (this.TDAT8))) & 0xff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((res) & 0xff))) & 0xff);
                    this.m_f.h_val = ((((((this.A) ^ (this.TDAT8))) ^ (res))) & 0xff);
                    if (this.method_m_f_h()) {
                        res = ((((res) - (1))) & 0xff);
                    }
                    this.m_f.yx_val = ((((((res) << (4))) | (((res) & (15))))) & 0xff);
                    this.m_f.pv_val = ((((this.BC) ? 0 : 1)) & 0xff);
                    this.m_f.n = ((1) ? 1 : 0);
                    if ((((((Number(this.BC) !== Number(0)) ? 1 : 0)) && (((this.method_m_f_z()) ? 0 : 1))) ? 1 : 0)) {
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) - (2))) & 0xffff);
                        this.WZ = ((((this.PC) + (1))) & 0xffff);
                        this.m_f.yx_val = ((((this.PC) >>> (8))) & 0xff);
                    }
                    return this.cycles;
                }
                case 0xedba: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = (((this.bus.in((this.BC) & 0xffff) & 0xff)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.WZ = ((((this.BC) - (1))) & 0xffff);
                    this.B = ((((this.B) - (1))) & 0xff);
                    this.method_data_write(this.HL, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.HL = ((((this.HL) - (1))) & 0xffff);
                    let t = ((((((((this.C) - (1))) & (255))) + (this.TDAT8))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.B) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.B) & 0xff);
                    this.m_f.h_val = ((((t) >>> (4))) & 0xff);
                    this.m_f.pv_val = ((((((t) & (7))) ^ (this.B))) & 0xff);
                    this.m_f.n = ((((this.TDAT8) & (128))) ? 1 : 0);
                    this.m_f.c = ((((t) & (256))) ? 1 : 0);
                    if (((Number(this.B) !== Number(0)) ? 1 : 0)) {
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.HL) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) - (2))) & 0xffff);
                        this.method_block_io_interrupted_flags();
                    }
                    return this.cycles;
                }
                case 0xedbb: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.HL)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.B = ((((this.B) - (1))) & 0xff);
                    this.WZ = ((((this.BC) - (1))) & 0xffff);
                    (this.bus.out((this.BC) & 0xffff, (this.TDAT8) & 0xff), 0);
                    this.cycles = ((((this.cycles) + (this.m_iorq_cycles))) >>> 0);
                    this.HL = ((((this.HL) - (1))) & 0xffff);
                    let t = ((((this.L) + (this.TDAT8))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.s_val = (((this.m_f.z_val = ((this.B) & 0xff))) & 0xff);
                    this.m_f.yx_val = ((this.B) & 0xff);
                    this.m_f.h_val = ((((t) >>> (4))) & 0xff);
                    this.m_f.pv_val = ((((((t) & (7))) ^ (this.B))) & 0xff);
                    this.m_f.n = ((((this.TDAT8) & (128))) ? 1 : 0);
                    this.m_f.c = ((((t) & (256))) ? 1 : 0);
                    if (((Number(this.B) !== Number(0)) ? 1 : 0)) {
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        if (1) {
                            (this.bus.signal?.("nomreq_cb", this.BC) ?? 0);
                        }
                        this.cycles = ((((this.cycles) + (1))) >>> 0);
                        this.PC = ((((this.PC) - (2))) & 0xffff);
                        this.method_block_io_interrupted_flags();
                    }
                    return this.cycles;
                }
                case 0xedbc: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedbd: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedbe: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedbf: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc0: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc1: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc2: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc3: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc4: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc5: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc6: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc7: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc8: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedc9: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedca: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedcb: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedcc: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedcd: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedce: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedcf: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd0: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd1: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd2: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd3: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd4: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd5: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd6: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd7: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd8: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedd9: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedda: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeddb: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeddc: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeddd: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedde: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeddf: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede0: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede1: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede2: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede3: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede4: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede5: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede6: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede7: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede8: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xede9: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedea: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedeb: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedec: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xeded: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedee: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedef: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf0: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf1: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf2: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf3: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf4: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf5: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf6: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf7: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf8: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedf9: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedfa: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedfb: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedfc: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedfd: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedfe: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xedff: {
                    this.method_illegal_2();
                    return this.cycles;
                }
                case 0xfd00: {
                    this.method_illegal_1();
                    this.m_ref = ((0) >>> 0);
                    continue;
                }
                case 0xfd01: {
                    this.method_illegal_1();
                    this.m_ref = ((256) >>> 0);
                    continue;
                }
                case 0xfd02: {
                    this.method_illegal_1();
                    this.m_ref = ((512) >>> 0);
                    continue;
                }
                case 0xfd03: {
                    this.method_illegal_1();
                    this.m_ref = ((768) >>> 0);
                    continue;
                }
                case 0xfd04: {
                    this.method_illegal_1();
                    this.m_ref = ((1024) >>> 0);
                    continue;
                }
                case 0xfd05: {
                    this.method_illegal_1();
                    this.m_ref = ((1280) >>> 0);
                    continue;
                }
                case 0xfd06: {
                    this.method_illegal_1();
                    this.m_ref = ((1536) >>> 0);
                    continue;
                }
                case 0xfd07: {
                    this.method_illegal_1();
                    this.m_ref = ((1792) >>> 0);
                    continue;
                }
                case 0xfd08: {
                    this.method_illegal_1();
                    this.m_ref = ((2048) >>> 0);
                    continue;
                }
                case 0xfd09: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.IY) + (this.BC))) >>> 0);
                    this.WZ = ((((this.IY) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.IY) ^ (res))) ^ (this.BC))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.IY = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xfd0a: {
                    this.method_illegal_1();
                    this.m_ref = ((2560) >>> 0);
                    continue;
                }
                case 0xfd0b: {
                    this.method_illegal_1();
                    this.m_ref = ((2816) >>> 0);
                    continue;
                }
                case 0xfd0c: {
                    this.method_illegal_1();
                    this.m_ref = ((3072) >>> 0);
                    continue;
                }
                case 0xfd0d: {
                    this.method_illegal_1();
                    this.m_ref = ((3328) >>> 0);
                    continue;
                }
                case 0xfd0e: {
                    this.method_illegal_1();
                    this.m_ref = ((3584) >>> 0);
                    continue;
                }
                case 0xfd0f: {
                    this.method_illegal_1();
                    this.m_ref = ((3840) >>> 0);
                    continue;
                }
                case 0xfd10: {
                    this.method_illegal_1();
                    this.m_ref = ((4096) >>> 0);
                    continue;
                }
                case 0xfd11: {
                    this.method_illegal_1();
                    this.m_ref = ((4352) >>> 0);
                    continue;
                }
                case 0xfd12: {
                    this.method_illegal_1();
                    this.m_ref = ((4608) >>> 0);
                    continue;
                }
                case 0xfd13: {
                    this.method_illegal_1();
                    this.m_ref = ((4864) >>> 0);
                    continue;
                }
                case 0xfd14: {
                    this.method_illegal_1();
                    this.m_ref = ((5120) >>> 0);
                    continue;
                }
                case 0xfd15: {
                    this.method_illegal_1();
                    this.m_ref = ((5376) >>> 0);
                    continue;
                }
                case 0xfd16: {
                    this.method_illegal_1();
                    this.m_ref = ((5632) >>> 0);
                    continue;
                }
                case 0xfd17: {
                    this.method_illegal_1();
                    this.m_ref = ((5888) >>> 0);
                    continue;
                }
                case 0xfd18: {
                    this.method_illegal_1();
                    this.m_ref = ((6144) >>> 0);
                    continue;
                }
                case 0xfd19: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.IY) + (this.DE))) >>> 0);
                    this.WZ = ((((this.IY) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.IY) ^ (res))) ^ (this.DE))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.IY = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xfd1a: {
                    this.method_illegal_1();
                    this.m_ref = ((6656) >>> 0);
                    continue;
                }
                case 0xfd1b: {
                    this.method_illegal_1();
                    this.m_ref = ((6912) >>> 0);
                    continue;
                }
                case 0xfd1c: {
                    this.method_illegal_1();
                    this.m_ref = ((7168) >>> 0);
                    continue;
                }
                case 0xfd1d: {
                    this.method_illegal_1();
                    this.m_ref = ((7424) >>> 0);
                    continue;
                }
                case 0xfd1e: {
                    this.method_illegal_1();
                    this.m_ref = ((7680) >>> 0);
                    continue;
                }
                case 0xfd1f: {
                    this.method_illegal_1();
                    this.m_ref = ((7936) >>> 0);
                    continue;
                }
                case 0xfd20: {
                    this.method_illegal_1();
                    this.m_ref = ((8192) >>> 0);
                    continue;
                }
                case 0xfd21: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.IY = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0xfd22: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT = ((this.IY) & 0xffff);
                    this.method_data_write(this.m_ea, this.TDAT_L);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_data_write(((this.m_ea) + (1)), this.TDAT_H);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xfd23: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.IY = ((((this.IY) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xfd24: {
                    this.HY = ((this.method_inc(this.HY)) & 0xff);
                    return this.cycles;
                }
                case 0xfd25: {
                    this.HY = ((this.method_dec(this.HY)) & 0xff);
                    return this.cycles;
                }
                case 0xfd26: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.HY = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xfd27: {
                    this.method_illegal_1();
                    this.m_ref = ((9984) >>> 0);
                    continue;
                }
                case 0xfd28: {
                    this.method_illegal_1();
                    this.m_ref = ((10240) >>> 0);
                    continue;
                }
                case 0xfd29: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.IY) + (this.IY))) >>> 0);
                    this.WZ = ((((this.IY) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.IY) ^ (res))) ^ (this.IY))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.IY = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xfd2a: {
                    this.TDAT_L = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((this.TDAT) & 0xffff);
                    this.TDAT_L = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.TDAT_H = ((this.method_data_read(((this.m_ea) + (1)))) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.IY = ((this.TDAT) & 0xffff);
                    this.WZ = ((((this.m_ea) + (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xfd2b: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.IY = ((((this.IY) - (1))) & 0xffff);
                    return this.cycles;
                }
                case 0xfd2c: {
                    this.LY = ((this.method_inc(this.LY)) & 0xff);
                    return this.cycles;
                }
                case 0xfd2d: {
                    this.LY = ((this.method_dec(this.LY)) & 0xff);
                    return this.cycles;
                }
                case 0xfd2e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.LY = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xfd2f: {
                    this.method_illegal_1();
                    this.m_ref = ((12032) >>> 0);
                    continue;
                }
                case 0xfd30: {
                    this.method_illegal_1();
                    this.m_ref = ((12288) >>> 0);
                    continue;
                }
                case 0xfd31: {
                    this.method_illegal_1();
                    this.m_ref = ((12544) >>> 0);
                    continue;
                }
                case 0xfd32: {
                    this.method_illegal_1();
                    this.m_ref = ((12800) >>> 0);
                    continue;
                }
                case 0xfd33: {
                    this.method_illegal_1();
                    this.m_ref = ((13056) >>> 0);
                    continue;
                }
                case 0xfd34: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_inc(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd35: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_dec(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd36: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd37: {
                    this.method_illegal_1();
                    this.m_ref = ((14080) >>> 0);
                    continue;
                }
                case 0xfd38: {
                    this.method_illegal_1();
                    this.m_ref = ((14336) >>> 0);
                    continue;
                }
                case 0xfd39: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    let res = ((((this.IY) + (this.SP))) >>> 0);
                    this.WZ = ((((this.IY) + (1))) & 0xffff);
                    this.QT = ((0) & 0xff);
                    this.m_f.yx_val = ((((res) >>> (8))) & 0xff);
                    this.m_f.h_val = ((((((((this.IY) ^ (res))) ^ (this.SP))) >>> (8))) & 0xff);
                    this.m_f.n = ((0) ? 1 : 0);
                    this.m_f.c = ((((res) & (65536))) ? 1 : 0);
                    this.IY = ((((res) & 0xffff)) & 0xffff);
                    return this.cycles;
                }
                case 0xfd3a: {
                    this.method_illegal_1();
                    this.m_ref = ((14848) >>> 0);
                    continue;
                }
                case 0xfd3b: {
                    this.method_illegal_1();
                    this.m_ref = ((15104) >>> 0);
                    continue;
                }
                case 0xfd3c: {
                    this.method_illegal_1();
                    this.m_ref = ((15360) >>> 0);
                    continue;
                }
                case 0xfd3d: {
                    this.method_illegal_1();
                    this.m_ref = ((15616) >>> 0);
                    continue;
                }
                case 0xfd3e: {
                    this.method_illegal_1();
                    this.m_ref = ((15872) >>> 0);
                    continue;
                }
                case 0xfd3f: {
                    this.method_illegal_1();
                    this.m_ref = ((16128) >>> 0);
                    continue;
                }
                case 0xfd40: {
                    this.method_illegal_1();
                    this.m_ref = ((16384) >>> 0);
                    continue;
                }
                case 0xfd41: {
                    this.method_illegal_1();
                    this.m_ref = ((16640) >>> 0);
                    continue;
                }
                case 0xfd42: {
                    this.method_illegal_1();
                    this.m_ref = ((16896) >>> 0);
                    continue;
                }
                case 0xfd43: {
                    this.method_illegal_1();
                    this.m_ref = ((17152) >>> 0);
                    continue;
                }
                case 0xfd44: {
                    this.B = ((this.HY) & 0xff);
                    return this.cycles;
                }
                case 0xfd45: {
                    this.B = ((this.LY) & 0xff);
                    return this.cycles;
                }
                case 0xfd46: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.B = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xfd47: {
                    this.method_illegal_1();
                    this.m_ref = ((18176) >>> 0);
                    continue;
                }
                case 0xfd48: {
                    this.method_illegal_1();
                    this.m_ref = ((18432) >>> 0);
                    continue;
                }
                case 0xfd49: {
                    this.method_illegal_1();
                    this.m_ref = ((18688) >>> 0);
                    continue;
                }
                case 0xfd4a: {
                    this.method_illegal_1();
                    this.m_ref = ((18944) >>> 0);
                    continue;
                }
                case 0xfd4b: {
                    this.method_illegal_1();
                    this.m_ref = ((19200) >>> 0);
                    continue;
                }
                case 0xfd4c: {
                    this.C = ((this.HY) & 0xff);
                    return this.cycles;
                }
                case 0xfd4d: {
                    this.C = ((this.LY) & 0xff);
                    return this.cycles;
                }
                case 0xfd4e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.C = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xfd4f: {
                    this.method_illegal_1();
                    this.m_ref = ((20224) >>> 0);
                    continue;
                }
                case 0xfd50: {
                    this.method_illegal_1();
                    this.m_ref = ((20480) >>> 0);
                    continue;
                }
                case 0xfd51: {
                    this.method_illegal_1();
                    this.m_ref = ((20736) >>> 0);
                    continue;
                }
                case 0xfd52: {
                    this.method_illegal_1();
                    this.m_ref = ((20992) >>> 0);
                    continue;
                }
                case 0xfd53: {
                    this.method_illegal_1();
                    this.m_ref = ((21248) >>> 0);
                    continue;
                }
                case 0xfd54: {
                    this.D = ((this.HY) & 0xff);
                    return this.cycles;
                }
                case 0xfd55: {
                    this.D = ((this.LY) & 0xff);
                    return this.cycles;
                }
                case 0xfd56: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.D = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xfd57: {
                    this.method_illegal_1();
                    this.m_ref = ((22272) >>> 0);
                    continue;
                }
                case 0xfd58: {
                    this.method_illegal_1();
                    this.m_ref = ((22528) >>> 0);
                    continue;
                }
                case 0xfd59: {
                    this.method_illegal_1();
                    this.m_ref = ((22784) >>> 0);
                    continue;
                }
                case 0xfd5a: {
                    this.method_illegal_1();
                    this.m_ref = ((23040) >>> 0);
                    continue;
                }
                case 0xfd5b: {
                    this.method_illegal_1();
                    this.m_ref = ((23296) >>> 0);
                    continue;
                }
                case 0xfd5c: {
                    this.E = ((this.HY) & 0xff);
                    return this.cycles;
                }
                case 0xfd5d: {
                    this.E = ((this.LY) & 0xff);
                    return this.cycles;
                }
                case 0xfd5e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.E = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xfd5f: {
                    this.method_illegal_1();
                    this.m_ref = ((24320) >>> 0);
                    continue;
                }
                case 0xfd60: {
                    this.HY = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0xfd61: {
                    this.HY = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0xfd62: {
                    this.HY = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0xfd63: {
                    this.HY = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0xfd64: {
                    return this.cycles;
                }
                case 0xfd65: {
                    this.HY = ((this.LY) & 0xff);
                    return this.cycles;
                }
                case 0xfd66: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.H = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xfd67: {
                    this.HY = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0xfd68: {
                    this.LY = ((this.B) & 0xff);
                    return this.cycles;
                }
                case 0xfd69: {
                    this.LY = ((this.C) & 0xff);
                    return this.cycles;
                }
                case 0xfd6a: {
                    this.LY = ((this.D) & 0xff);
                    return this.cycles;
                }
                case 0xfd6b: {
                    this.LY = ((this.E) & 0xff);
                    return this.cycles;
                }
                case 0xfd6c: {
                    this.LY = ((this.HY) & 0xff);
                    return this.cycles;
                }
                case 0xfd6d: {
                    return this.cycles;
                }
                case 0xfd6e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.L = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xfd6f: {
                    this.LY = ((this.A) & 0xff);
                    return this.cycles;
                }
                case 0xfd70: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd71: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd72: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd73: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd74: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd75: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd76: {
                    this.method_illegal_1();
                    this.m_ref = ((30208) >>> 0);
                    continue;
                }
                case 0xfd77: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfd78: {
                    this.method_illegal_1();
                    this.m_ref = ((30720) >>> 0);
                    continue;
                }
                case 0xfd79: {
                    this.method_illegal_1();
                    this.m_ref = ((30976) >>> 0);
                    continue;
                }
                case 0xfd7a: {
                    this.method_illegal_1();
                    this.m_ref = ((31232) >>> 0);
                    continue;
                }
                case 0xfd7b: {
                    this.method_illegal_1();
                    this.m_ref = ((31488) >>> 0);
                    continue;
                }
                case 0xfd7c: {
                    this.A = ((this.HY) & 0xff);
                    return this.cycles;
                }
                case 0xfd7d: {
                    this.A = ((this.LY) & 0xff);
                    return this.cycles;
                }
                case 0xfd7e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.A = ((this.TDAT8) & 0xff);
                    return this.cycles;
                }
                case 0xfd7f: {
                    this.method_illegal_1();
                    this.m_ref = ((32512) >>> 0);
                    continue;
                }
                case 0xfd80: {
                    this.method_illegal_1();
                    this.m_ref = ((32768) >>> 0);
                    continue;
                }
                case 0xfd81: {
                    this.method_illegal_1();
                    this.m_ref = ((33024) >>> 0);
                    continue;
                }
                case 0xfd82: {
                    this.method_illegal_1();
                    this.m_ref = ((33280) >>> 0);
                    continue;
                }
                case 0xfd83: {
                    this.method_illegal_1();
                    this.m_ref = ((33536) >>> 0);
                    continue;
                }
                case 0xfd84: {
                    this.method_add_a(this.HY);
                    return this.cycles;
                }
                case 0xfd85: {
                    this.method_add_a(this.LY);
                    return this.cycles;
                }
                case 0xfd86: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_add_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xfd87: {
                    this.method_illegal_1();
                    this.m_ref = ((34560) >>> 0);
                    continue;
                }
                case 0xfd88: {
                    this.method_illegal_1();
                    this.m_ref = ((34816) >>> 0);
                    continue;
                }
                case 0xfd89: {
                    this.method_illegal_1();
                    this.m_ref = ((35072) >>> 0);
                    continue;
                }
                case 0xfd8a: {
                    this.method_illegal_1();
                    this.m_ref = ((35328) >>> 0);
                    continue;
                }
                case 0xfd8b: {
                    this.method_illegal_1();
                    this.m_ref = ((35584) >>> 0);
                    continue;
                }
                case 0xfd8c: {
                    this.method_adc_a(this.HY);
                    return this.cycles;
                }
                case 0xfd8d: {
                    this.method_adc_a(this.LY);
                    return this.cycles;
                }
                case 0xfd8e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_adc_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xfd8f: {
                    this.method_illegal_1();
                    this.m_ref = ((36608) >>> 0);
                    continue;
                }
                case 0xfd90: {
                    this.method_illegal_1();
                    this.m_ref = ((36864) >>> 0);
                    continue;
                }
                case 0xfd91: {
                    this.method_illegal_1();
                    this.m_ref = ((37120) >>> 0);
                    continue;
                }
                case 0xfd92: {
                    this.method_illegal_1();
                    this.m_ref = ((37376) >>> 0);
                    continue;
                }
                case 0xfd93: {
                    this.method_illegal_1();
                    this.m_ref = ((37632) >>> 0);
                    continue;
                }
                case 0xfd94: {
                    this.method_sub_a(this.HY);
                    return this.cycles;
                }
                case 0xfd95: {
                    this.method_sub_a(this.LY);
                    return this.cycles;
                }
                case 0xfd96: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_sub_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xfd97: {
                    this.method_illegal_1();
                    this.m_ref = ((38656) >>> 0);
                    continue;
                }
                case 0xfd98: {
                    this.method_illegal_1();
                    this.m_ref = ((38912) >>> 0);
                    continue;
                }
                case 0xfd99: {
                    this.method_illegal_1();
                    this.m_ref = ((39168) >>> 0);
                    continue;
                }
                case 0xfd9a: {
                    this.method_illegal_1();
                    this.m_ref = ((39424) >>> 0);
                    continue;
                }
                case 0xfd9b: {
                    this.method_illegal_1();
                    this.m_ref = ((39680) >>> 0);
                    continue;
                }
                case 0xfd9c: {
                    this.method_sbc_a(this.HY);
                    return this.cycles;
                }
                case 0xfd9d: {
                    this.method_sbc_a(this.LY);
                    return this.cycles;
                }
                case 0xfd9e: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_sbc_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xfd9f: {
                    this.method_illegal_1();
                    this.m_ref = ((40704) >>> 0);
                    continue;
                }
                case 0xfda0: {
                    this.method_illegal_1();
                    this.m_ref = ((40960) >>> 0);
                    continue;
                }
                case 0xfda1: {
                    this.method_illegal_1();
                    this.m_ref = ((41216) >>> 0);
                    continue;
                }
                case 0xfda2: {
                    this.method_illegal_1();
                    this.m_ref = ((41472) >>> 0);
                    continue;
                }
                case 0xfda3: {
                    this.method_illegal_1();
                    this.m_ref = ((41728) >>> 0);
                    continue;
                }
                case 0xfda4: {
                    this.method_and_a(this.HY);
                    return this.cycles;
                }
                case 0xfda5: {
                    this.method_and_a(this.LY);
                    return this.cycles;
                }
                case 0xfda6: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_and_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xfda7: {
                    this.method_illegal_1();
                    this.m_ref = ((42752) >>> 0);
                    continue;
                }
                case 0xfda8: {
                    this.method_illegal_1();
                    this.m_ref = ((43008) >>> 0);
                    continue;
                }
                case 0xfda9: {
                    this.method_illegal_1();
                    this.m_ref = ((43264) >>> 0);
                    continue;
                }
                case 0xfdaa: {
                    this.method_illegal_1();
                    this.m_ref = ((43520) >>> 0);
                    continue;
                }
                case 0xfdab: {
                    this.method_illegal_1();
                    this.m_ref = ((43776) >>> 0);
                    continue;
                }
                case 0xfdac: {
                    this.method_xor_a(this.HY);
                    return this.cycles;
                }
                case 0xfdad: {
                    this.method_xor_a(this.LY);
                    return this.cycles;
                }
                case 0xfdae: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_xor_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xfdaf: {
                    this.method_illegal_1();
                    this.m_ref = ((44800) >>> 0);
                    continue;
                }
                case 0xfdb0: {
                    this.method_illegal_1();
                    this.m_ref = ((45056) >>> 0);
                    continue;
                }
                case 0xfdb1: {
                    this.method_illegal_1();
                    this.m_ref = ((45312) >>> 0);
                    continue;
                }
                case 0xfdb2: {
                    this.method_illegal_1();
                    this.m_ref = ((45568) >>> 0);
                    continue;
                }
                case 0xfdb3: {
                    this.method_illegal_1();
                    this.m_ref = ((45824) >>> 0);
                    continue;
                }
                case 0xfdb4: {
                    this.method_or_a(this.HY);
                    return this.cycles;
                }
                case 0xfdb5: {
                    this.method_or_a(this.LY);
                    return this.cycles;
                }
                case 0xfdb6: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_or_a(this.TDAT8);
                    return this.cycles;
                }
                case 0xfdb7: {
                    this.method_illegal_1();
                    this.m_ref = ((46848) >>> 0);
                    continue;
                }
                case 0xfdb8: {
                    this.method_illegal_1();
                    this.m_ref = ((47104) >>> 0);
                    continue;
                }
                case 0xfdb9: {
                    this.method_illegal_1();
                    this.m_ref = ((47360) >>> 0);
                    continue;
                }
                case 0xfdba: {
                    this.method_illegal_1();
                    this.m_ref = ((47616) >>> 0);
                    continue;
                }
                case 0xfdbb: {
                    this.method_illegal_1();
                    this.m_ref = ((47872) >>> 0);
                    continue;
                }
                case 0xfdbc: {
                    this.method_cp(this.HY);
                    return this.cycles;
                }
                case 0xfdbd: {
                    this.method_cp(this.LY);
                    return this.cycles;
                }
                case 0xfdbe: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.method_cp(this.TDAT8);
                    return this.cycles;
                }
                case 0xfdbf: {
                    this.method_illegal_1();
                    this.m_ref = ((48896) >>> 0);
                    continue;
                }
                case 0xfdc0: {
                    this.method_illegal_1();
                    this.m_ref = ((49152) >>> 0);
                    continue;
                }
                case 0xfdc1: {
                    this.method_illegal_1();
                    this.m_ref = ((49408) >>> 0);
                    continue;
                }
                case 0xfdc2: {
                    this.method_illegal_1();
                    this.m_ref = ((49664) >>> 0);
                    continue;
                }
                case 0xfdc3: {
                    this.method_illegal_1();
                    this.m_ref = ((49920) >>> 0);
                    continue;
                }
                case 0xfdc4: {
                    this.method_illegal_1();
                    this.m_ref = ((50176) >>> 0);
                    continue;
                }
                case 0xfdc5: {
                    this.method_illegal_1();
                    this.m_ref = ((50432) >>> 0);
                    continue;
                }
                case 0xfdc6: {
                    this.method_illegal_1();
                    this.m_ref = ((50688) >>> 0);
                    continue;
                }
                case 0xfdc7: {
                    this.method_illegal_1();
                    this.m_ref = ((50944) >>> 0);
                    continue;
                }
                case 0xfdc8: {
                    this.method_illegal_1();
                    this.m_ref = ((51200) >>> 0);
                    continue;
                }
                case 0xfdc9: {
                    this.method_illegal_1();
                    this.m_ref = ((51456) >>> 0);
                    continue;
                }
                case 0xfdca: {
                    this.method_illegal_1();
                    this.m_ref = ((51712) >>> 0);
                    continue;
                }
                case 0xfdcb: {
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    this.m_ea = ((((((this.IY) + ((((this.TDAT8) << 24) >> 24)))) & 0xffff)) & 0xffff);
                    this.WZ = ((this.m_ea) & 0xffff);
                    this.TDAT8 = ((this.method_arg_read()) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.PC = ((((this.PC) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.PC) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.m_ref = ((((((254) << (16))) | (((this.TDAT8) << (8))))) >>> 0);
                    continue;
                }
                case 0xfdcc: {
                    this.method_illegal_1();
                    this.m_ref = ((52224) >>> 0);
                    continue;
                }
                case 0xfdcd: {
                    this.method_illegal_1();
                    this.m_ref = ((52480) >>> 0);
                    continue;
                }
                case 0xfdce: {
                    this.method_illegal_1();
                    this.m_ref = ((52736) >>> 0);
                    continue;
                }
                case 0xfdcf: {
                    this.method_illegal_1();
                    this.m_ref = ((52992) >>> 0);
                    continue;
                }
                case 0xfdd0: {
                    this.method_illegal_1();
                    this.m_ref = ((53248) >>> 0);
                    continue;
                }
                case 0xfdd1: {
                    this.method_illegal_1();
                    this.m_ref = ((53504) >>> 0);
                    continue;
                }
                case 0xfdd2: {
                    this.method_illegal_1();
                    this.m_ref = ((53760) >>> 0);
                    continue;
                }
                case 0xfdd3: {
                    this.method_illegal_1();
                    this.m_ref = ((54016) >>> 0);
                    continue;
                }
                case 0xfdd4: {
                    this.method_illegal_1();
                    this.m_ref = ((54272) >>> 0);
                    continue;
                }
                case 0xfdd5: {
                    this.method_illegal_1();
                    this.m_ref = ((54528) >>> 0);
                    continue;
                }
                case 0xfdd6: {
                    this.method_illegal_1();
                    this.m_ref = ((54784) >>> 0);
                    continue;
                }
                case 0xfdd7: {
                    this.method_illegal_1();
                    this.m_ref = ((55040) >>> 0);
                    continue;
                }
                case 0xfdd8: {
                    this.method_illegal_1();
                    this.m_ref = ((55296) >>> 0);
                    continue;
                }
                case 0xfdd9: {
                    this.method_illegal_1();
                    this.m_ref = ((55552) >>> 0);
                    continue;
                }
                case 0xfdda: {
                    this.method_illegal_1();
                    this.m_ref = ((55808) >>> 0);
                    continue;
                }
                case 0xfddb: {
                    this.method_illegal_1();
                    this.m_ref = ((56064) >>> 0);
                    continue;
                }
                case 0xfddc: {
                    this.method_illegal_1();
                    this.m_ref = ((56320) >>> 0);
                    continue;
                }
                case 0xfddd: {
                    this.method_illegal_1();
                    this.m_ref = ((56576) >>> 0);
                    continue;
                }
                case 0xfdde: {
                    this.method_illegal_1();
                    this.m_ref = ((56832) >>> 0);
                    continue;
                }
                case 0xfddf: {
                    this.method_illegal_1();
                    this.m_ref = ((57088) >>> 0);
                    continue;
                }
                case 0xfde0: {
                    this.method_illegal_1();
                    this.m_ref = ((57344) >>> 0);
                    continue;
                }
                case 0xfde1: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.IY = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0xfde2: {
                    this.method_illegal_1();
                    this.m_ref = ((57856) >>> 0);
                    continue;
                }
                case 0xfde3: {
                    this.TDAT_L = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    this.TDAT_H = ((this.method_stack_read(this.SP)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) + (1))) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((this.SP) - (1))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.IY) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.IY);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.IY = ((this.TDAT) & 0xffff);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.SP) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.SP) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.WZ = ((this.TDAT) & 0xffff);
                    return this.cycles;
                }
                case 0xfde4: {
                    this.method_illegal_1();
                    this.m_ref = ((58368) >>> 0);
                    continue;
                }
                case 0xfde5: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, ((this.IY) >>> (8)));
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    this.SP = ((((this.SP) - (1))) & 0xffff);
                    this.method_stack_write(this.SP, this.IY);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfde6: {
                    this.method_illegal_1();
                    this.m_ref = ((58880) >>> 0);
                    continue;
                }
                case 0xfde7: {
                    this.method_illegal_1();
                    this.m_ref = ((59136) >>> 0);
                    continue;
                }
                case 0xfde8: {
                    this.method_illegal_1();
                    this.m_ref = ((59392) >>> 0);
                    continue;
                }
                case 0xfde9: {
                    this.PC = ((this.IY) & 0xffff);
                    return this.cycles;
                }
                case 0xfdea: {
                    this.method_illegal_1();
                    this.m_ref = ((59904) >>> 0);
                    continue;
                }
                case 0xfdeb: {
                    this.method_illegal_1();
                    this.m_ref = ((60160) >>> 0);
                    continue;
                }
                case 0xfdec: {
                    this.method_illegal_1();
                    this.m_ref = ((60416) >>> 0);
                    continue;
                }
                case 0xfded: {
                    this.method_illegal_1();
                    this.m_ref = ((60672) >>> 0);
                    continue;
                }
                case 0xfdee: {
                    this.method_illegal_1();
                    this.m_ref = ((60928) >>> 0);
                    continue;
                }
                case 0xfdef: {
                    this.method_illegal_1();
                    this.m_ref = ((61184) >>> 0);
                    continue;
                }
                case 0xfdf0: {
                    this.method_illegal_1();
                    this.m_ref = ((61440) >>> 0);
                    continue;
                }
                case 0xfdf1: {
                    this.method_illegal_1();
                    this.m_ref = ((61696) >>> 0);
                    continue;
                }
                case 0xfdf2: {
                    this.method_illegal_1();
                    this.m_ref = ((61952) >>> 0);
                    continue;
                }
                case 0xfdf3: {
                    this.method_illegal_1();
                    this.m_ref = ((62208) >>> 0);
                    continue;
                }
                case 0xfdf4: {
                    this.method_illegal_1();
                    this.m_ref = ((62464) >>> 0);
                    continue;
                }
                case 0xfdf5: {
                    this.method_illegal_1();
                    this.m_ref = ((62720) >>> 0);
                    continue;
                }
                case 0xfdf6: {
                    this.method_illegal_1();
                    this.m_ref = ((62976) >>> 0);
                    continue;
                }
                case 0xfdf7: {
                    this.method_illegal_1();
                    this.m_ref = ((63232) >>> 0);
                    continue;
                }
                case 0xfdf8: {
                    this.method_illegal_1();
                    this.m_ref = ((63488) >>> 0);
                    continue;
                }
                case 0xfdf9: {
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", ((((((this.m_i) << (8))) | (((this.m_r2) & (128))))) | (((this.m_r) & (127))))) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.SP = ((this.IY) & 0xffff);
                    return this.cycles;
                }
                case 0xfdfa: {
                    this.method_illegal_1();
                    this.m_ref = ((64000) >>> 0);
                    continue;
                }
                case 0xfdfb: {
                    this.method_illegal_1();
                    this.m_ref = ((64256) >>> 0);
                    continue;
                }
                case 0xfdfc: {
                    this.method_illegal_1();
                    this.m_ref = ((64512) >>> 0);
                    continue;
                }
                case 0xfdfd: {
                    this.method_illegal_1();
                    this.m_ref = ((64768) >>> 0);
                    continue;
                }
                case 0xfdfe: {
                    this.method_illegal_1();
                    this.m_ref = ((65024) >>> 0);
                    continue;
                }
                case 0xfdff: {
                    this.method_illegal_1();
                    this.m_ref = ((65280) >>> 0);
                    continue;
                }
                case 0xfe00: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_rlc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe01: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_rlc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe02: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_rlc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe03: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_rlc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe04: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_rlc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe05: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_rlc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe06: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_rlc(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe07: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_rlc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe08: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_rrc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe09: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_rrc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe0a: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_rrc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe0b: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_rrc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe0c: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_rrc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe0d: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_rrc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe0e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_rrc(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe0f: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_rrc(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe10: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_rl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe11: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_rl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe12: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_rl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe13: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_rl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe14: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_rl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe15: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_rl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe16: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_rl(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe17: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_rl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe18: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_rr(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe19: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_rr(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe1a: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_rr(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe1b: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_rr(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe1c: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_rr(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe1d: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_rr(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe1e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_rr(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe1f: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_rr(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe20: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_sla(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe21: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_sla(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe22: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_sla(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe23: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_sla(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe24: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_sla(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe25: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_sla(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe26: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_sla(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe27: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_sla(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe28: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_sra(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe29: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_sra(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe2a: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_sra(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe2b: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_sra(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe2c: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_sra(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe2d: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_sra(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe2e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_sra(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe2f: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_sra(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe30: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_sll(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe31: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_sll(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe32: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_sll(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe33: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_sll(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe34: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_sll(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe35: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_sll(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe36: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_sll(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe37: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_sll(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe38: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_srl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe39: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_srl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe3a: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_srl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe3b: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_srl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe3c: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_srl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe3d: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_srl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe3e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_srl(this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe3f: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_srl(this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe40: {
                    this.m_ref = ((16664064) >>> 0);
                    continue;
                }
                case 0xfe41: {
                    this.m_ref = ((16664064) >>> 0);
                    continue;
                }
                case 0xfe42: {
                    this.m_ref = ((16664064) >>> 0);
                    continue;
                }
                case 0xfe43: {
                    this.m_ref = ((16664064) >>> 0);
                    continue;
                }
                case 0xfe44: {
                    this.m_ref = ((16664064) >>> 0);
                    continue;
                }
                case 0xfe45: {
                    this.m_ref = ((16664064) >>> 0);
                    continue;
                }
                case 0xfe46: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_xy(0, this.TDAT8);
                    return this.cycles;
                }
                case 0xfe47: {
                    this.m_ref = ((16664064) >>> 0);
                    continue;
                }
                case 0xfe48: {
                    this.m_ref = ((16666112) >>> 0);
                    continue;
                }
                case 0xfe49: {
                    this.m_ref = ((16666112) >>> 0);
                    continue;
                }
                case 0xfe4a: {
                    this.m_ref = ((16666112) >>> 0);
                    continue;
                }
                case 0xfe4b: {
                    this.m_ref = ((16666112) >>> 0);
                    continue;
                }
                case 0xfe4c: {
                    this.m_ref = ((16666112) >>> 0);
                    continue;
                }
                case 0xfe4d: {
                    this.m_ref = ((16666112) >>> 0);
                    continue;
                }
                case 0xfe4e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_xy(1, this.TDAT8);
                    return this.cycles;
                }
                case 0xfe4f: {
                    this.m_ref = ((16666112) >>> 0);
                    continue;
                }
                case 0xfe50: {
                    this.m_ref = ((16668160) >>> 0);
                    continue;
                }
                case 0xfe51: {
                    this.m_ref = ((16668160) >>> 0);
                    continue;
                }
                case 0xfe52: {
                    this.m_ref = ((16668160) >>> 0);
                    continue;
                }
                case 0xfe53: {
                    this.m_ref = ((16668160) >>> 0);
                    continue;
                }
                case 0xfe54: {
                    this.m_ref = ((16668160) >>> 0);
                    continue;
                }
                case 0xfe55: {
                    this.m_ref = ((16668160) >>> 0);
                    continue;
                }
                case 0xfe56: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_xy(2, this.TDAT8);
                    return this.cycles;
                }
                case 0xfe57: {
                    this.m_ref = ((16668160) >>> 0);
                    continue;
                }
                case 0xfe58: {
                    this.m_ref = ((16670208) >>> 0);
                    continue;
                }
                case 0xfe59: {
                    this.m_ref = ((16670208) >>> 0);
                    continue;
                }
                case 0xfe5a: {
                    this.m_ref = ((16670208) >>> 0);
                    continue;
                }
                case 0xfe5b: {
                    this.m_ref = ((16670208) >>> 0);
                    continue;
                }
                case 0xfe5c: {
                    this.m_ref = ((16670208) >>> 0);
                    continue;
                }
                case 0xfe5d: {
                    this.m_ref = ((16670208) >>> 0);
                    continue;
                }
                case 0xfe5e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_xy(3, this.TDAT8);
                    return this.cycles;
                }
                case 0xfe5f: {
                    this.m_ref = ((16670208) >>> 0);
                    continue;
                }
                case 0xfe60: {
                    this.m_ref = ((16672256) >>> 0);
                    continue;
                }
                case 0xfe61: {
                    this.m_ref = ((16672256) >>> 0);
                    continue;
                }
                case 0xfe62: {
                    this.m_ref = ((16672256) >>> 0);
                    continue;
                }
                case 0xfe63: {
                    this.m_ref = ((16672256) >>> 0);
                    continue;
                }
                case 0xfe64: {
                    this.m_ref = ((16672256) >>> 0);
                    continue;
                }
                case 0xfe65: {
                    this.m_ref = ((16672256) >>> 0);
                    continue;
                }
                case 0xfe66: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_xy(4, this.TDAT8);
                    return this.cycles;
                }
                case 0xfe67: {
                    this.m_ref = ((16672256) >>> 0);
                    continue;
                }
                case 0xfe68: {
                    this.m_ref = ((16674304) >>> 0);
                    continue;
                }
                case 0xfe69: {
                    this.m_ref = ((16674304) >>> 0);
                    continue;
                }
                case 0xfe6a: {
                    this.m_ref = ((16674304) >>> 0);
                    continue;
                }
                case 0xfe6b: {
                    this.m_ref = ((16674304) >>> 0);
                    continue;
                }
                case 0xfe6c: {
                    this.m_ref = ((16674304) >>> 0);
                    continue;
                }
                case 0xfe6d: {
                    this.m_ref = ((16674304) >>> 0);
                    continue;
                }
                case 0xfe6e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_xy(5, this.TDAT8);
                    return this.cycles;
                }
                case 0xfe6f: {
                    this.m_ref = ((16674304) >>> 0);
                    continue;
                }
                case 0xfe70: {
                    this.m_ref = ((16676352) >>> 0);
                    continue;
                }
                case 0xfe71: {
                    this.m_ref = ((16676352) >>> 0);
                    continue;
                }
                case 0xfe72: {
                    this.m_ref = ((16676352) >>> 0);
                    continue;
                }
                case 0xfe73: {
                    this.m_ref = ((16676352) >>> 0);
                    continue;
                }
                case 0xfe74: {
                    this.m_ref = ((16676352) >>> 0);
                    continue;
                }
                case 0xfe75: {
                    this.m_ref = ((16676352) >>> 0);
                    continue;
                }
                case 0xfe76: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_xy(6, this.TDAT8);
                    return this.cycles;
                }
                case 0xfe77: {
                    this.m_ref = ((16676352) >>> 0);
                    continue;
                }
                case 0xfe78: {
                    this.m_ref = ((16678400) >>> 0);
                    continue;
                }
                case 0xfe79: {
                    this.m_ref = ((16678400) >>> 0);
                    continue;
                }
                case 0xfe7a: {
                    this.m_ref = ((16678400) >>> 0);
                    continue;
                }
                case 0xfe7b: {
                    this.m_ref = ((16678400) >>> 0);
                    continue;
                }
                case 0xfe7c: {
                    this.m_ref = ((16678400) >>> 0);
                    continue;
                }
                case 0xfe7d: {
                    this.m_ref = ((16678400) >>> 0);
                    continue;
                }
                case 0xfe7e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.method_bit_xy(7, this.TDAT8);
                    return this.cycles;
                }
                case 0xfe7f: {
                    this.m_ref = ((16678400) >>> 0);
                    continue;
                }
                case 0xfe80: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_res(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe81: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_res(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe82: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_res(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe83: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_res(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe84: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_res(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe85: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_res(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe86: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(0, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe87: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_res(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe88: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_res(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe89: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_res(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe8a: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_res(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe8b: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_res(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe8c: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_res(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe8d: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_res(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe8e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(1, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe8f: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_res(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe90: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_res(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe91: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_res(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe92: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_res(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe93: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_res(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe94: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_res(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe95: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_res(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe96: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(2, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe97: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_res(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe98: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_res(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe99: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_res(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe9a: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_res(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe9b: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_res(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe9c: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_res(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe9d: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_res(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe9e: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(3, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfe9f: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_res(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea0: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_res(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea1: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_res(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea2: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_res(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea3: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_res(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea4: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_res(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea5: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_res(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea6: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(4, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea7: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_res(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea8: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_res(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfea9: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_res(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeaa: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_res(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeab: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_res(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeac: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_res(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfead: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_res(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeae: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(5, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeaf: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_res(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb0: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_res(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb1: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_res(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb2: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_res(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb3: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_res(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb4: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_res(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb5: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_res(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb6: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(6, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb7: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_res(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb8: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_res(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeb9: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_res(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeba: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_res(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfebb: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_res(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfebc: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_res(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfebd: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_res(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfebe: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_res(7, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfebf: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_res(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec0: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_set(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec1: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_set(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec2: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_set(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec3: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_set(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec4: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_set(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec5: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_set(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec6: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(0, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec7: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_set(0, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec8: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_set(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfec9: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_set(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeca: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_set(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfecb: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_set(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfecc: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_set(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfecd: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_set(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfece: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(1, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfecf: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_set(1, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed0: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_set(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed1: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_set(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed2: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_set(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed3: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_set(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed4: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_set(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed5: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_set(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed6: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(2, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed7: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_set(2, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed8: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_set(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfed9: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_set(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeda: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_set(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfedb: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_set(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfedc: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_set(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfedd: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_set(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfede: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(3, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfedf: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_set(3, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee0: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_set(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee1: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_set(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee2: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_set(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee3: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_set(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee4: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_set(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee5: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_set(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee6: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(4, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee7: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_set(4, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee8: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_set(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfee9: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_set(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeea: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_set(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeeb: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_set(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeec: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_set(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeed: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_set(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeee: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(5, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeef: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_set(5, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef0: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_set(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef1: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_set(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef2: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_set(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef3: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_set(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef4: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_set(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef5: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_set(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef6: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(6, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef7: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_set(6, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef8: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.B = ((this.method_set(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.B) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfef9: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.C = ((this.method_set(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.C) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfefa: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.D = ((this.method_set(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.D) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfefb: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.E = ((this.method_set(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.E) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfefc: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.H = ((this.method_set(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.H) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfefd: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.L = ((this.method_set(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.L) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfefe: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.TDAT8 = ((this.method_set(7, this.TDAT8)) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                case 0xfeff: {
                    this.TDAT8 = ((this.method_data_read(this.m_ea)) & 0xff);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    if (1) {
                        (this.bus.signal?.("nomreq_cb", this.m_ea) ?? 0);
                    }
                    this.cycles = ((((this.cycles) + (1))) >>> 0);
                    this.A = ((this.method_set(7, this.TDAT8)) & 0xff);
                    this.TDAT8 = ((this.A) & 0xff);
                    this.method_data_write(this.m_ea, this.TDAT8);
                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                    return this.cycles;
                }
                default:
                    throw new Error('Z80 has no generated opcode ' +
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
    run(target) {
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
    elapsedCycles() {
        return this.cycles;
    }
    setIrqLine(active, dataBus = 0xff, hold = false) {
        if (active)
            this.irqData = dataBus;
        this.irqHold = active && hold;
        this.generatedInput(0, active ? 1 : 0);
    }
    setInputLine(inputnum, state) {
        this.updateInternalInput(inputnum, state);
        this.generatedInput(inputnum, state);
    }
    nmi() {
        this.generatedInput(-1, 1);
        this.generatedInput(-1, 0);
    }
    acknowledgeIrq(level = 0) {
        const source = this.irqData;
        const data = this.bus.acknowledge?.(level) ??
            (typeof source === 'function' ? source() : source);
        if (this.irqHold) {
            this.irqHold = false;
            this.setIrqLine(false);
        }
        return data;
    }
    readMemory(address) {
        const location = address & 65535;
        if (false)
            return this.internalRam[location];
        return this.bus.read(location) & 0xff;
    }
    writeMemory(address, value) {
        const location = address & 65535;
        const data = value & 0xff;
        if (false) {
            this.internalRam[location] = data;
            return;
        }
        this.bus.write(location, data);
    }
    readOpcode(address) {
        const location = address & 65535;
        const value = this.readMemory(location);
        return value;
    }
    emitPort(index, signal, outputMask) {
        const direction = this.portDirection[index];
        const data = (this.portData[index] & direction) | (direction ^ 0xff);
        this.bus.signal?.(signal, data & outputMask);
    }
    resetInternal() {
        this.portDirection.fill(0);
        this.portHandshakeControl = 0;
        this.portHandshakeInputState = 0;
        this.portHandshakeLatched = false;
        this.portHandshakePendingClear = false;
    }
    updateInternalInput(inputnum, state) {
        void inputnum;
        void state;
    }
    get(name) {
        switch (name) {
            case "PRVPC": return this.PRVPC;
            case "PC": return this.PC;
            case "SP": return this.SP;
            case "Q": return this.Q;
            case "QT": return this.QT;
            case "I": return this.I;
            case "R": return this.R;
            case "R2": return this.R2;
            case "AF": return this.AF;
            case "A": return this.A;
            case "F": return this.F;
            case "BC": return this.BC;
            case "B": return this.B;
            case "C": return this.C;
            case "DE": return this.DE;
            case "D": return this.D;
            case "E": return this.E;
            case "HL": return this.HL;
            case "H": return this.H;
            case "L": return this.L;
            case "IX": return this.IX;
            case "HX": return this.HX;
            case "LX": return this.LX;
            case "IY": return this.IY;
            case "HY": return this.HY;
            case "LY": return this.LY;
            case "WZ": return this.WZ;
            case "WZ_H": return this.WZ_H;
            case "WZ_L": return this.WZ_L;
            case "TDAT": return this.TDAT;
            case "TDAT2": return this.TDAT2;
            case "TDAT_H": return this.TDAT_H;
            case "TDAT_L": return this.TDAT_L;
            case "TDAT8": return this.TDAT8;
            case "cycles": return this.cycles;
            case "m_af":
            case "m_af.w": return this.m_af.w;
            case "m_af.b.h": return this.m_af.b.h;
            case "m_af.b.l": return this.m_af.b.l;
            case "m_af2":
            case "m_af2.w": return this.m_af2.w;
            case "m_af2.b.h": return this.m_af2.b.h;
            case "m_af2.b.l": return this.m_af2.b.l;
            case "m_bc":
            case "m_bc.w": return this.m_bc.w;
            case "m_bc.b.h": return this.m_bc.b.h;
            case "m_bc.b.l": return this.m_bc.b.l;
            case "m_bc2":
            case "m_bc2.w": return this.m_bc2.w;
            case "m_bc2.b.h": return this.m_bc2.b.h;
            case "m_bc2.b.l": return this.m_bc2.b.l;
            case "m_busack_state": return this.m_busack_state;
            case "m_busreq_state": return this.m_busreq_state;
            case "m_de":
            case "m_de.w": return this.m_de.w;
            case "m_de.b.h": return this.m_de.b.h;
            case "m_de.b.l": return this.m_de.b.l;
            case "m_de2":
            case "m_de2.w": return this.m_de2.w;
            case "m_de2.b.h": return this.m_de2.b.h;
            case "m_de2.b.l": return this.m_de2.b.l;
            case "m_ea": return this.m_ea;
            case "m_f.s_val": return this.m_f.s_val;
            case "m_f.z_val": return this.m_f.z_val;
            case "m_f.yx_val": return this.m_f.yx_val;
            case "m_f.h_val": return this.m_f.h_val;
            case "m_f.pv_val": return this.m_f.pv_val;
            case "m_f.n": return this.m_f.n;
            case "m_f.c": return this.m_f.c;
            case "m_f.q": return this.m_f.q;
            case "m_f.qtemp": return this.m_f.qtemp;
            case "m_halt": return this.m_halt;
            case "m_hl":
            case "m_hl.w": return this.m_hl.w;
            case "m_hl.b.h": return this.m_hl.b.h;
            case "m_hl.b.l": return this.m_hl.b.l;
            case "m_hl2":
            case "m_hl2.w": return this.m_hl2.w;
            case "m_hl2.b.h": return this.m_hl2.b.h;
            case "m_hl2.b.l": return this.m_hl2.b.l;
            case "m_i": return this.m_i;
            case "m_icount": return this.m_icount;
            case "m_iff1": return this.m_iff1;
            case "m_iff2": return this.m_iff2;
            case "m_im": return this.m_im;
            case "m_iorq_cycles": return this.m_iorq_cycles;
            case "m_irq_state": return this.m_irq_state;
            case "m_ix":
            case "m_ix.w": return this.m_ix.w;
            case "m_ix.b.h": return this.m_ix.b.h;
            case "m_ix.b.l": return this.m_ix.b.l;
            case "m_iy":
            case "m_iy.w": return this.m_iy.w;
            case "m_iy.b.h": return this.m_iy.b.h;
            case "m_iy.b.l": return this.m_iy.b.l;
            case "m_m1_cycles": return this.m_m1_cycles;
            case "m_mreq_cycles": return this.m_mreq_cycles;
            case "m_nmi_state": return this.m_nmi_state;
            case "m_pc":
            case "m_pc.w": return this.m_pc.w;
            case "m_pc.b.h": return this.m_pc.b.h;
            case "m_pc.b.l": return this.m_pc.b.l;
            case "m_prvpc":
            case "m_prvpc.w": return this.m_prvpc.w;
            case "m_prvpc.b.h": return this.m_prvpc.b.h;
            case "m_prvpc.b.l": return this.m_prvpc.b.l;
            case "m_r": return this.m_r;
            case "m_r2": return this.m_r2;
            case "m_ref": return this.m_ref;
            case "m_rtemp": return this.m_rtemp;
            case "m_service_attention": return this.m_service_attention;
            case "m_shared_data":
            case "m_shared_data.w": return this.m_shared_data.w;
            case "m_shared_data.b.h": return this.m_shared_data.b.h;
            case "m_shared_data.b.l": return this.m_shared_data.b.l;
            case "m_shared_data2":
            case "m_shared_data2.w": return this.m_shared_data2.w;
            case "m_shared_data2.b.h": return this.m_shared_data2.b.h;
            case "m_shared_data2.b.l": return this.m_shared_data2.b.l;
            case "m_sp":
            case "m_sp.w": return this.m_sp.w;
            case "m_sp.b.h": return this.m_sp.b.h;
            case "m_sp.b.l": return this.m_sp.b.l;
            case "m_tmp_irq_vector": return this.m_tmp_irq_vector;
            case "m_wait_state": return this.m_wait_state;
            case "m_wz":
            case "m_wz.w": return this.m_wz.w;
            case "m_wz.b.h": return this.m_wz.b.h;
            case "m_wz.b.l": return this.m_wz.b.l;
            default: return 0;
        }
    }
    /** MAME device_state_interface::state_int, by the CPU's own state index. */
    stateInt(index) {
        switch (index) {
            case 1: return this.SP; // Z80_SP
            case 2: return this.A; // Z80_A
            case 3: return this.F; // Z80_F
            case 4: return this.B; // Z80_B
            case 5: return this.C; // Z80_C
            case 6: return this.D; // Z80_D
            case 7: return this.E; // Z80_E
            case 8: return this.H; // Z80_H
            case 9: return this.L; // Z80_L
            case 10: return this.AF; // Z80_AF
            case 11: return this.BC; // Z80_BC
            case 12: return this.DE; // Z80_DE
            case 13: return this.HL; // Z80_HL
            case 14: return this.IX; // Z80_IX
            case 15: return this.IY; // Z80_IY
            case 20: return this.R; // Z80_R
            case 21: return this.I; // Z80_I
            case 30: return this.WZ; // Z80_WZ
            default: return 0;
        }
    }
    set(name, value) {
        switch (name) {
            case "PRVPC":
                this.PRVPC = ((value) & 0xffff);
                return;
            case "PC":
                this.PC = ((value) & 0xffff);
                return;
            case "SP":
                this.SP = ((value) & 0xffff);
                return;
            case "Q":
                this.Q = ((value) & 0xff);
                return;
            case "QT":
                this.QT = ((value) & 0xff);
                return;
            case "I":
                this.I = ((value) & 0xff);
                return;
            case "R":
                this.R = ((value) & 0xff);
                return;
            case "R2":
                this.R2 = ((value) & 0xff);
                return;
            case "AF":
                this.AF = ((value) & 0xffff);
                return;
            case "A":
                this.A = ((value) & 0xff);
                return;
            case "F":
                this.F = ((value) & 0xff);
                return;
            case "BC":
                this.BC = ((value) & 0xffff);
                return;
            case "B":
                this.B = ((value) & 0xff);
                return;
            case "C":
                this.C = ((value) & 0xff);
                return;
            case "DE":
                this.DE = ((value) & 0xffff);
                return;
            case "D":
                this.D = ((value) & 0xff);
                return;
            case "E":
                this.E = ((value) & 0xff);
                return;
            case "HL":
                this.HL = ((value) & 0xffff);
                return;
            case "H":
                this.H = ((value) & 0xff);
                return;
            case "L":
                this.L = ((value) & 0xff);
                return;
            case "IX":
                this.IX = ((value) & 0xffff);
                return;
            case "HX":
                this.HX = ((value) & 0xff);
                return;
            case "LX":
                this.LX = ((value) & 0xff);
                return;
            case "IY":
                this.IY = ((value) & 0xffff);
                return;
            case "HY":
                this.HY = ((value) & 0xff);
                return;
            case "LY":
                this.LY = ((value) & 0xff);
                return;
            case "WZ":
                this.WZ = ((value) & 0xffff);
                return;
            case "WZ_H":
                this.WZ_H = ((value) & 0xff);
                return;
            case "WZ_L":
                this.WZ_L = ((value) & 0xff);
                return;
            case "TDAT":
                this.TDAT = ((value) & 0xffff);
                return;
            case "TDAT2":
                this.TDAT2 = ((value) & 0xffff);
                return;
            case "TDAT_H":
                this.TDAT_H = ((value) & 0xff);
                return;
            case "TDAT_L":
                this.TDAT_L = ((value) & 0xff);
                return;
            case "TDAT8":
                this.TDAT8 = ((value) & 0xff);
                return;
            case "cycles":
                this.cycles = ((value) >>> 0);
                return;
            case "m_af":
            case "m_af.w":
                this.m_af.w = value;
                return;
            case "m_af.b.h":
                this.m_af.b.h = value;
                return;
            case "m_af.b.l":
                this.m_af.b.l = value;
                return;
            case "m_af2":
            case "m_af2.w":
                this.m_af2.w = value;
                return;
            case "m_af2.b.h":
                this.m_af2.b.h = value;
                return;
            case "m_af2.b.l":
                this.m_af2.b.l = value;
                return;
            case "m_bc":
            case "m_bc.w":
                this.m_bc.w = value;
                return;
            case "m_bc.b.h":
                this.m_bc.b.h = value;
                return;
            case "m_bc.b.l":
                this.m_bc.b.l = value;
                return;
            case "m_bc2":
            case "m_bc2.w":
                this.m_bc2.w = value;
                return;
            case "m_bc2.b.h":
                this.m_bc2.b.h = value;
                return;
            case "m_bc2.b.l":
                this.m_bc2.b.l = value;
                return;
            case "m_busack_state":
                this.m_busack_state = ((value) & 0xff);
                return;
            case "m_busreq_state":
                this.m_busreq_state = ((value) >>> 0);
                return;
            case "m_de":
            case "m_de.w":
                this.m_de.w = value;
                return;
            case "m_de.b.h":
                this.m_de.b.h = value;
                return;
            case "m_de.b.l":
                this.m_de.b.l = value;
                return;
            case "m_de2":
            case "m_de2.w":
                this.m_de2.w = value;
                return;
            case "m_de2.b.h":
                this.m_de2.b.h = value;
                return;
            case "m_de2.b.l":
                this.m_de2.b.l = value;
                return;
            case "m_ea":
                this.m_ea = ((value) & 0xffff);
                return;
            case "m_f.s_val":
                this.m_f.s_val = ((value) & 0xff);
                return;
            case "m_f.z_val":
                this.m_f.z_val = ((value) & 0xff);
                return;
            case "m_f.yx_val":
                this.m_f.yx_val = ((value) & 0xff);
                return;
            case "m_f.h_val":
                this.m_f.h_val = ((value) & 0xff);
                return;
            case "m_f.pv_val":
                this.m_f.pv_val = ((value) & 0xff);
                return;
            case "m_f.n":
                this.m_f.n = ((value) ? 1 : 0);
                return;
            case "m_f.c":
                this.m_f.c = ((value) ? 1 : 0);
                return;
            case "m_f.q":
                this.m_f.q = ((value) & 0xff);
                return;
            case "m_f.qtemp":
                this.m_f.qtemp = ((value) & 0xff);
                return;
            case "m_halt":
                this.m_halt = ((value) & 0xff);
                return;
            case "m_hl":
            case "m_hl.w":
                this.m_hl.w = value;
                return;
            case "m_hl.b.h":
                this.m_hl.b.h = value;
                return;
            case "m_hl.b.l":
                this.m_hl.b.l = value;
                return;
            case "m_hl2":
            case "m_hl2.w":
                this.m_hl2.w = value;
                return;
            case "m_hl2.b.h":
                this.m_hl2.b.h = value;
                return;
            case "m_hl2.b.l":
                this.m_hl2.b.l = value;
                return;
            case "m_i":
                this.m_i = ((value) & 0xff);
                return;
            case "m_icount":
                this.m_icount = ((value) >>> 0);
                return;
            case "m_iff1":
                this.m_iff1 = ((value) ? 1 : 0);
                return;
            case "m_iff2":
                this.m_iff2 = ((value) ? 1 : 0);
                return;
            case "m_im":
                this.m_im = ((value) & 0xff);
                return;
            case "m_iorq_cycles":
                this.m_iorq_cycles = ((value) & 0xff);
                return;
            case "m_irq_state":
                this.m_irq_state = ((value) & 0xff);
                return;
            case "m_ix":
            case "m_ix.w":
                this.m_ix.w = value;
                return;
            case "m_ix.b.h":
                this.m_ix.b.h = value;
                return;
            case "m_ix.b.l":
                this.m_ix.b.l = value;
                return;
            case "m_iy":
            case "m_iy.w":
                this.m_iy.w = value;
                return;
            case "m_iy.b.h":
                this.m_iy.b.h = value;
                return;
            case "m_iy.b.l":
                this.m_iy.b.l = value;
                return;
            case "m_m1_cycles":
                this.m_m1_cycles = ((value) & 0xff);
                return;
            case "m_mreq_cycles":
                this.m_mreq_cycles = ((value) & 0xff);
                return;
            case "m_nmi_state":
                this.m_nmi_state = ((value) & 0xff);
                return;
            case "m_pc":
            case "m_pc.w":
                this.m_pc.w = value;
                return;
            case "m_pc.b.h":
                this.m_pc.b.h = value;
                return;
            case "m_pc.b.l":
                this.m_pc.b.l = value;
                return;
            case "m_prvpc":
            case "m_prvpc.w":
                this.m_prvpc.w = value;
                return;
            case "m_prvpc.b.h":
                this.m_prvpc.b.h = value;
                return;
            case "m_prvpc.b.l":
                this.m_prvpc.b.l = value;
                return;
            case "m_r":
                this.m_r = ((value) & 0xff);
                return;
            case "m_r2":
                this.m_r2 = ((value) & 0xff);
                return;
            case "m_ref":
                this.m_ref = ((value) >>> 0);
                return;
            case "m_rtemp":
                this.m_rtemp = ((value) & 0xff);
                return;
            case "m_service_attention":
                this.m_service_attention = ((value) & 0xff);
                return;
            case "m_shared_data":
            case "m_shared_data.w":
                this.m_shared_data.w = value;
                return;
            case "m_shared_data.b.h":
                this.m_shared_data.b.h = value;
                return;
            case "m_shared_data.b.l":
                this.m_shared_data.b.l = value;
                return;
            case "m_shared_data2":
            case "m_shared_data2.w":
                this.m_shared_data2.w = value;
                return;
            case "m_shared_data2.b.h":
                this.m_shared_data2.b.h = value;
                return;
            case "m_shared_data2.b.l":
                this.m_shared_data2.b.l = value;
                return;
            case "m_sp":
            case "m_sp.w":
                this.m_sp.w = value;
                return;
            case "m_sp.b.h":
                this.m_sp.b.h = value;
                return;
            case "m_sp.b.l":
                this.m_sp.b.l = value;
                return;
            case "m_tmp_irq_vector":
                this.m_tmp_irq_vector = ((value) >>> 0);
                return;
            case "m_wait_state":
                this.m_wait_state = ((value) >>> 0);
                return;
            case "m_wz":
            case "m_wz.w":
                this.m_wz.w = value;
                return;
            case "m_wz.b.h":
                this.m_wz.b.h = value;
                return;
            case "m_wz.b.l":
                this.m_wz.b.l = value;
                return;
            default: return;
        }
    }
    hasMethod(name) {
        return GENERATED_METHOD_NAMES.has(name);
    }
    methodNames() {
        return [...GENERATED_METHOD_NAMES];
    }
    invoke(name, ...args) {
        switch (name) {
            case "get_f": return this.method_get_f();
            case "set_f": return this.method_set_f(args[0] ?? 0);
            case "halt": return this.method_halt();
            case "leave_halt": return this.method_leave_halt();
            case "data_read": return this.method_data_read(args[0] ?? 0);
            case "data_write": return this.method_data_write(args[0] ?? 0, args[1] ?? 0);
            case "opcode_read": return this.method_opcode_read();
            case "arg_read": return this.method_arg_read();
            case "inc": return this.method_inc(args[0] ?? 0);
            case "dec": return this.method_dec(args[0] ?? 0);
            case "rlca": return this.method_rlca();
            case "rrca": return this.method_rrca();
            case "rla": return this.method_rla();
            case "rra": return this.method_rra();
            case "add_a": return this.method_add_a(args[0] ?? 0);
            case "adc_a": return this.method_adc_a(args[0] ?? 0);
            case "sub_a": return this.method_sub_a(args[0] ?? 0);
            case "sbc_a": return this.method_sbc_a(args[0] ?? 0);
            case "neg": return this.method_neg();
            case "daa": return this.method_daa();
            case "and_a": return this.method_and_a(args[0] ?? 0);
            case "or_a": return this.method_or_a(args[0] ?? 0);
            case "xor_a": return this.method_xor_a(args[0] ?? 0);
            case "cp": return this.method_cp(args[0] ?? 0);
            case "exx": return this.method_exx();
            case "rlc": return this.method_rlc(args[0] ?? 0);
            case "rrc": return this.method_rrc(args[0] ?? 0);
            case "rl": return this.method_rl(args[0] ?? 0);
            case "rr": return this.method_rr(args[0] ?? 0);
            case "sla": return this.method_sla(args[0] ?? 0);
            case "sra": return this.method_sra(args[0] ?? 0);
            case "sll": return this.method_sll(args[0] ?? 0);
            case "srl": return this.method_srl(args[0] ?? 0);
            case "bit": return this.method_bit(args[0] ?? 0, args[1] ?? 0);
            case "bit_hl": return this.method_bit_hl(args[0] ?? 0, args[1] ?? 0);
            case "bit_xy": return this.method_bit_xy(args[0] ?? 0, args[1] ?? 0);
            case "res": return this.method_res(args[0] ?? 0, args[1] ?? 0);
            case "set": return this.method_set(args[0] ?? 0, args[1] ?? 0);
            case "block_io_interrupted_flags": return this.method_block_io_interrupted_flags();
            case "ei": return this.method_ei();
            case "illegal_1": return this.method_illegal_1();
            case "illegal_2": return this.method_illegal_2();
            case "m_f.s": return this.method_m_f_s();
            case "m_f.z": return this.method_m_f_z();
            case "m_f.yx": return this.method_m_f_yx();
            case "m_f.h": return this.method_m_f_h();
            case "m_f.pv": return this.method_m_f_pv();
            case "z80_set_m1_cycles": return this.method_z80_set_m1_cycles(args[0] ?? 0);
            case "z80_set_mreq_cycles": return this.method_z80_set_mreq_cycles(args[0] ?? 0);
            case "z80_set_iorq_cycles": return this.method_z80_set_iorq_cycles(args[0] ?? 0);
            case "irqack_cb": return this.method_irqack_cb();
            case "refresh_cb": return this.method_refresh_cb();
            case "nomreq_cb": return this.method_nomreq_cb();
            case "halt_cb": return this.method_halt_cb();
            case "busack_cb": return this.method_busack_cb();
            case "halt_r": return this.method_halt_r();
            case "busack_r": return this.method_busack_r();
            case "device_pre_save": return this.method_device_pre_save();
            case "device_post_load": return this.method_device_post_load();
            case "cpu_is_interruptible": return this.method_cpu_is_interruptible();
            case "execute_min_cycles": return this.method_execute_min_cycles();
            case "execute_max_cycles": return this.method_execute_max_cycles();
            case "execute_default_irq_vector": return this.method_execute_default_irq_vector(args[0] ?? 0);
            case "execute_input_edge_triggered": return this.method_execute_input_edge_triggered(args[0] ?? 0);
            case "set_service_attention": return this.method_set_service_attention(args[0] ?? 0, args[1] ?? 0);
            case "get_service_attention": return this.method_get_service_attention(args[0] ?? 0);
            case "stack_read": return this.method_stack_read(args[0] ?? 0);
            case "stack_write": return this.method_stack_write(args[0] ?? 0, args[1] ?? 0);
            default: throw new Error('Z80 has no generated method "' + name + '"');
        }
    }
    generatedStart() {
        this.PRVPC = ((0) & 0xffff);
        this.PC = ((0) & 0xffff);
        this.SP = ((0) & 0xffff);
        this.AF = ((0) & 0xffff);
        this.method_set_f(0);
        this.Q = ((0) & 0xff);
        this.QT = ((0) & 0xff);
        this.BC = ((0) & 0xffff);
        this.DE = ((0) & 0xffff);
        this.HL = ((0) & 0xffff);
        this.IX = ((0) & 0xffff);
        this.IY = ((0) & 0xffff);
        this.WZ = ((0) & 0xffff);
        this.m_af2.w = ((0) & 0xffff);
        this.m_bc2.w = ((0) & 0xffff);
        this.m_de2.w = ((0) & 0xffff);
        this.m_hl2.w = ((0) & 0xffff);
        this.R = ((0) & 0xff);
        this.R2 = ((0) & 0xff);
        this.m_iff1 = ((0) ? 1 : 0);
        this.m_iff2 = ((0) ? 1 : 0);
        this.m_halt = ((0) & 0xff);
        this.m_im = ((0) & 0xff);
        this.m_i = ((0) & 0xff);
        this.m_nmi_state = ((0) & 0xff);
        this.m_irq_state = ((0) & 0xff);
        this.m_wait_state = ((0) >>> 0);
        this.m_busreq_state = ((0) >>> 0);
        this.m_busack_state = ((0) & 0xff);
        this.m_ea = ((0) & 0xffff);
        this.m_service_attention = ((0) & 0xff);
        this.m_rtemp = ((0) & 0xff);
        this.IX = (((this.IY = ((65535) & 0xffff))) & 0xffff);
        this.m_f.z_val = ((0) & 0xff);
    }
    generatedInput(inputnum, state) {
        switch (inputnum) {
            case 2:
                {
                    if ((((((Number(this.m_busreq_state) === Number(0)) ? 1 : 0)) && (((Number(state) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        this.method_set_service_attention(0, 1);
                    }
                    this.m_busreq_state = ((state) >>> 0);
                    break;
                }
            case -1:
                {
                    if (((((((((Number(this.m_nmi_state) === Number(0)) ? 1 : 0)) && (((Number(state) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (1)) ? 1 : 0)) {
                        this.method_set_service_attention(1, 1);
                    }
                    this.m_nmi_state = ((state) & 0xff);
                    break;
                }
            case 0:
                {
                    this.m_irq_state = ((state) & 0xff);
                    if (0) {
                        this.m_irq_state = ((((((Number(0) === Number(1)) ? 1 : 0)) ? (1) : (this.m_irq_state))) & 0xff);
                    }
                    if (((Number(this.m_irq_state) !== Number(0)) ? 1 : 0)) {
                        this.method_set_service_attention(2, 1);
                    }
                    else {
                        this.method_set_service_attention(2, 0);
                    }
                    break;
                }
            case 1:
                {
                    this.m_wait_state = ((state) >>> 0);
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    generatedService() {
        if (((Number(this.m_icount) <= Number(0)) ? 1 : 0)) {
            this.m_ref = ((16776960) >>> 0);
            return;
        }
        if (this.m_service_attention) {
            if (this.m_busreq_state) {
                if (((this.m_busack_state) ? 0 : 1)) {
                    this.m_busack_state = ((1) & 0xff);
                    (this.bus.signal?.("busack_cb", 1) ?? 0);
                }
                if (((Number(this.m_icount) > Number(0)) ? 1 : 0)) {
                    this.m_icount = ((0) >>> 0);
                }
                this.m_ref = ((16776960) >>> 0);
                return;
            }
            else {
                this.method_set_service_attention(0, 0);
                if (this.m_busack_state) {
                    this.m_busack_state = ((0) & 0xff);
                    (this.bus.signal?.("busack_cb", 0) ?? 0);
                }
            }
            if (this.method_get_service_attention(1)) {
                this.method_leave_halt();
                if (0) {
                    if (this.method_get_service_attention(5)) {
                        this.m_f.pv_val = ((((0) ? 0 : 1)) & 0xff);
                    }
                }
                this.m_iff1 = ((0) ? 1 : 0);
                this.m_r = ((((this.m_r) + (1))) & 0xff);
                this.cycles = ((((this.cycles) + (5))) >>> 0);
                this.SP = ((((this.SP) - (1))) & 0xffff);
                this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                this.SP = ((((this.SP) - (1))) & 0xffff);
                this.method_stack_write(this.SP, this.PC);
                this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                this.PC = ((102) & 0xffff);
                this.WZ = ((this.PC) & 0xffff);
                this.method_set_service_attention(1, 0);
            }
            else {
                if (((((((((Number(this.m_irq_state) !== Number(0)) ? 1 : 0)) && (this.m_iff1)) ? 1 : 0)) && (((this.method_get_service_attention(4)) ? 0 : 1))) ? 1 : 0)) {
                    this.method_leave_halt();
                    this.m_iff1 = (((this.m_iff2 = ((0) ? 1 : 0))) ? 1 : 0);
                    (this.bus.signal?.('irqack_cb', 1) ?? 0);
                    this.m_r = ((((this.m_r) + (1))) & 0xff);
                    let intf = 0;
                    if (((Number(intf) !== Number(0)) ? 1 : 0)) {
                        this.m_tmp_irq_vector = ((0) >>> 0);
                        if (0) {
                            0;
                        }
                    }
                    else {
                        this.m_tmp_irq_vector = ((this.acknowledgeIrq(0)) >>> 0);
                    }
                    0;
                    this.cycles = ((((this.cycles) + (2))) >>> 0);
                    if (((Number(this.m_im) === Number(2)) ? 1 : 0)) {
                        this.cycles = ((((this.cycles) + (5))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.SP = ((((this.SP) - (1))) & 0xffff);
                        this.method_stack_write(this.SP, this.PC);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.m_tmp_irq_vector = ((((((this.m_tmp_irq_vector) & (255))) | (((this.m_i) << (8))))) >>> 0);
                        this.TDAT_L = ((this.method_data_read(this.m_tmp_irq_vector)) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.TDAT_H = ((this.method_data_read(((this.m_tmp_irq_vector) + (1)))) & 0xff);
                        this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                        this.PC = ((this.TDAT) & 0xffff);
                        0;
                    }
                    else {
                        if (((Number(this.m_im) === Number(1)) ? 1 : 0)) {
                            0;
                            this.cycles = ((((this.cycles) + (5))) >>> 0);
                            this.SP = ((((this.SP) - (1))) & 0xffff);
                            this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                            this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                            this.SP = ((((this.SP) - (1))) & 0xffff);
                            this.method_stack_write(this.SP, this.PC);
                            this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                            this.PC = ((56) & 0xffff);
                        }
                        else {
                            0;
                            if (((Number(this.m_tmp_irq_vector) !== Number(0)) ? 1 : 0)) {
                                if (((Number(((this.m_tmp_irq_vector) & (16711680))) === Number(13434880)) ? 1 : 0)) {
                                    this.cycles = ((((this.cycles) + (11))) >>> 0);
                                    this.SP = ((((this.SP) - (1))) & 0xffff);
                                    this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                                    this.SP = ((((this.SP) - (1))) & 0xffff);
                                    this.method_stack_write(this.SP, this.PC);
                                    this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                                    this.PC = ((((this.m_tmp_irq_vector) & (65535))) & 0xffff);
                                }
                                else {
                                    if (((Number(((this.m_tmp_irq_vector) & (16711680))) === Number(12779520)) ? 1 : 0)) {
                                        this.cycles = ((((this.cycles) + (10))) >>> 0);
                                        this.PC = ((((this.m_tmp_irq_vector) & (65535))) & 0xffff);
                                    }
                                    else {
                                        if (((Number(((this.m_tmp_irq_vector) & (199))) === Number(199)) ? 1 : 0)) {
                                            this.cycles = ((((this.cycles) + (5))) >>> 0);
                                            this.SP = ((((this.SP) - (1))) & 0xffff);
                                            this.method_stack_write(this.SP, ((this.PC) >>> (8)));
                                            this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                                            this.SP = ((((this.SP) - (1))) & 0xffff);
                                            this.method_stack_write(this.SP, this.PC);
                                            this.cycles = ((((this.cycles) + (this.m_mreq_cycles))) >>> 0);
                                            this.PC = ((((this.m_tmp_irq_vector) & (56))) & 0xffff);
                                        }
                                        else {
                                            if (((Number(this.m_tmp_irq_vector) === Number(251)) ? 1 : 0)) {
                                                this.cycles = ((((this.cycles) + (4))) >>> 0);
                                                this.method_ei();
                                            }
                                            else {
                                                0;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.WZ = ((this.PC) & 0xffff);
                    if (0) {
                        if (this.method_get_service_attention(5)) {
                            this.m_f.pv_val = ((((0) ? 0 : 1)) & 0xff);
                        }
                    }
                }
            }
            this.method_set_service_attention(4, 0);
            if (0) {
                this.method_set_service_attention(5, 0);
            }
            if (this.m_halt) {
                0;
                this.TDAT8 = ((this.method_opcode_read()) & 0xff);
                this.cycles = ((((this.cycles) + (((this.m_m1_cycles) - (2))))) >>> 0);
                if (1) {
                    (this.bus.signal?.("refresh_cb", ((((((this.I) << (8))) | (((this.R2) & (128))))) | (((this.R) & (127))))) ?? 0);
                }
                this.cycles = ((((this.cycles) + (2))) >>> 0);
                this.PC = ((((this.PC) + (1))) & 0xffff);
                this.R = ((((this.R) + (1))) & 0xff);
                this.Q = ((this.QT) & 0xff);
                this.QT = ((40) & 0xff);
                this.PC = ((((this.PC) - (1))) & 0xffff);
                return;
            }
        }
    }
    generatedFetch() {
        this.PRVPC = ((this.PC) & 0xffff);
        0;
        this.TDAT8 = ((this.method_opcode_read()) & 0xff);
        this.cycles = ((((this.cycles) + (((this.m_m1_cycles) - (2))))) >>> 0);
        if (1) {
            (this.bus.signal?.("refresh_cb", ((((((this.I) << (8))) | (((this.R2) & (128))))) | (((this.R) & (127))))) ?? 0);
        }
        this.cycles = ((((this.cycles) + (2))) >>> 0);
        this.PC = ((((this.PC) + (1))) & 0xffff);
        this.R = ((((this.R) + (1))) & 0xff);
        this.Q = ((this.QT) & 0xff);
        this.QT = ((40) & 0xff);
        this.m_ref = ((((((0) << (16))) | (((this.TDAT8) << (8))))) >>> 0);
    }
    method_get_f() {
        let f = ((0) & 0xff);
        f = ((((f) | (this.method_m_f_s()))) & 0xff);
        f = ((((f) | (this.method_m_f_z()))) & 0xff);
        f = ((((f) | (this.method_m_f_yx()))) & 0xff);
        f = ((((f) | (this.method_m_f_h()))) & 0xff);
        f = ((((f) | (this.method_m_f_pv()))) & 0xff);
        f = ((((f) | (((this.m_f.n) ? (2) : (0))))) & 0xff);
        f = ((((f) | (((this.m_f.c) ? (1) : (0))))) & 0xff);
        return f;
        return 0;
    }
    method_set_f(f = 0) {
        this.m_f.s_val = ((f) & 0xff);
        this.m_f.z_val = ((((((f) & (64))) ? 0 : 1)) & 0xff);
        this.m_f.yx_val = ((f) & 0xff);
        this.m_f.h_val = ((f) & 0xff);
        this.m_f.pv_val = ((((((f) & (4))) ? 0 : 1)) & 0xff);
        this.m_f.n = ((((f) & (2))) ? 1 : 0);
        this.m_f.c = ((((f) & (1))) ? 1 : 0);
        return 0;
    }
    method_halt() {
        if (((this.m_halt) ? 0 : 1)) {
            this.m_halt = ((1) & 0xff);
            this.method_set_service_attention(3, 1);
            (this.bus.signal?.("halt_cb", 1) ?? 0);
        }
        return 0;
    }
    method_leave_halt() {
        if (this.m_halt) {
            this.m_halt = ((0) & 0xff);
            this.method_set_service_attention(3, 0);
            (this.bus.signal?.("halt_cb", 0) ?? 0);
        }
        return 0;
    }
    method_data_read(addr = 0) {
        return (this.readMemory((addr) & 0xffff) & 0xff);
        return 0;
    }
    method_data_write(addr = 0, value = 0) {
        (this.writeMemory((addr) & 0xffff, (value) & 0xff), 0);
        return 0;
    }
    method_opcode_read() {
        return ((this.bus.readOpcode?.((this.PC) & 0xffff) ?? this.readMemory((this.PC) & 0xffff)) & 0xff);
        return 0;
    }
    method_arg_read() {
        return (this.readMemory((this.PC) & 0xffff) & 0xff);
        return 0;
    }
    method_inc(r = 0) {
        r = ((((r) + (1))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.yx_val = ((r) & 0xff))) & 0xff))) & 0xff);
        this.m_f.pv_val = ((((Number(r) !== Number(128)) ? 1 : 0)) & 0xff);
        this.m_f.h_val = ((((((Number(((r) & (15))) === Number(0)) ? 1 : 0)) ? (16) : (0))) & 0xff);
        this.m_f.n = ((0) ? 1 : 0);
        return r;
    }
    method_dec(r = 0) {
        r = ((((r) - (1))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.yx_val = ((r) & 0xff))) & 0xff))) & 0xff);
        this.m_f.pv_val = ((((Number(r) !== Number(127)) ? 1 : 0)) & 0xff);
        this.m_f.h_val = ((((((Number(((r) & (15))) === Number(15)) ? 1 : 0)) ? (16) : (0))) & 0xff);
        this.m_f.n = ((1) ? 1 : 0);
        return r;
    }
    method_rlca() {
        this.A = ((((((this.A) << (1))) | (((this.A) >>> (7))))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.yx_val = ((this.A) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((this.A) & (1))) ? 1 : 0);
        return 0;
    }
    method_rrca() {
        let a0 = ((this.A) & 0xff);
        this.A = ((((((a0) >>> (1))) | (((a0) << (7))))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.yx_val = ((this.A) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((a0) & (1))) ? 1 : 0);
        return 0;
    }
    method_rla() {
        let res = ((((((this.A) << (1))) + (this.m_f.c))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.yx_val = ((res) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((this.A) & (128))) ? 1 : 0);
        this.A = ((res) & 0xff);
        return 0;
    }
    method_rra() {
        let res = ((((((this.m_f.c) << (7))) | (((this.A) >>> (1))))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.yx_val = ((res) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((this.A) & (1))) ? 1 : 0);
        this.A = ((res) & 0xff);
        return 0;
    }
    method_add_a(value = 0) {
        let res = ((((this.A) + (value))) & 0xffff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff);
        this.m_f.c = ((((res) & (256))) ? 1 : 0);
        this.m_f.h_val = ((((((this.A) & (15))) + (((value) & (15))))) & 0xff);
        this.m_f.pv_val = ((((((((((this.A) ^ (res))) & (((value) ^ (res))))) & (128))) ? 0 : 1)) & 0xff);
        this.m_f.n = ((0) ? 1 : 0);
        this.A = ((res) & 0xff);
        return 0;
    }
    method_adc_a(value = 0) {
        let c = ((this.m_f.c) | 0);
        let res = ((((((this.A) + (value))) + (c))) & 0xffff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff);
        this.m_f.c = ((((res) & (256))) ? 1 : 0);
        this.m_f.h_val = ((((((((this.A) & (15))) + (((value) & (15))))) + (c))) & 0xff);
        this.m_f.pv_val = ((((((((((this.A) ^ (res))) & (((value) ^ (res))))) & (128))) ? 0 : 1)) & 0xff);
        this.m_f.n = ((0) ? 1 : 0);
        this.A = ((res) & 0xff);
        return 0;
    }
    method_sub_a(value = 0) {
        let res = ((((this.A) - (value))) & 0xffff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff);
        this.m_f.c = ((((res) & (256))) ? 1 : 0);
        this.m_f.h_val = ((((((this.A) & (15))) - (((value) & (15))))) & 0xff);
        this.m_f.pv_val = ((((((((((this.A) ^ (value))) & (((this.A) ^ (res))))) & (128))) ? 0 : 1)) & 0xff);
        this.m_f.n = ((1) ? 1 : 0);
        this.A = ((res) & 0xff);
        return 0;
    }
    method_sbc_a(value = 0) {
        let c = ((this.m_f.c) | 0);
        let res = ((((((this.A) - (value))) - (c))) & 0xffff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff);
        this.m_f.c = ((((res) & (256))) ? 1 : 0);
        this.m_f.h_val = ((((((((this.A) & (15))) - (((value) & (15))))) - (c))) & 0xff);
        this.m_f.pv_val = ((((((((((this.A) ^ (value))) & (((this.A) ^ (res))))) & (128))) ? 0 : 1)) & 0xff);
        this.m_f.n = ((1) ? 1 : 0);
        this.A = ((res) & 0xff);
        return 0;
    }
    method_neg() {
        let value = ((this.A) & 0xff);
        this.A = ((0) & 0xff);
        this.method_sub_a(value);
        return 0;
    }
    method_daa() {
        let a = ((this.A) & 0xff);
        if (this.m_f.n) {
            if ((((this.method_m_f_h()) || (((Number(((this.A) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
                a = ((((a) - (6))) & 0xff);
            }
            if ((((this.m_f.c) || (((Number(this.A) > Number(153)) ? 1 : 0))) ? 1 : 0)) {
                a = ((((a) - (96))) & 0xff);
            }
        }
        else {
            if ((((this.method_m_f_h()) || (((Number(((this.A) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
                a = ((((a) + (6))) & 0xff);
            }
            if ((((this.m_f.c) || (((Number(this.A) > Number(153)) ? 1 : 0))) ? 1 : 0)) {
                a = ((((a) + (96))) & 0xff);
            }
        }
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((a) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = ((((this.A) ^ (a))) & 0xff);
        this.m_f.c = (((((this.m_f.c) || (((Number(this.A) > Number(153)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        this.A = ((a) & 0xff);
        return 0;
    }
    method_and_a(value = 0) {
        this.A = ((((this.A) & (value))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((this.A) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.n = (((this.m_f.c = ((0) ? 1 : 0))) ? 1 : 0);
        this.m_f.h_val = ((16) & 0xff);
        return 0;
    }
    method_or_a(value = 0) {
        this.A = ((((this.A) | (value))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((this.A) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = (((this.m_f.c = ((0) ? 1 : 0))) ? 1 : 0))) & 0xff);
        return 0;
    }
    method_xor_a(value = 0) {
        this.A = ((((this.A) ^ (value))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((this.A) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = (((this.m_f.c = ((0) ? 1 : 0))) ? 1 : 0))) & 0xff);
        return 0;
    }
    method_cp(value = 0) {
        let res = ((((this.A) - (value))) & 0xffff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = ((res) & 0xff))) & 0xff);
        this.m_f.yx_val = ((value) & 0xff);
        this.m_f.c = ((((res) & (256))) ? 1 : 0);
        this.m_f.h_val = ((((((this.A) & (15))) - (((value) & (15))))) & 0xff);
        this.m_f.pv_val = ((((((((((this.A) ^ (value))) & (((this.A) ^ (res))))) & (128))) ? 0 : 1)) & 0xff);
        this.m_f.n = ((1) ? 1 : 0);
        return 0;
    }
    method_exx() {
        {
            const swapValue = this.m_bc.w;
            this.m_bc.w = ((this.m_bc2.w) & 0xffff);
            this.m_bc2.w = ((swapValue) & 0xffff);
        }
        {
            const swapValue = this.m_de.w;
            this.m_de.w = ((this.m_de2.w) & 0xffff);
            this.m_de2.w = ((swapValue) & 0xffff);
        }
        {
            const swapValue = this.m_hl.w;
            this.m_hl.w = ((this.m_hl2.w) & 0xffff);
            this.m_hl2.w = ((swapValue) & 0xffff);
        }
        return 0;
    }
    method_rlc(value = 0) {
        let res = ((((((((value) << (1))) | (((value) >>> (7))))) & (255))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((value) & (128))) ? 1 : 0);
        return res;
        return 0;
    }
    method_rrc(value = 0) {
        let res = ((((((((value) >>> (1))) | (((value) << (7))))) & (255))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((value) & (1))) ? 1 : 0);
        return res;
        return 0;
    }
    method_rl(value = 0) {
        let res = ((((((((value) << (1))) + (this.m_f.c))) & (255))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((value) & (128))) ? 1 : 0);
        return res;
        return 0;
    }
    method_rr(value = 0) {
        let res = ((((((((value) >>> (1))) | (((this.m_f.c) << (7))))) & (255))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((value) & (1))) ? 1 : 0);
        return res;
        return 0;
    }
    method_sla(value = 0) {
        let res = ((((((value) << (1))) & (255))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((value) & (128))) ? 1 : 0);
        return res;
        return 0;
    }
    method_sra(value = 0) {
        let res = ((((((((value) >>> (1))) | (((value) & (128))))) & (255))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((value) & (1))) ? 1 : 0);
        return res;
        return 0;
    }
    method_sll(value = 0) {
        let res = ((((((((value) << (1))) | (1))) & (255))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((value) & (128))) ? 1 : 0);
        return res;
        return 0;
    }
    method_srl(value = 0) {
        let res = ((((((value) >>> (1))) & (255))) & 0xff);
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = (((this.m_f.yx_val = ((res) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = (((this.m_f.n = ((0) ? 1 : 0))) & 0xff);
        this.m_f.c = ((((value) & (1))) ? 1 : 0);
        return res;
        return 0;
    }
    method_bit(bit = 0, value = 0) {
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((((value) & (((1) << (bit))))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = ((16) & 0xff);
        this.m_f.n = ((0) ? 1 : 0);
        this.m_f.yx_val = ((value) & 0xff);
        return 0;
    }
    method_bit_hl(bit = 0, value = 0) {
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((((value) & (((1) << (bit))))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = ((16) & 0xff);
        this.m_f.n = ((0) ? 1 : 0);
        this.m_f.yx_val = ((this.WZ_H) & 0xff);
        return 0;
    }
    method_bit_xy(bit = 0, value = 0) {
        this.QT = ((0) & 0xff);
        this.m_f.s_val = (((this.m_f.z_val = (((this.m_f.pv_val = ((((value) & (((1) << (bit))))) & 0xff))) & 0xff))) & 0xff);
        this.m_f.h_val = ((16) & 0xff);
        this.m_f.n = ((0) ? 1 : 0);
        this.m_f.yx_val = ((((this.m_ea) >>> (8))) & 0xff);
        return 0;
    }
    method_res(bit = 0, value = 0) {
        return ((value) & ((~((1) << (bit)))));
        return 0;
    }
    method_set(bit = 0, value = 0) {
        return ((value) | (((1) << (bit))));
        return 0;
    }
    method_block_io_interrupted_flags() {
        this.m_f.yx_val = ((((this.PC) >>> (8))) & 0xff);
        let pv_old = ((this.method_m_f_pv()) & 0xff);
        if (this.m_f.c) {
            this.m_f.h_val = ((0) & 0xff);
            if (((this.TDAT8) & (128))) {
                this.m_f.pv_val = ((((((this.B) - (1))) & (7))) & 0xff);
                if (((Number(((this.B) & (15))) === Number(0)) ? 1 : 0)) {
                    this.m_f.h_val = ((16) & 0xff);
                }
            }
            else {
                this.m_f.pv_val = ((((((this.B) + (1))) & (7))) & 0xff);
                if (((Number(((this.B) & (15))) === Number(15)) ? 1 : 0)) {
                    this.m_f.h_val = ((16) & 0xff);
                }
            }
        }
        else {
            this.m_f.pv_val = ((((this.B) & (7))) & 0xff);
        }
        this.m_f.pv_val = ((((((pv_old) ^ (this.method_m_f_pv()))) & (4))) & 0xff);
        return 0;
    }
    method_ei() {
        this.m_iff1 = (((this.m_iff2 = ((1) ? 1 : 0))) ? 1 : 0);
        this.method_set_service_attention(4, 1);
        return 0;
    }
    method_illegal_1() {
        0;
        return 0;
    }
    method_illegal_2() {
        0;
        return 0;
    }
    method_m_f_s() {
        return ((this.m_f.s_val) & (128));
        return 0;
    }
    method_m_f_z() {
        return ((this.m_f.z_val) ? (0) : (64));
        return 0;
    }
    method_m_f_yx() {
        return ((this.m_f.yx_val) & (40));
        return 0;
    }
    method_m_f_h() {
        return ((this.m_f.h_val) & (16));
        return 0;
    }
    method_m_f_pv() {
        let val = ((this.m_f.pv_val) & 0xff);
        val = ((((val) ^ (((val) >>> (4))))) & 0xff);
        val = ((((val) ^ (((val) << (2))))) & 0xff);
        val = ((((val) ^ (((val) >>> (1))))) & 0xff);
        return (((~val)) & (4));
        return 0;
    }
    method_z80_set_m1_cycles(m1_cycles = 0) {
        this.m_m1_cycles = ((m1_cycles) & 0xff);
        return 0;
    }
    method_z80_set_mreq_cycles(mreq_cycles = 0) {
        this.m_mreq_cycles = ((mreq_cycles) & 0xff);
        return 0;
    }
    method_z80_set_iorq_cycles(iorq_cycles = 0) {
        this.m_iorq_cycles = ((iorq_cycles) & 0xff);
        return 0;
    }
    method_irqack_cb() {
        return 0;
        return 0;
    }
    method_refresh_cb() {
        return 0;
        return 0;
    }
    method_nomreq_cb() {
        return 0;
        return 0;
    }
    method_halt_cb() {
        return 0;
        return 0;
    }
    method_busack_cb() {
        return 0;
        return 0;
    }
    method_halt_r() {
        return this.m_halt;
        return 0;
    }
    method_busack_r() {
        return this.m_busack_state;
        return 0;
    }
    method_device_pre_save() {
        this.m_af.b.l = ((this.method_get_f()) & 0xff);
        return 0;
    }
    method_device_post_load() {
        this.method_set_f(this.m_af.b.l);
        return 0;
    }
    method_cpu_is_interruptible() {
        return 1;
        return 0;
    }
    method_execute_min_cycles() {
        return 1;
        return 0;
    }
    method_execute_max_cycles() {
        return 16;
        return 0;
    }
    method_execute_default_irq_vector(inputnum = 0) {
        return 255;
        return 0;
    }
    method_execute_input_edge_triggered(inputnum = 0) {
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
        return 0;
    }
    method_set_service_attention(Bit = 0, State = 0) {
        if (State) {
            this.m_service_attention = ((((this.m_service_attention) | (((1) << (Bit))))) & 0xff);
        }
        else {
            this.m_service_attention = ((((this.m_service_attention) & ((~((1) << (Bit)))))) & 0xff);
        }
        return 0;
    }
    method_get_service_attention(Bit = 0) {
        return ((this.m_service_attention) & (((1) << (Bit))));
        return 0;
    }
    method_stack_read(addr = 0) {
        return this.method_data_read(addr);
        return 0;
    }
    method_stack_write(addr = 0, value = 0) {
        return this.method_data_write(addr, value);
        return 0;
    }
}
export const cpu = {
    type: "Z80",
    summary: { "opcodes": 1536, "compiledOpcodes": 1536, "methods": 68, "compiledMethods": 68, "diagnostics": 0 },
    create: (bus) => new GeneratedZ80(bus),
};
export default cpu;
