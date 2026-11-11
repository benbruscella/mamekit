import { maskComments } from './ast.ts';
import type { GeneratedExpression, GeneratedHandlerOperation, GeneratedHandlerProgram } from '../ir/board.ts';
import { nestedOperations, walkExpressions, walkOperations } from '../ir/walk.ts';

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
/** Words that qualify a declaration's type without naming it. */
const QUALIFIER_WORDS = new Set(['const', 'constexpr', 'static', 'volatile', 'inline']);

export const TYPE_WORDS = new Set([
  'auto', 'bool', 'char', 'const', 'constexpr', 'double', 'float', 'int', 'offs_t', 'pen_t', 'static',
  'rectangle', 'rgb_t', 'tilemap_memory_index',
  's8', 's16', 's32', 's64', 'u8', 'u16', 'u32', 'u64',
  'int8_t', 'int16_t', 'int32_t', 'int64_t',
  'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t', 'unsigned',
  // Plain C widths: the Spectrum's .z80 loader declares `unsigned short`.
  'short', 'long',
]);

/** Type aliases MAME's framework headers declare, by the type each names. */
const FRAMEWORK_TYPE_ALIASES: Record<string, string> = {
  // emu/sound.h: `class sound_stream { using sample_t = float; }`
  'sound_stream::sample_t': 'float',
};

/** String macros MAME's framework headers define, by what each expands to. */
const FRAMEWORK_STRING_MACROS: Record<string, string> = {
  // osd/osdfile.h, on the POSIX side the sample paths are filed under.
  PATH_SEPARATOR: '/',
};

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
export function compileMameHandler(
  body: string,
  options: { returnType?: string } = {},
): GeneratedHandlerProgram {
  // `return { l, r, t, b };` list-initialises the declared return type, which
  // for a class with a constructor of those arguments is that construction:
  // the Spectrum's `rectangle get_screen_area()`.
  const returnType = options.returnType && /^[A-Za-z_]\w*$/.test(options.returnType)
    ? options.returnType
    : undefined;
  const listReturns = returnType
    ? body.replace(/\breturn\s*\{([^{};]*)\}\s*;/g, (_all, values: string) => `return ${returnType}(${values});`)
    : body;
  // C++ pointer-to-member invocation has no distinct runtime value in the IR.
  // Preserve it as a normal call through the member slot; the surrounding
  // source null check still controls whether the call is reached.
  const executable = lowerNamedCasts(listReturns)
    .replace(
      /\(\s*this\s*->\s*\*\s*(m_\w+)\s*\)\s*\(/g,
      '$1(',
    )
    // A delegate that names a *template* member has to name the specialization
    // the compiler actually generated. `specializeFunctionTemplate` emits
    // `deferred_snd_cmd_w<2>` as `deferred_snd_cmd_w_2`, and dropping the
    // argument here left `FUNC(williams_state::deferred_snd_cmd_w<2>)`
    // resolving to a method nobody declared -- so Sinistar's sound command was
    // handed to the scheduler and silently went nowhere, and its sound board
    // never answered the handshake the main CPU spins on.
    .replace(
      /\bFUNC\s*\(\s*([\w:]+)\s*<([^<>()]*)>\s*\)/g,
      (_all, name: string, args: string) => `FUNC(${name}_${args
        .split(',')
        .map(argument => argument.trim().replace(/^true$/, '1').replace(/^false$/, '0'))
        .join('_')})`,
    )
    // osdcomm.h's branch hints, `#define EXPECTED(exp) (exp)` where the
    // compiler has no __builtin_expect: the condition itself. Unanswered, the
    // discrete tasks took their profiling branch on every sample.
    .replace(/\b(?:UN)?EXPECTED(?=\s*\()/g, '')
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

/**
 * C++'s named casts, read as the IR reads a cast. Named casts carry the same
 * numeric/view semantics as an ordinary cast: reinterpret_cast appears in
 * byte-backed sprite RAM, and every slot device recovers its card with
 * `dynamic_cast<interface *>(get_card_device())`. Left unrecognised the whole
 * cast lowered as a call to an unknown function, whose placeholder return then
 * OVERWROTE the card the slot had just resolved -- so every Atari 2600
 * joystick read came back as an empty port.
 *
 * A dynamic_cast to a class pointer is `DYNAMIC_CAST(value, "T")`, which
 * answers the value when it is a T and null when it is not: DISCRETE picks its
 * stream inputs out of every node with
 * `dynamic_cast<discrete_dss_input_stream_node *>(node.get())`, and read as a
 * plain cast every node was one. The type may nest angle brackets once an
 * alias is resolved (`const std::vector<std::unique_ptr<discrete_task>> *`).
 */
function lowerNamedCasts(source: string): string {
  let out = source;
  const cast = /\b(reinterpret|dynamic|static|const)_cast\s*</g;
  for (let found; (found = cast.exec(out));) {
    let close = found.index + found[0].length;
    for (let depth = 1; close < out.length && depth; close++) {
      if (out[close] === '<') depth++;
      else if (out[close] === '>') depth--;
    }
    const type = out.slice(found.index + found[0].length, close - 1).trim();
    let open = close;
    while (/\s/.test(out[open] ?? '')) open++;
    if (out[open] !== '(') continue;
    let end = open;
    for (let depth = 0; end < out.length; end++) {
      if (out[end] === '(') depth++;
      else if (out[end] === ')' && --depth === 0) break;
    }
    if (end >= out.length) continue;
    const operand = out.slice(open + 1, end);
    const pointee = /^(?:const\s+)?([\w:]+)\s*\*$/.exec(type);
    // A pointer to a class is the object itself, as `(tia *)_chip` is; a
    // template or qualified class type has no C-cast spelling the parser reads.
    const classPointer = /[<:]/.test(type) && /[*&]\s*$/.test(type);
    const replacement = found[1] === 'dynamic' && pointee
      ? `DYNAMIC_CAST(${operand}, ${JSON.stringify(pointee[1]!.split('::').at(-1))})`
      : classPointer ? `(${operand})` : `(${type})(${operand})`;
    out = `${out.slice(0, found.index)}${replacement}${out.slice(end + 1)}`;
    cast.lastIndex = found.index;
  }
  return out;
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

  /**
   * `goto` and its labels, as placeholders until the list holding the label is
   * complete. Only a forward jump out to a label at an enclosing level has a
   * structured form (see `lowerForwardGotos`); anything else stays a diagnostic.
   */
  private readonly gotos = new Map<GeneratedHandlerOperation, string>();
  private readonly labels = new Map<GeneratedHandlerOperation, string>();

  parse(): GeneratedHandlerProgram {
    let operations = this.parseOperations();
    // A jump no enclosing switch or later label could take: into a loop from
    // before it, or backward. z80make.py's execute_run runs its slow path,
    // then `goto process;` into the middle of the fast `while (true)` loop,
    // whose instructions `goto process;` again. The body is one case of a
    // switch entered at the top, and lowerSwitchGotos flattens it like any.
    if (this.gotos.size && [...this.gotos.values()].some(label =>
      [...this.labels.values()].includes(label))) {
      const lowered = this.lowerSwitchGotos({ kind: 'number', value: 0 },
        [{ values: [{ kind: 'number', value: 0 }], body: operations }]);
      operations = Array.isArray(lowered) ? lowered : [lowered];
    }
    operations = this.stripLabelMarks(operations);
    // `stream.str()`: the string a string stream holds is the local itself.
    if (this.streamLocals.size) {
      walkExpressions(operations, expression => {
        if (expression.kind === 'call' && !expression.args.length && expression.callee.kind === 'member' &&
            expression.callee.property === 'str' && expression.callee.object.kind === 'identifier' &&
            this.streamLocals.has(expression.callee.object.name)) {
          const name = expression.callee.object.name;
          for (const key of Object.keys(expression)) delete (expression as unknown as Record<string, unknown>)[key];
          Object.assign(expression, { kind: 'identifier', name });
        }
      });
    }
    for (const [, label] of this.gotos) {
      this.diagnostics.push(`unsupported goto ${label}`);
    }
    return { operations, diagnostics: this.diagnostics };
  }

  /**
   * A label's mark stays in its list until a `goto` to it is lowered: an
   * enclosing switch may still need it (lowerSwitchGotos). What is left once
   * the whole body is read marks nothing anyone jumps to.
   */
  private stripLabelMarks(list: GeneratedHandlerOperation[]): GeneratedHandlerOperation[] {
    return list.filter(operation => !this.labels.has(operation)).map(operation => {
      switch (operation.op) {
        case 'if':
          return { ...operation, then: this.stripLabelMarks(operation.then),
            ...(operation.else ? { else: this.stripLabelMarks(operation.else) } : {}) };
        case 'for':
          return { ...operation, initialize: this.stripLabelMarks(operation.initialize),
            iterate: this.stripLabelMarks(operation.iterate), body: this.stripLabelMarks(operation.body) };
        case 'while': case 'do-while':
          return { ...operation, body: this.stripLabelMarks(operation.body) };
        case 'switch':
          return { ...operation, cases: operation.cases.map(entry => ({ ...entry, body: this.stripLabelMarks(entry.body) })) };
        default:
          return operation;
      }
    });
  }

  /** A real `break`/`continue`, not a goto's or a label's placeholder. */
  private isExit(operation: GeneratedHandlerOperation, op: 'break' | 'continue'): boolean {
    return operation.op === op && !this.gotos.has(operation) && !this.labels.has(operation);
  }

  private parseOperations(stop = ''): GeneratedHandlerOperation[] {
    const operations: GeneratedHandlerOperation[] = [];
    while (!this.at('eof') && (!stop || !this.atText(stop))) {
      const operation = this.parseStatement();
      if (Array.isArray(operation)) operations.push(...operation);
      else if (operation) operations.push(operation);
    }
    if (stop) this.consume(stop);
    return this.lowerForwardGotos(operations);
  }

  /**
   * A forward `goto` to a label later in the same list, from anywhere inside
   * the statements before it: VLM5030's sample loop leaves through
   * `goto phase_stop;` to the end-of-phase switch below it. The jump is the
   * same as running the preceding statements once in a loop and breaking out:
   *
   *   bool __goto_L = 0;
   *   while (1) { ...statements, goto -> { __goto_L = 1; break; }...; break; }
   *   L: ...
   *
   * with `if (__goto_L) break;` after every loop or switch the goto sits in, so
   * the break reaches the wrapper. The statements must not break or continue
   * at their own level, which would change meaning once wrapped.
   */
  private lowerForwardGotos(operations: GeneratedHandlerOperation[]): GeneratedHandlerOperation[] {
    const at = operations.findIndex(operation => this.labels.has(operation));
    if (at < 0) return operations;
    const label = this.labels.get(operations[at]!)!;
    const before = operations.slice(0, at);
    const after = this.lowerForwardGotos(operations.slice(at + 1));
    const flag = `__goto_${label}`;
    const jumps = (list: GeneratedHandlerOperation[]): boolean => {
      let found = false;
      walkOperations(list, operation => {
        if (this.gotos.get(operation) === label) found = true;
      });
      return found;
    };
    // Nothing before it jumps here: the mark stays for an enclosing switch
    // whose cases jump into this list (lowerSwitchGotos).
    if (!jumps(before)) return [...before, operations[at]!, ...after];
    const exitsOwnLevel = (list: GeneratedHandlerOperation[]): boolean => list.some(operation =>
      this.isExit(operation, 'break') || this.isExit(operation, 'continue') ||
      (operation.op === 'if' && nestedOperations(operation).some(exitsOwnLevel)));
    // A local declared before the jump stays in scope after the label, so a
    // scalar the code after the label reads is declared ahead of the wrapper
    // and only assigned inside it. An array or allocation is not hoisted.
    const usedAfter = new Set<string>();
    walkExpressions(after, expression => {
      if (expression.kind === 'identifier') usedAfter.add(expression.name);
    });
    const hoisted: GeneratedHandlerOperation[] = [];
    let unhoistable = false;
    const body = before.map(operation => {
      if (operation.op !== 'declare' || !usedAfter.has(operation.name)) return operation;
      if (operation.value?.kind === 'call' && operation.value.callee.kind === 'identifier' &&
          ['ARRAY', 'ALLOC'].includes(operation.value.callee.name)) {
        unhoistable = true;
        return operation;
      }
      hoisted.push({
        op: 'declare',
        name: operation.name,
        ...(operation.valueType ? { valueType: operation.valueType } : {}),
      });
      return operation.value
        ? { op: 'assign', target: { kind: 'identifier', name: operation.name }, operator: '=', value: operation.value } as GeneratedHandlerOperation
        : undefined;
    }).filter((operation): operation is GeneratedHandlerOperation => operation !== undefined);
    // Unlowered, the goto placeholder survives and parse() reports it.
    if (exitsOwnLevel(before) || unhoistable) return [...before, operations[at]!, ...after];
    const raise: GeneratedHandlerOperation[] = [
      { op: 'assign', target: { kind: 'identifier', name: flag }, operator: '=', value: { kind: 'number', value: 1 } },
      { op: 'break' },
    ];
    const rewrite = (list: GeneratedHandlerOperation[]): GeneratedHandlerOperation[] =>
      list.flatMap(operation => {
        if (this.gotos.get(operation) === label) {
          this.gotos.delete(operation);
          return raise.map(step => ({ ...step }));
        }
        if (!jumps([operation])) return [operation];
        const lowered = { ...operation } as GeneratedHandlerOperation & Record<string, unknown>;
        switch (lowered.op) {
          case 'if':
            lowered.then = rewrite(lowered.then);
            if (lowered.else) lowered.else = rewrite(lowered.else);
            return [lowered];
          case 'for': case 'while': case 'do-while':
            lowered.body = rewrite(lowered.body);
            break;
          case 'switch':
            lowered.cases = lowered.cases.map(entry => ({ ...entry, body: rewrite(entry.body) }));
            break;
          default:
            return [lowered];
        }
        return [lowered, {
          op: 'if',
          condition: { kind: 'identifier', name: flag },
          then: [{ op: 'break' }],
        }];
      });
    return [
      ...hoisted,
      { op: 'declare', name: flag, valueType: 'int', value: { kind: 'number', value: 0 } },
      { op: 'while', condition: { kind: 'number', value: 1 }, body: [...rewrite(body), { op: 'break' }] },
      ...after,
    ];
  }

  private parseStatement(): GeneratedHandlerOperation | GeneratedHandlerOperation[] | undefined {
    if (this.consume(';')) return undefined;
    if (this.atText('goto') && this.tokens[this.index + 1]?.kind === 'identifier' &&
        this.tokens[this.index + 2]?.text === ';') {
      this.take();
      const label = this.take().text;
      this.take();
      // Stands in until its label is seen; lowerForwardGotos replaces it.
      const jump: GeneratedHandlerOperation = { op: 'break' };
      this.gotos.set(jump, label);
      return jump;
    }
    if (this.peek().kind === 'identifier' && !['case', 'default', 'public', 'private', 'protected'].includes(this.peek().text) &&
        this.tokens[this.index + 1]?.text === ':') {
      const label = this.take().text;
      this.take();
      const mark: GeneratedHandlerOperation = { op: 'continue' };
      this.labels.set(mark, label);
      return mark;
    }
    // MAME's release build defines NDEBUG (scripts/genie.lua), so <cassert>'s
    // assert is `((void)0)`: its argument is never evaluated, and may be
    // anything -- z80make.py ends a switch with
    // `assert((void("switch statement above must cover all possible cases!"), false));`.
    if (this.atText('assert') && this.tokens[this.index + 1]?.text === '(') {
      this.take();
      let depth = 0;
      do {
        const token = this.take();
        if (token.text === '(') depth++;
        else if (token.text === ')') depth--;
      } while (depth > 0 && !this.at('eof'));
      this.consume(';');
      return undefined;
    }
    // A case label inside a nested statement of a switch: a mark the switch
    // jumps to (parseSwitch).
    const enclosing = this.switchCases.at(-1);
    if (enclosing && (this.atText('case') || (this.atText('default') && this.tokens[this.index + 1]?.text === ':'))) {
      const label = `__case_${this.nestedCaseSerial++}`;
      if (this.consume('default')) {
        enclosing.push({ label });
      } else {
        this.take();
        const value = this.parseExpression();
        if (!value) {
          this.unsupportedStatement('invalid switch case');
          return undefined;
        }
        enclosing.push({ values: [value], label });
      }
      if (!this.consume(':')) {
        this.unsupportedStatement('switch case without colon');
        return undefined;
      }
      const mark: GeneratedHandlerOperation = { op: 'continue' };
      this.labels.set(mark, label);
      return mark;
    }
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
    // `throw std::invalid_argument(...)`: MAME's format loaders reject a
    // malformed image this way. Lowered to the `__throw` intrinsic, which
    // raises in the host, so the load that asked fails rather than carrying
    // on past the point the source gave up.
    if (this.atText('throw')) {
      this.take();
      if (this.consume(';')) return { op: 'call', expression: { kind: 'call', callee: { kind: 'identifier', name: '__throw' }, args: [] } };
      const value = this.parseExpression();
      if (!value || !this.consume(';')) {
        this.unsupportedStatement('invalid throw statement');
        return undefined;
      }
      // device_missing_dependencies is not a failure: it asks MAME's device
      // manager to start this device again once the ones it needs have
      // started (k052109's palette, segaic16's video). The host starts
      // devices in dependency order already, so the request is a no-op.
      if (value.kind === 'call' && value.callee.kind === 'identifier' && value.callee.name === 'device_missing_dependencies') {
        return undefined;
      }
      return { op: 'call', expression: { kind: 'call', callee: { kind: 'identifier', name: '__throw' }, args: [value] } };
    }
    if (this.atText('do')) return this.parseDoWhile();
    if (this.isDeclaration()) return this.parseDeclaration();
    // `(void)task;` discards a value to quiet an unused-variable warning;
    // only a call in it does anything.
    if (this.atText('(') && this.tokens[this.index + 1]?.text === 'void' && this.tokens[this.index + 2]?.text === ')') {
      this.index += 3;
      const discarded = this.parseExpression();
      if (!discarded || !this.consume(';')) {
        this.unsupportedStatement('invalid discarded expression');
        return undefined;
      }
      return discarded.kind === 'call' ? { op: 'call', expression: discarded } : undefined;
    }

    const start = this.peek();
    const expression = this.parseExpression();
    if (!expression) {
      this.unsupportedStatement(`could not parse statement at byte ${start.offset}`);
      return undefined;
    }
    if (expression.kind === 'assignment') {
      const appendsString = expression.operator === '+=' && expression.target.kind === 'identifier' &&
        this.stringLocals.has(expression.target.name);
      const assignments: GeneratedHandlerOperation[] = tieAssignments(expression, start.offset) ?? [appendsString
        ? this.stringAppend(expression.target, expression.value)
        : {
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
      if (operator === '+=' && expression.kind === 'identifier' && this.stringLocals.has(expression.name)) {
        return this.stringAppend(expression, value);
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
    // `result << a << b;` on a string stream appends each operand in turn.
    const appended = this.streamAppend(expression);
    if (appended) return appended;
    const operation = this.expressionStatement(expression);
    // `m_rom_view[i + 1];` names a view entry and nothing more. MAME creates
    // the empty entry on first use; a view here is built from its installs,
    // and an entry with none already decodes nothing, so the statement does
    // nothing to lower.
    if (!operation && pureLvalue(expression)) return [];
    if (!operation) {
      this.diagnostics.push(`discarded non-call expression at byte ${start.offset}`);
      return undefined;
    }
    return operation;
  }

  /** Locals declared as string streams, and as strings (streams included). */
  private readonly streamLocals = new Set<string>();
  private readonly stringLocals = new Set<string>();

  /** `s += v` on a string local: STRING_APPEND, which every executor defines. */
  private stringAppend(target: GeneratedExpression, value: GeneratedExpression): GeneratedHandlerOperation {
    return {
      op: 'assign',
      target,
      operator: '=',
      value: { kind: 'call', callee: { kind: 'identifier', name: 'STRING_APPEND' }, args: [target, value] },
    };
  }

  private streamAppend(expression: GeneratedExpression): GeneratedHandlerOperation[] | undefined {
    const operands: GeneratedExpression[] = [];
    let left: GeneratedExpression = expression;
    while (left.kind === 'binary' && left.operator === '<<') {
      operands.unshift(left.right);
      left = left.left;
    }
    if (left.kind !== 'identifier' || !this.streamLocals.has(left.name) || !operands.length) return undefined;
    const stream = left;
    return operands.map(value => this.stringAppend(stream, value));
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
    // C++17's if with an initializer, `if (u8 enable = m_regs[AY_ENABLE] &
    // 0x40; enable != ...)`: the declaration is scoped to the statement, so
    // it lowers as a block holding the declaration and the plain if. The
    // AY-3-8910 writes its two port enables this way, side by side, each
    // declaring its own `enable`.
    const initialize = this.atIfInitializer() ? this.parseDeclaration() : undefined;
    if (initialize && this.tokens[this.index - 1]?.text !== ';' && !this.consume(';')) {
      this.unsupportedStatement('invalid if initializer');
      return undefined;
    }
    const condition = this.parseExpression();
    if (!condition || !this.consume(')')) {
      this.unsupportedStatement('invalid if condition');
      return undefined;
    }
    // `if (0)`, which a disabled debug switch leaves after the preprocessor
    // (discrete.cpp's `if (DISCRETE_DEBUGLOG)` writes to a log stream), never
    // runs: what its body could not lower is no gap.
    const before = this.diagnostics.length;
    const then = this.parseStatementAsBlock();
    if (condition.kind === 'number' && condition.value === 0) this.diagnostics.length = before;
    let otherwise: GeneratedHandlerOperation[] | undefined;
    if (this.consume('else')) otherwise = this.parseStatementAsBlock();
    const statement: GeneratedHandlerOperation = {
      op: 'if',
      condition,
      then,
      ...(otherwise ? { else: otherwise } : {}),
    };
    return initialize
      ? { op: 'if', condition: { kind: 'number', value: 1 }, then: [...initialize, statement] }
      : statement;
  }

  /**
   * An if's control clause holds an initializer only when a `;` stands in it
   * at the top level; a condition can open with a type word too, as a
   * functional cast (`if (u8(...) == ...)`).
   */
  private atIfInitializer(): boolean {
    let depth = 0;
    for (let cursor = this.index; cursor < this.tokens.length; cursor++) {
      const text = this.tokens[cursor]!.text;
      if (text === '(' || text === '[' || text === '{') depth++;
      else if (text === ')' || text === ']' || text === '}') {
        if (depth === 0) return false;
        depth--;
      } else if (text === ';' && depth === 0) return this.isDeclaration();
    }
    return false;
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

  private parseSwitch(): GeneratedHandlerOperation | GeneratedHandlerOperation[] | undefined {
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
    const cases: (Extract<GeneratedHandlerOperation, { op: 'switch' }>['cases'][number] & { label?: string })[] = [];
    const nestedCases: { values?: GeneratedExpression[]; label: string }[] = [];
    this.switchCases.push(nestedCases);
    try {
      this.parseSwitchCases(cases);
    } finally {
      this.switchCases.pop();
    }
    if (!this.consume('}')) {
      this.unsupportedStatement('unterminated switch');
      return undefined;
    }
    // A case inside a nested statement of this switch (Duff's device, which
    // m6502make.py writes for every page-crossing access) is entered by a
    // jump: a case of the switch's own, first so nothing falls into it.
    cases.unshift(...nestedCases.map(entry => {
      const jump: GeneratedHandlerOperation = { op: 'break' };
      this.gotos.set(jump, entry.label);
      return { ...(entry.values ? { values: entry.values } : {}), body: [jump] };
    }));
    return this.lowerSwitchGotos(expression, cases);
  }

  /** For each switch being read, the cases met inside its nested statements. */
  private readonly switchCases: { values?: GeneratedExpression[]; label: string }[][] = [];
  private nestedCaseSerial = 0;

  private parseSwitchCases(
    cases: (Extract<GeneratedHandlerOperation, { op: 'switch' }>['cases'][number] & { label?: string })[],
  ): void {
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
            return;
          }
          values.push(value);
        }
        if (!this.consume(':')) {
          this.unsupportedStatement('switch case without colon');
          return;
        }
      }
      if (!values.length && !isDefault) {
        this.unsupportedStatement('switch body before first case');
        return;
      }
      let body: GeneratedHandlerOperation[] = [];
      cases.push({ ...(isDefault ? {} : { values }), body });
      while (
        !this.at('eof') &&
        !this.atText('}') &&
        !this.atText('case') &&
        !this.atText('default')
      ) {
        const statement = this.parseStatement();
        // A label at the switch body's own level is another way in: it ends
        // this case and opens one the preceding statements fall into.
        const label = !Array.isArray(statement) && statement ? this.labels.get(statement) : undefined;
        if (label !== undefined) {
          this.labels.delete(statement as GeneratedHandlerOperation);
          body = [];
          cases.push({ values: [], label, body });
          continue;
        }
        if (Array.isArray(statement)) body.push(...statement);
        else if (statement) body.push(statement);
      }
    }
  }

  /**
   * `goto` within one switch, to a label anywhere in its cases: MAME's
   * mathbox enters a shared tail of another command's code from two cases
   * (`goto step_048;`), and the code m6809make.py writes is nothing else --
   * `switch(pop_state()) { case 55: goto state_55; ... }` with `state_55:`
   * inside an `if` of an instruction, or inside SYNC's wait loop, where the
   * instruction stopped when its cycles ran out. Every jump is the switch
   * dispatched again:
   *
   *   int __switch = expression;
   *   while (1) { switch (__switch) { ...goto L -> { __switch = <L>; continue; }... } break; }
   *
   * A label at the switch's own level is a case of its own. A label inside an
   * `if`, `while`, `do`, or `for` -- or a loop that jumps -- is flattened into
   * the switch: the statement becomes cases in its own order, its condition a
   * jump around them, its `break`/`continue` jumps to the cases after it and
   * at its top. Locals declared in a flattened case are declared before the
   * wrapper, since a later case reads what an earlier one set.
   *
   * A `continue` at a case's own level belongs to a loop around the switch,
   * and would reach the wrapper instead, so it leaves the jumps unlowered (and
   * reported); so does a label inside a nested switch.
   */
  private lowerSwitchGotos(
    expression: GeneratedExpression,
    parsed: (Extract<GeneratedHandlerOperation, { op: 'switch' }>['cases'][number] & { label?: string })[],
  ): GeneratedHandlerOperation | GeneratedHandlerOperation[] {
    type Operation = GeneratedHandlerOperation;
    type Case = Extract<Operation, { op: 'switch' }>['cases'][number];
    // Unlowered here, a label at this switch's level goes back to being a
    // mark in the case that falls into it: a jump to it may come from an
    // enclosing switch (m6809make.py's `case 195: goto state_195;` reaches a
    // label inside an addressing mode's own switch).
    const plain = (): Operation => {
      const cases: Case[] = [];
      for (const entry of parsed) {
        const { label, ...rest } = entry;
        if (label === undefined || !cases.length) {
          cases.push(label === undefined ? rest : { ...rest, values: [this.labelValue(0)] });
          continue;
        }
        const mark: Operation = { op: 'continue' };
        this.labels.set(mark, label);
        const previous = cases[cases.length - 1]!;
        cases[cases.length - 1] = { ...previous, body: [...previous.body, mark, ...entry.body] };
      }
      return { op: 'switch', expression, cases };
    };

    // The labels this switch can be entered at: its own, and the marks inside
    // its cases that a goto in its cases names.
    const marks = new Map<Operation, string>();
    const targets = new Set<string>();
    const scan = (list: Operation[]): void => walkOperations(list, operation => {
      const mark = this.labels.get(operation);
      if (mark !== undefined) marks.set(operation, mark);
      const target = this.gotos.get(operation);
      if (target !== undefined) targets.add(target);
    });
    for (const entry of parsed) scan(entry.body);
    const regionLabels = new Set<string>([
      ...parsed.flatMap(entry => entry.label ? [entry.label] : []),
      ...[...marks.values()].filter(label => targets.has(label)),
    ]);
    if (![...regionLabels].some(label => targets.has(label))) return plain();

    const isTarget = (operation: Operation): boolean => {
      const label = this.labels.get(operation);
      return label !== undefined && regionLabels.has(label);
    };
    const isRegionGoto = (operation: Operation): boolean => {
      const target = this.gotos.get(operation);
      return target !== undefined && regionLabels.has(target);
    };
    const deep = (operation: Operation, test: (candidate: Operation) => boolean): boolean => {
      let found = false;
      walkOperations([operation], candidate => { if (test(candidate)) found = true; });
      return found;
    };
    const loop = (operation: Operation): boolean =>
      operation.op === 'for' || operation.op === 'while' || operation.op === 'do-while';
    const needsFlattening = (operation: Operation): boolean =>
      deep(operation, isTarget) || (loop(operation) && deep(operation, isRegionGoto));

    // What stays unlowered: a `continue` outside every loop of the cases,
    // which belongs to a loop around the switch and would reach the wrapper.
    let lowerable = true;
    const check = (list: Operation[], inLoop: boolean): void => {
      for (const operation of list) {
        if (this.isExit(operation, 'continue') && !inLoop) lowerable = false;
        if (operation.op === 'if') {
          check(operation.then, inLoop);
          if (operation.else) check(operation.else, inLoop);
        } else if (loop(operation)) {
          for (const nested of nestedOperations(operation)) check(nested, true);
        } else if (operation.op === 'switch') {
          for (const entry of operation.cases) check(entry.body, inLoop);
        }
      }
    };
    for (const entry of parsed) check(entry.body, false);
    if (!lowerable) return plain();

    const order: string[] = [];
    const indexOf = (label: string): number => {
      let index = order.indexOf(label);
      if (index < 0) { order.push(label); index = order.length - 1; }
      return index;
    };
    // Switch-level labels keep the numbering plainCases() gives them.
    for (const entry of parsed) if (entry.label) indexOf(entry.label);
    // Named by its labels when they are all the switch's own (as it always
    // was); a flattened switch has too many for a name, so it is numbered.
    const ownLabels = parsed.flatMap(entry => entry.label ? [entry.label] : []);
    const nestedTargets = [...marks.values()].some(label => regionLabels.has(label));
    const selector = nestedTargets || parsed.some(entry => entry.body.some(operation => needsFlattening(operation)))
      ? `__switch_${this.switchSerial++}`
      : `__switch_${ownLabels.join('_')}`;
    let synthetic = 0;
    const fresh = (what: string): string => `${selector}_${what}_${synthetic++}`;
    const jump = (label: string): Operation[] => [
      { op: 'assign', target: { kind: 'identifier', name: selector }, operator: '=', value: this.labelValue(indexOf(label)) },
      { op: 'continue' },
    ];
    const not = (condition: GeneratedExpression): GeneratedExpression => ({ kind: 'unary', operator: '!', operand: condition });
    interface Exits { breakTo: string; continueTo: string }

    // Rewrite jumps inside a statement that is kept whole: region gotos, and
    // the flattened loop's own break/continue (not those of a loop or switch
    // of the statement's own).
    const rewrite = (list: Operation[], exits: Exits | undefined, ownBreak: boolean, ownContinue: boolean): Operation[] =>
      list.flatMap(operation => {
        if (isRegionGoto(operation)) {
          const label = this.gotos.get(operation)!;
          this.gotos.delete(operation);
          return jump(label);
        }
        if (exits && ownBreak && this.isExit(operation, 'break')) return jump(exits.breakTo);
        if (exits && ownContinue && this.isExit(operation, 'continue')) return jump(exits.continueTo);
        switch (operation.op) {
          case 'if':
            return [{ ...operation, then: rewrite(operation.then, exits, ownBreak, ownContinue),
              ...(operation.else ? { else: rewrite(operation.else, exits, ownBreak, ownContinue) } : {}) }];
          case 'switch':
            return [{ ...operation, cases: operation.cases.map(entry => ({ ...entry, body: rewrite(entry.body, exits, false, ownContinue) })) }];
          case 'for':
            return [{ ...operation, body: rewrite(operation.body, exits, false, false) }];
          case 'while': case 'do-while':
            return [{ ...operation, body: rewrite(operation.body, exits, false, false) }];
          default:
            return [operation];
        }
      });

    const cases: Case[] = [];
    let current: Operation[] = [];
    const open = (label: string): void => {
      current = [];
      cases.push({ values: [this.labelValue(indexOf(label))], body: current });
    };
    const flattenList = (list: Operation[], exits: Exits | undefined): void => {
      for (const operation of list) {
        if (this.labels.has(operation)) {
          if (isTarget(operation)) open(this.labels.get(operation)!);
          continue;
        }
        if (needsFlattening(operation)) flatten(operation, exits);
        else current.push(...rewrite([operation], exits, true, true));
      }
    };
    const flatten = (operation: Operation, exits: Exits | undefined): void => {
      if (operation.op === 'if') {
        const done = fresh('endif');
        const otherwise = operation.else ? fresh('else') : done;
        current.push({ op: 'if', condition: not(operation.condition), then: jump(otherwise) });
        flattenList(operation.then, exits);
        if (operation.else) {
          current.push(...jump(done));
          open(otherwise);
          flattenList(operation.else, exits);
        }
        open(done);
      } else if (operation.op === 'while') {
        const top = fresh('while');
        const done = fresh('wend');
        open(top);
        current.push({ op: 'if', condition: not(operation.condition), then: jump(done) });
        flattenList(operation.body, { breakTo: done, continueTo: top });
        current.push(...jump(top));
        open(done);
      } else if (operation.op === 'do-while') {
        const top = fresh('do');
        const test = fresh('dotest');
        const done = fresh('dend');
        open(top);
        flattenList(operation.body, { breakTo: done, continueTo: test });
        open(test);
        current.push({ op: 'if', condition: operation.condition, then: jump(top) });
        open(done);
      } else if (operation.op === 'switch') {
        // Evaluated once, then a jump to the case it selects; the cases keep
        // their order, so one still falls into the next, and `break` leaves.
        const value = fresh('selected');
        const done = fresh('send');
        current.push({ op: 'declare', name: value, valueType: 'int', value: operation.expression });
        const entries = operation.cases.map(entry => ({ entry, label: fresh(entry.values ? 'case' : 'default') }));
        for (const { entry, label } of entries) {
          if (!entry.values) continue;
          const condition = entry.values
            .map((candidate): GeneratedExpression => ({ kind: 'binary', operator: '==', left: { kind: 'identifier', name: value }, right: candidate }))
            .reduce((left, right) => ({ kind: 'binary', operator: '||', left, right }));
          current.push({ op: 'if', condition, then: jump(label) });
        }
        const fallback = entries.find(({ entry }) => !entry.values);
        current.push(...jump(fallback ? fallback.label : done));
        for (const { entry, label } of entries) {
          open(label);
          flattenList(entry.body, { breakTo: done, continueTo: exits?.continueTo ?? '' });
        }
        open(done);
      } else if (operation.op === 'for') {
        const top = fresh('for');
        const step = fresh('forstep');
        const done = fresh('fend');
        current.push(...rewrite(operation.initialize, exits, true, true));
        open(top);
        current.push({ op: 'if', condition: not(operation.condition), then: jump(done) });
        flattenList(operation.body, { breakTo: done, continueTo: step });
        open(step);
        current.push(...operation.iterate);
        current.push(...jump(top));
        open(done);
      }
    };
    for (const entry of parsed) {
      current = [];
      const { label, ...rest } = entry;
      cases.push(label ? { ...rest, values: [this.labelValue(indexOf(label))], body: current } : { ...rest, body: current });
      flattenList(entry.body, undefined);
    }

    // A local one case declares is in scope in the cases after it.
    const hoisted = new Map<string, Operation>();
    const hoist = (list: Operation[]): Operation[] => list.flatMap(operation => {
      if (operation.op === 'declare' && !(operation.value?.kind === 'call' && operation.value.callee.kind === 'identifier' &&
          ['ARRAY', 'ALLOC'].includes(operation.value.callee.name))) {
        if (!hoisted.has(operation.name)) {
          hoisted.set(operation.name, { op: 'declare', name: operation.name,
            ...(operation.valueType ? { valueType: operation.valueType } : {}) } as Operation);
        }
        return operation.value
          ? [{ op: 'assign', target: { kind: 'identifier', name: operation.name }, operator: '=', value: operation.value } as Operation]
          : [];
      }
      return [operation];
    });
    // Hoisted whether or not anything was flattened: a jump re-enters the
    // switch, and a local the cases share must outlive the dispatch.
    const loweredCases = cases.map(entry => ({ ...entry, body: hoist(entry.body) }));
    return [
      ...hoisted.values(),
      { op: 'declare', name: selector, valueType: 'int', value: expression },
      {
        op: 'while',
        condition: { kind: 'number', value: 1 },
        body: [
          { op: 'switch', expression: { kind: 'identifier', name: selector }, cases: loweredCases },
          { op: 'break' },
        ],
      },
    ];
  }

  private switchSerial = 0;

  /** A case for a label: a value no real case can have, negated past any offset or register. */
  private labelValue(index: number): GeneratedExpression {
    return { kind: 'number', value: -0x40000000 - index };
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
    // A type the source declares itself, after its qualifiers: `const format
    // &f = formats[type];` names d64_format's own nested struct, and
    // `static floppy_image_format_t::desc_e desc[]` a qualified one.
    if (typeWords.length && typeWords.every(word => QUALIFIER_WORDS.has(word)) &&
        this.peek().kind === 'identifier' && !TYPE_WORDS.has(this.peek().text)) {
      const after = this.skipTemplateArguments(this.skipQualifiedName(this.index));
      let cursor = after;
      while (['*', '&', 'const'].includes(this.tokens[cursor]?.text ?? '')) cursor++;
      if (this.tokens[cursor]?.kind === 'identifier') {
        let name = this.take().text;
        while (this.atText('::') && this.tokens[this.index + 1]?.kind === 'identifier') {
          this.take();
          name += `::${this.take().text}`;
        }
        typeWords.push(name);
      }
    }
    // The type's template arguments, if it has any. They name no value the IR
    // carries, so they are consumed rather than recorded.
    this.index = this.skipTemplateArguments(this.index);
    const valueType = typeWords.find(word =>
      word !== 'const' && word !== 'constexpr' && word !== 'static');
    const declarations: GeneratedHandlerOperation[] = [];
    // C++17 structured binding: `auto const [err, img, actual] = read_at(...)`.
    // The initializer is a tuple, held as an array; each name is one element.
    // Only a binding's `&` is taken here (`auto &[a, b] = ...`); an ordinary
    // reference declarator keeps it, which is what marks `bitmap_ind16 &bitmap`
    // as an alias rather than a copy.
    if (this.atText('&') && this.tokens[this.index + 1]?.text === '[' && valueType === 'auto') this.take();
    if (this.atText('[') && valueType === 'auto') {
      this.take();
      const names: string[] = [];
      while (this.peek().kind === 'identifier') {
        names.push(this.take().text);
        if (!this.consume(',')) break;
      }
      if (!this.consume(']') || !this.consume('=')) {
        this.unsupportedStatement('invalid structured binding');
        return declarations;
      }
      const value = this.parseExpression();
      if (!value || !this.consume(';')) {
        this.unsupportedStatement('invalid structured binding');
        return declarations;
      }
      const holder = `__binding_${this.index}`;
      declarations.push({ op: 'declare', name: holder, value });
      names.forEach((name, index) => declarations.push({
        op: 'declare',
        name,
        value: { kind: 'index', object: { kind: 'identifier', name: holder }, index: { kind: 'number', value: index } },
      }));
      return declarations;
    }
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
        // Further dimensions: `static const uint8_t convtable[32][4] = { {...}, ... }`,
        // each of the Sega Z80 decryptors' key tables, and resnet.cpp's
        // `double r[MAX_NETS][MAX_RES_PER_NET]`, which ALLOC sizes row by row.
        let dimensions = 1;
        const inner: GeneratedExpression[] = [];
        while (this.consume('[')) {
          const extent = this.parseExpression();
          if (!extent || !this.consume(']')) {
            this.unsupportedStatement(`invalid array declaration of "${name.text}"`);
            return declarations;
          }
          inner.push(extent);
          dimensions++;
        }
        const directListInitializer = this.consume('{');
        if (directListInitializer || this.consume('=')) {
          if (!directListInitializer && !this.consume('{')) {
            this.unsupportedStatement(`invalid array initializer of "${name.text}"`);
            return declarations;
          }
          const parsed = this.parseDelimitedExpressions('}');
          if (!parsed) {
            this.unsupportedStatement(`invalid array initializer of "${name.text}"`);
            return declarations;
          }
          // A row of a multi-dimensional array is an array, not a struct.
          const rows = (expression: GeneratedExpression): GeneratedExpression =>
            expression.kind === 'call' && expression.callee.kind === 'identifier' &&
              expression.callee.name === 'AGGREGATE'
              ? { ...expression, callee: { kind: 'identifier', name: 'ARRAY' }, args: expression.args.map(rows) }
              : expression;
          const values = dimensions > 1 ? parsed.map(rows) : parsed;
          value = values.length ? {
            kind: 'call',
            callee: { kind: 'identifier', name: 'ARRAY' },
            args: values,
          } : {
            kind: 'call',
            callee: { kind: 'identifier', name: 'ALLOC' },
            args: [length ?? { kind: 'number', value: 0 }, ...inner],
          };
        } else {
          value = {
            kind: 'call',
            callee: { kind: 'identifier', name: 'ALLOC' },
            args: [length ?? { kind: 'number', value: 0 }, ...inner],
          };
        }
      } else if (this.consume('=')) {
        // A braced aggregate initialises a struct field by field:
        // `static const operator_mapping s_fixed_map = { { ... } };` in ymfm.
        // The device compiler names the fields from the struct's shape.
        if (this.consume('{')) {
          const fields = this.parseDelimitedExpressions('}');
          if (!fields) {
            this.unsupportedStatement(`invalid aggregate initializer of "${name.text}"`);
            return declarations;
          }
          value = { kind: 'call', callee: { kind: 'identifier', name: 'AGGREGATE' }, args: fields };
        } else value = this.parseExpression();
      } else if (this.consume('(')) {
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
      // A default-constructed std::string is empty, and so is a string stream,
      // which is a string here: `<<` appends to it and `.str()` reads it
      // (z80daisy.cpp's daisy_show_chain builds its text in one).
      const stream = /^std::(?:o|io)?stringstream$/.test(declarationType ?? '');
      if (stream) this.streamLocals.add(name.text);
      if (stream || declarationType === 'std::string') this.stringLocals.add(name.text);
      if (!value && (stream || declarationType === 'std::string')) value = { kind: 'string', value: '' };
      // MAME's PAIR union (emucore.h) as a local: one word read and written
      // as .d, .w.l/.w.h or .b.l/.b.h, as the 6800's `PAIR r,d,b;` uses it.
      if (!value && declarationType?.replace(/\bconst\b/g, '').trim() === 'PAIR') {
        value = { kind: 'call', callee: { kind: 'identifier', name: 'PAIR_VALUE' }, args: [] };
      }
      declarations.push({
        op: 'declare',
        name: name.text,
        ...(declarationType ? { valueType: stream ? 'std::string' : declarationType } : {}),
        ...(value ? { value } : {}),
        // A function-local static keeps its value between calls; the device
        // compiler gives it storage that outlives the call.
        ...(typeWords.includes('static') ? { static: true } : {}),
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
      if (valueType.every(word => word === 'const' || word === 'volatile') && this.peek().kind === 'identifier') {
        valueType.length = 0;
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
    // `sizeof(uint8_t *)`: a pointer type, which reads as no expression. TZX's
    // block table is `malloc(count * sizeof(uint8_t*))`.
    if (this.atText('sizeof') && this.tokens[this.index + 1]?.text === '(') {
      let cursor = this.index + 2;
      const words: string[] = [];
      while (this.tokens[cursor]?.kind === 'identifier') words.push(this.tokens[cursor++]!.text);
      let stars = 0;
      while (this.tokens[cursor]?.text === '*') { stars++; cursor++; }
      if (words.length && stars && this.tokens[cursor]?.text === ')') {
        this.index = cursor + 1;
        return {
          kind: 'call',
          callee: { kind: 'identifier', name: 'sizeof' },
          args: [{ kind: 'identifier', name: `${words.join(' ')}${'*'.repeat(stars)}` }],
        };
      }
    }
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
    // `(const discrete_sound_device::task_list_t *)param`: a qualifier ahead
    // of a class type.
    while ((this.tokens[cursor]?.text === 'const' || this.tokens[cursor]?.text === 'volatile') &&
      this.tokens[cursor + 1]?.kind === 'identifier' && !TYPE_WORDS.has(this.tokens[cursor + 1]!.text)) cursor++;
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
        // Spelled as the device compiler names each instance it generates:
        // `rm16<false>` is rm16_0 and `eprom_r<0x0080>` eprom_r_128.
        const numeric = templateArgs.map(argument => {
          const text = argument.trim().replace(/[uU]$/, '');
          if (text === 'true') return '1';
          if (text === 'false') return '0';
          if (/^0x[\da-f]+$/i.test(text)) return String(Number(text));
          return /^\d+$/.test(text) ? text : undefined;
        });
        if (numeric.every(argument => argument !== undefined)) {
          expression = {
            kind: 'identifier',
            name: `${expression.name}_${numeric.join('_')}`,
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
        // A framework type alias is the same cast spelled through its class:
        // the MMC5's mixer adds `sound_stream::sample_t(m_core.pcm.output)`,
        // and as a call it answered nothing.
        const castType: string | undefined = expression.kind === 'identifier' && args.length === 1
          ? TYPE_WORDS.has(expression.name) ? expression.name : FRAMEWORK_TYPE_ALIASES[expression.name]
          : undefined;
        expression = castType
          ? { kind: 'cast', valueType: castType, operand: args[0]! }
          : { kind: 'call', callee: expression, args };
      } else if (expression.kind === 'identifier' && this.atText('{')) {
        // A braced temporary, `input_buffer{ nullptr, pbuf, 0.0 }`: the
        // device compiler names its fields from the struct (AGGREGATE_OF).
        this.take();
        const fields = this.parseDelimitedExpressions('}');
        if (!fields) return undefined;
        expression = {
          kind: 'call',
          callee: { kind: 'identifier', name: 'AGGREGATE_OF' },
          args: [{ kind: 'string', value: expression.name }, ...fields],
        };
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
        const templateArgs = this.consumeTemplateArguments();
        // Except a graphics set built at run time: make_unique<gfx_element>
        // takes (palette, layout, source, ...), nothing like the (width,
        // height) of the bitmaps every other make_unique here allocates, so
        // the type has to survive lowering.
        if (expression.name === 'std::make_unique' &&
            templateArgs?.length === 1 && templateArgs[0] === 'gfx_element') {
          expression = { kind: 'identifier', name: 'std::make_unique<gfx_element>' };
        }
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
      // An element that is itself a brace list initialises one struct of an
      // array of them (`{ SECTOR_LOOP_START, 0, -1 }` in the 1541's sector
      // description). The device compiler names its fields from the struct.
      const value = terminator === '}' && this.consume('{')
        ? (() => {
            const fields = this.parseDelimitedExpressions('}');
            return fields ? { kind: 'call' as const, callee: { kind: 'identifier' as const, name: 'AGGREGATE' }, args: fields } : undefined;
          })()
        : this.parseExpression();
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
    if (token.kind === 'string') {
      // A C++ character literal is an integer: `barcode[i] - '0'`, and
      // `magic[0] == 'N'` in the NES slot's call_load, which as a string
      // compared 78 with NaN and never recognised an iNES header.
      const character = token.text.startsWith("'") ? characterLiteral(token.text) : undefined;
      if (character !== undefined) return { kind: 'number', value: character };
      // Adjacent literals are one literal, and a string macro is a literal:
      // `"%s" PATH_SEPARATOR "%s.flac"` in samples_device::load_samples.
      let value = unquote(token.text);
      for (;;) {
        const next = this.peek();
        if (next.kind === 'string' && !next.text.startsWith("'")) value += unquote(this.take().text);
        else if (next.kind === 'identifier' && FRAMEWORK_STRING_MACROS[next.text] !== undefined) value += FRAMEWORK_STRING_MACROS[this.take().text];
        else break;
      }
      return { kind: 'string', value };
    }
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
   * `[capture] [(params)] [mutable] [-> type] { body }`.
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
        // A capture that binds no new name: `this`, a bare `&` or `=`, or a
        // by-reference capture like `&bitmap`. Those are two tokens, and
        // taking exactly one left the parser on the captured name, where the
        // separator check broke out of the loop and the whole lambda failed
        // to parse. Skip to the next separator instead. Atari's screen update
        // merges its sprites through `[this, &bitmap, &mobitmap]`, so this
        // one token cost Gauntlet and Marble Madness their screen_update.
        while (!this.at('eof') && !this.atText(',') && !this.atText(']')) this.take();
      }
      if (!this.consume(',')) break;
    }
    if (!this.consume(']')) return undefined;
    const parameters: string[] = [];
    // The parameter list may be left out when there are none:
    // `state_add<uint32_t>(STATE_GENPCBASE, "CURPC", [this] { return ...; })`.
    const listed = this.consume('(');
    if (!listed && !this.atText('{') && !this.atText('mutable') && !this.atText('->')) return undefined;
    if (listed && !this.consume(')')) {
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

/** The value of a one-character C++ literal (`'N'`, `'\\0'`, `'\\x1b'`), else undefined. */
function characterLiteral(text: string): number | undefined {
  const body = text.slice(1, -1);
  if (body.length === 1) return body.charCodeAt(0);
  const escape = /^\\(?:x([0-9a-fA-F]{1,2})|([0-7]{1,3})|(.))$/.exec(body);
  if (!escape) return undefined;
  if (escape[1]) return parseInt(escape[1], 16);
  if (escape[2]) return parseInt(escape[2], 8);
  const simple: Record<string, number> = { n: 10, t: 9, r: 13, a: 7, b: 8, f: 12, v: 11, '\\': 92, "'": 39, '"': 34, '?': 63 };
  return simple[escape[3]!];
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

/** A name, member or subscript built only from those and numbers: no call, no store. */
function pureLvalue(expression: GeneratedExpression): boolean {
  if (expression.kind === 'identifier' || expression.kind === 'number') return true;
  if (expression.kind === 'member') return pureLvalue(expression.object);
  if (expression.kind === 'index') return pureLvalue(expression.object) && pureIndex(expression.index);
  return false;
}

function pureIndex(expression: GeneratedExpression): boolean {
  if (expression.kind === 'binary') return pureIndex(expression.left) && pureIndex(expression.right);
  return pureLvalue(expression);
}

function expressionName(expression: GeneratedExpression): string {
  if (expression.kind === 'identifier') return expression.name;
  if (expression.kind === 'member') return `${expressionName(expression.object)}.${expression.property}`;
  return '<expression>';
}

/**
 * `std::tie(err, buffer, actual) = read(file, size)` assigns a tuple's
 * elements to existing names, as a structured binding declares new ones: the
 * tuple is held and each target takes its element, and `std::ignore` takes
 * nothing. The C64 expansion port reads a raw cartridge image this way.
 */
function tieAssignments(
  expression: Extract<GeneratedExpression, { kind: 'assignment' }>,
  offset: number,
): GeneratedHandlerOperation[] | undefined {
  const target = expression.target;
  if (expression.operator !== '=' || target.kind !== 'call' || target.callee.kind !== 'identifier' ||
    target.callee.name !== 'std::tie') return undefined;
  const holder = `__tie_${offset}`;
  return [
    { op: 'declare', name: holder, value: expression.value },
    ...target.args.flatMap((element, index): GeneratedHandlerOperation[] =>
      element.kind === 'identifier' && element.name === 'std::ignore' ? [] : [{
        op: 'assign',
        target: element,
        operator: '=',
        value: { kind: 'index', object: { kind: 'identifier', name: holder }, index: { kind: 'number', value: index } },
      }]),
  ];
}
