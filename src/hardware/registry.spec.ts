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
  assert.equal(capabilityForType(HARDWARE_CAPABILITIES, 'NOT_A_CHIP'), undefined);
});

// An unparsed MAME class must leave the type unresolved, not claim it works.
check('extraction declines a closure it cannot lower', () => {
  for (const capability of HARDWARE_CAPABILITIES) {
    assert.equal(capability.extract({ mameSource: '/nonexistent', entries: [] }), undefined);
    assert.equal(
      capability.extract({
        mameSource: '/nonexistent',
        entries: capability.mameTypes.map(type => ({ type, methods: [] })),
      }),
      undefined,
      `${capability.id} claimed a type whose MAME class was never parsed`,
    );
  }
});

// An emitted artifact the manifest points at but nothing writes is a broken
// closure, so the two lists must agree.
check('declared executable artifacts are actually emitted', () => {
  for (const capability of HARDWARE_CAPABILITIES) {
    const extraction = capability.extract({ mameSource: '/nonexistent', entries: [] });
    if (!extraction) continue;
    const emitted = new Set(extraction.artifacts.map(artifact => artifact.path));
    for (const { artifact } of Object.values(extraction.executable)) {
      assert.ok(emitted.has(artifact), `${capability.id} declares ${artifact} but never emits it`);
    }
  }
});

console.log(`registry.spec: ${passed} passed, 0 failed`);
