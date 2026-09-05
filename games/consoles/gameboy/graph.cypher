// mamekit knowledge graph — driver src/mame/nintendo/gb.cpp
// generated 2026-09-05T03:50:51.628Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/nintendo/gb.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/nintendo/gb.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:bus/gameboy/carts.h'}) SET n:SourceFile SET n += {path: 'bus/gameboy/carts.h', external: true};
MERGE (n:KG {id: 'file:bus/gameboy/gbslot.h'}) SET n:SourceFile SET n += {path: 'bus/gameboy/gbslot.h', external: true};
MERGE (n:KG {id: 'file:bus/gameboy/mdslot.h'}) SET n:SourceFile SET n += {path: 'bus/gameboy/mdslot.h', external: true};
MERGE (n:KG {id: 'file:cpu/lr35902/lr35902.h'}) SET n:SourceFile SET n += {path: 'cpu/lr35902/lr35902.h', external: true};
MERGE (n:KG {id: 'file:machine/ram.h'}) SET n:SourceFile SET n += {path: 'machine/ram.h', external: true};
MERGE (n:KG {id: 'file:sound/gb.h'}) SET n:SourceFile SET n += {path: 'sound/gb.h', external: true};
MERGE (n:KG {id: 'file:video/gb_lcd.h'}) SET n:SourceFile SET n += {path: 'video/gb_lcd.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:softlist_dev.h'}) SET n:SourceFile SET n += {path: 'softlist_dev.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:logmacro.h'}) SET n:SourceFile SET n += {path: 'logmacro.h', external: true};
MERGE (n:KG {id: 'game:gameboy'}) SET n:Game SET n += {name: 'gameboy', year: '1990', company: 'Nintendo', fullname: 'Game Boy', monitor: 'ROT0', cls: 'gb_state', init: 'empty_init', flags: 'MACHINE_IMPERFECT_SOUND | MACHINE_SUPPORTS_SAVE', kind: 'console', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1293, sourceColumn: 1, sourceEndLine: 1293};
MERGE (n:KG {id: 'romset:gameboy'}) SET n:RomSet SET n += {name: 'gameboy', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1217, sourceColumn: 1, sourceEndLine: 1217};
MERGE (n:KG {id: 'region:gameboy/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 256, flags: '0', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1218, sourceColumn: 2, sourceEndLine: 1218};
MERGE (n:KG {id: 'rom:gameboy/maincpu/dmg_boot.bin'}) SET n:Rom SET n += {file: 'dmg_boot.bin', offset: 0, size: 256, crc: '59c8598e', sha1: '4ed31ec6b0b175bb109c0eb5fd3d193da823339f'};
MERGE (n:KG {id: 'map:gb_state.gameboy_map'}) SET n:AddressMap SET n += {cls: 'gb_state', name: 'gameboy_map', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 899, sourceColumn: 1, sourceEndLine: 912, unmapHigh: true};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range0'}) SET n:AddressRange SET n += {start: 32768, end: 40959, raw: 'map(0x8000, 0x9fff).rw(m_ppu, FUNC(dmg_ppu_device::vram_r), FUNC(dmg_ppu_device::vram_w))', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 902, sourceColumn: 2, sourceEndLine: 902};
MERGE (n:KG {id: 'handler:dmg_ppu_device.vram_r'}) SET n:Handler SET n += {method: 'vram_r', ownerClass: 'dmg_ppu_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 948, sourceColumn: 2, sourceEndLine: 948};
MERGE (n:KG {id: 'handler:dmg_ppu_device.vram_w'}) SET n:Handler SET n += {method: 'vram_w', ownerClass: 'dmg_ppu_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 948, sourceColumn: 2, sourceEndLine: 948};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range1'}) SET n:AddressRange SET n += {start: 49152, end: 57343, raw: 'map(0xc000, 0xdfff).mirror(0x2000).ram()', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 903, sourceColumn: 2, sourceEndLine: 903, mirror: 8192, ram: true};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range2'}) SET n:AddressRange SET n += {start: 65024, end: 65279, raw: 'map(0xfe00, 0xfeff).rw(m_ppu, FUNC(dmg_ppu_device::oam_r), FUNC(dmg_ppu_device::oam_w))', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 904, sourceColumn: 2, sourceEndLine: 904};
MERGE (n:KG {id: 'handler:dmg_ppu_device.oam_r'}) SET n:Handler SET n += {method: 'oam_r', ownerClass: 'dmg_ppu_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 950, sourceColumn: 2, sourceEndLine: 950};
MERGE (n:KG {id: 'handler:dmg_ppu_device.oam_w'}) SET n:Handler SET n += {method: 'oam_w', ownerClass: 'dmg_ppu_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 950, sourceColumn: 2, sourceEndLine: 950};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range3'}) SET n:AddressRange SET n += {start: 65280, end: 65295, raw: 'map(0xff00, 0xff0f).rw(FUNC(gb_state::gb_io_r), FUNC(gb_state::gb_io_w))', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 905, sourceColumn: 2, sourceEndLine: 905};
MERGE (n:KG {id: 'handler:gb_state.gb_io_r'}) SET n:Handler SET n += {method: 'gb_io_r', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 617, sourceColumn: 1, sourceEndLine: 642, sourceParameters: 'offs_t offset', sourceBody: 'switch(offset)
	{
		case 0x04:
			LOG("read DIV, divcount = %04x\\n", m_divcount);
			return (m_divcount >> 8) & 0xFF;
		case 0x00:
		case 0x01:
		case 0x02:
		case 0x03:
		case 0x05:
		case 0x06:
		case 0x07:
			return m_gb_io[offset];
		case 0x0F:
			/* Make sure the internal states are up to date */
			m_ppu->update_state();
			LOG("read if\\n");
logerror("IF read, serial clock is %04x\\n", m_internal_serial_clock);
			return 0xE0 | m_maincpu->get_if();
		default:
			/* Unsupported registers return 0xFF */
			return 0xFF;
	}'};
MERGE (n:KG {id: 'handler:gb_state.gb_io_w'}) SET n:Handler SET n += {method: 'gb_io_w', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 349, sourceColumn: 1, sourceEndLine: 429, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'switch (offset)
	{
	case 0x00:                      /* JOYP - Joypad */
		m_gb_io[0x00] = 0xCF | data;
		if (!(data & 0x20))
			m_gb_io[0x00] &= (m_inputs->read() >> 4) | 0xF0;
		if (!(data & 0x10))
			m_gb_io[0x00] &= m_inputs->read() | 0xF0;
		return;
	case 0x01:                      /* SB - Serial transfer data */
		break;
	case 0x02:                      /* SC - SIO control */
		switch (data & 0x81)
		{
		case 0x00:
		case 0x01:
			m_sio_count = 0;
			break;
		case 0x80:              /* enabled & external clock */
			m_sio_count = 16;
			break;
		case 0x81:              /* enabled & internal clock */
			m_sio_count = 16;
			break;
		}
logerror("m_gb_io[0x02] write, serial clock is %04x\\n", m_internal_serial_clock);
		data |= 0x7E; // unused bits stay high
		break;
	case 0x03:
		return;
	case 0x04:                      /* DIV - Divider register */
		/* Force increment of m_gb_io[0x05] register when the \'highest\' bit is set */
		if ((m_divcount >> (m_shift - 1)) & 1)
		{
			gb_timer_increment();
		}
		LOG("DIV write\\n");
		m_divcount = 0;
		return;
	case 0x05:                      /* TIMA - Timer counter */
		/* Check if the counter is being reloaded in this cycle */
		if ((m_gb_io[0x07] & 0x04) && m_gb_io[0x05] == m_gb_io[0x06] && (m_divcount & (m_shift_cycles - 1)) == 4)
		{
			data = m_gb_io[0x06];
		}
		break;
	case 0x06:                      /* TMA - Timer module */
		/* Check if the counter is being reloaded in this cycle */
		if ((m_gb_io[0x07] & 0x04) && m_gb_io[0x05] == m_gb_io[0x06] && (m_divcount & (m_shift_cycles - 1)) == 4)
		{
			m_gb_io[0x05] = data;
		}
		break;
	case 0x07:                      /* TAC - Timer control */
		data |= 0xF8;
		/* Check if timer is just disabled or the timer frequency is changing */
		if ((!(data & 0x04) && (m_gb_io[0x07] & 0x04)) || ((data & 0x04) && (m_gb_io[0x07] & 0x04) && (data & 0x03) != (m_gb_io[0x07] & 0x03)))
		{
			/* Check if m_gb_io[0x05] should be incremented */
			if ((m_divcount & (m_shift_cycles - 1)) >= (m_shift_cycles >> 1))
			{
				gb_timer_increment();
			}
		}
		m_shift = TABLE(data & 0x03, 10, 4, 6, 8);
		m_shift_cycles = 1 << m_shift;
		break;
	case 0x0F:                      /* IF - Interrupt flag */
		m_ppu->update_state();
		LOG("write if\\n");
		data &= 0x1F;
		m_maincpu->set_if(data);
		break;
	}

	m_gb_io[offset] = data;', inputMembers: ['m_inputs=INPUTS']};
MERGE (n:KG {id: 'handler:base_state.gb_timer_increment'}) SET n:Handler SET n += {method: 'gb_timer_increment', ownerClass: 'base_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 688, sourceColumn: 1, sourceEndLine: 698, sourceParameters: '', sourceBody: 'gb_timer_check_irq();

	LOG("increment timer\\n");
	m_gb_io[0x05] += 1;
	if (m_gb_io[0x05] == 0)
	{
		m_triggering_irq = 1;
	}'};
MERGE (n:KG {id: 'handler:base_state.gb_timer_check_irq'}) SET n:Handler SET n += {method: 'gb_timer_check_irq', ownerClass: 'base_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 671, sourceColumn: 1, sourceEndLine: 686, sourceConstants: ['TIM_INT=2'], sourceParameters: '', sourceBody: 'm_reloading = 0;
	if (m_triggering_irq)
	{
		m_triggering_irq = 0;
		if (m_gb_io[0x05] == 0)
		{
			m_gb_io[0x05] = m_gb_io[0x06];
			m_maincpu->set_input_line(lr35902_cpu_device::TIM_INT, ASSERT_LINE);
			// Make sure the state is updated during the current timeslice in case it is read.
			m_maincpu->execute_set_input(lr35902_cpu_device::TIM_INT, ASSERT_LINE);
			m_reloading = 1;
		}
	}'};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range4'}) SET n:AddressRange SET n += {start: 65296, end: 65318, raw: 'map(0xff10, 0xff26).rw(m_apu, FUNC(gameboy_sound_device::sound_r), FUNC(gameboy_sound_device::sound_w))', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 906, sourceColumn: 2, sourceEndLine: 906};
MERGE (n:KG {id: 'handler:gameboy_sound_device.sound_r'}) SET n:Handler SET n += {method: 'sound_r', ownerClass: 'gameboy_sound_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 937, sourceColumn: 2, sourceEndLine: 937};
MERGE (n:KG {id: 'handler:gameboy_sound_device.sound_w'}) SET n:Handler SET n += {method: 'sound_w', ownerClass: 'gameboy_sound_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 937, sourceColumn: 2, sourceEndLine: 937};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range5'}) SET n:AddressRange SET n += {start: 65319, end: 65327, raw: 'map(0xff27, 0xff2f).noprw()', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 907, sourceColumn: 2, sourceEndLine: 907};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range6'}) SET n:AddressRange SET n += {start: 65328, end: 65343, raw: 'map(0xff30, 0xff3f).rw(m_apu, FUNC(gameboy_sound_device::wave_r), FUNC(gameboy_sound_device::wave_w))', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 908, sourceColumn: 2, sourceEndLine: 908};
MERGE (n:KG {id: 'handler:gameboy_sound_device.wave_r'}) SET n:Handler SET n += {method: 'wave_r', ownerClass: 'gameboy_sound_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 954, sourceColumn: 2, sourceEndLine: 954};
MERGE (n:KG {id: 'handler:gameboy_sound_device.wave_w'}) SET n:Handler SET n += {method: 'wave_w', ownerClass: 'gameboy_sound_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 954, sourceColumn: 2, sourceEndLine: 954};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range7'}) SET n:AddressRange SET n += {start: 65344, end: 65407, raw: 'map(0xff40, 0xff7f).r(m_ppu, FUNC(dmg_ppu_device::video_r)).w(FUNC(gb_state::gb_io2_w))', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 909, sourceColumn: 2, sourceEndLine: 909};
MERGE (n:KG {id: 'handler:dmg_ppu_device.video_r'}) SET n:Handler SET n += {method: 'video_r', ownerClass: 'dmg_ppu_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 909, sourceColumn: 2, sourceEndLine: 909};
MERGE (n:KG {id: 'handler:gb_state.gb_io2_w'}) SET n:Handler SET n += {method: 'gb_io2_w', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 431, sourceColumn: 1, sourceEndLine: 437, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (offset == 0x10)
		disable_boot(); // disable boot ROM
	else
		m_ppu->video_w(offset, data);'};
MERGE (n:KG {id: 'handler:gb_state.disable_boot'}) SET n:Handler SET n += {method: 'disable_boot', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 343, sourceColumn: 1, sourceEndLine: 346, sourceParameters: '', sourceBody: 'm_boot_view.disable();'};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range8'}) SET n:AddressRange SET n += {start: 65408, end: 65534, raw: 'map(0xff80, 0xfffe).ram()', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 910, sourceColumn: 2, sourceEndLine: 910, ram: true};
MERGE (n:KG {id: 'map:gb_state.gameboy_map/range9'}) SET n:AddressRange SET n += {start: 65535, end: 65535, raw: 'map(0xffff, 0xffff).rw(FUNC(gb_state::gb_ie_r), FUNC(gb_state::gb_ie_w))', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 911, sourceColumn: 2, sourceEndLine: 911};
MERGE (n:KG {id: 'handler:gb_state.gb_ie_r'}) SET n:Handler SET n += {method: 'gb_ie_r', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 606, sourceColumn: 1, sourceEndLine: 609, sourceParameters: '', sourceBody: 'return m_maincpu->get_ie();'};
MERGE (n:KG {id: 'handler:gb_state.gb_ie_w'}) SET n:Handler SET n += {method: 'gb_ie_w', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 611, sourceColumn: 1, sourceEndLine: 614, sourceParameters: 'uint8_t data', sourceBody: 'm_maincpu->set_ie(data);'};
MERGE (n:KG {id: 'machine:gb_state.gameboy'}) SET n:MachineConfig SET n += {cls: 'gb_state', name: 'gameboy', calls: [], stateMembers: ['{"name":"m_gb_io","bits":8,"arrayLength":16}', '{"name":"m_divcount","bits":16}', '{"name":"m_shift","bits":8}', '{"name":"m_shift_cycles","bits":16}', '{"name":"m_triggering_irq","bits":8}', '{"name":"m_reloading","bits":8}', '{"name":"m_internal_serial_clock","bits":16}', '{"name":"m_internal_serial_frequency","bits":16}', '{"name":"m_sio_count","bits":32}'], resetHandlers: ['base_state.machine_reset', 'gb_state.machine_reset'], installedHandlers: ['{"space":"AS_PROGRAM","kind":"read","start":0,"end":255,"viewTag":"m_boot_view","viewEntry":0,"className":"gb_state","method":"boot_r"}'], sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1042, sourceColumn: 1, sourceEndLine: 1074};
MERGE (n:KG {id: 'handler:base_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'base_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 300, sourceColumn: 1, sourceEndLine: 317, sourceParameters: '', sourceBody: 'm_apu->sound_w(0x16, 0x00); // Initialize sound hardware

	m_divcount = 8;
	m_internal_serial_clock = 0;
	m_internal_serial_frequency = 512 / 2;
	m_triggering_irq = 0;
	m_shift = 10; // slowest timer?
	m_shift_cycles = 1 << m_shift;

	// Set registers to default/startup values
	m_gb_io[0x00] = 0xcf;
	m_gb_io[0x01] = 0x00;
	m_gb_io[0x02] = 0x7e;
	m_gb_io[0x03] = 0xff;
	m_gb_io[0x07] = 0xf8;       // Upper bits of m_gb_io[0x07] register are set to 1'};
MERGE (n:KG {id: 'handler:gb_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 319, sourceColumn: 1, sourceEndLine: 324, sourceParameters: '', sourceBody: 'base_state::machine_reset();

	m_boot_view.select(0);'};
MERGE (n:KG {id: 'handler:gb_state.boot_r'}) SET n:Handler SET n += {method: 'boot_r', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 439, sourceColumn: 1, sourceEndLine: 451, sourceParameters: 'offs_t offset', sourceBody: 'if (m_bios_hack->read())
	{
		// patch out logo and checksum checks
		// useful to run some pirate carts until properly emulated, or to test homebrew
		if (offset == 0xe9 || offset == 0xea)
			return 0x00;
		if (offset == 0xfa || offset == 0xfb)
			return 0x00;
	}
	return m_region_boot[offset];', inputMembers: ['m_bios_hack=SKIP_CHECK']};
MERGE (n:KG {id: 'softlist:gb_state.gameboy/gameboy'}) SET n:SoftwareList SET n += {name: 'gameboy', tag: 'cart_list', status: 'original'};
MERGE (n:KG {id: 'softlist:gb_state.gameboy/gbcolor'}) SET n:SoftwareList SET n += {name: 'gbcolor', tag: 'gbc_list', status: 'compatible'};
MERGE (n:KG {id: 'device:gb_state.gameboy/maincpu'}) SET n:Device SET n += {type: 'LR35902', tag: 'maincpu', clock: 4194304, config: ['LR35902(config, m_maincpu, MASTER_CLOCK)', 'm_maincpu->set_addrmap(AS_PROGRAM, &gb_state::gameboy_map)', 'm_maincpu->timer_cb().set(FUNC(gb_state::gb_timer_callback))', 'm_maincpu->set_halt_bug(true)'], sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1045, sourceColumn: 2, sourceEndLine: 1045};
MERGE (n:KG {id: 'device:gb_state.gameboy/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'timer_cb', operation: 'set', raw: 'm_maincpu->timer_cb().set(FUNC(gb_state::gb_timer_callback))', ownerTag: 'maincpu', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1047, sourceColumn: 2, sourceEndLine: 1047, targetClass: 'gb_state', targetMethod: 'gb_timer_callback'};
MERGE (n:KG {id: 'handler:gb_state.gb_timer_callback'}) SET n:Handler SET n += {method: 'gb_timer_callback', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 701, sourceColumn: 1, sourceEndLine: 737, sourceConstants: ['SIO_INTERNAL_CLOCK=1'], sourceParameters: 'uint8_t data', sourceBody: 'uint16_t old_gb_divcount = m_divcount;
	uint16_t old_internal_serial_clock = m_internal_serial_clock;
	m_divcount += data;
	m_internal_serial_clock += data;

	if ((old_gb_divcount >> 8) != (m_divcount >> 8))
	{
		//LOG("DIV became %02x\\n", m_divcount >> 8);
	}
	gb_timer_check_irq();

	if (m_gb_io[0x07] & 0x04)
	{
		uint16_t old_count = old_gb_divcount >> m_shift;
		uint16_t new_count = m_divcount >> m_shift;
		if (data > m_shift_cycles)
		{
			gb_timer_increment();
			old_count++;
		}
		if (new_count != old_count)
		{
			gb_timer_increment();
			if (new_count << m_shift < m_divcount)
			{
				gb_timer_check_irq();
			}
		}
	}

	if (((m_internal_serial_clock ^ old_internal_serial_clock) & m_internal_serial_frequency) && (m_gb_io[0x02] & SIO_INTERNAL_CLOCK))
	{
		gb_serial_timer_tick();
	}'};
MERGE (n:KG {id: 'handler:base_state.gb_serial_timer_tick'}) SET n:Handler SET n += {method: 'gb_serial_timer_tick', ownerClass: 'base_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 646, sourceColumn: 1, sourceEndLine: 668, sourceConstants: ['SIO_INT=3', 'SIO_ENABLED=128'], sourceParameters: '', sourceBody: 'if (m_gb_io[0x02] & SIO_ENABLED)
	{
		if (m_sio_count & 1)
		{
			/* Shift in a received bit */
			m_gb_io[0x01] = (m_gb_io[0x01] << 1) | 0x01;
		}
		/* Decrement number of handled bits */
		m_sio_count--;

		LOG("%04x - gb_serial_timer_proc: m_gb_io[0x01] = %02x, sio_count = %u\\n", m_maincpu->pc(), m_gb_io[0x01], m_sio_count);
		/* If all bits done, stop timer and trigger interrupt */
		if (m_sio_count == 0)
		{
			m_gb_io[0x02] &= ~SIO_ENABLED;
			m_maincpu->set_input_line(lr35902_cpu_device::SIO_INT, ASSERT_LINE);
			// Make sure the state is updated during the current timeslice in case it is read.
			m_maincpu->execute_set_input(lr35902_cpu_device::SIO_INT, ASSERT_LINE);
		}
	}'};
MERGE (n:KG {id: 'device:gb_state.gameboy/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_LCD))', 'screen.set_raw(MASTER_CLOCK, 456, 0, 20 * 8, 154, 0, 18 * 8)', 'screen.set_screen_update(m_ppu, FUNC(dmg_ppu_device::screen_update))', 'screen.set_palette(m_palette)'], sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1051, sourceColumn: 2, sourceEndLine: 1051, configCalls: ['set_raw(4194304,456,0,160,154,0,144)'], clockExpr: 'SCREEN_TYPE_LCD', screenRaw: [4194304, 456, 0, 160, 154, 0, 144], screenRawExpr: ['MASTER_CLOCK', '456', '0', '20 * 8', '154', '0', '18 * 8']};
MERGE (n:KG {id: 'device:gb_state.gameboy/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(m_ppu, FUNC(dmg_ppu_device::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1053, sourceColumn: 2, sourceEndLine: 1053, targetClass: 'dmg_ppu_device', targetMethod: 'screen_update', targetTag: 'ppu', indexed: 1};
MERGE (n:KG {id: 'handler:dmg_ppu_device.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'dmg_ppu_device', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1188, sourceColumn: 2, sourceEndLine: 1188};
MERGE (n:KG {id: 'device:gb_state.gameboy/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, "gfxdecode", m_palette, gfxdecode_device::empty)'], sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1056, sourceColumn: 2, sourceEndLine: 1056, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:gb_state.gameboy/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(gb_state::gb_palette), 4)'], sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1057, sourceColumn: 2, sourceEndLine: 1057, clockExpr: 'FUNC(gb_state::gb_palette)'};
MERGE (n:KG {id: 'device:gb_state.gameboy/ppu'}) SET n:Device SET n += {type: 'DMG_PPU', tag: 'ppu', clock: null, config: ['DMG_PPU(config, m_ppu, m_maincpu)'], sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1059, sourceColumn: 2, sourceEndLine: 1059, clockExpr: 'm_maincpu'};
MERGE (n:KG {id: 'device:gb_state.gameboy/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: 2, config: ['SPEAKER(config, "speaker", 2).front()'], sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1062, sourceColumn: 2, sourceEndLine: 1062};
MERGE (n:KG {id: 'device:gb_state.gameboy/apu'}) SET n:Device SET n += {type: 'DMG_APU', tag: 'apu', clock: 4194304, config: ['DMG_APU(config, m_apu, MASTER_CLOCK)', 'm_apu->add_route(0, "speaker", 0.50, 0)', 'm_apu->add_route(1, "speaker", 0.50, 1)'], sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1064, sourceColumn: 2, sourceEndLine: 1064};
MERGE (n:KG {id: 'audioroute:device:gb_state.gameboy/apu/0'}) SET n:AudioRoute SET n += {output: '0', target: 'speaker', gain: 0.5, input: 0, raw: 'm_apu->add_route(0, "speaker", 0.50, 0)', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1065, sourceColumn: 2, sourceEndLine: 1065};
MERGE (n:KG {id: 'audioroute:device:gb_state.gameboy/apu/1'}) SET n:AudioRoute SET n += {output: '1', target: 'speaker', gain: 0.5, input: 1, raw: 'm_apu->add_route(1, "speaker", 0.50, 1)', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1066, sourceColumn: 2, sourceEndLine: 1066};
MERGE (n:KG {id: 'device:gb_state.gameboy/cartslot'}) SET n:Device SET n += {type: 'GB_CART_SLOT', tag: 'cartslot', clock: null, config: ['GB_CART_SLOT(config, m_cartslot, gameboy_cartridges, nullptr)', 'm_cartslot->set_space(m_maincpu, AS_PROGRAM)'], sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1069, sourceColumn: 2, sourceEndLine: 1069, clockExpr: 'gameboy_cartridges'};
MERGE (n:KG {id: 'inputs:megaduck'}) SET n:InputPorts SET n += {name: 'megaduck', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 962, sourceColumn: 8, sourceEndLine: 962};
MERGE (n:KG {id: 'inputs:megaduck/INPUTS'}) SET n:Port SET n += {tag: 'INPUTS', modify: false};
MERGE (n:KG {id: 'inputs:megaduck/INPUTS/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_NAME("Left")'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:megaduck/INPUTS/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_NAME("Right")'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:megaduck/INPUTS/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_NAME("Up")'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:megaduck/INPUTS/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_NAME("Down")'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:megaduck/INPUTS/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("Button A")'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:megaduck/INPUTS/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("Button B")'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:megaduck/INPUTS/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START', modifiers: ['PORT_NAME("Start")'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:megaduck/INPUTS/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SELECT', modifiers: ['PORT_NAME("Select")'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:gameboy'}) SET n:InputPorts SET n += {name: 'gameboy', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 974, sourceColumn: 8, sourceEndLine: 974};
MERGE (n:KG {id: 'inputs:gameboy/SKIP_CHECK'}) SET n:Port SET n += {tag: 'SKIP_CHECK', modify: false};
MERGE (n:KG {id: 'inputs:gameboy/SKIP_CHECK/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: '[HACK] Skip BIOS Logo check', defaultValue: 0, settings: ['0=Off', '1=On']};
MERGE (n:KG {id: 'device:gb_state.gameboy/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(gb_state::gb_palette), 4)', ownerTag: 'palette', targetClass: 'gb_state', targetMethod: 'gb_palette', entries: 4, sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1057};
MERGE (n:KG {id: 'handler:gb_state.gb_palette'}) SET n:Handler SET n += {method: 'gb_palette', ownerClass: 'gb_state', sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1011, sourceColumn: 1, sourceEndLine: 1015, sourceParameters: 'palette_device &palette', sourceBody: 'for (int i = 0; i < 4; i++)
		palette.set_pen_color(i, TABLE(i, 4287101951, 4283346609, 4283334788, 4283321934, 4288794564, 4285371787, 4283659115, 4282466625));'};
MATCH (a:KG {id: 'game:gameboy'}), (b:KG {id: 'file:src/mame/nintendo/gb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1293, sourceColumn: 1, sourceEndLine: 1293};
MATCH (a:KG {id: 'game:gameboy'}), (b:KG {id: 'machine:gb_state.gameboy'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:gameboy'}), (b:KG {id: 'inputs:gameboy'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:gameboy'}), (b:KG {id: 'romset:gameboy'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:bus/gameboy/carts.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:bus/gameboy/gbslot.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:bus/gameboy/mdslot.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:cpu/lr35902/lr35902.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:machine/ram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:sound/gb.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:video/gb_lcd.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:softlist_dev.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/gb.cpp'}), (b:KG {id: 'file:logmacro.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'file:src/mame/nintendo/gb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1042, sourceColumn: 1, sourceEndLine: 1074};
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'handler:base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'handler:gb_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'handler:gb_state.boot_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'softlist:gb_state.gameboy/gameboy'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'softlist:gb_state.gameboy/gbcolor'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'device:gb_state.gameboy/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'device:gb_state.gameboy/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'device:gb_state.gameboy/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'device:gb_state.gameboy/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'device:gb_state.gameboy/ppu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'device:gb_state.gameboy/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'device:gb_state.gameboy/apu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gb_state.gameboy'}), (b:KG {id: 'device:gb_state.gameboy/cartslot'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:gameboy'}), (b:KG {id: 'file:src/mame/nintendo/gb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 974, sourceColumn: 8, sourceEndLine: 974};
MATCH (a:KG {id: 'inputs:gameboy'}), (b:KG {id: 'inputs:megaduck'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:gameboy'}), (b:KG {id: 'inputs:gameboy/SKIP_CHECK'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:gameboy'}), (b:KG {id: 'file:src/mame/nintendo/gb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 1217, sourceColumn: 1, sourceEndLine: 1217};
MATCH (a:KG {id: 'romset:gameboy'}), (b:KG {id: 'region:gameboy/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:gb_state.machine_reset'}), (b:KG {id: 'handler:base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gb_state.gameboy/maincpu'}), (b:KG {id: 'device:gb_state.gameboy/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gb_state.gameboy/maincpu'}), (b:KG {id: 'map:gb_state.gameboy_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:gb_state.gameboy/screen'}), (b:KG {id: 'device:gb_state.gameboy/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gb_state.gameboy/palette'}), (b:KG {id: 'device:gb_state.gameboy/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gb_state.gameboy/apu'}), (b:KG {id: 'audioroute:device:gb_state.gameboy/apu/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gb_state.gameboy/apu'}), (b:KG {id: 'audioroute:device:gb_state.gameboy/apu/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:megaduck'}), (b:KG {id: 'file:src/mame/nintendo/gb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 962, sourceColumn: 8, sourceEndLine: 962};
MATCH (a:KG {id: 'inputs:megaduck'}), (b:KG {id: 'inputs:megaduck/INPUTS'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gameboy/SKIP_CHECK'}), (b:KG {id: 'inputs:gameboy/SKIP_CHECK/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:gameboy/maincpu'}), (b:KG {id: 'rom:gameboy/maincpu/dmg_boot.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:gb_state.gameboy/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:gb_state.gb_timer_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'file:src/mame/nintendo/gb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/gb.cpp', sourceLine: 899, sourceColumn: 1, sourceEndLine: 912};
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map'}), (b:KG {id: 'map:gb_state.gameboy_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:gb_state.gameboy/screen/callback:screen:0'}), (b:KG {id: 'handler:dmg_ppu_device.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gb_state.gameboy/palette/callback:palette_init'}), (b:KG {id: 'handler:gb_state.gb_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:megaduck/INPUTS'}), (b:KG {id: 'inputs:megaduck/INPUTS/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:megaduck/INPUTS'}), (b:KG {id: 'inputs:megaduck/INPUTS/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:megaduck/INPUTS'}), (b:KG {id: 'inputs:megaduck/INPUTS/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:megaduck/INPUTS'}), (b:KG {id: 'inputs:megaduck/INPUTS/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:megaduck/INPUTS'}), (b:KG {id: 'inputs:megaduck/INPUTS/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:megaduck/INPUTS'}), (b:KG {id: 'inputs:megaduck/INPUTS/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:megaduck/INPUTS'}), (b:KG {id: 'inputs:megaduck/INPUTS/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:megaduck/INPUTS'}), (b:KG {id: 'inputs:megaduck/INPUTS/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'handler:gb_state.gb_timer_callback'}), (b:KG {id: 'handler:base_state.gb_timer_check_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:gb_state.gb_timer_callback'}), (b:KG {id: 'handler:base_state.gb_timer_increment'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:gb_state.gb_timer_callback'}), (b:KG {id: 'handler:base_state.gb_serial_timer_tick'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range0'}), (b:KG {id: 'handler:dmg_ppu_device.vram_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ppu'};
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range0'}), (b:KG {id: 'handler:dmg_ppu_device.vram_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ppu'};
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range2'}), (b:KG {id: 'handler:dmg_ppu_device.oam_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ppu'};
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range2'}), (b:KG {id: 'handler:dmg_ppu_device.oam_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ppu'};
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range3'}), (b:KG {id: 'handler:gb_state.gb_io_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range3'}), (b:KG {id: 'handler:gb_state.gb_io_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range4'}), (b:KG {id: 'handler:gameboy_sound_device.sound_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'apu'};
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range4'}), (b:KG {id: 'handler:gameboy_sound_device.sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'apu'};
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range6'}), (b:KG {id: 'handler:gameboy_sound_device.wave_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'apu'};
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range6'}), (b:KG {id: 'handler:gameboy_sound_device.wave_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'apu'};
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range7'}), (b:KG {id: 'handler:dmg_ppu_device.video_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ppu'};
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range7'}), (b:KG {id: 'handler:gb_state.gb_io2_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range9'}), (b:KG {id: 'handler:gb_state.gb_ie_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:gb_state.gameboy_map/range9'}), (b:KG {id: 'handler:gb_state.gb_ie_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:base_state.gb_timer_increment'}), (b:KG {id: 'handler:base_state.gb_timer_check_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:gb_state.gb_io_w'}), (b:KG {id: 'handler:base_state.gb_timer_increment'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:gb_state.gb_io2_w'}), (b:KG {id: 'handler:gb_state.disable_boot'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
