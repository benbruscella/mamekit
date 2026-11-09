import { deviceAliases, soundTags, type SoundRuntimeContext, type SoundRuntimeHooks } from '../sound-runtime.ts';
import { createStreamMixer, streamDeviceSources } from '../speaker/runtime.ts';
import { STREAM_AUDIO_RATE } from '../speaker/definition.ts';

interface OpmTimerState {
  tag: string;
  clock: number;
  ownerCpu: string;
  address: number;
  registers: Uint8Array;
  status: number;
  irq: boolean;
  remaining: [number, number];
}

export function installYm2151Runtime(context: SoundRuntimeContext): SoundRuntimeHooks {
  const cpuFor = (tag: string): string =>
    context.board.execution.cpus.find(cpu =>
      [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])].some(range =>
        range.read?.startsWith(`${tag}.`) || range.write?.startsWith(`${tag}.`)))?.tag ??
    context.board.execution.cpus[0]?.tag ??
    '';
  const timers: OpmTimerState[] = [];
  const instructionCycles = new Map<string, number>();
  const cpuClocks = new Map(context.board.execution.cpus.map(cpu =>
    [cpu.tag, Math.max(1, cpu.cycleClock ?? cpu.clock)]));
  const advanceTimers = (cpuTag: string, cycles: number): void => {
    const cpuClock = cpuClocks.get(cpuTag);
    if (!cpuClock || cycles <= 0) return;
    const elapsed = cycles / cpuClock;
    for (const timer of timers) {
      if (timer.ownerCpu !== cpuTag) continue;
      const clocks = elapsed * timer.clock;
      for (const index of [0, 1] as const) {
        if (!Number.isFinite(timer.remaining[index])) continue;
        timer.remaining[index] -= clocks;
        while (timer.remaining[index] <= 0) {
          timer.status |= 1 << index;
          if (!(timer.registers[0x14]! & (1 << index))) {
            timer.remaining[index] = Infinity;
            break;
          }
          timer.remaining[index] += timerPeriod(timer, index);
        }
        updateIrq(timer);
      }
    }
  };
  const timerPeriod = (timer: OpmTimerState, index: number): number => {
    const value = index === 0
      ? (timer.registers[0x10]! << 2) | (timer.registers[0x11]! & 3)
      : timer.registers[0x12]!;
    return index === 0 ? (1024 - value) * 64 : (256 - value) * 1024;
  };
  const updateIrq = (timer: OpmTimerState): void => {
    const control = timer.registers[0x14]!;
    const enabled = (control >>> 2) & 3;
    const next = Boolean(timer.status & enabled);
    if (next === timer.irq) return;
    timer.irq = next;
    context.dispatch(timer.tag, 'irq_handler', next ? 1 : 0);
  };
  const writeControl = (timer: OpmTimerState, value: number): void => {
    if (value & 0x10) timer.status &= ~0x01;
    if (value & 0x20) timer.status &= ~0x02;
    for (const index of [0, 1] as const) {
      if (!(value & (1 << index))) timer.remaining[index] = Infinity;
      else if (!Number.isFinite(timer.remaining[index])) {
        timer.remaining[index] = timerPeriod(timer, index);
      }
    }
    updateIrq(timer);
  };
  for (const [chip, tag] of soundTags(context.sound).entries()) {
    const timer: OpmTimerState = {
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
    const write = (offset: number, data: number): number => {
      if ((offset & 1) === 0) timer.address = data & 0xff;
      else {
        timer.registers[timer.address] = data & 0xff;
        if (timer.address === 0x14) writeControl(timer, data);
      }
      context.soundWrite(chip * 2 + (offset & 1), data, context.fraction(), 'write');
      return 0;
    };
    const address = (data: number): number => write(0, data);
    const data = (value: number): number => write(1, value);
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
  // Devices beside the FM chips that render their own stream on the main
  // thread (Gauntlet's and Marble Madness's POKEY): mixed there and handed to
  // the worklet as one PCM stream at its routed gain.
  const streams = context.sound.streamDevices?.length
    ? createStreamMixer(context, streamDeviceSources(context.sound.streamDevices),
      (sample, frac) => context.soundWrite(STREAM_AUDIO_RATE, sample, frac, 'stream.pcm'))
    : undefined;
  return {
    state: { timers, ...(streams ? { streams: streams.state } : {}) },
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
      streams?.reset?.();
    },
    endFrame: () => streams?.endFrame?.(),
    instructionCpus: new Set(timers.map(timer => timer.ownerCpu)),
    tickInstruction: (cpuTag, cycles) => {
      instructionCycles.set(cpuTag, (instructionCycles.get(cpuTag) ?? 0) + cycles);
      advanceTimers(cpuTag, cycles);
    },
    tickCpu: (cpuTag, cycles) => {
      // The instruction ticks already moved the timers through this slice;
      // only an overshoot past its target is left.
      const seen = instructionCycles.get(cpuTag) ?? 0;
      instructionCycles.set(cpuTag, 0);
      advanceTimers(cpuTag, Math.max(0, cycles - seen));
      streams?.tickCpu?.(cpuTag, cycles);
    },
  };
}
