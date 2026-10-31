/**
 * MAME's `attotime`: time in whole attoseconds, truncated where MAME truncates.
 *
 * A frame is about 1.6e16 attoseconds, past the 2^53 a double holds exactly, so
 * a time is two doubles: whole nanoseconds and the attoseconds left over. It is
 * mutable and updated in place because the scheduler does this on every round
 * of every processor; a BigInt allocates, and a Lagrange Point runs 30,000
 * rounds a frame.
 */

const ATTOS_PER_NANO = 1e9;
const ATTOS_PER_SECOND = 1e18;
/** Nanoseconds whose attoseconds still fit in a double exactly. */
const EXACT_NANOS = Math.floor(Number.MAX_SAFE_INTEGER / ATTOS_PER_NANO) - 1;

export class Attotime {
  nanos = 0;
  attos = 0;

  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] {
    return ['nanos', 'attos'];
  }

  set(other: Attotime): this {
    this.nanos = other.nanos;
    this.attos = other.attos;
    return this;
  }

  clear(): this {
    this.nanos = 0;
    this.attos = 0;
    return this;
  }

  /** Add whole attoseconds; `attos` may be negative but must be a safe integer. */
  add(attos: number): this {
    const whole = Math.floor(attos / ATTOS_PER_NANO);
    this.nanos += whole;
    this.attos += attos - whole * ATTOS_PER_NANO;
    this.normalize();
    return this;
  }

  addTime(other: Attotime): this {
    this.nanos += other.nanos;
    this.attos += other.attos;
    this.normalize();
    return this;
  }

  /** Add `count` of a period: MAME `attotime(0, m_attoseconds_per_cycle * ran)`. */
  addPeriods(count: number, period: AttoPeriod): this {
    this.nanos += count * period.nanos;
    this.attos += count * period.attos;
    this.normalize();
    return this;
  }

  /** Move to `base + count * period`. */
  setPeriodsFrom(base: Attotime, count: number, period: AttoPeriod): this {
    return this.set(base).addPeriods(count, period);
  }

  before(other: Attotime): boolean {
    return this.nanos < other.nanos || (this.nanos === other.nanos && this.attos < other.attos);
  }

  equals(other: Attotime): boolean {
    return this.nanos === other.nanos && this.attos === other.attos;
  }

  /** `this - from` in attoseconds, as a double: exact below 2^53. */
  since(from: Attotime): number {
    return (this.nanos - from.nanos) * ATTOS_PER_NANO + (this.attos - from.attos);
  }

  /** Seconds as a double, for the code that keeps time in floating point. */
  get seconds(): number {
    return this.nanos * 1e-9 + this.attos * 1e-18;
  }

  /** The exact value, for the rare round too long for a double and for tests. */
  get exact(): bigint {
    return BigInt(this.nanos) * 1_000_000_000n + BigInt(this.attos);
  }

  setExact(value: bigint): this {
    const nanos = value / 1_000_000_000n;
    this.nanos = Number(nanos);
    this.attos = Number(value - nanos * 1_000_000_000n);
    return this;
  }

  private normalize(): void {
    const carry = Math.floor(this.attos / ATTOS_PER_NANO);
    if (carry !== 0) {
      this.nanos += carry;
      this.attos -= carry * ATTOS_PER_NANO;
    }
  }
}

/**
 * A fixed length of time that is added and divided by: a processor's cycle or
 * a screen's line. `shift` and `divisor` are MAME's `m_divshift`/`m_divisor`,
 * set up in `device_execute_interface::clock_changed`.
 */
export class AttoPeriod {
  readonly nanos: number;
  readonly attos: number;
  readonly total: number;
  private readonly divide: number;
  private readonly divisor: number;

  /** Save-state roots (machine-state.ts): a clock can change at run time. */
  stateKeys(): readonly string[] {
    return ['nanos', 'attos', 'total', 'divide', 'divisor'];
  }

  /** `total` is a whole number of attoseconds, no more than 2^53. */
  constructor(total: number) {
    this.total = total;
    this.nanos = Math.floor(total / ATTOS_PER_NANO);
    this.attos = total - this.nanos * ATTOS_PER_NANO;
    let attos = total;
    let divide = 1;
    while (attos >= 2 ** 31) {
      divide *= 2;
      attos = Math.floor(attos / 2);
    }
    this.divide = divide;
    this.divisor = attos;
  }

  /**
   * How many periods fit between two times, as `timeslice()` works it out:
   * `divu_64x32(delta >> m_divshift, m_divisor)`, and none at all when the
   * delta is shorter than one period. The shift drops low bits of the divisor
   * as well, so a delta just short of a whole number of periods can round up.
   * `slop` attoseconds count towards the delta; see the frame runner's timers.
   */
  within(from: Attotime, to: Attotime, slop = 0): number {
    const nanos = to.nanos - from.nanos;
    if (nanos > EXACT_NANOS) {
      const delta = to.exact - from.exact + BigInt(slop);
      return Number((delta >> BigInt(Math.log2(this.divide))) / BigInt(this.divisor));
    }
    const delta = nanos * ATTOS_PER_NANO + (to.attos - from.attos) + slop;
    if (delta < this.total) return 0;
    const shifted = Math.floor(delta / this.divide);
    const quotient = Math.floor(shifted / this.divisor);
    // A quotient rounded up to an integer it does not reach.
    return quotient * this.divisor > shifted ? quotient - 1 : quotient;
  }
}

/** MAME `HZ_TO_ATTOSECONDS`, for a rate in hertz. */
export function hzToAttoseconds(hz: number): number {
  if (Number.isSafeInteger(hz) && hz > 0) return Number(1_000_000_000_000_000_000n / BigInt(hz));
  return Math.floor(ATTOS_PER_SECOND / hz);
}

/** Whole attoseconds in a duration held in seconds, near a value MAME derives exactly. */
export function secondsToAttoseconds(seconds: number): number {
  // A product of exact parts lands a rounding error either side of its value;
  // only the side below it would truncate to the wrong integer.
  return Math.floor(seconds * ATTOS_PER_SECOND + 0.05);
}
