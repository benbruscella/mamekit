// MAME software-list (hash/*.xml) extractor. Zero-dep, purpose-built scanner
// in the same spirit as the history.xml extractor in gen/generate.ts: the
// lists are machine-written, highly regular XML — targeted regex + block
// slicing extracts them with full fidelity, no DOM needed.
//
// The output is the generated cart catalog (dist/<machine>/softlist.json):
// the browser identifies user-dropped cartridge files by CRC32 against it.

export interface SoftRom {
  /** chip size in bytes */
  size: number;
  /** crc32, lowercase 8-hex */
  crc: string;
  /** load offset within the dataarea (hex in the XML) */
  offset: number;
  /**
   * The file name inside the set zip, as the list spells it. A cartridge is
   * matched by crc, but a tape or disk image is what the machine mounts, so
   * the shelf needs to know which member of the zip is the medium.
   */
  file?: string;
  /**
   * The dataarea a cartridge chip loads into ("roml", "romh"), kept because a
   * cartridge slot asks for each area by name: the C64 expansion port's
   * call_load reads `roml` and `romh` into separate halves of the card.
   */
  area?: string;
  /**
   * Where MAME loads the chip again (`loadflag="reload"`, ROM_RELOAD): the
   * loader seeks back to the file's start and reads `size` bytes at each
   * offset. Print Technik-Help's 4 KB ROM fills both halves of its 8 KB ROML
   * this way. Kept for a cartridge area, which is assembled from its chips.
   */
  reloads?: { offset: number; size: number }[];
}

export interface SoftArea {
  /** total dataarea size in bytes */
  size: number;
  /**
   * Bytes the list fills rather than loads (`loadflag="fill"`): the Action 52
   * leaves a 512 KB hole of 0xff between its chips. Kept for an area that is
   * assembled from its chips (an NES cartridge's prg and chr).
   */
  fills?: { offset: number; size: number; value: number }[];
  /** real dumped chips only: fill/reload directives and nodumps are skipped */
  roms: SoftRom[];
}

export interface SoftEntry {
  name: string;
  description: string;
  year: string;
  publisher: string;
  cloneof?: string;
  /** MAME slot-device option — the mapper/PCB selector ("nrom", "txrom", ...) */
  slot: string;
  /** human board name ("NES-NROM-256") */
  pcb?: string;
  mirroring?: string;
  /** the program area: "prg" on the NES, "rom" on a single-area list */
  prg: SoftArea;
  chr?: SoftArea;
  /**
   * The iNES mapper number MAME's own tables give this entry's `slot`, which
   * a cartridge rebuilt from its chips carries in its header. Absent for a
   * board no iNES mapper selects.
   */
  mapper?: number;
  /** RAM sizes in bytes, when declared (`vram` counts `vram2` too, as call_load_pcb does) */
  vram?: number;
  wram?: number;
  bwram?: number;
  /**
   * A RAM area the list fills with something other than zero (`loadflag="fill"`
   * with a value): Famicom Jump II's battery RAM starts as `$FF`, and the game
   * hangs reading it as zero.
   */
  ramFills?: Partial<Record<'vram' | 'wram' | 'bwram', { offset: number; size: number; value: number }[]>>;
  /** MAME's own verdict on the set, when it is not plain "yes" */
  supported?: 'no' | 'partial';
  /** how many <part>s the set has: a two-sided tape, a three-disk game */
  parts?: number;
  /**
   * MAME's own note on starting the set (`<info name="usage">`): Jingle Disk's
   * is `Commodore: Load "JINGLE",8,1`, where the first file on the disk is a
   * utility and `LOAD"*",8,1` loads nothing that runs.
   */
  usage?: string;
  /**
   * The video standard the list says the set was made for
   * (`<info name="video">`, "PAL" or "NTSC"). Informational in MAME, which
   * filters by the `compatibility` feature alone; the software room uses it to
   * choose between a family's regional machines for a set both of them list.
   */
  video?: string;
  /**
   * The command this title starts with, where MAME's usage note names one
   * (the generator's boot policy reads it, software-shelves.ts); otherwise
   * its shelf's own `boot` command.
   */
  start?: string;
  /**
   * Each cartridge dataarea's declared size, which is what MAME's
   * `get_software_region_length` answers even where the chips fill less of
   * it: 21 of the C64 list's 478 cartridge areas are larger than their ROMs.
   */
  areas?: Record<string, number>;
  /**
   * The part's other features, as `get_feature` answers them, with the
   * entry's `sharedfeat`s inherited as MAME's parser copies them into each
   * part: a C64 cartridge's `exrom` and `game` lines, a disk's
   * `write_protected`.
   */
  features?: Record<string, string>;
  /**
   * Machine configuration switches the title's usage note asks for, as the
   * generator's policy reads it (software-shelves.ts): a C64 title that
   * "Requires joystick in port 1" throws the machine's "Swap joystick ports".
   */
  switches?: { port: string; mask: number; value: number }[];
}

export interface SoftCatalog {
  /** list short-name ("nes") */
  list: string;
  /** list description ("Nintendo Entertainment System cartridges") */
  description: string;
  /** part interface ("nes_cart") */
  interface: string;
  entries: SoftEntry[];
  /** crc of an entry's FIRST prg rom -> entry indices (clones share dumps) */
  crcIndex: Record<string, number[]>;
}

const ENTITIES: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'",
};

function unescapeXml(s: string): string {
  return s.replace(/&(?:amp|lt|gt|quot|apos);/g, m => ENTITIES[m]);
}

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([\w:]+)="([^"]*)"/g)) out[m[1]] = unescapeXml(m[2]);
  return out;
}

/** Sizes appear as decimal ("32768") or hex ("0x80000"); offsets are hex. */
function parseSize(v: string | undefined): number {
  if (!v) return 0;
  return /^0x/i.test(v) ? parseInt(v.slice(2), 16) : parseInt(v, 10);
}

function parseOffset(v: string | undefined): number {
  if (!v) return 0;
  return parseInt(v.replace(/^0x/i, ''), 16);
}

function element(block: string, name: string): string | undefined {
  const m = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`).exec(block);
  return m ? unescapeXml(m[1].trim()) : undefined;
}

export interface ParsedSoftwareList {
  name: string;
  description: string;
  interface: string;
  entries: (SoftEntry & { compatibility?: string; incompatibility?: string })[];
}

/**
 * Dataareas that hold the medium itself rather than a cartridge chip pair.
 * Tapes ("cass"), disks ("flop"), quickloads ("quik") and the C64's split
 * low/high cartridge ROMs ("roml"/"romh") are all the program the machine
 * loads, so they land in `prg` in document order and one identification path
 * still serves every list.
 */
const MEDIA_AREAS = new Set(['cass', 'flop', 'quik', 'roml', 'romh', 'romx', 'lorom', 'uprom']);

/**
 * Cartridge dataareas a slot loads by name: the C64 and VIC-10 expansion
 * port's, and the single `rom` a generic cartridge slot asks for
 * (`common_get_size("rom")`, the ZX Interface 2's).
 */
const CART_AREAS = new Set(['roml', 'romh', 'romx', 'lorom', 'uprom', 'rom']);

export function parseSoftwareList(xml: string): ParsedSoftwareList {
  const head = /<softwarelist\b[^>]*>/.exec(xml);
  const headAttrs = head ? attrs(head[0]) : {};
  const out: ParsedSoftwareList = {
    name: headAttrs.name ?? '',
    description: headAttrs.description ?? '',
    interface: '',
    entries: [],
  };

  const swRe = /<software\b[^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = swRe.exec(xml)) !== null) {
    const end = xml.indexOf('</software>', m.index);
    if (end < 0) continue;
    const block = xml.slice(m.index, end);
    swRe.lastIndex = end;
    const swAttrs = attrs(m[0]);

    const partM = /<part\b[^>]*>/.exec(block);
    if (!partM) continue;
    const partAttrs = attrs(partM[0]);
    if (!out.interface && partAttrs.interface) out.interface = partAttrs.interface;

    const entry: SoftEntry & { compatibility?: string; incompatibility?: string } = {
      name: swAttrs.name ?? '',
      description: element(block, 'description') ?? '',
      year: element(block, 'year') ?? '',
      publisher: element(block, 'publisher') ?? '',
      slot: '',
      prg: { size: 0, roms: [] },
    };
    if (swAttrs.cloneof) entry.cloneof = swAttrs.cloneof;
    if (swAttrs.supported === 'no' || swAttrs.supported === 'partial') entry.supported = swAttrs.supported;
    const parts = block.match(/<part\b/g)?.length ?? 0;
    if (parts > 1) entry.parts = parts;
    const usage = /<info\s+name="usage"\s+value="([^"]*)"/.exec(block);
    if (usage) entry.usage = unescapeXml(usage[1]!);
    const video = /<info\s+name="video"\s+value="([^"]*)"/.exec(block);
    if (video) entry.video = unescapeXml(video[1]!);

    for (const fm of block.matchAll(/<feature\s+name="(slot|pcb|mirroring)"\s+value="([^"]*)"/g)) {
      if (fm[1] === 'slot') entry.slot = fm[2];
      else if (fm[1] === 'pcb') entry.pcb = fm[2];
      else entry.mirroring = fm[2];
    }
    // The rest a cartridge's slot reads with get_feature: a C64 cartridge's
    // lines, an NES board's wiring (`vrc4-pin3`, `mmc1_type`, `n163-vol`).
    // Only a list with cartridge areas needs them, so the others stay as
    // they were.
    if (/<dataarea\s+name="(?:roml|romh|lorom|uprom|prg)"/.test(block)) {
      for (const fm of block.matchAll(/<feature\s+name="([\w-]+)"\s+value="([^"]*)"/g)) {
        if (['slot', 'pcb', 'mirroring'].includes(fm[1]!)) continue;
        entry.features ??= {};
        entry.features[fm[1]!] ??= unescapeXml(fm[2]!);
      }
    }
    // floppy_image_device::call_load reads `write_protected` of every disk;
    // a part's own feature wins over the entry's shared one, as in MAME.
    const writeProtected = /<feature\s+name="write_protected"\s+value="([^"]*)"/.exec(block) ??
      /<sharedfeat\s+name="write_protected"\s+value="([^"]*)"/.exec(block);
    if (writeProtected) (entry.features ??= {}).write_protected ??= unescapeXml(writeProtected[1]!);
    const shared = /<sharedfeat\s+name="compatibility"\s+value="([^"]*)"/.exec(block);
    if (shared) entry.compatibility = shared[1];
    const excluded = /<sharedfeat\s+name="incompatibility"\s+value="([^"]*)"/.exec(block);
    if (excluded) entry.incompatibility = excluded[1];

    const areaRe = /<dataarea\b[^>]*>/g;
    let am: RegExpExecArray | null;
    while ((am = areaRe.exec(block)) !== null) {
      const selfClosing = am[0].endsWith('/>');
      let areaBlock = '';
      if (!selfClosing) {
        const areaEnd = block.indexOf('</dataarea>', am.index);
        if (areaEnd < 0) continue;
        areaBlock = block.slice(am.index, areaEnd);
        areaRe.lastIndex = areaEnd;
      }
      const aAttrs = attrs(am[0]);
      const size = parseSize(aAttrs.size);
      const areaName = aAttrs.name;
      const ram = areaName === 'vram' || areaName === 'vram2' ? 'vram'
        : areaName === 'wram' || areaName === 'bwram' ? areaName : undefined;
      if (ram) {
        if (ram === 'vram') entry.vram = (entry.vram ?? 0) + size;
        else entry[ram] = size;
        for (const rm of areaBlock.matchAll(/<rom\b[^>]*\/>/g)) {
          const rAttrs = attrs(rm[0]);
          const value = Number(rAttrs.value) & 0xff;
          if (rAttrs.loadflag !== 'fill' || rAttrs.value === undefined || !value) continue;
          ((entry.ramFills ??= {})[ram] ??= []).push({ offset: parseOffset(rAttrs.offset), size: parseSize(rAttrs.size), value });
        }
        continue;
      }
      // Every list names its program area for its own hardware. The NES splits
      // a cartridge into "prg" and "chr"; most consoles -- ColecoVision,
      // SG-1000, Atari 2600 -- have one area called "rom". Both are the
      // program area, so both land in `prg` and one identification path
      // serves every list.
      const mediaArea = areaName !== undefined && MEDIA_AREAS.has(areaName);
      if (areaName !== 'prg' && areaName !== 'chr' && areaName !== 'rom' && !mediaArea) continue;
      const area: SoftArea = { size, roms: [] };
      const cartArea = CART_AREAS.has(areaName!);
      // An NES cartridge's two areas are assembled from their chips as MAME
      // loads them -- a 16 KB NROM-128 PRG is reloaded to fill its 32 KB area
      // -- so their reloads and fills are kept too.
      const assembled = cartArea || areaName === 'prg' || areaName === 'chr';
      if (cartArea) (entry.areas ??= {})[areaName!] = size;
      // The chip a reload repeats: the one just before it, if it was kept.
      let previous: SoftRom | undefined;
      for (const rm of areaBlock.matchAll(/<rom\b[^>]*\/>/g)) {
        const rAttrs = attrs(rm[0]);
        if (rAttrs.loadflag === 'reload') {
          if (assembled && previous) (previous.reloads ??= []).push({ offset: parseOffset(rAttrs.offset), size: parseSize(rAttrs.size) });
          continue;
        }
        if (rAttrs.loadflag === 'fill' && assembled && rAttrs.value !== undefined) {
          (area.fills ??= []).push({ offset: parseOffset(rAttrs.offset), size: parseSize(rAttrs.size), value: Number(rAttrs.value) & 0xff });
        }
        // fill/continue are load directives, not chips; nodumps have no crc
        // to match against. baddumps keep their crc — still the bytes a real
        // cart dump will carry.
        previous = undefined;
        if (rAttrs.loadflag) continue;
        if (rAttrs.status === 'nodump') continue;
        if (!rAttrs.crc) continue;
        previous = {
          size: parseSize(rAttrs.size),
          crc: rAttrs.crc.toLowerCase(),
          offset: parseOffset(rAttrs.offset),
          ...(rAttrs.name ? { file: rAttrs.name } : {}),
          ...(cartArea ? { area: areaName } : {}),
        };
        area.roms.push(previous);
      }
      if (areaName === 'chr') entry.chr = area;
      else if (mediaArea && entry.prg.roms.length) {
        // A second side, disk or ROM half joins the first rather than
        // replacing it: the set is every image the list names.
        entry.prg = { size: entry.prg.size + area.size, roms: [...entry.prg.roms, ...area.roms] };
      } else entry.prg = area;
    }

    out.entries.push(entry);
  }
  return out;
}

/**
 * Apply a SOFTWARE_LIST set_filter expression and build the CRC index.
 *
 * The rule is `software_list_device::is_compatible` (softlist_dev.cpp), token
 * for token: the filter is a comma list; an entry whose "incompatibility"
 * sharedfeat names any filter token is out; an entry with no "compatibility"
 * sharedfeat is in; otherwise it is in only if its compatibility list names a
 * filter token. Untagged entries therefore always pass -- the C64's tape list
 * tags nothing at all and is filtered "NTSC" or "PAL" on every machine, so
 * treating an untagged entry as incompatible would empty the shelf. A "!X"
 * filter is a token no entry spells, which is how nes.cpp hides every
 * expansion-audio cartridge on the machine that cannot play it.
 */
export function buildCatalog(parsed: ParsedSoftwareList, filter?: string): SoftCatalog {
  let entries = parsed.entries;
  if (filter) {
    const tokens = filter.split(',').map(s => s.trim()).filter(Boolean);
    const tags = (value: string | undefined): string[] =>
      (value ?? '').split(',').map(s => s.trim()).filter(Boolean);
    entries = entries.filter(e => {
      if (e.incompatibility !== undefined && tags(e.incompatibility).some(tag => tokens.includes(tag))) return false;
      if (e.compatibility === undefined) return true;
      return tags(e.compatibility).some(tag => tokens.includes(tag));
    });
  }
  const clean: SoftEntry[] = entries.map(({ compatibility: _drop, incompatibility: _drop2, ...rest }) => rest);
  const crcIndex: Record<string, number[]> = {};
  clean.forEach((e, i) => {
    const first = e.prg.roms[0];
    if (!first) return;
    (crcIndex[first.crc] ??= []).push(i);
  });
  return {
    list: parsed.name,
    description: parsed.description,
    interface: parsed.interface,
    entries: clean,
    crcIndex,
  };
}

/**
 * The controllers a software list says its titles need: every value of a
 * `peripheral` feature (nes.xml: `zapper`, `vaus`, `powerpad`, ...), a
 * comma-separated value counting once per name.
 */
export function softwareListPeripherals(xml: string): Set<string> {
  const names = new Set<string>();
  for (const match of xml.matchAll(/<feature\s+name="peripheral"\s+value="([^"]*)"/g)) {
    for (const name of match[1]!.split(',')) if (name.trim()) names.add(name.trim());
  }
  return names;
}
