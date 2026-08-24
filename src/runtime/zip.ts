// Minimal ZIP reader — no libraries. Handles stored (0) and deflate (8)
// entries; inflation is the RFC 1951 decoder below.

interface ZipEntry {
  name: string;
  method: number;
  compressedSize: number;
  size: number;
  crc32: number;
  headerOffset: number;
}

export async function readZip(data: Uint8Array): Promise<Map<string, Uint8Array>> {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);

  // find end-of-central-directory (scan back over possible zip comment)
  let eocd = -1;
  for (let i = data.length - 22; i >= Math.max(0, data.length - 22 - 0xffff); i--) {
    if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('not a zip file (no end-of-central-directory)');
  const count = view.getUint16(eocd + 10, true);
  let off = view.getUint32(eocd + 16, true);

  const entries: ZipEntry[] = [];
  for (let i = 0; i < count; i++) {
    if (view.getUint32(off, true) !== 0x02014b50) throw new Error('bad central directory');
    const nameLen = view.getUint16(off + 28, true);
    const extraLen = view.getUint16(off + 30, true);
    const commentLen = view.getUint16(off + 32, true);
    entries.push({
      method: view.getUint16(off + 10, true),
      crc32: view.getUint32(off + 16, true),
      compressedSize: view.getUint32(off + 20, true),
      size: view.getUint32(off + 24, true),
      headerOffset: view.getUint32(off + 42, true),
      name: new TextDecoder().decode(data.subarray(off + 46, off + 46 + nameLen)),
    });
    off += 46 + nameLen + extraLen + commentLen;
  }

  const out = new Map<string, Uint8Array>();
  for (const e of entries) {
    if (e.name.endsWith('/')) continue;
    const lh = e.headerOffset;
    if (view.getUint32(lh, true) !== 0x04034b50) throw new Error(`bad local header for ${e.name}`);
    const nameLen = view.getUint16(lh + 26, true);
    const extraLen = view.getUint16(lh + 28, true);
    const start = lh + 30 + nameLen + extraLen;
    const raw = data.subarray(start, start + e.compressedSize);
    let bytes: Uint8Array;
    if (e.method === 0) {
      bytes = raw.slice();
    } else if (e.method === 8) {
      bytes = inflateRaw(raw);
    } else {
      throw new Error(`unsupported compression method ${e.method} for ${e.name}`);
    }
    if (bytes.length !== e.size) throw new Error(`size mismatch for ${e.name}`);
    if (crc32(bytes) !== e.crc32) throw new Error(`CRC mismatch for ${e.name} (corrupt zip?)`);
    out.set(e.name.toLowerCase(), bytes);
  }
  return out;
}

/**
 * Raw DEFLATE (RFC 1951), decoded here rather than through
 * `DecompressionStream`.
 *
 * The platform decoder routes every entry through zlib on a worker thread and
 * resolves it as a microtask; on Node 24 that path segfaults for roughly one
 * acceptance run in twenty, dying inside the inflate callback before a machine
 * emits its first frame. It also forced the whole reader to be async for work
 * that is a few milliseconds of straight-line code. This is synchronous, has
 * no thread pool and no platform divergence, and every entry it produces is
 * still checked against the zip's own CRC and length before it is accepted.
 */
function inflateRaw(compressed: Uint8Array): Uint8Array {
  let bitPos = 0;
  const bit = (): number => {
    const value = (compressed[bitPos >>> 3]! >>> (bitPos & 7)) & 1;
    bitPos++;
    return value;
  };
  const bits = (count: number): number => {
    let value = 0;
    for (let index = 0; index < count; index++) value |= bit() << index;
    return value;
  };

  let out = new Uint8Array(Math.max(1024, compressed.length * 4));
  let length = 0;
  const push = (byte: number): void => {
    if (length === out.length) {
      const grown = new Uint8Array(out.length * 2);
      grown.set(out);
      out = grown;
    }
    out[length++] = byte;
  };

  for (;;) {
    const final = bit();
    const type = bits(2);
    if (type === 0) {
      // Stored: skip to the byte boundary, then LEN/NLEN and the literal run.
      bitPos = (bitPos + 7) & ~7;
      const at = bitPos >>> 3;
      const storedLength = compressed[at]! | (compressed[at + 1]! << 8);
      bitPos = (at + 4) << 3;
      for (let index = 0; index < storedLength; index++) push(compressed[(bitPos >>> 3) + index]!);
      bitPos += storedLength << 3;
    } else if (type === 1 || type === 2) {
      let literals: Huffman;
      let distances: Huffman;
      if (type === 1) {
        literals = FIXED_LITERALS ??= huffman(fixedLiteralLengths(), 288);
        distances = FIXED_DISTANCES ??= huffman(new Uint8Array(30).fill(5), 30);
      } else {
        const literalCount = bits(5) + 257;
        const distanceCount = bits(5) + 1;
        const codeCount = bits(4) + 4;
        const codeLengths = new Uint8Array(19);
        for (let index = 0; index < codeCount; index++) {
          codeLengths[CODE_LENGTH_ORDER[index]!] = bits(3);
        }
        const codes = huffman(codeLengths, 19);
        const lengths = new Uint8Array(literalCount + distanceCount);
        for (let index = 0; index < lengths.length;) {
          const symbol = decode(codes);
          if (symbol < 16) lengths[index++] = symbol;
          else if (symbol === 16) {
            const previous = lengths[index - 1]!;
            for (let repeat = bits(2) + 3; repeat > 0; repeat--) lengths[index++] = previous;
          } else if (symbol === 17) {
            for (let repeat = bits(3) + 3; repeat > 0; repeat--) lengths[index++] = 0;
          } else {
            for (let repeat = bits(7) + 11; repeat > 0; repeat--) lengths[index++] = 0;
          }
        }
        literals = huffman(lengths.subarray(0, literalCount), literalCount);
        distances = huffman(lengths.subarray(literalCount), distanceCount);
      }
      for (;;) {
        const symbol = decode(literals);
        if (symbol === 256) break;
        if (symbol < 256) { push(symbol); continue; }
        const lengthIndex = symbol - 257;
        const copyLength = LENGTH_BASE[lengthIndex]! + bits(LENGTH_EXTRA[lengthIndex]!);
        const distanceIndex = decode(distances);
        const distance = DISTANCE_BASE[distanceIndex]! + bits(DISTANCE_EXTRA[distanceIndex]!);
        for (let index = 0; index < copyLength; index++) push(out[length - distance]!);
      }
    } else {
      throw new Error(`inflate: reserved block type ${type}`);
    }
    if (final) break;
  }
  return out.subarray(0, length);

  function decode(table: Huffman): number {
    let code = 0;
    let first = 0;
    let index = 0;
    for (let bitLength = 1; bitLength <= 15; bitLength++) {
      code |= bit();
      const count = table.counts[bitLength]!;
      if (code - first < count) return table.symbols[index + (code - first)]!;
      index += count;
      first = (first + count) << 1;
      code <<= 1;
    }
    throw new Error('inflate: oversubscribed Huffman code');
  }
}

/** A canonical Huffman table as puff builds it: per-length counts plus symbols. */
interface Huffman {
  counts: Int32Array;
  symbols: Int32Array;
}

function huffman(lengths: Uint8Array, count: number): Huffman {
  const counts = new Int32Array(16);
  for (let index = 0; index < count; index++) counts[lengths[index]!]!++;
  counts[0] = 0;
  const offsets = new Int32Array(16);
  for (let bitLength = 1; bitLength < 16; bitLength++) {
    offsets[bitLength] = offsets[bitLength - 1]! + counts[bitLength - 1]!;
  }
  const symbols = new Int32Array(count);
  for (let index = 0; index < count; index++) {
    if (lengths[index]) symbols[offsets[lengths[index]!]!++] = index;
  }
  return { counts, symbols };
}

function fixedLiteralLengths(): Uint8Array {
  const lengths = new Uint8Array(288);
  lengths.fill(8, 0, 144);
  lengths.fill(9, 144, 256);
  lengths.fill(7, 256, 280);
  lengths.fill(8, 280, 288);
  return lengths;
}

let FIXED_LITERALS: Huffman | undefined;
let FIXED_DISTANCES: Huffman | undefined;

const CODE_LENGTH_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
const LENGTH_BASE = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258,
];
const LENGTH_EXTRA = [
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
  3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0,
];
const DISTANCE_BASE = [
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
];
const DISTANCE_EXTRA = [
  0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
  7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13,
];

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

export function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
