// The TMS9928A renders from its own MAME source.
//
// No ROM and no dist: the device is compiled out of src/devices/video/tms9928a.cpp,
// instantiated through the generic device runtime, and driven the way a Z80
// drives it -- register writes and VRAM writes through the two I/O ports. What
// comes back is the picture MAME's own per-scanline renderer produces.
//
// This is the gate for the capabilities the ColecoVision needed: the device's
// own VRAM address space, device_palette_interface pens, and the scanline
// timer's view of the beam.

import assert from 'node:assert/strict';
import { indexMameHardware } from '../../mame/hardware.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
} from '../../runtime/generated-device.ts';

const mameSource = process.env.MAME_SRC ??
  new URL('../../../../mame/', import.meta.url).pathname;
const definition = compileMameDevice(
  mameSource,
  indexMameHardware(mameSource).get('TMS9928A')!,
  'TMS9928A',
);

assert.equal(
  definition.summary.diagnostics,
  0,
  'every TMS9928A method must lower, the per-scanline renderer included',
);

const VTOTAL = 262;          // TOTAL_VERT_NTSC
const TOP_BORDER = 40;       // VERT_DISPLAY_START_NTSC
const XTAL = 10_738_635;

clearGeneratedDevices();
registerGeneratedDevice(definition);

/** The beam the device's line timer measures against, under the test's control. */
let beam = 0;
const vdp = createDevice('TMS9928A', {
  clock: XTAL,
  calls: {
    screen: () => ({
      vpos: () => beam,
      hpos: () => 0,
      height: () => VTOTAL,
      time_until_pos: () => 1 / (60 * VTOTAL),
      frame_number: () => 0,
    }),
    machine: () => ({ side_effects_disabled: () => 0 }),
  },
});
assert.ok(vdp, 'the generic device runtime must instantiate a TMS9928A');
vdp.call('set_vram_size', 0x4000); // coleco.cpp: vdp.set_vram_size(0x4000)

/** MAME's register-write protocol: value, then 0x80 | register. */
const writeRegister = (index: number, value: number): void => {
  vdp.invoke('write', 1, value);
  vdp.invoke('write', 1, 0x80 | index);
};
/** Point the address counter at `address` for writing, then store `value`. */
const writeVram = (address: number, value: number): void => {
  vdp.invoke('write', 1, address & 0xff);
  vdp.invoke('write', 1, 0x40 | ((address >> 8) & 0x3f));
  vdp.invoke('write', 0, value);
};
/** Draw one whole frame the way the line timer does, a scanline at a time. */
const drawFrame = (): void => {
  for (beam = 0; beam < VTOTAL; beam++) vdp.invoke('update_line', 0);
};
const bitmapRow = (line: number): number[] => {
  const bitmap = (vdp as unknown as { members: Record<string, {
    pixels: Uint32Array; bitmapWidth: number;
  }> }).members.m_tmpbmp!;
  const start = line * bitmap.bitmapWidth;
  return [...bitmap.pixels.slice(start, start + bitmap.bitmapWidth)];
};

// The device's own 16K VRAM space, off the CPU bus entirely. Setting a read
// address prefetches into the read-ahead latch, so the next read is the byte.
writeVram(0x1234, 0x5a);
vdp.invoke('write', 1, 0x34);
vdp.invoke('write', 1, 0x12); // neither bit 7 nor bit 6: set read address
assert.equal(vdp.invoke('read', 0), 0x5a, 'the VDP must own a working VRAM space');

// The address counter wraps at the configured 16K rather than running off the
// end of the space.
writeVram(0x3fff, 0x77);
assert.equal(
  (vdp as unknown as { members: Record<string, number> }).members.m_Addr,
  0,
  'the address counter must wrap at the configured VRAM size',
);

// Backdrop only: with the display enabled and register 7 set, every line of
// the frame is the backdrop colour. Pen 15 is white in the TMS9928A palette,
// which the device loads itself in device_start.
writeRegister(7, 0x0f);
writeRegister(1, 0xc0); // 16K, display enabled
drawFrame();
const backdrop = bitmapRow(TOP_BORDER + 96);
assert.equal(new Set(backdrop).size, 1, 'a blank display is one flat colour');
assert.equal(backdrop[0], 0xffffffff, 'pen 15 is white');

// A border line and an active line agree while the display is blank, and the
// palette is genuinely the device's: pen 1 is black.
writeRegister(7, 0x01);
drawFrame();
assert.equal(bitmapRow(TOP_BORDER + 96)[0], 0xff000000, 'pen 1 is black');
assert.equal(bitmapRow(2)[0], 0xff000000, 'the top border takes the backdrop too');

// Graphics mode I: one screen of a single character whose pattern is vertical
// stripes, coloured white on black. Every active line must then alternate.
writeRegister(2, 0x00); // name table    @ 0x0000
writeRegister(4, 0x01); // pattern table @ 0x0800
writeRegister(3, 0x0c); // colour table  @ 0x0300
writeRegister(0, 0x00); // graphics I
writeRegister(1, 0xc0);
for (let entry = 0; entry < 32 * 24; entry++) writeVram(entry, 0);
for (let row = 0; row < 8; row++) writeVram(0x0800 + row, 0xaa);
writeVram(0x0300, 0xf1); // foreground white, background black
drawFrame();

const active = bitmapRow(TOP_BORDER + 96);
const HORZ_DISPLAY_START = 37;
const pixels = active.slice(HORZ_DISPLAY_START, HORZ_DISPLAY_START + 8);
assert.deepEqual(
  pixels,
  [0xffffffff, 0xff000000, 0xffffffff, 0xff000000,
   0xffffffff, 0xff000000, 0xffffffff, 0xff000000],
  'pattern 0xaa must draw alternating foreground and background pixels',
);
assert.equal(
  active.slice(HORZ_DISPLAY_START, HORZ_DISPLAY_START + 256)
    .filter(pixel => pixel === 0xffffffff).length,
  128,
  'half of every active line is foreground',
);
assert.equal(active[0], 0xff000000, 'the left border stays the backdrop');

// Turning the display back off returns the whole frame to the backdrop, which
// is what a driver's blanking does between screens.
writeRegister(1, 0x80); // 16K, display disabled
drawFrame();
assert.equal(
  new Set(bitmapRow(TOP_BORDER + 96)).size,
  1,
  'a disabled display blanks the active area',
);

console.log('tms9928a.spec: source-derived VRAM space, palette and scanline renderer passed');
