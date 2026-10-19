import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  availabilityFromAudit,
  catalogExtensions,
  mediaSlotsOf,
  mediumKindOf,
  writeSoftwareShelves,
} from './software-shelves.ts';

// The medium follows the part interface MAME gives the list.
assert.equal(mediumKindOf('cbm_cass', 'c64_cass'), 'cassette');
assert.equal(mediumKindOf('floppy_5_25', 'c64_flop_orig'), 'floppy');
assert.equal(mediumKindOf('c64_cart', 'c64_cart'), 'cartridge');
assert.equal(mediumKindOf('cbm_quik', 'c64_quik'), 'quickload');
assert.equal(mediumKindOf('vic10_cart', 'vic10'), 'cartridge');
assert.equal(mediumKindOf('', 'cpc_tape'), 'cassette', 'the list name decides when the interface says nothing');
assert.equal(mediumKindOf('cdrom', 'psx'), undefined);

// A transport fixed to the board leaves its medium no slot to empty.
assert.deepEqual(mediaSlotsOf('cassette', [{ type: 'CASSETTE', tag: 'cassette' }]), []);
assert.deepEqual(mediaSlotsOf('cassette', [
  { type: 'CASSETTE', tag: 'cassette' },
  { type: 'PET_DATASSETTE_PORT', tag: 'tape', slotDefault: 'c1530' },
]), [], 'one fixed deck keeps the medium attached however its other decks are configured');
assert.deepEqual(mediaSlotsOf('floppy', [
  { type: 'CBM_IEC_SLOT', tag: 'iec8', slotDefault: 'c1541' },
  { type: 'CBM_IEC_SLOT', tag: 'iec9', slotDefault: 'c1541' },
  { type: 'FLOPPY_CONNECTOR', tag: 'iec8:c1541:uc4:0' },
  { type: 'FLOPPY_CONNECTOR', tag: 'iec9:c1541:uc4:0' },
]), ['iec8', 'iec9']);

assert.deepEqual(catalogExtensions({ entries: [
  { prg: { roms: [{ file: 'a.tap' }, { file: 'b.TAP' }] } },
  { prg: { roms: [{ file: 'c.wav' }] } },
  { prg: { roms: [{ file: 'noext' }] } },
] as never }), ['tap', 'wav']);

// The audit manifest is reduced per list, and only complete sets count.
const manifest = {
  list: 'c64_cass',
  entries: [
    { list: 'c64_cass', name: 'nebulus', archive: 'c64_cass/nebulus.zip', parts: [{ available: true }] },
    { list: 'c64_cass', name: '180', archive: 'c64_cass/180.zip', parts: [{ available: true }, { available: false }] },
    { list: 'c64_cass', name: 'nemwar', archive: 'not-supported/mame-unsupported/sets/c64_cass/nemwar.zip', parts: [{ available: true }] },
    { list: 'c64_cart', name: 'vw64', archive: 'c64_carts/vw64.zip', parts: [{ available: true }] },
    { list: 'c64_cass', name: 'loose', archive: 'c64_cass/loose.tap', parts: [{ available: true }] },
  ],
};
assert.deepEqual(availabilityFromAudit(manifest, 'c64_cass'),
  [{ file: 'c64_cass/nebulus.zip', name: 'nebulus', tier: 'verified' }]);
assert.deepEqual(availabilityFromAudit(manifest, 'c64_cart'),
  [{ file: 'c64_carts/vw64.zip', name: 'vw64', tier: 'verified' }]);
assert.deepEqual(availabilityFromAudit({ carts: [] }, 'c64_cass'), [], 'a console cart index is not an audit');

// End to end against a synthetic MAME tree: two lists, one with dumps, one
// whose medium has no generated transport, and one the tree does not hold.
const root = mkdtempSync(join(tmpdir(), 'mamekit-shelves-'));
try {
  const mameSrc = join(root, 'mame');
  mkdirSync(join(mameSrc, 'hash'), { recursive: true });
  writeFileSync(join(mameSrc, 'hash', 'c64_cass.xml'), `<?xml version="1.0"?>
<softwarelist name="c64_cass" description="Commodore 64 cassettes">
  <software name="nebulus"><description>Nebulus</description><year>1987</year><publisher>Erbe</publisher>
    <part name="cass1" interface="cbm_cass"><dataarea name="cass" size="4"><rom name="Nebulus.tap" size="4" crc="9bd0c109" sha1="x"/></dataarea></part>
  </software>
  <software name="paltape"><description>PAL only</description><year>1988</year><publisher>Ocean</publisher>
    <sharedfeat name="compatibility" value="PAL"/>
    <part name="cass1" interface="cbm_cass"><dataarea name="cass" size="4"><rom name="pal.wav" size="4" crc="00000001" sha1="x"/></dataarea></part>
  </software>
</softwarelist>`);
  writeFileSync(join(mameSrc, 'hash', 'c64_cart.xml'), `<?xml version="1.0"?>
<softwarelist name="c64_cart" description="Commodore 64 cartridges">
  <software name="vw64"><description>VizaWrite 64</description><year>1984</year><publisher>Viza</publisher>
    <part name="cart" interface="c64_cart"><feature name="slot" value="vizawrite"/>
      <dataarea name="roml" size="4"><rom name="u" size="2" crc="b0cc7564" sha1="x" offset="0"/><rom name="3" size="2" crc="ef80b1e7" sha1="x" offset="2"/></dataarea>
      <dataarea name="romh" size="2"><rom name="2.bin" size="2" crc="32f2a5df" sha1="x"/></dataarea>
    </part>
  </software>
</softwarelist>`);
  writeFileSync(join(mameSrc, 'hash', 'c64_quik.xml'), `<?xml version="1.0"?>
<softwarelist name="c64_quik" description="Commodore 64 quickload">
  <software name="paltool"><description>PAL tool</description><year>1990</year><publisher>x</publisher>
    <sharedfeat name="compatibility" value="PAL"/>
    <part name="quik" interface="cbm_quik"><dataarea name="quik" size="4"><rom name="t.t64" size="4" crc="00000002" sha1="x"/></dataarea></part>
  </software>
</softwarelist>`);
  writeFileSync(join(mameSrc, 'hash', 'c64_flop_orig.xml'), `<?xml version="1.0"?>
<softwarelist name="c64_flop_orig" description="Commodore 64 original disks">
  <software name="aztecchl"><description>Aztec Challenge</description><year>1983</year><publisher>Cosmi</publisher>
    <info name="video" value="NTSC"/>
    <part name="flop1" interface="floppy_5_25"><dataarea name="flop" size="4"><rom name="aztec.g64" size="4" crc="2268d7ae" sha1="x"/></dataarea></part>
  </software>
  <software name="jingldsk"><description>JingleDisk</description><year>1985</year><publisher>x</publisher>
    <info name="usage" value="Commodore: Load &quot;jingle&quot;,8,1 / Apple IIc and e: Self boots"/>
    <part name="flop1" interface="floppy_5_25"><dataarea name="flop" size="4"><rom name="j.g64" size="4" crc="00000003" sha1="x"/></dataarea></part>
  </software>
</softwarelist>`);
  const dumpsDir = join(root, 'roms', 'computers', 'c64');
  mkdirSync(join(dumpsDir, 'c64_cass'), { recursive: true });
  writeFileSync(join(dumpsDir, 'c64_cass', '_manifest.json'), JSON.stringify(manifest));
  const outDir = join(root, 'out');
  const lines: string[] = [];
  const shelves = writeSoftwareShelves({
    mameSrc, outDir, dumpsDir, dumpsKey: 'computers/c64',
    lists: [
      { name: 'c64_cass', status: 'original', filter: 'NTSC' },
      { name: 'c64_flop_orig', status: 'original', filter: 'NTSC' },
      { name: 'c64_cart', status: 'original', filter: 'NTSC' },
      { name: 'c64_quik', status: 'original', filter: 'NTSC' },
      { name: 'vic10', status: 'compatible' },
    ],
    devices: [
      { type: 'MOS6581', tag: 'u18' },
      { type: 'PET_DATASSETTE_PORT', tag: 'tape', slotDefault: 'c1530' },
      { type: 'CBM_IEC', tag: 'iec_bus' },
      { type: 'CBM_IEC_SLOT', tag: 'iec8', slotDefault: 'c1541', slotAddress: 8 },
      { type: 'FLOPPY_CONNECTOR', tag: 'iec8:c1541:uc4:0' },
    ],
    log: line => lines.push(line),
  });
  assert.ok(shelves);
  assert.equal(shelves.dumpsKey, 'computers/c64');
  assert.deepEqual(shelves.shelves.map(shelf => shelf.list), ['c64_cass', 'c64_flop_orig', 'c64_cart'],
    'a list the tree lacks, a compatible list and a list the filter empties are not shelves');
  const [tapes, disks, carts] = shelves.shelves;
  assert.equal(carts!.kind, 'cartridge');
  assert.deepEqual(carts!.extensions, [], 'chip names are not image extensions');
  const cartCatalog = JSON.parse(readFileSync(join(outDir, 'software', 'c64_cart.json'), 'utf8'));
  assert.deepEqual(cartCatalog.entries[0].prg.roms.map((rom: { crc: string }) => rom.crc),
    ['b0cc7564', 'ef80b1e7', '32f2a5df'], 'roml and romh join in order');
  assert.equal(tapes!.kind, 'cassette');
  assert.equal(tapes!.mountable, true, 'the datassette port is the tape transport');
  assert.deepEqual(tapes!.slots, ['tape'], 'the datassette port is itself the slot');
  // A title starts itself (one-click play): LOAD and RUN typed while the
  // KERNAL waits for PLAY, then PLAY; a disk addressed to its drive's unit,
  // which is the IEC slot's own address.
  assert.deepEqual(tapes!.boot, { delay: 3, command: 'LOAD{ENTER}RUN{ENTER}', play: true });
  assert.deepEqual(disks!.boot, { delay: 3, command: 'LOAD"*",8,1{ENTER}RUN{ENTER}' });
  assert.equal(carts!.boot, undefined, 'a medium no policy covers starts nothing');
  // MAME's machine filter is recorded on each shelf, and a list's own notes
  // ride on its entries: the video standard, and a start command a usage note
  // names (Jingle Disk's first file is a utility).
  assert.equal(disks!.filter, 'NTSC');
  const diskCatalog = JSON.parse(readFileSync(join(outDir, 'software', 'c64_flop_orig.json'), 'utf8'));
  assert.equal(diskCatalog.entries.find((entry: { name: string }) => entry.name === 'aztecchl').video, 'NTSC');
  assert.equal(diskCatalog.entries.find((entry: { name: string }) => entry.name === 'jingldsk').start, 'LOAD"JINGLE",8,1{ENTER}RUN{ENTER}');
  assert.equal(diskCatalog.entries.find((entry: { name: string }) => entry.name === 'aztecchl').start, undefined);
  assert.deepEqual(disks!.slots, ['iec8'], 'the drive sits under the outermost slot, not its own connector');
  assert.equal(carts!.slots, undefined, 'nothing mounts a cartridge yet');
  assert.equal(tapes!.entries, 1, 'the NTSC filter drops the PAL-only tape');
  assert.deepEqual(tapes!.extensions, ['tap']);
  assert.equal(tapes!.catalogUrl, 'software/c64_cass.json');
  assert.equal(tapes!.availableUrl, 'software/c64_cass.available.json');
  assert.equal(disks!.kind, 'floppy');
  assert.equal(disks!.mountable, true, "the composed 1541's floppy connector is the disk transport");
  assert.equal(disks!.availableUrl, undefined, 'no audit filed a disk');
  const catalog = JSON.parse(readFileSync(join(outDir, 'software', 'c64_cass.json'), 'utf8'));
  assert.equal(catalog.entries[0].prg.roms[0].file, 'Nebulus.tap');
  const available = JSON.parse(readFileSync(join(outDir, 'software', 'c64_cass.available.json'), 'utf8'));
  assert.deepEqual(available, { set: 'computers/c64', carts: [{ file: 'c64_cass/nebulus.zip', name: 'nebulus', tier: 'verified' }] });
  assert.ok(!existsSync(join(outDir, 'software', 'c64_flop_orig.available.json')));
  assert.ok(lines.some(line => line.includes('display only')), 'the log says which shelf cannot mount');
  assert.ok(lines.some(line => line.includes('c64_quik') && line.includes('no shelf')), 'the emptied list is logged');
  assert.equal(writeSoftwareShelves({ mameSrc, outDir, dumpsKey: 'computers/x', lists: [], devices: [] }), undefined);
  // Only the formats the transport reads are playable: a drive that reads
  // .d64 alone makes the .g64 list display only; one that reads both keeps it.
  const devicesWithDrive = [
    { type: 'CBM_IEC_SLOT', tag: 'iec8', slotDefault: 'c1541' },
    { type: 'FLOPPY_CONNECTOR', tag: 'iec8:c1541:uc4:0' },
  ];
  const disksFor = (floppy: string[]) => writeSoftwareShelves({
    mameSrc, outDir, dumpsKey: 'computers/c64', devices: devicesWithDrive,
    lists: [{ name: 'c64_flop_orig', status: 'original', filter: 'NTSC' }],
    transportExtensions: { floppy },
  })!.shelves[0]!;
  const unreadable = disksFor(['d64']);
  assert.equal(unreadable.mountable, false, 'a list in no format the drive reads is display only');
  assert.deepEqual(unreadable.extensions, []);
  const readable = disksFor(['d64', 'g64', 'g41', 'g71']);
  assert.equal(readable.mountable, true);
  assert.deepEqual(readable.extensions, ['g64']);
} finally {
  rmSync(root, { recursive: true, force: true });
}

console.log('software-shelves.spec: medium kinds, audit reduction and shelf extraction passed');
