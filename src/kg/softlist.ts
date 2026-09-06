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
}

export interface SoftArea {
  /** total dataarea size in bytes */
  size: number;
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
  /** RAM sizes in bytes, when declared */
  vram?: number;
  wram?: number;
  bwram?: number;
  /** MAME's own verdict on the set, when it is not plain "yes" */
  supported?: 'no' | 'partial';
  /** how many <part>s the set has: a two-sided tape, a three-disk game */
  parts?: number;
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
const MEDIA_AREAS = new Set(['cass', 'flop', 'quik', 'roml', 'romh']);

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

    for (const fm of block.matchAll(/<feature\s+name="(slot|pcb|mirroring)"\s+value="([^"]*)"/g)) {
      if (fm[1] === 'slot') entry.slot = fm[2];
      else if (fm[1] === 'pcb') entry.pcb = fm[2];
      else entry.mirroring = fm[2];
    }
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
      if (areaName === 'vram') { entry.vram = size; continue; }
      if (areaName === 'wram') { entry.wram = size; continue; }
      if (areaName === 'bwram') { entry.bwram = size; continue; }
      // Every list names its program area for its own hardware. The NES splits
      // a cartridge into "prg" and "chr"; most consoles -- ColecoVision,
      // SG-1000, Atari 2600 -- have one area called "rom". Both are the
      // program area, so both land in `prg` and one identification path
      // serves every list.
      const mediaArea = areaName !== undefined && MEDIA_AREAS.has(areaName);
      if (areaName !== 'prg' && areaName !== 'chr' && areaName !== 'rom' && !mediaArea) continue;
      const area: SoftArea = { size, roms: [] };
      for (const rm of areaBlock.matchAll(/<rom\b[^>]*\/>/g)) {
        const rAttrs = attrs(rm[0]);
        // fill/reload/continue are load directives, not chips; nodumps have
        // no crc to match against. baddumps keep their crc — still the bytes
        // a real cart dump will carry.
        if (rAttrs.loadflag) continue;
        if (rAttrs.status === 'nodump') continue;
        if (!rAttrs.crc) continue;
        area.roms.push({
          size: parseSize(rAttrs.size),
          crc: rAttrs.crc.toLowerCase(),
          offset: parseOffset(rAttrs.offset),
          ...(rAttrs.name ? { file: rAttrs.name } : {}),
        });
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
