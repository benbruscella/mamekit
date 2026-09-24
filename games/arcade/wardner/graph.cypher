// mamekit knowledge graph — driver src/mame/toaplan/wardner.cpp
// generated 2026-09-24T02:30:54.039Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/toaplan/wardner.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:twincobr.h'}) SET n:SourceFile SET n += {path: 'twincobr.h', external: true};
MERGE (n:KG {id: 'file:toaplipt.h'}) SET n:SourceFile SET n += {path: 'toaplipt.h', external: true};
MERGE (n:KG {id: 'file:cpu/tms320c1x/tms320c1x.h'}) SET n:SourceFile SET n += {path: 'cpu/tms320c1x/tms320c1x.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopl.h'}) SET n:SourceFile SET n += {path: 'sound/ymopl.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:toaplan_dsp.h'}) SET n:SourceFile SET n += {path: 'toaplan_dsp.h', external: true};
MERGE (n:KG {id: 'file:logmacro.h'}) SET n:SourceFile SET n += {path: 'logmacro.h', external: true};
MERGE (n:KG {id: 'file:src/mame/toaplan/toaplan_dsp.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/toaplan/toaplan_dsp.cpp'};
MERGE (n:KG {id: 'game:wardner'}) SET n:Game SET n += {name: 'wardner', year: '1987', company: 'Toaplan / Taito', fullname: 'Wardner (World)', monitor: 'ROT0', cls: 'wardner_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 756, sourceColumn: 1, sourceEndLine: 756};
MERGE (n:KG {id: 'romset:wardner'}) SET n:RomSet SET n += {name: 'wardner', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 513, sourceColumn: 1, sourceEndLine: 513};
MERGE (n:KG {id: 'region:wardner/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 262144, flags: 'ROMREGION_ERASEFF', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 514, sourceColumn: 2, sourceEndLine: 514};
MERGE (n:KG {id: 'rom:wardner/maincpu/b25-31.6m'}) SET n:Rom SET n += {file: 'b25-31.6m', offset: 0, size: 32768, crc: 'c5dd56fd', sha1: 'f0a09557150e9c1c6b9d8e125f5408fc269c9d17', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 515, sourceColumn: 2, sourceEndLine: 515};
MERGE (n:KG {id: 'rom:wardner/maincpu/b25-18.7m'}) SET n:Rom SET n += {file: 'b25-18.7m', offset: 65536, size: 65536, crc: '9aab8ee2', sha1: '16fa44b75f4a3a5b1ff713690a299ecec2b5a4bf', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 516, sourceColumn: 2, sourceEndLine: 516};
MERGE (n:KG {id: 'rom:wardner/maincpu/b25-19.8m'}) SET n:Rom SET n += {file: 'b25-19.8m', offset: 131072, size: 65536, crc: '95b68813', sha1: '06ea1b1d6e2e6326ceb9324fc471d082fda6112e', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 517, sourceColumn: 2, sourceEndLine: 517};
MERGE (n:KG {id: 'rom:wardner/maincpu/b25-32.10m'}) SET n:Rom SET n += {file: 'b25-32.10m', offset: 229376, size: 32768, crc: '347f411b', sha1: '1fb2883d74d10350cb1c62fb58d5783652861b37', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 518, sourceColumn: 2, sourceEndLine: 518};
MERGE (n:KG {id: 'region:wardner/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 520, sourceColumn: 2, sourceEndLine: 520};
MERGE (n:KG {id: 'rom:wardner/audiocpu/b25-16.4k'}) SET n:Rom SET n += {file: 'b25-16.4k', offset: 0, size: 32768, crc: 'e5202ff8', sha1: '15ae8c0bb16a20bee14e8d80d81c249404ab1463', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 521, sourceColumn: 2, sourceEndLine: 521};
MERGE (n:KG {id: 'region:wardner/dsp:dsp'}) SET n:RomRegion SET n += {tag: 'dsp:dsp', size: 4096, flags: '0'};
MERGE (n:KG {id: 'rom:wardner/dsp:dsp/d70012u_gxc-02_mcu_71001'}) SET n:Rom SET n += {file: 'd70012u_gxc-02_mcu_71001', offset: 0, size: 3072, crc: 'eee0ff59', sha1: 'dad4570815ec444e34cc73f7cd90f9ca8f7b3eb8', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 524, sourceColumn: 2, sourceEndLine: 524, status: 'baddump'};
MERGE (n:KG {id: 'region:wardner/chars'}) SET n:RomRegion SET n += {tag: 'chars', size: 49152, flags: '0', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 526, sourceColumn: 2, sourceEndLine: 526};
MERGE (n:KG {id: 'rom:wardner/chars/b25-28.10f'}) SET n:Rom SET n += {file: 'b25-28.10f', offset: 0, size: 16384, crc: '1392b60d', sha1: '86b9eab87f8d5f68fda500420f4ed61331089fc2', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 527, sourceColumn: 2, sourceEndLine: 527};
MERGE (n:KG {id: 'rom:wardner/chars/b25-27.8f'}) SET n:Rom SET n += {file: 'b25-27.8f', offset: 16384, size: 16384, crc: '0ed848da', sha1: 'e4b38e21c101a28a8961a9fe30c9cb10919cc148', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 528, sourceColumn: 2, sourceEndLine: 528};
MERGE (n:KG {id: 'rom:wardner/chars/b25-26.7f'}) SET n:Rom SET n += {file: 'b25-26.7f', offset: 32768, size: 16384, crc: '79792c86', sha1: '648b97f1ec30d46e40e60eb13159b4f6f86e9243', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 529, sourceColumn: 2, sourceEndLine: 529};
MERGE (n:KG {id: 'region:wardner/fg_tiles'}) SET n:RomRegion SET n += {tag: 'fg_tiles', size: 131072, flags: '0', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 531, sourceColumn: 2, sourceEndLine: 531};
MERGE (n:KG {id: 'rom:wardner/fg_tiles/b25-12.18f'}) SET n:Rom SET n += {file: 'b25-12.18f', offset: 0, size: 32768, crc: '15d08848', sha1: 'e2e62d95a3f240664b5e0ac0f163a0d5cefa5312', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 532, sourceColumn: 2, sourceEndLine: 532};
MERGE (n:KG {id: 'rom:wardner/fg_tiles/b25-15.23f'}) SET n:Rom SET n += {file: 'b25-15.23f', offset: 32768, size: 32768, crc: 'cdd2d408', sha1: '7e4d77f8725fa30d4d65e811d10e0b2c00b23cfe', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 533, sourceColumn: 2, sourceEndLine: 533};
MERGE (n:KG {id: 'rom:wardner/fg_tiles/b25-14.21f'}) SET n:Rom SET n += {file: 'b25-14.21f', offset: 65536, size: 32768, crc: '5a2aef4f', sha1: '60f4ab2582a924defb5241ab367826ae1f4b3f5e', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 534, sourceColumn: 2, sourceEndLine: 534};
MERGE (n:KG {id: 'rom:wardner/fg_tiles/b25-13.19f'}) SET n:Rom SET n += {file: 'b25-13.19f', offset: 98304, size: 32768, crc: 'be21db2b', sha1: '7fc1809618f2432c9ec6eb33ce57a5faffd44974', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 535, sourceColumn: 2, sourceEndLine: 535};
MERGE (n:KG {id: 'region:wardner/bg_tiles'}) SET n:RomRegion SET n += {tag: 'bg_tiles', size: 131072, flags: '0', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 537, sourceColumn: 2, sourceEndLine: 537};
MERGE (n:KG {id: 'rom:wardner/bg_tiles/b25-08.12f'}) SET n:Rom SET n += {file: 'b25-08.12f', offset: 0, size: 32768, crc: '883ccaa3', sha1: '90d686094eac6e80caf8e2cf90c00bb41a0d26e2', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 538, sourceColumn: 2, sourceEndLine: 538};
MERGE (n:KG {id: 'rom:wardner/bg_tiles/b25-11.16f'}) SET n:Rom SET n += {file: 'b25-11.16f', offset: 32768, size: 32768, crc: 'd6ebd510', sha1: 'd65e0db7756ebe6828bf637a6c915bb06082636c', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 539, sourceColumn: 2, sourceEndLine: 539};
MERGE (n:KG {id: 'rom:wardner/bg_tiles/b25-10.15f'}) SET n:Rom SET n += {file: 'b25-10.15f', offset: 65536, size: 32768, crc: 'b9a61e81', sha1: '541e579664d583fbbf81111046115018fdaff073', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 540, sourceColumn: 2, sourceEndLine: 540};
MERGE (n:KG {id: 'rom:wardner/bg_tiles/b25-09.14f'}) SET n:Rom SET n += {file: 'b25-09.14f', offset: 98304, size: 32768, crc: '585411b7', sha1: '67c0f4b7ab303341d5481c4024dc4199acb7c279', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 541, sourceColumn: 2, sourceEndLine: 541};
MERGE (n:KG {id: 'region:wardner/scu'}) SET n:RomRegion SET n += {tag: 'scu', size: 262144, flags: '0', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 543, sourceColumn: 2, sourceEndLine: 543};
MERGE (n:KG {id: 'rom:wardner/scu/b25-01.14c'}) SET n:Rom SET n += {file: 'b25-01.14c', offset: 0, size: 65536, crc: '42ec01fb', sha1: '646192a2e89f795ed016860cdcdc0b5ef645fca2', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 544, sourceColumn: 2, sourceEndLine: 544};
MERGE (n:KG {id: 'rom:wardner/scu/b25-02.16c'}) SET n:Rom SET n += {file: 'b25-02.16c', offset: 65536, size: 65536, crc: '6c0130b7', sha1: '8b6ad72848d03c3d4ee3acd35abbb3a0e678122c', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 545, sourceColumn: 2, sourceEndLine: 545};
MERGE (n:KG {id: 'rom:wardner/scu/b25-03.17c'}) SET n:Rom SET n += {file: 'b25-03.17c', offset: 131072, size: 65536, crc: 'b923db99', sha1: '2f4be81afdf200586bc44b1e94553d84d16d0b62', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 546, sourceColumn: 2, sourceEndLine: 546};
MERGE (n:KG {id: 'rom:wardner/scu/b25-04.19c'}) SET n:Rom SET n += {file: 'b25-04.19c', offset: 196608, size: 65536, crc: '8059573c', sha1: '75bd19e504433438b85ed00e50e85fb98eebf4de', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 547, sourceColumn: 2, sourceEndLine: 547};
MERGE (n:KG {id: 'region:wardner/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 608, flags: '0', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 549, sourceColumn: 2, sourceEndLine: 549};
MERGE (n:KG {id: 'rom:wardner/proms/82s129.b19'}) SET n:Rom SET n += {file: '82s129.b19', offset: 0, size: 256, crc: '24e7d62f', sha1: '1c06a1ef1b6a722794ca1d5ee2c476ecaa5178a3', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 550, sourceColumn: 2, sourceEndLine: 550};
MERGE (n:KG {id: 'rom:wardner/proms/82s129.b18'}) SET n:Rom SET n += {file: '82s129.b18', offset: 256, size: 256, crc: 'a50cef09', sha1: '55cafb5b2551b80ae708e9b966cf37c70a16d310', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 551, sourceColumn: 2, sourceEndLine: 551};
MERGE (n:KG {id: 'rom:wardner/proms/82s123.b21'}) SET n:Rom SET n += {file: '82s123.b21', offset: 512, size: 32, crc: 'f72482db', sha1: 'b0cb911f9c81f6088a5aa8760916ddae1f8534d7', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 552, sourceColumn: 2, sourceEndLine: 552};
MERGE (n:KG {id: 'rom:wardner/proms/82s123.c6'}) SET n:Rom SET n += {file: '82s123.c6', offset: 544, size: 32, crc: 'bc88cced', sha1: '5055362710c0f58823c05fb4c0e0eec638b91e3d', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 553, sourceColumn: 2, sourceEndLine: 553};
MERGE (n:KG {id: 'rom:wardner/proms/82s123.f1'}) SET n:Rom SET n += {file: '82s123.f1', offset: 576, size: 32, crc: '4fb5df2a', sha1: '506ef2c8e4cf45c256d6831a0a5760732f2de422', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 554, sourceColumn: 2, sourceEndLine: 554};
MERGE (n:KG {id: 'map:wardner_state.main_program_map'}) SET n:AddressMap SET n += {cls: 'wardner_state', name: 'main_program_map', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 257, sourceColumn: 1, sourceEndLine: 269};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 28671, raw: 'map(0x0000, 0x6fff).rom()', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 259, sourceColumn: 2, sourceEndLine: 259, rom: true};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range1'}) SET n:AddressRange SET n += {start: 28672, end: 32767, raw: 'map(0x7000, 0x7fff).ram()', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 260, sourceColumn: 2, sourceEndLine: 260, ram: true};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range2'}) SET n:AddressRange SET n += {start: 32768, end: 36863, raw: 'map(0x8000, 0x8fff).w(FUNC(wardner_state::wardner_sprite_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 261, sourceColumn: 2, sourceEndLine: 261};
MERGE (n:KG {id: 'handler:wardner_state.wardner_sprite_w'}) SET n:Handler SET n += {method: 'wardner_sprite_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 312, sourceColumn: 1, sourceEndLine: 319, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'u16 *const spriteram16 = reinterpret_cast<u16 *>(m_spriteram8->live());
	if (BIT(offset, 0))
		spriteram16[offset / 2] = (spriteram16[offset / 2] & 0x00ff) | (data << 8);
	else
		spriteram16[offset / 2] = (spriteram16[offset / 2] & 0xff00) | data;'};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range3'}) SET n:AddressRange SET n += {start: 40960, end: 45055, raw: 'map(0xa000, 0xafff).w(m_palette, FUNC(palette_device::write8))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 262, sourceColumn: 2, sourceEndLine: 262};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 262, sourceColumn: 2, sourceEndLine: 262};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range4'}) SET n:AddressRange SET n += {start: 49152, end: 51199, raw: 'map(0xc000, 0xc7ff).writeonly().share(m_sharedram)', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 263, sourceColumn: 2, sourceEndLine: 263, writeonly: true, share: 'sharedram'};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range5'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).view(m_rom_ram_view)', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 264, sourceColumn: 2, sourceEndLine: 264};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range6'}) SET n:AddressRange SET n += {start: 32768, end: 36863, raw: 'm_rom_ram_view[0](0x8000, 0x8fff).r(FUNC(wardner_state::wardner_sprite_r)).share("spriteram8")', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 265, sourceColumn: 2, sourceEndLine: 265, share: 'spriteram8', viewTag: 'm_rom_ram_view', viewEntry: 0};
MERGE (n:KG {id: 'handler:wardner_state.wardner_sprite_r'}) SET n:Handler SET n += {method: 'wardner_sprite_r', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 305, sourceColumn: 1, sourceEndLine: 310, sourceParameters: 'offs_t offset', sourceBody: 'u16 const *const spriteram16 = reinterpret_cast<u16 *>(m_spriteram8->live());
	const int shift = BIT(offset, 0) * 8;
	return spriteram16[offset / 2] >> shift;'};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range7'}) SET n:AddressRange SET n += {start: 40960, end: 45055, raw: 'm_rom_ram_view[0](0xa000, 0xafff).readonly().share("palette")', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 266, sourceColumn: 2, sourceEndLine: 266, readonly: true, share: 'palette', viewTag: 'm_rom_ram_view', viewEntry: 0};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range8'}) SET n:AddressRange SET n += {start: 49152, end: 51199, raw: 'm_rom_ram_view[0](0xc000, 0xc7ff).readonly().share(m_sharedram)', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 267, sourceColumn: 2, sourceEndLine: 267, readonly: true, share: 'sharedram', viewTag: 'm_rom_ram_view', viewEntry: 0};
MERGE (n:KG {id: 'map:wardner_state.main_program_map/range9'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'm_rom_ram_view[1](0x8000, 0xffff).bankr(m_rombank)', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 268, sourceColumn: 2, sourceEndLine: 268, viewTag: 'm_rom_ram_view', viewEntry: 1, bankRead: 'rombank'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map'}) SET n:AddressMap SET n += {cls: 'wardner_state', name: 'main_io_map', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 271, sourceColumn: 1, sourceEndLine: 292, globalMask: 255};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).w("crtc", FUNC(mc6845_device::address_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 274, sourceColumn: 2, sourceEndLine: 274};
MERGE (n:KG {id: 'handler:mc6845_device.address_w'}) SET n:Handler SET n += {method: 'address_w', ownerClass: 'mc6845_device', sourceFile: 'src/mame/toaplan/twincobr.cpp', sourceLine: 400, sourceColumn: 2, sourceEndLine: 400};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range1'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).w("crtc", FUNC(mc6845_device::register_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 275, sourceColumn: 2, sourceEndLine: 275};
MERGE (n:KG {id: 'handler:mc6845_device.register_w'}) SET n:Handler SET n += {method: 'register_w', ownerClass: 'mc6845_device', sourceFile: 'src/mame/toaplan/twincobr.cpp', sourceLine: 401, sourceColumn: 2, sourceEndLine: 401};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range2'}) SET n:AddressRange SET n += {start: 16, end: 19, raw: 'map(0x10, 0x13).w(FUNC(wardner_state::wardner_txscroll_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 276, sourceColumn: 2, sourceEndLine: 276};
MERGE (n:KG {id: 'handler:wardner_state.wardner_txscroll_w'}) SET n:Handler SET n += {method: 'wardner_txscroll_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 253, sourceColumn: 1, sourceEndLine: 257, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'const int shift = BIT(offset, 0) << 3;
	twincobr_txscroll_w(offset / 2, data << shift, 0xff << shift);'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_txscroll_w'}) SET n:Handler SET n += {method: 'twincobr_txscroll_w', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 186, sourceColumn: 1, sourceEndLine: 198, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'if (offset == 0)
	{
		COMBINE_DATA(&m_txscrollx);
		m_tx_tilemap->set_scrollx(0, m_txscrollx);
	}
	else
	{
		COMBINE_DATA(&m_txscrolly);
		m_tx_tilemap->set_scrolly(0, m_txscrolly);
	}'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range3'}) SET n:AddressRange SET n += {start: 20, end: 21, raw: 'map(0x14, 0x15).w(FUNC(wardner_state::wardner_txlayer_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 277, sourceColumn: 2, sourceEndLine: 277};
MERGE (n:KG {id: 'handler:wardner_state.wardner_txlayer_w'}) SET n:Handler SET n += {method: 'wardner_txlayer_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 235, sourceColumn: 1, sourceEndLine: 239, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'const int shift = BIT(offset, 0) << 3;
	twincobr_txoffs_w(offset / 2, data << shift, 0xff << shift);'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_txoffs_w'}) SET n:Handler SET n += {method: 'twincobr_txoffs_w', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 140, sourceColumn: 1, sourceEndLine: 144, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_txoffs);
	m_txoffs %= m_txvideoram_size;'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range4'}) SET n:AddressRange SET n += {start: 32, end: 35, raw: 'map(0x20, 0x23).w(FUNC(wardner_state::wardner_bgscroll_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 278, sourceColumn: 2, sourceEndLine: 278};
MERGE (n:KG {id: 'handler:wardner_state.wardner_bgscroll_w'}) SET n:Handler SET n += {method: 'wardner_bgscroll_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 259, sourceColumn: 1, sourceEndLine: 263, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'const int shift = BIT(offset, 0) << 3;
	twincobr_bgscroll_w(offset / 2, data << shift, 0xff << shift);'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_bgscroll_w'}) SET n:Handler SET n += {method: 'twincobr_bgscroll_w', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 200, sourceColumn: 1, sourceEndLine: 212, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'if (offset == 0)
	{
		COMBINE_DATA(&m_bgscrollx);
		m_bg_tilemap->set_scrollx(0, m_bgscrollx);
	}
	else
	{
		COMBINE_DATA(&m_bgscrolly);
		m_bg_tilemap->set_scrolly(0, m_bgscrolly);
	}'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range5'}) SET n:AddressRange SET n += {start: 36, end: 37, raw: 'map(0x24, 0x25).w(FUNC(wardner_state::wardner_bglayer_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 279, sourceColumn: 2, sourceEndLine: 279};
MERGE (n:KG {id: 'handler:wardner_state.wardner_bglayer_w'}) SET n:Handler SET n += {method: 'wardner_bglayer_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 245, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'const int shift = BIT(offset, 0) << 3;
	twincobr_bgoffs_w(offset / 2, data << shift, 0xff << shift);'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_bgoffs_w'}) SET n:Handler SET n += {method: 'twincobr_bgoffs_w', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 155, sourceColumn: 1, sourceEndLine: 159, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_bgoffs);
	m_bgoffs %= (m_bgvideoram_size >> 1);'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range6'}) SET n:AddressRange SET n += {start: 48, end: 51, raw: 'map(0x30, 0x33).w(FUNC(wardner_state::wardner_fgscroll_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 280, sourceColumn: 2, sourceEndLine: 280};
MERGE (n:KG {id: 'handler:wardner_state.wardner_fgscroll_w'}) SET n:Handler SET n += {method: 'wardner_fgscroll_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 265, sourceColumn: 1, sourceEndLine: 269, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'const int shift = BIT(offset, 0) << 3;
	twincobr_fgscroll_w(offset / 2, data << shift, 0xff << shift);'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_fgscroll_w'}) SET n:Handler SET n += {method: 'twincobr_fgscroll_w', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 214, sourceColumn: 1, sourceEndLine: 226, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'if (offset == 0)
	{
		COMBINE_DATA(&m_fgscrollx);
		m_fg_tilemap->set_scrollx(0, m_fgscrollx);
	}
	else
	{
		COMBINE_DATA(&m_fgscrolly);
		m_fg_tilemap->set_scrolly(0, m_fgscrolly);
	}'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range7'}) SET n:AddressRange SET n += {start: 52, end: 53, raw: 'map(0x34, 0x35).w(FUNC(wardner_state::wardner_fglayer_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 281, sourceColumn: 2, sourceEndLine: 281};
MERGE (n:KG {id: 'handler:wardner_state.wardner_fglayer_w'}) SET n:Handler SET n += {method: 'wardner_fglayer_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 247, sourceColumn: 1, sourceEndLine: 251, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'const int shift = BIT(offset, 0) << 3;
	twincobr_fgoffs_w(offset / 2, data << shift, 0xff << shift);'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_fgoffs_w'}) SET n:Handler SET n += {method: 'twincobr_fgoffs_w', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 170, sourceColumn: 1, sourceEndLine: 174, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_fgoffs);
	m_fgoffs %= m_fgvideoram_size;'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range8'}) SET n:AddressRange SET n += {start: 64, end: 67, raw: 'map(0x40, 0x43).w(FUNC(wardner_state::wardner_exscroll_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 282, sourceColumn: 2, sourceEndLine: 282};
MERGE (n:KG {id: 'handler:wardner_state.wardner_exscroll_w'}) SET n:Handler SET n += {method: 'wardner_exscroll_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 271, sourceColumn: 1, sourceEndLine: 280, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'switch (offset)
	{
		case 0x1:    //data <<= 8;
		case 0x0:    logerror("%s: write %04x to unknown video scroll X register\\n", machine().describe_context(),data); break;
		case 0x3:    //data <<= 8;
		case 0x2:    logerror("%s: write %04x to unknown video scroll Y register\\n", machine().describe_context(),data); break;
	}'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range9'}) SET n:AddressRange SET n += {start: 80, end: 80, raw: 'map(0x50, 0x50).portr("DSWA")', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 283, sourceColumn: 2, sourceEndLine: 283, portRead: 'DSWA'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range10'}) SET n:AddressRange SET n += {start: 82, end: 82, raw: 'map(0x52, 0x52).portr("DSWB")', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 284, sourceColumn: 2, sourceEndLine: 284, portRead: 'DSWB'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range11'}) SET n:AddressRange SET n += {start: 84, end: 84, raw: 'map(0x54, 0x54).portr("P1")', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 285, sourceColumn: 2, sourceEndLine: 285, portRead: 'P1'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range12'}) SET n:AddressRange SET n += {start: 86, end: 86, raw: 'map(0x56, 0x56).portr("P2")', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 286, sourceColumn: 2, sourceEndLine: 286, portRead: 'P2'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range13'}) SET n:AddressRange SET n += {start: 88, end: 88, raw: 'map(0x58, 0x58).portr("SYSTEM")', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 287, sourceColumn: 2, sourceEndLine: 287, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range14'}) SET n:AddressRange SET n += {start: 90, end: 90, raw: 'map(0x5a, 0x5a).w(m_coinlatch, FUNC(ls259_device::write_nibble_d0))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 288, sourceColumn: 2, sourceEndLine: 288};
MERGE (n:KG {id: 'handler:ls259_device.write_nibble_d0'}) SET n:Handler SET n += {method: 'write_nibble_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/toaplan/twincobr.cpp', sourceLine: 446, sourceColumn: 2, sourceEndLine: 446};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range15'}) SET n:AddressRange SET n += {start: 92, end: 92, raw: 'map(0x5c, 0x5c).w(m_mainlatch, FUNC(ls259_device::write_nibble_d0))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 289, sourceColumn: 2, sourceEndLine: 289};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range16'}) SET n:AddressRange SET n += {start: 96, end: 101, raw: 'map(0x60, 0x65).rw(FUNC(wardner_state::wardner_videoram_r), FUNC(wardner_state::wardner_videoram_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 290, sourceColumn: 2, sourceEndLine: 290};
MERGE (n:KG {id: 'handler:wardner_state.wardner_videoram_r'}) SET n:Handler SET n += {method: 'wardner_videoram_r', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 282, sourceColumn: 1, sourceEndLine: 292, sourceParameters: 'offs_t offset', sourceBody: 'const int shift = BIT(offset, 0) << 3;
	switch (offset / 2)
	{
		case 0: return twincobr_txram_r() >> shift;
		case 1: return twincobr_bgram_r() >> shift;
		case 2: return twincobr_fgram_r() >> shift;
	}
	return 0;'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_txram_r'}) SET n:Handler SET n += {method: 'twincobr_txram_r', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 148, sourceParameters: '', sourceBody: 'return m_txvideoram16[m_txoffs];'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_bgram_r'}) SET n:Handler SET n += {method: 'twincobr_bgram_r', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 160, sourceColumn: 1, sourceEndLine: 163, sourceParameters: '', sourceBody: 'return m_bgvideoram16[m_bgoffs + m_bg_ram_bank];'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_fgram_r'}) SET n:Handler SET n += {method: 'twincobr_fgram_r', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 175, sourceColumn: 1, sourceEndLine: 178, sourceParameters: '', sourceBody: 'return m_fgvideoram16[m_fgoffs];'};
MERGE (n:KG {id: 'handler:wardner_state.wardner_videoram_w'}) SET n:Handler SET n += {method: 'wardner_videoram_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 294, sourceColumn: 1, sourceEndLine: 303, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'const int shift = BIT(offset, 0) << 3;
	switch (offset / 2)
	{
		case 0: twincobr_txram_w(0, data << shift, 0xff << shift); break;
		case 1: twincobr_bgram_w(0, data << shift, 0xff << shift); break;
		case 2: twincobr_fgram_w(0, data << shift, 0xff << shift); break;
	}'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_txram_w'}) SET n:Handler SET n += {method: 'twincobr_txram_w', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 149, sourceColumn: 1, sourceEndLine: 153, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_txvideoram16[m_txoffs]);
	m_tx_tilemap->mark_tile_dirty(m_txoffs);'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_bgram_w'}) SET n:Handler SET n += {method: 'twincobr_bgram_w', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 164, sourceColumn: 1, sourceEndLine: 168, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_bgvideoram16[m_bgoffs + m_bg_ram_bank]);
	m_bg_tilemap->mark_tile_dirty((m_bgoffs + m_bg_ram_bank));'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_fgram_w'}) SET n:Handler SET n += {method: 'twincobr_fgram_w', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 179, sourceColumn: 1, sourceEndLine: 183, sourceParameters: 'offs_t offset, u16 data, u16 mem_mask', sourceBody: 'COMBINE_DATA(&m_fgvideoram16[m_fgoffs]);
	m_fg_tilemap->mark_tile_dirty(m_fgoffs);'};
MERGE (n:KG {id: 'map:wardner_state.main_io_map/range17'}) SET n:AddressRange SET n += {start: 112, end: 112, raw: 'map(0x70, 0x70).w(FUNC(wardner_state::wardner_bank_w))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 291, sourceColumn: 2, sourceEndLine: 291};
MERGE (n:KG {id: 'handler:wardner_state.wardner_bank_w'}) SET n:Handler SET n += {method: 'wardner_bank_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 251, sourceColumn: 1, sourceEndLine: 255, sourceParameters: 'uint8_t data', sourceBody: 'm_rom_ram_view.select(data == 0x00 ? 0 : 1);
	m_rombank->set_entry(data & 7);'};
MERGE (n:KG {id: 'map:wardner_state.sound_program_map'}) SET n:AddressMap SET n += {cls: 'wardner_state', name: 'sound_program_map', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 297, sourceColumn: 1, sourceEndLine: 303};
MERGE (n:KG {id: 'map:wardner_state.sound_program_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 299, sourceColumn: 2, sourceEndLine: 299, rom: true};
MERGE (n:KG {id: 'map:wardner_state.sound_program_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 32895, raw: 'map(0x8000, 0x807f).ram()', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 300, sourceColumn: 2, sourceEndLine: 300, ram: true};
MERGE (n:KG {id: 'map:wardner_state.sound_program_map/range2'}) SET n:AddressRange SET n += {start: 49152, end: 51199, raw: 'map(0xc000, 0xc7ff).ram().share(m_sharedram)', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 301, sourceColumn: 2, sourceEndLine: 301, ram: true, share: 'sharedram'};
MERGE (n:KG {id: 'map:wardner_state.sound_program_map/range3'}) SET n:AddressRange SET n += {start: 51200, end: 53247, raw: 'map(0xc800, 0xcfff).ram()', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 302, sourceColumn: 2, sourceEndLine: 302, ram: true};
MERGE (n:KG {id: 'map:wardner_state.sound_io_map'}) SET n:AddressMap SET n += {cls: 'wardner_state', name: 'sound_io_map', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 305, sourceColumn: 1, sourceEndLine: 309, globalMask: 255};
MERGE (n:KG {id: 'map:wardner_state.sound_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 1, raw: 'map(0x00, 0x01).rw("ymsnd", FUNC(ym3812_device::read), FUNC(ym3812_device::write))', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 308, sourceColumn: 2, sourceEndLine: 308};
MERGE (n:KG {id: 'handler:ym3812_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym3812_device', sourceFile: 'src/mame/toaplan/twincobr.cpp', sourceLine: 434, sourceColumn: 2, sourceEndLine: 434};
MERGE (n:KG {id: 'handler:ym3812_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym3812_device', sourceFile: 'src/mame/toaplan/twincobr.cpp', sourceLine: 434, sourceColumn: 2, sourceEndLine: 434};
MERGE (n:KG {id: 'map:toaplan_dsp_device.program_map'}) SET n:AddressMap SET n += {cls: 'toaplan_dsp_device', name: 'program_map', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 32, sourceColumn: 1, sourceEndLine: 37};
MERGE (n:KG {id: 'map:toaplan_dsp_device.program_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 2047, raw: 'map(0x000, 0x7ff).rom().region("dsp", 0)', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 36, sourceColumn: 2, sourceEndLine: 36, rom: true, region: 'dsp', regionOffset: 0};
MERGE (n:KG {id: 'map:toaplan_dsp_device.io_map'}) SET n:AddressMap SET n += {cls: 'toaplan_dsp_device', name: 'io_map', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 41, sourceColumn: 1, sourceEndLine: 46};
MERGE (n:KG {id: 'map:toaplan_dsp_device.io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x0, 0x0).w(FUNC(toaplan_dsp_device::dsp_addrsel_w))', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 43, sourceColumn: 2, sourceEndLine: 43};
MERGE (n:KG {id: 'handler:toaplan_dsp_device.dsp_addrsel_w'}) SET n:Handler SET n += {method: 'dsp_addrsel_w', ownerClass: 'toaplan_dsp_device', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 84, sourceColumn: 1, sourceEndLine: 88, sourceConstants: ['LOG_DSP=2'], sourceParameters: 'u16 data', sourceBody: 'm_host_addr_cb(data, m_main_ram_seg, m_dsp_addr_w);
	LOGMASKED(LOG_DSP, "%s: dsp_addrsel_w %04x (%08x)\\n", machine().describe_context(), data, m_main_ram_seg + m_dsp_addr_w);'};
MERGE (n:KG {id: 'map:toaplan_dsp_device.io_map/range1'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x1, 0x1).rw(FUNC(toaplan_dsp_device::dsp_r), FUNC(toaplan_dsp_device::dsp_w))', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 44, sourceColumn: 2, sourceEndLine: 44};
MERGE (n:KG {id: 'handler:toaplan_dsp_device.dsp_r'}) SET n:Handler SET n += {method: 'dsp_r', ownerClass: 'toaplan_dsp_device', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 90, sourceColumn: 1, sourceEndLine: 98, sourceConstants: ['LOG_DSP=2'], sourceParameters: '', sourceBody: '// DSP can read data from main CPU RAM via DSP IO port 1

	const u16 input_data = m_host_r_cb(m_main_ram_seg, m_dsp_addr_w);
	if (!machine().side_effects_disabled())
		LOGMASKED(LOG_DSP, "%s: dsp_r %04x at %08x\\n", machine().describe_context(), input_data, m_main_ram_seg + m_dsp_addr_w);
	return input_data;'};
MERGE (n:KG {id: 'handler:toaplan_dsp_device.dsp_w'}) SET n:Handler SET n += {method: 'dsp_w', ownerClass: 'toaplan_dsp_device', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 100, sourceColumn: 1, sourceEndLine: 106, sourceConstants: ['LOG_DSP=2'], sourceParameters: 'u16 data', sourceBody: '// Data written to main CPU RAM via DSP IO port 1

	m_dsp_execute = m_host_w_cb(m_main_ram_seg, m_dsp_addr_w, data);
	LOGMASKED(LOG_DSP, "%s: dsp_w %04x at %08x\\n", machine().describe_context(), data, m_main_ram_seg + m_dsp_addr_w);'};
MERGE (n:KG {id: 'map:toaplan_dsp_device.io_map/range2'}) SET n:AddressRange SET n += {start: 3, end: 3, raw: 'map(0x3, 0x3).w(FUNC(toaplan_dsp_device::dsp_bio_w))', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 45, sourceColumn: 2, sourceEndLine: 45};
MERGE (n:KG {id: 'handler:toaplan_dsp_device.dsp_bio_w'}) SET n:Handler SET n += {method: 'dsp_bio_w', ownerClass: 'toaplan_dsp_device', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 108, sourceColumn: 1, sourceEndLine: 130, sourceConstants: ['LOG_DSP=2'], sourceParameters: 'u16 data', sourceBody: '// data 0xffff  means inhibit BIO line to DSP and enable
	//              communication to main processor
	//              Actually only DSP data bit 15 controls this
	// data 0x0000  means set DSP BIO line active and disable
	//              communication to main processor

	LOGMASKED(LOG_DSP, "%s: dsp_bio_w %04x\\n", machine().describe_context(), data);
	if (BIT(data, 15))
		m_dsp_bio = CLEAR_LINE;

	if (data == 0)
	{
		if (m_dsp_execute)
		{
			LOGMASKED(LOG_DSP, "Turning the host CPU on\\n");
			m_halt_cb(CLEAR_LINE);
			m_dsp_execute = false;
		}
		m_dsp_bio = ASSERT_LINE;
	}'};
MERGE (n:KG {id: 'machine:wardner_state.wardner'}) SET n:MachineConfig SET n += {cls: 'wardner_state', name: 'wardner', calls: [], stateMembers: ['{"name":"m_fg_rom_bank","bits":32}', '{"name":"m_bg_ram_bank","bits":32}', '{"name":"m_txscrollx","bits":32,"signed":true}', '{"name":"m_txscrolly","bits":32,"signed":true}', '{"name":"m_fgscrollx","bits":32,"signed":true}', '{"name":"m_fgscrolly","bits":32,"signed":true}', '{"name":"m_bgscrollx","bits":32,"signed":true}', '{"name":"m_bgscrolly","bits":32,"signed":true}', '{"name":"m_txoffs","bits":32,"signed":true}', '{"name":"m_fgoffs","bits":32,"signed":true}', '{"name":"m_bgoffs","bits":32,"signed":true}', '{"name":"m_display_on","bits":1}', '{"name":"m_intenable","bits":1}', '{"name":"m_fsharkbt_8741","bits":32,"signed":true}'], resetHandlers: ['twincobr_state.machine_reset'], startHandlers: ['twincobr_state.video_start'], sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 440, sourceColumn: 1, sourceEndLine: 503};
MERGE (n:KG {id: 'handler:twincobr_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_m.cpp', sourceLine: 149, sourceColumn: 1, sourceEndLine: 152, sourceParameters: '', sourceBody: 'm_fsharkbt_8741 = -1;'};
MERGE (n:KG {id: 'handler:twincobr_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 79, sourceColumn: 1, sourceEndLine: 109, sourceParameters: '', sourceBody: '/* the video RAM is accessed via ports, it\'s not memory mapped */
	m_txvideoram_size = 0x0800;
	m_bgvideoram_size = 0x2000; /* banked two times 0x1000 */
	m_fgvideoram_size = 0x1000;

	twincobr_create_tilemaps();

	m_txvideoram16 = make_unique_clear<u16[]>(m_txvideoram_size);
	m_fgvideoram16 = make_unique_clear<u16[]>(m_fgvideoram_size);
	m_bgvideoram16 = make_unique_clear<u16[]>(m_bgvideoram_size);

	m_display_on = false;

	save_pointer(NAME(m_txvideoram16), m_txvideoram_size);
	save_pointer(NAME(m_fgvideoram16), m_fgvideoram_size);
	save_pointer(NAME(m_bgvideoram16), m_bgvideoram_size);
	save_item(NAME(m_txoffs));
	save_item(NAME(m_fgoffs));
	save_item(NAME(m_bgoffs));
	save_item(NAME(m_txscrollx));
	save_item(NAME(m_fgscrollx));
	save_item(NAME(m_bgscrollx));
	save_item(NAME(m_txscrolly));
	save_item(NAME(m_fgscrolly));
	save_item(NAME(m_bgscrolly));
	save_item(NAME(m_display_on));
	save_item(NAME(m_fg_rom_bank));
	save_item(NAME(m_bg_ram_bank));'};
MERGE (n:KG {id: 'handler:twincobr_state.twincobr_create_tilemaps'}) SET n:Handler SET n += {method: 'twincobr_create_tilemaps', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 62, sourceColumn: 1, sourceEndLine: 77, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(twincobr_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8,8, 64,64);
	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(twincobr_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8,8, 64,64);
	m_tx_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(twincobr_state::get_tx_tile_info)), TILEMAP_SCAN_ROWS, 8,8, 64,32);

	m_bg_tilemap->set_scrolldx(-55, -134);
	m_fg_tilemap->set_scrolldx(-55, -134);
	m_tx_tilemap->set_scrolldx(-55, -134);
	m_bg_tilemap->set_scrolldy(-30, -243);
	m_fg_tilemap->set_scrolldy(-30, -243);
	m_tx_tilemap->set_scrolldy(-30, -243);

	m_fg_tilemap->set_transparent_pen(0);
	m_tx_tilemap->set_transparent_pen(0);'};
MERGE (n:KG {id: 'handler:twincobr_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 25, sourceColumn: 1, sourceEndLine: 34, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const u16 code = m_bgvideoram16[tile_index + m_bg_ram_bank];
	const u32 tile_number = code & 0x0fff;
	const u32 color = (code & 0xf000) >> 12;
	tileinfo.set(2,
			tile_number,
			color,
			0);'};
MERGE (n:KG {id: 'handler:twincobr_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 36, sourceColumn: 1, sourceEndLine: 45, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const u16 code = m_fgvideoram16[tile_index];
	const u32 tile_number = (code & 0x0fff) | m_fg_rom_bank;
	const u32 color = (code & 0xf000) >> 12;
	tileinfo.set(1,
			tile_number,
			color,
			0);'};
MERGE (n:KG {id: 'handler:twincobr_state.get_tx_tile_info'}) SET n:Handler SET n += {method: 'get_tx_tile_info', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 47, sourceColumn: 1, sourceEndLine: 56, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const u16 code = m_txvideoram16[tile_index];
	const u32 tile_number = code & 0x07ff;
	const u32 color = (code & 0xf800) >> 11;
	tileinfo.set(0,
			tile_number,
			color,
			0);'};
MERGE (n:KG {id: 'bank:wardner_state.wardner/rombank'}) SET n:MemoryBank SET n += {tag: 'rombank', member: 'm_rombank', startEntry: 0, entries: 8, region: 'maincpu', offset: 0, stride: 32768, raw: 'm_rombank->configure_entries(0, 8, memregion("maincpu")->base(), 0x8000)', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 432, sourceColumn: 1, sourceEndLine: 438};
MERGE (n:KG {id: 'device:wardner_state.wardner/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 6000000, config: ['Z80(config, m_maincpu, XTAL(24\'000\'000) / 4)', 'm_maincpu->set_addrmap(AS_PROGRAM, &wardner_state::main_program_map)', 'm_maincpu->set_addrmap(AS_IO, &wardner_state::main_io_map)'], member: 'm_maincpu', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 443, sourceColumn: 2, sourceEndLine: 443};
MERGE (n:KG {id: 'device:wardner_state.wardner/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3500000, config: ['z80_device &audiocpu(Z80(config, "audiocpu", XTAL(14\'000\'000) / 4))', 'audiocpu.set_addrmap(AS_PROGRAM, &wardner_state::sound_program_map)', 'audiocpu.set_addrmap(AS_IO, &wardner_state::sound_io_map)'], sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447};
MERGE (n:KG {id: 'device:wardner_state.wardner/dsp'}) SET n:Device SET n += {type: 'TOAPLAN_DSP', tag: 'dsp', clock: 14000000, config: ['TOAPLAN_DSP(config, m_dsp, XTAL(14\'000\'000))', 'm_dsp->set_host_addr_callback(FUNC(wardner_state::dsp_host_addr_cb))', 'm_dsp->set_host_read_callback(FUNC(wardner_state::dsp_host_read_cb))', 'm_dsp->set_host_write_callback(FUNC(wardner_state::dsp_host_write_cb))', 'm_dsp->halt_callback().set_inputline(m_maincpu, INPUT_LINE_HALT)'], member: 'm_dsp', cls: 'toaplan_dsp_device', clsHierarchy: ['toaplan_dsp_device'], sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451, startHandler: 'toaplan_dsp_device.device_start'};
MERGE (n:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:0'}) SET n:Callback SET n += {signal: 'set_host_addr_callback', member: 'm_host_addr_cb', delegate: 1, operation: 'set_host_addr_callback', raw: 'm_dsp->set_host_addr_callback(FUNC(wardner_state::dsp_host_addr_cb))', ownerTag: 'dsp', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 452, sourceColumn: 2, sourceEndLine: 452, targetClass: 'wardner_state', targetMethod: 'dsp_host_addr_cb'};
MERGE (n:KG {id: 'handler:wardner_state.dsp_host_addr_cb'}) SET n:Handler SET n += {method: 'dsp_host_addr_cb', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 191, sourceColumn: 1, sourceEndLine: 202, sourceParameters: 'u16 data, u32 &seg, u32 &addr', sourceBody: '/* This sets the main CPU RAM address the DSP should */
	/*  read/write, via the DSP IO port 0 */
	/* Lower twelve bits of this data is shifted left one position */
	/*  to move it to an even address boundary */

	seg  =  (data & 0xe000);
	addr = ((data & 0x07ff) << 1);

	if (seg == 0x6000) seg = 0x7000;'};
MERGE (n:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:1'}) SET n:Callback SET n += {signal: 'set_host_read_callback', member: 'm_host_r_cb', delegate: 1, operation: 'set_host_read_callback', raw: 'm_dsp->set_host_read_callback(FUNC(wardner_state::dsp_host_read_cb))', ownerTag: 'dsp', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 453, sourceColumn: 2, sourceEndLine: 453, targetClass: 'wardner_state', targetMethod: 'dsp_host_read_cb'};
MERGE (n:KG {id: 'handler:wardner_state.dsp_host_read_cb'}) SET n:Handler SET n += {method: 'dsp_host_read_cb', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 204, sourceColumn: 1, sourceEndLine: 224, sourceParameters: 'u32 seg, u32 addr', sourceBody: 'u16 input_data = 0;
	switch (seg)
	{
	case 0x7000:
	case 0x8000:
	case 0xa000:
		{
			address_space &mainspace = m_maincpu->space(AS_PROGRAM);
			input_data =  mainspace.read_byte(seg + (addr + 0))
						| (mainspace.read_byte(seg + (addr + 1)) << 8);
			break;
		}
	default:
		if (!machine().side_effects_disabled())
			logerror("%s: Warning !!! IO reading from %08x (port 1)\\n", machine().describe_context(), seg + addr);
		break;
	}
	return input_data;'};
MERGE (n:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:2'}) SET n:Callback SET n += {signal: 'set_host_write_callback', member: 'm_host_w_cb', delegate: 1, operation: 'set_host_write_callback', raw: 'm_dsp->set_host_write_callback(FUNC(wardner_state::dsp_host_write_cb))', ownerTag: 'dsp', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454, targetClass: 'wardner_state', targetMethod: 'dsp_host_write_cb'};
MERGE (n:KG {id: 'handler:wardner_state.dsp_host_write_cb'}) SET n:Handler SET n += {method: 'dsp_host_write_cb', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 226, sourceColumn: 1, sourceEndLine: 247, sourceParameters: 'u32 seg, u32 addr, u16 data', sourceBody: 'bool execute = false;
	switch (seg)
	{
	case 0x7000:
		if ((addr < 3) && (data == 0)) execute = true;
		[[fallthrough]];
	case 0x8000:
	case 0xa000:
		{
			address_space &mainspace = m_maincpu->space(AS_PROGRAM);
			mainspace.write_byte(seg + (addr + 0), (data & 0xff));
			mainspace.write_byte(seg + (addr + 1), ((data >> 8) & 0xff));
			break;
		}
	default:
		logerror("%s: Warning !!! IO writing to %08x (port 1)\\n", machine().describe_context(), seg + addr);
		break;
	}
	return execute;'};
MERGE (n:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:3'}) SET n:Callback SET n += {signal: 'halt_callback', member: 'm_halt_cb', operation: 'set_inputline', raw: 'm_dsp->halt_callback().set_inputline(m_maincpu, INPUT_LINE_HALT)', ownerTag: 'dsp', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 455, sourceColumn: 2, sourceEndLine: 455, inputLine: 'INPUT_LINE_HALT', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:wardner_state.wardner/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['LS259(config, m_mainlatch)', 'm_mainlatch->q_out_cb<2>().set(FUNC(wardner_state::int_enable_w))', 'm_mainlatch->q_out_cb<3>().set(FUNC(wardner_state::flipscreen_w))', 'm_mainlatch->q_out_cb<4>().set(FUNC(wardner_state::bg_ram_bank_w))', 'm_mainlatch->q_out_cb<5>().set(FUNC(wardner_state::fg_rom_bank_w))', 'm_mainlatch->q_out_cb<6>().set(FUNC(wardner_state::display_on_w))'], member: 'm_mainlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 459, sourceColumn: 2, sourceEndLine: 459};
MERGE (n:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<2>().set(FUNC(wardner_state::int_enable_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 460, sourceColumn: 2, sourceEndLine: 460, slot: '2', targetClass: 'wardner_state', targetMethod: 'int_enable_w'};
MERGE (n:KG {id: 'handler:wardner_state.int_enable_w'}) SET n:Handler SET n += {method: 'int_enable_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 183, sourceColumn: 1, sourceEndLine: 188, sourceParameters: 'int state', sourceBody: 'm_intenable = state;
	if (!state)
		m_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<3>().set(FUNC(wardner_state::flipscreen_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 461, sourceColumn: 2, sourceEndLine: 461, slot: '3', targetClass: 'wardner_state', targetMethod: 'flipscreen_w'};
MERGE (n:KG {id: 'handler:wardner_state.flipscreen_w'}) SET n:Handler SET n += {method: 'flipscreen_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 122, sourceColumn: 1, sourceEndLine: 125, sourceParameters: 'int state', sourceBody: 'machine().tilemap().set_flip_all((state ? (TILEMAP_FLIPY | TILEMAP_FLIPX) : 0));'};
MERGE (n:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<4>().set(FUNC(wardner_state::bg_ram_bank_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 462, sourceColumn: 2, sourceEndLine: 462, slot: '4', targetClass: 'wardner_state', targetMethod: 'bg_ram_bank_w'};
MERGE (n:KG {id: 'handler:wardner_state.bg_ram_bank_w'}) SET n:Handler SET n += {method: 'bg_ram_bank_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 131, sourceParameters: 'int state', sourceBody: 'm_bg_ram_bank = state ? 0x1000 : 0x0000;
	m_bg_tilemap->mark_all_dirty();'};
MERGE (n:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<5>().set(FUNC(wardner_state::fg_rom_bank_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 463, sourceColumn: 2, sourceEndLine: 463, slot: '5', targetClass: 'wardner_state', targetMethod: 'fg_rom_bank_w'};
MERGE (n:KG {id: 'handler:wardner_state.fg_rom_bank_w'}) SET n:Handler SET n += {method: 'fg_rom_bank_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 133, sourceColumn: 1, sourceEndLine: 137, sourceParameters: 'int state', sourceBody: 'm_fg_rom_bank = state ? 0x1000 : 0x0000;
	m_fg_tilemap->mark_all_dirty();'};
MERGE (n:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<6>().set(FUNC(wardner_state::display_on_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 464, sourceColumn: 2, sourceEndLine: 464, slot: '6', targetClass: 'wardner_state', targetMethod: 'display_on_w'};
MERGE (n:KG {id: 'handler:wardner_state.display_on_w'}) SET n:Handler SET n += {method: 'display_on_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 117, sourceColumn: 1, sourceEndLine: 120, sourceParameters: 'int state', sourceBody: 'm_display_on = state;'};
MERGE (n:KG {id: 'device:wardner_state.wardner/coinlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'coinlatch', clock: null, config: ['LS259(config, m_coinlatch)', 'm_coinlatch->q_out_cb<0>().set(m_dsp, FUNC(toaplan_dsp_device::dsp_int_w))', 'm_coinlatch->q_out_cb<4>().set(FUNC(wardner_state::coin_counter_1_w))', 'm_coinlatch->q_out_cb<5>().set(FUNC(wardner_state::coin_counter_2_w))', 'm_coinlatch->q_out_cb<6>().set(FUNC(wardner_state::coin_lockout_1_w))', 'm_coinlatch->q_out_cb<7>().set(FUNC(wardner_state::coin_lockout_2_w))'], member: 'm_coinlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 466, sourceColumn: 2, sourceEndLine: 466};
MERGE (n:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_coinlatch->q_out_cb<0>().set(m_dsp, FUNC(toaplan_dsp_device::dsp_int_w))', ownerTag: 'coinlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 467, sourceColumn: 2, sourceEndLine: 467, slot: '0', targetClass: 'toaplan_dsp_device', targetMethod: 'dsp_int_w', targetTag: 'dsp'};
MERGE (n:KG {id: 'handler:toaplan_dsp_device.dsp_int_w'}) SET n:Handler SET n += {method: 'dsp_int_w', ownerClass: 'toaplan_dsp_device', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 138, sourceColumn: 1, sourceEndLine: 154, sourceConstants: ['LOG_DSP=2'], sourceParameters: 'int enable', sourceBody: 'm_dsp_on = enable;
	if (enable)
	{
		LOGMASKED(LOG_DSP, "Turning DSP on and the host CPU off\\n");
		m_dsp->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);
		m_dsp->set_input_line(0, ASSERT_LINE); /* TMS32010 INT */
		m_halt_cb(ASSERT_LINE);
	}
	else
	{
		LOGMASKED(LOG_DSP, "Turning DSP off\\n");
		m_dsp->set_input_line(0, CLEAR_LINE); /* TMS32010 INT */
		m_dsp->set_input_line(INPUT_LINE_HALT, ASSERT_LINE);
	}'};
MERGE (n:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_coinlatch->q_out_cb<4>().set(FUNC(wardner_state::coin_counter_1_w))', ownerTag: 'coinlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 468, sourceColumn: 2, sourceEndLine: 468, slot: '4', targetClass: 'wardner_state', targetMethod: 'coin_counter_1_w'};
MERGE (n:KG {id: 'handler:wardner_state.coin_counter_1_w'}) SET n:Handler SET n += {method: 'coin_counter_1_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_m.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, state);'};
MERGE (n:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_coinlatch->q_out_cb<5>().set(FUNC(wardner_state::coin_counter_2_w))', ownerTag: 'coinlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 469, sourceColumn: 2, sourceEndLine: 469, slot: '5', targetClass: 'wardner_state', targetMethod: 'coin_counter_2_w'};
MERGE (n:KG {id: 'handler:wardner_state.coin_counter_2_w'}) SET n:Handler SET n += {method: 'coin_counter_2_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_m.cpp', sourceLine: 117, sourceColumn: 1, sourceEndLine: 120, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(1, state);'};
MERGE (n:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_coinlatch->q_out_cb<6>().set(FUNC(wardner_state::coin_lockout_1_w))', ownerTag: 'coinlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 470, sourceColumn: 2, sourceEndLine: 470, slot: '6', targetClass: 'wardner_state', targetMethod: 'coin_lockout_1_w'};
MERGE (n:KG {id: 'handler:wardner_state.coin_lockout_1_w'}) SET n:Handler SET n += {method: 'coin_lockout_1_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_m.cpp', sourceLine: 122, sourceColumn: 1, sourceEndLine: 125, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, !state);'};
MERGE (n:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_coinlatch->q_out_cb<7>().set(FUNC(wardner_state::coin_lockout_2_w))', ownerTag: 'coinlatch', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 471, sourceColumn: 2, sourceEndLine: 471, slot: '7', targetClass: 'wardner_state', targetMethod: 'coin_lockout_2_w'};
MERGE (n:KG {id: 'handler:wardner_state.coin_lockout_2_w'}) SET n:Handler SET n += {method: 'coin_lockout_2_w', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_m.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(1, !state);'};
MERGE (n:KG {id: 'device:wardner_state.wardner/crtc'}) SET n:Device SET n += {type: 'HD6845S', tag: 'crtc', clock: 3500000, config: ['hd6845s_device &crtc(HD6845S(config, "crtc", XTAL(14\'000\'000) / 4))', 'crtc.set_screen(m_screen)', 'crtc.set_show_border_area(false)', 'crtc.set_char_width(2)'], sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 474, sourceColumn: 2, sourceEndLine: 474, configCalls: ['set_screen("screen")', 'set_char_width(2)']};
MERGE (n:KG {id: 'device:wardner_state.wardner/scu'}) SET n:Device SET n += {type: 'TOAPLAN_SCU', tag: 'scu', clock: null, config: ['TOAPLAN_SCU(config, m_spritegen)', 'm_spritegen->set_screen(m_screen)', 'm_spritegen->set_palette(m_palette)', 'm_spritegen->set_xoffsets(32, 14)', 'm_spritegen->set_pri_callback(FUNC(wardner_state::pri_cb))'], member: 'm_spritegen', cls: 'toaplan_scu_device', clsHierarchy: ['toaplan_scu_device'], sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 479, sourceColumn: 2, sourceEndLine: 479, configCalls: ['set_screen("screen")', 'set_palette("palette")', 'set_xoffsets(32,14)']};
MERGE (n:KG {id: 'device:wardner_state.wardner/scu/callback:scu:0'}) SET n:Callback SET n += {signal: 'set_pri_callback', member: 'm_pri_cb', delegate: 1, operation: 'set_pri_callback', raw: 'm_spritegen->set_pri_callback(FUNC(wardner_state::pri_cb))', ownerTag: 'scu', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 483, sourceColumn: 2, sourceEndLine: 483, targetClass: 'wardner_state', targetMethod: 'pri_cb'};
MERGE (n:KG {id: 'handler:wardner_state.pri_cb'}) SET n:Handler SET n += {method: 'pri_cb', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 363, sourceColumn: 1, sourceEndLine: 372, sourceParameters: 'u8 priority, u32 &pri_mask', sourceBody: 'switch (priority)
	{
		case 0: pri_mask = GFX_PMASK_1|GFX_PMASK_2|GFX_PMASK_4; break; // disable?
		case 1: pri_mask = GFX_PMASK_2|GFX_PMASK_4;             break; // over background, under foreground/text
		case 2: pri_mask = GFX_PMASK_4;                         break; // over background/foreground, under text
		case 3: pri_mask = 0;                                   break; // over everything
	}'};
MERGE (n:KG {id: 'device:wardner_state.wardner/spriteram8'}) SET n:Device SET n += {type: 'BUFFERED_SPRITERAM8', tag: 'spriteram8', clock: null, config: ['BUFFERED_SPRITERAM8(config, m_spriteram8)'], member: 'm_spriteram8', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 485, sourceColumn: 2, sourceEndLine: 485};
MERGE (n:KG {id: 'device:wardner_state.wardner/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_video_attributes(VIDEO_UPDATE_BEFORE_VBLANK)', 'm_screen->set_raw(14_MHz_XTAL/2, 446, 0, 320, 286, 0, 240)', 'm_screen->set_screen_update(FUNC(wardner_state::screen_update))', 'm_screen->screen_vblank().set(m_spriteram8, FUNC(buffered_spriteram8_device::vblank_copy_rising))', 'm_screen->screen_vblank().append(FUNC(wardner_state::wardner_vblank_irq))'], member: 'm_screen', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 487, sourceColumn: 2, sourceEndLine: 487, configCalls: ['set_raw(7000000,446,0,320,286,0,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [7000000, 446, 0, 320, 286, 0, 240], screenRawExpr: ['14_MHz_XTAL/2', '446', '0', '320', '286', '0', '240'], screenVideoAttributes: ['VIDEO_UPDATE_BEFORE_VBLANK']};
MERGE (n:KG {id: 'device:wardner_state.wardner/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(wardner_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 490, sourceColumn: 2, sourceEndLine: 490, targetClass: 'wardner_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:wardner_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 375, sourceColumn: 1, sourceEndLine: 407, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'log_vram();

	if (!m_display_on)
	{
		bitmap.fill(rgb_t::black(), cliprect);
	}
	else
	{
		screen.priority().fill(0, cliprect);

		u16 *buffered_spriteram16;
		u32 bytes;
		if (m_spriteram16 != nullptr)
		{
			buffered_spriteram16 = m_spriteram16->buffer();
			bytes = m_spriteram16->bytes();
		}
		else
		{
			buffered_spriteram16 = reinterpret_cast<u16 *>(m_spriteram8->buffer());
			bytes = m_spriteram8->bytes();
		}

		m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_OPAQUE,1);
		m_fg_tilemap->draw(screen, bitmap, cliprect, 0,2);
		m_tx_tilemap->draw(screen, bitmap, cliprect, 0,4);
		m_spritegen->draw_sprites(bitmap, cliprect, buffered_spriteram16, bytes);
	}

	return 0;'};
MERGE (n:KG {id: 'handler:twincobr_state.log_vram'}) SET n:Handler SET n += {method: 'log_vram', ownerClass: 'twincobr_state', sourceFile: 'src/mame/toaplan/twincobr_v.cpp', sourceLine: 325, sourceColumn: 1, sourceEndLine: 360, sourceParameters: '', sourceBody: '#if 0
	if (machine().input().code_pressed(KEYCODE_M))
	{
		int tcode[4]{};
		while (machine().input().code_pressed(KEYCODE_M)) ;
		logerror("Scrolls             BG-X BG-Y  FG-X FG-Y  TX-X  TX-Y\\n");
		logerror("------>             %04x %04x  %04x %04x  %04x  %04x\\n",m_bgscrollx,m_bgscrolly,m_fgscrollx,m_fgscrolly,m_txscrollx,m_txscrolly);
		for (offs_t tile_voffs = 0; tile_voffs < (m_txvideoram_size / 2); tile_voffs++)
		{
			tcode[1] = m_bgvideoram16[tile_voffs];
			tcode[2] = m_fgvideoram16[tile_voffs];
			tcode[3] = m_txvideoram16[tile_voffs];
			logerror("$(%04x)  (Col-Tile) BG1:%01x-%03x  FG1:%01x-%03x  TX1:%02x-%03x\\n", tile_voffs,
							tcode[1] & 0xf000 >> 12, tcode[1] & 0x0fff,
							tcode[2] & 0xf000 >> 12, tcode[2] & 0x0fff,
							tcode[3] & 0xf800 >> 11, tcode[3] & 0x07ff);
		}
		for (offs_t tile_voffs = (m_txvideoram_size / 2); tile_voffs < (m_fgvideoram_size / 2); tile_voffs++)
		{
			tcode[1] = m_bgvideoram16[tile_voffs];
			tcode[2] = m_fgvideoram16[tile_voffs];
			logerror("$(%04x)  (Col-Tile) BG1:%01x-%03x  FG1:%01x-%03x\\n", tile_voffs,
							tcode[1] & 0xf000 >> 12, tcode[1] & 0x0fff,
							tcode[2] & 0xf000 >> 12, tcode[2] & 0x0fff);
		}
		for (offs_t tile_voffs = (m_fgvideoram_size / 2); tile_voffs < (m_bgvideoram_size / 2); tile_voffs++)
		{
			tcode[1] = m_bgvideoram16[tile_voffs];
			logerror("$(%04x)  (Col-Tile) BG1:%01x-%03x\\n", tile_voffs,
							tcode[1] & 0xf000 >> 12, tcode[1] & 0x0fff);
		}
	}
#endif'};
MERGE (n:KG {id: 'device:wardner_state.wardner/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(m_spriteram8, FUNC(buffered_spriteram8_device::vblank_copy_rising))', ownerTag: 'screen', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 491, sourceColumn: 2, sourceEndLine: 491, targetClass: 'buffered_spriteram8_device', targetMethod: 'vblank_copy_rising', targetTag: 'spriteram8'};
MERGE (n:KG {id: 'handler:buffered_spriteram8_device.vblank_copy_rising'}) SET n:Handler SET n += {method: 'vblank_copy_rising', ownerClass: 'buffered_spriteram8_device', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 491, sourceColumn: 2, sourceEndLine: 491};
MERGE (n:KG {id: 'device:wardner_state.wardner/screen/callback:screen:2'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'append', raw: 'm_screen->screen_vblank().append(FUNC(wardner_state::wardner_vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 492, sourceColumn: 2, sourceEndLine: 492, targetClass: 'wardner_state', targetMethod: 'wardner_vblank_irq'};
MERGE (n:KG {id: 'handler:wardner_state.wardner_vblank_irq'}) SET n:Handler SET n += {method: 'wardner_vblank_irq', ownerClass: 'wardner_state', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 177, sourceColumn: 1, sourceEndLine: 181, sourceParameters: 'int state', sourceBody: 'if (state && m_intenable)
		m_maincpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:wardner_state.wardner/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_wardner)'], member: 'm_gfxdecode', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 494, sourceColumn: 2, sourceEndLine: 494, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:wardner_state.wardner/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(palette_device::xBGR_555, 0x1000 / 2)'], member: 'm_palette', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 495, sourceColumn: 2, sourceEndLine: 495, paletteEntries: 2048};
MERGE (n:KG {id: 'device:wardner_state.wardner/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 498, sourceColumn: 2, sourceEndLine: 498};
MERGE (n:KG {id: 'device:wardner_state.wardner/ymsnd'}) SET n:Device SET n += {type: 'YM3812', tag: 'ymsnd', clock: 3500000, config: ['ym3812_device &ymsnd(YM3812(config, "ymsnd", XTAL(14\'000\'000) / 4))', 'ymsnd.irq_handler().set_inputline("audiocpu", 0)', 'ymsnd.add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 500, sourceColumn: 2, sourceEndLine: 500};
MERGE (n:KG {id: 'audioroute:device:wardner_state.wardner/ymsnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'ymsnd.add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 502, sourceColumn: 2, sourceEndLine: 502};
MERGE (n:KG {id: 'device:wardner_state.wardner/ymsnd/callback:ymsnd:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set_inputline', raw: 'ymsnd.irq_handler().set_inputline("audiocpu", 0)', ownerTag: 'ymsnd', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 501, sourceColumn: 2, sourceEndLine: 501, targetTag: 'audiocpu', inputLine: '0'};
MERGE (n:KG {id: 'machine:toaplan_dsp_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'toaplan_dsp_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_dsp_on","bits":32,"signed":true}', '{"name":"m_dsp_bio","bits":32,"signed":true}', '{"name":"m_dsp_execute","bits":1}', '{"name":"m_dsp_addr_w","bits":32}', '{"name":"m_main_ram_seg","bits":32}'], sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 49, sourceColumn: 1, sourceEndLine: 55};
MERGE (n:KG {id: 'device:toaplan_dsp_device.device_add_mconfig/dsp'}) SET n:Device SET n += {type: 'TMS320C10', tag: 'dsp', clock: 14000000, config: ['TMS320C10(config, m_dsp, DERIVED_CLOCK(1, 1))', 'm_dsp->set_addrmap(AS_PROGRAM, &toaplan_dsp_device::program_map)', 'm_dsp->set_addrmap(AS_IO, &toaplan_dsp_device::io_map)', 'm_dsp->bio().set(FUNC(toaplan_dsp_device::bio_r))'], member: 'm_dsp', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 51, sourceColumn: 2, sourceEndLine: 51};
MERGE (n:KG {id: 'device:toaplan_dsp_device.device_add_mconfig/dsp/callback:dsp:0'}) SET n:Callback SET n += {signal: 'bio', operation: 'set', raw: 'm_dsp->bio().set(FUNC(toaplan_dsp_device::bio_r))', ownerTag: 'dsp', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 54, sourceColumn: 2, sourceEndLine: 54, targetClass: 'toaplan_dsp_device', targetMethod: 'bio_r'};
MERGE (n:KG {id: 'handler:toaplan_dsp_device.bio_r'}) SET n:Handler SET n += {method: 'bio_r', ownerClass: 'toaplan_dsp_device', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 132, sourceColumn: 1, sourceEndLine: 135, sourceParameters: '', sourceBody: 'return m_dsp_bio;'};
MERGE (n:KG {id: 'handler:toaplan_dsp_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'toaplan_dsp_device', sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 57, sourceColumn: 1, sourceEndLine: 68, sourceParameters: '', sourceBody: 'm_host_addr_cb.resolve_safe();
	m_host_r_cb.resolve_safe(0);
	m_host_w_cb.resolve_safe(true);

	save_item(NAME(m_dsp_on));
	save_item(NAME(m_dsp_addr_w));
	save_item(NAME(m_main_ram_seg));
	save_item(NAME(m_dsp_bio));
	save_item(NAME(m_dsp_execute));'};
MERGE (n:KG {id: 'inputs:wardner_generic'}) SET n:InputPorts SET n += {name: 'wardner_generic', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 319, sourceColumn: 8, sourceEndLine: 319};
MERGE (n:KG {id: 'inputs:wardner_generic/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:wardner_generic/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:wardner_generic/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:wardner_generic/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_SERVICE1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_TILT', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Test Switch")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_COIN1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_COIN2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_START1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_START2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: false};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION(#SW1":!1")'], name: 'Cabinet', defaultValue: 1, location: '#SW1":!1"', settings: ['1=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION(#SW1":!2")'], name: 'Flip Screen', defaultValue: 0, location: '#SW1":!2"', settings: ['0=Off', '2=On']};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWA/f2'}) SET n:PortField SET n += {kind: 'service', mask: 4, activeLow: false, defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWA/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION(#SW1":!4")'], name: 'Demo Sounds', defaultValue: 0, location: '#SW1":!4"', settings: ['8=Off', '0=On']};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWA/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION(#SW1":!5,!6")'], name: 'Coin A', defaultValue: 0, location: '#SW1":!5,!6"', settings: ['48=4C 1C', '32=3C 1C', '16=2C 1C', '0=1C 1C']};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWA/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_DIPLOCATION(#SW1":!7,!8")'], name: 'Coin B', defaultValue: 0, location: '#SW1":!7,!8"', settings: ['0=1C 2C', '64=1C 3C', '128=1C 4C', '192=1C 6C']};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: false};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION(#SW2":!1,!2")'], name: 'Difficulty', defaultValue: 0, location: '#SW2":!1,!2"', settings: ['1=Easy', '0=Normal', '2=Hard', '3=Very Hard']};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW2:!3,!4")'], name: 'Bonus Life', defaultValue: 0, location: 'SW2:!3,!4', settings: ['0=30k 80k 50k+', '4=50k 100k 50k+', '8=30k Only', '12=50k Only']};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW2:!5,!6")'], name: 'Lives', defaultValue: 0, location: 'SW2:!5,!6', settings: ['48=1', '0=3', '16=4', '32=5']};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner_generic/DSWB/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:wardner'}) SET n:InputPorts SET n += {name: 'wardner', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 368, sourceColumn: 8, sourceEndLine: 368};
MERGE (n:KG {id: 'inputs:wardner/P1'}) SET n:Port SET n += {tag: 'P1', modify: true};
MERGE (n:KG {id: 'inputs:wardner/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Skip Video RAM Tests")', 'PORT_CODE(KEYCODE_0)'], defaultValue: 0};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(0,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(2,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:tilelayout'}) SET n:GfxLayout SET n += {name: 'tilelayout', width: 8, height: 8, total: 'RGN_FRAC(1,4)', planes: 4, planeOffsets: ['RGN_FRAC(0,4)', 'RGN_FRAC(1,4)', 'RGN_FRAC(2,4)', 'RGN_FRAC(3,4)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_wardner'}) SET n:GfxDecode SET n += {name: 'gfx_wardner', sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 425, sourceColumn: 8, sourceEndLine: 425};
MERGE (n:KG {id: 'gfxdecode:gfx_wardner/e0'}) SET n:GfxDecodeEntry SET n += {region: 'chars', offset: 0, layout: 'charlayout', colorBase: 1536, colorCount: 32, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_wardner/e1'}) SET n:GfxDecodeEntry SET n += {region: 'fg_tiles', offset: 0, layout: 'tilelayout', colorBase: 1280, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_wardner/e2'}) SET n:GfxDecodeEntry SET n += {region: 'bg_tiles', offset: 0, layout: 'tilelayout', colorBase: 1024, colorCount: 16, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:wardner'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 756, sourceColumn: 1, sourceEndLine: 756};
MATCH (a:KG {id: 'game:wardner'}), (b:KG {id: 'machine:wardner_state.wardner'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:wardner'}), (b:KG {id: 'inputs:wardner'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:wardner'}), (b:KG {id: 'romset:wardner'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/wardner.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/wardner.cpp'}), (b:KG {id: 'file:twincobr.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/wardner.cpp'}), (b:KG {id: 'file:toaplipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/wardner.cpp'}), (b:KG {id: 'file:cpu/tms320c1x/tms320c1x.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/wardner.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/wardner.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/wardner.cpp'}), (b:KG {id: 'file:sound/ymopl.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/wardner.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 440, sourceColumn: 1, sourceEndLine: 503};
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'handler:twincobr_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'handler:twincobr_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'bank:wardner_state.wardner/rombank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/dsp'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/coinlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/crtc'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/scu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/spriteram8'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'gfxdecode:gfx_wardner'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:wardner_state.wardner'}), (b:KG {id: 'device:wardner_state.wardner/ymsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:wardner'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 368, sourceColumn: 8, sourceEndLine: 368};
MATCH (a:KG {id: 'inputs:wardner'}), (b:KG {id: 'inputs:wardner_generic'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:wardner'}), (b:KG {id: 'inputs:wardner/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:wardner'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 513, sourceColumn: 1, sourceEndLine: 513};
MATCH (a:KG {id: 'romset:wardner'}), (b:KG {id: 'region:wardner/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wardner'}), (b:KG {id: 'region:wardner/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wardner'}), (b:KG {id: 'region:wardner/dsp:dsp'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wardner'}), (b:KG {id: 'region:wardner/chars'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wardner'}), (b:KG {id: 'region:wardner/fg_tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wardner'}), (b:KG {id: 'region:wardner/bg_tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wardner'}), (b:KG {id: 'region:wardner/scu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wardner'}), (b:KG {id: 'region:wardner/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:twincobr_state.video_start'}), (b:KG {id: 'handler:twincobr_state.twincobr_create_tilemaps'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:wardner_state.wardner/rombank'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 432, sourceColumn: 1, sourceEndLine: 438};
MATCH (a:KG {id: 'device:wardner_state.wardner/maincpu'}), (b:KG {id: 'map:wardner_state.main_program_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:wardner_state.wardner/maincpu'}), (b:KG {id: 'map:wardner_state.main_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:wardner_state.wardner/audiocpu'}), (b:KG {id: 'map:wardner_state.sound_program_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:wardner_state.wardner/audiocpu'}), (b:KG {id: 'map:wardner_state.sound_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp'}), (b:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp'}), (b:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp'}), (b:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp'}), (b:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp'}), (b:KG {id: 'machine:toaplan_dsp_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp'}), (b:KG {id: 'handler:toaplan_dsp_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch'}), (b:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch'}), (b:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch'}), (b:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch'}), (b:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch'}), (b:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch'}), (b:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch'}), (b:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch'}), (b:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch'}), (b:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch'}), (b:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/scu'}), (b:KG {id: 'device:wardner_state.wardner/scu/callback:scu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/screen'}), (b:KG {id: 'device:wardner_state.wardner/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/screen'}), (b:KG {id: 'device:wardner_state.wardner/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/screen'}), (b:KG {id: 'device:wardner_state.wardner/screen/callback:screen:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_wardner'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 425, sourceColumn: 8, sourceEndLine: 425};
MATCH (a:KG {id: 'gfxdecode:gfx_wardner'}), (b:KG {id: 'gfxdecode:gfx_wardner/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_wardner'}), (b:KG {id: 'gfxdecode:gfx_wardner/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_wardner'}), (b:KG {id: 'gfxdecode:gfx_wardner/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/ymsnd'}), (b:KG {id: 'audioroute:device:wardner_state.wardner/ymsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/ymsnd'}), (b:KG {id: 'device:wardner_state.wardner/ymsnd/callback:ymsnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 319, sourceColumn: 8, sourceEndLine: 319};
MATCH (a:KG {id: 'inputs:wardner_generic'}), (b:KG {id: 'inputs:wardner_generic/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic'}), (b:KG {id: 'inputs:wardner_generic/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic'}), (b:KG {id: 'inputs:wardner_generic/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic'}), (b:KG {id: 'inputs:wardner_generic/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic'}), (b:KG {id: 'inputs:wardner_generic/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:wardner/P1'}), (b:KG {id: 'inputs:wardner/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:wardner/maincpu'}), (b:KG {id: 'rom:wardner/maincpu/b25-31.6m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/maincpu'}), (b:KG {id: 'rom:wardner/maincpu/b25-18.7m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/maincpu'}), (b:KG {id: 'rom:wardner/maincpu/b25-19.8m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/maincpu'}), (b:KG {id: 'rom:wardner/maincpu/b25-32.10m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/audiocpu'}), (b:KG {id: 'rom:wardner/audiocpu/b25-16.4k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/dsp:dsp'}), (b:KG {id: 'rom:wardner/dsp:dsp/d70012u_gxc-02_mcu_71001'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/chars'}), (b:KG {id: 'rom:wardner/chars/b25-28.10f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/chars'}), (b:KG {id: 'rom:wardner/chars/b25-27.8f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/chars'}), (b:KG {id: 'rom:wardner/chars/b25-26.7f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/fg_tiles'}), (b:KG {id: 'rom:wardner/fg_tiles/b25-12.18f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/fg_tiles'}), (b:KG {id: 'rom:wardner/fg_tiles/b25-15.23f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/fg_tiles'}), (b:KG {id: 'rom:wardner/fg_tiles/b25-14.21f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/fg_tiles'}), (b:KG {id: 'rom:wardner/fg_tiles/b25-13.19f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/bg_tiles'}), (b:KG {id: 'rom:wardner/bg_tiles/b25-08.12f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/bg_tiles'}), (b:KG {id: 'rom:wardner/bg_tiles/b25-11.16f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/bg_tiles'}), (b:KG {id: 'rom:wardner/bg_tiles/b25-10.15f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/bg_tiles'}), (b:KG {id: 'rom:wardner/bg_tiles/b25-09.14f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/scu'}), (b:KG {id: 'rom:wardner/scu/b25-01.14c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/scu'}), (b:KG {id: 'rom:wardner/scu/b25-02.16c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/scu'}), (b:KG {id: 'rom:wardner/scu/b25-03.17c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/scu'}), (b:KG {id: 'rom:wardner/scu/b25-04.19c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/proms'}), (b:KG {id: 'rom:wardner/proms/82s129.b19'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/proms'}), (b:KG {id: 'rom:wardner/proms/82s129.b18'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/proms'}), (b:KG {id: 'rom:wardner/proms/82s123.b21'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/proms'}), (b:KG {id: 'rom:wardner/proms/82s123.c6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wardner/proms'}), (b:KG {id: 'rom:wardner/proms/82s123.f1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:twincobr_state.twincobr_create_tilemaps'}), (b:KG {id: 'handler:twincobr_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:twincobr_state.twincobr_create_tilemaps'}), (b:KG {id: 'handler:twincobr_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:twincobr_state.twincobr_create_tilemaps'}), (b:KG {id: 'handler:twincobr_state.get_tx_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 257, sourceColumn: 1, sourceEndLine: 269};
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map'}), (b:KG {id: 'map:wardner_state.main_program_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 271, sourceColumn: 1, sourceEndLine: 292};
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map'}), (b:KG {id: 'map:wardner_state.main_io_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.sound_program_map'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 297, sourceColumn: 1, sourceEndLine: 303};
MATCH (a:KG {id: 'map:wardner_state.sound_program_map'}), (b:KG {id: 'map:wardner_state.sound_program_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.sound_program_map'}), (b:KG {id: 'map:wardner_state.sound_program_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.sound_program_map'}), (b:KG {id: 'map:wardner_state.sound_program_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.sound_program_map'}), (b:KG {id: 'map:wardner_state.sound_program_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:wardner_state.sound_io_map'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/wardner.cpp', sourceLine: 305, sourceColumn: 1, sourceEndLine: 309};
MATCH (a:KG {id: 'map:wardner_state.sound_io_map'}), (b:KG {id: 'map:wardner_state.sound_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:0'}), (b:KG {id: 'handler:wardner_state.dsp_host_addr_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:1'}), (b:KG {id: 'handler:wardner_state.dsp_host_read_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:2'}), (b:KG {id: 'handler:wardner_state.dsp_host_write_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/dsp/callback:dsp:3'}), (b:KG {id: 'device:wardner_state.wardner/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:toaplan_dsp_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/toaplan/toaplan_dsp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 49, sourceColumn: 1, sourceEndLine: 55};
MATCH (a:KG {id: 'machine:toaplan_dsp_device.device_add_mconfig'}), (b:KG {id: 'device:toaplan_dsp_device.device_add_mconfig/dsp'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:wardner_state.int_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:1'}), (b:KG {id: 'handler:wardner_state.flipscreen_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:2'}), (b:KG {id: 'handler:wardner_state.bg_ram_bank_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:3'}), (b:KG {id: 'handler:wardner_state.fg_rom_bank_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/mainlatch/callback:mainlatch:4'}), (b:KG {id: 'handler:wardner_state.display_on_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:0'}), (b:KG {id: 'handler:toaplan_dsp_device.dsp_int_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:0'}), (b:KG {id: 'device:wardner_state.wardner/dsp'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:1'}), (b:KG {id: 'handler:wardner_state.coin_counter_1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:2'}), (b:KG {id: 'handler:wardner_state.coin_counter_2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:3'}), (b:KG {id: 'handler:wardner_state.coin_lockout_1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/coinlatch/callback:coinlatch:4'}), (b:KG {id: 'handler:wardner_state.coin_lockout_2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/scu/callback:scu:0'}), (b:KG {id: 'handler:wardner_state.pri_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/screen/callback:screen:0'}), (b:KG {id: 'handler:wardner_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/screen/callback:screen:1'}), (b:KG {id: 'handler:buffered_spriteram8_device.vblank_copy_rising'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/screen/callback:screen:1'}), (b:KG {id: 'device:wardner_state.wardner/spriteram8'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/screen/callback:screen:2'}), (b:KG {id: 'handler:wardner_state.wardner_vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_wardner/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_wardner/e1'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_wardner/e2'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:wardner_state.wardner/ymsnd/callback:ymsnd:0'}), (b:KG {id: 'device:wardner_state.wardner/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P1'}), (b:KG {id: 'inputs:wardner_generic/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P1'}), (b:KG {id: 'inputs:wardner_generic/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P1'}), (b:KG {id: 'inputs:wardner_generic/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P1'}), (b:KG {id: 'inputs:wardner_generic/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P1'}), (b:KG {id: 'inputs:wardner_generic/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P1'}), (b:KG {id: 'inputs:wardner_generic/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P1'}), (b:KG {id: 'inputs:wardner_generic/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P2'}), (b:KG {id: 'inputs:wardner_generic/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P2'}), (b:KG {id: 'inputs:wardner_generic/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P2'}), (b:KG {id: 'inputs:wardner_generic/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P2'}), (b:KG {id: 'inputs:wardner_generic/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P2'}), (b:KG {id: 'inputs:wardner_generic/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P2'}), (b:KG {id: 'inputs:wardner_generic/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/P2'}), (b:KG {id: 'inputs:wardner_generic/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/SYSTEM'}), (b:KG {id: 'inputs:wardner_generic/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/SYSTEM'}), (b:KG {id: 'inputs:wardner_generic/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/SYSTEM'}), (b:KG {id: 'inputs:wardner_generic/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/SYSTEM'}), (b:KG {id: 'inputs:wardner_generic/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/SYSTEM'}), (b:KG {id: 'inputs:wardner_generic/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/SYSTEM'}), (b:KG {id: 'inputs:wardner_generic/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/SYSTEM'}), (b:KG {id: 'inputs:wardner_generic/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/SYSTEM'}), (b:KG {id: 'inputs:wardner_generic/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWA'}), (b:KG {id: 'inputs:wardner_generic/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWA'}), (b:KG {id: 'inputs:wardner_generic/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWA'}), (b:KG {id: 'inputs:wardner_generic/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWA'}), (b:KG {id: 'inputs:wardner_generic/DSWA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWA'}), (b:KG {id: 'inputs:wardner_generic/DSWA/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWA'}), (b:KG {id: 'inputs:wardner_generic/DSWA/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWB'}), (b:KG {id: 'inputs:wardner_generic/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWB'}), (b:KG {id: 'inputs:wardner_generic/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWB'}), (b:KG {id: 'inputs:wardner_generic/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWB'}), (b:KG {id: 'inputs:wardner_generic/DSWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wardner_generic/DSWB'}), (b:KG {id: 'inputs:wardner_generic/DSWB/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map/range2'}), (b:KG {id: 'handler:wardner_state.wardner_sprite_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_program_map/range3'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:wardner_state.main_program_map/range6'}), (b:KG {id: 'handler:wardner_state.wardner_sprite_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range0'}), (b:KG {id: 'handler:mc6845_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'crtc'};
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range1'}), (b:KG {id: 'handler:mc6845_device.register_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'crtc'};
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range2'}), (b:KG {id: 'handler:wardner_state.wardner_txscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range3'}), (b:KG {id: 'handler:wardner_state.wardner_txlayer_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range4'}), (b:KG {id: 'handler:wardner_state.wardner_bgscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range5'}), (b:KG {id: 'handler:wardner_state.wardner_bglayer_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range6'}), (b:KG {id: 'handler:wardner_state.wardner_fgscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range7'}), (b:KG {id: 'handler:wardner_state.wardner_fglayer_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range8'}), (b:KG {id: 'handler:wardner_state.wardner_exscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range14'}), (b:KG {id: 'handler:ls259_device.write_nibble_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'coinlatch'};
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range15'}), (b:KG {id: 'handler:ls259_device.write_nibble_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range16'}), (b:KG {id: 'handler:wardner_state.wardner_videoram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range16'}), (b:KG {id: 'handler:wardner_state.wardner_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.main_io_map/range17'}), (b:KG {id: 'handler:wardner_state.wardner_bank_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:wardner_state.sound_io_map/range0'}), (b:KG {id: 'handler:ym3812_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:wardner_state.sound_io_map/range0'}), (b:KG {id: 'handler:ym3812_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'file:src/mame/toaplan/toaplan_dsp.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/toaplan_dsp.cpp'}), (b:KG {id: 'file:toaplan_dsp.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/toaplan/toaplan_dsp.cpp'}), (b:KG {id: 'file:logmacro.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:toaplan_dsp_device.device_add_mconfig/dsp'}), (b:KG {id: 'device:toaplan_dsp_device.device_add_mconfig/dsp/callback:dsp:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:toaplan_dsp_device.device_add_mconfig/dsp'}), (b:KG {id: 'map:toaplan_dsp_device.program_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:toaplan_dsp_device.device_add_mconfig/dsp'}), (b:KG {id: 'map:toaplan_dsp_device.io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'handler:wardner_state.screen_update'}), (b:KG {id: 'handler:twincobr_state.log_vram'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:tilelayout'}), (b:KG {id: 'file:src/mame/toaplan/wardner.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_txscroll_w'}), (b:KG {id: 'handler:twincobr_state.twincobr_txscroll_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_txlayer_w'}), (b:KG {id: 'handler:twincobr_state.twincobr_txoffs_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_bgscroll_w'}), (b:KG {id: 'handler:twincobr_state.twincobr_bgscroll_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_bglayer_w'}), (b:KG {id: 'handler:twincobr_state.twincobr_bgoffs_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_fgscroll_w'}), (b:KG {id: 'handler:twincobr_state.twincobr_fgscroll_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_fglayer_w'}), (b:KG {id: 'handler:twincobr_state.twincobr_fgoffs_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_videoram_r'}), (b:KG {id: 'handler:twincobr_state.twincobr_txram_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_videoram_r'}), (b:KG {id: 'handler:twincobr_state.twincobr_bgram_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_videoram_r'}), (b:KG {id: 'handler:twincobr_state.twincobr_fgram_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_videoram_w'}), (b:KG {id: 'handler:twincobr_state.twincobr_txram_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_videoram_w'}), (b:KG {id: 'handler:twincobr_state.twincobr_bgram_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:wardner_state.wardner_videoram_w'}), (b:KG {id: 'handler:twincobr_state.twincobr_fgram_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:toaplan_dsp_device.device_add_mconfig/dsp/callback:dsp:0'}), (b:KG {id: 'handler:toaplan_dsp_device.bio_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:toaplan_dsp_device.program_map'}), (b:KG {id: 'file:src/mame/toaplan/toaplan_dsp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 32, sourceColumn: 1, sourceEndLine: 37};
MATCH (a:KG {id: 'map:toaplan_dsp_device.program_map'}), (b:KG {id: 'map:toaplan_dsp_device.program_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:toaplan_dsp_device.io_map'}), (b:KG {id: 'file:src/mame/toaplan/toaplan_dsp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/toaplan/toaplan_dsp.cpp', sourceLine: 41, sourceColumn: 1, sourceEndLine: 46};
MATCH (a:KG {id: 'map:toaplan_dsp_device.io_map'}), (b:KG {id: 'map:toaplan_dsp_device.io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:toaplan_dsp_device.io_map'}), (b:KG {id: 'map:toaplan_dsp_device.io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:toaplan_dsp_device.io_map'}), (b:KG {id: 'map:toaplan_dsp_device.io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:toaplan_dsp_device.io_map/range0'}), (b:KG {id: 'handler:toaplan_dsp_device.dsp_addrsel_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:toaplan_dsp_device.io_map/range1'}), (b:KG {id: 'handler:toaplan_dsp_device.dsp_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:toaplan_dsp_device.io_map/range1'}), (b:KG {id: 'handler:toaplan_dsp_device.dsp_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:toaplan_dsp_device.io_map/range2'}), (b:KG {id: 'handler:toaplan_dsp_device.dsp_bio_w'}) MERGE (a)-[r:WRITES]->(b);
