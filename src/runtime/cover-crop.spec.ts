import assert from 'node:assert/strict';
import { findDarkCoverCrop, fitCoverCropAspect } from './cover-crop.ts';

function image(width: number, height: number, color = 0): Uint8ClampedArray {
  const pixels = new Uint8ClampedArray(width * height * 4);
  for (let offset = 0; offset < pixels.length; offset += 4) {
    pixels[offset] = color;
    pixels[offset + 1] = color;
    pixels[offset + 2] = color;
    pixels[offset + 3] = 255;
  }
  return pixels;
}

function fill(
  pixels: Uint8ClampedArray,
  width: number,
  x: number,
  y: number,
  w: number,
  h: number,
  color: number,
): void {
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      const offset = (yy * width + xx) * 4;
      pixels[offset] = color;
      pixels[offset + 1] = color;
      pixels[offset + 2] = color;
    }
  }
}

const bordered = image(100, 120);
fill(bordered, 100, 15, 20, 70, 80, 240);
assert.deepEqual(findDarkCoverCrop(bordered, 100, 120), {
  x: 13,
  y: 18,
  width: 74,
  height: 84,
});

const edgeArtwork = image(100, 120);
fill(edgeArtwork, 100, 0, 0, 100, 120, 180);
assert.equal(findDarkCoverCrop(edgeArtwork, 100, 120), undefined);

const tinyMatte = image(100, 120);
fill(tinyMatte, 100, 2, 2, 96, 116, 240);
assert.equal(findDarkCoverCrop(tinyMatte, 100, 120), undefined);

assert.deepEqual(
  fitCoverCropAspect({ x: 20, y: 15, width: 60, height: 90 }, 100, 120, 0.75),
  { x: 16.25, y: 15, width: 67.5, height: 90 },
);
assert.deepEqual(
  fitCoverCropAspect({ x: 10, y: 25, width: 80, height: 70 }, 100, 120, 0.75),
  { x: 10, y: 6.666666666666664, width: 80, height: 106.66666666666667 },
);

console.log('cover-crop.spec: conservative dark matte detection passed');
