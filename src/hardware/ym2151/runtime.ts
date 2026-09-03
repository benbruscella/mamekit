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

const UPD_IDLE = 0;
const UPD_DROP_DRQ = 1;
const UPD_START = 2;
const UPD_FIRST_REQ = 3;
const UPD_LAST_SAMPLE = 4;
const UPD_DUMMY1 = 5;
const UPD_ADDR_MSB = 6;
const UPD_ADDR_LSB = 7;
const UPD_DUMMY2 = 8;
const UPD_BLOCK_HEADER = 9;
const UPD_NIBBLE_COUNT = 10;
const UPD_NIBBLE_MSN = 11;
const UPD_NIBBLE_LSN = 12;

/** Timer/handshake half of MAME's uPD7759 slave-mode state machine. */
class Upd7759Runtime {
  readonly tag: string;
  readonly clock: number;
  readonly ownerCpu: string;
  private readonly dispatch: (tag: string, signal: string, value: number) => void;
  private state = UPD_IDLE;
  private clocksLeft = 0;
  private fifo = 0;
  private resetLine = true;
  private startLine = true;
  private mdLine = true;
  private drq = 0;
  private postState = UPD_IDLE;
  private postClocks = 0;
  private requestedSample = 0;
  private lastSample = 0;
  private blockHeader = 0;
  private sampleRate = 0;
  private nibblesLeft = 0;
  private repeatCount = 0;
  private firstHeader = false;

  constructor(
    tag: string,
    clock: number,
    ownerCpu: string,
    dispatch: (tag: string, signal: string, value: number) => void,
  ) {
    this.tag = tag;
    this.clock = clock;
    this.ownerCpu = ownerCpu;
    this.dispatch = dispatch;
  }

  write(method: string, data: number): void {
    if (method === 'port_w') this.fifo = data & 0xff;
    else if (method === 'reset_w') {
      const next = data !== 0;
      if (this.resetLine && !next) this.reset();
      this.resetLine = next;
    } else if (method === 'start_w') {
      const next = data !== 0;
      if (
        this.state === UPD_IDLE && this.mdLine &&
        this.startLine && !next && this.resetLine
      ) {
        this.state = UPD_START;
        this.clocksLeft = 0;
      }
      this.startLine = next;
    } else if (method === 'md_w') {
      const next = data !== 0;
      if (this.state === UPD_IDLE && this.resetLine && this.mdLine && !next) {
        this.state = UPD_START;
        this.clocksLeft = 0;
      }
      this.mdLine = next;
    }
  }

  busy(): number {
    return this.state === UPD_IDLE ? 1 : 0;
  }

  tick(cpuTag: string, cycles: number, cpuClock: number): void {
    if (cpuTag !== this.ownerCpu || this.state === UPD_IDLE) return;
    this.clocksLeft -= cycles / Math.max(1, cpuClock) * this.clock;
    let guard = 0;
    while (this.clocksLeft <= 0 && this.state !== UPD_IDLE && guard++ < 4096) {
      const overrun = this.clocksLeft;
      this.advance();
      this.clocksLeft += overrun;
    }
  }

  reset(): void {
    this.state = UPD_IDLE;
    this.clocksLeft = 0;
    this.nibblesLeft = 0;
    this.repeatCount = 0;
    this.postState = UPD_IDLE;
    this.postClocks = 0;
    this.requestedSample = 0;
    this.lastSample = 0;
    this.blockHeader = 0;
    this.sampleRate = 0;
    this.firstHeader = false;
    this.setDrq(0);
  }

  private advance(): void {
    if (this.state === UPD_DROP_DRQ) {
      this.setDrq(0);
      this.state = this.postState;
      this.clocksLeft = this.postClocks;
      return;
    }
    let request = false;
    if (this.state === UPD_START) {
      this.requestedSample = this.mdLine ? this.fifo : 0x10;
      this.clocksLeft = 70;
      this.state = UPD_FIRST_REQ;
    } else if (this.state === UPD_FIRST_REQ) {
      request = true;
      this.clocksLeft = 44;
      this.state = UPD_LAST_SAMPLE;
    } else if (this.state === UPD_LAST_SAMPLE) {
      this.lastSample = this.fifo;
      request = true;
      this.clocksLeft = 28;
      this.state = this.requestedSample > this.lastSample ? UPD_IDLE : UPD_DUMMY1;
    } else if (this.state === UPD_DUMMY1) {
      request = true;
      this.clocksLeft = 32;
      this.state = UPD_ADDR_MSB;
    } else if (this.state === UPD_ADDR_MSB) {
      request = true;
      this.clocksLeft = 44;
      this.state = UPD_ADDR_LSB;
    } else if (this.state === UPD_ADDR_LSB) {
      request = true;
      this.clocksLeft = 36;
      this.state = UPD_DUMMY2;
    } else if (this.state === UPD_DUMMY2) {
      request = true;
      this.firstHeader = false;
      this.clocksLeft = 36;
      this.state = UPD_BLOCK_HEADER;
    } else if (this.state === UPD_BLOCK_HEADER) {
      if (this.repeatCount) this.repeatCount--;
      this.blockHeader = this.fifo;
      request = true;
      if ((this.blockHeader & 0xc0) === 0) {
        this.clocksLeft = 1024 * ((this.blockHeader & 0x3f) + 1);
        this.state = this.blockHeader === 0 && this.firstHeader
          ? UPD_IDLE
          : UPD_BLOCK_HEADER;
      } else if ((this.blockHeader & 0xc0) === 0x40) {
        this.sampleRate = (this.blockHeader & 0x3f) + 1;
        this.nibblesLeft = 256;
        this.clocksLeft = 36;
        this.state = UPD_NIBBLE_MSN;
      } else if ((this.blockHeader & 0xc0) === 0x80) {
        this.sampleRate = (this.blockHeader & 0x3f) + 1;
        this.clocksLeft = 36;
        this.state = UPD_NIBBLE_COUNT;
      } else {
        this.repeatCount = (this.blockHeader & 7) + 1;
        this.clocksLeft = 36;
        this.state = UPD_BLOCK_HEADER;
      }
      if (this.blockHeader !== 0) this.firstHeader = true;
    } else if (this.state === UPD_NIBBLE_COUNT) {
      this.nibblesLeft = this.fifo + 1;
      request = true;
      this.clocksLeft = 36;
      this.state = UPD_NIBBLE_MSN;
    } else if (this.state === UPD_NIBBLE_MSN) {
      request = true;
      this.clocksLeft = this.sampleRate * 4;
      this.state = --this.nibblesLeft === 0 ? UPD_BLOCK_HEADER : UPD_NIBBLE_LSN;
    } else if (this.state === UPD_NIBBLE_LSN) {
      this.clocksLeft = this.sampleRate * 4;
      this.state = --this.nibblesLeft === 0 ? UPD_BLOCK_HEADER : UPD_NIBBLE_MSN;
    }
    if (request) {
      this.postState = this.state;
      this.postClocks = this.clocksLeft - 21;
      this.state = UPD_DROP_DRQ;
      this.clocksLeft = 21;
      this.setDrq(1);
    }
  }

  private setDrq(value: number): void {
    if (this.drq === value) return;
    this.drq = value;
    this.dispatch(this.tag, 'drq', value);
  }
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
  const upd = (context.sound.auxiliaryDevices ?? [])
    .filter(device => device.type === 'UPD7759')
    .map(device => new Upd7759Runtime(
      device.deviceTag,
      device.clock,
      cpuFor(device.deviceTag),
      context.dispatch,
    ));
  for (const chip of upd) {
    const definition = context.sound.auxiliaryDevices?.find(device =>
      device.deviceTag === chip.tag);
    for (const method of definition?.writeMethods ?? []) {
      const name = `${chip.tag}.${method}`;
      const write = (value: number): number => {
        chip.write(method, value);
        context.soundWrite(0, value, context.fraction(), name);
        return 0;
      };
      context.registry.write[name] = (_address, _offset, value) => void write(value);
      for (const alias of deviceAliases(context.board, chip.tag)) {
        context.calls[`${alias}.${method}`] = (...args: number[]) => write(args.at(-1) ?? 0);
      }
    }
    for (const alias of deviceAliases(context.board, chip.tag)) {
      context.calls[`${alias}.busy_r`] = () => chip.busy();
    }
    context.registry.read[`${chip.tag}.busy_r`] = () => chip.busy();
  }
  // K007232 keeps its register/control state in the generated source device.
  // Mirror those board-facing calls to the worklet so its source-derived PCM
  // stream advances from the same writes without duplicating device state on
  // the main thread.
  for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
    if (auxiliary.type !== 'K007232') continue;
    const tag = auxiliary.deviceTag;
    const writeName = `${tag}.write`;
    const mappedWrite = context.registry.write[writeName];
    context.registry.write[writeName] = (address, offset, data) => {
      mappedWrite?.(address, offset, data);
      context.soundWrite(offset, data, context.fraction(), writeName);
    };
    const readName = `${tag}.read`;
    const mappedRead = context.registry.read[readName];
    context.registry.read[readName] = (address, offset) => {
      const value = mappedRead?.(address, offset) ?? 0;
      context.soundWrite(offset, 0, context.fraction(), readName);
      return value;
    };
    for (const alias of deviceAliases(context.board, tag)) {
      const originalWrite = context.calls[`${alias}.write`];
      context.calls[`${alias}.write`] = (...args: number[]) => {
        const result = originalWrite?.(...args);
        const offset = args.at(-2) ?? 0;
        context.soundWrite(offset, args.at(-1) ?? 0, context.fraction(), writeName);
        return result;
      };
      const originalRead = context.calls[`${alias}.read`];
      context.calls[`${alias}.read`] = (...args: number[]) => {
        const result = originalRead?.(...args) ?? 0;
        context.soundWrite(args.at(-1) ?? 0, 0, context.fraction(), readName);
        return result;
      };
      const originalVolume = context.calls[`${alias}.set_volume`];
      context.calls[`${alias}.set_volume`] = (...args: number[]) => {
        const result = originalVolume?.(...args);
        const channel = args.at(-3) ?? 0;
        context.soundWrite(channel * 2, args.at(-2) ?? 0, context.fraction(), `${tag}.set_volume`);
        context.soundWrite(channel * 2 + 1, args.at(-1) ?? 0, context.fraction(), `${tag}.set_volume`);
        return result;
      };
      const originalBank = context.calls[`${alias}.set_bank`];
      context.calls[`${alias}.set_bank`] = (...args: number[]) => {
        const result = originalBank?.(...args);
        context.soundWrite(0, args.at(-2) ?? 0, context.fraction(), `${tag}.set_bank`);
        context.soundWrite(1, args.at(-1) ?? 0, context.fraction(), `${tag}.set_bank`);
        return result;
      };
    }
  }
  // K053260 likewise keeps its communication ports on the generated device,
  // while the worklet mirrors sound-register writes to render its four sample
  // voices without moving CPU-visible state off the main thread.
  for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
    if (auxiliary.type !== 'K053260') continue;
    const tag = auxiliary.deviceTag;
    const name = `${tag}.write`;
    const mapped = context.registry.write[name];
    context.registry.write[name] = (address, offset, data) => {
      mapped?.(address, offset, data);
      context.soundWrite(offset, data, context.fraction(), name);
    };
    for (const alias of deviceAliases(context.board, tag)) {
      const original = context.calls[`${alias}.write`];
      context.calls[`${alias}.write`] = (...args: number[]) => {
        const result = original?.(...args);
        context.soundWrite(
          args.at(-2) ?? 0,
          args.at(-1) ?? 0,
          context.fraction(),
          name,
        );
        return result;
      };
    }
  }
  for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
    if (auxiliary.type !== 'SAMPLES') continue;
    const tag = auxiliary.deviceTag;
    const playing = new Set<number>();
    for (const alias of deviceAliases(context.board, tag)) {
      const originalStart = context.calls[`${alias}.start`];
      context.calls[`${alias}.start`] = (...args: number[]) => {
        const result = originalStart?.(...args);
        const channel = Number(args.at(-3) ?? args.at(-2) ?? 0);
        playing.add(channel);
        context.soundWrite(channel, Number(args.at(-2) ?? args.at(-1) ?? 0),
          context.fraction(), `${tag}.start`);
        return result;
      };
      const originalRaw = context.calls[`${alias}.start_raw`];
      context.calls[`${alias}.start_raw`] = (...args: number[]) => {
        const result = originalRaw?.(...args);
        const channel = Number(args.at(-4) ?? 0);
        playing.add(channel);
        context.soundWrite(channel, 1, context.fraction(), `${tag}.start_raw`);
        return result;
      };
      const originalStop = context.calls[`${alias}.stop`];
      context.calls[`${alias}.stop`] = (...args: number[]) => {
        const result = originalStop?.(...args);
        const channel = Number(args.at(-1) ?? 0);
        playing.delete(channel);
        context.soundWrite(channel, 0, context.fraction(), `${tag}.stop`);
        return result;
      };
      context.calls[`${alias}.playing`] = (...args: number[]) =>
        playing.has(Number(args.at(-1) ?? 0)) ? 1 : 0;
    }
  }
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
      for (const chip of upd) chip.reset();
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
      for (const chip of upd) {
        const owner = context.board.execution.cpus.find(candidate => candidate.tag === cpuTag);
        chip.tick(cpuTag, cycles, owner?.cycleClock ?? owner?.clock ?? 1);
      }
    },
  };
}
