// Minimal PNG read/write for build-time artwork compositing.
//
// MAME's `<image file="art.png" alphafile="mask.png">` keeps a bezel's colour
// and its transparency in two separate files, and the transparency is the part
// that matters: the shell draws the bezel over the running game, so a bezel
// without its window is a bezel that hides the game. `cwebp` cannot join them
// and the project deliberately depends on nothing heavier, so the join happens
// here, on the two colour types MAME artwork actually ships.
//
// Deliberately narrow. Anything outside the subset throws rather than guessing:
// a wrong guess here is a silently wrong bezel, which is exactly the failure
// this file exists to fix.

import { deflateSync, inflateSync } from 'node:zlib';

export interface DecodedPng {
  width: number;
  height: number;
  /** Row-major RGBA, four bytes per pixel. */
  pixels: Uint8Array;
}

const SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

interface Chunk { type: string; data: Uint8Array }

function chunks(png: Uint8Array): Chunk[] {
  for (const [index, byte] of SIGNATURE.entries()) {
    if (png[index] !== byte) throw new Error('not a PNG');
  }
  const view = new DataView(png.buffer, png.byteOffset, png.byteLength);
  const found: Chunk[] = [];
  let at = 8;
  while (at + 8 <= png.length) {
    const length = view.getUint32(at);
    const type = String.fromCharCode(...png.subarray(at + 4, at + 8));
    found.push({ type, data: png.subarray(at + 8, at + 8 + length) });
    at += 12 + length;
    if (type === 'IEND') break;
  }
  return found;
}

/** Undo the per-row PNG filters in place, returning the raw sample rows. */
function unfilter(
  raw: Uint8Array,
  width: number,
  height: number,
  bytesPerPixel: number,
  bytesPerRow: number,
): Uint8Array {
  const out = new Uint8Array(height * bytesPerRow);
  let source = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[source++]!;
    const row = y * bytesPerRow;
    const previous = row - bytesPerRow;
    for (let x = 0; x < bytesPerRow; x++) {
      const value = raw[source++]!;
      const left = x >= bytesPerPixel ? out[row + x - bytesPerPixel]! : 0;
      const up = y > 0 ? out[previous + x]! : 0;
      const upLeft = y > 0 && x >= bytesPerPixel ? out[previous + x - bytesPerPixel]! : 0;
      let restored: number;
      if (filter === 0) restored = value;
      else if (filter === 1) restored = value + left;
      else if (filter === 2) restored = value + up;
      else if (filter === 3) restored = value + ((left + up) >> 1);
      else if (filter === 4) {
        const p = left + up - upLeft;
        const dl = Math.abs(p - left);
        const du = Math.abs(p - up);
        const dul = Math.abs(p - upLeft);
        restored = value + (dl <= du && dl <= dul ? left : du <= dul ? up : upLeft);
      } else throw new Error(`unsupported PNG row filter ${filter}`);
      out[row + x] = restored & 0xff;
    }
    void width;
  }
  return out;
}

/**
 * Decode the PNG shapes MAME artwork packs use: 8-bit truecolour or
 * greyscale (with or without alpha) and 1/2/4/8-bit palette, uninterlaced.
 */
export function decodePng(png: Uint8Array): DecodedPng {
  const parts = chunks(png);
  const header = parts.find(chunk => chunk.type === 'IHDR');
  if (!header) throw new Error('PNG has no IHDR');
  const ihdr = new DataView(header.data.buffer, header.data.byteOffset, header.data.byteLength);
  const width = ihdr.getUint32(0);
  const height = ihdr.getUint32(4);
  const depth = header.data[8]!;
  const colour = header.data[9]!;
  const interlace = header.data[12]!;
  if (interlace !== 0) throw new Error('interlaced PNG is not supported');

  const samples = colour === 0 ? 1 : colour === 2 ? 3 : colour === 3 ? 1 : colour === 4 ? 2 : 4;
  if (colour === 3 ? ![1, 2, 4, 8].includes(depth) : depth !== 8) {
    throw new Error(`unsupported PNG colour type ${colour} at depth ${depth}`);
  }
  const bytesPerRow = Math.ceil((width * samples * depth) / 8);
  const bytesPerPixel = Math.max(1, Math.ceil((samples * depth) / 8));
  const data = Buffer.concat(
    parts.filter(chunk => chunk.type === 'IDAT').map(chunk => Buffer.from(chunk.data)),
  );
  const rows = unfilter(
    new Uint8Array(inflateSync(data)),
    width,
    height,
    bytesPerPixel,
    bytesPerRow,
  );

  const palette = parts.find(chunk => chunk.type === 'PLTE')?.data;
  const paletteAlpha = parts.find(chunk => chunk.type === 'tRNS')?.data;
  if (colour === 3 && !palette) throw new Error('palette PNG has no PLTE');

  const pixels = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    const row = y * bytesPerRow;
    for (let x = 0; x < width; x++) {
      const out = (y * width + x) * 4;
      if (colour === 3) {
        const perByte = 8 / depth;
        const byte = rows[row + Math.floor(x / perByte)]!;
        const shift = (perByte - 1 - (x % perByte)) * depth;
        const index = (byte >> shift) & ((1 << depth) - 1);
        pixels[out] = palette![index * 3]!;
        pixels[out + 1] = palette![index * 3 + 1]!;
        pixels[out + 2] = palette![index * 3 + 2]!;
        pixels[out + 3] = paletteAlpha?.[index] ?? 0xff;
        continue;
      }
      const at = row + x * samples;
      if (colour === 0 || colour === 4) {
        const grey = rows[at]!;
        pixels[out] = grey;
        pixels[out + 1] = grey;
        pixels[out + 2] = grey;
        pixels[out + 3] = colour === 4 ? rows[at + 1]! : 0xff;
        continue;
      }
      pixels[out] = rows[at]!;
      pixels[out + 1] = rows[at + 1]!;
      pixels[out + 2] = rows[at + 2]!;
      pixels[out + 3] = colour === 6 ? rows[at + 3]! : 0xff;
    }
  }
  return { width, height, pixels };
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(12 + data.length);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  for (const [index, character] of [...type].entries()) out[4 + index] = character.charCodeAt(0);
  out.set(data, 8);
  view.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}

/** Write row-major RGBA as an uninterlaced 8-bit truecolour-with-alpha PNG. */
export function encodeRgbaPng(image: DecodedPng): Uint8Array {
  const { width, height, pixels } = image;
  const raw = new Uint8Array(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0;
    raw.set(
      pixels.subarray(y * width * 4, (y + 1) * width * 4),
      y * (1 + width * 4) + 1,
    );
  }
  const ihdr = new Uint8Array(13);
  const view = new DataView(ihdr.buffer);
  view.setUint32(0, width);
  view.setUint32(4, height);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const body = [
    chunk('IHDR', ihdr),
    chunk('IDAT', new Uint8Array(deflateSync(Buffer.from(raw)))),
    chunk('IEND', new Uint8Array(0)),
  ];
  const total = SIGNATURE.length + body.reduce((sum, part) => sum + part.length, 0);
  const png = new Uint8Array(total);
  png.set(SIGNATURE, 0);
  let at = SIGNATURE.length;
  for (const part of body) { png.set(part, at); at += part.length; }
  return png;
}

/**
 * MAME `alphafile`: the mask's luminance becomes the art's alpha channel.
 *
 * The two images are the same size in every pack that uses it; a mismatch is
 * a pack this cannot honour rather than something to stretch.
 */
export function applyAlphaMask(art: DecodedPng, mask: DecodedPng): DecodedPng {
  if (art.width !== mask.width || art.height !== mask.height) {
    throw new Error(
      `alphafile is ${mask.width}x${mask.height}, art is ${art.width}x${art.height}`,
    );
  }
  const pixels = new Uint8Array(art.pixels);
  for (let pixel = 0; pixel < art.width * art.height; pixel++) {
    const at = pixel * 4;
    // Rec. 601 luma, the same weighting MAME's own render pipeline applies.
    pixels[at + 3] = Math.round(
      0.299 * mask.pixels[at]! + 0.587 * mask.pixels[at + 1]! + 0.114 * mask.pixels[at + 2]!,
    );
  }
  return { width: art.width, height: art.height, pixels };
}
