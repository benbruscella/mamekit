// Cross-reference validation for a decoded board.
//
// decodeBoardIr() proves the artifact has the right shape; this proves its
// parts refer to each other. Both run at generation time, so a board that
// cannot be wired fails while the compiler still knows which MAME line to
// blame — rather than in the browser, as a missing endpoint nobody notices.
/** MAME `.set_nop()`: an output the board deliberately leaves unconnected. */
export function isUnconnectedCallback(callback) {
    return callback.operation === 'set_nop';
}
/** Configuration selectors consumed by their owning subsystem, not signals. */
export function isDeclarativeCallback(callback) {
    return callback.signal === 'set_screen_update';
}
/**
 * The endpoint key a callback resolves to, or undefined when it names no
 * target at all. Mirrors the runtime's callbackTarget() so validation and
 * execution cannot disagree about what "resolved" means.
 */
export function callbackEndpointKey(callback) {
    if (callback.targetPort)
        return `port.${callback.targetPort}`;
    if (callback.targetTag && callback.inputLine)
        return `${callback.targetTag}.${callback.inputLine}`;
    if (!callback.targetMethod)
        return undefined;
    if (callback.targetTag)
        return `${callback.targetTag}.${callback.targetMethod}`;
    if (callback.targetClass)
        return `${callback.targetClass}.${callback.targetMethod}`;
    return callback.targetMethod;
}
export function validateBoardIr(board) {
    const diagnostics = [];
    const fail = (path, message, source) => {
        diagnostics.push(source ? { path, message, source } : { path, message });
    };
    const deviceTags = new Set();
    for (const [index, device] of (board.devices ?? []).entries()) {
        if (deviceTags.has(device.tag)) {
            fail(`devices[${index}].tag`, `duplicate device tag "${device.tag}"`, device.source);
        }
        deviceTags.add(device.tag);
    }
    const cpuTags = new Set();
    for (const [index, cpu] of board.execution.cpus.entries()) {
        if (cpuTags.has(cpu.tag)) {
            fail(`execution.cpus[${index}].tag`, `duplicate CPU tag "${cpu.tag}"`, cpu.source);
        }
        cpuTags.add(cpu.tag);
        // Every CPU is also a MAME device; the two lists describing the same chip
        // differently is how a board ends up wiring interrupts to nothing.
        if (!deviceTags.has(cpu.tag)) {
            fail(`execution.cpus[${index}].tag`, `CPU "${cpu.tag}" has no matching device entry`, cpu.source);
        }
        validateAddressSpace(cpu.ranges, cpu.mask, `execution.cpus[${index}].ranges`, cpu.source, fail);
        validateAddressSpace(cpu.io?.ranges, cpu.io?.globalMask, `execution.cpus[${index}].io.ranges`, cpu.source, fail);
    }
    const tags = new Set([...deviceTags, ...cpuTags]);
    const handlerKeys = new Set((board.handlers ?? []).map(handler => `${handler.ownerClass}.${handler.method}`));
    const handlerMethods = new Set((board.handlers ?? []).map(handler => handler.method));
    for (const field of ['startHandlers', 'resetHandlers']) {
        for (const [index, handler] of (board.execution[field] ?? []).entries()) {
            if (handlerKeys.has(handler))
                continue;
            fail(`execution.${field}[${index}]`, `machine lifecycle handler "${handler}" was not generated`);
        }
    }
    // A MAME timer_device is declared by the callback that schedules it rather
    // than by a machine-config device line, so it owns itself.
    const timerOwners = new Set(board.callbacks.filter(callback => callback.signal === 'timer').map(callback => callback.ownerTag));
    const callbackIds = new Set();
    for (const [index, callback] of board.callbacks.entries()) {
        const path = `callbacks[${index}]`;
        if (callbackIds.has(callback.id)) {
            fail(`${path}.id`, `duplicate callback id "${callback.id}"`, callback.source);
        }
        callbackIds.add(callback.id);
        if (!tags.has(callback.ownerTag) && !timerOwners.has(callback.ownerTag)) {
            fail(`${path}.ownerTag`, `callback owner "${callback.ownerTag}" is not a declared device, CPU or timer`, callback.source);
        }
        if (isUnconnectedCallback(callback))
            continue;
        if (!callbackEndpointKey(callback)) {
            fail(`${path}`, `callback "${callback.id}" names no target and is not declared unconnected — ` +
                'a recognised connection that reaches nothing must fail generation', callback.source);
        }
        // set_ioport callbacks repeat the port name in targetTag; targetPort wins,
        // so only a device-directed callback constrains the tag.
        if (callback.targetTag && !callback.targetPort && !tags.has(callback.targetTag)) {
            fail(`${path}.targetTag`, `callback target "${callback.targetTag}" is not a declared device or CPU`, callback.source);
        }
    }
    // Lowering emits exactly one executable connection for every callback,
    // including an explicit no-op for MAME .set_nop(). Keep that invariant at
    // the decoded boundary: otherwise a missing connection survives generation
    // and fails only when the signal happens to fire in the browser, while a
    // duplicate is silently overwritten in the runtime's callback map.
    const connectionCounts = new Map();
    for (const [index, connection] of board.connections.entries()) {
        const path = `connections[${index}]`;
        const count = (connectionCounts.get(connection.callbackId) ?? 0) + 1;
        connectionCounts.set(connection.callbackId, count);
        if (!callbackIds.has(connection.callbackId)) {
            fail(`${path}.callbackId`, `connection references unknown callback "${connection.callbackId}"`, connection.source);
        }
        else if (count > 1) {
            fail(`${path}.callbackId`, `callback "${connection.callbackId}" has more than one connection`, connection.source);
        }
        const callback = board.callbacks.find(candidate => candidate.id === connection.callbackId);
        if (connection.effect.kind === 'unconnected') {
            if (callback && !isUnconnectedCallback(callback)) {
                fail(`${path}.effect`, `callback "${connection.callbackId}" is executable but its connection is unconnected`, connection.source ?? callback.source);
            }
            continue;
        }
        if (callback && isUnconnectedCallback(callback)) {
            fail(`${path}.effect`, `callback "${connection.callbackId}" is declared unconnected but has an executable effect`, connection.source ?? callback.source);
        }
        const effect = connection.effect;
        if (effect.kind === 'cpu-line' && !cpuTags.has(effect.tag)) {
            fail(`${path}.effect.tag`, `CPU-line effect targets undeclared CPU "${effect.tag}"`, connection.source);
        }
        else if ((effect.kind === 'device-method' ||
            effect.kind === 'audio-control' ||
            effect.kind === 'audio-write') &&
            !tags.has(effect.tag)) {
            fail(`${path}.effect.tag`, `${effect.kind} effect targets undeclared device "${effect.tag}"`, connection.source);
        }
        else if (effect.kind === 'handler' && !handlerKeys.has(effect.handler)) {
            fail(`${path}.effect.handler`, `connection handler "${effect.handler}" was not generated`, connection.source);
        }
    }
    for (const [index, callback] of board.callbacks.entries()) {
        if (isDeclarativeCallback(callback))
            continue;
        if ((connectionCounts.get(callback.id) ?? 0) !== 0)
            continue;
        fail(`callbacks[${index}].id`, `callback "${callback.id}" has no executable connection`, callback.source);
    }
    for (const [index, event] of board.execution.frameEvents.entries()) {
        if (callbackIds.has(event.callbackId))
            continue;
        fail(`execution.frameEvents[${index}].callbackId`, `frame event references unknown callback "${event.callbackId}"`, event.source);
    }
    const bankTags = new Set((board.execution.banks ?? []).map(bank => bank.tag));
    for (const [index, bank] of (board.execution.banks ?? []).entries()) {
        if (bank.entryOffsets.some(offset => offset !== null))
            continue;
        fail(`execution.banks[${index}].entryOffsets`, `memory bank "${bank.tag}" has no configured entry`, bank.source);
    }
    for (const [index, cpu] of board.execution.cpus.entries()) {
        for (const [position, range] of [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])].entries()) {
            for (const key of [range.read, range.write]) {
                if (!key?.startsWith('bank.'))
                    continue;
                const tag = key.slice('bank.'.length);
                if (bankTags.has(tag))
                    continue;
                fail(`execution.cpus[${index}].ranges[${position}]`, `range maps bank "${tag}", which the board does not configure`, cpu.source);
            }
        }
    }
    const screenUpdate = board.execution.screenUpdate;
    if (screenUpdate && !handlerKeys.has(screenUpdate.handler)) {
        fail('execution.screenUpdate.handler', `screen update handler "${screenUpdate.handler}" was not generated`, screenUpdate.source);
    }
    for (const [index, custom] of (board.execution.customs ?? []).entries()) {
        if (custom.source === 'screen-vblank' || custom.source === 'rtc-tp' || custom.source === 'rtc-data')
            continue;
        const resolved = custom.handler
            ? handlerKeys.has(custom.handler)
            : handlerMethods.has(custom.member);
        if (resolved)
            continue;
        fail(`execution.customs[${index}]`, `custom input port "${custom.port}" names handler ` +
            `"${custom.handler ?? custom.member}", which was not generated`);
    }
    for (const [index, route] of (board.sound?.routes ?? []).entries()) {
        if (route.target)
            continue;
        fail(`sound.routes[${index}].target`, 'audio route has no destination');
    }
    return diagnostics;
}
function validateAddressSpace(ranges, mask, path, source, fail) {
    if (!ranges)
        return;
    const limit = mask ?? 0xffff;
    for (const [index, range] of ranges.entries()) {
        if (range.end <= limit)
            continue;
        fail(`${path}[${index}]`, `range ends at 0x${range.end.toString(16)}, outside the ` +
            `0x${limit.toString(16)} address space`, source);
    }
}
