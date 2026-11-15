/**
 * The graphics table a `device_gfx_interface` device decodes from.
 *
 * MAME gives such a device its `gfx_decode_entry` table in two steps. The
 * constructor hands `device_gfx_interface` a default
 * (`device_gfx_interface(mconfig, *this, gfxinfo)`), and the machine
 * configuration may then call a setter of the device whose body replaces it
 * with `set_info(...)`: the K051960's `set_plane_order(K051960_PLANEORDER_MIA)`
 * switches to `gfxinfo_reverse`, the K052109's `set_char_ram(true)` to
 * `gfxinfo_ram`, the K051316's `set_bpp(8)` to `gfxinfo8`.
 *
 * Both steps are read here from the device's own source. The setter is run,
 * not matched: its body is evaluated with the configuration's arguments, so
 * the table is whichever `set_info` MAME's own control flow reaches. Anything
 * this cannot decide is reported as unresolved rather than guessed.
 */

import { parseMameConstructors, type MameAstIndex, type MameFunction } from '../mame/ast.ts';
import { evalExpr, splitArgs, stripComments } from './parse.ts';

/** A table as its source names it, with the class whose scope the name was written in. */
export interface GfxInfoName {
  /** `null` is `nullptr`: the device decodes nothing until a table is set. */
  name: string | null;
  scope: string;
}

export type GfxInfoSelection =
  | { kind: 'table'; table: GfxInfoName }
  | { kind: 'unresolved'; reason: string };

type Constructor = ReturnType<typeof parseMameConstructors>[number];

/** The device source one selection reads: its AST and out-of-line constructors. */
export interface DeviceGfxSource {
  ast: MameAstIndex;
  constructors: readonly Constructor[];
}

export function deviceGfxSource(ast: MameAstIndex): DeviceGfxSource {
  return {
    ast,
    constructors: ast.ast.units.flatMap(unit => parseMameConstructors(unit.file, unit.source)),
  };
}

class Undecided extends Error {}

function classBases(ast: MameAstIndex, className: string): string[] {
  const declaration = ast.ast.units.flatMap(unit => unit.classes).find(cls => cls.name === className);
  return (declaration?.bases ?? []).map(base => base.split('::').at(-1)!);
}

/** `className` and every class it derives from, nearest first. */
export function classLineage(ast: MameAstIndex, className: string): string[] {
  const lineage: string[] = [];
  const visit = (name: string): void => {
    if (lineage.includes(name)) return;
    lineage.push(name);
    for (const base of classBases(ast, name)) visit(base);
  };
  visit(className);
  return lineage;
}

/** Whether the class is a `device_gfx_interface` device, by its declared bases. */
export function ownsGfxInterface(ast: MameAstIndex, className: string): boolean {
  return classLineage(ast, className).includes('device_gfx_interface');
}

function matching(text: string, open: number): number {
  const pairs: Record<string, string> = { '(': ')', '{': '}', '[': ']' };
  const close = pairs[text[open]!]!;
  let depth = 0;
  for (let index = open; index < text.length; index++) {
    const char = text[index]!;
    if (char === '"' || char === "'") {
      for (index++; index < text.length && text[index] !== char; index++) if (text[index] === '\\') index++;
    } else if (char === text[open]) depth++;
    else if (char === close && --depth === 0) return index;
  }
  throw new Undecided('unbalanced source');
}

function skipSpace(text: string, from: number): number {
  let index = from;
  while (index < text.length && /\s/.test(text[index]!)) index++;
  return index;
}

/** The end of a `case X:` or `default:` label: its colon, which is not half of a `::`. */
function labelEnd(text: string, from: number): number {
  for (let index = from; index < text.length; index++) {
    const char = text[index]!;
    if (char === '(') index = matching(text, index);
    else if (char === ':') {
      if (text[index + 1] === ':') index++;
      else return index + 1;
    }
  }
  throw new Undecided('unterminated case label');
}

/** One past the statement that starts at `from` (which is not whitespace). */
function statementEnd(text: string, from: number): number {
  if (text[from] === '{') return matching(text, from) + 1;
  const keyword = /^(if|switch|while|for|do|else|case|default)\b/.exec(text.slice(from))?.[1];
  if (keyword === 'case' || keyword === 'default') return labelEnd(text, from);
  if (keyword === 'if' || keyword === 'switch' || keyword === 'while' || keyword === 'for') {
    const open = skipSpace(text, from + keyword.length);
    if (text[open] !== '(') throw new Undecided(`malformed ${keyword}`);
    let end = statementEnd(text, skipSpace(text, matching(text, open) + 1));
    if (keyword === 'if') {
      const next = skipSpace(text, end);
      if (/^else\b/.test(text.slice(next))) end = statementEnd(text, skipSpace(text, next + 4));
    }
    return end;
  }
  if (keyword === 'do') {
    const body = statementEnd(text, skipSpace(text, from + 2));
    return statementEnd(text, skipSpace(text, body));
  }
  for (let index = from; index < text.length; index++) {
    const char = text[index]!;
    if (char === '"' || char === "'") index = stringEnd(text, index);
    else if (char === '(' || char === '{' || char === '[') index = matching(text, index);
    else if (char === ';') return index + 1;
  }
  throw new Undecided('unterminated statement');
}

function stringEnd(text: string, open: number): number {
  for (let index = open + 1; index < text.length; index++) {
    if (text[index] === '\\') index++;
    else if (text[index] === text[open]) return index;
  }
  throw new Undecided('unterminated literal');
}

/** Whether a statement that cannot be decided could change the table or the flow. */
function matters(statement: string): boolean {
  return /\b(?:set_info|return|break|fatalerror|throw|goto)\b/.test(statement);
}

interface Scope {
  values: Record<string, number>;
  constants: Record<string, number>;
  className: string;
  table?: GfxInfoName;
}

function value(expression: string, scope: Scope): number | null {
  let text = expression.replace(/\btrue\b/g, '1').replace(/\bfalse\b/g, '0');
  for (const [name, bound] of Object.entries(scope.values)) {
    text = text.replace(new RegExp(`(?<![\\w:.>])${name}\\b`, 'g'), `(${bound})`);
  }
  return evalExpr(text, scope.constants);
}

/** Split `a ? b : c` at its own question mark and colon; undefined when it is not a conditional. */
function conditional(expression: string): [string, string, string] | undefined {
  let question = -1;
  let nested = 0;
  for (let index = 0; index < expression.length; index++) {
    const char = expression[index]!;
    if (char === '(' || char === '[' || char === '{') index = matching(expression, index);
    else if (char === '?') {
      if (question < 0) question = index;
      else nested++;
    } else if (char === ':' && question >= 0) {
      if (expression[index + 1] === ':') index++;
      else if (nested) nested--;
      else return [expression.slice(0, question), expression.slice(question + 1, index), expression.slice(index + 1)];
    }
  }
  return undefined;
}

function tableOperand(expression: string, scope: Scope): GfxInfoName {
  let text = expression.trim();
  while (text.startsWith('(') && matching(text, 0) === text.length - 1) text = text.slice(1, -1).trim();
  const choice = conditional(text);
  if (choice) {
    const condition = value(choice[0], scope);
    if (condition === null) throw new Undecided(`set_info chooses by \`${choice[0].trim()}\`, which the configuration does not fix`);
    return tableOperand(condition ? choice[1] : choice[2], scope);
  }
  if (text === 'nullptr') return { name: null, scope: scope.className };
  if (/^(?:\w+::)*\w+$/.test(text)) return { name: text, scope: scope.className };
  throw new Undecided(`set_info(${text}) is not a named table`);
}

type Flow = 'next' | 'break' | 'return';

function runStatement(text: string, scope: Scope): Flow {
  if (text[0] === '{') return runBlock(text.slice(1, -1), scope);
  const keyword = /^(if|switch|while|for|do|break|return|case|default)\b/.exec(text)?.[1];
  if (keyword === 'case' || keyword === 'default') return 'next';
  if (keyword === 'break') return 'break';
  if (keyword === 'return') return 'return';
  if (keyword === 'if') {
    const open = skipSpace(text, 2);
    const close = matching(text, open);
    const condition = value(text.slice(open + 1, close), scope);
    if (condition === null) {
      if (matters(text)) throw new Undecided(`\`if (${text.slice(open + 1, close).trim()})\` is not fixed by the configuration`);
      return 'next';
    }
    const then = skipSpace(text, close + 1);
    const thenEnd = statementEnd(text, then);
    if (condition) return runStatement(text.slice(then, thenEnd), scope);
    const otherwise = skipSpace(text, thenEnd);
    if (!/^else\b/.test(text.slice(otherwise))) return 'next';
    return runStatement(text.slice(skipSpace(text, otherwise + 4)), scope);
  }
  if (keyword === 'switch') {
    const open = skipSpace(text, 6);
    const close = matching(text, open);
    const selector = value(text.slice(open + 1, close), scope);
    const bodyStart = skipSpace(text, close + 1);
    if (selector === null || text[bodyStart] !== '{') {
      if (matters(text)) throw new Undecided(`\`switch (${text.slice(open + 1, close).trim()})\` is not fixed by the configuration`);
      return 'next';
    }
    const body = text.slice(bodyStart + 1, -1);
    const statements: string[] = [];
    for (let index = skipSpace(body, 0); index < body.length; index = skipSpace(body, index)) {
      const end = statementEnd(body, index);
      statements.push(body.slice(index, end));
      index = end;
    }
    const label = (statement: string): number | 'default' | undefined => {
      if (/^default\b/.test(statement)) return 'default';
      if (!/^case\b/.test(statement)) return undefined;
      const labelled = value(statement.slice(4, -1), scope);
      if (labelled === null && matters(text)) throw new Undecided(`\`${statement.trim()}\` does not evaluate`);
      return labelled ?? undefined;
    };
    const labels = statements.map(label);
    let entry = labels.indexOf(selector);
    if (entry < 0) entry = labels.indexOf('default');
    if (entry < 0) return 'next';
    for (const statement of statements.slice(entry)) {
      const flow = runStatement(statement, scope);
      if (flow === 'break') return 'next';
      if (flow === 'return') return 'return';
    }
    return 'next';
  }
  if (keyword) {
    // A loop is not run: nothing that selects a table is written as one.
    if (matters(text)) throw new Undecided(`a \`${keyword}\` loop decides the table`);
    return 'next';
  }
  if (/^(?:fatalerror|throw)\b/.test(text)) throw new Undecided('the configuration reaches a fatal error in the device');
  const call = /^(?:this\s*->\s*)?(?:device_gfx_interface\s*::\s*)?set_info\s*\(/.exec(text);
  if (call) {
    const open = call[0].length - 1;
    scope.table = tableOperand(text.slice(open + 1, matching(text, open)), scope);
    return 'next';
  }
  if (/\bset_info\b/.test(text)) throw new Undecided(`\`${text.trim()}\` sets the table in a way that is not read`);
  return 'next';
}

function runBlock(text: string, scope: Scope): Flow {
  for (let index = skipSpace(text, 0); index < text.length; index = skipSpace(text, index)) {
    const end = statementEnd(text, index);
    const flow = runStatement(text.slice(index, end), scope);
    if (flow !== 'next') return flow;
    index = end;
  }
  return 'next';
}

/**
 * The table a method leaves selected when called with `args`: MAME's own
 * control flow over the arguments' values. `undefined` when it selects none.
 */
export function evaluateSetInfo(
  fn: Pick<MameFunction, 'className' | 'name' | 'parameters' | 'body'>,
  args: readonly string[],
  constants: Record<string, number>,
): GfxInfoSelection | undefined {
  const scope: Scope = { values: {}, constants, className: fn.className.split('::').at(-1)! };
  const parameters = fn.parameters.trim() ? splitArgs(fn.parameters) : [];
  parameters.forEach((parameter, index) => {
    const declared = /(\w+)\s*(?:=([\s\S]*))?$/.exec(parameter.trim());
    if (!declared) return;
    const bound = value(args[index] ?? declared[2] ?? '', scope);
    if (bound !== null) scope.values[declared[1]!] = bound;
  });
  try {
    runBlock(stripComments(fn.body), scope);
  } catch (error) {
    if (error instanceof Undecided) return { kind: 'unresolved', reason: `${fn.className}::${fn.name}: ${error.message}` };
    throw error;
  }
  return scope.table ? { kind: 'table', table: scope.table } : undefined;
}

/**
 * The table the device's constructor selects: the third argument it hands
 * `device_gfx_interface`, then whatever its body sets. A constructor that
 * only forwards to another one (its own class's, or a base's) is followed.
 * `undefined` when the class has no constructor in the source read.
 */
export function constructorGfxInfo(
  source: DeviceGfxSource,
  className: string,
  constants: Record<string, number>,
  visited = new Set<string>(),
): GfxInfoSelection | undefined {
  if (visited.has(className)) return undefined;
  visited.add(className);
  const own = source.constructors.filter(constructor => constructor.className.split('::').at(-1) === className);
  const bases = classBases(source.ast, className);
  const answers: GfxInfoSelection[] = [];
  for (const constructor of own) {
    // A delegating constructor's answer is the one it delegates to.
    if (constructor.initializers.some(initializer => initializer.name.split('::').at(-1) === className)) continue;
    let answer: GfxInfoSelection | undefined;
    const direct = constructor.initializers.find(initializer => initializer.name === 'device_gfx_interface');
    if (direct) {
      try {
        const scope: Scope = { values: {}, constants, className };
        answer = { kind: 'table', table: direct.args[2] === undefined ? { name: null, scope: className } : tableOperand(direct.args[2], scope) };
      } catch (error) {
        if (!(error instanceof Undecided)) throw error;
        answer = { kind: 'unresolved', reason: `${className}'s constructor: ${error.message}` };
      }
    } else {
      const base = constructor.initializers.map(initializer => initializer.name.split('::').at(-1)!)
        .find(name => bases.includes(name) && name !== 'device_gfx_interface');
      answer = base ? constructorGfxInfo(source, base, constants, visited) : undefined;
    }
    const body = evaluateSetInfo({ ...constructor, parameters: '' }, [], constants);
    answer = body ?? answer;
    if (answer) answers.push(answer);
  }
  if (!answers.length) return undefined;
  const distinct = new Set(answers.map(answer => JSON.stringify(answer)));
  return distinct.size === 1
    ? answers[0]
    : { kind: 'unresolved', reason: `${className}'s constructors select different tables` };
}

/** Every `.method(args)` / `->method(args)` a configuration statement calls on its device, in order. */
export function configMethodCalls(statement: string): { method: string; args: string[] }[] {
  const calls: { method: string; args: string[] }[] = [];
  const text = stripComments(statement);
  try {
    for (let index = 0; index < text.length; index++) {
      const char = text[index]!;
      if (char === '"' || char === "'") { index = stringEnd(text, index); continue; }
      if (char !== '(') continue;
      const close = matching(text, index);
      const method = /(?:->|\.)\s*(\w+)\s*(?:<[^<>()]*>)?\s*$/.exec(text.slice(0, index))?.[1];
      if (method) {
        const inner = text.slice(index + 1, close);
        calls.push({ method, args: inner.trim() ? splitArgs(inner) : [] });
      }
      index = close;
    }
  } catch (error) {
    if (!(error instanceof Undecided)) throw error;
  }
  return calls;
}

/**
 * The table a device ends its configuration with: `initial` (its
 * constructor's, or nothing for a derived configuration that only patches a
 * device it inherited), then each configuration statement in order, through
 * the device's own method bodies. `undefined` when nothing selects a table.
 */
export function configuredGfxInfo(
  source: DeviceGfxSource,
  className: string,
  statements: readonly string[],
  constants: Record<string, number>,
  initial: GfxInfoSelection | undefined,
): GfxInfoSelection | undefined {
  let selected = initial;
  for (const statement of statements) {
    for (const call of configMethodCalls(statement)) {
      if (call.method === 'set_info') {
        // The configuration names a table itself: it is written in the
        // driver's scope, not the device's.
        const named = /^(?:\w+::)*\w+$/.test(call.args[0]?.trim() ?? '') ? call.args[0]!.trim() : undefined;
        selected = named
          ? { kind: 'table', table: { name: named === 'nullptr' ? null : named, scope: '' } }
          : { kind: 'unresolved', reason: `set_info(${call.args.join(', ')}) is not a named table` };
        continue;
      }
      const fn = source.ast.findFunctionInHierarchy(className, call.method);
      if (!fn || !/\bset_info\s*\(/.test(fn.body)) continue;
      selected = evaluateSetInfo(fn, call.args, constants) ?? selected;
    }
  }
  return selected;
}
