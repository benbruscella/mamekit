import assert from 'node:assert/strict';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { capabilityForType, HARDWARE_CAPABILITIES } from './registry.ts';

// Convention-based discovery without runtime magic: the registry is explicit
// static imports so it type-checks, and this spec makes forgetting to register
// a package a failure rather than a silently missing family.

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

const hardwareDir = dirname(fileURLToPath(import.meta.url));
const packages = readdirSync(hardwareDir)
  .filter(name => statSync(join(hardwareDir, name)).isDirectory())
  .filter(name => existsSync(join(hardwareDir, name, 'definition.ts')))
  .sort();

check('every capability package is registered', () => {
  assert.deepEqual(
    packages.filter(name => !HARDWARE_CAPABILITIES.some(capability => capability.id === name)),
    [],
    'a src/hardware/<family>/ package exists but is missing from registry.ts',
  );
});

check('every registered capability has a package directory', () => {
  assert.deepEqual(
    HARDWARE_CAPABILITIES.map(capability => capability.id).filter(id => !packages.includes(id)),
    [],
  );
});

check('a package owns its extraction, ports and MAME types', () => {
  for (const capability of HARDWARE_CAPABILITIES) {
    // mameTypes is empty for families whose MAME class is named per driver;
    // those are recognised by shape inside extract().
    assert.ok(capability.ports.length, `${capability.id} declares no ports`);
    assert.equal(typeof capability.extract, 'function');
  }
});

// Two capabilities claiming one MAME type would make which of them lowers it
// depend on registry order.
check('no two capabilities claim the same MAME type', () => {
  const seen = new Map<string, string>();
  for (const capability of HARDWARE_CAPABILITIES) {
    for (const type of capability.mameTypes) {
      assert.equal(seen.get(type), undefined, `${type} is claimed by two capabilities`);
      seen.set(type, capability.id);
    }
  }
});

check('a MAME type resolves to its capability', () => {
  assert.equal(capabilityForType(HARDWARE_CAPABILITIES, 'YM2203')?.id, 'ym2203');
  assert.equal(capabilityForType(HARDWARE_CAPABILITIES, 'YM2149')?.id, 'ay8910');
  assert.equal(capabilityForType(HARDWARE_CAPABILITIES, 'AY8912')?.id, 'ay8910');
  assert.equal(capabilityForType(HARDWARE_CAPABILITIES, 'I8035')?.id, 'cpu');
  assert.equal(capabilityForType(HARDWARE_CAPABILITIES, 'SEGA_315_5098')?.id, 'cpu');
  assert.equal(capabilityForType(HARDWARE_CAPABILITIES, 'NOT_A_CHIP'), undefined);
});

// A capability must not reach for MAME source before it has seen the device.
// Generation runs every registered extract() on every closure, so one that
// probes the filesystem unconditionally would break unrelated targets.
check('extraction declines an empty closure without touching MAME source', () => {
  for (const capability of HARDWARE_CAPABILITIES) {
    assert.equal(
      capability.extract({ mameSource: '/nonexistent', entries: [] }),
      undefined,
      `${capability.id} did something with a closure containing none of its hardware`,
    );
  }
});

console.log(`registry.spec: ${passed} passed, 0 failed`);
