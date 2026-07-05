// 74LS259 8-bit addressable latch (device library).
// MAME maps it with write_d0: offset selects Q0..Q7, data bit 0 is the value.

export type LatchCallback = (state: number) => void;

export class LS259 {
  private q = 0;
  private callbacks: (LatchCallback | null)[] = [null, null, null, null, null, null, null, null];

  onQ(index: number, cb: LatchCallback): this {
    const prev = this.callbacks[index];
    this.callbacks[index] = prev
      ? (state) => { prev(state); cb(state); }   // MAME .append() semantics
      : cb;
    return this;
  }

  writeD0(offset: number, data: number): void {
    const bit = data & 1;
    const mask = 1 << (offset & 7);
    const old = this.q;
    this.q = bit ? (old | mask) : (old & ~mask);
    if (((old >> (offset & 7)) & 1) !== bit) this.callbacks[offset & 7]?.(bit);
  }

  /** current latch state Q7..Q0 */
  get value(): number { return this.q; }
  bit(index: number): number { return (this.q >> (index & 7)) & 1; }

  reset(): void {
    for (let i = 0; i < 8; i++) this.writeD0(i, 0);
  }
}
