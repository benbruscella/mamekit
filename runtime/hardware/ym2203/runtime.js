// YM2203 register wiring.
import { YM2203_PORTS_PER_CHIP } from "./definition.js";
import { deviceAliases, soundTags, } from "../sound-runtime.js";
export function installYm2203Runtime(context) {
    const { board, sound, registry, calls } = context;
    const timers = [];
    const cpuFor = (tag) => board.execution.cpus.find(cpu => [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])].some(range => range.read?.startsWith(`${tag}.`) || range.write?.startsWith(`${tag}.`)))?.tag ??
        board.execution.cpus[0]?.tag ??
        '';
    const specificationFor = (tag) => board.devices?.find(device => device.tag === tag);
    const updateIrq = (timer) => {
        const mask = timer.kind === 'opl' ? timer.registers[0x04] & 0x78 : 0;
        const next = (timer.status & ~mask) !== 0;
        if (next === timer.irq)
            return;
        timer.irq = next;
        context.dispatch(timer.tag, 'irq_handler', next ? 1 : 0);
    };
    const period = (timer, index) => {
        if (timer.kind === 'opn') {
            const value = index === 0
                ? (timer.registers[0x24] << 2) | (timer.registers[0x25] & 3)
                : timer.registers[0x26];
            // OPN: 3 channels * 4 operators, with the default /6 FM prescaler.
            return (index === 0 ? 1024 - value : 16 * (256 - value)) * 12 * 6;
        }
        const value = index === 0 ? timer.registers[0x02] * 4 : timer.registers[0x03];
        // OPL: 9 channels * 2 operators, with the default /4 FM prescaler.
        return (index === 0 ? 1024 - value : 16 * (256 - value)) * 18 * 4;
    };
    const modeWrite = (timer, data) => {
        if (timer.kind === 'opn') {
            if (data & 0x10)
                timer.status &= ~0x01;
            if (data & 0x20)
                timer.status &= ~0x02;
            for (const index of [0, 1]) {
                const load = data & (1 << index);
                if (!load)
                    timer.remaining[index] = Infinity;
                else if (!Number.isFinite(timer.remaining[index])) {
                    timer.remaining[index] = period(timer, index);
                }
            }
        }
        else if (data & 0x80) {
            timer.status = 0;
        }
        else {
            if (data & 0x40)
                timer.status &= ~0x40;
            if (data & 0x20)
                timer.status &= ~0x20;
            for (const index of [0, 1]) {
                const load = data & (1 << index);
                if (!load)
                    timer.remaining[index] = Infinity;
                else if (!Number.isFinite(timer.remaining[index])) {
                    timer.remaining[index] = period(timer, index);
                }
            }
        }
        updateIrq(timer);
    };
    const createTimer = (tag, kind, clock) => {
        const timer = {
            tag,
            kind,
            clock: Math.max(1, clock),
            ownerCpu: cpuFor(tag),
            addresses: [0, 0],
            registers: new Uint8Array(0x200),
            status: 0,
            irq: false,
            remaining: [Infinity, Infinity],
        };
        timers.push(timer);
        return timer;
    };
    const writeTimer = (timer, offset, data) => {
        const bank = (offset >>> 1) & 1;
        if ((offset & 1) === 0) {
            timer.addresses[bank] = data & 0xff;
            return;
        }
        const address = timer.addresses[bank] + bank * 0x100;
        timer.registers[address] = data & 0xff;
        if ((timer.kind === 'opn' && address === 0x27) ||
            (timer.kind === 'opl' && address === 0x04)) {
            modeWrite(timer, data);
        }
    };
    const readTimer = (timer, offset) => {
        if ((offset & 1) === 0) {
            if (timer.kind === 'opn')
                return timer.status;
            const mask = timer.registers[0x04] & 0x78;
            return 0x06 | (timer.status & ~mask) | (timer.irq ? 0x80 : 0);
        }
        const bank = (offset >>> 1) & 1;
        const address = timer.addresses[bank] + bank * 0x100;
        return timer.kind === 'opn' && bank === 0 && address < 0x10
            ? timer.registers[address]
            : 0xff;
    };
    const tags = soundTags(sound);
    const portCounts = tags.map(tag => specificationFor(tag)?.type === 'YM2610' ? 4 : YM2203_PORTS_PER_CHIP);
    const portBases = portCounts.map((_count, index) => portCounts.slice(0, index).reduce((sum, count) => sum + count, 0));
    tags.forEach((tag, chip) => {
        const timer = createTimer(tag, 'opn', specificationFor(tag)?.clock ?? 1_500_000);
        const base = portBases[chip];
        const ports = portCounts[chip];
        for (const method of sound.writeMethods) {
            // Each chip exposes an address/data port pair, addressed as
            // chip * 2 + port so one worklet hosts every chip on the board.
            const write = (offset, data) => {
                writeTimer(timer, offset, data);
                context.soundWrite(base + (offset & (ports - 1)), data, context.fraction(), method);
            };
            registry.write[`${tag}.${method}`] = (_address, offset, data) => write(offset, data);
            for (const alias of deviceAliases(board, tag)) {
                calls[`${alias}.${method}`] = (offset, data) => write(Number(offset), Number(data));
            }
        }
        const read = (offset) => readTimer(timer, offset);
        registry.read[`${tag}.read`] = (_address, offset) => read(offset);
        for (const alias of deviceAliases(board, tag)) {
            calls[`${alias}.read`] = offset => read(Number(offset));
        }
        // ym_reset_w and kin reset the chip through the generated device port.
        for (const alias of deviceAliases(board, tag)) {
            calls[`${alias}.reset`] = () => {
                context.soundWrite(base, 0, context.fraction(), 'reset');
                return 0;
            };
        }
    });
    const primaryPorts = portCounts.reduce((sum, count) => sum + count, 0);
    let oplChip = 0;
    for (const auxiliary of sound.auxiliaryDevices ?? []) {
        if (auxiliary.type === 'MSM5205') {
            const base = primaryPorts + oplChip * YM2203_PORTS_PER_CHIP;
            for (const method of auxiliary.writeMethods) {
                const write = (data) => context.soundWrite(base, data, context.fraction(), `${auxiliary.deviceTag}.${method}`);
                registry.write[`${auxiliary.deviceTag}.${method}`] =
                    (_address, _offset, data) => write(data);
                for (const alias of deviceAliases(board, auxiliary.deviceTag)) {
                    calls[`${alias}.${method}`] = (...args) => write(Number(args.at(-1) ?? 0));
                }
            }
            continue;
        }
        if (auxiliary.type !== 'YM3526')
            continue;
        const timer = createTimer(auxiliary.deviceTag, 'opl', auxiliary.clock);
        const base = primaryPorts + oplChip++ * YM2203_PORTS_PER_CHIP;
        const write = (offset, data) => {
            writeTimer(timer, offset, data);
            context.soundWrite(base + (offset & 1), data, context.fraction(), `${auxiliary.deviceTag}.write`);
        };
        registry.write[`${auxiliary.deviceTag}.write`] =
            (_address, offset, data) => write(offset, data);
        const read = (offset) => readTimer(timer, offset);
        registry.read[`${auxiliary.deviceTag}.read`] =
            (_address, offset) => read(offset);
        for (const alias of deviceAliases(board, auxiliary.deviceTag)) {
            calls[`${alias}.write`] = (offset, data) => write(Number(offset), Number(data));
            calls[`${alias}.read`] = offset => read(Number(offset));
        }
    }
    return {
        tickCpu: (cpuTag, cycles) => {
            const cpu = board.execution.cpus.find(candidate => candidate.tag === cpuTag);
            if (!cpu)
                return;
            const elapsed = cycles / Math.max(1, cpu.cycleClock ?? cpu.clock);
            for (const timer of timers) {
                if (timer.ownerCpu !== cpuTag)
                    continue;
                const clocks = elapsed * timer.clock;
                for (const index of [0, 1]) {
                    if (!Number.isFinite(timer.remaining[index]))
                        continue;
                    timer.remaining[index] -= clocks;
                    while (timer.remaining[index] <= 0) {
                        const enable = timer.kind === 'opl' ||
                            Boolean(timer.registers[0x27] & (index === 0 ? 0x04 : 0x08));
                        if (enable)
                            timer.status |= timer.kind === 'opl'
                                ? (index === 0 ? 0x40 : 0x20)
                                : (index === 0 ? 0x01 : 0x02);
                        const load = Boolean(timer.registers[timer.kind === 'opn' ? 0x27 : 0x04] & (1 << index));
                        if (!load) {
                            timer.remaining[index] = Infinity;
                            break;
                        }
                        timer.remaining[index] += period(timer, index);
                    }
                    updateIrq(timer);
                }
            }
        },
        reset: () => {
            for (const timer of timers) {
                timer.addresses = [0, 0];
                timer.registers.fill(0);
                timer.status = 0;
                timer.remaining = [Infinity, Infinity];
                if (timer.irq) {
                    timer.irq = false;
                    context.dispatch(timer.tag, 'irq_handler', 0);
                }
            }
        },
    };
}
