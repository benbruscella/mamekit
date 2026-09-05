// mamekit knowledge graph — driver src/mame/konami/rocnrope.cpp
// generated 2026-09-05T03:50:04.952Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/konami/rocnrope.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/konami/rocnrope.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:konami1.h'}) SET n:SourceFile SET n += {path: 'konami1.h', external: true};
MERGE (n:KG {id: 'file:konamipt.h'}) SET n:SourceFile SET n += {path: 'konamipt.h', external: true};
MERGE (n:KG {id: 'file:timeplt_a.h'}) SET n:SourceFile SET n += {path: 'timeplt_a.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/m6809.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/m6809.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/shared/timeplt_a.cpp'};
MERGE (n:KG {id: 'game:rocnrope'}) SET n:Game SET n += {name: 'rocnrope', year: '1983', company: 'Konami', fullname: 'Roc\'n Rope', monitor: 'ROT270', cls: 'rocnrope_state', init: 'init_rocnrope', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 570, sourceColumn: 1, sourceEndLine: 570, romPatches: ['maincpu:28733:186']};
MERGE (n:KG {id: 'romset:rocnrope'}) SET n:RomSet SET n += {name: 'rocnrope', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 435, sourceColumn: 1, sourceEndLine: 435};
MERGE (n:KG {id: 'region:rocnrope/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 436, sourceColumn: 2, sourceEndLine: 436};
MERGE (n:KG {id: 'rom:rocnrope/maincpu/rr1.1h'}) SET n:Rom SET n += {file: 'rr1.1h', offset: 24576, size: 8192, crc: '83093134', sha1: 'c9509cfb9f9043cd6c226cc84dbc2e2b744488f6', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 437, sourceColumn: 2, sourceEndLine: 437};
MERGE (n:KG {id: 'rom:rocnrope/maincpu/rr2.2h'}) SET n:Rom SET n += {file: 'rr2.2h', offset: 32768, size: 8192, crc: '75af8697', sha1: '70bb4b838cdafedf3d94425fad84f77815898d83', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 438, sourceColumn: 2, sourceEndLine: 438};
MERGE (n:KG {id: 'rom:rocnrope/maincpu/rr3.3h'}) SET n:Rom SET n += {file: 'rr3.3h', offset: 40960, size: 8192, crc: 'b21372b1', sha1: 'c08ab3caaa646f4752f890d8339bce6b723864bb', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 439, sourceColumn: 2, sourceEndLine: 439};
MERGE (n:KG {id: 'rom:rocnrope/maincpu/rr4.4h'}) SET n:Rom SET n += {file: 'rr4.4h', offset: 49152, size: 8192, crc: '7acb2a05', sha1: '93762d1890f40abc98372a2aa9fe0f63252b6389', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 440, sourceColumn: 2, sourceEndLine: 440};
MERGE (n:KG {id: 'rom:rocnrope/maincpu/rnr_h5.vid'}) SET n:Rom SET n += {file: 'rnr_h5.vid', offset: 57344, size: 8192, crc: '150a6264', sha1: '930ccf8dcf4971d0a15f406d9114be5ecfaa1727', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 441, sourceColumn: 2, sourceEndLine: 441};
MERGE (n:KG {id: 'region:rocnrope/timeplt_audio:tpsound'}) SET n:RomRegion SET n += {tag: 'timeplt_audio:tpsound', size: 65536, flags: '0', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 443, sourceColumn: 2, sourceEndLine: 443};
MERGE (n:KG {id: 'rom:rocnrope/timeplt_audio:tpsound/rnr_7a.snd'}) SET n:Rom SET n += {file: 'rnr_7a.snd', offset: 0, size: 4096, crc: '75d2c4e2', sha1: 'b701019b4e7b06b268be660ce7958b5367318c27', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 444, sourceColumn: 2, sourceEndLine: 444};
MERGE (n:KG {id: 'rom:rocnrope/timeplt_audio:tpsound/rnr_8a.snd'}) SET n:Rom SET n += {file: 'rnr_8a.snd', offset: 4096, size: 4096, crc: 'ca4325ae', sha1: '34ac035c0c2ed6bcafde1491d976bb9e9d2a2a7d', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 445, sourceColumn: 2, sourceEndLine: 445};
MERGE (n:KG {id: 'region:rocnrope/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 32768, flags: '0', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447};
MERGE (n:KG {id: 'rom:rocnrope/sprites/rnr_a11.vid'}) SET n:Rom SET n += {file: 'rnr_a11.vid', offset: 0, size: 8192, crc: 'afdaba5e', sha1: '27c090cb1c3767c997daeedbe1ba24786f9e78f1', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 448, sourceColumn: 2, sourceEndLine: 448};
MERGE (n:KG {id: 'rom:rocnrope/sprites/rnr_a12.vid'}) SET n:Rom SET n += {file: 'rnr_a12.vid', offset: 8192, size: 8192, crc: '054cafeb', sha1: '4c3cd850b347217af3dd5c9bb84bcff7b30689bd', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 449, sourceColumn: 2, sourceEndLine: 449};
MERGE (n:KG {id: 'rom:rocnrope/sprites/rnr_a9.vid'}) SET n:Rom SET n += {file: 'rnr_a9.vid', offset: 16384, size: 8192, crc: '9d2166b2', sha1: '42d2b05360e58b1b2b3ad06c98eb46d9da2b1c21', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 450, sourceColumn: 2, sourceEndLine: 450};
MERGE (n:KG {id: 'rom:rocnrope/sprites/rnr_a10.vid'}) SET n:Rom SET n += {file: 'rnr_a10.vid', offset: 24576, size: 8192, crc: 'aff6e22f', sha1: '476d67821519feddc9f9c8537b46e6eede790035', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451};
MERGE (n:KG {id: 'region:rocnrope/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 16384, flags: '0', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 453, sourceColumn: 2, sourceEndLine: 453};
MERGE (n:KG {id: 'rom:rocnrope/tiles/rnr_h12.vid'}) SET n:Rom SET n += {file: 'rnr_h12.vid', offset: 0, size: 8192, crc: 'e2114539', sha1: '0ea19ae4d7c2da14f23c81abb8e2c931785b2715', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454};
MERGE (n:KG {id: 'rom:rocnrope/tiles/rnr_h11.vid'}) SET n:Rom SET n += {file: 'rnr_h11.vid', offset: 8192, size: 8192, crc: '169a8f3f', sha1: '182c7c9b9849ebb57b3ff7c0b629f2f8e2efa9ba', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 455, sourceColumn: 2, sourceEndLine: 455};
MERGE (n:KG {id: 'region:rocnrope/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 544, flags: '0', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457};
MERGE (n:KG {id: 'rom:rocnrope/proms/a17_prom.bin'}) SET n:Rom SET n += {file: 'a17_prom.bin', offset: 0, size: 32, crc: '22ad2c3e', sha1: '1c2198b286c75aa9e78d000432795b1ce86ad6b9', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 458, sourceColumn: 2, sourceEndLine: 458};
MERGE (n:KG {id: 'rom:rocnrope/proms/b16_prom.bin'}) SET n:Rom SET n += {file: 'b16_prom.bin', offset: 32, size: 256, crc: '750a9677', sha1: '7a5b4aed5f87180850657b8852bb3f3138d58b5b', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 459, sourceColumn: 2, sourceEndLine: 459};
MERGE (n:KG {id: 'rom:rocnrope/proms/rocnrope.pr3'}) SET n:Rom SET n += {file: 'rocnrope.pr3', offset: 288, size: 256, crc: 'b5c75a27', sha1: '923d6ccf015fd7458494416cc05426cc922a9238', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 460, sourceColumn: 2, sourceEndLine: 460};
MERGE (n:KG {id: 'region:rocnrope/pal_cpuvidbd'}) SET n:RomRegion SET n += {tag: 'pal_cpuvidbd', size: 1, flags: '0', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 462, sourceColumn: 2, sourceEndLine: 462};
MERGE (n:KG {id: 'rom:rocnrope/pal_cpuvidbd/h100.6g'}) SET n:Rom SET n += {file: 'h100.6g', offset: 0, size: 1, crc: '', sha1: '', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 463, sourceColumn: 2, sourceEndLine: 463, status: 'nodump'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map'}) SET n:AddressMap SET n += {cls: 'rocnrope_state', name: 'main_map', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 239, sourceColumn: 1, sourceEndLine: 260};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range0'}) SET n:AddressRange SET n += {start: 12416, end: 12416, raw: 'map(0x3080, 0x3080).portr("SYSTEM")', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 241, sourceColumn: 2, sourceEndLine: 241, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range1'}) SET n:AddressRange SET n += {start: 12417, end: 12417, raw: 'map(0x3081, 0x3081).portr("P1")', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 242, sourceColumn: 2, sourceEndLine: 242, portRead: 'P1'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range2'}) SET n:AddressRange SET n += {start: 12418, end: 12418, raw: 'map(0x3082, 0x3082).portr("P2")', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 243, sourceColumn: 2, sourceEndLine: 243, portRead: 'P2'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range3'}) SET n:AddressRange SET n += {start: 12419, end: 12419, raw: 'map(0x3083, 0x3083).portr("DSW1")', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 244, sourceColumn: 2, sourceEndLine: 244, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range4'}) SET n:AddressRange SET n += {start: 12288, end: 12288, raw: 'map(0x3000, 0x3000).portr("DSW2")', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 245, sourceColumn: 2, sourceEndLine: 245, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range5'}) SET n:AddressRange SET n += {start: 12544, end: 12544, raw: 'map(0x3100, 0x3100).portr("DSW3")', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 246, sourceColumn: 2, sourceEndLine: 246, portRead: 'DSW3'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range6'}) SET n:AddressRange SET n += {start: 16384, end: 16431, raw: 'map(0x4000, 0x402f).ram().share(m_spriteram[1])', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 247, sourceColumn: 2, sourceEndLine: 247, ram: true, share: 'spriteram[1]'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range7'}) SET n:AddressRange SET n += {start: 16432, end: 17407, raw: 'map(0x4030, 0x43ff).ram()', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 248, sourceColumn: 2, sourceEndLine: 248, ram: true};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range8'}) SET n:AddressRange SET n += {start: 17408, end: 17455, raw: 'map(0x4400, 0x442f).ram().share(m_spriteram[0])', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 249, sourceColumn: 2, sourceEndLine: 249, ram: true, share: 'spriteram[0]'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range9'}) SET n:AddressRange SET n += {start: 17456, end: 18431, raw: 'map(0x4430, 0x47ff).ram()', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 250, sourceColumn: 2, sourceEndLine: 250, ram: true};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range10'}) SET n:AddressRange SET n += {start: 18432, end: 19455, raw: 'map(0x4800, 0x4bff).ram().w(FUNC(rocnrope_state::colorram_w)).share(m_colorram)', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 251, sourceColumn: 2, sourceEndLine: 251, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:rocnrope_state.colorram_w'}) SET n:Handler SET n += {method: 'colorram_w', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 157, sourceColumn: 1, sourceEndLine: 161, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range11'}) SET n:AddressRange SET n += {start: 19456, end: 20479, raw: 'map(0x4c00, 0x4fff).ram().w(FUNC(rocnrope_state::videoram_w)).share(m_videoram)', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 252, sourceColumn: 2, sourceEndLine: 252, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:rocnrope_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 151, sourceColumn: 1, sourceEndLine: 155, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range12'}) SET n:AddressRange SET n += {start: 20480, end: 24575, raw: 'map(0x5000, 0x5fff).ram()', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 253, sourceColumn: 2, sourceEndLine: 253, ram: true};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range13'}) SET n:AddressRange SET n += {start: 32768, end: 32768, raw: 'map(0x8000, 0x8000).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 254, sourceColumn: 2, sourceEndLine: 254};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 254, sourceColumn: 2, sourceEndLine: 254};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range14'}) SET n:AddressRange SET n += {start: 32896, end: 32903, raw: 'map(0x8080, 0x8087).w("mainlatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 255, sourceColumn: 2, sourceEndLine: 255};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 255, sourceColumn: 2, sourceEndLine: 255};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range15'}) SET n:AddressRange SET n += {start: 33024, end: 33024, raw: 'map(0x8100, 0x8100).w("timeplt_audio", FUNC(timeplt_audio_device::sound_data_w))', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 256, sourceColumn: 2, sourceEndLine: 256};
MERGE (n:KG {id: 'handler:timeplt_audio_device.sound_data_w'}) SET n:Handler SET n += {method: 'sound_data_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'uint8_t data', sourceBody: 'm_soundlatch->write(data);'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range16'}) SET n:AddressRange SET n += {start: 33154, end: 33165, raw: 'map(0x8182, 0x818d).w(FUNC(rocnrope_state::interrupt_vector_w))', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 257, sourceColumn: 2, sourceEndLine: 257};
MERGE (n:KG {id: 'handler:rocnrope_state.interrupt_vector_w'}) SET n:Handler SET n += {method: 'interrupt_vector_w', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 215, sourceColumn: 1, sourceEndLine: 218, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_vectors[offset] = data;'};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range17'}) SET n:AddressRange SET n += {start: 24576, end: 65535, raw: 'map(0x6000, 0xffff).rom()', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 258, sourceColumn: 2, sourceEndLine: 258, rom: true};
MERGE (n:KG {id: 'map:rocnrope_state.main_map/range18'}) SET n:AddressRange SET n += {start: 65522, end: 65533, raw: 'map(0xfff2, 0xfffd).ram().share(m_vectors)', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 259, sourceColumn: 2, sourceEndLine: 259, ram: true, share: 'vectors'};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}) SET n:AddressMap SET n += {cls: 'timeplt_audio_device', name: 'timeplt_sound_map', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 159, sourceColumn: 1, sourceEndLine: 168};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 12287, raw: 'map(0x0000, 0x2fff).rom()', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 161, sourceColumn: 2, sourceEndLine: 161, rom: true};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range1'}) SET n:AddressRange SET n += {start: 12288, end: 13311, raw: 'map(0x3000, 0x33ff).mirror(0x0c00).ram()', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 162, sourceColumn: 2, sourceEndLine: 162, mirror: 3072, ram: true};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}) SET n:AddressRange SET n += {start: 16384, end: 16384, raw: 'map(0x4000, 0x4000).mirror(0x0fff).rw("ay1", FUNC(ay8910_device::data_r), FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 163, sourceColumn: 2, sourceEndLine: 163, mirror: 4095};
MERGE (n:KG {id: 'handler:ay8910_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay8910_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178};
MERGE (n:KG {id: 'handler:ay8910_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range3'}) SET n:AddressRange SET n += {start: 20480, end: 20480, raw: 'map(0x5000, 0x5000).mirror(0x0fff).w("ay1", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 164, sourceColumn: 2, sourceEndLine: 164, mirror: 4095};
MERGE (n:KG {id: 'handler:ay8910_device.address_w'}) SET n:Handler SET n += {method: 'address_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 179, sourceColumn: 2, sourceEndLine: 179};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).mirror(0x0fff).rw("ay2", FUNC(ay8910_device::data_r), FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 165, sourceColumn: 2, sourceEndLine: 165, mirror: 4095};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range5'}) SET n:AddressRange SET n += {start: 28672, end: 28672, raw: 'map(0x7000, 0x7000).mirror(0x0fff).w("ay2", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 166, sourceColumn: 2, sourceEndLine: 166, mirror: 4095};
MERGE (n:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range6'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).w(FUNC(timeplt_audio_device::filter_w))', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 167, sourceColumn: 2, sourceEndLine: 167};
MERGE (n:KG {id: 'handler:timeplt_audio_device.filter_w'}) SET n:Handler SET n += {method: 'filter_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 109, sourceColumn: 1, sourceEndLine: 117, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'set_filter(1, 0, (offset >>  0) & 3);
	set_filter(1, 1, (offset >>  2) & 3);
	set_filter(1, 2, (offset >>  4) & 3);
	set_filter(0, 0, (offset >>  6) & 3);
	set_filter(0, 1, (offset >>  8) & 3);
	set_filter(0, 2, (offset >> 10) & 3);'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.set_filter'}) SET n:Handler SET n += {method: 'set_filter', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 96, sourceColumn: 1, sourceEndLine: 106, sourceConstants: ['LOWPASS_3R=0'], sourceParameters: 'int no, int ch, int data', sourceBody: 'int C = 0;

	if (BIT(data, 0))
		C += 220000;    /* 220000pF = 0.220uF */
	if (BIT(data, 1))
		C +=  47000;    /*  47000pF = 0.047uF */

	m_filter[no][ch]->filter_rc_set_RC(filter_rc_device::LOWPASS_3R, 1000, 5100, 0, CAP_P(C));'};
MERGE (n:KG {id: 'machine:rocnrope_state.rocnrope'}) SET n:MachineConfig SET n += {cls: 'rocnrope_state', name: 'rocnrope', calls: [], stateMembers: ['{"name":"m_irq_mask","bits":8}'], startHandlers: ['rocnrope_state.video_start'], sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 389, sourceColumn: 1, sourceEndLine: 420};
MERGE (n:KG {id: 'handler:rocnrope_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 173, sourceColumn: 1, sourceEndLine: 176, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(rocnrope_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);'};
MERGE (n:KG {id: 'handler:rocnrope_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 163, sourceColumn: 1, sourceEndLine: 171, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int const attr = m_colorram[tile_index];
	int const code = m_videoram[tile_index] + 2 * (attr & 0x80);
	int const color = attr & 0x0f;
	int const flags = ((attr & 0x40) ? TILE_FLIPX : 0) | ((attr & 0x20) ? TILE_FLIPY : 0);

	tileinfo.set(1, code, color, flags);'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/maincpu'}) SET n:Device SET n += {type: 'KONAMI1', tag: 'maincpu', clock: 1536000, config: ['KONAMI1(config, m_maincpu, XTAL(18\'432\'000) / 3 / 4)', 'm_maincpu->set_addrmap(AS_PROGRAM, &rocnrope_state::main_map)'], cls: 'konami1_device', clsHierarchy: ['konami1_device'], sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 392, sourceColumn: 2, sourceEndLine: 392};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['ls259_device &mainlatch(LS259(config, "mainlatch"))', 'mainlatch.q_out_cb<0>().set(FUNC(rocnrope_state::flip_screen_set)).invert()', 'mainlatch.q_out_cb<1>().set("timeplt_audio", FUNC(timeplt_audio_device::sh_irqtrigger_w))', 'mainlatch.q_out_cb<2>().set("timeplt_audio", FUNC(timeplt_audio_device::mute_w))', 'mainlatch.q_out_cb<3>().set(FUNC(rocnrope_state::coin_counter_w<0>))', 'mainlatch.q_out_cb<4>().set(FUNC(rocnrope_state::coin_counter_w<1>))', 'mainlatch.q_out_cb<7>().set(FUNC(rocnrope_state::irq_mask_w))'], sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 395, sourceColumn: 2, sourceEndLine: 395};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<0>().set(FUNC(rocnrope_state::flip_screen_set)).invert()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 396, sourceColumn: 2, sourceEndLine: 396, slot: '0', transforms: ['invert'], targetClass: 'rocnrope_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:rocnrope_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 396, sourceColumn: 2, sourceEndLine: 396};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<1>().set("timeplt_audio", FUNC(timeplt_audio_device::sh_irqtrigger_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 397, sourceColumn: 2, sourceEndLine: 397, slot: '1', targetTag: 'timeplt_audio', targetClass: 'timeplt_audio_device', targetMethod: 'sh_irqtrigger_w'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.sh_irqtrigger_w'}) SET n:Handler SET n += {method: 'sh_irqtrigger_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 133, sourceColumn: 1, sourceEndLine: 142, sourceParameters: 'int state', sourceBody: 'if (m_last_irq_state == 0 && state)
	{
		/* setting bit 0 low then high triggers IRQ on the sound CPU */
		m_soundcpu->set_input_line(0, HOLD_LINE); // Z80 IM1
	}

	m_last_irq_state = state;'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<2>().set("timeplt_audio", FUNC(timeplt_audio_device::mute_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 398, sourceColumn: 2, sourceEndLine: 398, slot: '2', targetTag: 'timeplt_audio', targetClass: 'timeplt_audio_device', targetMethod: 'mute_w'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.mute_w'}) SET n:Handler SET n += {method: 'mute_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 149, sourceParameters: 'int state', sourceBody: '// controls pin 6 (DC audio mute) of LA4460 amplifier
	machine().sound().system_mute(state);'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<3>().set(FUNC(rocnrope_state::coin_counter_w<0>))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 399, sourceColumn: 2, sourceEndLine: 399, slot: '3', targetClass: 'rocnrope_state', targetMethod: 'coin_counter_w_0'};
MERGE (n:KG {id: 'handler:rocnrope_state.coin_counter_w_0'}) SET n:Handler SET n += {method: 'coin_counter_w_0', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 228, sourceColumn: 1, sourceEndLine: 231, sourceConstants: ['Which=0'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<4>().set(FUNC(rocnrope_state::coin_counter_w<1>))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 400, sourceColumn: 2, sourceEndLine: 400, slot: '4', targetClass: 'rocnrope_state', targetMethod: 'coin_counter_w_1'};
MERGE (n:KG {id: 'handler:rocnrope_state.coin_counter_w_1'}) SET n:Handler SET n += {method: 'coin_counter_w_1', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 228, sourceColumn: 1, sourceEndLine: 231, sourceConstants: ['Which=1'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<7>().set(FUNC(rocnrope_state::irq_mask_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 401, sourceColumn: 2, sourceEndLine: 401, slot: '7', targetClass: 'rocnrope_state', targetMethod: 'irq_mask_w'};
MERGE (n:KG {id: 'handler:rocnrope_state.irq_mask_w'}) SET n:Handler SET n += {method: 'irq_mask_w', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 220, sourceColumn: 1, sourceEndLine: 225, sourceConstants: ['M6809_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'm_irq_mask = state;
	if (!m_irq_mask)
		m_maincpu->set_input_line(M6809_IRQ_LINE, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 403, sourceColumn: 2, sourceEndLine: 403};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_refresh_hz(60)', 'screen.set_vblank_time(ATTOSECONDS_IN_USEC(0))', 'screen.set_size(32*8, 32*8)', 'screen.set_visarea(0*8, 32*8-1, 2*8, 30*8-1)', 'screen.set_screen_update(FUNC(rocnrope_state::screen_update))', 'screen.set_palette(m_palette)', 'screen.screen_vblank().set(FUNC(rocnrope_state::vblank_irq))'], sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 406, sourceColumn: 2, sourceEndLine: 406, configCalls: ['set_refresh_hz(60)', 'set_size(256,256)', 'set_visarea(0,255,16,239)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRefreshHz: 60, screenSize: [256, 256], screenVisarea: [0, 255, 16, 239]};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(rocnrope_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 411, sourceColumn: 2, sourceEndLine: 411, targetClass: 'rocnrope_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:rocnrope_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 193, sourceColumn: 1, sourceEndLine: 198, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:rocnrope_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 178, sourceColumn: 1, sourceEndLine: 191, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'for (int offs = m_spriteram[0].bytes() - 2; offs >= 0; offs -= 2)
	{
		int const color = m_spriteram[1][offs] & 0x0f;

		m_gfxdecode->gfx(0)->transmask(bitmap, cliprect,
				m_spriteram[0][offs + 1],
				color,
				m_spriteram[1][offs] & 0x40, ~m_spriteram[1][offs] & 0x80,
				240 - m_spriteram[0][offs], m_spriteram[1][offs + 1],
				m_palette->transpen_mask(*m_gfxdecode->gfx(0), color, 0));
	}'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'screen.screen_vblank().set(FUNC(rocnrope_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 413, sourceColumn: 2, sourceEndLine: 413, targetClass: 'rocnrope_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:rocnrope_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 383, sourceColumn: 1, sourceEndLine: 387, sourceConstants: ['M6809_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'if (state && m_irq_mask)
		m_maincpu->set_input_line(M6809_IRQ_LINE, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_rocnrope)'], sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 415, sourceColumn: 2, sourceEndLine: 415, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(rocnrope_state::palette), 16*16+16*16, 32)'], sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 416, sourceColumn: 2, sourceEndLine: 416, clockExpr: 'FUNC(rocnrope_state::palette)'};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/timeplt_audio'}) SET n:Device SET n += {type: 'TIMEPLT_AUDIO', tag: 'timeplt_audio', clock: 14318181, config: ['TIMEPLT_AUDIO(config, "timeplt_audio")'], cls: 'timeplt_audio_device', clsHierarchy: ['timeplt_audio_device'], sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 419, sourceColumn: 2, sourceEndLine: 419};
MERGE (n:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'timeplt_audio_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_last_irq_state","bits":8}'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 189, sourceColumn: 1, sourceEndLine: 217};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/tpsound'}) SET n:Device SET n += {type: 'Z80', tag: 'tpsound', clock: 1789772.625, config: ['Z80(config, m_soundcpu, DERIVED_CLOCK(1, 8))', 'm_soundcpu->set_addrmap(AS_PROGRAM, &timeplt_audio_device::timeplt_sound_map)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 192, sourceColumn: 2, sourceEndLine: 192};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()', 'for (required_device<filter_rc_device> &filter : m_filter[0])
		FILTER_RC(config, filter).add_route(ALL_OUTPUTS, "mono", 1.0)', 'for (required_device<filter_rc_device> &filter : m_filter[1])
		FILTER_RC(config, filter).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 196, sourceColumn: 2, sourceEndLine: 196};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 198, sourceColumn: 2, sourceEndLine: 198};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay1', clock: 1789772.625, config: ['ay8910_device &ay1(AY8910(config, "ay1", DERIVED_CLOCK(1, 8)))', 'ay1.port_a_read_callback().set(m_soundlatch, FUNC(generic_latch_8_device::read))', 'ay1.port_b_read_callback().set(FUNC(timeplt_audio_device::portB_r))', 'ay1.add_route(0, "filter.0.0", 0.60)', 'ay1.add_route(1, "filter.0.1", 0.60)', 'ay1.add_route(2, "filter.0.2", 0.60)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 200, sourceColumn: 2, sourceEndLine: 200};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filter.0.0', gain: 0.6, raw: 'ay1.add_route(0, "filter.0.0", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 203, sourceColumn: 2, sourceEndLine: 203};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/1'}) SET n:AudioRoute SET n += {output: '1', target: 'filter.0.1', gain: 0.6, raw: 'ay1.add_route(1, "filter.0.1", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 204, sourceColumn: 2, sourceEndLine: 204};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/2'}) SET n:AudioRoute SET n += {output: '2', target: 'filter.0.2', gain: 0.6, raw: 'ay1.add_route(2, "filter.0.2", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 205, sourceColumn: 2, sourceEndLine: 205};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set', raw: 'ay1.port_a_read_callback().set(m_soundlatch, FUNC(generic_latch_8_device::read))', ownerTag: 'ay1', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 201, sourceColumn: 2, sourceEndLine: 201, targetClass: 'generic_latch_8_device', targetMethod: 'read', targetTag: 'soundlatch'};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 201, sourceColumn: 2, sourceEndLine: 201};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:1'}) SET n:Callback SET n += {signal: 'port_b_read_callback', operation: 'set', raw: 'ay1.port_b_read_callback().set(FUNC(timeplt_audio_device::portB_r))', ownerTag: 'ay1', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 202, sourceColumn: 2, sourceEndLine: 202, targetClass: 'timeplt_audio_device', targetMethod: 'portB_r'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.portB_r'}) SET n:Handler SET n += {method: 'portB_r', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 78, sourceColumn: 1, sourceEndLine: 86, sourceParameters: '', sourceBody: 'return TABLE((m_soundcpu->total_cycles() / 512) % 10, 0x00, 0x10, 0x20, 0x30, 0x40, 0x90, 0xa0, 0xb0, 0xa0, 0xd0);'};
MERGE (n:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay2', clock: 1789772.625, config: ['ay8910_device &ay2(AY8910(config, "ay2", DERIVED_CLOCK(1, 8)))', 'ay2.add_route(0, "filter.1.0", 0.60)', 'ay2.add_route(1, "filter.1.1", 0.60)', 'ay2.add_route(2, "filter.1.2", 0.60)'], sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 207, sourceColumn: 2, sourceEndLine: 207};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filter.1.0', gain: 0.6, raw: 'ay2.add_route(0, "filter.1.0", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 208, sourceColumn: 2, sourceEndLine: 208};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/1'}) SET n:AudioRoute SET n += {output: '1', target: 'filter.1.1', gain: 0.6, raw: 'ay2.add_route(1, "filter.1.1", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 209, sourceColumn: 2, sourceEndLine: 209};
MERGE (n:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/2'}) SET n:AudioRoute SET n += {output: '2', target: 'filter.1.2', gain: 0.6, raw: 'ay2.add_route(2, "filter.1.2", 0.60)', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 210, sourceColumn: 2, sourceEndLine: 210};
MERGE (n:KG {id: 'inputs:rocnrope'}) SET n:InputPorts SET n += {name: 'rocnrope', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 269, sourceColumn: 8, sourceEndLine: 269};
MERGE (n:KG {id: 'inputs:rocnrope/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:rocnrope/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:rocnrope/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:rocnrope/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:rocnrope/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:rocnrope/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:rocnrope/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:rocnrope/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:rocnrope/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:rocnrope/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:rocnrope/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:rocnrope/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:rocnrope/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:rocnrope/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:rocnrope/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:rocnrope/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:rocnrope/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:rocnrope/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:rocnrope/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:rocnrope/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:rocnrope/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:rocnrope/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:rocnrope/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:rocnrope/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:rocnrope/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:rocnrope/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_COCKTAIL'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:rocnrope/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:rocnrope/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:rocnrope/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION(#SW1":1,2,3,4")'], name: 'Coin A', defaultValue: 15, location: '#SW1":1,2,3,4"', settings: ['2=4C 1C', '5=3C 1C', '8=2C 1C', '4=3C 2C', '1=4C 3C', '15=1C 1C', '3=3C 4C', '7=2C 3C', '14=1C 2C', '6=2C 5C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C', '9=1C 7C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:rocnrope/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION(#SW1":5,6,7,8")'], name: 'Coin B', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['32=4C 1C', '80=3C 1C', '128=2C 1C', '64=3C 2C', '16=4C 3C', '240=1C 1C', '48=3C 4C', '112=2C 3C', '224=1C 2C', '96=2C 5C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '160=1C 6C', '144=1C 7C', '0=No Coin B']};
MERGE (n:KG {id: 'inputs:rocnrope/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:rocnrope/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:1,2")'], name: 'Lives', defaultValue: 3, location: 'SW2:1,2', settings: ['3=3', '2=4', '1=5', '0=255 (Cheat)']};
MERGE (n:KG {id: 'inputs:rocnrope/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:3', settings: ['0=Upright', '4=Cocktail']};
MERGE (n:KG {id: 'inputs:rocnrope/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 120, modifiers: ['PORT_DIPLOCATION("SW2:4,5,6,7")'], name: 'Difficulty', defaultValue: 88, location: 'SW2:4,5,6,7', settings: ['120=1 (Easy)', '112=2', '104=3', '96=4', '88=5', '80=6', '72=7', '64=8', '56=9', '48=10', '40=11', '32=12', '24=13', '16=14', '8=15', '0=16 (Difficult)']};
MERGE (n:KG {id: 'inputs:rocnrope/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:rocnrope/DSW3'}) SET n:Port SET n += {tag: 'DSW3', modify: false};
MERGE (n:KG {id: 'inputs:rocnrope/DSW3/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, modifiers: ['PORT_DIPLOCATION("SW3:1,2,3")'], name: 'First Bonus', defaultValue: 6, location: 'SW3:1,2,3', settings: ['7=20000', '6=20000', '5=30000', '4=40000', '3=50000', '2=60000', '1=70000', '0=80000']};
MERGE (n:KG {id: 'inputs:rocnrope/DSW3/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 56, modifiers: ['PORT_DIPLOCATION("SW3:4,5,6")'], name: 'Repeated Bonus', defaultValue: 16, location: 'SW3:4,5,6', settings: ['56=40000', '48=40000', '40=40000', '32=40000', '24=50000', '16=60000', '8=70000', '0=80000']};
MERGE (n:KG {id: 'inputs:rocnrope/DSW3/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW3:7")'], name: 'Grant Repeated Bonus', defaultValue: 0, location: 'SW3:7', settings: ['64=No', '0=Yes']};
MERGE (n:KG {id: 'inputs:rocnrope/DSW3/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 512, planes: 4, planeOffsets: [65540, 65536, 4, 0], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 256, planes: 4, planeOffsets: [131076, 131072, 4, 0], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_rocnrope'}) SET n:GfxDecode SET n += {name: 'gfx_rocnrope', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 370, sourceColumn: 8, sourceEndLine: 370};
MERGE (n:KG {id: 'gfxdecode:gfx_rocnrope/e0'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'spritelayout', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_rocnrope/e1'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'charlayout', colorBase: 256, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:rocnrope_state.rocnrope/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(rocnrope_state::palette), 16*16+16*16, 32)', ownerTag: 'palette', targetClass: 'rocnrope_state', targetMethod: 'palette', entries: 32, sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 416};
MERGE (n:KG {id: 'handler:rocnrope_state.palette'}) SET n:Handler SET n += {method: 'palette', ownerClass: 'rocnrope_state', sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 102, sourceColumn: 1, sourceEndLine: 149, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();
	
	

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

	// sprites and characters
	for (int i = 0; i < 0x200; i++)
	{
		uint8_t const ctabentry = color_prom[i] & 0x0f;
		palette.set_pen_indirect(i, ctabentry);
	}'};
MATCH (a:KG {id: 'game:rocnrope'}), (b:KG {id: 'file:src/mame/konami/rocnrope.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 570, sourceColumn: 1, sourceEndLine: 570};
MATCH (a:KG {id: 'game:rocnrope'}), (b:KG {id: 'machine:rocnrope_state.rocnrope'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:rocnrope'}), (b:KG {id: 'inputs:rocnrope'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:rocnrope'}), (b:KG {id: 'romset:rocnrope'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:konami1.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:konamipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:timeplt_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:cpu/m6809/m6809.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/rocnrope.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'file:src/mame/konami/rocnrope.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 389, sourceColumn: 1, sourceEndLine: 420};
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'handler:rocnrope_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'device:rocnrope_state.rocnrope/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'device:rocnrope_state.rocnrope/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'device:rocnrope_state.rocnrope/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'device:rocnrope_state.rocnrope/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'device:rocnrope_state.rocnrope/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'gfxdecode:gfx_rocnrope'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'device:rocnrope_state.rocnrope/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:rocnrope_state.rocnrope'}), (b:KG {id: 'device:rocnrope_state.rocnrope/timeplt_audio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:rocnrope'}), (b:KG {id: 'file:src/mame/konami/rocnrope.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 269, sourceColumn: 8, sourceEndLine: 269};
MATCH (a:KG {id: 'inputs:rocnrope'}), (b:KG {id: 'inputs:rocnrope/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rocnrope'}), (b:KG {id: 'inputs:rocnrope/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rocnrope'}), (b:KG {id: 'inputs:rocnrope/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rocnrope'}), (b:KG {id: 'inputs:rocnrope/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rocnrope'}), (b:KG {id: 'inputs:rocnrope/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rocnrope'}), (b:KG {id: 'inputs:rocnrope/DSW3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:rocnrope'}), (b:KG {id: 'file:src/mame/konami/rocnrope.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 435, sourceColumn: 1, sourceEndLine: 435};
MATCH (a:KG {id: 'romset:rocnrope'}), (b:KG {id: 'region:rocnrope/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rocnrope'}), (b:KG {id: 'region:rocnrope/timeplt_audio:tpsound'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rocnrope'}), (b:KG {id: 'region:rocnrope/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rocnrope'}), (b:KG {id: 'region:rocnrope/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rocnrope'}), (b:KG {id: 'region:rocnrope/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rocnrope'}), (b:KG {id: 'region:rocnrope/pal_cpuvidbd'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:rocnrope_state.video_start'}), (b:KG {id: 'handler:rocnrope_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/maincpu'}), (b:KG {id: 'map:rocnrope_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch'}), (b:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch'}), (b:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch'}), (b:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch'}), (b:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch'}), (b:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch'}), (b:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/screen'}), (b:KG {id: 'device:rocnrope_state.rocnrope/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/screen'}), (b:KG {id: 'device:rocnrope_state.rocnrope/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_rocnrope'}), (b:KG {id: 'file:src/mame/konami/rocnrope.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 370, sourceColumn: 8, sourceEndLine: 370};
MATCH (a:KG {id: 'gfxdecode:gfx_rocnrope'}), (b:KG {id: 'gfxdecode:gfx_rocnrope/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_rocnrope'}), (b:KG {id: 'gfxdecode:gfx_rocnrope/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/palette'}), (b:KG {id: 'device:rocnrope_state.rocnrope/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/timeplt_audio'}), (b:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/SYSTEM'}), (b:KG {id: 'inputs:rocnrope/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/SYSTEM'}), (b:KG {id: 'inputs:rocnrope/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/SYSTEM'}), (b:KG {id: 'inputs:rocnrope/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/SYSTEM'}), (b:KG {id: 'inputs:rocnrope/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/SYSTEM'}), (b:KG {id: 'inputs:rocnrope/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/SYSTEM'}), (b:KG {id: 'inputs:rocnrope/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/SYSTEM'}), (b:KG {id: 'inputs:rocnrope/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/SYSTEM'}), (b:KG {id: 'inputs:rocnrope/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P1'}), (b:KG {id: 'inputs:rocnrope/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P1'}), (b:KG {id: 'inputs:rocnrope/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P1'}), (b:KG {id: 'inputs:rocnrope/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P1'}), (b:KG {id: 'inputs:rocnrope/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P1'}), (b:KG {id: 'inputs:rocnrope/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P1'}), (b:KG {id: 'inputs:rocnrope/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P1'}), (b:KG {id: 'inputs:rocnrope/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P1'}), (b:KG {id: 'inputs:rocnrope/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P2'}), (b:KG {id: 'inputs:rocnrope/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P2'}), (b:KG {id: 'inputs:rocnrope/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P2'}), (b:KG {id: 'inputs:rocnrope/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P2'}), (b:KG {id: 'inputs:rocnrope/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P2'}), (b:KG {id: 'inputs:rocnrope/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P2'}), (b:KG {id: 'inputs:rocnrope/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P2'}), (b:KG {id: 'inputs:rocnrope/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/P2'}), (b:KG {id: 'inputs:rocnrope/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW1'}), (b:KG {id: 'inputs:rocnrope/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW1'}), (b:KG {id: 'inputs:rocnrope/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW2'}), (b:KG {id: 'inputs:rocnrope/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW2'}), (b:KG {id: 'inputs:rocnrope/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW2'}), (b:KG {id: 'inputs:rocnrope/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW2'}), (b:KG {id: 'inputs:rocnrope/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW3'}), (b:KG {id: 'inputs:rocnrope/DSW3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW3'}), (b:KG {id: 'inputs:rocnrope/DSW3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW3'}), (b:KG {id: 'inputs:rocnrope/DSW3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rocnrope/DSW3'}), (b:KG {id: 'inputs:rocnrope/DSW3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:rocnrope/maincpu'}), (b:KG {id: 'rom:rocnrope/maincpu/rr1.1h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/maincpu'}), (b:KG {id: 'rom:rocnrope/maincpu/rr2.2h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/maincpu'}), (b:KG {id: 'rom:rocnrope/maincpu/rr3.3h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/maincpu'}), (b:KG {id: 'rom:rocnrope/maincpu/rr4.4h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/maincpu'}), (b:KG {id: 'rom:rocnrope/maincpu/rnr_h5.vid'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/timeplt_audio:tpsound'}), (b:KG {id: 'rom:rocnrope/timeplt_audio:tpsound/rnr_7a.snd'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/timeplt_audio:tpsound'}), (b:KG {id: 'rom:rocnrope/timeplt_audio:tpsound/rnr_8a.snd'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/sprites'}), (b:KG {id: 'rom:rocnrope/sprites/rnr_a11.vid'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/sprites'}), (b:KG {id: 'rom:rocnrope/sprites/rnr_a12.vid'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/sprites'}), (b:KG {id: 'rom:rocnrope/sprites/rnr_a9.vid'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/sprites'}), (b:KG {id: 'rom:rocnrope/sprites/rnr_a10.vid'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/tiles'}), (b:KG {id: 'rom:rocnrope/tiles/rnr_h12.vid'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/tiles'}), (b:KG {id: 'rom:rocnrope/tiles/rnr_h11.vid'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/proms'}), (b:KG {id: 'rom:rocnrope/proms/a17_prom.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/proms'}), (b:KG {id: 'rom:rocnrope/proms/b16_prom.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/proms'}), (b:KG {id: 'rom:rocnrope/proms/rocnrope.pr3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rocnrope/pal_cpuvidbd'}), (b:KG {id: 'rom:rocnrope/pal_cpuvidbd/h100.6g'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'file:src/mame/konami/rocnrope.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/rocnrope.cpp', sourceLine: 239, sourceColumn: 1, sourceEndLine: 260};
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map'}), (b:KG {id: 'map:rocnrope_state.main_map/range18'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:rocnrope_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:1'}), (b:KG {id: 'handler:timeplt_audio_device.sh_irqtrigger_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:2'}), (b:KG {id: 'handler:timeplt_audio_device.mute_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:3'}), (b:KG {id: 'handler:rocnrope_state.coin_counter_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:4'}), (b:KG {id: 'handler:rocnrope_state.coin_counter_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/mainlatch/callback:mainlatch:5'}), (b:KG {id: 'handler:rocnrope_state.irq_mask_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/screen/callback:screen:0'}), (b:KG {id: 'handler:rocnrope_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/screen/callback:screen:1'}), (b:KG {id: 'handler:rocnrope_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_rocnrope/e0'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_rocnrope/e1'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:rocnrope_state.rocnrope/palette/callback:palette_init'}), (b:KG {id: 'handler:rocnrope_state.palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 189, sourceColumn: 1, sourceEndLine: 217};
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/tpsound'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map/range10'}), (b:KG {id: 'handler:rocnrope_state.colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map/range11'}), (b:KG {id: 'handler:rocnrope_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:rocnrope_state.main_map/range13'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:rocnrope_state.main_map/range14'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:rocnrope_state.main_map/range15'}), (b:KG {id: 'handler:timeplt_audio_device.sound_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'timeplt_audio'};
MATCH (a:KG {id: 'map:rocnrope_state.main_map/range16'}), (b:KG {id: 'handler:rocnrope_state.interrupt_vector_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:rocnrope_state.screen_update'}), (b:KG {id: 'handler:rocnrope_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/konami/rocnrope.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/konami/rocnrope.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}), (b:KG {id: 'file:timeplt_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/tpsound'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay1/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}), (b:KG {id: 'audioroute:device:timeplt_audio_device.device_add_mconfig/ay2/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 159, sourceColumn: 1, sourceEndLine: 168};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map'}), (b:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:0'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:0'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/soundlatch'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1/callback:ay1:1'}), (b:KG {id: 'handler:timeplt_audio_device.portB_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range3'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range5'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range6'}), (b:KG {id: 'handler:timeplt_audio_device.filter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:timeplt_audio_device.filter_w'}), (b:KG {id: 'handler:timeplt_audio_device.set_filter'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
