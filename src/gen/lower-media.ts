
import { mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { KGNode } from '../kg/types.ts';
import type { Graph } from '../kg/query.ts';
import { parseSoftwareList, buildCatalog } from '../kg/softlist.ts';

import { writeSoftwareShelves, type ShelfSwitch } from './software-shelves.ts';
import { connectorFloppyFormats, floppyFormatExtensions } from '../mame/floppy-compiler.ts';
import { DATASSETTE_IMAGE_EXTENSIONS, cassetteFormatListExtensions } from '../mame/cassette-compiler.ts';
import type { SoftwareShelves } from '../runtime/shell.ts';
import { romsDir } from '../paths.ts';
import { indexMameHardware } from '../mame/hardware.ts';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '../..');

import type { GenerateOptions } from './generate.ts';

import { CART_SLOT_SUPPORT, CART_INTERFACE_BY_FAMILY, CART_DEFAULT_SLOT, CART_ROM_REGION, CART_GAME_SUPPORT, cartFileExtensions, localCartArt, writeCartShelfIndex } from './cartridge-catalog.ts';

export function lowerMedia(game: KGNode, kind: "console" | "computer" | undefined, opts: GenerateOptions, devices: KGNode[], softlistNodes: KGNode[], category: "arcade" | "consoles" | "computers", family: string, g?: Graph, switches: readonly ShelfSwitch[] = []) {
  // --- emit ---------------------------------------------------------------------------
  const title = `${game.props.fullname} (${game.props.company}, ${game.props.year})`;

  // Console cart catalog: the machine's primary software list (first
  // status:'original' whose hash/<name>.xml exists) extracted to a sibling
  // artifact — dist/<machine>/softlist.json. The graph carries the LIST fact;
  // the 4,500+ cart entries stay out of graph.json (they'd swamp the viewer).
  let cart: Record<string, unknown> | undefined;
  let cartEntries = 0;
  // Whichever board device is the cartridge image declares what it accepts.
  const slotExtensions = kind === 'console'
    ? cartFileExtensions(opts.mameSrc, devices.map(device => String(device.props.type)))
    : undefined;
  if (kind === 'console') {
    mkdirSync(opts.outDir, { recursive: true });
    for (const listNode of softlistNodes) {
      if (listNode.props.status !== 'original') continue;
      const listName = String(listNode.props.name);
      const xmlPath = join(opts.mameSrc, 'hash', `${listName}.xml`);
      const catalogPath = join(opts.outDir, 'softlist.json');
      const catalog = existsSync(xmlPath)
        ? buildCatalog(
            parseSoftwareList(readFileSync(xmlPath, 'utf8')),
            listNode.props.filter ? String(listNode.props.filter) : undefined,
          )
        : existsSync(catalogPath)
          ? JSON.parse(readFileSync(catalogPath, 'utf8'))
          : null;
      if (!catalog) continue;
      if (existsSync(xmlPath)) {
        // compact on purpose: ~4.5k entries; indented it triples in size
        writeFileSync(catalogPath, JSON.stringify(catalog));
      }
      const set = `${category}/${opts.game}`;
      const cartArt = localCartArt(listName);
      const artCount = Object.keys(cartArt).length;
      const shelved = writeCartShelfIndex(
        join(romsDir(projectRoot), category, opts.game), opts.outDir, set);
      cart = {
        interface: catalog.interface,
        list: listName,
        catalogUrl: 'softlist.json',
        ...(shelved ? { cartsUrl: 'carts.json' } : {}),
        ...(artCount ? { cartArt } : {}),
        slots: CART_SLOT_SUPPORT[family] ?? [],
        games: CART_GAME_SUPPORT[family] ?? [],
        ...(CART_DEFAULT_SLOT[family] ? { defaultSlot: CART_DEFAULT_SLOT[family] } : {}),
        ...(CART_ROM_REGION[family] ? { romRegion: CART_ROM_REGION[family] } : {}),
        ...(slotExtensions ? { extensions: slotExtensions } : {}),
      };
      if (shelved) console.log(`cart shelf index: ${shelved} dumps available for ${set}`);
      if (artCount) console.log(`cart artwork: ${artCount} cartridge(s) with local photography`);
      cartEntries = catalog.entries.length;
      console.log(`softlist "${listName}": ${catalog.entries.length} cartridges catalogued`);
      break;
    }
    if (!cart) {
      const listNode = softlistNodes.find(node => node.props.status === 'original');
      const cartInterface = CART_INTERFACE_BY_FAMILY[family];
      if (listNode && cartInterface) {
        cart = {
          interface: cartInterface,
          list: String(listNode.props.name),
          catalogUrl: 'softlist.json',
          slots: CART_SLOT_SUPPORT[family] ?? [],
          games: CART_GAME_SUPPORT[family] ?? [],
          ...(CART_DEFAULT_SLOT[family] ? { defaultSlot: CART_DEFAULT_SLOT[family] } : {}),
          ...(CART_ROM_REGION[family] ? { romRegion: CART_ROM_REGION[family] } : {}),
          ...(slotExtensions ? { extensions: slotExtensions } : {}),
        };
      }
    }
    if (!cart) console.warn('  ! console machine has no resolvable software list — carts will be header-identified only');
  }

  // Computer software shelves: one catalogue per software list the driver
  // declares, because a computer's software arrives on several media. The
  // dumps a shelf can offer are filed per driver family under .data/roms --
  // the PAL and NTSC C64 share one tape collection -- so the machine's own
  // directory is tried first and the family's is the fallback.
  let software: SoftwareShelves | undefined;
  if (kind === 'computer') {
    // The collection belongs to the driver that declares the software lists:
    // the Spectrum 128's spec128.cpp builds on spectrum.cpp's
    // spectrum_common, whose `spectrum_cass` it shares with the 48K.
    const listFamily = softlistNodes
      .map(node => /^softlist:([^/]+)\//.exec(node.id)?.[1])
      .map(config => config && g?.node(`machine:${config}`)?.props.sourceFile)
      .map(file => typeof file === 'string' ? basename(file).replace(/\.cpp$/, '') : undefined)
      .find(Boolean) ?? family;
    const dumpsDir = [opts.game, listFamily, family]
      .map(name => join(romsDir(projectRoot), category, name))
      .find(dir => existsSync(dir));
    // What the disk transport reads, from MAME's own registrations: the
    // connector's set_formats names the formats, each format its extensions.
    const floppy = devices.some(device => device.props.type === 'FLOPPY_CONNECTOR')
      ? [...new Set(connectorFloppyFormats(opts.mameSrc,
        devices.flatMap(device => device.props.sourceFile ? [String(device.props.sourceFile)] : []))
        .flatMap(name => floppyFormatExtensions(opts.mameSrc, name)))]
      : undefined;
    // A quickload reads what its machine config told it to:
    // `QUICKLOAD(config, "quickload", "p00,prg,t64", ...)` runs set_extensions.
    const quickload = [...new Set(devices
      .filter(device => device.props.type === 'QUICKLOAD')
      .flatMap(device => (Array.isArray(device.props.configCalls) ? device.props.configCalls : [])
        .flatMap(call => /^set_extensions\("([^"]*)"\)$/.exec(String(call))?.[1]?.split(',') ?? []))
      .map(extension => extension.trim().toLowerCase())
      .filter(Boolean))];
    // A cartridge port reads files too, the ones its file_extensions() names:
    // the C64's expansion port takes .80, .a0, .e0 and .crt.
    const cartridgeFiles = [...new Set(devices
      .filter(device => device.props.type === 'C64_EXPANSION_SLOT')
      .flatMap(device => imageFileExtensions(opts.mameSrc, String(device.props.type))))];
    // A board's own cassette reads the formats its config names:
    // `m_cassette->set_formats(tzx_cassette_formats)` is TZX, TAP and CDT,
    // and not the .mp3 files a few Spectrum sets hold.
    const cassetteFormats = [...new Set(devices
      .filter(device => device.props.type === 'CASSETTE')
      .flatMap(device => (Array.isArray(device.props.configCalls) ? device.props.configCalls : [])
        .flatMap(call => /^set_formats\("(\w+)"\)$/.exec(String(call))?.[1] ?? []))
      .flatMap(list => cassetteFormatListExtensions(opts.mameSrc, list)))];
    software = writeSoftwareShelves({
      mameSrc: opts.mameSrc,
      outDir: opts.outDir,
      transportExtensions: {
        ...(floppy?.length ? { floppy } : {}),
        // A datassette port's deck reads what the cassette compiler wires.
        ...(devices.some(device => device.props.type === 'PET_DATASSETTE_PORT')
          ? { cassette: DATASSETTE_IMAGE_EXTENSIONS }
          : cassetteFormats.length ? { cassette: cassetteFormats } : {}),
        ...(quickload.length ? { quickload } : {}),
        ...(cartridgeFiles.length ? { cartridge: cartridgeFiles } : {}),
      },
      switches,
      artFor: localCartArt,
      lists: [
        ...softlistNodes.map(node => ({
          name: String(node.props.name),
          status: String(node.props.status),
          ...(node.props.filter ? { filter: String(node.props.filter) } : {}),
        })),
        // A list the machine declares itself is the machine's shelf.
        ...cardSoftwareLists(opts.mameSrc, devices).filter((list, index, all) =>
          !softlistNodes.some(node => node.props.name === list.name) &&
          all.findIndex(other => other.name === list.name) === index),
      ],
      devices: devices.map(device => ({
        type: String(device.props.type),
        tag: String(device.props.tag),
        ...(device.props.slotDefault ? { slotDefault: String(device.props.slotDefault) } : {}),
        ...(typeof device.props.slotAddress === 'number' ? { slotAddress: device.props.slotAddress } : {}),
        ...(g && imageLoader(g, device) ? { loader: imageLoader(g, device) } : {}),
      })),
      ...(dumpsDir ? { dumpsDir } : {}),
      dumpsKey: `${category}/${dumpsDir ? basename(dumpsDir) : listFamily}`,
      log: line => console.log(line),
    });
    if (!software) console.warn('  ! computer declares no software list this build can read — the room will accept dropped media only');
  }

  return { title, cart, software, cartEntries };
}

/**
 * The software lists a slot's cards declare, each with the card and the
 * image device on it that reads the list. The ZX Interface 2 declares
 * `spectrum_cart` in its own device_add_mconfig, beside the
 * `GENERIC_CARTSLOT(config, m_cart, generic_plain_slot, "spectrum_cart",
 * "bin,rom")` that takes it, so a Spectrum's cartridges are a shelf of the
 * expansion slot holding that card, not of the machine.
 */
function cardSoftwareLists(mameSrc: string, devices: readonly KGNode[]) {
  const hardware = indexMameHardware(mameSrc);
  const lists: { name: string; status: string; card: { slot: string; option: string; transport: string; extensions: string[] } }[] = [];
  for (const slot of devices) {
    const table = slot.props.slotOptions;
    const definition = typeof table === 'string' ? hardware.get(String(slot.props.type)) : undefined;
    if (!definition) continue;
    const directory = join(mameSrc, dirname(definition.sourceFile));
    const body = readdirSync(directory).filter(file => file.endsWith('.cpp'))
      .map(file => new RegExp(String.raw`void\s+${table}\s*\(\s*device_slot_interface\s*&\s*\w+\s*\)\s*\{([\s\S]*?)\n\}`)
        .exec(readFileSync(join(directory, file), 'utf8'))?.[1])
      .find(Boolean);
    for (const option of body?.matchAll(/option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g) ?? []) {
      const card = hardware.get(option[2]!);
      if (!card) continue;
      const source = readFileSync(join(mameSrc, card.sourceFile), 'utf8');
      const mconfig = /device_add_mconfig\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/.exec(source)?.[1]?.replace(/\/\/[^\n]*/g, '') ?? '';
      const image = /\b([A-Z][A-Z0-9_]+)\s*\(\s*config\s*,\s*m_\w+\s*,\s*\w+\s*,\s*"[^"]*"\s*,\s*"([^"]*)"\s*\)/.exec(mconfig);
      for (const list of mconfig.matchAll(/SOFTWARE_LIST\s*\([^)]*\)\s*\.\s*set_(original|compatible)\s*\(\s*"([^"]+)"\s*\)/g)) {
        if (!image) continue;
        lists.push({
          name: list[2]!, status: list[1]!,
          card: {
            slot: String(slot.props.tag), option: option[1]!, transport: image[1]!,
            extensions: image[2]!.split(',').map(extension => extension.trim().toLowerCase()).filter(Boolean),
          },
        });
      }
    }
  }
  return lists;
}

/**
 * The free function an image device's load delegate hands its file to: the
 * callback (`set_load_callback(FUNC(c64_state::quickload_c64))`) is a driver
 * handler, and the routine it calls with the image is the loader. The C64's
 * is `general_cbm_loadsnap`, shared by every Commodore quickload.
 */
function imageLoader(g: Graph, device: KGNode): string | undefined {
  for (const { node: callback } of g.out(device.id, 'HAS_CALLBACK')) {
    if (callback.props.signal !== 'set_load_callback') continue;
    for (const { node: handler } of g.out(callback.id, 'CALLS_HANDLER')) {
      const called = g.out(handler.id, 'CALLS_HANDLER')
        .map(edge => edge.node)
        .find(node => node.props.ownerClass === '' && String(handler.props.sourceBody ?? '').includes(`${String(node.props.method)}(`));
      if (called) return String(called.props.method);
    }
  }
  return undefined;
}

/**
 * The files an image device reads, as its own `file_extensions()` answers:
 * `return "80,a0,e0,crt";` in the C64 expansion port's header.
 */
function imageFileExtensions(mameSrc: string, type: string): string[] {
  const definition = indexMameHardware(mameSrc).get(type);
  if (!definition) return [];
  for (const file of [definition.sourceFile.replace(/\.cpp$/, '.h'), definition.sourceFile]) {
    const path = join(mameSrc, file);
    if (!existsSync(path)) continue;
    const listed = /\bfile_extensions\s*\(\s*\)[^{;]*\{\s*return\s+"([^"]*)"\s*;/.exec(readFileSync(path, 'utf8'))?.[1];
    if (listed !== undefined) return listed.split(',').map(extension => extension.trim().toLowerCase()).filter(Boolean);
  }
  return [];
}
