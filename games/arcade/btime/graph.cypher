// mamekit knowledge graph — driver src/mame/dataeast/btime.cpp
// generated 2026-09-24T02:25:50.590Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/dataeast/btime.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/dataeast/btime.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:deco222.h'}) SET n:SourceFile SET n += {path: 'deco222.h', external: true};
MERGE (n:KG {id: 'file:decocpu7.h'}) SET n:SourceFile SET n += {path: 'decocpu7.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/input_merger.h'}) SET n:SourceFile SET n += {path: 'machine/input_merger.h', external: true};
MERGE (n:KG {id: 'file:machine/timer.h'}) SET n:SourceFile SET n += {path: 'machine/timer.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:sound/discrete.h'}) SET n:SourceFile SET n += {path: 'sound/discrete.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:btime'}) SET n:Game SET n += {name: 'btime', year: '1982', company: 'Data East Corporation', fullname: 'Burger Time (Data East set 1)', monitor: 'ROT270', cls: 'btime_state', init: 'init_btime', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 3269, sourceColumn: 1, sourceEndLine: 3269};
MERGE (n:KG {id: 'romset:btime'}) SET n:RomSet SET n += {name: 'btime', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2546, sourceColumn: 1, sourceEndLine: 2546};
MERGE (n:KG {id: 'region:btime/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2547, sourceColumn: 2, sourceEndLine: 2547};
MERGE (n:KG {id: 'rom:btime/maincpu/aa04.9b'}) SET n:Rom SET n += {file: 'aa04.9b', offset: 49152, size: 4096, crc: '368a25b5', sha1: 'ed3f3712423979dcb351941fa85dce6a0a7bb16b', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2548, sourceColumn: 2, sourceEndLine: 2548};
MERGE (n:KG {id: 'rom:btime/maincpu/aa06.13b'}) SET n:Rom SET n += {file: 'aa06.13b', offset: 53248, size: 4096, crc: 'b4ba400d', sha1: '8c77397e934907bc47a739f263196a0f2f81ba3d', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2549, sourceColumn: 2, sourceEndLine: 2549};
MERGE (n:KG {id: 'rom:btime/maincpu/aa05.10b'}) SET n:Rom SET n += {file: 'aa05.10b', offset: 57344, size: 4096, crc: '8005bffa', sha1: 'd0da4e360039f6a8d8142a4e8e05c1f90c0af68a', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2550, sourceColumn: 2, sourceEndLine: 2550};
MERGE (n:KG {id: 'rom:btime/maincpu/aa07.15b'}) SET n:Rom SET n += {file: 'aa07.15b', offset: 61440, size: 4096, crc: '086440ad', sha1: '4a32bc92f8ff5fbe112f56e62d2c03da8851a7b9', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2551, sourceColumn: 2, sourceEndLine: 2551};
MERGE (n:KG {id: 'region:btime/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2553, sourceColumn: 2, sourceEndLine: 2553};
MERGE (n:KG {id: 'rom:btime/audiocpu/ab14.12h'}) SET n:Rom SET n += {file: 'ab14.12h', offset: 57344, size: 4096, crc: 'f55e5211', sha1: '27940026d0c6212d1138d2fd88880df697218627', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2554, sourceColumn: 2, sourceEndLine: 2554};
MERGE (n:KG {id: 'region:btime/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 24576, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2556, sourceColumn: 2, sourceEndLine: 2556};
MERGE (n:KG {id: 'rom:btime/gfx1/aa12.7k'}) SET n:Rom SET n += {file: 'aa12.7k', offset: 0, size: 4096, crc: 'c4617243', sha1: '24204d591aa2c264a852ee9ba8c4be63efd97728', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2557, sourceColumn: 2, sourceEndLine: 2557};
MERGE (n:KG {id: 'rom:btime/gfx1/ab13.9k'}) SET n:Rom SET n += {file: 'ab13.9k', offset: 4096, size: 4096, crc: 'ac01042f', sha1: 'e64b6381a9298eaf74e79fa5f1ea8e9596c58a49', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2558, sourceColumn: 2, sourceEndLine: 2558};
MERGE (n:KG {id: 'rom:btime/gfx1/ab10.10k'}) SET n:Rom SET n += {file: 'ab10.10k', offset: 8192, size: 4096, crc: '854a872a', sha1: '3d2ecfd54a5a9d68b53cf4b4ee1f2daa6aef2123', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2559, sourceColumn: 2, sourceEndLine: 2559};
MERGE (n:KG {id: 'rom:btime/gfx1/ab11.12k'}) SET n:Rom SET n += {file: 'ab11.12k', offset: 12288, size: 4096, crc: 'd4848014', sha1: '0a55b091cd4e7f317c35defe13d5051b26042eee', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2560, sourceColumn: 2, sourceEndLine: 2560};
MERGE (n:KG {id: 'rom:btime/gfx1/aa8.13k'}) SET n:Rom SET n += {file: 'aa8.13k', offset: 16384, size: 4096, crc: '8650c788', sha1: 'd9b1ee2d1f2fd66705d497c80252861b49aa9254', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2561, sourceColumn: 2, sourceEndLine: 2561};
MERGE (n:KG {id: 'rom:btime/gfx1/ab9.15k'}) SET n:Rom SET n += {file: 'ab9.15k', offset: 20480, size: 4096, crc: '8dec15e6', sha1: 'b72633de6268ce16742bba4dcba835df860d6c2f', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2562, sourceColumn: 2, sourceEndLine: 2562};
MERGE (n:KG {id: 'region:btime/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 6144, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2564, sourceColumn: 2, sourceEndLine: 2564};
MERGE (n:KG {id: 'rom:btime/gfx2/ab00.1b'}) SET n:Rom SET n += {file: 'ab00.1b', offset: 0, size: 2048, crc: 'c7a14485', sha1: '6a0a8e6b7860859f22daa33634e34fbf91387659', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2565, sourceColumn: 2, sourceEndLine: 2565};
MERGE (n:KG {id: 'rom:btime/gfx2/ab01.3b'}) SET n:Rom SET n += {file: 'ab01.3b', offset: 2048, size: 2048, crc: '25b49078', sha1: '4abdcbd4f3362c3e4463a1274731289f1a72d2e6', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2566, sourceColumn: 2, sourceEndLine: 2566};
MERGE (n:KG {id: 'rom:btime/gfx2/ab02.4b'}) SET n:Rom SET n += {file: 'ab02.4b', offset: 4096, size: 2048, crc: 'b8ef56c3', sha1: '4a03bf011dc1fb2902f42587b1174b880cf06df1', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2567, sourceColumn: 2, sourceEndLine: 2567};
MERGE (n:KG {id: 'region:btime/bg_map'}) SET n:RomRegion SET n += {tag: 'bg_map', size: 2048, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2569, sourceColumn: 2, sourceEndLine: 2569};
MERGE (n:KG {id: 'rom:btime/bg_map/ab03.6b'}) SET n:Rom SET n += {file: 'ab03.6b', offset: 0, size: 2048, crc: 'd26bc1f3', sha1: '737af6e264183a1f151f277a07cf250d6abb3fd8', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2570, sourceColumn: 2, sourceEndLine: 2570};
MERGE (n:KG {id: 'map:btime_state.btime_map'}) SET n:AddressMap SET n += {cls: 'btime_state', name: 'btime_map', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1034, sourceColumn: 1, sourceEndLine: 1048};
MERGE (n:KG {id: 'map:btime_state.btime_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 2047, raw: 'map(0x0000, 0x07ff).ram()', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1036, sourceColumn: 2, sourceEndLine: 1036, ram: true};
MERGE (n:KG {id: 'map:btime_state.btime_map/range1'}) SET n:AddressRange SET n += {start: 3072, end: 3087, raw: 'map(0x0c00, 0x0c0f).ram().w(m_palette, FUNC(palette_device::write8)).share("palette")', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1037, sourceColumn: 2, sourceEndLine: 1037, ram: true, share: 'palette'};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1154, sourceColumn: 2, sourceEndLine: 1154};
MERGE (n:KG {id: 'map:btime_state.btime_map/range2'}) SET n:AddressRange SET n += {start: 4096, end: 5119, raw: 'map(0x1000, 0x13ff).ram().share(m_videoram)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1038, sourceColumn: 2, sourceEndLine: 1038, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:btime_state.btime_map/range3'}) SET n:AddressRange SET n += {start: 5120, end: 6143, raw: 'map(0x1400, 0x17ff).ram().share(m_colorram)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1039, sourceColumn: 2, sourceEndLine: 1039, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'map:btime_state.btime_map/range4'}) SET n:AddressRange SET n += {start: 6144, end: 7167, raw: 'map(0x1800, 0x1bff).rw(FUNC(btime_state::btime_mirrorvideoram_r), FUNC(btime_state::btime_mirrorvideoram_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1040, sourceColumn: 2, sourceEndLine: 1040};
MERGE (n:KG {id: 'handler:btime_state.btime_mirrorvideoram_r'}) SET n:Handler SET n += {method: 'btime_mirrorvideoram_r', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 534, sourceColumn: 1, sourceEndLine: 542, sourceParameters: 'offs_t offset', sourceBody: '// swap x and y coordinates
	int const x = offset / 32;
	int const y = offset % 32;
	offset = 32 * y + x;

	return m_videoram[offset];'};
MERGE (n:KG {id: 'handler:btime_state.btime_mirrorvideoram_w'}) SET n:Handler SET n += {method: 'btime_mirrorvideoram_w', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 554, sourceColumn: 1, sourceEndLine: 562, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// swap x and y coordinates
	int const x = offset / 32;
	int const y = offset % 32;
	offset = 32 * y + x;

	m_videoram[offset] = data;'};
MERGE (n:KG {id: 'map:btime_state.btime_map/range5'}) SET n:AddressRange SET n += {start: 7168, end: 8191, raw: 'map(0x1c00, 0x1fff).rw(FUNC(btime_state::btime_mirrorcolorram_r), FUNC(btime_state::btime_mirrorcolorram_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1041, sourceColumn: 2, sourceEndLine: 1041};
MERGE (n:KG {id: 'handler:btime_state.btime_mirrorcolorram_r'}) SET n:Handler SET n += {method: 'btime_mirrorcolorram_r', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 544, sourceColumn: 1, sourceEndLine: 552, sourceParameters: 'offs_t offset', sourceBody: '// swap x and y coordinates
	int const x = offset / 32;
	int const y = offset % 32;
	offset = 32 * y + x;

	return m_colorram[offset];'};
MERGE (n:KG {id: 'handler:btime_state.btime_mirrorcolorram_w'}) SET n:Handler SET n += {method: 'btime_mirrorcolorram_w', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 574, sourceColumn: 1, sourceEndLine: 582, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// swap x and y coordinates
	int const x = offset / 32;
	int const y = offset % 32;
	offset = 32 * y + x;

	m_colorram[offset] = data;'};
MERGE (n:KG {id: 'map:btime_state.btime_map/range6'}) SET n:AddressRange SET n += {start: 16384, end: 16384, raw: 'map(0x4000, 0x4000).portr("P1").nopw()', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1042, sourceColumn: 2, sourceEndLine: 1042, nopw: true, portRead: 'P1'};
MERGE (n:KG {id: 'map:btime_state.btime_map/range7'}) SET n:AddressRange SET n += {start: 16385, end: 16385, raw: 'map(0x4001, 0x4001).portr("P2")', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1043, sourceColumn: 2, sourceEndLine: 1043, portRead: 'P2'};
MERGE (n:KG {id: 'map:btime_state.btime_map/range8'}) SET n:AddressRange SET n += {start: 16386, end: 16386, raw: 'map(0x4002, 0x4002).portr("SYSTEM").w(FUNC(btime_state::btime_video_control_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1044, sourceColumn: 2, sourceEndLine: 1044, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'handler:btime_state.btime_video_control_w'}) SET n:Handler SET n += {method: 'btime_video_control_w', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 606, sourceColumn: 1, sourceEndLine: 614, sourceParameters: 'uint8_t data', sourceBody: '// Btime video control
	//
	// Bit 0   = Flip screen
	// Bit 1-7 = Unknown

	flip_screen_set(data & 0x01);'};
MERGE (n:KG {id: 'map:btime_state.btime_map/range9'}) SET n:AddressRange SET n += {start: 16387, end: 16387, raw: 'map(0x4003, 0x4003).portr("DSW1").w(m_soundlatch, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1045, sourceColumn: 2, sourceEndLine: 1045, portRead: 'DSW1'};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1169, sourceColumn: 2, sourceEndLine: 1169};
MERGE (n:KG {id: 'map:btime_state.btime_map/range10'}) SET n:AddressRange SET n += {start: 16388, end: 16388, raw: 'map(0x4004, 0x4004).portr("DSW2").w(FUNC(btime_state::bnj_scroll_w<0>))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1046, sourceColumn: 2, sourceEndLine: 1046, portRead: 'DSW2'};
MERGE (n:KG {id: 'handler:btime_state.bnj_scroll_w_0'}) SET n:Handler SET n += {method: 'bnj_scroll_w_0', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 601, sourceColumn: 1, sourceEndLine: 604, sourceConstants: ['Which=0'], sourceParameters: 'uint8_t data', sourceBody: 'm_bnj_scroll[Which] = data;'};
MERGE (n:KG {id: 'map:btime_state.btime_map/range11'}) SET n:AddressRange SET n += {start: 45056, end: 65535, raw: 'map(0xb000, 0xffff).rom()', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1047, sourceColumn: 2, sourceEndLine: 1047, rom: true};
MERGE (n:KG {id: 'map:btime_state.audio_map'}) SET n:AddressMap SET n += {cls: 'btime_state', name: 'audio_map', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1214, sourceColumn: 1, sourceEndLine: 1224};
MERGE (n:KG {id: 'map:btime_state.audio_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 1023, raw: 'map(0x0000, 0x03ff).mirror(0x1c00).ram()', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1216, sourceColumn: 2, sourceEndLine: 1216, mirror: 7168, ram: true};
MERGE (n:KG {id: 'map:btime_state.audio_map/range1'}) SET n:AddressRange SET n += {start: 8192, end: 16383, raw: 'map(0x2000, 0x3fff).w("ay1", FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1217, sourceColumn: 2, sourceEndLine: 1217};
MERGE (n:KG {id: 'handler:ay8910_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1231, sourceColumn: 2, sourceEndLine: 1231};
MERGE (n:KG {id: 'map:btime_state.audio_map/range2'}) SET n:AddressRange SET n += {start: 16384, end: 24575, raw: 'map(0x4000, 0x5fff).w("ay1", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1218, sourceColumn: 2, sourceEndLine: 1218};
MERGE (n:KG {id: 'handler:ay8910_device.address_w'}) SET n:Handler SET n += {method: 'address_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1232, sourceColumn: 2, sourceEndLine: 1232};
MERGE (n:KG {id: 'map:btime_state.audio_map/range3'}) SET n:AddressRange SET n += {start: 24576, end: 32767, raw: 'map(0x6000, 0x7fff).w("ay2", FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1219, sourceColumn: 2, sourceEndLine: 1219};
MERGE (n:KG {id: 'map:btime_state.audio_map/range4'}) SET n:AddressRange SET n += {start: 32768, end: 40959, raw: 'map(0x8000, 0x9fff).w("ay2", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1220, sourceColumn: 2, sourceEndLine: 1220};
MERGE (n:KG {id: 'map:btime_state.audio_map/range5'}) SET n:AddressRange SET n += {start: 40960, end: 49151, raw: 'map(0xa000, 0xbfff).r(m_soundlatch, FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1221, sourceColumn: 2, sourceEndLine: 1221};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1233, sourceColumn: 2, sourceEndLine: 1233};
MERGE (n:KG {id: 'map:btime_state.audio_map/range6'}) SET n:AddressRange SET n += {start: 49152, end: 57343, raw: 'map(0xc000, 0xdfff).w(FUNC(btime_state::audio_nmi_enable_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1222, sourceColumn: 2, sourceEndLine: 1222};
MERGE (n:KG {id: 'handler:btime_state.audio_nmi_enable_w'}) SET n:Handler SET n += {method: 'audio_nmi_enable_w', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1012, sourceColumn: 1, sourceEndLine: 1019, sourceConstants: ['A=0.0125', 'AUDIO_ENABLE_DIRECT=0', 'btime_state::AUDIO_ENABLE_DIRECT=0'], sourceParameters: 'uint8_t data', sourceBody: '/* for most games, this serves as the NMI enable for the audio CPU; however,
	   lnc and disco use bit 0 of the first AY-8910\'s port A instead; many other
	   games also write there in addition to this address */
	if (m_audio_nmi_enable_type == btime_state::AUDIO_ENABLE_DIRECT)
		m_audionmi->in_w<0>(BIT(data, 0));'};
MERGE (n:KG {id: 'map:btime_state.audio_map/range7'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).mirror(0x1000).rom()', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1223, sourceColumn: 2, sourceEndLine: 1223, mirror: 4096, rom: true};
MERGE (n:KG {id: 'machine:btime_state.btime'}) SET n:MachineConfig SET n += {cls: 'btime_state', name: 'btime', calls: [], stateMembers: ['{"name":"m_lnc_charbank","bits":8}', '{"name":"m_btime_palette","bits":8}', '{"name":"m_bnj_scroll","bits":8,"arrayLength":2}', '{"name":"m_btime_tilemap","bits":8,"arrayLength":4}', '{"name":"m_audio_nmi_enable_type","bits":8}'], resetHandlers: ['btime_state.machine_reset'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2297, sourceColumn: 1, sourceEndLine: 2340};
MERGE (n:KG {id: 'handler:btime_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2272, sourceColumn: 1, sourceEndLine: 2285, sourceParameters: '', sourceBody: '// by default, the audio NMI is disabled, except for bootlegs which don\'t use the enable
	if (m_audionmi.found())
		m_audionmi->in_w<0>(0);

	m_btime_palette = 0;
	m_bnj_scroll[0] = 0;
	m_bnj_scroll[1] = 0;
	m_btime_tilemap[0] = 0;
	m_btime_tilemap[1] = 0;
	m_btime_tilemap[2] = 0;
	m_btime_tilemap[3] = 0;'};
MERGE (n:KG {id: 'device:btime_state.btime/maincpu'}) SET n:Device SET n += {type: 'DECO_CPU7', tag: 'maincpu', clock: 1500000, config: ['DECO_CPU7(config, m_maincpu, 12_MHz_XTAL / 2 / 2 / 2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &btime_state::btime_map)'], member: 'm_maincpu', cls: 'deco_cpu7_device', clsHierarchy: ['deco_cpu7_device'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2300, sourceColumn: 2, sourceEndLine: 2300};
MERGE (n:KG {id: 'device:btime_state.btime/audiocpu'}) SET n:Device SET n += {type: 'M6502', tag: 'audiocpu', clock: 500000, config: ['M6502(config, m_audiocpu, 12_MHz_XTAL / 2 / 2 / 3 / 2)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &btime_state::audio_map)'], member: 'm_audiocpu', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2303, sourceColumn: 2, sourceEndLine: 2303};
MERGE (n:KG {id: 'device:btime_state.btime/8vck'}) SET n:Device SET n += {type: 'TIMER', tag: '8vck', clock: null, config: ['TIMER(config, "8vck").configure_scanline(FUNC(btime_state::audio_nmi_gen), "screen", 0, 8)'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2305, sourceColumn: 2, sourceEndLine: 2305};
MERGE (n:KG {id: 'device:btime_state.btime/8vck/callback:8vck:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "8vck").configure_scanline(FUNC(btime_state::audio_nmi_gen), "screen", 0, 8)', ownerTag: '8vck', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2305, sourceColumn: 2, sourceEndLine: 2305, scanlineStart: 0, scanlineIncrement: 8, targetClass: 'btime_state', targetMethod: 'audio_nmi_gen'};
MERGE (n:KG {id: 'handler:btime_state.audio_nmi_gen'}) SET n:Handler SET n += {method: 'audio_nmi_gen', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1028, sourceColumn: 1, sourceEndLine: 1032, sourceParameters: 'int param', sourceBody: 'int const scanline = param;
	m_audionmi->in_w<1>((scanline & 8) >> 3);'};
MERGE (n:KG {id: 'device:btime_state.btime/audionmi'}) SET n:Device SET n += {type: 'INPUT_MERGER_ALL_HIGH', tag: 'audionmi', clock: null, config: ['INPUT_MERGER_ALL_HIGH(config, "audionmi").output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)'], member: 'm_audionmi', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2307, sourceColumn: 2, sourceEndLine: 2307};
MERGE (n:KG {id: 'device:btime_state.btime/audionmi/callback:audionmi:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'INPUT_MERGER_ALL_HIGH(config, "audionmi").output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)', ownerTag: 'audionmi', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2307, sourceColumn: 2, sourceEndLine: 2307, inputLine: 'INPUT_LINE_NMI', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:btime_state.btime/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(12_MHz_XTAL / 2, 384, 8, 248, 272, 8, 248)', 'm_screen->set_screen_update(FUNC(btime_state::screen_update_btime))', 'm_screen->set_palette(m_palette)'], member: 'm_screen', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2310, sourceColumn: 2, sourceEndLine: 2310, configCalls: ['set_raw(6000000,384,8,248,272,8,248)', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 8, 248, 272, 8, 248], screenRawExpr: ['12_MHz_XTAL / 2', '384', '8', '248', '272', '8', '248']};
MERGE (n:KG {id: 'device:btime_state.btime/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(btime_state::screen_update_btime))', ownerTag: 'screen', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2312, sourceColumn: 2, sourceEndLine: 2312, targetClass: 'btime_state', targetMethod: 'screen_update_btime'};
MERGE (n:KG {id: 'handler:btime_state.screen_update_btime'}) SET n:Handler SET n += {method: 'screen_update_btime', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 764, sourceColumn: 1, sourceEndLine: 791, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'if (m_bnj_scroll[0] & 0x10)
	{
		int start;

		// Generate tile map
		if (flip_screen())
			start = 0;
		else
			start = 1;

		for (int i = 0; i < 4; i++)
		{
			m_btime_tilemap[i] = start | (m_bnj_scroll[0] & 0x04);
			start = (start + 1) & 0x03;
		}

		draw_background(bitmap, cliprect, m_btime_tilemap, 0);
		draw_chars(bitmap, cliprect, true, 0, -1);
	}
	else
		draw_chars(bitmap, cliprect, false, 0, -1);

	draw_sprites(bitmap, cliprect, 0, 1, 0, m_videoram, 0x20);

	return 0;'};
MERGE (n:KG {id: 'handler:btime_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 683, sourceColumn: 1, sourceEndLine: 725, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect,
		uint8_t color,
		uint8_t sprite_y_adjust, uint8_t sprite_y_adjust_flip_screen,
		uint8_t const *sprite_ram, offs_t interleave', sourceBody: 'for (int i = 0, offs = 0; i < 8; i++, offs += 4 * interleave)
	{
		if (!(sprite_ram[offs + 0] & 0x01)) continue;

		int x = 240 - sprite_ram[offs + 3 * interleave];
		int y = 240 - sprite_ram[offs + 2 * interleave];

		uint8_t flipx = sprite_ram[offs + 0] & 0x04;
		uint8_t flipy = sprite_ram[offs + 0] & 0x02;

		if (flip_screen())
		{
			x = 240 - x;
			y = 240 - y + sprite_y_adjust_flip_screen;

			flipx = !flipx;
			flipy = !flipy;
		}

		y = y - sprite_y_adjust;

		m_gfxdecode->gfx(1)->transpen(bitmap, cliprect,
				sprite_ram[offs + interleave],
				color,
				flipx, flipy,
				x, y, 0);

		y = y + (flip_screen() ? -256 : 256);

		// Wrap around
		m_gfxdecode->gfx(1)->transpen(bitmap, cliprect,
				sprite_ram[offs + interleave],
				color,
				flipx, flipy,
				x, y, 0);
	}'};
MERGE (n:KG {id: 'handler:btime_state.draw_background'}) SET n:Handler SET n += {method: 'draw_background', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 728, sourceColumn: 1, sourceEndLine: 761, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, uint8_t *tmap, uint8_t color', sourceBody: 'int scroll = -(m_bnj_scroll[1] | ((m_bnj_scroll[0] & 0x03) << 8));

	// One extra iteration for wrap around
	for (int i = 0; i < 5; i++, scroll += 256)
	{
		offs_t const tileoffset = tmap[i & 3] * 0x100;

		// Skip if this tile is completely off the screen
		if (scroll > 256)
			break;
		if (scroll < -256)
			continue;

		for (offs_t offs = 0; offs < 0x100; offs++)
		{
			int x = 240 - (16 * (offs / 16) + scroll) - 1;
			int y = 16 * (offs % 16);

			if (flip_screen())
			{
				x = 240 - x;
				y = 240 - y;
			}

			m_gfxdecode->gfx(2)->opaque(bitmap, cliprect,
					m_bg_map[tileoffset + offs],
					color,
					flip_screen(), flip_screen(),
					x, y);
		}
	}'};
MERGE (n:KG {id: 'handler:btime_state.draw_chars'}) SET n:Handler SET n += {method: 'draw_chars', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 655, sourceColumn: 1, sourceEndLine: 681, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, uint8_t transparency, uint8_t color, int priority', sourceBody: 'for (offs_t offs = 0; offs < m_videoram.bytes(); offs++)
	{
		uint8_t x = 31 - (offs / 32);
		uint8_t y = offs % 32;

		uint16_t const code = m_videoram[offs] + 256 * (m_colorram[offs] & 3);

		// check priority
		if ((priority != -1) && (priority != ((code >> 7) & 0x01)))
			continue;

		if (flip_screen())
		{
			x = 31 - x;
			y = 31 - y;
		}

		m_gfxdecode->gfx(0)->transpen(bitmap, cliprect,
				code,
				color,
				flip_screen(), flip_screen(),
				8 * x, 8 * y,
				transparency ? 0 : -1);
	}'};
MERGE (n:KG {id: 'device:btime_state.btime/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_btime)'], member: 'm_gfxdecode', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2315, sourceColumn: 2, sourceEndLine: 2315, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:btime_state.btime/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(btime_state::btime_palette)).set_format(palette_device::BGR_233_inverted, 16)'], member: 'm_palette', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2316, sourceColumn: 2, sourceEndLine: 2316, clockExpr: 'FUNC(btime_state::btime_palette)', paletteEntries: 16};
MERGE (n:KG {id: 'device:btime_state.btime/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2319, sourceColumn: 2, sourceEndLine: 2319};
MERGE (n:KG {id: 'device:btime_state.btime/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)', 'm_soundlatch->data_pending_callback().set_inputline(m_audiocpu, 0)'], member: 'm_soundlatch', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2321, sourceColumn: 2, sourceEndLine: 2321};
MERGE (n:KG {id: 'device:btime_state.btime/soundlatch/callback:soundlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set_inputline', raw: 'm_soundlatch->data_pending_callback().set_inputline(m_audiocpu, 0)', ownerTag: 'soundlatch', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2322, sourceColumn: 2, sourceEndLine: 2322, inputLine: '0', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:btime_state.btime/ay1'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay1', clock: 1500000, config: ['ay8910_device &ay1(AY8910(config, "ay1", 12_MHz_XTAL / 2 / 2 / 2))', 'ay1.set_flags(AY8910_DISCRETE_OUTPUT)', 'ay1.set_resistors_load(RES_K(5), RES_K(5), RES_K(5))', 'ay1.port_a_write_callback().set(FUNC(btime_state::ay_audio_nmi_enable_w))', 'ay1.add_route(0, "discrete", 1.0, 0)', 'ay1.add_route(1, "discrete", 1.0, 1)', 'ay1.add_route(2, "discrete", 1.0, 2)'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2324, sourceColumn: 2, sourceEndLine: 2324, configCalls: ['set_flags(4)', 'add_route(0,"discrete",1,0)', 'add_route(1,"discrete",1,1)', 'add_route(2,"discrete",1,2)']};
MERGE (n:KG {id: 'audioroute:device:btime_state.btime/ay1/0'}) SET n:AudioRoute SET n += {output: '0', target: 'discrete', gain: 1, input: 0, raw: 'ay1.add_route(0, "discrete", 1.0, 0)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2328, sourceColumn: 2, sourceEndLine: 2328};
MERGE (n:KG {id: 'audioroute:device:btime_state.btime/ay1/1'}) SET n:AudioRoute SET n += {output: '1', target: 'discrete', gain: 1, input: 1, raw: 'ay1.add_route(1, "discrete", 1.0, 1)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2329, sourceColumn: 2, sourceEndLine: 2329};
MERGE (n:KG {id: 'audioroute:device:btime_state.btime/ay1/2'}) SET n:AudioRoute SET n += {output: '2', target: 'discrete', gain: 1, input: 2, raw: 'ay1.add_route(2, "discrete", 1.0, 2)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2330, sourceColumn: 2, sourceEndLine: 2330};
MERGE (n:KG {id: 'device:btime_state.btime/ay1/callback:ay1:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set', raw: 'ay1.port_a_write_callback().set(FUNC(btime_state::ay_audio_nmi_enable_w))', ownerTag: 'ay1', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2327, sourceColumn: 2, sourceEndLine: 2327, targetClass: 'btime_state', targetMethod: 'ay_audio_nmi_enable_w'};
MERGE (n:KG {id: 'handler:btime_state.ay_audio_nmi_enable_w'}) SET n:Handler SET n += {method: 'ay_audio_nmi_enable_w', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1021, sourceColumn: 1, sourceEndLine: 1026, sourceConstants: ['A=0.0125', 'AUDIO_ENABLE_AY8910=1', 'btime_state::AUDIO_ENABLE_AY8910=1'], sourceParameters: 'uint8_t data', sourceBody: '// port A bit 0, when 1, inhibits the NMI
	if (m_audio_nmi_enable_type == btime_state::AUDIO_ENABLE_AY8910)
		m_audionmi->in_w<0>(BIT(~data, 0));'};
MERGE (n:KG {id: 'device:btime_state.btime/ay2'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay2', clock: 1500000, config: ['ay8910_device &ay2(AY8910(config, "ay2", 12_MHz_XTAL / 2 / 2 / 2))', 'ay2.set_flags(AY8910_DISCRETE_OUTPUT)', 'ay2.set_resistors_load(RES_K(1), RES_K(5), RES_K(5))', 'ay2.add_route(0, "discrete", 1.0, 3)', 'ay2.add_route(1, "discrete", 1.0, 4)', 'ay2.add_route(2, "discrete", 1.0, 5)'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2332, sourceColumn: 2, sourceEndLine: 2332, configCalls: ['set_flags(4)', 'add_route(0,"discrete",1,3)', 'add_route(1,"discrete",1,4)', 'add_route(2,"discrete",1,5)']};
MERGE (n:KG {id: 'audioroute:device:btime_state.btime/ay2/0'}) SET n:AudioRoute SET n += {output: '0', target: 'discrete', gain: 1, input: 3, raw: 'ay2.add_route(0, "discrete", 1.0, 3)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2335, sourceColumn: 2, sourceEndLine: 2335};
MERGE (n:KG {id: 'audioroute:device:btime_state.btime/ay2/1'}) SET n:AudioRoute SET n += {output: '1', target: 'discrete', gain: 1, input: 4, raw: 'ay2.add_route(1, "discrete", 1.0, 4)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2336, sourceColumn: 2, sourceEndLine: 2336};
MERGE (n:KG {id: 'audioroute:device:btime_state.btime/ay2/2'}) SET n:AudioRoute SET n += {output: '2', target: 'discrete', gain: 1, input: 5, raw: 'ay2.add_route(2, "discrete", 1.0, 5)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2337, sourceColumn: 2, sourceEndLine: 2337};
MERGE (n:KG {id: 'device:btime_state.btime/discrete'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'discrete', clock: null, config: ['DISCRETE(config, "discrete", btime_sound_discrete).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2339, sourceColumn: 2, sourceEndLine: 2339, clockExpr: 'btime_sound_discrete'};
MERGE (n:KG {id: 'audioroute:device:btime_state.btime/discrete/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'DISCRETE(config, "discrete", btime_sound_discrete).add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2339, sourceColumn: 2, sourceEndLine: 2339};
MERGE (n:KG {id: 'inputs:btime'}) SET n:InputPorts SET n += {name: 'btime', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1262, sourceColumn: 8, sourceEndLine: 1262};
MERGE (n:KG {id: 'inputs:btime/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:btime/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:btime/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:btime/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:btime/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:btime/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:btime/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:btime/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNUSED', defaultValue: 64};
MERGE (n:KG {id: 'inputs:btime/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED', defaultValue: 128};
MERGE (n:KG {id: 'inputs:btime/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:btime/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:btime/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:btime/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:btime/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:btime/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:btime/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:btime/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNUSED', defaultValue: 64};
MERGE (n:KG {id: 'inputs:btime/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED', defaultValue: 128};
MERGE (n:KG {id: 'inputs:btime/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:btime/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:btime/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:btime/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_TILT', defaultValue: 4};
MERGE (n:KG {id: 'inputs:btime/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:btime/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNUSED', defaultValue: 16};
MERGE (n:KG {id: 'inputs:btime/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNUSED', defaultValue: 32};
MERGE (n:KG {id: 'inputs:btime/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_COIN1', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(btime_state::coin_inserted_irq_hi), 0)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:btime/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_COIN2', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(btime_state::coin_inserted_irq_hi), 0)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:btime/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:btime/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:1,2")'], name: 'Coin A', defaultValue: 3, location: 'SW1:1,2', settings: ['0=2C 1C', '3=1C 1C', '2=1C 2C', '1=1C 3C']};
MERGE (n:KG {id: 'inputs:btime/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW1:3,4")'], name: 'Coin B', defaultValue: 12, location: 'SW1:3,4', settings: ['0=2C 1C', '12=1C 1C', '8=1C 2C', '4=1C 3C']};
MERGE (n:KG {id: 'inputs:btime/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SW1:5")'], name: 'Leave Off', defaultValue: 16, location: 'SW1:5', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:btime/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused', defaultValue: 32};
MERGE (n:KG {id: 'inputs:btime/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW1:7")'], name: 'Cabinet', defaultValue: 0, location: 'SW1:7', settings: ['0=Upright', '64=Cocktail']};
MERGE (n:KG {id: 'inputs:btime/DSW1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:btime/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:btime/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW2:1")'], name: 'Lives', defaultValue: 1, location: 'SW2:1', settings: ['1=3', '0=5']};
MERGE (n:KG {id: 'inputs:btime/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 6, modifiers: ['PORT_DIPLOCATION("SW2:2,3")'], name: 'Bonus Life', defaultValue: 2, location: 'SW2:2,3', settings: ['6=10000', '4=15000', '2=20000', '0=30000']};
MERGE (n:KG {id: 'inputs:btime/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW2:4")'], name: 'Enemies', defaultValue: 8, location: 'SW2:4', settings: ['8=4', '0=6']};
MERGE (n:KG {id: 'inputs:btime/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SW2:5")'], name: 'End of Level Pepper', defaultValue: 0, location: 'SW2:5', settings: ['16=No', '0=Yes']};
MERGE (n:KG {id: 'inputs:btime/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused', defaultValue: 32};
MERGE (n:KG {id: 'inputs:btime/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 64};
MERGE (n:KG {id: 'inputs:btime/DSW2/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:tile16layout'}) SET n:GfxLayout SET n += {name: 'tile16layout', width: 16, height: 16, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [128, 129, 130, 131, 132, 133, 134, 135, 0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x3_planar', width: 8, height: 8, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_btime'}) SET n:GfxDecode SET n += {name: 'gfx_btime', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2132, sourceColumn: 8, sourceEndLine: 2132};
MERGE (n:KG {id: 'gfxdecode:gfx_btime/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'gfx_8x8x3_planar', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_btime/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'tile16layout', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_btime/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'tile16layout', colorBase: 8, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:btime_state.btime/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(btime_state::btime_palette)).set_format(palette_device::BGR_233_inverted, 16)', ownerTag: 'palette', targetClass: 'btime_state', targetMethod: 'btime_palette', entries: 16, sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2316};
MERGE (n:KG {id: 'handler:btime_state.btime_palette'}) SET n:Handler SET n += {method: 'btime_palette', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 429, sourceColumn: 1, sourceEndLine: 459, sourceParameters: 'palette_device &palette', sourceBody: '// Burger Time doesn\'t have a color PROM, but other games have.
	// This function is also used by Eggs.
	if (!memregion("proms"))
		return;

	uint8_t const *const color_prom = memregion("proms")->base();

	for (int i = 0; i < palette.entries(); i++)
	{
		// red component
		int bit0 = (color_prom[i] >> 0) & 0x01;
		int bit1 = (color_prom[i] >> 1) & 0x01;
		int bit2 = (color_prom[i] >> 2) & 0x01;
		int const r = 0x21 * bit0 + 0x47 * bit1 + 0x97 * bit2;

		// green component
		bit0 = (color_prom[i] >> 3) & 0x01;
		bit1 = (color_prom[i] >> 4) & 0x01;
		bit2 = (color_prom[i] >> 5) & 0x01;
		int const g = 0x21 * bit0 + 0x47 * bit1 + 0x97 * bit2;

		// blue component
		bit0 = (color_prom[i] >> 6) & 0x01;
		bit1 = (color_prom[i] >> 7) & 0x01;
		int const b = 0x52 * bit0 + 0xad * bit1;

		palette.set_pen_color(i, rgb_t(r, g, b));
	}'};
MATCH (a:KG {id: 'game:btime'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 3269, sourceColumn: 1, sourceEndLine: 3269};
MATCH (a:KG {id: 'game:btime'}), (b:KG {id: 'machine:btime_state.btime'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:btime'}), (b:KG {id: 'inputs:btime'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:btime'}), (b:KG {id: 'romset:btime'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:deco222.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:decocpu7.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:machine/input_merger.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:machine/timer.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:sound/discrete.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/dataeast/btime.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2297, sourceColumn: 1, sourceEndLine: 2340};
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'handler:btime_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/8vck'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/audionmi'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'gfxdecode:gfx_btime'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/ay1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/ay2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:btime_state.btime'}), (b:KG {id: 'device:btime_state.btime/discrete'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:btime'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1262, sourceColumn: 8, sourceEndLine: 1262};
MATCH (a:KG {id: 'inputs:btime'}), (b:KG {id: 'inputs:btime/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:btime'}), (b:KG {id: 'inputs:btime/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:btime'}), (b:KG {id: 'inputs:btime/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:btime'}), (b:KG {id: 'inputs:btime/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:btime'}), (b:KG {id: 'inputs:btime/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:btime'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2546, sourceColumn: 1, sourceEndLine: 2546};
MATCH (a:KG {id: 'romset:btime'}), (b:KG {id: 'region:btime/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:btime'}), (b:KG {id: 'region:btime/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:btime'}), (b:KG {id: 'region:btime/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:btime'}), (b:KG {id: 'region:btime/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:btime'}), (b:KG {id: 'region:btime/bg_map'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/maincpu'}), (b:KG {id: 'map:btime_state.btime_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:btime_state.btime/audiocpu'}), (b:KG {id: 'map:btime_state.audio_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:btime_state.btime/8vck'}), (b:KG {id: 'device:btime_state.btime/8vck/callback:8vck:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/audionmi'}), (b:KG {id: 'device:btime_state.btime/audionmi/callback:audionmi:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/screen'}), (b:KG {id: 'device:btime_state.btime/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_btime'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2132, sourceColumn: 8, sourceEndLine: 2132};
MATCH (a:KG {id: 'gfxdecode:gfx_btime'}), (b:KG {id: 'gfxdecode:gfx_btime/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_btime'}), (b:KG {id: 'gfxdecode:gfx_btime/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_btime'}), (b:KG {id: 'gfxdecode:gfx_btime/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/palette'}), (b:KG {id: 'device:btime_state.btime/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/soundlatch'}), (b:KG {id: 'device:btime_state.btime/soundlatch/callback:soundlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/ay1'}), (b:KG {id: 'audioroute:device:btime_state.btime/ay1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/ay1'}), (b:KG {id: 'audioroute:device:btime_state.btime/ay1/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/ay1'}), (b:KG {id: 'audioroute:device:btime_state.btime/ay1/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/ay1'}), (b:KG {id: 'device:btime_state.btime/ay1/callback:ay1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/ay2'}), (b:KG {id: 'audioroute:device:btime_state.btime/ay2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/ay2'}), (b:KG {id: 'audioroute:device:btime_state.btime/ay2/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/ay2'}), (b:KG {id: 'audioroute:device:btime_state.btime/ay2/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/discrete'}), (b:KG {id: 'audioroute:device:btime_state.btime/discrete/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:btime/P1'}), (b:KG {id: 'inputs:btime/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P1'}), (b:KG {id: 'inputs:btime/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P1'}), (b:KG {id: 'inputs:btime/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P1'}), (b:KG {id: 'inputs:btime/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P1'}), (b:KG {id: 'inputs:btime/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P1'}), (b:KG {id: 'inputs:btime/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P1'}), (b:KG {id: 'inputs:btime/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P1'}), (b:KG {id: 'inputs:btime/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P2'}), (b:KG {id: 'inputs:btime/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P2'}), (b:KG {id: 'inputs:btime/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P2'}), (b:KG {id: 'inputs:btime/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P2'}), (b:KG {id: 'inputs:btime/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P2'}), (b:KG {id: 'inputs:btime/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P2'}), (b:KG {id: 'inputs:btime/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P2'}), (b:KG {id: 'inputs:btime/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/P2'}), (b:KG {id: 'inputs:btime/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/SYSTEM'}), (b:KG {id: 'inputs:btime/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/SYSTEM'}), (b:KG {id: 'inputs:btime/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/SYSTEM'}), (b:KG {id: 'inputs:btime/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/SYSTEM'}), (b:KG {id: 'inputs:btime/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/SYSTEM'}), (b:KG {id: 'inputs:btime/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/SYSTEM'}), (b:KG {id: 'inputs:btime/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/SYSTEM'}), (b:KG {id: 'inputs:btime/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/SYSTEM'}), (b:KG {id: 'inputs:btime/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW1'}), (b:KG {id: 'inputs:btime/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW1'}), (b:KG {id: 'inputs:btime/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW1'}), (b:KG {id: 'inputs:btime/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW1'}), (b:KG {id: 'inputs:btime/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW1'}), (b:KG {id: 'inputs:btime/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW1'}), (b:KG {id: 'inputs:btime/DSW1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW2'}), (b:KG {id: 'inputs:btime/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW2'}), (b:KG {id: 'inputs:btime/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW2'}), (b:KG {id: 'inputs:btime/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW2'}), (b:KG {id: 'inputs:btime/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW2'}), (b:KG {id: 'inputs:btime/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW2'}), (b:KG {id: 'inputs:btime/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:btime/DSW2'}), (b:KG {id: 'inputs:btime/DSW2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:btime/maincpu'}), (b:KG {id: 'rom:btime/maincpu/aa04.9b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/maincpu'}), (b:KG {id: 'rom:btime/maincpu/aa06.13b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/maincpu'}), (b:KG {id: 'rom:btime/maincpu/aa05.10b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/maincpu'}), (b:KG {id: 'rom:btime/maincpu/aa07.15b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/audiocpu'}), (b:KG {id: 'rom:btime/audiocpu/ab14.12h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/gfx1'}), (b:KG {id: 'rom:btime/gfx1/aa12.7k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/gfx1'}), (b:KG {id: 'rom:btime/gfx1/ab13.9k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/gfx1'}), (b:KG {id: 'rom:btime/gfx1/ab10.10k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/gfx1'}), (b:KG {id: 'rom:btime/gfx1/ab11.12k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/gfx1'}), (b:KG {id: 'rom:btime/gfx1/aa8.13k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/gfx1'}), (b:KG {id: 'rom:btime/gfx1/ab9.15k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/gfx2'}), (b:KG {id: 'rom:btime/gfx2/ab00.1b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/gfx2'}), (b:KG {id: 'rom:btime/gfx2/ab01.3b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/gfx2'}), (b:KG {id: 'rom:btime/gfx2/ab02.4b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:btime/bg_map'}), (b:KG {id: 'rom:btime/bg_map/ab03.6b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1034, sourceColumn: 1, sourceEndLine: 1048};
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map'}), (b:KG {id: 'map:btime_state.btime_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.audio_map'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1214, sourceColumn: 1, sourceEndLine: 1224};
MATCH (a:KG {id: 'map:btime_state.audio_map'}), (b:KG {id: 'map:btime_state.audio_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.audio_map'}), (b:KG {id: 'map:btime_state.audio_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.audio_map'}), (b:KG {id: 'map:btime_state.audio_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.audio_map'}), (b:KG {id: 'map:btime_state.audio_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.audio_map'}), (b:KG {id: 'map:btime_state.audio_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.audio_map'}), (b:KG {id: 'map:btime_state.audio_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.audio_map'}), (b:KG {id: 'map:btime_state.audio_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.audio_map'}), (b:KG {id: 'map:btime_state.audio_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/8vck/callback:8vck:0'}), (b:KG {id: 'handler:btime_state.audio_nmi_gen'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/audionmi/callback:audionmi:0'}), (b:KG {id: 'device:btime_state.btime/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/screen/callback:screen:0'}), (b:KG {id: 'handler:btime_state.screen_update_btime'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_btime/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_btime/e1'}), (b:KG {id: 'gfxlayout:tile16layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_btime/e2'}), (b:KG {id: 'gfxlayout:tile16layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/palette/callback:palette_init'}), (b:KG {id: 'handler:btime_state.btime_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'device:btime_state.btime/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/ay1/callback:ay1:0'}), (b:KG {id: 'handler:btime_state.ay_audio_nmi_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map/range1'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:btime_state.btime_map/range4'}), (b:KG {id: 'handler:btime_state.btime_mirrorvideoram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map/range4'}), (b:KG {id: 'handler:btime_state.btime_mirrorvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map/range5'}), (b:KG {id: 'handler:btime_state.btime_mirrorcolorram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map/range5'}), (b:KG {id: 'handler:btime_state.btime_mirrorcolorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map/range8'}), (b:KG {id: 'handler:btime_state.btime_video_control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:btime_state.btime_map/range9'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:btime_state.btime_map/range10'}), (b:KG {id: 'handler:btime_state.bnj_scroll_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:btime_state.audio_map/range1'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:btime_state.audio_map/range2'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:btime_state.audio_map/range3'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:btime_state.audio_map/range4'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:btime_state.audio_map/range5'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:btime_state.audio_map/range6'}), (b:KG {id: 'handler:btime_state.audio_nmi_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:btime_state.screen_update_btime'}), (b:KG {id: 'handler:btime_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:btime_state.screen_update_btime'}), (b:KG {id: 'handler:btime_state.draw_background'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:btime_state.screen_update_btime'}), (b:KG {id: 'handler:btime_state.draw_chars'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x3_planar'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:tile16layout'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
