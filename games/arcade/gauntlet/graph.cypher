// mamekit knowledge graph — driver src/mame/atari/gauntlet.cpp
// generated 2026-09-05T03:49:34.512Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/atari/gauntlet.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:atarimo.h'}) SET n:SourceFile SET n += {path: 'atarimo.h', external: true};
MERGE (n:KG {id: 'file:slapstic.h'}) SET n:SourceFile SET n += {path: 'slapstic.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:cpu/m68000/m68010.h'}) SET n:SourceFile SET n += {path: 'cpu/m68000/m68010.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:machine/eeprompar.h'}) SET n:SourceFile SET n += {path: 'machine/eeprompar.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/timer.h'}) SET n:SourceFile SET n += {path: 'machine/timer.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/pokey.h'}) SET n:SourceFile SET n += {path: 'sound/pokey.h', external: true};
MERGE (n:KG {id: 'file:sound/tms5220.h'}) SET n:SourceFile SET n += {path: 'sound/tms5220.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopm.h'}) SET n:SourceFile SET n += {path: 'sound/ymopm.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'game:gauntlet'}) SET n:Game SET n += {name: 'gauntlet', year: '1985', company: 'Atari Games', fullname: 'Gauntlet (rev 14)', monitor: 'ROT0', cls: 'gauntlet_state', init: 'init_gauntlet', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 2098, sourceColumn: 1, sourceEndLine: 2098};
MERGE (n:KG {id: 'romset:gauntlet'}) SET n:RomSet SET n += {name: 'gauntlet', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 897, sourceColumn: 1, sourceEndLine: 897};
MERGE (n:KG {id: 'region:gauntlet/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 524288, flags: '0', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 861, sourceColumn: 2, sourceEndLine: 861};
MERGE (n:KG {id: 'rom:gauntlet/maincpu/136037-1307.9a'}) SET n:Rom SET n += {file: '136037-1307.9a', offset: 32768, size: 16384, crc: '46fe8743', sha1: 'd5fa19e028a2f43658330c67c10e0c811d332780', skip: 1, continueSegments: [0, 16384, 16384]};
MERGE (n:KG {id: 'rom:gauntlet/maincpu/136037-1308.9b'}) SET n:Rom SET n += {file: '136037-1308.9b', offset: 32769, size: 16384, crc: '276e15c4', sha1: '7467b2ec21b1b4fcc18ff9387ce891495f4b064c', skip: 1, continueSegments: [1, 16384, 16384]};
MERGE (n:KG {id: 'rom:gauntlet/maincpu/136037-205.10a'}) SET n:Rom SET n += {file: '136037-205.10a', offset: 229376, size: 16384, crc: '6d99ed51', sha1: 'a7bc18f32908451859ba5cdf1a5c97ecc5fe325f', skip: 1};
MERGE (n:KG {id: 'rom:gauntlet/maincpu/136037-206.10b'}) SET n:Rom SET n += {file: '136037-206.10b', offset: 229377, size: 16384, crc: '545ead91', sha1: '7fad5a63c6443249bb6dad5b2a1fd08ca5f11e10', skip: 1};
MERGE (n:KG {id: 'rom:gauntlet/maincpu/136037-1409.7a'}) SET n:Rom SET n += {file: '136037-1409.7a', offset: 294912, size: 16384, crc: '6fb8419c', sha1: '299fee0368f6027bacbb57fb469e817e64e0e41d', skip: 1, continueSegments: [262144, 16384, 16384]};
MERGE (n:KG {id: 'rom:gauntlet/maincpu/136037-1410.7b'}) SET n:Rom SET n += {file: '136037-1410.7b', offset: 294913, size: 16384, crc: '931bd2a0', sha1: 'd69b45758d1c252a93dbc2263efa9de1f972f62e', skip: 1, continueSegments: [262145, 16384, 16384]};
MERGE (n:KG {id: 'region:gauntlet/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 873, sourceColumn: 2, sourceEndLine: 873};
MERGE (n:KG {id: 'rom:gauntlet/audiocpu/136037-120.16r'}) SET n:Rom SET n += {file: '136037-120.16r', offset: 16384, size: 16384, crc: '6ee7f3cc', sha1: 'b86676340b06f07c164690862c1f6f75f30c080b', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 874, sourceColumn: 2, sourceEndLine: 874};
MERGE (n:KG {id: 'rom:gauntlet/audiocpu/136037-119.16s'}) SET n:Rom SET n += {file: '136037-119.16s', offset: 32768, size: 32768, crc: 'fa19861f', sha1: '7568b4ab526bd5849f7ef70dfa6d1ef1f30c0abc', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 875, sourceColumn: 2, sourceEndLine: 875};
MERGE (n:KG {id: 'region:gauntlet/chars'}) SET n:RomRegion SET n += {tag: 'chars', size: 16384, flags: '0', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 877, sourceColumn: 2, sourceEndLine: 877};
MERGE (n:KG {id: 'rom:gauntlet/chars/136037-104.6p'}) SET n:Rom SET n += {file: '136037-104.6p', offset: 0, size: 16384, crc: '6c276a1d', sha1: 'ec383a8fdcb28efb86b7f6ba4a3306fea5a09d72', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 878, sourceColumn: 2, sourceEndLine: 878};
MERGE (n:KG {id: 'region:gauntlet/spr_tiles'}) SET n:RomRegion SET n += {tag: 'spr_tiles', size: 262144, flags: 'ROMREGION_INVERT', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 880, sourceColumn: 2, sourceEndLine: 880};
MERGE (n:KG {id: 'rom:gauntlet/spr_tiles/136037-111.1a'}) SET n:Rom SET n += {file: '136037-111.1a', offset: 0, size: 32768, crc: '91700f33', sha1: 'fac1ce700c4cd46b643307998df781d637f193aa', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 881, sourceColumn: 2, sourceEndLine: 881};
MERGE (n:KG {id: 'rom:gauntlet/spr_tiles/136037-112.1b'}) SET n:Rom SET n += {file: '136037-112.1b', offset: 32768, size: 32768, crc: '869330be', sha1: '5dfaaf54ee2b3c0eaf35e8c17558313db9791616', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 882, sourceColumn: 2, sourceEndLine: 882};
MERGE (n:KG {id: 'rom:gauntlet/spr_tiles/136037-113.1l'}) SET n:Rom SET n += {file: '136037-113.1l', offset: 65536, size: 32768, crc: 'd497d0a8', sha1: 'bb715bcec7f783dd04151e2e3b221a72133bf17d', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 883, sourceColumn: 2, sourceEndLine: 883};
MERGE (n:KG {id: 'rom:gauntlet/spr_tiles/136037-114.1mn'}) SET n:Rom SET n += {file: '136037-114.1mn', offset: 98304, size: 32768, crc: '29ef9882', sha1: '91e1465af6505b35cd97434c13d2b4d40a085946', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 884, sourceColumn: 2, sourceEndLine: 884};
MERGE (n:KG {id: 'rom:gauntlet/spr_tiles/136037-115.2a'}) SET n:Rom SET n += {file: '136037-115.2a', offset: 131072, size: 32768, crc: '9510b898', sha1: 'e6c8c7af1898d548f0f01e4ff37c2c7b22c0b5c2', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 885, sourceColumn: 2, sourceEndLine: 885};
MERGE (n:KG {id: 'rom:gauntlet/spr_tiles/136037-116.2b'}) SET n:Rom SET n += {file: '136037-116.2b', offset: 163840, size: 32768, crc: '11e0ac5b', sha1: '729b7561d59d94ef33874a134b97bcd37573dfa6', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 886, sourceColumn: 2, sourceEndLine: 886};
MERGE (n:KG {id: 'rom:gauntlet/spr_tiles/136037-117.2l'}) SET n:Rom SET n += {file: '136037-117.2l', offset: 196608, size: 32768, crc: '29a5db41', sha1: '94f4f5dd39e724570a0f54af176ad018497697fd', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 887, sourceColumn: 2, sourceEndLine: 887};
MERGE (n:KG {id: 'rom:gauntlet/spr_tiles/136037-118.2mn'}) SET n:Rom SET n += {file: '136037-118.2mn', offset: 229376, size: 32768, crc: '8bf3b263', sha1: '683d900ab7591ee661218be2406fb375a12e435c', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 888, sourceColumn: 2, sourceEndLine: 888};
MERGE (n:KG {id: 'region:gauntlet/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 1280, flags: '0', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 890, sourceColumn: 2, sourceEndLine: 890};
MERGE (n:KG {id: 'rom:gauntlet/proms/74s472-136037-101.7u'}) SET n:Rom SET n += {file: '74s472-136037-101.7u', offset: 0, size: 512, crc: '2964f76f', sha1: 'da966c35557ec1b95e1c39cd950c38a19bce2d67', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 891, sourceColumn: 2, sourceEndLine: 891};
MERGE (n:KG {id: 'rom:gauntlet/proms/74s472-136037-102.5l'}) SET n:Rom SET n += {file: '74s472-136037-102.5l', offset: 512, size: 512, crc: '4d4fec6c', sha1: '3541b5c6405ad5742a3121dfd6acb227933de25a', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 892, sourceColumn: 2, sourceEndLine: 892};
MERGE (n:KG {id: 'rom:gauntlet/proms/74s287-136037-103.4r'}) SET n:Rom SET n += {file: '74s287-136037-103.4r', offset: 1024, size: 256, crc: '6c5ccf08', sha1: 'ff5dbadd85aa2e07b383a302fa399e875db8f84f', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 893, sourceColumn: 2, sourceEndLine: 893};
MERGE (n:KG {id: 'map:gauntlet_state.main_map'}) SET n:AddressMap SET n += {cls: 'gauntlet_state', name: 'main_map', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 540, sourceColumn: 1, sourceEndLine: 571, unmapHigh: true};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 229375, raw: 'map(0x000000, 0x037fff).mirror(0x280000).rom()', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 543, sourceColumn: 2, sourceEndLine: 543, mirror: 2621440, rom: true};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range1'}) SET n:AddressRange SET n += {start: 229376, end: 237567, raw: 'map(0x038000, 0x039fff).mirror(0x286000).bankr(m_slapstic_bank)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 544, sourceColumn: 2, sourceEndLine: 544, mirror: 2646016, bankRead: 'slapstic_bank'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range2'}) SET n:AddressRange SET n += {start: 262144, end: 524287, raw: 'map(0x040000, 0x07ffff).mirror(0x280000).rom()', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 545, sourceColumn: 2, sourceEndLine: 545, mirror: 2621440, rom: true};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range3'}) SET n:AddressRange SET n += {start: 8388608, end: 8396799, raw: 'map(0x800000, 0x801fff).mirror(0x2fc000).ram()', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 548, sourceColumn: 2, sourceEndLine: 548, mirror: 3129344, ram: true};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range4'}) SET n:AddressRange SET n += {start: 8396800, end: 8397823, raw: 'map(0x802000, 0x8023ff).mirror(0x2fcc00).rw("eeprom", FUNC(eeprom_parallel_28xx_device::read), FUNC(eeprom_parallel_28xx_device::write)).umask16(0x00ff)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 549, sourceColumn: 2, sourceEndLine: 549, mirror: 3132416, umask: 255};
MERGE (n:KG {id: 'handler:eeprom_parallel_28xx_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'eeprom_parallel_28xx_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 549, sourceColumn: 2, sourceEndLine: 549};
MERGE (n:KG {id: 'handler:eeprom_parallel_28xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'eeprom_parallel_28xx_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 549, sourceColumn: 2, sourceEndLine: 549};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range5'}) SET n:AddressRange SET n += {start: 8400896, end: 8400897, raw: 'map(0x803000, 0x803001).mirror(0x2fcef0).portr("803000")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 550, sourceColumn: 2, sourceEndLine: 550, mirror: 3133168, portRead: '803000'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range6'}) SET n:AddressRange SET n += {start: 8400898, end: 8400899, raw: 'map(0x803002, 0x803003).mirror(0x2fcef0).portr("803002")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 551, sourceColumn: 2, sourceEndLine: 551, mirror: 3133168, portRead: '803002'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range7'}) SET n:AddressRange SET n += {start: 8400900, end: 8400901, raw: 'map(0x803004, 0x803005).mirror(0x2fcef0).portr("803004")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 552, sourceColumn: 2, sourceEndLine: 552, mirror: 3133168, portRead: '803004'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range8'}) SET n:AddressRange SET n += {start: 8400902, end: 8400903, raw: 'map(0x803006, 0x803007).mirror(0x2fcef0).portr("803006")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 553, sourceColumn: 2, sourceEndLine: 553, mirror: 3133168, portRead: '803006'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range9'}) SET n:AddressRange SET n += {start: 8400904, end: 8400905, raw: 'map(0x803008, 0x803009).mirror(0x2fcef0).portr("803008")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 554, sourceColumn: 2, sourceEndLine: 554, mirror: 3133168, portRead: '803008'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range10'}) SET n:AddressRange SET n += {start: 8400911, end: 8400911, raw: 'map(0x80300f, 0x80300f).mirror(0x2fcef0).r(m_mainlatch, FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 555, sourceColumn: 2, sourceEndLine: 555, mirror: 3133168};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 587, sourceColumn: 2, sourceEndLine: 587};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range11'}) SET n:AddressRange SET n += {start: 8401152, end: 8401153, raw: 'map(0x803100, 0x803101).mirror(0x2fce8e).w("watchdog", FUNC(watchdog_timer_device::reset16_w))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 556, sourceColumn: 2, sourceEndLine: 556, mirror: 3133070};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset16_w'}) SET n:Handler SET n += {method: 'reset16_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 556, sourceColumn: 2, sourceEndLine: 556};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range12'}) SET n:AddressRange SET n += {start: 8401184, end: 8401199, raw: 'map(0x803120, 0x80312f).mirror(0x2fce80).w("outlatch", FUNC(ls259_device::write_d0)).umask16(0x00ff)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 557, sourceColumn: 2, sourceEndLine: 557, mirror: 3133056, umask: 255};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 557, sourceColumn: 2, sourceEndLine: 557};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range13'}) SET n:AddressRange SET n += {start: 8401216, end: 8401217, raw: 'map(0x803140, 0x803141).mirror(0x2fce8e).w(FUNC(gauntlet_state::video_int_ack_w))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 558, sourceColumn: 2, sourceEndLine: 558, mirror: 3133070};
MERGE (n:KG {id: 'handler:gauntlet_state.video_int_ack_w'}) SET n:Handler SET n += {method: 'video_int_ack_w', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 431, sourceColumn: 1, sourceEndLine: 434, sourceParameters: 'uint16_t data', sourceBody: 'm_maincpu->set_input_line(M68K_IRQ_4, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range14'}) SET n:AddressRange SET n += {start: 8401232, end: 8401233, raw: 'map(0x803150, 0x803151).mirror(0x2fce8e).w("eeprom", FUNC(eeprom_parallel_28xx_device::unlock_write16))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 559, sourceColumn: 2, sourceEndLine: 559, mirror: 3133070};
MERGE (n:KG {id: 'handler:eeprom_parallel_28xx_device.unlock_write16'}) SET n:Handler SET n += {method: 'unlock_write16', ownerClass: 'eeprom_parallel_28xx_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 559, sourceColumn: 2, sourceEndLine: 559};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range15'}) SET n:AddressRange SET n += {start: 8401265, end: 8401265, raw: 'map(0x803171, 0x803171).mirror(0x2fce8e).w(m_soundlatch, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 560, sourceColumn: 2, sourceEndLine: 560, mirror: 3133070};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 586, sourceColumn: 2, sourceEndLine: 586};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range16'}) SET n:AddressRange SET n += {start: 9437184, end: 9445375, raw: 'map(0x900000, 0x901fff).mirror(0x2c8000).ram().w(m_playfield_tilemap, FUNC(tilemap_device::write16)).share("playfield")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 563, sourceColumn: 2, sourceEndLine: 563, mirror: 2916352, ram: true, share: 'playfield'};
MERGE (n:KG {id: 'handler:tilemap_device.write16'}) SET n:Handler SET n += {method: 'write16', ownerClass: 'tilemap_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 566, sourceColumn: 2, sourceEndLine: 566};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range17'}) SET n:AddressRange SET n += {start: 9445376, end: 9453567, raw: 'map(0x902000, 0x903fff).mirror(0x2c8000).ram().share("mob")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 564, sourceColumn: 2, sourceEndLine: 564, mirror: 2916352, ram: true, share: 'mob'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range18'}) SET n:AddressRange SET n += {start: 9453568, end: 9457663, raw: 'map(0x904000, 0x904fff).mirror(0x2c8000).ram()', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 565, sourceColumn: 2, sourceEndLine: 565, mirror: 2916352, ram: true};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range19'}) SET n:AddressRange SET n += {start: 9457664, end: 9461631, raw: 'map(0x905000, 0x905f7f).mirror(0x2c8000).ram().w(m_alpha_tilemap, FUNC(tilemap_device::write16)).share("alpha")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 566, sourceColumn: 2, sourceEndLine: 566, mirror: 2916352, ram: true, share: 'alpha'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range20'}) SET n:AddressRange SET n += {start: 9461614, end: 9461615, raw: 'map(0x905f6e, 0x905f6f).mirror(0x2c8000).ram().w(FUNC(gauntlet_state::yscroll_w)).share(m_yscroll)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 567, sourceColumn: 2, sourceEndLine: 567, mirror: 2916352, ram: true, share: 'yscroll'};
MERGE (n:KG {id: 'handler:gauntlet_state.yscroll_w'}) SET n:Handler SET n += {method: 'yscroll_w', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 347, sourceColumn: 1, sourceEndLine: 368, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'uint16_t const oldyscroll = *m_yscroll;
	COMBINE_DATA(m_yscroll);

	// if something changed, force a partial update
	if (*m_yscroll != oldyscroll)
	{
		m_screen->update_partial(m_screen->vpos());

		// if the bank changed, mark all tiles dirty
		if (m_playfield_tile_bank != (*m_yscroll & 3))
		{
			m_playfield_tile_bank = *m_yscroll & 3;
			m_playfield_tilemap->mark_all_dirty();
		}

		// adjust the scrolls
		m_playfield_tilemap->set_scrolly(0, *m_yscroll >> 7);
		m_mob->set_yscroll((*m_yscroll >> 7) & 0x1ff);
	}'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range21'}) SET n:AddressRange SET n += {start: 9461632, end: 9461759, raw: 'map(0x905f80, 0x905fff).mirror(0x2c8000).ram().share("mob:slip")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 568, sourceColumn: 2, sourceEndLine: 568, mirror: 2916352, ram: true, share: 'mob:slip'};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range22'}) SET n:AddressRange SET n += {start: 9502720, end: 9504767, raw: 'map(0x910000, 0x9107ff).mirror(0x2cf800).ram().w("palette", FUNC(palette_device::write16)).share("palette")', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 569, sourceColumn: 2, sourceEndLine: 569, mirror: 2947072, ram: true, share: 'palette'};
MERGE (n:KG {id: 'handler:palette_device.write16'}) SET n:Handler SET n += {method: 'write16', ownerClass: 'palette_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 569, sourceColumn: 2, sourceEndLine: 569};
MERGE (n:KG {id: 'map:gauntlet_state.main_map/range23'}) SET n:AddressRange SET n += {start: 9633792, end: 9633793, raw: 'map(0x930000, 0x930001).mirror(0x2cfffe).w(FUNC(gauntlet_state::xscroll_w)).share(m_xscroll)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 570, sourceColumn: 2, sourceEndLine: 570, mirror: 2949118, share: 'xscroll'};
MERGE (n:KG {id: 'handler:gauntlet_state.xscroll_w'}) SET n:Handler SET n += {method: 'xscroll_w', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 323, sourceColumn: 1, sourceEndLine: 337, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'uint16_t const oldxscroll = *m_xscroll;
	COMBINE_DATA(m_xscroll);

	// if something changed, force a partial update
	if (*m_xscroll != oldxscroll)
	{
		m_screen->update_partial(m_screen->vpos());

		// adjust the scrolls
		m_playfield_tilemap->set_scrollx(0, *m_xscroll);
		m_mob->set_xscroll(*m_xscroll & 0x1ff);
	}'};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map'}) SET n:AddressMap SET n += {cls: 'gauntlet_state', name: 'sound_map', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 582, sourceColumn: 1, sourceEndLine: 596, unmapHigh: true};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).mirror(0x2000).ram()', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 585, sourceColumn: 2, sourceEndLine: 585, mirror: 8192, ram: true};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 4096, end: 4111, raw: 'map(0x1000, 0x100f).mirror(0x27c0).w(m_mainlatch, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 586, sourceColumn: 2, sourceEndLine: 586, mirror: 10176};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 4112, end: 4127, raw: 'map(0x1010, 0x101f).mirror(0x27c0).r(m_soundlatch, FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 587, sourceColumn: 2, sourceEndLine: 587, mirror: 10176};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range3'}) SET n:AddressRange SET n += {start: 4128, end: 4143, raw: 'map(0x1020, 0x102f).mirror(0x27c0).portr("COIN").w(FUNC(gauntlet_state::mixer_w))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 588, sourceColumn: 2, sourceEndLine: 588, mirror: 10176, portRead: 'COIN'};
MERGE (n:KG {id: 'handler:gauntlet_state.mixer_w'}) SET n:Handler SET n += {method: 'mixer_w', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 524, sourceColumn: 1, sourceEndLine: 529, sourceParameters: 'uint8_t data', sourceBody: 'm_ym2151->set_output_gain(ALL_OUTPUTS, (data & 7) / 7.0f);
	m_pokey->set_output_gain(ALL_OUTPUTS, ((data >> 3) & 3) / 3.0f);
	m_tms5220->set_output_gain(ALL_OUTPUTS, ((data >> 5) & 7) / 7.0f);'};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range4'}) SET n:AddressRange SET n += {start: 4144, end: 4144, raw: 'map(0x1030, 0x1030).mirror(0x27cf).r(FUNC(gauntlet_state::switch_6502_r))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 589, sourceColumn: 2, sourceEndLine: 589, mirror: 10191};
MERGE (n:KG {id: 'handler:gauntlet_state.switch_6502_r'}) SET n:Handler SET n += {method: 'switch_6502_r', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 485, sourceColumn: 1, sourceEndLine: 495, sourceParameters: '', sourceBody: 'int temp = 0x30;

	if (m_soundlatch->pending_r()) temp ^= 0x80;
	if (m_mainlatch->pending_r()) temp ^= 0x40;
	if (!m_tms5220->readyq_r()) temp ^= 0x20;
	if (BIT(~m_803008->read(), 3)) temp ^= 0x10;

	return temp;', inputMembers: ['m_803008=803008']};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range5'}) SET n:AddressRange SET n += {start: 4144, end: 4151, raw: 'map(0x1030, 0x1037).mirror(0x27c8).w(m_soundctl, FUNC(ls259_device::write_d7))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 590, sourceColumn: 2, sourceEndLine: 590, mirror: 10184};
MERGE (n:KG {id: 'handler:ls259_device.write_d7'}) SET n:Handler SET n += {method: 'write_d7', ownerClass: 'ls259_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 590, sourceColumn: 2, sourceEndLine: 590};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range6'}) SET n:AddressRange SET n += {start: 6144, end: 6159, raw: 'map(0x1800, 0x180f).mirror(0x27c0).rw(m_pokey, FUNC(pokey_device::read), FUNC(pokey_device::write))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591, mirror: 10176};
MERGE (n:KG {id: 'handler:pokey_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591};
MERGE (n:KG {id: 'handler:pokey_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range7'}) SET n:AddressRange SET n += {start: 6160, end: 6161, raw: 'map(0x1810, 0x1811).mirror(0x27ce).rw(m_ym2151, FUNC(ym2151_device::read), FUNC(ym2151_device::write))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 592, sourceColumn: 2, sourceEndLine: 592, mirror: 10190};
MERGE (n:KG {id: 'handler:ym2151_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2151_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 592, sourceColumn: 2, sourceEndLine: 592};
MERGE (n:KG {id: 'handler:ym2151_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2151_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 592, sourceColumn: 2, sourceEndLine: 592};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range8'}) SET n:AddressRange SET n += {start: 6176, end: 6191, raw: 'map(0x1820, 0x182f).mirror(0x27c0).w(m_tms5220, FUNC(tms5220_device::data_w))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 593, sourceColumn: 2, sourceEndLine: 593, mirror: 10176};
MERGE (n:KG {id: 'handler:tms5220_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'tms5220_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 593, sourceColumn: 2, sourceEndLine: 593};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range9'}) SET n:AddressRange SET n += {start: 6192, end: 6207, raw: 'map(0x1830, 0x183f).mirror(0x27c0).rw(FUNC(gauntlet_state::sound_irq_ack_r), FUNC(gauntlet_state::sound_irq_ack_w))', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 594, sourceColumn: 2, sourceEndLine: 594, mirror: 10176};
MERGE (n:KG {id: 'handler:gauntlet_state.sound_irq_ack_r'}) SET n:Handler SET n += {method: 'sound_irq_ack_r', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 445, sourceColumn: 1, sourceEndLine: 450, sourceParameters: '', sourceBody: 'if (!machine().side_effects_disabled())
		m_audiocpu->set_input_line(m6502_device::IRQ_LINE, CLEAR_LINE);
	return 0xff;'};
MERGE (n:KG {id: 'handler:gauntlet_state.sound_irq_ack_w'}) SET n:Handler SET n += {method: 'sound_irq_ack_w', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 453, sourceColumn: 1, sourceEndLine: 456, sourceParameters: 'uint8_t data', sourceBody: 'm_audiocpu->set_input_line(m6502_device::IRQ_LINE, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:gauntlet_state.sound_map/range10'}) SET n:AddressRange SET n += {start: 16384, end: 65535, raw: 'map(0x4000, 0xffff).rom()', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 595, sourceColumn: 2, sourceEndLine: 595, rom: true};
MERGE (n:KG {id: 'machine:gauntlet_state.base'}) SET n:MachineConfig SET n += {cls: 'gauntlet_state', name: 'base', calls: [], stateMembers: ['{"name":"m_vindctr2_screen_refresh","bits":1}', '{"name":"m_playfield_tile_bank","bits":8}', '{"name":"m_playfield_color_bank","bits":8}'], startHandlers: ['gauntlet_state.video_start'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 744, sourceColumn: 1, sourceEndLine: 815};
MERGE (n:KG {id: 'handler:gauntlet_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 300, sourceColumn: 1, sourceEndLine: 313, sourceParameters: '', sourceBody: '// modify the motion object code lookup table to account for the code XOR
	std::vector<uint32_t> &codelookup = m_mob->code_lookup();
	for (auto & elem : codelookup)
		elem ^= 0x800;

	// set up the base color for the playfield
	m_playfield_color_bank = m_vindctr2_screen_refresh ? 0 : 1;

	// save states
	save_item(NAME(m_playfield_tile_bank));
	save_item(NAME(m_playfield_color_bank));'};
MERGE (n:KG {id: 'device:gauntlet_state.base/maincpu'}) SET n:Device SET n += {type: 'M68010', tag: 'maincpu', clock: 7159090.5, config: ['M68010(config, m_maincpu, 14.318181_MHz_XTAL / 2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &gauntlet_state::main_map)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 747, sourceColumn: 2, sourceEndLine: 747};
MERGE (n:KG {id: 'device:gauntlet_state.base/audiocpu'}) SET n:Device SET n += {type: 'M6502', tag: 'audiocpu', clock: 1789772.625, config: ['M6502(config, m_audiocpu, 14.318181_MHz_XTAL / 8)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &gauntlet_state::sound_map)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 750, sourceColumn: 2, sourceEndLine: 750};
MERGE (n:KG {id: 'device:gauntlet_state.base/eeprom'}) SET n:Device SET n += {type: 'EEPROM_2804', tag: 'eeprom', clock: null, config: ['EEPROM_2804(config, "eeprom").lock_after_write(true)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 753, sourceColumn: 2, sourceEndLine: 753};
MERGE (n:KG {id: 'device:gauntlet_state.base/outlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'outlatch', clock: null, config: ['ls259_device &outlatch(LS259(config, "outlatch"))', 'outlatch.q_out_cb<7>().set(FUNC(gauntlet_state::sound_reset_w))'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 755, sourceColumn: 2, sourceEndLine: 755};
MERGE (n:KG {id: 'device:gauntlet_state.base/outlatch/callback:outlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'outlatch.q_out_cb<7>().set(FUNC(gauntlet_state::sound_reset_w))', ownerTag: 'outlatch', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 760, sourceColumn: 2, sourceEndLine: 760, slot: '7', targetClass: 'gauntlet_state', targetMethod: 'sound_reset_w'};
MERGE (n:KG {id: 'handler:gauntlet_state.sound_reset_w'}) SET n:Handler SET n += {method: 'sound_reset_w', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 466, sourceColumn: 1, sourceEndLine: 475, sourceParameters: 'int state', sourceBody: 'm_audiocpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);
	m_soundctl->clear_w(state);
	if (!state)
	{
		m_mainlatch->acknowledge_w();
		mixer_w(0);
	}'};
MERGE (n:KG {id: 'device:gauntlet_state.base/scantimer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scantimer', clock: null, config: ['TIMER(config, "scantimer").configure_scanline(FUNC(gauntlet_state::scanline_update), m_screen, 0, 32)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 762, sourceColumn: 2, sourceEndLine: 762};
MERGE (n:KG {id: 'device:gauntlet_state.base/scantimer/callback:scantimer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "scantimer").configure_scanline(FUNC(gauntlet_state::scanline_update), m_screen, 0, 32)', ownerTag: 'scantimer', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 762, sourceColumn: 2, sourceEndLine: 762, scanlineStart: 0, scanlineIncrement: 32, targetClass: 'gauntlet_state', targetMethod: 'scanline_update', targetTag: 'screen'};
MERGE (n:KG {id: 'handler:gauntlet_state.scanline_update'}) SET n:Handler SET n += {method: 'scanline_update', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 437, sourceColumn: 1, sourceEndLine: 442, sourceParameters: 'int param', sourceBody: '// sound IRQ is on 32V
	if (param & 32)
		m_audiocpu->set_input_line(m6502_device::IRQ_LINE, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:gauntlet_state.base/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count(m_screen, 8)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 764, sourceColumn: 2, sourceEndLine: 764};
MERGE (n:KG {id: 'device:gauntlet_state.base/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, "palette", gfx_gauntlet)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 767, sourceColumn: 2, sourceEndLine: 767, clockExpr: '"palette"'};
MERGE (n:KG {id: 'device:gauntlet_state.base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, "palette").set_format(palette_device::IRGB_4444, 1024)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 769, sourceColumn: 2, sourceEndLine: 769};
MERGE (n:KG {id: 'device:gauntlet_state.base/playfield'}) SET n:Device SET n += {type: 'TILEMAP', tag: 'playfield', clock: null, config: ['TILEMAP(config, m_playfield_tilemap, m_gfxdecode, 2, 8, 8, TILEMAP_SCAN_COLS, 64, 64).set_info_callback(FUNC(gauntlet_state::get_playfield_tile_info))'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 771, sourceColumn: 2, sourceEndLine: 771, clockExpr: 'm_gfxdecode'};
MERGE (n:KG {id: 'device:gauntlet_state.base/playfield/callback:playfield:0'}) SET n:Callback SET n += {signal: 'set_info_callback', delegate: 1, operation: 'set_info_callback', raw: 'TILEMAP(config, m_playfield_tilemap, m_gfxdecode, 2, 8, 8, TILEMAP_SCAN_COLS, 64, 64).set_info_callback(FUNC(gauntlet_state::get_playfield_tile_info))', ownerTag: 'playfield', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 771, sourceColumn: 2, sourceEndLine: 771, targetClass: 'gauntlet_state', targetMethod: 'get_playfield_tile_info'};
MERGE (n:KG {id: 'handler:gauntlet_state.get_playfield_tile_info'}) SET n:Handler SET n += {method: 'get_playfield_tile_info', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 251, sourceColumn: 1, sourceEndLine: 257, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint16_t const data = m_playfield_tilemap->basemem_read(tile_index);
	int const code = ((m_playfield_tile_bank * 0x1000) + (data & 0xfff)) ^ 0x800;
	int const color = 0x10 + (m_playfield_color_bank * 8) + ((data >> 12) & 7);
	tileinfo.set(0, code, color, (data >> 15) & 1);'};
MERGE (n:KG {id: 'device:gauntlet_state.base/alpha'}) SET n:Device SET n += {type: 'TILEMAP', tag: 'alpha', clock: null, config: ['TILEMAP(config, m_alpha_tilemap, m_gfxdecode, 2, 8, 8, TILEMAP_SCAN_ROWS, 64, 31, 0).set_info_callback(FUNC(gauntlet_state::get_alpha_tile_info))'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 772, sourceColumn: 2, sourceEndLine: 772, clockExpr: 'm_gfxdecode'};
MERGE (n:KG {id: 'device:gauntlet_state.base/alpha/callback:alpha:0'}) SET n:Callback SET n += {signal: 'set_info_callback', delegate: 1, operation: 'set_info_callback', raw: 'TILEMAP(config, m_alpha_tilemap, m_gfxdecode, 2, 8, 8, TILEMAP_SCAN_ROWS, 64, 31, 0).set_info_callback(FUNC(gauntlet_state::get_alpha_tile_info))', ownerTag: 'alpha', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 772, sourceColumn: 2, sourceEndLine: 772, targetClass: 'gauntlet_state', targetMethod: 'get_alpha_tile_info'};
MERGE (n:KG {id: 'handler:gauntlet_state.get_alpha_tile_info'}) SET n:Handler SET n += {method: 'get_alpha_tile_info', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 248, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint16_t const data = m_alpha_tilemap->basemem_read(tile_index);
	int const code = data & 0x3ff;
	int const color = ((data >> 10) & 0x0f) | ((data >> 9) & 0x20);
	int const opaque = data & 0x8000;
	tileinfo.set(1, code, color, opaque ? TILE_FORCE_LAYER0 : 0);'};
MERGE (n:KG {id: 'device:gauntlet_state.base/mob'}) SET n:Device SET n += {type: 'ATARI_MOTION_OBJECTS', tag: 'mob', clock: null, config: ['ATARI_MOTION_OBJECTS(config, m_mob, m_screen, gauntlet_state::s_mob_config)', 'm_mob->set_gfxdecode(m_gfxdecode)'], cls: 'atari_motion_objects_device', clsHierarchy: ['atari_motion_objects_device'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 774, sourceColumn: 2, sourceEndLine: 774, clockExpr: 'm_screen'};
MERGE (n:KG {id: 'device:gauntlet_state.base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_video_attributes(VIDEO_UPDATE_BEFORE_VBLANK)', 'm_screen->set_raw(14.318181_MHz_XTAL / 2, 456, 0, 336, 262, 0, 240)', 'm_screen->set_screen_update(FUNC(gauntlet_state::screen_update))', 'm_screen->set_palette("palette")', 'm_screen->screen_vblank().set_inputline(m_maincpu, M68K_IRQ_4, ASSERT_LINE)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 777, sourceColumn: 2, sourceEndLine: 777, configCalls: ['set_raw(7159090.5,456,0,336,262,0,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [7159090.5, 456, 0, 336, 262, 0, 240], screenRawExpr: ['14.318181_MHz_XTAL / 2', '456', '0', '336', '262', '0', '240'], screenVideoAttributes: ['VIDEO_UPDATE_BEFORE_VBLANK']};
MERGE (n:KG {id: 'device:gauntlet_state.base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(gauntlet_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 782, sourceColumn: 2, sourceEndLine: 782, targetClass: 'gauntlet_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:gauntlet_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 378, sourceColumn: 1, sourceEndLine: 422, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// start drawing
	m_mob->draw_async(cliprect);

	// draw the playfield
	m_playfield_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	// draw and merge the MO
	bitmap_ind16 &mobitmap = m_mob->bitmap();
	m_mob->iterate_dirty_rects(
			cliprect,
			[this, &bitmap, &mobitmap] (rectangle const &rect)
			{
				for (int y = rect.top(); y <= rect.bottom(); y++)
				{
					uint16_t const *const mo = &mobitmap.pix(y);
					uint16_t *const pf = &bitmap.pix(y);
					for (int x = rect.left(); x <= rect.right(); x++)
					{
						if (mo[x] != 0xffff)
						{
							/* verified via schematics:

							    MO pen 1 clears PF color bit 0x80
							*/
							if ((mo[x] & 0x0f) == 1)
							{
								// Vindicators Part II has extra logic here for the bases
								if (!m_vindctr2_screen_refresh || (mo[x] & 0xf0) != 0)
									pf[x] ^= 0x80;
							}
							else
							{
								pf[x] = mo[x];
							}
						}
					}
				}
			});

	// add the alpha on top
	m_alpha_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	return 0;'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.draw'}) SET n:Handler SET n += {method: 'draw', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 163, sourceColumn: 1, sourceEndLine: 230, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// compute start/stop bands
	int startband = ((cliprect.top() + m_yscroll - m_slipoffset) & m_bitmapymask) >> m_slipshift;
	int stopband = ((cliprect.bottom() + m_yscroll - m_slipoffset) & m_bitmapymask) >> m_slipshift;
	if (startband > stopband)
		startband -= m_bitmapheight >> m_slipshift;
	if (m_slipshift == 0)
		stopband = startband;

	// loop over SLIP bands
	for (int band = startband; band <= stopband; band++)
	{
		// compute the starting link and clip for the current band
		rectangle bandclip = cliprect;
		int link = 0;
		if (m_slipshift != 0)
		{
			// extract the link from the SLIP RAM
			link = (m_slipram[band & m_sliprammask] >> m_linkmask.shift()) & m_linkmask.mask();

			// compute minimum Y and wrap around if necessary
			bandclip.min_y = ((band << m_slipshift) - m_yscroll + m_slipoffset) & m_bitmapymask;
			if (bandclip.min_y >= bitmap.height())
				bandclip.min_y -= m_bitmapheight;

			// maximum Y is based on the minimum
			bandclip.set_height(1 << m_slipshift);

			// keep within the cliprect
			bandclip &= cliprect;
		}

		// if this matches the last link, we don\'t need to re-process the list
		build_active_list(link);

		// initialize the parameters
		m_next_xpos = 123456;

		// safety check
		if (m_activelist == m_activelast)
			continue;

		// set the start and end points
		uint16_t *first, *last;
		int step;
		if (m_reverse)
		{
			first = m_activelast - 4;
			last = m_activelist;
			step = -4;
		}
		else
		{
			first = m_activelist;
			last = m_activelast - 4;
			step = 4;
		}

		// render the mos
		for (uint16_t *current = first; ; current += step)
		{
			render_object(bitmap, bandclip, current);
			if (current == last)
				break;
		}
	}'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.build_active_list'}) SET n:Handler SET n += {method: 'build_active_list', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 374, sourceColumn: 1, sourceEndLine: 412, sourceParameters: 'int link', sourceBody: 'uint16_t const *bankbase = &spriteram()[m_bank << (m_entrybits + 2)];
	uint16_t *current = &m_activelist[0];

	// visit all the motion objects and copy their data into the display list
	uint8_t visited[MAX_PER_BANK] = {0};
	for (int i = 0; i < m_maxperline && !visited[link]; i++)
	{
		// copy the current entry into the list
		uint16_t *modata = current;
		if (!m_split)
		{
			uint16_t const *srcdata = &bankbase[link * 4];
			*current++ = srcdata[0];
			*current++ = srcdata[1];
			*current++ = srcdata[2];
			*current++ = srcdata[3];
		}
		else
		{
			uint16_t const *srcdata = &bankbase[link];
			*current++ = srcdata[uint32_t(0 << m_entrybits)];
			*current++ = srcdata[uint32_t(1 << m_entrybits)];
			*current++ = srcdata[uint32_t(2 << m_entrybits)];
			*current++ = srcdata[uint32_t(3 << m_entrybits)];
		}

		// link to the next object
		visited[link] = 1;
		if (m_linked)
			link = m_linkmask.extract(modata);
		else
			link = (link + 1) & m_linkmask.mask();
	}

	// note the last entry
	m_activelast = current;'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.render_object'}) SET n:Handler SET n += {method: 'render_object', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 421, sourceColumn: 1, sourceEndLine: 552, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, const uint16_t *entry', sourceBody: '// select the gfx element and save off key information
	int const rawcode = m_codemask.extract(entry);
	gfx_element *gfx = m_gfxdecode->gfx(m_gfxlookup[rawcode >> 8]);

	// extract data from the various words
	int code = m_codelookup[rawcode];
	int color = m_colorlookup[m_colormask.extract(entry)];
	int xpos = m_xposmask.extract(entry) + m_xoffset;
	int ypos = -m_yposmask.extract(entry);
	int const hflip = m_hflipmask.extract(entry);
	int const vflip = m_vflipmask.extract(entry);
	int const width = m_widthmask.extract(entry) + 1;
	int const height = m_heightmask.extract(entry) + 1;
	int const priority = m_prioritymask.extract(entry);

	// compute the effective color, merging in priority
	color = (color * gfx->granularity()) | (priority << PRIORITY_SHIFT);
	color += m_palettebase;

	// add in the scroll positions if we\'re not in absolute coordinates
	if (!m_absolutemask.extract(entry))
	{
		xpos -= m_xscroll;
		ypos -= m_yscroll;
	}

	// adjust for height
	ypos -= height << m_tileyshift;

	// handle previous hold bits
	if (m_next_xpos != 123456)
		xpos = m_next_xpos;
	m_next_xpos = 123456;

	// check for the hold bit
	if (m_neighbormask.extract(entry) != 0)
	{
		if (!m_nextneighbor)
			xpos = m_last_xpos + m_tilewidth;
		else
			m_next_xpos = xpos + m_tilewidth;
	}
	m_last_xpos = xpos;

	// adjust the final coordinates
	xpos &= m_bitmapxmask;
	ypos &= m_bitmapymask;
	if (xpos >= bitmap.width())
		xpos -= m_bitmapwidth;
	if (ypos >= bitmap.height())
		ypos -= m_bitmapheight;

	// is this one special?
	if (m_specialmask.mask() == 0 || m_specialmask.extract(entry) != m_specialvalue)
	{
		// adjust for h flip
		int xadv = m_tilewidth;
		if (hflip)
		{
			xpos += (width - 1) << m_tilexshift;
			xadv = -xadv;
		}

		// adjust for v flip
		int yadv = m_tileheight;
		if (vflip)
		{
			ypos += (height - 1) << m_tileyshift;
			yadv = -yadv;
		}

		// standard order is: loop over Y first, then X
		if (!m_swapxy)
		{
			// loop over the height
			for (int y = 0, sy = ypos; y < height; y++, sy += yadv)
			{
				// clip the Y coordinate
				if (sy <= cliprect.top() - m_tileheight)
				{
					code += width;
					continue;
				}
				else if (sy > cliprect.bottom())
					break;

				// loop over the width
				for (int x = 0, sx = xpos; x < width; x++, sx += xadv, code++)
				{
					// clip the X coordinate
					if (sx <= -cliprect.left() - m_tilewidth || sx > cliprect.right())
						continue;

					// draw the sprite
					gfx->transpen_raw(bitmap, cliprect, code, color, hflip, vflip, sx, sy, m_transpen);
					mark_dirty(sx, sx + m_tilewidth - 1, sy, sy + m_tileheight - 1);
				}
			}
		}

		// alternative order is swapped
		else
		{
			// loop over the width
			for (int x = 0, sx = xpos; x < width; x++, sx += xadv)
			{
				// clip the X coordinate
				if (sx <= cliprect.left() - m_tilewidth)
				{
					code += height;
					continue;
				}
				else if (sx > cliprect.right())
					break;

				// loop over the height
				for (int y = 0, sy = ypos; y < height; y++, sy += yadv, code++)
				{
					// clip the X coordinate
					if (sy <= -cliprect.top() - m_tileheight || sy > cliprect.bottom())
						continue;

					// draw the sprite
					gfx->transpen_raw(bitmap, cliprect, code, color, hflip, vflip, sx, sy, m_transpen);
					mark_dirty(sx, sx + m_tilewidth - 1, sy, sy + m_tileheight - 1);
				}
			}
		}
	}'};
MERGE (n:KG {id: 'device:gauntlet_state.base/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set_inputline', raw: 'm_screen->screen_vblank().set_inputline(m_maincpu, M68K_IRQ_4, ASSERT_LINE)', ownerTag: 'screen', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 784, sourceColumn: 2, sourceEndLine: 784, inputLine: 'M68K_IRQ_4', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:gauntlet_state.base/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: 2, config: ['SPEAKER(config, "speaker", 2).front()'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 787, sourceColumn: 2, sourceEndLine: 787};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)', 'm_soundlatch->data_pending_callback().set_inputline(m_audiocpu, m6502_device::NMI_LINE)', 'm_soundlatch->data_pending_callback().append([this] (int state) { if (state) machine().scheduler().perfect_quantum(attotime::from_usec(100)); })'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 789, sourceColumn: 2, sourceEndLine: 789};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundlatch/callback:soundlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set_inputline', raw: 'm_soundlatch->data_pending_callback().set_inputline(m_audiocpu, m6502_device::NMI_LINE)', ownerTag: 'soundlatch', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 790, sourceColumn: 2, sourceEndLine: 790, inputLine: 'm6502_device::NMI_LINE', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundlatch/callback:soundlatch:1'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'perfect_quantum', raw: 'm_soundlatch->data_pending_callback().append([this] (int state) { if (state) machine().scheduler().perfect_quantum(attotime::from_usec(100)); })', ownerTag: 'soundlatch', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 791, sourceColumn: 2, sourceEndLine: 791, quantumSeconds: 0.00009999999999999999};
MERGE (n:KG {id: 'device:gauntlet_state.base/mainlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'mainlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_mainlatch)', 'm_mainlatch->data_pending_callback().set_inputline(m_maincpu, M68K_IRQ_6)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 793, sourceColumn: 2, sourceEndLine: 793};
MERGE (n:KG {id: 'device:gauntlet_state.base/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set_inputline', raw: 'm_mainlatch->data_pending_callback().set_inputline(m_maincpu, M68K_IRQ_6)', ownerTag: 'mainlatch', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 794, sourceColumn: 2, sourceEndLine: 794, inputLine: 'M68K_IRQ_6', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:gauntlet_state.base/ymsnd'}) SET n:Device SET n += {type: 'YM2151', tag: 'ymsnd', clock: 3579545.25, config: ['YM2151(config, m_ym2151, 14.318181_MHz_XTAL / 4)', 'm_ym2151->add_route(1, "speaker", 0.48, 0)', 'm_ym2151->add_route(0, "speaker", 0.48, 1)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 796, sourceColumn: 2, sourceEndLine: 796};
MERGE (n:KG {id: 'audioroute:device:gauntlet_state.base/ymsnd/0'}) SET n:AudioRoute SET n += {output: '1', target: 'speaker', gain: 0.48, input: 0, raw: 'm_ym2151->add_route(1, "speaker", 0.48, 0)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 797, sourceColumn: 2, sourceEndLine: 797};
MERGE (n:KG {id: 'audioroute:device:gauntlet_state.base/ymsnd/1'}) SET n:AudioRoute SET n += {output: '0', target: 'speaker', gain: 0.48, input: 1, raw: 'm_ym2151->add_route(0, "speaker", 0.48, 1)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 798, sourceColumn: 2, sourceEndLine: 798};
MERGE (n:KG {id: 'device:gauntlet_state.base/pokey'}) SET n:Device SET n += {type: 'POKEY', tag: 'pokey', clock: 1789772.625, config: ['POKEY(config, m_pokey, 14.318181_MHz_XTAL / 8)', 'm_pokey->add_route(ALL_OUTPUTS, "speaker", 0.32, 0)', 'm_pokey->add_route(ALL_OUTPUTS, "speaker", 0.32, 1)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 800, sourceColumn: 2, sourceEndLine: 800};
MERGE (n:KG {id: 'audioroute:device:gauntlet_state.base/pokey/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.32, input: 0, raw: 'm_pokey->add_route(ALL_OUTPUTS, "speaker", 0.32, 0)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 801, sourceColumn: 2, sourceEndLine: 801};
MERGE (n:KG {id: 'audioroute:device:gauntlet_state.base/pokey/1'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.32, input: 1, raw: 'm_pokey->add_route(ALL_OUTPUTS, "speaker", 0.32, 1)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 802, sourceColumn: 2, sourceEndLine: 802};
MERGE (n:KG {id: 'device:gauntlet_state.base/tms'}) SET n:Device SET n += {type: 'TMS5220C', tag: 'tms', clock: 650826.4090909091, config: ['TMS5220C(config, m_tms5220, 14.318181_MHz_XTAL / 2 / 11)', 'm_tms5220->add_route(ALL_OUTPUTS, "speaker", 0.80, 0)', 'm_tms5220->add_route(ALL_OUTPUTS, "speaker", 0.80, 1)'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 804, sourceColumn: 2, sourceEndLine: 804};
MERGE (n:KG {id: 'audioroute:device:gauntlet_state.base/tms/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.8, input: 0, raw: 'm_tms5220->add_route(ALL_OUTPUTS, "speaker", 0.80, 0)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 805, sourceColumn: 2, sourceEndLine: 805};
MERGE (n:KG {id: 'audioroute:device:gauntlet_state.base/tms/1'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.8, input: 1, raw: 'm_tms5220->add_route(ALL_OUTPUTS, "speaker", 0.80, 1)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 806, sourceColumn: 2, sourceEndLine: 806};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundctl'}) SET n:Device SET n += {type: 'LS259', tag: 'soundctl', clock: null, config: ['LS259(config, m_soundctl)', 'm_soundctl->q_out_cb<0>().set(m_ym2151, FUNC(ym2151_device::reset_w))', 'm_soundctl->q_out_cb<1>().set(m_tms5220, FUNC(tms5220_device::wsq_w))', 'm_soundctl->q_out_cb<2>().set(m_tms5220, FUNC(tms5220_device::rsq_w))', 'm_soundctl->q_out_cb<3>().set(FUNC(gauntlet_state::speech_squeak_w))', 'm_soundctl->q_out_cb<4>().set(FUNC(gauntlet_state::coin_counter_w<1>))', 'm_soundctl->q_out_cb<5>().set(FUNC(gauntlet_state::coin_counter_w<0>))'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 808, sourceColumn: 2, sourceEndLine: 808};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_soundctl->q_out_cb<0>().set(m_ym2151, FUNC(ym2151_device::reset_w))', ownerTag: 'soundctl', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 809, sourceColumn: 2, sourceEndLine: 809, slot: '0', targetClass: 'ym2151_device', targetMethod: 'reset_w', targetTag: 'ymsnd'};
MERGE (n:KG {id: 'handler:ym2151_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'ym2151_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 809, sourceColumn: 2, sourceEndLine: 809};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_soundctl->q_out_cb<1>().set(m_tms5220, FUNC(tms5220_device::wsq_w))', ownerTag: 'soundctl', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 810, sourceColumn: 2, sourceEndLine: 810, slot: '1', targetClass: 'tms5220_device', targetMethod: 'wsq_w', targetTag: 'tms'};
MERGE (n:KG {id: 'handler:tms5220_device.wsq_w'}) SET n:Handler SET n += {method: 'wsq_w', ownerClass: 'tms5220_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 810, sourceColumn: 2, sourceEndLine: 810};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_soundctl->q_out_cb<2>().set(m_tms5220, FUNC(tms5220_device::rsq_w))', ownerTag: 'soundctl', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 811, sourceColumn: 2, sourceEndLine: 811, slot: '2', targetClass: 'tms5220_device', targetMethod: 'rsq_w', targetTag: 'tms'};
MERGE (n:KG {id: 'handler:tms5220_device.rsq_w'}) SET n:Handler SET n += {method: 'rsq_w', ownerClass: 'tms5220_device', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 811, sourceColumn: 2, sourceEndLine: 811};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_soundctl->q_out_cb<3>().set(FUNC(gauntlet_state::speech_squeak_w))', ownerTag: 'soundctl', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 812, sourceColumn: 2, sourceEndLine: 812, slot: '3', targetClass: 'gauntlet_state', targetMethod: 'speech_squeak_w'};
MERGE (n:KG {id: 'handler:gauntlet_state.speech_squeak_w'}) SET n:Handler SET n += {method: 'speech_squeak_w', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 504, sourceColumn: 1, sourceEndLine: 508, sourceParameters: 'int state', sourceBody: 'uint8_t const data = 5 | (state ? 2 : 0);
	m_tms5220->set_unscaled_clock(14.318181_MHz_XTAL/2 / (16 - data));'};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_soundctl->q_out_cb<4>().set(FUNC(gauntlet_state::coin_counter_w<1>))', ownerTag: 'soundctl', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 813, sourceColumn: 2, sourceEndLine: 813, slot: '4', targetClass: 'gauntlet_state', targetMethod: 'coin_counter_w_1'};
MERGE (n:KG {id: 'handler:gauntlet_state.coin_counter_w_1'}) SET n:Handler SET n += {method: 'coin_counter_w_1', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 511, sourceColumn: 1, sourceEndLine: 514, sourceConstants: ['Which=1'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_soundctl->q_out_cb<5>().set(FUNC(gauntlet_state::coin_counter_w<0>))', ownerTag: 'soundctl', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 814, sourceColumn: 2, sourceEndLine: 814, slot: '5', targetClass: 'gauntlet_state', targetMethod: 'coin_counter_w_0'};
MERGE (n:KG {id: 'handler:gauntlet_state.coin_counter_w_0'}) SET n:Handler SET n += {method: 'coin_counter_w_0', ownerClass: 'gauntlet_state', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 511, sourceColumn: 1, sourceEndLine: 514, sourceConstants: ['Which=0'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'machine:gauntlet_state.gauntlet'}) SET n:MachineConfig SET n += {cls: 'gauntlet_state', name: 'gauntlet', calls: ['base'], stateMembers: ['{"name":"m_vindctr2_screen_refresh","bits":1}', '{"name":"m_playfield_tile_bank","bits":8}', '{"name":"m_playfield_color_bank","bits":8}'], startHandlers: ['gauntlet_state.video_start'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 818, sourceColumn: 1, sourceEndLine: 824};
MERGE (n:KG {id: 'bank:gauntlet_state.gauntlet/slapstic_bank'}) SET n:MemoryBank SET n += {tag: 'slapstic_bank', member: 'm_slapstic_bank', startEntry: 0, entries: 4, region: 'maincpu', offset: 229376, stride: 8192, raw: 'm_slapstic_bank->configure_entries(0, 4, rom + 0x38000, 0x2000)', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 2056, sourceColumn: 1, sourceEndLine: 2060};
MERGE (n:KG {id: 'device:gauntlet_state.gauntlet/slapstic'}) SET n:Device SET n += {type: 'SLAPSTIC', tag: 'slapstic', clock: 104, config: ['SLAPSTIC(config, m_slapstic, 104)', 'm_slapstic->set_range(m_maincpu, AS_PROGRAM, 0x38000, 0x3ffff, 0x280000)', 'm_slapstic->set_bank(m_slapstic_bank)'], cls: 'atari_slapstic_device', clsHierarchy: ['atari_slapstic_device'], sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 821, sourceColumn: 2, sourceEndLine: 821};
MERGE (n:KG {id: 'inputs:gauntlet'}) SET n:InputPorts SET n += {name: 'gauntlet', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 606, sourceColumn: 8, sourceEndLine: 606};
MERGE (n:KG {id: 'inputs:gauntlet/803000'}) SET n:Port SET n += {tag: '803000', modify: false};
MERGE (n:KG {id: 'inputs:gauntlet/803000/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:gauntlet/803000/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:gauntlet/803000/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 12, activeLow: true, type: 'IPT_UNUSED', defaultValue: 12};
MERGE (n:KG {id: 'inputs:gauntlet/803000/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:gauntlet/803000/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:gauntlet/803000/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:gauntlet/803000/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:gauntlet/803000/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 65280, activeLow: true, type: 'IPT_UNUSED', defaultValue: 65280};
MERGE (n:KG {id: 'inputs:gauntlet/803002'}) SET n:Port SET n += {tag: '803002', modify: false};
MERGE (n:KG {id: 'inputs:gauntlet/803002/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:gauntlet/803002/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:gauntlet/803002/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 12, activeLow: true, type: 'IPT_UNUSED', defaultValue: 12};
MERGE (n:KG {id: 'inputs:gauntlet/803002/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:gauntlet/803002/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:gauntlet/803002/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:gauntlet/803002/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:gauntlet/803002/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 65280, activeLow: true, type: 'IPT_UNUSED', defaultValue: 65280};
MERGE (n:KG {id: 'inputs:gauntlet/803004'}) SET n:Port SET n += {tag: '803004', modify: false};
MERGE (n:KG {id: 'inputs:gauntlet/803004/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(3)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:gauntlet/803004/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(3)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:gauntlet/803004/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 12, activeLow: true, type: 'IPT_UNUSED', defaultValue: 12};
MERGE (n:KG {id: 'inputs:gauntlet/803004/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:gauntlet/803004/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:gauntlet/803004/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:gauntlet/803004/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:gauntlet/803004/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 65280, activeLow: true, type: 'IPT_UNUSED', defaultValue: 65280};
MERGE (n:KG {id: 'inputs:gauntlet/803006'}) SET n:Port SET n += {tag: '803006', modify: false};
MERGE (n:KG {id: 'inputs:gauntlet/803006/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(4)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:gauntlet/803006/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(4)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:gauntlet/803006/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 12, activeLow: true, type: 'IPT_UNUSED', defaultValue: 12};
MERGE (n:KG {id: 'inputs:gauntlet/803006/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:gauntlet/803006/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:gauntlet/803006/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:gauntlet/803006/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:gauntlet/803006/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 65280, activeLow: true, type: 'IPT_UNUSED', defaultValue: 65280};
MERGE (n:KG {id: 'inputs:gauntlet/803008'}) SET n:Port SET n += {tag: '803008', modify: false};
MERGE (n:KG {id: 'inputs:gauntlet/803008/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 7, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:gauntlet/803008/f1'}) SET n:PortField SET n += {kind: 'service', mask: 8, activeLow: true, defaultValue: 8};
MERGE (n:KG {id: 'inputs:gauntlet/803008/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("mainlatch", FUNC(generic_latch_8_device::pending_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:gauntlet/803008/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("soundlatch", FUNC(generic_latch_8_device::pending_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:gauntlet/803008/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:gauntlet/803008/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 65408, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:gauntlet/COIN'}) SET n:Port SET n += {tag: 'COIN', modify: false};
MERGE (n:KG {id: 'inputs:gauntlet/COIN/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN4', defaultValue: 1};
MERGE (n:KG {id: 'inputs:gauntlet/COIN/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN3', defaultValue: 2};
MERGE (n:KG {id: 'inputs:gauntlet/COIN/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_COIN2', defaultValue: 4};
MERGE (n:KG {id: 'inputs:gauntlet/COIN/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_COIN1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:gauntlet/COIN/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED', defaultValue: 240};
MERGE (n:KG {id: 'gfxlayout:anlayout'}) SET n:GfxLayout SET n += {name: 'anlayout', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [0, 4], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x4_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x4_planar', width: 8, height: 8, total: 'RGN_FRAC(1,4)', planes: 4, planeOffsets: ['RGN_FRAC(3,4)', 'RGN_FRAC(2,4)', 'RGN_FRAC(1,4)', 'RGN_FRAC(0,4)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_gauntlet'}) SET n:GfxDecode SET n += {name: 'gfx_gauntlet', sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 731, sourceColumn: 8, sourceEndLine: 731};
MERGE (n:KG {id: 'gfxdecode:gfx_gauntlet/e0'}) SET n:GfxDecodeEntry SET n += {region: 'spr_tiles', offset: 0, layout: 'gfx_8x8x4_planar', colorBase: 256, colorCount: 32, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_gauntlet/e1'}) SET n:GfxDecodeEntry SET n += {region: 'chars', offset: 0, layout: 'anlayout', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:gauntlet'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 2098, sourceColumn: 1, sourceEndLine: 2098};
MATCH (a:KG {id: 'game:gauntlet'}), (b:KG {id: 'machine:gauntlet_state.gauntlet'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:gauntlet'}), (b:KG {id: 'inputs:gauntlet'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:gauntlet'}), (b:KG {id: 'romset:gauntlet'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:atarimo.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:slapstic.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:cpu/m68000/m68010.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:machine/eeprompar.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:machine/timer.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:sound/pokey.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:sound/tms5220.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:sound/ymopm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/gauntlet.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.gauntlet'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 818, sourceColumn: 1, sourceEndLine: 824};
MATCH (a:KG {id: 'machine:gauntlet_state.gauntlet'}), (b:KG {id: 'handler:gauntlet_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.gauntlet'}), (b:KG {id: 'machine:gauntlet_state.base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:gauntlet_state.gauntlet'}), (b:KG {id: 'bank:gauntlet_state.gauntlet/slapstic_bank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.gauntlet'}), (b:KG {id: 'device:gauntlet_state.gauntlet/slapstic'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:gauntlet'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 606, sourceColumn: 8, sourceEndLine: 606};
MATCH (a:KG {id: 'inputs:gauntlet'}), (b:KG {id: 'inputs:gauntlet/803000'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gauntlet'}), (b:KG {id: 'inputs:gauntlet/803002'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gauntlet'}), (b:KG {id: 'inputs:gauntlet/803004'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gauntlet'}), (b:KG {id: 'inputs:gauntlet/803006'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gauntlet'}), (b:KG {id: 'inputs:gauntlet/803008'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gauntlet'}), (b:KG {id: 'inputs:gauntlet/COIN'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:gauntlet'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 897, sourceColumn: 1, sourceEndLine: 897};
MATCH (a:KG {id: 'romset:gauntlet'}), (b:KG {id: 'region:gauntlet/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gauntlet'}), (b:KG {id: 'region:gauntlet/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gauntlet'}), (b:KG {id: 'region:gauntlet/chars'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gauntlet'}), (b:KG {id: 'region:gauntlet/spr_tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gauntlet'}), (b:KG {id: 'region:gauntlet/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 744, sourceColumn: 1, sourceEndLine: 815};
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'handler:gauntlet_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/eeprom'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/outlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/scantimer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'gfxdecode:gfx_gauntlet'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/playfield'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/alpha'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/mob'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/ymsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/pokey'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/tms'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gauntlet_state.base'}), (b:KG {id: 'device:gauntlet_state.base/soundctl'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:gauntlet_state.gauntlet/slapstic_bank'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 2056, sourceColumn: 1, sourceEndLine: 2060};
MATCH (a:KG {id: 'inputs:gauntlet/803000'}), (b:KG {id: 'inputs:gauntlet/803000/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803000'}), (b:KG {id: 'inputs:gauntlet/803000/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803000'}), (b:KG {id: 'inputs:gauntlet/803000/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803000'}), (b:KG {id: 'inputs:gauntlet/803000/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803000'}), (b:KG {id: 'inputs:gauntlet/803000/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803000'}), (b:KG {id: 'inputs:gauntlet/803000/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803000'}), (b:KG {id: 'inputs:gauntlet/803000/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803000'}), (b:KG {id: 'inputs:gauntlet/803000/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803002'}), (b:KG {id: 'inputs:gauntlet/803002/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803002'}), (b:KG {id: 'inputs:gauntlet/803002/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803002'}), (b:KG {id: 'inputs:gauntlet/803002/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803002'}), (b:KG {id: 'inputs:gauntlet/803002/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803002'}), (b:KG {id: 'inputs:gauntlet/803002/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803002'}), (b:KG {id: 'inputs:gauntlet/803002/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803002'}), (b:KG {id: 'inputs:gauntlet/803002/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803002'}), (b:KG {id: 'inputs:gauntlet/803002/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803004'}), (b:KG {id: 'inputs:gauntlet/803004/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803004'}), (b:KG {id: 'inputs:gauntlet/803004/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803004'}), (b:KG {id: 'inputs:gauntlet/803004/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803004'}), (b:KG {id: 'inputs:gauntlet/803004/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803004'}), (b:KG {id: 'inputs:gauntlet/803004/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803004'}), (b:KG {id: 'inputs:gauntlet/803004/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803004'}), (b:KG {id: 'inputs:gauntlet/803004/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803004'}), (b:KG {id: 'inputs:gauntlet/803004/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803006'}), (b:KG {id: 'inputs:gauntlet/803006/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803006'}), (b:KG {id: 'inputs:gauntlet/803006/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803006'}), (b:KG {id: 'inputs:gauntlet/803006/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803006'}), (b:KG {id: 'inputs:gauntlet/803006/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803006'}), (b:KG {id: 'inputs:gauntlet/803006/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803006'}), (b:KG {id: 'inputs:gauntlet/803006/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803006'}), (b:KG {id: 'inputs:gauntlet/803006/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803006'}), (b:KG {id: 'inputs:gauntlet/803006/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803008'}), (b:KG {id: 'inputs:gauntlet/803008/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803008'}), (b:KG {id: 'inputs:gauntlet/803008/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803008'}), (b:KG {id: 'inputs:gauntlet/803008/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803008'}), (b:KG {id: 'inputs:gauntlet/803008/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803008'}), (b:KG {id: 'inputs:gauntlet/803008/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/803008'}), (b:KG {id: 'inputs:gauntlet/803008/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/COIN'}), (b:KG {id: 'inputs:gauntlet/COIN/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/COIN'}), (b:KG {id: 'inputs:gauntlet/COIN/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/COIN'}), (b:KG {id: 'inputs:gauntlet/COIN/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/COIN'}), (b:KG {id: 'inputs:gauntlet/COIN/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gauntlet/COIN'}), (b:KG {id: 'inputs:gauntlet/COIN/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:gauntlet/maincpu'}), (b:KG {id: 'rom:gauntlet/maincpu/136037-1307.9a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/maincpu'}), (b:KG {id: 'rom:gauntlet/maincpu/136037-1308.9b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/maincpu'}), (b:KG {id: 'rom:gauntlet/maincpu/136037-205.10a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/maincpu'}), (b:KG {id: 'rom:gauntlet/maincpu/136037-206.10b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/maincpu'}), (b:KG {id: 'rom:gauntlet/maincpu/136037-1409.7a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/maincpu'}), (b:KG {id: 'rom:gauntlet/maincpu/136037-1410.7b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/audiocpu'}), (b:KG {id: 'rom:gauntlet/audiocpu/136037-120.16r'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/audiocpu'}), (b:KG {id: 'rom:gauntlet/audiocpu/136037-119.16s'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/chars'}), (b:KG {id: 'rom:gauntlet/chars/136037-104.6p'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/spr_tiles'}), (b:KG {id: 'rom:gauntlet/spr_tiles/136037-111.1a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/spr_tiles'}), (b:KG {id: 'rom:gauntlet/spr_tiles/136037-112.1b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/spr_tiles'}), (b:KG {id: 'rom:gauntlet/spr_tiles/136037-113.1l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/spr_tiles'}), (b:KG {id: 'rom:gauntlet/spr_tiles/136037-114.1mn'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/spr_tiles'}), (b:KG {id: 'rom:gauntlet/spr_tiles/136037-115.2a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/spr_tiles'}), (b:KG {id: 'rom:gauntlet/spr_tiles/136037-116.2b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/spr_tiles'}), (b:KG {id: 'rom:gauntlet/spr_tiles/136037-117.2l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/spr_tiles'}), (b:KG {id: 'rom:gauntlet/spr_tiles/136037-118.2mn'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/proms'}), (b:KG {id: 'rom:gauntlet/proms/74s472-136037-101.7u'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/proms'}), (b:KG {id: 'rom:gauntlet/proms/74s472-136037-102.5l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gauntlet/proms'}), (b:KG {id: 'rom:gauntlet/proms/74s287-136037-103.4r'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/maincpu'}), (b:KG {id: 'map:gauntlet_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:gauntlet_state.base/audiocpu'}), (b:KG {id: 'map:gauntlet_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:gauntlet_state.base/outlatch'}), (b:KG {id: 'device:gauntlet_state.base/outlatch/callback:outlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/scantimer'}), (b:KG {id: 'device:gauntlet_state.base/scantimer/callback:scantimer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gauntlet'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 731, sourceColumn: 8, sourceEndLine: 731};
MATCH (a:KG {id: 'gfxdecode:gfx_gauntlet'}), (b:KG {id: 'gfxdecode:gfx_gauntlet/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gauntlet'}), (b:KG {id: 'gfxdecode:gfx_gauntlet/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/playfield'}), (b:KG {id: 'device:gauntlet_state.base/playfield/callback:playfield:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/alpha'}), (b:KG {id: 'device:gauntlet_state.base/alpha/callback:alpha:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/screen'}), (b:KG {id: 'device:gauntlet_state.base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/screen'}), (b:KG {id: 'device:gauntlet_state.base/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundlatch'}), (b:KG {id: 'device:gauntlet_state.base/soundlatch/callback:soundlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundlatch'}), (b:KG {id: 'device:gauntlet_state.base/soundlatch/callback:soundlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/mainlatch'}), (b:KG {id: 'device:gauntlet_state.base/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/ymsnd'}), (b:KG {id: 'audioroute:device:gauntlet_state.base/ymsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/ymsnd'}), (b:KG {id: 'audioroute:device:gauntlet_state.base/ymsnd/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/pokey'}), (b:KG {id: 'audioroute:device:gauntlet_state.base/pokey/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/pokey'}), (b:KG {id: 'audioroute:device:gauntlet_state.base/pokey/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/tms'}), (b:KG {id: 'audioroute:device:gauntlet_state.base/tms/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/tms'}), (b:KG {id: 'audioroute:device:gauntlet_state.base/tms/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl'}), (b:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl'}), (b:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl'}), (b:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl'}), (b:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl'}), (b:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl'}), (b:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 540, sourceColumn: 1, sourceEndLine: 571};
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range18'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range19'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range20'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range21'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range22'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map'}), (b:KG {id: 'map:gauntlet_state.main_map/range23'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/gauntlet.cpp', sourceLine: 582, sourceColumn: 1, sourceEndLine: 596};
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map'}), (b:KG {id: 'map:gauntlet_state.sound_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/outlatch/callback:outlatch:0'}), (b:KG {id: 'handler:gauntlet_state.sound_reset_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/scantimer/callback:scantimer:0'}), (b:KG {id: 'handler:gauntlet_state.scanline_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gauntlet/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gauntlet/e1'}), (b:KG {id: 'gfxlayout:anlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/playfield/callback:playfield:0'}), (b:KG {id: 'handler:gauntlet_state.get_playfield_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/alpha/callback:alpha:0'}), (b:KG {id: 'handler:gauntlet_state.get_alpha_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/screen/callback:screen:0'}), (b:KG {id: 'handler:gauntlet_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/screen/callback:screen:1'}), (b:KG {id: 'device:gauntlet_state.base/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'device:gauntlet_state.base/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'device:gauntlet_state.base/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:0'}), (b:KG {id: 'handler:ym2151_device.reset_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:0'}), (b:KG {id: 'device:gauntlet_state.base/ymsnd'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:1'}), (b:KG {id: 'handler:tms5220_device.wsq_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:1'}), (b:KG {id: 'device:gauntlet_state.base/tms'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:2'}), (b:KG {id: 'handler:tms5220_device.rsq_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:2'}), (b:KG {id: 'device:gauntlet_state.base/tms'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:3'}), (b:KG {id: 'handler:gauntlet_state.speech_squeak_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:4'}), (b:KG {id: 'handler:gauntlet_state.coin_counter_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gauntlet_state.base/soundctl/callback:soundctl:5'}), (b:KG {id: 'handler:gauntlet_state.coin_counter_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range4'}), (b:KG {id: 'handler:eeprom_parallel_28xx_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'eeprom'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range4'}), (b:KG {id: 'handler:eeprom_parallel_28xx_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'eeprom'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range10'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range11'}), (b:KG {id: 'handler:watchdog_timer_device.reset16_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range12'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'outlatch'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range13'}), (b:KG {id: 'handler:gauntlet_state.video_int_ack_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range14'}), (b:KG {id: 'handler:eeprom_parallel_28xx_device.unlock_write16'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'eeprom'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range15'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range16'}), (b:KG {id: 'handler:tilemap_device.write16'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'playfield'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range19'}), (b:KG {id: 'handler:tilemap_device.write16'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'alpha'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range20'}), (b:KG {id: 'handler:gauntlet_state.yscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range22'}), (b:KG {id: 'handler:palette_device.write16'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:gauntlet_state.main_map/range23'}), (b:KG {id: 'handler:gauntlet_state.xscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range1'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range2'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range3'}), (b:KG {id: 'handler:gauntlet_state.mixer_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range4'}), (b:KG {id: 'handler:gauntlet_state.switch_6502_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range5'}), (b:KG {id: 'handler:ls259_device.write_d7'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundctl'};
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range6'}), (b:KG {id: 'handler:pokey_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range6'}), (b:KG {id: 'handler:pokey_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range7'}), (b:KG {id: 'handler:ym2151_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range7'}), (b:KG {id: 'handler:ym2151_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range8'}), (b:KG {id: 'handler:tms5220_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'tms'};
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range9'}), (b:KG {id: 'handler:gauntlet_state.sound_irq_ack_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:gauntlet_state.sound_map/range9'}), (b:KG {id: 'handler:gauntlet_state.sound_irq_ack_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:gauntlet_state.sound_reset_w'}), (b:KG {id: 'handler:gauntlet_state.mixer_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x4_planar'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:anlayout'}), (b:KG {id: 'file:src/mame/atari/gauntlet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:gauntlet_state.screen_update'}), (b:KG {id: 'handler:atari_motion_objects_device.draw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atari_motion_objects_device.draw'}), (b:KG {id: 'handler:atari_motion_objects_device.build_active_list'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atari_motion_objects_device.draw'}), (b:KG {id: 'handler:atari_motion_objects_device.render_object'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
