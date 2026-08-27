import assert from 'node:assert/strict';
import { deviceConfiguredScreen } from './screen-config.ts';
import { indexMameHardware } from './hardware.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
// Indexing walks the whole MAME device tree, so the spec shares one index
// across its cases rather than rebuilding it for each.
const hardware = indexMameHardware(mameSrc);

// coleco.cpp declares `SCREEN(config, "screen")` and nothing else: the VDP
// fills the geometry in from device_config_complete(). The numbers below are
// MAME's, computed by running the device's own lowered IR -- not transcribed.
const ntsc = deviceConfiguredScreen(mameSrc, 'TMS9928A', 10_738_635, hardware);
assert.ok(ntsc, 'the TMS9928A must configure the screen it is given');
assert.deepEqual(ntsc.raw, {
  pixclock: 5_369_317, // XTAL / 2
  htotal: 342,
  hbend: 25,           // HORZ_DISPLAY_START - 12
  hbstart: 305,        // HORZ_DISPLAY_START + 256 + 12
  vtotal: 262,         // TOTAL_VERT_NTSC
  vbend: 28,           // VERT_DISPLAY_START_NTSC - 12
  vbstart: 244,        // VERT_DISPLAY_START_NTSC + 192 + 12
});
assert.equal(Math.round(ntsc.raw.vbstart - ntsc.raw.vbend), 216, 'visible height');
assert.equal(ntsc.raw.hbstart - ntsc.raw.hbend, 280, 'visible width');

// The device installs its own update, so the driver names no screen handler.
assert.equal(ntsc.screenUpdate, 'screen_update');

// The 50 Hz sibling picks the other branch of the same source `if`, entirely
// from the constructor flag. This is what makes the capability reusable for
// the PAL consoles rather than specific to the NTSC ColecoVision.
const pal = deviceConfiguredScreen(mameSrc, 'TMS9929A', 10_738_635, hardware);
assert.ok(pal, 'the TMS9929A must configure its screen too');
assert.equal(pal.raw.vtotal, 313, 'TOTAL_VERT_PAL');
assert.equal(pal.raw.vbend, 52, 'VERT_DISPLAY_START_PAL - 12');
assert.equal(pal.raw.vbstart, 268, 'VERT_DISPLAY_START_PAL + 192 + 12');
assert.equal(pal.raw.htotal, ntsc.raw.htotal, 'both share the horizontal timing');

// A device that configures no screen must report nothing rather than guess.
assert.equal(deviceConfiguredScreen(mameSrc, 'LS259', 0, hardware), undefined);

console.log('screen-config.spec: device-configured NTSC and PAL screen geometry passed');
