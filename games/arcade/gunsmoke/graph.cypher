// mamekit knowledge graph — driver src/mame/capcom/gunsmoke.cpp
// generated 2026-09-05T03:49:39.593Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/capcom/gunsmoke.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopn.h'}) SET n:SourceFile SET n += {path: 'sound/ymopn.h', external: true};
MERGE (n:KG {id: 'file:video/bufsprite.h'}) SET n:SourceFile SET n += {path: 'video/bufsprite.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'game:gunsmoke'}) SET n:Game SET n += {name: 'gunsmoke', year: '1985', company: 'Capcom', fullname: 'Gun.Smoke (World, 1985-11-15)', monitor: 'ROT270', cls: 'gunsmoke_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 1005, sourceColumn: 1, sourceEndLine: 1005};
MERGE (n:KG {id: 'romset:gunsmoke'}) SET n:RomSet SET n += {name: 'gunsmoke', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 605, sourceColumn: 1, sourceEndLine: 605};
MERGE (n:KG {id: 'region:gunsmoke/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 98304, flags: '0', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 606, sourceColumn: 2, sourceEndLine: 606};
MERGE (n:KG {id: 'rom:gunsmoke/maincpu/gs03.09n'}) SET n:Rom SET n += {file: 'gs03.09n', offset: 0, size: 32768, crc: '40a06cef', sha1: '3e2a52d476298b7252f0adaefdb42090351e921c', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 607, sourceColumn: 2, sourceEndLine: 607};
MERGE (n:KG {id: 'rom:gunsmoke/maincpu/gs04.10n'}) SET n:Rom SET n += {file: 'gs04.10n', offset: 32768, size: 32768, crc: '8d4b423f', sha1: '149274c2ed1526ca1f419fdf8a24059ff138f7f2', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 608, sourceColumn: 2, sourceEndLine: 608};
MERGE (n:KG {id: 'rom:gunsmoke/maincpu/gs05.12n'}) SET n:Rom SET n += {file: 'gs05.12n', offset: 65536, size: 32768, crc: '2b5667fb', sha1: '5b689bca1e76d803b4cae22feaa7744fa528e93f', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 609, sourceColumn: 2, sourceEndLine: 609};
MERGE (n:KG {id: 'region:gunsmoke/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 611, sourceColumn: 2, sourceEndLine: 611};
MERGE (n:KG {id: 'rom:gunsmoke/audiocpu/gs02.14h'}) SET n:Rom SET n += {file: 'gs02.14h', offset: 0, size: 32768, crc: 'cd7a2c38', sha1: 'c76c471f694b76015370f0eacf5350e652f526ff', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 612, sourceColumn: 2, sourceEndLine: 612};
MERGE (n:KG {id: 'region:gunsmoke/chars'}) SET n:RomRegion SET n += {tag: 'chars', size: 16384, flags: '0', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 614, sourceColumn: 2, sourceEndLine: 614};
MERGE (n:KG {id: 'rom:gunsmoke/chars/gs01.11f'}) SET n:Rom SET n += {file: 'gs01.11f', offset: 0, size: 16384, crc: 'b61ece9b', sha1: 'eb3fc62644cc5b5a2b9cbe67c393d4a0e2a59ca9', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 615, sourceColumn: 2, sourceEndLine: 615};
MERGE (n:KG {id: 'region:gunsmoke/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 262144, flags: '0', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 617, sourceColumn: 2, sourceEndLine: 617};
MERGE (n:KG {id: 'rom:gunsmoke/tiles/gs13.06c'}) SET n:Rom SET n += {file: 'gs13.06c', offset: 0, size: 32768, crc: 'f6769fc5', sha1: 'd192ec176425327ca4b7e25fc8432fc47837ba29', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 618, sourceColumn: 2, sourceEndLine: 618};
MERGE (n:KG {id: 'rom:gunsmoke/tiles/gs12.05c'}) SET n:Rom SET n += {file: 'gs12.05c', offset: 32768, size: 32768, crc: 'd997b78c', sha1: '3b4a9b6f9e57ecfb4ab9734379bd0ee765fd6daa', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 619, sourceColumn: 2, sourceEndLine: 619};
MERGE (n:KG {id: 'rom:gunsmoke/tiles/gs11.04c'}) SET n:Rom SET n += {file: 'gs11.04c', offset: 65536, size: 32768, crc: '125ba58e', sha1: 'cf6931653cebd051564bed8121ab8713a55095c5', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 620, sourceColumn: 2, sourceEndLine: 620};
MERGE (n:KG {id: 'rom:gunsmoke/tiles/gs10.02c'}) SET n:Rom SET n += {file: 'gs10.02c', offset: 98304, size: 32768, crc: 'f469c13c', sha1: '54eda52d6fce58771c0adfe2c88292a41d5a9b99', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 621, sourceColumn: 2, sourceEndLine: 621};
MERGE (n:KG {id: 'rom:gunsmoke/tiles/gs09.06a'}) SET n:Rom SET n += {file: 'gs09.06a', offset: 131072, size: 32768, crc: '539f182d', sha1: '4190c0adbecc57b92f4d002e121acb77e8c5d8d8', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 623, sourceColumn: 2, sourceEndLine: 623};
MERGE (n:KG {id: 'rom:gunsmoke/tiles/gs08.05a'}) SET n:Rom SET n += {file: 'gs08.05a', offset: 163840, size: 32768, crc: 'e87e526d', sha1: 'd10068addf30322424a85bbc6382cb762ae3fbe2', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 624, sourceColumn: 2, sourceEndLine: 624};
MERGE (n:KG {id: 'rom:gunsmoke/tiles/gs07.04a'}) SET n:Rom SET n += {file: 'gs07.04a', offset: 196608, size: 32768, crc: '4382c0d2', sha1: '8615e62bc57b40d082f6ca211d64f22185bed1fd', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 625, sourceColumn: 2, sourceEndLine: 625};
MERGE (n:KG {id: 'rom:gunsmoke/tiles/gs06.02a'}) SET n:Rom SET n += {file: 'gs06.02a', offset: 229376, size: 32768, crc: '4cafe7a6', sha1: 'fe501f3a5e9ce9e82e9708f1cd297f4c94ef0f81', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 626, sourceColumn: 2, sourceEndLine: 626};
MERGE (n:KG {id: 'region:gunsmoke/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 262144, flags: '0', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 628, sourceColumn: 2, sourceEndLine: 628};
MERGE (n:KG {id: 'rom:gunsmoke/sprites/gs22.06n'}) SET n:Rom SET n += {file: 'gs22.06n', offset: 0, size: 32768, crc: 'dc9c508c', sha1: '920505dd4c63b177918feb4e54cca8a7948ec9d9', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 629, sourceColumn: 2, sourceEndLine: 629};
MERGE (n:KG {id: 'rom:gunsmoke/sprites/gs21.04n'}) SET n:Rom SET n += {file: 'gs21.04n', offset: 32768, size: 32768, crc: '68883749', sha1: 'c7bf2bf49c53feddf8f30b4001dc2d59b52b1c28', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 630, sourceColumn: 2, sourceEndLine: 630};
MERGE (n:KG {id: 'rom:gunsmoke/sprites/gs20.03n'}) SET n:Rom SET n += {file: 'gs20.03n', offset: 65536, size: 32768, crc: '0be932ed', sha1: '1c5af5884a23112dbc36579515d1cb497992da2f', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 631, sourceColumn: 2, sourceEndLine: 631};
MERGE (n:KG {id: 'rom:gunsmoke/sprites/gs19.01n'}) SET n:Rom SET n += {file: 'gs19.01n', offset: 98304, size: 32768, crc: '63072f93', sha1: 'cb3a2729782cf2855558d081fe92d28366228b8e', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 632, sourceColumn: 2, sourceEndLine: 632};
MERGE (n:KG {id: 'rom:gunsmoke/sprites/gs18.06l'}) SET n:Rom SET n += {file: 'gs18.06l', offset: 131072, size: 32768, crc: 'f69a3c7c', sha1: 'e9eb9dfa7d53aa7b728150f91d05bfc3bf6f1e75', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 633, sourceColumn: 2, sourceEndLine: 633};
MERGE (n:KG {id: 'rom:gunsmoke/sprites/gs17.04l'}) SET n:Rom SET n += {file: 'gs17.04l', offset: 163840, size: 32768, crc: '4e98562a', sha1: '0341b8a79be1d71a57d0d76ed890e15f9f92259e', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 634, sourceColumn: 2, sourceEndLine: 634};
MERGE (n:KG {id: 'rom:gunsmoke/sprites/gs16.03l'}) SET n:Rom SET n += {file: 'gs16.03l', offset: 196608, size: 32768, crc: '0d99c3b3', sha1: '436c566b76f632242448671e3b6319f7d9f65322', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 635, sourceColumn: 2, sourceEndLine: 635};
MERGE (n:KG {id: 'rom:gunsmoke/sprites/gs15.01l'}) SET n:Rom SET n += {file: 'gs15.01l', offset: 229376, size: 32768, crc: '7f14270e', sha1: 'dd06c333c2ea097e25185a1423cd61e1b7afc42b', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 636, sourceColumn: 2, sourceEndLine: 636};
MERGE (n:KG {id: 'region:gunsmoke/bgtiles'}) SET n:RomRegion SET n += {tag: 'bgtiles', size: 32768, flags: '0', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 638, sourceColumn: 2, sourceEndLine: 638};
MERGE (n:KG {id: 'rom:gunsmoke/bgtiles/gs14.11c'}) SET n:Rom SET n += {file: 'gs14.11c', offset: 0, size: 32768, crc: '0af4f7eb', sha1: '24a98fdeedeeaf1035b4af52d5a8dd5e47a5e62d', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 639, sourceColumn: 2, sourceEndLine: 639};
MERGE (n:KG {id: 'region:gunsmoke/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 2560, flags: '0', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 641, sourceColumn: 2, sourceEndLine: 641};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-01.03b'}) SET n:Rom SET n += {file: 'g-01.03b', offset: 0, size: 256, crc: '02f55589', sha1: '8a3f98304aedf3aba1c08b615bf457752a480edc', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 642, sourceColumn: 2, sourceEndLine: 642};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-02.04b'}) SET n:Rom SET n += {file: 'g-02.04b', offset: 256, size: 256, crc: 'e1e36dd9', sha1: '5bd88a35898a2d973045bdde8311aac3a12826de', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 643, sourceColumn: 2, sourceEndLine: 643};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-03.05b'}) SET n:Rom SET n += {file: 'g-03.05b', offset: 512, size: 256, crc: '989399c0', sha1: 'e408e391f49ed0c7b9e16479fea44b809440fefc', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 644, sourceColumn: 2, sourceEndLine: 644};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-04.09d'}) SET n:Rom SET n += {file: 'g-04.09d', offset: 768, size: 256, crc: '906612b5', sha1: '7b727a6200c088538180758320ede84aa7e5b96d', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 645, sourceColumn: 2, sourceEndLine: 645};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-06.14a'}) SET n:Rom SET n += {file: 'g-06.14a', offset: 1024, size: 256, crc: '4a9da18b', sha1: 'fed3b81b56aab2ed0a21ed1fcebe3f1ae095a13b', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 646, sourceColumn: 2, sourceEndLine: 646};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-07.15a'}) SET n:Rom SET n += {file: 'g-07.15a', offset: 1280, size: 256, crc: 'cb9394fc', sha1: '8ad0fde6a8ef8326d2da4b6dbf3b51f5f6c668c8', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 647, sourceColumn: 2, sourceEndLine: 647};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-09.09f'}) SET n:Rom SET n += {file: 'g-09.09f', offset: 1536, size: 256, crc: '3cee181e', sha1: '3f95bdb12391cb9b3673191bda8d09c84b36b4d3', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 648, sourceColumn: 2, sourceEndLine: 648};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-08.08f'}) SET n:Rom SET n += {file: 'g-08.08f', offset: 1792, size: 256, crc: 'ef91cdd2', sha1: '90b9191c9f10a153d64055a4238eb6e15b8c12bc', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 649, sourceColumn: 2, sourceEndLine: 649};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-10.02j'}) SET n:Rom SET n += {file: 'g-10.02j', offset: 2048, size: 256, crc: '0eaf5158', sha1: 'bafd4108708f66cd7b280e47152b108f3e254fc9', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 650, sourceColumn: 2, sourceEndLine: 650};
MERGE (n:KG {id: 'rom:gunsmoke/proms/g-05.01f'}) SET n:Rom SET n += {file: 'g-05.01f', offset: 2304, size: 256, crc: '25c90c2a', sha1: '42893572bab757ec01e181fc418cb911638d37e0', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 651, sourceColumn: 2, sourceEndLine: 651};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map'}) SET n:AddressMap SET n += {cls: 'gunsmoke_state', name: 'main_map', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 364, sourceColumn: 1, sourceEndLine: 384};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 366, sourceColumn: 2, sourceEndLine: 366, rom: true};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 49151, raw: 'map(0x8000, 0xbfff).bankr(m_mainbank)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 367, sourceColumn: 2, sourceEndLine: 367, bankRead: 'mainbank'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range2'}) SET n:AddressRange SET n += {start: 49152, end: 49152, raw: 'map(0xc000, 0xc000).portr("SYSTEM")', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 368, sourceColumn: 2, sourceEndLine: 368, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range3'}) SET n:AddressRange SET n += {start: 49153, end: 49153, raw: 'map(0xc001, 0xc001).portr("P1")', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 369, sourceColumn: 2, sourceEndLine: 369, portRead: 'P1'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range4'}) SET n:AddressRange SET n += {start: 49154, end: 49154, raw: 'map(0xc002, 0xc002).portr("P2")', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 370, sourceColumn: 2, sourceEndLine: 370, portRead: 'P2'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range5'}) SET n:AddressRange SET n += {start: 49155, end: 49155, raw: 'map(0xc003, 0xc003).portr("DSW1")', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 371, sourceColumn: 2, sourceEndLine: 371, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range6'}) SET n:AddressRange SET n += {start: 49156, end: 49156, raw: 'map(0xc004, 0xc004).portr("DSW2")', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 372, sourceColumn: 2, sourceEndLine: 372, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range7'}) SET n:AddressRange SET n += {start: 50377, end: 50379, raw: 'map(0xc4c9, 0xc4cb).r(FUNC(gunsmoke_state::protection_r))', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 373, sourceColumn: 2, sourceEndLine: 373};
MERGE (n:KG {id: 'handler:gunsmoke_state.protection_r'}) SET n:Handler SET n += {method: 'protection_r', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 341, sourceColumn: 1, sourceEndLine: 360, sourceParameters: 'offs_t offset', sourceBody: '/*
	    The routine at 0x0e69 tries to read data starting at 0xc4c9.
	    If this value is zero, it interprets the next two bytes as a
	    jump address.

	    This was resulting in a reboot which happens at the end of level 3
	    if you go too far to the right of the screen when fighting the level boss.

	    A non-zero for the first byte seems to be harmless
	    (although it may not be the correct behaviour).

	    This could be some devious protection or it could be a bug in the
	    arcade game.  It\'s hard to tell without pulling the code apart.
	*/

	
	return TABLE(offset, 0xff, 0x00, 0x00);'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range8'}) SET n:AddressRange SET n += {start: 51200, end: 51200, raw: 'map(0xc800, 0xc800).w("soundlatch", FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 374, sourceColumn: 2, sourceEndLine: 374};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 374, sourceColumn: 2, sourceEndLine: 374};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range9'}) SET n:AddressRange SET n += {start: 51204, end: 51204, raw: 'map(0xc804, 0xc804).w(FUNC(gunsmoke_state::control_w))', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 375, sourceColumn: 2, sourceEndLine: 375};
MERGE (n:KG {id: 'handler:gunsmoke_state.control_w'}) SET n:Handler SET n += {method: 'control_w', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 225, sourceColumn: 1, sourceEndLine: 241, sourceParameters: 'uint8_t data', sourceBody: '// bits 0 and 1 are for coin counters
	machine().bookkeeping().coin_counter_w(1, data & 0x01);
	machine().bookkeeping().coin_counter_w(0, data & 0x02);

	// bits 2 and 3 select the ROM bank
	m_mainbank->set_entry((data & 0x0c) >> 2);

	// bit 5 resets the sound CPU? - we ignore it

	// bit 6 flips screen
	flip_screen_set(data & 0x40);

	// bit 7 enables characters?
	m_chon = data & 0x80;'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range10'}) SET n:AddressRange SET n += {start: 51206, end: 51206, raw: 'map(0xc806, 0xc806).w(m_spriteram, FUNC(buffered_spriteram8_device::write))', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 376, sourceColumn: 2, sourceEndLine: 376};
MERGE (n:KG {id: 'handler:buffered_spriteram8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'buffered_spriteram8_device', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 376, sourceColumn: 2, sourceEndLine: 376};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range11'}) SET n:AddressRange SET n += {start: 53248, end: 54271, raw: 'map(0xd000, 0xd3ff).ram().w(FUNC(gunsmoke_state::videoram_w)).share(m_videoram)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 377, sourceColumn: 2, sourceEndLine: 377, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:gunsmoke_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 213, sourceColumn: 1, sourceEndLine: 217, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range12'}) SET n:AddressRange SET n += {start: 54272, end: 55295, raw: 'map(0xd400, 0xd7ff).ram().w(FUNC(gunsmoke_state::colorram_w)).share(m_colorram)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 378, sourceColumn: 2, sourceEndLine: 378, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:gunsmoke_state.colorram_w'}) SET n:Handler SET n += {method: 'colorram_w', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 219, sourceColumn: 1, sourceEndLine: 223, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range13'}) SET n:AddressRange SET n += {start: 55296, end: 55297, raw: 'map(0xd800, 0xd801).ram().share(m_scrollx)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 379, sourceColumn: 2, sourceEndLine: 379, ram: true, share: 'scrollx'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range14'}) SET n:AddressRange SET n += {start: 55298, end: 55298, raw: 'map(0xd802, 0xd802).ram().share(m_scrolly)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 380, sourceColumn: 2, sourceEndLine: 380, ram: true, share: 'scrolly'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range15'}) SET n:AddressRange SET n += {start: 55302, end: 55302, raw: 'map(0xd806, 0xd806).w(FUNC(gunsmoke_state::layer_w))', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 381, sourceColumn: 2, sourceEndLine: 381};
MERGE (n:KG {id: 'handler:gunsmoke_state.layer_w'}) SET n:Handler SET n += {method: 'layer_w', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 243, sourceColumn: 1, sourceEndLine: 253, sourceParameters: 'uint8_t data', sourceBody: '// bits 0-2 select the sprite 3 bank
	m_sprite3bank = data & 0x07;

	// bit 4 enables bg 1?
	m_bgon = data & 0x10;

	// bit 5 enables sprites?
	m_objon = data & 0x20;'};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range16'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).ram()', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 382, sourceColumn: 2, sourceEndLine: 382, ram: true};
MERGE (n:KG {id: 'map:gunsmoke_state.main_map/range17'}) SET n:AddressRange SET n += {start: 61440, end: 65535, raw: 'map(0xf000, 0xffff).ram().share("spriteram")', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 383, sourceColumn: 2, sourceEndLine: 383, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:gunsmoke_state.sound_map'}) SET n:AddressMap SET n += {cls: 'gunsmoke_state', name: 'sound_map', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 386, sourceColumn: 1, sourceEndLine: 393};
MERGE (n:KG {id: 'map:gunsmoke_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 388, sourceColumn: 2, sourceEndLine: 388, rom: true};
MERGE (n:KG {id: 'map:gunsmoke_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 49152, end: 51199, raw: 'map(0xc000, 0xc7ff).ram()', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 389, sourceColumn: 2, sourceEndLine: 389, ram: true};
MERGE (n:KG {id: 'map:gunsmoke_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 51200, end: 51200, raw: 'map(0xc800, 0xc800).r("soundlatch", FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 390, sourceColumn: 2, sourceEndLine: 390};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 390, sourceColumn: 2, sourceEndLine: 390};
MERGE (n:KG {id: 'map:gunsmoke_state.sound_map/range3'}) SET n:AddressRange SET n += {start: 57344, end: 57345, raw: 'map(0xe000, 0xe001).w("ym1", FUNC(ym2203_device::write))', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 391, sourceColumn: 2, sourceEndLine: 391};
MERGE (n:KG {id: 'handler:ym2203_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2203_device', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 392, sourceColumn: 2, sourceEndLine: 392};
MERGE (n:KG {id: 'map:gunsmoke_state.sound_map/range4'}) SET n:AddressRange SET n += {start: 57346, end: 57347, raw: 'map(0xe002, 0xe003).w("ym2", FUNC(ym2203_device::write))', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 392, sourceColumn: 2, sourceEndLine: 392};
MERGE (n:KG {id: 'machine:gunsmoke_state.gunsmoke'}) SET n:MachineConfig SET n += {cls: 'gunsmoke_state', name: 'gunsmoke', calls: [], stateMembers: ['{"name":"m_chon","bits":8}', '{"name":"m_objon","bits":8}', '{"name":"m_bgon","bits":8}', '{"name":"m_sprite3bank","bits":8}'], resetHandlers: ['gunsmoke_state.machine_reset'], startHandlers: ['gunsmoke_state.video_start'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 560, sourceColumn: 1, sourceEndLine: 601};
MERGE (n:KG {id: 'handler:gunsmoke_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 552, sourceColumn: 1, sourceEndLine: 558, sourceParameters: '', sourceBody: 'm_chon = 0;
	m_objon = 0;
	m_bgon = 0;
	m_sprite3bank = 0;'};
MERGE (n:KG {id: 'handler:gunsmoke_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 279, sourceColumn: 1, sourceEndLine: 285, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(gunsmoke_state::get_bg_tile_info)), TILEMAP_SCAN_COLS, 32, 32, 2048, 8);
	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(gunsmoke_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);

	m_fg_tilemap->configure_groups(*m_gfxdecode->gfx(0), 0x4f);'};
MERGE (n:KG {id: 'handler:gunsmoke_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 255, sourceColumn: 1, sourceEndLine: 266, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t *tilerom = memregion("bgtiles")->base();

	int offs = tile_index * 2;
	int attr = tilerom[offs + 1];
	int code = tilerom[offs] + ((attr & 0x01) << 8);
	int color = (attr & 0x3c) >> 2;
	int flags = TILE_FLIPYX((attr & 0xc0) >> 6);

	tileinfo.set(1, code, color, flags);'};
MERGE (n:KG {id: 'handler:gunsmoke_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 268, sourceColumn: 1, sourceEndLine: 277, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int attr = m_colorram[tile_index];
	int code = m_videoram[tile_index] + ((attr & 0xe0) << 2);
	int color = attr & 0x1f;

	tileinfo.group = color;

	tileinfo.set(0, code, color, 0);'};
MERGE (n:KG {id: 'bank:gunsmoke_state.gunsmoke/mainbank'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 0, entries: 4, region: 'maincpu', offset: 32768, stride: 16384, raw: 'm_mainbank->configure_entries(0, 4, &rombase[0x8000], 0x4000)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 540, sourceColumn: 1, sourceEndLine: 550};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3000000, config: ['Z80(config, m_maincpu, 12_MHz_XTAL / 4)', 'm_maincpu->set_addrmap(AS_PROGRAM, &gunsmoke_state::main_map)', 'm_maincpu->set_vblank_int("screen", FUNC(gunsmoke_state::irq0_line_hold))'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 563, sourceColumn: 2, sourceEndLine: 563};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(gunsmoke_state::irq0_line_hold))', ownerTag: 'maincpu', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 565, sourceColumn: 2, sourceEndLine: 565, targetTag: 'screen', targetClass: 'gunsmoke_state', targetMethod: 'irq0_line_hold'};
MERGE (n:KG {id: 'handler:gunsmoke_state.irq0_line_hold'}) SET n:Handler SET n += {method: 'irq0_line_hold', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 571, sourceColumn: 2, sourceEndLine: 571};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3000000, config: ['Z80(config, m_audiocpu, 12_MHz_XTAL / 4)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &gunsmoke_state::sound_map)', 'm_audiocpu->set_periodic_int(FUNC(gunsmoke_state::irq0_line_hold), audio_irq_period)'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 567, sourceColumn: 2, sourceEndLine: 567};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/audiocpu/callback:audiocpu:0'}) SET n:Callback SET n += {signal: 'set_periodic_int', operation: 'set_periodic_int', raw: 'm_audiocpu->set_periodic_int(FUNC(gunsmoke_state::irq0_line_hold), audio_irq_period)', ownerTag: 'audiocpu', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 571, sourceColumn: 2, sourceEndLine: 571, periodHz: 238.54961832061068, periodExpr: 'attotime::from_ticks(384 * 262 / 4, 12_MHz_XTAL / 2)', targetClass: 'gunsmoke_state', targetMethod: 'irq0_line_hold'};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/spriteram'}) SET n:Device SET n += {type: 'BUFFERED_SPRITERAM8', tag: 'spriteram', clock: null, config: ['BUFFERED_SPRITERAM8(config, m_spriteram)'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 574, sourceColumn: 2, sourceEndLine: 574};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(12_MHz_XTAL / 2, 384, 0, 256, 262, 16, 240)', 'screen.set_screen_update(FUNC(gunsmoke_state::screen_update))', 'screen.set_palette(m_palette)'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 576, sourceColumn: 2, sourceEndLine: 576, configCalls: ['set_raw(6000000,384,0,256,262,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 262, 16, 240], screenRawExpr: ['12_MHz_XTAL / 2', '384', '0', '256', '262', '16', '240']};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(gunsmoke_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 578, sourceColumn: 2, sourceEndLine: 578, targetClass: 'gunsmoke_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:gunsmoke_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 319, sourceColumn: 1, sourceEndLine: 336, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->set_scrollx(0, m_scrollx[0] + 256 * m_scrollx[1]);
	m_bg_tilemap->set_scrolly(0, m_scrolly[0]);

	if (m_bgon)
		m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	else
		bitmap.fill(m_palette->black_pen(), cliprect);

	if (m_objon)
		draw_sprites(bitmap, cliprect);

	if (m_chon)
		m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	return 0;'};
MERGE (n:KG {id: 'handler:gunsmoke_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 287, sourceColumn: 1, sourceEndLine: 317, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'const u8 *spriteram = m_spriteram->buffer();

	for (int offs = m_spriteram->bytes() - 32; offs >= 0; offs -= 32)
	{
		int attr = spriteram[offs + 1];
		int bank = (attr & 0xc0) >> 6;
		int code = spriteram[offs];
		int color = attr & 0x0f;
		int flipx = 0;
		int flipy = attr & 0x10;
		int sx = spriteram[offs + 3] - ((attr & 0x20) << 3);
		int sy = spriteram[offs + 2];

		if (bank == 3)
			bank += m_sprite3bank;

		code += 256 * bank;

		if (flip_screen())
		{
			sx = 240 - sx;
			sy = 240 - sy;
			flipx = !flipx;
			flipy = !flipy;
		}

		m_gfxdecode->gfx(2)->transpen(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0);
	}'};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_gunsmoke)'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 581, sourceColumn: 2, sourceEndLine: 581, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(gunsmoke_state::palette), 32*4 + 16*16 + 16*16, 256)'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 583, sourceColumn: 2, sourceEndLine: 583, clockExpr: 'FUNC(gunsmoke_state::palette)'};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 586, sourceColumn: 2, sourceEndLine: 586};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, "soundlatch")'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 588, sourceColumn: 2, sourceEndLine: 588};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/ym1'}) SET n:Device SET n += {type: 'YM2203', tag: 'ym1', clock: 1500000, config: ['ym2203_device &ym1(YM2203(config, "ym1", 12_MHz_XTAL / 8))', 'ym1.add_route(0, "mono", 0.22)', 'ym1.add_route(1, "mono", 0.22)', 'ym1.add_route(2, "mono", 0.22)', 'ym1.add_route(3, "mono", 0.14)'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 590, sourceColumn: 2, sourceEndLine: 590};
MERGE (n:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym1/0'}) SET n:AudioRoute SET n += {output: '0', target: 'mono', gain: 0.22, raw: 'ym1.add_route(0, "mono", 0.22)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591};
MERGE (n:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym1/1'}) SET n:AudioRoute SET n += {output: '1', target: 'mono', gain: 0.22, raw: 'ym1.add_route(1, "mono", 0.22)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 592, sourceColumn: 2, sourceEndLine: 592};
MERGE (n:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym1/2'}) SET n:AudioRoute SET n += {output: '2', target: 'mono', gain: 0.22, raw: 'ym1.add_route(2, "mono", 0.22)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 593, sourceColumn: 2, sourceEndLine: 593};
MERGE (n:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym1/3'}) SET n:AudioRoute SET n += {output: '3', target: 'mono', gain: 0.14, raw: 'ym1.add_route(3, "mono", 0.14)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 594, sourceColumn: 2, sourceEndLine: 594};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/ym2'}) SET n:Device SET n += {type: 'YM2203', tag: 'ym2', clock: 1500000, config: ['ym2203_device &ym2(YM2203(config, "ym2", 12_MHz_XTAL / 8))', 'ym2.add_route(0, "mono", 0.22)', 'ym2.add_route(1, "mono", 0.22)', 'ym2.add_route(2, "mono", 0.22)', 'ym2.add_route(3, "mono", 0.14)'], sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 596, sourceColumn: 2, sourceEndLine: 596};
MERGE (n:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym2/0'}) SET n:AudioRoute SET n += {output: '0', target: 'mono', gain: 0.22, raw: 'ym2.add_route(0, "mono", 0.22)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 597, sourceColumn: 2, sourceEndLine: 597};
MERGE (n:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym2/1'}) SET n:AudioRoute SET n += {output: '1', target: 'mono', gain: 0.22, raw: 'ym2.add_route(1, "mono", 0.22)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 598, sourceColumn: 2, sourceEndLine: 598};
MERGE (n:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym2/2'}) SET n:AudioRoute SET n += {output: '2', target: 'mono', gain: 0.22, raw: 'ym2.add_route(2, "mono", 0.22)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 599, sourceColumn: 2, sourceEndLine: 599};
MERGE (n:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym2/3'}) SET n:AudioRoute SET n += {output: '3', target: 'mono', gain: 0.14, raw: 'ym2.add_route(3, "mono", 0.14)', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 600, sourceColumn: 2, sourceEndLine: 600};
MERGE (n:KG {id: 'inputs:gunsmoke'}) SET n:InputPorts SET n += {name: 'gunsmoke', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 397, sourceColumn: 8, sourceEndLine: 397};
MERGE (n:KG {id: 'inputs:gunsmoke/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:gunsmoke/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:gunsmoke/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:gunsmoke/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNUSED', defaultValue: 4};
MERGE (n:KG {id: 'inputs:gunsmoke/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_CUSTOM', defaultValue: 8};
MERGE (n:KG {id: 'inputs:gunsmoke/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:gunsmoke/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNUSED', defaultValue: 32};
MERGE (n:KG {id: 'inputs:gunsmoke/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:gunsmoke/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN2', defaultValue: 128};
MERGE (n:KG {id: 'inputs:gunsmoke/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:gunsmoke/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:gunsmoke/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:gunsmoke/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:gunsmoke/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:gunsmoke/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:gunsmoke/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:gunsmoke/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', defaultValue: 64};
MERGE (n:KG {id: 'inputs:gunsmoke/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED', defaultValue: 128};
MERGE (n:KG {id: 'inputs:gunsmoke/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:gunsmoke/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:gunsmoke/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:gunsmoke/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:gunsmoke/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:gunsmoke/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:gunsmoke/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:gunsmoke/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_COCKTAIL'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:gunsmoke/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED', defaultValue: 128};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Bonus Life', defaultValue: 3, settings: ['1=30K 80K 80K+', '3=30K 100K 100K+', '0=30K 100K 150K+', '2=30K 100K']};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Demo', defaultValue: 4, settings: ['0=Off', '4=On']};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Cabinet', defaultValue: 0, settings: ['0=Upright', '8=Cocktail']};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 48, name: 'Difficulty', defaultValue: 48, settings: ['32=Easy', '48=Normal', '16=Difficult', '0=Very Difficult']};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Freeze', defaultValue: 64, settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW1/f5'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true, defaultValue: 128};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, name: 'Coin A', defaultValue: 7, settings: ['0=4C 1C', '1=3C 1C', '2=2C 1C', '7=1C 1C', '6=1C 2C', '5=1C 3C', '4=1C 4C', '3=1C 6C']};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 56, name: 'Coin B', defaultValue: 56, settings: ['0=4C 1C', '8=3C 1C', '16=2C 1C', '56=1C 1C', '48=1C 2C', '40=1C 3C', '32=1C 4C', '24=1C 6C']};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Allow Continue', defaultValue: 64, settings: ['0=No', '64=Yes']};
MERGE (n:KG {id: 'inputs:gunsmoke/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Demo Sounds', defaultValue: 128, settings: ['0=Off', '128=On']};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 1024, planes: 2, planeOffsets: [4, 0], xOffsets: [11, 10, 9, 8, 3, 2, 1, 0], yOffsets: [112, 96, 80, 64, 48, 32, 16, 0], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:tilelayout'}) SET n:GfxLayout SET n += {name: 'tilelayout', width: 32, height: 32, total: 512, planes: 4, planeOffsets: [1048580, 1048576, 4, 0], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11, 512, 513, 514, 515, 520, 521, 522, 523, 1024, 1025, 1026, 1027, 1032, 1033, 1034, 1035, 1536, 1537, 1538, 1539, 1544, 1545, 1546, 1547], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 304, 320, 336, 352, 368, 384, 400, 416, 432, 448, 464, 480, 496], charIncrement: 2048};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 2048, planes: 4, planeOffsets: [1048580, 1048576, 4, 0], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11, 256, 257, 258, 259, 264, 265, 266, 267], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_gunsmoke'}) SET n:GfxDecode SET n += {name: 'gfx_gunsmoke', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 532, sourceColumn: 8, sourceEndLine: 532};
MERGE (n:KG {id: 'gfxdecode:gfx_gunsmoke/e0'}) SET n:GfxDecodeEntry SET n += {region: 'chars', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 32, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_gunsmoke/e1'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'tilelayout', colorBase: 128, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_gunsmoke/e2'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'spritelayout', colorBase: 384, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:gunsmoke_state.gunsmoke/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(gunsmoke_state::palette), 32*4 + 16*16 + 16*16, 256)', ownerTag: 'palette', targetClass: 'gunsmoke_state', targetMethod: 'palette', entries: 256, sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 583};
MERGE (n:KG {id: 'handler:gunsmoke_state.palette'}) SET n:Handler SET n += {method: 'palette', ownerClass: 'gunsmoke_state', sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 174, sourceColumn: 1, sourceEndLine: 211, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();

	// create a lookup table for the palette
	for (int i = 0; i < 0x100; i++)
	{
		int const r = pal4bit(color_prom[i + 0x000]);
		int const g = pal4bit(color_prom[i + 0x100]);
		int const b = pal4bit(color_prom[i + 0x200]);

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	// color_prom now points to the beginning of the lookup table
	color_prom += 0x300;

	// characters use colors 0x40-0x4f
	for (int i = 0; i < 0x80; i++)
	{
		uint8_t const ctabentry = color_prom[i] | 0x40;
		palette.set_pen_indirect(i, ctabentry);
	}

	// background tiles use colors 0-0x3f
	for (int i = 0x100; i < 0x200; i++)
	{
		uint8_t const ctabentry = color_prom[i] | ((color_prom[i + 0x100] & 0x03) << 4);
		palette.set_pen_indirect(i - 0x80, ctabentry);
	}

	// sprites use colors 0x80-0xff
	for (int i = 0x300; i < 0x400; i++)
	{
		uint8_t const ctabentry = color_prom[i] | ((color_prom[i + 0x100] & 0x07) << 4) | 0x80;
		palette.set_pen_indirect(i - 0x180, ctabentry);
	}'};
MATCH (a:KG {id: 'game:gunsmoke'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 1005, sourceColumn: 1, sourceEndLine: 1005};
MATCH (a:KG {id: 'game:gunsmoke'}), (b:KG {id: 'machine:gunsmoke_state.gunsmoke'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:gunsmoke'}), (b:KG {id: 'inputs:gunsmoke'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:gunsmoke'}), (b:KG {id: 'romset:gunsmoke'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}), (b:KG {id: 'file:sound/ymopn.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}), (b:KG {id: 'file:video/bufsprite.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 560, sourceColumn: 1, sourceEndLine: 601};
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'handler:gunsmoke_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'handler:gunsmoke_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'bank:gunsmoke_state.gunsmoke/mainbank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/spriteram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'gfxdecode:gfx_gunsmoke'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/ym1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gunsmoke_state.gunsmoke'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/ym2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 397, sourceColumn: 8, sourceEndLine: 397};
MATCH (a:KG {id: 'inputs:gunsmoke'}), (b:KG {id: 'inputs:gunsmoke/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke'}), (b:KG {id: 'inputs:gunsmoke/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke'}), (b:KG {id: 'inputs:gunsmoke/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke'}), (b:KG {id: 'inputs:gunsmoke/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke'}), (b:KG {id: 'inputs:gunsmoke/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:gunsmoke'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 605, sourceColumn: 1, sourceEndLine: 605};
MATCH (a:KG {id: 'romset:gunsmoke'}), (b:KG {id: 'region:gunsmoke/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gunsmoke'}), (b:KG {id: 'region:gunsmoke/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gunsmoke'}), (b:KG {id: 'region:gunsmoke/chars'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gunsmoke'}), (b:KG {id: 'region:gunsmoke/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gunsmoke'}), (b:KG {id: 'region:gunsmoke/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gunsmoke'}), (b:KG {id: 'region:gunsmoke/bgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gunsmoke'}), (b:KG {id: 'region:gunsmoke/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:gunsmoke_state.video_start'}), (b:KG {id: 'handler:gunsmoke_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:gunsmoke_state.video_start'}), (b:KG {id: 'handler:gunsmoke_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:gunsmoke_state.gunsmoke/mainbank'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 540, sourceColumn: 1, sourceEndLine: 550};
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/maincpu'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/maincpu'}), (b:KG {id: 'map:gunsmoke_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/audiocpu'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/audiocpu/callback:audiocpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/audiocpu'}), (b:KG {id: 'map:gunsmoke_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/screen'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gunsmoke'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 532, sourceColumn: 8, sourceEndLine: 532};
MATCH (a:KG {id: 'gfxdecode:gfx_gunsmoke'}), (b:KG {id: 'gfxdecode:gfx_gunsmoke/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gunsmoke'}), (b:KG {id: 'gfxdecode:gfx_gunsmoke/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gunsmoke'}), (b:KG {id: 'gfxdecode:gfx_gunsmoke/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/palette'}), (b:KG {id: 'device:gunsmoke_state.gunsmoke/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/ym1'}), (b:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/ym1'}), (b:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym1/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/ym1'}), (b:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym1/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/ym1'}), (b:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym1/3'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/ym2'}), (b:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/ym2'}), (b:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym2/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/ym2'}), (b:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym2/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/ym2'}), (b:KG {id: 'audioroute:device:gunsmoke_state.gunsmoke/ym2/3'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/SYSTEM'}), (b:KG {id: 'inputs:gunsmoke/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/SYSTEM'}), (b:KG {id: 'inputs:gunsmoke/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/SYSTEM'}), (b:KG {id: 'inputs:gunsmoke/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/SYSTEM'}), (b:KG {id: 'inputs:gunsmoke/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/SYSTEM'}), (b:KG {id: 'inputs:gunsmoke/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/SYSTEM'}), (b:KG {id: 'inputs:gunsmoke/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/SYSTEM'}), (b:KG {id: 'inputs:gunsmoke/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/SYSTEM'}), (b:KG {id: 'inputs:gunsmoke/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P1'}), (b:KG {id: 'inputs:gunsmoke/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P1'}), (b:KG {id: 'inputs:gunsmoke/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P1'}), (b:KG {id: 'inputs:gunsmoke/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P1'}), (b:KG {id: 'inputs:gunsmoke/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P1'}), (b:KG {id: 'inputs:gunsmoke/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P1'}), (b:KG {id: 'inputs:gunsmoke/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P1'}), (b:KG {id: 'inputs:gunsmoke/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P1'}), (b:KG {id: 'inputs:gunsmoke/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P2'}), (b:KG {id: 'inputs:gunsmoke/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P2'}), (b:KG {id: 'inputs:gunsmoke/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P2'}), (b:KG {id: 'inputs:gunsmoke/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P2'}), (b:KG {id: 'inputs:gunsmoke/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P2'}), (b:KG {id: 'inputs:gunsmoke/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P2'}), (b:KG {id: 'inputs:gunsmoke/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P2'}), (b:KG {id: 'inputs:gunsmoke/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/P2'}), (b:KG {id: 'inputs:gunsmoke/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW1'}), (b:KG {id: 'inputs:gunsmoke/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW1'}), (b:KG {id: 'inputs:gunsmoke/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW1'}), (b:KG {id: 'inputs:gunsmoke/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW1'}), (b:KG {id: 'inputs:gunsmoke/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW1'}), (b:KG {id: 'inputs:gunsmoke/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW1'}), (b:KG {id: 'inputs:gunsmoke/DSW1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW2'}), (b:KG {id: 'inputs:gunsmoke/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW2'}), (b:KG {id: 'inputs:gunsmoke/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW2'}), (b:KG {id: 'inputs:gunsmoke/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gunsmoke/DSW2'}), (b:KG {id: 'inputs:gunsmoke/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:gunsmoke/maincpu'}), (b:KG {id: 'rom:gunsmoke/maincpu/gs03.09n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/maincpu'}), (b:KG {id: 'rom:gunsmoke/maincpu/gs04.10n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/maincpu'}), (b:KG {id: 'rom:gunsmoke/maincpu/gs05.12n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/audiocpu'}), (b:KG {id: 'rom:gunsmoke/audiocpu/gs02.14h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/chars'}), (b:KG {id: 'rom:gunsmoke/chars/gs01.11f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/tiles'}), (b:KG {id: 'rom:gunsmoke/tiles/gs13.06c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/tiles'}), (b:KG {id: 'rom:gunsmoke/tiles/gs12.05c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/tiles'}), (b:KG {id: 'rom:gunsmoke/tiles/gs11.04c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/tiles'}), (b:KG {id: 'rom:gunsmoke/tiles/gs10.02c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/tiles'}), (b:KG {id: 'rom:gunsmoke/tiles/gs09.06a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/tiles'}), (b:KG {id: 'rom:gunsmoke/tiles/gs08.05a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/tiles'}), (b:KG {id: 'rom:gunsmoke/tiles/gs07.04a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/tiles'}), (b:KG {id: 'rom:gunsmoke/tiles/gs06.02a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/sprites'}), (b:KG {id: 'rom:gunsmoke/sprites/gs22.06n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/sprites'}), (b:KG {id: 'rom:gunsmoke/sprites/gs21.04n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/sprites'}), (b:KG {id: 'rom:gunsmoke/sprites/gs20.03n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/sprites'}), (b:KG {id: 'rom:gunsmoke/sprites/gs19.01n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/sprites'}), (b:KG {id: 'rom:gunsmoke/sprites/gs18.06l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/sprites'}), (b:KG {id: 'rom:gunsmoke/sprites/gs17.04l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/sprites'}), (b:KG {id: 'rom:gunsmoke/sprites/gs16.03l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/sprites'}), (b:KG {id: 'rom:gunsmoke/sprites/gs15.01l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/bgtiles'}), (b:KG {id: 'rom:gunsmoke/bgtiles/gs14.11c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-01.03b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-02.04b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-03.05b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-04.09d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-06.14a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-07.15a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-09.09f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-08.08f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-10.02j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gunsmoke/proms'}), (b:KG {id: 'rom:gunsmoke/proms/g-05.01f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:gunsmoke_state.irq0_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 364, sourceColumn: 1, sourceEndLine: 384};
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map'}), (b:KG {id: 'map:gunsmoke_state.main_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/audiocpu/callback:audiocpu:0'}), (b:KG {id: 'handler:gunsmoke_state.irq0_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.sound_map'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/gunsmoke.cpp', sourceLine: 386, sourceColumn: 1, sourceEndLine: 393};
MATCH (a:KG {id: 'map:gunsmoke_state.sound_map'}), (b:KG {id: 'map:gunsmoke_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.sound_map'}), (b:KG {id: 'map:gunsmoke_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.sound_map'}), (b:KG {id: 'map:gunsmoke_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.sound_map'}), (b:KG {id: 'map:gunsmoke_state.sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.sound_map'}), (b:KG {id: 'map:gunsmoke_state.sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/screen/callback:screen:0'}), (b:KG {id: 'handler:gunsmoke_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gunsmoke/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gunsmoke/e1'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gunsmoke/e2'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:gunsmoke_state.gunsmoke/palette/callback:palette_init'}), (b:KG {id: 'handler:gunsmoke_state.palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map/range7'}), (b:KG {id: 'handler:gunsmoke_state.protection_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map/range8'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:gunsmoke_state.main_map/range9'}), (b:KG {id: 'handler:gunsmoke_state.control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map/range10'}), (b:KG {id: 'handler:buffered_spriteram8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'spriteram'};
MATCH (a:KG {id: 'map:gunsmoke_state.main_map/range11'}), (b:KG {id: 'handler:gunsmoke_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map/range12'}), (b:KG {id: 'handler:gunsmoke_state.colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.main_map/range15'}), (b:KG {id: 'handler:gunsmoke_state.layer_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gunsmoke_state.sound_map/range2'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:gunsmoke_state.sound_map/range3'}), (b:KG {id: 'handler:ym2203_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ym1'};
MATCH (a:KG {id: 'map:gunsmoke_state.sound_map/range4'}), (b:KG {id: 'handler:ym2203_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ym2'};
MATCH (a:KG {id: 'handler:gunsmoke_state.screen_update'}), (b:KG {id: 'handler:gunsmoke_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:tilelayout'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/capcom/gunsmoke.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
