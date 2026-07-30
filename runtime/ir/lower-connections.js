// Lower MAME callbacks into typed board effects.
//
// This is the only place a MAME C++ method name is interpreted. It runs during
// generation, where an unrecognised name can fail the build and name the source
// line; previously the same regexes ran in the browser, where an unrecognised
// name silently performed no operation.
/**
 * MAME's driver_device interrupt generators. The method name encodes both the
 * pin and how it is driven, which is why the runtime was parsing it.
 */
function driverInterruptGenerator(method) {
    const irq = /^irq(\d)_line_(hold|assert)$/.exec(method ?? '');
    if (irq)
        return { line: 'irq', delivery: irq[2] };
    const nmi = /^nmi_line_(pulse|assert)$/.exec(method ?? '');
    if (nmi)
        return { line: 'nmi', delivery: nmi[1] };
    return undefined;
}
/** MAME's device_execute_interface input line constants. */
const CPU_INPUT_LINES = {
    INPUT_LINE_NMI: 'nmi',
    INPUT_LINE_RESET: 'reset',
    INPUT_LINE_HALT: 'halt',
    INPUT_LINE_IRQ0: 'irq',
};
/** MAME's flip_screen helpers on driver_device. */
const VIDEO_CONTROLS = {
    flip_screen_set: 'flip-screen',
    flip_screen_x_set: 'flip-screen-x',
    flip_screen_y_set: 'flip-screen-y',
};
export function lowerTransforms(transforms = []) {
    return transforms.flatMap((transform) => {
        if (transform === 'invert')
            return [{ kind: 'invert' }];
        const mask = /^mask\((0x[\da-f]+|\d+)\)$/i.exec(transform);
        if (mask)
            return [{ kind: 'mask', value: Number(mask[1]) }];
        const right = /^rshift\((\d+)\)$/.exec(transform);
        if (right)
            return [{ kind: 'rshift', bits: Number(right[1]) }];
        const left = /^lshift\((\d+)\)$/.exec(transform);
        if (left)
            return [{ kind: 'lshift', bits: Number(left[1]) }];
        return [];
    });
}
/** Transforms the compiler does not understand, reported rather than dropped. */
export function unknownTransforms(transforms = []) {
    return transforms.filter(transform => transform !== 'invert' &&
        !/^mask\((0x[\da-f]+|\d+)\)$/i.test(transform) &&
        !/^rshift\((\d+)\)$/.test(transform) &&
        !/^lshift\((\d+)\)$/.test(transform));
}
export function lowerCallbackEffect(callback, context) {
    if (callback.operation === 'set_nop')
        return { kind: 'unconnected' };
    // set_ioport pulls a value from a port; targetTag repeats the port name.
    if (callback.targetPort)
        return { kind: 'port-read', port: callback.targetPort };
    // An explicit CPU input line: mainlatch bit -> audiocpu RESET.
    if (callback.targetTag && callback.inputLine) {
        const line = CPU_INPUT_LINES[callback.inputLine];
        if (line && context.cpuTags.has(callback.targetTag)) {
            return {
                kind: 'cpu-line',
                tag: callback.targetTag,
                line,
                // MAME asserts these lines directly; the source holds them until
                // the latch bit changes back.
                delivery: line === 'nmi' ? 'pulse' : 'level',
            };
        }
    }
    // A driver interrupt generator acts on the device the interrupt is installed
    // on — set_vblank_int, set_periodic_int and set_irq_acknowledge_callback all
    // name the owning CPU, not the callback's target tag.
    const generator = driverInterruptGenerator(callback.targetMethod);
    if (generator && context.cpuTags.has(callback.ownerTag)) {
        return { kind: 'cpu-line', tag: callback.ownerTag, ...generator };
    }
    if (callback.targetMethod && VIDEO_CONTROLS[callback.targetMethod]) {
        return { kind: 'video-control', control: VIDEO_CONTROLS[callback.targetMethod] };
    }
    if (callback.targetMethod === 'mute_w') {
        return {
            kind: 'audio-control',
            tag: callback.targetTag ?? context.soundTag ?? '',
            control: 'mute',
        };
    }
    if (callback.targetTag &&
        callback.targetMethod &&
        callback.targetTag === context.soundTag &&
        context.soundEnableMethods?.has(callback.targetMethod)) {
        return {
            kind: 'audio-control',
            tag: callback.targetTag,
            control: 'enable',
            ...(context.soundControlOffset !== undefined
                ? { offset: context.soundControlOffset }
                : {}),
        };
    }
    // A secondary audio stream device: the board never instantiates it, so the
    // write goes to the audio sink rather than to a device method.
    if (callback.targetTag &&
        callback.targetMethod &&
        context.auxiliaryAudio?.get(callback.targetTag)?.has(callback.targetMethod)) {
        return { kind: 'audio-write', tag: callback.targetTag, method: callback.targetMethod };
    }
    // A method on a generated device the runtime instantiates.
    if (callback.targetTag &&
        callback.targetMethod &&
        context.deviceTags.has(callback.targetTag) &&
        !context.cpuTags.has(callback.targetTag)) {
        return {
            kind: 'device-method',
            tag: callback.targetTag,
            method: callback.targetMethod,
            ...(callback.targetClass ? { ownerClass: callback.targetClass } : {}),
        };
    }
    // A generated handler program on the driver class or a device class.
    if (callback.targetClass && callback.targetMethod) {
        const key = `${callback.targetClass}.${callback.targetMethod}`;
        if (context.handlerKeys.has(key))
            return { kind: 'handler', handler: key };
    }
    // A CPU-directed method with no input line (set_input_line wrappers).
    if (callback.targetTag && callback.targetMethod && context.cpuTags.has(callback.targetTag)) {
        return { kind: 'device-method', tag: callback.targetTag, method: callback.targetMethod };
    }
    return undefined;
}
export function lowerConnections(callbacks, context) {
    const connections = [];
    const unresolved = [];
    for (const callback of callbacks) {
        const unknown = unknownTransforms(callback.transforms);
        if (unknown.length) {
            unresolved.push({
                callback,
                reason: `devcb transform ${unknown.join(', ')} has no lowering`,
            });
            continue;
        }
        const effect = lowerCallbackEffect(callback, context);
        if (!effect) {
            unresolved.push({
                callback,
                reason: `no effect for ${describeTarget(callback)}`,
            });
            continue;
        }
        connections.push({
            callbackId: callback.id,
            effect,
            transforms: lowerTransforms(callback.transforms),
            ...(callback.source ? { source: callback.source } : {}),
        });
    }
    return { connections, unresolved };
}
function describeTarget(callback) {
    const target = [callback.targetTag, callback.targetClass].filter(Boolean).join('/');
    const member = callback.targetMethod ?? callback.inputLine ?? callback.targetPort;
    return target && member ? `${target}.${member}` : target || member || 'an unnamed target';
}
