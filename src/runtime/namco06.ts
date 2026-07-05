// Namco 06xx bus interface: multiplexes up to 4 custom chips onto the main
// CPU's data bus and paces transfers by pulsing NMIs. Transpiled from
// src/mame/namco/namco06.cpp.
//
// Control register: bits 0-3 chip select (active high), bit 4 read/!write,
// bits 5-7 clock divider (0 = timer stopped).

export interface Namco06Slot {
  read?: () => number;
  write?: (data: number) => void;
  chipSelect?: (state: number) => void;
}

export class Namco06 {
  private control = 0;
  private slots: (Namco06Slot | null)[];
  private nmiCallback: () => void;
  /** 06xx input clock in Hz (galaga: 48000) */
  readonly clock: number;
  /** CPU cycles between NMI pulses when active; 0 when idle (set by machine) */
  private cpuCyclesPerNmi = 0;
  private cpuClock: number;
  private cycleAccum = 0;
  private readStretch = false;

  constructor(clock: number, cpuClock: number, nmi: () => void, slots: (Namco06Slot | null)[]) {
    this.clock = clock;
    this.cpuClock = cpuClock;
    this.nmiCallback = nmi;
    this.slots = [slots[0] ?? null, slots[1] ?? null, slots[2] ?? null, slots[3] ?? null];
  }

  reset(): void {
    this.control = 0;
    this.cpuCyclesPerNmi = 0;
    this.cycleAccum = 0;
    this.readStretch = false;
  }

  ctrlRead(): number { return this.control; }

  ctrlWrite(data: number): void {
    this.control = data & 0xff;
    const shifts = (this.control & 0xe0) >> 5;
    if (shifts === 0) {
      this.cpuCyclesPerNmi = 0;
      this.cycleAccum = 0;
      for (const s of this.slots) s?.chipSelect?.(0);
    } else {
      // NMI fires once per divided-clock period while active
      const freq = this.clock / (1 << shifts);
      this.cpuCyclesPerNmi = Math.round(this.cpuClock / freq);
      this.cycleAccum = 0;
      // first NMI of a read burst is suppressed to give the chip a cycle
      this.readStretch = (this.control & 0x10) !== 0;
    }
  }

  dataRead(): number {
    if (!(this.control & 0x10)) return 0; // read in write mode
    let result = 0xff;
    if (this.control & 1) result &= this.slots[0]?.read?.() ?? 0xff;
    if (this.control & 2) result &= this.slots[1]?.read?.() ?? 0xff;
    if (this.control & 4) result &= this.slots[2]?.read?.() ?? 0xff;
    if (this.control & 8) result &= this.slots[3]?.read?.() ?? 0xff;
    return result;
  }

  dataWrite(data: number): void {
    if (this.control & 0x10) return; // write in read mode
    if (this.control & 1) this.slots[0]?.write?.(data);
    if (this.control & 2) this.slots[1]?.write?.(data);
    if (this.control & 4) this.slots[2]?.write?.(data);
    if (this.control & 8) this.slots[3]?.write?.(data);
  }

  /** advance by CPU cycles; pulses NMI to the main CPU at the divided rate */
  tick(cpuCycles: number): void {
    if (!this.cpuCyclesPerNmi) return;
    this.cycleAccum += cpuCycles;
    while (this.cycleAccum >= this.cpuCyclesPerNmi) {
      this.cycleAccum -= this.cpuCyclesPerNmi;
      for (let i = 0; i < 4; i++) {
        if (this.control & (1 << i)) this.slots[i]?.chipSelect?.(1);
      }
      if (this.readStretch) this.readStretch = false;
      else this.nmiCallback();
    }
  }

  snapshot() {
    return { control: this.control, nmiActive: this.cpuCyclesPerNmi > 0 };
  }
}
