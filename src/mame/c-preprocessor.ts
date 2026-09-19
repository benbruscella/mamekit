// A C preprocessor for the MAME sources that need one.
//
// Most MAME code is read as it is written, with macros expanded where a
// statement uses them. A few CPU cores are not written that way at all: the
// TMS34010 builds its PIXBLT and FILL variants by including 34010gfx.hxx into
// itself twenty times, each time under a different `FUNCTION_NAME(base)
// base##_8_opx`, `BITS_PER_PIXEL` and `PIXEL_OP`. The functions only exist
// after preprocessing, so this runs the directives the way cpp does: defines
// and undefines in order, conditionals with `defined`, token pasting and
// stringising, and quoted includes resolved through the caller.
//
// Only what the caller can resolve is included. An include it cannot find --
// emu.h, screen.h, <bit> -- is MAME's host framework, which the compiler
// supplies itself, so the line is dropped rather than failing.

export interface PreprocessorOptions {
  /** Read a quoted include relative to the file that includes it, or undefined. */
  read(path: string, from: string): { path: string; source: string } | undefined;
  /** Macros defined before the first line, as `-D` would. */
  defines?: Record<string, string>;
  /** Names never expanded, e.g. framework macros the handler compiler lowers itself. */
  preserve?: ReadonlySet<string>;
}

interface Macro {
  parameters?: string[];
  variadic?: boolean;
  body: string;
}

const MAX_INCLUDE_DEPTH = 64;

/** Remove comments, keeping string and character literals and line count. */
export function stripComments(source: string): string {
  let out = '';
  for (let index = 0; index < source.length; index++) {
    const character = source[index]!;
    const next = source[index + 1];
    if (character === '"' || character === "'") {
      const quote = character;
      out += character;
      for (index++; index < source.length; index++) {
        out += source[index];
        if (source[index] === '\\') { out += source[++index] ?? ''; continue; }
        if (source[index] === quote || source[index] === '\n') break;
      }
      continue;
    }
    if (character === '/' && next === '/') {
      while (index < source.length && source[index] !== '\n') index++;
      out += '\n';
      continue;
    }
    if (character === '/' && next === '*') {
      index += 2;
      while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) {
        if (source[index] === '\n') out += '\n';
        index++;
      }
      index++;
      out += ' ';
      continue;
    }
    out += character;
  }
  return out;
}

type Token = { kind: 'identifier' | 'other' | 'space'; text: string; hide?: ReadonlySet<string> };

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /([A-Za-z_]\w*)|(\s+)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(\d[\w.']*)|(##|#|.)/gs;
  for (const match of text.matchAll(pattern)) {
    if (match[1]) tokens.push({ kind: 'identifier', text: match[1] });
    else if (match[2]) tokens.push({ kind: 'space', text: match[2] });
    else tokens.push({ kind: 'other', text: match[0] });
  }
  return tokens;
}

function trimTokens(tokens: Token[]): Token[] {
  let start = 0;
  let end = tokens.length;
  while (start < end && tokens[start]!.kind === 'space') start++;
  while (end > start && tokens[end - 1]!.kind === 'space') end--;
  return tokens.slice(start, end);
}

export class CPreprocessor {
  private readonly macros = new Map<string, Macro>();
  private readonly options: PreprocessorOptions;

  constructor(options: PreprocessorOptions) {
    this.options = options;
    for (const [name, body] of Object.entries(options.defines ?? {})) this.macros.set(name, { body });
  }

  isDefined(name: string): boolean {
    return this.macros.has(name);
  }

  /** Preprocess one file, following the includes the caller can resolve. */
  run(path: string, source: string): string {
    return this.file(path, source, 0);
  }

  /** Expand every macro in a fragment of code under the current definitions. */
  expand(text: string): string {
    return this.expandTokens(tokenize(text), new Set()).map(token => token.text).join('');
  }

  private file(path: string, source: string, depth: number): string {
    if (depth > MAX_INCLUDE_DEPTH) throw new Error(`${path}: include depth exceeds ${MAX_INCLUDE_DEPTH}`);
    const lines = stripComments(source).replace(/\\\r?\n/g, ' ').split(/\r?\n/);
    const out: string[] = [];
    let pending: string[] = [];
    const flush = (): void => {
      if (pending.length) out.push(this.expand(pending.join('\n')));
      pending = [];
    };
    // Each entry: is this branch live, has any branch of the group been taken,
    // and was the enclosing context live.
    const stack: { live: boolean; taken: boolean; outer: boolean }[] = [];
    const live = (): boolean => stack.every(frame => frame.live);
    for (const line of lines) {
      const directive = /^\s*#\s*(\w+)?\s*(.*)$/.exec(line);
      if (!directive) {
        if (live()) pending.push(line);
        continue;
      }
      const [, name = '', rest = ''] = directive;
      switch (name) {
        case 'if': {
          const outer = live();
          const value = outer && this.condition(rest);
          stack.push({ live: value, taken: value, outer });
          break;
        }
        case 'ifdef':
        case 'ifndef': {
          const outer = live();
          const defined = this.macros.has(rest.trim().split(/\s/)[0]!);
          const value = outer && (name === 'ifdef' ? defined : !defined);
          stack.push({ live: value, taken: value, outer });
          break;
        }
        case 'elif': {
          const frame = stack.at(-1);
          if (!frame) throw new Error(`${path}: #elif without #if`);
          const value = frame.outer && !frame.taken && this.condition(rest);
          frame.live = value;
          frame.taken ||= value;
          break;
        }
        case 'else': {
          const frame = stack.at(-1);
          if (!frame) throw new Error(`${path}: #else without #if`);
          frame.live = frame.outer && !frame.taken;
          frame.taken = true;
          break;
        }
        case 'endif':
          if (!stack.pop()) throw new Error(`${path}: #endif without #if`);
          break;
        default: {
          if (!live()) break;
          if (name === 'define') { flush(); this.define(rest); break; }
          if (name === 'undef') { flush(); this.macros.delete(rest.trim()); break; }
          if (name === 'include') {
            const quoted = /^"([^"]+)"/.exec(rest.trim());
            const resolved = quoted ? this.options.read(quoted[1]!, path) : undefined;
            if (resolved) {
              flush();
              out.push(this.file(resolved.path, resolved.source, depth + 1));
            }
            break;
          }
          // #pragma, #error, #line: nothing a lowering reads.
        }
      }
    }
    if (stack.length) throw new Error(`${path}: unterminated #if`);
    flush();
    return out.join('\n');
  }

  private define(rest: string): void {
    const header = /^([A-Za-z_]\w*)(\(([^)]*)\))?\s?([\s\S]*)$/.exec(rest);
    if (!header) return;
    const [, name, functionLike, list = '', body = ''] = header;
    if (!functionLike) {
      this.macros.set(name!, { body: body.trim() });
      return;
    }
    const parameters = list.split(',').map(parameter => parameter.trim()).filter(Boolean);
    const variadic = parameters.at(-1) === '...';
    if (variadic) parameters[parameters.length - 1] = '__VA_ARGS__';
    this.macros.set(name!, { parameters, variadic, body: body.trim() });
  }

  private condition(expression: string): boolean {
    const resolved = expression
      .replace(/\bdefined\s*\(\s*(\w+)\s*\)/g, (_all, name: string) => this.macros.has(name) ? '1' : '0')
      .replace(/\bdefined\s+(\w+)/g, (_all, name: string) => this.macros.has(name) ? '1' : '0');
    const expanded = this.expand(resolved)
      // Any identifier left after expansion is an undefined macro: 0 in cpp.
      .replace(/\b[A-Za-z_]\w*\b/g, '0')
      .replace(/\b(0x[\da-f]+|\d+)[uUlL]+\b/gi, '$1');
    if (!/^[\d\sxXa-fA-F()+\-*/%<>=!&|^~?:]*$/.test(expanded)) {
      throw new Error(`unsupported #if expression: ${expression}`);
    }
    return Boolean(Function(`"use strict"; return (${expanded || '0'});`)());
  }

  /**
   * Expand macros over a token list. The input is a stack, so a replacement is
   * pushed back and rescanned together with what follows it, exactly as cpp
   * rescans; each token carries the names that may no longer expand inside
   * it, which is what stops `#define A A` recursing.
   */
  private expandTokens(tokens: Token[], hidden: ReadonlySet<string>): Token[] {
    const out: Token[] = [];
    const stack: Token[] = tokens.map(token => hidden.size ? { ...token, hide: hidden } : token).reverse();
    while (stack.length) {
      const token = stack.pop()!;
      const hide = token.hide;
      const macro = token.kind === 'identifier' && !hide?.has(token.text) &&
        !this.options.preserve?.has(token.text)
        ? this.macros.get(token.text)
        : undefined;
      if (!macro) { out.push(token); continue; }
      const inner = new Set(hide ?? []).add(token.text);
      if (!macro.parameters) {
        const body = tokenize(macro.body).map(part => ({ ...part, hide: inner }));
        for (let index = body.length - 1; index >= 0; index--) stack.push(body[index]!);
        continue;
      }
      // A function-like name expands only when an argument list follows.
      const skipped: Token[] = [];
      while (stack.at(-1)?.kind === 'space') skipped.push(stack.pop()!);
      if (stack.at(-1)?.text !== '(') {
        for (let index = skipped.length - 1; index >= 0; index--) stack.push(skipped[index]!);
        out.push(token);
        continue;
      }
      stack.pop();
      const args: Token[][] = [[]];
      let depth = 0;
      let closed = false;
      while (stack.length) {
        const part = stack.pop()!;
        if (part.text === '(') depth++;
        if (part.text === ')') {
          if (depth === 0) { closed = true; break; }
          depth--;
        }
        if (part.text === ',' && depth === 0) { args.push([]); continue; }
        args.at(-1)!.push(part);
      }
      if (!closed) throw new Error(`unterminated invocation of macro ${token.text}`);
      const body = this.substitute(macro, args, hide ?? new Set())
        .map(part => ({ ...part, hide: new Set([...(part.hide ?? []), ...inner]) }));
      for (let index = body.length - 1; index >= 0; index--) stack.push(body[index]!);
    }
    return out;
  }

  private substitute(macro: Macro, args: Token[][], hidden: ReadonlySet<string>): Token[] {
    const parameters = macro.parameters!;
    const named = new Map<string, Token[]>();
    parameters.forEach((parameter, index) => {
      if (parameter === '__VA_ARGS__') {
        const rest = args.slice(index);
        named.set(parameter, rest.flatMap((arg, at) => at ? [{ kind: 'other', text: ',' } as Token, ...arg] : arg));
      } else {
        named.set(parameter, args[index] ?? []);
      }
    });
    const body = tokenize(macro.body);
    const result: Token[] = [];
    for (let index = 0; index < body.length; index++) {
      const token = body[index]!;
      if (token.text === '#' && body[index + 1]?.kind === 'identifier' && named.has(body[index + 1]!.text)) {
        const text = trimTokens(named.get(body[++index]!.text)!).map(part => part.text).join('');
        result.push({ kind: 'other', text: JSON.stringify(text) });
        continue;
      }
      if (token.kind === 'identifier' && named.has(token.text)) {
        const pasted = trimTokens(body.slice(index + 1, index + 3)).at(0)?.text === '##' ||
          trimTokens(result).at(-1)?.text === '##';
        const argument = named.get(token.text)!;
        // An operand of ## is substituted as written; any other use is fully
        // macro-expanded first.
        result.push(...(pasted ? trimTokens(argument) : this.expandTokens(argument, hidden)));
        continue;
      }
      result.push(token);
    }
    // Paste: join the tokens either side of each ##.
    const pasted: Token[] = [];
    for (let index = 0; index < result.length; index++) {
      const token = result[index]!;
      if (token.text !== '##') { pasted.push(token); continue; }
      while (pasted.at(-1)?.kind === 'space') pasted.pop();
      let next = index + 1;
      while (result[next]?.kind === 'space') next++;
      const left = pasted.pop();
      const right = result[next];
      const joined = `${left?.text ?? ''}${right?.text ?? ''}`;
      pasted.push({ kind: /^[A-Za-z_]\w*$/.test(joined) ? 'identifier' : 'other', text: joined });
      index = next;
    }
    return pasted;
  }
}
