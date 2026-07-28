import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { supportedGameContracts } from '../games/contracts.ts';
import { generatedGameOutputs } from './output-layout.ts';
import { ACCEPTED_TARGETS, REQUIRED_TARGETS } from './targets.ts';

// The issue's contract: target discovery, the generated catalog and the
// acceptance contracts must name the same set. They used to be three hand-kept
// lists — targets.ts, the gen:all shell loop, and contracts.ts — and nothing
// compared them.

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

check('the accepted set is exactly the games with acceptance contracts', () => {
  assert.deepEqual(
    [...ACCEPTED_TARGETS].sort(),
    supportedGameContracts.map(contract => contract.game).sort(),
  );
});

check('every accepted target is a required target', () => {
  assert.deepEqual(ACCEPTED_TARGETS.filter(target => !REQUIRED_TARGETS.includes(target)), []);
});

check('required targets are unique', () => {
  assert.equal(new Set(REQUIRED_TARGETS).size, REQUIRED_TARGETS.length);
});

// gen:all must not restate the target set; it asks the CLI for it.
check('gen:all names no targets of its own', () => {
  const scripts = JSON.parse(
    readFileSync(join(projectRoot, 'package.json'), 'utf8'),
  ).scripts as Record<string, string>;
  for (const target of REQUIRED_TARGETS) {
    assert.ok(
      !new RegExp(`\\b${target}\\b`).test(scripts['gen:all'] ?? ''),
      `gen:all still names "${target}" instead of deriving the set`,
    );
  }
});

// Only meaningful against a build; skipped when dist has not been generated.
const outRoot = join(projectRoot, 'dist');
if (existsSync(join(outRoot, 'games.json'))) {
  check('the generated catalog matches the accepted set', () => {
    assert.deepEqual(
      generatedGameOutputs(outRoot).map(entry => entry.game).sort(),
      [...ACCEPTED_TARGETS].sort(),
    );
  });
}

console.log(`targets.spec: ${passed} passed, 0 failed`);
