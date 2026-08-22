// mamekit knowledge graph — driver src/mame/nintendo/mario.cpp
// generated 2026-08-22T05:52:30.591Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/nintendo/mario.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/nintendo/mario.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:cpu/mcs48/mcs48.h'}) SET n:SourceFile SET n += {path: 'cpu/mcs48/mcs48.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/z80dma.h'}) SET n:SourceFile SET n += {path: 'machine/z80dma.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:machine/netlist.h'}) SET n:SourceFile SET n += {path: 'machine/netlist.h', external: true};
MERGE (n:KG {id: 'file:netlist/devices/net_lib.h'}) SET n:SourceFile SET n += {path: 'netlist/devices/net_lib.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'file:nl_mario.h'}) SET n:SourceFile SET n += {path: 'nl_mario.h', external: true};
MERGE (n:KG {id: 'game:mario'}) SET n:Game SET n += {name: 'mario', year: '1983', company: 'Nintendo of America', fullname: 'Mario Bros. (US, revision E)', monitor: 'ROT0', cls: 'mario_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 1120, sourceColumn: 1, sourceEndLine: 1120};
MERGE (n:KG {id: 'romset:mario'}) SET n:RomSet SET n += {name: 'mario', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 925, sourceColumn: 1, sourceEndLine: 925};
MERGE (n:KG {id: 'region:mario/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 926, sourceColumn: 2, sourceEndLine: 926};
MERGE (n:KG {id: 'rom:mario/maincpu/tma1-c-7f_e-1.7f'}) SET n:Rom SET n += {file: 'tma1-c-7f_e-1.7f', offset: 0, size: 8192, crc: 'c0c6e014', sha1: '36a04f9ca1c2a583477cb8a6f2ef94e044e08296', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 927, sourceColumn: 2, sourceEndLine: 927};
MERGE (n:KG {id: 'rom:mario/maincpu/tma1-c-7e_e-3.7e'}) SET n:Rom SET n += {file: 'tma1-c-7e_e-3.7e', offset: 8192, size: 8192, crc: 'b09ab857', sha1: '35b91cd1c4c3dd2d543a1ea8ff7b951715727792', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 928, sourceColumn: 2, sourceEndLine: 928};
MERGE (n:KG {id: 'rom:mario/maincpu/tma1-c-7d_e-1.7d'}) SET n:Rom SET n += {file: 'tma1-c-7d_e-1.7d', offset: 16384, size: 8192, crc: 'dcceb6c1', sha1: 'b19804e69ce2c98cf276c6055c3a250316b96b45', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 929, sourceColumn: 2, sourceEndLine: 929};
MERGE (n:KG {id: 'rom:mario/maincpu/tma1-c-7c_e-3.7c'}) SET n:Rom SET n += {file: 'tma1-c-7c_e-3.7c', offset: 61440, size: 4096, crc: '0d31bd1c', sha1: 'a2e238470ba2ea3c81225fec687f61f047c68c59', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 930, sourceColumn: 2, sourceEndLine: 930};
MERGE (n:KG {id: 'region:mario/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 2048, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 932, sourceColumn: 2, sourceEndLine: 932};
MERGE (n:KG {id: 'rom:mario/audiocpu/m58715-051p.5l'}) SET n:Rom SET n += {file: 'm58715-051p.5l', offset: 0, size: 2048, crc: '', sha1: '', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 933, sourceColumn: 2, sourceEndLine: 933, status: 'nodump'};
MERGE (n:KG {id: 'region:mario/soundrom'}) SET n:RomRegion SET n += {tag: 'soundrom', size: 4096, flags: '0', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 935, sourceColumn: 2, sourceEndLine: 935};
MERGE (n:KG {id: 'rom:mario/soundrom/tma1-c-6k_e.6k'}) SET n:Rom SET n += {file: 'tma1-c-6k_e.6k', offset: 0, size: 4096, crc: '06b9ff85', sha1: '111a29bcb9cda0d935675fa26eca6b099a88427f', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 936, sourceColumn: 2, sourceEndLine: 936};
MERGE (n:KG {id: 'region:mario/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 8192, flags: '0', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 938, sourceColumn: 2, sourceEndLine: 938};
MERGE (n:KG {id: 'rom:mario/gfx1/tma1-v-3f.3f'}) SET n:Rom SET n += {file: 'tma1-v-3f.3f', offset: 0, size: 4096, crc: '28b0c42c', sha1: '46749568aff88a28c3b6a1ac423abd1b90742a4d', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 939, sourceColumn: 2, sourceEndLine: 939};
MERGE (n:KG {id: 'rom:mario/gfx1/tma1-v-3j.3j'}) SET n:Rom SET n += {file: 'tma1-v-3j.3j', offset: 4096, size: 4096, crc: '0c8cc04d', sha1: '15fae47d701dc1ef15c943cee6aa991776ecffdf', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 940, sourceColumn: 2, sourceEndLine: 940};
MERGE (n:KG {id: 'region:mario/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 24576, flags: '0', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 942, sourceColumn: 2, sourceEndLine: 942};
MERGE (n:KG {id: 'rom:mario/gfx2/tma1-v.7m.7m'}) SET n:Rom SET n += {file: 'tma1-v.7m.7m', offset: 0, size: 4096, crc: 'd01c0e2c', sha1: 'cd6cc9d69c36db15543601f5da2abf109cde43c9', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 943, sourceColumn: 2, sourceEndLine: 943};
MERGE (n:KG {id: 'rom:mario/gfx2/tma1-v-7n.7n'}) SET n:Rom SET n += {file: 'tma1-v-7n.7n', offset: 4096, size: 4096, crc: '4f3a1f47', sha1: '0747d693b9482f6dd28b0bc484fd1d3e29d35654', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 944, sourceColumn: 2, sourceEndLine: 944};
MERGE (n:KG {id: 'rom:mario/gfx2/tma1-v-7p.7p'}) SET n:Rom SET n += {file: 'tma1-v-7p.7p', offset: 8192, size: 4096, crc: '56be6ccd', sha1: '15a6e16c189d45f72761ebcbe9db5001bdecd659', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 945, sourceColumn: 2, sourceEndLine: 945};
MERGE (n:KG {id: 'rom:mario/gfx2/tma1-v.7s.7s'}) SET n:Rom SET n += {file: 'tma1-v.7s.7s', offset: 12288, size: 4096, crc: 'ff856e6f', sha1: '2bc9ff18bb1842e8de2bc61ac828f1b175290bed', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 946, sourceColumn: 2, sourceEndLine: 946};
MERGE (n:KG {id: 'rom:mario/gfx2/tma1-v-7t.7t'}) SET n:Rom SET n += {file: 'tma1-v-7t.7t', offset: 16384, size: 4096, crc: '641f0008', sha1: '589fe108c7c11278fd897f2ded8f0498bc149cfd', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 947, sourceColumn: 2, sourceEndLine: 947};
MERGE (n:KG {id: 'rom:mario/gfx2/tma1-v.7u.7u'}) SET n:Rom SET n += {file: 'tma1-v.7u.7u', offset: 20480, size: 4096, crc: 'd2dbeb75', sha1: '676cf3e15252cd0d9e926ca15c3aa0caa39be269', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 948, sourceColumn: 2, sourceEndLine: 948};
MERGE (n:KG {id: 'region:mario/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 512, flags: '0', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 950, sourceColumn: 2, sourceEndLine: 950};
MERGE (n:KG {id: 'rom:mario/proms/tma1-c-4p.4p'}) SET n:Rom SET n += {file: 'tma1-c-4p.4p', offset: 0, size: 512, crc: 'afc9bd41', sha1: '90b739c4c7f24a88b6ac5ca29b06c032906a2801', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 951, sourceColumn: 2, sourceEndLine: 951};
MERGE (n:KG {id: 'region:mario/decoder_prom'}) SET n:RomRegion SET n += {tag: 'decoder_prom', size: 32, flags: '0', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 953, sourceColumn: 2, sourceEndLine: 953};
MERGE (n:KG {id: 'rom:mario/decoder_prom/tma1-c-5b.5b'}) SET n:Rom SET n += {file: 'tma1-c-5b.5b', offset: 0, size: 32, crc: '58d86098', sha1: 'd654995004b9052b12d3b682a2b39530e70030fc', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 954, sourceColumn: 2, sourceEndLine: 954};
MERGE (n:KG {id: 'map:mario_state.base_map'}) SET n:AddressMap SET n += {cls: 'mario_state', name: 'base_map', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 636, sourceColumn: 1, sourceEndLine: 650};
MERGE (n:KG {id: 'map:mario_state.base_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 24575, raw: 'map(0x0000, 0x5fff).rom()', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 638, sourceColumn: 2, sourceEndLine: 638, rom: true};
MERGE (n:KG {id: 'map:mario_state.base_map/range1'}) SET n:AddressRange SET n += {start: 24576, end: 26623, raw: 'map(0x6000, 0x67ff).ram()', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 639, sourceColumn: 2, sourceEndLine: 639, ram: true};
MERGE (n:KG {id: 'map:mario_state.base_map/range2'}) SET n:AddressRange SET n += {start: 26624, end: 28671, raw: 'map(0x6800, 0x6fff).ram().share("nvram")', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 640, sourceColumn: 2, sourceEndLine: 640, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:mario_state.base_map/range3'}) SET n:AddressRange SET n += {start: 28672, end: 29695, raw: 'map(0x7000, 0x73ff).ram().share("spriteram")', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 641, sourceColumn: 2, sourceEndLine: 641, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:mario_state.base_map/range4'}) SET n:AddressRange SET n += {start: 29696, end: 30719, raw: 'map(0x7400, 0x77ff).ram().w(FUNC(mario_state::videoram_w)).share("videoram")', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 642, sourceColumn: 2, sourceEndLine: 642, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:mario_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 502, sourceColumn: 1, sourceEndLine: 506, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:mario_state.base_map/range5'}) SET n:AddressRange SET n += {start: 31744, end: 31744, raw: 'map(0x7c00, 0x7c00).portr("IN0")', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 643, sourceColumn: 2, sourceEndLine: 643, portRead: 'IN0'};
MERGE (n:KG {id: 'map:mario_state.base_map/range6'}) SET n:AddressRange SET n += {start: 31872, end: 31872, raw: 'map(0x7c80, 0x7c80).portr("IN1")', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 644, sourceColumn: 2, sourceEndLine: 644, portRead: 'IN1'};
MERGE (n:KG {id: 'map:mario_state.base_map/range7'}) SET n:AddressRange SET n += {start: 32000, end: 32000, raw: 'map(0x7d00, 0x7d00).w(FUNC(mario_state::scroll_w))', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 645, sourceColumn: 2, sourceEndLine: 645};
MERGE (n:KG {id: 'handler:mario_state.scroll_w'}) SET n:Handler SET n += {method: 'scroll_w', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 520, sourceColumn: 1, sourceEndLine: 523, sourceParameters: 'uint8_t data', sourceBody: 'm_bg_tilemap->set_scrolly(0, data + 17);'};
MERGE (n:KG {id: 'map:mario_state.base_map/range8'}) SET n:AddressRange SET n += {start: 32256, end: 32256, raw: 'map(0x7e00, 0x7e00).w(m_soundlatch[0], FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 646, sourceColumn: 2, sourceEndLine: 646};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 878, sourceColumn: 2, sourceEndLine: 878};
MERGE (n:KG {id: 'map:mario_state.base_map/range9'}) SET n:AddressRange SET n += {start: 32384, end: 32391, raw: 'map(0x7e80, 0x7e87).w("mainlatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 647, sourceColumn: 2, sourceEndLine: 647};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 647, sourceColumn: 2, sourceEndLine: 647};
MERGE (n:KG {id: 'map:mario_state.base_map/range10'}) SET n:AddressRange SET n += {start: 32640, end: 32640, raw: 'map(0x7f80, 0x7f80).portr("DSW")', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 648, sourceColumn: 2, sourceEndLine: 648, portRead: 'DSW'};
MERGE (n:KG {id: 'map:mario_state.base_map/range11'}) SET n:AddressRange SET n += {start: 61440, end: 65535, raw: 'map(0xf000, 0xffff).rom()', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 649, sourceColumn: 2, sourceEndLine: 649, rom: true};
MERGE (n:KG {id: 'map:mario_state.mario_map'}) SET n:AddressMap SET n += {cls: 'mario_state', name: 'mario_map', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 652, sourceColumn: 1, sourceEndLine: 658, calls: ['base_map']};
MERGE (n:KG {id: 'map:mario_state.mario_map/range0'}) SET n:AddressRange SET n += {start: 31744, end: 31744, raw: 'map(0x7c00, 0x7c00).w(FUNC(mario_state::walk_w<0>))', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 655, sourceColumn: 2, sourceEndLine: 655};
MERGE (n:KG {id: 'handler:mario_state.walk_w_0'}) SET n:Handler SET n += {method: 'walk_w_0', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 343, sourceColumn: 1, sourceEndLine: 349, sourceConstants: ['N=0'], sourceParameters: 'uint8_t data', sourceBody: 'm_audio_snd[N]->write(0);

	// WR is asserted for 3 cycles
	m_walk_timer[N]->adjust(attotime::from_ticks(3, m_maincpu->clock()), N);'};
MERGE (n:KG {id: 'map:mario_state.mario_map/range1'}) SET n:AddressRange SET n += {start: 31872, end: 31872, raw: 'map(0x7c80, 0x7c80).w(FUNC(mario_state::walk_w<1>))', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 656, sourceColumn: 2, sourceEndLine: 656};
MERGE (n:KG {id: 'handler:mario_state.walk_w_1'}) SET n:Handler SET n += {method: 'walk_w_1', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 343, sourceColumn: 1, sourceEndLine: 349, sourceConstants: ['N=1'], sourceParameters: 'uint8_t data', sourceBody: 'm_audio_snd[N]->write(0);

	// WR is asserted for 3 cycles
	m_walk_timer[N]->adjust(attotime::from_ticks(3, m_maincpu->clock()), N);'};
MERGE (n:KG {id: 'map:mario_state.mario_map/range2'}) SET n:AddressRange SET n += {start: 32512, end: 32519, raw: 'map(0x7f00, 0x7f07).w(FUNC(mario_state::samples_w))', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 657, sourceColumn: 2, sourceEndLine: 657};
MERGE (n:KG {id: 'handler:mario_state.samples_w'}) SET n:Handler SET n += {method: 'samples_w', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 351, sourceColumn: 1, sourceEndLine: 383, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'data &= 1;

	switch (offset)
	{
		// death
		case 0:
			m_audiocpu->set_input_line(0, data ? ASSERT_LINE : CLEAR_LINE);
			break;

		// get coin, ice
		case 1: case 2:
		{
			const uint8_t mask = 1 << (offset - 1);
			m_soundlatch[3]->write((m_soundlatch[3]->read() & ~mask) | (data ? mask : 0));
			break;
		}

		// crab, turtle, fly, coin
		case 3: case 4: case 5: case 6:
		{
			const uint8_t mask = 1 << (offset - 3);
			m_soundlatch[1]->write((m_soundlatch[1]->read() & ~mask) | (data ? mask : 0));
			break;
		}

		// skid
		case 7:
			m_audio_snd[2]->write(data ^ 1);
			break;
	}'};
MERGE (n:KG {id: 'map:mario_state.mario_io_map'}) SET n:AddressMap SET n += {cls: 'mario_state', name: 'mario_io_map', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 666, sourceColumn: 1, sourceEndLine: 670, globalMask: 255};
MERGE (n:KG {id: 'map:mario_state.mario_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).rw(m_z80dma, FUNC(z80dma_device::read), FUNC(z80dma_device::write))', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 669, sourceColumn: 2, sourceEndLine: 669};
MERGE (n:KG {id: 'handler:z80dma_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'z80dma_device', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 669, sourceColumn: 2, sourceEndLine: 669};
MERGE (n:KG {id: 'handler:z80dma_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'z80dma_device', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 669, sourceColumn: 2, sourceEndLine: 669};
MERGE (n:KG {id: 'map:mario_state.mario_sound_map'}) SET n:AddressMap SET n += {cls: 'mario_state', name: 'mario_sound_map', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 674, sourceColumn: 1, sourceEndLine: 677};
MERGE (n:KG {id: 'map:mario_state.mario_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).rom().region(m_soundrom, 0)', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 676, sourceColumn: 2, sourceEndLine: 676, rom: true, region: 'soundrom', regionOffset: 0};
MERGE (n:KG {id: 'map:mario_state.mario_sound_io_map'}) SET n:AddressMap SET n += {cls: 'mario_state', name: 'mario_sound_io_map', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 679, sourceColumn: 1, sourceEndLine: 682};
MERGE (n:KG {id: 'map:mario_state.mario_sound_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 255, raw: 'map(0x00, 0xff).r(FUNC(mario_state::tune_r)).w(FUNC(mario_state::dac_w))', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 681, sourceColumn: 2, sourceEndLine: 681};
MERGE (n:KG {id: 'handler:mario_state.tune_r'}) SET n:Handler SET n += {method: 'tune_r', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 323, sourceColumn: 1, sourceEndLine: 340, sourceParameters: 'offs_t offset', sourceBody: 'if (!machine().side_effects_disabled())
	{
		// retry_access() forces the MCU to catch up before Z80 does the read
		if (!m_z80_sync)
			m_maincpu->retry_access();

		m_z80_sync = !m_z80_sync;
	}

	const uint8_t p2 = m_soundlatch[2]->read();

	if (BIT(p2, 7))
		return m_soundlatch[0]->read();
	else
		return m_soundrom[(p2 & 0x0f) << 8 | offset];'};
MERGE (n:KG {id: 'handler:mario_state.dac_w'}) SET n:Handler SET n += {method: 'dac_w', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 172, sourceColumn: 31, sourceEndLine: 173, sourceParameters: 'uint8_t data', sourceBody: 'm_audio_dac->write(data);'};
MERGE (n:KG {id: 'machine:mario_state.mario_base'}) SET n:MachineConfig SET n += {cls: 'mario_state', name: 'mario_base', calls: [], resetHandlers: ['mario_state.machine_reset'], startHandlers: ['mario_state.video_start'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 831, sourceColumn: 1, sourceEndLine: 866};
MERGE (n:KG {id: 'handler:mario_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 265, sourceColumn: 1, sourceEndLine: 269, sourceParameters: '', sourceBody: 'm_nmi_mask = false;
	m_z80_sync = false;'};
MERGE (n:KG {id: 'handler:mario_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 411, sourceColumn: 1, sourceEndLine: 421, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(
			*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(mario_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS,
			8, 8, 32, 32);

	m_gfxdecode->gfx(0)->set_granularity(8);

	save_item(NAME(m_gfx_bank));
	save_item(NAME(m_palette_bank));'};
MERGE (n:KG {id: 'handler:mario_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 403, sourceColumn: 1, sourceEndLine: 409, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_videoram[tile_index] + 256 * m_gfx_bank;
	int color = 8 + (m_videoram[tile_index] >> 5) + 16 * m_palette_bank;

	tileinfo.set(0, code, color, 0);'};
MERGE (n:KG {id: 'device:mario_state.mario_base/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 4000000, config: ['Z80(config, m_maincpu, 8_MHz_XTAL / 2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &mario_state::mario_map)', 'm_maincpu->set_addrmap(AS_IO, &mario_state::mario_io_map)', 'm_maincpu->busack_cb().set(m_z80dma, FUNC(z80dma_device::bai_w))'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 834, sourceColumn: 2, sourceEndLine: 834};
MERGE (n:KG {id: 'device:mario_state.mario_base/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'busack_cb', operation: 'set', raw: 'm_maincpu->busack_cb().set(m_z80dma, FUNC(z80dma_device::bai_w))', ownerTag: 'maincpu', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 837, sourceColumn: 2, sourceEndLine: 837, targetClass: 'z80dma_device', targetMethod: 'bai_w', targetTag: 'z80dma'};
MERGE (n:KG {id: 'handler:z80dma_device.bai_w'}) SET n:Handler SET n += {method: 'bai_w', ownerClass: 'z80dma_device', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 837, sourceColumn: 2, sourceEndLine: 837};
MERGE (n:KG {id: 'device:mario_state.mario_base/z80dma'}) SET n:Device SET n += {type: 'Z80DMA', tag: 'z80dma', clock: 4000000, config: ['Z80DMA(config, m_z80dma, 8_MHz_XTAL / 2)', 'm_z80dma->out_busreq_callback().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)', 'm_z80dma->in_mreq_callback().set(FUNC(mario_state::memory_read_byte))', 'm_z80dma->out_mreq_callback().set(FUNC(mario_state::memory_write_byte))'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 840, sourceColumn: 2, sourceEndLine: 840};
MERGE (n:KG {id: 'device:mario_state.mario_base/z80dma/callback:z80dma:0'}) SET n:Callback SET n += {signal: 'out_busreq_callback', operation: 'set_inputline', raw: 'm_z80dma->out_busreq_callback().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)', ownerTag: 'z80dma', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 841, sourceColumn: 2, sourceEndLine: 841, inputLine: 'Z80_INPUT_LINE_BUSREQ', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:mario_state.mario_base/z80dma/callback:z80dma:1'}) SET n:Callback SET n += {signal: 'in_mreq_callback', operation: 'set', raw: 'm_z80dma->in_mreq_callback().set(FUNC(mario_state::memory_read_byte))', ownerTag: 'z80dma', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 842, sourceColumn: 2, sourceEndLine: 842, targetClass: 'mario_state', targetMethod: 'memory_read_byte'};
MERGE (n:KG {id: 'handler:mario_state.memory_read_byte'}) SET n:Handler SET n += {method: 'memory_read_byte', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 594, sourceColumn: 1, sourceEndLine: 598, sourceParameters: 'offs_t offset', sourceBody: 'address_space& prog_space = m_maincpu->space(AS_PROGRAM);
	return prog_space.read_byte(offset);'};
MERGE (n:KG {id: 'device:mario_state.mario_base/z80dma/callback:z80dma:2'}) SET n:Callback SET n += {signal: 'out_mreq_callback', operation: 'set', raw: 'm_z80dma->out_mreq_callback().set(FUNC(mario_state::memory_write_byte))', ownerTag: 'z80dma', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 843, sourceColumn: 2, sourceEndLine: 843, targetClass: 'mario_state', targetMethod: 'memory_write_byte'};
MERGE (n:KG {id: 'handler:mario_state.memory_write_byte'}) SET n:Handler SET n += {method: 'memory_write_byte', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 600, sourceColumn: 1, sourceEndLine: 604, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'address_space& prog_space = m_maincpu->space(AS_PROGRAM);
	return prog_space.write_byte(offset, data);'};
MERGE (n:KG {id: 'device:mario_state.mario_base/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['ls259_device &mainlatch(LS259(config, "mainlatch"))', 'mainlatch.q_out_cb<0>().set(FUNC(mario_state::gfx_bank_w))', 'mainlatch.q_out_cb<1>().set_nop()', 'mainlatch.q_out_cb<2>().set(FUNC(mario_state::flip_screen_set))', 'mainlatch.q_out_cb<3>().set(FUNC(mario_state::palette_bank_w))', 'mainlatch.q_out_cb<4>().set(FUNC(mario_state::nmi_mask_w))', 'mainlatch.q_out_cb<5>().set("z80dma", FUNC(z80dma_device::rdy_w))', 'mainlatch.q_out_cb<6>().set(FUNC(mario_state::coin_counter_2_w))', 'mainlatch.q_out_cb<7>().set(FUNC(mario_state::coin_counter_1_w))'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 845, sourceColumn: 2, sourceEndLine: 845};
MERGE (n:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<0>().set(FUNC(mario_state::gfx_bank_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 846, sourceColumn: 2, sourceEndLine: 846, slot: '0', targetClass: 'mario_state', targetMethod: 'gfx_bank_w'};
MERGE (n:KG {id: 'handler:mario_state.gfx_bank_w'}) SET n:Handler SET n += {method: 'gfx_bank_w', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 508, sourceColumn: 1, sourceEndLine: 512, sourceParameters: 'int state', sourceBody: 'm_gfx_bank = state;
	machine().tilemap().mark_all_dirty();'};
MERGE (n:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'mainlatch.q_out_cb<1>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 847, sourceColumn: 2, sourceEndLine: 847, slot: '1'};
MERGE (n:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<2>().set(FUNC(mario_state::flip_screen_set))', ownerTag: 'mainlatch', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 848, sourceColumn: 2, sourceEndLine: 848, slot: '2', targetClass: 'mario_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:mario_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 848, sourceColumn: 2, sourceEndLine: 848};
MERGE (n:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<3>().set(FUNC(mario_state::palette_bank_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 849, sourceColumn: 2, sourceEndLine: 849, slot: '3', targetClass: 'mario_state', targetMethod: 'palette_bank_w'};
MERGE (n:KG {id: 'handler:mario_state.palette_bank_w'}) SET n:Handler SET n += {method: 'palette_bank_w', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 514, sourceColumn: 1, sourceEndLine: 518, sourceParameters: 'int state', sourceBody: 'm_palette_bank = state;
	machine().tilemap().mark_all_dirty();'};
MERGE (n:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<4>().set(FUNC(mario_state::nmi_mask_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 850, sourceColumn: 2, sourceEndLine: 850, slot: '4', targetClass: 'mario_state', targetMethod: 'nmi_mask_w'};
MERGE (n:KG {id: 'handler:mario_state.nmi_mask_w'}) SET n:Handler SET n += {method: 'nmi_mask_w', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 606, sourceColumn: 1, sourceEndLine: 611, sourceParameters: 'int state', sourceBody: 'm_nmi_mask = state;
	if (!state)
		m_maincpu->set_input_line(INPUT_LINE_NMI, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<5>().set("z80dma", FUNC(z80dma_device::rdy_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 851, sourceColumn: 2, sourceEndLine: 851, slot: '5', targetTag: 'z80dma', targetClass: 'z80dma_device', targetMethod: 'rdy_w'};
MERGE (n:KG {id: 'handler:z80dma_device.rdy_w'}) SET n:Handler SET n += {method: 'rdy_w', ownerClass: 'z80dma_device', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 851, sourceColumn: 2, sourceEndLine: 851};
MERGE (n:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:6'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<6>().set(FUNC(mario_state::coin_counter_2_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 852, sourceColumn: 2, sourceEndLine: 852, slot: '6', targetClass: 'mario_state', targetMethod: 'coin_counter_2_w'};
MERGE (n:KG {id: 'handler:mario_state.coin_counter_2_w'}) SET n:Handler SET n += {method: 'coin_counter_2_w', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 618, sourceColumn: 1, sourceEndLine: 621, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(1, state);'};
MERGE (n:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:7'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<7>().set(FUNC(mario_state::coin_counter_1_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 853, sourceColumn: 2, sourceEndLine: 853, slot: '7', targetClass: 'mario_state', targetMethod: 'coin_counter_1_w'};
MERGE (n:KG {id: 'handler:mario_state.coin_counter_1_w'}) SET n:Handler SET n += {method: 'coin_counter_1_w', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 613, sourceColumn: 1, sourceEndLine: 616, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, state);'};
MERGE (n:KG {id: 'device:mario_state.mario_base/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 855, sourceColumn: 2, sourceEndLine: 855, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'device:mario_state.mario_base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(24_MHz_XTAL / 4, 384, 0, 256, 264, 16, 240)', 'screen.set_screen_update(FUNC(mario_state::screen_update))', 'screen.set_palette(m_palette)', 'screen.screen_vblank().set(FUNC(mario_state::vblank_irq))'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 858, sourceColumn: 2, sourceEndLine: 858, configCalls: ['set_raw(6000000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 264, 16, 240]};
MERGE (n:KG {id: 'device:mario_state.mario_base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(mario_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 860, sourceColumn: 2, sourceEndLine: 860, targetClass: 'mario_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:mario_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 579, sourceColumn: 1, sourceEndLine: 585, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);

	return 0;'};
MERGE (n:KG {id: 'handler:mario_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 532, sourceColumn: 1, sourceEndLine: 577, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'const uint8_t flip = flip_screen() ? 0xff : 0;
	int offs = 0;

	while (offs != m_spriteram.bytes())
	{
		if (m_spriteram[offs])
		{
			// from schematics...
			int y = (m_spriteram[offs + 0] + (flip ? 0xf7 : 0xf9) + 1) & 0xff;
			int x = m_spriteram[offs + 3];
			// sprite will be drawn if (y + scanline) & 0xF0 = 0xF0
			y = 240 - y; // logical screen position

			y ^= flip; // physical screen location
			x ^= flip; // physical screen location

			int code = m_spriteram[offs + 2];
			int color = (m_spriteram[offs + 1] & 0x0f) + 16 * m_palette_bank;
			int flipx = (m_spriteram[offs + 1] & 0x80);
			int flipy = (m_spriteram[offs + 1] & 0x40);

			if (flip)
			{
				y -= 14;
				x -= 7;
				flipx = !flipx;
				flipy = !flipy;
			}
			else
			{
				y += 1;
				x -= 8;
			}

			m_gfxdecode->gfx(1)->transpen(bitmap, cliprect,
					code,
					color,
					flipx, flipy,
					x, y, 0);
		}

		offs += 4;
	}'};
MERGE (n:KG {id: 'device:mario_state.mario_base/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'screen.screen_vblank().set(FUNC(mario_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 862, sourceColumn: 2, sourceEndLine: 862, targetClass: 'mario_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:mario_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'mario_state', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 623, sourceColumn: 1, sourceEndLine: 627, sourceParameters: 'int state', sourceBody: 'if (state && m_nmi_mask)
		m_maincpu->set_input_line(INPUT_LINE_NMI, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:mario_state.mario_base/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_mario)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 864, sourceColumn: 2, sourceEndLine: 864, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:mario_state.mario_base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(mario_state::palette), 256)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 865, sourceColumn: 2, sourceEndLine: 865, clockExpr: 'FUNC(mario_state::palette)'};
MERGE (n:KG {id: 'machine:mario_state.mario'}) SET n:MachineConfig SET n += {cls: 'mario_state', name: 'mario', calls: ['mario_base'], resetHandlers: ['mario_state.machine_reset'], startHandlers: ['mario_state.video_start'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 868, sourceColumn: 1, sourceEndLine: 896};
MERGE (n:KG {id: 'device:mario_state.mario/audiocpu'}) SET n:Device SET n += {type: 'M58715', tag: 'audiocpu', clock: 11000000, config: ['m58715_device &audiocpu(M58715(config, m_audiocpu, 11_MHz_XTAL))', 'audiocpu.set_addrmap(AS_PROGRAM, &mario_state::mario_sound_map)', 'audiocpu.set_addrmap(AS_IO, &mario_state::mario_sound_io_map)', 'audiocpu.p1_in_cb().set(m_soundlatch[1], FUNC(generic_latch_8_device::read))', 'audiocpu.p2_in_cb().set(m_soundlatch[2], FUNC(generic_latch_8_device::read)).mask(0xef)', 'audiocpu.p2_out_cb().set(m_soundlatch[2], FUNC(generic_latch_8_device::write))', 'audiocpu.p2_out_cb().append_inputline(m_audiocpu, MCS48_INPUT_EA).bit(5).invert()', 'audiocpu.t0_in_cb().set(m_soundlatch[3], FUNC(generic_latch_8_device::read)).bit(0)', 'audiocpu.t1_in_cb().set(m_soundlatch[3], FUNC(generic_latch_8_device::read)).bit(1)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 873, sourceColumn: 2, sourceEndLine: 873};
MERGE (n:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:0'}) SET n:Callback SET n += {signal: 'p1_in_cb', operation: 'set', raw: 'audiocpu.p1_in_cb().set(m_soundlatch[1], FUNC(generic_latch_8_device::read))', ownerTag: 'audiocpu', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 876, sourceColumn: 2, sourceEndLine: 876, targetClass: 'generic_latch_8_device', targetMethod: 'read', targetTag: 'soundlatch1'};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 914, sourceColumn: 2, sourceEndLine: 914};
MERGE (n:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:1'}) SET n:Callback SET n += {signal: 'p2_in_cb', operation: 'set', raw: 'audiocpu.p2_in_cb().set(m_soundlatch[2], FUNC(generic_latch_8_device::read)).mask(0xef)', ownerTag: 'audiocpu', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 877, sourceColumn: 2, sourceEndLine: 877, transforms: ['mask(0xef)'], targetClass: 'generic_latch_8_device', targetMethod: 'read', targetTag: 'soundlatch2'};
MERGE (n:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:2'}) SET n:Callback SET n += {signal: 'p2_out_cb', operation: 'set', raw: 'audiocpu.p2_out_cb().set(m_soundlatch[2], FUNC(generic_latch_8_device::write))', ownerTag: 'audiocpu', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 878, sourceColumn: 2, sourceEndLine: 878, targetClass: 'generic_latch_8_device', targetMethod: 'write', targetTag: 'soundlatch2'};
MERGE (n:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:3'}) SET n:Callback SET n += {signal: 'p2_out_cb', operation: 'append_inputline', raw: 'audiocpu.p2_out_cb().append_inputline(m_audiocpu, MCS48_INPUT_EA).bit(5).invert()', ownerTag: 'audiocpu', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 879, sourceColumn: 2, sourceEndLine: 879, transforms: ['bit(5)', 'invert'], inputLine: 'MCS48_INPUT_EA', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:4'}) SET n:Callback SET n += {signal: 't0_in_cb', operation: 'set', raw: 'audiocpu.t0_in_cb().set(m_soundlatch[3], FUNC(generic_latch_8_device::read)).bit(0)', ownerTag: 'audiocpu', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 880, sourceColumn: 2, sourceEndLine: 880, transforms: ['bit(0)'], targetClass: 'generic_latch_8_device', targetMethod: 'read', targetTag: 'soundlatch3'};
MERGE (n:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:5'}) SET n:Callback SET n += {signal: 't1_in_cb', operation: 'set', raw: 'audiocpu.t1_in_cb().set(m_soundlatch[3], FUNC(generic_latch_8_device::read)).bit(1)', ownerTag: 'audiocpu', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 881, sourceColumn: 2, sourceEndLine: 881, transforms: ['bit(1)'], targetClass: 'generic_latch_8_device', targetMethod: 'read', targetTag: 'soundlatch3'};
MERGE (n:KG {id: 'device:mario_state.mario/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 883, sourceColumn: 2, sourceEndLine: 883};
MERGE (n:KG {id: 'device:mario_state.mario/snd_nl'}) SET n:Device SET n += {type: 'NETLIST_SOUND', tag: 'snd_nl', clock: 48000, config: ['NETLIST_SOUND(config, "snd_nl", 48000).set_source(netlist_mario).add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 888, sourceColumn: 2, sourceEndLine: 888};
MERGE (n:KG {id: 'audioroute:device:mario_state.mario/snd_nl/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'NETLIST_SOUND(config, "snd_nl", 48000).set_source(netlist_mario).add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 888, sourceColumn: 2, sourceEndLine: 888};
MERGE (n:KG {id: 'device:mario_state.mario/audio_snd[0]'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'audio_snd[0]', clock: null, config: ['NETLIST_LOGIC_INPUT(config, m_audio_snd[0], "SOUND0.IN", 0)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 890, sourceColumn: 2, sourceEndLine: 890, clockExpr: '"SOUND0.IN"'};
MERGE (n:KG {id: 'device:mario_state.mario/audio_snd[1]'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'audio_snd[1]', clock: null, config: ['NETLIST_LOGIC_INPUT(config, m_audio_snd[1], "SOUND1.IN", 0)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 891, sourceColumn: 2, sourceEndLine: 891, clockExpr: '"SOUND1.IN"'};
MERGE (n:KG {id: 'device:mario_state.mario/audio_snd[2]'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'audio_snd[2]', clock: null, config: ['NETLIST_LOGIC_INPUT(config, m_audio_snd[2], "SOUND7.IN", 0)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 892, sourceColumn: 2, sourceEndLine: 892, clockExpr: '"SOUND7.IN"'};
MERGE (n:KG {id: 'device:mario_state.mario/snd_nl:dac'}) SET n:Device SET n += {type: 'NETLIST_INT_INPUT', tag: 'snd_nl:dac', clock: null, config: ['NETLIST_INT_INPUT(config, m_audio_dac, "DAC.VAL", 0, 255)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 893, sourceColumn: 2, sourceEndLine: 893, clockExpr: '"DAC.VAL"'};
MERGE (n:KG {id: 'device:mario_state.mario/snd_nl:cout0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_OUTPUT', tag: 'snd_nl:cout0', clock: 0, config: ['NETLIST_STREAM_OUTPUT(config, "snd_nl:cout0", 0, "ROUT.1").set_mult_offset(150000.0 / 32768.0, 0.0)'], sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 895, sourceColumn: 2, sourceEndLine: 895};
MERGE (n:KG {id: 'device:mario_state.mario/soundlatch0'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch0', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch[0])']};
MERGE (n:KG {id: 'device:mario_state.mario/soundlatch1'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch1', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch[1])']};
MERGE (n:KG {id: 'device:mario_state.mario/soundlatch2'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch2', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch[2])']};
MERGE (n:KG {id: 'device:mario_state.mario/soundlatch3'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch3', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch[3])']};
MERGE (n:KG {id: 'inputs:mario'}) SET n:InputPorts SET n += {name: 'mario', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 699, sourceColumn: 8, sourceEndLine: 699};
MERGE (n:KG {id: 'inputs:mario/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:mario/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:mario/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:mario/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:mario/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:mario/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:mario/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:mario/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:mario/IN0/f7'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: false, defaultValue: 0};
MERGE (n:KG {id: 'inputs:mario/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:mario/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:mario/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:mario/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:mario/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:mario/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:mario/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:mario/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:mario/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:mario/DSW'}) SET n:Port SET n += {tag: 'DSW', modify: false};
MERGE (n:KG {id: 'inputs:mario/DSW/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Lives', defaultValue: 0, location: 'SW1:!1,!2', settings: ['0=3', '1=4', '2=5', '3=6']};
MERGE (n:KG {id: 'inputs:mario/DSW/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, name: 'Coinage', defaultValue: 0, location: 'SW1:!3,!4', settings: ['4=2C 1C', '0=1C 1C', '8=1C 2C', '12=1C 3C']};
MERGE (n:KG {id: 'inputs:mario/DSW/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, name: 'Bonus Life', defaultValue: 0, location: 'SW1:!5,!6', settings: ['0=20k only', '16=30k only', '32=40k only', '48=None']};
MERGE (n:KG {id: 'inputs:mario/DSW/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Difficulty', defaultValue: 0, location: 'SW1:!7,!8', settings: ['0=Easy', '128=Medium', '64=Hard', '192=Hardest']};
MERGE (n:KG {id: 'inputs:mario/MONITOR'}) SET n:Port SET n += {tag: 'MONITOR', modify: false};
MERGE (n:KG {id: 'inputs:mario/MONITOR/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Monitor', defaultValue: 0, settings: ['0=Nintendo', '1=Std 15.72Khz']};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 512, planes: 2, planeOffsets: [32768, 0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 256, planes: 3, planeOffsets: [131072, 65536, 0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 32768, 32769, 32770, 32771, 32772, 32773, 32774, 32775], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 128};
MERGE (n:KG {id: 'gfxdecode:gfx_mario'}) SET n:GfxDecode SET n += {name: 'gfx_mario', sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 819, sourceColumn: 8, sourceEndLine: 819};
MERGE (n:KG {id: 'gfxdecode:gfx_mario/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 32, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_mario/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout', colorBase: 0, colorCount: 32, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:mario'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 1120, sourceColumn: 1, sourceEndLine: 1120};
MATCH (a:KG {id: 'game:mario'}), (b:KG {id: 'machine:mario_state.mario'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:mario'}), (b:KG {id: 'inputs:mario'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:mario'}), (b:KG {id: 'romset:mario'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:cpu/mcs48/mcs48.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:machine/z80dma.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:machine/netlist.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:netlist/devices/net_lib.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/mario.cpp'}), (b:KG {id: 'file:nl_mario.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 868, sourceColumn: 1, sourceEndLine: 896};
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'handler:mario_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'handler:mario_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'machine:mario_state.mario_base'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/snd_nl'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/audio_snd[0]'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/audio_snd[1]'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/audio_snd[2]'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/snd_nl:dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/snd_nl:cout0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/soundlatch0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/soundlatch1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/soundlatch2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario'}), (b:KG {id: 'device:mario_state.mario/soundlatch3'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:mario'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 699, sourceColumn: 8, sourceEndLine: 699};
MATCH (a:KG {id: 'inputs:mario'}), (b:KG {id: 'inputs:mario/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mario'}), (b:KG {id: 'inputs:mario/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mario'}), (b:KG {id: 'inputs:mario/DSW'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mario'}), (b:KG {id: 'inputs:mario/MONITOR'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:mario'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 925, sourceColumn: 1, sourceEndLine: 925};
MATCH (a:KG {id: 'romset:mario'}), (b:KG {id: 'region:mario/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mario'}), (b:KG {id: 'region:mario/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mario'}), (b:KG {id: 'region:mario/soundrom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mario'}), (b:KG {id: 'region:mario/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mario'}), (b:KG {id: 'region:mario/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mario'}), (b:KG {id: 'region:mario/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mario'}), (b:KG {id: 'region:mario/decoder_prom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:mario_state.video_start'}), (b:KG {id: 'handler:mario_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 831, sourceColumn: 1, sourceEndLine: 866};
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'handler:mario_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'handler:mario_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'device:mario_state.mario_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'device:mario_state.mario_base/z80dma'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'device:mario_state.mario_base/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'device:mario_state.mario_base/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'device:mario_state.mario_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'device:mario_state.mario_base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'gfxdecode:gfx_mario'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:mario_state.mario_base'}), (b:KG {id: 'device:mario_state.mario_base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu'}), (b:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu'}), (b:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu'}), (b:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu'}), (b:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu'}), (b:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu'}), (b:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu'}), (b:KG {id: 'map:mario_state.mario_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu'}), (b:KG {id: 'map:mario_state.mario_sound_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:mario_state.mario/snd_nl'}), (b:KG {id: 'audioroute:device:mario_state.mario/snd_nl/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:mario/IN0'}), (b:KG {id: 'inputs:mario/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN0'}), (b:KG {id: 'inputs:mario/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN0'}), (b:KG {id: 'inputs:mario/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN0'}), (b:KG {id: 'inputs:mario/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN0'}), (b:KG {id: 'inputs:mario/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN0'}), (b:KG {id: 'inputs:mario/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN0'}), (b:KG {id: 'inputs:mario/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN0'}), (b:KG {id: 'inputs:mario/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN1'}), (b:KG {id: 'inputs:mario/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN1'}), (b:KG {id: 'inputs:mario/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN1'}), (b:KG {id: 'inputs:mario/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN1'}), (b:KG {id: 'inputs:mario/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN1'}), (b:KG {id: 'inputs:mario/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN1'}), (b:KG {id: 'inputs:mario/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN1'}), (b:KG {id: 'inputs:mario/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/IN1'}), (b:KG {id: 'inputs:mario/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/DSW'}), (b:KG {id: 'inputs:mario/DSW/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/DSW'}), (b:KG {id: 'inputs:mario/DSW/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/DSW'}), (b:KG {id: 'inputs:mario/DSW/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/DSW'}), (b:KG {id: 'inputs:mario/DSW/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mario/MONITOR'}), (b:KG {id: 'inputs:mario/MONITOR/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:mario/maincpu'}), (b:KG {id: 'rom:mario/maincpu/tma1-c-7f_e-1.7f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/maincpu'}), (b:KG {id: 'rom:mario/maincpu/tma1-c-7e_e-3.7e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/maincpu'}), (b:KG {id: 'rom:mario/maincpu/tma1-c-7d_e-1.7d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/maincpu'}), (b:KG {id: 'rom:mario/maincpu/tma1-c-7c_e-3.7c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/audiocpu'}), (b:KG {id: 'rom:mario/audiocpu/m58715-051p.5l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/soundrom'}), (b:KG {id: 'rom:mario/soundrom/tma1-c-6k_e.6k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/gfx1'}), (b:KG {id: 'rom:mario/gfx1/tma1-v-3f.3f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/gfx1'}), (b:KG {id: 'rom:mario/gfx1/tma1-v-3j.3j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/gfx2'}), (b:KG {id: 'rom:mario/gfx2/tma1-v.7m.7m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/gfx2'}), (b:KG {id: 'rom:mario/gfx2/tma1-v-7n.7n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/gfx2'}), (b:KG {id: 'rom:mario/gfx2/tma1-v-7p.7p'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/gfx2'}), (b:KG {id: 'rom:mario/gfx2/tma1-v.7s.7s'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/gfx2'}), (b:KG {id: 'rom:mario/gfx2/tma1-v-7t.7t'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/gfx2'}), (b:KG {id: 'rom:mario/gfx2/tma1-v.7u.7u'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/proms'}), (b:KG {id: 'rom:mario/proms/tma1-c-4p.4p'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mario/decoder_prom'}), (b:KG {id: 'rom:mario/decoder_prom/tma1-c-5b.5b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/maincpu'}), (b:KG {id: 'device:mario_state.mario_base/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/maincpu'}), (b:KG {id: 'map:mario_state.mario_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:mario_state.mario_base/maincpu'}), (b:KG {id: 'map:mario_state.mario_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:mario_state.mario_base/z80dma'}), (b:KG {id: 'device:mario_state.mario_base/z80dma/callback:z80dma:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/z80dma'}), (b:KG {id: 'device:mario_state.mario_base/z80dma/callback:z80dma:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/z80dma'}), (b:KG {id: 'device:mario_state.mario_base/z80dma/callback:z80dma:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch'}), (b:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch'}), (b:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch'}), (b:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch'}), (b:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch'}), (b:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch'}), (b:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch'}), (b:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch'}), (b:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/screen'}), (b:KG {id: 'device:mario_state.mario_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/screen'}), (b:KG {id: 'device:mario_state.mario_base/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mario'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 819, sourceColumn: 8, sourceEndLine: 819};
MATCH (a:KG {id: 'gfxdecode:gfx_mario'}), (b:KG {id: 'gfxdecode:gfx_mario/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mario'}), (b:KG {id: 'gfxdecode:gfx_mario/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:0'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:1'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:2'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:3'}), (b:KG {id: 'device:mario_state.mario/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:4'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario/audiocpu/callback:audiocpu:5'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_sound_map'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 674, sourceColumn: 1, sourceEndLine: 677};
MATCH (a:KG {id: 'map:mario_state.mario_sound_map'}), (b:KG {id: 'map:mario_state.mario_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_sound_io_map'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 679, sourceColumn: 1, sourceEndLine: 682};
MATCH (a:KG {id: 'map:mario_state.mario_sound_io_map'}), (b:KG {id: 'map:mario_state.mario_sound_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:z80dma_device.bai_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_map'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 652, sourceColumn: 1, sourceEndLine: 658};
MATCH (a:KG {id: 'map:mario_state.mario_map'}), (b:KG {id: 'map:mario_state.base_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_map'}), (b:KG {id: 'map:mario_state.mario_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_map'}), (b:KG {id: 'map:mario_state.mario_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_map'}), (b:KG {id: 'map:mario_state.mario_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_io_map'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 666, sourceColumn: 1, sourceEndLine: 670};
MATCH (a:KG {id: 'map:mario_state.mario_io_map'}), (b:KG {id: 'map:mario_state.mario_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/z80dma/callback:z80dma:0'}), (b:KG {id: 'device:mario_state.mario_base/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/z80dma/callback:z80dma:1'}), (b:KG {id: 'handler:mario_state.memory_read_byte'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/z80dma/callback:z80dma:2'}), (b:KG {id: 'handler:mario_state.memory_write_byte'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:mario_state.gfx_bank_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:2'}), (b:KG {id: 'handler:mario_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:3'}), (b:KG {id: 'handler:mario_state.palette_bank_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:4'}), (b:KG {id: 'handler:mario_state.nmi_mask_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:5'}), (b:KG {id: 'handler:z80dma_device.rdy_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:5'}), (b:KG {id: 'device:mario_state.mario_base/z80dma'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:6'}), (b:KG {id: 'handler:mario_state.coin_counter_2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/mainlatch/callback:mainlatch:7'}), (b:KG {id: 'handler:mario_state.coin_counter_1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/screen/callback:screen:0'}), (b:KG {id: 'handler:mario_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mario_state.mario_base/screen/callback:screen:1'}), (b:KG {id: 'handler:mario_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mario/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mario/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_sound_io_map/range0'}), (b:KG {id: 'handler:mario_state.tune_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_sound_io_map/range0'}), (b:KG {id: 'handler:mario_state.dac_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/mario.cpp', sourceLine: 636, sourceColumn: 1, sourceEndLine: 650};
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map'}), (b:KG {id: 'map:mario_state.base_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_map/range0'}), (b:KG {id: 'handler:mario_state.walk_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_map/range1'}), (b:KG {id: 'handler:mario_state.walk_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_map/range2'}), (b:KG {id: 'handler:mario_state.samples_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mario_state.mario_io_map/range0'}), (b:KG {id: 'handler:z80dma_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'z80dma'};
MATCH (a:KG {id: 'map:mario_state.mario_io_map/range0'}), (b:KG {id: 'handler:z80dma_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'z80dma'};
MATCH (a:KG {id: 'handler:mario_state.screen_update'}), (b:KG {id: 'handler:mario_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/nintendo/mario.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map/range4'}), (b:KG {id: 'handler:mario_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map/range7'}), (b:KG {id: 'handler:mario_state.scroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mario_state.base_map/range8'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch0'};
MATCH (a:KG {id: 'map:mario_state.base_map/range9'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
