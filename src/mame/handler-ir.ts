import { maskComments } from './ast.ts';
import type { GeneratedExpression, GeneratedHandlerOperation, GeneratedHandlerProgram } from '../ir/board.ts';
import { walkExpressions, walkOperations } from '../ir/walk.ts';

interface Token {
  kind: 'identifier' | 'number' | 'string' | 'operator' | 'punctuation' | 'eof';
  text: string;
  offset: number;
}

/**
 * C++ type keywords, shared with the emitters.
 *
 * `sizeof` is the reason this is exported: `sizeof(uint8_t)` names a type and
 * answers with that type's width, while `sizeof buffer` names a value and
 * answers with the whole object's size. Only this set separates the two.
 */
export const TYPE_WORDS = new Set([
  'auto', 'bool', 'char', 'const', 'constexpr', 'double', 'float', 'int', 'offs_t', 'pen_t', 'static',
  'rectangle', 'rgb_t', 'tilemap_memory_index',
  's8', 's16', 's32', 's64', 'u8', 'u16', 'u32', 'u64',
  'int8_t', 'int16_t', 'int32_t', 'int64_t',
  'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t', 'unsigned',
]);

const BINARY_PRECEDENCE: Record<string, number> = {
  '||': 1,
  '&&': 2,
  '|': 3,
  '^': 4,
  '&': 5,
  '==': 6,
  '!=': 6,
  '<': 7,
  '<=': 7,
  '>': 7,
  '>=': 7,
  '<<': 8,
  '>>': 8,
  '+': 9,
  '-': 9,
  '*': 10,
  '/': 10,
  '%': 10,
};

const ASSIGNMENT_OPERATORS = new Set([
  '=', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>=',
]);

/**
 * Compile the deliberately small C++ subset used by MAME driver handlers.
 * Unsupported constructs remain attached as diagnostics; callers must not
 * guess at their behavior.
 */
export function compileMameHandler(body: string): GeneratedHandlerProgram {
  // C++ pointer-to-member invocation has no distinct runtime value in the IR.
  // Preserve it as a normal call through the member slot; the surrounding
  // source null check still controls whether the call is reached.
  const executable = body
    .replace(
      /\(\s*this\s*->\s*\*\s*(m_\w+)\s*\)\s*\(/g,
      '$1(',
    )
    // Named C++ casts carry the same numeric/view semantics as an ordinary
    // cast in handler IR: reinterpret_cast appears in byte-backed sprite RAM,
    // and every slot device recovers its card with
    // `dynamic_cast<interface *>(get_card_device())`. Left unrecognised the
    // whole cast lowered as a call to an unknown function, whose placeholder
    // return then OVERWROTE the card the slot had just resolved -- so every
    // Atari 2600 joystick read came back as an empty port.
    .replace(
      /\b(?:reinterpret|dynamic|static|const)_cast\s*<([^>]+)>\s*\(([^;]+)\)/g,
      '($1)($2)',
    )
    // MAME's frequency literal macros are preprocessing tokens whose leading
    // digit otherwise looks like a number followed by a stray identifier.
    .replace(/\b(\d+(?:\.\d+)?)_MHz_XTAL\b/g, (_all, mhz) =>
      String(Number(mhz) * 1_000_000))
    .replace(/\b(\d+(?:\.\d+)?)_kHz_XTAL\b/g, (_all, khz) =>
      String(Number(khz) * 1_000));
  const parser = new HandlerParser(tokenize(executable));
  const program = parser.parse();
  markFloatingLocals(program.operations);
  return program;
}

/** Locals whose declared type makes every read of them a floating-point value. */
const FLOATING_TYPES = /\b(?:float|double)\b/;

/**
 * C++ picks integer or floating division from the operands' declared types, but
 * the IR expression tree only records the text. Mark identifiers that name a
 * `float`/`double` local so `isFloatingExpression` sees what the compiler saw:
 * Mr. Do!'s palette computes its whole resistor network through float locals
 * with no literal or cast in the divisions, and truncated to a black palette.
 */
function markFloatingLocals(operations: GeneratedHandlerOperation[]): void {
  const floating = new Set<string>();
  walkOperations(operations, operation => {
    if (operation.op === 'declare' && FLOATING_TYPES.test(operation.valueType ?? '')) {
      floating.add(operation.name);
    }
  });
  if (!floating.size) return;
  walkExpressions(operations, expression => {
    if (expression.kind === 'identifier' && floating.has(expression.name)) {
      expression.floating = true;
    }
  });
}

class HandlerParser {
  private index = 0;
  private diagnostics: string[] = [];
  private readonly tokens: Token[];
  /**
   * Range-for bindings in scope. `for (auto &elem : m_Regs)` gives `elem` no
   * storage of its own -- it names one element of the sequence -- so the name
   * resolves to that element's subscript wherever the body mentions it, reads
   * and writes alike.
   */
  private readonly rangeBindings = new Map<string, GeneratedExpression>();
  private rangeDepth = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): GeneratedHandlerProgram {
    const operations = this.parseOperations();
    return { operations, diagnostics: this.diagnostics };
  }

  private parseOperations(stop = ''): GeneratedHandlerOperation[] {
    const operations: GeneratedHandlerOperation[] = [];
    while (!this.at('eof') && (!stop || !this.atText(stop))) {
      const operation = this.parseStatement();
      if (Array.isArray(operation)) operations.push(...operation);
      else if (operation) operations.push(operation);
    }
    if (stop) this.consume(stop);
    return operations;
  }

  private parseStatement(): GeneratedHandlerOperation | GeneratedHandlerOperation[] | undefined {
    if (this.consume(';')) return undefined;
    if (this.consume('{')) return this.parseOperations('}');
    if (this.atText('if')) return this.parseIf();
    if (this.atText('for')) return this.parseFor();
    if (this.atText('while')) return this.parseWhile();
    if (this.atText('switch')) return this.parseSwitch();
    if (this.atText('return')) return this.parseReturn();
    if (this.atText('break')) {
      this.take();
      if (!this.consume(';')) this.unsupportedStatement('break without semicolon');
      return { op: 'break' };
    }
    if (this.atText('continue')) {
      this.take();
      if (!this.consume(';')) this.unsupportedStatement('continue without semicolon');
      return { op: 'continue' };
    }
    if (this.atText('using')) {
      while (!this.at('eof') && !this.consume(';')) this.take();
      return undefined;
    }
    if (this.atText('do')) return this.parseDoWhile();
    if (this.isDeclaration()) return this.parseDeclaration();

    const start = this.peek();
    const expression = this.parseExpression();
    if (!expression) {
      this.unsupportedStatement(`could not parse statement at byte ${start.offset}`);
      return undefined;
    }
    if (expression.kind === 'assignment') {
      const assignments: GeneratedHandlerOperation[] = [{
        op: 'assign',
        target: expression.target,
        operator: expression.operator,
        value: expression.value,
      }];
      // A C++ prefix update is an lvalue (`++cursor &= mask`). JavaScript
      // assignment expressions are values, so retain the update as a separate
      // operation. Evaluate the RHS first, as C++17 assignment requires.
      if (expression.target.kind === 'assignment' && !expression.target.postfix &&
          expression.target.target.kind === 'identifier') {
        let temporary = `__mame_assignment_${this.index}`;
        while (this.tokens.some(token => token.text === temporary)) temporary += '_';
        assignments.splice(0, 1,
          { op: 'declare', name: temporary, value: expression.value },
          { op: 'assign', target: expression.target.target,
            operator: expression.target.operator, value: expression.target.value },
          { op: 'assign', target: expression.target.target,
            operator: expression.operator, value: { kind: 'identifier', name: temporary } },
        );
      }
      while (this.consume(',')) {
        const next = this.parseExpression();
        if (!next || next.kind !== 'assignment') {
          this.unsupportedStatement(`invalid comma assignment at byte ${start.offset}`);
          return assignments;
        }
        assignments.push({
          op: 'assign',
          target: next.target,
          operator: next.operator,
          value: next.value,
        });
      }
      if (!this.consume(';')) {
        this.unsupportedStatement(`invalid assignment at byte ${start.offset}`);
        return undefined;
      }
      return assignments.length === 1 ? assignments[0] : assignments;
    }
    if (ASSIGNMENT_OPERATORS.has(this.peek().text)) {
      const operator = this.take().text;
      const value = this.parseExpression();
      if (!value || !this.consume(';')) {
        this.unsupportedStatement(`invalid assignment at byte ${start.offset}`);
        return undefined;
      }
      return { op: 'assign', target: expression, operator, value };
    }
    if (this.peek().text === '++' || this.peek().text === '--') {
      const operator = this.take().text === '++' ? '+=' : '-=';
      if (!this.consume(';')) {
        this.unsupportedStatement(`invalid increment at byte ${start.offset}`);
        return undefined;
      }
      return {
        op: 'assign',
        target: expression,
        operator,
        value: { kind: 'number', value: 1 },
      };
    }
    if (!this.consume(';')) {
      this.unsupportedStatement(`unsupported expression statement at byte ${start.offset}`);
      return undefined;
    }
    const operation = this.expressionStatement(expression);
    if (!operation) {
      this.diagnostics.push(`discarded non-call expression at byte ${start.offset}`);
      return undefined;
    }
    return operation;
  }

  /**
   * Preserve side effects in expression statements. MAME commonly uses a
   * conditional expression to choose which tilemap receives a dirty mark:
   * `Which ? foreground() : background();`.
   */
  private expressionStatement(
    expression: GeneratedExpression,
  ): GeneratedHandlerOperation | undefined {
    if (expression.kind === 'call') return { op: 'call', expression };
    if (expression.kind === 'assignment') {
      return {
        op: 'assign',
        target: expression.target,
        operator: expression.operator,
        value: expression.value,
      };
    }
    if (expression.kind !== 'conditional') return undefined;
    const whenTrue = this.expressionStatement(expression.whenTrue);
    const whenFalse = this.expressionStatement(expression.whenFalse);
    if (!whenTrue || !whenFalse) return undefined;
    return {
      op: 'if',
      condition: expression.condition,
      then: [whenTrue],
      else: [whenFalse],
    };
  }

  private parseIf(): GeneratedHandlerOperation | undefined {
    this.take();
    if (!this.consume('(')) {
      this.unsupportedStatement('if without condition');
      return undefined;
    }
    const condition = this.parseExpression();
    if (!condition || !this.consume(')')) {
      this.unsupportedStatement('invalid if condition');
      return undefined;
    }
    const then = this.parseStatementAsBlock();
    let otherwise: GeneratedHandlerOperation[] | undefined;
    if (this.consume('else')) otherwise = this.parseStatementAsBlock();
    return {
      op: 'if',
      condition,
      then,
      ...(otherwise ? { else: otherwise } : {}),
    };
  }

  private parseStatementAsBlock(): GeneratedHandlerOperation[] {
    if (this.consume('{')) return this.parseOperations('}');
    const statement = this.parseStatement();
    if (!statement) return [];
    return Array.isArray(statement) ? statement : [statement];
  }

  private parseReturn(): GeneratedHandlerOperation | undefined {
    this.take();
    if (this.consume(';')) return { op: 'return' };
    const value = this.parseExpression();
    if (!value || !this.consume(';')) {
      this.unsupportedStatement('invalid return statement');
      return undefined;
    }
    return { op: 'return', value };
  }

  private parseFor(): GeneratedHandlerOperation | undefined {
    this.take();
    if (!this.consume('(')) {
      this.unsupportedStatement('for without control clause');
      return undefined;
    }
    if (this.atRangeForClause()) return this.parseRangeFor();
    let initialize: GeneratedHandlerOperation[] = [];
    if (this.consume(';')) {
      initialize = [];
    } else if (this.isDeclaration()) {
      initialize = this.parseDeclaration();
    } else {
      const operations = this.parseMutationList(';');
      if (!operations) {
        this.unsupportedStatement('invalid for initializer');
        return undefined;
      }
      initialize = operations;
    }
    const condition = this.consume(';')
      ? { kind: 'number' as const, value: 1 }
      : this.parseExpression();
    if (!condition || (this.tokens[this.index - 1]?.text !== ';' && !this.consume(';'))) {
      this.unsupportedStatement('invalid for condition');
      return undefined;
    }
    // The iteration clause is optional in C++: a loop that advances from
    // inside its own body leaves it empty, as TIA's sample loop does
    // (`for (int sampindex = 0; sampindex < stream.samples(); )`).
    const iterate = this.consume(')') ? [] : this.parseMutationList(')');
    if (!iterate) {
      this.unsupportedStatement('invalid for iteration');
      return undefined;
    }
    const body = this.parseStatementAsBlock();
    return { op: 'for', initialize, condition, iterate, body };
  }

  /**
   * Is the clause a range-for? Its declarator and sequence are separated by a
   * lone `:` -- distinct from `::` in a qualified name, and from the `?:` of a
   * conditional, whose `?` is seen first.
   */
  private atRangeForClause(): boolean {
    let depth = 0;
    let conditional = 0;
    for (let cursor = this.index; cursor < this.tokens.length; cursor++) {
      const text = this.tokens[cursor]?.text ?? '';
      if (text === '(' || text === '[' || text === '{') depth++;
      else if (text === ']' || text === '}') depth--;
      else if (text === ')') {
        if (depth === 0) return false;
        depth--;
      } else if (depth === 0 && text === ';') return false;
      else if (depth === 0 && text === '?') conditional++;
      else if (depth === 0 && text === ':') {
        if (conditional > 0) conditional--;
        else return true;
      }
    }
    return false;
  }

  /**
   * Lower `for (auto &elem : sequence)` to the counted loop the IR already
   * executes. The element name is bound to `sequence[index]` for the body, so
   * an assignment through it stores back into the sequence exactly as the
   * reference does in C++.
   */
  private parseRangeFor(): GeneratedHandlerOperation | undefined {
    while (this.peek().kind === 'identifier' && this.tokens[this.index + 1]?.text !== ':') {
      this.take();
    }
    while (this.atText('*') || this.atText('&')) this.take();
    const name = this.peek();
    if (name.kind !== 'identifier' || this.tokens[this.index + 1]?.text !== ':') {
      this.unsupportedStatement('invalid range-for declarator');
      return undefined;
    }
    this.take();
    this.consume(':');
    const sequence = this.parseExpression();
    if (!sequence || !this.consume(')')) {
      this.unsupportedStatement('invalid range-for sequence');
      return undefined;
    }
    // The sequence is evaluated once in C++; hoisting it keeps that true for a
    // sequence that is a call, and keeps the emitted loop cheap either way.
    const depth = this.rangeDepth++;
    const sequenceName = `__range${depth}`;
    const indexName = `__range${depth}_index`;
    const element: GeneratedExpression = {
      kind: 'index',
      object: { kind: 'identifier', name: sequenceName },
      index: { kind: 'identifier', name: indexName },
    };
    const shadowed = this.rangeBindings.get(name.text);
    this.rangeBindings.set(name.text, element);
    const body = this.parseStatementAsBlock();
    if (shadowed) this.rangeBindings.set(name.text, shadowed);
    else this.rangeBindings.delete(name.text);
    this.rangeDepth--;
    return {
      op: 'for',
      // The sequence declaration belongs to the loop's own scope, exactly as
      // the range-init does in C++.
      initialize: [
        { op: 'declare', name: sequenceName, value: sequence },
        { op: 'declare', name: indexName, value: { kind: 'number', value: 0 } },
      ],
      condition: {
        kind: 'binary',
        operator: '<',
        left: { kind: 'identifier', name: indexName },
        right: {
          kind: 'member',
          object: { kind: 'identifier', name: sequenceName },
          property: 'length',
        },
      },
      iterate: [{
        op: 'assign',
        target: { kind: 'identifier', name: indexName },
        operator: '+=',
        value: { kind: 'number', value: 1 },
      }],
      body,
    };
  }

  private parseWhile(): GeneratedHandlerOperation | undefined {
    this.take();
    if (!this.consume('(')) {
      this.unsupportedStatement('while without condition');
      return undefined;
    }
    const condition = this.parseExpression();
    if (!condition || !this.consume(')')) {
      this.unsupportedStatement('invalid while condition');
      return undefined;
    }
    return { op: 'while', condition, body: this.parseStatementAsBlock() };
  }

  private parseDoWhile(): GeneratedHandlerOperation | undefined {
    this.take();
    const body = this.parseStatementAsBlock();
    if (!this.consume('while') || !this.consume('(')) {
      this.unsupportedStatement('do without trailing while condition');
      return undefined;
    }
    const condition = this.parseExpression();
    if (!condition || !this.consume(')') || !this.consume(';')) {
      this.unsupportedStatement('invalid do-while condition');
      return undefined;
    }
    return { op: 'do-while', condition, body };
  }

  private parseSwitch(): GeneratedHandlerOperation | undefined {
    this.take();
    if (!this.consume('(')) {
      this.unsupportedStatement('switch without expression');
      return undefined;
    }
    const expression = this.parseExpression();
    if (!expression || !this.consume(')') || !this.consume('{')) {
      this.unsupportedStatement('invalid switch expression');
      return undefined;
    }
    const cases: Extract<GeneratedHandlerOperation, { op: 'switch' }>['cases'] = [];
    while (!this.at('eof') && !this.atText('}')) {
      const values: GeneratedExpression[] = [];
      let isDefault = false;
      while (this.atText('case') || this.atText('default')) {
        if (this.consume('default')) {
          isDefault = true;
        } else {
          this.take();
          const value = this.parseExpression();
          if (!value) {
            this.unsupportedStatement('invalid switch case');
            return undefined;
          }
          values.push(value);
        }
        if (!this.consume(':')) {
          this.unsupportedStatement('switch case without colon');
          return undefined;
        }
      }
      if (!values.length && !isDefault) {
        this.unsupportedStatement('switch body before first case');
        return undefined;
      }
      const body: GeneratedHandlerOperation[] = [];
      while (
        !this.at('eof') &&
        !this.atText('}') &&
        !this.atText('case') &&
        !this.atText('default')
      ) {
        const statement = this.parseStatement();
        if (Array.isArray(statement)) body.push(...statement);
        else if (statement) body.push(statement);
      }
      cases.push({ ...(isDefault ? {} : { values }), body });
    }
    if (!this.consume('}')) {
      this.unsupportedStatement('unterminated switch');
      return undefined;
    }
    return { op: 'switch', expression, cases };
  }

  private parseMutation(terminator: string): GeneratedHandlerOperation | undefined {
    const target = this.parseExpression();
    if (!target) return undefined;
    if (target.kind === 'assignment') {
      if (!this.consume(terminator)) return undefined;
      return {
        op: 'assign',
        target: target.target,
        operator: target.operator,
        value: target.value,
      };
    }
    let operator = this.peek().text;
    let value: GeneratedExpression | undefined;
    if (ASSIGNMENT_OPERATORS.has(operator)) {
      this.take();
      value = this.parseExpression();
    } else if (operator === '++' || operator === '--') {
      this.take();
      operator = operator === '++' ? '+=' : '-=';
      value = { kind: 'number', value: 1 };
    } else {
      return undefined;
    }
    if (!value || !this.consume(terminator)) return undefined;
    return { op: 'assign', target, operator, value };
  }

  private parseMutationList(terminator: string): GeneratedHandlerOperation[] | undefined {
    const operations: GeneratedHandlerOperation[] = [];
    while (!this.at('eof')) {
      const expression = this.parseExpression();
      if (!expression || expression.kind !== 'assignment') return undefined;
      operations.push({
        op: 'assign',
        target: expression.target,
        operator: expression.operator,
        value: expression.value,
      });
      if (this.consume(terminator)) return operations;
      if (!this.consume(',')) return undefined;
    }
    return undefined;
  }

  private isDeclaration(): boolean {
    if (this.peek().kind !== 'identifier') return false;
    if (TYPE_WORDS.has(this.peek().text)) return true;
    // A template argument list belongs to the type, not to a comparison:
    // `std::vector<uint32_t> &codelookup = ...` is a declaration, and reading
    // its angle brackets as `<` and `>` yields an assignment to a comparison.
    let cursor = this.skipTemplateArguments(this.skipQualifiedName(this.index));
    while (this.tokens[cursor]?.text === '*' || this.tokens[cursor]?.text === '&') cursor++;
    // `Type *const name(...)`: cv-qualifiers belong to the pointer, not to the
    // declared name. Stopping at `const` read the whole statement as an
    // expression, and MAME's cartridge bases open almost every method with
    // `memory_region *const romregion(cart_rom_region());`.
    while (['const', 'volatile'].includes(this.tokens[cursor]?.text ?? '')) cursor++;
    return this.tokens[cursor]?.kind === 'identifier' &&
      ['=', '(', '[', ',', ';'].includes(this.tokens[cursor + 1]?.text ?? '');
  }

  /** Index just past `a::b::c`, having started on its first identifier. */
  private skipQualifiedName(start: number): number {
    let cursor = start + 1;
    while (
      this.tokens[cursor]?.text === '::' &&
      this.tokens[cursor + 1]?.kind === 'identifier'
    ) cursor += 2;
    return cursor;
  }

  /**
   * Index just past a template argument list, or `start` when there is none.
   *
   * C++ cannot tell `a < b > c` from a template by tokens alone; neither can
   * this. What settles it here is what follows the closing bracket -- only a
   * declarator does, and `isDeclaration` checks for one. A run that reaches a
   * statement boundary first was never a template list.
   */
  private skipTemplateArguments(start: number): number {
    if (this.tokens[start]?.text !== '<') return start;
    let depth = 0;
    for (let cursor = start; cursor < this.tokens.length; cursor++) {
      const text = this.tokens[cursor]?.text ?? '';
      if (text === '<') depth++;
      // `vector<pair<int, int>>` ends on one shift token, which closes both.
      else if (text === '>' || text === '>>') {
        depth -= text.length;
        if (depth <= 0) return cursor + 1;
      } else if (text === ';' || text === '{' || text === '}' || text === ')') {
        return start;
      }
    }
    return start;
  }

  private parseDeclaration(): GeneratedHandlerOperation[] {
    const typeWords: string[] = [];
    if (this.peek().kind === 'identifier' && !TYPE_WORDS.has(this.peek().text)) {
      // Keep a qualified type name whole: `std::vector` is one name, and
      // stopping at `std` leaves `::` to be read as an operator.
      let name = this.take().text;
      while (this.atText('::') && this.tokens[this.index + 1]?.kind === 'identifier') {
        this.take();
        name += `::${this.take().text}`;
      }
      typeWords.push(name);
    }
    while (this.peek().kind === 'identifier' && TYPE_WORDS.has(this.peek().text)) {
      typeWords.push(this.take().text);
    }
    // The type's template arguments, if it has any. They name no value the IR
    // carries, so they are consumed rather than recorded.
    this.index = this.skipTemplateArguments(this.index);
    const valueType = typeWords.find(word =>
      word !== 'const' && word !== 'constexpr' && word !== 'static');
    const declarations: GeneratedHandlerOperation[] = [];
    while (!this.at('eof')) {
      let declarator = '';
      while (this.atText('*') || this.atText('&')) declarator += this.take().text;
      while (this.consume('const')) {
        // MAME commonly places const after a pointer declarator.
      }
      const declarationType = valueType
        ? `${valueType}${declarator}`
        : undefined;
      const name = this.peek();
      if (name.kind !== 'identifier') {
        this.unsupportedStatement(`invalid declaration at byte ${name.offset}`);
        return declarations;
      }
      this.take();
      let value: GeneratedExpression | undefined;
      if (this.consume('[')) {
        const length = this.consume(']')
          ? undefined
          : this.parseExpression();
        if (length && !this.consume(']')) {
          this.unsupportedStatement(`invalid array declaration of "${name.text}"`);
          return declarations;
        }
        const directListInitializer = this.consume('{');
        if (directListInitializer || this.consume('=')) {
          if (!directListInitializer && !this.consume('{')) {
            this.unsupportedStatement(`invalid array initializer of "${name.text}"`);
            return declarations;
          }
          const values = this.parseDelimitedExpressions('}');
          if (!values) {
            this.unsupportedStatement(`invalid array initializer of "${name.text}"`);
            return declarations;
          }
          value = values.length ? {
            kind: 'call',
            callee: { kind: 'identifier', name: 'ARRAY' },
            args: values,
          } : {
            kind: 'call',
            callee: { kind: 'identifier', name: 'ALLOC' },
            args: [length ?? { kind: 'number', value: 0 }],
          };
        } else {
          value = {
            kind: 'call',
            callee: { kind: 'identifier', name: 'ALLOC' },
            args: [length ?? { kind: 'number', value: 0 }],
          };
        }
      } else if (this.consume('=')) value = this.parseExpression();
      else if (this.consume('(')) {
        const args = this.parseArguments();
        if (!args) {
          this.unsupportedStatement(`invalid constructor declaration of "${name.text}"`);
          return declarations;
        }
        // C++ direct-initialization with one argument is a conversion, not a
        // constructor call: `offs_t const chunk(offs_t(1) << msb)` and
        // `memory_region *const romregion(cart_rom_region())` both mean "this
        // value, read as this type". Lowered as a call of the type name it
        // resolved to nothing, so a MAME cartridge base computed a zero-sized
        // decode chunk and looped forever. Multiple arguments really are a
        // constructor and stay call-shaped.
        value = args.length === 1
          ? { kind: 'cast', valueType: declarationType ?? valueType ?? '', operand: args[0]! }
          : {
              kind: 'call',
              callee: { kind: 'identifier', name: valueType ?? typeWords[0] ?? '' },
              args,
            };
      } else if (valueType === 'rectangle') {
        value = {
          kind: 'call',
          callee: { kind: 'identifier', name: 'rectangle' },
          args: [],
        };
      }
      declarations.push({
        op: 'declare',
        name: name.text,
        ...(declarationType ? { valueType: declarationType } : {}),
        ...(value ? { value } : {}),
      });
      if (this.consume(';')) return declarations;
      if (!this.consume(',')) {
        this.unsupportedStatement(`invalid declaration of "${name.text}"`);
        return declarations;
      }
    }
    return declarations;
  }

  private parseExpression(minPrecedence = 0): GeneratedExpression | undefined {
    let left = this.parseUnary();
    if (!left) return undefined;
    while (true) {
      const operator = this.peek().text;
      const precedence = BINARY_PRECEDENCE[operator] ?? -1;
      if (precedence < minPrecedence) break;
      this.take();
      const right = this.parseExpression(precedence + 1);
      if (!right) return undefined;
      left = { kind: 'binary', operator, left, right };
    }
    if (minPrecedence === 0 && this.consume('?')) {
      const whenTrue = this.parseExpression();
      if (!whenTrue || !this.consume(':')) return undefined;
      const whenFalse = this.parseExpression();
      if (!whenFalse) return undefined;
      left = { kind: 'conditional', condition: left, whenTrue, whenFalse };
    }
    if (minPrecedence === 0 && ASSIGNMENT_OPERATORS.has(this.peek().text)) {
      const operator = this.take().text;
      const value = this.parseExpression();
      if (!value) return undefined;
      left = { kind: 'assignment', target: left, operator, value };
    }
    return left;
  }

  private parseUnary(): GeneratedExpression | undefined {
    if (this.atText('new')) {
      this.take();
      const value = this.parsePostfix();
      if (value?.kind !== 'call' || value.callee.kind !== 'identifier') {
        this.diagnostics.push('unsupported allocation; expected a named constructor call');
        return undefined;
      }
      return { ...value, callee: { kind: 'identifier', name: `new::${value.callee.name}` } };
    }
    if (this.atText('(') && this.isCast()) {
      this.take();
      const valueType: string[] = [];
      while (this.peek().kind === 'identifier' && TYPE_WORDS.has(this.peek().text)) {
        valueType.push(this.take().text);
      }
      // A cast to a class type -- `(tia *)_chip`. `isCast` only admits the
      // pointer form, and a pointer to a class narrows nothing, so the name is
      // consumed and left out of valueType: what matters is `pointer`, which
      // tells generated code the cast is an identity.
      if (!valueType.length && this.peek().kind === 'identifier') {
        this.index = this.skipQualifiedName(this.index);
      }
      // Recorded, not discarded. The interpreter can tell a pointer from a
      // number by looking at the value, but generated code only has the
      // declared type: dropping the `*` turned bublbobl's
      // `*(uint32_t *)(&m_objectram[offs])` into a numeric narrowing of the
      // address it was supposed to dereference. It is kept beside valueType
      // rather than inside it so the interpreter's narrowing is unchanged.
      const indirection: string[] = [];
      while (this.peek().text === '*' || this.peek().text === '&') {
        indirection.push(this.take().text);
      }
      this.consume(')');
      const operand = this.parseUnary();
      return operand
        ? {
            kind: 'cast',
            valueType: valueType.filter(word => word !== 'const').join(' '),
            ...(indirection.length ? { pointer: true } : {}),
            operand,
          }
        : undefined;
    }
    if (this.peek().text === '++' || this.peek().text === '--') {
      const operator = this.take().text === '++' ? '+=' : '-=';
      const target = this.parseUnary();
      return target
        ? {
            kind: 'assignment',
            target,
            operator,
            value: { kind: 'number', value: 1 },
          }
        : undefined;
    }
    // `sizeof buffer`, without parentheses. The parenthesized `sizeof(T)` form
    // already reads as an ordinary call and is left alone; this one would
    // otherwise be two identifiers in a row and fail the whole statement, which
    // is what dropped every `memset(line, 0xFF, sizeof line)` in TIA's
    // scanline compositor.
    if (this.atText('sizeof') && this.tokens[this.index + 1]?.text !== '(') {
      this.take();
      const operand = this.parseUnary();
      return operand
        ? {
            kind: 'call',
            callee: { kind: 'identifier', name: 'sizeof' },
            args: [operand],
          }
        : undefined;
    }
    if (['!', '~', '-', '+', '&', '*'].includes(this.peek().text)) {
      const operator = this.take().text;
      const operand = this.parseUnary();
      return operand ? { kind: 'unary', operator, operand } : undefined;
    }
    return this.parsePostfix();
  }

  private isCast(): boolean {
    let cursor = this.index + 1;
    if (this.tokens[cursor]?.kind !== 'identifier') return false;
    if (!TYPE_WORDS.has(this.tokens[cursor]!.text)) {
      // A cast to a class type -- `(tia *)_chip`, how MAME's C-style sound
      // modules recover their own state from a void pointer. Only a pointer or
      // reference form can be told from a parenthesized expression by tokens
      // alone: `(name)` on its own is far more often a value than a cast.
      cursor = this.skipQualifiedName(cursor);
      if (this.tokens[cursor]?.text !== '*' && this.tokens[cursor]?.text !== '&') return false;
      while (this.tokens[cursor]?.text === '*' || this.tokens[cursor]?.text === '&') cursor++;
      return this.tokens[cursor]?.text === ')';
    }
    while (
      this.tokens[cursor]?.kind === 'identifier' &&
      TYPE_WORDS.has(this.tokens[cursor]!.text)
    ) cursor++;
    while (this.tokens[cursor]?.text === '*' || this.tokens[cursor]?.text === '&') cursor++;
    return this.tokens[cursor]?.text === ')';
  }

  private parsePostfix(): GeneratedExpression | undefined {
    let expression = this.parsePrimary();
    if (!expression) return undefined;
    while (true) {
      // A free function can be a template too: MAME's bit helpers are written
      // `bitswap<8>(value, 7, 6, ...)`. Fold a numeric argument into the name
      // the same way a templated member call does.
      //
      // A template name in front of `::` is the other form: a class used as a
      // qualifier to call up to a base, which is how MAME's newer bus devices
      // are written -- `mbc_ram_device_base<mbc_dual_device_base>::
      // set_bank_rom_fine(entry)`. Its arguments name no value, so the name
      // carries on to the `::` branch below unchanged.
      if (expression.kind === 'identifier' && this.atText('<')) {
        const templateArgs = this.consumeTemplateArguments(['(', ')', '::']);
        if (!templateArgs) break;
        if (templateArgs.every(argument => /^\d+$/.test(argument))) {
          expression = {
            kind: 'identifier',
            name: `${expression.name}_${templateArgs.join('_')}`,
          };
        }
        continue;
      }
      if (this.consume('(')) {
        const args = this.parseArguments();
        if (!args) return undefined;
        // `float(R1)` is a functional cast, not a call. Left as a call it
        // resolved to no builtin, so MAME's resistor arithmetic divided by
        // zero instead of by the resistor value.
        expression = expression.kind === 'identifier' &&
            TYPE_WORDS.has(expression.name) && args.length === 1
          ? { kind: 'cast', valueType: expression.name, operand: args[0]! }
          : { kind: 'call', callee: expression, args };
      } else if (this.consume('[')) {
        const index = this.parseExpression();
        if (!index || !this.consume(']')) return undefined;
        expression = { kind: 'index', object: expression, index };
      } else if (this.consume('->') || this.consume('.')) {
        const property = this.peek();
        if (property.kind !== 'identifier') return undefined;
        this.take();
        const templateArgs = this.consumeTemplateArguments();
        const specialized = templateArgs?.length &&
          templateArgs.every(arg => /^\d+$/.test(arg))
          ? `${property.text}_${templateArgs.join('_')}`
          : property.text;
        expression = { kind: 'member', object: expression, property: specialized };
      } else if (this.consume('::')) {
        const property = this.peek();
        if (property.kind !== 'identifier') return undefined;
        this.take();
        expression = {
          kind: 'identifier',
          name: `${expressionName(expression)}::${property.text}`,
        };
        // Explicit template arguments (std::min<size_t>) select an overload;
        // they carry no numeric behavior, so the IR keeps the bare name.
        this.consumeTemplateArguments();
      } else if (this.consume('++') || this.consume('--')) {
        expression = {
          kind: 'assignment',
          target: expression,
          operator: this.tokens[this.index - 1]!.text === '++' ? '+=' : '-=',
          value: { kind: 'number', value: 1 },
          postfix: true,
        };
      } else {
        break;
      }
    }
    return expression;
  }

  /**
   * Consume a template argument list on a qualified name when it is
   * unambiguously one: only type-shaped tokens inside, and one of `followers`
   * after. Anything else stays a less-than comparison.
   *
   * The default followers are a call or a closing parenthesis. `::` is the
   * other unambiguous one -- a template class used as a name qualifier, which
   * is how MAME's newer bus devices call up to a base
   * (`mbc_ram_device_base<mbc_dual_device_base>::set_bank_rom_fine(...)`).
   */
  private consumeTemplateArguments(
    followers: readonly string[] = ['(', ')'],
  ): string[] | undefined {
    if (!this.atText('<')) return undefined;
    let cursor = this.index + 1;
    let depth = 1;
    const args: string[] = [];
    let current = '';
    while (depth > 0) {
      const token = this.tokens[cursor];
      if (!token || token.kind === 'eof') return undefined;
      if (token.text === '<') {
        depth++;
        current += token.text;
      } else if (token.text === '>') {
        depth--;
        if (depth > 0) current += token.text;
      } else if (token.text === ',' && depth === 1) {
        args.push(current);
        current = '';
      }
      else if (
        token.kind !== 'identifier' && token.kind !== 'number' &&
        ![',', '*', '&', '::'].includes(token.text)
      ) return undefined;
      else current += token.text;
      cursor++;
    }
    if (!followers.includes(this.tokens[cursor]?.text ?? '')) return undefined;
    args.push(current);
    this.index = cursor;
    return args;
  }

  /**
   * A braced list up to `terminator`.
   *
   * C++ allows a trailing comma in an aggregate initializer, and MAME's
   * hand-aligned tables use one freely -- TIA's `delay[0x40]` write-latency
   * table is written that way. Reading the comma as the start of another
   * element rejected the whole declaration.
   */
  private parseDelimitedExpressions(terminator: string): GeneratedExpression[] | undefined {
    const values: GeneratedExpression[] = [];
    if (this.consume(terminator)) return values;
    while (!this.at('eof')) {
      const value = this.parseExpression();
      if (!value) return undefined;
      values.push(value);
      if (this.consume(terminator)) return values;
      if (!this.consume(',')) return undefined;
      if (this.consume(terminator)) return values;
    }
    return undefined;
  }

  private parseArguments(): GeneratedExpression[] | undefined {
    const args: GeneratedExpression[] = [];
    if (this.consume(')')) return args;
    while (!this.at('eof')) {
      const arg = this.parseExpression();
      if (!arg) return undefined;
      args.push(arg);
      if (this.consume(')')) return args;
      if (!this.consume(',')) return undefined;
    }
    return undefined;
  }

  private parsePrimary(): GeneratedExpression | undefined {
    const token = this.take();
    if (token.kind === 'number') {
      const wide = wideNumberLiteral(token.text);
      return {
        kind: 'number',
        value: parseNumber(token.text),
        ...(isFloatingNumberLiteral(token.text) ? { floating: true } : {}),
        ...(wide ? { wide } : {}),
      };
    }
    if (token.kind === 'string') return { kind: 'string', value: unquote(token.text) };
    if (token.kind === 'identifier') {
      if (token.text === 'true') return { kind: 'number', value: 1 };
      if (token.text === 'false' || token.text === 'nullptr') return { kind: 'number', value: 0 };
      const bound = this.rangeBindings.get(token.text);
      if (bound) return structuredClone(bound);
      return { kind: 'identifier', name: token.text };
    }
    if (token.text === '(') {
      const expression = this.parseExpression();
      return expression && this.consume(')') ? expression : undefined;
    }
    // A `[` where a value is expected introduces a lambda -- a subscript is
    // postfix and never reaches here. MAME installs address-space taps with
    // one, which is how every Atari 2600 bank-switch cartridge switches banks.
    if (token.text === '[') {
      this.index--;
      return this.parseLambda();
    }
    this.index--;
    return undefined;
  }

  /**
   * `[capture] (params) [mutable] [-> type] { body }`.
   *
   * A plain capture is skipped: what a MAME lambda captures by name is `this`
   * or an enclosing local, and the body already runs in that scope. An
   * *init-capture* is not -- `[this, base = &romregion->as_u8()]` introduces a
   * name that exists nowhere else, and dropping it left every Game Boy
   * cartridge installing its ROM from a pointer that resolved to nothing.
   *
   * A parameter the source left unnamed -- `[this] (offs_t address, u8 &, u8)`
   * names only the first -- keeps its position with an empty name so the
   * arguments still line up.
   */
  private parseLambda(): GeneratedExpression | undefined {
    if (!this.consume('[')) return undefined;
    const captures: { name: string; value: GeneratedExpression }[] = [];
    while (!this.at('eof') && !this.atText(']')) {
      const name = this.peek();
      if (
        name.kind === 'identifier' &&
        this.tokens[this.index + 1]?.text === '=' &&
        this.tokens[this.index + 2]?.text !== '='
      ) {
        this.take();
        this.take();
        const value = this.parseExpression();
        if (!value) return undefined;
        captures.push({ name: name.text, value });
      } else {
        this.take();
      }
      if (!this.consume(',')) break;
    }
    if (!this.consume(']')) return undefined;
    if (!this.consume('(')) return undefined;
    const parameters: string[] = [];
    if (!this.consume(')')) {
      while (!this.at('eof')) {
        const words: string[] = [];
        let nesting = 0;
        while (!this.at('eof')) {
          const text = this.peek().text;
          if (nesting === 0 && (text === ',' || text === ')')) break;
          if (text === '(' || text === '<') nesting++;
          else if (text === ')' || text === '>') nesting--;
          words.push(this.take().text);
        }
        // The declarator is the last identifier, unless the declaration ends
        // on a type word or on `*`/`&` -- then the parameter has no name.
        const last = words.at(-1) ?? '';
        parameters.push(
          /^\w+$/.test(last) && !TYPE_WORDS.has(last) && words.length > 1 ? last : '',
        );
        if (this.consume(')')) break;
        if (!this.consume(',')) return undefined;
      }
    }
    while (this.atText('mutable') || this.atText('constexpr')) this.take();
    if (this.consume('->')) {
      while (!this.at('eof') && !this.atText('{')) this.take();
    }
    if (!this.consume('{')) return undefined;
    return {
      kind: 'lambda',
      parameters,
      ...(captures.length ? { captures } : {}),
      body: this.parseOperations('}'),
    };
  }

  /**
   * Record a diagnostic and resynchronize on the next statement boundary.
   *
   * This must always consume at least one token. A statement that fails on the
   * enclosing block's own `}` used to put that brace back and return, leaving
   * the parser exactly where it started: `parseOperations` asked for the same
   * statement again, forever, until the diagnostics array outgrew its maximum
   * length. Progress is the invariant, so the brace goes back only when
   * something else was consumed ahead of it.
   */
  private unsupportedStatement(message: string): void {
    this.diagnostics.push(message);
    const start = this.index;
    let parens = 0;
    let braces = 0;
    while (!this.at('eof')) {
      const token = this.take().text;
      if (token === '(') parens++;
      else if (token === ')') parens = Math.max(0, parens - 1);
      else if (token === '{') braces++;
      else if (token === '}') {
        if (braces === 0) {
          if (this.index - 1 > start) this.index--;
          return;
        }
        braces--;
      } else if (token === ';' && parens === 0 && braces === 0) {
        return;
      }
    }
  }

  private peek(): Token {
    return this.tokens[this.index]!;
  }

  private take(): Token {
    return this.tokens[this.index++]!;
  }

  private at(kind: Token['kind']): boolean {
    return this.peek().kind === kind;
  }

  private atText(text: string): boolean {
    return this.peek().text === text;
  }

  private consume(text: string): boolean {
    if (!this.atText(text)) return false;
    this.index++;
    return true;
  }
}

function tokenize(source: string): Token[] {
  const masked = maskComments(source);
  const tokens: Token[] = [];
  const operators = [
    '>>=', '<<=', '->', '::', '==', '!=', '<=', '>=', '&&', '||', '<<', '>>',
    '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '++', '--',
  ];
  let index = 0;
  while (index < masked.length) {
    const char = masked[index]!;
    if (/\s/.test(char)) {
      index++;
      continue;
    }
    if (char === '"' || char === "'") {
      const start = index++;
      while (index < source.length) {
        if (source[index] === '\\') index += 2;
        else if (source[index++] === char) break;
      }
      tokens.push({ kind: 'string', text: source.slice(start, index), offset: start });
      continue;
    }
    // Hex/binary digits overlap the f/l suffix letters, so each literal form
    // carries its own suffix class; only decimal integers may take f/F.
    const number = /^(?:0[xX][0-9a-fA-F]+[uUlL]*|0[bB][01]+[uUlL]*|(?:\d+\.\d*|\.\d+)(?:[eE][+-]?\d+)?[fFlL]?|\d+(?:[eE][+-]?\d+)?[uUlLfF]*)/.exec(
      masked.slice(index),
    );
    if (number) {
      tokens.push({ kind: 'number', text: number[0], offset: index });
      index += number[0].length;
      continue;
    }
    const identifier = /^[A-Za-z_]\w*/.exec(masked.slice(index));
    if (identifier) {
      tokens.push({ kind: 'identifier', text: identifier[0], offset: index });
      index += identifier[0].length;
      continue;
    }
    const operator = operators.find(candidate => masked.startsWith(candidate, index));
    if (operator) {
      tokens.push({ kind: 'operator', text: operator, offset: index });
      index += operator.length;
      continue;
    }
    const kind = '(){}[],;?:.'.includes(char) ? 'punctuation' : 'operator';
    tokens.push({ kind, text: char, offset: index++ });
  }
  tokens.push({ kind: 'eof', text: '', offset: source.length });
  return tokens;
}

function parseNumber(text: string): number {
  // Strip the base prefix before the suffix so a trailing hex digit like the
  // f in 0x0f is never mistaken for a float/long suffix.
  if (/^0[xX]/.test(text)) return Number.parseInt(text.slice(2).replace(/[uUlL]+$/, ''), 16);
  if (/^0[bB]/.test(text)) return Number.parseInt(text.slice(2).replace(/[uUlL]+$/, ''), 2);
  const normalized = text.replace(/[uUlLfF]+$/, '');
  // C octal literal: leading zero followed by octal digits only.
  if (/^0[0-7]+$/.test(normalized)) return Number.parseInt(normalized, 8);
  return Number(normalized);
}

/**
 * The exact value of an integer literal a double cannot hold, or undefined.
 *
 * C gives such a literal a 64-bit type and promotes the whole expression with
 * it. MAME's Game Boy PPU builds its pixel shift register that way -- three
 * chained multiplies by 64-bit magic constants -- so the digits have to survive
 * lowering for the executor to compute it at all.
 */
function wideNumberLiteral(text: string): string | undefined {
  if (isFloatingNumberLiteral(text)) return undefined;
  const digits = text.replace(/[uUlL]+$/, '');
  let exact: bigint;
  try {
    exact = /^0[0-7]+$/.test(digits) ? BigInt(Number.parseInt(digits, 8)) : BigInt(digits);
  } catch {
    return undefined;
  }
  return exact > BigInt(Number.MAX_SAFE_INTEGER) || exact < BigInt(Number.MIN_SAFE_INTEGER)
    ? exact.toString()
    : undefined;
}

function isFloatingNumberLiteral(text: string): boolean {
  if (/^0[xX]|^0[bB]/.test(text)) return false;
  return text.includes('.') || /[eEfF]/.test(text);
}

function unquote(text: string): string {
  if (text.startsWith('"')) {
    try {
      return JSON.parse(text);
    } catch {
      return text.slice(1, -1);
    }
  }
  return text.slice(1, -1);
}

function expressionName(expression: GeneratedExpression): string {
  if (expression.kind === 'identifier') return expression.name;
  if (expression.kind === 'member') return `${expressionName(expression.object)}.${expression.property}`;
  return '<expression>';
}
