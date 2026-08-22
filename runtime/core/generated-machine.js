// Registration and signal wiring for decoded boards. The IR types themselves
// live in src/ir/board.ts, which both the compiler and this runtime import.
import { applyBoardTransforms } from "./generated-effects.js";
const MACHINES = new Map();
export function registerGeneratedMachine(machine) {
    MACHINES.set(machine.game, machine);
}
export function generatedMachine(game) {
    const machine = MACHINES.get(game);
    if (!machine) {
        throw new Error(`generated machine "${game}" was not registered`);
    }
    return machine;
}
export function clearGeneratedMachines() {
    MACHINES.clear();
}
/**
 * Attach a device signal to the effects the compiler resolved for it.
 *
 * Every matching callback must have a bound effect. A callback the board
 * cannot deliver is a generation gap, not a runtime detail to skip: silently
 * dropping one produces a machine that boots and then behaves wrongly.
 */
export function wireDeviceCallbacks(device, machine, ownerTag, signal, effects) {
    const bound = [];
    const unresolved = [];
    for (const callback of machine.callbacks) {
        if (callback.ownerTag !== ownerTag || callback.signal !== signal)
            continue;
        const effect = effects.get(callback.id);
        if (!effect) {
            unresolved.push(callback.id);
            continue;
        }
        // Read effects (set_ioport) pull a value FROM the port: the device calls
        // with no data and the transform applies to the value read back. Write
        // effects push data TO the target, so the transform applies to the
        // emitted argument.
        device.on(signal, effect.reads
            ? () => applyBoardTransforms(Number(effect.run(0)) || 0, effect.transforms)
            : (...args) => {
                // MAME devcb_write{8,16,32} emits (offset, data, mask), while
                // devcb_write_line emits only state. The effect consumes
                // data/state, never the trailing access mask.
                const value = args.length >= 3 ? args.at(-2) : args.at(-1);
                return effect.run(applyBoardTransforms(value ?? 0, effect.transforms), ...args);
            }, callback.slot ?? 0);
        bound.push(callback.id);
    }
    if (unresolved.length) {
        throw new Error(`${machine.game}: ${ownerTag}.${signal} has callbacks with no bound effect: ` +
            unresolved.sort().join(', '));
    }
    return bound;
}
