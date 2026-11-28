/** One source-requested specialization of a non-type C++ function template. */
export interface FunctionTemplateInstantiation {
  /** Generated artifact key, normally the call-site spelling. */
  id: string;
  arguments: Record<string, number | boolean>;
}

export interface MonomorphizedFunction {
  id: string;
  source: string;
  constants: Record<string, number>;
}

/**
 * Materialize source-known non-type template arguments before handler parsing.
 * This deliberately handles only integral/bool parameters: type substitution
 * remains a C++ front-end concern, while DMA/blitter templates commonly use
 * compile-time lane, bpp, or mode constants that the existing expression
 * folder can consume once they are ordinary literals.
 */
export function monomorphizeFunctionTemplate(
  source: string,
  instantiations: FunctionTemplateInstantiation[],
): MonomorphizedFunction[] {
  const declaration = /template\s*<([^>]+)>\s*/m.exec(source);
  if (!declaration) throw new Error('source has no function-template declaration');
  const parameters = [...declaration[1]!.matchAll(
    /(?:bool|int|unsigned(?:\s+int)?|size_t|u(?:8|16|32|64)|s(?:8|16|32|64))\s+(\w+)/g,
  )].map(match => match[1]!);
  if (!parameters.length) throw new Error('template declares no supported non-type parameters');
  const body = source.slice(0, declaration.index) + source.slice(declaration.index + declaration[0].length);
  return instantiations.map(instantiation => {
    const missing = parameters.filter(parameter => !(parameter in instantiation.arguments));
    if (missing.length) throw new Error(`${instantiation.id}: missing template arguments ${missing.join(', ')}`);
    let specialized = body;
    const constants: Record<string, number> = {};
    for (const parameter of parameters) {
      const raw = instantiation.arguments[parameter]!;
      const value = typeof raw === 'boolean' ? Number(raw) : raw;
      if (!Number.isInteger(value)) throw new Error(`${instantiation.id}: ${parameter} is not integral`);
      constants[parameter] = value;
      specialized = specialized.replace(new RegExp(`\\b${parameter}\\b`, 'g'), String(value));
    }
    return { id: instantiation.id, source: specialized, constants };
  });
}

/**
 * Materialize one specialization of a non-type C++ *class* template across a
 * whole translation unit, so the result parses as an ordinary class.
 *
 * MAME writes a few device families this way -- `tms320c1x_device_base<12>`
 * is the TMS320C10, `<16>` the TMS320C16 -- with every member function
 * carrying a `template <int HighBits>` prefix and a `Class<HighBits>::`
 * scope. Substituting the argument turns the parameter into an ordinary
 * literal the existing expression folder already handles, which is the same
 * bargain monomorphizeFunctionTemplate strikes; type parameters remain a C++
 * front-end concern.
 *
 * Returns source only. The caller decides which class name the flattened
 * members belong to, because MAME's concrete device is a subclass of the base
 * and the two names are not interchangeable in a machine configuration.
 */
export function monomorphizeClassTemplate(
  source: string,
  className: string,
  argumentsByParameter: Record<string, number>,
): string {
  const parameters = Object.keys(argumentsByParameter);
  if (!parameters.length) throw new Error(`${className}: no template arguments given`);
  const declaration = new RegExp(
    `template\\s*<\\s*(?:(?:int|bool|unsigned(?:\\s+int)?|size_t|u(?:8|16|32|64)|s(?:8|16|32|64))\\s+` +
    `(?:${parameters.join('|')})\\s*,?\\s*)+>\\s*`,
    'g',
  );
  if (!declaration.test(source)) {
    throw new Error(`${className}: source declares no template over ${parameters.join(', ')}`);
  }
  declaration.lastIndex = 0;
  let flattened = source.replace(declaration, '');
  // `Class<Args>::` and the `typename Class<Args>::member` disambiguator that
  // a dependent name needs while the class is still a template.
  const argumentList = parameters.map(parameter => `\\s*${parameter}\\s*`).join(',');
  flattened = flattened
    .replace(new RegExp(`\\btypename\\s+${className}\\s*<${argumentList}>\\s*::`, 'g'), '')
    .replace(new RegExp(`\\b${className}\\s*<${argumentList}>`, 'g'), className);
  for (const [parameter, value] of Object.entries(argumentsByParameter)) {
    if (!Number.isInteger(value)) {
      throw new Error(`${className}: ${parameter} is not integral`);
    }
    flattened = flattened.replace(new RegExp(`\\b${parameter}\\b`, 'g'), String(value));
  }
  return flattened;
}

/**
 * Where the statement starting at `from` ends: a block past its `}`, an `if`
 * past its body and any `else` (C++ binds a dangling else to the nearest
 * if), anything else past its `;`.
 */
function statementEnd(source: string, from: number): number {
  let at = from;
  while (at < source.length && /\s/.test(source[at]!)) at++;
  if (source[at] === '{') {
    let depth = 0;
    for (; at < source.length; at++) {
      if (source[at] === '{') depth++;
      else if (source[at] === '}' && --depth === 0) return at + 1;
    }
    return -1;
  }
  const conditional = /^if\s*(?:constexpr\s*)?/.exec(source.slice(at));
  if (conditional) {
    const condition = parenthesized(source, at + conditional[0].length);
    if (!condition) return -1;
    const bodyEnd = statementEnd(source, condition.end);
    if (bodyEnd < 0) return -1;
    const otherwise = /^\s*else\b/.exec(source.slice(bodyEnd));
    return otherwise ? statementEnd(source, bodyEnd + otherwise[0].length) : bodyEnd;
  }
  let depth = 0;
  for (; at < source.length; at++) {
    const char = source[at]!;
    if (char === '(' || char === '{') depth++;
    else if (char === ')' || char === '}') depth--;
    else if (char === ';' && depth === 0) return at + 1;
  }
  return -1;
}

/** The `(condition)` opening at `open`, and where it closes. */
function parenthesized(source: string, open: number): { text: string; end: number } | undefined {
  if (source[open] !== '(') return undefined;
  let depth = 0;
  for (let at = open; at < source.length; at++) {
    if (source[at] === '(') depth++;
    else if (source[at] === ')' && --depth === 0) return { text: source.slice(open + 1, at), end: at + 1 };
  }
  return undefined;
}

/**
 * `if constexpr (condition) a; else if constexpr (...) b; else c;` with every
 * condition a constant, reduced to the branch C++ keeps. The discarded
 * branches are never instantiated, which matters when they name further
 * template instances: konami_helper.h's unrolled bubble sort recurses through
 * `konami_sortlayers<N, A, B - 1>` only while `B > A + 1`, and kept, the dead
 * branch instantiates without end. A chain whose condition the evaluator
 * cannot decide is left as it was.
 */
export function resolveIfConstexpr(
  source: string,
  evaluate: (condition: string) => number | null | undefined,
): string {
  let result = source;
  for (let searchFrom = 0; ;) {
    const found = /\bif\s+constexpr\s*/g;
    found.lastIndex = searchFrom;
    const match = found.exec(result);
    if (!match) return result;
    let at = match.index;
    let chosen: string | undefined;
    let decided = true;
    let end = at;
    // Walk the chain: if constexpr (c) s [else if constexpr (c) s]* [else s].
    for (let first = true; ; first = false) {
      const head = first ? match : /^if\s+constexpr\s*/.exec(result.slice(at));
      if (!head) {
        // A final plain `else s`.
        const bodyEnd = statementEnd(result, at);
        if (bodyEnd < 0) { decided = false; break; }
        if (chosen === undefined) chosen = result.slice(at, bodyEnd);
        end = bodyEnd;
        break;
      }
      const conditionAt = first ? match.index + match[0].length : at + head[0].length;
      const condition = parenthesized(result, conditionAt);
      if (!condition) { decided = false; break; }
      const value = evaluate(condition.text);
      if (value === null || value === undefined) { decided = false; break; }
      const bodyEnd = statementEnd(result, condition.end);
      if (bodyEnd < 0) { decided = false; break; }
      if (chosen === undefined && value) chosen = result.slice(condition.end, bodyEnd);
      end = bodyEnd;
      const rest = /^\s*else\b\s*/.exec(result.slice(bodyEnd));
      if (!rest) break;
      at = bodyEnd + rest[0].length;
    }
    if (!decided) {
      searchFrom = match.index + match[0].length;
      continue;
    }
    const replacement = chosen === undefined ? ';' : chosen.trim().startsWith('{') ? chosen : `{ ${chosen.trim()} }`;
    result = result.slice(0, match.index) + replacement + result.slice(end);
    searchFrom = match.index;
  }
}

/**
 * A call to a function template whose arguments are constants here, spelled
 * with the numbers, so the handler parser names the instance as the compiler
 * emits it: inside `konami_sortlayers<3, 1, 2>`, the call
 * `konami_sortlayers<N, A, B - 1>(...)` is `konami_sortlayers<3, 1, 1>(...)`.
 * Only names `isTemplate` accepts, and only when every argument evaluates.
 */
export function foldTemplateCallArguments(
  source: string,
  isTemplate: (name: string) => boolean,
  evaluate: (argument: string) => number | null | undefined,
): string {
  return source.replace(/(?<![\w.>:])([A-Za-z_]\w*)\s*<([^<>(){};]+)>\s*\(/g, (whole, name: string, args: string) => {
    if (!isTemplate(name)) return whole;
    const values = args.split(',').map(argument => {
      const text = argument.trim().replace(/\btrue\b/g, '1').replace(/\bfalse\b/g, '0');
      return evaluate(text);
    });
    return values.every(value => typeof value === 'number' && Number.isInteger(value))
      ? `${name}<${values.join(', ')}>(` : whole;
  });
}
