// Positional C++ aggregate initializers.
//
// MAME keeps a lot of hardware description in brace initializers that are
// matched to a struct declaration by position, not by name: the slapstic chip
// tables and the Atari motion-object configurations are both read that way.
// The struct declaration is the schema, the initializer is the data, and
// nothing about either is expressible as a regular expression over one line.

/**
 * Drop C and C++ comments so brace walking sees only initializer text.
 *
 * Scanned rather than pattern-replaced: MAME's section banners are lines of
 * slash-slash-stars, so a block-comment pass taken first reads the opener
 * inside one of those and swallows everything up to the next stray closer.
 * In atarimo.h that closer sits in a line comment thirty lines past the
 * struct this has to read. Strings are tracked for the same reason.
 */
export function stripCppComments(source: string): string {
  let out = '';
  let index = 0;
  while (index < source.length) {
    const character = source[index]!;
    const next = source[index + 1];
    if (character === '/' && next === '/') {
      while (index < source.length && source[index] !== '\n') index++;
      out += ' ';
      continue;
    }
    if (character === '/' && next === '*') {
      index += 2;
      while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) {
        index++;
      }
      index += 2;
      out += ' ';
      continue;
    }
    if (character === '"' || character === '\'') {
      const quote = character;
      out += character;
      index++;
      while (index < source.length && source[index] !== quote) {
        if (source[index] === '\\') { out += source[index]!; index++; }
        if (index < source.length) { out += source[index]!; index++; }
      }
      if (index < source.length) { out += source[index]!; index++; }
      continue;
    }
    out += character;
    index++;
  }
  return out;
}

/** Text between the brace at `open` and its match. */
export function braceBody(source: string, open: number, subject = 'initializer'): string {
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}') {
      depth--;
      if (!depth) return source.slice(open + 1, index);
    }
  }
  throw new Error(`unterminated ${subject} at ${open}`);
}

/**
 * Object-like `#define` bodies, including backslash continuations.
 *
 * Table initializers stand runs of repeated values behind a macro
 * (`NO_BITWISE`), so the initializer cannot be read without expanding them.
 */
export function objectMacros(source: string): Map<string, string> {
  const macros = new Map<string, string>();
  const pattern =
    /^[ \t]*#define[ \t]+([A-Z_][A-Z0-9_]*)(?![\w(])[ \t]*((?:[^\n]*\\\r?\n)*[^\n]*)/gm;
  for (const match of source.matchAll(pattern)) {
    macros.set(match[1]!, match[2]!.replace(/\\\r?\n/g, ' ').trim());
  }
  return macros;
}

/**
 * Split one initializer body into its top-level items: a scalar expression or
 * a brace group. The grouping that matters is the braces, not the newlines a
 * particular table happens to be formatted with.
 */
export function initializerItems(body: string): string[] {
  const items: string[] = [];
  let depth = 0;
  let current = '';
  for (const character of body) {
    if (character === '{') {
      depth++;
      if (depth === 1) { current = ''; continue; }
    }
    if (character === '}') {
      depth--;
      if (!depth) { items.push(`{${current}}`); current = ''; continue; }
    }
    if (character === ',' && !depth) {
      if (current.trim()) items.push(current.trim());
      current = '';
      continue;
    }
    current += character;
  }
  if (current.trim()) items.push(current.trim());
  return items;
}

/** Every numeric literal in an initializer item, brace nesting flattened. */
export function initializerNumbers(text: string, subject = 'initializer'): number[] {
  return text
    .replace(/[{}]/g, ' ')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const value = part === 'true' ? 1 : part === 'false' ? 0 : Number(part);
      if (!Number.isFinite(value)) {
        throw new Error(`${subject}: non-numeric entry "${part}"`);
      }
      return value;
    });
}
