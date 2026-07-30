// mamekit knowledge graph — driver src/mame/midw8080/mw8080bw.cpp
// generated 2026-07-30T09:33:58.346Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/midw8080/mw8080bw.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:mw8080bw.h'}) SET n:SourceFile SET n += {path: 'mw8080bw.h', external: true};
MERGE (n:KG {id: 'file:cpu/i8085/i8085.h'}) SET n:SourceFile SET n += {path: 'cpu/i8085/i8085.h', external: true};
MERGE (n:KG {id: 'file:machine/rescap.h'}) SET n:SourceFile SET n += {path: 'machine/rescap.h', external: true};
MERGE (n:KG {id: 'file:280zzzap.lh'}) SET n:SourceFile SET n += {path: '280zzzap.lh', external: true};
MERGE (n:KG {id: 'file:clowns.lh'}) SET n:SourceFile SET n += {path: 'clowns.lh', external: true};
MERGE (n:KG {id: 'file:gunfight.lh'}) SET n:SourceFile SET n += {path: 'gunfight.lh', external: true};
MERGE (n:KG {id: 'file:invaders.lh'}) SET n:SourceFile SET n += {path: 'invaders.lh', external: true};
MERGE (n:KG {id: 'file:invad2ct.lh'}) SET n:SourceFile SET n += {path: 'invad2ct.lh', external: true};
MERGE (n:KG {id: 'file:lagunar.lh'}) SET n:SourceFile SET n += {path: 'lagunar.lh', external: true};
MERGE (n:KG {id: 'file:maze.lh'}) SET n:SourceFile SET n += {path: 'maze.lh', external: true};
MERGE (n:KG {id: 'file:phantom2.lh'}) SET n:SourceFile SET n += {path: 'phantom2.lh', external: true};
MERGE (n:KG {id: 'file:seawolf.lh'}) SET n:SourceFile SET n += {path: 'seawolf.lh', external: true};
MERGE (n:KG {id: 'file:spacwalk.lh'}) SET n:SourceFile SET n += {path: 'spacwalk.lh', external: true};
MERGE (n:KG {id: 'file:spcenctr.lh'}) SET n:SourceFile SET n += {path: 'spcenctr.lh', external: true};
MERGE (n:KG {id: 'file:mw8080bw_a.h'}) SET n:SourceFile SET n += {path: 'mw8080bw_a.h', external: true};
MERGE (n:KG {id: 'file:src/mame/midw8080/mw8080bw_a.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/midw8080/mw8080bw_a.cpp'};
MERGE (n:KG {id: 'file:nl_gunfight.h'}) SET n:SourceFile SET n += {path: 'nl_gunfight.h', external: true};
MERGE (n:KG {id: 'file:nl_280zzzap.h'}) SET n:SourceFile SET n += {path: 'nl_280zzzap.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'callback:timer/mw8080bw_state.interrupt_trigger'}) SET n:Callback SET n += {ownerTag: 'interrupt_timer', signal: 'timer', operation: 'adjust', targetClass: 'mw8080bw_state', targetMethod: 'interrupt_trigger', scanlines: [96, 224], sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 217, sourceColumn: 1, sourceEndLine: 246};
MERGE (n:KG {id: 'handler:mw8080bw_state.interrupt_trigger'}) SET n:Handler SET n += {method: 'interrupt_trigger', ownerClass: 'mw8080bw_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 217, sourceColumn: 1, sourceEndLine: 246, sourceConstants: ['MW8080BW_INT_TRIGGER_COUNT_1=128', 'MW8080BW_INT_TRIGGER_VBLANK_1=0', 'MW8080BW_INT_TRIGGER_COUNT_2=218', 'MW8080BW_INT_TRIGGER_VBLANK_2=1'], sourceParameters: 'int param', sourceBody: 'int const vpos = m_screen->vpos();
	uint8_t const counter = vpos_to_vysnc_chain_counter(vpos);

	if (m_int_enable)
	{
		m_maincpu->set_input_line(0, ASSERT_LINE);
		m_interrupt_time = machine().time();
	}
	else
		m_maincpu->set_input_line(0, CLEAR_LINE);

	// set up for next interrupt
	uint8_t next_counter;
	int next_vblank;
	if (counter == MW8080BW_INT_TRIGGER_COUNT_1)
	{
		next_counter = MW8080BW_INT_TRIGGER_COUNT_2;
		next_vblank = MW8080BW_INT_TRIGGER_VBLANK_2;
	}
	else
	{
		next_counter = MW8080BW_INT_TRIGGER_COUNT_1;
		next_vblank = MW8080BW_INT_TRIGGER_VBLANK_1;
	}

	int const next_vpos = vysnc_chain_counter_to_vpos(next_counter, next_vblank);
	m_interrupt_timer->adjust(m_screen->time_until_pos(next_vpos));'};
MERGE (n:KG {id: 'handler:mw8080bw_state.vpos_to_vysnc_chain_counter'}) SET n:Handler SET n += {method: 'vpos_to_vysnc_chain_counter', ownerClass: 'mw8080bw_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 188, sourceColumn: 1, sourceEndLine: 200, sourceConstants: ['MW8080BW_VBSTART=224', 'MW8080BW_VCOUNTER_START_NO_VBLANK=32', 'MW8080BW_VCOUNTER_START_VBLANK=218'], sourceParameters: 'int vpos', sourceBody: '// convert from a vertical position to the actual values on the vertical sync counters
	uint8_t counter;
	int vblank = (vpos >= MW8080BW_VBSTART);

	if (vblank)
		counter = vpos - MW8080BW_VBSTART + MW8080BW_VCOUNTER_START_VBLANK;
	else
		counter = vpos + MW8080BW_VCOUNTER_START_NO_VBLANK;

	return counter;'};
MERGE (n:KG {id: 'game:invaders'}) SET n:Game SET n += {name: 'invaders', year: '1978', company: 'Taito / Midway', fullname: 'Space Invaders / Space Invaders M', monitor: 'ROT270', cls: 'invaders_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE, layout_invaders', kind: 'arcade', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 3274, sourceColumn: 11, sourceEndLine: 3274};
MERGE (n:KG {id: 'romset:invaders'}) SET n:RomSet SET n += {name: 'invaders', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 3145, sourceColumn: 1, sourceEndLine: 3145};
MERGE (n:KG {id: 'region:invaders/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2896, sourceColumn: 2, sourceEndLine: 2896};
MERGE (n:KG {id: 'rom:invaders/maincpu/9316b-0869_m739h.h1'}) SET n:Rom SET n += {file: '9316b-0869_m739h.h1', offset: 0, size: 2048, crc: '734f5ad8', sha1: 'ff6200af4c9110d8181249cbcef1a8a40fa40b7f', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 3147, sourceColumn: 2, sourceEndLine: 3147};
MERGE (n:KG {id: 'rom:invaders/maincpu/9316b-0856_m739g.g1'}) SET n:Rom SET n += {file: '9316b-0856_m739g.g1', offset: 2048, size: 2048, crc: '6bfaca4a', sha1: '16f48649b531bdef8c2d1446c429b5f414524350', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 3148, sourceColumn: 2, sourceEndLine: 3148};
MERGE (n:KG {id: 'rom:invaders/maincpu/9316b-0855_m739f.f1'}) SET n:Rom SET n += {file: '9316b-0855_m739f.f1', offset: 4096, size: 2048, crc: '0ccead96', sha1: '537aef03468f63c5b9e11dd61e253f7ae17d9743', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 3149, sourceColumn: 2, sourceEndLine: 3149};
MERGE (n:KG {id: 'rom:invaders/maincpu/9316b-0854_m739e.e1'}) SET n:Rom SET n += {file: '9316b-0854_m739e.e1', offset: 6144, size: 2048, crc: '14e538b0', sha1: '1d6ca0c99f9df71e2990b610deb9d7da0125e2d8', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 3150, sourceColumn: 2, sourceEndLine: 3150};
MERGE (n:KG {id: 'map:mw8080bw_state.main_map'}) SET n:AddressMap SET n += {cls: 'mw8080bw_state', name: 'main_map', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 313, sourceColumn: 1, sourceEndLine: 319, globalMask: 32767};
MERGE (n:KG {id: 'map:mw8080bw_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 8191, raw: 'map(0x0000, 0x1fff).rom().nopw()', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 316, sourceColumn: 2, sourceEndLine: 316, rom: true, nopw: true};
MERGE (n:KG {id: 'map:mw8080bw_state.main_map/range1'}) SET n:AddressRange SET n += {start: 8192, end: 16383, raw: 'map(0x2000, 0x3fff).mirror(0x4000).ram().share("main_ram")', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 317, sourceColumn: 2, sourceEndLine: 317, mirror: 16384, ram: true, share: 'main_ram'};
MERGE (n:KG {id: 'map:mw8080bw_state.main_map/range2'}) SET n:AddressRange SET n += {start: 16384, end: 24575, raw: 'map(0x4000, 0x5fff).rom().nopw()', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 318, sourceColumn: 2, sourceEndLine: 318, rom: true, nopw: true};
MERGE (n:KG {id: 'handler:mb14241_device.shift_result_r'}) SET n:Handler SET n += {method: 'shift_result_r', ownerClass: 'mb14241_device', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2819, sourceColumn: 2, sourceEndLine: 2819};
MERGE (n:KG {id: 'handler:mb14241_device.shift_data_w'}) SET n:Handler SET n += {method: 'shift_data_w', ownerClass: 'mb14241_device', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2824, sourceColumn: 2, sourceEndLine: 2824};
MERGE (n:KG {id: 'handler:mb14241_device.shift_count_w'}) SET n:Handler SET n += {method: 'shift_count_w', ownerClass: 'mb14241_device', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2822, sourceColumn: 2, sourceEndLine: 2822};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2826, sourceColumn: 2, sourceEndLine: 2826};
MERGE (n:KG {id: 'map:invaders_state.io_map_noshift'}) SET n:AddressMap SET n += {cls: 'invaders_state', name: 'io_map_noshift', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2601, sourceColumn: 1, sourceEndLine: 2612, globalMask: 7};
MERGE (n:KG {id: 'map:invaders_state.io_map_noshift/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).mirror(0x04).portr("IN0")', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2604, sourceColumn: 2, sourceEndLine: 2604, mirror: 4, portRead: 'IN0'};
MERGE (n:KG {id: 'map:invaders_state.io_map_noshift/range1'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x01, 0x01).mirror(0x04).portr("IN1")', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2605, sourceColumn: 2, sourceEndLine: 2605, mirror: 4, portRead: 'IN1'};
MERGE (n:KG {id: 'map:invaders_state.io_map_noshift/range2'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).mirror(0x04).portr("IN2")', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2606, sourceColumn: 2, sourceEndLine: 2606, mirror: 4, portRead: 'IN2'};
MERGE (n:KG {id: 'map:invaders_state.io_map_noshift/range3'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).nopw()', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2608, sourceColumn: 2, sourceEndLine: 2608, nopw: true};
MERGE (n:KG {id: 'map:invaders_state.io_map_noshift/range4'}) SET n:AddressRange SET n += {start: 3, end: 3, raw: 'map(0x03, 0x03).w("soundboard", FUNC(invaders_audio_device::p1_w))', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2609, sourceColumn: 2, sourceEndLine: 2609};
MERGE (n:KG {id: 'handler:invaders_audio_device.p1_w'}) SET n:Handler SET n += {method: 'p1_w', ownerClass: 'invaders_audio_device', sourceFile: 'src/mame/midw8080/mw8080bw_a.cpp', sourceLine: 3251, sourceColumn: 1, sourceEndLine: 3263, sourceConstants: ['INVADERS_BONUS_MISSLE_BASE_EN=3', 'INVADERS_INVADER_HIT_EN=4', 'INVADERS_EXPLOSION_EN=5', 'INVADERS_MISSILE_EN=6'], sourceParameters: 'u8 data', sourceBody: 'm_sn->enable_w(BIT(~data, 0));    // saucer sound

	m_discrete->write(INVADERS_NODE(INVADERS_MISSILE_EN, 1), data & 0x02);
	m_discrete->write(INVADERS_NODE(INVADERS_EXPLOSION_EN, 1), data & 0x04);
	m_discrete->write(INVADERS_NODE(INVADERS_INVADER_HIT_EN, 1), data & 0x08);
	m_discrete->write(INVADERS_NODE(INVADERS_BONUS_MISSLE_BASE_EN, 1), data & 0x10);

	machine().sound().system_mute(!BIT(data, 5));

	// D6 and D7 are not connected'};
MERGE (n:KG {id: 'map:invaders_state.io_map_noshift/range5'}) SET n:AddressRange SET n += {start: 5, end: 5, raw: 'map(0x05, 0x05).w("soundboard", FUNC(invaders_audio_device::p2_w))', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2610, sourceColumn: 2, sourceEndLine: 2610};
MERGE (n:KG {id: 'handler:invaders_audio_device.p2_w'}) SET n:Handler SET n += {method: 'p2_w', ownerClass: 'invaders_audio_device', sourceFile: 'src/mame/midw8080/mw8080bw_a.cpp', sourceLine: 3266, sourceColumn: 1, sourceEndLine: 3277, sourceConstants: ['INVADERS_SAUCER_HIT_EN=1', 'INVADERS_FLEET_DATA=2'], sourceParameters: 'u8 data', sourceBody: 'u8 const changed(data ^ m_p2);
	m_p2 = data;

	m_discrete->write(INVADERS_NODE(INVADERS_FLEET_DATA, 1), data & 0x0f);
	m_discrete->write(INVADERS_NODE(INVADERS_SAUCER_HIT_EN, 1), data & 0x10);

	if (BIT(changed, 5)) m_flip_screen_out(BIT(data, 5));

	// D6 and D7 are not connected'};
MERGE (n:KG {id: 'map:invaders_state.io_map_noshift/range6'}) SET n:AddressRange SET n += {start: 6, end: 6, raw: 'map(0x06, 0x06).w(m_watchdog, FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2611, sourceColumn: 2, sourceEndLine: 2611};
MERGE (n:KG {id: 'map:invaders_state.io_map'}) SET n:AddressMap SET n += {cls: 'invaders_state', name: 'io_map', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2614, sourceColumn: 1, sourceEndLine: 2622, calls: ['io_map_noshift']};
MERGE (n:KG {id: 'map:invaders_state.io_map/range0'}) SET n:AddressRange SET n += {start: 3, end: 3, raw: 'map(0x03, 0x03).mirror(0x04).r(m_mb14241, FUNC(mb14241_device::shift_result_r))', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2618, sourceColumn: 2, sourceEndLine: 2618, mirror: 4};
MERGE (n:KG {id: 'map:invaders_state.io_map/range1'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).w(m_mb14241, FUNC(mb14241_device::shift_count_w))', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2620, sourceColumn: 2, sourceEndLine: 2620};
MERGE (n:KG {id: 'map:invaders_state.io_map/range2'}) SET n:AddressRange SET n += {start: 4, end: 4, raw: 'map(0x04, 0x04).w(m_mb14241, FUNC(mb14241_device::shift_data_w))', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2621, sourceColumn: 2, sourceEndLine: 2621};
MERGE (n:KG {id: 'machine:mw8080bw_state.mw8080bw_root'}) SET n:MachineConfig SET n += {cls: 'mw8080bw_state', name: 'mw8080bw_root', calls: [], sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 329, sourceColumn: 1, sourceEndLine: 341};
MERGE (n:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu'}) SET n:Device SET n += {type: 'I8080', tag: 'maincpu', clock: 1996800, config: ['i8080_cpu_device &maincpu(I8080(config, m_maincpu, MW8080BW_CPU_CLOCK))', 'maincpu.set_addrmap(AS_PROGRAM, &mw8080bw_state::main_map)', 'maincpu.set_irq_acknowledge_callback(FUNC(mw8080bw_state::interrupt_vector))', 'maincpu.out_inte_func().set(FUNC(mw8080bw_state::int_enable_w))'], sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 332, sourceColumn: 2, sourceEndLine: 332};
MERGE (n:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu/callback0'}) SET n:Callback SET n += {signal: 'set_irq_acknowledge_callback', operation: 'set_irq_acknowledge_callback', raw: 'maincpu.set_irq_acknowledge_callback(FUNC(mw8080bw_state::interrupt_vector))', ownerTag: 'maincpu', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 334, sourceColumn: 2, sourceEndLine: 334, targetClass: 'mw8080bw_state', targetMethod: 'interrupt_vector'};
MERGE (n:KG {id: 'handler:mw8080bw_state.interrupt_vector'}) SET n:Handler SET n += {method: 'interrupt_vector', ownerClass: 'mw8080bw_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 255, sourceColumn: 1, sourceEndLine: 266, sourceParameters: 'int irqline', sourceBody: 'int vpos = m_screen->vpos();
	// MAME scheduling quirks cause this to happen more often than you might think, in fact far too often
	if (machine().time() < m_interrupt_time)
		vpos++;
	uint8_t counter = vpos_to_vysnc_chain_counter(vpos);
	uint8_t vector = 0xc7 | ((counter & 0x40) >> 2) | ((~counter & 0x40) >> 3);

	m_maincpu->set_input_line(0, CLEAR_LINE);
	return vector;'};
MERGE (n:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu/callback1'}) SET n:Callback SET n += {signal: 'out_inte_func', operation: 'set', raw: 'maincpu.out_inte_func().set(FUNC(mw8080bw_state::int_enable_w))', ownerTag: 'maincpu', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 335, sourceColumn: 2, sourceEndLine: 335, targetClass: 'mw8080bw_state', targetMethod: 'int_enable_w'};
MERGE (n:KG {id: 'handler:mw8080bw_state.int_enable_w'}) SET n:Handler SET n += {method: 'int_enable_w', ownerClass: 'mw8080bw_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 249, sourceColumn: 1, sourceEndLine: 252, sourceParameters: 'int state', sourceBody: 'm_int_enable = state;'};
MERGE (n:KG {id: 'device:mw8080bw_state.mw8080bw_root/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(MW8080BW_PIXEL_CLOCK, MW8080BW_HTOTAL, MW8080BW_HBEND, MW8080BW_HPIXCOUNT, MW8080BW_VTOTAL, MW8080BW_VBEND, MW8080BW_VBSTART)', 'm_screen->set_screen_update(FUNC(mw8080bw_state::screen_update_mw8080bw))', 'm_screen->set_screen_update(FUNC(invaders_state::screen_update_invaders))'], sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 338, sourceColumn: 2, sourceEndLine: 338, configCalls: ['set_raw(4992000,320,0,260,262,0,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [4992000, 320, 0, 260, 262, 0, 224]};
MERGE (n:KG {id: 'handler:mw8080bw_state.screen_update_mw8080bw'}) SET n:Handler SET n += {method: 'screen_update_mw8080bw', ownerClass: 'mw8080bw_state', sourceFile: 'src/mame/midw8080/mw8080bw_v.cpp', sourceLine: 14, sourceColumn: 1, sourceEndLine: 58, sourceConstants: ['MW8080BW_VCOUNTER_START_NO_VBLANK=32'], sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t x = 0;
	uint8_t y = MW8080BW_VCOUNTER_START_NO_VBLANK;
	uint8_t video_data = 0;

	while (1)
	{
		// plot the current pixel
		pen_t pen = (video_data & 0x01) ? rgb_t::white() : rgb_t::black();
		bitmap.pix(y - MW8080BW_VCOUNTER_START_NO_VBLANK, x) = pen;

		// next pixel
		video_data = video_data >> 1;
		x = x + 1;

		/* end of line? */
		if (x == 0)
		{
			// yes, flush out the shift register
			for (int i = 0; i < 4; i++)
			{
				pen = (video_data & 0x01) ? rgb_t::white() : rgb_t::black();
				bitmap.pix(y - MW8080BW_VCOUNTER_START_NO_VBLANK, 256 + i) = pen;

				video_data = video_data >> 1;
			}

			// next row, video_data is now 0, so the next line will start with 4 blank pixels
			y = y + 1;

			// end of screen?
			if (y == 0)
				break;
		}
		/* the video RAM is read at every 8 pixels starting with pixel 4 */
		else if ((x & 0x07) == 0x04)
		{
			offs_t const offs = ((offs_t)y << 5) | (x >> 3);
			video_data = m_main_ram[offs];
		}
	}

	return 0;'};
MERGE (n:KG {id: 'machine:invaders_state.invaders'}) SET n:MachineConfig SET n += {cls: 'invaders_state', name: 'invaders', calls: ['mw8080bw_root'], devicePatches: ['{"tag":"screen","config":["m_screen->set_screen_update(FUNC(invaders_state::screen_update_invaders))"]}'], sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2683, sourceColumn: 1, sourceEndLine: 2706};
MERGE (n:KG {id: 'machine:invaders_state.invaders/callback0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(invaders_state::screen_update_invaders))', ownerTag: 'screen', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2693, sourceColumn: 2, sourceEndLine: 2693, targetClass: 'invaders_state', targetMethod: 'screen_update_invaders'};
MERGE (n:KG {id: 'handler:invaders_state.screen_update_invaders'}) SET n:Handler SET n += {method: 'screen_update_invaders', ownerClass: 'invaders_state', sourceFile: 'src/mame/midw8080/mw8080bw_v.cpp', sourceLine: 356, sourceColumn: 1, sourceEndLine: 407, sourceConstants: ['MW8080BW_VBSTART=224', 'MW8080BW_VCOUNTER_START_NO_VBLANK=32', 'MW8080BW_HPIXCOUNT=260'], sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t x = 0;
	uint8_t y = MW8080BW_VCOUNTER_START_NO_VBLANK;
	uint8_t video_data = 0;

	while (1)
	{
		// plot the current pixel
		pen_t pen = (video_data & 0x01) ? rgb_t::white() : rgb_t::black();

		if (m_flip_screen)
			bitmap.pix(MW8080BW_VBSTART - 1 - (y - MW8080BW_VCOUNTER_START_NO_VBLANK), MW8080BW_HPIXCOUNT - 1 - x) = pen;
		else
			bitmap.pix(y - MW8080BW_VCOUNTER_START_NO_VBLANK, x) = pen;

		// next pixel
		video_data = video_data >> 1;
		x = x + 1;

		// end of line?
		if (x == 0)
		{
			// yes, flush out the shift register
			for (int i = 0; i < 4; i++)
			{
				pen = (video_data & 0x01) ? rgb_t::white() : rgb_t::black();

				if (m_flip_screen)
					bitmap.pix(MW8080BW_VBSTART - 1 - (y - MW8080BW_VCOUNTER_START_NO_VBLANK), MW8080BW_HPIXCOUNT - 1 - (256 + i)) = pen;
				else
					bitmap.pix(y - MW8080BW_VCOUNTER_START_NO_VBLANK, 256 + i) = pen;

				video_data = video_data >> 1;
			}

			// next row, video_data is now 0, so the next line will start with 4 blank pixels
			y = y + 1;

			// end of screen?
			if (y == 0)
				break;
		}
		else if ((x & 0x07) == 0x04) // the video RAM is read at every 8 pixels starting with pixel 4
		{
			offs_t const offs = (offs_t(y) << 5) | (x >> 3);
			video_data = m_main_ram[offs];
		}
	}

	return 0;'};
MERGE (n:KG {id: 'device:invaders_state.invaders/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, m_watchdog).set_time(255 * attotime::from_hz(MW8080BW_60HZ))'], sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2690, sourceColumn: 2, sourceEndLine: 2690};
MERGE (n:KG {id: 'device:invaders_state.invaders/mb14241'}) SET n:Device SET n += {type: 'MB14241', tag: 'mb14241', clock: null, config: ['MB14241(config, m_mb14241)'], sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2696, sourceColumn: 2, sourceEndLine: 2696};
MERGE (n:KG {id: 'device:invaders_state.invaders/soundboard'}) SET n:Device SET n += {type: 'INVADERS_AUDIO', tag: 'soundboard', clock: null, config: ['INVADERS_AUDIO(config, "soundboard")
			.flip_screen_out().set(
					[this] (int state)
					{
						if (is_cabinet_cocktail()) 
							m_flip_screen = state ? 1 : 0;
					})']};
MERGE (n:KG {id: 'machine:invaders_audio_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'invaders_audio_device', name: 'device_add_mconfig', calls: [], sourceFile: 'src/mame/midw8080/mw8080bw_a.cpp', sourceLine: 3279, sourceColumn: 1, sourceEndLine: 3301};
MERGE (n:KG {id: 'device:invaders_audio_device.device_add_mconfig/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/midw8080/mw8080bw_a.cpp', sourceLine: 3281, sourceColumn: 2, sourceEndLine: 3281};
MERGE (n:KG {id: 'device:invaders_audio_device.device_add_mconfig/sn%u'}) SET n:Device SET n += {type: 'SN76477', tag: 'sn%u', clock: null, config: ['SN76477(config, m_sn)', 'm_sn->set_noise_params(0, 0, 0)', 'm_sn->set_decay_res(0)', 'm_sn->set_attack_params(0, RES_K(100))', 'm_sn->set_amp_res(RES_K(56))', 'm_sn->set_feedback_res(RES_K(10))', 'm_sn->set_vco_params(0, CAP_U(0.1), RES_K(8.2))', 'm_sn->set_pitch_voltage(5.0)', 'm_sn->set_slf_params(CAP_U(1.0), RES_K(120))', 'm_sn->set_oneshot_params(0, 0)', 'm_sn->set_vco_mode(1)', 'm_sn->set_mixer_params(0, 0, 0)', 'm_sn->set_envelope_params(1, 0)', 'm_sn->set_enable(1)', 'm_sn->add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/midw8080/mw8080bw_a.cpp', sourceLine: 3283, sourceColumn: 2, sourceEndLine: 3283, configCalls: ['set_noise_params(0,0,0)', 'set_decay_res(0)', 'set_pitch_voltage(5)', 'set_oneshot_params(0,0)', 'set_vco_mode(1)', 'set_mixer_params(0,0,0)', 'set_envelope_params(1,0)', 'set_enable(1)']};
MERGE (n:KG {id: 'audioroute:device:invaders_audio_device.device_add_mconfig/sn%u/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'm_sn->add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/midw8080/mw8080bw_a.cpp', sourceLine: 3297, sourceColumn: 2, sourceEndLine: 3297};
MERGE (n:KG {id: 'device:invaders_audio_device.device_add_mconfig/discrete'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'discrete', clock: null, config: ['DISCRETE(config, m_discrete, invaders_discrete)', 'm_discrete->add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/midw8080/mw8080bw_a.cpp', sourceLine: 3299, sourceColumn: 2, sourceEndLine: 3299, clockExpr: 'invaders_discrete'};
MERGE (n:KG {id: 'audioroute:device:invaders_audio_device.device_add_mconfig/discrete/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'm_discrete->add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/midw8080/mw8080bw_a.cpp', sourceLine: 3300, sourceColumn: 2, sourceEndLine: 3300};
MERGE (n:KG {id: 'inputs:invaders'}) SET n:InputPorts SET n += {name: 'invaders', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2625, sourceColumn: 8, sourceEndLine: 2625};
MERGE (n:KG {id: 'inputs:invaders/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:invaders/IN0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Unknown', defaultValue: 0, location: 'SW:8', settings: ['0=Off', '1=On']};
MERGE (n:KG {id: 'inputs:invaders/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 6, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(invaders_state::invaders_sw6_sw7_r)']};
MERGE (n:KG {id: 'handler:invaders_state.invaders_sw6_sw7_r'}) SET n:Handler SET n += {method: 'invaders_sw6_sw7_r', ownerClass: 'invaders_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2544, sourceColumn: 1, sourceEndLine: 2553, sourceParameters: '', sourceBody: '// upright PCB : switches visible
	// cocktail PCB: HI

	if (is_cabinet_cocktail())
		return 0x03;
	else
		return ioport("SW6SW7")->read();'};
MERGE (n:KG {id: 'inputs:invaders/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:invaders/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 112, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(invaders_state::invaders_in0_control_r)']};
MERGE (n:KG {id: 'handler:invaders_state.invaders_in0_control_r'}) SET n:Handler SET n += {method: 'invaders_in0_control_r', ownerClass: 'invaders_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2568, sourceColumn: 1, sourceEndLine: 2577, sourceParameters: '', sourceBody: '// upright PCB : P1 controls
	// cocktail PCB: HI

	if (is_cabinet_cocktail())
		return 0x07;
	else
		return m_player_controls[0]->read();', inputMembers: ['m_player_controls=CONTP1,CONTP2']};
MERGE (n:KG {id: 'inputs:invaders/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(invaders_state::invaders_sw5_r)']};
MERGE (n:KG {id: 'handler:invaders_state.invaders_sw5_r'}) SET n:Handler SET n += {method: 'invaders_sw5_r', ownerClass: 'invaders_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2556, sourceColumn: 1, sourceEndLine: 2565, sourceParameters: '', sourceBody: '// upright PCB : switch visible
	// cocktail PCB: HI

	if (is_cabinet_cocktail())
		return 0x01;
	else
		return ioport("SW5")->read();'};
MERGE (n:KG {id: 'inputs:invaders/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:invaders/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(invaders_state::direct_coin_count)']};
MERGE (n:KG {id: 'inputs:invaders/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:invaders/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:invaders/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:invaders/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 112, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(invaders_state::invaders_in1_control_r)']};
MERGE (n:KG {id: 'handler:invaders_state.invaders_in1_control_r'}) SET n:Handler SET n += {method: 'invaders_in1_control_r', ownerClass: 'invaders_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2580, sourceColumn: 1, sourceEndLine: 2583, sourceParameters: '', sourceBody: 'return m_player_controls[0]->read();', inputMembers: ['m_player_controls=CONTP1,CONTP2']};
MERGE (n:KG {id: 'inputs:invaders/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:invaders/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:invaders/IN2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Lives', defaultValue: 0, location: 'SW:3,4', settings: ['0=3', '1=4', '2=5', '3=6']};
MERGE (n:KG {id: 'inputs:invaders/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:invaders/IN2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Bonus Life', defaultValue: 0, location: 'SW:2', settings: ['8=1000', '0=1500']};
MERGE (n:KG {id: 'inputs:invaders/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 112, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(invaders_state::invaders_in2_control_r)']};
MERGE (n:KG {id: 'handler:invaders_state.invaders_in2_control_r'}) SET n:Handler SET n += {method: 'invaders_in2_control_r', ownerClass: 'invaders_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2586, sourceColumn: 1, sourceEndLine: 2592, sourceParameters: '', sourceBody: '// upright PCB : P1 controls
	// cocktail PCB: P2 controls

	return m_player_controls[is_cabinet_cocktail() ? 1 : 0]->read();', inputMembers: ['m_player_controls=CONTP1,CONTP2']};
MERGE (n:KG {id: 'handler:invaders_state.is_cabinet_cocktail'}) SET n:Handler SET n += {method: 'is_cabinet_cocktail', ownerClass: 'invaders_state', sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2595, sourceColumn: 1, sourceEndLine: 2598, sourceParameters: '', sourceBody: 'return BIT(m_cabinet_type->read(), 0);', inputMembers: ['m_cabinet_type=CAB']};
MERGE (n:KG {id: 'inputs:invaders/IN2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Display Coinage', defaultValue: 0, location: 'SW:1', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:invaders/CAB'}) SET n:Port SET n += {tag: 'CAB', modify: false};
MERGE (n:KG {id: 'inputs:invaders/CAB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Cabinet', defaultValue: 0, settings: ['0=Upright', '1=Cocktail']};
MERGE (n:KG {id: 'inputs:invaders/SW6SW7'}) SET n:Port SET n += {tag: 'SW6SW7', modify: false};
MERGE (n:KG {id: 'inputs:invaders/SW6SW7/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Unused', defaultValue: 0, location: 'SW:7', settings: ['0=Off', '1=On']};
MERGE (n:KG {id: 'inputs:invaders/SW6SW7/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Unused', defaultValue: 0, location: 'SW:6', settings: ['0=Off', '2=On']};
MERGE (n:KG {id: 'inputs:invaders/SW6SW7/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 252, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:invaders/SW5'}) SET n:Port SET n += {tag: 'SW5', modify: false};
MERGE (n:KG {id: 'inputs:invaders/SW5/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Unused', defaultValue: 0, location: 'SW:5', settings: ['0=Off', '1=On']};
MERGE (n:KG {id: 'inputs:invaders/SW5/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 254, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:invaders/CONTP1'}) SET n:Port SET n += {tag: 'CONTP1', modify: false};
MERGE (n:KG {id: 'inputs:invaders/CONTP1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:invaders/CONTP1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:invaders/CONTP1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:invaders/CONTP2'}) SET n:Port SET n += {tag: 'CONTP2', modify: false};
MERGE (n:KG {id: 'inputs:invaders/CONTP2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:invaders/CONTP2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:invaders/CONTP2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(2)']};
MATCH (a:KG {id: 'game:invaders'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 3274, sourceColumn: 11, sourceEndLine: 3274};
MATCH (a:KG {id: 'game:invaders'}), (b:KG {id: 'machine:invaders_state.invaders'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:invaders'}), (b:KG {id: 'inputs:invaders'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:invaders'}), (b:KG {id: 'romset:invaders'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:mw8080bw.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:cpu/i8085/i8085.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:280zzzap.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:clowns.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:gunfight.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:invaders.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:invad2ct.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:lagunar.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:maze.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:phantom2.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:seawolf.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:spacwalk.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}), (b:KG {id: 'file:spcenctr.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:invaders_state.invaders'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2683, sourceColumn: 1, sourceEndLine: 2706};
MATCH (a:KG {id: 'machine:invaders_state.invaders'}), (b:KG {id: 'callback:timer/mw8080bw_state.interrupt_trigger'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:invaders_state.invaders'}), (b:KG {id: 'machine:mw8080bw_state.mw8080bw_root'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:invaders_state.invaders'}), (b:KG {id: 'map:invaders_state.io_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_IO', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:invaders_state.invaders'}), (b:KG {id: 'machine:invaders_state.invaders/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:invaders_state.invaders'}), (b:KG {id: 'device:invaders_state.invaders/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:invaders_state.invaders'}), (b:KG {id: 'device:invaders_state.invaders/mb14241'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:invaders_state.invaders'}), (b:KG {id: 'device:invaders_state.invaders/soundboard'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:invaders'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2625, sourceColumn: 8, sourceEndLine: 2625};
MATCH (a:KG {id: 'inputs:invaders'}), (b:KG {id: 'inputs:invaders/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:invaders'}), (b:KG {id: 'inputs:invaders/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:invaders'}), (b:KG {id: 'inputs:invaders/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:invaders'}), (b:KG {id: 'inputs:invaders/CAB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:invaders'}), (b:KG {id: 'inputs:invaders/SW6SW7'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:invaders'}), (b:KG {id: 'inputs:invaders/SW5'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:invaders'}), (b:KG {id: 'inputs:invaders/CONTP1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:invaders'}), (b:KG {id: 'inputs:invaders/CONTP2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:invaders'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 3145, sourceColumn: 1, sourceEndLine: 3145};
MATCH (a:KG {id: 'romset:invaders'}), (b:KG {id: 'region:invaders/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'callback:timer/mw8080bw_state.interrupt_trigger'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 217, sourceColumn: 1, sourceEndLine: 246};
MATCH (a:KG {id: 'callback:timer/mw8080bw_state.interrupt_trigger'}), (b:KG {id: 'handler:mw8080bw_state.interrupt_trigger'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mw8080bw_state.mw8080bw_root'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 329, sourceColumn: 1, sourceEndLine: 341};
MATCH (a:KG {id: 'machine:mw8080bw_state.mw8080bw_root'}), (b:KG {id: 'callback:timer/mw8080bw_state.interrupt_trigger'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:mw8080bw_state.mw8080bw_root'}), (b:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mw8080bw_state.mw8080bw_root'}), (b:KG {id: 'device:mw8080bw_state.mw8080bw_root/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2614, sourceColumn: 1, sourceEndLine: 2622};
MATCH (a:KG {id: 'map:invaders_state.io_map'}), (b:KG {id: 'map:invaders_state.io_map_noshift'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map'}), (b:KG {id: 'map:invaders_state.io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map'}), (b:KG {id: 'map:invaders_state.io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map'}), (b:KG {id: 'map:invaders_state.io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:invaders_state.invaders/callback0'}), (b:KG {id: 'handler:invaders_state.screen_update_invaders'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:invaders_state.invaders/soundboard'}), (b:KG {id: 'machine:invaders_audio_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN0'}), (b:KG {id: 'inputs:invaders/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN0'}), (b:KG {id: 'inputs:invaders/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN0'}), (b:KG {id: 'inputs:invaders/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN0'}), (b:KG {id: 'inputs:invaders/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN0'}), (b:KG {id: 'inputs:invaders/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN1'}), (b:KG {id: 'inputs:invaders/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN1'}), (b:KG {id: 'inputs:invaders/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN1'}), (b:KG {id: 'inputs:invaders/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN1'}), (b:KG {id: 'inputs:invaders/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN1'}), (b:KG {id: 'inputs:invaders/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN1'}), (b:KG {id: 'inputs:invaders/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN2'}), (b:KG {id: 'inputs:invaders/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN2'}), (b:KG {id: 'inputs:invaders/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN2'}), (b:KG {id: 'inputs:invaders/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN2'}), (b:KG {id: 'inputs:invaders/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN2'}), (b:KG {id: 'inputs:invaders/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/CAB'}), (b:KG {id: 'inputs:invaders/CAB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/SW6SW7'}), (b:KG {id: 'inputs:invaders/SW6SW7/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/SW6SW7'}), (b:KG {id: 'inputs:invaders/SW6SW7/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/SW6SW7'}), (b:KG {id: 'inputs:invaders/SW6SW7/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/SW5'}), (b:KG {id: 'inputs:invaders/SW5/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/SW5'}), (b:KG {id: 'inputs:invaders/SW5/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/CONTP1'}), (b:KG {id: 'inputs:invaders/CONTP1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/CONTP1'}), (b:KG {id: 'inputs:invaders/CONTP1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/CONTP1'}), (b:KG {id: 'inputs:invaders/CONTP1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/CONTP2'}), (b:KG {id: 'inputs:invaders/CONTP2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/CONTP2'}), (b:KG {id: 'inputs:invaders/CONTP2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:invaders/CONTP2'}), (b:KG {id: 'inputs:invaders/CONTP2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:invaders/maincpu'}), (b:KG {id: 'rom:invaders/maincpu/9316b-0869_m739h.h1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:invaders/maincpu'}), (b:KG {id: 'rom:invaders/maincpu/9316b-0856_m739g.g1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:invaders/maincpu'}), (b:KG {id: 'rom:invaders/maincpu/9316b-0855_m739f.f1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:invaders/maincpu'}), (b:KG {id: 'rom:invaders/maincpu/9316b-0854_m739e.e1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:mw8080bw_state.interrupt_trigger'}), (b:KG {id: 'handler:mw8080bw_state.vpos_to_vysnc_chain_counter'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu'}), (b:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu'}), (b:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu/callback1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu'}), (b:KG {id: 'map:mw8080bw_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 2601, sourceColumn: 1, sourceEndLine: 2612};
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift'}), (b:KG {id: 'map:invaders_state.io_map_noshift/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift'}), (b:KG {id: 'map:invaders_state.io_map_noshift/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift'}), (b:KG {id: 'map:invaders_state.io_map_noshift/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift'}), (b:KG {id: 'map:invaders_state.io_map_noshift/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift'}), (b:KG {id: 'map:invaders_state.io_map_noshift/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift'}), (b:KG {id: 'map:invaders_state.io_map_noshift/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift'}), (b:KG {id: 'map:invaders_state.io_map_noshift/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map/range0'}), (b:KG {id: 'handler:mb14241_device.shift_result_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'mb14241'};
MATCH (a:KG {id: 'map:invaders_state.io_map/range1'}), (b:KG {id: 'handler:mb14241_device.shift_count_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mb14241'};
MATCH (a:KG {id: 'map:invaders_state.io_map/range2'}), (b:KG {id: 'handler:mb14241_device.shift_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mb14241'};
MATCH (a:KG {id: 'machine:invaders_audio_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw_a.cpp', sourceLine: 3279, sourceColumn: 1, sourceEndLine: 3301};
MATCH (a:KG {id: 'machine:invaders_audio_device.device_add_mconfig'}), (b:KG {id: 'device:invaders_audio_device.device_add_mconfig/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:invaders_audio_device.device_add_mconfig'}), (b:KG {id: 'device:invaders_audio_device.device_add_mconfig/sn%u'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:invaders_audio_device.device_add_mconfig'}), (b:KG {id: 'device:invaders_audio_device.device_add_mconfig/discrete'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN0/f1'}), (b:KG {id: 'handler:invaders_state.invaders_sw6_sw7_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN0/f3'}), (b:KG {id: 'handler:invaders_state.invaders_in0_control_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN0/f4'}), (b:KG {id: 'handler:invaders_state.invaders_sw5_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN1/f4'}), (b:KG {id: 'handler:invaders_state.invaders_in1_control_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:invaders/IN2/f3'}), (b:KG {id: 'handler:invaders_state.invaders_in2_control_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu/callback0'}), (b:KG {id: 'handler:mw8080bw_state.interrupt_vector'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mw8080bw_state.mw8080bw_root/maincpu/callback1'}), (b:KG {id: 'handler:mw8080bw_state.int_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:mw8080bw_state.main_map'}), (b:KG {id: 'file:src/mame/midw8080/mw8080bw.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/midw8080/mw8080bw.cpp', sourceLine: 313, sourceColumn: 1, sourceEndLine: 319};
MATCH (a:KG {id: 'map:mw8080bw_state.main_map'}), (b:KG {id: 'map:mw8080bw_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mw8080bw_state.main_map'}), (b:KG {id: 'map:mw8080bw_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mw8080bw_state.main_map'}), (b:KG {id: 'map:mw8080bw_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift/range4'}), (b:KG {id: 'handler:invaders_audio_device.p1_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundboard'};
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift/range5'}), (b:KG {id: 'handler:invaders_audio_device.p2_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundboard'};
MATCH (a:KG {id: 'map:invaders_state.io_map_noshift/range6'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw_a.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw_a.cpp'}), (b:KG {id: 'file:mw8080bw_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw_a.cpp'}), (b:KG {id: 'file:nl_gunfight.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw_a.cpp'}), (b:KG {id: 'file:nl_280zzzap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw_a.cpp'}), (b:KG {id: 'file:mw8080bw.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/midw8080/mw8080bw_a.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:invaders_audio_device.device_add_mconfig/sn%u'}), (b:KG {id: 'audioroute:device:invaders_audio_device.device_add_mconfig/sn%u/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:invaders_audio_device.device_add_mconfig/discrete'}), (b:KG {id: 'audioroute:device:invaders_audio_device.device_add_mconfig/discrete/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'handler:invaders_state.invaders_in2_control_r'}), (b:KG {id: 'handler:invaders_state.is_cabinet_cocktail'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:mw8080bw_state.interrupt_vector'}), (b:KG {id: 'handler:mw8080bw_state.vpos_to_vysnc_chain_counter'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
