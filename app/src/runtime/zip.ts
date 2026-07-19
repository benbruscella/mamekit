// Minimal ZIP reader — no libraries. Handles stored (0) and deflate (8)
// entries; inflation uses the browser-native DecompressionStream.

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
      bytes = await inflateRaw(raw);
    } else {
      throw new Error(`unsupported compression method ${e.method} for ${e.name}`);
    }
    if (bytes.length !== e.size) throw new Error(`size mismatch for ${e.name}`);
    if (crc32(bytes) !== e.crc32) throw new Error(`CRC mismatch for ${e.name} (corrupt zip?)`);
    out.set(e.name.toLowerCase(), bytes);
  }
  return out;
}

async function inflateRaw(compressed: Uint8Array): Promise<Uint8Array> {
  const ds = new DecompressionStream('deflate-raw');
  const stream = new Blob([compressed as BlobPart]).stream().pipeThrough(ds);
  const buf = await new Response(stream).arrayBuffer();
  return new Uint8Array(buf);
}

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
