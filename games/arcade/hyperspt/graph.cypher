// mamekit knowledge graph — driver src/mame/konami/hyperspt.cpp
// generated 2026-09-24T02:28:00.276Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/konami/hyperspt.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:hyprolyb.h'}) SET n:SourceFile SET n += {path: 'hyprolyb.h', external: true};
MERGE (n:KG {id: 'file:konami1.h'}) SET n:SourceFile SET n += {path: 'konami1.h', external: true};
MERGE (n:KG {id: 'file:konamipt.h'}) SET n:SourceFile SET n += {path: 'konamipt.h', external: true};
MERGE (n:KG {id: 'file:trackfld_a.h'}) SET n:SourceFile SET n += {path: 'trackfld_a.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6800/m6800.h'}) SET n:SourceFile SET n += {path: 'cpu/m6800/m6800.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/m6809.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/m6809.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:sound/vlm5030.h'}) SET n:SourceFile SET n += {path: 'sound/vlm5030.h', external: true};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'game:hyperspt'}) SET n:Game SET n += {name: 'hyperspt', year: '1984', company: 'Konami (Centuri license)', fullname: 'Hyper Sports', monitor: 'ROT0', cls: 'hyperspt_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 949, sourceColumn: 1, sourceEndLine: 949};
MERGE (n:KG {id: 'romset:hyperspt'}) SET n:RomSet SET n += {name: 'hyperspt', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 713, sourceColumn: 1, sourceEndLine: 713};
MERGE (n:KG {id: 'region:hyperspt/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 714, sourceColumn: 2, sourceEndLine: 714};
MERGE (n:KG {id: 'rom:hyperspt/maincpu/c01'}) SET n:Rom SET n += {file: 'c01', offset: 16384, size: 8192, crc: '0c720eeb', sha1: 'cc0719db7e59c72e603ab2ca42565303bc41d281', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 715, sourceColumn: 2, sourceEndLine: 715};
MERGE (n:KG {id: 'rom:hyperspt/maincpu/c02'}) SET n:Rom SET n += {file: 'c02', offset: 24576, size: 8192, crc: '560258e0', sha1: '788d0d3cbbd97fb54eceb3281ccf84a31e5e3e98', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 716, sourceColumn: 2, sourceEndLine: 716};
MERGE (n:KG {id: 'rom:hyperspt/maincpu/c03'}) SET n:Rom SET n += {file: 'c03', offset: 32768, size: 8192, crc: '9b01c7e6', sha1: '0106f94b38ad62e7514e56aab35581968074bbe0', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 717, sourceColumn: 2, sourceEndLine: 717};
MERGE (n:KG {id: 'rom:hyperspt/maincpu/c04'}) SET n:Rom SET n += {file: 'c04', offset: 40960, size: 8192, crc: '10d7e9a2', sha1: 'ebf1dd7ba10179c41b42358c45e49424ce8495cd', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 718, sourceColumn: 2, sourceEndLine: 718};
MERGE (n:KG {id: 'rom:hyperspt/maincpu/c05'}) SET n:Rom SET n += {file: 'c05', offset: 49152, size: 8192, crc: 'b105a8cd', sha1: '7d77ab4d75c0bff7ac7372a5ff5fe55839b57d19', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 719, sourceColumn: 2, sourceEndLine: 719};
MERGE (n:KG {id: 'rom:hyperspt/maincpu/c06'}) SET n:Rom SET n += {file: 'c06', offset: 57344, size: 8192, crc: '1a34a849', sha1: 'daa42a959ea162ca7f098010c85a7453a8805df8', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 720, sourceColumn: 2, sourceEndLine: 720};
MERGE (n:KG {id: 'region:hyperspt/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 722, sourceColumn: 2, sourceEndLine: 722};
MERGE (n:KG {id: 'rom:hyperspt/audiocpu/c10'}) SET n:Rom SET n += {file: 'c10', offset: 0, size: 8192, crc: '3dc1a6ff', sha1: '1e67cac46b6c8a9a0bb1560e135983435520f1fc', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 723, sourceColumn: 2, sourceEndLine: 723};
MERGE (n:KG {id: 'rom:hyperspt/audiocpu/c09'}) SET n:Rom SET n += {file: 'c09', offset: 8192, size: 8192, crc: '9b525c3e', sha1: 'd8775ec3b4f12117431a2b7c7eaa038c1255241b', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 724, sourceColumn: 2, sourceEndLine: 724};
MERGE (n:KG {id: 'region:hyperspt/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 65536, flags: '0', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 726, sourceColumn: 2, sourceEndLine: 726};
MERGE (n:KG {id: 'rom:hyperspt/sprites/c14'}) SET n:Rom SET n += {file: 'c14', offset: 0, size: 8192, crc: 'c72d63be', sha1: '0677b4f7196551ebc1bbbecd0e15d79f8e32857d', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 727, sourceColumn: 2, sourceEndLine: 727};
MERGE (n:KG {id: 'rom:hyperspt/sprites/c13'}) SET n:Rom SET n += {file: 'c13', offset: 8192, size: 8192, crc: '76565608', sha1: '418fb9a81c0583d0214afb27fea28794563b8460', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 728, sourceColumn: 2, sourceEndLine: 728};
MERGE (n:KG {id: 'rom:hyperspt/sprites/c12'}) SET n:Rom SET n += {file: 'c12', offset: 16384, size: 8192, crc: '74d2cc69', sha1: '684b65455217f243b3690822d445efdcb18211bb', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 729, sourceColumn: 2, sourceEndLine: 729};
MERGE (n:KG {id: 'rom:hyperspt/sprites/c11'}) SET n:Rom SET n += {file: 'c11', offset: 24576, size: 8192, crc: '66cbcb4d', sha1: 'c4ea51a6f30d2cd0cd6e22fdadb83d889f2cc471', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 730, sourceColumn: 2, sourceEndLine: 730};
MERGE (n:KG {id: 'rom:hyperspt/sprites/c18'}) SET n:Rom SET n += {file: 'c18', offset: 32768, size: 8192, crc: 'ed25e669', sha1: '2e306db101cd4443b0a81cecf817e5ebbdaf1bba', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 731, sourceColumn: 2, sourceEndLine: 731};
MERGE (n:KG {id: 'rom:hyperspt/sprites/c17'}) SET n:Rom SET n += {file: 'c17', offset: 40960, size: 8192, crc: 'b145b39f', sha1: 'e696e1f9b44aa44360ea9962c4ee9b61db8e53f5', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 732, sourceColumn: 2, sourceEndLine: 732};
MERGE (n:KG {id: 'rom:hyperspt/sprites/c16'}) SET n:Rom SET n += {file: 'c16', offset: 49152, size: 8192, crc: 'd7ff9f2b', sha1: 'b0e6a056db96027ba0c10d3ee3bfdef145a236e2', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 733, sourceColumn: 2, sourceEndLine: 733};
MERGE (n:KG {id: 'rom:hyperspt/sprites/c15'}) SET n:Rom SET n += {file: 'c15', offset: 57344, size: 8192, crc: 'f3d454e6', sha1: '9d04dcd1b0354e01773923295bba2602e00467f9', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 734, sourceColumn: 2, sourceEndLine: 734};
MERGE (n:KG {id: 'region:hyperspt/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 32768, flags: '0', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 736, sourceColumn: 2, sourceEndLine: 736};
MERGE (n:KG {id: 'rom:hyperspt/tiles/c26'}) SET n:Rom SET n += {file: 'c26', offset: 0, size: 8192, crc: 'a6897eac', sha1: 'a1dd950c29885f7bb4784fed46810ae47bff87dd', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 737, sourceColumn: 2, sourceEndLine: 737};
MERGE (n:KG {id: 'rom:hyperspt/tiles/c24'}) SET n:Rom SET n += {file: 'c24', offset: 8192, size: 8192, crc: '5fb230c0', sha1: '8caebf3788c1fb71c1ba72b0045503d45936d4ce', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 738, sourceColumn: 2, sourceEndLine: 738};
MERGE (n:KG {id: 'rom:hyperspt/tiles/c22'}) SET n:Rom SET n += {file: 'c22', offset: 16384, size: 8192, crc: 'ed9271a0', sha1: 'a458ad79922383f45f6522775e19cf693e226883', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 739, sourceColumn: 2, sourceEndLine: 739};
MERGE (n:KG {id: 'rom:hyperspt/tiles/c20'}) SET n:Rom SET n += {file: 'c20', offset: 24576, size: 8192, crc: '183f4324', sha1: 'f6bcd03c25dea300876ace950f118a971557168f', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 740, sourceColumn: 2, sourceEndLine: 740};
MERGE (n:KG {id: 'region:hyperspt/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 544, flags: '0', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742};
MERGE (n:KG {id: 'rom:hyperspt/proms/c03_c27.bin'}) SET n:Rom SET n += {file: 'c03_c27.bin', offset: 0, size: 32, crc: 'bc8a5956', sha1: '90746145d9f380c29919edea3ef7a8434c48c9d9', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 743, sourceColumn: 2, sourceEndLine: 743};
MERGE (n:KG {id: 'rom:hyperspt/proms/j12_c28.bin'}) SET n:Rom SET n += {file: 'j12_c28.bin', offset: 32, size: 256, crc: '2c891d59', sha1: '79050fbe058c24349927edc7937ec68a77f450f1', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 744, sourceColumn: 2, sourceEndLine: 744};
MERGE (n:KG {id: 'rom:hyperspt/proms/a09_c29.bin'}) SET n:Rom SET n += {file: 'a09_c29.bin', offset: 288, size: 256, crc: '811a3f3f', sha1: '474f03345847cd9791ff6b7161286bbfef3f990a', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 745, sourceColumn: 2, sourceEndLine: 745};
MERGE (n:KG {id: 'region:hyperspt/vlm'}) SET n:RomRegion SET n += {tag: 'vlm', size: 65536, flags: '0', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 747, sourceColumn: 2, sourceEndLine: 747};
MERGE (n:KG {id: 'rom:hyperspt/vlm/c08'}) SET n:Rom SET n += {file: 'c08', offset: 0, size: 8192, crc: 'e8f8ea78', sha1: '8d37818e5a2740c96696f37996f2a3f870386690', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 748, sourceColumn: 2, sourceEndLine: 748};
MERGE (n:KG {id: 'map:base_state.common_map'}) SET n:AddressMap SET n += {cls: 'base_state', name: 'common_map', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 360};
MERGE (n:KG {id: 'map:base_state.common_map/range0'}) SET n:AddressRange SET n += {start: 4096, end: 4287, raw: 'map(0x1000, 0x10bf).ram().share(m_spriteram)', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 347, sourceColumn: 2, sourceEndLine: 347, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:base_state.common_map/range1'}) SET n:AddressRange SET n += {start: 4288, end: 4351, raw: 'map(0x10c0, 0x10ff).ram().share(m_scroll)', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 348, sourceColumn: 2, sourceEndLine: 348, ram: true, share: 'scroll'};
MERGE (n:KG {id: 'map:base_state.common_map/range2'}) SET n:AddressRange SET n += {start: 5120, end: 5120, raw: 'map(0x1400, 0x1400).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 349, sourceColumn: 2, sourceEndLine: 349};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 349, sourceColumn: 2, sourceEndLine: 349};
MERGE (n:KG {id: 'map:base_state.common_map/range3'}) SET n:AddressRange SET n += {start: 5248, end: 5255, raw: 'map(0x1480, 0x1487).w("mainlatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 350, sourceColumn: 2, sourceEndLine: 350};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 350, sourceColumn: 2, sourceEndLine: 350};
MERGE (n:KG {id: 'map:base_state.common_map/range4'}) SET n:AddressRange SET n += {start: 5376, end: 5376, raw: 'map(0x1500, 0x1500).w("soundlatch", FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351};
MERGE (n:KG {id: 'map:base_state.common_map/range5'}) SET n:AddressRange SET n += {start: 5632, end: 5632, raw: 'map(0x1600, 0x1600).portr("DSW2")', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 352, sourceColumn: 2, sourceEndLine: 352, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:base_state.common_map/range6'}) SET n:AddressRange SET n += {start: 5760, end: 5760, raw: 'map(0x1680, 0x1680).portr("SYSTEM")', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 353, sourceColumn: 2, sourceEndLine: 353, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:base_state.common_map/range7'}) SET n:AddressRange SET n += {start: 5763, end: 5763, raw: 'map(0x1683, 0x1683).portr("DSW1")', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 354, sourceColumn: 2, sourceEndLine: 354, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:base_state.common_map/range8'}) SET n:AddressRange SET n += {start: 8192, end: 10239, raw: 'map(0x2000, 0x27ff).ram().w(FUNC(base_state::videoram_w)).share(m_videoram)', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 355, sourceColumn: 2, sourceEndLine: 355, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:base_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 232, sourceColumn: 1, sourceEndLine: 236, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:base_state.common_map/range9'}) SET n:AddressRange SET n += {start: 10240, end: 12287, raw: 'map(0x2800, 0x2fff).ram().w(FUNC(base_state::colorram_w)).share(m_colorram)', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 356, sourceColumn: 2, sourceEndLine: 356, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:base_state.colorram_w'}) SET n:Handler SET n += {method: 'colorram_w', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 238, sourceColumn: 1, sourceEndLine: 242, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:base_state.common_map/range10'}) SET n:AddressRange SET n += {start: 12288, end: 14335, raw: 'map(0x3000, 0x37ff).ram()', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 357, sourceColumn: 2, sourceEndLine: 357, ram: true};
MERGE (n:KG {id: 'map:base_state.common_map/range11'}) SET n:AddressRange SET n += {start: 14336, end: 16383, raw: 'map(0x3800, 0x3fff).ram().share("nvram")', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 358, sourceColumn: 2, sourceEndLine: 358, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:base_state.common_map/range12'}) SET n:AddressRange SET n += {start: 16384, end: 65535, raw: 'map(0x4000, 0xffff).rom()', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 359, sourceColumn: 2, sourceEndLine: 359, rom: true};
MERGE (n:KG {id: 'map:base_state.hyperspt_common_main_map'}) SET n:AddressMap SET n += {cls: 'base_state', name: 'hyperspt_common_main_map', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 362, sourceColumn: 1, sourceEndLine: 367, calls: ['common_map']};
MERGE (n:KG {id: 'map:base_state.hyperspt_common_main_map/range0'}) SET n:AddressRange SET n += {start: 5761, end: 5761, raw: 'map(0x1681, 0x1681).portr("P1_P2")', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 365, sourceColumn: 2, sourceEndLine: 365, portRead: 'P1_P2'};
MERGE (n:KG {id: 'map:base_state.hyperspt_common_main_map/range1'}) SET n:AddressRange SET n += {start: 5762, end: 5762, raw: 'map(0x1682, 0x1682).portr("P3_P4")', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 366, sourceColumn: 2, sourceEndLine: 366, portRead: 'P3_P4'};
MERGE (n:KG {id: 'map:base_state.common_sound_map'}) SET n:AddressMap SET n += {cls: 'base_state', name: 'common_sound_map', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 376, sourceColumn: 1, sourceEndLine: 385};
MERGE (n:KG {id: 'map:base_state.common_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 378, sourceColumn: 2, sourceEndLine: 378, rom: true};
MERGE (n:KG {id: 'map:base_state.common_sound_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 20479, raw: 'map(0x4000, 0x4fff).ram()', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 379, sourceColumn: 2, sourceEndLine: 379, ram: true};
MERGE (n:KG {id: 'map:base_state.common_sound_map/range2'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).r("soundlatch", FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 380, sourceColumn: 2, sourceEndLine: 380};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 380, sourceColumn: 2, sourceEndLine: 380};
MERGE (n:KG {id: 'map:base_state.common_sound_map/range3'}) SET n:AddressRange SET n += {start: 32768, end: 32768, raw: 'map(0x8000, 0x8000).r(m_soundbrd, FUNC(trackfld_audio_device::hyperspt_sh_timer_r))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 381, sourceColumn: 2, sourceEndLine: 381};
MERGE (n:KG {id: 'handler:trackfld_audio_device.hyperspt_sh_timer_r'}) SET n:Handler SET n += {method: 'hyperspt_sh_timer_r', ownerClass: 'trackfld_audio_device', sourceFile: 'src/mame/konami/trackfld_a.cpp', sourceLine: 72, sourceColumn: 1, sourceEndLine: 80, sourceConstants: ['TIMER_RATE=1024'], sourceParameters: '', sourceBody: 'uint32_t clock = m_audiocpu->total_cycles() / TIMER_RATE;

	if (m_vlm != nullptr)
		return (clock & 0x3) | (m_vlm->bsy_r() ? 0x04 : 0);
	else
		return (clock & 0x3);'};
MERGE (n:KG {id: 'map:base_state.common_sound_map/range4'}) SET n:AddressRange SET n += {start: 57344, end: 57344, raw: 'map(0xe000, 0xe000).w(m_dac, FUNC(dac_byte_interface::data_w))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 382, sourceColumn: 2, sourceEndLine: 382};
MERGE (n:KG {id: 'handler:dac_byte_interface.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'dac_byte_interface', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 382, sourceColumn: 2, sourceEndLine: 382};
MERGE (n:KG {id: 'map:base_state.common_sound_map/range5'}) SET n:AddressRange SET n += {start: 57345, end: 57345, raw: 'map(0xe001, 0xe001).w(FUNC(hyperspt_state::konami_sn76489a_latch_w))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 383, sourceColumn: 2, sourceEndLine: 383};
MERGE (n:KG {id: 'handler:hyperspt_state.konami_sn76489a_latch_w'}) SET n:Handler SET n += {method: 'konami_sn76489a_latch_w', ownerClass: 'hyperspt_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 91, sourceColumn: 31, sourceEndLine: 93, sourceParameters: 'uint8_t data', sourceBody: 'm_sn76489a_latch = data;'};
MERGE (n:KG {id: 'map:base_state.common_sound_map/range6'}) SET n:AddressRange SET n += {start: 57346, end: 57346, raw: 'map(0xe002, 0xe002).w(FUNC(hyperspt_state::konami_sn76489a_w))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 384, sourceColumn: 2, sourceEndLine: 384};
MERGE (n:KG {id: 'handler:hyperspt_state.konami_sn76489a_w'}) SET n:Handler SET n += {method: 'konami_sn76489a_w', ownerClass: 'hyperspt_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 94, sourceColumn: 1, sourceEndLine: 94, sourceParameters: 'uint8_t data', sourceBody: 'm_sn->write(m_sn76489a_latch);'};
MERGE (n:KG {id: 'handler:hyprolyb_adpcm_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'hyprolyb_adpcm_device', sourceFile: 'src/mame/konami/hyprolyb.cpp', sourceLine: 43, sourceColumn: 1, sourceEndLine: 47, sourceParameters: 'uint8_t data', sourceBody: 'm_soundlatch2->write(data);
	m_adpcm_ready = 0x80;'};
MERGE (n:KG {id: 'map:hyperspt_state.sound_map'}) SET n:AddressMap SET n += {cls: 'hyperspt_state', name: 'sound_map', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 387, sourceColumn: 1, sourceEndLine: 392, calls: ['common_sound_map']};
MERGE (n:KG {id: 'map:hyperspt_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).w(m_vlm, FUNC(vlm5030_device::data_w))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 390, sourceColumn: 2, sourceEndLine: 390};
MERGE (n:KG {id: 'handler:vlm5030_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'vlm5030_device', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 390, sourceColumn: 2, sourceEndLine: 390};
MERGE (n:KG {id: 'map:hyperspt_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 49152, end: 57343, raw: 'map(0xc000, 0xdfff).w(m_soundbrd, FUNC(trackfld_audio_device::hyperspt_sound_w))', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 391, sourceColumn: 2, sourceEndLine: 391};
MERGE (n:KG {id: 'handler:trackfld_audio_device.hyperspt_sound_w'}) SET n:Handler SET n += {method: 'hyperspt_sound_w', ownerClass: 'trackfld_audio_device', sourceFile: 'src/mame/konami/trackfld_a.cpp', sourceLine: 82, sourceColumn: 1, sourceEndLine: 96, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// A3 = data enable for VLM5030 (don\'t care )
	// A4 = STA pin (1->0 data data, 0->1 start speech)
	// A5 = RST pin 1=reset
	// A6 = VLM5030    output disable (don\'t care )
	// A7 = kONAMI DAC output disable (don\'t care )
	// A8 = SN76489AN  output disable (don\'t care )

	// A4 VLM5030 ST pin
	m_vlm->st_w(BIT(offset, 4));

	// A5 VLM5030 RST pin
	m_vlm->rst_w(BIT(offset, 5));'};
MERGE (n:KG {id: 'machine:base_state.base'}) SET n:MachineConfig SET n += {cls: 'base_state', name: 'base', calls: [], stateMembers: ['{"name":"m_sn76489a_latch","bits":8}', '{"name":"m_irq_mask","bits":8}'], startHandlers: ['base_state.video_start'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 610, sourceColumn: 1, sourceEndLine: 654};
MERGE (n:KG {id: 'handler:base_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 253, sourceColumn: 1, sourceEndLine: 257, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(base_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 64, 32);
	m_bg_tilemap->set_scroll_rows(32);'};
MERGE (n:KG {id: 'handler:base_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 244, sourceColumn: 1, sourceEndLine: 251, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int const code = m_videoram[tile_index] + ((m_colorram[tile_index] & 0x80) << 1) + ((m_colorram[tile_index] & 0x40) << 3);
	int const color = m_colorram[tile_index] & 0x0f;
	int const flags = ((m_colorram[tile_index] & 0x10) ? TILE_FLIPX : 0) | ((m_colorram[tile_index] & 0x20) ? TILE_FLIPY : 0);

	tileinfo.set(1, code, color, flags);'};
MERGE (n:KG {id: 'device:base_state.base/maincpu'}) SET n:Device SET n += {type: 'KONAMI1', tag: 'maincpu', clock: 1536000, config: ['KONAMI1(config, m_maincpu, XTAL(18\'432\'000) / 12)'], member: 'm_maincpu', cls: 'konami1_device', clsHierarchy: ['konami1_device'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 613, sourceColumn: 2, sourceEndLine: 613};
MERGE (n:KG {id: 'device:base_state.base/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3579545.25, config: ['Z80(config, m_audiocpu, XTAL(14\'318\'181) / 4)'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 615, sourceColumn: 2, sourceEndLine: 615};
MERGE (n:KG {id: 'device:base_state.base/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['ls259_device &mainlatch(LS259(config, "mainlatch"))', 'mainlatch.q_out_cb<0>().set(FUNC(base_state::flip_screen_set))', 'mainlatch.q_out_cb<1>().set(m_soundbrd, FUNC(trackfld_audio_device::sh_irqtrigger_w))', 'mainlatch.q_out_cb<2>().set_nop()', 'mainlatch.q_out_cb<3>().set(FUNC(base_state::coin_counter_w<0>))', 'mainlatch.q_out_cb<4>().set(FUNC(base_state::coin_counter_w<1>))', 'mainlatch.q_out_cb<5>().set_nop()', 'mainlatch.q_out_cb<7>().set(FUNC(base_state::irq_mask_w))'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 617, sourceColumn: 2, sourceEndLine: 617};
MERGE (n:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<0>().set(FUNC(base_state::flip_screen_set))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 618, sourceColumn: 2, sourceEndLine: 618, slot: '0', targetClass: 'base_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:base_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 618, sourceColumn: 2, sourceEndLine: 618};
MERGE (n:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<1>().set(m_soundbrd, FUNC(trackfld_audio_device::sh_irqtrigger_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 619, sourceColumn: 2, sourceEndLine: 619, slot: '1', targetClass: 'trackfld_audio_device', targetMethod: 'sh_irqtrigger_w', targetTag: 'trackfld_audio'};
MERGE (n:KG {id: 'handler:trackfld_audio_device.sh_irqtrigger_w'}) SET n:Handler SET n += {method: 'sh_irqtrigger_w', ownerClass: 'trackfld_audio_device', sourceFile: 'src/mame/konami/trackfld_a.cpp', sourceLine: 100, sourceColumn: 1, sourceEndLine: 107, sourceParameters: 'int state', sourceBody: '// setting bit 0 low then high triggers IRQ on the sound CPU
	if (!m_last_irq && state)
		m_audiocpu->set_input_line(0, HOLD_LINE); // Z80 IM1

	m_last_irq = state;'};
MERGE (n:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'mainlatch.q_out_cb<2>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 620, sourceColumn: 2, sourceEndLine: 620, slot: '2'};
MERGE (n:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<3>().set(FUNC(base_state::coin_counter_w<0>))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 621, sourceColumn: 2, sourceEndLine: 621, slot: '3', targetClass: 'base_state', targetMethod: 'coin_counter_w_0'};
MERGE (n:KG {id: 'handler:base_state.coin_counter_w_0'}) SET n:Handler SET n += {method: 'coin_counter_w_0', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 333, sourceColumn: 1, sourceEndLine: 336, sourceConstants: ['Which=0'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<4>().set(FUNC(base_state::coin_counter_w<1>))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 622, sourceColumn: 2, sourceEndLine: 622, slot: '4', targetClass: 'base_state', targetMethod: 'coin_counter_w_1'};
MERGE (n:KG {id: 'handler:base_state.coin_counter_w_1'}) SET n:Handler SET n += {method: 'coin_counter_w_1', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 333, sourceColumn: 1, sourceEndLine: 336, sourceConstants: ['Which=1'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'mainlatch.q_out_cb<5>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 623, sourceColumn: 2, sourceEndLine: 623, slot: '5'};
MERGE (n:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:6'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<7>().set(FUNC(base_state::irq_mask_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 624, sourceColumn: 2, sourceEndLine: 624, slot: '7', targetClass: 'base_state', targetMethod: 'irq_mask_w'};
MERGE (n:KG {id: 'handler:base_state.irq_mask_w'}) SET n:Handler SET n += {method: 'irq_mask_w', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 338, sourceColumn: 1, sourceEndLine: 343, sourceParameters: 'int state', sourceBody: 'm_irq_mask = state;
	if (!m_irq_mask)
		m_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:base_state.base/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 626, sourceColumn: 2, sourceEndLine: 626, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'device:base_state.base/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 628, sourceColumn: 2, sourceEndLine: 628};
MERGE (n:KG {id: 'device:base_state.base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_refresh_hz(60)', 'm_screen->set_vblank_time(ATTOSECONDS_IN_USEC(0))', 'm_screen->set_size(32*8, 32*8)', 'm_screen->set_visarea(0*8, 32*8-1, 2*8, 30*8-1)', 'm_screen->set_screen_update(FUNC(base_state::screen_update))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set(FUNC(base_state::vblank_irq))'], member: 'm_screen', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 631, sourceColumn: 2, sourceEndLine: 631, configCalls: ['set_refresh_hz(60)', 'set_size(256,256)', 'set_visarea(0,255,16,239)', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRefreshHz: 60, screenSize: [256, 256], screenVisarea: [0, 255, 16, 239]};
MERGE (n:KG {id: 'device:base_state.base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(base_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 636, sourceColumn: 2, sourceEndLine: 636, targetClass: 'base_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:base_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 295, sourceColumn: 1, sourceEndLine: 307, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'for (int row = 0; row < 32; row++)
	{
		int scrollx = m_scroll[row * 2] + (m_scroll[(row * 2) + 1] & 0x01) * 256;
		if (flip_screen()) scrollx = -scrollx;
		m_bg_tilemap->set_scrollx(row, scrollx);
	}

	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:base_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 259, sourceColumn: 1, sourceEndLine: 293, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'for (int offs = m_spriteram.bytes() - 4; offs >= 0; offs -= 4)
	{
		int sx = m_spriteram[offs + 3];
		int sy = 240 - m_spriteram[offs + 1];
		int const code = m_spriteram[offs + 2] + 8 * (m_spriteram[offs] & 0x20);
		int const color = m_spriteram[offs] & 0x0f;
		int const flipx = ~m_spriteram[offs] & 0x40;
		int flipy = m_spriteram[offs] & 0x80;

		if (flip_screen())
		{
			sy = 240 - sy;
			flipy = !flipy;
		}

		/* Note that this adjustment must be done AFTER handling flip_screen(), thus
		   proving that this is a hardware related "feature" */
		sy += 1;

		m_gfxdecode->gfx(0)->transmask(bitmap, cliprect,
		code, color,
		flipx, flipy,
		sx, sy,
		m_palette->transpen_mask(*m_gfxdecode->gfx(0), color, 0));

		// redraw with wraparound
		m_gfxdecode->gfx(0)->transmask(bitmap, cliprect,
		code, color,
		flipx, flipy,
		sx - 256, sy,
		m_palette->transpen_mask(*m_gfxdecode->gfx(0), color, 0));
	}'};
MERGE (n:KG {id: 'device:base_state.base/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(base_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 638, sourceColumn: 2, sourceEndLine: 638, targetClass: 'base_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:base_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 604, sourceColumn: 1, sourceEndLine: 608, sourceParameters: 'int state', sourceBody: 'if (state && m_irq_mask)
		m_maincpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:base_state.base/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_hyperspt)'], member: 'm_gfxdecode', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 640, sourceColumn: 2, sourceEndLine: 640, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:base_state.base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(base_state::palette), 16*16+16*16, 32)'], member: 'm_palette', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 641, sourceColumn: 2, sourceEndLine: 641, clockExpr: 'FUNC(base_state::palette)', paletteEntries: 32};
MERGE (n:KG {id: 'device:base_state.base/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 644, sourceColumn: 2, sourceEndLine: 644};
MERGE (n:KG {id: 'device:base_state.base/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, "soundlatch")'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 646, sourceColumn: 2, sourceEndLine: 646};
MERGE (n:KG {id: 'device:base_state.base/trackfld_audio'}) SET n:Device SET n += {type: 'TRACKFLD_AUDIO', tag: 'trackfld_audio', clock: null, config: ['TRACKFLD_AUDIO(config, m_soundbrd, m_audiocpu, finder_base::DUMMY_TAG)', 'TRACKFLD_AUDIO(config.replace(), m_soundbrd, 0, m_audiocpu, m_vlm)'], member: 'm_soundbrd', cls: 'trackfld_audio_device', clsHierarchy: ['trackfld_audio_device'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 648, sourceColumn: 2, sourceEndLine: 648, clockExpr: 'm_audiocpu', startHandler: 'trackfld_audio_device.device_start'};
MERGE (n:KG {id: 'device:base_state.base/dac'}) SET n:Device SET n += {type: 'DAC_8BIT_R2R', tag: 'dac', clock: 0, config: ['DAC_8BIT_R2R(config, m_dac, 0).add_route(ALL_OUTPUTS, "speaker", 0.4)'], member: 'm_dac', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 650, sourceColumn: 2, sourceEndLine: 650};
MERGE (n:KG {id: 'audioroute:device:base_state.base/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.4, raw: 'DAC_8BIT_R2R(config, m_dac, 0).add_route(ALL_OUTPUTS, "speaker", 0.4)', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 650, sourceColumn: 2, sourceEndLine: 650};
MERGE (n:KG {id: 'device:base_state.base/snsnd'}) SET n:Device SET n += {type: 'SN76489A', tag: 'snsnd', clock: 1789772.625, config: ['SN76489A(config, m_sn, XTAL(14\'318\'181)/8).add_route(ALL_OUTPUTS, "speaker", 1.0)'], member: 'm_sn', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 653, sourceColumn: 2, sourceEndLine: 653};
MERGE (n:KG {id: 'audioroute:device:base_state.base/snsnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'SN76489A(config, m_sn, XTAL(14\'318\'181)/8).add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 653, sourceColumn: 2, sourceEndLine: 653};
MERGE (n:KG {id: 'machine:hyperspt_state.hyperspt'}) SET n:MachineConfig SET n += {cls: 'hyperspt_state', name: 'hyperspt', calls: ['base'], stateMembers: ['{"name":"m_sn76489a_latch","bits":8}', '{"name":"m_irq_mask","bits":8}'], startHandlers: ['base_state.video_start'], devicePatches: ['{"tag":"trackfld_audio","config":["TRACKFLD_AUDIO(config.replace(), m_soundbrd, 0, m_audiocpu, m_vlm)"],"replacementType":"TRACKFLD_AUDIO"}'], sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 656, sourceColumn: 1, sourceEndLine: 667};
MERGE (n:KG {id: 'device:hyperspt_state.hyperspt/vlm'}) SET n:Device SET n += {type: 'VLM5030', tag: 'vlm', clock: 3579545, config: ['VLM5030(config, m_vlm, XTAL(3\'579\'545))', 'm_vlm->add_route(ALL_OUTPUTS, "speaker", 1.0)'], member: 'm_vlm', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 665, sourceColumn: 2, sourceEndLine: 665};
MERGE (n:KG {id: 'audioroute:device:hyperspt_state.hyperspt/vlm/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'm_vlm->add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 666, sourceColumn: 2, sourceEndLine: 666};
MERGE (n:KG {id: 'handler:trackfld_audio_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'trackfld_audio_device', sourceFile: 'src/mame/konami/trackfld_a.cpp', sourceLine: 23, sourceColumn: 1, sourceEndLine: 26, sourceParameters: '', sourceBody: 'save_item(NAME(m_last_irq));'};
MERGE (n:KG {id: 'inputs:hyperspt'}) SET n:InputPorts SET n += {name: 'hyperspt', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 430, sourceColumn: 8, sourceEndLine: 430};
MERGE (n:KG {id: 'inputs:hyperspt/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:hyperspt/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:hyperspt/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:hyperspt/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_COIN3', defaultValue: 4};
MERGE (n:KG {id: 'inputs:hyperspt/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:hyperspt/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:hyperspt/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN4', defaultValue: 32};
MERGE (n:KG {id: 'inputs:hyperspt/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:hyperspt/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:hyperspt/P1_P2'}) SET n:Port SET n += {tag: 'P1_P2', modify: false};
MERGE (n:KG {id: 'inputs:hyperspt/P1_P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(1)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:hyperspt/P1_P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:hyperspt/P1_P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:hyperspt/P1_P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START3', defaultValue: 8};
MERGE (n:KG {id: 'inputs:hyperspt/P1_P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(2)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:hyperspt/P1_P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:hyperspt/P1_P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:hyperspt/P1_P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:hyperspt/P3_P4'}) SET n:Port SET n += {tag: 'P3_P4', modify: false};
MERGE (n:KG {id: 'inputs:hyperspt/P3_P4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(3)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:hyperspt/P3_P4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(3)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:hyperspt/P3_P4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(3)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:hyperspt/P3_P4/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START4', defaultValue: 8};
MERGE (n:KG {id: 'inputs:hyperspt/P3_P4/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(4)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:hyperspt/P3_P4/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(4)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:hyperspt/P3_P4/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(4)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:hyperspt/P3_P4/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:hyperspt/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:hyperspt/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION(#SW1":1,2,3,4")'], name: 'Coin A', defaultValue: 15, location: '#SW1":1,2,3,4"', settings: ['2=4C 1C', '5=3C 1C', '8=2C 1C', '4=3C 2C', '1=4C 3C', '15=1C 1C', '3=3C 4C', '7=2C 3C', '14=1C 2C', '6=2C 5C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C', '9=1C 7C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:hyperspt/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION(#SW1":5,6,7,8")'], name: 'Coin B', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['32=4C 1C', '80=3C 1C', '128=2C 1C', '64=3C 2C', '16=4C 3C', '240=1C 1C', '48=3C 4C', '112=2C 3C', '224=1C 2C', '96=2C 5C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '160=1C 6C', '144=1C 7C', '0=No Coin B']};
MERGE (n:KG {id: 'inputs:hyperspt/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:hyperspt/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW2:1")'], name: 'After Last Event', defaultValue: 1, location: 'SW2:1', settings: ['1=Game Over', '0=Game Continues']};
MERGE (n:KG {id: 'inputs:hyperspt/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SW2:2")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:2', settings: ['0=Upright', '2=Cocktail']};
MERGE (n:KG {id: 'inputs:hyperspt/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:3', settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:hyperspt/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW2:4")'], name: 'World Records', defaultValue: 8, location: 'SW2:4', settings: ['8=Don\'t Erase', '0=Erase on Reset']};
MERGE (n:KG {id: 'inputs:hyperspt/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION("SW2:5,6,7,8")'], name: 'Difficulty', defaultValue: 64, location: 'SW2:5,6,7,8', settings: ['240=Easy 1', '224=Easy 2', '208=Easy 3', '192=Easy 4', '176=Normal 1', '160=Normal 2', '144=Normal 3', '128=Normal 4', '112=Normal 5', '96=Normal 6', '80=Normal 7', '64=Normal 8', '48=Difficult 1', '32=Difficult 2', '16=Difficult 3', '0=Difficult 4']};
MERGE (n:KG {id: 'gfxlayout:hyperspt_charlayout'}) SET n:GfxLayout SET n += {name: 'hyperspt_charlayout', width: 8, height: 8, total: 1024, planes: 4, planeOffsets: [131076, 131072, 4, 0], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:hyperspt_spritelayout'}) SET n:GfxLayout SET n += {name: 'hyperspt_spritelayout', width: 16, height: 16, total: 512, planes: 4, planeOffsets: [262148, 262144, 4, 0], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_hyperspt'}) SET n:GfxDecode SET n += {name: 'gfx_hyperspt', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 569, sourceColumn: 8, sourceEndLine: 569};
MERGE (n:KG {id: 'gfxdecode:gfx_hyperspt/e0'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'hyperspt_spritelayout', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_hyperspt/e1'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'hyperspt_charlayout', colorBase: 256, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:base_state.base/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(base_state::palette), 16*16+16*16, 32)', ownerTag: 'palette', targetClass: 'base_state', targetMethod: 'palette', entries: 32, sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 641};
MERGE (n:KG {id: 'handler:base_state.palette'}) SET n:Handler SET n += {method: 'palette', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 176, sourceColumn: 1, sourceEndLine: 230, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();
	
	

	// compute the color output resistor weights
	double rweights[3], gweights[3], bweights[2];
	compute_resistor_weights(0, 255, -1.0,
			3, &TABLE(0, 1000, 470, 220), rweights, 1000, 0,
			3, &TABLE(0, 1000, 470, 220), gweights, 1000, 0,
			2, &TABLE(0, 470, 220),  bweights, 1000, 0);

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

	// sprites
	for (int i = 0; i < 0x100; i++)
	{
		uint8_t const ctabentry = color_prom[i] & 0x0f;
		palette.set_pen_indirect(i, ctabentry);
	}

	// characters
	for (int i = 0x100; i < 0x200; i++)
	{
		uint8_t const ctabentry = (color_prom[i] & 0x0f) | 0x10;
		palette.set_pen_indirect(i, ctabentry);
	}'};
MERGE (n:KG {id: 'handler:base_state.base'}) SET n:Handler SET n += {method: 'base', ownerClass: 'base_state', sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 610, sourceColumn: 1, sourceEndLine: 654, sourceConstants: ['DEFAULT_ALL_0=0', 'nvram_device::DEFAULT_ALL_0=0'], sourceParameters: 'machine_config &config', sourceBody: '// basic machine hardware
	KONAMI1(config, m_maincpu, XTAL(18\'432\'000) / 12);    // verified on PCB

	Z80(config, m_audiocpu, XTAL(14\'318\'181) / 4);        // verified on PCB

	ls259_device &mainlatch(LS259(config, "mainlatch")); // F2
	mainlatch.q_out_cb<0>().set(FUNC(base_state::flip_screen_set));
	mainlatch.q_out_cb<1>().set(m_soundbrd, FUNC(trackfld_audio_device::sh_irqtrigger_w)); // SOUND ON
	mainlatch.q_out_cb<2>().set_nop(); // END
	mainlatch.q_out_cb<3>().set(FUNC(base_state::coin_counter_w<0>)); // COIN 1
	mainlatch.q_out_cb<4>().set(FUNC(base_state::coin_counter_w<1>)); // COIN 2
	mainlatch.q_out_cb<5>().set_nop(); // SA
	mainlatch.q_out_cb<7>().set(FUNC(base_state::irq_mask_w)); // INT

	NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0);

	WATCHDOG_TIMER(config, "watchdog");

	// video hardware
	SCREEN(config, m_screen, SCREEN_TYPE_RASTER);
	m_screen->set_refresh_hz(60);
	m_screen->set_vblank_time(ATTOSECONDS_IN_USEC(0));
	m_screen->set_size(32*8, 32*8);
	m_screen->set_visarea(0*8, 32*8-1, 2*8, 30*8-1);
	m_screen->set_screen_update(FUNC(base_state::screen_update));
	m_screen->set_palette(m_palette);
	m_screen->screen_vblank().set(FUNC(base_state::vblank_irq));

	GFXDECODE(config, m_gfxdecode, m_palette, gfx_hyperspt);
	PALETTE(config, m_palette, FUNC(base_state::palette), 16*16+16*16, 32);

	// sound hardware
	SPEAKER(config, "speaker").front_center();

	GENERIC_LATCH_8(config, "soundlatch");

	TRACKFLD_AUDIO(config, m_soundbrd, m_audiocpu, finder_base::DUMMY_TAG);

	DAC_8BIT_R2R(config, m_dac, 0).add_route(ALL_OUTPUTS, "speaker", 0.4); // unknown DAC

	// According to the schematics, part number scratched off
	SN76489A(config, m_sn, XTAL(14\'318\'181)/8).add_route(ALL_OUTPUTS, "speaker", 1.0);  // clock verified on PCB'};
MATCH (a:KG {id: 'game:hyperspt'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 949, sourceColumn: 1, sourceEndLine: 949};
MATCH (a:KG {id: 'game:hyperspt'}), (b:KG {id: 'machine:hyperspt_state.hyperspt'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:hyperspt'}), (b:KG {id: 'inputs:hyperspt'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:hyperspt'}), (b:KG {id: 'romset:hyperspt'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:hyprolyb.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:konami1.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:konamipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:trackfld_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:cpu/m6800/m6800.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:cpu/m6809/m6809.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:sound/vlm5030.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/hyperspt.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:hyperspt_state.hyperspt'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 656, sourceColumn: 1, sourceEndLine: 667};
MATCH (a:KG {id: 'machine:hyperspt_state.hyperspt'}), (b:KG {id: 'handler:base_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:hyperspt_state.hyperspt'}), (b:KG {id: 'machine:base_state.base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:hyperspt_state.hyperspt'}), (b:KG {id: 'map:base_state.hyperspt_common_main_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:hyperspt_state.hyperspt'}), (b:KG {id: 'map:hyperspt_state.sound_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'audiocpu'};
MATCH (a:KG {id: 'machine:hyperspt_state.hyperspt'}), (b:KG {id: 'device:hyperspt_state.hyperspt/vlm'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:hyperspt'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 430, sourceColumn: 8, sourceEndLine: 430};
MATCH (a:KG {id: 'inputs:hyperspt'}), (b:KG {id: 'inputs:hyperspt/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:hyperspt'}), (b:KG {id: 'inputs:hyperspt/P1_P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:hyperspt'}), (b:KG {id: 'inputs:hyperspt/P3_P4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:hyperspt'}), (b:KG {id: 'inputs:hyperspt/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:hyperspt'}), (b:KG {id: 'inputs:hyperspt/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:hyperspt'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 713, sourceColumn: 1, sourceEndLine: 713};
MATCH (a:KG {id: 'romset:hyperspt'}), (b:KG {id: 'region:hyperspt/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:hyperspt'}), (b:KG {id: 'region:hyperspt/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:hyperspt'}), (b:KG {id: 'region:hyperspt/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:hyperspt'}), (b:KG {id: 'region:hyperspt/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:hyperspt'}), (b:KG {id: 'region:hyperspt/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:hyperspt'}), (b:KG {id: 'region:hyperspt/vlm'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:base_state.video_start'}), (b:KG {id: 'handler:base_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 610, sourceColumn: 1, sourceEndLine: 654};
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'handler:base_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'gfxdecode:gfx_hyperspt'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/trackfld_audio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:base_state.base'}), (b:KG {id: 'device:base_state.base/snsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:base_state.hyperspt_common_main_map'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 362, sourceColumn: 1, sourceEndLine: 367};
MATCH (a:KG {id: 'map:base_state.hyperspt_common_main_map'}), (b:KG {id: 'map:base_state.common_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:base_state.hyperspt_common_main_map'}), (b:KG {id: 'map:base_state.hyperspt_common_main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.hyperspt_common_main_map'}), (b:KG {id: 'map:base_state.hyperspt_common_main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:hyperspt_state.sound_map'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 387, sourceColumn: 1, sourceEndLine: 392};
MATCH (a:KG {id: 'map:hyperspt_state.sound_map'}), (b:KG {id: 'map:base_state.common_sound_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:hyperspt_state.sound_map'}), (b:KG {id: 'map:hyperspt_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:hyperspt_state.sound_map'}), (b:KG {id: 'map:hyperspt_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:hyperspt_state.hyperspt/vlm'}), (b:KG {id: 'audioroute:device:hyperspt_state.hyperspt/vlm/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/SYSTEM'}), (b:KG {id: 'inputs:hyperspt/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/SYSTEM'}), (b:KG {id: 'inputs:hyperspt/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/SYSTEM'}), (b:KG {id: 'inputs:hyperspt/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/SYSTEM'}), (b:KG {id: 'inputs:hyperspt/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/SYSTEM'}), (b:KG {id: 'inputs:hyperspt/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/SYSTEM'}), (b:KG {id: 'inputs:hyperspt/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/SYSTEM'}), (b:KG {id: 'inputs:hyperspt/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/SYSTEM'}), (b:KG {id: 'inputs:hyperspt/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P1_P2'}), (b:KG {id: 'inputs:hyperspt/P1_P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P1_P2'}), (b:KG {id: 'inputs:hyperspt/P1_P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P1_P2'}), (b:KG {id: 'inputs:hyperspt/P1_P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P1_P2'}), (b:KG {id: 'inputs:hyperspt/P1_P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P1_P2'}), (b:KG {id: 'inputs:hyperspt/P1_P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P1_P2'}), (b:KG {id: 'inputs:hyperspt/P1_P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P1_P2'}), (b:KG {id: 'inputs:hyperspt/P1_P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P1_P2'}), (b:KG {id: 'inputs:hyperspt/P1_P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P3_P4'}), (b:KG {id: 'inputs:hyperspt/P3_P4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P3_P4'}), (b:KG {id: 'inputs:hyperspt/P3_P4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P3_P4'}), (b:KG {id: 'inputs:hyperspt/P3_P4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P3_P4'}), (b:KG {id: 'inputs:hyperspt/P3_P4/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P3_P4'}), (b:KG {id: 'inputs:hyperspt/P3_P4/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P3_P4'}), (b:KG {id: 'inputs:hyperspt/P3_P4/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P3_P4'}), (b:KG {id: 'inputs:hyperspt/P3_P4/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/P3_P4'}), (b:KG {id: 'inputs:hyperspt/P3_P4/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/DSW1'}), (b:KG {id: 'inputs:hyperspt/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/DSW1'}), (b:KG {id: 'inputs:hyperspt/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/DSW2'}), (b:KG {id: 'inputs:hyperspt/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/DSW2'}), (b:KG {id: 'inputs:hyperspt/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/DSW2'}), (b:KG {id: 'inputs:hyperspt/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/DSW2'}), (b:KG {id: 'inputs:hyperspt/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:hyperspt/DSW2'}), (b:KG {id: 'inputs:hyperspt/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:hyperspt/maincpu'}), (b:KG {id: 'rom:hyperspt/maincpu/c01'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/maincpu'}), (b:KG {id: 'rom:hyperspt/maincpu/c02'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/maincpu'}), (b:KG {id: 'rom:hyperspt/maincpu/c03'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/maincpu'}), (b:KG {id: 'rom:hyperspt/maincpu/c04'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/maincpu'}), (b:KG {id: 'rom:hyperspt/maincpu/c05'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/maincpu'}), (b:KG {id: 'rom:hyperspt/maincpu/c06'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/audiocpu'}), (b:KG {id: 'rom:hyperspt/audiocpu/c10'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/audiocpu'}), (b:KG {id: 'rom:hyperspt/audiocpu/c09'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/sprites'}), (b:KG {id: 'rom:hyperspt/sprites/c14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/sprites'}), (b:KG {id: 'rom:hyperspt/sprites/c13'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/sprites'}), (b:KG {id: 'rom:hyperspt/sprites/c12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/sprites'}), (b:KG {id: 'rom:hyperspt/sprites/c11'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/sprites'}), (b:KG {id: 'rom:hyperspt/sprites/c18'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/sprites'}), (b:KG {id: 'rom:hyperspt/sprites/c17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/sprites'}), (b:KG {id: 'rom:hyperspt/sprites/c16'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/sprites'}), (b:KG {id: 'rom:hyperspt/sprites/c15'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/tiles'}), (b:KG {id: 'rom:hyperspt/tiles/c26'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/tiles'}), (b:KG {id: 'rom:hyperspt/tiles/c24'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/tiles'}), (b:KG {id: 'rom:hyperspt/tiles/c22'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/tiles'}), (b:KG {id: 'rom:hyperspt/tiles/c20'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/proms'}), (b:KG {id: 'rom:hyperspt/proms/c03_c27.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/proms'}), (b:KG {id: 'rom:hyperspt/proms/j12_c28.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/proms'}), (b:KG {id: 'rom:hyperspt/proms/a09_c29.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:hyperspt/vlm'}), (b:KG {id: 'rom:hyperspt/vlm/c08'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch'}), (b:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch'}), (b:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch'}), (b:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch'}), (b:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch'}), (b:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch'}), (b:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch'}), (b:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:base_state.base/screen'}), (b:KG {id: 'device:base_state.base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:base_state.base/screen'}), (b:KG {id: 'device:base_state.base/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_hyperspt'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 569, sourceColumn: 8, sourceEndLine: 569};
MATCH (a:KG {id: 'gfxdecode:gfx_hyperspt'}), (b:KG {id: 'gfxdecode:gfx_hyperspt/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_hyperspt'}), (b:KG {id: 'gfxdecode:gfx_hyperspt/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:base_state.base/palette'}), (b:KG {id: 'device:base_state.base/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:base_state.base/trackfld_audio'}), (b:KG {id: 'handler:trackfld_audio_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:base_state.base/dac'}), (b:KG {id: 'audioroute:device:base_state.base/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:base_state.base/snsnd'}), (b:KG {id: 'audioroute:device:base_state.base/snsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 360};
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_map'}), (b:KG {id: 'map:base_state.common_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_sound_map'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/hyperspt.cpp', sourceLine: 376, sourceColumn: 1, sourceEndLine: 385};
MATCH (a:KG {id: 'map:base_state.common_sound_map'}), (b:KG {id: 'map:base_state.common_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_sound_map'}), (b:KG {id: 'map:base_state.common_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_sound_map'}), (b:KG {id: 'map:base_state.common_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_sound_map'}), (b:KG {id: 'map:base_state.common_sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_sound_map'}), (b:KG {id: 'map:base_state.common_sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_sound_map'}), (b:KG {id: 'map:base_state.common_sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:base_state.common_sound_map'}), (b:KG {id: 'map:base_state.common_sound_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:hyperspt_state.sound_map/range0'}), (b:KG {id: 'handler:vlm5030_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'vlm'};
MATCH (a:KG {id: 'map:hyperspt_state.sound_map/range1'}), (b:KG {id: 'handler:trackfld_audio_device.hyperspt_sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'trackfld_audio'};
MATCH (a:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:base_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:1'}), (b:KG {id: 'handler:trackfld_audio_device.sh_irqtrigger_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:3'}), (b:KG {id: 'handler:base_state.coin_counter_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:4'}), (b:KG {id: 'handler:base_state.coin_counter_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:base_state.base/mainlatch/callback:mainlatch:6'}), (b:KG {id: 'handler:base_state.irq_mask_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:base_state.base/screen/callback:screen:0'}), (b:KG {id: 'handler:base_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:base_state.base/screen/callback:screen:1'}), (b:KG {id: 'handler:base_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_hyperspt/e0'}), (b:KG {id: 'gfxlayout:hyperspt_spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_hyperspt/e1'}), (b:KG {id: 'gfxlayout:hyperspt_charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:base_state.base/palette/callback:palette_init'}), (b:KG {id: 'handler:base_state.palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:base_state.common_map/range2'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:base_state.common_map/range3'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:base_state.common_map/range4'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:base_state.common_map/range8'}), (b:KG {id: 'handler:base_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:base_state.common_map/range9'}), (b:KG {id: 'handler:base_state.colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:base_state.common_sound_map/range2'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:base_state.common_sound_map/range3'}), (b:KG {id: 'handler:trackfld_audio_device.hyperspt_sh_timer_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'trackfld_audio'};
MATCH (a:KG {id: 'map:base_state.common_sound_map/range4'}), (b:KG {id: 'handler:dac_byte_interface.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'dac'};
MATCH (a:KG {id: 'map:base_state.common_sound_map/range5'}), (b:KG {id: 'handler:hyperspt_state.konami_sn76489a_latch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:base_state.common_sound_map/range6'}), (b:KG {id: 'handler:hyperspt_state.konami_sn76489a_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:base_state.screen_update'}), (b:KG {id: 'handler:base_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:hyperspt_spritelayout'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:hyperspt_charlayout'}), (b:KG {id: 'file:src/mame/konami/hyperspt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:base_state.palette'}), (b:KG {id: 'handler:base_state.base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:hyperspt_state.konami_sn76489a_w'}), (b:KG {id: 'handler:hyprolyb_adpcm_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:base_state.base'}), (b:KG {id: 'handler:trackfld_audio_device.sh_irqtrigger_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:base_state.base'}), (b:KG {id: 'handler:base_state.coin_counter_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:base_state.base'}), (b:KG {id: 'handler:base_state.coin_counter_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:base_state.base'}), (b:KG {id: 'handler:base_state.irq_mask_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:base_state.base'}), (b:KG {id: 'handler:base_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:base_state.base'}), (b:KG {id: 'handler:base_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:base_state.base'}), (b:KG {id: 'handler:base_state.palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
