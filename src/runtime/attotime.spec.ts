import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Attotime, AttoPeriod, hzToAttoseconds, secondsToAttoseconds } from './attotime.ts';

const at = (value: bigint): Attotime => new Attotime().setExact(value);

test('MAME truncates a clock to attoseconds per cycle', () => {
  assert.equal(hzToAttoseconds(3072000), 325520833333);
  assert.equal(hzToAttoseconds(6144000), 162760416666);
  assert.equal(hzToAttoseconds(60), 16666666666666666);
  // set_refresh_hz takes a double, and MAME divides as one.
  assert.equal(hzToAttoseconds(60.0988), Math.floor(1e18 / 60.0988));
});

test('a time past 2^53 attoseconds stays exact through every operation', () => {
  const frame = 162760416666n * 384n * 264n;
  assert.ok(frame > BigInt(Number.MAX_SAFE_INTEGER));
  const time = new Attotime();
  const cycle = new AttoPeriod(325520833333);
  for (let run = 0; run < 1000; run++) time.addPeriods(52, cycle);
  assert.equal(time.exact, 325520833333n * 52000n);
  time.addTime(at(frame));
  assert.equal(time.exact, 325520833333n * 52000n + frame);
  time.add(-7);
  assert.equal(time.exact, 325520833333n * 52000n + frame - 7n);
  assert.ok(time.attos >= 0 && time.attos < 1e9);
});

test('comparing and differencing times', () => {
  const low = at(16_499_999_999_932_416n);
  const high = at(16_499_999_999_932_417n);
  assert.ok(low.before(high));
  assert.ok(!high.before(low));
  assert.ok(!low.before(low));
  assert.equal(high.since(low), 1);
  assert.equal(low.since(high), -1);
});

test('periods within a delta divide as timeslice does', () => {
  // m_attoseconds_per_cycle at 3.072 MHz: shifted right 8 to fit 31 bits.
  const cycle = new AttoPeriod(325520833333);
  const zero = new Attotime();
  const check = (delta: bigint): void => {
    const expected = delta < 325520833333n ? 0n : (delta >> 8n) / (325520833333n >> 8n);
    assert.equal(cycle.within(zero, at(delta)), Number(expected), String(delta));
  };
  for (const delta of [
    0n, 1n, 325520833332n, 325520833333n, 325520833334n, 651041666666n,
    // A whole frame, past 2^53, and a little either side of whole cycles.
    162760416666n * 384n * 264n,
    325520833333n * 50688n, 325520833333n * 50688n - 1n, 325520833333n * 50688n + 1n,
    325520833333n * 1000n - 1n, 325520833333n * 1000n - 256n,
  ]) check(delta);
  // The truncated divisor rounds a delta just short of whole cycles up.
  assert.equal(cycle.within(zero, at(325520833333n * 50688n - 1n)), 50688);
});

test('within answers no periods for a time already passed', () => {
  const cycle = new AttoPeriod(325520833333);
  assert.equal(cycle.within(at(1000n), at(5n)), 0);
  assert.equal(cycle.within(at(1_000_000_000_000n), at(0n)), 0);
});

test('slop counts towards the delta', () => {
  const cycle = new AttoPeriod(325520833333);
  const zero = new Attotime();
  assert.equal(cycle.within(zero, at(325520833333n - 3n)), 0);
  assert.equal(cycle.within(zero, at(325520833333n - 3n), 16), 1);
});

test('seconds near an exact attosecond value convert to it', () => {
  assert.equal(secondsToAttoseconds(325520833333 * 1e-18), 325520833333);
  assert.equal(secondsToAttoseconds(1e-5), 10000000000000);
  assert.equal(secondsToAttoseconds(1 / 6000), 166666666666666);
});
