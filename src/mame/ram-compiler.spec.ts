import assert from 'node:assert/strict';
import { lowerRamAllocation } from './ram-compiler.ts';
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
console.log('ram-compiler.spec: source allocation size and fill passed');
