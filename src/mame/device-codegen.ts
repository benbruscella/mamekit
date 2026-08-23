import type { GeneratedExpression, GeneratedHandlerOperation } from '../ir/board.ts';
import type {
  GeneratedDeviceCallback,
  GeneratedDeviceDefinition,
  GeneratedDeviceMember,
  GeneratedDeviceMethod,
  GeneratedDeviceTimer,
} from './device-compiler.ts';

/**
 * What the emitter needs to know about the code it is compiling, independent of
 * whether that code came from a MAME device or a driver board class.
 *
 * `GeneratedDeviceDefinition` satisfies this structurally. Board handlers reach
 * the same emitter through a scope derived from BoardIr, so one emitter remains
 * the single definition of what a lowered operation means as JavaScript.
 */
export interface CodegenScope {
  constants: Record<string, number>;
  members: GeneratedDeviceMember[];
  callbacks: GeneratedDeviceCallback[];
  timers: GeneratedDeviceTimer[];
  methods: GeneratedDeviceMethod[];
  /** Entry points that must use direct generated code regardless of shape. */
  hotMethods?: string[];
  /** Source-declared calls that reach another generated component. */
  links?: { call: string }[];
  /**
   * This scope is a driver board rather than a device.
   *
   * Board handlers run against the board's own binding tables and its video
   * framework objects, where a name may be bound as a call and a value may be
   * an object rather than a pointer. Device methods were emitted and validated
   * without those rules, so they keep their established forms.
   */
  boardScope?: boolean;
}

interface EmitContext {
  definition: CodegenScope;
  boardScope: boolean;
  compiled: Set<string>;
  locals: Map<string, string | undefined>;
  wrappedReferences: Set<string>;
  returnedReference?: string;
  pointerSafeIndex: boolean;
  typescript: boolean;
}

interface Target {
  code: string;
  valueType?: string;
  bits?: 1 | 8 | 16 | 32;
  signed?: boolean;
}

const SAFE_BINARY_OPERATORS = new Set([
  '|', '^', '&', '==', '!=', '<', '<=', '>', '>=',
  '<<', '>>', '+', '-', '*', '/', '%', '&&', '||',
]);

// C++ permits a few local names that are grammar tokens in JavaScript. Keep
// source names in the IR/binding maps, but spell those locals safely in AOT
// output (MOS6532's `uint8_t in` is one real example).
const JAVASCRIPT_RESERVED_WORDS = new Set([
  'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
  'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false',
  'finally', 'for', 'function', 'if', 'implements', 'import', 'in',
  'instanceof', 'interface', 'let', 'new', 'null', 'package', 'private',
  'protected', 'public', 'return', 'static', 'super', 'switch', 'this',
  'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
]);

/**
 * Emit direct JavaScript for expensive device methods. Selection is based on
 * IR shape rather than device identity: methods containing nested loops are
 * compiled together with the source-defined methods they call.
 */
export function generatedDeviceMethodsSource(
  definition: CodegenScope,
  typescript = false,
): { source: string; methods: string[] } {
  const methodCounts = new Map<string, number>();
  for (const method of definition.methods) {
    methodCounts.set(method.name, (methodCounts.get(method.name) ?? 0) + 1);
  }
  const overloaded = new Set(
    [...methodCounts].filter(([, count]) => count > 1).map(([name]) => name),
  );
  const methodsByName = new Map(definition.methods.map(method => [method.name, method]));
  const roots = definition.methods.filter(method =>
    !overloaded.has(method.name) &&
    method.program.diagnostics.length === 0 &&
    (
      definition.hotMethods?.includes(method.name) ||
      definition.timers.some(timer => timer.callback === method.name) ||
      maximumLoopDepth(method.program.operations) >= 2 ||
      (
        maximumLoopDepth(method.program.operations) >= 1 &&
        containsSwitch(method.program.operations)
      ) ||
      (
        maximumLoopDepth(method.program.operations) >= 1 &&
        [...calledIdentifiers(method.program.operations)].some(name => {
          const dependency = methodsByName.get(name);
          return dependency && maximumLoopDepth(dependency.program.operations) >= 1;
        })
      )
    ));
  const selected = methodClosure(definition, roots, overloaded);
  const compiled = new Set(selected.map(method => method.name));
  const supportedNames = new Set(
    selected
      .filter(method => supportsMethod(method, definition, compiled))
      .map(method => method.name),
  );
  let changed = true;
  while (changed) {
    changed = false;
    for (const method of selected) {
      if (!supportedNames.has(method.name)) continue;
      const hasUnsupportedDependency = [...calledIdentifiers(method.program.operations)]
        .some(name => compiled.has(name) && !supportedNames.has(name));
      if (hasUnsupportedDependency) {
        supportedNames.delete(method.name);
        changed = true;
      }
    }
  }
  const supported = selected.filter(method => supportedNames.has(method.name));

  // A root may only call another compiled method directly when that dependency
  // also passed validation. Other calls retain the interpreter fallback.
  const functions = supported.map(method =>
    emitMethod(definition, method, supportedNames, typescript)).join('\n\n');
  const entries = supported.map(method =>
    `${JSON.stringify(method.name)}: method_${safeName(method.name)}`).join(',\n    ');
  const source = `(() => {
${functions}
  return {
    ${entries}
  };
})()`;
  return { source, methods: [...supportedNames] };
}

function containsSwitch(operations: GeneratedHandlerOperation[]): boolean {
  let found = false;
  visitOperations(operations, operation => {
    if (operation.op === 'switch') found = true;
  });
  return found;
}

export function generatedDeviceExecutableSource(
  definition: GeneratedDeviceDefinition,
  dataFile: string,
): string {
  const assignments = generatedDeviceAssignments(definition, 'definition').join('\n');
  return `// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './${dataFile}' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
${assignments}

export const device = definition;
export default device;
`;
}

function generatedDeviceAssignments(
  definition: GeneratedDeviceDefinition,
  target: string,
): string[] {
  const emitted = generatedDeviceMethodsSource(definition, true);
  const compiled = emitted.methods.length
    ? `${emitted.source} as GeneratedDeviceMethodMap`
    : '{} as GeneratedDeviceMethodMap';
  const assignments = [`${target}.compiledMethods = ${compiled};`];
  for (const [option, child] of Object.entries(definition.slot?.options ?? {})) {
    assignments.push(...generatedDeviceAssignments(
      child,
      `${target}.slot!.options[${JSON.stringify(option)}]!`,
    ));
  }
  return assignments;
}

function methodClosure(
  definition: CodegenScope,
  roots: GeneratedDeviceMethod[],
  overloaded: ReadonlySet<string>,
): GeneratedDeviceMethod[] {
  const byName = new Map(definition.methods.map(method => [method.name, method]));
  const selected = new Map<string, GeneratedDeviceMethod>();
  const visit = (method: GeneratedDeviceMethod): void => {
    if (selected.has(method.name)) return;
    selected.set(method.name, method);
    for (const name of calledIdentifiers(method.program.operations)) {
      if (overloaded.has(name)) continue;
      const dependency = byName.get(name);
      if (dependency && dependency.program.diagnostics.length === 0) visit(dependency);
    }
  };
  roots.forEach(visit);
  return [...selected.values()];
}

function calledIdentifiers(operations: GeneratedHandlerOperation[]): Set<string> {
  const names = new Set<string>();
  visitOperations(operations, operation => {
    visitOperationExpressions(operation, expression => {
      if (expression.kind === 'call' && expression.callee.kind === 'identifier') {
        names.add(expression.callee.name);
      }
    });
  });
  return names;
}

function maximumLoopDepth(
  operations: GeneratedHandlerOperation[],
  depth = 0,
): number {
  let maximum = depth;
  for (const operation of operations) {
    if (
      operation.op === 'for' ||
      operation.op === 'while' ||
      operation.op === 'do-while'
    ) {
      maximum = Math.max(maximum, maximumLoopDepth(operation.body, depth + 1));
    } else if (operation.op === 'if') {
      maximum = Math.max(
        maximum,
        maximumLoopDepth(operation.then, depth),
        maximumLoopDepth(operation.else ?? [], depth),
      );
    } else if (operation.op === 'switch') {
      for (const entry of operation.cases) {
        maximum = Math.max(maximum, maximumLoopDepth(entry.body, depth));
      }
    }
  }
  return maximum;
}

function supportsMethod(
  method: GeneratedDeviceMethod,
  definition: CodegenScope,
  compiled: Set<string>,
): boolean {
  const parameters = tryParseParameters(method.parameters);
  if (!parameters) return false;
  const locals = new Set(parameters.map(parameter => parameter.name));
  collectLocalNames(method.program.operations, locals);
  const members = new Set([
    ...definition.members.map(member => member.name),
    ...definition.callbacks.map(callback => callback.member),
    ...definition.timers.map(timer => timer.member),
  ]);
  const constants = new Set(Object.keys(definition.constants));
  const callees = calledIdentifiers(method.program.operations);
  let supported = true;
  visitOperations(method.program.operations, operation => {
    visitOperationExpressions(operation, expression => {
      if (!supported) return;
      if (expression.kind === 'identifier') {
        supported = locals.has(expression.name) ||
          members.has(expression.name) ||
          constants.has(expression.name) ||
          callees.has(expression.name) ||
          ['true', 'false', 'nullptr', 'g_profiler',
            'attotime::zero', 'attotime::never'].includes(expression.name) ||
          expression.name.startsWith('PROFILER_');
      } else if (expression.kind === 'unary') {
        supported = expression.operator !== '&' ||
          expression.operand.kind === 'index' ||
          (
            expression.operand.kind === 'call' &&
            expression.operand.callee.kind === 'member'
          );
      } else if (expression.kind === 'binary') {
        supported = SAFE_BINARY_OPERATORS.has(expression.operator);
      } else if (expression.kind === 'call' && expression.callee.kind === 'identifier') {
        // Unknown source macros/callbacks are dispatched through runtime.invoke;
        // generated methods and primitive casts remain direct calls.
        supported = true;
      } else if (expression.kind === 'call' && expression.callee.kind === 'index') {
        supported = true;
      }
    });
  });
  return supported;
}

function emitMethod(
  definition: CodegenScope,
  method: GeneratedDeviceMethod,
  compiled: Set<string>,
  typescript: boolean,
): string {
  const parameters = parseParameters(method.parameters);
  const returnedReference = singleReturnedReference(method);
  const context: EmitContext = {
    definition,
    compiled,
    locals: new Map(parameters.map(parameter => [parameter.name, parameter.valueType])),
    wrappedReferences: new Set(
      parameters
        .filter(parameter =>
          isMutableReference(parameter.valueType) &&
          parameter.name !== returnedReference &&
          assignsIdentifier(method.program.operations, parameter.name))
        .map(parameter => parameter.name),
    ),
    returnedReference,
    // Board handlers build pointers into share memory as locals
    // (`uint8_t *spriteram = m_galaga_ram1 + 0x380`), and indexing one of
    // those with a plain subscript reads a property off the pointer object
    // rather than the memory behind it.
    pointerSafeIndex: Boolean(definition.hotMethods?.length) ||
      Boolean(definition.boardScope),
    boardScope: Boolean(definition.boardScope),
    typescript,
  };
  collectLocals(method.program.operations, context);
  const annotation = typescript ? ': any' : '';
  const args = parameters.map(parameter => `${localName(parameter.name)}${annotation}`).join(', ');
  const returned = returnedReference ? `\n    return ${localName(returnedReference)};` : '';
  return `  function method_${safeName(method.name)}(runtime${annotation}${args ? `, ${args}` : ''}) {
    const members = runtime.members;
${emitOperations(method.program.operations, context, 4)}${returned}
  }`;
}

function emitOperations(
  operations: GeneratedHandlerOperation[],
  context: EmitContext,
  indentation: number,
): string {
  return operations.map(operation => emitOperation(operation, context, indentation))
    .filter(Boolean)
    .join('\n');
}

function emitOperation(
  operation: GeneratedHandlerOperation,
  context: EmitContext,
  indentation: number,
): string {
  const pad = ' '.repeat(indentation);
  if (operation.op === 'declare') {
    const value = operation.value ? emitExpression(operation.value, context) : '0';
    const annotation = context.typescript ? ': any' : '';
    const allocated = operation.value?.kind === 'call' &&
      operation.value.callee.kind === 'identifier' &&
      ['ALLOC', 'make_unique_clear'].includes(operation.value.callee.name);
    // `rectangle draw = cliprect` is a C++ value copy. Aliasing it lets a
    // handler narrow its own clip rectangle and hand the mutated one back to
    // its caller — the interpreter copies here for exactly that reason.
    const declared = operation.valueType?.replace(/\bconst\b/g, '').trim();
    if (context.boardScope && declared === 'rectangle') {
      return `${pad}let ${localName(operation.name)}${annotation} = ` +
        `Object.assign(Object.create(Object.getPrototypeOf(${value})), ${value});`;
    }
    return `${pad}let ${localName(operation.name)}${annotation} = ${
      allocated ? value : wrapType(value, operation.valueType)
    };`;
  }
  if (operation.op === 'assign') {
    return `${pad}${emitAssignment(operation.target, operation.operator, operation.value, context)};`;
  }
  if (operation.op === 'call') {
    return `${pad}${emitExpression(operation.expression, context)};`;
  }
  if (operation.op === 'return') {
    return `${pad}return${operation.value ? ` ${emitExpression(operation.value, context)}` : ''};`;
  }
  if (operation.op === 'break') return `${pad}break;`;
  if (operation.op === 'continue') return `${pad}continue;`;
  if (operation.op === 'if') {
    const lines = [
      `${pad}if (${emitExpression(operation.condition, context)}) {`,
      emitOperations(operation.then, context, indentation + 2),
      `${pad}}`,
    ];
    if (operation.else) {
      lines[lines.length - 1] += ' else {';
      lines.push(emitOperations(operation.else, context, indentation + 2));
      lines.push(`${pad}}`);
    }
    return lines.filter(Boolean).join('\n');
  }
  if (operation.op === 'for') {
    const initialize = operation.initialize
      .map(item => emitOperation(item, context, 0).trim().replace(/;$/, ''))
      .map((part, index) => index > 0 && part.startsWith('let ') ? part.slice(4) : part)
      .join(', ');
    const iterate = operation.iterate
      .map(item => emitOperation(item, context, 0).trim().replace(/;$/, ''))
      .join(', ');
    return [
      `${pad}for (${initialize}; ${emitExpression(operation.condition, context)}; ${iterate}) {`,
      emitOperations(operation.body, context, indentation + 2),
      `${pad}}`,
    ].filter(Boolean).join('\n');
  }
  if (operation.op === 'while') {
    return [
      `${pad}while (${emitExpression(operation.condition, context)}) {`,
      emitOperations(operation.body, context, indentation + 2),
      `${pad}}`,
    ].filter(Boolean).join('\n');
  }
  if (operation.op === 'do-while') {
    return [
      `${pad}do {`,
      emitOperations(operation.body, context, indentation + 2),
      `${pad}} while (${emitExpression(operation.condition, context)});`,
    ].filter(Boolean).join('\n');
  }
  const lines = [`${pad}switch (${emitExpression(operation.expression, context)}) {`];
  for (const entry of operation.cases) {
    if (entry.values) {
      for (const value of entry.values) {
        lines.push(`${pad}  case ${emitExpression(value, context)}:`);
      }
    } else {
      lines.push(`${pad}  default:`);
    }
    lines.push(emitOperations(entry.body, context, indentation + 4));
  }
  lines.push(`${pad}}`);
  return lines.filter(Boolean).join('\n');
}

function emitExpression(expression: GeneratedExpression, context: EmitContext): string {
  if (expression.kind === 'number') return String(expression.value);
  if (expression.kind === 'string') return JSON.stringify(expression.value);
  if (expression.kind === 'identifier') {
    if (context.locals.has(expression.name)) {
      return context.wrappedReferences.has(expression.name)
        ? `${localName(expression.name)}.get()`
        : localName(expression.name);
    }
    if (expression.name === 'true') return '1';
    if (expression.name === 'false' || expression.name === 'nullptr') return '0';
    if (expression.name === 'attotime::zero') return '0';
    if (expression.name === 'attotime::never') return 'Infinity';
    if (expression.name.startsWith('PROFILER_')) return '0';
    const constant = context.definition.constants[expression.name];
    if (constant !== undefined) return String(constant);
    return `members.${expression.name}`;
  }
  if (expression.kind === 'unary') {
    if (expression.operator === '&') return emitAddressOf(expression.operand, context);
    const operand = emitExpression(expression.operand, context);
    // Resolved by the operand's shape at run time, exactly as the interpreter
    // resolves it — and evaluated once, because the operand can be a call.
    if (expression.operator === '*') {
      return context.boardScope
        ? `runtime.dereference(${operand})`
        : `(${operand}).source[(${operand}).offset]`;
    }
    return expression.operator === '!' ? `((${operand}) ? 0 : 1)` : `(${expression.operator}${operand})`;
  }
  if (expression.kind === 'cast') {
    const operand = emitExpression(expression.operand, context);
    // A cast to a pointer or reference retypes an address; it never narrows.
    return expression.pointer ? operand : wrapType(operand, expression.valueType);
  }
  if (expression.kind === 'binary') {
    const left = emitExpression(expression.left, context);
    const right = emitExpression(expression.right, context);
    const leftType = expressionValueType(expression.left, context);
    const rightType = expressionValueType(expression.right, context);
    if (expression.operator === '+' && leftType?.includes('*')) {
      return `runtime.addressOf(${left}, ${right})`;
    }
    if (expression.operator === '+' && rightType?.includes('*')) {
      return `runtime.addressOf(${right}, ${left})`;
    }
    if (expression.operator === '-' && leftType?.includes('*')) {
      return `runtime.addressOf(${left}, -(${right}))`;
    }
    if (expression.operator === '&&' || expression.operator === '||') {
      return `(((${left}) ${expression.operator} (${right})) ? 1 : 0)`;
    }
    if (['==', '!=', '<', '<=', '>', '>='].includes(expression.operator)) {
      const operator = expression.operator === '==' ? '===' :
        expression.operator === '!=' ? '!==' : expression.operator;
      return `((Number(${left}) ${operator} Number(${right})) ? 1 : 0)`;
    }
    if (expression.operator === '>>') return `((${left}) >>> (${right}))`;
    return `((${left}) ${expression.operator} (${right}))`;
  }
  if (expression.kind === 'assignment') {
    const assignment = emitAssignment(
      expression.target,
      expression.operator,
      expression.value,
      context,
    );
    if (!expression.postfix) return `(${assignment})`;
    const target = targetInfo(expression.target, context);
    return `(() => { const previous = ${target.code}; ${assignment}; return previous; })()`;
  }
  if (expression.kind === 'conditional') {
    return `((${emitExpression(expression.condition, context)}) ? ` +
      `(${emitExpression(expression.whenTrue, context)}) : ` +
      `(${emitExpression(expression.whenFalse, context)}))`;
  }
  if (expression.kind === 'member') {
    return `${emitExpression(expression.object, context)}.${expression.property}`;
  }
  if (expression.kind === 'index') {
    const object = emitExpression(expression.object, context);
    const index = emitExpression(expression.index, context);
    return context.pointerSafeIndex
      ? `runtime.readIndex(${object}, ${index})`
      : `${object}[${index}]`;
  }
  return emitCall(expression, context);
}

function expressionValueType(
  expression: GeneratedExpression,
  context: EmitContext,
): string | undefined {
  if (expression.kind === 'identifier') {
    if (context.locals.has(expression.name)) return context.locals.get(expression.name);
    return context.definition.members.find(member => member.name === expression.name)?.valueType;
  }
  if (expression.kind === 'cast') return expression.valueType;
  if (expression.kind === 'unary' && expression.operator === '&') {
    return `${expressionValueType(expression.operand, context) ?? ''}*`;
  }
  if (expression.kind === 'binary' && ['+', '-'].includes(expression.operator)) {
    const left = expressionValueType(expression.left, context);
    const right = expressionValueType(expression.right, context);
    return left?.includes('*') ? left : right?.includes('*') ? right : undefined;
  }
  return undefined;
}

function emitCall(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: EmitContext,
): string {
  if (expression.callee.kind === 'identifier') {
    const name = expression.callee.name;
    if (context.compiled.has(name)) {
      const target = context.definition.methods.find(method => method.name === name);
      const parameters = parseParameters(target?.parameters ?? '');
      const returnedReference = target ? singleReturnedReference(target) : undefined;
      const args = expression.args.map((argument, index) =>
        parameters[index] &&
        isMutableReference(parameters[index].valueType) &&
        parameters[index].name !== returnedReference &&
        assignsIdentifier(target?.program.operations ?? [], parameters[index].name)
          ? emitReferenceArgument(argument, context)
          : emitExpression(argument, context));
      const call = `method_${safeName(name)}(runtime${args.length ? `, ${args.join(', ')}` : ''})`;
      if (returnedReference) {
        const index = parameters.findIndex(parameter => parameter.name === returnedReference);
        return emitReturnedReferenceAssignment(expression.args[index]!, call, context);
      }
      return call;
    }
    const args = expression.args.map(argument => emitExpression(argument, context));
    if (name === 'BIT') {
      const mask = args[2] ? `((1 << (${args[2]})) - 1)` : '1';
      return `(((${args[0] ?? '0'}) >>> (${args[1] ?? '0'})) & ${mask})`;
    }
    if (name === 'BITSWAP') {
      const source = args[0] ?? '0';
      const bits = args.slice(1);
      return `(${bits.map((bit, index) =>
        `(((${source}) >>> (${bit})) & 1) << ${bits.length - index - 1}`).join(' | ') || '0'})`;
    }
    if (name === 'TABLE') {
      const index = args[0] ?? '0';
      const values = args.slice(1);
      return `([${values.join(', ')}][(((${index}) % ${values.length}) + ${values.length}) % ` +
        `${values.length}] ?? 0)`;
    }
    if (name === 'bool') return `((${args[0] ?? '0'}) ? 1 : 0)`;
    if (name === 'ALLOC' || name === 'make_unique_clear') {
      return `new Uint8Array(Math.max(0, Number(${args[0] ?? '0'})))`;
    }
    if (name === 'sizeof') {
      const valueType = expression.args[0]
        ? expressionValueType(expression.args[0], context)
        : undefined;
      const bytes = /(?:u?int64_t|[us]64|double)/.test(valueType ?? '') ? 8
        : /(?:u?int32_t|[us]32|float|offs_t|pen_t)/.test(valueType ?? '') ? 4
        : /(?:u?int16_t|[us]16)/.test(valueType ?? '') ? 2
        : 1;
      return String(bytes);
    }
    if (name === 'memset') {
      const target = args[0] ?? '0';
      const value = args[1] ?? '0';
      const bytes = args[2] ?? '0';
      return `(() => { const target = ${target}; const bytes = Number(${bytes}); ` +
        `if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; ` +
        `target.source.fill(${value}, target.offset, target.offset + Math.ceil(bytes / width)); ` +
        `return target; } target.fill(${value}, 0, bytes); return target; })()`;
    }
    if (name === 'pen_color') {
      return `(runtime.palette[${args[0] ?? '0'}] ?? 0xff000000)`;
    }
    if (name === 'set_pen_color') {
      return `(runtime.palette[${args[0] ?? '0'}] = ${args[1] ?? '0'})`;
    }
    if (['u8', 'uint8_t', 's8', 'int8_t', 'u16', 'uint16_t',
      's16', 'int16_t', 'u32', 'uint32_t', 's32', 'int32_t'].includes(name)) {
      return wrapType(args[0] ?? '0', name);
    }
    if (context.definition.methods.some(method => method.name === name)) {
      return `runtime.invoke(${JSON.stringify(name)}${args.length ? `, ${args.join(', ')}` : ''})`;
    }
    if (context.definition.callbacks.some(callback => callback.member === name)) {
      return `runtime.invoke(${JSON.stringify(name)}${args.length ? `, ${args.join(', ')}` : ''})`;
    }
    return `(runtime.calls[${JSON.stringify(name)}]?.(${args.join(', ')}) ?? 0)`;
  }
  if (expression.callee.kind === 'member') {
    if (
      expression.callee.object.kind === 'identifier' &&
      expression.callee.object.name === 'g_profiler' &&
      (expression.callee.property === 'start' || expression.callee.property === 'stop')
    ) {
      // MAME's profiler is a host measurement facility with no emulated
      // effect. Only `start` was elided, so `stop` reached a `g_profiler` that
      // no runtime binds.
      return '0';
    }
    if (expression.callee.property === 'isnull') {
      const name = `${expressionName(expression.callee.object)}.isnull`;
      return `(runtime.calls[${JSON.stringify(name)}]?.() ?? 0)`;
    }
    const args = expression.args.map(argument => emitExpression(argument, context));
    const object = emitExpression(expression.callee.object, context);
    if (expression.callee.property === 'empty' && !args.length) {
      return `((${object}).length === 0 ? 1 : 0)`;
    }
    if (
      ['bytes', 'size', 'length'].includes(expression.callee.property) &&
      !args.length
    ) {
      return `(${object}).length`;
    }
    const directName = linkedMemberCallName(expression);
    if (
      directName &&
      context.definition.links?.some(link => link.call === directName)
    ) {
      return `(runtime.calls[${JSON.stringify(directName)}]?.(${args.join(', ')}) ?? 0)`;
    }
    // A call through a member is the board's binding when it has one, and a
    // method on the value only otherwise — the interpreter's own precedence.
    // Reading `m_screen.frame_number` off the state object instead of through
    // that binding silently gave galaxian's starfield a different frame count.
    //
    // The bound branch never evaluates the object, matching the interpreter,
    // which resolves the name before it looks at any value.
    const boundName = context.boardScope ? memberCallName(expression) : undefined;
    if (boundName) {
      const lookup = `runtime.calls[${JSON.stringify(boundName)}]`;
      return `(${lookup} ? ${lookup}(${args.join(', ')}) : ` +
        `(${object}).${expression.callee.property}(${args.join(', ')}))`;
    }
    return `${object}.${expression.callee.property}(${args.join(', ')})`;
  }
  const args = expression.args.map(argument => emitExpression(argument, context));
  const callable = emitExpression(expression.callee, context);
  return `${callable}(${args.join(', ')})`;
}

/**
 * The binding key a member call denotes, spelled the way the board binds it —
 * `m_screen.frame_number`. Undefined when the object is not a plain member
 * chain, in which case there is no name a board could have bound.
 */
function memberCallName(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
): string | undefined {
  if (expression.callee.kind !== 'member') return undefined;
  const objectName = memberChainName(expression.callee.object);
  return objectName ? `${objectName}.${expression.callee.property}` : undefined;
}

function memberChainName(expression: GeneratedExpression): string | undefined {
  if (expression.kind === 'identifier') return expression.name;
  if (expression.kind === 'member') {
    const object = memberChainName(expression.object);
    return object ? `${object}.${expression.property}` : undefined;
  }
  if (expression.kind === 'index' && expression.index.kind === 'number') {
    const object = memberChainName(expression.object);
    return object ? `${object}[${expression.index.value}]` : undefined;
  }
  return undefined;
}

function linkedMemberCallName(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
): string | undefined {
  if (expression.callee.kind !== 'member') return undefined;
  const object = expression.callee.object;
  if (
    object.kind !== 'call' ||
    object.args.length ||
    object.callee.kind !== 'identifier'
  ) {
    return undefined;
  }
  return `${object.callee.name}().${expression.callee.property}`;
}

function emitAssignment(
  expression: GeneratedExpression,
  operator: string,
  value: GeneratedExpression,
  context: EmitContext,
): string {
  const right = emitExpression(value, context);
  if (expression.kind === 'call') {
    if (operator !== '=' || expression.callee.kind !== 'member') {
      throw new Error('device codegen only supports assignment to member call results');
    }
    const object = emitExpression(expression.callee.object, context);
    const args = expression.args.map(argument => emitExpression(argument, context));
    return `${object}[${JSON.stringify(`${expression.callee.property}=`)}](` +
      `${[...args, right].join(', ')})`;
  }
  if (
    expression.kind === 'identifier' &&
    context.wrappedReferences.has(expression.name)
  ) {
    const valueType = context.locals.get(expression.name);
    const current = `${localName(expression.name)}.get()`;
    const next = pointerAssignment(current, operator, right, valueType);
    return `${localName(expression.name)}.set(${wrapType(next, valueType)})`;
  }
  if (expression.kind === 'index' && context.pointerSafeIndex) {
    const object = emitExpression(expression.object, context);
    const index = emitExpression(expression.index, context);
    const current = `runtime.readIndex(${object}, ${index})`;
    const next = operator === '='
      ? right
      : `((${current}) ${operator.slice(0, -1)} (${right}))`;
    return `runtime.writeIndex(${object}, ${index}, ${next})`;
  }
  const target = targetInfo(expression, context);
  if (
    expression.kind === 'identifier' &&
    expression.name === context.returnedReference &&
    target.valueType?.includes('*') &&
    (operator === '+=' || operator === '-=')
  ) {
    return `${target.code}.offset ${operator} ${right}`;
  }
  const next = pointerAssignment(target.code, operator, right, target.valueType);
  if (expression.kind === 'unary' && expression.operator === '*') {
    return `${target.code} = ${next}`;
  }
  return `${target.code} = ${wrapTarget(next, target)}`;
}

function pointerAssignment(
  current: string,
  operator: string,
  right: string,
  valueType?: string,
): string {
  if (
    valueType?.includes('*') &&
    (operator === '+=' || operator === '-=')
  ) {
    const sign = operator === '+=' ? '+' : '-';
    return `({ ...(${current}), offset: ((${current}).offset ${sign} (${right})) })`;
  }
  return operator === '='
    ? right
    : `((${current}) ${operator.slice(0, -1)} (${right}))`;
}

function emitAddressOf(
  expression: GeneratedExpression,
  context: EmitContext,
): string {
  if (expression.kind === 'index') {
    const object = emitExpression(expression.object, context);
    const index = emitExpression(expression.index, context);
    return context.pointerSafeIndex
      ? `runtime.addressOf(${object}, ${index})`
      : `({ generatedPointer: true, source: ${object}, offset: ${index} })`;
  }
  if (expression.kind === 'call' && expression.callee.kind === 'member') {
    const object = emitExpression(expression.callee.object, context);
    const args = expression.args.map(argument => emitExpression(argument, context));
    return `${object}[${JSON.stringify(`${expression.callee.property}&`)}](${args.join(', ')})`;
  }
  throw new Error(`device codegen has unsupported address-of operand "${expression.kind}"`);
}

function emitReferenceArgument(
  expression: GeneratedExpression,
  context: EmitContext,
): string {
  if (
    expression.kind === 'identifier' &&
    context.wrappedReferences.has(expression.name)
  ) {
    return expression.name;
  }
  const target = targetInfo(expression, context);
  const annotation = context.typescript ? ': any' : '';
  return `({ get: () => ${emitExpression(expression, context)}, ` +
    `set: (value${annotation}) => { ${target.code} = ${wrapTarget('value', target)}; } })`;
}

/**
 * A compiled method with one mutated C++ reference can use a return-value ABI.
 * This avoids allocating a get/set closure object at every hot-path call.
 */
function singleReturnedReference(
  method: GeneratedDeviceMethod,
): string | undefined {
  if (containsReturn(method.program.operations)) return undefined;
  const assigned = (tryParseParameters(method.parameters) ?? []).filter(parameter =>
    isMutableReference(parameter.valueType) &&
    assignsIdentifier(method.program.operations, parameter.name));
  return assigned.length === 1 ? assigned[0]!.name : undefined;
}

function containsReturn(operations: GeneratedHandlerOperation[]): boolean {
  let returned = false;
  visitOperations(operations, operation => {
    if (operation.op === 'return') returned = true;
  });
  return returned;
}

function emitReturnedReferenceAssignment(
  expression: GeneratedExpression,
  call: string,
  context: EmitContext,
): string {
  if (
    expression.kind === 'identifier' &&
    context.wrappedReferences.has(expression.name)
  ) {
    const valueType = context.locals.get(expression.name);
    return `(${expression.name}.set(${wrapType(call, valueType)}), ${expression.name}.get())`;
  }
  const target = targetInfo(expression, context);
  return `(${target.code} = ${wrapTarget(call, target)})`;
}

function expressionName(expression: GeneratedExpression): string {
  if (expression.kind === 'identifier') return expression.name;
  if (expression.kind === 'member') {
    return `${expressionName(expression.object)}.${expression.property}`;
  }
  return '<expression>';
}

/**
 * Parameters an emitted method receives through the get/set wrapper ABI rather
 * than by value, because the source assigns them through a C++ reference.
 *
 * A caller outside this module needs this to know whether it can hand a method
 * plain values.
 */
export function codegenWrappedParameters(method: GeneratedDeviceMethod): string[] {
  const returnedReference = singleReturnedReference(method);
  return (tryParseParameters(method.parameters) ?? [])
    .filter(parameter =>
      isMutableReference(parameter.valueType) &&
      (
        parameter.name === returnedReference ||
        assignsIdentifier(method.program.operations, parameter.name)
      ))
    .map(parameter => parameter.name);
}

function isMutableReference(valueType: string | undefined): boolean {
  return Boolean(valueType?.includes('&') && !/\bconst\b/.test(valueType));
}

function assignsIdentifier(
  operations: GeneratedHandlerOperation[],
  name: string,
): boolean {
  let assigned = false;
  visitOperations(operations, operation => {
    if (
      operation.op === 'assign' &&
      operation.target.kind === 'identifier' &&
      operation.target.name === name
    ) {
      assigned = true;
      return;
    }
    visitOperationExpressions(operation, expression => {
      if (
        expression.kind === 'assignment' &&
        expression.target.kind === 'identifier' &&
        expression.target.name === name
      ) {
        assigned = true;
      }
    });
  });
  return assigned;
}

function targetInfo(expression: GeneratedExpression, context: EmitContext): Target {
  if (expression.kind === 'identifier') {
    if (context.locals.has(expression.name)) {
      return { code: localName(expression.name), valueType: context.locals.get(expression.name) };
    }
    const member = context.definition.members.find(candidate => candidate.name === expression.name);
    if (member) {
      return {
        code: `members.${member.name}`,
        bits: member.bits,
        signed: member.signed,
      };
    }
  }
  if (expression.kind === 'index') {
    return {
      code: `${emitExpression(expression.object, context)}[${emitExpression(expression.index, context)}]`,
    };
  }
  if (expression.kind === 'member') {
    return {
      code: `${emitExpression(expression.object, context)}.${expression.property}`,
    };
  }
  if (expression.kind === 'unary' && expression.operator === '*') {
    const pointer = emitExpression(expression.operand, context);
    return {
      code: `(${pointer}).source[(${pointer}).offset]`,
    };
  }
  throw new Error(`device codegen has unsupported assignment target "${expression.kind}"`);
}

function parseParameters(parameters: string): { name: string; valueType: string }[] {
  const parsed = tryParseParameters(parameters);
  if (!parsed) throw new Error(`cannot emit device parameters "${parameters}"`);
  return parsed;
}

/**
 * Undefined when a signature names a parameter in a form this emitter cannot
 * spell as a JavaScript binding — MAME's `double (&weights_r)[N]` reference to
 * an array is one. Selection uses this to decline the method, which leaves it
 * on the interpreter rather than failing the build: emitted code is an
 * optimisation, and every method it declines still has a definition.
 */
function tryParseParameters(
  parameters: string,
): { name: string; valueType: string }[] | undefined {
  const parsed: { name: string; valueType: string }[] = [];
  for (const parameter of parameters.split(',').map(entry => entry.trim()).filter(Boolean)) {
    const name = /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter)?.[1];
    if (!name) return undefined;
    parsed.push({
      name,
      valueType: parameter.slice(0, parameter.lastIndexOf(name)).trim(),
    });
  }
  return parsed;
}

function collectLocals(
  operations: GeneratedHandlerOperation[],
  context: EmitContext,
): void {
  visitOperations(operations, operation => {
    if (operation.op !== 'declare') return;
    const inferred = operation.valueType === 'auto' && operation.value
      ? expressionValueType(operation.value, context)
      : undefined;
    context.locals.set(operation.name, inferred ?? operation.valueType);
  });
}

function collectLocalNames(
  operations: GeneratedHandlerOperation[],
  locals: Set<string>,
): void {
  visitOperations(operations, operation => {
    if (operation.op === 'declare') locals.add(operation.name);
  });
}

function visitOperations(
  operations: GeneratedHandlerOperation[],
  visit: (operation: GeneratedHandlerOperation) => void,
): void {
  for (const operation of operations) {
    visit(operation);
    if (operation.op === 'if') {
      visitOperations(operation.then, visit);
      visitOperations(operation.else ?? [], visit);
    } else if (
      operation.op === 'for' ||
      operation.op === 'while' ||
      operation.op === 'do-while'
    ) {
      if (operation.op === 'for') visitOperations(operation.initialize, visit);
      visitOperations(operation.body, visit);
      if (operation.op === 'for') visitOperations(operation.iterate, visit);
    } else if (operation.op === 'switch') {
      for (const entry of operation.cases) visitOperations(entry.body, visit);
    }
  }
}

function visitOperationExpressions(
  operation: GeneratedHandlerOperation,
  visit: (expression: GeneratedExpression) => void,
): void {
  if (operation.op === 'declare' && operation.value) visitExpression(operation.value, visit);
  else if (operation.op === 'assign') {
    visitExpression(operation.target, visit);
    visitExpression(operation.value, visit);
  } else if (operation.op === 'call') visitExpression(operation.expression, visit);
  else if (operation.op === 'return' && operation.value) visitExpression(operation.value, visit);
  else if (
    operation.op === 'if' ||
    operation.op === 'while' ||
    operation.op === 'do-while'
  ) {
    visitExpression(operation.condition, visit);
  } else if (operation.op === 'for') {
    visitExpression(operation.condition, visit);
  } else if (operation.op === 'switch') visitExpression(operation.expression, visit);
}

function visitExpression(
  expression: GeneratedExpression,
  visit: (expression: GeneratedExpression) => void,
): void {
  visit(expression);
  if (expression.kind === 'unary' || expression.kind === 'cast') {
    visitExpression(expression.operand, visit);
  } else if (expression.kind === 'binary') {
    visitExpression(expression.left, visit);
    visitExpression(expression.right, visit);
  } else if (expression.kind === 'assignment') {
    visitExpression(expression.target, visit);
    visitExpression(expression.value, visit);
  } else if (expression.kind === 'conditional') {
    visitExpression(expression.condition, visit);
    visitExpression(expression.whenTrue, visit);
    visitExpression(expression.whenFalse, visit);
  } else if (expression.kind === 'member') {
    visitExpression(expression.object, visit);
  } else if (expression.kind === 'index') {
    visitExpression(expression.object, visit);
    visitExpression(expression.index, visit);
  } else if (expression.kind === 'call') {
    if (expression.callee.kind === 'member') {
      visitExpression(expression.callee.object, visit);
    } else if (expression.callee.kind === 'index') {
      visitExpression(expression.callee, visit);
    }
    expression.args.forEach(argument => visitExpression(argument, visit));
  }
}

function wrapTarget(value: string, target: Target): string {
  return target.bits
    ? wrapBits(value, target.bits, target.signed)
    : wrapType(value, target.valueType);
}

function wrapBits(value: string, bits?: 1 | 8 | 16 | 32, signed = false): string {
  if (bits === 1) return `((${value}) ? 1 : 0)`;
  if (bits === 8) {
    return signed ? `((${value}) << 24 >> 24)` : `((${value}) & 0xff)`;
  }
  if (bits === 16) {
    return signed ? `((${value}) << 16 >> 16)` : `((${value}) & 0xffff)`;
  }
  if (bits === 32) return signed ? `((${value}) | 0)` : `((${value}) >>> 0)`;
  return value;
}

function wrapType(value: string, valueType?: string): string {
  if (valueType?.includes('*')) return value;
  const normalized = valueType?.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim();
  if (normalized === 'bool') return `((${value}) ? 1 : 0)`;
  if (normalized === 'u8' || normalized === 'uint8_t') return `((${value}) & 0xff)`;
  if (normalized === 's8' || normalized === 'int8_t' || normalized === 'char') {
    return `((${value}) << 24 >> 24)`;
  }
  if (normalized === 'u16' || normalized === 'uint16_t') return `((${value}) & 0xffff)`;
  if (normalized === 's16' || normalized === 'int16_t') return `((${value}) << 16 >> 16)`;
  if (normalized === 'u32' || normalized === 'uint32_t') return `((${value}) >>> 0)`;
  if (normalized === 's32' || normalized === 'int32_t') return `((${value}) | 0)`;
  return value;
}

function safeName(name: string): string {
  return name.replace(/\W/g, '_');
}

function localName(name: string): string {
  return JAVASCRIPT_RESERVED_WORDS.has(name) ? `$${name}` : name;
}
