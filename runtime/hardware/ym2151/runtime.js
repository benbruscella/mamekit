import { deviceAliases, soundTags } from "../sound-runtime.js";
import { installAuxiliaryOkim6295Runtime } from "../okim6295/runtime.js";
export function installYm2151Runtime(context) {
    const cpuFor = (tag) => context.board.execution.cpus.find(cpu => [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])].some(range => range.read?.startsWith(`${tag}.`) || range.write?.startsWith(`${tag}.`)))?.tag ??
        context.board.execution.cpus[0]?.tag ??
        '';
    const timers = [];
    const timerPeriod = (timer, index) => {
        const value = index === 0
            ? (timer.registers[0x10] << 2) | (timer.registers[0x11] & 3)
            : timer.registers[0x12];
        return index === 0 ? (1024 - value) * 64 : (256 - value) * 1024;
    };
    const updateIrq = (timer) => {
        const control = timer.registers[0x14];
        const enabled = (control >>> 2) & 3;
        const next = Boolean(timer.status & enabled);
        if (next === timer.irq)
            return;
        timer.irq = next;
        context.dispatch(timer.tag, 'irq_handler', next ? 1 : 0);
    };
    const writeControl = (timer, value) => {
        if (value & 0x10)
            timer.status &= ~0x01;
        if (value & 0x20)
            timer.status &= ~0x02;
        for (const index of [0, 1]) {
            if (!(value & (1 << index)))
                timer.remaining[index] = Infinity;
            else if (!Number.isFinite(timer.remaining[index])) {
                timer.remaining[index] = timerPeriod(timer, index);
            }
        }
        updateIrq(timer);
    };
    for (const [chip, tag] of soundTags(context.sound).entries()) {
        const timer = {
            tag,
            clock: Math.max(1, context.board.devices?.find(device => device.tag === tag)?.clock ??
                3_579_545),
            ownerCpu: cpuFor(tag),
            address: 0,
            registers: new Uint8Array(0x100),
            status: 0,
            irq: false,
            remaining: [Infinity, Infinity],
        };
        timers.push(timer);
        const write = (offset, data) => {
            if ((offset & 1) === 0)
                timer.address = data & 0xff;
            else {
                timer.registers[timer.address] = data & 0xff;
                if (timer.address === 0x14)
                    writeControl(timer, data);
            }
            context.soundWrite(chip * 2 + (offset & 1), data, context.fraction(), 'write');
            return 0;
        };
        const address = (data) => write(0, data);
        const data = (value) => write(1, value);
        context.registry.write[`${tag}.write`] = (_address, offset, value) => void write(offset, value);
        context.registry.read[`${tag}.read`] = () => timer.status;
        for (const alias of deviceAliases(context.board, tag)) {
            context.calls[`${alias}.write`] = write;
            context.calls[`${alias}.address_w`] = address;
            context.calls[`${alias}.data_w`] = data;
            context.calls[`${alias}.read`] = () => timer.status;
            context.calls[`${alias}.status_r`] = () => timer.status;
        }
    }
    const auxiliaries = (context.sound.auxiliaryDevices ?? [])
        .filter(device => device.type === 'OKIM6295')
        .map(device => installAuxiliaryOkim6295Runtime(context, device));
    // MSM5205 ADPCM chips mixed by the worklet: the board never instantiates
    // them, so driver calls (m_adpcm[0]->data_w from the vck feeder) and mapped
    // writes go straight to the sink, tagged by device and method name.
    for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
        if (auxiliary.type !== 'MSM5205')
            continue;
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
                const key = `${alias}.${method}`;
                const original = context.calls[key];
                context.calls[key] = (...args) => {
                    const result = original?.(...args);
                    context.soundWrite(0, args.at(-1) ?? 0, context.fraction(), name);
                    return result;
                };
            }
        }
    }
    return {
        reset: () => {
            for (const timer of timers) {
                timer.address = 0;
                timer.registers.fill(0);
                timer.status = 0;
                timer.remaining = [Infinity, Infinity];
                if (timer.irq) {
                    timer.irq = false;
                    context.dispatch(timer.tag, 'irq_handler', 0);
                }
            }
            for (const auxiliary of auxiliaries)
                auxiliary.reset?.();
        },
        tickCpu: (cpuTag, cycles) => {
            const cpu = context.board.execution.cpus.find(candidate => candidate.tag === cpuTag);
            if (cpu) {
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
                            timer.status |= 1 << index;
                            if (!(timer.registers[0x14] & (1 << index))) {
                                timer.remaining[index] = Infinity;
                                break;
                            }
                            timer.remaining[index] += timerPeriod(timer, index);
                        }
                        updateIrq(timer);
                    }
                }
            }
            for (const auxiliary of auxiliaries)
                auxiliary.tickCpu?.(cpuTag, cycles);
        },
    };
}
