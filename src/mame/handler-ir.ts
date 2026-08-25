import { maskComments } from './ast.ts';
import type { GeneratedExpression, GeneratedHandlerOperation, GeneratedHandlerProgram } from '../ir/board.ts';
import { walkExpressions, walkOperations } from '../ir/walk.ts';

interface Token {
  kind: 'identifier' | 'number' | 'string' | 'operator' | 'punctuation' | 'eof';
  text: string;
  offset: number;
}

const TYPE_WORDS = new Set([
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
    // cast in handler IR. This common form appears in byte-backed sprite RAM.
    .replace(
      /\breinterpret_cast\s*<([^>]+)>\s*\(([^;]+)\)/g,
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
    const iterate = this.parseMutationList(')');
    if (!iterate?.length) {
      this.unsupportedStatement('invalid for iteration');
      return undefined;
    }
    const body = this.parseStatementAsBlock();
    return { op: 'for', initialize, condition, iterate, body };
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
    let cursor = this.index + 1;
    while (this.tokens[cursor]?.text === '*' || this.tokens[cursor]?.text === '&') cursor++;
    return this.tokens[cursor]?.kind === 'identifier' &&
      ['=', '(', '[', ',', ';'].includes(this.tokens[cursor + 1]?.text ?? '');
  }

  private parseDeclaration(): GeneratedHandlerOperation[] {
    const typeWords: string[] = [];
    if (this.peek().kind === 'identifier' && !TYPE_WORDS.has(this.peek().text)) {
      typeWords.push(this.take().text);
    }
    while (this.peek().kind === 'identifier' && TYPE_WORDS.has(this.peek().text)) {
      typeWords.push(this.take().text);
    }
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
        value = {
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
    if (this.atText('(') && this.isCast()) {
      this.take();
      const valueType: string[] = [];
      while (this.peek().kind === 'identifier' && TYPE_WORDS.has(this.peek().text)) {
        valueType.push(this.take().text);
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
    if (['!', '~', '-', '+', '&', '*'].includes(this.peek().text)) {
      const operator = this.take().text;
      const operand = this.parseUnary();
      return operand ? { kind: 'unary', operator, operand } : undefined;
    }
    return this.parsePostfix();
  }

  private isCast(): boolean {
    let cursor = this.index + 1;
    if (this.tokens[cursor]?.kind !== 'identifier' || !TYPE_WORDS.has(this.tokens[cursor]!.text)) {
      return false;
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
      if (expression.kind === 'identifier' && this.atText('<')) {
        const templateArgs = this.consumeTemplateArguments();
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
   * unambiguously one: only type-shaped tokens inside, and a call or a closing
   * parenthesis after. Anything else stays a less-than comparison.
   */
  private consumeTemplateArguments(): string[] | undefined {
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
    if (!['(', ')'].includes(this.tokens[cursor]?.text ?? '')) return undefined;
    args.push(current);
    this.index = cursor;
    return args;
  }

  private parseDelimitedExpressions(terminator: string): GeneratedExpression[] | undefined {
    const values: GeneratedExpression[] = [];
    if (this.consume(terminator)) return values;
    while (!this.at('eof')) {
      const value = this.parseExpression();
      if (!value) return undefined;
      values.push(value);
      if (this.consume(terminator)) return values;
      if (!this.consume(',')) return undefined;
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
      return {
        kind: 'number',
        value: parseNumber(token.text),
        ...(isFloatingNumberLiteral(token.text) ? { floating: true } : {}),
      };
    }
    if (token.kind === 'string') return { kind: 'string', value: unquote(token.text) };
    if (token.kind === 'identifier') {
      if (token.text === 'true') return { kind: 'number', value: 1 };
      if (token.text === 'false' || token.text === 'nullptr') return { kind: 'number', value: 0 };
      return { kind: 'identifier', name: token.text };
    }
    if (token.text === '(') {
      const expression = this.parseExpression();
      return expression && this.consume(')') ? expression : undefined;
    }
    this.index--;
    return undefined;
  }

  private unsupportedStatement(message: string): void {
    this.diagnostics.push(message);
    let parens = 0;
    let braces = 0;
    while (!this.at('eof')) {
      const token = this.take().text;
      if (token === '(') parens++;
      else if (token === ')') parens = Math.max(0, parens - 1);
      else if (token === '{') braces++;
      else if (token === '}') {
        if (braces === 0) {
          this.index--;
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
