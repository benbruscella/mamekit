// mamekit knowledge graph — driver src/mame/tecmo/bombjack.cpp
// generated 2026-09-24T02:25:49.999Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/tecmo/bombjack.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/segacrp2_device.h'}) SET n:SourceFile SET n += {path: 'machine/segacrp2_device.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'game:bombjack'}) SET n:Game SET n += {name: 'bombjack', year: '1984', company: 'Tehkan', fullname: 'Bomb Jack', monitor: 'ROT90', cls: 'bombjack_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 1084, sourceColumn: 1, sourceEndLine: 1084};
MERGE (n:KG {id: 'romset:bombjack'}) SET n:RomSet SET n += {name: 'bombjack', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 819, sourceColumn: 1, sourceEndLine: 819};
MERGE (n:KG {id: 'region:bombjack/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 820, sourceColumn: 2, sourceEndLine: 820};
MERGE (n:KG {id: 'rom:bombjack/maincpu/09_j01b.bin'}) SET n:Rom SET n += {file: '09_j01b.bin', offset: 0, size: 8192, crc: 'c668dc30', sha1: '51dd6a2688b42e9f28f0882bd76f75be7ec3222a', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 821, sourceColumn: 2, sourceEndLine: 821};
MERGE (n:KG {id: 'rom:bombjack/maincpu/10_l01b.bin'}) SET n:Rom SET n += {file: '10_l01b.bin', offset: 8192, size: 8192, crc: '52a1e5fb', sha1: 'e1cdc4b4efbc6c7a1e4fa65019486617f2acba1b', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 822, sourceColumn: 2, sourceEndLine: 822};
MERGE (n:KG {id: 'rom:bombjack/maincpu/11_m01b.bin'}) SET n:Rom SET n += {file: '11_m01b.bin', offset: 16384, size: 8192, crc: 'b68a062a', sha1: '43bae56494ac0202aaa8f1ed5c1ed1bff775b2b8', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 823, sourceColumn: 2, sourceEndLine: 823};
MERGE (n:KG {id: 'rom:bombjack/maincpu/12_n01b.bin'}) SET n:Rom SET n += {file: '12_n01b.bin', offset: 24576, size: 8192, crc: '1d3ecee5', sha1: '8b3c49e21ea4952cae7042890d1be2115f7d6fda', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 824, sourceColumn: 2, sourceEndLine: 824};
MERGE (n:KG {id: 'rom:bombjack/maincpu/13.1r'}) SET n:Rom SET n += {file: '13.1r', offset: 49152, size: 8192, crc: '70e0244d', sha1: '67654155e42821ea78a655f869fb81c8d6387f63', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 825, sourceColumn: 2, sourceEndLine: 825};
MERGE (n:KG {id: 'region:bombjack/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 16384, flags: '0', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 827, sourceColumn: 2, sourceEndLine: 827};
MERGE (n:KG {id: 'rom:bombjack/audiocpu/01_h03t.3h'}) SET n:Rom SET n += {file: '01_h03t.3h', offset: 0, size: 8192, crc: '8407917d', sha1: '318face9f7a7ab6c7eeac773995040425e780aaf', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 828, sourceColumn: 2, sourceEndLine: 828};
MERGE (n:KG {id: 'region:bombjack/fgtiles'}) SET n:RomRegion SET n += {tag: 'fgtiles', size: 12288, flags: '0', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 831, sourceColumn: 2, sourceEndLine: 831};
MERGE (n:KG {id: 'rom:bombjack/fgtiles/03_e08t.bin'}) SET n:Rom SET n += {file: '03_e08t.bin', offset: 0, size: 4096, crc: '9f0470d5', sha1: '94ef52ef47b4399a03528fe3efeac9c1d6983446', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 832, sourceColumn: 2, sourceEndLine: 832};
MERGE (n:KG {id: 'rom:bombjack/fgtiles/04_h08t.bin'}) SET n:Rom SET n += {file: '04_h08t.bin', offset: 4096, size: 4096, crc: '81ec12e6', sha1: 'e29ba193f21aa898499187603b25d2e226a07c7b', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 833, sourceColumn: 2, sourceEndLine: 833};
MERGE (n:KG {id: 'rom:bombjack/fgtiles/05_k08t.bin'}) SET n:Rom SET n += {file: '05_k08t.bin', offset: 8192, size: 4096, crc: 'e87ec8b1', sha1: 'a66808ef2d62fca2854396898b86bac9be5f17a3', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 834, sourceColumn: 2, sourceEndLine: 834};
MERGE (n:KG {id: 'region:bombjack/bgtiles'}) SET n:RomRegion SET n += {tag: 'bgtiles', size: 24576, flags: '0', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 836, sourceColumn: 2, sourceEndLine: 836};
MERGE (n:KG {id: 'rom:bombjack/bgtiles/06_l08t.bin'}) SET n:Rom SET n += {file: '06_l08t.bin', offset: 0, size: 8192, crc: '51eebd89', sha1: '515128a3971fcb97b60c5b6bdd2b03026aec1921', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 837, sourceColumn: 2, sourceEndLine: 837};
MERGE (n:KG {id: 'rom:bombjack/bgtiles/07_n08t.bin'}) SET n:Rom SET n += {file: '07_n08t.bin', offset: 8192, size: 8192, crc: '9dd98e9d', sha1: '6db6006a6e20ff7c243d88293ca53681c4703ea5', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 838, sourceColumn: 2, sourceEndLine: 838};
MERGE (n:KG {id: 'rom:bombjack/bgtiles/08_r08t.bin'}) SET n:Rom SET n += {file: '08_r08t.bin', offset: 16384, size: 8192, crc: '3155ee7d', sha1: 'e7897dca4c145f10b7d975b8ef0e4d8aa9354c25', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 839, sourceColumn: 2, sourceEndLine: 839};
MERGE (n:KG {id: 'region:bombjack/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 24576, flags: '0', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 841, sourceColumn: 2, sourceEndLine: 841};
MERGE (n:KG {id: 'rom:bombjack/sprites/16_m07b.bin'}) SET n:Rom SET n += {file: '16_m07b.bin', offset: 0, size: 8192, crc: '94694097', sha1: 'de71bcd67f97d05527f2504fc8430be333fb9ec2', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 842, sourceColumn: 2, sourceEndLine: 842};
MERGE (n:KG {id: 'rom:bombjack/sprites/15_l07b.bin'}) SET n:Rom SET n += {file: '15_l07b.bin', offset: 8192, size: 8192, crc: '013f58f2', sha1: '20c64593ab9fcb04cefbce0cd5d17ce3ff26441b', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 843, sourceColumn: 2, sourceEndLine: 843};
MERGE (n:KG {id: 'rom:bombjack/sprites/14_j07b.bin'}) SET n:Rom SET n += {file: '14_j07b.bin', offset: 16384, size: 8192, crc: '101c858d', sha1: 'ed1746c15cdb04fae888601d940183d5c7702282', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 844, sourceColumn: 2, sourceEndLine: 844};
MERGE (n:KG {id: 'region:bombjack/bgmaps'}) SET n:RomRegion SET n += {tag: 'bgmaps', size: 8192, flags: '0', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 846, sourceColumn: 2, sourceEndLine: 846};
MERGE (n:KG {id: 'rom:bombjack/bgmaps/02_p04t.bin'}) SET n:Rom SET n += {file: '02_p04t.bin', offset: 0, size: 4096, crc: '398d4a02', sha1: 'ac18a8219f99ba9178b96c9564de3978e39c59fd', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 847, sourceColumn: 2, sourceEndLine: 847, reloadOffsets: [4096]};
MERGE (n:KG {id: 'handler:bombjack_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 236, sourceColumn: 1, sourceEndLine: 243, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'if (m_videoram[offset] != data)
	{
		m_videoram[offset] = data;
		m_fg_tilemap->mark_tile_dirty(offset);
	}'};
MERGE (n:KG {id: 'handler:bombjack_state.colorram_w'}) SET n:Handler SET n += {method: 'colorram_w', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 245, sourceColumn: 1, sourceEndLine: 252, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'if (m_colorram[offset] != data)
	{
		m_colorram[offset] = data;
		m_fg_tilemap->mark_tile_dirty(offset);
	}'};
MERGE (n:KG {id: 'handler:bombjack_state.spritectrl_w'}) SET n:Handler SET n += {method: 'spritectrl_w', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 254, sourceColumn: 1, sourceEndLine: 258, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'data &= 0x0f; // four bits, addresses 16 sprites
	m_spritectrl[offset] = data;'};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 429, sourceColumn: 2, sourceEndLine: 429};
MERGE (n:KG {id: 'handler:bombjack_state.background_w'}) SET n:Handler SET n += {method: 'background_w', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 260, sourceColumn: 1, sourceEndLine: 268, sourceParameters: 'u8 data', sourceBody: 'data &= 0x1f; // four address bits + a "KILL" bit
	if (m_bg_image != data)
	{
		m_bg_image = data;
		m_bg_tilemap->mark_all_dirty();
	}'};
MERGE (n:KG {id: 'handler:bombjack_state.nmi_on_w'}) SET n:Handler SET n += {method: 'nmi_on_w', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 278, sourceColumn: 1, sourceEndLine: 284, sourceParameters: 'u8 data', sourceBody: 'data = BIT(data, 0);
	if (!data)
		m_maincpu->set_input_line(INPUT_LINE_NMI, CLEAR_LINE);
	m_nmi_on = data;'};
MERGE (n:KG {id: 'handler:bombjack_state.flip_w'}) SET n:Handler SET n += {method: 'flip_w', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 270, sourceColumn: 1, sourceEndLine: 276, sourceParameters: 'u8 data', sourceBody: 'm_flip = BIT(data, 0);

	m_bg_tilemap->set_flip(m_flip ? (TILEMAP_FLIPY | TILEMAP_FLIPX) : 0);
	m_fg_tilemap->set_flip(m_flip ? (TILEMAP_FLIPY | TILEMAP_FLIPX) : 0);'};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 439, sourceColumn: 2, sourceEndLine: 439};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map'}) SET n:AddressMap SET n += {cls: 'bombjack_state', name: 'bombjack_map', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 442, sourceColumn: 1, sourceEndLine: 448};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 444, sourceColumn: 2, sourceEndLine: 444, rom: true};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 36863, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x0000, 0x0fff).ram().share(m_mainram)', ram: true, share: 'mainram'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range2'}) SET n:AddressRange SET n += {start: 36864, end: 37887, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x1000, 0x13ff).ram().w(FUNC(bombjack_state::videoram_w)).share(m_videoram)', ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range3'}) SET n:AddressRange SET n += {start: 37888, end: 38911, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x1400, 0x17ff).ram().w(FUNC(bombjack_state::colorram_w)).share(m_colorram)', ram: true, share: 'colorram'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range4'}) SET n:AddressRange SET n += {start: 38912, end: 39039, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x1800, 0x187f).mirror(0x0180).writeonly().share(m_spriteram)', mirror: 384, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range5'}) SET n:AddressRange SET n += {start: 39424, end: 39425, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x1a00, 0x1a01).mirror(0x01fe).writeonly().w(FUNC(bombjack_state::spritectrl_w)).share(m_spritectrl)', mirror: 510, writeonly: true, share: 'spritectrl'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range6'}) SET n:AddressRange SET n += {start: 39936, end: 40191, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x1c00, 0x1cff).mirror(0x0100).ram().w(m_palette, FUNC(palette_device::write8)).share("palette")', mirror: 256, ram: true, share: 'palette'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range7'}) SET n:AddressRange SET n += {start: 40448, end: 40448, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x1e00, 0x1e00).mirror(0x01ff).writeonly().w(FUNC(bombjack_state::background_w))', mirror: 511, writeonly: true};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range8'}) SET n:AddressRange SET n += {start: 40960, end: 45055, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x2000, 0x2fff).noprw()'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range9'}) SET n:AddressRange SET n += {start: 45056, end: 45056, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x3000, 0x3000).mirror(0x07f8).portr("P1").w(FUNC(bombjack_state::nmi_on_w))', mirror: 2040, portRead: 'P1'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range10'}) SET n:AddressRange SET n += {start: 45057, end: 45057, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x3001, 0x3001).mirror(0x07f8).portr("P2").nopw()', mirror: 2040, nopw: true, portRead: 'P2'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range11'}) SET n:AddressRange SET n += {start: 45058, end: 45058, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x3002, 0x3002).mirror(0x07f8).portr("SYSTEM").nopw()', mirror: 2040, nopw: true, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range12'}) SET n:AddressRange SET n += {start: 45059, end: 45059, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x3003, 0x3003).mirror(0x07f8).unmaprw()', mirror: 2040};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range13'}) SET n:AddressRange SET n += {start: 45060, end: 45060, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x3004, 0x3004).mirror(0x07f8).portr("SW1").w(FUNC(bombjack_state::flip_w))', mirror: 2040, portRead: 'SW1'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range14'}) SET n:AddressRange SET n += {start: 45061, end: 45061, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x3005, 0x3005).mirror(0x07f8).portr("SW2").nopw()', mirror: 2040, nopw: true, portRead: 'SW2'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range15'}) SET n:AddressRange SET n += {start: 45062, end: 45063, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x3006, 0x3007).mirror(0x07f8).noprw()', mirror: 2040};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range16'}) SET n:AddressRange SET n += {start: 47104, end: 47104, raw: 'map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map)) -> map(0x3800, 0x3800).mirror(0x07ff).w(m_soundlatch, FUNC(generic_latch_8_device::write))', mirror: 2047};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range17'}) SET n:AddressRange SET n += {start: 45059, end: 45059, raw: 'map(0xb003, 0xb003).mirror(0x07f8).r(m_watchdog, FUNC(watchdog_timer_device::reset_r)).w(FUNC(bombjack_state::watchdog_w))', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 446, sourceColumn: 2, sourceEndLine: 446, mirror: 2040};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_r'}) SET n:Handler SET n += {method: 'reset_r', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 446, sourceColumn: 2, sourceEndLine: 446};
MERGE (n:KG {id: 'handler:bombjack_state.watchdog_w'}) SET n:Handler SET n += {method: 'watchdog_w', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 295, sourceParameters: 'u8 data', sourceBody: 'm_watchdog->watchdog_enable(BIT(data, 0));'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_map/range18'}) SET n:AddressRange SET n += {start: 49152, end: 57343, raw: 'map(0xc000, 0xdfff).rom()', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447, rom: true};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_map'}) SET n:AddressMap SET n += {cls: 'bombjack_state', name: 'bombjack_audio_map', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 466, sourceColumn: 1, sourceEndLine: 473, globalMask: 32767};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 470, sourceColumn: 2, sourceEndLine: 470, rom: true};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 18431, raw: 'map(0x4000, 0x47ff).mirror(0x1800).ram()', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 471, sourceColumn: 2, sourceEndLine: 471, mirror: 6144, ram: true};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_map/range2'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).mirror(0x1fff).r(FUNC(bombjack_state::soundlatch_r))', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 472, sourceColumn: 2, sourceEndLine: 472, mirror: 8191};
MERGE (n:KG {id: 'handler:bombjack_state.soundlatch_r'}) SET n:Handler SET n += {method: 'soundlatch_r', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 206, sourceColumn: 1, sourceEndLine: 217, sourceParameters: '', sourceBody: '// An extra flip-flop is used to clear the LS273 after
	// reading it through a LS245 (this flip-flop is then
	// cleared in sync with /1H leading to the audio clock
	// TODO: This is affected by both /MREQ access to the
	// soundlatch and /SRD (Z80 /RD connected to an LS32)
	u8 const res = m_soundlatch->read();
	if (!machine().side_effects_disabled())
		m_soundlatch->clear_w();
	return res;'};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_portmap'}) SET n:AddressMap SET n += {cls: 'bombjack_state', name: 'bombjack_audio_portmap', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 483, sourceColumn: 1, sourceEndLine: 493, globalMask: 255};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range0'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x01, 0x01).mirror(0x6e).r(m_ay8910[0], FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 487, sourceColumn: 2, sourceEndLine: 487, mirror: 110};
MERGE (n:KG {id: 'handler:ay8910_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay8910_device', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 491, sourceColumn: 2, sourceEndLine: 491};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range1'}) SET n:AddressRange SET n += {start: 0, end: 1, raw: 'map(0x00, 0x01).mirror(0x6e).w(m_ay8910[0], FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 488, sourceColumn: 2, sourceEndLine: 488, mirror: 110};
MERGE (n:KG {id: 'handler:ay8910_device.address_data_w'}) SET n:Handler SET n += {method: 'address_data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 492, sourceColumn: 2, sourceEndLine: 492};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range2'}) SET n:AddressRange SET n += {start: 17, end: 17, raw: 'map(0x11, 0x11).mirror(0x6e).r(m_ay8910[1], FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 489, sourceColumn: 2, sourceEndLine: 489, mirror: 110};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range3'}) SET n:AddressRange SET n += {start: 16, end: 17, raw: 'map(0x10, 0x11).mirror(0x6e).w(m_ay8910[1], FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 490, sourceColumn: 2, sourceEndLine: 490, mirror: 110};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range4'}) SET n:AddressRange SET n += {start: 129, end: 129, raw: 'map(0x81, 0x81).mirror(0x6e).r(m_ay8910[2], FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 491, sourceColumn: 2, sourceEndLine: 491, mirror: 110};
MERGE (n:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range5'}) SET n:AddressRange SET n += {start: 128, end: 129, raw: 'map(0x80, 0x81).mirror(0x6e).w(m_ay8910[2], FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 492, sourceColumn: 2, sourceEndLine: 492, mirror: 110};
MERGE (n:KG {id: 'machine:bombjack_state.bombjack'}) SET n:MachineConfig SET n += {cls: 'bombjack_state', name: 'bombjack', calls: [], stateMembers: ['{"name":"m_bg_image","bits":8}', '{"name":"m_flip","bits":1}', '{"name":"m_nmi_on","bits":1}'], resetHandlers: ['bombjack_state.machine_reset'], startHandlers: ['bombjack_state.video_start'], sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 755, sourceColumn: 1, sourceEndLine: 771};
MERGE (n:KG {id: 'handler:bombjack_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 719, sourceColumn: 1, sourceEndLine: 725, sourceParameters: '', sourceBody: 'm_maincpu->pulse_input_line(INPUT_LINE_RESET, attotime::zero);
	// TODO: CLEAR line should be toggled when both the sound
	// latch is actively being read and the RESET line is on
	m_audiocpu->pulse_input_line(INPUT_LINE_RESET, attotime::zero);'};
MERGE (n:KG {id: 'handler:bombjack_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 226, sourceColumn: 1, sourceEndLine: 234, sourceParameters: '', sourceBody: 'save_item(NAME(m_bg_image));
	save_item(NAME(m_flip));

	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(bombjack_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 16, 16, 16, 16);
	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(bombjack_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);
	m_fg_tilemap->set_transparent_pen(0);'};
MERGE (n:KG {id: 'handler:bombjack_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 311, sourceColumn: 1, sourceEndLine: 323, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'tile_index |= (m_bg_image & 0x0f) << 9;

	u8 const attr = m_bgmaps[tile_index + 0x100];
	u16 code = m_bgmaps[tile_index];
	u8 color = 0;
	bool flipx = false, flipy = false;

	set_bg_tile_info(attr, code, color, flipx, flipy);
	tileinfo.set(1, code, color, (flipx ? TILE_FLIPX : 0) |
			(flipy ? TILE_FLIPY : 0));'};
MERGE (n:KG {id: 'handler:bombjack_state.set_bg_tile_info'}) SET n:Handler SET n += {method: 'set_bg_tile_info', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 297, sourceColumn: 1, sourceEndLine: 301, sourceParameters: 'u8 const attr, u16 &code, u8 &color, bool &flipx, bool &flipy', sourceBody: 'color = attr & 0x0f;
	flipy = BIT(attr, 7);'};
MERGE (n:KG {id: 'handler:bombjack_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 340, sourceColumn: 1, sourceEndLine: 350, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'u8 const attr = m_colorram[tile_index];
	u16 code = m_videoram[tile_index];
	u8 color = 0;
	bool flipx = false, flipy = false;

	set_fg_tile_info(attr, code, color, flipx, flipy);
	tileinfo.set(0, code, color, (flipx ? TILE_FLIPX : 0) |
			(flipy ? TILE_FLIPY : 0));'};
MERGE (n:KG {id: 'handler:bombjack_state.set_fg_tile_info'}) SET n:Handler SET n += {method: 'set_fg_tile_info', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 325, sourceColumn: 1, sourceEndLine: 329, sourceParameters: 'u8 const attr, u16 &code, u8 &color, bool &flipx, bool &flipy', sourceBody: 'code |= BIT(attr, 4) << 8;
	color = BIT(attr, 0, 4);'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 4000000, config: ['Z80(config, m_maincpu, CLOCK_X1)', 'm_maincpu->set_addrmap(AS_PROGRAM, &bombjack_state::bombjack_map)'], member: 'm_maincpu', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 758, sourceColumn: 2, sourceEndLine: 758};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, m_watchdog).set_vblank_count(m_screen, 8)'], member: 'm_watchdog', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 761, sourceColumn: 2, sourceEndLine: 761};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(CLOCK_X2 / 2, HTOTAL, HBEND, HBSTART, VTOTAL, VBEND, VBSTART)', 'm_screen->set_screen_update(FUNC(bombjack_state::screen_update))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set(FUNC(bombjack_state::vblank_nmi))', 'm_screen->screen_vblank().append_inputline(m_audiocpu, INPUT_LINE_NMI)'], member: 'm_screen', configCalls: ['set_raw(6000000,384,0,256,264,16,240)', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 264, 16, 240], screenRawExpr: ['CLOCK_X2 / 2', 'HTOTAL', 'HBEND', 'HBSTART', 'VTOTAL', 'VBEND', 'VBSTART']};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(bombjack_state::screen_update))', ownerTag: 'screen', targetClass: 'bombjack_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:bombjack_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 403, sourceColumn: 1, sourceEndLine: 413, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, rectangle const &cliprect', sourceBody: 'bitmap.fill(0, cliprect);

	if (BIT(m_bg_image, 4))
		m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);

	return 0;'};
MERGE (n:KG {id: 'handler:bombjack_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 363, sourceColumn: 1, sourceEndLine: 401, sourceConstants: ['HTOTAL=384', 'VBSTART=240'], sourceParameters: 'bitmap_ind16 &bitmap, rectangle const &cliprect', sourceBody: 'int const max = 31, fill = HTOTAL / 16;
	for (int sprite = max; sprite > max - fill; sprite--)
	{
		int const offs = sprite * 4;
		int code = m_spriteram[offs];
		int const attr = m_spriteram[offs + 1];
		int const color = attr & 0x0f;
		// BIT(attr, 4) - internal tag for bonus objects
		// BIT(attr, 5) - internal tag for large objects
		bool flipx = BIT(attr, 6);
		bool flipy = BIT(attr, 7);
		int ypos = m_spriteram[offs + 2];
		int xpos = m_spriteram[offs + 3];

		bool const large = large_sprite(sprite >> 1, attr);
		if (large)
		{
			if (BIT(sprite, 0))
				continue;
			else
				code |= 0x40;
		}

		int const vpos = large ? VBSTART - 16 : VBSTART;
		ypos = (vpos + 1) - ypos;
		if (m_flip)
		{
			xpos = vpos - xpos;
			ypos = vpos - ypos;
			flipx = !flipx;
			flipy = !flipy;
		}

		m_gfxdecode->gfx(large ? 3 : 2)->transpen(bitmap, cliprect,
				code, color, flipx, flipy, xpos, ypos, 0);
	}'};
MERGE (n:KG {id: 'handler:bombjack_state.large_sprite'}) SET n:Handler SET n += {method: 'large_sprite', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 352, sourceColumn: 1, sourceEndLine: 356, sourceParameters: 'int const index, u8 const attr', sourceBody: 'u8 const rev = (m_spritectrl[0] > m_spritectrl[1]) ? 1 : 0;
	return (index > m_spritectrl[rev]) && (index <= m_spritectrl[rev ^ 1]);'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(bombjack_state::vblank_nmi))', ownerTag: 'screen', targetClass: 'bombjack_state', targetMethod: 'vblank_nmi'};
MERGE (n:KG {id: 'handler:bombjack_state.vblank_nmi'}) SET n:Handler SET n += {method: 'vblank_nmi', ownerClass: 'bombjack_state', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 286, sourceColumn: 1, sourceEndLine: 290, sourceParameters: 'int state', sourceBody: 'if (state && m_nmi_on)
		m_maincpu->set_input_line(INPUT_LINE_NMI, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/screen/callback:screen:2'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'append_inputline', raw: 'm_screen->screen_vblank().append_inputline(m_audiocpu, INPUT_LINE_NMI)', ownerTag: 'screen', inputLine: 'INPUT_LINE_NMI', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_bombjack)'], member: 'm_gfxdecode', clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(palette_device::xBGR_444, 128)'], member: 'm_palette', paletteEntries: 128};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3000000, config: ['Z80(config, m_audiocpu, CLOCK_X2 / 4)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &bombjack_state::bombjack_audio_map)', 'm_audiocpu->set_addrmap(AS_IO, &bombjack_state::bombjack_audio_portmap)'], member: 'm_audiocpu'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)'], member: 'm_soundlatch'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()']};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/psg1'}) SET n:Device SET n += {type: 'AY8910', tag: 'psg1', clock: 1500000, config: ['AY8910(config, m_ay8910[0], CLOCK_X2 / 8).add_route(ALL_OUTPUTS, "speaker", 0.13)', 'm_ay8910[0]->port_a_write_callback().set_nop()', 'm_ay8910[0]->port_b_write_callback().set_nop()']};
MERGE (n:KG {id: 'audioroute:device:bombjack_state.bombjack/psg1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.13, raw: 'AY8910(config, m_ay8910[0], CLOCK_X2 / 8).add_route(ALL_OUTPUTS, "speaker", 0.13)'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/psg1/callback:psg1:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set_nop', raw: 'm_ay8910[0]->port_a_write_callback().set_nop()', ownerTag: 'psg1', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 765, sourceColumn: 2, sourceEndLine: 765};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/psg1/callback:psg1:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set_nop', raw: 'm_ay8910[0]->port_b_write_callback().set_nop()', ownerTag: 'psg1', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 766, sourceColumn: 2, sourceEndLine: 766};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/psg2'}) SET n:Device SET n += {type: 'AY8910', tag: 'psg2', clock: 1500000, config: ['AY8910(config, m_ay8910[1], CLOCK_X2 / 8).add_route(ALL_OUTPUTS, "speaker", 0.13)', 'm_ay8910[1]->port_a_write_callback().set_nop()', 'm_ay8910[1]->port_b_write_callback().set_nop()']};
MERGE (n:KG {id: 'audioroute:device:bombjack_state.bombjack/psg2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.13, raw: 'AY8910(config, m_ay8910[1], CLOCK_X2 / 8).add_route(ALL_OUTPUTS, "speaker", 0.13)'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/psg2/callback:psg2:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set_nop', raw: 'm_ay8910[1]->port_a_write_callback().set_nop()', ownerTag: 'psg2', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 767, sourceColumn: 2, sourceEndLine: 767};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/psg2/callback:psg2:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set_nop', raw: 'm_ay8910[1]->port_b_write_callback().set_nop()', ownerTag: 'psg2', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 768, sourceColumn: 2, sourceEndLine: 768};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/psg3'}) SET n:Device SET n += {type: 'AY8910', tag: 'psg3', clock: 1500000, config: ['AY8910(config, m_ay8910[2], CLOCK_X2 / 8).add_route(ALL_OUTPUTS, "speaker", 0.13)', 'm_ay8910[2]->port_a_write_callback().set_nop()', 'm_ay8910[2]->port_b_write_callback().set_nop()']};
MERGE (n:KG {id: 'audioroute:device:bombjack_state.bombjack/psg3/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.13, raw: 'AY8910(config, m_ay8910[2], CLOCK_X2 / 8).add_route(ALL_OUTPUTS, "speaker", 0.13)'};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/psg3/callback:psg3:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set_nop', raw: 'm_ay8910[2]->port_a_write_callback().set_nop()', ownerTag: 'psg3', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 769, sourceColumn: 2, sourceEndLine: 769};
MERGE (n:KG {id: 'device:bombjack_state.bombjack/psg3/callback:psg3:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set_nop', raw: 'm_ay8910[2]->port_b_write_callback().set_nop()', ownerTag: 'psg3', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 770, sourceColumn: 2, sourceEndLine: 770};
MERGE (n:KG {id: 'inputs:bombjack'}) SET n:InputPorts SET n += {name: 'bombjack', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 503, sourceColumn: 8, sourceEndLine: 503};
MERGE (n:KG {id: 'inputs:bombjack/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:bombjack/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:bombjack/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:bombjack/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_COIN1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_COIN2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_START1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_START2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bombjack/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED', defaultValue: 240};
MERGE (n:KG {id: 'inputs:bombjack/SW1'}) SET n:Port SET n += {tag: 'SW1', modify: false};
MERGE (n:KG {id: 'inputs:bombjack/SW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:!1,!2")'], name: 'Coin A', defaultValue: 0, location: 'SW1:!1,!2', settings: ['0=1C 1C', '1=1C 2C', '2=1C 3C', '3=1C 6C']};
MERGE (n:KG {id: 'inputs:bombjack/SW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW1:!3,!4")'], name: 'Coin B', defaultValue: 0, location: 'SW1:!3,!4', settings: ['4=2C 1C', '0=1C 1C', '8=1C 2C', '12=1C 3C']};
MERGE (n:KG {id: 'inputs:bombjack/SW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW1:!5,!6")'], name: 'Lives', defaultValue: 0, location: 'SW1:!5,!6', settings: ['48=2', '0=3', '16=4', '32=5']};
MERGE (n:KG {id: 'inputs:bombjack/SW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW1:!7")'], name: 'Cabinet', defaultValue: 64, location: 'SW1:!7', settings: ['64=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:bombjack/SW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW1:!8")'], name: 'Demo Sounds', defaultValue: 128, location: 'SW1:!8', settings: ['0=Off', '128=On']};
MERGE (n:KG {id: 'inputs:bombjack/SW2'}) SET n:Port SET n += {tag: 'SW2', modify: false};
MERGE (n:KG {id: 'inputs:bombjack/SW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, modifiers: ['PORT_DIPLOCATION("SW2:!1,!2,!3")'], name: 'Bonus Life (Unused)', defaultValue: 0, location: 'SW2:!1,!2,!3', settings: ['2=Every 30k', '1=Every 100k', '7=50k, 100k and 300k', '5=50k and 100k', '3=50k only', '6=100k and 300k', '4=100k only', '0=None']};
MERGE (n:KG {id: 'inputs:bombjack/SW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 24, modifiers: ['PORT_DIPLOCATION("SW2:!4,!5")'], name: 'Bird Speed', defaultValue: 16, location: 'SW2:!4,!5', settings: ['0=Easy', '8=Medium', '16=Hard', '24=Hardest']};
MERGE (n:KG {id: 'inputs:bombjack/SW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 96, modifiers: ['PORT_DIPLOCATION("SW2:!6,!7")'], name: 'Enemies Number & Speed', defaultValue: 64, location: 'SW2:!6,!7', settings: ['32=Easy', '0=Medium', '64=Hard', '96=Hardest']};
MERGE (n:KG {id: 'inputs:bombjack/SW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:!8")'], name: 'Special Coin', defaultValue: 0, location: 'SW2:!8', settings: ['0=Easy', '128=Hard']};
MERGE (n:KG {id: 'gfxlayout:layout_8x8'}) SET n:GfxLayout SET n += {name: 'layout_8x8', width: 8, height: 8, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(0,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(2,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:layout_16x16'}) SET n:GfxLayout SET n += {name: 'layout_16x16', width: 16, height: 16, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(0,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(2,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 64, 65, 66, 67, 68, 69, 70, 71], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 128, 136, 144, 152, 160, 168, 176, 184], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:layout_32x32'}) SET n:GfxLayout SET n += {name: 'layout_32x32', width: 32, height: 32, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(0,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(2,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 64, 65, 66, 67, 68, 69, 70, 71, 256, 257, 258, 259, 260, 261, 262, 263, 320, 321, 322, 323, 324, 325, 326, 327], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 128, 136, 144, 152, 160, 168, 176, 184, 512, 520, 528, 536, 544, 552, 560, 568, 640, 648, 656, 664, 672, 680, 688, 696], charIncrement: 1024};
MERGE (n:KG {id: 'gfxdecode:gfx_bombjack'}) SET n:GfxDecode SET n += {name: 'gfx_bombjack', sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 700, sourceColumn: 8, sourceEndLine: 700};
MERGE (n:KG {id: 'gfxdecode:gfx_bombjack/e0'}) SET n:GfxDecodeEntry SET n += {region: 'fgtiles', offset: 0, layout: 'layout_8x8', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_bombjack/e1'}) SET n:GfxDecodeEntry SET n += {region: 'bgtiles', offset: 0, layout: 'layout_16x16', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_bombjack/e2'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'layout_16x16', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_bombjack/e3'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'layout_32x32', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:bombjack'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 1084, sourceColumn: 1, sourceEndLine: 1084};
MATCH (a:KG {id: 'game:bombjack'}), (b:KG {id: 'machine:bombjack_state.bombjack'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:bombjack'}), (b:KG {id: 'inputs:bombjack'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:bombjack'}), (b:KG {id: 'romset:bombjack'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:machine/segacrp2_device.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 755, sourceColumn: 1, sourceEndLine: 771};
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'handler:bombjack_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'handler:bombjack_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'gfxdecode:gfx_bombjack'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/psg1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/psg2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bombjack_state.bombjack'}), (b:KG {id: 'device:bombjack_state.bombjack/psg3'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:bombjack'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 503, sourceColumn: 8, sourceEndLine: 503};
MATCH (a:KG {id: 'inputs:bombjack'}), (b:KG {id: 'inputs:bombjack/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bombjack'}), (b:KG {id: 'inputs:bombjack/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bombjack'}), (b:KG {id: 'inputs:bombjack/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bombjack'}), (b:KG {id: 'inputs:bombjack/SW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bombjack'}), (b:KG {id: 'inputs:bombjack/SW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:bombjack'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 819, sourceColumn: 1, sourceEndLine: 819};
MATCH (a:KG {id: 'romset:bombjack'}), (b:KG {id: 'region:bombjack/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bombjack'}), (b:KG {id: 'region:bombjack/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bombjack'}), (b:KG {id: 'region:bombjack/fgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bombjack'}), (b:KG {id: 'region:bombjack/bgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bombjack'}), (b:KG {id: 'region:bombjack/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bombjack'}), (b:KG {id: 'region:bombjack/bgmaps'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:bombjack_state.video_start'}), (b:KG {id: 'handler:bombjack_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:bombjack_state.video_start'}), (b:KG {id: 'handler:bombjack_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/maincpu'}), (b:KG {id: 'map:bombjack_state.bombjack_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:bombjack_state.bombjack/screen'}), (b:KG {id: 'device:bombjack_state.bombjack/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/screen'}), (b:KG {id: 'device:bombjack_state.bombjack/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/screen'}), (b:KG {id: 'device:bombjack_state.bombjack/screen/callback:screen:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bombjack'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 700, sourceColumn: 8, sourceEndLine: 700};
MATCH (a:KG {id: 'gfxdecode:gfx_bombjack'}), (b:KG {id: 'gfxdecode:gfx_bombjack/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bombjack'}), (b:KG {id: 'gfxdecode:gfx_bombjack/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bombjack'}), (b:KG {id: 'gfxdecode:gfx_bombjack/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bombjack'}), (b:KG {id: 'gfxdecode:gfx_bombjack/e3'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/audiocpu'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:bombjack_state.bombjack/audiocpu'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:bombjack_state.bombjack/psg1'}), (b:KG {id: 'audioroute:device:bombjack_state.bombjack/psg1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/psg1'}), (b:KG {id: 'device:bombjack_state.bombjack/psg1/callback:psg1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/psg1'}), (b:KG {id: 'device:bombjack_state.bombjack/psg1/callback:psg1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/psg2'}), (b:KG {id: 'audioroute:device:bombjack_state.bombjack/psg2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/psg2'}), (b:KG {id: 'device:bombjack_state.bombjack/psg2/callback:psg2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/psg2'}), (b:KG {id: 'device:bombjack_state.bombjack/psg2/callback:psg2:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/psg3'}), (b:KG {id: 'audioroute:device:bombjack_state.bombjack/psg3/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/psg3'}), (b:KG {id: 'device:bombjack_state.bombjack/psg3/callback:psg3:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/psg3'}), (b:KG {id: 'device:bombjack_state.bombjack/psg3/callback:psg3:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P1'}), (b:KG {id: 'inputs:bombjack/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P1'}), (b:KG {id: 'inputs:bombjack/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P1'}), (b:KG {id: 'inputs:bombjack/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P1'}), (b:KG {id: 'inputs:bombjack/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P1'}), (b:KG {id: 'inputs:bombjack/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P1'}), (b:KG {id: 'inputs:bombjack/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P2'}), (b:KG {id: 'inputs:bombjack/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P2'}), (b:KG {id: 'inputs:bombjack/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P2'}), (b:KG {id: 'inputs:bombjack/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P2'}), (b:KG {id: 'inputs:bombjack/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P2'}), (b:KG {id: 'inputs:bombjack/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/P2'}), (b:KG {id: 'inputs:bombjack/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SYSTEM'}), (b:KG {id: 'inputs:bombjack/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SYSTEM'}), (b:KG {id: 'inputs:bombjack/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SYSTEM'}), (b:KG {id: 'inputs:bombjack/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SYSTEM'}), (b:KG {id: 'inputs:bombjack/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SYSTEM'}), (b:KG {id: 'inputs:bombjack/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SW1'}), (b:KG {id: 'inputs:bombjack/SW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SW1'}), (b:KG {id: 'inputs:bombjack/SW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SW1'}), (b:KG {id: 'inputs:bombjack/SW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SW1'}), (b:KG {id: 'inputs:bombjack/SW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SW1'}), (b:KG {id: 'inputs:bombjack/SW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SW2'}), (b:KG {id: 'inputs:bombjack/SW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SW2'}), (b:KG {id: 'inputs:bombjack/SW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SW2'}), (b:KG {id: 'inputs:bombjack/SW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bombjack/SW2'}), (b:KG {id: 'inputs:bombjack/SW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:bombjack/maincpu'}), (b:KG {id: 'rom:bombjack/maincpu/09_j01b.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/maincpu'}), (b:KG {id: 'rom:bombjack/maincpu/10_l01b.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/maincpu'}), (b:KG {id: 'rom:bombjack/maincpu/11_m01b.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/maincpu'}), (b:KG {id: 'rom:bombjack/maincpu/12_n01b.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/maincpu'}), (b:KG {id: 'rom:bombjack/maincpu/13.1r'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/audiocpu'}), (b:KG {id: 'rom:bombjack/audiocpu/01_h03t.3h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/fgtiles'}), (b:KG {id: 'rom:bombjack/fgtiles/03_e08t.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/fgtiles'}), (b:KG {id: 'rom:bombjack/fgtiles/04_h08t.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/fgtiles'}), (b:KG {id: 'rom:bombjack/fgtiles/05_k08t.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/bgtiles'}), (b:KG {id: 'rom:bombjack/bgtiles/06_l08t.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/bgtiles'}), (b:KG {id: 'rom:bombjack/bgtiles/07_n08t.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/bgtiles'}), (b:KG {id: 'rom:bombjack/bgtiles/08_r08t.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/sprites'}), (b:KG {id: 'rom:bombjack/sprites/16_m07b.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/sprites'}), (b:KG {id: 'rom:bombjack/sprites/15_l07b.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/sprites'}), (b:KG {id: 'rom:bombjack/sprites/14_j07b.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bombjack/bgmaps'}), (b:KG {id: 'rom:bombjack/bgmaps/02_p04t.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:bombjack_state.get_bg_tile_info'}), (b:KG {id: 'handler:bombjack_state.set_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:bombjack_state.get_fg_tile_info'}), (b:KG {id: 'handler:bombjack_state.set_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 442, sourceColumn: 1, sourceEndLine: 448};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map'}), (b:KG {id: 'map:bombjack_state.bombjack_map/range18'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/screen/callback:screen:0'}), (b:KG {id: 'handler:bombjack_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bombjack_state.bombjack/screen/callback:screen:1'}), (b:KG {id: 'handler:bombjack_state.vblank_nmi'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bombjack/e0'}), (b:KG {id: 'gfxlayout:layout_8x8'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bombjack/e1'}), (b:KG {id: 'gfxlayout:layout_16x16'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bombjack/e2'}), (b:KG {id: 'gfxlayout:layout_16x16'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bombjack/e3'}), (b:KG {id: 'gfxlayout:layout_32x32'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_map'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 466, sourceColumn: 1, sourceEndLine: 473};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_map'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_map'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_map'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/tecmo/bombjack.cpp', sourceLine: 483, sourceColumn: 1, sourceEndLine: 493};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap'}), (b:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range2'}), (b:KG {id: 'handler:bombjack_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range3'}), (b:KG {id: 'handler:bombjack_state.colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range5'}), (b:KG {id: 'handler:bombjack_state.spritectrl_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range6'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range7'}), (b:KG {id: 'handler:bombjack_state.background_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range9'}), (b:KG {id: 'handler:bombjack_state.nmi_on_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range13'}), (b:KG {id: 'handler:bombjack_state.flip_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range16'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range17'}), (b:KG {id: 'handler:watchdog_timer_device.reset_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_map/range17'}), (b:KG {id: 'handler:bombjack_state.watchdog_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:bombjack_state.screen_update'}), (b:KG {id: 'handler:bombjack_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:layout_8x8'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:layout_16x16'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:layout_32x32'}), (b:KG {id: 'file:src/mame/tecmo/bombjack.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_map/range2'}), (b:KG {id: 'handler:bombjack_state.soundlatch_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range0'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'psg1'};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range1'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'psg1'};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range2'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'psg2'};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range3'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'psg2'};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range4'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'psg3'};
MATCH (a:KG {id: 'map:bombjack_state.bombjack_audio_portmap/range5'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'psg3'};
MATCH (a:KG {id: 'handler:bombjack_state.draw_sprites'}), (b:KG {id: 'handler:bombjack_state.large_sprite'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
