// RP2A03 internal APU composition.  The generated board carries the source-
// derived map/plan; this runtime owns only the generic execution lifecycle.
import { DUTY, NES_DMC_RATES, NES_LENGTH_TABLE, NES_MIXER_CONSTANTS, NES_NOISE_PERIODS, NesApu, } from "./apu.js";
const RP2A03_APU_IRQ_LINE = 1;
export function installNesRuntime(context) {
    const plan = context.sound.nesApu;
    if (!plan)
        throw new Error(`${context.board.game}: NES sound binding has no generated APU plan`);
    verifyRuntimeTables(context.board.game, plan);
    const cpu = context.board.execution.cpus.find(candidate => candidate.type?.toLowerCase() === 'rp2a03');
    if (!cpu)
        throw new Error(`${context.board.game}: NES APU has no RP2A03 owner`);
    if (cpu.clock === plan.clocks.pal) {
        throw new Error(`${context.board.game}: PAL NES APU timing is not executable yet`);
    }
    const apu = new NesApu(cpu.clock, {
        onDmcStart: (address, length) => {
            const bytes = new Uint8Array(length);
            for (let index = 0; index < length; index++) {
                let source = address + index;
                if (source > 0xffff)
                    source = 0x8000 + ((source - 0x8000) & 0x7fff);
                bytes[index] = context.readProgram(cpu.tag, source);
            }
            context.soundData(0, bytes);
        },
    });
    const updateIrq = () => context.setCpuInputLine(cpu.tag, RP2A03_APU_IRQ_LINE, apu.irqAsserted() ? 1 : 0);
    context.registry.write[`nesapu.${plan.writeMethod}`] = (address, _offset, data) => {
        const register = address - 0x4000;
        apu.write(register, data);
        context.soundWrite(register, data, context.fraction(), plan.writeMethod);
        updateIrq();
    };
    context.registry.read[`nesapu.${plan.statusMethod}`] = () => {
        const value = apu.read4015();
        updateIrq();
        return value;
    };
    return {
        tickCpu: (tag, cycles) => {
            if (tag !== cpu.tag || cycles <= 0)
                return;
            apu.tick(cycles);
            const stalls = apu.consumeDmcStalls();
            if (stalls)
                context.stallCpu(cpu.tag, stalls);
            updateIrq();
        },
        reset: () => {
            apu.reset();
            updateIrq();
        },
    };
}
function verifyRuntimeTables(game, plan) {
    const equal = (left, right) => left.length === right.length && left.every((value, index) => value === right[index]);
    const duty = plan.dutyPatterns.map(pattern => Array.from({ length: 8 }, (_, bit) => (pattern >> (7 - bit)) & 1));
    if (!equal(NES_LENGTH_TABLE, plan.lengthTable) ||
        !equal(NES_NOISE_PERIODS, plan.noisePeriods.ntsc) ||
        !equal(NES_DMC_RATES, plan.dmcPeriods.ntsc) ||
        duty.some((row, index) => !equal(row, DUTY[index] ?? []))
        || plan.mixer.pulse.numerator !== NES_MIXER_CONSTANTS.pulseNumerator
        || plan.mixer.pulse.divisor !== NES_MIXER_CONSTANTS.pulseDivisor
        || plan.mixer.pulse.bias !== NES_MIXER_CONSTANTS.bias
        || plan.mixer.tnd.numerator !== NES_MIXER_CONSTANTS.tndNumerator
        || plan.mixer.tnd.triangleDivisor !== NES_MIXER_CONSTANTS.triangleDivisor
        || plan.mixer.tnd.noiseDivisor !== NES_MIXER_CONSTANTS.noiseDivisor
        || plan.mixer.tnd.dmcDivisor !== NES_MIXER_CONSTANTS.dmcDivisor
        || plan.mixer.tnd.bias !== NES_MIXER_CONSTANTS.bias) {
        throw new Error(`${game}: NES APU runtime tables have drifted from generated MAME audio IR`);
    }
}
