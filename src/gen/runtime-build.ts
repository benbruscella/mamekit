// `mamekit build`: the runtime in dist recompiled from src, in seconds.
//
// A full `--build-app` stages the runtime, the IR, the hardware packages, the
// generated hardware closure and every board into one tsc program, which
// type-checks hundreds of MB of generated code: twelve minutes before a
// one-line change in src/runtime can be measured. The runtime needs none of
// that. It imports nothing generated, so `mamekit build` stages the same three
// trees the app build stages, at the same paths, and runs tsc over them alone
// with the app's own compiler options: the same emit, type-checked, in about
// two seconds. dist/runtime/{core,ir,hardware} are then brought up to date
// file by file (a module whose JavaScript did not change keeps its time, and
// one whose source is gone is deleted). The generated closure, the boards and
// the app are left alone; a change to those still needs `--build-app`.
//
// One program, not a per-file transpile: `ts.transpileModule` emits a helper
// call differently from a program (`__rewriteRelativeImportExtension(x, true)`
// in stream-acceptance.js), so only a program gives a full build's bytes.
// `mamekit build --check` compares instead of writing, which is how a full
// build's runtime files are verified against this one.

import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/**
 * The source trees the browser runtime is staged from, where each lands in
 * dist, and what each leaves out. `buildApp` stages exactly these, so the one
 * list says what both builds emit.
 */
export const RUNTIME_TREES: readonly { source: string; output: string; excluded: readonly string[] }[] = [
  { source: 'src/runtime', output: 'runtime/core', excluded: ['.spec.ts'] },
  // The neutral IR ships beside the runtime as dist/runtime/ir. Staging it one
  // level above runtime/core keeps every `../ir/...` import resolving to the
  // same place it does in src, so no path rewriting is needed.
  { source: 'src/ir', output: 'runtime/ir', excluded: ['.spec.ts'] },
  // Capability packages ship only their runtime-facing files. extract.ts pulls
  // in the compiler and acceptance.ts drives dist from Node; neither belongs in
  // the browser bundle, and excluding them here is what keeps that true.
  {
    source: 'src/hardware',
    output: 'runtime/hardware',
    excluded: ['.spec.ts', '/extract.ts', '/acceptance.ts', '/registry.ts', '/acceptance-registry.ts'],
  },
];

/** Copies the runtime trees into `srcDir` (a staged `src`) as both builds lay them out. */
export function stageRuntimeTrees(srcDir: string, root = projectRoot): void {
  for (const tree of RUNTIME_TREES) {
    cpSync(join(root, tree.source), join(srcDir, tree.output), {
      recursive: true,
      filter: source => !tree.excluded.some(suffix => source.endsWith(suffix)),
    });
  }
}

/** The app build's compiler options; app-build.ts writes them into its tsconfig. */
export const APP_COMPILER_OPTIONS = {
  target: 'ES2022', module: 'ESNext', moduleResolution: 'bundler',
  lib: ['ES2022', 'DOM', 'DOM.Iterable'], strict: true,
  // TypeScript 6 no longer loads every @types package by default. The staged
  // hardware packages still carry Node-side helpers (stream-acceptance.ts,
  // nes/ines-mappers.ts), so name Node's types as the root tsconfig does.
  types: ['node'],
  resolveJsonModule: false,
  allowImportingTsExtensions: true, rewriteRelativeImportExtensions: true,
  erasableSyntaxOnly: true, verbatimModuleSyntax: true, skipLibCheck: true,
} as const;

/**
 * `<buildDir>/tsconfig.json` for a staged build (`src` -> `out`). The app build
 * writes it before hashing the staged tree for its compile cache, so a change
 * of options is a change of key.
 */
export function writeStagedTsconfig(buildDir: string): void {
  writeFileSync(join(buildDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      ...APP_COMPILER_OPTIONS,
      // A staged tree outside the repository finds Node's types here.
      typeRoots: [join(projectRoot, 'node_modules/@types')],
      outDir: 'out', rootDir: 'src',
    },
    include: ['src'],
  }, null, 2));
}

/** Runs the app's tsc over a staged build directory (`<buildDir>/src` -> `<buildDir>/out`). */
export function compileStaged(buildDir: string, heapMb = 8192): { ok: boolean } {
  writeStagedTsconfig(buildDir);
  const tsc = spawnSync(process.execPath, [
    `--max-old-space-size=${heapMb}`,
    join(projectRoot, 'node_modules/typescript/bin/tsc'),
    '-p', join(buildDir, 'tsconfig.json'),
  ], { stdio: 'inherit' });
  return { ok: tsc.status === 0 };
}

function compiledFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const found: string[] = [];
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) found.push(...compiledFiles(path));
    else if (entry.endsWith('.js')) found.push(path);
  }
  return found;
}

export interface RuntimeBuildResult {
  ok: boolean;
  /** Modules whose JavaScript changed and was written (or differs, with `check`). */
  changed: string[];
  /** Compiled modules whose source is gone, deleted (or listed, with `check`). */
  removed: string[];
  /** Modules compiled. */
  modules: number;
  ms: number;
}

/**
 * Recompiles the runtime trees into `outRoot`. With `check`, nothing is
 * written: the result lists every module that differs from `outRoot`'s.
 */
export function buildRuntime(outRoot: string, options: { check?: boolean; root?: string } = {}): RuntimeBuildResult {
  const started = performance.now();
  const buildDir = mkdtempSync(join(tmpdir(), 'mamekit-runtime-build-'));
  const result: RuntimeBuildResult = { ok: false, changed: [], removed: [], modules: 0, ms: 0 };
  try {
    stageRuntimeTrees(join(buildDir, 'src'), options.root);
    if (!compileStaged(buildDir, 2048).ok) return result;
    for (const tree of RUNTIME_TREES) {
      const compiledDir = join(buildDir, 'out', tree.output);
      const outputDir = join(outRoot, tree.output);
      const expected = new Set<string>();
      for (const compiled of compiledFiles(compiledDir)) {
        const output = join(outputDir, relative(compiledDir, compiled));
        expected.add(output);
        result.modules++;
        const text = readFileSync(compiled);
        if (existsSync(output) && readFileSync(output).equals(text)) continue;
        result.changed.push(relative(outRoot, output));
        if (options.check) continue;
        mkdirSync(dirname(output), { recursive: true });
        writeFileSync(output, text);
      }
      for (const output of compiledFiles(outputDir)) {
        if (expected.has(output)) continue;
        result.removed.push(relative(outRoot, output));
        if (!options.check) rmSync(output);
      }
    }
    result.ok = true;
    return result;
  } finally {
    rmSync(buildDir, { recursive: true, force: true });
    result.ms = Math.round(performance.now() - started);
  }
}
