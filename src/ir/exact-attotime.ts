/**
 * MAME's `attotime` as attotime.h holds it: whole seconds and integer
 * attoseconds, with attotime.h's and attotime.cpp's own arithmetic.
 *
 * Every other device holds an attotime as seconds in a double. A device whose
 * source reads attotime's fields (`m_seconds`, `m_attoseconds`) does integer
 * arithmetic on them, and that only works on exact values: the 8253's counter
 * update divides `now - m_last_updated` by its clock period, and when its
 * timer fires on an output edge the quotient must be a whole number of
 * periods. At ~51 s a double holds the time to about 7,000 attoseconds, so the
 * quotient sometimes truncated one short and the timer re-fired on the spot
 * (#272). The compiler marks such a device `exactAttotime` and its attotime
 * arithmetic `attotime: true`; this is what that arithmetic runs on.
 *
 * A value outside those devices is still a number of seconds (Infinity is
 * `attotime::never`), so every operation here accepts one and converts it.
 * `valueOf` answers seconds, so code that takes an attotime as a number --
 * a timer's delay, `Number(...)` -- keeps working.
 */

const ATTOS_PER_SECOND = 1_000_000_000_000_000_000n;
const ATTOS_PER_SECOND_SQRT = 1_000_000_000n;
/** attotime.h `ATTOTIME_MAX_SECONDS`: `attotime::never` stands here. */
const MAX_SECONDS = 1_000_000_000;

export class ExactAttotime {
  /** Restored by the board's `exact-attotime` factory (machine-state.ts). */
  readonly $factory = 'exact-attotime';

  readonly secs: number;
  readonly attos: bigint;

  constructor(secs: number, attos: bigint) {
    this.secs = secs;
    this.attos = attos;
  }

  static readonly never = new ExactAttotime(MAX_SECONDS, 0n);
  static readonly zero = new ExactAttotime(0, 0n);

  is_never(): boolean {
    return this.secs >= MAX_SECONDS;
  }

  is_zero(): boolean {
    return this.secs === 0 && this.attos === 0n;
  }

  as_double(): number {
    return this.secs + Number(this.attos) * 1e-18;
  }

  /** attotime.h `as_attoseconds`: within a second either side of zero, or clamped to it. */
  as_attoseconds(): number | bigint {
    const value = this.secs === 0 ? this.attos
      : this.secs === -1 ? this.attos - ATTOS_PER_SECOND
        : this.secs > 0 ? ATTOS_PER_SECOND : -ATTOS_PER_SECOND;
    return integer(value);
  }

  /** attotime.h `as_ticks(u32 frequency)`. */
  as_ticks(frequency: number): number {
    const hz = u32(frequency);
    const fraction = multiply(new ExactAttotime(0, this.attos), hz).secs;
    return this.secs * hz + fraction;
  }

  /** attotime.h's accessors for the two fields. */
  seconds(): number {
    return this.secs;
  }

  attoseconds(): number | bigint {
    return integer(this.attos);
  }

  valueOf(): number {
    return this.is_never() ? Infinity : this.as_double();
  }
}

function integer(value: bigint): number | bigint {
  return value >= BigInt(Number.MIN_SAFE_INTEGER) && value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : value;
}

function u32(value: unknown): number {
  const numeric = typeof value === 'bigint' ? value : BigInt(Math.trunc(Number(value) || 0));
  return Number(BigInt.asUintN(32, numeric));
}

/**
 * The exact attotime for a value: itself, or a number of seconds taken to
 * the nearest attosecond (Infinity is never). A value carrying seconds in an
 * object (`as_double`) converts the same way.
 */
export function exactAttotime(value: unknown): ExactAttotime {
  if (value instanceof ExactAttotime) return value;
  let seconds = typeof value === 'number' ? value
    : typeof value === 'bigint' ? Number(value)
      : value && typeof value === 'object' && typeof (value as { as_double?: unknown }).as_double === 'function'
        ? Number((value as { as_double(): number }).as_double())
        : Number(value);
  if (Number.isNaN(seconds)) seconds = 0;
  if (seconds >= MAX_SECONDS) return ExactAttotime.never;
  const whole = Math.floor(seconds);
  let attos = BigInt(Math.round((seconds - whole) * 1e18));
  let carried = whole;
  if (attos >= ATTOS_PER_SECOND) {
    attos -= ATTOS_PER_SECOND;
    carried++;
  }
  return new ExactAttotime(carried, attos);
}

/** attotime.h `attotime(seconds, attoseconds)`. */
export function constructExactAttotime(seconds: unknown = 0, attoseconds: unknown = 0): ExactAttotime {
  const attos = typeof attoseconds === 'bigint' ? attoseconds : BigInt(Math.trunc(Number(attoseconds) || 0));
  return new ExactAttotime(Math.trunc(Number(seconds) || 0), attos);
}

/** attotime.h's `from_hz`, for an integral (u32) or a fractional (double) rate. */
export function exactAttotimeFromHz(frequency: unknown): ExactAttotime {
  const hz = Number(frequency);
  if (Number.isInteger(hz) && hz >= 0 && hz <= 0xffffffff) {
    if (hz > 1) return new ExactAttotime(0, ATTOS_PER_SECOND / BigInt(hz));
    return hz === 1 ? new ExactAttotime(1, 0n) : ExactAttotime.never;
  }
  // `from_hz(double)`: HZ_TO_ATTOSECONDS divides in double and truncates.
  if (hz > 1) return new ExactAttotime(0, BigInt(Math.trunc(1e18 / hz)));
  if (hz > 0) {
    const period = 1 / hz;
    const whole = Math.trunc(period);
    return new ExactAttotime(whole, BigInt(Math.trunc((period - whole) * 1e18)));
  }
  return ExactAttotime.never;
}

/**
 * attotime.h's `from_hz`, in the seconds a duration that is not exact is held
 * in: `HZ_TO_ATTOSECONDS(frequency)`, truncated to whole attoseconds as
 * MAME's is.
 */
export function attotimeSecondsFromHz(frequency: unknown): number {
  const hz = Number(frequency);
  if (!(hz > 0)) return Infinity;
  if (hz <= 1 || !Number.isInteger(hz) || hz > 0xffffffff) return 1 / hz;
  return rememberExact(ATTOS_PER_SECOND / BigInt(hz));
}

/**
 * The exact attotime behind durations made lately, by the seconds they were
 * handed out as. A duration is a number of seconds wherever it goes, but a
 * timer armed with `from_ticks(...)` straight away (the usual shape) is armed
 * with exactly what MAME's would be, so its expiry stays on the attosecond
 * MAME's does period after period (IrTimer.adjust). Kept small: only a value
 * that reaches a timer unchanged needs finding.
 */
const EXACT_DURATIONS = new Map<number, bigint>();

function rememberExact(attos: bigint): number {
  // Divided, not multiplied by 1e-18: the nearest double to the exact value.
  const seconds = Number(attos) / 1e18;
  if (EXACT_DURATIONS.size >= 256) EXACT_DURATIONS.clear();
  EXACT_DURATIONS.set(seconds, attos);
  return seconds;
}

/**
 * A duration in seconds as an exact attotime: the one `from_ticks`/`from_hz`
 * made it from, when it is one of theirs, or the nearest attosecond.
 */
export function exactDuration(seconds: number): ExactAttotime {
  const attos = EXACT_DURATIONS.get(seconds);
  return attos === undefined ? exactAttotime(seconds) : exactFromAttos(attos);
}

/** An exact attotime from a total count of attoseconds. */
export function exactFromAttos(attos: bigint): ExactAttotime {
  const secs = attos >= 0n ? attos / ATTOS_PER_SECOND : (attos - ATTOS_PER_SECOND + 1n) / ATTOS_PER_SECOND;
  return new ExactAttotime(Number(secs), attos - secs * ATTOS_PER_SECOND);
}

/** An exact attotime as a total count of attoseconds. */
export function exactToAttos(time: ExactAttotime): bigint {
  return BigInt(time.secs) * ATTOS_PER_SECOND + time.attos;
}

/**
 * attotime.h's `from_ticks(ticks, frequency)` and device_t's
 * `clocks_to_attotime`, in seconds: whole seconds, then the remaining ticks at
 * `HZ_TO_ATTOSECONDS(frequency)`. Each tick is truncated, so a span of ticks
 * lands exactly on the cycle grid of a processor at that clock (its
 * `attoseconds_per_cycle` is the same truncation). Held as ticks / frequency,
 * a YM2203's 49536-clock timer was 16512 as longer than MAME's, and the
 * error grew with every period it re-armed for (#278).
 */
export function attotimeSecondsFromTicks(ticks: unknown, frequency: unknown): number {
  const count = Number(ticks);
  const hz = Number(frequency);
  if (!(hz > 0)) return Infinity;
  if (!Number.isSafeInteger(count) || count < 0 || !Number.isInteger(hz) || hz > 0xffffffff) return count / hz;
  const whole = Math.floor(count / hz);
  const remainder = BigInt(count - whole * hz);
  return rememberExact(BigInt(whole) * ATTOS_PER_SECOND + remainder * (ATTOS_PER_SECOND / BigInt(hz)));
}

function add(left: ExactAttotime, right: ExactAttotime): ExactAttotime {
  if (left.secs >= MAX_SECONDS || right.secs >= MAX_SECONDS) return ExactAttotime.never;
  let attos = left.attos + right.attos;
  let seconds = left.secs + right.secs;
  if (attos >= ATTOS_PER_SECOND) {
    attos -= ATTOS_PER_SECOND;
    seconds++;
  }
  return seconds >= MAX_SECONDS ? ExactAttotime.never : new ExactAttotime(seconds, attos);
}

function subtract(left: ExactAttotime, right: ExactAttotime): ExactAttotime {
  if (left.secs >= MAX_SECONDS) return ExactAttotime.never;
  let attos = left.attos - right.attos;
  let seconds = left.secs - right.secs;
  if (attos < 0n) {
    attos += ATTOS_PER_SECOND;
    seconds--;
  }
  return new ExactAttotime(seconds, attos);
}

/** attotime.cpp `operator*=(u32 factor)`. */
function multiply(time: ExactAttotime, factor: number): ExactAttotime {
  if (time.secs >= MAX_SECONDS) return ExactAttotime.never;
  if (factor === 0) return ExactAttotime.zero;
  const scale = BigInt(factor);
  const attos = BigInt.asUintN(64, time.attos);
  const attolo = attos % ATTOS_PER_SECOND_SQRT;
  const attohi = BigInt.asUintN(32, attos / ATTOS_PER_SECOND_SQRT);
  let temp = attolo * scale;
  const reslo = temp % ATTOS_PER_SECOND_SQRT;
  temp /= ATTOS_PER_SECOND_SQRT;
  temp += attohi * scale;
  const reshi = temp % ATTOS_PER_SECOND_SQRT;
  temp /= ATTOS_PER_SECOND_SQRT;
  temp += BigInt.asUintN(32, BigInt(time.secs)) * scale;
  if (temp >= BigInt(MAX_SECONDS)) return ExactAttotime.never;
  return new ExactAttotime(Number(temp), reslo + reshi * ATTOS_PER_SECOND_SQRT);
}

/** attotime.cpp `operator/=(u32 factor)`, rounding on the remainder. */
function divide(time: ExactAttotime, factor: number): ExactAttotime {
  if (time.secs >= MAX_SECONDS) return ExactAttotime.never;
  if (factor === 0) return time;
  const scale = BigInt(factor);
  const attos = BigInt.asUintN(64, time.attos);
  const attolo = attos % ATTOS_PER_SECOND_SQRT;
  const attohi = attos / ATTOS_PER_SECOND_SQRT;
  const secondsIn = BigInt.asUintN(64, BigInt(time.secs));
  let seconds = Number(BigInt.asUintN(32, secondsIn / scale));
  let remainder = secondsIn % scale;
  let temp = attohi + remainder * ATTOS_PER_SECOND_SQRT;
  const reshi = temp / scale;
  remainder = temp % scale;
  temp = attolo + remainder * ATTOS_PER_SECOND_SQRT;
  const reslo = temp / scale;
  remainder = temp % scale;
  let result = reslo + reshi * ATTOS_PER_SECOND_SQRT;
  if (remainder >= scale / 2n) {
    if (++result >= ATTOS_PER_SECOND) {
      result = 0n;
      seconds++;
    }
  }
  return new ExactAttotime(seconds, result);
}

function compare(left: ExactAttotime, right: ExactAttotime): number {
  if (left.secs !== right.secs) return left.secs < right.secs ? -1 : 1;
  return left.attos === right.attos ? 0 : left.attos < right.attos ? -1 : 1;
}

/**
 * One of attotime's operators, on operands the compiler typed as attotime
 * (`attotime: true`). `*` and `/` take one attotime and a u32 factor; a
 * comparison answers 1 or 0. With no exact operand -- a device that is not
 * exact, or two plain durations -- it is the seconds arithmetic every other
 * attotime gets.
 */
export function attotimeBinary(operator: string, left: unknown, right: unknown): unknown {
  const exact = left instanceof ExactAttotime || right instanceof ExactAttotime;
  if (!exact) return secondsBinary(operator, Number(left), Number(right));
  switch (operator) {
    case '+': return add(exactAttotime(left), exactAttotime(right));
    case '-': return subtract(exactAttotime(left), exactAttotime(right));
    case '*':
      return left instanceof ExactAttotime ? multiply(left, u32(right)) : multiply(exactAttotime(right), u32(left));
    case '/': return divide(exactAttotime(left), u32(right));
    case '==': return compare(exactAttotime(left), exactAttotime(right)) === 0 ? 1 : 0;
    case '!=': return compare(exactAttotime(left), exactAttotime(right)) !== 0 ? 1 : 0;
    case '<': return compare(exactAttotime(left), exactAttotime(right)) < 0 ? 1 : 0;
    case '<=': return compare(exactAttotime(left), exactAttotime(right)) <= 0 ? 1 : 0;
    case '>': return compare(exactAttotime(left), exactAttotime(right)) > 0 ? 1 : 0;
    case '>=': return compare(exactAttotime(left), exactAttotime(right)) >= 0 ? 1 : 0;
    default: throw new Error(`attotime has no operator ${operator}`);
  }
}

function secondsBinary(operator: string, left: number, right: number): number {
  switch (operator) {
    case '+': return left + right;
    case '-': return left - right;
    case '*': return left * right;
    case '/': return left / right;
    case '==': return left === right ? 1 : 0;
    case '!=': return left !== right ? 1 : 0;
    case '<': return left < right ? 1 : 0;
    case '<=': return left <= right ? 1 : 0;
    case '>': return left > right ? 1 : 0;
    case '>=': return left >= right ? 1 : 0;
    default: throw new Error(`attotime has no operator ${operator}`);
  }
}

/** attotime's public fields, `m_seconds` and `m_attoseconds`. */
export function attotimeField(value: unknown, property: string): number | bigint {
  const time = exactAttotime(value);
  if (property === 'm_seconds') return time.secs;
  if (property === 'm_attoseconds') return integer(time.attos);
  throw new Error(`attotime has no field ${property}`);
}

/**
 * The attotime with one field replaced, left as written: attotime.h does not
 * normalise a field store, and the 8253 counts on that, adding whole seconds'
 * worth of remainder into `m_attoseconds` before it divides.
 */
export function withAttotimeField(value: unknown, property: string, field: unknown): ExactAttotime {
  const time = exactAttotime(value);
  if (property === 'm_seconds') return new ExactAttotime(Math.trunc(Number(field) || 0), time.attos);
  if (property === 'm_attoseconds') {
    const attos = typeof field === 'bigint' ? BigInt.asIntN(64, field) : BigInt(Math.trunc(Number(field) || 0));
    return new ExactAttotime(time.secs, attos);
  }
  throw new Error(`attotime has no field ${property}`);
}

/** A compound store into one of attotime's fields, in its own 64 bits. */
export function attotimeFieldAssignment(operator: string, current: number | bigint, value: unknown): unknown {
  if (operator === '=') return value;
  const right = typeof value === 'bigint' ? value : BigInt(Math.trunc(Number(value) || 0));
  const left = BigInt(current);
  switch (operator) {
    case '+=': return left + right;
    case '-=': return left - right;
    case '*=': return left * right;
    case '/=': return right === 0n ? left : left / right;
    default: throw new Error(`attotime field has no operator ${operator}`);
  }
}
