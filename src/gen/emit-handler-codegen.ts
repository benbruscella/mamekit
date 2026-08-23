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
// JavaScript. Selection stays a property of the IR — nested loop depth — and
// never of a game or driver name.

import {
  codegenWrappedParameters,
  generatedDeviceMethodsSource,
  type CodegenScope,
} from '../mame/device-codegen.ts';
import type {
  BoardIr,
  GeneratedHandler,
  GeneratedHandlerOperation,
} from '../ir/board.ts';

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
  const visitOperations = (operations: readonly GeneratedHandlerOperation[]): void => {
    for (const operation of operations) {
      if (operation.op === 'assign') {
        let target = operation.target;
        while (target.kind === 'index' || target.kind === 'member') {
          target = target.object;
        }
        if (target.kind === 'identifier' && target.name.startsWith('m_')) {
          names.add(target.name);
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
 * Handlers whose object handling the emitter cannot reproduce from types alone.
 *
 * Calling a method on a local rather than on a board-bound member
 * (`pixmap.width()`) is one: the board exposes those framework surfaces as
 * data in some places and as calls in others, and only the value says which,
 * so the emitter cannot choose between a property and a call from the type.
 *
 * Passing an object straight to a call is not this, so a renderer that hands
 * `bitmap` and its clip rectangle to `transpen` still compiles.
 */
function callsMethodOnLocal(
  handler: GeneratedHandler,
  bound: ReadonlySet<string>,
): boolean {
  let found = false;
  const visitExpression = (expression: unknown): void => {
    if (found || !expression || typeof expression !== 'object') return;
    const node = expression as {
      kind?: string;
      callee?: { kind?: string; object?: { kind?: string; name?: string } };
    };
    if (node.kind === 'call' && node.callee?.kind === 'member') {
      let base = node.callee.object as { kind?: string; name?: string; object?: unknown };
      while (base && (base.kind === 'index' || base.kind === 'member')) {
        base = base.object as { kind?: string; name?: string; object?: unknown };
      }
      if (base?.kind === 'identifier' && !bound.has(base.name!)) found = true;
    }
    for (const value of Object.values(expression)) {
      if (Array.isArray(value)) value.forEach(visitExpression);
      else visitExpression(value);
    }
  };
  const visitOperations = (operations: readonly GeneratedHandlerOperation[]): void => {
    for (const operation of operations) {
      for (const [key, value] of Object.entries(operation)) {
        if (key === 'op') continue;
        if (Array.isArray(value) && value.length && typeof value[0] === 'object') {
          const entries = value as { op?: string; body?: GeneratedHandlerOperation[] }[];
          if (entries[0]?.op) { visitOperations(entries as GeneratedHandlerOperation[]); continue; }
          let nested = false;
          for (const entry of entries) if (entry.body) { visitOperations(entry.body); nested = true; }
          if (nested) continue;
        }
        visitExpression(value);
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

export function boardCodegenScope(machine: BoardIr, ownerClass: string): CodegenScope {
  const handlers = (machine.handlers ?? []).filter(handler =>
    handler.program && handler.program.diagnostics.length === 0);
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
    constants: Object.assign(
      {},
      ...handlers
        .filter(handler => handler.ownerClass === ownerClass)
        .map(handler => handler.constants ?? {}),
    ) as Record<string, number>,
    // The board resolves a member's width from its own binding, so the emitter
    // is told the name exists and nothing more. Declaring a width here would
    // narrow a value the board did not narrow.
    members: members.map(([name, valueType]) => ({ name, valueType })),
    callbacks: [],
    timers: [],
    boardScope: true,
    methods: [...byMethod.values()].map(handler => ({
      name: handler.method,
      parameters: handler.parameters ?? '',
      program: handler.program!,
      source: handler.source ?? { file: machine.driverFile, line: 0 },
    })),
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
    const exported = source.methods.filter(method =>
      own.has(method) &&
      !usesDevicePalette(scope, method) &&
      !usesWrappedParameters(scope, method) &&
      !source.methods.some(name => {
        const candidate = byMethod.get(name);
        if (!candidate) return false;
        return writesUnboundMemory(candidate, bound) ||
          callsMethodOnLocal(candidate, bound);
      }));
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
