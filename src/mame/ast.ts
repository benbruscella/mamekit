/**
 * A small, source-preserving AST for the C++ dialect used by MAME drivers.
 *
 * This is intentionally MAME-specific. It recognizes the constructs mamekit
 * compiles: macro invocations, class member functions, statements, and fluent
 * call chains. Unknown C++ remains source text with a span instead of being
 * guessed at or discarded.
 */

export interface SourceSpan {
  file: string;
  start: number;
  end: number;
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
}

export interface MameCall {
  name: string;
  args: string[];
  templateArgs: string[];
  operator: '' | '.' | '->';
  span: SourceSpan;
}

export interface MameStatement {
  kind: 'statement';
  text: string;
  calls: MameCall[];
  span: SourceSpan;
}

export interface MameFunction {
  kind: 'function';
  className: string;
  name: string;
  /** Function-template parameters declared immediately before this definition. */
  templateParameters?: string[];
  parameters: string;
  body: string;
  statements: MameStatement[];
  span: SourceSpan;
  bodySpan: SourceSpan;
}

export interface MameMacro {
  kind: 'macro';
  name: string;
  args: string[];
  text: string;
  span: SourceSpan;
}

export interface MameClass {
  kind: 'class';
  name: string;
  /** Base class names with any template argument list stripped. */
  bases: string[];
  /** Template arguments this class supplies to a template base, by base name. */
  baseTemplateArguments?: Record<string, string[]>;
  /** Template parameter names when this class is itself a template. */
  templateParameters?: string[];
  body: string;
  span: SourceSpan;
  bodySpan: SourceSpan;
}

export interface MameTranslationUnit {
  file: string;
  source: string;
  masked: string;
  macros: MameMacro[];
  classes: MameClass[];
  functions: MameFunction[];
}

export interface MameAst {
  units: MameTranslationUnit[];
}

/** Replace comments with spaces while preserving byte offsets and newlines. */
export function maskComments(source: string): string {
  const chars = [...source];
  let i = 0;
  while (i < chars.length) {
    if (chars[i] === '"' || chars[i] === "'") {
      const quote = chars[i++];
      while (i < chars.length) {
        if (chars[i] === '\\') i += 2;
        else if (chars[i++] === quote) break;
      }
      continue;
    }
    if (chars[i] === '/' && chars[i + 1] === '/') {
      chars[i++] = ' ';
      chars[i++] = ' ';
      while (i < chars.length && chars[i] !== '\n') chars[i++] = ' ';
      continue;
    }
    if (chars[i] === '/' && chars[i + 1] === '*') {
      chars[i++] = ' ';
      chars[i++] = ' ';
      while (i < chars.length) {
        if (chars[i] === '*' && chars[i + 1] === '/') {
          chars[i++] = ' ';
          chars[i++] = ' ';
          break;
        }
        if (chars[i] !== '\n' && chars[i] !== '\r') chars[i] = ' ';
        i++;
      }
      continue;
    }
    i++;
  }
  return chars.join('');
}

export function parseMameSource(file: string, source: string): MameTranslationUnit {
  const masked = maskComments(source);
  const lineStarts = buildLineStarts(source);
  const span = (start: number, end: number) => makeSpan(file, lineStarts, start, end);

  const functions: MameFunction[] = [];
  const occupied: [number, number][] = [];
  const functionRe =
    /(?:^|\n)\s*(?:[\w:<>,~*&]+\s+)+(?:[*&]+\s*)?(\w+)(?:\s*<[^<>();{}]*>)?::(\w+)\s*\(([^;{}]*)\)\s*(?:const\s*)?\{/g;
  let fm: RegExpExecArray | null;
  while ((fm = functionRe.exec(masked)) !== null) {
    const braceStart = masked.indexOf('{', fm.index + fm[0].length - 1);
    const braceEnd = matchPair(masked, braceStart, '{', '}');
    if (braceEnd < 0) continue;
    const qualifiedName = masked.slice(fm.index, braceStart)
      .search(new RegExp(`\\b${fm[1]}\\b`)) + fm.index;
    const lineStart = masked.lastIndexOf('\n', qualifiedName) + 1;
    const start = lineStart + (masked.slice(lineStart, qualifiedName).search(/\S/) < 0
      ? masked.slice(lineStart, qualifiedName).length
      : masked.slice(lineStart, qualifiedName).search(/\S/));
    const bodyStart = braceStart + 1;
    const body = source.slice(bodyStart, braceEnd);
    const templateParameters = functionTemplateParameters(masked, fm.index, fm[1]!);
    functions.push({
      kind: 'function',
      className: fm[1],
      name: fm[2],
      ...(templateParameters.length ? { templateParameters } : {}),
      parameters: source.slice(
        masked.indexOf('(', fm.index),
        matchPair(masked, masked.indexOf('(', fm.index), '(', ')') + 1,
      ).slice(1, -1),
      body,
      statements: parseStatements(file, source, masked, bodyStart, braceEnd, lineStarts),
      span: span(start, braceEnd + 1),
      bodySpan: span(bodyStart, braceEnd),
    });
    occupied.push([start, braceEnd + 1]);
    functionRe.lastIndex = braceEnd + 1;
  }

  const memberMacroRe =
    /\b(INTERRUPT_GEN_MEMBER|TIMER_CALLBACK_MEMBER|TIMER_DEVICE_CALLBACK_MEMBER|IRQ_CALLBACK_MEMBER|TILEMAP_MAPPER_MEMBER|TILE_GET_INFO_MEMBER)\s*\(\s*(\w+)::(\w+)\s*\)\s*\{/g;
  while ((fm = memberMacroRe.exec(masked)) !== null) {
    const braceStart = masked.indexOf('{', fm.index + fm[0].length - 1);
    const braceEnd = matchPair(masked, braceStart, '{', '}');
    if (braceEnd < 0) continue;
    const bodyStart = braceStart + 1;
    functions.push({
      kind: 'function',
      className: fm[2],
      name: fm[3],
      parameters: memberMacroParameters(fm[1]),
      body: source.slice(bodyStart, braceEnd),
      statements: parseStatements(file, source, masked, bodyStart, braceEnd, lineStarts),
      span: span(fm.index, braceEnd + 1),
      bodySpan: span(bodyStart, braceEnd),
    });
    occupied.push([fm.index, braceEnd + 1]);
    memberMacroRe.lastIndex = braceEnd + 1;
  }

  const videoStartRe =
    /\bVIDEO_START_MEMBER\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)\s*\{/g;
  while ((fm = videoStartRe.exec(masked)) !== null) {
    const braceStart = masked.indexOf('{', fm.index + fm[0].length - 1);
    const braceEnd = matchPair(masked, braceStart, '{', '}');
    if (braceEnd < 0) continue;
    const bodyStart = braceStart + 1;
    functions.push({
      kind: 'function',
      className: fm[1],
      name: `video_start_${fm[2]}`,
      parameters: '',
      body: source.slice(bodyStart, braceEnd),
      statements: parseStatements(file, source, masked, bodyStart, braceEnd, lineStarts),
      span: span(fm.index, braceEnd + 1),
      bodySpan: span(bodyStart, braceEnd),
    });
    occupied.push([fm.index, braceEnd + 1]);
    videoStartRe.lastIndex = braceEnd + 1;
  }

  // MAME's legacy lifecycle overrides are function definitions hidden behind
  // macros. Give them stable names so extraction can select the override that
  // belongs to a machine config and compile it like any other driver method.
  // CALL_MEMBER is represented by the ordered lifecycle plan rather than as
  // an ordinary C++ call, so blank it while preserving source offsets/lines.
  const lifecycleRe =
    /\bMACHINE_(START|RESET)_MEMBER\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)\s*\{/g;
  while ((fm = lifecycleRe.exec(masked)) !== null) {
    const braceStart = masked.indexOf('{', fm.index + fm[0].length - 1);
    const braceEnd = matchPair(masked, braceStart, '{', '}');
    if (braceEnd < 0) continue;
    const bodyStart = braceStart + 1;
    const kind = fm[1]!.toLowerCase();
    const rawBody = source.slice(bodyStart, braceEnd);
    const body = rawBody.replace(
      new RegExp(`\\bMACHINE_${fm[1]}_CALL_MEMBER\\s*\\([^)]*\\)\\s*;?`, 'g'),
      value => value.replace(/[^\r\n]/g, ' '),
    );
    functions.push({
      kind: 'function',
      className: fm[2]!,
      name: `machine_${kind}_${fm[3]}`,
      parameters: '',
      body,
      statements: parseStatements(
        file,
        body,
        maskComments(body),
        0,
        body.length,
        buildLineStarts(body),
      ),
      span: span(fm.index, braceEnd + 1),
      bodySpan: span(bodyStart, braceEnd),
    });
    occupied.push([fm.index, braceEnd + 1]);
    lifecycleRe.lastIndex = braceEnd + 1;
  }

  const classes: MameClass[] = [];
  const classRe = /\bclass\s+(\w+)\s*:\s*([^{]+)\{/g;
  let cm: RegExpExecArray | null;
  while ((cm = classRe.exec(masked)) !== null) {
    const braceStart = masked.indexOf('{', cm.index + cm[0].length - 1);
    const braceEnd = matchPair(masked, braceStart, '{', '}');
    if (braceEnd < 0) continue;
    // MAME device families are sometimes templates instantiated per data width
    // (buffered_spriteram_device<u8> and kin). Keep the base name and record
    // the arguments so the instantiated width stays source-derived.
    const bases: string[] = [];
    const baseTemplateArguments: Record<string, string[]> = {};
    for (const raw of splitMameArgs(cm[2])) {
      const base = raw.replace(/\b(public|protected|private|virtual)\b/g, '').trim();
      const templated = /^(\w+(?:::\w+)*)\s*<([^<>]*)>$/.exec(base);
      const name = (templated?.[1] ?? base).split('::').at(-1)!;
      if (!/^\w+$/.test(name)) continue;
      bases.push(name);
      if (templated) {
        baseTemplateArguments[name] = splitMameArgs(templated[2]!)
          .map(argument => argument.trim())
          .filter(Boolean);
      }
    }
    const templateParameters = classTemplateParameters(masked, cm.index);
    const declaration: MameClass = {
      kind: 'class',
      name: cm[1],
      bases,
      ...(Object.keys(baseTemplateArguments).length ? { baseTemplateArguments } : {}),
      ...(templateParameters.length ? { templateParameters } : {}),
      body: source.slice(braceStart + 1, braceEnd),
      span: span(cm.index, braceEnd + 1),
      bodySpan: span(braceStart + 1, braceEnd),
    };
    classes.push(declaration);

    // Small accessors are commonly defined directly in MAME device headers
    // (for example K005849 scroll RAM). They are executable source just like
    // out-of-class definitions, so retain them in the same function AST.
    const bodyStart = braceStart + 1;
    const bodyMasked = masked.slice(bodyStart, braceEnd);
    const inlineRe = /(?:^|[;:]\s*|\n\s*)(?:virtual\s+|inline\s+|static\s+|constexpr\s+)*(?:[\w:<>,~*&]+\s+)+(\w+)\s*\(([^;{}]*)\)\s*(?:const\s*)?\{/g;
    let im: RegExpExecArray | null;
    while ((im = inlineRe.exec(bodyMasked)) !== null) {
      const localBrace = bodyMasked.indexOf('{', im.index + im[0].length - 1);
      if (localBrace < 0 || braceDepth(bodyMasked, localBrace) !== 0) continue;
      const localEnd = matchPair(bodyMasked, localBrace, '{', '}');
      if (localEnd < 0) continue;
      const absoluteBrace = bodyStart + localBrace;
      const absoluteEnd = bodyStart + localEnd;
      const inlineStart = bodyStart + im.index + (im[0].startsWith('\n') ? 1 : 0);
      functions.push({
        kind: 'function',
        className: declaration.name,
        name: im[1]!,
        parameters: source.slice(
          masked.indexOf('(', bodyStart + im.index),
          matchPair(masked, masked.indexOf('(', bodyStart + im.index), '(', ')') + 1,
        ).slice(1, -1),
        body: source.slice(absoluteBrace + 1, absoluteEnd),
        statements: parseStatements(
          file,
          source,
          masked,
          absoluteBrace + 1,
          absoluteEnd,
          lineStarts,
        ),
        span: span(inlineStart, absoluteEnd + 1),
        bodySpan: span(absoluteBrace + 1, absoluteEnd),
      });
      occupied.push([inlineStart, absoluteEnd + 1]);
      inlineRe.lastIndex = localEnd + 1;
    }
    classRe.lastIndex = braceEnd + 1;
  }

  const macros: MameMacro[] = [];
  const macroRe = /\b([A-Z][A-Z0-9_]+)\s*\(/g;
  let mm: RegExpExecArray | null;
  while ((mm = macroRe.exec(masked)) !== null) {
    if (occupied.some(([start, end]) => mm!.index >= start && mm!.index < end)) {
      continue;
    }
    const open = masked.indexOf('(', mm.index + mm[1].length);
    const close = matchPair(masked, open, '(', ')');
    if (close < 0) continue;
    macros.push({
      kind: 'macro',
      name: mm[1],
      args: splitMameArgs(source.slice(open + 1, close)),
      text: source.slice(mm.index, close + 1),
      span: span(mm.index, close + 1),
    });
    macroRe.lastIndex = close + 1;
  }

  return { file, source, masked, macros, classes, functions };
}

function braceDepth(source: string, end: number): number {
  let depth = 0;
  for (let index = 0; index < end; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}') depth--;
  }
  return depth;
}

/** `template <typename Type>` immediately preceding a class declaration. */
function classTemplateParameters(masked: string, classIndex: number): string[] {
  const preceding = masked.slice(Math.max(0, classIndex - 200), classIndex);
  const match = /template\s*<([^<>]*)>\s*$/.exec(preceding);
  if (!match) return [];
  return splitMameArgs(match[1]!)
    .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1] ?? '')
    .filter(Boolean);
}

/**
 * Template parameters belonging to an out-of-class member definition.
 *
 * A preceding template declaration may instead specialize the class itself
 * (`template<typename T> void device<T>::method()`); in that form the class
 * qualifier contains `<...>` and the parameters are handled by the class
 * hierarchy specializer rather than being mistaken for method parameters.
 */
function functionTemplateParameters(
  masked: string,
  functionIndex: number,
  className: string,
): string[] {
  const header = masked.slice(functionIndex, masked.indexOf('{', functionIndex));
  const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (new RegExp(`\\b${escapedClass}\\s*<`).test(header)) return [];
  const classIndex = header.search(new RegExp(`\\b${escapedClass}\\s*::`));
  if (classIndex < 0) return [];
  const match = /template\s*<([^<>]*)>[\s\S]*$/.exec(header.slice(0, classIndex));
  if (!match) return [];
  return splitMameArgs(match[1]!).flatMap(parameter => {
    const name = /([A-Za-z_]\w*)\s*(?:=.*)?$/.exec(parameter.trim())?.[1];
    return name ? [name] : [];
  });
}

function memberMacroParameters(name: string): string {
  if (name === 'INTERRUPT_GEN_MEMBER') return 'device_t &device';
  if (name === 'IRQ_CALLBACK_MEMBER') return 'int irqline';
  if (name === 'TILEMAP_MAPPER_MEMBER') {
    return 'u32 col, u32 row, u32 num_cols, u32 num_rows';
  }
  if (name === 'TILE_GET_INFO_MEMBER') {
    return 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index';
  }
  return 'int param';
}

export function parseMameAst(files: { file: string; source: string }[]): MameAst {
  return { units: files.map(({ file, source }) => parseMameSource(file, source)) };
}

export function parseCallChain(
  file: string,
  text: string,
  absoluteStart = 0,
  fullSource = text,
): MameCall[] {
  const masked = maskComments(text);
  const lineStarts = buildLineStarts(fullSource);
  const calls: MameCall[] = [];
  let i = 0;

  while (i < masked.length) {
    while (i < masked.length && /\s/.test(masked[i])) i++;
    let operator: MameCall['operator'] = '';
    if (masked.startsWith('->', i)) { operator = '->'; i += 2; }
    else if (masked[i] === '.') { operator = '.'; i++; }
    else if (calls.length) { i++; continue; }

    while (i < masked.length && /\s/.test(masked[i])) i++;
    const nameMatch = /^[A-Za-z_]\w*/.exec(masked.slice(i));
    if (!nameMatch) { i++; continue; }
    const nameStart = i;
    const name = nameMatch[0];
    i += name.length;
    while (i < masked.length && /\s/.test(masked[i])) i++;

    const templateArgs: string[] = [];
    if (masked[i] === '<') {
      const templateEnd = matchPair(masked, i, '<', '>');
      if (templateEnd < 0) { i++; continue; }
      templateArgs.push(...splitMameArgs(text.slice(i + 1, templateEnd)));
      i = templateEnd + 1;
      while (i < masked.length && /\s/.test(masked[i])) i++;
    }
    if (masked[i] !== '(') {
      if (!calls.length) continue;
      break;
    }
    const close = matchPair(masked, i, '(', ')');
    if (close < 0) break;
    calls.push({
      name,
      args: splitMameArgs(text.slice(i + 1, close)),
      templateArgs,
      operator,
      span: makeSpan(file, lineStarts, absoluteStart + nameStart, absoluteStart + close + 1),
    });
    i = close + 1;
  }
  return calls;
}

export class MameAstIndex {
  readonly ast: MameAst;

  constructor(ast: MameAst) {
    this.ast = ast;
  }

  findMacro(name: string, argIndex?: number, argValue?: string): MameMacro | undefined {
    for (const unit of this.ast.units) {
      for (const macro of unit.macros) {
        if (macro.name !== name) continue;
        if (argIndex === undefined || normalizeArg(macro.args[argIndex] ?? '') === normalizeArg(argValue ?? '')) {
          return macro;
        }
      }
    }
    return undefined;
  }

  findAnyMacro(names: string[], argIndex: number, argValue: string): MameMacro | undefined {
    for (const name of names) {
      const found = this.findMacro(name, argIndex, argValue);
      if (found) return found;
    }
    return undefined;
  }

  findFunction(className: string, name: string): MameFunction | undefined {
    for (const unit of this.ast.units) {
      const found = unit.functions.find(fn => fn.className === className && fn.name === name);
      if (found) return found;
    }
    return undefined;
  }

  /** Find a method only when its declaring class is unambiguous in the AST. */
  findUniqueFunction(name: string): MameFunction | undefined {
    const matches = this.ast.units
      .flatMap(unit => unit.functions)
      .filter(fn => fn.name === name);
    return matches.length === 1 ? matches[0] : undefined;
  }

  /**
   * Every class deriving from `className` that redefines `name`, i.e. the
   * candidate targets of a virtual call made on a `className` reference.
   *
   * MAME drivers lean on this constantly: popeye's tnx1_state::screen_update
   * calls draw_background(), and which of the three implementations runs is
   * decided by the driver class the GAME macro selected, not by the class the
   * caller happens to be written in.
   */
  overridesOf(className: string, name: string): MameFunction[] {
    return this.ast.units
      .flatMap(unit => unit.classes)
      .filter(declaration =>
        declaration.name !== className && this.derivesFrom(declaration.name, className))
      .map(declaration => this.findFunction(declaration.name, name))
      .filter((fn): fn is MameFunction => Boolean(fn));
  }

  /** Whether `className` is `base` or inherits from it, transitively. */
  derivesFrom(className: string, base: string, seen = new Set<string>()): boolean {
    if (className === base) return true;
    if (seen.has(className)) return false;
    seen.add(className);
    const declaration = this.ast.units
      .flatMap(unit => unit.classes)
      .find(cls => cls.name === className);
    return (declaration?.bases ?? [])
      .some(parent => this.derivesFrom(parent.split('::').at(-1)!, base, seen));
  }

  /**
   * MAME virtual dispatch: the implementation an object of dynamic type
   * `dynamicClass` runs for a call written against `staticClass`.
   *
   * An override that chains to its base (tpp2_state::screen_vblank calls
   * tnx1_state::screen_vblank) needs both bodies live at once, which the
   * generated call graph cannot express yet, so those keep the base body.
   */
  findDispatchedFunction(
    dynamicClass: string | undefined,
    staticClass: string,
    name: string,
  ): MameFunction | undefined {
    const base = this.findFunctionInHierarchy(staticClass, name);
    if (!dynamicClass || !base || !this.derivesFrom(dynamicClass, base.className)) return base;
    const dispatched = this.findFunctionInHierarchy(dynamicClass, name);
    if (!dispatched || dispatched === base) return base;
    return new RegExp(`\\w+::${name}\\s*\\(`).test(dispatched.body) ? base : dispatched;
  }

  findFunctionInHierarchy(className: string, name: string): MameFunction | undefined {
    const visited = new Set<string>();
    const find = (candidate: string): MameFunction | undefined => {
      if (visited.has(candidate)) return undefined;
      visited.add(candidate);
      const own = this.findFunction(candidate, name);
      if (own) return own;
      const declaration = this.ast.units
        .flatMap(unit => unit.classes)
        .find(cls => cls.name === candidate);
      for (const base of declaration?.bases ?? []) {
        const inherited = find(base.split('::').at(-1)!);
        if (inherited) return inherited;
      }
      return undefined;
    };
    return find(className);
  }

  findStatement(text: string, within?: MameFunction): MameStatement | undefined {
    const wanted = normalizeSource(text);
    const functions = within ? [within] : this.ast.units.flatMap(unit => unit.functions);
    return functions.flatMap(fn => fn.statements).find(stmt => normalizeSource(stmt.text) === wanted);
  }
}

export function spanProps(span: SourceSpan | undefined): Record<string, string | number> {
  return span ? {
    sourceFile: span.file,
    sourceLine: span.line,
    sourceColumn: span.column,
    sourceEndLine: span.endLine,
  } : {};
}

function parseStatements(
  file: string,
  source: string,
  masked: string,
  start: number,
  end: number,
  lineStarts: number[],
): MameStatement[] {
  const statements: MameStatement[] = [];
  let statementStart = start;
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;

  for (let i = start; i < end; i++) {
    const c = masked[i];
    if (c === '(') parenDepth++;
    else if (c === ')') parenDepth--;
    else if (c === '{') braceDepth++;
    else if (c === '}') braceDepth--;
    else if (c === '[') bracketDepth++;
    else if (c === ']') bracketDepth--;
    else if (c === ';' && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
      const maskedStatement = masked.slice(statementStart, i);
      const leading = maskedStatement.search(/\S/);
      if (leading >= 0) {
        const absoluteStart = statementStart + leading;
        const raw = source.slice(absoluteStart, i).trim();
        statements.push({
          kind: 'statement',
          text: raw,
          calls: parseCallChain(file, raw, absoluteStart, source),
          span: makeSpan(file, lineStarts, absoluteStart, i + 1),
        });
      }
      statementStart = i + 1;
    }
  }
  return statements;
}

function matchPair(source: string, open: number, left: string, right: string): number {
  if (open < 0 || source[open] !== left) return -1;
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    const c = source[i];
    if (c === '"' || c === "'") {
      const quote = c;
      for (i++; i < source.length; i++) {
        if (source[i] === '\\') i++;
        else if (source[i] === quote) break;
      }
    } else if (c === left) depth++;
    else if (c === right && --depth === 0) return i;
  }
  return -1;
}

export function splitMameArgs(source: string): string[] {
  const args: string[] = [];
  let current = '';
  const closing: string[] = [];
  const pairs: Record<string, string> = { '(': ')', '{': '}', '[': ']', '<': '>' };

  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    if (c === '"' || c === "'") {
      const quote = c;
      current += c;
      for (i++; i < source.length; i++) {
        current += source[i];
        if (source[i] === '\\') current += source[++i] ?? '';
        else if (source[i] === quote) break;
      }
    } else if (source.startsWith('<<', i)) {
      current += '<<';
      i++;
    } else if (source.startsWith('>>', i) && closing.at(-1) !== '>') {
      current += '>>';
      i++;
    } else if (pairs[c]) {
      closing.push(pairs[c]);
      current += c;
    } else if (closing.at(-1) === c) {
      closing.pop();
      current += c;
    } else if (c === ',' && !closing.length) {
      args.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  if (current.trim()) args.push(current.trim());
  return args;
}

function buildLineStarts(source: string): number[] {
  const starts = [0];
  for (let i = 0; i < source.length; i++) if (source[i] === '\n') starts.push(i + 1);
  return starts;
}

function makeSpan(file: string, lineStarts: number[], start: number, end: number): SourceSpan {
  const startPos = offsetPosition(lineStarts, start);
  const endPos = offsetPosition(lineStarts, Math.max(start, end - 1));
  return {
    file,
    start,
    end,
    line: startPos.line,
    column: startPos.column,
    endLine: endPos.line,
    endColumn: endPos.column,
  };
}

function offsetPosition(lineStarts: number[], offset: number): { line: number; column: number } {
  let low = 0;
  let high = lineStarts.length;
  while (low + 1 < high) {
    const mid = (low + high) >>> 1;
    if (lineStarts[mid] <= offset) low = mid;
    else high = mid;
  }
  return { line: low + 1, column: offset - lineStarts[low] + 1 };
}

function normalizeArg(value: string): string {
  const trimmed = value.trim();
  return trimmed.startsWith('"') && trimmed.endsWith('"') ? trimmed.slice(1, -1) : trimmed;
}

function normalizeSource(value: string): string {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s*(->|::|[<>()=,.;{}])\s*/g, '$1');
}
