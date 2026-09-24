// mamekit knowledge graph — driver src/mame/bally/mcr3.cpp
// generated 2026-09-24T02:30:27.530Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/bally/mcr3.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/bally/mcr3.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:mcr3.h'}) SET n:SourceFile SET n += {path: 'mcr3.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/rescap.h'}) SET n:SourceFile SET n += {path: 'machine/rescap.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:spyhunt.lh'}) SET n:SourceFile SET n += {path: 'spyhunt.lh', external: true};
MERGE (n:KG {id: 'file:turbotag.lh'}) SET n:SourceFile SET n += {path: 'turbotag.lh', external: true};
MERGE (n:KG {id: 'file:csd.h'}) SET n:SourceFile SET n += {path: 'csd.h', external: true};
MERGE (n:KG {id: 'file:midway_sound.h'}) SET n:SourceFile SET n += {path: 'midway_sound.h', external: true};
MERGE (n:KG {id: 'file:src/mame/bally/csd.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/bally/csd.cpp'};
MERGE (n:KG {id: 'file:src/mame/bally/midway_sound.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/bally/midway_sound.cpp'};
MERGE (n:KG {id: 'handler:mcr3_state.mcrmono_control_port_w'}) SET n:Handler SET n += {method: 'mcrmono_control_port_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 122, sourceColumn: 1, sourceEndLine: 138, sourceParameters: 'uint8_t data', sourceBody: '/*
	    Bit layout is as follows:
	        D7 = n/c
	        D6 = cocktail flip
	        D5 = n/c
	        D4 = n/c
	        D3 = n/c
	        D2 = n/c
	        D1 = n/c
	        D0 = coin meter 1
	*/

	machine().bookkeeping().coin_counter_w(0, (data >> 0) & 1);
	m_mcr_cocktail_flip = (data >> 6) & 1;'};
MERGE (n:KG {id: 'game:spyhunt'}) SET n:Game SET n += {name: 'spyhunt', year: '1983', company: 'Bally Midway', fullname: 'Spy Hunter', monitor: 'ROT90', cls: 'mcrsc_csd_state', init: 'init_spyhunt', flags: 'MACHINE_SUPPORTS_SAVE, layout_spyhunt', kind: 'arcade', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1700, sourceColumn: 1, sourceEndLine: 1700};
MERGE (n:KG {id: 'romset:spyhunt'}) SET n:RomSet SET n += {name: 'spyhunt', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1413, sourceColumn: 1, sourceEndLine: 1413};
MERGE (n:KG {id: 'region:spyhunt/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1228, sourceColumn: 2, sourceEndLine: 1228};
MERGE (n:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg0_2-9-84.6d'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_pg0_2-9-84.6d', offset: 0, size: 8192, crc: '1721b88f', sha1: 'c7a641f0c05bd343ebc79e1c1be3a26da5fb77f0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1415, sourceColumn: 2, sourceEndLine: 1415};
MERGE (n:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg1_2-9-84.7d'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_pg1_2-9-84.7d', offset: 8192, size: 8192, crc: '909d044f', sha1: '67237c3efde568d52e9f8b0d36df726d05a9d9e4', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1416, sourceColumn: 2, sourceEndLine: 1416};
MERGE (n:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg2_2-9-84.8d'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_pg2_2-9-84.8d', offset: 16384, size: 8192, crc: 'afeeb8bd', sha1: 'fde32863d08a745dfe19f1c1382810eab6aebcec', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1417, sourceColumn: 2, sourceEndLine: 1417};
MERGE (n:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg3_2-9-84.9d'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_pg3_2-9-84.9d', offset: 24576, size: 8192, crc: '5e744381', sha1: '5b75e4f44dfd63d6e35294c606b84231c216e57d', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1418, sourceColumn: 2, sourceEndLine: 1418};
MERGE (n:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg4_2-9-84.10d'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_pg4_2-9-84.10d', offset: 32768, size: 8192, crc: 'a3033c15', sha1: 'e9811450a7c952561912777d679fe45a6b5a794a', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1419, sourceColumn: 2, sourceEndLine: 1419};
MERGE (n:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg5_2-9-84.11d'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_pg5_2-9-84.11d', offset: 49152, size: 8192, crc: '88aa1e99', sha1: 'c173512ed76973d2f86a74380bb7b7c5bb4f5285', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1420, sourceColumn: 2, sourceEndLine: 1420, continueSegments: [40960, 8192, 8192]};
MERGE (n:KG {id: 'region:spyhunt/ssio:cpu'}) SET n:RomRegion SET n += {tag: 'ssio:cpu', size: 65536, flags: '0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1423, sourceColumn: 2, sourceEndLine: 1423};
MERGE (n:KG {id: 'rom:spyhunt/ssio:cpu/spy-hunter_snd_0_sd_11-18-83.a7'}) SET n:Rom SET n += {file: 'spy-hunter_snd_0_sd_11-18-83.a7', offset: 0, size: 4096, crc: 'c95cf31e', sha1: 'd1b0e299a27e306ddbc0654fd3a9d981c92afe8c', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1424, sourceColumn: 2, sourceEndLine: 1424};
MERGE (n:KG {id: 'rom:spyhunt/ssio:cpu/spy-hunter_snd_1_sd_11-18-83.a8'}) SET n:Rom SET n += {file: 'spy-hunter_snd_1_sd_11-18-83.a8', offset: 4096, size: 4096, crc: '12aaa48e', sha1: 'c6b835fc45e4484a4d52b682ce015caa242c8b4f', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1425, sourceColumn: 2, sourceEndLine: 1425};
MERGE (n:KG {id: 'region:spyhunt/csd:cpu'}) SET n:RomRegion SET n += {tag: 'csd:cpu', size: 32768, flags: '0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1427, sourceColumn: 2, sourceEndLine: 1427};
MERGE (n:KG {id: 'rom:spyhunt/csd:cpu/spy-hunter_cs_deluxe_u7_a_11-18-83.u7'}) SET n:Rom SET n += {file: 'spy-hunter_cs_deluxe_u7_a_11-18-83.u7', offset: 0, size: 8192, crc: '6e689fe7', sha1: '38ad2e9f12b9d389fb2568ebcb32c8bd1ac6879e', skip: 1};
MERGE (n:KG {id: 'rom:spyhunt/csd:cpu/spy-hunter_cs_deluxe_u17_b_11-18-83.u17'}) SET n:Rom SET n += {file: 'spy-hunter_cs_deluxe_u17_b_11-18-83.u17', offset: 1, size: 8192, crc: '0d9ddce6', sha1: 'd955c0e67fc78b517cc229601ab4023cc5a644c2', skip: 1};
MERGE (n:KG {id: 'rom:spyhunt/csd:cpu/spy-hunter_cs_deluxe_u8_c_11-18-83.u8'}) SET n:Rom SET n += {file: 'spy-hunter_cs_deluxe_u8_c_11-18-83.u8', offset: 16384, size: 8192, crc: '35563cd0', sha1: '5708d374dd56758194c95118f096ea51bf12bf64', skip: 1};
MERGE (n:KG {id: 'rom:spyhunt/csd:cpu/spy-hunter_cs_deluxe_u18_d_11-18-83.u18'}) SET n:Rom SET n += {file: 'spy-hunter_cs_deluxe_u18_d_11-18-83.u18', offset: 16385, size: 8192, crc: '63d3f5b1', sha1: '5864a7e9b6bc3d2df6891d40965a7a0efbba6837', skip: 1};
MERGE (n:KG {id: 'region:spyhunt/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 32768, flags: '0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1237, sourceColumn: 2, sourceEndLine: 1237};
MERGE (n:KG {id: 'rom:spyhunt/gfx1/spy-hunter_cpu_bg0_11-18-83.3a'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_bg0_11-18-83.3a', offset: 0, size: 8192, crc: 'dea34fed', sha1: 'cbbb2ba75e087eebdce79a0016118c327c8f0a96', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1434, sourceColumn: 2, sourceEndLine: 1434};
MERGE (n:KG {id: 'rom:spyhunt/gfx1/spy-hunter_cpu_bg1_11-18-83.4a'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_bg1_11-18-83.4a', offset: 8192, size: 8192, crc: '8f64525f', sha1: 'd457d12f31a30deb3b4e5b8189c9414aac1ad701', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1435, sourceColumn: 2, sourceEndLine: 1435};
MERGE (n:KG {id: 'rom:spyhunt/gfx1/spy-hunter_cpu_bg2_11-18-83.5a'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_bg2_11-18-83.5a', offset: 16384, size: 8192, crc: 'ba0fd626', sha1: 'f39281feb3fbbbd4234fbb70ee77bab3e1a33e3b', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1436, sourceColumn: 2, sourceEndLine: 1436};
MERGE (n:KG {id: 'rom:spyhunt/gfx1/spy-hunter_cpu_bg3_11-18-83.6a'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_bg3_11-18-83.6a', offset: 24576, size: 8192, crc: '7b482d61', sha1: 'f6a46690f69a7513a7fbacd0199946f600d796dd', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1437, sourceColumn: 2, sourceEndLine: 1437};
MERGE (n:KG {id: 'region:spyhunt/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 131072, flags: '0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1241, sourceColumn: 2, sourceEndLine: 1241};
MERGE (n:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_1fg_11-18-83.a7'}) SET n:Rom SET n += {file: 'spy-hunter_video_1fg_11-18-83.a7', offset: 0, size: 16384, crc: '9fe286ec', sha1: 'd72cd7e69ef78e25cf5bc599fb0a7da11bf4657f', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1440, sourceColumn: 2, sourceEndLine: 1440};
MERGE (n:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_0fg_11-18-83.a8'}) SET n:Rom SET n += {file: 'spy-hunter_video_0fg_11-18-83.a8', offset: 16384, size: 16384, crc: '292c5466', sha1: '5abb9e2cc592adf81f12bf8ebeaf3e2931a7fa6d', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1441, sourceColumn: 2, sourceEndLine: 1441};
MERGE (n:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_3fg_11-18-83.a5'}) SET n:Rom SET n += {file: 'spy-hunter_video_3fg_11-18-83.a5', offset: 32768, size: 16384, crc: 'b894934d', sha1: 'e7d6db1635d244d002054dd223a2d0713316ef77', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1442, sourceColumn: 2, sourceEndLine: 1442};
MERGE (n:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_2fg_11-18-83.a6'}) SET n:Rom SET n += {file: 'spy-hunter_video_2fg_11-18-83.a6', offset: 49152, size: 16384, crc: '62c8bfa5', sha1: 'f245e49c178f846b647d09c32aa97d61333bdd83', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1443, sourceColumn: 2, sourceEndLine: 1443};
MERGE (n:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_5fg_11-18-83.a3'}) SET n:Rom SET n += {file: 'spy-hunter_video_5fg_11-18-83.a3', offset: 65536, size: 16384, crc: '2d9fbcec', sha1: 'd73862b974726fe50bf011ea7977f8229b8a1e24', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1444, sourceColumn: 2, sourceEndLine: 1444};
MERGE (n:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_4fg_11-18-83.a4'}) SET n:Rom SET n += {file: 'spy-hunter_video_4fg_11-18-83.a4', offset: 81920, size: 16384, crc: '7ca4941b', sha1: '068ecd1e91ecfedba2ae542062f8f51f1329725d', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1445, sourceColumn: 2, sourceEndLine: 1445};
MERGE (n:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_7fg_11-18-83.a1'}) SET n:Rom SET n += {file: 'spy-hunter_video_7fg_11-18-83.a1', offset: 98304, size: 16384, crc: '940fe17e', sha1: '60d07c10ef5867875d47a4edaa68934e37e2a0aa', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1446, sourceColumn: 2, sourceEndLine: 1446};
MERGE (n:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_6fg_11-18-83.a2'}) SET n:Rom SET n += {file: 'spy-hunter_video_6fg_11-18-83.a2', offset: 114688, size: 16384, crc: '8cb8a066', sha1: '5fa88d471ed8fd18244dd21b976c86530f57c8ac', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1447, sourceColumn: 2, sourceEndLine: 1447};
MERGE (n:KG {id: 'region:spyhunt/gfx3'}) SET n:RomRegion SET n += {tag: 'gfx3', size: 4096, flags: '0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1449, sourceColumn: 2, sourceEndLine: 1449};
MERGE (n:KG {id: 'rom:spyhunt/gfx3/spy-hunter_cpu_alpha-n_11-18-83'}) SET n:Rom SET n += {file: 'spy-hunter_cpu_alpha-n_11-18-83', offset: 0, size: 4096, crc: '936dc87f', sha1: 'cdf73bea82481fbc300ec5a1fbbe8d662007c56b', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1450, sourceColumn: 2, sourceEndLine: 1450};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map'}) SET n:AddressMap SET n += {cls: 'mcr3_state', name: 'mcrmono_map', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 479, sourceColumn: 1, sourceEndLine: 489, unmapHigh: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 57343, raw: 'map(0x0000, 0xdfff).rom()', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 482, sourceColumn: 2, sourceEndLine: 482, rom: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range1'}) SET n:AddressRange SET n += {start: 57344, end: 59391, raw: 'map(0xe000, 0xe7ff).ram().share("nvram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 483, sourceColumn: 2, sourceEndLine: 483, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range2'}) SET n:AddressRange SET n += {start: 59392, end: 59903, raw: 'map(0xe800, 0xe9ff).ram().share("spriteram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 484, sourceColumn: 2, sourceEndLine: 484, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range3'}) SET n:AddressRange SET n += {start: 59904, end: 60415, raw: 'map(0xea00, 0xebff).ram()', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 485, sourceColumn: 2, sourceEndLine: 485, ram: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range4'}) SET n:AddressRange SET n += {start: 60416, end: 60543, raw: 'map(0xec00, 0xec7f).mirror(0x0380).w(FUNC(mcr3_state::mcr_paletteram9_w)).share("paletteram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 486, sourceColumn: 2, sourceEndLine: 486, mirror: 896, share: 'paletteram'};
MERGE (n:KG {id: 'handler:mcr3_state.mcr_paletteram9_w'}) SET n:Handler SET n += {method: 'mcr_paletteram9_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr_v.cpp', sourceLine: 162, sourceColumn: 1, sourceEndLine: 170, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// palette RAM is actually 9 bit (a 93419 SRAM)
	// however, there is no way for the CPU to read back
	// the high bit, because D8 of the SRAM is connected
	// to A0 of the bus rather than to a data line
	m_paletteram[offset] = data;
	mcr_set_color(offset / 2, data | ((offset & 1) << 8));'};
MERGE (n:KG {id: 'handler:mcr_state.mcr_set_color'}) SET n:Handler SET n += {method: 'mcr_set_color', ownerClass: 'mcr_state', sourceFile: 'src/mame/bally/mcr_v.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'int index, int data', sourceBody: 'm_palette->set_pen_color(index, pal3bit(data >> 6), pal3bit(data >> 0), pal3bit(data >> 3));'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range5'}) SET n:AddressRange SET n += {start: 61440, end: 63487, raw: 'map(0xf000, 0xf7ff).ram().w(FUNC(mcr3_state::mcr3_videoram_w)).share("videoram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 487, sourceColumn: 2, sourceEndLine: 487, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:mcr3_state.mcr3_videoram_w'}) SET n:Handler SET n += {method: 'mcr3_videoram_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 119, sourceColumn: 1, sourceEndLine: 123, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset / 2);'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range6'}) SET n:AddressRange SET n += {start: 63488, end: 65535, raw: 'map(0xf800, 0xffff).rom()', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 488, sourceColumn: 2, sourceEndLine: 488, rom: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap'}) SET n:AddressMap SET n += {cls: 'mcr3_state', name: 'mcrmono_portmap', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 492, sourceColumn: 1, sourceEndLine: 504, globalMask: 255, unmapHigh: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).mirror(0x78).portr("MONO.IP0")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 496, sourceColumn: 2, sourceEndLine: 496, mirror: 120, portRead: 'MONO.IP0'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range1'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x01, 0x01).mirror(0x78).portr("MONO.IP1")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 497, sourceColumn: 2, sourceEndLine: 497, mirror: 120, portRead: 'MONO.IP1'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range2'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).mirror(0x78).portr("MONO.IP2")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 498, sourceColumn: 2, sourceEndLine: 498, mirror: 120, portRead: 'MONO.IP2'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range3'}) SET n:AddressRange SET n += {start: 3, end: 3, raw: 'map(0x03, 0x03).mirror(0x78).portr("MONO.IP3")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 499, sourceColumn: 2, sourceEndLine: 499, mirror: 120, portRead: 'MONO.IP3'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range4'}) SET n:AddressRange SET n += {start: 4, end: 4, raw: 'map(0x04, 0x04).mirror(0x78).portr("MONO.IP4")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 500, sourceColumn: 2, sourceEndLine: 500, mirror: 120, portRead: 'MONO.IP4'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range5'}) SET n:AddressRange SET n += {start: 5, end: 5, raw: 'map(0x05, 0x05).mirror(0x78).w(FUNC(mcr3_state::mcrmono_control_port_w))', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 501, sourceColumn: 2, sourceEndLine: 501, mirror: 120};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range6'}) SET n:AddressRange SET n += {start: 7, end: 7, raw: 'map(0x07, 0x07).mirror(0x78).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 502, sourceColumn: 2, sourceEndLine: 502, mirror: 120};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/bally/mcr.cpp', sourceLine: 790, sourceColumn: 2, sourceEndLine: 790};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range7'}) SET n:AddressRange SET n += {start: 240, end: 243, raw: 'map(0xf0, 0xf3).mirror(0x0c).rw(m_ctc, FUNC(z80ctc_device::read), FUNC(z80ctc_device::write))', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 503, sourceColumn: 2, sourceEndLine: 503, mirror: 12};
MERGE (n:KG {id: 'handler:z80ctc_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'z80ctc_device', sourceFile: 'src/mame/bally/mcr.cpp', sourceLine: 818, sourceColumn: 2, sourceEndLine: 818};
MERGE (n:KG {id: 'handler:z80ctc_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'z80ctc_device', sourceFile: 'src/mame/bally/mcr.cpp', sourceLine: 818, sourceColumn: 2, sourceEndLine: 818};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_map'}) SET n:AddressMap SET n += {cls: 'mcr3_state', name: 'spyhunt_map', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 515, sourceColumn: 1, sourceEndLine: 524, unmapHigh: true};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 57343, raw: 'map(0x0000, 0xdfff).rom()', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 518, sourceColumn: 2, sourceEndLine: 518, rom: true};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_map/range1'}) SET n:AddressRange SET n += {start: 57344, end: 59391, raw: 'map(0xe000, 0xe7ff).ram().w(FUNC(mcr3_state::spyhunt_videoram_w)).share("videoram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 519, sourceColumn: 2, sourceEndLine: 519, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:mcr3_state.spyhunt_videoram_w'}) SET n:Handler SET n += {method: 'spyhunt_videoram_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 126, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_map/range2'}) SET n:AddressRange SET n += {start: 59392, end: 60415, raw: 'map(0xe800, 0xebff).mirror(0x0400).ram().w(FUNC(mcr3_state::spyhunt_alpharam_w)).share("spyhunt_alpha")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 520, sourceColumn: 2, sourceEndLine: 520, mirror: 1024, ram: true, share: 'spyhunt_alpha'};
MERGE (n:KG {id: 'handler:mcr3_state.spyhunt_alpharam_w'}) SET n:Handler SET n += {method: 'spyhunt_alpharam_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 133, sourceColumn: 1, sourceEndLine: 137, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_spyhunt_alpharam[offset] = data;
	m_alpha_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_map/range3'}) SET n:AddressRange SET n += {start: 61440, end: 63487, raw: 'map(0xf000, 0xf7ff).ram().share("nvram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 521, sourceColumn: 2, sourceEndLine: 521, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_map/range4'}) SET n:AddressRange SET n += {start: 63488, end: 63999, raw: 'map(0xf800, 0xf9ff).ram().share("spriteram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 522, sourceColumn: 2, sourceEndLine: 522, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_map/range5'}) SET n:AddressRange SET n += {start: 64000, end: 64127, raw: 'map(0xfa00, 0xfa7f).mirror(0x0180).w(FUNC(mcr3_state::mcr_paletteram9_w)).share("paletteram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 523, sourceColumn: 2, sourceEndLine: 523, mirror: 384, share: 'paletteram'};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_portmap'}) SET n:AddressMap SET n += {cls: 'mcr3_state', name: 'spyhunt_portmap', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 527, sourceColumn: 1, sourceEndLine: 536, calls: ['midway_ssio_device::ssio_input_ports'], globalMask: 255, unmapHigh: true};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_portmap/range0'}) SET n:AddressRange SET n += {start: 132, end: 134, raw: 'map(0x84, 0x86).w(FUNC(mcr3_state::spyhunt_scroll_value_w))', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 532, sourceColumn: 2, sourceEndLine: 532};
MERGE (n:KG {id: 'handler:mcr3_state.spyhunt_scroll_value_w'}) SET n:Handler SET n += {method: 'spyhunt_scroll_value_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 140, sourceColumn: 1, sourceEndLine: 160, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'switch (offset)
	{
		case 0:
			/* low 8 bits of horizontal scroll */
			m_spyhunt_scrollx = (m_spyhunt_scrollx & ~0xff) | data;
			break;

		case 1:
			/* upper 3 bits of horizontal scroll and upper 1 bit of vertical scroll */
			m_spyhunt_scrollx = (m_spyhunt_scrollx & 0xff) | ((data & 0x07) << 8);
			m_spyhunt_scrolly = (m_spyhunt_scrolly & 0xff) | ((data & 0x80) << 1);
			break;

		case 2:
			/* low 8 bits of vertical scroll */
			m_spyhunt_scrolly = (m_spyhunt_scrolly & ~0xff) | data;
			break;
	}'};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_portmap/range1'}) SET n:AddressRange SET n += {start: 224, end: 224, raw: 'map(0xe0, 0xe0).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 533, sourceColumn: 2, sourceEndLine: 533};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_portmap/range2'}) SET n:AddressRange SET n += {start: 232, end: 232, raw: 'map(0xe8, 0xe8).nopw()', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 534, sourceColumn: 2, sourceEndLine: 534, nopw: true};
MERGE (n:KG {id: 'map:mcr3_state.spyhunt_portmap/range3'}) SET n:AddressRange SET n += {start: 240, end: 243, raw: 'map(0xf0, 0xf3).rw(m_ctc, FUNC(z80ctc_device::read), FUNC(z80ctc_device::write))', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 535, sourceColumn: 2, sourceEndLine: 535};
MERGE (n:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map'}) SET n:AddressMap SET n += {cls: 'midway_cheap_squeak_deluxe_device', name: 'csdeluxe_map', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 24, sourceColumn: 1, sourceEndLine: 32, globalMask: 131071, unmapHigh: true};
MERGE (n:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x00000, 0x07fff).rom()', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 28, sourceColumn: 2, sourceEndLine: 28, rom: true};
MERGE (n:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range1'}) SET n:AddressRange SET n += {start: 98304, end: 98311, raw: 'map(0x18000, 0x18007).mirror(0x3ff8).rw("pia", FUNC(pia6821_device::read_alt), FUNC(pia6821_device::write_alt)).umask16(0xff00)', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 29, sourceColumn: 2, sourceEndLine: 29, mirror: 16376, umask: 65280};
MERGE (n:KG {id: 'handler:pia6821_device.read_alt'}) SET n:Handler SET n += {method: 'read_alt', ownerClass: 'pia6821_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 763, sourceColumn: 2, sourceEndLine: 763};
MERGE (n:KG {id: 'handler:pia6821_device.write_alt'}) SET n:Handler SET n += {method: 'write_alt', ownerClass: 'pia6821_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 763, sourceColumn: 2, sourceEndLine: 763};
MERGE (n:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range2'}) SET n:AddressRange SET n += {start: 98304, end: 98311, raw: 'map(0x18000, 0x18007).mirror(0x3ff8).rw("pia", FUNC(pia6821_device::read_alt), FUNC(pia6821_device::write_alt)).umask16(0x00ff)', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 30, sourceColumn: 2, sourceEndLine: 30, mirror: 16376, umask: 255};
MERGE (n:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range3'}) SET n:AddressRange SET n += {start: 114688, end: 118783, raw: 'map(0x1c000, 0x1cfff).ram()', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 31, sourceColumn: 2, sourceEndLine: 31, ram: true};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map'}) SET n:AddressMap SET n += {cls: 'midway_ssio_device', name: 'ssio_map', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 361, unmapHigh: true};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 348, sourceColumn: 2, sourceEndLine: 348, rom: true};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 33791, raw: 'map(0x8000, 0x83ff).mirror(0x0c00).ram()', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 349, sourceColumn: 2, sourceEndLine: 349, mirror: 3072, ram: true};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range2'}) SET n:AddressRange SET n += {start: 36864, end: 36867, raw: 'map(0x9000, 0x9003).mirror(0x0ffc).r(FUNC(midway_ssio_device::data_r))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 350, sourceColumn: 2, sourceEndLine: 350, mirror: 4092};
MERGE (n:KG {id: 'handler:midway_ssio_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 270, sourceColumn: 1, sourceEndLine: 273, sourceParameters: 'offs_t offset', sourceBody: 'return m_data[offset];'};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range3'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).mirror(0x0ffc).w("ay0", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351, mirror: 4092};
MERGE (n:KG {id: 'handler:ay8910_device.address_w'}) SET n:Handler SET n += {method: 'address_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 354, sourceColumn: 2, sourceEndLine: 354};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range4'}) SET n:AddressRange SET n += {start: 40961, end: 40961, raw: 'map(0xa001, 0xa001).mirror(0x0ffc).r("ay0", FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 352, sourceColumn: 2, sourceEndLine: 352, mirror: 4092};
MERGE (n:KG {id: 'handler:ay8910_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay8910_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 355, sourceColumn: 2, sourceEndLine: 355};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range5'}) SET n:AddressRange SET n += {start: 40962, end: 40962, raw: 'map(0xa002, 0xa002).mirror(0x0ffc).w("ay0", FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 353, sourceColumn: 2, sourceEndLine: 353, mirror: 4092};
MERGE (n:KG {id: 'handler:ay8910_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 356, sourceColumn: 2, sourceEndLine: 356};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range6'}) SET n:AddressRange SET n += {start: 45056, end: 45056, raw: 'map(0xb000, 0xb000).mirror(0x0ffc).w("ay1", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 354, sourceColumn: 2, sourceEndLine: 354, mirror: 4092};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range7'}) SET n:AddressRange SET n += {start: 45057, end: 45057, raw: 'map(0xb001, 0xb001).mirror(0x0ffc).r("ay1", FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 355, sourceColumn: 2, sourceEndLine: 355, mirror: 4092};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range8'}) SET n:AddressRange SET n += {start: 45058, end: 45058, raw: 'map(0xb002, 0xb002).mirror(0x0ffc).w("ay1", FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 356, sourceColumn: 2, sourceEndLine: 356, mirror: 4092};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range9'}) SET n:AddressRange SET n += {start: 49152, end: 53247, raw: 'map(0xc000, 0xcfff).nopr().w(FUNC(midway_ssio_device::status_w))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 357, sourceColumn: 2, sourceEndLine: 357, nopr: true};
MERGE (n:KG {id: 'handler:midway_ssio_device.status_w'}) SET n:Handler SET n += {method: 'status_w', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 260, sourceColumn: 1, sourceEndLine: 263, sourceParameters: 'uint8_t data', sourceBody: 'm_status = data;'};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range10'}) SET n:AddressRange SET n += {start: 53248, end: 57343, raw: 'map(0xd000, 0xdfff).nopw()', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 358, sourceColumn: 2, sourceEndLine: 358, nopw: true};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range11'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).r(FUNC(midway_ssio_device::irq_clear))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 359, sourceColumn: 2, sourceEndLine: 359};
MERGE (n:KG {id: 'handler:midway_ssio_device.irq_clear'}) SET n:Handler SET n += {method: 'irq_clear', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 244, sourceColumn: 1, sourceEndLine: 253, sourceParameters: '', sourceBody: '// a read here asynchronously resets the 14024 count, clearing /SINT
	if (!machine().side_effects_disabled())
	{
		m_14024_count = 0;
		m_cpu->set_input_line(0, CLEAR_LINE);
	}
	return 0xff;'};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_map/range12'}) SET n:AddressRange SET n += {start: 61440, end: 65535, raw: 'map(0xf000, 0xffff).portr("DIP")', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 360, sourceColumn: 2, sourceEndLine: 360, portRead: 'DIP'};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_input_ports'}) SET n:AddressMap SET n += {cls: 'midway_ssio_device', name: 'ssio_input_ports', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 368, sourceColumn: 1, sourceEndLine: 374};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_input_ports/range0'}) SET n:AddressRange SET n += {start: 0, end: 4, raw: 'map(0x00, 0x04).mirror(0x18).r(ssio, FUNC(midway_ssio_device::ioport_read))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 370, sourceColumn: 2, sourceEndLine: 370, mirror: 24};
MERGE (n:KG {id: 'handler:midway_ssio_device.ioport_read'}) SET n:Handler SET n += {method: 'ioport_read', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 123, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'offs_t offset', sourceBody: 'uint8_t result = m_ports[offset].read_safe(0xff);
	if (!m_custom_input[offset].isnull())
		result = (result & ~m_custom_input_mask[offset]) |
				(m_custom_input[offset]() & m_custom_input_mask[offset]);
	return result;', inputMembers: ['m_ports=IP0,IP1,IP2,IP3,IP4']};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_input_ports/range1'}) SET n:AddressRange SET n += {start: 7, end: 7, raw: 'map(0x07, 0x07).mirror(0x18).r(ssio, FUNC(midway_ssio_device::read))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 371, sourceColumn: 2, sourceEndLine: 371, mirror: 24};
MERGE (n:KG {id: 'handler:midway_ssio_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 81, sourceColumn: 1, sourceEndLine: 84, sourceParameters: '', sourceBody: 'return m_status;'};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_input_ports/range2'}) SET n:AddressRange SET n += {start: 0, end: 7, raw: 'map(0x00, 0x07).w(ssio, FUNC(midway_ssio_device::ioport_write))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 372, sourceColumn: 2, sourceEndLine: 372};
MERGE (n:KG {id: 'handler:midway_ssio_device.ioport_write'}) SET n:Handler SET n += {method: 'ioport_write', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 138, sourceColumn: 1, sourceEndLine: 143, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int which = offset >> 2;
	if (!m_custom_output[which].isnull())
		m_custom_output[which](data & m_custom_output_mask[which]);'};
MERGE (n:KG {id: 'map:midway_ssio_device.ssio_input_ports/range3'}) SET n:AddressRange SET n += {start: 28, end: 31, raw: 'map(0x1c, 0x1f).w(ssio, FUNC(midway_ssio_device::write))', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 373, sourceColumn: 2, sourceEndLine: 373};
MERGE (n:KG {id: 'handler:midway_ssio_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 92, sourceColumn: 1, sourceEndLine: 95, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(midway_ssio_device::synced_write), this), (offset << 8) | (data & 0xff));'};
MERGE (n:KG {id: 'handler:midway_ssio_device.synced_write'}) SET n:Handler SET n += {method: 'synced_write', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 466, sourceColumn: 1, sourceEndLine: 469, sourceParameters: 'int param', sourceBody: 'm_data[param >> 8] = param & 0xff;'};
MERGE (n:KG {id: 'machine:mcr3_state.mcrmono'}) SET n:MachineConfig SET n += {cls: 'mcr3_state', name: 'mcrmono', calls: [], stateMembers: ['{"name":"m_mcr12_sprite_xoffs_flip","bits":8,"signed":true}', '{"name":"m_input_mux","bits":8}', '{"name":"m_last_op4","bits":8}', '{"name":"m_mcr_cocktail_flip","bits":8}', '{"name":"m_mcr_cpu_board","bits":32}', '{"name":"m_mcr_sprite_board","bits":32}', '{"name":"m_mcr12_sprite_xoffs","bits":8,"signed":true}', '{"name":"m_latched_input","bits":8}', '{"name":"m_spyhunt_sprite_color_mask","bits":8}', '{"name":"m_spyhunt_scroll_offset","bits":16,"signed":true}', '{"name":"m_spyhunt_scrollx","bits":16,"signed":true}', '{"name":"m_spyhunt_scrolly","bits":16,"signed":true}'], resetHandlers: ['mcr_state.machine_reset'], startHandlers: ['mcr3_state.video_start'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1083, sourceColumn: 1, sourceEndLine: 1116};
MERGE (n:KG {id: 'handler:mcr_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'mcr_state', sourceFile: 'src/mame/bally/mcr_m.cpp', sourceLine: 93, sourceColumn: 1, sourceEndLine: 97, sourceParameters: '', sourceBody: '/* reset cocktail flip */
	m_mcr_cocktail_flip = 0;'};
MERGE (n:KG {id: 'handler:mcr3_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 90, sourceParameters: '', sourceBody: '// initialize the background tilemap
	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(mcr3_state::mcrmono_get_bg_tile_info)), TILEMAP_SCAN_ROWS, 16,16, 32,30);'};
MERGE (n:KG {id: 'handler:mcr3_state.mcrmono_get_bg_tile_info'}) SET n:Handler SET n += {method: 'mcrmono_get_bg_tile_info', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 29, sourceColumn: 1, sourceEndLine: 35, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int data = m_videoram[tile_index * 2] | (m_videoram[tile_index * 2 + 1] << 8);
	int code = (data & 0x3ff) | ((data >> 4) & 0x400);
	int color = ((data >> 12) & 3) ^ 3;
	tileinfo.set(0, code, color, TILE_FLIPYX(data >> 10));'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 5000000, config: ['Z80(config, m_maincpu, MASTER_CLOCK/4)', 'm_maincpu->set_addrmap(AS_PROGRAM, &mcr3_state::mcrmono_map)', 'm_maincpu->set_addrmap(AS_IO, &mcr3_state::mcrmono_portmap)', 'm_maincpu->set_daisy_config(mcr_daisy_chain)'], member: 'm_maincpu', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1086, sourceColumn: 2, sourceEndLine: 1086};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/scantimer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scantimer', clock: null, config: ['TIMER(config, "scantimer").configure_scanline(FUNC(mcr3_state::mcr_interrupt), "screen", 0, 1)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1091, sourceColumn: 2, sourceEndLine: 1091};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/scantimer/callback:scantimer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "scantimer").configure_scanline(FUNC(mcr3_state::mcr_interrupt), "screen", 0, 1)', ownerTag: 'scantimer', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1091, sourceColumn: 2, sourceEndLine: 1091, scanlineStart: 0, scanlineIncrement: 1, targetClass: 'mcr3_state', targetMethod: 'mcr_interrupt'};
MERGE (n:KG {id: 'handler:mcr3_state.mcr_interrupt'}) SET n:Handler SET n += {method: 'mcr_interrupt', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr_m.cpp', sourceLine: 107, sourceColumn: 1, sourceEndLine: 126, sourceParameters: 'int param', sourceBody: 'int scanline = param;

	/* CTC line 2 is connected to VBLANK, which is once every 1/2 frame */
	/* for the 30Hz interlaced display */
	if(scanline == 0 || scanline == 240)
	{
		m_ctc->trg2(1);
		m_ctc->trg2(0);
	}

	/* CTC line 3 is connected to 493, which is signalled once every */
	/* frame at 30Hz */
	if (scanline == 0)
	{
		m_ctc->trg3(1);
		m_ctc->trg3(0);
	}'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/ctc'}) SET n:Device SET n += {type: 'Z80CTC', tag: 'ctc', clock: 5000000, config: ['Z80CTC(config, m_ctc, MASTER_CLOCK/4  )', 'm_ctc->intr_callback().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', 'm_ctc->zc_callback<0>().set(m_ctc, FUNC(z80ctc_device::trg1))'], member: 'm_ctc'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:0'}) SET n:Callback SET n += {signal: 'intr_callback', operation: 'set_inputline', raw: 'm_ctc->intr_callback().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', ownerTag: 'ctc', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1094, sourceColumn: 2, sourceEndLine: 1094, inputLine: 'INPUT_LINE_IRQ0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:1'}) SET n:Callback SET n += {signal: 'zc_callback', operation: 'set', raw: 'm_ctc->zc_callback<0>().set(m_ctc, FUNC(z80ctc_device::trg1))', ownerTag: 'ctc', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1095, sourceColumn: 2, sourceEndLine: 1095, slot: '0', targetClass: 'z80ctc_device', targetMethod: 'trg1', targetTag: 'ctc'};
MERGE (n:KG {id: 'handler:z80ctc_device.trg1'}) SET n:Handler SET n += {method: 'trg1', ownerClass: 'z80ctc_device', sourceFile: 'src/mame/bally/mcr.cpp', sourceLine: 1784, sourceColumn: 2, sourceEndLine: 1784};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count(m_screen, 16)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1097, sourceColumn: 2, sourceEndLine: 1097};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1099, sourceColumn: 2, sourceEndLine: 1099, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: 2, config: ['SPEAKER(config, "speaker", 2).front()'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1102, sourceColumn: 2, sourceEndLine: 1102};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_video_attributes(VIDEO_UPDATE_BEFORE_VBLANK)', 'm_screen->set_refresh_hz(30)', 'm_screen->set_vblank_time(ATTOSECONDS_IN_USEC(2500)  )', 'm_screen->set_size(32*16, 30*16)', 'm_screen->set_visarea(0*16, 32*16-1, 0*16, 30*16-1)', 'm_screen->set_screen_update(FUNC(mcr3_state::screen_update_mcr3))', 'm_screen->set_palette(m_palette)', 'm_screen->set_size(30*16, 30*16)', 'm_screen->set_visarea(0, 30*16-1, 0, 30*16-1)', 'm_screen->set_screen_update(FUNC(mcr3_state::screen_update_spyhunt))'], member: 'm_screen', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1105, sourceColumn: 2, sourceEndLine: 1105, configCalls: ['set_refresh_hz(30)', 'set_size(512,480)', 'set_visarea(0,511,0,479)', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRefreshHz: 30, screenSize: [512, 480], screenVisarea: [0, 511, 0, 479], screenVideoAttributes: ['VIDEO_UPDATE_BEFORE_VBLANK']};
MERGE (n:KG {id: 'handler:mcr3_state.mcr3_update_sprites'}) SET n:Handler SET n += {method: 'mcr3_update_sprites', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 170, sourceColumn: 1, sourceEndLine: 231, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect, int color_mask, int code_xor, int dx, int dy, int interlaced', sourceBody: 'm_screen->priority().fill(1, cliprect);

	/* loop over sprite RAM */
	for (int offs = m_spriteram.bytes() - 4; offs >= 0; offs -= 4)
	{
		/* skip if zero */
		if (m_spriteram[offs] == 0)
			continue;

/*
    monoboard:
        flags.d0 -> ICG0~ -> PCG0~/PCG2~/PCG4~/PCG6~ -> bit 4 of linebuffer
        flags.d1 -> ICG1~ -> PCG1~/PCG3~/PCG5~/PCG7~ -> bit 5 of linebuffer
        flags.d2 -> IPPR  -> PPR0 /PPR1 /PPR2 /PPR3  -> bit 6 of linebuffer
        flags.d3 -> IRA15 ----------------------------> address line 15 of FG ROMs
        flags.d4 -> HFLIP
        flags.d5 -> VFLIP

*/

		/* extract the bits of information */
		int flags = m_spriteram[offs + 1];
		int code = m_spriteram[offs + 2] + 256 * ((flags >> 3) & 0x01);
		int color = ~flags & color_mask;
		int flipx = flags & 0x10;
		int flipy = flags & 0x20;
		int sx = (m_spriteram[offs + 3] - 3) * 2;
		int sy = (241 - m_spriteram[offs]);

		if (interlaced == 1) sy *= 2;

		code ^= code_xor;

		sx += dx;
		sy += dy;

		/* sprites use color 0 for background pen and 8 for the \'under tile\' pen.
		    The color 8 is used to cover over other sprites. */
		if (!m_mcr_cocktail_flip)
		{
			/* first draw the sprite, visible */
			m_gfxdecode->gfx(1)->prio_transmask(bitmap,cliprect, code, color, flipx, flipy, sx, sy,
					screen.priority(), 0x00, 0x0101);

			/* then draw the mask, behind the background but obscuring following sprites */
			m_gfxdecode->gfx(1)->prio_transmask(bitmap,cliprect, code, color, flipx, flipy, sx, sy,
					screen.priority(), 0x02, 0xfeff);
		}
		else
		{
			/* first draw the sprite, visible */
			m_gfxdecode->gfx(1)->prio_transmask(bitmap,cliprect, code, color, !flipx, !flipy, 480 - sx, 452 - sy,
					screen.priority(), 0x00, 0x0101);

			/* then draw the mask, behind the background but obscuring following sprites */
			m_gfxdecode->gfx(1)->prio_transmask(bitmap,cliprect, code, color, !flipx, !flipy, 480 - sx, 452 - sy,
					screen.priority(), 0x02, 0xfeff);
		}
	}'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_mcr3)'], member: 'm_gfxdecode', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1114, sourceColumn: 2, sourceEndLine: 1114, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_entries(64)', 'subdevice<palette_device>("palette")->set_entries(64 + 4).set_init(FUNC(mcr3_state::spyhunt_palette))'], member: 'm_palette', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1115, sourceColumn: 2, sourceEndLine: 1115, paletteEntries: 64};
MERGE (n:KG {id: 'machine:mcr3_state.mcrscroll'}) SET n:MachineConfig SET n += {cls: 'mcr3_state', name: 'mcrscroll', calls: ['mcrmono'], stateMembers: ['{"name":"m_mcr12_sprite_xoffs_flip","bits":8,"signed":true}', '{"name":"m_input_mux","bits":8}', '{"name":"m_last_op4","bits":8}', '{"name":"m_mcr_cocktail_flip","bits":8}', '{"name":"m_mcr_cpu_board","bits":32}', '{"name":"m_mcr_sprite_board","bits":32}', '{"name":"m_mcr12_sprite_xoffs","bits":8,"signed":true}', '{"name":"m_latched_input","bits":8}', '{"name":"m_spyhunt_sprite_color_mask","bits":8}', '{"name":"m_spyhunt_scroll_offset","bits":16,"signed":true}', '{"name":"m_spyhunt_scrollx","bits":16,"signed":true}', '{"name":"m_spyhunt_scrolly","bits":16,"signed":true}'], resetHandlers: ['mcr_state.machine_reset'], startHandlers: ['mcr3_state.video_start_spyhunt'], devicePatches: ['{"tag":"screen","config":["m_screen->set_size(30*16, 30*16)","m_screen->set_visarea(0, 30*16-1, 0, 30*16-1)","m_screen->set_screen_update(FUNC(mcr3_state::screen_update_spyhunt))"]}', '{"tag":"palette","config":["subdevice<palette_device>(\\"palette\\")->set_entries(64 + 4).set_init(FUNC(mcr3_state::spyhunt_palette))"]}'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1161, sourceColumn: 1, sourceEndLine: 1181};
MERGE (n:KG {id: 'handler:mcr3_state.video_start_spyhunt'}) SET n:Handler SET n += {method: 'video_start_spyhunt', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 93, sourceColumn: 1, sourceEndLine: 107, sourceParameters: '', sourceBody: '// initialize the background tilemap
	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(mcr3_state::spyhunt_get_bg_tile_info)), tilemap_mapper_delegate(*this, FUNC(mcr3_state::spyhunt_bg_scan)), 64,32, 64,32);

	// initialize the text tilemap
	m_alpha_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(mcr3_state::spyhunt_get_alpha_tile_info)), TILEMAP_SCAN_COLS, 16,16, 32,32);
	m_alpha_tilemap->set_transparent_pen(0);
	m_alpha_tilemap->set_scrollx(0, 16);

	save_item(NAME(m_spyhunt_sprite_color_mask));
	save_item(NAME(m_spyhunt_scrollx));
	save_item(NAME(m_spyhunt_scrolly));
	save_item(NAME(m_spyhunt_scroll_offset));'};
MERGE (n:KG {id: 'handler:mcr3_state.spyhunt_get_bg_tile_info'}) SET n:Handler SET n += {method: 'spyhunt_get_bg_tile_info', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 45, sourceColumn: 1, sourceEndLine: 50, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int data = m_videoram[tile_index];
	int code = (data & 0x3f) | ((data >> 1) & 0x40);
	tileinfo.set(0, code, 0, (data & 0x40) ? TILE_FLIPY : 0);'};
MERGE (n:KG {id: 'handler:mcr3_state.spyhunt_bg_scan'}) SET n:Handler SET n += {method: 'spyhunt_bg_scan', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 38, sourceColumn: 1, sourceEndLine: 42, sourceParameters: 'u32 col, u32 row, u32 num_cols, u32 num_rows', sourceBody: '/* logical (col,row) -> memory offset */
	return (row & 0x0f) | ((col & 0x3f) << 4) | ((row & 0x10) << 6);'};
MERGE (n:KG {id: 'handler:mcr3_state.spyhunt_get_alpha_tile_info'}) SET n:Handler SET n += {method: 'spyhunt_get_alpha_tile_info', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 53, sourceColumn: 1, sourceEndLine: 56, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'tileinfo.set(2, m_spyhunt_alpharam[tile_index], 0, 0);'};
MERGE (n:KG {id: 'machine:mcr3_state.mcrscroll/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(mcr3_state::screen_update_spyhunt))', ownerTag: 'screen', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1176, sourceColumn: 2, sourceEndLine: 1176, targetClass: 'mcr3_state', targetMethod: 'screen_update_spyhunt'};
MERGE (n:KG {id: 'handler:mcr3_state.screen_update_spyhunt'}) SET n:Handler SET n += {method: 'screen_update_spyhunt', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 255, sourceColumn: 1, sourceEndLine: 269, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '/* for every character in the Video RAM, check if it has been modified */
	/* since last time and update it accordingly. */
	m_bg_tilemap->set_scrollx(0, m_spyhunt_scrollx * 2 + m_spyhunt_scroll_offset);
	m_bg_tilemap->set_scrolly(0, m_spyhunt_scrolly * 2);
	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	/* draw the sprites */
	mcr3_update_sprites(screen, bitmap, cliprect, m_spyhunt_sprite_color_mask, 0, -12, 0, 1);

	/* render any characters on top */
	m_alpha_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	return 0;'};
MERGE (n:KG {id: 'device:mcr3_state.mcrscroll/ssio'}) SET n:Device SET n += {type: 'MIDWAY_SSIO', tag: 'ssio', clock: 16000000, config: ['MIDWAY_SSIO(config, m_ssio)', 'm_ssio->add_route(0, "speaker", 1.0, 0)', 'm_ssio->add_route(1, "speaker", 1.0, 1)'], member: 'm_ssio', cls: 'midway_ssio_device', clsHierarchy: ['midway_ssio_device'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1166, sourceColumn: 2, sourceEndLine: 1166, configCalls: ['add_route(0,"speaker",1,0)', 'add_route(1,"speaker",1,1)'], startHandler: 'midway_ssio_device.device_start'};
MERGE (n:KG {id: 'audioroute:device:mcr3_state.mcrscroll/ssio/0'}) SET n:AudioRoute SET n += {output: '0', target: 'speaker', gain: 1, input: 0, raw: 'm_ssio->add_route(0, "speaker", 1.0, 0)', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1167, sourceColumn: 2, sourceEndLine: 1167};
MERGE (n:KG {id: 'audioroute:device:mcr3_state.mcrscroll/ssio/1'}) SET n:AudioRoute SET n += {output: '1', target: 'speaker', gain: 1, input: 1, raw: 'm_ssio->add_route(1, "speaker", 1.0, 1)', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1168, sourceColumn: 2, sourceEndLine: 1168};
MERGE (n:KG {id: 'machine:mcrsc_csd_state.mcrsc_csd'}) SET n:MachineConfig SET n += {cls: 'mcrsc_csd_state', name: 'mcrsc_csd', calls: ['mcrscroll'], stateMembers: ['{"name":"m_mcr12_sprite_xoffs_flip","bits":8,"signed":true}', '{"name":"m_input_mux","bits":8}', '{"name":"m_last_op4","bits":8}', '{"name":"m_mcr_cocktail_flip","bits":8}', '{"name":"m_mcr_cpu_board","bits":32}', '{"name":"m_mcr_sprite_board","bits":32}', '{"name":"m_mcr12_sprite_xoffs","bits":8,"signed":true}', '{"name":"m_latched_input","bits":8}', '{"name":"m_spyhunt_sprite_color_mask","bits":8}', '{"name":"m_spyhunt_scroll_offset","bits":16,"signed":true}', '{"name":"m_spyhunt_scrollx","bits":16,"signed":true}', '{"name":"m_spyhunt_scrolly","bits":16,"signed":true}'], resetHandlers: ['mcr_state.machine_reset'], startHandlers: ['mcr3_state.video_start'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1185, sourceColumn: 1, sourceEndLine: 1206};
MERGE (n:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/csd'}) SET n:Device SET n += {type: 'MIDWAY_CHEAP_SQUEAK_DELUXE', tag: 'csd', clock: 16000000, config: ['MIDWAY_CHEAP_SQUEAK_DELUXE(config, m_cheap_squeak_deluxe)', 'm_cheap_squeak_deluxe->add_route(ALL_OUTPUTS, "speaker", 0.8, 0)', 'm_cheap_squeak_deluxe->add_route(ALL_OUTPUTS, "speaker", 0.8, 1)'], member: 'm_cheap_squeak_deluxe', cls: 'midway_cheap_squeak_deluxe_device', clsHierarchy: ['midway_cheap_squeak_deluxe_device'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1190, sourceColumn: 2, sourceEndLine: 1190, startHandler: 'midway_cheap_squeak_deluxe_device.device_start', deviceTimers: ['m_pia_sync_timer=midway_cheap_squeak_deluxe_device.sync_pia']};
MERGE (n:KG {id: 'audioroute:device:mcrsc_csd_state.mcrsc_csd/csd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.8, input: 0, raw: 'm_cheap_squeak_deluxe->add_route(ALL_OUTPUTS, "speaker", 0.8, 0)', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1191, sourceColumn: 2, sourceEndLine: 1191};
MERGE (n:KG {id: 'audioroute:device:mcrsc_csd_state.mcrsc_csd/csd/1'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.8, input: 1, raw: 'm_cheap_squeak_deluxe->add_route(ALL_OUTPUTS, "speaker", 0.8, 1)', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1192, sourceColumn: 2, sourceEndLine: 1192};
MERGE (n:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/lamplatch'}) SET n:Device SET n += {type: 'CD4099', tag: 'lamplatch', clock: null, config: ['CD4099(config, m_lamplatch)', 'm_lamplatch->q_out_cb<0>().set_output("lamp0")', 'm_lamplatch->q_out_cb<1>().set_output("lamp1")', 'm_lamplatch->q_out_cb<2>().set_output("lamp2")', 'm_lamplatch->q_out_cb<3>().set_output("lamp3")', 'm_lamplatch->q_out_cb<4>().set_output("lamp4")', 'm_lamplatch->q_out_cb<5>().set_output("lamp5")', 'm_lamplatch->q_out_cb<6>().set_output("lamp6")', 'm_lamplatch->q_out_cb<7>().set_output("lamp7")'], member: 'm_lamplatch', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1194, sourceColumn: 2, sourceEndLine: 1194};
MERGE (n:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/adc'}) SET n:Device SET n += {type: 'ADC0804', tag: 'adc', clock: null, config: ['ADC0804(config, m_adc, RES_K(10), CAP_P(150))', 'm_adc->set_rd_mode(adc0804_device::RD_BITBANGED)', 'm_adc->vin_callback().set(FUNC(mcrsc_csd_state::spyhunt_ip2_r))'], member: 'm_adc', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1204, sourceColumn: 2, sourceEndLine: 1204, clockExpr: 'RES_K(10)'};
MERGE (n:KG {id: 'machine:mcrsc_csd_state.spyhunt'}) SET n:MachineConfig SET n += {cls: 'mcrsc_csd_state', name: 'spyhunt', calls: ['mcrsc_csd'], stateMembers: ['{"name":"m_mcr12_sprite_xoffs_flip","bits":8,"signed":true}', '{"name":"m_input_mux","bits":8}', '{"name":"m_last_op4","bits":8}', '{"name":"m_mcr_cocktail_flip","bits":8}', '{"name":"m_mcr_cpu_board","bits":32}', '{"name":"m_mcr_sprite_board","bits":32}', '{"name":"m_mcr12_sprite_xoffs","bits":8,"signed":true}', '{"name":"m_latched_input","bits":8}', '{"name":"m_spyhunt_sprite_color_mask","bits":8}', '{"name":"m_spyhunt_scroll_offset","bits":16,"signed":true}', '{"name":"m_spyhunt_scrollx","bits":16,"signed":true}', '{"name":"m_spyhunt_scrolly","bits":16,"signed":true}'], resetHandlers: ['mcr_state.machine_reset'], startHandlers: ['mcr3_state.video_start'], devicePatches: ['{"tag":"adc","config":["m_adc->vin_callback().set(FUNC(mcrsc_csd_state::spyhunt_ip2_r))"]}'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1208, sourceColumn: 1, sourceEndLine: 1212};
MERGE (n:KG {id: 'machine:mcrsc_csd_state.spyhunt/callback:adc:0'}) SET n:Callback SET n += {signal: 'vin_callback', operation: 'set', raw: 'm_adc->vin_callback().set(FUNC(mcrsc_csd_state::spyhunt_ip2_r))', ownerTag: 'adc', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1211, sourceColumn: 2, sourceEndLine: 1211, targetClass: 'mcrsc_csd_state', targetMethod: 'spyhunt_ip2_r'};
MERGE (n:KG {id: 'handler:mcrsc_csd_state.spyhunt_ip2_r'}) SET n:Handler SET n += {method: 'spyhunt_ip2_r', ownerClass: 'mcrsc_csd_state', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 397, sourceColumn: 1, sourceEndLine: 401, sourceParameters: '', sourceBody: '/* multiplexed steering wheel/gas pedal */
	return m_analog_inputs[m_input_mux]->read();', inputMembers: ['m_analog_inputs=ssio:IP2,ssio:IP2.ALT']};
MERGE (n:KG {id: 'machine:midway_cheap_squeak_deluxe_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'midway_cheap_squeak_deluxe_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_status","bits":8}', '{"name":"m_dacval","bits":16}'], sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 38, sourceColumn: 1, sourceEndLine: 50};
MERGE (n:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/cpu'}) SET n:Device SET n += {type: 'M68000', tag: 'cpu', clock: 8000000, config: ['M68000(config, m_cpu, DERIVED_CLOCK(1, 2))', 'm_cpu->set_addrmap(AS_PROGRAM, &midway_cheap_squeak_deluxe_device::csdeluxe_map)'], member: 'm_cpu', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 40, sourceColumn: 2, sourceEndLine: 40};
MERGE (n:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia'}) SET n:Device SET n += {type: 'PIA6821', tag: 'pia', clock: null, config: ['PIA6821(config, m_pia)', 'm_pia->writepa_handler().set(FUNC(midway_cheap_squeak_deluxe_device::porta_w))', 'm_pia->writepb_handler().set(FUNC(midway_cheap_squeak_deluxe_device::portb_w))', 'm_pia->irqa_handler().set(FUNC(midway_cheap_squeak_deluxe_device::irq_w))', 'm_pia->irqb_handler().set(FUNC(midway_cheap_squeak_deluxe_device::irq_w))'], member: 'm_pia', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 43, sourceColumn: 2, sourceEndLine: 43};
MERGE (n:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:0'}) SET n:Callback SET n += {signal: 'writepa_handler', operation: 'set', raw: 'm_pia->writepa_handler().set(FUNC(midway_cheap_squeak_deluxe_device::porta_w))', ownerTag: 'pia', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 44, sourceColumn: 2, sourceEndLine: 44, targetClass: 'midway_cheap_squeak_deluxe_device', targetMethod: 'porta_w'};
MERGE (n:KG {id: 'handler:midway_cheap_squeak_deluxe_device.porta_w'}) SET n:Handler SET n += {method: 'porta_w', ownerClass: 'midway_cheap_squeak_deluxe_device', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 156, sourceColumn: 1, sourceEndLine: 160, sourceParameters: 'uint8_t data', sourceBody: 'm_dacval = (data << 2) | (m_dacval & 3);
	m_dac->write(m_dacval);'};
MERGE (n:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:1'}) SET n:Callback SET n += {signal: 'writepb_handler', operation: 'set', raw: 'm_pia->writepb_handler().set(FUNC(midway_cheap_squeak_deluxe_device::portb_w))', ownerTag: 'pia', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 45, sourceColumn: 2, sourceEndLine: 45, targetClass: 'midway_cheap_squeak_deluxe_device', targetMethod: 'portb_w'};
MERGE (n:KG {id: 'handler:midway_cheap_squeak_deluxe_device.portb_w'}) SET n:Handler SET n += {method: 'portb_w', ownerClass: 'midway_cheap_squeak_deluxe_device', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 166, sourceColumn: 1, sourceEndLine: 176, sourceParameters: 'uint8_t data', sourceBody: '// bit 4-5, status
	uint8_t z_mask = m_pia->port_b_z_mask();
	if (~z_mask & 0x10)  m_status = (m_status & ~1) | ((data >> 4) & 1);
	if (~z_mask & 0x20)  m_status = (m_status & ~2) | ((data >> 4) & 2);

	// bit 6-7, dac data
	m_dacval = (m_dacval & ~3) | (data >> 6);
	m_dac->write(m_dacval);'};
MERGE (n:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:2'}) SET n:Callback SET n += {signal: 'irqa_handler', operation: 'set', raw: 'm_pia->irqa_handler().set(FUNC(midway_cheap_squeak_deluxe_device::irq_w))', ownerTag: 'pia', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 46, sourceColumn: 2, sourceEndLine: 46, targetClass: 'midway_cheap_squeak_deluxe_device', targetMethod: 'irq_w'};
MERGE (n:KG {id: 'handler:midway_cheap_squeak_deluxe_device.irq_w'}) SET n:Handler SET n += {method: 'irq_w', ownerClass: 'midway_cheap_squeak_deluxe_device', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 182, sourceColumn: 1, sourceEndLine: 186, sourceParameters: 'int state', sourceBody: 'int combined_state = m_pia->irq_a_state() | m_pia->irq_b_state();
	m_cpu->set_input_line(4, combined_state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:3'}) SET n:Callback SET n += {signal: 'irqb_handler', operation: 'set', raw: 'm_pia->irqb_handler().set(FUNC(midway_cheap_squeak_deluxe_device::irq_w))', ownerTag: 'pia', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 47, sourceColumn: 2, sourceEndLine: 47, targetClass: 'midway_cheap_squeak_deluxe_device', targetMethod: 'irq_w'};
MERGE (n:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/dac'}) SET n:Device SET n += {type: 'AD7533', tag: 'dac', clock: null, config: ['AD7533(config, m_dac).add_route(ALL_OUTPUTS, *this, 1.0)'], member: 'm_dac', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 49, sourceColumn: 2, sourceEndLine: 49};
MERGE (n:KG {id: 'audioroute:device:midway_cheap_squeak_deluxe_device.device_add_mconfig/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: '^', gain: 1, raw: 'AD7533(config, m_dac).add_route(ALL_OUTPUTS, *this, 1.0)', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 49, sourceColumn: 2, sourceEndLine: 49};
MERGE (n:KG {id: 'machine:midway_ssio_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'midway_ssio_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_data","bits":8,"arrayLength":4}', '{"name":"m_status","bits":8}', '{"name":"m_14024_count","bits":8}', '{"name":"m_mute","bits":8}', '{"name":"m_overall","bits":8,"arrayLength":2}', '{"name":"m_custom_input_mask","bits":8,"arrayLength":5}', '{"name":"m_custom_output_mask","bits":8,"arrayLength":2}'], sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 402, sourceColumn: 1, sourceEndLine: 418};
MERGE (n:KG {id: 'device:midway_ssio_device.device_add_mconfig/cpu'}) SET n:Device SET n += {type: 'Z80', tag: 'cpu', clock: 2000000, config: ['Z80(config, m_cpu, DERIVED_CLOCK(1, 2*4))', 'm_cpu->set_addrmap(AS_PROGRAM, &midway_ssio_device::ssio_map)', 'if (clock())
		m_cpu->set_periodic_int(DEVICE_SELF, FUNC(midway_ssio_device::clock_14024), attotime::from_hz(clock() / (2*16*10)))'], member: 'm_cpu', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 404, sourceColumn: 2, sourceEndLine: 404};
MERGE (n:KG {id: 'device:midway_ssio_device.device_add_mconfig/cpu/callback:cpu:0'}) SET n:Callback SET n += {signal: 'set_periodic_int', operation: 'set_periodic_int', raw: 'if (clock())
		m_cpu->set_periodic_int(DEVICE_SELF, FUNC(midway_ssio_device::clock_14024), attotime::from_hz(clock() / (2*16*10)))', ownerTag: 'cpu', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 406, sourceColumn: 2, sourceEndLine: 407, periodHz: 50000, periodExpr: 'attotime::from_hz(clock() / (2*16*10))', targetClass: 'midway_ssio_device', targetMethod: 'clock_14024'};
MERGE (n:KG {id: 'handler:midway_ssio_device.clock_14024'}) SET n:Handler SET n += {method: 'clock_14024', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 218, sourceColumn: 1, sourceEndLine: 237, sourceParameters: 'device_t &device', sourceBody: '//
	//  /SINT is generated as follows:
	//
	//  Starts with a 16MHz oscillator
	//      /2 via 7474 flip-flop @ F11
	//      /16 via 74161 binary counter @ E11
	//      /10 via 74190 decade counter @ D11
	//
	//  Bit 3 of the decade counter clocks a 14024 7-bit async counter @ C12.
	//  This routine is called to clock this 7-bit counter.
	//  Bit 6 of the output is inverted and connected to /SINT.
	//
	m_14024_count = (m_14024_count + 1) & 0x7f;

	// if the low 5 bits clocked to 0, bit 6 has changed state
	if ((m_14024_count & 0x3f) == 0)
		m_cpu->set_input_line(0, (m_14024_count & 0x40) ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay0', clock: 2000000, config: ['AY8910(config, m_ay0, DERIVED_CLOCK(1, 2*4))', 'm_ay0->port_a_write_callback().set(FUNC(midway_ssio_device::porta0_w))', 'm_ay0->port_b_write_callback().set(FUNC(midway_ssio_device::portb0_w))', 'm_ay0->add_route(ALL_OUTPUTS, *this, 0.33, 0)'], member: 'm_ay0', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 409, sourceColumn: 2, sourceEndLine: 409};
MERGE (n:KG {id: 'audioroute:device:midway_ssio_device.device_add_mconfig/ay0/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: '^', gain: 0.33, input: 0, raw: 'm_ay0->add_route(ALL_OUTPUTS, *this, 0.33, 0)', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 412, sourceColumn: 2, sourceEndLine: 412};
MERGE (n:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0/callback:ay0:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set', raw: 'm_ay0->port_a_write_callback().set(FUNC(midway_ssio_device::porta0_w))', ownerTag: 'ay0', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 410, sourceColumn: 2, sourceEndLine: 410, targetClass: 'midway_ssio_device', targetMethod: 'porta0_w'};
MERGE (n:KG {id: 'handler:midway_ssio_device.porta0_w'}) SET n:Handler SET n += {method: 'porta0_w', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 280, sourceColumn: 1, sourceEndLine: 285, sourceParameters: 'uint8_t data', sourceBody: 'm_duty_cycle[0][0] = data & 15;
	m_duty_cycle[0][1] = data >> 4;
	update_volumes();'};
MERGE (n:KG {id: 'handler:midway_ssio_device.update_volumes'}) SET n:Handler SET n += {method: 'update_volumes', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 330, sourceColumn: 1, sourceEndLine: 338, sourceParameters: '', sourceBody: 'm_ay0->set_output_gain(0, m_mute ? 0.0 : m_ayvolume_lookup[m_duty_cycle[0][0]]);
	m_ay0->set_output_gain(1, m_mute ? 0.0 : m_ayvolume_lookup[m_duty_cycle[0][1]]);
	m_ay0->set_output_gain(2, m_mute ? 0.0 : m_ayvolume_lookup[m_duty_cycle[0][2]]);
	m_ay1->set_output_gain(0, m_mute ? 0.0 : m_ayvolume_lookup[m_duty_cycle[1][0]]);
	m_ay1->set_output_gain(1, m_mute ? 0.0 : m_ayvolume_lookup[m_duty_cycle[1][1]]);
	m_ay1->set_output_gain(2, m_mute ? 0.0 : m_ayvolume_lookup[m_duty_cycle[1][2]]);'};
MERGE (n:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0/callback:ay0:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'm_ay0->port_b_write_callback().set(FUNC(midway_ssio_device::portb0_w))', ownerTag: 'ay0', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 411, sourceColumn: 2, sourceEndLine: 411, targetClass: 'midway_ssio_device', targetMethod: 'portb0_w'};
MERGE (n:KG {id: 'handler:midway_ssio_device.portb0_w'}) SET n:Handler SET n += {method: 'portb0_w', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 297, sourceParameters: 'uint8_t data', sourceBody: 'm_duty_cycle[0][2] = data & 15;
	m_overall[0] = (data >> 4) & 7;
	update_volumes();'};
MERGE (n:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay1', clock: 2000000, config: ['AY8910(config, m_ay1, DERIVED_CLOCK(1, 2*4))', 'm_ay1->port_a_write_callback().set(FUNC(midway_ssio_device::porta1_w))', 'm_ay1->port_b_write_callback().set(FUNC(midway_ssio_device::portb1_w))', 'm_ay1->add_route(ALL_OUTPUTS, *this, 0.33, 1)'], member: 'm_ay1', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 414, sourceColumn: 2, sourceEndLine: 414};
MERGE (n:KG {id: 'audioroute:device:midway_ssio_device.device_add_mconfig/ay1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: '^', gain: 0.33, input: 1, raw: 'm_ay1->add_route(ALL_OUTPUTS, *this, 0.33, 1)', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 417, sourceColumn: 2, sourceEndLine: 417};
MERGE (n:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1/callback:ay1:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set', raw: 'm_ay1->port_a_write_callback().set(FUNC(midway_ssio_device::porta1_w))', ownerTag: 'ay1', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 415, sourceColumn: 2, sourceEndLine: 415, targetClass: 'midway_ssio_device', targetMethod: 'porta1_w'};
MERGE (n:KG {id: 'handler:midway_ssio_device.porta1_w'}) SET n:Handler SET n += {method: 'porta1_w', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 304, sourceColumn: 1, sourceEndLine: 309, sourceParameters: 'uint8_t data', sourceBody: 'm_duty_cycle[1][0] = data & 15;
	m_duty_cycle[1][1] = data >> 4;
	update_volumes();'};
MERGE (n:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1/callback:ay1:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'm_ay1->port_b_write_callback().set(FUNC(midway_ssio_device::portb1_w))', ownerTag: 'ay1', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 416, sourceColumn: 2, sourceEndLine: 416, targetClass: 'midway_ssio_device', targetMethod: 'portb1_w'};
MERGE (n:KG {id: 'handler:midway_ssio_device.portb1_w'}) SET n:Handler SET n += {method: 'portb1_w', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 316, sourceColumn: 1, sourceEndLine: 322, sourceParameters: 'uint8_t data', sourceBody: 'm_duty_cycle[1][2] = data & 15;
	m_overall[1] = (data >> 4) & 7;
	m_mute = data & 0x80;
	update_volumes();'};
MERGE (n:KG {id: 'handler:midway_ssio_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 437, sourceColumn: 1, sourceEndLine: 446, sourceParameters: '', sourceBody: 'compute_ay8910_modulation();
	save_item(NAME(m_data));
	save_item(NAME(m_status));
	save_item(NAME(m_14024_count));
	save_item(NAME(m_mute));
	save_item(NAME(m_overall));
	save_item(NAME(m_duty_cycle));'};
MERGE (n:KG {id: 'handler:midway_ssio_device.compute_ay8910_modulation'}) SET n:Handler SET n += {method: 'compute_ay8910_modulation', ownerClass: 'midway_ssio_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 152, sourceColumn: 1, sourceEndLine: 210, sourceParameters: '', sourceBody: '//
	// AY-8910 modulation:
	//
	// Starts with a 16MHz oscillator
	//  /2 via 7474 flip-flip @ F11
	//
	// This signal clocks the binary counter @ E11 which
	// cascades into the decade counter @ D11. This combo
	// effectively counts from 0-159 and then wraps. The
	// value from these counters is input to an 82S123 PROM,
	// which appears to be standard on all games.
	//
	// One bit at a time from this PROM is clocked at a time
	// and the resulting inverted signal becomes a clock for
	// the down counters at F3, F4, F5, F8, F9, and F10. The
	// value in these down counters are reloaded after the 160
	// counts from the binary/decade counter combination.
	//
	// When these down counters are loaded, the TC signal is
	// clear, which mutes the voice. When the down counters
	// cross through 0, the TC signal goes high and the 4016
	// multiplexers allow the AY-8910 voice to go through.
	// Thus, writing a 0 to the counters will enable the
	// voice for the longest period of time, while writing
	// a 15 enables it for the shortest period of time.
	// This creates an effective duty cycle for the voice.
	//
	// Given that the down counters are reset 50000 times per
	// second (SSIO_CLOCK/2/160), which is above the typical
	// frequency of sound output. So we simply apply a volume
	// adjustment to each voice according to the duty cycle.
	//

	// loop over all possible values of the duty cycle
	uint8_t *prom = memregion("proms")->base();
	for (int volval = 0; volval < 16; volval++)
	{
		// loop over all the clocks until we run out; look up in the PROM
		// to find out when the next clock should fire
		int remaining_clocks = volval;
		int cur = 0, prev = 1;
		int curclock;
		for (curclock = 0; curclock < 160 && remaining_clocks; curclock++)
		{
			cur = prom[curclock / 8] & (0x80 >> (curclock % 8));

			// check for a high -> low transition
			if (cur == 0 && prev != 0)
				remaining_clocks--;

			prev = cur;
		}

		// treat the duty cycle as a volume
		m_ayvolume_lookup[15 - volval] = curclock / 160.0f;
	}'};
MERGE (n:KG {id: 'handler:midway_cheap_squeak_deluxe_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'midway_cheap_squeak_deluxe_device', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 85, sourceColumn: 1, sourceEndLine: 91, sourceParameters: '', sourceBody: 'save_item(NAME(m_status));
	save_item(NAME(m_dacval));

	m_pia_sync_timer = timer_alloc(FUNC(midway_cheap_squeak_deluxe_device::sync_pia), this);'};
MERGE (n:KG {id: 'handler:midway_cheap_squeak_deluxe_device.sync_pia'}) SET n:Handler SET n += {method: 'sync_pia', ownerClass: 'midway_cheap_squeak_deluxe_device', sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 97, sourceColumn: 1, sourceEndLine: 104, sourceParameters: 'int param', sourceBody: 'm_pia->ca1_w(param);

	// oftentimes games will write one nibble at a time; the sync on this is very
	// important, so we boost the interleave briefly while this happens
	machine().scheduler().perfect_quantum(attotime::from_usec(100));'};
MERGE (n:KG {id: 'inputs:spyhunt'}) SET n:InputPorts SET n += {name: 'spyhunt', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 895, sourceColumn: 8, sourceEndLine: 895};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP0'}) SET n:Port SET n += {tag: 'ssio:IP0', modify: false};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 12, activeLow: true, type: 'IPT_UNUSED', defaultValue: 12};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("Gear Shift")', 'PORT_TOGGLE'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_TILT', defaultValue: 32};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP0/f6'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true, defaultValue: 128};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP1'}) SET n:Port SET n += {tag: 'ssio:IP1', modify: false};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON4', modifiers: ['PORT_NAME("Left Button / Oil Slick")'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("Left Trigger / Missiles")'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_START1', modifiers: ['PORT_NAME("Center Button / Weapons Van")'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_BUTTON5', modifiers: ['PORT_NAME("Right Button / Smoke Screen")'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON6', modifiers: ['PORT_NAME("Right Trigger / Machine Guns")'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 96, activeLow: false, type: 'IPT_CUSTOM', defaultValue: 0};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED', defaultValue: 128};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP2'}) SET n:Port SET n += {tag: 'ssio:IP2', modify: false};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_PEDAL', modifiers: ['PORT_MINMAX(0x30,0xff)', 'PORT_SENSITIVITY(100)', 'PORT_KEYDELTA(10)'], defaultValue: 48};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP3'}) SET n:Port SET n += {tag: 'ssio:IP3', modify: false};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP3/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Game Timer', defaultValue: 1, settings: ['0=1:00', '1=1:30']};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP3/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Demo Sounds', defaultValue: 0, settings: ['2=Off', '0=On']};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 4};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED', defaultValue: 240};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP4'}) SET n:Port SET n += {tag: 'ssio:IP4', modify: false};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNUSED', defaultValue: 255};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:DIP'}) SET n:Port SET n += {tag: 'ssio:DIP', modify: false};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:DIP/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 255};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP2.ALT'}) SET n:Port SET n += {tag: 'ssio:IP2.ALT', modify: false};
MERGE (n:KG {id: 'inputs:spyhunt/ssio:IP2.ALT/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_PADDLE', modifiers: ['PORT_MINMAX(0x34,0xb4)', 'PORT_SENSITIVITY(40)', 'PORT_KEYDELTA(10)'], defaultValue: 116};
MERGE (n:KG {id: 'gfxlayout:spyhunt_charlayout'}) SET n:GfxLayout SET n += {name: 'spyhunt_charlayout', width: 64, height: 32, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: ['RGN_FRAC(1,2)', 'RGN_FRAC(1,2)+1', 0, 1], xOffsets: [0, 0, 2, 2, 4, 4, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 16, 16, 18, 18, 20, 20, 22, 22, 24, 24, 26, 26, 28, 28, 30, 30, 32, 32, 34, 34, 36, 36, 38, 38, 40, 40, 42, 42, 44, 44, 46, 46, 48, 48, 50, 50, 52, 52, 54, 54, 56, 56, 58, 58, 60, 60, 62, 62], yOffsets: [0, 0, 64, 64, 128, 128, 192, 192, 256, 256, 320, 320, 384, 384, 448, 448, 512, 512, 576, 576, 640, 640, 704, 704, 768, 768, 832, 832, 896, 896, 960, 960], charIncrement: 1024};
MERGE (n:KG {id: 'gfxlayout:spyhunt_alphalayout'}) SET n:GfxLayout SET n += {name: 'spyhunt_alphalayout', width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [0, 1], xOffsets: [0, 0, 2, 2, 4, 4, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14], yOffsets: [0, 0, 16, 16, 32, 32, 48, 48, 64, 64, 80, 80, 96, 96, 112, 112], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:mcr_bg_layout'}) SET n:GfxLayout SET n += {name: 'mcr_bg_layout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: ['RGN_FRAC(1,2)', 'RGN_FRAC(1,2)+1', 'RGN_FRAC(0,2)', 'RGN_FRAC(0,2)+1'], xOffsets: [0, 2, 4, 6, 8, 10, 12, 14], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:mcr_sprite_layout'}) SET n:GfxLayout SET n += {name: 'mcr_sprite_layout', width: 32, height: 32, total: 'RGN_FRAC(1,4)', planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: ['RGN_FRAC(0,4)+0', 'RGN_FRAC(0,4)+0+4', 'RGN_FRAC(1,4)+0', 'RGN_FRAC(1,4)+0+4', 'RGN_FRAC(2,4)+0', 'RGN_FRAC(2,4)+0+4', 'RGN_FRAC(3,4)+0', 'RGN_FRAC(3,4)+0+4', 'RGN_FRAC(0,4)+8', 'RGN_FRAC(0,4)+8+4', 'RGN_FRAC(1,4)+8', 'RGN_FRAC(1,4)+8+4', 'RGN_FRAC(2,4)+8', 'RGN_FRAC(2,4)+8+4', 'RGN_FRAC(3,4)+8', 'RGN_FRAC(3,4)+8+4', 'RGN_FRAC(0,4)+16', 'RGN_FRAC(0,4)+16+4', 'RGN_FRAC(1,4)+16', 'RGN_FRAC(1,4)+16+4', 'RGN_FRAC(2,4)+16', 'RGN_FRAC(2,4)+16+4', 'RGN_FRAC(3,4)+16', 'RGN_FRAC(3,4)+16+4', 'RGN_FRAC(0,4)+24', 'RGN_FRAC(0,4)+24+4', 'RGN_FRAC(1,4)+24', 'RGN_FRAC(1,4)+24+4', 'RGN_FRAC(2,4)+24', 'RGN_FRAC(2,4)+24+4', 'RGN_FRAC(3,4)+24', 'RGN_FRAC(3,4)+24+4'], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672, 704, 736, 768, 800, 832, 864, 896, 928, 960, 992], charIncrement: 1024};
MERGE (n:KG {id: 'gfxdecode:gfx_mcr3'}) SET n:GfxDecode SET n += {name: 'gfx_mcr3', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1063, sourceColumn: 8, sourceEndLine: 1063};
MERGE (n:KG {id: 'gfxdecode:gfx_mcr3/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'mcr_bg_layout', colorBase: 0, colorCount: 4, xscale: 2, yscale: 2};
MERGE (n:KG {id: 'gfxdecode:gfx_mcr3/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'mcr_sprite_layout', colorBase: 0, colorCount: 4, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_spyhunt'}) SET n:GfxDecode SET n += {name: 'gfx_spyhunt', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1069, sourceColumn: 8, sourceEndLine: 1069};
MERGE (n:KG {id: 'gfxdecode:gfx_spyhunt/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'spyhunt_charlayout', colorBase: 48, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_spyhunt/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'mcr_sprite_layout', colorBase: 0, colorCount: 4, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_spyhunt/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx3', offset: 0, layout: 'spyhunt_alphalayout', colorBase: 64, colorCount: 1, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:spyhunt'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1700, sourceColumn: 1, sourceEndLine: 1700};
MATCH (a:KG {id: 'game:spyhunt'}), (b:KG {id: 'machine:mcrsc_csd_state.spyhunt'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:spyhunt'}), (b:KG {id: 'inputs:spyhunt'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:spyhunt'}), (b:KG {id: 'romset:spyhunt'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:mcr3.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:spyhunt.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:turbotag.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:mcrsc_csd_state.spyhunt'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1208, sourceColumn: 1, sourceEndLine: 1212};
MATCH (a:KG {id: 'machine:mcrsc_csd_state.spyhunt'}), (b:KG {id: 'handler:mcr_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcrsc_csd_state.spyhunt'}), (b:KG {id: 'handler:mcr3_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcrsc_csd_state.spyhunt'}), (b:KG {id: 'machine:mcrsc_csd_state.mcrsc_csd'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:mcrsc_csd_state.spyhunt'}), (b:KG {id: 'machine:mcrsc_csd_state.spyhunt/callback:adc:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:spyhunt'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 895, sourceColumn: 8, sourceEndLine: 895};
MATCH (a:KG {id: 'inputs:spyhunt'}), (b:KG {id: 'inputs:spyhunt/ssio:IP0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spyhunt'}), (b:KG {id: 'inputs:spyhunt/ssio:IP1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spyhunt'}), (b:KG {id: 'inputs:spyhunt/ssio:IP2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spyhunt'}), (b:KG {id: 'inputs:spyhunt/ssio:IP3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spyhunt'}), (b:KG {id: 'inputs:spyhunt/ssio:IP4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spyhunt'}), (b:KG {id: 'inputs:spyhunt/ssio:DIP'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spyhunt'}), (b:KG {id: 'inputs:spyhunt/ssio:IP2.ALT'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:spyhunt'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1413, sourceColumn: 1, sourceEndLine: 1413};
MATCH (a:KG {id: 'romset:spyhunt'}), (b:KG {id: 'region:spyhunt/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:spyhunt'}), (b:KG {id: 'region:spyhunt/ssio:cpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:spyhunt'}), (b:KG {id: 'region:spyhunt/csd:cpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:spyhunt'}), (b:KG {id: 'region:spyhunt/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:spyhunt'}), (b:KG {id: 'region:spyhunt/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:spyhunt'}), (b:KG {id: 'region:spyhunt/gfx3'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:mcr3_state.video_start'}), (b:KG {id: 'handler:mcr3_state.mcrmono_get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcrsc_csd_state.mcrsc_csd'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1185, sourceColumn: 1, sourceEndLine: 1206};
MATCH (a:KG {id: 'machine:mcrsc_csd_state.mcrsc_csd'}), (b:KG {id: 'handler:mcr_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcrsc_csd_state.mcrsc_csd'}), (b:KG {id: 'handler:mcr3_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcrsc_csd_state.mcrsc_csd'}), (b:KG {id: 'machine:mcr3_state.mcrscroll'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:mcrsc_csd_state.mcrsc_csd'}), (b:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/csd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcrsc_csd_state.mcrsc_csd'}), (b:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/lamplatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcrsc_csd_state.mcrsc_csd'}), (b:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/adc'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcrsc_csd_state.spyhunt/callback:adc:0'}), (b:KG {id: 'handler:mcrsc_csd_state.spyhunt_ip2_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP0'}), (b:KG {id: 'inputs:spyhunt/ssio:IP0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP0'}), (b:KG {id: 'inputs:spyhunt/ssio:IP0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP0'}), (b:KG {id: 'inputs:spyhunt/ssio:IP0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP0'}), (b:KG {id: 'inputs:spyhunt/ssio:IP0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP0'}), (b:KG {id: 'inputs:spyhunt/ssio:IP0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP0'}), (b:KG {id: 'inputs:spyhunt/ssio:IP0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP0'}), (b:KG {id: 'inputs:spyhunt/ssio:IP0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP1'}), (b:KG {id: 'inputs:spyhunt/ssio:IP1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP1'}), (b:KG {id: 'inputs:spyhunt/ssio:IP1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP1'}), (b:KG {id: 'inputs:spyhunt/ssio:IP1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP1'}), (b:KG {id: 'inputs:spyhunt/ssio:IP1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP1'}), (b:KG {id: 'inputs:spyhunt/ssio:IP1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP1'}), (b:KG {id: 'inputs:spyhunt/ssio:IP1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP1'}), (b:KG {id: 'inputs:spyhunt/ssio:IP1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP2'}), (b:KG {id: 'inputs:spyhunt/ssio:IP2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP3'}), (b:KG {id: 'inputs:spyhunt/ssio:IP3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP3'}), (b:KG {id: 'inputs:spyhunt/ssio:IP3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP3'}), (b:KG {id: 'inputs:spyhunt/ssio:IP3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP3'}), (b:KG {id: 'inputs:spyhunt/ssio:IP3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP3'}), (b:KG {id: 'inputs:spyhunt/ssio:IP3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP4'}), (b:KG {id: 'inputs:spyhunt/ssio:IP4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:DIP'}), (b:KG {id: 'inputs:spyhunt/ssio:DIP/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spyhunt/ssio:IP2.ALT'}), (b:KG {id: 'inputs:spyhunt/ssio:IP2.ALT/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:spyhunt/maincpu'}), (b:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg0_2-9-84.6d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/maincpu'}), (b:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg1_2-9-84.7d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/maincpu'}), (b:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg2_2-9-84.8d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/maincpu'}), (b:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg3_2-9-84.9d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/maincpu'}), (b:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg4_2-9-84.10d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/maincpu'}), (b:KG {id: 'rom:spyhunt/maincpu/spy-hunter_cpu_pg5_2-9-84.11d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/ssio:cpu'}), (b:KG {id: 'rom:spyhunt/ssio:cpu/spy-hunter_snd_0_sd_11-18-83.a7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/ssio:cpu'}), (b:KG {id: 'rom:spyhunt/ssio:cpu/spy-hunter_snd_1_sd_11-18-83.a8'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/csd:cpu'}), (b:KG {id: 'rom:spyhunt/csd:cpu/spy-hunter_cs_deluxe_u7_a_11-18-83.u7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/csd:cpu'}), (b:KG {id: 'rom:spyhunt/csd:cpu/spy-hunter_cs_deluxe_u17_b_11-18-83.u17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/csd:cpu'}), (b:KG {id: 'rom:spyhunt/csd:cpu/spy-hunter_cs_deluxe_u8_c_11-18-83.u8'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/csd:cpu'}), (b:KG {id: 'rom:spyhunt/csd:cpu/spy-hunter_cs_deluxe_u18_d_11-18-83.u18'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx1'}), (b:KG {id: 'rom:spyhunt/gfx1/spy-hunter_cpu_bg0_11-18-83.3a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx1'}), (b:KG {id: 'rom:spyhunt/gfx1/spy-hunter_cpu_bg1_11-18-83.4a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx1'}), (b:KG {id: 'rom:spyhunt/gfx1/spy-hunter_cpu_bg2_11-18-83.5a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx1'}), (b:KG {id: 'rom:spyhunt/gfx1/spy-hunter_cpu_bg3_11-18-83.6a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx2'}), (b:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_1fg_11-18-83.a7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx2'}), (b:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_0fg_11-18-83.a8'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx2'}), (b:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_3fg_11-18-83.a5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx2'}), (b:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_2fg_11-18-83.a6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx2'}), (b:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_5fg_11-18-83.a3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx2'}), (b:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_4fg_11-18-83.a4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx2'}), (b:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_7fg_11-18-83.a1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx2'}), (b:KG {id: 'rom:spyhunt/gfx2/spy-hunter_video_6fg_11-18-83.a2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spyhunt/gfx3'}), (b:KG {id: 'rom:spyhunt/gfx3/spy-hunter_cpu_alpha-n_11-18-83'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1161, sourceColumn: 1, sourceEndLine: 1181};
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll'}), (b:KG {id: 'handler:mcr_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll'}), (b:KG {id: 'handler:mcr3_state.video_start_spyhunt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll'}), (b:KG {id: 'machine:mcr3_state.mcrmono'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll'}), (b:KG {id: 'map:mcr3_state.spyhunt_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll'}), (b:KG {id: 'map:mcr3_state.spyhunt_portmap'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_IO', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll'}), (b:KG {id: 'gfxdecode:gfx_spyhunt'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode', override: true};
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll'}), (b:KG {id: 'machine:mcr3_state.mcrscroll/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll'}), (b:KG {id: 'device:mcr3_state.mcrscroll/ssio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/csd'}), (b:KG {id: 'audioroute:device:mcrsc_csd_state.mcrsc_csd/csd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/csd'}), (b:KG {id: 'audioroute:device:mcrsc_csd_state.mcrsc_csd/csd/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/csd'}), (b:KG {id: 'machine:midway_cheap_squeak_deluxe_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:mcrsc_csd_state.mcrsc_csd/csd'}), (b:KG {id: 'handler:midway_cheap_squeak_deluxe_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:mcr3_state.video_start_spyhunt'}), (b:KG {id: 'handler:mcr3_state.spyhunt_get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:mcr3_state.video_start_spyhunt'}), (b:KG {id: 'handler:mcr3_state.spyhunt_bg_scan'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:mcr3_state.video_start_spyhunt'}), (b:KG {id: 'handler:mcr3_state.spyhunt_get_alpha_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1083, sourceColumn: 1, sourceEndLine: 1116};
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'handler:mcr_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'handler:mcr3_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/scantimer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/ctc'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'gfxdecode:gfx_mcr3'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 515, sourceColumn: 1, sourceEndLine: 524};
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map'}), (b:KG {id: 'map:mcr3_state.spyhunt_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map'}), (b:KG {id: 'map:mcr3_state.spyhunt_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map'}), (b:KG {id: 'map:mcr3_state.spyhunt_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map'}), (b:KG {id: 'map:mcr3_state.spyhunt_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map'}), (b:KG {id: 'map:mcr3_state.spyhunt_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map'}), (b:KG {id: 'map:mcr3_state.spyhunt_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 527, sourceColumn: 1, sourceEndLine: 536};
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap'}), (b:KG {id: 'map:midway_ssio_device.ssio_input_ports'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap'}), (b:KG {id: 'map:mcr3_state.spyhunt_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap'}), (b:KG {id: 'map:mcr3_state.spyhunt_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap'}), (b:KG {id: 'map:mcr3_state.spyhunt_portmap/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap'}), (b:KG {id: 'map:mcr3_state.spyhunt_portmap/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_spyhunt'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1069, sourceColumn: 8, sourceEndLine: 1069};
MATCH (a:KG {id: 'gfxdecode:gfx_spyhunt'}), (b:KG {id: 'gfxdecode:gfx_spyhunt/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_spyhunt'}), (b:KG {id: 'gfxdecode:gfx_spyhunt/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_spyhunt'}), (b:KG {id: 'gfxdecode:gfx_spyhunt/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrscroll/callback:screen:0'}), (b:KG {id: 'handler:mcr3_state.screen_update_spyhunt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrscroll/ssio'}), (b:KG {id: 'audioroute:device:mcr3_state.mcrscroll/ssio/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrscroll/ssio'}), (b:KG {id: 'audioroute:device:mcr3_state.mcrscroll/ssio/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrscroll/ssio'}), (b:KG {id: 'machine:midway_ssio_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrscroll/ssio'}), (b:KG {id: 'handler:midway_ssio_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:midway_cheap_squeak_deluxe_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/bally/csd.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 38, sourceColumn: 1, sourceEndLine: 50};
MATCH (a:KG {id: 'machine:midway_cheap_squeak_deluxe_device.device_add_mconfig'}), (b:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/cpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midway_cheap_squeak_deluxe_device.device_add_mconfig'}), (b:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midway_cheap_squeak_deluxe_device.device_add_mconfig'}), (b:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'handler:midway_cheap_squeak_deluxe_device.device_start'}), (b:KG {id: 'handler:midway_cheap_squeak_deluxe_device.sync_pia'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/maincpu'}), (b:KG {id: 'map:mcr3_state.mcrmono_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/maincpu'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/scantimer'}), (b:KG {id: 'device:mcr3_state.mcrmono/scantimer/callback:scantimer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc'}), (b:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc'}), (b:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1063, sourceColumn: 8, sourceEndLine: 1063};
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3'}), (b:KG {id: 'gfxdecode:gfx_mcr3/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3'}), (b:KG {id: 'gfxdecode:gfx_mcr3/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map/range1'}), (b:KG {id: 'handler:mcr3_state.spyhunt_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map/range2'}), (b:KG {id: 'handler:mcr3_state.spyhunt_alpharam_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_map/range5'}), (b:KG {id: 'handler:mcr3_state.mcr_paletteram9_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_input_ports'}), (b:KG {id: 'file:src/mame/bally/midway_sound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 368, sourceColumn: 1, sourceEndLine: 374};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_input_ports'}), (b:KG {id: 'map:midway_ssio_device.ssio_input_ports/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_input_ports'}), (b:KG {id: 'map:midway_ssio_device.ssio_input_ports/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_input_ports'}), (b:KG {id: 'map:midway_ssio_device.ssio_input_ports/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_input_ports'}), (b:KG {id: 'map:midway_ssio_device.ssio_input_ports/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap/range0'}), (b:KG {id: 'handler:mcr3_state.spyhunt_scroll_value_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap/range1'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap/range3'}), (b:KG {id: 'handler:z80ctc_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ctc'};
MATCH (a:KG {id: 'map:mcr3_state.spyhunt_portmap/range3'}), (b:KG {id: 'handler:z80ctc_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ctc'};
MATCH (a:KG {id: 'gfxdecode:gfx_spyhunt/e0'}), (b:KG {id: 'gfxlayout:spyhunt_charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_spyhunt/e1'}), (b:KG {id: 'gfxlayout:mcr_sprite_layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_spyhunt/e2'}), (b:KG {id: 'gfxlayout:spyhunt_alphalayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'handler:mcr3_state.screen_update_spyhunt'}), (b:KG {id: 'handler:mcr3_state.mcr3_update_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:midway_ssio_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/bally/midway_sound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 402, sourceColumn: 1, sourceEndLine: 418};
MATCH (a:KG {id: 'machine:midway_ssio_device.device_add_mconfig'}), (b:KG {id: 'device:midway_ssio_device.device_add_mconfig/cpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midway_ssio_device.device_add_mconfig'}), (b:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midway_ssio_device.device_add_mconfig'}), (b:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'handler:midway_ssio_device.device_start'}), (b:KG {id: 'handler:midway_ssio_device.compute_ay8910_modulation'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/csd.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/csd.cpp'}), (b:KG {id: 'file:csd.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/cpu'}), (b:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia'}), (b:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia'}), (b:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia'}), (b:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia'}), (b:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/dac'}), (b:KG {id: 'audioroute:device:midway_cheap_squeak_deluxe_device.device_add_mconfig/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 479, sourceColumn: 1, sourceEndLine: 489};
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 492, sourceColumn: 1, sourceEndLine: 504};
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/scantimer/callback:scantimer:0'}), (b:KG {id: 'handler:mcr3_state.mcr_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:0'}), (b:KG {id: 'device:mcr3_state.mcrmono/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:1'}), (b:KG {id: 'handler:z80ctc_device.trg1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:1'}), (b:KG {id: 'device:mcr3_state.mcrmono/ctc'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3/e0'}), (b:KG {id: 'gfxlayout:mcr_bg_layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3/e1'}), (b:KG {id: 'gfxlayout:mcr_sprite_layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'handler:mcr3_state.mcr_paletteram9_w'}), (b:KG {id: 'handler:mcr_state.mcr_set_color'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/midway_sound.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/midway_sound.cpp'}), (b:KG {id: 'file:midway_sound.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/midway_sound.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_input_ports/range0'}), (b:KG {id: 'handler:midway_ssio_device.ioport_read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ssio'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_input_ports/range1'}), (b:KG {id: 'handler:midway_ssio_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ssio'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_input_ports/range2'}), (b:KG {id: 'handler:midway_ssio_device.ioport_write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ssio'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_input_ports/range3'}), (b:KG {id: 'handler:midway_ssio_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ssio'};
MATCH (a:KG {id: 'gfxlayout:spyhunt_charlayout'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:mcr_sprite_layout'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spyhunt_alphalayout'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/cpu'}), (b:KG {id: 'device:midway_ssio_device.device_add_mconfig/cpu/callback:cpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/cpu'}), (b:KG {id: 'map:midway_ssio_device.ssio_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0'}), (b:KG {id: 'audioroute:device:midway_ssio_device.device_add_mconfig/ay0/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0'}), (b:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0/callback:ay0:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0'}), (b:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0/callback:ay0:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1'}), (b:KG {id: 'audioroute:device:midway_ssio_device.device_add_mconfig/ay1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1'}), (b:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1/callback:ay1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1'}), (b:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1/callback:ay1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map'}), (b:KG {id: 'file:src/mame/bally/csd.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/csd.cpp', sourceLine: 24, sourceColumn: 1, sourceEndLine: 32};
MATCH (a:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map'}), (b:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map'}), (b:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map'}), (b:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map'}), (b:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:0'}), (b:KG {id: 'handler:midway_cheap_squeak_deluxe_device.porta_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:1'}), (b:KG {id: 'handler:midway_cheap_squeak_deluxe_device.portb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:2'}), (b:KG {id: 'handler:midway_cheap_squeak_deluxe_device.irq_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_cheap_squeak_deluxe_device.device_add_mconfig/pia/callback:pia:3'}), (b:KG {id: 'handler:midway_cheap_squeak_deluxe_device.irq_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map/range4'}), (b:KG {id: 'handler:mcr3_state.mcr_paletteram9_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map/range5'}), (b:KG {id: 'handler:mcr3_state.mcr3_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap/range5'}), (b:KG {id: 'handler:mcr3_state.mcrmono_control_port_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap/range6'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap/range7'}), (b:KG {id: 'handler:z80ctc_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ctc'};
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap/range7'}), (b:KG {id: 'handler:z80ctc_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ctc'};
MATCH (a:KG {id: 'gfxlayout:mcr_bg_layout'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:midway_ssio_device.write'}), (b:KG {id: 'handler:midway_ssio_device.synced_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/cpu/callback:cpu:0'}), (b:KG {id: 'handler:midway_ssio_device.clock_14024'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'file:src/mame/bally/midway_sound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 361};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map'}), (b:KG {id: 'map:midway_ssio_device.ssio_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0/callback:ay0:0'}), (b:KG {id: 'handler:midway_ssio_device.porta0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay0/callback:ay0:1'}), (b:KG {id: 'handler:midway_ssio_device.portb0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1/callback:ay1:0'}), (b:KG {id: 'handler:midway_ssio_device.porta1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_ssio_device.device_add_mconfig/ay1/callback:ay1:1'}), (b:KG {id: 'handler:midway_ssio_device.portb1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range1'}), (b:KG {id: 'handler:pia6821_device.read_alt'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range1'}), (b:KG {id: 'handler:pia6821_device.write_alt'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range2'}), (b:KG {id: 'handler:pia6821_device.read_alt'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'map:midway_cheap_squeak_deluxe_device.csdeluxe_map/range2'}), (b:KG {id: 'handler:pia6821_device.write_alt'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map/range2'}), (b:KG {id: 'handler:midway_ssio_device.data_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map/range3'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay0'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map/range4'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay0'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map/range5'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay0'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map/range6'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map/range7'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map/range8'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map/range9'}), (b:KG {id: 'handler:midway_ssio_device.status_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:midway_ssio_device.ssio_map/range11'}), (b:KG {id: 'handler:midway_ssio_device.irq_clear'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'handler:midway_ssio_device.porta0_w'}), (b:KG {id: 'handler:midway_ssio_device.update_volumes'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:midway_ssio_device.portb0_w'}), (b:KG {id: 'handler:midway_ssio_device.update_volumes'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:midway_ssio_device.porta1_w'}), (b:KG {id: 'handler:midway_ssio_device.update_volumes'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:midway_ssio_device.portb1_w'}), (b:KG {id: 'handler:midway_ssio_device.update_volumes'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
