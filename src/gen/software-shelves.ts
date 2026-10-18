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
 * exposes a transport for every cassette device it composes (generated-board
 * `media()`), and nothing yet mounts a cartridge, disk or quickload image on a
 * computer. A list whose medium has no transport is still a shelf to browse,
 * marked display only.
 */
const MEDIA_MOUNT_DEVICES: Record<MediumKind, readonly string[]> = {
  cassette: ['PET_DATASSETTE_PORT', 'CASSETTE'],
  cartridge: [],
  // MAME's floppy_connector holds the drive mechanism a disk goes into: the
  // C64's composed 1541 carries one under its gate array.
  floppy: ['FLOPPY_CONNECTOR'],
  quickload: [],
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
const BOOT_POLICY: Record<string, (slot: ShelfDevice) => ShelfBoot | undefined> = {
  PET_DATASSETTE_PORT: () => ({ delay: 3, command: 'LOAD{ENTER}RUN{ENTER}', play: true }),
  CBM_IEC_SLOT: slot => slot.slotAddress === undefined ? undefined
    : { delay: 3, command: `LOAD"*",${slot.slotAddress},1{ENTER}RUN{ENTER}` },
};

/** The boot a shelf's slots agree on, when the policy knows one. */
function shelfBoot(slots: readonly string[], devices: readonly ShelfDevice[]): ShelfBoot | undefined {
  const boots = slots.map(tag => {
    const slot = devices.find(device => device.tag === tag);
    return slot ? BOOT_POLICY[slot.type]?.(slot) : undefined;
  });
  return boots.length && boots.every(boot => boot && JSON.stringify(boot) === JSON.stringify(boots[0]))
    ? boots[0] : undefined;
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

export interface SoftwareShelvesOptions {
  mameSrc: string;
  outDir: string;
  lists: SoftlistDeclaration[];
  /** the devices the board composes, for the mount capability table */
  devices: readonly ShelfDevice[];
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
    mkdirSync(softwareDir, { recursive: true });
    // compact on purpose: the C64's tape list alone is 1,100 entries
    writeFileSync(join(softwareDir, `${list.name}.json`), JSON.stringify(catalog));
    const available = manifests.flatMap(manifest => availabilityFromAudit(manifest, list.name));
    if (available.length) {
      writeFileSync(join(softwareDir, `${list.name}.available.json`),
        JSON.stringify({ set: options.dumpsKey, carts: available }));
    }
    // A cartridge list names the chips on the board ("u1", "ba1"), not an
    // image a visitor could drop; only a media list's file names are images.
    // Of those, only the ones the transport reads are playable: the C64's
    // misc disk list holds .img and .d81 sets its 1541 cannot read, and Play
    // used to boot one with no disk in the drive.
    const listed = kind === 'cartridge' ? [] : catalogExtensions(catalog);
    const readable = options.transportExtensions?.[kind];
    const extensions = readable ? listed.filter(extension => readable.includes(extension)) : listed;
    const mountable = options.devices.some(device => MEDIA_MOUNT_DEVICES[kind].includes(device.type)) &&
      (!readable || extensions.length > 0);
    const slots = mountable ? mediaSlotsOf(kind, options.devices) : [];
    const boot = shelfBoot(slots, options.devices);
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
      ...(slots.length ? { slots } : {}),
      ...(boot ? { boot } : {}),
    });
    log(`software "${list.name}": ${catalog.entries.length} ${kind} sets catalogued` +
      (available.length ? `, ${available.length} dumps available` : '') +
      (mountable ? '' : readable && listed.length
        ? ` (display only: the transport reads ${readable.map(extension => `.${extension}`).join(' ')}, the list holds ${listed.map(extension => `.${extension}`).join(' ')})`
        : ' (display only: no generated transport)'));
  }
  return shelves.length ? { dumpsKey: options.dumpsKey, shelves } : undefined;
}
