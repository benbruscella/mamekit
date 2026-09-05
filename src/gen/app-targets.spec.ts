import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ts from 'typescript';
import { stageGeneratedBoards } from './app-targets.ts';

const root = mkdtempSync(join(tmpdir(), 'mamekit-candidate-compile-'));
try {
  const staging = join(root, '.build/src');
  for (const game of ['published', 'candidate']) {
    const dir = join(root, 'games/arcade', game);
    mkdirSync(join(dir, 'generated'), { recursive: true });
    writeFileSync(join(dir, 'config.json'), '{}');
    writeFileSync(join(dir, 'generated/board.ts'),
      `export const value: number = ${game === 'candidate' ? '"broken"' : '1'};`);
  }
  const entries = stageGeneratedBoards(root, staging, new Set(['published']));
  assert.deepEqual(entries.map(entry => entry.dataPath), ['games/arcade/published']);
  const candidate = join(staging, 'games/arcade/candidate/generated/board.ts');
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
    rootDir: staging, outDir: join(root, '.build/out'), skipLibCheck: true, types: [],
  };
  const roots = [candidate, join(staging, 'games/arcade/published/generated/board.ts')];
  const failures = ts.getPreEmitDiagnostics(ts.createProgram(roots, options));
  assert.ok(failures.some(failure => failure.file?.fileName === candidate && failure.code === 2322),
    'an unpublished candidate must still fail compilation on a type error');
  writeFileSync(candidate, 'export const value: number = 2;');
  const program = ts.createProgram(roots, options);
  assert.deepEqual(ts.getPreEmitDiagnostics(program), []);
  assert.equal(program.emit().emitSkipped, false);
  assert.ok(existsSync(join(root, '.build/out/games/arcade/candidate/generated/board.js')));
} finally {
  rmSync(root, { recursive: true, force: true });
}
console.log('app-targets.spec: unpublished candidates compile and produce offline artifacts');
