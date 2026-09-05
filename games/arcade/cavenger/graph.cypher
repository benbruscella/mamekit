// mamekit knowledge graph — driver src/mame/universal/ladybug.cpp
// generated 2026-09-05T03:49:17.877Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/universal/ladybug.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/universal/ladybug.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:ladybug_video.h'}) SET n:SourceFile SET n += {path: 'ladybug_video.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'game:cavenger'}) SET n:Game SET n += {name: 'cavenger', year: '1981', company: 'Universal', fullname: 'Cosmic Avenger', monitor: 'ROT0', cls: 'ladybug_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 896, sourceColumn: 1, sourceEndLine: 896};
MERGE (n:KG {id: 'romset:cavenger'}) SET n:RomSet SET n += {name: 'cavenger', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 815, sourceColumn: 1, sourceEndLine: 815};
MERGE (n:KG {id: 'region:cavenger/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 719, sourceColumn: 2, sourceEndLine: 719};
MERGE (n:KG {id: 'rom:cavenger/maincpu/1.c4'}) SET n:Rom SET n += {file: '1.c4', offset: 0, size: 4096, crc: '9e0cc781', sha1: 'f23bd6b9f427c26ac996a5c8ba29f356cf45c78a', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 817, sourceColumn: 2, sourceEndLine: 817};
MERGE (n:KG {id: 'rom:cavenger/maincpu/2.d4'}) SET n:Rom SET n += {file: '2.d4', offset: 4096, size: 4096, crc: '5ce5b950', sha1: '170e3f8be592dcccb8868474f40f8f2223e8a8b5', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 818, sourceColumn: 2, sourceEndLine: 818};
MERGE (n:KG {id: 'rom:cavenger/maincpu/3.e4'}) SET n:Rom SET n += {file: '3.e4', offset: 8192, size: 4096, crc: 'bc28218d', sha1: '4b0f1b38a5837b7ffc9aec6c28c6eb72cfa46226', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 819, sourceColumn: 2, sourceEndLine: 819};
MERGE (n:KG {id: 'rom:cavenger/maincpu/4.h4'}) SET n:Rom SET n += {file: '4.h4', offset: 12288, size: 4096, crc: '2b32e9f5', sha1: 'f8a7ea799d8ff9b4f830d064bb2f34a76729c336', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 820, sourceColumn: 2, sourceEndLine: 820};
MERGE (n:KG {id: 'rom:cavenger/maincpu/5.j4'}) SET n:Rom SET n += {file: '5.j4', offset: 16384, size: 4096, crc: 'd117153e', sha1: '622c90a6c3f0adc24fe8a1d4969075cbd55add4e', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 821, sourceColumn: 2, sourceEndLine: 821};
MERGE (n:KG {id: 'rom:cavenger/maincpu/6.k4'}) SET n:Rom SET n += {file: '6.k4', offset: 20480, size: 4096, crc: 'c7d366cb', sha1: 'ec4981fe34abf992acbd6325b2c756c58ff80b04', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 822, sourceColumn: 2, sourceEndLine: 822};
MERGE (n:KG {id: 'region:cavenger/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 8192, flags: '0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 732, sourceColumn: 2, sourceEndLine: 732};
MERGE (n:KG {id: 'rom:cavenger/gfx1/9.f7'}) SET n:Rom SET n += {file: '9.f7', offset: 0, size: 4096, crc: '63357785', sha1: '20eaa866b7700535312fd415edaea94408ff3e3d', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 825, sourceColumn: 2, sourceEndLine: 825};
MERGE (n:KG {id: 'rom:cavenger/gfx1/0.h7'}) SET n:Rom SET n += {file: '0.h7', offset: 4096, size: 4096, crc: '52ad1133', sha1: 'bc8c52c6ba919287773ff6a4ec793ebd95176130', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 826, sourceColumn: 2, sourceEndLine: 826};
MERGE (n:KG {id: 'region:cavenger/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 8192, flags: '0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 736, sourceColumn: 2, sourceEndLine: 736};
MERGE (n:KG {id: 'rom:cavenger/gfx2/8.l7'}) SET n:Rom SET n += {file: '8.l7', offset: 0, size: 4096, crc: 'b022bf2d', sha1: '85f78d5a1e5782587bb66ad101a94fd0d62fb790', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 829, sourceColumn: 2, sourceEndLine: 829};
MERGE (n:KG {id: 'region:cavenger/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 96, flags: '0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 740, sourceColumn: 2, sourceEndLine: 740};
MERGE (n:KG {id: 'rom:cavenger/proms/10-2.k1'}) SET n:Rom SET n += {file: '10-2.k1', offset: 0, size: 32, crc: '42a24dd5', sha1: '03175ee7f8e11896a89d7cc0d614a78a49923627', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 741, sourceColumn: 2, sourceEndLine: 741};
MERGE (n:KG {id: 'rom:cavenger/proms/10-1.f4'}) SET n:Rom SET n += {file: '10-1.f4', offset: 32, size: 32, crc: 'd736b8de', sha1: '4c9c76826f3a2a631d01fd2531d55318172b0c12', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742};
MERGE (n:KG {id: 'rom:cavenger/proms/10-3.c4'}) SET n:Rom SET n += {file: '10-3.c4', offset: 64, size: 32, crc: '27fa3a50', sha1: '7cf59b7a37c156640d6ea91554d1c4276c1780e0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 743, sourceColumn: 2, sourceEndLine: 743};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map'}) SET n:AddressMap SET n += {cls: 'ladybug_state', name: 'ladybug_map', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 229, sourceColumn: 1, sourceEndLine: 244};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 24575, raw: 'map(0x0000, 0x5fff).rom()', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 231, sourceColumn: 2, sourceEndLine: 231, rom: true};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range1'}) SET n:AddressRange SET n += {start: 24576, end: 28671, raw: 'map(0x6000, 0x6fff).ram()', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 232, sourceColumn: 2, sourceEndLine: 232, ram: true};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range2'}) SET n:AddressRange SET n += {start: 28672, end: 29695, raw: 'map(0x7000, 0x73ff).w(m_video, FUNC(ladybug_video_device::spr_w))', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 233, sourceColumn: 2, sourceEndLine: 233};
MERGE (n:KG {id: 'handler:ladybug_video_device.spr_w'}) SET n:Handler SET n += {method: 'spr_w', ownerClass: 'ladybug_video_device', sourceFile: 'src/mame/universal/ladybug_video.h', sourceLine: 21, sourceColumn: 1, sourceEndLine: 21, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'm_spr_ram[offset & 0x03ff] = data;'};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range3'}) SET n:AddressRange SET n += {start: 32768, end: 36863, raw: 'map(0x8000, 0x8fff).nopr()', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 234, sourceColumn: 2, sourceEndLine: 234, nopr: true};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range4'}) SET n:AddressRange SET n += {start: 36864, end: 36864, raw: 'map(0x9000, 0x9000).portr("IN0")', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 235, sourceColumn: 2, sourceEndLine: 235, portRead: 'IN0'};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range5'}) SET n:AddressRange SET n += {start: 36865, end: 36865, raw: 'map(0x9001, 0x9001).portr("IN1")', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 236, sourceColumn: 2, sourceEndLine: 236, portRead: 'IN1'};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range6'}) SET n:AddressRange SET n += {start: 36866, end: 36866, raw: 'map(0x9002, 0x9002).portr("DSW0")', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 237, sourceColumn: 2, sourceEndLine: 237, portRead: 'DSW0'};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range7'}) SET n:AddressRange SET n += {start: 36867, end: 36867, raw: 'map(0x9003, 0x9003).portr("DSW1")', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 238, sourceColumn: 2, sourceEndLine: 238, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range8'}) SET n:AddressRange SET n += {start: 40960, end: 40967, raw: 'map(0xa000, 0xa007).w("videolatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 239, sourceColumn: 2, sourceEndLine: 239};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 239, sourceColumn: 2, sourceEndLine: 239};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range9'}) SET n:AddressRange SET n += {start: 45056, end: 49151, raw: 'map(0xb000, 0xbfff).w("sn1", FUNC(sn76489_device::write))', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 240, sourceColumn: 2, sourceEndLine: 240};
MERGE (n:KG {id: 'handler:sn76489_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'sn76489_device', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 241, sourceColumn: 2, sourceEndLine: 241};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range10'}) SET n:AddressRange SET n += {start: 49152, end: 53247, raw: 'map(0xc000, 0xcfff).w("sn2", FUNC(sn76489_device::write))', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 241, sourceColumn: 2, sourceEndLine: 241};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range11'}) SET n:AddressRange SET n += {start: 53248, end: 55295, raw: 'map(0xd000, 0xd7ff).rw(m_video, FUNC(ladybug_video_device::bg_r), FUNC(ladybug_video_device::bg_w))', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 242, sourceColumn: 2, sourceEndLine: 242};
MERGE (n:KG {id: 'handler:ladybug_video_device.bg_r'}) SET n:Handler SET n += {method: 'bg_r', ownerClass: 'ladybug_video_device', sourceFile: 'src/mame/universal/ladybug_video.h', sourceLine: 22, sourceColumn: 1, sourceEndLine: 22, sourceParameters: 'offs_t offset', sourceBody: 'return m_bg_ram[offset & 0x07ff];'};
MERGE (n:KG {id: 'handler:ladybug_video_device.bg_w'}) SET n:Handler SET n += {method: 'bg_w', ownerClass: 'ladybug_video_device', sourceFile: 'src/mame/universal/ladybug_video.cpp', sourceLine: 40, sourceColumn: 1, sourceEndLine: 44, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'm_bg_ram[offset & 0x07ff] = data;
	m_bg_tilemap->mark_tile_dirty(offset & 0x03ff);'};
MERGE (n:KG {id: 'map:ladybug_state.ladybug_map/range12'}) SET n:AddressRange SET n += {start: 57344, end: 57344, raw: 'map(0xe000, 0xe000).portr("IN2")', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 243, sourceColumn: 2, sourceEndLine: 243, portRead: 'IN2'};
MERGE (n:KG {id: 'machine:ladybug_state.ladybug'}) SET n:MachineConfig SET n += {cls: 'ladybug_state', name: 'ladybug', calls: [], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 678, sourceColumn: 1, sourceEndLine: 703};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 4000000, config: ['Z80(config, m_maincpu, 4_MHz_XTAL)', 'm_maincpu->set_addrmap(AS_PROGRAM, &ladybug_state::ladybug_map)'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 681, sourceColumn: 2, sourceEndLine: 681};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(9.828_MHz_XTAL / 2, 312, 8, 248, 262, 32, 224)', 'screen.set_screen_update(FUNC(ladybug_state::screen_update_ladybug))', 'screen.set_palette("palette")'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 685, sourceColumn: 2, sourceEndLine: 685, configCalls: ['set_raw(4914000,312,8,248,262,32,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [4914000, 312, 8, 248, 262, 32, 224], screenRawExpr: ['9.828_MHz_XTAL / 2', '312', '8', '248', '262', '32', '224']};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(ladybug_state::screen_update_ladybug))', ownerTag: 'screen', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 687, sourceColumn: 2, sourceEndLine: 687, targetClass: 'ladybug_state', targetMethod: 'screen_update_ladybug'};
MERGE (n:KG {id: 'handler:ladybug_state.screen_update_ladybug'}) SET n:Handler SET n += {method: 'screen_update_ladybug', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 216, sourceColumn: 1, sourceEndLine: 221, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'bitmap.fill(0, cliprect);
	m_video->draw(screen, bitmap, cliprect, flip_screen());
	return 0;'};
MERGE (n:KG {id: 'handler:ladybug_video_device.draw'}) SET n:Handler SET n += {method: 'draw', ownerClass: 'ladybug_video_device', sourceFile: 'src/mame/universal/ladybug_video.cpp', sourceLine: 54, sourceColumn: 1, sourceEndLine: 65, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, rectangle const &cliprect, bool flip', sourceBody: '// TODO: confirm whether sraider hardware actually does this - not used by the game
	for (unsigned offs = 0; offs < 32; ++offs)
	{
		int const scroll = m_bg_ram[((offs & 0x03) << 5) | (offs >> 2)];
		m_bg_tilemap->set_scrollx(offs, flip ? -scroll : scroll);
	}

	m_bg_tilemap->draw(screen, bitmap, cliprect, 0);
	draw_sprites(bitmap, cliprect);'};
MERGE (n:KG {id: 'handler:ladybug_video_device.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'ladybug_video_device', sourceFile: 'src/mame/universal/ladybug_video.cpp', sourceLine: 67, sourceColumn: 1, sourceEndLine: 111, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'for (int offs = 0x400 - (0x40 << 1); (0x40 << 1) <= offs; offs -= 0x40)
	{
		// find last valid sprite of current block
		int i = 0;
		while ((0x40 > i) && m_spr_ram[offs + i])
			i += 4;

		while (0 < i)
		{
			i -= 4;

			/*
			 abccdddd eeeeeeee fffghhhh iiiiiiii

			 a: enable?
			 b: size (0 = 8x8, 1 = 16x16)
			 c: flip
			 d: fine-y (coarse-y is from offset)
			 e: sprite code (shift right 2 bits for 16x16 sprites)
			 f: unknown
			 g: sprite bank
			 h: color
			 i: x position
			*/

			if (m_spr_ram[offs + i] & 0x80)
			{
				bool const big(m_spr_ram[offs + i] & 0x40);
				bool const xflip(m_spr_ram[offs + i] & 0x20);
				bool const yflip(m_spr_ram[offs + i] & 0x10);
				int const code(m_spr_ram[offs + i + 1] | (BIT(m_spr_ram[offs + i + 2], 4) << 8));
				int const color(m_spr_ram[offs + i + 2] & 0x0f);
				int const xpos(m_spr_ram[offs + i + 3]);
				int const ypos((offs >> 2) | (m_spr_ram[offs + i] & 0x0f));

				if (big) // 16x16
					m_gfxdecode->gfx(1)->transpen(bitmap, cliprect, code >> 2, color, xflip, yflip, xpos, ypos - 8, 0);
				else // 8x8
					m_gfxdecode->gfx(2)->transpen(bitmap, cliprect, code, color, xflip, yflip, xpos, ypos, 0);
			}
		}
	}'};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, "gfxdecode", "palette", gfx_ladybug)'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 690, sourceColumn: 2, sourceEndLine: 690, clockExpr: '"palette"'};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, "palette", FUNC(ladybug_state::ladybug_palette), 4*8 + 4*16, 32)'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 691, sourceColumn: 2, sourceEndLine: 691, clockExpr: 'FUNC(ladybug_state::ladybug_palette)'};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/video'}) SET n:Device SET n += {type: 'LADYBUG_VIDEO', tag: 'video', clock: 4000000, config: ['LADYBUG_VIDEO(config, m_video, 4000000).set_gfxdecode_tag("gfxdecode")'], cls: 'ladybug_video_device', clsHierarchy: ['ladybug_video_device'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 693, sourceColumn: 2, sourceEndLine: 693};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/videolatch'}) SET n:Device SET n += {type: 'LS259', tag: 'videolatch', clock: null, config: ['ls259_device &videolatch(LS259(config, "videolatch"))', 'videolatch.q_out_cb<0>().set(FUNC(ladybug_state::flip_screen_set))'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 695, sourceColumn: 2, sourceEndLine: 695};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/videolatch/callback:videolatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'videolatch.q_out_cb<0>().set(FUNC(ladybug_state::flip_screen_set))', ownerTag: 'videolatch', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 696, sourceColumn: 2, sourceEndLine: 696, slot: '0', targetClass: 'ladybug_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:ladybug_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 696, sourceColumn: 2, sourceEndLine: 696};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 699, sourceColumn: 2, sourceEndLine: 699};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/sn1'}) SET n:Device SET n += {type: 'SN76489', tag: 'sn1', clock: 4000000, config: ['SN76489(config, "sn1", 4_MHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 701, sourceColumn: 2, sourceEndLine: 701};
MERGE (n:KG {id: 'audioroute:device:ladybug_state.ladybug/sn1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'SN76489(config, "sn1", 4_MHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 701, sourceColumn: 2, sourceEndLine: 701};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/sn2'}) SET n:Device SET n += {type: 'SN76489', tag: 'sn2', clock: 4000000, config: ['SN76489(config, "sn2", 4_MHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702};
MERGE (n:KG {id: 'audioroute:device:ladybug_state.ladybug/sn2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'SN76489(config, "sn2", 4_MHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702};
MERGE (n:KG {id: 'inputs:cavenger'}) SET n:InputPorts SET n += {name: 'cavenger', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 458, sourceColumn: 8, sourceEndLine: 458};
MERGE (n:KG {id: 'inputs:cavenger/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:cavenger/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:cavenger/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:cavenger/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:cavenger/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:cavenger/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:cavenger/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:cavenger/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:cavenger/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_TILT', defaultValue: 128};
MERGE (n:KG {id: 'inputs:cavenger/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:cavenger/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:cavenger/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:cavenger/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:cavenger/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:cavenger/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:cavenger/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:cavenger/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:cavenger/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:cavenger/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:cavenger/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 1};
MERGE (n:KG {id: 'inputs:cavenger/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:cavenger/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 252, activeLow: true, type: 'IPT_UNUSED', defaultValue: 252};
MERGE (n:KG {id: 'inputs:cavenger/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: false};
MERGE (n:KG {id: 'inputs:cavenger/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SWA(J2):8,7")'], name: 'Difficulty', defaultValue: 3, location: 'SWA(J2):8,7', settings: ['3=Easy', '2=Medium', '1=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:cavenger/DSW0/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SWA(J2):6")'], name: 'High Score Names', defaultValue: 4, location: 'SWA(J2):6', settings: ['0=3 Letters', '4=10 Letters']};
MERGE (n:KG {id: 'inputs:cavenger/DSW0/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SWA(J2):5")'], name: 'Cabinet', defaultValue: 0, location: 'SWA(J2):5', settings: ['0=Upright', '8=Cocktail']};
MERGE (n:KG {id: 'inputs:cavenger/DSW0/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SWA(J2):4,3")'], name: 'Initial High Score', defaultValue: 0, location: 'SWA(J2):4,3', settings: ['0=0', '48=5000', '32=8000', '16=10000']};
MERGE (n:KG {id: 'inputs:cavenger/DSW0/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_DIPLOCATION("SWA(J2):2,1")'], name: 'Lives', defaultValue: 192, location: 'SWA(J2):2,1', settings: ['0=2', '192=3', '128=4', '64=5']};
MERGE (n:KG {id: 'inputs:cavenger/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:cavenger/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION("SWB(K2):8,7,6,5")'], name: 'Coin B', defaultValue: 15, location: 'SWB(K2):8,7,6,5', settings: ['6=4C 1C', '8=3C 1C', '10=2C 1C', '7=3C 2C', '15=1C 1C', '9=2C 3C', '14=1C 2C', '13=1C 3C', '12=1C 4C', '11=1C 5C']};
MERGE (n:KG {id: 'inputs:cavenger/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION("SWB(K2):4,3,2,1")'], name: 'Coin A', defaultValue: 240, location: 'SWB(K2):4,3,2,1', settings: ['96=4C 1C', '128=3C 1C', '160=2C 1C', '112=3C 2C', '240=1C 1C', '144=2C 3C', '224=1C 2C', '208=1C 3C', '192=1C 4C', '176=1C 5C']};
MERGE (n:KG {id: 'inputs:cavenger/COIN'}) SET n:Port SET n += {tag: 'COIN', modify: false};
MERGE (n:KG {id: 'inputs:cavenger/COIN/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_COIN1', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(ladybug_state::coin1_inserted), 0)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:cavenger/COIN/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_COIN2', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(ladybug_state::coin2_inserted), 0)'], defaultValue: 0};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 512, planes: 2, planeOffsets: [0, 32768], xOffsets: [7, 6, 5, 4, 3, 2, 1, 0], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 128, planes: 2, planeOffsets: [1, 0], xOffsets: [0, 2, 4, 6, 8, 10, 12, 14, 128, 130, 132, 134, 136, 138, 140, 142], yOffsets: [368, 352, 336, 320, 304, 288, 272, 256, 112, 96, 80, 64, 48, 32, 16, 0], charIncrement: 512};
MERGE (n:KG {id: 'gfxlayout:spritelayout2'}) SET n:GfxLayout SET n += {name: 'spritelayout2', width: 8, height: 8, total: 512, planes: 2, planeOffsets: [1, 0], xOffsets: [0, 2, 4, 6, 8, 10, 12, 14], yOffsets: [112, 96, 80, 64, 48, 32, 16, 0], charIncrement: 128};
MERGE (n:KG {id: 'gfxdecode:gfx_ladybug'}) SET n:GfxDecode SET n += {name: 'gfx_ladybug', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 666, sourceColumn: 8, sourceEndLine: 666};
MERGE (n:KG {id: 'gfxdecode:gfx_ladybug/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 8, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_ladybug/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout', colorBase: 32, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_ladybug/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout2', colorBase: 32, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, "palette", FUNC(ladybug_state::ladybug_palette), 4*8 + 4*16, 32)', ownerTag: 'palette', targetClass: 'ladybug_state', targetMethod: 'ladybug_palette', entries: 32, sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 691};
MERGE (n:KG {id: 'handler:ladybug_state.ladybug_palette'}) SET n:Handler SET n += {method: 'ladybug_palette', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 157, sourceColumn: 1, sourceEndLine: 214, sourceParameters: 'palette_device &palette', sourceBody: '// compute the color output resistor weights
	double rweights[2], gweights[2], bweights[2];
	compute_resistor_weights(0, 255, -1.0,
			2, resistances, rweights, 470, 0,
			2, resistances, gweights, 470, 0,
			2, resistances, bweights, 470, 0);

	const u8 *color_prom = memregion("proms")->base();

	// create a lookup table for the palette
	for (int i = 0; i < 0x20; i++)
	{
		int bit0, bit1;

		// red component
		bit0 = BIT(~color_prom[i], 0);
		bit1 = BIT(~color_prom[i], 5);
		int const r = combine_weights(rweights, bit0, bit1);

		// green component
		bit0 = BIT(~color_prom[i], 2);
		bit1 = BIT(~color_prom[i], 6);
		int const g = combine_weights(gweights, bit0, bit1);

		// blue component
		bit0 = BIT(~color_prom[i], 4);
		bit1 = BIT(~color_prom[i], 7);
		int const b = combine_weights(bweights, bit0, bit1);

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	// color_prom now points to the beginning of the lookup table
	color_prom += 0x20;

	// characters
	for (int i = 0; i < 0x20; i++)
	{
		u8 const ctabentry = ((i << 3) & 0x18) | ((i >> 2) & 0x07);
		palette.set_pen_indirect(i, ctabentry);
	}

	// sprites
	for (int i = 0; i < 0x20; i++)
	{
		u8 ctabentry;

		ctabentry = bitswap<4>((color_prom[i] >> 0) & 0x0f, 0,1,2,3);
		palette.set_pen_indirect(i + 0x20, ctabentry);

		ctabentry = bitswap<4>((color_prom[i] >> 4) & 0x0f, 0,1,2,3);
		palette.set_pen_indirect(i + 0x40, ctabentry);
	}'};
MATCH (a:KG {id: 'game:cavenger'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 896, sourceColumn: 1, sourceEndLine: 896};
MATCH (a:KG {id: 'game:cavenger'}), (b:KG {id: 'machine:ladybug_state.ladybug'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:cavenger'}), (b:KG {id: 'inputs:cavenger'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:cavenger'}), (b:KG {id: 'romset:cavenger'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:ladybug_video.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/ladybug.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 678, sourceColumn: 1, sourceEndLine: 703};
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'device:ladybug_state.ladybug/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'device:ladybug_state.ladybug/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'device:ladybug_state.ladybug/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'gfxdecode:gfx_ladybug'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'device:ladybug_state.ladybug/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'device:ladybug_state.ladybug/video'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'device:ladybug_state.ladybug/videolatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'device:ladybug_state.ladybug/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'device:ladybug_state.ladybug/sn1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ladybug_state.ladybug'}), (b:KG {id: 'device:ladybug_state.ladybug/sn2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:cavenger'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 458, sourceColumn: 8, sourceEndLine: 458};
MATCH (a:KG {id: 'inputs:cavenger'}), (b:KG {id: 'inputs:cavenger/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:cavenger'}), (b:KG {id: 'inputs:cavenger/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:cavenger'}), (b:KG {id: 'inputs:cavenger/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:cavenger'}), (b:KG {id: 'inputs:cavenger/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:cavenger'}), (b:KG {id: 'inputs:cavenger/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:cavenger'}), (b:KG {id: 'inputs:cavenger/COIN'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:cavenger'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 815, sourceColumn: 1, sourceEndLine: 815};
MATCH (a:KG {id: 'romset:cavenger'}), (b:KG {id: 'region:cavenger/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:cavenger'}), (b:KG {id: 'region:cavenger/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:cavenger'}), (b:KG {id: 'region:cavenger/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:cavenger'}), (b:KG {id: 'region:cavenger/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/maincpu'}), (b:KG {id: 'map:ladybug_state.ladybug_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:ladybug_state.ladybug/screen'}), (b:KG {id: 'device:ladybug_state.ladybug/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 666, sourceColumn: 8, sourceEndLine: 666};
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug'}), (b:KG {id: 'gfxdecode:gfx_ladybug/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug'}), (b:KG {id: 'gfxdecode:gfx_ladybug/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug'}), (b:KG {id: 'gfxdecode:gfx_ladybug/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/palette'}), (b:KG {id: 'device:ladybug_state.ladybug/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/videolatch'}), (b:KG {id: 'device:ladybug_state.ladybug/videolatch/callback:videolatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/sn1'}), (b:KG {id: 'audioroute:device:ladybug_state.ladybug/sn1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/sn2'}), (b:KG {id: 'audioroute:device:ladybug_state.ladybug/sn2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN0'}), (b:KG {id: 'inputs:cavenger/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN0'}), (b:KG {id: 'inputs:cavenger/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN0'}), (b:KG {id: 'inputs:cavenger/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN0'}), (b:KG {id: 'inputs:cavenger/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN0'}), (b:KG {id: 'inputs:cavenger/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN0'}), (b:KG {id: 'inputs:cavenger/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN0'}), (b:KG {id: 'inputs:cavenger/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN0'}), (b:KG {id: 'inputs:cavenger/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN1'}), (b:KG {id: 'inputs:cavenger/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN1'}), (b:KG {id: 'inputs:cavenger/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN1'}), (b:KG {id: 'inputs:cavenger/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN1'}), (b:KG {id: 'inputs:cavenger/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN1'}), (b:KG {id: 'inputs:cavenger/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN1'}), (b:KG {id: 'inputs:cavenger/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN1'}), (b:KG {id: 'inputs:cavenger/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN1'}), (b:KG {id: 'inputs:cavenger/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN2'}), (b:KG {id: 'inputs:cavenger/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN2'}), (b:KG {id: 'inputs:cavenger/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/IN2'}), (b:KG {id: 'inputs:cavenger/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/DSW0'}), (b:KG {id: 'inputs:cavenger/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/DSW0'}), (b:KG {id: 'inputs:cavenger/DSW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/DSW0'}), (b:KG {id: 'inputs:cavenger/DSW0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/DSW0'}), (b:KG {id: 'inputs:cavenger/DSW0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/DSW0'}), (b:KG {id: 'inputs:cavenger/DSW0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/DSW1'}), (b:KG {id: 'inputs:cavenger/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/DSW1'}), (b:KG {id: 'inputs:cavenger/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/COIN'}), (b:KG {id: 'inputs:cavenger/COIN/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cavenger/COIN'}), (b:KG {id: 'inputs:cavenger/COIN/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:cavenger/maincpu'}), (b:KG {id: 'rom:cavenger/maincpu/1.c4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/maincpu'}), (b:KG {id: 'rom:cavenger/maincpu/2.d4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/maincpu'}), (b:KG {id: 'rom:cavenger/maincpu/3.e4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/maincpu'}), (b:KG {id: 'rom:cavenger/maincpu/4.h4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/maincpu'}), (b:KG {id: 'rom:cavenger/maincpu/5.j4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/maincpu'}), (b:KG {id: 'rom:cavenger/maincpu/6.k4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/gfx1'}), (b:KG {id: 'rom:cavenger/gfx1/9.f7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/gfx1'}), (b:KG {id: 'rom:cavenger/gfx1/0.h7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/gfx2'}), (b:KG {id: 'rom:cavenger/gfx2/8.l7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/proms'}), (b:KG {id: 'rom:cavenger/proms/10-2.k1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/proms'}), (b:KG {id: 'rom:cavenger/proms/10-1.f4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:cavenger/proms'}), (b:KG {id: 'rom:cavenger/proms/10-3.c4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 229, sourceColumn: 1, sourceEndLine: 244};
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map'}), (b:KG {id: 'map:ladybug_state.ladybug_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/screen/callback:screen:0'}), (b:KG {id: 'handler:ladybug_state.screen_update_ladybug'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug/e2'}), (b:KG {id: 'gfxlayout:spritelayout2'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/palette/callback:palette_init'}), (b:KG {id: 'handler:ladybug_state.ladybug_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/videolatch/callback:videolatch:0'}), (b:KG {id: 'handler:ladybug_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map/range2'}), (b:KG {id: 'handler:ladybug_video_device.spr_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map/range8'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'videolatch'};
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map/range9'}), (b:KG {id: 'handler:sn76489_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn1'};
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map/range10'}), (b:KG {id: 'handler:sn76489_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn2'};
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map/range11'}), (b:KG {id: 'handler:ladybug_video_device.bg_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'map:ladybug_state.ladybug_map/range11'}), (b:KG {id: 'handler:ladybug_video_device.bg_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'handler:ladybug_state.screen_update_ladybug'}), (b:KG {id: 'handler:ladybug_video_device.draw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout2'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:ladybug_video_device.draw'}), (b:KG {id: 'handler:ladybug_video_device.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
