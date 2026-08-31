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
export function collectFunctionMacros(source: string): FunctionMacro[] {
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
    if (!/[;{]/.test(body)) continue;
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
