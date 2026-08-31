// Cabinet bezels, resolved at build time so the play page never pulls a zip.
//
// A MAME artwork pack is an archive of every bezel, cocktail, instruction card
// and mask anyone ever scanned for a game, and `default.lay` names the one the
// cabinet view actually draws. The browser used to do that resolution itself,
// which meant fetching the whole pack to read one member: digdug ships 7.4 MB
// of PNGs to use 1.7 MB of them, and a zip cannot be read until it has landed
// whole, so launching a game cost 4.1 s off an object store with no CDN in
// front of it. Across the tree it is 545 MB of zips to reach 152.7 MB of art.
//
// So the resolution moves here. Each zip is opened once, `parseArtworkLayout`
// picks the view, the PNG that view names is re-encoded to a width-capped
// `.webp`, and the view's geometry is written beside it as JSON. The site
// ships both (shipWebArtwork), and runtime/artwork.ts reads them same-origin.
//
// The parser is imported from the runtime rather than reimplemented: build and
// browser must agree about which PNG is the bezel, and sharing the function is
// the only version of that which cannot drift. The browser keeps its zip path
// as the fallback for packs with no lay, and for artwork added since the last
// build.

import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import {
  parseArtworkLayout,
  SHIPPED_BEZEL_WIDTH,
  type BezelSidecar,
} from '../runtime/artwork.ts';
import { applyAlphaMask, decodePng, encodeRgbaPng } from './png.ts';
import { readZip } from '../runtime/zip.ts';

/** Long-edge cap for a shipped bezel; see SHIPPED_BEZEL_WIDTH for why. */
const BEZEL_WIDTH = SHIPPED_BEZEL_WIDTH;

/** WebP quality, matching IMG_QUALITY in .data/Makefile so the trees agree. */
const BEZEL_QUALITY = 82;

export interface BezelShipResult {
  /** Games that now have a shipped bezel. */
  shipped: number;
  /** Packs skipped because no lay resolved — the browser still has the zip. */
  unresolved: number;
  /** Total bytes of `.webp` shipped. */
  bytes: number;
  /** Bytes of PNG those were re-encoded from, for the saving line. */
  sourceBytes: number;
}

/**
 * Derive the bezel siblings for every pack under `.data/artwork/*.zip`.
 *
 * Output lands in `.data/artwork/bezels/` next to the packs rather than
 * straight into dist, for the same reason `make images` writes siblings beside
 * their scans: the zips never change under their own name, so an output newer
 * than its zip is still correct and the next build can skip the work. Only the
 * first build after a new pack arrives pays for the re-encode.
 *
 * Returns null when there is no artwork tree to derive from — a checkout
 * without `.data` builds a site with no bezels rather than failing.
 */
export async function deriveBezelArtwork(dataRoot: string): Promise<BezelShipResult | null> {
  if (!existsSync(dataRoot)) return null;
  const outDir = join(dataRoot, 'bezels');
  const zips = readdirSync(dataRoot).filter(name => name.endsWith('.zip')).sort();
  if (!zips.length) return null;

  // A derived bezel depends on the pack *and* on which view the resolver picks
  // out of it. Keyed on the zip alone, a change to parseArtworkLayout silently
  // kept the old choice: Green Beret went on shipping its instruction card as
  // the cabinet through a full rebuild after the chooser was fixed.
  const resolverMtime = resolverTimestamp();
  const result: BezelShipResult = { shipped: 0, unresolved: 0, bytes: 0, sourceBytes: 0 };
  for (const zipName of zips) {
    const game = zipName.slice(0, -'.zip'.length);
    const zipPath = join(dataRoot, zipName);
    const webp = join(outDir, `${game}.webp`);
    const sidecar = join(outDir, `${game}.json`);

    if (isFresh(webp, zipPath, resolverMtime) && isFresh(sidecar, zipPath, resolverMtime)) {
      result.shipped++;
      result.bytes += statSync(webp).size;
      continue;
    }

    const derived = await deriveOne(zipPath, webp, sidecar);
    if (!derived) {
      result.unresolved++;
      // A pack that stops resolving must not leave last build's bezel behind
      // claiming to be current.
      rmSync(webp, { force: true });
      rmSync(sidecar, { force: true });
      continue;
    }
    result.shipped++;
    result.bytes += derived.bytes;
    result.sourceBytes += derived.sourceBytes;
  }
  return result;
}

/**
 * True when `derived` exists and is no older than either input it came from:
 * the pack, and the module that decides which view inside it to ship.
 */
function isFresh(derived: string, zipPath: string, resolverMtime: number): boolean {
  if (!existsSync(derived)) return false;
  const derivedAt = statSync(derived).mtimeMs;
  return derivedAt >= statSync(zipPath).mtimeMs && derivedAt >= resolverMtime;
}

/**
 * When the view chooser last changed.
 *
 * Zero when it cannot be read — a distribution built from somewhere without
 * the source tree keeps the old zip-only rule rather than re-encoding every
 * pack on every build.
 */
function resolverTimestamp(): number {
  try {
    return statSync(join(import.meta.dirname, '../runtime/artwork.ts')).mtimeMs;
  } catch {
    return 0;
  }
}

/**
 * One pack -> one `.webp` + one `.json`, or null when its lay does not resolve
 * to art (pooyan ships no `default.lay` at all).
 */
async function deriveOne(
  zipPath: string,
  webp: string,
  sidecar: string,
): Promise<{ bytes: number; sourceBytes: number } | null> {
  let files: Map<string, Uint8Array>;
  try {
    files = await readZip(new Uint8Array(readFileSync(zipPath)));
  } catch {
    return null; // a truncated or non-zip pack is a miss, not a build failure
  }
  const lay = files.get('default.lay');
  if (!lay) return null;
  const view = parseArtworkLayout(new TextDecoder().decode(lay));
  if (!view) return null;
  // MAME lays are case-inconsistent about the member they name, the same
  // fallback runtime/artwork.ts applies.
  const png = files.get(view.file) ?? files.get(view.file.toLowerCase());
  if (!png) return null;

  // MAME keeps a bezel's colour and its transparency in two members when the
  // lay names an alphafile, and the transparency is the half that matters:
  // the shell draws the bezel over the running game, so shipping the colour
  // alone would hide it. A pack whose pair cannot be composited ships no
  // bezel, which is the visible, cheap failure this module prefers.
  let source = png;
  if (view.alphaFile) {
    const mask = files.get(view.alphaFile) ?? files.get(view.alphaFile.toLowerCase());
    if (!mask) return null;
    try {
      source = encodeRgbaPng(applyAlphaMask(decodePng(png), decodePng(mask)));
    } catch {
      return null;
    }
  }

  mkdirSync(dirname(webp), { recursive: true });
  const staged = `${webp}.png`;
  try {
    writeFileSync(staged, source);
    if (!encodeWebp(staged, webp)) return null;
  } finally {
    rmSync(staged, { force: true });
  }

  // `file` and `alphaFile` named zip members the site does not serve;
  // everything else is geometry composeBezel() maps onto the decoded .webp.
  const { file: _file, alphaFile: _alphaFile, ...geometry } = view;
  writeFileSync(sidecar, `${JSON.stringify(geometry satisfies BezelSidecar, null, 2)}\n`);
  return { bytes: statSync(webp).size, sourceBytes: source.length };
}

/**
 * PNG -> WebP through cwebp, capped at BEZEL_WIDTH but never upscaled: a few
 * packs ship art already narrower than the cap (simpsons and wardner are
 * 1920px, tmnt's card is 1000px), and enlarging one only blurs it and costs
 * bytes. Returns false when cwebp is unavailable, which leaves the game on the
 * zip fallback instead of failing a build over a missing brew package.
 */
function encodeWebp(source: string, target: string): boolean {
  const args = ['-q', String(BEZEL_QUALITY), '-quiet'];
  if (pngWidth(source) > BEZEL_WIDTH) args.push('-resize', String(BEZEL_WIDTH), '0');
  try {
    execFileSync('cwebp', [...args, source, '-o', target], { stdio: 'pipe' });
    return existsSync(target);
  } catch {
    return false;
  }
}

/** Width from the PNG IHDR — cheaper and more portable than shelling out. */
function pngWidth(path: string): number {
  const header = readFileSync(path).subarray(0, 24);
  if (header.length < 24) return 0;
  return new DataView(header.buffer, header.byteOffset, header.byteLength).getUint32(16);
}

/**
 * Copy the derived bezels into `dist/artwork/bezels/`.
 *
 * Split from the derive step so the copy stays as dumb as shipWebArtwork's:
 * whatever is on disk and current gets shipped, and a build in a checkout
 * without `.data` ships nothing rather than erroring.
 */
export function copyBezelArtwork(dataRoot: string, target: string): number {
  const from = join(dataRoot, 'bezels');
  if (!existsSync(from)) return 0;
  let shipped = 0;
  for (const name of readdirSync(from)) {
    if (!name.endsWith('.webp') && !name.endsWith('.json')) continue;
    const dest = join(target, 'bezels', name);
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(join(from, name), dest);
    if (name.endsWith('.webp')) shipped++;
  }
  return shipped;
}
