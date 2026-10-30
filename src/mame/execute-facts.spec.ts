// What a device's own source says about it as a scheduler participant: that
// it has a device_execute_interface, and its execute_min_cycles(), which
// MAME's perfect interleave is measured in.
// Run with: node src/mame/execute-facts.spec.ts

import assert from 'node:assert/strict';
import { mameExecuteFacts } from './device-compiler.ts';

const source = process.env.MAME_SRC ?? '../mame';

// An override in the header, and one in the .cpp.
assert.deepEqual(mameExecuteFacts(source, 'Z80'), { executes: true, minCycles: 1 });
assert.deepEqual(mameExecuteFacts(source, 'M68010'), { executes: true, minCycles: 4 });
assert.deepEqual(mameExecuteFacts(source, 'Z8002'), { executes: true, minCycles: 2 });
assert.deepEqual(mameExecuteFacts(source, 'M6502'), { executes: true, minCycles: 1 });
// No override: diexec.cpp's own. POKEY's is commented out.
assert.deepEqual(mameExecuteFacts(source, 'I8257'), { executes: true, minCycles: 1 });
assert.deepEqual(mameExecuteFacts(source, 'POKEY'), { executes: true, minCycles: 1 });
// The 6805 returns a member its variants set, so only the device can say.
assert.deepEqual(mameExecuteFacts(source, 'M68705P5'), { executes: true });
// The Z80 DMA runs on timers, not as an execute device.
assert.deepEqual(mameExecuteFacts(source, 'Z80DMA'), { executes: false });

console.log('execute facts: execute_min_cycles from the device class and diexec.cpp');
