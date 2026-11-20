// mamekit knowledge graph — driver src/mame/universal/ladybug.cpp
// generated 2026-11-20T01:55:43.973Z
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
MERGE (n:KG {id: 'game:ladybug'}) SET n:Game SET n += {name: 'ladybug', year: '1981', company: 'Universal', fullname: 'Lady Bug', monitor: 'ROT270', cls: 'ladybug_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 897, sourceColumn: 1, sourceEndLine: 897};
MERGE (n:KG {id: 'romset:ladybug'}) SET n:RomSet SET n += {name: 'ladybug', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 718, sourceColumn: 1, sourceEndLine: 718};
MERGE (n:KG {id: 'region:ladybug/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 719, sourceColumn: 2, sourceEndLine: 719};
MERGE (n:KG {id: 'rom:ladybug/maincpu/l1.c4'}) SET n:Rom SET n += {file: 'l1.c4', offset: 0, size: 4096, crc: 'd09e0adb', sha1: 'ddc1f849cbcefb64b70a26c2a4c993f0516af814', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 720, sourceColumn: 2, sourceEndLine: 720};
MERGE (n:KG {id: 'rom:ladybug/maincpu/l2.d4'}) SET n:Rom SET n += {file: 'l2.d4', offset: 4096, size: 4096, crc: '88bc4a0a', sha1: '193c9f90b7550020c0923cb158dff7d5faa53bc6', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 721, sourceColumn: 2, sourceEndLine: 721};
MERGE (n:KG {id: 'rom:ladybug/maincpu/l3.e4'}) SET n:Rom SET n += {file: 'l3.e4', offset: 8192, size: 4096, crc: '53e9efce', sha1: '1960e9cd896b6a65197aefc3f10348103552b598', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 722, sourceColumn: 2, sourceEndLine: 722};
MERGE (n:KG {id: 'rom:ladybug/maincpu/l4.h4'}) SET n:Rom SET n += {file: 'l4.h4', offset: 12288, size: 4096, crc: 'ffc424d7', sha1: '2a4b9533e61e265bdd38c126add8c26d5bc048d5', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 723, sourceColumn: 2, sourceEndLine: 723};
MERGE (n:KG {id: 'rom:ladybug/maincpu/l5.j4'}) SET n:Rom SET n += {file: 'l5.j4', offset: 16384, size: 4096, crc: 'ad6af809', sha1: '276275d56c725b9d90eeb44c317ceb06bac27ae7', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 724, sourceColumn: 2, sourceEndLine: 724};
MERGE (n:KG {id: 'rom:ladybug/maincpu/l6.k4'}) SET n:Rom SET n += {file: 'l6.k4', offset: 20480, size: 4096, crc: 'cf1acca4', sha1: 'c05de7de4bd05d5c2af6aa752e057a9286f3effc', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 725, sourceColumn: 2, sourceEndLine: 725};
MERGE (n:KG {id: 'region:ladybug/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 8192, flags: '0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 732, sourceColumn: 2, sourceEndLine: 732};
MERGE (n:KG {id: 'rom:ladybug/gfx1/l9.f7'}) SET n:Rom SET n += {file: 'l9.f7', offset: 0, size: 4096, crc: '77b1da1e', sha1: '58cb82417396a3d96acfc864f091b1a5988f228d', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 733, sourceColumn: 2, sourceEndLine: 733};
MERGE (n:KG {id: 'rom:ladybug/gfx1/l0.h7'}) SET n:Rom SET n += {file: 'l0.h7', offset: 4096, size: 4096, crc: 'aa82e00b', sha1: '83a5b745e58844b6dd7d05dfe9dbb5959aaf5c40', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 734, sourceColumn: 2, sourceEndLine: 734};
MERGE (n:KG {id: 'region:ladybug/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 8192, flags: '0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 736, sourceColumn: 2, sourceEndLine: 736};
MERGE (n:KG {id: 'rom:ladybug/gfx2/l8.l7'}) SET n:Rom SET n += {file: 'l8.l7', offset: 0, size: 4096, crc: '8b99910b', sha1: '0bc812cf872f04eacedb50feed53f1aa8a1f24b9', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 737, sourceColumn: 2, sourceEndLine: 737};
MERGE (n:KG {id: 'rom:ladybug/gfx2/l7.m7'}) SET n:Rom SET n += {file: 'l7.m7', offset: 4096, size: 4096, crc: '86a5b448', sha1: 'f8585a6fcf921e3e21f112dd2de474cb53cef290', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 738, sourceColumn: 2, sourceEndLine: 738};
MERGE (n:KG {id: 'region:ladybug/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 96, flags: '0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 740, sourceColumn: 2, sourceEndLine: 740};
MERGE (n:KG {id: 'rom:ladybug/proms/10-2.k1'}) SET n:Rom SET n += {file: '10-2.k1', offset: 0, size: 32, crc: 'df091e52', sha1: '4d7fea6d9ab31e5f280b1dc198a325f00c3826ef', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 741, sourceColumn: 2, sourceEndLine: 741};
MERGE (n:KG {id: 'rom:ladybug/proms/10-1.f4'}) SET n:Rom SET n += {file: '10-1.f4', offset: 32, size: 32, crc: '40640d8f', sha1: '85d13a9b78c47174cff7c869f52b30263bae575e', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742};
MERGE (n:KG {id: 'rom:ladybug/proms/10-3.c4'}) SET n:Rom SET n += {file: '10-3.c4', offset: 64, size: 32, crc: '27fa3a50', sha1: '7cf59b7a37c156640d6ea91554d1c4276c1780e0', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 743, sourceColumn: 2, sourceEndLine: 743};
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
MERGE (n:KG {id: 'device:ladybug_state.ladybug/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 4000000, config: ['Z80(config, m_maincpu, 4_MHz_XTAL)', 'm_maincpu->set_addrmap(AS_PROGRAM, &ladybug_state::ladybug_map)'], member: 'm_maincpu', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 681, sourceColumn: 2, sourceEndLine: 681};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(9.828_MHz_XTAL / 2, 312, 8, 248, 262, 32, 224)', 'screen.set_screen_update(FUNC(ladybug_state::screen_update_ladybug))', 'screen.set_palette("palette")'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 685, sourceColumn: 2, sourceEndLine: 685, configCalls: ['set_raw(4914000,312,8,248,262,32,224)', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [4914000, 312, 8, 248, 262, 32, 224], screenRawExpr: ['9.828_MHz_XTAL / 2', '312', '8', '248', '262', '32', '224']};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(ladybug_state::screen_update_ladybug))', ownerTag: 'screen', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 687, sourceColumn: 2, sourceEndLine: 687, targetClass: 'ladybug_state', targetMethod: 'screen_update_ladybug'};
MERGE (n:KG {id: 'handler:ladybug_state.screen_update_ladybug'}) SET n:Handler SET n += {method: 'screen_update_ladybug', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 216, sourceColumn: 1, sourceEndLine: 221, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'bitmap.fill(0, cliprect);
	m_video->draw(screen, bitmap, cliprect, flip_screen());
	return 0;', sourceReturnType: 'u32'};
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
MERGE (n:KG {id: 'device:ladybug_state.ladybug/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, "palette", FUNC(ladybug_state::ladybug_palette), 4*8 + 4*16, 32)'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 691, sourceColumn: 2, sourceEndLine: 691, clockExpr: 'FUNC(ladybug_state::ladybug_palette)', paletteEntries: 32};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/video'}) SET n:Device SET n += {type: 'LADYBUG_VIDEO', tag: 'video', clock: 4000000, config: ['LADYBUG_VIDEO(config, m_video, 4000000).set_gfxdecode_tag("gfxdecode")'], member: 'm_video', cls: 'ladybug_video_device', clsHierarchy: ['ladybug_video_device'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 693, sourceColumn: 2, sourceEndLine: 693, configCalls: ['set_gfxdecode_tag("gfxdecode")'], startHandler: 'ladybug_video_device.device_start'};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/videolatch'}) SET n:Device SET n += {type: 'LS259', tag: 'videolatch', clock: null, config: ['ls259_device &videolatch(LS259(config, "videolatch"))', 'videolatch.q_out_cb<0>().set(FUNC(ladybug_state::flip_screen_set))'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 695, sourceColumn: 2, sourceEndLine: 695};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/videolatch/callback:videolatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'videolatch.q_out_cb<0>().set(FUNC(ladybug_state::flip_screen_set))', ownerTag: 'videolatch', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 696, sourceColumn: 2, sourceEndLine: 696, slot: '0', targetClass: 'ladybug_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:ladybug_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 696, sourceColumn: 2, sourceEndLine: 696};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 699, sourceColumn: 2, sourceEndLine: 699};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/sn1'}) SET n:Device SET n += {type: 'SN76489', tag: 'sn1', clock: 4000000, config: ['SN76489(config, "sn1", 4_MHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 701, sourceColumn: 2, sourceEndLine: 701};
MERGE (n:KG {id: 'audioroute:device:ladybug_state.ladybug/sn1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'SN76489(config, "sn1", 4_MHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 701, sourceColumn: 2, sourceEndLine: 701};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/sn2'}) SET n:Device SET n += {type: 'SN76489', tag: 'sn2', clock: 4000000, config: ['SN76489(config, "sn2", 4_MHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702};
MERGE (n:KG {id: 'audioroute:device:ladybug_state.ladybug/sn2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'SN76489(config, "sn2", 4_MHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702};
MERGE (n:KG {id: 'handler:ladybug_video_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'ladybug_video_device', sourceFile: 'src/mame/universal/ladybug_video.cpp', sourceLine: 24, sourceColumn: 1, sourceEndLine: 37, sourceParameters: '', sourceBody: 'm_spr_ram = std::make_unique<u8 []>(0x0400);
	m_bg_ram = std::make_unique<u8 []>(0x0800);
	std::fill_n(m_spr_ram.get(), 0x0400, 0);
	std::fill_n(m_bg_ram.get(), 0x0800, 0);

	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(ladybug_video_device::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);
	m_bg_tilemap->set_scroll_rows(32);
	m_bg_tilemap->set_transparent_pen(0);

	save_pointer(NAME(m_spr_ram), 0x0400);
	save_pointer(NAME(m_bg_ram), 0x0800);'};
MERGE (n:KG {id: 'handler:ladybug_video_device.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'ladybug_video_device', sourceFile: 'src/mame/universal/ladybug_video.cpp', sourceLine: 46, sourceColumn: 1, sourceEndLine: 52, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int const code = m_bg_ram[tile_index] + (BIT(m_bg_ram[0x0400 | tile_index], 3) << 8);
	int const color = m_bg_ram[0x0400 | tile_index] & 0x07;

	tileinfo.set(0, code, color, 0);'};
MERGE (n:KG {id: 'inputs:ladybug'}) SET n:InputPorts SET n += {name: 'ladybug', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 282, sourceColumn: 8, sourceEndLine: 282};
MERGE (n:KG {id: 'inputs:ladybug/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:ladybug/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 31, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(ladybug_state::ladybug_p1_control_r))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:ladybug_state.ladybug_p1_control_r'}) SET n:Handler SET n += {method: 'ladybug_p1_control_r', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 270, sourceColumn: 1, sourceEndLine: 273, sourceParameters: '', sourceBody: 'return m_p1_control->read();', sourceReturnType: 'ioport_value', inputMembers: ['m_p1_control=CONTP1']};
MERGE (n:KG {id: 'inputs:ladybug/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:ladybug/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:ladybug/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_TILT', defaultValue: 128};
MERGE (n:KG {id: 'inputs:ladybug/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:ladybug/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 31, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(ladybug_state::ladybug_p2_control_r))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:ladybug_state.ladybug_p2_control_r'}) SET n:Handler SET n += {method: 'ladybug_p2_control_r', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 275, sourceColumn: 1, sourceEndLine: 279, sourceParameters: '', sourceBody: '// upright cabinet only uses a single set of controls */
	return ((m_port_dsw0->read() & 0x20) ? m_p2_control : m_p1_control)->read();', sourceReturnType: 'ioport_value', inputMembers: ['m_port_dsw0=DSW0', 'm_p1_control=CONTP1', 'm_p2_control=CONTP2']};
MERGE (n:KG {id: 'inputs:ladybug/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:ladybug/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:ladybug/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:ladybug/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:ladybug/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNUSED', defaultValue: 255};
MERGE (n:KG {id: 'inputs:ladybug/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: false};
MERGE (n:KG {id: 'inputs:ladybug/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SWA(J2):8,7")'], name: 'Difficulty', defaultValue: 3, location: 'SWA(J2):8,7', settings: ['3=Easy', '2=Medium', '1=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:ladybug/DSW0/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SWA(J2):6")'], name: 'High Score Names', defaultValue: 4, location: 'SWA(J2):6', settings: ['0=3 Letters', '4=10 Letters']};
MERGE (n:KG {id: 'inputs:ladybug/DSW0/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_CODE(KEYCODE_F1)', 'PORT_DIPLOCATION("SWA(J2):5")'], name: 'Rack Test (Cheat)', defaultValue: 8, location: 'SWA(J2):5', settings: ['8=Off', '0=On']};
MERGE (n:KG {id: 'inputs:ladybug/DSW0/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SWA(J2):4")'], name: 'Freeze', defaultValue: 16, location: 'SWA(J2):4', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:ladybug/DSW0/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SWA(J2):3")'], name: 'Cabinet', defaultValue: 0, location: 'SWA(J2):3', settings: ['0=Upright', '32=Cocktail']};
MERGE (n:KG {id: 'inputs:ladybug/DSW0/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SWA(J2):2")'], name: 'Free Play', defaultValue: 64, location: 'SWA(J2):2', settings: ['64=No', '0=Yes']};
MERGE (n:KG {id: 'inputs:ladybug/DSW0/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SWA(J2):1")'], name: 'Lives', defaultValue: 128, location: 'SWA(J2):1', settings: ['128=3', '0=5']};
MERGE (n:KG {id: 'inputs:ladybug/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:ladybug/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION("SWB(K2):8,7,6,5")'], name: 'Coin B', defaultValue: 15, location: 'SWB(K2):8,7,6,5', settings: ['6=4C 1C', '8=3C 1C', '10=2C 1C', '7=3C 2C', '15=1C 1C', '9=2C 3C', '14=1C 2C', '13=1C 3C', '12=1C 4C', '11=1C 5C']};
MERGE (n:KG {id: 'inputs:ladybug/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION("SWB(K2):4,3,2,1")'], name: 'Coin A', defaultValue: 240, location: 'SWB(K2):4,3,2,1', settings: ['96=4C 1C', '128=3C 1C', '160=2C 1C', '112=3C 2C', '240=1C 1C', '144=2C 3C', '224=1C 2C', '208=1C 3C', '192=1C 4C', '176=1C 5C']};
MERGE (n:KG {id: 'inputs:ladybug/COIN'}) SET n:Port SET n += {tag: 'COIN', modify: false};
MERGE (n:KG {id: 'inputs:ladybug/COIN/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_COIN1', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(ladybug_state::coin1_inserted), 0)'], defaultValue: 0};
MERGE (n:KG {id: 'handler:ladybug_state.coin1_inserted'}) SET n:Handler SET n += {method: 'coin1_inserted', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 257, sourceColumn: 1, sourceEndLine: 261, sourceConstants: ['CLEAR_LINE=0', 'ASSERT_LINE=1', 'INPUT_LINE_NMI=-1'], sourceParameters: 'ioport_field &field, u32 param, ioport_value oldval, ioport_value newval', sourceBody: '/* left coin insertion causes an NMI */
	m_maincpu->set_input_line(INPUT_LINE_NMI, newval ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'inputs:ladybug/COIN/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_COIN2', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(ladybug_state::coin2_inserted), 0)'], defaultValue: 0};
MERGE (n:KG {id: 'handler:ladybug_state.coin2_inserted'}) SET n:Handler SET n += {method: 'coin2_inserted', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 263, sourceColumn: 1, sourceEndLine: 268, sourceConstants: ['HOLD_LINE=2'], sourceParameters: 'ioport_field &field, u32 param, ioport_value oldval, ioport_value newval', sourceBody: '/* right coin insertion causes an IRQ */
	if (newval)
		m_maincpu->set_input_line(0, HOLD_LINE);'};
MERGE (n:KG {id: 'inputs:ladybug/CONTP1'}) SET n:Port SET n += {tag: 'CONTP1', modify: false};
MERGE (n:KG {id: 'inputs:ladybug/CONTP1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:ladybug/CONTP1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:ladybug/CONTP1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:ladybug/CONTP1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:ladybug/CONTP1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED', defaultValue: 240};
MERGE (n:KG {id: 'inputs:ladybug/CONTP2'}) SET n:Port SET n += {tag: 'CONTP2', modify: false};
MERGE (n:KG {id: 'inputs:ladybug/CONTP2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:ladybug/CONTP2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:ladybug/CONTP2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:ladybug/CONTP2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:ladybug/CONTP2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED', defaultValue: 240};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 512, planes: 2, planeOffsets: [0, 32768], xOffsets: [7, 6, 5, 4, 3, 2, 1, 0], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 128, planes: 2, planeOffsets: [1, 0], xOffsets: [0, 2, 4, 6, 8, 10, 12, 14, 128, 130, 132, 134, 136, 138, 140, 142], yOffsets: [368, 352, 336, 320, 304, 288, 272, 256, 112, 96, 80, 64, 48, 32, 16, 0], charIncrement: 512};
MERGE (n:KG {id: 'gfxlayout:spritelayout2'}) SET n:GfxLayout SET n += {name: 'spritelayout2', width: 8, height: 8, total: 512, planes: 2, planeOffsets: [1, 0], xOffsets: [0, 2, 4, 6, 8, 10, 12, 14], yOffsets: [112, 96, 80, 64, 48, 32, 16, 0], charIncrement: 128};
MERGE (n:KG {id: 'gfxdecode:gfx_ladybug'}) SET n:GfxDecode SET n += {name: 'gfx_ladybug', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 666, sourceColumn: 8, sourceEndLine: 666};
MERGE (n:KG {id: 'gfxdecode:gfx_ladybug/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 8, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_ladybug/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout', colorBase: 32, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_ladybug/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout2', colorBase: 32, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:ladybug_state.ladybug/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, "palette", FUNC(ladybug_state::ladybug_palette), 4*8 + 4*16, 32)', ownerTag: 'palette', targetClass: 'ladybug_state', targetMethod: 'ladybug_palette', entries: 96, indirectEntries: 32, sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 691};
MERGE (n:KG {id: 'handler:ladybug_state.ladybug_palette'}) SET n:Handler SET n += {method: 'ladybug_palette', ownerClass: 'ladybug_state', sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 157, sourceColumn: 1, sourceEndLine: 214, sourceParameters: 'palette_device &palette', sourceBody: 'static constexpr int resistances[2] = { 470, 220 };

	// compute the color output resistor weights
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
		int const r = combine_weights__int__2(rweights, bit0, bit1);

		// green component
		bit0 = BIT(~color_prom[i], 2);
		bit1 = BIT(~color_prom[i], 6);
		int const g = combine_weights__int__2(gweights, bit0, bit1);

		// blue component
		bit0 = BIT(~color_prom[i], 4);
		bit1 = BIT(~color_prom[i], 7);
		int const b = combine_weights__int__2(bweights, bit0, bit1);

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
MERGE (n:KG {id: 'handler:.compute_resistor_weights'}) SET n:Handler SET n += {method: 'compute_resistor_weights', ownerClass: '', sourceFile: 'src/emu/video/resnet.cpp', sourceLine: 55, sourceColumn: 1, sourceEndLine: 227, sourceConstants: ['MAX_NETS=3', 'MAX_RES_PER_NET=18', 'VERBOSE=0'], sourceParameters: 'int minval, int maxval, double scaler,
	int count_1, const int * resistances_1, double * weights_1, int pulldown_1, int pullup_1,
	int count_2, const int * resistances_2, double * weights_2, int pulldown_2, int pullup_2,
	int count_3, const int * resistances_3, double * weights_3, int pulldown_3, int pullup_3', sourceBody: 'assert(minval < maxval);

	int rescount[MAX_NETS];     /* number of resistors in each of the nets */
	double r[MAX_NETS][MAX_RES_PER_NET];        /* resistances */
	double w[MAX_NETS][MAX_RES_PER_NET];        /* calulated weights */
	double ws[MAX_NETS][MAX_RES_PER_NET];   /* calulated, scaled weights */
	int r_pd[MAX_NETS];         /* pulldown resistances */
	int r_pu[MAX_NETS];         /* pullup resistances */

	double max_out[MAX_NETS];
	double * out[MAX_NETS];

	/* parse input parameters */

	int networks_no = 0;
	for (int n = 0; n < MAX_NETS; n++)
	{
		int count, pd, pu;
		const int * resistances;
		double * weights;

		switch(n){
		case 0:
				count       = count_1;
				resistances = resistances_1;
				weights     = weights_1;
				pd          = pulldown_1;
				pu          = pullup_1;
				break;
		case 1:
				count       = count_2;
				resistances = resistances_2;
				weights     = weights_2;
				pd          = pulldown_2;
				pu          = pullup_2;
				break;
		case 2:
		default:
				count       = count_3;
				resistances = resistances_3;
				weights     = weights_3;
				pd          = pulldown_3;
				pu          = pullup_3;
				break;
		}

		/* parameters validity check */
		if (count > MAX_RES_PER_NET)
			fatalerror("compute_resistor_weights(): too many resistors in net #%i. The maximum allowed is %i, the number requested was: %i\\n",n, MAX_RES_PER_NET, count);


		if (count > 0)
		{
			rescount[networks_no] = count;
			for (int i=0; i < count; i++)
			{
				r[networks_no][i] = 1.0 * resistances[i];
			}
			out[networks_no] = weights;
			r_pd[networks_no] = pd;
			r_pu[networks_no] = pu;
			networks_no++;
		}
	}
	if (networks_no < 1)
		fatalerror("compute_resistor_weights(): no input data\\n");

	/* calculate outputs for all given networks */
	for (int i = 0; i < networks_no; i++)
	{
		double R0, R1, Vout, dst;

		/* of n resistors */
		for (int n = 0; n < rescount[i]; n++)
		{
			R0 = ( r_pd[i] == 0 ) ? 1.0/1e12 : 1.0/r_pd[i];
			R1 = ( r_pu[i] == 0 ) ? 1.0/1e12 : 1.0/r_pu[i];

			for (int j = 0; j < rescount[i]; j++)
			{
				if( j==n )  /* only one resistance in the network connected to Vcc */
				{
					if (r[i][j] != 0.0)
						R1 += 1.0/r[i][j];
				}
				else
					if (r[i][j] != 0.0)
						R0 += 1.0/r[i][j];
			}

			/* now determine the voltage */
			R0 = 1.0/R0;
			R1 = 1.0/R1;
			Vout = (maxval - minval) * R0 / (R1 + R0) + minval;

			/* and convert it to a destination value */
			dst = std::clamp(Vout, double(minval), double(maxval));

			w[i][n] = dst;
		}
	}

	/* calculate maximum outputs for all given networks */
	int j = 0;
	double max = 0.0;
	for (int i = 0; i < networks_no; i++)
	{
		double sum = 0.0;

		/* of n resistors */
		for (int n = 0; n < rescount[i]; n++)
			sum += w[i][n]; /* maximum output, ie when each resistance is connected to Vcc */

		max_out[i] = sum;
		if (max < sum)
		{
			max = sum;
			j = i;
		}
	}

	double scale;
	if (scaler < 0.0)   /* use autoscale ? */
		/* calculate the output scaler according to the network with the greatest output */
		scale = double(maxval) / max_out[j];
	else                /* use scaler provided on entry */
		scale = scaler;

	/* calculate scaled output and fill the output table(s)*/
	for (int i = 0; i < networks_no; i++)
	{
		for (int n = 0; n < rescount[i]; n++)
		{
			ws[i][n] = w[i][n]*scale;   /* scale the result */
			(out[i])[n] = ws[i][n];     /* fill the output table */
		}
	}

/* debug code */
if (VERBOSE)
{
	osd_printf_info("compute_resistor_weights():  scaler = %15.10f\\n",scale);
	osd_printf_info("min val :%i  max val:%i  Total number of networks :%i\\n", minval, maxval, networks_no );

	for (int i = 0; i < networks_no; i++)
	{
		double sum = 0.0;

		osd_printf_info(" Network no.%i=>  resistances: %i", i, rescount[i] );
		if (r_pu[i] != 0)
			osd_printf_info(", pullup resistor: %i Ohms",r_pu[i]);
		if (r_pd[i] != 0)
			osd_printf_info(", pulldown resistor: %i Ohms",r_pd[i]);
		osd_printf_info("\\n  maximum output of this network:%10.5f (scaled to %15.10f)\\n", max_out[i], max_out[i]*scale );
		for (int n = 0; n < rescount[i]; n++)
		{
			osd_printf_info("   res %2i:%9.1f Ohms  weight=%10.5f (scaled = %15.10f)\\n", n, r[i][n], w[i][n], ws[i][n] );
			sum += ws[i][n];
		}
		osd_printf_info("                              sum of scaled weights = %15.10f\\n", sum  );
	}
}
/* debug end */

	return (scale);'};
MERGE (n:KG {id: 'handler:.combine_weights__int__2'}) SET n:Handler SET n += {method: 'combine_weights__int__2', ownerClass: '', sourceFile: 'src/emu/video/resnet.h', sourceLine: 181, sourceColumn: 1, sourceEndLine: 184, sourceParameters: 'auto tab, auto w_0, auto w_1', sourceBody: 'return int(emu_detail__combine_weights__0__1(tab, w_0, w_1) + 0.5);'};
MERGE (n:KG {id: 'handler:.emu_detail__combine_weights__0__1'}) SET n:Handler SET n += {method: 'emu_detail__combine_weights__0__1', ownerClass: '', sourceFile: 'src/emu/video/resnet.h', sourceLine: 170, sourceColumn: 1, sourceEndLine: 170, sourceParameters: 'auto tab, auto w0, auto w_0', sourceBody: 'return (tab[0] * w0) + emu_detail__combine_weights__1__0(tab, w_0);'};
MERGE (n:KG {id: 'handler:.emu_detail__combine_weights__1__0'}) SET n:Handler SET n += {method: 'emu_detail__combine_weights__1__0', ownerClass: '', sourceFile: 'src/emu/video/resnet.h', sourceLine: 167, sourceColumn: 1, sourceEndLine: 167, sourceParameters: 'auto tab, auto w', sourceBody: 'return tab[1] * w;'};
MATCH (a:KG {id: 'game:ladybug'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 897, sourceColumn: 1, sourceEndLine: 897};
MATCH (a:KG {id: 'game:ladybug'}), (b:KG {id: 'machine:ladybug_state.ladybug'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:ladybug'}), (b:KG {id: 'inputs:ladybug'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:ladybug'}), (b:KG {id: 'romset:ladybug'}) MERGE (a)-[r:USES_ROMSET]->(b);
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
MATCH (a:KG {id: 'inputs:ladybug'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 282, sourceColumn: 8, sourceEndLine: 282};
MATCH (a:KG {id: 'inputs:ladybug'}), (b:KG {id: 'inputs:ladybug/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ladybug'}), (b:KG {id: 'inputs:ladybug/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ladybug'}), (b:KG {id: 'inputs:ladybug/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ladybug'}), (b:KG {id: 'inputs:ladybug/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ladybug'}), (b:KG {id: 'inputs:ladybug/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ladybug'}), (b:KG {id: 'inputs:ladybug/COIN'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ladybug'}), (b:KG {id: 'inputs:ladybug/CONTP1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ladybug'}), (b:KG {id: 'inputs:ladybug/CONTP2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:ladybug'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 718, sourceColumn: 1, sourceEndLine: 718};
MATCH (a:KG {id: 'romset:ladybug'}), (b:KG {id: 'region:ladybug/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ladybug'}), (b:KG {id: 'region:ladybug/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ladybug'}), (b:KG {id: 'region:ladybug/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ladybug'}), (b:KG {id: 'region:ladybug/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/maincpu'}), (b:KG {id: 'map:ladybug_state.ladybug_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:ladybug_state.ladybug/screen'}), (b:KG {id: 'device:ladybug_state.ladybug/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug'}), (b:KG {id: 'file:src/mame/universal/ladybug.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/ladybug.cpp', sourceLine: 666, sourceColumn: 8, sourceEndLine: 666};
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug'}), (b:KG {id: 'gfxdecode:gfx_ladybug/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug'}), (b:KG {id: 'gfxdecode:gfx_ladybug/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ladybug'}), (b:KG {id: 'gfxdecode:gfx_ladybug/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/palette'}), (b:KG {id: 'device:ladybug_state.ladybug/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/video'}), (b:KG {id: 'handler:ladybug_video_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/videolatch'}), (b:KG {id: 'device:ladybug_state.ladybug/videolatch/callback:videolatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/sn1'}), (b:KG {id: 'audioroute:device:ladybug_state.ladybug/sn1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/sn2'}), (b:KG {id: 'audioroute:device:ladybug_state.ladybug/sn2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN0'}), (b:KG {id: 'inputs:ladybug/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN0'}), (b:KG {id: 'inputs:ladybug/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN0'}), (b:KG {id: 'inputs:ladybug/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN0'}), (b:KG {id: 'inputs:ladybug/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN1'}), (b:KG {id: 'inputs:ladybug/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN1'}), (b:KG {id: 'inputs:ladybug/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN1'}), (b:KG {id: 'inputs:ladybug/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN1'}), (b:KG {id: 'inputs:ladybug/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN2'}), (b:KG {id: 'inputs:ladybug/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/DSW0'}), (b:KG {id: 'inputs:ladybug/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/DSW0'}), (b:KG {id: 'inputs:ladybug/DSW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/DSW0'}), (b:KG {id: 'inputs:ladybug/DSW0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/DSW0'}), (b:KG {id: 'inputs:ladybug/DSW0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/DSW0'}), (b:KG {id: 'inputs:ladybug/DSW0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/DSW0'}), (b:KG {id: 'inputs:ladybug/DSW0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/DSW0'}), (b:KG {id: 'inputs:ladybug/DSW0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/DSW1'}), (b:KG {id: 'inputs:ladybug/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/DSW1'}), (b:KG {id: 'inputs:ladybug/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/COIN'}), (b:KG {id: 'inputs:ladybug/COIN/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/COIN'}), (b:KG {id: 'inputs:ladybug/COIN/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP1'}), (b:KG {id: 'inputs:ladybug/CONTP1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP1'}), (b:KG {id: 'inputs:ladybug/CONTP1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP1'}), (b:KG {id: 'inputs:ladybug/CONTP1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP1'}), (b:KG {id: 'inputs:ladybug/CONTP1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP1'}), (b:KG {id: 'inputs:ladybug/CONTP1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP2'}), (b:KG {id: 'inputs:ladybug/CONTP2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP2'}), (b:KG {id: 'inputs:ladybug/CONTP2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP2'}), (b:KG {id: 'inputs:ladybug/CONTP2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP2'}), (b:KG {id: 'inputs:ladybug/CONTP2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ladybug/CONTP2'}), (b:KG {id: 'inputs:ladybug/CONTP2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:ladybug/maincpu'}), (b:KG {id: 'rom:ladybug/maincpu/l1.c4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/maincpu'}), (b:KG {id: 'rom:ladybug/maincpu/l2.d4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/maincpu'}), (b:KG {id: 'rom:ladybug/maincpu/l3.e4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/maincpu'}), (b:KG {id: 'rom:ladybug/maincpu/l4.h4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/maincpu'}), (b:KG {id: 'rom:ladybug/maincpu/l5.j4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/maincpu'}), (b:KG {id: 'rom:ladybug/maincpu/l6.k4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/gfx1'}), (b:KG {id: 'rom:ladybug/gfx1/l9.f7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/gfx1'}), (b:KG {id: 'rom:ladybug/gfx1/l0.h7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/gfx2'}), (b:KG {id: 'rom:ladybug/gfx2/l8.l7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/gfx2'}), (b:KG {id: 'rom:ladybug/gfx2/l7.m7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/proms'}), (b:KG {id: 'rom:ladybug/proms/10-2.k1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/proms'}), (b:KG {id: 'rom:ladybug/proms/10-1.f4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ladybug/proms'}), (b:KG {id: 'rom:ladybug/proms/10-3.c4'}) MERGE (a)-[r:LOADS]->(b);
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
MATCH (a:KG {id: 'handler:ladybug_video_device.device_start'}), (b:KG {id: 'handler:ladybug_video_device.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:ladybug_state.ladybug/videolatch/callback:videolatch:0'}), (b:KG {id: 'handler:ladybug_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN0/f0'}), (b:KG {id: 'handler:ladybug_state.ladybug_p1_control_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:ladybug/IN1/f0'}), (b:KG {id: 'handler:ladybug_state.ladybug_p2_control_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:ladybug/COIN/f0'}), (b:KG {id: 'handler:ladybug_state.coin1_inserted'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:ladybug/COIN/f1'}), (b:KG {id: 'handler:ladybug_state.coin2_inserted'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
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
MATCH (a:KG {id: 'handler:ladybug_state.ladybug_palette'}), (b:KG {id: 'handler:.compute_resistor_weights'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ladybug_state.ladybug_palette'}), (b:KG {id: 'handler:.combine_weights__int__2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ladybug_video_device.draw'}), (b:KG {id: 'handler:ladybug_video_device.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.combine_weights__int__2'}), (b:KG {id: 'handler:.emu_detail__combine_weights__0__1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.emu_detail__combine_weights__0__1'}), (b:KG {id: 'handler:.emu_detail__combine_weights__1__0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
