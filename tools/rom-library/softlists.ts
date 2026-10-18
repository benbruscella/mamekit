// MAME software lists as the ROM library needs them.
//
// The shelf catalogue (src/kg/softlist.ts) folds every list down to what the
// browser matches by: one program area of CRCs. Filing a dump needs more than
// that -- which <part> a chip belongs to (a two-sided tape, a cartridge sold
// with a disk), the SHA1 that confirms a CRC hit, and the chip's own name,
// which is what `mame <machine> <name>` looks for inside the zip -- so the
// list is read again here, keeping all of it.

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export interface ListRom {
  /** the member name MAME looks for inside the set's zip */
  name: string;
  size: number;
  /** lowercase 8-hex */
  crc: string;
  sha1?: string;
  /** load offset within the dataarea */
  offset: number;
}

export interface ListArea {
  name: string;
  size: number;
  roms: ListRom[];
}

export interface ListPart {
  name: string;
  interface: string;
  features: Record<string, string>;
  areas: ListArea[];
}

export interface ListEntry {
  name: string;
  description: string;
  year: string;
  publisher: string;
  cloneof?: string;
  /** MAME's own verdict; an entry it marks "no" is quarantined, never filed */
  supported: 'yes' | 'no' | 'partial';
  parts: ListPart[];
}

export interface SoftwareList {
  name: string;
  description: string;
  path: string;
  /** of the XML, recorded in each computer shelf manifest */
  sha1: string;
  entries: ListEntry[];
  byName: Map<string, ListEntry>;
}

/** Where one chip sits: entry, part, area and chip index. */
export interface RomRef {
  list: SoftwareList;
  entry: ListEntry;
  part: number;
  area: number;
  rom: number;
}

const ENTITIES: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'",
};

function unescapeXml(text: string): string {
  return text.replace(/&(?:amp|lt|gt|quot|apos);/g, entity => ENTITIES[entity]!);
}

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const match of tag.matchAll(/([\w:]+)="([^"]*)"/g)) out[match[1]!] = unescapeXml(match[2]!);
  return out;
}

function element(block: string, name: string): string {
  const match = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`).exec(block);
  return match ? unescapeXml(match[1]!.trim()) : '';
}

/** Sizes are decimal or 0x-hex; offsets are hex with or without the prefix. */
function size(value: string | undefined): number {
  if (!value) return 0;
  return /^0x/i.test(value) ? parseInt(value.slice(2), 16) : parseInt(value, 10);
}

function offset(value: string | undefined): number {
  return value ? parseInt(value.replace(/^0x/i, ''), 16) : 0;
}

/** Each `<tag ...>...</tag>` block in `source`, with its opening tag. */
function* blocks(source: string, tag: string): Generator<{ open: string; body: string }> {
  const opener = new RegExp(`<${tag}\\b[^>]*>`, 'g');
  let match: RegExpExecArray | null;
  while ((match = opener.exec(source)) !== null) {
    if (match[0].endsWith('/>')) { yield { open: match[0], body: '' }; continue; }
    const end = source.indexOf(`</${tag}>`, match.index);
    if (end < 0) return;
    yield { open: match[0], body: source.slice(match.index + match[0].length, end) };
    opener.lastIndex = end;
  }
}

export function parseList(xml: string, path = ''): SoftwareList {
  const head = attrs(/<softwarelist\b[^>]*>/.exec(xml)?.[0] ?? '');
  const entries: ListEntry[] = [];
  for (const software of blocks(xml, 'software')) {
    const tag = attrs(software.open);
    const supported = tag.supported === 'no' || tag.supported === 'partial' ? tag.supported : 'yes';
    const parts: ListPart[] = [];
    for (const part of blocks(software.body, 'part')) {
      const partTag = attrs(part.open);
      const features: Record<string, string> = {};
      for (const feature of part.body.matchAll(/<feature\b[^>]*\/>/g)) {
        const { name, value } = attrs(feature[0]);
        if (name) features[name] = value ?? '';
      }
      const areas: ListArea[] = [];
      for (const area of blocks(part.body, 'dataarea')) {
        const areaTag = attrs(area.open);
        const roms: ListRom[] = [];
        for (const rom of area.body.matchAll(/<rom\b[^>]*\/>/g)) {
          const romTag = attrs(rom[0]);
          // fill/reload/continue directives carry no crc, and a nodump has no
          // bytes anywhere: neither is something a dump can supply.
          if (!romTag.crc || !romTag.name || romTag.status === 'nodump') continue;
          roms.push({
            name: romTag.name,
            size: size(romTag.size),
            crc: romTag.crc.toLowerCase(),
            ...(romTag.sha1 ? { sha1: romTag.sha1.toLowerCase() } : {}),
            offset: offset(romTag.offset),
          });
        }
        if (roms.length) areas.push({ name: areaTag.name ?? '', size: size(areaTag.size), roms });
      }
      parts.push({ name: partTag.name ?? '', interface: partTag.interface ?? '', features, areas });
    }
    entries.push({
      name: tag.name ?? '',
      description: element(software.body, 'description'),
      year: element(software.body, 'year'),
      publisher: element(software.body, 'publisher'),
      ...(tag.cloneof ? { cloneof: tag.cloneof } : {}),
      supported,
      parts,
    });
  }
  return {
    name: head.name ?? '',
    description: head.description ?? '',
    path,
    sha1: createHash('sha1').update(xml).digest('hex'),
    entries,
    byName: new Map(entries.map(entry => [entry.name, entry])),
  };
}

export function readList(path: string): SoftwareList {
  return parseList(readFileSync(path, 'utf8'), path);
}

/** Every chip the entry needs, across all of its parts. */
export function entryRoms(entry: ListEntry): { key: string; rom: ListRom; part: number }[] {
  return entry.parts.flatMap((part, partIndex) => part.areas.flatMap((area, areaIndex) =>
    area.roms.map((rom, romIndex) => ({ key: romKey(partIndex, areaIndex, romIndex), rom, part: partIndex }))));
}

export function romKey(part: number, area: number, rom: number): string {
  return `${part}:${area}:${rom}`;
}

/** The chip a ref names. */
export function refRom(ref: RomRef): ListRom {
  return ref.entry.parts[ref.part]!.areas[ref.area]!.roms[ref.rom]!;
}

/**
 * Every chip of every list, by size and CRC. Clones routinely share a dump --
 * the same cartridge sold under two labels -- so one key can name several
 * entries, and each of them is a set the dump completes.
 */
export class ListIndex {
  private readonly bySizeCrc = new Map<string, RomRef[]>();
  readonly lists: SoftwareList[] = [];

  add(list: SoftwareList): void {
    this.lists.push(list);
    for (const entry of list.entries) {
      entry.parts.forEach((part, partIndex) => part.areas.forEach((area, areaIndex) =>
        area.roms.forEach((rom, romIndex) => {
          const key = `${rom.size}:${rom.crc}`;
          const refs = this.bySizeCrc.get(key) ?? [];
          refs.push({ list, entry, part: partIndex, area: areaIndex, rom: romIndex });
          this.bySizeCrc.set(key, refs);
        })));
    }
  }

  lookup(size: number, crc: string): RomRef[] {
    return this.bySizeCrc.get(`${size}:${crc}`) ?? [];
  }
}

/**
 * Release regions MAME writes into a description's parentheses, so a stray
 * parenthetical ("rev. A", "prototype") is never mistaken for one. `western`
 * and `eastern` are shorthands for the two groups.
 */
export const WESTERN_REGIONS = [
  'USA', 'Europe', 'World', 'UK', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands',
  'Sweden', 'Norway', 'Denmark', 'Finland', 'Scandinavia', 'Greece', 'Poland', 'Russia',
  'Australia', 'Canada', 'Brazil', 'Mexico', 'Argentina', 'Israel',
];
export const EASTERN_REGIONS = ['Japan', 'Asia', 'China', 'Taiwan', 'Korea', 'Hong Kong', 'India'];
const KNOWN_REGIONS = new Set([...WESTERN_REGIONS, ...EASTERN_REGIONS]);

export function regionsOf(entry: ListEntry): string[] {
  const out: string[] = [];
  for (const tag of entry.description.matchAll(/\(([^()]*)\)/g)) {
    for (const part of tag[1]!.split(',')) {
      const token = part.trim();
      if (KNOWN_REGIONS.has(token)) out.push(token);
    }
  }
  return out;
}

/** Parse a --region argument into the set of region tags it names. */
export function parseRegions(argument: string): Set<string> {
  return new Set(argument.split(',').flatMap(raw => {
    const token = raw.trim();
    if (/^western$/i.test(token)) return WESTERN_REGIONS;
    if (/^eastern$/i.test(token)) return EASTERN_REGIONS;
    const hit = [...KNOWN_REGIONS].find(known => known.toLowerCase() === token.toLowerCase());
    if (!hit) throw new Error(`unknown region "${token}" -- known: western, eastern, ${[...KNOWN_REGIONS].join(', ')}`);
    return [hit];
  }));
}
