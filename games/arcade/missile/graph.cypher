// mamekit knowledge graph — driver src/mame/atari/missile.cpp
// generated 2026-09-24T02:28:36.216Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/atari/missile.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/atari/missile.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:machine/bankdev.h'}) SET n:SourceFile SET n += {path: 'machine/bankdev.h', external: true};
MERGE (n:KG {id: 'file:machine/rescap.h'}) SET n:SourceFile SET n += {path: 'machine/rescap.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/pokey.h'}) SET n:SourceFile SET n += {path: 'sound/pokey.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:missile'}) SET n:Game SET n += {name: 'missile', year: '1980', company: 'Atari', fullname: 'Missile Command (rev 3, A035467-02/04 PCBs)', monitor: 'ROT0', cls: 'missile_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1402, sourceColumn: 1, sourceEndLine: 1402};
MERGE (n:KG {id: 'romset:missile'}) SET n:RomSet SET n += {name: 'missile', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1019, sourceColumn: 1, sourceEndLine: 1019};
MERGE (n:KG {id: 'region:missile/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 32768, flags: '0', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1020, sourceColumn: 2, sourceEndLine: 1020};
MERGE (n:KG {id: 'rom:missile/maincpu/035820-02.h1'}) SET n:Rom SET n += {file: '035820-02.h1', offset: 20480, size: 2048, crc: '7a62ce6a', sha1: '9a39978138dc28fdefe193bfae1b226391e471db', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1021, sourceColumn: 2, sourceEndLine: 1021};
MERGE (n:KG {id: 'rom:missile/maincpu/035821-02.jk1'}) SET n:Rom SET n += {file: '035821-02.jk1', offset: 22528, size: 2048, crc: 'df3bd57f', sha1: '0916925d3c94d766d33f0e4badf6b0add835d748', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1022, sourceColumn: 2, sourceEndLine: 1022};
MERGE (n:KG {id: 'rom:missile/maincpu/035822-03e.kl1'}) SET n:Rom SET n += {file: '035822-03e.kl1', offset: 24576, size: 2048, crc: '1a2f599a', sha1: '2deb1219223032a9c83114e4e8b2fc11a570754c', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1023, sourceColumn: 2, sourceEndLine: 1023};
MERGE (n:KG {id: 'rom:missile/maincpu/035823-02.lm1'}) SET n:Rom SET n += {file: '035823-02.lm1', offset: 26624, size: 2048, crc: '82e552bb', sha1: 'd0f22894f779c74ceef644c9f03d840d9545efea', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1024, sourceColumn: 2, sourceEndLine: 1024};
MERGE (n:KG {id: 'rom:missile/maincpu/035824-02.np1'}) SET n:Rom SET n += {file: '035824-02.np1', offset: 28672, size: 2048, crc: '606e42e0', sha1: '9718f84a73c66b4e8ef7805a7ab638a7380624e1', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1025, sourceColumn: 2, sourceEndLine: 1025};
MERGE (n:KG {id: 'rom:missile/maincpu/035825-02.r1'}) SET n:Rom SET n += {file: '035825-02.r1', offset: 30720, size: 2048, crc: 'f752eaeb', sha1: '0339a6ce6744d2091cc7e07675e509b202b0f380', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1026, sourceColumn: 2, sourceEndLine: 1026};
MERGE (n:KG {id: 'region:missile/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 32, flags: '0', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1028, sourceColumn: 2, sourceEndLine: 1028};
MERGE (n:KG {id: 'rom:missile/proms/035826-01.l6'}) SET n:Rom SET n += {file: '035826-01.l6', offset: 0, size: 32, crc: '86a22140', sha1: '2beebf7855e29849ada1823eae031fc98220bc43', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1029, sourceColumn: 2, sourceEndLine: 1029};
MERGE (n:KG {id: 'map:missile_state.trampoline_map'}) SET n:AddressMap SET n += {cls: 'missile_state', name: 'trampoline_map', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 807, sourceColumn: 1, sourceEndLine: 810};
MERGE (n:KG {id: 'map:missile_state.trampoline_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 65535, raw: 'map(0x0000, 0xffff).rw(FUNC(missile_state::trampoline_r), FUNC(missile_state::trampoline_w))', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 809, sourceColumn: 2, sourceEndLine: 809};
MERGE (n:KG {id: 'handler:missile_state.trampoline_r'}) SET n:Handler SET n += {method: 'trampoline_r', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 795, sourceColumn: 1, sourceEndLine: 805, sourceParameters: 'offs_t offset', sourceBody: '// if this is a MADSEL cycle, read from video RAM
	if (get_madsel())
		return vram_mad_r(offset);

	uint8_t data = m_mainmap->read8(offset);
	load_madsel(data);

	return data;'};
MERGE (n:KG {id: 'handler:missile_state.load_madsel'}) SET n:Handler SET n += {method: 'load_madsel', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 591, sourceColumn: 1, sourceEndLine: 597, sourceParameters: 'uint8_t data', sourceBody: '// MADSEL counter is loaded at SYNC when the low 5 bytes of the data bus are 0x01
	// and the IRQ signal is clear
	if (!m_irq_pin && ((data & 0x1f) == 0x01) && m_maincpu->get_sync() && !machine().side_effects_disabled())
		m_madsel_lastcycles = m_maincpu->total_cycles();'};
MERGE (n:KG {id: 'handler:missile_state.get_madsel'}) SET n:Handler SET n += {method: 'get_madsel', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 599, sourceColumn: 1, sourceEndLine: 615, sourceParameters: '', sourceBody: '// the MADSEL signal disables standard address decoding and routes writes to video RAM;
	// it goes high 5 cycles after loading the counter, and goes low again after 1 cycle
	bool madsel = false;

	if (m_madsel_lastcycles)
	{
		madsel = (m_maincpu->total_cycles() - m_madsel_lastcycles) == 5;

		// reset the count until next time
		if (madsel && !machine().side_effects_disabled())
			m_madsel_lastcycles = 0;
	}

	return madsel;'};
MERGE (n:KG {id: 'handler:missile_state.vram_mad_r'}) SET n:Handler SET n += {method: 'vram_mad_r', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 657, sourceColumn: 1, sourceEndLine: 690, sourceParameters: 'offs_t offset', sourceBody: 'offs_t vramaddr;
	uint8_t vramdata;
	uint8_t vrammask;
	uint8_t result = 0xff;

	// basic 2 bit VRAM reads go to addr >> 2
	// data goes to bits 6 and 7
	// this should only be called if MADSEL == 1
	vramaddr = offset >> 2;
	vrammask = 0x11 << (offset & 3);
	vramdata = m_videoram[vramaddr] & vrammask;
	if ((vramdata & 0xf0) == 0)
		result &= ~0x80;
	if ((vramdata & 0x0f) == 0)
		result &= ~0x40;

	// 3-bit VRAM reads use an extra clock to read the 3rd bit elsewhere
	// on the schematics, this is the MUSHROOM == 1 case
	if ((offset & 0xe000) == 0xe000)
	{
		vramaddr = get_bit3_addr(offset);
		vrammask = 1 << (offset & 7);
		vramdata = m_videoram[vramaddr] & vrammask;
		if (vramdata == 0)
			result &= ~0x20;

		// account for the extra clock cycle
		if (!machine().side_effects_disabled())
			m_maincpu->adjust_icount(-1);
	}
	return result;'};
MERGE (n:KG {id: 'handler:missile_state.get_bit3_addr'}) SET n:Handler SET n += {method: 'get_bit3_addr', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 617, sourceColumn: 1, sourceEndLine: 625, sourceParameters: 'offs_t pixaddr', sourceBody: '// the 3rd bit of video RAM is scattered about various areas, we take a 16-bit pixel address here
	// and convert it into a video RAM address based on logic in the schematics
	return  (( pixaddr & 0x0800) >> 1) |
			((~pixaddr & 0x0800) >> 2) |
			(( pixaddr & 0x07f8) >> 2) |
			(( pixaddr & 0x1000) >> 12);'};
MERGE (n:KG {id: 'handler:missile_state.trampoline_w'}) SET n:Handler SET n += {method: 'trampoline_w', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 793, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// if this is a MADSEL cycle, write to video RAM
	if (get_madsel())
		vram_mad_w(offset, data);
	else
		m_mainmap->write8(offset, data);'};
MERGE (n:KG {id: 'handler:missile_state.vram_mad_w'}) SET n:Handler SET n += {method: 'vram_mad_w', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 627, sourceColumn: 1, sourceEndLine: 655, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'offs_t vramaddr;
	uint8_t vramdata;
	uint8_t vrammask;

	// basic 2 bit VRAM writes go to addr >> 2
	// data comes from bits 6 and 7
	// this should only be called if MADSEL == 1
	vramaddr = offset >> 2;
	vramdata = TABLE(data >> 6, 0x00, 0x0f, 0xf0, 0xff);
	vrammask = m_writeprom[(offset & 7) | 0x10];
	m_videoram[vramaddr] = (m_videoram[vramaddr] & vrammask) | (vramdata & ~vrammask);

	// 3-bit VRAM writes use an extra clock to write the 3rd bit elsewhere
	// on the schematics, this is the MUSHROOM == 1 case
	if ((offset & 0xe000) == 0xe000)
	{
		vramaddr = get_bit3_addr(offset);
		vramdata = -((data >> 5) & 1);
		vrammask = m_writeprom[(offset & 7) | 0x18];
		m_videoram[vramaddr] = (m_videoram[vramaddr] & vrammask) | (vramdata & ~vrammask);

		// account for the extra clock cycle
		if (!machine().side_effects_disabled())
			m_maincpu->adjust_icount(-1);
	}'};
MERGE (n:KG {id: 'map:missile_state.base_map'}) SET n:AddressMap SET n += {cls: 'missile_state', name: 'base_map', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 812, sourceColumn: 1, sourceEndLine: 824, globalMask: 32767, unmapHigh: true};
MERGE (n:KG {id: 'map:missile_state.base_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rw(FUNC(missile_state::vram_r), FUNC(missile_state::vram_w))', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 816, sourceColumn: 2, sourceEndLine: 816};
MERGE (n:KG {id: 'handler:missile_state.vram_r'}) SET n:Handler SET n += {method: 'vram_r', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 415, sourceColumn: 1, sourceEndLine: 415, sourceParameters: 'offs_t offset', sourceBody: 'return m_videoram[offset];'};
MERGE (n:KG {id: 'handler:missile_state.vram_w'}) SET n:Handler SET n += {method: 'vram_w', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 413, sourceColumn: 42, sourceEndLine: 414, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;'};
MERGE (n:KG {id: 'map:missile_state.base_map/range1'}) SET n:AddressRange SET n += {start: 18432, end: 18432, raw: 'map(0x4800, 0x4800).mirror(0x00ff).rw(FUNC(missile_state::trackball_r), FUNC(missile_state::output_w))', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 817, sourceColumn: 2, sourceEndLine: 817, mirror: 255};
MERGE (n:KG {id: 'handler:missile_state.trackball_r'}) SET n:Handler SET n += {method: 'trackball_r', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 739, sourceColumn: 1, sourceEndLine: 752, sourceParameters: '', sourceBody: '// read trackball
	if (m_ctrld)
	{
		if (!m_flipscreen)
			return ((m_track[1]->read() << 4) & 0xf0) | (m_track[0]->read() & 0x0f);
		else
			return ((m_track[3]->read() << 4) & 0xf0) | (m_track[2]->read() & 0x0f);
	}

	// normal buttons
	return m_inputs[0]->read();', inputMembers: ['m_inputs=IN0,IN1,R10,R8', 'm_track=TRACK0_X,TRACK0_Y,TRACK1_X,TRACK1_Y']};
MERGE (n:KG {id: 'handler:missile_state.output_w'}) SET n:Handler SET n += {method: 'output_w', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 754, sourceColumn: 1, sourceEndLine: 770, sourceParameters: 'uint8_t data', sourceBody: '// bit 0 selects trackball
	m_ctrld = data & 1;

	// leds
	m_leds[0] = BIT(~data, 1);
	m_leds[1] = BIT(~data, 2);

	// coin counters
	machine().bookkeeping().coin_counter_w(0, data & 0x20);
	machine().bookkeeping().coin_counter_w(1, data & 0x10);
	machine().bookkeeping().coin_counter_w(2, data & 0x08);

	// flip screen
	m_flipscreen = ~data & 0x40;'};
MERGE (n:KG {id: 'map:missile_state.base_map/range2'}) SET n:AddressRange SET n += {start: 18688, end: 18688, raw: 'map(0x4900, 0x4900).mirror(0x00ff).portr("IN1")', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 818, sourceColumn: 2, sourceEndLine: 818, mirror: 255, portRead: 'IN1'};
MERGE (n:KG {id: 'map:missile_state.base_map/range3'}) SET n:AddressRange SET n += {start: 18944, end: 18944, raw: 'map(0x4a00, 0x4a00).mirror(0x00ff).portr("R10")', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 819, sourceColumn: 2, sourceEndLine: 819, mirror: 255, portRead: 'R10'};
MERGE (n:KG {id: 'map:missile_state.base_map/range4'}) SET n:AddressRange SET n += {start: 19200, end: 19207, raw: 'map(0x4b00, 0x4b07).mirror(0x00f8).w(FUNC(missile_state::palette_w)).nopr()', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 820, sourceColumn: 2, sourceEndLine: 820, mirror: 248, nopr: true};
MERGE (n:KG {id: 'handler:missile_state.palette_w'}) SET n:Handler SET n += {method: 'palette_w', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 772, sourceColumn: 1, sourceEndLine: 776, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// color RAM
	m_palette->set_pen_color(offset & 7, pal1bit(~data >> 3), pal1bit(~data >> 2), pal1bit(~data >> 1));'};
MERGE (n:KG {id: 'map:missile_state.base_map/range5'}) SET n:AddressRange SET n += {start: 19456, end: 19456, raw: 'map(0x4c00, 0x4c00).mirror(0x00ff).w(m_watchdog, FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 821, sourceColumn: 2, sourceEndLine: 821, mirror: 255};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 841, sourceColumn: 2, sourceEndLine: 841};
MERGE (n:KG {id: 'map:missile_state.base_map/range6'}) SET n:AddressRange SET n += {start: 19712, end: 19712, raw: 'map(0x4d00, 0x4d00).mirror(0x00ff).w(FUNC(missile_state::irqack_w))', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 822, sourceColumn: 2, sourceEndLine: 822, mirror: 255};
MERGE (n:KG {id: 'handler:missile_state.irqack_w'}) SET n:Handler SET n += {method: 'irqack_w', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 523, sourceColumn: 1, sourceEndLine: 526, sourceParameters: 'uint8_t data', sourceBody: 'm_irq_state = 0;'};
MERGE (n:KG {id: 'map:missile_state.base_map/range7'}) SET n:AddressRange SET n += {start: 20480, end: 32767, raw: 'map(0x5000, 0x7fff).rom().region("maincpu", 0x5000)', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 823, sourceColumn: 2, sourceEndLine: 823, rom: true, region: 'maincpu', regionOffset: 20480};
MERGE (n:KG {id: 'map:missile_state.missile_map'}) SET n:AddressMap SET n += {cls: 'missile_state', name: 'missile_map', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 826, sourceColumn: 1, sourceEndLine: 830, calls: ['base_map']};
MERGE (n:KG {id: 'map:missile_state.missile_map/range0'}) SET n:AddressRange SET n += {start: 16384, end: 16399, raw: 'map(0x4000, 0x400f).mirror(0x07f0).rw(m_pokey, FUNC(pokey_device::read), FUNC(pokey_device::write))', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 829, sourceColumn: 2, sourceEndLine: 829, mirror: 2032};
MERGE (n:KG {id: 'handler:pokey_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 829, sourceColumn: 2, sourceEndLine: 829};
MERGE (n:KG {id: 'handler:pokey_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 829, sourceColumn: 2, sourceEndLine: 829};
MERGE (n:KG {id: 'handler:missile_state.adjust_cpu_speed'}) SET n:Handler SET n += {method: 'adjust_cpu_speed', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 542, sourceColumn: 1, sourceEndLine: 555, sourceConstants: ['MASTER_CLOCK=10000000'], sourceParameters: 'int param', sourceBody: 'int curv = param;

	// starting at scanline 224, the CPU runs at half speed
	if (curv == 224)
		m_maincpu->set_unscaled_clock(MASTER_CLOCK/16);
	else
		m_maincpu->set_unscaled_clock(MASTER_CLOCK/8);

	// scanline for the next run
	curv ^= 224;
	m_cpu_timer->adjust(m_screen->time_until_pos(v_to_scanline(curv)), curv);'};
MERGE (n:KG {id: 'handler:missile_state.v_to_scanline'}) SET n:Handler SET n += {method: 'v_to_scanline', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 479, sourceColumn: 1, sourceEndLine: 483, sourceParameters: 'int v', sourceBody: '// same as a above, but the opposite transformation
	return m_flipscreen ? (256 - v) : v;'};
MERGE (n:KG {id: 'handler:missile_state.machine_start'}) SET n:Handler SET n += {method: 'machine_start', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 557, sourceColumn: 1, sourceEndLine: 573, sourceParameters: '', sourceBody: '// create a timer to speed/slow the CPU
	m_cpu_timer = timer_alloc(FUNC(missile_state::adjust_cpu_speed), this);
	m_cpu_timer->adjust(m_screen->time_until_pos(v_to_scanline(0), 0));

	// create a timer for IRQs and set up the first callback
	m_irq_timer = timer_alloc(FUNC(missile_state::clock_irq), this);
	schedule_next_irq(-32);

	// setup for save states
	save_item(NAME(m_irq_state));
	save_item(NAME(m_irq_pin));
	save_item(NAME(m_ctrld));
	save_item(NAME(m_flipscreen));
	save_item(NAME(m_madsel_lastcycles));'};
MERGE (n:KG {id: 'handler:missile_state.schedule_next_irq'}) SET n:Handler SET n += {method: 'schedule_next_irq', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 485, sourceColumn: 1, sourceEndLine: 497, sourceParameters: 'int curv', sourceBody: '// IRQ = /32V, clocked by /16V ^ flip
	// When not flipped, clocks on 0, 64, 128, 192
	// When flipped, clocks on 16, 80, 144, 208
	if (m_flipscreen)
		curv = ((curv - 32) & 0xff) | 0x10;
	else
		curv = ((curv + 32) & 0xff) & ~0x10;

	// next one at the start of this scanline
	m_irq_timer->adjust(m_screen->time_until_pos(v_to_scanline(curv)), curv);'};
MERGE (n:KG {id: 'handler:missile_state.clock_irq'}) SET n:Handler SET n += {method: 'clock_irq', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 499, sourceColumn: 1, sourceEndLine: 511, sourceParameters: 'int param', sourceBody: 'int curv = param;

	// set pending IRQ change
	m_irq_state = BIT(~curv, 5);

	// force an update while we\'re here
	m_screen->update_partial(v_to_scanline(curv));

	// find the next edge
	schedule_next_irq(curv);'};
MERGE (n:KG {id: 'machine:missile_state.missile'}) SET n:MachineConfig SET n += {cls: 'missile_state', name: 'missile', calls: [], armedTimers: ['m_cpu_timer=missile_state.adjust_cpu_speed@missile_state.machine_start', 'm_irq_timer=missile_state.clock_irq@missile_state.machine_start'], stateMembers: ['{"name":"m_irq_state","bits":8}', '{"name":"m_irq_pin","bits":8}', '{"name":"m_ctrld","bits":8}', '{"name":"m_flipscreen","bits":8}'], driverTimers: ['m_cpu_timer=missile_state.adjust_cpu_speed', 'm_irq_timer=missile_state.clock_irq'], resetHandlers: ['missile_state.machine_reset'], sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 963, sourceColumn: 1, sourceEndLine: 991};
MERGE (n:KG {id: 'handler:missile_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 575, sourceColumn: 1, sourceEndLine: 581, sourceParameters: '', sourceBody: 'm_maincpu->set_input_line(0, CLEAR_LINE);
	m_irq_pin = 0;
	m_irq_state = 0;
	m_madsel_lastcycles = 0;'};
MERGE (n:KG {id: 'device:missile_state.missile/maincpu'}) SET n:Device SET n += {type: 'M6502', tag: 'maincpu', clock: 1250000, config: ['M6502(config, m_maincpu, MASTER_CLOCK/8)', 'm_maincpu->set_addrmap(AS_PROGRAM, &missile_state::trampoline_map)', 'm_maincpu->sync_cb().set(FUNC(missile_state::sync_w))'], member: 'm_maincpu', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 966, sourceColumn: 2, sourceEndLine: 966};
MERGE (n:KG {id: 'device:missile_state.missile/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'sync_cb', operation: 'set', raw: 'm_maincpu->sync_cb().set(FUNC(missile_state::sync_w))', ownerTag: 'maincpu', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 968, sourceColumn: 2, sourceEndLine: 968, targetClass: 'missile_state', targetMethod: 'sync_w'};
MERGE (n:KG {id: 'handler:missile_state.sync_w'}) SET n:Handler SET n += {method: 'sync_w', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 513, sourceColumn: 1, sourceEndLine: 521, sourceParameters: 'int state', sourceBody: '// SYNC latches IRQ pin
	if (state && m_irq_state != m_irq_pin)
	{
		m_irq_pin = m_irq_state;
		m_maincpu->set_input_line(0, m_irq_pin ? ASSERT_LINE : CLEAR_LINE);
	}'};
MERGE (n:KG {id: 'device:missile_state.missile/mainmap'}) SET n:Device SET n += {type: 'ADDRESS_MAP_BANK', tag: 'mainmap', clock: null, config: ['ADDRESS_MAP_BANK(config, m_mainmap)', 'm_mainmap->set_options(ENDIANNESS_LITTLE, 8, 16)', 'm_mainmap->set_map(&missile_state::missile_map)'], member: 'm_mainmap', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 970, sourceColumn: 2, sourceEndLine: 970};
MERGE (n:KG {id: 'device:missile_state.missile/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, m_watchdog).set_vblank_count(m_screen, 8)'], member: 'm_watchdog', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 974, sourceColumn: 2, sourceEndLine: 974};
MERGE (n:KG {id: 'device:missile_state.missile/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_entries(8)'], member: 'm_palette', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 977, sourceColumn: 2, sourceEndLine: 977, paletteEntries: 8};
MERGE (n:KG {id: 'device:missile_state.missile/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(PIXEL_CLOCK, HTOTAL, HBEND, HBSTART, VTOTAL, VBEND, VBSTART)', 'm_screen->set_screen_update(FUNC(missile_state::screen_update_missile))', 'm_screen->set_palette(m_palette)'], member: 'm_screen', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 979, sourceColumn: 2, sourceEndLine: 979, configCalls: ['set_raw(5000000,320,0,256,256,25,256)', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [5000000, 320, 0, 256, 256, 25, 256], screenRawExpr: ['PIXEL_CLOCK', 'HTOTAL', 'HBEND', 'HBSTART', 'VTOTAL', 'VBEND', 'VBSTART']};
MERGE (n:KG {id: 'device:missile_state.missile/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(missile_state::screen_update_missile))', ownerTag: 'screen', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 981, sourceColumn: 2, sourceEndLine: 981, targetClass: 'missile_state', targetMethod: 'screen_update_missile'};
MERGE (n:KG {id: 'handler:missile_state.screen_update_missile'}) SET n:Handler SET n += {method: 'screen_update_missile', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 700, sourceColumn: 1, sourceEndLine: 729, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// draw the bitmap to the screen, looping over Y
	for (int y = cliprect.top(); y <= cliprect.bottom(); y++)
	{
		uint16_t *const dst = &bitmap.pix(y);

		int const effy = m_flipscreen ? ((256+24 - y) & 0xff) : y;
		uint8_t const *const src = &m_videoram[effy * 64];
		uint8_t const *src3 = nullptr;

		// compute the base of the 3rd pixel row
		if (effy >= 224)
			src3 = &m_videoram[get_bit3_addr(effy << 8)];

		// loop over X
		for (int x = cliprect.left(); x <= cliprect.right(); x++)
		{
			uint8_t pix = src[x / 4] >> (x & 3);
			pix = ((pix >> 2) & 4) | ((pix << 1) & 2);

			// if we\'re in the lower region, get the 3rd bit
			if (src3)
				pix |= (src3[(x / 8) * 2] >> (x & 7)) & 1;

			dst[x] = pix;
		}
	}
	return 0;'};
MERGE (n:KG {id: 'device:missile_state.missile/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 985, sourceColumn: 2, sourceEndLine: 985};
MERGE (n:KG {id: 'device:missile_state.missile/pokey'}) SET n:Device SET n += {type: 'POKEY', tag: 'pokey', clock: 1250000, config: ['POKEY(config, m_pokey, MASTER_CLOCK/8)', 'm_pokey->allpot_r().set_ioport("R8")', 'm_pokey->set_output_rc(RES_K(10), CAP_U(0.1), 5.0)', 'm_pokey->add_route(ALL_OUTPUTS, "mono", 1.0)'], member: 'm_pokey', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 987, sourceColumn: 2, sourceEndLine: 987};
MERGE (n:KG {id: 'audioroute:device:missile_state.missile/pokey/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'm_pokey->add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 990, sourceColumn: 2, sourceEndLine: 990};
MERGE (n:KG {id: 'device:missile_state.missile/pokey/callback:pokey:0'}) SET n:Callback SET n += {signal: 'allpot_r', operation: 'set_ioport', raw: 'm_pokey->allpot_r().set_ioport("R8")', ownerTag: 'pokey', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 988, sourceColumn: 2, sourceEndLine: 988, targetTag: 'R8', targetPort: 'R8'};
MERGE (n:KG {id: 'inputs:missile'}) SET n:InputPorts SET n += {name: 'missile', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 853, sourceColumn: 8, sourceEndLine: 853};
MERGE (n:KG {id: 'inputs:missile/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:missile/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:missile/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:missile/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:missile/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START2', defaultValue: 8};
MERGE (n:KG {id: 'inputs:missile/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:missile/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:missile/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:missile/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN3', defaultValue: 128};
MERGE (n:KG {id: 'inputs:missile/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:missile/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON3', defaultValue: 1};
MERGE (n:KG {id: 'inputs:missile/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:missile/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:missile/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 24, activeLow: false, type: 'IPT_CUSTOM', defaultValue: 0};
MERGE (n:KG {id: 'inputs:missile/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_TILT', defaultValue: 32};
MERGE (n:KG {id: 'inputs:missile/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SERVICE', modifiers: ['PORT_TOGGLE'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:missile/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(missile_state::vblank_r))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:missile_state.vblank_r'}) SET n:Handler SET n += {method: 'vblank_r', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 528, sourceColumn: 1, sourceEndLine: 532, sourceParameters: '', sourceBody: 'int v = scanline_to_v(m_screen->vpos());
	return v < 24;'};
MERGE (n:KG {id: 'handler:missile_state.scanline_to_v'}) SET n:Handler SET n += {method: 'scanline_to_v', ownerClass: 'missile_state', sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 472, sourceColumn: 1, sourceEndLine: 477, sourceParameters: 'int scanline', sourceBody: '// since the vertical sync counter counts backwards when flipped, this function returns
	// the current effective V value, given that vpos() only counts forward
	return m_flipscreen ? (256 - scanline) : scanline;'};
MERGE (n:KG {id: 'inputs:missile/R10'}) SET n:Port SET n += {tag: 'R10', modify: false};
MERGE (n:KG {id: 'inputs:missile/R10/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("R10:1,2")'], name: 'Coinage', defaultValue: 1, location: 'R10:1,2', settings: ['0=1C 1C', '2=Free Play', '1=2C 1C', '3=1C 2C']};
MERGE (n:KG {id: 'inputs:missile/R10/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("R10:3,4")'], name: 'Right Coin', defaultValue: 0, location: 'R10:3,4', settings: ['0=*1', '4=*4', '8=*5', '12=*6']};
MERGE (n:KG {id: 'inputs:missile/R10/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("R10:5")'], name: 'Center Coin', defaultValue: 0, location: 'R10:5', settings: ['0=*1', '16=*2']};
MERGE (n:KG {id: 'inputs:missile/R10/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 96, modifiers: ['PORT_DIPLOCATION("R10:6,7")'], name: 'Language', defaultValue: 0, location: 'R10:6,7', settings: ['0=English', '32=French', '64=German', '96=Spanish']};
MERGE (n:KG {id: 'inputs:missile/R10/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("R10:8")'], name: 'Unknown', defaultValue: 128, location: 'R10:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:missile/R8'}) SET n:Port SET n += {tag: 'R8', modify: false};
MERGE (n:KG {id: 'inputs:missile/R8/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("R8:!1,!2")'], name: 'Cities', defaultValue: 3, location: 'R8:!1,!2', settings: ['2=4', '1=5', '3=6', '0=7']};
MERGE (n:KG {id: 'inputs:missile/R8/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("R8:!3")'], name: 'Bonus Credit for 4 Coins', defaultValue: 0, location: 'R8:!3', settings: ['4=No', '0=Yes']};
MERGE (n:KG {id: 'inputs:missile/R8/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("R8:!4")'], name: 'Trackball Size', defaultValue: 0, location: 'R8:!4', settings: ['0=Mini', '8=Large']};
MERGE (n:KG {id: 'inputs:missile/R8/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 112, modifiers: ['PORT_DIPLOCATION("R8:!5,!6,!7")'], name: 'Bonus City', defaultValue: 112, location: 'R8:!5,!6,!7', settings: ['16=8000', '112=10000', '96=12000', '80=14000', '64=15000', '48=18000', '32=20000', '0=None']};
MERGE (n:KG {id: 'inputs:missile/R8/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("R8:!8")'], name: 'Cabinet', defaultValue: 0, location: 'R8:!8', settings: ['0=Upright', '128=Cocktail']};
MERGE (n:KG {id: 'inputs:missile/TRACK0_X'}) SET n:Port SET n += {tag: 'TRACK0_X', modify: false};
MERGE (n:KG {id: 'inputs:missile/TRACK0_X/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_TRACKBALL_X', modifiers: ['PORT_SENSITIVITY(20)', 'PORT_KEYDELTA(10)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:missile/TRACK0_Y'}) SET n:Port SET n += {tag: 'TRACK0_Y', modify: false};
MERGE (n:KG {id: 'inputs:missile/TRACK0_Y/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_TRACKBALL_Y', modifiers: ['PORT_SENSITIVITY(20)', 'PORT_KEYDELTA(10)', 'PORT_REVERSE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:missile/TRACK1_X'}) SET n:Port SET n += {tag: 'TRACK1_X', modify: false};
MERGE (n:KG {id: 'inputs:missile/TRACK1_X/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_TRACKBALL_X', modifiers: ['PORT_SENSITIVITY(20)', 'PORT_KEYDELTA(10)', 'PORT_REVERSE', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:missile/TRACK1_Y'}) SET n:Port SET n += {tag: 'TRACK1_Y', modify: false};
MERGE (n:KG {id: 'inputs:missile/TRACK1_Y/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_TRACKBALL_Y', modifiers: ['PORT_SENSITIVITY(20)', 'PORT_KEYDELTA(10)', 'PORT_REVERSE', 'PORT_COCKTAIL'], defaultValue: 0};
MATCH (a:KG {id: 'game:missile'}), (b:KG {id: 'file:src/mame/atari/missile.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1402, sourceColumn: 1, sourceEndLine: 1402};
MATCH (a:KG {id: 'game:missile'}), (b:KG {id: 'machine:missile_state.missile'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:missile'}), (b:KG {id: 'inputs:missile'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:missile'}), (b:KG {id: 'romset:missile'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:machine/bankdev.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:sound/pokey.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/missile.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'handler:missile_state.adjust_cpu_speed'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'handler:missile_state.machine_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'handler:missile_state.clock_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'file:src/mame/atari/missile.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 963, sourceColumn: 1, sourceEndLine: 991};
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'handler:missile_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'device:missile_state.missile/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'device:missile_state.missile/mainmap'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'device:missile_state.missile/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'device:missile_state.missile/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'device:missile_state.missile/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'device:missile_state.missile/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:missile_state.missile'}), (b:KG {id: 'device:missile_state.missile/pokey'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:missile'}), (b:KG {id: 'file:src/mame/atari/missile.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 853, sourceColumn: 8, sourceEndLine: 853};
MATCH (a:KG {id: 'inputs:missile'}), (b:KG {id: 'inputs:missile/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:missile'}), (b:KG {id: 'inputs:missile/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:missile'}), (b:KG {id: 'inputs:missile/R10'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:missile'}), (b:KG {id: 'inputs:missile/R8'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:missile'}), (b:KG {id: 'inputs:missile/TRACK0_X'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:missile'}), (b:KG {id: 'inputs:missile/TRACK0_Y'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:missile'}), (b:KG {id: 'inputs:missile/TRACK1_X'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:missile'}), (b:KG {id: 'inputs:missile/TRACK1_Y'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:missile'}), (b:KG {id: 'file:src/mame/atari/missile.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 1019, sourceColumn: 1, sourceEndLine: 1019};
MATCH (a:KG {id: 'romset:missile'}), (b:KG {id: 'region:missile/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:missile'}), (b:KG {id: 'region:missile/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:missile_state.adjust_cpu_speed'}), (b:KG {id: 'handler:missile_state.v_to_scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.machine_start'}), (b:KG {id: 'handler:missile_state.schedule_next_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.machine_start'}), (b:KG {id: 'handler:missile_state.v_to_scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.machine_start'}), (b:KG {id: 'handler:missile_state.adjust_cpu_speed'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.machine_start'}), (b:KG {id: 'handler:missile_state.clock_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.clock_irq'}), (b:KG {id: 'handler:missile_state.schedule_next_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.clock_irq'}), (b:KG {id: 'handler:missile_state.v_to_scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:missile_state.missile/maincpu'}), (b:KG {id: 'device:missile_state.missile/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:missile_state.missile/maincpu'}), (b:KG {id: 'map:missile_state.trampoline_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:missile_state.missile/mainmap'}), (b:KG {id: 'map:missile_state.missile_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:missile_state.missile/screen'}), (b:KG {id: 'device:missile_state.missile/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:missile_state.missile/pokey'}), (b:KG {id: 'audioroute:device:missile_state.missile/pokey/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:missile_state.missile/pokey'}), (b:KG {id: 'device:missile_state.missile/pokey/callback:pokey:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:missile/IN0'}), (b:KG {id: 'inputs:missile/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN0'}), (b:KG {id: 'inputs:missile/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN0'}), (b:KG {id: 'inputs:missile/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN0'}), (b:KG {id: 'inputs:missile/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN0'}), (b:KG {id: 'inputs:missile/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN0'}), (b:KG {id: 'inputs:missile/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN0'}), (b:KG {id: 'inputs:missile/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN0'}), (b:KG {id: 'inputs:missile/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN1'}), (b:KG {id: 'inputs:missile/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN1'}), (b:KG {id: 'inputs:missile/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN1'}), (b:KG {id: 'inputs:missile/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN1'}), (b:KG {id: 'inputs:missile/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN1'}), (b:KG {id: 'inputs:missile/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN1'}), (b:KG {id: 'inputs:missile/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/IN1'}), (b:KG {id: 'inputs:missile/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R10'}), (b:KG {id: 'inputs:missile/R10/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R10'}), (b:KG {id: 'inputs:missile/R10/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R10'}), (b:KG {id: 'inputs:missile/R10/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R10'}), (b:KG {id: 'inputs:missile/R10/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R10'}), (b:KG {id: 'inputs:missile/R10/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R8'}), (b:KG {id: 'inputs:missile/R8/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R8'}), (b:KG {id: 'inputs:missile/R8/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R8'}), (b:KG {id: 'inputs:missile/R8/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R8'}), (b:KG {id: 'inputs:missile/R8/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/R8'}), (b:KG {id: 'inputs:missile/R8/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/TRACK0_X'}), (b:KG {id: 'inputs:missile/TRACK0_X/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/TRACK0_Y'}), (b:KG {id: 'inputs:missile/TRACK0_Y/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/TRACK1_X'}), (b:KG {id: 'inputs:missile/TRACK1_X/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:missile/TRACK1_Y'}), (b:KG {id: 'inputs:missile/TRACK1_Y/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:missile/maincpu'}), (b:KG {id: 'rom:missile/maincpu/035820-02.h1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:missile/maincpu'}), (b:KG {id: 'rom:missile/maincpu/035821-02.jk1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:missile/maincpu'}), (b:KG {id: 'rom:missile/maincpu/035822-03e.kl1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:missile/maincpu'}), (b:KG {id: 'rom:missile/maincpu/035823-02.lm1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:missile/maincpu'}), (b:KG {id: 'rom:missile/maincpu/035824-02.np1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:missile/maincpu'}), (b:KG {id: 'rom:missile/maincpu/035825-02.r1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:missile/proms'}), (b:KG {id: 'rom:missile/proms/035826-01.l6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:missile_state.schedule_next_irq'}), (b:KG {id: 'handler:missile_state.v_to_scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:missile_state.missile/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:missile_state.sync_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:missile_state.trampoline_map'}), (b:KG {id: 'file:src/mame/atari/missile.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 807, sourceColumn: 1, sourceEndLine: 810};
MATCH (a:KG {id: 'map:missile_state.trampoline_map'}), (b:KG {id: 'map:missile_state.trampoline_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:missile_state.missile_map'}), (b:KG {id: 'file:src/mame/atari/missile.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 826, sourceColumn: 1, sourceEndLine: 830};
MATCH (a:KG {id: 'map:missile_state.missile_map'}), (b:KG {id: 'map:missile_state.base_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:missile_state.missile_map'}), (b:KG {id: 'map:missile_state.missile_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:missile_state.missile/screen/callback:screen:0'}), (b:KG {id: 'handler:missile_state.screen_update_missile'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:missile/IN1/f6'}), (b:KG {id: 'handler:missile_state.vblank_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:missile_state.trampoline_map/range0'}), (b:KG {id: 'handler:missile_state.trampoline_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:missile_state.trampoline_map/range0'}), (b:KG {id: 'handler:missile_state.trampoline_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map'}), (b:KG {id: 'file:src/mame/atari/missile.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/missile.cpp', sourceLine: 812, sourceColumn: 1, sourceEndLine: 824};
MATCH (a:KG {id: 'map:missile_state.base_map'}), (b:KG {id: 'map:missile_state.base_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map'}), (b:KG {id: 'map:missile_state.base_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map'}), (b:KG {id: 'map:missile_state.base_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map'}), (b:KG {id: 'map:missile_state.base_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map'}), (b:KG {id: 'map:missile_state.base_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map'}), (b:KG {id: 'map:missile_state.base_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map'}), (b:KG {id: 'map:missile_state.base_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map'}), (b:KG {id: 'map:missile_state.base_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:missile_state.missile_map/range0'}), (b:KG {id: 'handler:pokey_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'map:missile_state.missile_map/range0'}), (b:KG {id: 'handler:pokey_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'handler:missile_state.screen_update_missile'}), (b:KG {id: 'handler:missile_state.get_bit3_addr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.vblank_r'}), (b:KG {id: 'handler:missile_state.scanline_to_v'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.trampoline_r'}), (b:KG {id: 'handler:missile_state.load_madsel'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.trampoline_r'}), (b:KG {id: 'handler:missile_state.get_madsel'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.trampoline_r'}), (b:KG {id: 'handler:missile_state.vram_mad_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.trampoline_w'}), (b:KG {id: 'handler:missile_state.get_madsel'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.trampoline_w'}), (b:KG {id: 'handler:missile_state.vram_mad_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map/range0'}), (b:KG {id: 'handler:missile_state.vram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map/range0'}), (b:KG {id: 'handler:missile_state.vram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map/range1'}), (b:KG {id: 'handler:missile_state.trackball_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map/range1'}), (b:KG {id: 'handler:missile_state.output_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map/range4'}), (b:KG {id: 'handler:missile_state.palette_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:missile_state.base_map/range5'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:missile_state.base_map/range6'}), (b:KG {id: 'handler:missile_state.irqack_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:missile_state.vram_mad_r'}), (b:KG {id: 'handler:missile_state.get_bit3_addr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:missile_state.vram_mad_w'}), (b:KG {id: 'handler:missile_state.get_bit3_addr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
