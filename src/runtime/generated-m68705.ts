import type {
  Device,
  DeviceCallbackListener,
  GeneratedDeviceOptions,
  GeneratedDeviceLink,
  GeneratedDeviceDefinition,
} from './generated-device.ts';
import type { GeneratedCallArgument } from './generated-handler.ts';

const H = 0x10;
const I = 0x08;
const N = 0x04;
const Z = 0x02;
const C = 0x01;

/** Motorola 68705P5 core used by source-composed protection devices. */
export class GeneratedM68705P5Device implements Device {
  private readonly clock: number;
  private readonly rom: Uint8Array;
  private readonly ram = new Uint8Array(0x80);
  private readonly listeners = new Map<string, DeviceCallbackListener[]>();
  private readonly calls: Record<string, (...args: any[]) => unknown> = {};
  private readonly portLatch = Uint8Array.from([0xff, 0xff, 0xff]);
  private readonly portDdr = new Uint8Array(3);
  private a = 0;
  private x = 0;
  private pc = 0;
  private sp = 0x7f;
  private cc = I;
  private irq = false;
  private irqLine = false;
  private timerIrq = false;
  private timerData = 0xff;
  private timerControl = 0x7f;
  private timerPrescale = 0x7f;
  private timerDivisor = 7;
  private timerSource = 0;
  private waiting = false;
  private icount = 0;

  constructor(options: GeneratedDeviceOptions) {
    this.clock = options.clock ?? 0;
    const regions = options.regions ?? {};
    const leaf = options.tag?.split(':').at(-1) ?? 'mcu';
    this.rom = regions[options.tag ?? ''] ?? regions[
      Object.keys(regions).find(name => name.endsWith(`:${leaf}`)) ?? ''
    ] ?? new Uint8Array(0x800);
    this.reset();
  }

  reset(): void {
    this.portDdr.fill(0);
    this.a = 0;
    this.x = 0;
    this.sp = 0x7f;
    this.cc = I;
    this.irq = false;
    this.irqLine = false;
    this.timerIrq = false;
    this.timerData = 0xff;
    this.timerControl = 0x7f;
    this.timerPrescale = 0x7f;
    this.timerDivisor = 7;
    this.timerSource = 0;
    this.waiting = false;
    this.icount = 0;
    this.pc = this.word(0x7fe);
  }

  tick(_seconds: number): void {}

  call(name: string, ...args: number[]): number {
    return Number(this.invoke(name, ...args) ?? 0);
  }

  invoke(name: string, ...args: GeneratedCallArgument[]): unknown {
    if (name === 'execute_run') return this.run();
    if (name === 'execute_set_input' || name === 'set_input_line') {
      const line = Number(args[0] ?? 0);
      const active = Number(args[1] ?? 0) !== 0;
      if (line === -2) {
        if (active) this.reset();
        return 0;
      }
      if (line === 0 && active !== this.irqLine) {
        this.irqLine = active;
        if (active) this.irq = true;
      }
      return 0;
    }
    return this.calls[name]?.(...args) ?? 0;
  }

  get(name: string): number {
    if (name === 'm_icount') return this.icount;
    if (name === 'm_a' || name === 'A') return this.a;
    if (name === 'm_x' || name === 'X') return this.x;
    if (name === 'm_pc' || name === 'PC') return this.pc;
    if (name === 'm_s' || name === 'SP') return this.sp;
    if (name === 'm_cc' || name === 'CC') return this.cc;
    if (name === 'm_state') return this.pc;
    return 0;
  }

  set(name: string, value: number): void {
    if (name === 'm_icount') this.icount = value | 0;
    else if (name === 'm_a' || name === 'A') this.a = value & 0xff;
    else if (name === 'm_x' || name === 'X') this.x = value & 0xff;
    else if (name === 'm_pc' || name === 'PC') this.pc = value & 0x7ff;
    else if (name === 'm_s' || name === 'SP') this.sp = this.adjustSp(value);
    else if (name === 'm_cc' || name === 'CC') this.cc = value & 0xff;
  }

  constant(name: string): number | undefined {
    const constants: Record<string, number> = {
      INPUT_LINE_IRQ0: 0,
      INPUT_LINE_RESET: 1,
    };
    return constants[name] ?? constants[name.split('::').at(-1)!];
  }

  methodNames(): readonly string[] {
    return ['execute_run', 'execute_set_input', 'set_input_line'];
  }
  arity(name: string): number {
    return name === 'execute_set_input' || name === 'set_input_line' ? 2 : 0;
  }
  parameters(name: string): readonly string[] {
    return name === 'execute_set_input' ? ['inputnum', 'state'] : [];
  }
  signalNames(): readonly string[] {
    return [
      'porta_r', 'portb_r', 'portc_r',
      'porta_w', 'portb_w', 'portc_w',
    ];
  }
  on(signal: string, listener: DeviceCallbackListener, slot = 0): Device {
    const values = this.listeners.get(signal) ?? [];
    values[slot] = listener;
    this.listeners.set(signal, values);
    return this;
  }
  bindCall(name: string, listener: (...args: any[]) => unknown): Device {
    this.calls[name] = listener;
    return this;
  }
  cycleClock(): number { return this.clock / 4; }
  dataAddressBits(): number | undefined { return 11; }
  bus(): GeneratedDeviceDefinition['bus'] { return undefined; }
  role(): string | undefined { return undefined; }
  links(): readonly GeneratedDeviceLink[] { return []; }
  invokeSlot(name: string, ...args: GeneratedCallArgument[]): unknown {
    return this.invoke(name, ...args);
  }

  private run(): number {
    const target = Math.max(0, this.icount | 0);
    let used = 0;
    while (used < target) {
      if ((this.irq || this.timerIrq) && !(this.cc & I)) {
        this.pushWord(this.pc);
        this.push(this.x);
        this.push(this.a);
        this.push(this.cc);
        this.cc |= I;
        if (this.irq) {
          this.pc = this.word(0x7fa);
          this.irq = false;
        } else {
          this.pc = this.word(0x7f8);
        }
        this.waiting = false;
        used += 11;
        this.tickTimer(11);
        continue;
      }
      if (this.waiting) {
        used++;
        continue;
      }
      const op = this.fetch();
      const cycles = this.execute(op);
      used += cycles;
      this.tickTimer(cycles);
    }
    this.icount -= used;
    return used;
  }

  private execute(op: number): number {
    if (op < 0x10) {
      const address = this.fetch();
      const relative = this.fetchSigned();
      const bit = 1 << (op >>> 1);
      const set = Boolean(this.read(address) & bit);
      const take = op & 1 ? !set : set;
      this.cc = set ? this.cc | C : this.cc & ~C;
      if (take) this.pc = (this.pc + relative) & 0x7ff;
      return 5;
    }
    if (op < 0x20) {
      const address = this.fetch();
      const bit = 1 << ((op - 0x10) >>> 1);
      const value = this.read(address);
      this.write(address, op & 1 ? value & ~bit : value | bit);
      return 5;
    }
    if (op < 0x30) {
      const relative = this.fetchSigned();
      const base = op & 0x0e;
      let take = false;
      if (base === 0x00) take = true;
      else if (base === 0x02) take = !(this.cc & (C | Z));
      else if (base === 0x04) take = !(this.cc & C);
      else if (base === 0x06) take = !(this.cc & Z);
      else if (base === 0x08) take = !(this.cc & H);
      else if (base === 0x0a) take = !(this.cc & N);
      else if (base === 0x0c) take = !(this.cc & I);
      // BIH/BIL sample the physical IRQ pin, not the edge-latched pending
      // interrupt.  The handler uses this to distinguish its external IRQ
      // entry from the shared timer path before acknowledging 68LRD.
      else if (base === 0x0e) take = this.irqLine;
      if (op & 1) take = !take;
      if (take) this.pc = (this.pc + relative) & 0x7ff;
      return 3;
    }
    if (op < 0x80) {
      const group = op >>> 4;
      const operation = op & 0x0f;
      if (group === 4 || group === 5) {
        const source = group === 4 ? this.a : this.x;
        const result = this.unary(operation, source);
        if (result !== undefined) {
          if (group === 4) this.a = result;
          else this.x = result;
        }
        return 3;
      }
      const address = group === 3 ? this.fetch() :
        group === 6 ? (this.x + this.fetch()) & 0x7ff : this.x;
      const result = this.unary(operation, this.read(address));
      if (result !== undefined && operation !== 0x0d) this.write(address, result);
      return group === 3 ? 5 : 6;
    }
    if (op === 0x80) {
      this.cc = this.pull();
      this.a = this.pull();
      this.x = this.pull();
      this.pc = this.pullWord();
      return 9;
    }
    if (op === 0x81) { this.pc = this.pullWord(); return 6; }
    if (op === 0x83) {
      this.pushWord(this.pc); this.push(this.x); this.push(this.a); this.push(this.cc);
      this.cc |= I; this.pc = this.word(0x7fc); return 11;
    }
    if (op === 0x8e || op === 0x8f) { this.waiting = true; return 2; }
    if (op === 0x97) { this.x = this.a; return 2; }
    if (op === 0x98) { this.cc &= ~C; return 2; }
    if (op === 0x99) { this.cc |= C; return 2; }
    if (op === 0x9a) { this.cc &= ~I; return 2; }
    if (op === 0x9b) { this.cc |= I; return 2; }
    if (op === 0x9c) { this.sp = 0x7f; return 2; }
    if (op === 0x9d) return 2;
    if (op === 0x9f) { this.a = this.x; return 2; }
    if (op >= 0xa0) return this.alu(op);
    return 2;
  }

  private unary(operation: number, source: number): number | undefined {
    let result = source & 0xff;
    if (operation === 0x00) {
      const wide = -result;
      this.clear(N | Z | C); this.setNzc(wide); result = wide;
    } else if (operation === 0x03) {
      result = ~result; this.clear(N | Z); this.setNz(result); this.cc |= C;
    } else if (operation === 0x04) {
      this.clear(N | Z | C); this.cc |= source & 1; result = source >>> 1; this.setNz(result);
    } else if (operation === 0x06) {
      const carry = this.cc & C; this.clear(N | Z | C); this.cc |= source & 1;
      result = (source >>> 1) | (carry << 7); this.setNz(result);
    } else if (operation === 0x07) {
      this.clear(N | Z | C); this.cc |= source & 1;
      result = (source >>> 1) | (source & 0x80); this.setNz(result);
    } else if (operation === 0x08) {
      const wide = source << 1; this.clear(N | Z | C); this.setNzc(wide); result = wide;
    } else if (operation === 0x09) {
      const wide = (source << 1) | (this.cc & C); this.clear(N | Z | C);
      this.setNzc(wide); result = wide;
    } else if (operation === 0x0a) {
      result = source - 1; this.clear(N | Z); this.setNz(result);
    } else if (operation === 0x0c) {
      result = source + 1; this.clear(N | Z); this.setNz(result);
    } else if (operation === 0x0d) {
      this.clear(N | Z); this.setNz(source); return undefined;
    } else if (operation === 0x0f) {
      this.clear(N | Z); this.cc |= Z; result = 0;
    } else return undefined;
    return result & 0xff;
  }

  private alu(op: number): number {
    const mode = op >>> 4;
    const operation = op & 0x0f;
    let address = 0;
    if (mode === 0x0a) address = this.pc++ & 0x7ff;
    else if (mode === 0x0b) address = this.fetch();
    else if (mode === 0x0c) address = this.fetchWord();
    else if (mode === 0x0d) address = (this.x + this.fetchWord()) & 0x7ff;
    else if (mode === 0x0e) address = (this.x + this.fetch()) & 0x7ff;
    else address = this.x;
    if (operation === 0x0c) { this.pc = address; return 3; }
    if (operation === 0x0d) {
      if (mode === 0x0a) {
        const relative = this.read(address) & 0x80 ? this.read(address) - 0x100 : this.read(address);
        this.pushWord(this.pc); this.pc = (this.pc + relative) & 0x7ff;
      } else {
        this.pushWord(this.pc); this.pc = address;
      }
      return 6;
    }
    if (operation === 0x07 || operation === 0x0f) {
      if (mode === 0x0a) return 2;
      const value = operation === 0x07 ? this.a : this.x;
      this.clear(N | Z); this.setNz(value); this.write(address, value); return 4;
    }
    const value = this.read(address);
    if (operation === 0x00 || operation === 0x01 || operation === 0x02 || operation === 0x03) {
      const left = operation === 0x03 ? this.x : this.a;
      const wide = left - value - (operation === 0x02 ? this.cc & C : 0);
      this.clear(N | Z | C); this.setNzc(wide);
      if (operation === 0x00 || operation === 0x02) this.a = wide & 0xff;
    } else if (operation === 0x04) {
      this.a &= value; this.clear(N | Z); this.setNz(this.a);
    } else if (operation === 0x05) {
      this.clear(N | Z); this.setNz(this.a & value);
    } else if (operation === 0x06) {
      this.a = value; this.clear(N | Z); this.setNz(this.a);
    } else if (operation === 0x08) {
      this.a ^= value; this.clear(N | Z); this.setNz(this.a);
    } else if (operation === 0x09 || operation === 0x0b) {
      const carry = operation === 0x09 ? this.cc & C : 0;
      const wide = this.a + value + carry;
      this.clear(H | N | Z | C);
      if (((this.a & 0x0f) + (value & 0x0f) + carry) & 0x10) this.cc |= H;
      this.setNzc(wide); this.a = wide & 0xff;
    } else if (operation === 0x0a) {
      this.a |= value; this.clear(N | Z); this.setNz(this.a);
    } else if (operation === 0x0e) {
      this.x = value; this.clear(N | Z); this.setNz(this.x);
    }
    return mode === 0x0a ? 2 : 4;
  }

  private read(address: number): number {
    address &= 0x7ff;
    if (address <= 2) return this.readPort(address);
    if (address === 8) return this.timerData;
    if (address === 9) return this.timerControl & ~0x08;
    if (address < 0x80) return this.ram[address] ?? 0xff;
    return this.rom[address] ?? 0xff;
  }

  private write(address: number, value: number): void {
    address &= 0x7ff;
    value &= 0xff;
    if (address <= 2) { this.writePort(address, value); return; }
    if (address >= 4 && address <= 6) {
      const port = address - 4;
      const ddr = value & (port === 2 ? 0x0f : 0xff);
      if (ddr !== this.portDdr[port]) {
        this.portDdr[port] = ddr;
        this.emitPort(port);
      }
      return;
    }
    if (address === 8) {
      this.timerData = value;
      return;
    }
    if (address === 9) {
      this.timerDivisor = value & 7;
      this.timerSource = (value & 0x30) >>> 4;
      if (value & 0x08) this.timerPrescale = 0;
      this.timerControl =
        (this.timerControl & (value & 0x80)) |
        (value & ~(0x80 | 0x08));
      this.timerIrq = Boolean(
        (this.timerControl & 0x80) && !(this.timerControl & 0x40),
      );
      return;
    }
    if (address < 0x80) this.ram[address] = value;
  }

  private readPort(port: number): number {
    const mask = port === 2 ? 0xf0 : 0;
    const signal = ['porta_r', 'portb_r', 'portc_r'][port]!;
    const input = Number(this.listeners.get(signal)?.[0]?.() ?? 0xff);
    const ddr = this.portDdr[port] ?? 0;
    return (mask | ((this.portLatch[port] ?? 0xff) & ddr) | (input & ~ddr)) & 0xff;
  }

  private writePort(port: number, value: number): void {
    const latch = value & (port === 2 ? 0x0f : 0xff);
    const difference = (this.portLatch[port] ?? 0xff) ^ latch;
    this.portLatch[port] = latch;
    if (difference & (this.portDdr[port] ?? 0)) this.emitPort(port);
  }

  private emitPort(port: number): void {
    const signal = ['porta_w', 'portb_w', 'portc_w'][port]!;
    const latch = this.portLatch[port] ?? 0xff;
    const value = latch;
    for (const listener of this.listeners.get(signal) ?? []) listener?.(value & 0xff);
  }

  private tickTimer(cycles: number): void {
    // M68705P5's programmable timer: source 0 is the internal CPU clock,
    // source 1 is that clock gated by the (normally high) timer pin.  The
    // external-only modes do not advance on CPU cycles.
    if (this.timerSource > 1) return;
    const prescale =
      (this.timerPrescale & ((1 << this.timerDivisor) - 1)) + cycles;
    const decrements = prescale >>> this.timerDivisor;
    const crossing = (this.timerData || 256) <= decrements;
    this.timerPrescale = prescale & 0x7f;
    this.timerData = (this.timerData - decrements) & 0xff;
    if (crossing) {
      this.timerControl |= 0x80;
      if (!(this.timerControl & 0x40)) this.timerIrq = true;
    }
  }

  private fetch(): number { const value = this.read(this.pc); this.pc = (this.pc + 1) & 0x7ff; return value; }
  private fetchSigned(): number { const value = this.fetch(); return value & 0x80 ? value - 0x100 : value; }
  private fetchWord(): number { return (this.fetch() << 8) | this.fetch(); }
  private word(address: number): number { return ((this.read(address) << 8) | this.read(address + 1)) & 0x7ff; }
  private push(value: number): void { this.write(this.sp, value); this.sp = this.adjustSp(this.sp - 1); }
  private pushWord(value: number): void { this.push(value & 0xff); this.push(value >>> 8); }
  private pull(): number { this.sp = this.adjustSp(this.sp + 1); return this.read(this.sp); }
  private pullWord(): number { return ((this.pull() << 8) | this.pull()) & 0x7ff; }
  private adjustSp(value: number): number { return value < 0x60 ? 0x7f : value > 0x7f ? 0x60 : value; }
  private clear(flags: number): void { this.cc &= ~flags; }
  private setNz(value: number): void {
    value &= 0xff;
    if (value & 0x80) this.cc |= N;
    if (value === 0) this.cc |= Z;
  }
  private setNzc(value: number): void {
    this.setNz(value);
    if (value & 0x100) this.cc |= C;
  }
}
