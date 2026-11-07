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
import { unboundIdentifiers, walkExpressions } from '../ir/walk.ts';
import { evalExpr } from '../kg/parse.ts';
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
  /**
   * A device's ROM program runs as that device: `tag()` is its tag, its
   * members hold their constructed and configured values, and a member or
   * `memshare()` naming a share reaches that share's bytes (a region here).
   */
  device?: {
    tag: string;
    members: Record<string, number | string | { region: string }>;
    /** A share's region, and its size: the range the opcode map shares. */
    shares: Record<string, { region: string; size: number }>;
  };
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
  const declared = parameters
    .split(',')
    // `const uint8_t convtable[32][4]` is named before its dimensions.
    .map(parameter => /(\w+)\s*(?:\[[^\]]*\]\s*)*$/.exec(parameter.trim())?.[1])
    .filter((name): name is string => Boolean(name));
  return unboundIdentifiers(program, declared, known);
}

/**
 * A CPU that decrypts its own ROM, as a program run over the assembled regions.
 *
 * MAME's encrypted Sega Z80s do it when the machine starts or resets them:
 * `segacrpt_z80_device::device_reset` points `m_region_ptr` at
 * `memregion(tag())` and `m_decrypted_ptr` at the configured opcode share,
 * then calls the `decrypt()` each chip type defines with its own key table;
 * the System 2 parts call theirs from `device_start`. The hook is the call a
 * start or reset makes to a method the concrete class itself defines. The
 * lifecycle body runs with the base class's own start/reset left out (that is
 * the CPU core's, not ROM work), its members as the constructor and the
 * machine config leave them.
 */
export function compileDeviceRomProgram(
  mameSrc: string,
  definition: { sourceFile: string; className: string },
  configuration: readonly string[],
  cpu: { tag: string; opcodeRegion: string; opcodeSize: number },
): GeneratedInitProgram | undefined {
  const stem = definition.sourceFile.replace(/\.cpp$/, '');
  const files = [definition.sourceFile, `${stem}.h`].filter(file => existsSync(join(mameSrc, file)));
  const ast = new MameAstIndex(parseMameAst(files.map(file => ({
    file,
    source: readFileSync(join(mameSrc, file), 'utf8'),
  }))));
  const concrete = definition.className;
  let lifecycle: ReturnType<MameAstIndex['findFunction']>;
  let hook: string | undefined;
  for (const name of ['device_start', 'device_reset']) {
    const candidate = ast.findFunctionInHierarchy(concrete, name);
    hook = candidate && [...candidate.body.matchAll(/(?<![\w:.>])(\w+)\s*\(\s*\)\s*;/g)]
      .map(match => match[1]!)
      .find(callee => !callee.startsWith('device_') && ast.findFunction(concrete, callee));
    if (hook) { lifecycle = candidate; break; }
  }
  if (!lifecycle || !hook) return undefined;
  const hookBody = ast.findFunction(concrete, hook)!.body;
  if (!/\bmemregion\s*\(/.test(lifecycle.body + hookBody)) return undefined;

  const hierarchy: string[] = [];
  for (let current: string | undefined = concrete; current && !hierarchy.includes(current);) {
    hierarchy.push(current);
    current = ast.ast.units.flatMap(unit => unit.classes).find(cls => cls.name === current)?.bases[0]?.split('::').at(-1);
  }
  const classBodies = hierarchy.flatMap(name =>
    ast.ast.units.flatMap(unit => unit.classes).filter(cls => cls.name === name).map(cls => cls.body));
  const sources = files.map(file => readFileSync(join(mameSrc, file), 'utf8'));
  const literal = (text: string): number | string | undefined => {
    const value = text.trim();
    if (/^"[^"]*"$/.test(value)) return value.slice(1, -1);
    if (value === 'nullptr' || value === 'NULL' || value === 'false') return 0;
    if (value === 'true') return 1;
    return evalExpr(value) ?? undefined;
  };
  // Members as constructed: in-class initializers, then constructor
  // initializer lists, base first. A finder starts on no share at all.
  const members: Record<string, number | string | { region: string }> = {};
  const finders = new Map<string, string>();
  for (const body of [...classBodies].reverse()) {
    for (const match of body.matchAll(/\b(m_\w+)\s*=\s*([^;{}]+);/g)) {
      const value = literal(match[2]!);
      if (value !== undefined) members[match[1]!] = value;
    }
  }
  for (const name of [...hierarchy].reverse()) {
    for (const source of sources) {
      const constructor = new RegExp(`\\b${name}::${name}\\s*\\(`).exec(source);
      if (!constructor) continue;
      const open = source.indexOf('{', constructor.index);
      for (const match of source.slice(constructor.index, open).matchAll(/\b(m_\w+)\s*\(([^()]*)\)/g)) {
        if (/finder_base::DUMMY_TAG/.test(match[2]!)) { finders.set(match[1]!, ''); continue; }
        const value = literal(match[2]!);
        if (value !== undefined) members[match[1]!] = value;
      }
    }
  }
  // The machine config's setters, through the device's finder or a local
  // reference to it: `z80.set_decrypted_tag(":decrypted_opcodes")`,
  // `maincpu.set_size(0x6000)`. A setter assigns a member, or sets a finder's tag.
  const shareTag = (text: string): string => {
    const value = text.trim();
    return (/^"/.test(value) ? value.slice(1, -1) : value).replace(/^:/, '').replace(/^m_/, '');
  };
  for (const line of configuration) {
    const call = /(?:\.|->)\s*(set_\w+)\s*\(([^()]*)\)\s*;?\s*$/.exec(line.trim());
    if (!call) continue;
    const setter = classBodies.map(body =>
      new RegExp(`\\b${call[1]}\\s*\\(([^)]*)\\)\\s*\\{([^{}]*)\\}`).exec(body)).find(Boolean);
    if (!setter) continue;
    const parameter = /(\w+)\s*$/.exec(setter[1]!.trim())?.[1];
    const assigned = parameter && new RegExp(`^\\s*(m_\\w+)\\s*=\\s*${parameter}\\s*;\\s*$`).exec(setter[2]!);
    const tagged = /^\s*(m_\w+)\s*\.\s*set_tag\s*\(/.exec(setter[2]!);
    if (tagged && finders.has(tagged[1]!)) finders.set(tagged[1]!, shareTag(call[2]!));
    else if (assigned) {
      const value = literal(call[2]!) ?? shareTag(call[2]!);
      members[assigned[1]!] = value;
    }
  }
  const shares = { [cpu.opcodeRegion]: { region: cpu.opcodeRegion, size: cpu.opcodeSize } };
  for (const [member, tag] of finders) {
    if (tag !== cpu.opcodeRegion) return undefined;
    members[member] = { region: cpu.opcodeRegion };
  }

  // The lifecycle body without the CPU core's own start/reset.
  const body = lifecycle.body.replace(/\b\w+::device_(?:start|reset)\s*\(\s*\)\s*;/g, '');
  const program = compileMameHandler(body);
  if (program.diagnostics.length) return undefined;
  const helpers: GeneratedInitProgramFunction[] = [];
  const pending = [program];
  const seen = new Set<string>([lifecycle.name]);
  const environment = new Set([...INIT_ENVIRONMENT, 'memshare', 'ptr', 'tag']);
  while (pending.length) {
    for (const name of calledNames(pending.shift()!)) {
      if (seen.has(name) || environment.has(name)) continue;
      // A file-scope helper too: segacrpt_device.cpp's `static void decode(...)`.
      const helper = ast.findFunctionInHierarchy(concrete, name) ?? ast.findFunction('', name);
      if (!helper) continue;
      seen.add(name);
      const compiled = compileMameHandler(helper.body);
      if (compiled.diagnostics.length) return undefined;
      helpers.push({ method: name, parameters: (helper.parameters ?? '').trim(), program: compiled });
      pending.push(compiled);
    }
  }
  const known = new Set([...seen, ...environment, ...Object.keys(members)]);
  const entry: GeneratedInitProgramFunction = { method: lifecycle.name, parameters: '', program };
  if ([entry, ...helpers].some(lowered => unresolvedNames(lowered.program, lowered.parameters, known).length)) {
    return undefined;
  }
  return {
    kind: 'init-program',
    ...entry,
    helpers,
    device: { tag: cpu.tag, members, shares },
    source: {
      file: lifecycle.span.file,
      line: lifecycle.span.line,
      ...(lifecycle.span.column === undefined ? {} : { column: lifecycle.span.column }),
    },
  };
}
