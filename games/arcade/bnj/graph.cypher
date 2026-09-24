// mamekit knowledge graph — driver src/mame/dataeast/btime.cpp
// generated 2026-09-24T02:25:50.540Z
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
MERGE (n:KG {id: 'game:brubber'}) SET n:Game SET n += {name: 'brubber', year: '1982', company: 'Data East', fullname: 'Burnin\' Rubber', monitor: 'ROT270', cls: 'btime_state', init: 'init_bnj', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 3281, sourceColumn: 1, sourceEndLine: 3281};
MERGE (n:KG {id: 'game:bnj'}) SET n:Game SET n += {name: 'bnj', year: '1982', company: 'Data East USA', fullname: 'Bump \'n\' Jump', monitor: 'ROT270', cls: 'btime_state', init: 'init_bnj', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 3282, sourceColumn: 1, sourceEndLine: 3282};
MERGE (n:KG {id: 'romset:brubber'}) SET n:RomSet SET n += {name: 'brubber', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2860, sourceColumn: 1, sourceEndLine: 2860};
MERGE (n:KG {id: 'region:brubber/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2547, sourceColumn: 2, sourceEndLine: 2547};
MERGE (n:KG {id: 'rom:brubber/maincpu/brubber.12c'}) SET n:Rom SET n += {file: 'brubber.12c', offset: 49152, size: 8192, crc: 'b5279c70', sha1: '5fb1c50040dc4e9444aed440e2c3cf4c79b72311', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2863, sourceColumn: 2, sourceEndLine: 2863};
MERGE (n:KG {id: 'rom:brubber/maincpu/brubber.12d'}) SET n:Rom SET n += {file: 'brubber.12d', offset: 57344, size: 8192, crc: 'b2ce51f5', sha1: '5e38ea24bcafef1faba023def96532abd6f97d38', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2864, sourceColumn: 2, sourceEndLine: 2864};
MERGE (n:KG {id: 'region:brubber/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2553, sourceColumn: 2, sourceEndLine: 2553};
MERGE (n:KG {id: 'rom:brubber/audiocpu/bnj6c.bin'}) SET n:Rom SET n += {file: 'bnj6c.bin', offset: 57344, size: 4096, crc: '8c02f662', sha1: '1279d564e65fd3ccac25b1f9fbb40d910de2b544', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2867, sourceColumn: 2, sourceEndLine: 2867};
MERGE (n:KG {id: 'region:brubber/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 24576, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2556, sourceColumn: 2, sourceEndLine: 2556};
MERGE (n:KG {id: 'rom:brubber/gfx1/bnj4e.bin'}) SET n:Rom SET n += {file: 'bnj4e.bin', offset: 0, size: 8192, crc: 'b864d082', sha1: 'cacf71fa6c0f7121d077381a0ff6222f534295ab', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2870, sourceColumn: 2, sourceEndLine: 2870};
MERGE (n:KG {id: 'rom:brubber/gfx1/bnj4f.bin'}) SET n:Rom SET n += {file: 'bnj4f.bin', offset: 8192, size: 8192, crc: '6c31d77a', sha1: '5e52554f594f569527af4768d244cc40a7b4460a', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2871, sourceColumn: 2, sourceEndLine: 2871};
MERGE (n:KG {id: 'rom:brubber/gfx1/bnj4h.bin'}) SET n:Rom SET n += {file: 'bnj4h.bin', offset: 16384, size: 8192, crc: '5824e6fb', sha1: 'e98f0eb476b8f033f5cc70a6e503afc4e651fd45', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2872, sourceColumn: 2, sourceEndLine: 2872};
MERGE (n:KG {id: 'region:brubber/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 8192, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2564, sourceColumn: 2, sourceEndLine: 2564};
MERGE (n:KG {id: 'rom:brubber/gfx2/bnj10e.bin'}) SET n:Rom SET n += {file: 'bnj10e.bin', offset: 0, size: 4096, crc: 'f4e9eb49', sha1: 'b356512d2ebd4e2005e76496b434e5ecebadb251', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2875, sourceColumn: 2, sourceEndLine: 2875};
MERGE (n:KG {id: 'rom:brubber/gfx2/bnj10f.bin'}) SET n:Rom SET n += {file: 'bnj10f.bin', offset: 4096, size: 4096, crc: 'a9ffacb4', sha1: '49d5f9c0b695f474197fbb761bacc065b6b5808a', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2876, sourceColumn: 2, sourceEndLine: 2876};
MERGE (n:KG {id: 'romset:bnj'}) SET n:RomSet SET n += {name: 'bnj', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2892, sourceColumn: 1, sourceEndLine: 2892};
MERGE (n:KG {id: 'region:bnj/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2547, sourceColumn: 2, sourceEndLine: 2547};
MERGE (n:KG {id: 'rom:bnj/maincpu/ad08.12b'}) SET n:Rom SET n += {file: 'ad08.12b', offset: 40960, size: 8192, crc: '8d649bd5', sha1: '83105718c2d18ef75ca18ae92b34545cb939bc02', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2894, sourceColumn: 2, sourceEndLine: 2894};
MERGE (n:KG {id: 'rom:bnj/maincpu/ad07.12c'}) SET n:Rom SET n += {file: 'ad07.12c', offset: 49152, size: 8192, crc: '7a27f5f4', sha1: 'f62d752bb7a995e120ed4d642793c543f0ef13ca', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2895, sourceColumn: 2, sourceEndLine: 2895};
MERGE (n:KG {id: 'rom:bnj/maincpu/ad06.12d'}) SET n:Rom SET n += {file: 'ad06.12d', offset: 57344, size: 8192, crc: 'f855a2d2', sha1: 'f231ed008537aeeeacbec64f485e9a96ab3441e1', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2896, sourceColumn: 2, sourceEndLine: 2896};
MERGE (n:KG {id: 'region:bnj/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2553, sourceColumn: 2, sourceEndLine: 2553};
MERGE (n:KG {id: 'rom:bnj/audiocpu/ad05.6c'}) SET n:Rom SET n += {file: 'ad05.6c', offset: 57344, size: 4096, crc: '8c02f662', sha1: '1279d564e65fd3ccac25b1f9fbb40d910de2b544', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2899, sourceColumn: 2, sourceEndLine: 2899};
MERGE (n:KG {id: 'region:bnj/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 24576, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2556, sourceColumn: 2, sourceEndLine: 2556};
MERGE (n:KG {id: 'rom:bnj/gfx1/ad00.4e'}) SET n:Rom SET n += {file: 'ad00.4e', offset: 0, size: 8192, crc: 'b864d082', sha1: 'cacf71fa6c0f7121d077381a0ff6222f534295ab', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2902, sourceColumn: 2, sourceEndLine: 2902};
MERGE (n:KG {id: 'rom:bnj/gfx1/ad01.4f'}) SET n:Rom SET n += {file: 'ad01.4f', offset: 8192, size: 8192, crc: '6c31d77a', sha1: '5e52554f594f569527af4768d244cc40a7b4460a', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2903, sourceColumn: 2, sourceEndLine: 2903};
MERGE (n:KG {id: 'rom:bnj/gfx1/ad02.4h'}) SET n:Rom SET n += {file: 'ad02.4h', offset: 16384, size: 8192, crc: '5824e6fb', sha1: 'e98f0eb476b8f033f5cc70a6e503afc4e651fd45', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2904, sourceColumn: 2, sourceEndLine: 2904};
MERGE (n:KG {id: 'region:bnj/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 8192, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2564, sourceColumn: 2, sourceEndLine: 2564};
MERGE (n:KG {id: 'rom:bnj/gfx2/ad03.10e'}) SET n:Rom SET n += {file: 'ad03.10e', offset: 0, size: 4096, crc: 'f4e9eb49', sha1: 'b356512d2ebd4e2005e76496b434e5ecebadb251', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2907, sourceColumn: 2, sourceEndLine: 2907};
MERGE (n:KG {id: 'rom:bnj/gfx2/ad04.10f'}) SET n:Rom SET n += {file: 'ad04.10f', offset: 4096, size: 4096, crc: 'a9ffacb4', sha1: '49d5f9c0b695f474197fbb761bacc065b6b5808a', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2908, sourceColumn: 2, sourceEndLine: 2908};
MERGE (n:KG {id: 'region:bnj/plds'}) SET n:RomRegion SET n += {tag: 'plds', size: 45, flags: '0', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2910, sourceColumn: 2, sourceEndLine: 2910};
MERGE (n:KG {id: 'rom:bnj/plds/pb-5.10k.bin'}) SET n:Rom SET n += {file: 'pb-5.10k.bin', offset: 0, size: 44, crc: 'dc72a65f', sha1: 'd61c149d4df93a2074debf7c5e46557c6b06d10d', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2911, sourceColumn: 2, sourceEndLine: 2911};
MERGE (n:KG {id: 'rom:bnj/plds/pb-4.2d.bin'}) SET n:Rom SET n += {file: 'pb-4.2d.bin', offset: 44, size: 1, crc: '', sha1: '', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2912, sourceColumn: 2, sourceEndLine: 2912, status: 'nodump'};
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
MERGE (n:KG {id: 'handler:btime_state.bnj_video_control_w'}) SET n:Handler SET n += {method: 'bnj_video_control_w', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 616, sourceColumn: 1, sourceEndLine: 630, sourceParameters: 'uint8_t data', sourceBody: '/* Bnj/Lnc work a little differently than the btime/eggs (apparently).
	   According to the information at:
	   http://www.davesclassics.com/arcade/Switch_Settings/BumpNJump.sw
	   SW8 is used for cocktail video selection (as opposed to controls),
	   but bit 7 of the input port is used for vblank input.
	   My guess is that this switch open circuits some connection to
	   the monitor hardware.
	   For now we just check 0x40 in DSW1, and ignore the write if we
	   are in upright controls mode. */

	if (m_dsw1->read() & 0x40) // cocktail mode
		btime_video_control_w(data);', inputMembers: ['m_dsw1=DSW1']};
MERGE (n:KG {id: 'handler:btime_state.bnj_scroll_w_1'}) SET n:Handler SET n += {method: 'bnj_scroll_w_1', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 601, sourceColumn: 1, sourceEndLine: 604, sourceConstants: ['Which=1'], sourceParameters: 'uint8_t data', sourceBody: 'm_bnj_scroll[Which] = data;'};
MERGE (n:KG {id: 'map:btime_state.bnj_map'}) SET n:AddressMap SET n += {cls: 'btime_state', name: 'bnj_map', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1138, sourceColumn: 1, sourceEndLine: 1156};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 2047, raw: 'map(0x0000, 0x07ff).ram()', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1140, sourceColumn: 2, sourceEndLine: 1140, ram: true};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range1'}) SET n:AddressRange SET n += {start: 4096, end: 4096, raw: 'map(0x1000, 0x1000).portr("DSW1")', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1141, sourceColumn: 2, sourceEndLine: 1141, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range2'}) SET n:AddressRange SET n += {start: 4097, end: 4097, raw: 'map(0x1001, 0x1001).portr("DSW2").w(FUNC(btime_state::bnj_video_control_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1142, sourceColumn: 2, sourceEndLine: 1142, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range3'}) SET n:AddressRange SET n += {start: 4098, end: 4098, raw: 'map(0x1002, 0x1002).portr("P1").w(m_soundlatch, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1143, sourceColumn: 2, sourceEndLine: 1143, portRead: 'P1'};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range4'}) SET n:AddressRange SET n += {start: 4099, end: 4099, raw: 'map(0x1003, 0x1003).portr("P2")', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1144, sourceColumn: 2, sourceEndLine: 1144, portRead: 'P2'};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range5'}) SET n:AddressRange SET n += {start: 4100, end: 4100, raw: 'map(0x1004, 0x1004).portr("SYSTEM")', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1145, sourceColumn: 2, sourceEndLine: 1145, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range6'}) SET n:AddressRange SET n += {start: 16384, end: 17407, raw: 'map(0x4000, 0x43ff).ram().share(m_videoram)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1146, sourceColumn: 2, sourceEndLine: 1146, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range7'}) SET n:AddressRange SET n += {start: 17408, end: 18431, raw: 'map(0x4400, 0x47ff).ram().share(m_colorram)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1147, sourceColumn: 2, sourceEndLine: 1147, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range8'}) SET n:AddressRange SET n += {start: 18432, end: 19455, raw: 'map(0x4800, 0x4bff).rw(FUNC(btime_state::btime_mirrorvideoram_r), FUNC(btime_state::btime_mirrorvideoram_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1148, sourceColumn: 2, sourceEndLine: 1148};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range9'}) SET n:AddressRange SET n += {start: 19456, end: 20479, raw: 'map(0x4c00, 0x4fff).rw(FUNC(btime_state::btime_mirrorcolorram_r), FUNC(btime_state::btime_mirrorcolorram_w))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1149, sourceColumn: 2, sourceEndLine: 1149};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range10'}) SET n:AddressRange SET n += {start: 20480, end: 20991, raw: 'map(0x5000, 0x51ff).ram().share(m_bnj_backgroundram)', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1150, sourceColumn: 2, sourceEndLine: 1150, ram: true, share: 'bnj_backgroundram'};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range11'}) SET n:AddressRange SET n += {start: 20992, end: 21503, raw: 'map(0x5200, 0x53ff).ram()', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1151, sourceColumn: 2, sourceEndLine: 1151, ram: true};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range12'}) SET n:AddressRange SET n += {start: 21504, end: 21504, raw: 'map(0x5400, 0x5400).w(FUNC(btime_state::bnj_scroll_w<0>))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1152, sourceColumn: 2, sourceEndLine: 1152};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range13'}) SET n:AddressRange SET n += {start: 22528, end: 22528, raw: 'map(0x5800, 0x5800).w(FUNC(btime_state::bnj_scroll_w<1>))', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1153, sourceColumn: 2, sourceEndLine: 1153};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range14'}) SET n:AddressRange SET n += {start: 23552, end: 23567, raw: 'map(0x5c00, 0x5c0f).ram().w(m_palette, FUNC(palette_device::write8)).share("palette")', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1154, sourceColumn: 2, sourceEndLine: 1154, ram: true, share: 'palette'};
MERGE (n:KG {id: 'map:btime_state.bnj_map/range15'}) SET n:AddressRange SET n += {start: 40960, end: 65535, raw: 'map(0xa000, 0xffff).rom()', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1155, sourceColumn: 2, sourceEndLine: 1155, rom: true};
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
MERGE (n:KG {id: 'device:btime_state.btime/maincpu'}) SET n:Device SET n += {type: 'DECO_C10707', tag: 'maincpu', clock: 750000, config: ['DECO_CPU7(config, m_maincpu, 12_MHz_XTAL / 2 / 2 / 2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &btime_state::btime_map)', 'DECO_C10707(config.replace(), m_maincpu, 12_MHz_XTAL / 2 / 2 / 2 / 2)'], member: 'm_maincpu', cls: 'deco_cpu7_device', clsHierarchy: ['deco_cpu7_device'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2300, sourceColumn: 2, sourceEndLine: 2300};
MERGE (n:KG {id: 'device:btime_state.btime/audiocpu'}) SET n:Device SET n += {type: 'M6502', tag: 'audiocpu', clock: 500000, config: ['M6502(config, m_audiocpu, 12_MHz_XTAL / 2 / 2 / 3 / 2)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &btime_state::audio_map)'], member: 'm_audiocpu', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2303, sourceColumn: 2, sourceEndLine: 2303};
MERGE (n:KG {id: 'device:btime_state.btime/8vck'}) SET n:Device SET n += {type: 'TIMER', tag: '8vck', clock: null, config: ['TIMER(config, "8vck").configure_scanline(FUNC(btime_state::audio_nmi_gen), "screen", 0, 8)'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2305, sourceColumn: 2, sourceEndLine: 2305};
MERGE (n:KG {id: 'device:btime_state.btime/8vck/callback:8vck:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "8vck").configure_scanline(FUNC(btime_state::audio_nmi_gen), "screen", 0, 8)', ownerTag: '8vck', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2305, sourceColumn: 2, sourceEndLine: 2305, scanlineStart: 0, scanlineIncrement: 8, targetClass: 'btime_state', targetMethod: 'audio_nmi_gen'};
MERGE (n:KG {id: 'handler:btime_state.audio_nmi_gen'}) SET n:Handler SET n += {method: 'audio_nmi_gen', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1028, sourceColumn: 1, sourceEndLine: 1032, sourceParameters: 'int param', sourceBody: 'int const scanline = param;
	m_audionmi->in_w<1>((scanline & 8) >> 3);'};
MERGE (n:KG {id: 'device:btime_state.btime/audionmi'}) SET n:Device SET n += {type: 'INPUT_MERGER_ALL_HIGH', tag: 'audionmi', clock: null, config: ['INPUT_MERGER_ALL_HIGH(config, "audionmi").output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)'], member: 'm_audionmi', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2307, sourceColumn: 2, sourceEndLine: 2307};
MERGE (n:KG {id: 'device:btime_state.btime/audionmi/callback:audionmi:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'INPUT_MERGER_ALL_HIGH(config, "audionmi").output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)', ownerTag: 'audionmi', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2307, sourceColumn: 2, sourceEndLine: 2307, inputLine: 'INPUT_LINE_NMI', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:btime_state.btime/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(12_MHz_XTAL / 2, 384, 8, 248, 272, 8, 248)', 'm_screen->set_screen_update(FUNC(btime_state::screen_update_btime))', 'm_screen->set_palette(m_palette)', 'm_screen->set_screen_update(FUNC(btime_state::screen_update_bnj))', 'm_screen->set_visarea(0*8, 32*8-1, 1*8, 31*8-1)'], member: 'm_screen', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2310, sourceColumn: 2, sourceEndLine: 2310, configCalls: ['set_raw(6000000,384,8,248,272,8,248)', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 8, 248, 272, 8, 248], screenRawExpr: ['12_MHz_XTAL / 2', '384', '8', '248', '272', '8', '248']};
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
MERGE (n:KG {id: 'machine:btime_state.bnj'}) SET n:MachineConfig SET n += {cls: 'btime_state', name: 'bnj', calls: ['btime'], stateMembers: ['{"name":"m_lnc_charbank","bits":8}', '{"name":"m_btime_palette","bits":8}', '{"name":"m_bnj_scroll","bits":8,"arrayLength":2}', '{"name":"m_btime_tilemap","bits":8,"arrayLength":4}', '{"name":"m_audio_nmi_enable_type","bits":8}'], resetHandlers: ['btime_state.machine_reset'], startHandlers: ['btime_state.video_start_bnj'], devicePatches: ['{"tag":"maincpu","config":["DECO_C10707(config.replace(), m_maincpu, 12_MHz_XTAL / 2 / 2 / 2 / 2)"],"replacementType":"DECO_C10707","clock":750000}', '{"tag":"screen","config":["m_screen->set_screen_update(FUNC(btime_state::screen_update_bnj))","m_screen->set_visarea(0*8, 32*8-1, 1*8, 31*8-1)"]}'], sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2394, sourceColumn: 1, sourceEndLine: 2409};
MERGE (n:KG {id: 'handler:btime_state.video_start_bnj'}) SET n:Handler SET n += {method: 'video_start_bnj', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 518, sourceColumn: 1, sourceEndLine: 526, sourceParameters: '', sourceBody: '// the background area is twice as wide as the screen
	int const width = 256;
	int const height = 256;
	m_background_bitmap = std::make_unique<bitmap_ind16>(2 * width, height);

	save_item(NAME(*m_background_bitmap));'};
MERGE (n:KG {id: 'machine:btime_state.bnj/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(btime_state::screen_update_bnj))', ownerTag: 'screen', targetClass: 'btime_state', targetMethod: 'screen_update_bnj'};
MERGE (n:KG {id: 'handler:btime_state.screen_update_bnj'}) SET n:Handler SET n += {method: 'screen_update_bnj', ownerClass: 'btime_state', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 830, sourceColumn: 1, sourceEndLine: 872, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'if (m_bnj_scroll[0])
	{
		for (int offs = m_bnj_backgroundram.bytes() - 1; offs >=0; offs--)
		{
			int sx = 16 * ((offs < 0x100) ? ((offs % 0x80) / 8) : ((offs % 0x80) / 8) + 16);
			int sy = 16 * (((offs % 0x100) < 0x80) ? offs % 8 : (offs % 8) + 8);
			sx = 496 - sx;

			if (flip_screen())
			{
				sx = 496 - sx;
				sy = 240 - sy;
			}

			m_gfxdecode->gfx(2)->opaque(*m_background_bitmap, m_background_bitmap->cliprect(),
					(m_bnj_backgroundram[offs] >> 4) + ((offs & 0x80) >> 3) + 32,
					0,
					flip_screen(), flip_screen(),
					sx, sy);
		}

		// copy the background bitmap to the screen
		int scroll = (m_bnj_scroll[0] & 0x02) * 128 + 511 - m_bnj_scroll[1];
		if (!flip_screen())
			scroll = 767 - scroll;
		copyscrollbitmap(bitmap, *m_background_bitmap, 1, &scroll, 0, nullptr, cliprect);

		/* copy the low priority characters followed by the sprites
		   then the high priority characters */
		draw_chars(bitmap, cliprect, true, 0, 1);
		draw_sprites(bitmap, cliprect, 0, 0, 0, m_videoram, 0x20);
		draw_chars(bitmap, cliprect, true, 0, 0);
	}
	else
	{
		draw_chars(bitmap, cliprect, false, 0, -1);
		draw_sprites(bitmap, cliprect, 0, 0, 0, m_videoram, 0x20);
	}

	return 0;'};
MERGE (n:KG {id: 'inputs:bnj'}) SET n:InputPorts SET n += {name: 'bnj', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1694, sourceColumn: 8, sourceEndLine: 1694};
MERGE (n:KG {id: 'inputs:bnj/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:bnj/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:bnj/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:bnj/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:bnj/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:bnj/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:bnj/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:bnj/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNUSED', defaultValue: 64};
MERGE (n:KG {id: 'inputs:bnj/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED', defaultValue: 128};
MERGE (n:KG {id: 'inputs:bnj/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:bnj/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:bnj/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:bnj/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:bnj/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:bnj/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:bnj/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:bnj/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNUSED', defaultValue: 64};
MERGE (n:KG {id: 'inputs:bnj/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED', defaultValue: 128};
MERGE (n:KG {id: 'inputs:bnj/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:bnj/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_TILT', defaultValue: 1};
MERGE (n:KG {id: 'inputs:bnj/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 2};
MERGE (n:KG {id: 'inputs:bnj/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 4};
MERGE (n:KG {id: 'inputs:bnj/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:bnj/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:bnj/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:bnj/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN1', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(btime_state::coin_inserted_nmi_lo), 0)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:bnj/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN2', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(btime_state::coin_inserted_nmi_lo), 0)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:bnj/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:bnj/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:1,2")'], name: 'Coin A', defaultValue: 3, location: 'SW1:1,2', settings: ['0=2C 1C', '3=1C 1C', '2=1C 2C', '1=1C 3C']};
MERGE (n:KG {id: 'inputs:bnj/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW1:3,4")'], name: 'Coin B', defaultValue: 12, location: 'SW1:3,4', settings: ['0=2C 1C', '12=1C 1C', '8=1C 2C', '4=1C 3C']};
MERGE (n:KG {id: 'inputs:bnj/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW1:5,6")'], name: 'Test Mode', defaultValue: 48, location: 'SW1:5,6', settings: ['48=Off', '32=All Tests', '0=RAM Test Only', '16=No Effect']};
MERGE (n:KG {id: 'inputs:bnj/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW1:7")'], name: 'Cabinet', defaultValue: 0, location: 'SW1:7', settings: ['0=Upright', '64=Cocktail']};
MERGE (n:KG {id: 'inputs:bnj/DSW1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bnj/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:bnj/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW2:1")'], name: 'Lives', defaultValue: 1, location: 'SW2:1', settings: ['1=3', '0=5']};
MERGE (n:KG {id: 'inputs:bnj/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 6, modifiers: ['PORT_DIPLOCATION("SW2:2,3")'], name: 'Bonus Life', defaultValue: 6, location: 'SW2:2,3', settings: ['6=Every 30000', '4=Every 70000', '2=20000 Only', '0=30000 Only']};
MERGE (n:KG {id: 'inputs:bnj/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW2:4")'], name: 'Allow Continue', defaultValue: 0, location: 'SW2:4', settings: ['8=No', '0=Yes']};
MERGE (n:KG {id: 'inputs:bnj/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SW2:5")'], name: 'Difficulty', defaultValue: 16, location: 'SW2:5', settings: ['16=Easy', '0=Hard']};
MERGE (n:KG {id: 'inputs:bnj/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unknown', defaultValue: 32};
MERGE (n:KG {id: 'inputs:bnj/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unknown', defaultValue: 64};
MERGE (n:KG {id: 'inputs:bnj/DSW2/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unknown', defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:tile16layout'}) SET n:GfxLayout SET n += {name: 'tile16layout', width: 16, height: 16, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [128, 129, 130, 131, 132, 133, 134, 135, 0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:bnj_tile16layout'}) SET n:GfxLayout SET n += {name: 'bnj_tile16layout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 3, planeOffsets: ['RGN_FRAC(1,2)+4', 'RGN_FRAC(0,2)+0', 'RGN_FRAC(0,2)+4'], xOffsets: [384, 385, 386, 387, 256, 257, 258, 259, 128, 129, 130, 131, 0, 1, 2, 3], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 512};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x3_planar', width: 8, height: 8, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_btime'}) SET n:GfxDecode SET n += {name: 'gfx_btime', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2132, sourceColumn: 8, sourceEndLine: 2132};
MERGE (n:KG {id: 'gfxdecode:gfx_btime/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'gfx_8x8x3_planar', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_btime/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'tile16layout', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_btime/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'tile16layout', colorBase: 8, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_bnj'}) SET n:GfxDecode SET n += {name: 'gfx_bnj', sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2149, sourceColumn: 8, sourceEndLine: 2149};
MERGE (n:KG {id: 'gfxdecode:gfx_bnj/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'gfx_8x8x3_planar', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_bnj/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'tile16layout', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_bnj/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'bnj_tile16layout', colorBase: 8, colorCount: 1, xscale: 1, yscale: 1};
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
MATCH (a:KG {id: 'game:bnj'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 3282, sourceColumn: 1, sourceEndLine: 3282};
MATCH (a:KG {id: 'game:bnj'}), (b:KG {id: 'game:brubber'}) MERGE (a)-[r:CLONE_OF]->(b);
MATCH (a:KG {id: 'game:bnj'}), (b:KG {id: 'machine:btime_state.bnj'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:bnj'}), (b:KG {id: 'inputs:bnj'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:bnj'}), (b:KG {id: 'romset:bnj'}) MERGE (a)-[r:USES_ROMSET]->(b);
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
MATCH (a:KG {id: 'game:brubber'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 3281, sourceColumn: 1, sourceEndLine: 3281};
MATCH (a:KG {id: 'game:brubber'}), (b:KG {id: 'romset:brubber'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'machine:btime_state.bnj'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2394, sourceColumn: 1, sourceEndLine: 2409};
MATCH (a:KG {id: 'machine:btime_state.bnj'}), (b:KG {id: 'handler:btime_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:btime_state.bnj'}), (b:KG {id: 'handler:btime_state.video_start_bnj'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:btime_state.bnj'}), (b:KG {id: 'machine:btime_state.btime'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:btime_state.bnj'}), (b:KG {id: 'map:btime_state.bnj_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:btime_state.bnj'}), (b:KG {id: 'gfxdecode:gfx_bnj'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode', override: true};
MATCH (a:KG {id: 'machine:btime_state.bnj'}), (b:KG {id: 'machine:btime_state.bnj/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:bnj'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1694, sourceColumn: 8, sourceEndLine: 1694};
MATCH (a:KG {id: 'inputs:bnj'}), (b:KG {id: 'inputs:bnj/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bnj'}), (b:KG {id: 'inputs:bnj/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bnj'}), (b:KG {id: 'inputs:bnj/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bnj'}), (b:KG {id: 'inputs:bnj/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bnj'}), (b:KG {id: 'inputs:bnj/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:bnj'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2892, sourceColumn: 1, sourceEndLine: 2892};
MATCH (a:KG {id: 'romset:bnj'}), (b:KG {id: 'region:bnj/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bnj'}), (b:KG {id: 'region:bnj/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bnj'}), (b:KG {id: 'region:bnj/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bnj'}), (b:KG {id: 'region:bnj/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bnj'}), (b:KG {id: 'region:bnj/plds'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:brubber'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2860, sourceColumn: 1, sourceEndLine: 2860};
MATCH (a:KG {id: 'romset:brubber'}), (b:KG {id: 'region:brubber/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:brubber'}), (b:KG {id: 'region:brubber/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:brubber'}), (b:KG {id: 'region:brubber/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:brubber'}), (b:KG {id: 'region:brubber/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
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
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 1138, sourceColumn: 1, sourceEndLine: 1156};
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map'}), (b:KG {id: 'map:btime_state.bnj_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bnj'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/dataeast/btime.cpp', sourceLine: 2149, sourceColumn: 8, sourceEndLine: 2149};
MATCH (a:KG {id: 'gfxdecode:gfx_bnj'}), (b:KG {id: 'gfxdecode:gfx_bnj/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bnj'}), (b:KG {id: 'gfxdecode:gfx_bnj/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bnj'}), (b:KG {id: 'gfxdecode:gfx_bnj/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'machine:btime_state.bnj/callback:screen:0'}), (b:KG {id: 'handler:btime_state.screen_update_bnj'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:bnj/P1'}), (b:KG {id: 'inputs:bnj/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P1'}), (b:KG {id: 'inputs:bnj/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P1'}), (b:KG {id: 'inputs:bnj/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P1'}), (b:KG {id: 'inputs:bnj/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P1'}), (b:KG {id: 'inputs:bnj/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P1'}), (b:KG {id: 'inputs:bnj/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P1'}), (b:KG {id: 'inputs:bnj/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P1'}), (b:KG {id: 'inputs:bnj/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P2'}), (b:KG {id: 'inputs:bnj/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P2'}), (b:KG {id: 'inputs:bnj/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P2'}), (b:KG {id: 'inputs:bnj/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P2'}), (b:KG {id: 'inputs:bnj/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P2'}), (b:KG {id: 'inputs:bnj/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P2'}), (b:KG {id: 'inputs:bnj/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P2'}), (b:KG {id: 'inputs:bnj/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/P2'}), (b:KG {id: 'inputs:bnj/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/SYSTEM'}), (b:KG {id: 'inputs:bnj/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/SYSTEM'}), (b:KG {id: 'inputs:bnj/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/SYSTEM'}), (b:KG {id: 'inputs:bnj/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/SYSTEM'}), (b:KG {id: 'inputs:bnj/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/SYSTEM'}), (b:KG {id: 'inputs:bnj/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/SYSTEM'}), (b:KG {id: 'inputs:bnj/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/SYSTEM'}), (b:KG {id: 'inputs:bnj/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/SYSTEM'}), (b:KG {id: 'inputs:bnj/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW1'}), (b:KG {id: 'inputs:bnj/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW1'}), (b:KG {id: 'inputs:bnj/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW1'}), (b:KG {id: 'inputs:bnj/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW1'}), (b:KG {id: 'inputs:bnj/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW1'}), (b:KG {id: 'inputs:bnj/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW2'}), (b:KG {id: 'inputs:bnj/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW2'}), (b:KG {id: 'inputs:bnj/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW2'}), (b:KG {id: 'inputs:bnj/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW2'}), (b:KG {id: 'inputs:bnj/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW2'}), (b:KG {id: 'inputs:bnj/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW2'}), (b:KG {id: 'inputs:bnj/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bnj/DSW2'}), (b:KG {id: 'inputs:bnj/DSW2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:bnj/maincpu'}), (b:KG {id: 'rom:bnj/maincpu/ad08.12b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/maincpu'}), (b:KG {id: 'rom:bnj/maincpu/ad07.12c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/maincpu'}), (b:KG {id: 'rom:bnj/maincpu/ad06.12d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/audiocpu'}), (b:KG {id: 'rom:bnj/audiocpu/ad05.6c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/gfx1'}), (b:KG {id: 'rom:bnj/gfx1/ad00.4e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/gfx1'}), (b:KG {id: 'rom:bnj/gfx1/ad01.4f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/gfx1'}), (b:KG {id: 'rom:bnj/gfx1/ad02.4h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/gfx2'}), (b:KG {id: 'rom:bnj/gfx2/ad03.10e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/gfx2'}), (b:KG {id: 'rom:bnj/gfx2/ad04.10f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/plds'}), (b:KG {id: 'rom:bnj/plds/pb-5.10k.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bnj/plds'}), (b:KG {id: 'rom:bnj/plds/pb-4.2d.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:brubber/maincpu'}), (b:KG {id: 'rom:brubber/maincpu/brubber.12c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:brubber/maincpu'}), (b:KG {id: 'rom:brubber/maincpu/brubber.12d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:brubber/audiocpu'}), (b:KG {id: 'rom:brubber/audiocpu/bnj6c.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:brubber/gfx1'}), (b:KG {id: 'rom:brubber/gfx1/bnj4e.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:brubber/gfx1'}), (b:KG {id: 'rom:brubber/gfx1/bnj4f.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:brubber/gfx1'}), (b:KG {id: 'rom:brubber/gfx1/bnj4h.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:brubber/gfx2'}), (b:KG {id: 'rom:brubber/gfx2/bnj10e.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:brubber/gfx2'}), (b:KG {id: 'rom:brubber/gfx2/bnj10f.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/maincpu'}), (b:KG {id: 'map:btime_state.btime_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:btime_state.btime/audiocpu'}), (b:KG {id: 'map:btime_state.audio_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:btime_state.btime/8vck'}), (b:KG {id: 'device:btime_state.btime/8vck/callback:8vck:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/audionmi'}), (b:KG {id: 'device:btime_state.btime/audionmi/callback:audionmi:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
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
MATCH (a:KG {id: 'map:btime_state.bnj_map/range2'}), (b:KG {id: 'handler:btime_state.bnj_video_control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map/range3'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:btime_state.bnj_map/range8'}), (b:KG {id: 'handler:btime_state.btime_mirrorvideoram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map/range8'}), (b:KG {id: 'handler:btime_state.btime_mirrorvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map/range9'}), (b:KG {id: 'handler:btime_state.btime_mirrorcolorram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map/range9'}), (b:KG {id: 'handler:btime_state.btime_mirrorcolorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map/range12'}), (b:KG {id: 'handler:btime_state.bnj_scroll_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map/range13'}), (b:KG {id: 'handler:btime_state.bnj_scroll_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:btime_state.bnj_map/range14'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'gfxdecode:gfx_bnj/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bnj/e1'}), (b:KG {id: 'gfxlayout:tile16layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bnj/e2'}), (b:KG {id: 'gfxlayout:bnj_tile16layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'handler:btime_state.screen_update_bnj'}), (b:KG {id: 'handler:btime_state.draw_chars'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:btime_state.screen_update_bnj'}), (b:KG {id: 'handler:btime_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
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
MATCH (a:KG {id: 'gfxdecode:gfx_btime/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_btime/e1'}), (b:KG {id: 'gfxlayout:tile16layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_btime/e2'}), (b:KG {id: 'gfxlayout:tile16layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/palette/callback:palette_init'}), (b:KG {id: 'handler:btime_state.btime_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'device:btime_state.btime/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:btime_state.btime/ay1/callback:ay1:0'}), (b:KG {id: 'handler:btime_state.ay_audio_nmi_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:btime_state.bnj_video_control_w'}), (b:KG {id: 'handler:btime_state.btime_video_control_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x3_planar'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:tile16layout'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:bnj_tile16layout'}), (b:KG {id: 'file:src/mame/dataeast/btime.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
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
