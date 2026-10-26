/**
 * Setting the two sides' captures against each other: pictures, RAM, bus
 * traffic and the inputs each side read. Everything here reads files the two runs wrote and nothing else.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { crc32, deflateSync } from 'node:zlib';
import { ramBytesPerFrame, type RamPlan, type TimelineInput } from './plan.ts';

export interface Picture {
  width: number;
  height: number;
  /** RGB, three bytes a pixel. */
  rgb: Uint8Array;
}

/**
 * Our framebuffer is the screen's native orientation in canvas byte order
 * (R, G, B, A); MAME's snapshot is the presented picture, rotated by the
 * driver's ROT flag. Ours is turned clockwise by that flag to meet it.
 */
export function oursPicture(path: string, width: number, height: number, rotate: number): Picture {
  const rgba = readFileSync(path);
  const turned = rotate === 90 || rotate === 270;
  const out = { width: turned ? height : width, height: turned ? width : height, rgb: new Uint8Array(width * height * 3) };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [tx, ty] = rotate === 90 ? [height - 1 - y, x]
        : rotate === 180 ? [width - 1 - x, height - 1 - y]
        : rotate === 270 ? [y, width - 1 - x]
        : [x, y];
      const from = (y * width + x) * 4;
      const to = (ty * out.width + tx) * 3;
      out.rgb[to] = rgba[from]!;
      out.rgb[to + 1] = rgba[from + 1]!;
      out.rgb[to + 2] = rgba[from + 2]!;
    }
  }
  return out;
}

/** MAME's snapshot_pixels: rgb_t words, 0xAARRGGBB, little-endian. */
export function mamePicture(path: string, width: number, height: number): Picture {
  const words = readFileSync(path);
  const rgb = new Uint8Array(width * height * 3);
  for (let index = 0; index < width * height; index++) {
    rgb[index * 3] = words[index * 4 + 2]!;
    rgb[index * 3 + 1] = words[index * 4 + 1]!;
    rgb[index * 3 + 2] = words[index * 4]!;
  }
  return { width, height, rgb };
}

/** Pixels whose colour differs, or undefined when the pictures are not the same size. */
export function differingPixels(left: Picture, right: Picture): number | undefined {
  if (left.width !== right.width || left.height !== right.height) return undefined;
  let count = 0;
  for (let index = 0; index < left.width * left.height; index++) {
    const at = index * 3;
    if (left.rgb[at] !== right.rgb[at] || left.rgb[at + 1] !== right.rgb[at + 1] || left.rgb[at + 2] !== right.rgb[at + 2]) count++;
  }
  return count;
}

/** MAME, ours, and ours dimmed with every differing pixel in red, side by side. */
export function sideBySide(mame: Picture, ours: Picture): Picture {
  const gap = 4;
  const width = mame.width + ours.width * 2 + gap * 2;
  const height = Math.max(mame.height, ours.height);
  const rgb = new Uint8Array(width * height * 3).fill(48);
  const blit = (picture: Picture, left: number, pixel: (index: number) => [number, number, number]) => {
    for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
        const [r, g, b] = pixel(y * picture.width + x);
        const to = (y * width + left + x) * 3;
        rgb[to] = r; rgb[to + 1] = g; rgb[to + 2] = b;
      }
    }
  };
  const colour = (picture: Picture) => (index: number): [number, number, number] =>
    [picture.rgb[index * 3]!, picture.rgb[index * 3 + 1]!, picture.rgb[index * 3 + 2]!];
  blit(mame, 0, colour(mame));
  blit(ours, mame.width + gap, colour(ours));
  const comparable = mame.width === ours.width && mame.height === ours.height;
  blit(ours, mame.width + ours.width + gap * 2, index => {
    const [r, g, b] = colour(ours)(index);
    const [mr, mg, mb] = comparable ? colour(mame)(index) : [r, g, b];
    if (r !== mr || g !== mg || b !== mb) return [255, 0, 0];
    const grey = Math.round((r + g + b) / 12);
    return [grey, grey, grey];
  });
  return { width, height, rgb };
}

/** A plain 8-bit RGB PNG, no dependencies. */
export function writePng(path: string, picture: Picture): void {
  const chunk = (type: string, data: Uint8Array): Buffer => {
    const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
    const out = Buffer.alloc(body.length + 8);
    out.writeUInt32BE(data.length, 0);
    body.copy(out, 4);
    out.writeUInt32BE(crc32(body) >>> 0, body.length + 4);
    return out;
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(picture.width, 0);
  header.writeUInt32BE(picture.height, 4);
  header.set([8, 2, 0, 0, 0], 8);
  const stride = picture.width * 3;
  const rows = Buffer.alloc((stride + 1) * picture.height);
  for (let y = 0; y < picture.height; y++) {
    rows[y * (stride + 1)] = 0;
    rows.set(picture.rgb.subarray(y * stride, (y + 1) * stride), y * (stride + 1) + 1);
  }
  writeFileSync(path, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(rows)),
    chunk('IEND', new Uint8Array()),
  ]));
}

export interface FrameResult {
  /** Our frame. */
  frame: number;
  /** MAME's frame it was set against. */
  mame: number;
  /** Differing pixels; absent when a side has no picture. */
  pixels?: number;
  /** Set when the pictures differ in size: "256x240 vs 256x224". */
  size?: string;
}

/**
 * Every compared frame at every offset, and the offset that leaves the fewest
 * differing pixels over the whole run. One offset for the run, never the best
 * per frame: a frame-by-frame choice would hide a machine running at the
 * wrong speed.
 */
export function comparePictures(
  dir: string,
  frames: readonly number[],
  offsets: readonly number[],
  ours: { width: number; height: number; rotate: number },
): {
  offset: number;
  /** Every offset as good as the one kept: a still picture fits several. */
  tied: number[];
  results: FrameResult[];
  pictures: Map<number, { mame?: Picture; ours?: Picture }>;
} {
  const sizeText = join(dir, 'mame-size.txt');
  const [mameWidth, mameHeight] = existsSync(sizeText)
    ? readFileSync(sizeText, 'utf8').trim().split(/\s+/).map(Number) as [number, number]
    : [0, 0];
  const oursFor = new Map<number, Picture>();
  for (const frame of frames) {
    const path = join(dir, `ours-${frame}.rgba`);
    if (existsSync(path)) oursFor.set(frame, oursPicture(path, ours.width, ours.height, ours.rotate));
  }
  const mameFor = (frame: number): Picture | undefined => {
    const path = join(dir, `mame-${frame}.rgb`);
    return existsSync(path) ? mamePicture(path, mameWidth, mameHeight) : undefined;
  };
  const resultsAt = (offset: number): FrameResult[] => frames.map(frame => {
    const left = mameFor(frame + offset);
    const right = oursFor.get(frame);
    const result: FrameResult = { frame, mame: frame + offset };
    if (!left || !right) return result;
    const pixels = differingPixels(left, right);
    if (pixels === undefined) result.size = `${left.width}x${left.height} vs ${right.width}x${right.height}`;
    else result.pixels = pixels;
    return result;
  });
  const total = (results: FrameResult[]) => results.reduce((sum, result) =>
    sum + (result.pixels ?? Number.MAX_SAFE_INTEGER / 1e6), 0);
  const ranked = [...offsets].sort((a, b) => Math.abs(a) - Math.abs(b))
    .map(offset => ({ offset, results: resultsAt(offset) }))
    .sort((a, b) => total(a.results) - total(b.results));
  const best = ranked[0] ?? { offset: 0, results: [] };
  const tied = ranked.filter(candidate => total(candidate.results) === total(best.results))
    .map(candidate => candidate.offset).sort((a, b) => a - b);
  const pictures = new Map(frames.map(frame => [frame, { mame: mameFor(frame + best.offset), ours: oursFor.get(frame) }]));
  return { offset: best.offset, tied, results: best.results, pictures };
}

export interface RamDifference {
  cpu: string;
  address: string;
  mame: number;
  ours: number;
}

export interface RamResult {
  offset: number;
  bytesPerFrame: number;
  /** Frames both sides dumped and were set against each other; 0 means nothing was compared. */
  compared: number;
  /** Differing bytes at each of our dumped frames, at `offset`. */
  differing: Record<number, number>;
  /**
   * At each compared frame, MAME's RAM against the nearest of our frames
   * around it (MAME frame = ours + offset): how near the two machines are
   * late in a run, whatever phase they boot in.
   */
  nearest: Record<number, { offset: number; bytes: number }>;
  /** Our first frame whose RAM differs from MAME's, and where. */
  firstDivergence?: { frame: number; mame: number; bytes: number; addresses: RamDifference[] };
}

function frameChunks(path: string, frames: readonly number[], size: number): Map<number, Uint8Array> {
  const chunks = new Map<number, Uint8Array>();
  if (!existsSync(path)) return chunks;
  const bytes = readFileSync(path);
  frames.forEach((frame, index) => {
    if ((index + 1) * size <= bytes.length) chunks.set(frame, bytes.subarray(index * size, (index + 1) * size));
  });
  return chunks;
}

/** Where a byte of a frame's dump came from. */
function addressAt(cpus: RamPlan['cpus'], position: number): { cpu: string; address: number } {
  for (const cpu of cpus) {
    for (const [start, end] of cpu.ranges) {
      const length = end - start + 1;
      if (position < length) return { cpu: cpu.tag, address: start + position };
      position -= length;
    }
  }
  return { cpu: '?', address: -1 };
}

export function compareRam(
  dir: string,
  ram: RamPlan,
  oursFrames: readonly number[],
  mameFrames: readonly number[],
  offsets: readonly number[],
  compared: readonly number[],
): RamResult {
  const size = ramBytesPerFrame(ram.cpus);
  const ours = frameChunks(join(dir, 'ours-ram.bin'), oursFrames, size);
  const mame = frameChunks(join(dir, 'mame-ram.bin'), mameFrames, size);
  const count = (left: Uint8Array, right: Uint8Array) => {
    let differing = 0;
    for (let index = 0; index < size; index++) if (left[index] !== right[index]) differing++;
    return differing;
  };
  const at = (offset: number) => {
    const differing: Record<number, number> = {};
    for (const frame of oursFrames) {
      const left = mame.get(frame + offset);
      const right = ours.get(frame);
      if (left && right) differing[frame] = count(left, right);
    }
    return differing;
  };
  const ranked = [...offsets].sort((a, b) => Math.abs(a) - Math.abs(b)).map(offset => {
    const differing = at(offset);
    const values = Object.values(differing);
    return { offset, differing, total: values.length ? values.reduce((sum, value) => sum + value, 0) : Infinity };
  }).sort((a, b) => a.total - b.total);
  const best = ranked[0]!;
  // MAME's frame held, ours searched around it: the measure the old RAM
  // oracle reported, so its numbers carry over.
  const nearest: RamResult['nearest'] = {};
  for (const frame of compared) {
    const reference = mame.get(frame);
    if (!reference) continue;
    for (const offset of [...offsets].sort((a, b) => Math.abs(a) - Math.abs(b))) {
      const candidate = ours.get(frame - offset);
      if (!candidate) continue;
      const bytes = count(reference, candidate);
      if (nearest[frame] === undefined || bytes < nearest[frame].bytes) nearest[frame] = { offset, bytes };
    }
  }
  const result: RamResult = {
    offset: best.offset, bytesPerFrame: size, compared: Object.keys(best.differing).length, differing: best.differing, nearest,
  };
  const first = oursFrames.find(frame => (best.differing[frame] ?? 0) > 0);
  if (first !== undefined) {
    const left = mame.get(first + best.offset)!;
    const right = ours.get(first)!;
    const addresses: RamDifference[] = [];
    for (let index = 0; index < size && addresses.length < 64; index++) {
      if (left[index] === right[index]) continue;
      const { cpu, address } = addressAt(ram.cpus, index);
      addresses.push({ cpu, address: address.toString(16), mame: left[index]!, ours: right[index]! });
    }
    result.firstDivergence = { frame: first, mame: first + best.offset, bytes: best.differing[first]!, addresses };
  }
  return result;
}

export interface IoAccess {
  frame: number;
  kind: 'R' | 'W';
  tap: number;
  address: string;
  data: string;
  /** The emulated time of the access in seconds, from power-on. */
  time?: number;
}

export interface IoResult {
  mame: number;
  ours: number;
  /** The first access that differs, counting from the start of the window. */
  firstDivergence?: { index: number; mame?: IoAccess; ours?: IoAccess; before: IoAccess[] };
}

function readAccesses(path: string): IoAccess[] {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8').split('\n').filter(Boolean).map(line => {
    const [frame, kind, tap, address, data, time] = line.split(' ');
    return { frame: Number(frame), kind: kind as 'R' | 'W', tap: Number(tap), address: address!, data: data!,
      ...(time === undefined ? {} : { time: Number(time) }) };
  });
}

/** The two access sequences in order, frame labels aside: they drift with the offset. */
export function compareIo(dir: string): IoResult {
  const mame = readAccesses(join(dir, 'mame-io.txt'));
  const ours = readAccesses(join(dir, 'ours-io.txt'));
  const same = (left: IoAccess, right: IoAccess) =>
    left.kind === right.kind && left.tap === right.tap && left.address === right.address && left.data === right.data;
  const result: IoResult = { mame: mame.length, ours: ours.length };
  const length = Math.max(mame.length, ours.length);
  for (let index = 0; index < length; index++) {
    const left = mame[index];
    const right = ours[index];
    if (left && right && same(left, right)) continue;
    result.firstDivergence = {
      index,
      ...(left ? { mame: left } : {}),
      ...(right ? { ours: right } : {}),
      before: ours.slice(Math.max(0, index - 6), index),
    };
    break;
  }
  return result;
}

export interface InputsResult {
  /** Inputs on the timeline, and the frames both sides read them on. */
  inputs: number;
  frames: number;
  /** Frames on which some input read differently. */
  differing: number;
  firstDivergence?: { frame: number; port: string; mask: number; mame: number; ours: number };
}

/** `frame input bits` change lines -> each input's bits on every frame from 1 to `last`. */
function readReadings(path: string, inputs: number, last: number): (number | undefined)[][] {
  const values = Array.from({ length: inputs }, () => new Array<number | undefined>(last + 1).fill(undefined));
  const changes = existsSync(path) ? readFileSync(path, 'utf8').split('\n').filter(Boolean)
    .map(line => line.split(' ').map(Number) as [number, number, number]) : [];
  for (const [frame, input, value] of changes) {
    if (input >= inputs || frame > last) continue;
    values[input]!.fill(value, Math.max(1, frame));
  }
  return values;
}

/**
 * Whether MAME read each input as ours did, frame by frame: the check that
 * the timeline gave MAME what our side read, on the frame it read it (a
 * press's timing, a toggle's state, an analog value), before any picture is
 * blamed on the emulation.
 */
export function compareInputs(dir: string, inputs: readonly TimelineInput[], last: number): InputsResult | undefined {
  if (!inputs.length || !existsSync(join(dir, 'mame-inputs.txt'))) return undefined;
  const mame = readReadings(join(dir, 'mame-inputs.txt'), inputs.length, last);
  const ours = readReadings(join(dir, 'ours-inputs.txt'), inputs.length, last);
  const result: InputsResult = { inputs: inputs.length, frames: 0, differing: 0 };
  for (let frame = 1; frame <= last; frame++) {
    let compared = false;
    let differs = false;
    inputs.forEach((input, index) => {
      const left = mame[index]![frame];
      const right = ours[index]![frame];
      if (left === undefined || right === undefined) return;
      compared = true;
      if (left === right) return;
      differs = true;
      result.firstDivergence ??= { frame, port: input.port, mask: input.mask, mame: left, ours: right };
    });
    if (compared) result.frames++;
    if (differs) result.differing++;
  }
  return result;
}
