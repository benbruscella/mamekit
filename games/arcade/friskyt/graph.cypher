// mamekit knowledge graph — driver src/mame/nichibutsu/seicross.cpp
// generated 2026-08-22T05:52:19.389Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/nichibutsu/seicross.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6800/m6800.h'}) SET n:SourceFile SET n += {path: 'cpu/m6800/m6800.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'game:friskyt'}) SET n:Game SET n += {name: 'friskyt', year: '1981', company: 'Nichibutsu', fullname: 'Frisky Tom (set 1)', monitor: 'ROT0', cls: 'seicross_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 936, sourceColumn: 1, sourceEndLine: 936};
MERGE (n:KG {id: 'romset:friskyt'}) SET n:RomSet SET n += {name: 'friskyt', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 685, sourceColumn: 1, sourceEndLine: 685};
MERGE (n:KG {id: 'region:friskyt/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 30720, flags: '0', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 686, sourceColumn: 2, sourceEndLine: 686};
MERGE (n:KG {id: 'rom:friskyt/maincpu/ftom.01'}) SET n:Rom SET n += {file: 'ftom.01', offset: 0, size: 4096, crc: 'bce5d486', sha1: 'b3226d5737490f18092227a663e89ad48f39d82c', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 687, sourceColumn: 2, sourceEndLine: 687};
MERGE (n:KG {id: 'rom:friskyt/maincpu/ftom.02'}) SET n:Rom SET n += {file: 'ftom.02', offset: 4096, size: 4096, crc: '63157d6e', sha1: '2792f3d918ffee3818eca98f52192a069ab60678', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 688, sourceColumn: 2, sourceEndLine: 688};
MERGE (n:KG {id: 'rom:friskyt/maincpu/ftom.03'}) SET n:Rom SET n += {file: 'ftom.03', offset: 8192, size: 4096, crc: 'c8d9ef2c', sha1: '43dd6bfd93188004b977b97120df28c028e8582b', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 689, sourceColumn: 2, sourceEndLine: 689};
MERGE (n:KG {id: 'rom:friskyt/maincpu/ftom.04'}) SET n:Rom SET n += {file: 'ftom.04', offset: 12288, size: 4096, crc: '23a01aac', sha1: 'db514c54c1a089a900abf954035ae4d1093e778d', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 690, sourceColumn: 2, sourceEndLine: 690};
MERGE (n:KG {id: 'rom:friskyt/maincpu/ftom.05'}) SET n:Rom SET n += {file: 'ftom.05', offset: 16384, size: 4096, crc: 'bfaf702a', sha1: 'd42fa3e935bfc5bfbab582343aaafc86ebcbfda2', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 691, sourceColumn: 2, sourceEndLine: 691};
MERGE (n:KG {id: 'rom:friskyt/maincpu/ftom.06'}) SET n:Rom SET n += {file: 'ftom.06', offset: 20480, size: 4096, crc: 'bce70b9c', sha1: '85d2811f15cba7d0424d5ca024c0c26ee0b2a32a', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 692, sourceColumn: 2, sourceEndLine: 692};
MERGE (n:KG {id: 'rom:friskyt/maincpu/ftom.07'}) SET n:Rom SET n += {file: 'ftom.07', offset: 24576, size: 4096, crc: 'b2ef303a', sha1: 'a7150457b454e15c06fa832d42dd1f0e165fcd6e', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 693, sourceColumn: 2, sourceEndLine: 693};
MERGE (n:KG {id: 'rom:friskyt/maincpu/ft8_8.rom'}) SET n:Rom SET n += {file: 'ft8_8.rom', offset: 28672, size: 2048, crc: '10461a24', sha1: 'c1f98316a4e90a2a6ef4953708b90c9546caaedd', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 694, sourceColumn: 2, sourceEndLine: 694};
MERGE (n:KG {id: 'region:friskyt/gfx'}) SET n:RomRegion SET n += {tag: 'gfx', size: 16384, flags: '0', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 696, sourceColumn: 2, sourceEndLine: 696};
MERGE (n:KG {id: 'rom:friskyt/gfx/ftom.11'}) SET n:Rom SET n += {file: 'ftom.11', offset: 0, size: 4096, crc: '1ec6ff65', sha1: 'aab589c89cd14549b35f4dece5d3c231033c0c1a', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 697, sourceColumn: 2, sourceEndLine: 697};
MERGE (n:KG {id: 'rom:friskyt/gfx/ftom.12'}) SET n:Rom SET n += {file: 'ftom.12', offset: 4096, size: 4096, crc: '3b8f40b5', sha1: '08e0c1fce11ee6c507c28b0d659c5b010f2f2b6f', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 698, sourceColumn: 2, sourceEndLine: 698};
MERGE (n:KG {id: 'rom:friskyt/gfx/ftom.09'}) SET n:Rom SET n += {file: 'ftom.09', offset: 8192, size: 4096, crc: '60642f25', sha1: '2d179a9ea99014065f578bbec4fbfbda5aead98b', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 699, sourceColumn: 2, sourceEndLine: 699};
MERGE (n:KG {id: 'rom:friskyt/gfx/ftom.10'}) SET n:Rom SET n += {file: 'ftom.10', offset: 12288, size: 4096, crc: '07b9dcfc', sha1: '0a573065b6b08745b91fb47ce477d76be7a01750', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 700, sourceColumn: 2, sourceEndLine: 700};
MERGE (n:KG {id: 'region:friskyt/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 64, flags: '0', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702};
MERGE (n:KG {id: 'rom:friskyt/proms/ft.9c'}) SET n:Rom SET n += {file: 'ft.9c', offset: 0, size: 32, crc: '0032167e', sha1: '9df3c7bbf6b700bfa51b8b82c45b60c10bdcd1a0', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 703, sourceColumn: 2, sourceEndLine: 703};
MERGE (n:KG {id: 'rom:friskyt/proms/ft.9b'}) SET n:Rom SET n += {file: 'ft.9b', offset: 32, size: 32, crc: '6b364e69', sha1: 'abfcab884e8a50f872f862a421b8e8c5e16ff62c', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 704, sourceColumn: 2, sourceEndLine: 704};
MERGE (n:KG {id: 'map:seicross_state.main_map'}) SET n:AddressMap SET n += {cls: 'seicross_state', name: 'main_map', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 346, sourceColumn: 1, sourceEndLine: 359};
MERGE (n:KG {id: 'map:seicross_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 30719, raw: 'map(0x0000, 0x77ff).rom()', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 348, sourceColumn: 2, sourceEndLine: 348, rom: true};
MERGE (n:KG {id: 'map:seicross_state.main_map/range1'}) SET n:AddressRange SET n += {start: 30720, end: 32767, raw: 'map(0x7800, 0x7fff).ram().share(m_sharedram)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 349, sourceColumn: 2, sourceEndLine: 349, ram: true, share: 'sharedram'};
MERGE (n:KG {id: 'map:seicross_state.main_map/range2'}) SET n:AddressRange SET n += {start: 34848, end: 34943, raw: 'map(0x8820, 0x887f).ram().share(m_spriteram[0])', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 350, sourceColumn: 2, sourceEndLine: 350, ram: true, share: 'spriteram[0]'};
MERGE (n:KG {id: 'map:seicross_state.main_map/range3'}) SET n:AddressRange SET n += {start: 36864, end: 37887, raw: 'map(0x9000, 0x93ff).ram().w(FUNC(seicross_state::videoram_w)).share(m_videoram)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:seicross_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 234, sourceColumn: 1, sourceEndLine: 238, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:seicross_state.main_map/range4'}) SET n:AddressRange SET n += {start: 38912, end: 38943, raw: 'map(0x9800, 0x981f).ram().share(m_row_scroll)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 352, sourceColumn: 2, sourceEndLine: 352, ram: true, share: 'row_scroll'};
MERGE (n:KG {id: 'map:seicross_state.main_map/range5'}) SET n:AddressRange SET n += {start: 39040, end: 39071, raw: 'map(0x9880, 0x989f).writeonly().share(m_spriteram[1])', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 353, sourceColumn: 2, sourceEndLine: 353, writeonly: true, share: 'spriteram[1]'};
MERGE (n:KG {id: 'map:seicross_state.main_map/range6'}) SET n:AddressRange SET n += {start: 39936, end: 40959, raw: 'map(0x9c00, 0x9fff).ram().w(FUNC(seicross_state::colorram_w)).share(m_colorram)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 354, sourceColumn: 2, sourceEndLine: 354, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:seicross_state.colorram_w'}) SET n:Handler SET n += {method: 'colorram_w', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 240, sourceColumn: 1, sourceEndLine: 251, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// bit 5 of the address is not used for color memory. There is just 512k
	// of memory; every two consecutive rows share the same memory region.
	offset &= 0xffdf;

	m_colorram[offset] = data;
	m_colorram[offset + 0x20] = data;

	m_bg_tilemap->mark_tile_dirty(offset);
	m_bg_tilemap->mark_tile_dirty(offset + 0x20);'};
MERGE (n:KG {id: 'map:seicross_state.main_map/range7'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).portr("IN0")', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 355, sourceColumn: 2, sourceEndLine: 355, portRead: 'IN0'};
MERGE (n:KG {id: 'map:seicross_state.main_map/range8'}) SET n:AddressRange SET n += {start: 43008, end: 43008, raw: 'map(0xa800, 0xa800).portr("IN1")', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 356, sourceColumn: 2, sourceEndLine: 356, portRead: 'IN1'};
MERGE (n:KG {id: 'map:seicross_state.main_map/range9'}) SET n:AddressRange SET n += {start: 45056, end: 45056, raw: 'map(0xb000, 0xb000).portr("TEST")', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 357, sourceColumn: 2, sourceEndLine: 357, portRead: 'TEST'};
MERGE (n:KG {id: 'map:seicross_state.main_map/range10'}) SET n:AddressRange SET n += {start: 47104, end: 47104, raw: 'map(0xb800, 0xb800).r("watchdog", FUNC(watchdog_timer_device::reset_r))', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 358, sourceColumn: 2, sourceEndLine: 358};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_r'}) SET n:Handler SET n += {method: 'reset_r', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 358, sourceColumn: 2, sourceEndLine: 358};
MERGE (n:KG {id: 'map:seicross_state.main_portmap'}) SET n:AddressMap SET n += {cls: 'seicross_state', name: 'main_portmap', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 361, sourceColumn: 1, sourceEndLine: 366, globalMask: 255};
MERGE (n:KG {id: 'map:seicross_state.main_portmap/range0'}) SET n:AddressRange SET n += {start: 0, end: 1, raw: 'map(0x00, 0x01).mirror(0x08).w("aysnd", FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 364, sourceColumn: 2, sourceEndLine: 364, mirror: 8};
MERGE (n:KG {id: 'handler:ay8910_device.address_data_w'}) SET n:Handler SET n += {method: 'address_data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 364, sourceColumn: 2, sourceEndLine: 364};
MERGE (n:KG {id: 'map:seicross_state.main_portmap/range1'}) SET n:AddressRange SET n += {start: 4, end: 4, raw: 'map(0x04, 0x04).mirror(0x08).r("aysnd", FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 365, sourceColumn: 2, sourceEndLine: 365, mirror: 8};
MERGE (n:KG {id: 'handler:ay8910_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay8910_device', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 365, sourceColumn: 2, sourceEndLine: 365};
MERGE (n:KG {id: 'map:seicross_state.mcu_nvram_map'}) SET n:AddressMap SET n += {cls: 'seicross_state', name: 'mcu_nvram_map', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 369, sourceColumn: 1, sourceEndLine: 375};
MERGE (n:KG {id: 'map:seicross_state.mcu_nvram_map/range0'}) SET n:AddressRange SET n += {start: 4096, end: 4351, raw: 'map(0x1000, 0x10ff).ram().share("nvram")', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 371, sourceColumn: 2, sourceEndLine: 371, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:seicross_state.mcu_nvram_map/range1'}) SET n:AddressRange SET n += {start: 8192, end: 8192, raw: 'map(0x2000, 0x2000).w(FUNC(seicross_state::dac_w))', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 372, sourceColumn: 2, sourceEndLine: 372};
MERGE (n:KG {id: 'handler:seicross_state.dac_w'}) SET n:Handler SET n += {method: 'dac_w', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 341, sourceColumn: 1, sourceEndLine: 344, sourceParameters: 'uint8_t data', sourceBody: 'm_dac->write(data >> 4);'};
MERGE (n:KG {id: 'map:seicross_state.mcu_nvram_map/range2'}) SET n:AddressRange SET n += {start: 32768, end: 63487, raw: 'map(0x8000, 0xf7ff).rom().region("maincpu", 0)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 373, sourceColumn: 2, sourceEndLine: 373, rom: true, region: 'maincpu', regionOffset: 0};
MERGE (n:KG {id: 'map:seicross_state.mcu_nvram_map/range3'}) SET n:AddressRange SET n += {start: 63488, end: 65535, raw: 'map(0xf800, 0xffff).ram().share(m_sharedram)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 374, sourceColumn: 2, sourceEndLine: 374, ram: true, share: 'sharedram'};
MERGE (n:KG {id: 'map:seicross_state.mcu_no_nvram_map'}) SET n:AddressMap SET n += {cls: 'seicross_state', name: 'mcu_no_nvram_map', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 377, sourceColumn: 1, sourceEndLine: 385};
MERGE (n:KG {id: 'map:seicross_state.mcu_no_nvram_map/range0'}) SET n:AddressRange SET n += {start: 4099, end: 4099, raw: 'map(0x1003, 0x1003).portr("DSW1")', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 379, sourceColumn: 2, sourceEndLine: 379, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:seicross_state.mcu_no_nvram_map/range1'}) SET n:AddressRange SET n += {start: 4101, end: 4101, raw: 'map(0x1005, 0x1005).portr("DSW2")', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 380, sourceColumn: 2, sourceEndLine: 380, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:seicross_state.mcu_no_nvram_map/range2'}) SET n:AddressRange SET n += {start: 4102, end: 4102, raw: 'map(0x1006, 0x1006).portr("DSW3")', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 381, sourceColumn: 2, sourceEndLine: 381, portRead: 'DSW3'};
MERGE (n:KG {id: 'map:seicross_state.mcu_no_nvram_map/range3'}) SET n:AddressRange SET n += {start: 8192, end: 8192, raw: 'map(0x2000, 0x2000).w(FUNC(seicross_state::dac_w))', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 382, sourceColumn: 2, sourceEndLine: 382};
MERGE (n:KG {id: 'map:seicross_state.mcu_no_nvram_map/range4'}) SET n:AddressRange SET n += {start: 32768, end: 63487, raw: 'map(0x8000, 0xf7ff).rom().region("maincpu", 0)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 383, sourceColumn: 2, sourceEndLine: 383, rom: true, region: 'maincpu', regionOffset: 0};
MERGE (n:KG {id: 'map:seicross_state.mcu_no_nvram_map/range5'}) SET n:AddressRange SET n += {start: 63488, end: 65535, raw: 'map(0xf800, 0xffff).ram().share(m_sharedram)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 384, sourceColumn: 2, sourceEndLine: 384, ram: true, share: 'sharedram'};
MERGE (n:KG {id: 'machine:seicross_state.no_nvram'}) SET n:MachineConfig SET n += {cls: 'seicross_state', name: 'no_nvram', calls: [], resetHandlers: ['seicross_state.machine_reset'], startHandlers: ['seicross_state.video_start'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 621, sourceColumn: 1, sourceEndLine: 654};
MERGE (n:KG {id: 'handler:seicross_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 183, sourceColumn: 1, sourceEndLine: 187, sourceParameters: '', sourceBody: '// start with the protection MCU halted
	m_mcu->set_input_line(INPUT_LINE_HALT, ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:seicross_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 262, sourceColumn: 1, sourceEndLine: 267, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(seicross_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);
	m_bg_tilemap->set_transparent_pen(0);
	m_bg_tilemap->set_scroll_cols(32);'};
MERGE (n:KG {id: 'handler:seicross_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 253, sourceColumn: 1, sourceEndLine: 260, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int const code = m_videoram[tile_index] + ((m_colorram[tile_index] & 0x10) << 4);
	int const color = m_colorram[tile_index] & 0x0f;
	int const flags = ((m_colorram[tile_index] & 0x40) ? TILE_FLIPX : 0) | ((m_colorram[tile_index] & 0x80) ? TILE_FLIPY : 0);

	tileinfo.set(0, code, color, flags);'};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, 18.432_MHz_XTAL / 6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &seicross_state::main_map)', 'm_maincpu->set_addrmap(AS_IO, &seicross_state::main_portmap)', 'm_maincpu->set_vblank_int("screen", FUNC(seicross_state::vblank_irq))'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 624, sourceColumn: 2, sourceEndLine: 624};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(seicross_state::vblank_irq))', ownerTag: 'maincpu', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 627, sourceColumn: 2, sourceEndLine: 627, targetTag: 'screen', targetClass: 'seicross_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:seicross_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 614, sourceColumn: 1, sourceEndLine: 618, sourceParameters: 'device_t &device', sourceBody: 'if (m_irq_mask)
		device.execute().set_input_line(0, HOLD_LINE);'};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/mcu'}) SET n:Device SET n += {type: 'NSC8105', tag: 'mcu', clock: 3072000, config: ['NSC8105(config, m_mcu, 18.432_MHz_XTAL / 6)', 'm_mcu->set_addrmap(AS_PROGRAM, &seicross_state::mcu_no_nvram_map)'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 629, sourceColumn: 2, sourceEndLine: 629};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 634, sourceColumn: 2, sourceEndLine: 634};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(18.432_MHz_XTAL / 3, 384, 0, 256, 264, 16, 240)', 'screen.set_screen_update(FUNC(seicross_state::screen_update))', 'screen.set_palette(m_palette)'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 637, sourceColumn: 2, sourceEndLine: 637, configCalls: ['set_raw(6144000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 256, 264, 16, 240]};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(seicross_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 639, sourceColumn: 2, sourceEndLine: 639, targetClass: 'seicross_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:seicross_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 299, sourceColumn: 1, sourceEndLine: 309, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'bitmap.fill(0, cliprect);

	for (int col = 0; col < 32; col++)
		m_bg_tilemap->set_scrolly(col, m_row_scroll[col]);

	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:seicross_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 269, sourceColumn: 1, sourceEndLine: 297, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'for (int bank = 0; bank < 2; bank++)
	{
		for (int offs = m_spriteram[bank].bytes() - 4; offs >= 0; offs -= 4)
		{
			uint8_t const *data = &m_spriteram[bank][offs];
			int const code = (data[0] & 0x3f) | ((data[1] & 0x10) << 2) | (bank ? 0 : 0x80);
			int const color = data[1] & 0x0f;
			int flipx = BIT(data[0], 6);
			int flipy = BIT(data[0], 7);
			int sx = data[3];
			int sy = 240 - data[2];

			if (flip_screen())
			{
				sx = 240 - sx;
				sy = 240 - sy;
				flipx = !flipx;
				flipy = !flipy;
			}

			m_gfxdecode->gfx(1)->transpen(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0);

			const int dx = flip_screen() ? +256 : -256;
			m_gfxdecode->gfx(1)->transpen(bitmap, cliprect, code, color, flipx, flipy, sx + dx, sy, 0);
		}
	}'};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_seicross)'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 642, sourceColumn: 2, sourceEndLine: 642, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(seicross_state::palette), 64)'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 643, sourceColumn: 2, sourceEndLine: 643, clockExpr: 'FUNC(seicross_state::palette)'};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 646, sourceColumn: 2, sourceEndLine: 646};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/aysnd'}) SET n:Device SET n += {type: 'AY8910', tag: 'aysnd', clock: 1536000, config: ['ay8910_device &aysnd(AY8910(config, "aysnd", 18.432_MHz_XTAL / 12))', 'aysnd.port_b_read_callback().set(FUNC(seicross_state::portb_r))', 'aysnd.port_b_write_callback().set(FUNC(seicross_state::portb_w))', 'aysnd.add_route(ALL_OUTPUTS, "speaker", 0.25)'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 648, sourceColumn: 2, sourceEndLine: 648};
MERGE (n:KG {id: 'audioroute:device:seicross_state.no_nvram/aysnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.25, raw: 'aysnd.add_route(ALL_OUTPUTS, "speaker", 0.25)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 651, sourceColumn: 2, sourceEndLine: 651};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/aysnd/callback:aysnd:0'}) SET n:Callback SET n += {signal: 'port_b_read_callback', operation: 'set', raw: 'aysnd.port_b_read_callback().set(FUNC(seicross_state::portb_r))', ownerTag: 'aysnd', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 649, sourceColumn: 2, sourceEndLine: 649, targetClass: 'seicross_state', targetMethod: 'portb_r'};
MERGE (n:KG {id: 'handler:seicross_state.portb_r'}) SET n:Handler SET n += {method: 'portb_r', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 313, sourceColumn: 1, sourceEndLine: 316, sourceParameters: '', sourceBody: 'return (m_portb & 0x0f) | (m_debug_port.read_safe(0) & 0xf0);', inputMembers: ['m_debug_port=DEBUG']};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/aysnd/callback:aysnd:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'aysnd.port_b_write_callback().set(FUNC(seicross_state::portb_w))', ownerTag: 'aysnd', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 650, sourceColumn: 2, sourceEndLine: 650, targetClass: 'seicross_state', targetMethod: 'portb_w'};
MERGE (n:KG {id: 'handler:seicross_state.portb_w'}) SET n:Handler SET n += {method: 'portb_w', ownerClass: 'seicross_state', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 318, sourceColumn: 1, sourceEndLine: 339, sourceParameters: 'offs_t offset, uint8_t data, uint8_t mem_mask', sourceBody: '// ignore if high-impedance (seicross relies on it)
	if (mem_mask == 0)
		return;

	// bit 0 is IRQ enable
	m_irq_mask = data & 1;

	// bit 1 flips screen
	flip_screen_set(data & 2);

	// bit 2 resets the microcontroller
	if (((m_portb & 4) == 0) && (data & 4))
	{
		m_mcu->pulse_input_line(INPUT_LINE_RESET, attotime::zero);
		m_mcu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);
	}

	// other bits unused
	m_portb = data;'};
MERGE (n:KG {id: 'device:seicross_state.no_nvram/dac'}) SET n:Device SET n += {type: 'DAC_4BIT_R2R', tag: 'dac', clock: 0, config: ['DAC_4BIT_R2R(config, m_dac, 0).add_route(ALL_OUTPUTS, "speaker", 0.12)'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 653, sourceColumn: 2, sourceEndLine: 653};
MERGE (n:KG {id: 'audioroute:device:seicross_state.no_nvram/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.12, raw: 'DAC_4BIT_R2R(config, m_dac, 0).add_route(ALL_OUTPUTS, "speaker", 0.12)', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 653, sourceColumn: 2, sourceEndLine: 653};
MERGE (n:KG {id: 'machine:seicross_state.nvram'}) SET n:MachineConfig SET n += {cls: 'seicross_state', name: 'nvram', calls: ['no_nvram'], resetHandlers: ['seicross_state.machine_reset'], startHandlers: ['seicross_state.video_start'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 657, sourceColumn: 1, sourceEndLine: 665};
MERGE (n:KG {id: 'device:seicross_state.nvram/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram").set_custom_handler(FUNC(seicross_state::nvram_init))'], sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 664, sourceColumn: 2, sourceEndLine: 664};
MERGE (n:KG {id: 'inputs:friskyt'}) SET n:InputPorts SET n += {name: 'friskyt', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 388, sourceColumn: 8, sourceEndLine: 388};
MERGE (n:KG {id: 'inputs:friskyt/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:friskyt/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:friskyt/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:friskyt/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:friskyt/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:friskyt/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:friskyt/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:friskyt/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:friskyt/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:friskyt/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:friskyt/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:friskyt/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:friskyt/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:friskyt/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:friskyt/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_SERVICE1'};
MERGE (n:KG {id: 'inputs:friskyt/IN1/f5'}) SET n:PortField SET n += {kind: 'service', mask: 32, activeLow: false, defaultValue: 0};
MERGE (n:KG {id: 'inputs:friskyt/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:friskyt/IN1/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Counter Check', defaultValue: 0, settings: ['0=Off', '128=On']};
MERGE (n:KG {id: 'inputs:friskyt/TEST'}) SET n:Port SET n += {tag: 'TEST', modify: false};
MERGE (n:KG {id: 'inputs:friskyt/TEST/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Test Mode', defaultValue: 0, settings: ['0=Off', '1=On']};
MERGE (n:KG {id: 'inputs:friskyt/TEST/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Connection Error', defaultValue: 0, settings: ['0=Off', '2=On']};
MERGE (n:KG {id: 'inputs:friskyt/TEST/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 252, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 512, planes: 2, planeOffsets: [0, 4], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 256, planes: 2, planeOffsets: [0, 4], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11, 128, 129, 130, 131, 136, 137, 138, 139], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112, 256, 272, 288, 304, 320, 336, 352, 368], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_seicross'}) SET n:GfxDecode SET n += {name: 'gfx_seicross', sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 608, sourceColumn: 8, sourceEndLine: 608};
MERGE (n:KG {id: 'gfxdecode:gfx_seicross/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_seicross/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx', offset: 0, layout: 'spritelayout', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:friskyt'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 936, sourceColumn: 1, sourceEndLine: 936};
MATCH (a:KG {id: 'game:friskyt'}), (b:KG {id: 'machine:seicross_state.nvram'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:friskyt'}), (b:KG {id: 'inputs:friskyt'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:friskyt'}), (b:KG {id: 'romset:friskyt'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:cpu/m6800/m6800.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:seicross_state.nvram'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 657, sourceColumn: 1, sourceEndLine: 665};
MATCH (a:KG {id: 'machine:seicross_state.nvram'}), (b:KG {id: 'handler:seicross_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:seicross_state.nvram'}), (b:KG {id: 'handler:seicross_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:seicross_state.nvram'}), (b:KG {id: 'machine:seicross_state.no_nvram'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:seicross_state.nvram'}), (b:KG {id: 'map:seicross_state.mcu_nvram_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'mcu'};
MATCH (a:KG {id: 'machine:seicross_state.nvram'}), (b:KG {id: 'device:seicross_state.nvram/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:friskyt'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 388, sourceColumn: 8, sourceEndLine: 388};
MATCH (a:KG {id: 'inputs:friskyt'}), (b:KG {id: 'inputs:friskyt/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:friskyt'}), (b:KG {id: 'inputs:friskyt/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:friskyt'}), (b:KG {id: 'inputs:friskyt/TEST'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:friskyt'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 685, sourceColumn: 1, sourceEndLine: 685};
MATCH (a:KG {id: 'romset:friskyt'}), (b:KG {id: 'region:friskyt/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:friskyt'}), (b:KG {id: 'region:friskyt/gfx'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:friskyt'}), (b:KG {id: 'region:friskyt/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:seicross_state.video_start'}), (b:KG {id: 'handler:seicross_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 621, sourceColumn: 1, sourceEndLine: 654};
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'handler:seicross_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'handler:seicross_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'device:seicross_state.no_nvram/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'device:seicross_state.no_nvram/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'device:seicross_state.no_nvram/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'device:seicross_state.no_nvram/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'device:seicross_state.no_nvram/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'gfxdecode:gfx_seicross'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'device:seicross_state.no_nvram/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'device:seicross_state.no_nvram/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'device:seicross_state.no_nvram/aysnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:seicross_state.no_nvram'}), (b:KG {id: 'device:seicross_state.no_nvram/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_nvram_map'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 369, sourceColumn: 1, sourceEndLine: 375};
MATCH (a:KG {id: 'map:seicross_state.mcu_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_nvram_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_nvram_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_nvram_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_nvram_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN0'}), (b:KG {id: 'inputs:friskyt/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN0'}), (b:KG {id: 'inputs:friskyt/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN0'}), (b:KG {id: 'inputs:friskyt/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN0'}), (b:KG {id: 'inputs:friskyt/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN0'}), (b:KG {id: 'inputs:friskyt/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN0'}), (b:KG {id: 'inputs:friskyt/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN0'}), (b:KG {id: 'inputs:friskyt/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN0'}), (b:KG {id: 'inputs:friskyt/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN1'}), (b:KG {id: 'inputs:friskyt/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN1'}), (b:KG {id: 'inputs:friskyt/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN1'}), (b:KG {id: 'inputs:friskyt/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN1'}), (b:KG {id: 'inputs:friskyt/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN1'}), (b:KG {id: 'inputs:friskyt/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN1'}), (b:KG {id: 'inputs:friskyt/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN1'}), (b:KG {id: 'inputs:friskyt/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/IN1'}), (b:KG {id: 'inputs:friskyt/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/TEST'}), (b:KG {id: 'inputs:friskyt/TEST/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/TEST'}), (b:KG {id: 'inputs:friskyt/TEST/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:friskyt/TEST'}), (b:KG {id: 'inputs:friskyt/TEST/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:friskyt/maincpu'}), (b:KG {id: 'rom:friskyt/maincpu/ftom.01'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/maincpu'}), (b:KG {id: 'rom:friskyt/maincpu/ftom.02'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/maincpu'}), (b:KG {id: 'rom:friskyt/maincpu/ftom.03'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/maincpu'}), (b:KG {id: 'rom:friskyt/maincpu/ftom.04'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/maincpu'}), (b:KG {id: 'rom:friskyt/maincpu/ftom.05'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/maincpu'}), (b:KG {id: 'rom:friskyt/maincpu/ftom.06'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/maincpu'}), (b:KG {id: 'rom:friskyt/maincpu/ftom.07'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/maincpu'}), (b:KG {id: 'rom:friskyt/maincpu/ft8_8.rom'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/gfx'}), (b:KG {id: 'rom:friskyt/gfx/ftom.11'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/gfx'}), (b:KG {id: 'rom:friskyt/gfx/ftom.12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/gfx'}), (b:KG {id: 'rom:friskyt/gfx/ftom.09'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/gfx'}), (b:KG {id: 'rom:friskyt/gfx/ftom.10'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/proms'}), (b:KG {id: 'rom:friskyt/proms/ft.9c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:friskyt/proms'}), (b:KG {id: 'rom:friskyt/proms/ft.9b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/maincpu'}), (b:KG {id: 'device:seicross_state.no_nvram/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/maincpu'}), (b:KG {id: 'map:seicross_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:seicross_state.no_nvram/maincpu'}), (b:KG {id: 'map:seicross_state.main_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:seicross_state.no_nvram/mcu'}), (b:KG {id: 'map:seicross_state.mcu_no_nvram_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:seicross_state.no_nvram/screen'}), (b:KG {id: 'device:seicross_state.no_nvram/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_seicross'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 608, sourceColumn: 8, sourceEndLine: 608};
MATCH (a:KG {id: 'gfxdecode:gfx_seicross'}), (b:KG {id: 'gfxdecode:gfx_seicross/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_seicross'}), (b:KG {id: 'gfxdecode:gfx_seicross/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/aysnd'}), (b:KG {id: 'audioroute:device:seicross_state.no_nvram/aysnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/aysnd'}), (b:KG {id: 'device:seicross_state.no_nvram/aysnd/callback:aysnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/aysnd'}), (b:KG {id: 'device:seicross_state.no_nvram/aysnd/callback:aysnd:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/dac'}), (b:KG {id: 'audioroute:device:seicross_state.no_nvram/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_nvram_map/range1'}), (b:KG {id: 'handler:seicross_state.dac_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:seicross_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 346, sourceColumn: 1, sourceEndLine: 359};
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map'}), (b:KG {id: 'map:seicross_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_portmap'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 361, sourceColumn: 1, sourceEndLine: 366};
MATCH (a:KG {id: 'map:seicross_state.main_portmap'}), (b:KG {id: 'map:seicross_state.main_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_portmap'}), (b:KG {id: 'map:seicross_state.main_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_no_nvram_map'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nichibutsu/seicross.cpp', sourceLine: 377, sourceColumn: 1, sourceEndLine: 385};
MATCH (a:KG {id: 'map:seicross_state.mcu_no_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_no_nvram_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_no_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_no_nvram_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_no_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_no_nvram_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_no_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_no_nvram_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_no_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_no_nvram_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:seicross_state.mcu_no_nvram_map'}), (b:KG {id: 'map:seicross_state.mcu_no_nvram_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/screen/callback:screen:0'}), (b:KG {id: 'handler:seicross_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_seicross/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_seicross/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/aysnd/callback:aysnd:0'}), (b:KG {id: 'handler:seicross_state.portb_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:seicross_state.no_nvram/aysnd/callback:aysnd:1'}), (b:KG {id: 'handler:seicross_state.portb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map/range3'}), (b:KG {id: 'handler:seicross_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map/range6'}), (b:KG {id: 'handler:seicross_state.colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:seicross_state.main_map/range10'}), (b:KG {id: 'handler:watchdog_timer_device.reset_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:seicross_state.main_portmap/range0'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'aysnd'};
MATCH (a:KG {id: 'map:seicross_state.main_portmap/range1'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'aysnd'};
MATCH (a:KG {id: 'map:seicross_state.mcu_no_nvram_map/range3'}), (b:KG {id: 'handler:seicross_state.dac_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:seicross_state.screen_update'}), (b:KG {id: 'handler:seicross_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/nichibutsu/seicross.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
