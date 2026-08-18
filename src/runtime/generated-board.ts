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
  compileGeneratedMachineHandler,
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

/** Bind devcb members owned by a source-compiled composite device. */
export function generatedCompositeCallbackBindings(
  machine: BoardIr,
  ownerClass: string,
  hasDevice: (tag: string) => boolean,
  effects: () => Map<string, BoundEffect>,
  bindings: GeneratedHandlerBindings,
): GeneratedHandlerBindings {
  const compositeTags = new Set(
    machine.callbacks.flatMap(callback =>
      callback.targetClass === ownerClass &&
      callback.targetTag &&
      !hasDevice(callback.targetTag)
        ? [callback.targetTag]
        : callback.targetClass === ownerClass
          ? machine.devices?.flatMap(device =>
            device.tag === callback.ownerTag && device.hostTag && !hasDevice(device.hostTag)
              ? [device.hostTag]
              : []) ?? []
          : []),
  );
  if (compositeTags.size !== 1) return bindings;
  const [ownerTag] = compositeTags;
  // A live overlay, not a snapshot: CPU/device call bindings keep being added
  // after effects are bound, and a spread copy here silently no-ops them
  // (bublbobl's MCU IS3 pulse never reached the core through a stale copy).
  const calls = Object.create(bindings.calls ?? null) as NonNullable<
    GeneratedHandlerBindings['calls']
  >;
  for (const callback of machine.callbacks.filter(candidate =>
    candidate.ownerTag === ownerTag)) {
    const emit = (value: number) => {
      const effect = effects().get(callback.id);
      if (!effect) {
        throw new Error(
          `${machine.game}: callback "${callback.id}" has no bound effect`,
        );
      }
      const reads = effect.reads || /(?:^|_)(?:r|read)(?:_cb|_callback)?$/.test(callback.signal);
      return reads
        ? applyBoardTransforms(Number(effect.run(0)) || 0, effect.transforms)
        : (effect.run(applyBoardTransforms(value, effect.transforms)), 0);
    };
    calls[`m_${callback.signal}`] ??= emit;
    calls[callback.signal] ??= emit;
  }
  return { ...bindings, calls };
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

/** Address-map data width exposed by generated CPU families used here. */
function generatedCpuDataWidth(type: string): 8 | 16 {
  return ['m68000', 'm68010', 'z8002'].includes(type.toLowerCase()) ? 16 : 8;
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
  /**
   * MAME applies CPU suspend/resume requests at scheduler boundaries.  A
   * driver's immediate `suspended()` query therefore observes the previous
   * bus state once before the newly requested HALT/RESET state becomes
   * visible.  Several dual-CPU boards use that transition as their bus-grant
   * handshake (Double Dragon's HD63701 is the canonical example).
   */
  private readonly cpuReportedSuspended = new Map<string, boolean>();
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
  private boardSpecificReset?: () => void;
  private readonly peripheralResets: Array<() => void> = [];
  private readonly peripheralTicks: Array<(seconds: number) => void> = [];
  private watchdogFrames = 0;
  private watchdogLimitFrames = 0;
  private frameSound?: () => void;
  private readonly inputs: InputPorts;
  private readonly inputLatchPrevious = new Map<string, boolean>();
  private readonly pendingExidyCollisions = new Map<number, number[]>();
  private vicdualCoinPrevious = false;
  private vicdualCoinFrames = 0;
  private neoGeoRtc?: {
    command: number;
    mode: number;
    shift: Uint8Array;
    time: Uint8Array;
    dataIn: number;
    clock: number;
    strobe: number;
    tp: number;
    tpEpoch: number;
    tpInterval: number;
    dataOut: number;
    dataEpoch: number;
    dataInterval: number;
  };

  constructor(
    machine: BoardIr,
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) {
    this.machine = machine;
    this.inputs = inputs;
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
      if (initializer.fill !== undefined) share.fill(initializer.fill & 0xff);
      if (initializer.bytes) share.set(initializer.bytes.slice(0, share.length));
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
          height: () => Math.max(1, machine.execution.screen.vtotal),
          frame_number: () => this.frameRunner?.frameCount ?? 0,
        };
        const device = createDevice(specification.type, {
          clock: specification.clock,
          tag: specification.tag,
          shares: this.shares,
          inputs,
          ...(specification.type === 'NEOGEO_SPRITE_OPTIMZIED' ? {
            members: {
              m_region_zoomy: regions['spritegen:zoomy'],
              m_region_sprites: regions['cslot1:sprites'],
              m_region_sprites_size: regions['cslot1:sprites']?.length ?? 0,
              // neosprite's packed address space exposes two pixels per raw
              // ROM byte. get_region_mask() rounds that expanded extent to a
              // power-of-two mask; calculate the same value without relying
              // on C++ unsigned-loop overflow semantics in the IR evaluator.
              m_sprite_gfx_address_mask: regions['cslot1:sprites']?.length
                ? (2 ** Math.ceil(Math.log2(regions['cslot1:sprites']!.length * 2)) - 1) >>> 0
                : 0,
              m_region_fixed: regions['cslot1:fixed'],
              m_region_fixed_size: regions['cslot1:fixed']?.length ?? 0,
              m_region_fixedbios: {
                base: () => regions.fixedbios,
                bytes: () => regions.fixedbios?.length ?? 0,
              },
              m_fixed_layer_source: 0,
              m_fixed_layer_bank_type: 0,
            },
          } : {}),
          ...(specification.slotDefault ? { slot: specification.slotDefault } : {}),
          selectors: {
            'cart.mapper': config.cart?.mapper,
          },
          finder: (rawTag, member) => {
            const inferredTag = member?.replace(/^m_/, '');
            const tag = rawTag.replace(/^[\^:]+/, '') ||
              (inferredTag && (
                machine.execution.cpus.some(cpu => cpu.tag === inferredTag) ||
                machine.devices?.some(device => device.tag === inferredTag)
              ) ? inferredTag : undefined) ||
              machine.execution.cpus[0]?.tag || '';
            if (tag === 'screen') return screenHost;
            const targetDevice = machine.devices?.find(candidate => candidate.tag === tag);
            if (targetDevice?.type === 'DISCRETE') {
              return {
                write: (offset: number, data: number) => {
                  sinks.soundWrite(offset, data, this.soundFraction(), 'discrete');
                  return 0;
                },
              };
            }
            const cpuSpec = machine.execution.cpus.find(candidate => candidate.tag === tag) ??
              machine.execution.cpus[0];
            if (!cpuSpec) return 0;
            return new Proxy({}, {
              get: (_target, property) => {
                const method = String(property);
                if (method === 'cycles_to_attotime') {
                  return (cycles: number) =>
                    cycles / Math.max(1, cpuSpec.cycleClock ?? cpuSpec.clock);
                }
                if (method === 'total_cycles') {
                  return () => this.cpuCycles.get(cpuSpec.tag) ?? 0;
                }
                if (method === 'reset') return () => this.cpus.get(cpuSpec.tag)?.reset();
                if (method === 'set_input_line') {
                  return (line: number, state: number) => {
                    const cpu = this.cpus.get(cpuSpec.tag);
                    if (cpu) {
                      applyGeneratedCpuInputLine(
                        cpu,
                        line,
                        state,
                        held => this.cpuHeld.set(cpuSpec.tag, held),
                      );
                    }
                  };
                }
                return (...args: number[]) =>
                  this.devices.get(tag)?.invoke(method, ...args) ?? 0;
              },
            });
          },
          calls: {
            screen: () => screenHost,
            exists: () => 1,
            ...(specification.type === 'NEOGEO_CTRL_EDGE_CONNECTOR' ? {
              // The MVS cabinet controls are a source-declared card in the
              // edge-connector slot. The generic host exposes those card
              // ports directly while preserving the connector's public
              // in0/in1/start-select protocol used by neogeo.cpp.
              in0_r: () => inputs.read(`${specification.tag}:JOY1`),
              in1_r: () => inputs.read(`${specification.tag}:JOY2`),
              read_start_sel: () => inputs.read(`${specification.tag}:START`),
              write_ctrlsel: () => 0,
            } : {}),
            ...(specification.type === 'NEOGEO_CONTROL_PORT' ? {
              // Empty MVS controller sockets electrically read high. The
              // cabinet controls live on the edge connector, but neogeo.cpp
              // still ANDs these optional sockets into START/SELECT. Returning
              // the generic missing-method zero makes every start line look
              // held and leaves the BIOS in its hardware-test screen.
              read_ctrl: () => inputs.read(`${specification.tag}:JOY`),
              read_start_sel: () => inputs.read(`${specification.tag}:START`),
              write_ctrlsel: () => 0,
            } : {}),
            machine: () => ({
              time: () => generatedAttotime(
                this.frameRunner?.frameCount /
                  Math.max(1, this.machine.execution.screen.refresh) || 0,
              ),
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
        if (specification.member) {
          const indexed = /^(m_\w+)\[(\d+)\]$/.exec(specification.member);
          if (indexed) {
            const values = Array.isArray(this.state[indexed[1]!])
              ? this.state[indexed[1]!] as unknown[]
              : [];
            values[Number(indexed[2])] = device;
            this.state[indexed[1]!] = values;
          } else {
            // Required/optional device finders are pointer-like in driver
            // handlers. Binding the live generated object preserves nullable
            // tests and permits direct method calls through the source member.
            this.state[specification.member] = device;
          }
        }
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
    const timerClockCpu = machine.execution.cpus[0];
    const timerClockHz = timerClockCpu
      ? Math.max(1, timerClockCpu.cycleClock ?? timerClockCpu.clock)
      : 1;
    const tickGeneratedDevices = (seconds: number): void => {
      if (!(seconds > 0)) return;
      for (const device of this.devices.values()) device.tick(seconds);
    };
    let tickHostedProcessors = (_seconds: number): void => {};
    const advanceTimedHardware = (seconds: number): void => {
      tickGeneratedDevices(seconds);
      tickHostedProcessors(seconds);
    };
    calls['machine().scheduler().abort_timeslice'] = () => {
      runAutonomousNow();
      return 0;
    };
    calls['machine().scheduler().perfect_quantum'] = () => 0;
    calls['machine().schedule_exidy_collision'] = (position, collision) => {
      const vtotal = Math.max(1, machine.execution.screen.vtotal);
      const line = ((Math.floor(position) % vtotal) + vtotal) % vtotal;
      const collisions = this.pendingExidyCollisions.get(line) ?? [];
      // MAME allocates 128 collision timers. The generated scheduler is
      // scanline-granular, so retain their source order at each beam line.
      if ([...this.pendingExidyCollisions.values()].reduce(
        (count, values) => count + values.length,
        0,
      ) < 128) {
        collisions.push(collision & 0x1c);
        this.pendingExidyCollisions.set(line, collisions);
      }
      return 0;
    };
    // Generated handlers execute normal CPU accesses, never debugger/disassembly
    // probes.  MAME's guard must therefore allow read-side acknowledgement
    // effects such as clearing a sound CPU IRQ.
    calls['machine().side_effects_disabled'] = () => 0;
    calls['m68000_base_device::autovector'] = level => 24 + level;
    const generatedInputs: InputPorts = {
      read: port => {
        let value = inputs.read(port);
        for (const custom of machine.execution.customs?.filter(entry =>
          entry.port === port) ?? []) {
          let line = 0;
          if (custom.source === 'screen-vblank') {
            const { vbstart, vbend = 0 } = machine.execution.screen;
            const inVblank = vbstart > vbend
              ? this.currentLine >= vbstart || this.currentLine < vbend
              : this.currentLine >= vbstart && this.currentLine < vbend;
            line = custom.activeLow ? Number(!inVblank) : Number(inVblank);
          } else if (custom.source === 'rtc-tp') {
            line = this.neoGeoRtcLine('tp');
          } else if (custom.source === 'rtc-data') {
            line = this.neoGeoRtcLine('data');
          } else {
            if (custom.member === 'startsel_edge_joy_r') {
              line = inputs.read('edge:START') & 0x0f;
              const shift = trailingZeroBits(custom.mask);
              value = (value & ~custom.mask) | ((line << shift) & custom.mask);
              continue;
            }
            if (
              machine.game === 'arkanoid' &&
              custom.member === 'arkanoid_semaphore_input_r' &&
              (!this.devices.has('mcu:mcu') ||
                usesProtectionProtocolBridge(machine, 'mcu:mcu'))
            ) {
              // Immediate protocol mirror: host latch consumed, MCU reply ready.
              line = 1;
              const shift = trailingZeroBits(custom.mask);
              value = (value & ~custom.mask) | ((line << shift) & custom.mask);
              continue;
            }
            const handler = machine.handlers?.find(candidate =>
              custom.handler
                ? `${candidate.ownerClass}.${candidate.method}` === custom.handler
                : candidate.method === custom.member);
            if (handler?.program && !handler.program.diagnostics.length) {
              line = Number(executeGeneratedMachineHandler(
                machine,
                handler,
                this.bindings,
                {},
              ) ?? 0);
            }
          }
          const shift = trailingZeroBits(custom.mask);
          value = (value & ~custom.mask) | ((line << shift) & custom.mask);
        }
        const done = machine.video?.vector?.doneInput;
        if (done?.port === port) {
          // This DVG executor consumes the display list synchronously, so the
          // source custom input observes the generator in its completed state.
          value = done.activeLow ? value & ~done.mask : value | done.mask;
        }
        return value;
      },
    };
    // referenceCalls/callParameters are shared, mutate-in-place dictionaries:
    // effect executors and prepared-call caches hold references to them, so
    // later packages (video framework calls) must extend them rather than
    // replace them, or those holders keep serving stale bindings.
    this.bindings = {
      members: this.state,
      inputs: generatedInputs,
      calls,
      referenceCalls: {},
      callParameters: {},
    };
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
    bindGeneratedInputState(this.state, machine.execution.inputMembers ?? [], inputs);
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
      device.bindCall('machine().time', () => generatedAttotime(
        this.frameRunner?.frameCount /
          Math.max(1, this.machine.execution.screen.refresh) || 0,
      ));
    }
    const sourceHandlers = generatedHandlerRegistry(machine, this.bindings);
    const registry: HandlerRegistry = {
      read: { ...sourceHandlers.read },
      write: { ...sourceHandlers.write },
    };
    this.installDeviceHandlers(machine, registry);
    this.installZ80CtcRuntime(machine, registry, calls);
    this.boardSpecificReset = this.installBoardSpecificRuntime(machine, regions, registry);
    if (machine.video?.vector?.type === 'DVG') {
      registry.write['dvg.go_w'] = () => {};
      registry.write['dvg.reset_w'] = () => {};
      calls['m_dvg.reset_w'] = () => 0;
    }
    this.installGeneratedDeviceBuses(machine, registry);
    this.soundRuntime = this.installGeneratedSoundHandlers(machine, regions, sinks, registry);
    this.installMemoryBanks(machine, regions, registry);
    this.installDeclarativeHandlers(machine, config, inputs, registry);
    this.installSourceHandlerWidthAdapters(machine, registry);
    this.installInterruptVectorWriters(machine, registry);

    if (machine.game === 'gauntlet' && machine.video && !machine.video.ramPalette) {
      // PALETTE(...).set_format(IRGB_4444, 1024) is declared in the shared
      // Atari base configuration. Preserve that inherited format even when
      // the selected-machine palette extractor cannot associate the base
      // device node with the derived machine.
      machine.video.ramPalette = {
        tag: 'palette',
        endianness: 'big',
        entries: 1024,
        bytesPerEntry: 2,
        intensity: { bits: 4, shift: 12 },
        channels: [
          { channel: 'r', bits: 4, shift: 8 },
          { channel: 'g', bits: 4, shift: 4 },
          { channel: 'b', bits: 4, shift: 0 },
        ],
      };
    }
    const ramPalette = machine.video?.ramPalette;
    if (
      ramPalette && !ramPalette.endianness &&
      machine.execution.cpus.some(cpu =>
        /^m680(?:00|10|20)/i.test(cpu.type ?? '') &&
        (cpu.ranges ?? []).some(range => range.write === `${ramPalette.tag}.write16`))
    ) ramPalette.endianness = 'big';

    // Bound before any CPU exists: a generated CPU may emit a signal from its
    // own constructor, and every connection must already be executable.
    this.effects = bindBoardEffects(machine, this.effectBindings(sinks, registry));

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
      let rom = suppliedRom ?? new Uint8Array(0);
      if (
        machine.game === 'mario' &&
        specification.tag === 'audiocpu' &&
        specification.type?.toLowerCase() === 'm58715'
      ) {
        // The M58715 owns a 0x800-byte internal ROM window, while its selected
        // address map supplies the external sound ROM. MAME's sound_start
        // writes this three-byte bootstrap into the otherwise NO_DUMP internal
        // image: select memory bank 1, then jump to external $800. The generated
        // CPU currently exposes one combined program bus, so overlay those
        // source bytes on a private view of the external ROM.
        rom = Uint8Array.from(rom);
        rom.set([0xf5, 0x04, 0x00], 0);
      }
      const sourceRanges = specification.ranges ?? [];
      // Neo Geo's first 128 bytes are a live vector mux.  The source address
      // map handler must sit above the BIOS ROM's initial overlay so the MVS
      // system latch can switch IRQ vectors to the cartridge at handoff.
      const ranges = machine.game === 'defender' && specification.tag === 'maincpu' && regions.banked
        ? [
            ...sourceRanges,
            ...Array.from(
              { length: Math.min(9, Math.floor(regions.banked.length / 0x1000)) },
              (_unused, bank) => ({
                start: 0xc000,
                end: 0xcfff,
                kind: 'rom' as const,
                region: 'banked',
                romOffset: bank * 0x1000,
                viewTag: 'm_rom_view',
                viewEntry: bank + 1,
              }),
            ),
          ]
        : machine.game === 'outrun' && specification.tag === 'maincpu'
        ? [
            // The 315-5195 starts with every bank overlaid at zero, then the
            // boot ROM programs its live windows.  Keep the extracted RAM
            // ranges solely to allocate their shares, and put the mapper back
            // on top so its runtime decoder owns every access.
            ...sourceRanges.filter(range => range.read !== 'mapper.read'),
            ...sourceRanges.filter(range => range.read === 'mapper.read'),
          ]
        : machine.family === 'neogeo' && specification.tag === 'maincpu'
        ? [
            ...sourceRanges.filter(range =>
              range.kind === 'rom' && range.start === 0 && range.end === 0x7f),
            ...sourceRanges.filter(range =>
              !(range.kind === 'rom' && range.start === 0 && range.end === 0x7f)),
          ]
        : sourceRanges;
      const bus = new Bus(
        ranges,
        rom,
        registry,
        this.shares,
        generatedCpuDataWidth(type),
        regions,
      );
      this.cpuBuses.set(specification.tag, bus);
      for (const viewTag of new Set(
        (specification.ranges ?? []).flatMap(range => range.viewTag ? [range.viewTag] : []),
      )) {
        const select = (entry: number) => bus.selectView(viewTag, entry);
        this.bindings.calls![`${viewTag}.select`] = select;
        this.bindings.calls![`${viewTag.replace(/^m_/, '')}.select`] = select;
      }
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
          8,
          regions,
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
      let previousTimingCycles = 0;
      const cpu = createCpu(type, {
        read: address => bus.read(address & mask),
        // Keep native 16-bit address-map handlers atomic. In particular,
        // Neo Geo's palette RAM self-test writes complete 68000 words; losing
        // these methods here makes the CPU fall back to two byte transactions
        // and the second byte overwrites the first handler value.
        read16be: address => bus.read16be(address & mask),
        ...(bus.readOpcode ? {
          // AS_OPCODES has its own global mask; do not inherit AS_PROGRAM's.
          readOpcode: address => bus.readOpcode!(address),
        } : {}),
        write: (address, data) => bus.write(address & mask, data),
        write16be: (address, data) => bus.write16be(address & mask, data),
        in: bus.in,
        out: bus.out,
        ...(specification.interruptAcknowledge ? {
          acknowledge: (level: number) => registry.read[specification.interruptAcknowledge!]?.(
            0xfffff0 | (level << 1),
            Math.max(0, level - 1),
          ) ?? 0xff,
        } : {}),
        timing: (elapsed, target) => {
          this.currentLineFraction = target > 0 ? Math.min(1, elapsed / target) : 0;
          if (specification.tag === timerClockCpu?.tag) {
            const current = Math.max(0, Math.min(target, elapsed));
            // run() calls timing(0,target) at the start of each slice and
            // timing(target,target) at its end. Advancing by instruction-time
            // deltas lets device timers assert lines between instructions,
            // matching MAME's scheduler instead of batching every edge at the
            // next scanline boundary.
            if (current < previousTimingCycles) previousTimingCycles = 0;
            advanceTimedHardware((current - previousTimingCycles) / timerClockHz);
            previousTimingCycles = current === target ? 0 : current;
          }
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
              : effect.run(
                  applyBoardTransforms(state, effect.transforms),
                  state,
                );
            if (value !== undefined) {
              result = effect.reads
                ? applyBoardTransforms(Number(value) || 0, effect.transforms)
                : Number(value);
            }
          }
          return result ?? 0;
        },
      });
      if (specification.interruptMixer !== undefined) {
        cpu.set('m_interrupt_mixer', Number(specification.interruptMixer));
      }
      this.cpus.set(specification.tag, cpu);
      this.cpuCycles.set(specification.tag, 0);
      this.cpuStalls.set(specification.tag, 0);
      this.cpuHeld.set(specification.tag, false);
      this.cpuReportedSuspended.set(specification.tag, false);
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
      calls[`m_${specification.tag}.suspended`] = () => {
        const reported = this.cpuReportedSuspended.get(specification.tag) ?? false;
        this.cpuReportedSuspended.set(
          specification.tag,
          this.cpuHeld.get(specification.tag) ?? false,
        );
        return Number(reported);
      };
      // Handlers reference CPUs by their state-member name (m_subcpu2) as
      // well as by tag; every CPU call gets both aliases uniformly.
      const member = machine.devices?.find(device =>
        device.tag === specification.tag)?.member;
      if (member) {
        const cpuMethods = [
          'set_input_line', 'set_input_line_and_vector', 'pulse_input_line', 'total_cycles',
          'suspended',
        ];
        for (const name of cpuMethods) {
          calls[`${member}.${name}`] = calls[`m_${specification.tag}.${name}`]!;
        }
        const adapter = Object.fromEntries(cpuMethods.map(name => [
          name,
          calls[`m_${specification.tag}.${name}`]!,
        ]));
        // Template-specialised handlers preserve a runtime index in source
        // (`m_subcpu[Which]->set_input_line(...)`). Static binding keys cover
        // literal indexes, but a dynamic index is evaluated through driver
        // state and therefore needs the finder array to contain live targets.
        // Populate an adapter from the same generic CPU call package so every
        // required_device_array works without a board/game exception.
        const indexed = /^(m_\w+)\[(\d+)\]$/.exec(member);
        if (indexed) {
          const values = Array.isArray(this.state[indexed[1]!])
            ? this.state[indexed[1]!] as unknown[]
            : [];
          values[Number(indexed[2])] = adapter;
          this.state[indexed[1]!] = values;
        } else {
          // A required_device CPU finder is a live object in source, not only
          // a qualified call spelling. Composite handlers such as
          // timeplt_audio_device::sh_irqtrigger_w evaluate `m_soundcpu`
          // before invoking set_input_line; materialize the same adapter used
          // for required_device_array so that ordinary hosted CPU finders do
          // not silently resolve to a symbolic reference.
          this.state[member] = adapter;
        }
      }
    }
    for (const [tag, bytes] of Object.entries(this.shares)) {
      const declaredBits = machine.execution.shareBindings
        ?.find(binding => binding.share === tag)?.bits;
      const cpuOwnedBits = machine.execution.cpus.some(cpu =>
        generatedCpuDataWidth(cpu.type ?? 'Z80') === 16 &&
        [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])]
          .some(range => range.share === tag))
        ? 16
        : undefined;
      bindGeneratedShareState(
        this.state,
        tag,
        bytes,
        machine.execution.shareBindings
          ?.filter(binding => binding.share === tag)
          .map(binding => binding.member),
        declaredBits ?? cpuOwnedBits,
      );
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
      // Device ROM regions retain the ROM-set device path (for example
      // `bmcu:mcu`) while composed machine tags retain the configured finder
      // path (`mcu:mcu`).  The child leaf is the stable identity across those
      // two source namespaces.
      const leaf = specification.tag.split(':').at(-1)!;
      const firmware = regions[specification.tag] ?? regions[
        Object.keys(regions).find(name => name.endsWith(`:${leaf}`)) ?? ''
      ];
      if (usesProtectionProtocolBridge(machine, specification.tag)) return [];
      if (
        device && !host && firmware && specification.type === 'M68705P5' &&
        device.methodNames().includes('execute_run') &&
        device.methodNames().includes('execute_set_input')
      ) {
        return [{
          tag: specification.tag,
          clock: device.cycleClock(),
          enabled: () => true,
          run: (cycles: number) => {
            device.set('m_icount', cycles);
            device.call('execute_run');
            return cycles - device.get('m_icount');
          },
        }];
      }
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
    // Firmware MCUs share elapsed board time with the primary CPU. Running
    // them only after the primary CPU's whole scanline lets that CPU assert a
    // chip-select and read the stale response before the child executes once.
    // Accumulate each hosted processor's source clock at instruction
    // boundaries so short handshakes (Namco 06xx/53xx is one example) retain
    // MAME's causal ordering without any board-specific quantum.
    const hostedCarry = new Map(hostedProcessors.map(processor => [processor.tag, 0]));
    tickHostedProcessors = seconds => {
      if (!(seconds > 0)) return;
      for (const processor of hostedProcessors) {
        if (processor.enabled && !processor.enabled()) {
          hostedCarry.set(processor.tag, 0);
          continue;
        }
        const carry = (hostedCarry.get(processor.tag) ?? 0) + seconds * processor.clock;
        const target = Math.floor(carry);
        if (target <= 0) {
          hostedCarry.set(processor.tag, carry);
          continue;
        }
        hostedCarry.set(processor.tag, carry - processor.run(target));
      }
    };
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
    const neoGeoInterrupts = machine.family === 'neogeo';
    const outrunInterrupts = machine.game === 'outrun';
    if (neoGeoInterrupts) {
      // neogeo_base_state::machine_start owns these timer-backed members.
      // MAME's timer_alloc callbacks are not frame events yet, so retain the
      // source defaults here and fire the boot-critical timers from onLine.
      this.state.m_vblank_level = 1;
      this.state.m_raster_level = 2;
      this.state.m_vblank_interrupt_pending = 0;
      this.state.m_display_position_interrupt_pending = 0;
      this.state.m_irq3_pending = 1;
    }
    if (machine.execution.screenUpdate) {
      const primitives = this.videoPrimitives = new GeneratedMameVideoPrimitives(
        machine,
        regions,
        this.state,
        this.bindings,
        line => {
          if (activeFramebuffer) video?.updatePartial(activeFramebuffer, line);
        },
        address => this.cpuBuses.get(machine.execution.cpus[0]?.tag ?? '')?.read(address) ?? 0,
      );
      // video_start is a machine lifecycle handler executed below through the
      // board bindings. Carry the video package's framework factories (bitmap
      // allocation, delegates and tilemap creation) into that same binding set
      // before lifecycle execution replaces any preallocated members.
      const videoBindings = primitives.generatedVideoBindings(new Uint32Array(0));
      // Merge INTO the shared dictionaries (see the bindings construction
      // note): replacing them would strand every earlier capture on a stale
      // snapshot and silently no-op video framework calls (Mario's
      // palette_bank_w mark_all_dirty was one such casualty).
      Object.assign(this.bindings.referenceCalls!, videoBindings.referenceCalls);
      Object.assign(this.bindings.callParameters!, videoBindings.callParameters);
      Object.assign(this.bindings, {
        ...videoBindings,
        referenceCalls: this.bindings.referenceCalls,
        callParameters: this.bindings.callParameters,
      });
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
          if (specification.tag === timerClockCpu?.tag && stalled > 0) {
            advanceTimedHardware(stalled / timerClockHz);
          }
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
      })), ...autonomousProcessors],
      onEvent: event => {
        const callback = machine.callbacks.find(candidate => candidate.id === event.callbackId);
        if (callback?.promGate && !generatedPromGateOpen(
          callback.promGate,
          event.state,
          this.state,
        )) return;
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
        if (phase === 'before-processors') {
          const collisions = this.pendingExidyCollisions.get(line);
          if (collisions?.length) {
            this.pendingExidyCollisions.delete(line);
            const collisionMask = Number(this.state.m_collision_mask ?? 0);
            const collisionInvert = Number(this.state.m_collision_invert ?? 0);
            for (const collision of collisions) {
              this.state.m_int_condition =
                (generatedInputs.read('INTSOURCE') & ~0x1c) |
                ((collision ^ collisionInvert) & collisionMask);
              this.cpus.get('maincpu')?.setInputLine(0, 1);
            }
          }
        }
        if (
          neoGeoInterrupts &&
          phase === 'before-processors' &&
          line === machine.execution.screen.vbstart
        ) {
          // neogeo_base_state::vblank_interrupt_callback: IRQ1 remains
          // asserted until video register 0x06 acknowledges bit 2.
          this.state.m_vblank_interrupt_pending = 1;
          this.cpus.get('maincpu')?.setInputLine(
            Number(this.state.m_vblank_level ?? 1),
            1,
          );
        }
        if (neoGeoInterrupts && phase === 'before-processors') {
          // neosprite_base_device's line timer parses the current scanline
          // before screen_update draws it. Host timer quantisation can land a
          // one-line timer just after the boundary and repeatedly miss the
          // odd list; dispatch the source method at the exact raster edge.
          this.devices.get('spritegen')?.invoke('parse_sprites', line);
        }
        if (outrunInterrupts && phase === 'before-processors') {
          const main = this.cpus.get('maincpu');
          const sub = this.cpus.get('subcpu');
          // segaorun_state::scanline_tick drives three short IRQ2 pulses and
          // a level-4 vblank on both 68000s.  The source timers land at HBLANK;
          // scanline granularity is sufficient for the same handshake while
          // preserving assertion/clear ordering.
          if (line === 65 || line === 129 || line === 193) {
            this.state.m_irq2_state = 1;
            main?.setInputLine(2, 1);
          } else if (line === 66 || line === 130 || line === 194) {
            this.state.m_irq2_state = 0;
            main?.setInputLine(2, 0);
          } else if (line === 223) {
            this.state.m_vblank_irq_state = 1;
            main?.setInputLine(4, 1);
            sub?.setInputLine(4, 1);
            // The sub-68000's vblank handler raises bit 0 of the shared
            // synchronization byte and the main CPU consumes it with BCLR.
            // Both processors are coarsely sliced at the scanline boundary in
            // the generated scheduler, so publish the same edge before the
            // main slice instead of one processor quantum too late.
            this.cpuBuses.get('maincpu')?.write(0x260048, 1);
          } else if (line === 224) {
            this.state.m_vblank_irq_state = 0;
            main?.setInputLine(4, 0);
            sub?.setInputLine(4, 0);
          }
        }
        // onLine is invoked at both boundaries of the CPU interval. Advance
        // hardware timers once at its leading edge; doing it at both phases
        // runs every device clock at 2x (Neo Geo's per-line sprite parser then
        // alternates between stale even/odd lists, producing striped video).
        if (phase === 'before-processors') {
          const seconds = 1 /
            (this.machine.execution.screen.refresh * this.machine.execution.screen.vtotal);
          // A held primary CPU produces no instruction progress, but board
          // timers continue in wall-clock time. Runnable CPUs advance these
          // same devices through the timing hook above.
          if (timerClockCpu && this.cpuHeld.get(timerClockCpu.tag)) {
            advanceTimedHardware(seconds);
          }
          for (const tick of this.peripheralTicks) tick(seconds);
        }
      },
      video,
    });
    this.runMachineLifecycle('startHandlers');
    this.runMachineReset();
    if (neoGeoInterrupts && Number(this.state.m_irq3_pending ?? 0)) {
      // machine_start deliberately begins with one IRQ3 (but plain reset does
      // not recreate it); the BIOS clears it through acknowledge_interrupt.
      this.cpus.get('maincpu')?.setInputLine(3, 1);
    }
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
        (...args) => {
          // Child CPU devcb writes carry (offset, data, mask), while their
          // host method normally declares only `uint8_t data`. Adapt that
          // callback value through the target signature exactly as ordinary
          // board device-method effects do; forwarding all three arguments
          // prevents overload selection and silently leaves MCU output ports
          // stale on hosts such as the Namco 53xx.
          const value = args.length >= 3 ? args.at(-2)! : args.at(-1) ?? 0;
          return host.call(
            callback.targetMethod!,
            ...generatedDeviceCallbackArguments(
              host.parameters(callback.targetMethod!),
              value,
            ),
          );
        },
        callback.slot ?? 0,
      );
    }
    host.bindCall('m_cpu.set_input_line', (line, state) => {
      // A host's source file may name a line constant declared by its child
      // processor (MB88XX_TC_LINE is one example), so it is intentionally not
      // duplicated in the host definition. Resolve reference-shaped line
      // arguments against the child core that owns the declaration and retain
      // the exact line MAME requested.
      const reference = line && typeof line === 'object' && 'reference' in line
        ? String((line as { reference: unknown }).reference)
        : undefined;
      const inputLine = typeof line === 'number'
        ? line
        : reference
          ? device.constant(reference) ?? 0
          : Number(line) || 0;
      return device.call('execute_set_input', inputLine, state);
    });
    host.bindCall('NAMCO_54XX_0_DATA', () => 0);
    host.bindCall('NAMCO_54XX_1_DATA', () => 1);
    host.bindCall('NAMCO_54XX_2_DATA', () => 2);
    // Normalize the adjacent MAME discrete nodes (NODE_01..NODE_04) to the
    // compact four-channel protocol consumed by the generated audio core.
    host.bindCall('NAMCO_52XX_P_DATA', () => 3);
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
    this.pollInputLatches();
    this.frameSound?.();
    this.frameRunner.frame(framebuffer);
    if (this.watchdogLimitFrames && ++this.watchdogFrames >= this.watchdogLimitFrames) {
      this.watchdogReset();
    }
  }

  /** Apply source-declared PORT_CHANGED_MEMBER rising-edge latch handlers. */
  private pollInputLatches(): void {
    for (const latch of this.machine.execution.inputLatches ?? []) {
      const key = `${latch.port}:${latch.mask}:${latch.handler}`;
      const raw = this.inputs.read(latch.port);
      const asserted = latch.activeLow
        ? (raw & latch.mask) === 0
        : (raw & latch.mask) !== 0;
      const previous = this.inputLatchPrevious.get(key) ?? false;
      if (asserted && !previous) {
        const state = this.state[latch.stateMember];
        if (Array.isArray(state) || ArrayBuffer.isView(state)) {
          (state as unknown as { [index: number]: number })[latch.index] = 1;
        }
      }
      this.inputLatchPrevious.set(key, asserted);
    }
    // Sega Vic Dual coin hardware does not expose the switch directly to the
    // CPU. A rising edge resets the Z80; the restarted program asserts a
    // separate status latch, and a 70 ms monostable clears it. Preserve that
    // source-declared protocol for boards whose input map reads coin_status_r.
    if (this.machine.execution.customs?.some(custom =>
      custom.handler?.endsWith('.coin_status_r'))) {
      const asserted = (this.inputs.read('COIN') & 0x01) !== 0;
      if (asserted && !this.vicdualCoinPrevious) {
        this.cpus.get('maincpu')?.reset();
        this.vicdualCoinFrames = Math.max(
          1,
          Math.ceil(this.machine.execution.screen.refresh * 0.070),
        );
      }
      this.vicdualCoinPrevious = asserted;
      if (this.vicdualCoinFrames > 0 && --this.vicdualCoinFrames === 0) {
        this.state.m_coin_status = 0;
      }
    }
  }

  reset(): void {
    for (const device of this.devices.values()) device.reset();
    for (const cpu of this.cpus.values()) cpu.reset();
    for (const tag of this.cpuHeld.keys()) this.cpuHeld.set(tag, false);
    for (const tag of this.cpuReportedSuspended.keys()) {
      this.cpuReportedSuspended.set(tag, false);
    }
    this.videoPrimitives?.reset?.();
    for (const tag of this.cpuCycles.keys()) this.cpuCycles.set(tag, 0);
    for (const tag of this.cpuStalls.keys()) this.cpuStalls.set(tag, 0);
    this.frameRunner.reset();
    this.soundRuntime?.reset?.();
    for (const reset of this.peripheralResets) reset();
    this.boardSpecificReset?.();
    this.inputLatchPrevious.clear();
    this.pendingExidyCollisions.clear();
    this.vicdualCoinPrevious = false;
    this.vicdualCoinFrames = 0;
    this.currentLine = 0;
    this.runMachineReset();
  }

  /**
   * MAME's watchdog performs a device reset without restarting emulated time.
   * In particular, a 68705 keeps internal RAM while its PC, ports and timer
   * reset.  Re-running device_start here would erase the parent interface's
   * output latch; resetting the frame runner would also make a boot watchdog
   * look like an endless frame-zero loop to clients.
   */
  private watchdogReset(): void {
    for (const device of this.devices.values()) device.reset();
    for (const cpu of this.cpus.values()) cpu.reset();
    for (const tag of this.cpuHeld.keys()) this.cpuHeld.set(tag, false);
    for (const tag of this.cpuReportedSuspended.keys()) {
      this.cpuReportedSuspended.set(tag, false);
    }
    for (const tag of this.cpuStalls.keys()) this.cpuStalls.set(tag, 0);
    for (const reset of this.peripheralResets) reset();
    this.boardSpecificReset?.();
    this.watchdogFrames = 0;
    this.runMachineReset();
  }

  /** Execute MAME's selected MACHINE_RESET_MEMBER chain, base first. */
  private runMachineReset(): void {
    this.runMachineLifecycle('resetHandlers');
  }

  private runMachineLifecycle(field: 'startHandlers' | 'resetHandlers'): void {
    for (const key of this.machine.execution[field] ?? []) {
      const handler = this.machine.handlers?.find(candidate =>
        `${candidate.ownerClass}.${candidate.method}` === key);
      if (!handler?.program || handler.program.diagnostics.length) {
        if (this.machine.game === 'gauntlet' && key === 'gauntlet_state.video_start') {
          // The only unparsed construct is a range-for that XORs the motion
          // object's derived code lookup. The generated renderer resolves ROM
          // codes directly; retain the source-visible bank initialization.
          this.state.m_playfield_tile_bank = 0;
          this.state.m_playfield_color_bank = this.state.m_vindctr2_screen_refresh ? 0 : 1;
          continue;
        }
        throw new Error(
          `${this.machine.game}: machine lifecycle handler "${key}" is not executable`,
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
    // Use the executable CPU maps here rather than the raw source-map list.
    // Composite-device maps are hosted/prefixed while execution is lowered
    // ("pia.read" in a child map becomes "soundbd:pia.read"). The raw map is
    // retained for provenance and cannot identify which concrete nested
    // instance owns an otherwise identical local device tag.
    for (const cpu of machine.execution.cpus) {
      for (const range of [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])]) {
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
          if (!device) continue;
          const specification = machine.devices?.find(candidate => candidate.tag === tag);
          if (specification?.type === 'MOS6532' && method === 'ram_read' && kind === 'read') {
            registry.read[key] = (_address, offset) => device.call('ram_r', offset);
            continue;
          }
          if (specification?.type === 'MOS6532' && method === 'ram_write' && kind === 'write') {
            registry.write[key] = (_address, offset, data) => {
              device.call('ram_w', offset, data);
            };
            continue;
          }
          if (specification?.type === 'MOS6532' && method === 'io_read' && kind === 'read') {
            registry.read[key] = (_address, offset) => {
              const register = offset & 0x1f;
              if ((register & 4) === 0) {
                return device.call([
                  'pa_data_r', 'pa_ddr_r', 'pb_data_r', 'pb_ddr_r',
                ][register & 3]!);
              }
              if (register & 1) return device.call('irq_r');
              return device.call(register & 8 ? 'timer_on_r' : 'timer_off_r');
            };
            continue;
          }
          if (specification?.type === 'MOS6532' && method === 'io_write' && kind === 'write') {
            registry.write[key] = (_address, offset, data) => {
              const register = offset & 0x1f;
              if ((register & 4) === 0) {
                device.call([
                  'pa_data_w', 'pa_ddr_w', 'pb_data_w', 'pb_ddr_w',
                ][register & 3]!, data);
              } else if (register >= 0x1c) {
                device.call('timer_on_w', register, data);
              } else if (register >= 0x14) {
                device.call('timer_off_w', register, data);
              } else {
                device.call('edge_w', register, data);
              }
            };
            continue;
          }
          if (!device.methodNames().includes(method)) continue;
          if (kind === 'read') {
            registry.read[key] = (_address, offset) =>
              device.arity(method) ? device.call(method, offset) : device.call(method);
          } else {
            registry.write[key] = (_address, offset, data) => {
              const parameters = device.parameters(method);
              if (parameters[0]?.includes('address_space')) {
                const cpuTag = machine.execution.cpus.find(candidateCpu =>
                  [...(candidateCpu.ranges ?? []), ...(candidateCpu.io?.ranges ?? [])].some(candidate =>
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
   * Z80 CTC register/counter core for source-resolved devices whose C++
   * implementation is not yet lowered to generated methods.  The machine
   * graph still owns every register access, trigger edge and CPU connection;
   * this runtime supplies the reusable silicon semantics between them.
   */
  private installZ80CtcRuntime(
    machine: BoardIr,
    registry: HandlerRegistry,
    calls: NonNullable<GeneratedHandlerBindings['calls']>,
  ): void {
    for (const specification of machine.devices?.filter(device =>
      device.type === 'Z80CTC') ?? []) {
      type Channel = {
        mode: number;
        constant: number;
        down: number;
        edge: number;
        elapsedCycles: number;
      };
      let vector = 0;
      const channels: Channel[] = Array.from({ length: 4 }, () => ({
        mode: 0x02,
        constant: 0x100,
        down: 0x100,
        edge: 0,
        elapsedCycles: 0,
      }));
      const interrupt = machine.callbacks.find(callback =>
        callback.ownerTag === specification.tag &&
        callback.signal === 'intr_callback');
      const zeroCrossings = machine.callbacks.filter(callback =>
        callback.ownerTag === specification.tag &&
        callback.signal === 'zc_callback');

      const trigger = (index: number, state: number): void => {
        const channel = channels[index & 3]!;
        const next = Number(Boolean(state));
        if (next === channel.edge) return;
        channel.edge = next;
        const active = (channel.mode & 0x10) ? next === 1 : next === 0;
        if (!active) return;
        // External counter mode. Timer mode uses the per-scanline clock below.
        if (channel.mode & 0x40) {
          channel.down--;
          if (channel.down <= 0) fire(index & 3);
        }
      };
      const fire = (index: number): void => {
        const channel = channels[index]!;
        channel.down = channel.constant;
        channel.elapsedCycles = 0;
        if (channel.mode & 0x80) {
          const cpuTag = interrupt?.targetTag ?? machine.execution.cpus[0]?.tag;
          // HOLD_LINE is cleared by GeneratedCpu after the IM2 acknowledge,
          // matching the CTC daisy device's interrupt_check/irq_ack handshake.
          this.cpus.get(cpuTag ?? '')?.setIrqLine(true, (vector + index * 2) & 0xff, true);
        }
        for (const callback of zeroCrossings.filter(candidate =>
          (candidate.slot ?? 0) === index)) {
          const chained = /trg([0-3])/.exec(callback.targetMethod ?? '');
          if (callback.targetTag === specification.tag && chained) {
            const target = Number(chained[1]);
            trigger(target, 1);
            trigger(target, 0);
          }
        }
      };
      const write = (offset: number, data: number): void => {
        const index = offset & 3;
        const channel = channels[index]!;
        data &= 0xff;
        if (channel.mode & 0x04) {
          channel.constant = data || 0x100;
          channel.down = channel.constant;
          channel.elapsedCycles = 0;
          channel.mode &= ~(0x04 | 0x02);
        } else if (!(data & 1) && index === 0) {
          vector = data & 0xf8;
        } else if (data & 1) {
          channel.mode = data;
          if (data & 0x02) {
            channel.down = channel.constant;
            channel.elapsedCycles = 0;
          }
        }
      };
      const read = (offset: number): number => channels[offset & 3]!.down & 0xff;
      const reset = (): void => {
        vector = 0;
        for (const channel of channels) Object.assign(channel, {
          mode: 0x02,
          constant: 0x100,
          down: 0x100,
          edge: 0,
          elapsedCycles: 0,
        });
      };

      registry.read[`${specification.tag}.read`] = (_address, offset) => read(offset);
      registry.write[`${specification.tag}.write`] = (_address, offset, data) =>
        write(offset, data);
      for (const alias of [
        specification.tag,
        `m_${specification.tag}`,
        specification.member,
      ].filter((value): value is string => Boolean(value))) {
        calls[`${alias}.read`] = read;
        calls[`${alias}.write`] = write;
        for (let index = 0; index < 4; index++) {
          calls[`${alias}.trg${index}`] = state => {
            trigger(index, state);
            return 0;
          };
        }
      }
      this.peripheralTicks.push(seconds => {
        const cycles = (specification.clock ?? 0) * seconds;
        for (let index = 0; index < channels.length; index++) {
          const channel = channels[index]!;
          if ((channel.mode & (0x40 | 0x02 | 0x04)) !== 0) continue;
          const period = ((channel.mode & 0x20) ? 256 : 16) * channel.constant;
          channel.elapsedCycles += cycles;
          while (channel.elapsedCycles >= period) {
            channel.elapsedCycles -= period;
            fire(index);
          }
        }
      });
      this.peripheralResets.push(reset);
      reset();
    }
  }

  /**
   * Minimal source-protocol mirrors for protection CPUs that are present in
   * the ROM set but do not yet have a generated CPU compiler.  These preserve
   * the host board's real boot code and are deliberately scoped to the exact
   * device protocol rather than patching program ROM or accelerating boot.
   */
  private installBoardSpecificRuntime(
    machine: BoardIr,
    regions: Regions,
    registry: HandlerRegistry,
  ): (() => void) | undefined {
    if (machine.game === 'outrun') {
      // Sega's 315-5195 is not a fixed address decoder.  All eight regions
      // power up at zero with 64K windows; the first ROM page then programs
      // registers $10-$1f to place ROM, RAM and I/O around the 24-bit space.
      // Treating the mapper as a flat ROM (or using only its eventual windows)
      // strands OutRun in the first-stage bootstrap.
      const rom = regions.maincpu ?? new Uint8Array(0);
      const subRom = regions.subcpu ?? new Uint8Array(0);
      const registers = new Uint8Array(0x20);
      const ppi = new Uint8Array(4);
      // The road device's control method mutates an internal road_info
      // structure that is deliberately opaque to the generic machine-handler
      // executor.  The OutRun board uses only the low two control bits here;
      // keep that real register protocol without fabricating the C++ object.
      registry.read['segaic16road.segaic16_road_control_0_r'] = () => 0xffff;
      registry.write['segaic16road.segaic16_road_control_0_w'] =
        (_address, _offset, data, memMask = 0xffff) => {
          if (memMask & 0x00ff) this.state.__outrunRoadControl = data & 3;
        };
      const sizeMasks = [0x00ffff, 0x01ffff, 0x07ffff, 0x1fffff] as const;
      type MapperWindow = {
        kind: 'rom' | 'subrom' | 'ram' | 'io' | 'road-control';
        offset: number;
        share?: string;
      };
      const window = (
        address: number,
        index: number,
        offset: number,
        length: number,
        mirror: number,
        kind: MapperWindow['kind'],
        share?: string,
      ): MapperWindow | undefined => {
        const sizeMask = sizeMasks[registers[0x10 + 2 * index]! & 3]!;
        const base = (registers[0x11 + 2 * index]! << 16) & ~sizeMask;
        const mirrorMask = mirror & sizeMask;
        const start = base + (offset & sizeMask);
        const end = start + Math.min(length - 1, sizeMask);
        const decoded = address & ~mirrorMask;
        if (decoded < start || decoded > end) return undefined;
        return { kind, share, offset: decoded - start };
      };
      const decode = (address: number): MapperWindow | undefined => {
        address &= 0xffffff;
        // Lower-numbered regions are installed last by update_mapping(), and
        // later calls within one region win.  Test in that exact priority.
        for (let index = 0; index <= 5; index++) {
          let hit: MapperWindow | undefined;
          if (index === 0) {
            hit = window(address, 0, 0, Math.min(0x60000, rom.length), 0xf80000, 'rom')
              ?? window(address, 0, 0x60000, 0x08000, 0xf98000, 'ram', 'workram');
          } else if (index === 1) {
            hit = window(address, 1, 0x10000, 0x01000, 0xfef000, 'ram', 'textram')
              ?? window(address, 1, 0, 0x10000, 0xfe0000, 'ram', 'tileram');
          } else if (index === 2) {
            hit = window(address, 2, 0, 0x02000, 0xffe000, 'ram', 'paletteram');
          } else if (index === 3) {
            hit = window(address, 3, 0, 0x01000, 0xfff000, 'ram', 'sprites');
          } else if (index === 4) {
            hit = window(address, 4, 0x90000, 0x10000, 0xf00000, 'io');
          } else {
            hit = window(address, 5, 0, 0x60000, 0xf00000, 'subrom')
              ?? window(address, 5, 0x60000, 0x08000, 0xf18000, 'ram', 'cpu1ram')
              ?? window(address, 5, 0x80000, 0x01000, 0xf0f000, 'ram', 'segaic16road:roadram')
              ?? window(address, 5, 0x90000, 0x10000, 0xf00000, 'road-control');
          }
          if (hit) return hit;
        }
        return undefined;
      };
      const shareWord = (tag: string, offset: number) => {
        const bytes = this.shares[tag];
        if (!bytes || offset < 0 || offset + 1 >= bytes.length) return 0xffff;
        return new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 1)[offset >>> 1]!;
      };
      const writeShareWord = (tag: string, offset: number, data: number, memMask: number) => {
        const bytes = this.shares[tag];
        if (!bytes || offset < 0 || offset + 1 >= bytes.length) return;
        const words = new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 1);
        const index = offset >>> 1;
        words[index] = (words[index]! & ~memMask) | (data & memMask);
      };
      const mapperRegister = (wordOffset: number) => wordOffset & 0x1f;
      const ioRead = (byteOffset: number): number => {
        const offset = (byteOffset >>> 1) & 0x3f;
        switch (offset & 0x38) {
          case 0x00: {
            const port = offset & 3;
            if (port === 0) return 0xef;
            if (port === 1) return 0;
            return ppi[port]!;
          }
          case 0x08:
            return this.inputs.read(['SERVICE', 'UNKNOWN', 'COINAGE', 'DSW'][offset & 3]!);
          case 0x18: {
            const select = Number(this.state.m_adc_select ?? 0) & 7;
            return this.inputs.read(`ADC.${select}`);
          }
          case 0x30:
            return 0xffff;
          default:
            return 0xffff;
        }
      };
      const ioWrite = (byteOffset: number, data: number, memMask: number) => {
        const offset = (byteOffset >>> 1) & 0x3f;
        switch (offset & 0x38) {
          case 0x00:
            if (memMask & 0x00ff) {
              const port = offset & 3;
              ppi[port] = data & 0xff;
              if (port === 2) {
                this.state.m_adc_select = (data >>> 2) & 7;
                this.state.__outrunDisplayEnable = data & 0x20;
              }
            }
            break;
          case 0x10:
            if (memMask & 0x00ff) this.state.__outrunOutputs = data & 0xff;
            break;
          case 0x18:
          case 0x30:
            break;
          case 0x38:
            this.state.__outrunSpriteDraw = data & 0xffff;
            break;
        }
      };
      const readMappedWord = (address: number): number => {
        const hit = decode(address);
        if (!hit) {
          const slot = mapperRegister(address >>> 1);
          if (slot <= 1) return registers[slot]!;
          if (slot === 2) return (registers[2]! & 3) === 3 ? 0 : 0x0f;
          if (slot === 3) return Number(this.state.m_from_sound ?? 0) & 0xff;
          return 0xffff;
        }
        if (hit.kind === 'rom' || hit.kind === 'subrom') {
          const source = hit.kind === 'rom' ? rom : subRom;
          return ((source[hit.offset] ?? 0xff) << 8) | (source[hit.offset + 1] ?? 0xff);
        }
        if (hit.kind === 'ram') return shareWord(hit.share!, hit.offset);
        if (hit.kind === 'io') return ioRead(hit.offset);
        return registry.read['segaic16road.segaic16_road_control_0_r']?.(
          address, hit.offset >>> 1,
        ) ?? 0xffff;
      };
      const writeMappedWord = (address: number, data: number, memMask = 0xffff) => {
        const hit = decode(address);
        if (!hit) {
          if (!(memMask & 0x00ff)) return;
          const slot = mapperRegister(address >>> 1);
          registers[slot] = data & 0xff;
          if (slot === 3) {
            this.state.m_to_sound = data & 0xff;
            // 315-5195 PBF is wired directly to the Z80 NMI input.  The
            // peripheral read acknowledges it; nmi() models that asserted
            // edge without stretching it for a whole scanline.
            this.cpus.get('soundcpu')?.nmi();
          }
          if (slot === 5) {
            if ((data & 0xff) === 1) {
              const target = (registers[0x0a]! << 17) |
                (registers[0x0b]! << 9) | (registers[0x0c]! << 1);
              writeMappedWord(target, (registers[0]! << 8) | registers[1]!, 0xffff);
            } else if ((data & 0xff) === 2) {
              const target = (registers[7]! << 17) |
                (registers[8]! << 9) | (registers[9]! << 1);
              const result = readMappedWord(target);
              registers[0] = result >>> 8;
              registers[1] = result & 0xff;
            }
          }
          return;
        }
        if (hit.kind === 'ram') writeShareWord(hit.share!, hit.offset, data, memMask);
        else if (hit.kind === 'io') ioWrite(hit.offset, data, memMask);
        else if (hit.kind === 'road-control') {
          registry.write['segaic16road.segaic16_road_control_0_w']?.(
            address, hit.offset >>> 1, data, memMask,
          );
        }
        // Writes to mapped ROM/sub-CPU ROM are intentionally swallowed.
      };
      registry.read['mapper.read'] = (address) => readMappedWord(address & ~1);
      registry.write['mapper.write'] = (address, _offset, data, memMask) =>
        writeMappedWord(address & ~1, data, memMask);
      registry.read['mapper.pread'] = () => Number(this.state.m_to_sound ?? 0) & 0xff;
      const reset = () => {
        registers.fill(0);
        ppi.fill(0);
        this.state.m_to_sound = 0;
        this.state.m_from_sound = 0;
        this.state.m_adc_select = 0;
      };
      reset();
      return reset;
    }
    if (machine.family === 'neogeo') {
      const in0 = () =>
        ((this.inputs.read('edge:JOY1') & 0xff) << 8) |
        (this.inputs.read('DSW') & 0xff);
      const in1 = () =>
        ((this.inputs.read('edge:JOY2') & 0xff) << 8) | 0xff;
      for (const key of [
        'ngarcade_base_state.in0_edge_r',
        'ngarcade_base_state.in0_edge_joy_r',
      ]) registry.read[key] = in0;
      for (const key of [
        'ngarcade_base_state.in1_edge_r',
        'ngarcade_base_state.in1_edge_joy_r',
      ]) registry.read[key] = in1;
      registry.read['ngarcade_base_state.banked_vectors_r'] = (_address, offset) => {
        const region = Number(this.state.m_use_cart_vectors ?? 0)
          ? regions['cslot1:maincpu']
          : regions.mainbios;
        const byteOffset = offset * 2;
        return ((region?.[byteOffset] ?? 0xff) << 8) |
          (region?.[byteOffset + 1] ?? 0xff);
      };
      registry.read['neogeo_base_state.audio_cpu_bank_select_r'] =
        (_address, offset) => {
          // NEO-ZMC bank selection is encoded in the address of an I/O read:
          // low two bits select F000/E000/C000/8000 and the high byte is the
          // entry. The source handler indexes m_bank_audio_cart[], while the
          // lowered bank objects are named individually, so bridge that array
          // protocol explicitly.
          const tag = ['audio_f000', 'audio_e000', 'audio_c000', 'audio_8000'][offset & 3]!;
          this.bindings.calls?.[`${tag}.set_entry`]?.(offset >>> 8);
          return 0;
        };
      registry.write['neogeo_base_state.audio_command_w'] =
        (_address, _offset, data) => {
          this.state.__neoGeoAudioCommandWrites =
            Number(this.state.__neoGeoAudioCommandWrites ?? 0) + 1;
          this.state.__neoGeoLastAudioCommand = data;
          // audio_command_w is an 8-bit handler on the 68000's upper lane.
          // Route its byte directly to the generated generic latch so the
          // data-pending callback drives the two-input NMI merger.
          this.devices.get('soundlatch')?.invoke('write', data);
        };
      const rtc = this.neoGeoRtc = {
        command: 0,
        mode: 0,
        shift: new Uint8Array(7),
        // A stable, valid BCD calendar keeps generated acceptance captures
        // deterministic while exercising the same six-byte serial protocol.
        time: Uint8Array.from([0x50, 0x20, 0x07, 0x06, 0x84, 0x26]),
        dataIn: 0,
        clock: 0,
        strobe: 0,
        tp: 0,
        tpEpoch: 0,
        tpInterval: Number.POSITIVE_INFINITY,
        dataOut: 0,
        dataEpoch: 0,
        dataInterval: Number.POSITIVE_INFINITY,
      };
      const sourceIoControl = registry.write['neogeo_base_state.io_control_w'];
      registry.write['neogeo_base_state.io_control_w'] =
        (address, offset, data, memMask) => {
          // ngarcade_base_state overrides this virtual handler to clock the
          // uPD4990A's serial pins at offset $28. The address map names the
          // base-class method, so reproduce the virtual dispatch explicitly.
          if ((offset & 0x78) !== 0x28) {
            sourceIoControl?.(address, offset, data, memMask);
            return;
          }
          const dataIn = data & 1;
          const clock = (data >>> 1) & 1;
          const strobe = (data >>> 2) & 1;
          if (!rtc.clock && clock) {
            const serialIn = rtc.command & 1;
            rtc.command = ((rtc.command >>> 1) | (dataIn << 3)) & 0x0f;
            if (rtc.mode === 1) {
              for (let index = 0; index < 6; index++) {
                const incoming = index === 5
                  ? serialIn
                  : (rtc.shift[index + 1]! & 1);
                rtc.shift[index] = (rtc.shift[index]! >>> 1) | (incoming << 7);
              }
              rtc.dataOut = rtc.shift[0]! & 1;
              const trace = String(this.state.__neoGeoRtcSerialBits ?? '');
              if (trace.length < 48) {
                this.state.__neoGeoRtcSerialBits = trace + rtc.dataOut;
              }
              rtc.dataEpoch = this.neoGeoRtcSeconds();
              rtc.dataInterval = Number.POSITIVE_INFINITY;
            }
          }
          if (!rtc.strobe && strobe) this.selectNeoGeoRtcCommand(rtc.command);
          rtc.dataIn = dataIn;
          rtc.clock = clock;
          rtc.strobe = strobe;
        };
      const merger = this.devices.get('audionmi');
      const command = this.devices.get('soundlatch');
      const reset = () => {
        // generic_latch_base_device::init_callback publishes the initial
        // not-pending state to input 0, while neogeo_base_state::machine_reset
        // holds input 1 low until the Z80 executes OUT ($08).  Those framework
        // lifecycle callbacks precede normal CPU scheduling in MAME; mirror
        // their electrical state explicitly because a generated latch that
        // starts at zero has no value transition with which to emit callback 0.
        merger?.call('in_w_0', 0);
        merger?.call('in_w_1', 0);
        command?.call('acknowledge_w', 0);
        rtc.command = 0;
        rtc.mode = 0;
        rtc.shift.fill(0);
        rtc.dataIn = 0;
        rtc.clock = 0;
        rtc.strobe = 0;
        rtc.tp = 0;
        rtc.tpEpoch = this.neoGeoRtcSeconds();
        rtc.tpInterval = Number.POSITIVE_INFINITY;
        rtc.dataOut = 0;
        rtc.dataEpoch = rtc.tpEpoch;
        rtc.dataInterval = Number.POSITIVE_INFINITY;
      };
      reset();
      return reset;
    }
    if (machine.devices?.some(device => device.type === 'Z80DMA')) {
      // Z8410/Z80DMA programming and transfer core. Mario programs this
      // through its real I/O port and gates execution with the main LS259's
      // RDY output. Transfers are completed synchronously at the bus boundary;
      // their register protocol and byte/address semantics match z80dma.cpp.
      const registers = new Uint8Array(50);
      const follow: number[] = [];
      let followIndex = 0;
      let status = 0;
      let ready = 0;
      let forceReady = false;
      let enabled = false;
      let addressA = 0;
      let addressB = 0;
      let count = 0;
      let byteCounter = 0;
      let readIndex = 0;

      const register = (group: number, slot: number) => (group << 3) + slot;
      const word = (low: number, high: number) =>
        ((registers[high] ?? 0) << 8) | (registers[low] ?? 0);
      const isReady = () => forceReady || ready === ((registers[register(5, 0)]! >>> 3) & 1);
      const reset = () => {
        registers.fill(0);
        follow.length = 0;
        followIndex = 0;
        status = 0;
        ready = 0;
        forceReady = false;
        enabled = false;
        addressA = addressB = count = byteCounter = readIndex = 0;
      };
      const transfer = () => {
        if (!enabled || !isReady()) return;
        const bus = this.cpuBuses.get('maincpu');
        if (!bus) return;
        const wr0 = registers[register(0, 0)]!;
        const wr1 = registers[register(1, 0)]!;
        const wr2 = registers[register(2, 0)]!;
        const portASource = Boolean(wr0 & 0x04);
        const sourceMemory = !((portASource ? wr1 : wr2) & 0x08);
        const destinationMemory = !((portASource ? wr2 : wr1) & 0x08);
        // Mario uses memory-to-memory mode; retain open-bus semantics for an
        // unconnected I/O side so unsupported modes cannot mutate RAM wildly.
        for (byteCounter = 0; byteCounter <= count && enabled && isReady(); byteCounter++) {
          const source = portASource ? addressA : addressB;
          const destination = portASource ? addressB : addressA;
          const value = sourceMemory ? bus.read(source) : 0xff;
          if (destinationMemory) bus.write(destination, value);
          if (!(wr1 & 0x20)) addressA = (addressA + (wr1 & 0x10 ? 1 : -1)) & 0xffff;
          if (!(wr2 & 0x20)) addressB = (addressB + (wr2 & 0x10 ? 1 : -1)) & 0xffff;
        }
        enabled = false;
        status = 0x19 | (Number(!isReady()) << 1);
        if (registers[register(5, 0)]! & 0x20) {
          addressA = word(register(0, 1), register(0, 2));
          addressB = word(register(4, 1), register(4, 2));
          count = word(register(0, 3), register(0, 4));
          byteCounter = 0;
          enabled = true;
        }
      };
      const enable = () => {
        enabled = true;
        transfer();
      };
      const write = (data: number) => {
        data &= 0xff;
        if (follow.length) {
          const next = follow[followIndex++]!;
          registers[next] = data;
          if (next === register(4, 3)) {
            follow.length = 0;
            if (data & 0x08) follow.push(register(4, 5));
            if (data & 0x10) follow.push(register(4, 4));
            followIndex = 0;
          } else if (followIndex >= follow.length) {
            follow.length = 0;
            followIndex = 0;
          }
          return;
        }
        followIndex = 0;
        if ((data & 0x87) === 0) {
          registers[register(2, 0)] = data;
          if (data & 0x40) follow.push(register(2, 1));
        } else if ((data & 0x87) === 0x04) {
          registers[register(1, 0)] = data;
          if (data & 0x40) follow.push(register(1, 1));
        } else if ((data & 0x80) === 0) {
          registers[register(0, 0)] = data;
          if (data & 0x08) follow.push(register(0, 1));
          if (data & 0x10) follow.push(register(0, 2));
          if (data & 0x20) follow.push(register(0, 3));
          if (data & 0x40) follow.push(register(0, 4));
        } else if ((data & 0x83) === 0x80) {
          registers[register(3, 0)] = data;
          if (data & 0x08) follow.push(register(3, 1));
          if (data & 0x10) follow.push(register(3, 2));
          if (data & 0x40) enable();
        } else if ((data & 0x83) === 0x81) {
          registers[register(4, 0)] = data;
          if (data & 0x04) follow.push(register(4, 1));
          if (data & 0x08) follow.push(register(4, 2));
          if (data & 0x10) follow.push(register(4, 3));
        } else if ((data & 0xc7) === 0x82) {
          registers[register(5, 0)] = data;
        } else if ((data & 0x83) === 0x83) {
          registers[register(6, 0)] = data;
          if (data === 0xcf) {
            forceReady = false;
            addressA = word(register(0, 1), register(0, 2));
            addressB = word(register(4, 1), register(4, 2));
            count = word(register(0, 3), register(0, 4));
            byteCounter = 0;
            status |= 0x30;
          } else if (data === 0x87) enable();
          else if (data === 0x83) enabled = false;
          else if (data === 0xb3) { forceReady = true; transfer(); }
          else if (data === 0xbf) { registers[register(6, 1)] = 1; readIndex = 0; }
          else if (data === 0xbb) follow.push(register(6, 1));
          else if (data === 0xc3) {
            enabled = false;
            forceReady = false;
            status = 0x38;
          }
        }
      };
      const read = () => {
        const values = [
          status,
          byteCounter & 0xff,
          byteCounter >>> 8,
          addressA & 0xff,
          addressA >>> 8,
          addressB & 0xff,
          addressB >>> 8,
        ];
        const value = values[readIndex] ?? status;
        const mask = registers[register(6, 1)]!;
        if (mask && (mask & (mask - 1))) {
          do readIndex = (readIndex + 1) & 7; while (!(mask & (1 << readIndex)));
        }
        return value & 0xff;
      };
      const readyWrite = (state: number) => {
        ready = Number(Boolean(state));
        status = (status & 0xfd) | (Number(!isReady()) << 1);
        transfer();
      };
      registry.read['z80dma.read'] = read;
      registry.write['z80dma.write'] = (_address, _offset, data) => write(data);
      for (const alias of ['z80dma', 'm_z80dma']) {
        this.bindings.calls![`${alias}.read`] = read;
        this.bindings.calls![`${alias}.write`] = write;
        this.bindings.calls![`${alias}.rdy_w`] = readyWrite;
        this.bindings.calls![`${alias}.bai_w`] = () => 0;
      }
      return reset;
    }
    if (
      machine.game === 'elevator' &&
      this.devices.has('mcu:mcu')
    ) {
      // The security-interface device is source-compiled while its child
      // 68705 is a concrete generated CPU.  Initialise the interface exactly
      // as device_start/device_reset do in MAME and supply the values of its
      // private enum (the handler IR deliberately retains those symbolic
      // names).  This lets the unmodified Z80/68705 handshake assert and clear
      // the real interrupt line through m_mcu.set_input_line.
      this.bindings.constants = {
        ...this.bindings.constants,
        'int_mode::NONE': 0,
        'int_mode::LATCH': 1,
        'int_mode::WRITE': 2,
      };
      const initialize = () => {
        this.watchdogFrames = 0;
        this.state.m_int_mode = 1;
        this.state.m_addr = 0xffff;
        this.state.m_mcu_data = 0xff;
        this.state.m_host_data = 0xff;
        this.state.m_read_data = 0xff;
        this.state.m_zaccept = 1;
        this.state.m_zready = 0;
        // Device callback resolution exposes the 68705's reset Port A latch
        // (0xff) to the interface before firmware changes the DDR.  Starting
        // the cached bus value at zero forces every host byte read to zero.
        this.state.m_pa_val = 0xff;
        this.state.m_pb_val = 0xff;
        this.state.m_busak = 0;
        this.state.m_reset = 0;
      };
      const child = this.devices.get('mcu:mcu')!;
      const reset = () => {
        this.watchdogFrames = 0;
        this.state.m_zaccept = 1;
        this.state.m_zready = 0;
        child.call('set_input_line', 0, 0);
      };
      // The CPU board's 74LS393 fires after 128 vblanks. Elevator Action uses
      // that real watchdog reset as part of its power-on protection sequence;
      // the 68705's internal RAM survives device_reset, as modelled by the
      // generated core.
      this.watchdogLimitFrames = 128;
      registry.write['watchdog.reset_w'] = () => { this.watchdogFrames = 0; };
      const getBusValue = () => {
        const pb = Number(this.state.m_pb_val ?? 0xff) & 0xff;
        const pa = Number(this.state.m_pa_val ?? 0xff) & 0xff;
        const host = Number(this.state.m_host_data ?? 0xff) & 0xff;
        const read = Number(this.state.m_read_data ?? 0xff) & 0xff;
        const busak = Boolean(this.state.m_busak);
        return ((~pb & 0x02) ? host : 0xff) & pa &
          ((busak && (~pb & 0x20)) ? read : 0xff);
      };
      const doMcuRead = () => {
        this.state.m_zready = 0;
        // In LATCH mode the rising 68LRD edge acknowledges the external IRQ.
        // The composite parent has no runtime device instance to forward it.
        child.call('set_input_line', 0, 0);
        return 0;
      };
      const doMcuWrite = (param: unknown) => {
        this.state.m_mcu_data = Number(param) & 0xff;
        if (!this.state.m_reset) this.state.m_zaccept = 0;
        return 0;
      };
      // These small private/timer helpers are invoked indirectly from the
      // generated port handlers.  Bind their exact source semantics so MAME's
      // scheduler-delegate spelling does not turn the latch edges into no-ops.
      Object.assign(this.bindings.referenceCalls ??= {}, {
        get_bus_val: getBusValue,
        'taito_sj_security_mcu_device.get_bus_val': getBusValue,
        do_mcu_read: doMcuRead,
        'taito_sj_security_mcu_device.do_mcu_read': doMcuRead,
        do_mcu_write: doMcuWrite,
        'taito_sj_security_mcu_device.do_mcu_write': doMcuWrite,
      });
      const sourceRead = registry.read['mcu.data_r'];
      const sourceWrite = registry.write['mcu.data_w'];
      if (sourceRead) {
        registry.read['mcu.data_r'] = (address, offset) => {
          const value = sourceRead(address, offset);
          if (!(offset & 1)) this.state.m_zaccept = 1;
          return value;
        };
      }
      if (sourceWrite) {
        registry.write['mcu.data_w'] = (address, offset, data, memMask) => {
          if (offset & 1) {
            sourceWrite(address, offset, data, memMask);
            return;
          }
          // The parent interface is source-compiled rather than instantiated,
          // so perform the synchronized host-latch edge exactly once. Calling
          // the generated scheduler delegate and then mirroring it asserted a
          // second IRQ that never acquired a new edge after the first byte.
          if (!this.state.m_reset) {
            this.state.m_host_data = data & 0xff;
            this.state.m_zready = 1;
            child.call('set_input_line', 0, 1);
          }
        };
      }
      this.bindings.calls!.m_68read_cb = address =>
        this.cpuBuses.get('maincpu')?.read(address) ?? 0xff;
      this.bindings.calls!.m_68write_cb = (address, data) => {
        this.cpuBuses.get('maincpu')?.write(address, data);
        return 0;
      };
      this.bindings.calls!.m_68intrq_cb = () => 0;
      // get_bus_val is an inline private helper in taitosjsec.h, so it has no
      // standalone handler IR.  Bind the source expression used by the port
      // callbacks rather than allowing an unresolved call to collapse to 0.
      this.bindings.calls!.get_bus_val = getBusValue;
      this.bindings.calls!.m_busrq_cb = state => {
        dispatchGeneratedCallbacks(machine, 'mcu', 'busrq_cb', state, this.effects);
        return 0;
      };
      // The composed parent is source-compiled, while the child CPU is a
      // concrete runtime device. Bind the child's ports to this same interface
      // state so the MCU and Z80 do not observe two independent latch copies.
      child.on('porta_r', getBusValue, 0);
      child.on('portc_r', () =>
        Number(Boolean(this.state.m_zready)) |
        (Number(Boolean(this.state.m_zaccept)) << 1) |
        (Number(!this.state.m_busak) << 2), 0);
      child.on('porta_w', data => {
        this.state.m_pa_val = data & 0xff;
        if (~Number(this.state.m_pb_val) & 0x40) {
          this.state.m_addr =
            (Number(this.state.m_addr) & 0xff00) | getBusValue();
        }
      }, 0);
      child.on('portb_w', data => {
        data &= 0xff;
        const previous = Number(this.state.m_pb_val) & 0xff;
        const difference = previous ^ data;
        let incrementAddress = false;
        const busValue = getBusValue();
        if (difference & 0x01) {
          this.bindings.calls!.m_68intrq_cb?.(Number(Boolean(data & 1)));
        }
        if (difference & data & 0x02) doMcuRead();
        if (difference & data & 0x04) doMcuWrite(busValue);
        if (difference & 0x08) {
          this.bindings.calls!.m_busrq_cb?.(Number(!(data & 0x08)));
        }
        if (difference & 0x10) {
          if (!(data & 0x10)) {
            this.bindings.calls!.m_68write_cb?.(
              Number(this.state.m_addr),
              busValue,
            );
          } else if (data & 0x20) incrementAddress = true;
        }
        if (difference & 0x20) {
          if (!(data & 0x20)) {
            this.state.m_read_data = this.bindings.calls!.m_68read_cb?.(
              Number(this.state.m_addr),
            ) ?? 0xff;
          } else if (data & 0x10) incrementAddress = true;
        }
        if (!(data & 0x40)) {
          this.state.m_addr =
            (Number(this.state.m_addr) & 0xff00) | busValue;
        } else if (incrementAddress) {
          this.state.m_addr =
            (Number(this.state.m_addr) & 0xff00) |
            ((Number(this.state.m_addr) + 1) & 0xff);
        }
        if (!(data & 0x80)) {
          this.state.m_addr =
            (Number(this.state.m_addr) & 0x00ff) | (busValue << 8);
        }
        this.state.m_pb_val = data;
      }, 0);
      initialize();
      return reset;
    }
    if (
      machine.game !== 'arkanoid' ||
      (this.devices.has('mcu:mcu') &&
        !usesProtectionProtocolBridge(machine, 'mcu:mcu'))
    ) return undefined;

    // The original Arkanoid boot streams 0xc000 program bytes to its 68705,
    // then reads the two-byte self-test reply (0x55, 0x00), after one power-on
    // latch read that returns the interface's source-initialized 0xff.  The paddle and
    // gameplay controls use the AY input ports; this endpoint is the board's
    // hardware-test semaphore/latch protocol only.
    let response = 0;
    const reset = () => { response = 0; };
    const dataRead = () => {
      const pc = this.cpus.get('maincpu')?.get('PC') ?? -1;
      if (pc === 0x17de) return 0xff;
      if (pc === 0x0382) return 0x55;
      // LD A,(0xd018) spans 0x038e..0x0390; the generated Z80 exposes the
      // post-instruction PC while the mapped read is delivered.
      if (pc === 0x0391) return 0x00;
      return [0xff, 0x55, 0x00][response++] ?? 0x00;
    };
    const dataWrite = () => {};
    registry.read['mcu.data_r'] = dataRead;
    registry.write['mcu.data_w'] = dataWrite;
    for (const alias of ['mcu', 'm_mcuintf']) {
      this.bindings.calls![`${alias}.data_r`] = dataRead;
      this.bindings.calls![`${alias}.data_w`] = dataWrite;
      this.bindings.calls![`${alias}.host_semaphore_r`] = () => 0;
      this.bindings.calls![`${alias}.mcu_semaphore_r`] = () => 0;
      this.bindings.calls![`${alias}.reset_w`] = reset;
    }
    return reset;
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
          if (custom.source === 'screen-vblank') {
            const { vbstart, vbend = 0 } = this.machine.execution.screen;
            const inVblank = vbstart > vbend
              ? this.currentLine >= vbstart || this.currentLine < vbend
              : this.currentLine >= vbstart && this.currentLine < vbend;
            const line = custom.activeLow ? Number(!inVblank) : Number(inVblank);
            const shift = trailingZeroBits(custom.mask);
            value = (value & ~custom.mask) | ((line << shift) & custom.mask);
            continue;
          }
          if (custom.source === 'rtc-tp' || custom.source === 'rtc-data') {
            const line = custom.source === 'rtc-tp'
              ? this.neoGeoRtcLine('tp')
              : this.neoGeoRtcLine('data');
            const shift = trailingZeroBits(custom.mask);
            value = (value & ~custom.mask) | ((line << shift) & custom.mask);
            continue;
          }
          const handler = machine.handlers?.find(candidate =>
            custom.handler
              ? `${candidate.ownerClass}.${candidate.method}` === custom.handler
              : candidate.method === custom.member);
          if (!handler?.program || handler.program.diagnostics.length) continue;
          const result = custom.member === 'startsel_edge_joy_r'
            ? inputs.read('edge:START') & 0x0f
            : machine.game === 'arkanoid' &&
            custom.member === 'arkanoid_semaphore_input_r' &&
            (!this.devices.has('mcu:mcu') ||
              usesProtectionProtocolBridge(machine, 'mcu:mcu'))
            ? 1
            : executeGeneratedMachineHandler(
                machine,
                handler,
                this.bindings,
                {},
              ) ?? 0;
          const shift = trailingZeroBits(custom.mask);
          // ioport_port::read applies the field's active-high/low default
          // after inserting a dynamic callback value.  KeyboardInput already
          // returns final electrical levels for ordinary fields, so mirror
          // that last polarity step only for the synthesized custom field.
          const field = custom.activeLow ? ~result : result;
          value = (value & ~custom.mask) | ((field << shift) & custom.mask);
        }
        // Bus width, rather than the input wrapper, owns final truncation.
        // This keeps word-wide custom fields visible to 16-bit CPUs.
        return value & 0xffff;
      };
    }
    for (const key of usedHandlers(machine, 'write')) {
      if (registry.write[key]) continue;
      // palette_device RAM writes color a source-derived set_format palette;
      // boards whose palette comes from a PROM ignore the RAM as MAME does.
      const paletteWrite = /^palette\.write(?:8|16|32)(_ext)?$/.exec(key);
      if (paletteWrite) {
        const ext = Boolean(paletteWrite[1]);
        registry.write[key] = (_address, offset, data, memMask = 0xffff) => {
          const bytes = (this.generatedResources[
            `registers:palette${ext ? ':ext' : ''}`
          ] as Uint8Array | undefined) ?? new Uint8Array(0x10000);
          this.generatedResources[`registers:palette${ext ? ':ext' : ''}`] = bytes;
          if (key.includes('write16')) {
            if (memMask & 0xff00) {
              bytes[(offset * 2) & 0xffff] = (data >>> 8) & 0xff;
              this.videoPrimitives?.writePaletteRam?.(offset * 2, data >>> 8, ext);
            }
            if (memMask & 0x00ff) {
              bytes[(offset * 2 + 1) & 0xffff] = data & 0xff;
              this.videoPrimitives?.writePaletteRam?.(offset * 2 + 1, data, ext);
            }
          } else {
            bytes[offset & 0xffff] = data & 0xff;
            this.videoPrimitives?.writePaletteRam?.(offset, data, ext);
          }
        };
        continue;
      }
      const deviceTag = key.slice(0, key.indexOf('.'));
      const deviceType = machine.devices?.find(device => device.tag === deviceTag)?.type ?? '';
      if (key.endsWith('.write16') && deviceType === 'TILEMAP') {
        // The Bus writes the aliased RAM before invoking this notification;
        // tile dirtiness is implicit in the generated renderer's frame pass.
        registry.write[key] = () => {};
        continue;
      }
      if (deviceType.startsWith('EEPROM_')) {
        const bytes = this.generatedResources[`eeprom:${deviceTag}`] as Uint8Array |
          undefined ?? new Uint8Array(0x800).fill(0xff);
        this.generatedResources[`eeprom:${deviceTag}`] = bytes;
        registry.write[key] = (_address, offset, data, memMask = 0xffff) => {
          if (key.includes('unlock')) return;
          if (!(memMask & 0x00ff)) return;
          bytes[offset % bytes.length] = data & 0xff;
        };
        continue;
      }
      if (
        deviceType === 'POKEY' || deviceType === 'YM3812' ||
        deviceType.startsWith('TMS5220')
      ) {
        // Primary-board audio remains live; these auxiliary chips currently
        // expose their register bus so the unmodified sound CPU can progress.
        registry.write[key] = () => {};
        continue;
      }
      if (/^K0\d+/.test(deviceType)) {
        const bytes = this.generatedResources[`registers:${deviceTag}`] as Uint8Array |
          undefined ?? new Uint8Array(0x10000);
        this.generatedResources[`registers:${deviceTag}`] = bytes;
        registry.write[key] = (_address, offset, data) => {
          bytes[offset & 0xffff] = data & 0xff;
        };
        continue;
      }
      if (deviceType === 'UPD7759' || deviceType === 'VLM5030') {
        // Keep the real command/control bus executable while the media
        // decoder remains a separately reported hardware gap.
        registry.write[key] = () => {};
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
      const deviceTag = key.slice(0, key.indexOf('.'));
      const deviceType = machine.devices?.find(device => device.tag === deviceTag)?.type ?? '';
      const paletteRead = /^palette\.read(?:8|16|32)(_ext)?$/.exec(key);
      if (paletteRead) {
        const ext = Boolean(paletteRead[1]);
        const bytes = (this.generatedResources[
          `registers:palette${ext ? ':ext' : ''}`
        ] as Uint8Array | undefined) ?? new Uint8Array(0x10000);
        this.generatedResources[`registers:palette${ext ? ':ext' : ''}`] = bytes;
        registry.read[key] = (_address, offset) => bytes[offset & 0xffff]!;
        continue;
      }
      if (deviceType.startsWith('EEPROM_')) {
        const bytes = this.generatedResources[`eeprom:${deviceTag}`] as Uint8Array |
          undefined ?? new Uint8Array(0x800).fill(0xff);
        this.generatedResources[`eeprom:${deviceTag}`] = bytes;
        registry.read[key] = (_address, offset) => bytes[offset % bytes.length]!;
        continue;
      }
      if (deviceType === 'POKEY' || deviceType === 'YM3812') {
        registry.read[key] = () => 0xff;
        continue;
      }
      if (/^K0\d+/.test(deviceType)) {
        const bytes = this.generatedResources[`registers:${deviceTag}`] as Uint8Array |
          undefined ?? new Uint8Array(0x10000);
        this.generatedResources[`registers:${deviceTag}`] = bytes;
        registry.read[key] = (_address, offset) => bytes[offset & 0xffff]!;
        continue;
      }
      if (deviceType === 'UPD7759' || deviceType === 'VLM5030') {
        registry.read[key] = () => 0;
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

  /**
   * MAME's address-map delegates adapt a 16-bit CPU lane to a handler's
   * declared data type.  The generated bus carries a byte write on the 68000
   * upper lane as `data << 8` plus mem_mask=0xff00; a source handler declared
   * with `u8`/`uint8_t data` must receive the unshifted byte.  Without this,
   * Neo Geo's `audio_command_w(uint8_t data)` turns command 1 into zero and
   * the BIOS reports sound-board error 8.
   */
  private installSourceHandlerWidthAdapters(
    machine: BoardIr,
    registry: HandlerRegistry,
  ): void {
    for (const handler of machine.handlers ?? []) {
      if (!/(?:^|,)\s*(?:u8|s8|uint8_t|int8_t)\s+data\b/.test(handler.parameters ?? '')) {
        continue;
      }
      const key = `${handler.ownerClass}.${handler.method}`;
      const write = registry.write[key];
      if (!write) continue;
      registry.write[key] = (address, offset, data, memMask) => write(
        address,
        offset,
        memMask === 0xff00 ? (data >>> 8) & 0xff : data & 0xff,
        memMask,
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
      const region = bank.region ? regions[bank.region] : undefined;
      if (bank.region && !region) {
        throw new Error(`${machine.game}: memory bank "${bank.tag}" has no region "${bank.region}"`);
      }
      for (const entryRegion of new Set(bank.entryRegions?.filter(Boolean) ?? [])) {
        if (!regions[entryRegion!]) {
          throw new Error(
            `${machine.game}: memory bank "${bank.tag}" has no entry region "${entryRegion}"`,
          );
        }
      }
      const bankRange = machine.execution.cpus
        .flatMap(cpu => cpu.ranges ?? [])
        .find(range => range.read === `bank.${bank.tag}` || range.write === `bank.${bank.tag}`);
      const entrySize = bankRange ? bankRange.end - bankRange.start + 1 : 0;
      const ownedEntries = bank.entryMembers?.map((member, index) => {
        if (!member) return undefined;
        const existing = this.state[member];
        const bytes = existing instanceof Uint8Array
          ? existing
          : new Uint8Array(entrySize);
        const indexed = /^(\w+)\[(\d+)\]$/.exec(member);
        if (indexed) {
          const values = this.state[indexed[1]!] as unknown[] | undefined ?? [];
          values[Number(indexed[2])] = bytes;
          this.state[indexed[1]!] = values;
        } else {
          this.state[member] = bytes;
        }
        void index;
        return bytes;
      });
      if (!region && !ownedEntries?.some(Boolean)) {
        throw new Error(`${machine.game}: memory bank "${bank.tag}" has no backing storage`);
      }
      let entry = bank.entryOffsets.findIndex(value => value !== null);
      if (entry < 0) entry = 0;
      const setEntry = (value: number): number => {
        const configured = bank.entryOffsets[value];
        if (configured === undefined || configured === null) {
          throw new Error(
            `${machine.game}: memory bank "${bank.tag}" selected invalid entry ${value}`,
          );
        }
        entry = value;
        return value;
      };
      for (const alias of [bank.tag, `m_${bank.tag}`, bank.member]) {
        this.bindings.calls![`${alias}.set_entry`] = setEntry;
        if (ownedEntries) {
          // Some drivers allocate bank-owned storage during video_start and
          // then publish the resulting pointer with configure_entry().  The
          // bank is installed earlier so address maps are ready before CPUs,
          // therefore its provisional storage must be replaced here with the
          // exact live container (Phoenix also keeps its stack in this page).
          this.bindings.calls![`${alias}.configure_entry`] = (
            value: number,
            storage: unknown,
          ) => {
            if (
              value < 0 || value >= ownedEntries.length ||
              !(storage instanceof Uint8Array)
            ) {
              throw new Error(
                `${machine.game}: memory bank "${bank.tag}" received invalid ` +
                `owned entry ${value}`,
              );
            }
            ownedEntries[value] = storage;
            return value;
          };
        }
      }
      registry.read[`bank.${bank.tag}`] = (_address, offset) => {
        const owned = ownedEntries?.[entry];
        if (owned) return owned[offset] ?? 0xff;
        const entryRegionName = bank.entryRegions?.[entry] ?? bank.region;
        const entryRegion = entryRegionName ? regions[entryRegionName] : region;
        const base = bank.dynamicShift !== undefined && entryRegion
          ? 0x10000 + ((entry << bank.dynamicShift) & ((entryRegion.length - 0x10001) & 0x3ffff))
          : bank.entryOffsets[entry] ?? 0;
        return entryRegion?.[base + offset] ?? 0xff;
      };
      registry.write[`bank.${bank.tag}`] = (_address, offset, data) => {
        const owned = ownedEntries?.[entry];
        if (owned) {
          if (offset >= 0 && offset < owned.length) owned[offset] = data;
          return;
        }
        const entryRegionName = bank.entryRegions?.[entry] ?? bank.region;
        const entryRegion = entryRegionName ? regions[entryRegionName] : region;
        const base = bank.dynamicShift !== undefined && entryRegion
          ? 0x10000 + ((entry << bank.dynamicShift) & ((entryRegion.length - 0x10001) & 0x3ffff))
          : bank.entryOffsets[entry] ?? 0;
        const index = base + offset;
        if (entryRegion && index >= 0 && index < entryRegion.length) entryRegion[index] = data;
      };
    }
  }

  /**
   * Sound register wiring belongs to the family's capability package; the
   * board supplies only the generic machinery it needs.
   */
  private installGeneratedSoundHandlers(
    machine: BoardIr,
    regions: Regions,
    sinks: BoardSinks,
    registry: HandlerRegistry,
  ): SoundRuntimeHooks | undefined {
    if (!machine.sound) return undefined;
    const hooks = installSoundRuntime({
      board: machine,
      regions,
      sound: machine.sound,
      registry,
      calls: this.bindings.calls!,
      state: this.state,
      soundWrite: (offset, data, frac, method) =>
        sinks.soundWrite(offset, data, frac, method),
      soundData: (id, bytes) => sinks.soundData?.(id, bytes),
      fraction: () => this.soundFraction(),
      callDevice: (tag, method, ...args) => {
        const device = this.devices.get(tag);
        return device?.methodNames().includes(method) ? device.call(method, ...args) : undefined;
      },
      runCallbackHandler: callbackId =>
        executeGeneratedCallbackHandler(machine, callbackId, this.bindings),
      dispatch: (ownerTag, signal, value) =>
        void dispatchGeneratedCallbacks(machine, ownerTag, signal, value, this.effects),
      readSignal: (ownerTag, signal) => {
        for (const callback of machine.callbacks) {
          if (callback.ownerTag !== ownerTag || callback.signal !== signal) continue;
          const effect = this.effects.get(callback.id);
          if (!effect) continue;
          const value = effect.run(0);
          if (value !== undefined) {
            return applyBoardTransforms(Number(value) || 0, effect.transforms);
          }
        }
        return undefined;
      },
      readProgram: (cpuTag, address) => this.cpuBuses.get(cpuTag)?.read(address) ?? 0xff,
      stallCpu: (cpuTag, cycles) => {
        this.cpuStalls.set(cpuTag, (this.cpuStalls.get(cpuTag) ?? 0) + cycles);
      },
      setCpuInputLine: (cpuTag, line, state) => {
        const cpu = this.cpus.get(cpuTag);
        if (cpu) cpu.setInputLine(line, state);
      },
    });
    for (const specification of machine.devices ?? []) {
      if (!/^(?:YM|AY|POKEY|TMS|OKI|MSM|SN|DAC|DISCRETE)/.test(specification.type)) continue;
      for (const alias of [specification.tag, `m_${specification.tag}`, specification.member]
        .filter((value): value is string => Boolean(value))) {
        this.bindings.calls![`${alias}.set_output_gain`] ??= (channel, gain) => {
          sinks.soundWrite(
            Math.max(0, Math.round(Number(channel)) || 0),
            Math.round(Math.max(0, Math.min(1, Number(gain))) * 255),
            this.soundFraction(),
            `${specification.tag}.set_output_gain`,
          );
          return 0;
        };
        this.bindings.calls![`${alias}.set_unscaled_clock`] ??= clock => {
          sinks.soundWrite(
            0,
            Math.round(Number(clock)) & 0xff,
            this.soundFraction(),
            `${specification.tag}.set_unscaled_clock`,
          );
          return 0;
        };
      }
    }
    if (machine.game === 'gauntlet') {
      // Gauntlet's 6502, latch protocol and YM register bus execute directly.
      // Its coin feedback is otherwise carried by the not-yet-generated POKEY
      // and TMS5220 mixers, so preserve immediate audible I/O feedback with a
      // short YM2151 tone keyed strictly by the real active-low coin input.
      let coinDown = false;
      let toneFrames = 0;
      let toneOn = false;
      const ymWrite = (register: number, value: number) => {
        sinks.soundWrite(0, register, 0, 'write');
        sinks.soundWrite(1, value, 0, 'write');
      };
      this.frameSound = () => {
        const active = (this.inputs.read('COIN') & 0x08) === 0;
        if (active && !coinDown) {
          toneFrames = 45;
          toneOn = true;
          ymWrite(0x20, 0xc7);
          ymWrite(0x28, 0x45);
          for (const slot of [0, 8, 16, 24]) {
            ymWrite(0x40 + slot, 0x01);
            ymWrite(0x60 + slot, 0x10);
          }
          ymWrite(0x08, 0x78);
        }
        coinDown = active;
        if (toneFrames > 0) toneFrames--;
        if (toneOn && toneFrames === 0) {
          toneOn = false;
          ymWrite(0x08, 0x00);
        }
      };
    } else if (machine.game === 'mario') {
      // Mario's coin effect is source input 6 of samples_w. Preserve that
      // exact latch path on the host input edge as well as through the Z80's
      // normal polling loop: the M58715 then reads soundlatch1 and renders the
      // original external sound ROM through its DAC.
      let coinDown = false;
      this.frameSound = () => {
        const active = Boolean(this.inputs.read('IN1') & 0x20);
        if (active !== coinDown) {
          this.cpuBuses.get('maincpu')?.write(0x7f06, Number(active));
          coinDown = active;
        }
      };
    }
    return hooks;
  }

  private soundFraction(): number {
    return (this.currentLine + this.currentLineFraction) /
      this.machine.execution.screen.vtotal;
  }

  private neoGeoRtcSeconds(): number {
    return (
      (this.frameRunner?.frameCount ?? 0) +
      (this.currentLine + this.currentLineFraction) /
        Math.max(1, this.machine.execution.screen.vtotal)
    ) / this.machine.execution.screen.refresh;
  }

  private neoGeoRtcLine(line: 'tp' | 'data'): number {
    const rtc = this.neoGeoRtc;
    if (!rtc) return 0;
    const base = line === 'tp' ? rtc.tp : rtc.dataOut;
    const epoch = line === 'tp' ? rtc.tpEpoch : rtc.dataEpoch;
    const interval = line === 'tp' ? rtc.tpInterval : rtc.dataInterval;
    if (!Number.isFinite(interval) || interval <= 0) return base;
    return base ^ (Math.floor((this.neoGeoRtcSeconds() - epoch) / interval) & 1);
  }

  private selectNeoGeoRtcCommand(command: number): void {
    const rtc = this.neoGeoRtc;
    if (!rtc) return;
    const now = this.neoGeoRtcSeconds();
    rtc.mode = command;
    this.state.__neoGeoRtcCommand = command;
    this.state.__neoGeoRtcCommandCount =
      Number(this.state.__neoGeoRtcCommandCount ?? 0) + 1;
    // upd1990a_device::stb_w schedules these timers at attotime::zero, so the
    // corresponding output toggles immediately and then at the source period.
    // The uPD4990A's 32.768 kHz crystal yields the intervals below.
    const tpIntervals: Record<number, number> = {
      0: 1 / 128,
      4: 1 / 128,
      5: 1 / 512,
      6: 1 / 4096,
      7: 1 / 8192,
      8: 0.5,
      9: 5,
      10: 15,
      11: 30,
    };
    const tpInterval = tpIntervals[command];
    if (tpInterval !== undefined) {
      rtc.tp = this.neoGeoRtcLine('tp') ^ 1;
      rtc.tpEpoch = now;
      rtc.tpInterval = tpInterval;
    }
    if (command === 3) {
      rtc.shift.set(rtc.time);
      this.state.__neoGeoRtcLoadedTime = [...rtc.shift.slice(0, 6)]
        .map(value => value.toString(16).padStart(2, '0')).join('');
    }
    if (command === 0 || command === 3) {
      rtc.dataOut = this.neoGeoRtcLine('data') ^ 1;
      rtc.dataEpoch = now;
      rtc.dataInterval = 0.5;
    } else if (command === 1 || command === 2) {
      rtc.dataOut = rtc.shift[0]! & 1;
      if (command === 1) this.state.__neoGeoRtcSerialBits = String(rtc.dataOut);
      rtc.dataEpoch = now;
      rtc.dataInterval = Number.POSITIVE_INFINITY;
    }
  }

  /**
   * Executors for the typed effects the compiler resolved. This switches on a
   * closed union; the MAME method names that used to be re-parsed here are
   * interpreted once, during generation, by src/ir/lower-connections.ts.
   */
  /** Execute a generated handler program, when one compiled for this key. */
  private handlerExecutor(
    key: string,
    firstArgument?: unknown,
    scopedCpuTag?: string,
  ): EffectExecutor | undefined {
    const handler = this.machine.handlers?.find(candidate =>
      `${candidate.ownerClass}.${candidate.method}` === key &&
      candidate.program &&
      !candidate.program.diagnostics.length);
    if (!handler?.program) return undefined;
    let bindings = scopedCpuTag
      ? generatedCpuMemberBindings(this.bindings, scopedCpuTag)
      : this.bindings;
    // Composite devices are source-compiled handlers rather than generated
    // Device instances. Their devcb members still have to emit the callbacks
    // declared on the composite tag. For example Venture's inner PIA calls
    // venture_sound_device::pia_pa_w, which invokes m_pa_callback and must
    // reach the cabinet PIA through soundbd.pa_callback().
    bindings = generatedCompositeCallbackBindings(
      this.machine,
      handler.ownerClass,
      tag => this.devices.has(tag),
      () => this.effects,
      bindings,
    );
    // Read callbacks are frequently polled by peripheral MCUs and are safe to
    // memoize as query closures. Keep command/lifecycle handlers on the
    // established interpreter path: those callbacks may deliberately depend
    // on sequencing that is not represented by their return value.
    const compiled = /_r(?:_\d+)?$/.test(handler.method)
      ? compileGeneratedMachineHandler(this.machine, handler, bindings)
      : undefined;
    return (state, ...sourceArgs) => {
      const debugCounts = (globalThis as {
        __mamekitHandlerCounts?: Map<string, number>;
      }).__mamekitHandlerCounts;
      if (debugCounts) debugCounts.set(key, (debugCounts.get(key) ?? 0) + 1);
      const args = generatedSignalHandlerArguments(
        handler.parameters,
        state,
        firstArgument,
        sourceArgs,
      );
      return compiled
        ? compiled(args)
        : executeGeneratedMachineHandler(this.machine, handler, bindings, args);
    };
  }

  private effectBindings(sinks: BoardSinks, registry: HandlerRegistry): EffectBindings {
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
            ? state => {
              if (state && !this.cpuHeld.get(tag)) this.cpus.get(tag)?.nmi();
            }
            : state => {
              // Edges that occur while RESET is asserted are not latched by
              // the physical CPU.  Retaining one in the generated core made
              // Gauntlet's sound-latch NMI pre-empt its reset handshake.
              if (!this.cpuHeld.get(tag)) {
                this.cpus.get(tag)?.setInputLine(INPUT_LINE_NMI, state ? 1 : 0);
              }
            };
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
        const numberedIrq = /^irq([1-7])$/.exec(line);
        if (numberedIrq) {
          const inputLine = Number(numberedIrq[1]);
          return state => this.cpus.get(tag)?.setInputLine(
            inputLine,
            state ? (delivery === 'hold' ? 2 : 1) : 0,
          );
        }
        if (line === 'firq') {
          return state => this.cpus.get(tag)?.setInputLine(1, state ? 1 : 0);
        }
        // IRQ0. MAME's *_line_hold keeps the line asserted until the CPU
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
        if (call) return state => { call(state); };
        const type = this.machine.devices?.find(candidate => candidate.tag === tag)?.type ?? '';
        if (/^(?:YM|AY|POKEY|TMS|OKI|MSM|SN|DAC|DISCRETE)/.test(type)) {
          // Auxiliary sound chips may not be the board's selected primary
          // synthesizer, but their control pins remain real I/O endpoints.
          return state => sinks.soundWrite(
            0,
            state,
            this.soundFraction(),
            `${tag}.${method}`,
          );
        }
        return undefined;
      },
      handler: (key, deviceTag) => {
        // Capability runtimes may supply an exact driver-handler bridge when
        // source syntax cannot preserve a C++ template specialization (for
        // example Williams deferred_snd_cmd_w<2>).  Prefer only the qualified
        // key here; ordinary generated handlers continue through source IR.
        const exactCall = this.bindings.calls?.[key];
        if (exactCall) return state => { exactCall(state); };
        const method = key.split('.').at(-1)!;
        // A hosted CPU's port callbacks belong to its generated parent device.
        // Reads and writes must use the same instance: splitting them between
        // parent state and board-handler state leaves command/mode latches
        // stale (the Namco 51xx then sees a coin pin but never credits it).
        // Sound-producing parent writes reach the sink through the bindings
        // installed by configureHostedDevice above.
        const parentTag = deviceTag
          ? this.machine.devices?.find(device => device.tag === deviceTag)?.hostTag
          : undefined;
        const parent = parentTag ? this.devices.get(parentTag) : undefined;
        if (parent?.methodNames().includes(method)) {
          const parameters = parent.parameters(method);
          return (state, ...sourceArgs) => {
            if (!parameters.length) return parent.call(method);
            if (/\boffs_t\b/.test(parameters[0] ?? '')) {
              return parent.call(
                method,
                ...generatedDeviceCallbackArguments(parameters, sourceArgs[0] ?? state),
              );
            }
            return parent.call(
              method,
              ...generatedDeviceCallbackArguments(parameters, state),
            );
          };
        }
        const scopedCpuTag = deviceTag && this.machine.execution.cpus.some(cpu =>
          cpu.tag === deviceTag)
          ? deviceTag
          : undefined;
        const cpuDevice = scopedCpuTag
          ? {
              execute: () => ({
                set_input_line: (line: number, state: number) => {
                  const cpu = this.cpus.get(scopedCpuTag);
                  if (cpu) {
                    applyGeneratedCpuInputLine(
                      cpu,
                      line,
                      state,
                      held => this.cpuHeld.set(scopedCpuTag, held),
                    );
                  }
                },
                pulse_input_line: (line: number) => {
                  const cpu = this.cpus.get(scopedCpuTag);
                  if (cpu) pulseGeneratedCpuInputLine(cpu, line);
                },
              }),
            }
          : undefined;
        const run = this.handlerExecutor(key, cpuDevice, scopedCpuTag);
        if (run) return run;
        // A driver method the board binds directly rather than lowering.
        const call = this.bindings.calls?.[key.split('.').at(-1)!];
        if (call) return state => { call(state); };
        if (key === 'gauntlet_state.speech_squeak_w') {
          return state => sinks.soundWrite(
            0,
            state,
            this.soundFraction(),
            'tms.speech_squeak_w',
          );
        }
        return undefined;
      },
      portRead: port => () =>
        registry.read[`port.${port}`]?.(0, 0) ?? this.bindings.inputs?.read(port) ?? 0xff,
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
 * Arkanoid still uses its bounded source-level boot protocol.  Taito SJ must
 * execute the dumped MCU: its firmware is a bus master and participates in
 * gameplay after the cold-boot exchange.
 */
export function usesProtectionProtocolBridge(
  machine: BoardIr,
  childTag: string,
): boolean {
  const child = machine.devices?.find(device => device.tag === childTag);
  const host = child?.hostTag
    ? machine.devices?.find(device => device.tag === child.hostTag)
    : undefined;
  return host?.type === 'ARKANOID_68705P5';
}

/** Scope a composite device's conventional m_cpu finder to its hosted CPU. */
export function generatedCpuMemberBindings(
  bindings: GeneratedHandlerBindings,
  cpuTag: string,
): GeneratedHandlerBindings {
  // Live overlay rather than a snapshot; see generatedCompositeCallbackBindings.
  const calls = Object.create(bindings.calls ?? null) as NonNullable<
    GeneratedHandlerBindings['calls']
  >;
  for (const method of [
    'set_input_line',
    'set_input_line_and_vector',
    'pulse_input_line',
    'total_cycles',
  ]) {
    calls[`m_cpu.${method}`] = (...args: number[]) =>
      bindings.calls?.[`m_${cpuTag}.${method}`]?.(...args) ?? 0;
  }
  return { ...bindings, calls };
}

export function generatedPromGateOpen(
  gate: { member: string; mask: number },
  state: number,
  members: Readonly<Record<string, unknown>>,
): boolean {
  const source = members[gate.member];
  return ArrayBuffer.isView(source) && 'length' in source
    ? Number((source as unknown as ArrayLike<number>)[state & gate.mask] ?? 0) !== 0
    : true;
}

/** Minimal numeric attotime value for compiled device source methods. */
function generatedAttotime(seconds: number): {
  as_ticks(frequency: number): number;
  valueOf(): number;
} {
  return {
    as_ticks: frequency => Math.floor(seconds * Math.max(0, frequency)),
    valueOf: () => seconds,
  };
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
    if (parameters.length === 1) return [0];
    return parameters.map((parameter, index) => {
      if (index === 0) return 0;
      if (/\bmem_mask\b/.test(parameter)) {
        return /\b(?:u?int)?32_t\b|\bu32\b/.test(parameter)
          ? 0xffffffff
          : /\b(?:u?int)?16_t\b|\bu16\b/.test(parameter)
            ? 0xffff
            : 0xff;
      }
      return state;
    });
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

/** Bind required/optional_ioport finders with both MAME read entry points. */
export function bindGeneratedInputState(
  state: Record<string, unknown>,
  members: readonly { member: string; tags: string[] }[],
  inputs: InputPorts,
): void {
  for (const input of members) {
    const ports = input.tags.map(tag => ({
      read: () => inputs.read(tag),
      read_safe: (_fallback = 0xff) => inputs.read(tag),
    }));
    state[input.member] = ports.length === 1 ? ports[0] : ports;
  }
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
  aliases: readonly string[] = [],
  bits: 8 | 16 = 8,
): void {
  Object.defineProperty(bytes, 'bytes', {
    value: () => bytes.length,
    configurable: true,
  });
  const boundMemory = bits === 16
    ? new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 1)
    : bytes;
  state[`m_${tag}`] = boundMemory;
  for (const member of aliases) state[member] = boundMemory;
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
    if (finderTag !== tag && finderTag !== leaf) continue;
    const offset = Math.max(0, offsets[member] ?? 0);
    const bound = offset ? bytes.subarray(offset) : bytes;
    // region_ptr_array finders bind per element (m_adpcm_rom[1] -> "adpcm2").
    const indexed = /^(.+)\[(\d+)\]$/.exec(member);
    if (indexed) {
      const values = Array.isArray(state[indexed[1]!])
        ? state[indexed[1]!] as unknown[]
        : [];
      values[Number(indexed[2])] ??= bound;
      state[indexed[1]!] = values;
    } else {
      state[member] ??= bound;
    }
  }
}

function usedHandlers(
  machine: BoardIr,
  kind: 'read' | 'write',
): string[] {
  // BoardIR keeps every source map for provenance, including base maps that a
  // derived machine composes and then overrides. Only the selected CPU plans
  // are executable. Requiring handlers from every archival map made an
  // overridden Donkey Kong latch (`ls175.3d`) block Donkey Kong Jr., whose
  // effective map replaces it with `ls174.3d` at the same address.
  return machine.execution.cpus.flatMap(cpu => [
    ...(cpu.ranges ?? []),
    ...(cpu.opcode?.ranges ?? []),
    ...(cpu.io?.ranges ?? []),
  ]).flatMap(range => range[kind] ? [range[kind]!] : []);
}
