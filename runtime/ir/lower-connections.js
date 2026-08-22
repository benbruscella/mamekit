// Lower MAME callbacks into typed board effects.
//
// This is the only place a MAME C++ method name is interpreted. It runs during
// generation, where an unrecognised name can fail the build and name the source
// line; previously the same regexes ran in the browser, where an unrecognised
// name silently performed no operation.
/** Resolve an unqualified device tag emitted inside a composite machine. */
function resolveScopedTag(tags, rawTag) {
    if (!rawTag)
        return undefined;
    if (tags.has(rawTag))
        return rawTag;
    const matches = [...tags].filter(tag => tag.endsWith(`:${rawTag}`));
    return matches.length === 1 ? matches[0] : undefined;
}
/**
 * MAME's driver_device interrupt generators. The method name encodes both the
 * pin and how it is driven, which is why the runtime was parsing it.
 */
function driverInterruptGenerator(method) {
    const irq = /^irq(\d)_line_(hold|assert)$/.exec(method ?? '');
    if (irq) {
        const level = Number(irq[1]);
        const line = level === 0 ? 'irq' : `irq${level}`;
        return { line, delivery: irq[2] };
    }
    const nmi = /^nmi_line_(pulse|assert)$/.exec(method ?? '');
    if (nmi)
        return { line: 'nmi', delivery: nmi[1] };
    return undefined;
}
/** MAME's device_execute_interface input line constants. */
const CPU_INPUT_LINES = {
    // Most single-IRQ CPU cores expose their first external interrupt as
    // numeric line zero; MAME device callbacks commonly spell it directly.
    '0': 'irq',
    INPUT_LINE_NMI: 'nmi',
    INPUT_LINE_RESET: 'reset',
    INPUT_LINE_HALT: 'halt',
    INPUT_LINE_IRQ0: 'irq',
    M6800_IRQ_LINE: 'irq',
    M6502_IRQ_LINE: 'irq',
    'm6502_device::IRQ_LINE': 'irq',
    'm6502_device::NMI_LINE': 'nmi',
    M6808_IRQ_LINE: 'irq',
    M6802_IRQ_LINE: 'irq',
    M6801_IRQ1_LINE: 'irq',
    M6809_IRQ_LINE: 'irq',
    M6809_FIRQ_LINE: 'firq',
    KONAMI_IRQ_LINE: 'irq',
    KONAMI_FIRQ_LINE: 'firq',
    M68K_IRQ_1: 'irq1',
    M68K_IRQ_2: 'irq2',
    M68K_IRQ_3: 'irq3',
    M68K_IRQ_4: 'irq4',
    M68K_IRQ_5: 'irq5',
    M68K_IRQ_6: 'irq6',
    M68K_IRQ_7: 'irq7',
    M68K_IRQ_IPL0: 'irq',
    M68K_IRQ_IPL1: 'irq1',
    M68K_IRQ_IPL2: 'irq2',
    MCS48_INPUT_EA: 'irq1',
    Z80_INPUT_LINE_BUSREQ: 'halt',
    Z80_INPUT_LINE_WAIT: 'halt',
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
        const bit = /^bit\((\d+)\)$/.exec(transform);
        if (bit)
            return [{ kind: 'bit', bit: Number(bit[1]) }];
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
        !/^bit\(\d+\)$/.test(transform) &&
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
        const tag = resolveScopedTag(context.cpuTags, callback.targetTag);
        if (line && tag) {
            return {
                kind: 'cpu-line',
                tag,
                line,
                // MAME asserts these lines directly; the source holds them until
                // the latch bit changes back. The generated VCK schedule contains
                // one active clock edge per event, so its NMI must be delivered as a
                // pulse rather than remaining asserted after the first tick.
                delivery: callback.delivery ??
                    (callback.signal === 'vck_callback' && line === 'nmi' ? 'pulse' : 'level'),
            };
        }
    }
    // A driver interrupt generator acts on the device the interrupt is installed
    // on — set_vblank_int, set_periodic_int and set_irq_acknowledge_callback all
    // name the owning CPU, not the callback's target tag.
    const generator = driverInterruptGenerator(callback.targetMethod);
    const ownerCpuTag = resolveScopedTag(context.cpuTags, callback.ownerTag);
    if (generator && ownerCpuTag) {
        return { kind: 'cpu-line', tag: ownerCpuTag, ...generator };
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
    if (callback.targetTag &&
        callback.targetMethod &&
        callback.targetTag === context.soundTag &&
        context.soundWriteMethods?.has(callback.targetMethod)) {
        return { kind: 'audio-write', tag: callback.targetTag, method: callback.targetMethod };
    }
    // A secondary audio stream device: the board never instantiates it, so the
    // write goes to the audio sink rather than to a device method.
    if (callback.targetTag &&
        callback.targetMethod &&
        context.auxiliaryAudio?.get(callback.targetTag)?.has(callback.targetMethod)) {
        return { kind: 'audio-write', tag: callback.targetTag, method: callback.targetMethod };
    }
    // Discrete sound inputs may be wired straight from latch callbacks rather
    // than through an address-map write. Preserve the source node encoded in
    // write_line_<NODE> as the method identifier for the generated backend.
    if (callback.targetTag &&
        callback.targetTag === context.soundTag &&
        callback.targetMethod?.startsWith('write_line_')) {
        return {
            kind: 'audio-write',
            tag: callback.targetTag,
            method: callback.targetMethod,
        };
    }
    // Custom interrupt generators receive the owning CPU as their implicit
    // `device` parameter. Their source body may gate or vector the interrupt,
    // so preserve the handler instead of reducing it to an unconditional line.
    if (['set_vblank_int', 'set_periodic_int'].includes(callback.signal) &&
        callback.targetClass &&
        callback.targetMethod) {
        const key = `${callback.targetClass}.${callback.targetMethod}`;
        const tag = resolveScopedTag(context.cpuTags, callback.ownerTag);
        if (context.handlerKeys.has(key) && tag) {
            return { kind: 'handler', handler: key, deviceTag: tag };
        }
    }
    // A method on a generated device the runtime instantiates.
    if (callback.targetTag &&
        callback.targetMethod &&
        resolveScopedTag(context.deviceTags, callback.targetTag) &&
        !resolveScopedTag(context.cpuTags, callback.targetTag)) {
        const tag = resolveScopedTag(context.deviceTags, callback.targetTag);
        return {
            kind: 'device-method',
            tag,
            method: callback.targetMethod,
            ...(callback.targetClass ? { ownerClass: callback.targetClass } : {}),
        };
    }
    // A generated handler program on the driver class or a device class.
    if (callback.targetClass && callback.targetMethod) {
        const key = `${callback.targetClass}.${callback.targetMethod}`;
        if (context.handlerKeys.has(key)) {
            const ownerTag = resolveScopedTag(context.deviceTags, callback.ownerTag);
            const soundHost = context.soundTag?.includes(':')
                ? context.soundTag.split(':').slice(0, -1).join(':')
                : undefined;
            const insideCompositeSoundDevice = soundHost !== undefined &&
                (ownerTag === soundHost || ownerTag?.startsWith(`${soundHost}:`) === true);
            return {
                kind: 'handler',
                handler: key,
                // A nested owner is a hosted processor callback. Carry its tag so the
                // runtime can route FUNC(parent::method) to the generated host device.
                // Composite audio devices already share the board sound-handler state;
                // rerouting their CPU/PSG callbacks into a second AOT device instance
                // broke Irem M62's proven port/latch sequence and silenced Kung-Fu.
                ...(ownerTag?.includes(':') && !insideCompositeSoundDevice
                    ? { deviceTag: ownerTag }
                    : {}),
            };
        }
    }
    // A CPU-directed method with no input line (set_input_line wrappers).
    if (callback.targetTag && callback.targetMethod) {
        const tag = resolveScopedTag(context.cpuTags, callback.targetTag);
        if (tag)
            return { kind: 'device-method', tag, method: callback.targetMethod };
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
