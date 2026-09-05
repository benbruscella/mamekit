// mamekit knowledge graph — driver src/mame/irem/m72.cpp
// generated 2026-09-05T03:50:05.898Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/irem/m72.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/irem/m72.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:m72.h'}) SET n:SourceFile SET n += {path: 'm72.h', external: true};
MERGE (n:KG {id: 'file:iremipt.h'}) SET n:SourceFile SET n += {path: 'iremipt.h', external: true};
MERGE (n:KG {id: 'file:cpu/nec/nec.h'}) SET n:SourceFile SET n += {path: 'cpu/nec/nec.h', external: true};
MERGE (n:KG {id: 'file:cpu/nec/v25.h'}) SET n:SourceFile SET n += {path: 'cpu/nec/v25.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:irem_cpu.h'}) SET n:SourceFile SET n += {path: 'irem_cpu.h', external: true};
MERGE (n:KG {id: 'file:machine/rstbuf.h'}) SET n:SourceFile SET n += {path: 'machine/rstbuf.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopm.h'}) SET n:SourceFile SET n += {path: 'sound/ymopm.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'callback:timer/m72_state.scanline_interrupt'}) SET n:Callback SET n += {ownerTag: 'scanline_timer', signal: 'timer', operation: 'adjust', targetClass: 'm72_state', targetMethod: 'scanline_interrupt', startClass: 'm72_state', startMethod: 'machine_start', scanlineStart: 0, scanlineIncrement: 1, sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 256, sourceColumn: 1, sourceEndLine: 279};
MERGE (n:KG {id: 'handler:m72_state.scanline_interrupt'}) SET n:Handler SET n += {method: 'scanline_interrupt', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 256, sourceColumn: 1, sourceEndLine: 279, sourceParameters: 'int param', sourceBody: 'int scanline = param;

	/* raster interrupt */
	if (scanline == m_raster_irq_position)
	{
		m_screen->update_partial(m_screen->vpos());
		m_upd71059c->ir2_w(1);
	}
	else
		m_upd71059c->ir2_w(0);

	/* VBLANK interrupt */
	if (scanline == 256)
		m_upd71059c->ir0_w(1);
	else
		m_upd71059c->ir0_w(0);

	/* adjust for next scanline */
	if (++scanline >= m_screen->height())
		scanline = 0;
	m_scanline_timer->adjust(m_screen->time_until_pos(scanline), scanline);'};
MERGE (n:KG {id: 'game:rtype'}) SET n:Game SET n += {name: 'rtype', year: '1987', company: 'Irem', fullname: 'R-Type (World)', monitor: 'ROT0', cls: 'm72_state', init: 'empty_init', flags: 'MACHINE_NO_COCKTAIL | MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 4625, sourceColumn: 1, sourceEndLine: 4625};
MERGE (n:KG {id: 'romset:rtype'}) SET n:RomSet SET n += {name: 'rtype', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2035, sourceColumn: 1, sourceEndLine: 2035};
MERGE (n:KG {id: 'region:rtype/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 1048576, flags: '0', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2036, sourceColumn: 2, sourceEndLine: 2036};
MERGE (n:KG {id: 'rom:rtype/maincpu/rt_r-h0-b.1b'}) SET n:Rom SET n += {file: 'rt_r-h0-b.1b', offset: 1, size: 65536, crc: '591c7754', sha1: '0b9d5474bc5963224923126cf84d74a39b8270cc', skip: 1};
MERGE (n:KG {id: 'rom:rtype/maincpu/rt_r-l0-b.3b'}) SET n:Rom SET n += {file: 'rt_r-l0-b.3b', offset: 0, size: 65536, crc: 'a1928df0', sha1: '3001c1b87cd1d441ba1226fb5b9dd6268458c0e8', skip: 1};
MERGE (n:KG {id: 'rom:rtype/maincpu/rt_r-h1-b.1c'}) SET n:Rom SET n += {file: 'rt_r-h1-b.1c', offset: 131073, size: 65536, crc: 'a9d71eca', sha1: '008d1dc289df2ae2ba8f93d319c2b2c108cb9b89', reloadOffsets: [917505], skip: 1};
MERGE (n:KG {id: 'rom:rtype/maincpu/rt_r-l1-b.3c'}) SET n:Rom SET n += {file: 'rt_r-l1-b.3c', offset: 131072, size: 65536, crc: '0df3573d', sha1: '0144c846fd0bdb3e4d790f6cb7bb64829e931b76', reloadOffsets: [917504], skip: 1};
MERGE (n:KG {id: 'region:rtype/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 524288, flags: '0', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2044, sourceColumn: 2, sourceEndLine: 2044};
MERGE (n:KG {id: 'rom:rtype/sprites/rt_r-00.1h'}) SET n:Rom SET n += {file: 'rt_r-00.1h', offset: 0, size: 65536, crc: 'dad53bc0', sha1: '1e3bc498861946278a0b1fe24259f5d224e265d7', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2045, sourceColumn: 2, sourceEndLine: 2045};
MERGE (n:KG {id: 'rom:rtype/sprites/rt_r-01.1j'}) SET n:Rom SET n += {file: 'rt_r-01.1j', offset: 65536, size: 32768, crc: '5e441e7f', sha1: '6741eb7f2d9d985b5a89eefc73ea44c3e38de6f7', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2046, sourceColumn: 2, sourceEndLine: 2046, reloadOffsets: [98304]};
MERGE (n:KG {id: 'rom:rtype/sprites/rt_r-10.1k'}) SET n:Rom SET n += {file: 'rt_r-10.1k', offset: 131072, size: 65536, crc: 'd6a66298', sha1: 'd2873d05aa3b257e7699c188880ac3daad672fa5', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2048, sourceColumn: 2, sourceEndLine: 2048};
MERGE (n:KG {id: 'rom:rtype/sprites/rt_r-11.1l'}) SET n:Rom SET n += {file: 'rt_r-11.1l', offset: 196608, size: 32768, crc: '791df4f8', sha1: '5239a97222212ac9c019177771cb2b5096b7bc17', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2049, sourceColumn: 2, sourceEndLine: 2049, reloadOffsets: [229376]};
MERGE (n:KG {id: 'rom:rtype/sprites/rt_r-20.3h'}) SET n:Rom SET n += {file: 'rt_r-20.3h', offset: 262144, size: 65536, crc: 'fc247c8a', sha1: '01cf0a60f47fa5e2ed430a3f075e69e6cb762a48', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2051, sourceColumn: 2, sourceEndLine: 2051};
MERGE (n:KG {id: 'rom:rtype/sprites/rt_r-21.3j'}) SET n:Rom SET n += {file: 'rt_r-21.3j', offset: 327680, size: 32768, crc: 'ed793841', sha1: '7e55a9a11fcd989db39bce6be48821b747c7d97f', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2052, sourceColumn: 2, sourceEndLine: 2052, reloadOffsets: [360448]};
MERGE (n:KG {id: 'rom:rtype/sprites/rt_r-30.3k'}) SET n:Rom SET n += {file: 'rt_r-30.3k', offset: 393216, size: 65536, crc: 'eb02a1cb', sha1: '60a394ab53afdcbbf9e88083b8dbe8c897170d77', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2054, sourceColumn: 2, sourceEndLine: 2054};
MERGE (n:KG {id: 'rom:rtype/sprites/rt_r-31.3l'}) SET n:Rom SET n += {file: 'rt_r-31.3l', offset: 458752, size: 32768, crc: '8558355d', sha1: 'b5467d1f22f6e5f90c5d8a8ac2d55974f287d589', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2055, sourceColumn: 2, sourceEndLine: 2055, reloadOffsets: [491520]};
MERGE (n:KG {id: 'region:rtype/tiles0'}) SET n:RomRegion SET n += {tag: 'tiles0', size: 131072, flags: '0', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2058, sourceColumn: 2, sourceEndLine: 2058};
MERGE (n:KG {id: 'rom:rtype/tiles0/rt_b-a0.ic20'}) SET n:Rom SET n += {file: 'rt_b-a0.ic20', offset: 0, size: 32768, crc: '4e212fb0', sha1: '687061ecade2ebd0bd1343c9c4a831791853f79c', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2059, sourceColumn: 2, sourceEndLine: 2059};
MERGE (n:KG {id: 'rom:rtype/tiles0/rt_b-a1.ic22'}) SET n:Rom SET n += {file: 'rt_b-a1.ic22', offset: 32768, size: 32768, crc: '8a65bdff', sha1: '130bf6af521f13247a739a95eab4bdaa24b2ac10', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2060, sourceColumn: 2, sourceEndLine: 2060};
MERGE (n:KG {id: 'rom:rtype/tiles0/rt_b-a2.ic20'}) SET n:Rom SET n += {file: 'rt_b-a2.ic20', offset: 65536, size: 32768, crc: '5a4ae5b9', sha1: '95c3b64f50e6f673b2bf9b40642c152da5009d25', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2061, sourceColumn: 2, sourceEndLine: 2061};
MERGE (n:KG {id: 'rom:rtype/tiles0/rt_b-a3.ic23'}) SET n:Rom SET n += {file: 'rt_b-a3.ic23', offset: 98304, size: 32768, crc: '73327606', sha1: '9529ecdedd30e2a0400fb1083117992cc18b5158', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2062, sourceColumn: 2, sourceEndLine: 2062};
MERGE (n:KG {id: 'region:rtype/tiles1'}) SET n:RomRegion SET n += {tag: 'tiles1', size: 131072, flags: '0', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2064, sourceColumn: 2, sourceEndLine: 2064};
MERGE (n:KG {id: 'rom:rtype/tiles1/rt_b-b0.ic26'}) SET n:Rom SET n += {file: 'rt_b-b0.ic26', offset: 0, size: 32768, crc: 'a7b17491', sha1: '5b390770e56ba2d35e108534d7eda8dca996fdf7', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2065, sourceColumn: 2, sourceEndLine: 2065};
MERGE (n:KG {id: 'rom:rtype/tiles1/rt_b-b1.ic27'}) SET n:Rom SET n += {file: 'rt_b-b1.ic27', offset: 32768, size: 32768, crc: 'b9709686', sha1: '700905a3e9661e0874939f54da2909e1396ce596', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2066, sourceColumn: 2, sourceEndLine: 2066};
MERGE (n:KG {id: 'rom:rtype/tiles1/rt_b-b2.ic25'}) SET n:Rom SET n += {file: 'rt_b-b2.ic25', offset: 65536, size: 32768, crc: '433b229a', sha1: '14222eaa3e67e5a7f80eafcf22bac4eb2d485a9a', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2067, sourceColumn: 2, sourceEndLine: 2067};
MERGE (n:KG {id: 'rom:rtype/tiles1/rt_b-b3.ic24'}) SET n:Rom SET n += {file: 'rt_b-b3.ic24', offset: 98304, size: 32768, crc: 'ad89b072', sha1: 'e2683d0e7415f3abd147e518bf6c87e44744cd4f', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2068, sourceColumn: 2, sourceEndLine: 2068};
MERGE (n:KG {id: 'region:rtype/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 512, flags: '0', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2070, sourceColumn: 2, sourceEndLine: 2070};
MERGE (n:KG {id: 'rom:rtype/proms/m72_a-8l-.ic66'}) SET n:Rom SET n += {file: 'm72_a-8l-.ic66', offset: 0, size: 256, crc: 'b460c438', sha1: '00e20cf754b6fd5138ee4d2f6ec28dff9e292fe6', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2071, sourceColumn: 2, sourceEndLine: 2071};
MERGE (n:KG {id: 'rom:rtype/proms/m72_a-9l-.ic75'}) SET n:Rom SET n += {file: 'm72_a-9l-.ic75', offset: 256, size: 256, crc: 'a4f2c4bc', sha1: 'f13b0a4b52dcc6704063b676f09d83dcba170133', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2072, sourceColumn: 2, sourceEndLine: 2072};
MERGE (n:KG {id: 'region:rtype/plds'}) SET n:RomRegion SET n += {tag: 'plds', size: 1536, flags: '0', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2074, sourceColumn: 2, sourceEndLine: 2074};
MERGE (n:KG {id: 'rom:rtype/plds/m72_a-3d-.ic11'}) SET n:Rom SET n += {file: 'm72_a-3d-.ic11', offset: 0, size: 279, crc: '8a3732ff', sha1: '6e3039e7dc424cbef7156312fa1ce67d7b082d30', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2075, sourceColumn: 2, sourceEndLine: 2075};
MERGE (n:KG {id: 'rom:rtype/plds/m72_a-4d-.ic19'}) SET n:Rom SET n += {file: 'm72_a-4d-.ic19', offset: 512, size: 279, crc: '56c29834', sha1: 'a66c589845f9995c673325f1161c687eb90d68c1', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2076, sourceColumn: 2, sourceEndLine: 2076};
MERGE (n:KG {id: 'rom:rtype/plds/m72_r-3a-.3a'}) SET n:Rom SET n += {file: 'm72_r-3a-.3a', offset: 1024, size: 279, crc: '055af779', sha1: '740d860df45109710e082d79c534ec0eeaa779f2', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2077, sourceColumn: 2, sourceEndLine: 2077};
MERGE (n:KG {id: 'map:m72_state.m72_cpu1_common_map'}) SET n:AddressMap SET n += {cls: 'm72_state', name: 'm72_cpu1_common_map', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 594, sourceColumn: 1, sourceEndLine: 603};
MERGE (n:KG {id: 'map:m72_state.m72_cpu1_common_map/range0'}) SET n:AddressRange SET n += {start: 786432, end: 787455, raw: 'map(0xc0000, 0xc03ff).ram().share("spriteram")', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 596, sourceColumn: 2, sourceEndLine: 596, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:m72_state.m72_cpu1_common_map/range1'}) SET n:AddressRange SET n += {start: 819200, end: 822271, raw: 'map(0xc8000, 0xc8bff).rw(FUNC(m72_state::palette_r<0>), FUNC(m72_state::palette_w<0>)).share(m_paletteram[0])', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 597, sourceColumn: 2, sourceEndLine: 597, share: 'paletteram[0]'};
MERGE (n:KG {id: 'handler:m72_state.palette_r_0'}) SET n:Handler SET n += {method: 'palette_r_0', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 544, sourceColumn: 1, sourceEndLine: 550, sourceConstants: ['N=0'], sourceParameters: 'offs_t offset', sourceBody: '/* A9 isn\'t connected, so 0x200-0x3ff mirrors 0x000-0x1ff etc. */
	offset &= ~0x100;

	return m_paletteram[N][offset] | 0xffe0;    /* only D0-D4 are connected */'};
MERGE (n:KG {id: 'handler:m72_state.palette_w_0'}) SET n:Handler SET n += {method: 'palette_w_0', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 558, sourceColumn: 1, sourceEndLine: 569, sourceConstants: ['N=0'], sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: '/* A9 isn\'t connected, so 0x200-0x3ff mirrors 0x000-0x1ff etc. */
	offset &= ~0x100;

	COMBINE_DATA(&m_paletteram[N][offset]);
	offset &= 0x0ff;
	changecolor(offset + (N << 8),
			m_paletteram[N][offset + 0x000],
			m_paletteram[N][offset + 0x200],
			m_paletteram[N][offset + 0x400]);'};
MERGE (n:KG {id: 'handler:m72_state.changecolor'}) SET n:Handler SET n += {method: 'changecolor', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 552, sourceColumn: 1, sourceEndLine: 555, sourceParameters: 'offs_t color, u8 r, u8 g, u8 b', sourceBody: 'm_palette->set_pen_color(color,pal5bit(r),pal5bit(g),pal5bit(b));'};
MERGE (n:KG {id: 'map:m72_state.m72_cpu1_common_map/range2'}) SET n:AddressRange SET n += {start: 835584, end: 838655, raw: 'map(0xcc000, 0xccbff).rw(FUNC(m72_state::palette_r<1>), FUNC(m72_state::palette_w<1>)).share(m_paletteram[1])', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 598, sourceColumn: 2, sourceEndLine: 598, share: 'paletteram[1]'};
MERGE (n:KG {id: 'handler:m72_state.palette_r_1'}) SET n:Handler SET n += {method: 'palette_r_1', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 544, sourceColumn: 1, sourceEndLine: 550, sourceConstants: ['N=1'], sourceParameters: 'offs_t offset', sourceBody: '/* A9 isn\'t connected, so 0x200-0x3ff mirrors 0x000-0x1ff etc. */
	offset &= ~0x100;

	return m_paletteram[N][offset] | 0xffe0;    /* only D0-D4 are connected */'};
MERGE (n:KG {id: 'handler:m72_state.palette_w_1'}) SET n:Handler SET n += {method: 'palette_w_1', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 558, sourceColumn: 1, sourceEndLine: 569, sourceConstants: ['N=1'], sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: '/* A9 isn\'t connected, so 0x200-0x3ff mirrors 0x000-0x1ff etc. */
	offset &= ~0x100;

	COMBINE_DATA(&m_paletteram[N][offset]);
	offset &= 0x0ff;
	changecolor(offset + (N << 8),
			m_paletteram[N][offset + 0x000],
			m_paletteram[N][offset + 0x200],
			m_paletteram[N][offset + 0x400]);'};
MERGE (n:KG {id: 'map:m72_state.m72_cpu1_common_map/range3'}) SET n:AddressRange SET n += {start: 851968, end: 868351, raw: 'map(0xd0000, 0xd3fff).ram().w(FUNC(m72_state::videoram1_w)).share(m_videoram[0])', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 599, sourceColumn: 2, sourceEndLine: 599, ram: true, share: 'videoram[0]'};
MERGE (n:KG {id: 'handler:m72_state.videoram1_w'}) SET n:Handler SET n += {method: 'videoram1_w', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 252, sourceColumn: 1, sourceEndLine: 256, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_videoram[0][offset]);
	m_fg_tilemap->mark_tile_dirty(offset/2);'};
MERGE (n:KG {id: 'map:m72_state.m72_cpu1_common_map/range4'}) SET n:AddressRange SET n += {start: 884736, end: 901119, raw: 'map(0xd8000, 0xdbfff).ram().w(FUNC(m72_state::videoram2_w)).share(m_videoram[1])', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 600, sourceColumn: 2, sourceEndLine: 600, ram: true, share: 'videoram[1]'};
MERGE (n:KG {id: 'handler:m72_state.videoram2_w'}) SET n:Handler SET n += {method: 'videoram2_w', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 258, sourceColumn: 1, sourceEndLine: 262, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_videoram[1][offset]);
	m_bg_tilemap->mark_tile_dirty(offset/2);'};
MERGE (n:KG {id: 'map:m72_state.m72_cpu1_common_map/range5'}) SET n:AddressRange SET n += {start: 917504, end: 983039, raw: 'map(0xe0000, 0xeffff).rw(FUNC(m72_state::soundram_r), FUNC(m72_state::soundram_w))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 601, sourceColumn: 2, sourceEndLine: 601};
MERGE (n:KG {id: 'handler:m72_state.soundram_r'}) SET n:Handler SET n += {method: 'soundram_r', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 584, sourceColumn: 1, sourceEndLine: 587, sourceParameters: 'offs_t offset', sourceBody: 'return m_soundram[offset];'};
MERGE (n:KG {id: 'handler:m72_state.soundram_w'}) SET n:Handler SET n += {method: 'soundram_w', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 589, sourceColumn: 1, sourceEndLine: 592, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'm_soundram[offset] = data;'};
MERGE (n:KG {id: 'map:m72_state.m72_cpu1_common_map/range6'}) SET n:AddressRange SET n += {start: 1048560, end: 1048575, raw: 'map(0xffff0, 0xfffff).rom()', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 602, sourceColumn: 2, sourceEndLine: 602, rom: true};
MERGE (n:KG {id: 'map:m72_state.m72_map'}) SET n:AddressMap SET n += {cls: 'm72_state', name: 'm72_map', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 605, sourceColumn: 1, sourceEndLine: 610, calls: ['m72_cpu1_common_map']};
MERGE (n:KG {id: 'map:m72_state.m72_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 524287, raw: 'map(0x00000, 0x7ffff).rom()', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 608, sourceColumn: 2, sourceEndLine: 608, rom: true};
MERGE (n:KG {id: 'map:m72_state.m72_map/range1'}) SET n:AddressRange SET n += {start: 655360, end: 671743, raw: 'map(0xa0000, 0xa3fff).ram()', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 609, sourceColumn: 2, sourceEndLine: 609, ram: true};
MERGE (n:KG {id: 'map:m72_state.rtype_map'}) SET n:AddressMap SET n += {cls: 'm72_state', name: 'rtype_map', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 612, sourceColumn: 1, sourceEndLine: 617, calls: ['m72_cpu1_common_map']};
MERGE (n:KG {id: 'map:m72_state.rtype_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 262143, raw: 'map(0x00000, 0x3ffff).rom()', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 615, sourceColumn: 2, sourceEndLine: 615, rom: true};
MERGE (n:KG {id: 'map:m72_state.rtype_map/range1'}) SET n:AddressRange SET n += {start: 262144, end: 278527, raw: 'map(0x40000, 0x43fff).ram()', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 616, sourceColumn: 2, sourceEndLine: 616, ram: true};
MERGE (n:KG {id: 'handler:m72_state.irq_line_w'}) SET n:Handler SET n += {method: 'irq_line_w', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 274, sourceColumn: 1, sourceEndLine: 285, sourceConstants: ['NEC_INPUT_LINE_INTP2=12'], sourceParameters: 'u16 data', sourceBody: '// KNA70H015(11): ISET
	m_raster_irq_position = (data & 0x1ff) - 128;
	// printf("m_raster_irq_position %d\\n", m_raster_irq_position);

	// bchopper title screen jumps around, as does ingame at times, if this isn\'t done here
	if (m_upd71059c.found())
		m_upd71059c->ir2_w(0);
	else
		m_maincpu->set_input_line(NEC_INPUT_LINE_INTP2, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:m72_state.dmaon_w'}) SET n:Handler SET n += {method: 'dmaon_w', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 287, sourceColumn: 1, sourceEndLine: 290, sourceParameters: 'u8 data', sourceBody: 'm_spriteram->copy();'};
MERGE (n:KG {id: 'map:m72_state.m72_portmap'}) SET n:AddressMap SET n += {cls: 'm72_state', name: 'm72_portmap', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 748, sourceColumn: 1, sourceEndLine: 762};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range0'}) SET n:AddressRange SET n += {start: 0, end: 1, raw: 'map(0x00, 0x01).portr("IN0")', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 750, sourceColumn: 2, sourceEndLine: 750, portRead: 'IN0'};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range1'}) SET n:AddressRange SET n += {start: 2, end: 3, raw: 'map(0x02, 0x03).portr("IN1")', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 751, sourceColumn: 2, sourceEndLine: 751, portRead: 'IN1'};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range2'}) SET n:AddressRange SET n += {start: 4, end: 5, raw: 'map(0x04, 0x05).portr("DSW")', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 752, sourceColumn: 2, sourceEndLine: 752, portRead: 'DSW'};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range3'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).w("soundlatch", FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 753, sourceColumn: 2, sourceEndLine: 753};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 898, sourceColumn: 2, sourceEndLine: 898};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range4'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).w(FUNC(m72_state::port02_w))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 754, sourceColumn: 2, sourceEndLine: 754};
MERGE (n:KG {id: 'handler:m72_state.port02_w'}) SET n:Handler SET n += {method: 'port02_w', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 293, sourceColumn: 1, sourceEndLine: 314, sourceParameters: 'u8 data', sourceBody: 'if (data & 0xe0) logerror("write %02x to port 02\\n",data);

	/* bits 0/1 are coin counters */
	machine().bookkeeping().coin_counter_w(0, BIT(data, 0));
	machine().bookkeeping().coin_counter_w(1, BIT(data, 1));

	/* bit 2 is flip screen (handled both by software and hardware) */
	flip_screen_set(BIT(data, 2) ^ BIT(~m_io_dsw->read(), 8));

	/* bit 3 is display disable */
	m_video_off = BIT(data, 3);

	/* bit 4 resets sound CPU (active low) */
	if (BIT(data, 4))
		m_soundcpu->set_input_line(INPUT_LINE_RESET, CLEAR_LINE);
	else
		m_soundcpu->set_input_line(INPUT_LINE_RESET, ASSERT_LINE);

	/* bit 5 = "bank"? */', inputMembers: ['m_io_dsw=DSW']};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range5'}) SET n:AddressRange SET n += {start: 4, end: 4, raw: 'map(0x04, 0x04).w(FUNC(m72_state::dmaon_w))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 755, sourceColumn: 2, sourceEndLine: 755};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range6'}) SET n:AddressRange SET n += {start: 6, end: 7, raw: 'map(0x06, 0x07).w(FUNC(m72_state::irq_line_w))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 756, sourceColumn: 2, sourceEndLine: 756};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range7'}) SET n:AddressRange SET n += {start: 64, end: 67, raw: 'map(0x40, 0x43).rw(m_upd71059c, FUNC(pic8259_device::read), FUNC(pic8259_device::write)).umask16(0x00ff)', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 757, sourceColumn: 2, sourceEndLine: 757, umask: 255};
MERGE (n:KG {id: 'handler:pic8259_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'pic8259_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 847, sourceColumn: 2, sourceEndLine: 847};
MERGE (n:KG {id: 'handler:pic8259_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'pic8259_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 847, sourceColumn: 2, sourceEndLine: 847};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range8'}) SET n:AddressRange SET n += {start: 128, end: 129, raw: 'map(0x80, 0x81).w(FUNC(m72_state::scrolly_w<0>))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 758, sourceColumn: 2, sourceEndLine: 758};
MERGE (n:KG {id: 'handler:m72_state.scrolly_w_0'}) SET n:Handler SET n += {method: 'scrolly_w_0', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 578, sourceColumn: 1, sourceEndLine: 581, sourceConstants: ['N=0'], sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_scrolly[N]);'};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range9'}) SET n:AddressRange SET n += {start: 130, end: 131, raw: 'map(0x82, 0x83).w(FUNC(m72_state::scrollx_w<0>))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 759, sourceColumn: 2, sourceEndLine: 759};
MERGE (n:KG {id: 'handler:m72_state.scrollx_w_0'}) SET n:Handler SET n += {method: 'scrollx_w_0', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 572, sourceColumn: 1, sourceEndLine: 575, sourceConstants: ['N=0'], sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_scrollx[N]);'};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range10'}) SET n:AddressRange SET n += {start: 132, end: 133, raw: 'map(0x84, 0x85).w(FUNC(m72_state::scrolly_w<1>))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 760, sourceColumn: 2, sourceEndLine: 760};
MERGE (n:KG {id: 'handler:m72_state.scrolly_w_1'}) SET n:Handler SET n += {method: 'scrolly_w_1', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 578, sourceColumn: 1, sourceEndLine: 581, sourceConstants: ['N=1'], sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_scrolly[N]);'};
MERGE (n:KG {id: 'map:m72_state.m72_portmap/range11'}) SET n:AddressRange SET n += {start: 134, end: 135, raw: 'map(0x86, 0x87).w(FUNC(m72_state::scrollx_w<1>))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 761, sourceColumn: 2, sourceEndLine: 761};
MERGE (n:KG {id: 'handler:m72_state.scrollx_w_1'}) SET n:Handler SET n += {method: 'scrollx_w_1', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 572, sourceColumn: 1, sourceEndLine: 575, sourceConstants: ['N=1'], sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_scrollx[N]);'};
MERGE (n:KG {id: 'map:m72_state.sound_ram_map'}) SET n:AddressMap SET n += {cls: 'm72_state', name: 'sound_ram_map', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 869, sourceColumn: 1, sourceEndLine: 872};
MERGE (n:KG {id: 'map:m72_state.sound_ram_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 65535, raw: 'map(0x0000, 0xffff).ram().share(m_soundram)', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 871, sourceColumn: 2, sourceEndLine: 871, ram: true, share: 'soundram'};
MERGE (n:KG {id: 'map:m72_state.rtype_sound_portmap'}) SET n:AddressMap SET n += {cls: 'm72_state', name: 'rtype_sound_portmap', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 880, sourceColumn: 1, sourceEndLine: 886, globalMask: 255};
MERGE (n:KG {id: 'map:m72_state.rtype_sound_portmap/range0'}) SET n:AddressRange SET n += {start: 0, end: 1, raw: 'map(0x00, 0x01).rw("ymsnd", FUNC(ym2151_device::read), FUNC(ym2151_device::write))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 883, sourceColumn: 2, sourceEndLine: 883};
MERGE (n:KG {id: 'handler:ym2151_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2151_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 918, sourceColumn: 2, sourceEndLine: 918};
MERGE (n:KG {id: 'handler:ym2151_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2151_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 918, sourceColumn: 2, sourceEndLine: 918};
MERGE (n:KG {id: 'map:m72_state.rtype_sound_portmap/range1'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).r("soundlatch", FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 884, sourceColumn: 2, sourceEndLine: 884};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 932, sourceColumn: 2, sourceEndLine: 932};
MERGE (n:KG {id: 'map:m72_state.rtype_sound_portmap/range2'}) SET n:AddressRange SET n += {start: 6, end: 6, raw: 'map(0x06, 0x06).w("soundlatch", FUNC(generic_latch_8_device::acknowledge_w))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 885, sourceColumn: 2, sourceEndLine: 885};
MERGE (n:KG {id: 'handler:generic_latch_8_device.acknowledge_w'}) SET n:Handler SET n += {method: 'acknowledge_w', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 932, sourceColumn: 2, sourceEndLine: 932};
MERGE (n:KG {id: 'map:m72_state.sound_portmap'}) SET n:AddressMap SET n += {cls: 'm72_state', name: 'sound_portmap', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 888, sourceColumn: 1, sourceEndLine: 893, calls: ['rtype_sound_portmap']};
MERGE (n:KG {id: 'map:m72_state.sound_portmap/range0'}) SET n:AddressRange SET n += {start: 130, end: 130, raw: 'map(0x82, 0x82).w(m_audio, FUNC(m72_audio_device::sample_w))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 891, sourceColumn: 2, sourceEndLine: 891};
MERGE (n:KG {id: 'handler:m72_audio_device.sample_w'}) SET n:Handler SET n += {method: 'sample_w', ownerClass: 'm72_audio_device', sourceFile: 'src/mame/irem/m72_a.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 131, sourceParameters: 'u8 data', sourceBody: 'm_dac->write(data);
	m_sample_addr++;'};
MERGE (n:KG {id: 'map:m72_state.sound_portmap/range1'}) SET n:AddressRange SET n += {start: 132, end: 132, raw: 'map(0x84, 0x84).r(m_audio, FUNC(m72_audio_device::sample_r))', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 892, sourceColumn: 2, sourceEndLine: 892};
MERGE (n:KG {id: 'handler:m72_audio_device.sample_r'}) SET n:Handler SET n += {method: 'sample_r', ownerClass: 'm72_audio_device', sourceFile: 'src/mame/irem/m72_a.cpp', sourceLine: 122, sourceColumn: 1, sourceEndLine: 125, sourceParameters: '', sourceBody: 'return read_byte(m_sample_addr);'};
MERGE (n:KG {id: 'machine:m72_state.m72_audio_chips'}) SET n:MachineConfig SET n += {cls: 'm72_state', name: 'm72_audio_chips', calls: [], stateMembers: ['{"name":"m_raster_irq_position","bits":32,"signed":true}', '{"name":"m_scrollx","bits":32,"signed":true,"arrayLength":2}', '{"name":"m_scrolly","bits":32,"signed":true,"arrayLength":2}', '{"name":"m_video_off","bits":1}', '{"name":"m_fg_source","bits":32,"signed":true}', '{"name":"m_bg_source","bits":32,"signed":true}'], resetHandlers: ['m72_state.machine_reset'], devicePatches: ['{"tag":"soundcpu","config":["m_soundcpu->set_irq_acknowledge_callback(\\"soundirq\\", FUNC(rst_neg_buffer_device::inta_cb))"]}'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1660, sourceColumn: 1, sourceEndLine: 1682};
MERGE (n:KG {id: 'handler:m72_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 233, sourceColumn: 1, sourceEndLine: 243, sourceParameters: '', sourceBody: '//m_mcu_snd_cmd_latch = 0;

	m_scanline_timer->adjust(m_screen->time_until_pos(0));
	machine().scheduler().synchronize(timer_expired_delegate(FUNC(m72_state::synch_callback),this));

	// Hold sound CPU in reset if main CPU has to upload the program into RAM
	if (m_soundram.found())
		m_soundcpu->set_input_line(INPUT_LINE_RESET, ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:m72_state.synch_callback'}) SET n:Handler SET n += {method: 'synch_callback', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 227, sourceColumn: 1, sourceEndLine: 231, sourceConstants: ['MASTER_CLOCK=32000000'], sourceParameters: 'int param', sourceBody: '//machine().scheduler().perfect_quantum(attotime::from_usec(8000000));
	machine().scheduler().add_quantum(attotime::from_hz(MASTER_CLOCK/4/12), attotime::from_seconds(25));'};
MERGE (n:KG {id: 'machine:m72_state.m72_audio_chips/callback:soundcpu:0'}) SET n:Callback SET n += {signal: 'set_irq_acknowledge_callback', operation: 'set_irq_acknowledge_callback', raw: 'm_soundcpu->set_irq_acknowledge_callback("soundirq", FUNC(rst_neg_buffer_device::inta_cb))', ownerTag: 'soundcpu', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1671, sourceColumn: 2, sourceEndLine: 1671, targetTag: 'soundirq', targetClass: 'rst_neg_buffer_device', targetMethod: 'inta_cb'};
MERGE (n:KG {id: 'handler:rst_neg_buffer_device.inta_cb'}) SET n:Handler SET n += {method: 'inta_cb', ownerClass: 'rst_neg_buffer_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1671, sourceColumn: 2, sourceEndLine: 1671};
MERGE (n:KG {id: 'device:m72_state.m72_audio_chips/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1663, sourceColumn: 2, sourceEndLine: 1663};
MERGE (n:KG {id: 'device:m72_state.m72_audio_chips/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['generic_latch_8_device &soundlatch(GENERIC_LATCH_8(config, "soundlatch"))', 'soundlatch.data_pending_callback().set("soundirq", FUNC(rst_neg_buffer_device::rst18_w))', 'soundlatch.set_separate_acknowledge(true)'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1665, sourceColumn: 2, sourceEndLine: 1665};
MERGE (n:KG {id: 'device:m72_state.m72_audio_chips/soundlatch/callback:soundlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set', raw: 'soundlatch.data_pending_callback().set("soundirq", FUNC(rst_neg_buffer_device::rst18_w))', ownerTag: 'soundlatch', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1666, sourceColumn: 2, sourceEndLine: 1666, targetTag: 'soundirq', targetClass: 'rst_neg_buffer_device', targetMethod: 'rst18_w'};
MERGE (n:KG {id: 'handler:rst_neg_buffer_device.rst18_w'}) SET n:Handler SET n += {method: 'rst18_w', ownerClass: 'rst_neg_buffer_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1666, sourceColumn: 2, sourceEndLine: 1666};
MERGE (n:KG {id: 'device:m72_state.m72_audio_chips/soundirq'}) SET n:Device SET n += {type: 'RST_NEG_BUFFER', tag: 'soundirq', clock: null, config: ['RST_NEG_BUFFER(config, "soundirq").int_callback().set_inputline(m_soundcpu, 0)'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1669, sourceColumn: 2, sourceEndLine: 1669};
MERGE (n:KG {id: 'device:m72_state.m72_audio_chips/soundirq/callback:soundirq:0'}) SET n:Callback SET n += {signal: 'int_callback', operation: 'set_inputline', raw: 'RST_NEG_BUFFER(config, "soundirq").int_callback().set_inputline(m_soundcpu, 0)', ownerTag: 'soundirq', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1669, sourceColumn: 2, sourceEndLine: 1669, inputLine: '0', targetTag: 'soundcpu'};
MERGE (n:KG {id: 'device:m72_state.m72_audio_chips/ymsnd'}) SET n:Device SET n += {type: 'YM2151', tag: 'ymsnd', clock: 3579545, config: ['ym2151_device &ymsnd(YM2151(config, "ymsnd", SOUND_CLOCK))', 'ymsnd.irq_handler().set("soundirq", FUNC(rst_neg_buffer_device::rst28_w))', 'ymsnd.add_route(ALL_OUTPUTS, "speaker", 0.33)'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1677, sourceColumn: 2, sourceEndLine: 1677};
MERGE (n:KG {id: 'audioroute:device:m72_state.m72_audio_chips/ymsnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.33, raw: 'ymsnd.add_route(ALL_OUTPUTS, "speaker", 0.33)', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1679, sourceColumn: 2, sourceEndLine: 1679};
MERGE (n:KG {id: 'device:m72_state.m72_audio_chips/ymsnd/callback:ymsnd:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set', raw: 'ymsnd.irq_handler().set("soundirq", FUNC(rst_neg_buffer_device::rst28_w))', ownerTag: 'ymsnd', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1678, sourceColumn: 2, sourceEndLine: 1678, targetTag: 'soundirq', targetClass: 'rst_neg_buffer_device', targetMethod: 'rst28_w'};
MERGE (n:KG {id: 'handler:rst_neg_buffer_device.rst28_w'}) SET n:Handler SET n += {method: 'rst28_w', ownerClass: 'rst_neg_buffer_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1678, sourceColumn: 2, sourceEndLine: 1678};
MERGE (n:KG {id: 'machine:m72_state.m72_base'}) SET n:MachineConfig SET n += {cls: 'm72_state', name: 'm72_base', calls: ['m72_audio_chips'], stateMembers: ['{"name":"m_raster_irq_position","bits":32,"signed":true}', '{"name":"m_scrollx","bits":32,"signed":true,"arrayLength":2}', '{"name":"m_scrolly","bits":32,"signed":true,"arrayLength":2}', '{"name":"m_video_off","bits":1}', '{"name":"m_fg_source","bits":32,"signed":true}', '{"name":"m_bg_source","bits":32,"signed":true}'], resetHandlers: ['m72_state.machine_reset'], startHandlers: ['m72_state.video_start_m72'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1684, sourceColumn: 1, sourceEndLine: 1713};
MERGE (n:KG {id: 'handler:m72_state.video_start_m72'}) SET n:Handler SET n += {method: 'video_start_m72', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 87, sourceColumn: 1, sourceEndLine: 115, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(m72_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8,8, 64,64);
	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(m72_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8,8, 64,64);

	m_fg_tilemap->set_transmask(0,0xffff,0x0001);
	m_fg_tilemap->set_transmask(1,0x00ff,0xff01);
	m_fg_tilemap->set_transmask(2,0x0001,0xffff);
	m_fg_tilemap->set_transmask(3,0x0001,0xffff);

	m_bg_tilemap->set_transmask(0,0xffff,0x0000);
	m_bg_tilemap->set_transmask(1,0x00ff,0xff00);
	m_bg_tilemap->set_transmask(2,0x0001,0xfffe);
	m_bg_tilemap->set_transmask(3,0x0001,0xfffe);

	memset(m_spriteram->buffer(),0,m_spriteram->bytes());

	m_fg_tilemap->set_scrolldx(0,0);
	m_fg_tilemap->set_scrolldy(-128,-128);

	m_bg_tilemap->set_scrolldx(0,0);
	m_bg_tilemap->set_scrolldy(-128,-128);

	// on M72 the FG data always comes from the Ax roms and the BG data always comes from the Bx roms
	m_fg_source = 1;
	m_bg_source = 2;

	register_savestate();'};
MERGE (n:KG {id: 'handler:m72_state.register_savestate'}) SET n:Handler SET n += {method: 'register_savestate', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 76, sourceColumn: 1, sourceEndLine: 82, sourceParameters: '', sourceBody: 'save_item(NAME(m_raster_irq_position));
	save_item(NAME(m_video_off));
	save_item(NAME(m_scrollx));
	save_item(NAME(m_scrolly));'};
MERGE (n:KG {id: 'handler:m72_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 36, sourceColumn: 1, sourceEndLine: 39, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'm72_m81_get_tile_info(tileinfo, tile_index, m_videoram[1], m_bg_source);'};
MERGE (n:KG {id: 'handler:m72_state.m72_m81_get_tile_info'}) SET n:Handler SET n += {method: 'm72_m81_get_tile_info', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 13, sourceColumn: 1, sourceEndLine: 33, sourceParameters: 'tile_data &tileinfo, int tile_index, const u16 *vram, int gfxnum', sourceBody: '// word 0               word 1
	// fftt tttt tttt tttt  ---- ---- zz-? pppp

	// f = flips, t = tilenum, z = pri, p = palette
	// ? = possible more priority

	tile_index *= 2;

	const u16 code = vram[tile_index];
	const u16 attr = vram[tile_index+1];

	/* attr & 0x0010 is used in bchopper and hharry, more priority? */

	tileinfo.set(gfxnum,
			code & 0x3fff,
			attr & 0x000f,
			TILE_FLIPYX((code & 0xc000) >> 14));
	tileinfo.group = (attr & 0x00c0) >> 6;'};
MERGE (n:KG {id: 'handler:m72_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 41, sourceColumn: 1, sourceEndLine: 44, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'm72_m81_get_tile_info(tileinfo, tile_index, m_videoram[0], m_fg_source);'};
MERGE (n:KG {id: 'device:m72_state.m72_base/maincpu'}) SET n:Device SET n += {type: 'V30', tag: 'maincpu', clock: 8000000, config: ['V30(config, m_maincpu, MASTER_CLOCK/2/2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &m72_state::m72_map)', 'm_maincpu->set_addrmap(AS_IO, &m72_state::m72_portmap)', 'm_maincpu->set_irq_acknowledge_callback("upd71059c", FUNC(pic8259_device::inta_cb))'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1687, sourceColumn: 2, sourceEndLine: 1687};
MERGE (n:KG {id: 'device:m72_state.m72_base/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_irq_acknowledge_callback', operation: 'set_irq_acknowledge_callback', raw: 'm_maincpu->set_irq_acknowledge_callback("upd71059c", FUNC(pic8259_device::inta_cb))', ownerTag: 'maincpu', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1690, sourceColumn: 2, sourceEndLine: 1690, targetTag: 'upd71059c', targetClass: 'pic8259_device', targetMethod: 'inta_cb'};
MERGE (n:KG {id: 'handler:pic8259_device.inta_cb'}) SET n:Handler SET n += {method: 'inta_cb', ownerClass: 'pic8259_device', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1966, sourceColumn: 2, sourceEndLine: 1966};
MERGE (n:KG {id: 'device:m72_state.m72_base/soundcpu'}) SET n:Device SET n += {type: 'Z80', tag: 'soundcpu', clock: 3579545, config: ['Z80(config, m_soundcpu, SOUND_CLOCK)', 'm_soundcpu->set_addrmap(AS_PROGRAM, &m72_state::sound_ram_map)', 'm_soundcpu->set_addrmap(AS_IO, &m72_state::sound_portmap)', 'm_soundcpu->set_irq_acknowledge_callback("soundirq", FUNC(rst_neg_buffer_device::inta_cb))'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1692, sourceColumn: 2, sourceEndLine: 1692};
MERGE (n:KG {id: 'device:m72_state.m72_base/upd71059c'}) SET n:Device SET n += {type: 'PIC8259', tag: 'upd71059c', clock: null, config: ['PIC8259(config, m_upd71059c)', 'm_upd71059c->out_int_callback().set_inputline(m_maincpu, 0)'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1696, sourceColumn: 2, sourceEndLine: 1696};
MERGE (n:KG {id: 'device:m72_state.m72_base/upd71059c/callback:upd71059c:0'}) SET n:Callback SET n += {signal: 'out_int_callback', operation: 'set_inputline', raw: 'm_upd71059c->out_int_callback().set_inputline(m_maincpu, 0)', ownerTag: 'upd71059c', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1697, sourceColumn: 2, sourceEndLine: 1697, inputLine: '0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:m72_state.m72_base/spriteram'}) SET n:Device SET n += {type: 'BUFFERED_SPRITERAM16', tag: 'spriteram', clock: null, config: ['BUFFERED_SPRITERAM16(config, m_spriteram)'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1700, sourceColumn: 2, sourceEndLine: 1700};
MERGE (n:KG {id: 'device:m72_state.m72_base/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_m72)'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1702, sourceColumn: 2, sourceEndLine: 1702, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:m72_state.m72_base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_entries(512)'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1703, sourceColumn: 2, sourceEndLine: 1703};
MERGE (n:KG {id: 'device:m72_state.m72_base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(MASTER_CLOCK/4, 512, 64, 448, 284, 0, 256)', 'm_screen->set_screen_update(FUNC(m72_state::screen_update))', 'm_screen->set_palette(m_palette)'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1705, sourceColumn: 2, sourceEndLine: 1705, configCalls: ['set_raw(8000000,512,64,448,284,0,256)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [8000000, 512, 64, 448, 284, 0, 256], screenRawExpr: ['MASTER_CLOCK/4', '512', '64', '448', '284', '0', '256']};
MERGE (n:KG {id: 'device:m72_state.m72_base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(m72_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1707, sourceColumn: 2, sourceEndLine: 1707, targetClass: 'm72_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:m72_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 472, sourceColumn: 1, sourceEndLine: 508, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'if (m_video_off)
	{
		bitmap.fill(m_palette->black_pen(), cliprect);
		return 0;
	}

	screen.priority().fill(0, cliprect);

	m_fg_tilemap->set_scrollx(0,m_scrollx[0]);
	m_fg_tilemap->set_scrolly(0,m_scrolly[0]);

	m_bg_tilemap->set_scrollx(0,m_scrollx[1]);
	m_bg_tilemap->set_scrolly(0,m_scrolly[1]);

	// prepare screen priority for sprites
	m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER0, 1);
	m_fg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER0, 1);

	// tile-tile priorities are different, see m72_mcu_state games POST & bchopper ending sequence
	m_bg_tilemap->set_transmask(2, 0xffff, 0x0000);

	// low priority tiles
	m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER1, 0);
	m_fg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER1, 0);

	// high priority tiles
	m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER0, 0);
	m_fg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER0, 0);

	m_bg_tilemap->set_transmask(2, 0x0001, 0xfffe);

	draw_sprites(screen, bitmap, cliprect);

	return 0;'};
MERGE (n:KG {id: 'handler:m72_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'm72_state', sourceFile: 'src/mame/irem/m72_v.cpp', sourceLine: 370, sourceColumn: 1, sourceEndLine: 425, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'u16 *spriteram = m_spriteram->buffer();
	std::vector<int> spritelist;

	// reverse spritelist due to priority buffer
	for (int i = 0, w = 0; i < m_spriteram->length(); i += w * 4)
	{
		spritelist.push_back(i);
		w = 1 << ((spriteram[i+2] & 0xc000) >> 14);
	}

	for (int i = spritelist.size() - 1; i >= 0; i--)
	{
		const int offs = spritelist[i];
		const int code = spriteram[offs+1];
		const u32 color = spriteram[offs+2] & 0x0f;
		int sx = -256 + (spriteram[offs+3] & 0x3ff);
		int sy = 384 - (spriteram[offs+0] & 0x1ff);
		int flipx = spriteram[offs+2] & 0x0800;
		int flipy = spriteram[offs+2] & 0x0400;

		const int w = 1 << ((spriteram[offs+2] & 0xc000) >> 14);
		const int h = 1 << ((spriteram[offs+2] & 0x3000) >> 12);
		sy -= 16 * h;

		if (flip_screen())
		{
			sx = 512 - 16*w - sx;
			sy = 284 - 16*h - sy;
			flipx = !flipx;
			flipy = !flipy;
		}

		for (int x = 0; x < w; x++)
		{
			for (int y = 0; y < h; y++)
			{
				int c = code;

				if (flipx) c += 8*(w-1-x);
				else c += 8*x;
				if (flipy) c += h-1-y;
				else c += y;

				m_gfxdecode->gfx(0)->prio_transpen(bitmap, cliprect,
						c, color,
						flipx, flipy,
						sx + 16*x,
						sy + 16*y,
						screen.priority(), ~1,
						0);
			}
		}
	}'};
MERGE (n:KG {id: 'machine:m72_state.rtype'}) SET n:MachineConfig SET n += {cls: 'm72_state', name: 'rtype', calls: ['m72_base'], stateMembers: ['{"name":"m_raster_irq_position","bits":32,"signed":true}', '{"name":"m_scrollx","bits":32,"signed":true,"arrayLength":2}', '{"name":"m_scrolly","bits":32,"signed":true,"arrayLength":2}', '{"name":"m_video_off","bits":1}', '{"name":"m_fg_source","bits":32,"signed":true}', '{"name":"m_bg_source","bits":32,"signed":true}'], resetHandlers: ['m72_state.machine_reset'], removedDevices: ['m72', 'dac'], sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1785, sourceColumn: 1, sourceEndLine: 1793};
MERGE (n:KG {id: 'inputs:common'}) SET n:InputPorts SET n += {name: 'common', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 980, sourceColumn: 8, sourceEndLine: 980};
MERGE (n:KG {id: 'inputs:common/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:common/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:common/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:common/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:common/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:common/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON4', defaultValue: 16};
MERGE (n:KG {id: 'inputs:common/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON3', defaultValue: 32};
MERGE (n:KG {id: 'inputs:common/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:common/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 128};
MERGE (n:KG {id: 'inputs:common/IN0/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 256};
MERGE (n:KG {id: 'inputs:common/IN0/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 512};
MERGE (n:KG {id: 'inputs:common/IN0/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1024};
MERGE (n:KG {id: 'inputs:common/IN0/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 2048};
MERGE (n:KG {id: 'inputs:common/IN0/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 4096, activeLow: true, type: 'IPT_BUTTON4', modifiers: ['PORT_COCKTAIL'], defaultValue: 4096};
MERGE (n:KG {id: 'inputs:common/IN0/f13'}) SET n:PortField SET n += {kind: 'bit', mask: 8192, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_COCKTAIL'], defaultValue: 8192};
MERGE (n:KG {id: 'inputs:common/IN0/f14'}) SET n:PortField SET n += {kind: 'bit', mask: 16384, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 16384};
MERGE (n:KG {id: 'inputs:common/IN0/f15'}) SET n:PortField SET n += {kind: 'bit', mask: 32768, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 32768};
MERGE (n:KG {id: 'inputs:common/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:common/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:common/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:common/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_COIN1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:common/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_COIN2', defaultValue: 8};
MERGE (n:KG {id: 'inputs:common/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:common/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_SERVICE', defaultValue: 32};
MERGE (n:KG {id: 'inputs:common/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNUSED', defaultValue: 64};
MERGE (n:KG {id: 'inputs:common/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_CUSTOM', defaultValue: 128};
MERGE (n:KG {id: 'inputs:common/IN1/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 65280, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 65280};
MERGE (n:KG {id: 'inputs:rtype'}) SET n:InputPorts SET n += {name: 'rtype', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1011, sourceColumn: 8, sourceEndLine: 1011};
MERGE (n:KG {id: 'inputs:rtype/DSW'}) SET n:Port SET n += {tag: 'DSW', modify: false};
MERGE (n:KG {id: 'inputs:rtype/DSW/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:1,2")'], name: 'Lives', defaultValue: 3, location: 'SW1:1,2', settings: ['2=2', '3=3', '1=4', '0=5']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW1:3")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW1:3', settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW1:4")'], name: 'Bonus Life', defaultValue: 8, location: 'SW1:4', settings: ['0=50K 150K 250K 400K 600K', '8=100K 200K 350K 500K 700K']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_CONDITION("DSW", 0x0400, NOTEQUALS, 0x0000)', 'PORT_DIPLOCATION("SW1:5,6,7,8")'], name: 'Coinage', defaultValue: 240, location: 'SW1:5,6,7,8', settings: ['160=6C 1C', '176=5C 1C', '192=4C 1C', '208=3C 1C', '16=8C 3C', '224=2C 1C', '32=5C 3C', '48=3C 2C', '240=1C 1C', '64=2C 3C', '144=1C 2C', '128=1C 3C', '112=1C 4C', '96=1C 5C', '80=1C 6C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_CONDITION("DSW", 0x0400, EQUALS, 0x0000)', 'PORT_DIPLOCATION("SW1:5,6")'], name: 'Coin A', defaultValue: 48, location: 'SW1:5,6', settings: ['0=5C 1C', '16=3C 1C', '32=2C 1C', '48=1C 1C']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_CONDITION("DSW", 0x0400, EQUALS, 0x0000)', 'PORT_DIPLOCATION("SW1:7,8")'], name: 'Coin B', defaultValue: 192, location: 'SW1:7,8', settings: ['192=1C 2C', '128=1C 3C', '64=1C 5C', '0=1C 6C']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 256, modifiers: ['PORT_DIPLOCATION("SW2:1")'], name: 'Flip Screen', defaultValue: 256, location: 'SW2:1', settings: ['256=Off', '0=On']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 512, modifiers: ['PORT_DIPLOCATION("SW2:2")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:2', settings: ['0=Upright', '512=Cocktail']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f8'}) SET n:PortField SET n += {kind: 'dip', mask: 1024, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Coin Mode', defaultValue: 1024, location: 'SW2:3', settings: ['1024=Mode 1', '0=Mode 2']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f9'}) SET n:PortField SET n += {kind: 'dip', mask: 2048, modifiers: ['PORT_DIPLOCATION("SW2:4")'], name: 'Difficulty', defaultValue: 2048, location: 'SW2:4', settings: ['2048=Normal', '0=Hard']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f10'}) SET n:PortField SET n += {kind: 'dip', mask: 4096, modifiers: ['PORT_DIPLOCATION("SW2:5")'], name: 'Allow Continue', defaultValue: 4096, location: 'SW2:5', settings: ['0=No', '4096=Yes']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f11'}) SET n:PortField SET n += {kind: 'dip', mask: 8192, modifiers: ['PORT_DIPLOCATION("SW2:6")'], name: 'Stop Mode', defaultValue: 8192, location: 'SW2:6', settings: ['8192=Off', '0=On']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f12'}) SET n:PortField SET n += {kind: 'dip', mask: 16384, modifiers: ['PORT_DIPLOCATION("SW2:7")'], name: 'Invulnerability', defaultValue: 16384, location: 'SW2:7', settings: ['16384=Off', '0=On']};
MERGE (n:KG {id: 'inputs:rtype/DSW/f13'}) SET n:PortField SET n += {kind: 'service', mask: 32768, activeLow: true, defaultValue: 32768};
MERGE (n:KG {id: 'gfxlayout:tilelayout'}) SET n:GfxLayout SET n += {name: 'tilelayout', width: 8, height: 8, total: 'RGN_FRAC(1,4)', planes: 4, planeOffsets: ['RGN_FRAC(3,4)', 'RGN_FRAC(2,4)', 'RGN_FRAC(1,4)', 'RGN_FRAC(0,4)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,4)', planes: 4, planeOffsets: ['RGN_FRAC(3,4)', 'RGN_FRAC(2,4)', 'RGN_FRAC(1,4)', 'RGN_FRAC(0,4)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 128, 129, 130, 131, 132, 133, 134, 135], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfx_m72'}) SET n:GfxDecode SET n += {name: 'gfx_m72', sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1642, sourceColumn: 8, sourceEndLine: 1642};
MERGE (n:KG {id: 'gfxdecode:gfx_m72/e0'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'spritelayout', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_m72/e1'}) SET n:GfxDecodeEntry SET n += {region: 'tiles0', offset: 0, layout: 'tilelayout', colorBase: 256, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_m72/e2'}) SET n:GfxDecodeEntry SET n += {region: 'tiles1', offset: 0, layout: 'tilelayout', colorBase: 256, colorCount: 16, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:rtype'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 4625, sourceColumn: 1, sourceEndLine: 4625};
MATCH (a:KG {id: 'game:rtype'}), (b:KG {id: 'machine:m72_state.rtype'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:rtype'}), (b:KG {id: 'inputs:rtype'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:rtype'}), (b:KG {id: 'romset:rtype'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:m72.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:iremipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:cpu/nec/nec.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:cpu/nec/v25.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:irem_cpu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:machine/rstbuf.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:sound/ymopm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m72.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:m72_state.rtype'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1785, sourceColumn: 1, sourceEndLine: 1793};
MATCH (a:KG {id: 'machine:m72_state.rtype'}), (b:KG {id: 'handler:m72_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m72_state.rtype'}), (b:KG {id: 'callback:timer/m72_state.scanline_interrupt'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:m72_state.rtype'}), (b:KG {id: 'machine:m72_state.m72_base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:m72_state.rtype'}), (b:KG {id: 'map:m72_state.rtype_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:m72_state.rtype'}), (b:KG {id: 'map:m72_state.rtype_sound_portmap'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_IO', deviceTag: 'soundcpu'};
MATCH (a:KG {id: 'inputs:rtype'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1011, sourceColumn: 8, sourceEndLine: 1011};
MATCH (a:KG {id: 'inputs:rtype'}), (b:KG {id: 'inputs:common'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:rtype'}), (b:KG {id: 'inputs:rtype/DSW'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:rtype'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 2035, sourceColumn: 1, sourceEndLine: 2035};
MATCH (a:KG {id: 'romset:rtype'}), (b:KG {id: 'region:rtype/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rtype'}), (b:KG {id: 'region:rtype/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rtype'}), (b:KG {id: 'region:rtype/tiles0'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rtype'}), (b:KG {id: 'region:rtype/tiles1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rtype'}), (b:KG {id: 'region:rtype/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rtype'}), (b:KG {id: 'region:rtype/plds'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:m72_state.machine_reset'}), (b:KG {id: 'handler:m72_state.synch_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'callback:timer/m72_state.scanline_interrupt'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 256, sourceColumn: 1, sourceEndLine: 279};
MATCH (a:KG {id: 'callback:timer/m72_state.scanline_interrupt'}), (b:KG {id: 'handler:m72_state.scanline_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1684, sourceColumn: 1, sourceEndLine: 1713};
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'handler:m72_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'handler:m72_state.video_start_m72'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'callback:timer/m72_state.scanline_interrupt'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'machine:m72_state.m72_audio_chips'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 7};
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'device:m72_state.m72_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'device:m72_state.m72_base/soundcpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'device:m72_state.m72_base/upd71059c'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'device:m72_state.m72_base/spriteram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'device:m72_state.m72_base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'gfxdecode:gfx_m72'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'device:m72_state.m72_base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_base'}), (b:KG {id: 'device:m72_state.m72_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:m72_state.rtype_map'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 612, sourceColumn: 1, sourceEndLine: 617};
MATCH (a:KG {id: 'map:m72_state.rtype_map'}), (b:KG {id: 'map:m72_state.m72_cpu1_common_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:m72_state.rtype_map'}), (b:KG {id: 'map:m72_state.rtype_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.rtype_map'}), (b:KG {id: 'map:m72_state.rtype_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.rtype_sound_portmap'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 880, sourceColumn: 1, sourceEndLine: 886};
MATCH (a:KG {id: 'map:m72_state.rtype_sound_portmap'}), (b:KG {id: 'map:m72_state.rtype_sound_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.rtype_sound_portmap'}), (b:KG {id: 'map:m72_state.rtype_sound_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.rtype_sound_portmap'}), (b:KG {id: 'map:m72_state.rtype_sound_portmap/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'inputs:common'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 980, sourceColumn: 8, sourceEndLine: 980};
MATCH (a:KG {id: 'inputs:common'}), (b:KG {id: 'inputs:common/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:common'}), (b:KG {id: 'inputs:common/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rtype/DSW'}), (b:KG {id: 'inputs:rtype/DSW/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:rtype/maincpu'}), (b:KG {id: 'rom:rtype/maincpu/rt_r-h0-b.1b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/maincpu'}), (b:KG {id: 'rom:rtype/maincpu/rt_r-l0-b.3b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/maincpu'}), (b:KG {id: 'rom:rtype/maincpu/rt_r-h1-b.1c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/maincpu'}), (b:KG {id: 'rom:rtype/maincpu/rt_r-l1-b.3c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/sprites'}), (b:KG {id: 'rom:rtype/sprites/rt_r-00.1h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/sprites'}), (b:KG {id: 'rom:rtype/sprites/rt_r-01.1j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/sprites'}), (b:KG {id: 'rom:rtype/sprites/rt_r-10.1k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/sprites'}), (b:KG {id: 'rom:rtype/sprites/rt_r-11.1l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/sprites'}), (b:KG {id: 'rom:rtype/sprites/rt_r-20.3h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/sprites'}), (b:KG {id: 'rom:rtype/sprites/rt_r-21.3j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/sprites'}), (b:KG {id: 'rom:rtype/sprites/rt_r-30.3k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/sprites'}), (b:KG {id: 'rom:rtype/sprites/rt_r-31.3l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/tiles0'}), (b:KG {id: 'rom:rtype/tiles0/rt_b-a0.ic20'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/tiles0'}), (b:KG {id: 'rom:rtype/tiles0/rt_b-a1.ic22'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/tiles0'}), (b:KG {id: 'rom:rtype/tiles0/rt_b-a2.ic20'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/tiles0'}), (b:KG {id: 'rom:rtype/tiles0/rt_b-a3.ic23'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/tiles1'}), (b:KG {id: 'rom:rtype/tiles1/rt_b-b0.ic26'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/tiles1'}), (b:KG {id: 'rom:rtype/tiles1/rt_b-b1.ic27'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/tiles1'}), (b:KG {id: 'rom:rtype/tiles1/rt_b-b2.ic25'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/tiles1'}), (b:KG {id: 'rom:rtype/tiles1/rt_b-b3.ic24'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/proms'}), (b:KG {id: 'rom:rtype/proms/m72_a-8l-.ic66'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/proms'}), (b:KG {id: 'rom:rtype/proms/m72_a-9l-.ic75'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/plds'}), (b:KG {id: 'rom:rtype/plds/m72_a-3d-.ic11'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/plds'}), (b:KG {id: 'rom:rtype/plds/m72_a-4d-.ic19'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rtype/plds'}), (b:KG {id: 'rom:rtype/plds/m72_r-3a-.3a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:m72_state.video_start_m72'}), (b:KG {id: 'handler:m72_state.register_savestate'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m72_state.video_start_m72'}), (b:KG {id: 'handler:m72_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m72_state.video_start_m72'}), (b:KG {id: 'handler:m72_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_audio_chips'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1660, sourceColumn: 1, sourceEndLine: 1682};
MATCH (a:KG {id: 'machine:m72_state.m72_audio_chips'}), (b:KG {id: 'handler:m72_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_audio_chips'}), (b:KG {id: 'callback:timer/m72_state.scanline_interrupt'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_audio_chips'}), (b:KG {id: 'machine:m72_state.m72_audio_chips/callback:soundcpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_audio_chips'}), (b:KG {id: 'device:m72_state.m72_audio_chips/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_audio_chips'}), (b:KG {id: 'device:m72_state.m72_audio_chips/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_audio_chips'}), (b:KG {id: 'device:m72_state.m72_audio_chips/soundirq'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_audio_chips'}), (b:KG {id: 'device:m72_state.m72_audio_chips/ymsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_base/maincpu'}), (b:KG {id: 'device:m72_state.m72_base/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_base/maincpu'}), (b:KG {id: 'map:m72_state.m72_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:m72_state.m72_base/maincpu'}), (b:KG {id: 'map:m72_state.m72_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:m72_state.m72_base/soundcpu'}), (b:KG {id: 'map:m72_state.sound_ram_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:m72_state.m72_base/soundcpu'}), (b:KG {id: 'map:m72_state.sound_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:m72_state.m72_base/upd71059c'}), (b:KG {id: 'device:m72_state.m72_base/upd71059c/callback:upd71059c:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m72'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 1642, sourceColumn: 8, sourceEndLine: 1642};
MATCH (a:KG {id: 'gfxdecode:gfx_m72'}), (b:KG {id: 'gfxdecode:gfx_m72/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m72'}), (b:KG {id: 'gfxdecode:gfx_m72/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m72'}), (b:KG {id: 'gfxdecode:gfx_m72/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_base/screen'}), (b:KG {id: 'device:m72_state.m72_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 594, sourceColumn: 1, sourceEndLine: 603};
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map'}), (b:KG {id: 'map:m72_state.m72_cpu1_common_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map'}), (b:KG {id: 'map:m72_state.m72_cpu1_common_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map'}), (b:KG {id: 'map:m72_state.m72_cpu1_common_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map'}), (b:KG {id: 'map:m72_state.m72_cpu1_common_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map'}), (b:KG {id: 'map:m72_state.m72_cpu1_common_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map'}), (b:KG {id: 'map:m72_state.m72_cpu1_common_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map'}), (b:KG {id: 'map:m72_state.m72_cpu1_common_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.rtype_sound_portmap/range0'}), (b:KG {id: 'handler:ym2151_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:m72_state.rtype_sound_portmap/range0'}), (b:KG {id: 'handler:ym2151_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:m72_state.rtype_sound_portmap/range1'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:m72_state.rtype_sound_portmap/range2'}), (b:KG {id: 'handler:generic_latch_8_device.acknowledge_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f14'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN0'}), (b:KG {id: 'inputs:common/IN0/f15'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN1'}), (b:KG {id: 'inputs:common/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN1'}), (b:KG {id: 'inputs:common/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN1'}), (b:KG {id: 'inputs:common/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN1'}), (b:KG {id: 'inputs:common/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN1'}), (b:KG {id: 'inputs:common/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN1'}), (b:KG {id: 'inputs:common/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN1'}), (b:KG {id: 'inputs:common/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN1'}), (b:KG {id: 'inputs:common/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/IN1'}), (b:KG {id: 'inputs:common/IN1/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'handler:m72_state.get_bg_tile_info'}), (b:KG {id: 'handler:m72_state.m72_m81_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m72_state.get_fg_tile_info'}), (b:KG {id: 'handler:m72_state.m72_m81_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m72_state.m72_audio_chips/callback:soundcpu:0'}), (b:KG {id: 'handler:rst_neg_buffer_device.inta_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_audio_chips/soundlatch'}), (b:KG {id: 'device:m72_state.m72_audio_chips/soundlatch/callback:soundlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_audio_chips/soundirq'}), (b:KG {id: 'device:m72_state.m72_audio_chips/soundirq/callback:soundirq:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_audio_chips/ymsnd'}), (b:KG {id: 'audioroute:device:m72_state.m72_audio_chips/ymsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_audio_chips/ymsnd'}), (b:KG {id: 'device:m72_state.m72_audio_chips/ymsnd/callback:ymsnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_base/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:pic8259_device.inta_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_map'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 605, sourceColumn: 1, sourceEndLine: 610};
MATCH (a:KG {id: 'map:m72_state.m72_map'}), (b:KG {id: 'map:m72_state.m72_cpu1_common_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_map'}), (b:KG {id: 'map:m72_state.m72_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_map'}), (b:KG {id: 'map:m72_state.m72_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 748, sourceColumn: 1, sourceEndLine: 762};
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap'}), (b:KG {id: 'map:m72_state.m72_portmap/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.sound_ram_map'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 869, sourceColumn: 1, sourceEndLine: 872};
MATCH (a:KG {id: 'map:m72_state.sound_ram_map'}), (b:KG {id: 'map:m72_state.sound_ram_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.sound_portmap'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m72.cpp', sourceLine: 888, sourceColumn: 1, sourceEndLine: 893};
MATCH (a:KG {id: 'map:m72_state.sound_portmap'}), (b:KG {id: 'map:m72_state.rtype_sound_portmap'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:m72_state.sound_portmap'}), (b:KG {id: 'map:m72_state.sound_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m72_state.sound_portmap'}), (b:KG {id: 'map:m72_state.sound_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_base/upd71059c/callback:upd71059c:0'}), (b:KG {id: 'device:m72_state.m72_base/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m72/e0'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m72/e1'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m72/e2'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_base/screen/callback:screen:0'}), (b:KG {id: 'handler:m72_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map/range1'}), (b:KG {id: 'handler:m72_state.palette_r_0'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map/range1'}), (b:KG {id: 'handler:m72_state.palette_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map/range2'}), (b:KG {id: 'handler:m72_state.palette_r_1'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map/range2'}), (b:KG {id: 'handler:m72_state.palette_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map/range3'}), (b:KG {id: 'handler:m72_state.videoram1_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map/range4'}), (b:KG {id: 'handler:m72_state.videoram2_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map/range5'}), (b:KG {id: 'handler:m72_state.soundram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_cpu1_common_map/range5'}), (b:KG {id: 'handler:m72_state.soundram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_audio_chips/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'handler:rst_neg_buffer_device.rst18_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_audio_chips/ymsnd/callback:ymsnd:0'}), (b:KG {id: 'handler:rst_neg_buffer_device.rst28_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m72_state.m72_audio_chips/ymsnd/callback:ymsnd:0'}), (b:KG {id: 'device:m72_state.m72_audio_chips/soundirq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range3'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range4'}), (b:KG {id: 'handler:m72_state.port02_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range5'}), (b:KG {id: 'handler:m72_state.dmaon_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range6'}), (b:KG {id: 'handler:m72_state.irq_line_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range7'}), (b:KG {id: 'handler:pic8259_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'upd71059c'};
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range7'}), (b:KG {id: 'handler:pic8259_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'upd71059c'};
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range8'}), (b:KG {id: 'handler:m72_state.scrolly_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range9'}), (b:KG {id: 'handler:m72_state.scrollx_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range10'}), (b:KG {id: 'handler:m72_state.scrolly_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.m72_portmap/range11'}), (b:KG {id: 'handler:m72_state.scrollx_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m72_state.sound_portmap/range0'}), (b:KG {id: 'handler:m72_audio_device.sample_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'm72'};
MATCH (a:KG {id: 'map:m72_state.sound_portmap/range1'}), (b:KG {id: 'handler:m72_audio_device.sample_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'm72'};
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:tilelayout'}), (b:KG {id: 'file:src/mame/irem/m72.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:m72_state.screen_update'}), (b:KG {id: 'handler:m72_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m72_state.palette_w_0'}), (b:KG {id: 'handler:m72_state.changecolor'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m72_state.palette_w_1'}), (b:KG {id: 'handler:m72_state.changecolor'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
