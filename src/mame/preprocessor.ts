// Function-like `#define` expansion, the one preprocessor pass the lowering
// still owed MAME.
//
// A value macro is already folded by `parseDefines`, and a macro whose name the
// IR knows (BIT, BITSWAP) is answered at run time. What was missing is the
// third kind: a macro whose body is *statements*, invoked like a call and
// mutating the caller's own locals. Nothing about that survives a function
// call, so it has to be substituted textually the way the C preprocessor does.
//
// It is not a corner case. MAME's TIA positions every sprite through
// `RESXX_APPLY_ACTIVE_HMOVE(new_horzP0, HMP0, motclkP0)`, whose body reads the
// caller's `curr_x` and adds to the variable it is passed. Unexpanded, the call
// lowered to a macro the runtime had never heard of, which answered 0 and
// changed nothing -- so every Atari 2600 sprite was positioned with MAME's
// horizontal-motion correction silently dropped.

/** A `#define NAME(a, b) ...` collected from MAME source. */
export interface FunctionMacro {
  name: string;
  parameters: string[];
  body: string;
}

/** Names the IR answers itself; expanding a redefinition would shadow them. */
const INTRINSICS = new Set(['BIT', 'BITSWAP', 'TABLE', 'COMBINE_DATA']);

/**
 * MAME's per-device tracing macros, which the execution-source normalizer
 * already removes *at the call site* -- and removes better than expanding
 * them would, because a `LOGxxx(...)` body is a `VERBOSE`-guarded logerror
 * whose expansion is only more text to throw away.
 */
const TRACING = /^(?:LOG[A-Z0-9_]*|VPRINTF|PRINTF)$/;

/**
 * Every function-like macro a source file defines.
 *
 * Line continuations are joined first, so a multi-line macro body -- which is
 * what a statement macro almost always is -- arrives as one string.
 */
export function collectFunctionMacros(
  source: string,
  options: { includeForwarders?: boolean } = {},
): FunctionMacro[] {
  const joined = source.replace(/\\[ \t]*\r?\n/g, ' ');
  const macros: FunctionMacro[] = [];
  for (const match of joined.matchAll(/^[ \t]*#define[ \t]+(\w+)\(([^)]*)\)[ \t]*(.*)$/gm)) {
    const [, name, parameters, body] = match;
    if (!name || INTRINSICS.has(name) || TRACING.test(name) || !body?.trim()) continue;
    // Statement macros only. An *expression* macro is already served better
    // elsewhere: a constant folds through parseDefines, and a symbolic one is
    // forwarded to the runtime by name -- which is how a discrete-sound node
    // reaches its worklet input. Expanding `NAMCO_54XX_0_DATA(base)` to
    // `NODE_RELATIVE(base, 0)` discards the very name the sound runtime routes
    // on, and silenced Galaga and Dig Dug outright.
    if (
      !/[;{]/.test(body) &&
      !(options.includeForwarders && /\b[A-Z_][A-Z0-9_]*\s*\(/.test(body))
    ) continue;
    macros.push({
      name,
      parameters: parameters!.split(',').map(parameter => parameter.trim()).filter(Boolean),
      body: body.trim(),
    });
  }
  return macros;
}

/** The argument list of a call at `open`, split on top-level commas. */
function callArguments(source: string, open: number): { args: string[]; end: number } | undefined {
  let depth = 0;
  let start = open + 1;
  const args: string[] = [];
  for (let index = open; index < source.length; index++) {
    const character = source[index];
    if (character === '(' || character === '[') depth++;
    else if (character === ')' || character === ']') {
      depth--;
      if (depth === 0) {
        args.push(source.slice(start, index));
        return { args: args.map(argument => argument.trim()), end: index + 1 };
      }
    } else if (character === ',' && depth === 1) {
      args.push(source.slice(start, index));
      start = index + 1;
    }
  }
  return undefined;
}

/**
 * Substitute every invocation of `macros` in `body`, innermost arguments first.
 *
 * Bounded rather than recursive: a macro that expands to itself would otherwise
 * spin, and MAME has no legitimate use for more nesting than this allows.
 */
export function expandFunctionMacros(body: string, macros: readonly FunctionMacro[]): string {
  if (!macros.length) return body;
  const byName = new Map(macros.map(macro => [macro.name, macro]));
  let expanded = body;
  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    let result = '';
    let index = 0;
    while (index < expanded.length) {
      const match = /\b([A-Z_][A-Z0-9_]*)\s*\(/.exec(expanded.slice(index));
      if (!match) break;
      const at = index + match.index;
      const macro = byName.get(match[1]!);
      const open = at + match[0].length - 1;
      const call = macro ? callArguments(expanded, open) : undefined;
      if (!macro || !call || call.args.length !== macro.parameters.length) {
        result += expanded.slice(index, at + match[0].length);
        index = at + match[0].length;
        continue;
      }
      let substituted = macro.body;
      for (const [position, parameter] of macro.parameters.entries()) {
        substituted = substituted.replace(
          new RegExp(`\\b${parameter}\\b`, 'g'),
          // Parenthesised so an argument that is an expression keeps its
          // precedence, exactly as a careful C macro would have written it --
          // but never around a statement-macro body's own braces.
          `(${call.args[position]})`,
        );
      }
      result += expanded.slice(index, at) + substituted;
      index = call.end;
      // `MACRO(...);` at a statement position leaves a stray `;` after a
      // braced body. It is a harmless empty statement in C and a parse error
      // risk here, so drop it with the call it belonged to.
      if (substituted.trimEnd().endsWith('}') && expanded[index] === ';') index++;
      changed = true;
    }
    expanded = result + expanded.slice(index);
    if (!changed) break;
  }
  return expanded;
}

/** A `#define NAME m_member[0x04]` -- an object-like alias for device state. */
export interface MemberAliasMacro {
  name: string;
  body: string;
}

/**
 * A member alias is a postfix chain rooted at a member and nothing more:
 * `m_vid_regs[0x04]`, `m_regs[BANK].value`. Anything with an operator in it is
 * an expression macro, which belongs to `parseDefines` or to the runtime by
 * name -- the distinction [[statement-macro-expansion]] was learnt the hard way.
 */
const MEMBER_ALIAS = /^m_\w+(?:\s*\[[^\]]*\]|\s*\.\s*\w+)*$/;

/**
 * Object-like `#define`s that name a device register.
 *
 * MAME writes a chip's register file once and then refers to it by the names on
 * the data sheet: `#define CURLINE m_vid_regs[0x04]`, and thereafter `CURLINE =
 * m_current_line;`. The name is not an interface the way a discrete-sound node
 * macro's is -- there is nothing behind it but the subscript -- so leaving it
 * unexpanded lowers an assignment to an identifier that names no member at all.
 * The Game Boy PPU counted scanlines correctly and published none of them: LY
 * read 0 forever and the boot ROM waited for line 0x90 that never came.
 */
export function collectMemberAliasMacros(source: string): MemberAliasMacro[] {
  const joined = source.replace(/\\[ \t]*\r?\n/g, ' ');
  const aliases: MemberAliasMacro[] = [];
  for (const match of joined.matchAll(/^[ \t]*#define[ \t]+([A-Z_][A-Z0-9_]*)[ \t]+(.+)$/gm)) {
    const [, name, rest] = match;
    const body = rest!.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/, '').trim();
    if (!name || INTRINSICS.has(name) || TRACING.test(name)) continue;
    if (!MEMBER_ALIAS.test(body)) continue;
    aliases.push({ name, body });
  }
  return aliases;
}

/**
 * Substitute member-alias macros in `body`.
 *
 * No parentheses: the body is already a postfix chain, and wrapping one turns
 * an assignment target into a parenthesised lvalue the handler parser has no
 * reason to accept.
 */
export function expandMemberAliasMacros(
  body: string,
  aliases: readonly MemberAliasMacro[],
): string {
  let expanded = body;
  for (const alias of aliases) {
    expanded = expanded.replace(new RegExp(`\\b${alias.name}\\b`, 'g'), alias.body);
  }
  return expanded;
}
