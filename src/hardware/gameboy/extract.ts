import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  compileMameDevice,
  type GeneratedDeviceDefinition,
  type GeneratedDeviceMethod,
} from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
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
} from './definition.ts';

/** MAME's own file for the Game Boy cartridge slot interface. */
const SLOT_INTERFACE_FILE = 'src/devices/bus/gameboy/slot.h';

/** MAME's own file for the cartridge options this slot accepts. */
const CARTRIDGE_OPTIONS_FILE = 'src/devices/bus/gameboy/carts.cpp';

/** The slot-interface function the gameboy driver hands GB_CART_SLOT. */
const CARTRIDGE_OPTIONS_FUNCTION = 'gameboy_cartridges';

/**
 * Slot methods that identify an image rather than run the bus.
 *
 * The console room has already produced the cartridge bytes and resolved which
 * PCB the dump is, from MAME's own software list by chip CRC, so MAME's file
 * plumbing and its header sniffing are host concerns -- the same boundary the
 * NES, ColecoVision and Atari 2600 packages draw. Dropping them keeps the live
 * read/write path source-derived without dragging image_file, GBX footers and
 * error strings into the browser.
 */
const IMAGE_HOST_METHODS = new Set([
  'call_load',
  'call_unload',
  'load_image_file',
  'get_default_card_software',
  'is_reset_on_load',
  'image_interface',
  'file_extensions',
  'allocate_cart_ram',
]);

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
      dropUncompiledMethods(device, IMAGE_HOST_METHODS);
      device.slot = {
        member: slotCardMember(input.mameSource, definition, 'm_cart'),
        // MAME leaves the slot's default null and derives the PCB from the
        // cartridge header. The console room resolves it from the software
        // list's own `slot` feature instead, and a dump the list does not know
        // falls back to the plain ROM board MAME names for a header that
        // declares no controller.
        default: plainCartridgeOption(input.mameSource),
        selector: 'cart.slot',
        install: cartridgeInstaller(input.mameSource),
        options: cartridgeOptions(input.mameSource, definitions),
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
 * Drop the methods a device cannot lower, and the host methods it should not.
 *
 * A cartridge PCB is registered only if the bus it runs is whole, so a method
 * left with diagnostics has to be accounted for rather than tolerated. What is
 * dropped here is image identification: `is_collection` matches a cartridge
 * title against a table of seven known multi-game collections to choose four
 * fine bank bits instead of five, and `load_image_file` reads GBX footers.
 * Both answer questions the console room has already answered.
 */
function dropUncompiledMethods(
  device: GeneratedDeviceDefinition,
  hostMethods: ReadonlySet<string>,
): void {
  device.methods = device.methods.filter(method =>
    !method.program.diagnostics.length && !hostMethods.has(method.name));
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
): Record<string, GeneratedDeviceDefinition> {
  const source = readFileSync(join(mameSource, CARTRIDGE_OPTIONS_FILE), 'utf8');
  const names = slotOptionNames(source);
  const helpers = genericCartHelpers(mameSource);
  const body = new RegExp(
    `void\\s+${CARTRIDGE_OPTIONS_FUNCTION}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`,
  ).exec(source)?.[1];
  if (!body) throw new Error(`MAME no longer declares ${CARTRIDGE_OPTIONS_FUNCTION}`);
  const options: Record<string, GeneratedDeviceDefinition> = {};
  for (const match of body.matchAll(
    /option_add(?:_internal)?\s*\(\s*(?:\w+::)*(\w+)\s*,\s*(\w+)\s*\)/g,
  )) {
    const option = names[match[1]!];
    const definition = definitions.get(match[2]!);
    if (!option || !definition) continue;
    const card = compileMameDevice(mameSource, definition, match[2]!);
    // A card asks its slot for everything outside its own silicon. Those
    // accessors are the host's to answer -- the console room owns the image --
    // so they are dropped here and bound below; left in place, the card's own
    // `cart_space()` would answer the null pointer MAME returns when a PCB is
    // not mounted, and the cartridge would install nothing at all.
    dropUncompiledMethods(card, new Set([
      ...IMAGE_HOST_METHODS,
      ...slotPlumbing(mameSource),
    ]));
    if (!card.methods.some(method => method.name === 'load')) continue;
    card.methods.push(...helpers);
    // A Game Boy PCB reaches the mounted cartridge through the slot's own
    // accessors rather than through members MAME hands it: `cart_rom_region()`
    // and its siblings return a memory_region the PCB then asks for a size and
    // a base. Binding the accessors keeps every board's ROM, RAM and NVRAM
    // wiring exactly where MAME puts it.
    card.resources = {
      ...card.resources,
      calls: {
        ...card.resources?.calls,
        ...Object.fromEntries(cartRegionLookups(mameSource).map(([call, name]) =>
          [call, { kind: 'region-object' as const, name: `${GAMEBOY_CART_SLOT_TAG}:${name}` }])),
        // `has_slot()` asks whether this PCB is mounted; a generated card only
        // ever exists because one is.
        has_slot: { kind: 'number', value: 1 },
        // MAME reads per-cartridge tags -- `banklowbits`, `rtc`, `battery` --
        // out of the software list entry it loaded from. The room supplies the
        // bytes and the board, not those tags, so every card takes MAME's own
        // no-feature path: the same one a cartridge dumped outside a software
        // list takes there.
        loaded_through_softlist: { kind: 'number', value: 0 },
        get_feature: { kind: 'number', value: 0 },
      },
    };
    options[option] = card;
  }
  if (!Object.keys(options).length) {
    throw new Error(`no cartridge PCB lowered for ${CARTRIDGE_OPTIONS_FUNCTION}`);
  }
  return options;
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
  const helpers = compiled.methods.filter(method =>
    !method.program.diagnostics.length &&
    /^(?:install|map)_non_power_of_two$/.test(method.name));
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
 * The cartridge interface's own slot-plumbing accessors.
 *
 * Every one of them is an inline method of `device_gb_cart_interface` that
 * forwards to `m_slot`: the CPU space, the mounted image's sub-regions,
 * whether a slot is even there, battery-backed save data. The host answers
 * these, so they are read from MAME rather than listed -- a method added
 * upstream arrives with the checkout instead of being silently compiled into a
 * card as a call that returns nothing.
 */
function slotPlumbing(mameSource: string): Set<string> {
  const body = interfaceBody(
    readFileSync(join(mameSource, SLOT_INTERFACE_FILE), 'utf8'),
    'device_gb_cart_interface',
  );
  const names = new Set<string>();
  for (const match of body.matchAll(
    /\b(\w+)\s*\(([^;{}]*)\)\s*(?:const\s*)?(?:noexcept\s*)?\{([^{}]*)\}/g,
  )) {
    if (/\bm_slot\b/.test(match[3]!)) names.add(match[1]!);
  }
  if (!names.size) {
    throw new Error('MAME no longer routes Game Boy cartridge services through the slot');
  }
  return names;
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
 * The sub-regions of the slot a mounted cartridge reads, named by MAME's own
 * accessors: `memregion("rom")`, `memregion("ram")`, `memregion("nvram")`.
 */
function cartRegionLookups(mameSource: string): [string, string][] {
  const source = readFileSync(join(mameSource, SLOT_INTERFACE_FILE), 'utf8');
  const lookups = [...source.matchAll(
    /\b(\w+)\s*\(\s*\)\s*\{[^}]*m_slot->memregion\s*\(\s*"([^"]+)"\s*\)/g,
  )].map(match => [match[1]!, match[2]!] as [string, string]);
  if (!lookups.length) {
    throw new Error('MAME no longer names the Game Boy cartridge sub-regions');
  }
  return lookups;
}

/** The slot's own ROM sub-region, as the mounted cartridge reads it. */
export function cartRomRegion(mameSource: string): string {
  const rom = cartRegionLookups(mameSource)
    .find(([call]) => call.includes('rom') && !call.includes('nvram'));
  if (!rom) throw new Error('MAME no longer names a Game Boy cartridge ROM region');
  return `${GAMEBOY_CART_SLOT_TAG}:${rom[1]}`;
}

/**
 * The board MAME mounts a cartridge on when its header declares no memory
 * controller, read from `guess_cart_type`'s plain-ROM case. That is the right
 * fallback for a dump the software list does not name, and reading it rather
 * than restating it means a rename upstream fails loudly.
 */
function plainCartridgeOption(mameSource: string): string {
  const slot = readFileSync(
    join(mameSource, 'src/devices/bus/gameboy/gbslot.cpp'),
    'utf8',
  );
  // Scoped to `guess_cart_type`: the same `case cartheader::TYPE_ROM:` label
  // also appears in the human-readable description table and in the M161
  // probe, and both answer something that is not a slot option at all.
  const guess = /\bguess_cart_type\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/.exec(slot)?.[1];
  const plain = guess && /case\s+cartheader::TYPE_ROM\s*:([\s\S]*?)\n\s*case\b/.exec(guess)?.[1];
  // The last return of the case, not the first: the first is behind the
  // Wisdom Tree probe, which is image identification the room has already done.
  const constant = plain && [...plain.matchAll(/return\s+slotoptions::(\w+)\s*;/g)].at(-1)?.[1];
  const names = slotOptionNames(readFileSync(
    join(mameSource, CARTRIDGE_OPTIONS_FILE),
    'utf8',
  ));
  const option = constant && names[constant];
  if (!option) {
    throw new Error('MAME no longer names a plain-ROM Game Boy cartridge board');
  }
  return option;
}
