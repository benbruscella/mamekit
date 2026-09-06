// Self-test for the software-list (hash/*.xml) extractor. Run with:
//   node src/kg/softlist.spec.ts
// The inline fixture exercises every parsing rule the real nes.xml needs:
// plain entries, clones, multi-rom dataareas, loadflag="fill"/"reload" skips,
// nodump skips, baddump keeps, hex/decimal sizes, 0x offsets, XML entities,
// vram/wram/bwram sizes, and the "!EXP" sharedfeat filter.

import { parseSoftwareList, buildCatalog } from './softlist.ts';

let totalPass = 0;
let totalFail = 0;

function eq(label: string, actual: unknown, expected: unknown): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    totalPass++;
  } else {
    totalFail++;
    console.log(`  FAIL ${label}: got ${a}, want ${e}`);
  }
}

const XML = `<?xml version="1.0"?>
<softwarelist name="nes" description="Nintendo Entertainment System cartridges">
	<software name="smb">
		<description>Super Mario Bros. (Euro, rev. A) &amp; Friends &lt;test&gt;</description>
		<year>1987</year>
		<publisher>Nintendo</publisher>
		<info name="serial" value="NES-SM"/>
		<part name="cart" interface="nes_cart">
			<feature name="slot" value="nrom" />
			<feature name="pcb" value="NES-NROM-256" />
			<feature name="mirroring" value="vertical" />
			<dataarea name="prg" size="32768">
				<rom name="pal-sm-0 prg" size="32768" crc="967A605F" sha1="deadbeef" offset="00000" status="baddump" />
			</dataarea>
			<dataarea name="chr" size="8192">
				<rom name="hvc-sm-0 chr" size="8192" crc="867b51ad" sha1="cafe" offset="00000" />
			</dataarea>
		</part>
	</software>
	<software name="smb1" cloneof="smb">
		<description>Super Mario Bros. (World)</description>
		<year>1985</year>
		<publisher>Nintendo</publisher>
		<part name="cart" interface="nes_cart">
			<feature name="slot" value="nrom" />
			<dataarea name="prg" size="0x8000">
				<rom name="a" size="16384" crc="11111111" offset="0" />
				<rom name="b" size="16384" crc="22222222" offset="0x4000" />
				<rom name="fillx" size="16384" offset="0x4000" loadflag="fill" value="0xff" />
				<rom name="c" size="16384" crc="33333333" offset="4000" loadflag="reload" />
			</dataarea>
			<dataarea name="chr" size="8192">
				<rom name="nd" size="8192" offset="0" status="nodump" />
			</dataarea>
			<dataarea name="vram" size="8192" />
			<dataarea name="bwram" size="2048" />
		</part>
	</software>
	<software name="expcart">
		<description>Expansion-audio cart</description>
		<year>1990</year>
		<publisher>Konami</publisher>
		<sharedfeat name="compatibility" value="NTSC,EXP"/>
		<part name="cart" interface="nes_cart">
			<feature name="slot" value="vrc7" />
			<dataarea name="prg" size="131072">
				<rom name="p" size="131072" crc="44444444" offset="0" />
			</dataarea>
		</part>
	</software>
</softwarelist>
`;

const parsed = parseSoftwareList(XML);

eq('list name', parsed.name, 'nes');
eq('list description', parsed.description, 'Nintendo Entertainment System cartridges');
eq('part interface', parsed.interface, 'nes_cart');
eq('entry count (pre-filter)', parsed.entries.length, 3);

// entry 1: plain, entities unescaped, baddump crc kept + lowercased
{
  const e = parsed.entries[0];
  eq('smb name', e.name, 'smb');
  eq('entities unescaped', e.description, 'Super Mario Bros. (Euro, rev. A) & Friends <test>');
  eq('smb year', e.year, '1987');
  eq('smb slot', e.slot, 'nrom');
  eq('smb pcb', e.pcb, 'NES-NROM-256');
  eq('smb mirroring', e.mirroring, 'vertical');
  eq('baddump crc kept + lowercased', e.prg.roms[0].crc, '967a605f');
  eq('smb chr crc', e.chr?.roms[0].crc, '867b51ad');
}

// entry 2: clone, hex size, fill/reload skipped, hex offsets, nodump chr, ram areas
{
  const e = parsed.entries[1];
  eq('cloneof', e.cloneof, 'smb');
  eq('hex dataarea size', e.prg.size, 0x8000);
  eq('fill + reload skipped', e.prg.roms.length, 2);
  eq('bare-hex offset', e.prg.roms[1].offset, 0x4000);
  eq('nodump chr rom skipped', e.chr?.roms.length, 0);
  eq('vram size', e.vram, 8192);
  eq('bwram size', e.bwram, 2048);
  eq('wram absent', e.wram, undefined);
}

// --- catalog: filter + crc index ----------------------------------------------
{
  const cat = buildCatalog(parsed, '!EXP');
  eq('!EXP filter drops the EXP cart', cat.entries.length, 2);
  eq('filter keeps non-tagged entries', cat.entries.map(e => e.name), ['smb', 'smb1']);
  eq('compatibility field stripped from output', 'compatibility' in cat.entries[0], false);
  eq('crc index: smb', cat.crcIndex['967a605f'], [0]);
  eq('crc index: smb1 first prg rom', cat.crcIndex['11111111'], [1]);
  eq('catalog meta', [cat.list, cat.interface], ['nes', 'nes_cart']);

  // softlist_dev.cpp: an entry with no compatibility tag is compatible with
  // every filter; a tagged one must name a filter token.
  const inclusive = buildCatalog(parsed, 'EXP');
  eq('bare filter keeps untagged entries and the ones naming it', inclusive.entries.map(e => e.name), ['smb', 'smb1', 'expcart']);
  const other = buildCatalog(parsed, 'PAL');
  eq('bare filter drops a tagged entry that does not name it', other.entries.map(e => e.name), ['smb', 'smb1']);

  const unfiltered = buildCatalog(parsed);
  eq('no filter keeps everything', unfiltered.entries.length, 3);
}

// A single-area list. The ColecoVision, SG-1000 and Atari 2600 all describe a
// cartridge as one "rom" dataarea rather than the NES's prg/chr pair; skipping
// it left every entry with no chips and the catalog with an empty crcIndex, so
// no dump of those consoles could ever be identified.
{
  const parsed = parseSoftwareList(`
<softwarelist name="coleco" description="ColecoVision cartridges">
  <software name="carnival">
    <description>Carnival</description>
    <year>1982</year>
    <publisher>Coleco / CBS</publisher>
    <part name="cart" interface="coleco_cart">
      <dataarea name="rom" size="16384">
        <rom name="carnival.1" size="8192" crc="3cab8c1f" offset="0x0000" />
        <rom name="carnival.2" size="8192" crc="4cf856a9" offset="0x2000" />
      </dataarea>
    </part>
  </software>
</softwarelist>`);
  const entry = parsed.entries[0]!;
  eq('rom dataarea becomes the program area', entry.prg.size, 16384);
  eq('rom dataarea keeps every chip', entry.prg.roms, [
    { size: 8192, crc: '3cab8c1f', offset: 0, file: 'carnival.1' },
    { size: 8192, crc: '4cf856a9', offset: 8192, file: 'carnival.2' },
  ]);
  eq('a single-area list has no chr', entry.chr, undefined);
  const cat = buildCatalog(parsed);
  eq('single-area entries reach the crc index', cat.crcIndex['3cab8c1f'], [0]);
  eq('single-area catalog meta', [cat.list, cat.interface], ['coleco', 'coleco_cart']);
}

// A media list. The C64's tapes are one "cass" dataarea per side, disks one
// "flop" per disk, and its cartridges a "roml"/"romh" pair; every image the
// set names joins `prg` in order, with the file name the machine mounts. The
// list also carries MAME's own support verdict, and the driver filters it
// "NTSC" or "PAL" although almost no entry is tagged -- so untagged entries
// must pass, exactly as MAME's is_compatible passes them.
{
  const parsed = parseSoftwareList(`
<softwarelist name="c64_cass" description="Commodore 64 cassettes">
  <software name="180">
    <description>180</description>
    <year>1986</year>
    <publisher>Mastertronic</publisher>
    <part name="cass1" interface="cbm_cass">
      <dataarea name="cass" size="100">
        <rom name="180.tap" size="100" crc="eee24a58" sha1="x"/>
      </dataarea>
    </part>
    <part name="cass2" interface="cbm_cass">
      <dataarea name="cass" size="50">
        <rom name="180_a1.tap" size="50" crc="d251ee24" sha1="y"/>
      </dataarea>
    </part>
  </software>
  <software name="nemwar" supported="no">
    <description>Nemesis the Warlock</description>
    <year>1987</year>
    <publisher>Martech</publisher>
    <part name="cass1" interface="cbm_cass">
      <dataarea name="cass" size="10">
        <rom name="nemesis.tap" size="10" crc="0badc0de" sha1="z"/>
      </dataarea>
    </part>
  </software>
  <software name="paltape">
    <description>PAL only</description>
    <year>1988</year>
    <publisher>Ocean</publisher>
    <sharedfeat name="compatibility" value="PAL"/>
    <part name="cass1" interface="cbm_cass">
      <dataarea name="cass" size="10">
        <rom name="pal.tap" size="10" crc="0000aaaa" sha1="w"/>
      </dataarea>
    </part>
  </software>
  <software name="notntsc">
    <description>Breaks on NTSC</description>
    <year>1988</year>
    <publisher>Ocean</publisher>
    <sharedfeat name="incompatibility" value="NTSC"/>
    <part name="cass1" interface="cbm_cass">
      <dataarea name="cass" size="10">
        <rom name="nn.tap" size="10" crc="0000bbbb" sha1="v"/>
      </dataarea>
    </part>
  </software>
</softwarelist>`);
  eq('media list interface', parsed.interface, 'cbm_cass');
  const tape = parsed.entries[0]!;
  eq('both sides join the program area in order', tape.prg.roms.map(r => r.file), ['180.tap', '180_a1.tap']);
  eq('side sizes add up', tape.prg.size, 150);
  eq('a two-sided tape says so', tape.parts, 2);
  eq('a one-sided tape does not', parsed.entries[1]!.parts, undefined);
  eq('MAME support verdict kept', parsed.entries[1]!.supported, 'no');
  eq('a supported set carries no verdict', tape.supported, undefined);
  const ntsc = buildCatalog(parsed, 'NTSC');
  eq('NTSC filter keeps untagged tapes, drops PAL-only and NTSC-incompatible ones',
    ntsc.entries.map(e => e.name), ['180', 'nemwar']);
  eq('sharedfeats stripped from output', ['compatibility', 'incompatibility'].some(k => k in ntsc.entries[0]!), false);
  const pal = buildCatalog(parsed, 'PAL');
  eq('PAL filter keeps the PAL tape and the NTSC-incompatible one',
    pal.entries.map(e => e.name), ['180', 'nemwar', 'paltape', 'notntsc']);
  eq('first side indexes the set', ntsc.crcIndex['eee24a58'], [0]);
}

console.log(`\nsoftlist.spec: ${totalPass} passed, ${totalFail} failed`);
if (totalFail > 0) process.exitCode = 1;
