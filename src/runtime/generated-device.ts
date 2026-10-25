import {
  applyCombineData,
  applyGeneratedAndAssign,
  applyGeneratedAnd,
  applyGeneratedDivision,
  applyGeneratedShiftRight,
  generatedMacroCall,
  dereferenceGeneratedValue,
  generatedPackedView,
  generatedContainerAccessor,
  generatedVectorMethod,
  generatedAdd,
  generatedPointerStore,
  generatedWideBinary,
  executeGeneratedProgram,
  generatedReferent,
  generatedValuesEqual,
  type GeneratedCallArgument,
  type GeneratedHandlerBindings,
  GENERATED_FIELD_WIDTHS,
  generatedFieldWidth,
  GENERATED_STRUCT,
  generatedVector,
  copyGeneratedStruct,
  attotimeSecondsMethod,
  cppDefaultArgument,
  generatedSubtract,
  resizeGeneratedContainer,
} from './generated-handler.ts';
import { buildCallLinks, copyGeneratedBytes, DEFAULT_CONSTANTS, generatedBoundSearch, noteCallLinksChanged, REFERENCE_PARAMETERS } from '../ir/execute.ts';
import { walkExpressions, walkOperations } from '../ir/walk.ts';
import { markResizable, stateValue } from './machine-state.ts';
import type { GeneratedHandlerProgram } from '../ir/board.ts';
import type { BoardImage, SoftwarePart } from '../ir/host-config.ts';
import { inheritCardInterface, type CardInterface } from '../ir/card-interface.ts';

interface DeviceMember {
  name: string;
  valueType: string;
  bits?: 1 | 8 | 16 | 32;
  signed?: boolean;
  initial?: number;
  initialText?: string;
  values?: unknown[];
  memory?: {
    kind: 'shared' | 'owned' | 'growable';
    element?: string;
    elementBytes: number;
    share?: 'self' | string;
  };
  finder?: {
    kind: 'input' | 'device';
    tag: string;
  };
  /** Declared array bound for an object-typed member (`bitmap_ind16 h[2]`). */
  arrayLength?: number;
  /** Every declarator bound of a multi-dimensional C array member. */
  arrayShape?: number[];
  /** Fields of a member whose type is a struct the device declares. */
  fields?: StructField[];
  /** Aggregate initializer of a file-scope `static const struct`. */
  initialValue?: Record<string, unknown>;
  /** Per-element initial fields of a static array of structs. */
  initialValues?: Record<string, unknown>[];
  /** A class held by value that the device declares inside itself: the allocation building it. */
  object?: string;
  /** Its constructor arguments as the owner's initializer writes them (`*this`). */
  objectArgs?: string[];
  /** Built by the owner's own source constructor, from that constructor's arguments. */
  objectConstructed?: boolean;
  /** Holds, refers or points to an object of this plain C++ class. */
  objectType?: string;
  /** Storage for an uninitialised C++ local, kept between calls and out of save states. */
  scratch?: boolean;
}

/** One field of a struct-shaped member; `fields` makes it nest. */
interface StructField {
  name: string;
  valueType?: string;
  length?: number;
  bits?: 8 | 16 | 32;
  signed?: boolean;
  fields?: StructField[];
}

interface DeviceCallback {
  signal: string;
  member: string;
  slots: number;
  initial?: number;
  /** Accessors bound to one element of a devcb array: `porta_r` is slot 0. */
  aliases?: { signal: string; slot: number }[];
}

interface DeviceTimer {
  member: string;
  /** Absent for a timer nothing calls back; the device only asks `enabled()`. */
  callback?: string;
  /** A member array of this many timers (`emu_timer *m_timer[2]`). */
  count?: number;
}

interface DeviceMethod {
  name: string;
  parameters: string;
  program: GeneratedHandlerProgram;
  /** The declared return type's width, narrower than an int (see device-compiler). */
  returnWidth?: 8 | 16 | -8 | -16;
}

type DeviceResource =
  | { kind: 'owner' }
  | { kind: 'sample-image'; region: string; sampleRate: number }
  | { kind: 'number'; value: number }
  | { kind: 'region'; name: string }
  | { kind: 'region-object'; name: string }
  | { kind: 'region-pointer'; name: string; offset: number }
  | { kind: 'region-length'; name: string }
  | { kind: 'region-pages'; name: string; bytes: number }
  | { kind: 'region-page-mask'; name: string; bytes: number }
  | { kind: 'memory'; name: string; bytes: number; onlyWhenRegionMissing?: string; region?: string; fill?: number }
  | { kind: 'missing-region-number'; name: string; missing: number; present: number }
  | { kind: 'config-map'; path: string; values: Record<string, number>; fallback?: number }
  | { kind: 'bank-array'; name: string; count: number };

interface GeneratedPointer {
  generatedPointer: true;
  source: ArrayLike<number> & { [index: number]: number };
  offset: number;
}

function isGeneratedPointer(value: unknown): value is GeneratedPointer {
  return Boolean(
    value &&
    typeof value === 'object' &&
    (value as { generatedPointer?: unknown }).generatedPointer,
  );
}

export interface GeneratedDeviceExecutionContext {
  readonly members: Record<string, unknown>;
  /** Late-bound host calls, exposed directly to generated hot paths. */
  readonly calls: Record<string, (...args: any[]) => unknown>;
  /**
   * The calls this device's emitted methods name, resolved once into a small
   * fast-mode table (see buildCallLinks). Rebuilt by refreshCallLinks whenever
   * the device's own bindings change.
   */
  links?: Record<string, ((...args: any[]) => unknown) | undefined>;
  readonly palette: number[];
  readIndex(value: unknown, index: number): unknown;
  writeIndex(value: unknown, index: number, next: unknown): unknown;
  /** C++ struct assignment into an existing struct member (see copyGeneratedStruct). */
  copyStruct(target: unknown, source: unknown): unknown;
  addressOf(value: unknown, index: number): GeneratedPointer;
  /** C++ `*value`, resolved by the operand's shape rather than assumed. */
  dereference(value: unknown): unknown;
  /**
   * A `u16*`/`s16*` declaration over byte memory, reinterpreted rather than
   * copied, so the wider view writes through to the same shared bytes.
   */
  packedView(value: unknown, signed: boolean): unknown;
  /** A MAME memory container's own accessor (`m_vram.get()`), from the array. */
  container(value: unknown, method: string): unknown;
  /** std::vector `insert`/`erase` at an iterator, or the object's own method of that name. */
  vectorMethod(container: unknown, method: string, ...args: unknown[]): unknown;
  /** The container an indexed write stores into, addressed by member name. */
  writableMember(name: string): unknown;
  /** C arithmetic promoted to 64 bits by a literal too wide for a double. */
  wide(operator: string, left: unknown, right: unknown): unknown;
  /** C++ `*pointer = value`, over a generated pointer or plain memory. */
  pointerStore(pointer: unknown, value: unknown): unknown;
  /** C++ `a + b` when neither side is known to be a number. */
  add(left: unknown, right: unknown): unknown;
  subtract(left: unknown, right: unknown): unknown;
  resize(container: unknown, length: number): unknown;
  /** An attotime accessor on a duration held as seconds. */
  attotime(seconds: number, method: string, ...args: number[]): number;
  invoke(name: string, ...args: GeneratedCallArgument[]): unknown;
  /** Context-free MAME framework macros, identical to the interpreter's. */
  macro(name: string, ...args: unknown[]): unknown;
  /** MAME COMBINE_DATA against an emitted pointer. */
  combineData(pointer: unknown, data: unknown, memMask: unknown): unknown;
  /** C++ `/`: integral between integers, exact otherwise. */
  divide(left: unknown, right: unknown): number;
  /** C++ `>>`: arithmetic on a negative value, logical otherwise. */
  shiftRight(left: unknown, right: unknown): number;
  /** C++ `==`/`!=` where an operand can be a pointer, not a number. */
  same(left: unknown, right: unknown): boolean;
  /** C++ `&=`: rectangle intersection when the target is one, else bitwise. */
  andAssign(current: unknown, value: unknown): unknown;
  /** C++ `&`: a new rectangle when the left side is one, else bitwise. */
  and(left: unknown, right: unknown): unknown;
  /** A member read the state object has no entry for, as the interpreter resolves it. */
  member(name: string): unknown;
  /** Reference-call overrides; devices have none, boards may (see board IR). */
  readonly overrides: Record<string, (...args: any[]) => unknown>;
}

export type GeneratedDeviceMethodExecutable = (
  runtime: GeneratedDeviceExecutionContext,
  ...args: GeneratedCallArgument[]
) => unknown;

export type GeneratedDeviceMethodMap = Record<string, GeneratedDeviceMethodExecutable>;

/**
 * A cassette image format a cassette device mounts (lib/formats). A legacy
 * wave filler reports a sample count and fills 16-bit PCM at its own rate
 * (cbm_tap.cpp); a format with its own identify and load reads the file into
 * the host's cassette image itself (wavfile.cpp).
 */
export type CassetteImageFormat = { extension: string; definition: GeneratedDeviceDefinition; mountMethod: string; list?: string } & (
  | { sizeMethod: string; fillMethod: string; sampleRate: number }
  | { identifyMethod: string; loadMethod: string });

export interface GeneratedDeviceDefinition {
  /**
   * The power-on value of each input port the device declares itself
   * (`device_input_ports`), by its own tag (device-compiler).
   */
  inputDefaults?: Record<string, number>;
  type: string;
  /** MAME's own name for the device ("Commodore 1530 Datassette"). */
  description?: string;
  hierarchy?: string[];
  /** The struct shapes the device declares, by type name. */
  structs?: Record<string, StructField[]>;
  /** The inline methods those structs declare, by type name (device-compiler structMethods). */
  structMethods?: Record<string, { name: string; parameters: string; program: GeneratedHandlerProgram }[]>;
  /** MAME `device_rom_interface`: `read_byte` reads the device's own region. */
  romInterface?: { addressBits: number };
  /**
   * MAME `device_image_interface`: the device reads a file the host mounts,
   * through the interface's own calls (`length`, `fread`, `fseek`,
   * `is_filetype`), as the C64's quickload reads a .prg.
   */
  imageInterface?: true;
  allocations?: Record<string, GeneratedDeviceDefinition>;
  construct?: string;
  constants: Record<string, number>;
  members: DeviceMember[];
  callbacks: DeviceCallback[];
  timers?: DeviceTimer[];
  methods: DeviceMethod[];
  /** Source-derived runtime entry points selected for direct generated code. */
  hotMethods?: string[];
  /**
   * Devices this one instantiates in MAME's device_add_mconfig, keyed by the
   * finder member that reaches them.
   */
  children?: {
    member: string;
    type: string;
    /** Its tag below this device, as its finder names it. */
    tag?: string;
    definition: GeneratedDeviceDefinition;
    /** Child delegate member -> this device's method that fills it. */
    delegateTargets?: Record<string, string>;
    slotOptions?: string;
    /** The child's own clock, where its constructor gives one. */
    clock?: number;
    /** Where a sound child's outputs go (`add_route`): output -1 is ALL_OUTPUTS. */
    routes?: { output: number; target: string; gain: number }[];
  }[];
  slot?: {
    member: string;
    default?: string;
    selector?: string;
    install?: { method: string; space?: string };
    options: Record<string, GeneratedDeviceDefinition>;
    /** Cards shipped as modules of their own: option -> module (loadSlotCard). */
    cards?: Record<string, string>;
    /** The interface every card inherits, kept once here (src/ir/card-interface.ts). */
    cardInterface?: CardInterface<DeviceMethod>;
    /** Options MAME declares whose card did not compile, and why. */
    unsupported?: Record<string, string>;
    /** Attached by the generated module: module -> its import. */
    loadCard?: Record<string, () => Promise<{ device: GeneratedDeviceDefinition }>>;
  };
  /** A card whose interface methods are its slot's `cardInterface`. */
  inheritsCardInterface?: boolean;
  resources?: {
    members?: Record<string, DeviceResource>;
    calls?: Record<string, DeviceResource>;
    initialize?: { method: string; args?: DeviceResource[] }[];
  };
  bus?: {
    cpu?: string;
    ranges: GeneratedDeviceBusRange[];
  };
  role?: string;
  imageFormats?: CassetteImageFormat[];
  floppyFormats?: { name: string; extensions: string[]; definition: GeneratedDeviceDefinition }[];
  floppyImage?: GeneratedDeviceDefinition;
  links?: GeneratedDeviceLink[];
  /** Machine-config setter -> device_delegate member it assigns. */
  delegates?: Record<string, string>;
  clockDivider?: number;
  dataAddressBits?: number;
  /**
   * Address spaces the device owns, declared through MAME's
   * `device_memory_interface`. A video-display processor keeps its display
   * memory here rather than on the CPU bus.
   */
  spaces?: {
    index: number;
    name: string;
    addressBits: number;
    dataBits: number;
    ram?: true;
    /**
     * The address-map method that fills the space, for a space MAME maps
     * rather than backs with plain RAM: the 68705's ports, timer, RAM and
     * EPROM. The host runs it against a map builder, as MAME does.
     */
    map?: string;
  }[];
  compiledMethods?: GeneratedDeviceMethodMap;
  /** the host call names those methods reach, resolved once into `links` */
  compiledMethodLinks?: string[];
  start?: string;
  reset?: string;
  summary: {
    diagnostics: number;
  };
}

export type DeviceCallbackListener = (...args: number[]) => number | void;

export interface Device {
  findDevice?(role: string): Device | undefined;
  imageExtensions?(): string[];
  /** `features` are the list part's, as `get_feature` answers them, when the image came from one. */
  mountImage?(extension: string, bytes: Uint8Array, name?: string, features?: Readonly<Record<string, string>>): void;
  /**
   * What MAME calls an image device's medium -- its `image_type_name()`:
   * "quickload", "cartridge", "cassette" -- and undefined for any other device.
   */
  imageTypeName?(): string | undefined;
  /**
   * The name of what the device is, as MAME's device type gives it: the card
   * a slot holds when it holds one ("Commodore 1530 Datassette"), else the
   * device's own ("Cassette").
   */
  deviceName?(): string | undefined;
  /** Whether the device still has a timer armed: a quickload not yet loaded. */
  timerPending?(): boolean;
  /** The last image load the device reported failing, as its osd_printf_error printed it. */
  imageError?(): string | undefined;
  /** Eject a mounted image (a floppy drive's call_unload). */
  unmountImage?(): void;
  /** Install a machine-config map over a declared byte-wide device space. */
  bindAddressSpace?(index: number, read: (address: number) => number,
    write: (address: number, data: number) => void): void;
  reset(): void;
  tick(seconds: number): void;
  /** MAME's `device_post_load` on the device and the devices inside it, after a state load. */
  postLoad?(): void;
  /** Whether this device or a composed child owns a scheduled timer. */
  needsTick?(): boolean;
  /** Host a device_execute_interface time slice in device cycles. */
  runCycles?(cycles: number): number;
  call(name: string, ...args: number[]): number;
  /** Call a method preserving non-numeric results (memory pointers). */
  invoke(name: string, ...args: GeneratedCallArgument[]): unknown;
  /**
   * The framework surface the host answers for this device rather than its
   * compiled methods: an image's `exists()`, `filename()`, `length()`. Its
   * owner reaches them through its finder (`m_cartslot->exists()`).
   */
  hostedCalls?(): Readonly<Record<string, (...args: never[]) => unknown>>;
  /** Resolve an unambiguous generated method once for a hot bus connection. */
  prepareCall?(name: string): (...args: GeneratedCallArgument[]) => unknown;
  /** `prepareCall`, made once per method and kept. */
  preparedCall?(name: string): (...args: GeneratedCallArgument[]) => unknown;
  /** Connect source-typed calls and refresh them when the host overrides a method. */
  connectCall?(name: string, receive: (call: (...args: GeneratedCallArgument[]) => unknown) => void): void;
  get(name: string): number;
  set(name: string, value: number): void;
  hasMember(name: string): boolean;
  /** Bind a host object such as a tilemap or decoded-gfx finder after composition. */
  bindMember(name: string, value: unknown): void;
  /** Resolve a numeric constant declared by this generated device family. */
  constant(name: string): number | undefined;
  /** All numeric constants declared by this generated device family. */
  constants(): Readonly<Record<string, number>>;
  methodNames(): readonly string[];
  /**
   * PCM the device published through `sound_stream::put_int`, and clear it.
   *
   * A sound device rendered on the main thread has to hand its samples to the
   * board's sink somehow; MAME hands them to a `sound_stream`, so this is that
   * stream, drained by whoever is pumping the device. Absent on the devices
   * that have no sound interface at all.
   */
  takeStreamSamples?(): readonly number[];
  /** Stream-rendering sound devices this one and its slot's card are built out of. */
  streamDescendants?(): { tag: string; device: Device; gain: number }[];
  /** The rate the device passed to `stream_alloc`, once it has started. */
  streamRate?(): number | undefined;
  arity(name: string): number;
  parameters(name: string): readonly string[];
  signalNames(): readonly string[];
  on(signal: string, listener: DeviceCallbackListener, slot?: number): Device;
  bindCall(
    name: string,
    listener: (...args: any[]) => unknown,
    parameters?: string,
  ): Device;
  cycleClock(): number;
  dataAddressBits(): number | undefined;
  bus(): GeneratedDeviceDefinition['bus'];
  /** Machine-config setter -> device_delegate member it assigns. */
  delegates?(): Record<string, string>;
  role(): string | undefined;
  links(): readonly GeneratedDeviceLink[];
  invokeSlot(name: string, ...args: GeneratedCallArgument[]): unknown;
  /** Run the mounted card's own installer against a recording address space. */
  installSlotCard(space: unknown): void;
  /** device_start (and the reset after it) for a device created with `deferStart`. */
  startDeferred?(): void;
  /** The device's own `this`, as its methods see it (a bus hands it to a card). */
  instance?(): unknown;
}

export interface GeneratedDeviceBusRange {
  start: number;
  end: number;
  read?: string;
  write?: string;
  bank?: string;
  /** Installed only while the slot holds one of these cards. */
  cards?: string[];
}

export interface GeneratedDeviceLink {
  call: string;
  targetRole: string;
  /** Direct source-installed delegate target (PPU scanline/hblank/latch). */
  method?: string;
  ranges?: {
    start: number;
    end: number;
    target: 'self' | 'slot';
    method: string;
  }[];
}

const DEFINITIONS = new Map<string, GeneratedDeviceDefinition>();

export function registerGeneratedDevice(definition: GeneratedDeviceDefinition): void {
  if (definition.summary.diagnostics) {
    throw new Error(
      `cannot register ${definition.type}: ${definition.summary.diagnostics} compiler diagnostics`,
    );
  }
  DEFINITIONS.set(definition.type.toUpperCase(), definition);
}

/**
 * Put a slot's card in its options before a machine is built with it.
 *
 * A slot whose cards ship as modules of their own (`slot.cards`) holds none
 * of them until asked: the module is imported, the interface its methods
 * inherit is put back from the slot's one copy, and every option naming the
 * same device type gets the card. False when the slot has no such option.
 */
export async function loadSlotCard(definition: GeneratedDeviceDefinition, option: string): Promise<boolean> {
  const slot = definition.slot;
  if (!slot) return false;
  if (slot.options[option]) return true;
  const module = slot.cards?.[option];
  const load = module ? slot.loadCard?.[module] : undefined;
  if (!module || !load) return false;
  const card = (await load()).device;
  if (card.inheritsCardInterface && slot.cardInterface) {
    card.methods = inheritCardInterface<DeviceMethod>(card.methods, slot.cardInterface);
    card.inheritsCardInterface = false;
  }
  for (const [name, path] of Object.entries(slot.cards!)) {
    if (path === module) slot.options[name] = card;
  }
  return true;
}

/**
 * The card a slot would choose for an image, answered by the slot's own
 * get_default_card_software as the machine would run it -- a software
 * part's `slot` feature, or what MAME reads from an iNES header -- without
 * building the machine. Undefined when the device takes no image this way.
 */
export function slotCardForImage(type: string, image: BoardImage): string | undefined {
  const definition = DEFINITIONS.get(type.toUpperCase());
  if (!definition?.slot) return undefined;
  const probe = new IrDevice({ ...definition, slot: { ...definition.slot, options: {} } }, 0, {
    image,
    deferStart: true,
  });
  return probe.slotOption;
}

export function clearGeneratedDevices(): void {
  DEFINITIONS.clear();
}

export function hasGeneratedDevice(type: string): boolean {
  return DEFINITIONS.has(type.toUpperCase());
}

/** The registered definition of a device type, if any. */
export function generatedDeviceDefinition(type: string): GeneratedDeviceDefinition | undefined {
  return DEFINITIONS.get(type.toUpperCase());
}

/** Composition role declared by the generated device definition. */
export function generatedDeviceRole(type: string): string | undefined {
  return DEFINITIONS.get(type.toUpperCase())?.role;
}

/** MAME's device_t::subtag: the full tag `tag` names, seen from the device tagged `own`. */
export function mameSubtag(own: string, tag: string): string {
  if (tag.startsWith(':')) return tag.slice(1);
  let base = own.split(':').filter(Boolean);
  let rest = tag;
  while (rest.startsWith('^')) {
    base = base.slice(0, -1);
    rest = rest.slice(1);
  }
  return [...base, ...rest.split(':').filter(Boolean)].join(':');
}

export interface GeneratedDeviceOptions {
  owner?: unknown;
  constructorArgs?: GeneratedCallArgument[];
  clock?: number;
  /** Device tag, resolving MAME's DEVICE_SELF memory share binding. */
  tag?: string;
  /**
   * The device's own MAME tag where it differs from `tag`: a slot card is
   * `<slot>:<option>`, while it reads its slot's inputs and finders.
   */
  deviceTag?: string;
  /** Board memory shares available to required/optional_shared_ptr members. */
  shares?: Record<string, Uint8Array>;
  /** Instance member resources resolved by generated composition metadata. */
  members?: Record<string, unknown>;
  /** Host primitives available before device_start executes. */
  calls?: Record<string, (...args: number[]) => unknown>;
  /** Active-low/raw input ports used by required_ioport finders. */
  inputs?: { read(tag: string): number; has?(tag: string): boolean };
  /** Selected card option for a generated slot definition. */
  slot?: string | number;
  /**
   * The image this device holds from power-on (BoardConfig.images): its own
   * call_load reads it after device_start and before the first reset, and a
   * software part's `slot` feature picks the slot's card, as MAME's
   * `get_default_card_software` does.
   */
  image?: BoardImage;
  selectors?: Record<string, string | number | undefined>;
  /**
   * Resolve required/optional device finders to host/device proxies, and a
   * `required_address_space` to a space its own `set_tag` points at a bus.
   */
  finder?: (tag: string, member?: string, kind?: 'space') => unknown;
  regions?: Record<string, Uint8Array>;
  configuration?: unknown;
  banks?: Record<string, GeneratedMemoryBank>;
  resourceCache?: Record<string, unknown>;
  /** MAME `scheduler().synchronize()`: run once the processor that asked has yielded. */
  schedule?: (run: () => void) => void;
  /**
   * Hold device_start until the host calls `startDeferred()`: a slot whose
   * card the board composes attaches that card in its own device_start, and
   * the card does not exist until the board has built it.
   */
  deferStart?: boolean;
  /**
   * The machine config's setter calls on this device, made between its
   * construction and device_start, as MAME makes them.
   */
  configure?: (device: Device) => void;
}

export interface GeneratedMemoryBank {
  configure_entries(start: number, count: number, source: unknown, stride: number): void;
  /** MAME's per-entry form, for a bank whose pages are not evenly strided. */
  configure_entry?(entry: number, base: unknown): void;
  set_entry(entry: number): void;
  /** MAME `memory_bank::base()`: where the selected entry starts. */
  base?(): unknown;
  read(offset: number): number;
  write(offset: number, value: number): void;
}

export function createDevice(type: string, options: GeneratedDeviceOptions = {}): Device {
  const definition = DEFINITIONS.get(type.toUpperCase());
  if (!definition) throw new Error(`generated device "${type}" was not registered`);
  return new IrDevice(definition, options.clock ?? 0, options);
}

/** Numeric seconds with the attotime method surface used by compiled devices. */
class IrAttotime {
  private readonly seconds: number;

  constructor(seconds: number) {
    this.seconds = seconds;
    stateValue('device-attotime', this);
  }

  /** Save-state roots (machine-state.ts); the factory of the same name rebuilds one. */
  stateKeys(): readonly string[] {
    return ['seconds'];
  }

  as_ticks(frequency: number): number {
    return Math.floor(this.seconds * Math.max(0, frequency));
  }

  as_double(): number {
    return this.seconds;
  }

  is_never(): number {
    return attotimeSecondsMethod(this.seconds, 'is_never')!;
  }

  is_zero(): number {
    return attotimeSecondsMethod(this.seconds, 'is_zero')!;
  }

  valueOf(): number {
    return this.seconds;
  }
}

/**
 * Seconds of the tick a firing device timer has NOT consumed yet.
 *
 * Device time is delivered in instruction-sized lumps, so a timer that expires
 * partway through one is serviced with the clock already credited to the far
 * end of the lump. MAME's scheduler instead stops at the expiry, and anything
 * the callback then asks about the beam is answered from there. This is that
 * difference, readable for as long as the callback runs and zero outside one.
 */
let timerBacklogSeconds = 0;

/**
 * The board's delivery of device time in progress, if any: it brackets every
 * delivery with beginGeneratedTimerDelivery and endGeneratedTimerDelivery. A
 * timer armed from inside another's callback is credited the backlog when it
 * is armed, and inside a bracketed delivery takes nothing more from it
 * (IrTimer.adjust).
 */
let timerDelivery = 0;
let timerDeliveryOpen = false;

/** The board starts handing device time to its devices (see timerDelivery). */
export function beginGeneratedTimerDelivery(): boolean {
  const outer = timerDeliveryOpen;
  if (!outer) timerDelivery++;
  timerDeliveryOpen = true;
  return outer;
}

/** The delivery begun by beginGeneratedTimerDelivery is over; `outer` is what it returned. */
export function endGeneratedTimerDelivery(outer: boolean): void {
  timerDeliveryOpen = outer;
}

/**
 * Runs everything else the board clocks up to a firing timer's expiry before
 * its callback, while the board is delivering device time; told how far past
 * the expiry the delivered lump reaches. MAME's scheduler fires a timer only
 * once every device has run to it. Firing first and clocking the C64's CIAs
 * through the whole instruction afterwards set the datassette's FLAG bit with
 * the CIA still at the instruction's first cycle, so its interrupt pipeline
 * could assert up to an instruction early: a few cycles of IRQ latency MAME
 * never shows, and enough for the KERNAL to misframe a tape block at some
 * phases of the load (issue #161).
 */
let timerPreFire: ((overshoot: number) => void) | undefined;

/** Install the pre-fire hook (see timerPreFire); returns the one it replaced. */
export function setGeneratedTimerPreFire(hook: ((overshoot: number) => void) | undefined): ((overshoot: number) => void) | undefined {
  const outer = timerPreFire;
  timerPreFire = hook;
  return outer;
}

/** A device-side attotime value, for a save state's factory (machine-state.ts). */
export function createGeneratedAttotime(seconds: number): object {
  return new IrAttotime(seconds);
}

/**
 * How far now stands ahead of the device time delivered so far: set while
 * the board presents a frame at an instant its devices have not quite been
 * clocked to (see IrTimer.remaining).
 */
let timerNowAheadSeconds = 0;

/**
 * Below this a timer's remaining time is rounding in the clocks that measure
 * it, not time: far under a cycle of any processor here.
 */
const TIMER_NOW_TOLERANCE_SECONDS = 1e-10;

/**
 * A catch-up is delivering device time: the processor's access (or the poll
 * after its fetch) comes at the end of it, and MAME fires only the timers due
 * strictly before that point; one due exactly there fires after the access.
 */
let timerDeliveryExclusive = false;

/** Run `run` as a catch-up's delivery (see timerDeliveryExclusive). */
export function withExclusiveTimerDelivery<T>(run: () => T): T {
  const outer = timerDeliveryExclusive;
  timerDeliveryExclusive = true;
  try {
    return run();
  } finally {
    timerDeliveryExclusive = outer;
  }
}

/** Run `run` with now standing `aheadSeconds` past the delivered device time. */
export function withGeneratedPresentTime<T>(aheadSeconds: number, run: () => T): T {
  const outer = timerNowAheadSeconds;
  timerNowAheadSeconds = Math.max(0, aheadSeconds);
  try {
    return run();
  } finally {
    timerNowAheadSeconds = outer;
  }
}

/** @see timerBacklogSeconds */
export function generatedTimerBacklog(): number {
  return timerBacklogSeconds;
}

/**
 * The firing timer's own expiry, exactly as it was armed, while its callback
 * runs; undefined otherwise. MAME's scheduler sets the time to a timer's
 * expiry before calling it, and attotime is exact. Recomputed from the
 * processor's cycles less the overshoot, the same instant came out a few
 * attoseconds early: the 64H156 found its syncpoint (`cur_live.tm`) still
 * ahead of `machine().time()`, rolled back, and lost every BYTE READY.
 */
let timerExpirySeconds: number | undefined;

export function generatedTimerExpiry(): number | undefined {
  return timerExpirySeconds;
}

/**
 * Run a board timer's callback with the scheduler standing at its expiry, as
 * a device timer's does. The Spectrum's interrupt callback reads
 * `local_time() - machine().time()` to recover the cycle it fell on.
 */
export function withGeneratedTimerExpiry<T>(seconds: number, run: () => T): T {
  const outer = timerExpirySeconds;
  timerExpirySeconds = seconds;
  try {
    return run();
  } finally {
    timerExpirySeconds = outer;
  }
}

const noTimerCallback = (): void => {};

/** The gap from a double to the next one up. */
function unitInLastPlace(value: number): number {
  const magnitude = Math.abs(value);
  return magnitude < Number.MIN_VALUE * 2 ** 52 ? Number.MIN_VALUE : 2 ** (Math.floor(Math.log2(magnitude)) - 52);
}

class IrTimer {
  private remainingSeconds = Infinity;
  /** What was left when `enable(false)` stopped the timer. */
  private disabledSeconds = Infinity;
  private intervalSeconds = Infinity;
  private period = Infinity;
  private parameter = 0;
  private adjustmentGeneration = 0;
  /** The absolute expiry, from the clock at arming; NaN when there is none. */
  private expiry = NaN;
  /** The delivery this timer was armed inside and credited for (see adjust). */
  private creditedDelivery = -1;

  /** The owning device's `machine().time()`, when it has one. */
  private readonly now?: () => number;

  constructor(now?: () => number) {
    this.now = now;
  }

  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] {
    return ['remainingSeconds', 'disabledSeconds', 'intervalSeconds', 'period', 'parameter', 'adjustmentGeneration', 'expiry'];
  }

  adjust(delay: number, parameter = 0, period = Infinity): void {
    // MAME clamps a start delay in the past to now: the timer fires at once.
    // A sub-nanosecond negative is what a duration measured against the
    // instruction-time device clock comes to when the deadline is "now".
    this.remainingSeconds = Number.isFinite(delay) ? Math.max(0, delay) : Infinity;
    const armed = Number.isFinite(delay) ? Number(this.now?.()) : NaN;
    let expiry = armed + this.remainingSeconds;
    // A delay too small to move a double of the clock's size still moves
    // MAME's attotime: a callback that re-arms for "a hair later" must find
    // time advanced, or it re-arms for the same hair forever (the floppy's
    // index_resync, a few attoseconds short of a revolution).
    if (this.remainingSeconds > 0 && expiry <= armed) expiry = armed + unitInLastPlace(armed);
    this.expiry = Number.isFinite(armed) ? expiry : NaN;
    this.intervalSeconds = this.remainingSeconds;
    this.period = Number.isFinite(period) && period > 0 ? period : Infinity;
    this.parameter = parameter;
    this.adjustmentGeneration++;
    // Armed from inside another timer's callback, the delay runs from that
    // callback's expiry, where MAME's scheduler stands; the delivery in
    // progress has already carried device time past it by the backlog. So
    // the backlog is credited now, and the rest of the delivery is not
    // counted down again. Counted from the delivery's end instead, the
    // 2C02's NMI -- armed four cycles after the VBLANK flag's scanline tick
    // -- fired that tick's overshoot late, and a timer whose device is ticked
    // after the arming one in the same delivery took the whole lump (#184).
    if (timerBacklogSeconds > 0 && Number.isFinite(this.remainingSeconds)) {
      this.remainingSeconds -= timerBacklogSeconds;
      this.creditedDelivery = timerDeliveryOpen ? timerDelivery : -1;
    } else {
      this.creditedDelivery = -1;
    }
  }

  /**
   * `emu_timer::reset(duration = attotime::never)`: adjust keeping the
   * parameter and period. The JY Company boards' device_start stops their
   * IRQ prescaler this way, and unanswered it left the call a silent zero.
   */
  reset(delay = Infinity): void {
    this.adjust(Number(delay), this.parameter, this.period);
  }

  remaining(): IrAttotime {
    // MAME's scheduler stops exactly at a timer's expiry, so a callback asking
    // its own timer how long is left reads zero. Host device time arrives in
    // instruction-sized lumps, so by the time the callback runs the deadline
    // is usually already a hair in the past — a value MAME can never produce,
    // and one that silently fails the `== attotime::zero` tests real hardware
    // models gate on. The NES PPU has two: skipping them left every scanline
    // rendering nametable row 0, so a fully drawn title screen came out as one
    // flat colour.
    //
    // While a frame is presented, now is the presentation instant, which the
    // devices' clock may stand a little short of (withGeneratedPresentTime).
    // A timer due at that instant reads zero there, as in MAME: the 2C02's
    // `render` draws the line in progress only when its scanline timer has
    // time left, and at the start of VBLANK it has none, so MAME's picture
    // keeps line 239 from the frame before (#184).
    const left = this.remainingSeconds - timerNowAheadSeconds;
    return new IrAttotime(left > TIMER_NOW_TOLERANCE_SECONDS ? left : 0);
  }

  elapsed(): IrAttotime {
    const seconds = !Number.isFinite(this.intervalSeconds)
      ? 0
      : Math.max(0, this.intervalSeconds - Math.max(0, this.remainingSeconds));
    return new IrAttotime(seconds);
  }

  enabled(): boolean {
    return Number.isFinite(this.remainingSeconds);
  }

  /**
   * MAME's `emu_timer::enable`: a disabled timer keeps its expiry and does
   * not fire; enabling it again resumes it. The FM chips stop a timer this
   * way when its duration is negative (`ymfm_set_timer`).
   */
  enable(enable: unknown = true): boolean {
    const was = this.enabled();
    if (!enable && was) {
      this.disabledSeconds = this.remainingSeconds;
      this.remainingSeconds = Infinity;
    } else if (enable && !was && Number.isFinite(this.disabledSeconds)) {
      this.remainingSeconds = this.disabledSeconds;
      this.disabledSeconds = Infinity;
    }
    return was;
  }


  tick(seconds: number, callback: (parameter: number) => void): void {
    if (!Number.isFinite(this.remainingSeconds)) return;
    if (this.creditedDelivery !== timerDelivery) this.remainingSeconds -= seconds;
    let firings = 0;
    // Due within the clocks' rounding is due: MAME fires a timer whose expiry
    // the processor's slice ends exactly on before the next instruction, and
    // left a hair short here, Green Beret's line-80 NMI came an instruction
    // late (#184).
    // A catch-up's delivery ends at the processor's access, and a timer due
    // exactly there fires after it (City Fighter IV's VRC4 IRQ counter ticks
    // on whole cycles and was taken an instruction early, #184).
    const due = timerDeliveryExclusive ? -TIMER_NOW_TOLERANCE_SECONDS : TIMER_NOW_TOLERANCE_SECONDS;
    while (this.remainingSeconds <= due) {
      if (++firings > 65_536) throw new Error('generated device timer exceeded 65536 firings');
      const overshoot = -this.remainingSeconds;
      const firedPeriod = this.period;
      const generation = this.adjustmentGeneration;
      timerPreFire?.(overshoot);
      // The callback runs at the expiry, not at the end of the lump that
      // carried the clock past it: a scanline tick re-arming for the next line
      // must measure that line from where it actually fired.
      const outerBacklog = timerBacklogSeconds;
      const outerExpiry = timerExpirySeconds;
      timerBacklogSeconds = outerBacklog + overshoot;
      timerExpirySeconds = Number.isFinite(this.expiry) ? this.expiry : undefined;
      try {
        callback(this.parameter);
      } finally {
        timerBacklogSeconds = outerBacklog;
        timerExpirySeconds = outerExpiry;
      }

      // MAME callbacks commonly re-arm their own one-shot timer. Honour that
      // new schedule instead of disabling it based on the timer state that
      // caused the callback (for example, the NES PPU scanline timer). The
      // re-arm was credited the overshoot as it was armed (adjust).
      if (this.adjustmentGeneration !== generation) {
        if (!Number.isFinite(this.remainingSeconds)) break;
        continue;
      }

      if (!Number.isFinite(firedPeriod)) {
        this.remainingSeconds = Infinity;
        this.expiry = NaN;
        break;
      }
      this.remainingSeconds += firedPeriod;
      this.intervalSeconds = firedPeriod;
      this.expiry += firedPeriod;
    }
  }
}

/**
 * Generated devices another device holds as an object -- the floppy drive's
 * mounted `floppy_image` -- by the save-state factory name they are captured
 * under. A save keeps such an object's members, not its methods, so a load
 * into a drive that no longer holds that image (it was ejected since the save)
 * builds an executable one here. Registered when the holding device is built,
 * so a load in a fresh session finds the factory before any disk is mounted.
 */
const HELD_INSTANCE_DEFINITIONS = new Map<string, GeneratedDeviceDefinition>();

function heldInstanceName(definition: GeneratedDeviceDefinition): string {
  return `device-instance:${definition.type}`;
}

/** Save-state factories for every held generated-device object (see HELD_INSTANCE_DEFINITIONS). */
export function generatedInstanceFactories(): Map<string, (data: Record<string, unknown>) => object> {
  return new Map([...HELD_INSTANCE_DEFINITIONS].map(([name, definition]) => [name, data => {
    const self = new IrDevice(definition, 0).instance() as Record<string, unknown>;
    // Through the instance's own setters, so each member narrows as it does
    // when the device's methods store it.
    for (const [key, value] of Object.entries(data)) {
      if (typeof self[key] !== 'function') self[key] = value;
    }
    return stateValue(name, self);
  }]));
}

class IrDevice implements Device {
  private readonly definition: GeneratedDeviceDefinition;
  private readonly members: Record<string, unknown> = {};
  private readonly memberBits = new Map<string, 1 | 8 | 16 | 32>();
  private readonly memberSigned = new Set<string>();
  private readonly methods = new Map<string, DeviceMethod[]>();
  /** Parameter names resolved once per method (the regex is a hot-path cost). */
  private readonly methodParams = new Map<DeviceMethod, string[]>();
  /** C++ default argument values, applied when a caller omits a parameter. */
  private readonly methodDefaults = new Map<DeviceMethod, (number | undefined)[]>();
  private readonly callConnections = new Map<string, (() => void)[]>();
  private readonly listeners = new Map<string, DeviceCallbackListener[][][]>();
  private readonly bindings: GeneratedHandlerBindings;
  private readonly executionContext: GeneratedDeviceExecutionContext;
  private readonly timers = new Map<string, { timer: IrTimer; callback?: string }>();
  /** The timers in declaration order, walked after every instruction; `fire` is wiring. */
  private readonly timerEntries: { name: string; timer: IrTimer; callback?: string; fire?: (parameter: number) => void }[] = [];
  /**
   * The file an image device holds -- device_image_interface's m_file -- and
   * the position it reads from. Host state, as in MAME, where a save state
   * does not carry the media either.
   */
  private imageFile?: {
    bytes: Uint8Array; name: string; filetype: string; position: number;
    eof(): number; tell(): number; seek(offset: unknown, whence: unknown): number;
  };
  /** The software-list part the image came from, when it came from one. */
  private softwarePart?: SoftwarePart;
  /** device_image_interface's m_readonly, which `make_readonly` sets. */
  private imageReadOnly = false;
  private lastImageError?: string;
  /** Names the definition declares as device_delegates: their arguments pass by reference. */
  private readonly delegateNames: ReadonlySet<string>;
  /** generic_latch_8's write is deferred through the scheduler (see executeMethod). */
  private readonly latch8: boolean;
  /** Backing store for each address space the device declares, by MAME index. */
  private readonly spaces = new Map<number, GeneratedDeviceSpace>();
  private regionLookup: (tag: string) => Uint8Array | undefined = () => undefined;
  /** The image/floppy/cassette surface the host answers (see hostedCalls). */
  private readonly hostedSurface: Record<string, (...args: never[]) => unknown> = {};
  private readonly clock: number;
  private executedCycles = 0;
  private runningCycles: number | undefined;
  private executeEntry?: (...args: GeneratedCallArgument[]) => unknown;
  /** Samples published through `sound_stream::put_int` since the last collection. */
  private streamSamples: number[] = [];
  private slotChild?: IrDevice;
  /** The option the slot selected, whether or not its card is held. */
  slotOption?: string;
  /** Set for the duration of a mounted card's installer; see installSlotCard. */
  private installSpace?: unknown;
  /** Devices instantiated from this one's device_add_mconfig. */
  private readonly children: IrDevice[] = [];
  /** The device's own MAME tag (a slot card's is `<slot>:<option>`). */
  private readonly ownTag: string;

  constructor(
    definition: GeneratedDeviceDefinition,
    clock: number,
    options: GeneratedDeviceOptions = {},
  ) {
    this.definition = definition;
    this.ownTag = options.deviceTag ?? options.tag ?? '';
    if (definition.floppyImage) {
      HELD_INSTANCE_DEFINITIONS.set(heldInstanceName(definition.floppyImage), definition.floppyImage);
    }
    this.delegateNames = new Set(Object.values(definition.delegates ?? {}));
    this.latch8 = definition.type.toUpperCase() === 'GENERIC_LATCH_8';
    // `device_t::m_clock` is a u32, so MAME's own `clock()` never has a
    // fraction: a device configured at m_xtal/114 is asked for 31399, not
    // 31399.78. Handing the fraction back made the TIA's sample counter land
    // one short of its divisor and take the oversampling branch MAME does not.
    clock = Math.trunc(clock);
    this.clock = clock;
    for (const config of definition.spaces ?? []) {
      // A mapped space is built on first use, once the constructor has run:
      // its map tests state the constructor sets (the 68705's port masks).
      if (!config.map) this.spaces.set(config.index, generatedDeviceSpace(config.addressBits));
    }
    const resourceCache = options.resourceCache ?? {};
    const resourceOptions = { ...options, resourceCache };
    // A region an address map names is the device's own: `.region("bootstrap", 0)`
    // is `<tag>:bootstrap`, and `tag()` is the device's region itself.
    this.regionLookup = (tag: string) => {
      const regions = options.regions ?? {};
      const own = options.tag ?? '';
      if (tag === own || tag === 'tag()') return regions[own];
      return regions[`${own}:${tag}`] ??
        regions[Object.keys(regions).find(name => name.endsWith(`:${tag}`)) ?? ''] ?? regions[tag];
    };
    const resourceMembers = definition.resources?.members ?? {};
    // A struct's own methods run with the struct as their members and the
    // device's calls and constants behind them (structMember attaches them).
    if (definition.structs && definition.structMethods && !STRUCT_METHODS.has(definition.structs)) {
      const device = this;
      STRUCT_METHODS.set(definition.structs, Object.fromEntries(Object.entries(definition.structMethods).map(([type, methods]) =>
        [type, Object.fromEntries(methods.map(method => {
          const names = splitParameters(method.parameters).map(parameterName);
          return [method.name, function (this: Record<string, unknown>, ...args: unknown[]): unknown {
            // `this` is the struct: ymfm's `ymfm_output::clear()` ends `return *this;`.
            const locals: Record<string, unknown> = { this: this };
            names.forEach((name, index) => { locals[name] = args[index] ?? 0; });
            // Its own bindings, not the device's: those carry member hooks that
            // store into the device, and `period = ...` landed there.
            // One bindings object per struct, kept: the compiled program is
            // cached by bindings, and a fresh one per call recompiled ymfm's
            // `output->clear()` fifty thousand times a second.
            let bindings = STRUCT_BINDINGS.get(this);
            if (!bindings) STRUCT_BINDINGS.set(this, bindings = {
              members: this, constants: device.bindings.constants, calls: device.bindings.calls,
            } as GeneratedHandlerBindings);
            return executeGeneratedProgram(method.program, bindings, locals, false).value;
          }];
        }))])));
    }
    for (const method of definition.methods) {
      const overloads = this.methods.get(method.name) ?? [];
      overloads.push(method);
      this.methods.set(method.name, overloads);
    }
    for (const member of definition.members) {
      const inputTag = member.finder?.kind === 'input'
        ? [options.tag, member.finder.tag].filter(Boolean).join(':')
        : undefined;
      this.members[member.name] = options.members?.[member.name] ??
        (resourceMembers[member.name]
          ? resolveDeviceResource(resourceMembers[member.name]!, resourceOptions)
          :
        (inputTag
          ? { read: inputFinderRead(options.inputs, inputTag, definition.inputDefaults?.[member.finder?.tag ?? '']) }
          : member.finder?.kind === 'device'
            ? options.finder?.(member.finder.tag, member.name) ?? 0
          : /^(?:required|optional)_address_space$/.test(member.valueType)
            ? options.finder?.('', member.name, 'space') ?? 0
          : /^bitmap_(?:rgb32|ind16|ind8)$/.test(member.valueType)
            ? (member.arrayLength
                ? Array.from({ length: member.arrayLength },
                    () => new GeneratedBitmap(member.valueType))
                : new GeneratedBitmap(member.valueType))
          // MAME's `memory_bank_creator m_bank{*this, "bank"}`: a device that
          // banks its own window declares the bank as a member and installs it
          // into the owner's space. Resolving it to a number left every Atari
          // 2600 bank-switch cartridge with no window at all.
          : /^memory_bank(?:_array)?_creator/.test(member.valueType)
            ? (member.arrayLength
                ? Array.from({ length: member.arrayLength }, () => new IrMemoryBank())
                : new IrMemoryBank())
          : /^simple_list<[^>]+>$/.test(member.valueType)
            ? new IrSimpleList()
          // MAME's PAIR register union (emucore.h): one 32-bit word read as
          // .d, .w.l/.w.h or .b.l/.b.h/.b.h2/.b.h3. The 6805 keeps PC, S and
          // EA in one and writes them by halves (`rm16(vector, m_pc)`).
          : /^PAIR$/.test(member.valueType.replace(/\bconst\b/g, '').trim())
            ? (member.arrayLength
                ? Array.from({ length: member.arrayLength }, () => pairValue())
                : pairValue())
          // A class the device declares inside itself and holds by value (the
          // Z80 PIO's two `pio_port`s): each is an object with its own methods
          // and state, built from its allocation, not a number to call into.
          // Built below, once the owner's own handle exists to be passed in.
          : member.object && definition.allocations?.[member.object]
            ? (member.arrayLength ? new Array(member.arrayLength).fill(0) : 0)
          // A struct the device declares: build the shape its source gives it,
          // so the fields a method writes exist to be written.
          : member.fields
            ? (member.arrayLength
                ? Array.from({ length: member.arrayLength }, (_, index) =>
                    Object.assign(structMember(member.fields!, definition.structs, structTypeName(member.valueType)), member.initialValues?.[index] ?? {}))
                // A file-scope `static const struct` keeps its initializer.
                : Object.assign(structMember(member.fields, definition.structs, structTypeName(member.valueType)), structuredClone(member.initialValue ?? {})))
        : member.memory
        ? memoryMember(member, options, definition.structs)
        : member.values ? [...member.values]
        // A multi-dimensional array needs its inner rows to exist before the
        // second subscript can store into one: `m_wave_ram[bank][offset] = x`
        // indexes a number otherwise, and the write goes nowhere.
        : member.arrayShape ? nestedArrayMember(member.arrayShape)
        // A fixed-width integer array stores the way its C++ element does:
        // `int16_t m_reg[16]` wraps a 0x8000 to -32768. A plain array kept the
        // unwrapped value, and the Battlezone mathbox's signed products came
        // out of range for every projected object.
        : member.arrayLength ? integerArray(member.arrayLength, member.bits, member.signed)
        : member.initialText !== undefined ? member.initialText
        : isIndexableMemberType(member.valueType) ? []
        : member.initial ?? 0));
      if (member.bits) this.memberBits.set(member.name, member.bits);
      if (member.signed) this.memberSigned.add(member.name);
    }
    for (const [name, resource] of Object.entries(resourceMembers)) {
      if (!Object.hasOwn(this.members, name)) {
        this.members[name] = resolveDeviceResource(resource, resourceOptions);
      }
    }
    Object.assign(this.members, options.members);
    const self: Record<string, unknown> = {};
    // `self` is how a device that holds another calls it -- the IEC bus sits in
    // every drive's `m_bus` -- so each method is its prepared call, resolved on
    // first use, rather than overload selection on every call.
    for (const method of definition.methods) {
      let call: ((...args: GeneratedCallArgument[]) => unknown) | undefined;
      self[method.name] = (...args: GeneratedCallArgument[]) => (call ??= this.prepareCall(method.name))(...args);
    }
    for (const member of definition.members) Object.defineProperty(self, member.name, {
      // A later lowered declaration may refine a member into a struct array.
      // Match the member store's last-declaration-wins initialization.
      // Scratch storage stays out of a save state here too.
      enumerable: !member.scratch, configurable: true, get: () => this.members[member.name],
      set: value => { this.members[member.name] = wrap(value, member.bits, member.signed); },
    });
    // The parameters each method takes by non-const reference, so a caller
    // holding this object passes storage it writes back to: ymfm's engine
    // learns which channel a register write keyed on through
    // `m_regs.write(regnum, data, keyon_channel, keyon_opmask)`.
    // Only those it assigns: a struct it writes fields of is the object itself.
    const references = Object.fromEntries(definition.methods.flatMap(method => {
      const assigned = new Set<string>();
      walkExpressions(method.program.operations, expression => {
        if (expression.kind === 'assignment' && expression.target.kind === 'identifier') assigned.add(expression.target.name);
      });
      walkOperations(method.program.operations, operation => {
        if (operation.op === 'assign' && operation.target.kind === 'identifier') assigned.add(operation.target.name);
      });
      const indices = splitParameters(method.parameters).flatMap((parameter, index) =>
        /&(?!&)/.test(parameter.replace(/=.*$/, '')) && !/\bconst\b/.test(parameter) &&
        assigned.has(parameterName(parameter)) ? [index] : []);
      return indices.length ? [[method.name, indices]] : [];
    }));
    if (Object.keys(references).length) Object.defineProperty(self, REFERENCE_PARAMETERS, { value: references });
    // A plain C++ object (built from its source constructor) answers to no
    // host override, so a compiled method with no reference parameter is
    // called as it stands, its arity fixed: ymfm's operators and channels are
    // called this way four million times a second, and the rest-argument
    // wrapper above was the largest single cost of the OPLL.
    if (definition.construct) {
      const counts = new Map<string, number>();
      for (const method of definition.methods) counts.set(method.name, (counts.get(method.name) ?? 0) + 1);
      for (const method of definition.methods) {
        const compiled = definition.compiledMethods?.[method.name];
        const parameters = splitParameters(method.parameters);
        // A method that assigns a reference parameter is not in the compiled
        // map at all (it is emitted for emitted callers only), so every
        // reference a compiled one takes arrives as the object itself.
        if (!compiled || counts.get(method.name) !== 1 || references[method.name]) continue;
        const [d0, d1, d2] = parameters.map(parameterDefault);
        const device = this;
        self[method.name] = parameters.length === 0 ? () => compiled(device.executionContext)
          : parameters.length === 1 ? (a: GeneratedCallArgument = d0!) => compiled(device.executionContext, a)
          : parameters.length === 2 ? (a: GeneratedCallArgument = d0!, b: GeneratedCallArgument = d1!) =>
            compiled(device.executionContext, a, b)
          : parameters.length === 3 ? (a: GeneratedCallArgument = d0!, b: GeneratedCallArgument = d1!, c: GeneratedCallArgument = d2!) =>
            compiled(device.executionContext, a, b, c)
          : (...args: GeneratedCallArgument[]) => compiled(device.executionContext, ...args);
      }
    }
    self.tag = () => options.tag ?? '';
    self.machine = () => ({
      sample_rate: () => Number(this.bindings.calls?.['machine().sample_rate']?.() ?? 48000),
      rand: () => Number(this.bindings.calls?.['machine().rand']?.() ?? 0),
      phase: () => Number(this.bindings.calls?.['machine().phase']?.() ?? DEFAULT_CONSTANTS['machine_phase::RUNNING']),
    });
    self.interface = (type: string) => definition.hierarchy?.includes(type) ? self : 0;
    // device_execute_interface::set_input_line, for a device that is a CPU: the
    // line reaches its own execute_set_input. An object the CPU holds raises
    // its interrupts this way -- the 6805's timer calls
    // `m_parent.set_input_line(M6805_INT_TIMER, ASSERT_LINE)`.
    if (definition.methods.some(method => method.name === 'execute_set_input')) {
      self.set_input_line = (line: unknown, state: unknown) => this.call('execute_set_input', Number(line), Number(state));
    }
    // Framework bookkeeping an owned object asks its device for: the save
    // state walker and the debugger have their own routes, and a log line is
    // not behaviour.
    self.logerror = () => 0;
    self.save_item = () => 0;
    self.state_add = () => ({ mask: () => 0, formatstr: () => 0, noshow: () => 0, callimport: () => 0, callexport: () => 0 });
    this.members.this = self;
    // Vector members MAME resizes at run time restore at their saved length.
    const resizable = definition.members
      .filter(member => member.memory?.kind === 'owned' || member.memory?.kind === 'growable')
      .map(member => member.name);
    markResizable(this.members, resizable);
    markResizable(self, resizable);
    for (const callback of definition.callbacks) {
      const slots = Array.from({ length: callback.slots }, () => [] as DeviceCallbackListener[]);
      // One signal can name two different devcbs, told apart in MAME by how
      // they are called: `pa_rd_callback()` is the whole-port read, and
      // `pa_rd_callback<n>()` is bit n. Keying only by signal let the second
      // definition replace the first, so the 6532's whole-port read kept an
      // orphaned listener list, reported itself unset, and every Atari 2600
      // joystick read fell back to the port latch.
      const group = this.listeners.get(callback.signal) ?? [];
      group.push(slots);
      this.listeners.set(callback.signal, group);
      const emitters = slots.map(listeners => {
        const emitter = (...args: number[]) => {
          // A MAME devcb is one .set() plus any number of .append()s, and the
          // whole chain contributes: reads are OR-combined. Overwriting kept
          // only the last entry, which collapsed the Namco 53xx's mode select
          // — (q7<<3)|(q6<<2)|(q5<<1) on one K port — to a single bit.
          //
          // A listener that returns nothing (every write callback) contributes
          // nothing: the declared initial still stands, exactly as it does for
          // an unbound chain. Folding those into 0 silently changed the value
          // read back from write-only devcbs.
          let result: number | undefined;
          for (const listener of listeners) {
            const value = listener(...args);
            if (value === undefined) continue;
            result = (result ?? 0) | (Number(value) || 0);
          }
          return result ?? callback.initial ?? 0;
        };
        // MAME device code uses devcb::isunset() to decide which callback
        // slots override internal latch state.  Treating an unbound slot as a
        // callback returning zero changes input pins and can redirect CPU
        // execution (DK's T0/T1 sound inputs are one concrete example).
        Object.defineProperty(emitter, 'isunset', {
          value: () => listeners.length === 0,
        });
        return emitter;
      });
      this.members[callback.member] = callback.slots === 1 ? emitters[0] : emitters;
      // An accessor bound to one element (`porta_r()` is m_port_cb_r[0]) shares
      // that element's listeners, so a binding through it is what fires.
      for (const alias of callback.aliases ?? []) {
        const element = slots[alias.slot];
        if (!element) throw new Error(`${definition.type}: ${alias.signal} names slot ${alias.slot} of ${callback.member}`);
        this.listeners.set(alias.signal, [[element]]);
      }
      // An object the device holds calls back through its owner: the PIO
      // port's `m_device->m_out_pa_cb(0, data)`.
      Object.defineProperty(self, callback.member, {
        enumerable: true, configurable: true, get: () => this.members[callback.member],
      });
    }
    for (const specification of definition.timers ?? []) {
      const build = (name: string): IrTimer => {
        const timer = new IrTimer(() => Number(this.bindings.calls?.['machine().time']?.() ?? NaN));
        this.timers.set(name, { timer, callback: specification.callback });
        this.timerEntries.push({ name, timer, callback: specification.callback });
        return timer;
      };
      this.members[specification.member] = specification.count
        ? Array.from({ length: specification.count }, (_, index) => build(`${specification.member}[${index}]`))
        : build(specification.member);
    }

    // Materialise the completed source-declared state in one operation. Adding
    // hundreds of fields incrementally leaves it in dictionary storage in V8,
    // making every generated register access a hash lookup. Do this before
    // publishing the state to either execution context.
    this.members = Object.fromEntries(Object.entries(this.members));
    // Storage for an uninitialised C++ local kept between calls (`scratch`)
    // carries nothing from one call to the next, so a save state does not
    // walk it: built from its declaration here, it is the same on a machine
    // that has just started as on one restored from a save.
    for (const member of definition.members) {
      if (!member.scratch) continue;
      Object.defineProperty(this.members, member.name, {
        value: this.members[member.name], enumerable: false, writable: true, configurable: true,
      });
    }
    // A class the device holds by value (the Z80 PIO's `pio_port`s, the 6805's
    // `m6805_timer`): an object with its own methods and state, constructed
    // as the owner's initializer list constructs it -- `m_timer(*this)` hands
    // it the owner.
    for (const member of definition.members) {
      const allocated = member.object ? definition.allocations?.[member.object] : undefined;
      if (!allocated || member.objectConstructed) continue;
      const args = (member.objectArgs ?? []).map(argument =>
        /^\*?\s*this$/.test(argument) ? self
          : Number.isFinite(Number(argument)) ? Number(argument)
          : this.members[argument] ?? 0);
      const build = () => new IrDevice(allocated, clock, { constructorArgs: args as GeneratedCallArgument[] }).members.this;
      this.members[member.name] = member.arrayLength ? Array.from({ length: member.arrayLength }, build) : build();
    }

    const getters: Record<string, () => unknown> = {};
    const setters: Record<string, (value: number) => void> = {};
    for (const member of definition.members) {
      getters[member.name] = () => this.members[member.name] ?? 0;
      setters[member.name] = value => {
        this.members[member.name] = wrap(value, member.bits, member.signed);
      };
    }
    const referenceCalls: NonNullable<GeneratedHandlerBindings['referenceCalls']> = {};
    for (const [name, allocated] of Object.entries(definition.allocations ?? {})) {
      referenceCalls[`new::${name}`] = (...args) => {
        const instance = new IrDevice(allocated, clock, { constructorArgs: args });
        return instance.members.this;
      };
    }
    const callParameters: NonNullable<GeneratedHandlerBindings['callParameters']> = {};
    const palette: number[] = [];
    this.bindings = {
      members: this.members,
      getters,
      setters,
      constants: definition.constants,
      // Only the cross-CPU command latch defers its work: its partner is a
      // scheduled processor, so MAME's synchronize is what the two agree on.
      // Every other device here talks to hardware this runtime hosts rather
      // than schedules -- Namco's 06xx and its 5xxx MCUs, for one -- and
      // deferring their writes desynchronises that hosting (Xevious went
      // silent). Scheduling those MCUs as processors is what would let the
      // rest of MAME's synchronize semantics apply to them too.
      ...(options.schedule && definition.type.toUpperCase() === 'GENERIC_LATCH_8'
        ? { schedule: options.schedule }
        : {}),
      calls: {
        save_item: () => 0,
        save_pointer: () => 0,
        // A call through a member-function pointer, which holds the method's
        // name (member-pointers.ts): the T-Unit blitter's dma_draw tables.
        CALL_METHOD: (name: unknown, ...args: GeneratedCallArgument[]) =>
          this.invoke(String(name), ...args),
        logerror: () => 0,
        // A device method runs in its caller's time, and the synchronize MAME
        // would post from inside a processor's slice runs at once here (see
        // the scheduler call in execute.ts), so the two branches MAME picks
        // between on this answer -- ymfm's `ymfm_sync_check_interrupts` --
        // do the same thing.
        'machine().scheduler().currently_executing': () => 0,
        clock: () => clock,
        'machine().sample_rate': () => 48000,
        'machine().phase': () => DEFAULT_CONSTANTS['machine_phase::RUNNING']!,
        // `device().subtag(tag)`, resolved as MAME's device_t::subtag does:
        // `^` climbs to the owner, a leading `:` is absolute, anything else
        // is below this device. An NES card allocates its PRG as
        // `subtag("^cart:prg_rom")`, which names a region beside it.
        ...Object.fromEntries(['subtag', 'device().subtag'].map(name =>
          [name, (tag: unknown) => mameSubtag(options.deviceTag ?? options.tag ?? '', String(tag))])),
        // `machine().memory().region_alloc(tag, size, width, endian)`: a
        // region made at load time, as a cartridge's ROM is
        // (device_generic_cart_interface::rom_alloc). It is a region like any
        // other afterwards, so memregion(tag) finds it.
        ...Object.fromEntries(['machine().memory().region_alloc', 'device().machine().memory().region_alloc']
          .map(name => [name, (tag: unknown, size: unknown) => {
            const bytes = new Uint8Array(Math.max(0, Number(size) >>> 0));
            if (options.regions) options.regions[String(tag)] = bytes;
            return { base: () => bytes, bytes: () => bytes.length };
          }])),
        // MAME `running_machine::rand`, from its fixed power-on seed. The seed
        // is device state so a save state carries it (VLM5030 draws its
        // unvoiced excitation from it every sample).
        'machine().rand': () => {
          const seed = (Math.imul(1664525, Number(this.members.__machine_rand_seed ?? 0x9d14abd7)) +
            1013904223) >>> 0;
          this.members.__machine_rand_seed = seed;
          return ((seed >>> 16) | (seed << 16)) >>> 0;
        },
        // MAME `device_rom_interface::read_byte`: the device's own region.
        ...(definition.romInterface ? {
          read_byte: (address: number) => {
            const rom = options.regions?.[options.tag ?? ''];
            return rom?.length ? rom[(address & (2 ** definition.romInterface!.addressBits - 1)) % rom.length]! : 0;
          },
        } : {}),
        // `stream_alloc(inputs, outputs, sample_rate)`: the rate is the device's
        // own native output rate (VLM5030 asks for clock()/440), kept so the
        // host pumping it knows how many samples elapsed time is worth.
        stream_alloc: (_inputs, _outputs, rate) => {
          if (Number(rate) > 0) this.members.__stream_rate = Number(rate);
          // The host answers how far the stream has rendered (`end_time`):
          // the speaker places each edge against it.
          return {
            update: () => this.bindings.calls?.['stream.update']?.() ?? 0,
            end_time: () => this.bindings.calls?.['stream.end_time']?.() ?? 0,
            sample_rate: () => this.bindings.calls?.['stream.sample_rate']?.() ?? Number(this.members.__stream_rate ?? rate),
            // `sound_stream::set_sample_rate`: the AY-3-8910 allocates at
            // clock/8 and then halves it for a chip with an internal divider
            // (the Sunsoft 5B). Ignored, the 5B played an octave high.
            set_sample_rate: (next: number) => {
              if (Number(next) > 0) this.members.__stream_rate = Number(next);
              return 0;
            },
          };
        },
        total_cycles: () => this.executedCycles + (this.runningCycles === undefined
          ? 0 : this.runningCycles - Number(this.members.m_icount)),
        clocks_to_attotime: ticks => clock > 0 ? ticks / clock : Infinity,
        // MAME `device_t::attotime_to_clocks`, the inverse. A chip that
        // measures an interval in its own clocks needs it: the Game Boy APU
        // advances every channel by
        // `attotime_to_clocks(now - m_last_updated)`, and unbound that was
        // zero every time -- the square waves never toggled and the console
        // rendered silence however loud the game set the envelope.
        attotime_to_clocks: seconds => Math.floor(Number(seconds) * clock),
        // MAME `sound_stream::put_int(channel, index, value, max)`, with the
        // channel dropped by the caller: a sound device publishes one rendered
        // sample per call, scaled to full-range, and the host collects them
        // through takeStreamSamples() rather than the device pushing anywhere.
        stream_put_int: (index, value, max) => {
          this.streamSamples[index] = max ? value / max : 0;
          return 0;
        },
        'attotime::from_hz': frequency =>
          frequency > 0 ? 1 / frequency : Infinity,
        'attotime::from_ticks': (ticks, frequency) =>
          frequency > 0 ? ticks / frequency : Infinity,
        // The rest of attotime's constructors, in the seconds every duration
        // is held in here (as execute.ts's macro answers them). Bound so a
        // floppy drive's per-flux-cell `attotime::from_usec(4)` is a call,
        // not a walk down the macro chain.
        // Bound like a call so emitted code reaches it through its links
        // rather than down the macro chain (see generatedBoundSearch).
        'std::lower_bound': (first, last, value, compare) => generatedBoundSearch(true, first, last, value, compare),
        'std::upper_bound': (first, last, value, compare) => generatedBoundSearch(false, first, last, value, compare),
        'attotime::from_seconds': seconds => seconds,
        'attotime::from_double': seconds => seconds,
        'attotime::from_msec': msec => msec * 1e-3,
        'attotime::from_usec': usec => usec * 1e-6,
        'attotime::from_nsec': nsec => nsec * 1e-9,
        // MAME's device_palette_interface has both overloads:
        // `set_pen_color(pen, rgb_t)` and `set_pen_color(pen, r, g, b)`. Only
        // the argument count separates them, and reading the four-argument form
        // as the two-argument one stored the red channel alone as the whole
        // colour -- which made the TIA's pen 0 black-with-no-alpha and every
        // Atari 2600 picture invisible.
        set_pen_color: (entry, ...channels) => {
          palette[entry] = channels.length >= 3
            ? rgbPixel(channels[0]!, channels[1]!, channels[2]!)
            : channels[0]! >>> 0;
          return 0;
        },
        pen_color: entry => palette[entry] ?? 0xff000000,
        // device_palette_interface::pen(i). With no indirection table MAME
        // points m_pens straight at the adjusted entry colours, so the pen a
        // device writes into a bitmap_rgb32 is the colour itself.
        pen: entry => palette[entry] ?? 0xff000000,
        // The C math functions MAME's palette and DSP arithmetic reaches for.
        // `pow` is not optional decoration: the TIA gamma-corrects every one of
        // its 128 base pens with `pow(R, 0.9)`, and an unbound call answered
        // zero -- which made the whole palette black and every Atari 2600
        // picture with it.
        floor: value => Math.floor(value),
        ceil: value => Math.ceil(value),
        pow: (value, exponent) => Math.pow(value, exponent),
        sqrt: value => Math.sqrt(value),
        exp: value => Math.exp(value),
        expf: value => Math.fround(Math.exp(Math.fround(value))),
        logf: value => Math.fround(Math.log(Math.fround(value))),
        log: value => Math.log(value),
        log10: value => Math.log10(value),
        fabs: value => Math.abs(value),
        tan: value => Math.tan(value),
        atan: value => Math.atan(value),
        atan2: (y, x) => Math.atan2(y, x),
        cos: value => Math.cos(value),
        sin: value => Math.sin(value),
        DEGREE_TO_RADIAN: value => value * Math.PI / 180,
        'std::clamp': (value, minimum, maximum) =>
          Math.min(maximum, Math.max(minimum, value)),
        rgb_t: (...components) => {
          const offset = components.length >= 4 ? 1 : 0;
          const alpha = components.length >= 4 ? components[0]! & 0xff : 0xff;
          const red = components[offset]! & 0xff;
          const green = components[offset + 1]! & 0xff;
          const blue = components[offset + 2]! & 0xff;
          return (alpha << 24 | blue << 16 | green << 8 | red) >>> 0;
        },
        // MAME: copybitmap(dest, src, flipx, flipy, destx, desty, cliprect).
        // The arguments past the two bitmaps are not decoration -- a video
        // device's own bitmap is its whole raster, wider than the visible
        // screen, so a copy that ignores stride and offset shears the picture.
        copybitmap: (destination, source, _flipx, _flipy, destX, destY, cliprect) => {
          copyGeneratedBitmap(destination, source, destX, destY, cliprect);
          return 0;
        },
        // `space(n)`: the device's own address space, as MAME's
        // device_memory_interface hands it out. Every declared space is flat
        // RAM (the extractor records no other shape), so the map is the buffer.
        space: index => this.deviceSpace(Number(index)) ?? 0,
        // A source handler named in an address map, `FUNC(cls::method)`,
        // and a lambda given a name for the debugger, `NAME([this]() {...})`.
        FUNC: (handler: unknown) => handler,
        NAME: (value: unknown) => value,
        // Storage a device reaches through an accessor rather than a member:
        // a Game Boy cartridge PCB asks its slot for `cart_rom_region()`.
        ...Object.fromEntries(
          Object.entries(definition.resources?.calls ?? {}).map(([name, resource]) => {
            const value = resolveDeviceResource(resource, resourceOptions);
            return [name, () => value];
          }),
        ),
        ...options.calls,
      },
      referenceCalls,
      callParameters,
    };
    // An object built from a source constructor is a plain C++ class, not a
    // device: its own method named like a device_t service is that method.
    // ymfm's engine steps itself with `clock(chanmask)`, which answered the
    // device's clock rate and never ran.
    if (definition.construct) {
      for (const method of definition.methods) {
        if (!options.calls?.[method.name]) delete this.bindings.calls![method.name];
      }
    }
    this.executionContext = {
      members: this.members,
      calls: this.bindings.calls!,
      links: undefined,
      palette,
      readIndex: (value, index) => {
        // A typed array first: the pointer probe on one is a prototype-chain
        // miss, and device memory is almost always typed.
        if (ArrayBuffer.isView(value)) return (value as Uint8Array)[index] ?? 0;
        if (isGeneratedPointer(value)) {
          return value.source[value.offset + index] ?? 0;
        }
        return (value as ArrayLike<unknown> | undefined)?.[index] ?? 0;
      },
      writeIndex: (value, index, next) => {
        if (isGeneratedPointer(value)) {
          value.source[value.offset + index] = Number(next);
        } else if (value && typeof value === 'object') {
          (value as Record<number, unknown>)[index] = next;
        }
        return next;
      },
      addressOf: (value, index) => isGeneratedPointer(value)
        ? {
          generatedPointer: true,
          source: value.source,
          offset: value.offset + index,
        }
        : {
          generatedPointer: true,
          source: value as ArrayLike<number> & { [index: number]: number },
          offset: index,
        },
      dereference: dereferenceGeneratedValue,
      copyStruct: copyGeneratedStruct,
      packedView: generatedPackedView,
      container: generatedContainerAccessor,
      vectorMethod: generatedVectorMethod,
      pointerStore: generatedPointerStore,
      add: generatedAdd,
      subtract: generatedSubtract,
      resize: resizeGeneratedContainer,
      attotime: (seconds: number, method: string, ...args: number[]) => attotimeSecondsMethod(seconds, method, args) ?? 0,
      // A device declares every member up front, so the container is already
      // there; the name-addressed form exists for the board, whose driver
      // members are materialised on first write.
      writableMember: name => this.members[name] ?? 0,
      wide: generatedWideBinary,
      invoke: (name, ...args) => {
        if (name.startsWith('new::') && referenceCalls[name]) return referenceCalls[name]!(...args);
        const method = this.selectMethod(name, args);
        if (method) return this.executeMethod(method, this.methodParams.get(method)!, args);
        const binding = this.bindings.calls?.[name];
        if (binding) {
          const delegate = this.delegateNames.has(name);
          return (binding as (...values: unknown[]) => unknown)(
            ...(delegate ? args : args.map(Number)),
          );
        }
        const member = this.members[name];
        if (typeof member === 'function') return member(...args);
        return 0;
      },
      macro: (name, ...args) => generatedMacroCall(name, args),
      combineData: applyCombineData,
      divide: applyGeneratedDivision,
      shiftRight: applyGeneratedShiftRight,
      same: generatedValuesEqual,
      andAssign: applyGeneratedAndAssign,
      and: applyGeneratedAnd,
      // Devices declare every member up front, so an absent one is genuinely
      // absent; boards resolve finders and getters here (see execute.ts).
      member: () => 0,
      overrides: {},
    };
    const pendingTimers = [...this.timers.values()];
    this.bindings.calls!.timer_alloc = () => pendingTimers.shift()?.timer ?? 0;
    // A struct local with no initializer, built from its declaration
    // (device-compiler lowerStructLocals): `cbm_crt_header header;`.
    const structOf = (type: unknown): unknown => {
      const fields = definition.structs?.[String(type)];
      return fields ? structMember(fields, definition.structs, String(type)) : 0;
    };
    this.bindings.calls!.STRUCT_OF = structOf as (...args: number[]) => unknown;
    referenceCalls.STRUCT_OF = structOf;
    // `T items[n]` of a struct T the device declares: n of them, each built
    // from the declaration, array fields and methods included -- ymfm renders
    // into `output_data output[256]`, each a `ymfm_output<2>`.
    const structArrayOf = (count: unknown, type: unknown): unknown =>
      Array.from({ length: Math.max(0, Number(count) || 0) }, () => structOf(type));
    this.bindings.calls!.STRUCT_ARRAY_OF = structArrayOf as (...args: number[]) => unknown;
    referenceCalls.STRUCT_ARRAY_OF = structArrayOf;
    // A vector local constructed with a size (normalizeMameExecutionSource):
    // that many value-initialized elements of its declared kind, and growing
    // by more of them. The floppy drive's write_flux starts from
    // `std::vector<wspan> wspans(1)`.
    const vectorOf = (type: unknown, count: unknown): unknown =>
      resizeGeneratedContainer(generatedVector(vectorElement(String(type), definition.structs)), Number(count) || 0);
    this.bindings.calls!.VECTOR_OF = vectorOf as (...args: number[]) => unknown;
    referenceCalls.VECTOR_OF = vectorOf;
    // A region is named by a string, which a plain host call would hand over
    // as a number: `region_alloc(subtag("^cart:prg_rom"), ...)` made every
    // NES card's PRG and CHR the one region "0".
    for (const [name, parameters] of [
      ['subtag', 'std::string_view tag'],
      ['device().subtag', 'std::string_view tag'],
      ['machine().memory().region_alloc', 'std::string_view name, u32 length, u8 width, endianness_t endian'],
      ['device().machine().memory().region_alloc', 'std::string_view name, u32 length, u8 width, endianness_t endian'],
    ] as const) {
      const call = this.bindings.calls![name];
      if (!call) continue;
      referenceCalls[name] ??= call as (...args: unknown[]) => unknown;
      callParameters[name] ??= splitParameters(parameters);
    }
    for (const method of definition.methods) {
      const parameters = splitParameters(method.parameters);
      const names = parameters.map(parameterName);
      callParameters[method.name] = parameters;
      this.methodParams.set(method, names);
      this.methodDefaults.set(method, parameters.map(parameterDefault));
      referenceCalls[method.name] = (...args) => {
        const selected = this.selectMethod(method.name, args);
        return selected
          ? this.executeMethod(selected, this.methodParams.get(selected)!, args)
          : 0;
      };
    }

    // An image held from power-on is open before the slot picks its card,
    // which may be the image's to pick (get_default_card_software, below).
    if (options.image) this.openImage(options.image);
    if (this.readsOwnFile()) this.hostImageFile(this.members.this as Record<string, unknown>);
    if (this.definition.floppyFormats) this.hostFloppyImage();
    if (this.definition.imageFormats) this.hostCassetteImage();

    if (definition.slot) {
      const selected = definition.slot.selector
        ? options.selectors?.[definition.slot.selector]
        : options.slot;
      // MAME chooses the card of a slot that is an image device from the
      // image, before the machine starts: the slot's own
      // get_default_card_software reads a .crt's header, or the title's
      // `slot` feature through software_get_default_slot.
      const chosen = selected === undefined && options.image ? this.defaultCardSoftware() : undefined;
      const option = String(selected ?? chosen ?? definition.slot.default ?? '');
      this.slotOption = option || undefined;
      const childDefinition = definition.slot.options[option];
      if (childDefinition) {
        const cartSpace = definition.slot.install?.space;
        const child = this.slotChild = new IrDevice(childDefinition, clock, {
          ...resourceOptions,
          owner: this.members.this,
          // The card is the slot's subdevice named by its option, as MAME
          // tags it (`nes_slot:nrom`); only its subtag() reads this.
          deviceTag: `${options.deviceTag ?? options.tag ?? ''}:${option}`,
          // A child card may itself be a slot in a future bus; do not pass
          // the parent's selected option through accidentally.
          slot: undefined,
          // The address space the card installs itself into, as MAME's own
          // interface hands it out. The slot fills it in for the duration of
          // installSlotCard and clears it after, so a card that asks outside
          // that window sees the null pointer MAME's `cart_space()` returns.
          ...(cartSpace
            ? {
                calls: {
                  ...resourceOptions.calls,
                  [cartSpace]: () => this.slotChild?.installSpace ?? 0,
                },
              }
            : {}),
        });
        // Each method is the card's prepared call, resolved on first use: the
        // C64 asks its expansion port's card for the bus on every read.
        const proxy: Record<string, unknown> = Object.fromEntries(child.methodNames().map(name => {
          let call: ((...args: GeneratedCallArgument[]) => unknown) | undefined;
          return [name, (...args: GeneratedCallArgument[]) => (call ??= child.prepareCall(name))(...args)];
        }));
        // And its members, as MAME's slot reaches into the card it holds: the
        // C64 expansion port's call_load writes `m_card->m_roml`. Not
        // enumerable, so a save state does not find the card twice.
        const card = child.instance() as Record<string, unknown>;
        for (const member of childDefinition.members) {
          if (Object.hasOwn(proxy, member.name)) continue;
          Object.defineProperty(proxy, member.name, {
            enumerable: false,
            get: () => card[member.name],
            set: value => { card[member.name] = value; },
          });
        }
        this.members[definition.slot.member] = proxy;
        this.bindings.calls!.get_card_device = () => proxy;
      } else {
        this.members[definition.slot.member] = 0;
        this.bindings.calls!.get_card_device = () => 0;
      }
    }

    // Devices this one is built out of, as its device_add_mconfig declares.
    // Constructed before device_start, because that is when MAME's own
    // finders are already resolved -- the DPC cartridge hands its display
    // data straight to its coprocessor.
    for (const child of definition.children ?? []) {
      // The child's delegates this device fills from its machine config
      // (`m_cart->set_device_load(FUNC(spectrum_intf2_device::cart_load))`).
      // They are part of the child's configuration, so they are bound before
      // it starts; and it starts once this device holds it, because the
      // callback it loads its image through reaches straight back for it
      // (`m_cart->common_get_size("rom")`).
      const targets = Object.entries(child.delegateTargets ?? {});
      const instance = new IrDevice(child.definition, child.clock ?? clock, {
        ...resourceOptions,
        owner: this.members.this,
        // Tagged below this device, as MAME tags it: the VRC7's DS1001 is
        // `nes_slot:vrc7:vrc7snd`, and its instrument ROM region
        // `nes_slot:vrc7:vrc7snd:internal`.
        deviceTag: `${this.ownTag}:${child.tag ?? child.member.replace(/^m_/, '')}`,
        slot: undefined,
        ...(targets.length ? {
          calls: {
            ...resourceOptions.calls,
            ...Object.fromEntries(targets.map(([delegate, method]) =>
              [delegate, (...args: GeneratedCallArgument[]) => this.invoke(method, ...args)])),
          },
          deferStart: true,
        } : {}),
      });
      this.children.push(instance);
      const callable: Record<string, unknown> = Object.fromEntries(
        instance.methodNames().map(name => [
          name,
          (...args: GeneratedCallArgument[]) => instance.preparedCall(name)(...args),
        ]),
      );
      // And the image interface the host answers for it: the ZX Interface 2
      // asks its own GENERIC_CARTSLOT `m_cart->exists()` before every read.
      for (const [name, value] of Object.entries(instance.instance() as Record<string, unknown>)) {
        if (typeof value === 'function' && !Object.hasOwn(callable, name)) callable[name] = value;
      }
      this.members[child.member] = callable;
      if (targets.length) instance.startDeferred();
    }

    // `device_delegate::isnull()`: set exactly when something bound it. The
    // generic cartridge slot loads through its owner's delegate when there is
    // one and reads the ROM itself when there is not.
    for (const delegate of this.delegateNames) {
      this.bindings.calls![`${delegate}.isnull`] ??= () => this.bindings.calls![delegate] ? 0 : 1;
    }
    // Every binding the constructor installs is in place; resolve the links
    // the emitted methods read before any of them can run.
    this.refreshCallLinks();
    if (definition.construct) this.invoke(definition.construct, ...(options.constructorArgs ?? []));
    options.configure?.(this);
    const start = (): void => {
      if (definition.start) this.call(definition.start);
      // MAME mounts the images it was started with once every device has
      // started, and resets after: the cartridge is in the card before the
      // C64's KERNAL looks for one.
      if (options.image) this.loadOpenImage();
      // device_t::start() ends with notify_clock_changed(): a device derives
      // its clock-scaled constants there, not in device_start. The 64H156
      // sets its bit-cell period that way, and without it the period stayed
      // zero.
      if (this.methods.has('device_clock_changed')) this.call('device_clock_changed');
      for (const initialize of definition.resources?.initialize ?? []) {
        if (!this.methodNames().includes(initialize.method)) continue;
        this.invoke(
          initialize.method,
          ...(initialize.args ?? []).map(resource =>
            resolveDeviceResource(resource, resourceOptions)),
        );
      }
      this.reset();
    };
    if (options.deferStart) this.pendingStart = start;
    else start();
  }

  /** device_start held back by `deferStart`, run once when the host is ready. */
  private pendingStart?: () => void;

  startDeferred(): void {
    const start = this.pendingStart;
    this.pendingStart = undefined;
    start?.();
  }

  instance(): unknown {
    return this.members.this;
  }

  /**
   * The sound devices this device and the card in its slot are built out of,
   * that render a stream MAME routes to a speaker: an NES cartridge's MMC5,
   * VRC6 or Namco 163, which only exist once a cartridge chose that board.
   * Each is tagged as MAME tags it (`nes_slot:exrom:sound`), with the gain
   * its route gives output 0.
   */
  streamDescendants(): { tag: string; device: Device; gain: number }[] {
    const own = this.ownTag;
    const found: { tag: string; device: Device; gain: number }[] = [];
    (this.definition.children ?? []).forEach((child, index) => {
      const instance = this.children[index];
      if (!instance) return;
      const route = child.routes?.find(candidate => candidate.output === -1 || candidate.output === 0);
      if (route && route.gain > 0 && instance.methods.has('sound_stream_update')) {
        found.push({ tag: `${own}:${child.tag ?? child.member.replace(/^m_/, '')}`, device: instance, gain: route.gain });
      }
      found.push(...instance.streamDescendants());
    });
    if (this.slotChild) found.push(...this.slotChild.streamDescendants());
    return found;
  }

  reset(): void {
    this.executedCycles = 0;
    this.runningCycles = undefined;
    for (const child of this.children) child.reset();
    if (this.definition.reset) this.call(this.definition.reset);
    // The card in a slot is one of its subdevices, and device_t::reset
    // resets those after the device itself: an Ocean cartridge's
    // device_reset puts it back on bank 0, so a reset machine restarts from
    // the cartridge's own entry rather than whichever bank it last switched to.
    this.slotChild?.reset();
  }

  /**
   * Save-state roots (machine-state.ts): everything the device's MAME source
   * declared or allocated, and the composition it owns. The definition,
   * bindings, listeners and resolved call links are wiring.
   */
  stateKeys(): readonly string[] {
    return ['members', 'timers', 'spaces', 'executedCycles', 'streamSamples', 'children', 'slotChild', 'executionContext'];
  }

  tick(seconds: number): void {
    // Runs after every instruction of the processor that keeps device time --
    // a C64 ticks its two CIAs and its datassette 6,000 times a frame -- so
    // an idle timer costs nothing and an armed one does not allocate.
    const entries = this.timerEntries;
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index]!;
      const timer = entry.timer;
      if (!timer.enabled()) continue;
      const name = entry.name;
      let fire = entry.fire;
      if (!fire) {
        fire = noTimerCallback;
        const callback = entry.callback;
        if (callback) {
          // Resolved once, like a hot bus connection: the 64H156's update
          // tick fires at every bit cell its drive reads.
          const prepared = this.prepareCall(callback);
          fire = parameter => { prepared(parameter); };
        }
        entry.fire = fire;
      }
      try {
        timer.tick(seconds, fire);
      } catch (error) {
        if (error instanceof Error && error.message.includes('firings')) {
          throw new Error(`${this.definition.type} timer ${name}: ${error.message}`, { cause: error });
        }
        throw error;
      }
    }
    // A device built out of other devices has to advance them too: the board
    // only knows the devices its own machine config names. Pitfall II's DPC
    // coprocessor sits two levels down -- cartridge slot, then mounted PCB --
    // and its 18400 Hz oscillator drives the chip's random-number and music
    // counters, so without this it is frozen while everything else runs.
    for (const child of this.children) child.tick(seconds);
    this.slotChild?.tick(seconds);
  }

  /**
   * MAME calls `device_post_load` on every device once a state is loaded, so
   * a device can rebuild what save_item cannot hold. The SID's is the
   * clearest: each voice's waveform routine is a function pointer, chosen
   * from the registers by `postload()`, and without it a voice kept running
   * whichever routine it had when the save was loaded over it.
   */
  postLoad(): void {
    if (this.methodNames().includes('device_post_load')) this.invoke('device_post_load');
    for (const child of this.children) child.postLoad();
    this.slotChild?.postLoad();
  }

  needsTick(): boolean {
    return this.timers.size > 0 || this.children.some(child => child.needsTick()) ||
      Boolean(this.slotChild?.needsTick());
  }


  call(name: string, ...args: number[]): number {
    return Number(this.preparedCall(name)(...args)) || 0;
  }

  runCycles(cycles: number): number {
    if (!this.executeEntry) this.connectCall('execute_run', call => { this.executeEntry = call; });
    this.members.m_icount = cycles;
    this.runningCycles = cycles;
    try {
      this.executeEntry!();
    } finally {
      this.executedCycles += cycles - Number(this.members.m_icount);
      this.runningCycles = undefined;
    }
    return cycles - Number(this.members.m_icount);
  }

  invoke(name: string, ...args: GeneratedCallArgument[]): unknown {
    // A composition capability may replace a source method when the method's
    // external card/device dependency is supplied by the host (for example a
    // controller connector backed by live browser input ports).
    const bound = this.bindings.calls?.[name];
    if (bound) {
      // device_delegate callbacks may carry C++ reference parameters (Konami
      // tile/sprite callbacks update code, color and priority in place).  A
      // numeric coercion here discards the generated pointer wrapper and makes
      // the callback appear to run while none of its results reach the chip.
      const delegate = this.delegateNames.has(name);
      return (bound as (...values: unknown[]) => unknown)(
        ...(delegate ? args : args.map(Number)),
      );
    }
    const method = this.selectMethod(name, args);
    if (!method) throw new Error(`${this.definition.type} has no generated method "${name}"`);
    return this.executeMethod(method, this.methodParams.get(method)!, args);
  }

  private readonly preparedCalls = new Map<string, (...args: GeneratedCallArgument[]) => unknown>();

  /**
   * `prepareCall`, made once per method. A call that arrives by name -- a
   * slot handing a bus access to its card, a card asking its PPU for the draw
   * phase -- otherwise searched the overloads and walked `executeMethod` on
   * every access: the MMC5 makes ninety thousand such calls a frame.
   */
  preparedCall(name: string): (...args: GeneratedCallArgument[]) => unknown {
    let prepared = this.preparedCalls.get(name);
    if (!prepared) this.preparedCalls.set(name, prepared = this.prepareCall(name));
    return prepared;
  }

  prepareCall(name: string): (...args: GeneratedCallArgument[]) => unknown {
    const methods = this.methods.get(name);
    const compiled = this.definition.compiledMethods?.[name];
    if (!compiled || methods?.length !== 1 ||
        (this.definition.type === 'GENERIC_LATCH_8' && name === 'write')) {
      return (...args) => this.invoke(name, ...args);
    }
    const method = methods[0]!;
    const count = this.methodParams.get(method)!.length;
    const defaults = this.methodDefaults.get(method)!;
    const context = this.executionContext;
    // Preserve late host overrides and default/reference arguments, while
    // avoiding overload selection and argument-array allocation per bus read.
    const value = (argument: GeneratedCallArgument | undefined, index: number) =>
      generatedReferent(argument ?? defaults[index] ?? 0) as GeneratedCallArgument;
    if (count === 0) return () => this.bindings.calls?.[name]
      ? this.invoke(name) : compiled(context);
    if (count === 1) return a => this.bindings.calls?.[name]
      ? this.invoke(name, a) : compiled(context, value(a, 0));
    if (count === 2) return (a, b) => this.bindings.calls?.[name]
      ? this.invoke(name, a, b) : compiled(context, value(a, 0), value(b, 1));
    if (count === 3) return (a, b, c) => this.bindings.calls?.[name]
      ? this.invoke(name, a, b, c) : compiled(context, value(a, 0), value(b, 1), value(c, 2));
    if (count === 4) return (a, b, c, d) => this.bindings.calls?.[name]
      ? this.invoke(name, a, b, c, d) : compiled(context, value(a, 0), value(b, 1), value(c, 2), value(d, 3));
    if (count === 5) return (a, b, c, d, e) => this.bindings.calls?.[name]
      ? this.invoke(name, a, b, c, d, e) : compiled(context, value(a, 0), value(b, 1), value(c, 2), value(d, 3), value(e, 4));
    if (count === 6) return (a, b, c, d, e, f) => this.bindings.calls?.[name]
      ? this.invoke(name, a, b, c, d, e, f) : compiled(context, value(a, 0), value(b, 1), value(c, 2), value(d, 3), value(e, 4), value(f, 5));
    if (count === 7) return (a, b, c, d, e, f, g) => this.bindings.calls?.[name]
      ? this.invoke(name, a, b, c, d, e, f, g) : compiled(context, value(a, 0), value(b, 1), value(c, 2), value(d, 3), value(e, 4), value(f, 5), value(g, 6));
    if (count === 8) return (a, b, c, d, e, f, g, h) => this.bindings.calls?.[name]
      ? this.invoke(name, a, b, c, d, e, f, g, h) : compiled(context, value(a, 0), value(b, 1), value(c, 2), value(d, 3), value(e, 4), value(f, 5), value(g, 6), value(h, 7));
    return (...args) => this.invoke(name, ...args);
  }

  connectCall(name: string, receive: (call: (...args: GeneratedCallArgument[]) => unknown) => void): void {
    const refresh = () => {
      const methods = this.methods.get(name);
      const compiled = this.definition.compiledMethods?.[name];
      const parameters = methods?.length === 1 ? splitParameters(methods[0]!.parameters) : undefined;
      const scalarArguments = parameters?.every(parameter =>
        /^(?:const\s+)?(?:bool|char|[us](?:8|16|32)|u?int(?:8|16|32)_t|int|unsigned|offs_t|size_t)\s+\w+$/.test(parameter));
      // The generated caller supplies the declared scalar arguments. Binding
      // the executable itself lets its caller inline tiny register accessors;
      // a shared dispatch closure makes those sites polymorphic instead.
      receive(compiled && methods?.length === 1 &&
        scalarArguments && !this.bindings.calls?.[name] &&
        !(this.definition.type === 'GENERIC_LATCH_8' && name === 'write')
        ? compiled.bind(undefined, this.executionContext) : this.prepareCall(name));
    };
    const connections = this.callConnections.get(name) ?? [];
    connections.push(refresh);
    this.callConnections.set(name, connections);
    refresh();
  }

  get(name: string): number {
    return Number(this.members[name]) || 0;
  }

  set(name: string, value: number): void {
    this.members[name] = wrap(
      value,
      this.memberBits.get(name),
      this.memberSigned.has(name),
    );
  }

  hasMember(name: string): boolean {
    return Object.hasOwn(this.members, name);
  }

  bindMember(name: string, value: unknown): void {
    if (this.hasMember(name)) this.members[name] = value;
  }

  constant(name: string): number | undefined {
    return this.definition.constants[name] ??
      this.definition.constants[name.split('::').at(-1)!];
  }

  constants(): Readonly<Record<string, number>> {
    return this.definition.constants;
  }

  methodNames(): readonly string[] {
    return [...this.methods.keys()];
  }

  streamRate(): number | undefined {
    const rate = Number(this.members.__stream_rate);
    return rate > 0 ? rate : undefined;
  }

  takeStreamSamples(): readonly number[] {
    const samples = this.streamSamples;
    this.streamSamples = [];
    return samples;
  }

  arity(name: string): number {
    const overloads = this.methods.get(name) ?? [];
    return overloads.length
      ? Math.max(...overloads.map(method => splitParameters(method.parameters).length))
      : 0;
  }

  /** One of the device's own address spaces, a mapped one built on first use. */
  private deviceSpace(index: number): GeneratedDeviceSpace | undefined {
    const existing = this.spaces.get(index);
    if (existing) return existing;
    const config = this.definition.spaces?.find(space => space.index === index);
    if (!config?.map) return undefined;
    const space = mappedDeviceSpace(this, config.addressBits, config.map, this.regionLookup);
    this.spaces.set(index, space);
    return space;
  }

  parameters(name: string): readonly string[] {
    const overloads = this.methods.get(name) ?? [];
    return splitParameters(overloads.at(-1)?.parameters ?? '');
  }

  signalNames(): readonly string[] {
    return [...this.listeners.keys()];
  }

  on(signal: string, listener: DeviceCallbackListener, slot?: number): Device {
    const group = this.listeners.get(signal);
    if (!group?.length) {
      throw new Error(`${this.definition.type} has no callback signal "${signal}"`);
    }
    // An unindexed binding is the whole-port devcb; an indexed one addresses a
    // bit. Where a signal names both, that is what separates them.
    const channels = slot === undefined
      ? group.find(candidate => candidate.length === 1) ?? group[0]!
      : group.find(candidate => candidate.length > 1 && slot < candidate.length)
        ?? group[0]!;
    const listeners = channels[slot ?? 0];
    if (!listeners) {
      throw new Error(`${this.definition.type} callback "${signal}" has no slot ${slot}`);
    }
    listeners.push(listener);
    return this;
  }

  bindCall(
    name: string,
    listener: (...args: any[]) => unknown,
    parameters?: string,
  ): Device {
    this.bindings.calls![name] = listener;
    if (parameters !== undefined) {
      this.bindings.callParameters![name] = splitParameters(parameters);
      if (parameters.includes('&')) {
        this.bindings.referenceCalls![name] = listener;
      }
    }
    this.refreshCallLinks();
    for (const refresh of this.callConnections.get(name) ?? []) refresh();
    return this;
  }

  /**
   * Re-resolve the links table the emitted methods read. Called after every
   * change to this device's own call bindings -- bindCall here, and the
   * board's direct assignments into a device's table -- so a link never
   * outlives the binding it was resolved from.
   */
  refreshCallLinks(): void {
    const keys = this.definition.compiledMethodLinks;
    this.executionContext.links = keys?.length
      ? buildCallLinks(this.bindings.calls, keys)
      : undefined;
    noteCallLinksChanged();
  }

  cycleClock(): number {
    return this.clock / (this.definition.clockDivider ?? 1);
  }

  bindAddressSpace(index: number, read: (address: number) => number,
    write: (address: number, data: number) => void): void {
    const config = this.definition.spaces?.find(space => space.index === index);
    const space = this.spaces.get(index);
    if (!config || !space || config.dataBits !== 8) {
      throw new Error(`${this.definition.type}: no supported byte address space ${index}`);
    }
    const mask = 2 ** config.addressBits - 1;
    space.read_byte = address => read(address & mask);
    space.write_byte = (address, data) => { write(address & mask, data & 0xff); return 0; };
  }

  dataAddressBits(): number | undefined {
    return this.definition.dataAddressBits;
  }

  hostedCalls(): Readonly<Record<string, (...args: never[]) => unknown>> {
    return this.hostedSurface;
  }

  bus(): GeneratedDeviceDefinition['bus'] {
    const bus = this.definition.bus;
    if (!bus?.ranges.some(range => range.cards)) return bus;
    // machine_start installs some handlers only for the boards that need
    // them (the NES's read_h for MMC5, Datach, Aladdin, ...).
    return {
      ...bus,
      ranges: bus.ranges.filter(range =>
        !range.cards || (this.slotChild !== undefined && range.cards.includes(this.slotOption ?? ''))),
    };
  }

  delegates(): Record<string, string> {
    return this.definition.delegates ?? {};
  }

  role(): string | undefined {
    return this.definition.role;
  }

  findDevice(role: string): Device | undefined {
    if (this.role() === role) return this;
    return this.slotChild?.findDevice(role) ?? this.children.map(child => child.findDevice(role)).find(Boolean);
  }

  imageExtensions(): string[] {
    if (this.definition.floppyFormats) return [...new Set(this.definition.floppyFormats.flatMap(format => format.extensions))];
    // device_image_interface::file_extensions(), as the device answers it: a
    // quickload's are its configured set_extensions("p00,prg,t64").
    if (this.readsOwnFile()) {
      const listed = this.methods.has('file_extensions') ? this.invoke('file_extensions') : 0;
      return typeof listed === 'string' ? listed.split(',').map(extension => extension.trim().toLowerCase()).filter(Boolean) : [];
    }
    return this.definition.imageFormats?.map(format => format.extension) ?? [];
  }

  /**
   * An image device whose own call_load reads the file it is handed, rather
   * than one a format table decodes for it: a quickload, a cartridge port.
   */
  private readsOwnFile(): boolean {
    return Boolean(this.definition.imageInterface && !this.definition.floppyFormats && !this.definition.imageFormats);
  }

  deviceName(): string | undefined {
    return this.slotChild?.definition.description ?? this.definition.description;
  }

  imageTypeName(): string | undefined {
    if (!this.definition.imageInterface || !this.methods.has('image_type_name')) return undefined;
    const name = this.invoke('image_type_name');
    return typeof name === 'string' ? name : undefined;
  }

  timerPending(): boolean {
    return this.timerEntries.some(entry => entry.timer.enabled());
  }

  imageError(): string | undefined {
    return this.lastImageError;
  }

  /**
   * image_init, then call_load: the file is open, or the software part in
   * hand, before the device's own load runs. A quickload's call_load only
   * arms its timer (snapquik.cpp); the C64 expansion port's reads the part's
   * areas into its card. A refusal is kept for the host to show.
   */
  private loadImage(image: BoardImage): void {
    this.openImage(image);
    this.loadOpenImage();
  }

  /**
   * The image as the device's own code reads it: a util::core_file over the
   * bytes, its read position shared with fread and util::read, and the
   * software part it came from, if any.
   */
  private openImage(image: BoardImage): void {
    const extension = image.name.includes('.') ? image.name.split('.').pop()!.toLowerCase() : '';
    const file = {
      bytes: image.bytes ?? new Uint8Array(0), name: image.name, filetype: extension, position: 0,
      // util::core_file's own calls, as the CRT reader makes them.
      eof: () => file.position >= file.bytes.length ? 1 : 0,
      tell: () => file.position,
      // `length(std::uint64_t &result)`, as the NES slot's chooser reads the
      // file it is handed to see an iNES header.
      length: (result: unknown) => {
        if (result && typeof (result as { set?: unknown }).set === 'function') {
          (result as { set(value: number): void }).set(file.bytes.length);
        }
        return 0;
      },
      [REFERENCE_PARAMETERS]: { length: [0] },
      seek: (offset: unknown, whence: unknown) => {
        const from = Number(whence) === (this.definition.constants.SEEK_CUR ?? 1) ? file.position
          : Number(whence) === (this.definition.constants.SEEK_END ?? 2) ? file.bytes.length : 0;
        file.position = Math.max(0, from + Number(offset));
        return 0;
      },
    };
    this.imageFile = file;
    this.softwarePart = image.software;
    this.lastImageError = undefined;
  }

  /**
   * get_default_card_software, with the hook MAME hands it: the image file,
   * unless the image is a software part, whose `slot` feature
   * software_get_default_slot answers instead.
   */
  private defaultCardSoftware(): string | undefined {
    if (!this.methods.has('get_default_card_software')) return undefined;
    const hook = {
      image_file: () => this.imageFile && !this.softwarePart ? this.imageFile : 0,
      is_filetype: (candidate: unknown) => (this.imageFile?.filetype ?? '') === String(candidate).toLowerCase() ? 1 : 0,
    };
    // MAME hands the chooser a file of its own: call_load still reads from the start.
    const position = this.imageFile?.position ?? 0;
    if (this.imageFile) this.imageFile.position = 0;
    try {
      const card = this.invoke('get_default_card_software', hook);
      return typeof card === 'string' && card ? card : undefined;
    } finally {
      if (this.imageFile) this.imageFile.position = position;
    }
  }

  private loadOpenImage(): void {
    const image = this.imageFile;
    if (!image || !this.methods.has('call_load')) return;
    const result = this.invoke('call_load');
    const error = Array.isArray(result) ? Number(result[0]) || 0 : 0;
    if (error) {
      const message = Array.isArray(result) && result[1] ? String(result[1]) : `image_error ${error}`;
      this.lastImageError = `${this.definition.type}: could not load ${image.name}: ${message}`;
      console.warn(this.lastImageError);
    }
  }

  /**
   * MAME's device_image_interface file calls (emu/diimage.h) over the bytes
   * the host mounted: what a load routine reads its image with. They are the
   * framework's, not the device's, so the host answers them, as it answers
   * machine() and timer_alloc. The C64's quickload is the device that needs
   * them: its driver callback, handed the device as `image`, reads a .prg's
   * load address with `image.fread(&address, 2)` and the rest into RAM.
   */
  private hostImageFile(self: Record<string, unknown>): void {
    const file = () => {
      // check_for_file(): MAME stops with a fatal error on an unmounted image.
      if (!this.imageFile) throw new Error(`${this.definition.type}: illegal operation on unmounted image`);
      return this.imageFile;
    };
    const seekCurrent = this.definition.constants.SEEK_CUR ?? 1;
    const seekEnd = this.definition.constants.SEEK_END ?? 2;
    const surface: Record<string, (...args: unknown[]) => unknown> = {
      exists: () => this.imageFile ? 1 : 0,
      is_open: () => this.imageFile ? 1 : 0,
      // device_image_interface's own default; only a machine's internal
      // socket says set_user_loadable(false). The generic cartridge slot
      // reads a user-loaded ROM, not its region, on this answer.
      user_loadable: () => 1,
      filename: () => this.imageFile?.name ?? 0,
      basename: () => this.imageFile?.name ?? 0,
      basename_noext: () => this.imageFile?.name.replace(/\.[^.]*$/, '') ?? 0,
      filetype: () => this.imageFile?.filetype ?? '',
      // util::streqlower: the extension, without regard to case.
      is_filetype: candidate => (this.imageFile?.filetype ?? '') === String(candidate).toLowerCase() ? 1 : 0,
      check_for_file: () => { file(); return 0; },
      length: () => file().bytes.length,
      ftell: () => file().position,
      fseek: (offset, whence) => {
        const image = file();
        const origin = Number(whence) === seekCurrent ? image.position
          : Number(whence) === seekEnd ? image.bytes.length : 0;
        image.position = Math.max(0, origin + Number(offset));
        return 0;
      },
      fread: (buffer, length) => {
        const image = file();
        const count = Math.max(0, Math.min(Number(length) >>> 0, image.bytes.length - image.position));
        copyGeneratedBytes(buffer, image.bytes.subarray(image.position, image.position + count), count);
        image.position += count;
        return count;
      },
      // A battery the host keeps no file for. MAME's battery_load then fills the
      // buffer from its third argument, a byte or a default image -- the NES
      // loader's `default_nvram`, the list's `bwram` with zeroed mapper RAM
      // behind it -- and every MMC5 battery cartridge reaches it from
      // call_load_pcb before it can boot.
      battery_load: (buffer, length, fill) => {
        const count = Math.max(0, Number(length) >>> 0);
        copyGeneratedBytes(buffer, typeof fill === 'number' ? new Uint8Array(count).fill(fill & 0xff) : fill, count);
        return 0;
      },
      // The machine's write-back on unload: nothing keeps a cartridge's battery
      // between sessions yet, so what it held lasts while the cartridge is in.
      battery_save: () => 0,
      // The software-list half of the interface (diimage.h), over the part the
      // host mounted: the C64 expansion port asks for `roml` and `romh` by
      // name, and for its `exrom` and `game` lines as features.
      loaded_through_softlist: () => this.softwarePart ? 1 : 0,
      get_software_region_length: tag => this.softwarePart?.areas[String(tag)]?.length ?? 0,
      get_software_region: tag => this.softwarePart?.areas[String(tag)] ?? 0,
      load_software_region: (tag, pointer) => {
        // `ptr = make_unique_clear<u8[]>(size); memcpy(...)`, and only for an
        // area the part has: an absent one leaves the pointer as it was.
        const area = this.softwarePart?.areas[String(tag)];
        if (area?.length && pointer && typeof (pointer as { set?: unknown }).set === 'function') {
          (pointer as { set(value: unknown): void }).set(area.slice());
        }
        return 0;
      },
      // A feature the part does not have is nullptr.
      get_feature: name => this.softwarePart?.features[String(name)] ?? 0,
      // The card a software part names, else the slot's own default.
      software_get_default_slot: fallback => this.softwarePart?.features.slot || String(fallback ?? ''),
      // util::core_file over the mounted bytes, read from where fread left it.
      image_core_file: () => file(),
      // util::read: `read(file, length)` answers (error, buffer, actual), and
      // `read(file, buffer, length)` (error, actual).
      read: (_core, ...rest) => {
        const image = file();
        const length = Number(rest.at(-1)) >>> 0;
        const count = Math.max(0, Math.min(length, image.bytes.length - image.position));
        const read = image.bytes.slice(image.position, image.position + count);
        image.position += count;
        if (rest.length < 2) return [0, read, count];
        copyGeneratedBytes(rest[0], read, count);
        return [0, count];
      },
      // How snapquik.cpp reports a load its callback refused: the format
      // string and its arguments, kept for the host to show.
      osd_printf_error: (format, ...args) => {
        const message = String(format).replace(/%(?:(\d+)\$)?[-+ #0]*\d*(?:\.\d+)?[sdux]/g, (_match, position: string | undefined) => {
          const value = position ? args[Number(position) - 1] : args.shift();
          return String(value ?? '');
        }).trim();
        this.lastImageError = message;
        console.warn(message);
        return 0;
      },
    };
    // The interpreter hands these their arguments as written -- a string
    // stays a string, and `load_software_region`'s `std::unique_ptr<u8[]> &`
    // arrives as the l-value it writes -- when they are reference calls with
    // MAME's own parameter lists.
    const parameters: Record<string, string> = {
      is_filetype: 'std::string_view candidate_filetype',
      get_software_region_length: 'std::string_view tag',
      get_software_region: 'std::string_view tag',
      load_software_region: 'std::string_view tag, std::unique_ptr<u8[]> &ptr',
      get_feature: 'std::string_view feature_name',
      software_get_default_slot: 'const char *default_card_slot',
    };
    Object.assign(this.hostedSurface, surface);
    for (const [name, call] of Object.entries(surface)) {
      if (typeof self[name] !== 'function') self[name] = call;
      // The device's own method, or the host's answer to the name, stays:
      // the board tells every cartridge slot `exists()` is 1, and the NES
      // slot's pcb_start sets its banks up only for a mounted cartridge.
      if (this.methods.has(name) || this.bindings.calls![name]) continue;
      this.bindings.calls![name] = call as (...args: number[]) => number;
      this.bindings.referenceCalls![name] ??= call;
      if (parameters[name]) this.bindings.callParameters![name] ??= splitParameters(parameters[name]!);
    }
    this.bindings.calls!.tag ??= self.tag as () => number;
  }

  /**
   * What device_image_interface answers a cassette about its tape: that one
   * is in, and the cassette_image it was mounted as (`get_image()`), which the
   * cassette's own stream reads so a load is heard.
   */
  private hostCassetteImage(): void {
    const surface: Record<string, (...args: unknown[]) => unknown> = {
      exists: () => this.members.m_cassette ? 1 : 0,
      get_image: () => this.members.m_cassette ?? 0,
    };
    Object.assign(this.hostedSurface, surface);
    for (const [name, call] of Object.entries(surface)) {
      if (this.methods.has(name) || this.bindings.calls![name]) continue;
      this.bindings.calls![name] = call as (...args: number[]) => number;
      this.bindings.referenceCalls![name] ??= call;
    }
  }

  /**
   * What device_image_interface answers a drive about the disk in it: that
   * one is in, the list part's features, and whether it is read-only. A
   * visitor's disk is theirs, so it opens read-write as a writable file does
   * in MAME, and only `make_readonly` -- call_load's answer to a list's
   * `write_protected` feature -- protects it.
   */
  private hostFloppyImage(): void {
    const surface: Record<string, (...args: unknown[]) => unknown> = {
      exists: () => this.members.m_image ? 1 : 0,
      // A feature the part does not have is nullptr.
      get_feature: name => this.softwarePart?.features[String(name)] ?? 0,
      make_readonly: () => { this.imageReadOnly = true; return 0; },
      is_readonly: () => this.imageReadOnly ? 1 : 0,
    };
    Object.assign(this.hostedSurface, surface);
    for (const [name, call] of Object.entries(surface)) {
      if (this.methods.has(name) || this.bindings.calls![name]) continue;
      this.bindings.calls![name] = call as (...args: number[]) => number;
      this.bindings.referenceCalls![name] ??= call;
    }
    this.bindings.callParameters!.get_feature ??= splitParameters('std::string_view feature_name');
  }

  /**
   * A disk, the way floppy_image_device::call_load takes one: every format the
   * connector registered identifies the bytes, a matching extension adds
   * FIFID_EXT, the best scorer loads a floppy_image of the drive's geometry,
   * and the drive's own load path (`mount_image`) takes it from there. The
   * bytes are the host's random_read; the formats and the track store are
   * MAME's, compiled. `features` are the list part's, when it came from one.
   */
  private mountFloppy(extension: string, bytes: Uint8Array, features?: Readonly<Record<string, string>>): void {
    const io = { bytes, length: () => bytes.length };
    const formFactor = Number(this.members.m_form_factor) >>> 0;
    const variants = this.members.m_variants ?? [];
    let best: { score: number; decoder: IrDevice; name: string } | undefined;
    for (const format of this.definition.floppyFormats ?? []) {
      const decoder = new IrDevice(format.definition, 0);
      let score = Number(decoder.invoke('identify', io, formFactor, variants)) || 0;
      if (score && format.extensions.includes(extension.toLowerCase())) score |= decoder.constant('FIFID_EXT') ?? 0;
      if (!best || score > best.score) best = { score, decoder, name: format.name };
    }
    if (!best?.score || !this.definition.floppyImage) throw new Error('Unable to identify image file format');
    const image = new IrDevice(this.definition.floppyImage, 0, {
      constructorArgs: [Number(this.members.m_tracks), Number(this.members.m_sides), formFactor],
    });
    if (!Number(best.decoder.invoke('load', io, formFactor, variants, image.instance()))) {
      throw new Error('Incompatible image file format or corrupted data');
    }
    if (this.members.m_image) this.invoke('unmount_image');
    // A new image is a new file: device_image_interface::clear() forgets
    // the last one's read-only flag and part.
    this.imageReadOnly = false;
    this.softwarePart = features ? { areas: {}, features: { ...features } } : undefined;
    // The format stands for itself by name: what the drive keeps of it is
    // only whether there is one a written disk could be saved back in.
    this.invoke('mount_image', stateValue(heldInstanceName(this.definition.floppyImage), image.instance() as object), best.name);
  }

  /** Take the disk out (floppy_image_device::call_unload). */
  unmountImage(): void {
    if (this.methods.has('unmount_image')) this.invoke('unmount_image');
  }

  mountImage(extension: string, bytes: Uint8Array, name?: string, features?: Readonly<Record<string, string>>): void {
    if (this.definition.floppyFormats) {
      this.mountFloppy(extension, bytes, features);
      return;
    }
    if (this.readsOwnFile()) {
      if (this.imageFile && this.methods.has('call_unload')) this.invoke('call_unload');
      this.loadImage({ name: name ?? `image.${extension}`, bytes });
      return;
    }
    // Only the machine's own format list, when it chose one (`set_formats`).
    const chosen = this.members.m_formats;
    const format = this.definition.imageFormats?.find(candidate =>
      candidate.extension === extension.toLowerCase() &&
      (!candidate.list || typeof chosen !== 'string' || candidate.list === chosen));
    if (!format) throw new Error(`${this.definition.type}: unsupported image extension ${extension}`);
    const decoder = new IrDevice(format.definition, 0);
    if ('loadMethod' in format) {
      // cassette_image::open_choices: the format's identify fills the options
      // the image takes its channels and frequency from, then its load reads
      // the samples out of the file (wavfile.cpp).
      const image = cassetteImage(bytes);
      const options = { channels: 0, bits_per_sample: 0, sample_frequency: 0 };
      const success = format.definition.constants.SUCCESS ?? 0;
      if (Number(decoder.invoke(format.identifyMethod, image as never, options as never)) !== success) {
        throw new Error(`not a ${extension} cassette image MAME reads`);
      }
      image.open(options);
      if (Number(decoder.invoke(format.loadMethod, image as never)) !== success) {
        throw new Error(`the ${extension} cassette image did not load`);
      }
      this.invoke(format.mountMethod, image as never);
      return;
    }
    const count = Number(decoder.invoke(format.sizeMethod, bytes, bytes.length));
    if (!Number.isSafeInteger(count) || count <= 0) throw new Error('image decoder returned no valid samples');
    const pcm = new Int16Array(count);
    // MAME's legacy_construct hands fill_wave the image's length with its
    // bytes (a TAP's filler walks the blocks by it).
    const written = decoder.invoke(format.fillMethod, pcm, count, bytes, bytes.length);
    if (written !== count) throw new Error('image decoder sample count changed during decoding');
    const image = cassetteImage(bytes);
    image.fromPcm(pcm, format.sampleRate);
    this.invoke(format.mountMethod, image as never);
  }

  links(): readonly GeneratedDeviceLink[] {
    return this.definition.links ?? [];
  }

  invokeSlot(name: string, ...args: GeneratedCallArgument[]): unknown {
    if (!this.slotChild) throw new Error(`${this.definition.type} has no selected slot card`);
    return this.slotChild.preparedCall(name)(...args);
  }

  /**
   * Run the mounted card's own installer against `space`.
   *
   * MAME's two cartridge buses ask for this differently, and the slot's IR
   * says which: the Atari 2600's interface takes the space as an argument,
   * while a Game Boy PCB's `load(message)` reaches for it through
   * `cart_space()`. Binding the accessor for the duration covers both without
   * the host needing to know which bus it is holding.
   */
  installSlotCard(space: unknown): void {
    const install = this.definition.slot?.install ??
      { method: 'install_memory_handlers' as const, space: undefined };
    if (!this.slotChild) throw new Error(`${this.definition.type} has no selected slot card`);
    if (!install.space) {
      this.slotChild.invoke(install.method, space as GeneratedCallArgument);
      return;
    }
    this.slotChild.installSpace = space;
    try {
      this.slotChild.invoke(install.method, 0);
    } finally {
      this.slotChild.installSpace = undefined;
    }
    // MAME resets after mounting an image -- a cartridge slot's
    // `is_reset_on_load()` is true -- and a PCB's power-on bank positions are
    // set by its own device_reset. Run at construction, before the card had
    // configured any banks, that reset selected entries on banks that did not
    // exist yet: an MBC1 came up with both ROM windows on page 0 instead of
    // pages 0 and 1, so every cartridge larger than 32 KiB read its first page
    // twice.
    this.slotChild.reset();
  }

  private executeMethod(
    method: DeviceMethod,
    parameterNames: string[],
    args: GeneratedCallArgument[],
  ): unknown {
    try {
      if (
        this.latch8 &&
        method.name === 'write'
      ) {
        // generic_latch_8_device defers the store with
        // scheduler().synchronize(sync_callback, data): the writer's slice
        // ends, every processor behind it catches up to the write, and only
        // then does the reader see the byte. Applied inline, a reader that
        // runs later in the same round sees the command before the time it
        // was sent: Marble Madness's sound board answered 13 main-CPU
        // instructions away from where MAME's does.
        const data = args[0] ?? 0;
        const schedule = this.bindings.schedule;
        if (!schedule) return this.invoke('sync_callback', data);
        schedule(() => void this.invoke('sync_callback', data));
        return 0;
      }
      const defaults = this.methodDefaults.get(method);
      const compiled = this.definition.compiledMethods?.[method.name];
      // A `&` parameter always arrives as a get/set wrapper, because the caller
      // cannot know whether the callee reassigns it. Only methods that do NOT
      // reassign one reach this map (the emitter keeps the others out of it,
      // since their ABI is one an emitted caller satisfies directly), so an
      // emitted method here wants the referent — the same unwrapping the
      // board's compiled-handler path performs. Without it the NES PPU's
      // emitted draw_tile_pixel wrote through `u32*& dest` as if the wrapper
      // itself were the pointer, and one background tile threw.
      if (compiled) {
        if (parameterNames.length === 0) return compiled(this.executionContext);
        return compiled(
          this.executionContext,
          ...parameterNames.map((_name, index) =>
            generatedReferent(args[index] ?? defaults?.[index] ?? 0) as GeneratedCallArgument),
        );
      }
      const locals: Record<string, unknown> = {};
      for (let index = 0; index < parameterNames.length; index++) {
        locals[parameterNames[index]!] = args[index] ?? defaults?.[index] ?? 0;
      }
      const value = executeGeneratedProgram(method.program, this.bindings, locals).value;
      // C++ converts the result to the declared return type, as emitted code does.
      return method.returnWidth && typeof value === 'number' ? generatedFieldWidth(value, method.returnWidth) : value;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`${this.definition.type}.${method.name}: ${message}`, { cause: error });
    }
  }

  private selectMethod(
    name: string,
    args: GeneratedCallArgument[],
  ): DeviceMethod | undefined {
    const overloads = this.methods.get(name);
    if (!overloads?.length) return undefined;
    if (overloads.length === 1 && this.methodParams.get(overloads[0]!)?.length === args.length) return overloads[0];
    const exact = overloads.filter(method =>
      (this.methodParams.get(method) ?? splitParameters(method.parameters)).length === args.length);
    if (exact.length) return exact.at(-1);
    return overloads
      .filter(method => {
        const parameters = this.methodParams.get(method) ?? splitParameters(method.parameters);
        const defaults = this.methodDefaults.get(method) ??
          parameters.map(parameterDefault);
        return parameters.length >= args.length &&
          defaults.slice(args.length).every(value => value !== undefined);
      })
      .sort((left, right) =>
        splitParameters(left.parameters).length - splitParameters(right.parameters).length)
      .at(0) ?? overloads.at(-1);
  }
}

class IrMemoryBank implements GeneratedMemoryBank {
  private source: ArrayLike<number> = new Uint8Array(0);
  private stride = 1;
  private entry = 0;
  /** Per-entry bases, for a bank configured one entry at a time. */
  private readonly bases = new Map<number, number>();

  configure_entries(_start: number, _count: number, source: unknown, stride: number): void {
    const bytes = asBankBytes(source);
    if (bytes) this.source = bytes.source;
    this.stride = Math.max(1, stride | 0);
    this.bases.clear();
  }

  /**
   * MAME `memory_bank::configure_entry(entry, base)`: one entry pointed at one
   * place, rather than a whole run at a fixed stride. The Game Boy's MBCs use
   * this form exclusively -- a ROM smaller than its bank count is mapped by
   * folding pages onto entries, which no single stride describes.
   */
  configure_entry(entry: number, base: unknown): void {
    const bytes = asBankBytes(base);
    if (!bytes) return;
    this.source = bytes.source;
    this.bases.set(Math.max(0, entry | 0), bytes.offset);
  }

  set_entry(entry: number): void {
    this.entry = Math.max(0, entry | 0);
  }

  /** Save-state roots (machine-state.ts): the selection; the source is a region or share. */
  stateKeys(): readonly string[] {
    return ['entry', 'bases', 'stride'];
  }

  /** MAME `memory_bank::base()`: the bytes the selected entry starts at. */
  base(): GeneratedPointer {
    return { generatedPointer: true, source: this.source as GeneratedPointer['source'], offset: this.offset() };
  }

  read(offset: number): number {
    return this.source[this.offset() + offset] ?? 0xff;
  }

  write(offset: number, value: number): void {
    const target = this.source as { [index: number]: number };
    const index = this.offset() + offset;
    if (index >= 0 && index < this.source.length) target[index] = value & 0xff;
  }

  private offset(): number {
    return this.bases.get(this.entry) ?? this.entry * this.stride;
  }
}

/** A bank base, whether it arrived as bytes or as a pointer part-way in. */
function asBankBytes(
  value: unknown,
): { source: ArrayLike<number>; offset: number } | undefined {
  if (ArrayBuffer.isView(value) || Array.isArray(value)) {
    return { source: value as ArrayLike<number>, offset: 0 };
  }
  if (isGeneratedPointer(value)) return { source: value.source, offset: value.offset };
  return undefined;
}

function integerArray(length: number, bits: number | undefined, signed: boolean | undefined): number[] | ArrayLike<number> {
  if (bits === 8) return signed ? new Int8Array(length) : new Uint8Array(length);
  if (bits === 16) return signed ? new Int16Array(length) : new Uint16Array(length);
  if (bits === 32) return signed ? new Int32Array(length) : new Uint32Array(length);
  return Array(length).fill(0);
}

function resolveDeviceResource(
  resource: DeviceResource,
  options: GeneratedDeviceOptions,
): unknown {
  if (resource.kind === 'owner') return options.owner ?? 0;
  if (resource.kind === 'sample-image') {
    const bytes = options.regions?.[resource.region];
    if (!bytes?.length) return 0;
    const image = cassetteImage();
    image.fromPcm(new Int16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2)), resource.sampleRate);
    return image;
  }
  if (resource.kind === 'number') return resource.value;
  const regions = options.regions ?? {};
  const resourceName = 'name' in resource ? resource.name : '';
  // A finder resolves `*this, "prom"` as the device's own subtag first
  // (Battlezone's AVG state PROM is region "avg:prom"), as MAME does.
  // A device built inside another carries its full tag as deviceTag.
  const own = options.deviceTag && regions[`${options.deviceTag}:${resourceName}`] ? options.deviceTag : options.tag;
  const subtag = own && resourceName !== 'self' ? `${own}:${resourceName}` : undefined;
  const regionName = resourceName === 'self'
    ? options.tag ?? ''
    : subtag && regions[subtag] ? subtag : resourceName;
  if (resource.kind === 'region') return regions[regionName] ?? new Uint8Array(0);
  // MAME's `memory_region *`. A device that is handed one asks it three
  // questions -- how big, where does it start, give me the bytes -- and a
  // missing region answers as a null pointer does, which is what lets a
  // cartridge with no save RAM take MAME's own "no NVRAM" branch.
  if (resource.kind === 'region-object') {
    const bytes = regions[regionName];
    if (!bytes?.length) return 0;
    return {
      bytes: () => bytes.length,
      base: () => bytes,
      as_u8: () => bytes,
    };
  }
  if (resource.kind === 'region-pointer') {
    // MAME's `get_rom_base() + N`: the same bytes, addressed from an offset.
    return {
      generatedPointer: true,
      source: regions[regionName] ?? new Uint8Array(0),
      offset: resource.offset,
    };
  }
  if (resource.kind === 'region-length') return regions[regionName]?.length ?? 0;
  if (resource.kind === 'region-pages') {
    return Math.floor((regions[regionName]?.length ?? 0) / Math.max(1, resource.bytes));
  }
  if (resource.kind === 'region-page-mask') {
    const pages = Math.floor((regions[regionName]?.length ?? 0) / Math.max(1, resource.bytes));
    return Math.max(0, pages - 1);
  }
  if (resource.kind === 'missing-region-number') {
    return regions[resource.name]?.length ? resource.present : resource.missing;
  }
  if (resource.kind === 'config-map') {
    const value = resource.path.split('.').reduce<unknown>(
      (current, key) => current && typeof current === 'object'
        ? (current as Record<string, unknown>)[key]
        : undefined,
      options.configuration,
    );
    return resource.values[String(value)] ?? resource.fallback ?? 0;
  }
  if (resource.kind === 'memory') {
    const region = resource.region === 'self' ? options.tag ?? '' : resource.region;
    if (region && regions[region]?.length) return regions[region];
    const bytes = resource.onlyWhenRegionMissing && regions[resource.onlyWhenRegionMissing]?.length
      ? 0
      : resource.bytes;
    const key = `memory:${resource.name}:${bytes}`;
    return (options.resourceCache ??= {})[key] ??=
      new Uint8Array(Math.max(0, bytes)).fill(resource.fill ?? 0);
  }
  const banks = options.banks ??= {};
  const result = Array.from({ length: resource.count }, (_unused, index) => {
    const key = `${resource.name}${index}`;
    return banks[key] ??= new IrMemoryBank();
  });
  return result;
}

/**
 * A MAME bitmap value used by generated device methods.
 *
 * MAME names the pixel format in the type -- `bitmap_rgb32`, `bitmap_ind16`,
 * `bitmap_ind8` -- and a device that composes its picture in an indexed format
 * before resolving pens needs the narrower store, not a 32-bit one. The TIA
 * composites two `bitmap_ind16` scanline buffers and diffs them into a
 * `bitmap_rgb32`, so both widths have to be real.
 */
class GeneratedBitmap {
  pixels: Uint32Array | Uint16Array | Uint8Array;
  private bitmapWidth = 0;
  private bitmapHeight = 0;
  private readonly storage: Uint32ArrayConstructor | Uint16ArrayConstructor | Uint8ArrayConstructor;

  constructor(valueType: string) {
    this.storage = /_ind8$/.test(valueType)
      ? Uint8Array
      : /_ind16$/.test(valueType)
        ? Uint16Array
        : Uint32Array;
    this.pixels = new this.storage(0);
  }

  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] {
    return ['bitmapWidth', 'bitmapHeight', 'pixels'];
  }

  stateResizable(): readonly string[] {
    return ['pixels'];
  }

  allocate(width: number, height: number): void {
    this.bitmapWidth = Math.max(0, width | 0);
    this.bitmapHeight = Math.max(0, height | 0);
    this.pixels = new this.storage(this.bitmapWidth * this.bitmapHeight);
  }

  width(): number {
    return this.bitmapWidth;
  }

  height(): number {
    return this.bitmapHeight;
  }

  /** MAME bitmap_t::plot_box, clipped to this bitmap's bounds. */
  plot_box(x: number, y: number, width: number, height: number, color: number): void {
    const left = Math.max(0, x), right = Math.min(this.bitmapWidth, x + width);
    const top = Math.max(0, y), bottom = Math.min(this.bitmapHeight, y + height);
    if (right <= left || bottom <= top) return;
    const pixels = this.pixels;
    for (let row = top; row < bottom; row++) {
      const start = row * this.bitmapWidth;
      // The VIC-II paints its border eight pixels at a time, every cycle; a
      // `fill` call costs more than storing a run that short.
      if (right - left <= 16) {
        for (let index = start + left, end = start + right; index < end; index++) pixels[index] = color;
      } else {
        pixels.fill(color, start + left, start + right);
      }
    }
  }

  pix(y: number, x = 0): number {
    return this.pixels[y * this.bitmapWidth + x] ?? 0;
  }

  'pix='(y: number, x: number, value: number): void {
    const index = y * this.bitmapWidth + x;
    if (index >= 0 && index < this.pixels.length) this.pixels[index] = value >>> 0;
  }

  'pix&'(y: number, x = 0): {
    generatedPointer: true;
    source: Uint32Array | Uint16Array | Uint8Array;
    offset: number;
  } {
    return {
      generatedPointer: true,
      source: this.pixels,
      offset: y * this.bitmapWidth + x,
    };
  }
}

interface GeneratedBitmapClip {
  min_x: number; max_x: number; min_y: number; max_y: number;
}

interface GeneratedDirectBitmap {
  pixels: Uint32Array;
  width: number;
  height: number;
  xScale: number;
  yScale: number;
  scaledXOffset: number;
  scaledYOffset: number;
}

/**
 * MAME's copybitmap: `dest(x, y) = src(x - destX, y - destY)` over the clip.
 *
 * Both bitmaps are addressed in the screen's own raster coordinates, and the
 * source is normally the whole raster -- the TMS9928A's is 342 x 313 for a
 * 280 x 216 visible screen. Copying the backing arrays linearly therefore
 * shears the picture by the difference in stride once per line, which looks
 * like a correctly laid out screen made of scrambled pixels.
 */
function copyGeneratedBitmap(
  destination: unknown,
  source: unknown,
  destX: unknown = 0,
  destY: unknown = 0,
  clip?: unknown,
): void {
  if (!source || typeof source !== 'object' || !destination || typeof destination !== 'object') return;
  const bitmap = source as { pixels?: unknown; bitmapWidth?: number; bitmapHeight?: number };
  if (!ArrayBuffer.isView(bitmap.pixels)) return;
  const pixels = bitmap.pixels as Uint32Array;
  const sourceWidth = bitmap.bitmapWidth ?? 0;
  const sourceHeight = bitmap.bitmapHeight ?? 0;
  if (sourceWidth <= 0 || sourceHeight <= 0) return;

  const offsetX = Number(destX) || 0;
  const offsetY = Number(destY) || 0;
  const rectangle = clip && typeof clip === 'object' ? clip as GeneratedBitmapClip : undefined;
  // Absent a clip the whole source lands, placed where destX/destY put it.
  const minX = Math.max(rectangle?.min_x ?? offsetX, offsetX);
  const maxX = Math.min(rectangle?.max_x ?? offsetX + sourceWidth - 1, offsetX + sourceWidth - 1);
  const minY = Math.max(rectangle?.min_y ?? offsetY, offsetY);
  const maxY = Math.min(rectangle?.max_y ?? offsetY + sourceHeight - 1, offsetY + sourceHeight - 1);

  const direct = (destination as { direct?: GeneratedDirectBitmap }).direct;
  if (direct?.pixels && direct.xScale === 1 && direct.yScale === 1 && pixels instanceof Uint32Array &&
      Number.isInteger(minX) && Number.isInteger(minY) && Number.isInteger(offsetX) &&
      Number.isInteger(direct.scaledXOffset) && Number.isInteger(direct.scaledYOffset)) {
    // An unscaled screen is a row copy: the same clip as the general loop
    // below, without a division and a floor for every pixel of every frame.
    const left = Math.max(minX, direct.scaledXOffset);
    const right = Math.min(maxX, direct.scaledXOffset + direct.width - 1);
    if (right < left) return;
    for (let y = minY; y <= maxY; y++) {
      const visibleY = y - direct.scaledYOffset;
      if (visibleY < 0 || visibleY >= direct.height) continue;
      const row = (y - offsetY) * sourceWidth - offsetX;
      direct.pixels.set(
        pixels.subarray(row + left, row + right + 1),
        visibleY * direct.width + left - direct.scaledXOffset,
      );
    }
    return;
  }
  if (direct?.pixels) {
    for (let y = minY; y <= maxY; y++) {
      const row = (y - offsetY) * sourceWidth;
      const visibleY = Math.floor((y - direct.scaledYOffset) / direct.yScale);
      if (visibleY < 0 || visibleY >= direct.height) continue;
      const target = visibleY * direct.width;
      for (let x = minX; x <= maxX; x++) {
        const visibleX = Math.floor((x - direct.scaledXOffset) / direct.xScale);
        if (visibleX < 0 || visibleX >= direct.width) continue;
        direct.pixels[target + visibleX] = pixels[row + (x - offsetX)]! >>> 0;
      }
    }
    return;
  }

  const setPixel = (destination as Record<string, unknown>)['pix='];
  if (typeof setPixel !== 'function') return;
  const write = setPixel as (y: number, x: number, value: number) => void;
  for (let y = minY; y <= maxY; y++) {
    const row = (y - offsetY) * sourceWidth;
    for (let x = minX; x <= maxX; x++) write(y, x, pixels[row + (x - offsetX)]!);
  }
}

/**
 * Bind a MAME memory container member: a shared pointer aliases the board share
 * MAME's constructor names (DEVICE_SELF is the device's own tag), and an owned
 * vector starts empty for device_start to size.
 */
function memoryMember(
  member: DeviceMember,
  options: GeneratedDeviceOptions,
  structs?: Readonly<Record<string, readonly StructField[]>>,
): ArrayLike<unknown> {
  const memory = member.memory!;
  if (memory.kind === 'owned') return generatedMemoryArray(memory.elementBytes);
  if (memory.kind === 'growable') return generatedVector(vectorElement(memory.element, structs));
  const tag = (memory.share === 'self' ? options.tag : memory.share)
    ?.replace(/^\^+/, '')
    .replace(/^:/, '');
  const bytes = tag ? options.shares?.[tag] : undefined;
  if (!bytes && /^optional_shared_ptr\b/.test(member.valueType)) {
    return new Uint8Array(0);
  }
  if (!bytes) {
    throw new Error(
      `generated device memory share "${tag ?? memory.share}" is not available for ${member.name}`,
    );
  }
  return generatedMemoryArray(memory.elementBytes, bytes);
}

/** A memory container indexed in the element width declared by its C++ type. */
function generatedMemoryArray(
  elementBytes: number,
  bytes?: Uint8Array,
): Uint8Array | Uint16Array | Uint32Array {
  if (!bytes) {
    if (elementBytes === 2) return new Uint16Array(0);
    if (elementBytes === 4) return new Uint32Array(0);
    return new Uint8Array(0);
  }
  if (elementBytes === 2) {
    return new Uint16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2));
  }
  if (elementBytes === 4) {
    return new Uint32Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 4));
  }
  return bytes;
}

function splitParameters(parameters: string): string[] {
  // `(void)` is C's empty parameter list, not a parameter named `void`.
  if (parameters.trim() === 'void') return [];
  return parameters.split(',').map(parameter => parameter.trim()).filter(Boolean);
}

/**
 * Members MAME declares as a memory block rather than a scalar.
 *
 * These arrive with no size, no values and no initial, so they settled on the
 * scalar default of `0`. The interpreter hid that: its indexed-write path
 * allocates a backing array for any unset `m_` member on first use
 * (`writableIndexObject` in src/ir/execute.ts). A compiled method has no such
 * fallback — `writeIndex` only stores into something that is already an
 * object, so with `0` there it silently discarded every write.
 *
 * Venture (issue #63) is what that costs: the 6532's `m_ram` is the sound
 * 6502's zero page and stack. Once `ram_w` compiled, every push and every
 * zero-page store vanished, so the audio CPU could not run its service routine
 * and the board was silent — while `ram_r` stayed correct and hid the cause.
 * Allocating here keeps the two execution paths agreeing on one store. This
 * must stay *after* the `values` branch: i8257's `m_channel` is `channel[]`
 * with four initial structs, and claiming it first replaced them with an empty
 * array, so device_reset wrote through undefined and dkong stopped booting.
 */
function isIndexableMemberType(valueType: string | undefined): boolean {
  if (!valueType) return false;
  return /^(?:memory_share_creator|required_shared_ptr|optional_shared_ptr)\b/.test(valueType)
    || /\[\s*\d*\s*\]$/.test(valueType);
}

function parameterName(parameter: string): string {
  return /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter.replace(/=[\s\S]*$/, '')) ?.[1]
    ?? /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter)?.[1]
    ?? parameter;
}

/** A C++ default argument, when it is a plain numeric literal. */
function parameterDefault(parameter: string): number | undefined {
  return cppDefaultArgument(parameter);
}

/** MAME simple_list's intrusive container ABI; device behavior stays in IR. */
class IrSimpleList {
  private head: Record<string, unknown> | 0 = 0;
  private tail: Record<string, unknown> | 0 = 0;
  first(): unknown { return this.head; }
  append(value: Record<string, unknown>): unknown {
    value.m_next = 0;
    if (this.tail) this.tail.m_next = value;
    else this.head = value;
    this.tail = value;
    return value;
  }
  reset(): void { this.head = this.tail = 0; }
  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] { return ['head', 'tail']; }
}

function wrap(value: number, bits?: 1 | 8 | 16 | 32, signed = false): number {
  if (bits === 1) return value ? 1 : 0;
  if (bits === 8) return signed ? value << 24 >> 24 : value & 0xff;
  if (bits === 16) return signed ? value << 16 >> 16 : value & 0xffff;
  if (bits === 32) return signed ? value | 0 : value >>> 0;
  return value;
}

/**
 * One of MAME's `address_space`s, as a generated device reaches it.
 *
 * Only flat-RAM spaces are recorded by the device compiler, so the whole
 * space is one buffer and the address wraps at the declared width -- which is
 * what MAME's address mask does for a space whose map covers its full range.
 */
export interface GeneratedDeviceSpace {
  read_byte(address: number): number;
  write_byte(address: number, data: number): number;
  /** The backing bytes, for board wiring and for reading state back in tests. */
  readonly memory: Uint8Array;
}

/**
 * MAME's cassette_image (lib/formats/cassimg.cpp) as the host keeps it: each
 * channel's samples as int32 at the image's own frequency. A format fills it
 * the way cassimg.cpp lets one -- a legacy wave filler's 16-bit PCM in one
 * put_samples (cbm_tap.cpp), or `read_samples` over the file's own bytes
 * (wavfile.cpp) -- and the cassette device reads it with `get_sample`, at the
 * sample compute_manipulation_ranges rounds the time to. The file is the
 * host's, as in MAME, where a save state does not carry the media: the store
 * is closures only, which the state walker passes over.
 */
function cassetteImage(file?: Uint8Array) {
  let channels = 1;
  let frequency = 0;
  let count = 0;
  const store: Int32Array[] = [];
  // size_t(d + 0.5), of a non-negative time.
  const round = (value: number): number => Math.floor(value + 0.5);
  // map_double: `d` scaled by where `value` sits between `low` and `high`.
  const map = (d: number, low: number, high: number, value: number): number => d * (value - low) / (high - low);
  const channelStore = (channel: number, length: number): Int32Array => {
    let samples = store[channel];
    if (!samples || samples.length < length) {
      const grown = new Int32Array(Math.max(length, samples ? samples.length * 2 : 0));
      if (samples) grown.set(samples);
      store[channel] = samples = grown;
    }
    return samples;
  };
  /** cassette_image::put_samples over a byte buffer, `spacing` bytes a sample. */
  const putSamples = (channel: number, time: number, period: number, sampleCount: number,
    spacing: number, source: Uint8Array, sourceOffset: number, flags: number): void => {
    if (period === 0) return;
    const first = round(time * frequency);
    let last = round((time + period) * frequency);
    if (last > first) last--;
    if (count < last + 1) count = last + 1;
    const samples = channelStore(channel, last + 1);
    const bytesPerSample = 1 << ((flags & 0x06) / 2);
    const view = new DataView(source.buffer, source.byteOffset, source.byteLength);
    for (let index = first; index <= last; index++) {
      const at = sourceOffset + Math.floor(map(sampleCount, first, last + 1, index)) * spacing;
      // WAVEFORM_ENDIAN_FLIP: the opposite of the little-endian host.
      const little = (flags & 0x01) === 0;
      samples[index] = bytesPerSample === 1
        ? ((flags & 0x08 ? (source[at]! - 128) << 24 >> 24 : source[at]! << 24 >> 24) << 24)
        : bytesPerSample === 2
          ? view.getInt16(at, little) * 65536
          : view.getInt32(at, little);
    }
  };
  return {
    /** The 16-bit PCM a legacy wave filler made, at its frequency (legacy_construct). */
    fromPcm(pcm: Int16Array, sampleRate: number): void {
      channels = 1;
      frequency = sampleRate;
      count = pcm.length;
      const samples = channelStore(0, pcm.length);
      for (let index = 0; index < pcm.length; index++) samples[index] = pcm[index]! * 65536;
    },
    /** What cassette_image::open takes from the format's identify. */
    open(options: { channels: number; sample_frequency: number }): void {
      channels = Number(options.channels) || 1;
      frequency = Number(options.sample_frequency) >>> 0;
    },
    image_size: () => file?.length ?? 0,
    image_read: (buffer: unknown, offset: number, length: number) => {
      // read_at: a short read leaves the rest of the buffer as it was.
      const start = Math.min(Number(offset), file?.length ?? 0);
      const bytes = file?.subarray(start, Math.min(start + Number(length), file.length)) ?? new Uint8Array(0);
      copyGeneratedBytes(buffer, bytes, bytes.length);
      return 0;
    },
    read_samples: (channelCount: number, time: number, period: number, sampleCount: number,
      offset: number, flags: number) => {
      const bytesPerSample = 1 << ((flags & 0x06) / 2);
      const spacing = bytesPerSample * channelCount;
      const buffer = new Uint8Array(8192);
      let loaded = 0;
      let at = Number(offset);
      while (loaded < sampleCount) {
        const chunk = Math.min(Math.floor(buffer.length / spacing), sampleCount - loaded);
        const chunkPeriod = map(period, 0, sampleCount, chunk);
        const chunkTime = time + map(period, 0, sampleCount, loaded);
        const start = Math.min(at, file?.length ?? 0);
        const bytes = file?.subarray(start, Math.min(start + chunk * spacing, file.length)) ?? new Uint8Array(0);
        buffer.set(bytes);
        for (let channel = 0; channel < channelCount; channel++) {
          putSamples(channel, chunkTime, chunkPeriod, chunk, spacing, buffer, channel * bytesPerSample, flags);
        }
        at += chunk * spacing;
        loaded += chunk;
      }
      return 0;
    },
    get_info: () => ({ channels, bits_per_sample: 16, sample_count: count, sample_frequency: frequency }),
    get_sample: (channel: number, time: number, _period: number, output: unknown) => {
      // get_samples for one sample: the first of the range
      // compute_manipulation_ranges makes, whatever the period.
      const index = round(time * frequency);
      const from = channel < 0 ? 0 : channel;
      const to = channel < 0 ? channels - 1 : channel;
      let sum = 0;
      for (let at = from; at <= to; at++) sum += store[at]?.[index] ?? 0;
      generatedPointerStore(output, Math.trunc(sum / (to - from + 1)));
      return 0;
    },
    /**
     * cassette_image::get_samples: `sampleCount` samples spread over the range
     * compute_manipulation_ranges makes, narrowed as interpolate16/8 narrow
     * them, `spacing` bytes apart. The cassette's own stream reads a tape
     * this way, so a load is heard through the speakers it is routed to.
     */
    get_samples: (channel: number, time: number, period: number, sampleCount: number,
      spacing: number, output: unknown, flags: number) => {
      const first = round(Number(time) * frequency);
      let last = round((Number(time) + Number(period)) * frequency);
      if (last > first) last--;
      const from = channel < 0 ? 0 : channel;
      const to = channel < 0 ? channels - 1 : channel;
      const bytesPerSample = 1 << ((Number(flags) & 0x06) / 2);
      const stride = Math.max(1, Math.round(Number(spacing) / bytesPerSample));
      for (let index = 0; index < sampleCount; index++) {
        const at = Math.floor(map(last + 1 - first, 0, sampleCount, index) + first);
        let sum = 0;
        for (let source = from; source <= to; source++) sum += store[source]?.[at] ?? 0;
        sum = Math.trunc(sum / (to - from + 1));
        const value = bytesPerSample === 1 ? sum >> 24 : bytesPerSample === 2 ? sum >> 16 : sum;
        generatedPointerStore(generatedAdd(output, index * stride), value);
      }
      return 0;
    },
    put_sample: () => { throw new Error('mounted sample image is read-only'); },
  };
}

/**
 * A space MAME fills from an address map rather than backing with RAM. The
 * device's own map method is run against a builder that records each
 * `map(start, end)` entry and what it is wired to -- a handler, a lambda, RAM,
 * a region -- and the space then decodes every address to the last entry that
 * covers it, as MAME's later map lines override earlier ones.
 */
function mappedDeviceSpace(
  device: IrDevice,
  addressBits: number,
  mapMethod: string,
  region: (tag: string) => Uint8Array | undefined,
): GeneratedDeviceSpace {
  const size = 1 << addressBits;
  const mask = size - 1;
  const memory = new Uint8Array(size);
  type Entry = {
    start: number;
    end: number;
    read?: (offset: number, data?: number) => number;
    write?: (offset: number, data: number) => void;
    storage?: Uint8Array;
    storageOffset?: number;
  };
  const entries: Entry[] = [];
  let unmapped = 0;
  // A handler reference or a lambda, called with the arguments it declares.
  const callable = (target: unknown, writing: boolean): ((offset: number, data?: number) => number) | undefined => {
    if (typeof target === 'function') {
      const declared = (target as { declaredParameters?: number }).declaredParameters ?? target.length;
      const fn = target as (...args: number[]) => unknown;
      return writing
        ? (offset, data = 0) => Number(declared >= 2 ? fn(offset, data) : fn(data)) || 0
        : offset => Number(declared >= 1 ? fn(offset) : fn()) || 0;
    }
    // A template handler is named by its evaluated arguments (`eprom_r<0x0080>`
    // is the compiled `eprom_r_128`), however the map spells them.
    const name = typeof target === 'object' && target && 'reference' in target
      ? String((target as { reference: unknown }).reference).split('::').at(-1)!
          .replace(/_(0x[0-9a-f]+|true|false)(?=_|$)/gi, (_all, value: string) =>
            `_${value === 'true' ? 1 : value === 'false' ? 0 : Number(value)}`)
      : undefined;
    if (!name || !device.methodNames().includes(name)) {
      throw new Error(`address map names ${String(name ?? target)}, which the device does not define`);
    }
    const declared = device.parameters(name).filter(parameter => parameter && parameter !== 'void').length;
    return writing
      ? (offset, data = 0) => Number(declared >= 2 ? device.call(name, offset, data) : device.call(name, data)) || 0
      : offset => Number(declared >= 1 ? device.call(name, offset) : device.call(name)) || 0;
  };
  const map = Object.assign((start: number, end: number) => {
    const entry: Entry = { start: Number(start) & mask, end: Number(end) & mask };
    entries.push(entry);
    const chain: Record<string, (...args: unknown[]) => unknown> = {
      r: handler => { entry.read = callable(handler, false); return chain; },
      w: handler => { entry.write = callable(handler, true); return chain; },
      rw: (read, write) => { entry.read = callable(read, false); entry.write = callable(write, true); return chain; },
      lr8: handler => chain.r!(handler),
      lw8: handler => chain.w!(handler),
      lrw8: (read, write) => chain.rw!(read, write),
      ram: () => { entry.storage = memory; entry.storageOffset = undefined; return chain; },
      rom: () => chain,
      region: (tag, offset) => {
        const bytes = region(String(tag));
        if (!bytes) throw new Error(`address map names region ${String(tag)}, which was not loaded`);
        entry.storage = bytes;
        entry.storageOffset = Number(offset) || 0;
        return chain;
      },
      nopr: () => { entry.read = () => unmapped; return chain; },
      nopw: () => { entry.write = () => 0; return chain; },
      noprw: () => { chain.nopr!(); return chain.nopw!(); },
      unmapr: () => chain.nopr!(),
      unmapw: () => chain.nopw!(),
      unmaprw: () => chain.noprw!(),
      mirror: () => chain,
      mask: () => chain,
    };
    return chain;
  }, {
    unmap_value_high: () => { unmapped = 0xff; return 0; },
    unmap_value_low: () => { unmapped = 0; return 0; },
    global_mask: () => 0,
  });
  device.call(mapMethod, map as unknown as number);
  const readAt = new Int32Array(size).fill(-1);
  const writeAt = new Int32Array(size).fill(-1);
  entries.forEach((entry, index) => {
    for (let address = entry.start; address <= entry.end; address++) {
      if (entry.read || entry.storage) readAt[address] = index;
      if (entry.write || entry.storage === memory) writeAt[address] = index;
    }
  });
  return {
    memory,
    read_byte: address => {
      const at = address & mask;
      const entry = entries[readAt[at]!];
      if (!entry) return unmapped;
      if (entry.read) return entry.read(at - entry.start) & 0xff;
      const storage = entry.storage!;
      return storage[entry.storageOffset === undefined ? at : entry.storageOffset + at - entry.start] ?? unmapped;
    },
    write_byte: (address, data) => {
      const at = address & mask;
      const entry = entries[writeAt[at]!];
      if (!entry) return 0;
      if (entry.write) entry.write(at - entry.start, data & 0xff);
      else entry.storage![at] = data & 0xff;
      return 0;
    },
  };
}

/**
 * MAME's PAIR union on a little-endian host: `b` the bytes low to high, `w`
 * the halves, `d` the word, and their signed readings. The word lives in a
 * typed array, so a save state carries it like any other register.
 */
function pairValue(): Record<string, unknown> {
  const word = new Uint32Array(1);
  const field = (shift: number, bits: number, signed: boolean) => ({
    get: () => {
      const value = (word[0]! >>> shift) & ((1 << bits) - 1);
      return signed && value & (1 << (bits - 1)) ? value - (1 << bits) : value;
    },
    set: (value: number) => {
      const mask = (((1 << bits) - 1) << shift) >>> 0;
      word[0] = ((word[0]! & ~mask) | ((Number(value) << shift) & mask)) >>> 0;
    },
    enumerable: true,
  });
  const lanes = (bits: number, names: string[], signed: boolean) =>
    Object.defineProperties({}, Object.fromEntries(names.map((name, index) => [name, field(index * bits, bits, signed)])));
  return Object.defineProperties({ word }, {
    d: { get: () => word[0]!, set: (value: number) => { word[0] = Number(value) >>> 0; }, enumerable: true },
    sd: { get: () => word[0]! | 0, set: (value: number) => { word[0] = Number(value) >>> 0; }, enumerable: true },
    b: { value: lanes(8, ['l', 'h', 'h2', 'h3'], false), enumerable: true },
    sb: { value: lanes(8, ['l', 'h', 'h2', 'h3'], true), enumerable: true },
    w: { value: lanes(16, ['l', 'h'], false), enumerable: true },
    sw: { value: lanes(16, ['l', 'h'], true), enumerable: true },
  });
}

function generatedDeviceSpace(addressBits: number): GeneratedDeviceSpace {
  const memory = new Uint8Array(1 << addressBits);
  const mask = memory.length - 1;
  return {
    memory,
    read_byte: address => memory[address & mask]!,
    write_byte: (address, data) => {
      memory[address & mask] = data & 0xff;
      return 0;
    },
  };
}

/**
 * The packing the generated runtime uses for a MAME `rgb_t`: alpha, then blue,
 * green and red down to the low byte. `rgb_t::r()` and friends read it back.
 */
function rgbPixel(red: number, green: number, blue: number): number {
  return ((0xff << 24) | ((blue & 0xff) << 16) | ((green & 0xff) << 8) | (red & 0xff)) >>> 0;
}

/**
 * What a growable vector of `element` grows by: another vector, a struct of
 * the device's own declared shape, or a zero.
 */
function vectorElement(
  element: string | undefined,
  structs: Readonly<Record<string, readonly StructField[]>> | undefined,
): (() => unknown) | undefined {
  if (!element) return undefined;
  const inner = /^std::vector<\s*(.+?)\s*>$/.exec(element);
  if (inner) return () => generatedVector(vectorElement(inner[1], structs));
  const fields = structs?.[element.split('::').at(-1)!.trim()];
  return fields ? () => structMember(fields, structs, element) : undefined;
}

/** A plain-old-data struct member, with each declared field present. */
/**
 * A C struct instance whose scalar fields keep their declared width.
 *
 * The width is enforced by the property itself rather than at each assignment,
 * so every path -- interpreted, emitted, or a host poke -- wraps identically.
 * Without it a `uint8_t` field decremented past zero became -1 instead of
 * 0xff, and MAME code that carries on `if (field == 0xff)` silently never
 * carried: the DPC's display-data pointer walked off its 2K window.
 */
/** The struct type a member's declared type names: `const ay_ym_param*` is `ay_ym_param`. */
function structTypeName(valueType: string): string {
  return valueType.replace(/\bconst\b|[*&]/g, '').trim();
}

/**
 * Each declaring device's struct methods, keyed by its struct table, so a
 * struct value built from that table carries its type's methods.
 */
/** The bindings a struct's own methods run against, one per struct value. */
const STRUCT_BINDINGS = new WeakMap<object, GeneratedHandlerBindings>();
const STRUCT_METHODS = new WeakMap<object, Record<string, Record<string, (this: Record<string, unknown>, ...args: unknown[]) => unknown>>>();

function structMember(
  fields: readonly StructField[],
  structs?: Readonly<Record<string, readonly StructField[]>>,
  /** The struct's type, whose methods the value carries (STRUCT_METHODS). */
  typeName?: string,
): Record<string, unknown> {
  // Collected, then made an object in one operation. Added one computed key
  // at a time, V8 gives up on a struct past a dozen fields and keeps it as a
  // hash table: the 64H156's 22-field live state then cost a hash probe on
  // every field it touches, sixteen million cycles a second, and the gate
  // array alone took two thirds of a C64 frame.
  const value: Record<string, unknown> = {};
  const widths: Record<string, number> = {};
  for (const field of fields) {
    // A vector field (floppy_image's per-track `cell_data`) is a vector.
    const vector = /^std::vector<\s*(.+?)\s*>$/.exec(field.valueType ?? '');
    if (vector) {
      value[field.name] = generatedVector(vectorElement(vector[1], structs));
      continue;
    }
    // A field that is itself a struct, and commonly an array of them: the
    // Game Boy PPU keeps ten sprite slots inside its per-line state. Built as
    // a number, the first assignment into one had nothing to assign to.
    // A field of a named struct type is one too: MMC5's `square_t squ[2]` is
    // a `mmc5_sound_t::square_t`, declared beside the struct that holds it.
    const nested = field.fields ?? (field.valueType ? structs?.[field.valueType] : undefined);
    if (nested) {
      value[field.name] = field.length
        ? Array.from({ length: field.length }, () => structMember(nested, structs, field.valueType))
        : structMember(nested, structs, field.valueType);
      continue;
    }
    if (field.length) {
      value[field.name] = Array.from({ length: field.length }, () => 0);
      continue;
    }
    value[field.name] = 0;
    // The width travels beside the struct rather than as an accessor on the
    // field. Emitted code narrows inline from the same declaration; the
    // interpreter narrows through this on assignment. Accessors did it for
    // both, and made every *read* a call too -- the Game Boy's wave channel
    // walks its counters in a loop that runs forty thousand times a frame.
    if (field.bits && field.bits < 32) {
      widths[field.name] = field.signed ? -field.bits : field.bits;
    }
  }
  const struct = Object.fromEntries(Object.entries(value));
  // Marked, so that assigning one struct to another copies (C++ value
  // semantics) instead of making the two names one object.
  Object.defineProperty(struct, GENERATED_STRUCT, { value: true, enumerable: false, configurable: true });
  if (Object.keys(widths).length) {
    Object.defineProperty(struct, GENERATED_FIELD_WIDTHS, {
      value: widths,
      enumerable: false,
      configurable: true,
    });
  }
  // Not enumerable: a copy, a comparison or a save state sees the fields only.
  const table = structs && typeName ? STRUCT_METHODS.get(structs) : undefined;
  const methods = table?.[typeName!] ?? table?.[typeName!.split('::').at(-1)!.trim()];
  for (const [name, method] of Object.entries(methods ?? {})) {
    Object.defineProperty(struct, name, { value: method, enumerable: false, configurable: true, writable: true });
  }
  return struct;
}

/** A C array member's storage, one level of nesting per declarator bound. */
function nestedArrayMember(shape: readonly number[]): unknown[] {
  const [extent, ...inner] = shape;
  return Array.from(
    { length: Math.max(0, extent ?? 0) },
    () => inner.length ? nestedArrayMember(inner) : 0,
  );
}

/**
 * A device's `required_ioport` read. A port the machine declares is read from
 * the machine's inputs; one only the device declares -- a cartridge's DIP
 * switches or jumpers, which exist only once that cartridge is chosen -- reads
 * the power-on value the device's own INPUT_PORTS give it. Read as an unknown
 * port it was all ones: Nintendo Campus Challenge 1991's competition timer
 * had expired at power-on and Karaoke Studio's microphone buttons were all
 * held (#184).
 */
function inputFinderRead(
  inputs: { read(tag: string): number; has?(tag: string): boolean } | undefined,
  tag: string,
  fallback: number | undefined,
): () => number {
  return () => fallback !== undefined && inputs?.has?.(tag) === false
    ? fallback
    : inputs?.read(tag) ?? fallback ?? 0xff;
}
