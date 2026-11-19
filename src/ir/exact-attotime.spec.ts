import assert from 'node:assert/strict';
import {
  attotimeBinary,
  attotimeField,
  attotimeFieldAssignment,
  constructExactAttotime,
  ExactAttotime,
  exactAttotime,
  exactAttotimeFromHz,
  withAttotimeField,
} from './exact-attotime.ts';

const ATTOS = 1_000_000_000_000_000_000n;
const at = (seconds: number, attos: bigint) => new ExactAttotime(seconds, attos);
const parts = (value: unknown) => [(value as ExactAttotime).secs, (value as ExactAttotime).attos];

// from_hz: integral rates divide exactly, fractional ones truncate a double
// division (HZ_TO_ATTOSECONDS), as attotime.h's two overloads do.
assert.deepEqual(parts(exactAttotimeFromHz(3)), [0, ATTOS / 3n]);
assert.deepEqual(parts(exactAttotimeFromHz(1)), [1, 0n]);
assert.equal(exactAttotimeFromHz(0).is_never(), true);
assert.deepEqual(parts(exactAttotimeFromHz(1789772.5)), [0, BigInt(Math.trunc(1e18 / 1789772.5))]);

// The 8253's failure (#272): a time ~51 s in, plus N periods, less the start,
// must divide back to exactly N. In doubles it came to N-1 and the counter's
// timer re-fired on the spot.
const period = exactAttotimeFromHz(1789772.5);
const start = at(51, 123_456_789_012_345_678n);
const later = attotimeBinary('+', start, attotimeBinary('*', period, 1000));
const elapsed = attotimeBinary('-', later, start);
assert.equal(attotimeField(elapsed, 'm_seconds'), 0);
assert.equal(BigInt(attotimeField(elapsed, 'm_attoseconds')) / (period as ExactAttotime).attos, 1000n);

// operator+ carries one second; operator- borrows one.
assert.deepEqual(parts(attotimeBinary('+', at(1, ATTOS - 1n), at(0, 2n))), [2, 1n]);
assert.deepEqual(parts(attotimeBinary('-', at(2, 1n), at(0, 2n))), [1, ATTOS - 1n]);
// never absorbs addition, and stays never through a multiply.
assert.equal((attotimeBinary('+', ExactAttotime.never, at(1, 0n)) as ExactAttotime).is_never(), true);
assert.equal((attotimeBinary('*', ExactAttotime.never, 3) as ExactAttotime).is_never(), true);

// operator* by a u32 factor, from either side; a product past
// ATTOTIME_MAX_SECONDS is never.
assert.deepEqual(parts(attotimeBinary('*', 7, at(1, 500_000_000_000_000_000n))), [10, 500_000_000_000_000_000n]);
assert.equal((attotimeBinary('*', at(600_000_000, 0n), 2) as ExactAttotime).is_never(), true);
// operator/ rounds on the remainder (attotime.cpp).
assert.deepEqual(parts(attotimeBinary('/', at(0, 5n), 2)), [0, 3n]);
assert.deepEqual(parts(attotimeBinary('/', at(3, 0n), 2)), [1, 500_000_000_000_000_000n]);

// Comparisons are attotime's, field by field.
assert.equal(attotimeBinary('<', at(1, ATTOS - 1n), at(2, 0n)), 1);
assert.equal(attotimeBinary('>=', at(2, 0n), at(2, 0n)), 1);
assert.equal(attotimeBinary('!=', at(2, 1n), at(2, 0n)), 1);
// With no exact operand it is plain seconds arithmetic, as every other device has.
assert.equal(attotimeBinary('+', 0.25, 0.5), 0.75);
assert.equal(attotimeBinary('>', 2, 1), 1);
// A number mixed with an exact attotime converts: Infinity is never, 0 is zero.
assert.equal(attotimeBinary('<', at(5, 0n), Infinity), 1);
assert.deepEqual(parts(attotimeBinary('+', at(5, 7n), 0)), [5, 7n]);

// A field store is not normalised: the 8253 adds whole seconds' worth of
// remainder into m_attoseconds before it divides.
const stored = withAttotimeField(at(3, 10n), 'm_attoseconds', attotimeFieldAssignment('+=', 10, 2n * ATTOS));
assert.deepEqual(parts(stored), [3, 2n * ATTOS + 10n]);
assert.equal(attotimeField(stored, 'm_attoseconds'), 2n * ATTOS + 10n);
assert.deepEqual(parts(withAttotimeField(at(3, 10n), 'm_seconds', 0)), [0, 10n]);

// Conversions: seconds to the nearest attosecond, valueOf back to seconds,
// and the accessors.
assert.deepEqual(parts(exactAttotime(1.5)), [1, 500_000_000_000_000_000n]);
assert.equal(exactAttotime(Infinity).is_never(), true);
assert.equal(Number(at(2, 250_000_000_000_000_000n)), 2.25);
assert.equal(Number(ExactAttotime.never), Infinity);
assert.equal(at(2, 250_000_000_000_000_000n).as_ticks(4), 9);
assert.equal(at(0, 42n).as_attoseconds(), 42);
assert.equal(at(3, 0n).seconds(), 3);
assert.deepEqual(parts(constructExactAttotime(4, 9)), [4, 9n]);
