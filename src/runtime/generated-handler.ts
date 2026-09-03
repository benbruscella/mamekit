// Board wiring for generated handler IR: bus handlers and device signals.
// The interpreter itself is neutral and lives in src/ir/execute.ts.

import type { HandlerRegistry, ReadHandler, WriteHandler } from './bus.ts';
import type { BoardIr, GeneratedHandler } from '../ir/board.ts';
import {
  executeGeneratedMachineHandler,
  type GeneratedHandlerBindings,
} from '../ir/execute.ts';
import { wireDeviceCallbacks, type CallbackDevice } from './generated-machine.ts';
import { applyBoardTransforms, type BoundEffect } from './generated-effects.ts';

export type {
  GeneratedCallArgument,
  GeneratedHandlerBindings,
  GeneratedLValue,
} from '../ir/execute.ts';
export {
  applyCombineData,
  applyGeneratedAndAssign,
  applyGeneratedDivision,
  applyGeneratedMacro,
  compileGeneratedMachineHandler,
  dereferenceGeneratedValue,
  executeGeneratedCallbackHandler,
  executeGeneratedHandler,
  executeGeneratedMachineHandler,
  executeGeneratedMachineProgram,
  executeGeneratedProgram,
  generatedContainerAccessor,
  generatedPeriodicLines,
  generatedAdd,
  generatedPointerStore,
  generatedWideBinary,
  generatedReferent,
  GENERATED_FIELD_WIDTHS,
  prepareGeneratedMachineHandler,
  generatedValuesEqual,
} from '../ir/execute.ts';

/**
 * Build executable bus handlers for source methods that compiled without
 * diagnostics. Runtime device-tag handlers are intentionally not synthesized;
 * they belong to reusable device implementations.
 */
export function generatedHandlerRegistry(
  machine: BoardIr,
  bindings: GeneratedHandlerBindings = {},
): HandlerRegistry {
  const registry: HandlerRegistry = { read: {}, write: {} };
  const handlers = new Map(
    (machine.handlers ?? [])
      .filter(handler => handler.program && handler.program.diagnostics.length === 0)
      .map(handler => [`${handler.ownerClass}.${handler.method}`, handler]),
  );
  // Which MAME classes each device tag's methods may come from. A map entry
  // names a device tag, not a class, so `watchdog.reset_w` and the Arkanoid
  // MCU interface's `reset_w` are the same bare method name on two unrelated
  // devices. Resolving by name alone sent every watchdog kick into the MCU's
  // reset line, holding the 68705 in reset for the whole boot handshake.
  const deviceClasses = new Map(
    (machine.devices ?? [])
      .filter(device => device.classHierarchy?.length)
      .map(device => [device.tag, device.classHierarchy!]),
  );
  const ownedClasses = new Set([...deviceClasses.values()].flat());
  const resolve = (key: string): GeneratedHandler | undefined => {
    const exact = handlers.get(key);
    if (exact) return exact;
    const separator = key.indexOf('.');
    const tag = key.slice(0, separator);
    const method = key.slice(separator + 1);
    const hierarchy = deviceClasses.get(tag);
    for (const className of hierarchy ?? []) {
      const owned = handlers.get(`${className}.${method}`);
      if (owned) return owned;
    }
    // The device's own classes have no such compiled method. A same-named
    // method that belongs to *another* device is never a substitute — that is
    // what routed every `watchdog.reset_w` kick into the Arkanoid MCU's reset
    // line — while one declared by the driver itself still is.
    const matches = [...handlers.values()].filter(handler =>
      handler.method === method &&
      (hierarchy?.includes(handler.ownerClass) || !ownedClasses.has(handler.ownerClass)));
    return matches.length === 1 ? matches[0] : undefined;
  };

  const executableRanges = machine.execution.cpus.flatMap(cpu => [
    ...(cpu.ranges ?? []),
    ...(cpu.opcode?.ranges ?? []),
    ...(cpu.io?.ranges ?? []),
  ]);
  // The CPU whose map names a handler is the one whose address_space MAME
  // hands it, so resolve that before the handler is built rather than falling
  // back to the first CPU on a two-CPU board.
  const cpuTagFor = (key: string): string | undefined =>
    machine.execution.cpus.find(cpu =>
      [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? []), ...(cpu.opcode?.ranges ?? [])]
        .some(range => range.read === key || range.write === key))?.tag;
  for (const ranges of [
    ...(machine.maps ?? []).map(map => map.ranges),
    executableRanges,
  ]) {
    for (const range of ranges) {
      if (range.read) {
        const handler = resolve(range.read);
        if (handler?.program && !registry.read[range.read]) {
          registry.read[range.read] =
            makeReadHandler(machine, handler, bindings, cpuTagFor(range.read));
        }
      }
      if (range.write) {
        const handler = resolve(range.write);
        if (handler?.program && !registry.write[range.write]) {
          registry.write[range.write] =
            makeWriteHandler(machine, handler, bindings, cpuTagFor(range.write));
        }
      }
    }
  }
  return registry;
}

/**
 * MAME's `address_space &space` handler parameter, when the source declares
 * one. Congo Bongo's sprite DMA reads its source list straight out of the
 * program space through it.
 */
function handlerSpace(
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
  cpuTag: string | undefined,
): Record<string, unknown> {
  return /\baddress_space\b/.test(handler.parameters ?? '') && bindings.addressSpace
    ? { space: bindings.addressSpace(cpuTag) }
    : {};
}

/** Wire a generated device signal to the effects bound for its callbacks. */

/** Wire a generated device signal to the effects bound for its callbacks. */
export function wireGeneratedDevice(
  device: CallbackDevice,
  machine: BoardIr,
  ownerTag: string,
  signal: string,
  effects: Map<string, BoundEffect>,
): string[] {
  return wireDeviceCallbacks(device, machine, ownerTag, signal, effects);
}


export function dispatchGeneratedCallbacks(
  machine: BoardIr,
  ownerTag: string,
  signal: string,
  state: number,
  effects: Map<string, BoundEffect>,
): string[] {
  const bound: string[] = [];
  for (const callback of machine.callbacks) {
    if (callback.ownerTag !== ownerTag || callback.signal !== signal) continue;
    bound.push(...dispatchGeneratedCallback(machine, callback.id, state, effects));
  }
  return bound;
}


export function dispatchGeneratedCallback(
  machine: BoardIr,
  callbackId: string,
  state: number,
  effects: Map<string, BoundEffect>,
): string[] {
  const effect = effects.get(callbackId);
  if (!effect) {
    throw new Error(
      `${machine.game}: callback "${callbackId}" has no bound effect — ` +
      'every connection is resolved at generation time, so this is a composition bug',
    );
  }
  effect.run(applyBoardTransforms(state, effect.transforms));
  return [callbackId];
}


function makeReadHandler(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
  cpuTag?: string,
): ReadHandler {
  const space = handlerSpace(handler, bindings, cpuTag);
  return (addr, offset, memMask) => executeGeneratedMachineHandler(
    machine,
    handler,
    bindings,
    {
      addr,
      offset,
      ...space,
      ...(memMask !== undefined ? { mem_mask: memMask } : {}),
    },
  ) ?? 0xff;
}


function makeWriteHandler(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
  cpuTag?: string,
): WriteHandler {
  const directVideoRamWrite = makeDirectVideoRamWrite(handler, bindings);
  if (directVideoRamWrite) return directVideoRamWrite;
  const directObjectRamWrite = makeDirectObjectRamWrite(handler, bindings);
  if (directObjectRamWrite) return directObjectRamWrite;
  const space = handlerSpace(handler, bindings, cpuTag);
  return (addr, offset, data, memMask) => {
    executeGeneratedMachineHandler(
      machine,
      handler,
      bindings,
      {
        addr,
        offset,
        data,
        state: data,
        ...space,
        ...(memMask !== undefined ? { mem_mask: memMask } : {}),
      },
    );
  };
}

/**
 * Direct form of the Galaxian-family object-RAM update shape. This is matched
 * from the complete source body before specializing; boards with a different
 * handler continue through the general interpreter.
 */
function makeDirectObjectRamWrite(
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
): WriteHandler | undefined {
  const body = handler.body ?? '';
  if (
    !body.includes('m_screen->update_partial(m_screen->vpos())') ||
    !body.includes('m_spriteram[offset] = data') ||
    !body.includes('if (offset < 0x40)') ||
    !body.includes('m_frogger_adjust') ||
    !body.includes('m_bg_tilemap->set_scrolly(offset >> 1, data)') ||
    !body.includes('m_bg_tilemap->set_scrollx(offset >> 1, m_x_scale*data)') ||
    !body.includes('m_bg_tilemap->mark_tile_dirty(offset)')
  ) return undefined;

  return (_address, initialOffset, initialData) => {
    const members = bindings.members ?? {};
    const screen = members.m_screen as {
      vpos(): number;
      update_partial(line: number): void;
    };
    const spriteRam = members.m_spriteram as { [index: number]: number };
    const tilemap = members.m_bg_tilemap as {
      set_scrolly(column: number, value: number): void;
      set_scrollx(row: number, value: number): void;
      mark_tile_dirty(offset: number): void;
    };
    let offset = initialOffset;
    let data = initialData;
    screen.update_partial(screen.vpos());
    spriteRam[offset] = data;
    if (offset >= 0x40) return;
    if ((offset & 1) === 0) {
      if (members.m_frogger_adjust) data = ((data >> 4) | (data << 4)) & 0xff;
      if (!members.m_sfx_adjust) tilemap.set_scrolly(offset >> 1, data);
      else tilemap.set_scrollx(offset >> 1, Number(members.m_x_scale) * data);
      return;
    }
    for (offset >>= 1; offset < 0x400; offset += 32) {
      tilemap.mark_tile_dirty(offset);
    }
  };
}

/**
 * Compile MAME's common hot video-RAM handler shape to direct calls:
 *
 *   screen->update_partial(screen->vpos());
 *   ram[offset] = data;
 *   tilemap->mark_tile_dirty(offset);
 *
 * Clearing a tilemap can issue hundreds of these writes per frame. Running
 * the three already-lowered operations through the general IR interpreter
 * made Zig Zag fall from 61 fps to the mid-30s after inserting a coin.
 * Matching the operation structure keeps this source-derived and reusable.
 */
function makeDirectVideoRamWrite(
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
): WriteHandler | undefined {
  const operations = handler.program?.operations;
  if (!operations || operations.length !== 3) return undefined;
  const [update, store, dirty] = operations;
  if (
    update?.op !== 'call' ||
    store?.op !== 'assign' ||
    dirty?.op !== 'call' ||
    store.operator !== '='
  ) return undefined;

  const updateCallee = update.expression.callee;
  const updateArg = update.expression.args[0];
  const dirtyCallee = dirty.expression.callee;
  const dirtyArg = dirty.expression.args[0];
  if (
    updateCallee.kind !== 'member' ||
    updateCallee.object.kind !== 'identifier' ||
    updateCallee.property !== 'update_partial' ||
    update.expression.args.length !== 1 ||
    updateArg?.kind !== 'call' ||
    updateArg.callee.kind !== 'member' ||
    updateArg.callee.object.kind !== 'identifier' ||
    updateArg.callee.object.name !== updateCallee.object.name ||
    updateArg.callee.property !== 'vpos' ||
    updateArg.args.length !== 0 ||
    store.target.kind !== 'index' ||
    store.target.object.kind !== 'identifier' ||
    store.target.index.kind !== 'identifier' ||
    store.target.index.name !== 'offset' ||
    store.value.kind !== 'identifier' ||
    store.value.name !== 'data' ||
    dirtyCallee.kind !== 'member' ||
    dirtyCallee.object.kind !== 'identifier' ||
    dirty.expression.args.length !== 1 ||
    dirtyArg?.kind !== 'identifier' ||
    dirtyArg.name !== 'offset'
  ) return undefined;

  const screenMember = updateCallee.object.name;
  const ramMember = store.target.object.name;
  const tilemapMember = dirtyCallee.object.name;
  const dirtyMethod = dirtyCallee.property;
  return (_address, offset, data) => {
    const members = bindings.members ?? {};
    const screen = members[screenMember] as {
      vpos(): number;
      update_partial(line: number): void;
    };
    const ram = members[ramMember] as { [index: number]: number };
    const tilemap = members[tilemapMember] as Record<string, (index: number) => void>;
    screen.update_partial(screen.vpos());
    ram[offset] = data;
    tilemap[dirtyMethod]!(offset);
  };
}
