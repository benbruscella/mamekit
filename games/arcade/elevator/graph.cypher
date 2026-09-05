// mamekit knowledge graph — driver src/mame/taito/taitosj.cpp
// generated 2026-09-05T03:49:29.801Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/taito/taitosj.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/taito/taitosj.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:taitosj.h'}) SET n:SourceFile SET n += {path: 'taitosj.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:taitosjsec.h'}) SET n:SourceFile SET n += {path: 'taitosjsec.h', external: true};
MERGE (n:KG {id: 'file:src/mame/taito/taitosj_m.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/taito/taitosj_m.cpp'};
MERGE (n:KG {id: 'file:cpu/m6805/m6805.h'}) SET n:SourceFile SET n += {path: 'cpu/m6805/m6805.h', external: true};
MERGE (n:KG {id: 'file:src/mame/taito/taitosjsec.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/taito/taitosjsec.cpp'};
MERGE (n:KG {id: 'handler:taitosj_state.characterram_w'}) SET n:Handler SET n += {method: 'characterram_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 208, sourceColumn: 1, sourceEndLine: 225, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (m_characterram[offset] != data)
	{
		if (offset < 0x1800)
		{
			m_gfxdecode->gfx(0)->mark_dirty((offset / 8) & 0xff);
			m_gfxdecode->gfx(1)->mark_dirty((offset / 32) & 0x3f);
		}
		else
		{
			m_gfxdecode->gfx(2)->mark_dirty((offset / 8) & 0xff);
			m_gfxdecode->gfx(3)->mark_dirty((offset / 32) & 0x3f);
		}

		m_characterram[offset] = data;
	}'};
MERGE (n:KG {id: 'handler:taitosj_state.bankswitch_w'}) SET n:Handler SET n += {method: 'bankswitch_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 40, sourceColumn: 1, sourceEndLine: 58, sourceParameters: 'uint8_t data', sourceBody: 'machine().bookkeeping().coin_lockout_global_w(~data & 1);

	/* this is a bit of a hack, but works.
	    Eventually the mixing of the ay1 outs and
	    amplitude-overdrive-mute stuff done by
	    bit 1 here should be done on a netlist.
	*/
	m_ay[0]->set_output_gain(0, (data & 0x2) ? 1.0 : 0.0); // 3 outputs for Ay1 since it doesn\'t use tied together outs
	m_ay[0]->set_output_gain(1, (data & 0x2) ? 1.0 : 0.0);
	m_ay[0]->set_output_gain(2, (data & 0x2) ? 1.0 : 0.0);
	m_ay[1]->set_output_gain(0, (data & 0x2) ? 1.0 : 0.0);
	m_ay[2]->set_output_gain(0, (data & 0x2) ? 1.0 : 0.0);
	m_ay[3]->set_output_gain(0, (data & 0x2) ? 1.0 : 0.0);
	m_dac->set_output_gain(0, (data & 0x2) ? 1.0 : 0.0);

	m_mainbank->set_entry(BIT(data, 7));'};
MERGE (n:KG {id: 'game:elevator'}) SET n:Game SET n += {name: 'elevator', year: '1983', company: 'Taito', fullname: 'Elevator Action (BA3, 4 PCB version, 1.1)', monitor: 'ROT0', cls: 'taitosj_state', init: 'init_taitosj', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2849, sourceColumn: 1, sourceEndLine: 2849};
MERGE (n:KG {id: 'romset:elevator'}) SET n:RomSet SET n += {name: 'elevator', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2433, sourceColumn: 1, sourceEndLine: 2433};
MERGE (n:KG {id: 'region:elevator/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 73728, flags: '0', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1767, sourceColumn: 2, sourceEndLine: 1767};
MERGE (n:KG {id: 'rom:elevator/maincpu/ba3__01.2764.ic1'}) SET n:Rom SET n += {file: 'ba3__01.2764.ic1', offset: 0, size: 8192, crc: 'da775a24', sha1: 'b4341d2c87285d7a3d1773e2d94b3f621ebb4489', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2435, sourceColumn: 2, sourceEndLine: 2435};
MERGE (n:KG {id: 'rom:elevator/maincpu/ba3__02.2764.ic2'}) SET n:Rom SET n += {file: 'ba3__02.2764.ic2', offset: 8192, size: 8192, crc: 'fbfd8b3a', sha1: '9dff36dcaf43a2403b9a3497512dfec228144a7c', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2436, sourceColumn: 2, sourceEndLine: 2436};
MERGE (n:KG {id: 'rom:elevator/maincpu/ba3__03-1.2764.ic3'}) SET n:Rom SET n += {file: 'ba3__03-1.2764.ic3', offset: 16384, size: 8192, crc: 'a2e69833', sha1: '0f324c3adec27fcfebd779328db6f1da6cc8d227', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2437, sourceColumn: 2, sourceEndLine: 2437};
MERGE (n:KG {id: 'rom:elevator/maincpu/ba3__04-1.2764.ic6'}) SET n:Rom SET n += {file: 'ba3__04-1.2764.ic6', offset: 24576, size: 8192, crc: '2b78c462', sha1: 'ae41e0089c7f445fa271f6af7e141b112f0009e6', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2438, sourceColumn: 2, sourceEndLine: 2438};
MERGE (n:KG {id: 'region:elevator/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1778, sourceColumn: 2, sourceEndLine: 1778};
MERGE (n:KG {id: 'rom:elevator/audiocpu/ba3__09.2732.ic70'}) SET n:Rom SET n += {file: 'ba3__09.2732.ic70', offset: 0, size: 4096, crc: '6d5f57cb', sha1: 'abb916d675ee85032697d656121d4f525202cab3', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2442, sourceColumn: 2, sourceEndLine: 2442};
MERGE (n:KG {id: 'rom:elevator/audiocpu/ba3__10.2732.ic71'}) SET n:Rom SET n += {file: 'ba3__10.2732.ic71', offset: 4096, size: 4096, crc: 'f0a769a1', sha1: '9970fba3afeaaaa7fd217f0704fb9df9cf13cf65', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2443, sourceColumn: 2, sourceEndLine: 2443};
MERGE (n:KG {id: 'region:elevator/pal'}) SET n:RomRegion SET n += {tag: 'pal', size: 2048, flags: '0', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2445, sourceColumn: 2, sourceEndLine: 2445};
MERGE (n:KG {id: 'rom:elevator/pal/ww15.pal16l8.ic24.jed.bin'}) SET n:Rom SET n += {file: 'ww15.pal16l8.ic24.jed.bin', offset: 0, size: 279, crc: 'c3ec20d6', sha1: '4bcdd92ca6b75ba825a7f90b1f35d8dcaeaf8a96', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2446, sourceColumn: 2, sourceEndLine: 2446};
MERGE (n:KG {id: 'region:elevator/bmcu:mcu'}) SET n:RomRegion SET n += {tag: 'bmcu:mcu', size: 2048, flags: '0', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2254, sourceColumn: 2, sourceEndLine: 2254};
MERGE (n:KG {id: 'rom:elevator/bmcu:mcu/ba3__11.mc68705p3.ic24'}) SET n:Rom SET n += {file: 'ba3__11.mc68705p3.ic24', offset: 0, size: 2048, crc: '9ce75afc', sha1: '4c8f5d926ae2bec8fcb70692125b9e1c863166c6', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2449, sourceColumn: 2, sourceEndLine: 2449};
MERGE (n:KG {id: 'region:elevator/gfx'}) SET n:RomRegion SET n += {tag: 'gfx', size: 32768, flags: '0', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1783, sourceColumn: 2, sourceEndLine: 1783};
MERGE (n:KG {id: 'rom:elevator/gfx/ba3__05.2764.ic4'}) SET n:Rom SET n += {file: 'ba3__05.2764.ic4', offset: 0, size: 8192, crc: '6c4ee58f', sha1: '122369a0fc901b0a60a3fb3b3646427beb1cd0c6', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2452, sourceColumn: 2, sourceEndLine: 2452};
MERGE (n:KG {id: 'rom:elevator/gfx/ba3__06.2764.ic5'}) SET n:Rom SET n += {file: 'ba3__06.2764.ic5', offset: 8192, size: 8192, crc: '41ab0afc', sha1: 'd18df5a5d054a35d20da04a3f35cf005387a1de4', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2453, sourceColumn: 2, sourceEndLine: 2453};
MERGE (n:KG {id: 'rom:elevator/gfx/ba3__07.2764.ic9'}) SET n:Rom SET n += {file: 'ba3__07.2764.ic9', offset: 16384, size: 8192, crc: 'efe43731', sha1: '7815df72f0d7a5752628986ec97de96fa764699e', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2454, sourceColumn: 2, sourceEndLine: 2454};
MERGE (n:KG {id: 'rom:elevator/gfx/ba3__08.2764.ic10'}) SET n:Rom SET n += {file: 'ba3__08.2764.ic10', offset: 24576, size: 8192, crc: '3ca20696', sha1: '2c2d4f82a4e6aa72510337ee330d8c22098a0944', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2455, sourceColumn: 2, sourceEndLine: 2455};
MERGE (n:KG {id: 'region:elevator/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 256, flags: '0', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1789, sourceColumn: 2, sourceEndLine: 1789};
MERGE (n:KG {id: 'rom:elevator/proms/eb16.ic22'}) SET n:Rom SET n += {file: 'eb16.ic22', offset: 0, size: 256, crc: 'b833b5ea', sha1: 'd233f1bf8a3e6cd876853ffd721b9b64c61c9047', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2264, sourceColumn: 2, sourceEndLine: 2264};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map'}) SET n:AddressMap SET n += {cls: 'taitosj_state', name: 'main_nomcu_map', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 204, sourceColumn: 1, sourceEndLine: 243};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 24575, raw: 'map(0x0000, 0x5fff).rom()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 206, sourceColumn: 2, sourceEndLine: 206, rom: true};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range1'}) SET n:AddressRange SET n += {start: 24576, end: 32767, raw: 'map(0x6000, 0x7fff).bankr(m_mainbank)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 207, sourceColumn: 2, sourceEndLine: 207, bankRead: 'mainbank'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range2'}) SET n:AddressRange SET n += {start: 32768, end: 34815, raw: 'map(0x8000, 0x87ff).ram()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 208, sourceColumn: 2, sourceEndLine: 208, ram: true};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range3'}) SET n:AddressRange SET n += {start: 34816, end: 34816, raw: 'map(0x8800, 0x8800).mirror(0x07fe).rw(FUNC(taitosj_state::fake_data_r), FUNC(taitosj_state::fake_data_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 209, sourceColumn: 2, sourceEndLine: 209, mirror: 2046};
MERGE (n:KG {id: 'handler:taitosj_state.fake_data_r'}) SET n:Handler SET n += {method: 'fake_data_r', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 76, sourceColumn: 1, sourceEndLine: 80, sourceParameters: '', sourceBody: 'LOG(("%04x: protection read\\n", m_maincpu->pc()));
	return 0;'};
MERGE (n:KG {id: 'handler:taitosj_state.fake_data_w'}) SET n:Handler SET n += {method: 'fake_data_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 82, sourceColumn: 1, sourceEndLine: 85, sourceParameters: 'uint8_t data', sourceBody: 'LOG(("%04x: protection write %02x\\n", m_maincpu->pc(), data));'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range4'}) SET n:AddressRange SET n += {start: 34817, end: 34817, raw: 'map(0x8801, 0x8801).mirror(0x07fe).r(FUNC(taitosj_state::fake_status_r))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 210, sourceColumn: 2, sourceEndLine: 210, mirror: 2046};
MERGE (n:KG {id: 'handler:taitosj_state.fake_status_r'}) SET n:Handler SET n += {method: 'fake_status_r', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 87, sourceColumn: 1, sourceEndLine: 91, sourceParameters: '', sourceBody: 'LOG(("%04x: protection status read\\n", m_maincpu->pc()));
	return 0xff;'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range5'}) SET n:AddressRange SET n += {start: 36864, end: 49151, raw: 'map(0x9000, 0xbfff).w(FUNC(taitosj_state::characterram_w)).share(m_characterram)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 211, sourceColumn: 2, sourceEndLine: 211, share: 'characterram'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range6'}) SET n:AddressRange SET n += {start: 49152, end: 50175, raw: 'map(0xc000, 0xc3ff).ram()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 212, sourceColumn: 2, sourceEndLine: 212, ram: true};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range7'}) SET n:AddressRange SET n += {start: 50176, end: 51199, raw: 'map(0xc400, 0xc7ff).ram().share(m_videoram[0])', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 213, sourceColumn: 2, sourceEndLine: 213, ram: true, share: 'videoram[0]'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range8'}) SET n:AddressRange SET n += {start: 51200, end: 52223, raw: 'map(0xc800, 0xcbff).ram().share(m_videoram[1])', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 214, sourceColumn: 2, sourceEndLine: 214, ram: true, share: 'videoram[1]'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range9'}) SET n:AddressRange SET n += {start: 52224, end: 53247, raw: 'map(0xcc00, 0xcfff).ram().share(m_videoram[2])', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 215, sourceColumn: 2, sourceEndLine: 215, ram: true, share: 'videoram[2]'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range10'}) SET n:AddressRange SET n += {start: 53248, end: 53343, raw: 'map(0xd000, 0xd05f).ram().share(m_colscrolly)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 216, sourceColumn: 2, sourceEndLine: 216, ram: true, share: 'colscrolly'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range11'}) SET n:AddressRange SET n += {start: 53344, end: 53503, raw: 'map(0xd060, 0xd0ff).ram()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 217, sourceColumn: 2, sourceEndLine: 217, ram: true};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range12'}) SET n:AddressRange SET n += {start: 53504, end: 53759, raw: 'map(0xd100, 0xd1ff).ram().share(m_spriteram)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 218, sourceColumn: 2, sourceEndLine: 218, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range13'}) SET n:AddressRange SET n += {start: 53760, end: 53887, raw: 'map(0xd200, 0xd27f).mirror(0x0080).ram().share(m_paletteram)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 219, sourceColumn: 2, sourceEndLine: 219, mirror: 128, ram: true, share: 'paletteram'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range14'}) SET n:AddressRange SET n += {start: 54016, end: 54016, raw: 'map(0xd300, 0xd300).mirror(0x00ff).writeonly().share(m_video_priority)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 220, sourceColumn: 2, sourceEndLine: 220, mirror: 255, writeonly: true, share: 'video_priority'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range15'}) SET n:AddressRange SET n += {start: 54272, end: 54275, raw: 'map(0xd400, 0xd403).mirror(0x00f0).readonly().share(m_collision_reg)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 221, sourceColumn: 2, sourceEndLine: 221, mirror: 240, readonly: true, share: 'collision_reg'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range16'}) SET n:AddressRange SET n += {start: 54276, end: 54276, raw: 'map(0xd404, 0xd404).mirror(0x00f3).r(FUNC(taitosj_state::gfxrom_r))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 222, sourceColumn: 2, sourceEndLine: 222, mirror: 243};
MERGE (n:KG {id: 'handler:taitosj_state.gfxrom_r'}) SET n:Handler SET n += {method: 'gfxrom_r', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 187, sourceColumn: 1, sourceEndLine: 204, sourceParameters: '', sourceBody: 'uint8_t ret;

	offs_t offs = m_gfxpointer[0] | (m_gfxpointer[1] << 8);

	if (offs < 0x8000)
		ret = m_gfx[offs];
	else
		ret = 0;

	offs = offs + 1;

	m_gfxpointer[0] = offs & 0xff;
	m_gfxpointer[1] = offs >> 8;

	return ret;'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range17'}) SET n:AddressRange SET n += {start: 54280, end: 54280, raw: 'map(0xd408, 0xd408).mirror(0x00f0).portr("IN0")', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 223, sourceColumn: 2, sourceEndLine: 223, mirror: 240, portRead: 'IN0'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range18'}) SET n:AddressRange SET n += {start: 54281, end: 54281, raw: 'map(0xd409, 0xd409).mirror(0x00f0).portr("IN1")', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 224, sourceColumn: 2, sourceEndLine: 224, mirror: 240, portRead: 'IN1'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range19'}) SET n:AddressRange SET n += {start: 54282, end: 54282, raw: 'map(0xd40a, 0xd40a).mirror(0x00f0).portr("DSW1")', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 225, sourceColumn: 2, sourceEndLine: 225, mirror: 240, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range20'}) SET n:AddressRange SET n += {start: 54283, end: 54283, raw: 'map(0xd40b, 0xd40b).mirror(0x00f0).portr("IN2")', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 226, sourceColumn: 2, sourceEndLine: 226, mirror: 240, portRead: 'IN2'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range21'}) SET n:AddressRange SET n += {start: 54284, end: 54284, raw: 'map(0xd40c, 0xd40c).mirror(0x00f0).portr("IN3")', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 227, sourceColumn: 2, sourceEndLine: 227, mirror: 240, portRead: 'IN3'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range22'}) SET n:AddressRange SET n += {start: 54285, end: 54285, raw: 'map(0xd40d, 0xd40d).mirror(0x00f0).portr("IN4")', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 228, sourceColumn: 2, sourceEndLine: 228, mirror: 240, portRead: 'IN4'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range23'}) SET n:AddressRange SET n += {start: 54286, end: 54287, raw: 'map(0xd40e, 0xd40f).mirror(0x00f0).w(m_ay[0], FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 229, sourceColumn: 2, sourceEndLine: 229, mirror: 240};
MERGE (n:KG {id: 'handler:ay8910_device.address_data_w'}) SET n:Handler SET n += {method: 'address_data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 374, sourceColumn: 2, sourceEndLine: 374};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range24'}) SET n:AddressRange SET n += {start: 54287, end: 54287, raw: 'map(0xd40f, 0xd40f).mirror(0x00f0).r(m_ay[0], FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 230, sourceColumn: 2, sourceEndLine: 230, mirror: 240};
MERGE (n:KG {id: 'handler:ay8910_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay8910_device', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 375, sourceColumn: 2, sourceEndLine: 375};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range25'}) SET n:AddressRange SET n += {start: 54528, end: 54533, raw: 'map(0xd500, 0xd505).mirror(0x00f0).writeonly().share(m_scroll)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 231, sourceColumn: 2, sourceEndLine: 231, mirror: 240, writeonly: true, share: 'scroll'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range26'}) SET n:AddressRange SET n += {start: 54534, end: 54535, raw: 'map(0xd506, 0xd507).mirror(0x00f0).writeonly().share(m_colorbank)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 232, sourceColumn: 2, sourceEndLine: 232, mirror: 240, writeonly: true, share: 'colorbank'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range27'}) SET n:AddressRange SET n += {start: 54536, end: 54536, raw: 'map(0xd508, 0xd508).mirror(0x00f0).w(FUNC(taitosj_state::collision_reg_clear_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 233, sourceColumn: 2, sourceEndLine: 233, mirror: 240};
MERGE (n:KG {id: 'handler:taitosj_state.collision_reg_clear_w'}) SET n:Handler SET n += {method: 'collision_reg_clear_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 233, sourceColumn: 1, sourceEndLine: 239, sourceParameters: 'uint8_t data', sourceBody: 'm_collision_reg[0] = 0;
	m_collision_reg[1] = 0;
	m_collision_reg[2] = 0;
	m_collision_reg[3] = 0;'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range28'}) SET n:AddressRange SET n += {start: 54537, end: 54538, raw: 'map(0xd509, 0xd50a).mirror(0x00f0).writeonly().share(m_gfxpointer)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 234, sourceColumn: 2, sourceEndLine: 234, mirror: 240, writeonly: true, share: 'gfxpointer'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range29'}) SET n:AddressRange SET n += {start: 54539, end: 54539, raw: 'map(0xd50b, 0xd50b).mirror(0x00f0).w(FUNC(taitosj_state::soundlatch_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 235, sourceColumn: 2, sourceEndLine: 235, mirror: 240};
MERGE (n:KG {id: 'handler:taitosj_state.soundlatch_w'}) SET n:Handler SET n += {method: 'soundlatch_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 181, sourceColumn: 1, sourceEndLine: 184, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(taitosj_state::soundlatch_w_cb), this), data);'};
MERGE (n:KG {id: 'handler:taitosj_state.soundlatch_w_cb'}) SET n:Handler SET n += {method: 'soundlatch_w_cb', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 308, sourceColumn: 1, sourceEndLine: 315, sourceParameters: 'int param', sourceBody: 'if (m_soundlatch_flag && (m_soundlatch_data != param))
		logerror("Warning: soundlatch written before being read. Previous: %02x, new: %02x\\n", m_soundlatch_data, param);
	m_soundlatch_data = param;
	m_soundlatch_flag = true;
	m_soundnmi[0]->in_w<1>(1);'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range30'}) SET n:AddressRange SET n += {start: 54540, end: 54540, raw: 'map(0xd50c, 0xd50c).mirror(0x00f0).w(FUNC(taitosj_state::sound_semaphore2_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 236, sourceColumn: 2, sourceEndLine: 236, mirror: 240};
MERGE (n:KG {id: 'handler:taitosj_state.sound_semaphore2_w'}) SET n:Handler SET n += {method: 'sound_semaphore2_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 193, sourceColumn: 1, sourceEndLine: 196, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(taitosj_state::sound_semaphore2_w_cb), this), data);'};
MERGE (n:KG {id: 'handler:taitosj_state.sound_semaphore2_w_cb'}) SET n:Handler SET n += {method: 'sound_semaphore2_w_cb', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 324, sourceColumn: 1, sourceEndLine: 328, sourceParameters: 'int param', sourceBody: 'm_sound_semaphore2 = (param & 1);
	m_soundnmi[1]->in_w<1>((param & 1));'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range31'}) SET n:AddressRange SET n += {start: 54541, end: 54541, raw: 'map(0xd50d, 0xd50d).mirror(0x00f0).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 237, sourceColumn: 2, sourceEndLine: 237, mirror: 240};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 301, sourceColumn: 2, sourceEndLine: 301};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range32'}) SET n:AddressRange SET n += {start: 54542, end: 54542, raw: 'map(0xd50e, 0xd50e).mirror(0x00f0).w(FUNC(taitosj_state::bankswitch_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 238, sourceColumn: 2, sourceEndLine: 238, mirror: 240};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range33'}) SET n:AddressRange SET n += {start: 54543, end: 54543, raw: 'map(0xd50f, 0xd50f).mirror(0x00f0).nopw()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 239, sourceColumn: 2, sourceEndLine: 239, mirror: 240, nopw: true};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range34'}) SET n:AddressRange SET n += {start: 54784, end: 54784, raw: 'map(0xd600, 0xd600).mirror(0x00ff).writeonly().share(m_video_mode)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 240, sourceColumn: 2, sourceEndLine: 240, mirror: 255, writeonly: true, share: 'video_mode'};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range35'}) SET n:AddressRange SET n += {start: 55040, end: 57343, raw: 'map(0xd700, 0xdfff).noprw()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 241, sourceColumn: 2, sourceEndLine: 241};
MERGE (n:KG {id: 'map:taitosj_state.main_nomcu_map/range36'}) SET n:AddressRange SET n += {start: 57344, end: 65535, raw: 'map(0xe000, 0xffff).rom()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 242, sourceColumn: 2, sourceEndLine: 242, rom: true};
MERGE (n:KG {id: 'map:taitosj_state.main_mcu_map'}) SET n:AddressMap SET n += {cls: 'taitosj_state', name: 'main_mcu_map', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 247, sourceColumn: 1, sourceEndLine: 251, calls: ['main_nomcu_map']};
MERGE (n:KG {id: 'map:taitosj_state.main_mcu_map/range0'}) SET n:AddressRange SET n += {start: 34816, end: 34817, raw: 'map(0x8800, 0x8801).mirror(0x07fe).rw(m_mcu, FUNC(taito_sj_security_mcu_device::data_r), FUNC(taito_sj_security_mcu_device::data_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 250, sourceColumn: 2, sourceEndLine: 250, mirror: 2046};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 34, sourceColumn: 1, sourceEndLine: 52, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'if (BIT(offset, 0))
	{
		// ZLSTATUS
		machine().scheduler().perfect_quantum(attotime::from_usec(10));
		return
				(u8(space.unmap()) & 0xfc) |
				u8(m_zaccept ? 0x00 : 0x02) |
				u8(m_zready ? 0x00 : 0x01);
	}
	else
	{
		// ZLREAD
		if (!machine().side_effects_disabled())
			m_zaccept = true;
		return m_mcu_data;
	}'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 54, sourceColumn: 1, sourceEndLine: 71, sourceConstants: ['M68705_IRQ_LINE=0', 'WRITE=2'], sourceParameters: 'offs_t offset, u8 data', sourceBody: 'if (BIT(offset, 0))
	{
		// ZINTRQ
		// if jumpered this way, the Z80 write strobe pulses the MCU interrupt line
		// should be PULSE_LINE because it\'s edge sensitive, but diexec only allows PULSE_LINE on reset and NMI
		if (int_mode::WRITE == m_int_mode)
			m_mcu->set_input_line(M68705_IRQ_LINE, HOLD_LINE);
	}
	else
	{
		// ZLWRITE
		device_scheduler &sched(machine().scheduler());
		sched.synchronize(timer_expired_delegate(FUNC(taito_sj_security_mcu_device::do_host_write), this), data);
		sched.perfect_quantum(attotime::from_usec(10));
	}'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.do_host_write'}) SET n:Handler SET n += {method: 'do_host_write', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 220, sourceColumn: 1, sourceEndLine: 229, sourceConstants: ['M68705_IRQ_LINE=0', 'LATCH=1'], sourceParameters: 'int param', sourceBody: 'm_host_data = u8(param);
	if (!m_reset)
	{
		m_zready = true;
		if (int_mode::LATCH == m_int_mode)
			m_mcu->set_input_line(M68705_IRQ_LINE, ASSERT_LINE);
	}'};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map'}) SET n:AddressMap SET n += {cls: 'taitosj_state', name: 'taitosj_audio_map', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 366, sourceColumn: 1, sourceEndLine: 379};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 368, sourceColumn: 2, sourceEndLine: 368, rom: true};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 17407, raw: 'map(0x4000, 0x43ff).ram()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 369, sourceColumn: 2, sourceEndLine: 369, ram: true};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range2'}) SET n:AddressRange SET n += {start: 18432, end: 18433, raw: 'map(0x4800, 0x4801).mirror(0x07f8).w(m_ay[1], FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 370, sourceColumn: 2, sourceEndLine: 370, mirror: 2040};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range3'}) SET n:AddressRange SET n += {start: 18433, end: 18433, raw: 'map(0x4801, 0x4801).mirror(0x07f8).r(m_ay[1], FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 371, sourceColumn: 2, sourceEndLine: 371, mirror: 2040};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range4'}) SET n:AddressRange SET n += {start: 18434, end: 18435, raw: 'map(0x4802, 0x4803).mirror(0x07f8).w(m_ay[2], FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 372, sourceColumn: 2, sourceEndLine: 372, mirror: 2040};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range5'}) SET n:AddressRange SET n += {start: 18435, end: 18435, raw: 'map(0x4803, 0x4803).mirror(0x07f8).r(m_ay[2], FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 373, sourceColumn: 2, sourceEndLine: 373, mirror: 2040};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range6'}) SET n:AddressRange SET n += {start: 18436, end: 18437, raw: 'map(0x4804, 0x4805).mirror(0x07fa).w(m_ay[3], FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 374, sourceColumn: 2, sourceEndLine: 374, mirror: 2042};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range7'}) SET n:AddressRange SET n += {start: 18437, end: 18437, raw: 'map(0x4805, 0x4805).mirror(0x07fa).r(m_ay[3], FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 375, sourceColumn: 2, sourceEndLine: 375, mirror: 2042};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range8'}) SET n:AddressRange SET n += {start: 20480, end: 20480, raw: 'map(0x5000, 0x5000).mirror(0x07fc).rw(FUNC(taitosj_state::soundlatch_r), FUNC(taitosj_state::soundlatch_clear7_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 376, sourceColumn: 2, sourceEndLine: 376, mirror: 2044};
MERGE (n:KG {id: 'handler:taitosj_state.soundlatch_r'}) SET n:Handler SET n += {method: 'soundlatch_r', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 337, sourceColumn: 1, sourceEndLine: 345, sourceParameters: '', sourceBody: 'if (!machine().side_effects_disabled())
	{
		m_soundlatch_flag = false;
		m_soundnmi[0]->in_w<1>(0);
	}
	return m_soundlatch_data;'};
MERGE (n:KG {id: 'handler:taitosj_state.soundlatch_clear7_w'}) SET n:Handler SET n += {method: 'soundlatch_clear7_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 354, sourceColumn: 1, sourceEndLine: 357, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(taitosj_state::soundlatch_clear7_w_cb), this), data);'};
MERGE (n:KG {id: 'handler:taitosj_state.soundlatch_clear7_w_cb'}) SET n:Handler SET n += {method: 'soundlatch_clear7_w_cb', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 317, sourceColumn: 1, sourceEndLine: 322, sourceParameters: 'int param', sourceBody: 'if (m_soundlatch_flag)
		logerror("Warning: soundlatch bit 7 cleared before being read. Previous: %02x, new: %02x\\n", m_soundlatch_data, m_soundlatch_data & 0x7f);
	m_soundlatch_data &= 0x7f;'};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range9'}) SET n:AddressRange SET n += {start: 20481, end: 20481, raw: 'map(0x5001, 0x5001).mirror(0x07fc).rw(FUNC(taitosj_state::soundlatch_flags_r), FUNC(taitosj_state::sound_semaphore2_clear_w))', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 377, sourceColumn: 2, sourceEndLine: 377, mirror: 2044};
MERGE (n:KG {id: 'handler:taitosj_state.soundlatch_flags_r'}) SET n:Handler SET n += {method: 'soundlatch_flags_r', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 348, sourceColumn: 1, sourceEndLine: 351, sourceParameters: '', sourceBody: 'return (m_soundlatch_flag ? 8 : 0) | (m_sound_semaphore2 ? 4 : 0) | 3;'};
MERGE (n:KG {id: 'handler:taitosj_state.sound_semaphore2_clear_w'}) SET n:Handler SET n += {method: 'sound_semaphore2_clear_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 360, sourceColumn: 1, sourceEndLine: 363, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(taitosj_state::sound_semaphore2_clear_w_cb), this), data);'};
MERGE (n:KG {id: 'handler:taitosj_state.sound_semaphore2_clear_w_cb'}) SET n:Handler SET n += {method: 'sound_semaphore2_clear_w_cb', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 330, sourceColumn: 1, sourceEndLine: 334, sourceParameters: 'int param', sourceBody: 'm_sound_semaphore2 = false;
	m_soundnmi[1]->in_w<1>(0);'};
MERGE (n:KG {id: 'map:taitosj_state.taitosj_audio_map/range10'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).rom()', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 378, sourceColumn: 2, sourceEndLine: 378, rom: true};
MERGE (n:KG {id: 'machine:taitosj_state.nomcu'}) SET n:MachineConfig SET n += {cls: 'taitosj_state', name: 'nomcu', calls: [], stateMembers: ['{"name":"m_input_port_4_f0","bits":8}', '{"name":"m_kikstart_gears","bits":8,"arrayLength":2}', '{"name":"m_spacecr_prot_value","bits":8}', '{"name":"m_protection_value","bits":8}', '{"name":"m_address","bits":32}', '{"name":"m_soundlatch_data","bits":8}', '{"name":"m_soundlatch_flag","bits":1}', '{"name":"m_sound_semaphore2","bits":1}'], resetHandlers: ['taitosj_state.machine_reset'], startHandlers: ['taitosj_state.video_start'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1662, sourceColumn: 1, sourceEndLine: 1725};
MERGE (n:KG {id: 'handler:taitosj_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 30, sourceColumn: 1, sourceEndLine: 37, sourceParameters: '', sourceBody: '/* set the default ROM bank (many games only have one bank and
	   never write to the bank selector register) */
	bankswitch_w(0);

	m_spacecr_prot_value = 0;'};
MERGE (n:KG {id: 'handler:taitosj_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 164, sourceColumn: 1, sourceEndLine: 183, sourceParameters: '', sourceBody: 'm_sprite_layer_collbitmap1.allocate(16, 16);

	for (int i = 0; i < 3; i++)
	{
		m_layer_bitmap[i].allocate(32*8, 32*8);
		m_sprite_layer_collbitmap2[i].allocate(32*8, 32*8);
	}

	m_sprite_sprite_collbitmap1.allocate(32, 32);
	m_sprite_sprite_collbitmap2.allocate(32, 32);

	m_gfxdecode->gfx(0)->set_source(m_characterram);
	m_gfxdecode->gfx(1)->set_source(m_characterram);
	m_gfxdecode->gfx(2)->set_source(m_characterram + 0x1800);
	m_gfxdecode->gfx(3)->set_source(m_characterram + 0x1800);

	compute_draw_order();'};
MERGE (n:KG {id: 'handler:taitosj_state.compute_draw_order'}) SET n:Handler SET n += {method: 'compute_draw_order', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 137, sourceColumn: 1, sourceEndLine: 162, sourceParameters: '', sourceBody: 'uint8_t *color_prom = memregion("proms")->base();

	/* do a simple conversion of the PROM into layer priority order. Note that
	   this is a simplification, which assumes the PROM encodes a sensible priority
	   scheme. */
	for (int i = 0; i < 32; i++)
	{
		int mask = 0;   /* start with all four layers active, so we\'ll get the highest
		                   priority one in the first loop */
		for (int j = 3; j >= 0; j--)
		{
			int data = color_prom[0x10 * (i & 0x0f) + mask] & 0x0f;

			if (i & 0x10)
				data = data >> 2;
			else
				data = data & 0x03;

			mask |= (1 << data);    /* in next loop, we\'ll see which of the remaining
			                           layers has top priority when this one is transparent */
			m_draw_order[i][j] = data;
		}
	}'};
MERGE (n:KG {id: 'bank:taitosj_state.nomcu/mainbank/0'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 0, entries: 1, region: 'maincpu', offset: 24576, stride: 0, raw: 'm_mainbank->configure_entry(0, memregion("maincpu")->base() + 0x6000)', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 21, sourceColumn: 1, sourceEndLine: 28};
MERGE (n:KG {id: 'bank:taitosj_state.nomcu/mainbank/1'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 1, entries: 1, region: 'maincpu', offset: 65536, stride: 0, raw: 'm_mainbank->configure_entry(1, memregion("maincpu")->base() + 0x10000)', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 21, sourceColumn: 1, sourceEndLine: 28};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 4000000, config: ['Z80(config, m_maincpu, 8_MHz_XTAL / 2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &taitosj_state::main_nomcu_map)', 'm_maincpu->busack_cb().set(m_mcu, FUNC(taito_sj_security_mcu_device::busak_w))'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1665, sourceColumn: 2, sourceEndLine: 1665};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3000000, config: ['Z80(config, m_audiocpu, 12_MHz_XTAL / 4)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &taitosj_state::taitosj_audio_map)', 'm_audiocpu->set_periodic_int(FUNC(taitosj_state::irq0_line_hold), attotime::from_hz(12_MHz_XTAL / (2*4*16*16*10*16)))'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1668, sourceColumn: 2, sourceEndLine: 1668};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/audiocpu/callback:audiocpu:0'}) SET n:Callback SET n += {signal: 'set_periodic_int', operation: 'set_periodic_int', raw: 'm_audiocpu->set_periodic_int(FUNC(taitosj_state::irq0_line_hold), attotime::from_hz(12_MHz_XTAL / (2*4*16*16*10*16)))', ownerTag: 'audiocpu', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1674, sourceColumn: 2, sourceEndLine: 1674, periodHz: 36.62109375, periodExpr: 'attotime::from_hz(12_MHz_XTAL / (2*4*16*16*10*16))', targetClass: 'taitosj_state', targetMethod: 'irq0_line_hold'};
MERGE (n:KG {id: 'handler:taitosj_state.irq0_line_hold'}) SET n:Handler SET n += {method: 'irq0_line_hold', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1674, sourceColumn: 2, sourceEndLine: 1674};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(12_MHz_XTAL / 2, 384, 0, 256, 264, 16, 240)', 'm_screen->set_screen_update(FUNC(taitosj_state::screen_update))', 'm_screen->set_video_attributes(VIDEO_ALWAYS_UPDATE)', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set_inputline(m_maincpu, INPUT_LINE_IRQ0, HOLD_LINE)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1677, sourceColumn: 2, sourceEndLine: 1677, configCalls: ['set_raw(6000000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 264, 16, 240], screenRawExpr: ['12_MHz_XTAL / 2', '384', '0', '256', '264', '16', '240'], screenVideoAttributes: ['VIDEO_ALWAYS_UPDATE']};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(taitosj_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1679, sourceColumn: 2, sourceEndLine: 1679, targetClass: 'taitosj_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:taitosj_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 691, sourceColumn: 1, sourceEndLine: 694, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'return video_update_common(bitmap, cliprect, &taitosj_state::copy_layer);'};
MERGE (n:KG {id: 'handler:taitosj_state.video_update_common'}) SET n:Handler SET n += {method: 'video_update_common', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 674, sourceColumn: 1, sourceEndLine: 688, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, copy_layer_func_t copy_layer_func', sourceBody: 'int sprites_on[0x20]; // 1 if sprite is active
	rectangle sprite_areas[0x20]; // areas on bitmap (sprite locations)

	calculate_sprite_areas(sprites_on, sprite_areas);
	set_pens();

	draw_layers();

	copy_layers(bitmap, cliprect, copy_layer_func, sprites_on, sprite_areas);
	check_collision(sprites_on, sprite_areas);

	return 0;'};
MERGE (n:KG {id: 'handler:taitosj_state.calculate_sprite_areas'}) SET n:Handler SET n += {method: 'calculate_sprite_areas', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 378, sourceColumn: 1, sourceEndLine: 416, sourceParameters: 'int *sprites_on, rectangle *sprite_areas', sourceBody: 'for (int which = 0; which < 0x20; which++)
	{
		uint8_t sx, sy;

		if ((which >= 0x10) && (which <= 0x17)) continue; // no sprites here

		if (get_sprite_xy(which, &sx, &sy))
		{
			int minx, miny, maxx, maxy;

			if (GLOBAL_FLIP_X)
				sx = 238 - sx;

			if (GLOBAL_FLIP_Y)
				sy = 242 - sy;

			minx = sx;
			miny = sy;

			maxx = minx + 15;
			maxy = miny + 15;

			sprite_areas[which].min_x = minx;
			sprite_areas[which].max_x = maxx;
			sprite_areas[which].min_y = miny;
			sprite_areas[which].max_y = maxy;

			sprites_on[which] = 1;
		}
		// sprite is off
		else
			sprites_on[which] = 0;

		// check for bitmap bounds to avoid illegal memory access
		sprite_areas[which] &= m_sprite_layer_collbitmap2[0].cliprect();
	}'};
MERGE (n:KG {id: 'handler:taitosj_state.get_sprite_xy'}) SET n:Handler SET n += {method: 'get_sprite_xy', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 242, sourceColumn: 1, sourceEndLine: 250, sourceParameters: 'uint8_t which, uint8_t* sx, uint8_t* sy', sourceBody: 'offs_t offs = which * 4;

	*sx = m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs + 0] - 1;
	*sy = 240 - m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs + 1];

	return (*sy < 240);'};
MERGE (n:KG {id: 'handler:taitosj_state.set_pens'}) SET n:Handler SET n += {method: 'set_pens', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 92, sourceColumn: 1, sourceEndLine: 129, sourceParameters: '', sourceBody: 'double rweights[3], gweights[3], bweights[3];

	// compute the color output resistor weights
	compute_resistor_weights(0, 255, -1.0,
			3, resistances, rweights, 0, 0,
			3, resistances, gweights, 0, 0,
			3, resistances, bweights, 0, 0);

	for (int i = 0; i < 0x40; i++)
	{
		// red component
		int val = m_paletteram[(i << 1) | 0x01];
		int bit0 = (~val >> 6) & 0x01;
		int bit1 = (~val >> 7) & 0x01;
		val = m_paletteram[(i << 1) | 0x00];
		int bit2 = (~val >> 0) & 0x01;
		int r = combine_weights(rweights, bit0, bit1, bit2);

		// green component
		val = m_paletteram[(i << 1) | 0x01];
		bit0 = (~val >> 3) & 0x01;
		bit1 = (~val >> 4) & 0x01;
		bit2 = (~val >> 5) & 0x01;
		int g = combine_weights(gweights, bit0, bit1, bit2);

		// blue component
		val = m_paletteram[(i << 1) | 0x01];
		bit0 = (~val >> 0) & 0x01;
		bit1 = (~val >> 1) & 0x01;
		bit2 = (~val >> 2) & 0x01;
		int b = combine_weights(bweights, bit0, bit1, bit2);

		m_palette->set_pen_color(i, rgb_t(r, g, b));
	}'};
MERGE (n:KG {id: 'handler:taitosj_state.draw_layers'}) SET n:Handler SET n += {method: 'draw_layers', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 478, sourceColumn: 1, sourceEndLine: 510, sourceConstants: ['TRANSPARENT_PEN=64'], sourceParameters: '', sourceBody: 'm_layer_bitmap[0].fill(TRANSPARENT_PEN);
	m_layer_bitmap[1].fill(TRANSPARENT_PEN);
	m_layer_bitmap[2].fill(TRANSPARENT_PEN);

	for (offs_t offs = 0; offs < 0x0400; offs++)
	{
		int sx = offs % 32;
		int sy = offs / 32;

		if (GLOBAL_FLIP_X) sx = 31 - sx;
		if (GLOBAL_FLIP_Y) sy = 31 - sy;

		m_gfxdecode->gfx(m_colorbank[0] & 0x08 ? 2 : 0)->transpen(m_layer_bitmap[0], m_layer_bitmap[0].cliprect(),
				m_videoram[0][offs],
				m_colorbank[0] & 0x07,
				GLOBAL_FLIP_X, GLOBAL_FLIP_Y,
				8 * sx, 8 * sy, 0);

		m_gfxdecode->gfx(m_colorbank[0] & 0x80 ? 2 : 0)->transpen(m_layer_bitmap[1], m_layer_bitmap[1].cliprect(),
				m_videoram[1][offs],
				(m_colorbank[0] >> 4) & 0x07,
				GLOBAL_FLIP_X, GLOBAL_FLIP_Y,
				8 * sx, 8 * sy, 0);

		m_gfxdecode->gfx(m_colorbank[1] & 0x08 ? 2 : 0)->transpen(m_layer_bitmap[2], m_layer_bitmap[2].cliprect(),
				m_videoram[2][offs],
				m_colorbank[1] & 0x07,
				GLOBAL_FLIP_X, GLOBAL_FLIP_Y,
				8 * sx, 8 * sy, 0);
	}'};
MERGE (n:KG {id: 'handler:taitosj_state.copy_layers'}) SET n:Handler SET n += {method: 'copy_layers', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 650, sourceColumn: 1, sourceEndLine: 660, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, copy_layer_func_t copy_layer_func, int *sprites_on, rectangle *sprite_areas', sourceBody: '// fill the screen with the background color
	bitmap.fill(8 * (m_colorbank[1] & 0x07), cliprect);

	for (int i = 0; i < 4; i++)
	{
		int which = m_draw_order[*m_video_priority & 0x1f][i];
		copy_layer(bitmap, cliprect, copy_layer_func, which, sprites_on, sprite_areas);
	}'};
MERGE (n:KG {id: 'handler:taitosj_state.copy_layer'}) SET n:Handler SET n += {method: 'copy_layer', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 567, sourceColumn: 1, sourceEndLine: 601, sourceConstants: ['TRANSPARENT_PEN=64'], sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, int which, int *sprites_on, rectangle *sprite_areas', sourceBody: 'if (*m_video_mode & TABLE(which, 0x10, 0x20, 0x40))
	{
		int scrollx, scrolly[32];

		scrollx = m_scroll[2 * which];

		if (GLOBAL_FLIP_X)
			scrollx =  (scrollx & 0xf8) + ((scrollx + TABLE(which, 3, 1, -1)) & 7) + TABLE(which, 8, 10, 12);
		else
			scrollx = -(scrollx & 0xf8) + ((scrollx + TABLE(which, 3, 1, -1)) & 7) + TABLE(which, 8, 10, 12);

		if (GLOBAL_FLIP_Y)
			for (int i = 0; i < 32; i++)
				scrolly[31 - i] =  m_colscrolly[32 * which + i] + m_scroll[2 * which + 1];
		else
			for (int i = 0; i < 32; i++)
				scrolly[i]      = -m_colscrolly[32 * which + i] - m_scroll[2 * which + 1];

		copyscrollbitmap_trans(bitmap, m_layer_bitmap[which], 1, &scrollx, 32, scrolly, cliprect, TRANSPARENT_PEN);

		// store parts covered with sprites for sprites/layers collision detection
		for (int i = 0; i < 0x20; i++)
		{
			if ((i >= 0x10) && (i <= 0x17)) continue; // no sprites here

			if (sprites_on[i])
				copyscrollbitmap(m_sprite_layer_collbitmap2[which], m_layer_bitmap[which], 1, &scrollx, 32, scrolly, sprite_areas[i]);
		}
	}'};
MERGE (n:KG {id: 'handler:taitosj_state.check_collision'}) SET n:Handler SET n += {method: 'check_collision', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 663, sourceColumn: 1, sourceEndLine: 671, sourceParameters: 'int *sprites_on, rectangle *sprite_areas', sourceBody: 'check_sprite_sprite_collision();

	// check_sprite_layer_collision() uses drawn bitmaps, so it must me called _AFTER_ draw_layers()
	check_sprite_layer_collision(sprites_on, sprite_areas);

	// check_layer_layer_collision(); // not implemented !!!'};
MERGE (n:KG {id: 'handler:taitosj_state.check_sprite_sprite_collision'}) SET n:Handler SET n += {method: 'check_sprite_sprite_collision', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 322, sourceColumn: 1, sourceEndLine: 375, sourceParameters: '', sourceBody: 'if (SPRITES_ON)
	{
		// check each pair of sprites
		for (int which1 = 0; which1 < 0x20; which1++)
		{
			uint8_t sx1, sy1;

			if ((which1 >= 0x10) && (which1 <= 0x17)) continue; // no sprites here

			if (!get_sprite_xy(which1, &sx1, &sy1)) continue;

			for (int which2 = which1 + 1; which2 < 0x20; which2++)
			{
				uint8_t sx2, sy2;

				if ((which2 >= 0x10) && (which2 <= 0x17)) continue; // no sprites here

				if (!get_sprite_xy(which2, &sx2, &sy2)) continue;

				// quickly rule out any pairs that cannot be touching
				if ((abs((int8_t)sx1 - (int8_t)sx2) < 16) &&
					(abs((int8_t)sy1 - (int8_t)sy2) < 16))
				{
					int reg;

					if (!check_sprite_sprite_bitpattern(sx1, sy1, which1, sx2, sy2, which2)) continue;

					/* mark sprite as collided
					   note that only the sprite with the higher number is marked
					   as collided. This is how the hardware works and required
					   by Pirate Pete to be able to finish the last round. */

					// the last sprite has to be moved at the start of the list
					if (which2 == 0x1f)
					{
						reg = which1 >> 3;
						if (reg == 3) reg = 2;

						m_collision_reg[reg] |= (1 << (which1 & 0x07));
					}
					else
					{
						reg = which2 >> 3;
						if (reg == 3) reg = 2;

						m_collision_reg[reg] |= (1 << (which2 & 0x07));
					}
				}
			}
		}
	}'};
MERGE (n:KG {id: 'handler:taitosj_state.check_sprite_sprite_bitpattern'}) SET n:Handler SET n += {method: 'check_sprite_sprite_bitpattern', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 261, sourceColumn: 1, sourceEndLine: 319, sourceConstants: ['TRANSPARENT_PEN=64'], sourceParameters: 'int sx1, int sy1, int which1, int sx2, int sy2, int which2', sourceBody: 'int minx, miny, maxx = 16, maxy = 16;

	offs_t offs1 = which1 * 4;
	offs_t offs2 = which2 * 4;

	// normalize coordinates to (0,0) and compute overlap
	if (sx1 < sx2)
	{
		sx2 -= sx1;
		sx1 = 0;
		minx = sx2;
	}
	else
	{
		sx1 -= sx2;
		sx2 = 0;
		minx = sx1;
	}

	if (sy1 < sy2)
	{
		sy2 -= sy1;
		sy1 = 0;
		miny = sy2;
	}
	else
	{
		sy1 -= sy2;
		sy2 = 0;
		miny = sy1;
	}

	// draw the sprites into separate bitmaps and check overlapping region
	m_sprite_sprite_collbitmap1.fill(TRANSPARENT_PEN);
	get_sprite_gfx_element(which1)->transpen(m_sprite_sprite_collbitmap1, m_sprite_sprite_collbitmap1.cliprect(),
			m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs1 + 3] & 0x3f,
			0,
			m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs1 + 2] & 0x01,
			m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs1 + 2] & 0x02,
			sx1, sy1, 0);

	m_sprite_sprite_collbitmap2.fill(TRANSPARENT_PEN);
	get_sprite_gfx_element(which2)->transpen(m_sprite_sprite_collbitmap2, m_sprite_sprite_collbitmap2.cliprect(),
			m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs2 + 3] & 0x3f,
			0,
			m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs2 + 2] & 0x01,
			m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs2 + 2] & 0x02,
			sx2, sy2, 0);

	for (int y = miny; y < maxy; y++)
		for (int x = minx; x < maxx; x++)
			if ((m_sprite_sprite_collbitmap1.pix(y, x) != TRANSPARENT_PEN) &&
				(m_sprite_sprite_collbitmap2.pix(y, x) != TRANSPARENT_PEN))
				return 1; // collided

	return 0;'};
MERGE (n:KG {id: 'handler:taitosj_state.get_sprite_gfx_element'}) SET n:Handler SET n += {method: 'get_sprite_gfx_element', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 253, sourceColumn: 1, sourceEndLine: 258, sourceParameters: 'uint8_t which', sourceBody: 'offs_t offs = which * 4;

	return m_gfxdecode->gfx((m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs + 3] & 0x40) ? 3 : 1);'};
MERGE (n:KG {id: 'handler:taitosj_state.check_sprite_layer_collision'}) SET n:Handler SET n += {method: 'check_sprite_layer_collision', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 462, sourceColumn: 1, sourceEndLine: 475, sourceParameters: 'int *sprites_on, rectangle *sprite_areas', sourceBody: 'if (SPRITES_ON)
	{
		// check each sprite
		for (int which = 0; which < 0x20; which++)
		{
			if ((which >= 0x10) && (which <= 0x17)) continue; // no sprites here

			if (sprites_on[which])
				m_collision_reg[3] |= check_sprite_layer_bitpattern(which, sprite_areas);
		}
	}'};
MERGE (n:KG {id: 'handler:taitosj_state.check_sprite_layer_bitpattern'}) SET n:Handler SET n += {method: 'check_sprite_layer_bitpattern', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_v.cpp', sourceLine: 419, sourceColumn: 1, sourceEndLine: 459, sourceConstants: ['TRANSPARENT_PEN=64'], sourceParameters: 'int which, rectangle *sprite_areas', sourceBody: 'offs_t offs = which * 4;
	int result = 0;  // no collisions

	int check_layer_1 = *m_video_mode & TABLE(0, 0x10, 0x20, 0x40);
	int check_layer_2 = *m_video_mode & TABLE(1, 0x10, 0x20, 0x40);
	int check_layer_3 = *m_video_mode & TABLE(2, 0x10, 0x20, 0x40);

	int minx = sprite_areas[which].min_x;
	int miny = sprite_areas[which].min_y;
	int maxx = sprite_areas[which].max_x + 1;
	int maxy = sprite_areas[which].max_y + 1;

	int flip_x = (m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs + 2] & 0x01) ^ GLOBAL_FLIP_X;
	int flip_y = (m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs + 2] & 0x02) ^ GLOBAL_FLIP_Y;

	// draw sprite into a bitmap and check if layers collide
	m_sprite_layer_collbitmap1.fill(TRANSPARENT_PEN);
	get_sprite_gfx_element(which)->transpen(m_sprite_layer_collbitmap1, m_sprite_layer_collbitmap1.cliprect(),
			m_spriteram[SPRITE_RAM_PAGE_OFFSET + offs + 3] & 0x3f,
			0,
			flip_x, flip_y,
			0, 0, 0);

	for (int y = miny; y < maxy; y++)
		for (int x = minx; x < maxx; x++)
			if (m_sprite_layer_collbitmap1.pix(y - miny, x - minx) != TRANSPARENT_PEN) // is there anything to check for ?
			{
				if (check_layer_1 && (m_sprite_layer_collbitmap2[0].pix(y, x) != TRANSPARENT_PEN))
					result |= 0x01; // collided with layer 1

				if (check_layer_2 && (m_sprite_layer_collbitmap2[1].pix(y, x) != TRANSPARENT_PEN))
					result |= 0x02; // collided with layer 2

				if (check_layer_3 && (m_sprite_layer_collbitmap2[2].pix(y, x) != TRANSPARENT_PEN))
					result |= 0x04; // collided with layer 3
			}

	return result;'};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set_inputline', raw: 'm_screen->screen_vblank().set_inputline(m_maincpu, INPUT_LINE_IRQ0, HOLD_LINE)', ownerTag: 'screen', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1682, sourceColumn: 2, sourceEndLine: 1682, inputLine: 'INPUT_LINE_IRQ0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_taitosj)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1684, sourceColumn: 2, sourceEndLine: 1684, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_entries(64)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1685, sourceColumn: 2, sourceEndLine: 1685};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1688, sourceColumn: 2, sourceEndLine: 1688};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/soundnmi1'}) SET n:Device SET n += {type: 'INPUT_MERGER_ALL_HIGH', tag: 'soundnmi1', clock: null, config: ['INPUT_MERGER_ALL_HIGH(config, m_soundnmi[0]).output_handler().set(m_soundnmi[1], FUNC(input_merger_device::in_w<0>))'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1690, sourceColumn: 2, sourceEndLine: 1690};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/soundnmi1/callback:soundnmi1:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set', raw: 'INPUT_MERGER_ALL_HIGH(config, m_soundnmi[0]).output_handler().set(m_soundnmi[1], FUNC(input_merger_device::in_w<0>))', ownerTag: 'soundnmi1', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1690, sourceColumn: 2, sourceEndLine: 1690, targetClass: 'input_merger_device', targetMethod: 'in_w_0', targetTag: 'soundnmi2'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_0'}) SET n:Handler SET n += {method: 'in_w_0', ownerClass: 'input_merger_device', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1690, sourceColumn: 2, sourceEndLine: 1690};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/soundnmi2'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'soundnmi2', clock: null, config: ['INPUT_MERGER_ANY_HIGH(config, m_soundnmi[1]).output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1692, sourceColumn: 2, sourceEndLine: 1692};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/soundnmi2/callback:soundnmi2:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'INPUT_MERGER_ANY_HIGH(config, m_soundnmi[1]).output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)', ownerTag: 'soundnmi2', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1692, sourceColumn: 2, sourceEndLine: 1692, inputLine: 'INPUT_LINE_NMI', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay1'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay1', clock: 1500000, config: ['AY8910(config, m_ay[0], 12_MHz_XTAL / 8)', 'm_ay[0]->port_a_read_callback().set_ioport("DSW2")', 'm_ay[0]->port_b_read_callback().set_ioport("DSW3")', 'm_ay[0]->add_route(ALL_OUTPUTS, "speaker", 0.15)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1694, sourceColumn: 2, sourceEndLine: 1694};
MERGE (n:KG {id: 'audioroute:device:taitosj_state.nomcu/ay1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.15, raw: 'm_ay[0]->add_route(ALL_OUTPUTS, "speaker", 0.15)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1697, sourceColumn: 2, sourceEndLine: 1697};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay1/callback:ay1:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set_ioport', raw: 'm_ay[0]->port_a_read_callback().set_ioport("DSW2")', ownerTag: 'ay1', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1695, sourceColumn: 2, sourceEndLine: 1695, targetTag: 'DSW2', targetPort: 'DSW2'};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay1/callback:ay1:1'}) SET n:Callback SET n += {signal: 'port_b_read_callback', operation: 'set_ioport', raw: 'm_ay[0]->port_b_read_callback().set_ioport("DSW3")', ownerTag: 'ay1', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1696, sourceColumn: 2, sourceEndLine: 1696, targetTag: 'DSW3', targetPort: 'DSW3'};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay2'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay2', clock: 1500000, config: ['AY8910(config, m_ay[1], 12_MHz_XTAL / 8)', 'm_ay[1]->set_flags(AY8910_SINGLE_OUTPUT)', 'm_ay[1]->port_a_write_callback().set(m_dac, FUNC(dac_byte_interface::data_w))', 'm_ay[1]->port_b_write_callback().set(FUNC(taitosj_state::dacvol_w))', 'm_ay[1]->add_route(ALL_OUTPUTS, "speaker", 0.5)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1699, sourceColumn: 2, sourceEndLine: 1699, configCalls: ['set_flags(2)']};
MERGE (n:KG {id: 'audioroute:device:taitosj_state.nomcu/ay2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.5, raw: 'm_ay[1]->add_route(ALL_OUTPUTS, "speaker", 0.5)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1703, sourceColumn: 2, sourceEndLine: 1703};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay2/callback:ay2:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set', raw: 'm_ay[1]->port_a_write_callback().set(m_dac, FUNC(dac_byte_interface::data_w))', ownerTag: 'ay2', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1701, sourceColumn: 2, sourceEndLine: 1701, targetClass: 'dac_byte_interface', targetMethod: 'data_w', targetTag: 'dac'};
MERGE (n:KG {id: 'handler:dac_byte_interface.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'dac_byte_interface', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1701, sourceColumn: 2, sourceEndLine: 1701};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay2/callback:ay2:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'm_ay[1]->port_b_write_callback().set(FUNC(taitosj_state::dacvol_w))', ownerTag: 'ay2', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1702, sourceColumn: 2, sourceEndLine: 1702, targetClass: 'taitosj_state', targetMethod: 'dacvol_w'};
MERGE (n:KG {id: 'handler:taitosj_state.dacvol_w'}) SET n:Handler SET n += {method: 'dacvol_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1657, sourceColumn: 1, sourceEndLine: 1660, sourceParameters: 'uint8_t data', sourceBody: 'm_dacvol->write(NODE_01, data ^ 0xff); // 7416 hex inverter'};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay3'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay3', clock: 1500000, config: ['AY8910(config, m_ay[2], 12_MHz_XTAL / 8)', 'm_ay[2]->set_flags(AY8910_SINGLE_OUTPUT)', 'm_ay[2]->port_a_write_callback().set(FUNC(taitosj_state::input_port_4_f0_w))', 'm_ay[2]->add_route(ALL_OUTPUTS, "speaker", 0.5)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1705, sourceColumn: 2, sourceEndLine: 1705, configCalls: ['set_flags(2)']};
MERGE (n:KG {id: 'audioroute:device:taitosj_state.nomcu/ay3/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.5, raw: 'm_ay[2]->add_route(ALL_OUTPUTS, "speaker", 0.5)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1708, sourceColumn: 2, sourceEndLine: 1708};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay3/callback:ay3:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set', raw: 'm_ay[2]->port_a_write_callback().set(FUNC(taitosj_state::input_port_4_f0_w))', ownerTag: 'ay3', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1707, sourceColumn: 2, sourceEndLine: 1707, targetClass: 'taitosj_state', targetMethod: 'input_port_4_f0_w'};
MERGE (n:KG {id: 'handler:taitosj_state.input_port_4_f0_w'}) SET n:Handler SET n += {method: 'input_port_4_f0_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 187, sourceColumn: 1, sourceEndLine: 190, sourceParameters: 'uint8_t data', sourceBody: 'm_input_port_4_f0 = data >> 4;'};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay4'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay4', clock: 1500000, config: ['AY8910(config, m_ay[3], 12_MHz_XTAL / 8)', 'm_ay[3]->set_flags(AY8910_SINGLE_OUTPUT)', 'm_ay[3]->port_b_write_callback().set(FUNC(taitosj_state::sndnmi_msk_w))', 'm_ay[3]->add_route(ALL_OUTPUTS, "speaker", 1.0)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1710, sourceColumn: 2, sourceEndLine: 1710, configCalls: ['set_flags(2)']};
MERGE (n:KG {id: 'audioroute:device:taitosj_state.nomcu/ay4/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'm_ay[3]->add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1716, sourceColumn: 2, sourceEndLine: 1716};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/ay4/callback:ay4:0'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'm_ay[3]->port_b_write_callback().set(FUNC(taitosj_state::sndnmi_msk_w))', ownerTag: 'ay4', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1715, sourceColumn: 2, sourceEndLine: 1715, targetClass: 'taitosj_state', targetMethod: 'sndnmi_msk_w'};
MERGE (n:KG {id: 'handler:taitosj_state.sndnmi_msk_w'}) SET n:Handler SET n += {method: 'sndnmi_msk_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 175, sourceColumn: 1, sourceEndLine: 179, sourceParameters: 'uint8_t data', sourceBody: '// B0 is the sound nmi enable, active low
	m_soundnmi[0]->in_w<0>((~data) & 1);'};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count("screen", 128)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1718, sourceColumn: 2, sourceEndLine: 1718};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/dac'}) SET n:Device SET n += {type: 'DAC_8BIT_R2R', tag: 'dac', clock: null, config: ['DAC_8BIT_R2R(config, m_dac).add_route(ALL_OUTPUTS, "speaker", 0.15)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1720, sourceColumn: 2, sourceEndLine: 1720};
MERGE (n:KG {id: 'audioroute:device:taitosj_state.nomcu/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.15, raw: 'DAC_8BIT_R2R(config, m_dac).add_route(ALL_OUTPUTS, "speaker", 0.15)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1720, sourceColumn: 2, sourceEndLine: 1720};
MERGE (n:KG {id: 'device:taitosj_state.nomcu/dacvol'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'dacvol', clock: null, config: ['DISCRETE(config, m_dacvol, taitosj_dacvol_discrete)', 'm_dacvol->set_clock(48000 * 32)', 'm_dacvol->add_route(0, "dac", 1.0, DAC_INPUT_RANGE_HI)', 'm_dacvol->add_route(0, "dac", -1.0, DAC_INPUT_RANGE_LO)'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1721, sourceColumn: 2, sourceEndLine: 1721, configCalls: ['set_clock(1536000)'], clockExpr: 'taitosj_dacvol_discrete'};
MERGE (n:KG {id: 'audioroute:device:taitosj_state.nomcu/dacvol/0'}) SET n:AudioRoute SET n += {output: '0', target: 'dac', gain: 1, input: 0, raw: 'm_dacvol->add_route(0, "dac", 1.0, DAC_INPUT_RANGE_HI)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1723, sourceColumn: 2, sourceEndLine: 1723};
MERGE (n:KG {id: 'audioroute:device:taitosj_state.nomcu/dacvol/1'}) SET n:AudioRoute SET n += {output: '0', target: 'dac', gain: -1, input: 1, raw: 'm_dacvol->add_route(0, "dac", -1.0, DAC_INPUT_RANGE_LO)', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1724, sourceColumn: 2, sourceEndLine: 1724};
MERGE (n:KG {id: 'machine:taitosj_state.mcu'}) SET n:MachineConfig SET n += {cls: 'taitosj_state', name: 'mcu', calls: ['nomcu'], stateMembers: ['{"name":"m_input_port_4_f0","bits":8}', '{"name":"m_kikstart_gears","bits":8,"arrayLength":2}', '{"name":"m_spacecr_prot_value","bits":8}', '{"name":"m_protection_value","bits":8}', '{"name":"m_address","bits":32}', '{"name":"m_soundlatch_data","bits":8}', '{"name":"m_soundlatch_flag","bits":1}', '{"name":"m_sound_semaphore2","bits":1}'], resetHandlers: ['taitosj_state.machine_reset'], startHandlers: ['taitosj_state.video_start'], devicePatches: ['{"tag":"maincpu","config":["m_maincpu->busack_cb().set(m_mcu, FUNC(taito_sj_security_mcu_device::busak_w))"]}'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1729, sourceColumn: 1, sourceEndLine: 1745};
MERGE (n:KG {id: 'bank:taitosj_state.mcu/mainbank/0'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 0, entries: 1, region: 'maincpu', offset: 24576, stride: 0, raw: 'm_mainbank->configure_entry(0, memregion("maincpu")->base() + 0x6000)', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 21, sourceColumn: 1, sourceEndLine: 28};
MERGE (n:KG {id: 'bank:taitosj_state.mcu/mainbank/1'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 1, entries: 1, region: 'maincpu', offset: 65536, stride: 0, raw: 'm_mainbank->configure_entry(1, memregion("maincpu")->base() + 0x10000)', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 21, sourceColumn: 1, sourceEndLine: 28};
MERGE (n:KG {id: 'machine:taitosj_state.mcu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'busack_cb', operation: 'set', raw: 'm_maincpu->busack_cb().set(m_mcu, FUNC(taito_sj_security_mcu_device::busak_w))', ownerTag: 'maincpu', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1734, sourceColumn: 2, sourceEndLine: 1734, targetClass: 'taito_sj_security_mcu_device', targetMethod: 'busak_w', targetTag: 'mcu'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.busak_w'}) SET n:Handler SET n += {method: 'busak_w', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 73, sourceColumn: 1, sourceEndLine: 76, sourceParameters: 'int state', sourceBody: 'm_busak = (ASSERT_LINE == state);'};
MERGE (n:KG {id: 'device:taitosj_state.mcu/mcu'}) SET n:Device SET n += {type: 'TAITO_SJ_SECURITY_MCU', tag: 'mcu', clock: 3000000, config: ['TAITO_SJ_SECURITY_MCU(config, m_mcu, 3_MHz_XTAL)', 'm_mcu->set_int_mode(taito_sj_security_mcu_device::int_mode::LATCH)', 'm_mcu->m68read_cb().set(FUNC(taitosj_state::mcu_mem_r))', 'm_mcu->m68write_cb().set(FUNC(taitosj_state::mcu_mem_w))', 'm_mcu->m68intrq_cb().set(FUNC(taitosj_state::mcu_intrq_w))', 'm_mcu->busrq_cb().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)'], cls: 'taito_sj_security_mcu_device', clsHierarchy: ['taito_sj_security_mcu_device'], sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1737, sourceColumn: 2, sourceEndLine: 1737};
MERGE (n:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'm68read_cb', operation: 'set', raw: 'm_mcu->m68read_cb().set(FUNC(taitosj_state::mcu_mem_r))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1739, sourceColumn: 2, sourceEndLine: 1739, targetClass: 'taitosj_state', targetMethod: 'mcu_mem_r'};
MERGE (n:KG {id: 'handler:taitosj_state.mcu_mem_r'}) SET n:Handler SET n += {method: 'mcu_mem_r', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 94, sourceColumn: 1, sourceEndLine: 97, sourceParameters: 'offs_t offset', sourceBody: 'return m_maincpu->space(AS_PROGRAM).read_byte(offset);'};
MERGE (n:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'm68write_cb', operation: 'set', raw: 'm_mcu->m68write_cb().set(FUNC(taitosj_state::mcu_mem_w))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1740, sourceColumn: 2, sourceEndLine: 1740, targetClass: 'taitosj_state', targetMethod: 'mcu_mem_w'};
MERGE (n:KG {id: 'handler:taitosj_state.mcu_mem_w'}) SET n:Handler SET n += {method: 'mcu_mem_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 99, sourceColumn: 1, sourceEndLine: 102, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_maincpu->space(AS_PROGRAM).write_byte(offset, data);'};
MERGE (n:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'm68intrq_cb', operation: 'set', raw: 'm_mcu->m68intrq_cb().set(FUNC(taitosj_state::mcu_intrq_w))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1741, sourceColumn: 2, sourceEndLine: 1741, targetClass: 'taitosj_state', targetMethod: 'mcu_intrq_w'};
MERGE (n:KG {id: 'handler:taitosj_state.mcu_intrq_w'}) SET n:Handler SET n += {method: 'mcu_intrq_w', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 104, sourceColumn: 1, sourceEndLine: 109, sourceParameters: 'int state', sourceBody: '// FIXME: there\'s a logic network here that makes this edge sensitive or something and mixes it with other interrupt sources
	if (CLEAR_LINE != state)
		LOG(("68705  68INTRQ **NOT SUPPORTED**!\\n"));'};
MERGE (n:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'busrq_cb', operation: 'set_inputline', raw: 'm_mcu->busrq_cb().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)', ownerTag: 'mcu', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1742, sourceColumn: 2, sourceEndLine: 1742, inputLine: 'Z80_INPUT_LINE_BUSREQ', targetTag: 'maincpu'};
MERGE (n:KG {id: 'machine:taito_sj_security_mcu_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'taito_sj_security_mcu_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_pa_val","bits":8}', '{"name":"m_pb_val","bits":8}', '{"name":"m_busak","bits":1}', '{"name":"m_reset","bits":1}', '{"name":"m_addr","bits":16}', '{"name":"m_mcu_data","bits":8}', '{"name":"m_host_data","bits":8}', '{"name":"m_read_data","bits":8}', '{"name":"m_zaccept","bits":1}', '{"name":"m_zready","bits":1}'], sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 121, sourceColumn: 1, sourceEndLine: 128};
MERGE (n:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'M68705P5', tag: 'mcu', clock: 3000000, config: ['M68705P5(config, m_mcu, DERIVED_CLOCK(1, 1))', 'm_mcu->porta_r().set(FUNC(taito_sj_security_mcu_device::mcu_pa_r))', 'm_mcu->portc_r().set(FUNC(taito_sj_security_mcu_device::mcu_pc_r))', 'm_mcu->porta_w().set(FUNC(taito_sj_security_mcu_device::mcu_pa_w))', 'm_mcu->portb_w().set(FUNC(taito_sj_security_mcu_device::mcu_pb_w))'], sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 123, sourceColumn: 2, sourceEndLine: 123};
MERGE (n:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'porta_r', operation: 'set', raw: 'm_mcu->porta_r().set(FUNC(taito_sj_security_mcu_device::mcu_pa_r))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 124, sourceColumn: 2, sourceEndLine: 124, targetClass: 'taito_sj_security_mcu_device', targetMethod: 'mcu_pa_r'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pa_r'}) SET n:Handler SET n += {method: 'mcu_pa_r', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 130, sourceColumn: 1, sourceEndLine: 133, sourceParameters: '', sourceBody: 'return get_bus_val();'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.get_bus_val'}) SET n:Handler SET n += {method: 'get_bus_val', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.h', sourceLine: 51, sourceColumn: 24, sourceEndLine: 55, sourceParameters: '', sourceBody: 'return (BIT(~m_pb_val, 1) ? m_host_data : 0xffU) & m_pa_val & ((m_busak && BIT(~m_pb_val, 5)) ? m_read_data : 0xffU);'};
MERGE (n:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'portc_r', operation: 'set', raw: 'm_mcu->portc_r().set(FUNC(taito_sj_security_mcu_device::mcu_pc_r))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 125, sourceColumn: 2, sourceEndLine: 125, targetClass: 'taito_sj_security_mcu_device', targetMethod: 'mcu_pc_r'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pc_r'}) SET n:Handler SET n += {method: 'mcu_pc_r', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 135, sourceColumn: 1, sourceEndLine: 142, sourceParameters: '', sourceBody: '// FIXME 68INTAK is on PC3 but we\'re ignoring it
	return
			(m_zready ? 0x01U : 0x00U) |
			(m_zaccept ? 0x02U : 0x00U) |
			(m_busak ? 0x00U : 0x04U);'};
MERGE (n:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'porta_w', operation: 'set', raw: 'm_mcu->porta_w().set(FUNC(taito_sj_security_mcu_device::mcu_pa_w))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 126, sourceColumn: 2, sourceEndLine: 126, targetClass: 'taito_sj_security_mcu_device', targetMethod: 'mcu_pa_w'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pa_w'}) SET n:Handler SET n += {method: 'mcu_pa_w', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 144, sourceColumn: 1, sourceEndLine: 149, sourceParameters: 'u8 data', sourceBody: 'm_pa_val = data;
	if (BIT(~m_pb_val, 6))
		m_addr = (m_addr & 0xff00U) | u16(get_bus_val());'};
MERGE (n:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'portb_w', operation: 'set', raw: 'm_mcu->portb_w().set(FUNC(taito_sj_security_mcu_device::mcu_pb_w))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 127, sourceColumn: 2, sourceEndLine: 127, targetClass: 'taito_sj_security_mcu_device', targetMethod: 'mcu_pb_w'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pb_w'}) SET n:Handler SET n += {method: 'mcu_pb_w', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 151, sourceColumn: 1, sourceEndLine: 206, sourceConstants: ['M68705_IRQ_LINE=0', 'LATCH=1'], sourceParameters: 'u8 data', sourceBody: 'bool inc_addr(false);
	u8 const diff(m_pb_val ^ data);

	// 68INTRQ
	if (BIT(diff, 0))
		m_68intrq_cb(BIT(data, 0) ? CLEAR_LINE : ASSERT_LINE);

	// 68LRD
	u8 const bus_val(get_bus_val());
	if (BIT(diff & data, 1))
	{
		machine().scheduler().synchronize(timer_expired_delegate(FUNC(taito_sj_security_mcu_device::do_mcu_read), this));
		if (int_mode::LATCH == m_int_mode)
			m_mcu->set_input_line(M68705_IRQ_LINE, CLEAR_LINE);
	}

	// 68LWR
	if (BIT(diff & data, 2))
		machine().scheduler().synchronize(timer_expired_delegate(FUNC(taito_sj_security_mcu_device::do_mcu_write), this), bus_val);

	// BUSRQ
	if (BIT(diff, 3))
		m_busrq_cb(BIT(data, 3) ? CLEAR_LINE : ASSERT_LINE);

	// 68WRITE
	if (BIT(diff, 4))
	{
		if (BIT(~data, 4))
			m_68write_cb(m_addr, bus_val);
		else if (BIT(data, 5))
			inc_addr = true;
	}

	// 68READ
	if (BIT(diff, 5))
	{
		if (BIT(~data, 5))
			m_read_data = m_68read_cb(m_addr);
		else if (BIT(data, 4))
			inc_addr = true;
	}

	// LAL
	if (BIT(~data, 6))
		m_addr = (m_addr & 0xff00U) | u16(bus_val);
	else if (inc_addr)
		m_addr = (m_addr & 0xff00U) | ((m_addr + 1) & 0x00ffU);

	// UAL
	if (BIT(~data, 7))
		m_addr = (m_addr & 0x00ffU) | (u16(bus_val) << 8);

	m_pb_val = data;'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.do_mcu_read'}) SET n:Handler SET n += {method: 'do_mcu_read', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 208, sourceColumn: 1, sourceEndLine: 211, sourceParameters: 'int param', sourceBody: 'm_zready = false;'};
MERGE (n:KG {id: 'handler:taito_sj_security_mcu_device.do_mcu_write'}) SET n:Handler SET n += {method: 'do_mcu_write', ownerClass: 'taito_sj_security_mcu_device', sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 213, sourceColumn: 1, sourceEndLine: 218, sourceParameters: 'int param', sourceBody: 'm_mcu_data = u8(param);
	if (!m_reset)
		m_zaccept = false;'};
MERGE (n:KG {id: 'handler:taitosj_state.input_port_4_f0_r'}) SET n:Handler SET n += {method: 'input_port_4_f0_r', ownerClass: 'taitosj_state', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 198, sourceColumn: 1, sourceEndLine: 201, sourceParameters: '', sourceBody: 'return m_input_port_4_f0;'};
MERGE (n:KG {id: 'inputs:elevator'}) SET n:InputPorts SET n += {name: 'elevator', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1119, sourceColumn: 8, sourceEndLine: 1119};
MERGE (n:KG {id: 'inputs:elevator/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:elevator/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:elevator/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:elevator/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:elevator/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:elevator/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:elevator/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:elevator/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:elevator/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:elevator/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:elevator/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:elevator/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:elevator/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:elevator/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:elevator/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:elevator/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:elevator/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:elevator/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:elevator/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:elevator/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 1};
MERGE (n:KG {id: 'inputs:elevator/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 2};
MERGE (n:KG {id: 'inputs:elevator/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 4};
MERGE (n:KG {id: 'inputs:elevator/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:elevator/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_COIN2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:elevator/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:elevator/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:elevator/IN2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START2', defaultValue: 128};
MERGE (n:KG {id: 'inputs:elevator/IN3'}) SET n:Port SET n += {tag: 'IN3', modify: false};
MERGE (n:KG {id: 'inputs:elevator/IN3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 1};
MERGE (n:KG {id: 'inputs:elevator/IN3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 2};
MERGE (n:KG {id: 'inputs:elevator/IN3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 4};
MERGE (n:KG {id: 'inputs:elevator/IN3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:elevator/IN3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_SERVICE1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:elevator/IN3/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_TILT', defaultValue: 32};
MERGE (n:KG {id: 'inputs:elevator/IN3/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:elevator/IN3/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:elevator/IN4'}) SET n:Port SET n += {tag: 'IN4', modify: false};
MERGE (n:KG {id: 'inputs:elevator/IN4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 15};
MERGE (n:KG {id: 'inputs:elevator/IN4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(taitosj_state::input_port_4_f0_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:elevator/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:elevator/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SWA:1,2")'], name: 'Bonus Life', defaultValue: 3, location: 'SWA:1,2', settings: ['3=10000', '2=15000', '1=20000', '0=25000']};
MERGE (n:KG {id: 'inputs:elevator/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SWA:3")'], name: 'Free Play', defaultValue: 4, location: 'SWA:3', settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:elevator/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 24, modifiers: ['PORT_DIPLOCATION("SWA:4,5")'], name: 'Lives', defaultValue: 24, location: 'SWA:4,5', settings: ['24=3', '16=4', '8=5', '0=6']};
MERGE (n:KG {id: 'inputs:elevator/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unknown', defaultValue: 32};
MERGE (n:KG {id: 'inputs:elevator/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SWA:7")'], name: 'Flip Screen', defaultValue: 64, location: 'SWA:7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:elevator/DSW1/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SWA:8")'], name: 'Cabinet', defaultValue: 0, location: 'SWA:8', settings: ['0=Upright', '128=Cocktail']};
MERGE (n:KG {id: 'inputs:elevator/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:elevator/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION("SWB:1,2,3,4")'], name: 'Coin A', defaultValue: 0, location: 'SWB:1,2,3,4', settings: ['15=9C 1C', '14=8C 1C', '13=7C 1C', '12=6C 1C', '11=5C 1C', '10=4C 1C', '9=3C 1C', '8=2C 1C', '0=1C 1C', '1=1C 2C', '2=1C 3C', '3=1C 4C', '4=1C 5C', '5=1C 6C', '6=1C 7C', '7=1C 8C']};
MERGE (n:KG {id: 'inputs:elevator/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION("SWB:5,6,7,8")'], name: 'Coin B', defaultValue: 0, location: 'SWB:5,6,7,8', settings: ['240=9C 1C', '224=8C 1C', '208=7C 1C', '192=6C 1C', '176=5C 1C', '160=4C 1C', '144=3C 1C', '128=2C 1C', '0=1C 1C', '16=1C 2C', '32=1C 3C', '48=1C 4C', '64=1C 5C', '80=1C 6C', '96=1C 7C', '112=1C 8C']};
MERGE (n:KG {id: 'inputs:elevator/DSW3'}) SET n:Port SET n += {tag: 'DSW3', modify: false};
MERGE (n:KG {id: 'inputs:elevator/DSW3/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SWC:1,2")'], name: 'Difficulty', defaultValue: 3, location: 'SWC:1,2', settings: ['3=Easiest', '2=Easy', '1=Normal', '0=Hard']};
MERGE (n:KG {id: 'inputs:elevator/DSW3/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Unknown', defaultValue: 4};
MERGE (n:KG {id: 'inputs:elevator/DSW3/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unknown', defaultValue: 8};
MERGE (n:KG {id: 'inputs:elevator/DSW3/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SWC:5")'], name: 'Coinage Display', defaultValue: 16, location: 'SWC:5', settings: ['16=Coins/Credits', '0=Insert Coin']};
MERGE (n:KG {id: 'inputs:elevator/DSW3/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SWC:6")'], name: 'Year Display', defaultValue: 32, location: 'SWC:6', settings: ['0=No', '32=Yes']};
MERGE (n:KG {id: 'inputs:elevator/DSW3/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SWC:7")'], name: 'Hit Detection', defaultValue: 64, location: 'SWC:7', settings: ['64=Normal Game', '0=No Hit']};
MERGE (n:KG {id: 'inputs:elevator/DSW3/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SWC:8")'], name: 'Coin Slots', defaultValue: 128, location: 'SWC:8', settings: ['128=A and B', '0=A only']};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 256, planes: 3, planeOffsets: [32768, 16384, 0], xOffsets: [7, 6, 5, 4, 3, 2, 1, 0], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 64, planes: 3, planeOffsets: [32768, 16384, 0], xOffsets: [7, 6, 5, 4, 3, 2, 1, 0, 71, 70, 69, 68, 67, 66, 65, 64], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 128, 136, 144, 152, 160, 168, 176, 184], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfx_taitosj'}) SET n:GfxDecode SET n += {name: 'gfx_taitosj', sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1634, sourceColumn: 8, sourceEndLine: 1634};
MERGE (n:KG {id: 'gfxdecode:gfx_taitosj/e0'}) SET n:GfxDecodeEntry SET n += {region: 'nullptr', offset: 36864, layout: 'charlayout', colorBase: 0, colorCount: 8, ram: true, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_taitosj/e1'}) SET n:GfxDecodeEntry SET n += {region: 'nullptr', offset: 36864, layout: 'spritelayout', colorBase: 0, colorCount: 8, ram: true, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_taitosj/e2'}) SET n:GfxDecodeEntry SET n += {region: 'nullptr', offset: 43008, layout: 'charlayout', colorBase: 0, colorCount: 8, ram: true, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_taitosj/e3'}) SET n:GfxDecodeEntry SET n += {region: 'nullptr', offset: 43008, layout: 'spritelayout', colorBase: 0, colorCount: 8, ram: true, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:elevator'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2849, sourceColumn: 1, sourceEndLine: 2849};
MATCH (a:KG {id: 'game:elevator'}), (b:KG {id: 'machine:taitosj_state.mcu'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:elevator'}), (b:KG {id: 'inputs:elevator'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:elevator'}), (b:KG {id: 'romset:elevator'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/taitosj.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/taitosj.cpp'}), (b:KG {id: 'file:taitosj.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/taitosj.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/taitosj.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.mcu'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1729, sourceColumn: 1, sourceEndLine: 1745};
MATCH (a:KG {id: 'machine:taitosj_state.mcu'}), (b:KG {id: 'handler:taitosj_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.mcu'}), (b:KG {id: 'handler:taitosj_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.mcu'}), (b:KG {id: 'machine:taitosj_state.nomcu'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:taitosj_state.mcu'}), (b:KG {id: 'bank:taitosj_state.mcu/mainbank/0'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.mcu'}), (b:KG {id: 'bank:taitosj_state.mcu/mainbank/1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.mcu'}), (b:KG {id: 'map:taitosj_state.main_mcu_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:taitosj_state.mcu'}), (b:KG {id: 'machine:taitosj_state.mcu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.mcu'}), (b:KG {id: 'device:taitosj_state.mcu/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:elevator'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1119, sourceColumn: 8, sourceEndLine: 1119};
MATCH (a:KG {id: 'inputs:elevator'}), (b:KG {id: 'inputs:elevator/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:elevator'}), (b:KG {id: 'inputs:elevator/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:elevator'}), (b:KG {id: 'inputs:elevator/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:elevator'}), (b:KG {id: 'inputs:elevator/IN3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:elevator'}), (b:KG {id: 'inputs:elevator/IN4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:elevator'}), (b:KG {id: 'inputs:elevator/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:elevator'}), (b:KG {id: 'inputs:elevator/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:elevator'}), (b:KG {id: 'inputs:elevator/DSW3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:elevator'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 2433, sourceColumn: 1, sourceEndLine: 2433};
MATCH (a:KG {id: 'romset:elevator'}), (b:KG {id: 'region:elevator/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:elevator'}), (b:KG {id: 'region:elevator/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:elevator'}), (b:KG {id: 'region:elevator/pal'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:elevator'}), (b:KG {id: 'region:elevator/bmcu:mcu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:elevator'}), (b:KG {id: 'region:elevator/gfx'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:elevator'}), (b:KG {id: 'region:elevator/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.machine_reset'}), (b:KG {id: 'handler:taitosj_state.bankswitch_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.video_start'}), (b:KG {id: 'handler:taitosj_state.compute_draw_order'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1662, sourceColumn: 1, sourceEndLine: 1725};
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'handler:taitosj_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'handler:taitosj_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'bank:taitosj_state.nomcu/mainbank/0'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'bank:taitosj_state.nomcu/mainbank/1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'gfxdecode:gfx_taitosj'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/soundnmi1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/soundnmi2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/ay1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/ay2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/ay3'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/ay4'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.nomcu'}), (b:KG {id: 'device:taitosj_state.nomcu/dacvol'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:taitosj_state.mcu/mainbank/0'}), (b:KG {id: 'file:src/mame/taito/taitosj_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 21, sourceColumn: 1, sourceEndLine: 28};
MATCH (a:KG {id: 'bank:taitosj_state.mcu/mainbank/1'}), (b:KG {id: 'file:src/mame/taito/taitosj_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 21, sourceColumn: 1, sourceEndLine: 28};
MATCH (a:KG {id: 'map:taitosj_state.main_mcu_map'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 247, sourceColumn: 1, sourceEndLine: 251};
MATCH (a:KG {id: 'map:taitosj_state.main_mcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_mcu_map'}), (b:KG {id: 'map:taitosj_state.main_mcu_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:taitosj_state.mcu/callback:maincpu:0'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.busak_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taitosj_state.mcu/mcu'}), (b:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.mcu/mcu'}), (b:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.mcu/mcu'}), (b:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.mcu/mcu'}), (b:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.mcu/mcu'}), (b:KG {id: 'machine:taito_sj_security_mcu_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN0'}), (b:KG {id: 'inputs:elevator/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN0'}), (b:KG {id: 'inputs:elevator/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN0'}), (b:KG {id: 'inputs:elevator/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN0'}), (b:KG {id: 'inputs:elevator/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN0'}), (b:KG {id: 'inputs:elevator/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN0'}), (b:KG {id: 'inputs:elevator/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN0'}), (b:KG {id: 'inputs:elevator/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN0'}), (b:KG {id: 'inputs:elevator/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN1'}), (b:KG {id: 'inputs:elevator/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN1'}), (b:KG {id: 'inputs:elevator/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN1'}), (b:KG {id: 'inputs:elevator/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN1'}), (b:KG {id: 'inputs:elevator/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN1'}), (b:KG {id: 'inputs:elevator/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN1'}), (b:KG {id: 'inputs:elevator/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN1'}), (b:KG {id: 'inputs:elevator/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN1'}), (b:KG {id: 'inputs:elevator/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN2'}), (b:KG {id: 'inputs:elevator/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN2'}), (b:KG {id: 'inputs:elevator/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN2'}), (b:KG {id: 'inputs:elevator/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN2'}), (b:KG {id: 'inputs:elevator/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN2'}), (b:KG {id: 'inputs:elevator/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN2'}), (b:KG {id: 'inputs:elevator/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN2'}), (b:KG {id: 'inputs:elevator/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN2'}), (b:KG {id: 'inputs:elevator/IN2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN3'}), (b:KG {id: 'inputs:elevator/IN3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN3'}), (b:KG {id: 'inputs:elevator/IN3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN3'}), (b:KG {id: 'inputs:elevator/IN3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN3'}), (b:KG {id: 'inputs:elevator/IN3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN3'}), (b:KG {id: 'inputs:elevator/IN3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN3'}), (b:KG {id: 'inputs:elevator/IN3/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN3'}), (b:KG {id: 'inputs:elevator/IN3/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN3'}), (b:KG {id: 'inputs:elevator/IN3/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN4'}), (b:KG {id: 'inputs:elevator/IN4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN4'}), (b:KG {id: 'inputs:elevator/IN4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW1'}), (b:KG {id: 'inputs:elevator/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW1'}), (b:KG {id: 'inputs:elevator/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW1'}), (b:KG {id: 'inputs:elevator/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW1'}), (b:KG {id: 'inputs:elevator/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW1'}), (b:KG {id: 'inputs:elevator/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW1'}), (b:KG {id: 'inputs:elevator/DSW1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW2'}), (b:KG {id: 'inputs:elevator/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW2'}), (b:KG {id: 'inputs:elevator/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW3'}), (b:KG {id: 'inputs:elevator/DSW3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW3'}), (b:KG {id: 'inputs:elevator/DSW3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW3'}), (b:KG {id: 'inputs:elevator/DSW3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW3'}), (b:KG {id: 'inputs:elevator/DSW3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW3'}), (b:KG {id: 'inputs:elevator/DSW3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW3'}), (b:KG {id: 'inputs:elevator/DSW3/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:elevator/DSW3'}), (b:KG {id: 'inputs:elevator/DSW3/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:elevator/maincpu'}), (b:KG {id: 'rom:elevator/maincpu/ba3__01.2764.ic1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/maincpu'}), (b:KG {id: 'rom:elevator/maincpu/ba3__02.2764.ic2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/maincpu'}), (b:KG {id: 'rom:elevator/maincpu/ba3__03-1.2764.ic3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/maincpu'}), (b:KG {id: 'rom:elevator/maincpu/ba3__04-1.2764.ic6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/audiocpu'}), (b:KG {id: 'rom:elevator/audiocpu/ba3__09.2732.ic70'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/audiocpu'}), (b:KG {id: 'rom:elevator/audiocpu/ba3__10.2732.ic71'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/pal'}), (b:KG {id: 'rom:elevator/pal/ww15.pal16l8.ic24.jed.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/bmcu:mcu'}), (b:KG {id: 'rom:elevator/bmcu:mcu/ba3__11.mc68705p3.ic24'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/gfx'}), (b:KG {id: 'rom:elevator/gfx/ba3__05.2764.ic4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/gfx'}), (b:KG {id: 'rom:elevator/gfx/ba3__06.2764.ic5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/gfx'}), (b:KG {id: 'rom:elevator/gfx/ba3__07.2764.ic9'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/gfx'}), (b:KG {id: 'rom:elevator/gfx/ba3__08.2764.ic10'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:elevator/proms'}), (b:KG {id: 'rom:elevator/proms/eb16.ic22'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'bank:taitosj_state.nomcu/mainbank/0'}), (b:KG {id: 'file:src/mame/taito/taitosj_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 21, sourceColumn: 1, sourceEndLine: 28};
MATCH (a:KG {id: 'bank:taitosj_state.nomcu/mainbank/1'}), (b:KG {id: 'file:src/mame/taito/taitosj_m.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj_m.cpp', sourceLine: 21, sourceColumn: 1, sourceEndLine: 28};
MATCH (a:KG {id: 'device:taitosj_state.nomcu/maincpu'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:taitosj_state.nomcu/audiocpu'}), (b:KG {id: 'device:taitosj_state.nomcu/audiocpu/callback:audiocpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/audiocpu'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:taitosj_state.nomcu/screen'}), (b:KG {id: 'device:taitosj_state.nomcu/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/screen'}), (b:KG {id: 'device:taitosj_state.nomcu/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_taitosj'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 1634, sourceColumn: 8, sourceEndLine: 1634};
MATCH (a:KG {id: 'gfxdecode:gfx_taitosj'}), (b:KG {id: 'gfxdecode:gfx_taitosj/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_taitosj'}), (b:KG {id: 'gfxdecode:gfx_taitosj/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_taitosj'}), (b:KG {id: 'gfxdecode:gfx_taitosj/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_taitosj'}), (b:KG {id: 'gfxdecode:gfx_taitosj/e3'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/soundnmi1'}), (b:KG {id: 'device:taitosj_state.nomcu/soundnmi1/callback:soundnmi1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/soundnmi2'}), (b:KG {id: 'device:taitosj_state.nomcu/soundnmi2/callback:soundnmi2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay1'}), (b:KG {id: 'audioroute:device:taitosj_state.nomcu/ay1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay1'}), (b:KG {id: 'device:taitosj_state.nomcu/ay1/callback:ay1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay1'}), (b:KG {id: 'device:taitosj_state.nomcu/ay1/callback:ay1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay2'}), (b:KG {id: 'audioroute:device:taitosj_state.nomcu/ay2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay2'}), (b:KG {id: 'device:taitosj_state.nomcu/ay2/callback:ay2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay2'}), (b:KG {id: 'device:taitosj_state.nomcu/ay2/callback:ay2:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay3'}), (b:KG {id: 'audioroute:device:taitosj_state.nomcu/ay3/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay3'}), (b:KG {id: 'device:taitosj_state.nomcu/ay3/callback:ay3:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay4'}), (b:KG {id: 'audioroute:device:taitosj_state.nomcu/ay4/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay4'}), (b:KG {id: 'device:taitosj_state.nomcu/ay4/callback:ay4:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/dac'}), (b:KG {id: 'audioroute:device:taitosj_state.nomcu/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/dacvol'}), (b:KG {id: 'audioroute:device:taitosj_state.nomcu/dacvol/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/dacvol'}), (b:KG {id: 'audioroute:device:taitosj_state.nomcu/dacvol/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/taitosj_m.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/taitosj_m.cpp'}), (b:KG {id: 'file:cpu/m6805/m6805.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/taitosj_m.cpp'}), (b:KG {id: 'file:taitosj.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 204, sourceColumn: 1, sourceEndLine: 243};
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range18'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range19'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range20'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range21'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range22'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range23'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range24'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range25'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range26'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range27'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range28'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range29'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range30'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range31'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range32'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range33'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range34'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range35'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map'}), (b:KG {id: 'map:taitosj_state.main_nomcu_map/range36'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_mcu_map/range0'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'mcu'};
MATCH (a:KG {id: 'map:taitosj_state.main_mcu_map/range0'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mcu'};
MATCH (a:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:0'}), (b:KG {id: 'handler:taitosj_state.mcu_mem_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:1'}), (b:KG {id: 'handler:taitosj_state.mcu_mem_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taitosj_state.mcu/mcu/callback:mcu:2'}), (b:KG {id: 'handler:taitosj_state.mcu_intrq_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:taito_sj_security_mcu_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/taito/taitosjsec.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosjsec.cpp', sourceLine: 121, sourceColumn: 1, sourceEndLine: 128};
MATCH (a:KG {id: 'machine:taito_sj_security_mcu_device.device_add_mconfig'}), (b:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:elevator/IN4/f1'}), (b:KG {id: 'handler:taitosj_state.input_port_4_f0_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/audiocpu/callback:audiocpu:0'}), (b:KG {id: 'handler:taitosj_state.irq0_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/taitosj.cpp', sourceLine: 366, sourceColumn: 1, sourceEndLine: 379};
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map'}), (b:KG {id: 'map:taitosj_state.taitosj_audio_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/screen/callback:screen:0'}), (b:KG {id: 'handler:taitosj_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/screen/callback:screen:1'}), (b:KG {id: 'device:taitosj_state.nomcu/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_taitosj/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_taitosj/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_taitosj/e2'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_taitosj/e3'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/soundnmi1/callback:soundnmi1:0'}), (b:KG {id: 'handler:input_merger_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/soundnmi2/callback:soundnmi2:0'}), (b:KG {id: 'device:taitosj_state.nomcu/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay2/callback:ay2:0'}), (b:KG {id: 'handler:dac_byte_interface.data_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay2/callback:ay2:1'}), (b:KG {id: 'handler:taitosj_state.dacvol_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay3/callback:ay3:0'}), (b:KG {id: 'handler:taitosj_state.input_port_4_f0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taitosj_state.nomcu/ay4/callback:ay4:0'}), (b:KG {id: 'handler:taitosj_state.sndnmi_msk_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range3'}), (b:KG {id: 'handler:taitosj_state.fake_data_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range3'}), (b:KG {id: 'handler:taitosj_state.fake_data_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range4'}), (b:KG {id: 'handler:taitosj_state.fake_status_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range5'}), (b:KG {id: 'handler:taitosj_state.characterram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range16'}), (b:KG {id: 'handler:taitosj_state.gfxrom_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range23'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range24'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range27'}), (b:KG {id: 'handler:taitosj_state.collision_reg_clear_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range29'}), (b:KG {id: 'handler:taitosj_state.soundlatch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range30'}), (b:KG {id: 'handler:taitosj_state.sound_semaphore2_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range31'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:taitosj_state.main_nomcu_map/range32'}), (b:KG {id: 'handler:taitosj_state.bankswitch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:taito_sj_security_mcu_device.data_w'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.do_host_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/taitosjsec.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/taitosjsec.cpp'}), (b:KG {id: 'file:taitosjsec.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range2'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range3'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range4'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay3'};
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range5'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay3'};
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range6'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay4'};
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range7'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay4'};
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range8'}), (b:KG {id: 'handler:taitosj_state.soundlatch_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range8'}), (b:KG {id: 'handler:taitosj_state.soundlatch_clear7_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range9'}), (b:KG {id: 'handler:taitosj_state.soundlatch_flags_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:taitosj_state.taitosj_audio_map/range9'}), (b:KG {id: 'handler:taitosj_state.sound_semaphore2_clear_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.screen_update'}), (b:KG {id: 'handler:taitosj_state.video_update_common'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/taito/taitosj.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.soundlatch_w'}), (b:KG {id: 'handler:taitosj_state.soundlatch_w_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.sound_semaphore2_w'}), (b:KG {id: 'handler:taitosj_state.sound_semaphore2_w_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:0'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pa_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:1'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pc_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:2'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pa_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:taito_sj_security_mcu_device.device_add_mconfig/mcu/callback:mcu:3'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.soundlatch_clear7_w'}), (b:KG {id: 'handler:taitosj_state.soundlatch_clear7_w_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.sound_semaphore2_clear_w'}), (b:KG {id: 'handler:taitosj_state.sound_semaphore2_clear_w_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.video_update_common'}), (b:KG {id: 'handler:taitosj_state.calculate_sprite_areas'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.video_update_common'}), (b:KG {id: 'handler:taitosj_state.set_pens'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.video_update_common'}), (b:KG {id: 'handler:taitosj_state.draw_layers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.video_update_common'}), (b:KG {id: 'handler:taitosj_state.copy_layers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.video_update_common'}), (b:KG {id: 'handler:taitosj_state.check_collision'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pa_r'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.get_bus_val'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pa_w'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.get_bus_val'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pb_w'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.get_bus_val'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pb_w'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.do_mcu_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taito_sj_security_mcu_device.mcu_pb_w'}), (b:KG {id: 'handler:taito_sj_security_mcu_device.do_mcu_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.calculate_sprite_areas'}), (b:KG {id: 'handler:taitosj_state.get_sprite_xy'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.copy_layers'}), (b:KG {id: 'handler:taitosj_state.copy_layer'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.check_collision'}), (b:KG {id: 'handler:taitosj_state.check_sprite_sprite_collision'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.check_collision'}), (b:KG {id: 'handler:taitosj_state.check_sprite_layer_collision'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.check_collision'}), (b:KG {id: 'handler:taitosj_state.draw_layers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.check_sprite_sprite_collision'}), (b:KG {id: 'handler:taitosj_state.get_sprite_xy'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.check_sprite_sprite_collision'}), (b:KG {id: 'handler:taitosj_state.check_sprite_sprite_bitpattern'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.check_sprite_layer_collision'}), (b:KG {id: 'handler:taitosj_state.check_sprite_layer_bitpattern'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.check_sprite_sprite_bitpattern'}), (b:KG {id: 'handler:taitosj_state.get_sprite_gfx_element'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taitosj_state.check_sprite_layer_bitpattern'}), (b:KG {id: 'handler:taitosj_state.get_sprite_gfx_element'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
