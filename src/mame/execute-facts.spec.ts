// What a device's own source says about it as a scheduler participant: that
// it has a device_execute_interface, and its execute_min_cycles(), which
// MAME's perfect interleave is measured in.
// Run with: node src/mame/execute-facts.spec.ts

import assert from 'node:assert/strict';
import { mameExecuteFacts } from './device-compiler.ts';

const source = process.env.MAME_SRC ?? '../mame';

// The facts without the clock conversion, which is checked below.
const facts = (type: string) => {
  const { clocksToCycles: _clocks, ...rest } = mameExecuteFacts(source, type) ?? { executes: false };
  return rest;
};
// An override in the header, and one in the .cpp.
assert.deepEqual(facts('Z80'), { executes: true, minCycles: 1 });
assert.deepEqual(facts('M68010'), { executes: true, minCycles: 4 });
assert.deepEqual(facts('Z8002'), { executes: true, minCycles: 2 });
assert.deepEqual(facts('M6502'), { executes: true, minCycles: 1 });
// No override: diexec.cpp's own. POKEY's is commented out.
assert.deepEqual(facts('I8257'), { executes: true, minCycles: 1 });
assert.deepEqual(facts('POKEY'), { executes: true, minCycles: 1 });
// The 6805 returns a member its variants set, so only the device can say.
assert.deepEqual(facts('M68705P5'), { executes: true });
// The Z80 DMA runs on timers, not as an execute device.
assert.deepEqual(facts('Z80DMA'), { executes: false });

// device_execute_interface::clocks_to_cycles, from each class's own
// execute_clocks_to_cycles: the 6800 family's /4, the 6809's
// m_clock_divider (4 on an MC6809, 1 on the externally clocked MC6809E, set
// by its constructor), an MCS-48's /15, and an override in a derived class
// (the i8080's `clocks` over the i8085's /2). The Z80 defines none.
const cycles = (type: string, clock: number) => mameExecuteFacts(source, type)?.clocksToCycles?.(clock);
assert.equal(cycles('M6802', 4_000_000), 1_000_000);
assert.equal(cycles('M6801U4', 4_000_000), 1_000_000);
assert.equal(cycles('MC6809', 4_000_000), 1_000_000);
assert.equal(cycles('MC6809E', 1_000_000), 1_000_000);
assert.equal(cycles('I8035', 6_000_000), 400_000);
assert.equal(cycles('I8085A', 6_000_000), 3_000_000);
assert.equal(cycles('I8080', 2_000_000), 2_000_000);
assert.equal(cycles('Z80', 3_072_000), 3_072_000);
// The TMS34010's `(clocks + 8 - 1) / 8`, in MAME's integers (Mortal Kombat's
// 50 MHz / 8 board clock arrives fractional and is truncated first).
assert.equal(cycles('TMS34010', 6_250_000), 781_250);
assert.equal(cycles('TMS34010', 447_444 * 8 - 7), 447_444);

console.log('execute facts: execute_min_cycles from the device class and diexec.cpp');
