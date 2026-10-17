import assert from 'node:assert/strict';
import { lowerRamAllocation, ramPowerOn } from './ram-compiler.ts';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MameAstIndex, parseMameAst } from './ast.ts';
import { extractC64 } from '../hardware/c64/extract.ts';
import { indexMameHardware } from './hardware.ts';
import { createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

const source = process.env.MAME_SRC ?? '../mame';
assert.deepEqual(lowerRamAllocation({}, source), {});
assert.deepEqual(lowerRamAllocation({ config: ['RAM(config, m_ram).set_default_size("64K")'] }, source), {
  memberValues: { m_size: 65536 },
  memoryAllocations: { m_pointer: { bytes: 65536, fill: 255 } },
});
assert.deepEqual(lowerRamAllocation({ config: ['RAM(config, m_ram).set_default_size("1M").set_default_value(0x5a)'] }, source), {
  memberValues: { m_size: 1048576 },
  memoryAllocations: { m_pointer: { bytes: 1048576, fill: 90 } },
});
assert.throws(() => lowerRamAllocation({ config: ['RAM(config, m_ram).set_default_size("invalid")'] }, source), /unsupported RAM/);
const extraction = extractC64({ mameSource: source,
  entries: [{ type: 'RAM', definition: indexMameHardware(source).get('RAM'), methods: [] }],
})!;
const definition = JSON.parse(extraction.artifacts.find(artifact => artifact.path.endsWith('.json'))!.contents);
registerGeneratedDevice(definition);
const bytes = new Uint8Array(65536).fill(255);
const ram = createDevice('RAM', { members: { m_size: bytes.length, m_pointer: bytes } });
assert.equal(ram.call('size'), 65536);
assert.equal(ram.call('read', 123), 255);
ram.call('write', 123, 42);
assert.equal(bytes[123], 42, 'source accessors alias the allocated board storage');
assert.equal(ram.call('read', 65536 + 123), 42, 'source address wrapping uses the configured size');
// MAME's C64 lays its RAM out in machine_start, and that function -- not a
// copy of its loop -- is what decides the power-on bytes.
const driverFile = 'src/mame/commodore/c64.cpp';
const c64 = new MameAstIndex(parseMameAst([{ file: driverFile, source: readFileSync(join(source, driverFile), 'utf8') }]))
  .findFunctionInHierarchy('c64_state', 'machine_start')!;
const runs = ramPowerOn(c64.body, 'm_ram', 65536, 0xff)!;
assert.deepEqual(runs.slice(0, 3), [[0xff, 1], [0x00, 64], [0xff, 64]]);
assert.equal(runs.reduce((sum, [, count]) => sum + count, 0), 65536, 'the runs cover the whole device');
const expanded = runs.flatMap(([value, count]) => Array<number>(count).fill(value));
assert.equal(expanded[0xcc9d], 0x00, "Cauldron's first SID frame reads $00 from here, as in MAME");
assert.equal(ramPowerOn('save_item(NAME(m_ram));', 'm_ram', 16, 0xff), undefined, 'a start that never writes the memory is not run');
assert.equal(ramPowerOn('for (int i = 0; i < 4; i++) m_ram->pointer()[i] = 0xff;', 'm_ram', 4, 0xff), undefined,
  'writing the fill it already has changes nothing');
console.log('ram-compiler.spec: source allocation size and fill passed');
