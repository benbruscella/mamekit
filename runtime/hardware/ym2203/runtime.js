// YM2203 register wiring.
import { YM2203_PORTS_PER_CHIP } from "./definition.js";
import { deviceAliases, soundTags, } from "../sound-runtime.js";
export function installYm2203Runtime(context) {
    const { board, sound, registry, calls } = context;
    soundTags(sound).forEach((tag, chip) => {
        const base = chip * YM2203_PORTS_PER_CHIP;
        for (const method of sound.writeMethods) {
            // Each chip exposes an address/data port pair, addressed as
            // chip * 2 + port so one worklet hosts every chip on the board.
            const write = (offset, data) => {
                context.soundWrite(base + (offset & 1), data, context.fraction(), method);
            };
            registry.write[`${tag}.${method}`] = (_address, offset, data) => write(offset, data);
            for (const alias of deviceAliases(board, tag)) {
                calls[`${alias}.${method}`] = (offset, data) => write(Number(offset), Number(data));
            }
        }
        // ym_reset_w and kin reset the chip through the generated device port.
        for (const alias of deviceAliases(board, tag)) {
            calls[`${alias}.reset`] = () => {
                context.soundWrite(base, 0, context.fraction(), 'reset');
                return 0;
            };
        }
    });
}
