// Driver-init lowering of last resort: keep MAME's init function as a program.
//
// Most driver inits say something small and declarative — patch one byte, swap
// a data line, walk a region through a bitswap — and `parseInitRomTransforms`
// recovers exactly that as data, which is the preferred form because data is
// inspectable. Ms. Pac-Man's does not: init_mspacman builds a whole second
// 64K bank out of address-scrambled, bit-permuted copies of the Pac-Man ROMs
// and then stitches forty eight-byte patches into it. There is no shape to
// extract; the shape *is* the code.
//
// So preserve the code. The init body is lowered to the same handler IR every
// other MAME method uses, and the runtime executes it over the assembled ROM
// regions. Nothing game-specific is emitted, and nothing here knows what
// "mspacman" is.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { BoardSourceRef, GeneratedHandlerProgram } from '../ir/board.ts';
import { walkExpressions, walkOperations } from '../ir/walk.ts';
import { MameAstIndex, parseMameAst } from './ast.ts';
import { compileMameHandler } from './handler-ir.ts';

export interface GeneratedInitProgramFunction {
  method: string;
  parameters: string;
  program: GeneratedHandlerProgram;
}

export interface GeneratedInitProgram {
  kind: 'init-program';
  method: string;
  parameters: string;
  program: GeneratedHandlerProgram;
  /** Same-class helpers the init calls, lowered with it. */
  helpers: GeneratedInitProgramFunction[];
  source?: BoardSourceRef;
}

/**
 * Names the runtime supplies while an init program runs. Anything else the
 * program reads would silently evaluate to zero, so an init that reaches for
 * one is refused rather than lowered into a plausible-looking wrong ROM.
 */
const INIT_ENVIRONMENT = new Set([
  'memregion', 'membank', 'base', 'bytes', 'configure_entries', 'configure_entry',
  'set_entry', 'machine',
]);

export function compileDriverInitProgram(
  mameSrc: string,
  driverFile: string,
  className: string,
  initName: string,
): GeneratedInitProgram | undefined {
  if (!initName || initName === 'empty_init') return undefined;
  const directory = dirname(driverFile);
  const stem = driverFile.replace(/\.cpp$/, '');
  const files = [driverFile, `${stem}.h`, join(directory, `${stem.split('/').at(-1)}.h`)]
    .filter((file, index, all) => all.indexOf(file) === index)
    .filter(file => existsSync(join(mameSrc, file)));
  if (!files.length) return undefined;
  const ast = new MameAstIndex(parseMameAst(files.map(file => ({
    file,
    source: readFileSync(join(mameSrc, file), 'utf8'),
  }))));
  const init = ast.findFunctionInHierarchy(className, initName);
  if (!init) return undefined;
  // Only inits that rewrite ROM belong to region assembly. Bank configuration,
  // member defaults and installed handlers are already lowered elsewhere, and
  // replaying them here would run them twice.
  if (!writesRegionBytes(init.body)) return undefined;

  const program = compileMameHandler(init.body);
  if (program.diagnostics.length) return undefined;

  const helpers: GeneratedInitProgramFunction[] = [];
  const pending = [program];
  const seen = new Set<string>([initName]);
  while (pending.length) {
    for (const name of calledNames(pending.shift()!)) {
      if (seen.has(name) || INIT_ENVIRONMENT.has(name)) continue;
      const helper = ast.findFunctionInHierarchy(className, name);
      if (!helper) continue;
      seen.add(name);
      const compiled = compileMameHandler(helper.body);
      if (compiled.diagnostics.length) return undefined;
      helpers.push({
        method: name,
        parameters: (helper.parameters ?? '').trim(),
        program: compiled,
      });
      pending.push(compiled);
    }
  }

  const known = new Set([...seen, ...INIT_ENVIRONMENT]);
  const entry: GeneratedInitProgramFunction = {
    method: initName,
    parameters: (init.parameters ?? '').trim(),
    program,
  };
  const unresolved = [entry, ...helpers]
    .some(lowered => unresolvedNames(lowered.program, lowered.parameters, known).length);
  if (unresolved) return undefined;

  return {
    kind: 'init-program',
    ...entry,
    helpers,
    source: {
      file: init.span.file,
      line: init.span.line,
      ...(init.span.column === undefined ? {} : { column: init.span.column }),
    },
  };
}

/** `ROM[i] = ...` through a local bound to a ROM region's base pointer. */
function writesRegionBytes(body: string): boolean {
  const aliases = new Set<string>();
  for (const match of body.matchAll(
    /\b(?:uint8_t|u8|uint16_t|u16)\s*\*\s*(\w+)\s*=\s*(?:&\s*)?memregion\s*\(/g,
  )) aliases.add(match[1]!);
  return [...aliases].some(alias =>
    new RegExp(`\\b${alias}\\s*\\[[^\\]]*\\]\\s*=[^=]`).test(body));
}

function calledNames(program: GeneratedHandlerProgram): string[] {
  const names: string[] = [];
  walkExpressions(program.operations, expression => {
    if (expression.kind !== 'call') return;
    const callee = expression.callee;
    if (callee.kind === 'identifier') names.push(callee.name);
    else if (callee.kind === 'member') names.push(callee.property);
  });
  return names;
}

/**
 * Identifiers the program reads that are neither its own locals, its
 * parameters, nor part of the init environment. A driver state member is the
 * common case: it means the init is doing machine work, not ROM work.
 */
function unresolvedNames(
  program: GeneratedHandlerProgram,
  parameters: string,
  known: ReadonlySet<string>,
): string[] {
  const declared = new Set(
    parameters
      .split(',')
      .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
      .filter((name): name is string => Boolean(name)),
  );
  walkOperations(program.operations, operation => {
    if (operation.op === 'declare') declared.add(operation.name);
  });
  const unresolved = new Set<string>();
  walkExpressions(program.operations, expression => {
    if (expression.kind !== 'identifier') return;
    const name = expression.name;
    if (declared.has(name) || known.has(name)) return;
    if (/^bitswap_\d/.test(name) || /^(?:BIT|ALLOC|ARRAY|TABLE)$/.test(name)) return;
    unresolved.add(name);
  });
  return [...unresolved];
}
