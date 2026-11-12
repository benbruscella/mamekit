// C++ template argument deduction for a device's own type templates.
//
// MAME writes width-generic helpers as templates over an integer type and
// lets the call site choose it: the 6809's flags are
// `template<class T> T set_flags(uint8_t mask, T a, T b, uint32_t r)`, whose
// `hi_bit` is `1 << (sizeof(T) * 8 - 1)`. A call names the type explicitly
// (`set_flags<uint8_t>(CC_NZV, ...)`) or leaves it to deduction from an
// argument (`set_flags(CC_NZVC, regop16().w, m_temp.w, r)`, T = uint16_t).
// Compiled once with T left open, every width read as the same, and N and V
// were tested at bit 31 for 8- and 16-bit results alike.
//
// This types the argument expressions as C++ does -- declared types,
// integral promotion, the usual arithmetic conversions -- and names each
// instance `name__T_<type>`, which the device compiler then generates from
// the template with T bound.

/** MAME's integer spellings, normalised to the <cstdint> names. */
const INTEGER_ALIASES: Record<string, string> = {
  u8: 'uint8_t', s8: 'int8_t', u16: 'uint16_t', s16: 'int16_t', u32: 'uint32_t', s32: 'int32_t',
  u64: 'uint64_t', s64: 'int64_t', offs_t: 'uint32_t', 'unsigned int': 'unsigned', 'signed int': 'int',
  'unsigned char': 'uint8_t', 'signed char': 'int8_t', char: 'int8_t', 'unsigned short': 'uint16_t', short: 'int16_t',
};
const INTEGER_TYPES = new Set([
  'uint8_t', 'int8_t', 'uint16_t', 'int16_t', 'uint32_t', 'int32_t', 'uint64_t', 'int64_t', 'int', 'unsigned', 'bool',
]);

/** The <cstdint> name of an integer type spelling, or undefined. */
export function integerType(spelling: string): string | undefined {
  const text = spelling.replace(/\bconst\b|\bvolatile\b|&/g, '').replace(/\s+/g, ' ').trim();
  const name = INTEGER_ALIASES[text] ?? text;
  return INTEGER_TYPES.has(name) ? name : undefined;
}

const RANK: Record<string, number> = {
  bool: 1, int8_t: 2, uint8_t: 2, int16_t: 3, uint16_t: 3, int: 4, int32_t: 4, unsigned: 4, uint32_t: 4, int64_t: 5, uint64_t: 5,
};
const UNSIGNED = new Set(['bool', 'uint8_t', 'uint16_t', 'unsigned', 'uint32_t', 'uint64_t']);

/** Integral promotion: anything narrower than int is int. */
function promote(type: string): string {
  return (RANK[type] ?? 4) < 4 ? 'int' : type === 'int32_t' ? 'int' : type === 'uint32_t' ? 'unsigned' : type;
}

/** The usual arithmetic conversions over two promoted operands. */
function common(left: string, right: string): string {
  const a = promote(left);
  const b = promote(right);
  if (a === b) return a;
  const rankA = RANK[a] ?? 4;
  const rankB = RANK[b] ?? 4;
  if (rankA !== rankB) return rankA > rankB ? a : b;
  return UNSIGNED.has(a) ? a : b;
}

/** A struct or union field: a nested shape, or a width. */
export interface DeductionField {
  name: string;
  valueType?: string;
  bits?: number;
  signed?: boolean;
  fields?: DeductionField[];
}

export interface DeductionScope {
  /** Locals and parameters, then members: name to declared type. */
  variable(name: string): string | undefined;
  /** A struct's or union's fields by its type name. */
  fields(type: string): DeductionField[] | undefined;
  /** A method's declared return type, reference stripped. */
  returns(name: string): string | undefined;
}

/** emucore.h's register unions, as views: `w` and `b.l` of a PAIR16. */
const PAIR_FIELDS: Record<string, DeductionField[]> = {
  PAIR16: [
    { name: 'w', valueType: 'uint16_t' }, { name: 'sw', valueType: 'int16_t' },
    { name: 'b', fields: [{ name: 'l', valueType: 'uint8_t' }, { name: 'h', valueType: 'uint8_t' }] },
    { name: 'sb', fields: [{ name: 'l', valueType: 'int8_t' }, { name: 'h', valueType: 'int8_t' }] },
  ],
  PAIR: [
    { name: 'd', valueType: 'uint32_t' }, { name: 'sd', valueType: 'int32_t' },
    { name: 'w', fields: [{ name: 'l', valueType: 'uint16_t' }, { name: 'h', valueType: 'uint16_t' }] },
    { name: 'sw', fields: [{ name: 'l', valueType: 'int16_t' }, { name: 'h', valueType: 'int16_t' }] },
    { name: 'b', fields: ['l', 'h', 'h2', 'h3'].map(name => ({ name, valueType: 'uint8_t' })) },
    { name: 'sb', fields: ['l', 'h', 'h2', 'h3'].map(name => ({ name, valueType: 'int8_t' })) },
  ],
};

/** A field by name, looking through anonymous members (a union's structs). */
function findField(fields: readonly DeductionField[], name: string): DeductionField | undefined {
  for (const field of fields) {
    if (field.name === name) return field;
    if (!field.name && field.fields) {
      const inner = findField(field.fields, name);
      if (inner) return inner;
    }
  }
  return undefined;
}

/** A shape (`{ fields }`) or a type name, as an expression's static type. */
type StaticType = string | { fields: DeductionField[] };

function fieldType(field: DeductionField): StaticType | undefined {
  if (field.fields) return { fields: field.fields };
  if (field.valueType) return integerType(field.valueType) ?? field.valueType.replace(/\bconst\b|&/g, '').trim();
  if (field.bits) return `${field.signed ? 'int' : 'uint'}${field.bits}_t`;
  return undefined;
}

/**
 * The static type of a C++ expression, as deduction sees it: an integer
 * type's <cstdint> name, a struct or union by its fields, or undefined where
 * the expression is not one this can type.
 */
export function expressionType(text: string, scope: DeductionScope): string | undefined {
  const parsed = new ExpressionTyper(text, scope).parse();
  return typeof parsed === 'string' ? integerType(parsed) ?? parsed : undefined;
}

class ExpressionTyper {
  private readonly tokens: string[];
  private at = 0;
  private readonly scope: DeductionScope;

  constructor(text: string, scope: DeductionScope) {
    this.scope = scope;
    this.tokens = text.match(/0[xX][\da-fA-F]+[uUlL]*|\d+[uUlL]*|[A-Za-z_][\w]*(?:::[A-Za-z_]\w*)*|->|<<|>>|<=|>=|==|!=|&&|\|\||\S/g) ?? [];
  }

  parse(): StaticType | undefined {
    const type = this.conditional();
    return this.at === this.tokens.length ? type : undefined;
  }

  private peek(): string | undefined { return this.tokens[this.at]; }
  private take(): string | undefined { return this.tokens[this.at++]; }

  private conditional(): StaticType | undefined {
    const condition = this.binary(0);
    if (this.peek() !== '?') return condition;
    this.take();
    const whenTrue = this.conditional();
    if (this.take() !== ':') return undefined;
    const whenFalse = this.conditional();
    if (typeof whenTrue !== 'string' || typeof whenFalse !== 'string') return undefined;
    const a = integerType(whenTrue);
    const b = integerType(whenFalse);
    return a && b ? (a === b ? a : common(a, b)) : undefined;
  }

  private static readonly LEVELS = [
    ['||'], ['&&'], ['|'], ['^'], ['&'], ['==', '!='], ['<', '>', '<=', '>='], ['<<', '>>'], ['+', '-'], ['*', '/', '%'],
  ];

  private binary(level: number): StaticType | undefined {
    if (level >= ExpressionTyper.LEVELS.length) return this.unary();
    let left = this.binary(level + 1);
    while (ExpressionTyper.LEVELS[level]!.includes(this.peek() ?? '')) {
      const operator = this.take()!;
      const right = this.binary(level + 1);
      const a = typeof left === 'string' ? integerType(left) : undefined;
      const b = typeof right === 'string' ? integerType(right) : undefined;
      if (['||', '&&', '==', '!=', '<', '>', '<=', '>='].includes(operator)) left = 'bool';
      else if (operator === '<<' || operator === '>>') left = a ? promote(a) : undefined;
      else left = a && b ? common(a, b) : undefined;
    }
    return left;
  }

  private unary(): StaticType | undefined {
    const token = this.peek();
    if (token === '(' && this.isCast()) {
      this.take();
      const words: string[] = [];
      while (this.peek() !== ')') words.push(this.take()!);
      this.take();
      this.unary();
      return integerType(words.join(' ')) ?? words.join(' ');
    }
    if (token === '!') { this.take(); this.unary(); return 'bool'; }
    if (token === '-' || token === '~' || token === '+') {
      this.take();
      const operand = this.unary();
      const type = typeof operand === 'string' ? integerType(operand) : undefined;
      return type ? promote(type) : undefined;
    }
    if (token === '*' || token === '&') { this.take(); this.unary(); return undefined; }
    return this.postfix();
  }

  /** `(uint8_t) x`: a parenthesised integer type followed by an operand. */
  private isCast(): boolean {
    let end = this.at + 1;
    const words: string[] = [];
    while (end < this.tokens.length && this.tokens[end] !== ')') words.push(this.tokens[end++]!);
    return end < this.tokens.length && words.length > 0 && integerType(words.join(' ')) !== undefined;
  }

  private postfix(): StaticType | undefined {
    let type = this.primary();
    while (true) {
      const token = this.peek();
      if (token === '.' || token === '->') {
        this.take();
        const name = this.take();
        const fields = typeof type === 'string' ? (PAIR_FIELDS[type] ?? this.scope.fields(type)) : type?.fields;
        const field = name && fields ? findField(fields, name) : undefined;
        type = field ? fieldType(field) : undefined;
      } else if (token === '[') {
        this.skip('[', ']');
        type = undefined;
      } else if (token === '(') {
        this.skip('(', ')');
        type = undefined;
      } else {
        return type;
      }
    }
  }

  private skip(open: string, close: string): void {
    let depth = 0;
    do {
      const token = this.take();
      if (token === open) depth++;
      else if (token === close) depth--;
      else if (token === undefined) return;
    } while (depth > 0);
  }

  private primary(): StaticType | undefined {
    const token = this.take();
    if (token === undefined) return undefined;
    if (token === '(') {
      const inner = this.conditional();
      if (this.take() !== ')') return undefined;
      return inner;
    }
    if (/^\d|^0x/i.test(token)) return /[uU]/.test(token) ? 'unsigned' : 'int';
    if (token === 'true' || token === 'false') return 'bool';
    if (/^[A-Za-z_]/.test(token)) {
      // A call: its declared return type (a reference returns its referent).
      if (this.peek() === '(') {
        this.skip('(', ')');
        const returned = this.scope.returns(token);
        return returned === undefined ? undefined : integerType(returned) ?? returned;
      }
      const declared = this.scope.variable(token);
      if (declared === undefined) return undefined;
      return integerType(declared) ?? declared.replace(/\bconst\b|&/g, '').trim();
    }
    return undefined;
  }
}

/** A type template a device defines: one type parameter, used as a parameter type. */
export interface TypeTemplate {
  name: string;
  parameter: string;
  /** Per overload arity, which argument positions are of type T. */
  positions: Map<number, number[]>;
}

/** The positions of a parameter list declared as the template's type. */
export function typePositions(parameters: string, parameter: string): number[] | undefined {
  const list = splitTopLevel(parameters).map(entry => entry.trim()).filter(entry => entry && entry !== 'void');
  const positions = list.flatMap((entry, index) =>
    new RegExp(`^(?:const\\s+)?${parameter}\\s*&?\\s*\\w+(?:\\s*=.*)?$`).test(entry) ? [index] : []);
  return positions.length ? positions : undefined;
}

function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of text) {
    if ('(<[{'.includes(char)) depth++;
    else if (')>]}'.includes(char)) depth--;
    if (char === ',' && depth === 0) { parts.push(current); current = ''; } else current += char;
  }
  if (current.trim()) parts.push(current);
  return parts;
}

/** The instance a call names: `set_flags__T_uint16_t`. */
export function typeInstanceName(name: string, type: string): string {
  return `${name}__T_${type}`;
}

/**
 * A body with every call to one of these templates named by its instance:
 * explicit (`set_flags<uint8_t>(`) or deduced from the first typed argument
 * at a T position. A call nothing deduces is left to the generic method.
 */
export function rewriteTypeTemplateCalls(
  body: string,
  templates: ReadonlyMap<string, TypeTemplate>,
  scope: DeductionScope,
  needed: (name: string, type: string) => void,
): string {
  if (!templates.size) return body;
  const names = [...templates.keys()].map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const call = new RegExp(`(?<![\\w.>:])(${names})\\s*(?:<\\s*([^<>()]+?)\\s*>)?\\s*\\(`, 'g');
  let result = '';
  let last = 0;
  for (let match = call.exec(body); match; match = call.exec(body)) {
    const name = match[1]!;
    const open = match.index + match[0].length - 1;
    const close = matchingParen(body, open);
    if (close < 0) continue;
    const template = templates.get(name)!;
    let type = match[2] ? integerType(match[2]) : undefined;
    if (!type && !match[2]) {
      const args = splitTopLevel(body.slice(open + 1, close));
      for (const position of template.positions.get(args.length) ?? []) {
        const deduced = args[position] === undefined ? undefined : expressionType(args[position]!, scope);
        if (deduced && integerType(deduced)) {
          type = integerType(deduced);
          break;
        }
      }
    }
    if (!type) continue;
    needed(name, type);
    result += body.slice(last, match.index) + `${typeInstanceName(name, type)}(`;
    last = open + 1;
  }
  return result + body.slice(last);
}

function matchingParen(text: string, open: number): number {
  let depth = 0;
  for (let index = open; index < text.length; index++) {
    if (text[index] === '(') depth++;
    else if (text[index] === ')' && --depth === 0) return index;
  }
  return -1;
}
