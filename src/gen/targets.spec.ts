import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGameContracts } from '../games/contracts.ts';
import { readBuildManifest } from './build-manifest.ts';
import { generatedGameOutputs } from './output-layout.ts';
import { ACCEPTED_TARGETS, GENERATION_TARGETS, REQUIRED_TARGETS } from './targets.ts';

// The issue's contract: target discovery, the generated catalog and the
// acceptance contracts must name the same set. They used to be three hand-kept
// lists — targets.ts, the gen:all shell loop, and contracts.ts — and nothing
// compared them.

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const contracts = await loadGameContracts();

check('the accepted set is exactly the games with acceptance contracts', () => {
  assert.deepEqual([...ACCEPTED_TARGETS].sort(), contracts.map(c => c.game).sort());
});

// Discovery must find a real contract for every module it picks up, and every
// contract's module name must match its game.
check('every discovered module exports a matching contract', () => {
  assert.equal(contracts.length, ACCEPTED_TARGETS.length);
  for (const contract of contracts) assert.ok(ACCEPTED_TARGETS.includes(contract.game));
});

check('every accepted target is a required target', () => {
  assert.deepEqual(ACCEPTED_TARGETS.filter(target => !REQUIRED_TARGETS.includes(target)), []);
});

// Disabling a game is a move into src/games/disabled, so the guarantee worth
// testing is that parking a contract there actually takes it out of the build.
check('disabled contracts are not generated', () => {
  const disabled = readdirSync(join(projectRoot, 'src/games/disabled'))
    .filter(name => name.endsWith('.ts') && !name.endsWith('.spec.ts'))
    .map(name => name.replace(/\.ts$/, ''));
  assert.ok(disabled.length > 0, 'issue #53 parked broken games in src/games/disabled');
  for (const game of disabled) {
    assert.ok(!REQUIRED_TARGETS.includes(game), `disabled game "${game}" is still built`);
  }
});

check('required targets are unique', () => {
  assert.equal(new Set(REQUIRED_TARGETS).size, REQUIRED_TARGETS.length);
});

check('gen:all builds every required target', () => {
  assert.deepEqual([...GENERATION_TARGETS], [...REQUIRED_TARGETS]);
  assert.ok(GENERATION_TARGETS.includes('nes'));
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

// Only meaningful against a full build. A partial --targets dist is a
// legitimate state that audit:generated rejects on its own; the unit suite
// should not fail on whatever happens to be in dist.
const outRoot = join(projectRoot, 'dist');
const manifest = readBuildManifest(outRoot);
if (manifest && [...manifest.targets].sort().join(',') === [...GENERATION_TARGETS].sort().join(',')) {
  check('the generated catalog matches the complete generation set', () => {
    assert.deepEqual(
      generatedGameOutputs(outRoot).map(entry => entry.game).sort(),
      [...GENERATION_TARGETS].sort(),
    );
  });
}

console.log(`targets.spec: ${passed} passed, 0 failed`);
