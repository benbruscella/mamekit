function popcount32(value) {
    value -= (value >>> 1) & 0x55555555;
    value = (value & 0x33333333) + ((value >>> 2) & 0x33333333);
    return (((value + (value >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
}
class Pair16 {
    value = 0;
    b;
    constructor(value = 0) {
        this.value = value & 0xffff;
        const pair = this;
        this.b = Object.defineProperties({}, {
            h: {
                enumerable: true,
                get: () => (pair.value >>> 8) & 0xff,
                set: (next) => {
                    pair.value = ((pair.value & 0x00ff) | ((next & 0xff) << 8)) & 0xffff;
                },
            },
            l: {
                enumerable: true,
                get: () => pair.value & 0xff,
                set: (next) => {
                    pair.value = ((pair.value & 0xff00) | (next & 0xff)) & 0xffff;
                },
            },
        });
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
class GeneratedM6502 {
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
    m_PPC = ((0) & 0xffff);
    m_NPC = ((0) & 0xffff);
    m_PC = ((0) & 0xffff);
    m_SP = ((0) & 0xffff);
    m_TMP = ((0) & 0xffff);
    m_TMP2 = ((0) & 0xff);
    m_A = ((0) & 0xff);
    m_X = ((0) & 0xff);
    m_Y = ((0) & 0xff);
    m_P = ((0) & 0xff);
    m_IR = ((0) & 0xff);
    m_inst_state_base = 0;
    m_nmi_state = ((0) ? 1 : 0);
    m_irq_state = ((0) ? 1 : 0);
    m_apu_irq_state = ((0) ? 1 : 0);
    m_v_state = ((0) ? 1 : 0);
    m_nmi_pending = ((0) ? 1 : 0);
    m_irq_taken = ((0) ? 1 : 0);
    m_inhibit_interrupts = ((0) ? 1 : 0);
    m_ref = ((0) >>> 0);
    cycles = 0;
    m_icount = 0;
    constructor(bus) {
        this.bus = bus;
        this.generatedStart();
        this.reset();
    }
    reset() {
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
                throw new Error('M6502 dispatch loop exceeded 8');
            switch ((this.m_ref >>> 8) & 0xffff) {
                case 0x0000: {
                    if (this.m_irq_taken) {
                        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
                    }
                    else {
                        (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
                        this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
                    }
                    (++this.cycles, this.writeMemory((this.m_SP) & 65535, (((this.m_PC) >> (8))) & 0xff), 0);
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
                    }
                    else {
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
                    }
                    else {
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
                    (++this.cycles, this.writeMemory((this.m_SP) & 65535, (((this.m_PC) >> (8))) & 0xff), 0);
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
                    }
                    else {
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP);
                    return this.cycles;
                }
                case 0x6a00: {
                    (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
                    this.m_A = ((this.method_do_ror(this.m_A)) & 0xff);
                    return this.cycles;
                }
                case 0x6b00: {
                    this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
                    this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
                    this.m_A = ((((this.m_A) & (this.m_TMP))) & 0xff);
                    this.method_do_arr();
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.method_do_adc(this.m_TMP2);
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
                    this.m_TMP2 = ((((((this.m_A) & (this.m_X))) & (((((this.m_TMP) >> (8))) + (1))))) & 0xff);
                    if (this.method_page_changing(this.m_TMP, this.m_Y)) {
                        this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_Y)), this.m_TMP2)) & 0xffff);
                    }
                    else {
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
                    this.m_TMP2 = ((((((this.m_A) & (this.m_X))) & (((((this.m_TMP) >> (8))) + (1))))) & 0xff);
                    if (this.method_page_changing(this.m_TMP, this.m_Y)) {
                        this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_Y)), this.m_TMP2)) & 0xffff);
                    }
                    else {
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
                    this.m_TMP2 = ((((this.m_Y) & (((((this.m_TMP) >> (8))) + (1))))) & 0xff);
                    if (this.method_page_changing(this.m_TMP, this.m_X)) {
                        this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_X)), this.m_TMP2)) & 0xffff);
                    }
                    else {
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
                    this.m_TMP2 = ((((this.m_X) & (((((this.m_TMP) >> (8))) + (1))))) & 0xff);
                    if (this.method_page_changing(this.m_TMP, this.m_Y)) {
                        this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_Y)), this.m_TMP2)) & 0xffff);
                    }
                    else {
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
                    this.m_TMP2 = ((((((this.m_A) & (this.m_X))) & (((((this.m_TMP) >> (8))) + (1))))) & 0xff);
                    if (this.method_page_changing(this.m_TMP, this.m_Y)) {
                        this.m_TMP = ((this.method_set_h(((this.m_TMP) + (this.m_Y)), this.m_TMP2)) & 0xffff);
                    }
                    else {
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
                    }
                    else {
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP);
                    return this.cycles;
                }
                case 0xea00: {
                    (++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff);
                    return this.cycles;
                }
                case 0xeb00: {
                    this.m_TMP = (((++this.cycles, this.readMemory((this.m_PC) & 65535) & 0xff)) & 0xffff);
                    this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
                    this.method_do_sbc(this.m_TMP);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
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
                    this.method_do_sbc(this.m_TMP2);
                    return this.cycles;
                }
                default:
                    throw new Error('M6502 has no generated opcode ' +
                        (((this.m_ref >>> 8) & 0xffff).toString(16).padStart(4, '0')));
            }
        }
    }
    run(target) {
        let total = 0;
        while (total < target) {
            this.bus.timing?.(total, target);
            total += this.step();
        }
        this.bus.timing?.(target, target);
        return total;
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
    set(name, value) {
        switch (name) {
            case "m_PPC":
                this.m_PPC = ((value) & 0xffff);
                return;
            case "m_NPC":
                this.m_NPC = ((value) & 0xffff);
                return;
            case "m_PC":
                this.m_PC = ((value) & 0xffff);
                return;
            case "m_SP":
                this.m_SP = ((value) & 0xffff);
                return;
            case "m_TMP":
                this.m_TMP = ((value) & 0xffff);
                return;
            case "m_TMP2":
                this.m_TMP2 = ((value) & 0xff);
                return;
            case "m_A":
                this.m_A = ((value) & 0xff);
                return;
            case "m_X":
                this.m_X = ((value) & 0xff);
                return;
            case "m_Y":
                this.m_Y = ((value) & 0xff);
                return;
            case "m_P":
                this.m_P = ((value) & 0xff);
                return;
            case "m_IR":
                this.m_IR = ((value) & 0xff);
                return;
            case "m_inst_state_base":
                this.m_inst_state_base = value;
                return;
            case "m_nmi_state":
                this.m_nmi_state = ((value) ? 1 : 0);
                return;
            case "m_irq_state":
                this.m_irq_state = ((value) ? 1 : 0);
                return;
            case "m_apu_irq_state":
                this.m_apu_irq_state = ((value) ? 1 : 0);
                return;
            case "m_v_state":
                this.m_v_state = ((value) ? 1 : 0);
                return;
            case "m_nmi_pending":
                this.m_nmi_pending = ((value) ? 1 : 0);
                return;
            case "m_irq_taken":
                this.m_irq_taken = ((value) ? 1 : 0);
                return;
            case "m_inhibit_interrupts":
                this.m_inhibit_interrupts = ((value) ? 1 : 0);
                return;
            case "m_ref":
                this.m_ref = ((value) >>> 0);
                return;
            case "cycles":
                this.cycles = value;
                return;
            case "m_icount":
                this.m_icount = value;
                return;
            default: return;
        }
    }
    invoke(name, ...args) {
        switch (name) {
            case "do_adc": return this.method_do_adc(args[0] ?? 0);
            case "do_adc_d": return this.method_do_adc_d(args[0] ?? 0);
            case "do_adc_nd": return this.method_do_adc_nd(args[0] ?? 0);
            case "do_arr": return this.method_do_arr();
            case "do_arr_d": return this.method_do_arr_d();
            case "do_arr_nd": return this.method_do_arr_nd();
            case "do_sbc": return this.method_do_sbc(args[0] ?? 0);
            case "do_sbc_d": return this.method_do_sbc_d(args[0] ?? 0);
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
            default: throw new Error('M6502 has no generated method "' + name + '"');
        }
    }
    generatedStart() {
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
    generatedInput(inputnum, state) {
        if (((Number(inputnum) === Number(0)) ? 1 : 0)) {
            this.m_irq_state = ((((Number(state) === Number(1)) ? 1 : 0)) ? 1 : 0);
        }
        else {
            if (((Number(inputnum) === Number(-1)) ? 1 : 0)) {
                if ((((((this.m_nmi_state) ? 0 : 1)) && (((Number(state) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                    this.m_nmi_pending = ((1) ? 1 : 0);
                }
                this.m_nmi_state = ((((Number(state) === Number(1)) ? 1 : 0)) ? 1 : 0);
            }
        }
    }
    generatedService() {
    }
    generatedFetch() {
        this.m_NPC = ((this.m_PC) & 0xffff);
        if ((((this.m_nmi_pending) || ((((this.m_irq_state) && (((((this.m_P) & (4))) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
            this.m_irq_taken = ((1) ? 1 : 0);
            this.m_IR = ((0) & 0xff);
        }
        else {
            this.m_irq_taken = ((0) ? 1 : 0);
            this.m_IR = (((++this.cycles, this.readOpcode((this.m_PC) & 0xffff) & 0xff)) & 0xff);
            this.m_PC = ((((this.m_PC) + (1))) & 0xffff);
        }
        this.m_ref = ((((this.m_IR) << (16))) >>> 0);
    }
    method_do_adc(val = 0) {
        if (((this.m_P) & (8))) {
            this.method_do_adc_d(val);
        }
        else {
            this.method_do_adc_nd(val);
        }
        return 0;
    }
    method_do_adc_d(val = 0) {
        let c = ((((((this.m_P) & (1))) ? (1) : (0))) & 0xff);
        this.m_P = ((((this.m_P) & ((~((((((128) | (64))) | (2))) | (1)))))) & 0xff);
        let al = ((((((((this.m_A) & (15))) + (((val) & (15))))) + (c))) & 0xff);
        if (((Number(al) > Number(9)) ? 1 : 0)) {
            al = ((((al) + (6))) & 0xff);
        }
        let ah = ((((((((this.m_A) >> (4))) + (((val) >> (4))))) + (((Number(al) > Number(15)) ? 1 : 0)))) & 0xff);
        if (((((((((this.m_A) + (val))) + (c))) & 0xff)) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
            if (((ah) & (8))) {
                this.m_P = ((((this.m_P) | (128))) & 0xff);
            }
        }
        if ((((((~((this.m_A) ^ (val)))) & (((this.m_A) ^ (((ah) << (4))))))) & (128))) {
            this.m_P = ((((this.m_P) | (64))) & 0xff);
        }
        if (((Number(ah) > Number(9)) ? 1 : 0)) {
            ah = ((((ah) + (6))) & 0xff);
        }
        if (((Number(ah) > Number(15)) ? 1 : 0)) {
            this.m_P = ((((this.m_P) | (1))) & 0xff);
        }
        this.m_A = ((((((ah) << (4))) | (((al) & (15))))) & 0xff);
        return 0;
    }
    method_do_adc_nd(val = 0) {
        let sum = 0;
        sum = ((((((this.m_A) + (val))) + (((((this.m_P) & (1))) ? (1) : (0))))) & 0xffff);
        this.m_P = ((((this.m_P) & ((~((((((128) | (64))) | (2))) | (1)))))) & 0xff);
        if (((((sum) & 0xff)) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
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
    method_do_arr() {
        if (((this.m_P) & (8))) {
            this.method_do_arr_d();
        }
        else {
            this.method_do_arr_nd();
        }
        return 0;
    }
    method_do_arr_d() {
        let c = ((((this.m_P) & (1))) ? 1 : 0);
        this.m_P = ((((this.m_P) & ((~((((((128) | (2))) | (1))) | (64)))))) & 0xff);
        let a = ((((this.m_A) >> (1))) & 0xff);
        if (c) {
            a = ((((a) | (128))) & 0xff);
        }
        if (((a) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
            if (((Number((((a) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
                this.m_P = ((((this.m_P) | (128))) & 0xff);
            }
        }
        if (((((a) ^ (this.m_A))) & (64))) {
            this.m_P = ((((this.m_P) | (64))) & 0xff);
        }
        if (((Number(((this.m_A) & (15))) >= Number(5)) ? 1 : 0)) {
            a = ((((((((a) + (6))) & (15))) | (((a) & (240))))) & 0xff);
        }
        if (((Number(((this.m_A) & (240))) >= Number(80)) ? 1 : 0)) {
            a = ((((a) + (96))) & 0xff);
            this.m_P = ((((this.m_P) | (1))) & 0xff);
        }
        this.m_A = ((a) & 0xff);
        return 0;
    }
    method_do_arr_nd() {
        let c = ((((this.m_P) & (1))) ? 1 : 0);
        this.m_P = ((((this.m_P) & ((~((((((128) | (2))) | (1))) | (64)))))) & 0xff);
        this.m_A = ((((this.m_A) >> (1))) & 0xff);
        if (c) {
            this.m_A = ((((this.m_A) | (128))) & 0xff);
        }
        if (((this.m_A) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
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
    method_do_sbc(val = 0) {
        if (((this.m_P) & (8))) {
            this.method_do_sbc_d(val);
        }
        else {
            this.method_do_sbc_nd(val);
        }
        return 0;
    }
    method_do_sbc_d(val = 0) {
        let c = ((((((this.m_P) & (1))) ? (0) : (1))) & 0xff);
        this.m_P = ((((this.m_P) & ((~((((((128) | (64))) | (2))) | (1)))))) & 0xff);
        let diff = ((((((this.m_A) - (val))) - (c))) & 0xffff);
        let al = ((((((((this.m_A) & (15))) - (((val) & (15))))) - (c))) & 0xff);
        let ah = ((((((((this.m_A) >> (4))) - (((val) >> (4))))) - (((Number((((al) << 24) >> 24)) < Number(0)) ? 1 : 0)))) & 0xff);
        if (((((diff) & 0xff)) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
            if (((diff) & (128))) {
                this.m_P = ((((this.m_P) | (128))) & 0xff);
            }
        }
        if (((((((this.m_A) ^ (val))) & (((this.m_A) ^ (diff))))) & (128))) {
            this.m_P = ((((this.m_P) | (64))) & 0xff);
        }
        if (((((diff) & (65280))) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (1))) & 0xff);
        }
        if (((Number((((al) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
            al = ((((al) - (6))) & 0xff);
        }
        if (((Number((((ah) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
            ah = ((((ah) - (6))) & 0xff);
        }
        this.m_A = ((((((ah) << (4))) | (((al) & (15))))) & 0xff);
        return 0;
    }
    method_do_sbc_nd(val = 0) {
        let diff = ((((((this.m_A) - (val))) - (((((this.m_P) & (1))) ? (0) : (1))))) & 0xffff);
        this.m_P = ((((this.m_P) & ((~((((((128) | (64))) | (2))) | (1)))))) & 0xff);
        if (((((diff) & 0xff)) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
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
    method_do_cmp(val1 = 0, val2 = 0) {
        this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
        let r = ((((val1) - (val2))) & 0xffff);
        if (((r) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
            if (((Number((((r) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
                this.m_P = ((((this.m_P) | (128))) & 0xff);
            }
        }
        if (((((r) & (65280))) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (1))) & 0xff);
        }
        return 0;
    }
    method_do_bit(val = 0) {
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
    method_do_asl(v = 0) {
        this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
        let r = ((((v) << (1))) & 0xff);
        if (((r) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
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
    method_do_lsr(v = 0) {
        this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
        if (((v) & (1))) {
            this.m_P = ((((this.m_P) | (1))) & 0xff);
        }
        v = ((((v) >> (1))) & 0xff);
        if (((v) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        return v;
        return 0;
    }
    method_do_ror(v = 0) {
        let c = ((((this.m_P) & (1))) ? 1 : 0);
        this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
        if (((v) & (1))) {
            this.m_P = ((((this.m_P) | (1))) & 0xff);
        }
        v = ((((v) >> (1))) & 0xff);
        if (c) {
            v = ((((v) | (128))) & 0xff);
        }
        if (((v) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
            if (((Number((((v) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
                this.m_P = ((((this.m_P) | (128))) & 0xff);
            }
        }
        return v;
        return 0;
    }
    method_do_rol(v = 0) {
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
        }
        else {
            if (((Number((((v) << 24) >> 24)) < Number(0)) ? 1 : 0)) {
                this.m_P = ((((this.m_P) | (128))) & 0xff);
            }
        }
        return v;
        return 0;
    }
    method_do_asr(v = 0) {
        this.m_P = ((((this.m_P) & ((~((((128) | (2))) | (1)))))) & 0xff);
        if (((v) & (1))) {
            this.m_P = ((((this.m_P) | (1))) & 0xff);
        }
        v = ((((v) >> (1))) & 0xff);
        if (((v) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        else {
            if (((v) & (64))) {
                this.m_P = ((((this.m_P) | (128))) & 0xff);
                v = ((((v) | (128))) & 0xff);
            }
        }
        return v;
        return 0;
    }
    method_set_nz(v = 0) {
        this.m_P = ((((this.m_P) & ((~((2) | (128)))))) & 0xff);
        if (((v) & (128))) {
            this.m_P = ((((this.m_P) | (128))) & 0xff);
        }
        if (((v) ? 0 : 1)) {
            this.m_P = ((((this.m_P) | (2))) & 0xff);
        }
        return 0;
    }
    method_set_l(base = 0, val = 0) {
        return ((((base) & (65280))) | (val));
        return 0;
    }
    method_set_h(base = 0, val = 0) {
        return ((((base) & (255))) | (((val) << (8))));
        return 0;
    }
    method_page_changing(base = 0, delta = 0) {
        return ((((((base) + (delta))) ^ (base))) & (65280));
        return 0;
    }
    method_dec_SP() {
        this.m_SP = ((this.method_set_l(this.m_SP, ((this.m_SP) - (1)))) & 0xffff);
        return 0;
    }
    method_inc_SP() {
        this.m_SP = ((this.method_set_l(this.m_SP, ((this.m_SP) + (1)))) & 0xffff);
        return 0;
    }
}
export const cpu = {
    type: "M6502",
    summary: { "opcodes": 256, "compiledOpcodes": 256, "methods": 22, "compiledMethods": 22, "diagnostics": 0 },
    create: (bus) => new GeneratedM6502(bus),
};
export default cpu;
