import { deviceAliases } from "../sound-runtime.js";
/** Main-thread status mirror for source handlers that poll the OKI busy bits. */
export function installAuxiliaryOkim6295Runtime(context, device) {
    const rom = context.regions?.[device.deviceTag] ?? new Uint8Array();
    const remaining = new Float64Array(4);
    let command = -1;
    let pin7 = device.initialMode !== 'PIN7_LOW';
    const aliases = deviceAliases(context.board, device.deviceTag);
    const methodName = (method) => `${device.deviceTag}.${method}`;
    const status = () => 0xf0 | remaining.reduce((bits, seconds, voice) => bits | (seconds > 0 ? 1 << voice : 0), 0);
    const write = (data) => {
        data &= 0xff;
        if (command >= 0) {
            let mask = data >>> 4;
            for (let voice = 0; voice < 4; voice++, mask >>>= 1) {
                if (!(mask & 1) || remaining[voice] > 0)
                    continue;
                const table = command * 8;
                const start = (((rom[table] ?? 0) << 16) |
                    ((rom[table + 1] ?? 0) << 8) | (rom[table + 2] ?? 0)) & 0x3ffff;
                const stop = (((rom[table + 3] ?? 0) << 16) |
                    ((rom[table + 4] ?? 0) << 8) | (rom[table + 5] ?? 0)) & 0x3ffff;
                if (start < stop)
                    remaining[voice] =
                        (2 * (stop - start + 1)) / (device.clock / (pin7 ? 132 : 165));
            }
            command = -1;
        }
        else if (data & 0x80)
            command = data & 0x7f;
        else {
            let mask = data >>> 3;
            for (let voice = 0; voice < 4; voice++, mask >>>= 1) {
                if (mask & 1)
                    remaining[voice] = 0;
            }
        }
        context.soundWrite(0, data, context.fraction(), methodName('write'));
        return 0;
    };
    const setPin7 = (value) => {
        pin7 = Boolean(value);
        context.soundWrite(0, value, context.fraction(), methodName('set_pin7'));
        return 0;
    };
    context.registry.write[methodName('write')] = (_address, _offset, data) => void write(data);
    context.registry.read[`${device.deviceTag}.read`] = status;
    for (const alias of aliases) {
        context.calls[`${alias}.write`] = write;
        context.calls[`${alias}.read`] = status;
        context.calls[`${alias}.set_pin7`] = setPin7;
    }
    return {
        tickCpu: (cpuTag, cycles) => {
            const audioCpu = context.board.execution.cpus.find(cpu => /audio|sound/.test(cpu.tag));
            if (!audioCpu || audioCpu.tag !== cpuTag)
                return;
            const seconds = cycles / Math.max(1, audioCpu.cycleClock ?? audioCpu.clock);
            for (let voice = 0; voice < 4; voice++) {
                remaining[voice] = Math.max(0, remaining[voice] - seconds);
            }
        },
        reset: () => { command = -1; remaining.fill(0); },
    };
}
