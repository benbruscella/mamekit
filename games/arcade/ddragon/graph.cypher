// mamekit knowledge graph — driver src/mame/technos/ddragon.cpp
// generated 2026-09-05T03:49:22.484Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/technos/ddragon.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/technos/ddragon.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:ddragon.h'}) SET n:SourceFile SET n += {path: 'ddragon.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6800/m6801.h'}) SET n:SourceFile SET n += {path: 'cpu/m6800/m6801.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/hd6309.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/hd6309.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/m6809.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/m6809.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:sound/okim6295.h'}) SET n:SourceFile SET n += {path: 'sound/okim6295.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopm.h'}) SET n:SourceFile SET n += {path: 'sound/ymopm.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopn.h'}) SET n:SourceFile SET n += {path: 'sound/ymopn.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:ddragon'}) SET n:Game SET n += {name: 'ddragon', year: '1987', company: 'Technos Japan (Taito license)', fullname: 'Double Dragon (World set 1)', monitor: 'ROT0', cls: 'ddragon_state', init: 'init_ddragon', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 2438, sourceColumn: 1, sourceEndLine: 2438};
MERGE (n:KG {id: 'romset:ddragon'}) SET n:RomSet SET n += {name: 'ddragon', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1139, sourceColumn: 1, sourceEndLine: 1139};
MERGE (n:KG {id: 'region:ddragon/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 196608, flags: '0', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1140, sourceColumn: 2, sourceEndLine: 1140};
MERGE (n:KG {id: 'rom:ddragon/maincpu/21j-1.26'}) SET n:Rom SET n += {file: '21j-1.26', offset: 32768, size: 32768, crc: 'ae714964', sha1: '072522b97ca4edd099c6b48d7634354dc7088c53', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1141, sourceColumn: 2, sourceEndLine: 1141};
MERGE (n:KG {id: 'rom:ddragon/maincpu/21j-2-3.25'}) SET n:Rom SET n += {file: '21j-2-3.25', offset: 65536, size: 32768, crc: '5779705e', sha1: '4b8f22225d10f5414253ce0383bbebd6f720f3af', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1142, sourceColumn: 2, sourceEndLine: 1142};
MERGE (n:KG {id: 'rom:ddragon/maincpu/21a-3.24'}) SET n:Rom SET n += {file: '21a-3.24', offset: 98304, size: 32768, crc: 'dbf24897', sha1: '1504faaf07c541330cd43b72dc6846911dfd85a3', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1143, sourceColumn: 2, sourceEndLine: 1143};
MERGE (n:KG {id: 'rom:ddragon/maincpu/21j-4.23'}) SET n:Rom SET n += {file: '21j-4.23', offset: 131072, size: 32768, crc: '6c9f46fa', sha1: 'df251a4aea69b2328f7a543bf085b9c35933e2c1', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1144, sourceColumn: 2, sourceEndLine: 1144};
MERGE (n:KG {id: 'region:ddragon/sub'}) SET n:RomRegion SET n += {tag: 'sub', size: 16384, flags: '0', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1146, sourceColumn: 2, sourceEndLine: 1146};
MERGE (n:KG {id: 'rom:ddragon/sub/21jm-0.ic55'}) SET n:Rom SET n += {file: '21jm-0.ic55', offset: 0, size: 16384, crc: 'f5232d03', sha1: 'e2a194e38633592fd6587690b3cb2669d93985c7', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1147, sourceColumn: 2, sourceEndLine: 1147};
MERGE (n:KG {id: 'region:ddragon/soundcpu'}) SET n:RomRegion SET n += {tag: 'soundcpu', size: 65536, flags: '0', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1149, sourceColumn: 2, sourceEndLine: 1149};
MERGE (n:KG {id: 'rom:ddragon/soundcpu/21j-0-1'}) SET n:Rom SET n += {file: '21j-0-1', offset: 32768, size: 32768, crc: '9efa95bb', sha1: 'da997d9cc7b9e7b2c70a4b6d30db693086a6f7d8', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1150, sourceColumn: 2, sourceEndLine: 1150};
MERGE (n:KG {id: 'region:ddragon/chars'}) SET n:RomRegion SET n += {tag: 'chars', size: 32768, flags: '0', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1152, sourceColumn: 2, sourceEndLine: 1152};
MERGE (n:KG {id: 'rom:ddragon/chars/21j-5'}) SET n:Rom SET n += {file: '21j-5', offset: 0, size: 32768, crc: '7a8b8db4', sha1: '8368182234f9d4d763d4714fd7567a9e31b7ebeb', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1153, sourceColumn: 2, sourceEndLine: 1153};
MERGE (n:KG {id: 'region:ddragon/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 524288, flags: '0', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1155, sourceColumn: 2, sourceEndLine: 1155};
MERGE (n:KG {id: 'rom:ddragon/sprites/21j-a'}) SET n:Rom SET n += {file: '21j-a', offset: 0, size: 65536, crc: '574face3', sha1: '481fe574cb79d0159a65ff7486cbc945d50538c5', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1156, sourceColumn: 2, sourceEndLine: 1156};
MERGE (n:KG {id: 'rom:ddragon/sprites/21j-b'}) SET n:Rom SET n += {file: '21j-b', offset: 65536, size: 65536, crc: '40507a76', sha1: '74581a4b6f48100bddf20f319903af2fe36f39fa', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1157, sourceColumn: 2, sourceEndLine: 1157};
MERGE (n:KG {id: 'rom:ddragon/sprites/21j-c'}) SET n:Rom SET n += {file: '21j-c', offset: 131072, size: 65536, crc: 'bb0bc76f', sha1: '37b2225e0593335f636c1e5fded9b21fdeab2f5a', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1158, sourceColumn: 2, sourceEndLine: 1158};
MERGE (n:KG {id: 'rom:ddragon/sprites/21j-d'}) SET n:Rom SET n += {file: '21j-d', offset: 196608, size: 65536, crc: 'cb4f231b', sha1: '9f2270f9ceedfe51c5e9a9bbb00d6f43dbc4a3ea', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1159, sourceColumn: 2, sourceEndLine: 1159};
MERGE (n:KG {id: 'rom:ddragon/sprites/21j-e'}) SET n:Rom SET n += {file: '21j-e', offset: 262144, size: 65536, crc: 'a0a0c261', sha1: '25c534d82bd237386d447d72feee8d9541a5ded4', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1160, sourceColumn: 2, sourceEndLine: 1160};
MERGE (n:KG {id: 'rom:ddragon/sprites/21j-f'}) SET n:Rom SET n += {file: '21j-f', offset: 327680, size: 65536, crc: '6ba152f6', sha1: 'a301ff809be0e1471f4ff8305b30c2fa4aa57fae', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1161, sourceColumn: 2, sourceEndLine: 1161};
MERGE (n:KG {id: 'rom:ddragon/sprites/21j-g'}) SET n:Rom SET n += {file: '21j-g', offset: 393216, size: 65536, crc: '3220a0b6', sha1: '24a16ea509e9aff82b9ddd14935d61bb71acff84', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1162, sourceColumn: 2, sourceEndLine: 1162};
MERGE (n:KG {id: 'rom:ddragon/sprites/21j-h'}) SET n:Rom SET n += {file: '21j-h', offset: 458752, size: 65536, crc: '65c7517d', sha1: 'f177ba9c1c7cc75ff04d5591b9865ee364788f94', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1163, sourceColumn: 2, sourceEndLine: 1163};
MERGE (n:KG {id: 'region:ddragon/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 262144, flags: '0', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1165, sourceColumn: 2, sourceEndLine: 1165};
MERGE (n:KG {id: 'rom:ddragon/tiles/21j-8'}) SET n:Rom SET n += {file: '21j-8', offset: 0, size: 65536, crc: '7c435887', sha1: 'ecb76f2148fa9773426f05aac208eb3ac02747db', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1166, sourceColumn: 2, sourceEndLine: 1166};
MERGE (n:KG {id: 'rom:ddragon/tiles/21j-9'}) SET n:Rom SET n += {file: '21j-9', offset: 65536, size: 65536, crc: 'c6640aed', sha1: 'f156c337f48dfe4f7e9caee9a72c7ea3d53e3098', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1167, sourceColumn: 2, sourceEndLine: 1167};
MERGE (n:KG {id: 'rom:ddragon/tiles/21j-i'}) SET n:Rom SET n += {file: '21j-i', offset: 131072, size: 65536, crc: '5effb0a0', sha1: '1f21acb15dad824e831ed9a42b3fde096bb31141', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1168, sourceColumn: 2, sourceEndLine: 1168};
MERGE (n:KG {id: 'rom:ddragon/tiles/21j-j'}) SET n:Rom SET n += {file: '21j-j', offset: 196608, size: 65536, crc: '5fb42e7c', sha1: '7953316712c56c6f8ca6bba127319e24b618b646', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1169, sourceColumn: 2, sourceEndLine: 1169};
MERGE (n:KG {id: 'region:ddragon/adpcm1'}) SET n:RomRegion SET n += {tag: 'adpcm1', size: 65536, flags: '0', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1171, sourceColumn: 2, sourceEndLine: 1171};
MERGE (n:KG {id: 'rom:ddragon/adpcm1/21j-6'}) SET n:Rom SET n += {file: '21j-6', offset: 0, size: 65536, crc: '34755de3', sha1: '57c06d6ce9497901072fa50a92b6ed0d2d4d6528', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1172, sourceColumn: 2, sourceEndLine: 1172};
MERGE (n:KG {id: 'region:ddragon/adpcm2'}) SET n:RomRegion SET n += {tag: 'adpcm2', size: 65536, flags: '0', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1174, sourceColumn: 2, sourceEndLine: 1174};
MERGE (n:KG {id: 'rom:ddragon/adpcm2/21j-7'}) SET n:Rom SET n += {file: '21j-7', offset: 0, size: 65536, crc: '904de6f8', sha1: '3623e5ea05fd7c455992b7ed87e605b87c3850aa', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1175, sourceColumn: 2, sourceEndLine: 1175};
MERGE (n:KG {id: 'region:ddragon/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 768, flags: '0', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1177, sourceColumn: 2, sourceEndLine: 1177};
MERGE (n:KG {id: 'rom:ddragon/proms/21j-k-0.101'}) SET n:Rom SET n += {file: '21j-k-0.101', offset: 0, size: 256, crc: 'fdb130a9', sha1: '4c4f214229b9fab2b5d69c745ec5428787b89e1f', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1178, sourceColumn: 2, sourceEndLine: 1178};
MERGE (n:KG {id: 'rom:ddragon/proms/21j-l-0.16'}) SET n:Rom SET n += {file: '21j-l-0.16', offset: 256, size: 512, crc: '46339529', sha1: '64f4c42a826d67b7cbaa8a23a45ebc4eb6248891', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1179, sourceColumn: 2, sourceEndLine: 1179};
MERGE (n:KG {id: 'map:ddragon_state.base_map'}) SET n:AddressMap SET n += {cls: 'ddragon_state', name: 'base_map', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 452, sourceColumn: 1, sourceEndLine: 470};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).ram().share("rambase")', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454, ram: true, share: 'rambase'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range1'}) SET n:AddressRange SET n += {start: 4096, end: 4607, raw: 'map(0x1000, 0x11ff).ram().w(m_palette, FUNC(palette_device::write8)).share("palette")', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 455, sourceColumn: 2, sourceEndLine: 455, ram: true, share: 'palette'};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 516, sourceColumn: 2, sourceEndLine: 516};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range2'}) SET n:AddressRange SET n += {start: 4608, end: 5119, raw: 'map(0x1200, 0x13ff).ram().w(m_palette, FUNC(palette_device::write8_ext)).share("palette_ext")', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 456, sourceColumn: 2, sourceEndLine: 456, ram: true, share: 'palette_ext'};
MERGE (n:KG {id: 'handler:palette_device.write8_ext'}) SET n:Handler SET n += {method: 'write8_ext', ownerClass: 'palette_device', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 517, sourceColumn: 2, sourceEndLine: 517};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range3'}) SET n:AddressRange SET n += {start: 6144, end: 8191, raw: 'map(0x1800, 0x1fff).ram().w(FUNC(ddragon_state::fgvideoram_w)).share(m_fgvideoram)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457, ram: true, share: 'fgvideoram'};
MERGE (n:KG {id: 'handler:ddragon_state.fgvideoram_w'}) SET n:Handler SET n += {method: 'fgvideoram_w', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon_v.cpp', sourceLine: 124, sourceColumn: 1, sourceEndLine: 128, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_fgvideoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset >> 1);'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range4'}) SET n:AddressRange SET n += {start: 8192, end: 8703, raw: 'map(0x2000, 0x21ff).rw(FUNC(ddragon_state::comram_r), FUNC(ddragon_state::comram_w)).mirror(0x0600)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 458, sourceColumn: 2, sourceEndLine: 458, mirror: 1536};
MERGE (n:KG {id: 'handler:ddragon_state.comram_r'}) SET n:Handler SET n += {method: 'comram_r', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 367, sourceColumn: 1, sourceEndLine: 374, sourceParameters: 'offs_t offset', sourceBody: '// Access to shared RAM is prevented when the sub CPU is active
	if (!m_subcpu->suspended(SUSPEND_REASON_RESET | SUSPEND_REASON_HALT))
		return 0xff;

	return m_comram[offset];'};
MERGE (n:KG {id: 'handler:ddragon_state.comram_w'}) SET n:Handler SET n += {method: 'comram_w', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 377, sourceColumn: 1, sourceEndLine: 383, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (!m_subcpu->suspended(SUSPEND_REASON_RESET | SUSPEND_REASON_HALT))
		return;

	m_comram[offset] = data;'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range5'}) SET n:AddressRange SET n += {start: 10240, end: 12287, raw: 'map(0x2800, 0x2fff).ram().share(m_spriteram)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 459, sourceColumn: 2, sourceEndLine: 459, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range6'}) SET n:AddressRange SET n += {start: 12288, end: 14335, raw: 'map(0x3000, 0x37ff).ram().w(FUNC(ddragon_state::bgvideoram_w)).share(m_bgvideoram)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 460, sourceColumn: 2, sourceEndLine: 460, ram: true, share: 'bgvideoram'};
MERGE (n:KG {id: 'handler:ddragon_state.bgvideoram_w'}) SET n:Handler SET n += {method: 'bgvideoram_w', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon_v.cpp', sourceLine: 118, sourceColumn: 1, sourceEndLine: 122, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_bgvideoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset >> 1);'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range7'}) SET n:AddressRange SET n += {start: 14336, end: 14336, raw: 'map(0x3800, 0x3800).portr("P1")', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 461, sourceColumn: 2, sourceEndLine: 461, portRead: 'P1'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range8'}) SET n:AddressRange SET n += {start: 14337, end: 14337, raw: 'map(0x3801, 0x3801).portr("P2")', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 462, sourceColumn: 2, sourceEndLine: 462, portRead: 'P2'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range9'}) SET n:AddressRange SET n += {start: 14338, end: 14338, raw: 'map(0x3802, 0x3802).portr("EXTRA")', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 463, sourceColumn: 2, sourceEndLine: 463, portRead: 'EXTRA'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range10'}) SET n:AddressRange SET n += {start: 14339, end: 14339, raw: 'map(0x3803, 0x3803).portr("DSW0")', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 464, sourceColumn: 2, sourceEndLine: 464, portRead: 'DSW0'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range11'}) SET n:AddressRange SET n += {start: 14340, end: 14340, raw: 'map(0x3804, 0x3804).portr("DSW1")', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 465, sourceColumn: 2, sourceEndLine: 465, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range12'}) SET n:AddressRange SET n += {start: 14345, end: 14345, raw: 'map(0x3809, 0x3809).writeonly().share(m_scrollx_lo)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 466, sourceColumn: 2, sourceEndLine: 466, writeonly: true, share: 'scrollx_lo'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range13'}) SET n:AddressRange SET n += {start: 14346, end: 14346, raw: 'map(0x380a, 0x380a).writeonly().share(m_scrolly_lo)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 467, sourceColumn: 2, sourceEndLine: 467, writeonly: true, share: 'scrolly_lo'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range14'}) SET n:AddressRange SET n += {start: 14347, end: 14351, raw: 'map(0x380b, 0x380f).rw(FUNC(ddragon_state::interrupt_r), FUNC(ddragon_state::interrupt_w))', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 468, sourceColumn: 2, sourceEndLine: 468};
MERGE (n:KG {id: 'handler:ddragon_state.interrupt_r'}) SET n:Handler SET n += {method: 'interrupt_r', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 286, sourceColumn: 1, sourceEndLine: 290, sourceParameters: 'offs_t offset', sourceBody: 'interrupt_ack(offset, 0xff);
	return 0xff;'};
MERGE (n:KG {id: 'handler:ddragon_state.interrupt_ack'}) SET n:Handler SET n += {method: 'interrupt_ack', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 258, sourceColumn: 1, sourceEndLine: 283, sourceConstants: ['M6809_IRQ_LINE=0', 'M6809_FIRQ_LINE=1'], sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'switch (offset)
	{
		case 0: // 380b - NMI ack
			m_maincpu->set_input_line(INPUT_LINE_NMI, CLEAR_LINE);
			break;

		case 1: // 380c - FIRQ ack
			m_maincpu->set_input_line(M6809_FIRQ_LINE, CLEAR_LINE);
			break;

		case 2: // 380d - IRQ ack
			m_maincpu->set_input_line(M6809_IRQ_LINE, CLEAR_LINE);
			break;

		case 3: // 380e - SND IRQ and latch
			m_soundlatch->write(data);
			break;

		case 4: // 380f - MCU IRQ
			if (m_subcpu)
				m_subcpu->set_input_line(m_sprite_irq, ASSERT_LINE);
			break;
	}'};
MERGE (n:KG {id: 'handler:ddragon_state.interrupt_w'}) SET n:Handler SET n += {method: 'interrupt_w', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 293, sourceColumn: 1, sourceEndLine: 296, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'interrupt_ack(offset, data);'};
MERGE (n:KG {id: 'map:ddragon_state.base_map/range15'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).rom()', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 469, sourceColumn: 2, sourceEndLine: 469, rom: true};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_main_map'}) SET n:AddressMap SET n += {cls: 'ddragon_state', name: 'ddragon_main_map', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 472, sourceColumn: 1, sourceEndLine: 477, calls: ['base_map']};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_main_map/range0'}) SET n:AddressRange SET n += {start: 14344, end: 14344, raw: 'map(0x3808, 0x3808).w(FUNC(ddragon_state::bankswitch_w))', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 475, sourceColumn: 2, sourceEndLine: 475};
MERGE (n:KG {id: 'handler:ddragon_state.bankswitch_w'}) SET n:Handler SET n += {method: 'bankswitch_w', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 163, sourceColumn: 1, sourceEndLine: 181, sourceParameters: 'uint8_t data', sourceBody: '/*
	    76543210
	    .......x    X-scroll D9 (H9BT)
	    ......x.    Y-scroll D9 (V9BT)
	    .....x..    /Screen flip (*1P/2P)
	    ....x...    /Sub CPU reset (*RESET)
	    ...x....    /Sub CPU halt (*HALT)
	    xxx.....    ROM bank (*BANK)
	*/
	m_scrollx_hi = data & 0x01;
	m_scrolly_hi = (data & 0x02) >> 1;
	flip_screen_set(~data & 0x04);

	m_subcpu->set_input_line(INPUT_LINE_RESET, data & 0x08 ? CLEAR_LINE : ASSERT_LINE);
	m_subcpu->set_input_line(INPUT_LINE_HALT, data & 0x10 ? ASSERT_LINE : CLEAR_LINE);
	m_mainbank->set_entry((data & 0xe0) >> 5);'};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_main_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 32767, raw: 'map(0x4000, 0x7fff).bankr(m_mainbank)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 476, sourceColumn: 2, sourceEndLine: 476, bankRead: 'mainbank'};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_sub_map'}) SET n:AddressMap SET n += {cls: 'ddragon_state', name: 'ddragon_sub_map', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 529, sourceColumn: 1, sourceEndLine: 532};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_sub_map/range0'}) SET n:AddressRange SET n += {start: 32768, end: 33279, raw: 'map(0x8000, 0x81ff).ram().share(m_comram)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 531, sourceColumn: 2, sourceEndLine: 531, ram: true, share: 'comram'};
MERGE (n:KG {id: 'handler:ddragon_state.sub_port6_w'}) SET n:Handler SET n += {method: 'sub_port6_w', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 347, sourceColumn: 1, sourceEndLine: 357, sourceConstants: ['M6809_IRQ_LINE=0'], sourceParameters: 'uint8_t data', sourceBody: '// Port 6
	if ((data & 0x1) == 0)
		m_subcpu->set_input_line(m_sprite_irq, CLEAR_LINE);

	if (!(m_ddragon_sub_port & 0x2) && (data & 0x2))
		m_maincpu->set_input_line(M6809_IRQ_LINE, ASSERT_LINE);

	m_ddragon_sub_port = data;'};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_sound_map'}) SET n:AddressMap SET n += {cls: 'ddragon_state', name: 'ddragon_sound_map', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 571, sourceColumn: 1, sourceEndLine: 579};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).ram()', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 573, sourceColumn: 2, sourceEndLine: 573, ram: true};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_sound_map/range1'}) SET n:AddressRange SET n += {start: 4096, end: 4096, raw: 'map(0x1000, 0x1000).r(m_soundlatch, FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 574, sourceColumn: 2, sourceEndLine: 574};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 593, sourceColumn: 2, sourceEndLine: 593};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_sound_map/range2'}) SET n:AddressRange SET n += {start: 6144, end: 6144, raw: 'map(0x1800, 0x1800).r(FUNC(ddragon_state::ddragon_adpcm_status_r))', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 575, sourceColumn: 2, sourceEndLine: 575};
MERGE (n:KG {id: 'handler:ddragon_state.ddragon_adpcm_status_r'}) SET n:Handler SET n += {method: 'ddragon_adpcm_status_r', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 439, sourceColumn: 1, sourceEndLine: 442, sourceParameters: '', sourceBody: 'return (m_adpcm_idle[0] ? 1 : 0) | (m_adpcm_idle[1] ? 2 : 0);'};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_sound_map/range3'}) SET n:AddressRange SET n += {start: 10240, end: 10241, raw: 'map(0x2800, 0x2801).rw("fmsnd", FUNC(ym2151_device::read), FUNC(ym2151_device::write))', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 576, sourceColumn: 2, sourceEndLine: 576};
MERGE (n:KG {id: 'handler:ym2151_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2151_device', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591};
MERGE (n:KG {id: 'handler:ym2151_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2151_device', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_sound_map/range4'}) SET n:AddressRange SET n += {start: 14336, end: 14343, raw: 'map(0x3800, 0x3807).w(FUNC(ddragon_state::ddragon_adpcm_w))', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 577, sourceColumn: 2, sourceEndLine: 577};
MERGE (n:KG {id: 'handler:ddragon_state.ddragon_adpcm_w'}) SET n:Handler SET n += {method: 'ddragon_adpcm_w', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 393, sourceColumn: 1, sourceEndLine: 417, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int const chip = offset & 1;

	switch (offset >> 1)
	{
		case 3:
			m_adpcm_idle[chip] = true;
			m_adpcm[chip]->reset_w(1);
			break;

		case 2:
			m_adpcm_pos[chip] = (data & 0x7f) << 9;
			break;

		case 1:
			m_adpcm_end[chip] = (data & 0x7f) << 9;
			break;

		case 0:
			m_adpcm_idle[chip] = false;
			m_adpcm[chip]->reset_w(0);
			break;
	}'};
MERGE (n:KG {id: 'map:ddragon_state.ddragon_sound_map/range5'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).rom()', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 578, sourceColumn: 2, sourceEndLine: 578, rom: true};
MERGE (n:KG {id: 'machine:ddragon_state.ddragon'}) SET n:MachineConfig SET n += {cls: 'ddragon_state', name: 'ddragon', calls: [], stateMembers: ['{"name":"m_technos_video_hw","bits":8}', '{"name":"m_scrollx_hi","bits":8}', '{"name":"m_scrolly_hi","bits":8}', '{"name":"m_ddragon_sub_port","bits":8}', '{"name":"m_adpcm_sound_irq","bits":8}', '{"name":"m_adpcm_pos","bits":32,"arrayLength":2}', '{"name":"m_adpcm_end","bits":32,"arrayLength":2}', '{"name":"m_adpcm_idle","bits":1,"arrayLength":2}', '{"name":"m_adpcm_data","bits":32,"signed":true,"arrayLength":2}'], resetHandlers: ['ddragon_state.machine_reset'], startHandlers: ['ddragon_state.video_start'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 941, sourceColumn: 1, sourceEndLine: 986};
MERGE (n:KG {id: 'handler:ddragon_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 144, sourceColumn: 1, sourceEndLine: 153, sourceParameters: '', sourceBody: 'm_scrollx_hi = 0;
	m_scrolly_hi = 0;
	m_ddragon_sub_port = 0;
	m_adpcm_pos[0] = m_adpcm_pos[1] = 0;
	m_adpcm_end[0] = m_adpcm_end[1] = 0;
	m_adpcm_idle[0] = m_adpcm_idle[1] = true;
	m_adpcm_data[0] = m_adpcm_data[1] = -1;'};
MERGE (n:KG {id: 'handler:ddragon_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon_v.cpp', sourceLine: 99, sourceColumn: 1, sourceEndLine: 109, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(ddragon_state::get_bg_tile_info)), tilemap_mapper_delegate(*this, FUNC(ddragon_state::background_scan)), 16, 16, 32, 32);
	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(ddragon_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);

	m_fg_tilemap->set_transparent_pen(0);
	m_fg_tilemap->set_scrolldx(0, 0);
	m_bg_tilemap->set_scrolldx(0, 0);
	m_fg_tilemap->set_scrolldy(-8, -8);
	m_bg_tilemap->set_scrolldy(-8, -8);'};
MERGE (n:KG {id: 'handler:ddragon_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon_v.cpp', sourceLine: 62, sourceColumn: 1, sourceEndLine: 70, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'tile_index <<= 1;
	uint8_t const attr = m_bgvideoram[tile_index];
	tileinfo.set(2,
			m_bgvideoram[tile_index | 1] | ((attr & 0x07) << 8),
			(attr >> 3) & 0x07,
			TILE_FLIPYX((attr & 0xc0) >> 6));'};
MERGE (n:KG {id: 'handler:ddragon_state.background_scan'}) SET n:Handler SET n += {method: 'background_scan', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon_v.cpp', sourceLine: 56, sourceColumn: 1, sourceEndLine: 60, sourceParameters: 'u32 col, u32 row, u32 num_cols, u32 num_rows', sourceBody: '// logical (col,row) -> memory offset
	return (col & 0x0f) | ((row & 0x0f) << 4) | ((col & 0x10) << 4) | ((row & 0x10) << 5);'};
MERGE (n:KG {id: 'handler:ddragon_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon_v.cpp', sourceLine: 72, sourceColumn: 1, sourceEndLine: 80, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'tile_index <<= 1;
	uint8_t const attr = m_fgvideoram[tile_index];
	tileinfo.set(0,
			m_fgvideoram[tile_index | 1] | ((attr & 0x07) << 8),
			attr >> 5,
			0);'};
MERGE (n:KG {id: 'bank:ddragon_state.ddragon/mainbank'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 0, entries: 8, region: 'maincpu', offset: 65536, stride: 16384, raw: 'm_mainbank->configure_entries(0, 8, memregion("maincpu")->base() + 0x10000, 0x4000)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 141};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/maincpu'}) SET n:Device SET n += {type: 'HD6309E', tag: 'maincpu', clock: 3000000, config: ['HD6309E(config, m_maincpu, MAIN_CLOCK / 4)', 'm_maincpu->set_addrmap(AS_PROGRAM, &ddragon_state::ddragon_main_map)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 944, sourceColumn: 2, sourceEndLine: 944};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/scantimer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scantimer', clock: null, config: ['TIMER(config, "scantimer").configure_scanline(FUNC(ddragon_state::scanline), "screen", 0, 1)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 946, sourceColumn: 2, sourceEndLine: 946};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/scantimer/callback:scantimer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "scantimer").configure_scanline(FUNC(ddragon_state::scanline), "screen", 0, 1)', ownerTag: 'scantimer', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 946, sourceColumn: 2, sourceEndLine: 946, scanlineStart: 0, scanlineIncrement: 1, targetClass: 'ddragon_state', targetMethod: 'scanline'};
MERGE (n:KG {id: 'handler:ddragon_state.scanline'}) SET n:Handler SET n += {method: 'scanline', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 99, sourceColumn: 1, sourceEndLine: 117, sourceConstants: ['M6809_FIRQ_LINE=1'], sourceParameters: 'int param', sourceBody: 'int const scanline = param;
	int const screen_height = m_screen->height();
	int const vcount_old = scanline_to_vcount((scanline == 0) ? screen_height - 1 : scanline - 1);
	int const vcount = scanline_to_vcount(scanline);

	// update to the current point
	if (scanline > 0)
		m_screen->update_partial(scanline - 1);

	// on the rising edge of VBLK (vcount == F8), signal an NMI
	if (vcount == 0xf8)
		m_maincpu->set_input_line(INPUT_LINE_NMI, ASSERT_LINE);

	// set 1ms signal on rising edge of vcount & 8
	if (!(vcount_old & 8) && (vcount & 8))
		m_maincpu->set_input_line(M6809_FIRQ_LINE, ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:ddragon_state.scanline_to_vcount'}) SET n:Handler SET n += {method: 'scanline_to_vcount', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 90, sourceColumn: 1, sourceEndLine: 97, sourceParameters: 'int scanline', sourceBody: 'int vcount = scanline + 8;
	if (vcount < 0x100)
		return vcount;
	else
		return (vcount - 0x18) | 0x100;'};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/sub'}) SET n:Device SET n += {type: 'HD63701Y0', tag: 'sub', clock: 6000000, config: ['hd63701y0_cpu_device &subcpu(HD63701Y0(config, m_subcpu, MAIN_CLOCK / 2))', 'subcpu.set_addrmap(AS_PROGRAM, &ddragon_state::ddragon_sub_map)', 'subcpu.out_p6_cb().set(FUNC(ddragon_state::sub_port6_w))'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 948, sourceColumn: 2, sourceEndLine: 948};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/sub/callback:sub:0'}) SET n:Callback SET n += {signal: 'out_p6_cb', operation: 'set', raw: 'subcpu.out_p6_cb().set(FUNC(ddragon_state::sub_port6_w))', ownerTag: 'sub', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 950, sourceColumn: 2, sourceEndLine: 950, targetClass: 'ddragon_state', targetMethod: 'sub_port6_w'};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/soundcpu'}) SET n:Device SET n += {type: 'MC6809', tag: 'soundcpu', clock: 6000000, config: ['MC6809(config, m_soundcpu, MAIN_CLOCK / 2)', 'm_soundcpu->set_addrmap(AS_PROGRAM, &ddragon_state::ddragon_sound_map)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 952, sourceColumn: 2, sourceEndLine: 952};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_ddragon)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 958, sourceColumn: 2, sourceEndLine: 958, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(palette_device::xBGR_444, 512)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 959, sourceColumn: 2, sourceEndLine: 959};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(PIXEL_CLOCK, 384, 0, 256, 272, 0, 240)', 'm_screen->set_screen_update(FUNC(ddragon_state::screen_update))', 'm_screen->set_palette(m_palette)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 961, sourceColumn: 2, sourceEndLine: 961, configCalls: ['set_raw(6000000,384,0,256,272,0,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 272, 0, 240], screenRawExpr: ['PIXEL_CLOCK', '384', '0', '256', '272', '0', '240']};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(ddragon_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 963, sourceColumn: 2, sourceEndLine: 963, targetClass: 'ddragon_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:ddragon_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon_v.cpp', sourceLine: 220, sourceColumn: 1, sourceEndLine: 232, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'int const scrollx = (m_scrollx_hi << 8) | *m_scrollx_lo;
	int const scrolly = (m_scrolly_hi << 8) | *m_scrolly_lo;

	m_bg_tilemap->set_scrollx(0, scrollx);
	m_bg_tilemap->set_scrolly(0, scrolly);

	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);
	m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	return 0;'};
MERGE (n:KG {id: 'handler:ddragon_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon_v.cpp', sourceLine: 141, sourceColumn: 1, sourceEndLine: 215, sourceParameters: 'bitmap_ind16 &bitmap,const rectangle &cliprect', sourceBody: 'gfx_element *gfx = m_gfxdecode->gfx(1);
	const uint8_t *src = m_spriteram;
	const uint32_t bytes = m_spriteram.bytes();

	for (uint32_t i = 0; i < bytes; i += 5)
	{
		int const attr = src[i + 1];
		if (attr & 0x80)  // visible
		{
			int sx = 240 - src[i + 4] + ((attr & 2) << 7);
			int sy = 232 - src[i + 0] + ((attr & 1) << 8);
			int const size = (attr & 0x30) >> 4;
			int flipx = attr & 8;
			int flipy = attr & 4;
			int dx = -16, dy = -16;

			int which;
			int color;

			if (m_technos_video_hw == 2)     // Double Dragon 2
			{
				color = src[i + 2] >> 5;
				which = src[i + 3] | ((src[i + 2] & 0x1f) << 8);
			}
			else
			{
				if (m_technos_video_hw == 1)     // China Gate
				{
					if ((sx < -7) && (sx > -16)) sx += 256; // fix sprite clip
					if ((sy < -7) && (sy > -16)) sy += 256; // fix sprite clip
				}
				color = src[i + 2] >> 4;
				which = src[i + 3] | ((src[i + 2] & 0x0f) << 8);
			}

			if (flip_screen())
			{
				sx = 240 - sx;
				sy = 240 - 16 - sy;
				flipx = !flipx;
				flipy = !flipy;
				dx = -dx;
				dy = -dy;
			}

			which &= ~size;

			switch (size)
			{
				case 0: // normal
				DRAW_SPRITE(0, sx, sy);
				break;

				case 1: // double y
				DRAW_SPRITE(0, sx, sy + dy);
				DRAW_SPRITE(1, sx, sy);
				break;

				case 2: // double x
				DRAW_SPRITE(0, sx + dx, sy);
				DRAW_SPRITE(2, sx, sy);
				break;

				case 3:
				DRAW_SPRITE(0, sx + dx, sy + dy);
				DRAW_SPRITE(1, sx + dx, sy);
				DRAW_SPRITE(2, sx, sy + dy);
				DRAW_SPRITE(3, sx, sy);
				break;
			}
		}
	}'};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 967, sourceColumn: 2, sourceEndLine: 967};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)', 'm_soundlatch->data_pending_callback().set_inputline(m_soundcpu, M6809_IRQ_LINE)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 969, sourceColumn: 2, sourceEndLine: 969};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/soundlatch/callback:soundlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set_inputline', raw: 'm_soundlatch->data_pending_callback().set_inputline(m_soundcpu, M6809_IRQ_LINE)', ownerTag: 'soundlatch', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 970, sourceColumn: 2, sourceEndLine: 970, inputLine: 'M6809_IRQ_LINE', targetTag: 'soundcpu'};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/fmsnd'}) SET n:Device SET n += {type: 'YM2151', tag: 'fmsnd', clock: 3579545, config: ['ym2151_device &fmsnd(YM2151(config, "fmsnd", SOUND_CLOCK))', 'fmsnd.irq_handler().set_inputline(m_soundcpu, M6809_FIRQ_LINE)', 'fmsnd.add_route(0, "mono", 0.35)', 'fmsnd.add_route(1, "mono", 0.35)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 972, sourceColumn: 2, sourceEndLine: 972};
MERGE (n:KG {id: 'audioroute:device:ddragon_state.ddragon/fmsnd/0'}) SET n:AudioRoute SET n += {output: '0', target: 'mono', gain: 0.35, raw: 'fmsnd.add_route(0, "mono", 0.35)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 974, sourceColumn: 2, sourceEndLine: 974};
MERGE (n:KG {id: 'audioroute:device:ddragon_state.ddragon/fmsnd/1'}) SET n:AudioRoute SET n += {output: '1', target: 'mono', gain: 0.35, raw: 'fmsnd.add_route(1, "mono", 0.35)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 975, sourceColumn: 2, sourceEndLine: 975};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/fmsnd/callback:fmsnd:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set_inputline', raw: 'fmsnd.irq_handler().set_inputline(m_soundcpu, M6809_FIRQ_LINE)', ownerTag: 'fmsnd', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 973, sourceColumn: 2, sourceEndLine: 973, inputLine: 'M6809_FIRQ_LINE', targetTag: 'soundcpu'};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/adpcm1'}) SET n:Device SET n += {type: 'MSM5205', tag: 'adpcm1', clock: 375000, config: ['MSM5205(config, m_adpcm[0], MAIN_CLOCK / 32)', 'm_adpcm[0]->vck_legacy_callback().set(FUNC(ddragon_state::ddragon_adpcm_int<0>))', 'm_adpcm[0]->set_prescaler_selector(msm5205_device::S48_4B)', 'm_adpcm[0]->add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 977, sourceColumn: 2, sourceEndLine: 977};
MERGE (n:KG {id: 'audioroute:device:ddragon_state.ddragon/adpcm1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'm_adpcm[0]->add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 980, sourceColumn: 2, sourceEndLine: 980};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/adpcm1/callback:adpcm1:0'}) SET n:Callback SET n += {signal: 'vck_legacy_callback', operation: 'set', raw: 'm_adpcm[0]->vck_legacy_callback().set(FUNC(ddragon_state::ddragon_adpcm_int<0>))', ownerTag: 'adpcm1', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 978, sourceColumn: 2, sourceEndLine: 978, targetClass: 'ddragon_state', targetMethod: 'ddragon_adpcm_int_0'};
MERGE (n:KG {id: 'handler:ddragon_state.ddragon_adpcm_int_0'}) SET n:Handler SET n += {method: 'ddragon_adpcm_int_0', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 420, sourceColumn: 1, sourceEndLine: 437, sourceConstants: ['Which=0'], sourceParameters: 'int state', sourceBody: 'if (m_adpcm_pos[Which] >= m_adpcm_end[Which] || m_adpcm_pos[Which] >= m_adpcm_rom[Which].length())
	{
		m_adpcm_idle[Which] = true;
		m_adpcm[Which]->reset_w(1);
	}
	else if (m_adpcm_data[Which] != -1)
	{
		m_adpcm[Which]->data_w(m_adpcm_data[Which] & 0x0f);
		m_adpcm_data[Which] = -1;
	}
	else
	{
		m_adpcm_data[Which] = m_adpcm_rom[Which][m_adpcm_pos[Which]++];
		m_adpcm[Which]->data_w(m_adpcm_data[Which] >> 4);
	}'};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/adpcm2'}) SET n:Device SET n += {type: 'MSM5205', tag: 'adpcm2', clock: 375000, config: ['MSM5205(config, m_adpcm[1], MAIN_CLOCK / 32)', 'm_adpcm[1]->vck_legacy_callback().set(FUNC(ddragon_state::ddragon_adpcm_int<1>))', 'm_adpcm[1]->set_prescaler_selector(msm5205_device::S48_4B)', 'm_adpcm[1]->add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 982, sourceColumn: 2, sourceEndLine: 982};
MERGE (n:KG {id: 'audioroute:device:ddragon_state.ddragon/adpcm2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'm_adpcm[1]->add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 985, sourceColumn: 2, sourceEndLine: 985};
MERGE (n:KG {id: 'device:ddragon_state.ddragon/adpcm2/callback:adpcm2:0'}) SET n:Callback SET n += {signal: 'vck_legacy_callback', operation: 'set', raw: 'm_adpcm[1]->vck_legacy_callback().set(FUNC(ddragon_state::ddragon_adpcm_int<1>))', ownerTag: 'adpcm2', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 983, sourceColumn: 2, sourceEndLine: 983, targetClass: 'ddragon_state', targetMethod: 'ddragon_adpcm_int_1'};
MERGE (n:KG {id: 'handler:ddragon_state.ddragon_adpcm_int_1'}) SET n:Handler SET n += {method: 'ddragon_adpcm_int_1', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 420, sourceColumn: 1, sourceEndLine: 437, sourceConstants: ['Which=1'], sourceParameters: 'int state', sourceBody: 'if (m_adpcm_pos[Which] >= m_adpcm_end[Which] || m_adpcm_pos[Which] >= m_adpcm_rom[Which].length())
	{
		m_adpcm_idle[Which] = true;
		m_adpcm[Which]->reset_w(1);
	}
	else if (m_adpcm_data[Which] != -1)
	{
		m_adpcm[Which]->data_w(m_adpcm_data[Which] & 0x0f);
		m_adpcm_data[Which] = -1;
	}
	else
	{
		m_adpcm_data[Which] = m_adpcm_rom[Which][m_adpcm_pos[Which]++];
		m_adpcm[Which]->data_w(m_adpcm_data[Which] >> 4);
	}'};
MERGE (n:KG {id: 'inputs:ddragon'}) SET n:InputPorts SET n += {name: 'ddragon', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 603, sourceColumn: 8, sourceEndLine: 603};
MERGE (n:KG {id: 'inputs:ddragon/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:ddragon/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:ddragon/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:ddragon/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:ddragon/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:ddragon/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:ddragon/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:ddragon/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:ddragon/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START2', defaultValue: 128};
MERGE (n:KG {id: 'inputs:ddragon/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:ddragon/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:ddragon/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:ddragon/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:ddragon/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:ddragon/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:ddragon/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:ddragon/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:ddragon/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN2', defaultValue: 128};
MERGE (n:KG {id: 'inputs:ddragon/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: false};
MERGE (n:KG {id: 'inputs:ddragon/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, modifiers: ['PORT_DIPLOCATION("SW1:1,2,3")'], name: 'Coin A', defaultValue: 7, location: 'SW1:1,2,3', settings: ['0=4C 1C', '1=3C 1C', '2=2C 1C', '7=1C 1C', '6=1C 2C', '5=1C 3C', '4=1C 4C', '3=1C 5C']};
MERGE (n:KG {id: 'inputs:ddragon/DSW0/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 56, modifiers: ['PORT_DIPLOCATION("SW1:4,5,6")'], name: 'Coin B', defaultValue: 56, location: 'SW1:4,5,6', settings: ['0=4C 1C', '8=3C 1C', '16=2C 1C', '56=1C 1C', '48=1C 2C', '40=1C 3C', '32=1C 4C', '24=1C 5C']};
MERGE (n:KG {id: 'inputs:ddragon/DSW0/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW1:7")'], name: 'Cabinet', defaultValue: 64, location: 'SW1:7', settings: ['64=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:ddragon/DSW0/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW1:8")'], name: 'Flip Screen', defaultValue: 128, location: 'SW1:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:ddragon/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:ddragon/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:1,2")'], name: 'Difficulty', defaultValue: 3, location: 'SW2:1,2', settings: ['1=Easy', '3=Medium', '2=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:ddragon/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Demo Sounds', defaultValue: 4, location: 'SW2:3', settings: ['0=Off', '4=On']};
MERGE (n:KG {id: 'inputs:ddragon/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 8};
MERGE (n:KG {id: 'inputs:ddragon/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW2:5,6")'], name: 'Bonus Life', defaultValue: 48, location: 'SW2:5,6', settings: ['16=20k', '0=40k', '48=30k and every 60k', '32=40k and every 80k']};
MERGE (n:KG {id: 'inputs:ddragon/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_DIPLOCATION("SW2:7,8")'], name: 'Lives', defaultValue: 192, location: 'SW2:7,8', settings: ['192=2', '128=3', '64=4', '0=Infinite (Cheat)']};
MERGE (n:KG {id: 'inputs:ddragon/EXTRA'}) SET n:Port SET n += {tag: 'EXTRA', modify: false};
MERGE (n:KG {id: 'inputs:ddragon/EXTRA/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:ddragon/EXTRA/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON3', defaultValue: 2};
MERGE (n:KG {id: 'inputs:ddragon/EXTRA/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(2)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:ddragon/EXTRA/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:ddragon/EXTRA/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(ddragon_state::subcpu_bus_free_r))'], defaultValue: 16};
MERGE (n:KG {id: 'handler:ddragon_state.subcpu_bus_free_r'}) SET n:Handler SET n += {method: 'subcpu_bus_free_r', ownerClass: 'ddragon_state', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 330, sourceColumn: 1, sourceEndLine: 337, sourceParameters: '', sourceBody: '// Corresponds to BA (Bus Available) on the HD63701
	if (m_subcpu)
		return m_subcpu->suspended(SUSPEND_REASON_RESET | SUSPEND_REASON_HALT);
	else
		return 0;'};
MERGE (n:KG {id: 'inputs:ddragon/EXTRA/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'gfxlayout:char_layout'}) SET n:GfxLayout SET n += {name: 'char_layout', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [0, 2, 4, 6], xOffsets: [1, 0, 65, 64, 129, 128, 193, 192], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:tile_layout'}) SET n:GfxLayout SET n += {name: 'tile_layout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: ['RGN_FRAC(1,2)+0', 'RGN_FRAC(1,2)+4', 0, 4], xOffsets: [3, 2, 1, 0, 131, 130, 129, 128, 259, 258, 257, 256, 387, 386, 385, 384], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_ddragon'}) SET n:GfxDecode SET n += {name: 'gfx_ddragon', sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 924, sourceColumn: 8, sourceEndLine: 924};
MERGE (n:KG {id: 'gfxdecode:gfx_ddragon/e0'}) SET n:GfxDecodeEntry SET n += {region: 'chars', offset: 0, layout: 'char_layout', colorBase: 0, colorCount: 8, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_ddragon/e1'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'tile_layout', colorBase: 128, colorCount: 8, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_ddragon/e2'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'tile_layout', colorBase: 256, colorCount: 8, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:ddragon'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 2438, sourceColumn: 1, sourceEndLine: 2438};
MATCH (a:KG {id: 'game:ddragon'}), (b:KG {id: 'machine:ddragon_state.ddragon'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:ddragon'}), (b:KG {id: 'inputs:ddragon'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:ddragon'}), (b:KG {id: 'romset:ddragon'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:ddragon.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:cpu/m6800/m6801.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:cpu/m6809/hd6309.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:cpu/m6809/m6809.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:sound/okim6295.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:sound/ymopm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:sound/ymopn.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/ddragon.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 941, sourceColumn: 1, sourceEndLine: 986};
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'handler:ddragon_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'handler:ddragon_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'bank:ddragon_state.ddragon/mainbank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/scantimer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/sub'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/soundcpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'gfxdecode:gfx_ddragon'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/fmsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/adpcm1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ddragon_state.ddragon'}), (b:KG {id: 'device:ddragon_state.ddragon/adpcm2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:ddragon'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 603, sourceColumn: 8, sourceEndLine: 603};
MATCH (a:KG {id: 'inputs:ddragon'}), (b:KG {id: 'inputs:ddragon/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ddragon'}), (b:KG {id: 'inputs:ddragon/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ddragon'}), (b:KG {id: 'inputs:ddragon/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ddragon'}), (b:KG {id: 'inputs:ddragon/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:ddragon'}), (b:KG {id: 'inputs:ddragon/EXTRA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 1139, sourceColumn: 1, sourceEndLine: 1139};
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'region:ddragon/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'region:ddragon/sub'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'region:ddragon/soundcpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'region:ddragon/chars'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'region:ddragon/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'region:ddragon/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'region:ddragon/adpcm1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'region:ddragon/adpcm2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:ddragon'}), (b:KG {id: 'region:ddragon/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:ddragon_state.video_start'}), (b:KG {id: 'handler:ddragon_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ddragon_state.video_start'}), (b:KG {id: 'handler:ddragon_state.background_scan'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ddragon_state.video_start'}), (b:KG {id: 'handler:ddragon_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:ddragon_state.ddragon/mainbank'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 141};
MATCH (a:KG {id: 'device:ddragon_state.ddragon/maincpu'}), (b:KG {id: 'map:ddragon_state.ddragon_main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:ddragon_state.ddragon/scantimer'}), (b:KG {id: 'device:ddragon_state.ddragon/scantimer/callback:scantimer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/sub'}), (b:KG {id: 'device:ddragon_state.ddragon/sub/callback:sub:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/sub'}), (b:KG {id: 'map:ddragon_state.ddragon_sub_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:ddragon_state.ddragon/soundcpu'}), (b:KG {id: 'map:ddragon_state.ddragon_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'gfxdecode:gfx_ddragon'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 924, sourceColumn: 8, sourceEndLine: 924};
MATCH (a:KG {id: 'gfxdecode:gfx_ddragon'}), (b:KG {id: 'gfxdecode:gfx_ddragon/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ddragon'}), (b:KG {id: 'gfxdecode:gfx_ddragon/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ddragon'}), (b:KG {id: 'gfxdecode:gfx_ddragon/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/screen'}), (b:KG {id: 'device:ddragon_state.ddragon/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/soundlatch'}), (b:KG {id: 'device:ddragon_state.ddragon/soundlatch/callback:soundlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/fmsnd'}), (b:KG {id: 'audioroute:device:ddragon_state.ddragon/fmsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/fmsnd'}), (b:KG {id: 'audioroute:device:ddragon_state.ddragon/fmsnd/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/fmsnd'}), (b:KG {id: 'device:ddragon_state.ddragon/fmsnd/callback:fmsnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/adpcm1'}), (b:KG {id: 'audioroute:device:ddragon_state.ddragon/adpcm1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/adpcm1'}), (b:KG {id: 'device:ddragon_state.ddragon/adpcm1/callback:adpcm1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/adpcm2'}), (b:KG {id: 'audioroute:device:ddragon_state.ddragon/adpcm2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/adpcm2'}), (b:KG {id: 'device:ddragon_state.ddragon/adpcm2/callback:adpcm2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P1'}), (b:KG {id: 'inputs:ddragon/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P1'}), (b:KG {id: 'inputs:ddragon/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P1'}), (b:KG {id: 'inputs:ddragon/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P1'}), (b:KG {id: 'inputs:ddragon/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P1'}), (b:KG {id: 'inputs:ddragon/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P1'}), (b:KG {id: 'inputs:ddragon/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P1'}), (b:KG {id: 'inputs:ddragon/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P1'}), (b:KG {id: 'inputs:ddragon/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P2'}), (b:KG {id: 'inputs:ddragon/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P2'}), (b:KG {id: 'inputs:ddragon/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P2'}), (b:KG {id: 'inputs:ddragon/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P2'}), (b:KG {id: 'inputs:ddragon/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P2'}), (b:KG {id: 'inputs:ddragon/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P2'}), (b:KG {id: 'inputs:ddragon/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P2'}), (b:KG {id: 'inputs:ddragon/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/P2'}), (b:KG {id: 'inputs:ddragon/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/DSW0'}), (b:KG {id: 'inputs:ddragon/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/DSW0'}), (b:KG {id: 'inputs:ddragon/DSW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/DSW0'}), (b:KG {id: 'inputs:ddragon/DSW0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/DSW0'}), (b:KG {id: 'inputs:ddragon/DSW0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/DSW1'}), (b:KG {id: 'inputs:ddragon/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/DSW1'}), (b:KG {id: 'inputs:ddragon/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/DSW1'}), (b:KG {id: 'inputs:ddragon/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/DSW1'}), (b:KG {id: 'inputs:ddragon/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/DSW1'}), (b:KG {id: 'inputs:ddragon/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/EXTRA'}), (b:KG {id: 'inputs:ddragon/EXTRA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/EXTRA'}), (b:KG {id: 'inputs:ddragon/EXTRA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/EXTRA'}), (b:KG {id: 'inputs:ddragon/EXTRA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/EXTRA'}), (b:KG {id: 'inputs:ddragon/EXTRA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/EXTRA'}), (b:KG {id: 'inputs:ddragon/EXTRA/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:ddragon/EXTRA'}), (b:KG {id: 'inputs:ddragon/EXTRA/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:ddragon/maincpu'}), (b:KG {id: 'rom:ddragon/maincpu/21j-1.26'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/maincpu'}), (b:KG {id: 'rom:ddragon/maincpu/21j-2-3.25'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/maincpu'}), (b:KG {id: 'rom:ddragon/maincpu/21a-3.24'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/maincpu'}), (b:KG {id: 'rom:ddragon/maincpu/21j-4.23'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/sub'}), (b:KG {id: 'rom:ddragon/sub/21jm-0.ic55'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/soundcpu'}), (b:KG {id: 'rom:ddragon/soundcpu/21j-0-1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/chars'}), (b:KG {id: 'rom:ddragon/chars/21j-5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/sprites'}), (b:KG {id: 'rom:ddragon/sprites/21j-a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/sprites'}), (b:KG {id: 'rom:ddragon/sprites/21j-b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/sprites'}), (b:KG {id: 'rom:ddragon/sprites/21j-c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/sprites'}), (b:KG {id: 'rom:ddragon/sprites/21j-d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/sprites'}), (b:KG {id: 'rom:ddragon/sprites/21j-e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/sprites'}), (b:KG {id: 'rom:ddragon/sprites/21j-f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/sprites'}), (b:KG {id: 'rom:ddragon/sprites/21j-g'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/sprites'}), (b:KG {id: 'rom:ddragon/sprites/21j-h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/tiles'}), (b:KG {id: 'rom:ddragon/tiles/21j-8'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/tiles'}), (b:KG {id: 'rom:ddragon/tiles/21j-9'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/tiles'}), (b:KG {id: 'rom:ddragon/tiles/21j-i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/tiles'}), (b:KG {id: 'rom:ddragon/tiles/21j-j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/adpcm1'}), (b:KG {id: 'rom:ddragon/adpcm1/21j-6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/adpcm2'}), (b:KG {id: 'rom:ddragon/adpcm2/21j-7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/proms'}), (b:KG {id: 'rom:ddragon/proms/21j-k-0.101'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:ddragon/proms'}), (b:KG {id: 'rom:ddragon/proms/21j-l-0.16'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_main_map'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 472, sourceColumn: 1, sourceEndLine: 477};
MATCH (a:KG {id: 'map:ddragon_state.ddragon_main_map'}), (b:KG {id: 'map:ddragon_state.base_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_main_map'}), (b:KG {id: 'map:ddragon_state.ddragon_main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_main_map'}), (b:KG {id: 'map:ddragon_state.ddragon_main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/scantimer/callback:scantimer:0'}), (b:KG {id: 'handler:ddragon_state.scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/sub/callback:sub:0'}), (b:KG {id: 'handler:ddragon_state.sub_port6_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sub_map'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 529, sourceColumn: 1, sourceEndLine: 532};
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sub_map'}), (b:KG {id: 'map:ddragon_state.ddragon_sub_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 571, sourceColumn: 1, sourceEndLine: 579};
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map'}), (b:KG {id: 'map:ddragon_state.ddragon_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map'}), (b:KG {id: 'map:ddragon_state.ddragon_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map'}), (b:KG {id: 'map:ddragon_state.ddragon_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map'}), (b:KG {id: 'map:ddragon_state.ddragon_sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map'}), (b:KG {id: 'map:ddragon_state.ddragon_sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map'}), (b:KG {id: 'map:ddragon_state.ddragon_sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ddragon/e0'}), (b:KG {id: 'gfxlayout:char_layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ddragon/e1'}), (b:KG {id: 'gfxlayout:tile_layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_ddragon/e2'}), (b:KG {id: 'gfxlayout:tile_layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/screen/callback:screen:0'}), (b:KG {id: 'handler:ddragon_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'device:ddragon_state.ddragon/soundcpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/fmsnd/callback:fmsnd:0'}), (b:KG {id: 'device:ddragon_state.ddragon/soundcpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/adpcm1/callback:adpcm1:0'}), (b:KG {id: 'handler:ddragon_state.ddragon_adpcm_int_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:ddragon_state.ddragon/adpcm2/callback:adpcm2:0'}), (b:KG {id: 'handler:ddragon_state.ddragon_adpcm_int_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:ddragon/EXTRA/f4'}), (b:KG {id: 'handler:ddragon_state.subcpu_bus_free_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/ddragon.cpp', sourceLine: 452, sourceColumn: 1, sourceEndLine: 470};
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map'}), (b:KG {id: 'map:ddragon_state.base_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_main_map/range0'}), (b:KG {id: 'handler:ddragon_state.bankswitch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:ddragon_state.scanline'}), (b:KG {id: 'handler:ddragon_state.scanline_to_vcount'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map/range1'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map/range2'}), (b:KG {id: 'handler:ddragon_state.ddragon_adpcm_status_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map/range3'}), (b:KG {id: 'handler:ym2151_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'fmsnd'};
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map/range3'}), (b:KG {id: 'handler:ym2151_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'fmsnd'};
MATCH (a:KG {id: 'map:ddragon_state.ddragon_sound_map/range4'}), (b:KG {id: 'handler:ddragon_state.ddragon_adpcm_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'gfxlayout:char_layout'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:tile_layout'}), (b:KG {id: 'file:src/mame/technos/ddragon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:ddragon_state.screen_update'}), (b:KG {id: 'handler:ddragon_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map/range1'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:ddragon_state.base_map/range2'}), (b:KG {id: 'handler:palette_device.write8_ext'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:ddragon_state.base_map/range3'}), (b:KG {id: 'handler:ddragon_state.fgvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map/range4'}), (b:KG {id: 'handler:ddragon_state.comram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map/range4'}), (b:KG {id: 'handler:ddragon_state.comram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map/range6'}), (b:KG {id: 'handler:ddragon_state.bgvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map/range14'}), (b:KG {id: 'handler:ddragon_state.interrupt_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:ddragon_state.base_map/range14'}), (b:KG {id: 'handler:ddragon_state.interrupt_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:ddragon_state.interrupt_r'}), (b:KG {id: 'handler:ddragon_state.interrupt_ack'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ddragon_state.interrupt_w'}), (b:KG {id: 'handler:ddragon_state.interrupt_ack'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
