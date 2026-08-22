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
class GeneratedNSC8105 {
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
    m_ppc = new Pair16(0);
    m_pc = new Pair16(0);
    m_s = new Pair16(0);
    m_x = new Pair16(0);
    m_d = new Pair16(0);
    m_ea = new Pair16(0);
    m_cc = ((0) & 0xff);
    m_wai_state = ((0) & 0xff);
    m_nmi_state = ((0) & 0xff);
    m_nmi_pending = ((0) & 0xff);
    m_irq_delay = ((0) & 0xff);
    m_irq_state = Uint8Array.from([0, 0, 0, 0, 0]);
    flags8i = Uint8Array.from([4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
    flags8d = Uint8Array.from([4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
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
        this.m_cc = ((192) & 0xff);
        this.m_cc = ((((this.m_cc) | (16))) & 0xff);
        this.m_pc.w = ((this.method_RM16(65534)) & 0xffff);
        this.m_wai_state = ((0) & 0xff);
        this.m_nmi_state = ((0) & 0xff);
        this.m_nmi_pending = ((0) & 0xff);
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
                throw new Error('NSC8105 dispatch loop exceeded 8');
            switch ((this.m_ref >>> 8) & 0xffff) {
                case 0x0000: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x0100: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x0200: {
                    this.method_nop();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x0300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x0400: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x0500: {
                    this.method_tap();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x0600: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x0700: {
                    this.method_tpa();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x0800: {
                    this.method_inx();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x0900: {
                    this.method_clv();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x0a00: {
                    this.method_dex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x0b00: {
                    this.method_sev();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x0c00: {
                    this.method_clc();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x0d00: {
                    this.method_cli();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x0e00: {
                    this.method_sec();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x0f00: {
                    this.method_sei();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x1000: {
                    this.method_sba();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x1100: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x1200: {
                    this.method_cba();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x1300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x1400: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x1500: {
                    this.method_tab();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x1600: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x1700: {
                    this.method_tba();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x1800: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x1900: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x1a00: {
                    this.method_daa();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x1b00: {
                    this.method_aba();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x1c00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x1d00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x1e00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x1f00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2000: {
                    this.method_bra();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2100: {
                    this.method_bhi();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2200: {
                    this.method_brn();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2300: {
                    this.method_bls();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2400: {
                    this.method_bcc();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2500: {
                    this.method_bne();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2600: {
                    this.method_bcs();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2700: {
                    this.method_beq();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2800: {
                    this.method_bvc();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2900: {
                    this.method_bpl();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2a00: {
                    this.method_bvs();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2b00: {
                    this.method_bmi();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2c00: {
                    this.method_bge();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2d00: {
                    this.method_bgt();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2e00: {
                    this.method_blt();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x2f00: {
                    this.method_ble();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3000: {
                    this.method_tsx();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3100: {
                    this.method_pula();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3200: {
                    this.method_ins();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3300: {
                    this.method_pulb();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3400: {
                    this.method_des();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3500: {
                    this.method_psha();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3600: {
                    this.method_txs();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3700: {
                    this.method_pshb();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3800: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3900: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3a00: {
                    this.method_rts();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x3b00: {
                    this.method_rti();
                    this.cycles = ((this.cycles) + (10));
                    return this.cycles;
                }
                case 0x3c00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3d00: {
                    this.method_wai();
                    this.cycles = ((this.cycles) + (9));
                    return this.cycles;
                }
                case 0x3e00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x3f00: {
                    this.method_swi();
                    this.cycles = ((this.cycles) + (12));
                    return this.cycles;
                }
                case 0x4000: {
                    this.method_suba_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4100: {
                    this.method_sbca_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4200: {
                    this.method_cmpa_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x4400: {
                    this.method_anda_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4500: {
                    this.method_lda_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4600: {
                    this.method_bita_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4700: {
                    this.method_sta_im();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x4800: {
                    this.method_eora_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4900: {
                    this.method_ora_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4a00: {
                    this.method_adca_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4b00: {
                    this.method_adda_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x4c00: {
                    this.method_cmpx_im();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x4d00: {
                    this.method_lds_im();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x4e00: {
                    this.method_bsr();
                    this.cycles = ((this.cycles) + (8));
                    return this.cycles;
                }
                case 0x4f00: {
                    this.method_sts_im();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x5000: {
                    this.method_suba_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5100: {
                    this.method_sbca_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5200: {
                    this.method_cmpa_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x5400: {
                    this.method_anda_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5500: {
                    this.method_lda_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5600: {
                    this.method_bita_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5700: {
                    this.method_sta_di();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x5800: {
                    this.method_eora_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5900: {
                    this.method_ora_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5a00: {
                    this.method_adca_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5b00: {
                    this.method_adda_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0x5c00: {
                    this.method_cmpx_di();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x5d00: {
                    this.method_lds_di();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x5e00: {
                    this.method_jsr_di();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0x5f00: {
                    this.method_sts_di();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6000: {
                    this.method_suba_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6100: {
                    this.method_sbca_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6200: {
                    this.method_cmpa_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x6400: {
                    this.method_anda_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6500: {
                    this.method_lda_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6600: {
                    this.method_bita_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6700: {
                    this.method_sta_ix();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0x6800: {
                    this.method_eora_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6900: {
                    this.method_ora_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6a00: {
                    this.method_adca_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6b00: {
                    this.method_adda_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x6c00: {
                    this.method_cmpx_ix();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0x6d00: {
                    this.method_lds_ix();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0x6e00: {
                    this.method_jsr_ix();
                    this.cycles = ((this.cycles) + (8));
                    return this.cycles;
                }
                case 0x6f00: {
                    this.method_sts_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0x7000: {
                    this.method_suba_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7100: {
                    this.method_sbca_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7200: {
                    this.method_cmpa_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7400: {
                    this.method_anda_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7500: {
                    this.method_lda_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7600: {
                    this.method_bita_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7700: {
                    this.method_sta_ex();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x7800: {
                    this.method_eora_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7900: {
                    this.method_ora_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7a00: {
                    this.method_adca_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7b00: {
                    this.method_adda_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x7c00: {
                    this.method_cmpx_ex();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x7d00: {
                    this.method_lds_ex();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0x7e00: {
                    this.method_jsr_ex();
                    this.cycles = ((this.cycles) + (9));
                    return this.cycles;
                }
                case 0x7f00: {
                    this.method_sts_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0x8000: {
                    this.method_nega();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8100: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x8200: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x8300: {
                    this.method_coma();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8400: {
                    this.method_lsra();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8500: {
                    this.method_rora();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8600: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x8700: {
                    this.method_asra();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8800: {
                    this.method_asla();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8900: {
                    this.method_deca();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8a00: {
                    this.method_rola();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8b00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x8c00: {
                    this.method_inca();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8d00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x8e00: {
                    this.method_tsta();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x8f00: {
                    this.method_clra();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9000: {
                    this.method_negb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9100: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x9200: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x9300: {
                    this.method_comb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9400: {
                    this.method_lsrb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9500: {
                    this.method_rorb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9600: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x9700: {
                    this.method_asrb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9800: {
                    this.method_aslb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9900: {
                    this.method_decb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9a00: {
                    this.method_rolb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9b00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x9c00: {
                    this.method_incb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9d00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0x9e00: {
                    this.method_tstb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0x9f00: {
                    this.method_clrb();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xa000: {
                    this.method_neg_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xa100: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xa200: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xa300: {
                    this.method_com_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xa400: {
                    this.method_lsr_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xa500: {
                    this.method_ror_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xa600: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xa700: {
                    this.method_asr_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xa800: {
                    this.method_asl_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xa900: {
                    this.method_dec_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xaa00: {
                    this.method_rol_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xab00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xac00: {
                    this.method_inc_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xad00: {
                    this.method_jmp_ix();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xae00: {
                    this.method_tst_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xaf00: {
                    this.method_clr_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xb000: {
                    this.method_neg_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xb100: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xb200: {
                    this.method_stx_nsc();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xb300: {
                    this.method_com_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xb400: {
                    this.method_lsr_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xb500: {
                    this.method_ror_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xb600: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xb700: {
                    this.method_asr_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xb800: {
                    this.method_asl_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xb900: {
                    this.method_dec_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xba00: {
                    this.method_rol_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xbb00: {
                    this.method_btst_ix();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xbc00: {
                    this.method_inc_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xbd00: {
                    this.method_jmp_ex();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xbe00: {
                    this.method_tst_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xbf00: {
                    this.method_clr_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xc000: {
                    this.method_subb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xc100: {
                    this.method_sbcb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xc200: {
                    this.method_cmpb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xc300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xc400: {
                    this.method_andb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xc500: {
                    this.method_ldb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xc600: {
                    this.method_bitb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xc700: {
                    this.method_stb_im();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xc800: {
                    this.method_eorb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xc900: {
                    this.method_orb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xca00: {
                    this.method_adcb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xcb00: {
                    this.method_addb_im();
                    this.cycles = ((this.cycles) + (2));
                    return this.cycles;
                }
                case 0xcc00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xcd00: {
                    this.method_ldx_im();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xce00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xcf00: {
                    this.method_stx_im();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xd000: {
                    this.method_subb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xd100: {
                    this.method_sbcb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xd200: {
                    this.method_cmpb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xd300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xd400: {
                    this.method_andb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xd500: {
                    this.method_ldb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xd600: {
                    this.method_bitb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xd700: {
                    this.method_stb_di();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xd800: {
                    this.method_eorb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xd900: {
                    this.method_orb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xda00: {
                    this.method_adcb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xdb00: {
                    this.method_addb_di();
                    this.cycles = ((this.cycles) + (3));
                    return this.cycles;
                }
                case 0xdc00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xdd00: {
                    this.method_ldx_di();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xde00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xdf00: {
                    this.method_stx_di();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xe000: {
                    this.method_subb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xe100: {
                    this.method_sbcb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xe200: {
                    this.method_cmpb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xe300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xe400: {
                    this.method_andb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xe500: {
                    this.method_ldb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xe600: {
                    this.method_bitb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xe700: {
                    this.method_stb_ix();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xe800: {
                    this.method_eorb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xe900: {
                    this.method_orb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xea00: {
                    this.method_adcb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xeb00: {
                    this.method_addb_ix();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xec00: {
                    this.method_adcx_im();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xed00: {
                    this.method_ldx_ix();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                case 0xee00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xef00: {
                    this.method_stx_ix();
                    this.cycles = ((this.cycles) + (7));
                    return this.cycles;
                }
                case 0xf000: {
                    this.method_subb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xf100: {
                    this.method_sbcb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xf200: {
                    this.method_cmpb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xf300: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xf400: {
                    this.method_andb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xf500: {
                    this.method_ldb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xf600: {
                    this.method_bitb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xf700: {
                    this.method_stb_ex();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xf800: {
                    this.method_eorb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xf900: {
                    this.method_orb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xfa00: {
                    this.method_adcb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xfb00: {
                    this.method_addb_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xfc00: {
                    this.method_addx_ex();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xfd00: {
                    this.method_ldx_ex();
                    this.cycles = ((this.cycles) + (5));
                    return this.cycles;
                }
                case 0xfe00: {
                    this.method_illegl1();
                    this.cycles = ((this.cycles) + (4));
                    return this.cycles;
                }
                case 0xff00: {
                    this.method_stx_ex();
                    this.cycles = ((this.cycles) + (6));
                    return this.cycles;
                }
                default:
                    throw new Error('NSC8105 has no generated opcode ' +
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
        if ((location >= 0 && location <= 127))
            return this.internalRam[location];
        return this.bus.read(location) & 0xff;
    }
    writeMemory(address, value) {
        const location = address & 65535;
        const data = value & 0xff;
        if ((location >= 0 && location <= 127)) {
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
            case "m_ppc":
            case "m_ppc.w": return this.m_ppc.w;
            case "m_ppc.b.h": return this.m_ppc.b.h;
            case "m_ppc.b.l": return this.m_ppc.b.l;
            case "m_pc":
            case "m_pc.w": return this.m_pc.w;
            case "m_pc.b.h": return this.m_pc.b.h;
            case "m_pc.b.l": return this.m_pc.b.l;
            case "m_s":
            case "m_s.w": return this.m_s.w;
            case "m_s.b.h": return this.m_s.b.h;
            case "m_s.b.l": return this.m_s.b.l;
            case "m_x":
            case "m_x.w": return this.m_x.w;
            case "m_x.b.h": return this.m_x.b.h;
            case "m_x.b.l": return this.m_x.b.l;
            case "m_d":
            case "m_d.w": return this.m_d.w;
            case "m_d.b.h": return this.m_d.b.h;
            case "m_d.b.l": return this.m_d.b.l;
            case "m_ea":
            case "m_ea.w": return this.m_ea.w;
            case "m_ea.b.h": return this.m_ea.b.h;
            case "m_ea.b.l": return this.m_ea.b.l;
            case "m_cc": return this.m_cc;
            case "m_wai_state": return this.m_wai_state;
            case "m_nmi_state": return this.m_nmi_state;
            case "m_nmi_pending": return this.m_nmi_pending;
            case "m_irq_delay": return this.m_irq_delay;
            case "m_ref": return this.m_ref;
            case "cycles": return this.cycles;
            case "m_icount": return this.m_icount;
            default: return 0;
        }
    }
    set(name, value) {
        switch (name) {
            case "m_ppc":
            case "m_ppc.w":
                this.m_ppc.w = value;
                return;
            case "m_ppc.b.h":
                this.m_ppc.b.h = value;
                return;
            case "m_ppc.b.l":
                this.m_ppc.b.l = value;
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
            case "m_s":
            case "m_s.w":
                this.m_s.w = value;
                return;
            case "m_s.b.h":
                this.m_s.b.h = value;
                return;
            case "m_s.b.l":
                this.m_s.b.l = value;
                return;
            case "m_x":
            case "m_x.w":
                this.m_x.w = value;
                return;
            case "m_x.b.h":
                this.m_x.b.h = value;
                return;
            case "m_x.b.l":
                this.m_x.b.l = value;
                return;
            case "m_d":
            case "m_d.w":
                this.m_d.w = value;
                return;
            case "m_d.b.h":
                this.m_d.b.h = value;
                return;
            case "m_d.b.l":
                this.m_d.b.l = value;
                return;
            case "m_ea":
            case "m_ea.w":
                this.m_ea.w = value;
                return;
            case "m_ea.b.h":
                this.m_ea.b.h = value;
                return;
            case "m_ea.b.l":
                this.m_ea.b.l = value;
                return;
            case "m_cc":
                this.m_cc = ((value) & 0xff);
                return;
            case "m_wai_state":
                this.m_wai_state = ((value) & 0xff);
                return;
            case "m_nmi_state":
                this.m_nmi_state = ((value) & 0xff);
                return;
            case "m_nmi_pending":
                this.m_nmi_pending = ((value) & 0xff);
                return;
            case "m_irq_delay":
                this.m_irq_delay = ((value) & 0xff);
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
            case "illegl1": return this.method_illegl1();
            case "illegl2": return this.method_illegl2();
            case "illegl3": return this.method_illegl3();
            case "trap": return this.method_trap();
            case "nop": return this.method_nop();
            case "lsrd": return this.method_lsrd();
            case "asld": return this.method_asld();
            case "tap": return this.method_tap();
            case "tpa": return this.method_tpa();
            case "inx": return this.method_inx();
            case "dex": return this.method_dex();
            case "clv": return this.method_clv();
            case "sev": return this.method_sev();
            case "clc": return this.method_clc();
            case "sec": return this.method_sec();
            case "cli": return this.method_cli();
            case "sei": return this.method_sei();
            case "sba": return this.method_sba();
            case "cba": return this.method_cba();
            case "undoc1": return this.method_undoc1();
            case "undoc2": return this.method_undoc2();
            case "tab": return this.method_tab();
            case "tba": return this.method_tba();
            case "xgdx": return this.method_xgdx();
            case "daa": return this.method_daa();
            case "slp": return this.method_slp();
            case "aba": return this.method_aba();
            case "bra": return this.method_bra();
            case "brn": return this.method_brn();
            case "bhi": return this.method_bhi();
            case "bls": return this.method_bls();
            case "bcc": return this.method_bcc();
            case "bcs": return this.method_bcs();
            case "bne": return this.method_bne();
            case "beq": return this.method_beq();
            case "bvc": return this.method_bvc();
            case "bvs": return this.method_bvs();
            case "bpl": return this.method_bpl();
            case "bmi": return this.method_bmi();
            case "bge": return this.method_bge();
            case "blt": return this.method_blt();
            case "bgt": return this.method_bgt();
            case "ble": return this.method_ble();
            case "tsx": return this.method_tsx();
            case "ins": return this.method_ins();
            case "pula": return this.method_pula();
            case "pulb": return this.method_pulb();
            case "des": return this.method_des();
            case "txs": return this.method_txs();
            case "psha": return this.method_psha();
            case "pshb": return this.method_pshb();
            case "pulx": return this.method_pulx();
            case "rts": return this.method_rts();
            case "abx": return this.method_abx();
            case "rti": return this.method_rti();
            case "pshx": return this.method_pshx();
            case "mul": return this.method_mul();
            case "wai": return this.method_wai();
            case "swi": return this.method_swi();
            case "nega": return this.method_nega();
            case "coma": return this.method_coma();
            case "lsra": return this.method_lsra();
            case "rora": return this.method_rora();
            case "asra": return this.method_asra();
            case "asla": return this.method_asla();
            case "rola": return this.method_rola();
            case "deca": return this.method_deca();
            case "inca": return this.method_inca();
            case "tsta": return this.method_tsta();
            case "clra": return this.method_clra();
            case "negb": return this.method_negb();
            case "comb": return this.method_comb();
            case "lsrb": return this.method_lsrb();
            case "rorb": return this.method_rorb();
            case "asrb": return this.method_asrb();
            case "aslb": return this.method_aslb();
            case "rolb": return this.method_rolb();
            case "decb": return this.method_decb();
            case "incb": return this.method_incb();
            case "tstb": return this.method_tstb();
            case "clrb": return this.method_clrb();
            case "neg_ix": return this.method_neg_ix();
            case "aim_ix": return this.method_aim_ix();
            case "oim_ix": return this.method_oim_ix();
            case "com_ix": return this.method_com_ix();
            case "lsr_ix": return this.method_lsr_ix();
            case "eim_ix": return this.method_eim_ix();
            case "ror_ix": return this.method_ror_ix();
            case "asr_ix": return this.method_asr_ix();
            case "asl_ix": return this.method_asl_ix();
            case "rol_ix": return this.method_rol_ix();
            case "dec_ix": return this.method_dec_ix();
            case "tim_ix": return this.method_tim_ix();
            case "inc_ix": return this.method_inc_ix();
            case "tst_ix": return this.method_tst_ix();
            case "jmp_ix": return this.method_jmp_ix();
            case "clr_ix": return this.method_clr_ix();
            case "neg_ex": return this.method_neg_ex();
            case "aim_di": return this.method_aim_di();
            case "oim_di": return this.method_oim_di();
            case "com_ex": return this.method_com_ex();
            case "lsr_ex": return this.method_lsr_ex();
            case "eim_di": return this.method_eim_di();
            case "ror_ex": return this.method_ror_ex();
            case "asr_ex": return this.method_asr_ex();
            case "asl_ex": return this.method_asl_ex();
            case "rol_ex": return this.method_rol_ex();
            case "dec_ex": return this.method_dec_ex();
            case "tim_di": return this.method_tim_di();
            case "inc_ex": return this.method_inc_ex();
            case "tst_ex": return this.method_tst_ex();
            case "jmp_ex": return this.method_jmp_ex();
            case "clr_ex": return this.method_clr_ex();
            case "suba_im": return this.method_suba_im();
            case "cmpa_im": return this.method_cmpa_im();
            case "sbca_im": return this.method_sbca_im();
            case "subd_im": return this.method_subd_im();
            case "anda_im": return this.method_anda_im();
            case "bita_im": return this.method_bita_im();
            case "lda_im": return this.method_lda_im();
            case "sta_im": return this.method_sta_im();
            case "eora_im": return this.method_eora_im();
            case "adca_im": return this.method_adca_im();
            case "ora_im": return this.method_ora_im();
            case "adda_im": return this.method_adda_im();
            case "cmpx_im": return this.method_cmpx_im();
            case "cpx_im": return this.method_cpx_im();
            case "bsr": return this.method_bsr();
            case "lds_im": return this.method_lds_im();
            case "sts_im": return this.method_sts_im();
            case "suba_di": return this.method_suba_di();
            case "cmpa_di": return this.method_cmpa_di();
            case "sbca_di": return this.method_sbca_di();
            case "subd_di": return this.method_subd_di();
            case "anda_di": return this.method_anda_di();
            case "bita_di": return this.method_bita_di();
            case "lda_di": return this.method_lda_di();
            case "sta_di": return this.method_sta_di();
            case "eora_di": return this.method_eora_di();
            case "adca_di": return this.method_adca_di();
            case "ora_di": return this.method_ora_di();
            case "adda_di": return this.method_adda_di();
            case "cmpx_di": return this.method_cmpx_di();
            case "cpx_di": return this.method_cpx_di();
            case "jsr_di": return this.method_jsr_di();
            case "lds_di": return this.method_lds_di();
            case "sts_di": return this.method_sts_di();
            case "suba_ix": return this.method_suba_ix();
            case "cmpa_ix": return this.method_cmpa_ix();
            case "sbca_ix": return this.method_sbca_ix();
            case "subd_ix": return this.method_subd_ix();
            case "anda_ix": return this.method_anda_ix();
            case "bita_ix": return this.method_bita_ix();
            case "lda_ix": return this.method_lda_ix();
            case "sta_ix": return this.method_sta_ix();
            case "eora_ix": return this.method_eora_ix();
            case "adca_ix": return this.method_adca_ix();
            case "ora_ix": return this.method_ora_ix();
            case "adda_ix": return this.method_adda_ix();
            case "cmpx_ix": return this.method_cmpx_ix();
            case "cpx_ix": return this.method_cpx_ix();
            case "jsr_ix": return this.method_jsr_ix();
            case "lds_ix": return this.method_lds_ix();
            case "sts_ix": return this.method_sts_ix();
            case "suba_ex": return this.method_suba_ex();
            case "cmpa_ex": return this.method_cmpa_ex();
            case "sbca_ex": return this.method_sbca_ex();
            case "subd_ex": return this.method_subd_ex();
            case "anda_ex": return this.method_anda_ex();
            case "bita_ex": return this.method_bita_ex();
            case "lda_ex": return this.method_lda_ex();
            case "sta_ex": return this.method_sta_ex();
            case "eora_ex": return this.method_eora_ex();
            case "adca_ex": return this.method_adca_ex();
            case "ora_ex": return this.method_ora_ex();
            case "adda_ex": return this.method_adda_ex();
            case "cmpx_ex": return this.method_cmpx_ex();
            case "cpx_ex": return this.method_cpx_ex();
            case "jsr_ex": return this.method_jsr_ex();
            case "lds_ex": return this.method_lds_ex();
            case "sts_ex": return this.method_sts_ex();
            case "subb_im": return this.method_subb_im();
            case "cmpb_im": return this.method_cmpb_im();
            case "sbcb_im": return this.method_sbcb_im();
            case "addd_im": return this.method_addd_im();
            case "andb_im": return this.method_andb_im();
            case "bitb_im": return this.method_bitb_im();
            case "ldb_im": return this.method_ldb_im();
            case "stb_im": return this.method_stb_im();
            case "eorb_im": return this.method_eorb_im();
            case "adcb_im": return this.method_adcb_im();
            case "orb_im": return this.method_orb_im();
            case "addb_im": return this.method_addb_im();
            case "ldd_im": return this.method_ldd_im();
            case "std_im": return this.method_std_im();
            case "ldx_im": return this.method_ldx_im();
            case "stx_im": return this.method_stx_im();
            case "subb_di": return this.method_subb_di();
            case "cmpb_di": return this.method_cmpb_di();
            case "sbcb_di": return this.method_sbcb_di();
            case "addd_di": return this.method_addd_di();
            case "andb_di": return this.method_andb_di();
            case "bitb_di": return this.method_bitb_di();
            case "ldb_di": return this.method_ldb_di();
            case "stb_di": return this.method_stb_di();
            case "eorb_di": return this.method_eorb_di();
            case "adcb_di": return this.method_adcb_di();
            case "orb_di": return this.method_orb_di();
            case "addb_di": return this.method_addb_di();
            case "ldd_di": return this.method_ldd_di();
            case "std_di": return this.method_std_di();
            case "ldx_di": return this.method_ldx_di();
            case "stx_di": return this.method_stx_di();
            case "subb_ix": return this.method_subb_ix();
            case "cmpb_ix": return this.method_cmpb_ix();
            case "sbcb_ix": return this.method_sbcb_ix();
            case "addd_ix": return this.method_addd_ix();
            case "andb_ix": return this.method_andb_ix();
            case "bitb_ix": return this.method_bitb_ix();
            case "ldb_ix": return this.method_ldb_ix();
            case "stb_ix": return this.method_stb_ix();
            case "eorb_ix": return this.method_eorb_ix();
            case "adcb_ix": return this.method_adcb_ix();
            case "orb_ix": return this.method_orb_ix();
            case "addb_ix": return this.method_addb_ix();
            case "ldd_ix": return this.method_ldd_ix();
            case "adcx_im": return this.method_adcx_im();
            case "std_ix": return this.method_std_ix();
            case "ldx_ix": return this.method_ldx_ix();
            case "stx_ix": return this.method_stx_ix();
            case "subb_ex": return this.method_subb_ex();
            case "cmpb_ex": return this.method_cmpb_ex();
            case "sbcb_ex": return this.method_sbcb_ex();
            case "addd_ex": return this.method_addd_ex();
            case "andb_ex": return this.method_andb_ex();
            case "bitb_ex": return this.method_bitb_ex();
            case "ldb_ex": return this.method_ldb_ex();
            case "stb_ex": return this.method_stb_ex();
            case "eorb_ex": return this.method_eorb_ex();
            case "adcb_ex": return this.method_adcb_ex();
            case "orb_ex": return this.method_orb_ex();
            case "addb_ex": return this.method_addb_ex();
            case "ldd_ex": return this.method_ldd_ex();
            case "addx_ex": return this.method_addx_ex();
            case "std_ex": return this.method_std_ex();
            case "ldx_ex": return this.method_ldx_ex();
            case "stx_ex": return this.method_stx_ex();
            case "btst_ix": return this.method_btst_ix();
            case "stx_nsc": return this.method_stx_nsc();
            case "RM16": return this.method_RM16(args[0] ?? 0);
            case "WM16": return this.method_WM16(args[0] ?? 0, args[1] ?? 0);
            case "enter_interrupt": return this.method_enter_interrupt(args[0] ?? 0, args[1] ?? 0);
            case "check_irq_lines": return this.method_check_irq_lines();
            case "check_irq1_enabled": return this.method_check_irq1_enabled();
            case "increment_counter": return this.method_increment_counter(args[0] ?? 0);
            case "check_irq2": return this.method_check_irq2();
            case "execute_one": return this.method_execute_one();
            case "eat_cycles": return this.method_eat_cycles();
            case "take_trap": return this.method_take_trap();
            default: throw new Error('NSC8105 has no generated method "' + name + '"');
        }
    }
    generatedStart() {
    }
    generatedInput(inputnum, state) {
        switch (inputnum) {
            case -1:
                {
                    if ((((((this.m_nmi_state) ? 0 : 1)) && (((Number(state) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        this.m_nmi_pending = ((1) & 0xff);
                    }
                    this.m_nmi_state = ((state) & 0xff);
                    break;
                }
            default:
                {
                    this.m_irq_state[inputnum] = ((state) & 0xff);
                    break;
                }
        }
    }
    generatedService() {
        if (this.m_irq_delay) {
            this.m_irq_delay = ((0) & 0xff);
        }
        else {
            this.method_check_irq_lines();
        }
        if (((Number(this.cycles) > Number(0)) ? 1 : 0)) {
            return;
        }
        if (((this.m_wai_state) & (((8) | (16))))) {
            this.cycles = ((this.cycles) + (1));
            return;
        }
    }
    generatedFetch() {
        this.m_ref = (((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (16))) >>> 0);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
    }
    method_illegl1() {
        0;
        return 0;
    }
    method_illegl2() {
        0;
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        return 0;
    }
    method_illegl3() {
        0;
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        return 0;
    }
    method_trap() {
        0;
        this.m_pc.w = ((((this.m_pc.w) - (1))) & 0xffff);
        this.method_take_trap();
        return 0;
    }
    method_nop() {
        return 0;
    }
    method_lsrd() {
        let t = 0;
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        t = ((this.m_d.w) & 0xffff);
        this.m_cc = ((((this.m_cc) | (((t) & (1))))) & 0xff);
        t = ((((t) >> (1))) & 0xffff);
        if (((((t) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        this.m_d.w = ((t) & 0xffff);
        return 0;
    }
    method_asld() {
        let r = 0;
        let t = 0;
        t = ((this.m_d.w) & 0xffff);
        r = ((((t) << (1))) | 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((t) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_d.w = ((r) & 0xffff);
        return 0;
    }
    method_tap() {
        this.m_cc = ((this.m_d.b.h) & 0xff);
        this.method_execute_one();
        this.method_check_irq_lines();
        return 0;
    }
    method_tpa() {
        this.m_d.b.h = ((this.m_cc) & 0xff);
        return 0;
    }
    method_inx() {
        this.m_x.w = ((((this.m_x.w) + (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (251))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_dex() {
        this.m_x.w = ((((this.m_x.w) - (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (251))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_clv() {
        this.m_cc = ((((this.m_cc) & (253))) & 0xff);
        return 0;
    }
    method_sev() {
        this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        return 0;
    }
    method_clc() {
        this.m_cc = ((((this.m_cc) & (254))) & 0xff);
        return 0;
    }
    method_sec() {
        this.m_cc = ((((this.m_cc) | (1))) & 0xff);
        return 0;
    }
    method_cli() {
        this.m_irq_delay = ((((((this.m_cc) & (16))) ? (1) : (0))) & 0xff);
        this.m_cc = ((((this.m_cc) & ((~16)))) & 0xff);
        return 0;
    }
    method_sei() {
        this.m_cc = ((((this.m_cc) | (16))) & 0xff);
        return 0;
    }
    method_sba() {
        let t = 0;
        t = ((((this.m_d.b.h) - (this.m_d.b.l))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (128))) >> (4))))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (this.m_d.b.l))) ^ (t))) ^ (((t) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((t) & 0xff);
        return 0;
    }
    method_cba() {
        let t = 0;
        t = ((((this.m_d.b.h) - (this.m_d.b.l))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (128))) >> (4))))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (this.m_d.b.l))) ^ (t))) ^ (((t) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (256))) >> (8))))) & 0xff);
        return 0;
    }
    method_undoc1() {
        this.m_x.w = ((((this.m_x.w) + ((this.readMemory((((this.m_s.w) + (1))) & 0xffff) & 0xff)))) & 0xffff);
        return 0;
    }
    method_undoc2() {
        this.m_x.w = ((((this.m_x.w) + ((this.readMemory((((this.m_s.w) + (1))) & 0xffff) & 0xff)))) & 0xffff);
        return 0;
    }
    method_tab() {
        this.m_d.b.l = ((this.m_d.b.h) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_tba() {
        this.m_d.b.h = ((this.m_d.b.l) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_xgdx() {
        let t = ((this.m_x.w) & 0xffff);
        this.m_x.w = ((this.m_d.w) & 0xffff);
        this.m_d.w = ((t) & 0xffff);
        return 0;
    }
    method_daa() {
        let msn = 0;
        let lsn = 0;
        let t = 0;
        let cf = ((0) & 0xffff);
        msn = ((((this.m_d.b.h) & (240))) & 0xff);
        lsn = ((((this.m_d.b.h) & (15))) & 0xff);
        if ((((((Number(lsn) > Number(9)) ? 1 : 0)) || (((this.m_cc) & (32)))) ? 1 : 0)) {
            cf = ((((cf) | (6))) & 0xffff);
        }
        if ((((((Number(msn) > Number(128)) ? 1 : 0)) && (((Number(lsn) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
            cf = ((((cf) | (96))) & 0xffff);
        }
        if ((((((Number(msn) > Number(144)) ? 1 : 0)) || (((this.m_cc) & (1)))) ? 1 : 0)) {
            cf = ((((cf) | (96))) & 0xffff);
        }
        t = ((((cf) + (this.m_d.b.h))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((t) & 0xff)) & (128))) >> (4))))) & 0xff);
        if (((((((t) & 0xff)) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((t) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((t) & 0xff);
        return 0;
    }
    method_slp() {
        this.m_wai_state = ((((this.m_wai_state) | (16))) & 0xff);
        this.method_check_irq_lines();
        if (((this.m_wai_state) & (16))) {
            this.method_eat_cycles();
        }
        return 0;
    }
    method_aba() {
        let t = 0;
        t = ((((this.m_d.b.h) + (this.m_d.b.l))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (128))) >> (4))))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (this.m_d.b.l))) ^ (t))) ^ (((t) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.h) ^ (this.m_d.b.l))) ^ (t))) & (16))) << (1))))) & 0xff);
        this.m_d.b.h = ((t) & 0xff);
        return 0;
    }
    method_bra() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (1) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_brn() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (0) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bhi() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((((this.m_cc) & (5))) ? 0 : 1)) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bls() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((this.m_cc) & (5))) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bcc() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((((this.m_cc) & (1))) ? 0 : 1)) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bcs() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((this.m_cc) & (1))) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bne() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((((this.m_cc) & (4))) ? 0 : 1)) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_beq() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((this.m_cc) & (4))) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bvc() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((((this.m_cc) & (2))) ? 0 : 1)) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bvs() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((this.m_cc) & (2))) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bpl() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((((this.m_cc) & (8))) ? 0 : 1)) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bmi() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((this.m_cc) & (8))) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bge() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((((((this.m_cc) & (8))) ^ (((((this.m_cc) & (2))) << (2))))) ? 0 : 1)) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_blt() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (2))) << (2))))) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_bgt() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if ((((((((((this.m_cc) & (8))) ^ (((((this.m_cc) & (2))) << (2))))) || (((this.m_cc) & (4)))) ? 1 : 0)) ? 0 : 1)) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_ble() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        if ((((((((this.m_cc) & (8))) ^ (((((this.m_cc) & (2))) << (2))))) || (((this.m_cc) & (4)))) ? 1 : 0)) {
            this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        }
        return 0;
    }
    method_tsx() {
        this.m_x.w = ((((this.m_s.w) + (1))) & 0xffff);
        return 0;
    }
    method_ins() {
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        return 0;
    }
    method_pula() {
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_d.b.h = (((this.readMemory((this.m_s.w) & 0xffff) & 0xff)) & 0xff);
        return 0;
    }
    method_pulb() {
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_d.b.l = (((this.readMemory((this.m_s.w) & 0xffff) & 0xff)) & 0xff);
        return 0;
    }
    method_des() {
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        return 0;
    }
    method_txs() {
        this.m_s.w = ((((this.m_x.w) - (1))) & 0xffff);
        return 0;
    }
    method_psha() {
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_d.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        return 0;
    }
    method_pshb() {
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_d.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        return 0;
    }
    method_pulx() {
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_x.w = (((((this.readMemory((this.m_s.w) & 0xffff) & 0xff)) << (8))) & 0xffff);
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_x.w = ((((this.m_x.w) | ((this.readMemory((this.m_s.w) & 0xffff) & 0xff)))) & 0xffff);
        return 0;
    }
    method_rts() {
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_pc.w = (((((this.readMemory((this.m_s.w) & 0xffff) & 0xff)) << (8))) & 0xffff);
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) | ((this.readMemory((this.m_s.w) & 0xffff) & 0xff)))) & 0xffff);
        return 0;
    }
    method_abx() {
        this.m_x.w = ((((this.m_x.w) + (this.m_d.b.l))) & 0xffff);
        return 0;
    }
    method_rti() {
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_cc = (((this.readMemory((this.m_s.w) & 0xffff) & 0xff)) & 0xff);
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_d.b.l = (((this.readMemory((this.m_s.w) & 0xffff) & 0xff)) & 0xff);
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_d.b.h = (((this.readMemory((this.m_s.w) & 0xffff) & 0xff)) & 0xff);
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_x.w = (((((this.readMemory((this.m_s.w) & 0xffff) & 0xff)) << (8))) & 0xffff);
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_x.w = ((((this.m_x.w) | ((this.readMemory((this.m_s.w) & 0xffff) & 0xff)))) & 0xffff);
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_pc.w = (((((this.readMemory((this.m_s.w) & 0xffff) & 0xff)) << (8))) & 0xffff);
        this.m_s.w = ((((this.m_s.w) + (1))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) | ((this.readMemory((this.m_s.w) & 0xffff) & 0xff)))) & 0xffff);
        this.method_check_irq_lines();
        return 0;
    }
    method_pshx() {
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_x.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_x.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        return 0;
    }
    method_mul() {
        let t = 0;
        t = ((((this.m_d.b.h) * (this.m_d.b.l))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (254))) & 0xff);
        if (((t) & (128))) {
            this.m_cc = ((((this.m_cc) | (1))) & 0xff);
        }
        this.m_d.w = ((t) & 0xffff);
        return 0;
    }
    method_wai() {
        this.m_wai_state = ((((this.m_wai_state) | (8))) & 0xff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_x.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_x.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_d.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_d.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_cc) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        this.method_check_irq_lines();
        if (((this.m_wai_state) & (8))) {
            this.method_eat_cycles();
        }
        return 0;
    }
    method_swi() {
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_x.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_x.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_d.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_d.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_cc) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) | (16))) & 0xff);
        this.m_pc.w = ((this.method_RM16(65530)) & 0xffff);
        return 0;
    }
    method_nega() {
        let r = 0;
        r = (((-this.m_d.b.h)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((0) ^ (this.m_d.b.h))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_coma() {
        this.m_d.b.h = (((~this.m_d.b.h)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (1))) & 0xff);
        return 0;
    }
    method_lsra() {
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((this.m_d.b.h) & (1))))) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) >> (1))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        return 0;
    }
    method_rora() {
        let r = 0;
        r = ((((((this.m_cc) & (1))) << (7))) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((this.m_d.b.h) & (1))))) & 0xff);
        r = ((((r) | (((this.m_d.b.h) >> (1))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_asra() {
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((this.m_d.b.h) & (1))))) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) >> (1))) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) | (((((this.m_d.b.h) & (64))) << (1))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        return 0;
    }
    method_asla() {
        let r = 0;
        r = ((((this.m_d.b.h) << (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (this.m_d.b.h))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_rola() {
        let t = 0;
        let r = 0;
        t = ((this.m_d.b.h) & 0xffff);
        r = ((((this.m_cc) & (1))) & 0xffff);
        r = ((((r) | (((t) << (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((t) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_deca() {
        this.m_d.b.h = ((((this.m_d.b.h) - (1))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (this.flags8d[((this.m_d.b.h) & (255))]))) & 0xff);
        return 0;
    }
    method_inca() {
        this.m_d.b.h = ((((this.m_d.b.h) + (1))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (this.flags8i[((this.m_d.b.h) & (255))]))) & 0xff);
        return 0;
    }
    method_tsta() {
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_clra() {
        this.m_d.b.h = ((0) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        return 0;
    }
    method_negb() {
        let r = 0;
        r = (((-this.m_d.b.l)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((0) ^ (this.m_d.b.l))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_comb() {
        this.m_d.b.l = (((~this.m_d.b.l)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (1))) & 0xff);
        return 0;
    }
    method_lsrb() {
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((this.m_d.b.l) & (1))))) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) >> (1))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        return 0;
    }
    method_rorb() {
        let r = 0;
        r = ((((((this.m_cc) & (1))) << (7))) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((this.m_d.b.l) & (1))))) & 0xff);
        r = ((((r) | (((this.m_d.b.l) >> (1))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_asrb() {
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((this.m_d.b.l) & (1))))) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) >> (1))) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) | (((((this.m_d.b.l) & (64))) << (1))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        return 0;
    }
    method_aslb() {
        let r = 0;
        r = ((((this.m_d.b.l) << (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (this.m_d.b.l))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_rolb() {
        let t = 0;
        let r = 0;
        t = ((this.m_d.b.l) & 0xffff);
        r = ((((this.m_cc) & (1))) & 0xffff);
        r = ((((r) | (((t) << (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((t) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_decb() {
        this.m_d.b.l = ((((this.m_d.b.l) - (1))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (this.flags8d[((this.m_d.b.l) & (255))]))) & 0xff);
        return 0;
    }
    method_incb() {
        this.m_d.b.l = ((((this.m_d.b.l) + (1))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (this.flags8i[((this.m_d.b.l) & (255))]))) & 0xff);
        return 0;
    }
    method_tstb() {
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_clrb() {
        this.m_d.b.l = ((0) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        return 0;
    }
    method_neg_ix() {
        let r = 0;
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = (((-t)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((0) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_aim_ix() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((r) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_oim_ix() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((r) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_com_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        t = (((~t)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (128))) >> (4))))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (1))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_lsr_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((t) & (1))))) & 0xff);
        t = ((((t) >> (1))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_eim_ix() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((r) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_ror_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((((this.m_cc) & (1))) << (7))) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((t) & (1))))) & 0xff);
        r = ((((r) | (((t) >> (1))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_asr_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((t) & (1))))) & 0xff);
        t = ((((t) >> (1))) & 0xff);
        t = ((((t) | (((((t) & (64))) << (1))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (128))) >> (4))))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_asl_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((t) << (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((t) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_rol_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_cc) & (1))) & 0xffff);
        r = ((((r) | (((t) << (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((t) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_dec_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        t = ((((t) - (1))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (this.flags8d[((t) & (255))]))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_tim_ix() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((r) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_inc_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        t = ((((t) + (1))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (this.flags8i[((t) & (255))]))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_tst_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (128))) >> (4))))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_jmp_ix() {
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_pc.w = ((this.m_ea.w) & 0xffff);
        return 0;
    }
    method_clr_ix() {
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        (this.readMemory((this.m_ea.w) & 0xffff) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (0) & 0xff), 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        return 0;
    }
    method_neg_ex() {
        let r = 0;
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = (((-t)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((0) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_aim_di() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((r) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_oim_di() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((r) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_com_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        t = (((~t)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (128))) >> (4))))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (1))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_lsr_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((t) & (1))))) & 0xff);
        t = ((((t) >> (1))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_eim_di() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((r) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_ror_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((((this.m_cc) & (1))) << (7))) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((t) & (1))))) & 0xff);
        r = ((((r) | (((t) >> (1))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_asr_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((t) & (1))))) & 0xff);
        t = ((((t) >> (1))) & 0xff);
        t = ((((t) | (((((t) & (64))) << (1))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (128))) >> (4))))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        if (((((this.m_cc) & (8))) ^ (((((this.m_cc) & (1))) << (3))))) {
            this.m_cc = ((((this.m_cc) | (2))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_asl_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((t) << (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((t) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_rol_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_cc) & (1))) & 0xffff);
        r = ((((r) | (((t) << (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((t) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (r) & 0xff), 0);
        return 0;
    }
    method_dec_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        t = ((((t) - (1))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (this.flags8d[((t) & (255))]))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_tim_di() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((r) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_inc_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        t = ((((t) + (1))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (this.flags8i[((t) & (255))]))) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (t) & 0xff), 0);
        return 0;
    }
    method_tst_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((t) & (128))) >> (4))))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_jmp_ex() {
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_pc.w = ((this.m_ea.w) & 0xffff);
        return 0;
    }
    method_clr_ex() {
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        (this.readMemory((this.m_ea.w) & 0xffff) & 0xff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (0) & 0xff), 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        return 0;
    }
    method_suba_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((this.m_d.b.h) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_cmpa_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((this.m_d.b.h) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        return 0;
    }
    method_sbca_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((((this.m_d.b.h) - (t))) - (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_subd_im() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        b = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) >>> 0);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        d = ((this.m_d.w) >>> 0);
        r = ((((d) - (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_d.w = ((r) & 0xffff);
        return 0;
    }
    method_anda_im() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.h = ((((this.m_d.b.h) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_bita_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((this.m_d.b.h) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_lda_im() {
        this.m_d.b.h = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_sta_im() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = ((((() => { const previous = this.m_pc.w; this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff); return previous; })())) & 0xffff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (this.m_d.b.h) & 0xff), 0);
        return 0;
    }
    method_eora_im() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.h = ((((this.m_d.b.h) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adca_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((((this.m_d.b.h) + (t))) + (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_ora_im() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.h = ((((this.m_d.b.h) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adda_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((this.m_d.b.h) + (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_cmpx_im() {
        let r = ((0) >>> 0);
        let d = ((0) >>> 0);
        let b = ((0) >>> 0);
        b = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) >>> 0);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        d = ((this.m_x.w) >>> 0);
        r = ((((((((d) >> (8))) & 0xff)) - (((((b) >> (8))) & 0xff)))) >>> 0);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((r) & 0xff)) & (128))) >> (4))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((((((((d) >> (8))) & 0xff)) ^ (((((b) >> (8))) & 0xff)))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        r = ((((d) - (b))) >>> 0);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_cpx_im() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        b = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) >>> 0);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        d = ((this.m_x.w) >>> 0);
        r = ((((d) - (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        return 0;
    }
    method_bsr() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + ((((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16) >> 16)))) & 0xffff);
        return 0;
    }
    method_lds_im() {
        this.m_s.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_s.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_s.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_sts_im() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_s.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_s.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = ((this.m_pc.w) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.method_WM16(this.m_ea.w, this.m_s.w);
        return 0;
    }
    method_suba_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.h) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_cmpa_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.h) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        return 0;
    }
    method_sbca_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.h) - (t))) - (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_subd_di() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_d.w) >>> 0);
        r = ((((d) - (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_d.w = ((r) & 0xffff);
        return 0;
    }
    method_anda_di() {
        let t = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_bita_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((this.m_d.b.h) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_lda_di() {
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.h = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_sta_di() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (this.m_d.b.h) & 0xff), 0);
        return 0;
    }
    method_eora_di() {
        let t = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adca_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.h) + (t))) + (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_ora_di() {
        let t = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adda_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.h) + (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_cmpx_di() {
        let r = ((0) >>> 0);
        let d = ((0) >>> 0);
        let b = ((0) >>> 0);
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_x.w) >>> 0);
        r = ((((((((d) >> (8))) & 0xff)) - (((((b) >> (8))) & 0xff)))) >>> 0);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((r) & 0xff)) & (128))) >> (4))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((((((((d) >> (8))) & 0xff)) ^ (((((b) >> (8))) & 0xff)))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        r = ((((d) - (b))) >>> 0);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_cpx_di() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_x.w) >>> 0);
        r = ((((d) - (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        return 0;
    }
    method_jsr_di() {
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        this.m_pc.w = ((this.m_ea.w) & 0xffff);
        return 0;
    }
    method_lds_di() {
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_s.w = ((this.method_RM16(this.m_ea.w)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_s.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_s.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_sts_di() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_s.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_s.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.method_WM16(this.m_ea.w, this.m_s.w);
        return 0;
    }
    method_suba_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.h) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_cmpa_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.h) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        return 0;
    }
    method_sbca_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.h) - (t))) - (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_subd_ix() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_d.w) >>> 0);
        r = ((((d) - (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_d.w = ((r) & 0xffff);
        return 0;
    }
    method_anda_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_bita_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((this.m_d.b.h) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_lda_ix() {
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.h = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_sta_ix() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (this.m_d.b.h) & 0xff), 0);
        return 0;
    }
    method_eora_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adca_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.h) + (t))) + (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_ora_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adda_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.h) + (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_cmpx_ix() {
        let r = ((0) >>> 0);
        let d = ((0) >>> 0);
        let b = ((0) >>> 0);
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_x.w) >>> 0);
        r = ((((((((d) >> (8))) & 0xff)) - (((((b) >> (8))) & 0xff)))) >>> 0);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((r) & 0xff)) & (128))) >> (4))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((((((((d) >> (8))) & 0xff)) ^ (((((b) >> (8))) & 0xff)))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        r = ((((d) - (b))) >>> 0);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_cpx_ix() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_x.w) >>> 0);
        r = ((((d) - (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        return 0;
    }
    method_jsr_ix() {
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        this.m_pc.w = ((this.m_ea.w) & 0xffff);
        return 0;
    }
    method_lds_ix() {
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_s.w = ((this.method_RM16(this.m_ea.w)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_s.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_s.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_sts_ix() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_s.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_s.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.method_WM16(this.m_ea.w, this.m_s.w);
        return 0;
    }
    method_suba_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.h) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_cmpa_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.h) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        return 0;
    }
    method_sbca_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.h) - (t))) - (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_subd_ex() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_d.w) >>> 0);
        r = ((((d) - (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_d.w = ((r) & 0xffff);
        return 0;
    }
    method_anda_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_bita_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((this.m_d.b.h) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_lda_ex() {
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_d.b.h = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_sta_ex() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (this.m_d.b.h) & 0xff), 0);
        return 0;
    }
    method_eora_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adca_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.h) + (t))) + (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_ora_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.h = ((((this.m_d.b.h) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.h) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.h) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adda_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.h) + (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.h = ((r) & 0xff);
        return 0;
    }
    method_cmpx_ex() {
        let r = ((0) >>> 0);
        let d = ((0) >>> 0);
        let b = ((0) >>> 0);
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_x.w) >>> 0);
        r = ((((((((d) >> (8))) & 0xff)) - (((((b) >> (8))) & 0xff)))) >>> 0);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((r) & 0xff)) & (128))) >> (4))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((((((((d) >> (8))) & 0xff)) ^ (((((b) >> (8))) & 0xff)))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        r = ((((d) - (b))) >>> 0);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_cpx_ex() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_x.w) >>> 0);
        r = ((((d) - (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        return 0;
    }
    method_jsr_ex() {
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.l) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.h) & 0xff), 0);
        this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
        this.m_pc.w = ((this.m_ea.w) & 0xffff);
        return 0;
    }
    method_lds_ex() {
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_s.w = ((this.method_RM16(this.m_ea.w)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_s.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_s.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_sts_ex() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_s.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_s.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.method_WM16(this.m_ea.w, this.m_s.w);
        return 0;
    }
    method_subb_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((this.m_d.b.l) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_cmpb_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((this.m_d.b.l) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        return 0;
    }
    method_sbcb_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((((this.m_d.b.l) - (t))) - (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_addd_im() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        b = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) >>> 0);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        d = ((this.m_d.w) >>> 0);
        r = ((((d) + (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_d.w = ((r) & 0xffff);
        return 0;
    }
    method_andb_im() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.l = ((((this.m_d.b.l) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_bitb_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((this.m_d.b.l) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_ldb_im() {
        this.m_d.b.l = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_stb_im() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = ((((() => { const previous = this.m_pc.w; this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff); return previous; })())) & 0xffff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (this.m_d.b.l) & 0xff), 0);
        return 0;
    }
    method_eorb_im() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.l = ((((this.m_d.b.l) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adcb_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((((this.m_d.b.l) + (t))) + (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_orb_im() {
        let t = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.l = ((((this.m_d.b.l) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_addb_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((this.m_d.b.l) + (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_ldd_im() {
        this.m_d.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_d.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_std_im() {
        this.m_ea.w = ((this.m_pc.w) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_d.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.method_WM16(this.m_ea.w, this.m_d.w);
        return 0;
    }
    method_ldx_im() {
        this.m_x.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_x.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_stx_im() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_x.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = ((this.m_pc.w) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.method_WM16(this.m_ea.w, this.m_x.w);
        return 0;
    }
    method_subb_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.l) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_cmpb_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.l) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        return 0;
    }
    method_sbcb_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.l) - (t))) - (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_addd_di() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_d.w) >>> 0);
        r = ((((d) + (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_d.w = ((r) & 0xffff);
        return 0;
    }
    method_andb_di() {
        let t = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_bitb_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((this.m_d.b.l) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_ldb_di() {
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.l = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_stb_di() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (this.m_d.b.l) & 0xff), 0);
        return 0;
    }
    method_eorb_di() {
        let t = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adcb_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.l) + (t))) + (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_orb_di() {
        let t = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_addb_di() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.l) + (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_ldd_di() {
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.w = ((this.method_RM16(this.m_ea.w)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_d.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_std_di() {
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_d.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.method_WM16(this.m_ea.w, this.m_d.w);
        return 0;
    }
    method_ldx_di() {
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_x.w = ((this.method_RM16(this.m_ea.w)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_x.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_stx_di() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_x.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.method_WM16(this.m_ea.w, this.m_x.w);
        return 0;
    }
    method_subb_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.l) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_cmpb_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.l) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        return 0;
    }
    method_sbcb_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.l) - (t))) - (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_addd_ix() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_d.w) >>> 0);
        r = ((((d) + (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_d.w = ((r) & 0xffff);
        return 0;
    }
    method_andb_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_bitb_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((this.m_d.b.l) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_ldb_ix() {
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.b.l = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_stb_ix() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (this.m_d.b.l) & 0xff), 0);
        return 0;
    }
    method_eorb_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adcb_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.l) + (t))) + (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_orb_ix() {
        let t = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_addb_ix() {
        let t = 0;
        let r = 0;
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.l) + (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_ldd_ix() {
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_d.w = ((this.method_RM16(this.m_ea.w)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_d.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adcx_im() {
        let t = 0;
        let r = 0;
        t = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        r = ((((this.m_x.w) + (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_x.w) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_x.w) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_x.w = ((r) & 0xffff);
        return 0;
    }
    method_std_ix() {
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_d.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.method_WM16(this.m_ea.w, this.m_d.w);
        return 0;
    }
    method_ldx_ix() {
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.m_x.w = ((this.method_RM16(this.m_ea.w)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_x.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_stx_ix() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_x.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = ((((this.m_x.w) + ((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff);
        this.method_WM16(this.m_ea.w, this.m_x.w);
        return 0;
    }
    method_subb_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.l) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_cmpb_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.l) - (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        return 0;
    }
    method_sbcb_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.l) - (t))) - (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_addd_ex() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_d.w) >>> 0);
        r = ((((d) + (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_d.w = ((r) & 0xffff);
        return 0;
    }
    method_andb_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_bitb_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        r = ((((this.m_d.b.l) & (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_ldb_ex() {
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_d.b.l = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_stb_ex() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        (this.writeMemory((this.m_ea.w) & 0xffff, (this.m_d.b.l) & 0xff), 0);
        return 0;
    }
    method_eorb_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) ^ (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_adcb_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((((this.m_d.b.l) + (t))) + (((this.m_cc) & (1))))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_orb_ex() {
        let t = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_d.b.l = ((((this.m_d.b.l) | (t))) & 0xff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.b.l) & (128))) >> (4))))) & 0xff);
        if (((((this.m_d.b.l) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_addb_ex() {
        let t = 0;
        let r = 0;
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        t = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xffff);
        r = ((((this.m_d.b.l) + (t))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (208))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (128))) >> (4))))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((this.m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >> (1))))) & (128))) >> (6))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (256))) >> (8))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((((((this.m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        this.m_d.b.l = ((r) & 0xff);
        return 0;
    }
    method_ldd_ex() {
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_d.w = ((this.method_RM16(this.m_ea.w)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_d.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_addx_ex() {
        let r = 0;
        let d = 0;
        let b = ((0) >>> 0);
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        b = ((this.method_RM16(this.m_ea.w)) >>> 0);
        d = ((this.m_x.w) >>> 0);
        r = ((((d) + (b))) >>> 0);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (32768))) >> (12))))) & 0xff);
        if (((((r) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_cc = ((((this.m_cc) | (((((((((((d) ^ (b))) ^ (r))) ^ (((r) >> (1))))) & (32768))) >> (14))))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((r) & (65536))) >> (16))))) & 0xff);
        this.m_x.w = ((r) & 0xffff);
        return 0;
    }
    method_std_ex() {
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_d.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_d.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.method_WM16(this.m_ea.w, this.m_d.w);
        return 0;
    }
    method_ldx_ex() {
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.m_x.w = ((this.method_RM16(this.m_ea.w)) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_x.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_stx_ex() {
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((this.m_x.w) & (32768))) >> (12))))) & 0xff);
        if (((((this.m_x.w) & 0xffff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        this.m_ea.w = (((((((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) << (8))) | ((this.readMemory((((((this.m_pc.w) + (1))) & (65535))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        this.method_WM16(this.m_ea.w, this.m_x.w);
        return 0;
    }
    method_btst_ix() {
        let val = 0;
        let mask = (((this.readMemory((this.m_pc.w) & 0xffff) & 0xff)) & 0xff);
        this.m_ea.w = ((((this.m_x.w) + ((this.readMemory((((this.m_pc.w) + (1))) & 0xffff) & 0xff)))) & 0xffff);
        this.m_pc.w = ((((this.m_pc.w) + (2))) & 0xffff);
        val = (((((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & (mask))) & 0xff);
        this.m_cc = ((((this.m_cc) & (240))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((val) & (128))) >> (4))))) & 0xff);
        if (((((val) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        return 0;
    }
    method_stx_nsc() {
        this.m_ea.w = ((((() => { const previous = this.m_pc.w; this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff); return previous; })())) & 0xffff);
        let val = (((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)) & 0xff);
        this.m_ea.w = ((((() => { const previous = this.m_pc.w; this.m_pc.w = ((((this.m_pc.w) + (1))) & 0xffff); return previous; })())) & 0xffff);
        this.m_ea.w = ((((this.m_x.w) + ((this.readMemory((this.m_ea.w) & 0xffff) & 0xff)))) & 0xffff);
        this.m_cc = ((((this.m_cc) & (241))) & 0xff);
        this.m_cc = ((((this.m_cc) | (((((val) & (128))) >> (4))))) & 0xff);
        if (((((val) & 0xff)) ? 0 : 1)) {
            this.m_cc = ((((this.m_cc) | (4))) & 0xff);
        }
        (this.writeMemory((this.m_ea.w) & 0xffff, (val) & 0xff), 0);
        return 0;
    }
    method_RM16(Addr = 0) {
        let result = (((((this.readMemory((Addr) & 0xffff) & 0xff)) << (8))) >>> 0);
        return ((result) | ((this.readMemory((((((Addr) + (1))) & (65535))) & 0xffff) & 0xff)));
        return 0;
    }
    method_WM16(Addr = 0, p = 0) {
        (this.writeMemory((Addr) & 0xffff, (((p >>> 8) & 0xff)) & 0xff), 0);
        (this.writeMemory((((((Addr) + (1))) & (65535))) & 0xffff, (((p) & 0xff)) & 0xff), 0);
        return 0;
    }
    method_enter_interrupt(message = 0, irq_vector = 0) {
        let cycles_to_eat = ((0) | 0);
        0;
        if (((this.m_wai_state) & (8))) {
            cycles_to_eat = ((4) | 0);
            this.m_wai_state = ((((this.m_wai_state) & ((~8)))) & 0xff);
        }
        else {
            (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.l) & 0xff), 0);
            this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
            (this.writeMemory((this.m_s.w) & 0xffff, (this.m_pc.b.h) & 0xff), 0);
            this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
            (this.writeMemory((this.m_s.w) & 0xffff, (this.m_x.b.l) & 0xff), 0);
            this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
            (this.writeMemory((this.m_s.w) & 0xffff, (this.m_x.b.h) & 0xff), 0);
            this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
            (this.writeMemory((this.m_s.w) & 0xffff, (this.m_d.b.h) & 0xff), 0);
            this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
            (this.writeMemory((this.m_s.w) & 0xffff, (this.m_d.b.l) & 0xff), 0);
            this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
            (this.writeMemory((this.m_s.w) & 0xffff, (this.m_cc) & 0xff), 0);
            this.m_s.w = ((((this.m_s.w) - (1))) & 0xffff);
            cycles_to_eat = ((12) | 0);
        }
        this.m_cc = ((((this.m_cc) | (16))) & 0xff);
        this.m_pc.w = ((this.method_RM16(irq_vector)) & 0xffff);
        this.method_increment_counter(cycles_to_eat);
        return 0;
    }
    method_check_irq_lines() {
        if (this.m_nmi_pending) {
            this.m_wai_state = ((((this.m_wai_state) & ((~16)))) & 0xff);
            this.m_nmi_pending = ((0) & 0xff);
            this.method_enter_interrupt(0, 65532);
        }
        else {
            if (this.method_check_irq1_enabled()) {
                this.m_wai_state = ((((this.m_wai_state) & ((~16)))) & 0xff);
                if (((((this.m_cc) & (16))) ? 0 : 1)) {
                    this.acknowledgeIrq(0);
                    this.method_enter_interrupt(0, 65528);
                }
            }
            else {
                this.method_check_irq2();
            }
        }
        return 0;
    }
    method_check_irq1_enabled() {
        return ((Number(this.m_irq_state[0]) !== Number(0)) ? 1 : 0);
        return 0;
    }
    method_increment_counter(amount = 0) {
        this.cycles = ((this.cycles) + (amount));
        return 0;
    }
    method_check_irq2() {
        return 0;
    }
    method_execute_one() {
        return 0;
    }
    method_eat_cycles() {
        this.cycles = ((this.cycles) + (1));
        return 0;
    }
    method_take_trap() {
        return 0;
    }
}
export const cpu = {
    type: "NSC8105",
    summary: { "opcodes": 256, "compiledOpcodes": 256, "methods": 259, "compiledMethods": 259, "diagnostics": 0 },
    create: (bus) => new GeneratedNSC8105(bus),
};
export default cpu;
