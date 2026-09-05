// POKEY's synchronous CPU-side register surface.
//
// Audio synthesis stays in the generated worklet. Reads cannot: the CPU needs
// RANDOM/ALLPOT immediately, so this small front end mirrors the readable
// register state and forwards writes to the worklet in frame order.
import { deviceAliases, soundTags } from "../sound-runtime.js";
const ALLPOT = 0x08;
const KBCODE = 0x09;
const RANDOM = 0x0a;
const SERIN = 0x0d;
const IRQST = 0x0e;
const SKSTAT = 0x0f;
const AUDCTL = 0x08;
const SKCTL = 0x0f;
export function installPokeyRuntime(context) {
    const tags = soundTags(context.sound);
    const registers = new Map(tags.map(tag => [tag, new Uint8Array(16)]));
    const random = new Map(tags.map(tag => [tag, 0x1ffff]));
    const reset = () => {
        for (const tag of tags) {
            registers.get(tag).fill(0);
            random.set(tag, 0x1ffff);
        }
    };
    tags.forEach((tag, chip) => {
        const write = (offset, data) => {
            const register = offset & 0x0f;
            registers.get(tag)[register] = data & 0xff;
            // One standalone worklet normally hosts one POKEY. Reserve sixteen
            // offsets per chip so a future multi-POKEY mixer remains unambiguous.
            context.soundWrite(chip * 16 + register, data, context.fraction());
        };
        const read = (offset) => {
            const register = offset & 0x0f;
            const state = registers.get(tag);
            switch (register) {
                case ALLPOT:
                    // No POT conversion is active on Centipede; unset POT callbacks read
                    // ready/high once SKRESET is released.
                    return (state[SKCTL] & 0x03) === 0 ? 0x00 : 0xff;
                case KBCODE:
                    return 0x09;
                case RANDOM: {
                    if ((state[SKCTL] & 0x03) === 0)
                        return 0xff;
                    let value = random.get(tag) ?? 0x1ffff;
                    const feedback = ((value >>> 0) ^ (value >>> 5)) & 1;
                    value = ((value >>> 1) | (feedback << 16)) & 0x1ffff;
                    random.set(tag, value);
                    return state[AUDCTL] & 0x80 ? value & 0xff : (value >>> 8) & 0xff;
                }
                case SERIN:
                    return 0x00;
                case IRQST:
                case SKSTAT:
                    return 0xff;
                default:
                    return 0xff;
            }
        };
        context.registry.write[`${tag}.write`] = (_address, offset, data) => write(offset, data);
        context.registry.read[`${tag}.read`] = (_address, offset) => read(offset);
        for (const alias of deviceAliases(context.board, tag)) {
            context.calls[`${alias}.write`] = write;
            context.calls[`${alias}.read`] = read;
        }
    });
    return { reset };
}
