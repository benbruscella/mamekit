import assert from 'node:assert/strict';
import type { BoardIr } from '../ir/board.ts';
import { hasDeviceType, hasHandler } from './generated-source-shape.ts';

const machine = {
  devices: [{ type: 'TEST_DEVICE' }],
  handlers: [{ method: 'bank_select_w' }],
} as BoardIr;

assert.equal(hasDeviceType(machine, 'TEST_DEVICE'), true);
assert.equal(hasDeviceType(machine, 'OTHER_DEVICE'), false);
assert.equal(hasHandler(machine, 'bank_select_w'), true);
assert.equal(hasHandler(machine, 'other_w'), false);

console.log('generated-source-shape.spec: source capability predicates passed');
