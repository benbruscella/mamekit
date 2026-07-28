// Enforces the compile -> IR -> execution dependency direction recorded in
// docs/BOARD_IR_MIGRATION.md section 3.
//
// Imports are read with the TypeScript parser rather than a regex: several
// compilers emit browser import statements at column zero inside template
// literals (src/mame/cpu-codegen.ts, device-codegen.ts, audio-compiler.ts).
// Those are generated source text, not dependencies of the compiler itself,
// and only a real parser tells the two apart.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const srcRoot = join(projectRoot, 'src');

let passed = 0;
let failed = 0;
function check(name: string, condition: boolean, detail = ''): void {
  if (condition) {
    passed++;
    return;
  }
  failed++;
  console.error(`FAIL ${name}${detail ? `\n  ${detail}` : ''}`);
}

/**
 * Layers in dependency order. `neutral` is src/ir plus the parts of a hardware
 * capability package shared by both sides (its schema and validation rules).
 * `tooling` orchestrates generation and QA, so it may reach anywhere.
 */
type Layer = 'compile' | 'neutral' | 'execution' | 'tooling';

const ALLOWED: Record<Layer, Layer[]> = {
  neutral: ['neutral'],
  compile: ['compile', 'neutral'],
  execution: ['execution', 'neutral'],
  tooling: ['compile', 'neutral', 'execution', 'tooling'],
};

export function layerOf(file: string): Layer {
  const path = file.replace(/\\/g, '/');
  if (path.startsWith('ir/')) return 'neutral';
  if (path.startsWith('kg/') || path.startsWith('mame/')) return 'compile';
  if (path.startsWith('runtime/')) return 'execution';
  if (path.startsWith('hardware/')) {
    const name = path.split('/').at(-1)!;
    if (name === 'extract.ts') return 'compile';
    if (name === 'runtime.ts') return 'execution';
    // acceptance.ts drives dist artifacts from Node, alongside src/games.
    if (name === 'acceptance.ts') return 'tooling';
    // registry.ts wires each package's extract.ts into one list, so it is
    // compile-time; the browser gets its providers from a separate registry.
    if (name === 'registry.ts') return 'compile';
    // acceptance-registry.ts runs in Node against dist artifacts, alongside
    // src/games, and is deliberately kept apart from the compile-time one.
    if (name === 'acceptance-registry.ts') return 'tooling';
    // sound-runtime-registry.ts ships to the browser and imports only each
    // package's runtime.ts, never its extract.ts.
    if (name === 'sound-runtime-registry.ts') return 'execution';
    // contract.ts, ports.ts, definition.ts, validate.ts
    return 'neutral';
  }
  return 'tooling';
}

/**
 * Violations present at the issue #38 baseline, each with the phase that
 * removes it. The spec fails when an unlisted violation appears AND when a
 * listed one is gone, so the list cannot silently rot.
 *
 * Empty since phase 2: compile -> IR -> execution now holds throughout.
 */
const KNOWN_VIOLATIONS: Record<string, string> = {};

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...sourceFiles(full));
    } else if (entry.endsWith('.ts') && !entry.endsWith('.spec.ts')) {
      // Specs legitimately cross layers: a compiler spec executes its own
      // output against the generic interpreter to prove they agree.
      out.push(full);
    }
  }
  return out;
}

/** Static and dynamic module specifiers that are real imports of this file. */
export function importSpecifiers(source: string, fileName: string): string[] {
  const parsed = ts.createSourceFile(fileName, source, ts.ScriptTarget.ES2022, true);
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      found.push(node.moduleSpecifier.text);
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      found.push((node.arguments[0] as ts.StringLiteral).text);
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(parsed, visit);
  return found;
}

const violations: Record<string, string> = {};
for (const file of sourceFiles(srcRoot)) {
  const from = relative(srcRoot, file).replace(/\\/g, '/');
  const fromLayer = layerOf(from);
  for (const specifier of importSpecifiers(readFileSync(file, 'utf8'), file)) {
    if (!specifier.startsWith('.')) continue;
    const target = relative(srcRoot, resolve(dirname(file), specifier)).replace(/\\/g, '/');
    if (target.startsWith('..')) continue;
    const toLayer = layerOf(target);
    if (ALLOWED[fromLayer].includes(toLayer)) continue;
    violations[`${from} -> ${target}`] = `${fromLayer} must not import ${toLayer}`;
  }
}

const unexpected = Object.keys(violations).filter(edge => !(edge in KNOWN_VIOLATIONS));
check(
  'no new dependency-direction violations',
  unexpected.length === 0,
  unexpected.map(edge => `${edge}: ${violations[edge]}`).join('\n  '),
);

const resolved = Object.keys(KNOWN_VIOLATIONS).filter(edge => !(edge in violations));
check(
  'known-violation list contains no stale entries',
  resolved.length === 0,
  resolved.map(edge => `${edge} is fixed — remove it from KNOWN_VIOLATIONS`).join('\n  '),
);

check('src/ir imports nothing outside src/ir', !Object.keys(violations).some(edge =>
  layerOf(edge.split(' -> ')[0]!) === 'neutral'));

// Guards the parser choice itself: the emitted browser imports inside the
// codegen template literals must never be read as compiler dependencies.
check(
  'emitted template-literal imports are not counted',
  !importSpecifiers(
    'const s = `\nimport { x } from \'../../core/generated-cpu.js\';\n`;\n',
    'fixture.ts',
  ).length,
);

console.log(`dependency-direction.spec: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
