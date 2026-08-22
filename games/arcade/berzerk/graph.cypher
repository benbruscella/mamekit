// mamekit knowledge graph — driver src/mame/stern/berzerk.cpp
// generated 2026-08-22T05:52:09.574Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/stern/berzerk.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/stern/berzerk.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:exidysound.h'}) SET n:SourceFile SET n += {path: 'exidysound.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/74181.h'}) SET n:SourceFile SET n += {path: 'machine/74181.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:sound/flt_vol.h'}) SET n:SourceFile SET n += {path: 'sound/flt_vol.h', external: true};
MERGE (n:KG {id: 'file:sound/s14001a.h'}) SET n:SourceFile SET n += {path: 'sound/s14001a.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'callback:timer/berzerk_state.irq_callback'}) SET n:Callback SET n += {ownerTag: 'irq_timer', signal: 'timer', operation: 'adjust', targetClass: 'berzerk_state', targetMethod: 'irq_callback', scanlines: [128, 256], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 284, sourceColumn: 1, sourceEndLine: 303};
MERGE (n:KG {id: 'handler:berzerk_state.irq_callback'}) SET n:Handler SET n += {method: 'irq_callback', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 284, sourceColumn: 1, sourceEndLine: 303, sourceConstants: ['IRQS_PER_FRAME=2'], sourceParameters: 'int param', sourceBody: 'int irq_number = param;
	uint8_t next_counter;
	uint8_t next_v256;
	int next_vpos;
	int next_irq_number;

	/* set the IRQ line if enabled */
	if (m_irq_enabled)
		m_maincpu->set_input_line(0, HOLD_LINE); // Z80

	/* set up for next interrupt */
	next_irq_number = (irq_number + 1) % IRQS_PER_FRAME;
	next_counter = TABLE(next_irq_number, 0x80, 0xda);
	next_v256 = TABLE(next_irq_number, 0x00, 0x01);

	next_vpos = vsync_chain_counter_to_vpos(next_counter, next_v256);
	m_irq_timer->adjust(m_screen->time_until_pos(next_vpos), next_irq_number);'};
MERGE (n:KG {id: 'handler:berzerk_state.vsync_chain_counter_to_vpos'}) SET n:Handler SET n += {method: 'vsync_chain_counter_to_vpos', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 246, sourceColumn: 1, sourceEndLine: 262, sourceConstants: ['VTOTAL=262', 'VBSTART=256', 'VCOUNTER_START_VBLANK=218'], sourceParameters: 'uint8_t counter, uint8_t v256', sourceBody: '/* convert from the vertical sync counters to an actual vertical position */
	int vpos;

	if (v256)
	{
		vpos = counter - VCOUNTER_START_VBLANK + VBSTART;

		if (vpos >= VTOTAL)
			vpos = vpos - VTOTAL;
	}
	else
		vpos = counter;

	return vpos;'};
MERGE (n:KG {id: 'callback:timer/berzerk_state.nmi_callback'}) SET n:Callback SET n += {ownerTag: 'nmi_timer', signal: 'timer', operation: 'adjust', targetClass: 'berzerk_state', targetMethod: 'nmi_callback', scanlines: [48, 80, 112, 144, 176, 208, 240, 16], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 361, sourceColumn: 1, sourceEndLine: 380};
MERGE (n:KG {id: 'handler:berzerk_state.nmi_callback'}) SET n:Handler SET n += {method: 'nmi_callback', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 361, sourceColumn: 1, sourceEndLine: 380, sourceConstants: ['NMIS_PER_FRAME=8'], sourceParameters: 'int param', sourceBody: 'int nmi_number = param;
	uint8_t next_counter;
	uint8_t next_v256;
	int next_vpos;
	int next_nmi_number;

	/* pulse the NMI line if enabled */
	if (m_nmi_enabled)
		m_maincpu->pulse_input_line(INPUT_LINE_NMI, attotime::zero);

	/* set up for next interrupt */
	next_nmi_number = (nmi_number + 1) % NMIS_PER_FRAME;
	next_counter = TABLE(next_nmi_number, 0x30, 0x50, 0x70, 0x90, 0xb0, 0xd0, 0xf0, 0xf0);
	next_v256 = TABLE(next_nmi_number, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01);

	next_vpos = vsync_chain_counter_to_vpos(next_counter, next_v256);
	m_nmi_timer->adjust(m_screen->time_until_pos(next_vpos), next_nmi_number);'};
MERGE (n:KG {id: 'game:berzerk'}) SET n:Game SET n += {name: 'berzerk', year: '1980', company: 'Stern Electronics', fullname: 'Berzerk (revision RC31A)', monitor: 'ROT0', cls: 'berzerk_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1455, sourceColumn: 1, sourceEndLine: 1455};
MERGE (n:KG {id: 'romset:berzerk'}) SET n:RomSet SET n += {name: 'berzerk', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1255, sourceColumn: 1, sourceEndLine: 1255};
MERGE (n:KG {id: 'region:berzerk/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', fills: [14336, 2048, 255], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1256, sourceColumn: 2, sourceEndLine: 1256};
MERGE (n:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_1c.rom0.1c'}) SET n:Rom SET n += {file: 'berzerk_rc31_1c.rom0.1c', offset: 0, size: 2048, crc: 'ca566dbc', sha1: 'fae2647f12f1cd82826db61b53b116a5e0c9f995', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1257, sourceColumn: 2, sourceEndLine: 1257};
MERGE (n:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_1d.rom1.1d'}) SET n:Rom SET n += {file: 'berzerk_rc31_1d.rom1.1d', offset: 4096, size: 2048, crc: '7ba69fde', sha1: '69af170c4a39a3494dcd180737e5c87b455f9203', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1258, sourceColumn: 2, sourceEndLine: 1258};
MERGE (n:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_3d.rom2.3d'}) SET n:Rom SET n += {file: 'berzerk_rc31_3d.rom2.3d', offset: 6144, size: 2048, crc: 'a1d5248b', sha1: 'a0b7842f6a5f86c16d80d78e7012c78b3ea11d1d', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1259, sourceColumn: 2, sourceEndLine: 1259};
MERGE (n:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_5d.rom3.5d'}) SET n:Rom SET n += {file: 'berzerk_rc31_5d.rom3.5d', offset: 8192, size: 2048, crc: 'fcaefa95', sha1: '07f849aa39f1e3db938187ffde4a46a588156ddc', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1260, sourceColumn: 2, sourceEndLine: 1260};
MERGE (n:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_6d.rom4.6d'}) SET n:Rom SET n += {file: 'berzerk_rc31_6d.rom4.6d', offset: 10240, size: 2048, crc: '1e35b9a0', sha1: '5a5e549ec0e4803ab2d1eac6b3e7171aedf28244', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1261, sourceColumn: 2, sourceEndLine: 1261};
MERGE (n:KG {id: 'rom:berzerk/maincpu/berzerk_rc31a_5c.rom5.5c'}) SET n:Rom SET n += {file: 'berzerk_rc31a_5c.rom5.5c', offset: 12288, size: 2048, crc: 'e0fab8f5', sha1: '31acef9583546671debe768e3d5c695ba1b9f7e0', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1262, sourceColumn: 2, sourceEndLine: 1262};
MERGE (n:KG {id: 'region:berzerk/speech'}) SET n:RomRegion SET n += {tag: 'speech', size: 4096, flags: '0', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1265, sourceColumn: 2, sourceEndLine: 1265};
MERGE (n:KG {id: 'rom:berzerk/speech/berzerk_r_vo_1c.1c'}) SET n:Rom SET n += {file: 'berzerk_r_vo_1c.1c', offset: 0, size: 2048, crc: '2cfe825d', sha1: 'f12fed8712f20fa8213f606c4049a8144bfea42e', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1266, sourceColumn: 2, sourceEndLine: 1266};
MERGE (n:KG {id: 'rom:berzerk/speech/berzerk_r_vo_2c.2c'}) SET n:Rom SET n += {file: 'berzerk_r_vo_2c.2c', offset: 2048, size: 2048, crc: 'd2b6324e', sha1: '20a6611ad6ec19409ac138bdae7bdfaeab6c47cf', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1267, sourceColumn: 2, sourceEndLine: 1267};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_map'}) SET n:AddressMap SET n += {cls: 'berzerk_state', name: 'berzerk_map', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 667, sourceColumn: 1, sourceEndLine: 676};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 2047, raw: 'map(0x0000, 0x07ff).rom()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 669, sourceColumn: 2, sourceEndLine: 669, rom: true};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_map/range1'}) SET n:AddressRange SET n += {start: 2048, end: 3071, raw: 'map(0x0800, 0x0bff).mirror(0x0400).ram().share("nvram")', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 670, sourceColumn: 2, sourceEndLine: 670, mirror: 1024, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_map/range2'}) SET n:AddressRange SET n += {start: 4096, end: 16383, raw: 'map(0x1000, 0x3fff).rom()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 671, sourceColumn: 2, sourceEndLine: 671, rom: true};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_map/range3'}) SET n:AddressRange SET n += {start: 16384, end: 24575, raw: 'map(0x4000, 0x5fff).ram().share("videoram")', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 672, sourceColumn: 2, sourceEndLine: 672, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_map/range4'}) SET n:AddressRange SET n += {start: 24576, end: 32767, raw: 'map(0x6000, 0x7fff).ram().w(FUNC(berzerk_state::magicram_w)).share("videoram")', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 673, sourceColumn: 2, sourceEndLine: 673, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:berzerk_state.magicram_w'}) SET n:Handler SET n += {method: 'magicram_w', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 450, sourceColumn: 1, sourceEndLine: 484, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'uint8_t alu_output;

	uint8_t current_video_data = m_videoram[offset];

	/* shift data towards LSB.  MSB bits are filled by data from last_shift_data.
	   The shifter consists of 5 74153 devices @ 7A, 8A, 9A, 10A and 11A,
	   followed by 4 more 153\'s at 11B, 10B, 9B and 8B, which optionally
	   reverse the order of the resulting bits */
	uint8_t shift_flop_output = (((uint16_t)m_last_shift_data << 8) | data) >> (m_magicram_control & 0x07);

	if (m_magicram_control & 0x08)
		shift_flop_output = bitswap<8>(shift_flop_output, 0, 1, 2, 3, 4, 5, 6, 7);

	/* collision detection - AND gate output goes to the K pin of the flip-flop,
	   while J is LO, therefore, it only resets, never sets */
	if (shift_flop_output & current_video_data)
		m_intercept = 0;

	/* perform ALU step */
	m_ls181_12c->input_a_w(shift_flop_output >> 0);
	m_ls181_10c->input_a_w(shift_flop_output >> 4);
	m_ls181_12c->input_b_w(current_video_data >> 0);
	m_ls181_10c->input_b_w(current_video_data >> 4);
	m_ls181_12c->select_w(m_magicram_control >> 4);
	m_ls181_10c->select_w(m_magicram_control >> 4);

	alu_output = m_ls181_10c->function_r() << 4 | m_ls181_12c->function_r();

	m_videoram[offset] = alu_output ^ 0xff;

	/* save data for next time */
	m_last_shift_data = data & 0x7f;'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_map/range5'}) SET n:AddressRange SET n += {start: 32768, end: 34815, raw: 'map(0x8000, 0x87ff).mirror(0x3800).ram().share("colorram")', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 674, sourceColumn: 2, sourceEndLine: 674, mirror: 14336, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_map/range6'}) SET n:AddressRange SET n += {start: 49152, end: 65535, raw: 'map(0xc000, 0xffff).noprw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 675, sourceColumn: 2, sourceEndLine: 675};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map'}) SET n:AddressMap SET n += {cls: 'berzerk_state', name: 'berzerk_io_map', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 697, sourceColumn: 1, sourceEndLine: 721, globalMask: 255};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 63, raw: 'map(0x00, 0x3f).noprw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 700, sourceColumn: 2, sourceEndLine: 700};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range1'}) SET n:AddressRange SET n += {start: 64, end: 71, raw: 'map(0x40, 0x47).rw(FUNC(berzerk_state::audio_r), FUNC(berzerk_state::audio_w))', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 701, sourceColumn: 2, sourceEndLine: 701};
MERGE (n:KG {id: 'handler:berzerk_state.audio_r'}) SET n:Handler SET n += {method: 'audio_r', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 635, sourceColumn: 1, sourceEndLine: 650, sourceParameters: 'offs_t offset', sourceBody: 'switch (offset)
	{
	/* offset 4 reads from the S14001A */
	case 4:
		return (m_s14001a->busy_r()) ? 0x00 : 0x40;
	/* offset 6 is open bus */
	case 6:
		logerror("attempted read from berzerk audio reg 6 (sfxctrl)!\\n");
		return 0;
	/* everything else reads from the 6840 */
	default:
		return m_custom->sh6840_r(offset);
	}'};
MERGE (n:KG {id: 'handler:berzerk_state.audio_w'}) SET n:Handler SET n += {method: 'audio_w', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 587, sourceColumn: 1, sourceEndLine: 632, sourceConstants: ['S14001_CLOCK=2500000'], sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'switch (offset)
	{
	/* offset 4 writes to the S14001A */
	case 4:
		switch (data >> 6)
		{
		/* write data to the S14001 */
		case 0:
			m_s14001a->data_w(data & 0x3f);

			/* clock the chip via a 555 timer */
			m_s14001a->start_w(1);
			m_s14001a->start_w(0);

			break;

		case 1:
		{
			/* volume - 0 appears to be inaudible */
			m_s14001a_volume->set_gain((data >> 3 & 7) / 7.0);

			/* clock control - the first LS161 divides the clock by 9 to 16, the 2nd by 8,
			   giving a final clock from 19.5kHz to 34.7kHz */
			int clock_divisor = 16 - (data & 0x07);
			m_s14001a->set_unscaled_clock(S14001_CLOCK / clock_divisor / 8);
			break;
		}

		default: break; /* 2 and 3 are not connected */
		}

		break;

	/* offset 6 writes to the sfxcontrol latch */
	case 6:
		m_custom->sfxctrl_w(data >> 6, data);
		break;

	/* everything else writes to the 6840 */
	default:
		m_custom->sh6840_w(offset, data);
		break;
	}'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range2'}) SET n:AddressRange SET n += {start: 72, end: 72, raw: 'map(0x48, 0x48).portr("P1").nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702, nopw: true, portRead: 'P1'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range3'}) SET n:AddressRange SET n += {start: 73, end: 73, raw: 'map(0x49, 0x49).portr("SYSTEM").nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 703, sourceColumn: 2, sourceEndLine: 703, nopw: true, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range4'}) SET n:AddressRange SET n += {start: 74, end: 74, raw: 'map(0x4a, 0x4a).portr("P2").nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 704, sourceColumn: 2, sourceEndLine: 704, nopw: true, portRead: 'P2'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range5'}) SET n:AddressRange SET n += {start: 75, end: 75, raw: 'map(0x4b, 0x4b).nopr().w(FUNC(berzerk_state::magicram_control_w))', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 705, sourceColumn: 2, sourceEndLine: 705, nopr: true};
MERGE (n:KG {id: 'handler:berzerk_state.magicram_control_w'}) SET n:Handler SET n += {method: 'magicram_control_w', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 487, sourceColumn: 1, sourceEndLine: 494, sourceParameters: 'uint8_t data', sourceBody: '/* save the control byte, clear the shift data latch,
	   and set the intercept flip-flop */
	m_magicram_control = data;
	m_last_shift_data = 0;
	m_intercept = 1;'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range6'}) SET n:AddressRange SET n += {start: 76, end: 76, raw: 'map(0x4c, 0x4c).rw(FUNC(berzerk_state::nmi_enable_r), FUNC(berzerk_state::nmi_enable_w))', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 706, sourceColumn: 2, sourceEndLine: 706};
MERGE (n:KG {id: 'handler:berzerk_state.nmi_enable_r'}) SET n:Handler SET n += {method: 'nmi_enable_r', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 350, sourceParameters: '', sourceBody: 'm_nmi_enabled = 1;

	return 0;'};
MERGE (n:KG {id: 'handler:berzerk_state.nmi_enable_w'}) SET n:Handler SET n += {method: 'nmi_enable_w', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 333, sourceColumn: 1, sourceEndLine: 336, sourceParameters: 'uint8_t data', sourceBody: 'm_nmi_enabled = 1;'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range7'}) SET n:AddressRange SET n += {start: 77, end: 77, raw: 'map(0x4d, 0x4d).rw(FUNC(berzerk_state::nmi_disable_r), FUNC(berzerk_state::nmi_disable_w))', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 707, sourceColumn: 2, sourceEndLine: 707};
MERGE (n:KG {id: 'handler:berzerk_state.nmi_disable_r'}) SET n:Handler SET n += {method: 'nmi_disable_r', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 353, sourceColumn: 1, sourceEndLine: 358, sourceParameters: '', sourceBody: 'm_nmi_enabled = 0;

	return 0;'};
MERGE (n:KG {id: 'handler:berzerk_state.nmi_disable_w'}) SET n:Handler SET n += {method: 'nmi_disable_w', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 339, sourceColumn: 1, sourceEndLine: 342, sourceParameters: 'uint8_t data', sourceBody: 'm_nmi_enabled = 0;'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range8'}) SET n:AddressRange SET n += {start: 78, end: 78, raw: 'map(0x4e, 0x4e).r(FUNC(berzerk_state::intercept_v256_r)).nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 708, sourceColumn: 2, sourceEndLine: 708, nopw: true};
MERGE (n:KG {id: 'handler:berzerk_state.intercept_v256_r'}) SET n:Handler SET n += {method: 'intercept_v256_r', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 497, sourceColumn: 1, sourceEndLine: 505, sourceParameters: '', sourceBody: 'uint8_t counter;
	uint8_t v256;

	vpos_to_vsync_chain_counter(m_screen->vpos(), &counter, &v256);

	return (m_intercept^1) << 7 | v256;'};
MERGE (n:KG {id: 'handler:berzerk_state.vpos_to_vsync_chain_counter'}) SET n:Handler SET n += {method: 'vpos_to_vsync_chain_counter', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 227, sourceColumn: 1, sourceEndLine: 243, sourceConstants: ['VTOTAL=262', 'VBEND=32', 'VBSTART=256', 'VCOUNTER_START_VBLANK=218'], sourceParameters: 'int vpos, uint8_t *counter, uint8_t *v256', sourceBody: '/* convert from a vertical position to the actual values on the vertical sync counters */
	*v256 = ((vpos < VBEND) || (vpos >= VBSTART));

	if (*v256)
	{
		int temp = vpos - VBSTART + VCOUNTER_START_VBLANK;

		if (temp < 0)
			*counter = temp + VTOTAL;
		else
			*counter = temp;
	}
	else
		*counter = vpos;'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range9'}) SET n:AddressRange SET n += {start: 79, end: 79, raw: 'map(0x4f, 0x4f).nopr().w(FUNC(berzerk_state::irq_enable_w))', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 709, sourceColumn: 2, sourceEndLine: 709, nopr: true};
MERGE (n:KG {id: 'handler:berzerk_state.irq_enable_w'}) SET n:Handler SET n += {method: 'irq_enable_w', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 274, sourceColumn: 1, sourceEndLine: 277, sourceParameters: 'uint8_t data', sourceBody: 'm_irq_enabled = data & 0x01;'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range10'}) SET n:AddressRange SET n += {start: 80, end: 87, raw: 'map(0x50, 0x57).noprw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 710, sourceColumn: 2, sourceEndLine: 710};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range11'}) SET n:AddressRange SET n += {start: 88, end: 95, raw: 'map(0x58, 0x5f).noprw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 711, sourceColumn: 2, sourceEndLine: 711};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range12'}) SET n:AddressRange SET n += {start: 96, end: 96, raw: 'map(0x60, 0x60).mirror(0x18).portr("F3").nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 712, sourceColumn: 2, sourceEndLine: 712, mirror: 24, nopw: true, portRead: 'F3'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range13'}) SET n:AddressRange SET n += {start: 97, end: 97, raw: 'map(0x61, 0x61).mirror(0x18).portr("F2").nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 713, sourceColumn: 2, sourceEndLine: 713, mirror: 24, nopw: true, portRead: 'F2'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range14'}) SET n:AddressRange SET n += {start: 98, end: 98, raw: 'map(0x62, 0x62).mirror(0x18).portr("F6").nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 714, sourceColumn: 2, sourceEndLine: 714, mirror: 24, nopw: true, portRead: 'F6'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range15'}) SET n:AddressRange SET n += {start: 99, end: 99, raw: 'map(0x63, 0x63).mirror(0x18).portr("F5").nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 715, sourceColumn: 2, sourceEndLine: 715, mirror: 24, nopw: true, portRead: 'F5'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range16'}) SET n:AddressRange SET n += {start: 100, end: 100, raw: 'map(0x64, 0x64).mirror(0x18).portr("F4").nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 716, sourceColumn: 2, sourceEndLine: 716, mirror: 24, nopw: true, portRead: 'F4'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range17'}) SET n:AddressRange SET n += {start: 101, end: 101, raw: 'map(0x65, 0x65).mirror(0x18).portr("SW2").nopw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 717, sourceColumn: 2, sourceEndLine: 717, mirror: 24, nopw: true, portRead: 'SW2'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range18'}) SET n:AddressRange SET n += {start: 102, end: 102, raw: 'map(0x66, 0x66).mirror(0x18).rw(FUNC(berzerk_state::led_off_r), FUNC(berzerk_state::led_off_w))', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 718, sourceColumn: 2, sourceEndLine: 718, mirror: 24};
MERGE (n:KG {id: 'handler:berzerk_state.led_off_r'}) SET n:Handler SET n += {method: 'led_off_r', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 205, sourceColumn: 1, sourceEndLine: 210, sourceParameters: '', sourceBody: 'm_led = 0;

	return 0;'};
MERGE (n:KG {id: 'handler:berzerk_state.led_off_w'}) SET n:Handler SET n += {method: 'led_off_w', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 213, sourceColumn: 1, sourceEndLine: 216, sourceParameters: 'uint8_t data', sourceBody: 'm_led = 0;'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range19'}) SET n:AddressRange SET n += {start: 103, end: 103, raw: 'map(0x67, 0x67).mirror(0x18).rw(FUNC(berzerk_state::led_on_r), FUNC(berzerk_state::led_on_w))', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 719, sourceColumn: 2, sourceEndLine: 719, mirror: 24};
MERGE (n:KG {id: 'handler:berzerk_state.led_on_r'}) SET n:Handler SET n += {method: 'led_on_r', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 191, sourceColumn: 1, sourceEndLine: 196, sourceParameters: '', sourceBody: 'm_led = 1;

	return 0;'};
MERGE (n:KG {id: 'handler:berzerk_state.led_on_w'}) SET n:Handler SET n += {method: 'led_on_w', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 199, sourceColumn: 1, sourceEndLine: 202, sourceParameters: 'uint8_t data', sourceBody: 'm_led = 1;'};
MERGE (n:KG {id: 'map:berzerk_state.berzerk_io_map/range20'}) SET n:AddressRange SET n += {start: 128, end: 255, raw: 'map(0x80, 0xff).noprw()', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 720, sourceColumn: 2, sourceEndLine: 720};
MERGE (n:KG {id: 'machine:berzerk_state.berzerk'}) SET n:MachineConfig SET n += {cls: 'berzerk_state', name: 'berzerk', calls: [], resetHandlers: ['berzerk_state.machine_reset'], startHandlers: ['berzerk_state.video_start'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1174, sourceColumn: 1, sourceEndLine: 1200};
MERGE (n:KG {id: 'handler:berzerk_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 424, sourceColumn: 1, sourceEndLine: 433, sourceParameters: '', sourceBody: 'm_irq_enabled = 0;
	m_nmi_enabled = 0;
	m_led = 0;
	m_magicram_control = 0;

	start_irq_timer();
	start_nmi_timer();'};
MERGE (n:KG {id: 'handler:berzerk_state.start_irq_timer'}) SET n:Handler SET n += {method: 'start_irq_timer', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 312, sourceColumn: 1, sourceEndLine: 316, sourceParameters: '', sourceBody: 'int vpos = vsync_chain_counter_to_vpos(TABLE(0, 0x80, 0xda), TABLE(0, 0x00, 0x01));
	m_irq_timer->adjust(m_screen->time_until_pos(vpos));'};
MERGE (n:KG {id: 'handler:berzerk_state.start_nmi_timer'}) SET n:Handler SET n += {method: 'start_nmi_timer', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 389, sourceColumn: 1, sourceEndLine: 393, sourceParameters: '', sourceBody: 'int vpos = vsync_chain_counter_to_vpos(TABLE(0, 0x30, 0x50, 0x70, 0x90, 0xb0, 0xd0, 0xf0, 0xf0), TABLE(0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01));
	m_nmi_timer->adjust(m_screen->time_until_pos(vpos));'};
MERGE (n:KG {id: 'handler:berzerk_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 443, sourceColumn: 1, sourceEndLine: 447, sourceParameters: '', sourceBody: 'm_ls181_10c->mode_w(1);
	m_ls181_12c->mode_w(1);'};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 2500000, config: ['Z80(config, m_maincpu, MAIN_CPU_CLOCK)', 'm_maincpu->set_addrmap(AS_PROGRAM, &berzerk_state::berzerk_map)', 'm_maincpu->set_addrmap(AS_IO, &berzerk_state::berzerk_io_map)', 'm_maincpu->set_irq_acknowledge_callback(FUNC(berzerk_state::vector_r))'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1177, sourceColumn: 2, sourceEndLine: 1177};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_irq_acknowledge_callback', operation: 'set_irq_acknowledge_callback', raw: 'm_maincpu->set_irq_acknowledge_callback(FUNC(berzerk_state::vector_r))', ownerTag: 'maincpu', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1180, sourceColumn: 2, sourceEndLine: 1180, targetClass: 'berzerk_state', targetMethod: 'vector_r'};
MERGE (n:KG {id: 'handler:berzerk_state.vector_r'}) SET n:Handler SET n += {method: 'vector_r', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 279, sourceColumn: 1, sourceEndLine: 282, sourceParameters: 'int irqline', sourceBody: 'return 0xfc; // IM 2'};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1182, sourceColumn: 2, sourceEndLine: 1182, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/ls181_10c'}) SET n:Device SET n += {type: 'TTL74181', tag: 'ls181_10c', clock: null, config: ['TTL74181(config, m_ls181_10c)'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1184, sourceColumn: 2, sourceEndLine: 1184};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/ls181_12c'}) SET n:Device SET n += {type: 'TTL74181', tag: 'ls181_12c', clock: null, config: ['TTL74181(config, m_ls181_12c)'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1185, sourceColumn: 2, sourceEndLine: 1185};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(PIXEL_CLOCK, HTOTAL, HBEND, HBSTART, VTOTAL, VBEND, VBSTART)', 'm_screen->set_screen_update(FUNC(berzerk_state::screen_update))'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1188, sourceColumn: 2, sourceEndLine: 1188, configCalls: ['set_raw(5000000,320,0,256,262,32,256)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [5000000, 320, 0, 256, 262, 32, 256]};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(berzerk_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1190, sourceColumn: 2, sourceEndLine: 1190, targetClass: 'berzerk_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:berzerk_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 542, sourceColumn: 1, sourceEndLine: 577, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'rgb_t pens[0x10];
	get_pens(pens);

	for (int offs = 0; offs < m_videoram.bytes(); offs++)
	{
		uint8_t data = m_videoram[offs];
		uint8_t color = m_colorram[((offs >> 2) & 0x07e0) | (offs & 0x001f)];

		uint8_t y = offs >> 5;
		uint8_t x = offs << 3;

		int i;

		for (i = 0; i < 4; i++)
		{
			rgb_t pen = (data & 0x80) ? pens[color >> 4] : rgb_t::black();
			bitmap.pix(y, x) = pen;

			x++;
			data <<= 1;
		}

		for (; i < 8; i++)
		{
			rgb_t pen = (data & 0x80) ? pens[color & 0x0f] : rgb_t::black();
			bitmap.pix(y, x) = pen;

			x++;
			data <<= 1;
		}
	}

	return 0;'};
MERGE (n:KG {id: 'handler:berzerk_state.get_pens'}) SET n:Handler SET n += {method: 'get_pens', ownerClass: 'berzerk_state', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 508, sourceColumn: 1, sourceEndLine: 539, sourceParameters: 'rgb_t *pens', sourceBody: 'double color_weights[2];

	if (ioport("MONITOR_TYPE")->read() == 0)
		compute_resistor_weights(0, 0xff, -1.0,
									2, resistances_wg, color_weights, 0, 270,
									2, resistances_wg, color_weights, 0, 270,
									2, resistances_wg, color_weights, 0, 270);
	else
		compute_resistor_weights(0, 0xff, -1.0,
									2, resistances_el, color_weights, 0, 270,
									2, resistances_el, color_weights, 0, 270,
									2, resistances_el, color_weights, 0, 270);

	for (int color = 0; color < 0x10; color++)
	{
		uint8_t r_bit = (color >> 0) & 0x01;
		uint8_t g_bit = (color >> 1) & 0x01;
		uint8_t b_bit = (color >> 2) & 0x01;
		uint8_t i_bit = (color >> 3) & 0x01;

		uint8_t r = combine_weights(color_weights, r_bit & i_bit, r_bit);
		uint8_t g = combine_weights(color_weights, g_bit & i_bit, g_bit);
		uint8_t b = combine_weights(color_weights, b_bit & i_bit, b_bit);

		pens[color] = rgb_t(r, g, b);
	}'};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1193, sourceColumn: 2, sourceEndLine: 1193};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/speech'}) SET n:Device SET n += {type: 'S14001A', tag: 'speech', clock: 19531.25, config: ['S14001A(config, m_s14001a, S14001_CLOCK/16/8)', 'm_s14001a->add_route(ALL_OUTPUTS, "s14001a_volume", 0.5)'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1195, sourceColumn: 2, sourceEndLine: 1195};
MERGE (n:KG {id: 'audioroute:device:berzerk_state.berzerk/speech/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 's14001a_volume', gain: 0.5, raw: 'm_s14001a->add_route(ALL_OUTPUTS, "s14001a_volume", 0.5)', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1196, sourceColumn: 2, sourceEndLine: 1196};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/s14001a_volume'}) SET n:Device SET n += {type: 'FILTER_VOLUME', tag: 's14001a_volume', clock: null, config: ['FILTER_VOLUME(config, m_s14001a_volume).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1197, sourceColumn: 2, sourceEndLine: 1197};
MERGE (n:KG {id: 'audioroute:device:berzerk_state.berzerk/s14001a_volume/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'FILTER_VOLUME(config, m_s14001a_volume).add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1197, sourceColumn: 2, sourceEndLine: 1197};
MERGE (n:KG {id: 'device:berzerk_state.berzerk/exidy'}) SET n:Device SET n += {type: 'EXIDY', tag: 'exidy', clock: 0, config: ['EXIDY(config, m_custom).add_route(ALL_OUTPUTS, "mono", 0.33)'], sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1199, sourceColumn: 2, sourceEndLine: 1199};
MERGE (n:KG {id: 'audioroute:device:berzerk_state.berzerk/exidy/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.33, raw: 'EXIDY(config, m_custom).add_route(ALL_OUTPUTS, "mono", 0.33)', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1199, sourceColumn: 2, sourceEndLine: 1199};
MERGE (n:KG {id: 'inputs:joystick'}) SET n:InputPorts SET n += {name: 'joystick', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 751, sourceColumn: 8, sourceEndLine: 751};
MERGE (n:KG {id: 'inputs:joystick/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:joystick/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:joystick/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:joystick/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:joystick/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:joystick/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:joystick/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:joystick/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:joystick/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:joystick/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:joystick/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:joystick/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:joystick/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:joystick/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 96, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:joystick/P2/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Cabinet', defaultValue: 128, settings: ['128=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:common'}) SET n:InputPorts SET n += {name: 'common', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 772, sourceColumn: 8, sourceEndLine: 772};
MERGE (n:KG {id: 'inputs:common/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:common/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:common/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:common/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 28, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:common/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN3'};
MERGE (n:KG {id: 'inputs:common/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:common/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:common/MONITOR_TYPE'}) SET n:Port SET n += {tag: 'MONITOR_TYPE', modify: false};
MERGE (n:KG {id: 'inputs:common/MONITOR_TYPE/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Monitor Type', defaultValue: 0, settings: ['0=Wells-Gardner', '1=Electrohome']};
MERGE (n:KG {id: 'inputs:common/MONITOR_TYPE/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 254, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:common/SW2'}) SET n:Port SET n += {tag: 'SW2', modify: false};
MERGE (n:KG {id: 'inputs:common/SW2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_SERVICE1', modifiers: ['PORT_NAME("Free Game (not logged in bookkeeping)")']};
MERGE (n:KG {id: 'inputs:common/SW2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 126, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:common/SW2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_SERVICE2', modifiers: ['PORT_NAME("Bookkeeping")', 'PORT_CODE(KEYCODE_F1)']};
MERGE (n:KG {id: 'inputs:berzerk'}) SET n:InputPorts SET n += {name: 'berzerk', sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 805, sourceColumn: 8, sourceEndLine: 805};
MERGE (n:KG {id: 'inputs:berzerk/F2'}) SET n:Port SET n += {tag: 'F2', modify: false};
MERGE (n:KG {id: 'inputs:berzerk/F2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Color Test', defaultValue: 0, location: 'F2:1,2', settings: ['0=Off', '3=On']};
MERGE (n:KG {id: 'inputs:berzerk/F2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 60, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:berzerk/F2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Bonus Life', defaultValue: 192, location: 'F2:7,8', settings: ['192=5000 and 10000', '64=5000', '128=10000', '0=None']};
MERGE (n:KG {id: 'inputs:berzerk/F3'}) SET n:Port SET n += {tag: 'F3', modify: false};
MERGE (n:KG {id: 'inputs:berzerk/F3/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Input Test Mode', defaultValue: 0, location: 'F3:1', settings: ['0=Off', '1=On']};
MERGE (n:KG {id: 'inputs:berzerk/F3/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Crosshair Pattern', defaultValue: 0, location: 'F3:2', settings: ['0=Off', '2=On']};
MERGE (n:KG {id: 'inputs:berzerk/F3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 60, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:berzerk/F3/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Language', defaultValue: 0, location: 'F3:7,8', settings: ['0=English', '64=German', '128=French', '192=Spanish']};
MERGE (n:KG {id: 'inputs:berzerk/F4'}) SET n:Port SET n += {tag: 'F4', modify: false};
MERGE (n:KG {id: 'inputs:berzerk/F4/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, name: '"Coin "#1', defaultValue: 0, location: '#F4":1,2,3,4"', settings: ['9=2C 1C', '13=4C 3C', '0=1C 1C', '14=4C 5C', '10=2C 3C', '15=4C 7C', '1=1C 2C', '11=2C 5C', '2=1C 3C', '12=2C 7C', '3=1C 4C', '4=1C 5C', '5=1C 6C', '6=1C 7C', '7=1C 10C', '8=1 Coin/14 Credits']};
MERGE (n:KG {id: 'inputs:berzerk/F4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:berzerk/F5'}) SET n:Port SET n += {tag: 'F5', modify: false};
MERGE (n:KG {id: 'inputs:berzerk/F5/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, name: '"Coin "#2', defaultValue: 0, location: '#F5":1,2,3,4"', settings: ['9=2C 1C', '13=4C 3C', '0=1C 1C', '14=4C 5C', '10=2C 3C', '15=4C 7C', '1=1C 2C', '11=2C 5C', '2=1C 3C', '12=2C 7C', '3=1C 4C', '4=1C 5C', '5=1C 6C', '6=1C 7C', '7=1C 10C', '8=1 Coin/14 Credits']};
MERGE (n:KG {id: 'inputs:berzerk/F5/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:berzerk/F6'}) SET n:Port SET n += {tag: 'F6', modify: false};
MERGE (n:KG {id: 'inputs:berzerk/F6/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, name: '"Coin "#3', defaultValue: 0, location: '#F6":1,2,3,4"', settings: ['9=2C 1C', '13=4C 3C', '0=1C 1C', '14=4C 5C', '10=2C 3C', '15=4C 7C', '1=1C 2C', '11=2C 5C', '2=1C 3C', '12=2C 7C', '3=1C 4C', '4=1C 5C', '5=1C 6C', '6=1C 7C', '7=1C 10C', '8=1 Coin/14 Credits']};
MERGE (n:KG {id: 'inputs:berzerk/F6/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED'};
MATCH (a:KG {id: 'game:berzerk'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1455, sourceColumn: 1, sourceEndLine: 1455};
MATCH (a:KG {id: 'game:berzerk'}), (b:KG {id: 'machine:berzerk_state.berzerk'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:berzerk'}), (b:KG {id: 'inputs:berzerk'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:berzerk'}), (b:KG {id: 'romset:berzerk'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:exidysound.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:machine/74181.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:sound/flt_vol.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:sound/s14001a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/stern/berzerk.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1174, sourceColumn: 1, sourceEndLine: 1200};
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'handler:berzerk_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'handler:berzerk_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'callback:timer/berzerk_state.irq_callback'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'callback:timer/berzerk_state.nmi_callback'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'device:berzerk_state.berzerk/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'device:berzerk_state.berzerk/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'device:berzerk_state.berzerk/ls181_10c'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'device:berzerk_state.berzerk/ls181_12c'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'device:berzerk_state.berzerk/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'device:berzerk_state.berzerk/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'device:berzerk_state.berzerk/speech'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'device:berzerk_state.berzerk/s14001a_volume'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:berzerk_state.berzerk'}), (b:KG {id: 'device:berzerk_state.berzerk/exidy'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:berzerk'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 805, sourceColumn: 8, sourceEndLine: 805};
MATCH (a:KG {id: 'inputs:berzerk'}), (b:KG {id: 'inputs:joystick'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:berzerk'}), (b:KG {id: 'inputs:common'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:berzerk'}), (b:KG {id: 'inputs:berzerk/F2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:berzerk'}), (b:KG {id: 'inputs:berzerk/F3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:berzerk'}), (b:KG {id: 'inputs:berzerk/F4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:berzerk'}), (b:KG {id: 'inputs:berzerk/F5'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:berzerk'}), (b:KG {id: 'inputs:berzerk/F6'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:berzerk'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 1255, sourceColumn: 1, sourceEndLine: 1255};
MATCH (a:KG {id: 'romset:berzerk'}), (b:KG {id: 'region:berzerk/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:berzerk'}), (b:KG {id: 'region:berzerk/speech'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:berzerk_state.machine_reset'}), (b:KG {id: 'handler:berzerk_state.start_irq_timer'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:berzerk_state.machine_reset'}), (b:KG {id: 'handler:berzerk_state.start_nmi_timer'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'callback:timer/berzerk_state.irq_callback'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 284, sourceColumn: 1, sourceEndLine: 303};
MATCH (a:KG {id: 'callback:timer/berzerk_state.irq_callback'}), (b:KG {id: 'handler:berzerk_state.irq_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'callback:timer/berzerk_state.nmi_callback'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 361, sourceColumn: 1, sourceEndLine: 380};
MATCH (a:KG {id: 'callback:timer/berzerk_state.nmi_callback'}), (b:KG {id: 'handler:berzerk_state.nmi_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:berzerk_state.berzerk/maincpu'}), (b:KG {id: 'device:berzerk_state.berzerk/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:berzerk_state.berzerk/maincpu'}), (b:KG {id: 'map:berzerk_state.berzerk_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:berzerk_state.berzerk/maincpu'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:berzerk_state.berzerk/screen'}), (b:KG {id: 'device:berzerk_state.berzerk/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:berzerk_state.berzerk/speech'}), (b:KG {id: 'audioroute:device:berzerk_state.berzerk/speech/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:berzerk_state.berzerk/s14001a_volume'}), (b:KG {id: 'audioroute:device:berzerk_state.berzerk/s14001a_volume/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:berzerk_state.berzerk/exidy'}), (b:KG {id: 'audioroute:device:berzerk_state.berzerk/exidy/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:joystick'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 751, sourceColumn: 8, sourceEndLine: 751};
MATCH (a:KG {id: 'inputs:joystick'}), (b:KG {id: 'inputs:joystick/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:joystick'}), (b:KG {id: 'inputs:joystick/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:common'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 772, sourceColumn: 8, sourceEndLine: 772};
MATCH (a:KG {id: 'inputs:common'}), (b:KG {id: 'inputs:common/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:common'}), (b:KG {id: 'inputs:common/MONITOR_TYPE'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:common'}), (b:KG {id: 'inputs:common/SW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F2'}), (b:KG {id: 'inputs:berzerk/F2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F2'}), (b:KG {id: 'inputs:berzerk/F2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F2'}), (b:KG {id: 'inputs:berzerk/F2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F3'}), (b:KG {id: 'inputs:berzerk/F3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F3'}), (b:KG {id: 'inputs:berzerk/F3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F3'}), (b:KG {id: 'inputs:berzerk/F3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F3'}), (b:KG {id: 'inputs:berzerk/F3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F4'}), (b:KG {id: 'inputs:berzerk/F4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F4'}), (b:KG {id: 'inputs:berzerk/F4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F5'}), (b:KG {id: 'inputs:berzerk/F5/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F5'}), (b:KG {id: 'inputs:berzerk/F5/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F6'}), (b:KG {id: 'inputs:berzerk/F6/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:berzerk/F6'}), (b:KG {id: 'inputs:berzerk/F6/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:berzerk/maincpu'}), (b:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_1c.rom0.1c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:berzerk/maincpu'}), (b:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_1d.rom1.1d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:berzerk/maincpu'}), (b:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_3d.rom2.3d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:berzerk/maincpu'}), (b:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_5d.rom3.5d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:berzerk/maincpu'}), (b:KG {id: 'rom:berzerk/maincpu/berzerk_rc31_6d.rom4.6d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:berzerk/maincpu'}), (b:KG {id: 'rom:berzerk/maincpu/berzerk_rc31a_5c.rom5.5c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:berzerk/speech'}), (b:KG {id: 'rom:berzerk/speech/berzerk_r_vo_1c.1c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:berzerk/speech'}), (b:KG {id: 'rom:berzerk/speech/berzerk_r_vo_2c.2c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:berzerk_state.start_irq_timer'}), (b:KG {id: 'handler:berzerk_state.vsync_chain_counter_to_vpos'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:berzerk_state.start_nmi_timer'}), (b:KG {id: 'handler:berzerk_state.vsync_chain_counter_to_vpos'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:berzerk_state.irq_callback'}), (b:KG {id: 'handler:berzerk_state.vsync_chain_counter_to_vpos'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:berzerk_state.nmi_callback'}), (b:KG {id: 'handler:berzerk_state.vsync_chain_counter_to_vpos'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:berzerk_state.berzerk/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:berzerk_state.vector_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_map'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 667, sourceColumn: 1, sourceEndLine: 676};
MATCH (a:KG {id: 'map:berzerk_state.berzerk_map'}), (b:KG {id: 'map:berzerk_state.berzerk_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_map'}), (b:KG {id: 'map:berzerk_state.berzerk_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_map'}), (b:KG {id: 'map:berzerk_state.berzerk_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_map'}), (b:KG {id: 'map:berzerk_state.berzerk_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_map'}), (b:KG {id: 'map:berzerk_state.berzerk_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_map'}), (b:KG {id: 'map:berzerk_state.berzerk_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_map'}), (b:KG {id: 'map:berzerk_state.berzerk_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'file:src/mame/stern/berzerk.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/stern/berzerk.cpp', sourceLine: 697, sourceColumn: 1, sourceEndLine: 721};
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range18'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range19'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map'}), (b:KG {id: 'map:berzerk_state.berzerk_io_map/range20'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:berzerk_state.berzerk/screen/callback:screen:0'}), (b:KG {id: 'handler:berzerk_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:joystick/P1'}), (b:KG {id: 'inputs:joystick/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P1'}), (b:KG {id: 'inputs:joystick/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P1'}), (b:KG {id: 'inputs:joystick/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P1'}), (b:KG {id: 'inputs:joystick/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P1'}), (b:KG {id: 'inputs:joystick/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P1'}), (b:KG {id: 'inputs:joystick/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P2'}), (b:KG {id: 'inputs:joystick/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P2'}), (b:KG {id: 'inputs:joystick/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P2'}), (b:KG {id: 'inputs:joystick/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P2'}), (b:KG {id: 'inputs:joystick/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P2'}), (b:KG {id: 'inputs:joystick/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P2'}), (b:KG {id: 'inputs:joystick/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:joystick/P2'}), (b:KG {id: 'inputs:joystick/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/SYSTEM'}), (b:KG {id: 'inputs:common/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/SYSTEM'}), (b:KG {id: 'inputs:common/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/SYSTEM'}), (b:KG {id: 'inputs:common/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/SYSTEM'}), (b:KG {id: 'inputs:common/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/SYSTEM'}), (b:KG {id: 'inputs:common/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/SYSTEM'}), (b:KG {id: 'inputs:common/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/MONITOR_TYPE'}), (b:KG {id: 'inputs:common/MONITOR_TYPE/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/MONITOR_TYPE'}), (b:KG {id: 'inputs:common/MONITOR_TYPE/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/SW2'}), (b:KG {id: 'inputs:common/SW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/SW2'}), (b:KG {id: 'inputs:common/SW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:common/SW2'}), (b:KG {id: 'inputs:common/SW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_map/range4'}), (b:KG {id: 'handler:berzerk_state.magicram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range1'}), (b:KG {id: 'handler:berzerk_state.audio_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range1'}), (b:KG {id: 'handler:berzerk_state.audio_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range5'}), (b:KG {id: 'handler:berzerk_state.magicram_control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range6'}), (b:KG {id: 'handler:berzerk_state.nmi_enable_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range6'}), (b:KG {id: 'handler:berzerk_state.nmi_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range7'}), (b:KG {id: 'handler:berzerk_state.nmi_disable_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range7'}), (b:KG {id: 'handler:berzerk_state.nmi_disable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range8'}), (b:KG {id: 'handler:berzerk_state.intercept_v256_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range9'}), (b:KG {id: 'handler:berzerk_state.irq_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range18'}), (b:KG {id: 'handler:berzerk_state.led_off_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range18'}), (b:KG {id: 'handler:berzerk_state.led_off_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range19'}), (b:KG {id: 'handler:berzerk_state.led_on_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:berzerk_state.berzerk_io_map/range19'}), (b:KG {id: 'handler:berzerk_state.led_on_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:berzerk_state.screen_update'}), (b:KG {id: 'handler:berzerk_state.get_pens'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:berzerk_state.intercept_v256_r'}), (b:KG {id: 'handler:berzerk_state.vpos_to_vsync_chain_counter'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
