// NES cartridge slot: the five first-cut PCB families (issue #17).
//   nrom  (iNES mapper 0)  — no banking (Super Mario Bros, Donkey Kong)
//   uxrom (iNES mapper 2)  — 16K PRG bank at $8000 (Mega Man, Contra)
//   cnrom (iNES mapper 3)  — 8K CHR bank (Gradius, Arkanoid)
//   sxrom (iNES mapper 1)  — MMC1 serial-loaded control (Zelda, Metroid)
//   txrom (iNES mapper 4)  — MMC3 bank regs + scanline IRQ (SMB3, Kirby)
//
// Modeled on MAME src/devices/bus/nes/{nes_slot,nxrom,mmc1,mmc3}.cpp — the
// device_nes_cart_interface surface (read_m/read_h/write_m/write_h, chr_r/w,
// nt_r/w, hblank scanline hook) flattened into one NesCart interface. The
// cart owns CIRAM (2K, 4K for four-screen) and the nametable mirroring map,
// exactly as MAME keeps CIRAM outside the PPU.
//
// Deliberate deviations (documented, all cover rare titles only):
// - UxROM/CNROM bus conflicts (write value ANDed with ROM byte) not modeled.
// - MMC1 consecutive-cycle write ignore not modeled (needs CPU cycle stamps).
// - MMC3 IRQ uses the scanline HLE (MAME's own hblank_irq counting), not
//   A12-edge counting — mid-scanline pattern-table swaps can be a line off.
// - Battery WRAM is not persisted yet (cfg.battery is carried for later).
/** iNES mapper number -> MAME slot-device option name (device-library fact). */
export const MAPPER_SLOTS = {
    0: 'nrom', 1: 'sxrom', 2: 'uxrom', 3: 'cnrom', 4: 'txrom',
};
class NesCartBase {
    prg;
    chr;
    chrWritable;
    prgRam = new Uint8Array(0x2000);
    wramEnabled = true;
    wramWritable = true;
    ciram;
    /** per-1K-nametable offset into ciram, in 0x400 pages */
    ntMap = new Int32Array(4);
    /** 8K PRG slot offsets for $8000/$A000/$C000/$E000 */
    prgOffs = new Int32Array(4);
    /** 1K CHR slot offsets */
    chrOffs = new Int32Array(8);
    fourScreen;
    irqLine = false;
    constructor(cfg) {
        this.prg = cfg.prg;
        this.chrWritable = cfg.chr.length === 0;
        this.chr = this.chrWritable ? new Uint8Array(0x2000) : cfg.chr;
        this.fourScreen = cfg.mirroring === 'four';
        this.ciram = new Uint8Array(this.fourScreen ? 0x1000 : 0x800);
        this.setMirroring(cfg.mirroring);
        this.prg16(0, 0);
        this.prg16(1, this.prgBanks16 - 1); // 16K carts mirror; 32K get the top half
        this.chr8(0);
    }
    get prgBanks8() { return Math.max(1, this.prg.length >> 13); }
    get prgBanks16() { return Math.max(1, this.prg.length >> 14); }
    get chrBanks1() { return Math.max(1, this.chr.length >> 10); }
    prg8(slot, bank) {
        this.prgOffs[slot] = (((bank % this.prgBanks8) + this.prgBanks8) % this.prgBanks8) << 13;
    }
    prg16(slot, bank) {
        const b = ((bank % this.prgBanks16) + this.prgBanks16) % this.prgBanks16;
        this.prg8(slot * 2, b * 2);
        this.prg8(slot * 2 + 1, b * 2 + 1);
    }
    prg32(bank) {
        this.prg16(0, bank * 2);
        this.prg16(1, bank * 2 + 1);
    }
    chr1(slot, bank) {
        this.chrOffs[slot] = (((bank % this.chrBanks1) + this.chrBanks1) % this.chrBanks1) << 10;
    }
    chr2(slot, bank) {
        this.chr1(slot * 2, bank * 2);
        this.chr1(slot * 2 + 1, bank * 2 + 1);
    }
    chr4(slot, bank) {
        for (let i = 0; i < 4; i++)
            this.chr1(slot * 4 + i, bank * 4 + i);
    }
    chr8(bank) {
        for (let i = 0; i < 8; i++)
            this.chr1(i, bank * 8 + i);
    }
    setMirroring(mode) {
        const maps = {
            horizontal: [0, 0, 1, 1],
            vertical: [0, 1, 0, 1],
            single0: [0, 0, 0, 0],
            single1: [1, 1, 1, 1],
            four: [0, 1, 2, 3],
        };
        this.ntMap.set(maps[mode]);
    }
    cpuRead(addr) {
        if (addr >= 0x8000)
            return this.prg[this.prgOffs[(addr >> 13) & 3] + (addr & 0x1fff)];
        if (addr >= 0x6000)
            return this.wramEnabled ? this.prgRam[addr & 0x1fff] : 0xff;
        return 0xff; // $4020-$5FFF open bus (no expansion hardware in these PCBs)
    }
    cpuWrite(addr, data) {
        if (addr >= 0x8000)
            this.prgWrite(addr, data);
        else if (addr >= 0x6000 && this.wramEnabled && this.wramWritable)
            this.prgRam[addr & 0x1fff] = data;
    }
    /** mapper register space ($8000-$FFFF) — overridden per PCB */
    prgWrite(_addr, _data) { }
    chrRead(addr) {
        return this.chr[this.chrOffs[(addr >> 10) & 7] + (addr & 0x3ff)];
    }
    chrWrite(addr, data) {
        if (this.chrWritable)
            this.chr[this.chrOffs[(addr >> 10) & 7] + (addr & 0x3ff)] = data;
    }
    ntRead(addr) {
        return this.ciram[this.ntMap[(addr >> 10) & 3] * 0x400 + (addr & 0x3ff)];
    }
    ntWrite(addr, data) {
        this.ciram[this.ntMap[(addr >> 10) & 3] * 0x400 + (addr & 0x3ff)] = data;
    }
    scanlineTick() { }
    irqAsserted() { return this.irqLine; }
    reset() {
        this.irqLine = false;
        this.prg16(0, 0);
        this.prg16(1, this.prgBanks16 - 1);
        this.chr8(0);
    }
    snapshot() {
        return { prgOffs: [...this.prgOffs], chrOffs: [...this.chrOffs] };
    }
}
// --- nrom (mapper 0) ---------------------------------------------------------
class NromCart extends NesCartBase {
}
// --- uxrom (mapper 2): 16K PRG bank at $8000, last bank fixed ----------------
class UxromCart extends NesCartBase {
    prgWrite(_addr, data) {
        this.prg16(0, data);
    }
}
// --- cnrom (mapper 3): 8K CHR bank --------------------------------------------
class CnromCart extends NesCartBase {
    prgWrite(_addr, data) {
        this.chr8(data);
    }
}
// --- sxrom / MMC1 (mapper 1) ---------------------------------------------------
class Mmc1Cart extends NesCartBase {
    shift = 0;
    count = 0;
    control = 0x0c; // prg mode 3 (fix last), 8K chr — power-on state
    chrReg0 = 0;
    chrReg1 = 0;
    prgReg = 0;
    constructor(cfg) {
        super(cfg);
        this.apply();
    }
    prgWrite(addr, data) {
        if (data & 0x80) {
            this.shift = 0;
            this.count = 0;
            this.control |= 0x0c;
            this.apply();
            return;
        }
        this.shift |= (data & 1) << this.count;
        if (++this.count < 5)
            return;
        const value = this.shift;
        this.shift = 0;
        this.count = 0;
        switch ((addr >> 13) & 3) {
            case 0:
                this.control = value;
                break;
            case 1:
                this.chrReg0 = value;
                break;
            case 2:
                this.chrReg1 = value;
                break;
            case 3:
                this.prgReg = value;
                break;
        }
        this.apply();
    }
    apply() {
        const MIRROR = ['single0', 'single1', 'vertical', 'horizontal'];
        if (!this.fourScreen)
            this.setMirroring(MIRROR[this.control & 3]);
        const prgMode = (this.control >> 2) & 3;
        const bank = this.prgReg & 0x0f;
        if (prgMode < 2)
            this.prg32(bank >> 1);
        else if (prgMode === 2) {
            this.prg16(0, 0);
            this.prg16(1, bank);
        }
        else {
            this.prg16(0, bank);
            this.prg16(1, this.prgBanks16 - 1);
        }
        if (this.control & 0x10) {
            this.chr4(0, this.chrReg0);
            this.chr4(1, this.chrReg1);
        }
        else
            this.chr8(this.chrReg0 >> 1);
        this.wramEnabled = (this.prgReg & 0x10) === 0;
    }
    reset() {
        super.reset();
        this.shift = 0;
        this.count = 0;
        this.control = 0x0c;
        this.chrReg0 = 0;
        this.chrReg1 = 0;
        this.prgReg = 0;
        this.wramEnabled = true;
        this.apply();
    }
    snapshot() {
        return { ...super.snapshot(), control: this.control, prgReg: this.prgReg };
    }
}
// --- txrom / MMC3 (mapper 4) ----------------------------------------------------
class Mmc3Cart extends NesCartBase {
    bankSelect = 0;
    banks = new Int32Array(8);
    irqLatch = 0;
    irqCounter = 0;
    irqReload = false;
    irqEnabled = false;
    constructor(cfg) {
        super(cfg);
        this.banks.set([0, 2, 4, 5, 6, 7, 0, 1]);
        this.apply();
    }
    prgWrite(addr, data) {
        const even = (addr & 1) === 0;
        switch (addr & 0x6000) {
            case 0x0000: // $8000/$8001
                if (even)
                    this.bankSelect = data;
                else
                    this.banks[this.bankSelect & 7] = data;
                this.apply();
                break;
            case 0x2000: // $A000/$A001
                if (even) {
                    if (!this.fourScreen)
                        this.setMirroring(data & 1 ? 'horizontal' : 'vertical');
                }
                else {
                    this.wramEnabled = (data & 0x80) !== 0;
                    this.wramWritable = (data & 0x40) === 0;
                }
                break;
            case 0x4000: // $C000/$C001
                if (even)
                    this.irqLatch = data;
                else
                    this.irqReload = true;
                break;
            case 0x6000: // $E000/$E001
                if (even) {
                    this.irqEnabled = false;
                    this.irqLine = false;
                }
                else
                    this.irqEnabled = true;
                break;
        }
    }
    apply() {
        const last = this.prgBanks8 - 1;
        if (this.bankSelect & 0x40) {
            this.prg8(0, last - 1);
            this.prg8(1, this.banks[7]);
            this.prg8(2, this.banks[6]);
            this.prg8(3, last);
        }
        else {
            this.prg8(0, this.banks[6]);
            this.prg8(1, this.banks[7]);
            this.prg8(2, last - 1);
            this.prg8(3, last);
        }
        const inv = this.bankSelect & 0x80 ? 4 : 0;
        // 2×2K banks (regs 0,1) + 4×1K banks (regs 2-5), swapped halves when inverted
        this.chr1(0 ^ inv, this.banks[0] & 0xfe);
        this.chr1(1 ^ inv, (this.banks[0] & 0xfe) + 1);
        this.chr1(2 ^ inv, this.banks[1] & 0xfe);
        this.chr1(3 ^ inv, (this.banks[1] & 0xfe) + 1);
        this.chr1(4 ^ inv, this.banks[2]);
        this.chr1(5 ^ inv, this.banks[3]);
        this.chr1(6 ^ inv, this.banks[4]);
        this.chr1(7 ^ inv, this.banks[5]);
    }
    scanlineTick() {
        if (this.irqCounter === 0 || this.irqReload) {
            this.irqCounter = this.irqLatch;
            this.irqReload = false;
        }
        else {
            this.irqCounter--;
        }
        if (this.irqCounter === 0 && this.irqEnabled)
            this.irqLine = true;
    }
    reset() {
        super.reset();
        this.bankSelect = 0;
        this.banks.set([0, 2, 4, 5, 6, 7, 0, 1]);
        this.irqLatch = 0;
        this.irqCounter = 0;
        this.irqReload = false;
        this.irqEnabled = false;
        this.wramEnabled = true;
        this.wramWritable = true;
        this.apply();
    }
    snapshot() {
        return {
            ...super.snapshot(),
            bankSelect: this.bankSelect, banks: [...this.banks],
            irq: { latch: this.irqLatch, counter: this.irqCounter, enabled: this.irqEnabled, line: this.irqLine },
        };
    }
}
const MAPPER_CLASSES = {
    0: NromCart, 1: Mmc1Cart, 2: UxromCart, 3: CnromCart, 4: Mmc3Cart,
};
export function createCart(cfg) {
    const cls = MAPPER_CLASSES[cfg.mapper];
    if (!cls) {
        throw new Error(`unsupported NES mapper ${cfg.mapper}${MAPPER_SLOTS[cfg.mapper] ? ` (${MAPPER_SLOTS[cfg.mapper]})` : ''}`);
    }
    return new cls(cfg);
}
