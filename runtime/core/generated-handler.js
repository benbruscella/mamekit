// Board wiring for generated handler IR: bus handlers and device signals.
// The interpreter itself is neutral and lives in src/ir/execute.ts.
import { executeGeneratedMachineHandler, } from "../ir/execute.js";
import { wireDeviceCallbacks } from "./generated-machine.js";
import { applyBoardTransforms } from "./generated-effects.js";
export { compileGeneratedMachineHandler, executeGeneratedCallbackHandler, executeGeneratedHandler, executeGeneratedMachineHandler, executeGeneratedMachineProgram, executeGeneratedProgram, generatedPeriodicLines, } from "../ir/execute.js";
/**
 * Build executable bus handlers for source methods that compiled without
 * diagnostics. Runtime device-tag handlers are intentionally not synthesized;
 * they belong to reusable device implementations.
 */
export function generatedHandlerRegistry(machine, bindings = {}) {
    const registry = { read: {}, write: {} };
    const handlers = new Map((machine.handlers ?? [])
        .filter(handler => handler.program && handler.program.diagnostics.length === 0)
        .map(handler => [`${handler.ownerClass}.${handler.method}`, handler]));
    const resolve = (key) => {
        const exact = handlers.get(key);
        if (exact)
            return exact;
        const method = key.slice(key.indexOf('.') + 1);
        const matches = [...handlers.values()].filter(handler => handler.method === method);
        return matches.length === 1 ? matches[0] : undefined;
    };
    const executableRanges = machine.execution.cpus.flatMap(cpu => [
        ...(cpu.ranges ?? []),
        ...(cpu.opcode?.ranges ?? []),
        ...(cpu.io?.ranges ?? []),
    ]);
    for (const ranges of [
        ...(machine.maps ?? []).map(map => map.ranges),
        executableRanges,
    ]) {
        for (const range of ranges) {
            if (range.read) {
                const handler = resolve(range.read);
                if (handler?.program && !registry.read[range.read]) {
                    registry.read[range.read] = makeReadHandler(machine, handler, bindings);
                }
            }
            if (range.write) {
                const handler = resolve(range.write);
                if (handler?.program && !registry.write[range.write]) {
                    registry.write[range.write] = makeWriteHandler(machine, handler, bindings);
                }
            }
        }
    }
    return registry;
}
/** Wire a generated device signal to the effects bound for its callbacks. */
/** Wire a generated device signal to the effects bound for its callbacks. */
export function wireGeneratedDevice(device, machine, ownerTag, signal, effects) {
    return wireDeviceCallbacks(device, machine, ownerTag, signal, effects);
}
export function dispatchGeneratedCallbacks(machine, ownerTag, signal, state, effects) {
    const bound = [];
    for (const callback of machine.callbacks) {
        if (callback.ownerTag !== ownerTag || callback.signal !== signal)
            continue;
        bound.push(...dispatchGeneratedCallback(machine, callback.id, state, effects));
    }
    return bound;
}
export function dispatchGeneratedCallback(machine, callbackId, state, effects) {
    const effect = effects.get(callbackId);
    if (!effect) {
        throw new Error(`${machine.game}: callback "${callbackId}" has no bound effect — ` +
            'every connection is resolved at generation time, so this is a composition bug');
    }
    effect.run(applyBoardTransforms(state, effect.transforms));
    return [callbackId];
}
function makeReadHandler(machine, handler, bindings) {
    return (addr, offset) => executeGeneratedMachineHandler(machine, handler, bindings, { addr, offset }) ?? 0xff;
}
function makeWriteHandler(machine, handler, bindings) {
    const directVideoRamWrite = makeDirectVideoRamWrite(handler, bindings);
    if (directVideoRamWrite)
        return directVideoRamWrite;
    const directObjectRamWrite = makeDirectObjectRamWrite(handler, bindings);
    if (directObjectRamWrite)
        return directObjectRamWrite;
    return (addr, offset, data, memMask) => {
        executeGeneratedMachineHandler(machine, handler, bindings, { addr, offset, data, state: data, ...(memMask !== undefined ? { mem_mask: memMask } : {}) });
    };
}
/**
 * Direct form of the Galaxian-family object-RAM update shape. This is matched
 * from the complete source body before specializing; boards with a different
 * handler continue through the general interpreter.
 */
function makeDirectObjectRamWrite(handler, bindings) {
    const body = handler.body ?? '';
    if (!body.includes('m_screen->update_partial(m_screen->vpos())') ||
        !body.includes('m_spriteram[offset] = data') ||
        !body.includes('if (offset < 0x40)') ||
        !body.includes('m_frogger_adjust') ||
        !body.includes('m_bg_tilemap->set_scrolly(offset >> 1, data)') ||
        !body.includes('m_bg_tilemap->set_scrollx(offset >> 1, m_x_scale*data)') ||
        !body.includes('m_bg_tilemap->mark_tile_dirty(offset)'))
        return undefined;
    return (_address, initialOffset, initialData) => {
        const members = bindings.members ?? {};
        const screen = members.m_screen;
        const spriteRam = members.m_spriteram;
        const tilemap = members.m_bg_tilemap;
        let offset = initialOffset;
        let data = initialData;
        screen.update_partial(screen.vpos());
        spriteRam[offset] = data;
        if (offset >= 0x40)
            return;
        if ((offset & 1) === 0) {
            if (members.m_frogger_adjust)
                data = ((data >> 4) | (data << 4)) & 0xff;
            if (!members.m_sfx_adjust)
                tilemap.set_scrolly(offset >> 1, data);
            else
                tilemap.set_scrollx(offset >> 1, Number(members.m_x_scale) * data);
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
function makeDirectVideoRamWrite(handler, bindings) {
    const operations = handler.program?.operations;
    if (!operations || operations.length !== 3)
        return undefined;
    const [update, store, dirty] = operations;
    if (update?.op !== 'call' ||
        store?.op !== 'assign' ||
        dirty?.op !== 'call' ||
        store.operator !== '=')
        return undefined;
    const updateCallee = update.expression.callee;
    const updateArg = update.expression.args[0];
    const dirtyCallee = dirty.expression.callee;
    const dirtyArg = dirty.expression.args[0];
    if (updateCallee.kind !== 'member' ||
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
        dirtyArg.name !== 'offset')
        return undefined;
    const screenMember = updateCallee.object.name;
    const ramMember = store.target.object.name;
    const tilemapMember = dirtyCallee.object.name;
    const dirtyMethod = dirtyCallee.property;
    return (_address, offset, data) => {
        const members = bindings.members ?? {};
        const screen = members[screenMember];
        const ram = members[ramMember];
        const tilemap = members[tilemapMember];
        screen.update_partial(screen.vpos());
        ram[offset] = data;
        tilemap[dirtyMethod](offset);
    };
}
