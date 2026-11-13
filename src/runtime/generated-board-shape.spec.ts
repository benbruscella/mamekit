import assert from 'node:assert/strict';
import { generatedCpuAddressUnitBytes } from './generated-board-shape.ts';

// address_space_config's addrshift as bytes per address: a byte-addressed
// space, the TMS320C10's word-addressed -1, the TMS34010's bit-addressed +3.
assert.equal(generatedCpuAddressUnitBytes(0), 1);
assert.equal(generatedCpuAddressUnitBytes(-1), 2);
assert.equal(generatedCpuAddressUnitBytes(3), 1 / 8);

console.log('generated-board-shape.spec: address units from addrshift passed');
