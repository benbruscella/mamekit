// Execute typed board effects.
//
// The compiler resolved every MAME callback into a BoardEffect, so this layer
// switches on a small closed union instead of parsing C++ method names. An
// effect with no executor is a composition error and throws; nothing can be
// quietly skipped.
export function applyBoardTransforms(value, transforms = []) {
    let result = value;
    for (const transform of transforms) {
        // devcb invert() complements the callback's full width; the KG only
        // extracts invert from line callbacks today, where the width is one bit.
        if (transform.kind === 'invert')
            result ^= 1;
        else if (transform.kind === 'mask')
            result &= transform.value;
        else if (transform.kind === 'bit')
            result = (result >>> transform.bit) & 1;
        else if (transform.kind === 'rshift')
            result >>>= transform.bits;
        else if (transform.kind === 'lshift')
            result = (result << transform.bits) >>> 0;
    }
    return result;
}
function executorFor(effect, bindings) {
    switch (effect.kind) {
        // MAME .set_nop(): the board declares this output unconnected, so doing
        // nothing is the correct behaviour rather than a gap.
        case 'unconnected': return () => { };
        case 'cpu-line': return bindings.cpuLine(effect.tag, effect.line, effect.delivery);
        case 'device-method': return bindings.deviceMethod(effect.tag, effect.method, effect.ownerClass);
        case 'handler': return bindings.handler(effect.handler, effect.deviceTag);
        case 'port-read': return bindings.portRead(effect.port);
        case 'video-control': return bindings.videoControl(effect.control);
        case 'audio-control': return bindings.audioControl(effect.tag, effect.control, effect.offset);
        case 'audio-write': return bindings.audioWrite(effect.tag, effect.method);
    }
}
/**
 * Bind every connection to an executor, keyed by the callback it came from.
 * Any connection that cannot be bound aborts board construction, naming the
 * MAME source line — the browser equivalent of the compiler's own check.
 */
/**
 * MAME names device accessors by direction: a read ends in _r (q7_r, K_r,
 * R_r_0) and a write in _w. A devcb bound to a read accessor pulls a value
 * back, so its transform applies to the value read, not to the emitted
 * argument. Getting that backwards shifted the argument instead of the result,
 * which collapsed the Namco 53xx's mode select — three latch bits appended as
 * (q7<<3)|(q6<<2)|(q5<<1) — into a single unshifted bit.
 */
function isSourceReadAccessor(method) {
    return /(?:^|_)r(?:_\d+)?$/.test(method) || /^read(?:_|$)/.test(method);
}
export function bindBoardEffects(machine, bindings) {
    const bound = new Map();
    const seen = new Set();
    const unbound = [];
    for (const connection of machine.connections) {
        if (seen.has(connection.callbackId)) {
            throw new Error(`${machine.game}: callback "${connection.callbackId}" has more than one connection`);
        }
        seen.add(connection.callbackId);
        const run = executorFor(connection.effect, bindings);
        if (!run) {
            unbound.push(`${connection.callbackId} (${connection.effect.kind})` +
                (connection.source ? ` at ${connection.source.file}:${connection.source.line}` : ''));
            continue;
        }
        bound.set(connection.callbackId, {
            run,
            transforms: connection.transforms,
            reads: connection.effect.kind === 'port-read' ||
                (connection.effect.kind === 'device-method' &&
                    isSourceReadAccessor(connection.effect.method)),
        });
    }
    if (unbound.length) {
        throw new Error(`${machine.game}: generated composition cannot execute these connections: ` +
            unbound.sort().join(', '));
    }
    return bound;
}
