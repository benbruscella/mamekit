import { deviceAliases, soundTags, type SoundRuntimeContext } from '../sound-runtime.ts';
import { installAuxiliaryOkim6295Runtime } from '../okim6295/runtime.ts';

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

export function installYm2151Runtime(context: SoundRuntimeContext): {
  reset(): void;
  tickCpu?(cpuTag: string, cycles: number): void;
} {
  const cpuFor = (tag: string): string =>
    context.board.execution.cpus.find(cpu =>
      [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])].some(range =>
        range.read?.startsWith(`${tag}.`) || range.write?.startsWith(`${tag}.`)))?.tag ??
    context.board.execution.cpus[0]?.tag ??
    '';
  const timers: OpmTimerState[] = [];
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
  const auxiliaries = (context.sound.auxiliaryDevices ?? [])
    .filter(device => device.type === 'OKIM6295')
    .map(device => installAuxiliaryOkim6295Runtime(context, device));
  // MSM5205 ADPCM chips mixed by the worklet: the board never instantiates
  // them, so driver calls (m_adpcm[0]->data_w from the vck feeder) and mapped
  // writes go straight to the sink, tagged by device and method name.
  // A TMS5220 runs its engine on the main thread, because its /READY pin
  // feeds a port the sound CPU polls. Here we only pump it: the board's own
  // clock decides how many native samples are due, and each one is forwarded
  // to the sink as finished PCM.
  const speech = (context.sound.auxiliaryDevices ?? [])
    .filter(device => device.type.startsWith('TMS5220'))
    .map(device => {
      const clock = context.board.devices?.find(candidate =>
        candidate.tag === device.deviceTag)?.clock ?? device.clock;
      context.calls[`${device.deviceTag}.set_unscaled_clock`]?.(clock);
      // tickCpu fires once per processor, so exactly one of them has to drive
      // the clock or the same elapsed time is counted twice and the chip
      // speaks at nearly double speed. It cannot be the CPU that owns the
      // bus either: gauntlet holds its sound 6502 in reset, and a speech chip
      // does not stop running just because the CPU talking to it has.
      return {
        deviceTag: device.deviceTag,
        ownerCpu: context.board.execution.cpus[0]?.tag ?? '',
        rate: clock / 80,
        carry: 0,
      };
    });

  // A POKEY answering the same speaker: the register offset carries the
  // channel, so unlike the MSM5205 feeder its writes forward the offset too.
  for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
    if (auxiliary.type !== 'POKEY') continue;
    const name = `${auxiliary.deviceTag}.write`;
    context.registry.write[name] = (_address, offset, data) => {
      context.soundWrite(offset, data, context.fraction(), name);
    };
    for (const alias of deviceAliases(context.board, auxiliary.deviceTag)) {
      context.calls[`${alias}.write`] = (...args: number[]) => {
        context.soundWrite(
          Number(args.at(-2) ?? 0) || 0,
          args.at(-1) ?? 0,
          context.fraction(),
          name,
        );
        return 0;
      };
    }
  }
  for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
    if (auxiliary.type !== 'MSM5205') continue;
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
        context.calls[key] = (...args: number[]) => {
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
      for (const auxiliary of auxiliaries) auxiliary.reset?.();
    },
    tickCpu: (cpuTag, cycles) => {
      const cpu = context.board.execution.cpus.find(candidate => candidate.tag === cpuTag);
      if (cpu) {
        const elapsed = cycles / Math.max(1, cpu.cycleClock ?? cpu.clock);
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
      }
      const speechCpu = context.board.execution.cpus.find(candidate =>
        candidate.tag === cpuTag);
      if (speechCpu && speech.length) {
        const elapsed = cycles / Math.max(1, speechCpu.cycleClock ?? speechCpu.clock);
        for (const chip of speech) {
          if (chip.ownerCpu !== cpuTag) continue;
          const live = Number(context.calls[`${chip.deviceTag}.sample_rate`]?.() ?? 0);
          chip.carry += elapsed * (live > 0 ? live : chip.rate);
          let due = Math.floor(chip.carry);
          chip.carry -= due;
          // A long stall must not turn into an unbounded catch-up burst.
          if (due > 2048) due = 2048;
          const generate = context.calls[`${chip.deviceTag}.sound_stream_update`];
          if (!generate) continue;
          for (let index = 0; index < due; index++) {
            context.soundWrite(0, Number(generate()), context.fraction(), `${chip.deviceTag}.pcm`);
          }
        }
      }
      for (const auxiliary of auxiliaries) auxiliary.tickCpu?.(cpuTag, cycles);
    },
  };
}
