// mamekit knowledge graph — driver src/mame/universal/cosmic.cpp
// generated 2026-09-05T03:49:54.270Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/universal/cosmic.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/universal/cosmic.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:cosmic.h'}) SET n:SourceFile SET n += {path: 'cosmic.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:sound/samples.h'}) SET n:SourceFile SET n += {path: 'sound/samples.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:panic'}) SET n:Game SET n += {name: 'panic', year: '1980', company: 'Universal', fullname: 'Space Panic (version E)', monitor: 'ROT270', cls: 'cosmic_state', init: 'init_panic', flags: 'MACHINE_IMPERFECT_SOUND | MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 1381, sourceColumn: 1, sourceEndLine: 1381, classConstants: '{"m_sound_enabled":0}'};
MERGE (n:KG {id: 'romset:panic'}) SET n:RomSet SET n += {name: 'panic', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 911, sourceColumn: 1, sourceEndLine: 911};
MERGE (n:KG {id: 'region:panic/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 912, sourceColumn: 2, sourceEndLine: 912};
MERGE (n:KG {id: 'rom:panic/maincpu/spe1'}) SET n:Rom SET n += {file: 'spe1', offset: 0, size: 2048, crc: '70ac0888', sha1: 'bdc6dfb74b4643df36cae60923f9759751340c86', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 913, sourceColumn: 2, sourceEndLine: 913};
MERGE (n:KG {id: 'rom:panic/maincpu/spe2'}) SET n:Rom SET n += {file: 'spe2', offset: 2048, size: 2048, crc: '2b910c48', sha1: '9ebb15694e068a4d8769ec5d312af1148818d472', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 914, sourceColumn: 2, sourceEndLine: 914};
MERGE (n:KG {id: 'rom:panic/maincpu/spe3'}) SET n:Rom SET n += {file: 'spe3', offset: 4096, size: 2048, crc: '03810148', sha1: '768418bc0a3a5bc9f7ec07b8edd4099da69efac6', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 915, sourceColumn: 2, sourceEndLine: 915};
MERGE (n:KG {id: 'rom:panic/maincpu/spe4'}) SET n:Rom SET n += {file: 'spe4', offset: 6144, size: 2048, crc: '119bbbfd', sha1: '2b3722300b1eebe1bffa4a4e39fceb45aefde24f', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 916, sourceColumn: 2, sourceEndLine: 916};
MERGE (n:KG {id: 'rom:panic/maincpu/spcpanic.5'}) SET n:Rom SET n += {file: 'spcpanic.5', offset: 8192, size: 2048, crc: '5b80f277', sha1: 'b060e57c88679f547153aed041a5554dc26a83aa', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 917, sourceColumn: 2, sourceEndLine: 917};
MERGE (n:KG {id: 'rom:panic/maincpu/spcpanic.6'}) SET n:Rom SET n += {file: 'spcpanic.6', offset: 10240, size: 2048, crc: 'b73babf0', sha1: '229944a6b3653601bc20afea5a9aec787fd95ce0', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 918, sourceColumn: 2, sourceEndLine: 918};
MERGE (n:KG {id: 'rom:panic/maincpu/spe7'}) SET n:Rom SET n += {file: 'spe7', offset: 12288, size: 2048, crc: '2894106e', sha1: '625896225b0ec03ac12f3e8b97e801cb743f37e7', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 919, sourceColumn: 2, sourceEndLine: 919};
MERGE (n:KG {id: 'region:panic/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 8192, flags: '0', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 921, sourceColumn: 2, sourceEndLine: 921};
MERGE (n:KG {id: 'rom:panic/gfx1/spcpanic.11'}) SET n:Rom SET n += {file: 'spcpanic.11', offset: 0, size: 2048, crc: 'acea9df4', sha1: '7de2a82da8160ad1a01c32a516d10c19dc306051', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 922, sourceColumn: 2, sourceEndLine: 922};
MERGE (n:KG {id: 'rom:panic/gfx1/spcpanic.12'}) SET n:Rom SET n += {file: 'spcpanic.12', offset: 2048, size: 2048, crc: 'e83423d0', sha1: 'eba1129537869f1ecb5afeeae19db19b134865f6', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 923, sourceColumn: 2, sourceEndLine: 923};
MERGE (n:KG {id: 'rom:panic/gfx1/spcpanic.10'}) SET n:Rom SET n += {file: 'spcpanic.10', offset: 4096, size: 2048, crc: 'c9631c2d', sha1: 'e5ab95e19c1b22a798a70a1a6599bc1f5e853c60', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 924, sourceColumn: 2, sourceEndLine: 924};
MERGE (n:KG {id: 'rom:panic/gfx1/spcpanic.9'}) SET n:Rom SET n += {file: 'spcpanic.9', offset: 6144, size: 2048, crc: 'eec78b4c', sha1: 'efd21d0a26b988a490c45315a7a121607f74d147', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 925, sourceColumn: 2, sourceEndLine: 925};
MERGE (n:KG {id: 'region:panic/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 32, flags: '0', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 927, sourceColumn: 2, sourceEndLine: 927};
MERGE (n:KG {id: 'rom:panic/proms/82s123.sp'}) SET n:Rom SET n += {file: '82s123.sp', offset: 0, size: 32, crc: '35d43d2f', sha1: '2ce164c92ed7ba3ee26a907f0c5969ec3decca01', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 928, sourceColumn: 2, sourceEndLine: 928};
MERGE (n:KG {id: 'region:panic/user1'}) SET n:RomRegion SET n += {tag: 'user1', size: 2048, flags: '0', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 930, sourceColumn: 2, sourceEndLine: 930};
MERGE (n:KG {id: 'rom:panic/user1/spcpanic.8'}) SET n:Rom SET n += {file: 'spcpanic.8', offset: 0, size: 2048, crc: '7da0b321', sha1: 'b450cc02de9cc27e3f336c626221c90c6961b51e', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 931, sourceColumn: 2, sourceEndLine: 931};
MERGE (n:KG {id: 'map:cosmic_state.panic_map'}) SET n:AddressMap SET n += {cls: 'cosmic_state', name: 'panic_map', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 283, sourceColumn: 1, sourceEndLine: 296};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 285, sourceColumn: 2, sourceEndLine: 285, rom: true};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 24575, raw: 'map(0x4000, 0x5fff).ram().share("videoram")', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 286, sourceColumn: 2, sourceEndLine: 286, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range2'}) SET n:AddressRange SET n += {start: 24576, end: 24607, raw: 'map(0x6000, 0x601f).writeonly().share("spriteram")', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 287, sourceColumn: 2, sourceEndLine: 287, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range3'}) SET n:AddressRange SET n += {start: 26624, end: 26624, raw: 'map(0x6800, 0x6800).portr("P1")', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 288, sourceColumn: 2, sourceEndLine: 288, portRead: 'P1'};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range4'}) SET n:AddressRange SET n += {start: 26625, end: 26625, raw: 'map(0x6801, 0x6801).portr("P2")', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 289, sourceColumn: 2, sourceEndLine: 289, portRead: 'P2'};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range5'}) SET n:AddressRange SET n += {start: 26626, end: 26626, raw: 'map(0x6802, 0x6802).portr("DSW")', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 290, sourceColumn: 2, sourceEndLine: 290, portRead: 'DSW'};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range6'}) SET n:AddressRange SET n += {start: 26627, end: 26627, raw: 'map(0x6803, 0x6803).portr("SYSTEM")', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 291, sourceColumn: 2, sourceEndLine: 291, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range7'}) SET n:AddressRange SET n += {start: 28672, end: 28683, raw: 'map(0x7000, 0x700b).w(FUNC(cosmic_state::panic_sound_output_w))', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 292, sourceColumn: 2, sourceEndLine: 292};
MERGE (n:KG {id: 'handler:cosmic_state.panic_sound_output_w'}) SET n:Handler SET n += {method: 'panic_sound_output_w', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 43, sourceColumn: 1, sourceEndLine: 107, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// Sound Enable / Disable
	if (offset == 11)
	{
		int count;
		if (data == 0)
			for (count = 0; count < 9; count++)
				m_samples->stop(count);

		m_sound_enabled = data;
	}

	if (m_sound_enabled)
	{
		switch (offset)
		{
		case 0: if (data) m_samples->start(0, 0); break;    // Walk
		case 1: if (data) m_samples->start(0, 5); break;    // Enemy Die 1
		case 2: if (data)                                   // Drop 1
				{
					if (!m_samples->playing(1))
					{
						m_samples->stop(2);
						m_samples->start(1, 3);
					}
				}
				else
					m_samples->stop(1);
				break;

		case 3: if (data && !m_samples->playing(6))         // Oxygen
					m_samples->start(6, 9, true);
				break;

		case 4: break;                                      // Drop 2
		case 5: if (data) m_samples->start(0, 5); break;    // Enemy Die 2 (use same sample as 1)
		case 6: if (data && !m_samples->playing(1) && !m_samples->playing(3))   // Hang
					m_samples->start(2, 2);
				break;

		case 7: if (data)                                   // Escape
				{
					m_samples->stop(2);
					m_samples->start(3, 4);
				}
				else
					m_samples->stop(3);
				break;

		case 8: if (data) m_samples->start(0, 1); break;    // Stairs
		case 9: if (data)                                   // Extend
					m_samples->start(4, 8);
				else
					m_samples->stop(4);
				break;

		case 10:    m_dac->write(BIT(data, 7)); break; // Bonus
		}
	}

	#ifdef MAME_DEBUG
	logerror("panic_sound_output_w %x=%x\\n", offset, data);
	#endif'};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range8'}) SET n:AddressRange SET n += {start: 28684, end: 28686, raw: 'map(0x700c, 0x700e).w(FUNC(cosmic_state::cosmic_color_register_w))', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 293, sourceColumn: 2, sourceEndLine: 293};
MERGE (n:KG {id: 'handler:cosmic_state.cosmic_color_register_w'}) SET n:Handler SET n += {method: 'cosmic_color_register_w', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic_v.cpp', sourceLine: 15, sourceColumn: 1, sourceEndLine: 18, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_color_registers[offset] = data ? 1 : 0;'};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range9'}) SET n:AddressRange SET n += {start: 28687, end: 28687, raw: 'map(0x700f, 0x700f).w(FUNC(cosmic_state::flip_screen_w))', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 294, sourceColumn: 2, sourceEndLine: 294};
MERGE (n:KG {id: 'handler:cosmic_state.flip_screen_w'}) SET n:Handler SET n += {method: 'flip_screen_w', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 277, sourceColumn: 1, sourceEndLine: 280, sourceParameters: 'uint8_t data', sourceBody: 'flip_screen_set(data & 0x80);'};
MERGE (n:KG {id: 'map:cosmic_state.panic_map/range10'}) SET n:AddressRange SET n += {start: 30720, end: 30721, raw: 'map(0x7800, 0x7801).w(FUNC(cosmic_state::panic_sound_output2_w))', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 295, sourceColumn: 2, sourceEndLine: 295};
MERGE (n:KG {id: 'handler:cosmic_state.panic_sound_output2_w'}) SET n:Handler SET n += {method: 'panic_sound_output2_w', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 109, sourceColumn: 1, sourceEndLine: 123, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (m_sound_enabled)
	{
		switch (offset)
		{
		case 0:     if (data) m_samples->start(0, 6); break;    // Player Die
		case 1:    if (data) m_samples->start(5, 7); break;    // Enemy Laugh
		}
	}

#ifdef MAME_DEBUG
	logerror("panic_sound_output2_w %x=%x\\n", offset, data);
#endif'};
MERGE (n:KG {id: 'machine:cosmic_state.cosmic'}) SET n:MachineConfig SET n += {cls: 'cosmic_state', name: 'cosmic', calls: [], stateMembers: ['{"name":"m_color_registers","bits":32,"signed":true,"arrayLength":3}', '{"name":"m_background_enable","bits":32,"signed":true}', '{"name":"m_magspot_pen_mask","bits":32,"signed":true}', '{"name":"m_sound_enabled","bits":32,"signed":true}', '{"name":"m_dive_bomb_b_select","bits":32,"signed":true}'], resetHandlers: ['cosmic_state.machine_reset'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 808, sourceColumn: 1, sourceEndLine: 817};
MERGE (n:KG {id: 'handler:cosmic_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 800, sourceColumn: 1, sourceEndLine: 806, sourceParameters: '', sourceBody: 'm_background_enable = 0;
	m_color_registers[0] = 0;
	m_color_registers[1] = 0;
	m_color_registers[2] = 0;'};
MERGE (n:KG {id: 'device:cosmic_state.cosmic/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 1802666.6666666667, config: ['Z80(config, m_maincpu, 10.816_MHz_XTAL/6)'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 811, sourceColumn: 2, sourceEndLine: 811};
MERGE (n:KG {id: 'device:cosmic_state.cosmic/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(10.816_MHz_XTAL/2, 44*8, 0*8, 32*8, 32*8+6, 4*8, 28*8)', 'm_screen->set_palette(m_palette)', 'm_screen->set_screen_update(FUNC(cosmic_state::screen_update_panic))'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 814, sourceColumn: 2, sourceEndLine: 814, configCalls: ['set_raw(5408000,352,0,256,262,32,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [5408000, 352, 0, 256, 262, 32, 224], screenRawExpr: ['10.816_MHz_XTAL/2', '44*8', '0*8', '32*8', '32*8+6', '4*8', '28*8']};
MERGE (n:KG {id: 'machine:cosmic_state.panic'}) SET n:MachineConfig SET n += {cls: 'cosmic_state', name: 'panic', calls: ['cosmic'], stateMembers: ['{"name":"m_color_registers","bits":32,"signed":true,"arrayLength":3}', '{"name":"m_background_enable","bits":32,"signed":true}', '{"name":"m_magspot_pen_mask","bits":32,"signed":true}', '{"name":"m_sound_enabled","bits":32,"signed":true}', '{"name":"m_dive_bomb_b_select","bits":32,"signed":true}'], resetHandlers: ['cosmic_state.machine_reset'], devicePatches: ['{"tag":"screen","config":["m_screen->set_screen_update(FUNC(cosmic_state::screen_update_panic))"]}'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 831, sourceColumn: 1, sourceEndLine: 854};
MERGE (n:KG {id: 'machine:cosmic_state.panic/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(cosmic_state::screen_update_panic))', ownerTag: 'screen', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 843, sourceColumn: 2, sourceEndLine: 843, targetClass: 'cosmic_state', targetMethod: 'screen_update_panic'};
MERGE (n:KG {id: 'handler:cosmic_state.screen_update_panic'}) SET n:Handler SET n += {method: 'screen_update_panic', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic_v.cpp', sourceLine: 468, sourceColumn: 1, sourceEndLine: 474, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'bitmap.fill(0, cliprect);
	draw_bitmap(bitmap, cliprect);
	draw_sprites(bitmap, cliprect, 0x07, 1);
	return 0;'};
MERGE (n:KG {id: 'handler:cosmic_state.draw_bitmap'}) SET n:Handler SET n += {method: 'draw_bitmap', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic_v.cpp', sourceLine: 181, sourceColumn: 1, sourceEndLine: 206, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'for (offs_t offs = 0; offs < m_videoram.bytes(); offs++)
	{
		uint8_t data = m_videoram[offs];

		uint8_t x = offs << 3;
		uint8_t const y = offs >> 5;

		pen_t pen = (this->*m_map_color)(x, y);

		for (int i = 0; i < 8; i++)
		{
			if (data & 0x80)
			{
				if (flip_screen())
					bitmap.pix(255-y, 255-x) = pen;
				else
					bitmap.pix(y, x) = pen;
			}

			x++;
			data <<= 1;
		}
	}'};
MERGE (n:KG {id: 'handler:cosmic_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic_v.cpp', sourceLine: 209, sourceColumn: 1, sourceEndLine: 239, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, int color_mask, int extra_sprites', sourceBody: 'int offs;

	for (offs = m_spriteram.bytes() - 4;offs >= 0;offs -= 4)
	{
		if (m_spriteram[offs] != 0)
		{
			int code, color;

			code  = ~m_spriteram[offs] & 0x3f;
			color = ~m_spriteram[offs + 3] & color_mask;

			if (extra_sprites)
				code |= (m_spriteram[offs + 3] & 0x08) << 3;

			if (m_spriteram[offs] & 0x80)
				/* 16x16 sprite */
				m_gfxdecode->gfx(0)->transpen(bitmap,cliprect,
						code, color,
						0, ~m_spriteram[offs] & 0x40,
						256-m_spriteram[offs + 2],m_spriteram[offs + 1],0);
			else
				/* 32x32 sprite */
				m_gfxdecode->gfx(1)->transpen(bitmap,cliprect,
						code >> 2, color,
						0, ~m_spriteram[offs] & 0x40,
						256-m_spriteram[offs + 2],m_spriteram[offs + 1],0);
		}
	}'};
MERGE (n:KG {id: 'device:cosmic_state.panic/scantimer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scantimer', clock: null, config: ['TIMER(config, "scantimer").configure_scanline(FUNC(cosmic_state::panic_scanline), "screen", 0, 1)'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 837, sourceColumn: 2, sourceEndLine: 837};
MERGE (n:KG {id: 'device:cosmic_state.panic/scantimer/callback:scantimer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "scantimer").configure_scanline(FUNC(cosmic_state::panic_scanline), "screen", 0, 1)', ownerTag: 'scantimer', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 837, sourceColumn: 2, sourceEndLine: 837, scanlineStart: 0, scanlineIncrement: 1, targetClass: 'cosmic_state', targetMethod: 'panic_scanline'};
MERGE (n:KG {id: 'handler:cosmic_state.panic_scanline'}) SET n:Handler SET n += {method: 'panic_scanline', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 819, sourceColumn: 1, sourceEndLine: 828, sourceParameters: 'int param', sourceBody: 'int scanline = param;

	if(scanline == 224) // vblank-out irq
		m_maincpu->set_input_line_and_vector(0, HOLD_LINE,0xd7); // Z80 - RST 10h

	if(scanline == 0) // vblank-in irq
		m_maincpu->set_input_line_and_vector(0, HOLD_LINE,0xcf); // Z80 - RST 08h'};
MERGE (n:KG {id: 'device:cosmic_state.panic/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_panic)'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 840, sourceColumn: 2, sourceEndLine: 840, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:cosmic_state.panic/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(cosmic_state::panic_palette), 16 + 8*4, 16)'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 841, sourceColumn: 2, sourceEndLine: 841, clockExpr: 'FUNC(cosmic_state::panic_palette)'};
MERGE (n:KG {id: 'device:cosmic_state.panic/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 846, sourceColumn: 2, sourceEndLine: 846};
MERGE (n:KG {id: 'device:cosmic_state.panic/samples'}) SET n:Device SET n += {type: 'SAMPLES', tag: 'samples', clock: null, config: ['SAMPLES(config, m_samples)', 'm_samples->set_channels(9)', 'm_samples->set_samples_names(panic_sample_names)', 'm_samples->add_route(ALL_OUTPUTS, "speaker", 0.25)'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 848, sourceColumn: 2, sourceEndLine: 848, configCalls: ['set_channels(9)']};
MERGE (n:KG {id: 'audioroute:device:cosmic_state.panic/samples/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.25, raw: 'm_samples->add_route(ALL_OUTPUTS, "speaker", 0.25)', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 851, sourceColumn: 2, sourceEndLine: 851};
MERGE (n:KG {id: 'device:cosmic_state.panic/dac'}) SET n:Device SET n += {type: 'DAC_1BIT', tag: 'dac', clock: 0, config: ['DAC_1BIT(config, m_dac, 0).add_route(ALL_OUTPUTS, "speaker", 0.5)'], sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 853, sourceColumn: 2, sourceEndLine: 853};
MERGE (n:KG {id: 'audioroute:device:cosmic_state.panic/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.5, raw: 'DAC_1BIT(config, m_dac, 0).add_route(ALL_OUTPUTS, "speaker", 0.5)', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 853, sourceColumn: 2, sourceEndLine: 853};
MERGE (n:KG {id: 'inputs:panic'}) SET n:InputPorts SET n += {name: 'panic', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 339, sourceColumn: 8, sourceEndLine: 339};
MERGE (n:KG {id: 'inputs:panic/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:panic/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:panic/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:panic/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:panic/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:panic/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:panic/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:panic/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:panic/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 128};
MERGE (n:KG {id: 'inputs:panic/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:panic/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:panic/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:panic/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:panic/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:panic/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:panic/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:panic/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:panic/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:panic/DSW'}) SET n:Port SET n += {tag: 'DSW', modify: false};
MERGE (n:KG {id: 'inputs:panic/DSW/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, modifiers: ['PORT_DIPLOCATION("SW:6,5,4")'], name: 'Coin A', defaultValue: 0, location: 'SW:6,5,4', settings: ['0=1C 1C', '5=2C 3C', '1=1C 2C', '2=1C 3C', '3=1C 4C', '4=1C 5C']};
MERGE (n:KG {id: 'inputs:panic/DSW/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW:3")'], name: 'Cabinet', defaultValue: 0, location: 'SW:3', settings: ['0=Upright', '8=Cocktail']};
MERGE (n:KG {id: 'inputs:panic/DSW/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SW:2")'], name: 'Bonus Life', defaultValue: 0, location: 'SW:2', settings: ['0=3000', '16=5000']};
MERGE (n:KG {id: 'inputs:panic/DSW/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SW:1")'], name: 'Lives', defaultValue: 0, location: 'SW:1', settings: ['0=3', '32=4']};
MERGE (n:KG {id: 'inputs:panic/DSW/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_DIPLOCATION("SW:7,8")'], name: 'Coin B', defaultValue: 64, location: 'SW:7,8', settings: ['0=2C 1C', '64=1C 1C', '128=1C 2C', '192=1C 3C']};
MERGE (n:KG {id: 'inputs:panic/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:panic/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:panic/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:panic/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 4};
MERGE (n:KG {id: 'inputs:panic/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:panic/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 16};
MERGE (n:KG {id: 'inputs:panic/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:panic/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN1', modifiers: ['PORT_WRITE_LINE_DEVICE_MEMBER(DEVICE_SELF, FUNC(cosmic_state::panic_coin_inserted))'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:panic/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN2', modifiers: ['PORT_WRITE_LINE_DEVICE_MEMBER(DEVICE_SELF, FUNC(cosmic_state::panic_coin_inserted))'], defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:cosmic_spritelayout16'}) SET n:GfxLayout SET n += {name: 'cosmic_spritelayout16', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 128, 129, 130, 131, 132, 133, 134, 135], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:cosmic_spritelayout32'}) SET n:GfxLayout SET n += {name: 'cosmic_spritelayout32', width: 32, height: 32, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 256, 257, 258, 259, 260, 261, 262, 263, 512, 513, 514, 515, 516, 517, 518, 519, 768, 769, 770, 771, 772, 773, 774, 775], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248], charIncrement: 1024};
MERGE (n:KG {id: 'gfxdecode:gfx_panic'}) SET n:GfxDecode SET n += {name: 'gfx_panic', sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 742, sourceColumn: 8, sourceEndLine: 742};
MERGE (n:KG {id: 'gfxdecode:gfx_panic/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'cosmic_spritelayout16', colorBase: 16, colorCount: 8, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_panic/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'cosmic_spritelayout32', colorBase: 16, colorCount: 8, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:cosmic_state.panic/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(cosmic_state::panic_palette), 16 + 8*4, 16)', ownerTag: 'palette', targetClass: 'cosmic_state', targetMethod: 'panic_palette', entries: 16, sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 841};
MERGE (n:KG {id: 'handler:cosmic_state.panic_palette'}) SET n:Handler SET n += {method: 'panic_palette', ownerClass: 'cosmic_state', sourceFile: 'src/mame/universal/cosmic_v.cpp', sourceLine: 67, sourceColumn: 1, sourceEndLine: 90, sourceParameters: 'palette_device &palette', sourceBody: 'uint8_t const *const color_prom = memregion("proms")->base();

	// create a lookup table for the palette
	for (int i = 0; i < 0x10; i++)
	{
		int const r = pal1bit(i >> 0);
		int const g = pal1bit(i >> 1);
		int const b = ((i & 0x0c) == 0x08) ? 0xaa : pal1bit(i >> 2);

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	// background uses colors 0x00-0x0f
	for (int i = 0; i < 0x0f; i++)
		palette.set_pen_indirect(i, i);

	// sprites use colors 0x00-0x07
	for (int i = 0; i < 0x20; i++)
		palette.set_pen_indirect(i + 0x10, color_prom[i] & 0x07);

	m_map_color = &cosmic_state::panic_map_color;'};
MATCH (a:KG {id: 'game:panic'}), (b:KG {id: 'file:src/mame/universal/cosmic.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 1381, sourceColumn: 1, sourceEndLine: 1381};
MATCH (a:KG {id: 'game:panic'}), (b:KG {id: 'machine:cosmic_state.panic'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:panic'}), (b:KG {id: 'inputs:panic'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:panic'}), (b:KG {id: 'romset:panic'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/cosmic.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/cosmic.cpp'}), (b:KG {id: 'file:cosmic.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/cosmic.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/cosmic.cpp'}), (b:KG {id: 'file:sound/samples.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/cosmic.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'file:src/mame/universal/cosmic.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 831, sourceColumn: 1, sourceEndLine: 854};
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'handler:cosmic_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'machine:cosmic_state.cosmic'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'map:cosmic_state.panic_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'machine:cosmic_state.panic/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'device:cosmic_state.panic/scantimer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'device:cosmic_state.panic/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'gfxdecode:gfx_panic'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'device:cosmic_state.panic/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'device:cosmic_state.panic/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'device:cosmic_state.panic/samples'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.panic'}), (b:KG {id: 'device:cosmic_state.panic/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:panic'}), (b:KG {id: 'file:src/mame/universal/cosmic.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 339, sourceColumn: 8, sourceEndLine: 339};
MATCH (a:KG {id: 'inputs:panic'}), (b:KG {id: 'inputs:panic/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:panic'}), (b:KG {id: 'inputs:panic/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:panic'}), (b:KG {id: 'inputs:panic/DSW'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:panic'}), (b:KG {id: 'inputs:panic/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:panic'}), (b:KG {id: 'file:src/mame/universal/cosmic.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 911, sourceColumn: 1, sourceEndLine: 911};
MATCH (a:KG {id: 'romset:panic'}), (b:KG {id: 'region:panic/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:panic'}), (b:KG {id: 'region:panic/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:panic'}), (b:KG {id: 'region:panic/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:panic'}), (b:KG {id: 'region:panic/user1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.cosmic'}), (b:KG {id: 'file:src/mame/universal/cosmic.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 808, sourceColumn: 1, sourceEndLine: 817};
MATCH (a:KG {id: 'machine:cosmic_state.cosmic'}), (b:KG {id: 'handler:cosmic_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.cosmic'}), (b:KG {id: 'device:cosmic_state.cosmic/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.cosmic'}), (b:KG {id: 'device:cosmic_state.cosmic/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'file:src/mame/universal/cosmic.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 283, sourceColumn: 1, sourceEndLine: 296};
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map'}), (b:KG {id: 'map:cosmic_state.panic_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:cosmic_state.panic/callback:screen:0'}), (b:KG {id: 'handler:cosmic_state.screen_update_panic'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:cosmic_state.panic/scantimer'}), (b:KG {id: 'device:cosmic_state.panic/scantimer/callback:scantimer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_panic'}), (b:KG {id: 'file:src/mame/universal/cosmic.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/cosmic.cpp', sourceLine: 742, sourceColumn: 8, sourceEndLine: 742};
MATCH (a:KG {id: 'gfxdecode:gfx_panic'}), (b:KG {id: 'gfxdecode:gfx_panic/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_panic'}), (b:KG {id: 'gfxdecode:gfx_panic/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:cosmic_state.panic/palette'}), (b:KG {id: 'device:cosmic_state.panic/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:cosmic_state.panic/samples'}), (b:KG {id: 'audioroute:device:cosmic_state.panic/samples/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:cosmic_state.panic/dac'}), (b:KG {id: 'audioroute:device:cosmic_state.panic/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:panic/P1'}), (b:KG {id: 'inputs:panic/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P1'}), (b:KG {id: 'inputs:panic/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P1'}), (b:KG {id: 'inputs:panic/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P1'}), (b:KG {id: 'inputs:panic/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P1'}), (b:KG {id: 'inputs:panic/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P1'}), (b:KG {id: 'inputs:panic/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P1'}), (b:KG {id: 'inputs:panic/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P1'}), (b:KG {id: 'inputs:panic/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P2'}), (b:KG {id: 'inputs:panic/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P2'}), (b:KG {id: 'inputs:panic/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P2'}), (b:KG {id: 'inputs:panic/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P2'}), (b:KG {id: 'inputs:panic/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P2'}), (b:KG {id: 'inputs:panic/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P2'}), (b:KG {id: 'inputs:panic/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P2'}), (b:KG {id: 'inputs:panic/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/P2'}), (b:KG {id: 'inputs:panic/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/DSW'}), (b:KG {id: 'inputs:panic/DSW/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/DSW'}), (b:KG {id: 'inputs:panic/DSW/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/DSW'}), (b:KG {id: 'inputs:panic/DSW/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/DSW'}), (b:KG {id: 'inputs:panic/DSW/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/DSW'}), (b:KG {id: 'inputs:panic/DSW/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/SYSTEM'}), (b:KG {id: 'inputs:panic/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/SYSTEM'}), (b:KG {id: 'inputs:panic/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/SYSTEM'}), (b:KG {id: 'inputs:panic/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/SYSTEM'}), (b:KG {id: 'inputs:panic/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/SYSTEM'}), (b:KG {id: 'inputs:panic/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/SYSTEM'}), (b:KG {id: 'inputs:panic/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/SYSTEM'}), (b:KG {id: 'inputs:panic/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:panic/SYSTEM'}), (b:KG {id: 'inputs:panic/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:panic/maincpu'}), (b:KG {id: 'rom:panic/maincpu/spe1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/maincpu'}), (b:KG {id: 'rom:panic/maincpu/spe2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/maincpu'}), (b:KG {id: 'rom:panic/maincpu/spe3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/maincpu'}), (b:KG {id: 'rom:panic/maincpu/spe4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/maincpu'}), (b:KG {id: 'rom:panic/maincpu/spcpanic.5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/maincpu'}), (b:KG {id: 'rom:panic/maincpu/spcpanic.6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/maincpu'}), (b:KG {id: 'rom:panic/maincpu/spe7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/gfx1'}), (b:KG {id: 'rom:panic/gfx1/spcpanic.11'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/gfx1'}), (b:KG {id: 'rom:panic/gfx1/spcpanic.12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/gfx1'}), (b:KG {id: 'rom:panic/gfx1/spcpanic.10'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/gfx1'}), (b:KG {id: 'rom:panic/gfx1/spcpanic.9'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/proms'}), (b:KG {id: 'rom:panic/proms/82s123.sp'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:panic/user1'}), (b:KG {id: 'rom:panic/user1/spcpanic.8'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map/range7'}), (b:KG {id: 'handler:cosmic_state.panic_sound_output_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map/range8'}), (b:KG {id: 'handler:cosmic_state.cosmic_color_register_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map/range9'}), (b:KG {id: 'handler:cosmic_state.flip_screen_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cosmic_state.panic_map/range10'}), (b:KG {id: 'handler:cosmic_state.panic_sound_output2_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:cosmic_state.screen_update_panic'}), (b:KG {id: 'handler:cosmic_state.draw_bitmap'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cosmic_state.screen_update_panic'}), (b:KG {id: 'handler:cosmic_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:cosmic_state.panic/scantimer/callback:scantimer:0'}), (b:KG {id: 'handler:cosmic_state.panic_scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_panic/e0'}), (b:KG {id: 'gfxlayout:cosmic_spritelayout16'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_panic/e1'}), (b:KG {id: 'gfxlayout:cosmic_spritelayout32'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:cosmic_state.panic/palette/callback:palette_init'}), (b:KG {id: 'handler:cosmic_state.panic_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:cosmic_spritelayout16'}), (b:KG {id: 'file:src/mame/universal/cosmic.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:cosmic_spritelayout32'}), (b:KG {id: 'file:src/mame/universal/cosmic.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
