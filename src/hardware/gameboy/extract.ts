import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  compileMameDevice,
  type GeneratedDeviceDefinition,
  type GeneratedDeviceMethod,
} from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { cartSlotFacts } from '../../mame/cart-slot.ts';
import {
  indexMameHardware,
  type MameHardwareDefinition,
} from '../../mame/hardware.ts';
import type {
  CapabilityArtifact,
  CapabilityExtraction,
  CapabilityInput,
  LoweredMethod,
} from '../contract.ts';
import {
  GAMEBOY_CART_SLOT_TAG,
  GAMEBOY_MAME_TYPES,
  gameboyDeviceIrArtifact,
  gameboyDeviceModuleArtifact,
  GAMEBOY_APU_TYPE,
} from './definition.ts';
import { streamWorkletArtifact } from '../speaker/extract.ts';

/** MAME's own file for the Game Boy cartridge slot interface. */
const SLOT_INTERFACE_FILE = 'src/devices/bus/gameboy/slot.h';

/** MAME's own file for the cartridge options this slot accepts. */
const CARTRIDGE_OPTIONS_FILE = 'src/devices/bus/gameboy/carts.cpp';

/** The slot-interface function the gameboy driver hands GB_CART_SLOT. */
const CARTRIDGE_OPTIONS_FUNCTION = 'gameboy_cartridges';

/** The console's own software list, which says which boards its carts use. */
const SOFTWARE_LIST_FILE = 'hash/gameboy.xml';

/**
 * Compile the Game Boy's PPU, its sound chip, its cartridge slot and the PCBs
 * the slot declares.
 *
 * Slot children stay inside the device definition, so the browser registers
 * exactly the devices the machine composes while the generic device runtime
 * instantiates whichever PCB the mounted cartridge selects.
 */
export function extractGameboy(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    GAMEBOY_MAME_TYPES.includes(entry.type as (typeof GAMEBOY_MAME_TYPES)[number]));
  if (!present.length) return undefined;

  const definitions = indexMameHardware(input.mameSource);
  const compiled = new Map<string, GeneratedDeviceDefinition>();
  for (const entry of present) {
    const definition = entry.definition as MameHardwareDefinition | undefined;
    if (!definition) continue;
    const device = compileMameDevice(input.mameSource, definition, entry.type);
    if (entry.type === 'GB_CART_SLOT') {
      // The slot is an image device and mounts its own cartridges, as the
      // NES's and the SNES's do: get_default_card_software picks the board
      // from the software part's `slot` feature or from the file's header,
      // and call_load reads a file into the regions the board asks for
      // (load_image_file, allocate_cart_ram) before it runs the board's own
      // `load`. A software part's areas are those regions already.
      dropUncompiledMethods(device, 'GB_CART_SLOT');
      const cards = cartridgeOptions(input.mameSource, definitions);
      device.slot = {
        member: slotCardMember(input.mameSource, definition, 'm_cart'),
        // What get_default_card_software falls through to for a part naming
        // no board; the fitted default when no cartridge is in the slot.
        default: plainCartridgeOption(input.mameSource),
        install: cartridgeInstaller(input.mameSource),
        options: cards.options,
        ...(Object.keys(cards.unsupported).length ? { unsupported: cards.unsupported } : {}),
      };
      device.role = 'cartridge';
    }
    if (device.summary.diagnostics) continue;
    compiled.set(entry.type, device);
  }
  if (!compiled.size) return undefined;

  const artifacts: CapabilityArtifact[] = [];
  const executable: CapabilityExtraction['executable'] = {};
  const entryMethods: Record<string, readonly LoweredMethod[]> = {};
  const entrySourceFiles: Record<string, readonly string[]> = {};
  for (const [type, device] of compiled) {
    const ir = gameboyDeviceIrArtifact(type);
    artifacts.push(
      { path: ir, contents: JSON.stringify(device, null, 2) },
      {
        path: gameboyDeviceModuleArtifact(type),
        contents: generatedDeviceExecutableSource(device, ir.replace('devices/', '')),
      },
      // The APU renders in the stream mix; the shared worklet plays it.
      ...(type === GAMEBOY_APU_TYPE ? [streamWorkletArtifact()] : []),
    );
    executable[type] = { kind: 'device', artifact: ir };
    entrySourceFiles[type] = device.sourceFiles;
    entryMethods[type] = device.methods.map(method => ({
      name: method.name,
      parameters: method.parameters,
      sourceFile: method.source.file,
      sourceLine: method.source.line,
      body: '',
      program: method.program,
    }));
  }
  return {
    executableTypes: [...compiled.keys()],
    executable,
    artifacts,
    entryMethods,
    entrySourceFiles,
  };
}

/**
 * Leave out the methods that do not lower, and say which: an image device's
 * host plumbing can fail without the bus it serves failing with it, but a
 * dropped method is never silent.
 */
function dropUncompiledMethods(
  device: GeneratedDeviceDefinition,
  label: string,
  hosted: ReadonlySet<string> = new Set(),
): void {
  const dropped = device.methods.filter(method => method.program.diagnostics.length);
  if (dropped.length) console.warn(`  ! ${label}: ${dropped.map(method => method.name).join(', ')} did not lower`);
  device.methods = device.methods.filter(method =>
    !method.program.diagnostics.length && !hosted.has(method.name.split('::').at(-1)!));
  device.summary.methods = device.methods.length;
  device.summary.compiledMethods = device.methods.length;
  device.summary.diagnostics = 0;
}

function slotCardMember(
  mameSource: string,
  definition: MameHardwareDefinition,
  fallback: string,
): string {
  const source = readFileSync(join(mameSource, definition.sourceFile), 'utf8');
  const slotBase = readFileSync(join(mameSource, 'src/devices/bus/gameboy/slot.cpp'), 'utf8');
  return /\b(m_\w+)\s*=\s*get_card_device\s*\(\s*\)/.exec(source)?.[1] ??
    /\b(m_\w+)\s*=\s*get_card_device\s*\(\s*\)/.exec(slotBase)?.[1] ??
    fallback;
}

/**
 * How a mounted PCB installs itself, as MAME's own cartridge interface says.
 *
 * `device_gb_cart_interface` declares one pure virtual -- `load(message)` --
 * and the slot calls it once the image is in place; the PCB reaches the CPU's
 * space through `cart_space()` rather than being handed it. The Atari 2600's
 * interface does the opposite and takes the space as an argument, which is why
 * the host cannot assume either shape. Read from source so a rename upstream
 * fails loudly instead of silently mounting a cartridge that decodes nothing.
 */
function cartridgeInstaller(
  mameSource: string,
): { method: string; space: string } {
  const source = readFileSync(join(mameSource, SLOT_INTERFACE_FILE), 'utf8');
  const method = /\bvirtual\s+[\w:<>,\s*&]+?\b(\w+)\s*\([^)]*\)\s*(?:ATTR_\w+\s*)*=\s*0\s*;/
    .exec(interfaceBody(source, 'device_gb_cart_interface'))?.[1];
  if (!method) {
    throw new Error('MAME no longer declares a Game Boy cartridge load entry point');
  }
  const space = /\b(\w+)\s*\(\s*\)\s*noexcept\s*\{[^}]*m_slot->m_space/
    .exec(source)?.[1];
  if (!space) {
    throw new Error('MAME no longer gives a Game Boy cartridge access to the CPU space');
  }
  return { method, space };
}

/**
 * The body of one class *definition* in a MAME header.
 *
 * Not the forward declaration: `class device_gb_cart_interface;` appears
 * pages before the real thing, and taking the next brace after it hands back
 * the body of whatever class is declared next.
 */
function interfaceBody(source: string, className: string): string {
  const start = new RegExp(`\\bclass\\s+${className}\\s*(?::|\\{)`).exec(source)?.index ?? -1;
  if (start < 0) throw new Error(`MAME no longer defines ${className}`);
  const open = source.indexOf('{', start);
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}' && --depth === 0) return source.slice(open + 1, index);
  }
  throw new Error(`MAME's ${className} declaration is unterminated`);
}

/**
 * The boards `gameboy_cartridges` declares that the software list uses, as
 * (option, device type) pairs: what the slot can be handed.
 */
export function gameboyCartOptions(mameSource: string): [string, string][] {
  const source = readFileSync(join(mameSource, CARTRIDGE_OPTIONS_FILE), 'utf8');
  const names = slotOptionNames(source);
  const used = softwareListBoards(mameSource, plainCartridgeOption(mameSource));
  const body = new RegExp(
    `void\\s+${CARTRIDGE_OPTIONS_FUNCTION}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`,
  ).exec(source)?.[1] ?? '';
  return [...body.matchAll(/option_add(?:_internal)?\s*\(\s*(?:\w+::)*(\w+)\s*,\s*(\w+)\s*\)/g)]
    .map(match => [names[match[1]!], match[2]!] as [string | undefined, string])
    .filter((pair): pair is [string, string] => pair[0] !== undefined && used.has(pair[0]));
}

/**
 * The cartridge PCBs MAME declares for this slot, keyed by the option name the
 * software list uses.
 *
 * Read from MAME's own `gameboy_cartridges` rather than restated, so a board
 * added upstream arrives with the MAME checkout. The option names are `char
 * const *` constants in the same file rather than string literals, so they are
 * resolved from there too. A PCB whose live bus does not fully lower is left
 * out rather than registered as hardware that would misread its own ROM.
 */
function cartridgeOptions(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
): { options: Record<string, GeneratedDeviceDefinition>; unsupported: Record<string, string> } {
  const source = readFileSync(join(mameSource, CARTRIDGE_OPTIONS_FILE), 'utf8');
  const names = slotOptionNames(source);
  const helpers = genericCartHelpers(mameSource);
  const used = softwareListBoards(mameSource, plainCartridgeOption(mameSource));
  const body = new RegExp(
    `void\\s+${CARTRIDGE_OPTIONS_FUNCTION}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`,
  ).exec(source)?.[1];
  if (!body) throw new Error(`MAME no longer declares ${CARTRIDGE_OPTIONS_FUNCTION}`);
  const options: Record<string, GeneratedDeviceDefinition> = {};
  const unsupported: Record<string, string> = {};
  for (const match of body.matchAll(
    /option_add(?:_internal)?\s*\(\s*(?:\w+::)*(\w+)\s*,\s*(\w+)\s*\)/g,
  )) {
    const option = names[match[1]!];
    const definition = definitions.get(match[2]!);
    if (!option || !definition || !used.has(option)) continue;
    const card = compileMameDevice(mameSource, definition, match[2]!);
    // A board is registered only if the bus it runs is whole: one with a
    // method that did not lower is named as unsupported, with the methods,
    // and the room says so (the Pocket Camera's sensor, for now).
    if (card.summary.diagnostics) {
      const failing = [...new Set(card.methods.filter(method => method.program.diagnostics.length)
        .map(method => method.name.split('::').at(-1)!))];
      unsupported[option] = `${match[2]!}: ${failing.slice(0, 6).join(', ')}${failing.length > 6 ? ', ...' : ''} did not lower`;
      continue;
    }
    // A card asks its slot for everything outside its own silicon, through
    // the inline accessors of device_gb_cart_interface: the mounted image's
    // regions, its software-list features, its battery. Those run as MAME
    // wrote them, against the slot the card is in. The one the slot answers
    // for the card is the CPU's space, which it hands out for the length of
    // a load (slot.install).
    dropUncompiledMethods(card, match[2]!, new Set([cartridgeInstaller(mameSource).space]));
    if (!card.methods.some(method => method.name === 'load')) continue;
    card.methods.push(...helpers);
    options[option] = card;
  }
  // The plain board and the one most of the list uses must be there.
  for (const required of [plainCartridgeOption(mameSource), 'rom_mbc1']) {
    if (!options[required]) {
      throw new Error(`the Game Boy's ${required} board must lower (${JSON.stringify(unsupported)})`);
    }
  }
  return { options, unsupported };
}

/**
 * MAME's shared cartridge address-decode helpers.
 *
 * `device_generic_cart_interface` is not a base of any Game Boy PCB -- the
 * boards call its two statics by qualified name -- but they are how every one
 * of them works out which power-of-two windows its ROM decodes into and where
 * each mirrors. Compiled from MAME's own header and attached under the name
 * the call sites use, so the decode stays source-derived rather than becoming
 * a handwritten address calculation in the browser.
 *
 * `Shift` is the template parameter naming the bus width; every Game Boy call
 * site instantiates it at zero, an 8-bit bus, which is asserted rather than
 * assumed.
 */
function genericCartHelpers(mameSource: string): GeneratedDeviceMethod[] {
  const sourceFile = 'src/devices/bus/generic/slot.h';
  const className = 'device_generic_cart_interface';
  const compiled = compileMameDevice(mameSource, {
    type: className.toUpperCase(),
    className,
    sourceFile,
    sourceLine: 1,
    sourceColumn: 1,
    macro: '',
  }, className.toUpperCase());
  // The arity aliases come along (`install_non_power_of_two__6`): the
  // five-argument form's call to its sibling is resolved to one at compile
  // time (device-compiler resolveArityOverloads).
  const helpers = compiled.methods.filter(method =>
    !method.program.diagnostics.length &&
    /^(?:install|map)_non_power_of_two(?:__\d+)?$/.test(method.name));
  if (!helpers.length) {
    throw new Error(`MAME no longer declares ${className}'s address-decode helpers`);
  }
  // Under both spellings, and every overload under each: a PCB calls the
  // helper by its qualified name, and the five-argument form then calls its
  // six-argument sibling unqualified from inside the same class. `Shift` is
  // an 8-bit cartridge bus, which is what MAME's Game Boy boards instantiate.
  return helpers.flatMap(method => [method, { ...method, name: `${className}::${method.name}` }]
    .map(named => ({ ...named, constants: { ...named.constants, Shift: 0 } })));
}

/**
 * The cartridge boards this console's own software list actually names.
 *
 * `gameboy_cartridges` is shared with the Game Boy Color and the Mega Duck, so
 * a third of what it declares is for cartridges that cannot appear in this
 * machine's list at all. Registering them costs the visitor a download and the
 * build a type-check of hardware nothing can select, so the set is narrowed to
 * MAME's own answer to "what boards do Game Boy cartridges use" -- read from
 * the list rather than chosen here.
 */
function softwareListBoards(mameSource: string, fallback: string): Set<string> {
  const path = join(mameSource, SOFTWARE_LIST_FILE);
  // A sparse MAME checkout can omit `hash/` entirely. Say which file and why,
  // rather than letting a raw ENOENT out of a capability: the alternative --
  // quietly registering all 35 boards the slot declares -- triples the emitted
  // artifact and is exactly the kind of silent widening this compiler is meant
  // not to do.
  if (!existsSync(path)) {
    throw new Error(
      `${SOFTWARE_LIST_FILE} is missing from the MAME checkout; the Game Boy ` +
      'cartridge set is narrowed to the boards its own software list names',
    );
  }
  const list = readFileSync(path, 'utf8');
  const boards = new Set<string>([fallback]);
  for (const match of list.matchAll(
    /<feature\s+name="slot"\s+value="([^"]+)"\s*\/?>/g,
  )) boards.add(match[1]!);
  if (boards.size < 2) {
    throw new Error(`${SOFTWARE_LIST_FILE} no longer names any cartridge board`);
  }
  return boards;
}

/** `char const *const GB_MBC1 = "rom_mbc1";`, as a constant-to-option map. */
function slotOptionNames(source: string): Record<string, string> {
  const names: Record<string, string> = {};
  for (const match of source.matchAll(
    /\bchar\s+const\s*\*\s*const\s+(\w+)\s*=\s*"([^"]+)"\s*;/g,
  )) {
    names[match[1]!] = match[2]!;
  }
  if (!Object.keys(names).length) {
    throw new Error('MAME no longer names the Game Boy cartridge slot options');
  }
  return names;
}

/**
 * The plain ROM board: what the slot's own `get_default_card_software` falls
 * through to for a software-list cartridge naming no board
 * (`software_get_default_slot(slotoptions::GB_STD)`), and what
 * `guess_cart_type` answers for a header declaring no memory controller.
 * Reading it rather than restating it means a rename upstream fails loudly.
 */
function plainCartridgeOption(mameSource: string): string {
  const option = cartSlotFacts(mameSource, 'GB_CART_SLOT', GAMEBOY_CART_SLOT_TAG)?.defaultOption;
  if (!option) {
    throw new Error('MAME no longer names a plain-ROM Game Boy cartridge board');
  }
  return option;
}
