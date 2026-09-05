// mamekit knowledge graph — driver src/mame/konami/pooyan.cpp
// generated 2026-09-05T03:49:57.424Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/konami/pooyan.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/konami/pooyan.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:konamipt.h'}) SET n:SourceFile SET n += {path: 'konamipt.h', external: true};
MERGE (n:KG {id: 'file:timeplt_a.h'}) SET n:SourceFile SET n += {path: 'timeplt_a.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/shared/timeplt_a.cpp'};
MERGE (n:KG {id: 'game:pooyan'}) SET n:Game SET n += {name: 'pooyan', year: '1982', company: 'Konami', fullname: 'Pooyan', monitor: 'ROT90', cls: 'pooyan_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 544, sourceColumn: 1, sourceEndLine: 544};
MERGE (n:KG {id: 'romset:pooyan'}) SET n:RomSet SET n += {name: 'pooyan', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 459, sourceColumn: 1, sourceEndLine: 459};
MERGE (n:KG {id: 'region:pooyan/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 460, sourceColumn: 2, sourceEndLine: 460};
MERGE (n:KG {id: 'rom:pooyan/maincpu/1.4a'}) SET n:Rom SET n += {file: '1.4a', offset: 0, size: 8192, crc: 'bb319c63', sha1: '5401b8ef586127c8cf5a431e5c44e38be2254a98', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 461, sourceColumn: 2, sourceEndLine: 461};
MERGE (n:KG {id: 'rom:pooyan/maincpu/2.5a'}) SET n:Rom SET n += {file: '2.5a', offset: 8192, size: 8192, crc: 'a1463d98', sha1: 'b23cc7e61276c61a78e80fe08c7f0c8adadf2ffe', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 462, sourceColumn: 2, sourceEndLine: 462};
MERGE (n:KG {id: 'rom:pooyan/maincpu/3.6a'}) SET n:Rom SET n += {file: '3.6a', offset: 16384, size: 8192, crc: 'fe1a9e08', sha1: '5206893760f188ac71a5e6bd42561cf25fcc3d49', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 463, sourceColumn: 2, sourceEndLine: 463};
MERGE (n:KG {id: 'rom:pooyan/maincpu/4.7a'}) SET n:Rom SET n += {file: '4.7a', offset: 24576, size: 8192, crc: '9e0f9bcc', sha1: '4d9707423ad531ac535db432e329b3d52cbb4559', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 464, sourceColumn: 2, sourceEndLine: 464};
MERGE (n:KG {id: 'region:pooyan/timeplt_audio:tpsound'}) SET n:RomRegion SET n += {tag: 'timeplt_audio:tpsound', size: 65536, flags: '0', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 466, sourceColumn: 2, sourceEndLine: 466};
MERGE (n:KG {id: 'rom:pooyan/timeplt_audio:tpsound/xx.7a'}) SET n:Rom SET n += {file: 'xx.7a', offset: 0, size: 4096, crc: 'fbe2b368', sha1: '5689a84ef110bdc0039ad1a6c5778e0b8eccfce0', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 467, sourceColumn: 2, sourceEndLine: 467};
MERGE (n:KG {id: 'rom:pooyan/timeplt_audio:tpsound/xx.8a'}) SET n:Rom SET n += {file: 'xx.8a', offset: 4096, size: 4096, crc: 'e1795b3d', sha1: '9ab4e5362f9f7d9b46b750e14b1d9d71c57be40f', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 468, sourceColumn: 2, sourceEndLine: 468};
MERGE (n:KG {id: 'region:pooyan/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 8192, flags: '0', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 470, sourceColumn: 2, sourceEndLine: 470};
MERGE (n:KG {id: 'rom:pooyan/tiles/8.10g'}) SET n:Rom SET n += {file: '8.10g', offset: 0, size: 4096, crc: '931b29eb', sha1: '0325c1c1fdb44e0044b82b7c79b5eeabf5c11ce7', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 471, sourceColumn: 2, sourceEndLine: 471};
MERGE (n:KG {id: 'rom:pooyan/tiles/7.9g'}) SET n:Rom SET n += {file: '7.9g', offset: 4096, size: 4096, crc: 'bbe6d6e4', sha1: 'de5447d59a99c4c08c4f40c0b7dd3c3c609c11d4', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 472, sourceColumn: 2, sourceEndLine: 472};
MERGE (n:KG {id: 'region:pooyan/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 8192, flags: '0', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 474, sourceColumn: 2, sourceEndLine: 474};
MERGE (n:KG {id: 'rom:pooyan/sprites/6.9a'}) SET n:Rom SET n += {file: '6.9a', offset: 0, size: 4096, crc: 'b2d8c121', sha1: '189ad488869f34d7a38b82ef70eb805acfe04312', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 475, sourceColumn: 2, sourceEndLine: 475};
MERGE (n:KG {id: 'rom:pooyan/sprites/5.8a'}) SET n:Rom SET n += {file: '5.8a', offset: 4096, size: 4096, crc: '1097c2b6', sha1: 'c815f0d27593efd23923511bdd13835456ef7f76', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 476, sourceColumn: 2, sourceEndLine: 476};
MERGE (n:KG {id: 'region:pooyan/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 544, flags: '0', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 478, sourceColumn: 2, sourceEndLine: 478};
MERGE (n:KG {id: 'rom:pooyan/proms/pooyan.pr1'}) SET n:Rom SET n += {file: 'pooyan.pr1', offset: 0, size: 32, crc: 'a06a6d0e', sha1: 'ae131320b66d76d4bc9108da6708f6f874b2e123', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 479, sourceColumn: 2, sourceEndLine: 479};
MERGE (n:KG {id: 'rom:pooyan/proms/pooyan.pr3'}) SET n:Rom SET n += {file: 'pooyan.pr3', offset: 32, size: 256, crc: '8cd4cd60', sha1: 'e0188ecd5b53a8e6e28c1de80def676740772334', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 480, sourceColumn: 2, sourceEndLine: 480};
MERGE (n:KG {id: 'rom:pooyan/proms/pooyan.pr2'}) SET n:Rom SET n += {file: 'pooyan.pr2', offset: 288, size: 256, crc: '82748c0b', sha1: '9ce8eb92e482eba5a9077e9db99841d65b011346', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 481, sourceColumn: 2, sourceEndLine: 481};
MERGE (n:KG {id: 'map:pooyan_state.main_map'}) SET n:AddressMap SET n += {cls: 'pooyan_state', name: 'main_map', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 308};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 294, sourceColumn: 2, sourceEndLine: 294, rom: true};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 33791, raw: 'map(0x8000, 0x83ff).ram().w(FUNC(pooyan_state::colorram_w)).share(m_colorram)', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 295, sourceColumn: 2, sourceEndLine: 295, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:pooyan_state.colorram_w'}) SET n:Handler SET n += {method: 'colorram_w', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 207, sourceColumn: 1, sourceEndLine: 211, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range2'}) SET n:AddressRange SET n += {start: 33792, end: 34815, raw: 'map(0x8400, 0x87ff).ram().w(FUNC(pooyan_state::videoram_w)).share(m_videoram)', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 296, sourceColumn: 2, sourceEndLine: 296, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:pooyan_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 200, sourceColumn: 1, sourceEndLine: 204, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range3'}) SET n:AddressRange SET n += {start: 34816, end: 36863, raw: 'map(0x8800, 0x8fff).ram()', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 297, sourceColumn: 2, sourceEndLine: 297, ram: true};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range4'}) SET n:AddressRange SET n += {start: 36864, end: 37119, raw: 'map(0x9000, 0x90ff).mirror(0x0b00).ram().share(m_spriteram[0])', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 298, sourceColumn: 2, sourceEndLine: 298, mirror: 2816, ram: true, share: 'spriteram[0]'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range5'}) SET n:AddressRange SET n += {start: 37888, end: 38143, raw: 'map(0x9400, 0x94ff).mirror(0x0b00).ram().share(m_spriteram[1])', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 299, sourceColumn: 2, sourceEndLine: 299, mirror: 2816, ram: true, share: 'spriteram[1]'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range6'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).mirror(0x5e7f).portr("DSW1")', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 300, sourceColumn: 2, sourceEndLine: 300, mirror: 24191, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range7'}) SET n:AddressRange SET n += {start: 41088, end: 41088, raw: 'map(0xa080, 0xa080).mirror(0x5e1f).portr("IN0")', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 301, sourceColumn: 2, sourceEndLine: 301, mirror: 24095, portRead: 'IN0'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range8'}) SET n:AddressRange SET n += {start: 41120, end: 41120, raw: 'map(0xa0a0, 0xa0a0).mirror(0x5e1f).portr("IN1")', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 302, sourceColumn: 2, sourceEndLine: 302, mirror: 24095, portRead: 'IN1'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range9'}) SET n:AddressRange SET n += {start: 41152, end: 41152, raw: 'map(0xa0c0, 0xa0c0).mirror(0x5e1f).portr("IN2")', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 303, sourceColumn: 2, sourceEndLine: 303, mirror: 24095, portRead: 'IN2'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range10'}) SET n:AddressRange SET n += {start: 41184, end: 41184, raw: 'map(0xa0e0, 0xa0e0).mirror(0x5e1f).portr("DSW0")', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 304, sourceColumn: 2, sourceEndLine: 304, mirror: 24095, portRead: 'DSW0'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range11'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).mirror(0x5e7f).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 305, sourceColumn: 2, sourceEndLine: 305, mirror: 24191};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 305, sourceColumn: 2, sourceEndLine: 305};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range12'}) SET n:AddressRange SET n += {start: 41216, end: 41216, raw: 'map(0xa100, 0xa100).mirror(0x5e7f).w("timeplt_audio", FUNC(timeplt_audio_device::sound_data_w))', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 306, sourceColumn: 2, sourceEndLine: 306, mirror: 24191};
MERGE (n:KG {id: 'handler:timeplt_audio_device.sound_data_w'}) SET n:Handler SET n += {method: 'sound_data_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'uint8_t data', sourceBody: 'm_soundlatch->write(data);'};
MERGE (n:KG {id: 'map:pooyan_state.main_map/range13'}) SET n:AddressRange SET n += {start: 41344, end: 41351, raw: 'map(0xa180, 0xa187).mirror(0x5e78).w("mainlatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 307, sourceColumn: 2, sourceEndLine: 307, mirror: 24184};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 307, sourceColumn: 2, sourceEndLine: 307};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}) SET n:AddressMap SET n += {cls: 'timeplt_audio_device', name: 'timeplt_sound_map', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 159, sourceColumn: 1, sourceEndLine: 168};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 12287, raw: 'map(0x0000, 0x2fff).rom()', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 161, sourceColumn: 2, sourceEndLine: 161, rom: true};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range1'}) SET n:AddressRange SET n += {start: 12288, end: 13311, raw: 'map(0x3000, 0x33ff).mirror(0x0c00).ram()', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 162, sourceColumn: 2, sourceEndLine: 162, mirror: 3072, ram: true};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}) SET n:AddressRange SET n += {start: 16384, end: 16384, raw: 'map(0x4000, 0x4000).mirror(0x0fff).rw("ay1", FUNC(ay8910_device::data_r), FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 163, sourceColumn: 2, sourceEndLine: 163, mirror: 4095};
MERGE (n:KG {id: 'handler:ay8910_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay8910_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178};
MERGE (n:KG {id: 'handler:ay8910_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range3'}) SET n:AddressRange SET n += {start: 20480, end: 20480, raw: 'map(0x5000, 0x5000).mirror(0x0fff).w("ay1", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 164, sourceColumn: 2, sourceEndLine: 164, mirror: 4095};
MERGE (n:KG {id: 'handler:ay8910_device.address_w'}) SET n:Handler SET n += {method: 'address_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 179, sourceColumn: 2, sourceEndLine: 179};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).mirror(0x0fff).rw("ay2", FUNC(ay8910_device::data_r), FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 165, sourceColumn: 2, sourceEndLine: 165, mirror: 4095};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range5'}) SET n:AddressRange SET n += {start: 28672, end: 28672, raw: 'map(0x7000, 0x7000).mirror(0x0fff).w("ay2", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 166, sourceColumn: 2, sourceEndLine: 166, mirror: 4095};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range6'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).w(FUNC(timeplt_audio_device::filter_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 167, sourceColumn: 2, sourceEndLine: 167};
MERGE (n:KG {id: 'handler:timeplt_audio_device.filter_w'}) SET n:Handler SET n += {method: 'filter_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 109, sourceColumn: 1, sourceEndLine: 117, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'set_filter(1, 0, (offset >>  0) & 3);
	set_filter(1, 1, (offset >>  2) & 3);
	set_filter(1, 2, (offset >>  4) & 3);
	set_filter(0, 0, (offset >>  6) & 3);
	set_filter(0, 1, (offset >>  8) & 3);
	set_filter(0, 2, (offset >> 10) & 3);'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.set_filter'}) SET n:Handler SET n += {method: 'set_filter', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 96, sourceColumn: 1, sourceEndLine: 106, sourceConstants: ['LOWPASS_3R=0'], sourceParameters: 'int no, int ch, int data', sourceBody: 'int C = 0;

	if (BIT(data, 0))
		C += 220000;    /* 220000pF = 0.220uF */
	if (BIT(data, 1))
		C +=  47000;    /*  47000pF = 0.047uF */

	m_filter[no][ch]->filter_rc_set_RC(filter_rc_device::LOWPASS_3R, 1000, 5100, 0, CAP_P(C));'};
MERGE (n:KG {id: 'machine:pooyan_state.pooyan'}) SET n:MachineConfig SET n += {cls: 'pooyan_state', name: 'pooyan', calls: [], stateMembers: ['{"name":"m_irq_enable","bits":8}'], startHandlers: ['pooyan_state.video_start'], sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 421, sourceColumn: 1, sourceEndLine: 450};
MERGE (n:KG {id: 'handler:pooyan_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 187, sourceColumn: 1, sourceEndLine: 190, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(pooyan_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);'};
MERGE (n:KG {id: 'handler:pooyan_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 169, sourceColumn: 1, sourceEndLine: 177, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int const attr = m_colorram[tile_index];
	int const code = m_videoram[tile_index];
	int const color = attr & 0x0f;
	int const flags = TILE_FLIPYX(attr >> 6);

	tileinfo.set(0, code, color, flags);'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, 18.432_MHz_XTAL / 3 / 2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &pooyan_state::main_map)'], sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 424, sourceColumn: 2, sourceEndLine: 424};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['ls259_device &mainlatch(LS259(config, "mainlatch"))', 'mainlatch.q_out_cb<0>().set(FUNC(pooyan_state::irq_enable_w))', 'mainlatch.q_out_cb<1>().set("timeplt_audio", FUNC(timeplt_audio_device::sh_irqtrigger_w))', 'mainlatch.q_out_cb<2>().set("timeplt_audio", FUNC(timeplt_audio_device::mute_w))', 'mainlatch.q_out_cb<3>().set(FUNC(pooyan_state::coin_counter_w<0>))', 'mainlatch.q_out_cb<4>().set(FUNC(pooyan_state::coin_counter_w<1>))', 'mainlatch.q_out_cb<5>().set_nop()', 'mainlatch.q_out_cb<7>().set(FUNC(pooyan_state::flip_screen_set)).invert()'], sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 427, sourceColumn: 2, sourceEndLine: 427};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<0>().set(FUNC(pooyan_state::irq_enable_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 428, sourceColumn: 2, sourceEndLine: 428, slot: '0', targetClass: 'pooyan_state', targetMethod: 'irq_enable_w'};
MERGE (n:KG {id: 'handler:pooyan_state.irq_enable_w'}) SET n:Handler SET n += {method: 'irq_enable_w', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 271, sourceColumn: 1, sourceEndLine: 276, sourceParameters: 'int state', sourceBody: 'm_irq_enable = state;
	if (!m_irq_enable)
		m_maincpu->set_input_line(INPUT_LINE_NMI, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<1>().set("timeplt_audio", FUNC(timeplt_audio_device::sh_irqtrigger_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 429, sourceColumn: 2, sourceEndLine: 429, slot: '1', targetTag: 'timeplt_audio', targetClass: 'timeplt_audio_device', targetMethod: 'sh_irqtrigger_w'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.sh_irqtrigger_w'}) SET n:Handler SET n += {method: 'sh_irqtrigger_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 133, sourceColumn: 1, sourceEndLine: 142, sourceParameters: 'int state', sourceBody: 'if (m_last_irq_state == 0 && state)
	{
		/* setting bit 0 low then high triggers IRQ on the sound CPU */
		m_soundcpu->set_input_line(0, HOLD_LINE); // Z80 IM1
	}

	m_last_irq_state = state;'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<2>().set("timeplt_audio", FUNC(timeplt_audio_device::mute_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 430, sourceColumn: 2, sourceEndLine: 430, slot: '2', targetTag: 'timeplt_audio', targetClass: 'timeplt_audio_device', targetMethod: 'mute_w'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.mute_w'}) SET n:Handler SET n += {method: 'mute_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 149, sourceParameters: 'int state', sourceBody: '// controls pin 6 (DC audio mute) of LA4460 amplifier
	machine().sound().system_mute(state);'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<3>().set(FUNC(pooyan_state::coin_counter_w<0>))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 431, sourceColumn: 2, sourceEndLine: 431, slot: '3', targetClass: 'pooyan_state', targetMethod: 'coin_counter_w_0'};
MERGE (n:KG {id: 'handler:pooyan_state.coin_counter_w_0'}) SET n:Handler SET n += {method: 'coin_counter_w_0', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 280, sourceColumn: 1, sourceEndLine: 283, sourceConstants: ['Which=0'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<4>().set(FUNC(pooyan_state::coin_counter_w<1>))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 432, sourceColumn: 2, sourceEndLine: 432, slot: '4', targetClass: 'pooyan_state', targetMethod: 'coin_counter_w_1'};
MERGE (n:KG {id: 'handler:pooyan_state.coin_counter_w_1'}) SET n:Handler SET n += {method: 'coin_counter_w_1', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 280, sourceColumn: 1, sourceEndLine: 283, sourceConstants: ['Which=1'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'mainlatch.q_out_cb<5>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 433, sourceColumn: 2, sourceEndLine: 433, slot: '5'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:6'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<7>().set(FUNC(pooyan_state::flip_screen_set)).invert()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 434, sourceColumn: 2, sourceEndLine: 434, slot: '7', transforms: ['invert'], targetClass: 'pooyan_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:pooyan_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 434, sourceColumn: 2, sourceEndLine: 434};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 436, sourceColumn: 2, sourceEndLine: 436};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(18.432_MHz_XTAL / 3, 384, 0, 256, 264, 16, 240)', 'screen.set_screen_update(FUNC(pooyan_state::screen_update))', 'screen.set_palette(m_palette)', 'screen.screen_vblank().set(FUNC(pooyan_state::vblank_irq))'], sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 439, sourceColumn: 2, sourceEndLine: 439, configCalls: ['set_raw(6144000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 256, 264, 16, 240], screenRawExpr: ['18.432_MHz_XTAL / 3', '384', '0', '256', '264', '16', '240']};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(pooyan_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 441, sourceColumn: 2, sourceEndLine: 441, targetClass: 'pooyan_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:pooyan_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 250, sourceColumn: 1, sourceEndLine: 255, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:pooyan_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 221, sourceColumn: 1, sourceEndLine: 240, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'for (int offs = 0x10; offs < 0x40; offs += 2)
	{
		int const sx = m_spriteram[0][offs];
		int const sy = 240 - m_spriteram[1][offs + 1];

		int const code = m_spriteram[0][offs + 1];
		int const color = m_spriteram[1][offs] & 0x0f;
		int const flipx = ~m_spriteram[1][offs] & 0x40;
		int const flipy = m_spriteram[1][offs] & 0x80;

		m_gfxdecode->gfx(1)->transmask(bitmap, cliprect,
			code,
			color,
			flipx, flipy,
			sx, sy,
			m_palette->transpen_mask(*m_gfxdecode->gfx(1), color, 0));
	}'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'screen.screen_vblank().set(FUNC(pooyan_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 443, sourceColumn: 2, sourceEndLine: 443, targetClass: 'pooyan_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:pooyan_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 264, sourceColumn: 1, sourceEndLine: 268, sourceParameters: 'int state', sourceBody: 'if (state && m_irq_enable)
		m_maincpu->set_input_line(INPUT_LINE_NMI, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_pooyan)'], sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 445, sourceColumn: 2, sourceEndLine: 445, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(pooyan_state::palette), 16*16+16*16, 32)'], sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 446, sourceColumn: 2, sourceEndLine: 446, clockExpr: 'FUNC(pooyan_state::palette)'};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/timeplt_audio'}) SET n:Device SET n += {type: 'TIMEPLT_AUDIO', tag: 'timeplt_audio', clock: 14318181, config: ['TIMEPLT_AUDIO(config, "timeplt_audio")'], cls: 'timeplt_audio_device', clsHierarchy: ['timeplt_audio_device'], sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 449, sourceColumn: 2, sourceEndLine: 449};
MERGE (n:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'timeplt_audio_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_last_irq_state","bits":8}'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 189, sourceColumn: 1, sourceEndLine: 217};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/tpsound'}) SET n:Device SET n += {type: 'Z80', tag: 'tpsound', clock: 1789772.625, config: ['Z80(config, m_soundcpu, DERIVED_CLOCK(1, 8))', 'm_soundcpu->set_addrmap(AS_PROGRAM, &timeplt_audio_device::timeplt_sound_map)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 192, sourceColumn: 2, sourceEndLine: 192};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()', 'for (required_device<filter_rc_device> &filter : m_filter[0])
		FILTER_RC(config, filter).add_route(ALL_OUTPUTS, "mono", 1.0)', 'for (required_device<filter_rc_device> &filter : m_filter[1])
		FILTER_RC(config, filter).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 196, sourceColumn: 2, sourceEndLine: 196};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 198, sourceColumn: 2, sourceEndLine: 198};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay1', clock: 1789772.625, config: ['ay8910_device &ay1(AY8910(config, "ay1", DERIVED_CLOCK(1, 8)))', 'ay1.port_a_read_callback().set(m_soundlatch, FUNC(generic_latch_8_device::read))', 'ay1.port_b_read_callback().set(FUNC(timeplt_audio_device::portB_r))', 'ay1.add_route(0, "filter.0.0", 0.60)', 'ay1.add_route(1, "filter.0.1", 0.60)', 'ay1.add_route(2, "filter.0.2", 0.60)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 200, sourceColumn: 2, sourceEndLine: 200};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filter.0.0', gain: 0.6, raw: 'ay1.add_route(0, "filter.0.0", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 203, sourceColumn: 2, sourceEndLine: 203};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/1'}) SET n:AudioRoute SET n += {output: '1', target: 'filter.0.1', gain: 0.6, raw: 'ay1.add_route(1, "filter.0.1", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 204, sourceColumn: 2, sourceEndLine: 204};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/2'}) SET n:AudioRoute SET n += {output: '2', target: 'filter.0.2', gain: 0.6, raw: 'ay1.add_route(2, "filter.0.2", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 205, sourceColumn: 2, sourceEndLine: 205};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set', raw: 'ay1.port_a_read_callback().set(m_soundlatch, FUNC(generic_latch_8_device::read))', ownerTag: 'ay1', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 201, sourceColumn: 2, sourceEndLine: 201, targetClass: 'generic_latch_8_device', targetMethod: 'read', targetTag: 'soundlatch'};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 201, sourceColumn: 2, sourceEndLine: 201};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:1'}) SET n:Callback SET n += {signal: 'port_b_read_callback', operation: 'set', raw: 'ay1.port_b_read_callback().set(FUNC(timeplt_audio_device::portB_r))', ownerTag: 'ay1', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 202, sourceColumn: 2, sourceEndLine: 202, targetClass: 'timeplt_audio_device', targetMethod: 'portB_r'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.portB_r'}) SET n:Handler SET n += {method: 'portB_r', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 78, sourceColumn: 1, sourceEndLine: 86, sourceParameters: '', sourceBody: 'return TABLE((m_soundcpu->total_cycles() / 512) % 10, 0x00, 0x10, 0x20, 0x30, 0x40, 0x90, 0xa0, 0xb0, 0xa0, 0xd0);'};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay2', clock: 1789772.625, config: ['ay8910_device &ay2(AY8910(config, "ay2", DERIVED_CLOCK(1, 8)))', 'ay2.add_route(0, "filter.1.0", 0.60)', 'ay2.add_route(1, "filter.1.1", 0.60)', 'ay2.add_route(2, "filter.1.2", 0.60)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 207, sourceColumn: 2, sourceEndLine: 207};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filter.1.0', gain: 0.6, raw: 'ay2.add_route(0, "filter.1.0", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 208, sourceColumn: 2, sourceEndLine: 208};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/1'}) SET n:AudioRoute SET n += {output: '1', target: 'filter.1.1', gain: 0.6, raw: 'ay2.add_route(1, "filter.1.1", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 209, sourceColumn: 2, sourceEndLine: 209};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/2'}) SET n:AudioRoute SET n += {output: '2', target: 'filter.1.2', gain: 0.6, raw: 'ay2.add_route(2, "filter.1.2", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 210, sourceColumn: 2, sourceEndLine: 210};
MERGE (n:KG {id: 'inputs:pooyan'}) SET n:InputPorts SET n += {name: 'pooyan', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 318, sourceColumn: 8, sourceEndLine: 318};
MERGE (n:KG {id: 'inputs:pooyan/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:pooyan/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:pooyan/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:pooyan/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:pooyan/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:pooyan/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:pooyan/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: true, type: 'IPT_UNUSED', defaultValue: 224};
MERGE (n:KG {id: 'inputs:pooyan/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:pooyan/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 3, activeLow: true, type: 'IPT_UNUSED', defaultValue: 3};
MERGE (n:KG {id: 'inputs:pooyan/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_2WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:pooyan/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_2WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:pooyan/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:pooyan/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: true, type: 'IPT_UNUSED', defaultValue: 224};
MERGE (n:KG {id: 'inputs:pooyan/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:pooyan/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 3, activeLow: true, type: 'IPT_UNUSED', defaultValue: 3};
MERGE (n:KG {id: 'inputs:pooyan/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:pooyan/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:pooyan/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:pooyan/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: true, type: 'IPT_UNUSED', defaultValue: 224};
MERGE (n:KG {id: 'inputs:pooyan/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: false};
MERGE (n:KG {id: 'inputs:pooyan/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION(#SW1":1,2,3,4")'], name: 'Coin A', defaultValue: 15, location: '#SW1":1,2,3,4"', settings: ['2=4C 1C', '5=3C 1C', '8=2C 1C', '4=3C 2C', '1=4C 3C', '15=1C 1C', '3=3C 4C', '7=2C 3C', '14=1C 2C', '6=2C 5C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C', '9=1C 7C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:pooyan/DSW0/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION(#SW1":5,6,7,8")'], name: 'Coin B', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['32=4C 1C', '80=3C 1C', '128=2C 1C', '64=3C 2C', '16=4C 3C', '240=1C 1C', '48=3C 4C', '112=2C 3C', '224=1C 2C', '96=2C 5C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '160=1C 6C', '144=1C 7C', '0=Invalid']};
MERGE (n:KG {id: 'inputs:pooyan/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:pooyan/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:1,2")'], name: 'Lives', defaultValue: 3, location: 'SW2:1,2', settings: ['3=3', '2=4', '1=5', '0=255 (Cheat)']};
MERGE (n:KG {id: 'inputs:pooyan/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:3', settings: ['0=Upright', '4=Cocktail']};
MERGE (n:KG {id: 'inputs:pooyan/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW2:4")'], name: 'Bonus Life', defaultValue: 8, location: 'SW2:4', settings: ['8=50K 80K+', '0=30K 70K+']};
MERGE (n:KG {id: 'inputs:pooyan/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 112, modifiers: ['PORT_DIPLOCATION("SW2:5,6,7")'], name: 'Difficulty', defaultValue: 112, location: 'SW2:5,6,7', settings: ['112=1 (Easy)', '96=2', '80=3', '64=4', '48=5', '32=6', '16=7', '0=8 (Hard)']};
MERGE (n:KG {id: 'inputs:pooyan/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: ['RGN_FRAC(1,2)+4', 'RGN_FRAC(1,2)+0', 4, 0], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: ['RGN_FRAC(1,2)+4', 'RGN_FRAC(1,2)+0', 4, 0], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_pooyan'}) SET n:GfxDecode SET n += {name: 'gfx_pooyan', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 402, sourceColumn: 8, sourceEndLine: 402};
MERGE (n:KG {id: 'gfxdecode:gfx_pooyan/e0'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_pooyan/e1'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'spritelayout', colorBase: 256, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:pooyan_state.pooyan/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(pooyan_state::palette), 16*16+16*16, 32)', ownerTag: 'palette', targetClass: 'pooyan_state', targetMethod: 'palette', entries: 32, sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 446};
MERGE (n:KG {id: 'handler:pooyan_state.palette'}) SET n:Handler SET n += {method: 'palette', ownerClass: 'pooyan_state', sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 105, sourceColumn: 1, sourceEndLine: 159, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();
	
	

	// compute the color output resistor weights
	double rweights[3], gweights[3], bweights[2];
	compute_resistor_weights(0, 255, -1.0,
			3, resistances_rg, rweights, 1000, 0,
			3, resistances_rg, gweights, 1000, 0,
			2, resistances_b,  bweights, 1000, 0);

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

	// characters
	for (int i = 0; i < 0x100; i++)
	{
		uint8_t const ctabentry = (color_prom[i] & 0x0f) | 0x10;
		palette.set_pen_indirect(i, ctabentry);
	}

	// sprites
	for (int i = 0x100; i < 0x200; i++)
	{
		uint8_t const ctabentry = color_prom[i] & 0x0f;
		palette.set_pen_indirect(i, ctabentry);
	}'};
MATCH (a:KG {id: 'game:pooyan'}), (b:KG {id: 'file:src/mame/konami/pooyan.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 544, sourceColumn: 1, sourceEndLine: 544};
MATCH (a:KG {id: 'game:pooyan'}), (b:KG {id: 'machine:pooyan_state.pooyan'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:pooyan'}), (b:KG {id: 'inputs:pooyan'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:pooyan'}), (b:KG {id: 'romset:pooyan'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:konamipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:timeplt_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/pooyan.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'file:src/mame/konami/pooyan.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 421, sourceColumn: 1, sourceEndLine: 450};
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'handler:pooyan_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'device:pooyan_state.pooyan/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'device:pooyan_state.pooyan/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'device:pooyan_state.pooyan/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'device:pooyan_state.pooyan/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'device:pooyan_state.pooyan/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'gfxdecode:gfx_pooyan'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'device:pooyan_state.pooyan/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pooyan_state.pooyan'}), (b:KG {id: 'device:pooyan_state.pooyan/timeplt_audio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:pooyan'}), (b:KG {id: 'file:src/mame/konami/pooyan.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 318, sourceColumn: 8, sourceEndLine: 318};
MATCH (a:KG {id: 'inputs:pooyan'}), (b:KG {id: 'inputs:pooyan/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:pooyan'}), (b:KG {id: 'inputs:pooyan/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:pooyan'}), (b:KG {id: 'inputs:pooyan/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:pooyan'}), (b:KG {id: 'inputs:pooyan/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:pooyan'}), (b:KG {id: 'inputs:pooyan/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:pooyan'}), (b:KG {id: 'file:src/mame/konami/pooyan.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 459, sourceColumn: 1, sourceEndLine: 459};
MATCH (a:KG {id: 'romset:pooyan'}), (b:KG {id: 'region:pooyan/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:pooyan'}), (b:KG {id: 'region:pooyan/timeplt_audio:tpsound'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:pooyan'}), (b:KG {id: 'region:pooyan/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:pooyan'}), (b:KG {id: 'region:pooyan/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:pooyan'}), (b:KG {id: 'region:pooyan/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:pooyan_state.video_start'}), (b:KG {id: 'handler:pooyan_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/maincpu'}), (b:KG {id: 'map:pooyan_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch'}), (b:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch'}), (b:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch'}), (b:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch'}), (b:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch'}), (b:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch'}), (b:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch'}), (b:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/screen'}), (b:KG {id: 'device:pooyan_state.pooyan/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/screen'}), (b:KG {id: 'device:pooyan_state.pooyan/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pooyan'}), (b:KG {id: 'file:src/mame/konami/pooyan.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 402, sourceColumn: 8, sourceEndLine: 402};
MATCH (a:KG {id: 'gfxdecode:gfx_pooyan'}), (b:KG {id: 'gfxdecode:gfx_pooyan/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pooyan'}), (b:KG {id: 'gfxdecode:gfx_pooyan/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/palette'}), (b:KG {id: 'device:pooyan_state.pooyan/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/timeplt_audio'}), (b:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN0'}), (b:KG {id: 'inputs:pooyan/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN0'}), (b:KG {id: 'inputs:pooyan/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN0'}), (b:KG {id: 'inputs:pooyan/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN0'}), (b:KG {id: 'inputs:pooyan/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN0'}), (b:KG {id: 'inputs:pooyan/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN0'}), (b:KG {id: 'inputs:pooyan/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN1'}), (b:KG {id: 'inputs:pooyan/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN1'}), (b:KG {id: 'inputs:pooyan/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN1'}), (b:KG {id: 'inputs:pooyan/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN1'}), (b:KG {id: 'inputs:pooyan/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN1'}), (b:KG {id: 'inputs:pooyan/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN2'}), (b:KG {id: 'inputs:pooyan/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN2'}), (b:KG {id: 'inputs:pooyan/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN2'}), (b:KG {id: 'inputs:pooyan/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN2'}), (b:KG {id: 'inputs:pooyan/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/IN2'}), (b:KG {id: 'inputs:pooyan/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/DSW0'}), (b:KG {id: 'inputs:pooyan/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/DSW0'}), (b:KG {id: 'inputs:pooyan/DSW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/DSW1'}), (b:KG {id: 'inputs:pooyan/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/DSW1'}), (b:KG {id: 'inputs:pooyan/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/DSW1'}), (b:KG {id: 'inputs:pooyan/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/DSW1'}), (b:KG {id: 'inputs:pooyan/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pooyan/DSW1'}), (b:KG {id: 'inputs:pooyan/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:pooyan/maincpu'}), (b:KG {id: 'rom:pooyan/maincpu/1.4a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/maincpu'}), (b:KG {id: 'rom:pooyan/maincpu/2.5a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/maincpu'}), (b:KG {id: 'rom:pooyan/maincpu/3.6a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/maincpu'}), (b:KG {id: 'rom:pooyan/maincpu/4.7a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/timeplt_audio:tpsound'}), (b:KG {id: 'rom:pooyan/timeplt_audio:tpsound/xx.7a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/timeplt_audio:tpsound'}), (b:KG {id: 'rom:pooyan/timeplt_audio:tpsound/xx.8a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/tiles'}), (b:KG {id: 'rom:pooyan/tiles/8.10g'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/tiles'}), (b:KG {id: 'rom:pooyan/tiles/7.9g'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/sprites'}), (b:KG {id: 'rom:pooyan/sprites/6.9a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/sprites'}), (b:KG {id: 'rom:pooyan/sprites/5.8a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/proms'}), (b:KG {id: 'rom:pooyan/proms/pooyan.pr1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/proms'}), (b:KG {id: 'rom:pooyan/proms/pooyan.pr3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pooyan/proms'}), (b:KG {id: 'rom:pooyan/proms/pooyan.pr2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'file:src/mame/konami/pooyan.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/pooyan.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 308};
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map'}), (b:KG {id: 'map:pooyan_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:pooyan_state.irq_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:1'}), (b:KG {id: 'handler:timeplt_audio_device.sh_irqtrigger_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:2'}), (b:KG {id: 'handler:timeplt_audio_device.mute_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:3'}), (b:KG {id: 'handler:pooyan_state.coin_counter_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:4'}), (b:KG {id: 'handler:pooyan_state.coin_counter_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/mainlatch/callback:mainlatch:6'}), (b:KG {id: 'handler:pooyan_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/screen/callback:screen:0'}), (b:KG {id: 'handler:pooyan_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/screen/callback:screen:1'}), (b:KG {id: 'handler:pooyan_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pooyan/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pooyan/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:pooyan_state.pooyan/palette/callback:palette_init'}), (b:KG {id: 'handler:pooyan_state.palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 189, sourceColumn: 1, sourceEndLine: 217};
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/tpsound'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map/range1'}), (b:KG {id: 'handler:pooyan_state.colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map/range2'}), (b:KG {id: 'handler:pooyan_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:pooyan_state.main_map/range11'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:pooyan_state.main_map/range12'}), (b:KG {id: 'handler:timeplt_audio_device.sound_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'timeplt_audio'};
MATCH (a:KG {id: 'map:pooyan_state.main_map/range13'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'handler:pooyan_state.screen_update'}), (b:KG {id: 'handler:pooyan_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/konami/pooyan.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/konami/pooyan.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}), (b:KG {id: 'file:timeplt_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/tpsound'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 159, sourceColumn: 1, sourceEndLine: 168};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:0'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:0'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/soundlatch'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:1'}), (b:KG {id: 'handler:timeplt_audio_device.portB_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range3'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range5'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range6'}), (b:KG {id: 'handler:timeplt_audio_device.filter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:timeplt_audio_device.filter_w'}), (b:KG {id: 'handler:timeplt_audio_device.set_filter'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
