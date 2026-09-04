import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = import.meta.dirname;
const sharedRuntime = readdirSync(root).filter(file =>
  file.endsWith('.ts') && !file.endsWith('.spec.ts'));
const forbiddenTargets = [
  'gauntlet', 'mario', 'defender', 'outrun', 'elevator',
  'segas16a', 'segas16b', 'neogeo',
];

for (const file of sharedRuntime) {
  const source = readFileSync(join(root, file), 'utf8');
  assert.doesNotMatch(
    source,
    /(?:if|switch|\?|&&|\|\|)[^\n]*(?:machine|this\.machine)\.(?:game|family)\s*(?:===|!==|==|!=)/,
    `${file}: shared runtime behavior must not branch on a game or family`,
  );
  for (const target of forbiddenTargets) {
    assert.doesNotMatch(
      source,
      new RegExp(`(?:if|switch|else\\s+if)[^\\n]*['\"]${target}['\"]`, 'i'),
      `${file}: ${target} must be selected by source shape or a hardware capability`,
    );
  }
}

console.log('architecture.spec: shared runtime has no game/family behavior switches');
