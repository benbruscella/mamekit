// mamekit knowledge graph — driver src/mame/konami/trackfld.cpp
// generated 2026-09-05T03:50:19.004Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/konami/trackfld.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/konami/trackfld.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:hyprolyb.h'}) SET n:SourceFile SET n += {path: 'hyprolyb.h', external: true};
MERGE (n:KG {id: 'file:konami1.h'}) SET n:SourceFile SET n += {path: 'konami1.h', external: true};
MERGE (n:KG {id: 'file:konamipt.h'}) SET n:SourceFile SET n += {path: 'konamipt.h', external: true};
MERGE (n:KG {id: 'file:trackfld_a.h'}) SET n:SourceFile SET n += {path: 'trackfld_a.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6800/m6800.h'}) SET n:SourceFile SET n += {path: 'cpu/m6800/m6800.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/m6809.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/m6809.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/timer.h'}) SET n:SourceFile SET n += {path: 'machine/timer.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:sound/vlm5030.h'}) SET n:SourceFile SET n += {path: 'sound/vlm5030.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'game:trackfld'}) SET n:Game SET n += {name: 'trackfld', year: '1983', company: 'Konami', fullname: 'Track & Field', monitor: 'ROT0', cls: 'trackfld_state', init: 'init_trackfld', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 2051, sourceColumn: 1, sourceEndLine: 2051};
MERGE (n:KG {id: 'romset:trackfld'}) SET n:RomSet SET n += {name: 'trackfld', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1439, sourceColumn: 1, sourceEndLine: 1439};
MERGE (n:KG {id: 'region:trackfld/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1440, sourceColumn: 2, sourceEndLine: 1440};
MERGE (n:KG {id: 'rom:trackfld/maincpu/a01_e01.bin'}) SET n:Rom SET n += {file: 'a01_e01.bin', offset: 24576, size: 8192, crc: '2882f6d4', sha1: 'f7ddae2c5412a2849efd7f9629e92a5b0328e7cb', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1441, sourceColumn: 2, sourceEndLine: 1441};
MERGE (n:KG {id: 'rom:trackfld/maincpu/a02_e02.bin'}) SET n:Rom SET n += {file: 'a02_e02.bin', offset: 32768, size: 8192, crc: '1743b5ee', sha1: '31301031a525f893c31461f634350f01a9492ef4', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1442, sourceColumn: 2, sourceEndLine: 1442};
MERGE (n:KG {id: 'rom:trackfld/maincpu/a03_k03.bin'}) SET n:Rom SET n += {file: 'a03_k03.bin', offset: 40960, size: 8192, crc: '6c0d1ee9', sha1: '380ab2162153a61910a6fe5b6d091ca9451ad4fd', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1443, sourceColumn: 2, sourceEndLine: 1443};
MERGE (n:KG {id: 'rom:trackfld/maincpu/a04_e04.bin'}) SET n:Rom SET n += {file: 'a04_e04.bin', offset: 49152, size: 8192, crc: '21d6c448', sha1: '6c42cc76302485954a31520bdd08469fa948c72f', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1444, sourceColumn: 2, sourceEndLine: 1444};
MERGE (n:KG {id: 'rom:trackfld/maincpu/a05_e05.bin'}) SET n:Rom SET n += {file: 'a05_e05.bin', offset: 57344, size: 8192, crc: 'f08c7b7e', sha1: '50e65d9b0ea37d2afb2dfdf1f3e1378e3290bc81', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1445, sourceColumn: 2, sourceEndLine: 1445};
MERGE (n:KG {id: 'region:trackfld/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1447, sourceColumn: 2, sourceEndLine: 1447};
MERGE (n:KG {id: 'rom:trackfld/audiocpu/c2_d13.bin'}) SET n:Rom SET n += {file: 'c2_d13.bin', offset: 0, size: 8192, crc: '95bf79b6', sha1: 'ea9135acd7ad162c19c5cdde356e69792d61b675', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1448, sourceColumn: 2, sourceEndLine: 1448};
MERGE (n:KG {id: 'region:trackfld/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 32768, flags: '0', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1450, sourceColumn: 2, sourceEndLine: 1450};
MERGE (n:KG {id: 'rom:trackfld/gfx1/c11_d06.bin'}) SET n:Rom SET n += {file: 'c11_d06.bin', offset: 0, size: 8192, crc: '82e2185a', sha1: '1da9ea20e7af0b49c62fb39834a7ec686491af04', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1451, sourceColumn: 2, sourceEndLine: 1451};
MERGE (n:KG {id: 'rom:trackfld/gfx1/c12_d07.bin'}) SET n:Rom SET n += {file: 'c12_d07.bin', offset: 8192, size: 8192, crc: '800ff1f1', sha1: '33d73b18903e3e6bfb30f1a06db4b8105d4040d8', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1452, sourceColumn: 2, sourceEndLine: 1452};
MERGE (n:KG {id: 'rom:trackfld/gfx1/c13_d08.bin'}) SET n:Rom SET n += {file: 'c13_d08.bin', offset: 16384, size: 8192, crc: 'd9faf183', sha1: '4448b6242790783d37acf50704d597af5878c2ab', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1453, sourceColumn: 2, sourceEndLine: 1453};
MERGE (n:KG {id: 'rom:trackfld/gfx1/c14_d09.bin'}) SET n:Rom SET n += {file: 'c14_d09.bin', offset: 24576, size: 8192, crc: '5886c802', sha1: '884a12a8f63600da4f23b29be6dbaacef37add20', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1454, sourceColumn: 2, sourceEndLine: 1454};
MERGE (n:KG {id: 'region:trackfld/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 24576, flags: '0', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1456, sourceColumn: 2, sourceEndLine: 1456};
MERGE (n:KG {id: 'rom:trackfld/gfx2/h16_e12.bin'}) SET n:Rom SET n += {file: 'h16_e12.bin', offset: 0, size: 8192, crc: '50075768', sha1: 'dfff92c0f59dd3d8d3d6256944bfd48792cef6a9', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1457, sourceColumn: 2, sourceEndLine: 1457};
MERGE (n:KG {id: 'rom:trackfld/gfx2/h15_e11.bin'}) SET n:Rom SET n += {file: 'h15_e11.bin', offset: 8192, size: 8192, crc: 'dda9e29f', sha1: '0f41cde82bb60c3f1591ee14dc3cff4642bbddc1', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1458, sourceColumn: 2, sourceEndLine: 1458};
MERGE (n:KG {id: 'rom:trackfld/gfx2/h14_e10.bin'}) SET n:Rom SET n += {file: 'h14_e10.bin', offset: 16384, size: 8192, crc: 'c2166a5c', sha1: '5ba25900e653ce4edcf35f1fbce758a327a715ce', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1459, sourceColumn: 2, sourceEndLine: 1459};
MERGE (n:KG {id: 'region:trackfld/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 544, flags: '0', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1461, sourceColumn: 2, sourceEndLine: 1461};
MERGE (n:KG {id: 'rom:trackfld/proms/361b16.f1'}) SET n:Rom SET n += {file: '361b16.f1', offset: 0, size: 32, crc: 'd55f30b5', sha1: '4d6a851f4886778307f75771645078b97ad55f5f', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1462, sourceColumn: 2, sourceEndLine: 1462};
MERGE (n:KG {id: 'rom:trackfld/proms/361b17.b16'}) SET n:Rom SET n += {file: '361b17.b16', offset: 32, size: 256, crc: 'd2ba4d32', sha1: '894b5cedf01ba9225a0d6215291857e455b84903', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1463, sourceColumn: 2, sourceEndLine: 1463};
MERGE (n:KG {id: 'rom:trackfld/proms/361b18.e15'}) SET n:Rom SET n += {file: '361b18.e15', offset: 288, size: 256, crc: '053e5861', sha1: '6740a62cf7b6938a4f936a2fed429704612060a5', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1464, sourceColumn: 2, sourceEndLine: 1464};
MERGE (n:KG {id: 'region:trackfld/vlm'}) SET n:RomRegion SET n += {tag: 'vlm', size: 8192, flags: '0', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1466, sourceColumn: 2, sourceEndLine: 1466};
MERGE (n:KG {id: 'rom:trackfld/vlm/c9_d15.bin'}) SET n:Rom SET n += {file: 'c9_d15.bin', offset: 0, size: 8192, crc: 'f546a56b', sha1: 'caee3d8546eb7a75ce2a578c6a1a630246aec6b8', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1467, sourceColumn: 2, sourceEndLine: 1467};
MERGE (n:KG {id: 'map:trackfld_state.main_map'}) SET n:AddressMap SET n += {cls: 'trackfld_state', name: 'main_map', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 577, sourceColumn: 1, sourceEndLine: 598};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range0'}) SET n:AddressRange SET n += {start: 4096, end: 4096, raw: 'map(0x1000, 0x1000).mirror(0x007f).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 579, sourceColumn: 2, sourceEndLine: 579, mirror: 127};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 708, sourceColumn: 2, sourceEndLine: 708};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range1'}) SET n:AddressRange SET n += {start: 4224, end: 4231, raw: 'map(0x1080, 0x1087).mirror(0x0078).w(m_mainlatch, FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 580, sourceColumn: 2, sourceEndLine: 580, mirror: 120};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 709, sourceColumn: 2, sourceEndLine: 709};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range2'}) SET n:AddressRange SET n += {start: 4352, end: 4352, raw: 'map(0x1100, 0x1100).mirror(0x007f).w("soundlatch", FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 581, sourceColumn: 2, sourceEndLine: 581, mirror: 127};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 710, sourceColumn: 2, sourceEndLine: 710};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range3'}) SET n:AddressRange SET n += {start: 4608, end: 4608, raw: 'map(0x1200, 0x1200).mirror(0x007f).portr("DSW2")', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 582, sourceColumn: 2, sourceEndLine: 582, mirror: 127, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range4'}) SET n:AddressRange SET n += {start: 4736, end: 4736, raw: 'map(0x1280, 0x1280).mirror(0x007c).portr("SYSTEM")', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 583, sourceColumn: 2, sourceEndLine: 583, mirror: 124, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range5'}) SET n:AddressRange SET n += {start: 4737, end: 4737, raw: 'map(0x1281, 0x1281).mirror(0x007c).portr("IN0")', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 584, sourceColumn: 2, sourceEndLine: 584, mirror: 124, portRead: 'IN0'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range6'}) SET n:AddressRange SET n += {start: 4738, end: 4738, raw: 'map(0x1282, 0x1282).mirror(0x007c).portr("IN1")', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 585, sourceColumn: 2, sourceEndLine: 585, mirror: 124, portRead: 'IN1'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range7'}) SET n:AddressRange SET n += {start: 4739, end: 4739, raw: 'map(0x1283, 0x1283).mirror(0x007c).portr("DSW1")', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 586, sourceColumn: 2, sourceEndLine: 586, mirror: 124, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range8'}) SET n:AddressRange SET n += {start: 6144, end: 6207, raw: 'map(0x1800, 0x183f).ram().share(m_spriteram2)', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 588, sourceColumn: 2, sourceEndLine: 588, ram: true, share: 'spriteram2'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range9'}) SET n:AddressRange SET n += {start: 6208, end: 6239, raw: 'map(0x1840, 0x185f).ram().share(m_scroll)', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 589, sourceColumn: 2, sourceEndLine: 589, ram: true, share: 'scroll'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range10'}) SET n:AddressRange SET n += {start: 6240, end: 7167, raw: 'map(0x1860, 0x1bff).ram()', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 590, sourceColumn: 2, sourceEndLine: 590, ram: true};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range11'}) SET n:AddressRange SET n += {start: 7168, end: 7231, raw: 'map(0x1c00, 0x1c3f).ram().share(m_spriteram)', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range12'}) SET n:AddressRange SET n += {start: 7232, end: 7263, raw: 'map(0x1c40, 0x1c5f).ram().share(m_scroll2)', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 592, sourceColumn: 2, sourceEndLine: 592, ram: true, share: 'scroll2'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range13'}) SET n:AddressRange SET n += {start: 7264, end: 8191, raw: 'map(0x1c60, 0x1fff).ram()', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 593, sourceColumn: 2, sourceEndLine: 593, ram: true};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range14'}) SET n:AddressRange SET n += {start: 10240, end: 12287, raw: 'map(0x2800, 0x2fff).ram().share("nvram")', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 594, sourceColumn: 2, sourceEndLine: 594, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range15'}) SET n:AddressRange SET n += {start: 12288, end: 14335, raw: 'map(0x3000, 0x37ff).ram().w(FUNC(trackfld_state::trackfld_videoram_w)).share(m_videoram)', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 595, sourceColumn: 2, sourceEndLine: 595, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:trackfld_state.trackfld_videoram_w'}) SET n:Handler SET n += {method: 'trackfld_videoram_w', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 401, sourceColumn: 1, sourceEndLine: 405, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range16'}) SET n:AddressRange SET n += {start: 14336, end: 16383, raw: 'map(0x3800, 0x3fff).ram().w(FUNC(trackfld_state::trackfld_colorram_w)).share(m_colorram)', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 596, sourceColumn: 2, sourceEndLine: 596, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:trackfld_state.trackfld_colorram_w'}) SET n:Handler SET n += {method: 'trackfld_colorram_w', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 407, sourceColumn: 1, sourceEndLine: 411, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:trackfld_state.main_map/range17'}) SET n:AddressRange SET n += {start: 24576, end: 65535, raw: 'map(0x6000, 0xffff).rom()', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 597, sourceColumn: 2, sourceEndLine: 597, rom: true};
MERGE (n:KG {id: 'handler:trackfld_state.konami_SN76489a_latch_w'}) SET n:Handler SET n += {method: 'konami_SN76489a_latch_w', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 263, sourceColumn: 47, sourceEndLine: 264, sourceParameters: 'uint8_t data', sourceBody: 'm_SN76489a_latch = data;'};
MERGE (n:KG {id: 'handler:trackfld_state.konami_SN76489a_w'}) SET n:Handler SET n += {method: 'konami_SN76489a_w', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 265, sourceColumn: 1, sourceEndLine: 265, sourceParameters: 'uint8_t data', sourceBody: 'm_sn->write(m_SN76489a_latch);'};
MERGE (n:KG {id: 'handler:hyprolyb_adpcm_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'hyprolyb_adpcm_device', sourceFile: 'src/mame/konami/hyprolyb.cpp', sourceLine: 43, sourceColumn: 1, sourceEndLine: 47, sourceParameters: 'uint8_t data', sourceBody: 'm_soundlatch2->write(data);
	m_adpcm_ready = 0x80;'};
MERGE (n:KG {id: 'handler:vlm5030_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'vlm5030_device', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 750, sourceColumn: 2, sourceEndLine: 750};
MERGE (n:KG {id: 'map:trackfld_state.sound_map'}) SET n:AddressMap SET n += {cls: 'trackfld_state', name: 'sound_map', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 738, sourceColumn: 1, sourceEndLine: 751};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 740, sourceColumn: 2, sourceEndLine: 740, rom: true};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 17407, raw: 'map(0x4000, 0x43ff).mirror(0x1c00).ram()', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 741, sourceColumn: 2, sourceEndLine: 741, mirror: 7168, ram: true};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).mirror(0x1fff).r("soundlatch", FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742, mirror: 8191};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 757, sourceColumn: 2, sourceEndLine: 757};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range3'}) SET n:AddressRange SET n += {start: 32768, end: 32768, raw: 'map(0x8000, 0x8000).mirror(0x1fff).r(m_soundbrd, FUNC(trackfld_audio_device::trackfld_sh_timer_r))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 743, sourceColumn: 2, sourceEndLine: 743, mirror: 8191};
MERGE (n:KG {id: 'handler:trackfld_audio_device.trackfld_sh_timer_r'}) SET n:Handler SET n += {method: 'trackfld_sh_timer_r', ownerClass: 'trackfld_audio_device', sourceFile: 'src/mame/konami/trackfld_a.cpp', sourceLine: 47, sourceColumn: 1, sourceEndLine: 52, sourceConstants: ['TIMER_RATE=1024'], sourceParameters: '', sourceBody: 'uint32_t clock = m_audiocpu->total_cycles() / TIMER_RATE;

	return clock & 0xf;'};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range4'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).mirror(0x1fff).w(FUNC(trackfld_state::konami_SN76489a_latch_w))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 744, sourceColumn: 2, sourceEndLine: 744, mirror: 8191};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range5'}) SET n:AddressRange SET n += {start: 49152, end: 49152, raw: 'map(0xc000, 0xc000).mirror(0x1fff).r(FUNC(trackfld_state::trackfld_SN76489a_r)).w(FUNC(trackfld_state::konami_SN76489a_w))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 745, sourceColumn: 2, sourceEndLine: 745, mirror: 8191};
MERGE (n:KG {id: 'handler:trackfld_state.trackfld_SN76489a_r'}) SET n:Handler SET n += {method: 'trackfld_SN76489a_r', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 732, sourceColumn: 1, sourceEndLine: 736, sourceParameters: '', sourceBody: 'konami_SN76489a_w(0);
	return 0xff; // ?'};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range6'}) SET n:AddressRange SET n += {start: 57344, end: 57344, raw: 'map(0xe000, 0xe000).mirror(0x1ff8).w(m_dac, FUNC(dac_byte_interface::data_w))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 746, sourceColumn: 2, sourceEndLine: 746, mirror: 8184};
MERGE (n:KG {id: 'handler:dac_byte_interface.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'dac_byte_interface', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 761, sourceColumn: 2, sourceEndLine: 761};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range7'}) SET n:AddressRange SET n += {start: 57345, end: 57345, raw: 'map(0xe001, 0xe001).mirror(0x1ff8).noprw()', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 747, sourceColumn: 2, sourceEndLine: 747, mirror: 8184};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range8'}) SET n:AddressRange SET n += {start: 57346, end: 57346, raw: 'map(0xe002, 0xe002).mirror(0x1ff8).r(m_soundbrd, FUNC(trackfld_audio_device::trackfld_speech_r))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 748, sourceColumn: 2, sourceEndLine: 748, mirror: 8184};
MERGE (n:KG {id: 'handler:trackfld_audio_device.trackfld_speech_r'}) SET n:Handler SET n += {method: 'trackfld_speech_r', ownerClass: 'trackfld_audio_device', sourceFile: 'src/mame/konami/trackfld_a.cpp', sourceLine: 54, sourceColumn: 1, sourceEndLine: 57, sourceParameters: '', sourceBody: 'return m_vlm->bsy_r() ? 0x10 : 0;'};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range9'}) SET n:AddressRange SET n += {start: 57347, end: 57347, raw: 'map(0xe003, 0xe003).mirror(0x1c78).select(0x0380).w(m_soundbrd, FUNC(trackfld_audio_device::trackfld_sound_w))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 749, sourceColumn: 2, sourceEndLine: 749, mirror: 7288};
MERGE (n:KG {id: 'handler:trackfld_audio_device.trackfld_sound_w'}) SET n:Handler SET n += {method: 'trackfld_sound_w', ownerClass: 'trackfld_audio_device', sourceFile: 'src/mame/konami/trackfld_a.cpp', sourceLine: 59, sourceColumn: 1, sourceEndLine: 70, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// A7 = data enable for VLM5030 (don\'t care)
	// A8 = STA pin (1->0 data data, 0->1 start speech)
	// A9 = RST pin 1=reset

	// A8 VLM5030 ST pin
	m_vlm->st_w(BIT(offset, 8));

	// A9 VLM5030 RST pin
	m_vlm->rst_w(BIT(offset, 9));'};
MERGE (n:KG {id: 'map:trackfld_state.sound_map/range10'}) SET n:AddressRange SET n += {start: 57348, end: 57348, raw: 'map(0xe004, 0xe004).mirror(0x1ff8).w(m_vlm, FUNC(vlm5030_device::data_w))', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 750, sourceColumn: 2, sourceEndLine: 750, mirror: 8184};
MERGE (n:KG {id: 'map:trackfld_state.vlm_map'}) SET n:AddressMap SET n += {cls: 'trackfld_state', name: 'vlm_map', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 768, sourceColumn: 1, sourceEndLine: 772, globalMask: 8191};
MERGE (n:KG {id: 'map:trackfld_state.vlm_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 8191, raw: 'map(0x0000, 0x1fff).rom()', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 771, sourceColumn: 2, sourceEndLine: 771, rom: true};
MERGE (n:KG {id: 'machine:trackfld_state.trackfld'}) SET n:MachineConfig SET n += {cls: 'trackfld_state', name: 'trackfld', calls: [], stateMembers: ['{"name":"m_bg_bank","bits":32,"signed":true}', '{"name":"m_sprite_bank1","bits":32,"signed":true}', '{"name":"m_sprite_bank2","bits":32,"signed":true}', '{"name":"m_old_gfx_bank","bits":32,"signed":true}', '{"name":"m_sprites_gfx_banked","bits":32,"signed":true}', '{"name":"m_irq_mask","bits":1}', '{"name":"m_nmi_mask","bits":1}', '{"name":"m_SN76489a_latch","bits":8}'], resetHandlers: ['trackfld_state.machine_reset'], startHandlers: ['trackfld_state.video_start'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1229, sourceColumn: 1, sourceEndLine: 1278};
MERGE (n:KG {id: 'handler:trackfld_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1209, sourceColumn: 1, sourceEndLine: 1215, sourceParameters: '', sourceBody: 'm_bg_bank = 0;
	m_sprite_bank1 = 0;
	m_sprite_bank2 = 0;
	m_old_gfx_bank = 0;'};
MERGE (n:KG {id: 'handler:trackfld_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 473, sourceColumn: 1, sourceEndLine: 477, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(trackfld_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 64, 32);
	m_bg_tilemap->set_scroll_rows(32);'};
MERGE (n:KG {id: 'handler:trackfld_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 460, sourceColumn: 1, sourceEndLine: 471, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int attr = m_colorram[tile_index];
	int code = m_videoram[tile_index] + 4 * (attr & 0xc0);
	int color = attr & 0x0f;
	int flags = ((attr & 0x10) ? TILE_FLIPX : 0) | ((attr & 0x20) ? TILE_FLIPY : 0);

	if (m_bg_bank)
		code |= 0x400;

	tileinfo.set(1, code, color, flags);'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/maincpu'}) SET n:Device SET n += {type: 'KONAMI1', tag: 'maincpu', clock: 1536000, config: ['KONAMI1(config, m_maincpu, MASTER_CLOCK/6/2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &trackfld_state::main_map)'], cls: 'konami1_device', clsHierarchy: ['konami1_device'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1232, sourceColumn: 2, sourceEndLine: 1232};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3579545.25, config: ['Z80(config, m_audiocpu, SOUND_CLOCK/4)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &trackfld_state::sound_map)'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1235, sourceColumn: 2, sourceEndLine: 1235};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['LS259(config, m_mainlatch)', 'm_mainlatch->q_out_cb<0>().set(FUNC(trackfld_state::flip_screen_set))', 'm_mainlatch->q_out_cb<1>().set("trackfld_audio", FUNC(trackfld_audio_device::sh_irqtrigger_w))', 'm_mainlatch->q_out_cb<2>().set_nop()', 'm_mainlatch->q_out_cb<3>().set(FUNC(trackfld_state::coin_counter_1_w))', 'm_mainlatch->q_out_cb<4>().set(FUNC(trackfld_state::coin_counter_2_w))', 'm_mainlatch->q_out_cb<5>().set_nop()', 'm_mainlatch->q_out_cb<6>().set_nop()', 'm_mainlatch->q_out_cb<7>().set(FUNC(trackfld_state::irq_mask_w))'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1238, sourceColumn: 2, sourceEndLine: 1238};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<0>().set(FUNC(trackfld_state::flip_screen_set))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1239, sourceColumn: 2, sourceEndLine: 1239, slot: '0', targetClass: 'trackfld_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:trackfld_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1304, sourceColumn: 2, sourceEndLine: 1304};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<1>().set("trackfld_audio", FUNC(trackfld_audio_device::sh_irqtrigger_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1240, sourceColumn: 2, sourceEndLine: 1240, slot: '1', targetTag: 'trackfld_audio', targetClass: 'trackfld_audio_device', targetMethod: 'sh_irqtrigger_w'};
MERGE (n:KG {id: 'handler:trackfld_audio_device.sh_irqtrigger_w'}) SET n:Handler SET n += {method: 'sh_irqtrigger_w', ownerClass: 'trackfld_audio_device', sourceFile: 'src/mame/konami/trackfld_a.cpp', sourceLine: 100, sourceColumn: 1, sourceEndLine: 107, sourceParameters: 'int state', sourceBody: '// setting bit 0 low then high triggers IRQ on the sound CPU
	if (!m_last_irq && state)
		m_audiocpu->set_input_line(0, HOLD_LINE); // Z80 IM1

	m_last_irq = state;'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'm_mainlatch->q_out_cb<2>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1241, sourceColumn: 2, sourceEndLine: 1241, slot: '2'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<3>().set(FUNC(trackfld_state::coin_counter_1_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1242, sourceColumn: 2, sourceEndLine: 1242, slot: '3', targetClass: 'trackfld_state', targetMethod: 'coin_counter_1_w'};
MERGE (n:KG {id: 'handler:trackfld_state.coin_counter_1_w'}) SET n:Handler SET n += {method: 'coin_counter_1_w', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 548, sourceColumn: 1, sourceEndLine: 551, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, state);'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<4>().set(FUNC(trackfld_state::coin_counter_2_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1243, sourceColumn: 2, sourceEndLine: 1243, slot: '4', targetClass: 'trackfld_state', targetMethod: 'coin_counter_2_w'};
MERGE (n:KG {id: 'handler:trackfld_state.coin_counter_2_w'}) SET n:Handler SET n += {method: 'coin_counter_2_w', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 553, sourceColumn: 1, sourceEndLine: 556, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(1, state);'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'm_mainlatch->q_out_cb<5>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1244, sourceColumn: 2, sourceEndLine: 1244, slot: '5'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:6'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'm_mainlatch->q_out_cb<6>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1245, sourceColumn: 2, sourceEndLine: 1245, slot: '6'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:7'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<7>().set(FUNC(trackfld_state::irq_mask_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1246, sourceColumn: 2, sourceEndLine: 1246, slot: '7', targetClass: 'trackfld_state', targetMethod: 'irq_mask_w'};
MERGE (n:KG {id: 'handler:trackfld_state.irq_mask_w'}) SET n:Handler SET n += {method: 'irq_mask_w', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 570, sourceColumn: 1, sourceEndLine: 575, sourceParameters: 'int state', sourceBody: 'm_irq_mask = state;
	if (!m_irq_mask)
		m_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1248, sourceColumn: 2, sourceEndLine: 1248, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1250, sourceColumn: 2, sourceEndLine: 1250};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(MASTER_CLOCK/3, 384, 0, 256, 264, 16, 240)', 'm_screen->set_screen_update(FUNC(trackfld_state::screen_update_trackfld))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set(FUNC(trackfld_state::vblank_irq))'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1253, sourceColumn: 2, sourceEndLine: 1253, configCalls: ['set_raw(6144000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 256, 264, 16, 240], screenRawExpr: ['MASTER_CLOCK/3', '384', '0', '256', '264', '16', '240']};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(trackfld_state::screen_update_trackfld))', ownerTag: 'screen', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1255, sourceColumn: 2, sourceEndLine: 1255, targetClass: 'trackfld_state', targetMethod: 'screen_update_trackfld'};
MERGE (n:KG {id: 'handler:trackfld_state.screen_update_trackfld'}) SET n:Handler SET n += {method: 'screen_update_trackfld', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 531, sourceColumn: 1, sourceEndLine: 545, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'int row, scrollx;

	for (row = 0; row < 32; row++)
	{
		scrollx = m_scroll[row] + 256 * (m_scroll2[row] & 0x01);
		if (flip_screen()) scrollx = -scrollx;
		m_bg_tilemap->set_scrollx(row, scrollx);
	}

	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:trackfld_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 481, sourceColumn: 1, sourceEndLine: 528, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t *spriteram = m_spriteram;
	uint8_t *spriteram_2 = m_spriteram2;

	for (int offs = m_spriteram.bytes() - 2; offs >= 0; offs -= 2)
	{
		int attr = spriteram_2[offs];
		int code = spriteram[offs + 1];
		int color = attr & 0x0f;
		if (!m_sprites_gfx_banked)
			if (attr&1) code|=0x100; // extra tile# bit for the yiear conversion, trackfld doesn\'t have this many sprites so it will just get masked
		int flipx = ~attr & 0x40;
		int flipy = attr & 0x80;
		int sx = spriteram[offs] - 1;
		int sy = 240 - spriteram_2[offs + 1];

		if (flip_screen())
		{
			sy = 240 - sy;
			flipy = !flipy;
		}

		/* Note that this adjustement must be done AFTER handling flip screen, thus */
		/* proving that this is a hardware related "feature" */
		sy += 1;

		// to fix the title screen in yieartf it would have to be like this, the same as yiear.c, this should be verified on the hw
		//
		//if (offs < 0x26)
		//{
		//  sy++;   /* fix title screen & garbage at the bottom of the screen */
		//}

		m_gfxdecode->gfx(0)->transmask(bitmap,cliprect,
			code + m_sprite_bank1 + m_sprite_bank2, color,
			flipx, flipy,
			sx, sy,
			m_palette->transpen_mask(*m_gfxdecode->gfx(0), color, 0));

		/* redraw with wraparound */
		m_gfxdecode->gfx(0)->transmask(bitmap,cliprect,
			code + m_sprite_bank1 + m_sprite_bank2, color,
			flipx, flipy,
			sx - 256, sy,
			m_palette->transpen_mask(*m_gfxdecode->gfx(0), color, 0));
	}'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(trackfld_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1257, sourceColumn: 2, sourceEndLine: 1257, targetClass: 'trackfld_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:trackfld_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1217, sourceColumn: 1, sourceEndLine: 1221, sourceParameters: 'int state', sourceBody: 'if (state && m_irq_mask)
		m_maincpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_trackfld)'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1259, sourceColumn: 2, sourceEndLine: 1259, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(trackfld_state::trackfld_palette), 16*16+16*16, 32)'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1260, sourceColumn: 2, sourceEndLine: 1260, clockExpr: 'FUNC(trackfld_state::trackfld_palette)'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1264, sourceColumn: 2, sourceEndLine: 1264};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, "soundlatch")'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1266, sourceColumn: 2, sourceEndLine: 1266};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/trackfld_audio'}) SET n:Device SET n += {type: 'TRACKFLD_AUDIO', tag: 'trackfld_audio', clock: null, config: ['TRACKFLD_AUDIO(config, m_soundbrd, m_audiocpu, m_vlm)'], cls: 'trackfld_audio_device', clsHierarchy: ['trackfld_audio_device'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1268, sourceColumn: 2, sourceEndLine: 1268, clockExpr: 'm_audiocpu'};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/dac'}) SET n:Device SET n += {type: 'DAC_8BIT_R2R', tag: 'dac', clock: 0, config: ['DAC_8BIT_R2R(config, m_dac, 0).add_route(ALL_OUTPUTS, "speaker", 0.4)'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1270, sourceColumn: 2, sourceEndLine: 1270};
MERGE (n:KG {id: 'audioroute:device:trackfld_state.trackfld/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.4, raw: 'DAC_8BIT_R2R(config, m_dac, 0).add_route(ALL_OUTPUTS, "speaker", 0.4)', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1270, sourceColumn: 2, sourceEndLine: 1270};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/snsnd'}) SET n:Device SET n += {type: 'SN76489A', tag: 'snsnd', clock: 1789772.625, config: ['SN76489A(config, m_sn, SOUND_CLOCK/8)', 'm_sn->add_route(ALL_OUTPUTS, "speaker", 1.0)'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1272, sourceColumn: 2, sourceEndLine: 1272};
MERGE (n:KG {id: 'audioroute:device:trackfld_state.trackfld/snsnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'm_sn->add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1273, sourceColumn: 2, sourceEndLine: 1273};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/vlm'}) SET n:Device SET n += {type: 'VLM5030', tag: 'vlm', clock: 3579545, config: ['VLM5030(config, m_vlm, VLM_CLOCK)', 'm_vlm->set_addrmap(0, &trackfld_state::vlm_map)', 'm_vlm->add_route(ALL_OUTPUTS, "speaker", 1.0)'], sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1275, sourceColumn: 2, sourceEndLine: 1275};
MERGE (n:KG {id: 'audioroute:device:trackfld_state.trackfld/vlm/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'm_vlm->add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1277, sourceColumn: 2, sourceEndLine: 1277};
MERGE (n:KG {id: 'inputs:trackfld'}) SET n:InputPorts SET n += {name: 'trackfld', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 774, sourceColumn: 8, sourceEndLine: 774};
MERGE (n:KG {id: 'inputs:trackfld/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:trackfld/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:trackfld/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:trackfld/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:trackfld/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:trackfld/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:trackfld/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:trackfld/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:trackfld/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:trackfld/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:trackfld/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(1)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:trackfld/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:trackfld/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:trackfld/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START3', defaultValue: 8};
MERGE (n:KG {id: 'inputs:trackfld/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(2)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:trackfld/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:trackfld/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:trackfld/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:trackfld/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:trackfld/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(3)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:trackfld/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(3)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:trackfld/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(3)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:trackfld/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START4', defaultValue: 8};
MERGE (n:KG {id: 'inputs:trackfld/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(4)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:trackfld/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(4)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:trackfld/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(4)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:trackfld/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:trackfld/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:trackfld/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION(#SW1":1,2,3,4")'], name: 'Coin A', defaultValue: 15, location: '#SW1":1,2,3,4"', settings: ['2=4C 1C', '5=3C 1C', '8=2C 1C', '4=3C 2C', '1=4C 3C', '15=1C 1C', '3=3C 4C', '7=2C 3C', '14=1C 2C', '6=2C 5C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C', '9=1C 7C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:trackfld/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION(#SW1":5,6,7,8")'], name: 'Coin B', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['32=4C 1C', '80=3C 1C', '128=2C 1C', '64=3C 2C', '16=4C 3C', '240=1C 1C', '48=3C 4C', '112=2C 3C', '224=1C 2C', '96=2C 5C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '160=1C 6C', '144=1C 7C', '0=No Coin B']};
MERGE (n:KG {id: 'inputs:trackfld/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:trackfld/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW2:1")'], name: 'Lives', defaultValue: 1, location: 'SW2:1', settings: ['1=1', '0=2']};
MERGE (n:KG {id: 'inputs:trackfld/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SW2:2")'], name: 'After Last Event', defaultValue: 0, location: 'SW2:2', settings: ['2=Game Over', '0=Game Continues']};
MERGE (n:KG {id: 'inputs:trackfld/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:3', settings: ['0=Upright', '4=Cocktail']};
MERGE (n:KG {id: 'inputs:trackfld/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW2:4")'], name: 'Bonus Life', defaultValue: 8, location: 'SW2:4', settings: ['8=None', '0=100000']};
MERGE (n:KG {id: 'inputs:trackfld/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SW2:5")'], name: 'World Records', defaultValue: 16, location: 'SW2:5', settings: ['16=Don\'t Erase', '0=Erase on Reset']};
MERGE (n:KG {id: 'inputs:trackfld/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 96, modifiers: ['PORT_DIPLOCATION("SW2:6,7")'], name: 'Difficulty', defaultValue: 64, location: 'SW2:6,7', settings: ['96=Easy', '64=Normal', '32=Hard', '0=Difficult']};
MERGE (n:KG {id: 'inputs:trackfld/DSW2/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: ['RGN_FRAC(1,2)+4', 'RGN_FRAC(1,2)+0', 4, 0], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312], charIncrement: 512};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x4_packed_msb', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: [0, 4, 8, 12, 16, 20, 24, 28], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfx_trackfld'}) SET n:GfxDecode SET n += {name: 'gfx_trackfld', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1190, sourceColumn: 8, sourceEndLine: 1190};
MERGE (n:KG {id: 'gfxdecode:gfx_trackfld/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'spritelayout', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_trackfld/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'gfx_8x8x4_packed_msb', colorBase: 256, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:trackfld_state.trackfld/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(trackfld_state::trackfld_palette), 16*16+16*16, 32)', ownerTag: 'palette', targetClass: 'trackfld_state', targetMethod: 'trackfld_palette', entries: 32, sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1260};
MERGE (n:KG {id: 'handler:trackfld_state.trackfld_palette'}) SET n:Handler SET n += {method: 'trackfld_palette', ownerClass: 'trackfld_state', sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 399, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();
	
	

	// compute the color output resistor weights
	double rweights[3], gweights[3], bweights[2];
	compute_resistor_weights(0, 255, -1.0,
			3, &TABLE(0, 1000, 470, 220), rweights, 1000, 0,
			3, &TABLE(0, 1000, 470, 220), gweights, 1000, 0,
			2, &TABLE(0, 470, 220),  bweights, 1000, 0);

	// create a lookup table for the palette
	for (int i = 0; i < 0x20; i++)
	{
		int bit0, bit1, bit2;

		// red component
		bit0 = BIT(color_prom[i], 0);
		bit1 = BIT(color_prom[i], 1);
		bit2 = BIT(color_prom[i], 2);
		int const r = combine_weights(rweights, bit0, bit1, bit2);

		// green component
		bit0 = BIT(color_prom[i], 3);
		bit1 = BIT(color_prom[i], 4);
		bit2 = BIT(color_prom[i], 5);
		int const g = combine_weights(gweights, bit0, bit1, bit2);

		// blue component
		bit0 = BIT(color_prom[i], 6);
		bit1 = BIT(color_prom[i], 7);
		int const b = combine_weights(bweights, bit0, bit1);

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	// color_prom now points to the beginning of the lookup table
	color_prom += 0x20;

	// sprites
	for (int i = 0; i < 0x100; i++)
	{
		uint8_t const ctabentry = color_prom[i] & 0x0f;
		palette.set_pen_indirect(i, ctabentry);
	}

	// characters
	for (int i = 0x100; i < 0x200; i++)
	{
		uint8_t const ctabentry = (color_prom[i] & 0x0f) | 0x10;
		palette.set_pen_indirect(i, ctabentry);
	}'};
MATCH (a:KG {id: 'game:trackfld'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 2051, sourceColumn: 1, sourceEndLine: 2051};
MATCH (a:KG {id: 'game:trackfld'}), (b:KG {id: 'machine:trackfld_state.trackfld'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:trackfld'}), (b:KG {id: 'inputs:trackfld'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:trackfld'}), (b:KG {id: 'romset:trackfld'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:hyprolyb.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:konami1.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:konamipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:trackfld_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:cpu/m6800/m6800.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:cpu/m6809/m6809.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:machine/timer.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:sound/vlm5030.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/trackfld.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1229, sourceColumn: 1, sourceEndLine: 1278};
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'handler:trackfld_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'handler:trackfld_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'gfxdecode:gfx_trackfld'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/trackfld_audio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/snsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:trackfld_state.trackfld'}), (b:KG {id: 'device:trackfld_state.trackfld/vlm'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:trackfld'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 774, sourceColumn: 8, sourceEndLine: 774};
MATCH (a:KG {id: 'inputs:trackfld'}), (b:KG {id: 'inputs:trackfld/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:trackfld'}), (b:KG {id: 'inputs:trackfld/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:trackfld'}), (b:KG {id: 'inputs:trackfld/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:trackfld'}), (b:KG {id: 'inputs:trackfld/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:trackfld'}), (b:KG {id: 'inputs:trackfld/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:trackfld'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1439, sourceColumn: 1, sourceEndLine: 1439};
MATCH (a:KG {id: 'romset:trackfld'}), (b:KG {id: 'region:trackfld/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:trackfld'}), (b:KG {id: 'region:trackfld/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:trackfld'}), (b:KG {id: 'region:trackfld/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:trackfld'}), (b:KG {id: 'region:trackfld/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:trackfld'}), (b:KG {id: 'region:trackfld/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:trackfld'}), (b:KG {id: 'region:trackfld/vlm'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:trackfld_state.video_start'}), (b:KG {id: 'handler:trackfld_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/maincpu'}), (b:KG {id: 'map:trackfld_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:trackfld_state.trackfld/audiocpu'}), (b:KG {id: 'map:trackfld_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch'}), (b:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch'}), (b:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch'}), (b:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch'}), (b:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch'}), (b:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch'}), (b:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch'}), (b:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch'}), (b:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/screen'}), (b:KG {id: 'device:trackfld_state.trackfld/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/screen'}), (b:KG {id: 'device:trackfld_state.trackfld/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_trackfld'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 1190, sourceColumn: 8, sourceEndLine: 1190};
MATCH (a:KG {id: 'gfxdecode:gfx_trackfld'}), (b:KG {id: 'gfxdecode:gfx_trackfld/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_trackfld'}), (b:KG {id: 'gfxdecode:gfx_trackfld/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/palette'}), (b:KG {id: 'device:trackfld_state.trackfld/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/dac'}), (b:KG {id: 'audioroute:device:trackfld_state.trackfld/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/snsnd'}), (b:KG {id: 'audioroute:device:trackfld_state.trackfld/snsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/vlm'}), (b:KG {id: 'audioroute:device:trackfld_state.trackfld/vlm/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/vlm'}), (b:KG {id: 'map:trackfld_state.vlm_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: '0'};
MATCH (a:KG {id: 'inputs:trackfld/SYSTEM'}), (b:KG {id: 'inputs:trackfld/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/SYSTEM'}), (b:KG {id: 'inputs:trackfld/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/SYSTEM'}), (b:KG {id: 'inputs:trackfld/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/SYSTEM'}), (b:KG {id: 'inputs:trackfld/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/SYSTEM'}), (b:KG {id: 'inputs:trackfld/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/SYSTEM'}), (b:KG {id: 'inputs:trackfld/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/SYSTEM'}), (b:KG {id: 'inputs:trackfld/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/SYSTEM'}), (b:KG {id: 'inputs:trackfld/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN0'}), (b:KG {id: 'inputs:trackfld/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN0'}), (b:KG {id: 'inputs:trackfld/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN0'}), (b:KG {id: 'inputs:trackfld/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN0'}), (b:KG {id: 'inputs:trackfld/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN0'}), (b:KG {id: 'inputs:trackfld/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN0'}), (b:KG {id: 'inputs:trackfld/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN0'}), (b:KG {id: 'inputs:trackfld/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN0'}), (b:KG {id: 'inputs:trackfld/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN1'}), (b:KG {id: 'inputs:trackfld/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN1'}), (b:KG {id: 'inputs:trackfld/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN1'}), (b:KG {id: 'inputs:trackfld/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN1'}), (b:KG {id: 'inputs:trackfld/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN1'}), (b:KG {id: 'inputs:trackfld/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN1'}), (b:KG {id: 'inputs:trackfld/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN1'}), (b:KG {id: 'inputs:trackfld/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/IN1'}), (b:KG {id: 'inputs:trackfld/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/DSW1'}), (b:KG {id: 'inputs:trackfld/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/DSW1'}), (b:KG {id: 'inputs:trackfld/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/DSW2'}), (b:KG {id: 'inputs:trackfld/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/DSW2'}), (b:KG {id: 'inputs:trackfld/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/DSW2'}), (b:KG {id: 'inputs:trackfld/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/DSW2'}), (b:KG {id: 'inputs:trackfld/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/DSW2'}), (b:KG {id: 'inputs:trackfld/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/DSW2'}), (b:KG {id: 'inputs:trackfld/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:trackfld/DSW2'}), (b:KG {id: 'inputs:trackfld/DSW2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:trackfld/maincpu'}), (b:KG {id: 'rom:trackfld/maincpu/a01_e01.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/maincpu'}), (b:KG {id: 'rom:trackfld/maincpu/a02_e02.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/maincpu'}), (b:KG {id: 'rom:trackfld/maincpu/a03_k03.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/maincpu'}), (b:KG {id: 'rom:trackfld/maincpu/a04_e04.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/maincpu'}), (b:KG {id: 'rom:trackfld/maincpu/a05_e05.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/audiocpu'}), (b:KG {id: 'rom:trackfld/audiocpu/c2_d13.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/gfx1'}), (b:KG {id: 'rom:trackfld/gfx1/c11_d06.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/gfx1'}), (b:KG {id: 'rom:trackfld/gfx1/c12_d07.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/gfx1'}), (b:KG {id: 'rom:trackfld/gfx1/c13_d08.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/gfx1'}), (b:KG {id: 'rom:trackfld/gfx1/c14_d09.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/gfx2'}), (b:KG {id: 'rom:trackfld/gfx2/h16_e12.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/gfx2'}), (b:KG {id: 'rom:trackfld/gfx2/h15_e11.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/gfx2'}), (b:KG {id: 'rom:trackfld/gfx2/h14_e10.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/proms'}), (b:KG {id: 'rom:trackfld/proms/361b16.f1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/proms'}), (b:KG {id: 'rom:trackfld/proms/361b17.b16'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/proms'}), (b:KG {id: 'rom:trackfld/proms/361b18.e15'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:trackfld/vlm'}), (b:KG {id: 'rom:trackfld/vlm/c9_d15.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 577, sourceColumn: 1, sourceEndLine: 598};
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map'}), (b:KG {id: 'map:trackfld_state.main_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 738, sourceColumn: 1, sourceEndLine: 751};
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map'}), (b:KG {id: 'map:trackfld_state.sound_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:trackfld_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:1'}), (b:KG {id: 'handler:trackfld_audio_device.sh_irqtrigger_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:3'}), (b:KG {id: 'handler:trackfld_state.coin_counter_1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:4'}), (b:KG {id: 'handler:trackfld_state.coin_counter_2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/mainlatch/callback:mainlatch:7'}), (b:KG {id: 'handler:trackfld_state.irq_mask_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/screen/callback:screen:0'}), (b:KG {id: 'handler:trackfld_state.screen_update_trackfld'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/screen/callback:screen:1'}), (b:KG {id: 'handler:trackfld_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_trackfld/e0'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_trackfld/e1'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:trackfld_state.trackfld/palette/callback:palette_init'}), (b:KG {id: 'handler:trackfld_state.trackfld_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:trackfld_state.vlm_map'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/trackfld.cpp', sourceLine: 768, sourceColumn: 1, sourceEndLine: 772};
MATCH (a:KG {id: 'map:trackfld_state.vlm_map'}), (b:KG {id: 'map:trackfld_state.vlm_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map/range0'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:trackfld_state.main_map/range1'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:trackfld_state.main_map/range2'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:trackfld_state.main_map/range15'}), (b:KG {id: 'handler:trackfld_state.trackfld_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:trackfld_state.main_map/range16'}), (b:KG {id: 'handler:trackfld_state.trackfld_colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map/range2'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:trackfld_state.sound_map/range3'}), (b:KG {id: 'handler:trackfld_audio_device.trackfld_sh_timer_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'trackfld_audio'};
MATCH (a:KG {id: 'map:trackfld_state.sound_map/range4'}), (b:KG {id: 'handler:trackfld_state.konami_SN76489a_latch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map/range5'}), (b:KG {id: 'handler:trackfld_state.trackfld_SN76489a_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map/range5'}), (b:KG {id: 'handler:trackfld_state.konami_SN76489a_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:trackfld_state.sound_map/range6'}), (b:KG {id: 'handler:dac_byte_interface.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'dac'};
MATCH (a:KG {id: 'map:trackfld_state.sound_map/range8'}), (b:KG {id: 'handler:trackfld_audio_device.trackfld_speech_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'trackfld_audio'};
MATCH (a:KG {id: 'map:trackfld_state.sound_map/range9'}), (b:KG {id: 'handler:trackfld_audio_device.trackfld_sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'trackfld_audio'};
MATCH (a:KG {id: 'map:trackfld_state.sound_map/range10'}), (b:KG {id: 'handler:vlm5030_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'vlm'};
MATCH (a:KG {id: 'handler:trackfld_state.screen_update_trackfld'}), (b:KG {id: 'handler:trackfld_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}), (b:KG {id: 'file:src/mame/konami/trackfld.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:trackfld_state.trackfld_SN76489a_r'}), (b:KG {id: 'handler:trackfld_state.konami_SN76489a_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:trackfld_state.konami_SN76489a_w'}), (b:KG {id: 'handler:hyprolyb_adpcm_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
