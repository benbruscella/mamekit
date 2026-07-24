import assert from 'node:assert/strict';
import { crc32, readZip } from './zip.ts';

function storedZip(name: string, contents: Uint8Array): Uint8Array {
  const encodedName = new TextEncoder().encode(name);
  const localSize = 30 + encodedName.length + contents.length;
  const centralSize = 46 + encodedName.length;
  const bytes = new Uint8Array(localSize + centralSize + 22);
  const view = new DataView(bytes.buffer);
  const crc = crc32(contents);

  view.setUint32(0, 0x04034b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(8, 0, true);
  view.setUint32(14, crc, true);
  view.setUint32(18, contents.length, true);
  view.setUint32(22, contents.length, true);
  view.setUint16(26, encodedName.length, true);
  bytes.set(encodedName, 30);
  bytes.set(contents, 30 + encodedName.length);

  const central = localSize;
  view.setUint32(central, 0x02014b50, true);
  view.setUint16(central + 4, 20, true);
  view.setUint16(central + 6, 20, true);
  view.setUint16(central + 10, 0, true);
  view.setUint32(central + 16, crc, true);
  view.setUint32(central + 20, contents.length, true);
  view.setUint32(central + 24, contents.length, true);
  view.setUint16(central + 28, encodedName.length, true);
  view.setUint32(central + 42, 0, true);
  bytes.set(encodedName, central + 46);

  const eocd = central + centralSize;
  view.setUint32(eocd, 0x06054b50, true);
  view.setUint16(eocd + 8, 1, true);
  view.setUint16(eocd + 10, 1, true);
  view.setUint32(eocd + 12, centralSize, true);
  view.setUint32(eocd + 16, central, true);
  return bytes;
}

assert.equal(crc32(new TextEncoder().encode('123456789')), 0xcbf43926);
const archive = storedZip('ROMS/JUNO.BIN', Uint8Array.of(1, 2, 3, 4));
const nameLength = new TextEncoder().encode('ROMS/JUNO.BIN').length;
const files = await readZip(archive);
assert.deepEqual([...files.keys()], ['roms/juno.bin']);
assert.deepEqual([...files.get('roms/juno.bin')!], [1, 2, 3, 4]);

const corrupt = archive.slice();
corrupt[30 + nameLength] ^= 0xff;
await assert.rejects(readZip(corrupt), /CRC mismatch/);
await assert.rejects(readZip(Uint8Array.of(1, 2, 3)), /no end-of-central-directory/);

const unsupported = archive.slice();
const central = 30 + nameLength + 4;
new DataView(unsupported.buffer).setUint16(central + 10, 99, true);
await assert.rejects(readZip(unsupported), /unsupported compression method 99/);

console.log('zip.spec: CRC, stored entries, normalization and corruption checks passed');
