import assert from 'node:assert/strict';
import {
  generatedCpuDataWidth,
  generatedCpuEndianness,
} from './generated-board-shape.ts';

assert.equal(generatedCpuDataWidth('m68000'), 16);
assert.equal(generatedCpuDataWidth('V30'), 16);
assert.equal(generatedCpuDataWidth('Z80'), 8);
assert.equal(generatedCpuEndianness('v30'), 'little');
assert.equal(generatedCpuEndianness('m68000'), 'big');

console.log('generated-board-shape.spec: fallback CPU bus shapes passed');
