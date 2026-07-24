import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const runtimeDir = dirname(fileURLToPath(import.meta.url));
const declarationOnly = new Set(['audio-protocol.ts', 'types.ts']);
const sources = readdirSync(runtimeDir)
  .filter(name => name.endsWith('.ts') && !name.endsWith('.spec.ts'))
  .filter(name => !declarationOnly.has(name));
const files = new Set(readdirSync(runtimeDir));
const missing = sources.filter(name => !files.has(name.replace(/\.ts$/, '.spec.ts')));

assert.deepEqual(
  missing,
  [],
  `runtime behavior modules require adjacent specs: ${missing.map(name => join(runtimeDir, name)).join(', ')}`,
);

console.log(`runtime-spec-inventory.spec: ${sources.length} behavior modules have adjacent specs`);
