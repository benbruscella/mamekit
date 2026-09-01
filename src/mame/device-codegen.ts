import type { GeneratedExpression, GeneratedHandlerOperation } from '../ir/board.ts';
import { isFloatingExpression } from '../ir/execute.ts';
import { HOST_SERVICE_CALLS } from '../ir/board.ts';
import { TYPE_WORDS } from './handler-ir.ts';
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
  /** The emitted method's own constants, resolved before the scope's. */
  methodConstants?: Record<string, number>;
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
      // A bus entry point: MAME spells a memory handler's address as `offs_t`,
      // and a processor calls one once per access. These carry no loop for the
      // shape rules below to notice, so the ColecoVision's Z80 drove every VDP
      // port write through the interpreter -- 41% of a frame at 33 fps.
      isBusEntryPoint(method) ||
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
  // A method that assigns through a C++ reference is emitted against the
  // get/set (or single returned reference) ABI, which only an emitted caller
  // knows how to satisfy — and those call it as a plain function, not through
  // this map. The map is what an INTERPRETED caller reaches, and it hands
  // arguments in one shape only, so publishing such a method there silently
  // drops the write: the NES PPU's shift_tile_plane_data returned each
  // background pixel to a caller that ignored it, and the whole screen came
  // out as palette entry zero.
  const entries = supported
    .filter(method => codegenWrappedParameters(method).length === 0)
    .map(method =>
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
  // A device's embedded children need compiled methods as much as it does.
  // Pitfall II's DPC answers ~94,000 reads a second; left interpreted it cost
  // the machine a third of its frame rate.
  for (const [index, child] of (definition.children ?? []).entries()) {
    assignments.push(...generatedDeviceAssignments(
      child.definition,
      `${target}.children![${index}]!.definition`,
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

export function calledIdentifiers(operations: GeneratedHandlerOperation[]): Set<string> {
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

/**
 * Is this a method a processor reaches through an address map?
 *
 * MAME writes every memory handler with an `offs_t` address first, so the
 * signature says it without the device having to be named. The closure pulls
 * in whatever such a method calls, which is how the whole register/VRAM path
 * ends up compiled with it.
 */
function isBusEntryPoint(method: GeneratedDeviceMethod): boolean {
  const first = method.parameters.split(',')[0]?.trim() ?? '';
  // MAME's handlers take the address first and call it `offset`, always. The
  // NAME is the discriminator, not the arity: the slapstic's
  // `configure_range(offs_t start, ...)` is configuration rather than a bus
  // handler, while a ColecoVision cartridge's
  // `read(offs_t offset, int _8000, int _a000, int _c000, int _e000)` carries
  // four chip selects besides the address -- and runs on every instruction
  // fetch, because the game code lives in cartridge ROM.
  return /^offs_t\s+offset$/.test(first);
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
  const constants = new Set([
    ...Object.keys(definition.constants),
    ...Object.keys(method.constants ?? {}),
  ]);
  const callees = calledIdentifiers(method.program.operations);
  let supported = true;
  visitOperations(method.program.operations, operation => {
    visitOperationExpressions(operation, expression => {
      if (!supported) return;
      if (expression.kind === 'identifier') {
        // A constant written with its declaring class (`lr35902_cpu_device::
        // VBL_INT`) is recorded under its leaf name, and `emitExpression`
        // resolves both spellings. Declining the qualified one left the Game
        // Boy PPU's whole state machine interpreted for the sake of one enum.
        supported = locals.has(expression.name) ||
          members.has(expression.name) ||
          constants.has(expression.name) ||
          constants.has(expression.name.split('::').at(-1)!) ||
          callees.has(expression.name) ||
          ['true', 'false', 'nullptr', 'g_profiler',
            'attotime::zero', 'attotime::never'].includes(expression.name) ||
          expression.name.startsWith('PROFILER_') ||
          // MAME's mem_mask byte-lane tests, emitted against the handler's own
          // mem_mask parameter exactly as the interpreter evaluates them.
          (
            (expression.name === 'ACCESSING_BITS_0_7' ||
              expression.name === 'ACCESSING_BITS_8_15') &&
            locals.has('mem_mask')
          );
      } else if (expression.kind === 'unary') {
        supported = expression.operator !== '&' ||
          expression.operand.kind === 'index' ||
          (
            expression.operand.kind === 'call' &&
            expression.operand.callee.kind === 'member'
          ) ||
          (
            expression.operand.kind === 'identifier' &&
            structMemberNames(definition).has(expression.operand.name)
          );
      } else if (expression.kind === 'binary') {
        supported = SAFE_BINARY_OPERATORS.has(expression.operator);
      } else if (expression.kind === 'call' && expression.callee.kind === 'identifier') {
        // Unknown source macros/callbacks are dispatched through runtime.invoke;
        // generated methods and primitive casts remain direct calls.
        supported = true;
      } else if (expression.kind === 'call' && expression.callee.kind === 'index') {
        supported = true;
      } else if (expression.kind === 'call' && expression.callee.kind === 'member') {
        // A member call chained on another call's result — MAME framework
        // service chains such as machine().bookkeeping().coin_counter_w(...) —
        // has interpreter-only resolution unless the inner call is a method
        // this scope compiles. The invoke fallback would hand the chain a
        // number, so such a method stays interpreted.
        //
        // A chain the device DECLARES as a link is the exception: emitCall
        // spells it as the same direct `runtime.calls["space().read_byte"]`
        // lookup the interpreter resolves, so nothing is lost. Declining it
        // here left the NES PPU's readbyte interpreted, and every renderer
        // that reaches VRAM through it followed — the console drew Super
        // Mario Bros. at 5 fps.
        const linked = linkedMemberCallName(expression);
        const inner = expression.callee.object;
        supported = (
          linked !== undefined &&
          (
            (definition.links ?? []).some(link => link.call === linked) ||
            // A framework service the board binds for every device: same
            // direct lookup, no target device to resolve.
            HOST_SERVICE_CALLS.includes(linked)
          )
        ) ||
          inner.kind !== 'call' ||
          inner.callee.kind !== 'identifier' ||
          definition.methods.some(candidate => candidate.name ===
            (inner.callee as { name: string }).name);
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
    methodConstants: method.constants,
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
    // A scalar valueType says nothing about the value: MAME declares local
    // aggregates as `uint8_t protdata[0x1e] = {...}`, and narrowing that to a
    // byte turns the whole table into 0. Crush Roller's protection read then
    // answered 0 for every entry. The interpreter tests the value's shape at
    // run time (compileValueWrapper); these are the IR's aggregate producers.
    const allocated = operation.value?.kind === 'call' &&
      operation.value.callee.kind === 'identifier' &&
      ['ALLOC', 'make_unique_clear', 'ARRAY'].includes(operation.value.callee.name);
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
    // C++ gives each case its own scope; a JavaScript switch gives all of them
    // one. MAME writes a `uint16_t addr` per arm as a matter of course -- the
    // TMS9928A declares `addr`, `fg` and `bg` in several of its display-mode
    // arms -- so without a block per case the emitted method redeclares them
    // and does not compile at all. Braces do not affect fall-through.
    lines.push(`${pad}  {`);
    lines.push(emitOperations(entry.body, context, indentation + 4));
    lines.push(`${pad}  }`);
  }
  lines.push(`${pad}}`);
  return lines.filter(Boolean).join('\n');
}

/**
 * A member read, as the interpreter resolves it.
 *
 * State only gains a driver scalar when something writes it: MAME's own
 * `uint8_t m_gfx_bank = 0` default initialiser is a declaration fact that
 * lowering does not carry, and the interpreter covers for it by reading an
 * absent member as 0 (toNumber(undefined)). Emitted code has to agree, or
 * `m_video_ram[i] + 256 * m_gfx_bank` is NaN until the first bank write and
 * dkongjr decodes its whole first background frame from NaN tile codes.
 *
 * The fallback is not a plain 0: a device finder resolves to a reference the
 * interpreter treats as present, and reading `m_ym2203` as 0 skipped the chip
 * reset in bublbobl's common_sreset. It runs only when the property is absent,
 * so the common path stays a plain property read.
 *
 * A call target uses `members.<name>` directly instead — see emitCallObject,
 * where any fallback would make an unmaterialised device look present.
 */
function memberValue(name: string): string {
  return `(members.${name} ?? runtime.member(${JSON.stringify(name)}))`;
}

/**
 * The object of a member call. The call ladder tests this for materialisation,
 * so it must stay undefined when the board never bound the member.
 */
function emitCallObject(
  expression: GeneratedExpression,
  context: EmitContext,
): string {
  if (
    expression.kind === 'identifier' &&
    expression.name.startsWith('m_') &&
    !context.locals.has(expression.name) &&
    context.methodConstants?.[expression.name] === undefined &&
    context.definition.constants[expression.name] === undefined
  ) {
    return `members.${expression.name}`;
  }
  return emitExpression(expression, context);
}

function emitExpression(expression: GeneratedExpression, context: EmitContext): string {
  if (expression.kind === 'number') {
    return expression.wide === undefined ? String(expression.value) : `${expression.wide}n`;
  }
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
    if (expression.name === 'ACCESSING_BITS_0_7') {
      return `(((${localName('mem_mask')}) & 0x00ff) ? 1 : 0)`;
    }
    if (expression.name === 'ACCESSING_BITS_8_15') {
      return `(((${localName('mem_mask')}) & 0xff00) ? 1 : 0)`;
    }
    const leaf = expression.name.split('::').at(-1)!;
    const constant = context.methodConstants?.[expression.name] ??
      context.definition.constants[expression.name] ??
      context.methodConstants?.[leaf] ??
      context.definition.constants[leaf];
    if (constant !== undefined) return String(constant);
    return memberValue(expression.name);
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
    // A 64-bit literal promotes the whole expression around it, exactly as in
    // C. Emitted arithmetic is plain `number`, so the operation is handed to
    // the same exact evaluator the interpreter uses -- only the operands stay
    // compiled. MAME's Game Boy PPU interleaves two bit planes this way, and
    // computing it in floating point drew a blank screen.
    if (containsWideLiteral([expression])) {
      return `runtime.wide(${JSON.stringify(expression.operator)}, ` +
        `${emitExpression(expression.left, context)}, ` +
        `${emitExpression(expression.right, context)})`;
    }
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
      // A pointer is an address, not a number. `Number()` of one is NaN, and
      // `NaN !== NaN` is true, so CPS1's `if (palette_ram != palette_base)`
      // fired before the pointer had moved and cps1_build_palette skipped a
      // page of gfxram, leaving ghouls with a black palette. Equality between
      // operands that can hold a pointer uses the comparison the interpreter
      // uses; ordinary integer comparisons keep the direct numeric form.
      if (
        (expression.operator === '==' || expression.operator === '!=') &&
        (leftType?.includes('*') || rightType?.includes('*'))
      ) {
        const equal = `runtime.same(${left}, ${right})`;
        return expression.operator === '=='
          ? `(${equal} ? 1 : 0)`
          : `(${equal} ? 0 : 1)`;
      }
      const operator = expression.operator === '==' ? '===' :
        expression.operator === '!=' ? '!==' : expression.operator;
      return `((Number(${left}) ${operator} Number(${right})) ? 1 : 0)`;
    }
    if (expression.operator === '>>') return `((${left}) >>> (${right}))`;
    if (expression.operator === '/') {
      // C++ integer division truncates. The interpreter applies that whenever
      // both operands are integers at run time, exempting expressions the
      // source wrote as floating; emitted code must decide it the same way, or
      // a `mark_tile_dirty(offset / 2)` index arrives as 1.5.
      if (isFloatingExpression(expression.left) || isFloatingExpression(expression.right)) {
        return `((${left}) / (${right}))`;
      }
      return `runtime.divide(${left}, ${right})`;
    }
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
  if (expression.kind === 'lambda') {
    // A MAME lambda captures `this`, and the emitted method body is already
    // `this`-scoped, so an arrow function captures exactly the same names.
    // An unnamed parameter still holds its position in the signature.
    //
    // The body emits in a scope of its own: the lambda's parameters are locals
    // inside it and members outside it, and a body that assigns to one -- MAME
    // taps take `u8 &data` by reference and write through it -- would otherwise
    // resolve the name against the enclosing method and fail to emit at all.
    const annotation = context.typescript ? ': any' : '';
    const names = expression.parameters
      .map((name, index) => `${name || `unused${index}`}${annotation}`);
    const inner: EmitContext = {
      ...context,
      locals: new Map([
        ...context.locals,
        ...expression.parameters
          .filter(Boolean)
          .map(name => [name, undefined] as [string, string | undefined]),
      ]),
    };
    // The method's locals were collected before emitting, and that walk visits
    // operations, not the expressions inside them -- so nothing the lambda body
    // declares is known yet. Collect them here, over the body's own scope.
    collectLocals(expression.body, inner);
    return `((${names.join(', ')}) => {\n${emitOperations(expression.body, inner, 6)}\n    })`;
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
    // A board package can override a source method with a shape-recognised
    // runtime fast path (CPS1's gfxrom_bank_mapper pointer walk is one). The
    // interpreter consults those overrides before anything else, so an emitted
    // direct call must yield to them the same way. Both ternary arms reuse the
    // same emitted argument text, so arguments still evaluate exactly once.
    const yieldToOverride = (emission: string, argList: string[]): string =>
      context.boardScope
        ? `(runtime.overrides[${JSON.stringify(name)}] ? ` +
          `runtime.overrides[${JSON.stringify(name)}](${argList.join(', ')}) : ${emission})`
        : emission;
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
      return yieldToOverride(call, args);
    }
    const args = expression.args.map(argument => emitExpression(argument, context));
    if (name === 'COMBINE_DATA') {
      // The interpreter reads data/mem_mask from the handler's locals; emitted
      // code passes its own parameters, with MAME's full-mask default.
      const data = context.locals.has('data') ? localName('data') : '0';
      const memMask = context.locals.has('mem_mask') ? localName('mem_mask') : '0xffff';
      return `runtime.combineData(${args[0] ?? '0'}, ${data}, ${memMask})`;
    }
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
      return yieldToOverride(
        `new Uint8Array(Math.max(0, Number(${args[0] ?? '0'})))`,
        args,
      );
    }
    if (name === 'sizeof') {
      const operand = expression.args[0];
      const valueType = operand ? expressionValueType(operand, context) : undefined;
      const bytes = /(?:u?int64_t|[us]64|double)/.test(valueType ?? '') ? 8
        : /(?:u?int32_t|[us]32|float|offs_t|pen_t)/.test(valueType ?? '') ? 4
        : /(?:u?int16_t|[us]16)/.test(valueType ?? '') ? 2
        : 1;
      // `sizeof(uint8_t)` names a type and is that type's width. `sizeof line`
      // names a value, and C++ answers with the whole object -- for the line
      // buffers TIA composites into, the array's length, not one element.
      // The declared width stays the fallback for a scalar operand.
      if (operand && !namesType(operand)) {
        return `((${args[0]})?.byteLength ?? ${bytes})`;
      }
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
      // MAME has both `set_pen_color(pen, rgb_t)` and
      // `set_pen_color(pen, r, g, b)`; only the argument count separates them.
      // Emitting the four-argument form as the two-argument one stored the red
      // channel alone as the whole colour, which left the TIA's pen 0 at zero
      // and every Atari 2600 picture invisible. The packing matches the one
      // `rgb_t(...)` builds: alpha, blue, green, red down to the low byte.
      if (args.length >= 4) {
        return `(runtime.palette[${args[0]}] = ((0xff000000 | ` +
          `((${args[3]}) & 0xff) << 16 | ((${args[2]}) & 0xff) << 8 | ` +
          `((${args[1]}) & 0xff)) >>> 0))`;
      }
      return `(runtime.palette[${args[0] ?? '0'}] = ${args[1] ?? '0'})`;
    }
    if (['u8', 'uint8_t', 's8', 'int8_t', 'u16', 'uint16_t',
      's16', 'int16_t', 'u32', 'uint32_t', 's32', 'int32_t'].includes(name)) {
      return wrapType(args[0] ?? '0', name);
    }
    // What `stripTracingCalls` leaves where a MAME `LOG(...)` stood. Emitting
    // the dispatch put 36 interpreter calls inside the Game Boy PPU's scanline
    // renderer for a placeholder that does nothing.
    if (name === 'TRACE_NOOP') return '0';
    if (context.definition.methods.some(method => method.name === name)) {
      return `runtime.invoke(${JSON.stringify(name)}${args.length ? `, ${args.join(', ')}` : ''})`;
    }
    if (context.definition.callbacks.some(callback => callback.member === name)) {
      return `runtime.invoke(${JSON.stringify(name)}${args.length ? `, ${args.join(', ')}` : ''})`;
    }
    // Board/host bindings first — the interpreter's own precedence — then the
    // shared framework-macro table, so rgb_t/TILE_FLIPYX/assert and friends
    // mean the same thing here as they do interpreted.
    return `(runtime.calls[${JSON.stringify(name)}] ? ` +
      `runtime.calls[${JSON.stringify(name)}](${args.join(', ')}) : ` +
      `runtime.macro(${JSON.stringify(name)}${args.length ? `, ${args.join(', ')}` : ''}))`;
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
    const object = emitCallObject(expression.callee.object, context);
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
      (
        context.definition.links?.some(link => link.call === directName) ||
        HOST_SERVICE_CALLS.includes(directName)
      )
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
    const onValue = emitValueMemberCall(expression, object, args);
    if (boundName) {
      const lookup = `runtime.calls[${JSON.stringify(boundName)}]`;
      // The interpreter's own order, and the reason all three arms exist: a
      // board binding wins; otherwise the value answers; and a member the
      // board declared but never materialised (an optional device with no
      // executable core) has no value at all, so its bare method name is the
      // last thing tried before the call means nothing. Emitting only the
      // first two arms turned such a call into a TypeError instead.
      const bare = `runtime.calls[${JSON.stringify(expression.callee.property)}]`;
      return `(${lookup} ? ${lookup}(${args.join(', ')}) : ` +
        `(${object}) != null ? ${onValue} : ` +
        `(${bare}?.(${args.join(', ')}) ?? 0))`;
    }
    return onValue;
  }
  const args = expression.args.map(argument => emitExpression(argument, context));
  const callable = emitExpression(expression.callee, context);
  return `${callable}(${args.join(', ')})`;
}

/**
 * A member call on a value, with MAME's accessor spelling reconciled against
 * the runtime's own shape.
 *
 * MAME writes every framework read as a call — `pixmap.width()`,
 * `bitmap.pix(y)` — while the runtime models some of those surfaces as plain
 * data and others as methods. Only the value knows which, so a zero-argument
 * call asks it: a function is invoked and a scalar is read, exactly as the
 * interpreter resolves the same expression. Emitting the call form
 * unconditionally is why a driver renderer that reaches a framework extent had
 * to stay interpreted, and it is what made Zaxxon's background mask -1.
 *
 * The object is only re-spelled when it is a plain name or member chain, so
 * the two mentions can never evaluate a call twice.
 */
function emitValueMemberCall(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  object: string,
  args: readonly string[],
): string {
  if (expression.callee.kind !== 'member') return `${object}(${args.join(', ')})`;
  const property = expression.callee.property;
  // A member holding a C++ pointer is a generated pointer at run time, not the
  // thing it points at: `m_vram_space = &space(AS_DATA)` makes every
  // `m_vram_space->read_byte(...)` a call on the wrapper. The interpreter
  // dereferences before it looks for the method, and emitted code that did not
  // found no `read_byte`, took the `?? 0` fallback, and drew the TMS9928A's
  // whole active display as empty VRAM.
  const access = `(runtime.dereference(${object})).${property}`;
  // A MAME `rgb_t` is a packed number, and its channel accessors read it back:
  // the TIA builds its 16k blended palette from `pen_color(i).r()` and friends.
  // A numeric receiver has no method to call, and the fallback below answered 0
  // -- which made every blended pen black, and with it every moving object on
  // the screen.
  const channelShift = RGB_CHANNEL_SHIFTS[property];
  if (channelShift !== undefined && !args.length) {
    return `(typeof ${object} === 'number' ? ((${object}) >>> ${channelShift}) & 0xff : ` +
      `(${access}?.() ?? 0))`;
  }
  if (args.length || !memberChainName(expression.callee.object)) {
    // The value may not implement the accessor MAME spells here: the runtime
    // models a gfx_element without `mark_dirty`, and the interpreter answers
    // such a call with 0 rather than failing. Emitting the bare call instead
    // made junglek and elevator throw a TypeError out of `characterram_w`.
    // The optional call costs nothing when the method is there.
    return args.length
      ? `(${access}?.(${args.join(', ')}) ?? 0)`
      : `(${access}?.() ?? runtime.container(${object}, ${JSON.stringify(property)}))`;
  }
  // A MAME memory container answers its own accessors from the container: a
  // `std::unique_ptr<u8[]>` is a plain array at run time, so `m_vram.get()` has
  // no method to call and the pointer it would return *is* the array. Falling
  // through to 0 made the Game Boy PPU fetch every tile from address zero.
  return `(typeof ${access} === 'function' ? ${access}() : ` +
    `typeof ${access} === 'number' || typeof ${access} === 'boolean' ? ${access} : ` +
    `runtime.container(${object}, ${JSON.stringify(property)}))`;
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
    // A board materialises a plain driver array the first time a handler
    // writes one, so the container an indexed write stores into has to be
    // asked for by NAME -- `runtime.writeIndex` only ever sees the value, and
    // a member that does not exist yet reads as 0, which silently swallowed
    // the write. That is how the Game Boy's `m_gb_io[0] = 0xCF | data` never
    // reached the joypad register.
    const object = expression.object.kind === 'identifier' &&
        expression.object.name.startsWith('m_') &&
        !context.locals.has(expression.object.name)
      ? `runtime.writableMember(${JSON.stringify(expression.object.name)})`
      : emitExpression(expression.object, context);
    const index = emitExpression(expression.index, context);
    const current = `runtime.readIndex(${object}, ${index})`;
    const next = operator === '='
      ? right
      : `((${current}) ${operator === '>>=' ? '>>>' : operator.slice(0, -1)} (${right}))`;
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
  // `&=` is an intersection when the target is a rectangle and a bitwise AND
  // otherwise, and only the value knows which. The interpreter decides it by
  // shape at run time; emitting a bare `&` made `Number(rect) & Number(rect)`
  // zero and erased pacman's sprite clip.
  if (operator === '&=') return `runtime.andAssign(${current}, ${right})`;
  // `>>=` follows the binary `>>` rule above: unsigned C++ shifts stay logical.
  return operator === '='
    ? right
    : `((${current}) ${operator === '>>=' ? '>>>' : operator.slice(0, -1)} (${right}))`;
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
  // `&p0gfx`, where the member holds a struct. A struct is an object at run
  // time, so its address is the object -- the same identity the interpreter
  // gives it. The TIA hands both its sprite states to one shared draw routine
  // this way, and refusing it kept the whole scanline compositor interpreted.
  if (expression.kind === 'identifier' && namesStructMember(expression.name, context)) {
    return emitExpression(expression, context);
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
  // C spells an empty parameter list `(void)`, and MAME still writes it that
  // way in places. Read as a parameter it becomes one named `void`, so the
  // emitted method took an argument its callers never pass -- which is a
  // compile error the moment such a method is selected for codegen.
  if (parameters.trim() === 'void') return parsed;
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

/** Whether an expression names a C++ type rather than a value. */
function namesType(expression: GeneratedExpression): boolean {
  return expression.kind === 'identifier' && TYPE_WORDS.has(expression.name);
}

/**
 * `rgb_t` channel accessors, by the shift that reads each one out of the
 * packing `rgb_t(...)` builds: alpha, blue, green, red down to bit zero.
 */
const RGB_CHANNEL_SHIFTS: Record<string, number | undefined> = { r: 0, g: 8, b: 16, a: 24 };

/**
 * Members whose C++ type is a struct or union rather than a number.
 *
 * A struct member is an object at run time, so `&member` is the member itself.
 * A scalar member is not: its address needs a get/set wrapper, and taking one
 * stays interpreted.
 */
function structMemberNames(definition: CodegenScope): Set<string> {
  return new Set(
    definition.members
      .filter(member => !integerBitsForType(member.valueType) &&
        !member.memory && !member.finder && !member.values &&
        /^[A-Za-z_]\w*$/.test(member.valueType))
      .map(member => member.name),
  );
}

function namesStructMember(name: string, context: EmitContext): boolean {
  return structMemberNames(context.definition).has(name);
}

/** Whether a declared type is one of MAME's fixed-width integer spellings. */
function integerBitsForType(valueType: string): boolean {
  return /^(?:const\s+)?(?:u|s|uint|int)(?:8|16|32|64)(?:_t)?$|^(?:bool|char|int|unsigned|float|double|offs_t|pen_t)$/
    .test(valueType.trim());
}

/** Whether any expression in these operations carries a 64-bit literal. */
function containsWideLiteral(operations: unknown): boolean {
  return JSON.stringify(operations).includes('"wide":');
}
