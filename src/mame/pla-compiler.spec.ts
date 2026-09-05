import assert from 'node:assert/strict';
import ts from 'typescript';
import { compilePla } from './pla-compiler.ts';
import { indexMameHardware } from './hardware.ts';
import { generatedDeviceExecutableSource } from './device-codegen.ts';
import { createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

const source = process.env.MAME_SRC ?? '../mame';
const definition = compilePla(source, indexMameHardware(source).get('PLS100')!);
assert.equal(definition.summary.diagnostics, 0);
// Exercise both cache paths without rebuilding the full 65,536-entry cache
// through the slow reference interpreter for each synthetic fuse fixture.
definition.constants.MAX_CACHE_BITS = 2;
const rom = new Uint8Array(245).fill(0xff);
rom.set([0, 0, 7, 0x88]); // 1,928 fuses
function fuse(index: number, value: number): void {
  const at = 4 + (index >>> 3);
  const mask = 1 << (index & 7);
  rom[at] = value ? rom[at]! | mask : rom[at]! & ~mask;
}
for (let bit = 0; bit < 8; bit++) fuse(1920 + bit, 0);
fuse(1, 0); // term 0 requires input bit 0 high
fuse(32, 0); // term 0 drives output bit 0
fuse(40 + 30, 0); // term 1 requires input bit 15 low
fuse(40 + 32 + 7, 0); // term 1 drives output bit 7
fuse(1920 + 2, 1); // output polarity XOR bit 2

const js = ts.transpileModule(generatedDeviceExecutableSource(definition, 'pla.json')
  .replace("import deviceData from './pla.json' with { type: 'json' };", `const deviceData = ${JSON.stringify(definition)};`), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const emitted = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
for (const implementation of [definition, emitted.default]) {
  registerGeneratedDevice(implementation);
  const device = createDevice('PLS100', { tag: 'pla', regions: { pla: rom } });
  for (const input of [0, 1, 2, 3, 0x8000, 0x8001, 0xffff, 1, 0x8000]) {
    const expected = ((input & 1) | (input & 0x8000 ? 0 : 0x80)) ^ 4;
    assert.equal(device.call('read', input), expected, `PLA input ${input.toString(16)}`);
  }
}
console.log('pla-compiler.spec: generated and interpreted JED terms, polarity and caches passed');
