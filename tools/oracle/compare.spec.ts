import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
import { compareIo, comparePictures, compareRam, differingPixels, oursPicture, sideBySide, writePng } from './compare.ts';

const dir = mkdtempSync(join(tmpdir(), 'oracle-compare-'));
try {
  // A 3x2 native picture, pixel value = index, in canvas byte order.
  const native = new Uint8Array(3 * 2 * 4);
  for (let index = 0; index < 6; index++) native.set([index, 0, 0, 255], index * 4);
  writeFileSync(join(dir, 'ours-1.rgba'), native);
  const red = (path: string, width: number, height: number, rotate: number) =>
    [...oursPicture(path, width, height, rotate).rgb.filter((_, at) => at % 3 === 0)];
  // ROT90 turns the picture clockwise, as MAME presents a ROT90 board (Pac-Man).
  assert.deepEqual(red(join(dir, 'ours-1.rgba'), 3, 2, 90), [3, 0, 4, 1, 5, 2]);
  assert.deepEqual(red(join(dir, 'ours-1.rgba'), 3, 2, 180), [5, 4, 3, 2, 1, 0]);
  assert.deepEqual(red(join(dir, 'ours-1.rgba'), 3, 2, 270), [2, 5, 1, 4, 0, 3]);

  // MAME's rgb_t words, 0xAARRGGBB little-endian, against ours.
  const words = new Uint8Array(6 * 4);
  for (let index = 0; index < 6; index++) words.set([0, 0, index === 4 ? 9 : index, 255], index * 4);
  for (const frame of [1, 2]) writeFileSync(join(dir, `mame-${frame}.rgb`), words);
  writeFileSync(join(dir, 'mame-size.txt'), '3 2\n');
  const pictures = comparePictures(dir, [1], [0, 1], { width: 3, height: 2, rotate: 0 });
  assert.deepEqual(pictures.results, [{ frame: 1, mame: 1, pixels: 1 }]);
  assert.deepEqual(pictures.tied, [0, 1], 'two MAME frames fit as well; both are reported');
  assert.equal(differingPixels({ width: 1, height: 1, rgb: new Uint8Array(3) }, { width: 2, height: 1, rgb: new Uint8Array(6) }), undefined);

  // The side-by-side PNG is a valid 8-bit RGB image of all three panels.
  const both = sideBySide(pictures.pictures.get(1)!.mame!, pictures.pictures.get(1)!.ours!);
  assert.equal(both.width, 3 * 3 + 8);
  writePng(join(dir, 'out.png'), both);
  const png = readFileSync(join(dir, 'out.png'));
  assert.deepEqual([...png.subarray(1, 4)].map(byte => String.fromCharCode(byte)).join(''), 'PNG');
  assert.equal(png.readUInt32BE(16), both.width);
  const idat = png.indexOf('IDAT');
  assert.equal(inflateSync(png.subarray(idat + 4, idat + 4 + png.readUInt32BE(idat - 4))).length, (both.width * 3 + 1) * both.height);
  // Pixel 4 is row 1, column 1; the difference panel starts after two pictures and two gaps.
  const at = (1 * both.width + 3 + 4 + 3 + 4 + 1) * 3;
  assert.deepEqual([...both.rgb.subarray(at, at + 3)], [255, 0, 0], 'the differing pixel is red');

  // RAM: one 4-byte processor, frames 1..4 ours and 1..5 MAME; ours lags MAME by one.
  const ram = { cpus: [{ tag: 'maincpu', ranges: [[0x10, 0x13]] as [number, number][] }], from: 1, to: 4, every: 1 };
  const state = (frame: number) => [frame, frame, 7, frame === 3 ? 0 : 1];
  writeFileSync(join(dir, 'ours-ram.bin'), new Uint8Array([1, 2, 3, 4].flatMap(frame => state(frame - 1))));
  writeFileSync(join(dir, 'mame-ram.bin'), new Uint8Array([1, 2, 3, 4, 5].flatMap(state)));
  const ramResult = compareRam(dir, ram, [1, 2, 3, 4], [1, 2, 3, 4, 5], [-1, 0, 1], [3]);
  assert.equal(ramResult.offset, -1);
  assert.equal(ramResult.firstDivergence, undefined);
  // MAME's frame 3 is our frame 4.
  assert.deepEqual(ramResult.nearest, { 3: { offset: -1, bytes: 0 } });
  const aligned = compareRam(dir, ram, [1, 2, 3, 4], [1, 2, 3, 4, 5], [0], [4]);
  assert.deepEqual(aligned.firstDivergence?.addresses[0], { cpu: 'maincpu', address: '10', mame: 1, ours: 0 });

  // I/O: the first access that differs, frame labels aside.
  writeFileSync(join(dir, 'mame-io.txt'), '3 R 0 2002 80\n3 W 0 2000 10\n');
  writeFileSync(join(dir, 'ours-io.txt'), '4 R 0 2002 80\n4 R 0 2002 0\n');
  const io = compareIo(dir);
  assert.equal(io.firstDivergence?.index, 1);
  assert.equal(io.firstDivergence?.mame?.kind, 'W');
} finally {
  rmSync(dir, { recursive: true, force: true });
}

console.log('oracle compare.spec: ok');
