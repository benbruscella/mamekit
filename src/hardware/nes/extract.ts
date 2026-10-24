import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  compileMameDevice,
  type GeneratedDeviceDefinition,
} from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import {
  compileNesApu,
  generatedNesApuWorkletSource,
} from '../../mame/nes-apu-compiler.ts';
import {
  indexMameHardware,
  type MameHardwareDefinition,
} from '../../mame/hardware.ts';
import { shareCardInterface } from '../../ir/card-interface.ts';
import { nesCartOptions } from './ines-mappers.ts';
import { softwareListPeripherals } from '../../kg/softlist.ts';
import type {
  CapabilityArtifact,
  CapabilityExtraction,
  CapabilityInput,
  LoweredMethod,
} from '../contract.ts';
import {
  NES_MAME_TYPES,
  NES_APU_IR_ARTIFACT,
  NES_APU_WORKLET_ARTIFACT,
  NES_CPU_TYPES,
  nesDeviceIrArtifact,
  nesDeviceModuleArtifact,
} from './definition.ts';

/**
 * Image-device methods the host has no use for: a battery is kept by the
 * host's own NVRAM store rather than written back on unload.
 */
const IMAGE_HOST_METHODS = new Set(['call_unload']);

/** Every card inherits this interface; its methods ship once, with the slot. */
const CART_INTERFACE = 'device_nes_cart_interface';

/**
 * Compile the board-visible NES devices and their source-declared slot cards.
 *
 * Slot children stay inside the device definition. The browser therefore
 * registers exactly the devices present in the machine closure while the
 * generic device runtime can instantiate the selected controller/cart card.
 */
export function extractNes(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    NES_MAME_TYPES.includes(entry.type as (typeof NES_MAME_TYPES)[number]));
  const hasApu = input.entries.some(entry =>
    NES_CPU_TYPES.includes(entry.type as (typeof NES_CPU_TYPES)[number]));
  if (!present.length && !hasApu) return undefined;

  const definitions = indexMameHardware(input.mameSource);
  const machineWiring = nesMachineWiring(input.mameSource);
  const compiled = new Map<string, GeneratedDeviceDefinition>();
  const artifacts: CapabilityArtifact[] = [];
  for (const entry of present) {
    const definition = entry.definition as MameHardwareDefinition | undefined;
    if (!definition) continue;
    const device = compileMameDevice(input.mameSource, definition, entry.type);
    if (entry.type === 'PPU_2C02') {
      device.links = machineWiring.ppuLinks;
    } else if (entry.type === 'NES_CONTROL_PORT') {
      device.slot = {
        member: slotCardMember(input.mameSource, definition, 'm_device'),
        default: controllerDefaultOption(input.mameSource),
        options: controllerOptions(input.mameSource, definitions),
      };
    } else if (entry.type === 'NES_CART_SLOT') {
      // The slot is an image device: MAME's own get_default_card_software
      // picks the card from the software part's `slot` feature or the iNES
      // header, and call_load reads the part's areas and features into it
      // (call_load_pcb) or parses the file (call_load_ines). A method that
      // does not lower is left out, and the image path it serves with it.
      const dropped = device.methods.filter(method =>
        method.program.diagnostics.length && !IMAGE_HOST_METHODS.has(method.name));
      device.methods = device.methods.filter(method =>
        !method.program.diagnostics.length && !IMAGE_HOST_METHODS.has(method.name));
      device.summary.methods = device.methods.length;
      device.summary.compiledMethods = device.methods.length;
      device.summary.diagnostics = 0;
      if (dropped.length) {
        console.warn(`  ! NES_CART_SLOT: ${dropped.map(method => method.name).join(', ')} did not lower`);
      }
      const hotMethods = nesBusMethods(machineWiring);
      const cards = cartridgeCards(input.mameSource, definitions, hotMethods);
      device.hotMethods = hotMethods.filter(name =>
        device.methods.some(method => method.name === name));
      device.slot = {
        member: slotCardMember(input.mameSource, definition, 'm_cart'),
        options: {},
        cards: cards.modules,
        cardInterface: cards.cardInterface,
        ...(Object.keys(cards.unsupported).length ? { unsupported: cards.unsupported } : {}),
      };
      artifacts.push(...cards.artifacts);
      // nes_state::machine_start's `m_cartslot->pcb_start(m_ciram)`. The
      // reset is the driver's own machine_reset, which the board runs; a
      // second pcb_reset here reset every cartridge twice at power-on, and
      // a reset-counting multicart (resettxrom) started on the wrong game.
      device.resources = {
        initialize: [
          {
            method: 'pcb_start',
            args: [{ kind: 'memory', name: 'ciram', bytes: machineWiring.ciramBytes }],
          },
        ],
      };
      device.bus = machineWiring.cartBus;
      device.role = 'cartridge';
    }
    if (device.summary.diagnostics) continue;
    compiled.set(entry.type, device);
  }
  if (!compiled.size) return undefined;

  if (hasApu) {
    const apu = compileNesApu(input.mameSource);
    artifacts.push(
      { path: NES_APU_IR_ARTIFACT, contents: JSON.stringify(apu, null, 2) },
      { path: NES_APU_WORKLET_ARTIFACT, contents: generatedNesApuWorkletSource(apu) },
    );
  }
  const executable: CapabilityExtraction['executable'] = {};
  const entryMethods: Record<string, readonly LoweredMethod[]> = {};
  const entrySourceFiles: Record<string, readonly string[]> = {};
  for (const [type, device] of compiled) {
    const ir = nesDeviceIrArtifact(type);
    artifacts.push(
      { path: ir, contents: JSON.stringify(device, null, 2) },
      {
        path: nesDeviceModuleArtifact(type),
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

function nesBusMethods(
  wiring: ReturnType<typeof nesMachineWiring>,
): string[] {
  const methods = new Set<string>();
  for (const range of wiring.cartBus.ranges) {
    if (range.read) methods.add(range.read);
    if (range.write) methods.add(range.write);
  }
  for (const link of wiring.ppuLinks) {
    if (link.method) methods.add(link.method);
    for (const range of link.ranges ?? []) methods.add(range.method);
  }
  return [...methods];
}

/**
 * The controllers the NES's own ports can hold that something asks for: each
 * port's default card (the joypad), and every option a software list the
 * machine declares names in a title's `peripheral` feature -- nes.xml asks
 * for `zapper`, `vaus` and `powerpad`, which are MAME's own option names in
 * the ports' tables. A controller that does not compile is left out.
 */
function controllerOptions(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
): Record<string, GeneratedDeviceDefinition> {
  const driver = readFileSync(join(mameSource, 'src/mame/nintendo/nes.cpp'), 'utf8');
  const machine = extractFunctionBody(driver, 'void nes_state::nes(machine_config &config)');
  const ports = [...machine.matchAll(/NES_CONTROL_PORT\s*\(\s*config\s*,\s*\w+\s*,\s*(\w+)\s*,\s*(?:"(\w+)"|nullptr)/g)]
    .map(match => ({ table: match[1]!, default: match[2] }));
  const peripherals = new Set<string>();
  for (const list of machine.matchAll(/SOFTWARE_LIST\s*\([^)]*\)\s*\.set_original\s*\(\s*"(\w+)"/g)) {
    const xml = join(mameSource, 'hash', `${list[1]}.xml`);
    for (const name of softwareListPeripherals(readFileSync(xml, 'utf8'))) peripherals.add(name);
  }
  const tables = readFileSync(join(mameSource, 'src/devices/bus/nes_ctrl/ctrl.cpp'), 'utf8');
  const options: Record<string, GeneratedDeviceDefinition> = {};
  for (const port of ports) {
    const body = extractFunctionBody(tables, `void ${port.table}(device_slot_interface &device)`);
    for (const match of body.matchAll(/option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g)) {
      const [, option, type] = match;
      if (options[option!] || (option !== port.default && !peripherals.has(option!))) continue;
      const controller = definitions.get(type!);
      if (!controller) continue;
      const compiled = compileMameDevice(mameSource, controller, type!);
      if (!compiled.summary.diagnostics) options[option!] = compiled;
    }
  }
  if (!options.joypad) throw new Error('MAME NES controller ports no longer offer the joypad');
  return options;
}

/** Resolve the option string MAME assigns to the standard controller card. */
function controllerDefaultOption(mameSource: string): string {
  const source = readFileSync(
    join(mameSource, 'src/devices/bus/nes_ctrl/ctrl.cpp'),
    'utf8',
  );
  const body = /void\s+nes_control_port1_devices\s*\([^)]*\)\s*\{([\s\S]*?)\}/
    .exec(source)?.[1] ?? '';
  const option = /option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*NES_JOYPAD\s*\)/
    .exec(body)?.[1];
  if (!option) throw new Error('MAME NES controller options no longer declare NES_JOYPAD');
  return option;
}

/**
 * Every cartridge board MAME's `nes_cart` option list declares, compiled.
 *
 * A board is supported when it compiles; one that does not stays in the
 * list with the reason, so the room can say why rather than only that it
 * cannot. Each device type is its own module, loaded when a cartridge
 * selects it: 390 cards are 50 MB of IR, and a machine ever runs one.
 */
function cartridgeCards(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
  hotMethods: readonly string[],
): {
  modules: Record<string, string>;
  unsupported: Record<string, string>;
  cardInterface: { className: string; methods: GeneratedDeviceDefinition['methods'] };
  artifacts: CapabilityArtifact[];
} {
  const slotSource = definitions.get('NES_CART_SLOT')?.sourceFile;
  if (!slotSource) throw new Error('NES source closure is missing NES_CART_SLOT');
  const interfaceFiles = new Set([slotSource, slotSource.replace(/\.cpp$/, '.h')]);
  const interfaceMethod = (method: GeneratedDeviceDefinition['methods'][number]) =>
    interfaceFiles.has(method.source.file);

  const options = nesCartOptions(mameSource);
  const modules: Record<string, string> = {};
  const unsupported: Record<string, string> = {};
  const artifacts: CapabilityArtifact[] = [];
  let cardInterface: { className: string; methods: GeneratedDeviceDefinition['methods'] } | undefined;
  const failed = new Map<string, string>();
  const built = new Map<string, string>();
  for (const [option, type] of options) {
    const known = built.get(type) ?? failed.get(type);
    if (!known) {
      const definition = definitions.get(type);
      let reason: string | undefined;
      let card: GeneratedDeviceDefinition | undefined;
      if (!definition) reason = `MAME declares no device class for ${type}`;
      else {
        card = compileMameDevice(mameSource, definition, type);
        const broken = card.methods.find(method => method.program.diagnostics.length);
        if (broken) {
          reason = `${broken.name} (${broken.source.file}:${broken.source.line}) does not lower: ${String(broken.program.diagnostics[0])}`;
        }
      }
      if (reason || !card) {
        failed.set(type, reason ?? `${type} did not compile`);
      } else {
        card.hotMethods = hotMethods.filter(name =>
          card!.methods.some(method => method.name === name));
        // MAME's prg_alloc/vrom_alloc and friends fill the rest from the
        // image in call_load; the four PRG banks are the driver's own, which
        // pcb_start asks the root device for.
        card.resources = { members: { m_prg_bank_mem: { kind: 'bank-array', name: 'prg', count: 4 } } };
        cardInterface ??= { className: CART_INTERFACE, methods: card.methods.filter(interfaceMethod) };
        const key = type.toLowerCase();
        const shared = shareCardInterface(card.methods, cardInterface);
        const ir = `devices/nes_cart_slot/${key}.device.ir.json`;
        // Compiled from the whole card: its emitted code resolves the
        // interface's virtual calls to this card's overrides.
        const source = generatedDeviceExecutableSource(card, `${key}.device.ir.json`, '../../../core/generated-device.js');
        artifacts.push(
          {
            path: ir,
            contents: JSON.stringify(shared.shared
              ? { ...card, methods: shared.methods, inheritsCardInterface: true }
              : card),
          },
          { path: `devices/nes_cart_slot/${key}.ts`, contents: source },
        );
        built.set(type, `nes_cart_slot/${key}`);
      }
    }
    const module = built.get(type);
    if (module) modules[option] = module;
    else unsupported[option] = failed.get(type)!;
  }
  if (!cardInterface) throw new Error('no NES cartridge board compiled');
  return { modules, unsupported, cardInterface, artifacts };
}


/**
 * Recover the dynamic CPU/PPU wiring installed by nes_state::machine_start.
 * These ranges deliberately come from MAME rather than a MAMEKIT-owned NES
 * map, so source changes fail generation instead of silently drifting.
 */
function nesMachineWiring(mameSource: string): {
  ciramBytes: number;
  cartBus: NonNullable<GeneratedDeviceDefinition['bus']>;
  ppuLinks: NonNullable<GeneratedDeviceDefinition['links']>;
} {
  const nesSource = readFileSync(
    join(mameSource, 'src/mame/nintendo/nes.cpp'),
    'utf8',
  );
  const start = extractFunctionBody(nesSource, 'void nes_state::machine_start()');
  const common = start.split('// install additional handlers')[0]!;
  const ciramBytes = numericLiteral(
    /m_ciram\s*=\s*std::make_unique<[^>]+>\s*\(\s*([^)]+)\s*\)/.exec(common)?.[1],
    'NES CIRAM allocation',
  );

  const ranges: NonNullable<GeneratedDeviceDefinition['bus']>['ranges'] = [];
  const handlers = new Map<string, { start: number; end: number; read?: string; write?: string }>();
  for (const match of common.matchAll(
    /space\.install_(read|write)_handler\s*\(\s*(0x[\da-f]+)\s*,\s*(0x[\da-f]+)\s*,[^;\r\n]*?FUNC\s*\([^:()\r\n]+::(\w+)\)\s*\)+\s*;/gi,
  )) {
    const kind = match[1]!;
    const startAddress = Number(match[2]);
    const endAddress = Number(match[3]);
    const method = match[4]!;
    const key = `${startAddress}:${endAddress}`;
    const range = handlers.get(key) ?? { start: startAddress, end: endAddress };
    range[kind === 'read' ? 'read' : 'write'] = method;
    handlers.set(key, range);
  }
  ranges.push(...handlers.values());

  const banks = /for\s*\([^;]+;\s*\w+\s*<\s*(\d+)\s*;[^)]*\)\s*space\.install_read_bank\s*\(\s*(0x[\da-f]+)\s*\+\s*(0x[\da-f]+)\s*\*\s*(\w+)\s*,\s*(0x[\da-f]+)\s*\+\s*(0x[\da-f]+)\s*\*\s*\4\s*,\s*m_prg_bank\s*\[\s*\4\s*\]\s*\)/i
    .exec(common);
  if (!banks) throw new Error('MAME NES machine_start no longer declares PRG banks');
  const count = Number(banks[1]);
  const firstStart = Number(banks[2]);
  const startStride = Number(banks[3]);
  const firstEnd = Number(banks[5]);
  const endStride = Number(banks[6]);
  const highWrite = ranges.find(range =>
    range.start === firstStart && range.write)?.write ??
    handlers.get(`${firstStart}:${0xffff}`)?.write;
  for (let index = 0; index < count; index++) {
    ranges.push({
      start: firstStart + startStride * index,
      end: firstEnd + endStride * index,
      bank: `prg${index}`,
      ...(highWrite ? { write: highWrite } : {}),
    });
  }
  // A single high write handler spans the banked read ranges. It is composed
  // into each bank range, so remove the otherwise overlapping standalone row.
  const compactRanges: NonNullable<GeneratedDeviceDefinition['bus']>['ranges'] = ranges.filter(range =>
    !(range.start === firstStart && range.end === 0xffff && range.write === highWrite));
  // Installed after the banks, so a card's own read_h takes the window over
  // from them as MAME's later install does.
  compactRanges.push(...cardHandlerRanges(mameSource, start));

  const ppuRanges: {
    start: number;
    end: number;
    target: 'slot';
    read: string;
    write: string;
  }[] = [];
  for (const match of common.matchAll(
    /m_ppu->space\([^)]*\)\.install_readwrite_handler\s*\(\s*(0x[\da-f]+|0)\s*,\s*(0x[\da-f]+)\s*,[\s\S]*?::(\w+)\)+\s*,[\s\S]*?::(\w+)\)+\s*\)\s*;/gi,
  )) {
    ppuRanges.push({
      start: Number(match[1]),
      end: Number(match[2]),
      target: 'slot',
      read: match[3]!,
      write: match[4]!,
    });
  }
  const ppuSource = readFileSync(
    join(mameSource, 'src/devices/video/ppu2c0x.cpp'),
    'utf8',
  );
  const ppuMap = extractFunctionBody(
    ppuSource,
    'void ppu2c0x_device::ppu2c0x(address_map& map)',
  );
  const palette = /map\s*\(\s*(0x[\da-f]+)\s*,\s*(0x[\da-f]+)\s*\)\.rw\s*\(\s*FUNC\([^:()]+::(\w+)\)\s*,\s*FUNC\([^:()]+::(\w+)\)\s*\)/i
    .exec(ppuMap);
  if (!palette || ppuRanges.length === 0) {
    throw new Error('MAME NES PPU address-space wiring could not be recovered');
  }
  ppuRanges.push({
    start: Number(palette[1]),
    end: Number(palette[2]),
    target: 'slot',
    read: palette[3]!,
    write: palette[4]!,
  });
  const delegateMembers: Record<string, string> = {
    scanline: 'm_scanline_callback_proc',
    hblank: 'm_hblank_callback_proc',
    latch: 'm_latch',
  };
  const delegateLinks = [...common.matchAll(
    /m_ppu->set_(scanline|hblank|latch)(?:_callback)?\s*\([\s\S]*?FUNC\s*\([^:()]+::(\w+)\)\s*\)\s*;/g,
  )].map(match => ({
    call: delegateMembers[match[1]!]!,
    targetRole: 'cartridge',
    method: match[2]!,
  }));

  return {
    ciramBytes,
    cartBus: { cpu: 'maincpu', ranges: compactRanges },
    ppuLinks: [
      {
        call: 'space().read_byte',
        targetRole: 'cartridge',
        ranges: ppuRanges.map(range => ({
          start: range.start,
          end: range.end,
          target: range.read.startsWith('palette_') ? 'self' : range.target,
          method: range.read,
        })),
      },
      {
        call: 'space().write_byte',
        targetRole: 'cartridge',
        ranges: ppuRanges.map(range => ({
          start: range.start,
          end: range.end,
          target: range.write.startsWith('palette_') ? 'self' : range.target,
          method: range.write,
        })),
      },
      ...delegateLinks,
    ],
  };
}

/**
 * The handlers `machine_start` installs only for some boards: after the
 * common wiring it tests the card's `get_pcb_id()` against three PCB lists
 * (`r_h_pcbs`, `w_ex_pcbs`, `rw_ex_pcbs`) and installs read_h, read_ex and
 * write_ex for the boards each names. Each list is read from MAME and its PCB
 * ids turned back into the slot options that select them (`pcb_list`), so a
 * range carries the cards it is installed for.
 */
function cardHandlerRanges(
  mameSource: string,
  start: string,
): NonNullable<GeneratedDeviceDefinition['bus']>['ranges'] {
  const extra = start.split('// install additional handlers')[1];
  if (!extra) throw new Error('MAME NES machine_start no longer installs per-board handlers');
  const pcbs = readFileSync(join(mameSource, 'src/devices/bus/nes/nes_pcb.hxx'), 'utf8');
  const optionsByPcb = new Map<string, string[]>();
  for (const match of pcbs.matchAll(/\{\s*"([^"]+)"\s*,\s*(\w+)\s*\}/g)) {
    const options = optionsByPcb.get(match[2]!) ?? [];
    options.push(match[1]!);
    optionsByPcb.set(match[2]!, options);
  }
  const lists = new Map<string, string[]>();
  for (const match of extra.matchAll(/static\s+const\s+int\s+(\w+)\s*\[\s*\]\s*=\s*\{([^}]*)\}/g)) {
    lists.set(match[1]!, match[2]!.split(',').map(name => name.trim()).filter(Boolean));
  }
  const ranges: NonNullable<GeneratedDeviceDefinition['bus']>['ranges'] = [];
  for (const block of extra.matchAll(/if\s*\(\s*std::find\s*\(\s*std::begin\s*\(\s*(\w+)\s*\)[^{]*\{([^}]*)\}/g)) {
    const pcbIds = lists.get(block[1]!);
    if (!pcbIds) throw new Error(`MAME NES machine_start tests an unknown PCB list ${block[1]}`);
    const cards = pcbIds.flatMap(id => optionsByPcb.get(id) ?? []);
    const handlers = new Map<string, { start: number; end: number; read?: string; write?: string }>();
    for (const install of block[2]!.matchAll(
      /space\.install_(read|write)_handler\s*\(\s*(0x[\da-f]+)\s*,\s*(0x[\da-f]+)\s*,[^;]*?FUNC\s*\([^:()]+::(\w+)\)\s*\)+\s*;/gi,
    )) {
      const key = `${install[2]}:${install[3]}`;
      const range = handlers.get(key) ?? { start: Number(install[2]), end: Number(install[3]) };
      range[install[1] === 'read' ? 'read' : 'write'] = install[4]!;
      handlers.set(key, range);
    }
    if (!handlers.size) throw new Error(`MAME NES machine_start installs nothing for ${block[1]}`);
    for (const range of handlers.values()) ranges.push({ ...range, cards });
  }
  if (!ranges.length) throw new Error('MAME NES per-board handlers could not be recovered');
  return ranges;
}

function extractFunctionBody(source: string, signature: string): string {
  const signatureAt = source.indexOf(signature);
  if (signatureAt < 0) throw new Error(`MAME source is missing ${signature}`);
  const open = source.indexOf('{', signatureAt + signature.length);
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}' && --depth === 0) {
      return source.slice(open + 1, index);
    }
  }
  throw new Error(`MAME source has an unterminated ${signature}`);
}

function numericLiteral(value: string | undefined, description: string): number {
  if (!value || !/^(?:0x[\da-f]+|\d+)$/i.test(value.trim())) {
    throw new Error(`MAME source no longer has a literal ${description}`);
  }
  return Number(value);
}

/** The live-card member is assigned from get_card_device() in device_start. */
function slotCardMember(
  mameSource: string,
  definition: MameHardwareDefinition,
  fallback: string,
): string {
  const source = readFileSync(join(mameSource, definition.sourceFile), 'utf8');
  return /\b(m_\w+)\s*=\s*get_card_device\s*\(\s*\)/.exec(source)?.[1] ?? fallback;
}
