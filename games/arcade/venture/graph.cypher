// mamekit knowledge graph — driver src/mame/exidy/exidy.cpp
// generated 2026-08-22T05:52:49.700Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/exidy/exidy.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/exidy/exidy.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:exidysound.h'}) SET n:SourceFile SET n += {path: 'exidysound.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:machine/6821pia.h'}) SET n:SourceFile SET n += {path: 'machine/6821pia.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:sound/samples.h'}) SET n:SourceFile SET n += {path: 'sound/samples.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:src/mame/shared/exidysound.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/shared/exidysound.cpp'};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/input_merger.h'}) SET n:SourceFile SET n += {path: 'machine/input_merger.h', external: true};
MERGE (n:KG {id: 'file:machine/rescap.h'}) SET n:SourceFile SET n += {path: 'machine/rescap.h', external: true};
MERGE (n:KG {id: 'file:logmacro.h'}) SET n:SourceFile SET n += {path: 'logmacro.h', external: true};
MERGE (n:KG {id: 'game:venture'}) SET n:Game SET n += {name: 'venture', year: '1981', company: 'Exidy', fullname: 'Venture (version 5 set 1)', monitor: 'ROT0', cls: 'exidy_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2602, sourceColumn: 1, sourceEndLine: 2602};
MERGE (n:KG {id: 'romset:venture'}) SET n:RomSet SET n += {name: 'venture', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2226, sourceColumn: 1, sourceEndLine: 2226};
MERGE (n:KG {id: 'region:venture/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1819, sourceColumn: 2, sourceEndLine: 1819};
MERGE (n:KG {id: 'rom:venture/maincpu/13a-cpu'}) SET n:Rom SET n += {file: '13a-cpu', offset: 32768, size: 4096, crc: 'f4e4d991', sha1: '6683c1552b56b20f2296e461aff697af73563792', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2228, sourceColumn: 2, sourceEndLine: 2228};
MERGE (n:KG {id: 'rom:venture/maincpu/12a-cpu'}) SET n:Rom SET n += {file: '12a-cpu', offset: 36864, size: 4096, crc: 'c6d8cb04', sha1: '3b9ae8fdc35117c73c91daed66e93e5344bdcd7e', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2229, sourceColumn: 2, sourceEndLine: 2229};
MERGE (n:KG {id: 'rom:venture/maincpu/11a-cpu'}) SET n:Rom SET n += {file: '11a-cpu', offset: 40960, size: 4096, crc: '3bdb01f4', sha1: '3c1f43a3c37a21524b64d69e4dae58af8c2e0d90', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2230, sourceColumn: 2, sourceEndLine: 2230};
MERGE (n:KG {id: 'rom:venture/maincpu/10a-cpu'}) SET n:Rom SET n += {file: '10a-cpu', offset: 45056, size: 4096, crc: '0da769e9', sha1: '3604dc08c63461b2ea957a396887fb32e4a1a970', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2231, sourceColumn: 2, sourceEndLine: 2231};
MERGE (n:KG {id: 'rom:venture/maincpu/9a-cpu'}) SET n:Rom SET n += {file: '9a-cpu', offset: 49152, size: 4096, crc: '0ae05855', sha1: '29b3c2ca9740aa753e90131e6edcc61f414277e1', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2232, sourceColumn: 2, sourceEndLine: 2232};
MERGE (n:KG {id: 'rom:venture/maincpu/8a-cpu'}) SET n:Rom SET n += {file: '8a-cpu', offset: 53248, size: 4096, crc: '4ae59676', sha1: '36fc9dce9dd0c764a861634859ca0d7f98e20382', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2233, sourceColumn: 2, sourceEndLine: 2233};
MERGE (n:KG {id: 'rom:venture/maincpu/7a-cpu'}) SET n:Rom SET n += {file: '7a-cpu', offset: 57344, size: 4096, crc: '48d66220', sha1: '97b1605170c67b3a945b4d5f088df79328e163ce', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2234, sourceColumn: 2, sourceEndLine: 2234};
MERGE (n:KG {id: 'rom:venture/maincpu/6a-cpu'}) SET n:Rom SET n += {file: '6a-cpu', offset: 61440, size: 4096, crc: '7b78cf49', sha1: '1d484172465d3db6c4fc3733aa2b409e3a2e228f', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2235, sourceColumn: 2, sourceEndLine: 2235};
MERGE (n:KG {id: 'region:venture/soundbd:audiocpu'}) SET n:RomRegion SET n += {tag: 'soundbd:audiocpu', size: 32768, flags: '0', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2029, sourceColumn: 2, sourceEndLine: 2029};
MERGE (n:KG {id: 'rom:venture/soundbd:audiocpu/vea_3a-3.3a'}) SET n:Rom SET n += {file: 'vea_3a-3.3a', offset: 22528, size: 2048, crc: '4ea1c3d9', sha1: 'd0c99c9d5b887d717c68e8745906ae4e65aec6ad', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2238, sourceColumn: 2, sourceEndLine: 2238};
MERGE (n:KG {id: 'rom:venture/soundbd:audiocpu/vea_4a-3.4a'}) SET n:Rom SET n += {file: 'vea_4a-3.4a', offset: 24576, size: 2048, crc: '5154c39e', sha1: 'e6f011630eb1aa4116a0e5824ad6b65c1be2455f', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2239, sourceColumn: 2, sourceEndLine: 2239};
MERGE (n:KG {id: 'rom:venture/soundbd:audiocpu/vea_5a-3.5a'}) SET n:Rom SET n += {file: 'vea_5a-3.5a', offset: 26624, size: 2048, crc: '1e1e3916', sha1: '867e586583e07cd01e0e852f6ea52a040995725d', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2240, sourceColumn: 2, sourceEndLine: 2240};
MERGE (n:KG {id: 'rom:venture/soundbd:audiocpu/vea_6a-3.6a'}) SET n:Rom SET n += {file: 'vea_6a-3.6a', offset: 28672, size: 2048, crc: '80f3357a', sha1: 'f1ee638251e8676a526e6367c11866b1d52f5910', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2241, sourceColumn: 2, sourceEndLine: 2241};
MERGE (n:KG {id: 'rom:venture/soundbd:audiocpu/vea_7a-3.7a'}) SET n:Rom SET n += {file: 'vea_7a-3.7a', offset: 30720, size: 2048, crc: '466addc7', sha1: '0230b5365d6aeee3ca47666a9eadee4141de125b', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2242, sourceColumn: 2, sourceEndLine: 2242};
MERGE (n:KG {id: 'region:venture/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 2048, flags: '0', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1825, sourceColumn: 2, sourceEndLine: 1825};
MERGE (n:KG {id: 'rom:venture/gfx1/vel_11d-2.11d'}) SET n:Rom SET n += {file: 'vel_11d-2.11d', offset: 0, size: 2048, crc: 'ea6fd981', sha1: '46b1658e1607423d5a073f14097c2a48d59057c0', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2246, sourceColumn: 2, sourceEndLine: 2246};
MERGE (n:KG {id: 'region:venture/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 320, flags: '0', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1841, sourceColumn: 2, sourceEndLine: 1841};
MERGE (n:KG {id: 'rom:venture/proms/hrl14h-1.h14'}) SET n:Rom SET n += {file: 'hrl14h-1.h14', offset: 0, size: 32, crc: 'f76b4fcf', sha1: '197e0cc508ffeb5cefa4046bdfb158939d598225', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2249, sourceColumn: 2, sourceEndLine: 2249};
MERGE (n:KG {id: 'rom:venture/proms/vel5c-1.c5'}) SET n:Rom SET n += {file: 'vel5c-1.c5', offset: 32, size: 256, crc: '43b35bb7', sha1: '0a0cecea8faff9f3ff4c2ceda0b5b25e8e1cd667', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2250, sourceColumn: 2, sourceEndLine: 2250};
MERGE (n:KG {id: 'rom:venture/proms/hrl6d-1.d6'}) SET n:Rom SET n += {file: 'hrl6d-1.d6', offset: 288, size: 32, crc: 'e26f9053', sha1: 'eec35b6aa2c2d305418306bf4a1754a0583f109f', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2251, sourceColumn: 2, sourceEndLine: 2251};
MERGE (n:KG {id: 'map:exidy_state.exidy_map'}) SET n:AddressMap SET n += {cls: 'exidy_state', name: 'exidy_map', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 490, sourceColumn: 1, sourceEndLine: 505};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 1023, raw: 'map(0x0000, 0x03ff).ram()', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 492, sourceColumn: 2, sourceEndLine: 492, ram: true};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 17407, raw: 'map(0x4000, 0x43ff).mirror(0x0400).ram().share("videoram")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 493, sourceColumn: 2, sourceEndLine: 493, mirror: 1024, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range2'}) SET n:AddressRange SET n += {start: 20480, end: 20480, raw: 'map(0x5000, 0x5000).mirror(0x003f).writeonly().share("sprite1_xpos")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 494, sourceColumn: 2, sourceEndLine: 494, mirror: 63, writeonly: true, share: 'sprite1_xpos'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range3'}) SET n:AddressRange SET n += {start: 20544, end: 20544, raw: 'map(0x5040, 0x5040).mirror(0x003f).writeonly().share("sprite1_ypos")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 495, sourceColumn: 2, sourceEndLine: 495, mirror: 63, writeonly: true, share: 'sprite1_ypos'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range4'}) SET n:AddressRange SET n += {start: 20608, end: 20608, raw: 'map(0x5080, 0x5080).mirror(0x003f).writeonly().share("sprite2_xpos")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 496, sourceColumn: 2, sourceEndLine: 496, mirror: 63, writeonly: true, share: 'sprite2_xpos'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range5'}) SET n:AddressRange SET n += {start: 20672, end: 20672, raw: 'map(0x50c0, 0x50c0).mirror(0x003f).writeonly().share("sprite2_ypos")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 497, sourceColumn: 2, sourceEndLine: 497, mirror: 63, writeonly: true, share: 'sprite2_ypos'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range6'}) SET n:AddressRange SET n += {start: 20736, end: 20736, raw: 'map(0x5100, 0x5100).mirror(0x00fc).portr("DSW")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 498, sourceColumn: 2, sourceEndLine: 498, mirror: 252, portRead: 'DSW'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range7'}) SET n:AddressRange SET n += {start: 20736, end: 20736, raw: 'map(0x5100, 0x5100).mirror(0x00fc).writeonly().share("spriteno")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 499, sourceColumn: 2, sourceEndLine: 499, mirror: 252, writeonly: true, share: 'spriteno'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range8'}) SET n:AddressRange SET n += {start: 20737, end: 20737, raw: 'map(0x5101, 0x5101).mirror(0x00fc).portr("IN0")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 500, sourceColumn: 2, sourceEndLine: 500, mirror: 252, portRead: 'IN0'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range9'}) SET n:AddressRange SET n += {start: 20737, end: 20737, raw: 'map(0x5101, 0x5101).mirror(0x00fc).writeonly().share("sprite_enable")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 501, sourceColumn: 2, sourceEndLine: 501, mirror: 252, writeonly: true, share: 'sprite_enable'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range10'}) SET n:AddressRange SET n += {start: 20739, end: 20739, raw: 'map(0x5103, 0x5103).mirror(0x00fc).r(FUNC(exidy_state::exidy_interrupt_r))', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 502, sourceColumn: 2, sourceEndLine: 502, mirror: 252};
MERGE (n:KG {id: 'handler:exidy_state.exidy_interrupt_r'}) SET n:Handler SET n += {method: 'exidy_interrupt_r', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1161, sourceColumn: 1, sourceEndLine: 1169, sourceParameters: '', sourceBody: '/* clear any interrupts */
	if (!machine().side_effects_disabled())
		m_maincpu->set_input_line(0, CLEAR_LINE);

	/* return the latched condition */
	return m_int_condition;'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range11'}) SET n:AddressRange SET n += {start: 21008, end: 21010, raw: 'map(0x5210, 0x5212).writeonly().share("color_latch")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 503, sourceColumn: 2, sourceEndLine: 503, writeonly: true, share: 'color_latch'};
MERGE (n:KG {id: 'map:exidy_state.exidy_map/range12'}) SET n:AddressRange SET n += {start: 21011, end: 21011, raw: 'map(0x5213, 0x5213).portr("IN2")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 504, sourceColumn: 2, sourceEndLine: 504, portRead: 'IN2'};
MERGE (n:KG {id: 'map:exidy_state.venture_map'}) SET n:AddressMap SET n += {cls: 'exidy_state', name: 'venture_map', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 571, sourceColumn: 1, sourceEndLine: 577, calls: ['exidy_map']};
MERGE (n:KG {id: 'map:exidy_state.venture_map/range0'}) SET n:AddressRange SET n += {start: 18432, end: 20479, raw: 'map(0x4800, 0x4fff).ram().share("characterram")', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 574, sourceColumn: 2, sourceEndLine: 574, ram: true, share: 'characterram'};
MERGE (n:KG {id: 'map:exidy_state.venture_map/range1'}) SET n:AddressRange SET n += {start: 20992, end: 21007, raw: 'map(0x5200, 0x520f).rw("pia", FUNC(pia6821_device::read), FUNC(pia6821_device::write))', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 575, sourceColumn: 2, sourceEndLine: 575};
MERGE (n:KG {id: 'handler:pia6821_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'pia6821_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 846, sourceColumn: 2, sourceEndLine: 846};
MERGE (n:KG {id: 'handler:pia6821_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'pia6821_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 846, sourceColumn: 2, sourceEndLine: 846};
MERGE (n:KG {id: 'map:exidy_state.venture_map/range2'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).rom()', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 576, sourceColumn: 2, sourceEndLine: 576, rom: true};
MERGE (n:KG {id: 'map:venture_sound_device.venture_audio_map'}) SET n:AddressMap SET n += {cls: 'venture_sound_device', name: 'venture_audio_map', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 562, sourceColumn: 1, sourceEndLine: 573, globalMask: 32767};
MERGE (n:KG {id: 'map:venture_sound_device.venture_audio_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 127, raw: 'map(0x0000, 0x007f).mirror(0x0780).m(m_riot, FUNC(mos6532_device::ram_map))', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 565, sourceColumn: 2, sourceEndLine: 565, mirror: 1920};
MERGE (n:KG {id: 'map:venture_sound_device.venture_audio_map/range1'}) SET n:AddressRange SET n += {start: 2048, end: 2079, raw: 'map(0x0800, 0x081f).mirror(0x07e0).m(m_riot, FUNC(mos6532_device::io_map))', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 566, sourceColumn: 2, sourceEndLine: 566, mirror: 2016};
MERGE (n:KG {id: 'map:venture_sound_device.venture_audio_map/range2'}) SET n:AddressRange SET n += {start: 4096, end: 4099, raw: 'map(0x1000, 0x1003).mirror(0x07fc).rw(m_pia, FUNC(pia6821_device::read), FUNC(pia6821_device::write))', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 567, sourceColumn: 2, sourceEndLine: 567, mirror: 2044};
MERGE (n:KG {id: 'map:venture_sound_device.venture_audio_map/range3'}) SET n:AddressRange SET n += {start: 6144, end: 6147, raw: 'map(0x1800, 0x1803).mirror(0x07fc).w(FUNC(venture_sound_device::sh8253_w)).nopr()', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 568, sourceColumn: 2, sourceEndLine: 568, mirror: 2044, nopr: true};
MERGE (n:KG {id: 'handler:venture_sound_device.sh8253_w'}) SET n:Handler SET n += {method: 'sh8253_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 372, sourceColumn: 1, sourceEndLine: 376, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_stream->update();
	m_pit->write(offset, data);'};
MERGE (n:KG {id: 'map:venture_sound_device.venture_audio_map/range4'}) SET n:AddressRange SET n += {start: 8192, end: 8192, raw: 'map(0x2000, 0x2000).mirror(0x07ff).w(FUNC(venture_sound_device::filter_w))', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 569, sourceColumn: 2, sourceEndLine: 569, mirror: 2047};
MERGE (n:KG {id: 'handler:venture_sound_device.filter_w'}) SET n:Handler SET n += {method: 'filter_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 552, sourceColumn: 1, sourceEndLine: 555, sourceParameters: 'uint8_t data', sourceBody: 'logerror("exidy_sound_filter_w = %02X\\n", data);'};
MERGE (n:KG {id: 'map:venture_sound_device.venture_audio_map/range5'}) SET n:AddressRange SET n += {start: 10240, end: 10247, raw: 'map(0x2800, 0x2807).mirror(0x07f8).rw(FUNC(venture_sound_device::sh6840_r), FUNC(venture_sound_device::sh6840_w))', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 570, sourceColumn: 2, sourceEndLine: 570, mirror: 2040};
MERGE (n:KG {id: 'handler:venture_sound_device.sh6840_r'}) SET n:Handler SET n += {method: 'sh6840_r', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 396, sourceColumn: 1, sourceEndLine: 422, sourceParameters: 'offs_t offset', sourceBody: '// force an update of the stream
	m_stream->update();

	switch (offset)
	{
		// offset 0: Motorola datasheet says it isn\'t used, Hitachi datasheet says it reads as 0s always
		case 0:
			return 0;

		// offset 1 reads the status register: bits 2 1 0 correspond to ints on channels 2,1,0, and bit 7 is an \'OR\' of bits 2,1,0
		case 1:
			logerror("%s:exidy_sh6840_r - unexpected read, status register is TODO!\\n", machine().describe_context());
			return 0;

		// offsets 2,4,6 read channel 0,1,2 MSBs and latch the LSB
		case 2: case 4: case 6:
			if (!machine().side_effects_disabled())
				m_sh6840_LSB_latch = m_sh6840_timer[((offset>>1)-1)].counter.b.l;
			return m_sh6840_timer[((offset>>1)-1)].counter.b.h;

		// offsets 3,5,7 read the LSB latch
		default: // case 3,5,7
			return m_sh6840_LSB_latch;
	}'};
MERGE (n:KG {id: 'handler:venture_sound_device.sh6840_w'}) SET n:Handler SET n += {method: 'sh6840_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 425, sourceColumn: 1, sourceEndLine: 477, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'sh6840_timer_channel *sh6840_timer = m_sh6840_timer;

	// force an update of the stream
	m_stream->update();

	switch (offset)
	{
		// offset 0 writes to either channel 0 control or channel 2 control
		case 0:
			if (sh6840_timer[1].cr & 0x01)
				sh6840_timer[0].cr = data;
			else
				sh6840_timer[2].cr = data;

			// only support mode 0 and 2
			if (((data >> 3) & 5) != 0)
				fatalerror("exidy_sh6840_w - channel %d configured for mode %d\\n", (sh6840_timer[1].cr & 0x01) ? 0 : 2, (data >> 3) & 7);
			break;

		// offset 1 writes to channel 1 control
		case 1:
			sh6840_timer[1].cr = data;

			// only support mode 0 and 2
			if (((data >> 3) & 5) != 0)
				fatalerror("exidy_sh6840_w - channel 1 configured for mode %d\\n", (data >> 3) & 7);
			break;

		// offsets 2/4/6 write to the common MSB latch
		case 2:
		case 4:
		case 6:
			m_sh6840_MSB_latch = data;
			break;

		// offsets 3/5/7 write to the LSB controls
		case 3:
		case 5:
		case 7:
		{
			// latch the timer value
			int ch = (offset - 3) / 2;
			sh6840_timer[ch].timer = (m_sh6840_MSB_latch << 8) | (data & 0xff);

			// if CR4 is clear, the value is loaded immediately
			if (!(sh6840_timer[ch].cr & 0x10))
				sh6840_timer[ch].counter.w = sh6840_timer[ch].timer;
			break;
		}
	}'};
MERGE (n:KG {id: 'map:venture_sound_device.venture_audio_map/range6'}) SET n:AddressRange SET n += {start: 12288, end: 12291, raw: 'map(0x3000, 0x3003).mirror(0x07fc).w(FUNC(venture_sound_device::sfxctrl_w))', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 571, sourceColumn: 2, sourceEndLine: 571, mirror: 2044};
MERGE (n:KG {id: 'handler:venture_sound_device.sfxctrl_w'}) SET n:Handler SET n += {method: 'sfxctrl_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 487, sourceColumn: 1, sourceEndLine: 503, sourceConstants: ['BASE_VOLUME=5461.166666666667'], sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_stream->update();

	switch (offset)
	{
		case 0:
			m_sfxctrl = data;
			break;

		case 1:
		case 2:
		case 3:
			m_sh6840_volume[offset - 1] = ((data & 7) * BASE_VOLUME) / 7;
			break;
	}'};
MERGE (n:KG {id: 'map:venture_sound_device.venture_audio_map/range7'}) SET n:AddressRange SET n += {start: 22528, end: 32767, raw: 'map(0x5800, 0x7fff).rom()', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 572, sourceColumn: 2, sourceEndLine: 572, rom: true};
MERGE (n:KG {id: 'machine:exidy_state.base'}) SET n:MachineConfig SET n += {cls: 'exidy_state', name: 'base', calls: [], startHandlers: ['exidy_state.video_start'], sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1506, sourceColumn: 1, sourceEndLine: 1521};
MERGE (n:KG {id: 'handler:exidy_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1121, sourceColumn: 1, sourceEndLine: 1133, sourceParameters: '', sourceBody: 'm_screen->register_screen_bitmap(m_background_bitmap);
	m_motion_object_1_vid.allocate(16, 16);
	m_motion_object_2_vid.allocate(16, 16);
	m_motion_object_2_clip.allocate(16, 16);

	save_item(NAME(m_int_condition));
	save_item(NAME(m_background_bitmap));
	save_item(NAME(m_motion_object_1_vid));
	save_item(NAME(m_motion_object_2_vid));
	save_item(NAME(m_motion_object_2_clip));'};
MERGE (n:KG {id: 'device:exidy_state.base/maincpu'}) SET n:Device SET n += {type: 'M6502', tag: 'maincpu', clock: 705562.5, config: ['M6502(config, m_maincpu, EXIDY_CPU_CLOCK)', 'm_maincpu->set_vblank_int("screen", FUNC(exidy_state::exidy_vblank_interrupt))'], sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1509, sourceColumn: 2, sourceEndLine: 1509};
MERGE (n:KG {id: 'device:exidy_state.base/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(exidy_state::exidy_vblank_interrupt))', ownerTag: 'maincpu', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1510, sourceColumn: 2, sourceEndLine: 1510, targetTag: 'screen', targetClass: 'exidy_state', targetMethod: 'exidy_vblank_interrupt'};
MERGE (n:KG {id: 'handler:exidy_state.exidy_vblank_interrupt'}) SET n:Handler SET n += {method: 'exidy_vblank_interrupt', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1150, sourceColumn: 1, sourceEndLine: 1158, sourceParameters: 'device_t &device', sourceBody: '/* latch the current condition */
	latch_condition(0);
	m_int_condition &= ~0x80;

	/* set the IRQ line */
	device.execute().set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:exidy_state.latch_condition'}) SET n:Handler SET n += {method: 'latch_condition', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1143, sourceColumn: 1, sourceEndLine: 1147, sourceParameters: 'int collision', sourceBody: 'collision ^= m_collision_invert;
	m_int_condition = (ioport("INTSOURCE")->read() & ~0x1c) | (collision & m_collision_mask);'};
MERGE (n:KG {id: 'device:exidy_state.base/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_exidy)'], sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1513, sourceColumn: 2, sourceEndLine: 1513, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:exidy_state.base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_entries(8)'], sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1514, sourceColumn: 2, sourceEndLine: 1514};
MERGE (n:KG {id: 'device:exidy_state.base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_video_attributes(VIDEO_ALWAYS_UPDATE)', 'm_screen->set_raw(EXIDY_PIXEL_CLOCK, EXIDY_HTOTAL, EXIDY_HBEND, EXIDY_HBSTART, EXIDY_VTOTAL, EXIDY_VBEND, EXIDY_VBSTART)', 'm_screen->set_screen_update(FUNC(exidy_state::screen_update))', 'm_screen->set_palette(m_palette)'], sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1516, sourceColumn: 2, sourceEndLine: 1516, configCalls: ['set_raw(5644500,336,0,256,280,0,256)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [5644500, 336, 0, 256, 280, 0, 256], screenVideoAttributes: ['VIDEO_ALWAYS_UPDATE']};
MERGE (n:KG {id: 'device:exidy_state.base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(exidy_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1519, sourceColumn: 2, sourceEndLine: 1519, targetClass: 'exidy_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:exidy_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1436, sourceColumn: 1, sourceEndLine: 1452, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '/* refresh the colors from the palette (static or dynamic) */
	set_colors();

	/* update the background and draw it */
	draw_background();
	copybitmap(bitmap, m_background_bitmap, 0, 0, 0, 0, cliprect);

	/* draw the sprites */
	draw_sprites(bitmap, cliprect);

	/* check for collision, this will set the appropriate bits in collision_mask */
	check_collision();

	return 0;'};
MERGE (n:KG {id: 'handler:exidy_state.set_colors'}) SET n:Handler SET n += {method: 'set_colors', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1187, sourceColumn: 1, sourceEndLine: 1202, sourceParameters: '', sourceBody: '/* motion object 1 */
	set_1_color(0, 0);
	set_1_color(1, 7);

	/* motion object 2 */
	set_1_color(2, 0);
	set_1_color(3, 6);

	/* characters */
	set_1_color(4, 4);
	set_1_color(5, 3);
	set_1_color(6, 2);
	set_1_color(7, 1);'};
MERGE (n:KG {id: 'handler:exidy_state.set_1_color'}) SET n:Handler SET n += {method: 'set_1_color', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1179, sourceColumn: 1, sourceEndLine: 1185, sourceParameters: 'int index, int which', sourceBody: 'm_palette->set_pen_color(index,
			pal1bit(m_color_latch[2] >> which),
			pal1bit(m_color_latch[1] >> which),
			pal1bit(m_color_latch[0] >> which));'};
MERGE (n:KG {id: 'handler:exidy_state.draw_background'}) SET n:Handler SET n += {method: 'draw_background', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1212, sourceColumn: 1, sourceEndLine: 1272, sourceParameters: '', sourceBody: 'const uint8_t *const cram = m_characterram ? &m_characterram[0] : memregion("maincpu")->base() + 0x4800;

	pen_t off_pen = 0;

	for (offs_t offs = 0; offs < 0x400; offs++)
	{
		uint8_t y = offs >> 5 << 3;
		uint8_t const code = m_videoram[offs];

		pen_t on_pen_1, on_pen_2;
		if (m_is_2bpp)
		{
			on_pen_1 = 4 + ((code >> 6) & 0x02);
			on_pen_2 = 5 + ((code >> 6) & 0x02);
		}
		else
		{
			on_pen_1 = 4 + ((code >> 6) & 0x03);
			on_pen_2 = off_pen;  /* unused */
		}

		for (uint8_t cy = 0; cy < 8; cy++)
		{
			uint8_t x = offs << 3;

			if (m_is_2bpp)
			{
				uint8_t data1 = cram[0x000 | (code << 3) | cy];
				uint8_t data2 = cram[0x800 | (code << 3) | cy];

				for (int i = 0; i < 8; i++)
				{
					if (data1 & 0x80)
						m_background_bitmap.pix(y, x) = (data2 & 0x80) ? on_pen_2 : on_pen_1;
					else
						m_background_bitmap.pix(y, x) = off_pen;

					x++;
					data1 <<= 1;
					data2 <<= 1;
				}
			}
			else // 1bpp
			{
				uint8_t data = cram[(code << 3) | cy];

				for (int i = 0; i < 8; i++)
				{
					m_background_bitmap.pix(y, x) = (data & 0x80) ? on_pen_1 : off_pen;

					x++;
					data <<= 1;
				}
			}

			y++;
		}
	}'};
MERGE (n:KG {id: 'handler:exidy_state.base'}) SET n:Handler SET n += {method: 'base', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1506, sourceColumn: 1, sourceEndLine: 1521, sourceConstants: ['EXIDY_CPU_CLOCK=705562.5', 'EXIDY_PIXEL_CLOCK=5644500', 'EXIDY_HTOTAL=336', 'EXIDY_HBEND=0', 'EXIDY_HBSTART=256', 'EXIDY_VTOTAL=280', 'EXIDY_VBEND=0', 'EXIDY_VBSTART=256'], sourceParameters: 'machine_config &config', sourceBody: '// basic machine hardware
	M6502(config, m_maincpu, EXIDY_CPU_CLOCK);
	m_maincpu->set_vblank_int("screen", FUNC(exidy_state::exidy_vblank_interrupt));

	// video hardware
	GFXDECODE(config, m_gfxdecode, m_palette, gfx_exidy);
	PALETTE(config, m_palette).set_entries(8);

	SCREEN(config, m_screen, SCREEN_TYPE_RASTER);
	m_screen->set_video_attributes(VIDEO_ALWAYS_UPDATE);
	m_screen->set_raw(EXIDY_PIXEL_CLOCK, EXIDY_HTOTAL, EXIDY_HBEND, EXIDY_HBSTART, EXIDY_VTOTAL, EXIDY_VBEND, EXIDY_VBSTART);
	m_screen->set_screen_update(FUNC(exidy_state::screen_update));
	m_screen->set_palette(m_palette);'};
MERGE (n:KG {id: 'handler:exidy_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1290, sourceColumn: 1, sourceEndLine: 1316, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '/* draw sprite 2 first */
	int sprite_set_2 = ((*m_sprite_enable & 0x40) != 0);

	int sx = 236 - *m_sprite2_xpos - 4;
	int sy = 244 - *m_sprite2_ypos - 4;

	m_gfxdecode->gfx(0)->transpen(bitmap,cliprect,
			((*m_spriteno >> 4) & 0x0f) + 32 + 16 * sprite_set_2, 1,
			0, 0, sx, sy, 0);

	/* draw sprite 1 next */
	if (sprite_1_enabled())
	{
		int sprite_set_1 = ((*m_sprite_enable & 0x20) != 0);

		sx = 236 - *m_sprite1_xpos - 4;
		sy = 244 - *m_sprite1_ypos - 4;

		if (sy < 0) sy = 0;

		m_gfxdecode->gfx(0)->transpen(bitmap,cliprect,
				(*m_spriteno & 0x0f) + 16 * sprite_set_1, 0,
				0, 0, sx, sy, 0);
	}'};
MERGE (n:KG {id: 'handler:exidy_state.sprite_1_enabled'}) SET n:Handler SET n += {method: 'sprite_1_enabled', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1282, sourceColumn: 1, sourceEndLine: 1287, sourceParameters: '', sourceBody: '/* if the collision_mask is 0x00, then we are on old hardware that always has */
	/* sprite 1 enabled regardless */
	return (!(*m_sprite_enable & 0x80) || (*m_sprite_enable & 0x10) || (m_collision_mask == 0x00));'};
MERGE (n:KG {id: 'handler:exidy_state.check_collision'}) SET n:Handler SET n += {method: 'check_collision', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1348, sourceColumn: 1, sourceEndLine: 1426, sourceParameters: '', sourceBody: 'uint8_t sprite_set_1 = ((*m_sprite_enable & 0x20) != 0);
	uint8_t sprite_set_2 = ((*m_sprite_enable & 0x40) != 0);
	const rectangle clip(0, 15, 0, 15);
	int org_1_x = 0, org_1_y = 0;
	int org_2_x = 0, org_2_y = 0;
	int count = 0;

	/* if there is nothing to detect, bail */
	if (m_collision_mask == 0)
		return;

	/* draw sprite 1 */
	m_motion_object_1_vid.fill(0xff, clip);
	if (sprite_1_enabled())
	{
		org_1_x = 236 - *m_sprite1_xpos - 4;
		org_1_y = 244 - *m_sprite1_ypos - 4;
		m_gfxdecode->gfx(0)->transpen(m_motion_object_1_vid,clip,
				(*m_spriteno & 0x0f) + 16 * sprite_set_1, 0,
				0, 0, 0, 0, 0);
	}

	/* draw sprite 2 */
	m_motion_object_2_vid.fill(0xff, clip);
	org_2_x = 236 - *m_sprite2_xpos - 4;
	org_2_y = 244 - *m_sprite2_ypos - 4;
	m_gfxdecode->gfx(0)->transpen(m_motion_object_2_vid,clip,
			((*m_spriteno >> 4) & 0x0f) + 32 + 16 * sprite_set_2, 0,
			0, 0, 0, 0, 0);

	/* draw sprite 2 clipped to sprite 1\'s location */
	m_motion_object_2_clip.fill(0xff, clip);
	if (sprite_1_enabled())
	{
		int sx = org_2_x - org_1_x;
		int sy = org_2_y - org_1_y;
		m_gfxdecode->gfx(0)->transpen(m_motion_object_2_clip,clip,
				((*m_spriteno >> 4) & 0x0f) + 32 + 16 * sprite_set_2, 0,
				0, 0, sx, sy, 0);
	}

	/* scan for collisions */
	for (int sy = 0; sy < 16; sy++)
		for (int sx = 0; sx < 16; sx++)
		{
			if (m_motion_object_1_vid.pix(sy, sx) != 0xff)
			{
				uint8_t current_collision_mask = 0;

				/* check for background collision (M1CHAR) */
				if (m_background_bitmap.pix(org_1_y + sy, org_1_x + sx) != 0)
					current_collision_mask |= 0x04;

				/* check for motion object collision (M1M2) */
				if (m_motion_object_2_clip.pix(sy, sx) != 0xff)
					current_collision_mask |= 0x10;

				/* if we got one, trigger an interrupt */
				if ((current_collision_mask & m_collision_mask) && count < 128)
				{
					m_collision_timer[count]->adjust(m_screen->time_until_pos(org_1_x + sx, org_1_y + sy), current_collision_mask);
					count++;
				}
			}

			if (m_motion_object_2_vid.pix(sy, sx) != 0xff)
			{
				/* check for background collision (M2CHAR) */
				if (m_background_bitmap.pix(org_2_y + sy, org_2_x + sx) != 0)
					if ((m_collision_mask & 0x08) && count < 128)
					{
						m_collision_timer[count]->adjust(m_screen->time_until_pos(org_2_x + sx, org_2_y + sy), 0x08);
						count++;
					}
			}
		}'};
MERGE (n:KG {id: 'machine:exidy_state.venture'}) SET n:MachineConfig SET n += {cls: 'exidy_state', name: 'venture', calls: ['base'], startHandlers: ['exidy_state.video_start'], sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1598, sourceColumn: 1, sourceEndLine: 1622};
MERGE (n:KG {id: 'device:exidy_state.venture/pia'}) SET n:Device SET n += {type: 'PIA6821', tag: 'pia', clock: null, config: ['pia6821_device &pia(PIA6821(config, "pia"))', 'pia.writepa_handler().set("soundbd", FUNC(venture_sound_device::pb_w))', 'pia.writepb_handler().set("soundbd", FUNC(venture_sound_device::pa_w))', 'pia.ca2_handler().set("soundbd", FUNC(venture_sound_device::cb_w))', 'pia.cb2_handler().set("soundbd", FUNC(venture_sound_device::ca_w))'], sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1611, sourceColumn: 2, sourceEndLine: 1611};
MERGE (n:KG {id: 'device:exidy_state.venture/pia/callback:pia:0'}) SET n:Callback SET n += {signal: 'writepa_handler', operation: 'set', raw: 'pia.writepa_handler().set("soundbd", FUNC(venture_sound_device::pb_w))', ownerTag: 'pia', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1612, sourceColumn: 2, sourceEndLine: 1612, targetTag: 'soundbd', targetClass: 'venture_sound_device', targetMethod: 'pb_w'};
MERGE (n:KG {id: 'handler:venture_sound_device.pb_w'}) SET n:Handler SET n += {method: 'pb_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.h', sourceLine: 121, sourceColumn: 1, sourceEndLine: 121, sourceParameters: 'uint8_t data', sourceBody: 'm_pia->portb_w(data);'};
MERGE (n:KG {id: 'device:exidy_state.venture/pia/callback:pia:1'}) SET n:Callback SET n += {signal: 'writepb_handler', operation: 'set', raw: 'pia.writepb_handler().set("soundbd", FUNC(venture_sound_device::pa_w))', ownerTag: 'pia', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1613, sourceColumn: 2, sourceEndLine: 1613, targetTag: 'soundbd', targetClass: 'venture_sound_device', targetMethod: 'pa_w'};
MERGE (n:KG {id: 'handler:venture_sound_device.pa_w'}) SET n:Handler SET n += {method: 'pa_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.h', sourceLine: 118, sourceColumn: 1, sourceEndLine: 120, sourceParameters: 'uint8_t data', sourceBody: 'm_pia->porta_w(data);'};
MERGE (n:KG {id: 'device:exidy_state.venture/pia/callback:pia:2'}) SET n:Callback SET n += {signal: 'ca2_handler', operation: 'set', raw: 'pia.ca2_handler().set("soundbd", FUNC(venture_sound_device::cb_w))', ownerTag: 'pia', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1614, sourceColumn: 2, sourceEndLine: 1614, targetTag: 'soundbd', targetClass: 'venture_sound_device', targetMethod: 'cb_w'};
MERGE (n:KG {id: 'handler:venture_sound_device.cb_w'}) SET n:Handler SET n += {method: 'cb_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.h', sourceLine: 123, sourceColumn: 1, sourceEndLine: 123, sourceParameters: 'int state', sourceBody: 'm_pia->cb1_w(state);'};
MERGE (n:KG {id: 'device:exidy_state.venture/pia/callback:pia:3'}) SET n:Callback SET n += {signal: 'cb2_handler', operation: 'set', raw: 'pia.cb2_handler().set("soundbd", FUNC(venture_sound_device::ca_w))', ownerTag: 'pia', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1615, sourceColumn: 2, sourceEndLine: 1615, targetTag: 'soundbd', targetClass: 'venture_sound_device', targetMethod: 'ca_w'};
MERGE (n:KG {id: 'handler:venture_sound_device.ca_w'}) SET n:Handler SET n += {method: 'ca_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.h', sourceLine: 122, sourceColumn: 1, sourceEndLine: 122, sourceParameters: 'int state', sourceBody: 'm_pia->ca1_w(state);'};
MERGE (n:KG {id: 'device:exidy_state.venture/soundbd'}) SET n:Device SET n += {type: 'EXIDY_VENTURE', tag: 'soundbd', clock: 0, config: ['venture_sound_device &soundbd(EXIDY_VENTURE(config, "soundbd"))', 'soundbd.pa_callback().set("pia", FUNC(pia6821_device::portb_w))', 'soundbd.pb_callback().set("pia", FUNC(pia6821_device::porta_w))', 'soundbd.ca2_callback().set("pia", FUNC(pia6821_device::cb1_w))', 'soundbd.cb2_callback().set("pia", FUNC(pia6821_device::ca1_w))'], sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1617, sourceColumn: 2, sourceEndLine: 1617};
MERGE (n:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:0'}) SET n:Callback SET n += {signal: 'pa_callback', operation: 'set', raw: 'soundbd.pa_callback().set("pia", FUNC(pia6821_device::portb_w))', ownerTag: 'soundbd', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1618, sourceColumn: 2, sourceEndLine: 1618, targetTag: 'pia', targetClass: 'pia6821_device', targetMethod: 'portb_w'};
MERGE (n:KG {id: 'handler:pia6821_device.portb_w'}) SET n:Handler SET n += {method: 'portb_w', ownerClass: 'pia6821_device', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1657, sourceColumn: 2, sourceEndLine: 1657};
MERGE (n:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:1'}) SET n:Callback SET n += {signal: 'pb_callback', operation: 'set', raw: 'soundbd.pb_callback().set("pia", FUNC(pia6821_device::porta_w))', ownerTag: 'soundbd', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1619, sourceColumn: 2, sourceEndLine: 1619, targetTag: 'pia', targetClass: 'pia6821_device', targetMethod: 'porta_w'};
MERGE (n:KG {id: 'handler:pia6821_device.porta_w'}) SET n:Handler SET n += {method: 'porta_w', ownerClass: 'pia6821_device', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1658, sourceColumn: 2, sourceEndLine: 1658};
MERGE (n:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:2'}) SET n:Callback SET n += {signal: 'ca2_callback', operation: 'set', raw: 'soundbd.ca2_callback().set("pia", FUNC(pia6821_device::cb1_w))', ownerTag: 'soundbd', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1620, sourceColumn: 2, sourceEndLine: 1620, targetTag: 'pia', targetClass: 'pia6821_device', targetMethod: 'cb1_w'};
MERGE (n:KG {id: 'handler:pia6821_device.cb1_w'}) SET n:Handler SET n += {method: 'cb1_w', ownerClass: 'pia6821_device', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1659, sourceColumn: 2, sourceEndLine: 1659};
MERGE (n:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:3'}) SET n:Callback SET n += {signal: 'cb2_callback', operation: 'set', raw: 'soundbd.cb2_callback().set("pia", FUNC(pia6821_device::ca1_w))', ownerTag: 'soundbd', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1621, sourceColumn: 2, sourceEndLine: 1621, targetTag: 'pia', targetClass: 'pia6821_device', targetMethod: 'ca1_w'};
MERGE (n:KG {id: 'handler:pia6821_device.ca1_w'}) SET n:Handler SET n += {method: 'ca1_w', ownerClass: 'pia6821_device', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1660, sourceColumn: 2, sourceEndLine: 1660};
MERGE (n:KG {id: 'machine:exidy_sh8253_sound_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'exidy_sh8253_sound_device', name: 'device_add_mconfig', calls: ['exidy_sound_device::device_add_mconfig'], sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 182, sourceColumn: 1, sourceEndLine: 205};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/riot'}) SET n:Device SET n += {type: 'MOS6532', tag: 'riot', clock: 894886.25, config: ['MOS6532(config, m_riot, SH6532_CLOCK)', 'm_riot->irq_wr_callback().set("audioirq", FUNC(input_merger_device::in_w<0>))'], sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 186, sourceColumn: 2, sourceEndLine: 186};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/riot/callback:riot:0'}) SET n:Callback SET n += {signal: 'irq_wr_callback', operation: 'set', raw: 'm_riot->irq_wr_callback().set("audioirq", FUNC(input_merger_device::in_w<0>))', ownerTag: 'riot', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 187, sourceColumn: 2, sourceEndLine: 187, targetTag: 'audioirq', targetClass: 'input_merger_device', targetMethod: 'in_w_0'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_0'}) SET n:Handler SET n += {method: 'in_w_0', ownerClass: 'input_merger_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 187, sourceColumn: 2, sourceEndLine: 187};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pia'}) SET n:Device SET n += {type: 'PIA6821', tag: 'pia', clock: null, config: ['PIA6821(config, m_pia)', 'm_pia->irqa_handler().set("audioirq", FUNC(input_merger_device::in_w<1>))'], sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 189, sourceColumn: 2, sourceEndLine: 189};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pia/callback:pia:0'}) SET n:Callback SET n += {signal: 'irqa_handler', operation: 'set', raw: 'm_pia->irqa_handler().set("audioirq", FUNC(input_merger_device::in_w<1>))', ownerTag: 'pia', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 190, sourceColumn: 2, sourceEndLine: 190, targetTag: 'audioirq', targetClass: 'input_merger_device', targetMethod: 'in_w_1'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_1'}) SET n:Handler SET n += {method: 'in_w_1', ownerClass: 'input_merger_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 190, sourceColumn: 2, sourceEndLine: 190};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit'}) SET n:Device SET n += {type: 'PIT8253', tag: 'pit', clock: 894886.25, config: ['PIT8253(config, m_pit, SH6532_CLOCK)', 'm_pit->set_clk<0>(SH8253_CLOCK)', 'm_pit->set_clk<1>(SH8253_CLOCK)', 'm_pit->set_clk<2>(SH8253_CLOCK)', 'm_pit->out_handler<0>().set(FUNC(exidy_sh8253_sound_device::pit_out<0>))', 'm_pit->out_handler<1>().set(FUNC(exidy_sh8253_sound_device::pit_out<1>))', 'm_pit->out_handler<2>().set(FUNC(exidy_sh8253_sound_device::pit_out<2>))'], sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 192, sourceColumn: 2, sourceEndLine: 192};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit/callback:pit:0'}) SET n:Callback SET n += {signal: 'out_handler', operation: 'set', raw: 'm_pit->out_handler<0>().set(FUNC(exidy_sh8253_sound_device::pit_out<0>))', ownerTag: 'pit', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 196, sourceColumn: 2, sourceEndLine: 196, slot: '0', targetClass: 'exidy_sh8253_sound_device', targetMethod: 'pit_out_0'};
MERGE (n:KG {id: 'handler:exidy_sh8253_sound_device.pit_out_0'}) SET n:Handler SET n += {method: 'pit_out_0', ownerClass: 'exidy_sh8253_sound_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 379, sourceColumn: 1, sourceEndLine: 386, sourceConstants: ['N=0'], sourceParameters: 'int state', sourceBody: 'm_stream->update();
	if (state)
		m_pit_out |= u8(1) << N;
	else
		m_pit_out &= ~(u8(1) << N);'};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit/callback:pit:1'}) SET n:Callback SET n += {signal: 'out_handler', operation: 'set', raw: 'm_pit->out_handler<1>().set(FUNC(exidy_sh8253_sound_device::pit_out<1>))', ownerTag: 'pit', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 197, sourceColumn: 2, sourceEndLine: 197, slot: '1', targetClass: 'exidy_sh8253_sound_device', targetMethod: 'pit_out_1'};
MERGE (n:KG {id: 'handler:exidy_sh8253_sound_device.pit_out_1'}) SET n:Handler SET n += {method: 'pit_out_1', ownerClass: 'exidy_sh8253_sound_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 379, sourceColumn: 1, sourceEndLine: 386, sourceConstants: ['N=1'], sourceParameters: 'int state', sourceBody: 'm_stream->update();
	if (state)
		m_pit_out |= u8(1) << N;
	else
		m_pit_out &= ~(u8(1) << N);'};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit/callback:pit:2'}) SET n:Callback SET n += {signal: 'out_handler', operation: 'set', raw: 'm_pit->out_handler<2>().set(FUNC(exidy_sh8253_sound_device::pit_out<2>))', ownerTag: 'pit', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 198, sourceColumn: 2, sourceEndLine: 198, slot: '2', targetClass: 'exidy_sh8253_sound_device', targetMethod: 'pit_out_2'};
MERGE (n:KG {id: 'handler:exidy_sh8253_sound_device.pit_out_2'}) SET n:Handler SET n += {method: 'pit_out_2', ownerClass: 'exidy_sh8253_sound_device', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 379, sourceColumn: 1, sourceEndLine: 386, sourceConstants: ['N=2'], sourceParameters: 'int state', sourceBody: 'm_stream->update();
	if (state)
		m_pit_out |= u8(1) << N;
	else
		m_pit_out &= ~(u8(1) << N);'};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/audioirq'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'audioirq', clock: null, config: ['INPUT_MERGER_ANY_HIGH(config, "audioirq").output_handler().set_inputline("audiocpu", m6502_device::IRQ_LINE)'], sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 200, sourceColumn: 2, sourceEndLine: 200};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/audioirq/callback:audioirq:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'INPUT_MERGER_ANY_HIGH(config, "audioirq").output_handler().set_inputline("audiocpu", m6502_device::IRQ_LINE)', ownerTag: 'audioirq', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 200, sourceColumn: 2, sourceEndLine: 200, targetTag: 'audiocpu', inputLine: 'm6502_device::IRQ_LINE'};
MERGE (n:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()', 'this->add_route(ALL_OUTPUTS, "mono", 0.50)'], sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 202, sourceColumn: 2, sourceEndLine: 202};
MERGE (n:KG {id: 'machine:venture_sound_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'venture_sound_device', name: 'device_add_mconfig', calls: ['exidy_sh8253_sound_device::device_add_mconfig'], devicePatches: ['{"tag":"pia","config":["m_pia->writepa_handler().set(FUNC(venture_sound_device::pia_pa_w))","m_pia->writepb_handler().set(FUNC(venture_sound_device::pia_pb_w))","m_pia->ca2_handler().set(FUNC(venture_sound_device::pia_ca2_w))","m_pia->cb2_handler().set(FUNC(venture_sound_device::pia_cb2_w))"]}'], sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 580, sourceColumn: 1, sourceEndLine: 591};
MERGE (n:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:0'}) SET n:Callback SET n += {signal: 'writepa_handler', operation: 'set', raw: 'm_pia->writepa_handler().set(FUNC(venture_sound_device::pia_pa_w))', ownerTag: 'pia', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 587, sourceColumn: 2, sourceEndLine: 587, targetClass: 'venture_sound_device', targetMethod: 'pia_pa_w'};
MERGE (n:KG {id: 'handler:venture_sound_device.pia_pa_w'}) SET n:Handler SET n += {method: 'pia_pa_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.h', sourceLine: 134, sourceColumn: 29, sourceEndLine: 136, sourceParameters: 'uint8_t data', sourceBody: 'm_pa_callback(data);'};
MERGE (n:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:1'}) SET n:Callback SET n += {signal: 'writepb_handler', operation: 'set', raw: 'm_pia->writepb_handler().set(FUNC(venture_sound_device::pia_pb_w))', ownerTag: 'pia', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 588, sourceColumn: 2, sourceEndLine: 588, targetClass: 'venture_sound_device', targetMethod: 'pia_pb_w'};
MERGE (n:KG {id: 'handler:venture_sound_device.pia_pb_w'}) SET n:Handler SET n += {method: 'pia_pb_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.h', sourceLine: 137, sourceColumn: 1, sourceEndLine: 137, sourceParameters: 'uint8_t data', sourceBody: 'm_pb_callback(data);'};
MERGE (n:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:2'}) SET n:Callback SET n += {signal: 'ca2_handler', operation: 'set', raw: 'm_pia->ca2_handler().set(FUNC(venture_sound_device::pia_ca2_w))', ownerTag: 'pia', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 589, sourceColumn: 2, sourceEndLine: 589, targetClass: 'venture_sound_device', targetMethod: 'pia_ca2_w'};
MERGE (n:KG {id: 'handler:venture_sound_device.pia_ca2_w'}) SET n:Handler SET n += {method: 'pia_ca2_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.h', sourceLine: 138, sourceColumn: 1, sourceEndLine: 138, sourceParameters: 'int state', sourceBody: 'm_ca2_callback(state);'};
MERGE (n:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:3'}) SET n:Callback SET n += {signal: 'cb2_handler', operation: 'set', raw: 'm_pia->cb2_handler().set(FUNC(venture_sound_device::pia_cb2_w))', ownerTag: 'pia', sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 590, sourceColumn: 2, sourceEndLine: 590, targetClass: 'venture_sound_device', targetMethod: 'pia_cb2_w'};
MERGE (n:KG {id: 'handler:venture_sound_device.pia_cb2_w'}) SET n:Handler SET n += {method: 'pia_cb2_w', ownerClass: 'venture_sound_device', sourceFile: 'src/mame/shared/exidysound.h', sourceLine: 139, sourceColumn: 1, sourceEndLine: 139, sourceParameters: 'int state', sourceBody: 'm_cb2_callback(state);'};
MERGE (n:KG {id: 'device:venture_sound_device.device_add_mconfig/audiocpu'}) SET n:Device SET n += {type: 'M6502', tag: 'audiocpu', clock: 894886.25, config: ['m6502_device &audiocpu(M6502(config, "audiocpu", 3.579545_MHz_XTAL / 4))', 'audiocpu.set_addrmap(AS_PROGRAM, &venture_sound_device::venture_audio_map)'], sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 584, sourceColumn: 2, sourceEndLine: 584};
MERGE (n:KG {id: 'handler:exidy_state.intsource_coins_r'}) SET n:Handler SET n += {method: 'intsource_coins_r', ownerClass: 'exidy_state', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 409, sourceColumn: 1, sourceEndLine: 414, sourceParameters: '', sourceBody: 'uint8_t const dsw = m_dsw->read();
	uint8_t const in0 = m_in0->read();
	return (BIT(~in0, 7) << 1) | BIT(dsw, 0);', inputMembers: ['m_dsw=DSW', 'm_in0=IN0']};
MERGE (n:KG {id: 'inputs:venture'}) SET n:InputPorts SET n += {name: 'venture', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 839, sourceColumn: 8, sourceEndLine: 839};
MERGE (n:KG {id: 'inputs:venture/DSW'}) SET n:Port SET n += {tag: 'DSW', modify: false};
MERGE (n:KG {id: 'inputs:venture/DSW/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_COIN2', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(exidy_state::coin_count_w), 1)']};
MERGE (n:KG {id: 'inputs:venture/DSW/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 6, name: 'Bonus Life', defaultValue: 0, location: 'SW1:2,3', settings: ['0=20000', '2=30000', '4=40000', '6=50000']};
MERGE (n:KG {id: 'inputs:venture/DSW/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 152, name: 'Coinage', defaultValue: 144, location: 'SW1:4,5,8', settings: ['136=2C 1C', '128=1C 1C', '144=1C 1C', '152=1C 2C', '0=Pence: A 2C/1C B 1C/3C', '24=Pence: A 1C/1C B 1C/6C']};
MERGE (n:KG {id: 'inputs:venture/DSW/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 96, name: 'Lives', defaultValue: 32, location: 'SW1:6,7', settings: ['0=2', '32=3', '64=4', '96=5']};
MERGE (n:KG {id: 'inputs:venture/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:venture/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:venture/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:venture/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:venture/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:venture/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:venture/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:venture/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:venture/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN1', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(exidy_state::coin_count_w), 0)']};
MERGE (n:KG {id: 'inputs:venture/INTSOURCE'}) SET n:Port SET n += {tag: 'INTSOURCE', modify: false};
MERGE (n:KG {id: 'inputs:venture/INTSOURCE/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 31, activeLow: false, type: 'IPT_CUSTOM'};
MERGE (n:KG {id: 'inputs:venture/INTSOURCE/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 96, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(exidy_state::intsource_coins_r))']};
MERGE (n:KG {id: 'inputs:venture/INTSOURCE/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))']};
MERGE (n:KG {id: 'inputs:venture/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:venture/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 1, planeOffsets: [0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 128, 129, 130, 131, 132, 133, 134, 135], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfx_exidy'}) SET n:GfxDecode SET n += {name: 'gfx_exidy', sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1094, sourceColumn: 8, sourceEndLine: 1094};
MERGE (n:KG {id: 'gfxdecode:gfx_exidy/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'spritelayout', colorBase: 0, colorCount: 2, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:venture'}), (b:KG {id: 'file:src/mame/exidy/exidy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2602, sourceColumn: 1, sourceEndLine: 2602};
MATCH (a:KG {id: 'game:venture'}), (b:KG {id: 'machine:exidy_state.venture'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:venture'}), (b:KG {id: 'inputs:venture'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:venture'}), (b:KG {id: 'romset:venture'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/exidy/exidy.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/exidy/exidy.cpp'}), (b:KG {id: 'file:exidysound.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/exidy/exidy.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/exidy/exidy.cpp'}), (b:KG {id: 'file:machine/6821pia.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/exidy/exidy.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/exidy/exidy.cpp'}), (b:KG {id: 'file:sound/samples.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/exidy/exidy.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/exidy/exidy.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/exidy/exidy.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:exidy_state.venture'}), (b:KG {id: 'file:src/mame/exidy/exidy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1598, sourceColumn: 1, sourceEndLine: 1622};
MATCH (a:KG {id: 'machine:exidy_state.venture'}), (b:KG {id: 'handler:exidy_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:exidy_state.venture'}), (b:KG {id: 'machine:exidy_state.base'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:exidy_state.venture'}), (b:KG {id: 'map:exidy_state.venture_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:exidy_state.venture'}), (b:KG {id: 'device:exidy_state.venture/pia'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:exidy_state.venture'}), (b:KG {id: 'device:exidy_state.venture/soundbd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:venture'}), (b:KG {id: 'file:src/mame/exidy/exidy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 839, sourceColumn: 8, sourceEndLine: 839};
MATCH (a:KG {id: 'inputs:venture'}), (b:KG {id: 'inputs:venture/DSW'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:venture'}), (b:KG {id: 'inputs:venture/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:venture'}), (b:KG {id: 'inputs:venture/INTSOURCE'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:venture'}), (b:KG {id: 'inputs:venture/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:venture'}), (b:KG {id: 'file:src/mame/exidy/exidy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 2226, sourceColumn: 1, sourceEndLine: 2226};
MATCH (a:KG {id: 'romset:venture'}), (b:KG {id: 'region:venture/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:venture'}), (b:KG {id: 'region:venture/soundbd:audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:venture'}), (b:KG {id: 'region:venture/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:venture'}), (b:KG {id: 'region:venture/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:exidy_state.base'}), (b:KG {id: 'file:src/mame/exidy/exidy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1506, sourceColumn: 1, sourceEndLine: 1521};
MATCH (a:KG {id: 'machine:exidy_state.base'}), (b:KG {id: 'handler:exidy_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:exidy_state.base'}), (b:KG {id: 'device:exidy_state.base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:exidy_state.base'}), (b:KG {id: 'device:exidy_state.base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:exidy_state.base'}), (b:KG {id: 'gfxdecode:gfx_exidy'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:exidy_state.base'}), (b:KG {id: 'device:exidy_state.base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:exidy_state.base'}), (b:KG {id: 'device:exidy_state.base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:exidy_state.venture_map'}), (b:KG {id: 'file:src/mame/exidy/exidy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 571, sourceColumn: 1, sourceEndLine: 577};
MATCH (a:KG {id: 'map:exidy_state.venture_map'}), (b:KG {id: 'map:exidy_state.exidy_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:exidy_state.venture_map'}), (b:KG {id: 'map:exidy_state.venture_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.venture_map'}), (b:KG {id: 'map:exidy_state.venture_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.venture_map'}), (b:KG {id: 'map:exidy_state.venture_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/pia'}), (b:KG {id: 'device:exidy_state.venture/pia/callback:pia:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/pia'}), (b:KG {id: 'device:exidy_state.venture/pia/callback:pia:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/pia'}), (b:KG {id: 'device:exidy_state.venture/pia/callback:pia:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/pia'}), (b:KG {id: 'device:exidy_state.venture/pia/callback:pia:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd'}), (b:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd'}), (b:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd'}), (b:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd'}), (b:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd'}), (b:KG {id: 'machine:venture_sound_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:venture/DSW'}), (b:KG {id: 'inputs:venture/DSW/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/DSW'}), (b:KG {id: 'inputs:venture/DSW/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/DSW'}), (b:KG {id: 'inputs:venture/DSW/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/DSW'}), (b:KG {id: 'inputs:venture/DSW/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/IN0'}), (b:KG {id: 'inputs:venture/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/IN0'}), (b:KG {id: 'inputs:venture/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/IN0'}), (b:KG {id: 'inputs:venture/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/IN0'}), (b:KG {id: 'inputs:venture/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/IN0'}), (b:KG {id: 'inputs:venture/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/IN0'}), (b:KG {id: 'inputs:venture/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/IN0'}), (b:KG {id: 'inputs:venture/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/IN0'}), (b:KG {id: 'inputs:venture/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/INTSOURCE'}), (b:KG {id: 'inputs:venture/INTSOURCE/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/INTSOURCE'}), (b:KG {id: 'inputs:venture/INTSOURCE/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/INTSOURCE'}), (b:KG {id: 'inputs:venture/INTSOURCE/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:venture/IN2'}), (b:KG {id: 'inputs:venture/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:venture/maincpu'}), (b:KG {id: 'rom:venture/maincpu/13a-cpu'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/maincpu'}), (b:KG {id: 'rom:venture/maincpu/12a-cpu'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/maincpu'}), (b:KG {id: 'rom:venture/maincpu/11a-cpu'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/maincpu'}), (b:KG {id: 'rom:venture/maincpu/10a-cpu'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/maincpu'}), (b:KG {id: 'rom:venture/maincpu/9a-cpu'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/maincpu'}), (b:KG {id: 'rom:venture/maincpu/8a-cpu'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/maincpu'}), (b:KG {id: 'rom:venture/maincpu/7a-cpu'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/maincpu'}), (b:KG {id: 'rom:venture/maincpu/6a-cpu'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/soundbd:audiocpu'}), (b:KG {id: 'rom:venture/soundbd:audiocpu/vea_3a-3.3a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/soundbd:audiocpu'}), (b:KG {id: 'rom:venture/soundbd:audiocpu/vea_4a-3.4a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/soundbd:audiocpu'}), (b:KG {id: 'rom:venture/soundbd:audiocpu/vea_5a-3.5a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/soundbd:audiocpu'}), (b:KG {id: 'rom:venture/soundbd:audiocpu/vea_6a-3.6a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/soundbd:audiocpu'}), (b:KG {id: 'rom:venture/soundbd:audiocpu/vea_7a-3.7a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/gfx1'}), (b:KG {id: 'rom:venture/gfx1/vel_11d-2.11d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/proms'}), (b:KG {id: 'rom:venture/proms/hrl14h-1.h14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/proms'}), (b:KG {id: 'rom:venture/proms/vel5c-1.c5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:venture/proms'}), (b:KG {id: 'rom:venture/proms/hrl6d-1.d6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:exidy_state.base/maincpu'}), (b:KG {id: 'device:exidy_state.base/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_exidy'}), (b:KG {id: 'file:src/mame/exidy/exidy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 1094, sourceColumn: 8, sourceEndLine: 1094};
MATCH (a:KG {id: 'gfxdecode:gfx_exidy'}), (b:KG {id: 'gfxdecode:gfx_exidy/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:exidy_state.base/screen'}), (b:KG {id: 'device:exidy_state.base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'file:src/mame/exidy/exidy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/exidy/exidy.cpp', sourceLine: 490, sourceColumn: 1, sourceEndLine: 505};
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map'}), (b:KG {id: 'map:exidy_state.exidy_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:exidy_state.venture_map/range1'}), (b:KG {id: 'handler:pia6821_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'map:exidy_state.venture_map/range1'}), (b:KG {id: 'handler:pia6821_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'device:exidy_state.venture/pia/callback:pia:0'}), (b:KG {id: 'handler:venture_sound_device.pb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/pia/callback:pia:1'}), (b:KG {id: 'handler:venture_sound_device.pa_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/pia/callback:pia:2'}), (b:KG {id: 'handler:venture_sound_device.cb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/pia/callback:pia:3'}), (b:KG {id: 'handler:venture_sound_device.ca_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:0'}), (b:KG {id: 'handler:pia6821_device.portb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:0'}), (b:KG {id: 'device:exidy_state.venture/pia'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:1'}), (b:KG {id: 'handler:pia6821_device.porta_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:1'}), (b:KG {id: 'device:exidy_state.venture/pia'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:2'}), (b:KG {id: 'handler:pia6821_device.cb1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:2'}), (b:KG {id: 'device:exidy_state.venture/pia'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:3'}), (b:KG {id: 'handler:pia6821_device.ca1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_state.venture/soundbd/callback:soundbd:3'}), (b:KG {id: 'device:exidy_state.venture/pia'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/exidysound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 580, sourceColumn: 1, sourceEndLine: 591};
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig'}), (b:KG {id: 'machine:exidy_sh8253_sound_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig'}), (b:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig'}), (b:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig'}), (b:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig'}), (b:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig'}), (b:KG {id: 'device:venture_sound_device.device_add_mconfig/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:venture/INTSOURCE/f1'}), (b:KG {id: 'handler:exidy_state.intsource_coins_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_state.base/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:exidy_state.exidy_vblank_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_exidy/e0'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:exidy_state.base/screen/callback:screen:0'}), (b:KG {id: 'handler:exidy_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:exidy_state.exidy_map/range10'}), (b:KG {id: 'handler:exidy_state.exidy_interrupt_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/exidysound.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/exidysound.cpp'}), (b:KG {id: 'file:exidysound.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/exidysound.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/exidysound.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/exidysound.cpp'}), (b:KG {id: 'file:machine/input_merger.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/exidysound.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/exidysound.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/exidysound.cpp'}), (b:KG {id: 'file:logmacro.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:exidy_sh8253_sound_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/exidysound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 182, sourceColumn: 1, sourceEndLine: 205};
MATCH (a:KG {id: 'machine:exidy_sh8253_sound_device.device_add_mconfig'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/riot'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:exidy_sh8253_sound_device.device_add_mconfig'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pia'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:exidy_sh8253_sound_device.device_add_mconfig'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:exidy_sh8253_sound_device.device_add_mconfig'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/audioirq'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:exidy_sh8253_sound_device.device_add_mconfig'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:0'}), (b:KG {id: 'handler:venture_sound_device.pia_pa_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:1'}), (b:KG {id: 'handler:venture_sound_device.pia_pb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:2'}), (b:KG {id: 'handler:venture_sound_device.pia_ca2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:venture_sound_device.device_add_mconfig/callback:pia:3'}), (b:KG {id: 'handler:venture_sound_device.pia_cb2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:venture_sound_device.device_add_mconfig/audiocpu'}), (b:KG {id: 'map:venture_sound_device.venture_audio_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'handler:exidy_state.exidy_vblank_interrupt'}), (b:KG {id: 'handler:exidy_state.latch_condition'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/exidy/exidy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:exidy_state.screen_update'}), (b:KG {id: 'handler:exidy_state.set_colors'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:exidy_state.screen_update'}), (b:KG {id: 'handler:exidy_state.draw_background'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:exidy_state.screen_update'}), (b:KG {id: 'handler:exidy_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:exidy_state.screen_update'}), (b:KG {id: 'handler:exidy_state.check_collision'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/riot'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/riot/callback:riot:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pia'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pia/callback:pia:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit/callback:pit:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit/callback:pit:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit/callback:pit:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/audioirq'}), (b:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/audioirq/callback:audioirq:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map'}), (b:KG {id: 'file:src/mame/shared/exidysound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/exidysound.cpp', sourceLine: 562, sourceColumn: 1, sourceEndLine: 573};
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map'}), (b:KG {id: 'map:venture_sound_device.venture_audio_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map'}), (b:KG {id: 'map:venture_sound_device.venture_audio_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map'}), (b:KG {id: 'map:venture_sound_device.venture_audio_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map'}), (b:KG {id: 'map:venture_sound_device.venture_audio_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map'}), (b:KG {id: 'map:venture_sound_device.venture_audio_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map'}), (b:KG {id: 'map:venture_sound_device.venture_audio_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map'}), (b:KG {id: 'map:venture_sound_device.venture_audio_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map'}), (b:KG {id: 'map:venture_sound_device.venture_audio_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'handler:exidy_state.set_colors'}), (b:KG {id: 'handler:exidy_state.set_1_color'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:exidy_state.draw_background'}), (b:KG {id: 'handler:exidy_state.base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:exidy_state.draw_sprites'}), (b:KG {id: 'handler:exidy_state.sprite_1_enabled'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:exidy_state.check_collision'}), (b:KG {id: 'handler:exidy_state.sprite_1_enabled'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/riot/callback:riot:0'}), (b:KG {id: 'handler:input_merger_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pia/callback:pia:0'}), (b:KG {id: 'handler:input_merger_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit/callback:pit:0'}), (b:KG {id: 'handler:exidy_sh8253_sound_device.pit_out_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit/callback:pit:1'}), (b:KG {id: 'handler:exidy_sh8253_sound_device.pit_out_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:exidy_sh8253_sound_device.device_add_mconfig/pit/callback:pit:2'}), (b:KG {id: 'handler:exidy_sh8253_sound_device.pit_out_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map/range2'}), (b:KG {id: 'handler:pia6821_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map/range2'}), (b:KG {id: 'handler:pia6821_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map/range3'}), (b:KG {id: 'handler:venture_sound_device.sh8253_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map/range4'}), (b:KG {id: 'handler:venture_sound_device.filter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map/range5'}), (b:KG {id: 'handler:venture_sound_device.sh6840_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map/range5'}), (b:KG {id: 'handler:venture_sound_device.sh6840_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:venture_sound_device.venture_audio_map/range6'}), (b:KG {id: 'handler:venture_sound_device.sfxctrl_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:exidy_state.base'}), (b:KG {id: 'handler:exidy_state.exidy_vblank_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:exidy_state.base'}), (b:KG {id: 'handler:exidy_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
