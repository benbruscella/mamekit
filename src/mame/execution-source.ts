// MAME execution source as the handler parser reads it: the C++ idioms every
// compiled device body goes through before lowering (local structs, member
// pointer calls, tracing calls, inactive preprocessor branches). Idioms of
// the language, not of any hardware -- the per-core layers that once lived
// beside these in cpu-compiler.ts are gone (#249): each CPU is its MAME class
// compiled whole by device-compiler.ts.

import { lowerMemberPointerCalls } from './member-pointers.ts';

/**
 * A struct type a function body declares together with its variable --
 * `struct attribute_memory { int row = 0; uint8_t color = 0; } attributes[64];`
 * in popeye's sprite pass -- as that variable built from the fields' initial
 * values (STRUCT_ARRAY / STRUCT_VALUE). A field with no initializer is zero,
 * as value-initialization leaves it.
 */
export function lowerLocalStructs(source: string): string {
  return source.replace(
    /\bstruct\s+\w*\s*\{([^{}]*)\}\s*(\w+)\s*(?:\[\s*([^\]]+?)\s*\])?\s*;/g,
    (whole, fields: string, name: string, count?: string) => {
      const pairs: string[] = [];
      for (const field of fields.split(';').map(item => item.trim()).filter(Boolean)) {
        const declared = /^(?:[\w:]+\s+)+?(\w+)\s*(?:\[[^\]]*\])?\s*(?:=\s*([\s\S]+)|\{\s*([\s\S]*)\s*\})?$/.exec(field);
        if (!declared) return whole;
        pairs.push(JSON.stringify(declared[1]), (declared[2] ?? declared[3] ?? '').trim() || '0');
      }
      return count === undefined
        ? `auto ${name} = STRUCT_VALUE(${pairs.join(', ')});`
        : `auto ${name} = STRUCT_ARRAY(${count}${pairs.length ? `, ${pairs.join(', ')}` : ''});`;
    },
  );
}

export function normalizeMameExecutionSource(source: string): string {
  source = lowerLocalStructs(source);
  // A call through a member-function pointer -- `(this->*m_opcode_table[op])()`,
  // how MAME's MCS-48 and TMS320C1x dispatch every opcode -- is the
  // CALL_METHOD intrinsic on the method name the pointer holds.
  source = lowerMemberPointerCalls(source);
  // A variadic template pack is always empty here: mamekit specializes only
  // the argument lists its call sites name, and it cannot expand a pack. C++
  // discards the branch in that case, so the text goes before parsing --
  // otherwise `if constexpr (sizeof...(B) > 0)` is a condition the handler
  // parser cannot read and the whole method is dropped for a diagnostic.
  source = source.replace(
    /\bif\s+constexpr\s*\(\s*sizeof\s*\.\.\.\s*\([^)]*\)[^;{}]*\)\s*[^;{}]*;/g,
    '',
  );

  // An object-like #define inside a body names its value from there on:
  // Phoenix's update_c24 opens with `#define C24 6.8e-6` and three more.
  for (let define = /^[ \t]*#[ \t]*define[ \t]+([A-Za-z_]\w*)[ \t]+([^\n]*)$/m.exec(source); define;
    define = /^[ \t]*#[ \t]*define[ \t]+([A-Za-z_]\w*)[ \t]+([^\n]*)$/m.exec(source)) {
    const [line, name, value] = define;
    const after = source.slice(define.index + line.length).replace(new RegExp(`\\b${name}\\b`, 'g'), `(${value!.trim()})`);
    source = source.slice(0, define.index) + after;
  }
  source = source.replace(/^[ \t]*#[ \t]*undef[ \t]+\w+[ \t]*$/gm, '');

  // C++ attributes (`[[maybe_unused]] int endskip`) change no behaviour.
  source = source.replace(/\[\[\s*\w+(?:::\w+)?(?:\([^)]*\))?\s*\]\]\s*/g, '');

  let normalized = stripTracingCalls(stripInactivePreprocessorBranches(source))
    // An elaborated type specifier names the same type without its keyword:
    // segaic16's tile callbacks cast `(const struct tilemap_callback_info *)`,
    // which the parser read as two type names and dropped the declaration.
    .replace(/\b(?:struct|union)\s+(?=[A-Za-z_][\w:]*\s*[*&)])/g, '')
    .replace(/^[ \t]*#if\s+0[^\r\n]*\r?\n[\s\S]*?^[ \t]*#endif[^\r\n]*(?:\r?\n|$)/gm, '')
    .replaceAll('[[fallthrough]];', '')
    .replace(/\bstatic_assert\s*\([^;]*\)\s*;/g, '')
    .replace(/\bbitswap\s*<\s*\d+\s*>\s*\(/g, 'BITSWAP(')
    .replace(/\bDEGREE_TO_RADIAN\s*<[^>]+>\s*\(/g, 'DEGREE_TO_RADIAN(')
    .replace(
      /\bdo\s*\{([^{}]*)\}\s*while\s*\(\s*--(\w+)\s*\)\s*;/g,
      (_entry, body: string, counter: string) =>
        `while (${counter}) { ${body}; ${counter}--; }`,
    )
    // Match within a single line only: with \s+ the type-word chain could
    // reach back across a newline into a preceding // comment ("// character
    // palette\n const uint8_t *char_pal = ..."), splicing the declaration into
    // the comment and silently deleting it (Moon Patrol's init_palette).
    // The declarator's `*` is kept. The interpreter can tell a pointer from a
    // number by looking at the value, but emitted code has only the declared
    // type: dropping it made the Neo Geo's `m_bg_pen = pen_base + 0xfff` a
    // numeric add on a pointer object instead of pointer arithmetic, and the
    // whole fixed layer drew from the wrong pens.
    .replace(
      /\b(?:[\w:<>]+[ \t]+)+\*[ \t]*(?:const[ \t]+)?(\w+)[ \t]*=/g,
      'auto *$1 =',
    )
    // Driver lifecycle handlers use the standard spelling when ownership is
    // retained by a unique_ptr (Phoenix's two banked video pages are the
    // canonical case).  The handler IR has a byte-array ALLOC primitive, so
    // lower the exact uint8_t/u8 array form without guessing the element width
    // of other std::make_unique specializations.
    .replace(
      /\bstd::make_unique\s*<\s*(?:u8|uint8_t)\s*\[\s*\]\s*>\s*\(/g,
      'ALLOC(',
    )
    // A floating-point array keeps fractions: the AY-3-8910 builds its whole
    // mixer into `std::make_unique<sound_stream::sample_t[]>(8*32*32*32)`,
    // and in bytes every level under 1.0 was stored as 0.
    .replace(
      /\bstd::make_unique\s*<\s*(float|double|sound_stream::sample_t)\s*\[\s*\]\s*>\s*\(/g,
      'ALLOCF(',
    )
    // Carry the element width. `make_unique_clear<u16[]>` is a word array,
    // and allocating bytes for it silently truncated every store: wardner's
    // three tile layers are u16 arrays written a byte at a time through
    // COMBINE_DATA, so every high byte vanished and the board's own power-on
    // test reported "FRAM ERROR".
    // `std::make_unique<T[]>(n)` value-initializes its elements too, so it
    // is the same array: the System 16 rotate buffer is `make_unique<uint16_t[]>`.
    .replace(
      /\b(?:std::make_unique|make_unique_clear)\s*<\s*([A-Za-z_][A-Za-z_0-9:]*)\s*\[\s*\]\s*>\s*\(/g,
      (_, type: string) => `${allocIntrinsic(type)}(`,
    )
    // <cmath>'s HUGE_VAL is a double's infinity, which C spells 1.0 / 0.0 and
    // a JSON IR cannot hold as a literal: discrete's transform node starts
    // its stack's top at it.
    .replace(/\bHUGE_VAL\b/g, '(1.0 / 0.0)')
    // An array of pointers holds objects, not bytes: DISCRETE indexes its
    // nodes in `make_unique_clear<discrete_base_node * []>(DISCRETE_MAX_NODES)`.
    .replace(/\b(?:std::)?make_unique(?:_clear)?\s*<\s*(?:const\s+)?[\w:]+\s*\*\s*\[\s*\]\s*>\s*\(/g, 'ALLOC_OBJECTS(')
    .replace(/\bmake_unique_clear\s*<[^>]*\[\]>\s*\(/g, 'ALLOC(')
    // A local constructed with a size holds that many value-initialized
    // elements, of its own kind (the device runtime's VECTOR_OF), rather than
    // reading as the number: the floppy drive's write_flux fills in
    // `std::vector<wspan> wspans(1)`, and `wspans[0].start` threw on a 1.
    .replace(
      /\bstd::vector\s*<\s*([A-Za-z_][\w:]*)\s*>\s+(\w+)\s*\(([^;{}()]+)\)\s*;/g,
      'auto $2 = VECTOR_OF("$1", $3);',
    )
    // A default-constructed local std::vector is an empty, growable array.
    // Keeping it as an uninitialised declaration materialises numeric zero,
    // so push_back silently does nothing and a later reverse walk is empty
    // (M72 builds its complete sprite draw order this way each frame).
    .replace(
      /\bstd::vector\s*<[^;{}>]+>\s+(\w+)\s*;/g,
      'auto $1 = ARRAY();',
    )
    .replace(/\.push_back\s*\(/g, '.push(')
    // A move hands over its operand, which is all a value here is:
    // `m_buffers.emplace_back(std::move(buf))`.
    .replace(/\bstd::move\s*\(/g, '(')
    // Copied in, a vector's new last element is the value: discrete's tasks
    // buffer their outputs with `emplace_back(std::move(buf))`. Built in place
    // from several constructor arguments it stays emplace_back, which makes
    // the element and answers it (generatedVector).
    .replace(/\.emplace_back\s*\(((?:[^(),]|\([^()]*\))*)\)/g, '.push($1)');
  // A static local array declared again further on is another array: the NEC
  // core's i_pre_nec expands ADD4S, SUB4S and CMP4S, each with its own
  // `static const uint8_t table[3]` and its own cycle counts. Each declaration
  // after the first is renamed, with its uses, up to the next one of the name.
  const redeclared = new Map<string, number>();
  // So is one declared `static int` beside a `static constexpr int` of the
  // name: the 68040 MMU's two transparent-translation blocks each declare
  // fcmask and fcmatch, and folding the first through the second's
  // declaration left `static int TABLE(...)`.
  for (const match of normalized.matchAll(/\bstatic\s+(?:(?:const|constexpr)\s+)?\w+\s+(\w+)\s*\[/g)) {
    redeclared.set(match[1]!, (redeclared.get(match[1]!) ?? 0) + 1);
  }
  for (const [name, count] of redeclared) {
    if (count < 2) continue;
    const declaration = new RegExp(String.raw`\bstatic\s+(?:(?:const|constexpr)\s+)?\w+\s+${name}\s*\[`, 'g');
    const starts = [...normalized.matchAll(declaration)].map(match => match.index!);
    let rebuilt = normalized.slice(0, starts[1]);
    starts.slice(1).forEach((start, index) => {
      const end = starts[index + 2] ?? normalized.length;
      rebuilt += normalized.slice(start, end).replace(new RegExp(String.raw`\b${name}\b`, 'g'), `${name}__${index + 2}`);
    });
    normalized = rebuilt;
  }
  for (const match of normalized.matchAll(
    /\bstatic\s+(?:const|constexpr)\s+\w+\s+(\w+)\s*\[\s*(\d+)\s*\]\s*\[\s*(\d+)\s*\]\s*=\s*\{([\s\S]*?)\}\s*;/g,
  )) {
    const name = match[1]!;
    const columns = Number(match[3]);
    const values = [...match[4]!.matchAll(/\{([^{}]*)\}/g)]
      .flatMap(row => row[1]!
        .replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '')
        .split(',')
        .map(value => value.trim())
        .filter(Boolean));
    if (values.length !== Number(match[2]) * columns) continue;
    // Folded only where every use indexes it twice. Handed on whole or by
    // row it stays the array it is, as the one-dimensional folder below keeps
    // one: each Sega Z80 decryptor passes its `convtable[32][4]` to
    // segacrpt's decode(), and segacrp2's points `tbl = swaptable[n]` at a
    // row. Folded, those named nothing and every opcode decoded against zero.
    const folded = normalized
      .replace(match[0], '')
      .replace(
        new RegExp(
          `\\b${name}\\s*\\[((?:[^\\[\\]]|\\[[^\\]]*\\])*)\\]` +
          `\\s*\\[((?:[^\\[\\]]|\\[[^\\]]*\\])*)\\]`,
          'g',
        ),
        (_entry, row: string, column: string) =>
          `TABLE((${row}) * ${columns} + (${column}), ${values.join(', ')})`,
      );
    if (new RegExp(`\\b${name}\\b`).test(folded)) continue;
    normalized = folded;
  }
  for (const match of normalized.matchAll(
    /\bstatic\s+(?:const|constexpr)\s+\w+\s+(\w+)\s*\[[^\]]+\]\s*=\s*\{([^}]+)\}\s*;/g,
  )) {
    const name = match[1]!;
    // A table handed on stays the array it is: as a whole, or by an element's
    // address, as pacman_palette hands compute_resistor_weights
    // `&resistances[1]`. Folded, that pointed at a number.
    const rest = normalized.replace(match[0], '');
    if (new RegExp(`\\b${name}\\b(?!\\s*\\[)`).test(rest) || new RegExp(`&\\s*${name}\\s*\\[`).test(rest)) continue;
    // Comments go before the split, as the two-dimensional folder above already
    // does. MAME annotates hand-aligned tables per entry -- TIA's write-delay
    // table names the register on every line -- and folding the comment into
    // the value made the rest of the emitted TABLE(...) call one comment.
    const values = match[2]!
      .replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '')
      .split(',')
      .map(value => value.trim())
      .filter(Boolean);
    normalized = normalized
      .replace(match[0], '')
      .replace(
        new RegExp(`\\b${name}\\s*\\[((?:[^\\[\\]]|\\[[^\\]]*\\])*)\\]`, 'g'),
        (_entry, index: string) => `TABLE(${index}, ${values.join(', ')})`,
      );
  }
  return normalized;
}

/**
 * Replace MAME's diagnostic-only calls with a harmless expression. A balanced
 * scan is required because log arguments often contain initializer lists and
 * nested calls that cannot be removed safely with a regular expression.
 *
 * The receiver goes with the call: `device().logerror(...)` left as
 * `device().TRACE_NOOP()` was a member call nothing answers, and
 * device_generic_cart_interface::rom_alloc logs that way.
 */
function stripTracingCalls(source: string): string {
  const call = /(?:\b\w+(?:\s*\(\s*\))?\s*(?:\.|->)\s*)*\b(?:LOG[A-Z0-9_]*|logerror|popmessage)\s*\(/g;
  let output = '';
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = call.exec(source)) !== null) {
    let depth = 1;
    let quote = '';
    let escaped = false;
    let index = call.lastIndex;
    for (; index < source.length && depth; index++) {
      const char = source[index]!;
      if (quote) {
        if (escaped) escaped = false;
        else if (char === '\\') escaped = true;
        else if (char === quote) quote = '';
        continue;
      }
      if (char === '"' || char === '\'') quote = char;
      else if (char === '(') depth++;
      else if (char === ')') depth--;
    }
    if (depth) break;
    output += source.slice(cursor, match.index) + 'TRACE_NOOP()';
    cursor = index;
    call.lastIndex = index;
  }
  return output + source.slice(cursor);
}

export function stripInactivePreprocessorBranches(source: string): string {
  const stack: { parent: boolean; selected: boolean; known: boolean }[] = [];
  let active = true;
  const condition = (directive: string, expression: string): boolean | undefined => {
    if (directive === 'ifdef') return false;
    if (directive === 'ifndef') return true;
    const clean = expression.replace(/\/\/.*|\/\*.*?\*\//g, '').trim();
    if (/^[01]$/.test(clean)) return clean === '1';
    if (/^defined\s*(?:\(\s*\w+\s*\)|\w+)$/.test(clean)) return false;
    if (/^!\s*defined\s*(?:\(\s*\w+\s*\)|\w+)$/.test(clean)) return true;
    const booleanExpression = clean.replace(/\bdefined\s*(?:\(\s*\w+\s*\)|\w+)/g, '0');
    if (/^[01\s!&|()]+$/.test(booleanExpression)) {
      const tokens = booleanExpression.match(/&&|\|\||!|[01()]/g) ?? [];
      if (tokens.join('') !== booleanExpression.replace(/\s/g, '')) return undefined;
      let at = 0;
      const primary = (): boolean => {
        const token = tokens[at++];
        if (token === '!') return !primary();
        if (token === '(') {
          const value = disjunction();
          if (tokens[at++] !== ')') throw new Error('unclosed preprocessor condition');
          return value;
        }
        if (token !== '0' && token !== '1') throw new Error('invalid preprocessor condition');
        return token === '1';
      };
      const conjunction = (): boolean => {
        let value = primary();
        while (tokens[at] === '&&') { at++; const right = primary(); value = value && right; }
        return value;
      };
      const disjunction = (): boolean => {
        let value = conjunction();
        while (tokens[at] === '||') { at++; const right = conjunction(); value = value || right; }
        return value;
      };
      try { const value = disjunction(); if (at === tokens.length) return value; } catch { /* preserve for diagnostics */ }
    }
    return undefined;
  };
  const lines = source.split('\n');
  return lines.map((line, lineIndex) => {
    const directive = /^\s*#\s*(if|ifdef|ifndef|elif|else|endif)\b(.*)/.exec(line);
    if (!directive) return active ? line : '';
    const [, kind, expression] = directive;
    if (kind === 'if' || kind === 'ifdef' || kind === 'ifndef') {
      let value = condition(kind, expression);
      // An unknown alternative cannot be silently treated as false. Preserve
      // that whole conditional for diagnostics unless an earlier true arm
      // makes every alternative unreachable.
      if (value === false) {
        let depth = 0;
        for (let index = lineIndex + 1; index < lines.length; index++) {
          const next = /^\s*#\s*(if|ifdef|ifndef|elif|endif)\b(.*)/.exec(lines[index]!);
          if (!next) continue;
          if (next[1] === 'endif') { if (depth-- === 0) break; }
          else if (next[1] !== 'elif') depth++;
          else if (depth === 0 && condition('if', next[2]!) === undefined) {
            value = undefined;
            break;
          }
        }
      }
      stack.push({ parent: active, selected: value === true, known: value !== undefined });
      active = active && value !== false;
      return value === undefined && active ? line : '';
    }
    const frame = stack.at(-1);
    if (!frame) return active ? line : '';
    if (kind === 'endif') {
      stack.pop();
      active = frame.parent;
      return !frame.known && active ? line : '';
    }
    if (!frame.known) return active ? line : '';
    const selected = kind === 'else' || condition('if', expression) === true;
    active = frame.parent && !frame.selected && selected;
    frame.selected ||= selected;
    return '';
  }).join('\n');
}

/** The ALLOC primitive for an element type. */
function allocIntrinsic(type: string): 'ALLOC' | 'ALLOC16' | 'ALLOC32' | 'ALLOCF' {
  if (/^(?:float|double|sound_stream::sample_t)$/.test(type)) return 'ALLOCF';
  if (/^(?:u|s|int|uint)16(?:_t)?$/.test(type) || /^u?int16_t$/.test(type)) return 'ALLOC16';
  if (/^(?:u|s|int|uint)32(?:_t)?$/.test(type) || /^u?int32_t$/.test(type)) return 'ALLOC32';
  return 'ALLOC';
}
