import { boardConfigFromIr } from '../ir/host-config.ts';
import { generatedMachine } from './generated-machine.ts';
import { Bus, byteAddress, type HandlerRegistry, type InstalledRange, type ReadHandler, type WriteHandler } from './bus.ts';
import { installedOffset, RecordingAddressSpace, type InstalledDelegate, type InstalledEntry, type InstalledView } from './address-space-install.ts';
import type { Cpu, CpuBus } from './generated-cpu.ts';
import { DeviceCpu } from './device-cpu.ts';
import { captureState, namedStateFunction, restoreState, stateValue, type WalkOptions } from './machine-state.ts';
import {
  beginGeneratedTimerDelivery,
  endGeneratedTimerDelivery,
  createDevice,
  createGeneratedAttotime,
  generatedInstanceFactories,
  generatedTimerBacklog,
  generatedTimerExpiry,
  generatedTimerExactExpiry,
  EXACT_TIMER_TOLERANCE_SECONDS,
  withGeneratedTimerExpiry,
  setGeneratedTimerArmed,
  setGeneratedTimerArmBase,
  setGeneratedTimerArmLead,
  setGeneratedTimerArmExact,
  withGeneratedTimerHeadroom,
  setGeneratedTimerPreFire,
  hasGeneratedDevice,
  generatedDeviceKey,
  generatedDeviceDefinition,
  generatedDeviceRole,
  loadSlotCard,
  memoryRegionObject,
  slotCardForImage,
  withExclusiveTimerDelivery,
  withGeneratedPresentTime,
  type Device,
  type GeneratedMemoryBank,
} from './generated-device.ts';
import type { GeneratedCallArgument } from '../ir/execute.ts';
import { attotimeSecondsFromTicks, ExactAttotime, exactFromAttos, exactToAttos } from '../ir/exact-attotime.ts';
import { callLinksGeneration, DEFAULT_CONSTANTS, GENERATED_STRUCT, generatedVector, noteCallLinksChanged, noteUnresolvedCall, resizableBuffer, prepareGeneratedMachinePositional, resizeGeneratedContainer } from '../ir/execute.ts';
import { walkOperations, walkExpressions } from '../ir/walk.ts';
import { GeneratedFrameRunner, screenPeriods } from './generated-frame.ts';
import {
  GeneratedMameVideoPrimitives,
  GeneratedVideoRenderer,
  type DeviceScreenUpdate,
} from './generated-video.ts';
import {
  compileGeneratedMachineHandler,
  dispatchGeneratedCallback,
  dispatchGeneratedCallbacks,
  executeGeneratedCallbackHandler,
  executeGeneratedMachineDelegate,
  executeGeneratedMachineHandler,
  generatedReferent,
  prepareGeneratedMachineHandler,
  generatedHandlerRegistry,
  installedHandlerEntry,
  wireGeneratedDevice,
  type GeneratedHandlerBindings,
} from './generated-handler.ts';
import {
  HOST_INPUT_LINES,
  HOST_SERVICE_CALLS,
  type BoardEffect,
  type BoardIr,
  type CpuLine,
  type CpuLineDelivery,
  type GeneratedExecutionCpu,
  type GeneratedHandler,
  type GeneratedStateMember,
  type RangeSpec,
} from '../ir/board.ts';
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
import type { GeneratedSampleWindow } from '../ir/audio-protocol.ts';
import type {
  Board,
  BoardConfig,
  BoardSinks,
  BoardSnapshot,
  MachineState,
  MemoryAccess,
  InputPorts,
  PersistentMemory,
  BatteryImage,
  Regions,
} from './types.ts';
import {
} from './generated-board-shape.ts';
import { hasDeviceType } from './generated-source-shape.ts';
import { GeneratedRectangle, isEncodedRectangle } from './rectangle.ts';
import { presentVectorDisplay } from './vector-display.ts';

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

/**
 * Load the cards a machine's slots will hold, before it is built.
 *
 * A slot whose cards ship as modules of their own (the NES cartridge slot's
 * 390 boards) has none in hand until asked. The card is the one the machine
 * would select: the host's slot card, else the one the slot's own
 * get_default_card_software picks for the image it is booted with, else the
 * slot's default. An option whose card did not compile loads nothing, and the
 * slot is built empty as MAME builds an unknown one.
 */
export async function loadBoardSlotCards(config: BoardConfig): Promise<void> {
  if (!config.game) return;
  for (const device of generatedMachine(config.game).devices ?? []) {
    const definition = generatedDeviceDefinition(device.type);
    if (!definition?.slot?.cards) continue;
    const image = config.images?.[device.tag];
    const option = config.slotCards?.[device.tag]
      ?? (image ? slotCardForImage(device.type, image) : undefined)
      ?? device.slotDefault
      ?? definition.slot.default;
    if (option) await loadSlotCard(definition, option);
  }
}

/**
 * Whether a device's `device_start` reads what the board only binds after
 * composition. MAME binds every devcb at configuration and creates a device's
 * tilemaps in its own start, so both exist by then: LATCH8 sets `m_has_write`
 * from `isunset()` on each write callback, and started before the board wired
 * them it never forwarded a write; Lady Bug's video device creates its
 * background tilemap there and sets its scroll rows.
 */
function startReadsHostBindings(type: string): boolean {
  const definition = generatedDeviceDefinition(type);
  const start = definition?.methods.find(method => method.name === (definition.start ?? 'device_start'));
  if (!start) return false;
  let reads = false;
  walkExpressions(start.program.operations, expression => {
    if (expression.kind !== 'call' || expression.callee.kind !== 'member') return;
    const { object, property } = expression.callee;
    if (property === 'isunset') reads = true;
    if (property === 'create' && object.kind === 'call' && object.callee.kind === 'member' &&
      object.callee.property === 'tilemap') reads = true;
    // `if (!palette().device().started()) throw device_missing_dependencies();`
    // is MAME starting the device after its palette: the K053246 decodes its
    // sprite ROM against the palette's entry count.
    if (property === 'started') reads = true;
    // A decoded graphics set read through the board's gfxdecode finder:
    // atari_motion_objects_device::device_start checks `m_gfxdecode->gfx(n)`.
    if (property === 'gfx') reads = true;
  });
  // And one that builds its own graphics set reads the palette the video
  // composes, through device_gfx_interface.
  walkExpressions(start.program.operations, expression => {
    if (expression.kind === 'call' && expression.callee.kind === 'identifier' &&
      ['gfx', 'set_gfx'].includes(expression.callee.name)) reads = true;
  });
  return reads;
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
      // A read callback's argument is the offset it asks for (the APU's DMC
      // address), which a space read takes and a port read ignores.
      return reads
        ? applyBoardTransforms(Number(effect.run(0, value)) || 0, effect.transforms)
        : (effect.run(applyBoardTransforms(value, effect.transforms)), 0);
    };
    calls[`m_${callback.signal}`] ??= emit;
    calls[callback.signal] ??= emit;
    // MAME need not name the devcb member after its accessor; when it does
    // not, the IR carries the real member and the device's own handlers call
    // it by that name. A device_delegate is not a devcb -- the owning device
    // calls it directly, with the callee's own parameters -- so it is bound
    // where the delegates are, and must not be shadowed by an effect here.
    if (callback.member && !callback.delegate) calls[callback.member] ??= emit;
  }
  return { ...bindings, calls };
}

/**
 * Hardware-neutral composition host for generated machine, CPU and device IR.
 * Missing generated hardware is an error; composition only executes emitted
 * CPU, device, handler, callback and scheduling definitions.
 */
/**
 * Test-only: a stand-in for a processor slot, so a board spec can drive the
 * scheduler's bus hooks (`timing`, `parked`, `signal`) directly. Production
 * never passes one -- every CPU is its MAME class compiled whole, hosted by
 * DeviceCpu.
 */
export interface BoardProcessorFixture {
  processor(type: string, bus: CpuBus): Cpu | undefined;
}

export function createGeneratedBoard(
  machine: BoardIr,
  config: BoardConfig,
  regions: Regions,
  inputs: InputPorts,
  sinks: BoardSinks,
  fixture?: BoardProcessorFixture,
): Board {
  const configured = withSlotCards(withEmptySlots(machine, config.emptySlots), config.slotCards);
  return new IrBoard(configured, boardConfigFromIr(configured, config), regions, inputs, sinks, fixture);
}

/** A device's source-allocated storage as it stands at power-on. */
function allocatedMemory(allocation: { bytes: number; fill: number; runs?: [number, number][] }): Uint8Array {
  const memory = new Uint8Array(allocation.bytes).fill(allocation.fill);
  let offset = 0;
  for (const [value, count] of allocation.runs ?? []) {
    memory.fill(value, offset, offset + count);
    offset += count;
  }
  return memory;
}

/**
 * The machine with these slots left empty, as MAME's `-iec8 ""` builds it.
 * The slot device stays and selects no card; everything the card composed --
 * its devices, its processor, the devcb wiring between them and the
 * connections that wiring drives -- is not part of the machine. MAME tags
 * every device inside a card under its slot's tag, so a prefix is the whole
 * test. A tag that names no slot device is ignored.
 */
export function withEmptySlots(machine: BoardIr, slots: readonly string[] | undefined): BoardIr {
  const emptied = new Set((slots ?? []).filter(slot =>
    machine.devices?.some(device => device.tag === slot && device.slotDefault !== undefined)));
  if (!emptied.size) return machine;
  const inCard = (tag: string | undefined): boolean =>
    tag !== undefined && [...emptied].some(slot => tag.startsWith(`${slot}:`));
  const removed = new Set(machine.callbacks
    .filter(callback => inCard(callback.ownerTag) || inCard(callback.targetTag))
    .map(callback => callback.id));
  const effectInCard = (effect: BoardEffect): boolean =>
    ('tag' in effect && inCard(effect.tag)) || ('deviceTag' in effect && inCard(effect.deviceTag));
  const execution = machine.execution;
  return {
    ...machine,
    devices: machine.devices?.filter(device => !inCard(device.tag))
      .map(device => emptied.has(device.tag) ? { ...device, slotDefault: '' } : device),
    callbacks: machine.callbacks.filter(callback => !removed.has(callback.id)),
    connections: machine.connections.filter(connection =>
      !removed.has(connection.callbackId) && !effectInCard(connection.effect)),
    execution: {
      ...execution,
      cpus: execution.cpus.filter(cpu => !inCard(cpu.tag)),
      ...(execution.participants
        ? { participants: execution.participants.filter(participant => !inCard(participant.tag)) }
        : {}),
      ...(execution.genericTimers
        ? { genericTimers: execution.genericTimers.filter(timer => !inCard(timer.tag)) }
        : {}),
      ...(execution.bankDevices
        ? { bankDevices: execution.bankDevices.filter(bank => !inCard(bank.tag)) }
        : {}),
      frameEvents: execution.frameEvents.filter(event =>
        !inCard(event.ownerTag) && !removed.has(event.callbackId)),
    },
  };
}

/**
 * The machine with these slots holding another of their options, as MAME's
 * `-exp intf2` builds it. Only a slot device and an option it offers count; a
 * card the board composes at its own level (a processor or a sound chip) is
 * the default's alone, so a slot holding one keeps it.
 */
export function withSlotCards(machine: BoardIr, cards: Readonly<Record<string, string>> | undefined): BoardIr {
  const chosen = Object.entries(cards ?? {}).filter(([slot]) => machine.devices?.some(device =>
    device.tag === slot && device.slotDefault !== undefined &&
    !machine.devices?.some(other => other.tag.startsWith(`${slot}:`))));
  if (!chosen.length) return machine;
  const selected = new Map(chosen);
  return {
    ...machine,
    devices: machine.devices?.map(device => selected.has(device.tag)
      ? { ...device, slotDefault: selected.get(device.tag)! }
      : device),
  };
}

const { INPUT_LINE_NMI, INPUT_LINE_RESET, INPUT_LINE_HALT } = HOST_INPUT_LINES;
const CLEAR_LINE = 0;
const ASSERT_LINE = 1;
const HOLD_LINE = 2;

/**
 * How far short of the presentation instant held device time stops: well
 * under a cycle of any processor here, well over the rounding in a timer's
 * expiry measured from the beam.
 */
const PRESENT_MARGIN_SECONDS = 1e-9;
/**
 * How far a device timer's countdown may stand from its exact expiry and
 * still be put back on it: the drift of seconds counted down in a double, a
 * few hundred attoseconds a period (#278). Further apart is not drift.
 */
const EXACT_ANCHOR_LIMIT_SECONDS = 1e-9;
/**
 * How far past a round's end a driver timer may stand and still fire there.
 * Its expiry is kept in floating-point seconds on the processors' clock, so
 * the round that ended on it can come out a rounding short of it.
 */
const ROUND_TIMER_SLOP_SECONDS = 1e-9;

/** A Map that counts its changes, so what is derived from it can be kept until it changes. */
class VersionedMap<K, V> extends Map<K, V> {
  version = 0;

  override set(key: K, value: V): this {
    this.version++;
    return super.set(key, value);
  }

  override delete(key: K): boolean {
    this.version++;
    return super.delete(key);
  }

  override clear(): void {
    this.version++;
    super.clear();
  }
}

/** A timer due a rounding error past a whole cycle is due on that cycle. */
const CYCLE_ROUNDING = 1e-6;

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
  // NMI is a level, and the core takes one NMI on each rising edge. Pulsed
  // on every assert, The Simpsons' sound Z80 -- whose NMI the K053260 holds
  // asserted until the Z80 writes $FA00 -- took one every timer tick and
  // never reached the code that plays music. A HOLD_LINE NMI stays a pulse.
  if (line === INPUT_LINE_NMI) {
    if (state === 2) cpu.nmi();
    else cpu.setInputLine(line, state !== 0 ? 1 : 0);
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

/** What a generated call received, unwrapping a reference parameter's l-value. */
/** Value objects a driver's state may hold, rebuilt from a save (machine-state.ts). */
const STATE_FACTORIES = new Map<string, (data: Record<string, unknown>) => object>([
  ['attotime', data => generatedAttotime(Number(data.seconds) || 0)],
  ['device-attotime', data => createGeneratedAttotime(Number(data.seconds) || 0)],
  // An exact device's attotime (src/ir/exact-attotime.ts).
  ['exact-attotime', data => new ExactAttotime(Number(data.secs) || 0, BigInt((data.attos as bigint | number | string | undefined) ?? 0))],
]);

function bytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index++) if (left[index] !== right[index]) return false;
  return true;
}

function generatedCallValue(value: unknown): unknown {
  return value && typeof value === 'object' &&
    typeof (value as { get?: unknown }).get === 'function'
    ? (value as { get(): unknown }).get()
    : value;
}

class IrBoard implements Board {
  fbWidth: number;
  /** The screen's update_now() and pixel(x, y), once the video renderer exists. */
  private screenUpdateNow?: () => void;
  /** screen_device::update_partial(line), once video is composed. */
  private screenUpdatePartial?: (line: number, beam: number) => void;
  private screenPixel?: (x: number, y: number) => number;
  fbHeight: number;
  /** A visible area a device configured this frame, applied when it ends. */
  private pendingScreenArea?: { x: number; y: number; width: number; height: number };

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
  /** Devices whose device_start waits for the board's callbacks and video (startReadsHostBindings). */
  private readonly hostBoundStarts: Device[] = [];
  /** `address_map_bank_device` spaces, by tag: saved with the processors' buses. */
  private readonly bankDeviceBuses = new Map<string, Bus>();
  /** Each RAM device's allocated bytes, for the banks that window them. */
  private readonly deviceAllocations = new Map<string, Uint8Array>();
  /** What a finder holds for each generated device and processor, by tag. */
  private readonly deviceReferents = new Map<string, unknown>();
  /**
   * running_machine::phase(), as devices read it: INIT while the board is
   * built, RESET while it resets, RUNNING otherwise. A device ignores what its
   * neighbours do before then -- the 1541's VIA drives port B to $FF as it
   * resets, and a gate array that took that for a stepper phase started the
   * head a half-track away from where the DOS believes it is.
   */
  private machinePhase = DEFAULT_CONSTANTS['machine_phase::INIT']!;
  /** device_t::m_started for the driver device (see `started` in the call table). */
  private driverStarted = false;
  /** Composed slot cards' own scopes (see cardScope), by card tag. */
  private readonly cardScopes = new Map<string, { instance: Record<string, unknown>; bindings: GeneratedHandlerBindings }>();
  private readonly generatedBanks: Record<string, GeneratedMemoryBank> = {};
  /** MAME address-space taps a mounted cartridge installed over the CPU space. */
  private cartridgeTaps: ((address: number) => void)[] = [];
  /** Views cartridges installed into a CPU's space, for the bus that decodes them. */
  private cartridgeViews: { cpu: string; viewTag: string; view: InstalledView }[] = [];
  /** Keys for delegates driver code installs at run time that name no board handler. */
  private installedHandlerCount = 0;
  /** Device taps on a space whose bus was not built yet (install_readwrite_tap). */
  private pendingSpaceTaps: { cpu: string; tap: (address: number, write: boolean) => void }[] = [];
  /**
   * Cycles the running processor's slice has executed, updated between
   * instructions. A field rather than a map entry: every instruction writes
   * it, and only the running processor's count is ever read mid-slice.
   */
  private runningSliceCycles = 0;
  /** Cycles a stall took at the start of the running slice, before the core ran. */
  private runningStalled = 0;
  /**
   * The latest time each image transport has observed, so its reading never
   * rewinds. Only transports get this: a timer callback must read its own
   * expiry (the scheduler stands there, not at the end of the lump that
   * carried the clock past it), and a clamp shared by every device made
   * Space Invaders' scanline interrupts re-arm a cycle late while a second
   * CPU's sound board saw a clock frozen at the first CPU's reading. The
   * datassette, by contrast, differences two readings to move its tape, and
   * a lump-then-expiry pair there is a tape that runs backwards.
   */
  private readonly observedTransportSeconds = new Map<string, number>();
  /** MAME `memory_bank::set_entry` per board bank tag. */
  private readonly bankEntry = new Map<string, (entry: number) => number>();
  /** The live selection of each memory bank, by tag. */
  private readonly bankSelection = new Map<string, { entry: number }>();
  /**
   * A device that powers on before its bank exists.
   *
   * MAME starts every device after memory is configured; here a generated
   * device runs its own device_start/device_reset as it is constructed, and
   * banks are installed once every device's address map is known. The
   * power-on entry is held until the bank is there rather than dropped.
   */
  private readonly pendingBankEntry = new Map<string, number>();
  private readonly generatedResources: Record<string, unknown> = {};
  private readonly state: Record<string, unknown> = {};
  private readonly shares: Record<string, Uint8Array> = {};
  private readonly declarativeEeprom = new Map<string, Device>();
  private videoPrimitives?: GeneratedMameVideoPrimitives;
  /**
   * Driver one-shots (`genericTimers` marked `driver`) that fire between
   * instructions rather than at the next line boundary, as MAME's scheduler
   * fires them: the Spectrum raises its frame interrupt 24 T-states into a
   * line and drops it 32 T-states later.
   */
  private readonly preciseTimerMembers = new Set<string>();
  private firingPreciseTimers = false;
  /** Driver-armed one-shots awaiting their expiry; see genericTimers. */
  private readonly pendingTimers = new VersionedMap<string, { at: number; param: number }>();
  /** The soonest round-ending timer's expiry, and the pendingTimers version it was found at. */
  private soonestEndingAt = Infinity;
  private soonestEndingVersion = -1;
  private soonestPreciseAt = Infinity;
  private soonestPreciseVersion = -1;

  /**
   * The soonest expiry among the timers that end a round (timerEndsRound),
   * found again only when a timer has been armed, cancelled or fired since:
   * a perfect quantum asks every round, twelve thousand times a SNES frame.
   */
  private soonestRoundEnding(): number {
    if (this.soonestEndingVersion !== this.pendingTimers.version) {
      let soonest = Infinity;
      for (const [member, pending] of this.pendingTimers) {
        if (pending.at < soonest && this.timerEndsRound(member)) soonest = pending.at;
      }
      this.soonestEndingAt = soonest;
      this.soonestEndingVersion = this.pendingTimers.version;
    }
    return this.soonestEndingAt;
  }

  /** A load writes timers back in place (machine-state.ts), so what was cached of them goes. */
  stateRestored(): void {
    this.pendingTimers.version++;
  }
  private readonly genericTimerFires = new Map<string, () => void>();
  /**
   * The timers a board's rounds end on, as MAME's do on every timer: a
   * `TIMER` device the driver arms itself, or one it allocates into an array.
   * Each fires once every processor stands at its expiry (see the frame
   * runner's nextTimerSeconds); on a board whose rounds do not end at timers
   * it fires at the next line boundary instead. A driver's own `emu_timer`
   * keeps the per-line schedule it forces.
   */
  private readonly roundTimerMembers = new Set<string>();
  /** The board's rounds end at the soonest timer (timerRounds). */
  private roundTimers = false;
  /**
   * MAME's perfect-quantum rounds that end at every timer, the precise driver
   * timers included (timerEndsRound): the round's target is already short of
   * the next timer, and one armed inside the round ends it, so a core's piece
   * needs no bounding by the next one (parked). Precise timers are still
   * looked for at every delivery: skipping that moved the SNES's sound writes.
   */
  private perfectTimerRounds = false;
  /** The devices `parked` asks for their next timer (see there), and the device count it was built at. */
  private parkedTimerDevices: Device[] = [];
  private parkedTimerDevicesSize = -1;

  /**
   * A timer that ends the round it falls due in: a round timer, or a precise
   * driver timer, since MAME's timeslice ends at every timer's expiry. The
   * SNES NMI is one, VBLANK plus 12 cycles: run past it, the 65C816's WAI
   * burned the rest of its round and took the NMI up to 22 cycles late.
   */
  private timerEndsRound(member: string): boolean {
    return this.roundTimerMembers.has(member) || this.preciseTimerMembers.has(member);
  }
  /** A round timer was armed inside the round for `seconds` from its base. */
  private roundTimerArmed?: (seconds: number) => void;
  /**
   * MAME's `machine().time()` while a screen timer's work runs between
   * timeslices -- the presentation, a frame event -- on the processors' clock
   * (atSchedulerTime); undefined otherwise.
   */
  private schedulerSeconds?: number;
  /** Where the round in progress began, on the clock `machineSeconds` keeps. */
  private roundBaseSeconds = 0;
  /** How far the devices stood from the round's base when it began (nextTimerSeconds). */
  private roundDeviceOffset = 0;
  /** The processor that posted the synchronized work being run, if one did. */
  private workPoster?: string;
  private video?: GeneratedVideoRenderer;
  private readonly regions: Regions;
  /**
   * Every region as assembled, so a save carries only the ones the machine
   * has written to (NVRAM, EEPROM data, code decrypted in place) and a load
   * puts the rest back without the save having to say so.
   */
  private readonly pristineRegions: Record<string, Uint8Array> = {};
  /**
   * State that board-composed models (a hosted MCU's private RAM, a CTC's
   * channels, a DMA's registers) keep between frames. Each model registers
   * its record here through `hostModel()` so a save state reaches it; a
   * closure variable would be invisible.
   */
  private readonly hostState: Record<string, object> = {};
  /** Each generated processor line's MAME state, `tag:line` -> CLEAR/ASSERT/HOLD. */
  private readonly deviceLineStates = this.hostModel('deviceLineStates', new Map<string, number>());
  /**
   * Host models whose running values live outside their registered record for
   * speed: each writes its record before a save is captured and reads it back
   * once a save has been restored.
   */
  private readonly stateSyncs: { capture(): void; restored(): void }[] = [];
  /** The vector display list (see vectorDisplay). */
  private readonly vectorPoints: { points: number[] } = { points: [] };
  private vectorDisplayHost?: object;
  /** Processor clocks `set_unscaled_clock` moved, and where each change began. */
  private readonly cpuClocks: {
    rates: Record<string, number>;
    epochs: Record<string, { cycles: number; seconds: number }>;
  } = { rates: {}, epochs: {} };
  /** Closures a CPU slot may hold (its interrupt vector source), restorable by name. */
  private readonly stateFunctions = new Map<string, (...args: never[]) => unknown>();
  /** Typed effects bound per callback id; see generated-effects.ts. */
  private effects: Map<string, BoundEffect> = new Map();
  private readonly frameRunner: GeneratedFrameRunner;
  private readonly bindings: GeneratedHandlerBindings;
  private currentLine = 0;
  /** `scheduler().synchronize()` work, run once the posting CPU has yielded. */
  private readonly scheduledWork: { at: number; run: () => void }[] = [];
  private currentLineFraction = 0;
  private inFrame = false;
  /**
   * Device time already delivered into the scanline the beam is on.
   *
   * Generated device timers are armed against raster positions —
   * `screen().time_until_pos(next_scanline)` — so the device clock and the
   * beam have to agree at every line boundary. Instruction-time deltas alone
   * cannot hold that: a CPU slice runs until it PASSES its cycle target, and
   * `run()` reports only the target, so every overrun is charged to the frame
   * runner's carry and lost to this clock. The devices then fall about 1% per
   * line behind the beam, and a one-shot that re-arms itself for "the next
   * line" eventually asks for a line that has already gone by. MAME's answer
   * to that is a whole frame's delay, which is permanent: the NES PPU stalled
   * on it about 90 scanlines into its first frame and never set the VBLANK
   * flag its boot loop spins on.
   *
   * Each line boundary settles the difference SIGNED, so sub-instruction edges
   * still land where the deltas put them and no drift accumulates.
   */
  private timedHardwareDelivered = 0;
  /** MAME's m_scantime in seconds (lineSeconds). */
  private cachedLineSeconds?: number;
  /** Device time the round may still deliver before its soonest timer (nextTimerSeconds); the rest is dropped. */
  private roundTimerBudget = Infinity;
  /** Device time delivered since the round began (setGeneratedTimerArmBase). */
  private roundDelivered = 0;
  /** Device time held back until the frame is presented (advanceTimedHardware). */
  private heldDeviceSeconds = 0;
  /** A device access or time query is catching device time up (never held). */
  private accessCatchingUp = false;
  /**
   * The line the device clock is credited with before the first line boundary
   * retires it. It is bookkeeping, so that boundary owes nothing, not where
   * the beam is: the frame runner begins line 0 at time zero.
   */
  private powerOnCreditLines = 0;
  /**
   * The device clock waits for the processors at a line boundary instead of
   * running on with the beam. Set once a generated device arms a timer
   * against the beam; see the line settle in the frame runner's onLine.
   */
  private deviceClockFollowsProcessors = false;
  /**
   * Brings the device clock up to where the timer-clock processor stands
   * inside its current instruction (see the core's `suspendsMidInstruction`),
   * or `lag` cycles short of it: 1 leaves the cycle it is on to it.
   */
  private catchUpDeviceTime?: (lag?: number) => void;
  /**
   * Run the processors inside a mounted card (IrDevice.nestedProcessors) up to
   * where the board's first processor stands, mid-instruction included.
   */
  private syncNestedProcessors?: () => void;
  /**
   * Device time a catch-up delivered past the running slice's target. A
   * lockstep slice's booked overrun pays only the rest; any other slice's
   * overrun comes off the next slice. Always zero between slices.
   */
  private deviceTimeAheadOfSlice = 0;
  private deliveringDeviceTime = false;
  /**
   * Cycles the timer-clock processor's last slice ran past its target that
   * its devices have not been given. Outside lockstep the line settle pays
   * them when the next line closes (it measures device time against the
   * beam); a catch-up before then pays them early, and the settle then owes
   * that much less.
   */
  private timerCpuCarriedCycles = 0;
  /**
   * The running processor is inside its core's run(): an instruction may be
   * part-way through. Once run() returns the slice is booked, and a device
   * asking the time then has nothing to catch up.
   */
  private coreExecuting = false;
  /**
   * Where in the running slice device time is being delivered to, while it
   * is: ahead of the instruction's start by the cycles a catch-up or the
   * fetch-cycle lookahead hands over. A timer firing in that delivery reads
   * the beam there, as MAME's scheduler stands at the timer's expiry; read
   * from the instruction's start, the 2C02 re-armed each scanline tick that
   * many cycles late (#184).
   */
  private deliveredSliceCycles?: number;
  /** The processor whose slice is executing. */
  private runningCpu?: string;
  private soundRuntime?: SoundRuntimeHooks;
  private readonly peripheralResets: Array<() => void> = [];
  private readonly peripheralTicks: Array<(seconds: number) => void> = [];
  /** `machine().schedule_soft_reset()`, taken when the frame ends. */
  private softResetPending = false;
  /** Delegates devices registered with `screen_device::register_vblank_callback`. */
  private readonly vblankCallbacks = new Map<string, (screen: unknown, state: number) => unknown>();
  private readonly inputs: InputPorts;
  /** A spec's processor stand-in (BoardProcessorFixture); never set in production. */
  private readonly processorFixture: BoardProcessorFixture | undefined;
  private readonly inputLatchPrevious = new Map<string, boolean>();

  constructor(
    machine: BoardIr,
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
    fixture?: BoardProcessorFixture,
  ) {
    this.processorFixture = fixture;
    // The arming hook is module state: installed first, so a device_start
    // never reads the board built before this one (whose base had moved on a
    // frame), and answering nothing until this board's scheduler runs.
    setGeneratedTimerArmExact(() => this.exactMachineTime());
    // The screen is the board's own: a processor may reposition its visible
    // area, and that must not carry into the next board built from this IR.
    // So are its processors' address-space facts, which it completes from
    // each CPU's compiled device (processorSpaces).
    machine = {
      ...machine,
      execution: {
        ...machine.execution,
        screen: { ...machine.execution.screen },
        cpus: machine.execution.cpus.map(cpu => ({ ...cpu, ...(cpu.io ? { io: { ...cpu.io } } : {}) })),
        ...(machine.execution.participants
          ? { participants: machine.execution.participants.map(participant => ({ ...participant })) }
          : {}),
      },
    };
    this.machine = machine;
    // Before any device starts: a device_start that binds a share
    // (`owner()->memshare(tag())`, sprite.h) asks whether a 16-bit processor
    // owns it, and asked too early Gauntlet bound its motion objects as bytes.
    this.processorSpaces(machine);
    this.hostState['cpu-clocks'] = this.cpuClocks;
    this.hostState['vector-display'] = this.vectorPoints;
    this.inputs = inputs;
    this.regions = regions;
    // The file-scope constant tables the handlers name, where every handler
    // resolves a name it does not declare: dkong's palette callback hands
    // `dkong_net_info` to compute_res_net.
    for (const [name, value] of Object.entries(machine.staticTables ?? {})) this.state[name] = staticTableValue(value);
    this.fbWidth = machine.execution.screen.width;
    this.fbHeight = machine.execution.screen.height;
    // The first line boundary is the beam arriving at line 0 with nothing run
    // yet, so it owes the devices nothing.
    this.timedHardwareDelivered = this.lineSeconds();
    this.powerOnCreditLines = 1;
    // Finder names the machine's own state class gives its devices; a hosted
    // device never takes one over (see cardScope).
    const rootMembers = new Set((machine.devices ?? [])
      .filter(device => !device.hostTag && device.member).map(device => device.member!));
    // Slot cards the board composes because they carry a processor of their
    // own -- the C64's 1541 -- by tag.
    const composedCardTags = new Set((machine.devices ?? [])
      .filter(device => device.interfaceHandlers?.length).map(device => device.tag));
    // Inside a composed card a device's finder names resolve in the card's
    // scope (cardScope), so the board-wide alias stays the machine's own. A
    // device hosted by an ordinary composite keeps answering to it: Wardner's
    // TOAPLAN_DSP drives its TMS320C10 through `m_dsp`, the name the driver
    // gives the composite itself, and the two never share a method.
    const inComposedCard = (tag: string): boolean =>
      [...composedCardTags].some(card => tag.startsWith(`${card}:`));

    // Passive storage executes generated methods while retaining the separate
    // peripheral state root used by existing board snapshots.
    for (const specification of machine.devices ?? []) {
      if (generatedDeviceRole(specification.type) !== 'passive-storage') continue;
      this.declarativeEeprom.set(specification.tag, createDevice(specification.type, {
        tag: specification.tag, regions, clock: specification.clock,
        calls: { 'machine().time': () => generatedAttotime(this.machineSeconds()) },
      }));
    }

    // MAME devices may alias board memory shares (buffered spriteram binds its
    // own tag), so every declared share exists before any device is created.
    for (const cpu of machine.execution.cpus) {
      // The opcodes map's too: Sega's encrypted Z80s decrypt into a share only
      // their decrypted_opcodes map declares (`rom().share("decrypted_opcodes")`).
      for (const range of [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? []), ...(cpu.opcode?.ranges ?? [])]) {
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
    const deviceConstants: Record<string, number> = {};
    for (const specification of machine.devices ?? []) {
      if (hasGeneratedDevice(generatedDeviceKey(specification)) && generatedDeviceRole(generatedDeviceKey(specification)) !== 'passive-storage') {
        const screenHost = {
          time_until_pos: (position: number, hpos = 0) => {
            this.deviceClockFollowsProcessors = true;
            const vtotal = Math.max(1, machine.execution.screen.vtotal);
            const target = this.rasterTarget(position, hpos);
            // Answered in the clock the device timers themselves run on, not
            // in whole beam lines. MAME measures the beam to the attosecond,
            // so a scanline callback re-arming for "one line further on"
            // always gets exactly one line; against an integer line counter
            // the same call lands on the line it is already standing at
            // whenever the two clocks disagree by a hair, and `lines <= 0`
            // then defers it a whole frame — which is where the NES PPU used
            // to lose its VBLANK flag for good. The fractional part is the
            // device time already delivered into this line, so a timer that
            // expired at line N asks from exactly line N.
            //
            // Measured from where the beam really is, which before the first
            // line boundary is line 0, not the line the device clock has been
            // credited with. The NES 2C02 arms its first scanline tick in
            // device_start for `time_until_pos(1)`; against the credited line
            // that was the line it stood on, so the tick came a whole frame
            // late and every NES machine ran a frame behind MAME's.
            // Within one frame, however far the device clock stands from the
            // beam's line count: MAME adds frame periods until the target is
            // ahead (`while (targetdelta <= curdelta)`).
            // Within half a pixel of the target counts as past it, so a
            // callback re-arming for the position it fired at waits a frame.
            // Without it, Metal Slug's auto-animation timer, firing at
            // VSSTART a hair short of it, re-armed for no time 65536 times.
            const halfPixel = this.halfPixelLines() * vtotal / this.rasterHeight();
            let lines = target - this.deviceBeamPosition();
            lines -= Math.floor(lines / vtotal) * vtotal;
            if (lines <= halfPixel) lines += vtotal;
            return lines * this.lineSeconds();
          },
          // The same beam the arithmetic above measures against, floored the
          // way MAME's screen_device::vpos() derives the line from emulated
          // time. Reading the frame runner's integer line instead leaves the
          // two a whole line apart at a boundary -- exactly where a scanline
          // one-shot re-arms itself -- so `time_until_pos(vpos() + 1)` asks
          // for the line it is already standing on and gets deferred a frame.
          vpos: () => this.deviceBeamLine(),
          hpos: () => this.beamHpos(),
          // screen_device::vblank(): the beam is outside the visible lines.
          vblank: () => {
            const line = this.beamLine();
            const screen = machine.execution.screen;
            return line >= (this.configuredRaster()?.vbstart ?? screen.vbstart) || line < (screen.vbend ?? 0) ? 1 : 0;
          },
          // update_now() and pixel(x, y): the picture composed up to the
          // beam and read back as an rgb_t, which is how the NES Zapper's
          // sensor sees the light it is pointed at -- this frame above the
          // beam, the last one below it, exactly as MAME's screen bitmap.
          update_now: () => {
            this.screenUpdateNow?.();
            return 1;
          },
          // screen_device::update_partial(scanline): the picture up to that
          // line. The TMS34010 brings it up to its DPYINT line before it
          // raises the display interrupt.
          update_partial: (line: number) => {
            this.screenUpdatePartial?.(Number(line), this.deviceBeamLine());
            return 1;
          },
          // screen_device::configure(width, height, visarea, period): a video
          // processor reprograms the screen from its own timing registers (the
          // TMS34010 from HEBLNK/HSBLNK: Mortal Kombat moves its window ten
          // pixels left of the set_raw one). The framebuffer keeps its size,
          // so a window of the same size moves and any other shape is left.
          configure: (width: number, height: number, visarea: unknown) => {
            const area = visarea as { min_x?: number; max_x?: number; min_y?: number; max_y?: number } | undefined;
            const screen = machine.execution.screen;
            if (!area || area.min_x === undefined || area.max_x === undefined || area.min_y === undefined || area.max_y === undefined) return 0;
            this.configureRaster(Number(width), Number(height), area.max_y + 1);
            // Another shape: the SNES PPU shows 240 lines with overscan on.
            // The picture takes it at the end of this frame (applyScreenArea),
            // so the frame in progress keeps the shape it is drawn in.
            if (area.max_x - area.min_x + 1 !== screen.width || area.max_y - area.min_y + 1 !== screen.height) {
              this.pendingScreenArea = { x: area.min_x, y: area.min_y, width: area.max_x - area.min_x + 1, height: area.max_y - area.min_y + 1 };
              return 0;
            }
            // Back to the picture's own shape before the frame ended: a CRTC
            // being programmed register by register passes through others
            // (Wardner's HD6845S configures 960 visible lines, then 240).
            this.pendingScreenArea = undefined;
            screen.xOffset = area.min_x;
            screen.yOffset = area.min_y;
            return 0;
          },
          pixel: (x: number, y: number) => this.screenPixel?.(Number(x), Number(y)) ?? 0,
          // screen_device::has_screen_update() / refresh_attoseconds(): asked
          // by a video device's device_config_complete before it supplies its
          // own (the TMS9928A's, once has_screen() is true). The board's
          // screen is already composed from the configuration they complete:
          // its update and its frame period are set.
          has_screen_update: () => 1,
          refresh_attoseconds: () => Number(screenPeriods(machine.execution.screen).frame.exact),
          // screen_device::reset_origin(beamy, beamx): MAME re-bases its VBLANK
          // timing so the beam stands at (beamy, beamx) now. The MC6845 calls it
          // at the top of every frame it counts out, which puts the screen on
          // the CRTC's phase: Wardner's second VBLANK comes 2.85 ms early, and
          // every one after keeps the new phase (GeneratedFrameRunner.resetOrigin).
          // The device clock counts from the start of the line the board
          // stands on (currentLine), so it moves with that line; after a jump
          // the board stands on the line before the beam's, whose end is the
          // frame runner's next boundary.
          reset_origin: (beamy: unknown = 0, beamx: unknown = 0) => {
            const runner = this.frameRunner;
            if (!runner) return 0;
            const exact = this.exactMachineTime();
            const now = exact ? exactToAttos(exact) : BigInt(Math.round(this.machineSeconds() * 1e18));
            const moved = runner.resetOrigin(now, Number(beamy) || 0, Number(beamx) || 0);
            if (!moved) return 0;
            this.timedHardwareDelivered -= moved.lineStartShift;
            if (moved.jumped) {
              this.currentLine = moved.previousLine;
              this.currentLineFraction = 0;
            }
            return 0;
          },
          // screen_device::clock(): the pixel clock set_raw gave it.
          clock: () => machine.execution.screen.pixelClock ??
            machine.execution.screen.refresh * (machine.execution.screen.htotal ?? machine.execution.screen.width) *
              machine.execution.screen.vtotal,
          // MAME's screen dimensions are the whole raster, not the visible
          // window: a device that allocates a bitmap from them addresses it in
          // raster coordinates.
          width: () => Math.max(1, machine.execution.screen.htotal ??
            (machine.execution.screen.xOffset ?? 0) + machine.execution.screen.width),
          height: () => Math.max(1, machine.execution.screen.vtotal),
          frame_number: () => this.frameRunner?.frameCount ?? 0,
          // screen_device::frame_period(), in the seconds an attotime is held
          // in: the SNES PPU's device_reset times its first frame by it.
          frame_period: () => this.lineSeconds() * Math.max(1, machine.execution.screen.vtotal),
          priority: () => this.videoPrimitives?.screenPriority?.() ?? 0,
          // MAME `screen_device::visible_area()`: the window inside the raster
          // that reaches the display, in the same coordinates a device plots.
          // A rectangle, with its accessors: atarimo's force_update asks
          // `screen().visible_area().bottom()`.
          visible_area: () => new GeneratedRectangle(
            machine.execution.screen.xOffset ?? 0,
            (machine.execution.screen.xOffset ?? 0) + machine.execution.screen.width - 1,
            machine.execution.screen.yOffset ?? 0,
            (machine.execution.screen.yOffset ?? 0) + machine.execution.screen.height - 1,
          ),
          // MAME `screen_device::register_screen_bitmap`: the screen sizes the
          // device's own bitmap to the raster and keeps it that size. Without
          // it the Game Boy PPU plotted every pixel into a zero-by-zero bitmap
          // and copied a blank screen out of it.
          register_screen_bitmap: (bitmap: unknown) => {
            const target = bitmap as { allocate?: (width: number, height: number) => void };
            target?.allocate?.(screenHost.width(), screenHost.height());
            return 0;
          },
          // MAME `screen_device::register_vblank_callback`: the delegate is
          // called with (screen, state) as VBLANK starts and ends. Keyed by
          // device and method, as a delegate registers once.
          register_vblank_callback: (delegate: unknown) => {
            if (typeof delegate !== 'function') return 0;
            const method = (delegate as { delegateMethod?: string }).delegateMethod ?? '';
            this.vblankCallbacks.set(`${specification.tag}.${method}`, delegate as (screen: unknown, state: number) => unknown);
            return 0;
          },
        };
        // The same services under the chain names a generated device emits:
        // `screen().vpos()` resolves to one lookup rather than evaluating
        // `screen()` and then a property, which is what lets codegen compile a
        // scanline renderer -- and a port handler -- instead of leaving either
        // to the interpreter.
        const hostServiceHosts: Record<string, Record<string, unknown>> = {
          screen: screenHost as unknown as Record<string, unknown>,
          // device_palette_interface's shadow services, on the palette the
          // video plan built (which exists only once video is composed).
          palette: {
            shadow_mode: () => this.videoPrimitives?.paletteShadows?.()?.shadow_mode() ?? 0,
            set_shadow_mode: (mode: number) => {
              this.videoPrimitives?.paletteShadows?.()?.set_shadow_mode(Number(mode));
              return 0;
            },
            shadows_enabled: () => this.videoPrimitives?.paletteShadows?.()?.shadowGroup ? 1 : 0,
            highlights_enabled: () => this.videoPrimitives?.paletteShadows?.()?.highlightGroup ? 1 : 0,
            shadow_table: () => this.videoPrimitives?.paletteShadows?.()?.shadow_table() ?? 0,
          },
          // The device's owner -- the driver -- answers its shares by tag:
          // sprite.h's device_start binds `owner()->memshare(tag())` as the
          // sprite RAM. A share a 16-bit processor owns is its words, as the
          // board binds it (bindGeneratedShareState).
          owner: {
            memshare: (tag: unknown) => {
              // A tag path (`:mob`, or a child's `owner:mob`) names its leaf share.
              const leaf = String(generatedCallValue(tag) ?? '').split(':').at(-1)!;
              tag = leaf;
              const bytes = this.shares[leaf];
              if (!bytes) return 0;
              const words = machine.execution.cpus.some(cpu =>
                cpu.space?.dataWidth === 16 &&
                [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])].some(range => range.share === String(generatedCallValue(tag))));
              const view = words ? new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 1) : bytes;
              return { ptr: () => view, bytes: () => bytes.length };
            },
          },
          machine: {
            side_effects_disabled: () => 0,
            phase: () => this.machinePhase,
            time: () => generatedAttotime(this.machineSeconds()),
            schedule_soft_reset: () => { this.softResetPending = true; return 0; },
          },
        };
        const screenServiceCalls: Record<string, (...args: number[]) => unknown> = {};
        for (const name of HOST_SERVICE_CALLS) {
          const [host, property] = name.split('().');
          const service = hostServiceHosts[host!]?.[property!];
          if (typeof service === 'function') {
            screenServiceCalls[name] = (...args: number[]) =>
              (service as (...rest: number[]) => unknown)(...args);
          }
        }
        const configuredMembers: Record<string, unknown> = {
          ...specification.memberValues,
          ...Object.fromEntries(Object.entries(specification.memoryShares ?? {})
            .flatMap(([member, share]) => this.shares[share]
              ? [[member, this.shares[share]]]
              : [])),
        };
        // A device whose children the board holds starts once they exist:
        // MAME starts every device before it resets any, and Elevator Action's
        // security interface clears its 68705's IRQ line in device_reset.
        const holdsChildren = (machine.devices ?? []).some(device =>
          device.hostTag === specification.tag && hasGeneratedDevice(generatedDeviceKey(device)));
        const hostBound = startReadsHostBindings(generatedDeviceKey(specification)) || holdsChildren;
        // sound_manager::system_mute, which Space Invaders' sound board sets
        // from its enable latch: the whole mix, not one device.
        const systemMute = (mute: unknown) => { this.state.systemSoundMuted = Number(mute) ? 1 : 0; return 0; };
        const device = createDevice(generatedDeviceKey(specification), {
          clock: specification.clock,
          tag: specification.tag,
          // Reset with the machine, after machine_start (see construction's end).
          holdReset: true,
          ...(specification.soundInputs ? { soundInputsMask: specification.soundInputs } : {}),
          heldChild: (tag: string) => (machine.devices ?? []).some(device =>
            device.tag === tag && device.hostTag === specification.tag && hasGeneratedDevice(generatedDeviceKey(device)))
            ? this.deviceHandle(tag) : undefined,
          schedule: run => this.synchronize(run),
          // Every processor runs in the round, hosted MCUs included, except
          // under a perfect quantum (see autonomousProcessors).
          deferSynchronize: machine.execution.perfectQuantum !== true,
          shares: this.shares,
          inputs,
          members: {
            ...configuredMembers,
            ...Object.fromEntries(Object.entries(specification.memoryAllocations ?? {}).map(([name, allocation]) => {
              const memory = allocatedMemory(allocation);
              if (!this.deviceAllocations.has(specification.tag)) this.deviceAllocations.set(specification.tag, memory);
              return [name, memory];
            })),
          },
          // An empty string is an empty slot (withEmptySlots), not "use the
          // default card".
          ...(specification.slotDefault !== undefined ? { slot: specification.slotDefault } : {}),
          // A slot whose default card the board composes attaches that card in
          // its own device_start; it starts once the card exists (see
          // attachComposedCards).
          ...(hostBound ||
            (specification.slotDefault && composedCardTags.has(`${specification.tag}:${specification.slotDefault}`))
            ? { deferStart: true }
            : {}),
          selectors: cartSelectors(config.cart),
          machineName: config.game,
          ...(config.samplePath ? { samplePath: config.samplePath } : {}),
          // An image held from power-on (BoardConfig.images): a C64 cartridge
          // is the expansion port's from before the machine starts.
          ...(config.images?.[specification.tag] ? { image: config.images[specification.tag] } : {}),
          finder: (rawTag, member, kind) => {
            // MAME `required_address_space`: the device's own setter names the
            // processor and space (`m_memspace.set_tag(tag, no)`), after which
            // it reads that bus directly -- the Battlezone AVG's display list
            // lives in the main CPU's RAM and ROM.
            if (kind === 'space') {
              // Configured before the processors' buses exist, so the tag is
              // kept and the bus looked up when the space is first used.
              let target = '';
              const processor = () => machine.execution.cpus.find(cpu => cpu.tag === target);
              return {
                set_tag: (tag: string) => {
                  target = String(tag);
                  return 0;
                },
                read_byte: (address: number) => this.cpuBuses.get(target)?.read(address) ?? 0xff,
                write_byte: (address: number, data: number) => {
                  this.cpuBuses.get(target)?.write(address, data);
                  return 0;
                },
                data_width: () => {
                  const cpu = processor();
                  return cpu?.space?.dataWidth === 16 ? 16 : 8;
                },
                addrmask: () => this.cpuBuses.get(target)?.addrmask() ?? Bus.addressMaskOf(processor()?.ranges ?? []),
                // MAME `install_readwrite_tap(start, end, mirror, name, read, write)`:
                // the slapstic watches every access its processor makes. The
                // tap answers nothing, and a device may install it before the
                // bus is built, so it waits for its bus (installSpaceTaps).
                install_readwrite_tap: (start: number, end: number, mirror: number, _name: unknown, read: unknown, write: unknown) => {
                  const tap = (address: number, writing: boolean) => {
                    const masked = address & ~Number(mirror);
                    if (masked < Number(start) || masked > Number(end)) return;
                    const handler = writing ? write : read;
                    if (typeof handler === 'function') handler(address, 0, 0xffff);
                  };
                  const bus = this.cpuBuses.get(target);
                  if (bus) bus.installAccessTap(tap);
                  else this.pendingSpaceTaps.push({ cpu: target, tap });
                  return 0;
                },
              };
            }
            // MAME `optional_memory_bank`/`required_memory_bank`: the device's
            // own setter names one of the board's banks (`m_bank.set_tag(tag)`),
            // and `set_entry` selects within it.
            if (kind === 'bank') {
              let target = '';
              return {
                set_tag: (tag: string) => {
                  target = String(tag);
                  return 0;
                },
                set_entry: (entry: number) => {
                  const set = this.bankEntry.get(target);
                  if (!set) {
                    this.pendingBankEntry.set(target, entry);
                    return 0;
                  }
                  set(entry);
                  return 0;
                },
              };
            }
            // A finder's tag is relative to the device declaring it: Taito's
            // 68705 interface, tagged `mcu`, finds its processor as "mcu",
            // which is `mcu:mcu`. Read as absolute it named the interface
            // itself, which is no processor, and fell through to the main
            // CPU -- so every `m_mcu->pa_w(...)` and IRQ went to the Z80.
            const childTag = rawTag && !/^[\^:]/.test(rawTag) ? `${specification.tag}:${rawTag}` : undefined;
            if (childTag && machine.devices?.some(candidate => candidate.tag === childTag)) {
              return this.deviceHandle(childTag);
            }
            const inferredTag = member?.replace(/^m_/, '');
            const tag = rawTag.replace(/^[\^:]+/, '') ||
              (inferredTag && (
                machine.execution.cpus.some(cpu => cpu.tag === inferredTag) ||
                machine.devices?.some(device => device.tag === inferredTag)
              ) ? inferredTag : undefined) ||
              machine.execution.cpus[0]?.tag || '';
            if (tag === 'screen') return screenHost;
            const targetDevice = machine.devices?.find(candidate => candidate.tag === tag);
            // MAME's `vector_device` is the display: what a vector generator
            // hands it is presentation, kept as the list the renderer draws.
            if (targetDevice?.type === 'VECTOR') return this.vectorDisplay(screenHost);
            // A generated device the board holds, found by another device's
            // finder: the Namco 54xx writes its noise nodes straight into the
            // board's DISCRETE as `m_discrete->write(...)`.
            if (targetDevice && hasGeneratedDevice(generatedDeviceKey(targetDevice)) &&
                !machine.execution.cpus.some(cpu => cpu.tag === tag)) {
              return this.deviceHandle(tag);
            }
            const cpuSpec = machine.execution.cpus.find(candidate => candidate.tag === tag) ??
              machine.execution.cpus[0];
            if (!cpuSpec) return 0;
            const resolve = (target: object, property: string | symbol, receiver?: object): unknown => {
              // JavaScript's own object protocol, and the save-state
              // walker's (machine-state.ts), are not MAME methods: a handler
              // comparing `m_vlm != nullptr` asks for valueOf and the walker
              // asks every object for stateKeys, and forwarding either made
              // the device invoke a method it never had.
              if (typeof property === 'symbol' ||
                  ['valueOf', 'toString', 'toJSON', 'then', 'stateKeys', 'stateRestored'].includes(property)) {
                return Reflect.get(target, property);
              }
              const method = String(property);
              // MAME `device_memory_interface::space(AS_PROGRAM)`. A device
              // that reaches its host processor's bus takes this by
              // reference and keeps it: the Game Boy PPU copies OAM through
              // `m_program_space->read_byte(...)`, and with the call
              // unresolved every DMA wrote zeroes -- no game had any sprites.
              if (method === 'space') {
                return () => ({
                  read_byte: (address: number) =>
                    this.cpuBuses.get(cpuSpec.tag)?.read(address) ?? 0xff,
                  write_byte: (address: number, value: number) => {
                    this.cpuBuses.get(cpuSpec.tag)?.write(address, value);
                    return 0;
                  },
                });
              }
              if (method === 'cycles_to_attotime') {
                return (cycles: number) => cycles * this.secondsPerCycleOf(cpuSpec);
              }
              if (method === 'total_cycles') {
                // A device measuring its processor is never ahead of it in
                // MAME: the scheduler runs the processor first in every
                // timeslice. Ours delivers device time ahead of the processor
                // at a line settle and before a timer fires, and there the
                // C64's VIC-II read the 6510 level with itself -- the
                // `cpu_cycles == vic_cycles` MAME never reaches -- and took
                // every BA cycle it had banked at once
                // (`spin_until_time(m_rdy_cycles)`, about 1,500 cycles a
                // frame), which swallowed the datassette's FLAG pulses and
                // failed every PAL tape load. Run ahead, the device reads the
                // processor where MAME's order would have it: one cycle on.
                // Under a perfect quantum MAME's slices are one processor
                // cycle, so that is all the device ever sees, behind as well:
                // held for the presentation, the VIC fell 256 cycles behind,
                // its 8-bit comparison matched again and it spun 25 ms.
                const asker = specification.tag;
                const ratio = Number(cpuSpec.clock) > 0 && Number(specification.clock) > 0
                  ? Number(cpuSpec.clock) / Number(specification.clock) : 1;
                const perfect = machine.execution.perfectQuantum === true;
                return () => {
                  const cycles = this.totalCycles(cpuSpec.tag);
                  const own = (this.devices.get(asker) as { totalCyclesNow?(): number } | undefined)?.totalCyclesNow?.();
                  if (!(Number(own) > 0)) return cycles;
                  const ahead = Math.floor(Number(own) * ratio);
                  return perfect || ahead >= cycles ? ahead + 1 : cycles;
                };
              }
              // The inverse of cycles_to_attotime. Hardware that measures a
              // span of machine time in its own processor's cycles needs it:
              // the Game Boy PPU advances its line counter by
              // `attotime_to_cycles(now - m_last_updated)`, and with the call
              // unbound that difference read as zero every time, so LY never
              // left 0 and the boot ROM waited for line 0x90 forever.
              if (method === 'attotime_to_cycles') {
                return (seconds: number) => Math.floor(
                  Number(seconds) / this.secondsPerCycleOf(cpuSpec) + CYCLE_ROUNDING,
                );
              }
              // device_execute_interface::local_time(): where the processor
              // stands now. The Spectrum's ULA takes it, less machine().time(),
              // to find the cycle its interrupt fell on (m_int_at), which every
              // contention window is measured from.
              if (method === 'local_time') return () => this.cpuSeconds(cpuSpec);
              if (method === 'clocks_to_attotime') {
                return (clocks: number) => attotimeSecondsFromTicks(clocks, this.cycleClockOf(cpuSpec));
              }
              // device_t::clock(), the processor's configured clock.
              if (method === 'clock') return () => cpuSpec.clock;
              if (method === 'reset') return () => this.cpus.get(cpuSpec.tag)?.reset();
              // Hardware that takes the bus away from the processor removes
              // the cycles it will not get. Without this the call fell through
              // to the device fallback below, which finds no device for a CPU
              // tag and answers 0 -- so the Atari 2600's WSYNC never parked
              // the 6507, every scanline came up short, and the frame ran 244
              // lines instead of 262.
              if (method === 'adjust_icount') {
                return (delta: number) => this.adjustGeneratedIcount(cpuSpec.tag, delta);
              }
              // device_execute_interface::spin_until_time: the processor is
              // suspended, eating its cycles, until that much time has passed
              // -- the same charge from where it stands as a negative
              // adjust_icount. The C64's VIC-II burns its BA cycles so
              // (`m_cpu->spin_until_time(m_cpu->cycles_to_attotime(m_rdy_cycles))`);
              // unanswered, they were never taken.
              if (method === 'spin_until_time') {
                return (seconds: number) => this.adjustGeneratedIcount(
                  cpuSpec.tag, -Math.ceil(Number(seconds) / this.secondsPerCycleOf(cpuSpec) - CYCLE_ROUNDING),
                  true,
                );
              }
              if (method === 'set_input_line') {
                return (line: number, state: number) => {
                  const cpu = this.cpus.get(cpuSpec.tag);
                  if (cpu) {
                    this.cpuInputLine(
                      cpuSpec.tag,
                      cpu,
                      line,
                      state,
                    );
                  }
                };
              }
              // Hardware reaches its processor the same way a driver does
              // (`m_lr35902->set_halt_bug(...)`); serve it from the core's
              // own lowered methods before falling back to a device.
              const cpu = this.cpus.get(cpuSpec.tag);
              if (cpu?.hasMethod(method)) {
                return (...args: number[]) => cpu.invoke(method, ...args);
              }
              // A CPU compiled whole is a device whose class does not declare
              // device_execute_interface's surface; the board answers it, as
              // MAME's CPU does to whoever holds it. The Namco 06xx asks its
              // CPU `suspended(SUSPEND_REASON_HALT | ...)` before an NMI.
              if (cpu instanceof DeviceCpu && !this.devices.get(tag)?.methodNames().includes(method)) {
                const surface = this.deviceReferents.get(cpuSpec.tag) as Record<string, unknown> | undefined;
                if (typeof surface?.[method] === 'function') return surface[method] as (...args: number[]) => unknown;
              }
              const call = (...args: number[]) => {
                const device = this.devices.get(tag);
                return (device?.preparedCall?.(method) ?? ((...rest: number[]) =>
                  device?.invoke(method, ...rest)))(...args) ?? 0;
              };
              // A finder onto a device that is no processor answers the same
              // way for the life of the board, so the answer is kept on the
              // finder itself and the trap above runs once per name: the MMC5
              // asks its PPU for the draw phase thirty thousand times a frame.
              if (receiver && targetDevice && !machine.execution.cpus.some(candidate => candidate.tag === tag)) {
                Object.defineProperty(receiver, method, { value: call, enumerable: false });
              }
              return call;
            };
            // The processor services above do not depend on when they are
            // asked for, so they are resolved once onto a plain object; the
            // Proxy behind it answers every other name. A device asks this on
            // every cycle -- the VIC-II reads `m_cpu->total_cycles()` at each
            // of its 19,656 a frame -- and through the Proxy alone each read
            // ran the trap and allocated a fresh closure. They are not
            // enumerable, so a save state still sees an object with no keys.
            const finder = Object.create(new Proxy({}, { get: resolve })) as object;
            for (const service of [
              'space', 'cycles_to_attotime', 'total_cycles', 'attotime_to_cycles', 'local_time', 'clocks_to_attotime', 'clock',
              'reset', 'adjust_icount', 'set_input_line',
            ]) {
              Object.defineProperty(finder, service, { value: resolve({}, service), enumerable: false });
            }
            return finder;
          },
          calls: {
            screen: () => screenHost,
            // device_video_interface::has_screen(): a device left unconfigured
            // binds the machine's first screen (divideo.cpp), which every board
            // here has. The MC6845 reprograms and re-bases it only when it has one.
            has_screen: () => 1,
            ...screenServiceCalls,
            'machine().sound().system_mute': systemMute,
            // The interleave a device asks for itself: the Taito SJ security
            // interface's ten microseconds after each host write.
            // A device passes an attotime, not seconds.
            'machine().scheduler().perfect_quantum': (duration: unknown = 0) => {
              this.perfectQuantum(duration && typeof duration === 'object' && 'as_double' in duration
                ? (duration as { as_double(): number }).as_double()
                : Number(duration) || 0);
              return 0;
            },
            exists: () => 1,
            machine: () => ({
              // MAME defers a soft reset to the end of the timeslice; the
              // board takes it when the frame ends. The watchdog's way out.
              schedule_soft_reset: () => { this.softResetPending = true; return 0; },
              // False during emulation; MAME only sets it for a debugger peek.
              // Devices gate real state changes on it — the 6532 sets its timer
              // interrupt enable inside `if (!machine().side_effects_disabled())`
              // — so leaving it off this object threw before that assignment and
              // the RIOT could never raise its IRQ (venture, issue #63).
              side_effects_disabled: () => 0,
              phase: () => this.machinePhase,
              time: () => generatedAttotime(this.machineSeconds()),
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
          ...(specification.romMap?.length ? { romRead: this.deviceRomRead(specification.tag, specification.romMap, regions) } : {}),
          // A CPU compiled as a device: the spaces its owner maps -- program,
          // and IO and decrypted opcodes where the driver gives those maps.
          ...((cpu => cpu ? { configuredSpaces: [0, ...(cpu.io ? [2] : []), ...(cpu.opcode ? [3] : [])] } : {})(
            machine.execution.cpus.find(candidate => candidate.tag === specification.tag))),
          configuration: config,
          // Machine-config chained setup calls (m_starfield->set_starfield_config(...))
          // lowered from the driver's constant arguments. MAME makes them
          // before device_start, which is where the Spectrum ULA derives its
          // line timings from the screen area it was configured with.
          configure: configured => {
            for (const configuration of specification.configuration ?? []) {
              if (!configured.methodNames().includes(configuration.method)) {
                configured.configureHost?.(configuration.method, configuration.args);
                continue;
              }
              // A rectangle travels as its edges; the device gets MAME's value.
              configured.invoke(configuration.method, ...configuration.args.map(argument => isEncodedRectangle(argument)
                ? new GeneratedRectangle(...argument.rectangle) as unknown as number
                : argument as number));
            }
          },
          banks: this.generatedBanks,
          resourceCache: this.generatedResources,
        });
        // Driver handlers name public device enums with their C++ owner, for
        // example `k053251_device::CI2`. The values are already extracted
        // into the registered device definition; publish that source-derived
        // namespace to the board evaluator instead of treating an unknown
        // identifier as zero.
        const constantOwners = new Set([
          specification.className,
          ...(specification.classHierarchy ?? []),
        ].filter(Boolean) as string[]);
        for (const owner of constantOwners) {
          for (const [name, value] of Object.entries(device.constants())) {
            deviceConstants[`${owner}::${name}`] = value;
          }
        }
        this.devices.set(specification.tag, device);
        if (hostBound) this.hostBoundStarts.push(device);
        if (specification.member) {
          if (finderElement(specification.member)) {
            placeFinderElement(this.state, specification.member, device);
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
            : (endpoint.preparedCall?.(range.method) ?? ((...args: GeneratedCallArgument[]) =>
              endpoint.invoke(range.method, ...args)))(normalized, value);
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
    const timerClockCpu = machine.execution.cpus[0];
    // Read each time: a processor's clock can change as it runs.
    const timerSecondsPerCycle = (): number => timerClockCpu ? this.secondsPerCycleOf(timerClockCpu) : 1;
    // A composed slot card is a machine of its own on the bus: the 1541's VIAs
    // and gate array answer the drive's 6502, never the C64's. Their clock is
    // that processor's, advanced between its instructions by exactly what it
    // executed -- as MAME, which never fires a timer before every processor
    // has reached it, guarantees. On the C64's clock the gate array ran
    // ahead of a drive CPU that had not yet read the last byte, which then
    // came back shifted by a bit or two.
    const cardClockDevices = new Map<string, Device[]>();
    for (const card of machine.devices ?? []) {
      if (!card.interfaceHandlers?.length) continue;
      const cpu = machine.execution.cpus.find(candidate => candidate.tag.startsWith(`${card.tag}:`));
      if (!cpu || cpu.tag === timerClockCpu?.tag) continue;
      const owned = [...this.devices].filter(([tag, device]) =>
        tag.startsWith(`${card.tag}:`) && device.needsTick?.() !== false).map(([, device]) => device);
      if (owned.length) cardClockDevices.set(cpu.tag, owned);
    }
    const cardDeviceSet = new Set([...cardClockDevices.values()].flat());
    const timedDevices = [...this.devices.values()].filter(device =>
      device.needsTick?.() !== false && !cardDeviceSet.has(device));
    // Resolved once per processor: this runs after every instruction the
    // card's processor executes.
    const cardClocks = new Map([...cardClockDevices.keys()].map(tag =>
      [tag, machine.execution.cpus.find(candidate => candidate.tag === tag)!]));
    const tickCardDevices = (cpuTag: string, cycles: number): void => {
      if (!(cycles > 0)) return;
      const devices = cardClockDevices.get(cpuTag);
      if (!devices) return;
      const seconds = cycles * this.secondsPerCycleOf(cardClocks.get(cpuTag)!);
      const outer = beginGeneratedTimerDelivery();
      try {
        for (let index = 0; index < devices.length; index++) devices[index]!.tick(seconds);
      } finally {
        endGeneratedTimerDelivery(outer);
      }
    };
    const tickGeneratedDevices = (seconds: number): void => {
      if (!(seconds > 0)) return;
      const outer = beginGeneratedTimerDelivery();
      try {
        for (const device of timedDevices) device.tick(seconds);
      } finally {
        endGeneratedTimerDelivery(outer);
      }
    };
    let tickHostedProcessors = (_seconds: number): void => {};
    let hostsProcessors = false;
    // The lump being delivered and how much of it the hosted processors have
    // already run, for the one pre-fire hook (allocated once: it is installed
    // for every instruction's delivery).
    let lumpSeconds = 0;
    let lumpHosted = 0;
    const preFire = (overshoot: number): void => {
      const step = lumpSeconds - overshoot - lumpHosted;
      if (step > 0) {
        tickHostedProcessors(step);
        lumpHosted += step;
      }
    };
    const advanceTimedHardware = (seconds: number): void => {
      if (!(seconds > 0)) return;
      // Until the frame is presented, device time stops just short of the
      // start of line vbstart and the rest is held for after it: MAME takes
      // its snapshot there before any device timer due at that instant. The
      // 2C02 draws line 239 on such a timer, and MAME's picture shows the
      // line from the frame before (#184). A processor whose last instruction
      // runs past the instant and reads a device gets it where it stands:
      // held there, the 2600's RIOT timer read stale and the game drifted.
      if (this.frameRunner?.awaitingPresent && this.accessCatchingUp) {
        // A processor reading or writing a device has run that far: the
        // device must stand there too, held time first.
        seconds += this.heldDeviceSeconds;
        this.heldDeviceSeconds = 0;
      } else if (this.frameRunner?.awaitingPresent && !this.firingTimersDueAtBase) {
        const allowed = this.secondsToPresent() - PRESENT_MARGIN_SECONDS;
        if (seconds > allowed) {
          const delivered = Math.max(0, allowed);
          this.heldDeviceSeconds += seconds - delivered;
          seconds = delivered;
          if (!(seconds > 0)) return;
        }
      }
      seconds = Math.min(seconds, this.roundTimerBudget);
      this.roundTimerBudget -= seconds;
      if (!(seconds > 0)) return;
      this.roundDelivered += seconds;
      deliverTimedHardware(seconds);
      // Precise driver timers come due on the same clock, after the devices
      // have been clocked to it.
      if (this.preciseTimerMembers.size && this.pendingTimers.size && !this.deliveringDeviceTime &&
        !this.firingPreciseTimers) {
        // Not re-entered: asking the time catches devices up (a 6502 board's
        // catchUpDeviceTime), which delivers time, which would ask again.
        this.firingPreciseTimers = true;
        try { this.firePreciseTimers(); } finally { this.firingPreciseTimers = false; }
      }
    };
    const deliverTimedHardware = (seconds: number): void => {
      this.timedHardwareDelivered += seconds;
      // A device asking the time while its clock is being delivered is
      // answered from the delivery, never caught up again (catchUpDeviceTime).
      const outer = this.deliveringDeviceTime;
      this.deliveringDeviceTime = true;
      // MAME fires a timer once every device has run to its expiry, so the
      // hosted processors are clocked up to each one before its callback
      // (timerPreFire) and through the rest of the lump after the last.
      if (!hostsProcessors) {
        tickGeneratedDevices(seconds);
        this.deliveringDeviceTime = outer;
        return;
      }
      const outerLump = lumpSeconds;
      const outerHosted = lumpHosted;
      lumpSeconds = seconds;
      lumpHosted = 0;
      const outerPreFire = setGeneratedTimerPreFire(preFire);
      try {
        tickGeneratedDevices(seconds);
      } finally {
        setGeneratedTimerPreFire(outerPreFire);
      }
      tickHostedProcessors(seconds - lumpHosted);
      lumpSeconds = outerLump;
      lumpHosted = outerHosted;
      this.deliveringDeviceTime = outer;
    };
    // MAME's DISCRETE_SOUND network addresses nodes through discrete.h's
    // `NODE(_x) (NODE_00 + (_x) * DISCRETE_MAX_OUTPUTS)`, and a driver handler
    // may poke one directly: Gyruss's i8039 drives its drum DAC with
    // `m_discrete->write(NODE(16), data)`. The numbering is the compiled
    // network's own (NODE_00 and the step to NODE_01). Answered as the bare
    // index -- what the hand engine before #236 numbered nodes by -- every
    // such write landed on a node the network does not have, and the drums
    // and the AY filter selects were silent.
    const discreteConstants = generatedDeviceDefinition('DISCRETE')?.constants;
    const node00 = discreteConstants?.NODE_00;
    const node01 = discreteConstants?.NODE_01;
    if (node00 !== undefined && node01 !== undefined) {
      calls['NODE'] = (node: number) => node00 + Number(node) * (node01 - node00);
    }
    // MAME device_scheduler::abort_timeslice: the executing processor's
    // slice ends after the instruction in progress. Donkey Kong asks for it
    // straight after raising the 8257's DMA requests, so the controller
    // starts in the next round rather than at the end of this one.
    calls['machine().scheduler().abort_timeslice'] = () => {
      this.frameRunner?.requestSynchronize();
      return 0;
    };
    // MAME boosts the scheduler's interleave when a device publishes something
    // another processor has to observe before it is overwritten. The frame
    // schedule is scanline-granular, so without this the observer never runs
    // between the two halves of a handshake that a single slice contains.
    calls['machine().scheduler().perfect_quantum'] = (seconds = 0) => {
      this.perfectQuantum(seconds);
      return 0;
    };
    // Generated handlers execute normal CPU accesses, never debugger/disassembly
    // probes.  MAME's guard must therefore allow read-side acknowledgement
    // effects such as clearing a sound CPU IRQ.
    calls['machine().side_effects_disabled'] = () => 0;
    calls['machine().phase'] = () => this.machinePhase;
    // The running game_driver: CPS1's machine_reset finds its row of
    // cps1_config_table by `strcmp(pCFG->name, machine().system().name)`.
    calls['machine().system'] = () => ({ name: machine.game }) as never;
    // device_t::started() on the driver itself: device_t::start sets it once
    // driver_device::device_start, which runs machine_start, sound_start and
    // video_start, has returned. The Spectrum's end-of-screen timer reads it
    // before forcing a partial update.
    calls['started'] = () => this.driverStarted ? 1 : 0;
    // The scheduler's clock, as devices already see it. Carnival's sound timer
    // is `machine().time().as_ticks(500) & 1`, a 500 Hz square wave the game
    // polls; unbound it read 0 forever (#178).
    calls['machine().time'] ??= () => generatedAttotime(this.machineSeconds());
    // MAME's bookkeeping coin lockout: while a coin is locked out its input
    // reads as released (ioport.cpp, with -coin_lockout on, MAME's default).
    // Games close the coin mechs when credits are full or during their tests;
    // unbound, these answered 0 and every coin went in (#178). The lockout is
    // machine state, so it is saved and pushed back to the input model.
    const coinLockout = this.hostModel('coinLockout', { mask: 0 });
    const setCoinLockout = (mask: number) => {
      coinLockout.mask = mask & 0xfff;
      inputs.setCoinLockout?.(coinLockout.mask);
      return 0;
    };
    this.stateSyncs.push({ capture: () => {}, restored: () => void inputs.setCoinLockout?.(coinLockout.mask) });
    calls['machine().bookkeeping().coin_lockout_w'] = (coin, on) => {
      const bit = 1 << Number(coin);
      return setCoinLockout(Number(on) ? coinLockout.mask | bit : coinLockout.mask & ~bit);
    };
    calls['machine().bookkeeping().coin_lockout_global_w'] = on => setCoinLockout(Number(on) ? 0xfff : 0);
    // MAME's system mute zeroes every speaker's output while it is set
    // (sound.cpp). With no arguments it is the getter. Unbound, the driver's
    // "sound disable" bit did nothing (#178).
    const systemMute = this.hostModel('systemMute', { muted: false });
    this.stateSyncs.push({ capture: () => {}, restored: () => sinks.mute?.(systemMute.muted, 0) });
    calls['machine().sound().system_mute'] = (...args) => {
      if (!args.length) return Number(systemMute.muted);
      const muted = Boolean(Number(args[0]));
      if (muted !== systemMute.muted) {
        systemMute.muted = muted;
        sinks.mute?.(muted, this.soundFraction());
      }
      return 0;
    };
    calls['m68000_base_device::autovector'] = level => 24 + level;
    const generatedInputs: InputPorts = {
      has: port => inputs.has?.(port) ?? true,
      read: port => {
        let value = inputs.read(port);
        for (const custom of machine.execution.customs?.filter(entry =>
          entry.port === port) ?? []) {
          let line = 0;
          if (custom.source === 'screen-vblank') {
            const { vbend = 0 } = machine.execution.screen;
            const vbstart = this.configuredRaster()?.vbstart ?? machine.execution.screen.vbstart;
            const beam = this.beamLine();
            const inVblank = vbstart > vbend
              ? beam >= vbstart || beam < vbend
              : beam >= vbstart && beam < vbend;
            line = custom.activeLow ? Number(!inVblank) : Number(inVblank);
          } else if (custom.source === 'device-line') {
            const device = custom.deviceTag ? this.devices.get(custom.deviceTag) : undefined;
            // See above: hardware the board does not instantiate leaves the
            // bit alone rather than claiming a level for it.
            if (!device?.methodNames().includes(custom.member)) continue;
            const raw = Number(device.invoke(custom.member)) ? 1 : 0;
            line = custom.activeLow ? Number(!raw) : raw;
          } else {
            if (custom.member === 'startsel_edge_joy_r') {
              line = inputs.read('edge:START') & 0x0f;
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
        return value;
      },
    };
    // A call through a member-function pointer, which holds its method's name
    // (member-pointers.ts): Cosmic's screen update colours each pixel through
    // `(this->*m_map_color)(x, y)`, set to panic_map_color by its palette.
    // The pointer is called per pixel there, so each name and arity resolves
    // to its handler and parameter names once.
    const methodTargets = new Map<string, { handler: NonNullable<typeof machine.handlers>[number]; names: string[] } | null>();
    const methodTarget = (name: string, arity: number) => {
      const key = `${name}/${arity}`;
      let target = methodTargets.get(key);
      if (target !== undefined) return target;
      // An overloaded method is one handler per arity (`copy_layer__a5`), and
      // the pointer's own signature is what the call's arguments are.
      const leaf = name.split(/[.:]+/).at(-1)!;
      const usable = (candidate: NonNullable<typeof machine.handlers>[number]) =>
        Boolean(candidate.program && !candidate.program.diagnostics.length);
      const handler = machine.handlers?.find(candidate => candidate.method === `${leaf}__a${arity}` && usable(candidate)) ??
        machine.handlers?.find(candidate => candidate.method === name && usable(candidate));
      target = handler
        ? {
          handler,
          names: (handler.parameters ?? '').split(',')
            .map(parameter => /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter.trim())?.[1])
            .filter((parameter): parameter is string => Boolean(parameter)),
        }
        : null;
      methodTargets.set(key, target);
      return target;
    };
    calls['CALL_METHOD'] = (method: unknown, ...args: unknown[]) => {
      const name = String(method);
      const target = methodTarget(name, args.length);
      if (!target) {
        noteUnresolvedCall(`CALL_METHOD ${name}`);
        return 0;
      }
      const locals: Record<string, unknown> = {};
      for (let index = 0; index < target.names.length; index++) locals[target.names[index]!] = args[index];
      return executeGeneratedMachineHandler(machine, target.handler, this.bindings, locals) ?? 0;
    };
    // `ioport("VIDHW")`, the port by tag, or null where the machine has none:
    // dkong's check_palette reads its board revision this way.
    calls['ioport'] = (tag: unknown) => (generatedInputs.has?.(String(tag)) ?? true
      ? { read: () => generatedInputs.read(String(tag)) }
      : 0) as never;
    // referenceCalls/callParameters are shared, mutate-in-place dictionaries:
    // effect executors and prepared-call caches hold references to them, so
    // later packages (video framework calls) must extend them rather than
    // replace them, or those holders keep serving stale bindings.
    const stateNames = new Set([
      ...(machine.stateMembers ?? []).map(member => member.name),
      ...(machine.devices ?? []).flatMap(device => device.member ? [device.member.replace(/\[.*$/, '')] : []),
      ...Object.keys(regions).map(tag => `m_${tag.split(':').at(-1)}`),
      ...Object.keys(machine.execution.regionBindings ?? {}),
      ...Object.keys(machine.video?.regionBindings ?? {}),
      ...(machine.execution.inputMembers ?? []).map(input => input.member),
    ]);
    for (const handler of machine.handlers ?? []) {
      if (!handler.program) continue;
      const locals = new Set((handler.parameters ?? '').split(',').map(parameter => /(?:\w+)\s*$/.exec(parameter)?.[0].trim()));
      walkOperations(handler.program.operations, operation => {
        if (operation.op === 'declare') locals.add(operation.name);
      });
      const remember = (target: import('../ir/board.ts').GeneratedExpression) => {
        while (target.kind === 'index' || target.kind === 'member') target = target.object;
        if (target.kind === 'identifier' && !locals.has(target.name)) stateNames.add(target.name);
      };
      walkOperations(handler.program.operations, operation => { if (operation.op === 'assign') remember(operation.target); });
      walkExpressions(handler.program.operations, expression => { if (expression.kind === 'assignment') remember(expression.target); });
    }
    this.state = Object.fromEntries([
      ...[...stateNames].map(name => [name, undefined]),
      ...Object.entries(this.state),
    ]);
    this.bindings = {
      members: this.state,
      constants: deviceConstants,
      // Declared widths travel with the bindings so a first indexed write
      // allocates the array MAME declared rather than an untyped one, and an
      // interpreted scalar store narrows the way the C++ declaration does.
      ...(machine.stateMembers?.length ? {
        stateMembers: machine.stateMembers,
        setters: generatedStateSetters(this.state, machine.stateMembers),
      } : {}),
      inputs: generatedInputs,
      schedule: run => this.synchronize(run),
      calls,
      referenceCalls: {
        // MAME's region finder. Video handlers already have it; a machine
        // handler can want it too — Mr. Do!'s protection read answers with a
        // byte of its own program ROM.
        // A sized vector local (normalizeMameExecutionSource), as devices
        // have it: `std::vector<uint8_t> snapshot_data(snapshot_size)` is
        // the buffer the Spectrum's snapshot loader reads the file into.
        VECTOR_OF: (_type: unknown, count: unknown) =>
          resizeGeneratedContainer(generatedVector(), Number(count) || 0),
        memregion: (...args: unknown[]) => {
          const tag = String(generatedCallValue(args[0]) ?? '');
          const bytes = regions[tag];
          if (!bytes) throw new Error(`${machine.game}: no ROM region "${tag}"`);
          // The whole memory_region, as a device's own finder answers it: an
          // MBC2 pages its ROM from `&romregion->as_u8()`, and with no as_u8
          // its bank entries pointed into this object instead of the bytes.
          return memoryRegionObject(bytes);
        },
        // MAME's share finder by tag. System 16's paletteram_w sizes its
        // shadow half as `memshare("paletteram")->bytes() / 2`; unbound that
        // was 0, and every shadow pen was written over its normal pen.
        memshare: (...args: unknown[]) => {
          const tag = String(generatedCallValue(args[0]) ?? '');
          const bytes = this.shares[tag];
          if (!bytes) throw new Error(`${machine.game}: no memory share "${tag}"`);
          return { ptr: () => bytes, bytes: () => bytes.length };
        },
      },
      callParameters: {},
      // MAME's address_space, for a handler whose signature takes one. The
      // buses are created after the bindings, so resolve lazily.
      addressSpace: (cpuTag?: string) => {
        const tag = cpuTag ?? machine.execution.cpus[0]?.tag ?? '';
        return {
          read_byte: (address: number) => this.cpuBuses.get(tag)?.read(address) ?? 0xff,
          write_byte: (address: number, value: number) =>
            this.cpuBuses.get(tag)?.write(address, value),
          device: () => ({
            execute: () => ({
              adjust_icount: (delta: number) => this.adjustGeneratedIcount(tag, delta),
            }),
          }),
        };
      },
    };
    // The driver's own screen finder. MAME's device-facing services are bound
    // as `screen().<name>` (HOST_SERVICE_CALLS), but driver code reaches the
    // same screen through its required_device member, and only width/height
    // were ever answered there. Atari System 1 arms every one of its scanline
    // timers with `m_screen->time_until_pos(...)`, which returned 0 -- so each
    // one expired immediately and the video timing chain never advanced.
    {
      const screenMember = (machine.devices ?? [])
        .find(device => device.type === 'SCREEN')?.member ?? 'm_screen';
      const vtotal = Math.max(1, machine.execution.screen.vtotal);
      // Only `time_until_pos`, and only because it demonstrably answered zero:
      // Atari System 1 armed every scanline timer with it and each expired
      // immediately. The rest of the screen's methods already resolve through
      // the fallback paths, and binding them here shadows those -- a stubbed
      // `update_partial` cost Centiped the mid-frame render its interrupt
      // performs, which is visible in its very first frame.
      calls[`${screenMember}.time_until_pos`] ??= (position, hpos) => {
        // MAME targets `vpos * scantime + hpos * pixeltime`: the Spectrum
        // raises its interrupt 48 pixels (24 T-states) into line 0.
        const target = this.rasterTarget(Number(position), Number(hpos ?? 0));
        // Within half a pixel of the target counts as past it, as the device
        // screen's does: a precise driver timer fires a hair short of the line
        // it was armed for, and Neo Geo's vblank callback, re-arming for that
        // line, asked again and again for no time at all.
        const halfPixel = this.halfPixelLines() * vtotal / this.rasterHeight();
        // Measured from the instant machineSeconds() answers, which the
        // expiry is added to: inside a timer's callback the expiry itself
        // (expiryBeam, which beamPosition answers), between timeslices the
        // scheduler's base.
        const beam = this.expiryBeam === undefined && this.schedulerSeconds !== undefined && this.runningCpu === undefined
          ? this.frameRunner.baseBeam()
          : this.beamPosition();
        let lines = target - beam;
        lines -= Math.floor(lines / vtotal) * vtotal;
        if (lines <= halfPixel) lines += vtotal;
        return lines * this.lineSeconds();
      };
    }

    // `TIMER(config, m_x).configure_generic(FUNC(cls::cb))`: the driver arms
    // these itself with `m_x->adjust(when, param)`, and the callback runs once
    // at that time. Atari System 1's whole scanline-interrupt chain is three
    // of them; unmodelled, `adjust` resolved to nothing, int3 never fired and
    // the board spun in its own video timing with a black screen.
    for (const timer of machine.execution.genericTimers ?? []) {
      if (timer.driver && timer.precise) this.preciseTimerMembers.add(timer.member);
      if (!timer.driver) this.roundTimerMembers.add(timer.member);
      // Resolved once: a scanline timer fires 264 times a frame.
      const handler = machine.handlers?.find(candidate =>
        `${candidate.ownerClass}.${candidate.method}` === timer.handler);
      const fire = (): void => {
        const pending = this.pendingTimers.get(timer.member);
        if (!pending) return;
        this.pendingTimers.delete(timer.member);
        if (!handler?.program || handler.program.diagnostics.length) return;
        const run = () => executeGeneratedMachineHandler(machine, handler, this.bindings, {
          param: pending.param,
          // MAME hands a TIMER_DEVICE_CALLBACK_MEMBER its own device too.
          timer: pending.param,
        });
        // A precise timer fires between instructions, a hair after its
        // expiry, and a round's timer once the processors have run to it,
        // the first of them usually an instruction past; MAME's callback
        // sees the expiry itself.
        if (timer.driver || this.roundTimers) this.atTimerExpiry(pending.at, run);
        else run();
      };
      this.genericTimerFires.set(timer.member, fire);
      calls[`${timer.member}.adjust`] = (when, param = 0) => {
        // `attotime::never` disables the timer rather than scheduling it.
        const seconds = Number(when);
        if (!Number.isFinite(seconds) || seconds < 0) {
          this.pendingTimers.delete(timer.member);
          return 0;
        }
        const at = this.machineSeconds() + seconds;
        this.pendingTimers.set(timer.member, { at, param: Number(param) || 0 });
        if (this.timerEndsRound(timer.member)) this.roundTimerArmed?.(at - this.roundBaseSeconds);
        // `adjust(attotime::zero, param)` is MAME's synchronize(): due at the
        // current time, once the processors behind this one catch up -- not at
        // the next line. The Williams ADPCM board's sync_command is one; left
        // for the line boundary, the restarted sound CPU cleared its latch
        // first, then took the command's IRQ as a second command.
        if (seconds === 0) this.synchronize(fire);
        return 0;
      };
      calls[`${timer.member}.reset`] = () => {
        this.pendingTimers.delete(timer.member);
        return 0;
      };
      calls[`${timer.member}.enable`] = enabled => {
        if (!enabled) this.pendingTimers.delete(timer.member);
        return 0;
      };
      // MAME answers from emulated time, not from when the callback happens to
      // run: Simpsons blocks its sound NMI for four Z80 cycles, far less than
      // the line this schedule fires timers on, and a whole line of blocking
      // swallowed the NMIs its sound driver runs on.
      calls[`${timer.member}.enabled`] = () => {
        const pending = this.pendingTimers.get(timer.member);
        return pending && pending.at > this.machineSeconds() ? 1 : 0;
      };
    }
    // `timer_alloc("cls.method")`: a driver timer held in an array element
    // (Exidy's collision timers), scheduled and fired like the named ones.
    calls['timer_alloc'] = (callback: unknown) => {
      if (typeof callback !== 'string') return undefined as never;
      const key = `${callback}#${this.genericTimerFires.size}`;
      this.roundTimerMembers.add(key);
      // Which timers end a round has changed (soonestRoundEnding).
      this.pendingTimers.version++;
      this.genericTimerFires.set(key, () => {
        const pending = this.pendingTimers.get(key);
        if (!pending) return;
        this.pendingTimers.delete(key);
        const handler = machine.handlers?.find(candidate =>
          `${candidate.ownerClass}.${candidate.method}` === callback);
        if (!handler?.program || handler.program.diagnostics.length) return;
        this.atTimerExpiry(pending.at, () =>
          executeGeneratedMachineHandler(machine, handler, this.bindings, { param: pending.param }));
      });
      return {
        stateKeys: () => [],
        adjust: (when: unknown, param: unknown = 0) => {
          const seconds = Number(when);
          if (!Number.isFinite(seconds) || seconds < 0) this.pendingTimers.delete(key);
          else {
            const at = this.machineSeconds() + seconds;
            this.pendingTimers.set(key, { at, param: Number(param) || 0 });
            this.roundTimerArmed?.(at - this.roundBaseSeconds);
          }
          return 0;
        },
        reset: () => { this.pendingTimers.delete(key); return 0; },
        enable: (enabled: unknown) => { if (!enabled) this.pendingTimers.delete(key); return 0; },
        enabled: () => {
          const pending = this.pendingTimers.get(key);
          return pending && pending.at > this.machineSeconds() ? 1 : 0;
        },
      } as never;
    };
    bindGeneratedDriverState(this.state, calls);
    for (const [tag, bytes] of Object.entries(regions)) {
      bindGeneratedRegionState(
        this.state,
        tag,
        bytes,
        // A video plan's bindings are the same driver finders, plus any
        // pointer a video callback re-seats; both sides describe the one
        // state class, so a board with a plan keeps its richer map on top.
        { ...machine.execution.regionBindings, ...machine.video?.regionBindings },
        machine.video?.regionBindingOffsets,
      );
    }
    // MAME's `optional_memory_region` in driver state: the region, or null.
    for (const [member, tag] of Object.entries(machine.execution.regionObjects ?? {})) {
      this.state[member] = memoryRegionObject(regions[tag]);
    }
    bindGeneratedInputState(
      this.state,
      machine.execution.inputMembers ?? [],
      inputs,
      (deviceTag, method, value) => {
        const eeprom = this.declarativeEeprom.get(deviceTag);
        if (eeprom) eeprom.invoke(method, value);
        else this.devices.get(deviceTag)?.invoke(method, value);
      },
    );
    const screen = machine.devices?.find(device => device.type === 'SCREEN');
    for (const owner of [screen?.tag, screen?.member].filter(Boolean) as string[]) {
      calls[`${owner}.vpos`] = () => this.beamLine();
    }
    for (const [tag, device] of this.devices) {
      const specification = machine.devices?.find(candidate => candidate.tag === tag);
      // Built in one step once complete: a property per method added one at a
      // time puts a large device's referent (the floppy drive's) in V8's
      // dictionary mode, and the 64H156 reads it at every flux transition.
      const referentEntries: [string, unknown][] = [];
      // A device hosted inside another answers to its finder's name only in
      // its host's scope when the machine's own state class uses that name:
      // the 1541's `m_maincpu` is not the C64's (see cardScope).
      const flatMember = specification?.member &&
        !(specification.hostTag && rootMembers.has(specification.member) && inComposedCard(specification.tag))
        ? specification.member : undefined;
      // device_execute_interface::set_input_line on a generated processor:
      // Taito's 68705 interface raises its MCU's IRQ and holds its reset
      // through `m_mcu->set_input_line(...)`. An execution CPU binds its own
      // below; left unbound here the call answered zero and the MCU never
      // saw either line.
      if (device.methodNames().includes('execute_set_input')) {
        const setInputLine = (line: number, state: number) =>
          this.deviceInputLine(tag, device, Number(line), Number(state));
        for (const name of [tag, `m_${tag}`, ...(flatMember ? [flatMember] : [])]) {
          calls[`${name}.set_input_line`] ??= setInputLine;
        }
        device.bindCall('standard_irq_callback', line => this.deviceIrqAcknowledge(tag, device, Number(line)));
      }
      // The framework surface the host answers for the device (an image's
      // `exists()`), reached through the owner's finder. The NES checks
      // `m_cartslot->exists()` every vblank for a Disk System cartridge, and
      // unbound that answered 0 (#178).
      for (const [method, call] of Object.entries(device.hostedCalls?.() ?? {})) {
        if (device.methodNames().includes(method)) continue;
        for (const name of [tag, `m_${tag}`, ...(flatMember ? [flatMember] : [])]) {
          calls[`${name}.${method}`] ??= call as (...args: number[]) => unknown;
        }
      }
      // A call through a slot's card member reaches the card mounted there:
      // the SNES driver's `m_cartslot->m_cart->get_rom_size()`. The member
      // itself stays hidden from the referent (see below), so a driver's
      // `if (m_cartslot->m_cart)` keeps the answer it has always had.
      const slot = specification ? generatedDeviceDefinition(generatedDeviceKey(specification))?.slot : undefined;
      if (slot) {
        const cardMethods = new Set(Object.values(slot.options).flatMap(card => card.methods.map(method => method.name)));
        for (const method of slot.cardInterface?.methods ?? []) cardMethods.add(method.name);
        const card = () => (device.instance?.() as Record<string, unknown> | undefined)?.[slot.member] as
          Record<string, unknown> | undefined;
        for (const method of cardMethods) {
          const viaCard = (...args: unknown[]) => {
            const target = card()?.[method];
            if (typeof target !== 'function') {
              noteUnresolvedCall(`${slot.member}.${method}`);
              return 0;
            }
            return (target as (...values: unknown[]) => unknown)(...args);
          };
          for (const name of [tag, `m_${tag}`, ...(flatMember ? [flatMember] : [])]) {
            calls[`${name}.${slot.member}.${method}`] ??= viaCard as (...args: number[]) => unknown;
          }
        }
      }
      const lag = this.deviceAccessLag(device);
      // A slot whose card holds processors: they stand where the leader does
      // before it reaches the card (syncNestedProcessors).
      const hostsNested = (device.nestedProcessors?.().length ?? 0) > 0;
      for (const method of device.methodNames()) {
        const accessed = lag !== undefined && (method === 'read' || method === 'write');
        const synced = <T extends (...args: never[]) => unknown>(call: T): T => accessed
          ? ((...args: Parameters<T>) => {
            this.catchUpDeviceTime?.(lag);
            return call(...args);
          }) as T
          : hostsNested
            ? ((...args: Parameters<T>) => {
              this.syncNestedProcessors?.();
              return call(...args);
            }) as T
            : call;
        const invoke = synced(device.prepareCall?.(method) ?? ((...args: unknown[]) =>
          device.invoke(method, ...args as Parameters<typeof device.invoke>[1][])));
        calls[`${tag}.${method}`] = invoke;
        calls[`m_${tag}.${method}`] = invoke;
        if (flatMember) calls[`${flatMember}.${method}`] = invoke;
        device.connectCall?.(method, connected => {
          const call = synced(connected);
          calls[`${tag}.${method}`] = call;
          calls[`m_${tag}.${method}`] = call;
          if (flatMember) calls[`${flatMember}.${method}`] = call;
          // A handler runtime may already hold the previous target in its
          // links table; make every prepared runtime re-resolve.
          noteCallLinksChanged();
        });
        // A driver may copy a finder into a local pointer before calling it.
        // The named call table alone cannot represent that pointer identity.
        // The key is fixed for the life of the board; building it per call put
        // a string concatenation and a dictionary probe on every VIC-II cycle
        // (`m_cpu->total_cycles()`). The lookup itself stays late-bound.
        //
        // Resolved again whenever a binding changes (noteCallLinksChanged), as
        // a links table is, rather than probed in the dictionary-mode calls
        // table on every call: the 1541's gate array reaches its drive's
        // `get_next_transition` through here once per flux transition.
        const referentKey = `${flatMember ?? (specification?.member ? `m_${tag}` : tag)}.${method}`;
        let target: ((...args: number[]) => unknown) | undefined;
        let resolvedAt = -1;
        referentEntries.push([method, (...args: unknown[]) => {
          if (resolvedAt !== callLinksGeneration) {
            target = calls[referentKey];
            resolvedAt = callLinksGeneration;
          }
          return target!(...args as number[]);
        }]);
        // Tilemap callbacks are recorded by their declaring C++ class rather
        // than by the machine-config tag. When exactly one device of that
        // class is composed, preserve that source identity so its callback
        // executes against the device's private RAM, not the driver state.
        if (
          specification?.className &&
          machine.devices?.filter(candidate =>
            candidate.className === specification.className).length === 1
        ) {
          this.bindings.referenceCalls![`${specification.className}.${method}`] = invoke;
        }
      }
      // The interfaces the host answers for the device (device_image_interface's
      // `user_loadable()`, which Neo Geo's set_slot_idx asks its cartridge
      // slot) are the device's as much as its own methods are.
      const own = new Set(referentEntries.map(([method]) => method));
      const self = device.instance?.() as Record<string, unknown> | undefined;
      const hosted = self && typeof self === 'object'
        ? Object.entries(self).filter(([name, value]) => typeof value === 'function' && !own.has(name))
        : [];
      const referent: Record<string, unknown> = Object.fromEntries([
        ...hosted,
        ...referentEntries,
        ['found', () => 1],
        ['tag', () => tag],
        ['reset', () => device.reset()],
      ]);
      // And its fields, live: a driver reads a device's public member through
      // its finder -- System 16A's screen update starts
      // `if (!m_segaic16vid->m_display_enable)`, and with no such property the
      // test passed every frame and the screen stayed black.
      if (self && typeof self === 'object') {
        for (const name of Object.getOwnPropertyNames(self)) {
          // Values only: a device pointer a device holds (the NES slot's
          // m_cart) stays unexposed, as it was. Exposed, nes_state's
          // machine_start took its cartridge branch, whose PPU-space installs
          // the NES family already applies from source (nes/extract.ts) and a
          // device space cannot take at run time.
          if (name in referent || !/^m_\w+$/.test(name) || typeof self[name] === 'function' ||
            (self[name] !== null && typeof self[name] === 'object' && !ArrayBuffer.isView(self[name]))) continue;
          Object.defineProperty(referent, name, {
            get: () => self[name],
            set: (value: unknown) => { self[name] = value; },
            enumerable: false,
          });
        }
      }
      this.deviceReferents.set(tag, referent);
      // device_memory_interface::space(n) through the device's finder: Neo
      // Geo's init_ym takes `m_ym->space(0)` and installs the cartridge's
      // ADPCM-A ROM there. Unbound, the YM2610 had no sample ROM at all and
      // Metal Slug's attract was 21 dB under MAME.
      const deviceSpace = self && typeof self === 'object' ? (self as { space?: unknown }).space : undefined;
      if (typeof deviceSpace === 'function') {
        const space = (index: number) => (deviceSpace as (index: number) => unknown)(Number(index) || 0) as number;
        for (const name of [tag, `m_${tag}`, ...(flatMember ? [flatMember] : [])]) calls[`${name}.space`] ??= space;
      }
      if (flatMember && (this.state[flatMember] === device || this.state[flatMember] == null)) {
        this.state[flatMember] = referent;
        // A finder array indexed at run time (`m_slots[m_curr_slot]`) holds
        // its fitted devices; the rest read as the null MAME's finder holds.
        if (finderElement(flatMember)) {
          placeFinderElement(this.state, flatMember, referent, held => held === undefined || held === device);
        }
      }
    }
    // The same clock the `machine()` object answers with -- the scheduler's,
    // not the frame counter. A second binding here kept the old frame-granular
    // answer alive for anything that reaches the chain by name, which is every
    // emitted caller: the Game Boy PPU differences two readings of it to find
    // how many cycles to run, and inside one frame the difference was zero.
    for (const [tag, device] of this.devices) {
      // An image transport never sees its clock rewind (see
      // observedTransportSeconds); every other device reads the scheduler.
      const transport = device.findDevice?.('cassette') !== undefined;
      // A device holds an attotime as its seconds: every accessor MAME
      // spells on one is answered for a number (runtime.attotime), and two
      // readings compare by value, as attotime's == does. An object per
      // reading cost the 64H156 an allocation at every bit cell.
      device.bindCall('machine().time', () => {
        let seconds = this.machineSeconds();
        if (transport) {
          seconds = Math.max(this.observedTransportSeconds.get(tag) ?? 0, seconds);
          this.observedTransportSeconds.set(tag, seconds);
        }
        return seconds;
      });
    }
    const sourceHandlers = generatedHandlerRegistry(
      machine,
      this.bindings,
      handler => this.deviceHandlerBindings(handler),
    );
    const registry: HandlerRegistry = {
      read: { ...sourceHandlers.read },
      write: { ...sourceHandlers.write },
    };
    this.installDeviceHandlers(machine, registry);
    this.installGeneratedDeviceBuses(machine, registry);
    this.cartridgeTaps = this.installCartridgeMemoryHandlers(machine, registry);
    this.soundRuntime = this.installGeneratedSoundHandlers(machine, regions, sinks, registry);
    this.installMemoryBanks(machine, regions, registry, sinks);
    this.installDeclarativeHandlers(machine, config, inputs, registry);
    this.installSourceHandlerWidthAdapters(machine, registry);
    this.installInterruptVectorWriters(machine, registry);
    for (const specification of machine.devices ?? []) {
      for (const map of specification.addressMaps ?? []) {
        const device = this.devices.get(specification.tag);
        if (!device?.bindAddressSpace) {
          throw new Error(`${specification.tag}: configured device address space is not executable`);
        }
        const bus = new Bus(map.ranges, new Uint8Array(), registry, this.shares, 8, regions);
        // The bus's accessors are bound already; the VIC-II fetches through
        // this twice a cycle, so no wrapper sits in between.
        device.bindAddressSpace(map.index, bus.read, bus.write);
      }
    }
    // `address_map_bank_device`: its own space, decoded like a CPU's and
    // reached through the driver's calls on it. `m_offset` is bank * stride,
    // and every access is masked to the space's width and global_mask.
    for (const bank of machine.execution.bankDevices ?? []) {
      const bus = new Bus(bank.ranges, new Uint8Array(), registry, this.shares,
        bank.dataWidth === 16 ? 16 : 8, regions, 'little', bank.unmapHigh === true);
      // Its RAM is machine state like a processor bus's: the 48K's
      // 0x5b00-0xffff is the bank device's own.
      this.bankDeviceBuses.set(bank.tag, bus);
      const mask = (bank.addrWidth >= 32 ? 0xffffffff : (2 ** bank.addrWidth) - 1) &
        (bank.mask ?? 0xffffffff);
      const window = this.hostModel(`bank-device.${bank.tag}`, { offset: 0 });
      const calls = this.bindings.calls!;
      for (const member of new Set([bank.member ?? `m_${bank.tag}`, bank.tag])) {
        calls[`${member}.read8`] = offset =>
          bus.read(((window.offset + Number(offset)) & mask) >>> 0) & 0xff;
        calls[`${member}.write8`] = (offset, data) => {
          bus.write(((window.offset + Number(offset)) & mask) >>> 0, Number(data) & 0xff);
          return 0;
        };
        calls[`${member}.set_bank`] = entry => {
          window.offset = Number(entry) * bank.stride;
          return 0;
        };
      }
    }

    // palette_device takes the byte order of the share it binds, which is the
    // byte order of the space the share is mapped in, unless the driver called
    // set_endianness: the 68000's palette RAM is big-endian, the TMS34010's
    // little-endian, each as its compiled class's address_space_config says.
    const ramPalette = machine.video?.ramPalette;
    if (ramPalette && !ramPalette.endianness) {
      const owner = machine.execution.cpus.find(cpu =>
        (cpu.ranges ?? []).some(range => range.share === ramPalette.tag));
      if (owner?.space?.endianness) ramPalette.endianness = owner.space.endianness;
    }

    // Bound before any CPU exists: a generated CPU may emit a signal from its
    // own constructor, and every connection must already be executable.
    this.effects = bindBoardEffects(machine, this.effectBindings(sinks, registry));

    for (const specification of machine.execution.cpus) {
      const type = specification.type ?? '';
      // Every CPU is its MAME class compiled whole, a generated device that
      // executes (device-cpu.ts).
      if (!this.processorFixture && !this.devices.get(specification.tag)?.methodNames().includes('execute_run')) {
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
      const ranges = specification.ranges ?? [];
      const bus = new Bus(
        ranges,
        rom,
        registry,
        this.shares,
        specification.space?.dataWidth === 16 ? 16 : 8,
        regions,
        specification.space?.endianness ?? 'big',
        specification.unmapHigh === true,
      );
      this.cpuBuses.set(specification.tag, bus);
      // A cartridge's read taps observe the CPU's own space. They answer
      // nothing, so they layer over whatever already decodes the address --
      // which for an Atari 2600 bank switch is the ROM window it just read.
      if (specification.tag === machine.execution.cpus[0]?.tag) {
        for (const tap of this.cartridgeTaps) bus.installAccessTap(tap);
      }
      for (const pending of this.pendingSpaceTaps.filter(candidate => candidate.cpu === specification.tag)) {
        bus.installAccessTap(pending.tap);
      }
      // A card's own view: its `select()` and `disable()` reach this bus, which
      // starts where the card left the view when it was installed and reset.
      for (const { viewTag, view } of this.cartridgeViews.filter(candidate => candidate.cpu === specification.tag)) {
        view.select = entry => void bus.selectView(viewTag, entry);
        bus.selectView(viewTag, view.selected ?? -1);
      }
      for (const viewTag of new Set(
        (specification.ranges ?? []).flatMap(range => range.viewTag && !range.viewTag.startsWith('cartridge:') ? [range.viewTag] : []),
      )) {
        const select = (entry: number) => bus.selectView(viewTag, entry);
        // MAME's `memory_view::disable()` selects no entry at all, which leaves
        // the map underneath decoding on its own -- how a Game Boy hands the
        // first 256 bytes back to the cartridge once its boot ROM is done.
        const disable = () => void bus.selectView(viewTag, -1);
        this.bindings.calls![`${viewTag}.select`] = select;
        this.bindings.calls![`${viewTag.replace(/^m_/, '')}.select`] = select;
        this.bindings.calls![`${viewTag}.disable`] = disable;
        this.bindings.calls![`${viewTag.replace(/^m_/, '')}.disable`] = disable;
      }
      if (specification.opcode) {
        // A region a driver init decrypted into, or the share a CPU decrypts
        // into itself: an encrypted Sega Z80's device_reset fills the
        // `decrypted_opcodes` share its opcode map reads.
        const opcodeRom = regions[specification.opcode.region] ?? this.shares[specification.opcode.region];
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
        // The port space's width and byte order are the core's own
        // (`m_io_config`, answered by the compiled device's spaceConfig): the
        // V30's is 16 bits little-endian, so `out 6, ax` reaches a u16 handler
        // once with the whole word. Built 8 bits wide, every word port was two
        // byte writes (#246).
        const ioConfig = this.devices.get(specification.tag)?.spaceConfig?.(2 /* AS_IO */);
        const ioDataWidth = (specification.io.space?.dataWidth ?? ioConfig?.dataBits) === 16 ? 16 : 8;
        const ioBus = new Bus(
          specification.io.ranges,
          new Uint8Array(0),
          registry,
          this.shares,
          ioDataWidth,
          undefined,
          specification.io.space?.endianness ?? ioConfig?.endianness ?? 'big',
        );
        const mask = specification.io.globalMask ?? 0xffff;
        bus.in = port => ioBus.read(port & mask);
        bus.out = (port, data) => ioBus.write(port & mask, data);
        // Keep a natively 16-bit port atomic, for the same reason read16be
        // exists on the program bus: a word handler shown two byte halves
        // sees the second overwrite the first.
        if (ioDataWidth === 16) {
          bus.in16be = port => ioBus.read16be(port & mask);
          bus.out16be = (port, data) => ioBus.write16be(port & mask, data);
          bus.in16le = port => ioBus.read16le(port & mask);
          bus.out16le = (port, data) => ioBus.write16le(port & mask, data);
        }
      }
      // MAME's installer on the built space, for driver code that installs at
      // run time (ngarcade_base_state::machine_start picks its input
      // handlers by which control ports are fitted). A delegate naming one of
      // the board's handlers installs as that handler, decoded exactly as an
      // address-map range naming it is.
      const installInto = (method: string, args: unknown[], view?: { viewTag: string; viewEntry: number }): number => {
        const recorder = new RecordingAddressSpace();
        (recorder as unknown as Record<string, (...rest: unknown[]) => void>)[method]!(...args);
        bus.install(recorder.entries.flatMap((entry): InstalledRange[] => {
          if (entry.kind === 'rom') {
            return [{
              start: entry.start,
              end: entry.end,
              kind: 'rom' as const,
              ...(entry.mirror ? { mirror: entry.mirror } : {}),
              bytes: entry.bytes,
              romOffset: 0,
              ...view,
            }];
          }
          // `install_read_bank(start, end, bank)`: a window onto whatever the
          // bank points at, byte by byte as any bank window is.
          if (entry.kind === 'bank') {
            const key = `installed:${specification.tag}:${this.installedHandlerCount++}`;
            // By the offset the bus hands a bank window: a 16-bit bus reads a
            // word as two bytes at offset and offset + 1 of the same address.
            const { bank } = entry;
            if (entry.read) registry.read[key] = (_address: number, offset: number) => bank.read(offset) & 0xff;
            if (entry.write) registry.write[key] = (_address: number, offset: number, data: number) => bank.write(offset, data & 0xff);
            return [{
              start: entry.start,
              end: entry.end,
              kind: 'handler' as const,
              bank: key,
              ...(entry.mirror ? { mirror: entry.mirror } : {}),
              ...(entry.read ? { read: key } : {}),
              ...(entry.write ? { write: key } : {}),
              ...view,
            }];
          }
          if (entry.kind !== 'handler') {
            noteUnresolvedCall(`address_space.${method}(${entry.kind})`);
            return [];
          }
          const side = (delegate: InstalledDelegate | undefined, direction: 'read' | 'write') => {
            if (!delegate) return undefined;
            const named = (delegate as { delegateHandler?: string }).delegateHandler;
            if (named && registry[direction][named]) return named;
            // A driver handler (not a device's own method, which its device
            // instance answers) gets the entry its map range would have had.
            const handler = named && !named.split('.')[0]!.endsWith('_device')
              ? machine.handlers?.find(candidate => `${candidate.ownerClass}.${candidate.method}` === named)
              : undefined;
            if (handler && installedHandlerEntry(machine, registry, direction, named!,
              this.deviceHandlerBindings(handler), specification.tag)) return named;
            const key = `installed:${specification.tag}:${this.installedHandlerCount++}`;
            if (direction === 'read') registry.read[key] = (_address, offset, mask) => Number(delegate(offset, mask ?? 0xffff)) || 0;
            else registry.write[key] = (_address, offset, data, mask) => void delegate(offset, data, mask ?? 0xffff);
            return key;
          };
          const read = side(entry.read, 'read');
          const write = side(entry.write, 'write');
          return [{
            start: entry.start,
            end: entry.end,
            kind: 'handler' as const,
            ...(entry.mirror ? { mirror: entry.mirror } : {}),
            ...(read ? { read } : {}),
            ...(write ? { write } : {}),
            ...view,
          }];
        }));
        return 0;
      };
      const installers = (view?: { viewTag: string; viewEntry: number }) => ({
        install_rom: (...args: unknown[]) => installInto('install_rom', args, view),
        install_read_bank: (...args: unknown[]) => installInto('install_read_bank', args, view),
        install_write_bank: (...args: unknown[]) => installInto('install_write_bank', args, view),
        install_readwrite_bank: (...args: unknown[]) => installInto('install_readwrite_bank', args, view),
        install_read_handler: (...args: unknown[]) => installInto('install_read_handler', args, view),
        install_write_handler: (...args: unknown[]) => installInto('install_write_handler', args, view),
        install_readwrite_handler: (...args: unknown[]) => installInto('install_readwrite_handler', args, view),
      });
      // `m_rom_view[n].install_rom(...)`: defender's machine_start fills each
      // entry of the view its map declares with a bank of ROM.
      for (const viewTag of new Set(
        (specification.ranges ?? []).flatMap(range => range.viewTag ? [range.viewTag] : []),
      )) {
        this.state[viewTag] ??= memoryViewEntries(entry => installers({ viewTag, viewEntry: entry }));
      }
      // `install_read_tap(start, end, name, tap)` and its write and readwrite
      // forms: seicross's machine_start charges its MCU a wait state on every
      // access with A15 high. A tap watches; the data it is handed is its own.
      const tapInto = (method: string, args: unknown[]): number => {
        const recorder = new RecordingAddressSpace();
        (recorder as unknown as Record<string, (...rest: unknown[]) => void>)[method]!(...args);
        for (const entry of recorder.entries) {
          if (entry.kind !== 'tap') continue;
          const { start, end, read, write } = entry;
          // A tap over the whole space (the SNES cartridge slot's address
          // pins) has no range to test.
          bus.installAccessTap(start <= 0 && end >= bus.addrmask()
            ? (address, writing) => {
              const handler = writing ? write : read;
              if (handler) handler(address - start, 0, 0xff);
            }
            : (address, writing) => {
              if (address < start || address > end) return;
              const handler = writing ? write : read;
              if (handler) handler(address - start, 0, 0xff);
            });
        }
        return 0;
      };
      const unmapFrom = (read: boolean, write: boolean) => (start: number, end: number, mirror = 0): number => {
        bus.install([], { start, end, mirror: Number(mirror) | 0, read, write });
        return 0;
      };
      const programSpace = {
        read_byte: (address: number) => bus.read(address),
        write_byte: (address: number, value: number) => bus.write(address, value),
        ...installers(),
        // `install_view(start, end, view)`: the window. A view here overlays
        // the map beneath it entry by entry, and each entry's installs carry
        // their own addresses (`m_boot_view[0].install_read_handler(...)`, the
        // Game Boy's boot ROM), so the window itself places nothing.
        install_view: () => 0,
        // `space(AS_*).specific(m_program)` / `.cache(m_cache)` bind a driver
        // member to this space. The compiler reads the same statement into
        // spaceAccessors, and the member is wired from that just below, so
        // the call itself, which the Spectrum's machine_start makes, binds
        // nothing more.
        specific: () => 0,
        cache: () => 0,
        install_read_tap: (...args: unknown[]) => tapInto('install_read_tap', args),
        install_write_tap: (...args: unknown[]) => tapInto('install_write_tap', args),
        install_readwrite_tap: (...args: unknown[]) => tapInto('install_readwrite_tap', args),
        unmap_read: unmapFrom(true, false),
        unmap_write: unmapFrom(false, true),
        unmap_readwrite: unmapFrom(true, true),
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
      // `space(AS_*).specific(m_program)`: the member is that space, so a
      // read through it runs the map's handlers exactly as the processor's do.
      for (const accessor of machine.execution.spaceAccessors ?? []) {
        if (accessor.cpu !== specification.tag) continue;
        const read = accessor.space === 'io'
          ? (address: number) => bus.in?.(address) ?? 0xff
          : accessor.space === 'opcodes'
            ? (address: number) => (bus.readOpcode ?? bus.read).call(bus, address)
            : (address: number) => bus.read(address);
        const write = accessor.space === 'io'
          ? (address: number, value: number) => bus.out?.(address, value)
          : (address: number, value: number) => bus.write(address, value);
        calls[`${accessor.member}.read_byte`] = read;
        calls[`${accessor.member}.write_byte`] = write;
      }
      const mask = specification.mask ?? 0xffff;
      const busAddress = (address: number) =>
        byteAddress(address, specification.space?.addressShift ?? 0) & mask;
      const timing = this.hostModel(`${specification.tag}.timing`, { previousCycles: 0 });
      // Every read the processor makes, opcode fetches included (see
      // stoppedProcessor): a core that reads nothing over a slice fetched no
      // instruction in it.
      const activity = this.cpuActivity(specification.tag);
      let sliceTarget = 0;
      const signalCallbackCache = new Map<string, BoardIr['callbacks']>();
      const screenSpec = machine.execution.screen;
      const cpuBus: CpuBus = {
        installers: {
          ...installers(),
          unmap_read: (...args: unknown[]) => unmapFrom(true, false)(Number(args[0]), Number(args[1]), Number(args[2] ?? 0)),
          unmap_write: (...args: unknown[]) => unmapFrom(false, true)(Number(args[0]), Number(args[1]), Number(args[2] ?? 0)),
          unmap_readwrite: (...args: unknown[]) => unmapFrom(true, true)(Number(args[0]), Number(args[1]), Number(args[2] ?? 0)),
        },
        // Exactly the callbacks `signal` below would run for this processor.
        boundSignals: new Set(machine.callbacks
          .filter(callback => callback.ownerTag === specification.tag)
          .map(callback => callback.signal)),
        read: address => { activity.reads++; return bus.read(busAddress(address)); },
        // Keep native 16-bit address-map handlers atomic. In particular,
        // Neo Geo's palette RAM self-test writes complete 68000 words; losing
        // these methods here makes the CPU fall back to two byte transactions
        // and the second byte overwrites the first handler value.
        read16be: address => { activity.reads++; return bus.read16be(busAddress(address)); },
        // A 68000 long access is two word accesses on the real bus, so keep
        // it that way: address-space taps must see the same two.
        read32be: address => { activity.reads++; return bus.read32be(busAddress(address)); },
        read16le: address => { activity.reads++; return bus.read16le(busAddress(address)); },
        write16le: (address, data) => bus.write16le(busAddress(address), data),
        ...(bus.readOpcode ? {
          // AS_OPCODES has its own global mask; do not inherit AS_PROGRAM's.
          readOpcode: address => { activity.reads++; return bus.readOpcode!(address); },
        } : {}),
        write: (address, data) => bus.write(busAddress(address), data),
        // The core's own memory_view: the MCS-48's internal ROM, which its
        // EA pin selects or takes away (mcs48_cpu_device::update_ea).
        selectView: (tag, entry) => bus.selectView(tag, entry),
        write16be: (address, data) => bus.write16be(busAddress(address), data),
        write32be: (address, data) => bus.write32be(busAddress(address), data),
        in: bus.in,
        ...(bus.in16be ? { in16be: (port: number) => bus.in16be!(port) } : {}),
        out: bus.out,
        ...(bus.out16be
          ? { out16be: (port: number, data: number) => bus.out16be!(port, data) }
          : {}),
        ...(bus.in16le ? { in16le: (port: number) => bus.in16le!(port) } : {}),
        ...(bus.out16le
          ? { out16le: (port: number, data: number) => bus.out16le!(port, data) }
          : {}),
        ...(specification.interruptAcknowledge ? {
          acknowledge: (level: number) => registry.read[specification.interruptAcknowledge!]?.(
            0xfffff0 | (level << 1),
            Math.max(0, level - 1),
          ) ?? 0xff,
        } : {}),
        timing: (elapsed, target) => {
          const clamped = elapsed < 0 ? 0 : elapsed > target ? target : elapsed;
          this.currentLineFraction = target > 0 ? Math.min(1, elapsed / target) : 0;
          this.runningSliceCycles = clamped;
          sliceTarget = target;
          if (specification.tag === timerClockCpu?.tag) {
            const current = clamped;
            // run() calls timing(0,target) at the start of each slice and
            // timing(target,target) at its end. Advancing by instruction-time
            // deltas lets device timers assert lines between instructions,
            // matching MAME's scheduler instead of batching every edge at the
            // next scanline boundary.
            if (current < timing.previousCycles) timing.previousCycles = 0;
            advanceTimedHardware((current - timing.previousCycles) * timerSecondsPerCycle());
            timing.previousCycles = current === target ? 0 : current;
          } else if (cardClockDevices.has(specification.tag)) {
            if (clamped < timing.previousCycles) timing.previousCycles = 0;
            tickCardDevices(specification.tag, clamped - timing.previousCycles);
            timing.previousCycles = clamped === target ? 0 : clamped;
          }
        },
        // A core parked in its service block (the Z80 holding for BUSREQ)
        // looks again at MAME's next timeslice, which starts at the next
        // timer expiry: while the Z80 DMA transfers, its periodic timer is
        // one DMA clock away, so the Z80 resumes within a clock of the bus
        // being released, as in MAME. Only the processor whose time drives
        // the device clock moves a timer; any other waits out its slice, which
        // the machine's quantum bounds: Donkey Kong's Z80 looks again every
        // 16.7 us while the 8257 holds the bus.
        parked: (elapsed, target) => {
          if (this.perfectTimerRounds) return target - elapsed;
          let soonest = Infinity;
          if (specification.tag === timerClockCpu?.tag) {
            // Asked on every slice a core spends parked -- the SNES's 65C816
            // waits out most of each frame in WAI -- so the devices that keep
            // timers are listed once rather than walked through the map.
            if (this.parkedTimerDevicesSize !== this.devices.size) {
              this.parkedTimerDevices = [...this.devices.values()].filter(device => typeof device.untilNextTimer === 'function');
              this.parkedTimerDevicesSize = this.devices.size;
            }
            const timed = this.parkedTimerDevices;
            for (let index = 0; index < timed.length; index++) {
              const until = timed[index]!.untilNextTimer!() ?? Infinity;
              if (until < soonest) soonest = until;
            }
            // And the driver's own precise timers, which come due on the same
            // clock (firePreciseTimers): the Spectrum's ULA interrupt is a
            // pair of them 32 cycles apart. A slice that ran past both raised
            // and dropped INT with no instruction in between, so the Z80 never
            // took an interrupt, never scanned its keyboard and never beeped.
            if (this.preciseTimerMembers.size && this.pendingTimers.size) {
              const now = this.machineSeconds();
              for (const [member, pending] of this.pendingTimers) {
                if (this.preciseTimerMembers.has(member)) soonest = Math.min(soonest, Math.max(0, pending.at - now));
              }
            }
          }
          return Number.isFinite(soonest)
            ? Math.ceil(soonest / this.secondsPerCycleOf(specification) - CYCLE_ROUNDING)
            : target - elapsed;
        },
        signal: (signal, state) => {
          // Memoized per signal name: the Namco custom-I/O families emit port
          // signals thousands of times per frame, and re-filtering the full
          // callback list on each emit dominated Dig Dug's frame budget.
          let callbacks = signalCallbackCache.get(signal);
          if (!callbacks) {
            callbacks = machine.callbacks.filter(candidate =>
              candidate.ownerTag === specification.tag &&
              candidate.signal === signal);
            signalCallbackCache.set(signal, callbacks);
          }
          let result: number | undefined;
          for (const callback of callbacks) {
            const effect = this.effects.get(callback.id);
            if (!effect) {
              throw new Error(
                `${machine.game}: CPU signal callback "${callback.id}" has no bound effect`,
              );
            }
            // A read's argument is the offset it asks for, passed on as the
            // composite path passes it (the S-SMP's `m_dsp_io_r_cb(1)`).
            const value = effect.reads
              ? effect.run(0, state)
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
      };
      // A CPU compiled whole as its MAME class (device-cpu.ts): the generated
      // device is the core, and this processor slot hosts it.
      const fixtureCpu = this.processorFixture?.processor(type, cpuBus);
      const coreDevice = fixtureCpu ? undefined : this.devices.get(specification.tag)!;
      const cpu: Cpu = fixtureCpu ?? new DeviceCpu(coreDevice!, cpuBus, {
        setInputLine: (line, state) => { this.deviceInputLine(specification.tag, coreDevice!, line, state); },
        acknowledgeLine: line => this.deviceIrqAcknowledge(specification.tag, coreDevice!, line),
      });
      if (specification.interruptMixer !== undefined) {
        cpu.set('m_interrupt_mixer', Number(specification.interruptMixer));
      }
      for (const configuration of machine.devices?.find(device => device.tag === specification.tag)?.configuration ?? []) {
        // A CPU's setters here are numeric; one naming another device's tag
        // is wiring the board already composed. A device core was configured
        // with the rest of the devices.
        if (!coreDevice && cpu.hasMethod(configuration.method) &&
            configuration.args.every(argument => typeof argument === 'number')) {
          cpu.invoke(configuration.method, ...configuration.args as number[]);
        }
      }
      // MAME's 6502 stops between the cycles of an instruction, so a timer
      // that falls due partway through one fires before the instruction's
      // later accesses. Device time arrives here between instructions; when a
      // device asks the time from inside one, the clock is first brought up
      // to where the processor stands, so a timer due earlier fires first and
      // time never runs backwards. The C64's datassette stopped itself
      // whenever its read timer fell due inside the instruction that started
      // the motor: MAME's cassette refuses to move to a negative position.
      if (specification.tag === timerClockCpu?.tag && (cpu.suspendsMidInstruction?.() ?? this.suspendsMidInstruction(specification)) && cpu.elapsedCycles) {
        this.catchUpDeviceTime = (lag = 0) => {
          if (this.deliveringDeviceTime || !this.coreExecuting || this.runningCpu !== specification.tag) return;
          // The processor began this slice where its last one overran to.
          if (this.timerCpuCarriedCycles > 0) {
            const carried = this.timerCpuCarriedCycles;
            this.timerCpuCarriedCycles = 0;
            advanceTimedHardware(carried * timerSecondsPerCycle());
          }
          // Past the slice's target too: the processor really is there, and
          // whatever it overran comes off its next slice (the frame runner's
          // carry), which is where that much device time would otherwise
          // have been delivered.
          const reach = this.runningSliceCycles + cpu.elapsedCycles!() - lag;
          const delivered = timing.previousCycles + this.deviceTimeAheadOfSlice;
          if (!(reach > delivered)) return;
          this.deliveredSliceCycles = reach;
          // Only the fetch lookahead (a negative lag) is a scheduled delivery
          // that waits for the frame's presentation (advanceTimedHardware).
          this.accessCatchingUp = lag >= 0;
          withExclusiveTimerDelivery(() => advanceTimedHardware((reach - delivered) * timerSecondsPerCycle()));
          this.accessCatchingUp = false;
          this.deliveredSliceCycles = undefined;
          if (reach <= sliceTarget) {
            timing.previousCycles = reach;
          } else {
            timing.previousCycles = sliceTarget;
            this.deviceTimeAheadOfSlice = reach - sliceTarget;
          }
        };
      }
      this.cpus.set(specification.tag, cpu);
      this.linkDaisyChain(specification, cpu);
      this.cpuCycles.set(specification.tag, 0);
      this.cpuStalls.set(specification.tag, 0);
      this.cpuHeld.set(specification.tag, false);
      this.cpuReportedSuspended.set(specification.tag, false);
      const acknowledge = machine.callbacks.find(callback =>
        callback.ownerTag === specification.tag &&
        callback.signal === 'set_irq_acknowledge_callback');
      const interruptVector = this.irqVectorSource(specification.tag);
      // A CPU is a MAME device like any other, and a driver reaches into it by
      // name: the Game Boy's 0xffff register is `m_maincpu->set_ie(data)`, and
      // its interrupt enable lives nowhere else. Every method the core lowered
      // from its own source is offered under the driver's finder name, and the
      // board's explicit bindings below take precedence where both exist.
      for (const method of cpu.methodNames?.() ?? []) {
        const invoke = (...args: number[]) => cpu.invoke(method, ...args);
        calls[`${specification.tag}.${method}`] = invoke;
        calls[`m_${specification.tag}.${method}`] = invoke;
      }
      // required_device/optional_device::found(): an execution CPU listed by
      // the machine configuration is necessarily materialized. Driver guards
      // frequently test the finder before raising its interrupt line.
      calls[`${specification.tag}.found`] = () => 1;
      calls[`m_${specification.tag}.found`] = () => 1;
      // device_t::reset from driver code: the NES's machine_reset resets the
      // cartridge PCB and then the CPU, so the reset vector is read through
      // the PCB's banks. Unbound, it answered 0 (#178).
      calls[`m_${specification.tag}.reset`] ??= () => {
        cpu.reset();
        return 0;
      };
      calls[`m_${specification.tag}.set_input_line`] = (line, state) => {
        this.cpuInputLine(
          specification.tag,
          cpu,
          line,
          state,
          state !== 0 ? interruptVector : 0xff,
        );
      };
      calls[`m_${specification.tag}.set_input_line_and_vector`] =
        (line, state, vector) => {
          this.cpuInputLine(
            specification.tag,
            cpu,
            line,
            state,
            vector & 0xff,
          );
        };
      // pulse_input_line(line, attotime::zero) is set_input_line ASSERT then
      // CLEAR, and each goes through set_state_synced: from inside a slice
      // the pulse lands where the round ends, not at once. Applied in place,
      // Frisky Tom's MCU reset (portb_w, from the Z80's slice) restarted the
      // MCU at its own round start, 609 us before MAME's (#284).
      calls[`m_${specification.tag}.pulse_input_line`] = line => {
        const apply = () => {
          const activity = this.cpuActivity(specification.tag);
          activity.quietSlices = 0;
          activity.quietPc = undefined;
          if (line === INPUT_LINE_NMI) cpu.nmi();
          else if (line === INPUT_LINE_RESET) {
            cpu.reset();
            this.cpuHeld.set(specification.tag, false);
            this.cpuResetReleased(specification.tag);
          }
          else {
            cpu.setInputLine(line, 1);
            cpu.setInputLine(line, 0);
          }
        };
        if (this.synchronizesLineFrom(specification.tag)) this.synchronize(apply);
        else apply();
      };
      calls[`m_${specification.tag}.total_cycles`] = () =>
        this.totalCycles(specification.tag);
      // device_execute_interface's time conversions, at the processor's own
      // clock, and `local_time()`, where the processor stands now.
      calls[`m_${specification.tag}.clocks_to_attotime`] = clocks =>
        attotimeSecondsFromTicks(clocks, this.cycleClockOf(specification));
      calls[`m_${specification.tag}.attotime_to_cycles`] = seconds =>
        Math.floor(Number(seconds) / this.secondsPerCycleOf(specification) + CYCLE_ROUNDING);
      // Unbound, The Simpsons' four-cycle NMI block lasted no time at all, and
      // a K053260 tick landing between the $FA00 write and the HALT left the
      // sound Z80 halted for good under timer-ended rounds.
      calls[`m_${specification.tag}.cycles_to_attotime`] = cycles =>
        Number(cycles) * this.secondsPerCycleOf(specification);
      calls[`m_${specification.tag}.local_time`] = () => this.cpuSeconds(specification);
      calls[`m_${specification.tag}.set_unscaled_clock`] = clock => {
        this.setCpuClock(specification, Number(clock));
        return 0;
      };
      // MAME's device_state_interface, by the state index the CPU's own lowered
      // enum gives the driver (`m_maincpu->state_int(Z80_HL)`).
      calls[`m_${specification.tag}.state_int`] = state => cpu.stateInt(state);
      // device_state_interface::pc() and pcbase(): the same table at its
      // generic indices. Unbound, the SNES's open bus (`read_byte(pc() - 1)`)
      // read the byte at -1 instead of the operand the 65C816 last fetched.
      calls[`m_${specification.tag}.pc`] = () => cpu.stateInt(DEFAULT_CONSTANTS.STATE_GENPC!);
      calls[`m_${specification.tag}.pcbase`] = () => cpu.stateInt(DEFAULT_CONSTANTS.STATE_GENPCBASE!);
      // And its write half: a snapshot loader restores every register this
      // way, and the core's state_import settles what the write implies.
      calls[`m_${specification.tag}.set_state_int`] = (state, value) => {
        cpu.setStateInt?.(Number(state), Number(value));
        return 0;
      };
      // A driver charges its own CPU for cycles hardware stole from it (Congo
      // Bongo's sprite DMA bills five per entry copied).
      calls[`m_${specification.tag}.adjust_icount`] = delta => {
        this.adjustGeneratedIcount(specification.tag, delta);
        return 0;
      };
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
      const cpuSpecification = machine.devices?.find(device => device.tag === specification.tag);
      const cpuMethodNames = [
        'set_input_line', 'set_input_line_and_vector', 'pulse_input_line', 'total_cycles',
        'suspended', 'state_int', 'set_state_int', 'adjust_icount', 'found', 'set_unscaled_clock',
        'clocks_to_attotime', 'cycles_to_attotime', 'attotime_to_cycles', 'local_time', 'pc', 'pcbase',
      ];
      this.deviceReferents.set(specification.tag, Object.fromEntries(cpuMethodNames.map(name => [
        name,
        (...args: number[]) => calls[`m_${specification.tag}.${name}`]!(...args),
      ])));
      // A CPU compiled whole is a device, and another device's finder reaches
      // that device itself: it answers device_execute_interface's surface
      // here too, as MAME's CPU does to anyone holding it. The Namco 06xx
      // asks its CPU `suspended(SUSPEND_REASON_HALT | ...)` before an NMI.
      if (coreDevice && cpu instanceof DeviceCpu) {
        const self = (coreDevice as unknown as { members?: { this?: Record<string, unknown> } }).members?.this;
        if (self) {
          for (const name of cpuMethodNames) {
            self[name] = (...args: number[]) => calls[`m_${specification.tag}.${name}`]!(...args);
          }
        }
      }
      // A hosted processor named like the machine's own does not displace it:
      // the 1541's `m_maincpu` reaches the drive's 6502 in the drive's scope
      // only, or the C64 driver's halt and reset would land on the drive.
      const member = cpuSpecification?.member &&
        !(cpuSpecification.hostTag && rootMembers.has(cpuSpecification.member) && inComposedCard(cpuSpecification.tag))
        ? cpuSpecification.member : undefined;
      if (member) {
        const cpuMethods = [
          'set_input_line', 'set_input_line_and_vector', 'pulse_input_line', 'total_cycles',
          'suspended', 'state_int', 'set_state_int', 'adjust_icount', 'found', 'set_unscaled_clock',
          'clocks_to_attotime', 'cycles_to_attotime', 'attotime_to_cycles', 'local_time', 'pc', 'pcbase',
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
        if (finderElement(member)) {
          placeFinderElement(this.state, member, adapter);
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
    // A device finder is the device, whatever a share happens to be called:
    // Gauntlet's motion-object RAM is share "mob" and its
    // atari_motion_objects_device is `m_mob`. The share's default `m_<tag>`
    // alias gives way, or every `m_mob->set_xscroll()` wrote into RAM.
    const deviceMembers = new Set((machine.devices ?? []).flatMap(device => device.member ? [device.member] : []));
    for (const [tag, bytes] of Object.entries(this.shares)) {
      const declaredBits = machine.execution.shareBindings
        ?.find(binding => binding.share === tag)?.bits;
      const cpuOwnedBits = machine.execution.cpus.some(cpu =>
        cpu.space?.dataWidth === 16 &&
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
        deviceMembers,
      );
    }

    for (const [tag, device] of this.devices) {
      for (const signal of device.signalNames()) {
        wireGeneratedDevice(device, machine, tag, signal, this.effects);
      }
    }
    // How a hosted or autonomous processor runs a number of cycles. One that
    // runs itself is also kept as `direct`, so the loop that delivers each
    // instruction's time (three processors on a C64, after every instruction)
    // makes one method call rather than going through a closure first.
    const processorRunner = (device: Device): {
      direct?: Device & { runCycles(cycles: number): number };
      run(cycles: number): number;
    } => ({
      ...(device.runCycles ? { direct: device as Device & { runCycles(cycles: number): number } } : {}),
      run: (cycles: number) => {
        if (device.runCycles) return device.runCycles(cycles);
        device.set(device.icountMember ?? 'm_icount', cycles);
        device.call('execute_run');
        return cycles - device.get(device.icountMember ?? 'm_icount');
      },
    });
    const executionCpuTags = new Set(machine.execution.cpus.map(cpu => cpu.tag));
    const hostedProcessors = (machine.devices ?? []).flatMap(specification => {
      if (!specification.hostTag) return [];
      // A CPU compiled as a device is the board's processor already.
      if (executionCpuTags.has(specification.tag)) return [];
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
      // A processor with firmware of its own and no host device: it runs as
      // MAME runs any CPU, through its own execute_run and m_icount.
      if (
        device && !host && firmware &&
        device.methodNames().includes('execute_run') &&
        device.methodNames().includes('execute_set_input')
      ) {
        return [{
          tag: specification.tag,
          clock: device.cycleClock(),
          enabled: () => !this.cpuHeld.get(specification.tag),
          ...processorRunner(device),
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
        specification.member,
      );
      return [{
        tag: specification.tag,
        clock: device.cycleClock(),
        enabled,
        ...processorRunner(device),
      }];
    });
    // And the processors inside a card a slot mounted (an SNES DSP
    // cartridge's uPD7725): the card is chosen from the image, so the machine
    // config does not name them, but MAME schedules them like any CPU.
    // They exchange data with the board's first processor through the card
    // (the uPD7725's data register), and a host that reads four results back
    // to back without polling, as Super Mario Kart's raster command does,
    // needs the DSP where MAME's stands at each access. So they keep a clock
    // of their own: run up to the first processor's time, mid-instruction
    // included, at every delivery and before every access to their card.
    const leader = machine.execution.cpus[0];
    const nested = [...this.devices.values()].flatMap(device => device.nestedProcessors?.() ?? []).map(entry => ({
      ...entry, clock: entry.device.cycleClock(), runner: processorRunner(entry.device),
    }));
    if (nested.length && leader) {
      // Where their cycle counts start, on the leader's clock: built with the
      // board, so a board built to load a state into starts from the same
      // point, and each device saves its own count (executedCycles).
      const origin = this.cpuSeconds(leader);
      let syncing = false;
      this.syncNestedProcessors = () => {
        if (syncing) return;
        syncing = true;
        try {
          const now = this.cpuSeconds(leader);
          for (const entry of nested) {
            const owed = Math.floor((now - origin) * entry.clock) - (entry.device.totalCyclesNow?.() ?? 0);
            if (owed > 0) entry.runner.run(owed);
          }
        } finally {
          syncing = false;
        }
      };
    }
    // Standalone bus masters expose MAME's execute_run/m_icount pair but have
    // no firmware host: the Intel 8257 on Donkey Kong, a POKEY, the C64's
    // VIC-II and CIAs. MAME schedules them in the round beside the CPUs,
    // after them, so inside a CPU's slice such a device stands where the last
    // round left it: a POKEY read returns RANDOM from there, and the read's
    // synchronize() ends the slice so the next one finds the chip caught up.
    // Their own time while they run is their own (machineSeconds), as a
    // stream update inside step_one_clock needs. Under a perfect quantum
    // MAME's round is one cycle, which delivery between instructions with an
    // access catching the device up (deviceAccessLag) already is; those stay
    // with the hosted processors.
    const roundProcessor = (
      tag: string,
      device: Device,
      runner: ReturnType<typeof processorRunner>,
      suspended: (() => 'eating' | 'waiting' | undefined) | undefined,
    ) => {
      const round = this.roundDevices.get(tag) ?? { cycles: 0, running: undefined };
      this.roundDevices.set(tag, round);
      return {
        tag,
        clock: device.cycleClock(),
        ...(suspended ? { suspended } : {}),
        ...(device.abortTimeslice ? { abort: () => device.abortTimeslice!() } : {}),
        run: (cycles: number) => {
          const outer = this.runningRoundDevice;
          this.runningRoundDevice = tag;
          round.running = { device, target: cycles };
          try {
            const executed = runner.run(cycles);
            round.cycles += executed;
            return executed;
          } finally {
            round.running = undefined;
            this.runningRoundDevice = outer;
          }
        },
      };
    };
    const autonomousProcessors = (machine.devices ?? []).flatMap(specification => {
      if (!roundScheduledDevice(machine, specification)) return [];
      const device = this.devices.get(specification.tag);
      if (!device?.methodNames().includes('execute_run')) return [];
      return [roundProcessor(specification.tag, device, processorRunner(device),
        device.suspended ? () => device.suspended!() : undefined)];
    });
    // A hosted MCU or DSP is an execute device like any other, and MAME runs
    // it in the round beside its host. Held in reset it eats its slice, as
    // MAME's SUSPEND_REASON_RESET does. Under a perfect quantum it stays
    // delivered between instructions, as the round devices do.
    const roundHosted = machine.execution.perfectQuantum !== true;
    for (const processor of roundHosted ? hostedProcessors : []) {
      const device = this.devices.get(processor.tag)!;
      const enabled = processor.enabled;
      // The reset line is the board's (configureHostedProcessor), not the
      // device's own suspension, so the slice is eaten here. Run while held,
      // Xevious's 51xx was in its idle loop when MAME's had just left reset.
      const runner = { run: (cycles: number) => enabled() ? processor.run(cycles) : cycles };
      autonomousProcessors.push(roundProcessor(processor.tag, device, runner,
        () => enabled() ? undefined : 'eating'));
    }
    this.roundProcessors = autonomousProcessors;
    // Firmware MCUs and clocked peripherals share elapsed board time with the
    // CPU. A whole-scanline slice leaves counter reads stale and can collapse
    // several input transitions before the peripheral observes any of them.
    // Deliver source clocks at instruction boundaries, as for device timers.
    const synchronizedProcessors: (ReturnType<typeof processorRunner> & {
      tag: string;
      clock: number;
      /** Absent for a processor that always runs. */
      enabled?: () => boolean;
    })[] = [
      ...roundHosted ? [] : hostedProcessors,
      // Under a perfect quantum, delivered between instructions as above
      // (roundScheduledDevice).
      ...(machine.devices ?? []).flatMap(specification => {
        if (specification.hostTag || machine.execution.cpus.some(cpu => cpu.tag === specification.tag) ||
          roundScheduledDevice(machine, specification)) return [];
        const device = this.devices.get(specification.tag);
        if (!device?.methodNames().includes('execute_run')) return [];
        return [{ tag: specification.tag, clock: device.cycleClock(), ...processorRunner(device) }];
      }),
    ];
    // The fractional cycles each processor is owed between instruction-time
    // deliveries. Delivered after every instruction -- three times per C64
    // instruction, for the VIC-II and both CIAs -- so the running values live
    // in a plain array; the Map registered for the save state (machine-state.ts)
    // is written from it before a capture and read back after a restore,
    // which keeps every existing save's shape.
    const hostedCarry = this.hostModel(
      'hostedCarry',
      new Map(synchronizedProcessors.map(processor => [processor.tag, 0])),
    );
    const carries = new Float64Array(synchronizedProcessors.length);
    this.stateSyncs.push({
      capture: () => synchronizedProcessors.forEach((processor, index) =>
        hostedCarry.set(processor.tag, carries[index]!)),
      restored: () => synchronizedProcessors.forEach((processor, index) => {
        carries[index] = hostedCarry.get(processor.tag) ?? 0;
      }),
    });
    hostsProcessors = synchronizedProcessors.length > 0 || this.syncNestedProcessors !== undefined;
    tickHostedProcessors = seconds => {
      if (!(seconds > 0)) return;
      this.syncNestedProcessors?.();
      for (let index = 0; index < synchronizedProcessors.length; index++) {
        const processor = synchronizedProcessors[index]!;
        if (processor.enabled && !processor.enabled()) {
          carries[index] = 0;
          continue;
        }
        const carry = carries[index]! + seconds * processor.clock;
        const target = Math.floor(carry);
        if (target <= 0) {
          carries[index] = carry;
          continue;
        }
        carries[index] = carry - (processor.direct
          ? processor.direct.runCycles(target)
          : processor.run(target));
      }
    };
    // A machine-config device whose behaviour is compiled board handlers
    // rather than an executable core (MAME's protection interface devices are
    // the common case). MAME reaches those methods through the finder member,
    // and an unresolved `m_member->method()` silently evaluates to zero — that
    // is how Arkanoid's MCU never saw its own reset line. The device's class
    // hierarchy is what says whose `reset_w` a member call means.
    for (const specification of machine.devices ?? []) {
      if (this.devices.has(specification.tag)) continue;
      const hierarchy = specification.classHierarchy ?? [];
      if (!hierarchy.length) continue;
      const aliases = [
        specification.member,
        specification.tag,
        `m_${specification.tag}`,
      ].filter((alias): alias is string => Boolean(alias));
      for (const alias of aliases) {
        // required_device/optional_device finders: the board instantiated it.
        this.bindings.calls![`${alias}.found`] ??= () => 1;
      }
      const bound = new Set<string>();
      for (const className of hierarchy) {
        for (const handler of machine.handlers ?? []) {
          if (handler.ownerClass !== className || bound.has(handler.method)) continue;
          if (!handler.program || handler.program.diagnostics.length) continue;
          bound.add(handler.method);
          const names = handlerParameterNames(handler.parameters);
          const run = (...args: unknown[]) => executeGeneratedMachineHandler(
            machine,
            handler,
            this.bindings,
            Object.fromEntries(names.map((name, index) => [name, args[index] ?? 0])),
          ) ?? 0;
          for (const alias of aliases) {
            this.bindings.calls![`${alias}.${handler.method}`] ??= run;
          }
        }
      }
    }
    // A delegate member the driver init points at one of its own handlers:
    // System 16A's misc_io_r calls `m_custom_io_r(offset)`, which init_generic
    // set to standard_io_r. Calling the member runs that handler.
    for (const { member, handler: key } of machine.execution.initDelegates ?? []) {
      const handler = machine.handlers?.find(candidate => `${candidate.ownerClass}.${candidate.method}` === key)!;
      const names = handlerParameterNames(handler.parameters);
      this.bindings.calls![member] = (...args: unknown[]) => executeGeneratedMachineHandler(
        machine,
        handler,
        this.bindings,
        Object.fromEntries(names.map((name, index) => [name, args[index] ?? 0])),
      ) ?? 0;
    }
    // A device_delegate configured in machine_config: the driver names the
    // device's inline setter (m_sprgen->set_pri_callback(FUNC(state::pri_cb)))
    // while the device's own code calls the member that setter assigns. The
    // device IR carries that setter -> member map, so the two halves connect
    // without either side naming the other.
    for (const callback of machine.callbacks) {
      const device = this.devices.get(callback.ownerTag);
      // A device with its own generated module carries the setter -> member
      // map itself. A device whose methods are the board's handlers has no
      // module to ask, so the IR carries the member on the callback.
      const member = device?.delegates?.()[callback.signal] ?? callback.member;
      if (!member || !callback.targetMethod) continue;
      // Or a method of another device: the TMS34010 draws each line through
      // `set_scanline_ind16_callback(m_video, FUNC(midtunit_video_device::
      // scanline_update))`, and moves VRAM rows through the shift-register pair.
      const targetDevice = callback.targetTag ? this.devices.get(callback.targetTag) : undefined;
      if (device && callback.delegate && targetDevice?.methodNames().includes(callback.targetMethod)) {
        const method = callback.targetMethod;
        device.bindCall(member, (...args: unknown[]) => targetDevice.invoke(method, ...args as GeneratedCallArgument[]),
          targetDevice.parameters(method).join(', '));
        continue;
      }
      const handler = machine.handlers?.find(candidate =>
        candidate.ownerClass === callback.targetClass &&
        candidate.method === callback.targetMethod);
      if (!handler?.program || handler.program.diagnostics.length) continue;
      const parameters = handlerParameterDescriptors(handler.parameters);
      const invoke = (...args: unknown[]) =>
        executeGeneratedMachineDelegate(
          machine,
          handler,
          this.bindings,
          Object.fromEntries(parameters.map((parameter, index) => [
            parameter.name,
            parameter.mutableReference
              ? args[index] ?? 0
              : generatedReferent(args[index] ?? 0),
          ])),
        ) ?? 0;
      if (device) {
        device.bindCall(member, invoke, handler.parameters);
        continue;
      }
      // Only a delegate the device calls itself; a devcb is dispatched as a
      // board connection and must keep going through its effect.
      if (!callback.delegate) continue;
      this.bindings.calls![member] ??= invoke;
      // The callee's own parameter list, so a `u32 &seg` argument reaches it
      // as an lvalue and its writes land back in the calling device's member.
      // wardner's DSP addresses host RAM entirely through two such
      // out-parameters; without them every segment stayed zero.
      (this.bindings.callParameters ??= {})[member] ??= (handler.parameters ?? '')
        .split(',')
        .map(parameter => parameter.trim())
        .filter(Boolean);
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
          if (activeFramebuffer) video?.updatePartial(activeFramebuffer, line, this.beamLine());
        },
        address => this.cpuBuses.get(machine.execution.cpus[0]?.tag ?? '')?.read(address) ?? 0,
        this.shares,
        () => this.vectorPoints.points,
      );
      primitives.deviceMembers = tag => (this.devices.get(tag) as { members?: Record<string, unknown> } | undefined)?.members;
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
      // Devices are constructed before the video host so CPUs and callbacks
      // can bind in one pass. Their framework-owned finders become available
      // here: bind the live decoded-gfx interface and source-created tilemaps
      // into any device that declares the corresponding member.
      for (const device of this.devices.values()) {
        device.bindMember('m_gfxdecode', this.state.m_gfxdecode);
        const created: unknown[] = [];
        for (const plan of machine.video?.tilemaps ?? []) {
          const indexed = /^(m_\w+)\[\s*(\d+)\s*\]$/.exec(plan.member);
          const member = indexed?.[1] ?? plan.member;
          device.bindMember(member, this.state[member]);
          if (device.hasMember(member)) {
            created.push(indexed ? (this.state[member] as unknown[] | undefined)?.[Number(indexed[2])] : this.state[member]);
          }
        }
        // A device that creates its tilemaps in its own device_start (started
        // after this; see startReadsHostBindings) gets the ones the plan built
        // for its members, in the order its source creates them.
        let nextCreated = 0;
        if (created.length) device.bindCall('machine().tilemap().create', () => created[nextCreated++] ?? 0);
        // One that creates them into storage no plan names (segaic16's struct
        // fields) gets each built from the call's own arguments, its tile
        // callback the get_info delegate it passes.
        else {
          device.bindCall('machine().tilemap().create', (decode, getInfo, mapper, width, height, columns, rows) =>
            primitives.createTilemap(decode, deviceDelegate(device, getInfo), mapper, width, height, columns, rows),
          'gfxdecode_device &decode, tilemap_get_info_delegate tile_get_info, tilemap_standard_mapper mapper, ' +
            'u16 tilewidth, u16 tileheight, u32 cols, u32 rows');
        }
      }
      // MAME's device_gfx_interface gives a device its own decoded graphics,
      // and its draw routines call the bare `gfx(n)` of that set rather than
      // the driver's m_gfxdecode. The decode member on each plan entry is what
      // ties the two together; without this binding such a device draws
      // nothing at all (Rygar's sprites live on TECMO_SPRITE).
      //
      // A device can also build its set itself in device_start: the K053246
      // decodes its sprite ROM through konami_decode_gfx, which hands the
      // element to the device's own `set_gfx` and reads `palette()` for the
      // colour count.
      for (const specification of machine.devices ?? []) {
        const device = this.devices.get(specification.tag);
        if (!device) continue;
        const member = specification.member;
        const group = (member && primitives.gfxForDecodeMember(member)) || [];
        const own: unknown[] = [];
        // A device's own method of the name is its own (a palette device's
        // `palette()`); the binding would win over it.
        const methods = new Set(device.methodNames());
        const bind = (name: string, call: (...args: never[]) => unknown) => {
          if (!methods.has(name)) device.bindCall(name, call as (...args: unknown[]) => unknown);
        };
        bind('gfx', (index: number) => own[index] ?? group[index] ?? 0);
        bind('set_gfx', (index: number, element: unknown) => {
          own[Number(index)] = element;
          return 0;
        });
        bind('palette', () => primitives.devicePalette() ?? 0);
        bind('std::make_unique<gfx_element>', (...args: unknown[]) => primitives.makeGfxElement(...args));
        // bitmap.h's rectangle(minx, maxx, miny, maxy), which a renderer
        // builds its destination clip from.
        bind('rectangle', (minX = 0, maxX = 0, minY = 0, maxY = 0) =>
          new GeneratedRectangle(Number(minX), Number(maxX), Number(minY), Number(maxY)));
        if (group.length && device.hasMember('m_gfx')) device.bindMember('m_gfx', group[0]);
      }
      // A video-display processor draws its own picture: hand the renderer the
      // generated device's update instead of a driver handler to execute.
      const deviceTag = machine.execution.screenUpdate.deviceTag;
      const updateMethod = machine.execution.screenUpdate.handler.split('.').pop()!;
      // MAME's vector_device is the display, not hardware: what its
      // screen_update does is hand the generators' beam list to the render
      // system, which is presentation (vector-display.ts).
      const vectorDisplay = deviceTag !== undefined &&
        machine.devices?.some(device => device.tag === deviceTag && device.type === 'VECTOR');
      const deviceUpdate: DeviceScreenUpdate | undefined = vectorDisplay
        ? (screen, bitmap) => presentVectorDisplay(this.vectorPoints.points, screen, bitmap)
        : deviceTag
        ? (screen, bitmap, cliprect) => {
            const device = this.devices.get(deviceTag);
            // A processor can own the screen: the TMS34010 draws each line
            // through its own tms340x0_ind16.
            const cpu = device ? undefined : this.cpus.get(deviceTag);
            if (!device && !cpu?.hasMethod(updateMethod)) {
              throw new Error(
                `${machine.game}: screen-update device "${deviceTag}" is not composed`,
              );
            }
            return Number(device
              ? device.invoke(updateMethod, screen, bitmap, cliprect)
              : cpu!.invoke(updateMethod, screen as never, bitmap as never, cliprect as never)) || 0;
          }
        : undefined;
      video = new GeneratedVideoRenderer(machine, primitives, deviceUpdate);
      this.video = video;
      // MAME's `update_now()` is `update_partial(vpos(), hpos())`: the
      // picture up to the beam, mid-line included. The Spectrum calls it on
      // every border or screen-memory write, which is what draws its raster
      // effects where they happened.
      const screenDevice = machine.devices?.find(device => device.type === 'SCREEN');
      const screenOwners = [screenDevice?.tag, screenDevice?.member, 'm_screen'].filter(Boolean) as string[];
      // A device's update_now() (the NES Zapper's sensor) brings the picture
      // up to the beam whatever the update mode; a driver's own keeps the
      // partial-mode rule below, since a driver's screen update may have side
      // effects a mid-frame call would repeat.
      this.screenUpdateNow = () => {
        if (activeFramebuffer) video?.updateNow(activeFramebuffer, this.beamLine(), this.beamHpos());
      };
      this.screenUpdatePartial = (line, beam) => {
        if (activeFramebuffer) video?.updatePartial(activeFramebuffer, line, beam);
      };
      const screen = machine.execution.screen;
      this.screenPixel = (x, y) => {
        const column = Math.floor(x) - (screen.xOffset ?? 0);
        const row = Math.floor(y) - (screen.yOffset ?? 0);
        if (!activeFramebuffer || column < 0 || row < 0 || column >= this.fbWidth || row >= this.fbHeight) return 0;
        const canvas = activeFramebuffer[row * this.fbWidth + column]!;
        // Canvas order is 0xAABBGGRR; an rgb_t is 0xAARRGGBB.
        return (0xff000000 | ((canvas & 0xff) << 16) | (canvas & 0xff00) | ((canvas >>> 16) & 0xff)) >>> 0;
      };
      for (const owner of new Set(screenOwners)) {
        calls[`${owner}.hpos`] = () => this.beamHpos();
        calls[`${owner}.update_now`] = () => {
          if (activeFramebuffer) video?.updatePartialAt(activeFramebuffer, this.beamLine(), this.beamHpos());
          return 1;
        };
      }
    }
    const configurationOrder = new Map((machine.devices ?? []).map((device, index) => [device.tag, index]));
    const executeDevices = [...this.devices.values()].filter(device =>
      device.applySuspendChanges && device.methodNames().includes('execute_run'));
    // MAME's rounds are its quantum long, and a perfect_quantum window's its
    // perfect interleave, only where every device that executes runs in the
    // round; only a perfect quantum still hosts MCUs on device time.
    const roundTags = new Set([...machine.execution.cpus.map(cpu => cpu.tag), ...this.roundProcessors.map(processor => processor.tag)]);
    const roundQuantum = (machine.execution.executeDevices ?? []).every(device => roundTags.has(device.tag));
    // MAME's rounds end at the soonest timer, which needs the devices to
    // stand where the processors do, not settled a span of lines ahead of
    // them. Under a perfect quantum every round is already a cycle.
    // A watchdog kick arms three seconds off; with no other device timer
    // pending, that aborted Rygar's sound CPU at every kick.
    //
    // Only a timer that becomes the soonest ends the slice (emu_timer::adjust:
    // `if (this == m_scheduler.first_timer()) abort_timeslice()`), and work a
    // processor earlier in the round synchronized is a timer too, waiting at
    // the time it was posted. Gauntlet's 68010 writes its sound latch, which
    // synchronizes; its 6502, running up to where the 68010 stopped, then
    // strobes a byte into the TMS5220, whose READY timer is armed 25 us on.
    // That is behind the latch's, so MAME's 6502 runs on and reads the latch
    // flag clear once more. Ended there, ours next ran only to the latch
    // write, and read the flag set (#296).
    const armedTimer = (seconds: number, fromBase = seconds + this.roundDeviceOffset + this.roundDelivered): void => {
      if (!(seconds + 1e-9 < this.roundTimerBudget)) return;
      if (!(seconds < (this.frameRunner?.frameSeconds ?? Infinity))) return;
      this.roundTimerBudget = Math.max(0, seconds - 1e-9);
      const work = this.scheduledWork;
      for (let index = 0; index < work.length; index++) {
        if (work[index]!.at - this.roundBaseSeconds <= fromBase) return;
      }
      this.frameRunner?.requestSynchronize();
    };
    // The same for a timer the driver arms (roundTimerMembers), which is
    // measured from the round's base: the devices have been given
    // `roundDelivered` of the round already.
    const armedRoundTimer = (seconds: number): void => armedTimer(seconds - this.roundDelivered, seconds);
    // Where the round stands on the processors' own clock, the one a driver
    // timer's expiry is kept on: its base, or its end once every processor
    // has run to it.
    const roundSeconds = (atEnd: boolean): number => timerClockCpu
      ? this.cpuSeconds(timerClockCpu) - this.frameRunner.secondsAhead(timerClockCpu.tag, atEnd)
      : 0;
    // MAME's execute_timers for the driver's timers: every one due by `now`
    // fires, the earliest first, and so does any its callback arms for a
    // time already reached.
    const fireRoundTimers = (now: number): void => {
      if (this.soonestRoundEnding() > now + ROUND_TIMER_SLOP_SECONDS) return;
      for (let fired = 0; fired < 64; fired++) {
        let due: string | undefined;
        let earliest = now + ROUND_TIMER_SLOP_SECONDS;
        for (const [member, pending] of this.pendingTimers) {
          if (pending.at <= earliest && this.timerEndsRound(member)) {
            due = member;
            earliest = pending.at;
          }
        }
        if (due === undefined) return;
        this.genericTimerFires.get(due)?.();
      }
    };
    const soonestRoundTimer = (now: number): number => this.soonestRoundEnding() - now;
    // A round device arms from the round's base, where MAME's machine time
    // stands through the timeslice (timerArmBase).
    const armBase = (): number =>
      this.runningRoundDevice !== undefined && !this.deliveringDeviceTime ? this.roundDelivered : 0;
    // A processor other than the one the device clock follows arms from its
    // own local time (timerArmLead): in its slice, or in the work it posted
    // with synchronize(), which runs at the time it was posted. The devices
    // stand at the round's base, plus what they stood off it when it began,
    // plus what the round has delivered since.
    const armLead = (): number => {
      if (this.deliveringDeviceTime || this.runningRoundDevice !== undefined) return 0;
      const tag = this.runningCpu ?? this.workPoster;
      if (tag === undefined) return 0;
      // The processor the device clock follows is followed only as far as
      // its core last reported its time (timing()): a Z80 reports at its
      // slice's ends, and the devices stand at the slice's start until then.
      // A timer it arms runs from where it stands, so the devices' lag is a
      // lead like any other processor's. Counted from the devices, Mario's
      // Z80 DMA fired 66 us early, before the processor that enabled it had
      // got there, and Rampage's sound CTC 18 us early (#278).
      if (tag === timerClockCpu?.tag) {
        if (this.runningCpu !== tag) return 0;
        const lead = this.roundBaseSeconds + this.roundDeviceOffset + this.roundDelivered - this.machineSeconds();
        return lead < 0 ? lead : 0;
      }
      const now = this.runningCpu !== undefined ? this.machineSeconds() : generatedTimerExpiry();
      if (now === undefined) return 0;
      return this.roundBaseSeconds + this.roundDeviceOffset + this.roundDelivered - now;
    };
    // A perfect quantum whose processor the board names runs MAME's own rounds
    // (frame runner perfectRounds), and those end at the soonest timer too.
    // ... where every device that executes runs in the round, so MAME's
    // rounds are modelled whole (roundQuantum); the C64's VIC-II and CIAs run
    // on device time instead, and keep the lockstep that matches MAME there.
    const perfectRounds = machine.execution.perfectQuantum === true && machine.execution.perfectQuantumTag !== undefined &&
      machine.execution.cpus.length > 1 && roundQuantum;
    const timerRounds = roundQuantum && (machine.execution.perfectQuantum !== true || perfectRounds);
    // Asked every round, so only the devices that own a timer: the ones the
    // device clock ticks. Walking every device cost Lagrange Point a fifth
    // of its frame.
    const timerDevices = [...timedDevices, ...cardDeviceSet];
    if (timerRounds) this.deviceClockFollowsProcessors = true;
    this.roundTimers = timerRounds;
    // sound_manager's update timer (sound.cpp): armed at power-on for
    // STREAMS_UPDATE_ATTOTIME and every period after, on every machine. It is
    // a scheduler timer, so MAME's rounds end on it. Its callback mixes,
    // which our mixer does on its own cadence; what it changes for the
    // processors is only where a round ends. Venture's sound CPU read its
    // PIA's CA1 flag a round early without it (#275).
    const streamsUpdateHz = machine.execution.streamsUpdateFrequency;
    if (timerRounds && streamsUpdateHz !== undefined) {
      const member = 'sound_manager.update';
      this.roundTimerMembers.add(member);
      this.genericTimerFires.set(member, () => {
        const pending = this.pendingTimers.get(member);
        if (!pending) return;
        // Counted in periods, so the expiry stays on the 50 Hz grid.
        const next = pending.param + 1;
        this.pendingTimers.set(member, { at: next / streamsUpdateHz, param: next });
      });
      this.pendingTimers.set(member, { at: 1 / streamsUpdateHz, param: 1 });
    }
    this.perfectTimerRounds = perfectRounds && timerRounds;
    // The device whose timer the last soonestTimer() found, for its exact expiry.
    let soonestDevice: Device | undefined;
    const soonestTimer = (): number => {
      let soonest = Infinity;
      soonestDevice = undefined;
      for (let index = 0; index < timerDevices.length; index++) {
        const device = timerDevices[index]!;
        const until = device.untilNextTimer?.() ?? Infinity;
        if (until < soonest) { soonest = until; soonestDevice = device; }
      }
      return soonest;
    };
    // The timer behind the last soonestTimer(), which it has just found.
    const soonestTimerHandle = () => soonestDevice?.soonestTimer?.();
    // MAME's `machine().time()` exactly, for a device timer armed outside a
    // timer's callback (setGeneratedTimerArmExact): the running processor's
    // local time, in its slice, or the scheduler's base between timeslices.
    // Where only seconds are known -- a device running in the round, posted
    // work, a delivery -- the timer keeps no exact expiry.
    this.exactTimeKnown = timerRounds;
    // MAME's perfect interleave (schedule.cpp compute_perfect_interleave): the
    // second shortest cycle time, times its execute_min_cycles(), of every
    // device that executes. Asked when a window opens, as clocks may change.
    const perfectInterleave = (): number | undefined => {
      if (!roundQuantum) return undefined;
      const quanta: number[] = [];
      for (const { tag, minCycles } of machine.execution.executeDevices ?? []) {
        const cpu = [...machine.execution.cpus, ...machine.execution.participants ?? []].find(entry => entry.tag === tag);
        const device = this.devices.get(tag);
        const clock = cpu ? cpu.cycleClock ?? cpu.clock : device?.cycleClock() ?? 0;
        // MAME's minimum_quantum for a device with no clock is a second.
        if (!(clock > 0)) continue;
        const cycles = minCycles ?? (device?.methodNames().includes('execute_min_cycles')
          ? device.call('execute_min_cycles')
          : undefined);
        if (!(cycles !== undefined && cycles > 0)) return undefined;
        quanta.push(cycles / clock);
      }
      return quanta.sort((left, right) => left - right)[1];
    };
    this.frameRunner = new GeneratedFrameRunner({
      machine,
      // MAME's screen starts at the beginning of VBLANK (#184).
      origin: 'vbstart',
      perfectInterleave,
      perfectRounds,
      ...(roundQuantum && machine.execution.maximumQuantum !== undefined
        ? { maximumQuantum: machine.execution.maximumQuantum }
        : {}),
      ...(timerRounds ? {
        nextTimerSeconds: baseLine => {
          let soonest = soonestTimer();
          // A timeslice starts by firing every timer due at its base
          // (execute_timers): one a round device armed overdue last round
          // fires, and catches up its missed periods, before anything runs.
          //
          // The devices stand at the round's base, give or take the rounding
          // of their floating-point clock; a real difference is a presentation
          // holding them back, or a round cut short of where the first
          // processor had already carried them. Ahead of the base, a timer is
          // due once the base has reached it (timerHeadroomSeconds).
          const offset = (this.beamPosition() - baseLine) * this.lineSeconds();
          this.roundDeviceOffset = Math.abs(offset) < 1e-11 ? 0 : offset;
          const headroom = Math.max(0, this.roundDeviceOffset);
          // The round ends at the soonest timer's exact expiry, as MAME's
          // does, and its countdown is put back on it: counted down in seconds
          // it drifts a few hundred attoseconds a period, and the device
          // clock's offset from the base is taken as nothing under 10 ps. A
          // round that ends that short of a timer leaves a processor a whole
          // cycle short of it: Bubble Bobble's sound Z80 read the YM2203's
          // timer flag an instruction early at frame 83 (#278).
          let exactUntil: number | undefined;
          const boundExactly = (): void => {
            exactUntil = undefined;
            if (!Number.isFinite(soonest)) return;
            // Only where the devices stand on the base, give or take the
            // rounding of their clock (a femtosecond or so). Held short of it
            // for the presentation (PRESENT_MARGIN_SECONDS), a countdown
            // anchored to the scheduler's could never come due, and the
            // device clock stood still for three frames.
            const standing = (this.beamPosition() - baseLine) * this.lineSeconds();
            if (Math.abs(standing) > 1e-12) return;
            const timer = soonestTimerHandle();
            const due = timer?.exactDueAttos();
            if (!timer || due === undefined) return;
            const baseAttos = this.frameRunner.baseExact();
            // Only drift: the countdown carries what the exact expiry does not
            // (the arming processor's lead, the round's base), and where the
            // two are further apart than drift, the countdown is the one that
            // stays with MAME. Battlezone's vector generator, started a cycle
            // before its STA ended, kept MAME's POKEY reads to frame 209 on
            // the countdown and lost them at 44 on the exact expiry.
            const exact = Number(due - baseAttos) * 1e-18;
            if (Math.abs(exact - soonest) > EXACT_ANCHOR_LIMIT_SECONDS) return;
            // Standing on the base to the attosecond, as the devices almost
            // always do, the countdown is the seconds just worked out.
            const standingAttos = Math.round(standing * 1e18);
            soonest = standingAttos === 0
              ? timer.anchorAt(exact)
              : timer.anchorTo(baseAttos + BigInt(standingAttos));
            exactUntil = exact;
          };
          boundExactly();
          // Due at the base: within the clocks' rounding, or on the attosecond
          // for a timer held exactly (EXACT_TIMER_TOLERANCE_SECONDS).
          const dueAtBase = (): boolean => exactUntil !== undefined
            ? exactUntil <= EXACT_TIMER_TOLERANCE_SECONDS
            : soonest + headroom <= 1e-10;
          for (let fired = 0; dueAtBase() && fired < 64; fired++) {
            this.roundTimerBudget = Infinity;
            if (headroom > 0) {
              // The devices stand ahead of the base, so the timer is due at a
              // time they have passed: firing it is not device time moving on,
              // and the hold before a presentation does not apply to it. The
              // first processor had carried the devices to the end of the
              // frame, where they are held, when Gauntlet's sound 6502 wrote
              // its TMS5220 a byte; the chip's READY timer, due 25 us on, did
              // not fire until the frame was presented 0.9 ms later, and the
              // 6502 saw the chip busy where MAME's is ready (#296).
              this.firingTimersDueAtBase = true;
              try {
                withGeneratedTimerHeadroom(headroom, () => advanceTimedHardware(1e-12));
              } finally {
                this.firingTimersDueAtBase = false;
              }
            } else {
              advanceTimedHardware(1e-12);
            }
            soonest = soonestTimer();
            boundExactly();
          }
          // No timer fires inside the round: the device clock stops short of
          // the soonest, and the rest waits for the round's end. One the clock
          // has passed already holds it where it stands.
          this.roundTimerBudget = soonest > 1e-9 ? soonest - 1e-9 : soonest + headroom > 1e-10 ? 0 : Infinity;
          // A timer armed inside the round that falls due before its end ends
          // the running slice and becomes the round's bound, as MAME's
          // emu_timer::adjust aborts the timeslice for a new soonest timer.
          setGeneratedTimerArmed(armedTimer);
          this.roundDelivered = 0;
          setGeneratedTimerArmBase(armBase);
          setGeneratedTimerArmLead(armLead);
          const untilDevice = exactUntil ?? soonest + this.roundDeviceOffset;
          // The driver's own timers end the round too, and one already due
          // (armed between rounds, by a frame event) fires before it starts.
          // Read only by a driver timer, by another processor's arming lead
          // and by posted work: a one-processor board with none of them (the
          // NES, a cycle to the round) is not asked for it every round.
          const baseWanted = this.roundTimerMembers.size > 0 || machine.execution.cpus.length > 1
            || this.scheduledWork.length > 0 || this.pendingTimers.size > 0;
          if (baseWanted) this.roundBaseSeconds = roundSeconds(false);
          this.roundTimerArmed = armedRoundTimer;
          // Synchronized work still waiting is a timer at the time it was
          // posted (drainScheduledWork).
          let untilWork = Infinity;
          for (let index = 0; index < this.scheduledWork.length; index++) {
            untilWork = Math.min(untilWork, this.scheduledWork[index]!.at - this.roundBaseSeconds);
          }
          if (!this.pendingTimers.size) return Math.min(untilDevice, untilWork);
          fireRoundTimers(this.roundBaseSeconds);
          const untilDriver = soonestRoundTimer(this.roundBaseSeconds);
          if (untilDriver < this.roundTimerBudget) this.roundTimerBudget = Math.max(0, untilDriver - 1e-9);
          return Math.min(untilDevice, untilDriver, untilWork);
        },
        onRoundEnd: line => {
          setGeneratedTimerArmed(undefined);
          setGeneratedTimerArmBase(undefined);
          setGeneratedTimerArmLead(undefined);
          this.roundTimerBudget = Infinity;
          // What the processor that drives the device clock ran past the
          // timer is not delivered here: the round may have ended short of
          // the timer (a slow MCU's whole cycle pulls it back), and MAME fires
          // a timer only once every processor stands at it. Released whole,
          // Galaga's 51xx took the 06xx's chip select two instructions early.
          // The devices stand at the round's end, as MAME's timers do. A
          // processor whose last instruction overran the round delivered only
          // up to its target, and sitting out the rounds its overrun covers
          // it delivers nothing: Mario's Z80 DMA, clocked a DMA cycle per
          // round, fell so far behind that the Z80 dropped RDY before the
          // DMA had asked for the bus.
          const behind = (line - this.beamPosition()) * this.lineSeconds();
          if (behind > 1e-12) advanceTimedHardware(behind);
          // Every processor stands at the round's end: the driver's timers
          // due there fire, after the devices' own.
          this.roundTimerArmed = undefined;
          if (this.pendingTimers.size) fireRoundTimers(roundSeconds(true));
        },
      } : {}),
      processors: [...machine.execution.cpus.map(specification => {
        // Resolved once for the processor rather than looked up per slice.
        const activity = this.cpuActivity(specification.tag);
        let core: Cpu & { device?: { spaceReads?: number } } | undefined;
        const spaceReads = (): number => (core ??= this.cpus.get(specification.tag) as typeof core)?.device?.spaceReads ?? 0;
        return {
        tag: specification.tag,
        enabled: () => !this.cpuHeld.get(specification.tag),
        // Held in RESET or HALT it is suspended, and MAME's
        // rebuild_execute_list runs it after every active device. Wardner's
        // main Z80, halted while its TMS32010 works, kept its first place:
        // it ate to the round's end before the DSP let it go, and resumed
        // 19 cycles after MAME's, which the DSP's synchronize had stopped short.
        suspended: () => this.cpuHeld.get(specification.tag) ? 'eating' as const : undefined,
        // Held in RESET or HALT, MAME's timeslice still books the slice to
        // the processor (eatcycles): its machine time while it runs again is
        // the machine's, not short by every cycle it sat out. Rampage's sound
        // 68000, held 0.9 s at boot, stamped each DAC write 0.9 s behind the
        // mixer, so none rendered at its own time.
        eat: (cycles: number) => {
          this.cpuCycles.set(specification.tag, (this.cpuCycles.get(specification.tag) ?? 0) + cycles);
          this.soundRuntime?.cpuTimeMoved?.(specification.tag);
        },
        abort: () => this.cpus.get(specification.tag)?.abortTimeslice?.(),
        // Stopped for an interrupt (stoppedProcessor): only a perfect
        // quantum's rounds are extended for it.
        ...(machine.execution.perfectQuantum === true
          ? { stopped: () => activity.quietSlices >= 2 }
          : {}),
        run: (cycles: number) => {
          const outerCpu = this.runningCpu;
          const outerFraction = this.currentLineFraction;
          const outerExecuting = this.coreExecuting;
          this.runningCpu = specification.tag;
          try {
            // Asked every slice -- about 24,000 a frame under the SNES's perfect
            // quantum -- and almost always nothing owed, so nothing is written.
            const pendingStall = this.cpuStalls.get(specification.tag) ?? 0;
            const stalled = pendingStall > 0 ? Math.min(cycles, pendingStall) : 0;
            if (stalled > 0) this.cpuStalls.set(specification.tag, pendingStall - stalled);
            this.runningStalled = stalled;
            if (specification.tag === timerClockCpu?.tag && stalled > 0) {
              advanceTimedHardware(stalled * timerSecondsPerCycle());
            }
            if (stalled > 0) tickCardDevices(specification.tag, stalled);
            this.coreExecuting = true;
            const watched = machine.execution.perfectQuantum === true;
            const readsBefore = watched ? activity.reads + spaceReads() : 0;
            const executed = stalled + (cycles > stalled
              ? (core ??= this.cpus.get(specification.tag))!.run(cycles - stalled)
              : 0);
            this.coreExecuting = outerExecuting;
            this.currentLineFraction = 0;
            this.soundRuntime?.tickCpu?.(specification.tag, executed);
            // A slice of exactly its cycles with no read and the PC where it
            // was is a core stopped for an interrupt: MAME's 65C816 in WAI
            // returns every clock it is given and fetches nothing. Two in a
            // row, so that the slice which executed the WAI does not count.
            // The PC is read only after a quiet slice, which a running core
            // almost never has: two quiet slices in a row ending at one PC.
            if (watched) {
              const quiet = executed === cycles && activity.reads + spaceReads() === readsBefore;
              const pc = quiet ? this.processorPc(specification.tag) : undefined;
              activity.quietSlices = pc !== undefined && activity.quietSlices > 0 && activity.quietPc === pc
                ? activity.quietSlices + 1 : pc !== undefined ? 1 : 0;
              activity.quietPc = pc;
            }
            this.runningSliceCycles = 0;
            this.cpuCycles.set(
              specification.tag,
              (this.cpuCycles.get(specification.tag) ?? 0) + executed,
            );
            // A perfect-quantum slice is one instruction against a one-cycle
            // target, and the core's closing timing() reports no more than the
            // target: the device clock moved one cycle per instruction and
            // caught up only at the line boundary, so every device timer fired
            // microseconds late. The 1541's gate array re-reads the disk from
            // machine().time() at each syncpoint, and lost two flux reversals
            // in three. Deliver the rest now, with the slice booked, so a
            // timer's callback still reads its own expiry as the time.
            if (specification.tag === timerClockCpu?.tag && executed > cycles && this.frameRunner.lockstepping) {
              advanceTimedHardware((executed - cycles - this.deviceTimeAheadOfSlice) * timerSecondsPerCycle());
            }
            if (specification.tag === timerClockCpu?.tag) {
              // Outside lockstep the overrun stays owed to the line settle;
              // a catch-up in the next slice may pay it sooner. Delivering it
              // here instead, every slice, ran device time ahead of the beam
              // and silenced the NES APU and Missile Command's POKEY.
              this.timerCpuCarriedCycles = this.catchUpDeviceTime && !this.frameRunner.lockstepping
                ? Math.max(0, executed - cycles - this.deviceTimeAheadOfSlice)
                : 0;
              this.deviceTimeAheadOfSlice = 0;
            }
            // A card's devices have no line settle behind them: they get
            // every cycle their processor ran, the overrun included.
            if (executed > cycles) tickCardDevices(specification.tag, executed - cycles);
            return executed;
          } finally {
            this.runningCpu = outerCpu;
            this.coreExecuting = outerExecuting;
            if (outerCpu) this.currentLineFraction = outerFraction;
          }
        },
      };
      }),
      ...this.roundProcessors.map(processor => ({
        tag: processor.tag, clock: processor.clock, run: processor.run,
        ...(processor.suspended ? { suspended: processor.suspended } : {}),
        ...(processor.abort ? { abort: processor.abort } : {}),
      }))]
        // MAME's round runs devices in configuration order: Donkey Kong's
        // maincpu, its 8257, then the sound CPU its audio board adds.
        .map((processor, index) => ({ processor, index, order: configurationOrder.get(processor.tag) ?? Infinity }))
        .sort((left, right) => left.order - right.order || left.index - right.index)
        .map(entry => entry.processor),
      // `scheduler().synchronize()` work runs once the processor that posted
      // it has yielded and the ones behind it have caught up. On a board whose
      // rounds end at timers the work is one of them, due at the time it was
      // posted: a processor later in the round that ends its own slice sooner
      // (a POKEY read asks for a resync) must not run work the first
      // processor posted for a later time. Marble Madness's 6502 took the
      // NMI of a command the 68010 had not yet sent, 190 us early.
      onSynchronize: at => {
        // Asked every round; where the round stands is only worked out when
        // something is posted.
        if (!this.scheduledWork.length) return;
        this.drainScheduledWork(at !== undefined && timerRounds ? roundSeconds(at === 'target') : Infinity);
      },
      // A device suspended or triggered during a round changes at the next.
      ...(executeDevices.length ? {
        onRound: () => {
          for (let index = 0; index < executeDevices.length; index++) executeDevices[index]!.applySuspendChanges!();
        },
      } : {}),
      // MAME presents at the start of VBLANK, where its devices stand; ours
      // may be a little short of it (held, or behind the processors), so the
      // presentation reads its timers from that instant.
      aroundPresent: render => this.atSchedulerTime(() => withGeneratedPresentTime(this.secondsToPresent(), render)),
      onPresented: () => {
        const held = this.heldDeviceSeconds;
        this.heldDeviceSeconds = 0;
        advanceTimedHardware(held);
      },
      onEvent: event => {
        // device_execute_interface::on_vblank and trigger_periodic_interrupt:
        // a processor suspended by RESET or HALT is not interrupted, so none
        // is left pending for the moment it is let go.
        if ((event.signal === 'set_periodic_int' || event.signal === 'set_vblank_int') &&
          this.cpuHeld.get(event.ownerTag)) return;
        const callback = machine.callbacks.find(candidate => candidate.id === event.callbackId);
        if (callback?.promGate && !generatedPromGateOpen(
          callback.promGate,
          event.state,
          this.state,
        )) return;
        this.atSchedulerTime(() => dispatchGeneratedCallback(machine, event.callbackId, event.state, this.effects));
      },
      onLine: (line, phase, framebuffer) => {
        if (phase === 'before-processors') activeFramebuffer = framebuffer;
        this.currentLine = line;
        this.currentLineFraction = 0;
        if (phase === 'before-processors') {
          // The screen's VBLANK edges, to every delegate a device registered
          // (`register_vblank_callback`): the K051960/K052109's IRQ, the
          // watchdog's counter.
          const { vbstart, vbend = 0 } = machine.execution.screen;
          if ((line === vbstart || line === vbend) && !this.frameRunner.atOrigin) {
            const state = Number(line === vbstart);
            for (const callback of this.vblankCallbacks.values()) callback(0, state);
          }
        }
        // onLine is invoked at both boundaries of the CPU interval. Advance
        // hardware timers once at its leading edge; doing it at both phases
        // runs every device clock at 2x (Neo Geo's per-line sprite parser then
        // alternates between stale even/odd lists, producing striped video).
        if (phase === 'before-processors') {
          const seconds = this.lineSeconds();
          // Settle the device clock against the beam, which has just moved on
          // to `line`: the line it left is now a line in the past, so retire
          // one from the running offset and pay whatever the CPU's instruction
          // deltas did not deliver -- a whole line when the primary CPU is
          // held, a slice overrun's worth when it ran. The remainder carries
          // signed, so an over-delivered line is not paid for twice.
          //
          // Inside a round spanning lines this pays for lines no processor
          // has run yet, and the device clock runs a round minus one line
          // ahead of the processors. Where a device arms a timer against the
          // beam that lead is fatal: a timer firing inside a slice reads the
          // running processor's beam, one firing here reads the device
          // clock's, and the two stand that lead apart. The NES 2C02 re-arms
          // for "the next line" from a boundary, finds it already behind the
          // beam, and waits a whole frame each time, so it never reaches
          // VBLANK (#155). On such a board the device clock settles to where
          // the primary processor actually stands -- behind the beam by the
          // lines its round has not run, ahead of it by whatever its last
          // slice overran -- so both readings are the same beam. The overrun
          // matters as much as the unrun lines: instruction deltas stop at
          // the slice's target, and an OAM DMA's 513 stolen cycles left the
          // CPU four lines ahead of a 2C02 that then lost a frame every few.
          //
          // Everywhere else the beam stays the reference: settling against
          // only the lines the processors had run moved Galaga's 54xx boot
          // boom, whose discrete network and hosted MCUs run on this clock.
          this.timedHardwareDelivered -= seconds;
          this.powerOnCreditLines = 0;
          const owed = this.deviceClockFollowsProcessors && timerClockCpu
            ? this.frameRunner.linesBehind(timerClockCpu.tag) * seconds
            : 0;
          // Time held for the frame's presentation is already on its way, so
          // a settle asks only for what lies beyond it; measured without it,
          // each line's settle held the same shortfall again.
          const reached = this.timedHardwareDelivered + this.heldDeviceSeconds;
          if (reached < -owed) advanceTimedHardware(-owed - reached);
          // Settled to where the processor stands, its last overrun included:
          // nothing is still carried for a catch-up to pay, and paying it again
          // ran the 2C02 an OAM DMA's overrun ahead of the CPU (#184).
          if (this.deviceClockFollowsProcessors) this.timerCpuCarriedCycles = 0;
          for (const tick of this.peripheralTicks) tick(seconds);
          // Driver-armed one-shots expire at the line boundary at or after
          // their time, which is the finest grain this schedule offers -- the
          // same grain MAME's own scanline timers are armed against. After the
          // settle: before it the device clock still counts the line just
          // left, so a callback re-arming with time_until_pos measured from a
          // beam one line ahead and every Missile Command IRQ landed a line
          // early.
          if (this.pendingTimers.size) {
            // Due by the boundary itself, on the frame's clock: the processor
            // can stand an instruction short of it, and a timer aimed at this
            // line's start (time_until_pos(v), now armed from its callback's
            // expiry) then waited a whole line more. The SNES scanline tick
            // read line 241 for its VBLANK line 240 and raised no NMI.
            const now = Math.max(this.machineSeconds(), this.lineBoundarySeconds());
            for (const [member, pending] of [...this.pendingTimers]) {
              if (pending.at > now + ROUND_TIMER_SLOP_SECONDS) continue;
              // A round's own timer fires where the round ends.
              if (this.roundTimers && this.timerEndsRound(member)) continue;
              this.genericTimerFires.get(member)?.();
            }
          }
        }
      },
      video,
    });
    // The beam starts where the frame runner's first frame does.
    this.currentLine = this.frameRunner.originLine;
    for (const device of this.hostBoundStarts) device.startDeferred?.();
    this.attachComposedCards();
    this.runDeviceStarts();
    // Configuration a driver init applies (MAME runs it after the devices are
    // constructed and before machine_start), so it lands on the members the
    // machine has just set up. Bound after machine_start, the first driver
    // handler to run fixed the board's call table without them, and an empty
    // machine_start was enough to change how Bubble Bobble ran.
    this.bindDelegateSlots(machine);
    this.runMachineLifecycle('startHandlers');
    this.driverStarted = true;
    this.setRtcDatetime(config.baseTime);
    // running_machine::soft_reset: every device resets, then the driver's
    // machine_reset runs, all after the driver has started.
    for (const device of this.devices.values()) device.reset();
    this.machinePhase = DEFAULT_CONSTANTS['machine_phase::RESET']!;
    this.runMachineReset();
    // Construction assigned into the calls table freely; any handler runtime
    // prepared during it re-resolves its links on the next dispatch.
    noteCallLinksChanged();
    for (const [tag, bytes] of Object.entries(regions)) this.pristineRegions[tag] = bytes.slice();
    this.machinePhase = DEFAULT_CONSTANTS['machine_phase::RUNNING']!;
    this.schedulerRunning = true;
    this.drainScheduledWork();
  }

  /** The one closure that answers a CPU's interrupt acknowledge with the board's vector. */
  private irqVectorSource(tag: string): () => number {
    const name = `irqVector:${tag}`;
    let source = this.stateFunctions.get(name) as (() => number) | undefined;
    if (!source) {
      source = namedStateFunction(name, () => this.interruptVector(tag));
      this.stateFunctions.set(name, source);
    }
    return source;
  }

  /** Register a board-composed model's state record; see `hostState`. */
  /** Devices the round schedules beside the CPUs, by tag, and the cycles each has run. */
  private readonly roundDevices = this.hostModel('roundDevices', new Map<string, {
    cycles: number;
    running: { device: Device; target: number } | undefined;
  }>());
  private roundProcessors: {
    tag: string;
    clock: number;
    run(cycles: number): number;
    suspended?: () => 'eating' | 'waiting' | undefined;
    abort?: () => void;
  }[] = [];
  /** The round device whose slice is executing, if any. */
  private runningRoundDevice?: string;

  private hostModel<T extends object>(name: string, initial: T): T {
    if (this.hostState[name]) throw new Error(`${this.machine.game}: host model "${name}" registered twice`);
    this.hostState[name] = initial;
    return initial;
  }

  /**
   * Another generated device as a MAME finder hands it to its owner: its own
   * methods by name, and `set_input_line` delivered to its execute_set_input
   * when it is a processor. Resolved on use, since the owner is built first.
   */
  private deviceHandle(tag: string): object {
    const target = () => {
      const device = this.devices.get(tag);
      if (!device) throw new Error(`device ${tag} is used before it exists`);
      return device;
    };
    return new Proxy({}, {
      get: (_object, property) => {
        // A finder to a device that exists is a pointer that is not null:
        // the Hyper Sports sound board tests `m_vlm != nullptr`.
        if (property === Symbol.toPrimitive) return () => 1;
        if (typeof property === 'symbol' || ['valueOf', 'toString', 'toJSON', 'then', 'stateKeys', 'stateRestored'].includes(property)) {
          return undefined;
        }
        const name = String(property);
        if (name === 'set_input_line') {
          return (line: unknown, state: unknown) =>
            this.deviceInputLine(tag, target(), Number(line), Number(state));
        }
        if (name === 'tag') return () => tag;
        // A CPU compiled whole answers device_execute_interface's surface
        // through the board, as MAME's CPU does to whoever holds it: the Namco
        // 06xx asks its CPU `suspended(SUSPEND_REASON_HALT | ...)`.
        const processor = this.deviceReferents.get(tag) as Record<string, unknown> | undefined;
        if (processor && typeof processor === 'object' && name in processor && this.cpus.get(tag) instanceof DeviceCpu &&
            !target().methodNames().includes(name)) {
          return processor[name];
        }
        // A finder re-tagged in machine configuration (the 54xx's
        // `set_discrete("discrete")`) before the device it names exists: the
        // board bound this finder to that device already.
        if (name === 'set_tag' && !this.devices.has(tag)) return () => 0;
        const device = target();
        if (device.methodNames().includes(name)) {
          return device.preparedCall?.(name) ?? ((...args: GeneratedCallArgument[]) => device.invoke(name, ...args));
        }
        return device.get(name);
      },
    });
  }

  /**
   * The slots of a delegate array on a device whose methods are the board's
   * handlers: Midway's SSIO reads `m_custom_input[offset]()` and writes
   * `m_custom_output[which](data)` only where `isnull()` is false. Each slot
   * the machine configured is the callable; every other slot answers
   * `isnull()` as MAME's unset delegate does, so it is skipped rather than
   * called into a silent 0. The setter's other members (`m_custom_input_mask`)
   * take the values it assigned. Spy Hunter's wheel, its sound board's status
   * and every command to that sound board travel through these (#178).
   */
  private bindDelegateSlots(machine: BoardIr): void {
    // Slots live in machine state, so each is a function the save walker
    // restores by name (machine-state.ts), set or not.
    const slot = (name: string, call: (...args: unknown[]) => unknown, isnull: number) => {
      const fn = namedStateFunction(name, Object.assign((...args: unknown[]) => call(...args), {
        isnull: () => isnull,
        isunset: () => isnull,
      }));
      this.stateFunctions.set(name, fn);
      return fn;
    };
    for (const callback of machine.callbacks) {
      if (!callback.delegate || callback.slot === undefined || !callback.member ||
          this.devices.has(callback.ownerTag)) continue;
      const target = callback.targetTag ? this.devices.get(callback.targetTag) : undefined;
      const handler = machine.handlers?.find(candidate =>
        candidate.ownerClass === callback.targetClass && candidate.method === callback.targetMethod);
      const call: ((...args: unknown[]) => unknown) | undefined =
        target && callback.targetMethod && target.methodNames().includes(callback.targetMethod)
          ? (...args) => target.invoke(callback.targetMethod!, ...args as GeneratedCallArgument[])
          : handler?.program && !handler.program.diagnostics.length
            ? (...args) => executeGeneratedMachineDelegate(
              machine,
              handler,
              this.bindings,
              Object.fromEntries(handlerParameterDescriptors(handler.parameters)
                .map((parameter, index) => [parameter.name, generatedReferent(args[index] ?? 0)])),
            ) ?? 0
            : undefined;
      if (!call) {
        throw new Error(
          `${machine.game}: ${callback.member}[${callback.slot}] is bound to ` +
          `${callback.targetClass ?? callback.targetTag}::${callback.targetMethod}, which was not compiled`,
        );
      }
      const member = callback.member;
      const existing = this.state[member];
      const slots = Array.isArray(existing)
        ? existing
        : Array.from({ length: Math.max(callback.slots ?? 0, callback.slot + 1) },
          (_, index) => slot(`${member}[${index}]`, () => 0, 1));
      slots[callback.slot] = slot(`${member}[${callback.slot}]`, call, 0);
      this.state[member] = slots;
      for (const assigned of callback.memberValues ?? []) {
        if (assigned.index === undefined) {
          this.state[assigned.member] = assigned.value;
          continue;
        }
        const current = this.state[assigned.member];
        const values = Array.isArray(current) || ArrayBuffer.isView(current)
          ? current as unknown as number[]
          : new Array<number>(Math.max(assigned.size ?? 0, assigned.index + 1)).fill(0);
        values[assigned.index] = assigned.value;
        this.state[assigned.member] = values;
      }
    }
  }

  /**
   * device_execute_interface::set_input_line on a generated processor. RESET
   * and HALT belong to the execute interface, not the core: an asserted line
   * suspends the processor, and the scheduler stops clocking it. As in
   * diexec.cpp's device_input, clearing RESET after it held the processor
   * resets the device and resumes it. Every other line is the core's own
   * execute_set_input. Arkanoid's Z80 holds its 68705 in reset through the
   * interface's reset_w, and the firmware's handshake depends on the restart.
   */
  /**
   * set_input_line on a generated CPU. A line driven by another processor
   * changes through scheduler().synchronize(), as device_input::set_state_synced
   * does for every line, so the processor first runs up to the time the line
   * was driven and each change lands in order:
   * - Rampage's Z80 asserts its sound 68000's RESET 12 us in, and MAME's 68000
   *   has written its PIA's DDRs and control registers by then.
   * - Shinobi's Z80 pulses the uPD7751's IRQ for 100 us through the YM2151's
   *   CT port. Applied at once, it was asserted and cleared inside the Z80's
   *   slice, the MCU never saw it, and no voice sample ever played.
   */
  private cpuInputLine(tag: string, cpu: Cpu, line: number, state: number, dataBus?: number | (() => number)): void {
    const apply = () => {
      // A line that changes may wake a stopped core (stoppedProcessor).
      const activity = this.cpuActivity(tag);
      activity.quietSlices = 0;
      activity.quietPc = undefined;
      const released = line === INPUT_LINE_RESET && state === 0 && this.cpuHeld.get(tag) === true;
      applyGeneratedCpuInputLine(cpu, line, state, held => this.cpuHeld.set(tag, held), dataBus);
      if (released) this.cpuResetReleased(tag);
    };
    if (this.synchronizesLineFrom(tag)) this.synchronize(apply);
    else apply();
  }

  /**
   * Per processor, the reads it has made and how many slices in a row it has
   * been stopped for an interrupt: no read, its cycles exactly, its PC
   * unmoved. A perfect quantum's rounds are extended while the processors
   * that lead them are (the frame runner's stoppedLead). Kept out of the save
   * state: it only decides how rounds are cut, never what they compute.
   */
  private readonly cpuActivities = new Map<string, { reads: number; quietSlices: number; quietPc?: number }>();

  private cpuActivity(tag: string): { reads: number; quietSlices: number; quietPc?: number } {
    let activity = this.cpuActivities.get(tag);
    if (!activity) this.cpuActivities.set(tag, activity = { reads: 0, quietSlices: 0 });
    return activity;
  }


  /** A compiled core's STATE_GENPC, or undefined where it publishes none. */
  private processorPc(tag: string): number | undefined {
    const device = (this.cpus.get(tag) as { device?: { stateInt?(index: number): number | undefined } } | undefined)?.device;
    return device?.stateInt?.(DEFAULT_CONSTANTS.STATE_GENPC!);
  }

  /**
   * Whether a line change goes through the scheduler: from inside any
   * processor's slice, the processor's own lines included. set_state_synced
   * synchronizes whoever drives the line, so a processor that clears its own
   * IRQ ends its slice there and the round's target drops to it. Exidy's
   * main CPU does on every read of its interrupt latch (exidy_interrupt_r);
   * applied in place, its round ran on 1,000 cycles MAME's did not, and it
   * saw a PIA edge Venture's sound CPU raised later in MAME's order (#275).
   */
  private synchronizesLineFrom(_tag: string): boolean {
    // A device timer's callback is not the running processor, though ours
    // fire mid-slice: MAME runs them between slices, where a synchronized
    // line takes effect at once. Deferred to the round's end, the SN76489A's
    // READY release (a timer, through an input merger onto the Z80's WAIT)
    // held System 1's sound Z80 170 us per write instead of 16.
    return this.runningCpu !== undefined && this.schedulerRunning && generatedTimerExpiry() === undefined;
  }

  private deviceInputLine(tag: string, device: Device, line: number, state: number): number {
    if (line === INPUT_LINE_RESET || line === INPUT_LINE_HALT) {
      const apply = () => {
        const held = state !== 0;
        const released = !held && line === INPUT_LINE_RESET && this.cpuHeld.get(tag) === true;
        if (released) device.reset();
        this.cpuHeld.set(tag, held);
        if (released) this.cpuResetReleased(tag);
      };
      // device_input::set_state_synced: the line changes through
      // scheduler().synchronize(), so a processor another one holds or
      // releases first runs up to the time the line was driven. Rampage's
      // Z80 asserts the sound 68000's RESET 12 us in; MAME's 68000 has made
      // its first four PIA writes by then (DDR and control), and without
      // them its release at 0.9 s wrote the DDR where MAME writes port A.
      if (this.synchronizesLineFrom(tag)) this.synchronize(apply);
      else apply();
      return 0;
    }
    // device_input (diexec.cpp): HOLD_LINE reaches the core as ASSERT_LINE
    // and is remembered, so the core's standard_irq_callback clears it when
    // the interrupt is taken. A raw 2 read as "not asserted" with an
    // interrupt pending.
    const deliver = (): number => {
      this.deviceLineStates.set(`${tag}:${line}`, state);
      return Number(device.call('execute_set_input', line, state === HOLD_LINE ? ASSERT_LINE : state)) || 0;
    };
    // As every line (see cpuInputLine): driven from another processor, the
    // change waits until this one has run up to it.
    if (this.synchronizesLineFrom(tag)) {
      this.synchronize(() => { deliver(); });
      return 0;
    }
    return deliver();
  }

  /**
   * device_execute_interface::standard_irq_callback for a generated
   * processor: acknowledge a held line and answer the line's vector. Unbound,
   * the 6805 called it 54,000 times a contract into a silent 0 (#178).
   */
  private deviceIrqAcknowledge(tag: string, device: Device, line: number): number {
    const key = `${tag}:${line}`;
    if (this.deviceLineStates.get(key) === HOLD_LINE) {
      device.call('execute_set_input', line, CLEAR_LINE);
      this.deviceLineStates.set(key, CLEAR_LINE);
    }
    return device.methodNames().includes('default_irq_vector')
      ? Number(device.call('default_irq_vector', line)) || 0
      : 0;
  }

  private configureHostedProcessor(
    tag: string,
    device: Device,
    host: Device,
    /** The host's member for this processor: Namco's `m_cpu`, Taito's `m_mcu`. */
    member = 'm_cpu',
  ): () => boolean {
    const model = this.hostModel(`${tag}.hosted`, { resetHeld: false });
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
              args,
            ),
          );
        },
        // Left undefined when the source named no bit: that is what tells the
        // device this binds the whole-port devcb rather than bit zero.
        callback.slot,
      );
    }
    // The host raises its processor's lines through its own member for it
    // (`m_mcu->set_input_line(M68705_IRQ_LINE, ASSERT_LINE)` in Taito's 68705
    // interface), whatever that member is called.
    host.bindCall(`${member}.set_input_line`, (line, state) => {
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
      return this.deviceInputLine(tag, device, inputLine, Number(state));
    });
    if (host.signalNames().includes('reset')) {
      host.on('reset', state => {
        model.resetHeld = state !== 0;
        if (model.resetHeld) device.reset();
      });
    }
    return () => !model.resetHeld && !this.cpuHeld.get(tag);
  }

  /**
   * screen_device::configure's new visible area, between frames: the screen
   * IR, the picture's size the host allocates (fbWidth/fbHeight) and the
   * renderer all take it before the next frame is drawn.
   */
  private applyScreenArea(): void {
    const area = this.pendingScreenArea;
    if (!area) return;
    this.pendingScreenArea = undefined;
    const screen = this.machine.execution.screen;
    screen.xOffset = area.x;
    screen.yOffset = area.y;
    screen.width = area.width;
    screen.height = area.height;
    this.fbWidth = area.width;
    this.fbHeight = area.height;
    this.video?.resize(area.width, area.height);
  }

  frame(framebuffer: Uint32Array): void {
    this.pollInputLatches();
    this.inFrame = true;
    try {
      this.frameRunner.frame(framebuffer);
      this.soundRuntime?.endFrame?.();
    } finally {
      this.inFrame = false;
    }
    this.applyScreenArea();
    if (this.softResetPending) {
      this.softResetPending = false;
      this.softReset();
    }
  }

  /** Apply source-declared PORT_CHANGED_MEMBER edge callbacks. */
  private pollInputLatches(): void {
    for (const latch of this.machine.execution.inputLatches ?? []) {
      const key = `${latch.port}:${latch.mask}:${latch.handler}`;
      const raw = this.inputs.read(latch.port);
      const asserted = latch.activeLow
        ? (raw & latch.mask) === 0
        : (raw & latch.mask) !== 0;
      const previous = this.inputLatchPrevious.get(key) ?? false;
      if (asserted && !previous && latch.stateMember !== undefined && latch.index !== undefined) {
        const state = this.state[latch.stateMember];
        if (Array.isArray(state) || ArrayBuffer.isView(state)) {
          (state as unknown as { [index: number]: number })[latch.index] = 1;
        }
      } else if (asserted !== previous && latch.slot && latch.method) {
        // A slot card's own PORT_CHANGED_MEMBER: the NES Zapper's trigger arms
        // a timer, and the card reads the timer, not the button.
        const level = (pressed: boolean): number => Number(latch.activeLow ? !pressed : pressed);
        this.devices.get(latch.slot)?.invokeSlot(latch.method, 0, Math.log2(latch.mask), level(previous), level(asserted));
      } else if (asserted !== previous && latch.stateMember === undefined) {
        const handler = this.machine.handlers?.find(candidate =>
          `${candidate.ownerClass}.${candidate.method}` === latch.handler);
        if (handler?.program && !handler.program.diagnostics.length) {
          // MAME's dynamic_field::write hands the handler the field's bits as
          // the port holds them, `(value & mask) >> shift`: an active-low coin
          // reads 0 while it is pressed. Passing "pressed" instead inverted
          // Bump 'n' Jump's coin_inserted_nmi_lo, which asserts its NMI on
          // `!newval`, so no coin was ever counted.
          const level = (pressed: boolean): number => Number(latch.activeLow ? !pressed : pressed);
          executeGeneratedMachineHandler(this.machine, handler, this.bindings, {
            field: 0,
            param: Math.log2(latch.mask),
            oldval: level(previous),
            newval: level(asserted),
          });
        }
      }
      this.inputLatchPrevious.set(key, asserted);
    }
  }

  /**
   * MAME's soft reset (running_machine::soft_reset), the reset a player or a
   * contract asks for: every device and processor resets, and emulated time,
   * the beam and the device clock carry on (GeneratedFrameRunner.softReset).
   */
  reset(): void {
    this.machinePhase = DEFAULT_CONSTANTS['machine_phase::RESET']!;
    this.observedTransportSeconds.clear();
    for (const device of this.devices.values()) device.reset();
    for (const cpu of this.cpus.values()) cpu.reset();
    for (const tag of this.cpuHeld.keys()) this.cpuHeld.set(tag, false);
    for (const tag of this.cpuReportedSuspended.keys()) {
      this.cpuReportedSuspended.set(tag, false);
    }
    this.videoPrimitives?.reset?.();
    for (const tag of this.cpuStalls.keys()) this.cpuStalls.set(tag, 0);
    this.frameRunner.softReset();
    this.soundRuntime?.reset?.();
    for (const reset of this.peripheralResets) reset();
    this.inputLatchPrevious.clear();
    this.scheduledWork.length = 0;
    this.runMachineReset();
    this.machinePhase = DEFAULT_CONSTANTS['machine_phase::RUNNING']!;
  }

  /**
   * The beam's position in scanlines, fractional, on the device-timer clock.
   *
   * `currentLine` alone is the integer line the frame runner is on; the
   * remainder is how far the running CPU slice has carried the device clock
   * into it, less whatever a firing timer has not reached yet. Only timer
   * arithmetic needs the fraction — `vpos()` stays the whole line MAME's
   * drivers read.
   */
  /**
   * MAME `scheduler().synchronize()`: post work at the current time and end
   * the running processor's timeslice, so the processors behind it catch up
   * before the work runs. The frame schedule drains it at the end of the round.
   */
  private synchronize(run: () => void): void {
    // The work runs at the time it was posted, as MAME's zero-delay timer
    // does: the 06xx re-arms its NMI timer for the next clock edge after
    // `machine().time()`, and read when the drain ran instead, Galaga's
    // first chip select after a control write came an MCU instruction early.
    const at = this.machineSeconds();
    const exactAt = this.exactMachineTime();
    const poster = this.runningCpu;
    this.scheduledWork.push({
      at,
      run: () => {
        const outer = this.workPoster;
        this.workPoster = poster;
        try {
          withGeneratedTimerExpiry(at, run, exactAt);
        } finally {
          this.workPoster = outer;
        }
      },
    });
    if (this.frameRunner?.requestSynchronize()) return;
    // Outside a slice (a line callback, an event) it is due now; inside a
    // drain the loop below picks it up in order. Posted while the machine is
    // still being built, it waits for the scheduler to start, as MAME's does:
    // a generic latch's start posts the not-pending state it publishes, and
    // run there and then, Neo Geo's NMI merger started after it and set every
    // input high again, so the sound CPU took one NMI and never another.
    if (!this.drainingScheduledWork && this.schedulerRunning) this.drainScheduledWork();
  }

  /**
   * A processor's RESET line has let it go: device_input resets the device,
   * and its interface_post_reset arms the periodic interrupt again, a period
   * from now. Ghosts'n Goblins' sound Z80 is released 5.2 s in, and its
   * 240 Hz interrupt counts from there, not from power-on.
   */
  private cpuResetReleased(tag: string): void {
    const now = this.exactMachineTime();
    this.frameRunner?.rearmPeriodic(tag, now ? exactToAttos(now) : undefined);
  }

  /** A round's start is firing timers due at its base, behind where the devices stand (nextTimerSeconds). */
  private firingTimersDueAtBase = false;

  /** The board's rounds end at timers, so machine time is known exactly (exactMachineTime). */
  private exactTimeKnown = false;

  /**
   * MAME's `machine().time()` exactly, where the board knows it: a timer's
   * callback or posted work runs at its exact time, a processor in its slice
   * stands at its exact local time, and between timeslices the scheduler
   * stands at its base. Undefined where only seconds are known (a device
   * running in the round, a delivery of device time), and on a board whose
   * rounds do not end at timers.
   */
  private exactMachineTime(): ExactAttotime | undefined {
    const runner = this.frameRunner;
    // Not before the scheduler starts: a device_start's timer counts from
    // power-on, which the runner's base does not stand at yet.
    if (!this.exactTimeKnown || !runner || !this.schedulerRunning) return undefined;
    if (generatedTimerExpiry() !== undefined) return generatedTimerExactExpiry();
    if (this.deliveringDeviceTime || this.runningRoundDevice !== undefined) return undefined;
    if (this.runningCpu !== undefined) {
      const local = runner.runningLocalExact(this.runningCycles());
      return local === undefined ? undefined : exactFromAttos(local);
    }
    return exactFromAttos(runner.baseExact());
  }

  private drainingScheduledWork = false;
  /** False until construction ends; see synchronize. */
  private schedulerRunning = false;


  /**
   * Run everything `scheduler().synchronize()` posted during the slice that
   * just ended. Draining in order, and re-checking the queue, matches MAME:
   * a synchronized callback may itself synchronize.
   */
  private drainScheduledWork(until = Infinity): void {
    const work = this.scheduledWork;
    if (!work.length) return;
    this.drainingScheduledWork = true;
    try {
      for (let guard = 0; work.length && guard < 64; guard++) {
        // The earliest that has come due, the first posted among equals.
        let next = -1;
        for (let index = 0; index < work.length; index++) {
          if (work[index]!.at <= until + ROUND_TIMER_SLOP_SECONDS && (next < 0 || work[index]!.at < work[next]!.at)) next = index;
        }
        if (next < 0) break;
        work.splice(next, 1)[0]!.run();
      }
    } finally {
      this.drainingScheduledWork = false;
    }
  }

  /**
   * Device time from where the devices stand to the instant the frame in
   * progress is presented: the beam's next arrival at vbstart. A frame runs
   * from vbstart, so from the line after it the instant is past the wrap.
   */
  private secondsToPresent(): number {
    const { vbstart, vtotal } = this.machine.execution.screen;
    const lines = this.currentLine >= vbstart ? vtotal - this.currentLine + vbstart : vbstart - this.currentLine;
    return lines * this.lineSeconds() - this.timedHardwareDelivered;
  }

  /** The beam as a generated device's screen reads it (see powerOnCreditLines). */
  /**
   * The line a device's `screen().vpos()` reads, floored the way MAME's
   * screen_device::vpos() derives it from emulated time.
   */
  private deviceBeamLine(): number {
    return Math.floor(this.rasterLabel(this.deviceBeamPosition()) + this.halfPixelLines()) % this.rasterHeight();
  }

  private deviceBeamPosition(): number {
    return this.beamPosition() - this.powerOnCreditLines;
  }

  private beamPosition(): number {
    const running = this.runningCpu
      ? this.frameRunner?.runningBeam(this.deliveredSliceCycles ?? this.runningSliceCycles)
      : undefined;
    // Inside a slice the beam is the processor's, which the devices' clock
    // trails by whatever is held for the frame's presentation.
    if (this.expiryBeam !== undefined) return this.expiryBeam;
    if (running !== undefined) return running - (generatedTimerBacklog() + this.heldDeviceSeconds) / this.lineSeconds();
    return this.currentLine +
      (this.timedHardwareDelivered - generatedTimerBacklog()) / this.lineSeconds();
  }

  /**
   * Run a driver timer's callback at its expiry, as MAME's scheduler does:
   * machine().time() answers the expiry (withGeneratedTimerExpiry), and so
   * does the beam. This schedule fires a timer at the line boundary after it
   * falls due, or a precise one an instruction past it; measured from where
   * the beam had got to, the SNES scanline tick read line 241 for the 240 it
   * was armed for, so no VBLANK and no NMI that frame, and every timer a
   * callback re-armed with time_until_pos came early by the lateness.
   */
  private atTimerExpiry<T>(at: number, run: () => T): T {
    const outer = this.expiryBeam;
    // Where the expiry falls in the frame, on the frame's own clock (the
    // processor's can stand a round ahead of the beam).
    const start = this.frameRunner?.frameStartSeconds;
    const position = start === undefined ? undefined
      : (this.frameRunner?.originLine ?? 0) + (at - start) / this.lineSeconds();
    this.expiryBeam = position !== undefined && Number.isFinite(position) ? position : undefined;
    try {
      return withGeneratedTimerExpiry(at, run);
    } finally {
      this.expiryBeam = outer;
    }
  }

  /** The beam position at the expiry of the driver timer whose callback is running (atTimerExpiry). */
  private expiryBeam?: number;

  /**
   * When the beam reached the start of the line it stands on, on the frame's
   * clock. On the frame's last boundary, the wrap to its origin line, the
   * frame in progress has not been closed yet and the line is its vtotal-th.
   */
  private lineBoundarySeconds(): number {
    const runner = this.frameRunner;
    if (!runner) return 0;
    const vtotal = Math.max(1, this.machine.execution.screen.vtotal);
    let lines = ((this.currentLine - runner.originLine) % vtotal + vtotal) % vtotal;
    if (lines === 0 && this.machineSeconds() - runner.frameStartSeconds > runner.frameSeconds / 2) lines = vtotal;
    return runner.frameStartSeconds + lines * this.lineSeconds();
  }

  /** Fire every precise driver timer that has come due, earliest first. */
  private firePreciseTimers(): void {
    // Asked on every delivery of device time -- each slice -- and found again
    // only when a timer was armed, cancelled or fired (soonestRoundEnding).
    if (this.soonestPreciseVersion !== this.pendingTimers.version) {
      let soonest = Infinity;
      for (const [member, pending] of this.pendingTimers) {
        if (pending.at < soonest && this.preciseTimerMembers.has(member)) soonest = pending.at;
      }
      this.soonestPreciseAt = soonest;
      this.soonestPreciseVersion = this.pendingTimers.version;
    }
    const earliest = this.soonestPreciseAt;
    if (earliest === Infinity) return;
    const now = this.machineSeconds();
    if (earliest > now) return;
    const due = [...this.pendingTimers]
      .filter(([member, pending]) => pending.at <= now && this.preciseTimerMembers.has(member))
      .sort((left, right) => left[1].at - right[1].at);
    for (const [member] of due) this.genericTimerFires.get(member)?.();
  }

  /**
   * How far into its slice the running processor is. The slice total moves
   * only when execute_run returns, so the cycles the core has spent since
   * are asked of it: without them every `vpos()` of a round of several lines
   * read the round's first line, and a tile written on line 239 split the
   * picture at 237 (Zig Zag).
   */
  private runningCycles(): number {
    const tag = this.runningCpu;
    return this.runningSliceCycles + (tag ? this.cpus.get(tag)?.elapsedCycles?.() ?? 0 : 0);
  }

  /**
   * `time_until_pos(vpos, hpos)`'s target as a beam position: MAME aims at
   * `vpos * scantime + hpos * pixeltime` in the screen's own labels.
   */
  private rasterTarget(position: number, hpos: number): number {
    const height = this.rasterHeight();
    const line = ((Math.floor(Number(position) || 0) % height) + height) % height;
    const label = line + Math.max(0, Math.floor(Number(hpos) || 0)) / this.rasterWidth();
    const vtotal = Math.max(1, this.machine.execution.screen.vtotal);
    return ((this.rasterPosition(label) % vtotal) + vtotal) % vtotal;
  }

  /** The raster screen_device::configure set (GeneratedFrameRunner.screenRaster), or undefined while it is set_raw's. */
  private configuredRaster(): { height: number; width: number; vbstart: number } | undefined {
    const raster = this.frameRunner?.screenRaster;
    return raster && raster.height > 0 ? raster : undefined;
  }

  /**
   * screen_device::configure(width, height, visarea, period): the new raster
   * takes effect at once. MAME keeps m_vblank_start_time, so vpos() and
   * hpos() count from the same instant with the new visarea bottom and line
   * length: the SNES PPU's overscan makes the instant its VBLANK tick fired
   * at line 225 read 240, and its 341-dot configure halves hpos's unit.
   * (The frame period is taken as set_raw's; a configure that changes it
   * would also move VBLANK, which this does not model.)
   */
  private configureRaster(width: number, height: number, vbstart: number): void {
    const raster = this.frameRunner?.screenRaster;
    if (!raster) return;
    const screen = this.machine.execution.screen;
    const own = height === screen.vtotal && width === (screen.htotal ?? screen.width) && vbstart === screen.vbstart;
    const valid = Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0;
    raster.height = own || !valid ? 0 : height;
    raster.width = own || !valid ? 0 : width;
    raster.vbstart = own || !valid ? 0 : ((vbstart % height) + height) % height;
  }

  /** Lines a frame has in the screen's own labels. */
  private rasterHeight(): number {
    return Math.max(1, this.configuredRaster()?.height ?? this.machine.execution.screen.vtotal);
  }

  /** Pixels a line has in the screen's own labels. */
  private rasterWidth(): number {
    const screen = this.machine.execution.screen;
    return Math.max(1, this.configuredRaster()?.width ?? screen.htotal ?? screen.width);
  }

  /**
   * A beam position (frame-runner lines, VBLANK at the screen IR's vbstart)
   * as the configured screen labels it: the time since VBLANK start, in the
   * configured line length, from the configured VBLANK line.
   */
  private rasterLabel(position: number): number {
    const raster = this.configuredRaster();
    if (!raster) return position;
    const screen = this.machine.execution.screen;
    const vtotal = Math.max(1, screen.vtotal);
    const since = (((position - screen.vbstart) % vtotal) + vtotal) % vtotal;
    return raster.vbstart + since * raster.height / vtotal;
  }

  /** rasterLabel's inverse: the beam position at which the screen reads `label`. */
  private rasterPosition(label: number): number {
    const raster = this.configuredRaster();
    if (!raster) return label;
    const screen = this.machine.execution.screen;
    const since = (((label - raster.vbstart) % raster.height) + raster.height) % raster.height;
    return screen.vbstart + since * Math.max(1, screen.vtotal) / raster.height;
  }

  /** The beam's pixel within its line: MAME's `screen_device::hpos()`. */
  private beamHpos(): number {
    const htotal = this.rasterWidth();
    const running = this.runningCpu
      ? this.frameRunner?.runningBeam(this.runningCycles())
      : undefined;
    const beam = this.rasterLabel(this.expiryBeam ?? running ?? this.currentLine + this.currentLineFraction) + this.halfPixelLines();
    return Math.min(htotal - 1, Math.floor((beam - Math.floor(beam)) * htotal));
  }

  /** The whole beam line a read sees now: MAME's `screen_device::vpos()`. */
  private beamLine(): number {
    const vtotal = this.rasterHeight();
    const running = this.runningCpu
      ? this.frameRunner?.runningBeam(this.runningCycles())
      : undefined;
    const line = this.expiryBeam !== undefined
      ? Math.floor(this.rasterLabel(this.expiryBeam) + this.halfPixelLines())
      : this.configuredRaster()
        ? Math.floor(this.rasterLabel(running ?? this.currentLine) + this.halfPixelLines())
        : running === undefined ? this.currentLine : Math.floor(running + this.halfPixelLines());
    return ((line % vtotal) + vtotal) % vtotal;
  }

  /**
   * Half a pixel in lines. MAME's vpos() and hpos() "round to the nearest
   * pixel": `delta += m_pixeltime / 2` before dividing by the truncated
   * m_scantime, so a processor a few attoseconds short of a line reads that line.
   */
  private halfPixelLines(): number {
    return 0.5 / this.rasterWidth();
  }

  /** One scanline of emulated wall time — the unit both clocks settle in. */
  private lineSeconds(): number {
    return this.cachedLineSeconds ??= screenPeriods(this.machine.execution.screen).line.total * 1e-18;
  }

  /**
   * MAME's soft reset (a watchdog firing) resets every device without
   * restarting emulated time.
   * In particular, a 68705 keeps internal RAM while its PC, ports and timer
   * reset.  Re-running device_start here would erase the parent interface's
   * output latch; resetting the frame runner would also make a boot watchdog
   * look like an endless frame-zero loop to clients.
   */
  private softReset(): void {
    this.machinePhase = DEFAULT_CONSTANTS['machine_phase::RESET']!;
    for (const device of this.devices.values()) device.reset();
    for (const cpu of this.cpus.values()) cpu.reset();
    for (const tag of this.cpuHeld.keys()) this.cpuHeld.set(tag, false);
    for (const tag of this.cpuReportedSuspended.keys()) {
      this.cpuReportedSuspended.set(tag, false);
    }
    for (const tag of this.cpuStalls.keys()) this.cpuStalls.set(tag, 0);
    for (const reset of this.peripheralResets) reset();
    this.runMachineReset();
    this.machinePhase = DEFAULT_CONSTANTS['machine_phase::RUNNING']!;
  }

  /**
   * running_machine::set_rtc_datetime: each battery-backed clock chip is set
   * to the machine's base time once the machine has started, through the
   * chip's own device_rtc_interface::set_current_time.
   */
  private setRtcDatetime(baseTime: string | undefined): void {
    const time = systemTime(baseTime);
    for (const device of this.devices.values()) {
      if (!device.methodNames().includes('set_current_time')) continue;
      if (!Number(device.invoke('has_battery'))) continue;
      device.invoke('set_current_time', time);
    }
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
        throw new Error(
          `${this.machine.game}: machine lifecycle handler "${key}" is not executable`,
        );
      }
      executeGeneratedMachineHandler(this.machine, handler, this.bindings, {});
    }
  }

  media() {
    return [...this.devices.entries()].flatMap(([tag, device]) => {
      const cassette = device.findDevice?.('cassette');
      if (!cassette) return [];
      const constant = (name: string) => {
        const value = cassette.constant(name);
        if (value === undefined) throw new Error(`cassette source constant ${name} is missing`);
        return value;
      };
      return [{ tag, extensions: cassette.imageExtensions?.() ?? [],
        ...(device.deviceName?.() ? { deck: device.deviceName!()! } : {}),
        mount: (extension: string, bytes: Uint8Array) => cassette.mountImage!(extension, bytes),
        play: () => { cassette.call('change_state', constant('CASSETTE_PLAY'), constant('CASSETTE_MASK_UISTATE')); },
        stop: () => { cassette.call('change_state', constant('CASSETTE_STOPPED'), constant('CASSETTE_MASK_UISTATE')); },
        rewind: () => { cassette.call('seek', 0, constant('SEEK_SET')); },
        position: () => Number(cassette.invoke('get_position')),
        // MAME's own cassette_image_device accessors: the deck reads the
        // transport back rather than remembering what it pressed.
        length: () => Number(cassette.invoke('get_length')) || 0,
        playing: () => Boolean(Number(cassette.invoke('is_playing'))),
        motorOn: () => Boolean(Number(cassette.invoke('motor_on'))),
      }];
    });
  }

  disks() {
    return [...this.devices.entries()].flatMap(([tag, device]) => {
      const drive = device.findDevice?.('floppy');
      if (!drive) return [];
      return [{ tag, extensions: drive.imageExtensions?.() ?? [],
        mount: (extension: string, bytes: Uint8Array, name?: string, features?: Readonly<Record<string, string>>) =>
          drive.mountImage!(extension, bytes, name, features),
        eject: () => drive.unmountImage?.(),
        // floppy_image_device's own state: an image is held, the motor line
        // is active low, and the head counts half-tracks from zero.
        loaded: () => {
          const image = (drive.instance?.() as Record<string, unknown> | undefined)?.m_image;
          return Boolean(image && typeof image === 'object');
        },
        spinning: () => drive.get('m_mon') === 0,
        track: () => Math.floor(drive.get('m_cyl') / 2) + 1,
        trackCount: () => Math.ceil(drive.get('m_tracks') / 2),
      }];
    });
  }

  quickloads() {
    return [...this.devices.entries()].flatMap(([tag, device]) => {
      // MAME's own word for the medium: a cartridge port reads its own file
      // too, but only a quickload puts one straight into memory.
      // A snapshot is snapquik.cpp's other device: the same file-in-memory
      // load, of a whole machine state (the Spectrum's .sna and .z80).
      const medium = device.imageTypeName?.();
      if (medium !== 'quickload' && medium !== 'snapshot') return [];
      return [{ tag, medium, extensions: device.imageExtensions?.() ?? [],
        ...(device.deviceName?.() ? { deck: device.deviceName!()! } : {}),
        mount: (extension: string, bytes: Uint8Array, name?: string) => device.mountImage!(extension, bytes, name),
        // snapquik.cpp's call_load arms the device's timer; the file is read
        // into memory when it fires.
        pending: () => Boolean(device.timerPending?.()),
        error: () => device.imageError?.(),
      }];
    });
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

  /**
   * What MAME's nvram_device would load at start and save at exit: the
   * share (or region) each NVRAM device's tag names. Which devices those are
   * is a fact of the decoded IR, not of any game.
   */
  persistentMemory(): PersistentMemory[] {
    const memory: PersistentMemory[] = [];
    for (const device of this.machine.devices ?? []) {
      if (device.type !== 'NVRAM') continue;
      const share = this.shares[device.tag];
      if (share) { memory.push({ kind: 'share', tag: device.tag, bytes: share }); continue; }
      const region = this.regions[device.tag];
      if (region) memory.push({ kind: 'region', tag: device.tag, bytes: region });
    }
    return memory;
  }

  batteries(): BatteryImage[] {
    const kept: BatteryImage[] = [];
    for (const [tag, device] of this.devices) {
      const battery = (device as { collectBattery?: () => { name: string; bytes: Uint8Array } | undefined }).collectBattery?.();
      if (battery) kept.push({ tag, ...battery });
    }
    return kept;
  }

  memory(row: { cpu: string; space?: string; share?: string }): MemoryAccess | undefined {
    if (row.share !== undefined) {
      const bytes = this.shares[row.share];
      if (!bytes) return undefined;
      return {
        read: address => bytes[address] ?? 0,
        write: (address, value) => { if (address < bytes.length) bytes[address] = value & 0xff; },
      };
    }
    const bus = this.cpuBuses.get(row.cpu);
    if (!bus || row.space !== 'program') return undefined;
    return { read: address => bus.read(address), write: (address, value) => bus.write(address, value) };
  }

  /**
   * Save-state roots (machine-state.ts): every container that changes as
   * frames run. The IR, the buses' handler tables, effects, bindings and
   * listeners are wiring and stay out.
   */
  stateKeys(): readonly string[] {
    return [
      'cpus', 'cpuBuses', 'bankDeviceBuses', 'cpuCycles', 'cpuStalls', 'cpuHeld', 'cpuReportedSuspended',
      'runningSliceCycles', 'devices', 'generatedBanks',
      'observedTransportSeconds',
      'pendingBankEntry', 'generatedResources', 'state', 'declarativeEeprom',
      'videoPrimitives', 'video', 'frameRunner', 'currentLine', 'currentLineFraction',
      'inFrame', 'timedHardwareDelivered', 'soundRuntime', 'softResetPending',
      // A slice's overrun still owed to the device clock: since #184 a 6502
      // pays it at its next instruction, so a load must find it where it was.
      'timerCpuCarriedCycles', 'heldDeviceSeconds',
      // Driver-armed one-shots due to fire: Missile Command's CPU-speed timer
      // is what puts the clock back at the top of the frame.
      'pendingTimers',
      'inputLatchPrevious', 'hostState',
    ];
  }

  /** Buffers restored by name, so their many views carry no bytes of their own. */
  private namedBuffers(): Map<ArrayBufferLike, string> {
    const named = new Map<ArrayBufferLike, string>();
    for (const [tag, bytes] of Object.entries(this.regions)) named.set(bytes.buffer, `region:${tag}`);
    for (const [tag, bytes] of Object.entries(this.shares)) named.set(bytes.buffer, `share:${tag}`);
    return named;
  }

  /** An emitted core's own fields are its state; it cannot declare them without a re-emit. */
  private walkOwnKeys(): (value: object) => boolean {
    const cores = new Set<object>(this.cpus.values());
    return value => cores.has(value);
  }

  private walkOptions(onOpaque?: (path: string, value: object) => void): WalkOptions {
    return {
      namedBuffers: this.namedBuffers(),
      walkOwnKeys: this.walkOwnKeys(),
      functions: this.stateFunctions,
      // A disk the drive holds is a generated device of its own, rebuilt by
      // its own factory (generatedInstanceFactories).
      factories: new Map([...STATE_FACTORIES, ...generatedInstanceFactories()]),
      onOpaque,
    };
  }

  save(options: { onOpaque?: (path: string, value: object) => void } = {}): MachineState {
    if (this.inFrame) throw new Error(`${this.machine.game}: cannot save mid-frame`);
    const regions: Record<string, Uint8Array> = {};
    for (const [tag, bytes] of Object.entries(this.regions)) {
      const pristine = this.pristineRegions[tag];
      if (!pristine || pristine.length !== bytes.length || !bytesEqual(pristine, bytes)) regions[tag] = bytes.slice();
    }
    // MAME's pre-save pass (machine.cpp `presave_all_devices`).
    for (const device of this.devices.values()) device.preSave?.();
    const shares: Record<string, Uint8Array> = {};
    for (const [tag, bytes] of Object.entries(this.shares)) shares[tag] = bytes.slice();
    for (const sync of this.stateSyncs) sync.capture();
    return {
      format: 1,
      game: this.machine.game,
      frame: this.frameRunner.frameCount,
      regions,
      shares,
      roots: captureState(this, this.walkOptions(options.onOpaque)),
    };
  }

  load(state: MachineState): void {
    if (state.format !== 1) throw new Error(`${this.machine.game}: unknown save format ${String(state.format)}`);
    if (state.game !== this.machine.game) throw new Error(`save is for "${state.game}", this machine is "${this.machine.game}"`);
    if (this.inFrame) throw new Error(`${this.machine.game}: cannot load mid-frame`);
    // A save is written into the machine as it is walked, and what does not
    // fit is only known at the end. Keep the running machine so a save that
    // does not fit leaves it exactly as it was rather than half replaced.
    const running = this.save();
    const problems = this.restoreMachine(state);
    if (problems.length) {
      const unrestored = this.restoreMachine(running);
      noteCallLinksChanged();
      throw new Error(
        `${this.machine.game}: save state does not match this machine:\n  ${problems.join('\n  ')}` +
        (unrestored.length ? `\nand the running machine could not be put back:\n  ${unrestored.join('\n  ')}` : ''),
      );
    }
    // Everything a handler runtime resolved from the state it had is stale.
    noteCallLinksChanged();
    // MAME's post-load pass: each device rebuilds what its saved members
    // imply (machine.cpp `postload_all_devices`, then the registered hooks).
    for (const device of this.devices.values()) device.postLoad?.();
  }

  /** Write a save into the machine; every part of it that did not fit is returned. */
  private restoreMachine(state: MachineState): string[] {
    const problems: string[] = [];
    for (const [tag, bytes] of Object.entries(this.regions)) {
      const saved = state.regions[tag] ?? this.pristineRegions[tag];
      if (!saved) { problems.push(`region ${tag}: nothing to restore from`); continue; }
      if (saved.length !== bytes.length) { problems.push(`region ${tag}: length ${bytes.length}, saved ${saved.length}`); continue; }
      bytes.set(saved);
    }
    for (const tag of Object.keys(state.regions)) {
      if (!this.regions[tag]) problems.push(`region ${tag}: saved, but this machine has none`);
    }
    for (const [tag, bytes] of Object.entries(this.shares)) {
      const saved = state.shares[tag];
      if (!saved) { problems.push(`share ${tag}: missing from the save`); continue; }
      if (saved.length !== bytes.length) { problems.push(`share ${tag}: length ${bytes.length}, saved ${saved.length}`); continue; }
      bytes.set(saved);
    }
    for (const tag of Object.keys(state.shares)) {
      if (!this.shares[tag]) problems.push(`share ${tag}: saved, but this machine has none`);
    }
    const diagnostics = restoreState(this, state.roots, this.walkOptions());
    for (const diagnostic of diagnostics) problems.push(`${diagnostic.path}: ${diagnostic.message}`);
    for (const sync of this.stateSyncs) sync.restored();
    // Device time ahead of a slice exists only inside one; the overrun a
    // slice left owed (timerCpuCarriedCycles) is part of the save, since a
    // 6502 pays it at its next instruction's fetch (#184).
    this.deviceTimeAheadOfSlice = 0;
    return problems;
  }

  /** MAME's `time()` as add_quantum reads it, in total attoseconds, where the board knows it exactly. */
  private quantumWindowStart(): bigint | undefined {
    const now = this.exactMachineTime();
    return now ? exactToAttos(now) : undefined;
  }

  /**
   * MAME `scheduler::perfect_quantum(duration)`, asked for by a handler.
   *
   * The window starts where the running processor stops: its slice ends
   * after the instruction in progress, as if the request had been
   * synchronized, which is how every driver here issues it -- straight after
   * a latch write, or from the device that stands in for one.
   */
  perfectQuantum(seconds: number): void {
    this.frameRunner?.quantumWindow(seconds, this.quantumWindowStart());
    this.frameRunner?.requestSynchronize();
  }

  /**
   * How far short of the accessing processor's cycle a register access brings
   * the device clock (`catchUpDeviceTime`). MAME's 6502 stops between an
   * instruction's cycles at a timer's expiry, so an access on cycle k finds
   * every timer due before cycle k + 1 already fired: the 2C02's VBLANK flag
   * set during a `BIT $2002` is read by that BIT, not the next one.
   *
   * Under MAME's perfect quantum every slice is one processor cycle, the
   * processor's first: a register access on cycle k finds an executing
   * device through cycle k-1, and the device runs cycle k after it. So the
   * VIC-II shows a colour write from the cycle it lands on, and a CIA's timer
   * reads as it stood. Device time otherwise arrives after the instruction,
   * which put Batman's raster bars a few cycles early (222 pixels against
   * MAME 0.289; now none). Undefined where the timer clock's processor
   * finishes each instruction first, so there is nothing to catch up.
   */
  /**
   * Each processor's address spaces as its compiled class configures them,
   * read from its registered device definition
   * (address_space_config: data width, byte order, address width): the
   * 68000's 16-bit big-endian 24-bit program space, the TMS34010's 16-bit
   * little-endian bit-addressed one. Map ranges are already in bytes (a
   * word- or bit-addressed space was scaled when lowered), so the bus shifts
   * nothing and masks to the byte address width; a map's own global_mask
   * stands where the driver gave one.
   */
  private processorSpaces(machine: BoardIr): void {
    const definitions = new Map((machine.devices ?? []).map(device => [device.tag, device]));
    const semantics = (tag: string, index: number, name: string) => {
      const device = definitions.get(tag);
      const config = device ? generatedDeviceDefinition(generatedDeviceKey(device))?.spaces?.find(space => space.index === index) : undefined;
      if (!config) return undefined;
      return {
        ownerTag: tag,
        name,
        dataWidth: config.dataBits > 8 ? 16 as const : 8 as const,
        addressShift: 0,
        endianness: config.endianness ?? 'big' as const,
        byteAddressBits: config.addressBits - (config.addressShift ?? 0),
      };
    };
    const plain = (space: ReturnType<typeof semantics>) => {
      if (!space) return undefined;
      const { byteAddressBits: _bits, ...rest } = space;
      return rest;
    };
    for (const cpu of machine.execution.cpus) {
      const program = semantics(cpu.tag, 0, 'program');
      if (!program) continue;
      cpu.space ??= plain(program);
      if (cpu.mask === undefined && program.byteAddressBits > 0 && program.byteAddressBits < 32) {
        cpu.mask = 2 ** program.byteAddressBits - 1;
      }
      if (cpu.io) cpu.io.space ??= plain(semantics(cpu.tag, 2, 'io')) ?? { ...plain(program)!, name: 'io' };
    }
    for (const participant of machine.execution.participants ?? []) {
      participant.space ??= plain(semantics(participant.tag, 0, 'program'));
    }
  }

  /**
   * Whether MAME's core for this processor stops between an instruction's
   * cycles: its class keeps an m_inst_substate (the 6502 family).
   */
  private suspendsMidInstruction(specification: { tag: string; type?: string }): boolean {
    return (this.cpus.get(specification.tag)?.suspendsMidInstruction?.() ??
      this.devices.get(specification.tag)?.suspendsMidInstruction?.()) === true;
  }

  private deviceAccessLag(device: Device): number | undefined {
    const timerClockCpu = this.machine.execution.cpus[0];
    if (!timerClockCpu || !this.suspendsMidInstruction(timerClockCpu)) return undefined;
    return this.machine.execution.perfectQuantum === true &&
      device.methodNames().includes('execute_run') ? 1 : 0;
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
    // A bank device's space is as executable as a CPU's (usedHandlers):
    // Missile Command reaches its POKEY through one.
    const rangeSets = [
      ...machine.execution.cpus.map(cpu => [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])]),
      ...(machine.execution.bankDevices ?? []).map(bank => bank.ranges),
    ];
    for (const ranges of rangeSets) {
      for (const range of ranges) {
        for (const [kind, key] of [['read', range.read], ['write', range.write]] as const) {
          if (!key) continue;
          // MAME device tags may themselves contain dots (LS175.3D). Resolve
          // against instantiated tags instead of treating the first dot as
          // an unconditional tag/method delimiter.
          // Or by the class whose own map names it: venture_sound_device maps
          // its 8253 as `FUNC(venture_sound_device::sh8253_w)` on its own CPU,
          // which is the compiled device's method, run on its own members.
          // Interpreted against the board's, `m_stream->update()` reached nothing.
          const byClass = (): string | undefined => {
            const dot = key.lastIndexOf('.');
            const owners = (machine.devices ?? []).filter(device =>
              device.classHierarchy?.includes(key.slice(0, dot)) && this.devices.has(device.tag));
            return owners.length === 1 ? owners[0]!.tag : undefined;
          };
          const tagged = [...this.devices.keys()]
            .filter(candidate => key.startsWith(`${candidate}.`))
            .sort((left, right) => right.length - left.length)[0];
          const tag = tagged ?? byClass();
          if (!tag) continue;
          const method = tagged ? key.slice(tag.length + 1) : key.slice(key.lastIndexOf('.') + 1);
          const device = this.devices.get(tag);
          if (!device) continue;
          if (!device.methodNames().includes(method)) continue;
          // A handler that declares `mem_mask` is told which data lanes the
          // access drives, as MAME tells it; the T-Unit's VRAM writes test
          // ACCESSING_BITS_0_7/8_15 and store nothing without it.
          //
          // The declaration is fixed for the life of the board, so it is read
          // here rather than on every access (arity() and parameters() parse
          // it each time), and the method is reached through its prepared
          // call rather than overload selection per access: the 1541's drive
          // CPU polls its two VIAs thousands of times a frame. `Number(...) || 0`
          // is what `device.call` answers.
          const parameters = device.parameters(method);
          const arity = device.arity(method);
          const masked = parameters.some(parameter => /\bmem_mask\b/.test(parameter));
          const prepared = device.prepareCall?.(method) ??
            ((...args: GeneratedCallArgument[]) => device.invoke(method, ...args));
          const lag = this.deviceAccessLag(device);
          const invoke = lag === undefined ? prepared : (...args: GeneratedCallArgument[]) => {
            this.catchUpDeviceTime?.(lag);
            return prepared(...args);
          };
          // MAME's `address_space &space` first parameter: the accessing
          // processor's bus, built once for the handler.
          const spaced = Boolean(parameters[0]?.includes('address_space'));
          const sameRange = (candidate: RangeSpec) =>
            candidate.start === range.start &&
            candidate.end === range.end &&
            candidate[kind] === key;
          const programCpu = machine.execution.cpus.find(candidateCpu =>
            (candidateCpu.ranges ?? []).some(sameRange));
          const cpuTag = (programCpu ?? machine.execution.cpus.find(candidateCpu =>
            (candidateCpu.io?.ranges ?? []).some(sameRange)))?.tag ??
            machine.execution.cpus[0]?.tag;
          // `space.unmap()`: address_space::m_unmap, zero unless the map says
          // `unmap_value_high()` (the program map's choice is in the IR; an
          // I/O map keeps MAME's default). Seicross's watchdog reset_r
          // answers it, and the game reads the zero.
          const unmapValue = programCpu?.unmapHigh === true ? 0xff : 0;
          const space = spaced ? {
            read_byte: (address: number) => (cpuTag ? this.cpuBuses.get(cpuTag) : undefined)?.read(address) ?? 0xff,
            write_byte: (address: number, value: number) =>
              (cpuTag ? this.cpuBuses.get(cpuTag) : undefined)?.write(address, value),
            unmap: () => unmapValue,
            device: () => ({
              execute: () => ({
                adjust_icount: (delta: number) =>
                  this.adjustGeneratedIcount(cpuTag ?? '', delta),
              }),
            }),
          } : undefined;
          if (kind === 'read') {
            // `(address_space &space, offs_t offset)`: the Taito SJ security
            // interface's data_r tells a status poll from a data read by the
            // offset, which a bare `(offset)` call handed it as the space.
            registry.read[key] = space
              ? (_address, offset) => Number(device.invoke(method, space, offset)) || 0
              : masked
                ? (_address, offset, memMask = 0xffff) => Number(invoke(offset, memMask)) || 0
                : arity
                  ? (_address, offset) => Number(invoke(offset)) || 0
                  : () => Number(invoke()) || 0;
          } else if (masked) {
            registry.write[key] = (_address, offset, data, memMask = 0xffff) => {
              invoke(offset, data, memMask);
            };
          } else if (!space) {
            registry.write[key] = arity <= 1
              ? (_address, _offset, data) => { invoke(data); }
              : (_address, offset, data) => { invoke(offset, data); };
          } else {
            // `(address_space &space, offs_t offset, u8 data)` as the
            // Williams blitter's control_w declares it, or `(space, data)`.
            registry.write[key] = arity >= 3
              ? (_address, offset, data) => { device.invoke(method, space, offset, data); }
              : (_address, _offset, data) => { device.invoke(method, space, data); };
          }
        }
      }
    }
  }

  /**
   * MAME device_execute_interface::adjust_icount. A negative adjustment is the
   * common one: hardware stole cycles from the CPU, so the board holds it back
   * for that many. A positive adjustment gives cycles back.
   */
  /**
   * MAME's `total_cycles()`: everything this CPU has run, including the slice
   * it is inside. Banked cycles alone advance only at slice boundaries.
   */
  /**
   * MAME's `vector_device` as its generators see it: the display list they
   * append to (`add_point`) and restart (`clear_list`), kept as host state so
   * the renderer can draw it and a save state carries it. Only the endpoint
   * list is here; the line drawing is the renderer's (vector_device's own
   * screen_update hands MAME's render container the same list).
   */
  private vectorDisplay(screen: object): object {
    if (this.vectorDisplayHost) return this.vectorDisplayHost;
    const list = this.vectorPoints;
    this.vectorDisplayHost = {
      // x, y, rgb, intensity per point; vector.cpp clamps the intensity.
      add_point: (x: number, y: number, color: number, intensity: number) => {
        // vector.cpp's MAX_POINTS (20000): a full list overwrites its last
        // point rather than growing.
        if (list.points.length >= 20000 * 4) list.points.length -= 4;
        list.points.push(x | 0, y | 0, color >>> 0, Math.max(0, Math.min(255, intensity | 0)));
        return 0;
      },
      clear_list: () => {
        list.points.length = 0;
        return 0;
      },
      started: () => 1,
      set_tag: () => 0,
      screen: () => screen,
    };
    return this.vectorDisplayHost;
  }

  /**
   * A processor's instruction-cycle clock, as `set_unscaled_clock` last left
   * it. The decoded board keeps the configured rate; a change is host state,
   * so a save state carries it.
   */
  private cycleClockOf(cpu: GeneratedExecutionCpu): number {
    const override = this.cpuClocks.rates[cpu.tag];
    return Math.max(1, override ?? cpu.cycleClock ?? cpu.clock);
  }

  /**
   * How long one of a processor's cycles lasts: HZ_TO_ATTOSECONDS(clock),
   * truncated, as MAME's m_attoseconds_per_cycle. Every cycle-to-time
   * conversion uses it, and time-to-cycles divides by it. Xevious's 3.072 MHz
   * Z80 writes the 06xx exactly on its 48 kHz clock's edges; MAME's time
   * stands a hair short of each, and the 06xx's NMI timer armed from it
   * starts an edge earlier. Converted back by the untruncated clock, the
   * Game Boy PPU's `attotime_to_cycles(now - m_last_updated)` came a cycle
   * short and Tetris left MAME at frame 341.
   */
  private secondsPerCycleOf(cpu: GeneratedExecutionCpu): number {
    return Math.floor(1e18 / this.cycleClockOf(cpu)) * 1e-18;
  }

  /**
   * Emulated time on a processor's own cycle count. A clock change starts a
   * new epoch, so the cycles run before it keep the rate they ran at.
   */
  private cpuSeconds(cpu: GeneratedExecutionCpu): number {
    const epoch = this.cpuClocks.epochs[cpu.tag];
    const cycles = this.totalCycles(cpu.tag);
    const secondsPerCycle = this.secondsPerCycleOf(cpu);
    return epoch
      ? epoch.seconds + (cycles - epoch.cycles) * secondsPerCycle
      : cycles * secondsPerCycle;
  }

  /** MAME `device_t::set_unscaled_clock` on a processor. */
  private setCpuClock(cpu: GeneratedExecutionCpu, clock: number): void {
    const configured = cpu.cycleClock ?? cpu.clock;
    const cycleClock = Number(clock) * (configured / Math.max(1, cpu.clock));
    if (!(cycleClock > 0) || cycleClock === this.cycleClockOf(cpu)) return;
    this.cpuClocks.epochs[cpu.tag] = { cycles: this.totalCycles(cpu.tag), seconds: this.cpuSeconds(cpu) };
    this.cpuClocks.rates[cpu.tag] = cycleClock;
    this.soundRuntime?.cpuTimeMoved?.(cpu.tag);
    this.frameRunner?.setClock(cpu.tag, cycleClock);
  }

  /**
   * MAME `machine().time()`: the scheduler's own clock.
   *
   * MAME advances it as the executing processor consumes cycles, so hardware
   * that measures an interval by differencing two readings sees real elapsed
   * time. Answering with the frame counter made every such interval either
   * zero or a whole frame. Inside a timer callback the scheduler stands at the
   * expiry, not at the end of the lump that carried the clock past it, so the
   * backlog comes back off.
   */
  private machineSeconds(): number {
    // Inside a device timer's callback the time is that timer's expiry, as
    // MAME's scheduler has it (see generatedTimerExpiry).
    const expiry = generatedTimerExpiry();
    if (expiry !== undefined) return expiry;
    // Between timeslices the scheduler stands at its base, not where the
    // processor stopped a fraction of a cycle short of it (atSchedulerTime).
    if (this.schedulerSeconds !== undefined && this.runningCpu === undefined && !this.runningRoundDevice) {
      return this.schedulerSeconds;
    }
    // A device running in the round stands at its own local time.
    if (this.runningRoundDevice) return this.roundDeviceSeconds(this.runningRoundDevice) ?? 0;
    this.catchUpDeviceTime?.();
    // The scheduler stands where the processor it is running stands, so the
    // clock comes from that core -- not from the first one declared, which on
    // a multiprocessor board is often parked while another runs.
    const tag = this.runningCpu ?? this.machine.execution.cpus[0]?.tag;
    const cpu = this.machine.execution.cpus.find(candidate => candidate.tag === tag);
    if (!cpu) return 0;
    return Math.max(0, this.cpuSeconds(cpu) - generatedTimerBacklog());
  }

  /**
   * Run a screen timer's work -- the presentation, a frame event -- with
   * machine time at the scheduler's base, as MAME's screen_update and
   * vblank callbacks see it. The processors stop on whole cycles, so the one
   * the board keeps time by stands up to a cycle short of the event; a
   * driver timer armed there from `machine().time()` plus a
   * `time_until_pos` measured from the beam came out that much early.
   * Exidy's collision timers then raised Venture's IRQ an instruction
   * before MAME's, and its RAM drifted from frame 2048 (#271).
   */
  private atSchedulerTime<T>(run: () => T): T {
    const cpu = this.machine.execution.cpus[0];
    if (!cpu || this.runningCpu !== undefined || generatedTimerExpiry() !== undefined) return run();
    const outer = this.schedulerSeconds;
    this.schedulerSeconds = Math.max(0, this.cpuSeconds(cpu) - this.frameRunner.secondsAhead(cpu.tag));
    try {
      return run();
    } finally {
      this.schedulerSeconds = outer;
    }
  }

  /**
   * Where a device the round schedules (autonomousProcessors) stands: the
   * cycles it has run, and inside its slice those its execute_run has
   * already counted off m_icount. Undefined for anything else.
   */
  private roundDeviceSeconds(tag: string): number | undefined {
    const round = this.roundDevices.get(tag);
    if (!round) return undefined;
    const running = round.running
      ? round.running.target - Number(round.running.device.get(round.running.device.icountMember ?? 'm_icount'))
      : 0;
    return (round.cycles + running) / Math.max(1, this.devices.get(tag)!.cycleClock());
  }

  private totalCycles(cpuTag: string): number {
    return (this.cpuCycles.get(cpuTag) ?? 0)
      // A processor between slices has booked its whole slice in cpuCycles.
      + (cpuTag === this.runningCpu ? this.runningSliceCycles : 0)
      // The slice total only moves between instructions. A device read or
      // write happens *inside* one, and MAME counts the cycles the current
      // instruction has already paid for -- so a cycle-accurate core is asked
      // for them here.
      + (this.cpus.get(cpuTag)?.elapsedCycles?.() ?? 0);
  }

  /**
   * MAME `device_execute_interface::adjust_icount`.
   *
   * A negative delta is hardware taking the bus away: the processor loses those
   * cycles now, where it stands. The Atari 2600's WSYNC parks the 6507 until
   * the beam reaches the next scanline, and deferring that to the following
   * slice short-changed every line -- River Raid ran 244 scanlines to the frame
   * instead of 262, by a different amount each time, which is what made the
   * picture flicker. The running core is told to end its slice; anything it
   * cannot absorb there carries to the next one.
   */
  private adjustGeneratedIcount(cpuTag: string, delta: number, spin = false): number {
    if (!cpuTag || !delta) return 0;
    const stall = Math.max(0, -delta);
    const cpu = this.cpus.get(cpuTag) as { stallCycles?: number } | undefined;
    // Charged against the slice the processor is inside, so the cycles come off
    // where the hardware took them. Charges accumulate: System 1 bills one per
    // slow access and can do so several times inside a slice.
    if (stall && cpu && this.runningCpu === cpuTag && typeof cpu.stallCycles === 'number') {
      cpu.stallCycles += stall;
      return 0;
    }
    // adjust_icount on a processor that is not executing moves *m_icountptr,
    // which the scheduler overwrites when the processor's next slice starts:
    // MAME loses it. Seicross's MCU reads its reset vector through its
    // wait-state taps when the Z80 resets it, between slices; carried into
    // the next slice, those two-per-read cycles put it 4 cycles behind MAME
    // (#284). spin_until_time is a real suspension and is kept.
    if (!spin && this.runningCpu !== cpuTag) return 0;
    this.cpuStalls.set(cpuTag, Math.max(0, (this.cpuStalls.get(cpuTag) ?? 0) + stall));
    return 0;
  }

  /**
   * MAME's daisy_init: the devices a Z80's `set_daisy_config` names, linked
   * highest priority first through each one's `m_daisy_next`, with the head
   * in the CPU's `m_chain`. The CPU's own compiled z80daisy.cpp walks the
   * chain from there. The links are wiring, kept out of save states: the
   * chain is rebuilt from the configuration, never restored.
   */
  private linkDaisyChain(specification: GeneratedExecutionCpu, cpu: Cpu): void {
    if (!specification.daisyChain?.length) return;
    const links = specification.daisyChain.map(tag => {
      const handle = this.devices.get(tag)?.instance?.() as Record<string, unknown> | undefined;
      if (!handle || typeof handle.z80daisy_irq_state !== 'function') {
        throw new Error(`${specification.tag}: daisy chain device ${tag} does not implement the z80daisy interface`);
      }
      return handle;
    });
    links.forEach((handle, index) => {
      Object.defineProperty(handle, 'm_daisy_next', {
        value: links[index + 1] ?? 0, writable: true, enumerable: false, configurable: true,
      });
      // device_interface::device(): the device the interface is part of.
      // z80_daisy_chain_interface::interface_post_reset resets every chained
      // device after the Z80's own reset, as `intf->device().reset()`.
      const device = this.devices.get(specification.daisyChain![index]!)!;
      Object.defineProperty(handle, 'device', {
        value: () => ({ reset: () => { device.reset(); return 0; } }), writable: true, enumerable: false, configurable: true,
      });
    });
    cpu.set('m_chain', links[0] as unknown as number);
  }

  /**
   * Run a mounted cartridge's own `install_memory_handlers` and keep what it
   * asked for.
   *
   * Some cartridge buses are not describable by an address map: an Atari 2600
   * cartridge installs itself into the 6507's space when it is mounted, and its
   * bank switching is a read tap on a ROM address rather than anything the
   * driver's map could name. MAME's installer is the authority on what a PCB
   * decodes, so the host runs it rather than restating it -- which is what lets
   * one capability cover every banking scheme MAME declares.
   *
   * Base installs become ordinary ranges appended after the driver's, so a
   * later install wins exactly as it does in MAME. Taps answer nothing, so they
   * are returned for the bus to layer over whatever does.
   */
  private installCartridgeMemoryHandlers(
    machine: BoardIr,
    registry: HandlerRegistry,
  ): ((address: number) => void)[] {
    const taps: ((address: number) => void)[] = [];
    for (const [tag, device] of this.devices) {
      if (device.role() !== 'cartridge') continue;
      const space = new RecordingAddressSpace();
      // The program map's unmap value, which a card's handler reads back
      // through `space.unmap()`: the Game Boy's map is unmap_value_high.
      space.unmapValue = machine.execution.cpus[0]?.unmapHigh === true ? 0xff : 0;
      // Which method mounts a card, and whether it is handed the space or
      // reaches for it, is the bus's own fact and travels in the slot IR. A
      // PCB with no installer of its own decodes nothing extra, as an empty
      // slot does; an installer that throws is a failure, never swallowed.
      if (!device.installSlotCard(space) || !space.entries.length) continue;
      const cpu = machine.execution.cpus[0];
      if (!cpu) continue;
      const ranges = cpu.ranges ??= [];
      // One installed window as a bus range: under the driver's map, or as an
      // entry of a view the card installed.
      const install = (entry: InstalledEntry, key: string, view?: { viewTag: string; viewEntry: number }): void => {
        if (entry.kind === 'tap') {
          const { start, end, read, write } = entry;
          const observe = read ?? write;
          if (!observe) return;
          taps.push(address => {
            if (address >= start && address <= end) observe(address, 0, 0xff);
          });
          return;
        }
        const { start, end, mirror } = entry;
        let read: ReadHandler | undefined;
        let write: WriteHandler | undefined;
        if (entry.kind === 'rom') {
          const { bytes } = entry;
          read = address => Number(bytes[installedOffset(address, start, mirror) % bytes.length] ?? 0xff) & 0xff;
          // `install_ram`: the same bytes, written too. A window recorded
          // through install_rom never is: the bus has no write there.
          if (entry.writable) {
            write = (address, _offset, data) => {
              (bytes as { [index: number]: number })[installedOffset(address, start, mirror) % bytes.length] = data & 0xff;
            };
          }
        } else if (entry.kind === 'bank') {
          const { bank } = entry;
          if (entry.read) read = address => bank.read(installedOffset(address, start, mirror)) & 0xff;
          if (entry.write) {
            write = (address, _offset, data) =>
              bank.write(installedOffset(address, start, mirror), data & 0xff);
          }
        } else {
          const handler = entry;
          if (handler.read) {
            read = address => Number(handler.read!(installedOffset(address, start, mirror))) & 0xff;
          }
          if (handler.write) {
            write = (address, _offset, data) =>
              void handler.write!(installedOffset(address, start, mirror), data & 0xff);
          }
        }
        if (read) registry.read[key] = read;
        if (write) registry.write[key] = write;
        ranges.push({
          start,
          end: Math.max(end, start),
          kind: 'handler',
          ...(mirror ? { mirror } : {}),
          ...(read ? { read: key } : {}),
          ...(write ? { write: key } : {}),
          ...view,
        });
      };
      for (const [index, entry] of space.entries.entries()) install(entry, `cartridge:${tag}:${index}`);
      // A view the card installed into the space (`cart_space()->install_view(
      // 0xa000, 0xbfff, m_view_ram)`), each entry's windows under the view's
      // own tag: the bus decodes the selected entry over the map beneath, and
      // none while the card has the view disabled. A Game Boy MBC's cartridge
      // RAM is one, opened and closed by its RAM-enable register.
      for (const [number, view] of space.views.entries()) {
        const viewTag = `cartridge:${tag}:view${number}`;
        for (const [viewEntry, entries] of view.entries) {
          for (const [index, entry] of entries.entries()) {
            install(entry, `${viewTag}:${viewEntry}:${index}`, { viewTag, viewEntry });
          }
        }
        this.cartridgeViews.push({ cpu: cpu.tag, viewTag, view });
      }
    }
    return taps;
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
    for (const bank of machine.execution.bankDevices ?? []) {
      Object.assign(registry.read, portHandlers(bank.ranges, inputs));
    }
    // A processor's own internal map (the TMS34010's I/O registers) names its
    // handlers `<cpu tag>.<method>`; they are the core's own methods, found
    // when first called because the cores are created after the buses.
    const cpuTags = new Set(machine.execution.cpus.map(cpu => cpu.tag));
    for (const kind of ['read', 'write'] as const) {
      for (const key of usedHandlers(machine, kind)) {
        const tag = key.slice(0, key.lastIndexOf('.'));
        const method = key.slice(key.lastIndexOf('.') + 1);
        if (!cpuTags.has(tag) || registry[kind][key]) continue;
        if (kind === 'read') {
          registry.read[key] = (_address, offset, memMask = 0xffff) =>
            Number(this.cpus.get(tag)?.invoke(method, offset, memMask)) || 0;
        } else {
          registry.write[key] = (_address, offset, data, memMask = 0xffff) =>
            void this.cpus.get(tag)?.invoke(method, offset, data, memMask);
        }
      }
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
            const { vbend = 0 } = this.machine.execution.screen;
            const vbstart = this.configuredRaster()?.vbstart ?? this.machine.execution.screen.vbstart;
            const beam = this.beamLine();
            const inVblank = vbstart > vbend
              ? beam >= vbstart || beam < vbend
              : beam >= vbstart && beam < vbend;
            const line = custom.activeLow ? Number(!inVblank) : Number(inVblank);
            const shift = trailingZeroBits(custom.mask);
            value = (value & ~custom.mask) | ((line << shift) & custom.mask);
            continue;
          }
          // PORT_READ_LINE_DEVICE_MEMBER: the bit is another device's output
          // line, answered live rather than by a switch.
          if (custom.source === 'device-line') {
            // A line belonging to hardware the board does not instantiate
            // leaves the bit as the port supplies it, which is what an
            // unresolved handler custom already does.
            const device = custom.deviceTag ? this.devices.get(custom.deviceTag) : undefined;
            const specification = machine.devices?.find(candidate =>
              candidate.tag === custom.deviceTag);
            const eeprom = custom.deviceTag
              ? this.declarativeEeprom.get(custom.deviceTag)
              : undefined;
            if (!device?.methodNames().includes(custom.member) && !eeprom) continue;
            const line = eeprom
              ? Number(eeprom.invoke(custom.member))
              : Number(device!.invoke(custom.member)) ? 1 : 0;
            const level = custom.activeLow ? Number(!line) : line;
            const shift = trailingZeroBits(custom.mask);
            value = (value & ~custom.mask) | ((level << shift) & custom.mask);
            continue;
          }
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
            // memory_array::write16 stores the word in the share's own byte
            // order, which read_entry reads back in the same order.
            const high = machine.video?.ramPalette?.endianness === 'big' ? 0 : 1;
            if (memMask & 0xff00) {
              bytes[(offset * 2 + high) & 0xffff] = (data >>> 8) & 0xff;
              this.videoPrimitives?.writePaletteRam?.(offset * 2 + high, data >>> 8, ext);
            }
            if (memMask & 0x00ff) {
              bytes[(offset * 2 + 1 - high) & 0xffff] = data & 0xff;
              this.videoPrimitives?.writePaletteRam?.(offset * 2 + 1 - high, data, ext);
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
        // tilemap_device::write16: the Bus has already stored the word in the
        // shared RAM; what remains is `mark_tile_dirty(offset)`. The generated
        // tilemap caches resolved tiles, so without it a playfield written
        // after the first draw kept its power-on contents (Marble Madness's
        // screen stayed black).
        const member = machine.devices?.find(device => device.tag === deviceTag)?.member;
        registry.write[key] = (_address, offset) => {
          const tilemap = member
            ? this.state[member] as { mark_tile_dirty?: (index: number) => void } | undefined
            : undefined;
          tilemap?.mark_tile_dirty?.(offset);
        };
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
      if (/^K0\d+/.test(deviceType)) {
        const bytes = this.generatedResources[`registers:${deviceTag}`] as Uint8Array |
          undefined ?? new Uint8Array(0x10000);
        this.generatedResources[`registers:${deviceTag}`] = bytes;
        registry.write[key] = (_address, offset, data) => {
          bytes[offset & 0xffff] = data & 0xff;
        };
        continue;
      }
    }
    for (const key of usedHandlers(machine, 'read')) {
      if (registry.read[key]) continue;
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
      if (/^K0\d+/.test(deviceType)) {
        const bytes = this.generatedResources[`registers:${deviceTag}`] as Uint8Array |
          undefined ?? new Uint8Array(0x10000);
        this.generatedResources[`registers:${deviceTag}`] = bytes;
        registry.read[key] = (_address, offset) => bytes[offset & 0xffff]!;
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

  /**
   * A sound chip's `device_rom_interface` reads through its own address space
   * 0 (the Williams ADPCM OKI's banked low half): each window is a fixed region
   * offset or the bank's selected entry, read when the chip reads.
   */
  private deviceRomRead(tag: string, windows: readonly GeneratedSampleWindow[], regions: Regions): (address: number) => number {
    return address => {
      const region = regions[tag];
      if (!region) return 0;
      const window = windows.find(candidate => address >= candidate.start && address <= candidate.end);
      if (!window) return 0;
      const base = window.bank
        ? window.bank.entryOffsets[this.bankSelection.get(window.bank.tag)?.entry ?? window.bank.initialEntry] ?? 0
        : window.regionOffset ?? 0;
      return region[base + address - window.start] ?? 0;
    };
  }

  private installMemoryBanks(
    machine: BoardIr,
    regions: Regions,
    registry: HandlerRegistry,
    sinks: BoardSinks,
  ): void {
    // The driver's own banks no plan describes: configured only by its code
    // as it runs. Each holds the region and offset it points at, which is what
    // a save keeps of it.
    for (const { member, tag } of machine.execution.memoryBanks ?? []) {
      const bank = new DriverMemoryBank(regions, `${machine.game}: memory bank "${tag}"`);
      this.state[member] = bank;
      for (const alias of [tag, `m_${tag}`, member]) {
        this.bindings.calls![`${alias}.set_base`] = ((base: unknown) => bank.set_base(base)) as never;
        this.bindings.calls![`${alias}.configure_entry`] = ((entry: number, base: unknown) => bank.configure_entry(entry, base)) as never;
        this.bindings.calls![`${alias}.configure_entries`] = ((first: number, count: number, base: unknown, stride: number) =>
          bank.configure_entries(first, count, base, stride)) as never;
        this.bindings.calls![`${alias}.set_entry`] = (entry: number) => bank.set_entry(entry);
        this.bindings.calls![`${alias}.entry`] = () => bank.entry();
        this.bindings.calls![`${alias}.base`] = (() => bank.base()) as never;
      }
    }
    for (const bank of machine.execution.banks ?? []) {
      const region = bank.region ? regions[bank.region] : undefined;
      // The entries as the machine configures them: the static plan, then
      // whatever its own configure_entry/configure_entries calls place.
      const entryOffsets: (number | null)[] = [...bank.entryOffsets];
      const entryRegions: (string | null | undefined)[] = [...(bank.entryRegions ?? [])];
      if (bank.region && !region) {
        throw new Error(`${machine.game}: memory bank "${bank.tag}" has no region "${bank.region}"`);
      }
      for (const entryRegion of new Set(entryRegions?.filter(Boolean) ?? [])) {
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
      // A RAM device's own bytes: the device allocates them, the bank only
      // windows them, so a write through either is seen by both.
      const deviceStorage = bank.device ? this.bankDeviceStorage(bank.device) : undefined;
      if (bank.device && !deviceStorage) {
        throw new Error(`${machine.game}: memory bank "${bank.tag}" has no storage on device "${bank.device}"`);
      }
      if (!region && !deviceStorage && !ownedEntries?.some(Boolean)) {
        throw new Error(`${machine.game}: memory bank "${bank.tag}" has no backing storage`);
      }
      const selection = this.hostModel(`bank.${bank.tag}`, {
        entry: Math.max(0, bank.initialEntry ?? entryOffsets.findIndex(value => value !== null)),
      });
      const setEntry = (value: number): number => {
        const configured = entryOffsets[value];
        if (configured === undefined || configured === null) {
          throw new Error(
            `${machine.game}: memory bank "${bank.tag}" selected invalid entry ${value}`,
          );
        }
        selection.entry = value;
        return value;
      };
      this.bankEntry.set(bank.tag, setEntry);
      this.bankSelection.set(bank.tag, selection);
      const pending = this.pendingBankEntry.get(bank.tag);
      if (pending !== undefined) {
        setEntry(pending);
        this.pendingBankEntry.delete(bank.tag);
      }
      // `memory_bank::base()`: the selected entry's bytes, which the 128K's
      // RAM handlers index directly.
      const entryBytes = (): Uint8Array | undefined => {
        const owned = ownedEntries?.[selection.entry];
        if (owned) return owned;
        const offset = entryOffsets[selection.entry] ?? 0;
        if (deviceStorage) return deviceStorage.subarray(offset);
        const entryRegionName = entryRegions[selection.entry] ?? bank.region;
        const entryRegion = entryRegionName ? regions[entryRegionName] : region;
        return entryRegion?.subarray(offset);
      };
      // `configure_entries(first, count, base, stride)` from driver code run at
      // start: each entry is wherever its pointer points, in the region it
      // points into (gng's machine_start banks its program ROM this way).
      const placeEntry = (value: number, base: unknown): void => {
        // Or in the storage of the device the bank is configured over: the
        // 128K's machine_start places each RAM bank at `m_ram->pointer()`.
        const stored = deviceStorage && regionOffsetOf({ storage: deviceStorage }, base);
        if (stored) {
          entryOffsets[value] = stored.offset;
          return;
        }
        const placed = regionOffsetOf(regions, base);
        if (!placed) {
          throw new Error(`${machine.game}: memory bank "${bank.tag}" entry ${value} points into no region`);
        }
        entryOffsets[value] = placed.offset;
        entryRegions[value] = placed.region;
      };
      const configureEntries = (first: number, count: number, base: unknown, stride: number): number => {
        for (let index = 0; index < count; index++) {
          placeEntry(first + index, offsetGeneratedPointer(base, index * stride));
        }
        return 0;
      };
      for (const alias of [bank.tag, `m_${bank.tag}`, bank.member]) {
        this.bindings.calls![`${alias}.set_entry`] = setEntry;
        this.bindings.calls![`${alias}.configure_entries`] ??= configureEntries as never;
        this.bindings.calls![`${alias}.entry`] ??= () => selection.entry;
        this.bindings.calls![`${alias}.base`] ??= entryBytes as never;
        // `memory_bank::set_base(ptr)`: the selected entry now points there.
        this.bindings.calls![`${alias}.set_base`] ??= ((base: unknown) => {
          if (ownedEntries && base instanceof Uint8Array) ownedEntries[selection.entry] = base;
          else placeEntry(selection.entry, base);
          return 0;
        }) as never;
        if (!ownedEntries) {
          this.bindings.calls![`${alias}.configure_entry`] ??= ((value: number, base: unknown) => {
            placeEntry(value, base);
            return value;
          }) as never;
        }
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
        const owned = ownedEntries?.[selection.entry];
        if (owned) return owned[offset] ?? 0xff;
        if (deviceStorage) return deviceStorage[(entryOffsets[selection.entry] ?? 0) + offset] ?? 0xff;
        const entryRegionName = entryRegions[selection.entry] ?? bank.region;
        const entryRegion = entryRegionName ? regions[entryRegionName] : region;
        const base = bank.dynamicShift !== undefined && entryRegion
          ? 0x10000 + ((selection.entry << bank.dynamicShift) & ((entryRegion.length - 0x10001) & 0x3ffff))
          : entryOffsets[selection.entry] ?? 0;
        return entryRegion?.[base + offset] ?? 0xff;
      };
      registry.write[`bank.${bank.tag}`] = (_address, offset, data) => {
        const owned = ownedEntries?.[selection.entry];
        if (owned) {
          if (offset >= 0 && offset < owned.length) owned[offset] = data;
          return;
        }
        if (deviceStorage) {
          const index = (entryOffsets[selection.entry] ?? 0) + offset;
          if (index >= 0 && index < deviceStorage.length) deviceStorage[index] = data;
          return;
        }
        const entryRegionName = entryRegions[selection.entry] ?? bank.region;
        const entryRegion = entryRegionName ? regions[entryRegionName] : region;
        const base = bank.dynamicShift !== undefined && entryRegion
          ? 0x10000 + ((selection.entry << bank.dynamicShift) & ((entryRegion.length - 0x10001) & 0x3ffff))
          : entryOffsets[selection.entry] ?? 0;
        const index = base + offset;
        if (entryRegion && index >= 0 && index < entryRegion.length) entryRegion[index] = data;
      };
    }
  }

  /** The bytes a RAM device allocated (`ram_device::m_pointer`), for a bank over them. */
  private bankDeviceStorage(tag: string): Uint8Array | undefined {
    return this.deviceAllocations.get(tag);
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
    // Each device's method names, read once: the stream pump asks before every
    // render, and methodNames() builds a fresh array of all of them.
    const deviceMethods = new Map<Device, ReadonlySet<string>>();
    // Sound devices a board device is built out of, the card in its slot
    // included: they are reached by their MAME tags like any other.
    const descendants = new Map<string, Device>();
    const streamDescendants: { tag: string; gain: number }[] = [];
    for (const device of this.devices.values()) {
      for (const descendant of device.streamDescendants?.() ?? []) {
        descendants.set(descendant.tag, descendant.device);
        streamDescendants.push({ tag: descendant.tag, gain: descendant.gain });
      }
    }
    const deviceFor = (tag: string): Device | undefined => this.devices.get(tag) ?? descendants.get(tag);
    const hooks = installSoundRuntime({
      board: machine,
      sound: machine.sound,
      calls: this.bindings.calls!,
      state: this.state,
      soundWrite: (offset, data, frac, method, left, right) => (left === undefined
        ? sinks.soundWrite(offset, data, frac, method)
        : sinks.soundWrite(offset, data, frac, method, left, right)),
      ...(sinks.observeStreams?.length ? { observeStreams: sinks.observeStreams } : {}),
      fraction: () => this.soundFraction(),
      time: () => this.machineSeconds(),
      deviceTime: tag => this.roundDeviceSeconds(tag),
      cpuCycleClock: tag => {
        const cpu = machine.execution.cpus.find(candidate => candidate.tag === tag);
        return cpu ? this.cycleClockOf(cpu) : 0;
      },
      settledTime: () => {
        const cpus = machine.execution.cpus;
        let settled = Infinity;
        for (let index = 0; index < cpus.length; index++) {
          const seconds = this.cpuSeconds(cpus[index]!);
          if (seconds < settled) settled = seconds;
        }
        return settled;
      },
      systemMuted: () => Boolean(this.state.systemSoundMuted),
      bindDeviceCall: (tag, name, callback) => deviceFor(tag)?.bindCall(name, callback),
      callDevice: (tag, method, ...args) => {
        const device = deviceFor(tag);
        if (!device) return undefined;
        let methods = deviceMethods.get(device);
        if (!methods) deviceMethods.set(device, methods = new Set(device.methodNames()));
        if (!methods.has(method)) return undefined;
        // `invoke` rather than `call`: a stream-rendering chip is handed
        // MAME's `sound_stream` surface, which is an object, not a number.
        return Number(device.invoke(method, ...args as GeneratedCallArgument[])) || 0;
      },
      deviceStreamRate: tag => deviceFor(tag)?.streamRate?.(),
      deviceStreams: tag => deviceFor(tag)?.streams?.() ?? [],
      streamDescendants: () => streamDescendants,
    });
    // device_t::set_unscaled_clock on any generated device the board drives:
    // the device's own (its clock, then device_clock_changed). Recorded as
    // well, so a contract can see the board change it.
    for (const specification of machine.devices ?? []) {
      const referent = this.deviceReferents.get(specification.tag) as
        { set_unscaled_clock?: (clock: number) => unknown } | undefined;
      if (typeof referent?.set_unscaled_clock !== 'function') continue;
      for (const alias of [specification.tag, `m_${specification.tag}`, specification.member]
        .filter((value): value is string => Boolean(value))) {
        this.bindings.calls![`${alias}.set_unscaled_clock`] ??= clock => {
          referent.set_unscaled_clock!(Number(clock));
          sinks.soundWrite(0, Math.round(Number(clock)) & 0xff, this.soundFraction(), `${specification.tag}.set_unscaled_clock`);
          return 0;
        };
      }
    }
    return hooks;
  }

  /**
   * How far through the current frame the machine is, 0..1, on the beam
   * clock; 1 between frames. MAME's `ioport_manager::frame_interpolate`
   * hands a relative control's frame of travel out gradually against this,
   * so a game that reads a trackball counter several times a frame sees
   * small steps rather than one lump.
   */
  frameFraction(): number {
    return this.inFrame ? Math.min(1, this.soundFraction()) : 1;
  }

  /**
   * Lines the beam has travelled since the frame in progress began, which is
   * the line the frame runner starts frames on (`originLine`), not line 0: a
   * frame runs from vbstart round to the line before it. Measured from line
   * 0 it ran 0.92..1 then back through 0..0.92 within one frame, and every
   * sound write stamped with it played out of order -- Gyruss's i8039 DAC and
   * Mat Mania's sound CPU garbled (#184).
   *
   * Inside a slice it is where the running processor stands, counting the
   * cycles its current instruction has already paid for, as MAME's
   * machine().time() does. `currentLineFraction` is the progress through the
   * whole round, so every write of a round was squeezed into its last line
   * and the next round jumped ahead: Mat Mania's DAC ran 2 cycles a sample
   * and 4% of its writes went backwards (#194).
   */
  private frameLines(): number {
    const tag = this.runningCpu;
    const running = tag
      ? this.frameRunner?.runningFrameLines(this.runningSliceCycles + (this.cpus.get(tag)?.elapsedCycles?.() ?? 0))
      : undefined;
    if (running !== undefined) return running;
    const vtotal = Math.max(1, this.machine.execution.screen.vtotal);
    const origin = this.frameRunner?.originLine ?? 0;
    return (this.currentLine - origin + vtotal) % vtotal + this.currentLineFraction;
  }

  private soundFraction(): number {
    return this.frameLines() / this.machine.execution.screen.vtotal;
  }

  /**
   * Executors for the typed effects the compiler resolved. This switches on a
   * closed union; the MAME method names that used to be re-parsed here are
   * interpreted once, during generation, by src/ir/lower-connections.ts.
   */
  /**
   * A device class's own handler, resolved the way MAME resolves it for that
   * device rather than for the board. Two finders are device-relative:
   * `m_cpu`, the conventional name for a sound board's own processor, which
   * more than one class on a board can declare (Spy Hunter carries both an
   * SSIO and a Cheap Squeak Deluxe); and `memregion`, whose tag MAME looks up
   * under the device ("proms" is "ssio:proms"). Left board-scoped,
   * midway_ssio_device::irq_clear could not drop the /SINT line it is read to
   * clear and the sound CPU never left its interrupt handler.
   */
  private deviceHandlerBindings(handler: GeneratedHandler): GeneratedHandlerBindings {
    let bindings = generatedCompositeCallbackBindings(
      this.machine,
      handler.ownerClass,
      tag => this.devices.has(tag),
      () => this.effects,
      this.cardScope(handler.ownerClass)?.bindings ?? this.bindings,
    );
    const cpuTag = hostedCpuTagForClass(this.machine, handler.ownerClass);
    if (cpuTag) bindings = generatedCpuMemberBindings(bindings, cpuTag);
    const owners = (this.machine.devices ?? [])
      .filter(device => device.classHierarchy?.includes(handler.ownerClass));
    const deviceTag = owners.length === 1 ? owners[0]!.tag : undefined;
    if (deviceTag) {
      bindings = {
        ...bindings,
        referenceCalls: {
          ...bindings.referenceCalls,
          memregion: (...args: unknown[]) => {
            const tag = String(generatedCallValue(args[0]) ?? '');
            const bytes = this.regions[`${deviceTag}:${tag}`] ?? this.regions[tag];
            if (!bytes) throw new Error(`${this.machine.game}: no ROM region "${tag}"`);
            return memoryRegionObject(bytes);
          },
        },
      };
    }
    return bindings;
  }

  /**
   * The scope a composed slot card's handlers run in.
   *
   * A card that carries its own processor (the C64's 1541) is a machine of
   * its own, compiled into board handlers. In MAME its members and finders
   * are its own: the 1541 calls its 6502 `m_maincpu` exactly as the C64 calls
   * its 6510. So its handlers see a member store of their own -- built on the
   * board's, so a name the card never declares still resolves -- in which
   * each of the card's finders holds the card's device, and a call table on
   * which `m_maincpu.set_input_line` is the drive's processor. The store is
   * also the card itself: `this`, the object its bus attaches (`tag()`,
   * `interface()`, and the interface overrides the bus calls).
   */
  private cardScope(ownerClass: string): { instance: Record<string, unknown>; bindings: GeneratedHandlerBindings } | undefined {
    const card = (this.machine.devices ?? []).find(device =>
      device.interfaceHandlers?.length && device.classHierarchy?.includes(ownerClass));
    if (!card) return undefined;
    const cached = this.cardScopes.get(card.tag);
    if (cached) return cached;
    const instance = Object.create(this.state) as Record<string, unknown>;
    const calls = Object.create(this.bindings.calls ?? null) as NonNullable<GeneratedHandlerBindings['calls']>;
    const bindings: GeneratedHandlerBindings = { ...this.bindings, members: instance, calls, setters: {} };
    const scope = { instance, bindings };
    this.cardScopes.set(card.tag, scope);
    this.populateCardScope(card, scope);
    instance.this = instance;
    instance.tag = () => card.tag;
    instance.interface = () => instance;
    for (const key of card.interfaceHandlers ?? []) {
      const handler = this.machine.handlers?.find(candidate =>
        `${candidate.ownerClass}.${candidate.method}` === key);
      if (!handler?.program || handler.program.diagnostics.length) continue;
      const names = handlerParameterNames(handler.parameters);
      instance[handler.method] = (...args: unknown[]) => executeGeneratedMachineHandler(
        this.machine,
        handler,
        this.deviceHandlerBindings(handler),
        Object.fromEntries(names.map((name, index) => [name, args[index] ?? 0])),
      ) ?? 0;
    }
    noteCallLinksChanged();
    return scope;
  }

  /**
   * Give a card's scope its finders: each of the card's devices, and the
   * calls MAME source makes on them by the card's own member names. A scope
   * can be asked for before the processors exist (handlers are registered
   * first), so this runs again once the board is fully built; the scope
   * object keeps its identity, and prepared handler runtimes re-resolve.
   */
  private populateCardScope(
    card: NonNullable<BoardIr['devices']>[number],
    scope: { instance: Record<string, unknown>; bindings: GeneratedHandlerBindings },
  ): void {
    const calls = scope.bindings.calls!;
    for (const child of this.machine.devices ?? []) {
      if (!child.member || (!child.tag.startsWith(`${card.tag}:`) && child.hostTag !== card.tag)) continue;
      const referent = this.deviceReferents.get(child.tag);
      if (referent !== undefined) scope.instance[child.member] = referent;
      const prefix = `m_${child.tag}.`;
      for (const key in this.bindings.calls) {
        if (key.startsWith(prefix)) calls[`${child.member}.${key.slice(prefix.length)}`] = this.bindings.calls[key]!;
      }
    }
    noteCallLinksChanged();
  }

  /**
   * Start each slot whose default card the board composed, now that the card
   * exists. The slot's own device_start attaches it -- MAME's
   * cbm_iec_slot_device walks `owner()` up to the bus and hands it
   * `get_card_device()` -- so all the host supplies is those two answers: the
   * machine's devices by tag, and the card's scope object.
   */
  private attachComposedCards(): void {
    for (const card of this.machine.devices ?? []) {
      if (!card.interfaceHandlers?.length) continue;
      const slotTag = card.tag.slice(0, card.tag.lastIndexOf(':'));
      const slot = this.devices.get(slotTag);
      const scope = this.cardScope(card.classHierarchy?.[0] ?? '');
      if (!slot || !scope) continue;
      this.populateCardScope(card, scope);
      const root = {
        owner: () => 0,
        subdevice: (tag: unknown) => {
          const device = this.devices.get(String(tag).replace(/^:/, ''));
          return device?.instance?.() ?? this.deviceReferents.get(String(tag)) ?? 0;
        },
        tag: () => '',
      };
      slot.bindCall('owner', () => root);
      slot.bindCall('get_card_device', () => scope.instance);
      slot.startDeferred?.();
      if (card.resetHandler) {
        const handler = this.machine.handlers?.find(candidate =>
          `${candidate.ownerClass}.${candidate.method}` === card.resetHandler);
        if (handler?.program && !handler.program.diagnostics.length) {
          const reset = (): void => {
            executeGeneratedMachineHandler(this.machine, handler, this.deviceHandlerBindings(handler), {});
          };
          this.peripheralResets.push(reset);
        }
      }
    }
  }

  /**
   * MAME starts every device before the machine runs, and device_start is
   * where a device derives the constants its own methods then read. A device
   * with a generated core starts itself; a board-level device whose methods
   * are the board's handlers has nowhere else to do it. Midway's SSIO reads
   * its 82S123 duty-cycle PROM there, and every AY output gain it sets comes
   * out of that table -- unstarted, each gain it wrote was NaN.
   */
  private runDeviceStarts(): void {
    for (const specification of this.machine.devices ?? []) {
      const key = specification.startHandler;
      if (!key || this.devices.has(specification.tag)) continue;
      const handler = this.machine.handlers?.find(candidate =>
        `${candidate.ownerClass}.${candidate.method}` === key);
      if (!handler?.program || handler.program.diagnostics.length) continue;
      executeGeneratedMachineHandler(
        this.machine,
        handler,
        this.deviceHandlerBindings(handler),
        {},
      );
    }
  }

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
    const base = this.cardScope(handler.ownerClass)?.bindings ?? this.bindings;
    let bindings = scopedCpuTag
      ? generatedCpuMemberBindings(base, scopedCpuTag)
      : base;
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
    // on sequencing that is not represented by their return value. A handler
    // the board module emitted is faster than either, so the closure only
    // stands in for a read callback the emitter left out: the C64 polls its
    // serial bus through cia2_pa_r two thousand times a frame while a 1541
    // loads, and the closure built a fresh context object for each.
    const compiled = /_r(?:_\d+)?$/.test(handler.method) &&
      !this.machine.compiledHandlers?.[`${handler.ownerClass}.${handler.method}`]
      ? compileGeneratedMachineHandler(this.machine, handler, bindings)
      : undefined;
    // An emitted handler takes its arguments in declaration order, which the
    // signal already fixes, so they are handed over positionally rather than
    // as a record the dispatch reads back by name.
    const positional = compiled ? undefined :
      prepareGeneratedMachinePositional(this.machine, handler, bindings);
    if (positional) {
      const declarations = signalParameters(handler.parameters ?? '');
      return (state, ...sourceArgs) => {
        const debugCounts = (globalThis as {
          __mamekitHandlerCounts?: Map<string, number>;
        }).__mamekitHandlerCounts;
        if (debugCounts) debugCounts.set(key, (debugCounts.get(key) ?? 0) + 1);
        const values = new Array<unknown>(declarations.length);
        for (let index = 0; index < declarations.length; index++) {
          values[index] = signalArgument(declarations[index]!, index, state, firstArgument, sourceArgs);
        }
        return positional(values);
      };
    }
    // Resolved once, not per call. A signal wired to a processor's own
    // per-instruction callback delivers seventeen thousand times a frame.
    const dispatch = compiled ??
      prepareGeneratedMachineHandler(this.machine, handler, bindings);
    return (state, ...sourceArgs) => {
      const debugCounts = (globalThis as {
        __mamekitHandlerCounts?: Map<string, number>;
      }).__mamekitHandlerCounts;
      if (debugCounts) debugCounts.set(key, (debugCounts.get(key) ?? 0) + 1);
      return dispatch(generatedSignalHandlerArguments(
        handler.parameters,
        state,
        firstArgument,
        sourceArgs,
      ));
    };
  }

  /** Resolve a CPU's acknowledge delegate at the instant the core accepts IRQ. */
  private interruptVector(cpuTag: string): number {
    const acknowledge = this.machine.callbacks.find(callback =>
      callback.ownerTag === cpuTag &&
      callback.signal === 'set_irq_acknowledge_callback');
    if (!acknowledge) return 0xff;
    // Acknowledge delegates often belong to a composed device (the 8259 PIC
    // on Irem M72), so execute the lowered connection against that device's
    // private state. A driver-owned callback retains the handler fallback.
    const effect = this.effects.get(acknowledge.id);
    const value = effect?.run(0);
    if (value !== undefined) {
      return applyBoardTransforms(Number(value) || 0, effect?.transforms) & 0xff;
    }
    return executeGeneratedCallbackHandler(
      this.machine,
      acknowledge,
      this.bindings,
    ) ?? 0xff;
  }

  private effectBindings(sinks: BoardSinks, registry: HandlerRegistry): EffectBindings {
    const cpuLineEffect = (tag: string, line: CpuLine, delivery: CpuLineDelivery, input?: string): EffectExecutor | undefined => {
      // Validated against the IR, not the live map: a generated CPU can fire
      // a signal from inside its own constructor (the I8039 resets on
      // create), so the target may not be instantiated yet at bind time.
      if (!this.machine.execution.cpus.some(cpu => cpu.tag === tag)) return undefined;
      if (line === 'busreq' || line === 'core') {
        // The core's own pin: its execute_set_input takes the request and
        // its next instruction boundary grants it through busack_cb, which
        // the machine wired to the bus master (z80dma bai_w, i8257
        // hlda_w). Held, the core parks (see the cores' run()).
        return state => {
          const cpu = this.cpus.get(tag);
          const inputnum = cpu?.inputLine?.(input!);
          if (inputnum === undefined) {
            throw new Error(`${this.machine.game}: CPU "${tag}" has no input line ${input}`);
          }
          cpu!.setInputLine(inputnum, state ? 1 : 0);
        };
      }
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
          const released = !state && this.cpuHeld.get(tag) === true;
          this.cpuHeld.set(tag, Boolean(state));
          if (state) this.cpus.get(tag)?.reset();
          else if (released) this.cpuResetReleased(tag);
        };
      }
      if (line === 'halt') {
        // MAME's INPUT_LINE_HALT suspends the processor in the scheduler.
        // It acknowledges nothing: a bus request is `busreq`, which the
        // core grants itself.
        return state => { this.cpuHeld.set(tag, Boolean(state)); };
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
        const acknowledge = this.machine.callbacks.some(callback =>
          callback.ownerTag === tag &&
          callback.signal === 'set_irq_acknowledge_callback');
        this.cpus.get(tag)?.setIrqLine(
          state !== 0,
          acknowledge ? this.irqVectorSource(tag) : 0xff,
          delivery === 'hold' && state !== 0,
        );
      };
    };
    return {
      // MAME scheduler::perfect_quantum, asked for by a devcb rather than by a
      // handler. It shortens the quantum for the requested window; it does not
      // run the other processor from inside the writing one's instruction
      // stream, which would let it answer before the writer has finished
      // setting up for the answer.
      perfectQuantum: (seconds: number) => state => {
        if (state) this.frameRunner?.quantumWindow(seconds, this.quantumWindowStart());
      },
      cpuLine: (tag, line, delivery, input) => {
        const apply = cpuLineEffect(tag, line, delivery, input);
        if (!apply || line === 'busreq' || line === 'core') return apply;
        // devcb's set_inputline is set_input_line, and that goes through
        // device_input::set_state_synced like any other (cpuInputLine): from
        // inside a processor's slice the line changes once the round has
        // run up to the write. Ghosts'n Goblins' 6809 releases its sound
        // Z80's RESET through an LS259 output; applied in place, the Z80,
        // run after it in the round, started from the round's base, 18 us
        // before the write that released it.
        return state => {
          if (this.synchronizesLineFrom(tag)) this.synchronize(() => { apply(state); });
          else apply(state);
        };
      },
      deviceMethod: (tag, method, ownerClass) => {
        const device = this.devices.get(tag);
        if (device?.methodNames().includes(method)) {
          const parameters = device.parameters(method);
          // devcb_write8::operator()(offset, data, mem_mask) hands its offset
          // to an (offs_t offset, u8 data) target. Supplying 0 here sent every
          // S-SMP $F2/$F3 write to s_dsp_device::dsp_io_w as the register
          // address, so no S-DSP register was ever written.
          const takesOffset = parameters.length >= 2 && /\boffs_t\b/.test(parameters[0] ?? '');
          // devcb_read8::operator()(offset) to a read8sm target: the offset the
          // read asked for, when the source passed one. The S-SMP reads S-DSP
          // register data as `m_dsp_io_r_cb(1)`; with 0 every $F3 read answered
          // the address register, and Final Fantasy III's sound driver waited
          // on FLG forever.
          const readsOffset = parameters.length === 1 && /\boffs_t\b/.test(parameters[0] ?? '');
          return (state, ...sourceArgs) => {
            const args = generatedDeviceCallbackArguments(parameters, state, sourceArgs);
            if (takesOffset && sourceArgs.length >= 2) args[0] = Number(sourceArgs[0]) || 0;
            if (readsOffset && sourceArgs.length >= 1) args[0] = Number(sourceArgs[0]) || 0;
            return device.call(method, ...args);
          };
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
                ...(sourceArgs.length >= 3
                  ? generatedDeviceCallbackArguments(parameters, state, sourceArgs)
                  : generatedDeviceCallbackArguments(parameters, sourceArgs[0] ?? state)),
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
                    this.cpuInputLine(
                      scopedCpuTag,
                      cpu,
                      line,
                      state,
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
      // The CPU's own space, at the offset the device's read callback passes
      // (the RP2A03 APU's DMC sample fetch).
      cpuSpaceRead: tag => (_value, offset = 0) => this.cpuBuses.get(tag)?.read(Number(offset) & 0xffff) ?? 0,
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
      audioWrite: (tag, method) => state =>
        sinks.soundWrite(0, state, this.soundFraction(), `${tag}.${method}`),
    };
  }
}

/** The CPU a device class's conventional `m_cpu` finder names: its own child. */
/**
 * A finder array's element, as a device's member names it: `m_slots[2]`, or
 * one of an array of finder arrays, `m_filter[1][2]` (timeplt_a.h's
 * `required_device_array<filter_rc_device, 3> m_filter[2]`).
 */
function finderElement(member: string): { root: string; indexes: number[] } | undefined {
  const match = /^(m_\w+)((?:\[\d+\])+)$/.exec(member);
  return match
    ? { root: match[1]!, indexes: [...match[2]!.matchAll(/\d+/g)].map(index => Number(index[0])) }
    : undefined;
}

/**
 * Put a device in the finder array its member indexes, building the nested
 * arrays on the way; `replace` says whether the element already held may go.
 */
function placeFinderElement(
  state: Record<string, unknown>,
  member: string,
  value: unknown,
  replace: (held: unknown) => boolean = () => true,
): void {
  const element = finderElement(member)!;
  let values = (Array.isArray(state[element.root]) ? state[element.root] : []) as unknown[];
  state[element.root] = values;
  for (const index of element.indexes.slice(0, -1)) {
    const inner = (Array.isArray(values[index]) ? values[index] : []) as unknown[];
    values[index] = inner;
    values = inner;
  }
  const slot = element.indexes.at(-1)!;
  if (replace(values[slot])) values[slot] = value;
}

export function hostedCpuTagForClass(
  machine: BoardIr,
  ownerClass: string,
): string | undefined {
  const owners = (machine.devices ?? [])
    .filter(device => device.classHierarchy?.includes(ownerClass));
  const tags = owners.flatMap(owner => machine.execution.cpus
    .filter(cpu => cpu.tag.startsWith(`${owner.tag}:`))
    .map(cpu => cpu.tag));
  // Ambiguity is not a licence to guess: a class hosting two processors, or
  // instantiated twice, has no single `m_cpu`.
  return tags.length === 1 ? tags[0] : undefined;
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
  seconds: number;
  as_double(): number;
  as_ticks(frequency: number): number;
  valueOf(): number;
} {
  // A value object a driver keeps in its state (m_interrupt_time = machine().time()):
  // the seconds are data a save state carries, the methods come back from the factory.
  return stateValue('attotime', {
    seconds,
    as_double: () => seconds,
    as_ticks: frequency => Math.floor(seconds * Math.max(0, frequency)),
    valueOf: () => seconds,
  });
}

/**
 * Adapt a devcb's value to the target device method signature.  MAME supplies
 * offset zero when a one-value callback is bound to a conventional
 * read/write(offs_t, data) handler; passing the value as the first argument
 * silently turns it into the offset and drops the data.
 *
 * `source` is what the devcb itself was called with. devcb_write{8,16,32}'s
 * operator()(offset, data, mem_mask) hands the offset and the mask on to a
 * target that declares them: the MB88's port O writes one nibble with mask
 * 0x0f or 0xf0, and the Namco 54xx's O_w picks its discrete channel by that
 * mask. Left at its default 0xff, every nibble reached channel 1, and
 * Galaga's lowest explosion channel never sounded.
 */
export function generatedDeviceCallbackArguments(
  parameters: readonly string[],
  state: number,
  source?: readonly unknown[],
): number[] {
  if (!parameters.length) return [];
  if (/\boffs_t\b/.test(parameters[0]!)) {
    if (parameters.length === 1) return [0];
    const written = source && source.length >= 3 ? source : undefined;
    return parameters.map((parameter, index) => {
      if (index === 0) return written ? Number(written[0]) || 0 : 0;
      if (/\bmem_mask\b/.test(parameter)) {
        const width = /\b(?:u?int)?32_t\b|\bu32\b/.test(parameter)
          ? 0xffffffff
          : /\b(?:u?int)?16_t\b|\bu16\b/.test(parameter)
            ? 0xffff
            : 0xff;
        return written ? (Number(written[2]) & width) >>> 0 : width;
      }
      return state;
    });
  }
  return [state];
}

/**
 * A signal handler's parameter list, parsed once.
 *
 * A MAME signature is a constant, so splitting it and picking each declarator
 * out with a regex on every dispatch is pure waste -- and dispatch is a hot
 * path: the LR35902 raises its timer devcb from `cycles_passed`, which runs on
 * every memory access, so this was the largest single self-time in a Game Boy
 * frame. Same reasoning as the machine-handler signature cache above.
 */
interface SignalParameter {
  name: string;
  offset: boolean;
  memMask: boolean;
  memMaskDefault: number;
}

const SIGNAL_PARAMETERS = new Map<string, SignalParameter[]>();

function signalParameters(parameters: string): SignalParameter[] {
  let parsed = SIGNAL_PARAMETERS.get(parameters);
  if (parsed) return parsed;
  parsed = [];
  for (const declaration of parameters.split(',')) {
    const trimmed = declaration.trim();
    if (!trimmed) continue;
    const name = /(\w+)\s*$/.exec(trimmed)?.[1];
    if (!name) continue;
    parsed.push({
      name,
      offset: name === 'offset',
      memMask: name === 'mem_mask',
      memMaskDefault: /\b(?:u?int)?32_t\b|\bu32\b/.test(trimmed)
        ? 0xffffffff
        : /\b(?:u?int)?16_t\b|\bu16\b/.test(trimmed)
          ? 0xffff
          : 0xff,
    });
  }
  SIGNAL_PARAMETERS.set(parameters, parsed);
  return parsed;
}

export function generatedSignalHandlerArguments(
  parameters: string | undefined,
  state: number,
  firstArgument?: unknown,
  sourceArgs: readonly number[] = [],
): Record<string, unknown> {
  const declarations = signalParameters(parameters ?? '');
  const args: Record<string, unknown> = { state, data: state };
  for (const [index, declaration] of declarations.entries()) {
    args[declaration.name] = signalArgument(declaration, index, state, firstArgument, sourceArgs);
  }
  return args;
}

/** What a signal delivers to one declared parameter of its handler. */
function signalArgument(
  declaration: SignalParameter,
  index: number,
  state: number,
  firstArgument: unknown,
  sourceArgs: readonly number[],
): unknown {
  if (index === 0 && firstArgument !== undefined) return firstArgument;
  if (declaration.offset) return sourceArgs[0] ?? 0;
  if (declaration.memMask) {
    return sourceArgs.length >= 3 ? sourceArgs.at(-1) : declaration.memMaskDefault;
  }
  return state;
}

/**
 * MAME's declared width for each of the driver state class's own scalar
 * members, as the setters the interpreter already narrows through.
 *
 * The state object otherwise holds only what a handler has written, at
 * whatever a JavaScript `+` produced, so nothing ever wraps: the Game Boy's
 * `uint16_t m_divcount` ran unbounded, the divider compared a masked old value
 * against an unmasked new one, and the timer interrupt a Game Boy music driver
 * runs on never fired. Emitted code narrows inline from the same declaration
 * (see `targetInfo` in device-codegen), so this is the interpreter's half.
 *
 * Setters rather than a write trap on the state object: a Proxy intercepts
 * every *read* as well, and member reads are the hot path of every handler on
 * every board -- it cost a quarter of the Game Boy's frame.
 */
export function generatedStateSetters(
  state: Record<string, unknown>,
  members: readonly GeneratedStateMember[],
): Record<string, (value: number) => void> {
  const setters: Record<string, (value: number) => void> = {};
  for (const member of members) {
    if (member.delegate) {
      state[member.name] ??= null;
      continue;
    }
    // A struct member: each element an object whose fields keep their
    // declared widths, as C++ stores them (a DMA channel's uint16_t
    // src_addr wraps as it counts).
    if (member.fields) {
      const fields = member.fields;
      const element = (): Record<string, number> => {
        const values: Record<string, number> = {};
        const object: Record<string, number> = {};
        for (const field of fields) {
          values[field.name] = generatedStateWidth(field.initial ?? 0, field.bits, field.signed);
          Object.defineProperty(object, field.name, {
            enumerable: true,
            get: () => values[field.name]!,
            set: (value: number) => { values[field.name] = generatedStateWidth(Number(value) || 0, field.bits, field.signed); },
          });
        }
        return object;
      };
      state[member.name] ??= member.arrayLength ? Array.from({ length: member.arrayLength }, element) : element();
      continue;
    }
    // C++ fixed arrays exist zero-initialized before their first write. A
    // source handler may read one first (M72 screen_update reads m_scrollx/y
    // while both are still zero); leaving it absent turns that read into an
    // unresolved reference object and sends tilemaps off-screen.
    // A multi-dimensional array is rows of its innermost dimension, zeroed as
    // C++ zero-initialises it: Neo Geo's create_rgb_lookups fills
    // m_palette_lookup[32][4], and with nowhere to write every pen was black.
    if (member.arrayShape && member.arrayShape.length > 1) {
      const build = (shape: readonly number[]): unknown => shape.length === 1
        ? generatedStateArray({ ...member, arrayShape: undefined, arrayLength: shape[0], initialValues: undefined })
        : Array.from({ length: shape[0]! }, () => build(shape.slice(1)));
      state[member.name] ??= build(member.arrayShape);
      continue;
    }
    if (member.arrayLength) {
      state[member.name] ??= generatedStateArray(member);
      continue;
    }
    // A std::vector the driver sizes itself, over a buffer that grows in place
    // so a resize through any holder reaches every other.
    if (member.vector) {
      const buffer = resizableBuffer(256 * 1024 * 1024);
      state[member.name] ??= member.bits === 32 ? new Uint32Array(buffer)
        : member.bits === 16 ? new Uint16Array(buffer) : new Uint8Array(buffer);
      continue;
    }
    const bits = member.bits ?? 32;
    state[member.name] ??= generatedStateWidth(member.initial ?? 0, bits, member.signed);
    setters[member.name] = value => {
      state[member.name] = generatedStateWidth(value, bits, member.signed);
    };
  }
  return setters;
}

/**
 * Storage for a driver-state member MAME declared as a fixed C array, typed
 * and sized the way the declaration is, so an indexed write wraps on its own.
 */
export function generatedStateArray(
  member: GeneratedStateMember,
): Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | undefined {
  const length = member.arrayLength;
  if (!length) return undefined;
  const array = member.bits === 8 ? (member.signed ? new Int8Array(length) : new Uint8Array(length))
    : member.bits === 16 ? (member.signed ? new Int16Array(length) : new Uint16Array(length))
    : member.bits === 32 ? (member.signed ? new Int32Array(length) : new Uint32Array(length))
    : new Uint8Array(length);
  if (member.initialValues) array.set(member.initialValues.slice(0, length));
  return array;
}

/** MAME's C integer conversion for one stored driver-state member. */
function generatedStateWidth(value: number, bits: 1 | 8 | 16 | 32, signed?: boolean): number {
  if (bits === 1) return value ? 1 : 0;
  if (bits === 8) return signed ? value << 24 >> 24 : value & 0xff;
  if (bits === 16) return signed ? value << 16 >> 16 : value & 0xffff;
  return signed ? value | 0 : value >>> 0;
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
  members: readonly {
    member: string;
    tags: string[];
    outputs?: { mask: number; activeLow: boolean; deviceTag: string; method: string }[];
  }[],
  inputs: InputPorts,
  writeLine?: (deviceTag: string, method: string, value: number) => void,
): void {
  for (const input of members) {
    const ports = input.tags.map(tag => ({
      read: () => inputs.read(tag),
      // optional_ioport::read_safe(defval): a port the machine doesn't declare
      // answers defval, not the input layer's idle 0xff (friskyt has no DEBUG
      // port, and seicross's portb_r reads it as read_safe(0)).
      read_safe: (fallback = 0) => inputs.has?.(tag) === false ? fallback : inputs.read(tag),
      write: (value: number, mask = 0xffffffff) => {
        for (const output of input.outputs ?? []) {
          if ((mask & output.mask) === 0) continue;
          const asserted = (value & output.mask) !== 0;
          writeLine?.(
            output.deviceTag,
            output.method,
            Number(output.activeLow ? !asserted : asserted),
          );
        }
      },
    }));
    state[input.member] = ports.length === 1 ? ports[0] : ports;
  }
}

/** Declared parameter names of a generated handler, in order. */
function handlerParameterNames(parameters: string | undefined): string[] {
  return (parameters ?? '')
    .split(',')
    .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
    .filter((name): name is string => Boolean(name));
}

function handlerParameterDescriptors(parameters: string | undefined): {
  name: string;
  mutableReference: boolean;
}[] {
  return (parameters ?? '')
    .split(',')
    .map(parameter => {
      const name = /(\w+)\s*$/.exec(parameter.trim())?.[1];
      return name
        ? {
            name,
            mutableReference: parameter.includes('&') && !/\bconst\b/.test(parameter),
          }
        : undefined;
    })
    .filter((parameter): parameter is { name: string; mutableReference: boolean } =>
      parameter !== undefined);
}

function trailingZeroBits(value: number): number {
  if (!value) return 0;
  let count = 0;
  while (((value >>> count) & 1) === 0) count++;
  return count;
}

/**
 * A delegate a device built for its own method, as a callable: what
 * `tilemap_get_info_delegate(*this, FUNC(cls::method))` evaluates to.
 */
function deviceDelegate(
  device: Device,
  delegate: unknown,
): (...args: unknown[]) => unknown {
  if (typeof delegate === 'function') return delegate as (...args: unknown[]) => unknown;
  if (typeof delegate === 'string') {
    const method = delegate.split('::').at(-1)!;
    return (...args) => device.invoke(method, ...(args as GeneratedCallArgument[]));
  }
  throw new Error(`a device delegate is ${typeof delegate} ${JSON.stringify(delegate)?.slice(0, 80)}`);
}

export function bindGeneratedShareState(
  state: Record<string, unknown>,
  tag: string,
  bytes: Uint8Array,
  aliases: readonly string[] = [],
  bits: 8 | 16 = 8,
  /** Members something else already is (a device finder), never aliased. */
  reserved: ReadonlySet<string> = new Set(),
): void {
  Object.defineProperty(bytes, 'bytes', {
    value: () => bytes.length,
    configurable: true,
  });
  const boundMemory = bits === 16
    ? new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 1)
    : bytes;
  if (!reserved.has(`m_${tag}`)) state[`m_${tag}`] = boundMemory;
  const indexed = /^(.+)\[(\d+)\]$/.exec(tag);
  for (const member of aliases) {
    // An indexed share's finder member (`m_videoram` for share "videoram[1]")
    // is the per-element array built below. Writing the raw buffer over it
    // here destroyed the element bound for the earlier index, leaving
    // m_videoram[0] a hole.
    if (indexed && member === `m_${indexed[1]}`) continue;
    state[member] = boundMemory;
  }
  if (!indexed) return;
  const member = `m_${indexed[1]}`;
  const values = Array.isArray(state[member]) ? state[member] as unknown[] : [];
  values[Number(indexed[2])] = boundMemory;
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

/**
 * A device the scheduler runs in its round beside the CPUs, once it is known
 * to execute: one with no host processor, on a board without a perfect
 * quantum (see autonomousProcessors). A bus master is one too: Donkey Kong's
 * Z80 parks in its BUSREQ service block while the 8257 holds its bus, and
 * looks again in the round after the one that released it.
 */
function roundScheduledDevice(
  machine: BoardIr,
  specification: NonNullable<BoardIr['devices']>[number],
): boolean {
  return machine.execution.perfectQuantum !== true &&
    !specification.hostTag &&
    !machine.execution.cpus.some(cpu => cpu.tag === specification.tag);
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
  return [
    ...machine.execution.cpus.flatMap(cpu => [
      ...(cpu.ranges ?? []),
      ...(cpu.opcode?.ranges ?? []),
      ...(cpu.io?.ranges ?? []),
    ]),
    // A bank device's space is as executable as a CPU's.
    ...(machine.execution.bankDevices ?? []).flatMap(bank => bank.ranges),
  ].flatMap(range => range[kind] ? [range[kind]!] : []);
}

/**
 * The mounted cartridge's facts, offered to slot devices under their own
 * names. A capability package declares which one selects its card
 * (`cart.mapper` for the NES, `cart.slot` for the ColecoVision), so adding a
 * cartridge bus never means editing this list.
 *
 * A card is selected by a name or a number; a flag such as `battery`
 * describes the cartridge rather than choosing a PCB, so it is left out.
 */
function cartSelectors(
  cart: BoardConfig['cart'],
): Record<string, string | number | undefined> {
  const selectors: Record<string, string | number | undefined> = {};
  for (const [fact, value] of Object.entries(cart ?? {})) {
    if (typeof value === 'string' || typeof value === 'number') {
      selectors[`cart.${fact}`] = value;
    }
  }
  return selectors;
}

/**
 * A `memory_view` as driver code indexes it: `view[n]` is entry n, which takes
 * installs. Its entries are made on first use, as MAME's are, and it saves
 * nothing of its own: what an entry decodes is rebuilt by the code that
 * installed it, and which entry is selected is the bus's (Bus.stateKeys).
 */
function memoryViewEntries(entry: (index: number) => object): object {
  const entries = new Map<number, object>();
  const holder = new (class MemoryViewEntries { stateKeys(): readonly string[] { return []; } })();
  return new Proxy(holder, {
    get(target, property, receiver) {
      if (typeof property === 'string' && /^\d+$/.test(property)) {
        const index = Number(property);
        let made = entries.get(index);
        if (!made) entries.set(index, made = entry(index));
        return made;
      }
      return Reflect.get(target, property, receiver);
    },
  });
}

/**
 * MAME's `system_time` for a `-rtc` value, `YYYYMMDDHHMMSS` in local wall-clock
 * time, or for the host's clock when there is none. Both halves are that
 * local time: a contract's run is the same wherever it runs.
 */
function systemTime(baseTime: string | undefined): { local_time: Record<string, number>; utc_time: Record<string, number> } {
  const parsed = baseTime && /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/.exec(baseTime);
  const now = new Date();
  const [year, month, day, hour, minute, second] = parsed
    ? parsed.slice(1).map(Number) as [number, number, number, number, number, number]
    : [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
  const date = new Date(Date.UTC(year, month - 1, day));
  const yearStart = Date.UTC(year, 0, 1);
  // system_time::full_time: month from 0, weekday from Sunday, day of the year from 0.
  const full = {
    year, month: month - 1, mday: day, weekday: date.getUTCDay(),
    day: Math.round((date.getTime() - yearStart) / 86_400_000), hour, minute, second, is_dst: 0,
  };
  return { local_time: full, utc_time: { ...full } };
}

/**
 * Where a pointer a driver hands a bank points: the region whose bytes it is
 * over, and how far in. `memregion("maincpu")->base() + 0x10000` is a pointer
 * whose source is that region's own array.
 */
/**
 * A file-scope constant table as the program sees it: each struct a struct
 * (so an array of them decays to its first element, `range->type`), each
 * array an array, copied so no board shares another's.
 */
function staticTableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(staticTableValue);
  if (value && typeof value === 'object') {
    const struct = Object.fromEntries(Object.entries(value).map(([field, item]) => [field, staticTableValue(item)]));
    Object.defineProperty(struct, GENERATED_STRUCT, { value: true, enumerable: false, configurable: true });
    return struct;
  }
  return value;
}

function regionOffsetOf(regions: Regions, base: unknown): { region: string; offset: number } | undefined {
  const pointer = base as { generatedPointer?: boolean; source?: unknown; offset?: number } | undefined;
  const source = pointer && typeof pointer === 'object' && pointer.generatedPointer ? pointer.source : base;
  const offset = pointer && typeof pointer === 'object' && pointer.generatedPointer ? pointer.offset ?? 0 : 0;
  if (!ArrayBuffer.isView(source)) return undefined;
  const view = source as Uint8Array;
  for (const [region, bytes] of Object.entries(regions)) {
    if (bytes.buffer !== view.buffer) continue;
    const start = view.byteOffset - bytes.byteOffset;
    if (start >= 0 && start <= bytes.length) return { region, offset: start + offset * (view.BYTES_PER_ELEMENT ?? 1) };
  }
  return undefined;
}

/** `base + n` for a pointer or the array it would point at. */
function offsetGeneratedPointer(base: unknown, by: number): unknown {
  const pointer = base as { generatedPointer?: boolean; offset?: number } | undefined;
  if (pointer && typeof pointer === 'object' && pointer.generatedPointer) return { ...pointer, offset: (pointer.offset ?? 0) + by };
  return { generatedPointer: true, source: base, offset: by };
}

/**
 * MAME's `memory_bank` for a bank only the driver's code configures: what it
 * points at is a region and an offset into it, so it reads and saves as those.
 */
class DriverMemoryBank {
  private region = '';
  private offset = 0;
  private selected = 0;
  private readonly entries: ({ region: string; offset: number } | undefined)[] = [];

  private readonly regions: Regions;
  private readonly name: string;

  constructor(regions: Regions, name: string) {
    this.regions = regions;
    this.name = name;
  }

  stateKeys(): readonly string[] {
    return ['region', 'offset', 'selected', 'entries'];
  }

  private place(base: unknown): { region: string; offset: number } {
    const placed = regionOffsetOf(this.regions, base);
    if (!placed) throw new Error(`${this.name} points into no region`);
    return placed;
  }

  set_base(base: unknown): number {
    ({ region: this.region, offset: this.offset } = this.place(base));
    return 0;
  }

  configure_entry(entry: number, base: unknown): number {
    this.entries[entry] = this.place(base);
    return 0;
  }

  configure_entries(first: number, count: number, base: unknown, stride: number): number {
    for (let index = 0; index < count; index++) this.configure_entry(first + index, offsetGeneratedPointer(base, index * stride));
    return 0;
  }

  set_entry(entry: number): number {
    const configured = this.entries[entry];
    if (!configured) throw new Error(`${this.name} selected unconfigured entry ${entry}`);
    this.selected = entry;
    ({ region: this.region, offset: this.offset } = configured);
    return entry;
  }

  entry(): number {
    return this.selected;
  }

  base(): unknown {
    const bytes = this.regions[this.region];
    return bytes ? { generatedPointer: true, source: bytes, offset: this.offset } : 0;
  }

  read(offset: number): number {
    return this.regions[this.region]?.[this.offset + offset] ?? 0xff;
  }

  write(offset: number, value: number): void {
    const bytes = this.regions[this.region];
    if (bytes && this.offset + offset < bytes.length) bytes[this.offset + offset] = value;
  }
}
