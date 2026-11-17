import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { HardwareCapability } from '../hardware/contract.ts';
import { closureJobs, writeCapabilityArtifacts } from './closure-pool.ts';

const capability = (id: string, mameTypes: string[], extractsPerType?: true): HardwareCapability =>
  ({ id, mameTypes, ports: [], extract: () => undefined, ...(extractsPerType ? { extractsPerType } : {}) });
const entry = (type: string) => ({ type, methods: [] });

// A per-type family is one job a type the closure has, in its definition's
// order (the order one process lowered them in); a whole family is one job,
// queued before every per-type job so a long one is not the pool's tail.
const jobs = closureJobs([
  capability('device', ['Z80', 'M68000', 'ABSENT'], true),
  capability('discrete', ['DISCRETE']),
  capability('nes', ['NES']),
], [entry('M68000'), entry('Z80'), entry('DISCRETE')]);
assert.deepEqual(jobs, [
  { id: 0, capability: 'discrete' },
  { id: 1, capability: 'nes' },
  { id: 2, capability: 'device', types: ['Z80'] },
  { id: 3, capability: 'device', types: ['M68000'] },
]);

// Artifacts land under the generated root, each reported with its content
// hash, which is how two jobs writing one path are held to the same bytes.
const root = mkdtempSync(join(tmpdir(), 'closure-pool-spec-'));
try {
  const written = writeCapabilityArtifacts(root, [{ path: 'audio/stream-worklet.ts', contents: 'x' }]);
  assert.equal(readFileSync(join(root, 'audio/stream-worklet.ts'), 'utf8'), 'x');
  assert.deepEqual(written, [['audio/stream-worklet.ts', '11f6ad8ec52a2984abaafd7c3b516503785c2072']]);
} finally {
  rmSync(root, { recursive: true, force: true });
}

console.log('closure-pool.spec: closure jobs and artifact writes passed');
