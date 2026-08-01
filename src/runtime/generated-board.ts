import { Bus, type HandlerRegistry } from './bus.ts';
import { createCpu, hasGeneratedCpu, type Cpu } from './generated-cpu.ts';
import {
  createDevice,
  hasGeneratedDevice,
  type Device,
  type GeneratedMemoryBank,
} from './generated-device.ts';
import { GeneratedFrameRunner } from './generated-frame.ts';
import {
  GeneratedMameVideoPrimitives,
  GeneratedVideoRenderer,
} from './generated-video.ts';
import {
  dispatchGeneratedCallback,
  dispatchGeneratedCallbacks,
  executeGeneratedCallbackHandler,
  executeGeneratedMachineHandler,
  generatedHandlerRegistry,
  wireGeneratedDevice,
  type GeneratedHandlerBindings,
} from './generated-handler.ts';
import type { BoardIr } from '../ir/board.ts';
import {
  applyBoardTransforms,
  bindBoardEffects,
  type BoundEffect,
  type EffectBindings,
  type EffectExecutor,
} from './generated-effects.ts';
import { portHandlers } from './input.ts';
import { installSoundRuntime } from '../hardware/sound-runtime-registry.ts';
import type { SoundRuntimeHooks } from '../hardware/sound-runtime.ts';
import { AY_FILTER_CONTROL_BASE, AY_FILTER_CONTROL_STRIDE } from '../ir/audio-protocol.ts';
import type {
  Board,
  BoardConfig,
  BoardSinks,
  BoardSnapshot,
  InputPorts,
  Regions,
} from './types.ts';

export type BoardFactory = (
  config: BoardConfig,
  regions: Regions,
  inputs: InputPorts,
  sinks: BoardSinks,
) => Board;

const GENERATED_BOARDS = new Map<string, BoardFactory>();

export function registerGeneratedBoard(game: string, factory: BoardFactory): void {
  GENERATED_BOARDS.set(game, factory);
}

export function createBoard(
  config: BoardConfig,
  regions: Regions,
  inputs: InputPorts,
  sinks: BoardSinks,
): Board {
  if (!config.game) throw new Error('generated board creation requires a machine game key');
  const factory = GENERATED_BOARDS.get(config.game);
  if (!factory) {
    throw new Error(
      `generated board "${config.game}" is not registered ` +
      `(have: ${[...GENERATED_BOARDS.keys()].sort().join(', ')})`,
    );
  }
  return factory(config, regions, inputs, sinks);
}

/**
 * Hardware-neutral composition host for generated machine, CPU and device IR.
 * Missing generated hardware is an error; composition only executes emitted
 * CPU, device, handler, callback and scheduling definitions.
 */
export function createGeneratedBoard(
  machine: BoardIr,
  config: BoardConfig,
  regions: Regions,
  inputs: InputPorts,
  sinks: BoardSinks,
): Board {
  return new IrBoard(machine, config, regions, inputs, sinks);
}

const INPUT_LINE_NMI = -1;
const INPUT_LINE_RESET = -2;
const INPUT_LINE_HALT = -3;

/**
 * Apply MAME's special CPU input lines without confusing RESET with NMI.
 *
 * Generated driver handlers call set_input_line directly, so these lines do
 * not necessarily arrive through the typed connection/effect path below.
 */
export function applyGeneratedCpuInputLine(
  cpu: Cpu,
  line: number,
  state: number,
  setHeld: (held: boolean) => void,
  dataBus: number | (() => number) = 0xff,
): void {
  if (line === INPUT_LINE_RESET) {
    const active = state !== 0;
    setHeld(active);
    if (active) cpu.reset();
    return;
  }
  if (line === INPUT_LINE_NMI) {
    if (state !== 0) cpu.nmi();
    return;
  }
  if (line === INPUT_LINE_HALT) {
    setHeld(state !== 0);
    return;
  }
  if (line < 0) return;
  if (line === 0) {
    cpu.setIrqLine(state !== 0, dataBus, state === 2);
  } else {
    // CPUs such as the 6809 expose FIRQ as a distinct numbered input. Do not
    // collapse every non-special line onto IRQ0.
    cpu.setInputLine(line, state === 2 ? 1 : state);
  }
}

/** Execute MAME device_execute_interface::pulse_input_line for driver callbacks. */
export function pulseGeneratedCpuInputLine(cpu: Cpu, line: number): void {
  if (line === INPUT_LINE_NMI) {
    cpu.nmi();
  } else if (line === INPUT_LINE_RESET) {
    cpu.reset();
  } else if (line >= 0) {
    cpu.setInputLine(line, 1);
    cpu.setInputLine(line, 0);
  }
}

class IrBoard implements Board {
  readonly fbWidth: number;
  readonly fbHeight: number;

  private readonly machine: BoardIr;
  private readonly cpus = new Map<string, Cpu>();
  private readonly cpuBuses = new Map<string, Bus>();
  private readonly cpuCycles = new Map<string, number>();
  private readonly cpuStalls = new Map<string, number>();
  private readonly cpuHeld = new Map<string, boolean>();
  private readonly devices = new Map<string, Device>();
  private readonly generatedBanks: Record<string, GeneratedMemoryBank> = {};
  private readonly generatedResources: Record<string, unknown> = {};
  private readonly state: Record<string, unknown> = {};
  private readonly shares: Record<string, Uint8Array> = {};
  private videoPrimitives?: GeneratedMameVideoPrimitives;
  /** Typed effects bound per callback id; see generated-effects.ts. */
  private effects: Map<string, BoundEffect> = new Map();
  private readonly frameRunner: GeneratedFrameRunner;
  private readonly bindings: GeneratedHandlerBindings;
  private currentLine = 0;
  private currentLineFraction = 0;
  private soundRuntime?: SoundRuntimeHooks;

  constructor(
    machine: BoardIr,
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) {
    this.machine = machine;
    this.fbWidth = machine.execution.screen.width;
    this.fbHeight = machine.execution.screen.height;

    // MAME devices may alias board memory shares (buffered spriteram binds its
    // own tag), so every declared share exists before any device is created.
    for (const cpu of machine.execution.cpus) {
      for (const range of [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])]) {
        if (!range.share) continue;
        this.shares[range.share] ??= new Uint8Array(range.end - range.start + 1);
      }
    }
    for (const initializer of machine.execution.initialShares ?? []) {
      const share = this.shares[initializer.share];
      if (!share) {
        throw new Error(
          `${machine.game}: initial share "${initializer.share}" is not mapped`,
        );
      }
      share.set(initializer.bytes.slice(0, share.length));
    }
    for (const specification of machine.devices ?? []) {
      if (hasGeneratedDevice(specification.type)) {
        const screenHost = {
          time_until_pos: (position: number) => {
            const vtotal = Math.max(1, machine.execution.screen.vtotal);
            const target = ((Math.floor(position) % vtotal) + vtotal) % vtotal;
            let lines = target - this.currentLine;
            if (lines <= 0) lines += vtotal;
            return lines / (machine.execution.screen.refresh * vtotal);
          },
          vpos: () => this.currentLine,
          hpos: () => 0,
        };
        const device = createDevice(specification.type, {
          clock: specification.clock,
          tag: specification.tag,
          shares: this.shares,
          inputs,
          ...(specification.slotDefault ? { slot: specification.slotDefault } : {}),
          selectors: {
            'cart.mapper': config.cart?.mapper,
          },
          finder: rawTag => {
            const tag = rawTag.replace(/^[\^:]+/, '') ||
              machine.execution.cpus[0]?.tag ||
              '';
            if (tag === 'screen') return screenHost;
            const cpuSpec = machine.execution.cpus.find(candidate => candidate.tag === tag) ??
              machine.execution.cpus[0];
            if (!cpuSpec) return 0;
            return {
              cycles_to_attotime: (cycles: number) =>
                cycles / Math.max(1, cpuSpec.cycleClock ?? cpuSpec.clock),
              reset: () => this.cpus.get(cpuSpec.tag)?.reset(),
              set_input_line: (line: number, state: number) => {
                const cpu = this.cpus.get(cpuSpec.tag);
                if (cpu) {
                  applyGeneratedCpuInputLine(
                    cpu,
                    line,
                    state,
                    held => this.cpuHeld.set(cpuSpec.tag, held),
                  );
                }
              },
            };
          },
          calls: {
            screen: () => screenHost,
            exists: () => 1,
            machine: () => ({
              root_device: () => ({
                membank: (name: string) => this.generatedBanks[name],
              }),
              save: () => ({
                register_postload: () => 0,
              }),
            }),
            device: () => ({
              save_item: () => 0,
            }),
          },
          regions,
          configuration: config,
          banks: this.generatedBanks,
          resourceCache: this.generatedResources,
        });
        // Machine-config chained setup calls (m_starfield->set_starfield_config(...))
        // lowered from the driver's constant arguments.
        for (const configuration of specification.configuration ?? []) {
          if (device.methodNames().includes(configuration.method)) {
            device.call(configuration.method, ...configuration.args);
          }
        }
        this.devices.set(specification.tag, device);
      }
    }
    for (const source of this.devices.values()) {
      const callHosts = new Map<string, Record<string, (...args: any[]) => unknown>>();
      for (const link of source.links()) {
        const target = [...this.devices.values()].find(device =>
          device.role() === link.targetRole);
        if (!target) {
          throw new Error(
            `${machine.game}: generated device link "${link.call}" has no role "${link.targetRole}"`,
          );
        }
        if (link.method) {
          source.bindCall(link.call, (...args) =>
            target.invokeSlot(link.method!, ...args));
          continue;
        }
        const dispatch = (address: number, value = 0) => {
          const normalized = address & 0x3fff;
          const range = link.ranges?.find(candidate =>
            normalized >= candidate.start && normalized <= candidate.end);
          if (!range) return 0xff;
          const endpoint = range.target === 'self' ? source : target;
          return range.target === 'slot'
            ? endpoint.invokeSlot(range.method, normalized, value)
            : endpoint.invoke(range.method, normalized, value);
        };
        source.bindCall(link.call, dispatch);
        const chained = /^(\w+)\(\)\.(\w+)$/.exec(link.call);
        if (chained) {
          const host = callHosts.get(chained[1]!) ?? {};
          host[chained[2]!] = dispatch;
          callHosts.set(chained[1]!, host);
          source.bindCall(chained[1]!, () => host);
        }
      }
    }

    const calls: NonNullable<GeneratedHandlerBindings['calls']> = {};
    let runAutonomousNow = (): void => {};
    calls['machine().scheduler().abort_timeslice'] = () => {
      runAutonomousNow();
      return 0;
    };
    calls['machine().scheduler().perfect_quantum'] = () => 0;
    this.bindings = { members: this.state, inputs, calls };
    bindGeneratedDriverState(this.state, calls);
    for (const [tag, bytes] of Object.entries(regions)) {
      bindGeneratedRegionState(
        this.state,
        tag,
        bytes,
        machine.video?.regionBindings,
        machine.video?.regionBindingOffsets,
      );
    }
    for (const input of machine.execution.inputMembers ?? []) {
      const ports = input.tags.map(tag => ({ read: () => inputs.read(tag) }));
      this.state[input.member] = ports.length === 1 ? ports[0] : ports;
    }
    const screen = machine.devices?.find(device => device.type === 'SCREEN');
    for (const owner of [screen?.tag, screen?.member].filter(Boolean) as string[]) {
      calls[`${owner}.vpos`] = () => this.currentLine;
    }
    for (const [tag, device] of this.devices) {
      const specification = machine.devices?.find(candidate => candidate.tag === tag);
      for (const method of device.methodNames()) {
        const invoke = (...args: unknown[]) =>
          device.invoke(method, ...args as Parameters<typeof device.invoke>[1][]);
        calls[`${tag}.${method}`] = invoke;
        calls[`m_${tag}.${method}`] = invoke;
        if (specification?.member) calls[`${specification.member}.${method}`] = invoke;
      }
    }
    for (const device of this.devices.values()) {
      device.bindCall('machine().time', () => this.frameRunner?.frameCount /
        this.machine.execution.screen.refresh || 0);
    }
    const sourceHandlers = generatedHandlerRegistry(machine, this.bindings);
    const registry: HandlerRegistry = {
      read: { ...sourceHandlers.read },
      write: { ...sourceHandlers.write },
    };
    this.installDeviceHandlers(machine, registry);
    this.installGeneratedDeviceBuses(machine, registry);
    this.soundRuntime = this.installGeneratedSoundHandlers(machine, sinks, registry);
    this.installMemoryBanks(machine, regions, registry);
    this.installDeclarativeHandlers(machine, config, inputs, registry);
    this.installInterruptVectorWriters(machine, registry);

    // Bound before any CPU exists: a generated CPU may emit a signal from its
    // own constructor, and every connection must already be executable.
    this.effects = bindBoardEffects(machine, this.effectBindings(sinks));

    for (const specification of machine.execution.cpus) {
      const type = specification.type ?? 'Z80';
      if (!hasGeneratedCpu(type)) {
        throw new Error(
          `${machine.game}: CPU ${specification.tag}:${type} has no generated executable definition`,
        );
      }
      const suppliedRom = regions[specification.region] ??
        regions[Object.keys(regions).find(name =>
          name.endsWith(`:${specification.region}`)) ?? ''];
      const hasFixedRom = (specification.ranges ?? []).some(range => range.kind === 'rom');
      if (!suppliedRom && hasFixedRom) {
        throw new Error(`${machine.game}: missing ROM region ${specification.region}`);
      }
      // Cartridge and other slot-backed machines can have a CPU address space
      // made entirely from RAM, handlers and generated banks. Bus still takes
      // a byte array, but such a board has no fixed CPU ROM region to supply.
      const rom = suppliedRom ?? new Uint8Array(0);
      const bus = new Bus(
        specification.ranges ?? [],
        rom,
        registry,
        this.shares,
      );
      this.cpuBuses.set(specification.tag, bus);
      if (specification.opcode) {
        const opcodeRom = regions[specification.opcode.region];
        if (!opcodeRom) {
          throw new Error(
            `${machine.game}: missing opcode region ${specification.opcode.region}`,
          );
        }
        const opcodeBus = new Bus(
          specification.opcode.ranges,
          opcodeRom,
          registry,
          this.shares,
        );
        const opcodeMask = specification.opcode.globalMask ?? 0xffff;
        bus.readOpcode = address => opcodeBus.read(address & opcodeMask);
      }
      if (specification.io) {
        const ioBus = new Bus(specification.io.ranges, new Uint8Array(0), registry, this.shares);
        const mask = specification.io.globalMask ?? 0xffff;
        bus.in = port => ioBus.read(port & mask);
        bus.out = (port, data) => ioBus.write(port & mask, data);
      }
      const programSpace = {
        read_byte: (address: number) => bus.read(address),
        write_byte: (address: number, value: number) => bus.write(address, value),
      };
      const cpuMember = machine.devices?.find(device =>
        device.tag === specification.tag)?.member;
      for (const owner of [
        specification.tag,
        `m_${specification.tag}`,
        cpuMember,
      ].filter(Boolean) as string[]) {
        calls[`${owner}.space`] = () => programSpace;
      }
      const mask = specification.mask ?? 0xffff;
      const cpu = createCpu(type, {
        read: address => bus.read(address & mask),
        ...(bus.readOpcode ? {
          // AS_OPCODES has its own global mask; do not inherit AS_PROGRAM's.
          readOpcode: address => bus.readOpcode!(address),
        } : {}),
        write: (address, data) => bus.write(address & mask, data),
        in: bus.in,
        out: bus.out,
        timing: (elapsed, target) => {
          this.currentLineFraction = target > 0 ? Math.min(1, elapsed / target) : 0;
        },
        signal: (signal, state) => {
          const callbacks = machine.callbacks.filter(candidate =>
            candidate.ownerTag === specification.tag &&
            candidate.signal === signal);
          let result: number | undefined;
          for (const callback of callbacks) {
            const effect = this.effects.get(callback.id);
            if (!effect) {
              throw new Error(
                `${machine.game}: CPU signal callback "${callback.id}" has no bound effect`,
              );
            }
            const value = effect.reads
              ? effect.run(0)
              : effect.run(applyBoardTransforms(state, effect.transforms));
            if (value !== undefined) {
              result = effect.reads
                ? applyBoardTransforms(Number(value) || 0, effect.transforms)
                : Number(value);
            }
          }
          return result ?? 0;
        },
      });
      this.cpus.set(specification.tag, cpu);
      this.cpuCycles.set(specification.tag, 0);
      this.cpuStalls.set(specification.tag, 0);
      this.cpuHeld.set(specification.tag, false);
      const acknowledge = machine.callbacks.find(callback =>
        callback.ownerTag === specification.tag &&
        callback.signal === 'set_irq_acknowledge_callback');
      const interruptVector = (): number => {
        return acknowledge
          ? executeGeneratedCallbackHandler(
              machine,
              acknowledge,
              this.bindings,
            ) ?? 0xff
          : 0xff;
      };
      calls[`m_${specification.tag}.set_input_line`] = (line, state) => {
        applyGeneratedCpuInputLine(
          cpu,
          line,
          state,
          held => this.cpuHeld.set(specification.tag, held),
          state !== 0 ? interruptVector : 0xff,
        );
      };
      calls[`m_${specification.tag}.set_input_line_and_vector`] =
        (line, state, vector) => {
          applyGeneratedCpuInputLine(
            cpu,
            line,
            state,
            held => this.cpuHeld.set(specification.tag, held),
            vector & 0xff,
          );
        };
      calls[`m_${specification.tag}.pulse_input_line`] = line => {
        if (line === INPUT_LINE_NMI) cpu.nmi();
        else if (line === INPUT_LINE_RESET) {
          cpu.reset();
          this.cpuHeld.set(specification.tag, false);
        }
        else {
          cpu.setInputLine(line, 1);
          cpu.setInputLine(line, 0);
        }
      };
      calls[`m_${specification.tag}.total_cycles`] = () =>
        this.cpuCycles.get(specification.tag) ?? 0;
      // Handlers reference CPUs by their state-member name (m_subcpu2) as
      // well as by tag; every CPU call gets both aliases uniformly.
      const member = machine.devices?.find(device =>
        device.tag === specification.tag)?.member;
      if (member) {
        for (const name of [
          'set_input_line', 'set_input_line_and_vector', 'pulse_input_line', 'total_cycles',
        ]) {
          calls[`${member}.${name}`] = calls[`m_${specification.tag}.${name}`]!;
        }
      }
    }
    for (const [tag, bytes] of Object.entries(this.shares)) {
      bindGeneratedShareState(this.state, tag, bytes);
    }

    for (const [tag, device] of this.devices) {
      for (const signal of device.signalNames()) {
        wireGeneratedDevice(device, machine, tag, signal, this.effects);
      }
    }
    const hostedProcessors = (machine.devices ?? []).flatMap(specification => {
      if (!specification.hostTag) return [];
      const device = this.devices.get(specification.tag);
      const host = this.devices.get(specification.hostTag);
      const firmware = regions[specification.tag];
      if (
        !device || !host || !firmware ||
        !device.methodNames().includes('execute_run') ||
        !device.methodNames().includes('execute_set_input')
      ) return [];
      const enabled = this.configureHostedProcessor(
        specification.tag,
        device,
        host,
        firmware,
        sinks,
      );
      return [{
        tag: specification.tag,
        clock: device.cycleClock(),
        enabled,
        run: (cycles: number) => {
          device.set('m_icount', cycles);
          device.call('execute_run');
          return cycles - device.get('m_icount');
        },
      }];
    });
    // Standalone bus masters expose MAME's execute_run/m_icount pair but have
    // no firmware host. The Intel 8257 on Donkey Kong is one such processor.
    const autonomousProcessors = (machine.devices ?? []).flatMap(specification => {
      if (
        specification.hostTag ||
        machine.execution.cpus.some(cpu => cpu.tag === specification.tag)
      ) return [];
      const device = this.devices.get(specification.tag);
      if (!device?.methodNames().includes('execute_run')) return [];
      return [{
        tag: specification.tag,
        clock: device.cycleClock(),
        run: (cycles: number) => {
          device.set('m_icount', cycles);
          device.call('execute_run');
          return cycles - device.get('m_icount');
        },
      }];
    });
    runAutonomousNow = () => {
      // Drivers use abort_timeslice after asserting short DMA request pulses so
      // the autonomous controller observes them before the CPU clears them.
      // One generous local slice is bounded and covers a complete 8257 burst.
      for (const processor of autonomousProcessors) processor.run(4096);
    };
    // Machine latches drive reset/hold lines at power-on. Hosted processors
    // must be wired before these initial values are emitted.
    for (const callback of machine.callbacks) {
      if (
        !['q_out_cb', 'write_cb'].includes(callback.signal) ||
        callback.slot === undefined
      ) continue;
      const source = this.devices.get(callback.ownerTag);
      if (!source) continue;
      const member = callback.signal === 'q_out_cb' ? 'm_q' : 'm_value';
      if (callback.signal === 'write_cb' && source.get(member) === 0) continue;
      // A generated CPU resets during construction and may drive a latch
      // before board-level device callbacks have been attached. MAME wires
      // those callbacks in machine_config first, so replay the live latch
      // output here to preserve the electrical state it would have observed.
      dispatchGeneratedCallback(
        machine,
        callback.id,
        (source.get(member) >> callback.slot) & 1,
        this.effects,
      );
    }
    let activeFramebuffer: Uint32Array | undefined;
    let video: GeneratedVideoRenderer | undefined;
    if (machine.execution.screenUpdate) {
      const primitives = this.videoPrimitives = new GeneratedMameVideoPrimitives(
        machine,
        regions,
        this.state,
        this.bindings,
        line => {
          if (activeFramebuffer) video?.updatePartial(activeFramebuffer, line);
        },
      );
      video = new GeneratedVideoRenderer(machine, primitives);
    }
    this.frameRunner = new GeneratedFrameRunner({
      machine,
      processors: [...machine.execution.cpus.map(specification => ({
        tag: specification.tag,
        enabled: () => !this.cpuHeld.get(specification.tag),
        run: (cycles: number) => {
          const pendingStall = this.cpuStalls.get(specification.tag) ?? 0;
          const stalled = Math.min(cycles, pendingStall);
          this.cpuStalls.set(specification.tag, pendingStall - stalled);
          const executed = stalled + (cycles > stalled
            ? this.cpus.get(specification.tag)!.run(cycles - stalled)
            : 0);
          this.currentLineFraction = 0;
          this.soundRuntime?.tickCpu?.(specification.tag, executed);
          this.cpuCycles.set(
            specification.tag,
            (this.cpuCycles.get(specification.tag) ?? 0) + executed,
          );
          return executed;
        },
      })), ...hostedProcessors, ...autonomousProcessors],
      onEvent: event => {
        if (machine.sound?.auxiliaryDevices?.some(device =>
          device.deviceTag === event.ownerTag)) {
          sinks.soundWrite(
            0,
            event.state,
            this.soundFraction(),
            `${event.ownerTag}.vck`,
          );
        }
        dispatchGeneratedCallback(machine, event.callbackId, event.state, this.effects);
      },
      onLine: (line, phase, framebuffer) => {
        if (phase === 'before-processors') activeFramebuffer = framebuffer;
        this.currentLine = line;
        this.currentLineFraction = 0;
        const seconds = 1 /
          (this.machine.execution.screen.refresh * this.machine.execution.screen.vtotal);
        for (const device of this.devices.values()) device.tick(seconds);
      },
      video,
    });
    this.runMachineReset();
  }

  private configureHostedProcessor(
    tag: string,
    device: Device,
    host: Device,
    firmware: Uint8Array,
    sinks: BoardSinks,
  ): () => boolean {
    let resetHeld = false;
    const ram = new Uint8Array(1 << (device.dataAddressBits() ?? 7));
    device.bindCall('GETPC', () => (device.get('m_PA') << 6) + device.get('m_PC'));
    device.bindCall('GETEA', () => (device.get('m_X') << 4) + device.get('m_Y'));
    device.bindCall('INCPC', () => {
      const next = device.get('m_PC') + 1;
      if (next >= 0x40) {
        device.set('m_PC', 0);
        device.set('m_PA', device.get('m_PA') + 1);
      } else {
        device.set('m_PC', next);
      }
      return 0;
    });
    device.bindCall('READOP', address => firmware[address & (firmware.length - 1)] ?? 0);
    device.bindCall('RDMEM', address => ram[address & (ram.length - 1)]! & 0x0f);
    device.bindCall('WRMEM', (address, value) => {
      ram[address & (ram.length - 1)] = value & 0x0f;
      return 0;
    });
    for (const [name, member] of [
      ['TEST_ST', 'm_st'],
      ['TEST_ZF', 'm_zf'],
      ['TEST_CF', 'm_cf'],
      ['TEST_VF', 'm_vf'],
      ['TEST_SF', 'm_sf'],
      ['TEST_IF', 'm_if'],
    ]) {
      device.bindCall(name!, () => device.get(member!) & 1);
    }
    device.bindCall('UPDATE_ST_C', value => device.set('m_st', value & 0x10 ? 0 : 1));
    device.bindCall('UPDATE_ST_Z', value => device.set('m_st', value === 0 ? 0 : 1));
    device.bindCall('UPDATE_CF', value => device.set('m_cf', value & 0x10 ? 1 : 0));
    device.bindCall('UPDATE_ZF', value => device.set('m_zf', value !== 0 ? 0 : 1));
    device.bindCall('debugger_instruction_hook', () => 0);
    device.bindCall('standard_irq_callback', () => 0);
    device.bindCall('fatalerror', () => {
      throw new Error(`${tag}: generated hosted processor fatalerror`);
    });

    for (const callback of this.machine.callbacks.filter(candidate =>
      candidate.ownerTag === tag && candidate.targetMethod)) {
      if (!host.methodNames().includes(callback.targetMethod!)) continue;
      device.on(
        callback.signal,
        (...args) => host.call(callback.targetMethod!, ...args),
        callback.slot ?? 0,
      );
    }
    host.bindCall('m_cpu.set_input_line', (_line, state) =>
      device.call('execute_set_input', 0, state));
    host.bindCall('NAMCO_54XX_0_DATA', () => 0);
    host.bindCall('NAMCO_54XX_1_DATA', () => 1);
    host.bindCall('NAMCO_54XX_2_DATA', () => 2);
    host.bindCall('m_discrete.write', (channel, value) => {
      sinks.soundWrite(channel, value, this.soundFraction(), 'discrete');
      return 0;
    });
    if (host.signalNames().includes('reset')) {
      host.on('reset', state => {
        resetHeld = state !== 0;
        if (resetHeld) device.reset();
      });
    }
    return () => !resetHeld;
  }

  frame(framebuffer: Uint32Array): void {
    this.frameRunner.frame(framebuffer);
  }

  reset(): void {
    for (const device of this.devices.values()) device.reset();
    for (const cpu of this.cpus.values()) cpu.reset();
    for (const tag of this.cpuHeld.keys()) this.cpuHeld.set(tag, false);
    this.videoPrimitives?.reset?.();
    for (const tag of this.cpuCycles.keys()) this.cpuCycles.set(tag, 0);
    for (const tag of this.cpuStalls.keys()) this.cpuStalls.set(tag, 0);
    this.frameRunner.reset();
    this.soundRuntime?.reset?.();
    this.currentLine = 0;
    this.runMachineReset();
  }

  /** Execute MAME's selected MACHINE_RESET_MEMBER chain, base first. */
  private runMachineReset(): void {
    for (const key of this.machine.execution.resetHandlers ?? []) {
      const handler = this.machine.handlers?.find(candidate =>
        `${candidate.ownerClass}.${candidate.method}` === key);
      if (!handler?.program || handler.program.diagnostics.length) {
        throw new Error(
          `${this.machine.game}: machine reset handler "${key}" is not executable`,
        );
      }
      executeGeneratedMachineHandler(this.machine, handler, this.bindings, {});
    }
  }

  snapshot(): BoardSnapshot {
    return {
      frame: this.frameRunner.frameCount,
      cpus: this.machine.execution.cpus.map(specification => {
        const cpu = this.cpus.get(specification.tag)!;
        return {
          tag: specification.tag,
          pc: cpu.get('PC') || cpu.get('m_PC') || cpu.get('m_pc'),
          sp: cpu.get('SP') || cpu.get('m_SP') || cpu.get('m_s'),
          halted: Boolean(cpu.get('m_halt')),
          cycles: this.cpuCycles.get(specification.tag) ?? 0,
        };
      }),
      generatedDevices: Object.fromEntries(
        [...this.devices].map(([tag, device]) => [tag, device.get('m_q')]),
      ),
    };
  }

  private installDeviceHandlers(
    machine: BoardIr,
    registry: HandlerRegistry,
  ): void {
    for (const map of machine.maps ?? []) {
      for (const range of map.ranges) {
        for (const [kind, key] of [['read', range.read], ['write', range.write]] as const) {
          if (!key) continue;
          // MAME device tags may themselves contain dots (LS175.3D). Resolve
          // against instantiated tags instead of treating the first dot as
          // an unconditional tag/method delimiter.
          const tag = [...this.devices.keys()]
            .filter(candidate => key.startsWith(`${candidate}.`))
            .sort((left, right) => right.length - left.length)[0];
          if (!tag) continue;
          const method = key.slice(tag.length + 1);
          const device = this.devices.get(tag);
          if (!device || !device.methodNames().includes(method)) continue;
          if (kind === 'read') {
            registry.read[key] = (_address, offset) =>
              device.arity(method) ? device.call(method, offset) : device.call(method);
          } else {
            registry.write[key] = (_address, offset, data) => {
              const parameters = device.parameters(method);
              if (parameters[0]?.includes('address_space')) {
                const cpuTag = machine.execution.cpus.find(cpu =>
                  cpu.ranges?.some(candidate =>
                    candidate.start === range.start &&
                    candidate.end === range.end &&
                    candidate.write === key))?.tag ??
                  machine.execution.cpus[0]?.tag;
                const bus = cpuTag ? this.cpuBuses.get(cpuTag) : undefined;
                const space = {
                  read_byte: (address: number) => bus?.read(address) ?? 0xff,
                  write_byte: (address: number, value: number) =>
                    bus?.write(address, value),
                  device: () => ({
                    execute: () => ({
                      adjust_icount: (delta: number) => {
                        if (!cpuTag || delta >= 0) return;
                        this.cpuStalls.set(
                          cpuTag,
                          (this.cpuStalls.get(cpuTag) ?? 0) - delta,
                        );
                      },
                    }),
                  }),
                };
                device.invoke(method, space, data);
              } else if (device.arity(method) <= 1) {
                device.call(method, data);
              } else {
                device.call(method, offset, data);
              }
            };
          }
        }
      }
    }
  }

  /**
   * Install ranges that MAME adds dynamically from machine_start (cartridge
   * slots are the canonical case). The capability emits the ranges beside the
   * generated device; the host only composes method and bank endpoints.
   */
  private installGeneratedDeviceBuses(
    machine: BoardIr,
    registry: HandlerRegistry,
  ): void {
    for (const [tag, device] of this.devices) {
      const bus = device.bus();
      if (!bus) continue;
      const cpu = machine.execution.cpus.find(candidate => candidate.tag === bus.cpu) ??
        machine.execution.cpus[0];
      if (!cpu) continue;
      const ranges = cpu.ranges ??= [];
      const methodBases = new Map<string, number>();
      for (const range of bus.ranges) {
        for (const method of [range.read, range.write]) {
          if (method) {
            methodBases.set(method, Math.min(methodBases.get(method) ?? range.start, range.start));
          }
        }
      }
      for (let index = 0; index < bus.ranges.length; index++) {
        const range = bus.ranges[index]!;
        const readKey = range.bank
          ? `generated-bank:${tag}:${range.bank}`
          : range.read ? `generated-device:${tag}:read:${range.read}` : undefined;
        const writeKey = range.write
          ? `generated-device:${tag}:write:${range.write}`
          : undefined;
        if (range.bank && readKey) {
          registry.read[readKey] = (_address, offset) =>
            this.generatedBanks[range.bank!]?.read(offset) ?? 0xff;
        } else if (range.read && readKey) {
          registry.read[readKey] = address =>
            device.call(range.read!, address - methodBases.get(range.read!)!);
        }
        if (range.write && writeKey) {
          registry.write[writeKey] = (address, _offset, data) => {
            device.call(range.write!, address - methodBases.get(range.write!)!, data);
          };
        }
        ranges.push({
          start: range.start,
          end: range.end,
          kind: 'handler',
          ...(readKey ? { read: readKey } : {}),
          ...(writeKey ? { write: writeKey } : {}),
        });
      }
    }
  }

  private installDeclarativeHandlers(
    machine: BoardIr,
    config: BoardConfig,
    inputs: InputPorts,
    registry: HandlerRegistry,
  ): void {
    for (const cpu of machine.execution.cpus) {
      Object.assign(registry.read, portHandlers(cpu.ranges ?? [], inputs));
      Object.assign(registry.read, portHandlers(cpu.io?.ranges ?? [], inputs));
    }
    const customsByPort = new Map<string, NonNullable<BoardConfig['customs']>>();
    for (const custom of config.customs ?? []) {
      const entries = customsByPort.get(custom.port) ?? [];
      entries.push(custom);
      customsByPort.set(custom.port, entries);
    }
    for (const [port, customs] of customsByPort) {
      const key = `port.${port}`;
      const base = registry.read[key] ?? (() => inputs.read(port));
      registry.read[key] = (address, offset) => {
        let value = base(address, offset);
        for (const custom of customs) {
          const handler = machine.handlers?.find(candidate =>
            custom.handler
              ? `${candidate.ownerClass}.${candidate.method}` === custom.handler
              : candidate.method === custom.member);
          if (!handler?.program || handler.program.diagnostics.length) continue;
          const result = executeGeneratedMachineHandler(
            machine,
            handler,
            this.bindings,
            {},
          ) ?? 0;
          const shift = trailingZeroBits(custom.mask);
          value = (value & ~custom.mask) | ((result << shift) & custom.mask);
        }
        return value & 0xff;
      };
    }
    for (const key of usedHandlers(machine, 'write')) {
      if (registry.write[key]) continue;
      // palette_device RAM writes color a source-derived set_format palette;
      // boards whose palette comes from a PROM ignore the RAM as MAME does.
      const paletteWrite = /^palette\.write(?:8|16|32)(_ext)?$/.exec(key);
      if (paletteWrite) {
        const ext = Boolean(paletteWrite[1]);
        registry.write[key] = (_address, offset, data) =>
          this.videoPrimitives?.writePaletteRam?.(offset, data, ext);
        continue;
      }
      if (key.startsWith('watchdog.')) registry.write[key] = () => {};
    }
    for (const key of usedHandlers(machine, 'read')) {
      if (registry.read[key]) continue;
      if (key.startsWith('watchdog.')) {
        registry.read[key] = () => 0xff;
        continue;
      }
      const custom = config.customs?.find(candidate => candidate.member === key.split('.').at(-1));
      if (custom) registry.read[key] = () => inputs.read(custom.port) & custom.mask;
    }
    const missing = [
      ...usedHandlers(machine, 'read').filter(key => !registry.read[key]),
      ...usedHandlers(machine, 'write').filter(key => !registry.write[key]),
    ];
    if (missing.length) {
      throw new Error(
        `${machine.game}: generated composition has unresolved handlers: ` +
        [...new Set(missing)].sort().join(', '),
      );
    }
  }

  private installInterruptVectorWriters(
    machine: BoardIr,
    registry: HandlerRegistry,
  ): void {
    const cpuTagsByWriter = new Map<string, string[]>();
    for (const cpu of machine.execution.cpus) {
      for (const writer of cpu.interruptVectorWriters ?? []) {
        const tags = cpuTagsByWriter.get(writer) ?? [];
        tags.push(cpu.tag);
        cpuTagsByWriter.set(writer, tags);
      }
    }
    for (const [writer, cpuTags] of cpuTagsByWriter) {
      const original = registry.write[writer];
      if (!original) continue;
      registry.write[writer] = (address, offset, data) => {
        original(address, offset, data);
        for (const cpuTag of cpuTags) {
          this.cpus.get(cpuTag)?.setIrqLine(false);
        }
      };
    }
  }

  private installMemoryBanks(
    machine: BoardIr,
    regions: Regions,
    registry: HandlerRegistry,
  ): void {
    for (const bank of machine.execution.banks ?? []) {
      const region = regions[bank.region];
      if (!region) {
        throw new Error(`${machine.game}: memory bank "${bank.tag}" has no region "${bank.region}"`);
      }
      let base = bank.entryOffsets.find(value => value !== null) ?? 0;
      const setEntry = (value: number): number => {
        const configured = bank.entryOffsets[value];
        if (configured === undefined || configured === null) {
          throw new Error(
            `${machine.game}: memory bank "${bank.tag}" selected invalid entry ${value}`,
          );
        }
        base = configured;
        return value;
      };
      for (const alias of [bank.tag, `m_${bank.tag}`, bank.member]) {
        this.bindings.calls![`${alias}.set_entry`] = setEntry;
      }
      registry.read[`bank.${bank.tag}`] = (_address, offset) => region[base + offset] ?? 0xff;
      registry.write[`bank.${bank.tag}`] = (_address, offset, data) => {
        const index = base + offset;
        if (index >= 0 && index < region.length) region[index] = data;
      };
    }
  }

  /**
   * Sound register wiring belongs to the family's capability package; the
   * board supplies only the generic machinery it needs.
   */
  private installGeneratedSoundHandlers(
    machine: BoardIr,
    sinks: BoardSinks,
    registry: HandlerRegistry,
  ): SoundRuntimeHooks | undefined {
    if (!machine.sound) return undefined;
    return installSoundRuntime({
      board: machine,
      sound: machine.sound,
      registry,
      calls: this.bindings.calls!,
      state: this.state,
      soundWrite: (offset, data, frac, method) =>
        sinks.soundWrite(offset, data, frac, method),
      soundData: (id, bytes) => sinks.soundData?.(id, bytes),
      fraction: () => this.soundFraction(),
      callDevice: (tag, method) => {
        const device = this.devices.get(tag);
        return device?.methodNames().includes(method) ? device.call(method) : undefined;
      },
      runCallbackHandler: callbackId =>
        executeGeneratedCallbackHandler(machine, callbackId, this.bindings),
      dispatch: (ownerTag, signal, value) =>
        void dispatchGeneratedCallbacks(machine, ownerTag, signal, value, this.effects),
      readProgram: (cpuTag, address) => this.cpuBuses.get(cpuTag)?.read(address) ?? 0xff,
      stallCpu: (cpuTag, cycles) => {
        this.cpuStalls.set(cpuTag, (this.cpuStalls.get(cpuTag) ?? 0) + cycles);
      },
      setCpuInputLine: (cpuTag, line, state) => {
        const cpu = this.cpus.get(cpuTag);
        if (cpu) cpu.setInputLine(line, state);
      },
    });
  }

  private soundFraction(): number {
    return (this.currentLine + this.currentLineFraction) /
      this.machine.execution.screen.vtotal;
  }

  /**
   * Executors for the typed effects the compiler resolved. This switches on a
   * closed union; the MAME method names that used to be re-parsed here are
   * interpreted once, during generation, by src/ir/lower-connections.ts.
   */
  /** Execute a generated handler program, when one compiled for this key. */
  private handlerExecutor(key: string, firstArgument?: unknown): EffectExecutor | undefined {
    const handler = this.machine.handlers?.find(candidate =>
      `${candidate.ownerClass}.${candidate.method}` === key &&
      candidate.program &&
      !candidate.program.diagnostics.length);
    if (!handler?.program) return undefined;
    return (state, ...sourceArgs) => {
      return executeGeneratedMachineHandler(
        this.machine,
        handler,
        this.bindings,
        generatedSignalHandlerArguments(
          handler.parameters,
          state,
          firstArgument,
          sourceArgs,
        ),
      );
    };
  }

  private effectBindings(sinks: BoardSinks): EffectBindings {
    return {
      cpuLine: (tag, line, delivery) => {
        // Validated against the IR, not the live map: a generated CPU can fire
        // a signal from inside its own constructor (the I8039 resets on
        // create), so the target may not be instantiated yet at bind time.
        if (!this.machine.execution.cpus.some(cpu => cpu.tag === tag)) return undefined;
        if (line === 'nmi') {
          // A driver nmi_line_pulse callback is already an edge. A devcb
          // set_inputline connection is a held pin and must reach the CPU as
          // both assert and clear; the generated core then detects only the
          // low-to-high transition. Treating every asserted callback as a
          // pulse retriggered chained input mergers while their output had
          // never gone low (notably Taito SJ's sound NMI circuit).
          return delivery === 'pulse'
            ? state => { if (state) this.cpus.get(tag)?.nmi(); }
            : state => this.cpus.get(tag)?.setInputLine(INPUT_LINE_NMI, state ? 1 : 0);
        }
        if (line === 'reset') {
          return state => {
            this.cpuHeld.set(tag, Boolean(state));
            if (state) this.cpus.get(tag)?.reset();
          };
        }
        if (line === 'halt') {
          return state => {
            const held = Boolean(state);
            this.cpuHeld.set(tag, held);
            // Z80 bus request is represented by MAME's HALT-class input line.
            // The CPU's busack callback grants the requesting bus master; if
            // that acknowledgement is never emitted, an 8257 remains parked
            // in S0 and no DMA transfer can begin.
            if (this.machine.callbacks.some(callback =>
              callback.ownerTag === tag && callback.signal === 'busack_cb')) {
              dispatchGeneratedCallbacks(
                this.machine,
                tag,
                'busack_cb',
                Number(held),
                this.effects,
              );
            }
          };
        }
        // irq/firq. MAME's *_line_hold keeps the line asserted until the CPU
        // acknowledges it; assert and level leave it to the source to clear.
        return state => {
          this.cpus.get(tag)?.setIrqLine(state !== 0, 0xff, delivery === 'hold' && state !== 0);
        };
      },
      deviceMethod: (tag, method, ownerClass) => {
        const device = this.devices.get(tag);
        if (device?.methodNames().includes(method)) {
          return state => device.call(
            method,
            ...generatedDeviceCallbackArguments(device.parameters(method), state),
          );
        }
        // A composite MAME device (timeplt_audio) is not instantiated; its
        // methods are the generated handlers for its class.
        if (ownerClass) {
          const run = this.handlerExecutor(`${ownerClass}.${method}`);
          if (run) return run;
        }
        // Driver-class methods reachable as generated calls (m_tag.method).
        const call = this.bindings.calls?.[`${tag}.${method}`] ??
          this.bindings.calls?.[`m_${tag}.${method}`];
        return call ? state => { call(state); } : undefined;
      },
      handler: (key, deviceTag) => {
        const cpuDevice = deviceTag
          ? {
              execute: () => ({
                set_input_line: (line: number, state: number) => {
                  const cpu = this.cpus.get(deviceTag);
                  if (cpu) {
                    applyGeneratedCpuInputLine(
                      cpu,
                      line,
                      state,
                      held => this.cpuHeld.set(deviceTag, held),
                    );
                  }
                },
                pulse_input_line: (line: number) => {
                  const cpu = this.cpus.get(deviceTag);
                  if (cpu) pulseGeneratedCpuInputLine(cpu, line);
                },
              }),
            }
          : undefined;
        const run = this.handlerExecutor(key, cpuDevice);
        if (run) return run;
        // A driver method the board binds directly rather than lowering.
        const call = this.bindings.calls?.[key.split('.').at(-1)!];
        return call ? state => { call(state); } : undefined;
      },
      portRead: port => () => this.bindings.inputs?.read(port) ?? 0xff,
      videoControl: control => {
        const setter = control === 'flip-screen'
          ? this.bindings.calls?.flip_screen_set
          : control === 'flip-screen-x'
            ? this.bindings.calls?.flip_screen_x_set
            : this.bindings.calls?.flip_screen_y_set;
        return setter ? state => { setter(state); } : undefined;
      },
      audioControl: (_tag, control, offset) => state =>
        sinks.soundWrite(
          control === 'mute' ? -1 : offset ?? this.machine.sound?.controlOffset ?? 0,
          state,
          this.soundFraction(),
        ),
      audioWrite: (tag, method) => {
        const symbol = /^write_line_(.+)$/.exec(method)?.[1];
        const offset = symbol
          ? this.machine.sound?.writeOffsets?.[symbol] ?? 0
          : 0;
        return state =>
          sinks.soundWrite(offset, state, this.soundFraction(), `${tag}.${method}`);
      },
    };
  }
}

/**
 * Adapt a devcb's value to the target device method signature.  MAME supplies
 * offset zero when a one-value callback is bound to a conventional
 * read/write(offs_t, data) handler; passing the value as the first argument
 * silently turns it into the offset and drops the data.
 */
export function generatedDeviceCallbackArguments(
  parameters: readonly string[],
  state: number,
): number[] {
  if (!parameters.length) return [];
  if (/\boffs_t\b/.test(parameters[0]!)) {
    return parameters.length === 1 ? [0] : [0, state];
  }
  return [state];
}

export function generatedSignalHandlerArguments(
  parameters: string | undefined,
  state: number,
  firstArgument?: unknown,
  sourceArgs: readonly number[] = [],
): Record<string, unknown> {
  const declarations = (parameters ?? '')
    .split(',')
    .map(parameter => parameter.trim())
    .filter(Boolean);
  const args: Record<string, unknown> = { state, data: state };
  for (const [index, declaration] of declarations.entries()) {
    const name = /(\w+)\s*$/.exec(declaration)?.[1];
    if (!name) continue;
    if (index === 0 && firstArgument !== undefined) {
      args[name] = firstArgument;
    } else if (name === 'offset') {
      args[name] = sourceArgs[0] ?? 0;
    } else if (name === 'mem_mask') {
      args[name] = sourceArgs.length >= 3
        ? sourceArgs.at(-1)
        : /\b(?:u?int)?32_t\b|\bu32\b/.test(declaration)
          ? 0xffffffff
          : /\b(?:u?int)?16_t\b|\bu16\b/.test(declaration)
            ? 0xffff
            : 0xff;
    } else {
      args[name] = state;
    }
  }
  return args;
}

export function bindGeneratedDriverState(
  state: Record<string, unknown>,
  calls: NonNullable<GeneratedHandlerBindings['calls']>,
): void {
  const set = (axis: 'x' | 'y', value: number): void => {
    state[`__flip_screen_${axis}`] = value ? 1 : 0;
    state.__flip_screen = Number(state.__flip_screen_x || state.__flip_screen_y);
  };
  calls.flip_screen = () => Number(state.__flip_screen ?? 0);
  calls.flip_screen_x = () => Number(state.__flip_screen_x ?? 0);
  calls.flip_screen_y = () => Number(state.__flip_screen_y ?? 0);
  calls.flip_screen_set = value => {
    set('x', value);
    set('y', value);
  };
  calls.flip_screen_x_set = value => set('x', value);
  calls.flip_screen_y_set = value => set('y', value);
}

function trailingZeroBits(value: number): number {
  if (!value) return 0;
  let count = 0;
  while (((value >>> count) & 1) === 0) count++;
  return count;
}

export function bindGeneratedShareState(
  state: Record<string, unknown>,
  tag: string,
  bytes: Uint8Array,
): void {
  Object.defineProperty(bytes, 'bytes', {
    value: () => bytes.length,
    configurable: true,
  });
  state[`m_${tag}`] = bytes;
  const indexed = /^(.+)\[(\d+)\]$/.exec(tag);
  if (!indexed) return;
  const member = `m_${indexed[1]}`;
  const values = Array.isArray(state[member]) ? state[member] as unknown[] : [];
  values[Number(indexed[2])] = bytes;
  state[member] = values;
}

/**
 * MAME required_region_ptr members use their finder tag by convention
 * (`m_irqprom(*this, "irqprom")`). Bind every assembled ROM region so
 * generated handlers can index those source-declared pointers.
 */
export function bindGeneratedRegionState(
  state: Record<string, unknown>,
  tag: string,
  bytes: Uint8Array,
  bindings: Readonly<Record<string, string>> = {},
  offsets: Readonly<Record<string, number>> = {},
): void {
  const leaf = tag.split(':').at(-1)!;
  state[`m_${leaf}`] ??= bytes;
  for (const [member, finderTag] of Object.entries(bindings)) {
    if (finderTag === tag || finderTag === leaf) {
      const offset = Math.max(0, offsets[member] ?? 0);
      state[member] ??= offset ? bytes.subarray(offset) : bytes;
    }
  }
}

function usedHandlers(
  machine: BoardIr,
  kind: 'read' | 'write',
): string[] {
  return (machine.maps ?? []).flatMap(map =>
    map.ranges.flatMap(range => range[kind] ? [range[kind]!] : []));
}
