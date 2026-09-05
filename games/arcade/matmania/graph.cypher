// mamekit knowledge graph — driver src/mame/technos/matmania.cpp
// generated 2026-09-05T03:49:50.053Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/technos/matmania.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/technos/matmania.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:taito68705.h'}) SET n:SourceFile SET n += {path: 'taito68705.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/m6809.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/m6809.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/timer.h'}) SET n:SourceFile SET n += {path: 'machine/timer.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopl.h'}) SET n:SourceFile SET n += {path: 'sound/ymopl.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:matmania'}) SET n:Game SET n += {name: 'matmania', year: '1985', company: 'Technos Japan (Taito America license)', fullname: 'Mat Mania', monitor: 'ROT270', cls: 'matmania_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 938, sourceColumn: 1, sourceEndLine: 938};
MERGE (n:KG {id: 'romset:matmania'}) SET n:RomSet SET n += {name: 'matmania', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 709, sourceColumn: 1, sourceEndLine: 709};
MERGE (n:KG {id: 'region:matmania/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 710, sourceColumn: 2, sourceEndLine: 710};
MERGE (n:KG {id: 'rom:matmania/maincpu/k0-03'}) SET n:Rom SET n += {file: 'k0-03', offset: 16384, size: 16384, crc: '314ab8a4', sha1: 'dc86b2f71a9af8524edad2317343b0d05fe5ef4a', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 711, sourceColumn: 2, sourceEndLine: 711};
MERGE (n:KG {id: 'rom:matmania/maincpu/k1-03'}) SET n:Rom SET n += {file: 'k1-03', offset: 32768, size: 16384, crc: '3b3c3f08', sha1: '65f0c5dba0b8eeb5c2d42b050cac37c475e6a398', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 712, sourceColumn: 2, sourceEndLine: 712};
MERGE (n:KG {id: 'rom:matmania/maincpu/k2-03'}) SET n:Rom SET n += {file: 'k2-03', offset: 49152, size: 16384, crc: '286c0917', sha1: '50d6133406e7db0694b02858c7d06725744cf243', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 713, sourceColumn: 2, sourceEndLine: 713};
MERGE (n:KG {id: 'region:matmania/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 715, sourceColumn: 2, sourceEndLine: 715};
MERGE (n:KG {id: 'rom:matmania/audiocpu/k4-0'}) SET n:Rom SET n += {file: 'k4-0', offset: 32768, size: 16384, crc: '86dab489', sha1: '27f6eea29b0287e461e0e321fd7bfaada52c39dc', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 716, sourceColumn: 2, sourceEndLine: 716};
MERGE (n:KG {id: 'rom:matmania/audiocpu/k5-0'}) SET n:Rom SET n += {file: 'k5-0', offset: 49152, size: 16384, crc: '4c41cdba', sha1: 'a0af0c019bd6d9456cbbe83ecdeee689bc5f1bea', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 717, sourceColumn: 2, sourceEndLine: 717};
MERGE (n:KG {id: 'region:matmania/chars'}) SET n:RomRegion SET n += {tag: 'chars', size: 24576, flags: '0', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 719, sourceColumn: 2, sourceEndLine: 719};
MERGE (n:KG {id: 'rom:matmania/chars/ku-02'}) SET n:Rom SET n += {file: 'ku-02', offset: 0, size: 8192, crc: '613c8698', sha1: '07acb2fe150a64029fd15d177c8b6481fcd9eb0b', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 720, sourceColumn: 2, sourceEndLine: 720};
MERGE (n:KG {id: 'rom:matmania/chars/kv-02'}) SET n:Rom SET n += {file: 'kv-02', offset: 8192, size: 8192, crc: '274ce14b', sha1: '58ed8c8fe0cc157d642aae596e41f2099c1ea6b1', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 721, sourceColumn: 2, sourceEndLine: 721};
MERGE (n:KG {id: 'rom:matmania/chars/kw-02'}) SET n:Rom SET n += {file: 'kw-02', offset: 16384, size: 8192, crc: '7588a9c4', sha1: '0c197a8fea1acb6c9a99071845be54c949ec83b1', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 722, sourceColumn: 2, sourceEndLine: 722};
MERGE (n:KG {id: 'region:matmania/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 49152, flags: '0', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 724, sourceColumn: 2, sourceEndLine: 724};
MERGE (n:KG {id: 'rom:matmania/tiles/kt-02'}) SET n:Rom SET n += {file: 'kt-02', offset: 0, size: 16384, crc: '5d817c70', sha1: 'f7759be40a8850d325440d336241ecd05b80c0bd', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 725, sourceColumn: 2, sourceEndLine: 725};
MERGE (n:KG {id: 'rom:matmania/tiles/ks-02'}) SET n:Rom SET n += {file: 'ks-02', offset: 16384, size: 16384, crc: '2e9f3ba0', sha1: '21d6686580de6ecfe57e458821fa92e966a42d95', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 726, sourceColumn: 2, sourceEndLine: 726};
MERGE (n:KG {id: 'rom:matmania/tiles/kr-02'}) SET n:Rom SET n += {file: 'kr-02', offset: 32768, size: 16384, crc: 'b057d3e3', sha1: '24216b22a69c1ecc7eabd7ae10de381e1ff0afc1', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 727, sourceColumn: 2, sourceEndLine: 727};
MERGE (n:KG {id: 'region:matmania/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 344064, flags: '0', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 729, sourceColumn: 2, sourceEndLine: 729};
MERGE (n:KG {id: 'rom:matmania/sprites/k6-00'}) SET n:Rom SET n += {file: 'k6-00', offset: 0, size: 16384, crc: '294d0878', sha1: '0aaae97e35d504dbf6c479ddf04b981847a23ea6', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 730, sourceColumn: 2, sourceEndLine: 730};
MERGE (n:KG {id: 'rom:matmania/sprites/k7-00'}) SET n:Rom SET n += {file: 'k7-00', offset: 16384, size: 16384, crc: '0908c2f5', sha1: 'acc34c578f9a3521855ad4dd8fbd554e05c3f63c', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 731, sourceColumn: 2, sourceEndLine: 731};
MERGE (n:KG {id: 'rom:matmania/sprites/k8-00'}) SET n:Rom SET n += {file: 'k8-00', offset: 32768, size: 16384, crc: 'ae8341e1', sha1: 'ca198087b3aec320543a19921015861324ace8a2', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 732, sourceColumn: 2, sourceEndLine: 732};
MERGE (n:KG {id: 'rom:matmania/sprites/k9-00'}) SET n:Rom SET n += {file: 'k9-00', offset: 49152, size: 16384, crc: '752ac2c6', sha1: '309fe4e396616b569b9b25654e3dc2751d7b1605', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 733, sourceColumn: 2, sourceEndLine: 733};
MERGE (n:KG {id: 'rom:matmania/sprites/ka-00'}) SET n:Rom SET n += {file: 'ka-00', offset: 65536, size: 16384, crc: '46a9cb16', sha1: '35e6bd4f33098c98bf2d0b1dfefec2f9d25444e7', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 734, sourceColumn: 2, sourceEndLine: 734};
MERGE (n:KG {id: 'rom:matmania/sprites/kb-00'}) SET n:Rom SET n += {file: 'kb-00', offset: 81920, size: 16384, crc: 'bf016772', sha1: 'c901fc2d553622b6dbfaaa9cd94759799d974c39', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 735, sourceColumn: 2, sourceEndLine: 735};
MERGE (n:KG {id: 'rom:matmania/sprites/kc-00'}) SET n:Rom SET n += {file: 'kc-00', offset: 98304, size: 16384, crc: '8d08bce7', sha1: '1433962c837f568cc1eb27464e243dc580a141de', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 736, sourceColumn: 2, sourceEndLine: 736};
MERGE (n:KG {id: 'rom:matmania/sprites/kd-00'}) SET n:Rom SET n += {file: 'kd-00', offset: 114688, size: 16384, crc: 'af1d6a60', sha1: 'ae3131e3e1fcc9bb1d59db6b1668f6838849241d', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 737, sourceColumn: 2, sourceEndLine: 737};
MERGE (n:KG {id: 'rom:matmania/sprites/ke-00'}) SET n:Rom SET n += {file: 'ke-00', offset: 131072, size: 16384, crc: '614f19b0', sha1: '67e4687b9be36007c2e1fd504a2eb952fe098d53', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 738, sourceColumn: 2, sourceEndLine: 738};
MERGE (n:KG {id: 'rom:matmania/sprites/kf-00'}) SET n:Rom SET n += {file: 'kf-00', offset: 147456, size: 16384, crc: 'bdf58c18', sha1: 'a76c6984e4d4f88384e15d0b6b74093c3bc0fcda', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 739, sourceColumn: 2, sourceEndLine: 739};
MERGE (n:KG {id: 'rom:matmania/sprites/kg-00'}) SET n:Rom SET n += {file: 'kg-00', offset: 163840, size: 16384, crc: '2189f5cf', sha1: '48289263f7b9cc5b6d975742d45dd64ba45e38c8', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 740, sourceColumn: 2, sourceEndLine: 740};
MERGE (n:KG {id: 'rom:matmania/sprites/kh-00'}) SET n:Rom SET n += {file: 'kh-00', offset: 180224, size: 16384, crc: '6b11ed1f', sha1: '8b5c52a14ac3f80ebf630fed8108df17106efd93', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 741, sourceColumn: 2, sourceEndLine: 741};
MERGE (n:KG {id: 'rom:matmania/sprites/ki-00'}) SET n:Rom SET n += {file: 'ki-00', offset: 196608, size: 16384, crc: 'd7ac4ec5', sha1: '35b1503147cb521d2fcc756e6f90ef70d62e2d04', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742};
MERGE (n:KG {id: 'rom:matmania/sprites/kj-00'}) SET n:Rom SET n += {file: 'kj-00', offset: 212992, size: 16384, crc: '2caee05d', sha1: '51e0799312e4737bc6f6ae7b74d02f9e10f91c3b', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 743, sourceColumn: 2, sourceEndLine: 743};
MERGE (n:KG {id: 'rom:matmania/sprites/kk-00'}) SET n:Rom SET n += {file: 'kk-00', offset: 229376, size: 16384, crc: 'eb54f010', sha1: '9ed8addd8a542299be2a8f0108447e68b9b33436', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 744, sourceColumn: 2, sourceEndLine: 744};
MERGE (n:KG {id: 'rom:matmania/sprites/kl-00'}) SET n:Rom SET n += {file: 'kl-00', offset: 245760, size: 16384, crc: 'fa4c7e0c', sha1: '365f5b60ac880928b49a254a5a49a9e9a766046d', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 745, sourceColumn: 2, sourceEndLine: 745};
MERGE (n:KG {id: 'rom:matmania/sprites/km-00'}) SET n:Rom SET n += {file: 'km-00', offset: 262144, size: 16384, crc: '6d2369b6', sha1: 'b3071cc27598045167681a00f41bf77b6d4bd5bd', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 746, sourceColumn: 2, sourceEndLine: 746};
MERGE (n:KG {id: 'rom:matmania/sprites/kn-00'}) SET n:Rom SET n += {file: 'kn-00', offset: 278528, size: 16384, crc: 'c55733e2', sha1: 'b550afd2ceb3b0159c11627ab31f49cc49785809', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 747, sourceColumn: 2, sourceEndLine: 747};
MERGE (n:KG {id: 'rom:matmania/sprites/ko-00'}) SET n:Rom SET n += {file: 'ko-00', offset: 294912, size: 16384, crc: 'ed3c3476', sha1: 'eb7bc7c72443d4e3bdfc535bfe460524c0f900d3', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 748, sourceColumn: 2, sourceEndLine: 748};
MERGE (n:KG {id: 'rom:matmania/sprites/kp-00'}) SET n:Rom SET n += {file: 'kp-00', offset: 311296, size: 16384, crc: '9c84a969', sha1: '8492ba523e1c1ca94eeba1e53521dd74df854cb9', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 749, sourceColumn: 2, sourceEndLine: 749};
MERGE (n:KG {id: 'rom:matmania/sprites/kq-00'}) SET n:Rom SET n += {file: 'kq-00', offset: 327680, size: 16384, crc: 'fa2f0003', sha1: '7327ce822be8aea360210bbd466a8129788a65c3', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 750, sourceColumn: 2, sourceEndLine: 750};
MERGE (n:KG {id: 'region:matmania/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 128, flags: '0', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 752, sourceColumn: 2, sourceEndLine: 752};
MERGE (n:KG {id: 'rom:matmania/proms/matmania.1'}) SET n:Rom SET n += {file: 'matmania.1', offset: 0, size: 32, crc: '1b58f01f', sha1: 'ffc098d85413777740a25c767096ba5b2aeaf5a8', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 753, sourceColumn: 2, sourceEndLine: 753};
MERGE (n:KG {id: 'rom:matmania/proms/matmania.5'}) SET n:Rom SET n += {file: 'matmania.5', offset: 32, size: 32, crc: '2029f85f', sha1: '7825d42eed284ea0fe7fd60304b8a27a1b5a4075', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 754, sourceColumn: 2, sourceEndLine: 754};
MERGE (n:KG {id: 'rom:matmania/proms/matmania.2'}) SET n:Rom SET n += {file: 'matmania.2', offset: 64, size: 32, crc: 'b6ac1fd5', sha1: 'e312a8ff7317eb21320308400539a733c27e8fca', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 755, sourceColumn: 2, sourceEndLine: 755};
MERGE (n:KG {id: 'rom:matmania/proms/matmania.16'}) SET n:Rom SET n += {file: 'matmania.16', offset: 96, size: 32, crc: '09325dc2', sha1: '3d9ebdf73840a9603af2acc4bcc4339f3029d284', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 756, sourceColumn: 2, sourceEndLine: 756};
MERGE (n:KG {id: 'map:matmania_state.main_map'}) SET n:AddressMap SET n += {cls: 'matmania_state', name: 'main_map', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 422, sourceColumn: 1, sourceEndLine: 438};
MERGE (n:KG {id: 'map:matmania_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 1919, raw: 'map(0x0000, 0x077f).ram()', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 424, sourceColumn: 2, sourceEndLine: 424, ram: true};
MERGE (n:KG {id: 'map:matmania_state.main_map/range1'}) SET n:AddressRange SET n += {start: 1920, end: 2015, raw: 'map(0x0780, 0x07df).writeonly().share(m_spriteram)', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 425, sourceColumn: 2, sourceEndLine: 425, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range2'}) SET n:AddressRange SET n += {start: 4096, end: 5119, raw: 'map(0x1000, 0x13ff).ram().share(m_videoram[1])', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 426, sourceColumn: 2, sourceEndLine: 426, ram: true, share: 'videoram[1]'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range3'}) SET n:AddressRange SET n += {start: 5120, end: 6143, raw: 'map(0x1400, 0x17ff).ram().share(m_colorram[1])', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 427, sourceColumn: 2, sourceEndLine: 427, ram: true, share: 'colorram[1]'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range4'}) SET n:AddressRange SET n += {start: 8192, end: 8703, raw: 'map(0x2000, 0x21ff).ram().share(m_videoram[0])', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 428, sourceColumn: 2, sourceEndLine: 428, ram: true, share: 'videoram[0]'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range5'}) SET n:AddressRange SET n += {start: 8704, end: 9215, raw: 'map(0x2200, 0x23ff).ram().share(m_colorram[0])', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 429, sourceColumn: 2, sourceEndLine: 429, ram: true, share: 'colorram[0]'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range6'}) SET n:AddressRange SET n += {start: 9216, end: 9727, raw: 'map(0x2400, 0x25ff).ram().share(m_videoram[2])', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 430, sourceColumn: 2, sourceEndLine: 430, ram: true, share: 'videoram[2]'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range7'}) SET n:AddressRange SET n += {start: 9728, end: 10239, raw: 'map(0x2600, 0x27ff).ram().share(m_colorram[2])', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 431, sourceColumn: 2, sourceEndLine: 431, ram: true, share: 'colorram[2]'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range8'}) SET n:AddressRange SET n += {start: 12288, end: 12288, raw: 'map(0x3000, 0x3000).portr("IN0").writeonly().share(m_pageselect)', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 432, sourceColumn: 2, sourceEndLine: 432, writeonly: true, share: 'pageselect', portRead: 'IN0'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range9'}) SET n:AddressRange SET n += {start: 12304, end: 12304, raw: 'map(0x3010, 0x3010).portr("IN1").w("soundlatch", FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 433, sourceColumn: 2, sourceEndLine: 433, portRead: 'IN1'};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 433, sourceColumn: 2, sourceEndLine: 433};
MERGE (n:KG {id: 'map:matmania_state.main_map/range10'}) SET n:AddressRange SET n += {start: 12320, end: 12320, raw: 'map(0x3020, 0x3020).portr("DSW2").writeonly().share(m_scroll)', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 434, sourceColumn: 2, sourceEndLine: 434, writeonly: true, share: 'scroll', portRead: 'DSW2'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range11'}) SET n:AddressRange SET n += {start: 12336, end: 12336, raw: 'map(0x3030, 0x3030).portr("DSW1").nopw()', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 435, sourceColumn: 2, sourceEndLine: 435, nopw: true, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range12'}) SET n:AddressRange SET n += {start: 12368, end: 12415, raw: 'map(0x3050, 0x307f).w(FUNC(matmania_state::paletteram_w)).share(m_paletteram)', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 436, sourceColumn: 2, sourceEndLine: 436, share: 'paletteram'};
MERGE (n:KG {id: 'handler:matmania_state.paletteram_w'}) SET n:Handler SET n += {method: 'paletteram_w', ownerClass: 'matmania_state', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 206, sourceColumn: 1, sourceEndLine: 235, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int bit0, bit1, bit2, bit3, val;

	m_paletteram[offset] = data;
	offset &= 0x0f;

	val = m_paletteram[offset];
	bit0 = BIT(val, 0);
	bit1 = BIT(val, 1);
	bit2 = BIT(val, 2);
	bit3 = BIT(val, 3);
	int const r = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

	val = m_paletteram[offset | 0x10];
	bit0 = BIT(val, 0);
	bit1 = BIT(val, 1);
	bit2 = BIT(val, 2);
	bit3 = BIT(val, 3);
	int const g = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

	val = m_paletteram[offset | 0x20];
	bit0 = BIT(val, 0);
	bit1 = BIT(val, 1);
	bit2 = BIT(val, 2);
	bit3 = BIT(val, 3);
	int const b = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

	m_palette->set_pen_color(offset + 64, rgb_t(r, g, b));'};
MERGE (n:KG {id: 'map:matmania_state.main_map/range13'}) SET n:AddressRange SET n += {start: 16384, end: 65535, raw: 'map(0x4000, 0xffff).rom()', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 437, sourceColumn: 2, sourceEndLine: 437, rom: true};
MERGE (n:KG {id: 'map:matmania_state.sound_map'}) SET n:AddressMap SET n += {cls: 'matmania_state', name: 'sound_map', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 450, sourceColumn: 1, sourceEndLine: 459};
MERGE (n:KG {id: 'map:matmania_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 511, raw: 'map(0x0000, 0x01ff).ram()', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 452, sourceColumn: 2, sourceEndLine: 452, ram: true};
MERGE (n:KG {id: 'map:matmania_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 8192, end: 8193, raw: 'map(0x2000, 0x2001).w("ay1", FUNC(ay8910_device::data_address_w))', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 453, sourceColumn: 2, sourceEndLine: 453};
MERGE (n:KG {id: 'handler:ay8910_device.data_address_w'}) SET n:Handler SET n += {method: 'data_address_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454};
MERGE (n:KG {id: 'map:matmania_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 8194, end: 8195, raw: 'map(0x2002, 0x2003).w("ay2", FUNC(ay8910_device::data_address_w))', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454};
MERGE (n:KG {id: 'map:matmania_state.sound_map/range3'}) SET n:AddressRange SET n += {start: 8196, end: 8196, raw: 'map(0x2004, 0x2004).w("dac", FUNC(dac_byte_interface::data_w))', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 455, sourceColumn: 2, sourceEndLine: 455};
MERGE (n:KG {id: 'handler:dac_byte_interface.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'dac_byte_interface', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 465, sourceColumn: 2, sourceEndLine: 465};
MERGE (n:KG {id: 'map:matmania_state.sound_map/range4'}) SET n:AddressRange SET n += {start: 8197, end: 8197, raw: 'map(0x2005, 0x2005).w(FUNC(matmania_state::sound_nmi_enable_w))', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 456, sourceColumn: 2, sourceEndLine: 456};
MERGE (n:KG {id: 'handler:matmania_state.sound_nmi_enable_w'}) SET n:Handler SET n += {method: 'sound_nmi_enable_w', ownerClass: 'matmania_state', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 104, sourceColumn: 33, sourceEndLine: 106, sourceParameters: 'uint8_t data', sourceBody: 'm_sound_nmi_enable = bool(BIT(data, 0));'};
MERGE (n:KG {id: 'map:matmania_state.sound_map/range5'}) SET n:AddressRange SET n += {start: 8199, end: 8199, raw: 'map(0x2007, 0x2007).r("soundlatch", FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 466, sourceColumn: 2, sourceEndLine: 466};
MERGE (n:KG {id: 'map:matmania_state.sound_map/range6'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).rom()', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 458, sourceColumn: 2, sourceEndLine: 458, rom: true};
MERGE (n:KG {id: 'machine:matmania_state.matmania'}) SET n:MachineConfig SET n += {cls: 'matmania_state', name: 'matmania', calls: [], stateMembers: ['{"name":"m_sound_nmi_enable","bits":1}'], startHandlers: ['matmania_state.video_start'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 635, sourceColumn: 1, sourceEndLine: 665};
MERGE (n:KG {id: 'handler:matmania_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'matmania_state', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 244, sourceColumn: 1, sourceEndLine: 252, sourceParameters: '', sourceBody: 'int width = m_screen->width();
	int height = m_screen->height();

	// Mat Mania has a virtual screen twice as large as the visible screen
	m_tmpbitmap[0] = std::make_unique<bitmap_ind16>(width, 2 * height);
	m_tmpbitmap[1] = std::make_unique<bitmap_ind16>(width, 2 * height);'};
MERGE (n:KG {id: 'device:matmania_state.matmania/maincpu'}) SET n:Device SET n += {type: 'M6502', tag: 'maincpu', clock: 1500000, config: ['M6502(config, m_maincpu, 12_MHz_XTAL / 8)', 'm_maincpu->set_addrmap(AS_PROGRAM, &matmania_state::main_map)', 'm_maincpu->set_vblank_int("screen", FUNC(matmania_state::irq0_line_hold))'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 638, sourceColumn: 2, sourceEndLine: 638};
MERGE (n:KG {id: 'device:matmania_state.matmania/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(matmania_state::irq0_line_hold))', ownerTag: 'maincpu', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 640, sourceColumn: 2, sourceEndLine: 640, targetTag: 'screen', targetClass: 'matmania_state', targetMethod: 'irq0_line_hold'};
MERGE (n:KG {id: 'handler:matmania_state.irq0_line_hold'}) SET n:Handler SET n += {method: 'irq0_line_hold', ownerClass: 'matmania_state', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 640, sourceColumn: 2, sourceEndLine: 640};
MERGE (n:KG {id: 'device:matmania_state.matmania/audiocpu'}) SET n:Device SET n += {type: 'M6502', tag: 'audiocpu', clock: 1000000, config: ['M6502(config, m_audiocpu, 12_MHz_XTAL / 2 / 6)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &matmania_state::sound_map)'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 642, sourceColumn: 2, sourceEndLine: 642};
MERGE (n:KG {id: 'device:matmania_state.matmania/scantimer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scantimer', clock: null, config: ['TIMER(config, "scantimer").configure_scanline(FUNC(matmania_state::scanline), "screen", 8, 16)'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 645, sourceColumn: 2, sourceEndLine: 645};
MERGE (n:KG {id: 'device:matmania_state.matmania/scantimer/callback:scantimer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "scantimer").configure_scanline(FUNC(matmania_state::scanline), "screen", 8, 16)', ownerTag: 'scantimer', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 645, sourceColumn: 2, sourceEndLine: 645, scanlineStart: 8, scanlineIncrement: 16, targetClass: 'matmania_state', targetMethod: 'scanline'};
MERGE (n:KG {id: 'handler:matmania_state.scanline'}) SET n:Handler SET n += {method: 'scanline', ownerClass: 'matmania_state', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 399, sourceColumn: 1, sourceEndLine: 406, sourceParameters: 'int param', sourceBody: 'const int scanline = param;

	// 16 sound NMIs per frame (disabled during DAC voice)
	if (m_sound_nmi_enable && scanline < 256)
		m_audiocpu->pulse_input_line(INPUT_LINE_NMI, attotime::zero);'};
MERGE (n:KG {id: 'device:matmania_state.matmania/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(12_MHz_XTAL / 2, 384, 0, 256, 272, 8, 248)', 'm_screen->set_screen_update(FUNC(matmania_state::screen_update))', 'm_screen->set_palette(m_palette)'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 648, sourceColumn: 2, sourceEndLine: 648, configCalls: ['set_raw(6000000,384,0,256,272,8,248)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 272, 8, 248], screenRawExpr: ['12_MHz_XTAL / 2', '384', '0', '256', '272', '8', '248']};
MERGE (n:KG {id: 'device:matmania_state.matmania/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(matmania_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 650, sourceColumn: 2, sourceEndLine: 650, targetClass: 'matmania_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:matmania_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'matmania_state', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 256, sourceColumn: 1, sourceEndLine: 321, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// Update the tiles in the left tile RAM bank
	for (int offs = m_videoram[0].bytes() - 1; offs >= 0; offs--)
	{
		int const sx = 15 - offs / 32;
		int const sy = offs % 32;

		m_gfxdecode->gfx(1)->opaque(*m_tmpbitmap[0], m_tmpbitmap[0]->cliprect(),
				m_videoram[0][offs] + ((m_colorram[0][offs] & 0x08) << 5),
				(m_colorram[0][offs] & 0x30) >> 4,
				0, sy >= 16, // flip horizontally tiles on the right half of the bitmap
				16 * sx, 16 * sy);
	}

	// Update the tiles in the right tile RAM bank
	for (int offs = m_videoram[2].bytes() - 1; offs >= 0; offs--)
	{
		int const sx = 15 - offs / 32;
		int const sy = offs % 32;

		m_gfxdecode->gfx(1)->opaque(*m_tmpbitmap[1], m_tmpbitmap[1]->cliprect(),
				m_videoram[2][offs] + ((m_colorram[2][offs] & 0x08) << 5),
				(m_colorram[2][offs] & 0x30) >> 4,
				0, sy >= 16, // flip horizontally tiles on the right half of the bitmap
				16 * sx, 16 * sy);
	}

	// copy the temporary bitmap to the screen
	{
		int const scrolly = -*m_scroll;
		if (m_pageselect[0] & 0x01) // maniach sets 0x20 sometimes, which must have a different meaning
			copyscrollbitmap(bitmap, *m_tmpbitmap[1], 0, nullptr, 1, &scrolly, cliprect);
		else
			copyscrollbitmap(bitmap, *m_tmpbitmap[0], 0, nullptr, 1, &scrolly, cliprect);
	}


	// Draw the sprites
	for (int offs = 0; offs < m_spriteram.bytes(); offs += 4)
	{
		if (m_spriteram[offs] & 0x01)
		{
			m_gfxdecode->gfx(2)->transpen(bitmap, cliprect,
					m_spriteram[offs + 1] + ((m_spriteram[offs] & 0xf0) << 4),
					(m_spriteram[offs] & 0x08) >> 3,
					m_spriteram[offs] & 0x04, m_spriteram[offs] & 0x02,
					239 - m_spriteram[offs + 3], (240 - m_spriteram[offs + 2]) & 0xff, 0);
		}
	}


	// draw the frontmost playfield. They are characters, but draw them as sprites
	for (int offs = m_videoram[1].bytes() - 1; offs >= 0; offs--)
	{
		int const sx = 31 - offs / 32;
		int const sy = offs % 32;

		m_gfxdecode->gfx(0)->transpen(bitmap, cliprect,
				m_videoram[1][offs] + 256 * (m_colorram[1][offs] & 0x07),
				(m_colorram[1][offs] & 0x30) >> 4,
				0, 0,
				8 * sx, 8 * sy, 0);
	}
	return 0;'};
MERGE (n:KG {id: 'device:matmania_state.matmania/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_matmania)'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 653, sourceColumn: 2, sourceEndLine: 653, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:matmania_state.matmania/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(matmania_state::palette), 64 + 16)'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 654, sourceColumn: 2, sourceEndLine: 654, clockExpr: 'FUNC(matmania_state::palette)'};
MERGE (n:KG {id: 'device:matmania_state.matmania/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 657, sourceColumn: 2, sourceEndLine: 657};
MERGE (n:KG {id: 'device:matmania_state.matmania/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, "soundlatch").data_pending_callback().set_inputline(m_audiocpu, M6502_IRQ_LINE)'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 659, sourceColumn: 2, sourceEndLine: 659};
MERGE (n:KG {id: 'device:matmania_state.matmania/soundlatch/callback:soundlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set_inputline', raw: 'GENERIC_LATCH_8(config, "soundlatch").data_pending_callback().set_inputline(m_audiocpu, M6502_IRQ_LINE)', ownerTag: 'soundlatch', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 659, sourceColumn: 2, sourceEndLine: 659, inputLine: 'M6502_IRQ_LINE', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:matmania_state.matmania/ay1'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay1', clock: 1500000, config: ['AY8910(config, "ay1", 12_MHz_XTAL / 8).add_route(ALL_OUTPUTS, "speaker", 0.3)'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 661, sourceColumn: 2, sourceEndLine: 661};
MERGE (n:KG {id: 'audioroute:device:matmania_state.matmania/ay1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.3, raw: 'AY8910(config, "ay1", 12_MHz_XTAL / 8).add_route(ALL_OUTPUTS, "speaker", 0.3)', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 661, sourceColumn: 2, sourceEndLine: 661};
MERGE (n:KG {id: 'device:matmania_state.matmania/ay2'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay2', clock: 1500000, config: ['AY8910(config, "ay2", 12_MHz_XTAL / 8).add_route(ALL_OUTPUTS, "speaker", 0.3)'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 662, sourceColumn: 2, sourceEndLine: 662};
MERGE (n:KG {id: 'audioroute:device:matmania_state.matmania/ay2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.3, raw: 'AY8910(config, "ay2", 12_MHz_XTAL / 8).add_route(ALL_OUTPUTS, "speaker", 0.3)', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 662, sourceColumn: 2, sourceEndLine: 662};
MERGE (n:KG {id: 'device:matmania_state.matmania/dac'}) SET n:Device SET n += {type: 'DAC_8BIT_R2R', tag: 'dac', clock: null, config: ['DAC_8BIT_R2R(config, "dac").add_route(ALL_OUTPUTS, "speaker", 0.4)'], sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 664, sourceColumn: 2, sourceEndLine: 664};
MERGE (n:KG {id: 'audioroute:device:matmania_state.matmania/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.4, raw: 'DAC_8BIT_R2R(config, "dac").add_route(ALL_OUTPUTS, "speaker", 0.4)', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 664, sourceColumn: 2, sourceEndLine: 664};
MERGE (n:KG {id: 'inputs:matmania'}) SET n:InputPorts SET n += {name: 'matmania', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 477, sourceColumn: 8, sourceEndLine: 477};
MERGE (n:KG {id: 'inputs:matmania/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:matmania/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:matmania/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:matmania/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:matmania/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:matmania/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:matmania/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:matmania/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN2', modifiers: ['PORT_IMPULSE(1)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:matmania/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN1', modifiers: ['PORT_IMPULSE(1)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:matmania/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:matmania/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:matmania/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:matmania/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:matmania/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:matmania/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:matmania/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:matmania/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:matmania/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START2', defaultValue: 128};
MERGE (n:KG {id: 'inputs:matmania/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:matmania/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:1,2")'], name: 'Coin A', defaultValue: 3, location: 'SW1:1,2', settings: ['0=2C 1C', '3=1C 1C', '2=1C 2C', '1=1C 3C']};
MERGE (n:KG {id: 'inputs:matmania/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW1:3,4")'], name: 'Coin B', defaultValue: 12, location: 'SW1:3,4', settings: ['0=2C 1C', '12=1C 1C', '8=1C 2C', '4=1C 3C']};
MERGE (n:KG {id: 'inputs:matmania/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SW1:5")'], name: 'Demo Sounds', defaultValue: 16, location: 'SW1:5', settings: ['0=Off', '16=On']};
MERGE (n:KG {id: 'inputs:matmania/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SW1:6")'], name: 'Cabinet', defaultValue: 0, location: 'SW1:6', settings: ['0=Upright', '32=Cocktail']};
MERGE (n:KG {id: 'inputs:matmania/DSW1/f4'}) SET n:PortField SET n += {kind: 'service', mask: 64, activeLow: true, defaultValue: 64};
MERGE (n:KG {id: 'inputs:matmania/DSW1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:matmania/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:matmania/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:1,2")'], name: 'Difficulty', defaultValue: 2, location: 'SW2:1,2', settings: ['3=Easy', '2=Medium', '1=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:matmania/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW2:3,4")'], name: 'Tournament Time', defaultValue: 12, location: 'SW2:3,4', settings: ['0=2:12', '4=2:24', '8=2:30', '12=2:36']};
MERGE (n:KG {id: 'inputs:matmania/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unused', defaultValue: 16};
MERGE (n:KG {id: 'inputs:matmania/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused', defaultValue: 32};
MERGE (n:KG {id: 'inputs:matmania/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 64};
MERGE (n:KG {id: 'inputs:matmania/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 1024, planes: 3, planeOffsets: [131072, 65536, 0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:tilelayout'}) SET n:GfxLayout SET n += {name: 'tilelayout', width: 16, height: 16, total: 512, planes: 3, planeOffsets: [262144, 131072, 0], xOffsets: [128, 129, 130, 131, 132, 133, 134, 135, 0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:matmania_spritelayout'}) SET n:GfxLayout SET n += {name: 'matmania_spritelayout', width: 16, height: 16, total: 3584, planes: 3, planeOffsets: [1835008, 917504, 0], xOffsets: [128, 129, 130, 131, 132, 133, 134, 135, 0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfx_matmania'}) SET n:GfxDecode SET n += {name: 'gfx_matmania', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 616, sourceColumn: 8, sourceEndLine: 616};
MERGE (n:KG {id: 'gfxdecode:gfx_matmania/e0'}) SET n:GfxDecodeEntry SET n += {region: 'chars', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 4, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_matmania/e1'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'tilelayout', colorBase: 32, colorCount: 4, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_matmania/e2'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'matmania_spritelayout', colorBase: 64, colorCount: 2, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:matmania_state.matmania/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(matmania_state::palette), 64 + 16)', ownerTag: 'palette', targetClass: 'matmania_state', targetMethod: 'palette', entries: 80, sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 654};
MERGE (n:KG {id: 'handler:matmania_state.palette'}) SET n:Handler SET n += {method: 'palette', ownerClass: 'matmania_state', sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 174, sourceColumn: 1, sourceEndLine: 203, sourceParameters: 'palette_device &palette', sourceBody: 'uint8_t const *color_prom = memregion("proms")->base();

	for (int i = 0; i < 64; i++)
	{
		int bit0, bit1, bit2, bit3;

		bit0 = BIT(color_prom[0], 0);
		bit1 = BIT(color_prom[0], 1);
		bit2 = BIT(color_prom[0], 2);
		bit3 = BIT(color_prom[0], 3);
		int const r = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

		bit0 = BIT(color_prom[0], 4);
		bit1 = BIT(color_prom[0], 5);
		bit2 = BIT(color_prom[0], 6);
		bit3 = BIT(color_prom[0], 7);
		int const g = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

		bit0 = BIT(color_prom[64], 0);
		bit1 = BIT(color_prom[64], 1);
		bit2 = BIT(color_prom[64], 2);
		bit3 = BIT(color_prom[64], 3);
		int const b = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

		palette.set_pen_color(i, rgb_t(r, g, b));
		color_prom++;
	}'};
MATCH (a:KG {id: 'game:matmania'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 938, sourceColumn: 1, sourceEndLine: 938};
MATCH (a:KG {id: 'game:matmania'}), (b:KG {id: 'machine:matmania_state.matmania'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:matmania'}), (b:KG {id: 'inputs:matmania'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:matmania'}), (b:KG {id: 'romset:matmania'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:taito68705.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:cpu/m6809/m6809.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:machine/timer.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:sound/ymopl.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/technos/matmania.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 635, sourceColumn: 1, sourceEndLine: 665};
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'handler:matmania_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/scantimer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'gfxdecode:gfx_matmania'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/ay1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/ay2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:matmania_state.matmania'}), (b:KG {id: 'device:matmania_state.matmania/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:matmania'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 477, sourceColumn: 8, sourceEndLine: 477};
MATCH (a:KG {id: 'inputs:matmania'}), (b:KG {id: 'inputs:matmania/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:matmania'}), (b:KG {id: 'inputs:matmania/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:matmania'}), (b:KG {id: 'inputs:matmania/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:matmania'}), (b:KG {id: 'inputs:matmania/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:matmania'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 709, sourceColumn: 1, sourceEndLine: 709};
MATCH (a:KG {id: 'romset:matmania'}), (b:KG {id: 'region:matmania/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:matmania'}), (b:KG {id: 'region:matmania/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:matmania'}), (b:KG {id: 'region:matmania/chars'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:matmania'}), (b:KG {id: 'region:matmania/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:matmania'}), (b:KG {id: 'region:matmania/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:matmania'}), (b:KG {id: 'region:matmania/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/maincpu'}), (b:KG {id: 'device:matmania_state.matmania/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/maincpu'}), (b:KG {id: 'map:matmania_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:matmania_state.matmania/audiocpu'}), (b:KG {id: 'map:matmania_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:matmania_state.matmania/scantimer'}), (b:KG {id: 'device:matmania_state.matmania/scantimer/callback:scantimer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/screen'}), (b:KG {id: 'device:matmania_state.matmania/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_matmania'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 616, sourceColumn: 8, sourceEndLine: 616};
MATCH (a:KG {id: 'gfxdecode:gfx_matmania'}), (b:KG {id: 'gfxdecode:gfx_matmania/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_matmania'}), (b:KG {id: 'gfxdecode:gfx_matmania/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_matmania'}), (b:KG {id: 'gfxdecode:gfx_matmania/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/palette'}), (b:KG {id: 'device:matmania_state.matmania/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/soundlatch'}), (b:KG {id: 'device:matmania_state.matmania/soundlatch/callback:soundlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/ay1'}), (b:KG {id: 'audioroute:device:matmania_state.matmania/ay1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/ay2'}), (b:KG {id: 'audioroute:device:matmania_state.matmania/ay2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/dac'}), (b:KG {id: 'audioroute:device:matmania_state.matmania/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN0'}), (b:KG {id: 'inputs:matmania/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN0'}), (b:KG {id: 'inputs:matmania/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN0'}), (b:KG {id: 'inputs:matmania/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN0'}), (b:KG {id: 'inputs:matmania/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN0'}), (b:KG {id: 'inputs:matmania/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN0'}), (b:KG {id: 'inputs:matmania/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN0'}), (b:KG {id: 'inputs:matmania/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN0'}), (b:KG {id: 'inputs:matmania/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN1'}), (b:KG {id: 'inputs:matmania/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN1'}), (b:KG {id: 'inputs:matmania/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN1'}), (b:KG {id: 'inputs:matmania/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN1'}), (b:KG {id: 'inputs:matmania/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN1'}), (b:KG {id: 'inputs:matmania/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN1'}), (b:KG {id: 'inputs:matmania/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN1'}), (b:KG {id: 'inputs:matmania/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/IN1'}), (b:KG {id: 'inputs:matmania/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW1'}), (b:KG {id: 'inputs:matmania/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW1'}), (b:KG {id: 'inputs:matmania/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW1'}), (b:KG {id: 'inputs:matmania/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW1'}), (b:KG {id: 'inputs:matmania/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW1'}), (b:KG {id: 'inputs:matmania/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW1'}), (b:KG {id: 'inputs:matmania/DSW1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW2'}), (b:KG {id: 'inputs:matmania/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW2'}), (b:KG {id: 'inputs:matmania/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW2'}), (b:KG {id: 'inputs:matmania/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW2'}), (b:KG {id: 'inputs:matmania/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW2'}), (b:KG {id: 'inputs:matmania/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:matmania/DSW2'}), (b:KG {id: 'inputs:matmania/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:matmania/maincpu'}), (b:KG {id: 'rom:matmania/maincpu/k0-03'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/maincpu'}), (b:KG {id: 'rom:matmania/maincpu/k1-03'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/maincpu'}), (b:KG {id: 'rom:matmania/maincpu/k2-03'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/audiocpu'}), (b:KG {id: 'rom:matmania/audiocpu/k4-0'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/audiocpu'}), (b:KG {id: 'rom:matmania/audiocpu/k5-0'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/chars'}), (b:KG {id: 'rom:matmania/chars/ku-02'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/chars'}), (b:KG {id: 'rom:matmania/chars/kv-02'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/chars'}), (b:KG {id: 'rom:matmania/chars/kw-02'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/tiles'}), (b:KG {id: 'rom:matmania/tiles/kt-02'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/tiles'}), (b:KG {id: 'rom:matmania/tiles/ks-02'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/tiles'}), (b:KG {id: 'rom:matmania/tiles/kr-02'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/k6-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/k7-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/k8-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/k9-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/ka-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kb-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kc-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kd-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/ke-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kf-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kg-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kh-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/ki-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kj-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kk-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kl-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/km-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kn-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/ko-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kp-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/sprites'}), (b:KG {id: 'rom:matmania/sprites/kq-00'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/proms'}), (b:KG {id: 'rom:matmania/proms/matmania.1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/proms'}), (b:KG {id: 'rom:matmania/proms/matmania.5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/proms'}), (b:KG {id: 'rom:matmania/proms/matmania.2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:matmania/proms'}), (b:KG {id: 'rom:matmania/proms/matmania.16'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:matmania_state.irq0_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 422, sourceColumn: 1, sourceEndLine: 438};
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map'}), (b:KG {id: 'map:matmania_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.sound_map'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/technos/matmania.cpp', sourceLine: 450, sourceColumn: 1, sourceEndLine: 459};
MATCH (a:KG {id: 'map:matmania_state.sound_map'}), (b:KG {id: 'map:matmania_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.sound_map'}), (b:KG {id: 'map:matmania_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.sound_map'}), (b:KG {id: 'map:matmania_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.sound_map'}), (b:KG {id: 'map:matmania_state.sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.sound_map'}), (b:KG {id: 'map:matmania_state.sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.sound_map'}), (b:KG {id: 'map:matmania_state.sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:matmania_state.sound_map'}), (b:KG {id: 'map:matmania_state.sound_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/scantimer/callback:scantimer:0'}), (b:KG {id: 'handler:matmania_state.scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/screen/callback:screen:0'}), (b:KG {id: 'handler:matmania_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_matmania/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_matmania/e1'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_matmania/e2'}), (b:KG {id: 'gfxlayout:matmania_spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/palette/callback:palette_init'}), (b:KG {id: 'handler:matmania_state.palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:matmania_state.matmania/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'device:matmania_state.matmania/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:matmania_state.main_map/range9'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:matmania_state.main_map/range12'}), (b:KG {id: 'handler:matmania_state.paletteram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:matmania_state.sound_map/range1'}), (b:KG {id: 'handler:ay8910_device.data_address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:matmania_state.sound_map/range2'}), (b:KG {id: 'handler:ay8910_device.data_address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:matmania_state.sound_map/range3'}), (b:KG {id: 'handler:dac_byte_interface.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'dac'};
MATCH (a:KG {id: 'map:matmania_state.sound_map/range4'}), (b:KG {id: 'handler:matmania_state.sound_nmi_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:matmania_state.sound_map/range5'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:tilelayout'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:matmania_spritelayout'}), (b:KG {id: 'file:src/mame/technos/matmania.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
