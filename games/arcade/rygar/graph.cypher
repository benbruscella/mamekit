// mamekit knowledge graph — driver src/mame/tecmo/tecmo.cpp
// generated 2026-09-05T03:50:05.085Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/tecmo/tecmo.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:tecmo_spr.h'}) SET n:SourceFile SET n += {path: 'tecmo_spr.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/msm5205.h'}) SET n:SourceFile SET n += {path: 'sound/msm5205.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopl.h'}) SET n:SourceFile SET n += {path: 'sound/ymopl.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'game:rygar'}) SET n:Game SET n += {name: 'rygar', year: '1986', company: 'Tecmo', fullname: 'Rygar (US set 1)', monitor: 'ROT0', cls: 'tecmo_state', init: 'init_rygar', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1831, sourceColumn: 1, sourceEndLine: 1831};
MERGE (n:KG {id: 'romset:rygar'}) SET n:RomSet SET n += {name: 'rygar', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1259, sourceColumn: 1, sourceEndLine: 1259};
MERGE (n:KG {id: 'region:rygar/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 131072, flags: '0', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1260, sourceColumn: 2, sourceEndLine: 1260};
MERGE (n:KG {id: 'rom:rygar/maincpu/5.5p'}) SET n:Rom SET n += {file: '5.5p', offset: 0, size: 32768, crc: '062cd55d', sha1: '656e29c890f5de964920b7841b3e11469cd20051', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1261, sourceColumn: 2, sourceEndLine: 1261};
MERGE (n:KG {id: 'rom:rygar/maincpu/cpu_5m.bin'}) SET n:Rom SET n += {file: 'cpu_5m.bin', offset: 32768, size: 16384, crc: '7ac5191b', sha1: '305f39d974f906f9bc24e9fe2ca58e647925ab63', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1262, sourceColumn: 2, sourceEndLine: 1262};
MERGE (n:KG {id: 'rom:rygar/maincpu/cpu_5j.bin'}) SET n:Rom SET n += {file: 'cpu_5j.bin', offset: 65536, size: 32768, crc: 'ed76d606', sha1: '39c8a07e9a1f218ad088d00a2c9dfc993efafb6b', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1263, sourceColumn: 2, sourceEndLine: 1263};
MERGE (n:KG {id: 'region:rygar/soundcpu'}) SET n:RomRegion SET n += {tag: 'soundcpu', size: 65536, flags: '0', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1265, sourceColumn: 2, sourceEndLine: 1265};
MERGE (n:KG {id: 'rom:rygar/soundcpu/cpu_4h.bin'}) SET n:Rom SET n += {file: 'cpu_4h.bin', offset: 0, size: 8192, crc: 'e4a2fa87', sha1: 'ed58187dbbcf59358496a98ffd6c227a87d6c433', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1266, sourceColumn: 2, sourceEndLine: 1266};
MERGE (n:KG {id: 'region:rygar/txtiles'}) SET n:RomRegion SET n += {tag: 'txtiles', size: 32768, flags: '0', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1268, sourceColumn: 2, sourceEndLine: 1268};
MERGE (n:KG {id: 'rom:rygar/txtiles/cpu_8k.bin'}) SET n:Rom SET n += {file: 'cpu_8k.bin', offset: 0, size: 32768, crc: '4d482fb6', sha1: '57ad838b6d30b49dbd2d0ec425f33cfb15a67918', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1269, sourceColumn: 2, sourceEndLine: 1269};
MERGE (n:KG {id: 'region:rygar/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 131072, flags: '0', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1271, sourceColumn: 2, sourceEndLine: 1271};
MERGE (n:KG {id: 'rom:rygar/sprites/vid_6k.bin'}) SET n:Rom SET n += {file: 'vid_6k.bin', offset: 0, size: 32768, crc: 'aba6db9e', sha1: '43eb6f4f92afb5fbc11adc7e2ab04878ab56cb17', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1272, sourceColumn: 2, sourceEndLine: 1272};
MERGE (n:KG {id: 'rom:rygar/sprites/vid_6j.bin'}) SET n:Rom SET n += {file: 'vid_6j.bin', offset: 32768, size: 32768, crc: 'ae1f2ed6', sha1: '6e6a33e665ba0884b7f57e9ad69d3f51e41d9e7b', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1273, sourceColumn: 2, sourceEndLine: 1273};
MERGE (n:KG {id: 'rom:rygar/sprites/vid_6h.bin'}) SET n:Rom SET n += {file: 'vid_6h.bin', offset: 65536, size: 32768, crc: '46d9e7df', sha1: 'a24e0bea310a03636af704a0ad3f1a9cc4aafe12', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1274, sourceColumn: 2, sourceEndLine: 1274};
MERGE (n:KG {id: 'rom:rygar/sprites/vid_6g.bin'}) SET n:Rom SET n += {file: 'vid_6g.bin', offset: 98304, size: 32768, crc: '45839c9a', sha1: 'eaee5767d8b0b62b991c089ef51b922e89850b79', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1275, sourceColumn: 2, sourceEndLine: 1275};
MERGE (n:KG {id: 'region:rygar/fgtiles'}) SET n:RomRegion SET n += {tag: 'fgtiles', size: 131072, flags: '0', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1277, sourceColumn: 2, sourceEndLine: 1277};
MERGE (n:KG {id: 'rom:rygar/fgtiles/vid_6p.bin'}) SET n:Rom SET n += {file: 'vid_6p.bin', offset: 0, size: 32768, crc: '9eae5f8e', sha1: 'ed83b608ca57b9bf69fa866d9b8f55d16b7cff63', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1278, sourceColumn: 2, sourceEndLine: 1278};
MERGE (n:KG {id: 'rom:rygar/fgtiles/vid_6o.bin'}) SET n:Rom SET n += {file: 'vid_6o.bin', offset: 32768, size: 32768, crc: '5a10a396', sha1: '12ebed3952ff35a2c275cb27c915f82183048cd4', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1279, sourceColumn: 2, sourceEndLine: 1279};
MERGE (n:KG {id: 'rom:rygar/fgtiles/vid_6n.bin'}) SET n:Rom SET n += {file: 'vid_6n.bin', offset: 65536, size: 32768, crc: '7b12cf3f', sha1: '6b9d8cad6e15317df01bab0591fab09199ca6d40', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1280, sourceColumn: 2, sourceEndLine: 1280};
MERGE (n:KG {id: 'rom:rygar/fgtiles/vid_6l.bin'}) SET n:Rom SET n += {file: 'vid_6l.bin', offset: 98304, size: 32768, crc: '3cea7eaa', sha1: '1dd194d5672dfe71c2b27d2d7b76f5a611cff76f', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1281, sourceColumn: 2, sourceEndLine: 1281};
MERGE (n:KG {id: 'region:rygar/bgtiles'}) SET n:RomRegion SET n += {tag: 'bgtiles', size: 131072, flags: '0', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1283, sourceColumn: 2, sourceEndLine: 1283};
MERGE (n:KG {id: 'rom:rygar/bgtiles/vid_6f.bin'}) SET n:Rom SET n += {file: 'vid_6f.bin', offset: 0, size: 32768, crc: '9840edd8', sha1: 'f19a1a1d932214037144c533ad07ed81256c34e7', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1284, sourceColumn: 2, sourceEndLine: 1284};
MERGE (n:KG {id: 'rom:rygar/bgtiles/vid_6e.bin'}) SET n:Rom SET n += {file: 'vid_6e.bin', offset: 32768, size: 32768, crc: 'ff65e074', sha1: '513c1bad336ef5d871f15d6ba8943020f98d1f4a', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1285, sourceColumn: 2, sourceEndLine: 1285};
MERGE (n:KG {id: 'rom:rygar/bgtiles/vid_6c.bin'}) SET n:Rom SET n += {file: 'vid_6c.bin', offset: 65536, size: 32768, crc: '89868c85', sha1: 'f21550f40e7a177e95c40f2726c651f85ca8edce', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1286, sourceColumn: 2, sourceEndLine: 1286};
MERGE (n:KG {id: 'rom:rygar/bgtiles/vid_6b.bin'}) SET n:Rom SET n += {file: 'vid_6b.bin', offset: 98304, size: 32768, crc: '35389a7b', sha1: 'a887a89f9bbb5979bb589468d80efba1f243690b', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1287, sourceColumn: 2, sourceEndLine: 1287};
MERGE (n:KG {id: 'region:rygar/adpcm'}) SET n:RomRegion SET n += {tag: 'adpcm', size: 16384, flags: '0', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1289, sourceColumn: 2, sourceEndLine: 1289};
MERGE (n:KG {id: 'rom:rygar/adpcm/cpu_1f.bin'}) SET n:Rom SET n += {file: 'cpu_1f.bin', offset: 0, size: 16384, crc: '3cc98c5a', sha1: 'ea1035be939ed1a994f3273b33412c85dda0973e', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1290, sourceColumn: 2, sourceEndLine: 1290};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map'}) SET n:AddressMap SET n += {cls: 'tecmo_state', name: 'rygar_map', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 596, sourceColumn: 1, sourceEndLine: 623};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 49151, raw: 'map(0x0000, 0xbfff).rom()', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 598, sourceColumn: 2, sourceEndLine: 598, rom: true};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range1'}) SET n:AddressRange SET n += {start: 49152, end: 53247, raw: 'map(0xc000, 0xcfff).ram()', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 599, sourceColumn: 2, sourceEndLine: 599, ram: true};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range2'}) SET n:AddressRange SET n += {start: 53248, end: 55295, raw: 'map(0xd000, 0xd7ff).ram().w(FUNC(tecmo_state::txvideoram_w)).share(m_txvideoram)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 600, sourceColumn: 2, sourceEndLine: 600, ram: true, share: 'txvideoram'};
MERGE (n:KG {id: 'handler:tecmo_state.txvideoram_w'}) SET n:Handler SET n += {method: 'txvideoram_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 465, sourceColumn: 1, sourceEndLine: 469, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_txvideoram[offset] = data;
	m_tx_tilemap->mark_tile_dirty(offset & 0x3ff);'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range3'}) SET n:AddressRange SET n += {start: 55296, end: 56319, raw: 'map(0xd800, 0xdbff).ram().w(FUNC(tecmo_state::fgvideoram_w)).share(m_fgvideoram)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 601, sourceColumn: 2, sourceEndLine: 601, ram: true, share: 'fgvideoram'};
MERGE (n:KG {id: 'handler:tecmo_state.fgvideoram_w'}) SET n:Handler SET n += {method: 'fgvideoram_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 471, sourceColumn: 1, sourceEndLine: 475, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_fgvideoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset & 0x1ff);'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range4'}) SET n:AddressRange SET n += {start: 56320, end: 57343, raw: 'map(0xdc00, 0xdfff).ram().w(FUNC(tecmo_state::bgvideoram_w)).share(m_bgvideoram)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 602, sourceColumn: 2, sourceEndLine: 602, ram: true, share: 'bgvideoram'};
MERGE (n:KG {id: 'handler:tecmo_state.bgvideoram_w'}) SET n:Handler SET n += {method: 'bgvideoram_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 477, sourceColumn: 1, sourceEndLine: 481, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_bgvideoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset & 0x1ff);'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range5'}) SET n:AddressRange SET n += {start: 57344, end: 59391, raw: 'map(0xe000, 0xe7ff).ram().share(m_spriteram)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 603, sourceColumn: 2, sourceEndLine: 603, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range6'}) SET n:AddressRange SET n += {start: 59392, end: 61439, raw: 'map(0xe800, 0xefff).ram().w(m_palette, FUNC(palette_device::write8)).share("palette")', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 604, sourceColumn: 2, sourceEndLine: 604, ram: true, share: 'palette'};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 662, sourceColumn: 2, sourceEndLine: 662};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range7'}) SET n:AddressRange SET n += {start: 61440, end: 63487, raw: 'map(0xf000, 0xf7ff).bankr(m_mainbank)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 605, sourceColumn: 2, sourceEndLine: 605, bankRead: 'mainbank'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range8'}) SET n:AddressRange SET n += {start: 63488, end: 63488, raw: 'map(0xf800, 0xf800).portr("JOY1")', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 606, sourceColumn: 2, sourceEndLine: 606, portRead: 'JOY1'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range9'}) SET n:AddressRange SET n += {start: 63489, end: 63489, raw: 'map(0xf801, 0xf801).portr("BUTTONS1")', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 607, sourceColumn: 2, sourceEndLine: 607, portRead: 'BUTTONS1'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range10'}) SET n:AddressRange SET n += {start: 63490, end: 63490, raw: 'map(0xf802, 0xf802).portr("JOY2")', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 608, sourceColumn: 2, sourceEndLine: 608, portRead: 'JOY2'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range11'}) SET n:AddressRange SET n += {start: 63491, end: 63491, raw: 'map(0xf803, 0xf803).portr("BUTTONS2")', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 609, sourceColumn: 2, sourceEndLine: 609, portRead: 'BUTTONS2'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range12'}) SET n:AddressRange SET n += {start: 63492, end: 63492, raw: 'map(0xf804, 0xf804).portr("SYS_0")', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 610, sourceColumn: 2, sourceEndLine: 610, portRead: 'SYS_0'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range13'}) SET n:AddressRange SET n += {start: 63493, end: 63493, raw: 'map(0xf805, 0xf805).portr("SYS_1")', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 611, sourceColumn: 2, sourceEndLine: 611, portRead: 'SYS_1'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range14'}) SET n:AddressRange SET n += {start: 63494, end: 63494, raw: 'map(0xf806, 0xf806).r(FUNC(tecmo_state::dsw_l_r<0>))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 612, sourceColumn: 2, sourceEndLine: 612};
MERGE (n:KG {id: 'handler:tecmo_state.dsw_l_r_0'}) SET n:Handler SET n += {method: 'dsw_l_r_0', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 581, sourceColumn: 1, sourceEndLine: 586, sourceConstants: ['Which=0'], sourceParameters: '', sourceBody: 'uint8_t port = m_dsw[Which]->read();
	port &= 0x0f;
	return port;', inputMembers: ['m_dsw=DSWA,DSWB']};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range15'}) SET n:AddressRange SET n += {start: 63495, end: 63495, raw: 'map(0xf807, 0xf807).r(FUNC(tecmo_state::dsw_h_r<0>))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 613, sourceColumn: 2, sourceEndLine: 613};
MERGE (n:KG {id: 'handler:tecmo_state.dsw_h_r_0'}) SET n:Handler SET n += {method: 'dsw_h_r_0', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 589, sourceColumn: 1, sourceEndLine: 594, sourceConstants: ['Which=0'], sourceParameters: '', sourceBody: 'uint8_t port = m_dsw[Which]->read();
	port &= 0xf0;
	return port >> 4;', inputMembers: ['m_dsw=DSWA,DSWB']};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range16'}) SET n:AddressRange SET n += {start: 63496, end: 63496, raw: 'map(0xf808, 0xf808).r(FUNC(tecmo_state::dsw_l_r<1>))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 614, sourceColumn: 2, sourceEndLine: 614};
MERGE (n:KG {id: 'handler:tecmo_state.dsw_l_r_1'}) SET n:Handler SET n += {method: 'dsw_l_r_1', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 581, sourceColumn: 1, sourceEndLine: 586, sourceConstants: ['Which=1'], sourceParameters: '', sourceBody: 'uint8_t port = m_dsw[Which]->read();
	port &= 0x0f;
	return port;', inputMembers: ['m_dsw=DSWA,DSWB']};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range17'}) SET n:AddressRange SET n += {start: 63497, end: 63497, raw: 'map(0xf809, 0xf809).r(FUNC(tecmo_state::dsw_h_r<1>))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 615, sourceColumn: 2, sourceEndLine: 615};
MERGE (n:KG {id: 'handler:tecmo_state.dsw_h_r_1'}) SET n:Handler SET n += {method: 'dsw_h_r_1', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 589, sourceColumn: 1, sourceEndLine: 594, sourceConstants: ['Which=1'], sourceParameters: '', sourceBody: 'uint8_t port = m_dsw[Which]->read();
	port &= 0xf0;
	return port >> 4;', inputMembers: ['m_dsw=DSWA,DSWB']};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range18'}) SET n:AddressRange SET n += {start: 63503, end: 63503, raw: 'map(0xf80f, 0xf80f).portr("SYS_2")', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 616, sourceColumn: 2, sourceEndLine: 616, portRead: 'SYS_2'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range19'}) SET n:AddressRange SET n += {start: 63488, end: 63490, raw: 'map(0xf800, 0xf802).w(FUNC(tecmo_state::fgscroll_w)).share(m_fgscroll)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 617, sourceColumn: 2, sourceEndLine: 617, share: 'fgscroll'};
MERGE (n:KG {id: 'handler:tecmo_state.fgscroll_w'}) SET n:Handler SET n += {method: 'fgscroll_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 483, sourceColumn: 1, sourceEndLine: 490, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_fgscroll[offset] = data;

	m_screen->update_partial(m_screen->vpos());
	m_fg_tilemap->set_scrollx(0, m_fgscroll[0] + 256 * m_fgscroll[1]);
	m_fg_tilemap->set_scrolly(0, m_fgscroll[2]);'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range20'}) SET n:AddressRange SET n += {start: 63491, end: 63493, raw: 'map(0xf803, 0xf805).w(FUNC(tecmo_state::bgscroll_w)).share(m_bgscroll)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 618, sourceColumn: 2, sourceEndLine: 618, share: 'bgscroll'};
MERGE (n:KG {id: 'handler:tecmo_state.bgscroll_w'}) SET n:Handler SET n += {method: 'bgscroll_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 492, sourceColumn: 1, sourceEndLine: 499, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_bgscroll[offset] = data;

	m_screen->update_partial(m_screen->vpos());
	m_bg_tilemap->set_scrollx(0, m_bgscroll[0] + 256 * m_bgscroll[1]);
	m_bg_tilemap->set_scrolly(0, m_bgscroll[2]);'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range21'}) SET n:AddressRange SET n += {start: 63494, end: 63494, raw: 'map(0xf806, 0xf806).w("soundlatch", FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 619, sourceColumn: 2, sourceEndLine: 619};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 678, sourceColumn: 2, sourceEndLine: 678};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range22'}) SET n:AddressRange SET n += {start: 63495, end: 63495, raw: 'map(0xf807, 0xf807).w(FUNC(tecmo_state::flipscreen_w))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 620, sourceColumn: 2, sourceEndLine: 620};
MERGE (n:KG {id: 'handler:tecmo_state.flipscreen_w'}) SET n:Handler SET n += {method: 'flipscreen_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 501, sourceColumn: 1, sourceEndLine: 504, sourceParameters: 'uint8_t data', sourceBody: 'flip_screen_set(BIT(data, 0));'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range23'}) SET n:AddressRange SET n += {start: 63496, end: 63496, raw: 'map(0xf808, 0xf808).w(FUNC(tecmo_state::bankswitch_w))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 621, sourceColumn: 2, sourceEndLine: 621};
MERGE (n:KG {id: 'handler:tecmo_state.bankswitch_w'}) SET n:Handler SET n += {method: 'bankswitch_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 528, sourceColumn: 1, sourceEndLine: 531, sourceParameters: 'uint8_t data', sourceBody: 'm_mainbank->set_entry(data >> 3);'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_map/range24'}) SET n:AddressRange SET n += {start: 63499, end: 63499, raw: 'map(0xf80b, 0xf80b).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 622, sourceColumn: 2, sourceEndLine: 622};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 651, sourceColumn: 2, sourceEndLine: 651};
MERGE (n:KG {id: 'map:tecmo_state.rygar_sound_map'}) SET n:AddressMap SET n += {cls: 'tecmo_state', name: 'rygar_sound_map', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 685, sourceColumn: 1, sourceEndLine: 694};
MERGE (n:KG {id: 'map:tecmo_state.rygar_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 687, sourceColumn: 2, sourceEndLine: 687, rom: true};
MERGE (n:KG {id: 'map:tecmo_state.rygar_sound_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 18431, raw: 'map(0x4000, 0x47ff).ram()', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 688, sourceColumn: 2, sourceEndLine: 688, ram: true};
MERGE (n:KG {id: 'map:tecmo_state.rygar_sound_map/range2'}) SET n:AddressRange SET n += {start: 32768, end: 32769, raw: 'map(0x8000, 0x8001).w("ymsnd", FUNC(ym3526_device::write))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 689, sourceColumn: 2, sourceEndLine: 689};
MERGE (n:KG {id: 'handler:ym3526_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym3526_device', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 689, sourceColumn: 2, sourceEndLine: 689};
MERGE (n:KG {id: 'map:tecmo_state.rygar_sound_map/range3'}) SET n:AddressRange SET n += {start: 49152, end: 49152, raw: 'map(0xc000, 0xc000).r("soundlatch", FUNC(generic_latch_8_device::read)).w(FUNC(tecmo_state::adpcm_start_w))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 690, sourceColumn: 2, sourceEndLine: 690};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 701, sourceColumn: 2, sourceEndLine: 701};
MERGE (n:KG {id: 'handler:tecmo_state.adpcm_start_w'}) SET n:Handler SET n += {method: 'adpcm_start_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 533, sourceColumn: 1, sourceEndLine: 539, sourceParameters: 'uint8_t data', sourceBody: 'm_adpcm_pos = data << 8;
	m_adpcm_toggle = false;
	m_adpcm_enabled = true;
	m_msm->reset_w(0);'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_sound_map/range4'}) SET n:AddressRange SET n += {start: 53248, end: 53248, raw: 'map(0xd000, 0xd000).w(FUNC(tecmo_state::adpcm_end_w))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 691, sourceColumn: 2, sourceEndLine: 691};
MERGE (n:KG {id: 'handler:tecmo_state.adpcm_end_w'}) SET n:Handler SET n += {method: 'adpcm_end_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 541, sourceColumn: 1, sourceEndLine: 544, sourceParameters: 'uint8_t data', sourceBody: 'm_adpcm_end = data;'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_sound_map/range5'}) SET n:AddressRange SET n += {start: 57344, end: 57344, raw: 'map(0xe000, 0xe000).w(FUNC(tecmo_state::adpcm_vol_w))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 692, sourceColumn: 2, sourceEndLine: 692};
MERGE (n:KG {id: 'handler:tecmo_state.adpcm_vol_w'}) SET n:Handler SET n += {method: 'adpcm_vol_w', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 546, sourceColumn: 1, sourceEndLine: 550, sourceParameters: 'uint8_t data', sourceBody: '// 10k, 22k, 47k, 100k
	m_msm->set_output_gain(ALL_OUTPUTS, (data & 15) / 15.0);'};
MERGE (n:KG {id: 'map:tecmo_state.rygar_sound_map/range6'}) SET n:AddressRange SET n += {start: 61440, end: 61440, raw: 'map(0xf000, 0xf000).w("soundlatch", FUNC(generic_latch_8_device::acknowledge_w))', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 693, sourceColumn: 2, sourceEndLine: 693};
MERGE (n:KG {id: 'handler:generic_latch_8_device.acknowledge_w'}) SET n:Handler SET n += {method: 'acknowledge_w', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702};
MERGE (n:KG {id: 'machine:tecmo_state.rygar'}) SET n:MachineConfig SET n += {cls: 'tecmo_state', name: 'rygar', calls: [], stateMembers: ['{"name":"m_video_type","bits":32,"signed":true}', '{"name":"m_adpcm_end","bits":8}', '{"name":"m_adpcm_pos","bits":16}', '{"name":"m_adpcm_toggle","bits":1}', '{"name":"m_adpcm_enabled","bits":1}'], startHandlers: ['tecmo_state.video_start'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1142, sourceColumn: 1, sourceEndLine: 1183};
MERGE (n:KG {id: 'handler:tecmo_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 434, sourceColumn: 1, sourceEndLine: 455, sourceParameters: '', sourceBody: 'if (m_video_type == 2)  // gemini
	{
		m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(tecmo_state::gemini_get_bg_tile_info)), TILEMAP_SCAN_ROWS, 16, 16, 32, 16);
		m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(tecmo_state::gemini_get_fg_tile_info)), TILEMAP_SCAN_ROWS, 16, 16, 32, 16);
	}
	else    // rygar, silkworm
	{
		m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(tecmo_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 16, 16, 32, 16);
		m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(tecmo_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 16, 16, 32, 16);
	}

	m_tx_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(tecmo_state::get_tx_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);

	m_bg_tilemap->set_transparent_pen(0);
	m_fg_tilemap->set_transparent_pen(0);
	m_tx_tilemap->set_transparent_pen(0);

	m_bg_tilemap->set_scrolldx(-48, 256 + 48);
	m_fg_tilemap->set_scrolldx(-48, 256 + 48);'};
MERGE (n:KG {id: 'handler:tecmo_state.gemini_get_bg_tile_info'}) SET n:Handler SET n += {method: 'gemini_get_bg_tile_info', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 379, sourceColumn: 1, sourceEndLine: 386, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t const attr = m_bgvideoram[tile_index + 0x200];
	tileinfo.set(2,
			m_bgvideoram[tile_index] + ((attr & 0x70) << 4),
			attr & 0x0f,
			0);'};
MERGE (n:KG {id: 'handler:tecmo_state.gemini_get_fg_tile_info'}) SET n:Handler SET n += {method: 'gemini_get_fg_tile_info', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 388, sourceColumn: 1, sourceEndLine: 395, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t const attr = m_fgvideoram[tile_index + 0x200];
	tileinfo.set(1,
			m_fgvideoram[tile_index] + ((attr & 0x70) << 4),
			attr & 0x0f,
			0);'};
MERGE (n:KG {id: 'handler:tecmo_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 361, sourceColumn: 1, sourceEndLine: 368, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t const attr = m_bgvideoram[tile_index + 0x200];
	tileinfo.set(2,
			m_bgvideoram[tile_index] + ((attr & 0x07) << 8),
			attr >> 4,
			0);'};
MERGE (n:KG {id: 'handler:tecmo_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 370, sourceColumn: 1, sourceEndLine: 377, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t const attr = m_fgvideoram[tile_index + 0x200];
	tileinfo.set(1,
			m_fgvideoram[tile_index] + ((attr & 0x07) << 8),
			attr >> 4,
			0);'};
MERGE (n:KG {id: 'handler:tecmo_state.get_tx_tile_info'}) SET n:Handler SET n += {method: 'get_tx_tile_info', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 397, sourceColumn: 1, sourceEndLine: 404, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t const attr = m_txvideoram[tile_index + 0x400];
	tileinfo.set(0,
			m_txvideoram[tile_index] + ((attr & 0x03) << 8),
			attr >> 4,
			0);'};
MERGE (n:KG {id: 'bank:tecmo_state.rygar/mainbank'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 0, entries: 32, region: 'maincpu', offset: 65536, stride: 2048, raw: 'm_mainbank->configure_entries(0, 32, memregion("maincpu")->base() + 0x10000, 0x800)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1132, sourceColumn: 1, sourceEndLine: 1140};
MERGE (n:KG {id: 'device:tecmo_state.rygar/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 6000000, config: ['Z80(config, m_maincpu, 24_MHz_XTAL / 4)', 'm_maincpu->set_addrmap(AS_PROGRAM, &tecmo_state::rygar_map)', 'm_maincpu->set_vblank_int("screen", FUNC(tecmo_state::irq0_line_hold))'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1145, sourceColumn: 2, sourceEndLine: 1145};
MERGE (n:KG {id: 'device:tecmo_state.rygar/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(tecmo_state::irq0_line_hold))', ownerTag: 'maincpu', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1147, sourceColumn: 2, sourceEndLine: 1147, targetTag: 'screen', targetClass: 'tecmo_state', targetMethod: 'irq0_line_hold'};
MERGE (n:KG {id: 'handler:tecmo_state.irq0_line_hold'}) SET n:Handler SET n += {method: 'irq0_line_hold', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1147, sourceColumn: 2, sourceEndLine: 1147};
MERGE (n:KG {id: 'device:tecmo_state.rygar/soundcpu'}) SET n:Device SET n += {type: 'Z80', tag: 'soundcpu', clock: 4000000, config: ['Z80(config, m_soundcpu, 4_MHz_XTAL)', 'm_soundcpu->set_addrmap(AS_PROGRAM, &tecmo_state::rygar_sound_map)'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1149, sourceColumn: 2, sourceEndLine: 1149};
MERGE (n:KG {id: 'device:tecmo_state.rygar/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1154, sourceColumn: 2, sourceEndLine: 1154};
MERGE (n:KG {id: 'device:tecmo_state.rygar/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(24_MHz_XTAL / 4, 384, 0, 256, 264, 16, 240)', 'm_screen->set_screen_update(FUNC(tecmo_state::screen_update))', 'm_screen->set_palette(m_palette)'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1157, sourceColumn: 2, sourceEndLine: 1157, configCalls: ['set_raw(6000000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 264, 16, 240], screenRawExpr: ['24_MHz_XTAL / 4', '384', '0', '256', '264', '16', '240']};
MERGE (n:KG {id: 'device:tecmo_state.rygar/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(tecmo_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1159, sourceColumn: 2, sourceEndLine: 1159, targetClass: 'tecmo_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:tecmo_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 514, sourceColumn: 1, sourceEndLine: 525, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'screen.priority().fill(0, cliprect);
	bitmap.fill(0x100, cliprect);
	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 1);
	m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 2);
	m_tx_tilemap->draw(screen, bitmap, cliprect, 0, 4);

	m_sprgen->draw_sprites_8bit(screen, bitmap, cliprect, m_spriteram, m_spriteram.bytes(), m_video_type, flip_screen());

	return 0;'};
MERGE (n:KG {id: 'handler:tecmo_spr_device.draw_sprites_8bit'}) SET n:Handler SET n += {method: 'draw_sprites_8bit', ownerClass: 'tecmo_spr_device', sourceFile: 'src/mame/shared/tecmo_spr.cpp', sourceLine: 203, sourceColumn: 1, sourceEndLine: 255, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect, const uint8_t *spriteram, int size, int video_type, bool flip_screen', sourceBody: 'for (int offs = size - 8; offs >= 0; offs -= 8)
	{
		uint8_t const bank = spriteram[offs + 0];
		if (BIT(bank, 2)) // visible
		{
			uint8_t const flags = spriteram[offs + 3];
			uint32_t const priority_mask = m_pri_cb(flags >> 6);

			uint8_t const which = spriteram[offs + 1];
			uint32_t code;
			uint8_t size = spriteram[offs + 2] & 3;

			if (video_type != 0)   // gemini, silkworm
				code = which + ((bank & 0xf8) << 5);
			else                        // rygar
				code = which + ((bank & 0xf0) << 4);

			code &= ~((1 << (size * 2)) - 1);
			size = 1 << size;

			int xpos = spriteram[offs + 5] - ((flags & 0x10) << 4);
			int ypos = spriteram[offs + 4] - ((flags & 0x20) << 3);
			bool flipx = BIT(bank, 0);
			bool flipy = BIT(bank, 1);

			if (flip_screen)
			{
				xpos = 256 - (8 * size) - xpos;
				ypos = 256 - (8 * size) - ypos;
				flipx = !flipx;
				flipy = !flipy;
			}

			for (int y = 0; y < size; y++)
			{
				for (int x = 0; x < size; x++)
				{
					int const sx = xpos + 8 * (flipx ? (size - 1 - x) : x);
					int const sy = ypos + 8 * (flipy ? (size - 1 - y) : y);
					gfx(0)->prio_transpen(bitmap,cliprect,
							code + layout[y][x],
							flags & 0xf,
							flipx, flipy,
							sx, sy,
							screen.priority(),
							priority_mask, 0);
				}
			}
		}
	}'};
MERGE (n:KG {id: 'device:tecmo_state.rygar/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_tecmo)'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1162, sourceColumn: 2, sourceEndLine: 1162, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:tecmo_state.rygar/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(palette_device::xBRG_444, 1024).set_endianness(ENDIANNESS_BIG)'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1163, sourceColumn: 2, sourceEndLine: 1163};
MERGE (n:KG {id: 'device:tecmo_state.rygar/spritegen'}) SET n:Device SET n += {type: 'TECMO_SPRITE', tag: 'spritegen', clock: null, config: ['TECMO_SPRITE(config, m_sprgen, m_palette, gfx_tecmo_spr)', 'm_sprgen->set_pri_callback(FUNC(tecmo_state::pri_cb))'], cls: 'tecmo_spr_device', clsHierarchy: ['tecmo_spr_device'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1165, sourceColumn: 2, sourceEndLine: 1165, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:tecmo_state.rygar/spritegen/callback:spritegen:0'}) SET n:Callback SET n += {signal: 'set_pri_callback', delegate: 1, operation: 'set_pri_callback', raw: 'm_sprgen->set_pri_callback(FUNC(tecmo_state::pri_cb))', ownerTag: 'spritegen', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1166, sourceColumn: 2, sourceEndLine: 1166, targetClass: 'tecmo_state', targetMethod: 'pri_cb'};
MERGE (n:KG {id: 'handler:tecmo_state.pri_cb'}) SET n:Handler SET n += {method: 'pri_cb', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 413, sourceColumn: 1, sourceEndLine: 424, sourceParameters: 'uint8_t pri', sourceBody: '// bg: 1; fg:2; text: 4
	switch (pri)
	{
		default:
		case 0x0: return 0;
		case 0x1: return 0xf0; // obscured by text layer
		case 0x2: return 0xf0 | 0xcc; // obscured by foreground
		case 0x3: return 0xf0 | 0xcc | 0xaa; // obscured by bg and fg
	}'};
MERGE (n:KG {id: 'device:tecmo_state.rygar/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1169, sourceColumn: 2, sourceEndLine: 1169};
MERGE (n:KG {id: 'device:tecmo_state.rygar/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['generic_latch_8_device &soundlatch(GENERIC_LATCH_8(config, "soundlatch"))', 'soundlatch.data_pending_callback().set_inputline(m_soundcpu, INPUT_LINE_NMI)', 'soundlatch.set_separate_acknowledge(true)'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1171, sourceColumn: 2, sourceEndLine: 1171};
MERGE (n:KG {id: 'device:tecmo_state.rygar/soundlatch/callback:soundlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set_inputline', raw: 'soundlatch.data_pending_callback().set_inputline(m_soundcpu, INPUT_LINE_NMI)', ownerTag: 'soundlatch', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1172, sourceColumn: 2, sourceEndLine: 1172, inputLine: 'INPUT_LINE_NMI', targetTag: 'soundcpu'};
MERGE (n:KG {id: 'device:tecmo_state.rygar/ymsnd'}) SET n:Device SET n += {type: 'YM3526', tag: 'ymsnd', clock: 4000000, config: ['ym3526_device &ymsnd(YM3526(config, "ymsnd", 4_MHz_XTAL))', 'ymsnd.irq_handler().set_inputline(m_soundcpu, 0)', 'ymsnd.add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1175, sourceColumn: 2, sourceEndLine: 1175};
MERGE (n:KG {id: 'audioroute:device:tecmo_state.rygar/ymsnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'ymsnd.add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1177, sourceColumn: 2, sourceEndLine: 1177};
MERGE (n:KG {id: 'device:tecmo_state.rygar/ymsnd/callback:ymsnd:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set_inputline', raw: 'ymsnd.irq_handler().set_inputline(m_soundcpu, 0)', ownerTag: 'ymsnd', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1176, sourceColumn: 2, sourceEndLine: 1176, inputLine: '0', targetTag: 'soundcpu'};
MERGE (n:KG {id: 'device:tecmo_state.rygar/msm'}) SET n:Device SET n += {type: 'MSM5205', tag: 'msm', clock: 400000, config: ['MSM5205(config, m_msm, 400_kHz_XTAL)', 'm_msm->vck_callback().set(FUNC(tecmo_state::adpcm_int))', 'm_msm->set_prescaler_selector(msm5205_device::S48_4B)', 'm_msm->add_route(ALL_OUTPUTS, "mono", 0.50)'], sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1179, sourceColumn: 2, sourceEndLine: 1179};
MERGE (n:KG {id: 'audioroute:device:tecmo_state.rygar/msm/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'm_msm->add_route(ALL_OUTPUTS, "mono", 0.50)', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1182, sourceColumn: 2, sourceEndLine: 1182};
MERGE (n:KG {id: 'device:tecmo_state.rygar/msm/callback:msm:0'}) SET n:Callback SET n += {signal: 'vck_callback', operation: 'set', raw: 'm_msm->vck_callback().set(FUNC(tecmo_state::adpcm_int))', ownerTag: 'msm', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1180, sourceColumn: 2, sourceEndLine: 1180, targetClass: 'tecmo_state', targetMethod: 'adpcm_int'};
MERGE (n:KG {id: 'handler:tecmo_state.adpcm_int'}) SET n:Handler SET n += {method: 'adpcm_int', ownerClass: 'tecmo_state', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 552, sourceColumn: 1, sourceEndLine: 577, sourceParameters: 'int state', sourceBody: 'if (!state || !m_adpcm_enabled)
		return;

	const uint8_t data = m_adpcm_rom[m_adpcm_pos % m_adpcm_rom.bytes()];

	if (m_adpcm_toggle)
	{
		m_msm->data_w(data & 0xf);

		const uint8_t hi = m_adpcm_pos >> 8;
		m_adpcm_pos++;

		// it checks against m_adpcm_end the same time as m_adpcm_pos low carry out
		if ((m_adpcm_pos & 0xff) == 0 && (hi == m_adpcm_end))
		{
			m_adpcm_enabled = false;
			m_msm->reset_w(1);
		}
	}
	else
		m_msm->data_w(data >> 4);

	m_adpcm_toggle = !m_adpcm_toggle;'};
MERGE (n:KG {id: 'inputs:tecmo_default'}) SET n:InputPorts SET n += {name: 'tecmo_default', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 725, sourceColumn: 8, sourceEndLine: 725};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY1'}) SET n:Port SET n += {tag: 'JOY1', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS1'}) SET n:Port SET n += {tag: 'BUTTONS1', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_BUTTON1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_BUTTON2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY2'}) SET n:Port SET n += {tag: 'JOY2', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/JOY2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS2'}) SET n:Port SET n += {tag: 'BUTTONS2', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/BUTTONS2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/SYS_0'}) SET n:Port SET n += {tag: 'SYS_0', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/SYS_0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/SYS_1'}) SET n:Port SET n += {tag: 'SYS_1', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/SYS_1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/SYS_2'}) SET n:Port SET n += {tag: 'SYS_2', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/SYS_2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/SYS_3'}) SET n:Port SET n += {tag: 'SYS_3', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/SYS_3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWA/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWA/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWA/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWA/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWA/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWA/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: false};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWB/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWB/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWB/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:tecmo_default/DSWB/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:rygar'}) SET n:InputPorts SET n += {name: 'rygar', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 783, sourceColumn: 8, sourceEndLine: 783};
MERGE (n:KG {id: 'inputs:rygar/BUTTONS1'}) SET n:Port SET n += {tag: 'BUTTONS1', modify: true};
MERGE (n:KG {id: 'inputs:rygar/BUTTONS1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_SERVICE1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:rygar/SYS_0'}) SET n:Port SET n += {tag: 'SYS_0', modify: true};
MERGE (n:KG {id: 'inputs:rygar/SYS_0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_START2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:rygar/SYS_0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_START1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:rygar/SYS_0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_COIN2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:rygar/SYS_0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_COIN1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:rygar/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: true};
MERGE (n:KG {id: 'inputs:rygar/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:!1,!2")'], name: 'Coin A', defaultValue: 0, location: 'SW1:!1,!2', settings: ['1=2C 1C', '0=1C 1C', '2=1C 2C', '3=1C 3C']};
MERGE (n:KG {id: 'inputs:rygar/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW1:!3,!4")'], name: 'Coin B', defaultValue: 0, location: 'SW1:!3,!4', settings: ['4=2C 1C', '0=1C 1C', '8=1C 2C', '12=1C 3C']};
MERGE (n:KG {id: 'inputs:rygar/DSWA/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW1:!5,!6")'], name: 'Lives', defaultValue: 0, location: 'SW1:!5,!6', settings: ['48=2', '0=3', '16=4', '32=5']};
MERGE (n:KG {id: 'inputs:rygar/DSWA/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW1:!7")'], name: 'Cabinet', defaultValue: 64, location: 'SW1:!7', settings: ['64=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:rygar/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: true};
MERGE (n:KG {id: 'inputs:rygar/DSWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:!1,!2")'], name: 'Bonus Life', defaultValue: 0, location: 'SW2:!1,!2', settings: ['0=50k 200k 500k', '1=100k 300k 600k', '2=200k 500k', '3=100k']};
MERGE (n:KG {id: 'inputs:rygar/DSWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW2:!5,!6")'], name: 'Difficulty', defaultValue: 0, location: 'SW2:!5,!6', settings: ['0=Normal', '16=Hard', '32=Harder', '48=Hardest']};
MERGE (n:KG {id: 'inputs:rygar/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW2:!7")'], name: '2P Can Start Anytime', defaultValue: 0, location: 'SW2:!7', settings: ['0=No', '64=Yes']};
MERGE (n:KG {id: 'inputs:rygar/DSWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:!8")'], name: 'Allow Continue', defaultValue: 128, location: 'SW2:!8', settings: ['0=No', '128=Yes']};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x4_packed_msb', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: [0, 4, 8, 12, 16, 20, 24, 28], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x4_row_2x2_group_packed_msb'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x4_row_2x2_group_packed_msb', width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: [0, 4, 8, 12, 16, 20, 24, 28, 256, 260, 264, 268, 272, 276, 280, 284], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224, 512, 544, 576, 608, 640, 672, 704, 736], charIncrement: 1024};
MERGE (n:KG {id: 'gfxdecode:gfx_tecmo'}) SET n:GfxDecode SET n += {name: 'gfx_tecmo', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1121, sourceColumn: 8, sourceEndLine: 1121};
MERGE (n:KG {id: 'gfxdecode:gfx_tecmo/e0'}) SET n:GfxDecodeEntry SET n += {region: 'txtiles', offset: 0, layout: 'gfx_8x8x4_packed_msb', colorBase: 256, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_tecmo/e1'}) SET n:GfxDecodeEntry SET n += {region: 'fgtiles', offset: 0, layout: 'gfx_8x8x4_row_2x2_group_packed_msb', colorBase: 512, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_tecmo/e2'}) SET n:GfxDecodeEntry SET n += {region: 'bgtiles', offset: 0, layout: 'gfx_8x8x4_row_2x2_group_packed_msb', colorBase: 768, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_tecmo_spr'}) SET n:GfxDecode SET n += {name: 'gfx_tecmo_spr', sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1127, sourceColumn: 8, sourceEndLine: 1127};
MERGE (n:KG {id: 'gfxdecode:gfx_tecmo_spr/e0'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'gfx_8x8x4_packed_msb', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:rygar'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1831, sourceColumn: 1, sourceEndLine: 1831};
MATCH (a:KG {id: 'game:rygar'}), (b:KG {id: 'machine:tecmo_state.rygar'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:rygar'}), (b:KG {id: 'inputs:rygar'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:rygar'}), (b:KG {id: 'romset:rygar'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:tecmo_spr.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:sound/msm5205.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:sound/ymopl.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1142, sourceColumn: 1, sourceEndLine: 1183};
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'handler:tecmo_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'bank:tecmo_state.rygar/mainbank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/soundcpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'gfxdecode:gfx_tecmo'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/spritegen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'gfxdecode:gfx_tecmo_spr'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'spritegen'};
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/ymsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tecmo_state.rygar'}), (b:KG {id: 'device:tecmo_state.rygar/msm'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:rygar'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 783, sourceColumn: 8, sourceEndLine: 783};
MATCH (a:KG {id: 'inputs:rygar'}), (b:KG {id: 'inputs:tecmo_default'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:rygar'}), (b:KG {id: 'inputs:rygar/BUTTONS1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rygar'}), (b:KG {id: 'inputs:rygar/SYS_0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rygar'}), (b:KG {id: 'inputs:rygar/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rygar'}), (b:KG {id: 'inputs:rygar/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:rygar'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1259, sourceColumn: 1, sourceEndLine: 1259};
MATCH (a:KG {id: 'romset:rygar'}), (b:KG {id: 'region:rygar/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rygar'}), (b:KG {id: 'region:rygar/soundcpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rygar'}), (b:KG {id: 'region:rygar/txtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rygar'}), (b:KG {id: 'region:rygar/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rygar'}), (b:KG {id: 'region:rygar/fgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rygar'}), (b:KG {id: 'region:rygar/bgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rygar'}), (b:KG {id: 'region:rygar/adpcm'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:tecmo_state.video_start'}), (b:KG {id: 'handler:tecmo_state.gemini_get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tecmo_state.video_start'}), (b:KG {id: 'handler:tecmo_state.gemini_get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tecmo_state.video_start'}), (b:KG {id: 'handler:tecmo_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tecmo_state.video_start'}), (b:KG {id: 'handler:tecmo_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tecmo_state.video_start'}), (b:KG {id: 'handler:tecmo_state.get_tx_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:tecmo_state.rygar/mainbank'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1132, sourceColumn: 1, sourceEndLine: 1140};
MATCH (a:KG {id: 'device:tecmo_state.rygar/maincpu'}), (b:KG {id: 'device:tecmo_state.rygar/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/maincpu'}), (b:KG {id: 'map:tecmo_state.rygar_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:tecmo_state.rygar/soundcpu'}), (b:KG {id: 'map:tecmo_state.rygar_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:tecmo_state.rygar/screen'}), (b:KG {id: 'device:tecmo_state.rygar/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1121, sourceColumn: 8, sourceEndLine: 1121};
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo'}), (b:KG {id: 'gfxdecode:gfx_tecmo/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo'}), (b:KG {id: 'gfxdecode:gfx_tecmo/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo'}), (b:KG {id: 'gfxdecode:gfx_tecmo/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/spritegen'}), (b:KG {id: 'device:tecmo_state.rygar/spritegen/callback:spritegen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo_spr'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 1127, sourceColumn: 8, sourceEndLine: 1127};
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo_spr'}), (b:KG {id: 'gfxdecode:gfx_tecmo_spr/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/soundlatch'}), (b:KG {id: 'device:tecmo_state.rygar/soundlatch/callback:soundlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/ymsnd'}), (b:KG {id: 'audioroute:device:tecmo_state.rygar/ymsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/ymsnd'}), (b:KG {id: 'device:tecmo_state.rygar/ymsnd/callback:ymsnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/msm'}), (b:KG {id: 'audioroute:device:tecmo_state.rygar/msm/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/msm'}), (b:KG {id: 'device:tecmo_state.rygar/msm/callback:msm:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 725, sourceColumn: 8, sourceEndLine: 725};
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/JOY1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/JOY2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/SYS_0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/SYS_1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/SYS_2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/SYS_3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default'}), (b:KG {id: 'inputs:tecmo_default/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rygar/BUTTONS1'}), (b:KG {id: 'inputs:rygar/BUTTONS1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/SYS_0'}), (b:KG {id: 'inputs:rygar/SYS_0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/SYS_0'}), (b:KG {id: 'inputs:rygar/SYS_0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/SYS_0'}), (b:KG {id: 'inputs:rygar/SYS_0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/SYS_0'}), (b:KG {id: 'inputs:rygar/SYS_0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/DSWA'}), (b:KG {id: 'inputs:rygar/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/DSWA'}), (b:KG {id: 'inputs:rygar/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/DSWA'}), (b:KG {id: 'inputs:rygar/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/DSWA'}), (b:KG {id: 'inputs:rygar/DSWA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/DSWB'}), (b:KG {id: 'inputs:rygar/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/DSWB'}), (b:KG {id: 'inputs:rygar/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/DSWB'}), (b:KG {id: 'inputs:rygar/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rygar/DSWB'}), (b:KG {id: 'inputs:rygar/DSWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:rygar/maincpu'}), (b:KG {id: 'rom:rygar/maincpu/5.5p'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/maincpu'}), (b:KG {id: 'rom:rygar/maincpu/cpu_5m.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/maincpu'}), (b:KG {id: 'rom:rygar/maincpu/cpu_5j.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/soundcpu'}), (b:KG {id: 'rom:rygar/soundcpu/cpu_4h.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/txtiles'}), (b:KG {id: 'rom:rygar/txtiles/cpu_8k.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/sprites'}), (b:KG {id: 'rom:rygar/sprites/vid_6k.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/sprites'}), (b:KG {id: 'rom:rygar/sprites/vid_6j.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/sprites'}), (b:KG {id: 'rom:rygar/sprites/vid_6h.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/sprites'}), (b:KG {id: 'rom:rygar/sprites/vid_6g.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/fgtiles'}), (b:KG {id: 'rom:rygar/fgtiles/vid_6p.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/fgtiles'}), (b:KG {id: 'rom:rygar/fgtiles/vid_6o.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/fgtiles'}), (b:KG {id: 'rom:rygar/fgtiles/vid_6n.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/fgtiles'}), (b:KG {id: 'rom:rygar/fgtiles/vid_6l.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/bgtiles'}), (b:KG {id: 'rom:rygar/bgtiles/vid_6f.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/bgtiles'}), (b:KG {id: 'rom:rygar/bgtiles/vid_6e.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/bgtiles'}), (b:KG {id: 'rom:rygar/bgtiles/vid_6c.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/bgtiles'}), (b:KG {id: 'rom:rygar/bgtiles/vid_6b.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rygar/adpcm'}), (b:KG {id: 'rom:rygar/adpcm/cpu_1f.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:tecmo_state.irq0_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 596, sourceColumn: 1, sourceEndLine: 623};
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range18'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range19'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range20'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range21'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range22'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range23'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map'}), (b:KG {id: 'map:tecmo_state.rygar_map/range24'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/tecmo.cpp', sourceLine: 685, sourceColumn: 1, sourceEndLine: 694};
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map'}), (b:KG {id: 'map:tecmo_state.rygar_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map'}), (b:KG {id: 'map:tecmo_state.rygar_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map'}), (b:KG {id: 'map:tecmo_state.rygar_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map'}), (b:KG {id: 'map:tecmo_state.rygar_sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map'}), (b:KG {id: 'map:tecmo_state.rygar_sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map'}), (b:KG {id: 'map:tecmo_state.rygar_sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map'}), (b:KG {id: 'map:tecmo_state.rygar_sound_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/screen/callback:screen:0'}), (b:KG {id: 'handler:tecmo_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo/e1'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_row_2x2_group_packed_msb'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo/e2'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_row_2x2_group_packed_msb'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/spritegen/callback:spritegen:0'}), (b:KG {id: 'handler:tecmo_state.pri_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_tecmo_spr/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'device:tecmo_state.rygar/soundcpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/ymsnd/callback:ymsnd:0'}), (b:KG {id: 'device:tecmo_state.rygar/soundcpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:tecmo_state.rygar/msm/callback:msm:0'}), (b:KG {id: 'handler:tecmo_state.adpcm_int'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/JOY1'}), (b:KG {id: 'inputs:tecmo_default/JOY1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/JOY1'}), (b:KG {id: 'inputs:tecmo_default/JOY1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/JOY1'}), (b:KG {id: 'inputs:tecmo_default/JOY1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/JOY1'}), (b:KG {id: 'inputs:tecmo_default/JOY1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/BUTTONS1'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/BUTTONS1'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/BUTTONS1'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/BUTTONS1'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/JOY2'}), (b:KG {id: 'inputs:tecmo_default/JOY2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/JOY2'}), (b:KG {id: 'inputs:tecmo_default/JOY2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/JOY2'}), (b:KG {id: 'inputs:tecmo_default/JOY2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/JOY2'}), (b:KG {id: 'inputs:tecmo_default/JOY2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/BUTTONS2'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/BUTTONS2'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/BUTTONS2'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/BUTTONS2'}), (b:KG {id: 'inputs:tecmo_default/BUTTONS2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/SYS_0'}), (b:KG {id: 'inputs:tecmo_default/SYS_0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/SYS_1'}), (b:KG {id: 'inputs:tecmo_default/SYS_1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/SYS_2'}), (b:KG {id: 'inputs:tecmo_default/SYS_2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/SYS_3'}), (b:KG {id: 'inputs:tecmo_default/SYS_3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWA'}), (b:KG {id: 'inputs:tecmo_default/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWA'}), (b:KG {id: 'inputs:tecmo_default/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWA'}), (b:KG {id: 'inputs:tecmo_default/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWA'}), (b:KG {id: 'inputs:tecmo_default/DSWA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWA'}), (b:KG {id: 'inputs:tecmo_default/DSWA/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWA'}), (b:KG {id: 'inputs:tecmo_default/DSWA/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWA'}), (b:KG {id: 'inputs:tecmo_default/DSWA/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWA'}), (b:KG {id: 'inputs:tecmo_default/DSWA/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWB'}), (b:KG {id: 'inputs:tecmo_default/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWB'}), (b:KG {id: 'inputs:tecmo_default/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWB'}), (b:KG {id: 'inputs:tecmo_default/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWB'}), (b:KG {id: 'inputs:tecmo_default/DSWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWB'}), (b:KG {id: 'inputs:tecmo_default/DSWB/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWB'}), (b:KG {id: 'inputs:tecmo_default/DSWB/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWB'}), (b:KG {id: 'inputs:tecmo_default/DSWB/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tecmo_default/DSWB'}), (b:KG {id: 'inputs:tecmo_default/DSWB/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range2'}), (b:KG {id: 'handler:tecmo_state.txvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range3'}), (b:KG {id: 'handler:tecmo_state.fgvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range4'}), (b:KG {id: 'handler:tecmo_state.bgvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range6'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range14'}), (b:KG {id: 'handler:tecmo_state.dsw_l_r_0'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range15'}), (b:KG {id: 'handler:tecmo_state.dsw_h_r_0'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range16'}), (b:KG {id: 'handler:tecmo_state.dsw_l_r_1'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range17'}), (b:KG {id: 'handler:tecmo_state.dsw_h_r_1'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range19'}), (b:KG {id: 'handler:tecmo_state.fgscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range20'}), (b:KG {id: 'handler:tecmo_state.bgscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range21'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range22'}), (b:KG {id: 'handler:tecmo_state.flipscreen_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range23'}), (b:KG {id: 'handler:tecmo_state.bankswitch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_map/range24'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map/range2'}), (b:KG {id: 'handler:ym3526_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map/range3'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map/range3'}), (b:KG {id: 'handler:tecmo_state.adpcm_start_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map/range4'}), (b:KG {id: 'handler:tecmo_state.adpcm_end_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map/range5'}), (b:KG {id: 'handler:tecmo_state.adpcm_vol_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tecmo_state.rygar_sound_map/range6'}), (b:KG {id: 'handler:generic_latch_8_device.acknowledge_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'handler:tecmo_state.screen_update'}), (b:KG {id: 'handler:tecmo_spr_device.draw_sprites_8bit'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x4_row_2x2_group_packed_msb'}), (b:KG {id: 'file:src/mame/tecmo/tecmo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
