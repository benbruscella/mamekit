// Cover scans for computer software shelves (#159).
//
// The software room draws each title as its medium -- a tape, a disk, a
// cartridge -- and puts a real cover over it when the shelf has one under
// .data/artwork/carts/<list>/<name>.webp (src/gen/cart-art.ts indexes it,
// src/gen/app-build.ts ships it, software.ts withCover() draws it).
//
// A cover archive is a zip of scans named by title, not by hash -- TOSEC's
// C64 Cover.zip is 8,342 of them (`Cover/B/Bounty_Bob_Strikes_Back.jpg`, with
// `_[Back]` siblings and `(Kixx)` re-release labels) -- so nothing in it says
// which machine it is for. It is scoped by where it is dropped: an archive in
// .data/_input/<system>/ (c64, spectrum: the last part of the system's
// dumpsKey) matches against that system's shelves only.
//
// A title finds its front by name: both sides normalise to a comparable key
// (case, punctuation, a leading or trailing "The", parenthesised notes and
// bracketed scan kinds dropped). A scan whose own label names a different
// publisher than MAME's entry -- `Dig_Dug_(Thunder_Mountain)` for Atarisoft's
// cartridge -- is the same game but maybe not the same release, so it is held
// in _input/_review/<list>/<name>.webp for a person to accept (move it into
// artwork/carts/<list>/) or ignore. An existing cover wins unless the import
// is told to replace (`make covers-import REPLACE=1`).

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gameOutputDir } from '../../src/gen/output-layout.ts';
import type { System } from './systems.ts';

/** A tile is drawn 200 CSS px tall (software.ts coverEl); 240 is ample once object-fit crops it. */
export const COVER_HEIGHT = 240;
/**
 * A scan this much wider than tall is an unfolded cassette inlay -- back,
 * spine and front side by side -- so only its right-hand front panel is
 * kept. Real fronts measured 1.03-1.08 wide; inlays 1.35 and up.
 */
export const INLAY_ASPECT = 1.2;
/** A compact-cassette J-card front: 2.5 in wide by 4 in tall. */
export const JCARD_FRONT = 0.625;

const IMAGE = /\.(jpe?g|png|gif|webp)$/i;

/** A title as both sides spell it, reduced to what they share. */
export function coverKey(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/_/g, ' ')
    .trim()
    .replace(/,?\s+the$/i, '')
    .replace(/^the\s+/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

/** A software-list description's title: the part before its region and version notes. */
export function shelfTitle(description: string): string {
  return description.replace(/\s*\(.*$/, '').replace(/\s*\[.*$/, '');
}

/** Words in a scan's parenthesised notes that mark a version or medium, not a label. */
const NOT_A_LABEL = /^(?:v\d.*|\d+|alt\d*|rev\d*|max|cartridge|cart|disk|disks|tape|side\w*|part\w*|budget|release|rerelease|german|uk|us|usa|french|italian|spanish|europe)$/i;

/** The label words a scan's notes carry: `Avenger_(Kixx).jpg` -> ["Kixx"]. */
export function scanLabels(scan: string): string[] {
  return [...scan.split('/').pop()!.matchAll(/\(([^)]*)\)/g)]
    .flatMap(note => note[1]!.split(/[\s_\-,&]+/))
    .filter(word => word && !NOT_A_LABEL.test(word));
}

/**
 * Whether a scan's label contradicts the entry's publisher. TOSEC spells names
 * in ASCII (`Br0derbund`); a label word of three letters or more found in the
 * publisher agrees.
 */
export function scanContradicts(scan: string, publisher: string): boolean {
  const fold = (text: string): string => text.normalize('NFKD').toLowerCase()
    .replace(/ø/g, 'o').replace(/0/g, 'o').replace(/[^a-z0-9]+/g, '');
  const owner = fold(publisher);
  const words = scanLabels(scan);
  return words.length > 0 && !words.some(word => fold(word).length > 2 && owner.includes(fold(word)));
}

export interface CoverWant { list: string; name: string; description: string; publisher: string }

/** Every title on the shelves of a system's generated machines, once per list and name. */
export function coverWants(system: System, distDir: string): CoverWant[] {
  const seen = new Set<string>();
  const wanted: CoverWant[] = [];
  for (const machine of system.machines) {
    const shelves = machine.config?.software?.shelves ?? [];
    const dir = gameOutputDir(distDir, system.category, machine.game);
    for (const shelf of shelves) {
      const path = join(dir, shelf.catalogUrl);
      if (!existsSync(path)) continue;
      const catalog = JSON.parse(readFileSync(path, 'utf8')) as { entries: { name: string; description: string; publisher?: string }[] };
      for (const entry of catalog.entries) {
        const key = `${shelf.list}/${entry.name}`;
        if (seen.has(key)) continue;
        seen.add(key);
        wanted.push({ list: shelf.list, name: entry.name, description: entry.description, publisher: entry.publisher ?? '' });
      }
    }
  }
  return wanted;
}

/** Image members of a zip, without reading it: front scans only, grouped by title key. */
export function frontScans(members: string[]): Map<string, string[]> {
  const fronts = new Map<string, string[]>();
  for (const path of members.filter(name => IMAGE.test(name)).sort()) {
    const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    if (/\[[^\]]*\]/.test(base)) continue;
    const key = coverKey(base);
    if (key) fronts.set(key, [...(fronts.get(key) ?? []), path]);
  }
  return fronts;
}

/**
 * The scan a title takes: of those that do not contradict its publisher, one
 * whose label names it (MAME's entry is the Hit Squad re-release, so
 * `Title_(Hit_Squad).jpg`), then the plainest name (`Title.jpg` over
 * `Title_(v2).jpg`); else one to review.
 */
export function chooseScan(candidates: string[], publisher: string): { scan: string; review: boolean } | undefined {
  if (!candidates.length) return undefined;
  const notes = (scan: string) => (scan.split('/').pop()!.match(/\(/g) ?? []).length;
  const unnamed = (scan: string) => scanLabels(scan).length ? 0 : 1;
  const fitting = candidates.filter(scan => !scanContradicts(scan, publisher))
    .sort((a, b) => unnamed(a) - unnamed(b) || notes(a) - notes(b) || a.localeCompare(b));
  return fitting.length ? { scan: fitting[0]!, review: false } : { scan: candidates[0]!, review: true };
}

export interface CoverPlan {
  wanted: CoverWant[];
  write: { want: CoverWant; scan: string; dest: string }[];
  review: { want: CoverWant; scan: string; dest: string }[];
  present: CoverWant[];
  unmatched: CoverWant[];
}

/** `replace` rewrites covers already filed -- after a better archive, or a better crop. */
export function planCovers(members: string[], wanted: CoverWant[], artRoot: string, reviewRoot: string, replace = false): CoverPlan {
  const fronts = frontScans(members);
  const plan: CoverPlan = { wanted, write: [], review: [], present: [], unmatched: [] };
  for (const want of wanted) {
    const dest = join(artRoot, want.list, `${want.name}.webp`);
    if (!replace && existsSync(dest)) { plan.present.push(want); continue; }
    const chosen = chooseScan(fronts.get(coverKey(shelfTitle(want.description))) ?? [], want.publisher);
    if (!chosen) plan.unmatched.push(want);
    else if (chosen.review) plan.review.push({ want, scan: chosen.scan, dest: join(reviewRoot, want.list, `${want.name}.webp`) });
    else plan.write.push({ want, scan: chosen.scan, dest });
  }
  return plan;
}

/** Pixel size from a JPEG, PNG or GIF header, or undefined for anything else. */
export function imageSize(bytes: Uint8Array): { width: number; height: number } | undefined {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (bytes.length > 24 && bytes[0] === 0x89 && bytes[1] === 0x50) return { width: view.getUint32(16), height: view.getUint32(20) };
  if (bytes.length > 10 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return { width: view.getUint16(6, true), height: view.getUint16(8, true) };
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return undefined;
  for (let at = 2; at + 9 < bytes.length;) {
    if (bytes[at] !== 0xff) { at++; continue; }
    const marker = bytes[at + 1]!;
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0xff) { at += marker === 0xff ? 1 : 2; continue; }
    // SOF0-15 carry the frame size; C4 (DHT), C8 (JPG) and CC (DAC) do not.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { width: view.getUint16(at + 7), height: view.getUint16(at + 5) };
    }
    at += 2 + view.getUint16(at + 2);
  }
  return undefined;
}

/** The front panel of a scan: the whole of it, or an inlay's right-hand J-card front. */
export function frontCrop(width: number, height: number, edge?: number): { x: number; width: number } | undefined {
  if (width / height <= INLAY_ASPECT) return undefined;
  const front = Math.min(width, edge !== undefined ? width - edge : Math.round(height * JCARD_FRONT));
  return { x: width - front, width: front };
}

/**
 * A front panel is between a J-card's narrowest (half its height) and a disk
 * sleeve's square: fronts measured 0.52 (Amaurote's inlay) to 0.95 (Arkanoid's
 * sleeve) of the scan's height.
 */
export const FRONT_MIN = 0.5;
export const FRONT_MAX = 1.0;

/** A step in grey this large between neighbouring columns is an edge in that row. */
const EDGE_STEP = 24;

/**
 * Where an unfolded scan's front panel begins, measured on a small greyscale
 * copy (`pixels` row-major, `width` x `height`). A fold runs the scan's whole
 * height where an edge in the artwork covers part of it, so each column in
 * the band a front can start in scores the share of rows with an edge there
 * (columns compared one and two apart, so a soft fold still reads). The
 * left-most column within a tenth of the best score wins: some fronts carry a
 * full-height stripe of their own (Mastertronic's label band), and keeping a
 * sliver of spine costs a tile far less than cutting its title in half.
 */
export function frontEdge(pixels: Uint8Array, width: number, height: number): number {
  const from = Math.max(2, Math.round(width - FRONT_MAX * height));
  const to = Math.min(width - 2, Math.round(width - FRONT_MIN * height));
  const scores: number[] = [];
  for (let x = from; x <= to; x++) {
    let rows = 0;
    for (let y = 0; y < height; y++) {
      const row = y * width;
      if (Math.abs(pixels[row + x]! - pixels[row + x - 1]!) > EDGE_STEP
        || Math.abs(pixels[row + x + 1]! - pixels[row + x - 2]!) > EDGE_STEP) rows++;
    }
    scores.push(rows / height);
  }
  const best = Math.max(...scores);
  const first = scores.findIndex(score => score >= best * 0.9);
  return first < 0 ? to : from + first;
}

/** Greyscale pixels from a binary PPM (P6), as dwebp -ppm writes it. */
export function ppmGrey(bytes: Uint8Array): { pixels: Uint8Array; width: number; height: number } {
  const header: string[] = [];
  let at = 0;
  while (header.length < 4) {
    while (/\s/.test(String.fromCharCode(bytes[at]!))) at++;
    if (bytes[at] === 0x23) { while (bytes[at] !== 0x0a) at++; continue; }
    let token = '';
    while (!/\s/.test(String.fromCharCode(bytes[at]!))) token += String.fromCharCode(bytes[at++]!);
    header.push(token);
  }
  at++;
  const width = Number(header[1]);
  const height = Number(header[2]);
  const pixels = new Uint8Array(width * height);
  for (let i = 0; i < pixels.length; i++, at += 3) pixels[i] = (bytes[at]! * 299 + bytes[at + 1]! * 587 + bytes[at + 2]! * 114) / 1000;
  return { pixels, width, height };
}

/** The front's left edge in a scan's own pixels, found on a 200 px tall copy. */
function measureFront(source: string, scratch: string, width: number, height: number): number | undefined {
  try {
    const small = join(scratch, 'measure.webp');
    const ppm = join(scratch, 'measure.ppm');
    execFileSync('cwebp', ['-quiet', '-q', '90', '-resize', '0', '200', source, '-o', small], { stdio: 'pipe' });
    execFileSync('dwebp', ['-quiet', small, '-ppm', '-o', ppm], { stdio: 'pipe' });
    const grey = ppmGrey(readFileSync(ppm));
    return Math.round(frontEdge(grey.pixels, grey.width, grey.height) * width / grey.width);
  } catch {
    return undefined;
  }
}

/**
 * Pull many scans out of an archive in one pass. Each `unzip -p` call walks
 * the whole central directory of a 2 GB archive again (1,137 covers took ten
 * minutes that way), so they are extracted together into a scratch folder.
 */
export function extractScans(zip: string, scans: string[]): { dir: string; path: (scan: string) => string; done: () => void } {
  const dir = mkdtempSync(join(tmpdir(), 'mamekit-covers-'));
  const unique = [...new Set(scans)];
  // unzip reads member names as wildcard patterns, and `_[Back]` is a class:
  // a one-character class is the escape that holds for every special character.
  const pattern = (scan: string) => scan.replace(/[[*?]/g, char => `[${char}]`);
  for (let at = 0; at < unique.length; at += 400) {
    execFileSync('unzip', ['-o', '-qq', zip, ...unique.slice(at, at + 400).map(pattern), '-d', dir], { stdio: 'pipe', maxBuffer: 64 * 1024 * 1024 });
  }
  return { dir, path: scan => join(dir, scan), done: () => rmSync(dir, { recursive: true, force: true }) };
}

/** Write one scan as a shelf cover: front panel, COVER_HEIGHT tall, WebP. Returns whether it cropped. */
export function writeCover(zip: string, scan: string, dest: string, extracted?: string): { cropped: boolean; bytes: number } {
  const scratch = mkdtempSync(join(tmpdir(), 'mamekit-cover-'));
  try {
    const bytes = extracted ? readFileSync(extracted) : execFileSync('unzip', ['-p', zip, scan], { maxBuffer: 256 * 1024 * 1024 });
    const size = imageSize(bytes);
    let source = extracted ?? join(scratch, 'scan');
    if (!extracted) writeFileSync(source, bytes);
    // cwebp reads no GIF; gif2webp keeps its pixel size, and cwebp reads WebP.
    if (/\.gif$/i.test(scan)) {
      execFileSync('gif2webp', ['-quiet', source, '-o', `${source}.webp`], { stdio: 'pipe' });
      source = `${source}.webp`;
    }
    const unfolded = size && size.width / size.height > INLAY_ASPECT;
    const crop = unfolded ? frontCrop(size.width, size.height, measureFront(source, scratch, size.width, size.height)) : undefined;
    mkdirSync(join(dest, '..'), { recursive: true });
    execFileSync('cwebp', [
      '-q', '80', ...(crop ? ['-crop', String(crop.x), '0', String(crop.width), String(size!.height)] : []),
      '-resize', '0', String(COVER_HEIGHT), '-quiet', source, '-o', dest,
    ], { stdio: 'pipe' });
    return { cropped: !!crop, bytes: statSync(dest).size };
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

/** A zip's member names from its central directory, without reading the archive. */
export function zipMembers(zip: string): string[] | undefined {
  try {
    return execFileSync('unzip', ['-Z1', zip], { maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString().split('\n').filter(Boolean);
  } catch {
    return undefined;
  }
}

/** Covers already on a list's shelf, by short name. */
export function shelfCovers(artRoot: string, list: string): Set<string> {
  const dir = join(artRoot, list);
  if (!existsSync(dir)) return new Set();
  return new Set(readdirSync(dir).filter(file => file.endsWith('.webp')).map(file => file.slice(0, -5).replace(/\.sticker$/, '')));
}
