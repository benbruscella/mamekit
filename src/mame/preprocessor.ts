
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
const INTRINSICS = new Set(['BIT', 'BITSWAP', 'TABLE', 'COMBINE_DATA', 'COMMA',
  // Discrete node identities are translated by the host audio protocol.
  'NODE', 'NODE_INDEX', 'NODE_RELATIVE']);

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
  options: { includeForwarders?: boolean; expressions?: boolean } = {},
): FunctionMacro[] {
  const joined = source.replace(/\\[ \t]*\r?\n/g, ' ');
  const macros: FunctionMacro[] = [];
  for (const match of joined.matchAll(/^[ \t]*#define[ \t]+(\w+)\(([^)]*)\)[ \t]*(.*)$/gm)) {
    const [, name, parameters, body] = match;
    if (!name || INTRINSICS.has(name) || TRACING.test(name)) continue;
    // An empty one expands to nothing: Musashi's `#define MMULOG(...)`, its
    // MMU logging switched off, leaves every `MMULOG(...)` call no statement.
    if (!body?.trim()) {
      macros.push({ name, parameters: parameters!.split(',').map(parameter => parameter.trim()).filter(Boolean), body: '' });
      continue;
    }
    // Statement macros only. An *expression* macro is already served better
    // elsewhere: a constant folds through parseDefines, and a symbolic one is
    // forwarded to the runtime by name -- which is how a discrete-sound node
    // reaches its worklet input. Expanding `NAMCO_54XX_0_DATA(base)` to
    // `NODE_RELATIVE(base, 0)` discards the very name the sound runtime routes
    // on, and silenced Galaga and Dig Dug outright.
    if (
      !options.expressions &&
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

/**
 * A function-like expression macro that is one call through a member of the
 * device that defines it: the MB88's `#define READOP(a) (m_cache.read_byte(a))`
 * and `#define RDMEM(a) (m_data.read_byte(a) & 0x0f)`. Like a parameter call
 * it routes on no symbol, and forwarded by name it reached nothing until the
 * board answered it by hand; expanded, the call meets the member the device's
 * own device_start binds to its address space.
 */
export function collectMemberCallMacros(source: string): FunctionMacro[] {
  const macros: FunctionMacro[] = [];
  const joined = source.replace(/\\[ \t]*\r?\n/g, ' ');
  for (const match of joined.matchAll(/^[ \t]*#define[ \t]+(\w+)\(([^)]*)\)[ \t]+(.+?)[ \t]*$/gm)) {
    const body = match[3]!;
    if (/[;{]/.test(body)) continue;
    if (!/^\(?\s*m_\w+\s*(?:\.|->)\s*\w+\s*\(/.test(body)) continue;
    // Nothing a runtime routes by name rides along inside it.
    if (/\b[A-Z_][A-Z0-9_]*\s*\(/.test(body)) continue;
    const parameters = match[2]!.split(',').map(parameter => parameter.trim()).filter(Boolean);
    macros.push({ name: match[1]!, parameters, body: body.trim() });
  }
  return macros;
}

/**
 * A function-like macro that only calls a method on one of its own parameters:
 * `#define PLAY(samp,id,loop) samp->start(id, id, loop)` in vicdual.cpp. It has
 * no `;` for the statement rule above and no symbol for a runtime to route, and
 * forwarded by name it answered 0, so Carnival never started a sample.
 */
export function collectParameterCallMacros(source: string): FunctionMacro[] {
  const macros: FunctionMacro[] = [];
  for (const match of source.matchAll(/^[ \t]*#define[ \t]+(\w+)\(([^)]*)\)[ \t]+(\w+)[ \t]*->[ \t]*(\w+\(.*\))[ \t]*$/gm)) {
    const parameters = match[2]!.split(',').map(parameter => parameter.trim()).filter(Boolean);
    if (parameters.includes(match[3]!)) macros.push({ name: match[1]!, parameters, body: `${match[3]}->${match[4]}` });
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
  // Match the names actually collected rather than an all-caps shape. MAME's
  // macros are usually shouted but not always: the TMS320C1x port accessors
  // are `TMS320C1X_In` / `TMS320C1X_Out`, and an all-caps pattern walked
  // straight past them, leaving `P_IN(...)` half expanded and every port read
  // lowered to zero. Longest name first so one macro cannot mask another it
  // is a prefix of.
  const invocation = new RegExp(
    `\\b(${[...byName.keys()]
      .sort((left, right) => right.length - left.length)
      .map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|')})\\s*\\(`,
  );
  let expanded = body;
  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    let result = '';
    let index = 0;
    while (index < expanded.length) {
      const match = invocation.exec(expanded.slice(index));
      if (!match) break;
      const at = index + match.index;
      const macro = byName.get(match[1]!);
      const open = at + match[0].length - 1;
      const call = macro ? callArguments(expanded, open) : undefined;
      // `CLR_PA_INT()` invokes a macro of no parameters: its one argument,
      // empty, is no argument at all. Counted as one, the 6522's interrupt
      // acknowledge never expanded and reading port A never cleared CA1.
      if (call && macro && !macro.parameters.length && call.args.length === 1 && !call.args[0]) call.args = [];
      // A variadic macro (`MMULOG(...)`) takes any number past its named ones.
      const variadic = macro?.parameters.at(-1) === '...';
      if (!macro || !call || (variadic
        ? call.args.length < macro.parameters.length - 1
        : call.args.length !== macro.parameters.length)) {
        result += expanded.slice(index, at + match[0].length);
        index = at + match[0].length;
        continue;
      }
      let substituted = macro.body;
      if (variadic) {
        const named = macro.parameters.length - 1;
        substituted = substituted.replace(/\b__VA_ARGS__\b/g, call.args.slice(named).join(', '));
      }
      for (const [position, parameter] of macro.parameters.entries()) {
        if (parameter === '...') continue;
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
/**
 * A parenthesised read of driver state: taitosj's
 * `#define GLOBAL_FLIP_X (*m_video_mode & 0x01)`. Not a constant (it reads a
 * member) and not an lvalue alias, it was left unexpanded and answered 0, so
 * every Taito SJ layer was drawn unflipped -- upside down.
 */
function memberExpression(body: string): boolean {
  if (!body.startsWith('(') || !body.endsWith(')') || !/\bm_\w+/.test(body)) return false;
  if (/[;{}]/.test(body) || /(?<![=!<>])=(?!=)/.test(body)) return false;
  let depth = 0;
  for (let index = 0; index < body.length; index++) {
    if (body[index] === '(') depth++;
    else if (body[index] === ')' && --depth === 0 && index !== body.length - 1) return false;
  }
  return depth === 0;
}

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
 * Object-like `#define`s that read driver state in an expression (see
 * memberExpression). Not aliases -- nothing assigns through one -- but a
 * handler that names one means the expression.
 */
export function collectMemberExpressionMacros(source: string): MemberAliasMacro[] {
  const joined = source.replace(/\\[ \t]*\r?\n/g, ' ');
  return [...joined.matchAll(/^[ \t]*#define[ \t]+([A-Z_][A-Z0-9_]*)[ \t]+(.+)$/gm)].flatMap(match => {
    const body = match[2]!.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/, '').trim();
    return !INTRINSICS.has(match[1]!) && !TRACING.test(match[1]!) && memberExpression(body)
      ? [{ name: match[1]!, body }] : [];
  });
}

/** Object-like BIT aliases may read a handler parameter, so cannot be constants. */
export function collectBitAliasMacros(source: string): MemberAliasMacro[] {
  const joined = source.replace(/\\[ \t]*\r?\n/g, ' ');
  return [...joined.matchAll(/^[ \t]*#define[ \t]+([A-Z_][A-Z0-9_]*)[ \t]+(.+)$/gm)].flatMap(match => {
    const body = match[2]!.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/, '').trim();
    return /^BIT\s*\([^;{}#]*\)$/.test(body) ? [{ name: match[1]!, body }] : [];
  });
}

/**
 * A method that does nothing but name a member, by reference:
 * `u16 &REG(unsigned m, unsigned s) noexcept { return m_regs[REGNUM(m, s)]; }`.
 *
 * It is an lvalue as much as a member alias is. The Z80 DMA assigns through
 * it (`REG(WRi, m_reset_pointer) = 0`) and names every register with it
 * (`#define WR0 REG(0, 0)`), so lowered as a call each assignment went
 * nowhere and every register read 0. Inlined, the call is its own body.
 * Each parameter has to appear in the body at most once, so inlining
 * evaluates each argument as often as the call did.
 */
export function referenceAccessorMacros(
  functions: readonly { name: string; parameters: string; body: string; returnsReference?: true }[],
): FunctionMacro[] {
  return functions.flatMap(fn => {
    if (!fn.returnsReference) return [];
    const body = /^\s*return\s+([^;]+?)\s*;\s*$/.exec(fn.body)?.[1];
    if (!body || !MEMBER_ALIAS.test(body)) return [];
    const parameters = fn.parameters.split(',').map(parameter => parameter.trim()).filter(Boolean)
      .map(parameter => /(\w+)\s*(?:=[^,]*)?$/.exec(parameter)?.[1] ?? '');
    if (parameters.some(parameter => !parameter ||
      (body.match(new RegExp(`\\b${parameter}\\b`, 'g'))?.length ?? 0) > 1)) return [];
    return [{ name: fn.name, parameters, body }];
  });
}

/**
 * Expressions over live device state cannot be folded as numeric defines.
 * `accessors` (referenceAccessorMacros) are live state too: a macro naming
 * one names a member.
 */
export function collectDynamicMacros(
  source: string,
  liveNames: ReadonlySet<string> = new Set(),
  accessors: readonly FunctionMacro[] = [],
): { aliases: MemberAliasMacro[]; functions: FunctionMacro[] } {
  const joined = source.replace(/\\[ \t]*\r?\n/g, ' ');
  const candidates = [...joined.matchAll(/^[ \t]*#define[ \t]+(\w+)(\([^\n)]*\))?[ \t]+(.+)$/gm)].flatMap(match => {
    const body = match[3]!.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/, '').trim();
    if (INTRINSICS.has(match[1]!) || TRACING.test(match[1]!) || /[;{}#]/.test(body)) return [];
    return [{ name: match[1]!, body, parameters: match[2] === undefined ? undefined
      : match[2].slice(1, -1).split(',').map(value => value.trim()).filter(Boolean) }];
  });
  const selected = new Set<string>(accessors.map(accessor => accessor.name));
  for (const macro of candidates) {
    // An identity macro is plain arithmetic and expands: the VIC-II's PAL
    // `VIC6569_X_2_EMU(a) (a)` left symbolic answered 0 for every x.
    const calls = [...macro.body.matchAll(/\b(\w+)\s*\(/g)].map(match => match[1]!);
    // Pure arithmetic parameter macros (raster-coordinate conversion, for
    // example) need expansion too. Symbolic host interfaces such as
    // NODE_RELATIVE remain named calls, preserving audio routing identity.
    if (/\bm_\w+\b/.test(macro.body) || (macro.parameters === undefined && [...liveNames].some(name => new RegExp(`\\b${name}\\b`).test(macro.body))) || (macro.parameters?.length && !calls.length
      && macro.parameters.some(parameter => new RegExp(`\\b${parameter}\\b`).test(macro.body)))) selected.add(macro.name);
  }
  for (let pass = 0; pass < candidates.length; pass++) {
    const before = selected.size;
    for (const macro of candidates) if ([...selected].some(name => new RegExp(`\\b${name}\\b`).test(macro.body))) selected.add(macro.name);
    if (selected.size === before) break;
  }
  return {
    aliases: candidates.filter(macro => macro.parameters === undefined && selected.has(macro.name)).map(({ name, body }) => ({ name, body })),
    functions: [
      ...candidates.filter(macro => macro.parameters !== undefined && selected.has(macro.name)).map(({ name, body, parameters }) => ({ name, body, parameters: parameters! })),
      ...accessors,
    ],
  };
}

export function expandDynamicMacros(body: string, macros: ReturnType<typeof collectDynamicMacros>): string {
  let result = body;
  for (let pass = 0; pass < 12; pass++) {
    const next = expandMemberAliasMacros(expandFunctionMacros(result, macros.functions), macros.aliases);
    if (next === result) break;
    result = next;
  }
  return result;
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

/**
 * The statement macros a function defines for itself -- cps1_render_sprites
 * `#define`s DRAWSPRITE inside its own body -- or its translation unit does,
 * expanded where they are used, as the preprocessor would, with the
 * definitions dropped. Left as written, the `#define` line did not parse and
 * the whole function could not lower.
 */
export function expandStatementMacros(body: string, unitSource: string): string {
  const own = collectFunctionMacros(body);
  const macros = [
    ...own,
    ...collectFunctionMacros(unitSource).filter(macro => !own.some(mine => mine.name === macro.name)),
  ];
  const stripped = body.replace(/^[ \t]*#[ \t]*(?:define|undef)\b(?:[^\n]*\\[ \t]*\r?\n)*[^\n]*/gm, '');
  return macros.length ? expandFunctionMacros(stripped, macros) : stripped;
}
