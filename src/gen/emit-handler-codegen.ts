// Direct JavaScript for expensive driver handlers.
//
// `src/mame/device-codegen.ts` already emits static JavaScript for device
// methods whose IR shape shows nested hot loops, because walking one closure
// per operation is not affordable at pixel scale. A driver's own renderer has
// exactly that shape and none of that treatment: MAME's 1942 draws sprites per
// scanline, so its board evaluates ~5,400 sprite entries a frame through the
// generic interpreter.
//
// This derives the same emitter's neutral scope from BoardIr, so board handlers
// and device methods share one definition of what a lowered operation means as
// JavaScript. Selection stays a property of the IR — nested loop depth, plus
// how the board wires a handler (a CPU-range dispatch runs per bus access, a
// tile-info callback per tile) — and never of a game or driver name.

import {
  calledIdentifiers,
  codegenWrappedParameters,
  generatedDeviceMethodsSource,
  type CodegenScope,
} from '../mame/device-codegen.ts';
import type {
  BoardIr,
  GeneratedHandler,
  GeneratedHandlerOperation,
} from '../ir/board.ts';
import { DEFAULT_CONSTANTS } from '../ir/execute.ts';

/**
 * The names a board binds into handler state.
 *
 * This mirrors what `generated-board.ts` actually materialises, because an
 * identifier the emitter cannot resolve must fall back to the interpreter
 * rather than compile to a reference to nothing. A share becomes `m_<tag>`
 * plus any declared aliases; a device finder keeps its source member spelling.
 */
function boardMemberNames(machine: BoardIr): Map<string, string> {
  const names = new Map<string, string>();
  // Share-bound members are byte-addressed memory, and MAME drivers do pointer
  // arithmetic on them (`m_digdug_objram + 0x380`). The emitter decides
  // between an address and a sum from the declared type, so leaving it blank
  // turned every such sprite base into NaN and drew nothing at all.
  const memory = 'uint8_t *';
  for (const cpu of machine.execution.cpus) {
    for (const range of [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])]) {
      if (range.share) names.set(`m_${range.share}`, memory);
    }
  }
  for (const binding of machine.execution.shareBindings ?? []) {
    names.set(binding.member, memory);
    names.set(`m_${binding.share}`, memory);
  }
  for (const device of machine.devices ?? []) {
    if (device.member) names.set(device.member, '');
  }
  for (const bank of machine.execution.banks ?? []) {
    if (bank.member) names.set(bank.member, '');
  }
  // A driver's ioport finders are members like any other -- the board binds
  // each one to its live port -- and MAME reads a control through the finder
  // (`m_inputs->read()`). Leaving them out declined every handler that reads a
  // control, which on the Game Boy is the joypad register itself.
  for (const input of machine.execution.inputMembers ?? []) {
    names.set(input.member, '');
  }
  // A region_ptr finder is a byte array the board binds from the ROM set, and
  // MAME indexes it directly (`return m_region_boot[offset];`).
  for (const member of Object.keys(machine.execution.regionBindings ?? {})) {
    names.set(member, memory);
  }
  // A memory_view the board composes: `m_boot_view.disable()` is a call on a
  // member the runtime binds, not an unknown name.
  for (const cpu of machine.execution.cpus) {
    for (const range of cpu.ranges ?? []) {
      if (range.viewTag) names.set(range.viewTag, '');
    }
  }
  // Video-plan initial state (CPS-B configuration, scroll registers, size
  // constants) is written into the board's members before any handler runs,
  // so emitted code may read it exactly as the interpreter does.
  for (const member of Object.keys(machine.video?.initialState ?? {})) {
    names.set(member, '');
  }
  return names;
}

/**
 * Driver state that is neither a share nor a device: plain C++ members the
 * board materialises the first time a handler writes one. They are only
 * discoverable from the handlers themselves, which is also exactly how the
 * interpreter treats them.
 */
function assignedMemberNames(handlers: readonly GeneratedHandler[]): Set<string> {
  const names = new Set<string>();
  const claimRoot = (expression: { kind: string } | undefined): void => {
    let target = expression as
      | { kind: string; name?: string; object?: { kind: string } }
      | undefined;
    while (target && (target.kind === 'index' || target.kind === 'member')) {
      target = target.object as typeof target;
    }
    if (target?.kind === 'identifier' && target.name?.startsWith('m_')) {
      names.add(target.name);
    }
  };
  const visitOperations = (operations: readonly GeneratedHandlerOperation[]): void => {
    for (const operation of operations) {
      if (operation.op === 'assign') {
        claimRoot(operation.target);
      }
      // A memset/memcpy target is written just as surely as an assignment
      // target: MAME lifecycle methods initialise member arrays this way
      // (`memset(m_empty_tile, 0x0f, ...)`), and the interpreter materialises
      // the member when that runs.
      if (operation.op === 'call' &&
        operation.expression.callee.kind === 'identifier' &&
        (operation.expression.callee.name === 'memset' ||
          operation.expression.callee.name === 'memcpy')) {
        claimRoot(operation.expression.args[0]);
      }
      for (const value of Object.values(operation)) {
        if (Array.isArray(value) && value.length && typeof value[0] === 'object') {
          const entries = value as { op?: string; body?: GeneratedHandlerOperation[] }[];
          if (entries[0]?.op) visitOperations(entries as GeneratedHandlerOperation[]);
          else for (const entry of entries) if (entry.body) visitOperations(entry.body);
        }
      }
    }
  };
  for (const handler of handlers) visitOperations(handler.program?.operations ?? []);
  return names;
}

/**
 * The emitter's scope for one driver class.
 *
 * Handlers are keyed by method name because that is how the source calls them
 * and how the interpreter resolves them; the declaring class disambiguates only
 * when two classes share a method, in which case the same-class handler wins.
 */
/**
 * Members a handler writes through an index without the board having bound
 * them to memory.
 *
 * The interpreter materialises such an array the first time a handler indexes
 * into it — `uint8_t m_draw_order[32][4]` exists only because taitosj writes
 * to it. Emitted code has no such moment: it writes straight into `undefined`.
 * A handler that needs that materialisation stays interpreted.
 */
function writesUnboundMemory(
  handler: GeneratedHandler,
  bound: ReadonlySet<string>,
): boolean {
  let found = false;
  const visitOperations = (operations: readonly GeneratedHandlerOperation[]): void => {
    for (const operation of operations) {
      if (operation.op === 'assign' && operation.target.kind === 'index') {
        let base = operation.target.object;
        while (base.kind === 'index' || base.kind === 'member') base = base.object;
        if (base.kind === 'identifier' && base.name.startsWith('m_') && !bound.has(base.name)) {
          found = true;
        }
      }
      for (const value of Object.values(operation)) {
        if (Array.isArray(value) && value.length && typeof value[0] === 'object') {
          const entries = value as { op?: string; body?: GeneratedHandlerOperation[] }[];
          if (entries[0]?.op) visitOperations(entries as GeneratedHandlerOperation[]);
          else for (const entry of entries) if (entry.body) visitOperations(entry.body);
        }
      }
    }
  };
  visitOperations(handler.program?.operations ?? []);
  return found;
}


/**
 * Every driver member a handler names, so selection can require that the board
 * actually binds them.
 *
 * Scalar driver state (`m_star_rng_origin`, `m_stars_enabled`) has no binding:
 * the board materialises it as handlers touch it, and its lifecycle lives in
 * the interpreter. Share memory and device finders, by contrast, are bound
 * before any handler runs and mean the same thing to emitted code.
 */
function referencedMembers(handler: GeneratedHandler): Set<string> {
  const names = new Set<string>();
  const visit = (node: unknown): void => {
    if (!node || typeof node !== 'object') return;
    const expression = node as { kind?: string; name?: string };
    if (expression.kind === 'identifier' && expression.name?.startsWith('m_')) {
      names.add(expression.name);
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else visit(value);
    }
  };
  visit(handler.program?.operations ?? []);
  return names;
}

/**
 * Handlers that are hot by wiring rather than by shape: a method a CPU address
 * range dispatches runs on every bus access to that range, a tilemap's
 * tile-info or scan callback runs per tile, and the screen-update method runs
 * every frame. Their bodies are often small and loop-free, so shape selection
 * never picks them, yet their call counts dominate interpreter time.
 */
function wiredHotMethods(machine: BoardIr, ownerClass: string): string[] {
  const names = new Set<string>();
  const claim = (key: string | undefined): void => {
    if (!key) return;
    const dot = key.indexOf('.');
    if (dot < 0 || key.slice(0, dot) !== ownerClass) return;
    names.add(key.slice(dot + 1));
  };
  for (const cpu of machine.execution.cpus) {
    for (const range of [
      ...(cpu.ranges ?? []),
      ...(cpu.opcode?.ranges ?? []),
      ...(cpu.io?.ranges ?? []),
    ]) {
      claim(range.read);
      claim(range.write);
    }
  }
  for (const map of machine.maps ?? []) {
    for (const range of map.ranges) {
      claim(range.read);
      claim(range.write);
    }
  }
  for (const tilemap of machine.video?.tilemaps ?? []) {
    claim(tilemap.tileInfo);
    claim(tilemap.mapper);
  }
  claim(machine.execution.screenUpdate?.handler);
  return [...names];
}

/**
 * A method that stores through a pointer parameter (`*counter = ...` — the
 * MAME out-parameter idiom) only works compiled when its caller hands it a
 * real generated pointer. The board dispatch unwraps interpreted callers'
 * l-values to plain numbers, so such a method must stay on the interpreter,
 * whose l-value semantics make the write land. In-closure emitted callers are
 * unaffected: their address-of arguments are real pointers.
 */
function writesThroughPointerParameter(handler: GeneratedHandler): boolean {
  const pointerNames = new Set(
    (handler.parameters ?? '')
      .split(',')
      .filter(parameter => parameter.includes('*'))
      .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
      .filter((name): name is string => Boolean(name)),
  );
  if (!pointerNames.size) return false;
  let found = false;
  const targetsPointer = (target: { kind: string } | undefined): boolean => {
    let node = target as
      | { kind: string; name?: string; operator?: string;
          object?: { kind: string }; operand?: { kind: string } }
      | undefined;
    if (node?.kind === 'unary' && node.operator === '*') node = node.operand as typeof node;
    while (node && (node.kind === 'index' || node.kind === 'member')) {
      node = node.object as typeof node;
    }
    return node?.kind === 'identifier' && pointerNames.has(node.name ?? '');
  };
  const visitOperations = (operations: readonly GeneratedHandlerOperation[]): void => {
    for (const operation of operations) {
      if (operation.op === 'assign' && targetsPointer(operation.target)) found = true;
      for (const value of Object.values(operation)) {
        if (Array.isArray(value) && value.length && typeof value[0] === 'object') {
          const entries = value as { op?: string; body?: GeneratedHandlerOperation[] }[];
          if (entries[0]?.op) visitOperations(entries as GeneratedHandlerOperation[]);
          else for (const entry of entries) if (entry.body) visitOperations(entry.body);
        }
      }
    }
  };
  visitOperations(handler.program?.operations ?? []);
  return found;
}

/**
 * A 64-bit literal promotes its expression past what a JavaScript number holds.
 * The interpreter evaluates those exactly; emitted arithmetic is plain
 * `number`, so a handler carrying one stays interpreted.
 */
function containsWideLiteral(handler: GeneratedHandler): boolean {
  return JSON.stringify(handler.program?.operations ?? []).includes('"wide":');
}

export function boardCodegenScope(machine: BoardIr, ownerClass: string): CodegenScope {
  const handlers = (machine.handlers ?? []).filter(handler =>
    handler.program && handler.program.diagnostics.length === 0 &&
    !containsWideLiteral(handler));
  const byMethod = new Map<string, GeneratedHandler>();
  for (const handler of handlers) {
    if (handler.ownerClass === ownerClass || !byMethod.has(handler.method)) {
      byMethod.set(handler.method, handler);
    }
  }
  const bound = boardMemberNames(machine);
  const members = [
    ...bound,
    ...[...assignedMemberNames(handlers)].map(name => [name, ''] as const),
  ];
  return {
    hotMethods: wiredHotMethods(machine, ownerClass),
    // Only the interpreter's shared line/IRQ constants live at scope level.
    // A handler's own constants stay on its method entry: template expansions
    // (`videoram_w<Which>` as videoram_w_0/videoram_w_1) give the same name a
    // different value per method, and merging them here handed every handler
    // the last one's value.
    constants: { ...DEFAULT_CONSTANTS },
    // The board resolves a member's width from its own binding, so the emitter
    // is told the name exists and nothing more. Declaring a width here would
    // narrow a value the board did not narrow.
    members: members.map(([name, valueType]) => ({ name, valueType })),
    callbacks: [],
    timers: [],
    boardScope: true,
    methods: [...byMethod.values()].map(handler => {
      // The interpreter derives Which from the expanded method name's _N
      // suffix, overriding whatever the handler's constant table says; the
      // emitted method must resolve the same value.
      const suffix = /_(\d+)$/.exec(handler.method);
      return {
        name: handler.method,
        parameters: handler.parameters ?? '',
        program: handler.program!,
        source: handler.source ?? { file: machine.driverFile, line: 0 },
        constants: {
          ...handler.constants,
          ...(suffix ? { Which: Number(suffix[1]) } : {}),
        },
      };
    }),
  };
}

/**
 * Emitted compiled handlers for a board, keyed by "OwnerClass.method".
 *
 * Returns an empty map when no handler qualifies, which leaves every handler on
 * the interpreter exactly as before.
 */
export function generatedBoardHandlersSource(
  machine: BoardIr,
  typescript = false,
): { source: string; handlers: string[] } {
  // Driver classes only. A board's handler list also carries device methods
  // (`starfield_05xx_device.get_next_lfsr_state`), and those already reach the
  // emitter through their own device package, whose scope knows their members,
  // links and timers. Compiling them again against a board's scope would emit
  // the same method against the wrong environment.
  const ownerClasses = [...new Set(
    (machine.handlers ?? [])
      .filter(handler =>
        handler.program &&
        handler.program.diagnostics.length === 0 &&
        !containsWideLiteral(handler) &&
        !handler.ownerClass.endsWith('_device'))
      .map(handler => handler.ownerClass),
  )];
  const parts: string[] = [];
  const emitted: string[] = [];
  for (const ownerClass of ownerClasses) {
    const scope = boardCodegenScope(machine, ownerClass);
    const own = new Set(
      (machine.handlers ?? [])
        .filter(handler => handler.ownerClass === ownerClass)
        .map(handler => handler.method),
    );
    const source = generatedDeviceMethodsSource(scope, typescript);
    // Only this class's own handlers are exported. A dependency pulled in from
    // another class is compiled into the same closure, but its board key
    // belongs to its declaring class.
    const bound = new Set(boardMemberNames(machine).keys());
    const byMethod = new Map(
      (machine.handlers ?? []).map(candidate => [candidate.method, candidate]),
    );
    // A method the board must not dispatch compiled — it materialises unbound
    // memory or reads a palette this scope cannot supply — taints every
    // emitted method that reaches it through a direct in-closure call, because
    // those calls bypass the interpreter fallback.
    const closureMethods = new Set(source.methods);
    const tainted = new Set(source.methods.filter(method => {
      const candidate = byMethod.get(method);
      return (candidate !== undefined && writesUnboundMemory(candidate, bound)) ||
        usesDevicePalette(scope, method);
    }));
    let spread = true;
    while (spread) {
      spread = false;
      for (const method of source.methods) {
        if (tainted.has(method)) continue;
        const target = scope.methods.find(candidate => candidate.name === method);
        if (!target) continue;
        for (const name of calledIdentifiers(target.program.operations)) {
          if (closureMethods.has(name) && tainted.has(name)) {
            tainted.add(method);
            spread = true;
            break;
          }
        }
      }
    }
    const exported = source.methods.filter(method =>
      own.has(method) &&
      !tainted.has(method) &&
      !usesWrappedParameters(scope, method) &&
      !(byMethod.get(method) && writesThroughPointerParameter(byMethod.get(method)!)));
    if (!exported.length) continue;
    parts.push(`  ...(() => {
    const methods = ${source.source};
    return {
${exported.map(method =>
      `      ${JSON.stringify(`${ownerClass}.${method}`)}: methods[${JSON.stringify(method)}]`)
      .join(',\n')},
    };
  })(),`);
    emitted.push(...exported.map(method => `${ownerClass}.${method}`));
  }
  if (!parts.length) return { source: '{}', handlers: [] };
  return { source: `{\n${parts.join('\n')}\n}`, handlers: emitted };
}

/**
 * A bare `pen_color`/`set_pen_color` call is a device-side idiom: the emitter
 * turns it into an index of `runtime.palette`, which a board's palette is not.
 * A driver reaches its palette through `m_palette->...` instead, so a handler
 * spelling it the device way stays on the interpreter rather than reading a
 * table this scope cannot supply.
 */
function usesDevicePalette(scope: CodegenScope, method: string): boolean {
  const target = scope.methods.find(candidate => candidate.name === method);
  if (!target) return false;
  let found = false;
  const visitExpression = (expression: unknown): void => {
    if (!expression || typeof expression !== 'object') return;
    const node = expression as { kind?: string; callee?: { kind?: string; name?: string } };
    if (
      node.kind === 'call' &&
      node.callee?.kind === 'identifier' &&
      (node.callee.name === 'pen_color' || node.callee.name === 'set_pen_color')
    ) found = true;
    for (const value of Object.values(expression)) {
      if (Array.isArray(value)) value.forEach(visitExpression);
      else visitExpression(value);
    }
  };
  visitExpression(target.program.operations);
  return found;
}

/**
 * A source method that assigns through a C++ reference parameter is emitted
 * against a get/set wrapper ABI. The board calls its handlers with plain
 * values, so such a handler stays on the interpreter rather than being handed
 * arguments in a shape it does not expect.
 *
 * `bitmap_ind16 &bitmap` is not one of these: a renderer mutates what the
 * reference points at without ever reassigning the reference itself.
 */
function usesWrappedParameters(scope: CodegenScope, method: string): boolean {
  const target = scope.methods.find(candidate => candidate.name === method);
  return target ? codegenWrappedParameters(target).length > 0 : false;
}
