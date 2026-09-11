import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  listXmlOracle,
  parseBinaryVersion,
  parseListXmlMachines,
  parseSourceVersion,
} from './listxml.ts';

// --- the machine element, as MAME writes it -------------------------------

const dump = `<?xml version="1.0"?>
<mame build="0.289 (mame0289)" debug="no" mameconfig="10">
\t<machine name="pacman" sourcefile="pacman/pacman.cpp" cloneof="puckman" romof="puckman">
\t\t<description>Pac-Man (Midway)</description>
\t\t<year>1980</year>
\t\t<manufacturer>Namco (Midway license)</manufacturer>
\t\t<rom name="pacman.6e" size="4096" crc="C1E6AB10" region="maincpu" offset="0"/>
\t\t<rom name="82s126.4a" merge="pm1-4.4a" size="256" crc="3eb3a8e4" region="proms" offset="20"/>
\t\t<rom name="alt.bin" bios="euro" size="128" crc="deadbeef" region="mainbios" offset="0"/>
\t\t<rom name="undumped.7f" size="32" region="proms" offset="100" status="nodump"/>
\t\t<chip type="cpu" tag="maincpu" name="Zilog Z80" clock="3072000"/>
\t\t<chip type="audio" tag="namco" name="Namco WSG" clock="96000"/>
\t\t<display tag="screen" type="raster" rotate="90" width="288" height="224" refresh="60.606061" htotal="384" vtotal="264" vbend="0" vbstart="224" />
\t</machine>
\t<machine name="z80" sourcefile="cpu/z80/z80.cpp" isdevice="yes" runnable="no">
\t\t<description>Zilog Z80</description>
\t</machine>
</mame>`;

const machines = parseListXmlMachines(dump);
assert.equal(machines.length, 2, 'both machine elements are read');

const pacman = machines[0];
assert.equal(pacman.name, 'pacman');
assert.equal(pacman.sourcefile, 'pacman/pacman.cpp');
assert.equal(pacman.cloneof, 'puckman');
assert.equal(pacman.isdevice, false);
assert.equal(pacman.description, 'Pac-Man (Midway)');
assert.equal(pacman.year, '1980');
assert.equal(pacman.manufacturer, 'Namco (Midway license)');

// Devices ride along in every dump and must stay distinguishable.
assert.equal(machines[1].isdevice, true);

// ROM offsets are hex in the XML; ours are decimal everywhere else.
assert.deepEqual(pacman.roms[0], {
  name: 'pacman.6e',
  size: 4096,
  region: 'maincpu',
  offset: 0,
  crc: 'c1e6ab10',
});
assert.equal(pacman.roms[1].offset, 0x20, 'offset 20 is hex');
assert.equal(pacman.roms[1].merge, 'pm1-4.4a');
assert.equal(pacman.roms[2].bios, 'euro', 'BIOS alternatives are marked');
assert.equal(pacman.roms[3].crc, undefined, 'an undumped chip has no CRC');
assert.equal(pacman.roms[3].status, 'nodump');

assert.deepEqual(pacman.chips, [
  { type: 'cpu', tag: 'maincpu', name: 'Zilog Z80', clock: 3072000 },
  { type: 'audio', tag: 'namco', name: 'Namco WSG', clock: 96000 },
]);

assert.deepEqual(pacman.displays, [{
  tag: 'screen',
  type: 'raster',
  rotate: 90,
  width: 288,
  height: 224,
  refresh: 60.606061,
  htotal: 384,
  vtotal: 264,
  vbstart: 224,
  vbend: 0,
}]);

// --- entities, because descriptions carry them ----------------------------

const entities = parseListXmlMachines(
  '<machine name="x"><description>Bally &amp; Midway &quot;Special&quot;</description></machine>',
);
assert.equal(entities[0].description, 'Bally & Midway "Special"');

// --- versions -------------------------------------------------------------

assert.equal(parseBinaryVersion('0.289 (mame0289)\n'), '0.289');
assert.equal(parseBinaryVersion('0.288 (unknown)'), '0.288');
assert.equal(parseBinaryVersion('not a version'), undefined);
assert.equal(
  parseSourceVersion('\t@echo \'#define BARE_BUILD_VERSION "0.289"\' > $@\n'),
  '0.289',
);
assert.equal(parseSourceVersion('nothing here'), undefined);

// --- the oracle refuses rather than guessing ------------------------------

const fakeRoot = mkdtempSync(join(tmpdir(), 'mamekit-listxml-'));
writeFileSync(join(fakeRoot, 'makefile'), '@echo \'#define BARE_BUILD_VERSION "0.289"\'');

const missing = listXmlOracle(fakeRoot, join(fakeRoot, 'no-such-mame'));
assert.equal(missing.binary, undefined);
assert.match(missing.reason ?? '', /no MAME binary/);

// A stub binary reporting a different release must be refused: its answers
// describe a different MAME, so every difference it reports is noise.
const stub = join(fakeRoot, 'mame-stub');
writeFileSync(stub, '#!/bin/sh\necho "0.288 (unknown)"\n', { mode: 0o755 });
const mismatched = listXmlOracle(fakeRoot, stub);
assert.equal(mismatched.binary, undefined, 'a mismatched binary is not usable');
assert.match(mismatched.reason ?? '', /binary is 0\.288 but the source checkout is 0\.289/);

const matching = join(fakeRoot, 'mame-0289');
writeFileSync(matching, '#!/bin/sh\necho "0.289 (mame0289)"\n', { mode: 0o755 });
const ok = listXmlOracle(fakeRoot, matching);
assert.equal(ok.binary, matching);
assert.equal(ok.version, '0.289');
assert.equal(ok.reason, undefined);

// A checkout with no makefile cannot be compared against anything.
const noSource = mkdtempSync(join(tmpdir(), 'mamekit-listxml-src-'));
assert.match(listXmlOracle(noSource, matching).reason ?? '', /BARE_BUILD_VERSION/);

console.log('listxml.spec: ok');
