// mamekit knowledge graph — driver src/mame/konami/tutankhm.cpp
// generated 2026-09-05T03:50:19.817Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/konami/tutankhm.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/konami/tutankhm.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:tutankhm.h'}) SET n:SourceFile SET n += {path: 'tutankhm.h', external: true};
MERGE (n:KG {id: 'file:konamipt.h'}) SET n:SourceFile SET n += {path: 'konamipt.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/m6809.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/m6809.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:timeplt_a.h'}) SET n:SourceFile SET n += {path: 'timeplt_a.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/shared/timeplt_a.cpp'};
MERGE (n:KG {id: 'game:tutankhm'}) SET n:Game SET n += {name: 'tutankhm', year: '1982', company: 'Konami', fullname: 'Tutankham', monitor: 'ROT90', cls: 'tutankhm_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE | MACHINE_IMPERFECT_GRAPHICS', kind: 'arcade', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 446, sourceColumn: 1, sourceEndLine: 446};
MERGE (n:KG {id: 'romset:tutankhm'}) SET n:RomSet SET n += {name: 'tutankhm', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 330, sourceColumn: 1, sourceEndLine: 330};
MERGE (n:KG {id: 'region:tutankhm/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 131072, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 332, sourceColumn: 2, sourceEndLine: 332};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/m1.1h'}) SET n:Rom SET n += {file: 'm1.1h', offset: 40960, size: 4096, crc: 'da18679f', sha1: '8d2a3665db937d0e1d19300ae22277d9db61fcbc', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 333, sourceColumn: 2, sourceEndLine: 333};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/m2.2h'}) SET n:Rom SET n += {file: 'm2.2h', offset: 45056, size: 4096, crc: 'a0f02c85', sha1: '29a78b3ffd6b597772953543b02dd59acf5af38c', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 334, sourceColumn: 2, sourceEndLine: 334};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/3j.3h'}) SET n:Rom SET n += {file: '3j.3h', offset: 49152, size: 4096, crc: 'ea03a1ab', sha1: '27a3cca0595bac642caaf9ee2f276814442c8721', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 335, sourceColumn: 2, sourceEndLine: 335};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/m4.4h'}) SET n:Rom SET n += {file: 'm4.4h', offset: 53248, size: 4096, crc: 'bd06fad0', sha1: 'bd10bbb413d8dd362072522e902575d819fa8336', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 336, sourceColumn: 2, sourceEndLine: 336};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/m5.5h'}) SET n:Rom SET n += {file: 'm5.5h', offset: 57344, size: 4096, crc: 'bf9fd9b0', sha1: '458ea2ff5eedaaa02e32444dd6004d2eaadbdeab', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 337, sourceColumn: 2, sourceEndLine: 337};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/j6.6h'}) SET n:Rom SET n += {file: 'j6.6h', offset: 61440, size: 4096, crc: 'fe079c5b', sha1: '0757490aaa1cea4f4bbe1230d811a0d917f59e52', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 338, sourceColumn: 2, sourceEndLine: 338};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/c1.1i'}) SET n:Rom SET n += {file: 'c1.1i', offset: 65536, size: 4096, crc: '7eb59b21', sha1: '664d3e08df0f3d6690838810b6fe273eec3b7821', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 339, sourceColumn: 2, sourceEndLine: 339};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/c2.2i'}) SET n:Rom SET n += {file: 'c2.2i', offset: 69632, size: 4096, crc: '6615eff3', sha1: 'e8455eab03f66642880595cfa0e9be285bf9fad0', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 340, sourceColumn: 2, sourceEndLine: 340};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/c3.3i'}) SET n:Rom SET n += {file: 'c3.3i', offset: 73728, size: 4096, crc: 'a10d4444', sha1: '683899e1014ee075b16d9d2610c3c5b5c4efedb6', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 341, sourceColumn: 2, sourceEndLine: 341};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/c4.4i'}) SET n:Rom SET n += {file: 'c4.4i', offset: 77824, size: 4096, crc: '58cd143c', sha1: 'e4ab27c09858cede478f4ed3ac6d7392e383a470', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 342, sourceColumn: 2, sourceEndLine: 342};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/c5.5i'}) SET n:Rom SET n += {file: 'c5.5i', offset: 81920, size: 4096, crc: 'd7e7ae95', sha1: '7068797770a6c42dc733b253bf6b7376eb6e071e', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 343, sourceColumn: 2, sourceEndLine: 343};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/c6.6i'}) SET n:Rom SET n += {file: 'c6.6i', offset: 86016, size: 4096, crc: '91f62b82', sha1: '2a78039ee63226978544142727d00d1ccc6d2ab4', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 344, sourceColumn: 2, sourceEndLine: 344};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/c7.7i'}) SET n:Rom SET n += {file: 'c7.7i', offset: 90112, size: 4096, crc: 'afd0a81f', sha1: 'cf10308a0fa4ffabd0deeb186b5602468028ff92', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 345, sourceColumn: 2, sourceEndLine: 345};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/c8.8i'}) SET n:Rom SET n += {file: 'c8.8i', offset: 94208, size: 4096, crc: 'dabb609b', sha1: '773b99b670db41a9de58d14b51f81ce0c446ca84', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 346, sourceColumn: 2, sourceEndLine: 346};
MERGE (n:KG {id: 'rom:tutankhm/maincpu/c9.9i'}) SET n:Rom SET n += {file: 'c9.9i', offset: 98304, size: 4096, crc: '8ea9c6a6', sha1: 'fe1b299f8760fc5418179d3569932ee2c4dff461', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 347, sourceColumn: 2, sourceEndLine: 347};
MERGE (n:KG {id: 'region:tutankhm/timeplt_audio:tpsound'}) SET n:RomRegion SET n += {tag: 'timeplt_audio:tpsound', size: 12288, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351};
MERGE (n:KG {id: 'rom:tutankhm/timeplt_audio:tpsound/s1.7a'}) SET n:Rom SET n += {file: 's1.7a', offset: 0, size: 4096, crc: 'b52d01fa', sha1: '9b6cf9ea51d3a87c174f34d42a4b1b5f38b48723', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 352, sourceColumn: 2, sourceEndLine: 352};
MERGE (n:KG {id: 'rom:tutankhm/timeplt_audio:tpsound/s2.8a'}) SET n:Rom SET n += {file: 's2.8a', offset: 4096, size: 4096, crc: '9db5c0ce', sha1: 'b5bc1d89a7f7d7a0baae64390c37ee11f69a0e76', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 353, sourceColumn: 2, sourceEndLine: 353};
MERGE (n:KG {id: 'map:tutankhm_state.main_map'}) SET n:AddressMap SET n += {cls: 'tutankhm_state', name: 'main_map', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 166, sourceColumn: 1, sourceEndLine: 193};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).ram().share(m_videoram)', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 168, sourceColumn: 2, sourceEndLine: 168, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 32783, raw: 'map(0x8000, 0x800f).mirror(0x00f0).ram().w(m_palette, FUNC(palette_device::write8)).share("palette")', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 169, sourceColumn: 2, sourceEndLine: 169, mirror: 240, ram: true, share: 'palette'};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 169, sourceColumn: 2, sourceEndLine: 169};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range2'}) SET n:AddressRange SET n += {start: 33024, end: 33024, raw: 'map(0x8100, 0x8100).mirror(0x000f).ram().share(m_scroll)', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 171, sourceColumn: 2, sourceEndLine: 171, mirror: 15, ram: true, share: 'scroll'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range3'}) SET n:AddressRange SET n += {start: 33056, end: 33056, raw: 'map(0x8120, 0x8120).mirror(0x000f).r("watchdog", FUNC(watchdog_timer_device::reset_r))', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178, mirror: 15};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_r'}) SET n:Handler SET n += {method: 'reset_r', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range4'}) SET n:AddressRange SET n += {start: 33120, end: 33120, raw: 'map(0x8160, 0x8160).mirror(0x000f).portr("DSW2")', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 180, sourceColumn: 2, sourceEndLine: 180, mirror: 15, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range5'}) SET n:AddressRange SET n += {start: 33152, end: 33152, raw: 'map(0x8180, 0x8180).mirror(0x000f).portr("IN0")', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 181, sourceColumn: 2, sourceEndLine: 181, mirror: 15, portRead: 'IN0'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range6'}) SET n:AddressRange SET n += {start: 33184, end: 33184, raw: 'map(0x81a0, 0x81a0).mirror(0x000f).portr("IN1")', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 182, sourceColumn: 2, sourceEndLine: 182, mirror: 15, portRead: 'IN1'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range7'}) SET n:AddressRange SET n += {start: 33216, end: 33216, raw: 'map(0x81c0, 0x81c0).mirror(0x000f).portr("IN2")', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 183, sourceColumn: 2, sourceEndLine: 183, mirror: 15, portRead: 'IN2'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range8'}) SET n:AddressRange SET n += {start: 33248, end: 33248, raw: 'map(0x81e0, 0x81e0).mirror(0x000f).portr("DSW1")', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 184, sourceColumn: 2, sourceEndLine: 184, mirror: 15, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range9'}) SET n:AddressRange SET n += {start: 33280, end: 33287, raw: 'map(0x8200, 0x8207).mirror(0x00f8).nopr().w("mainlatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 185, sourceColumn: 2, sourceEndLine: 185, mirror: 248, nopr: true};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 185, sourceColumn: 2, sourceEndLine: 185};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range10'}) SET n:AddressRange SET n += {start: 33536, end: 33536, raw: 'map(0x8300, 0x8300).mirror(0x00ff).w(FUNC(tutankhm_state::bankselect_w))', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 186, sourceColumn: 2, sourceEndLine: 186, mirror: 255};
MERGE (n:KG {id: 'handler:tutankhm_state.bankselect_w'}) SET n:Handler SET n += {method: 'bankselect_w', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 129, sourceColumn: 1, sourceEndLine: 132, sourceParameters: 'uint8_t data', sourceBody: 'm_mainbank->set_entry(data & 0x0f);'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range11'}) SET n:AddressRange SET n += {start: 34304, end: 34304, raw: 'map(0x8600, 0x8600).mirror(0x00ff).w(FUNC(tutankhm_state::sound_on_w))', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 187, sourceColumn: 2, sourceEndLine: 187, mirror: 255};
MERGE (n:KG {id: 'handler:tutankhm_state.sound_on_w'}) SET n:Handler SET n += {method: 'sound_on_w', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 153, sourceColumn: 1, sourceEndLine: 157, sourceParameters: 'uint8_t data', sourceBody: 'm_timeplt_audio->sh_irqtrigger_w(0);
	m_timeplt_audio->sh_irqtrigger_w(1);'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.sh_irqtrigger_w'}) SET n:Handler SET n += {method: 'sh_irqtrigger_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 133, sourceColumn: 1, sourceEndLine: 142, sourceParameters: 'int state', sourceBody: 'if (m_last_irq_state == 0 && state)
	{
		/* setting bit 0 low then high triggers IRQ on the sound CPU */
		m_soundcpu->set_input_line(0, HOLD_LINE); // Z80 IM1
	}

	m_last_irq_state = state;'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range12'}) SET n:AddressRange SET n += {start: 34560, end: 34560, raw: 'map(0x8700, 0x8700).mirror(0x00ff).w(m_timeplt_audio, FUNC(timeplt_audio_device::sound_data_w))', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 188, sourceColumn: 2, sourceEndLine: 188, mirror: 255};
MERGE (n:KG {id: 'handler:timeplt_audio_device.sound_data_w'}) SET n:Handler SET n += {method: 'sound_data_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'uint8_t data', sourceBody: 'm_soundlatch->write(data);'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range13'}) SET n:AddressRange SET n += {start: 34816, end: 36863, raw: 'map(0x8800, 0x8fff).ram()', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 190, sourceColumn: 2, sourceEndLine: 190, ram: true};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range14'}) SET n:AddressRange SET n += {start: 36864, end: 40959, raw: 'map(0x9000, 0x9fff).bankr(m_mainbank)', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 191, sourceColumn: 2, sourceEndLine: 191, bankRead: 'mainbank'};
MERGE (n:KG {id: 'map:tutankhm_state.main_map/range15'}) SET n:AddressRange SET n += {start: 40960, end: 65535, raw: 'map(0xa000, 0xffff).rom()', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 192, sourceColumn: 2, sourceEndLine: 192, rom: true};
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
MERGE (n:KG {id: 'machine:tutankhm_state.tutankhm'}) SET n:MachineConfig SET n += {cls: 'tutankhm_state', name: 'tutankhm', calls: [], stateMembers: ['{"name":"m_flipscreen_x","bits":8}', '{"name":"m_flipscreen_y","bits":8}', '{"name":"m_irq_toggle","bits":8}', '{"name":"m_irq_enable","bits":8}', '{"name":"m_star_mode","bits":8}', '{"name":"m_stars_enabled","bits":8}', '{"name":"m_stars_blink_state","bits":8}'], resetHandlers: ['tutankhm_state.machine_reset'], startHandlers: ['tutankhm_state.video_start'], sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 283, sourceColumn: 1, sourceEndLine: 314};
MERGE (n:KG {id: 'handler:tutankhm_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 278, sourceColumn: 1, sourceEndLine: 281, sourceParameters: '', sourceBody: 'm_irq_toggle = 0;'};
MERGE (n:KG {id: 'handler:tutankhm_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 264, sourceColumn: 1, sourceEndLine: 276, sourceParameters: '', sourceBody: '/* initialize globals */
	m_flipscreen_x = 0;
	m_flipscreen_y = 0;

	/* initialize stars */
	m_stars_enabled = 0;
	m_stars_blink_state = 0;
	stars_init();

	galaxian_palette(*m_palette);'};
MERGE (n:KG {id: 'handler:tutankhm_state.stars_init'}) SET n:Handler SET n += {method: 'stars_init', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 278, sourceColumn: 1, sourceEndLine: 281, sourceParameters: '', sourceBody: '(m_star_mode) ? stars_init_scramble() : stars_init_bootleg();'};
MERGE (n:KG {id: 'handler:tutankhm_state.stars_init_scramble'}) SET n:Handler SET n += {method: 'stars_init_scramble', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 311, sourceColumn: 1, sourceEndLine: 332, sourceConstants: ['STAR_RNG_PERIOD=131071'], sourceParameters: '', sourceBody: '/* precalculate the RNG */
	m_stars = std::make_unique<uint8_t[]>(STAR_RNG_PERIOD);
	uint32_t shiftreg = 0;
	for (int i = 0; i < STAR_RNG_PERIOD; i++)
	{
		uint8_t const shift = 12;
		/* stars are enabled if the upper 8 bits are 1 and the low bit is 0 */
		int const enabled = ((shiftreg & 0x1fe01) == 0x1fe00);

		/* color comes from the 6 bits below the top 8 bits */
		int const color = (~shiftreg & 0x1f8) >> 3;

		/* store the color value in the low 6 bits and the enable in the upper bit */
		m_stars[i] = color | (enabled << 7);

		/* the LFSR is fed based on the XOR of bit 12 and the inverse of bit 0 */
		//shiftreg = (shiftreg >> 1) | ((((shiftreg >> 12) ^ ~shiftreg) & 1) << 16);
		shiftreg = (shiftreg >> 1) | ((((shiftreg >> shift) ^ ~shiftreg) & 1) << 16);
	}'};
MERGE (n:KG {id: 'handler:tutankhm_state.stars_init_bootleg'}) SET n:Handler SET n += {method: 'stars_init_bootleg', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 283, sourceColumn: 1, sourceEndLine: 309, sourceConstants: ['STAR_RNG_PERIOD=131071'], sourceParameters: '', sourceBody: '/* reset the blink and enabled states */
	m_stars_enabled = false;
	m_stars_blink_state = 0;

	/* precalculate the RNG */
	m_stars = std::make_unique<uint8_t[]>(STAR_RNG_PERIOD);
	uint32_t shiftreg = 0;
	for (int i = 0; i < STAR_RNG_PERIOD; i++)
	{
		int const newbit = ((shiftreg >> 12) ^ ~shiftreg) & 1;

		/* stars are enabled if the upper 8 bits are 1 and the new bit is 0 */
		int const enabled = ((shiftreg & 0x1fe00) == 0x1fe00) && (newbit == 0);
		//int enabled = ((shiftreg & 0x1fe01) == 0x1fe00); // <- scramble

		/* color comes from the 6 bits below the top 8 bits */
		int const color = (~shiftreg & 0x1f8) >> 3;

		/* store the color value in the low 6 bits and the enable in the upper bit */
		m_stars[i] = color | (enabled << 7);

		/* the LFSR is fed based on the XOR of bit 12 and the inverse of bit 0 */
		shiftreg = (shiftreg >> 1) | (newbit << 16);
	}'};
MERGE (n:KG {id: 'handler:tutankhm_state.galaxian_palette'}) SET n:Handler SET n += {method: 'galaxian_palette', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 210, sourceColumn: 1, sourceEndLine: 261, sourceConstants: ['RGB_MAXIMUM=224'], sourceParameters: 'palette_device &palette', sourceBody: '/*
	    The maximum sprite/tilemap resistance is ~130 Ohms with all RGB
	    outputs enabled (1/(1/1000 + 1/470 + 1/220)). Since we normalized
	    to RGB_MAXIMUM, this maps RGB_MAXIMUM -> 130 Ohms.

	    The stars are at 150 Ohms for the LSB, and 100 Ohms for the MSB.
	    This means the 3 potential values are:

	        150 Ohms -> RGB_MAXIMUM * 130 / 150
	        100 Ohms -> RGB_MAXIMUM * 130 / 100
	         60 Ohms -> RGB_MAXIMUM * 130 / 60

	    Since we can\'t saturate that high, we instead approximate this
	    by compressing the values proportionally into the 194->255 range.
	*/
	int const minval = RGB_MAXIMUM * 130 / 150;
	int const midval = RGB_MAXIMUM * 130 / 100;
	int const maxval = RGB_MAXIMUM * 130 / 60;

	// compute the values for each of 4 possible star values
	uint8_t const starmap[4]{
			0,
			minval,
			minval + (255 - minval) * (midval - minval) / (maxval - minval),
			255 };

	// generate the colors for the stars
	for (int i = 0; i < 64; i++)
	{
		uint8_t bit0, bit1;

		// bit 5 = red @ 150 Ohm, bit 4 = red @ 100 Ohm
		bit0 = BIT(i, 5);
		bit1 = BIT(i, 4);
		int const r = starmap[(bit1 << 1) | bit0];

		// bit 3 = green @ 150 Ohm, bit 2 = green @ 100 Ohm
		bit0 = BIT(i, 3);
		bit1 = BIT(i, 2);
		int const g = starmap[(bit1 << 1) | bit0];

		// bit 1 = blue @ 150 Ohm, bit 0 = blue @ 100 Ohm
		bit0 = BIT(i, 1);
		bit1 = BIT(i, 0);
		int const b = starmap[(bit1 << 1) | bit0];

		// set the RGB color
		m_star_color[i] = rgb_t(r, g, b);
	}'};
MERGE (n:KG {id: 'bank:tutankhm_state.tutankhm/mainbank'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 0, entries: 16, region: 'maincpu', offset: 65536, stride: 4096, raw: 'm_mainbank->configure_entries(0, 16, memregion("maincpu")->base() + 0x10000, 0x1000)', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 261, sourceColumn: 1, sourceEndLine: 276};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/maincpu'}) SET n:Device SET n += {type: 'MC6809E', tag: 'maincpu', clock: 1536000, config: ['MC6809E(config, m_maincpu, XTAL(18\'432\'000)/12)', 'm_maincpu->set_addrmap(AS_PROGRAM, &tutankhm_state::main_map)'], sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 286, sourceColumn: 2, sourceEndLine: 286};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['ls259_device &mainlatch(LS259(config, "mainlatch"))', 'mainlatch.q_out_cb<0>().set(FUNC(tutankhm_state::irq_enable_w))', 'mainlatch.q_out_cb<1>().set_nop()', 'mainlatch.q_out_cb<2>().set(FUNC(tutankhm_state::coin_counter_2_w))', 'mainlatch.q_out_cb<3>().set(FUNC(tutankhm_state::coin_counter_1_w))', 'mainlatch.q_out_cb<4>().set(FUNC(tutankhm_state::stars_enable_w))', 'mainlatch.q_out_cb<5>().set(m_timeplt_audio, FUNC(timeplt_audio_device::mute_w))', 'mainlatch.q_out_cb<6>().set(FUNC(tutankhm_state::flip_screen_x_w))', 'mainlatch.q_out_cb<7>().set(FUNC(tutankhm_state::flip_screen_y_w))'], sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 289, sourceColumn: 2, sourceEndLine: 289};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<0>().set(FUNC(tutankhm_state::irq_enable_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 290, sourceColumn: 2, sourceEndLine: 290, slot: '0', targetClass: 'tutankhm_state', targetMethod: 'irq_enable_w'};
MERGE (n:KG {id: 'handler:tutankhm_state.irq_enable_w'}) SET n:Handler SET n += {method: 'irq_enable_w', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 115, sourceColumn: 1, sourceEndLine: 120, sourceParameters: 'int state', sourceBody: 'm_irq_enable = state;
	if (!m_irq_enable)
		m_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'mainlatch.q_out_cb<1>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 291, sourceColumn: 2, sourceEndLine: 291, slot: '1'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<2>().set(FUNC(tutankhm_state::coin_counter_2_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 292, sourceColumn: 2, sourceEndLine: 292, slot: '2', targetClass: 'tutankhm_state', targetMethod: 'coin_counter_2_w'};
MERGE (n:KG {id: 'handler:tutankhm_state.coin_counter_2_w'}) SET n:Handler SET n += {method: 'coin_counter_2_w', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 147, sourceColumn: 1, sourceEndLine: 150, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(1, state);'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<3>().set(FUNC(tutankhm_state::coin_counter_1_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 293, sourceColumn: 2, sourceEndLine: 293, slot: '3', targetClass: 'tutankhm_state', targetMethod: 'coin_counter_1_w'};
MERGE (n:KG {id: 'handler:tutankhm_state.coin_counter_1_w'}) SET n:Handler SET n += {method: 'coin_counter_1_w', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 141, sourceColumn: 1, sourceEndLine: 144, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, state);'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<4>().set(FUNC(tutankhm_state::stars_enable_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 294, sourceColumn: 2, sourceEndLine: 294, slot: '4', targetClass: 'tutankhm_state', targetMethod: 'stars_enable_w'};
MERGE (n:KG {id: 'handler:tutankhm_state.stars_enable_w'}) SET n:Handler SET n += {method: 'stars_enable_w', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 435, sourceColumn: 1, sourceEndLine: 444, sourceParameters: 'uint8_t data', sourceBody: 'if (BIT(m_stars_enabled ^ data, 0))
	{
//      m_screen->update_now();
		m_screen->update_partial(m_screen->vpos());
	}

	m_stars_enabled = BIT(data, 0);'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<5>().set(m_timeplt_audio, FUNC(timeplt_audio_device::mute_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 295, sourceColumn: 2, sourceEndLine: 295, slot: '5', targetClass: 'timeplt_audio_device', targetMethod: 'mute_w', targetTag: 'timeplt_audio'};
MERGE (n:KG {id: 'handler:timeplt_audio_device.mute_w'}) SET n:Handler SET n += {method: 'mute_w', ownerClass: 'timeplt_audio_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 149, sourceParameters: 'int state', sourceBody: '// controls pin 6 (DC audio mute) of LA4460 amplifier
	machine().sound().system_mute(state);'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:6'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<6>().set(FUNC(tutankhm_state::flip_screen_x_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 296, sourceColumn: 2, sourceEndLine: 296, slot: '6', targetClass: 'tutankhm_state', targetMethod: 'flip_screen_x_w'};
MERGE (n:KG {id: 'handler:tutankhm_state.flip_screen_x_w'}) SET n:Handler SET n += {method: 'flip_screen_x_w', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 24, sourceColumn: 1, sourceEndLine: 27, sourceParameters: 'int state', sourceBody: 'm_flipscreen_x = state;'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:7'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<7>().set(FUNC(tutankhm_state::flip_screen_y_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 297, sourceColumn: 2, sourceEndLine: 297, slot: '7', targetClass: 'tutankhm_state', targetMethod: 'flip_screen_y_w'};
MERGE (n:KG {id: 'handler:tutankhm_state.flip_screen_y_w'}) SET n:Handler SET n += {method: 'flip_screen_y_w', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 30, sourceColumn: 1, sourceEndLine: 33, sourceParameters: 'int state', sourceBody: 'm_flipscreen_y = state;'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 299, sourceColumn: 2, sourceEndLine: 299};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(GALAXIAN_PIXEL_CLOCK, GALAXIAN_HTOTAL, GALAXIAN_HBEND, GALAXIAN_HBSTART, GALAXIAN_VTOTAL, GALAXIAN_VBEND, GALAXIAN_VBSTART)', 'm_screen->set_screen_update(FUNC(tutankhm_state::screen_update))', 'm_screen->screen_vblank().set(FUNC(tutankhm_state::vblank_irq))'], sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 302, sourceColumn: 2, sourceEndLine: 302, configCalls: ['set_raw(18432000,1152,0,768,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [18432000, 1152, 0, 768, 264, 16, 240], screenRawExpr: ['GALAXIAN_PIXEL_CLOCK', 'GALAXIAN_HTOTAL', 'GALAXIAN_HBEND', 'GALAXIAN_HBSTART', 'GALAXIAN_VTOTAL', 'GALAXIAN_VBEND', 'GALAXIAN_VBSTART']};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(tutankhm_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 306, sourceColumn: 2, sourceEndLine: 306, targetClass: 'tutankhm_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:tutankhm_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 126, sourceColumn: 1, sourceEndLine: 139, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'u8 const mode = m_stars_config.read_safe(m_star_mode);
	if (mode != m_star_mode)
	{
		m_star_mode = mode;
		stars_init();
	}

	if (m_star_mode)
		return screen_update_scramble(screen, bitmap, cliprect);
	else
		return screen_update_bootleg(screen, bitmap, cliprect);', inputMembers: ['m_stars_config=STARS']};
MERGE (n:KG {id: 'handler:tutankhm_state.screen_update_bootleg'}) SET n:Handler SET n += {method: 'screen_update_bootleg', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 42, sourceColumn: 1, sourceEndLine: 95, sourceConstants: ['GALAXIAN_XSCALE=3', 'STAR_RNG_PERIOD=131071'], sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'bitmap.fill(rgb_t::black(), cliprect);

	int const xorx = m_flipscreen_x ? 255 : 0;
	int const xory = m_flipscreen_y ? 255 : 0;

	for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
	{
		uint32_t *const dst = &bitmap.pix(y);

		for (int x = cliprect.min_x / GALAXIAN_XSCALE; x <= cliprect.max_x / GALAXIAN_XSCALE; x++)
		{
			uint8_t const effx = x ^ xorx;
			uint8_t const yscroll = (effx < 192 && m_scroll.found()) ? *m_scroll : 0;
			uint8_t const effy = (y ^ xory) + yscroll;
			uint8_t const vrambyte = m_videoram[effy * 128 + effx / 2];
			uint8_t const shifted = vrambyte >> (4 * (effx & 1));

			uint8_t const blink_state = m_stars_blink_state & 3;
			bool enab = false;
			switch (blink_state)
			{
				case 0: enab = true; break;
				case 1: enab = BIT(y, 0); break;
				case 2: enab = BIT(y, 1); break;
				case 3: enab = BIT(~x, 3); break;
			}
			//enab &= (((y>>1) ^ (x >> 3)) & 1);

			int const offset = y * 384 + x + 84;

			uint8_t const star = m_stars[offset % STAR_RNG_PERIOD];
			if (m_stars_enabled && enab && BIT(~shifted, 1) && BIT(star, 7)
				&& x > 63)
			{
				bitmap.pix(y, GALAXIAN_XSCALE*x + 0) = m_star_color[star & 0x3f];
				bitmap.pix(y, GALAXIAN_XSCALE*x + 1) = m_star_color[star & 0x3f];
				bitmap.pix(y, GALAXIAN_XSCALE*x + 2) = m_star_color[star & 0x3f];
			}

			else
			{
				auto color = m_palette->pen_color(shifted & 0x0f);
				u32 *const dbase = dst + x * GALAXIAN_XSCALE;
				if(shifted || dbase[0] == 0xff000000) dbase[0] = color;
				if(shifted || dbase[1] == 0xff000000) dbase[1] = color;
				if(shifted || dbase[2] == 0xff000000) dbase[2] = color;
			}
		}
	}

	return 0;'};
MERGE (n:KG {id: 'handler:tutankhm_state.screen_update_scramble'}) SET n:Handler SET n += {method: 'screen_update_scramble', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 97, sourceColumn: 1, sourceEndLine: 124, sourceConstants: ['GALAXIAN_XSCALE=3'], sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'scramble_draw_background(bitmap, cliprect);

	int const xorx = m_flipscreen_x ? 255 : 0;
	int const xory = m_flipscreen_y ? 255 : 0;

	for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
	{
		uint32_t *const dst = &bitmap.pix(y);

		for (int x = cliprect.min_x / GALAXIAN_XSCALE; x <= cliprect.max_x / GALAXIAN_XSCALE; x++)
		{
			uint8_t const effx = x ^ xorx;
			uint8_t const yscroll = (effx < 192 && m_scroll.found()) ? *m_scroll : 0;
			uint8_t const effy = (y ^ xory) + yscroll;
			uint8_t const vrambyte = m_videoram[effy * 128 + effx / 2];
			uint8_t const shifted = vrambyte >> (4 * (effx & 1));
			auto color = m_palette->pen_color(shifted & 0x0f);
			u32 *const dbase = dst + x * GALAXIAN_XSCALE;
			if(shifted || dbase[0] == 0xff000000) dbase[0] = color;
			if(shifted || dbase[1] == 0xff000000) dbase[1] = color;
			if(shifted || dbase[2] == 0xff000000) dbase[2] = color;
		}
	}

	return 0;'};
MERGE (n:KG {id: 'handler:tutankhm_state.scramble_draw_background'}) SET n:Handler SET n += {method: 'scramble_draw_background', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 427, sourceColumn: 1, sourceEndLine: 433, sourceParameters: 'bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: '/* blue background - 390 ohm resistor */
	bitmap.fill(rgb_t::black(), cliprect);

	scramble_draw_stars(bitmap, cliprect, 256);'};
MERGE (n:KG {id: 'handler:tutankhm_state.scramble_draw_stars'}) SET n:Handler SET n += {method: 'scramble_draw_stars', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 410, sourceColumn: 1, sourceEndLine: 424, sourceParameters: 'bitmap_rgb32 &bitmap, const rectangle &cliprect, int maxx', sourceBody: '/* update the star origin to the current frame */
	//stars_update_origin();

	/* render stars if enabled */
	if (m_stars_enabled)
	{
		/* iterate over scanlines */
		for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
		{
			stars_draw_row(bitmap, maxx, y, y * 512);
		}
	}'};
MERGE (n:KG {id: 'handler:tutankhm_state.stars_draw_row'}) SET n:Handler SET n += {method: 'stars_draw_row', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 347, sourceColumn: 1, sourceEndLine: 408, sourceConstants: ['GALAXIAN_XSCALE=3', 'STAR_RNG_PERIOD=131071'], sourceParameters: 'bitmap_rgb32 &bitmap, int maxx, int y, uint32_t star_offs', sourceBody: 'uint8_t const flipxor = (m_flipscreen_x ? 0xc0 : 0x00);

	/* ensure our star offset is valid */
	star_offs %= STAR_RNG_PERIOD;

	/* iterate over the specified number of 6MHz pixels */
	for (int x = 0; x < maxx; x++)
	{
		uint8_t const h8q = BIT(~x, 3); // H8 signal is inverted.
		/* stars are suppressed unless V1 ^ H8 == 1 */
		bool enable_star = BIT(y ^ h8q, 0);

		uint8_t const blink_state = m_stars_blink_state & 3;
		bool enab = false;
		switch (blink_state)
		{
			case 0: enab = true;      break;
			case 1: enab = BIT(y, 0); break;
			case 2: enab = BIT(y, 1); break;
			case 3: enab = h8q;       break; // H8 signal is inverted.
		}

		enable_star &= (enab && ((x & 0xc0) ^ flipxor) != 0xc0);

		/*
		    The RNG clock is the master clock (18MHz) ANDed with the pixel clock (6MHz).
		    The divide-by-3 circuit that produces the pixel clock generates a square wave
		    with a 2/3 duty cycle, so the result of the AND generates a clock like this:
		                _   _   _   _   _   _   _   _
		      MASTER: _| |_| |_| |_| |_| |_| |_| |_| |
		                _______     _______     ______
		      PIXEL:  _|       |___|       |___|
		                _   _       _   _       _   _
		      RNG:    _| |_| |_____| |_| |_____| |_| |

		    Thus for each pixel, there are 3 master clocks and 2 RNG clocks, and the RNG
		    is clocked asymmetrically. To simulate this, we expand the horizontal screen
		    size by 3 and handle the first RNG clock with one pixel and the second RNG
		    clock with two pixels.
		*/

		uint8_t star;
		/* first RNG clock: one pixel */
		star = m_stars[star_offs++];
		if (star_offs >= STAR_RNG_PERIOD)
			star_offs = 0;
		if (enable_star && BIT(star, 7))
			bitmap.pix(y, GALAXIAN_XSCALE*x + 0) = m_star_color[star & 0x3f];

		/* second RNG clock: two pixels */
		star = m_stars[star_offs++];
		if (star_offs >= STAR_RNG_PERIOD)
			star_offs = 0;
		if (enable_star && BIT(star, 7))
		{
			bitmap.pix(y, GALAXIAN_XSCALE*x + 1) = m_star_color[star & 0x3f];
			bitmap.pix(y, GALAXIAN_XSCALE*x + 2) = m_star_color[star & 0x3f];
		}
	}'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(tutankhm_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 307, sourceColumn: 2, sourceEndLine: 307, targetClass: 'tutankhm_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:tutankhm_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 103, sourceColumn: 1, sourceEndLine: 112, sourceParameters: 'int state', sourceBody: '// flip flops cause the interrupt to be signalled every other frame
	if (state)
	{
		m_irq_toggle ^= 1;
		if (m_irq_toggle && m_irq_enable)
			m_maincpu->set_input_line(0, ASSERT_LINE);
	}'};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(1, tutankhm_state::raw_to_rgb_func, 16)'], sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 304, sourceColumn: 2, sourceEndLine: 304};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/timeplt_audio'}) SET n:Device SET n += {type: 'TIMEPLT_AUDIO', tag: 'timeplt_audio', clock: 14318181, config: ['TIMEPLT_AUDIO(config, m_timeplt_audio)'], cls: 'timeplt_audio_device', clsHierarchy: ['timeplt_audio_device'], sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 310, sourceColumn: 2, sourceEndLine: 310};
MERGE (n:KG {id: 'device:tutankhm_state.tutankhm/stars'}) SET n:Device SET n += {type: 'TIMER', tag: 'stars', clock: null, config: ['TIMER(config, "stars").configure_periodic(FUNC(tutankhm_state::scramble_stars_blink_timer), PERIOD_OF_555_ASTABLE(100000, 10000, 0.00001))'], sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 313, sourceColumn: 2, sourceEndLine: 313};
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
MERGE (n:KG {id: 'inputs:tutankhm'}) SET n:InputPorts SET n += {name: 'tutankhm', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 202, sourceColumn: 8, sourceEndLine: 202};
MERGE (n:KG {id: 'inputs:tutankhm/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:tutankhm/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:1,2")'], name: 'Lives', defaultValue: 3, location: 'SW2:1,2', settings: ['3=3', '1=4', '2=5', '0=255 (Cheat)']};
MERGE (n:KG {id: 'inputs:tutankhm/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:3', settings: ['0=Upright', '4=Cocktail']};
MERGE (n:KG {id: 'inputs:tutankhm/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW2:4")'], name: 'Bonus Life', defaultValue: 8, location: 'SW2:4', settings: ['8=30000', '0=40000']};
MERGE (n:KG {id: 'inputs:tutankhm/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW2:5,6")'], name: 'Difficulty', defaultValue: 32, location: 'SW2:5,6', settings: ['48=Easy', '32=Normal', '16=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:tutankhm/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW2:7")'], name: 'Flash Bomb', defaultValue: 64, location: 'SW2:7', settings: ['64=1 per Life', '0=1 per Game']};
MERGE (n:KG {id: 'inputs:tutankhm/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:tutankhm/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:tutankhm/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:tutankhm/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:tutankhm/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:tutankhm/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:tutankhm/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:tutankhm/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:tutankhm/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:tutankhm/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:tutankhm/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:tutankhm/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:tutankhm/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:tutankhm/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:tutankhm/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:tutankhm/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:tutankhm/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:tutankhm/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', defaultValue: 64};
MERGE (n:KG {id: 'inputs:tutankhm/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:tutankhm/IN1#1'}) SET n:Port SET n += {tag: 'IN1', modify: true};
MERGE (n:KG {id: 'inputs:tutankhm/IN1#1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICKRIGHT_LEFT', modifiers: ['PORT_2WAY'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:tutankhm/IN1#1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICKRIGHT_RIGHT', modifiers: ['PORT_2WAY'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:tutankhm/IN1#1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("P1 Flash Bomb")'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:tutankhm/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:tutankhm/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:tutankhm/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:tutankhm/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:tutankhm/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:tutankhm/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:tutankhm/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:tutankhm/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_COCKTAIL'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:tutankhm/IN2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:tutankhm/IN2#1'}) SET n:Port SET n += {tag: 'IN2', modify: true};
MERGE (n:KG {id: 'inputs:tutankhm/IN2#1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICKRIGHT_LEFT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:tutankhm/IN2#1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICKRIGHT_RIGHT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:tutankhm/IN2#1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL', 'PORT_NAME("P2 Flash Bomb")'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:tutankhm/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:tutankhm/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION(#SW1":1,2,3,4")'], name: 'Coin A', defaultValue: 15, location: '#SW1":1,2,3,4"', settings: ['2=4C 1C', '5=3C 1C', '8=2C 1C', '4=3C 2C', '1=4C 3C', '15=1C 1C', '3=3C 4C', '7=2C 3C', '14=1C 2C', '6=2C 5C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C', '9=1C 7C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:tutankhm/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION(#SW1":5,6,7,8")'], name: 'Coin B', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['32=4C 1C', '80=3C 1C', '128=2C 1C', '64=3C 2C', '16=4C 3C', '240=1C 1C', '48=3C 4C', '112=2C 3C', '224=1C 2C', '96=2C 5C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '160=1C 6C', '144=1C 7C', '0=No Coin B']};
MERGE (n:KG {id: 'inputs:tutankhm/STARS'}) SET n:Port SET n += {tag: 'STARS', modify: false};
MERGE (n:KG {id: 'inputs:tutankhm/STARS/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Starfield selection', defaultValue: 1, settings: ['0=Konami HW bootleg (6MHz stars)', '1=Scramble implementation']};
MATCH (a:KG {id: 'game:tutankhm'}), (b:KG {id: 'file:src/mame/konami/tutankhm.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 446, sourceColumn: 1, sourceEndLine: 446};
MATCH (a:KG {id: 'game:tutankhm'}), (b:KG {id: 'machine:tutankhm_state.tutankhm'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:tutankhm'}), (b:KG {id: 'inputs:tutankhm'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:tutankhm'}), (b:KG {id: 'romset:tutankhm'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tutankhm.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tutankhm.cpp'}), (b:KG {id: 'file:tutankhm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tutankhm.cpp'}), (b:KG {id: 'file:konamipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tutankhm.cpp'}), (b:KG {id: 'file:cpu/m6809/m6809.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tutankhm.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tutankhm.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tutankhm.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tutankhm.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'file:src/mame/konami/tutankhm.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 283, sourceColumn: 1, sourceEndLine: 314};
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'handler:tutankhm_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'handler:tutankhm_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'bank:tutankhm_state.tutankhm/mainbank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'device:tutankhm_state.tutankhm/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'device:tutankhm_state.tutankhm/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'device:tutankhm_state.tutankhm/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'device:tutankhm_state.tutankhm/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'device:tutankhm_state.tutankhm/timeplt_audio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tutankhm_state.tutankhm'}), (b:KG {id: 'device:tutankhm_state.tutankhm/stars'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:tutankhm'}), (b:KG {id: 'file:src/mame/konami/tutankhm.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 202, sourceColumn: 8, sourceEndLine: 202};
MATCH (a:KG {id: 'inputs:tutankhm'}), (b:KG {id: 'inputs:tutankhm/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tutankhm'}), (b:KG {id: 'inputs:tutankhm/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tutankhm'}), (b:KG {id: 'inputs:tutankhm/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tutankhm'}), (b:KG {id: 'inputs:tutankhm/IN1#1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tutankhm'}), (b:KG {id: 'inputs:tutankhm/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tutankhm'}), (b:KG {id: 'inputs:tutankhm/IN2#1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tutankhm'}), (b:KG {id: 'inputs:tutankhm/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tutankhm'}), (b:KG {id: 'inputs:tutankhm/STARS'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:tutankhm'}), (b:KG {id: 'file:src/mame/konami/tutankhm.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 330, sourceColumn: 1, sourceEndLine: 330};
MATCH (a:KG {id: 'romset:tutankhm'}), (b:KG {id: 'region:tutankhm/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:tutankhm'}), (b:KG {id: 'region:tutankhm/timeplt_audio:tpsound'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.video_start'}), (b:KG {id: 'handler:tutankhm_state.stars_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.video_start'}), (b:KG {id: 'handler:tutankhm_state.galaxian_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:tutankhm_state.tutankhm/mainbank'}), (b:KG {id: 'file:src/mame/konami/tutankhm.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 261, sourceColumn: 1, sourceEndLine: 276};
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/maincpu'}), (b:KG {id: 'map:tutankhm_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}), (b:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}), (b:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}), (b:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}), (b:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}), (b:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}), (b:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}), (b:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch'}), (b:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/screen'}), (b:KG {id: 'device:tutankhm_state.tutankhm/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/screen'}), (b:KG {id: 'device:tutankhm_state.tutankhm/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/timeplt_audio'}), (b:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/DSW2'}), (b:KG {id: 'inputs:tutankhm/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/DSW2'}), (b:KG {id: 'inputs:tutankhm/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/DSW2'}), (b:KG {id: 'inputs:tutankhm/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/DSW2'}), (b:KG {id: 'inputs:tutankhm/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/DSW2'}), (b:KG {id: 'inputs:tutankhm/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/DSW2'}), (b:KG {id: 'inputs:tutankhm/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN0'}), (b:KG {id: 'inputs:tutankhm/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN0'}), (b:KG {id: 'inputs:tutankhm/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN0'}), (b:KG {id: 'inputs:tutankhm/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN0'}), (b:KG {id: 'inputs:tutankhm/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN0'}), (b:KG {id: 'inputs:tutankhm/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN0'}), (b:KG {id: 'inputs:tutankhm/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN0'}), (b:KG {id: 'inputs:tutankhm/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN0'}), (b:KG {id: 'inputs:tutankhm/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1'}), (b:KG {id: 'inputs:tutankhm/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1'}), (b:KG {id: 'inputs:tutankhm/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1'}), (b:KG {id: 'inputs:tutankhm/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1'}), (b:KG {id: 'inputs:tutankhm/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1'}), (b:KG {id: 'inputs:tutankhm/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1'}), (b:KG {id: 'inputs:tutankhm/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1'}), (b:KG {id: 'inputs:tutankhm/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1'}), (b:KG {id: 'inputs:tutankhm/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1#1'}), (b:KG {id: 'inputs:tutankhm/IN1#1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1#1'}), (b:KG {id: 'inputs:tutankhm/IN1#1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN1#1'}), (b:KG {id: 'inputs:tutankhm/IN1#1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2'}), (b:KG {id: 'inputs:tutankhm/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2'}), (b:KG {id: 'inputs:tutankhm/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2'}), (b:KG {id: 'inputs:tutankhm/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2'}), (b:KG {id: 'inputs:tutankhm/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2'}), (b:KG {id: 'inputs:tutankhm/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2'}), (b:KG {id: 'inputs:tutankhm/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2'}), (b:KG {id: 'inputs:tutankhm/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2'}), (b:KG {id: 'inputs:tutankhm/IN2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2#1'}), (b:KG {id: 'inputs:tutankhm/IN2#1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2#1'}), (b:KG {id: 'inputs:tutankhm/IN2#1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/IN2#1'}), (b:KG {id: 'inputs:tutankhm/IN2#1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/DSW1'}), (b:KG {id: 'inputs:tutankhm/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/DSW1'}), (b:KG {id: 'inputs:tutankhm/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tutankhm/STARS'}), (b:KG {id: 'inputs:tutankhm/STARS/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/m1.1h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/m2.2h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/3j.3h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/m4.4h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/m5.5h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/j6.6h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/c1.1i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/c2.2i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/c3.3i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/c4.4i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/c5.5i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/c6.6i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/c7.7i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/c8.8i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/maincpu'}), (b:KG {id: 'rom:tutankhm/maincpu/c9.9i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/timeplt_audio:tpsound'}), (b:KG {id: 'rom:tutankhm/timeplt_audio:tpsound/s1.7a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tutankhm/timeplt_audio:tpsound'}), (b:KG {id: 'rom:tutankhm/timeplt_audio:tpsound/s2.8a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.stars_init'}), (b:KG {id: 'handler:tutankhm_state.stars_init_scramble'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.stars_init'}), (b:KG {id: 'handler:tutankhm_state.stars_init_bootleg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'file:src/mame/konami/tutankhm.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 166, sourceColumn: 1, sourceEndLine: 193};
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map'}), (b:KG {id: 'map:tutankhm_state.main_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:tutankhm_state.irq_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:2'}), (b:KG {id: 'handler:tutankhm_state.coin_counter_2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:3'}), (b:KG {id: 'handler:tutankhm_state.coin_counter_1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:4'}), (b:KG {id: 'handler:tutankhm_state.stars_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:5'}), (b:KG {id: 'handler:timeplt_audio_device.mute_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:6'}), (b:KG {id: 'handler:tutankhm_state.flip_screen_x_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/mainlatch/callback:mainlatch:7'}), (b:KG {id: 'handler:tutankhm_state.flip_screen_y_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/screen/callback:screen:0'}), (b:KG {id: 'handler:tutankhm_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tutankhm_state.tutankhm/screen/callback:screen:1'}), (b:KG {id: 'handler:tutankhm_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/timeplt_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 189, sourceColumn: 1, sourceEndLine: 217};
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/tpsound'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:timeplt_audio_device.device_add_mconfig'}), (b:KG {id: 'device:timeplt_audio_device.device_add_mconfig/ay2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map/range1'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:tutankhm_state.main_map/range3'}), (b:KG {id: 'handler:watchdog_timer_device.reset_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:tutankhm_state.main_map/range9'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:tutankhm_state.main_map/range10'}), (b:KG {id: 'handler:tutankhm_state.bankselect_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map/range11'}), (b:KG {id: 'handler:tutankhm_state.sound_on_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tutankhm_state.main_map/range12'}), (b:KG {id: 'handler:timeplt_audio_device.sound_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'timeplt_audio'};
MATCH (a:KG {id: 'handler:tutankhm_state.screen_update'}), (b:KG {id: 'handler:tutankhm_state.screen_update_bootleg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.screen_update'}), (b:KG {id: 'handler:tutankhm_state.stars_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.screen_update'}), (b:KG {id: 'handler:tutankhm_state.screen_update_scramble'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
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
MATCH (a:KG {id: 'handler:tutankhm_state.sound_on_w'}), (b:KG {id: 'handler:timeplt_audio_device.sh_irqtrigger_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.screen_update_scramble'}), (b:KG {id: 'handler:tutankhm_state.scramble_draw_background'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
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
MATCH (a:KG {id: 'handler:tutankhm_state.scramble_draw_background'}), (b:KG {id: 'handler:tutankhm_state.scramble_draw_stars'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range2'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range3'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range4'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range5'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:timeplt_audio_device.timeplt_sound_map/range6'}), (b:KG {id: 'handler:timeplt_audio_device.filter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.scramble_draw_stars'}), (b:KG {id: 'handler:tutankhm_state.stars_draw_row'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:timeplt_audio_device.filter_w'}), (b:KG {id: 'handler:timeplt_audio_device.set_filter'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
