import type { GeneratedExpression, GeneratedHandlerOperation } from '../ir/board.ts';
import { applyGeneratedMacro, DEFAULT_CONSTANTS, isFloatingExpression, isThisDereference, STRING_MUTATORS } from '../ir/execute.ts';
import { HOST_SERVICE_CALLS, VIDEO_FRAMEWORK_CHAIN_CALLS } from '../ir/board.ts';
import { cppDefaultArgument } from '../ir/execute.ts';
import { isNoEffectStatement } from '../ir/framework-calls.ts';
import { TYPE_WORDS } from './handler-ir.ts';
import type {
  GeneratedDeviceCallback,
  GeneratedDeviceDefinition,
  GeneratedDeviceMember,
  GeneratedDeviceMethod,
  GeneratedDeviceTimer,
  GeneratedStructField,
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
  /** Struct types the scope declares, so a field store can narrow inline. */
  structs?: Record<string, GeneratedStructField[]>;
  /** Classes the device allocates itself, by type: their objects have methods. */
  allocations?: Record<string, { members?: GeneratedDeviceMember[] }>;
  callbacks: GeneratedDeviceCallback[];
  /** Machine-config setter -> delegate member used for driver callbacks. */
  delegates?: Record<string, string>;
  timers: GeneratedDeviceTimer[];
  methods: GeneratedDeviceMethod[];
  /** Entry points that must use direct generated code regardless of shape. */
  hotMethods?: string[];
  /** Source-declared calls that reach another generated component. */
  links?: { call: string }[];
  spaces?: { index: number }[];
  /**
   * This scope is a driver board rather than a device.
   *
   * Board handlers run against the board's own binding tables and its video
   * framework objects, where a name may be bound as a call and a value may be
   * an object rather than a pointer. Device methods were emitted and validated
   * without those rules, so they keep their established forms.
   */
  boardScope?: boolean;
  /** Configured hardware finders cannot resolve through unrelated driver methods. */
  concreteDeviceMembers?: readonly string[];
}

interface EmitContext {
  dereferencedParameters?: Map<string, string>;
  /**
   * Struct-pointer locals only ever set by a plain `=`, each with its pointee
   * read once per assignment: the AY-3-8910's `tone = &m_tone[chan]` is read
   * through a dozen times a sample, five chips at 224 kHz on Gyruss.
   */
  dereferencedLocals?: Map<string, string>;
  /**
   * The element a range-for stands for, read once an iteration: the IR spells
   * the loop variable `__range0[__range0_index]` everywhere it is used, and
   * DISCRETE's per-sample `step_nodes` read each one five times.
   */
  rangeElements?: Map<string, string>;
  /**
   * Temporaries the method declares once, for an expression that has to hold
   * a value between two uses: a postfix `p++`'s previous value, and the object
   * a member call reads twice. Each used to be a closure built per evaluation.
   * Shared with a lambda's context, so the method declares them all.
   */
  temps?: { count: number };
  definition: CodegenScope;
  boardScope: boolean;
  compiled: Set<string>;
  locals: Map<string, string | undefined>;
  /**
   * Locals declared as an array (`int clock_triggered[3] = {1,0,0}`), which
   * hold the array itself for their whole life, so a subscript reads it
   * directly. POKEY's step_one_clock indexes one six times a clock.
   */
  arrayLocals?: Set<string>;
  /**
   * The array locals built from a constant initializer and only ever
   * subscripted, by element type: a plain array whose stores wrap to the
   * element type, as a typed array would. Allocating `new Int32Array` cost
   * POKEY one typed array a clock.
   */
  plainArrayLocals?: Map<string, string>;
  wrappedReferences: Set<string>;
  returnedReference?: string;
  /** See GeneratedDeviceMethod.returnWidth. */
  returnWidth?: 8 | 16 | -8 | -16;
  pointerSafeIndex: boolean;
  typescript: boolean;
  /** The emitted method's own constants, resolved before the scope's. */
  methodConstants?: Record<string, number>;
  /**
   * Members whose binding no method in this scope ever replaces, so the read
   * can be hoisted to one per call instead of one per mention. MAME's Game Boy
   * PPU names `m_line` over a hundred times in its per-dot renderer.
   */
  stableMembers?: ReadonlySet<string>;
  /** Stable members this method actually mentions, in emission order. */
  hoisted?: Set<string>;
  constantTables?: Map<string, string>;
  /** Field-by-field copiers for struct assignment, by function name (structCopier). */
  structCopiers?: Map<string, string>;
  /**
   * Board/host call names this method reaches through `runtime.links`, the
   * per-runtime table of resolved call targets. The board's own `calls`
   * dictionary carries ~1,800 names and V8 keeps it in dictionary mode, so
   * every `runtime.calls["m_vic.phi0_r"]` on the C64's memory path was a hash
   * probe -- a dozen of them per bus access. The links table holds only the
   * names this module uses, stays a fast-mode object, and is rebuilt by the
   * runtime whenever a binding changes.
   */
  links?: Set<string>;
}

interface Target {
  code: string;
  valueType?: string;
  bits?: 1 | 8 | 16 | 32;
  signed?: boolean;
  /** A field `+=` steps as a pointer would: its type is one, or unknown. */
  pointerArithmetic?: boolean;
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
): { source: string; methods: string[]; links: string[] } {
  definition = {
    ...definition,
    methods: definition.methods.map(method => ({
      ...method,
      program: { ...method.program, operations: withoutDeadBranches(method.program.operations) },
    })),
  };
  const methodCounts = new Map<string, number>();
  for (const method of definition.methods) {
    methodCounts.set(method.name, (methodCounts.get(method.name) ?? 0) + 1);
  }
  const overloaded = new Set(
    [...methodCounts].filter(([, count]) => count > 1).map(([name]) => name),
  );
  const methodsByName = new Map(definition.methods.map(method => [method.name, method]));
  // A method a member-function-pointer table names: CALL_METHOD reaches it
  // by that name, out of sight of the static call graph. The 6800's opcode
  // handlers are its `m_insn` table and run once per instruction.
  const tableMethods = new Set<string>();
  const collectNames = (value: unknown): void => {
    if (typeof value === 'string') { if (methodsByName.has(value)) tableMethods.add(value); }
    else if (Array.isArray(value)) value.forEach(collectNames);
    else if (value && typeof value === 'object') Object.values(value).forEach(collectNames);
  };
  for (const member of (definition as { members?: { values?: unknown; initialValue?: unknown }[] }).members ?? []) {
    collectNames(member.values);
    collectNames(member.initialValue);
  }
  const roots = definition.methods.filter(method =>
    !overloaded.has(method.name) &&
    method.program.diagnostics.length === 0 &&
    (
      definition.hotMethods?.includes(method.name) ||
      tableMethods.has(method.name) ||
      definition.timers.some(timer => timer.callback === method.name) ||
      // A bus entry point: MAME spells a memory handler's address as `offs_t`,
      // and a processor calls one once per access. These carry no loop for the
      // shape rules below to notice, so the ColecoVision's Z80 drove every VDP
      // port write through the interpreter -- 41% of a frame at 33 fps.
      isBusEntryPoint(method) ||
      isLineEntryPoint(method) ||
      (!definition.boardScope && isAccessor(method, methodsByName)) ||
      // device_execute_interface entry points run every device clock, even
      // when their loop only calls helpers and has no switch of its own.
      method.name === 'execute_run' ||
      // Every input-line change a processor sees (IRQs, NMI, a 6801's IS3).
      method.name === 'execute_set_input' ||
      isStreamRenderer(method) ||
      installsLambda(method.program.operations) ||
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
  // A call to a method that stays interpreted goes through runtime.invoke,
  // which hands it values. That is only wrong when the callee writes through
  // a reference parameter, or hands one back, because the write then lands in
  // a copy -- so only such a callee keeps its callers interpreted. Any other
  // left the caller interpreted for nothing: the T-Unit's dma_w, which starts
  // every blit, stayed interpreted because it may call log_bitmap, a debug
  // PNG dump behind a flag that is never set.
  const losesWrites = (name: string): boolean => {
    const target = definition.methods.find(candidate => candidate.name === name);
    if (!target) return true;
    const parameters = tryParseParameters(target.parameters);
    if (!parameters) return true;
    return Boolean(singleReturnedReference(target)) || parameters.some(parameter =>
      isMutableReference(parameter.valueType) && assignsIdentifier(target.program.operations, parameter.name));
  };
  let changed = true;
  while (changed) {
    changed = false;
    for (const method of selected) {
      if (!supportedNames.has(method.name)) continue;
      const hasUnsupportedDependency = [...calledIdentifiers(method.program.operations)]
        .some(name => compiled.has(name) && !supportedNames.has(name) && losesWrites(name));
      if (hasUnsupportedDependency) {
        supportedNames.delete(method.name);
        changed = true;
      }
    }
  }
  const supported = selected.filter(method => supportedNames.has(method.name));

  // A root may only call another compiled method directly when that dependency
  // also passed validation. Other calls retain the interpreter fallback.
  const constantTables = new Map<string, string>();
  const links = new Set<string>();
  const structCopiers = new Map<string, string>();
  const functions = supported.map(method => {
    try {
      return emitMethod(definition, method, supportedNames, typescript, constantTables, links, structCopiers);
    } catch (error) {
      throw new Error(`${(definition as { type?: string }).type ?? "device"}.${method.name}: ${(error as Error).message}`, { cause: error });
    }
  }).join('\n\n');
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
  // std::min and std::max as <algorithm> defines them: the first argument
  // unless the second compares less (or greater). Math.min answers NaN for a
  // NaN argument where C++ answers the other one -- DISCRETE's RC integrator
  // clamps a 0/0 that way on every discharging sample.
  const operand = typescript ? ': number' : '';
  const source = `(() => {
  const cppMin = (a${operand}, b${operand}) => (b < a ? b : a);
  const cppMax = (a${operand}, b${operand}) => (a < b ? b : a);
  const cppStringText = (value${typescript ? ': unknown' : ''}) => typeof value === 'string' ? value
    : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
    : value === undefined || value === null ? '' : String(value);
${[...constantTables].map(([values, name]) => `  const ${name} = [${values}];`).join('\n')}
${[...structCopiers.values()].join('\n')}
${functions}
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable${typescript ? ': Record<string, any>' : ''} = {
    ${entries}
  };
  return __methodTable;
})()`;
  return { source, methods: [...supportedNames], links: [...links].sort() };
}

/**
 * The program as it can run: a branch whose condition is a constant is the
 * only branch. MAME guards its debug blocks with preprocessor flags the IR
 * already folds to numbers -- the T-Unit's dma_w tests `LOG_DMA ||
 * DEBUG_MIDTUNIT_BLITTER`, `0 || 0`, before asking `machine().input()` for a
 * debug key -- and a call this emitter cannot spell inside such a branch kept
 * the whole method, the one that starts every blit, interpreted. The taken
 * branch stays a block of its own so its locals keep their C++ scope. The
 * interpreter keeps the original program; it never enters the dead branch.
 */
function withoutDeadBranches(operations: GeneratedHandlerOperation[]): GeneratedHandlerOperation[] {
  let changed = false;
  const pruned = operations.flatMap(operation => {
    let next = operation;
    if (operation.op === 'if') {
      const decided = constantCondition(operation.condition);
      if (decided !== undefined) {
        changed = true;
        const taken = decided ? operation.then : operation.else;
        return taken?.length
          ? [{ op: 'if' as const, condition: { kind: 'number' as const, value: 1 }, then: withoutDeadBranches(taken) }]
          : [];
      }
    }
    // Every nested body, whatever the operation calls it (then/else, a loop's
    // body, a switch's cases).
    const copy: Record<string, unknown> = { ...operation };
    for (const [key, value] of Object.entries(operation)) {
      if (Array.isArray(value) && value.length && value.every(item => item && typeof item === 'object' && 'op' in item)) {
        const inner = withoutDeadBranches(value as GeneratedHandlerOperation[]);
        if (inner !== value) { copy[key] = inner; changed = true; }
      } else if (Array.isArray(value) && value.some(item => item && typeof item === 'object' && Array.isArray((item as { body?: unknown }).body))) {
        copy[key] = value.map(item => {
          const body = (item as { body?: unknown }).body;
          if (!Array.isArray(body)) return item;
          const inner = withoutDeadBranches(body as GeneratedHandlerOperation[]);
          if (inner === body) return item;
          changed = true;
          return { ...(item as object), body: inner };
        });
      }
    }
    next = copy as GeneratedHandlerOperation;
    return [next];
  });
  return changed ? pruned : operations;
}

/** A condition made only of literals, folded as C++ does; undefined otherwise. */
function constantCondition(expression: GeneratedExpression): number | undefined {
  if (expression.kind === 'number') return expression.value;
  if (expression.kind === 'unary') {
    const value = constantCondition(expression.operand);
    if (value === undefined) return undefined;
    return expression.operator === '!' ? (value ? 0 : 1)
      : expression.operator === '-' ? -value
        : expression.operator === '~' ? ~value : undefined;
  }
  if (expression.kind === 'binary') {
    const left = constantCondition(expression.left);
    const right = constantCondition(expression.right);
    if (left === undefined || right === undefined) return undefined;
    switch (expression.operator) {
      case '||': return left || right ? 1 : 0;
      case '&&': return left && right ? 1 : 0;
      case '==': return left === right ? 1 : 0;
      case '!=': return left !== right ? 1 : 0;
      case '<': return left < right ? 1 : 0;
      case '<=': return left <= right ? 1 : 0;
      case '>': return left > right ? 1 : 0;
      case '>=': return left >= right ? 1 : 0;
      case '|': return left | right;
      case '&': return left & right;
      default: return undefined;
    }
  }
  return undefined;
}

/**
 * Whether the method hands a lambda to an address-space install call
 * (`install_readwrite_tap`, `install_read_handler`, ...). The lambda is then
 * a handler the bus runs on every access: the slapstic's tap decodes all of
 * the 68010's, and created by the interpreter it was interpreted each time.
 */
function installsLambda(operations: GeneratedHandlerOperation[]): boolean {
  let found = false;
  visitOperations(operations, operation => {
    visitOperationExpressions(operation, expression => {
      if (expression.kind !== 'call') return;
      const callee = expression.callee.kind === 'member' ? expression.callee.property
        : expression.callee.kind === 'identifier' ? expression.callee.name : '';
      if (/^install_\w+$/.test(callee) && expression.args.some(argument => argument.kind === 'lambda')) found = true;
    });
  });
  return found;
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
  coreModule = '../../core/generated-device.js',
): string {
  const assignments = generatedDeviceAssignments(definition, 'definition').join('\n');
  return `// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '${coreModule}';
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
  if (emitted.links.length) {
    assignments.push(`${target}.compiledMethodLinks = ${JSON.stringify(emitted.links)};`);
  }
  // A card shipped as its own module is imported when a machine selects it.
  const cardModules = [...new Set(Object.values(definition.slot?.cards ?? {}))];
  if (cardModules.length) {
    assignments.push(`${target}.slot!.loadCard = {\n${cardModules
      .map(module => `  ${JSON.stringify(module)}: () => import(${JSON.stringify(`./${module}.js`)}),`)
      .join('\n')}\n};`);
  }
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
  for (const [index, format] of (definition.imageFormats ?? []).entries()) {
    assignments.push(...generatedDeviceAssignments(format.definition,
      `${target}.imageFormats![${index}]!.definition`));
  }
  // A floppy drive's formats build a whole disk's flux at mount; interpreted,
  // a D64 took seven seconds.
  for (const [index, format] of (definition.floppyFormats ?? []).entries()) {
    assignments.push(...generatedDeviceAssignments(format.definition,
      `${target}.floppyFormats![${index}]!.definition`));
  }
  if (definition.floppyImage) {
    assignments.push(...generatedDeviceAssignments(definition.floppyImage, `${target}.floppyImage!`));
  }
  // An object the device allocates (`new daisy_entry(device)`) is a small
  // helper whose methods the device's own loops call: the IEC bus steps its
  // daisy list with `entry->next()` on every line read, three thousand times
  // a frame while a 1541 loads. Every method of it is an entry point.
  for (const [name, allocated] of Object.entries(definition.allocations ?? {})) {
    assignments.push(...generatedDeviceAssignments(
      { ...allocated, hotMethods: allocated.methods.map(method => method.name) },
      `${target}.allocations![${JSON.stringify(name)}]!`,
    ));
  }
  const structs = generatedStructMethodsSources(definition);
  if (Object.keys(structs).length) {
    assignments.push(`${target}.compiledStructMethods = {\n${Object.entries(structs)
      .map(([type, source]) => `  ${JSON.stringify(type)}: ${source} as GeneratedDeviceMethodMap,`).join('\n')}\n};`);
  }
  return assignments;
}

/**
 * The inline methods of each struct the device declares, emitted as a
 * device's methods are, with the struct's fields as the members they run on:
 * ymfm's `ymfm_output::clear()` and `roundtrip_fp()` run once a sample. A
 * struct the device also allocates is emitted with its allocation instead.
 */
export function generatedStructMethodsSources(definition: GeneratedDeviceDefinition, typed = true): Record<string, string> {
  const sources: Record<string, string> = {};
  for (const [type, methods] of Object.entries(definition.structMethods ?? {})) {
    if (definition.allocations?.[type] || !methods.length) continue;
    // An overloaded method is left to the interpreter, which picks by arguments.
    const single = methods.filter(method => methods.filter(other => other.name === method.name).length === 1 &&
      !method.program.diagnostics.length);
    if (!single.length) continue;
    const fields = definition.structs?.[type] ?? [];
    const scope = {
      ...definition,
      type,
      className: type,
      // The device's free functions the methods call (`ymfm::roundtrip_fp`)
      // come along by name; only the struct's own methods are entry points.
      methods: [
        ...single.map(method => ({ ...method, source: { file: '', line: 0 } })),
        ...definition.methods.filter(method => !single.some(own => own.name === method.name)),
      ],
      members: fields.map(field => ({
        name: field.name,
        valueType: field.valueType ?? `${field.signed === false ? 'u' : ''}int${field.bits ?? 32}_t`,
        ...(field.length ? { arrayLength: field.length } : {}),
      })),
      hotMethods: single.map(method => method.name),
      allocations: undefined,
      children: undefined,
    } as unknown as GeneratedDeviceDefinition;
    // Emitting is the fast path only; the interpreter runs the same methods.
    // A struct whose scope pulls in a device method that cannot run on the
    // struct's fields (atarimo's `set_config`, `static_cast<...&>(*this) =
    // config`, beside its sprite_parameter) stays interpreted.
    let emitted: ReturnType<typeof generatedDeviceMethodsSource>;
    try {
      emitted = generatedDeviceMethodsSource(scope, typed);
    } catch {
      continue;
    }
    if (emitted.methods.length) sources[type] = emitted.source;
  }
  return sources;
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

/** Whether evaluating the expression could call or assign anything. */
function hasCall(expression: GeneratedExpression): boolean {
  if (expression.kind === 'call' || expression.kind === 'assignment' || expression.kind === 'lambda') return true;
  return Object.values(expression).some(value =>
    Array.isArray(value)
      ? value.some(item => item && typeof item === 'object' && 'kind' in item && hasCall(item as GeneratedExpression))
      : value && typeof value === 'object' && 'kind' in value && hasCall(value as GeneratedExpression));
}

export function calledIdentifiers(operations: GeneratedHandlerOperation[]): Set<string> {
  const names = new Set<string>();
  // An assignment to a call's result runs that method's `name=` (the
  // compiler's setter for a reference-returning method: the 6809's regop8).
  const assigned = (target: GeneratedExpression) => {
    if (target.kind === 'call' && target.callee.kind === 'identifier') names.add(`${target.callee.name}=`);
  };
  visitOperations(operations, operation => {
    if (operation.op === 'assign') assigned(operation.target);
    visitOperationExpressions(operation, expression => {
      if (expression.kind === 'call' && expression.callee.kind === 'identifier') {
        names.add(expression.callee.name);
      }
      if (expression.kind === 'assignment') assigned(expression.target);
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
/**
 * MAME `device_sound_interface::sound_stream_update`.
 *
 * A chip's stream renderer loops once per output sample and runs for every
 * sample the machine plays -- forty-eight thousand a second, four channels
 * deep on the Game Boy. Its shape hides that: one loop and no switch, which
 * is under the bar the rules below draw, so it stayed on the interpreter
 * along with the small helper it calls to convert each level.
 *
 * The name is MAME's, declared by the sound interface every such device
 * implements, so it identifies the entry point the way `offs_t offset`
 * identifies a bus handler.
 */
function isStreamRenderer(method: GeneratedDeviceMethod): boolean {
  return method.name === 'sound_stream_update';
}

function isBusEntryPoint(method: GeneratedDeviceMethod): boolean {
  const first = method.parameters.split(',')[0]?.trim() ?? '';
  // MAME's handlers take the address first and call it `offset`, always. The
  // NAME is the discriminator, not the arity: a ColecoVision cartridge's
  // `read(offs_t offset, int _8000, int _a000, int _c000, int _e000)` carries
  // four chip selects besides the address -- and runs on every instruction
  // fetch, because the game code lives in cartridge ROM.
  return /^offs_t\s+offset$/.test(first);
}

/**
 * A line handler, MAME's other hardware entry point: devcb drives a write-line
 * with `int state` on every edge and polls a read-line, which takes nothing and
 * is named `*_r`. Like a bus handler it has no loop for the shape rules to
 * notice, and the 1541's gate array raises BYTE READY on its VIA's `write_ca1`
 * six thousand times a frame while a disk loads.
 */
function isLineEntryPoint(method: GeneratedDeviceMethod): boolean {
  const parameters = method.parameters.trim();
  return /^int\s+state$/.test(parameters) || (parameters === '' && /_r$/.test(method.name));
}

/**
 * An accessor: MAME's inline header getters and setters, a getter being one
 * `return` with no parameters (`int get_draw_phase() { return m_draw_phase; }`)
 * and a setter one statement over its single parameter (`void
 * set_open_bus(uint8_t val) { m_open_bus = val; }`), neither looping or
 * calling the device's own methods. Another device calls them, so nothing
 * local marks them hot, and interpreted each one cost an overload search and
 * a program walk: the MMC5 asks its PPU for the draw phase on every CHR and
 * nametable fetch, thirty thousand times a frame. A driver's own handlers are
 * not roots this way: the board selects those by how it wires them.
 */
function isAccessor(method: GeneratedDeviceMethod, methodsByName: Map<string, GeneratedDeviceMethod>): boolean {
  const operations = method.program.operations;
  if (operations.length !== 1 || maximumLoopDepth(operations) !== 0) return false;
  if ([...calledIdentifiers(operations)].some(name => methodsByName.has(name))) return false;
  const parameters = tryParseParameters(method.parameters);
  if (!parameters) return false;
  if (parameters.length === 0) return operations[0]!.op === 'return';
  return parameters.length === 1 && usesIdentifier(operations, parameters[0]!.name);
}

export function supportsMethod(
  method: GeneratedDeviceMethod,
  definition: CodegenScope,
  compiled: Set<string>,
  onUnsupported?: (expression: GeneratedExpression) => void,
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
  const addressOnly = addressOnlyLocals(method.program.operations, locals);
  const scalarLocals = integerScalarLocals(method.program.operations);
  // The receiver of a bound framework chain is never emitted on its own.
  const chainReceivers = new Set<GeneratedExpression>();
  visitOperations(method.program.operations, operation => {
    visitOperationExpressions(operation, expression => {
      if (expression.kind === 'call' && expression.callee.kind === 'member' &&
          videoFrameworkChainName(expression, definition)) chainReceivers.add(expression.callee.object);
    });
  });
  let supported = true;
  visitOperations(method.program.operations, operation => {
    visitOperationExpressions(operation, expression => {
      if (!supported || chainReceivers.has(expression)) return;
      if (expression.kind === 'identifier') {
        // A constant written with its declaring class (`lr35902_cpu_device::
        // VBL_INT`) is recorded under its leaf name, and `emitExpression`
        // resolves both spellings. Declining the qualified one left the Game
        // Boy PPU's whole state machine interpreted for the sake of one enum.
        supported = locals.has(expression.name) ||
          members.has(expression.name) ||
          constants.has(expression.name) ||
          (expression.name.includes('::') && DEFAULT_CONSTANTS[expression.name] !== undefined) ||
          constants.has(expression.name.split('::').at(-1)!) ||
          compiled.has(expression.name) ||
          callees.has(expression.name) ||
          ['true', 'false', 'nullptr', 'this', 'g_profiler',
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
          // `&m_APU.tri`: a struct field that is itself a struct, whose
          // address is that object (the RP2A03's APU hands each channel to
          // its own routine this way; declined, the APU's whole sample loop
          // ran interpreted, 1.79 million samples a second).
          (expression.operand.kind === 'member' && structFieldIsStruct(expression.operand, definition)) ||
          (
            expression.operand.kind === 'call' &&
            expression.operand.callee.kind === 'member'
          ) ||
          // `&regop16()`: a compiled method answering an object (a PAIR16
          // register) by reference, whose address is that object
          // (runtime.objectAddress). The 6809's stack choice compares it.
          (
            expression.operand.kind === 'call' &&
            expression.operand.callee.kind === 'identifier' &&
            compiled.has(expression.operand.callee.name)
          ) ||
          (
            expression.operand.kind === 'identifier' &&
            (
              structMemberNames(definition).has(expression.operand.name) ||
              compiled.has(expression.operand.name) ||
              // `&m_value`: a pointer to one scalar slot, emitted as the
              // interpreter builds it -- a pointer whose target is the slot's
              // get/set pair. The cassette hands `get_sample` its `m_value`
              // this way, and declining it left the tape transport
              // interpreted at two thousand calls a frame. Members only: a
              // local's address (`k053247_get_ram(&dst)`) feeds pointer
              // arithmetic whose emitted form does not yet match the
              // interpreter -- The Simpsons' sprite DMA compiled that way and
              // its attract drifted from the golden.
              members.has(expression.operand.name) ||
              // `&sx` on a local every declaration types as an integer
              // scalar: the same get/set pointer as `&m_value`, narrowed by
              // the local's declared width. MAME's out-parameter idiom --
              // Taito SJ's `get_sprite_xy(which, &sx, &sy)` -- is how its
              // sprite and collision loops read each sprite's position, and
              // declining it left them interpreted every frame. A pointer
              // local (`&dst` above) is still declined.
              scalarLocals.has(expression.operand.name) ||
              // A local whose address is all the method ever uses: what the
              // callee does through it no emitted code here can observe, and
              // the callee is handed the same lvalue-backed pointer the
              // interpreter would build. The CBM tape format's fill_wave hands
              // `&p` to the sample writer this way, and declining it ran a
              // tape's whole PCM conversion -- a second and more -- through
              // interpreted get/set closures, one pair per sample.
              addressOnly.has(expression.operand.name)
            )
          );
      } else if (expression.kind === 'binary') {
        supported = SAFE_BINARY_OPERATORS.has(expression.operator);
      } else if (expression.kind === 'call' && expression.callee.kind === 'identifier') {
        // Unknown source macros/callbacks are dispatched through runtime.invoke;
        // generated methods and primitive casts remain direct calls.
        supported = true;
      } else if (expression.kind === 'call' && expression.callee.kind === 'index') {
        supported = true;
      } else if (schedulerSynchronize(expression)) {
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
          // device_gfx_interface::gfx(index) is a host-bound object lookup;
          // calls on the returned gfx_element are safe value-method calls.
          inner.callee.name === 'gfx' ||
          // A board answers `memregion(tag)` and `ioport(tag)` with objects
          // from the call table emitted code reads (its referenceCalls are
          // flattened into it), so `memregion("maincpu")->base()` resolves the
          // same either way. Declining it left Exidy's background interpreted.
          (definition.boardScope && (inner.callee.name === 'memregion' || inner.callee.name === 'ioport')) ||
          (inner.callee.name === 'space' && Boolean(definition.spaces?.length)) ||
          definition.methods.some(candidate => candidate.name ===
            (inner.callee as { name: string }).name);
      }
      if (!supported) onUnsupported?.(expression);
    });
  });
  return supported;
}

function emitMethod(
  definition: CodegenScope,
  method: GeneratedDeviceMethod,
  compiled: Set<string>,
  typescript: boolean,
  constantTables: Map<string, string>,
  links: Set<string>,
  structCopiers?: Map<string, string>,
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
    returnWidth: method.returnWidth,
    // Board handlers build pointers into share memory as locals
    // (`uint8_t *spriteram = m_galaga_ram1 + 0x380`), and indexing one of
    // those with a plain subscript reads a property off the pointer object
    // rather than the memory behind it.
    pointerSafeIndex: Boolean(definition.hotMethods?.length) ||
      Boolean(definition.boardScope),
    stableMembers: stableMemberNames(definition),
    hoisted: new Set<string>(),
    boardScope: Boolean(definition.boardScope),
    typescript,
    methodConstants: method.constants,
    constantTables,
    structCopiers,
    links: new Set<string>(),
    temps: { count: 0 },
  };
  context.dereferencedParameters = new Map(parameters.filter(parameter =>
    parameter.valueType.includes('*') &&
    Boolean(definition.structs?.[parameter.valueType.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim()]) &&
    !assignsIdentifier(method.program.operations, parameter.name))
    .map(parameter => [parameter.name, `__pointee_${safeName(parameter.name)}`]));
  collectLocals(method.program.operations, context);
  context.dereferencedLocals = new Map([...context.locals].filter(([name, valueType]) =>
    !parameters.some(parameter => parameter.name === name) && Boolean(valueType?.includes('*')) &&
    Boolean(definition.structs?.[valueType!.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim()]) &&
    plainlyAssigned(method.program.operations, name))
    .map(([name]) => [name, `__pointee_${safeName(name)}`]));
  const annotation = typescript ? ': any' : '';
  // A C++ default argument stands in when an emitted caller leaves it out,
  // as the interpreter's own defaults do (see cppDefaultArgument).
  const declared = method.parameters.trim() === 'void' ? [] : method.parameters.split(',');
  const args = parameters.map((parameter, index) => {
    const fallback = cppDefaultArgument(declared[index] ?? '');
    return `${localName(parameter.name)}${annotation}${fallback === undefined ? '' : ` = ${fallback}`}`;
  }).join(', ');
  const returned = returnedReference ? `\n    return ${localName(returnedReference)};` : '';
  // Emitted first, read once: the body below refers to these by their local.
  const body = emitOperations(method.program.operations, context, 4);
  const hoisted = [...(context.hoisted ?? [])]
    .map(name =>
      `    const ${hoistedName(name)} = members.${name} ?? ` +
      (context.boardScope ? `runtime.member(${JSON.stringify(name)});` : '0;'))
    .join('\n');
  // Only a method that calls out fetches the links table, and it falls back
  // to the raw calls dictionary for a runtime that carries none (a test
  // harness, or an older host), so the emitted code never depends on it.
  for (const name of context.links ?? []) links.add(name);
  const linked = context.links?.size ? '\n    const __l = runtime.links ?? runtime.calls;' : '';
  const temps = context.temps?.count
    ? `\n    let ${Array.from({ length: context.temps.count }, (_unused, index) => `__t${index}${annotation}`).join(', ')};`
    : '';
  const emitted = `  function method_${safeName(method.name)}(runtime${annotation}${args ? `, ${args}` : ''})${annotation} {
    const members = runtime.members;${linked}${temps}
${[...context.dereferencedParameters!].map(([parameter, name]) => `    const ${name} = runtime.dereference(${localName(parameter)});`).join('\n')}
${hoisted}${hoisted ? '\n' : ''}${body}${returned}
  }`;
  // `*p` through a copy of its own: V8 keeps one feedback vector a function,
  // so a single shared dereference saw every object shape of every method
  // and probed each megamorphically (a quarter of DISCRETE's time). This one
  // sees only this method's pointers; any other shape still goes to the host.
  // `p + n` the same way: DISCRETE steps every buffer pointer each sample.
  let source = emitted;
  let helpers = '';
  if (source.includes('runtime.add(')) {
    const add = `__add_${safeName(method.name)}`;
    source = source.replaceAll('runtime.add(', `${add}(runtime, `);
    helpers += `
  function ${add}(runtime${annotation}, a${annotation}, b${annotation})${annotation} {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }`;
  }
  if (source.includes('runtime.addressOf(')) {
    const address = `__addr_${safeName(method.name)}`;
    source = source.replaceAll('runtime.addressOf(', `${address}(runtime, `);
    helpers += `
  function ${address}(runtime${annotation}, v${annotation}, i${annotation})${annotation} {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }`;
  }
  if (!source.includes('runtime.dereference(')) return `${source}${helpers}`;
  const helper = `__deref_${safeName(method.name)}`;
  return `${source.replaceAll('runtime.dereference(', `${helper}(runtime, `)}${helpers}
  function ${helper}(runtime${annotation}, p${annotation})${annotation} {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
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
    const allocated = allocatesAggregate(operation.value);
    // `rectangle draw = cliprect` is a C++ value copy. Aliasing it lets a
    // handler narrow its own clip rectangle and hand the mutated one back to
    // its caller — the interpreter copies here for exactly that reason.
    const declared = operation.valueType?.replace(/\bconst\b/g, '').trim();
    // An array of them (`rectangle bsides[4] = {...}`) is built fresh, and
    // copying it as an object would drop its length. The value is evaluated
    // once: it may be a call (`get_screen_area()`).
    if (context.boardScope && declared === 'rectangle' && !allocated) {
      return `${pad}let ${localName(operation.name)}${annotation} = ` +
        `((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(${value});`;
    }
    const pointee = context.dereferencedLocals?.get(operation.name);
    // A local of more than one dimension, or an array of pointers, is built
    // as the interpreter builds it (allocateLocalArray in ir/execute.ts).
    const extents = operation.value?.kind === 'call' && operation.value.callee.kind === 'identifier' &&
      operation.value.callee.name === 'ALLOC' ? operation.value.args : [];
    if (extents.length > 1 || (extents.length && declared?.endsWith('*'))) {
      const rows = (level: number): string => {
        const length = `Math.max(0, Math.trunc(Number(${emitExpression(extents[level]!, context)})))`;
        if (level < extents.length - 1) return `Array.from({ length: ${length} }, () => ${rows(level + 1)})`;
        return declared?.endsWith('*')
          ? `new Array(${length}).fill(0)`
          : wrapAllocatedArray(`new Uint8Array(${length})`, operation.valueType);
      };
      return `${pad}let ${localName(operation.name)}${annotation} = ${rows(0)};`;
    }
    // A local array of a class the host constructs (`rectangle areas[32]`):
    // that many default-built objects, as the interpreter's classArray.
    if (allocated && context.boardScope && extents.length === 1 && declared && /^[A-Za-z_]\w*$/.test(declared) &&
        wrapAllocatedArray('x', operation.valueType) === 'x' && !/^(?:u?int\d+_t|[us]\d+|u?char|bool|char|offs_t|pen_t|rgb_t)$/.test(declared)) {
      const link = callLink(context, declared);
      return `${pad}let ${localName(operation.name)}${annotation} = typeof ${link} === 'function' ? ` +
        `Array.from({ length: Math.max(0, Math.trunc(Number(${emitExpression(extents[0]!, context)}))) }, () => ${link}(0, 0, 0, 0)) : ${value};`;
    }
    return `${pad}let ${localName(operation.name)}${annotation} = ${
      allocated
        ? (context.plainArrayLocals?.has(operation.name) ||
            // A braced list of pointers is an array of pointers: System 1's
            // `const u16 *const bgbase[2] = { &a->pix(y), &b->pix(y) }`. A
            // Uint16Array of them held two NaNs.
            (operation.value?.kind === 'call' && operation.value.callee.kind === 'identifier' &&
              operation.value.callee.name === 'ARRAY' && /\*\s*$/.test(operation.valueType ?? ''))
          ? value
          : wrapAllocatedArray(value, operation.valueType))
        // `rectangle adjusted = cliprect;` is a copy the body may move
        // (sprite.h's draw_async offsets it), not the caller's own.
        : operation.valueType?.replace(/\bconst\b/g, '').trim() === 'rectangle' && operation.value?.kind !== 'call'
          ? copiedValue(value)
          : wrapType(value, operation.valueType)
    };${pointee ? ` let ${pointee}${annotation} = runtime.dereference(${localName(operation.name)});` : ''}`;
  }
  if (operation.op === 'assign') {
    // `static_cast<base &>(*this) = config`: each field of the base the
    // object inherits is assigned as its own member would be.
    if (operation.target.kind === 'cast' && isThisDereference(operation.target.operand) && operation.operator === '=') {
      const value = emitExpression(operation.value, context);
      // The source's own struct names the fields: `config` is a
      // `const atari_motion_objects_config &`.
      const sourceType = expressionValueType(operation.value, context)
        ?.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim();
      const names = (sourceType ? context.definition.structs?.[sourceType] : undefined)?.map(field => field.name) ?? [];
      if (!names.length) throw new Error(`device codegen cannot copy a base subobject of unknown type "${sourceType}"`);
      const inner: EmitContext = { ...context, locals: new Map([...context.locals, ['__base', sourceType ?? '']]) };
      const fields = names.map(name => `${pad}  ` + `${emitAssignment({ kind: 'identifier', name }, '=',
        { kind: 'member', object: { kind: 'identifier', name: '__base' }, property: name }, inner)};`);
      return `${pad}{\n${pad}  const __base = ${value};\n${fields.join('\n')}\n${pad}}`;
    }
    const pointee = operation.target.kind === 'identifier' ? context.dereferencedLocals?.get(operation.target.name) : undefined;
    return `${pad}${emitAssignment(operation.target, operation.operator, operation.value, context)};` +
      (pointee ? ` ${pointee} = runtime.dereference(${localName((operation.target as { name: string }).name)});` : '');
  }
  if (operation.op === 'call') {
    const callee = operation.expression.kind === 'call' && operation.expression.callee.kind === 'identifier'
      ? operation.expression.callee.name : undefined;
    // Its arguments are names or values with no effect of their own (a PC,
    // a register): nothing is left to evaluate.
    if (callee && !context.compiled.has(callee) && isNoEffectStatement(callee) &&
        operation.expression.kind === 'call' && operation.expression.args.every(argument => !hasCall(argument))) {
      return `${pad}/* ${callee}: no effect */`;
    }
    return `${pad}${emitExpression(operation.expression, context)};`;
  }
  if (operation.op === 'return') {
    if (!operation.value) return `${pad}return;`;
    const value = emitExpression(operation.value, context);
    const width = context.returnWidth;
    return `${pad}return ${width === 8 ? `((${value}) & 0xff)`
      : width === 16 ? `((${value}) & 0xffff)`
        : width === -8 ? `((${value}) << 24 >> 24)`
          : width === -16 ? `((${value}) << 16 >> 16)` : value};`;
  }
  if (operation.op === 'break') return `${pad}break;`;
  if (operation.op === 'continue') return `${pad}continue;`;
  if (operation.op === 'if') {
    const condition = emitExpression(operation.condition, context);
    const lines = [
      `${pad}if (${operation.condition.kind === 'string' ? `Boolean(${condition})` : condition}) {`,
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
    const range = rangeLoopElement(operation);
    if (range) {
      const element = `${localName(range.sequence)}_item`;
      const read = emitExpression(range.element, context);
      const previous = context.rangeElements?.get(range.sequence);
      (context.rangeElements ??= new Map()).set(range.sequence, element);
      const body = emitOperations(operation.body, context, indentation + 2);
      if (previous === undefined) context.rangeElements.delete(range.sequence);
      else context.rangeElements.set(range.sequence, previous);
      const initialize = operation.initialize
        .map(item => emitOperation(item, context, 0).trim().replace(/;$/, ''))
        .map((part, index) => index > 0 && part.startsWith('let ') ? part.slice(4) : part)
        .join(', ');
      const iterate = operation.iterate
        .map(item => emitOperation(item, context, 0).trim().replace(/;$/, ''))
        .join(', ');
      return [
        `${pad}for (${initialize}; ${emitExpression(operation.condition, context)}; ${iterate}) {`,
        `${pad}  const ${element}${context.typescript ? ': any' : ''} = ${read};`,
        body,
        `${pad}}`,
      ].filter(Boolean).join('\n');
    }
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
  // A specialised template switches on a constant (`switch (M)` becomes
  // `switch (1)` for addr_mode::DI), which C++ allows and TypeScript rejects
  // case by case; the discriminant is a number either way.
  const discriminant = emitExpression(operation.expression, context);
  const lines = [`${pad}switch (${context.typescript ? `(${discriminant} as number)` : discriminant}) {`];
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
/**
 * A source-resolved const scalar's value: it cannot change after
 * construction, so it is emitted as the number it is.
 */
function constMemberValue(name: string, context: EmitContext): number | undefined {
  if (!context.stableMembers?.has(name) || context.boardScope) return undefined;
  const member = context.definition.members.find(candidate => candidate.name === name);
  return member?.bits && member.initial !== undefined && /\bconst\b/.test(member.valueType) &&
    !member.valueType.includes('*')
    ? member.initial
    : undefined;
}

function memberValue(name: string, context?: EmitContext): string {
  if (context?.stableMembers?.has(name)) {
    // Specialising chip variants here lets the JS compiler remove their
    // unused timing/rendering branches instead of testing them every dot.
    const constant = constMemberValue(name, context);
    if (constant !== undefined) return String(constant);
    context.hoisted?.add(name);
    return hoistedName(name);
  }
  // A name that is not a JS identifier (an unresolved `cls::CONST`) is a
  // quoted key: emitted bare it was a syntax error that failed the whole
  // build rather than one lookup.
  const key = /^[A-Za-z_$][\w$]*$/.test(name) ? `.${name}` : `[${JSON.stringify(name)}]`;
  // A device declares every member up front, and its runtime answers an
  // absent one with 0 (generated-device.ts), so the fallback is that constant
  // rather than a call spelled at every read. The difference is bytecode, and
  // bytecode is what decides whether V8 inlines a method: the CIA's
  // update_pb, sixteen member reads long, was 515 bytes against a limit of
  // 460.
  if (context && !context.boardScope) return `(members${key} ?? 0)`;
  return `(members${key} ?? runtime.member(${JSON.stringify(name)}))`;
}

/** The per-call local a stable member read is hoisted into. */
function hoistedName(name: string): string {
  return `h_${safeName(name)}`;
}

/**
 * Members no method in this scope rebinds.
 *
 * An emitted method reads `members.x ?? runtime.member("x")` at every mention,
 * and MAME's per-dot renderers mention the same struct dozens of times. The
 * read is only safe to hoist when nothing can replace the binding underneath
 * it: an assignment to the bare name, or an indexed write, which
 * `runtime.writableMember` may materialise into a fresh array. Mutating the
 * object a member already points at is not a rebind and does not disqualify it.
 */
function stableMemberNames(definition: CodegenScope): Set<string> {
  const rebound = new Set<string>();
  // `cur_live = checkpoint_live` on a struct member copies fields into the
  // object the member already holds (runtime.copyStruct), so the binding
  // stays put. The 64H156 does it at every rollback, and counting it as a
  // rebind left every field of its per-cycle loop behind a member lookup.
  // Exactly the members emitAssignment copies into (fields, not an array or a
  // pointer); an attotime member is a plain store and does rebind.
  const structs = new Set(definition.members
    .filter(member => member.fields && !member.arrayLength && !member.valueType.includes('*'))
    .map(member => member.name));
  // A device's fixed C arrays exist before any of its methods run, and an
  // indexed write stores straight into one (isDirectArray), so it never
  // rebinds: the VIC-II clears its 1,024-byte sprite collision buffer every
  // raster line, and re-reading the member at each of those stores was 4% of
  // a C64 frame. A board materialises its arrays on first write instead.
  const fixedArrays = new Set(definition.boardScope ? [] : definition.members
    .filter(member => member.arrayLength !== undefined)
    .map(member => member.name));
  for (const method of definition.methods) {
    visitOperations(method.program.operations, operation => {
      if (operation.op !== 'assign') return;
      if (operation.operator === '=' && operation.target.kind === 'identifier' && structs.has(operation.target.name)) return;
      // Assigning the name itself replaces the binding. So can an indexed
      // write, because `runtime.writableMember` materialises a fresh array for
      // a member that holds nothing yet. Writing a FIELD of the object a
      // member points at leaves the binding alone -- which is what the Game
      // Boy PPU does to `m_line` on every dot.
      let target = operation.target;
      const indexed = target.kind === 'index';
      while (target.kind === 'index') target = target.object;
      if (target.kind !== 'identifier') return;
      if (indexed && fixedArrays.has(target.name)) return;
      rebound.add(target.name);
    });
    // A member whose address is taken is written through the pointer:
    // `COMBINE_DATA(&m_midtunit_control)` updates it before the same method
    // reads bit 5 back, and a hoisted copy kept NBA Jam on the wrong VRAM bank.
    const addressed = (node: unknown): void => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(addressed); return; }
      const record = node as Record<string, unknown>;
      if (record.kind === 'unary' && record.operator === '&') {
        let operand = record.operand as { kind?: string; name?: string; object?: unknown } | undefined;
        while (operand?.kind === 'index' || operand?.kind === 'member') {
          operand = operand.object as typeof operand;
        }
        if (operand?.kind === 'identifier' && operand.name) rebound.add(operand.name);
      }
      // `m_x.resize(n)` replaces a typed-array member with a new array.
      const callee = record.callee as { kind?: string; property?: string; object?: { kind?: string; name?: string } } | undefined;
      if (record.kind === 'call' && callee?.kind === 'member' && callee.property === 'resize' &&
        callee.object?.kind === 'identifier' && callee.object.name) {
        rebound.add(callee.object.name);
      }
      for (const value of Object.values(record)) addressed(value);
    };
    addressed(method.program.operations);
  }
  return new Set(
    definition.members.map(member => member.name).filter(name => !rebound.has(name)),
  );
}

/**
 * The object of a member call. The call ladder tests this for materialisation,
 * so it must stay undefined when the board never bound the member.
 */
/** A member, or an element of one, that holds a plain class object (`objectType`). */
/**
 * A data member of an object the device builds for an element of a member
 * array (POKEY's `pokey_channel m_channel[4]`). The element is that object's
 * `self`, whose members are accessors so a foreign store narrows; read
 * through `$members` instead and the store narrows inline. POKEY touches its
 * channels' fields a dozen times a clock.
 */
function allocatedObjectField(expression: GeneratedExpression, context: EmitContext): GeneratedDeviceMember | undefined {
  if (context.boardScope || expression.kind !== 'member' || expression.object.kind !== 'index') return undefined;
  const holder = expression.object.object;
  if (holder.kind !== 'identifier' || context.locals.has(holder.name)) return undefined;
  const member = context.definition.members.find(candidate => candidate.name === holder.name);
  if (!member || member.arrayLength === undefined || member.objectConstructed || member.valueType.includes('*')) return undefined;
  const allocated = context.definition.allocations?.[member.object ?? member.valueType.trim()];
  return allocated?.members?.find(candidate => candidate.name === expression.property);
}

function isObjectReceiver(expression: GeneratedExpression, context: EmitContext): boolean {
  const holder = expression.kind === 'index' ? expression.object : expression;
  if (holder.kind !== 'identifier' || context.locals.has(holder.name)) return false;
  const member = context.definition.members.find(candidate => candidate.name === holder.name);
  // So is an element of a member array of a class the device allocates
  // itself (POKEY's `pokey_channel m_channel[4]`): the host builds each one.
  return Boolean(member?.objectType) || (expression.kind === 'index' && member?.arrayLength !== undefined &&
    !member.valueType.includes('*') && Boolean(context.definition.allocations?.[member.valueType.trim()]));
}

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

/**
 * The value of an expression built only from integer literals, or undefined.
 *
 * MAME writes a chip's variant table as macros over a constant -- the VIC-II's
 * `(m_variant == TYPE_6569 || m_variant == TYPE_8565 ...) ? 48 : 48` for the
 * first DMA line -- and after the compiler substitutes the constants the IR
 * is a tree of literals. Emitting it as written put 464 literal comparisons
 * in the VIC's per-cycle loop; a source constant is a constant here too.
 */
function literalValue(expression: GeneratedExpression, context?: EmitContext): number | undefined {
  if (expression.kind === 'number') {
    return expression.wide === undefined && !expression.floating && Number.isInteger(expression.value)
      ? expression.value : undefined;
  }
  // A name emitExpression would spell as a number: a constant, or a device's
  // const scalar member. The VIC-II tests its own `m_variant` against each
  // chip it could be, and with the member already a literal in the emitted
  // text, each test survived as `Number(4) === Number(4)` -- hundreds of
  // them in its per-cycle methods, and bytecode V8 counts against inlining.
  if (expression.kind === 'identifier') return context ? literalIdentifier(expression.name, context) : undefined;
  if (expression.kind === 'unary') {
    const operand = literalValue(expression.operand, context);
    if (operand === undefined) return undefined;
    if (expression.operator === '!') return operand ? 0 : 1;
    if (expression.operator === '-') return -operand;
    if (expression.operator === '~') return ~operand;
    if (expression.operator === '+') return operand;
    return undefined;
  }
  if (expression.kind === 'conditional') {
    const condition = literalValue(expression.condition, context);
    if (condition === undefined) return undefined;
    return literalValue(condition ? expression.whenTrue : expression.whenFalse, context);
  }
  if (expression.kind !== 'binary') return undefined;
  const left = literalValue(expression.left, context);
  const right = literalValue(expression.right, context);
  if (left === undefined || right === undefined) return undefined;
  switch (expression.operator) {
    case '==': return left === right ? 1 : 0;
    case '!=': return left !== right ? 1 : 0;
    case '<': return left < right ? 1 : 0;
    case '<=': return left <= right ? 1 : 0;
    case '>': return left > right ? 1 : 0;
    case '>=': return left >= right ? 1 : 0;
    case '&&': return left && right ? 1 : 0;
    case '||': return left || right ? 1 : 0;
    case '+': return left + right;
    case '-': return left - right;
    case '*': return left * right;
    case '&': return left & right;
    case '|': return left | right;
    case '^': return left ^ right;
    // 32-bit shifts, as C++ on the int operands these literals are.
    case '<<': return right >= 0 && right < 32 ? left << right : undefined;
    // A left operand past 31 bits would fold as JavaScript's arithmetic shift
    // of its int32 conversion, where the emitted runtime.shiftRight treats a
    // positive value as logical.
    case '>>': return right >= 0 && right < 32 && left <= 0x7fffffff ? left >> right : undefined;
    default: return undefined;
  }
}

/**
 * A framework constant named without its class -- diexec.h's INPUT_LINE_NMI,
 * which the runtime numbers its own way -- where the device has no member of
 * that name: the interpreter falls back to the same table. Emitted as a
 * member read it was 0, so a 6800's IRQ line was taken for its NMI.
 */
function frameworkConstant(name: string, context: EmitContext): number | undefined {
  if (name.includes('::') || DEFAULT_CONSTANTS[name] === undefined) return undefined;
  if (context.definition.members.some(member => member.name === name)) return undefined;
  return DEFAULT_CONSTANTS[name];
}

/** The integer an identifier is emitted as, resolved exactly as emitExpression does. */
function literalIdentifier(name: string, context: EmitContext): number | undefined {
  if (context.locals.has(name)) return undefined;
  if (name === 'true') return 1;
  if (name === 'false' || name === 'nullptr') return 0;
  const leaf = name.split('::').at(-1)!;
  const constant = context.methodConstants?.[name] ??
    context.definition.constants[name] ??
    (leaf !== name ? DEFAULT_CONSTANTS[name] : undefined) ??
    context.methodConstants?.[leaf] ??
    context.definition.constants[leaf] ??
    frameworkConstant(name, context);
  if (constant !== undefined) return Number.isInteger(constant) ? constant : undefined;
  if (context.compiled.has(name)) return undefined;
  const value = Number(constMemberValue(name, context));
  return Number.isInteger(value) ? value : undefined;
}

function emitExpression(expression: GeneratedExpression, context: EmitContext): string {
  if (expression.kind === 'number') {
    return expression.wide === undefined ? String(expression.value) : `${expression.wide}n`;
  }
  if (expression.kind === 'binary' || expression.kind === 'conditional' || expression.kind === 'unary') {
    const folded = literalValue(expression, context);
    if (folded !== undefined && Number.isSafeInteger(folded)) return String(folded);
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
    // Qualified before leaf, as the interpreter resolves it: an emu enum such
    // as `machine_phase::RUNNING` is not the device's own `RUNNING`.
    const constant = context.methodConstants?.[expression.name] ??
      context.definition.constants[expression.name] ??
      (leaf !== expression.name ? DEFAULT_CONSTANTS[expression.name] : undefined) ??
      context.methodConstants?.[leaf] ??
      context.definition.constants[leaf] ??
      frameworkConstant(expression.name, context);
    if (constant !== undefined) return String(constant);
    if (context.compiled.has(expression.name)) {
      return `method_${safeName(expression.name)}.bind(undefined, runtime)`;
    }
    return memberValue(expression.name, context);
  }
  if (expression.kind === 'unary') {
    if (expression.operator === '&') return emitAddressOf(expression.operand, context);
    const operand = emitExpression(expression.operand, context);
    // Resolved by the operand's shape at run time, exactly as the interpreter
    // resolves it — and evaluated once, because the operand can be a call.
    if (expression.operator === '*') {
      // `*this` is the device's own object, never a pointer or an array:
      // POKEY hands it to a channel's inc_chan on every clock.
      if (expression.operand.kind === 'identifier' && expression.operand.name === 'this' && !context.boardScope) return operand;
      return `runtime.dereference(${operand})`;
    }
    return expression.operator === '!' ? `((${operand}) ? 0 : 1)` : `(${expression.operator}${operand})`;
  }
  if (expression.kind === 'cast') {
    const operand = emitExpression(expression.operand, context);
    // A cast to a pointer or reference retypes an address; it never narrows.
    // Retyping is not always identity, though: `reinterpret_cast<u16 *>` over
    // byte memory is a reinterpreting view, which is how MAME writes a
    // byte-backed sprite RAM a half-word at a time (wardner_sprite_w).
    // Emitting the bare byte array stored each half-word at the word index
    // and dropped every high byte.
    if (expression.pointer) {
      if (isBytePointerType(expression.valueType)) return `runtime.byteView(${operand})`;
      const view = packedPointerView(expression.valueType);
      return view === undefined ? operand : `runtime.packedView(${operand}, ${view})`;
    }
    return wrapType(operand, expression.valueType);
  }
  if (expression.kind === 'binary') {
    // A 64-bit literal promotes the whole expression around it, exactly as in
    // C. Emitted arithmetic is plain `number`, so the operation is handed to
    // the same exact evaluator the interpreter uses -- only the operands stay
    // compiled. MAME's Game Boy PPU interleaves two bit planes this way, and
    // computing it in floating point drew a blank screen.
    if (expression.precision === 64 || containsWideLiteral([expression])) {
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
    // Neither side is known to be a number, so the value decides -- exactly as
    // the interpreter does. A call that answers memory (`m_palette->pens()`)
    // carries no declared type, and assuming a number silently turned pointer
    // arithmetic into integer arithmetic.
    if (expression.operator === '+' && !isKnownNumericType(leftType) &&
        !isKnownNumericType(rightType)) {
      return `runtime.add(${left}, ${right})`;
    }
    if (expression.operator === '-' && leftType?.includes('*') && !rightType?.includes('*')) {
      return `runtime.addressOf(${left}, -(${right}))`;
    }
    // Two iterators into one container differ by a count, and either side
    // may be a pointer the types cannot show (`it - buf.begin()`).
    if (expression.operator === '-' && !isKnownNumericType(leftType) && !isKnownNumericType(rightType) &&
        (expression.left.kind === 'call' || expression.right.kind === 'call' ||
          leftType?.includes('*') || rightType?.includes('*') || leftType === 'auto' || rightType === 'auto' ||
          // Two fields of no type it can follow: discrete's task counts what a
          // source has buffered as `linked_outbuf->ptr - sn.ptr`.
          (leftType === undefined && rightType === undefined &&
            (expression.left.kind === 'member' || expression.right.kind === 'member')))) {
      return `runtime.subtract(${left}, ${right})`;
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
      // An iterator is a position in a container: `buf.begin() == it` in the
      // floppy drive's cache fill. Read as numbers it stringified the whole
      // track twice per flux reversal, and answered NaN === NaN.
      const iterator = (value: GeneratedExpression): boolean =>
        value.kind === 'call' && value.callee.kind === 'member' &&
        ['begin', 'end', 'cbegin', 'cend', 'data'].includes(value.callee.property);
      // MAME's rectangle compares its four edges.
      const rectangle = leftType === 'rectangle' || rightType === 'rectangle';
      if (
        (expression.operator === '==' || expression.operator === '!=') &&
        (leftType?.includes('*') || rightType?.includes('*') || iterator(expression.left) || iterator(expression.right) ||
          // Objects, as the compiler marked them: as numbers both sides of
          // `&stream == m_channel[channel].stream` were NaN, and no channel rendered.
          rectangle || expression.identity)
      ) {
        const isNull = (value: GeneratedExpression): boolean =>
          (value.kind === 'number' && value.value === 0) ||
          (value.kind === 'identifier' && value.name === 'nullptr');
        const pointer = leftType?.includes('*') && isNull(expression.right) ? left
          : rightType?.includes('*') && isNull(expression.left) ? right : undefined;
        if (pointer !== undefined) {
          // A null test needs no comparison of pointer bases or offsets.
          // Every allocated pointer, including one pointing at a zero byte,
          // is an object; the host represents the null pointer as zero.
          return expression.operator === '==' ? `((${pointer}) ? 0 : 1)` : `((${pointer}) ? 1 : 0)`;
        }
        const equal = `runtime.same(${left}, ${right})`;
        return expression.operator === '=='
          ? `(${equal} ? 1 : 0)`
          : `(${equal} ? 0 : 1)`;
      }
      const operator = expression.operator === '==' ? '===' :
        expression.operator === '!=' ? '!==' : expression.operator;
      // Pointers order by where they point within their memory.
      if (operator !== '===' && operator !== '!==' && (leftType?.includes('*') || rightType?.includes('*'))) {
        return `((runtime.pointerOffset(${left}) ${operator} runtime.pointerOffset(${right})) ? 1 : 0)`;
      }
      return `((Number(${left}) ${operator} Number(${right})) ? 1 : 0)`;
    }
    // An operand declared unsigned shifts logically in C++ whatever its sign
    // in JavaScript, which is `>>>`; only an undeclared one needs the value
    // to decide. ymfm's `bitfield(uint32_t value, ...)` is called millions
    // of times a second.
    if (expression.operator === '>>' && /^(?:const\s+)?(?:uint(?:8|16|32)_t|u(?:8|16|32)|unsigned(?:\s+int)?|offs_t)$/.test(leftType ?? '')) {
      return `((${left}) >>> (${right}))`;
    }
    if (expression.operator === '>>') return `runtime.shiftRight(${left}, ${right})`;
    // `rectangle & rectangle` is an intersection.
    if (expression.operator === '&' && leftType === 'rectangle') return `runtime.and(${left}, ${right})`;
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
    // The value before the store, read as any read of the target is: through
    // a reference parameter's get() (ymfm's `lfo_am_counter++` on a
    // `uint16_t &` captured the wrapper, and the AM LFO never moved).
    const previous = methodTemp(context);
    return `(${previous} = ${emitExpression(expression.target, context)}, ${assignment}, ${previous})`;
  }
  if (expression.kind === 'conditional') {
    return `((${emitExpression(expression.condition, context)}) ? ` +
      `(${emitExpression(expression.whenTrue, context)}) : ` +
      `(${emitExpression(expression.whenFalse, context)}))`;
  }
  if (expression.kind === 'member') {
    const pointee = expression.object.kind === 'identifier' &&
      (context.dereferencedParameters?.get(expression.object.name) ?? context.dereferencedLocals?.get(expression.object.name));
    if (pointee) return `${pointee}.${expression.property}`;
    const object = emitExpression(expression.object, context);
    if (allocatedObjectField(expression, context)) return `${object}.$members.${expression.property}`;
    // Through a struct field every struct that declares it declares as a
    // pointer to a struct: DISCRETE's `sn.linked_outbuf->node_buf`, an
    // `output_buffer *` into another task's buffers.
    if (expression.object.kind === 'member' && structPointerField(expression.object.property, context)) {
      return `runtime.dereference(${object}).${expression.property}`;
    }
    // A pointer local of no known struct -- `auto *csect = sect + n` -- may
    // hold a pointer into an array of structs, so `csect->size` reads through
    // it. The D64 loader's sector loop never ended while it read the wrapper.
    const pointerLocal = (expression.object.kind === 'identifier' && context.locals.has(expression.object.name)) ||
      expression.object.kind === 'index';
    // A driver member may hold a pointer into a table of structs: CPS1's
    // machine_reset_cps leaves `m_game_config` at its game's row of
    // cps1_config_table, and `m_game_config->bank_mapper` reads that row. The
    // board's state carries no declared pointer type to decide it from, and a
    // non-pointer dereferences to itself.
    if (context.boardScope && expression.object.kind === 'identifier' && !context.locals.has(expression.object.name)) {
      return `runtime.dereference(${object}).${expression.property}`;
    }
    return expressionValueType(expression.object, context)?.includes('*') &&
      (structFieldsOf(expression.object, context) || pointerLocal)
      ? `runtime.dereference(${object}).${expression.property}`
      : `${object}.${expression.property}`;
  }
  if (expression.kind === 'index') {
    if (expression.object.kind === 'identifier' && expression.index.kind === 'identifier' &&
        expression.index.name === `${expression.object.name}_index`) {
      const element = context.rangeElements?.get(expression.object.name);
      if (element) return element;
    }
    const object = emitExpression(expression.object, context);
    const index = emitExpression(expression.index, context);
    // A declared array *inside a struct* is always the plain JavaScript array
    // the host built for it -- nothing rebinds a struct field to a pointer
    // wrapper or a typed view -- so it is read directly. The Game Boy PPU's
    // per-dot window check reads three of these, twenty-four thousand times a
    // frame, and `runtime.readIndex` has to rule out four other shapes first.
    // A local's initializer may be shorter than the array (`int a[8] = {0}`),
    // and past its end C reads zero, as readIndex answers.
    if (expression.object.kind === 'identifier' && context.arrayLocals?.has(expression.object.name)) {
      return `(${object}[${index}] ?? 0)`;
    }
    return context.pointerSafeIndex && !isDirectArray(expression.object, context)
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
      arrayLocals: new Set([...context.arrayLocals ?? []].filter(name => !expression.parameters.includes(name))),
      plainArrayLocals: new Map([...context.plainArrayLocals ?? []].filter(([name]) => !expression.parameters.includes(name))),
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

/** C math functions with one meaning everywhere, by every spelling MAME uses. */
const PURE_MATH: Record<string, { call: string; arity: number }> = Object.fromEntries([
  ['abs', 'Math.abs', 1], ['fabs', 'Math.abs', 1], ['floor', 'Math.floor', 1], ['ceil', 'Math.ceil', 1],
  ['sqrt', 'Math.sqrt', 1], ['exp', 'Math.exp', 1], ['log', 'Math.log', 1], ['log10', 'Math.log10', 1],
  ['sin', 'Math.sin', 1], ['cos', 'Math.cos', 1], ['tan', 'Math.tan', 1], ['atan', 'Math.atan', 1],
  ['atan2', 'Math.atan2', 2], ['pow', 'Math.pow', 2],
].flatMap(([name, call, arity]) => [
  [name as string, { call: call as string, arity: arity as number }],
  [`std::${name as string}`, { call: call as string, arity: arity as number }],
]));

const PAIR_VIEWS: Record<string, Record<string, string>> = {
  w: { l: 'u16', h: 'u16' },
  sw: { l: 's16', h: 's16' },
  b: { l: 'u8', h: 'u8', h2: 'u8', h3: 'u8' },
  sb: { l: 's8', h: 's8', h2: 's8', h3: 's8' },
};

/** Which of emucore.h's unions a local or member holds, if one. */
function pairKind(value: GeneratedExpression, context: EmitContext): 'PAIR' | 'PAIR16' | undefined {
  if (value.kind !== 'identifier') return undefined;
  const declared = (context.locals.has(value.name)
    ? context.locals.get(value.name)
    : context.definition.members.find(member => member.name === value.name)?.valueType)?.replace(/\bconst\b/g, '').trim();
  return declared === 'PAIR' || declared === 'PAIR16' ? declared : undefined;
}

function pairViewType(expression: GeneratedExpression, context: EmitContext): string | undefined {
  if (expression.kind !== 'member') return undefined;
  // PAIR's word is `.d`; PAIR16's is `.w` (the 6809's `m_pc.w`).
  const words: Record<string, Record<string, string>> = {
    PAIR: { d: 'u32', sd: 's32' },
    PAIR16: { w: 'u16', sw: 's16' },
  };
  const own = pairKind(expression.object, context);
  if (own) return words[own]![expression.property];
  const view = expression.object;
  const holder = view.kind === 'member' ? pairKind(view.object, context) : undefined;
  if (view.kind !== 'member' || !holder) return undefined;
  if (holder === 'PAIR16' && view.property !== 'b' && view.property !== 'sb') return undefined;
  if (holder === 'PAIR16' && !['l', 'h'].includes(expression.property)) return undefined;
  return PAIR_VIEWS[view.property]?.[expression.property];
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
  // MAME's PAIR union: each view is an integer of its width -- `.d` the word,
  // `.w.l`/`.w.h` its halves, `.b.l`... its bytes, and the `s` forms signed.
  // The 6800 steps its program counter as `m_pc.w.l++` on every fetch.
  const pairView = pairViewType(expression, context);
  if (pairView) return pairView;
  // A struct field declares its width, so `m_line.window_start_y_index + 4` is
  // known integer arithmetic and needs neither the runtime's `add` nor its
  // pointer tests. The Game Boy PPU's per-dot window check does five of these.
  if (expression.kind === 'member') {
    const field = structFieldOf(expression, context);
    if (field?.valueType && !field.length) return field.valueType;
    if (field?.bits && !field.fields && !field.length) {
      return field.signed ? `s${field.bits}` : `u${field.bits}`;
    }
  }
  if (expression.kind === 'index') {
    // An element of a local array of rectangles (`rectangle bsides[4]`).
    if (expression.object.kind === 'identifier' && context.locals.get(expression.object.name) === 'rectangle') {
      return 'rectangle';
    }
    const field = expression.object.kind === 'member'
      ? structFieldOf(expression.object, context)
      : undefined;
    if (field?.bits && field.length && !field.fields) {
      return field.signed ? `s${field.bits}` : `u${field.bits}`;
    }
    const member = expression.object.kind === 'identifier' && !context.locals.has(expression.object.name)
      ? context.definition.members.find(candidate => candidate.name === (expression.object as { name: string }).name)
      : undefined;
    if (member?.bits && (member.arrayLength !== undefined || member.values !== undefined) && !member.fields) {
      return member.signed ? `s${member.bits}` : `u${member.bits}`;
    }
    // An element of a vector of pointers is a pointer: discrete's block list
    // is a `std::vector<const discrete_block *>`, read `block_list[i]->type`.
    const container = expressionValueType(expression.object, context)?.replace(/&\s*$/, '').trim();
    const element = container && /^(?:const\s+)?std::vector\s*<\s*([\s\S]+?)\s*>$/.exec(container)?.[1];
    if (element?.includes('*')) return element;
  }
  if (expression.kind === 'unary' && expression.operator === '&') {
    return `${expressionValueType(expression.operand, context) ?? ''}*`;
  }
  // A container's begin() and end() are iterators, so `track.begin() + si` is
  // pointer arithmetic: as a number it concatenated the array into a string.
  // Whatever the receiver's declared type -- `auto &ws = wspans[i]` has none.
  if (expression.kind === 'call' && expression.callee.kind === 'member' && !expression.args.length &&
      (expression.callee.property === 'begin' || expression.callee.property === 'end')) {
    return 'iterator*';
  }
  if (expression.kind === 'binary' && ['+', '-'].includes(expression.operator)) {
    const left = expressionValueType(expression.left, context);
    const right = expressionValueType(expression.right, context);
    return left?.includes('*') ? left : right?.includes('*') ? right : undefined;
  }
  return undefined;
}

/** A resolved host call, read from the method's `__l` links table. */
function callLink(context: EmitContext, name: string): string {
  context.links?.add(name);
  return `__l[${JSON.stringify(name)}]`;
}

/**
 * A host call whose absence makes the call answer 0. When the link is bound it
 * is the link; when it is not, a census tool (tools/unresolved-calls.ts) may
 * record the miss. The hook is read only on a miss and answers nothing, so the
 * emitted call behaves the same with or without one (#178).
 */
function fallbackLink(context: EmitContext, name: string): string {
  const missing = context.typescript
    ? '(globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall'
    : 'globalThis.mamekitMissingCall';
  return `(${callLink(context, name)} ?? ${missing}?.(${JSON.stringify(name)}))`;
}

function emitCall(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: EmitContext,
): string {
  const synchronize = schedulerSynchronize(expression);
  if (synchronize) {
    return `runtime.synchronize(${JSON.stringify(synchronize.callback ?? '')}, ` +
      `${synchronize.parameter ? emitExpression(synchronize.parameter, context) : '0'})`;
  }
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
    const delegate = Object.values(context.definition.delegates ?? {}).includes(name);
    const args = expression.args.map(argument =>
      delegate && ['identifier', 'index', 'member'].includes(argument.kind)
        ? emitReferenceArgument(argument, context)
        : emitExpression(argument, context));
    // A lambda the body holds in a local (`auto const TOTAL_COLORS = [this]
    // (int gfxn) {...}`, Xevious's palette): the interpreter calls the local
    // first, so the emitted call does too, not the board's call table.
    if (context.locals.has(name)) {
      return `(typeof ${localName(name)} === 'function' ? ${localName(name)}(${args.join(', ')}) : ` +
        `runtime.macro(${JSON.stringify(name)}${args.length ? `, ${args.join(', ')}` : ''}))`;
    }
    if (name === 'COMBINE_DATA') {
      // The interpreter reads data/mem_mask from the handler's locals; emitted
      // code passes its own parameters, with MAME's full-mask default.
      const data = context.locals.has('data') ? localName('data') : '0';
      const memMask = context.locals.has('mem_mask') ? localName('mem_mask') : '0xffff';
      return `runtime.combineData(${args[0] ?? '0'}, ${data}, ${memMask})`;
    }
    // As the interpreter answers them (Math over numbers), inline rather than
    // through runtime.macro: ymfm clamps every envelope and rate this way.
    if ((name === 'std::min' || name === 'std::max') && args.length === 2 &&
        !context.definition.methods.some(method => method.name === name)) {
      return `${name === 'std::min' ? 'cppMin' : 'cppMax'}(+(${args[0]}), +(${args[1]}))`;
    }
    if (name === 'STRING_APPEND') return `(cppStringText(${args[0] ?? "''"}) + cppStringText(${args[1] ?? "''"}))`;
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
    if (name === 'rgb_t' && expression.args.every(argument => argument.kind === 'number')) {
      return String(applyGeneratedMacro(name, expression.args.map(argument =>
        (argument as { value: number }).value)));
    }
    if (name === 'TABLE') {
      const index = args[0] ?? '0';
      const values = args.slice(1);
      const contents = values.join(', ');
      let table = `[${contents}]`;
      if (context.constantTables && values.every(value => value.trim() !== '' && Number.isFinite(Number(value)))) {
        table = context.constantTables.get(contents) ?? `__mame_table_${context.constantTables.size}`;
        context.constantTables.set(contents, table);
      }
      const indexExpression = expression.args[0];
      const indexType = indexExpression && expressionValueType(indexExpression, context)?.replace(/\bconst\b/g, '').trim();
      const integralIndex = indexExpression?.kind === 'number' && Number.isInteger(indexExpression.value) ||
        /^(?:bool|char|[us](?:8|16|32)|u?int(?:8|16|32)_t|int|unsigned|offs_t)$/.test(indexType ?? '');
      const wrapped = integralIndex && values.length > 0 && (values.length & (values.length - 1)) === 0
        ? `((${index}) & ${values.length - 1})`
        : `(((${index}) % ${values.length}) + ${values.length}) % ${values.length}`;
      return `(${table}[${wrapped}] ?? 0)`;
    }
    if (name.startsWith('new::')) return `runtime.invoke(${JSON.stringify(name)}${args.length ? ', ' + args.join(', ') : ''})`;
    if (name === 'bool') return `((${args[0] ?? '0'}) ? 1 : 0)`;
    if (name === 'ALLOC' || name === 'make_unique_clear' ||
        name === 'ALLOC16' || name === 'ALLOC32' || name === 'ALLOCF') {
      const array = name === 'ALLOC16' ? 'Uint16Array'
        : name === 'ALLOC32' ? 'Uint32Array'
        : name === 'ALLOCF' ? 'Float64Array'
        : 'Uint8Array';
      return yieldToOverride(
        `new ${array}(Math.max(0, Number(${args[0] ?? '0'})))`,
        args,
      );
    }
    if (name === 'ALLOC_OBJECTS') return `new Array(Math.max(0, Number(${args[0] ?? '0'}))).fill(0)`;
    if (name === 'ARRAY') return `[${args.join(', ')}]`;
    if (name === 'sizeof') {
      const operand = expression.args[0];
      const valueType = operand ? expressionValueType(operand, context) : undefined;
      const bytes = /(?:u?int64_t|[us]64|double)/.test(valueType ?? '') ? 8
        : /(?:u?int32_t|[us]32|float|offs_t|pen_t)/.test(valueType ?? '') ? 4
        : /(?:u?int16_t|[us]16)/.test(valueType ?? '') ? 2
        : 1;
      const member = operand?.kind === 'identifier' && !context.locals.has(operand.name)
        ? context.definition.members.find(member => member.name === operand.name) : undefined;
      if (member && !member.valueType.includes('*')) {
        const count = member.arrayShape?.reduce((total, length) => total * length, 1)
          ?? member.arrayLength ?? member.values?.length;
        if (count !== undefined) return String(count * bytes);
      }
      const field = operand?.kind === 'member' ? structFieldOf(operand, context) : undefined;
      if (field?.length && !field.fields) return String(field.length * (field.bits ? field.bits / 8 : bytes));
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
      // A plain array is an array of structs (`gen_crc_info crcs[64]`), whose
      // memset clears each struct's fields -- the interpreter's rule. Filled
      // with zeros it lost the structs themselves.
      return `(() => { const target = ${target}; const bytes = Number(${bytes}); ` +
        `if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, ${value}, bytes); ` +
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
    // C++17 `std::size` is an array's extent, which the value already knows.
    // MAME's Game Boy PPU asks for it five times per dot, and routing that
    // through the interpreter's macro table cost 121,000 dispatches a frame.
    if (name === 'std::size' || name === 'std::ssize') {
      return `((${args[0] ?? '[]'})?.length ?? 0)`;
    }
    // A release build compiles `assert` out, and the interpreter already
    // answers it with zero. Dropping the dispatch is only safe when evaluating
    // the condition cannot itself do anything, so a condition that calls or
    // assigns keeps the old path.
    if (
      (name === 'assert' || name === 'static_assert') &&
      expression.args.every(isSideEffectFreeExpression)
    ) return '0';
    if (context.definition.methods.some(method => method.name === name)) {
      return `runtime.invoke(${JSON.stringify(name)}${args.length ? `, ${args.join(', ')}` : ''})`;
    }
    if (context.definition.callbacks.some(callback => callback.member === name)) {
      // A devcb line used to go through the generic invoke alone -- a method
      // lookup, an Object.values scan and an argument array per call -- and
      // the VIC-II raises BA and AEC through it on every cycle. This is that
      // invoke's own precedence, spelled out: a line the board bound on the
      // device's call table wins (a soundlatch's data-pending line is wired
      // that way, and calling the device's local emitter instead left Double
      // Dragon's sound CPU without its interrupt); then the device's own
      // combined emitter, which IrDevice stores under the member name; and
      // the generic invoke last, for a multi-slot or unwired line. A bound
      // non-delegate line takes numbers, as invoke coerces them.
      const link = callLink(context, name);
      const bound = delegate ? args : args.map(argument => `Number(${argument})`);
      const member = `members.${name}`;
      return `(${link} ? ${link}(${bound.join(', ')}) : ` +
        `typeof ${member} === 'function' ? ${member}(${args.join(', ')}) : ` +
        `runtime.invoke(${JSON.stringify(name)}${args.length ? `, ${args.join(', ')}` : ''}))`;
    }
    // A call through a member-function pointer: the pointer holds a method's
    // name, and an emitted method of that name is called directly -- the 6800
    // and MCS-48 dispatch every instruction this way. Anything else takes the
    // shared path below.
    if (name === 'CALL_METHOD' && args.length >= 1) {
      const rest = args.slice(1);
      return `((__method) => __method ? __method(runtime${rest.length ? `, ${rest.join(', ')}` : ''}) : ` +
        `(${callLink(context, name)} ? ${callLink(context, name)}(${args.join(', ')}) : ` +
        `runtime.macro("CALL_METHOD"${args.length ? `, ${args.join(', ')}` : ''})))(__methodTable[${args[0]}])`;
    }
    // <cmath> answers the same everywhere, so it is spelled directly. The
    // speaker's filter takes `std::abs` of 64 taps for every one of 48,000
    // samples a second, and down the macro chain that was a fifth of a frame.
    const math = PURE_MATH[name];
    if (math && args.length === math.arity) {
      return `${math.call}(${args.map(argument => `Number(${argument})`).join(', ')})`;
    }
    // Board/host bindings first — the interpreter's own precedence — then the
    // shared framework-macro table, so rgb_t/TILE_FLIPYX/assert and friends
    // mean the same thing here as they do interpreted.
    return `(${callLink(context, name)} ? ` +
      `${callLink(context, name)}(${args.join(', ')}) : ` +
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
      // The board's binding for the devcb first, then the value's own answer
      // (a delegate slot: Midway's SSIO asks `m_custom_input[offset].isnull()`),
      // as the interpreter resolves it; only then the counted fallback.
      const name = `${expressionName(expression.callee.object)}.isnull`;
      const link = callLink(context, name);
      const object = emitExpression(expression.callee.object, context);
      return `(${link} ? ${link}() : ` +
        `typeof (${object})?.isnull === 'function' ? (${object}).isnull() : ` +
        `(${fallbackLink(context, name)}?.() ?? 0))`;
    }
    const chain = videoFrameworkChainName(expression, context);
    if (chain) {
      const chainArgs = expression.args.map(argument => emitExpression(argument, context));
      return `(${fallbackLink(context, chain)}?.(${chainArgs.join(', ')}) ?? 0)`;
    }
    // An argument the receiver's class takes by non-const reference is passed
    // as storage it writes back to (`m_regs.write(..., keyon_channel, ...)`).
    const args = expression.args.map((argument, index) =>
      expression.references?.includes(index) && isAssignableArgument(argument)
        ? emitReferenceArgument(argument, context)
        : emitExpression(argument, context));
    const object = emitCallObject(expression.callee.object, context);
    if (expression.callee.property === 'empty' && !args.length) {
      // A rectangle answers its own `empty()`: no area left after a clip.
      if (expressionValueType(expression.callee.object, context) === 'rectangle') return `(${object}).empty()`;
      return `((${object}).length === 0 ? 1 : 0)`;
    }
    // std::vector::resize. A plain array (a vector of vectors or of structs)
    // grows in place by elements of its own kind; a typed array is replaced,
    // so a member or local holding one takes the new array back.
    if (expression.callee.property === 'resize' && args.length === 1) {
      const holder = expression.callee.object;
      if (holder.kind === 'identifier' && context.locals.has(holder.name) && !context.wrappedReferences.has(holder.name)) {
        return `(${localName(holder.name)} = runtime.resize(${object}, ${args[0]}))`;
      }
      if (holder.kind === 'identifier' && context.definition.members.some(member => member.name === holder.name)) {
        return `(members.${holder.name} = runtime.resize(${object}, ${args[0]}))`;
      }
      return `runtime.resize(${object}, ${args[0]})`;
    }
    if (
      ['bytes', 'size', 'length'].includes(expression.callee.property) &&
      !args.length
    ) {
      // A container's extent -- unless the receiver is declared as a class
      // that is not one: a format's `util::random_read &io` answers
      // `length()` itself, and read as a property it handed back the method.
      const receiverType = expressionValueType(expression.callee.object, context)
        ?.replace(/\bconst\b/g, '').replace(/&/g, '').trim();
      if (receiverType && /^[\w:]+$/.test(receiverType) &&
          !/vector|array|span|string|ptr|region|memory|bitmap|auto/i.test(receiverType)) {
        return `(${object}).${expression.callee.property}()`;
      }
      // `bytes()` is a size in bytes, not elements: a 16-bit sprite RAM held as
      // 16-bit words has half as many. The container answers it the way the
      // interpreter does; read as `.length`, R-Type's buffered sprite copy
      // took half its table and lost sprites.
      if (expression.callee.property === 'bytes') return `runtime.container(${object}, "bytes")`;
      return `(${object}).length`;
    }
    // A member the compiler knows holds an object of a plain C++ class (ymfm's
    // `m_regs`, `m_channel[i]`, `m_op[i]`) is that object's method, called
    // without probing what the value is: the OPLL makes some four million
    // such calls a second.
    if (!context.boardScope && isObjectReceiver(expression.callee.object, context)) {
      return `(${object}.${expression.callee.property}?.(${args.join(', ')}) ?? 0)`;
    }
    const directName = linkedMemberCallName(expression);
    if (
      directName &&
      (
        context.definition.links?.some(link => link.call === directName) ||
        HOST_SERVICE_CALLS.includes(directName)
      )
    ) {
      return `(${fallbackLink(context, directName)}?.(${args.join(', ')}) ?? 0)`;
    }
    // A call through a member is the board's binding when it has one, and a
    // method on the value only otherwise — the interpreter's own precedence.
    // Reading `m_screen.frame_number` off the state object instead of through
    // that binding silently gave galaxian's starfield a different frame count.
    //
    // The bound branch never evaluates the object, matching the interpreter,
    // which resolves the name before it looks at any value.
    const boundName = context.boardScope ? memberCallName(expression, context.methodConstants) : undefined;
    const value = emitValueMemberCall(expression, object, args, context);
    const onValue = value.code;
    if (boundName) {
      const lookup = callLink(context, boundName);
      const concrete = context.definition.concreteDeviceMembers?.includes(expressionName(expression.callee.object));
      if (value.generic) {
        // The same three arms, with the value's two folded into one runtime
        // call. The board binds nearly every such call, so that half is cold,
        // and spelled inline -- every argument written twice -- it made the
        // C64's memory decode too large for V8 to inline anything into:
        // read_pla was 879 bytes of bytecode and read_memory 1,906.
        const bare = concrete ? 'undefined' : callLink(context, expression.callee.property);
        return `(${lookup} ?? runtime.memberCall(${object}, ${JSON.stringify(expression.callee.property)}, ` +
          `${value.generic.direct ? 1 : 0}, ${bare}))(${args.join(', ')})`;
      }
      if (concrete) {
        return `(${lookup} ? ${lookup}(${args.join(', ')}) : ` +
          `(${object}) != null ? ${onValue} : 0)`;
      }
      // The interpreter's own order, and the reason all three arms exist: a
      // board binding wins; otherwise the value answers; and a member the
      // board declared but never materialised (an optional device with no
      // executable core) has no value at all, so its bare method name is the
      // last thing tried before the call means nothing. Emitting only the
      // first two arms turned such a call into a TypeError instead.
      const bare = fallbackLink(context, expression.callee.property);
      return `(${lookup} ? ${lookup}(${args.join(', ')}) : ` +
        `(${object}) != null ? ${onValue} : ` +
        `(${bare}?.(${args.join(', ')}) ?? 0))`;
    }
    // A driver member whose call has no name to bind (`m_bank_audio_cart[offset
    // & 3]->set_entry(...)`) may hold a reference rather than an object, which
    // the runtime resolves by its name, as the interpreter does. Called on the
    // value, Neo Geo's Z80 bank selects answered 0 and set no bank.
    if (context.boardScope && value.generic) {
      return `runtime.memberCall(${object}, ${JSON.stringify(expression.callee.property)}, ` +
        `${value.generic.direct ? 1 : 0}, undefined)(${args.join(', ')})`;
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
  context: EmitContext,
): { code: string; generic?: { direct: boolean } } {
  const code = valueMemberCallCode(expression, object, args, context);
  return typeof code === 'string' ? { code } : code;
}

/**
 * The value half of a member call. A call that reaches one of the two generic
 * forms -- a method called with arguments, or an accessor MAME spells as a
 * call -- also says so, and whether the object is used as it stands
 * (`runtime.memberCall` answers those two forms exactly).
 */
function valueMemberCallCode(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  object: string,
  args: readonly string[],
  context: EmitContext,
): string | { code: string; generic: { direct: boolean } } {
  if (expression.callee.kind !== 'member') return `${object}(${args.join(', ')})`;
  const property = expression.callee.property;
  if (property === 'get' && !args.length &&
      /^std::unique_ptr</.test(expressionValueType(expression.callee.object, context) ?? '')) {
    // The allocation host stores a unique_ptr's pointee directly. Calling
    // get() must return that pointer, not dereference its first RAM byte and
    // then probe the byte for a method before falling back to the container.
    return object;
  }
  // A std::vector is its own container at run time, so its iterators come from
  // the container. Probed as a pointer first, `buf.begin()` dereferenced the
  // vector to its first element three times before falling back here, and
  // the floppy drive's cache_fill spells begin() and end() five times on
  // every flux transition a 1541 reads.
  if (!args.length && (property === 'begin' || property === 'end' || property === 'data' || property === 'empty') &&
      /^(?:const\s+)?std::vector\b/.test(expressionValueType(expression.callee.object, context) ?? '')) {
    return `runtime.container(${object}, ${JSON.stringify(property)})`;
  }
  // std::vector's insert and erase take iterators into the vector; the
  // runtime answers them over the array (generatedVectorMethod), and any
  // other object keeps its own method of the name.
  if (property === 'insert' || property === 'erase') {
    return `runtime.vectorMethod(${object}, ${JSON.stringify(property)}${args.map(argument => `, ${argument}`).join('')})`;
  }
  // A std::string is a JS string, answered as the interpreter answers it
  // (generatedStringMethod), and `append` stores the new text back.
  if (/^(?:const\s+)?std::string(?:_view)?\b/.test(expressionValueType(expression.callee.object, context) ?? '')) {
    const call = `runtime.stringMethod(${object}, ${JSON.stringify(property)}${args.map(argument => `, ${argument}`).join('')})`;
    if (!STRING_MUTATORS.has(property)) return call;
    const receiver = expression.callee.object;
    if (receiver.kind !== 'identifier' && receiver.kind !== 'member' && receiver.kind !== 'index') return call;
    return `(${emitAssignment(receiver, '=', receiver, context, call)}, ${object})`;
  }
  // normalizeMameExecutionSource lowers std::vector::push_back to Array.push.
  // A vector is the container value itself, not a C++ pointer to its first
  // element. Running it through runtime.dereference turns an empty vector into
  // undefined, so the first push is discarded and it remains empty forever.
  if (property === 'push') return `(${object}).push(${args.join(', ')})`;
  // So is emplace_back, which builds the element and answers it
  // (generatedVector): sprite.cpp's rect list started empty and stayed so.
  if (property === 'emplace_back') return `(${object}).emplace_back(${args.join(', ')})`;
  // A member holding a C++ pointer is a generated pointer at run time, not the
  // thing it points at: `m_vram_space = &space(AS_DATA)` makes every
  // `m_vram_space->read_byte(...)` a call on the wrapper. The interpreter
  // dereferences before it looks for the method, and emitted code that did not
  // found no `read_byte`, took the `?? 0` fallback, and drew the TMS9928A's
  // whole active display as empty VRAM.
  const receiver = expression.callee.object;
  const member = receiver.kind === 'identifier' && !context.locals.has(receiver.name)
    ? context.definition.members.find(candidate => candidate.name === receiver.name) : undefined;
  const finder = member?.finder?.kind === 'device' ||
    /^(?:required|optional)_device(?:_array)?</.test(member?.valueType ?? '');
  const directObject = finder || /^bitmap_(?:rgb32|ind16|ind8)$/.test(member?.valueType ?? '') ||
    // A std::vector member is the container, never a pointer to its first element.
    /^std::vector\s*</.test(member?.valueType ?? '') ||
    (receiver.kind === 'call' && receiver.callee.kind === 'identifier' &&
      receiver.callee.name === 'space' && Boolean(context.definition.spaces?.length));
  const accessed = directObject ? `(${object})` : `runtime.dereference(${object})`;
  const access = `${accessed}.${property}`;
  // Resolved device finders expose source methods as functions. They cannot
  // be a pointer into an array or a numeric framework property. A finder the
  // board serves itself -- a hosted MCU, whose `m_cpu->set_input_line` is a
  // board binding, not a method of the object -- answers through the links
  // table first, as the interpreter resolves the call: emitted directly, the
  // Namco 51xx's chip_select never reached its MB8843 and Dig Dug went silent.
  if (finder) {
    const chain = memberCallName(expression, context.methodConstants);
    const direct = `((${object})?.${property}?.(${args.join(', ')}) ?? 0)`;
    if (!chain) return direct;
    const link = callLink(context, chain);
    return `(${link} ? ${link}(${args.join(', ')}) : ${direct})`;
  }
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
  // An attotime is seconds at run time, so its accessors are arithmetic on a
  // number. `(from_when - m_cache_weak_start).as_ticks(250000)` answered by
  // the fallback below was always 0, and the floppy drive then walked its weak
  // flux zone 4us at a time from the zone's start on every bit cell.
  if (ATTOTIME_METHODS.has(property)) {
    const numeric = property === 'is_never' ? `((${object}) === Infinity ? 1 : 0)`
      : property === 'is_zero' ? `((${object}) === 0 ? 1 : 0)`
        : property === 'as_double' ? `(${object})`
          : `runtime.attotime(${object}, ${JSON.stringify(property)}${args.map(arg => `, ${arg}`).join('')})`;
    return `(typeof ${object} === 'number' ? ${numeric} : (${access}?.(${args.join(', ')}) ?? 0))`;
  }
  if (args.length || !memberChainName(expression.callee.object)) {
    // The value may not implement the accessor MAME spells here: the runtime
    // models a gfx_element without `mark_dirty`, and the interpreter answers
    // such a call with 0 rather than failing. Emitting the bare call instead
    // made junglek and elevator throw a TypeError out of `characterram_w`.
    // The optional call costs nothing when the method is there.
    return args.length
      ? { code: `(${access}?.(${args.join(', ')}) ?? 0)`, generic: { direct: directObject } }
      // A void method answers undefined, which is no reason to ask the
      // container too: DISCRETE's per-sample `node->step()` did, every call.
      : (() => {
          const held = methodTemp(context);
          return `(${held} = ${accessed}, typeof ${held}.${property} === 'function' ? (${held}.${property}() ?? 0) : ` +
            `runtime.container(${object}, ${JSON.stringify(property)}))`;
        })();
  }
  // A MAME memory container answers its own accessors from the container: a
  // `std::unique_ptr<u8[]>` is a plain array at run time, so `m_vram.get()` has
  // no method to call and the pointer it would return *is* the array. Falling
  // through to 0 made the Game Boy PPU fetch every tile from address zero.
  const held = methodTemp(context);
  return {
    code: `(${held} = ${accessed}, typeof ${held}.${property} === 'function' ? ${held}.${property}() : ` +
      `typeof ${held}.${property} === 'number' || typeof ${held}.${property} === 'boolean' ? ${held}.${property} : ` +
      `runtime.container(${object}, ${JSON.stringify(property)}))`,
    generic: { direct: directObject },
  };
}

/**
 * The binding key a member call denotes, spelled the way the board binds it —
 * `m_screen.frame_number`. Undefined when the object is not a plain member
 * chain, in which case there is no name a board could have bound.
 */
function memberCallName(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  constants?: Readonly<Record<string, number>>,
): string | undefined {
  if (expression.callee.kind !== 'member') return undefined;
  const objectName = memberChainName(expression.callee.object, constants);
  return objectName ? `${objectName}.${expression.callee.property}` : undefined;
}

function memberChainName(
  expression: GeneratedExpression,
  constants?: Readonly<Record<string, number>>,
): string | undefined {
  if (expression.kind === 'identifier') return expression.name;
  if (expression.kind === 'member') {
    const object = memberChainName(expression.object, constants);
    return object ? `${object}.${expression.property}` : undefined;
  }
  // A subscript that is the method's own template constant names one element
  // as a literal does: the 128K's `m_bank_ram[Bank]->base()` in
  // spectrum_128_ram_r<1> is the board's `m_bank_ram[1].base`.
  const index = expression.kind === 'index'
    ? expression.index.kind === 'number'
      ? expression.index.value
      : expression.index.kind === 'identifier' ? constants?.[expression.index.name] : undefined
    : undefined;
  if (expression.kind === 'index' && index !== undefined) {
    const object = memberChainName(expression.object, constants);
    return object ? `${object}[${index}]` : undefined;
  }
  return undefined;
}

/**
 * MAME `machine().scheduler().synchronize()`, with no callback (end the
 * running slice) or with `timer_expired_delegate(FUNC(owner::method), ...)`
 * and its parameter -- also reached through another object's `machine()`, as
 * POKEY's channel struct does through its `host`. Undefined for anything else,
 * and for a delegate this cannot name, which then stays interpreted.
 */
export function schedulerSynchronize(
  expression: GeneratedExpression,
): { callback?: string; parameter?: GeneratedExpression } | undefined {
  if (expression.kind !== 'call' || expression.callee.kind !== 'member' ||
    expression.callee.property !== 'synchronize') return undefined;
  const scheduler = expression.callee.object;
  if (scheduler.kind !== 'call' || scheduler.args.length || scheduler.callee.kind !== 'member' ||
    scheduler.callee.property !== 'scheduler') return undefined;
  const machine = scheduler.callee.object;
  if (machine.kind !== 'call' || machine.args.length || !(
    (machine.callee.kind === 'identifier' && machine.callee.name === 'machine') ||
    (machine.callee.kind === 'member' && machine.callee.property === 'machine')
  )) return undefined;
  if (!expression.args.length) return {};
  const delegate = expression.args[0]!;
  if (delegate.kind !== 'call' || delegate.callee.kind !== 'identifier' ||
    delegate.callee.name !== 'timer_expired_delegate') return undefined;
  const func = delegate.args[0];
  if (func?.kind !== 'call' || func.callee.kind !== 'identifier' || func.callee.name !== 'FUNC' ||
    func.args[0]?.kind !== 'identifier') return undefined;
  return {
    callback: func.args[0].name.split('::').at(-1)!,
    ...(expression.args[1] ? { parameter: expression.args[1] } : {}),
  };
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

/**
 * `machine().tilemap().set_flip_all(...)`: a board video framework call the
 * video package binds by its whole chain (VIDEO_FRAMEWORK_CHAIN_CALLS).
 */
function videoFrameworkChainName(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: { boardScope?: boolean },
): string | undefined {
  if (!context.boardScope || expression.callee.kind !== 'member') return undefined;
  const object = expression.callee.object;
  if (object.kind !== 'call' || object.args.length) return undefined;
  const inner = linkedMemberCallName(object);
  const name = inner && `${inner}().${expression.callee.property}`;
  return name && VIDEO_FRAMEWORK_CHAIN_CALLS.includes(name) ? name : undefined;
}

/**
 * A copier for `a = b` where both are members of the same struct type, as
 * one named store per field: `checkpoint_live = cur_live` on the 64H156 runs
 * twelve thousand times a frame while a 1541 reads, and the generic copy's
 * keyed stores were a tenth of the drive's cost. Scalar fields store; an
 * array field copies element by element, as runtime.copyStruct does. A field
 * that is itself a struct, or a source that is anything else, keeps the
 * generic copy.
 */
function structCopier(
  member: { valueType: string; fields?: { name: string; length?: number; fields?: unknown }[] },
  value: GeneratedExpression,
  context: EmitContext,
): string | undefined {
  if (!context.structCopiers || value.kind !== 'identifier' || context.locals.has(value.name)) return undefined;
  const source = context.definition.members.find(candidate => candidate.name === value.name);
  const fields = member.fields ?? [];
  if (!source?.fields || source.valueType !== member.valueType || source.arrayLength || source.valueType.includes('*')) return undefined;
  if (JSON.stringify(source.fields) !== JSON.stringify(member.fields)) return undefined;
  if (!fields.length || fields.some(field => field.fields || !/^\w+$/.test(field.name))) return undefined;
  const name = `struct_copy_${safeName(member.valueType)}`;
  if (!context.structCopiers.has(name)) {
    const stores = fields.map(field => field.length
      ? `    { const into = t.${field.name}, from = s.${field.name};
      if (Array.isArray(into) && Array.isArray(from)) { for (let i = 0; i < into.length && i < from.length; i++) into[i] = from[i]; }
      else if (from !== undefined) t.${field.name} = from; }`
      : `    if (s.${field.name} !== undefined) t.${field.name} = s.${field.name};`).join('\n');
    const any = context.typescript ? ': any' : '';
    context.structCopiers.set(name, `  function ${name}(t${any}, s${any}) {
    if (t === s || !t || !s || typeof s !== 'object') return s;
${stores}
    return t;
  }`);
  }
  return name;
}

function emitAssignment(
  expression: GeneratedExpression,
  operator: string,
  value: GeneratedExpression,
  context: EmitContext,
  right = emitExpression(value, context),
): string {
  if (expression.kind === 'call') {
    // A method returning a reference is assigned through its `name=`, the
    // operator applied to what the getter reads (the 6809's `ireg() += 2`).
    if (expression.callee.kind === 'identifier' && context.compiled.has(`${expression.callee.name}=`) &&
        context.compiled.has(expression.callee.name) && /^(?:[-+*/%&|^]|<<|>>)?=$/.test(operator)) {
      const args = expression.args.map(argument => emitExpression(argument, context));
      const next = operator === '=' ? right
        : `((${emitExpression(expression, context)}) ${operator.slice(0, -1)} (${right}))`;
      return `method_${safeName(`${expression.callee.name}=`)}(runtime, ${[...args, next].join(', ')})`;
    }
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
  // `*ptr = value`. The interpreter stores through a generated pointer AND
  // through plain memory -- a `.share()`-bound member is a typed array, not a
  // pointer wrapper -- so the emitted form has to do both. Assuming the wrapper
  // made qix's display_enable_changed throw on the CRTC's first line.
  if (expression.kind === 'unary' && expression.operator === '*') {
    const pointer = emitExpression(expression.operand, context);
    const current = `runtime.readIndex(${pointer}, 0)`;
    const next = operator === '='
      ? right
      : (operator === '>>=' ? `runtime.shiftRight(${current}, ${right})` : `((${current}) ${operator.slice(0, -1)} (${right}))`);
    return `runtime.pointerStore(${pointer}, ${next})`;
  }
  if (expression.kind === 'index' && context.pointerSafeIndex) {
    // A board materialises a plain driver array the first time a handler
    // writes one, so the container an indexed write stores into has to be
    // asked for by NAME -- `runtime.writeIndex` only ever sees the value, and
    // a member that does not exist yet reads as 0, which silently swallowed
    // the write. That is how the Game Boy's `m_gb_io[0] = 0xCF | data` never
    // reached the joypad register.
    const directArray = isDirectArray(expression.object, context);
    const object = !directArray && expression.object.kind === 'identifier' &&
        expression.object.name.startsWith('m_') &&
        !context.locals.has(expression.object.name)
      ? `runtime.writableMember(${JSON.stringify(expression.object.name)})`
      : emitExpression(expression.object, context);
    const index = emitExpression(expression.index, context);
    if (directArray) {
      const current = `${object}[${index}]`;
      const next = operator === '='
        ? right
        : (operator === '>>=' ? `runtime.shiftRight(${current}, ${right})` : `((${current}) ${operator.slice(0, -1)} (${right}))`);
      const plain = expression.object.kind === 'identifier' && context.plainArrayLocals?.get(expression.object.name);
      return `${object}[${index}] = ${plain ? wrapType(next, plain) : next}`;
    }
    const current = `runtime.readIndex(${object}, ${index})`;
    const next = operator === '='
      ? right
      : (operator === '>>=' ? `runtime.shiftRight(${current}, ${right})` : `((${current}) ${operator.slice(0, -1)} (${right}))`);
    return `runtime.writeIndex(${object}, ${index}, ${next})`;
  }
  // A PAIR assigned from a PAIR copies the word, as the union is copied:
  // the 6800's `m_ppc = m_pc` keeps the previous PC, not a second name for
  // the current one.
  const pairType = (candidate: GeneratedExpression) => expressionValueType(candidate, context)?.replace(/\bconst\b/g, '').trim();
  if (operator === '=' && expression.kind === 'identifier' && pairType(expression) === 'PAIR' && pairType(value) === 'PAIR') {
    return `(${emitExpression(expression, context)}.d = (${right}).d)`;
  }
  // PAIR16 the same, by its 16-bit word: the 6809's `m_ppc = m_pc`.
  if (operator === '=' && expression.kind === 'identifier' && pairType(expression) === 'PAIR16' && pairType(value) === 'PAIR16') {
    return `(${emitExpression(expression, context)}.w = (${right}).w)`;
  }
  // C++ struct assignment copies: `cur_live = checkpoint_live` on the 64H156
  // must leave two structs, not one object under two names.
  if (operator === '=' && expression.kind === 'identifier' && !context.locals.has(expression.name)) {
    const member = context.definition.members.find(candidate => candidate.name === expression.name);
    // So does a rectangle: sprite.cpp keeps `m_rect_list_bounds = cliprect`,
    // and holding the caller's object instead, its invalidate_rect_list()
    // emptied the screen update's own cliprect -- nothing drew after it.
    if (member?.valueType.trim() === 'rectangle') {
      return `members.${member.name} = ${copiedValue(right)}`;
    }
    if (member?.fields && !member.arrayLength && !member.valueType.includes('*')) {
      const copier = structCopier(member, value, context);
      if (copier) return `${copier}(members.${member.name}, ${right})`;
      return `runtime.copyStruct(members.${member.name}, ${right})`;
    }
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
  // A struct field or member declared with a width is an integer, whatever
  // spelling (if any) the target carries.
  const next = pointerAssignment(target.code, operator, right,
    pairViewType(expression, context) ?? target.valueType ??
      (target.bits ? `${target.signed ? 's' : 'u'}${target.bits}` : target.pointerArithmetic ? 'auto*' : undefined));
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
    // Through the runtime's pointer arithmetic, which also takes an array:
    // C passes `output_data output[256]` to `output_data *output`, and ymfm
    // steps it with `output++` from the array itself.
    return `runtime.${operator === '+=' ? 'add' : 'subtract'}(${current}, ${right})`;
  }
  // `&=` is an intersection when the target is a rectangle and a bitwise AND
  // otherwise, and only the value knows which. The interpreter decides it by
  // shape at run time; emitting a bare `&` made `Number(rect) & Number(rect)`
  // zero and erased pacman's sprite clip.
  if (operator === '&=') {
    // Only a rectangle needs the shape test; a declared integer is an AND.
    return valueType && integerBitsForType(valueType) && !/\b(?:float|double)\b/.test(valueType)
      ? `((${current}) & (${right}))`
      : `runtime.andAssign(${current}, ${right})`;
  }
  // `>>=` follows the binary `>>` rule above: unsigned C++ shifts stay logical.
  return operator === '='
    ? right
    : (operator === '>>=' ? `runtime.shiftRight(${current}, ${right})` : `((${current}) ${operator.slice(0, -1)} (${right}))`);
}

/**
 * A copy of a class value C++ assigns by value: a rectangle (anything with
 * rectangle's `intersect`) is cloned, any other value passes through.
 * Self-contained, so board and device code emit it alike.
 */
function copiedValue(value: string): string {
  return `((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ` +
    `? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(${value})`;
}

function emitAddressOf(
  expression: GeneratedExpression,
  context: EmitContext,
): string {
  if (expression.kind === 'identifier' && !context.locals.has(expression.name) && context.compiled.has(expression.name)) {
    return emitExpression(expression, context);
  }
  if (expression.kind === 'index') {
    const object = emitExpression(expression.object, context);
    const index = emitExpression(expression.index, context);
    return context.pointerSafeIndex
      ? `runtime.addressOf(${object}, ${index})`
      : `({ generatedPointer: true, source: ${object}, offset: ${index} })`;
  }
  // A container's element reference -- `&v.emplace_back(...)`, `&v.back()`
  // -- is that element, an object whose address is itself.
  if (expression.kind === 'call' && expression.callee.kind === 'member' &&
      ['emplace_back', 'back', 'front'].includes(expression.callee.property)) {
    return emitExpression(expression, context);
  }
  if (expression.kind === 'call' && expression.callee.kind === 'member') {
    // A slot of an array of pointers holds a pointer to the object, whose
    // method is the one asked: `&bgpixmaps[i]->pix(y)` (as the interpreter).
    const receiver = emitExpression(expression.callee.object, context);
    const object = expression.callee.object.kind === 'index' ? `runtime.dereference(${receiver})` : receiver;
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
  if (expression.kind === 'member' && structFieldIsStruct(expression, context.definition)) {
    return emitExpression(expression, context);
  }
  // A PAIR or PAIR16 is an object too: `&m_s` is the 6809's stack register.
  if (expression.kind === 'identifier' && pairKind(expression, context)) {
    return emitExpression(expression, context);
  }
  // A reference parameter's address is its argument's (execute.ts lValue):
  // `set_regop8(uint8_t &reg) { m_reg8 = &reg; }`.
  if (expression.kind === 'identifier' && context.wrappedReferences.has(expression.name)) {
    const name = localName(expression.name);
    return `(${name}.address ? ${name}.address() : ({ generatedPointer: true, target: ${name}, offset: 0 }))`;
  }
  // A field's: in a union, the union and its path (runtime.fieldAddress).
  if (expression.kind === 'member') {
    return `runtime.fieldAddress(${emitExpression(expression.object, context)}, ${JSON.stringify(expression.property)})`;
  }
  // A call answering an object: that object (`&regop16() == &m_s`).
  if (expression.kind === 'call' && expression.callee.kind === 'identifier') {
    return `runtime.objectAddress(${emitExpression(expression, context)})`;
  }
  // `&m_value` on a scalar: the interpreter answers with a pointer whose target
  // is the slot's own get/set pair (execute.ts addressOf), so a callee that
  // stores through it -- `get_sample(..., &m_value)` -- writes the member with
  // its declared width. Emitted the same way, so both paths agree.
  if (expression.kind === 'identifier' && !namesStructMember(expression.name, context)) {
    return `({ generatedPointer: true, target: ${emitReferenceArgument(expression, context)}, offset: 0 })`;
  }
  throw new Error(`device codegen has unsupported address-of operand ${JSON.stringify(expression)}`);
}

/** Storage the source names, which a reference parameter can write back to. */
function isAssignableArgument(expression: GeneratedExpression): boolean {
  return expression.kind === 'identifier' || expression.kind === 'member' || expression.kind === 'index' ||
    (expression.kind === 'unary' && expression.operator === '*');
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
  // Its own address too, for a callee that takes it (`m_reg8 = &reg`): only
  // a field's, which can name a union; anything else keeps the slot itself.
  const address = expression.kind === 'member'
    ? `, address: () => runtime.fieldAddress(${emitExpression(expression.object, context)}, ${JSON.stringify(expression.property)})`
    : expression.kind === 'identifier' && (pairKind(expression, context) || namesStructMember(expression.name, context))
      ? `, address: () => ${emitExpression(expression, context)}`
      : '';
  return `({ generatedLValue: true, get: () => ${emitExpression(expression, context)}, ` +
    `set: (value${annotation}) => { ${target.code} = ${wrapTarget('value', target)}; }${address} })`;
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
  // Handing the value back cannot stand in for a reference the method keeps
  // the address of (the 6809's `m_reg8 = &reg`): that one stays a reference.
  if (assigned.length === 1 && takesAddress(method.program.operations, assigned[0]!.name)) return undefined;
  return assigned.length === 1 ? assigned[0]!.name : undefined;
}

/** Whether `&name` appears in these operations. */
function takesAddress(operations: GeneratedHandlerOperation[], name: string): boolean {
  let taken = false;
  visitOperations(operations, operation => visitOperationExpressions(operation, expression => {
    if (expression.kind === 'unary' && expression.operator === '&' &&
        expression.operand.kind === 'identifier' && expression.operand.name === name) taken = true;
  }));
  return taken;
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

function usesIdentifier(operations: GeneratedHandlerOperation[], name: string): boolean {
  let used = false;
  visitOperations(operations, operation => visitOperationExpressions(operation, expression => {
    if (expression.kind === 'identifier' && expression.name === name) used = true;
  }));
  return used;
}

/**
 * A handler-IR range-for (`for (auto &x : seq)`, lowered to an index loop over
 * `__rangeN`) whose body never stores to the element itself or takes its
 * address: the element can be read once an iteration. Its fields can still
 * be written, since it is the same object.
 */
function rangeLoopElement(operation: Extract<GeneratedHandlerOperation, { op: 'for' }>):
  { sequence: string; element: GeneratedExpression } | undefined {
  const [sequence, counter] = operation.initialize;
  if (sequence?.op !== 'declare' || !/^__range\d+$/.test(sequence.name)) return undefined;
  if (counter?.op !== 'declare' || counter.name !== `${sequence.name}_index`) return undefined;
  const isElement = (expression: GeneratedExpression) =>
    expression.kind === 'index' && expression.object.kind === 'identifier' && expression.object.name === sequence.name &&
    expression.index.kind === 'identifier' && expression.index.name === counter.name;
  let stored = false;
  visitOperations(operation.body, inner => {
    if (inner.op === 'assign' && isElement(inner.target)) stored = true;
    if ((inner.op === 'assign' && inner.target.kind === 'identifier' && [sequence.name, counter.name].includes(inner.target.name)) ||
        (inner.op === 'declare' && [sequence.name, counter.name].includes(inner.name))) stored = true;
    visitOperationExpressions(inner, expression => {
      if (expression.kind === 'assignment' && isElement(expression.target)) stored = true;
      if (expression.kind === 'unary' && expression.operator === '&' && isElement(expression.operand)) stored = true;
    });
  });
  return stored ? undefined : {
    sequence: sequence.name,
    element: { kind: 'index', object: { kind: 'identifier', name: sequence.name }, index: { kind: 'identifier', name: counter.name } },
  };
}

function methodTemp(context: EmitContext): string {
  const temps = context.temps ??= { count: 0 };
  return `__t${temps.count++}`;
}

function structPointerField(name: string, context: EmitContext): boolean {
  const structs = context.definition.structs ?? {};
  const types = Object.values(structs).flatMap(fields => fields.filter(field => field.name === name).map(field => field.valueType ?? ''));
  return types.length > 0 && types.every(type =>
    /\*\s*$/.test(type) && Boolean(structs[type.replace(/\bconst\b/g, '').replace(/\*/g, '').trim()]));
}

/**
 * Whether every store to a local is a whole statement `name = value`: no
 * `++`, no compound or nested assignment, and its address never taken, so
 * what it points at changes only where such a statement stands.
 */
function plainlyAssigned(operations: GeneratedHandlerOperation[], name: string): boolean {
  let plain = true;
  visitOperations(operations, operation => {
    if (operation.op === 'assign' && operation.target.kind === 'identifier' &&
      operation.target.name === name && operation.operator !== '=') plain = false;
    visitOperationExpressions(operation, expression => {
      if (expression.kind === 'assignment' && expression.target.kind === 'identifier' && expression.target.name === name) plain = false;
      if (expression.kind === 'unary' && expression.operator === '&' &&
        expression.operand.kind === 'identifier' && expression.operand.name === name) plain = false;
    });
  });
  return plain;
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
      // Its address taken is as good as written: the 6809's
      // `set_regop8(uint8_t &reg) { m_reg8 = &reg; }` keeps it, and every
      // `regop8() = ...` writes through. Passed by value, that wrote a dead
      // local and accumulator A never changed.
      if (expression.kind === 'unary' && expression.operator === '&' &&
          expression.operand.kind === 'identifier' && expression.operand.name === name) {
        assigned = true;
      }
    });
  });
  return assigned;
}

/**
 * The declared field a `x.y` assignment target names, when the scope knows the
 * struct it belongs to.
 *
 * The base is either a local whose declared type names a struct, or a member
 * the definition gave a field shape to. Subscripts pass straight through: an
 * array of structs has the element's fields, and `m_snd[0].signal` is the same
 * field as `m_snd[3].signal`.
 */
/**
 * Whether an expression names an array field of a struct.
 *
 * Such a field is always the plain JavaScript array the host built for it --
 * `structMember` creates it and nothing rebinds it to a pointer wrapper, a
 * typed view or a memory share -- so it can be indexed directly rather than
 * through the runtime's shape tests.
 */
function isDirectArray(expression: GeneratedExpression, context: EmitContext): boolean {
  if (isStructFieldArray(expression, context)) return true;
  if (expression.kind === 'identifier' && context.arrayLocals?.has(expression.name)) return true;
  // Fixed C arrays are allocated by the device host before any method runs
  // and C++ cannot rebind them to an offset pointer. Driver arrays still use
  // the lazy board-storage ABI, and pointer locals still need shape dispatch.
  return !context.boardScope && expression.kind === 'identifier' &&
    !context.locals.has(expression.name) &&
    context.definition.members.some(member =>
      member.name === expression.name && member.arrayLength !== undefined);
}

function isStructFieldArray(expression: GeneratedExpression, context: EmitContext): boolean {
  if (expression.kind !== 'member') return false;
  const field = structFieldOf(expression, context);
  return Boolean(field?.length) && !field?.fields;
}

function structFieldOf(
  expression: GeneratedExpression & { kind: 'member' },
  context: EmitContext,
): GeneratedStructField | undefined {
  const fields = structFieldsOf(expression.object, context);
  return fields?.find(candidate => candidate.name === expression.property);
}

function structFieldsOf(
  expression: GeneratedExpression,
  context: EmitContext,
): GeneratedStructField[] | undefined {
  if (expression.kind === 'index' || (expression.kind === 'unary' && expression.operator === '*')) {
    return structFieldsOf(
      expression.kind === 'index' ? expression.object : expression.operand,
      context,
    );
  }
  if (expression.kind === 'member') {
    const field = structFieldOf(expression, context);
    return field?.fields ?? context.definition.structs?.[field?.valueType?.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim() ?? ''];
  }
  if (expression.kind !== 'identifier') return undefined;
  if (context.locals.has(expression.name)) {
    const valueType = context.locals.get(expression.name)
      ?.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim();
    return valueType ? context.definition.structs?.[valueType] : undefined;
  }
  const member = context.definition.members.find(
    candidate => candidate.name === expression.name);
  if (member?.fields) return member.fields;
  const valueType = member?.valueType?.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim();
  return valueType ? context.definition.structs?.[valueType] : undefined;
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
        // A pointer member steps through the runtime's pointer arithmetic:
        // discrete's `double_stack` pushes with `*p++ = v`.
        ...(member.valueType.includes('*') ? { valueType: member.valueType } : {}),
      };
    }
  }
  if (expression.kind === 'index') {
    return {
      code: `${emitExpression(expression.object, context)}[${emitExpression(expression.index, context)}]`,
    };
  }
  if (expression.kind === 'member') {
    // A struct field carries the width MAME declared it at, and the store
    // narrows to it here rather than through a runtime accessor on every
    // field of every struct. The Game Boy's wave channel walks its counters
    // in a loop that runs forty thousand times a frame.
    const field = structFieldOf(expression, context) ?? allocatedObjectField(expression, context);
    return {
      code: emitExpression(expression, context),
      ...(field?.bits ? { bits: field.bits, signed: field.signed } : {}),
      // A pointer field steps by pointer arithmetic, and so does one whose
      // type it cannot follow (a range-for element's): discrete's tasks read
      // each buffered source as `sn.buffer = *sn.ptr++`.
      ...(field?.valueType?.includes('*') || (!field?.bits && !field?.valueType) ? { pointerArithmetic: true } : {}),
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
  const arrays = new Set(context.arrayLocals);
  const others = new Set<string>();
  visitOperations(operations, operation => {
    if (operation.op !== 'declare') return;
    const inferred = operation.valueType === 'auto' && operation.value
      ? expressionValueType(operation.value, context)
      : undefined;
    context.locals.set(operation.name, inferred ?? operation.valueType);
    (allocatesAggregate(operation.value) ? arrays : others).add(operation.name);
  });
  // A name declared once as an array and once as anything else, or assigned
  // afterwards (a unique_ptr can be), keeps the shape dispatch.
  for (const name of arrays) {
    if (others.has(name) || assignsIdentifier(operations, name)) arrays.delete(name);
  }
  context.arrayLocals = arrays;
  const plain = new Map<string, string>();
  visitOperations(operations, operation => {
    if (operation.op !== 'declare' || !arrays.has(operation.name) || !operation.value) return;
    const element = operation.valueType?.replace(/\bconst\b/g, '').trim() ?? '';
    const value = operation.value;
    if (value.kind === 'call' && value.callee.kind === 'identifier' && value.callee.name === 'ARRAY' &&
        PLAIN_ARRAY_ELEMENTS.has(element) &&
        value.args.every(argument => argument.kind === 'number' && narrowed(argument.value, element) === argument.value)) {
      plain.set(operation.name, element);
    }
  });
  // Anything but a subscript -- an argument, an address, a copy -- may want the typed array.
  const subscripted = new Set<GeneratedExpression>();
  visitOperations(operations, operation => visitOperationExpressions(operation, expression => {
    if (expression.kind === 'index') subscripted.add(expression.object);
    if (expression.kind === 'lambda') for (const name of plain.keys()) plain.delete(name);
  }));
  visitOperations(operations, operation => visitOperationExpressions(operation, expression => {
    if (expression.kind === 'identifier' && plain.has(expression.name) && !subscripted.has(expression)) {
      plain.delete(expression.name);
    }
  }));
  context.plainArrayLocals = new Map([...context.plainArrayLocals ?? [], ...plain]);
}

/** Element types whose store wrapType narrows exactly as their typed array would. */
const PLAIN_ARRAY_ELEMENTS = new Set(['int', 's32', 'int32_t', 'u32', 'uint32_t', 'u16', 'uint16_t', 's16', 'int16_t', 's8', 'int8_t']);

/** A literal as the element type holds it. */
function narrowed(value: number, element: string): number {
  if (['u32', 'uint32_t'].includes(element)) return value >>> 0;
  if (['u16', 'uint16_t'].includes(element)) return value & 0xffff;
  if (['s16', 'int16_t'].includes(element)) return value << 16 >> 16;
  if (['s8', 'int8_t'].includes(element)) return value << 24 >> 24;
  return value | 0;
}

/** The IR's aggregate producers: a local C array, or a buffer it owns. */
function allocatesAggregate(value: GeneratedExpression | undefined): boolean {
  return value?.kind === 'call' && value.callee.kind === 'identifier' &&
    ['ALLOC', 'ALLOC16', 'ALLOC32', 'ALLOCF', 'ALLOC_OBJECTS', 'make_unique_clear', 'ARRAY'].includes(value.callee.name);
}

/**
 * Locals the method never names except to take their address (`&p`).
 */
function addressOnlyLocals(
  operations: GeneratedHandlerOperation[],
  locals: ReadonlySet<string>,
): Set<string> {
  const named = new Map<string, number>();
  const addressed = new Map<string, number>();
  visitOperations(operations, operation => {
    visitOperationExpressions(operation, expression => {
      if (expression.kind === 'identifier' && locals.has(expression.name)) {
        named.set(expression.name, (named.get(expression.name) ?? 0) + 1);
      } else if (
        expression.kind === 'unary' && expression.operator === '&' &&
        expression.operand.kind === 'identifier' && locals.has(expression.operand.name)
      ) {
        addressed.set(expression.operand.name, (addressed.get(expression.operand.name) ?? 0) + 1);
      }
    });
  });
  return new Set([...addressed].filter(([name, count]) => named.get(name) === count).map(([name]) => name));
}

const INTEGER_SCALAR_TYPE = /^(?:(?:const|unsigned|signed|long|short)\s+)*(?:u?int(?:8|16|32)_t|[us](?:8|16|32)|int|char|bool|short|unsigned|offs_t)$/;

/** Locals whose every declaration is an integer scalar (`uint8_t sx`). */
function integerScalarLocals(operations: GeneratedHandlerOperation[]): Set<string> {
  const scalar = new Set<string>();
  const other = new Set<string>();
  visitOperations(operations, operation => {
    if (operation.op !== 'declare') return;
    if (INTEGER_SCALAR_TYPE.test(operation.valueType?.trim() ?? '')) scalar.add(operation.name);
    else other.add(operation.name);
  });
  return new Set([...scalar].filter(name => !other.has(name)));
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
  // The scheduler chain and the delegate are emitted as one runtime service
  // (schedulerSynchronize); only the parameter is code of the method's own.
  const synchronize = schedulerSynchronize(expression);
  if (synchronize) {
    if (synchronize.parameter) visitExpression(synchronize.parameter, visit);
    return;
  }
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


/**
 * Whether a pointee type reinterprets byte memory as 16-bit, and with which
 * sign. Undefined for every other pointer cast, which stays an identity.
 */
function isBytePointerType(valueType: string | undefined): boolean {
  return /^(?:u8|uint8_t)$/.test((valueType ?? '').replace(/\bconst\b/g, '').replace(/[\s*]/g, ''));
}

function packedPointerView(valueType: string | undefined): string | undefined {
  const pointee = (valueType ?? '').replace(/\bconst\b/g, '').replace(/[\s*]/g, '');
  if (/^(?:u16|uint16_t)$/.test(pointee)) return 'false';
  if (/^(?:s16|int16_t)$/.test(pointee)) return 'true';
  if (/^(?:u32|uint32_t)$/.test(pointee)) return "'u32'";
  if (/^(?:s32|int32_t)$/.test(pointee)) return "'s32'";
  return undefined;
}

function wrapType(value: string, valueType?: string): string {
  if (valueType?.includes('*')) {
    // A pointer declaration is not a narrowing, but a *wider* element type
    // over byte memory is a reinterpreting view. MAME's byte-backed sprite
    // RAM is written through exactly this (`u16 *const spriteram16 =
    // reinterpret_cast<u16 *>(...)`), and emitting the bare byte array kept
    // the interpreter's view and the compiled one disagreeing: every
    // half-word store dropped its high byte.
    const pointee = valueType.replace(/\bconst\b/g, '').replace(/\s/g, '');
    if (/^(?:u16|uint16_t)\*$/.test(pointee)) return `runtime.packedView(${value}, false)`;
    if (/^(?:s16|int16_t)\*$/.test(pointee)) return `runtime.packedView(${value}, true)`;
    return value;
  }
  const normalized = valueType?.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim();
  if (normalized === 'bool') return `((${value}) ? 1 : 0)`;
  if (normalized === 'u8' || normalized === 'uint8_t') return `((${value}) & 0xff)`;
  if (normalized === 's8' || normalized === 'int8_t' || normalized === 'char') {
    return `((${value}) << 24 >> 24)`;
  }
  if (normalized === 'u16' || normalized === 'uint16_t' || normalized === 'unsigned short') return `((${value}) & 0xffff)`;
  if (normalized === 's16' || normalized === 'int16_t' || normalized === 'short') return `((${value}) << 16 >> 16)`;
  if (normalized === 'u32' || normalized === 'uint32_t') return `((${value}) >>> 0)`;
  if (normalized === 'int' || normalized === 's32' || normalized === 'int32_t') return `((${value}) | 0)`;
  return value;
}

/**
 * ALLOC carries only an element count, so its primitive result is byte-wide.
 * A local C array's declaration supplies the missing element type. Preserve
 * it in direct code just as the interpreter does: in particular, an `int[]`
 * must retain negative sentinels instead of wrapping -1 to 255.
 */
function wrapAllocatedArray(value: string, valueType?: string): string {
  const normalized = valueType?.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim();
  const constructor = normalized === 'float' ? 'Float32Array'
    : normalized === 'double' ? 'Float64Array'
    : ['int', 'int32_t', 's32'].includes(normalized ?? '') ? 'Int32Array'
    : ['unsigned', 'uint32_t', 'u32', 'offs_t', 'pen_t', 'rgb_t']
        .includes(normalized ?? '') ? 'Uint32Array'
    : ['int16_t', 's16'].includes(normalized ?? '') ? 'Int16Array'
    : ['uint16_t', 'u16'].includes(normalized ?? '') ? 'Uint16Array'
    : ['int8_t', 's8'].includes(normalized ?? '') ? 'Int8Array'
    : undefined;
  return constructor ? `new ${constructor}(${value})` : value;
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
/** attotime's accessors, as attotimeSecondsMethod answers them for a number. */
const ATTOTIME_METHODS = new Set(['as_ticks', 'as_double', 'as_attoseconds', 'is_never', 'is_zero', 'attoseconds', 'seconds']);

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

/** Whether `object.field` names a field that holds a struct (one with fields of its own). */
function structFieldIsStruct(
  expression: GeneratedExpression & { kind: 'member' },
  definition: CodegenScope,
): boolean {
  const fieldsOf = (target: GeneratedExpression): readonly GeneratedStructField[] | undefined => {
    if (target.kind === 'index') return fieldsOf(target.object);
    if (target.kind === 'identifier') {
      const member = definition.members.find(candidate => candidate.name === target.name) as
        { fields?: GeneratedStructField[]; valueType?: string } | undefined;
      return member?.fields ?? (member?.valueType ? definition.structs?.[member.valueType] : undefined);
    }
    if (target.kind === 'member') {
      const field = fieldsOf(target.object)?.find(candidate => candidate.name === target.property);
      return field?.fields ?? (field?.valueType ? definition.structs?.[field.valueType] : undefined);
    }
    return undefined;
  };
  const field = fieldsOf(expression.object)?.find(candidate => candidate.name === expression.property);
  return Boolean(field && !field.length && (field.fields?.length || (field.valueType && definition.structs?.[field.valueType]?.length)));
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

/**
 * Whether evaluating this expression can only produce a value.
 *
 * A call may do anything and an assignment stores, so neither qualifies;
 * everything else in the IR is arithmetic over reads.
 */
function isSideEffectFreeExpression(expression: GeneratedExpression): boolean {
  let pure = true;
  visitExpression(expression, inner => {
    if (inner.kind === 'call' || inner.kind === 'assignment') pure = false;
  });
  return pure;
}

/**
 * Whether a declared type proves the value is a number rather than memory.
 *
 * An absent type proves nothing, and `auto` is what the normalizer leaves for
 * a declaration whose type it did not keep.
 */
function isKnownNumericType(valueType: string | undefined): boolean {
  if (!valueType) return false;
  const declared = valueType.trim();
  if (declared === 'auto' || declared.includes('*') || declared.includes('&')) return false;
  return true;
}
