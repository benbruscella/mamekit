import { deviceAliases, soundTags, } from "../sound-runtime.js";
export function installSn76489Runtime(context) {
    for (const [chip, tag] of soundTags(context.sound).entries()) {
        const write = (data) => {
            context.soundWrite(chip, data, context.fraction());
        };
        context.registry.write[`${tag}.write`] = (_address, _offset, data) => write(data);
        for (const alias of deviceAliases(context.board, tag)) {
            context.calls[`${alias}.write`] = write;
        }
    }
    // Routed secondary streams (DACs and speech devices) share the board's
    // sound sink even though the SN76489 remains its primary synthesizer.
    for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
        const aliases = [
            auxiliary.deviceTag,
            `m_${auxiliary.deviceTag}`,
            ...(auxiliary.member ? [auxiliary.member] : []),
        ];
        for (const method of auxiliary.writeMethods) {
            const name = `${auxiliary.deviceTag}.${method}`;
            context.registry.write[name] = (_address, offset, data) => {
                context.soundWrite(offset, data, context.fraction(), name);
            };
            for (const alias of aliases) {
                context.calls[`${alias}.${method}`] = (...args) => {
                    context.soundWrite(0, args.at(-1) ?? 0, context.fraction(), name);
                    return 0;
                };
            }
        }
    }
}
