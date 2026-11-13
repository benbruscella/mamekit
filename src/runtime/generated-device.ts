import {
  applyCombineData,
  applyGeneratedAndAssign,
  applyGeneratedAnd,
  applyGeneratedDivision,
  applyGeneratedShiftRight,
  generatedMacroCall,
  dereferenceGeneratedValue,
  dereferenceGeneratedFast,
  generatedByteView,
  generatedPackedView,
  isBigEndianWords,
  generatedContainerAccessor,
  generatedVectorMethod,
  generatedStringCall,
  generatedAdd,
  generatedPointerStore,
  generatedWideBinary,
  generatedLow32,
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
  resizeGeneratedVector,
} from './generated-handler.ts';
import { installedViewEntry, type InstalledView } from './address-space-install.ts';
import { GENERATED_CPP_EXCEPTIONS, UNION_VIEW, UNION_ELEMENTS, buildCallLinks, generatedPointerElement, setGeneratedPointerElement, generatedMemberAddress, generatedObjectAddress, generatedPackedWord, generatedSwapObjects, copyGeneratedBytes, DEFAULT_CONSTANTS, generatedBoundSearch, generatedPointerOffset, generatedSynchronize, noteCallLinksChanged, REFERENCE_PARAMETERS, resizableBuffer, type GeneratedLValue } from '../ir/execute.ts';
import { walkExpressions, walkOperations } from '../ir/walk.ts';
import { markResizable, stateValue } from './machine-state.ts';
import { GeneratedRectangle } from './rectangle.ts';
import { IrEmuFile, IrFlacDecoder, mameStringFormat, type SamplePath } from './sample-path.ts';
import { STREAM_VARIANT_SUFFIX, type GeneratedHandlerProgram } from '../ir/board.ts';
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
    tags?: string[];
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
  bits?: 1 | 8 | 16 | 32 | 64;
  signed?: boolean;
  fields?: StructField[];
  /** A union: `fields` overlap, each laid out from the union's first byte. */
  union?: true;
  /** The value its declaration gives a scalar field (`u16 lfsr = 1;`). */
  initial?: number;
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
  /** `required_region_ptr<T>`: the region, indexed in T's width (elementBytes, when wider than a byte). */
  | { kind: 'region'; name: string; elementBytes?: 2 | 4 }
  | { kind: 'region-object'; name: string }
  | { kind: 'region-pointer'; name: string; offset: number }
  | { kind: 'region-length'; name: string }
  | { kind: 'region-pages'; name: string; bytes: number }
  | { kind: 'region-page-mask'; name: string; bytes: number }
  | { kind: 'memory'; name: string; bytes: number; onlyWhenRegionMissing?: string; region?: string; fill?: number }
  | { kind: 'missing-region-number'; name: string; missing: number; present: number }
  | { kind: 'config-map'; path: string; values: Record<string, number>; fallback?: number }
  | { kind: 'bank-array'; name: string; count: number };

/**
 * An object a device allocates, which carries its classes for DYNAMIC_CAST.
 * Not enumerable: a save state walks members, not this.
 */
function allocatedObject(self: unknown, definition: GeneratedDeviceDefinition): unknown {
  Object.defineProperty(self as object, '$hierarchy', {
    value: definition.hierarchy ?? [definition.type], enumerable: false, configurable: true,
  });
  return self;
}

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
  /** `&object.field` (execute.ts generatedMemberAddress). */
  fieldAddress(object: unknown, property: string): unknown;
  /** C++ exceptions for emitted try/catch (execute.ts GENERATED_CPP_EXCEPTIONS). */
  cpp: typeof GENERATED_CPP_EXCEPTIONS;
  /** `&call()` where the call answers an object (generatedObjectAddress). */
  objectAddress(value: unknown): unknown;
  /** `*(uint16_t *)p` over bytes (generatedPackedWord). */
  packedWord(value: unknown, signed: boolean): number;
  /** `std::swap` of two objects (generatedSwapObjects). */
  swapObjects(left: unknown, right: unknown): boolean;
  /** C++ `*value`, resolved by the operand's shape rather than assumed. */
  dereference(value: unknown): unknown;
  /** Where a pointer points within its memory, for ordering two pointers (`data < ramend`). */
  pointerOffset(value: unknown): number;
  /**
   * A `u16*`/`s16*` declaration over byte memory, reinterpreted rather than
   * copied, so the wider view writes through to the same shared bytes.
   */
  packedView(value: unknown, signed: boolean): unknown;
  byteView(value: unknown): unknown;
  /** A MAME memory container's own accessor (`m_vram.get()`), from the array. */
  container(value: unknown, method: string): unknown;
  /** std::vector `insert`/`erase` at an iterator, or the object's own method of that name. */
  vectorMethod(container: unknown, method: string, ...args: unknown[]): unknown;
  /** A std::string method over the JS string that stands for one. */
  stringMethod(value: unknown, method: string, ...args: unknown[]): unknown;
  /** The container an indexed write stores into, addressed by member name. */
  writableMember(name: string): unknown;
  /** MAME `scheduler().synchronize(callback, parameter)`; `''` only ends the slice (execute.ts generatedSynchronize). */
  synchronize(callback: string, parameter: unknown): number;
  /** C arithmetic promoted to 64 bits by a literal too wide for a double. */
  wide(operator: string, left: unknown, right: unknown): unknown;
  /** The low 32 bits of a `wide` answer, before a 32-bit-or-narrower store (execute.ts generatedLow32). */
  low32(value: unknown): unknown;
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
  /**
   * The constructor the configuration's argument reaches when it is not the
   * clock (device-compiler): run with that argument, and the device's clock
   * is the one it delegates.
   */
  clockConstructor?: { method: string; clock: number };
  constants: Record<string, number>;
  /** A core that stops between an instruction's cycles (device-compiler.ts). */
  suspendsMidInstruction?: true;
  /** device_state_interface's state_add table (device-compiler.ts GeneratedDeviceStateEntry). */
  stateEntries?: { index: number; name: string; mask?: number; import?: true; export?: true; read: string; write: string }[];
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
    /** Child devcb signal -> this device's method it is `.set()` to. */
    callbackTargets?: Record<string, string>;
    slotOptions?: string;
    /** The child's own clock, where its constructor gives one (0 when it gives none). */
    clock?: number;
    /** Where a sound child's outputs go (`add_route`): output -1 is ALL_OUTPUTS. */
    routes?: { output: number; target: string; gain: number }[];
    /** One tag per element of a `required_device_array`; the member is the array. */
    tags?: string[];
    /** What device_add_mconfig sets on each built child, by element. */
    configured?: Record<string, number>[];
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
    /** address_space_config's byte order and addrshift (-1 word-, +3 bit-addressed). */
    endianness?: 'big' | 'little';
    addressShift?: number;
    ram?: true;
    /**
     * The address-map method that fills the space, for a space MAME maps
     * rather than backs with plain RAM: the 68705's ports, timer, RAM and
     * EPROM. The host runs it against a map builder, as MAME does.
     */
    map?: string;
    /** A space with no map, which the device fills at start with install_rom. */
    installed?: true;
    /** Declared only when the owner configures a map for it (has_configured_map). */
    conditional?: true;
  }[];
  compiledMethods?: GeneratedDeviceMethodMap;
  /**
   * Emitted code for the inline methods of the structs the device declares,
   * by struct type: ymfm's `output->clear()` and `output->roundtrip_fp()` run
   * once a sample, and interpreted they were a sixth of a CPS1 board's time.
   */
  compiledStructMethods?: Record<string, GeneratedDeviceMethodMap>;
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
  /**
   * Install a machine-config map over a declared device space: byte access,
   * and for a 16-bit space the bus's own word access (`wide`), so a word
   * handler sees one access, not two halves.
   */
  bindAddressSpace?(index: number, read: (address: number) => number,
    write: (address: number, data: number) => void, wide?: WideSpaceAccess): void;
  /** The MAME address-space indices the device declares (memory_space_config). */
  spaceIndices?(): readonly number[];
  /** One declared space's config: its width, byte order and address shift. */
  spaceConfig?(index: number): { dataBits: number; addressBits: number; endianness?: 'big' | 'little'; addressShift?: number } | undefined;
  reset(): void;
  tick(seconds: number): void;
  /** MAME's `device_pre_save` on the device and the devices inside it, before a state save. */
  preSave?(): void;
  /** MAME's `device_post_load` on the device and the devices inside it, after a state load. */
  postLoad?(): void;
  /** Whether this device or a composed child owns a scheduled timer. */
  needsTick?(): boolean;
  /** Seconds until the soonest armed timer of this device or one inside it fires. */
  untilNextTimer?(): number;
  /** Host a device_execute_interface time slice in device cycles. */
  runCycles?(cycles: number): number;
  /** MAME `apply_suspend_changes` for this device, at the start of a round. */
  applySuspendChanges?(): void;
  /** Suspended this round: charged its slice ('eating') or skipped ('waiting'). */
  suspended?(): 'eating' | 'waiting' | undefined;
  /** MAME abort_timeslice, from the scheduler: end the running slice after this instruction. */
  abortTimeslice?(): void;
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
  /** Whether the core stops between an instruction's cycles (its m_inst_substate). */
  suspendsMidInstruction?(): boolean;
  /** device_state_interface::state_int over the core's own state_add table. */
  stateInt?(index: number): number | undefined;
  /** device_state_interface::set_state_int over the same table. */
  setStateInt?(index: number, value: number): boolean;
  /**
   * A machine-config setter of an interface the host answers rather than the
   * device: `.set_user_loadable(false)` on device_image_interface. False for
   * one the host does not keep.
   */
  configureHost?(method: string, args: readonly unknown[]): boolean;
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
  /** Every stream the device allocated, in `stream_alloc` order. */
  streams?(): readonly IrSoundStream[];
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
  /** Run the mounted card's own installer against a recording address space; false when there is none. */
  installSlotCard(space: unknown): boolean;
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

export function registerGeneratedDevice(definition: GeneratedDeviceDefinition, key = definition.type): void {
  if (definition.summary.diagnostics) {
    throw new Error(
      `cannot register ${definition.type}: ${definition.summary.diagnostics} compiler diagnostics`,
    );
  }
  DEFINITIONS.set(key.toUpperCase(), definition);
}

/** A type compiled whole as a stream, for the machines that render it so. */
export function registerGeneratedStreamDevice(definition: GeneratedDeviceDefinition): void {
  registerGeneratedDevice(definition, `${definition.type}${STREAM_VARIANT_SUFFIX}`);
}

/** What a board's device is built from: its type, or its type's stream variant. */
export function generatedDeviceKey(device: { type: string; stream?: true }): string {
  return device.stream ? `${device.type}${STREAM_VARIANT_SUFFIX}` : device.type;
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
  /**
   * The address spaces the owner maps for this device (a CPU's program, IO
   * and decrypted-opcode maps): what has_configured_map answers, and which
   * of the spaces memory_space_config declares on condition exist.
   */
  configuredSpaces?: readonly number[];
  /** A child of this device the board holds itself, by full tag: its handle there. */
  heldChild?: (tag: string) => object | undefined;
  /** The board's Device behind a held child, for binding its devcbs. */
  heldDevice?: (tag: string) => Device | undefined;
  /** device_sound_interface::get_sound_requested_inputs_mask: the inputs routed into it. */
  soundInputsMask?: number;
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
  finder?: (tag: string, member?: string, kind?: 'space' | 'bank') => unknown;
  regions?: Record<string, Uint8Array>;
  /**
   * `device_rom_interface::read_byte` through the device's own address space
   * 0, when its configuration installs one over its region.
   */
  romRead?: (address: number) => number;
  /** MAME's `machine().basename()`: the machine's short name. */
  machineName?: string;
  /** MAME's -samplepath: the sample sets the host found (BoardConfig.samplePath). */
  samplePath?: SamplePath;
  configuration?: unknown;
  banks?: Record<string, GeneratedMemoryBank>;
  resourceCache?: Record<string, unknown>;
  /** MAME `scheduler().synchronize()`: run once the processor that asked has yielded. */
  schedule?: (run: () => void) => void;
  /**
   * Every processor this device talks to runs in the board's round, so its
   * own `synchronize(callback)` is deferred as MAME defers it, to when the
   * round has caught every processor up to the call.
   */
  deferSynchronize?: boolean;
  /**
   * Hold device_start until the host calls `startDeferred()`: a slot whose
   * card the board composes attaches that card in its own device_start, and
   * the card does not exist until the board has built it.
   */
  deferStart?: boolean;
  /**
   * Leave device_reset to the host. MAME starts every device, then runs the
   * driver's machine_start, and only then resets every device: Neo Geo's
   * machine_start points the sound bank at the cartridge, and the system
   * latch's reset puts it back on the BIOS the Z80 boots from.
   */
  holdReset?: boolean;
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

/**
 * Told the delay of every device timer armed (`adjust`). MAME's scheduler
 * ends the running timeslice when a timer armed now becomes the soonest, so
 * the round ends at it rather than running past (emu_timer::adjust).
 */
let timerArmed: ((seconds: number) => void) | undefined;

/**
 * How much device time the round has delivered since its base, when a round
 * device is the one arming a timer. MAME's `machine().time()` stands at the
 * round's base for the whole timeslice, so a timer is measured from there;
 * ours stands where the processor driving the device clock has reached, which
 * ran first. Measured from there, Pole Position's 52xx enabled its serial
 * timer partway through its slice and read SB before a bit had shifted in;
 * MAME's, armed overdue, had caught up five ticks before the next round.
 */
let timerArmBase: (() => number) | undefined;

/** Install the round-base hook (see timerArmBase); returns the one it replaced. */
export function setGeneratedTimerArmBase(hook: (() => number) | undefined): (() => number) | undefined {
  const outer = timerArmBase;
  timerArmBase = hook;
  return outer;
}

/** Install the arming hook (see timerArmed); returns the one it replaced. */
export function setGeneratedTimerArmed(hook: ((seconds: number) => void) | undefined): ((seconds: number) => void) | undefined {
  const outer = timerArmed;
  timerArmed = hook;
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

/** diexec.h: the suspend reason `suspend_until_trigger` sets. */
const SUSPEND_REASON_TRIGGER = 0x0008;

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

/**
 * One `sound_stream` a device allocated. The host's stream mixer renders it:
 * it lays the update's window on before calling `sound_stream_update`, on this
 * same object, because a device with several streams finds which one it was
 * handed by identity (`&stream == m_channel[channel].stream`).
 */
export class IrSoundStream {
  rate: number;
  onRate?: (rate: number) => void;
  samples: () => number = () => 0;
  put: (channel: number, index: number, value: number) => number = () => 0;
  /** sound_stream::add: bound by the mixer beside `put` for the span it asks for. */
  add: (channel: number, index: number, value: number) => number = () => 0;
  /** The outputs and inputs `stream_alloc` asked for. */
  readonly outputs: number;
  readonly inputs: number;
  private readonly bindings: { calls?: Record<string, (...args: any[]) => unknown> };

  constructor(rate: number, bindings: { calls?: Record<string, (...args: any[]) => unknown> }, outputs = 1, inputs = 0) {
    this.rate = rate;
    this.bindings = bindings;
    this.outputs = Math.max(0, Math.trunc(Number(outputs) || 0));
    this.inputs = Math.max(0, Math.trunc(Number(inputs) || 0));
  }

  // The rest of sound_stream's write surface, through `put`, which the mixer
  // binds for the span it asks for: an OKIM6295 renders with put_int.
  put_int(channel: number, index: number, value: number, max: number): number {
    return this.put(channel, index, Number(max) ? Number(value) / Number(max) : 0);
  }
  put_clamp(channel: number, index: number, value: number, clamp = 1): number {
    return this.put(channel, index, Math.max(-Number(clamp), Math.min(Number(clamp), Number(value))));
  }
  add_int(channel: number, index: number, value: number, max: number): number {
    return this.add(channel, index, Number(max) ? Number(value) / Number(max) : 0);
  }
  put_int_clamp(channel: number, index: number, value: number, max: number): number {
    const limit = Number(max);
    return this.put(channel, index, limit ? Math.max(-limit, Math.min(limit - 1, Number(value))) / limit : 0);
  }
  fill(channel: number, value: number, start = 0, count = this.samples() - Number(start)): number {
    for (let index = Number(start); index < Number(start) + Number(count); index++) this.put(channel, index, Number(value));
    return 0;
  }
  output_count(): number { return this.outputs; }
  input_count(): number { return this.inputs; }
  get(): number { return 0; }
  // Bound in the host's mixer; the speaker places each edge against end_time.
  update(): unknown { return this.bindings.calls?.['stream.update']?.(this) ?? 0; }
  end_time(): unknown { return this.bindings.calls?.['stream.end_time']?.(this) ?? 0; }
  sample_rate(): number { return Number(this.bindings.calls?.['stream.sample_rate']?.(this) ?? this.rate); }
  // `sound_stream::set_sample_rate`: the AY-3-8910 allocates at clock/8 and
  // then halves it for a chip with an internal divider (the Sunsoft 5B).
  // Ignored, the 5B played an octave high.
  set_sample_rate(next: unknown): number {
    const rate = Number(next);
    if (rate > 0 && rate !== this.rate) {
      this.bindings.calls?.['stream.rate_changing']?.(this, rate);
      this.rate = rate;
      this.onRate?.(rate);
    }
    return 0;
  }
  stateKeys(): readonly string[] { return ['rate']; }
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
      // Possibly overdue already: the round's next timeslice fires it, and a
      // periodic timer catches up every period it missed, as MAME's
      // execute_timers does at the round's base.
      const since = Number.isFinite(this.remainingSeconds) ? timerArmBase?.() ?? 0 : 0;
      if (since > 0) {
        this.remainingSeconds -= since;
        this.expiry -= since;
      }
    }
    if (Number.isFinite(this.remainingSeconds)) timerArmed?.(this.remainingSeconds);
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

  /** Seconds of device time until it fires; Infinity when it is not armed. */
  untilExpiry(): number {
    return this.remainingSeconds;
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
    // Every armed timer comes through here once per round, and on a board with
    // a per-cycle timer that is tens of thousands of times a frame.
    if (this.remainingSeconds > TIMER_NOW_TOLERANCE_SECONDS) return;
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
  /** Backing store for each address space the device declares, by MAME index. */
  private readonly spaces = new Map<number, GeneratedDeviceSpace>();
  private regionLookup: (tag: string) => Uint8Array | undefined = () => undefined;
  /** The image/floppy/cassette surface the host answers (see hostedCalls). */
  private readonly hostedSurface: Record<string, (...args: never[]) => unknown> = {};
  private clock: number;
  private executedCycles = 0;
  private runningCycles: number | undefined;
  /**
   * MAME device_execute_interface's suspension (diexec.cpp): the reasons in
   * force this round and those the next one starts with, whether a suspended
   * device is still charged its slice, and the trigger that releases it.
   * suspend_until_trigger and trigger change only the next round's; the
   * scheduler applies them when a round starts (applySuspendChanges).
   */
  private suspension = { now: 0, next: 0, eat: false, nextEat: false, trigger: 0 };
  private executeEntry?: (...args: GeneratedCallArgument[]) => unknown;
  /** Samples published through `sound_stream::put_int` since the last collection. */
  private streamSamples: number[] = [];
  private readonly soundStreams: IrSoundStream[] = [];
  private slotChild?: IrDevice;
  /** The option the slot selected, whether or not its card is held. */
  slotOption?: string;
  /** Set for the duration of a mounted card's installer; see installSlotCard. */
  private installSpace?: unknown;
  /** Devices instantiated from this one's device_add_mconfig. */
  private readonly children: IrDevice[] = [];
  /** The device_add_mconfig entry each of `children` was built from (an array entry builds several). */
  private readonly childSpecs: NonNullable<GeneratedDeviceDefinition['children']> = [];
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
    // `device_t::m_clock` is a u32, so MAME's own `clock()` never has a
    // fraction: a device configured at m_xtal/114 is asked for 31399, not
    // 31399.78. Handing the fraction back made the TIA's sample counter land
    // one short of its divisor and take the oversampling branch MAME does not.
    clock = Math.trunc(clock);
    const constructorArgument = clock;
    if (definition.clockConstructor) clock = definition.clockConstructor.clock;
    this.clock = clock;
    for (const config of definition.spaces ?? []) {
      // A mapped space is built on first use, once the constructor has run:
      // its map tests state the constructor sets (the 68705's port masks).
      if (config.installed) this.spaces.set(config.index, withSpaceConfig(installableDeviceSpace(config.addressBits), config.addressBits, config));
      else if (!config.map) this.spaces.set(config.index, withSpaceConfig(generatedDeviceSpace(config.addressBits), config.addressBits, config));
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
        [type, structOverloads(methods, methods.map(method => {
          const names = splitParameters(method.parameters).map(parameterName);
          // Emitted, when the codegen compiled the struct's type as one of the
          // device's allocations: run against the device's own runtime with
          // the struct as its members, one runtime per struct, kept. POKEY's
          // four channels count down through inc_chan and check_borrow once a
          // clock, and interpreted they were most of a POKEY board's time.
          // Compiled methods are keyed by name, so an overloaded one is left
          // to the interpreter, which picks the overload by its arguments.
          const overloaded = methods.filter(candidate => candidate.name === method.name).length > 1;
          const compiled = overloaded ? undefined : definition.allocations?.[type]?.compiledMethods?.[method.name] ??
            definition.compiledStructMethods?.[type]?.[method.name];
          if (compiled) {
            // Four check_borrow calls a clock: no rest array, no mapped copy.
            const referent = (argument: unknown) => generatedReferent(argument) as GeneratedCallArgument;
            return [method.name, function (this: Record<string | symbol, unknown>, a?: unknown, b?: unknown, c?: unknown): unknown {
              let runtime = this[STRUCT_RUNTIME] as GeneratedDeviceExecutionContext | undefined;
              if (!runtime) {
                // `return *this;` reads `this` from the members it runs on,
                // which are the struct: ymfm's `output->clear()` hands the
                // struct on as the output to fill. Not enumerable, so a save
                // walks past it.
                if (!Object.hasOwn(this, 'this')) Object.defineProperty(this, 'this', { value: this, enumerable: false });
                runtime = this[STRUCT_RUNTIME] = { ...device.executionContext, members: this, links: undefined } as GeneratedDeviceExecutionContext;
              }
              switch (arguments.length) {
                case 0: return compiled(runtime);
                case 1: return compiled(runtime, referent(a));
                case 2: return compiled(runtime, referent(a), referent(b));
                case 3: return compiled(runtime, referent(a), referent(b), referent(c));
                default: return compiled(runtime, ...[...arguments].map(referent));
              }
            }];
          }
          return [method.name, function (this: Record<string, unknown>, ...args: unknown[]): unknown {
            // `this` is the struct: ymfm's `ymfm_output::clear()` ends `return *this;`.
            const locals: Record<string, unknown> = { this: this };
            names.forEach((name, index) => { locals[name] = args[index] ?? 0; });
            // Its own bindings, not the device's: those carry member hooks that
            // store into the device, and `period = ...` landed there.
            // One bindings object per struct, kept: the compiled program is
            // cached by bindings, and a fresh one per call recompiled ymfm's
            // `output->clear()` fifty thousand times a second.
            // A struct method calling its own sibling -- `set(input.data)` in
            // atarimo's sprite_parameter -- reaches the struct's method (by its
            // overloads), before anything of the device's of that name.
            let bindings = STRUCT_BINDINGS.get(this);
            if (!bindings) {
              const own = STRUCT_METHODS.get(definition.structs!)?.[type] ?? {};
              const calls = Object.create(device.bindings.calls ?? null) as Record<string, unknown>;
              // A free function the device compiled, which the struct calls by
              // name: `ymfm_output::roundtrip_fp()` runs
              // `ymfm::roundtrip_fp(data[index])`. Emitted struct methods
              // reach it through invoke; interpreted, it was an unresolved
              // reference in every YM2151 sample.
              for (const name of device.methods.keys()) {
                if (name in calls || Object.hasOwn(own, name)) continue;
                calls[name] = (...args: unknown[]) => device.call(name, ...args as number[]);
              }
              for (const [name, fn] of Object.entries(own)) calls[name] = (fn as (...args: unknown[]) => unknown).bind(this);
              STRUCT_BINDINGS.set(this, bindings = {
                members: this, constants: device.bindings.constants, calls,
              } as GeneratedHandlerBindings);
            }
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
        (inputTag && member.finder?.tags
          ? member.finder.tags.map(tag => ({
              read: inputFinderRead(options.inputs, [options.tag, tag].filter(Boolean).join(':'), definition.inputDefaults?.[tag]),
            }))
          : inputTag
          ? { read: inputFinderRead(options.inputs, inputTag, definition.inputDefaults?.[member.finder?.tag ?? '']) }
          // DEVICE_SELF_OWNER: the device this one was built inside.
          : member.finder?.kind === 'device' && member.finder.tag === '^' && options.owner
            ? options.owner
          : member.finder?.kind === 'device'
            ? options.finder?.(member.finder.tag, member.name) ?? 0
          : /^(?:required|optional)_address_space$/.test(member.valueType)
            ? options.finder?.('', member.name, 'space') ?? 0
          : /^(?:required|optional)_memory_bank$/.test(member.valueType)
            ? options.finder?.('', member.name, 'bank') ?? 0
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
          // A view the device's own address map installs: the MCS-48's
          // internal ROM, which its EA pin selects or takes away.
          : member.valueType === 'memory_view'
            ? deviceMemoryView()
          // MAME's PAIR register union (emucore.h): one 32-bit word read as
          // .d, .w.l/.w.h or .b.l/.b.h/.b.h2/.b.h3. The 6805 keeps PC, S and
          // EA in one and writes them by halves (`rm16(vector, m_pc)`).
          : /^PAIR$/.test(member.valueType.replace(/\bconst\b/g, '').trim())
            ? (member.arrayLength
                ? Array.from({ length: member.arrayLength }, () => pairValue())
                : pairValue())
          : /^PAIR16$/.test(member.valueType.replace(/\bconst\b/g, '').trim())
            ? (member.arrayLength
                ? Array.from({ length: member.arrayLength }, () => pair16Value())
                : pair16Value())
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
                // A file-scope `static const struct` keeps its initializer, and a
                // struct the constructor fills keeps what it wrote.
                : seedStruct(structMember(member.fields, definition.structs, structTypeName(member.valueType)), member.initialValue))
        : member.memory
        ? memoryMember(member, options, definition.structs, definition.spaces?.some(space => space.map) === true)
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
    // device_t::tag() is the device's own full tag, which for a card or a
    // child is not the slot's: the Interface 2's cartridge slot allocates its
    // ROM as `<tag()>:cart:rom`, MAME's `:exp:intf2:cartslot:cart:rom`.
    self.tag = () => this.ownTag;
    // device_t's clock, asked by whatever holds the device: a CTC channel
    // times its prescaler with `m_device->clocks_to_attotime(16)`, against
    // the CTC's clock rather than its own (which is 0). Never in place of a
    // method of the same name: ymfm's engine is ticked by its own `clock()`.
    self.clock ??= () => clock;
    self.clocks_to_attotime ??= (ticks: unknown) => clock > 0 ? Number(ticks) / clock : Infinity;
    self.attotime_to_clocks ??= (seconds: unknown) => Math.floor(Number(seconds) * clock);
    self.machine = () => ({
      sample_rate: () => Number(this.bindings.calls?.['machine().sample_rate']?.() ?? 48000),
      rand: () => Number(this.bindings.calls?.['machine().rand']?.() ?? 0),
      phase: () => Number(this.bindings.calls?.['machine().phase']?.() ?? DEFAULT_CONSTANTS['machine_phase::RUNNING']),
      // The machine's input ports by tag: a DISCRETE_ADJUSTMENT node reads
      // its pot as `machine().root_device().ioport(siblingtag(tag))`. A port
      // the machine lacks is null, as MAME answers it.
      root_device: () => ({
        ioport: (tag: unknown) => {
          const name = String(tag).replace(/^:+/, '');
          return options.inputs && options.inputs.has?.(name) !== false
            ? { read: () => options.inputs!.read(name) }
            : 0;
        },
      }),
    });
    // device_t::siblingtag: the tag beside this device, under its owner.
    self.siblingtag ??= (tag: unknown) => {
      const owner = this.ownTag.includes(':') ? this.ownTag.slice(0, this.ownTag.lastIndexOf(':')) : '';
      return owner ? `${owner}:${String(tag)}` : String(tag);
    };
    // device_t::interface<T>, never in place of a class's own method of that
    // name: discrete_base_node declares three.
    self.interface ??= (type: string) => definition.hierarchy?.includes(type) ? self : 0;
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
    // The plain store behind the accessors, for emitted code that narrows its
    // own stores (allocatedObjectField). Not enumerable: no save state walks it.
    Object.defineProperty(self, '$members', { value: this.members, enumerable: false, configurable: true });
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
      const build = () => allocatedObject(new IrDevice(allocated, clock, { constructorArgs: args as GeneratedCallArgument[] }).members.this, allocated);
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
        return allocatedObject(new IrDevice(allocated, clock, { constructorArgs: args }).members.this, allocated);
      };
    }
    const callParameters: NonNullable<GeneratedHandlerBindings['callParameters']> = {};
    // std::swap(a, b): both by reference, as C++ takes them. Objects trade
    // contents; anything else is two stores (the Z80's EX DE,HL swaps
    // `m_de.w` and `m_hl.w` through its DE/HL macros).
    for (const name of ['swap', 'std::swap']) {
      callParameters[name] = ['T &a', 'T &b'];
      referenceCalls[name] = (left, right) => {
        const a = left as GeneratedLValue;
        const b = right as GeneratedLValue;
        const va = a.get();
        const vb = b.get();
        if (!generatedSwapObjects(va, vb)) {
          a.set(vb);
          b.set(va);
        }
        return 0;
      };
    }
    const palette: number[] = [];
    this.bindings = {
      members: this.members,
      pointerMembers: new Set(definition.members.filter(member => /\*\s*$/.test(member.valueType ?? '')).map(member => member.name)),
      getters,
      setters,
      constants: definition.constants,
      // MAME's synchronize posts its work for when every processor has
      // caught up to the call, which needs every partner running in the
      // round beside it (deferSynchronize): deferred for Namco's 06xx while
      // its 5xxx MCUs were hosted on device time instead, Xevious went silent.
      // A command latch's write is one (generic_latch_8_device::write posts
      // sync_callback), so a reader later in the round cannot see a command
      // before the time it was sent.
      ...(options.schedule && options.deferSynchronize
        ? { schedule: options.schedule }
        : {}),
      // An empty synchronize posts nothing, so it cannot desynchronise
      // hosting the way deferred work does; it only ends the slice. POKEY's
      // read asks for one to "force resync".
      ...(options.schedule ? { endTimeslice: () => options.schedule!(() => {}) } : {}),
      calls: {
        save_item: () => 0,
        save_pointer: () => 0,
        // device_t::tag(): the device's own tag, which sprite.h hands its
        // owner to find the share named for it.
        tag: () => this.ownTag,
        // `rectangle(min_x, max_x, min_y, max_y)`, a value: sprite.cpp's
        // sparse_dirty_bitmap starts `m_rect_list_bounds(0, -1, 0, -1)`.
        // A bitmap built over memory: `BitmapType wrapped(base, w, h, rowpixels)`.
        ...Object.fromEntries(['bitmap_ind8', 'bitmap_ind16', 'bitmap_ind32', 'bitmap_rgb32'].map(type => [type,
          (base: GeneratedCallArgument, width: GeneratedCallArgument, height: GeneratedCallArgument, rowpixels: GeneratedCallArgument) =>
            GeneratedBitmap.wrap(type, base, Number(width), Number(height), Number(rowpixels ?? width))])),
        rectangle: (...args: GeneratedCallArgument[]) => new GeneratedRectangle(
          Number(args[0] ?? 0), Number(args[1] ?? 0), Number(args[2] ?? 0), Number(args[3] ?? 0)),
        // `m_screen.set_tag(screen_tag)`: a setter re-pointing a device finder
        // (the watchdog's set_vblank_count) rebinds the member to that tag.
        ...Object.fromEntries(definition.members
          .filter(member => member.finder?.kind === 'device' && member.finder.tag !== '^')
          .map(member => [`${member.name}.set_tag`, (tag: unknown) => {
            this.members[member.name] = options.finder?.(String(tag), member.name) ?? 0;
            return 0;
          }])),
        // A call through a member-function pointer, which holds the method's
        // name (member-pointers.ts): the T-Unit blitter's dma_draw tables.
        // A PAIR local (handler-ir): the same union a PAIR member holds.
        PAIR_VALUE: () => pairValue() as unknown as number,
        PAIR16_VALUE: () => pair16Value() as unknown as number,
        CALL_METHOD: (name: unknown, ...args: GeneratedCallArgument[]) =>
          this.invoke(String(name), ...args),
        // MAME stops on a fatal error; carrying on past one ran on garbage.
        fatalerror: (format: unknown, ...args: unknown[]) => {
          const message = String(format).replace(/%[-+ #0]*\d*(?:\.\d+)?[sdiuxXfgc]/g, () => String(args.shift() ?? '')).trim();
          throw new Error(`${definition.type}: fatalerror: ${message}`);
        },
        // MAME's work queues (osdsync.h) run their items on other threads;
        // MAMEKIT runs one, so an item runs when it is queued and a wait finds
        // the queue done. DISCRETE steps its tasks this way, and in MAME's
        // own single-threaded builds they run in the same order. The
        // callback is a static method, named as the source names it.
        osd_work_queue_alloc: () => 1,
        osd_work_queue_free: () => 0,
        osd_work_queue_wait: () => 1,
        // The host's tick rate, which DISCRETE only scales a wait's timeout by.
        osd_ticks_per_second: () => 1_000_000_000,
        osd_work_item_queue: (_queue: unknown, callback: unknown, parameter: unknown) => {
          if (typeof callback === 'function') {
            callback(parameter, 0);
            return 0;
          }
          const name = callback && typeof callback === 'object' && 'reference' in callback
            ? String((callback as { reference: unknown }).reference) : String(callback);
          this.invoke(name, parameter as GeneratedCallArgument, 0);
          return 0;
        },
        // A fence orders one thread's stores for another's; with one thread
        // there is nothing to order.
        'std::atomic_thread_fence': () => 0,
        // No environment: MAME reads DISCRETE_PROFILING from one.
        osd_getenv: () => 0,
        // An object a device allocates knows its classes (`$hierarchy`); any
        // other value -- a device, a slot's card -- passes as it always has.
        DYNAMIC_CAST: (value: unknown, type: unknown) => {
          const classes = value && typeof value === 'object'
            ? (value as { $hierarchy?: readonly string[] }).$hierarchy
            : undefined;
          return !classes || classes.includes(String(type)) ? value : 0;
        },
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
        // What samples_device::load_samples asks the framework: the option
        // that turns samples on (the default) and the path they are filed on.
        'machine().options().samples': () => 1,
        'machine().options().sample_path': () => 0,
        'machine().basename': () => options.machineName ?? '',
        emu_file: () => new IrEmuFile(options.samplePath ?? {}) as unknown as number,
        flac_decoder: file => new IrFlacDecoder(file as unknown as IrEmuFile) as unknown as number,
        'util::string_format': (format, ...args) => mameStringFormat(format, ...args) as unknown as number,
        // And unqualified, as emucore.h's `using util::string_format;` lets a
        // device write it: the MCS-48 names its register states `R%d`.
        string_format: (format, ...args) => mameStringFormat(format, ...args) as unknown as number,
        // device_t::memregion(tag): a region by tag (its own with tag()), its
        // bytes behind base(). The 315-5177 decrypts its own region at start.
        // The whole memory_region: a Game Boy cartridge takes
        // `&romregion->as_u8()` as its page base.
        // The tag resolves as device_t::memregion resolves it (`^` climbs to
        // the owner, a leading `:` is absolute), then as the device's own
        // map names a region.
        memregion: (tag: unknown) => {
          const raw = String(tag ?? '');
          const own = options.deviceTag ?? options.tag ?? '';
          const full = mameSubtag(own, raw);
          const named = raw.replace(/^\^+/, '').replace(/^:/, '');
          return memoryRegionObject(options.regions?.[full] ??
            this.regionLookup(full === own || named === options.tag ? 'tag()' : named)) as number;
        },
        // device_t::memshare(tag): a share by tag, its bytes behind ptr(). The
        // 315-5098 decrypts into the one its configuration names.
        memshare: (tag: unknown) => {
          const named = String(tag ?? '').replace(/^\^+/, '').replace(/^:/, '');
          const bytes = options.shares?.[`${options.tag}:${named}`] ?? options.shares?.[named];
          return (bytes ? { ptr: () => bytes, bytes: () => bytes.length, length: () => bytes.length } : 0) as unknown as number;
        },
        // cpu_device's deferred-access protocol (devcpu.h): an access a
        // before_time/before_delay handler deferred is redone, the flag read
        // and cleared by the core that asked (the 68000 after every bus cycle).
        access_to_be_redone: () => {
          const redo = this.accessToBeRedone;
          this.accessToBeRedone = false;
          return redo ? 1 : 0;
        },
        access_to_be_redone_noclear: () => this.accessToBeRedone ? 1 : 0,
        defer_access: () => { this.deferAccess(); return 0; },
        retry_access: () => { this.abortTimeslice(); this.accessToBeRedone = true; return 0; },
        access_before_time: (access: unknown, current: unknown) => this.accessBeforeTime(Number(access), Number(current)) ? 1 : 0,
        access_after_delay: (cycles: unknown) => { this.accessAfterDelay(Number(cycles)); return 0; },
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
            // A space of its own over the region (a banked OKI) answers first.
            if (options.romRead) return options.romRead(address & (2 ** definition.romInterface!.addressBits - 1));
            const rom = options.regions?.[options.tag ?? ''];
            return rom?.length ? rom[(address & (2 ** definition.romInterface!.addressBits - 1)) % rom.length]! : 0;
          },
        } : {}),
        // `stream_alloc(inputs, outputs, sample_rate)`: the rate is the device's
        // own native output rate (VLM5030 asks for clock()/440), kept so the
        // host pumping it knows how many samples elapsed time is worth. A device
        // may allocate several: samples_device takes one for each channel, and
        // finds which one is updating by comparing the stream it is handed.
        get_sound_requested_inputs_mask: () => options.soundInputsMask ?? 0,
        // device_t::notify_clock_changed: the device's own device_clock_changed,
        // which the MSM5205 restarts its VCLK timer from.
        notify_clock_changed: () => this.methods.has('device_clock_changed') ? this.call('device_clock_changed') : 0,
        // device_t::type: the number its own DECLARE_DEVICE_TYPE name compiled to.
        type: () => definition.constants?.[definition.type] ?? 0,
        // device_t::set_unscaled_clock: the new clock, then the device's own
        // device_clock_changed (notify_clock_changed), which re-rates a sound
        // chip's stream: Gauntlet sets its TMS5220's pitch this way and
        // Berzerk its S14001A's speech rate. Only recorded, neither moved.
        // device_t::unscaled_clock: the clock before any scale, which here is
        // the clock (Pole Position's engine sound times its pitch by it).
        unscaled_clock: () => clock,
        // As device.cpp has it: nothing when the clock is unchanged, and the
        // notification only to a device that has started.
        set_unscaled_clock: (next: number) => {
          const changed = Math.trunc(Number(next));
          if (changed === clock) return 0;
          clock = changed;
          this.clock = clock;
          return this.deviceStarted && this.methods.has('device_clock_changed') ? this.call('device_clock_changed') : 0;
        },
        // device_t::owner(): the device that composed this one. A PIT8253's
        // counters reach their chip's out handlers and type through
        // `downcast<pit8253_device *>(owner())`.
        ...(options.owner !== undefined ? { owner: () => options.owner as number } : {}),
        name: () => definition.description ?? definition.type,
        stream_alloc: (inputs, outputs, requested) => {
          // SAMPLE_RATE_INPUT_ADAPTIVE, _OUTPUT_ADAPTIVE and _ADAPTIVE
          // (0xffffffff down to 0xfffffffd) take the rate of what the stream
          // connects to, which in this mix is the speaker's: the Game Boy
          // APU's and every FILTER_RC's. Read as a rate, they asked for four
          // billion samples a second.
          const rate = Number(requested) >= 0xfffffffd ? 48000 : Number(requested);
          if (rate > 0) this.members.__stream_rate = rate;
          const stream = new IrSoundStream(rate, this.bindings, Number(outputs), Number(inputs));
          stream.onRate = next => { this.members.__stream_rate = next; };
          this.soundStreams.push(stream);
          return stream as unknown as number;
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
        // device_memory_interface::has_configured_map: whether the owner gave
        // the space a map of its own. Nothing here configures one, so a device
        // maps its regions itself (the YM2610's ADPCM ROM).
        has_configured_map: index => options.configuredSpaces?.includes(Number(index)) ? 1 : 0,
        // device_memory_interface::has_space: a space memory_space_config
        // declared. AS_OPCODES is declared only when the owner maps it (the
        // 6800's `has_configured_map(AS_OPCODES) ? {program, opcodes} : {program}`).
        has_space: index => {
          const space = definition.spaces?.find(candidate => candidate.index === Number(index));
          if (!space) return 0;
          return (space.conditional || Number(index) === 3) && options.configuredSpaces?.includes(Number(index)) !== true ? 0 : 1;
        },
        // device_t::started(): the OKI asserts it before configuring PIN7.
        started: () => this.deviceStarted ? 1 : 0,
        // device_t::reset(), which a device calls on itself: a TMS5220C
        // resets when the board pulls its /RS (rsq_w). Only for a class with
        // no `reset` of its own: the call table answers before the method on
        // a board's effect, and namco_51xx_device::reset(int), which pulses
        // the MCU's reset line, reset the whole chip on every latch write
        // instead -- Xevious's 51xx answered late and its attract diverged.
        ...(definition.methods.some(method => method.name === 'reset') ? {} : {
          reset: () => { this.reset(); return 0; },
        }),
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
    // device_rom_interface is the device's own surface, reached through a
    // reference to it as well: each K053260 voice reads its samples with
    // `m_device.read_byte(...)`, which through `*this` answered 0.
    if (typeof self.set_unscaled_clock !== 'function') {
      self.set_unscaled_clock = (next: unknown) => (this.bindings.calls!.set_unscaled_clock as (next: unknown) => unknown)(next);
    }
    if (definition.romInterface && typeof self.read_byte !== 'function') {
      self.read_byte = (address: unknown) => (this.bindings.calls!.read_byte as (address: unknown) => unknown)(address);
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
        // A vector of objects: DISCRETE walks its node and buffer lists so.
        if (Array.isArray(value)) return value[index] ?? 0;
        if (isGeneratedPointer(value)) {
          return generatedPointerElement(value, index) ?? 0;
        }
        // A C string's characters are its bytes: `names()[0][0] == '*'`.
        if (typeof value === 'string') return value.charCodeAt(index) || 0;
        return (value as ArrayLike<unknown> | undefined)?.[index] ?? 0;
      },
      writeIndex: (value, index, next) => {
        if (isGeneratedPointer(value)) {
          setGeneratedPointerElement(value, index, Number(next));
        } else if (value && typeof value === 'object') {
          (value as Record<number, unknown>)[index] = next;
        }
        return next;
      },
      fieldAddress: generatedMemberAddress,
      cpp: GENERATED_CPP_EXCEPTIONS,
      objectAddress: generatedObjectAddress,
      packedWord: generatedPackedWord,
      swapObjects: generatedSwapObjects,
      // An array first: probing it for a pointer's tag is the slow case.
      addressOf: (value, index) => Array.isArray(value) || ArrayBuffer.isView(value)
        ? { generatedPointer: true, source: value as ArrayLike<number> & { [index: number]: number }, offset: index }
        // A pointer keeps what it points through (a union field's path).
        : isGeneratedPointer(value)
        ? (index === 0 ? value : { ...value, offset: value.offset + index })
        : {
          generatedPointer: true,
          source: value as ArrayLike<number> & { [index: number]: number },
          offset: index,
        },
      dereference: dereferenceGeneratedFast,
      pointerOffset: generatedPointerOffset,
      copyStruct: copyGeneratedStruct,
      packedView: generatedPackedView,
      byteView: generatedByteView,
      container: generatedContainerAccessor,
      vectorMethod: generatedVectorMethod,
      stringMethod: generatedStringCall,
      pointerStore: generatedPointerStore,
      add: generatedAdd,
      subtract: generatedSubtract,
      resize: resizeGeneratedContainer,
      attotime: (seconds: number, method: string, ...args: number[]) => attotimeSecondsMethod(seconds, method, args) ?? 0,
      // A device declares every member up front, so the container is already
      // there; the name-addressed form exists for the board, whose driver
      // members are materialised on first write.
      writableMember: name => this.members[name] ?? 0,
      synchronize: (callback, parameter) => generatedSynchronize(this.bindings, callback, parameter),
      wide: generatedWideBinary,
      low32: generatedLow32,
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
    // A device that executes reaches its own device_execute_interface. A
    // method of its own of the same name is that method: a Z80 CTC channel's
    // `trigger` is its trigger input, not the scheduler's.
    if (definition.methods.some(method => method.name === 'execute_run')) {
      const execute: Record<string, (...args: number[]) => number> = {
        abort_timeslice: () => { this.abortTimeslice(); return 0; },
        suspend_until_trigger: (trigger, eatcycles) => {
          this.suspension.next |= SUSPEND_REASON_TRIGGER;
          this.suspension.nextEat = Boolean(eatcycles);
          this.abortTimeslice();
          this.suspension.trigger = Number(trigger);
          return 0;
        },
        trigger: trigger => {
          this.abortTimeslice();
          if ((this.suspension.next & SUSPEND_REASON_TRIGGER) && this.suspension.trigger === Number(trigger)) {
            this.suspension.next &= ~SUSPEND_REASON_TRIGGER;
            this.suspension.trigger = 0;
          }
          return 0;
        },
      };
      for (const [name, call] of Object.entries(execute)) {
        if (!this.methods.has(name) && !options.calls?.[name]) this.bindings.calls![name] = call;
      }
    }
    const pendingTimers = [...this.timers.values()];
    this.bindings.calls!.timer_alloc = () => pendingTimers.shift()?.timer ?? 0;
    // A struct local with no initializer, built from its declaration
    // (device-compiler lowerStructLocals): `cbm_crt_header header;`. With
    // arguments it is built through the constructor of that arity instead:
    // the slapstic's `test(mask, value)`.
    const structOf = (type: unknown, ...args: unknown[]): unknown => {
      const fields = definition.structs?.[String(type)];
      if (!fields) return 0;
      const struct = structMember(fields, definition.structs, String(type));
      // What its constructor sets up (device-compiler structMethodsOf).
      const construct = (struct as Record<string, unknown>)[args.length ? `__construct_${args.length}` : '__construct'];
      if (typeof construct === 'function') construct.apply(struct, args);
      return struct;
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
      // As a C++ call converts them: an 8- or 16-bit value parameter (see
      // NARROW_PARAMETER in device-codegen.ts, which the emitted body applies).
      this.methodNarrowing.set(method, parameters.map(parameterNarrowing));
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
      // device_slot_interface::default_option(): the card the machine config
      // fits. Neo Geo's fixed cartridge slot hands it to set_cart_type, which
      // names the PCB by comparing it against its own table.
      const configured = String(options.slot ?? definition.slot.default ?? '');
      this.bindings.calls!.default_option = () => configured as never;
      (this.members.this as Record<string, unknown>).default_option ??= () => configured;
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
      // A `required_device_array` is one child per element, the member the
      // array of them: the Z80 CTC's four channels.
      const tags = child.tags ?? [child.tag ?? child.member.replace(/^m_/, '')];
      // A child the board holds as a device of its own is that device, not a
      // second copy: Galaxian's sound board finds the DISCRETE the board
      // built with its table and mixes on the speaker.
      const held = !child.tags ? options.heldChild?.(`${this.ownTag}:${tags[0]}`) : undefined;
      if (held) {
        this.members[child.member] = held;
        const heldDevice = options.heldDevice?.(`${this.ownTag}:${tags[0]}`);
        if (heldDevice) this.bindChildCallbacks(heldDevice, child);
        continue;
      }
      const handles = tags.map((tag, index) => {
        const instance = new IrDevice(child.definition, child.clock ?? clock, {
          ...resourceOptions,
          owner: this.members.this,
          // Tagged below this device, as MAME tags it: the VRC7's DS1001 is
          // `nes_slot:vrc7:vrc7snd`, and its instrument ROM region
          // `nes_slot:vrc7:vrc7snd:internal`.
          deviceTag: `${this.ownTag}:${tag}`,
          slot: undefined,
          // The owner's machine-config setters are the owner's: pit8253's
          // `set_clk<N>` is not its counters'.
          configure: undefined,
          // What device_add_mconfig set on this one (`m_channel[ch]->m_index = ch`).
          members: child.configured?.[index],
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
        this.childSpecs.push(child);
        const callable: Record<string, unknown> = Object.fromEntries(
          instance.methodNames().map(name => [
            name,
            (...args: GeneratedCallArgument[]) => instance.preparedCall(name)(...args),
          ]),
        );
        // And the image interface the host answers for it: the ZX Interface 2
        // asks its own GENERIC_CARTSLOT `m_cart->exists()` before every read.
        const self = instance.instance() as Record<string, unknown>;
        for (const [name, value] of Object.entries(self)) {
          if (typeof value === 'function' && !Object.hasOwn(callable, name)) callable[name] = value;
        }
        // An owner reads and writes its children's state as well as calling
        // them: the CTC's daisy-chain methods walk `m_channel[ch]->m_int_state`
        // and acknowledge through `channel.m_int_state = Z80_DAISY_IEO`. Not
        // enumerable: the child's state is saved with the child.
        for (const member of child.definition.members) {
          if (Object.hasOwn(callable, member.name)) continue;
          Object.defineProperty(callable, member.name, {
            enumerable: false, configurable: true,
            get: () => self[member.name],
            set: value => { self[member.name] = value; },
          });
        }
        // What each method declares, for an address map that names one of
        // them by device (`.w(m_apu, FUNC(nesapu_device::write))`).
        Object.defineProperty(callable, DEVICE_PARAMETERS, { value: (name: string) => instance.parameters(name) });
        this.bindChildCallbacks(instance, child);
        return { instance, callable };
      });
      this.members[child.member] = child.tags ? handles.map(handle => handle.callable) : handles[0]!.callable;
      if (targets.length) for (const { instance } of handles) instance.startDeferred();
    }

    // `device_delegate::isnull()`: set exactly when something bound it. The
    // generic cartridge slot loads through its owner's delegate when there is
    // one and reads the ROM itself when there is not.
    // And `device_delegate::resolve_safe(dflt)` (devdelegate.h): a delegate
    // nothing bound becomes MAME's default, a call answering `dflt` (or
    // nothing, for a void one). The 8085 resolves its optional CLK output so
    // and calls it from device_start whether or not a driver set_clk_out it.
    // device_execute_interface::set_input_line by the device itself,
    // unqualified: the RP2A03's apu_irq is `set_input_line(APU_IRQ_LINE, ...)`.
    // A board hosting it as a processor rebinds this to its own line delivery.
    if (definition.methods.some(method => method.name === 'execute_set_input')) {
      this.bindings.calls!.set_input_line ??= (line: unknown, state: unknown) =>
        this.call('execute_set_input', Number(line), Number(state));
    }
    // `required_shared_ptr::set_tag(tag)` from the machine configuration (the
    // 315-5177's set_decrypted_tag): the finder now names that share.
    for (const member of definition.members) {
      if (member.memory?.kind !== 'shared') continue;
      this.bindings.calls![`${member.name}.set_tag`] ??= (tag: unknown) => {
        const named = String(tag ?? '').replace(/^\^+/, '').replace(/^:/, '');
        const bytes = options.shares?.[`${options.tag}:${named}`] ?? options.shares?.[named];
        if (!bytes) throw new Error(`${this.definition.type}: ${member.name}.set_tag names no share "${named}"`);
        this.members[member.name] = generatedMemoryArray(member.memory!.elementBytes, bytes);
        return 0;
      };
    }
    // A reference-returning method's setter (the compiler's `regop8=`), which
    // an assignment to the call's result runs (execute.ts assignCallResult).
    for (const method of definition.methods) {
      if (method.name.endsWith('=') && !method.name.includes('::')) {
        this.bindings.calls![method.name] ??= (...args: unknown[]) => {
          const selected = this.selectMethod(method.name, args as GeneratedCallArgument[])!;
          return this.executeMethod(selected, this.methodParams.get(selected)!, args as GeneratedCallArgument[]);
        };
      }
    }
    for (const delegate of this.delegateNames) {
      this.bindings.calls![`${delegate}.isnull`] ??= () => this.bindings.calls![delegate] ? 0 : 1;
      // `device_delegate::set(nullptr)`: unbound again, as the NES PPU's
      // device_config_complete leaves its scanline, hblank and latch
      // delegates for a cartridge to set when it starts.
      this.bindings.calls![`${delegate}.set`] ??= (target: unknown) => {
        if (typeof target === 'function') this.bindings.calls![delegate] = target as (...args: unknown[]) => unknown;
        else if (!target) delete this.bindings.calls![delegate];
        else throw new Error(`${this.definition.type}: ${delegate}.set with a ${typeof target}`);
        this.refreshCallLinks();
        return 0;
      };
      this.bindings.calls![`${delegate}.resolve_safe`] ??= (...dflt: unknown[]) => {
        if (!this.bindings.calls![delegate]) {
          const result = dflt.length ? Number(dflt[0]) : 0;
          this.bindings.calls![delegate] = () => result;
          this.refreshCallLinks();
        }
        return 0;
      };
    }
    // Every binding the constructor installs is in place; resolve the links
    // the emitted methods read before any of them can run.
    this.refreshCallLinks();
    if (definition.construct) this.invoke(definition.construct, ...(options.constructorArgs ?? []));
    if (definition.clockConstructor) this.invoke(definition.clockConstructor.method, 0, 0, 0, constructorArgument);
    options.configure?.(this);
    // device_t::config_complete, which MAME runs on every device once the
    // machine configuration is complete and before anything starts. The 8085
    // resolves its CLK output delegate there and drives it with clock() / 2.
    // (A floppy drive runs it as its constructor: floppy-compiler.ts.)
    if (definition.construct !== 'device_config_complete' && this.methods.has('device_config_complete')) {
      this.call('device_config_complete');
    }
    const start = (): void => {
      // device_t::resolve_objects, which MAME runs once every device exists
      // and before any starts: pit8253 sets each counter's index, clock and
      // period there. Never run, Venture's PIT counted at no clock at all.
      if (this.methods.has('device_resolve_objects')) this.call('device_resolve_objects');
      if (definition.start) this.call(definition.start);
      this.deviceStarted = true;
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
      if (!options.holdReset) this.reset();
    };
    if (options.deferStart) this.pendingStart = start;
    else start();
  }

  /** device_start held back by `deferStart`, run once when the host is ready. */
  private pendingStart?: () => void;
  /** device_t::started(): set once device_start has run. */
  private deviceStarted = false;

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
    const found: { tag: string; device: Device; gain: number }[] = [];
    this.children.forEach((instance, index) => {
      const child = this.childSpecs[index]!;
      const route = child.routes?.find(candidate => candidate.output === -1 || candidate.output === 0);
      if (route && route.gain > 0 && instance.methods.has('sound_stream_update')) {
        found.push({ tag: instance.ownTag, device: instance, gain: route.gain });
      }
      found.push(...instance.streamDescendants());
    });
    if (this.slotChild) found.push(...this.slotChild.streamDescendants());
    return found;
  }

  reset(): void {
    this.executedCycles = 0;
    this.runningCycles = undefined;
    // interface_pre_reset: a clocked device resumes, from the next round.
    if (this.clock !== 0) this.suspension.next = 0;
    // device_t::reset: the device, then its subdevices, then
    // device_reset_after_children, then its interfaces' post-reset work.
    if (this.definition.reset) this.call(this.definition.reset);
    // Its subdevices come after the device itself. The card in a slot is one:
    // an Ocean cartridge's device_reset puts it back on bank 0, so a reset
    // machine restarts from the cartridge's own entry rather than whichever
    // bank it last switched to.
    for (const child of this.children) child.reset();
    this.slotChild?.reset();
    // The Z80 CTC raises or drops its interrupt only once its channels are
    // reset (interrupt_check), and a daisy device forgets a half-decoded RETI.
    if (this.methods.has('device_reset_after_children')) this.call('device_reset_after_children');
    if (this.methods.has('interface_post_reset')) this.call('interface_post_reset');
  }

  /**
   * Save-state roots (machine-state.ts): everything the device's MAME source
   * declared or allocated, and the composition it owns. The definition,
   * bindings, listeners and resolved call links are wiring.
   */
  stateKeys(): readonly string[] {
    // accessToBeRedone is cpu_device state a core reads back on its next
    // slice: an access the 68000's VPA sync deferred is redone after a load.
    return ['members', 'timers', 'spaces', 'executedCycles', 'suspension', 'streamSamples', 'children', 'slotChild', 'executionContext', 'accessToBeRedone'];
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
          throw new Error(`${this.definition.type} timer ${entry.name}: ${error.message}`, { cause: error });
        }
        throw error;
      }
    }
    // A device built out of other devices has to advance them too: the board
    // only knows the devices its own machine config names. Pitfall II's DPC
    // coprocessor sits two levels down -- cartridge slot, then mounted PCB --
    // and its 18400 Hz oscillator drives the chip's random-number and music
    // counters, so without this it is frozen while everything else runs.
    const children = this.children;
    for (let index = 0; index < children.length; index++) children[index]!.tick(seconds);
    this.slotChild?.tick(seconds);
  }

  /**
   * MAME calls `device_post_load` on every device once a state is loaded, so
   * a device can rebuild what save_item cannot hold. The SID's is the
   * clearest: each voice's waveform routine is a function pointer, chosen
   * from the registers by `postload()`, and without it a voice kept running
   * whichever routine it had when the save was loaded over it.
   */
  /**
   * MAME calls `device_pre_save` on every device before a state is saved, so
   * a device can put into saved members what it otherwise holds as wiring:
   * the slapstic records which state object `m_state` points at.
   */
  preSave(): void {
    if (this.methodNames().includes('device_pre_save')) this.invoke('device_pre_save');
    for (const child of this.children) child.preSave();
    this.slotChild?.preSave();
  }

  postLoad(): void {
    if (this.methodNames().includes('device_post_load')) this.invoke('device_post_load');
    for (const child of this.children) child.postLoad();
    this.slotChild?.postLoad();
  }

  needsTick(): boolean {
    return this.timers.size > 0 || this.children.some(child => child.needsTick()) ||
      Boolean(this.slotChild?.needsTick());
  }

  untilNextTimer(): number {
    let soonest = Infinity;
    const entries = this.timerEntries;
    for (let index = 0; index < entries.length; index++) {
      const until = entries[index]!.timer.untilExpiry();
      if (until < soonest) soonest = until;
    }
    const children = this.children;
    for (let index = 0; index < children.length; index++) {
      const until = children[index]!.untilNextTimer();
      if (until < soonest) soonest = until;
    }
    if (this.slotChild) {
      const until = this.slotChild.untilNextTimer();
      if (until < soonest) soonest = until;
    }
    return soonest;
  }

  call(name: string, ...args: number[]): number {
    return Number(this.preparedCall(name)(...args)) || 0;
  }

  /** cpu_device::m_access_to_be_redone. */
  private accessToBeRedone = false;
  /** cpu_device::m_access_before_delay_tag: the access whose delay has been paid. */
  private accessBeforeDelayTag: unknown;

  /** device_execute_interface::total_cycles(), mid-slice included. */
  totalCyclesNow(): number {
    return this.executedCycles + (this.runningCycles === undefined ? 0 : this.runningCycles - Number(this.members.m_icount));
  }

  /** cpu_device::defer_access: the access waits for the next slice. */
  deferAccess(): void {
    if (Number(this.members.m_icount) > 0) this.members.m_icount = 0;
    this.accessToBeRedone = true;
  }

  /** cpu_device::access_before_time: wait until `access`, or defer when the slice cannot. */
  accessBeforeTime(access: number, current: number): boolean {
    const delta = (access - current) | 0;
    if (Number(this.members.m_icount) <= delta) {
      this.deferAccess();
      return true;
    }
    this.members.m_icount = Number(this.members.m_icount) - delta;
    return false;
  }

  /** cpu_device::access_before_delay: pay `cycles` once per access, deferring when they run out. */
  accessBeforeDelay(cycles: number, tag: unknown): boolean {
    if (tag === this.accessBeforeDelayTag) {
      this.accessBeforeDelayTag = undefined;
      return false;
    }
    this.members.m_icount = Number(this.members.m_icount) - cycles;
    if (Number(this.members.m_icount) <= 0) {
      this.accessBeforeDelayTag = tag;
      this.accessToBeRedone = true;
      return true;
    }
    return false;
  }

  /** cpu_device::access_after_delay. */
  accessAfterDelay(cycles: number): void {
    this.members.m_icount = Number(this.members.m_icount) - cycles;
  }

  runCycles(cycles: number): number {
    // Suspended, MAME runs nothing; one that eats cycles is charged anyway.
    if (this.suspension.now) {
      const charged = this.suspension.eat ? cycles : 0;
      this.executedCycles += charged;
      return charged;
    }
    if (!this.executeEntry) this.connectCall('execute_run', call => { this.executeEntry = call; });
    this.members.m_icount = cycles;
    this.runningCycles = cycles;
    let ran = cycles;
    try {
      this.executeEntry!();
    } finally {
      // An abort_timeslice took back what was left (runningCycles).
      ran = this.runningCycles! - Number(this.members.m_icount);
      this.executedCycles += ran;
      this.runningCycles = undefined;
    }
    return ran;
  }

  applySuspendChanges(): void {
    this.suspension.now = this.suspension.next;
    this.suspension.eat = this.suspension.nextEat;
  }

  suspended(): 'eating' | 'waiting' | undefined {
    if (!this.suspension.now) return undefined;
    return this.suspension.eat ? 'eating' : 'waiting';
  }

  /**
   * MAME device_execute_interface::abort_timeslice: the executing device
   * swallows what is left of its slice, so the slice ends where it stopped.
   * Any other device's is not running, and is left alone.
   */
  abortTimeslice(): void {
    if (this.runningCycles === undefined) return;
    const left = Number(this.members.m_icount);
    if (left > 0) {
      this.runningCycles -= left;
      this.members.m_icount = 0;
    }
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
    if (!method) {
      // `&holder->space(AS_PROGRAM)`: the address of what a call answers by
      // reference. An object's address is the object here, so the Game Boy
      // PPU's `m_program_space = &m_lr35902->space(AS_PROGRAM)` holds the
      // compiled core's own bound space.
      if (name.endsWith('&') && name.length > 1) {
        const base = name.slice(0, -1);
        if (this.bindings.calls?.[base] || this.selectMethod(base, args)) {
          const value = this.invoke(base, ...args);
          if (value !== null && typeof value === 'object') return value;
        }
      }
      throw new Error(`${this.definition.type} has no generated method "${name}"`);
    }
    return this.executeMethod(method, this.methodParams.get(method)!, args);
  }

  private readonly preparedCalls = new Map<string, (...args: GeneratedCallArgument[]) => unknown>();
  private readonly methodNarrowing = new WeakMap<DeviceMethod, (((value: number) => number) | undefined)[]>();

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
    if (!compiled || methods?.length !== 1) {
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
        scalarArguments && !this.bindings.calls?.[name]
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

  suspendsMidInstruction(): boolean {
    return this.definition.suspendsMidInstruction === true;
  }

  /**
   * A child's devcbs this device `.set()` to its own methods in
   * device_add_mconfig (`m_apu->irq().set(FUNC(rp2a03_device::apu_irq))`),
   * called as MAME's devcb adapter calls a handler: a write with the data it
   * takes (and the offset, when it takes two), a read with the offset when it
   * takes one, a line with its state.
   */
  private bindChildCallbacks(child: Device, spec: NonNullable<GeneratedDeviceDefinition['children']>[number]): void {
    for (const [signal, method] of Object.entries(spec.callbackTargets ?? {})) {
      const member = spec.definition.callbacks.find(callback => callback.signal === signal)?.member;
      const reading = /\bdevcb_read/.test(spec.definition.members.find(candidate => candidate.name === member)?.valueType ?? '');
      const declared = this.parameters(method).filter(parameter => parameter && parameter !== 'void').length;
      child.on(signal, (...args: number[]) => {
        if (reading) return Number(this.invoke(method, ...args.slice(0, declared))) || 0;
        const data = args.length >= 2 ? args[1]! : args[0] ?? 0;
        this.invoke(method, ...(declared >= 2 ? [args.length >= 2 ? args[0]! : 0, data] : declared === 1 ? [data] : []));
        return undefined;
      });
    }
  }

  /**
   * MAME's device_state_interface: a state_add entry by index, read through
   * the generated reader after the core's state_export when `.callexport()`
   * asked for one, and masked as `.mask(n)` says. Undefined when the core
   * publishes no such index.
   */
  stateInt(index: number): number | undefined {
    const entry = this.definition.stateEntries?.find(candidate => candidate.index === index);
    if (!entry) return undefined;
    if (entry.export && this.methods.has('state_export')) this.invoke('state_export', stateEntryHandle(entry.index));
    const value = Number(this.call(entry.read)) || 0;
    return entry.mask === undefined ? value : value & entry.mask;
  }

  /** set_state_int: written through the generated writer, then the core's state_import when `.callimport()` asked. */
  setStateInt(index: number, value: number): boolean {
    const entry = this.definition.stateEntries?.find(candidate => candidate.index === index);
    if (!entry) return false;
    this.call(entry.write, entry.mask === undefined ? value : value & entry.mask);
    if (entry.import && this.methods.has('state_import')) this.invoke('state_import', stateEntryHandle(entry.index));
    return true;
  }

  /** The image-interface setters the host keeps (see hostImageFile). */
  private readonly hostSettings: Record<string, readonly unknown[]> = {};

  configureHost(method: string, args: readonly unknown[]): boolean {
    if (method !== 'set_user_loadable' || !this.readsOwnFile()) return false;
    this.hostSettings[method] = args.map(Number);
    return true;
  }

  /** Every stream the device allocated, in `stream_alloc` order. */
  streams(): readonly IrSoundStream[] {
    return this.soundStreams;
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

  /** The member a share finder of this tag binds: `required_shared_ptr<u8> m_dataptr(*this, "data")`. */
  sharedMember(tag: string): unknown {
    const member = this.definition.members.find(candidate => candidate.memory?.kind === 'shared' && candidate.memory.share === tag);
    return member ? this.members[member.name] : undefined;
  }

  /** One of the device's own address spaces, a mapped one built on first use. */
  private deviceSpace(index: number): GeneratedDeviceSpace | undefined {
    const existing = this.spaces.get(index);
    if (existing) return existing;
    const config = this.definition.spaces?.find(space => space.index === index);
    if (!config?.map) return undefined;
    if (config.dataBits > 8 && (config.addressShift ?? 0) >= 0) {
      // A wide map addressed in bytes or bits (the TMS34010's I/O registers,
      // io_register_r/w at bit address 0xc0000000): its word handlers are
      // called once per word, the owner's bus under the rest of the space.
      const inner = mappedDeviceSpace(this, config.addressBits, config.map, this.regionLookup, 1, config);
      const space = withSpaceConfig(inner, config.addressBits);
      bindWideSpace(space, config, inner.read_byte, (address, data) => { inner.write_byte(address, data); }, inner);
      this.spaces.set(index, space);
      return space;
    }
    if (config.dataBits > 8) {
      // A 16-bit internal map (the TMS320C10's data RAM, word-addressed):
      // built over bus bytes, with the space's word access composed from them.
      const unit = 2 ** Math.max(0, -(config.addressShift ?? 0));
      const inner = mappedDeviceSpace(this, config.addressBits, config.map, this.regionLookup, unit);
      const byteRead = inner.read_byte;
      const byteWrite = inner.write_byte;
      const little = config.endianness === 'little';
      const space = withSpaceConfig(inner, config.addressBits);
      bindWideSpace(space, config, byteRead, (address, data) => { byteWrite(address, data); }, {
        read16: address => little ? (byteRead(address) | (byteRead(address + 1) << 8)) & 0xffff
          : ((byteRead(address) << 8) | byteRead(address + 1)) & 0xffff,
        write16: (address, data) => {
          byteWrite(address, little ? data & 0xff : data >>> 8);
          byteWrite(address + 1, little ? data >>> 8 : data & 0xff);
        },
      });
      this.spaces.set(index, space);
      return space;
    }
    const space = withSpaceConfig(mappedDeviceSpace(this, config.addressBits, config.map, this.regionLookup), config.addressBits, config);
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
    // What the board binds is the device's own interface, reached through
    // `*this` as well: konami_decode_gfx takes the K053246 as
    // `device_gfx_interface &gfxdecode` and calls its palette() and set_gfx().
    const self = this.members.this as Record<string, unknown> | undefined;
    if (self && /^\w+$/.test(name) && !Object.hasOwn(self, name)) {
      self[name] = (...args: unknown[]) => (this.bindings.calls![name] as (...values: unknown[]) => unknown)(...args);
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

  spaceIndices(): readonly number[] {
    return (this.definition.spaces ?? []).map(space => space.index);
  }

  spaceConfig(index: number): { dataBits: number; addressBits: number; endianness?: 'big' | 'little'; addressShift?: number } | undefined {
    return this.definition.spaces?.find(space => space.index === index);
  }

  bindAddressSpace(index: number, read: (address: number) => number,
    write: (address: number, data: number) => void, wide?: WideSpaceAccess): void {
    const config = this.definition.spaces?.find(space => space.index === index);
    if (config && config.dataBits > 8 && config.map) {
      // The owner's map is the rest of a wide internal map's space, its words
      // reaching the owner's word access.
      const mapped = this.deviceSpace(index) as (GeneratedDeviceSpace & { fallback?: { read(address: number): number; write(address: number, data: number): void; wide?: WideSpaceAccess } }) | undefined;
      if (mapped) mapped.fallback = { read, write, ...(wide ? { wide } : {}) };
      return;
    }
    if (config && config.dataBits > 8 && !config.map) {
      const space = this.spaces.get(index);
      if (!space || !wide) throw new Error(`${this.definition.type}: space ${index} is ${config.dataBits} bits wide and its owner gives no word access`);
      bindWideSpace(space, config, read, write, wide);
      return;
    }
    // A space with an internal map of its own (a 6801's ports, timer and
    // RAM): the owner's map is the rest of it. MAME builds the internal map
    // first, so it takes priority (address_map's constructor).
    if (config?.map && config.dataBits === 8) {
      const mapped = this.deviceSpace(index) as (GeneratedDeviceSpace & { fallback?: { read(address: number): number; write(address: number, data: number): void } }) | undefined;
      if (mapped) {
        mapped.fallback = { read, write };
        interruptible(mapped);
        return;
      }
    }
    const space = this.spaces.get(index);
    if (!config || !space || config.dataBits !== 8) {
      throw new Error(`${this.definition.type}: no supported byte address space ${index}`);
    }
    const mask = 2 ** config.addressBits - 1;
    space.read_byte = address => read(address & mask);
    space.write_byte = (address, data) => { write(address & mask, data & 0xff); return 0; };
    interruptible(space);
  }

  dataAddressBits(): number | undefined {
    return this.definition.dataAddressBits;
  }

  hostedCalls(): Readonly<Record<string, (...args: never[]) => unknown>> {
    // device_memory_interface::space(n), which the owner's driver reaches
    // through its finder: Neo Geo's init_ym takes `m_ym->space(0)` and
    // installs the cartridge's ADPCM ROM there.
    if (this.definition.spaces?.length && !this.hostedSurface.space) {
      this.hostedSurface.space = ((index: number) => this.deviceSpace(Number(index)) ?? 0) as (...args: never[]) => unknown;
    }
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
      // device_image_interface's own default, unless the machine config
      // says set_user_loadable(false): Neo Geo's fixed cartridge socket, read
      // from its regions rather than a loaded image. The generic cartridge
      // slot reads a user-loaded ROM, not its region, on this answer.
      user_loadable: () => this.hostSettings.set_user_loadable?.[0] === 0 ? 0 : 1,
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
   *
   * False when there is nothing to run: no card is mounted, or its PCB has no
   * installer of its own, so the slot decodes nothing extra -- what an empty
   * slot does. Anything the installer itself throws is a real failure and
   * propagates (#190).
   */
  installSlotCard(space: unknown): boolean {
    const install = this.definition.slot?.install ??
      { method: 'install_memory_handlers' as const, space: undefined };
    const card = this.slotChild;
    if (!card || !(card.bindings.calls?.[install.method] || card.methods.has(install.method))) return false;
    if (!install.space) {
      card.invoke(install.method, space as GeneratedCallArgument);
      return true;
    }
    card.installSpace = space;
    try {
      card.invoke(install.method, 0);
    } finally {
      card.installSpace = undefined;
    }
    // MAME resets after mounting an image -- a cartridge slot's
    // `is_reset_on_load()` is true -- and a PCB's power-on bank positions are
    // set by its own device_reset. Run at construction, before the card had
    // configured any banks, that reset selected entries on banks that did not
    // exist yet: an MBC1 came up with both ROM windows on page 0 instead of
    // pages 0 and 1, so every cartridge larger than 32 KiB read its first page
    // twice.
    card.reset();
    return true;
  }

  private executeMethod(
    method: DeviceMethod,
    parameterNames: string[],
    args: GeneratedCallArgument[],
  ): unknown {
    try {
      const defaults = this.methodDefaults.get(method);
      // Compiled methods are keyed by name, so an overloaded name has one body
      // for all its overloads: the one selected runs from its own program.
      // atarimo's sprite_parameter::set(entry) and set(uint16_t[4]) both ran
      // the first, and every motion-object mask stayed zero.
      const compiled = (this.methods.get(method.name)?.length ?? 0) > 1
        ? undefined : this.definition.compiledMethods?.[method.name];
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
      const narrowing = this.methodNarrowing.get(method);
      for (let index = 0; index < parameterNames.length; index++) {
        const argument = args[index] ?? defaults?.[index] ?? 0;
        const narrow = narrowing?.[index];
        locals[parameterNames[index]!] = narrow && typeof argument === 'number' ? narrow(argument) : argument;
      }
      const value = executeGeneratedProgram(method.program, this.bindings, locals).value;
      // C++ converts the result to the declared return type, as emitted code does.
      return method.returnWidth && typeof value === 'number' ? generatedFieldWidth(value, method.returnWidth) : value;
    } catch (error) {
      // A C++ exception goes on as itself, for a caller's catch to take:
      // Musashi's bus access throws an address error out of an opcode
      // handler to execute_run's `catch (int error)`.
      if (GENERATED_CPP_EXCEPTIONS.isThrow(error)) throw error;
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
    // Same arity: the overload whose parameters take these arguments, as C++
    // picks by type. atarimo's sprite_parameter has `set(const entry &)`,
    // which calls `set(input.data)`, beside `set(const uint16_t input[4])`;
    // taking the last for both made the first call itself forever.
    if (exact.length > 1) {
      // By declaration: methodParams holds only the parameters' names.
      const fitting = exact.filter(method => splitParameters(method.parameters)
        .every((parameter, index) => argumentFits(parameter, args[index])));
      if (fitting.length) return fitting.at(-1);
    }
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

/**
 * A struct's methods by name. Overloads share a name, and C++ picks one by its
 * arguments: atarimo's `sprite_parameter::set(const entry &)` forwards to
 * `set(const uint16_t input[4])`, and keying the table by name alone left only
 * the last, so the forward called itself until the stack ran out.
 */
function structOverloads(
  methods: readonly { name: string; parameters: string }[],
  entries: readonly [string, (this: Record<string, unknown>, ...args: unknown[]) => unknown][],
): Record<string, (this: Record<string, unknown>, ...args: unknown[]) => unknown> {
  const table: Record<string, (this: Record<string, unknown>, ...args: unknown[]) => unknown> = {};
  const byName = new Map<string, number[]>();
  methods.forEach((method, index) => byName.set(method.name, [...(byName.get(method.name) ?? []), index]));
  for (const [name, indices] of byName) {
    if (indices.length === 1) { table[name] = entries[indices[0]!]![1]; continue; }
    const candidates = indices.map(index => ({
      parameters: splitParameters(methods[index]!.parameters),
      call: entries[index]![1],
    }));
    table[name] = function (this: Record<string, unknown>, ...args: unknown[]): unknown {
      const sameArity = candidates.filter(candidate => candidate.parameters.length === args.length);
      const chosen = sameArity.filter(candidate =>
        candidate.parameters.every((parameter, index) => argumentFits(parameter, args[index]))).at(-1) ??
        sameArity.at(-1) ?? candidates.at(-1)!;
      return chosen.call.apply(this, args);
    };
  }
  return table;
}

/**
 * Whether a call argument suits a declared parameter, for choosing between
 * overloads of one arity: a pointer or array takes memory, a struct taken by
 * reference takes a struct, and a builtin scalar takes a number.
 */
function argumentFits(parameter: string, argument: unknown): boolean {
  const value = argument && typeof argument === 'object' && (argument as { generatedLValue?: boolean }).generatedLValue
    ? (argument as { get(): unknown }).get()
    : argument;
  const declared = parameter.replace(/=[\s\S]*$/, '').trim();
  const memory = Array.isArray(value) || ArrayBuffer.isView(value) ||
    Boolean(value && typeof value === 'object' && (value as { generatedPointer?: boolean }).generatedPointer);
  if (/\*|\[/.test(declared)) return memory;
  const struct = Boolean(value && typeof value === 'object' && !memory);
  const type = declared.replace(/\b(?:const|volatile)\b/g, '').replace(/&/g, '').trim().split(/\s+/).slice(0, -1).join(' ');
  if (/^(?:bool|char|short|int|long|unsigned|signed|float|double|u?int\d+_t|[us]\d+|offs_t|size_t)(?:\s+\w+)*$/.test(type)) {
    return typeof value === 'number' || typeof value === 'boolean';
  }
  return struct;
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
  // `^maincpu` from a cartridge card names its slot's region, `cslot1:maincpu`.
  const relative = /^[\^:]/.test(resourceName) && (options.deviceTag ?? options.tag)
    ? mameSubtag(options.deviceTag ?? options.tag ?? '', resourceName)
    : undefined;
  const subtag = relative ?? (own && resourceName !== 'self' ? `${own}:${resourceName}` : undefined);
  const regionName = resourceName === 'self'
    ? options.tag ?? ''
    : subtag && regions[subtag] ? subtag : resourceName;
  if (resource.kind === 'region') {
    const bytes = regions[regionName] ?? new Uint8Array(0);
    const width = resource.elementBytes;
    if (!width || bytes.byteOffset % width) return bytes;
    // The same reinterpreting view a `u16 *` cast makes, which reads a
    // 68000's big-endian region (ROM_REGION16_BE) word by word as MAME's
    // byte-swapped copy does. Read in the host's order instead, System 16's
    // sprite rows missed their end-of-row nibble and drew three times over.
    // A region is ROM, so its big-endian words are decoded once into a real
    // Uint16Array rather than through the per-read Proxy a writable
    // big-endian view needs: read through the Proxy, shinobi's sprite loop
    // took minutes a frame.
    const view = (width === 2 && isBigEndianWords(bytes)
      ? Uint16Array.from({ length: bytes.length >>> 1 }, (_, index) => (bytes[index * 2]! << 8) | bytes[index * 2 + 1]!)
      : generatedPackedView(bytes, width === 2 ? false : 'u32')) as object;
    // `bytes()` is the region's size in bytes, whatever the element width.
    Object.defineProperty(view, 'bytes', { value: () => bytes.byteLength, configurable: true });
    return view;
  }
  // MAME's `memory_region *`. A device that is handed one asks it three
  // questions -- how big, where does it start, give me the bytes -- and a
  // missing region answers as a null pointer does, which is what lets a
  // cartridge with no save RAM take MAME's own "no NVRAM" branch.
  if (resource.kind === 'region-object') return memoryRegionObject(regions[regionName]);
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
  /** Row pitch and first pixel: a bitmap wrapped over another's memory has its own. */
  private pitch = 0;
  private base = 0;
  private readonly storage: Uint32ArrayConstructor | Uint16ArrayConstructor | Uint8ArrayConstructor;

  constructor(valueType: string) {
    this.storage = /_ind8$/.test(valueType)
      ? Uint8Array
      : /_ind16$/.test(valueType)
        ? Uint16Array
        : Uint32Array;
    this.pixels = new this.storage(0);
  }

  /**
   * bitmap_t(base, width, height, rowpixels): a view over memory another
   * bitmap owns. sprite.h's draw_async wraps its own bitmap, offset by the
   * sprite origin, and draws through the view.
   */
  static wrap(valueType: string, base: unknown, width: number, height: number, rowpixels: number): GeneratedBitmap {
    const bitmap = new GeneratedBitmap(valueType);
    const pointer = base as { generatedPointer?: boolean; source?: unknown; offset?: number };
    if (pointer?.generatedPointer && ArrayBuffer.isView(pointer.source)) {
      bitmap.pixels = pointer.source as Uint32Array | Uint16Array | Uint8Array;
      bitmap.base = Number(pointer.offset ?? 0);
    }
    bitmap.bitmapWidth = Math.max(0, width | 0);
    bitmap.bitmapHeight = Math.max(0, height | 0);
    bitmap.pitch = Math.max(0, rowpixels | 0);
    return bitmap;
  }

  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] {
    return ['bitmapWidth', 'bitmapHeight', 'pitch', 'base', 'pixels'];
  }

  stateResizable(): readonly string[] {
    return ['pixels'];
  }

  allocate(width: number, height: number): void {
    this.bitmapWidth = Math.max(0, width | 0);
    this.bitmapHeight = Math.max(0, height | 0);
    this.pitch = this.bitmapWidth;
    this.base = 0;
    this.pixels = new this.storage(this.bitmapWidth * this.bitmapHeight);
  }

  width(): number {
    return this.bitmapWidth;
  }

  height(): number {
    return this.bitmapHeight;
  }

  /**
   * bitmap_t::resize: sprite.h's draw_async grows its bitmap to the cliprect
   * it is asked for (the slop is MAME's guard border, which ours needs not).
   */
  resize(width: number, height: number): void {
    if ((width | 0) !== this.bitmapWidth || (height | 0) !== this.bitmapHeight) this.allocate(width, height);
  }

  /** bitmap_t::rowpixels: the row pitch, which without MAME's slop border is the width. */
  rowpixels(): number {
    return this.pitch;
  }

  /** bitmap_t::cliprect: the whole bitmap. */
  cliprect(): GeneratedRectangle {
    return new GeneratedRectangle(0, this.bitmapWidth - 1, 0, this.bitmapHeight - 1);
  }

  /** bitmap_t::fill, of the whole bitmap or a rectangle of it. */
  fill(value: number, rect?: { min_x: number; max_x: number; min_y: number; max_y: number }): void {
    const narrowed = Number(value) >>> 0;
    if (!rect) { this.pixels.fill(narrowed); return; }
    const left = Math.max(0, rect.min_x | 0), right = Math.min(this.bitmapWidth - 1, rect.max_x | 0);
    const top = Math.max(0, rect.min_y | 0), bottom = Math.min(this.bitmapHeight - 1, rect.max_y | 0);
    if (right < left) return;
    for (let row = top; row <= bottom; row++) {
      this.pixels.fill(narrowed, this.base + row * this.pitch + left, this.base + row * this.pitch + right + 1);
    }
  }

  /** MAME bitmap_t::plot_box, clipped to this bitmap's bounds. */
  plot_box(x: number, y: number, width: number, height: number, color: number): void {
    const left = Math.max(0, x), right = Math.min(this.bitmapWidth, x + width);
    const top = Math.max(0, y), bottom = Math.min(this.bitmapHeight, y + height);
    if (right <= left || bottom <= top) return;
    const pixels = this.pixels;
    for (let row = top; row < bottom; row++) {
      const start = this.base + row * this.pitch;
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
    return this.pixels[this.base + y * this.pitch + x] ?? 0;
  }

  'pix='(y: number, x: number, value: number): void {
    const index = this.base + y * this.pitch + x;
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
      offset: this.base + y * this.pitch + x,
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
  /** The device builds an address map of its own, which may create the share. */
  ownMap = false,
): ArrayLike<unknown> {
  const memory = member.memory!;
  // A vector its constructor sizes (`m_value_map(1 << bits)`) starts that long.
  const length = typeof member.initial === 'number' && member.initial > 0 ? member.initial : 0;
  if (memory.kind === 'owned') return length ? resizeGeneratedContainer(generatedMemoryArray(memory.elementBytes), length) as ArrayLike<unknown> : generatedMemoryArray(memory.elementBytes);
  if (memory.kind === 'growable') return resizeGeneratedVector(generatedVector(vectorElement(memory.element, structs)), length);
  // A finder on DUMMY_TAG holds nothing until the configuration re-tags it
  // (sharedMemberRetag below).
  if (memory.share === 'unset') return new Uint8Array(0);
  const tag = (memory.share === 'self' ? options.tag : memory.share)
    ?.replace(/^\^+/, '')
    .replace(/^:/, '');
  // A plain tag is the device's own child, as MAME's finder resolves it:
  // atarimo's `m_slipramshare(*this, "slip")` is Gauntlet's share "mob:slip".
  // One spelled `^tag` or `:tag` names the owner's or the root's.
  const relative = memory.share !== 'self' && !/^[\^:]/.test(memory.share ?? '') && options.tag
    ? options.shares?.[`${options.tag}:${tag}`] : undefined;
  const bytes = relative ?? (tag ? options.shares?.[tag] : undefined);
  if (!bytes && /^optional_shared_ptr\b/.test(member.valueType)) {
    return new Uint8Array(0);
  }
  // A share the device's own address map creates: a 6801's
  // `map(0x0080, 0x00ff).ram().share(m_internal_ram)`. The map sizes it when
  // it is built (mappedDeviceSpace), and this member is that memory.
  if (!bytes && ownMap) return generatedMemoryArray(memory.elementBytes);
  if (!bytes) {
    throw new Error(
      `generated device memory share "${tag ?? memory.share}" is not available for ${member.name}`,
    );
  }
  return generatedMemoryArray(memory.elementBytes, bytes);
}

/** A memory container indexed in the element width declared by its C++ type. */
/** The most an owned vector may grow to: Neo Geo's largest decoded sprite sets. */
const GROWABLE_VECTOR_BYTES = 256 * 1024 * 1024;

function generatedMemoryArray(
  elementBytes: number,
  bytes?: Uint8Array,
): Uint8Array | Uint16Array | Uint32Array {
  if (!bytes) {
    // An owned std::vector starts empty and is sized later, often through a
    // reference (`optimize_helper(m_sprite_gfx, ...)` resizes Neo Geo's
    // decoded sprites through `std::vector<u8> &`): over a resizable buffer
    // the resize happens in place, so every holder sees it.
    const buffer = resizableBuffer(GROWABLE_VECTOR_BYTES);
    if (elementBytes === 2) return new Uint16Array(buffer);
    if (elementBytes === 4) return new Uint32Array(buffer);
    return new Uint8Array(buffer);
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
  // A comma inside a template's arguments is not a parameter break: the
  // Z8002's RDMEM_W takes `memory_access<23, 1, 0, ENDIANNESS_BIG>::specific
  // &space, uint32_t addr`, and split on every comma its address was the
  // fifth parameter, so the reset vector was read from 0.
  const split: string[] = [];
  let depth = 0;
  let current = '';
  for (const character of parameters) {
    if (character === '<' || character === '(' || character === '[') depth++;
    else if (character === '>' || character === ')' || character === ']') depth = Math.max(0, depth - 1);
    if (character === ',' && depth === 0) {
      split.push(current);
      current = '';
    } else current += character;
  }
  split.push(current);
  return split.map(parameter => parameter.trim()).filter(Boolean);
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
 * must stay *after* the `values` branch: a `T[]` member that comes with its
 * initial structs, claimed first, was replaced with an empty array, so its
 * device_reset wrote through undefined (Donkey Kong's 8257 once stopped
 * booting this way).
 */
function isIndexableMemberType(valueType: string | undefined): boolean {
  if (!valueType) return false;
  return /^(?:memory_share_creator|required_shared_ptr|optional_shared_ptr)\b/.test(valueType)
    || /\[\s*\d*\s*\]$/.test(valueType);
}

function parameterName(parameter: string): string {
  // An array parameter names itself before its bound: `const uint16_t input[4]`
  // is `input`. Taken whole, atarimo's sprite_parameter::set never saw its
  // input and every motion-object mask stayed zero.
  const declarator = parameter.replace(/=[\s\S]*$/, '').replace(/(\s*\[[^\]]*\])+\s*$/, '');
  return /(\w+)\s*$/.exec(declarator)?.[1]
    ?? /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter.replace(/=[\s\S]*$/, '')) ?.[1]
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
  /**
   * memory_access::specific's interruptible accesses: the plain access, since
   * nothing here defers one (cpu_device::access_to_be_redone stays false).
   */
  read_interruptible?(address: number): number;
  write_interruptible?(address: number, data: number): number;
  /**
   * address_space::addr_width(), from the space's config: the 6502 picks its
   * memory interface by it (`addr_width() > 14 ? mi_default : mi_default14`),
   * and unanswered every 6502 took the 14-bit one and left m_program unbound.
   */
  addr_width?(): number;
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
 * MAME's `memory_view` as a device's own address map holds it: `view[n]` is
 * entry n's map, which records into that entry, and `select(n)`/`disable()`
 * choose what the view's range decodes. The selection is machine state;
 * what each entry maps is rebuilt by the map that recorded it.
 */
class DeviceMemoryView {
  selected = -1;
  /** Entry n's builder: set when a map installs the view (`.view(m_view)`). */
  builder: ((slot: number) => unknown) | undefined;
  readonly slots = new Map<number, unknown[]>();
  stateKeys(): readonly string[] {
    return ['selected'];
  }
  exists(): number {
    return this.builder ? 1 : 0;
  }
  select(entry: unknown): number {
    this.selected = Number(entry);
    return 0;
  }
  disable(): number {
    this.selected = -1;
    return 0;
  }
  entry(): number {
    return this.selected;
  }
}

function deviceMemoryView(): DeviceMemoryView {
  return new Proxy(new DeviceMemoryView(), {
    get(target, property, receiver) {
      if (typeof property === 'string' && /^\d+$/.test(property)) {
        if (target.builder) return target.builder(Number(property));
        // Installed into another space instead (`cart_space()->install_view(
        // 0xa000, 0xbfff, m_view_ram)`, a Game Boy cartridge's RAM window):
        // that space's recorder takes the entry's installs.
        const installed = (target as { __installedView?: InstalledView }).__installedView;
        if (installed) return installedViewEntry(installed, Number(property));
        throw new Error('memory_view indexed before a map or install_view installed it');
      }
      return Reflect.get(target, property, receiver);
    },
  });
}

/** A child device handle's parameter lookup, by method name (see the child handles). */
const DEVICE_PARAMETERS = Symbol('device parameters');

/** The bus's own word access for a device space wider than a byte, at bus byte addresses. */
export interface WideSpaceAccess {
  read16(address: number): number;
  write16(address: number, data: number): void;
}

/**
 * MAME's address_space surface over a 16-bit space (emumem.h): byte, word and
 * dword access at the space's own addresses, each converted to bus bytes by
 * its address shift (-1: a word-addressed TMS320C10, so address N is bytes 2N
 * and 2N+1; +3: a bit-addressed TMS34010). A word with a partial `mem_mask`
 * writes only its selected byte lane; a dword is two words in the space's
 * byte order, as MAME performs one on a 16-bit bus.
 */
function bindWideSpace(
  space: GeneratedDeviceSpace,
  config: { dataBits: number; addressBits: number; endianness?: 'big' | 'little'; addressShift?: number },
  read: (address: number) => number,
  write: (address: number, data: number) => void,
  wide: WideSpaceAccess,
): void {
  const shift = config.addressShift ?? 0;
  const little = config.endianness === 'little';
  const bus = shift < 0 ? (address: number) => address * 2 ** -shift : shift > 0 ? (address: number) => Math.floor(address / 2 ** shift) : (address: number) => address;
  const word = (address: number) => bus(address) & ~1;
  // The byte lane a mask selects, as the bus address of that byte.
  const lane = (address: number, high: boolean) => word(address) + (high === little ? 1 : 0);
  const target = space as unknown as Record<string, unknown>;
  space.read_byte = address => read(bus(address)) & 0xff;
  space.write_byte = (address, data) => { write(bus(address), data & 0xff); return 0; };
  // A byte lane reads that lane alone, as MAME calls no handler on a lane the
  // mem_mask leaves out: the 68000 reads every byte as a masked word, and a
  // whole-word read ran the other lane's handler too.
  target.read_word = (address: number, mask = 0xffff) => {
    const selected = Number(mask) & 0xffff;
    if (selected === 0xff00) return (read(lane(address, true)) & 0xff) << 8;
    if (selected === 0x00ff) return read(lane(address, false)) & 0xff;
    return wide.read16(word(address)) & 0xffff & (selected || 0xffff);
  };
  target.write_word = (address: number, data: number, mask = 0xffff) => {
    const selected = Number(mask) & 0xffff;
    if (selected === 0xffff || selected === 0) wide.write16(word(address), Number(data) & 0xffff);
    else {
      if (selected & 0xff00) write(lane(address, true), (Number(data) >>> 8) & 0xff);
      if (selected & 0x00ff) write(lane(address, false), Number(data) & 0xff);
    }
    return 0;
  };
  // One word of a dword at a time, high word first on a big-endian space; the
  // next word is one address on a word-addressed space, 16 on a bit-addressed one.
  const next = (address: number) => address + (shift < 0 ? 1 : shift > 0 ? 16 : 2);
  target.read_dword = (address: number) => {
    const first = (target.read_word as (a: number) => number)(address);
    const second = (target.read_word as (a: number) => number)(next(address));
    return (little ? (second << 16) | first : (first << 16) | second) >>> 0;
  };
  target.write_dword = (address: number, data: number) => {
    const value = Number(data) >>> 0;
    const high = value >>> 16, low = value & 0xffff;
    (target.write_word as (a: number, d: number) => number)(address, little ? low : high);
    (target.write_word as (a: number, d: number) => number)(next(address), little ? high : low);
    return 0;
  };
  // An unaligned word is two byte accesses, in the space's order.
  target.read_word_unaligned = (address: number) => little
    ? (space.read_byte(address) | (space.read_byte(address + 1) << 8)) & 0xffff
    : ((space.read_byte(address) << 8) | space.read_byte(address + 1)) & 0xffff;
  target.write_word_unaligned = (address: number, data: number) => {
    const value = Number(data) & 0xffff;
    space.write_byte(little ? address : address + 1, value & 0xff);
    space.write_byte(little ? address + 1 : address, value >>> 8);
    return 0;
  };
  target.data_width = () => config.dataBits;
  // memory_access::specific's interruptible accesses are the bus's own width:
  // a word with its mem_mask on a 16-bit space, as the microcoded 68000 reads
  // every bus cycle (`m_opcodes.read_interruptible(m_aob & ~1)`).
  space.read_interruptible = target.read_word as GeneratedDeviceSpace['read_interruptible'];
  space.write_interruptible = target.write_word as GeneratedDeviceSpace['write_interruptible'];
}

/** A space's config answers, as address_space reads them from its address_space_config. */
function withSpaceConfig<T extends GeneratedDeviceSpace>(space: T, addressBits: number, config?: { dataBits: number; endianness?: 'big' | 'little' }): T {
  space.addr_width = () => addressBits;
  // A byte-wide space answers word accesses too, as two bytes in its own order
  // (emumem's address_space on an 8-bit bus): the 8088 reads its operands with
  // `read_word_unaligned` and writes a port's high lane with
  // `write_word(port - 1, swapendian_int16(AX), 0xff00)`.
  if (config && config.dataBits === 8) {
    const little = config.endianness !== 'big';
    const words = space as unknown as Record<string, unknown>;
    const readWord = (address: number) => little
      ? (space.read_byte(address) | (space.read_byte(address + 1) << 8)) & 0xffff
      : ((space.read_byte(address) << 8) | space.read_byte(address + 1)) & 0xffff;
    const writeWord = (address: number, data: number, mask = 0xffff) => {
      const value = Number(data) & 0xffff;
      const lanes = Number(mask) & 0xffff || 0xffff;
      if (lanes & 0x00ff) space.write_byte(little ? address : address + 1, value & 0xff);
      if (lanes & 0xff00) space.write_byte(little ? address + 1 : address, value >>> 8);
      return 0;
    };
    words.read_word ??= readWord;
    words.write_word ??= writeWord;
    words.read_word_unaligned ??= readWord;
    words.write_word_unaligned ??= writeWord;
    words.data_width ??= () => 8;
  }
  // memory_access::specific::space() is the space itself here, and
  // address_space::addrmask() its width's mask: the Z8002 masks its PC's
  // debugger state with `m_program.space().addrmask()`.
  const surface = space as unknown as Record<string, unknown>;
  surface.space ??= () => space;
  surface.addrmask ??= () => 2 ** addressBits - 1;
  // address_space::data_width(), from creation: the V30 asks it in
  // device_start, before its owner binds the space.
  if (config) surface.data_width ??= () => config.dataBits;
  return space;
}

/** The Z80's `m_data.read_interruptible(a)`: the space's own access (GeneratedDeviceSpace). */
function interruptible(space: GeneratedDeviceSpace): void {
  space.read_interruptible = address => space.read_byte(address);
  space.write_interruptible = (address, data) => space.write_byte(address, data);
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
  /** Bus bytes per map address: 2 on a word-addressed space (the TMS320C10's data). */
  unitBytes = 1,
  /**
   * A space wider than a byte whose map addresses are bytes or smaller (the
   * TMS34010's bit addresses, addrshift +3): its handlers take word offsets
   * and a mem_mask, and a word access calls them once.
   */
  wide?: { dataBits: number; addressShift?: number; endianness?: 'big' | 'little' },
): GeneratedDeviceSpace & WideSpaceAccess {
  const shift = wide?.addressShift ?? 0;
  const byteBits = shift > 0 ? addressBits - shift : addressBits;
  const size = 2 ** byteBits * unitBytes;
  const mask = size - 1;
  // A space too large to decode address by address (the TMS34010's 512 MB,
  // the 68000's 16 MB CPU space) is decoded entry by entry; its few ranges are
  // the whole internal map.
  const sparse = size > 1 << 20;
  const memory = new Uint8Array(sparse ? 0 : size);
  const toByte = (address: number) => shift > 0 ? Math.floor(address / 2 ** shift) : address * unitBytes;
  const wordBytes = wide ? wide.dataBits / 8 : 1;
  const little = wide?.endianness !== 'big';
  type Entry = {
    start: number;
    end: number;
    read?: (offset: number, memMask?: number) => number;
    write?: (offset: number, data: number, memMask?: number) => void;
    storage?: Uint8Array;
    storageOffset?: number;
    /** RAM: writes land in `storage`. */
    writable?: boolean;
    /** `.view(m_view)`: the range decodes through the view's selected entry. */
    view?: DeviceMemoryView;
    /** Its handlers are a wide space's: a word offset, the word, a mem_mask. */
    words?: boolean;
    beforeTime?: (offset: number, current?: number) => number;
    beforeDelay?: (offset: number) => number;
    afterDelay?: (offset: number) => number;
  };
  const entries: Entry[] = [];
  let unmapped = 0;
  // A handler reference or a lambda, called with the arguments it declares.
  const callable = (target: unknown, writing: boolean): ((offset: number, data?: number) => number) | undefined => {
    if (typeof target === 'function') {
      const declared = (target as { declaredParameters?: number }).declaredParameters ?? target.length;
      const fn = target as (...args: number[]) => unknown;
      return writing
        ? (offset, data = 0, memMask?: number) => Number(declared >= 3 && memMask !== undefined ? fn(offset, data, memMask)
          : declared >= 2 ? fn(offset, data) : fn(data)) || 0
        : (offset, memMask?: number) => Number(declared >= 2 && memMask !== undefined ? fn(offset, memMask)
          : declared >= 1 ? fn(offset) : fn()) || 0;
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
    // A wide handler's mem_mask (`io_register_w(offs_t, u16 data, u16 mem_mask = ~0)`).
    return writing
      ? (offset, data = 0, memMask?: number) => Number(declared >= 3 && memMask !== undefined ? device.call(name, offset, data, memMask)
        : declared >= 2 ? device.call(name, offset, data) : device.call(name, data)) || 0
      : (offset, memMask?: number) => Number(declared >= 2 && memMask !== undefined ? device.call(name, offset, memMask)
        : declared >= 1 ? device.call(name, offset) : device.call(name)) || 0;
  };
  const deviceCallable = (target: unknown, reference: unknown, writing: boolean): ((offset: number, data?: number) => number) => {
    const name = typeof reference === 'object' && reference && 'reference' in reference
      ? String((reference as { reference: unknown }).reference).split('::').at(-1)!
      : undefined;
    const handle = target as Record<string | symbol, unknown> | undefined;
    const fn = name && handle ? handle[name] : undefined;
    if (typeof fn !== 'function') throw new Error(`address map names ${String(name)} on a device that does not define it`);
    const parameters = (handle![DEVICE_PARAMETERS] as ((method: string) => readonly string[]) | undefined)?.(name!);
    const declared = parameters ? parameters.filter(parameter => parameter && parameter !== 'void').length : writing ? 2 : 1;
    const call = fn as (...args: number[]) => unknown;
    return writing
      ? (offset, data = 0) => Number(declared >= 2 ? call(offset, data) : call(data)) || 0
      : offset => Number(declared >= 1 ? call(offset) : call()) || 0;
  };
  // A map builder over one list of entries: the space's own, or one entry
  // of a view (`m_rom_view[0](0, end).rom()`), which MAME builds the same way.
  const builder = (list: Entry[]) => Object.assign((start: number, end: number) => {
    const entry: Entry = shift > 0
      ? { start: toByte(Number(start)) % size, end: (toByte(Number(end) + 1) - 1) % size }
      : { start: (Number(start) * unitBytes) & mask, end: (Number(end) * unitBytes + unitBytes - 1) & mask };
    list.push(entry);
    const chain: Record<string, (...args: unknown[]) => unknown> = {
      // Or another device's, named by the device and its method:
      // `.w(m_apu, FUNC(nesapu_device::write))`.
      r: (handler, method) => {
        if (unitBytes > 1) throw new Error(`${mapMethod}: a handler on a word-addressed internal map is not supported yet`);
        entry.read = method === undefined ? callable(handler, false) : deviceCallable(handler, method, false);
        if (wide) entry.words = true;
        return chain;
      },
      w: (handler, method) => {
        if (unitBytes > 1) throw new Error(`${mapMethod}: a handler on a word-addressed internal map is not supported yet`);
        entry.write = method === undefined ? callable(handler, true) : deviceCallable(handler, method, true);
        if (wide) entry.words = true;
        return chain;
      },
      rw: (read, write, method) => {
        if (method !== undefined) {
          entry.read = deviceCallable(read, write, false);
          entry.write = deviceCallable(read, method, true);
        } else {
          entry.read = callable(read, false);
          entry.write = callable(write, true);
        }
        if (wide) entry.words = true;
        return chain;
      },
      // emumem's delay handlers around an entry (handler_entry_read_before_time
      // and friends): the owner's callback says when the access may happen
      // or what it costs. The 68000's autovectors sync to the E clock this
      // way (vpa_sync, vpa_after) on every interrupt acknowledge.
      before_time: (_owner, method) => { entry.beforeTime = callable(method ?? _owner, false); return chain; },
      before_delay: (_owner, method) => { entry.beforeDelay = callable(method ?? _owner, false); return chain; },
      after_delay: (_owner, method) => { entry.afterDelay = callable(method ?? _owner, false); return chain; },
      // A submap the owner's method fills, at this range's start: Musashi's
      // default CPU space installs `map(mask - 0xf, mask).m(*this,
      // FUNC(autovectors_map))`, whose own addresses run from 0.
      m: (owner, method) => {
        const target = method ?? owner;
        const name = typeof target === 'object' && target && 'reference' in target
          ? String((target as { reference: unknown }).reference).split('::').at(-1)!
          : String(target);
        if (!device.methodNames().includes(name)) throw new Error(`address map submap ${name} is not a method of the device`);
        list.splice(list.indexOf(entry), 1);
        const base = Number(start);
        const inner = builder(list);
        const offset = Object.assign((from: number, to: number) => inner(base + Number(from), base + Number(to)),
          Object.fromEntries(Object.entries(inner)));
        device.call(name, offset as unknown as number);
        return chain;
      },
      // An 8-bit lambda is a byte handler whatever the bus width: the 68000's
      // autovectors answer on one byte lane of its CPU space.
      lr8: handler => { chain.r!(handler); entry.words = false; return chain; },
      lw8: handler => { chain.w!(handler); entry.words = false; return chain; },
      lrw8: (read, write) => { chain.rw!(read, write); entry.words = false; return chain; },
      ram: () => {
        if (sparse) { entry.storage = new Uint8Array(entry.end - entry.start + 1); entry.storageOffset = 0; }
        else { entry.storage = memory; entry.storageOffset = undefined; }
        entry.writable = true;
        return chain;
      },
      // `.share(m_internal_ram)`: the entry's memory is the member's, sized to
      // the entry, as MAME's map allocates a share for its finder.
      // `.share("data")` names it by tag: the member whose finder is that
      // share (the MCS-48's `m_dataptr(*this, "data")`).
      share: tag => {
        const target = typeof tag === 'string' ? device.sharedMember(tag) : tag;
        if (ArrayBuffer.isView(target)) {
          const bytes = resizeGeneratedContainer(target, entry.end - entry.start + 1) as Uint8Array;
          entry.storage = bytes;
          entry.storageOffset = 0;
          entry.writable = true;
        }
        return chain;
      },
      // An internal map's `rom()` is the device's own region at the same
      // addresses: the MB88's program space is its firmware.
      rom: () => {
        const bytes = region('tag()');
        if (bytes) {
          entry.storage = bytes;
          entry.storageOffset = entry.start;
        }
        return chain;
      },
      region: (tag, offset) => {
        // DEVICE_SELF ("" in MAME) is the device's own region, as `rom()`
        // reads it: a 6801U4's or HD63701's on-chip ROM.
        const named = tag && typeof tag === 'object' && 'reference' in tag
          ? String((tag as { reference: unknown }).reference) : String(tag);
        const self = named === 'DEVICE_SELF' || named === '';
        const bytes = region(self ? 'tag()' : named);
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
      // A view over the range: MAME's memory_view, its entries built through
      // `view[n]` and chosen with select()/disable().
      view: target => {
        if (!(target instanceof DeviceMemoryView)) throw new Error('address map installs a view that is not a memory_view member');
        entry.view = target;
        target.builder = slot => {
          let slotEntries = target.slots.get(slot) as Entry[] | undefined;
          if (!slotEntries) target.slots.set(slot, slotEntries = []);
          return builder(slotEntries);
        };
        return chain;
      },
      mirror: () => chain,
      mask: () => chain,
    };
    return chain;
  }, {
    unmap_value_high: () => { unmapped = 0xff; return 0; },
    unmap_value_low: () => { unmapped = 0; return 0; },
    global_mask: () => 0,
  });
  const map = builder(entries);
  device.call(mapMethod, map as unknown as number);
  const readable = (entry: Entry) => Boolean(entry.read || entry.storage || entry.view);
  const writable = (entry: Entry) => Boolean(entry.write || entry.writable || entry.view);
  const readAt = sparse ? undefined : new Int32Array(size).fill(-1);
  const writeAt = sparse ? undefined : new Int32Array(size).fill(-1);
  if (readAt && writeAt) {
    entries.forEach((entry, index) => {
      for (let address = entry.start; address <= entry.end; address++) {
        if (readable(entry)) readAt[address] = index;
        if (writable(entry)) writeAt[address] = index;
      }
    });
  }
  // The last entry covering an address wins, as the dense tables have it.
  const find = (at: number, test: (entry: Entry) => boolean): number => {
    for (let index = entries.length - 1; index >= 0; index--) {
      const entry = entries[index]!;
      if (entry.start <= at && at <= entry.end && test(entry)) return index;
    }
    return -1;
  };
  const readIndex = (at: number) => readAt ? readAt[at]! : find(at, readable);
  const writeIndex = (at: number) => writeAt ? writeAt[at]! : find(at, writable);
  // A byte of a wide handler's word: its lane's mask and shift.
  const laneShift = (at: number, entry: Entry) => {
    const lane = (at - entry.start) % wordBytes;
    return 8 * (little ? lane : wordBytes - 1 - lane);
  };
  const wordOffset = (at: number, entry: Entry) => Math.floor((at - entry.start) / wordBytes);
  // An entry's delay handlers around its access: true when the access is
  // deferred, and then it does not happen.
  const deferred = (entry: Entry, offset: number): boolean => {
    if (entry.beforeTime) {
      const now = device.totalCyclesNow();
      if (device.accessBeforeTime(entry.beforeTime(offset, now), now)) return true;
    }
    if (entry.beforeDelay && device.accessBeforeDelay(entry.beforeDelay(offset), entry)) return true;
    return false;
  };
  const delayed = (entry: Entry, offset: number): void => {
    if (entry.afterDelay) device.accessAfterDelay(entry.afterDelay(offset));
  };
  type Fallback = { read(address: number): number; write(address: number, data: number): void; wide?: WideSpaceAccess };
  const space: GeneratedDeviceSpace & WideSpaceAccess & { fallback?: Fallback } = {
    memory,
    read_byte: address => {
      const at = address & mask;
      const index = readIndex(at);
      const entry = index < 0 ? undefined : resolve(index, at, false);
      if (!entry) return space.fallback ? space.fallback.read(address) : unmapped;
      if (entry.read) {
        const offset = entry.words ? wordOffset(at, entry) : at - entry.start;
        if ((entry.beforeTime || entry.beforeDelay) && deferred(entry, offset)) return unmapped;
        let value: number;
        if (!entry.words) value = entry.read(offset) & 0xff;
        else {
          const bits = laneShift(at, entry);
          value = (entry.read(offset, 0xff << bits) >>> bits) & 0xff;
        }
        if (entry.afterDelay) delayed(entry, offset);
        return value;
      }
      const storage = entry.storage!;
      return storage[entry.storageOffset === undefined ? at : entry.storageOffset + at - entry.start] ?? unmapped;
    },
    write_byte: (address, data) => {
      const at = address & mask;
      const index = writeIndex(at);
      const entry = index < 0 ? undefined : resolve(index, at, true);
      if (!entry) {
        space.fallback?.write(address, data);
        return 0;
      }
      if (entry.write) {
        if (!entry.words) entry.write(at - entry.start, data & 0xff);
        else {
          const bits = laneShift(at, entry);
          entry.write(wordOffset(at, entry), (data & 0xff) << bits, 0xff << bits);
        }
      } else if (entry.writable) entry.storage![entry.storageOffset === undefined ? at : entry.storageOffset + at - entry.start] = data & 0xff;
      return 0;
    },
    // A word: one call of a wide handler, else the owner's own word access,
    // else two bytes in the space's order.
    read16: address => {
      const at = address & mask;
      const index = readIndex(at);
      const entry = index < 0 ? undefined : resolve(index, at, false);
      // Neither byte mapped here: the owner's word, in one access.
      if (!entry && readIndex((at + 1) & mask) < 0 && space.fallback?.wide) return space.fallback.wide.read16(address) & 0xffff;
      if (entry?.words && entry.read) {
        const offset = wordOffset(at, entry);
        if ((entry.beforeTime || entry.beforeDelay) && deferred(entry, offset)) return unmapped;
        const value = entry.read(offset, 0xffff) & 0xffff;
        if (entry.afterDelay) delayed(entry, offset);
        return value;
      }
      return little ? (space.read_byte(address) | (space.read_byte(address + 1) << 8)) & 0xffff
        : ((space.read_byte(address) << 8) | space.read_byte(address + 1)) & 0xffff;
    },
    write16: (address, data) => {
      const at = address & mask;
      const index = writeIndex(at);
      const entry = index < 0 ? undefined : resolve(index, at, true);
      if (entry?.words && entry.write) { entry.write(wordOffset(at, entry), data & 0xffff, 0xffff); return; }
      if (!entry && writeIndex((at + 1) & mask) < 0 && space.fallback?.wide) { space.fallback.wide.write16(address, data & 0xffff); return; }
      space.write_byte(little ? address : address + 1, data & 0xff);
      space.write_byte(little ? address + 1 : address, (data >>> 8) & 0xff);
    },
  };
  // The entry an address decodes to. A view's range is its selected entry's
  // mapping there; with no entry selected, or none covering the address, the
  // view is transparent (memory.rst): what the map had under it, and then
  // the bus the internal map sits over -- the MCS-48's external program
  // ROM once EA takes its internal ROM away.
  function resolve(index: number, at: number, writing: boolean): Entry | undefined {
    const entry = entries[index]!;
    if (!entry.view) return entry;
    const covers = (candidate: Entry) => candidate.start <= at && at <= candidate.end &&
      (writing ? Boolean(candidate.write || candidate.writable) : Boolean(candidate.read || candidate.storage));
    const selected = entry.view.selected < 0 ? undefined : entry.view.slots.get(entry.view.selected) as Entry[] | undefined;
    if (selected) {
      for (let slot = selected.length - 1; slot >= 0; slot--) if (covers(selected[slot]!)) return selected[slot];
    }
    for (let below = index - 1; below >= 0; below--) {
      const candidate = entries[below]!;
      if (!candidate.view && covers(candidate)) return candidate;
    }
    return undefined;
  }
  return space;
}

/**
 * MAME's PAIR union on a little-endian host: `b` the bytes low to high, `w`
 * the halves, `d` the word, and their signed readings. The word lives in a
 * typed array, so a save state carries it like any other register; the views
 * are made the first time they are read, and are no state of their own.
 * Built for every PAIR local an instruction declares (the 6800's
 * `PAIR r,d,b;`), so nothing here is defined per instance.
 */
class PairLanes {
  readonly #word: Uint32Array | Uint16Array;
  readonly #bits: number;
  readonly #signed: boolean;
  constructor(word: Uint32Array | Uint16Array, bits: number, signed: boolean) {
    this.#word = word;
    this.#bits = bits;
    this.#signed = signed;
  }
  #get(index: number): number {
    const bits = this.#bits;
    const value = (this.#word[0]! >>> (index * bits)) & ((1 << bits) - 1);
    return this.#signed && value & (1 << (bits - 1)) ? value - (1 << bits) : value;
  }
  #set(index: number, value: number): void {
    const bits = this.#bits;
    const mask = (((1 << bits) - 1) << (index * bits)) >>> 0;
    this.#word[0] = ((this.#word[0]! & ~mask) | ((Number(value) << (index * bits)) & mask)) >>> 0;
    // (A Uint16Array keeps the low half of the same expression.)
  }
  get l(): number { return this.#get(0); }
  set l(value: number) { this.#set(0, value); }
  get h(): number { return this.#get(1); }
  set h(value: number) { this.#set(1, value); }
  get h2(): number { return this.#get(2); }
  set h2(value: number) { this.#set(2, value); }
  get h3(): number { return this.#get(3); }
  set h3(value: number) { this.#set(3, value); }
}

class PairValue {
  readonly word = new Uint32Array(1);
  #b?: PairLanes;
  #sb?: PairLanes;
  #w?: PairLanes;
  #sw?: PairLanes;
  get d(): number { return this.word[0]!; }
  set d(value: number) { this.word[0] = Number(value) >>> 0; }
  get sd(): number { return this.word[0]! | 0; }
  set sd(value: number) { this.word[0] = Number(value) >>> 0; }
  get b(): PairLanes { return this.#b ??= new PairLanes(this.word, 8, false); }
  get sb(): PairLanes { return this.#sb ??= new PairLanes(this.word, 8, true); }
  get w(): PairLanes { return this.#w ??= new PairLanes(this.word, 16, false); }
  get sw(): PairLanes { return this.#sw ??= new PairLanes(this.word, 16, true); }
}

function pairValue(): Record<string, unknown> {
  return new PairValue() as unknown as Record<string, unknown>;
}

/**
 * MAME's PAIR16 (emucore.h): one 16-bit word read as `w`/`sw` or by its bytes,
 * `b.l`/`b.h` and `sb.l`/`sb.h`, on a little-endian host. The 6809 keeps PC,
 * X, Y, U, S and its effective address in one each.
 */
class Pair16Value {
  readonly word = new Uint16Array(1);
  #b?: PairLanes;
  #sb?: PairLanes;
  get w(): number { return this.word[0]!; }
  set w(value: number) { this.word[0] = Number(value); }
  get sw(): number { return (this.word[0]! << 16) >> 16; }
  set sw(value: number) { this.word[0] = Number(value); }
  get b(): PairLanes { return this.#b ??= new PairLanes(this.word, 8, false); }
  get sb(): PairLanes { return this.#sb ??= new PairLanes(this.word, 8, true); }
}

function pair16Value(): Record<string, unknown> {
  return new Pair16Value() as unknown as Record<string, unknown>;
}

/**
 * A device space with no map, filled by the device at start:
 * `space(0).install_rom(start, end, base)` puts a region's bytes there, and
 * `read_byte` reads whatever is installed (open bus elsewhere reads 0).
 */
function installableDeviceSpace(addressBits: number): GeneratedDeviceSpace & {
  install_rom(start: number, end: number, base: unknown): number;
  unmap_readwrite(start: number, end: number): number;
  unmap_read(start: number, end: number): number;
} {
  const mask = addressBits >= 32 ? 0xffffffff : (2 ** addressBits) - 1;
  const entries: { start: number; end: number; bytes: ArrayLike<number>; offset: number }[] = [];
  // What an unmap leaves: the parts of each entry outside the range.
  const unmap = (start: number, end: number): number => {
    const from = start & mask;
    const to = end & mask;
    for (let index = entries.length - 1; index >= 0; index--) {
      const entry = entries[index]!;
      if (entry.end < from || entry.start > to) continue;
      entries.splice(index, 1);
      if (entry.start < from) entries.splice(index, 0, { ...entry, end: from - 1 });
      if (entry.end > to) entries.splice(index, 0, { ...entry, start: to + 1, offset: entry.offset + to + 1 - entry.start });
    }
    return 0;
  };
  const read = (address: number): number => {
    const at = address & mask;
    for (const entry of entries) {
      if (at >= entry.start && at <= entry.end) return entry.bytes[entry.offset + at - entry.start] ?? 0;
    }
    return 0;
  };
  return {
    memory: new Uint8Array(0),
    read_byte: read,
    write_byte: () => 0,
    install_rom: (start, end, base) => {
      const pointer = isGeneratedPointer(base) ? base : undefined;
      const bytes = pointer ? pointer.source : base as ArrayLike<number>;
      if (bytes && typeof bytes.length === 'number') {
        // A later install over the same range replaces the earlier one.
        entries.unshift({ start: Number(start) & mask, end: Number(end) & mask, bytes, offset: pointer?.offset ?? 0 });
      }
      return 0;
    },
    // `unmap_readwrite(start, end)`: Neo Geo's init_ym clears the YM2610's
    // ADPCM spaces before installing the cartridge's ROM in them.
    unmap_readwrite: (start, end) => unmap(Number(start), Number(end)),
    unmap_read: (start, end) => unmap(Number(start), Number(end)),
  };
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
): ((...args: unknown[]) => unknown) | undefined {
  if (!element) return undefined;
  const inner = /^std::vector<\s*(.+?)\s*>$/.exec(element);
  if (inner) return () => generatedVector(vectorElement(inner[1], structs));
  // MAME's rectangle, by its (min_x, max_x, min_y, max_y) constructor;
  // default-constructed it is all zero (emu/rendertypes.h).
  if (element.trim() === 'rectangle') {
    return (...args: unknown[]) => new GeneratedRectangle(
      Number(args[0] ?? 0), Number(args[1] ?? 0), Number(args[2] ?? 0), Number(args[3] ?? 0));
  }
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
/** The runtime each struct's emitted methods run against (STRUCT_METHODS). */
/**
 * A struct's runtime, on the struct itself: a symbol is an inline-cached load
 * where a WeakMap is a hash lookup, four times a POKEY clock. A save state
 * walks string keys only.
 */
const STRUCT_RUNTIME = Symbol('struct runtime');
const STRUCT_METHODS = new WeakMap<object, Record<string, Record<string, (this: Record<string, unknown>, ...args: unknown[]) => unknown>>>();

/**
 * A struct's initial value copied into the shape structMember built, so an
 * array field stays the typed array that narrows what is stored into it: the
 * 8086's ModRM table is `int w[256]` inside nested structs.
 */
function seedStruct(target: Record<string, unknown>, seed: Record<string, unknown> | undefined): Record<string, unknown> {
  if (!seed) return target;
  for (const [name, value] of Object.entries(seed)) {
    const into = target[name];
    if (Array.isArray(value) && (ArrayBuffer.isView(into) || Array.isArray(into))) {
      const array = into as unknown[];
      value.forEach((item, index) => {
        if (item !== null && typeof item === 'object' && array[index] !== null && typeof array[index] === 'object') {
          seedStruct(array[index] as Record<string, unknown>, item as Record<string, unknown>);
        } else array[index] = structuredClone(item);
      });
    } else if (value !== null && typeof value === 'object' && into !== null && typeof into === 'object' && !Array.isArray(value)) {
      seedStruct(into as Record<string, unknown>, value as Record<string, unknown>);
    } else target[name] = structuredClone(value);
  }
  return target;
}

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
  // A union type is held as one anonymous union (structDeclarations): the
  // member is that union, the 6809's `M6809Q m_q`.
  if (fields.length === 1 && !fields[0]!.name && fields[0]!.union && fields[0]!.fields) {
    return unionMember(unionStructTypes(fields[0]!.fields, structs));
  }
  const value: Record<string, unknown> = {};
  const widths: Record<string, number> = {};
  for (const field of fields) {
    // A vector field (floppy_image's per-track `cell_data`) is a vector.
    const vector = /^std::vector<\s*(.+?)\s*>$/.exec(field.valueType ?? '');
    if (vector) {
      // Signed 16-bit PCM is storage a file is read into by the byte, and whose
      // values are read back signed (samples_device::sample_t), so it is that
      // memory rather than an array of integers.
      value[field.name] = /^(?:int16_t|s16)$/.test(vector[1]!)
        ? new Int16Array(0)
        : generatedVector(vectorElement(vector[1], structs));
      continue;
    }
    // A field that is itself a struct, and commonly an array of them: the
    // Game Boy PPU keeps ten sprite slots inside its per-line state. Built as
    // a number, the first assignment into one had nothing to assign to.
    // A field of a named struct type is one too: MMC5's `square_t squ[2]` is
    // a `mmc5_sound_t::square_t`, declared beside the struct that holds it.
    if (field.union && field.fields) {
      const laid = unionStructTypes(field.fields, structs);
      value[field.name] = field.length
        ? Array.from({ length: field.length }, () => unionMember(laid))
        : unionMember(laid);
      continue;
    }
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
    value[field.name] = field.initial ?? 0;
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

/** A plain field's size in bytes, as a union lays it out (no padding: MAME's are byte-packed lanes). */
function unionFieldBytes(field: StructField): number {
  const inner = field.fields ?? PAIR_UNIONS[field.valueType ?? ''];
  const each = inner
    // A nested union is as wide as its widest member; a struct is their sum.
    ? (field.union || (!field.fields && inner)
        ? Math.max(0, ...inner.map(unionFieldBytes))
        : inner.reduce((total, member) => total + unionFieldBytes(member), 0))
    : Math.ceil((field.bits ?? 32) / 8);
  return each * (field.length ?? 1);
}

/** emucore.h's PAIR16 and PAIR as union fields: their views over two and four bytes. */
const PAIR_UNIONS: Record<string, StructField[]> = {
  PAIR16: [
    { name: 'b', fields: [{ name: 'l', bits: 8 }, { name: 'h', bits: 8 }] },
    { name: 'sb', fields: [{ name: 'l', bits: 8, signed: true }, { name: 'h', bits: 8, signed: true }] },
    { name: 'w', bits: 16 },
    { name: 'sw', bits: 16, signed: true },
  ],
  PAIR: [
    { name: 'b', fields: ['l', 'h', 'h2', 'h3'].map(name => ({ name, bits: 8 as const })) },
    { name: 'sb', fields: ['l', 'h', 'h2', 'h3'].map(name => ({ name, bits: 8 as const, signed: true })) },
    { name: 'w', fields: [{ name: 'l', bits: 16 }, { name: 'h', bits: 16 }] },
    { name: 'sw', fields: [{ name: 'l', bits: 16, signed: true }, { name: 'h', bits: 16, signed: true }] },
    { name: 'd', bits: 32 },
    { name: 'sd', bits: 32, signed: true },
  ],
};

/**
 * A union's storage: one little-endian byte store every member views from
 * its first byte, so a write through one member reads back through the
 * others. exidysound.h's 6840 counter is `union { struct { uint8_t l, h; } b;
 * uint16_t w; }`: the timer reload writes `b.h` and `b.l` and counts `w` down.
 * Only the widest member is enumerable, so a copy or a save state carries the
 * bytes once.
 */
/**
 * A union's fields with each named struct type spelled out, so it is laid
 * over the union's bytes like an anonymous one: the TMS34010's registers are
 * `union { int32_t reg; XY xy; } m_regs[31]`, and `xy` was no view at all.
 */
function unionStructTypes(
  fields: readonly StructField[],
  structs?: Readonly<Record<string, readonly StructField[]>>,
): readonly StructField[] {
  if (!structs) return fields;
  return fields.map(field => {
    if (field.fields) return { ...field, fields: [...unionStructTypes(field.fields, structs)] };
    const type = field.valueType?.trim();
    // A PAIR is MAME's own union, laid out by PAIR_UNIONS: the 6809 keeps D
    // as `struct { PAIR16 w, d; } p` over its A and B.
    if (type && PAIR_UNIONS[type]) return field;
    const declared = type ? structs[type] ?? structs[type.split('::').at(-1)!] : undefined;
    return declared ? { ...field, fields: [...unionStructTypes(declared, structs)] } : field;
  });
}

function unionMember(fields: readonly StructField[]): Record<string, unknown> {
  const size = Math.max(1, ...fields.map(unionFieldBytes));
  const bytes = new Uint8Array(size);
  const union: Record<string, unknown> = {};
  // Each view knows its union and its path there, so a field's address can
  // name the union a save state keeps (execute.ts generatedFieldAddress).
  const mark = (target: Record<string, unknown>, path: readonly string[]) =>
    Object.defineProperty(target, UNION_VIEW, { value: { root: union, path }, enumerable: false, configurable: true });
  // A struct's members follow one another; a union's all start at its base.
  const layout = (target: Record<string, unknown>, inner: readonly StructField[], base: number, overlapping: boolean, path: readonly string[]) => {
    let offset = base;
    for (const field of inner) {
      define(target, field, overlapping ? base : offset, true, path);
      offset += unionFieldBytes(field);
    }
    return target;
  };
  const view = (inner: readonly StructField[], base: number, overlapping: boolean, path: readonly string[]): Record<string, unknown> =>
    layout(mark({}, path), inner, base, overlapping, path);
  const scalar = (field: StructField, at: number) => {
    const width = Math.ceil((field.bits ?? 32) / 8);
    const truth = field.bits === 1;
    // A 64-bit field is exact: a number while one can hold it, else a bigint,
    // as the executor's own 64-bit arithmetic answers (generatedWideBinary).
    if (width === 8) {
      return {
        get: () => {
          let word = 0n;
          for (let index = 7; index >= 0; index--) word = (word << 8n) | BigInt(bytes[at + index]!);
          if (field.signed) word = BigInt.asIntN(64, word);
          return word <= BigInt(Number.MAX_SAFE_INTEGER) && word >= BigInt(Number.MIN_SAFE_INTEGER) ? Number(word) : word;
        },
        set: (next: unknown) => {
          let word = BigInt.asUintN(64, typeof next === 'bigint' ? next : BigInt(Math.trunc(Number(next) || 0)));
          for (let index = 0; index < 8; index++) {
            bytes[at + index] = Number(word & 0xffn);
            word >>= 8n;
          }
        },
      };
    }
    return {
      get: () => {
        let word = 0;
        for (let index = width - 1; index >= 0; index--) word = (word * 256) + bytes[at + index]!;
        if (field.signed && word >= 2 ** (width * 8 - 1)) word -= 2 ** (width * 8);
        return word;
      },
      set: (next: unknown) => {
        let word = truth ? (next ? 1 : 0) : Number(next) || 0;
        for (let index = 0; index < width; index++) {
          bytes[at + index] = word & 0xff;
          word = Math.floor(word / 256);
        }
      },
    };
  };
  const define = (target: Record<string, unknown>, field: StructField, at: number, enumerable: boolean, path: readonly string[]) => {
    // An anonymous member's fields are its holder's own (m6809.h's
    // `union { struct { uint8_t f, e, b, a; }; ... } r;`).
    if (field.fields && !field.name) {
      layout(target, field.fields, at, Boolean(field.union), path);
      return;
    }
    const pair = !field.fields ? PAIR_UNIONS[field.valueType ?? ''] : undefined;
    if (field.fields || pair) {
      const inner = field.fields ?? pair!;
      const overlapping = Boolean(field.union) || Boolean(pair);
      const nested = field.length
        ? Array.from({ length: field.length }, (_, index) => view(inner, at + index * unionFieldBytes({ ...field, length: 1 }), overlapping, [...path, field.name, String(index)]))
        : view(inner, at, overlapping, [...path, field.name]);
      Object.defineProperty(target, field.name, { value: nested, enumerable, configurable: true });
    } else if (field.length) {
      const width = Math.ceil((field.bits ?? 32) / 8);
      // An array field of 8, 16 or 32 bits is a typed array over the union's
      // own bytes, as the host's little-endian layout is MAME's: the Z8002's
      // `u8 B[16]; u16 W[16]; u32 L[8]` over one register file, indexed like
      // any memory by either executor. A 64-bit or unaligned one keeps exact
      // accessors (UNION_ELEMENTS).
      const View = width === 1 ? (field.signed ? Int8Array : Uint8Array)
        : width === 2 ? (field.signed ? Int16Array : Uint16Array)
          : width === 4 ? (field.signed ? Int32Array : Uint32Array) : undefined;
      if (View && field.bits !== 1 && at % width === 0) {
        Object.defineProperty(target, field.name, { value: new View(bytes.buffer, at, field.length), enumerable, configurable: true });
        return;
      }
      const elements: Record<number, unknown> & { length: number } = { length: field.length };
      for (let index = 0; index < field.length; index++) Object.defineProperty(elements, index, { ...scalar(field, at + index * width), enumerable: true });
      Object.defineProperty(elements, UNION_ELEMENTS, { value: true, enumerable: false });
      Object.defineProperty(target, field.name, { value: elements, enumerable, configurable: true });
    } else {
      Object.defineProperty(target, field.name, { ...scalar(field, at), enumerable, configurable: true });
    }
  };
  mark(union, []);
  // The widest member, a plain one where two are as wide (`w` over `b`).
  const rank = (field: StructField) => unionFieldBytes(field) * 2 + (field.fields || field.length || PAIR_UNIONS[field.valueType ?? ''] ? 0 : 1);
  const widest = fields.reduce((best, field) => rank(field) > rank(best) ? field : best, fields[0]!);
  for (const field of fields) define(union, field, 0, field === widest, []);
  Object.defineProperty(union, GENERATED_STRUCT, { value: true, enumerable: false, configurable: true });
  return union;
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

/**
 * MAME's `memory_region *`. Whoever is handed one asks it how big it is, where
 * it starts and for its bytes; a missing region answers as a null pointer
 * does, which is what lets a cartridge with no save RAM take MAME's own "no
 * NVRAM" branch.
 */
export function memoryRegionObject(bytes: Uint8Array | undefined): unknown {
  if (!bytes?.length) return 0;
  return {
    found: () => 1,
    bytes: () => bytes.length,
    base: () => bytes,
    // `&region->as_u8(n)` and `&region->as_u16(n)`: the storage from byte or
    // word n, as the device's own pointers read it.
    as_u8: (offset = 0) => Number(offset) ? { generatedPointer: true, source: bytes, offset: Number(offset) } : bytes,
    as_u16: (offset = 0) => {
      const words = generatedPackedView(bytes, false);
      return Number(offset) ? { generatedPointer: true, source: words, offset: Number(offset) } : words;
    },
    // What `&` of each answers, as emitted code asks for it.
    'as_u8&': (offset = 0) => ({ generatedPointer: true, source: bytes, offset: Number(offset) }),
    'as_u16&': (offset = 0) => ({ generatedPointer: true, source: generatedPackedView(bytes, false), offset: Number(offset) }),
  };
}

/** The `const device_state_entry &` a core's state_import/state_export reads its index from. */
function stateEntryHandle(index: number): GeneratedCallArgument {
  return { index: () => index } as unknown as GeneratedCallArgument;
}

/** How a call converts its argument to a narrow integer value parameter (`uint8_t val`), or nothing. */
function parameterNarrowing(parameter: string): ((value: number) => number) | undefined {
  if (/[*&\[]/.test(parameter)) return undefined;
  const type = parameter.replace(/=.*$/, '').replace(/\bconst\b/g, '').trim().replace(/\s+\w+$/, '').trim();
  if (type === 'u8' || type === 'uint8_t') return value => value & 0xff;
  if (type === 's8' || type === 'int8_t') return value => value << 24 >> 24;
  if (type === 'u16' || type === 'uint16_t' || type === 'unsigned short') return value => value & 0xffff;
  if (type === 's16' || type === 'int16_t' || type === 'short') return value => value << 16 >> 16;
  return undefined;
}
