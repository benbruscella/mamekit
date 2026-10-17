
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { KGNode } from '../kg/types.ts';
import { parseSoftwareList, buildCatalog } from '../kg/softlist.ts';

import { writeSoftwareShelves } from './software-shelves.ts';
import type { SoftwareShelves } from '../runtime/shell.ts';
import { romsDir } from '../paths.ts';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '../..');

import type { GenerateOptions } from './generate.ts';

import { CART_SLOT_SUPPORT, CART_INTERFACE_BY_FAMILY, CART_DEFAULT_SLOT, CART_ROM_REGION, CART_GAME_SUPPORT, cartFileExtensions, localCartArt, writeCartShelfIndex } from './cartridge-catalog.ts';

export function lowerMedia(game: KGNode, kind: "console" | "computer" | undefined, opts: GenerateOptions, devices: KGNode[], softlistNodes: KGNode[], category: "arcade" | "consoles" | "computers", family: string) {
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
    const dumpsDir = [opts.game, family]
      .map(name => join(romsDir(projectRoot), category, name))
      .find(dir => existsSync(dir));
    software = writeSoftwareShelves({
      mameSrc: opts.mameSrc,
      outDir: opts.outDir,
      lists: softlistNodes.map(node => ({
        name: String(node.props.name),
        status: String(node.props.status),
        ...(node.props.filter ? { filter: String(node.props.filter) } : {}),
      })),
      devices: devices.map(device => ({
        type: String(device.props.type),
        tag: String(device.props.tag),
        ...(device.props.slotDefault ? { slotDefault: String(device.props.slotDefault) } : {}),
      })),
      ...(dumpsDir ? { dumpsDir } : {}),
      dumpsKey: `${category}/${dumpsDir ? basename(dumpsDir) : family}`,
      log: line => console.log(line),
    });
    if (!software) console.warn('  ! computer declares no software list this build can read — the room will accept dropped media only');
  }

  return { title, cart, software, cartEntries };
}
