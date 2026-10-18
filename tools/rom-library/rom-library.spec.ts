// The ROM library files by content and never deletes: identification, filing
// into both manifest shapes, and tidying, against a synthetic MAME tree.

import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { crc32 } from 'node:zlib';
import type { ShellConfig } from '../../src/runtime/shell.ts';
import { readZipBytes, walkFile, type Blob } from './archives.ts';
import { identifyBlob, isBlank, parseCrt, sha1 } from './identify.ts';
import { hex8, Library, writeZip } from './library.ts';
import { parseList } from './softlists.ts';
import type { Systems } from './systems.ts';
import { applyTidy, planTidy } from './tidy.ts';

const root = mkdtempSync(join(tmpdir(), 'rom-library-spec-'));
const mameSrc = join(root, 'mame');
const romsDir = join(root, 'roms');
mkdirSync(join(mameSrc, 'hash'), { recursive: true });
mkdirSync(romsDir);

const bytes = (length: number, seed: number) => Uint8Array.from({ length }, (_, i) => (i * 31 + seed * 7 + (i >> 5)) & 0xff);
const rom = (name: string, data: Uint8Array, offset = 0) =>
  `<rom name="${name}" size="${data.length}" crc="${hex8(crc32(data))}" sha1="${sha1(data)}" offset="0x${offset.toString(16)}"/>`;

// A console list: a one-chip cart, a two-chip cart whose second bank is blank
// (as MAME lists coleco:skiing), a clone sharing the first cart's dump, and a
// cart MAME marks unsupported.
const solo = bytes(4096, 1);
const twinLow = bytes(8192, 2);
const blankHigh = new Uint8Array(8192).fill(0xff);
const broken = bytes(2048, 3);
writeFileSync(join(mameSrc, 'hash', 'vcs.xml'), `<?xml version="1.0"?>
<softwarelist name="vcs" description="Test cartridges">
  <software name="solo"><description>Solo &amp; Friends</description><year>1982</year><publisher>Acme</publisher>
    <part name="cart" interface="vcs_cart"><feature name="slot" value="a26_4k"/>
      <dataarea name="rom" size="4096">${rom('solo &amp; friends.bin', solo)}</dataarea></part></software>
  <software name="soloa" cloneof="solo"><description>Solo (alt)</description><year>1982</year><publisher>Acme</publisher>
    <part name="cart" interface="vcs_cart"><dataarea name="rom" size="4096">${rom('solo alt.bin', solo)}</dataarea></part></software>
  <software name="twin"><description>Twin</description><year>1983</year><publisher>Acme</publisher>
    <part name="cart" interface="vcs_cart"><dataarea name="rom" size="16384">
      ${rom('twin.1', twinLow)}${rom('twin.2', blankHigh, 0x2000)}</dataarea></part></software>
  <software name="broken" supported="no"><description>Broken</description><year>1984</year><publisher>Acme</publisher>
    <part name="cart" interface="vcs_cart"><dataarea name="rom" size="2048">${rom('broken.bin', broken)}</dataarea></part></software>
</softwarelist>`);

// A computer tape list: one two-sided tape.
const sideA = bytes(3000, 4);
const sideB = bytes(3100, 5);
writeFileSync(join(mameSrc, 'hash', 'tapes.xml'), `<?xml version="1.0"?>
<softwarelist name="tapes" description="Test tapes">
  <software name="saga"><description>Saga</description><year>1985</year><publisher>Acme</publisher>
    <part name="cass1" interface="cbm_cass"><dataarea name="cass" size="3000">${rom('saga (side a).tap', sideA)}</dataarea></part>
    <part name="cass2" interface="cbm_cass"><dataarea name="cass" size="3100">${rom('saga (side b).tap', sideB)}</dataarea></part></software>
</softwarelist>`);

// --- parsing -------------------------------------------------------------------
const vcs = parseList(readFileSync(join(mameSrc, 'hash', 'vcs.xml'), 'utf8'));
assert.equal(vcs.byName.get('solo')!.description, 'Solo & Friends');
assert.equal(vcs.byName.get('solo')!.parts[0]!.areas[0]!.roms[0]!.name, 'solo & friends.bin', 'chip names are unescaped');
assert.equal(vcs.byName.get('solo')!.parts[0]!.features.slot, 'a26_4k');
assert.equal(vcs.byName.get('broken')!.supported, 'no');
assert.equal(vcs.byName.get('twin')!.parts[0]!.areas[0]!.roms[1]!.offset, 0x2000);

// --- systems over the synthetic tree ----------------------------------------------
const biosChip = bytes(1024, 6);
const consoleConfig = {
  game: 'vcs', family: 'vcs', dataPath: 'games/consoles/vcs',
  board: { cpus: [{ region: 'maincpu' }] },
  roms: [{ region: 'maincpu', size: 1024, loads: [{ file: 'vcs.rom', offset: 0, size: 1024, crc: hex8(crc32(biosChip)), alt: [] }] }],
  cart: { interface: 'vcs_cart', list: 'vcs', catalogUrl: 'softlist.json', slots: [], games: [], extensions: ['.bin', '.a26'] },
} as unknown as ShellConfig;
const systems: Systems = {
  systems: [
    { key: 'consoles/vcs', category: 'consoles', machines: [{ game: 'vcs', lifecycle: 'accepted', config: consoleConfig }], lists: ['vcs'] },
    { key: 'computers/micro', category: 'computers', machines: [{ game: 'micro', lifecycle: 'candidate' }], lists: ['tapes'] },
  ],
  parked: [],
  ungenerated: ['micro'],
};
const library = Library.forSystems({ romsDir, mameSrc, distDir: join(root, 'dist'), dryRun: false }, systems);
const blob = (name: string, data: Uint8Array): Blob => ({ name, path: `in::${name}`, bytes: data });

// --- identification ---------------------------------------------------------------
const soloHits = identifyBlob(blob('Solo (1982).a26', solo), library.identifier);
assert.deepEqual(soloHits.pieces.map(piece => piece.ref.entry.name).sort(), ['solo', 'soloa'], 'a dump names every entry it is');

// A flat 8K image of a cart whose second bank MAME lists as blank.
const twinHits = identifyBlob(blob('Twin.bin', twinLow), library.identifier);
assert.deepEqual(twinHits.pieces.map(piece => piece.ref.entry.name), ['twin']);

// A blank bank is evidence of nothing -- the C64 CRT that "matched" coleco:skiing.
assert.ok(isBlank(blankHigh));
assert.equal(identifyBlob(blob('blank.bin', blankHigh), library.identifier).pieces.length, 0);

// A D64 with its error table appended matches the image MAME lists without it.
const disk = bytes(174848, 7);
writeFileSync(join(mameSrc, 'hash', 'disks.xml'), `<softwarelist name="disks" description="d">
  <software name="adv"><description>Adv</description><year>1986</year><publisher>A</publisher>
    <part name="flop1" interface="floppy_5_25"><dataarea name="flop" size="174848">${rom('adv.d64', disk)}</dataarea></part></software></softwarelist>`);
const withErrors = new Uint8Array(175531);
withErrors.set(disk);
const diskLibrary = Library.forSystems({ romsDir, mameSrc, distDir: '', dryRun: true }, {
  systems: [{ key: 'computers/micro', category: 'computers', machines: [], lists: ['disks'] }], parked: [], ungenerated: [],
});
assert.equal(identifyBlob(blob('Adv.d64', withErrors), diskLibrary.identifier).pieces.length, 1);

// A CRT's CHIP packets are read out of the container.
const chip = bytes(0x2000, 8);
const crt = new Uint8Array(0x40 + 16 + chip.length);
crt.set(new TextEncoder().encode('C64 CARTRIDGE   '));
crt.set([0, 0, 0, 0x40], 0x10);
crt.set(new TextEncoder().encode('CHIP'), 0x40);
crt.set([0, 0, 0x20, 0x10, 0, 0, 0, 0, 0x80, 0x00, 0x20, 0x00], 0x44);
crt.set(chip, 0x50);
assert.deepEqual(parseCrt(crt)!.map(packet => [packet.address, packet.data.length]), [[0x8000, 0x2000]]);

// --- archives -----------------------------------------------------------------
// A collection: an outer zip holding a loose tape side and a nested zip with the other.
const inner = writeZip(new Map([['Saga B.tap', sideB]]));
const outer = writeZip(new Map([['Saga A.tap', sideA], ['nested/Saga B.zip', new Uint8Array(inner)], ['readme.txt', bytes(40, 9)]]));
assert.equal(readZipBytes(new Uint8Array(outer)).size, 3, 'writeZip round-trips');
const pools = new Map<string, string[]>();
const inbox = join(root, 'inbox');
mkdirSync(inbox);
writeFileSync(join(inbox, 'Saga.zip'), outer);
await walkFile(join(inbox, 'Saga.zip'), 'Saga.zip', {
  blob(found, pool) { pools.set(pool, [...(pools.get(pool) ?? []), found.name]); },
  endPool() {},
  problem(path, message) { assert.fail(`${path}: ${message}`); },
});
assert.deepEqual([...pools.entries()], [
  ['Saga.zip', ['Saga A.tap', 'readme.txt']],
  ['Saga.zip::nested/Saga B.zip', ['Saga B.tap']],
], 'a nested archive is its own pool');

// --- filing -------------------------------------------------------------------
const outcomes = library.filePool([...soloHits.pieces, ...twinHits.pieces], []);
assert.deepEqual(outcomes.map(outcome => `${outcome.name}:${outcome.verdict}`).sort(), ['solo:imported', 'soloa:imported', 'twin:imported']);
const twinZip = readZipBytes(readFileSync(join(romsDir, 'consoles/vcs/twin.zip')));
assert.deepEqual([...twinZip.keys()], ['twin.1', 'twin.2'], 'the listed blank bank is supplied');
assert.ok(isBlank(twinZip.get('twin.2')!));
assert.deepEqual([...readZipBytes(readFileSync(join(romsDir, 'consoles/vcs/solo.zip'))).keys()], ['solo & friends.bin']);
library.flush();
const carts = JSON.parse(readFileSync(join(romsDir, 'consoles/vcs/_manifest.json'), 'utf8')).carts;
assert.deepEqual(carts.map((row: { target: string; status: string }) => `${row.target}:${row.status}`).sort(),
  ['solo.zip:verified', 'soloa.zip:verified', 'twin.zip:verified'], 'console rows are what cartridge-catalog.ts reads');
assert.equal(library.filePool(soloHits.pieces, [])[0]!.verdict, 'duplicate');

// MAME-unsupported sets are reported, never filed.
const brokenHits = identifyBlob(blob('Broken.bin', broken), library.identifier);
assert.equal(library.filePool(brokenHits.pieces, [])[0]!.verdict, 'unsupported');
assert.ok(!existsSync(join(romsDir, 'consoles/vcs/broken.zip')));

// One tape side is a set with a part missing; the second side completes it.
const sideAHits = identifyBlob(blob('Saga A.tap', sideA), library.identifier);
assert.equal(library.filePool(sideAHits.pieces, [])[0]!.verdict, 'imported');
library.flush();
const entriesPath = join(romsDir, 'computers/micro/tapes/_manifest.json');
let entries = JSON.parse(readFileSync(entriesPath, 'utf8'));
assert.equal(entries.list, 'tapes');
assert.deepEqual(entries.entries[0].parts.map((part: { available: boolean }) => part.available), [true, false]);
assert.equal(entries.entries[0].archive, 'tapes/saga.zip', 'archive keys are relative to the system folder');
const sideBHits = identifyBlob(blob('Saga B.tap', sideB), library.identifier);
assert.match(library.filePool(sideBHits.pieces, [])[0]!.detail, /2 of 2 parts, completes the filed set/);
library.flush();
entries = JSON.parse(readFileSync(entriesPath, 'utf8'));
assert.deepEqual(entries.entries[0].parts.map((part: { available: boolean }) => part.available), [true, true]);
assert.equal(entries.entries[0].sources.length, 2);

// --- tidy -----------------------------------------------------------------------
// A loose BIOS set, a stray dump, a MAME-unsupported set, a misnamed list folder.
writeFileSync(join(romsDir, 'consoles/vcs.zip'), writeZip(new Map([['vcs.rom', biosChip]])));
writeFileSync(join(romsDir, 'consoles/vcs/Mystery (1990).zip'), writeZip(new Map([['x.bin', bytes(512, 10)]])));
writeFileSync(join(romsDir, 'consoles/vcs/broken.zip'), writeZip(new Map([['broken.bin', broken]])));
mkdirSync(join(romsDir, 'computers/micro/tape_dumps'));
writeFileSync(join(romsDir, 'computers/micro/tape_dumps/_manifest.json'), JSON.stringify({ list: 'tapes', entries: [{ name: 'old', archive: 'tape_dumps/old.zip' }] }));
writeFileSync(join(romsDir, 'computers/micro/tape_dumps/old.zip'), writeZip(new Map([['old.tap', bytes(10, 11)]])));
// The real tapes/ folder already exists, so the misnamed one cannot take its name.
const before = countFiles(romsDir);
const tidyLibrary = Library.forSystems({ romsDir, mameSrc, distDir: '', dryRun: false }, systems);
const plan = planTidy(tidyLibrary);
const verdicts = plan.moves.map(move => `${move.kind}:${move.from.slice(romsDir.length + 1)}`).sort();
assert.deepEqual(verdicts, [
  'bios:consoles/vcs.zip',
  'quarantine:computers/micro/tape_dumps',
  'quarantine:consoles/vcs/Mystery (1990).zip',
  'quarantine:consoles/vcs/broken.zip',
]);
applyTidy(tidyLibrary, plan.moves);
assert.ok(existsSync(join(romsDir, 'consoles/vcs/bios/vcs.zip')), 'the BIOS set moves into the system folder');
assert.ok(existsSync(join(romsDir, '_quarantine/consoles/vcs/broken.zip')));
assert.ok(existsSync(join(romsDir, '_quarantine/computers/micro/tape_dumps/old.zip')));
assert.equal(countFiles(romsDir), before + 1, 'nothing is deleted; the only new file is the quarantine log');
const log = readFileSync(join(romsDir, '_quarantine/quarantine.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(line));
assert.equal(log.length, 3);
assert.ok(log.every(line => line.reason && line.from && line.to));
assert.deepEqual(planTidy(Library.forSystems({ romsDir, mameSrc, distDir: '', dryRun: false }, systems)).moves, [], 'tidying is idempotent');

// A misnamed folder whose list has no folder yet is renamed, and its archive keys follow.
const renameRoot = join(root, 'rename');
mkdirSync(join(renameRoot, 'computers/micro/tape_dumps'), { recursive: true });
writeFileSync(join(renameRoot, 'computers/micro/tape_dumps/_manifest.json'), JSON.stringify({ list: 'tapes', entries: [{ name: 'saga', archive: 'tape_dumps/saga.zip' }] }));
writeFileSync(join(renameRoot, 'computers/micro/tape_dumps/saga.zip'), writeZip(new Map([['saga (side a).tap', sideA]])));
const renameLibrary = Library.forSystems({ romsDir: renameRoot, mameSrc, distDir: '', dryRun: false }, systems);
const renamePlan = planTidy(renameLibrary);
assert.deepEqual(renamePlan.moves.map(move => move.kind), ['rename']);
applyTidy(renameLibrary, renamePlan.moves);
assert.equal(JSON.parse(readFileSync(join(renameRoot, 'computers/micro/tapes/_manifest.json'), 'utf8')).entries[0].archive, 'tapes/saga.zip');

// --- machine sets ---------------------------------------------------------------
// A clone whose chips the generated manifest attributes to its parent (as it
// does Pac-Man's to puckman), with a device set, and a console whose BIOS
// accepts a clone revision's boot ROM.
const parentChip = bytes(2048, 12);
const parentGfx = bytes(1024, 13);
const deviceChip = bytes(512, 14);
const bootChip = bytes(256, 15);
const pocketChip = bytes(256, 16);
const load = (file: string, data: Uint8Array, extra: Record<string, unknown> = {}) =>
  ({ file, offset: 0, size: data.length, crc: hex8(crc32(data)), ...extra });
const arcadeConfig = {
  game: 'clone', family: 'clone', dataPath: 'games/arcade/clone', board: { cpus: [{ region: 'maincpu' }] },
  roms: [
    { region: 'maincpu', size: 2048, romSet: 'parent', loads: [load('clone.1', parentChip)] },
    { region: 'gfx', size: 1024, romSet: 'parent', loads: [load('clone.2', parentGfx)] },
    { region: 'mcu', size: 512, romSet: 'dev', loads: [load('dev.bin', deviceChip)] },
  ],
} as unknown as ShellConfig;
const pocketConfig = {
  game: 'pocketable', family: 'pocketable', dataPath: 'games/consoles/pocketable', board: { cpus: [{ region: 'maincpu' }] },
  roms: [{ region: 'maincpu', size: 256, loads: [load('boot.bin', bootChip, { alt: [{ file: 'pocket_boot.bin', crc: hex8(crc32(pocketChip)) }] })] }],
} as unknown as ShellConfig;
const setsRoot = join(root, 'sets');
mkdirSync(setsRoot);
const setsLibrary = Library.forSystems({ romsDir: setsRoot, mameSrc, distDir: '', dryRun: false }, {
  systems: [
    { key: 'arcade', category: 'arcade', machines: [{ game: 'clone', lifecycle: 'accepted', config: arcadeConfig }], lists: [] },
    { key: 'consoles/pocketable', category: 'consoles', machines: [{ game: 'pocketable', lifecycle: 'accepted', config: pocketConfig }], lists: [] },
  ],
  parked: [], ungenerated: [],
});
const chipOf = (name: string, data: Uint8Array) => ({ name, path: `merged.zip::${name}`, bytes: data });
for (const data of [parentChip, deviceChip, bootChip, pocketChip]) assert.ok(setsLibrary.isSetChip(hex8(crc32(data))));
const merged = setsLibrary.fileMachineSets([chipOf('a', parentChip), chipOf('b', parentGfx), chipOf('c', deviceChip)], 'clone.zip');
assert.deepEqual(merged.map(outcome => `${outcome.name}:${outcome.verdict}`).sort(), ['clone:imported', 'dev:imported', 'parent:imported']);
assert.deepEqual([...readZipBytes(readFileSync(join(setsRoot, 'arcade/clone.zip'))).keys()].sort(), ['clone.1', 'clone.2', 'dev.bin'],
  'a board covered whole is filed whole, under the names its manifest loads');
assert.deepEqual([...readZipBytes(readFileSync(join(setsRoot, 'arcade/parent.zip'))).keys()].sort(), ['clone.1', 'clone.2']);
// A device set on its own completes; the board it belongs to is merely short.
const device = setsLibrary.fileMachineSets([chipOf('c', deviceChip)], 'dev.zip');
assert.deepEqual(device.map(outcome => `${outcome.name}:${outcome.verdict}`).sort(), ['clone:incomplete', 'dev:duplicate']);
// A clone revision's boot ROM is filed under its own name in the console's bios/.
const pocket = setsLibrary.fileMachineSets([chipOf('pocket_boot.bin', pocketChip)], 'Pocket BIOS.zip::pocketable_pocket.zip');
assert.deepEqual(pocket.map(outcome => `${outcome.list}:${outcome.name}:${outcome.verdict}`), ['consoles/pocketable/bios:pocketable_pocket:imported']);
assert.ok(existsSync(join(setsRoot, 'consoles/pocketable/bios/pocketable_pocket.zip')));

function countFiles(dir: string): number {
  return readdirSync(dir, { withFileTypes: true }).reduce((total, entry) =>
    total + (entry.isDirectory() ? countFiles(join(dir, entry.name)) : 1), 0);
}

console.log('rom-library.spec: identification, pooled filing, blank banks, both manifest shapes and non-destructive tidy passed');
