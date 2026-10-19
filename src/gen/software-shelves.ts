// A computer's software shelves: one generated catalogue per MAME software
// list the driver declares, plus what the local dump audit can supply.
//
// A console has one software list and one medium, so its room reads one
// softlist.json. A computer's software arrives on several media -- the C64's
// driver declares cartridge, tape, two disk and a quickload list -- and each
// list is its own shelf: software/<list>.json beside the machine, with a
// software/<list>.available.json when the ROM library (tools/rom-library.ts)
// has filed verified dumps for it. The graph carries the LIST facts (name, filter); the
// hash/*.xml is read here, the same way the console catalogue is built.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildCatalog, parseSoftwareList, type SoftCatalog } from '../kg/softlist.ts';
import type { MediumKind, SoftwareShelf, SoftwareShelves } from '../runtime/shell.ts';

/** A SOFTWARE_LIST declaration as the knowledge graph records it. */
export interface SoftlistDeclaration {
  name: string;
  status: string;
  filter?: string;
}

/**
 * Which media the generated runtime can mount, by the device that carries the
 * medium. A device-library capability table like CART_SLOT_SUPPORT: the board
 * exposes a transport for every cassette, floppy connector and quickload
 * device it composes (generated-board `media()`, `disks()`, `quickloads()`),
 * and a cartridge goes into the expansion port before the machine starts
 * (BoardConfig.images). A list whose medium has no transport is still a shelf
 * to browse, marked display only.
 */
const MEDIA_MOUNT_DEVICES: Record<MediumKind, readonly string[]> = {
  cassette: ['PET_DATASSETTE_PORT', 'CASSETTE'],
  // The C64 expansion port: its call_load reads a title's areas into the card
  // the title names, so a cartridge is a software part, not a file.
  cartridge: ['C64_EXPANSION_SLOT'],
  // MAME's floppy_connector holds the drive mechanism a disk goes into: the
  // C64's composed 1541 carries one under its gate array.
  floppy: ['FLOPPY_CONNECTOR'],
  // snapquik.cpp's quickload: the driver's own callback reads the file.
  quickload: ['QUICKLOAD'],
};

/** A device the board composes, as far as mounting a medium cares. */
export interface ShelfDevice {
  type: string;
  /** absolute MAME tag: "tape", "iec8:c1541:uc4:0" */
  tag: string;
  /** the option a slot device selects by default ("c1530", "c1541") */
  slotDefault?: string;
  /** the address a bus slot is configured at: 8 for the C64's `iec8` */
  slotAddress?: number;
  /**
   * For an image device the driver hands its file to, the free function its
   * load callback passes the file on to: the C64's quickload callback calls
   * `general_cbm_loadsnap`, MAME's loader for every Commodore quickload.
   */
  loader?: string;
}

type ShelfBoot = NonNullable<SoftwareShelf['boot']>;

/**
 * How a title starts, by the slot device its transport sits in. Host policy,
 * as the key map is (input-bindings.ts): MAME starts nothing itself -- its
 * `-autoboot_command` is the user's to give -- and these are the commands the
 * Commodore firmware behind these two slots answers to. A tape is LOAD and
 * RUN typed while the KERNAL waits at PRESS PLAY ON TAPE, which still scans
 * the keyboard, so RUN waits in its buffer until the program has loaded (what
 * SHIFT+RUN/STOP does); then PLAY. A disk is the same, addressed to the
 * drive's unit, which is the slot's own address.
 */
const BOOT_POLICY: Record<string, {
  boot(slot: ShelfDevice): ShelfBoot | undefined;
  /**
   * A title's own command, when MAME's usage note for it names one: Jingle
   * Disk's is `Commodore: Load "JINGLE",8,1`, because the first file on that
   * disk is a utility and `LOAD"*",8,1` starts nothing.
   */
  fromUsage?(usage: string): string | undefined;
}> = {
  PET_DATASSETTE_PORT: { boot: () => ({ delay: 3, command: 'LOAD{ENTER}RUN{ENTER}', play: true }) },
  CBM_IEC_SLOT: {
    boot: slot => slot.slotAddress === undefined ? undefined
      : { delay: 3, command: `LOAD"*",${slot.slotAddress},1{ENTER}RUN{ENTER}` },
    fromUsage: usage => {
      const named = /\bload\s*"([^"]+)"\s*,\s*(\d+)\s*,\s*1\b/i.exec(usage);
      return named ? `LOAD"${named[1]!.toUpperCase()}",${named[2]},1{ENTER}RUN{ENTER}` : undefined;
    },
  },
  // A quickload sits on no slot, so its policy is keyed by the routine its
  // load callback hands the file to. MAME's CBM loader (cbm_snqk.cpp) puts
  // the program where its header says and sets BASIC's end-of-program
  // pointers past it, which is what LOAD leaves behind: RUN starts it. The
  // file goes in when the device's own delay runs out, and the start waits
  // for that (title-start.ts) rather than guessing at it.
  general_cbm_loadsnap: { boot: () => ({ delay: 3, command: 'RUN{ENTER}' }) },
};

type ShelfPolicy = { boot: ShelfBoot; fromUsage?: (usage: string) => string | undefined };

/** The policy entry every one of `sources` agrees on, looked up by `key`. */
function agreedPolicy(
  sources: readonly (ShelfDevice | undefined)[],
  key: (device: ShelfDevice) => string | undefined,
): ShelfPolicy | undefined {
  const found = sources.map(device => {
    const name = device ? key(device) : undefined;
    const policy = name ? BOOT_POLICY[name] : undefined;
    const boot = device && policy?.boot(device);
    return boot ? { boot, ...(policy!.fromUsage ? { fromUsage: policy!.fromUsage } : {}) } : undefined;
  });
  return found.length && found.every(entry => entry && JSON.stringify(entry.boot) === JSON.stringify(found[0]!.boot))
    ? found[0] : undefined;
}

/** The policy entry a shelf's slots agree on, when the policy knows them. */
function shelfPolicy(slots: readonly string[], devices: readonly ShelfDevice[]): ShelfPolicy | undefined {
  return agreedPolicy(slots.map(tag => devices.find(device => device.tag === tag)), device => device.type);
}

/** The policy for a medium whose transports sit on the board itself: by what each loads with. */
function boardTransportPolicy(kind: MediumKind, devices: readonly ShelfDevice[]): ShelfPolicy | undefined {
  return agreedPolicy(devices.filter(device => MEDIA_MOUNT_DEVICES[kind].includes(device.type)), device => device.loader);
}

/**
 * The slots whose cards carry a medium's transports: for each transport, the
 * outermost slot device it is, or sits under. The C64's datassette port is
 * the `tape` slot itself; its disk drive's floppy connector sits inside the
 * 1541 on the `iec8` slot. A transport on no slot is fixed to the board, and
 * then the medium has no slot to leave empty.
 */
export function mediaSlotsOf(kind: MediumKind, devices: readonly ShelfDevice[]): string[] {
  const slots = devices.filter(device => device.slotDefault).map(device => device.tag);
  const carrying = new Set<string>();
  for (const transport of devices.filter(device => MEDIA_MOUNT_DEVICES[kind].includes(device.type))) {
    const outer = slots
      .filter(slot => transport.tag === slot || transport.tag.startsWith(`${slot}:`))
      .sort((a, b) => a.length - b.length)[0];
    if (!outer) return [];
    carrying.add(outer);
  }
  return [...carrying];
}

/**
 * The medium a list holds, from the interface its parts declare -- "cbm_cass",
 * "floppy_5_25", "c64_cart", "cbm_quik" -- with the list name as the tie-break
 * for an interface that names neither.
 */
export function mediumKindOf(partInterface: string, listName: string): MediumKind | undefined {
  for (const key of [partInterface, listName]) {
    if (/cass|tape/i.test(key)) return 'cassette';
    if (/flop|disk/i.test(key)) return 'floppy';
    if (/qui[ck]k?|prg/i.test(key)) return 'quickload';
    if (/cart/i.test(key)) return 'cartridge';
  }
  return undefined;
}

/** The image extensions a list's sets hold, most common first. */
export function catalogExtensions(catalog: Pick<SoftCatalog, 'entries'>): string[] {
  const counts = new Map<string, number>();
  for (const entry of catalog.entries) {
    for (const rom of entry.prg.roms) {
      const extension = rom.file?.includes('.') ? rom.file.split('.').pop()!.toLowerCase() : '';
      if (extension) counts.set(extension, (counts.get(extension) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([ext]) => ext);
}

/** One dump the audit filed for a list, as the shelf's availability index carries it. */
export interface AvailableSet {
  /** archive key below the machine's dump directory: "c64_cass/nebulus.zip" */
  file: string;
  /** software-list short name */
  name: string;
  tier: 'verified';
}

interface AuditEntry {
  list?: string;
  name?: string;
  archive?: string;
  parts?: { available?: boolean }[];
}

/**
 * Reduce a shelf manifest (tools/rom-library.ts) to the sets it holds
 * complete for one list. Every part must be present: a two-sided tape with one
 * side missing is not a set the shelf can offer.
 */
export function availabilityFromAudit(manifest: unknown, list: string): AvailableSet[] {
  const entries = (manifest as { entries?: AuditEntry[] } | null)?.entries;
  if (!Array.isArray(entries)) return [];
  const out: AvailableSet[] = [];
  for (const entry of entries) {
    if (!entry || typeof entry !== 'object') continue;
    if (entry.list !== list || typeof entry.name !== 'string' || typeof entry.archive !== 'string') continue;
    if (!entry.archive.toLowerCase().endsWith('.zip')) continue;
    if (entry.archive.startsWith('not-supported/')) continue;
    if (!Array.isArray(entry.parts) || !entry.parts.length || !entry.parts.every(part => part.available)) continue;
    out.push({ file: entry.archive, name: entry.name, tier: 'verified' });
  }
  return out;
}

/** Every audit manifest below the machine's dump directory, one per media folder. */
function readAuditManifests(dumpsDir: string | undefined): unknown[] {
  if (!dumpsDir || !existsSync(dumpsDir)) return [];
  const manifests: unknown[] = [];
  for (const folder of readdirSync(dumpsDir, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    const path = join(dumpsDir, folder.name, '_manifest.json');
    if (!existsSync(path)) continue;
    try { manifests.push(JSON.parse(readFileSync(path, 'utf8'))); }
    catch { console.warn(`  ! ${path} is not readable JSON — software availability skipped`); }
  }
  return manifests;
}

/** A machine configuration switch, as lower-inputs emits it (PORT_CONFNAME). */
export interface ShelfSwitch {
  port: string;
  mask: number;
  value: number;
  name: string;
  config?: boolean;
  settings?: { value: number; name: string }[];
}

/**
 * The configuration a title's usage note asks for, when the machine has a
 * switch that gives it. MAME's C64 plugs its joystick into port 2 and leaves
 * port 1 empty; 25 titles' notes say they want port 1, which on that machine
 * is its own "Swap joystick ports" switch thrown. Host policy, as the start
 * commands are: MAME reads no usage note itself.
 */
export function usageSwitches(
  usage: string,
  devices: readonly ShelfDevice[],
  switches: readonly ShelfSwitch[],
): ShelfSwitch[] {
  const wanted = /\bjoystick\s+(?:in|into|to)\s+port\s*(\d)\b/i.exec(usage)?.[1];
  if (!wanted) return [];
  const port = (device: ShelfDevice): string | undefined => /(\d+)$/.exec(device.tag)?.[1];
  const sticks = devices.filter(device => device.type === 'VCS_CONTROL_PORT' && device.slotDefault);
  if (!sticks.length || sticks.some(device => port(device) === wanted)) return [];
  const swap = switches.find(entry => entry.config && /joystick/i.test(entry.name) && /swap|switch/i.test(entry.name));
  const thrown = swap?.settings?.find(setting => setting.value !== swap.value);
  return swap && thrown ? [{ ...swap, value: thrown.value }] : [];
}

export interface SoftwareShelvesOptions {
  mameSrc: string;
  outDir: string;
  lists: SoftlistDeclaration[];
  /** the devices the board composes, for the mount capability table */
  devices: readonly ShelfDevice[];
  /** the machine's configuration switches, for a usage note that asks for one */
  switches?: readonly ShelfSwitch[];
  /**
   * A list's shelf art, by software-list short name (src/gen/cart-art.ts over
   * .data/artwork/carts/<list>/): a C64 title's cover in place of its drawn
   * tape or disk.
   */
  artFor?: (list: string) => Record<string, { cart?: string; sticker?: string }>;
  /**
   * The image extensions a medium's transport reads, where MAME's source says:
   * a floppy connector's `set_formats` names its formats, and each format its
   * extensions. A list's image in any other format is not playable here.
   */
  transportExtensions?: Partial<Record<MediumKind, readonly string[]>>;
  /** local dump directory the ROM library files into, when present */
  dumpsDir?: string;
  /** the bucket / .data key those dumps live under: "computers/c64" */
  dumpsKey: string;
  log?: (line: string) => void;
}

/**
 * Extract every original software list to its own shelf. Returns nothing
 * when the driver declares no list this build can read, so a machine without
 * software simply has no room.
 */
export function writeSoftwareShelves(options: SoftwareShelvesOptions): SoftwareShelves | undefined {
  const log = options.log ?? (() => {});
  const softwareDir = join(options.outDir, 'software');
  const manifests = readAuditManifests(options.dumpsDir);
  const shelves: SoftwareShelf[] = [];
  for (const list of options.lists) {
    if (list.status !== 'original') continue;
    const xmlPath = join(options.mameSrc, 'hash', `${list.name}.xml`);
    if (!existsSync(xmlPath)) continue;
    const catalog = buildCatalog(parseSoftwareList(readFileSync(xmlPath, 'utf8')), list.filter);
    const kind = mediumKindOf(catalog.interface, list.name);
    if (!kind) { log(`  ! software list "${list.name}" (${catalog.interface || 'no interface'}) is not a medium this shelf model knows`); continue; }
    // A list the machine's filter empties -- the C64's one quickload is PAL
    // only -- is not a shelf on this machine; the tab would hold nothing.
    if (!catalog.entries.length) { log(`software "${list.name}": nothing passes the "${list.filter}" filter — no shelf`); continue; }
    // A cartridge list names the chips on the board ("u1", "ba1"), not an
    // image a visitor could drop; only a media list's file names are images.
    // Of those, only the ones the transport reads are playable: the C64's
    // misc disk list holds .img and .d81 sets its 1541 cannot read, and Play
    // used to boot one with no disk in the drive.
    const listed = kind === 'cartridge' ? [] : catalogExtensions(catalog);
    const readable = options.transportExtensions?.[kind];
    const playable = readable ? listed.filter(extension => readable.includes(extension)) : listed;
    // What the shelf takes is what its transport reads, the list's own formats
    // first: a dropped image need not be one the list catalogues, and most
    // .prg files a C64 quickload reads are in no list at all.
    // A cartridge's parts are read area by area, so its list's files say
    // nothing about what mounts: its shelf takes the files the port reads
    // (a bare .crt), and every list title by its areas.
    const byArea = kind === 'cartridge';
    const extensions = byArea ? [...(readable ?? [])]
      : readable && playable.length
        ? [...playable, ...readable.filter(extension => !playable.includes(extension))]
        : playable;
    const transport = options.devices.find(device => MEDIA_MOUNT_DEVICES[kind].includes(device.type));
    const mountable = Boolean(transport) && (byArea || !readable || playable.length > 0);
    // A cartridge is read area by area, so its shelf names the slot that takes
    // the part rather than formats a drive reads.
    const imageDevice = mountable && kind === 'cartridge' ? transport!.tag : undefined;
    const slots = mountable ? mediaSlotsOf(kind, options.devices) : [];
    const policy = slots.length ? shelfPolicy(slots, options.devices)
      : mountable ? boardTransportPolicy(kind, options.devices) : undefined;
    const boot = policy?.boot;
    // A title whose usage note names its own command carries it (`start`).
    if (policy?.fromUsage) {
      for (const entry of catalog.entries) {
        const start = entry.usage ? policy.fromUsage(entry.usage) : undefined;
        if (start) entry.start = start;
      }
    }
    // And one that asks for a control setting the machine has carries that.
    for (const entry of catalog.entries) {
      const switches = entry.usage ? usageSwitches(entry.usage, options.devices, options.switches ?? []) : [];
      if (switches.length) entry.switches = switches.map(({ port, mask, value }) => ({ port, mask, value }));
    }
    mkdirSync(softwareDir, { recursive: true });
    // compact on purpose: the C64's tape list alone is 1,100 entries
    writeFileSync(join(softwareDir, `${list.name}.json`), JSON.stringify(catalog));
    const available = manifests.flatMap(manifest => availabilityFromAudit(manifest, list.name));
    if (available.length) {
      writeFileSync(join(softwareDir, `${list.name}.available.json`),
        JSON.stringify({ set: options.dumpsKey, carts: available }));
    }
    const art = options.artFor?.(list.name) ?? {};
    const titled = Object.fromEntries(catalog.entries.flatMap(entry => art[entry.name]?.cart ? [[entry.name, art[entry.name]!.cart!]] : []));
    shelves.push({
      list: list.name,
      description: catalog.description,
      interface: catalog.interface,
      kind,
      catalogUrl: `software/${list.name}.json`,
      ...(available.length ? { availableUrl: `software/${list.name}.available.json` } : {}),
      extensions,
      entries: catalog.entries.length,
      mountable,
      ...(list.filter ? { filter: list.filter } : {}),
      ...(slots.length ? { slots } : {}),
      ...(imageDevice ? { imageDevice } : {}),
      ...(boot ? { boot } : {}),
      ...(Object.keys(titled).length ? { art: titled } : {}),
    });
    log(`software "${list.name}": ${catalog.entries.length} ${kind} sets catalogued` +
      (available.length ? `, ${available.length} dumps available` : '') +
      (mountable ? '' : readable && listed.length
        ? ` (display only: the transport reads ${readable.map(extension => `.${extension}`).join(' ')}, the list holds ${listed.map(extension => `.${extension}`).join(' ')})`
        : ' (display only: no generated transport)'));
  }
  return shelves.length ? { dumpsKey: options.dumpsKey, shelves } : undefined;
}
