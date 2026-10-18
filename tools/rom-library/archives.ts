// Every file inside an input, however deeply it is packed.
//
// Collections arrive as archives of archives: a 900 MB zip of 29,000 zips, each
// holding a disk image; a solid 7z of a whole cartridge library. Nothing is
// unpacked to disk. A zip is read through its central directory one member at
// a time, a nested zip is opened in memory, and a 7z or rar is re-streamed by
// the system's bsdtar (libarchive) as a tar on stdout, which this parses as it
// arrives. Memory therefore stays at one member, not one collection.
//
// Members are reported in POOLS: the files that sit together in one archive.
// A MAME set is a pool -- a cartridge's chips are separate members of one zip
// -- so identification pools the chips before deciding a set is complete.

import { spawn } from 'node:child_process';
import { closeSync, mkdtempSync, openSync, readSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { crc32, inflateRawSync } from 'node:zlib';

export interface Blob {
  /** the member's own file name */
  name: string;
  /** where it came from: "Tapes.zip::Tapes/A/Arkanoid.zip::Arkanoid.tap" */
  path: string;
  bytes: Uint8Array;
}

export interface PoolVisitor {
  blob(blob: Blob, pool: string): Promise<void> | void;
  endPool(pool: string): Promise<void> | void;
  problem(path: string, message: string): void;
}

/** bsdtar ships with macOS and every libarchive install; it reads 7z and rar. */
const BSDTAR = process.env.MAMEKIT_BSDTAR ?? (process.platform === 'darwin' ? '/usr/bin/tar' : 'bsdtar');

export type ArchiveKind = 'zip' | 'libarchive' | null;

export function archiveKind(bytes: Uint8Array): ArchiveKind {
  if (bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b &&
    ((bytes[2] === 0x03 && bytes[3] === 0x04) || (bytes[2] === 0x05 && bytes[3] === 0x06))) return 'zip';
  // 7z and rar: the two other shapes download sites use.
  if (bytes.length >= 6 && bytes[0] === 0x37 && bytes[1] === 0x7a && bytes[2] === 0xbc && bytes[3] === 0xaf) return 'libarchive';
  if (bytes.length >= 7 && bytes[0] === 0x52 && bytes[1] === 0x61 && bytes[2] === 0x72 && bytes[3] === 0x21) return 'libarchive';
  return null;
}

/** Walk one input file on disk. */
export async function walkFile(file: string, path: string, visit: PoolVisitor): Promise<void> {
  const head = new Uint8Array(8);
  const fd = openSync(file, 'r');
  try {
    readSync(fd, head, 0, head.length, 0);
    const kind = archiveKind(head);
    if (kind === 'zip') {
      await walkZip(fileSource(fd, statSync(file).size), path, visit);
      return;
    }
    if (kind === 'libarchive') {
      await walkLibarchive(file, path, visit);
      return;
    }
  } finally {
    closeSync(fd);
  }
  await visit.blob({ name: path.split('/').pop() ?? path, path, bytes: new Uint8Array(readFileBytes(file)) }, path);
  await visit.endPool(path);
}

function readFileBytes(file: string): Buffer {
  const size = statSync(file).size;
  const out = Buffer.allocUnsafe(size);
  const fd = openSync(file, 'r');
  try {
    let at = 0;
    while (at < size) at += readSync(fd, out, at, size - at, at);
  } finally {
    closeSync(fd);
  }
  return out;
}

/** A member that is itself an archive opens as its own pool. */
async function walkMember(name: string, path: string, bytes: Uint8Array, pool: string, visit: PoolVisitor): Promise<void> {
  const kind = archiveKind(bytes);
  if (kind === 'zip') {
    await walkZip(bufferSource(bytes), path, visit);
  } else if (kind === 'libarchive') {
    // libarchive's 7z reader seeks, so a nested 7z goes through a temp file.
    const dir = mkdtempSync(join(tmpdir(), 'rom-library-'));
    try {
      const temp = join(dir, 'nested');
      writeFileSync(temp, bytes);
      await walkLibarchive(temp, path, visit);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  } else if (bytes.length) {
    await visit.blob({ name, path, bytes }, pool);
  }
}

// --- zip ----------------------------------------------------------------------

interface ByteSource {
  size: number;
  read(offset: number, length: number): Uint8Array;
}

function bufferSource(bytes: Uint8Array): ByteSource {
  return { size: bytes.length, read: (offset, length) => bytes.subarray(offset, offset + length) };
}

function fileSource(fd: number, size: number): ByteSource {
  return {
    size,
    read(offset, length) {
      const out = Buffer.allocUnsafe(length);
      let at = 0;
      while (at < length) {
        const n = readSync(fd, out, at, length - at, offset + at);
        if (!n) break;
        at += n;
      }
      return out.subarray(0, at);
    },
  };
}

export interface ZipMember {
  name: string;
  method: number;
  flags: number;
  crc: number;
  compressedSize: number;
  size: number;
  localOffset: number;
}

const u16 = (b: Uint8Array, at: number) => b[at]! | (b[at + 1]! << 8);
const u32 = (b: Uint8Array, at: number) => (b[at]! | (b[at + 1]! << 8) | (b[at + 2]! << 16) | (b[at + 3]! << 24)) >>> 0;
const u64 = (b: Uint8Array, at: number) => u32(b, at) + u32(b, at + 4) * 0x1_0000_0000;

/** The central directory, zip64 included: collections past 4 GB or 65,535 files need it. */
export function zipMembers(source: ByteSource): ZipMember[] {
  const tailLength = Math.min(source.size, 22 + 0xffff);
  const tail = source.read(source.size - tailLength, tailLength);
  let eocd = -1;
  for (let i = tail.length - 22; i >= 0; i--) {
    if (u32(tail, i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('not a zip (no end of central directory)');
  let count = u16(tail, eocd + 10);
  let directorySize = u32(tail, eocd + 12);
  let directoryOffset = u32(tail, eocd + 16);
  if (count === 0xffff || directorySize === 0xffffffff || directoryOffset === 0xffffffff) {
    const locator = eocd - 20;
    if (locator >= 0 && u32(tail, locator) === 0x07064b50) {
      const record = source.read(u64(tail, locator + 8), 56);
      if (u32(record, 0) === 0x06064b50) {
        count = u64(record, 32);
        directorySize = u64(record, 40);
        directoryOffset = u64(record, 48);
      }
    }
  }
  const directory = source.read(directoryOffset, directorySize);
  const decoder = new TextDecoder('utf-8');
  const members: ZipMember[] = [];
  let at = 0;
  for (let i = 0; i < count && at + 46 <= directory.length; i++) {
    if (u32(directory, at) !== 0x02014b50) throw new Error('bad central directory');
    const nameLength = u16(directory, at + 28);
    const extraLength = u16(directory, at + 30);
    const commentLength = u16(directory, at + 32);
    const member: ZipMember = {
      name: decoder.decode(directory.subarray(at + 46, at + 46 + nameLength)),
      flags: u16(directory, at + 8),
      method: u16(directory, at + 10),
      crc: u32(directory, at + 16),
      compressedSize: u32(directory, at + 20),
      size: u32(directory, at + 24),
      localOffset: u32(directory, at + 42),
    };
    // zip64 extra field: the 8-byte values that did not fit, in this order.
    const extra = directory.subarray(at + 46 + nameLength, at + 46 + nameLength + extraLength);
    for (let x = 0; x + 4 <= extra.length;) {
      const id = u16(extra, x);
      const length = u16(extra, x + 2);
      if (id === 0x0001) {
        let field = x + 4;
        if (member.size === 0xffffffff) { member.size = u64(extra, field); field += 8; }
        if (member.compressedSize === 0xffffffff) { member.compressedSize = u64(extra, field); field += 8; }
        if (member.localOffset === 0xffffffff) member.localOffset = u64(extra, field);
      }
      x += 4 + length;
    }
    members.push(member);
    at += 46 + nameLength + extraLength + commentLength;
  }
  return members;
}

export function readZipMember(source: ByteSource, member: ZipMember): Uint8Array {
  if (member.flags & 1) throw new Error('encrypted');
  const local = source.read(member.localOffset, 30);
  if (u32(local, 0) !== 0x04034b50) throw new Error('bad local header');
  const start = member.localOffset + 30 + u16(local, 26) + u16(local, 28);
  const raw = source.read(start, member.compressedSize);
  let bytes: Uint8Array;
  if (member.method === 0) bytes = raw;
  else if (member.method === 8) bytes = inflateRawSync(raw);
  else throw new Error(`compression method ${member.method} is not supported`);
  if (bytes.length !== member.size) throw new Error('size mismatch');
  if (crc32(bytes) !== member.crc) throw new Error('CRC mismatch (corrupt archive?)');
  return bytes;
}

/** Every file member of an in-memory zip, by name. */
export function readZipBytes(bytes: Uint8Array): Map<string, Uint8Array> {
  const source = bufferSource(bytes);
  const out = new Map<string, Uint8Array>();
  for (const member of zipMembers(source)) {
    if (!member.name.endsWith('/')) out.set(member.name, readZipMember(source, member));
  }
  return out;
}

async function walkZip(source: ByteSource, path: string, visit: PoolVisitor): Promise<void> {
  let members: ZipMember[];
  try {
    members = zipMembers(source);
  } catch (error) {
    visit.problem(path, (error as Error).message);
    return;
  }
  for (const member of members) {
    if (member.name.endsWith('/')) continue;
    const memberPath = `${path}::${member.name}`;
    let bytes: Uint8Array;
    try {
      bytes = readZipMember(source, member);
    } catch (error) {
      visit.problem(memberPath, (error as Error).message);
      continue;
    }
    await walkMember(member.name.split('/').pop() ?? member.name, memberPath, bytes, path, visit);
  }
  await visit.endPool(path);
}

// --- 7z / rar through bsdtar ----------------------------------------------------

/** Bytes queued from a stream, consumed from the front in exact amounts. */
class ByteQueue {
  private chunks: Buffer[] = [];
  length = 0;

  push(chunk: Buffer): void {
    this.chunks.push(chunk);
    this.length += chunk.length;
  }

  take(n: number): Buffer {
    const out = Buffer.allocUnsafe(n);
    let at = 0;
    while (at < n) {
      const head = this.chunks[0]!;
      const want = n - at;
      if (head.length <= want) {
        head.copy(out, at);
        at += head.length;
        this.chunks.shift();
      } else {
        head.copy(out, at, 0, want);
        this.chunks[0] = head.subarray(want);
        at += want;
      }
    }
    this.length -= n;
    return out;
  }
}

function tarString(block: Buffer, at: number, length: number): string {
  const field = block.subarray(at, at + length);
  const end = field.indexOf(0);
  return field.subarray(0, end < 0 ? length : end).toString('utf8');
}

function tarSize(block: Buffer): number {
  // base-256 when the high bit is set, octal text otherwise
  if (block[124]! & 0x80) {
    let value = 0;
    for (let i = 125; i < 136; i++) value = value * 256 + block[i]!;
    return value;
  }
  return parseInt(tarString(block, 124, 12).trim() || '0', 8);
}

/** The pax records that rename the next entry (`path=` / `linkpath=`). */
function paxPath(data: Buffer): string | undefined {
  let path: string | undefined;
  let at = 0;
  while (at < data.length) {
    const space = data.indexOf(0x20, at);
    if (space < 0) break;
    const length = parseInt(data.subarray(at, space).toString('ascii'), 10);
    if (!length) break;
    const record = data.subarray(space + 1, at + length - 1).toString('utf8');
    if (record.startsWith('path=')) path = record.slice(5);
    at += length;
  }
  return path;
}

async function walkLibarchive(file: string, path: string, visit: PoolVisitor): Promise<void> {
  // `-c @archive` re-writes any archive libarchive can read as a tar stream.
  const child = spawn(BSDTAR, ['-c', '-f', '-', '--format', 'pax', `@${file}`], { stdio: ['ignore', 'pipe', 'pipe'] });
  let stderr = '';
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', chunk => { stderr += chunk; });
  const exited = new Promise<number | null>(resolve => {
    child.once('error', error => { stderr += error.message; resolve(-1); });
    child.once('close', code => resolve(code));
  });

  const queue = new ByteQueue();
  let header: Buffer | null = null;
  let nextName: string | undefined;
  let done = false;
  for await (const chunk of child.stdout as AsyncIterable<Buffer>) {
    if (done) continue;
    queue.push(chunk);
    while (!done) {
      if (!header) {
        if (queue.length < 512) break;
        header = queue.take(512);
        if (header.every(byte => byte === 0)) { done = true; break; }
      }
      const size = tarSize(header);
      const padded = Math.ceil(size / 512) * 512;
      if (queue.length < padded) break;
      const data = queue.take(padded).subarray(0, size);
      const type = String.fromCharCode(header[156]!);
      const block = header;
      header = null;
      if (type === 'x') { nextName = paxPath(data) ?? nextName; continue; }
      if (type === 'L') { nextName = data.toString('utf8').replace(/\0+$/, ''); continue; }
      if (type === 'g') continue;
      const prefix = tarString(block, 345, 155);
      const name = nextName ?? (prefix ? `${prefix}/${tarString(block, 0, 100)}` : tarString(block, 0, 100));
      nextName = undefined;
      if (type !== '0' && type !== '\0' && type !== '7') continue;
      await walkMember(name.split('/').pop() ?? name, `${path}::${name}`, new Uint8Array(data), path, visit);
    }
  }
  const code = await exited;
  if (code !== 0) visit.problem(path, `bsdtar could not read it: ${stderr.trim() || `exit ${code}`}`);
  await visit.endPool(path);
}
