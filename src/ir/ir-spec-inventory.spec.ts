import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// src/ir is the contract every consumer derives from, so each module that has
// behaviour carries an adjacent spec. Mirrors runtime-spec-inventory.spec.ts.

const irDir = dirname(fileURLToPath(import.meta.url));
const declarationOnly = new Set(['board.ts', 'audio-protocol.ts', 'version.ts']);
const sources = readdirSync(irDir)
  .filter(name => name.endsWith('.ts') && !name.endsWith('.spec.ts'))
  .filter(name => !declarationOnly.has(name));
const files = new Set(readdirSync(irDir));
const missing = sources.filter(name => !files.has(name.replace(/\.ts$/, '.spec.ts')));

assert.deepEqual(
  missing,
  [],
  `IR behavior modules require adjacent specs: ${missing.map(name => join(irDir, name)).join(', ')}`,
);

console.log(`ir-spec-inventory.spec: ${sources.length} behavior modules have adjacent specs`);
